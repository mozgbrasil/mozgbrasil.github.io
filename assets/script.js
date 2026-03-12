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
