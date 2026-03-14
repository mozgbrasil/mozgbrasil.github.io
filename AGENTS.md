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

## CI Notes

- Este projeto é governado por `.github/matrix.json`.
- Valide matriz e documentação com `npm run matrix:check`.
- O workspace `monorepo` e privado; a landing deve referenciar o laboratorio por superficies publicas e artefatos derivados, nunca por URL publica do repositório fonte.
- Mantenha `AGENTS.md` e `CLAUDE.md` equivalentes.
