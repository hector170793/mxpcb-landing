import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { BUSINESS, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "./_data/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// metadataBase is required: a relative URL field without it is a BUILD
// ERROR, not a warning (node_modules/next/dist/docs/01-app/03-api-reference/
// 04-functions/generate-metadata.md, section "metadataBase").
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

// Real business data only -- no invented ratings, coordinates, opening
// hours or price range. See app/_data/site.ts.
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: BUSINESS.legalName,
  alternateName: BUSINESS.commercialName,
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.streetAddress,
    addressLocality: BUSINESS.addressLocality,
    addressRegion: BUSINESS.addressRegion,
    addressCountry: BUSINESS.addressCountry,
  },
  email: BUSINESS.email,
  telephone: BUSINESS.telephone,
  url: BUSINESS.url,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="es" className={`${archivo.variable} ${jetbrainsMono.variable}`}>
      {/* GoogleTagManager renders as a sibling of <body>, inside <html>,
          per node_modules/next/dist/docs/01-app/02-guides/third-party-
          libraries.md. Omitted entirely (no script, no noscript, no console
          noise) when NEXT_PUBLIC_GTM_ID is unset -- dev and preview traffic
          never pollutes the client's container. */}
      {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
