import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://globalmissionfc.org";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/sermons`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    { url: `${baseUrl}/give`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  try {
    const { data: events } = await supabase.from("events").select("slug, updated_at, created_at");

    if (events && events.length > 0) {
      const eventRoutes: MetadataRoute.Sitemap = events
        .filter((event) => Boolean(event.slug))
        .map((event) => ({
          url: `${baseUrl}/events/${event.slug}`,
          lastModified: event.updated_at || event.created_at || new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        }));
      return [...staticRoutes, ...eventRoutes];
    }
  } catch {
    // Fall back to static routes if Supabase is unreachable during build
  }

  return staticRoutes;
}
