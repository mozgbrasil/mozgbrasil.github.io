# Documentacao do Site MOZG

## Visao geral

`mozgbrasil.github.io` e uma landing estatica, publicada via GitHub Pages, com
foco em posicionamento profissional, portfolio e sinais publicos do monorepo.
O projeto nao depende de etapa de build local e foi desenhado para continuar
simples de operar.

## Estrutura real do projeto

```text
mozgbrasil.github.io/
├── assets/
│   ├── favicon.svg
│   ├── gamification.js
│   ├── icon-192.svg
│   ├── icon-512.svg
│   ├── script.js
│   └── styles.css
├── index.html
├── manifest.webmanifest
├── robots.txt
├── sitemap.xml
├── PRIVACY.md
├── budget.json
└── README.md
```

## Componentes principais

- `index.html`: markup semantico, SEO, Open Graph, Twitter Cards e JSON-LD
- `assets/styles.css`: identidade visual, layout responsivo, tema claro/escuro e motion
- `assets/script.js`: alternancia de tema, reveal on scroll, dashboard GitHub e cache local
- `manifest.webmanifest`: metadata PWA e atalhos para canais publicos
- `robots.txt` e `sitemap.xml`: indexacao e descoberta por mecanismos de busca
- `PRIVACY.md`: postura de privacidade do portal estatico
- `budget.json`: referencia de peso e governanca do front estatico

## Desenvolvimento local

Como o projeto e estatico, qualquer servidor simples e suficiente:

```bash
cd /Users/marcio/dados/monorepo/projects/mozgbrasil.github.io
python3 -m http.server 8080
```

Abra `http://127.0.0.1:8080`.

## Validacao recomendada

Este projeto nao possui esteira local de `lint` ou `test` na matriz. Quando
houver alteracoes relevantes, a validacao recomendada e manual:

- revisar responsividade em mobile e desktop
- testar alternancia de tema
- testar navegacao por ancora e foco via teclado
- validar carregamento de `manifest.webmanifest`, `robots.txt` e `sitemap.xml`
- conferir comportamento de fallback do dashboard GitHub quando a API publica falhar

## Publicacao e coerencia com outros canais

- dominio principal: `https://mozg.com.br/`
- portal complementar: `https://mozgbrasil.github.io/`
- perfil README do GitHub: `projects/github-profile/README.md`

Os tres pontos devem permanecer semanticamente coerentes: mesma narrativa
profissional, mesmos links principais e o mesmo nivel de metadados publicos.
