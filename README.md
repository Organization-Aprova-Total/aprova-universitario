# Aprova Universitário · Landing page

Landing page "Anatomia, Bioquímica e Fisiologia" do Aprova Universitário, em React (Next 15, static export).

## Rodar

```bash
nvm use 25
npm install
echo 'NEXT_PUBLIC_PATH=http://localhost:3000/' > .env.local
npm run dev
```

Abra `http://localhost:3000/aprova-universitario/`.

## Build de produção

```bash
NEXT_PUBLIC_PATH=https://aprovatotal.com.br/lp/ npm run build
node scripts/validar-lp.mjs aprova-universitario --no-build
```

O site estático sai em `out/`. `NEXT_PUBLIC_PATH` define a URL pública: o pathname vira o basePath.

## Onde está o quê

| Caminho | O que é |
|---|---|
| `app/(landings)/aprova-universitario/_content/index.ts` | todo o texto da página e as constantes: checkout, login, endpoint e campos do formulário |
| `app/(landings)/aprova-universitario/_components/` | uma seção por arquivo (hero, disciplinas, comparativo, formulário, FAQ, guia...) |
| `app/(landings)/aprova-universitario/_content/disciplinas-guia.ts` | conteúdo do guia do ciclo básico e das 11 páginas por disciplina |
| `app/(landings)/aprova-universitario/[disciplina]/` | página dedicada de cada disciplina (`/aprova-universitario/anatomia/` etc.) |
| `app/(landings)/aprova-universitario/aprova-universitario.css` | o estilo da página |
| `public/images/aprova-universitario/` | imagens em AVIF e WebP |
| `public/videos/aprova-universitario/` | vídeo do hero |
| `config/landings.ts` | registro da página (title, description, rota) |
| `public/aprova-universitario/llms.txt` | resumo da página para IAs de busca |

## Formulário "Planos de Ensino"

Envia para o ActiveCampaign (form 281) por JSONP, igual ao embed original, e dispara `generate_lead` no `dataLayer`. Constantes em `_content/index.ts`.

## Pendências

Lista completa e atualizada em `PENDENCIAS.md`.

- Domínio de publicação: as URLs seguem `aprovatotal.com.br/lp/aprova-universitario/`. Para publicar em `aprovauniversitario.com.br`, ajustar `config/site.ts` e `NEXT_PUBLIC_PATH`.
- Confirmar `oferta` e `productCode` do checkout em `_content/index.ts`.
- Testar um lead real no formulário depois de publicar.
- O FAQ diz "R$ 499 pelo ano inteiro" enquanto a página mostra R$ 79,00 por mês (copiado do design).
