-- Rate-limiting primitive for public-facing edge functions.
--
-- Fixed-window counter keyed by an opaque bucket string, e.g.
--   "slack-lead:ip:203.0.113.7"  (per-caller budget)
--   "slack-lead:global"          (blast-radius cap)
--
-- Callable only by service_role; edge functions reach it with their
-- service key. Anon/authenticated have no path to it.

CREATE TABLE IF NOT EXISTS public.edge_rate_limits (
    bucket       TEXT        NOT NULL,
    window_start TIMESTAMPTZ NOT NULL,
    count        INTEGER     NOT NULL DEFAULT 0,
    PRIMARY KEY (bucket, window_start)
);

CREATE INDEX IF NOT EXISTS edge_rate_limits_window_start_idx
    ON public.edge_rate_limits (window_start);

ALTER TABLE public.edge_rate_limits ENABLE ROW LEVEL SECURITY;

-- No anon/authenticated policies -> default deny. service_role bypasses RLS,
-- but the explicit policy keeps intent legible alongside the other tables.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE schemaname = 'public'
          AND tablename  = 'edge_rate_limits'
          AND policyname = 'Service role can manage rate limits'
    ) THEN
        CREATE POLICY "Service role can manage rate limits"
            ON public.edge_rate_limits FOR ALL
            USING (auth.role() = 'service_role')
            WITH CHECK (auth.role() = 'service_role');
    END IF;
END $$;

-- Atomic increment-and-test. Returns TRUE while the bucket is within budget.
-- The INSERT ... ON CONFLICT DO UPDATE ... RETURNING is a single statement, so
-- concurrent callers serialise on the row lock and cannot both read a stale count.
CREATE OR REPLACE FUNCTION public.check_rate_limit(
    p_bucket         TEXT,
    p_limit          INTEGER,
    p_window_seconds INTEGER
) RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_window_start TIMESTAMPTZ;
    v_count        INTEGER;
BEGIN
    IF p_bucket IS NULL OR p_limit <= 0 OR p_window_seconds <= 0 THEN
        RETURN FALSE;
    END IF;

    -- Truncate now() down to the current fixed window.
    v_window_start := to_timestamp(
        floor(extract(EPOCH FROM clock_timestamp()) / p_window_seconds) * p_window_seconds
    );

    INSERT INTO public.edge_rate_limits AS erl (bucket, window_start, count)
    VALUES (p_bucket, v_window_start, 1)
    ON CONFLICT (bucket, window_start)
    DO UPDATE SET count = erl.count + 1
    RETURNING erl.count INTO v_count;

    -- Opportunistic cleanup of expired windows (~1% of calls) so the table
    -- does not grow without bound. Cheap thanks to the window_start index.
    IF random() < 0.01 THEN
        DELETE FROM public.edge_rate_limits
        WHERE window_start < clock_timestamp() - INTERVAL '1 day';
    END IF;

    RETURN v_count <= p_limit;
END;
$$;

REVOKE ALL ON FUNCTION public.check_rate_limit(TEXT, INTEGER, INTEGER)
    FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.check_rate_limit(TEXT, INTEGER, INTEGER)
    TO service_role;
