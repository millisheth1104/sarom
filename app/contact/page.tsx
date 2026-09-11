import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: `Contact | ${SITE.name}`,
  description:
    "Talk to Sarom — customer care, stockist enquiries and project specification. " +
    SITE.legalName +
    ", Wagle Industrial Estate, Thane West. " +
    SITE.email +
    ", " +
    SITE.phone +
    ".",
  robots: { index: true, follow: true },
};

export default function Contact() {
  return <ContactPage />;
}
