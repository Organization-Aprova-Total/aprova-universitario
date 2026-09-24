import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { enabledLandings } from "@/config/landings";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const publicPath = process.env.NEXT_PUBLIC_PATH ?? "http://localhost:3000/";
  const basePath = new URL(publicPath).pathname.replace(/\/$/, "");
  return enabledLandings().map((l) => ({
    url: `${siteConfig.url}${basePath}${l.path}/`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));
}
