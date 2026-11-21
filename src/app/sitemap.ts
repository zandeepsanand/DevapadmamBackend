import type { MetadataRoute } from "next";
import { LUXURY_VILLAS } from "@/lib/villasData";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://devapadmam.com");

  const now = new Date();

  // Root / Home page
  const routes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  // Dynamic villa detail pages (Sreeramam, Devapadmam 6 BHK, 3 BHK, Minnaaram, Naarayaneeyam)
  LUXURY_VILLAS.forEach((villa) => {
    routes.push({
      url: `${siteUrl}/villas/${villa.id}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  return routes;
}
