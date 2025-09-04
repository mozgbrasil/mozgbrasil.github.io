# Site do Marcio (GitHub Pages)

[![Deploy to GitHub Pages](https://github.com/mozgbrasil/mozgbrasil.github.io/actions/workflows/pages.yml/badge.svg)](https://github.com/mozgbrasil/mozgbrasil.github.io/actions/workflows/pages.yml)
[![Lighthouse CI](https://github.com/mozgbrasil/mozgbrasil.github.io/actions/workflows/lighthouse.yml/badge.svg)](https://github.com/mozgbrasil/mozgbrasil.github.io/actions/workflows/lighthouse.yml)
[![Link Checker](https://github.com/mozgbrasil/mozgbrasil.github.io/actions/workflows/link-check.yml/badge.svg)](https://github.com/mozgbrasil/mozgbrasil.github.io/actions/workflows/link-check.yml)

Site pessoal/portfólio publicado em https://mozg.com.br/

## Features

- SEO completo: meta tags OG/Twitter, `sitemap.xml`, `robots.txt`, JSON-LD.
- Performance: CSS/JS mínimos, dark/light theme, sem dependências pesadas.
- PWA básico: `manifest.webmanifest`, ícones e `theme-color`.
- CI/CD: deploy automático via GitHub Pages; checagens Lighthouse e links.

## Rodar localmente

Requisitos: Node.js (opcional). Você pode usar qualquer servidor estático.

```bash
npx http-server -p 8080 .
# abra http://localhost:8080
```

Sem Node, use o Python embutido:

```bash
python3 -m http.server 8080
# abra http://localhost:8080
```

## Estrutura

- `index.html` — Landing page.
- `assets/styles.css` — Estilos.
- `assets/script.js` — Tema e utilidades.
- `manifest.webmanifest` — PWA básico.
- `sitemap.xml`, `robots.txt`, `.nojekyll` — SEO/Pages.
- `.github/workflows/` — Pipelines de deploy e qualidade.

## Deploy

O deploy é feito via GitHub Actions para GitHub Pages:

1. Commits na branch `main` disparam `pages.yml`.
2. O workflow faz upload dos artefatos e publica na página.
3. URL: https://mozg.com.br/

Para habilitar Pages (uma vez): Settings → Pages → Build and deployment = GitHub Actions.

## Contato

- 💻 Desenvolvedor Fullstack
- 🌱 Java, Node.js e Python
- 🔭 Projetos poliglotas
- 📫 suporte@mozg.com.br

