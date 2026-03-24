const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');

function readProjectFile(relativePath) {
  return fs.readFileSync(path.join(projectRoot, relativePath), 'utf8');
}

test('landing keeps public metadata and navigation anchors', () => {
  const indexHtml = readProjectFile('index.html');

  for (const snippet of [
    'https://mozg.com.br/',
    'rel="canonical"',
    'application/ld+json',
    'id="theme-toggle"',
    'data-github-dashboard',
    'href="#projetos"',
    'href="/curriculum.html"',
    'https://bsky.app/profile/mozgbrasil.bsky.social',
    'https://github.com/sponsors/mozgbrasil',
    'https://developers.google.com/profile/u/mozgbrasil',
    'https://openprofile.dev/profile/mozgbrasil',
  ]) {
    assert.match(
      indexHtml,
      new RegExp(snippet.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
    );
  }
});

test('client script keeps theme and dashboard bootstrap hooks', () => {
  const script = readProjectFile('assets/script.js');

  for (const snippet of [
    "const storageKey = 'mozg-theme';",
    "document.getElementById('theme-toggle')",
    "document.querySelector('[data-github-dashboard]')",
    "document.querySelector('[data-github-status]')",
    'request_id',
    'x_request_timestamp',
    'x_request_path',
    'x_request_method',
    'X-Request-Id',
    'localStorage',
    'IntersectionObserver',
  ]) {
    assert.match(
      script,
      new RegExp(snippet.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
    );
  }
});

test('build script runs site smoke and unit phases', () => {
  const buildScript = readProjectFile('scripts/build.sh');

  for (const snippet of [
    'test-only',
    'run_site_smoke',
    'run_unit_tests',
    'node --test tests/*.test.js',
  ]) {
    assert.match(
      buildScript,
      new RegExp(snippet.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
    );
  }
});
