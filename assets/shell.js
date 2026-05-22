const STATE_KEY = 'quantum-journey:state';
const DEFAULTS = { xp: 0, streak: 0, completed: [], lang: 'en', lastVisit: null };

const I18N = {
  en: {
    'brand': 'Quantum Journey',
    'hero.title': '15 minutes a day to quantum.',
    'hero.lede': 'A daily micro-lesson, from classical physics to quantum computing.',
    'progress.label': 'Day',
    'progress.of': 'of',
    'tile.locked': 'Coming soon',
  },
  'pt-BR': {
    'brand': 'Jornada Quântica',
    'hero.title': '15 minutos por dia rumo ao quântico.',
    'hero.lede': 'Uma microlição diária, da física clássica à computação quântica.',
    'progress.label': 'Dia',
    'progress.of': 'de',
    'tile.locked': 'Em breve',
  },
};

function loadState() {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : { ...DEFAULTS };
  } catch {
    return { ...DEFAULTS };
  }
}

function saveState(s) {
  localStorage.setItem(STATE_KEY, JSON.stringify(s));
}

function today() { return new Date().toISOString().slice(0, 10); }
function yesterday() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function applyStreak(s) {
  const t = today();
  if (s.lastVisit === t) return s;
  s.streak = s.lastVisit === yesterday() ? s.streak + 1 : 1;
  s.lastVisit = t;
  return s;
}

function applyI18n(lang) {
  document.documentElement.lang = lang;
  const dict = I18N[lang] || I18N.en;
  for (const el of document.querySelectorAll('[data-i18n]')) {
    const k = el.getAttribute('data-i18n');
    if (dict[k] != null) el.textContent = dict[k];
  }
  for (const btn of document.querySelectorAll('.lang-toggle button')) {
    btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
  }
}

async function loadManifest() {
  const r = await fetch('./days/manifest.json', { cache: 'no-store' });
  if (!r.ok) throw new Error('Failed to load manifest');
  return r.json();
}

function renderGrid(manifest, state) {
  const grid = document.getElementById('dayGrid');
  grid.innerHTML = '';
  manifest.days.forEach((d, i) => {
    const locked = !!d.locked;
    const done = state.completed.includes(d.id);
    const tile = document.createElement('button');
    tile.className = 'day-tile' + (locked ? ' locked' : '') + (done ? ' completed' : '');
    tile.disabled = locked;
    const topic = (d.topic && (d.topic[state.lang] || d.topic.en)) || '';
    tile.innerHTML = `<span class="num">${String(i + 1).padStart(2, '0')}</span><span class="topic">${topic}</span>`;
    tile.addEventListener('click', () => {
      if (locked) return;
      openLesson(d, state.lang);
    });
    grid.appendChild(tile);
  });
  document.getElementById('progressTotal').textContent = manifest.days.length;
  document.getElementById('progressDay').textContent = Math.min(state.completed.length + 1, manifest.days.length);
  document.getElementById('xpValue').textContent = state.xp;
  document.querySelector('.streak-count').textContent = state.streak;
}

function openLesson(day, lang) {
  const modal = document.getElementById('lessonModal');
  const frame = document.getElementById('lessonFrame');
  frame.src = `./days/${day.id}/index.html?lang=${encodeURIComponent(lang)}`;
  modal.showModal();
}

function closeLesson() {
  const modal = document.getElementById('lessonModal');
  const frame = document.getElementById('lessonFrame');
  if (modal.open) modal.close();
  frame.src = 'about:blank';
}

window.addEventListener('message', (ev) => {
  const data = ev.data;
  if (!data || typeof data !== 'object') return;
  if (data.type === 'lesson:complete') {
    const state = loadState();
    if (!state.completed.includes(data.dayId)) {
      state.completed.push(data.dayId);
      state.xp += Number(data.xp) || 0;
      saveState(state);
    }
    loadManifest().then(m => renderGrid(m, state));
  }
  if (data.type === 'lesson:close') closeLesson();
});

document.addEventListener('click', (ev) => {
  if (ev.target.matches('[data-action="close"]')) closeLesson();
  if (ev.target.matches('.lang-toggle button')) {
    const lang = ev.target.dataset.lang;
    const state = loadState();
    state.lang = lang;
    saveState(state);
    applyI18n(lang);
    loadManifest().then(m => renderGrid(m, state));
  }
});

document.getElementById('lessonModal').addEventListener('close', () => {
  document.getElementById('lessonFrame').src = 'about:blank';
});

(async function init() {
  let state = loadState();
  state = applyStreak(state);
  saveState(state);
  applyI18n(state.lang);
  try {
    const manifest = await loadManifest();
    renderGrid(manifest, state);
  } catch (e) {
    document.getElementById('dayGrid').innerHTML = `<p style="color:var(--fg-dim)">Manifest unavailable. Run a local server (e.g. <code>python3 -m http.server</code>) to load lessons.</p>`;
  }
})();
