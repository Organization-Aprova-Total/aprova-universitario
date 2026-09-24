/**
 * Prefixa o basePath do static export em URLs cruas (CSS, style, <picture>).
 * Em <Image>, next/link e next/script o Next já faz isso sozinho.
 */
const publicPath = process.env.NEXT_PUBLIC_PATH ?? "http://localhost:3000/";
const basePath = new URL(publicPath).pathname.replace(/\/$/, "");

export function withBasePath(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}

export function absoluteUrl(path: string): string {
  return new URL(withBasePath(path).replace(/^\//, ""), publicPath.replace(/\/?$/, "/").replace(basePath + "/", "/")).toString();
}
