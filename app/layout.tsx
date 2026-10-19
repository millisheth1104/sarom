import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE } from "@/lib/content";
import { GA_ID, GTM_ID, TRACK_HOST_TEST } from "@/lib/tracking";

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
        {/* Google Tag Manager — the client's snippet, wrapped so it only runs
            on sarom.co.in (see lib/tracking.ts). Raw <script> in <head>, not
            next/script, so it is in the served HTML where the sheet says. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if(${TRACK_HOST_TEST}){(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');}`,
          }}
        />
        {/* Google Analytics (gtag.js). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if(${TRACK_HOST_TEST}){var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${GA_ID}';document.head.appendChild(s);window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');}`,
          }}
        />
      </head>
      <body>
        {/* GTM (noscript) — must be the first thing in <body>. */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
