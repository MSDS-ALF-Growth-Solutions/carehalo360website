// Resend-backed transactional sender.
//
// Replaces @lovable.dev/email-js. Those credentials belonged to the
// Lovable-managed Supabase project this site migrated off, so they are no
// longer obtainable. Resend works with any project and the sending domain is
// one we control.
//
// The error shape here is deliberate: process-email-queue branches on
// `error.status` (429 -> cooldown, 403 -> DLQ) and reads
// `error.retryAfterSeconds`. Throwing anything else would silently disable
// that retry machinery, so EmailAPIError reproduces the contract the old
// library provided.

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export class EmailAPIError extends Error {
  readonly status: number;
  readonly retryAfterSeconds: number | null;

  constructor(message: string, status: number, retryAfterSeconds: number | null) {
    super(message);
    this.name = "EmailAPIError";
    this.status = status;
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

export interface EmailPayload {
  to: string;
  from?: string;
  sender_domain?: string;
  subject: string;
  html?: string;
  text?: string;
  label?: string;
  idempotency_key?: string;
  unsubscribe_token?: string;
  message_id?: string;
}

export interface SendOptions {
  apiKey: string;
  /** Default From when the queued payload does not carry one. */
  defaultFrom: string;
  /** Base URL for unsubscribe links; omit to skip List-Unsubscribe. */
  siteUrl?: string;
}

function parseRetryAfter(res: Response): number | null {
  const header = res.headers.get("retry-after");
  if (!header) return null;
  const seconds = Number(header);
  return Number.isFinite(seconds) ? seconds : null;
}

export async function sendEmail(
  payload: EmailPayload,
  { apiKey, defaultFrom, siteUrl }: SendOptions,
): Promise<{ id: string }> {
  if (!payload.to) {
    // Permanent: no retry will ever supply a recipient. 403 routes to DLQ.
    throw new EmailAPIError("Email payload has no recipient", 403, null);
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  // Resend dedupes on this for 24h, which preserves the queue's at-least-once
  // delivery guarantee without sending twice on a retry.
  if (payload.idempotency_key) {
    headers["Idempotency-Key"] = payload.idempotency_key;
  }

  const body: Record<string, unknown> = {
    from: payload.from ?? defaultFrom,
    to: [payload.to],
    subject: payload.subject,
  };

  if (payload.html) body.html = payload.html;
  if (payload.text) body.text = payload.text;
  if (!payload.html && !payload.text) {
    throw new EmailAPIError("Email payload has neither html nor text", 403, null);
  }

  if (payload.unsubscribe_token && siteUrl) {
    const url = `${siteUrl.replace(/\/$/, "")}/unsubscribe?token=${encodeURIComponent(payload.unsubscribe_token)}`;
    body.headers = {
      "List-Unsubscribe": `<${url}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    };
  }

  let res: Response;
  try {
    res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
  } catch (cause) {
    // Network failure: transient, so use a status the caller retries on
    // rather than one that dead-letters the message.
    throw new EmailAPIError(
      `Network error contacting Resend: ${cause instanceof Error ? cause.message : String(cause)}`,
      503,
      null,
    );
  }

  if (res.ok) {
    const json = await res.json().catch(() => ({}));
    return { id: (json as { id?: string }).id ?? "" };
  }

  const detail = await res.text().catch(() => "");
  throw new EmailAPIError(
    `Resend responded ${res.status}: ${detail.slice(0, 500)}`,
    res.status,
    res.status === 429 ? parseRetryAfter(res) : null,
  );
}
