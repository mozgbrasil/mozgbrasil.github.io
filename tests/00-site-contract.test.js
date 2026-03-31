const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const cp = require('node:child_process');

const projectRoot = path.resolve(__dirname, '..');

function readProjectFile(relativePath) {
  return fs.readFileSync(path.join(projectRoot, relativePath), 'utf8');
}

function runSurface(args = []) {
  return cp.execFileSync(
    process.execPath,
    ['scripts/site-surface.js', ...args],
    {
      cwd: projectRoot,
      encoding: 'utf8',
    },
  );
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
    'href="#confianca"',
    'href="/curriculum.html"',
    'https://bsky.app/profile/mozgbrasil.bsky.social',
    'https://github.com/sponsors/mozgbrasil',
    'https://developers.google.com/profile/u/mozgbrasil',
    'https://openprofile.dev/profile/mozgbrasil',
    'https://mozg.com.br/contato',
    'https://mozg.com.br/politica-de-devolucao',
    'https://br.trustpilot.com/review/mozg.com.br',
    '07.361.259/0001-07',
    'vw-access-button',
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
    'https://vlibras.gov.br/app/vlibras-plugin.js',
    'new window.VLibras.Widget',
    'https://vlibras.gov.br/app',
  ]) {
    assert.match(
      script,
      new RegExp(snippet.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
    );
  }
});

test('public pages expose VLibras widget bootstrap', () => {
  const indexHtml = readProjectFile('index.html');
  const curriculumHtml = readProjectFile('curriculum.html');

  for (const html of [indexHtml, curriculumHtml]) {
    for (const snippet of [
      '<div vw class="enabled">',
      'vw-access-button',
      'vw-plugin-wrapper',
    ]) {
      assert.match(
        html,
        new RegExp(snippet.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
      );
    }
  }

  assert.match(
    curriculumHtml,
    /<script defer src="\/assets\/script\.js"><\/script>/,
  );
});

test('build script runs site smoke and unit phases', () => {
  const buildScript = readProjectFile('scripts/build.sh');

  for (const snippet of [
    'test-only',
    'surface-only',
    'ready-only',
    'run_site_smoke',
    'run_unit_tests',
    'run_surface_checks',
    'node --test tests/*.test.js',
  ]) {
    assert.match(
      buildScript,
      new RegExp(snippet.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
    );
  }
});

test('site surface snapshot exposes request metadata, filters and readiness', () => {
  const snapshot = JSON.parse(runSurface(['--format=json']));

  assert.ok(snapshot.request.request_id.startsWith('mozg-site-'));
  assert.equal(snapshot.request.x_request_path, '/surface');
  assert.equal(snapshot.request.x_request_method, 'READ');
  assert.equal(snapshot.surface.readiness_path, '/ready');
  assert.ok(snapshot.surface.supported_filters.includes('page'));
  assert.ok(snapshot.surface.export_formats.includes('ndjson'));
  assert.equal(snapshot.readiness.status, 'ready');
  assert.ok(snapshot.summary.links_total >= 28);
});

test('site surface links view supports filtering and ndjson export', () => {
  const output = runSurface([
    '--view=links',
    '--format=ndjson',
    '--category=mobile',
    '--limit=3',
  ]).trim();

  const items = output.split('\n').map((line) => JSON.parse(line));

  assert.ok(items.length >= 1);
  assert.ok(items.length <= 3);
  for (const item of items) {
    assert.equal(item.category, 'mobile');
  }
});

test('site surface supports trust links filtering', () => {
  const payload = JSON.parse(
    runSurface(['--view=links', '--format=json', '--category=trust']),
  );

  assert.ok(payload.items_total >= 1);
  assert.ok(
    payload.items.some(
      (item) => item.url === 'https://br.trustpilot.com/review/mozg.com.br',
    ),
  );
});

test('site surface readiness reports operational checks', () => {
  const readiness = JSON.parse(
    runSurface(['--view=readiness', '--format=json']),
  );

  assert.equal(readiness.status, 'ready');
  assert.equal(readiness.endpoint, '/ready');
  assert.ok(readiness.checks_total >= 4);
  assert.ok(readiness.checks.every((entry) => entry.status === 'ready'));
});

test('package metadata stays aligned with the public landing contract', () => {
  const pkg = JSON.parse(readProjectFile('package.json'));

  assert.equal(pkg.homepage, 'https://mozg.com.br/');
  assert.equal(pkg.config.publicSite, 'https://mozg.com.br/');
  assert.equal(pkg.config.publicPortal, 'https://mozgbrasil.github.io/');
  assert.equal(pkg.bugs?.email, 'mozgbrasil@gmail.com');
  assert.equal(pkg.bugs?.url, 'https://mozg.com.br/contato');
  assert.doesNotMatch(
    JSON.stringify(pkg),
    /github\.com\/mozgbrasil\/monorepo/i,
  );
});
