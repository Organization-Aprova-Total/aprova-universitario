import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { enabledLandings } from "@/config/landings";
import { disciplinasGuia } from "@/app/(landings)/aprova-universitario/_content/disciplinas-guia";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const publicPath = process.env.NEXT_PUBLIC_PATH ?? "http://localhost:3000/";
  const basePath = new URL(publicPath).pathname.replace(/\/$/, "");
  const lps: MetadataRoute.Sitemap = enabledLandings().map((l) => ({
    url: `${siteConfig.url}${basePath}${l.path}/`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));
  const disciplinas: MetadataRoute.Sitemap = disciplinasGuia.map((d) => ({
    url: `${siteConfig.url}${basePath}/aprova-universitario/${d.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));
  return [...lps, ...disciplinas];
}
