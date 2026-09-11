/**
 * POST /api/contact — enquiry proxy.
 *
 * WHY A PROXY AND NOT A PLAIN FORM POST
 *
 * The client's enquiry form is not ours: it lives at
 * spectrum-impact.org/saromwebsiteformlive/ and the live sarom.info contact
 * page embeds it in an iframe. That gives a working inbox but an unstyled
 * form on a foreign domain inside an editorial page.
 *
 * The two ways to keep our own markup both fail from the browser:
 *   - a native <form action="https://spectrum-impact.org/...">  navigates the
 *     visitor off sarom.info onto the vendor's bare success page;
 *   - fetch() to it is blocked — cross-origin, no CORS headers.
 *
 * Server-to-server has neither problem. This route takes JSON from our form,
 * validates it, and re-posts it as the url-encoded payload the vendor's
 * handler actually reads. The visitor never leaves the page.
 *
 * The field names come from lib/contact.ts (FIELD_NAMES) so the contract is
 * stated once. They are the vendor's names, not ours — see that file.
 */

import { FIELD_NAMES, WHO_OPTIONS, normalisePhone } from "@/lib/contact";

/** Overridable so the endpoint can be re-pointed without a code change. */
const ENDPOINT =
  process.env.CONTACT_FORM_ENDPOINT ||
  "https://spectrum-impact.org/saromwebsiteformlive/";

/** The vendor's handler is a PHP page; don't wait on it forever. */
const TIMEOUT_MS = 12_000;

const WHO_VALUES = new Set<string>(WHO_OPTIONS.map((o) => o.value));

/* Best-effort burst throttle. Serverless means instances come and go, so this
   is NOT a real rate limiter — it only blunts a flood that happens to land on
   one warm instance. The honeypot below does the heavier lifting. */
const seen = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function throttled(ip: string) {
  const now = Date.now();
  const hits = (seen.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  seen.set(ip, hits);
  /* Keep the map from growing without bound on a long-lived instance. */
  if (seen.size > 500) {
    for (const [k, v] of seen) if (!v.some((t) => now - t < WINDOW_MS)) seen.delete(k);
  }
  return hits.length > MAX_PER_WINDOW;
}

const bad = (error: string, status = 400) =>
  Response.json({ ok: false, error }, { status });

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return bad("Malformed request.");
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  /* A bot that fills every field it finds fills this one too; a human never
     sees it. Answer 200 so the bot has nothing to tune against. */
  if (str(body.company)) return Response.json({ ok: true });

  const name = str(body.name);
  /* Same normaliser the form uses, so a direct POST carrying "+91 …" is
     accepted rather than rejected for being 12 digits long. */
  const phone = normalisePhone(str(body.phone));
  const email = str(body.email);
  const who = str(body.who);

  /* Validated again here, not just in the browser: client-side checks are a
     courtesy to the visitor, not a guarantee about what arrives. */
  if (name.length < 2) return bad("Please enter your name.");
  if (phone.length !== 10) return bad("Please enter a 10-digit phone number.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return bad("Please enter a valid email address.");
  if (!WHO_VALUES.has(who)) return bad("Please tell us who you are.");

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (throttled(ip)) return bad("Too many enquiries just now. Please try again shortly.", 429);

  /* url-encoded, not JSON: the vendor's handler reads PHP $_POST. `submit` is
     the name of their submit button, which their script checks for. */
  const payload = new URLSearchParams({
    [FIELD_NAMES.name]: name,
    [FIELD_NAMES.phone]: phone,
    [FIELD_NAMES.email]: email,
    [FIELD_NAMES.who]: who,
    submit: "Send a Message",
  });

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: payload.toString(),
      /* The handler answers with a redirect on success; follow it rather than
         reading a 3xx as a failure. */
      redirect: "follow",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("[contact] handler responded", res.status);
      return bad("We could not reach the enquiry desk.", 502);
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] proxy failed", err);
    return bad("We could not reach the enquiry desk.", 502);
  }
}

/** Anything but POST, answered honestly rather than with a 404 on the route. */
export function GET() {
  return Response.json({ ok: false, error: "Method not allowed." }, { status: 405 });
}
