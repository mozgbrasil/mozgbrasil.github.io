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
- `npm run check`
- `npm run check:full`

## Maintenance Rules

- Preserve `.tool-versions` alinhado ao runtime local exigido pelos checks via `npm run check`.
- Quando o contrato de runtime mudar, atualize `README.md`, `AGENTS.md` e `CLAUDE.md` na mesma rodada.

## CI Notes

- Este projeto é governado por `.github/matrix.json`.
- Valide matriz e documentação com `npm run matrix:check`.
- O workspace `monorepo` e privado; a landing deve referenciar o laboratorio por superficies publicas e artefatos derivados, nunca por URL publica do repositório fonte.
- Prefira `bash scripts/build.sh all` como gate local e `npm run check` quando quiser a agregacao via `package.json`.
- Mantenha `AGENTS.md` e `CLAUDE.md` equivalentes.
