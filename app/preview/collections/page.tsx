import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";

/** Preview only — kept out of search while the two options are compared. */
export const metadata: Metadata = {
  title: "Preview — Collections layout | Sarom",
  robots: { index: false, follow: false },
};

export default function PreviewCollections() {
  return <HomePage variant="collections" />;
}
