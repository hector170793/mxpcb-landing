import type { MetadataRoute } from "next";
import { SITE_URL } from "./_data/site";

// See node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/robots.md
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
