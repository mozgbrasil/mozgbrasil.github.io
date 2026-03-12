# mozgbrasil.github.io

Landing pessoal e portfolio profissional de Marcio dos Santos Amorim,
publicado em GitHub Pages com dominio customizado em
[https://mozg.com.br/](https://mozg.com.br/).

## Visao geral

Este projeto foi desenhado para comunicar posicionamento profissional, mostrar
projetos-chave do monorepo e concentrar links publicos como GitHub, LinkedIn e
curriculo.

## O que a landing destaca

- atuacao em software desde 1999
- fundacao do MOZG em fevereiro de 2016
- experiencia em arquitetura, full stack, DevOps, automacao e observabilidade
- projetos do monorepo que mostram execucao real, nao apenas lista de stack
- metadados SEO e PWA alinhados com `mozg.com.br`

## Stack

- HTML5 semantico
- CSS3 com variaveis de tema
- JavaScript puro para tema, reveals e interacoes leves
- PWA via `manifest.webmanifest`
- GitHub Pages para publicacao

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

No monorepo, este projeto entra na matriz como conteudo estatico:

- `runtime`: vazio
- `format/lint/test`: desabilitados
- `deploy`: `pages`
- `dist_dir`: `.`

A publicacao e feita a partir da raiz do projeto no GitHub Pages.

## CI

No CI do monorepo, este projeto publica o diretório raiz em `mozgbrasil/mozgbrasil.github.io`.
