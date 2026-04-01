# Local Agent Guidelines

## Project Context

- name: `mozgbrasil.github.io`
- path: `projects/mozgbrasil.github.io`
- runtime: `bash`
- matrix checks: format=`true`, lint=`true`, test=`true`

## Runtime Commands

- `bash scripts/build.sh`
- `bash scripts/build.sh format-only`
- `bash scripts/build.sh lint-only`
- `bash scripts/build.sh test-only`
- `bash scripts/build.sh check-only`
- `bash scripts/build.sh surface-only`
- `bash scripts/build.sh ready-only`
- `npm run check`
- `npm run check:full`
- `npm run surface:json`
- `npm run surface:md`
- `npm run surface:ready`
- `npm run surface:links`
- `npm run surface:links:ndjson`

## Maintenance Rules

- Preserve `.tool-versions` alinhado ao runtime local exigido pelos checks via `npm run check`.
- Quando o contrato de runtime mudar, atualize `README.md`, `AGENTS.md` e `CLAUDE.md` na mesma rodada.
- Preserve o envelope local com `request_id`, `x_request_timestamp`, `x_request_path` e `x_request_method`, mais exportacoes explícitas por `json`, `md` e `ndjson`.
- Mantenha readiness local pequeno e determinístico para arquivos obrigatórios, secoes da landing e superfícies públicas centrais.
- Trate `https://mozgbrasil.github.io/` como portal complementar explícito do ecossistema, mantendo esse URL presente na landing, no `site-surface`, nos atalhos PWA e nos contratos locais junto da superfície principal em `https://mozg.com.br/`.

## CI Notes

- Este projeto é governado por `.github/matrix.json`.
- Valide matriz e documentação com `npm run matrix:check`.
- O workspace `monorepo` e privado; a landing deve referenciar o laboratório por superfícies públicas e artefatos derivados, nunca por URL pública do repositório fonte.
- Prefira `bash scripts/build.sh all` como gate local e `npm run check` quando quiser a agregacao via `package.json`.
- Mantenha `AGENTS.md` e `CLAUDE.md` equivalentes.
