import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";
import { SITE } from "@/lib/content";

/**
 * /thank-you — where the address bar lands after an enquiry is sent.
 *
 * Moved here from /contact/thankyou on 2026-10-23 at the client's request;
 * next.config.ts redirects the old address permanently, because it was live
 * and a conversion goal may already point at it.
 *
 * The form switches the URL here itself (pushState) after a successful send;
 * this route exists so that a refresh or a shared link shows the same
 * thank-you instead of a 404, and so analytics can treat it as a conversion
 * page. Kept out of search results: a thank-you page is not a landing page.
 */
export const metadata: Metadata = {
  title: `Thank you | ${SITE.name}`,
  robots: { index: false, follow: true },
};

export default function ThankYou() {
  return <ContactPage sent />;
}
