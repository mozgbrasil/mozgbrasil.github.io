const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');

function readProjectFile(relativePath) {
  return fs.readFileSync(path.join(projectRoot, relativePath), 'utf8');
}

test('README keeps the official public profiles section', () => {
  const readme = readProjectFile('README.md');

  for (const snippet of [
    '## Perfis públicos oficiais',
    'https://bsky.app/profile/mozgbrasil.bsky.social',
    'https://github.com/sponsors/mozgbrasil',
    'https://developers.google.com/profile/u/mozgbrasil',
    'https://openprofile.dev/profile/mozgbrasil',
    'npm run surface:ready',
    'npm run surface:links:ndjson',
    'supported_filters',
    'ndjson',
    'request_id',
    'x_request_timestamp',
    'x_request_path',
    'x_request_method',
  ]) {
    assert.match(
      readme,
      new RegExp(snippet.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
    );
  }
});
