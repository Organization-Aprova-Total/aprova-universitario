import type { NextConfig } from "next";

// NEXT_PUBLIC_PATH define a URL pública (ex.: https://aprovatotal.com.br/lp/).
// O pathname vira o basePath do static export.
const publicPath = process.env.NEXT_PUBLIC_PATH ?? "http://localhost:3000/";
const basePath = new URL(publicPath).pathname.replace(/\/$/, "");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
