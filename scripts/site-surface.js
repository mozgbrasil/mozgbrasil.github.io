const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const projectRoot = path.join(__dirname, '..');
const pageFiles = ['index.html', 'curriculum.html'];
const requiredFiles = [
  'index.html',
  'curriculum.html',
  'manifest.webmanifest',
  'robots.txt',
  'sitemap.xml',
  'assets/favicon.svg',
  'assets/icon-192.svg',
  'assets/icon-512.svg',
  'assets/styles.css',
  'assets/script.js',
  'assets/gamification.js',
  'scripts/site-surface.js',
];
const requiredSectionIds = [
  'sobre',
  'projetos',
  'ecossistema',
  'dashboards',
  'apps',
  'confianca',
  'redes',
  'contato',
];
const requiredPublicUrls = [
  'https://mozg.com.br/',
  'https://mozg.com.br/contato',
  'https://mozg.com.br/privacypolicy',
  'https://mozg.com.br/politica-de-devolucao',
  'https://mozg.com.br/finalizar-compra',
  'https://github.com/mozgbrasil',
  'https://www.linkedin.com/in/mozgbrasil/',
  'https://bsky.app/profile/mozgbrasil.bsky.social',
  'https://developers.google.com/profile/u/mozgbrasil',
  'https://openprofile.dev/profile/mozgbrasil',
  'https://play.google.com/store/apps/dev?id=8685510812208806498',
  'https://br.trustpilot.com/review/mozg.com.br',
  'https://brasilparticipativo.presidencia.gov.br/profiles/mozgbrasil/activity',
  'https://www.npmjs.com/package/@mozgbrasil/node-web-components',
];

function parseArgs(argv) {
  const args = {
    view: 'surface',
    format: 'json',
    page: null,
    category: null,
    host: null,
    section: null,
    search: null,
    status: null,
    limit: null,
  };

  for (const arg of argv) {
    if (!arg.startsWith('--')) continue;
    const [key, rawValue = 'true'] = arg.slice(2).split('=');
    const value = rawValue.trim();

    if (key === 'view') args.view = value;
    if (key === 'format') args.format = value;
    if (key === 'page') args.page = value;
    if (key === 'category') args.category = value;
    if (key === 'host') args.host = value;
    if (key === 'section') args.section = value;
    if (key === 'search') args.search = value;
    if (key === 'status') args.status = value;
    if (key === 'limit') {
      const parsed = Number.parseInt(value, 10);
      args.limit = Number.isFinite(parsed) && parsed > 0 ? parsed : null;
    }
  }

  return args;
}

function slugify(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function readText(relativePath) {
  return fs.readFileSync(path.join(projectRoot, relativePath), 'utf8');
}

function buildRequestMeta(args) {
  return {
    request_id: `mozg-site-${crypto.randomUUID().slice(0, 12)}`,
    x_request_timestamp: new Date().toISOString(),
    x_request_path: `/${args.view || 'surface'}`,
    x_request_method: 'READ',
  };
}

function categorizeUrl(rawUrl) {
  if (rawUrl.startsWith('mailto:')) {
    return { category: 'contact', host: 'mailto' };
  }

  if (rawUrl.startsWith('/')) {
    return { category: 'internal', host: 'local-site' };
  }

  const url = new URL(rawUrl);
  if (url.hostname === 'mozg.com.br') {
    return {
      category: url.pathname === '/' ? 'website' : 'dossier',
      host: url.hostname,
    };
  }
  if (url.hostname === 'mozgbrasil.github.io') {
    return { category: 'portal', host: url.hostname };
  }
  if (url.hostname === 'github.com') {
    return {
      category: url.pathname.startsWith('/sponsors/') ? 'sponsors' : 'github',
      host: url.hostname,
    };
  }
  if (url.hostname === 'www.linkedin.com') {
    return { category: 'social', host: url.hostname };
  }
  if (url.hostname === 'bsky.app') {
    return { category: 'social', host: url.hostname };
  }
  if (url.hostname === 'developers.google.com') {
    return { category: 'developer-profile', host: url.hostname };
  }
  if (url.hostname === 'openprofile.dev') {
    return { category: 'profile', host: url.hostname };
  }
  if (url.hostname === 'play.google.com') {
    return { category: 'mobile', host: url.hostname };
  }
  if (url.hostname === 'br.trustpilot.com') {
    return { category: 'trust', host: url.hostname };
  }
  if (url.hostname === 'brasilparticipativo.presidencia.gov.br') {
    return { category: 'civic', host: url.hostname };
  }
  if (url.hostname === 'www.npmjs.com') {
    return { category: 'package', host: url.hostname };
  }
  if (url.hostname.includes('youtube.com')) {
    return { category: 'video', host: url.hostname };
  }
  if (url.hostname.includes('tiktok.com')) {
    return { category: 'social', host: url.hostname };
  }
  if (url.hostname.includes('instagram.com')) {
    return { category: 'social', host: url.hostname };
  }
  if (url.hostname.includes('threads.com')) {
    return { category: 'social', host: url.hostname };
  }
  if (url.hostname.includes('facebook.com')) {
    return { category: 'social', host: url.hostname };
  }
  if (url.hostname.includes('twitch.tv')) {
    return { category: 'streaming', host: url.hostname };
  }
  if (url.hostname.includes('steamcommunity.com')) {
    return { category: 'gaming', host: url.hostname };
  }
  if (url.hostname.includes('xbox.com')) {
    return { category: 'gaming', host: url.hostname };
  }
  if (url.hostname.includes('x.com')) {
    return { category: 'social', host: url.hostname };
  }

  return { category: 'external', host: url.hostname };
}

function extractSectionIds(html) {
  const matches = [...html.matchAll(/<section[^>]*id="([^"]+)"/g)];
  return matches.map((match) => ({
    id: match[1],
    slug: slugify(match[1]),
  }));
}

function extractLinks(page, html) {
  const hrefMatches = [...html.matchAll(/href="([^"]+)"/g)];
  const links = [];
  const seen = new Set();

  for (const match of hrefMatches) {
    const url = match[1].trim();
    if (
      !(
        url.startsWith('http://') ||
        url.startsWith('https://') ||
        url.startsWith('/')
      )
    ) {
      continue;
    }
    const key = `${page}:${url}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const sectionMatch = html
      .slice(0, match.index)
      .match(
        /<section[^>]*id="([^"]+)"[^>]*>(?![\s\S]*<section[^>]*id="[^"]+"[^>]*>$)/,
      );
    const section = sectionMatch ? sectionMatch[1] : page.replace('.html', '');
    links.push({
      page,
      url,
      section,
      section_slug: slugify(section),
      label: url,
      ...categorizeUrl(url),
    });
  }

  return links;
}

function buildReadiness(pages, links) {
  const checks = [];
  const fileMissing = requiredFiles.filter(
    (file) => !fs.existsSync(path.join(projectRoot, file)),
  );
  const indexSections = new Set(
    pages
      .find((page) => page.path === 'index.html')
      ?.sections.map((entry) => entry.id) || [],
  );
  const presentUrls = new Set(
    links
      .filter((entry) => entry.category !== 'internal')
      .map((entry) => entry.url),
  );
  const scriptSource = readText('assets/script.js');
  const missingSections = requiredSectionIds.filter(
    (section) => !indexSections.has(section),
  );
  const missingUrls = requiredPublicUrls.filter((url) => !presentUrls.has(url));
  const hasRequestEnvelope =
    scriptSource.includes('request_id') &&
    scriptSource.includes('x_request_timestamp') &&
    scriptSource.includes('x_request_path') &&
    scriptSource.includes('x_request_method') &&
    scriptSource.includes('X-Request-Id');

  checks.push({
    name: 'required-files',
    status: fileMissing.length === 0 ? 'ready' : 'attention',
    detail:
      fileMissing.length === 0
        ? 'required site files are present'
        : `missing: ${fileMissing.join(', ')}`,
  });
  checks.push({
    name: 'landing-sections',
    status: missingSections.length === 0 ? 'ready' : 'attention',
    detail:
      missingSections.length === 0
        ? 'landing sections are present'
        : `missing: ${missingSections.join(', ')}`,
  });
  checks.push({
    name: 'public-links',
    status: missingUrls.length === 0 ? 'ready' : 'attention',
    detail:
      missingUrls.length === 0
        ? 'core public URLs are present'
        : `missing: ${missingUrls.join(', ')}`,
  });
  checks.push({
    name: 'request-envelope',
    status: hasRequestEnvelope ? 'ready' : 'attention',
    detail: hasRequestEnvelope
      ? 'client request envelope is present in assets/script.js'
      : 'client request envelope is incomplete in assets/script.js',
  });
  checks.push({
    name: 'dashboard-hooks',
    status:
      readText('index.html').includes('data-github-dashboard') &&
      readText('index.html').includes('data-github-status')
        ? 'ready'
        : 'attention',
    detail: 'dashboard bootstrap hooks are present in index.html',
  });

  return {
    status: checks.every((check) => check.status === 'ready')
      ? 'ready'
      : 'attention',
    endpoint: '/ready',
    checked_at: new Date().toISOString(),
    checks,
  };
}

function buildSnapshot(args) {
  const pages = pageFiles.map((page) => {
    const html = readText(page);
    return {
      path: page,
      titleMatch: html.match(/<title>([^<]+)<\/title>/i)?.[1] || page,
      sections: extractSectionIds(html),
      internal_routes: [...html.matchAll(/href="(#[^"]+|\/[^"]+)"/g)].map(
        (match) => match[1],
      ),
    };
  });

  const links = pages.flatMap((page) =>
    extractLinks(page.path, readText(page.path)),
  );
  const readiness = buildReadiness(pages, links);
  const request = buildRequestMeta(args);

  return {
    request,
    surface: {
      name: 'mozgbrasil.github.io',
      kind: 'static-landing',
      runtime: 'bash',
      supported_filters: [
        'page',
        'category',
        'host',
        'section',
        'search',
        'limit',
        'status',
      ],
      export_formats: ['json', 'md', 'ndjson'],
      readiness_path: '/ready',
    },
    query: {
      view: args.view,
      page: args.page,
      category: args.category,
      host: args.host,
      section: args.section,
      search: args.search,
      status: args.status,
      limit: args.limit,
    },
    pages,
    links,
    readiness,
    summary: {
      pages_total: pages.length,
      links_total: links.length,
      sections_total: pages.reduce(
        (total, page) => total + page.sections.length,
        0,
      ),
      readiness_status: readiness.status,
    },
  };
}

function applySearch(values, search, fields) {
  if (!search) return values;
  const term = search.toLowerCase();
  return values.filter((entry) =>
    fields.some((field) =>
      String(entry[field] || '')
        .toLowerCase()
        .includes(term),
    ),
  );
}

function withLimit(values, limit) {
  return limit ? values.slice(0, limit) : values;
}

function buildView(snapshot, args) {
  if (args.view === 'surface') {
    return snapshot;
  }

  if (args.view === 'pages') {
    let items = [...snapshot.pages];
    if (args.page) items = items.filter((entry) => entry.path === args.page);
    items = withLimit(items, args.limit);
    return {
      request: snapshot.request,
      query: snapshot.query,
      items_total: items.length,
      items,
    };
  }

  if (args.view === 'links') {
    let items = [...snapshot.links];
    if (args.page) items = items.filter((entry) => entry.page === args.page);
    if (args.category)
      items = items.filter((entry) => entry.category === args.category);
    if (args.host) items = items.filter((entry) => entry.host === args.host);
    if (args.section) {
      const sectionSlug = slugify(args.section);
      items = items.filter((entry) => entry.section_slug === sectionSlug);
    }
    items = applySearch(items, args.search, [
      'url',
      'page',
      'section',
      'category',
      'host',
    ]);
    items = withLimit(items, args.limit);
    return {
      request: snapshot.request,
      query: snapshot.query,
      items_total: items.length,
      items,
    };
  }

  if (args.view === 'readiness') {
    let checks = [...snapshot.readiness.checks];
    if (args.status)
      checks = checks.filter((entry) => entry.status === args.status);
    checks = applySearch(checks, args.search, ['name', 'status', 'detail']);
    checks = withLimit(checks, args.limit);
    return {
      request: snapshot.request,
      query: snapshot.query,
      status: snapshot.readiness.status,
      endpoint: snapshot.readiness.endpoint,
      checked_at: snapshot.readiness.checked_at,
      checks_total: checks.length,
      checks,
    };
  }

  throw new Error(
    `Unsupported view "${args.view}". Use surface, pages, links or readiness.`,
  );
}

function toMarkdown(view, payload) {
  if (view === 'surface') {
    return [
      '# MOZG Site Surface',
      '',
      `- request_id: ${payload.request.request_id}`,
      `- x_request_timestamp: ${payload.request.x_request_timestamp}`,
      `- x_request_path: ${payload.request.x_request_path}`,
      `- x_request_method: ${payload.request.x_request_method}`,
      `- readiness_path: ${payload.surface.readiness_path}`,
      `- readiness_status: ${payload.summary.readiness_status}`,
      `- pages_total: ${payload.summary.pages_total}`,
      `- links_total: ${payload.summary.links_total}`,
      `- sections_total: ${payload.summary.sections_total}`,
      '',
      '## Supported Filters',
      ...payload.surface.supported_filters.map((entry) => `- ${entry}`),
      '',
      '## Export Formats',
      ...payload.surface.export_formats.map((entry) => `- ${entry}`),
    ].join('\n');
  }

  if (view === 'pages') {
    return [
      '# MOZG Site Pages',
      '',
      `- items_total: ${payload.items_total}`,
      '',
      '## Items',
      ...payload.items.map(
        (entry) =>
          `- ${entry.path} | title=${entry.titleMatch} | sections=${entry.sections.length}`,
      ),
    ].join('\n');
  }

  if (view === 'links') {
    return [
      '# MOZG Site Links',
      '',
      `- items_total: ${payload.items_total}`,
      '',
      '## Items',
      ...payload.items.map(
        (entry) =>
          `- ${entry.url} | page=${entry.page} | category=${entry.category} | host=${entry.host} | section=${entry.section}`,
      ),
    ].join('\n');
  }

  return [
    '# MOZG Site Readiness',
    '',
    `- status: ${payload.status}`,
    `- endpoint: ${payload.endpoint}`,
    `- checks_total: ${payload.checks_total}`,
    '',
    '## Checks',
    ...payload.checks.map(
      (entry) => `- ${entry.name}: ${entry.status} | detail=${entry.detail}`,
    ),
  ].join('\n');
}

function toNdjson(view, payload) {
  let items = [payload];
  if (view === 'pages' || view === 'links') items = payload.items;
  if (view === 'readiness') items = payload.checks;
  return items.map((entry) => JSON.stringify(entry)).join('\n');
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const snapshot = buildSnapshot(args);
  const payload = buildView(snapshot, args);

  if (args.format === 'json') {
    process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
    return;
  }

  if (args.format === 'md') {
    process.stdout.write(`${toMarkdown(args.view, payload)}\n`);
    return;
  }

  if (args.format === 'ndjson') {
    process.stdout.write(`${toNdjson(args.view, payload)}\n`);
    return;
  }

  throw new Error(
    `Unsupported format "${args.format}". Use json, md or ndjson.`,
  );
}

main();
