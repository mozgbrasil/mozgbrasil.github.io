const storageKey = 'mozg-theme';
const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const themeLabel = themeToggle?.querySelector('[data-theme-label]');
const themeMeta = document.querySelector('meta[name="theme-color"]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const themeQuery = window.matchMedia('(prefers-color-scheme: dark)');

function updateThemeUi(theme) {
  const isDark = theme === 'dark';
  root.dataset.theme = theme;

  if (themeLabel) {
    themeLabel.textContent = isDark ? 'Tema claro' : 'Tema escuro';
  }

  if (themeToggle) {
    themeToggle.setAttribute(
      'aria-label',
      isDark ? 'Ativar tema claro' : 'Ativar tema escuro',
    );
  }

  if (themeMeta) {
    themeMeta.setAttribute('content', isDark ? '#0f172a' : '#edf4ff');
  }
}

function resolveInitialTheme() {
  const savedTheme = localStorage.getItem(storageKey);
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  return themeQuery.matches ? 'dark' : 'light';
}

function applyTheme(theme, persist = false) {
  updateThemeUi(theme);

  if (persist) {
    localStorage.setItem(storageKey, theme);
  }
}

themeToggle?.addEventListener('click', () => {
  const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme, true);
});

themeQuery.addEventListener('change', (event) => {
  if (!localStorage.getItem(storageKey)) {
    applyTheme(event.matches ? 'dark' : 'light');
  }
});

applyTheme(resolveInitialTheme());

const revealItems = document.querySelectorAll('.reveal');

if (reducedMotion.matches) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: '0px 0px -40px 0px',
    },
  );

  revealItems.forEach((item) => observer.observe(item));
}

const yearNode = document.getElementById('year');

if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

const githubDashboard = document.querySelector('[data-github-dashboard]');
const githubStatusNode = document.querySelector('[data-github-status]');
const githubDashboardTtlMs = 30 * 60 * 1000;

function safeLocalStorageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeLocalStorageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignore storage failures in private mode or locked-down browsers.
  }
}

function formatGithubNumber(value) {
  return new Intl.NumberFormat('pt-BR').format(Number(value || 0));
}

function formatGithubDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'data indisponivel';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

function formatGithubRelative(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'agora ha pouco';
  }

  const elapsedMs = date.getTime() - Date.now();
  const units = [
    ['day', 24 * 60 * 60 * 1000],
    ['hour', 60 * 60 * 1000],
    ['minute', 60 * 1000],
  ];
  const relativeFormatter = new Intl.RelativeTimeFormat('pt-BR', {
    numeric: 'auto',
  });

  for (const [unit, unitMs] of units) {
    if (Math.abs(elapsedMs) >= unitMs || unit === 'minute') {
      return relativeFormatter.format(Math.round(elapsedMs / unitMs), unit);
    }
  }

  return 'agora ha pouco';
}

function formatGithubEventType(type) {
  const labels = {
    CreateEvent: 'Novo marco',
    ForkEvent: 'Fork',
    IssueCommentEvent: 'Comentario',
    IssuesEvent: 'Issue',
    PullRequestEvent: 'Pull request',
    PullRequestReviewEvent: 'Review',
    PullRequestReviewCommentEvent: 'Comentario em review',
    PushEvent: 'Push',
    ReleaseEvent: 'Release',
    WatchEvent: 'Star recebida',
  };

  return labels[type] || 'Atividade publica';
}

function setDashboardText(selector, value) {
  const node = document.querySelector(selector);
  if (node) {
    node.textContent = value;
  }
}

function setDashboardLink(selector, href) {
  const node = document.querySelector(selector);
  if (node && href) {
    node.href = href;
  }
}

function setDashboardStatus(message) {
  if (githubStatusNode) {
    githubStatusNode.textContent = message;
  }
}

function buildGithubSummary(user, repos, events) {
  const safeRepos = Array.isArray(repos) ? repos : [];
  const safeEvents = Array.isArray(events) ? events : [];
  const now = Date.now();
  const latestRepo = [...safeRepos].sort(
    (left, right) =>
      new Date(right.pushed_at || 0).getTime() -
      new Date(left.pushed_at || 0).getTime(),
  )[0];
  const topRepo = [...safeRepos].sort(
    (left, right) =>
      (right.stargazers_count || 0) - (left.stargazers_count || 0) ||
      new Date(right.pushed_at || 0).getTime() -
        new Date(left.pushed_at || 0).getTime(),
  )[0];
  const latestEvent = safeEvents.find(
    (event) => event?.created_at && event?.repo,
  );
  const totalStars = safeRepos.reduce(
    (sum, repo) => sum + Number(repo?.stargazers_count || 0),
    0,
  );
  const totalForks = safeRepos.reduce(
    (sum, repo) => sum + Number(repo?.forks_count || 0),
    0,
  );
  const activeRepos = safeRepos.filter((repo) => {
    const pushedAt = new Date(repo?.pushed_at || 0).getTime();
    return pushedAt > 0 && now - pushedAt <= 30 * 24 * 60 * 60 * 1000;
  }).length;

  return {
    fetchedAt: new Date().toISOString(),
    profileValue: `${formatGithubNumber(user?.public_repos)} repos publicos`,
    profileMeta: `Perfil atualizado ${formatGithubRelative(
      user?.updated_at,
    )} (${formatGithubDate(user?.updated_at)}).`,
    publicRepos: formatGithubNumber(user?.public_repos),
    followers: formatGithubNumber(user?.followers),
    following: formatGithubNumber(user?.following),
    starsValue: `${formatGithubNumber(totalStars)} estrelas somadas`,
    starsMeta: topRepo
      ? `Maior destaque: ${topRepo.name} com ${formatGithubNumber(
          topRepo.stargazers_count,
        )} estrela(s).`
      : 'Nenhum repositorio publico encontrado para destacar.',
    totalStars: formatGithubNumber(totalStars),
    totalForks: formatGithubNumber(totalForks),
    activeRepos: formatGithubNumber(activeRepos),
    eventValue: latestEvent
      ? `${formatGithubEventType(latestEvent.type)} ${formatGithubRelative(
          latestEvent.created_at,
        )}`
      : 'Sem eventos recentes',
    eventMeta: latestEvent
      ? `${latestEvent.repo.name} em ${formatGithubDate(latestEvent.created_at)}.`
      : 'A API publica nao retornou eventos recentes para este perfil.',
    eventLink: latestEvent
      ? `https://github.com/${latestEvent.repo.name}`
      : 'https://github.com/mozgbrasil',
    repoValue: latestRepo ? latestRepo.name : 'Sem repositorio ativo',
    repoMeta: latestRepo
      ? `Ultimo push ${formatGithubRelative(
          latestRepo.pushed_at,
        )} em ${latestRepo.language || 'stack mista'}.`
      : 'Nao foi possivel identificar um repositorio com push recente.',
    repoLink:
      latestRepo?.html_url || 'https://github.com/mozgbrasil?tab=repositories',
  };
}

function renderGithubSummary(summary, options = {}) {
  setDashboardText('[data-metric-profile-value]', summary.profileValue);
  setDashboardText('[data-metric-profile-meta]', summary.profileMeta);
  setDashboardText('[data-metric-public-repos]', summary.publicRepos);
  setDashboardText('[data-metric-followers]', summary.followers);
  setDashboardText('[data-metric-following]', summary.following);
  setDashboardText('[data-metric-stars-value]', summary.starsValue);
  setDashboardText('[data-metric-stars-meta]', summary.starsMeta);
  setDashboardText('[data-metric-stars]', summary.totalStars);
  setDashboardText('[data-metric-forks]', summary.totalForks);
  setDashboardText('[data-metric-active-repos]', summary.activeRepos);
  setDashboardText('[data-metric-event-value]', summary.eventValue);
  setDashboardText('[data-metric-event-meta]', summary.eventMeta);
  setDashboardText('[data-metric-repo-value]', summary.repoValue);
  setDashboardText('[data-metric-repo-meta]', summary.repoMeta);
  setDashboardLink('[data-metric-event-link]', summary.eventLink);
  setDashboardLink('[data-metric-repo-link]', summary.repoLink);

  if (options.cached) {
    setDashboardStatus(
      `Sinais do GitHub em cache local, sincronizados ${formatGithubRelative(
        summary.fetchedAt,
      )}.`,
    );
    return;
  }

  setDashboardStatus(
    `Sinais do GitHub sincronizados ${formatGithubRelative(
      summary.fetchedAt,
    )} (${formatGithubDate(summary.fetchedAt)}).`,
  );
}

function loadGithubCache(cacheKey) {
  const cachedRaw = safeLocalStorageGet(cacheKey);
  if (!cachedRaw) {
    return null;
  }

  try {
    const cached = JSON.parse(cachedRaw);
    if (!cached?.summary || !cached?.cachedAt) {
      return null;
    }

    return cached;
  } catch {
    return null;
  }
}

async function fetchGithubJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`GitHub API respondeu ${response.status}`);
  }

  return response.json();
}

async function hydrateGithubDashboard() {
  if (!githubDashboard) {
    return;
  }

  const userName = githubDashboard.dataset.githubUser || 'mozgbrasil';
  const cacheKey = `mozg-github-dashboard:${userName}`;
  const cached = loadGithubCache(cacheKey);

  if (cached?.summary) {
    renderGithubSummary(cached.summary, { cached: true });
    if (Date.now() - Number(cached.cachedAt) < githubDashboardTtlMs) {
      return;
    }
  }

  try {
    const [user, repos, events] = await Promise.all([
      fetchGithubJson(`https://api.github.com/users/${userName}`),
      fetchGithubJson(
        `https://api.github.com/users/${userName}/repos?per_page=100&sort=updated`,
      ),
      fetchGithubJson(
        `https://api.github.com/users/${userName}/events/public?per_page=10`,
      ),
    ]);

    const summary = buildGithubSummary(user, repos, events);
    renderGithubSummary(summary);
    safeLocalStorageSet(
      cacheKey,
      JSON.stringify({
        cachedAt: Date.now(),
        summary,
      }),
    );
  } catch (error) {
    if (cached?.summary) {
      setDashboardStatus(
        'Nao foi possivel atualizar o GitHub agora; mantendo o ultimo snapshot local.',
      );
      return;
    }

    setDashboardStatus(
      'Nao foi possivel carregar os sinais vivos do GitHub neste momento.',
    );
    setDashboardText('[data-metric-profile-value]', 'GitHub indisponivel');
    setDashboardText(
      '[data-metric-profile-meta]',
      error instanceof Error
        ? error.message
        : 'Falha desconhecida ao consultar a API publica.',
    );
  }
}

hydrateGithubDashboard();
