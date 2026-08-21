import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline} | Premium Curtains, Upholstery & Bed Sheets`,
  description:
    "At Sarom, our journey is a tapestry of timeless elegance and Indian heritage. Premium upholstery, curtains and bed sheets in bouclé, chenille, jacquard, knitted, leather and velvet.",
  keywords: [
    "Sarom",
    "premium fabrics India",
    "upholstery fabric",
    "curtains",
    "bed sheets",
    "boucle",
    "chenille",
    "jacquard",
    "velvet",
  ],
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description:
      "Premium upholstery, curtains and bed sheets. A tapestry of timeless elegance and Indian heritage.",
    type: "website",
    siteName: SITE.name,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#14110F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: the inline script below stamps data-js onto
    // <html> before React hydrates, which React would otherwise flag.
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Set before first paint so reveal start-states apply without a flash,
            while a no-JS visitor still gets fully visible content. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.setAttribute('data-js','1');`,
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
