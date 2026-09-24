# aprova-universitario

Landing page do Aprova Universitário ("Anatomia, Bioquímica e Fisiologia"), em React.
Next 15 (App Router, static export), React 19, Tailwind v4, TypeScript estrito.

- A página fica em `app/(landings)/aprova-universitario/`: `_content/index.ts` tem todo o texto e
  as constantes (checkout, login, formulário); `_components/` tem uma seção por arquivo;
  `aprova-universitario.css` tem o estilo.
- Fontes Poppins e Noto Sans via next/font no root layout (`--font-poppins`, `--font-noto-sans`).
- `NEXT_PUBLIC_PATH` define a URL pública; o pathname vira o basePath (`/lp` em produção).
- Server Components por padrão; a única ilha cliente é o formulário (`planos-ensino.tsx`).
- Imagens em AVIF/WebP com width/height. Zero travessão em texto. Zero dependência nova.
- Node 25. `npm run dev` para desenvolver, `npm run build` para o static export em `out/`,
  `node scripts/validar-lp.mjs aprova-universitario` para conferir o HTML final.
