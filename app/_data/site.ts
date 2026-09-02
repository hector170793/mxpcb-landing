// Shared site-wide constants for metadata, robots, sitemap and JSON-LD.
//
// NEXT_PUBLIC_SITE_URL is documented in .env.example as required for
// metadataBase / canonical / OG / sitemap / robots. A relative URL field
// without metadataBase is a BUILD ERROR, not a warning (node_modules/next/
// dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md,
// section "metadataBase"). Falling back to the production domain keeps a
// local build working even before .env.local is populated.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mexicopcb.com"
).replace(/\/$/, "");

export const SITE_NAME = "MXPCB";

export const SITE_TITLE =
  "MXPCB — Soluciones en circuitos electrónicos, hechas en México";

export const SITE_DESCRIPTION =
  "Diseño, fabricación y ensamble de PCB en un solo proveedor. Montaje SMT y through-hole bajo IPC-A-610 y J-STD-001, con inspección unidad por unidad.";

// Real business data only — no invented ratings, coordinates, opening hours
// or price range. Source: user-supplied business record.
export const BUSINESS = {
  legalName: "DISEÑO Y DESARROLLO DE PROYECTOS ELECTRÓNICOS, S.A.P.I. DE C.V.",
  commercialName: "MXPCB",
  streetAddress: "C. 15 No. 503, Col. Altabrisa",
  addressLocality: "Mérida",
  addressRegion: "Yucatán",
  addressCountry: "MX",
  email: "contacto@mexicopcb.com",
  telephone: "+52 999 593 3235",
  url: "https://mexicopcb.com",
} as const;
