import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.biovibes.net";

  // Fetch unique roles for dynamic category pages
  const { data } = await supabase
    .from("generated_bios")
    .select("role");

  const uniqueRoles = Array.from(new Set(data?.map((item) => item.role.toLowerCase())))
    .filter(Boolean);

  const categoryUrls = uniqueRoles.map((role) => ({
    url: `${baseUrl}/category/${encodeURIComponent(role)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/explore`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sitemap-categories`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
  ];

  return [...staticUrls, ...categoryUrls];
}
