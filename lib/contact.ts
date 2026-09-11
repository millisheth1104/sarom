/**
 * /contact content.
 *
 * PROVENANCE — everything here is taken from the client's own live pages, not
 * written for this build. Same standing rule as `lib/about.ts`: do not invent
 * offices, phone numbers, hours, response times or team names.
 *
 * Sources:
 *  - https://sarom.info/contact.php   — the page heading, both office blocks
 *    (corporate + registered), the email and phone, and the Google Maps embed.
 *  - https://spectrum-impact.org/saromwebsiteformlive/ — the enquiry form the
 *    live contact page embeds in an iframe. FIELD_* below mirror that form's
 *    real input names and radio values exactly, because our form posts to that
 *    same endpoint (see app/api/contact/route.ts). Renaming anything here
 *    silently detaches the form from the client's inbox.
 *
 * Note the corporate address is LONGER than SITE.address in content.ts: the
 * contact page carries the two landmarks ("Near Toyota Showroom, Next To SBI
 * Bank") that the compact footer version drops. Both are the client's, so both
 * are kept — this page uses the full one.
 */

import { SITE, SOCIAL, WHATSAPP } from "@/lib/content";

export const CONTACT_HEAD = {
  eyebrow: "Contact",
  /* The live page's own heading, verbatim, split for the line-by-line reveal.
     The second line takes the accent ink via <em>. */
  lines: ["We would love to", "hear from you."],
  /* editorial — a description of who the form is FOR, drawn from its own three
     "Who are you?" options rather than a claim about the company. */
  lead: "Furnishing a home, stocking a store, or specifying for a project — start here.",
};

/**
 * The three direct routes, above the form, for anyone who would rather not
 * fill one in. `kind` drives the icon; `href` is the real protocol link.
 */
export const CONTACT_DIRECT = [
  {
    kind: "mail" as const,
    label: "Email",
    value: SITE.email,
    href: "mailto:" + SITE.email,
    note: "Customer care",
  },
  {
    kind: "phone" as const,
    label: "Phone",
    value: SITE.phone,
    href: "tel:" + SITE.phone.replace(/[^\d+]/g, ""),
    note: "Mon–Sat",
  },
  {
    kind: "chat" as const,
    label: "WhatsApp",
    value: SITE.phone,
    href: WHATSAPP.href,
    note: "Chat with us",
  },
];

export const CONTACT_OFFICES = [
  {
    label: "Corporate Office",
    /* Split on the client's own line breaks so the address sets as an address
       block rather than one reflowing paragraph. */
    lines: [
      SITE.legalName + ", 2nd Floor, Kerom,",
      "Plot No A/112, Wagle Industrial Estate,",
      "Near Toyota Showroom, Next To SBI Bank,",
      "Thane West – 400604",
    ],
    email: SITE.email,
    phone: SITE.phone,
    /* Fed to a Google Maps *search*, not a lat/lng — the source publishes an
       address and no coordinates, and the same reasoning applies here as in
       the store locator: a rooftop pin would be invented precision. */
    search: "Kerom, Plot A/112, Wagle Industrial Estate, Thane West 400604",
  },
  {
    label: "Registered Office",
    lines: ["VidyaVihar,", "Mumbai – 400086"],
    email: SITE.email,
    phone: SITE.phone,
    search: "Vidyavihar, Mumbai 400086",
  },
];

/** Google Maps' own "search by text" deep link — no API key, no coordinates. */
export const mapsHref = (q: string) =>
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);

/**
 * The corporate office embed, taken verbatim from the live contact page.
 *
 * Kept as the client's exact `pb` string rather than rebuilt from a lat/lng:
 * the string carries Google's own place id for "Kerom"
 * (0x3be7b9063eba3f53:0xc9352a3eda00ae9b), so the marker lands on the real
 * building regardless of how the viewport is centred. Re-deriving it from
 * coordinates would drop the place and pin open ground.
 */
export const CONTACT_MAP =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241152.62452664945!2d72.82402053022356!3d19.1947761340424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b9063eba3f53%3A0xc9352a3eda00ae9b!2sKerom!5e0!3m2!1sen!2sin!4v1733815865721!5m2!1sen!2sin";

/* ------------------------------------------------------------------
   THE FORM CONTRACT

   These names are NOT ours to choose. They are the input names the
   client's live form handler reads. Our form renders our own markup but
   posts this exact payload, proxied server-side so the visitor stays on
   sarom.info instead of being navigated to the vendor's domain.
   ------------------------------------------------------------------ */

/**
 * Reduce whatever was typed or pasted to the bare 10-digit local number the
 * client's handler expects.
 *
 * This exists because a `maxLength={10}` on the input does NOT do it: maxLength
 * counts RAW characters, so pasting "+91 86579 44323" is cut to "+91 86579 "
 * and stripping that leaves "9186579" — a seven-digit number, wrong and
 * silently so. Measured; it is why the input carries no maxLength.
 *
 * Leading zeros go first (the old STD trunk prefix, and "00" international
 * dialling), then a "91" country code — but only while what remains is longer
 * than a local number, so a genuine 10-digit mobile that happens to begin "91"
 * is left alone.
 */
export function normalisePhone(raw: string) {
  let d = raw.replace(/\D/g, "").replace(/^0+/, "");
  if (d.length > 10 && d.startsWith("91")) d = d.slice(2);
  return d.slice(0, 10);
}

export const FIELD_NAMES = {
  name: "first_name",
  phone: "phone_number",
  email: "email",
  who: "f_option",
} as const;

/** The radio values, exactly as the handler expects to receive them. */
export const WHO_OPTIONS = [
  { value: "End User", label: "End User", hint: "Furnishing my own home" },
  { value: "Store", label: "Store", hint: "Stocking Sarom" },
  {
    value: "Interior or Architect",
    label: "Interior or Architect",
    hint: "Specifying for a project",
  },
] as const;

export const CONTACT_FORM = {
  eyebrow: "Enquiry",
  title: "Send a message",
  /* The client's handler accepts name, phone, email and audience — and no
     free-text field. A message box is deliberately NOT rendered: it would
     collect what the endpoint then discards. Add one here only once the
     handler accepts it. */
  note: "We will get back to you on the number or email you leave below.",
  submit: "Send a Message",
  success:
    "Thank you — your enquiry is in. Someone from the team will be in touch.",
  /* Shown when the proxy cannot reach the handler, so the visitor is never
     left with a dead form and no way through. */
  failure: "That did not go through. Please email or call us directly:",
};

export const CONTACT_SOCIAL = SOCIAL;
