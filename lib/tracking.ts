/**
 * Tracking IDs, from the client's "Tracking Codes" sheet (2026-10-19).
 *
 * Transcribed from a screenshot of the sheet — if a tag shows as "not found"
 * in Tag Assistant / GA Realtime, check these two strings against the source
 * first.
 *
 * NOT here: Google Search Console. That one is a DNS TXT record on the domain
 * (nameservers are Microsoft 365, see memory.md), not code in this repo.
 */
export const GTM_ID = "GTM-53DCHG5P";
export const GA_ID = "G-WGEWY3X9NF";

/**
 * Only the real domain reports. Without this, `next dev`, the local
 * `next start` used for verification and any preview host would all push
 * hits into the client's live GA property and pollute its numbers.
 */
export const TRACK_HOST_TEST = String.raw`/(^|\.)sarom\.co\.in$/.test(location.hostname)`;
