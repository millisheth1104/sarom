import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";
import { SITE } from "@/lib/content";

/**
 * /contact/thankyou — where the address bar lands after an enquiry is sent.
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

export default function ContactThankYou() {
  return <ContactPage sent />;
}
