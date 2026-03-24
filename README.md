# mozgbrasil.github.io

Landing pessoal e portfolio profissional de Marcio dos Santos Amorim,
publicado em GitHub Pages com dominio customizado em
[https://mozg.com.br/](https://mozg.com.br/).

## Visao geral

Este projeto foi desenhado para comunicar posicionamento profissional, mostrar
projetos-chave do monorepo e concentrar links publicos como GitHub, LinkedIn,
Bluesky, GitHub Sponsors, Google Developers, OpenProfile e curriculo.

O workspace fonte do monorepo e privado no GitHub. A superficie publica desta
landing deve sempre apontar para sites, apps, portais e dossiers publicados.

## O que a landing destaca

- atuacao em software desde 1999
- fundacao do MOZG em fevereiro de 2016
- experiencia em arquitetura, full stack, DevOps, automacao e observabilidade
- projetos do monorepo que mostram execucao real, nao apenas lista de stack
- metadados SEO e PWA alinhados com `mozg.com.br`
- destaque para o portfólio mobile no Google Play:
  - **Mozg TWA** (Bubblewrap)
  - **Mozg Híbrido** (Angular)

## Presença mobile do ecossistema

O perfil do desenvolvedor no Google Play agrega os ativos de publicação:

- **Perfil oficial do desenvolvedor:** <https://play.google.com/store/apps/dev?id=8685510812208806498>
- **Mozg TWA (Bubblewrap):** <https://play.google.com/store/search?q=site:www.mozg.com.br+Mozg+TWA>
- **Mozg Híbrido (Angular):** <https://play.google.com/store/search?q=site:www.mozg.com.br+Mozg+H%C3%ADbrido>

A landing também referencia explicitamente os projetos de origem do ecossistema:

- `projects/node-vitepress` (site institucional e catálogo de presença digital)
- `projects/node-angular` (catálogo operacional da storefront)
- `projects/node-web-components` (design system público, Storybook e pacote npm)
- `projects/github-profile` (espelho de identidade técnica e sinal no GitHub)
- `mozg.com.br/projetos/*` (dossiers publicos do workspace privado)

## Stack

- HTML5 semantico
- CSS3 com variaveis de tema
- JavaScript puro para tema, reveals e interacoes leves
- PWA via `manifest.webmanifest`
- GitHub Pages para publicacao

## Requisitos

- Bash
- Node.js `24.13.0` para os checks agregados via `npm`
- `rg` para a validacao shell local
- qualquer servidor HTTP simples para inspecao manual
- `.tool-versions` fixa `nodejs 24.13.0` para reduzir drift local

## Instalação

Nao ha etapa de install obrigatoria. O gate local oficial e:

```bash
cd /Users/marcio/dados/monorepo/projects/mozgbrasil.github.io
bash scripts/build.sh
bash scripts/build.sh format-only
bash scripts/build.sh lint-only
bash scripts/build.sh test-only
bash scripts/build.sh check-only
npm run check
npm run check:full
```

## Sinais operacionais e metadados

- SEO publico com `canonical`, Open Graph, Twitter Cards e JSON-LD
- PWA com atalhos rapidos para GitHub, LinkedIn, GitHub Sponsors e portal complementar
- dashboard client-side do GitHub com cache local e fallback resiliente
- envelope client-side de request com `request_id`, `x_request_timestamp`, `x_request_path` e `x_request_method` para inspeção operacional no browser e nas chamadas à API pública do GitHub
- alinhamento semantico com `projects/github-profile`
- trilha mobile do desenvolvedor visivel no card de presença e links operacionais
- referencia publica ao design system em Storybook e ao pacote distribuido no npm
- links tecnicos adicionais para Bluesky, Google Developers, OpenProfile e apoio via Sponsors

## Perfis publicos oficiais

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

Como o projeto e estatico, qualquer servidor simples resolve.

```bash
cd /Users/marcio/dados/monorepo/projects/mozgbrasil.github.io
python3 -m http.server 8080
```

Depois, abra `http://127.0.0.1:8080`.

## Publicacao

No monorepo, este projeto entra na matriz como conteudo estatico shell-driven:

- `runtime`: `bash`
- `test`: validacao shell local via `bash scripts/build.sh`
- `deploy`: `pages`
- `dist_dir`: `.`

A publicacao e feita a partir da raiz do projeto no GitHub Pages.

## CI

No CI do monorepo, este projeto:

- valida formato textual deterministico com `bash scripts/build.sh format-only`;
- valida metadata, manifesto, discovery e contrato estatico com `bash scripts/build.sh lint-only`;
- valida referencias de assets e smoke estrutural com `bash scripts/build.sh test-only`;
- publica o diretório raiz em `mozgbrasil/mozgbrasil.github.io`.

Para o fluxo local canônico, prefira `bash scripts/build.sh all`.
Quando quiser a mesma entrada por `package.json`, use `npm run check` ou `npm run check:full`.

## Contrato de qualidade local

As fases do `build.sh` foram separadas para manter a governanca coerente com as
outras stacks do monorepo:

- `format-only`: tabs, trailing spaces e newline final em HTML, CSS, JS, SVG,
  TXT, XML, Web App Manifest e metadata textual;
- `lint-only`: metadata publica, manifesto, discovery e sinais obrigatorios da landing;
- `test-only`: referencias locais de assets nas paginas publicas e o contrato
  inicial em `tests/00-site-contract.test.js`.

## Testes locais

```bash
cd /Users/marcio/dados/monorepo/projects/mozgbrasil.github.io
node --test tests/*.test.js
bash scripts/build.sh test-only
npm test
```

O primeiro conjunto de testes valida a landing principal, o bootstrap do tema,
os seletores essenciais do dashboard client-side e a navegacao publica minima
sem depender de servidor externo.
