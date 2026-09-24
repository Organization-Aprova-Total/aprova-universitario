import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getLanding } from "@/config/landings";
import { withBasePath } from "@/lib/utils";

// Poppins e Noto Sans vêm do root layout (--font-poppins / --font-noto-sans).

const landing = getLanding("aprova-universitario");
const ogImage = withBasePath("/images/aprova-universitario/og-image.png");

export const metadata: Metadata = {
  title: { absolute: landing.title },
  description: landing.description,
  keywords: [
    "aprova universitário",
    "curso de anatomia online",
    "bioquímica para medicina",
    "fisiologia videoaulas",
    "ciclo básico medicina",
    "reforço faculdade área da saúde",
    "aulas de histologia e patologia",
  ],
  alternates: { canonical: landing.path },
  openGraph: {
    title: landing.title,
    description: landing.description,
    url: landing.path,
    siteName: siteConfig.name,
    type: "website",
    locale: "pt_BR",
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Aprova Universitário: Anatomia, Bioquímica e Fisiologia", type: "image/png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: landing.title,
    description: landing.description,
    images: [ogImage],
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export default function AprovaUniversitarioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
