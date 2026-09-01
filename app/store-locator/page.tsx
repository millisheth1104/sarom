import type { Metadata } from "next";
import StoreLocator from "@/components/StoreLocator";
import { STORES, STORE_STATES } from "@/lib/stores";

export const metadata: Metadata = {
  title: "Store Locator | Sarom",
  description:
    "Find Sarom upholstery, curtains and bedding at " +
    STORES.length +
    " stockists across " +
    STORE_STATES.length +
    " states in India.",
};

export default function Page() {
  return <StoreLocator />;
}
