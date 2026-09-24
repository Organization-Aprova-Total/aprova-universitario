import { withBasePath } from "@/lib/utils";

/**
 * `<picture>` com AVIF → WebP e dimensões explícitas (zero CLS). Os assets
 * desta LP são pré-gerados em AVIF + WebP (scripts/design-assets.mjs). O
 * basePath é aplicado à mão porque a URL vai crua no <source>.
 *
 * `src` é o caminho SEM extensão (ex.: "/images/aprova-universitario/jubilut").
 */
export function Pic({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <picture>
      <source type="image/avif" srcSet={withBasePath(`${src}.avif`)} sizes={sizes} />
      <source type="image/webp" srcSet={withBasePath(`${src}.webp`)} sizes={sizes} />
      <img
        src={withBasePath(`${src}.webp`)}
        alt={alt}
        width={width}
        height={height}
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        className={className}
      />
    </picture>
  );
}
