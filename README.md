# mozgbrasil.github.io

Portal complementar e landing profissional de Marcio dos Santos Amorim,
publicado em GitHub Pages em
[https://mozgbrasil.github.io/](https://mozgbrasil.github.io/) e alinhado com a
superfície principal em
[https://mozg.com.br/](https://mozg.com.br/).

## Visão geral

Este projeto foi desenhado para comunicar posicionamento profissional, mostrar
projetos-chave do ecossistema e concentrar links públicos como GitHub, LinkedIn,
Bluesky, GitHub Sponsors, Google Developers, OpenProfile e currículo.

A superfície pública desta landing aponta para sites, apps, portais e
componentes publicados, mantendo a narrativa profissional concentrada em
superfícies úteis para o público.

Nesta rodada, a landing ganhou também uma camada explícita de confiança pública,
com política de devolução, contato institucional, prova social, jornada
comercial e referência empresarial visível na própria superfície.

## O que a landing destaca

- atuação em software desde 1999
- fundação do MOZG em fevereiro de 2016
- experiência em arquitetura, full stack, DevOps, automação e observabilidade
- projetos do ecossistema que mostram execução real, não apenas lista de stack
- metadados SEO e PWA alinhados com `mozg.com.br`
- destaque para o portfólio mobile no Google Play:
  - **Mozg TWA** (Bubblewrap)
  - **Mozg Híbrido** (Angular)

## Presença mobile do ecossistema

O perfil do desenvolvedor no Google Play agrega os ativos de publicação:

- **Perfil oficial do desenvolvedor:** <https://play.google.com/store/apps/dev?id=8685510812208806498>
- **Mozg TWA (Bubblewrap):** <https://play.google.com/store/search?q=site:www.mozg.com.br+Mozg+TWA>
- **Mozg Híbrido (Angular):** <https://play.google.com/store/search?q=site:www.mozg.com.br+Mozg+H%C3%ADbrido>

A landing também referencia explicitamente as principais superfícies do ecossistema:

- `mozg.com.br` (site institucional e catálogo de presença digital)
- `mozgbrasil.github.io` (portal complementar)
- `@mozgbrasil/node-web-components` (design system público, Storybook e pacote npm)
- `github.com/mozgbrasil` (perfil profissional e links públicos)
- `mozg.com.br/projetos/*` (páginas públicas do ecossistema)

## Stack

- HTML5 semântico
- CSS3 com variáveis de tema
- JavaScript puro para tema, reveals e interações leves
- VLibras para oferecer tradução automática do conteúdo para Libras
- PWA via `manifest.webmanifest`
- GitHub Pages para publicação

## Requisitos

- Bash
- Node.js `24.14.1` para os checks agregados via `npm`
- `rg` para a validação shell local
- qualquer servidor HTTP simples para inspeção manual
- `.tool-versions` fixa `nodejs 24.14.1` para reduzir drift local

## Instalação

Não há etapa de install obrigatória. O gate local oficial é:

```bash
cd /Volumes/SSD/monorepo/projects/mozgbrasil.github.io
bash scripts/build.sh
bash scripts/build.sh format-only
bash scripts/build.sh lint-only
bash scripts/build.sh test-only
bash scripts/build.sh surface-only
bash scripts/build.sh ready-only
bash scripts/build.sh check-only
npm run check
npm run check:full
npm run surface:json
npm run surface:md
npm run surface:ready
npm run surface:links
npm run surface:links:ndjson
```

## Sinais públicos e metadados

- SEO público com `canonical`, Open Graph, Twitter Cards e JSON-LD
- Google Analytics 4 com o ID `G-WCNGF2YB71` nas páginas públicas principais
- widget VLibras nas páginas públicas para acessibilidade em Libras
- skip link e realce automático da seção ativa no menu superior para melhorar teclado, leitura e orientação
- PWA com atalhos rápidos para GitHub, LinkedIn, GitHub Sponsors e portal complementar
- dashboard client-side do GitHub com cache local, `aria-live` e fallback resiliente
- envelope client-side de request com `request_id`, `x_request_timestamp`, `x_request_path` e `x_request_method` para inspeção confiável no browser e nas chamadas à API pública do GitHub
- superfície local `site-surface` com `supported_filters` por `page`, `category`, `host`, `section`, `search`, `limit` e `status`
- exportações locais em `json`, `md` e `ndjson`, incluindo `npm run surface:links:ndjson`
- readiness local em `npm run surface:ready` com checks pequenos para arquivos, seções, analytics, acessibilidade e superfícies públicas centrais
- alinhamento semântico com `projects/github-profile`
- trilha mobile do desenvolvedor visível no card de presença e links públicos
- referência pública ao design system em Storybook e ao pacote distribuído no npm
- links técnicos adicionais para Bluesky, Google Developers, OpenProfile e apoio via Sponsors
- seção dedicada de confiança pública com contato, políticas, CNPJ de apoio comercial e prova social
- `PRIVACY.md` alinhado com GA4, `localStorage`, GitHub público e VLibras

## Perfis públicos oficiais

- `Bluesky`: <https://bsky.app/profile/mozgbrasil.bsky.social>
- `GitHub Sponsors`: <https://github.com/sponsors/mozgbrasil>
- `Google Developers`: <https://developers.google.com/profile/u/mozgbrasil>
- `OpenProfile`: <https://openprofile.dev/profile/mozgbrasil>

## Estrutura principal

```text
mozgbrasil.github.io/
├── assets/
│   ├── favicon.svg
│   ├── icon-192.svg
│   ├── icon-512.svg
│   ├── script.js
│   └── styles.css
├── index.html
├── manifest.webmanifest
├── robots.txt
├── sitemap.xml
└── README.md
```

## Executar localmente

Como o projeto é estático, qualquer servidor simples resolve.

```bash
cd /Volumes/SSD/monorepo/projects/mozgbrasil.github.io
python3 -m http.server 8080
```

Depois, abra `http://127.0.0.1:8080`.

## Publicação

No ecossistema MOZG, este projeto entra na matriz como conteúdo estático shell-driven:

- `runtime`: `bash`
- `test`: validação shell local via `bash scripts/build.sh`
- `deploy`: `pages`
- `dist_dir`: `.`

A publicação é feita a partir da raiz do projeto no GitHub Pages.

## CI

No CI do ecossistema, este projeto:

- valida formato textual determinístico com `bash scripts/build.sh format-only`;
- valida metadata, manifesto, discovery e contrato estático com `bash scripts/build.sh lint-only`;
- valida referencias de assets e smoke estrutural com `bash scripts/build.sh test-only`;
- publica o diretório raiz em `mozgbrasil/mozgbrasil.github.io`.

Para o fluxo local canônico, prefira `bash scripts/build.sh all`.
Quando quiser a mesma entrada por `package.json`, use `npm run check` ou `npm run check:full`.

## Contrato de qualidade local

As fases do `build.sh` foram separadas para manter a governança coerente com as
outras stacks ativas:

- `format-only`: tabs, trailing spaces e newline final em HTML, CSS, JS, SVG,
  TXT, XML, Web App Manifest e metadata textual;
- `lint-only`: metadata pública, manifesto, discovery e sinais obrigatórios da landing;
- `test-only`: referências locais de assets nas páginas públicas e o contrato
  inicial em `tests/00-site-contract.test.js`.
- `surface-only`: exporta e valida a superfície operacional local sem depender de servidor externo.
- `ready-only`: confere o snapshot determinístico de readiness da landing.

## Testes locais

```bash
cd /Volumes/SSD/monorepo/projects/mozgbrasil.github.io
node --test tests/*.test.js
bash scripts/build.sh test-only
bash scripts/build.sh surface-only
npm run surface:ready
npm run surface:links:ndjson
npm test
```

O primeiro conjunto de testes valida a landing principal, o bootstrap do tema,
os seletores essenciais do dashboard client-side e a navegação pública mínima
sem depender de servidor externo.
