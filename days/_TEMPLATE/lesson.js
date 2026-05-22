const DAY_ID = 'dayNN';
const XP_REWARD = 10;

const params = new URLSearchParams(location.search);
const lang = params.get('lang') || 'en';
const solved = new Set();

async function loadStrings() {
  const r = await fetch('./strings.json', { cache: 'no-store' });
  return r.json();
}

function applyStrings(strings) {
  const dict = strings[lang] || strings.en;
  document.documentElement.lang = lang;
  for (const el of document.querySelectorAll('[data-i18n]')) {
    const v = dict[el.getAttribute('data-i18n')];
    if (v != null) el.innerHTML = v;
  }
  for (const el of document.querySelectorAll('[data-i18n-placeholder]')) {
    const v = dict[el.getAttribute('data-i18n-placeholder')];
    if (v != null) el.placeholder = v;
  }
  setupPlayground(dict);
}

// Wire up the day's playground interactivity here.
// Pattern: read strings via `dict[key]`, update `#playgroundOutput`,
// add `.has-content` class once the user has interacted.
function setupPlayground(dict) {
  // TODO: implement day-specific interactivity.
  // Example (day01 atoms): for each [data-atom] element in the visual,
  //   on click/keypress, set out.textContent = dict['atom.' + el.dataset.atom];
}

function markSolved(i) {
  solved.add(i);
  if (solved.size >= document.querySelectorAll('.q').length) {
    document.getElementById('finishBtn').disabled = false;
  }
}

document.querySelectorAll('.q').forEach((q, i) => {
  if (q.classList.contains('fill')) {
    const input = q.querySelector('input');
    const btn = q.querySelector('.check');
    const expected = (q.dataset.correct || '').toLowerCase().trim();
    const expectedPt = (q.dataset.correctPt || '').toLowerCase().trim();
    btn.addEventListener('click', () => {
      const got = input.value.toLowerCase().trim();
      if (got && (got === expected || (expectedPt && got === expectedPt))) {
        q.classList.add('solved');
        input.disabled = true;
        markSolved(i);
      } else {
        input.style.borderColor = 'var(--danger)';
        setTimeout(() => { input.style.borderColor = ''; }, 700);
      }
    });
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') btn.click(); });
  } else {
    const correct = Number(q.dataset.correct);
    q.querySelectorAll('.opt').forEach(opt => {
      opt.addEventListener('click', () => {
        if (solved.has(i)) return;
        const idx = Number(opt.dataset.idx);
        if (idx === correct) {
          opt.classList.add('correct');
          markSolved(i);
        } else {
          opt.classList.add('wrong');
          setTimeout(() => opt.classList.remove('wrong'), 700);
        }
      });
    });
  }
});

document.getElementById('finishBtn').addEventListener('click', (e) => {
  const btn = e.currentTarget;
  if (btn.disabled || btn.classList.contains('done')) return;
  parent.postMessage({ type: 'lesson:complete', dayId: DAY_ID, xp: XP_REWARD }, '*');
  btn.classList.add('done');
  btn.textContent = '✓';
  setTimeout(() => parent.postMessage({ type: 'lesson:close' }, '*'), 900);
});

loadStrings().then(applyStrings);
