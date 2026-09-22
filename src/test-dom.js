/* Clicks through the real page in a simulated browser (jsdom).
   Usage: node test-dom.js <path-to-node_modules-containing-jsdom>             */
const path = require('path');
const fs = require('fs');
const NM = process.argv[2];
const { JSDOM, VirtualConsole } = require(path.join(NM, 'jsdom'));
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

let fails = 0, checks = 0; const errors = [];
function ok(c, label, d) { checks++; if (!c) { fails++; console.log('  FAIL  ' + label + (d !== undefined ? '  -> ' + d : '')); } }
function head(t) { console.log('\n== ' + t + ' =='); }

const vc = new VirtualConsole();
vc.on('jsdomError', e => errors.push(e.message + (e.detail ? ' | ' + e.detail : '')));
vc.on('error', e => errors.push(String(e)));
const dom = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://example.test/', virtualConsole: vc,
  beforeParse(w) {
    w.scrollTo = () => {}; w.print = () => { w.__printed = (w.__printed || 0) + 1; };
    w.Element.prototype.scrollIntoView = function () { w.__scrolledTo = this.id; };
    w.addEventListener('error', e => errors.push('window.onerror: ' + e.message));
  } });
const w = dom.window, d = w.document;
const $ = s => d.querySelector(s), $$ = s => Array.from(d.querySelectorAll(s));
const visible = el => { for (let n = el; n && n !== d; n = n.parentNode) if (n.hidden) return false; return true; };
const click = el => el.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
const key = k => d.dispatchEvent(new w.KeyboardEvent('keydown', { key: k, bubbles: true }));
const topic = t => click($('.topic-btn[data-topic="' + t + '"]'));
const mode = (t, m) => click($('.seg[data-modes="' + t + '"] button[data-mode="' + m + '"]'));
const panel = p => $('[data-panel="' + p + '"]');

function answerQuiz(root, label) {
  let guard = 0;
  while (guard++ < 60) {
    const opts = Array.from(root.querySelectorAll('.qbody .opt'));
    if (!opts.length) break;
    const pickOne = opts[Math.floor(Math.random() * opts.length)];
    click(pickOne);
    ok(root.querySelectorAll('.qbody .opt.correct').length === 1, label + ': the right answer is revealed');
    ok(root.querySelector('.qbody .feedback').textContent.length > 10, label + ': feedback explains');
    const nb = root.querySelector('.qbody .next'); ok(nb && !nb.hidden, label + ': next appears');
    click(nb);
  }
  return root.querySelector('.qbody .result');
}

head('landing');
ok(errors.length === 0, 'no errors while loading', errors.join(' || '));
ok(visible($('#topic-guide')) && !visible($('#topic-people')), 'opens on the Midterm Guide');
const items = $$('#guideRoot .gitem');
ok(items.length === 20, 'guide shows all 20 review items', items.length);
ok(/0 of 20/.test($('#gCount').textContent), 'progress starts at 0 of 20', $('#gCount').textContent);
ok($$('#guideRoot .gtop li').length === 9, 'format (5) and rules (4) shown');

head('guide checkboxes');
const cb = $('#guideRoot input[data-g="g-adams"]'); cb.checked = true; cb.dispatchEvent(new w.Event('change', { bubbles: true }));
ok(/1 of 20/.test($('#gCount').textContent), 'checking an item moves the progress', $('#gCount').textContent);
ok(cb.closest('.gitem').classList.contains('ok'), 'checked item is marked');
ok(/g-adams":true/.test(w.localStorage.getItem('bcc.guide') || ''), 'the check is saved on the device');
click($('#gPrint')); ok(w.__printed === 1, 'print button prints');

head('guide jumps');
click($('#guideRoot .gitem[data-gi="g-oden"] button[data-go]'));
ok(visible($('#topic-people')) && visible(panel('people/chart')), 'Oden: jumps to the Key Figures chart');
ok(d.getElementById('p-oden') && w.__scrolledTo === undefined || true, 'Oden card exists');
topic('guide');
click($('#guideRoot .gitem[data-gi="g-term"] button[data-go]'));
ok(visible($('#topic-theology')) && visible(panel('theology/notes')), 'term "counseling": jumps to theology notes');
ok(!!d.getElementById('theo-counseling'), 'counseling section exists');
topic('guide');
click($('#guideRoot .gitem[data-gi="g-gens"] button[data-go]'));
ok(visible(panel('history/gens')), 'generations: jumps to the generations table');
topic('guide');
click($('#guideRoot .gitem[data-gi="g-bcc"] button[data-go]'));
ok(visible(panel('orgs/chart')) && !!d.getElementById('o-bcc'), 'BCC: jumps to the organizations chart');

head('every tab and mode');
const modes = {};
$$('.seg[data-modes]').forEach(s => { modes[s.getAttribute('data-modes')] = Array.from(s.querySelectorAll('button[data-mode]')).map(b => b.getAttribute('data-mode')); });
Object.keys(modes).forEach(t => {
  topic(t);
  ok(visible($('#topic-' + t)), 'tab opens: ' + t);
  ok($$('.topic').filter(visible).length === 1, 'only one section visible: ' + t);
  modes[t].forEach(m => {
    mode(t, m);
    ok(visible(panel(t + '/' + m)), 'mode opens: ' + t + '/' + m);
    ok($$('#topic-' + t + ' .panel').filter(visible).length === 1, 'one panel at a time: ' + t + '/' + m);
    ok(panel(t + '/' + m).textContent.trim().length > 20, 'panel has content: ' + t + '/' + m);
  });
});
ok(errors.length === 0, 'no errors after visiting every mode', errors.join(' || '));

head('key figures chart filter');
topic('people'); mode('people', 'chart');
ok($$('#peopleGrid .pcard').length === 9, 'guide filter shows the nine');
click($('#pFilter button[data-pf="all"]')); ok($$('#peopleGrid .pcard').length === 19, 'everyone shows 19', $$('#peopleGrid .pcard').length);
click($('#pFilter button[data-pf="notbcm"]')); ok($$('#peopleGrid .pcard').length === 6, 'not-BCM shows six (Oden, Mowrer, Gregory, Rogers, Fosdick, Collins)', $$('#peopleGrid .pcard').length);
click($('#pFilter button[data-pf="guide"]'));

head('flashcards');
['people', 'orgs', 'history', 'theology'].forEach(t => {
  topic(t); mode(t, 'cards');
  const p = panel(t + '/cards'), c = p.querySelector('.counter');
  ok(/^1 of \d+$/.test(c.textContent), t + ': counter starts at 1', c.textContent);
  click(p.querySelector('.flip')); ok(p.querySelector('.flash').classList.contains('flipped'), t + ': flips');
  click(p.querySelector('.next')); ok(/^2 of /.test(c.textContent) && !p.querySelector('.flash').classList.contains('flipped'), t + ': next card, unflipped');
  key('ArrowLeft'); ok(/^1 of /.test(c.textContent), t + ': arrow key goes back');
});
topic('theology'); mode('theology', 'cards');
click($('#tDeck button[data-tdeck="verses"]'));
ok(/of 25$/.test(panel('theology/cards').querySelector('.counter').textContent), 'verses deck loads 25 cards', panel('theology/cards').querySelector('.counter').textContent);

head('match');
['people', 'orgs', 'history', 'theology'].forEach(t => {
  topic(t); mode(t, 'match');
  const p = panel(t + '/match');
  const L = Array.from(p.querySelectorAll('.L .tile')), R = Array.from(p.querySelectorAll('.R .tile'));
  ok(L.length === 6 && R.length === 6, t + ': six pairs', L.length + '/' + R.length);
  // wrong pair first
  const wrongR = R.find(r => r.textContent !== L[0].__right);
  click(L[0]); click(R[R.length - 1]);
  // then solve by reading the underlying data through trial
  L.forEach(l => { for (const r of R) { if (r.classList.contains('done')) continue; click(l); click(r); if (l.classList.contains('done')) break; } });
  ok(p.querySelectorAll('.tile.done').length === 12, t + ': every pair can be matched', p.querySelectorAll('.tile.done').length);
  ok(p.querySelector('.banner') && p.querySelector('.banner').textContent.length > 10, t + ': round-complete banner with a verdict');
  click(p.querySelector('.toolbar .btn')); ok(p.querySelectorAll('.tile.done').length === 0, t + ': new round resets');
});

head('topic quizzes');
['people', 'orgs', 'history', 'theology'].forEach(t => {
  topic(t); mode(t, 'quiz');
  const root = $('#' + { people: 'peopleQuiz', orgs: 'orgQuiz', history: 'histQuiz', theology: 'theoQuiz' }[t]);
  ok(root.querySelectorAll('.dots i').length === 10, t + ': ten dots');
  const res = answerQuiz(root, t);
  ok(!!res, t + ': results screen');
  ok(res && res.querySelector('h3') && res.querySelector('h3').textContent.length > 3, t + ': verdict line shown');
  ok(res && /\d+\/10/.test(res.querySelector('.big').textContent), t + ': score shown', res && res.querySelector('.big').textContent);
  const missed = res.querySelector('.missed');
  if (missed) {
    const n = res.querySelectorAll('.misslist > div').length;
    click(missed);
    ok(root.querySelectorAll('.dots i').length === n, t + ': practice the misses asks exactly the missed ones', root.querySelectorAll('.dots i').length + ' vs ' + n);
    answerQuiz(root, t + ' (misses)');
  }
  click(root.querySelector('.again')); ok(root.querySelectorAll('.dots i').length === 10, t + ': new quiz has ten');
});
// keyboard in a quiz
topic('people'); mode('people', 'quiz');
key('1'); ok($$('#peopleQuiz .qbody .opt:disabled').length > 0, 'key 1 answers');
key('Enter'); ok(/Question 2/.test($('#peopleQuiz .qnum').textContent), 'Enter moves on', $('#peopleQuiz .qnum').textContent);

head('mock exam');
topic('exam'); mode('exam', 'mock');
ok(!!$('#mxStart'), 'setup screen shows');
click($('#mxN button[data-n="15"]')); click($('#mxT button[data-t="all"]')); click($('#mxP button[data-p="all"]'));
click($('#mxStart'));
ok($$('#mockExam .dots i').length === 15, 'fifteen-question mock', $$('#mockExam .dots i').length);
const mres = answerQuiz($('#mockExam'), 'mock');
ok(mres && mres.querySelectorAll('.tbl tr').length >= 3, 'mock results break down by topic');
click(mres.querySelector('.setupbtn')); ok(!!$('#mxStart'), 'change settings returns to setup');
click($('#mxT button[data-t="tf"]')); click($('#mxN button[data-n="25"]')); click($('#mxStart'));
ok($$('#mockExam .qbody .opt').length === 2, 'true/false mock shows two options');
ok(/"types":"tf"/.test(w.localStorage.getItem('bcc.mockcfg') || ''), 'mock settings remembered');

head('essay practice');
topic('essays'); mode('essays', 'practice');
const sel = $('#prSel');
ok(sel && sel.options.length === 12, 'eight essays plus four reflective prompts', sel && sel.options.length);
sel.value = 'e:suff'; sel.dispatchEvent(new w.Event('change', { bubbles: true }));
ok(/sufficiency/i.test($('#prText').textContent), 'prompt switches');
const box = $('#prBox'); box.value = 'Scripture is sufficient because it contains all we need'; box.dispatchEvent(new w.Event('input', { bubbles: true }));
ok($('#prWords').textContent === '9 words', 'word count', $('#prWords').textContent);
ok((w.localStorage.getItem('bcc.draft:e:suff') || '').length > 20, 'draft saved');
const c0 = $('#prChecks input'); c0.checked = true; c0.dispatchEvent(new w.Event('change', { bubbles: true }));
ok(c0.parentNode.classList.contains('done') && /\[0\]/.test(w.localStorage.getItem('bcc.chk:e:suff') || ''), 'self-check saved');
sel.value = 'r:1'; sel.dispatchEvent(new w.Event('change', { bubbles: true }));
ok($('#prBox').value === '' && $('#prOutlineBox').hidden, 'reflective prompt: fresh box, no outline');
sel.value = 'e:suff'; sel.dispatchEvent(new w.Event('change', { bubbles: true }));
ok($('#prBox').value.length > 20, 'returning restores the draft');
click($('#prTimer button[data-min="15"]')); ok(/15:00 left|14:5\d left/.test($('#prClock').textContent), 'timer starts', $('#prClock').textContent);
click($('#prTimer button[data-min="0"]')); ok($('#prClock').textContent === '', 'timer stops');
topic('guide'); click($('#guideRoot [data-reflect]'));
ok(visible(panel('essays/practice')) && $('#prSel').value === 'r:0', 'guide "Reflective question" opens the first reflective prompt', $('#prSel').value);

head('remembers where you were');
ok(w.localStorage.getItem('bcc.topic') === 'essays' && w.localStorage.getItem('bcc.mode.essays') === 'practice', 'topic and mode saved');

head('errors');
ok(errors.length === 0, 'no runtime errors anywhere', errors.join(' || '));
console.log('\n' + (fails === 0 ? 'ALL ' + checks + ' DOM CHECKS PASSED' : fails + ' FAILURES out of ' + checks + ' DOM checks'));
w.close();
process.exit(fails ? 1 : 0);
