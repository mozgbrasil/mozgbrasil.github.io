#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"
PHASE="${1:-all}"

usage() {
  cat << 'EOF'
usage: bash scripts/build.sh [all|format-only|lint-only|test-only|surface-only|ready-only|check-only|help|--help]
EOF
}

required_files=(
  "index.html"
  "curriculum.html"
  "manifest.webmanifest"
  "robots.txt"
  "sitemap.xml"
  "assets/favicon.svg"
  "assets/icon-192.svg"
  "assets/icon-512.svg"
  "assets/styles.css"
  "assets/script.js"
  "assets/gamification.js"
  "scripts/site-surface.js"
)

find_text_issues() {
  local path="$1"
  awk '
    /\t/ || / +$/ {
      printf "%d:%s\n", NR, $0
      found = 1
    }
    END {
      exit found ? 0 : 1
    }
  ' "$path"
}

contains_fixed() {
  local path="$1"
  local pattern="$2"
  grep -Fq -- "$pattern" "$path"
}

list_asset_references() {
  grep -Eho 'assets/[A-Za-z0-9._/-]+' "$@" | sort -u
}

assert_file() {
  local path="$1"
  if [[ ! -f "$path" ]]; then
    echo "missing file: $path" >&2
    exit 1
  fi
}

assert_contains() {
  local path="$1"
  local pattern="$2"
  if ! contains_fixed "$path" "$pattern"; then
    echo "missing pattern in $path: $pattern" >&2
    exit 1
  fi
}

assert_not_contains() {
  local path="$1"
  local pattern="$2"
  if contains_fixed "$path" "$pattern"; then
    echo "forbidden pattern in $path: $pattern" >&2
    exit 1
  fi
}

text_candidate_files() {
  {
    printf '%s\n' "$PROJECT_ROOT/README.md"
    printf '%s\n' "$PROJECT_ROOT/AGENTS.md"
    printf '%s\n' "$PROJECT_ROOT/CLAUDE.md"
    find "$PROJECT_ROOT" \
      -path "$PROJECT_ROOT/.git" -prune -o \
      -type f \
      \( -name '*.css' -o -name '*.html' -o -name '*.js' -o -name '*.md' -o -name '*.svg' -o -name '*.txt' -o -name '*.webmanifest' -o -name '*.xml' \) \
      -print |
      sort
  } | awk '!seen[$0]++'
}

validate_text_format() {
  local failed=0 path
  echo "📦 format"
  while IFS= read -r path; do
    [[ -f "$path" ]] || continue
    if find_text_issues "$path" > /dev/null 2>&1; then
      echo "format issue in $path" >&2
      find_text_issues "$path" >&2 || true
      failed=1
    fi
    if [[ -n "$(tail -c1 "$path" 2> /dev/null || true)" ]]; then
      echo "missing trailing newline in $path" >&2
      failed=1
    fi
  done < <(text_candidate_files)

  if [[ "$failed" -ne 0 ]]; then
    exit 1
  fi
}

run_lint_checks() {
  echo "📦 files"
  for path in "${required_files[@]}"; do
    assert_file "$path"
  done

  echo "📦 html metadata"
  assert_contains "index.html" "https://mozg.com.br/"
  assert_contains "index.html" "https://mozgbrasil.github.io/"
  assert_contains "index.html" "rel=\"canonical\""
  assert_contains "index.html" "application/ld+json"
  assert_contains "index.html" "og:title"
  assert_contains "index.html" "twitter:card"
  assert_contains "index.html" "manifest.webmanifest"
  assert_contains "index.html" "/curriculum.html"
  assert_contains "index.html" "superfícies públicas aparecem"
  assert_contains "index.html" "vw-access-button"
  assert_not_contains "index.html" "https://github.com/mozgbrasil/monorepo"

  assert_contains "curriculum.html" "https://mozg.com.br/curriculum.html"
  assert_contains "curriculum.html" "rel=\"canonical\""
  assert_contains "curriculum.html" "manifest.webmanifest"
  assert_contains "curriculum.html" "Marcio dos Santos Amorim"
  assert_contains "curriculum.html" "vw-access-button"
  assert_contains "curriculum.html" "/assets/script.js"

  echo "📦 manifest"
  assert_contains "manifest.webmanifest" "\"name\""
  assert_contains "manifest.webmanifest" "\"short_name\""
  assert_contains "manifest.webmanifest" "\"start_url\""
  assert_contains "manifest.webmanifest" "\"display\""
  assert_contains "manifest.webmanifest" "\"shortcuts\""
  assert_contains "manifest.webmanifest" "https://mozgbrasil.github.io/"

  echo "📦 discovery"
  assert_contains "robots.txt" "Sitemap:"
  assert_contains "sitemap.xml" "https://mozg.com.br/"
  assert_contains "sitemap.xml" "https://mozg.com.br/curriculum.html"

  echo "📦 static checks"
  assert_contains "assets/script.js" "localStorage"
  assert_contains "assets/script.js" "https://vlibras.gov.br/app/vlibras-plugin.js"
  assert_contains "assets/script.js" "https://vlibras.gov.br/app"
  assert_contains "assets/gamification.js" "document"
  assert_contains "assets/styles.css" ":root"
}

run_site_smoke() {
  echo "📦 asset references"
  while IFS= read -r asset; do
    [[ -z "$asset" ]] && continue
    assert_file "$asset"
  done < <(list_asset_references index.html curriculum.html)
}

run_unit_tests() {
  echo "📦 unit tests"
  if [[ ! -d "tests" ]]; then
    echo "missing tests directory" >&2
    exit 1
  fi

  node --test tests/*.test.js
}

run_surface_checks() {
  echo "📦 surface"
  node scripts/site-surface.js --format=json > /dev/null
  node scripts/site-surface.js --view=links --format=ndjson > /dev/null
  node scripts/site-surface.js --view=readiness --format=json > /dev/null
}

echo "== mozgbrasil.github.io build =="

case "$PHASE" in
  format-only)
    validate_text_format
    ;;
  lint-only)
    run_lint_checks
    ;;
  test-only)
    run_site_smoke
    run_unit_tests
    ;;
  surface-only)
    run_surface_checks
    ;;
  ready-only)
    node scripts/site-surface.js --view=readiness --format=json > /dev/null
    ;;
  check-only)
    validate_text_format
    run_lint_checks
    run_site_smoke
    run_unit_tests
    run_surface_checks
    ;;
  all)
    validate_text_format
    run_lint_checks
    run_site_smoke
    run_unit_tests
    run_surface_checks
    ;;
  help | --help)
    usage
    ;;
  *)
    usage >&2
    exit 2
    ;;
esac

echo "OK: static site checks passed."
