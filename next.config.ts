import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // The true ceiling is Vercel's, not Next's: Vercel caps server-side
      // request bodies at 4.5MB regardless of this setting (verified,
      // plugins/cache/claude-plugins-official/vercel/0.43.0/skills/
      // next-forge/references/packages.md:148). The enforced user-facing
      // cap is 4MB, applied inside app/_actions/contact.ts on the parsed
      // File itself. This config only needs to raise Next's own default
      // 1MB body-parser limit (node_modules/next/dist/docs/01-app/03-api-
      // reference/05-config/01-next-config-js/serverActions.md) enough
      // that a request carrying a 4MB file plus the other form fields and
      // multipart boundary/header overhead is fully received by Next and
      // rejected cleanly by our own size check, instead of being cut off
      // at the framework layer with a generic error before our code runs.
      // 5mb leaves headroom under the 4MB enforced limit without
      // approaching Vercel's separate 4.5MB proxy ceiling.
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
