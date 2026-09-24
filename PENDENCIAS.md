# Pendências: o que depende do time

Lista viva do que não dá para resolver só no código. Atualizada em 24/09/2026.

## Oferta e preço

| # | O quê | Onde entra depois |
|---|---|---|
| 1 | **Dois planos?** A página mostra só o mensal (R$ 79,00). O FAQ fala em "R$ 499 pelo ano inteiro". Se existe plano anual, preciso de `oferta` e `productCode` do checkout dele e de qual plano deve ter destaque. Se não existe, corrigir a resposta do FAQ | `_content/index.ts` (oferta e faq) |
| 2 | **Trial gratuito de 3 a 7 dias**: decisão de negócio. Se aprovado, preciso do link de checkout do trial e do texto (ex.: "Teste grátis por 7 dias") | CTA do hero e cartão de oferta |
| 3 | **Urgência com prazo**: o banner com contagem regressiva já está pronto e desligado. Para ligar, preciso da data final da oferta e do texto (hoje: "Oferta por tempo limitado: R$ 79,00/mês termina em") | `OFERTA_PRAZO` e `OFERTA_TEXTO` em `_content/index.ts` |
| 4 | Confirmar `oferta` e `productCode` do checkout atual (`CHECKOUT_HREF`) | `_content/index.ts` |
| 5 | Confirmar se "de R$ 699" é o preço de referência correto para a âncora de/por | `PRECO.de` em `_content/index.ts` |

## Formulário (ActiveCampaign)

| # | O quê |
|---|---|
| 6 | Enviar um lead de teste depois de publicar e conferir: contato na lista do form 281, UTMs nos campos 176/190/175, automação enviando o Guia dos planos de ensino |
| 7 | Conferir a mensagem de agradecimento configurada no form 281 (a página exibe a que o ActiveCampaign devolve) |

## Publicação e rastreamento

| # | O quê |
|---|---|
| 8 | **Domínio**: as URLs seguem `aprovatotal.com.br/lp/aprova-universitario/`. Se for publicar em `aprovauniversitario.com.br`, ajustar `config/site.ts` e `NEXT_PUBLIC_PATH` |
| 9 | **Canonical** sai sem o `/lp` (`aprovatotal.com.br/aprova-universitario/`), padrão do projeto. Definir a URL canônica com o tech |
| 10 | **GTM**: o layout carrega GTM-WNM479C (Aprova Total). O Webflow do Aprova Universitário usava GTM-K6WK6PL9 e Meta Pixel próprios. Decidir qual contêiner vale |
| 11 | **Vídeo do hero** está no repositório (11 MB). Se o tech preferir CDN, trocar a constante `VIDEO` |
| 12 | Login "Sou aluno" aponta para `app.aprovauniversitario.com.br/login`. Confirmar |
