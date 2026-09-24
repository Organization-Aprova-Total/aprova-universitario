// @ts-check
/**
 * Valida uma LP do jeito que o Rodrigo valida antes de entregar ao tech:
 * build de produção e conferência do HTML final em `out/<slug>/index.html`.
 *
 * Uso:
 *   node scripts/validar-lp.mjs <slug>              (roda o build de produção e checa)
 *   node scripts/validar-lp.mjs <slug> --no-build   (só checa o out/ que já existe)
 *   node scripts/validar-lp.mjs <slug> --no-lint    (pula tsc e eslint)
 *
 * O que checa (✗ = bloqueia a entrega, ! = revisar, ✓ = ok):
 *   registro em config/landings.ts e cache em public/_headers
 *   1 único <h1>, <title>, meta description, canonical, Open Graph, Twitter
 *   JSON-LD: Organization + BreadcrumbList sempre; FAQPage quando há FAQ visível
 *   llms.txt da página (public/<slug>/llms.txt) e menção no public/llms.txt
 *   URL no sitemap.xml (se a landing está enabled)
 *   travessões (— e –) no HTML, fontes externas por <link>, <img> sem width/height
 *   imagens da LP: existem no out/, formato (avif/webp/svg) e peso (> 250 KB avisa)
 *   placeholders esquecidos (⟨CONFIRMAR, PREENCHER, TODO, lorem)
 *   package.json alterado (dependência nova) em relação ao git
 *   tsc --noEmit e eslint na pasta da LP
 *
 * Sai com código 1 se houver qualquer ✗.
 */
import { readFile, stat, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, extname } from "node:path";
import { execSync, spawnSync } from "node:child_process";

const args = process.argv.slice(2);
const slug = args[0];
if (!slug || slug.startsWith("--")) {
  console.error("Uso: node scripts/validar-lp.mjs <slug> [--no-build] [--no-lint]");
  process.exit(1);
}
const NO_BUILD = args.includes("--no-build");
const NO_LINT = args.includes("--no-lint");
const PROD_PATH = process.env.NEXT_PUBLIC_PATH ?? "https://aprovatotal.com.br/lp/";
const BASE = new URL(PROD_PATH).pathname.replace(/\/$/, "");

const ROOT = process.cwd();
const LP_DIR = join(ROOT, "app", "(landings)", slug);
const OUT_HTML = join(ROOT, "out", slug, "index.html");

/** @type {{nivel:"✓"|"!"|"✗", msg:string}[]} */
const itens = [];
const ok = (msg) => itens.push({ nivel: "✓", msg });
const aviso = (msg) => itens.push({ nivel: "!", msg });
const erro = (msg) => itens.push({ nivel: "✗", msg });
const strip = (html) => html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "");
const meta = (html, attr, name) => {
  const re = new RegExp(`<meta[^>]*${attr}="${name}"[^>]*content="([^"]*)"`, "i");
  const re2 = new RegExp(`<meta[^>]*content="([^"]*)"[^>]*${attr}="${name}"`, "i");
  return (html.match(re) ?? html.match(re2))?.[1];
};

async function main() {
  if (!existsSync(LP_DIR)) {
    console.error(`Não existe app/(landings)/${slug}/`);
    process.exit(1);
  }

  // 1. Registro e cache
  const landingsTs = await readFile(join(ROOT, "config", "landings.ts"), "utf8");
  const registro = landingsTs.match(new RegExp(`"${slug}":\\s*\\{[\\s\\S]*?\\n\\s*\\},`));
  if (!registro) erro(`config/landings.ts não tem a entrada "${slug}" (o build quebra sem ela)`);
  else ok("registrada em config/landings.ts");
  const enabled = registro ? /enabled:\s*true/.test(registro[0]) : false;
  if (registro && !enabled) aviso("enabled: false em config/landings.ts (fora do sitemap; ok se for de trabalho)");

  const headers = await readFile(join(ROOT, "public", "_headers"), "utf8");
  if (headers.includes(`/${slug}/*`)) ok("cache do edge em public/_headers");
  else erro(`public/_headers não tem a regra /${slug}/* (cole o bloco do pacote)`);

  // 2. Build
  if (!NO_BUILD) {
    console.log(`\n→ npm run build com NEXT_PUBLIC_PATH=${PROD_PATH} (leva alguns minutos)\n`);
    const r = spawnSync("npm", ["run", "build"], { stdio: "inherit", env: { ...process.env, NEXT_PUBLIC_PATH: PROD_PATH } });
    if (r.status !== 0) {
      erro("npm run build falhou (veja o log acima)");
      return relatorio();
    }
    ok("build de produção limpo");
  }
  if (!existsSync(OUT_HTML)) {
    erro(`out/${slug}/index.html não existe (rode sem --no-build)`);
    return relatorio();
  }

  // 3. HTML final
  const html = await readFile(OUT_HTML, "utf8");
  const visivel = strip(html);

  const h1s = visivel.match(/<h1[\s>]/gi) ?? [];
  if (h1s.length === 1) ok("1 único <h1>");
  else erro(`${h1s.length} <h1> na página (precisa ser exatamente 1)`);

  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim();
  if (!title) erro("sem <title>");
  else if (title === "Aprova Total") erro("<title> ficou no default do site; defina em layout.tsx");
  else if (title.length > 65) aviso(`<title> com ${title.length} caracteres (ideal até 60): "${title}"`);
  else ok(`<title>: "${title}"`);

  const desc = meta(html, "name", "description");
  if (!desc) erro("sem meta description");
  else if (desc.length < 70 || desc.length > 165) aviso(`meta description com ${desc.length} caracteres (ideal 120 a 160)`);
  else ok("meta description ok");

  const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/i)?.[1];
  if (!canonical) erro("sem canonical");
  else if (!canonical.startsWith("http")) erro(`canonical relativa: ${canonical}`);
  else if (!canonical.includes(`/${slug}`)) erro(`canonical não aponta para a própria página: ${canonical}`);
  else if (BASE && !canonical.includes(`${BASE}/${slug}`)) aviso(`canonical sem o basePath "${BASE}": ${canonical} (padrão atual do projeto; alinhar com o tech qual URL é a canônica)`);
  else ok(`canonical: ${canonical}`);

  for (const p of ["og:title", "og:description", "og:image", "og:url"]) {
    if (meta(html, "property", p)) ok(`${p} presente`);
    else erro(`sem ${p}`);
  }
  if (meta(html, "name", "twitter:card")) ok("twitter:card presente");
  else aviso("sem twitter:card");
  const robots = meta(html, "name", "robots") ?? "";
  if (/noindex/.test(robots)) aviso(`robots: ${robots} (a página NÃO será indexada; ok se for de trabalho)`);

  // 4. JSON-LD
  const lds = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
  const tipos = new Set();
  for (const raw of lds) {
    try {
      const j = JSON.parse(raw);
      for (const item of Array.isArray(j) ? j : [j]) tipos.add(item["@type"]);
    } catch {
      erro("JSON-LD inválido (não parseia)");
    }
  }
  for (const t of ["Organization", "BreadcrumbList"]) {
    if (tipos.has(t)) ok(`JSON-LD ${t}`);
    else erro(`falta JSON-LD ${t} (organizationJsonLd / breadcrumbJsonLd de @/lib/seo)`);
  }
  const temFaq = /<details|<summary|d[úu]vidas|perguntas frequentes|\bFAQ\b/i.test(visivel);
  if (tipos.has("FAQPage")) {
    if (temFaq) ok("JSON-LD FAQPage com FAQ visível");
    else erro("JSON-LD FAQPage sem FAQ visível na página (o Google penaliza)");
  } else if (temFaq) aviso("há FAQ visível mas não tem JSON-LD FAQPage");
  const vendePlano = /R\$\s?\d/.test(visivel) && /checkout\./.test(html);
  if (vendePlano && !tipos.has("Course") && !tipos.has("Product")) aviso("a página vende plano (R$ + checkout) e não tem JSON-LD Course/Offer; se incluir, o preço tem de ser idêntico ao exibido");
  if (tipos.size) ok(`tipos JSON-LD: ${[...tipos].join(", ")}`);

  // 5. llms.txt e sitemap
  if (existsSync(join(ROOT, "public", slug, "llms.txt"))) ok(`public/${slug}/llms.txt existe`);
  else erro(`falta public/${slug}/llms.txt (resumo da página para as IAs)`);
  const llmsRaiz = existsSync(join(ROOT, "public", "llms.txt")) ? await readFile(join(ROOT, "public", "llms.txt"), "utf8") : "";
  if (llmsRaiz.includes(`/${slug}/`)) ok("página listada no public/llms.txt do domínio");
  else aviso(`public/llms.txt do domínio não menciona /${slug}/ (adicione a linha em "Páginas principais")`);
  if (enabled) {
    const sitemap = existsSync(join(ROOT, "out", "sitemap.xml")) ? await readFile(join(ROOT, "out", "sitemap.xml"), "utf8") : "";
    if (sitemap.includes(`/${slug}/`)) ok("URL no sitemap.xml");
    else erro("URL não está no sitemap.xml (enabled: true mas não saiu no build?)");
  }

  // 6. Editorial e performance
  const travessoes = (visivel.match(/[—–]/g) ?? []).length;
  if (travessoes) erro(`${travessoes} travessão(ões) no HTML (— ou –). Trocar por vírgula, dois-pontos ou ponto`);
  else ok("zero travessões");
  if (/<link[^>]*fonts\.googleapis|<link[^>]*fonts\.gstatic/i.test(html)) erro("fonte carregada por <link> externo; use next/font (Poppins e Noto Sans já vêm do root layout)");
  else ok("sem fontes externas por <link>");
  const imgsSemDim = [...visivel.matchAll(/<img\b[^>]*>/gi)].filter((m) => !/width=/.test(m[0]) || !/height=/.test(m[0]));
  if (imgsSemDim.length) aviso(`${imgsSemDim.length} <img> sem width/height explícitos (CLS)`);
  else ok("todas as <img> com width/height");
  for (const p of ["⟨CONFIRMAR", "PREENCHER", "TODO", "lorem ipsum", "Lorem"]) {
    if (visivel.includes(p)) erro(`placeholder "${p}" ficou no HTML`);
  }

  // 7. Imagens da LP
  const refs = new Set([...html.matchAll(new RegExp(`/images/${slug}/[^"'\\s)?\\\\<,]+`, "g"))].map((m) => m[0]));
  let pesadas = 0, formatoRuim = 0, faltando = 0;
  for (const ref of refs) {
    const local = join(ROOT, "out", ref.replace(BASE, ""));
    if (!existsSync(local)) { faltando++; continue; }
    const ext = extname(local).toLowerCase();
    if (![".avif", ".webp", ".svg"].includes(ext) && !/og-image/.test(local)) formatoRuim++;
    if ((await stat(local)).size > 250 * 1024) pesadas++;
  }
  if (faltando) erro(`${faltando} imagem(ns) referenciada(s) não existe(m) no out/ (caminho errado ou basePath duplicado)`);
  if (formatoRuim) aviso(`${formatoRuim} imagem(ns) em png/jpg; gere avif+webp com scripts/design-assets.mjs`);
  if (pesadas) aviso(`${pesadas} imagem(ns) acima de 250 KB; reduza --max ou recorte`);
  if (refs.size && !faltando && !formatoRuim && !pesadas) ok(`${refs.size} imagem(ns) da LP em avif/webp/svg e leves`);

  // 8. Dependência nova
  const diff = spawnSync("git", ["diff", "--quiet", "HEAD", "--", "package.json"], { cwd: ROOT });
  if (diff.status === 1) aviso("package.json alterado em relação ao git: dependência nova precisa de aprovação do tech");
  else if (diff.status === 0) ok("package.json sem alteração (zero dependência nova)");

  // 9. Código
  if (!NO_LINT) {
    const tsc = spawnSync("npx", ["tsc", "--noEmit"], { cwd: ROOT, encoding: "utf8" });
    if (tsc.status === 0) ok("tsc --noEmit limpo");
    else erro("tsc com erros:\n" + (tsc.stdout || tsc.stderr).split("\n").filter((l) => l.includes(slug)).slice(0, 10).join("\n"));
    const es = spawnSync("npx", ["eslint", `app/(landings)/${slug}`], { cwd: ROOT, encoding: "utf8" });
    if (es.status === 0) ok("eslint limpo");
    else erro("eslint com erros:\n" + (es.stdout || es.stderr).slice(0, 1500));
  }

  // 10. Fontes de texto: travessão também no código-fonte da LP
  const srcFiles = await listar(LP_DIR);
  let travSrc = 0;
  for (const f of srcFiles) travSrc += ((await readFile(f, "utf8")).match(/[—–]/g) ?? []).length;
  if (travSrc) aviso(`${travSrc} travessão(ões) no código-fonte da LP (comentários contam; troque também)`);

  relatorio();
}

async function listar(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await listar(p)));
    else if (/\.(tsx?|css|ts)$/.test(e.name)) out.push(p);
  }
  return out;
}

function relatorio() {
  const erros = itens.filter((i) => i.nivel === "✗").length;
  const avisos = itens.filter((i) => i.nivel === "!").length;
  console.log(`\nValidação de /${slug}\n`);
  for (const i of itens) console.log(` ${i.nivel} ${i.msg}`);
  console.log(`\n${erros} erro(s) · ${avisos} aviso(s)`);
  console.log(erros ? "\nNÃO entregar ainda: corrija os ✗ e rode de novo." : "\nPronto para /entrega-tech. Revise os avisos (!) e descreva no LEIA-ME o que ficou pendente.");
  process.exit(erros ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
