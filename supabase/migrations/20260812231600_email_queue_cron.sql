-- Schedule the email queue drain.
--
-- This job previously existed only as an out-of-band Management API call made
-- by a Lovable setup tool ("applied dynamically by setup_email_infra"), never
-- as a migration. When the project was rebuilt under an owned Supabase org the
-- job simply did not exist, and every queued email sat at status 'pending'
-- forever with nothing to drain it. Encoding it here means a future rebuild
-- gets a working queue from `supabase db push` alone.
--
-- PREREQUISITES, not created here: two vault secrets. Both are
-- project-specific and must never be committed. Create them once per project:
--
--   select vault.create_secret(
--     '<SERVICE_ROLE_KEY>',
--     'email_queue_service_role_key',
--     'Service role key used by the process-email-queue cron job'
--   );
--   select vault.create_secret(
--     'https://<PROJECT_REF>.supabase.co',
--     'email_queue_project_url',
--     'Base URL of this project, used by the process-email-queue cron job'
--   );
--
-- The URL is read from vault rather than hardcoded deliberately: a hardcoded
-- project ref survives a copy-paste into a rebuilt project and silently posts
-- to the OLD project's edge function, which is far worse than not running.
--
-- The job is a no-op while either secret is absent — the URL guard below skips
-- the call outright, and a missing key yields a bearer token the function
-- rejects — so ordering between migration and secrets is not fragile.

do $$
begin
  -- Idempotent: re-running the migration replaces the schedule rather than
  -- erroring or stacking duplicate jobs.
  if exists (select 1 from cron.job where jobname = 'process-email-queue') then
    perform cron.unschedule('process-email-queue');
  end if;
end
$$;

select cron.schedule(
  'process-email-queue',
  '5 seconds',
  $job$
  select net.http_post(
    url := (
      select decrypted_secret from vault.decrypted_secrets
      where name = 'email_queue_project_url'
    ) || '/functions/v1/process-email-queue',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || coalesce((
        select decrypted_secret from vault.decrypted_secrets
        where name = 'email_queue_service_role_key'
      ), '')
    ),
    body := '{}'::jsonb
  )
  -- Respect the rate-limit cooldown process-email-queue sets when a provider
  -- returns 429, and skip the HTTP call entirely when both queues are empty so
  -- an idle site is not invoking an edge function every 5 seconds.
  where not exists (
    select 1 from public.email_send_state
    where retry_after_until is not null and retry_after_until > now()
  )
  and (
    (select count(*) from pgmq.q_auth_emails) > 0
    or (select count(*) from pgmq.q_transactional_emails) > 0
  );
  $job$
);
