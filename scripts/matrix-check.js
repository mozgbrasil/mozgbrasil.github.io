#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const packageJson = JSON.parse(
  fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'),
);
const readme = fs.readFileSync(path.join(projectRoot, 'README.md'), 'utf8');
const agents = fs.readFileSync(path.join(projectRoot, 'AGENTS.md'), 'utf8');
const claude = fs.readFileSync(path.join(projectRoot, 'CLAUDE.md'), 'utf8');

const requiredScripts = [
  'format:check',
  'lint',
  'test',
  'check',
  'check:full',
  'matrix:check',
  'surface:json',
  'surface:md',
  'surface:ready',
  'surface:links',
  'surface:links:ndjson',
  'ci',
];

const requiredFiles = [
  'README.md',
  'AGENTS.md',
  'CLAUDE.md',
  'index.html',
  'curriculum.html',
  'manifest.webmanifest',
  'scripts/build.sh',
  'scripts/site-surface.js',
];

const readmeExpectations = [
  'npm run surface:json',
  'https://mozg.com.br/',
  'https://mozgbrasil.github.io/',
];

const failures = [];

for (const scriptName of requiredScripts) {
  if (!packageJson.scripts?.[scriptName]) {
    failures.push(`script ausente: ${scriptName}`);
  }
}

for (const fileName of requiredFiles) {
  if (!fs.existsSync(path.join(projectRoot, fileName))) {
    failures.push(`arquivo ausente: ${fileName}`);
  }
}

for (const snippet of readmeExpectations) {
  if (!readme.includes(snippet)) {
    failures.push(`README.md nao referencia: ${snippet}`);
  }
}

if (agents !== claude) {
  failures.push('AGENTS.md e CLAUDE.md precisam permanecer equivalentes');
}

if (failures.length > 0) {
  console.error(
    JSON.stringify(
      {
        ok: false,
        project: packageJson.name,
        checked_at: new Date().toISOString(),
        failures,
      },
      null,
      2,
    ),
  );
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      ok: true,
      project: packageJson.name,
      checked_at: new Date().toISOString(),
      scripts: requiredScripts,
      files: requiredFiles,
    },
    null,
    2,
  ),
);
