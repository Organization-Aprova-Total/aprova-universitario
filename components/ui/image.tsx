import NextImage, { type ImageProps } from "next/image";

/**
 * next/image do projeto (static export, sem otimização em runtime). O
 * basePath é aplicado pelo Next; não passe withBasePath() no src.
 */
export function Image(props: ImageProps) {
  return <NextImage {...props} />;
}
