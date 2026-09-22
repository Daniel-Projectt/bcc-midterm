const fs = require('fs');
const vm = require('vm');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

let fails = 0, checks = 0;
function ok(cond, label, detail) { checks++; if (!cond) { fails++; console.log('  FAIL  ' + label + (detail !== undefined ? '  -> ' + detail : '')); } }
function head(t) { console.log('\n== ' + t + ' =='); }

// ---------- load ----------
const m = html.match(/<script>([\s\S]*?)<\/script>/);
if (!m) { console.log('NO SCRIPT'); process.exit(1); }
const src = m[1];
try { new vm.Script(src); } catch (e) { console.log('JS PARSE ERROR: ' + e.message); process.exit(1); }
const sandbox = { module: { exports: {} }, console };
vm.createContext(sandbox);
vm.runInContext(src, sandbox);
const A = sandbox.module.exports;
console.log('script parsed and loaded, exports: ' + Object.keys(A).length);

// ---------- 1. the midterm guide mirrors the handout ----------
head('midterm guide = the Mid-Term Exam Guidance');
const G = A.GUIDE;
ok(JSON.stringify(G.format) === JSON.stringify(['Multiple-choice','True/false','Matching','Two essay questions','One reflective question']), 'exam format listed exactly', JSON.stringify(G.format));
ok(G.rules.length === 4 && /notes and books/.test(G.rules[0]) && /AI/.test(G.rules[2]) && /independently/.test(G.rules[3]), 'exam rules listed');
ok(G.sections.length === 4, 'four sections, as on the handout');
const guideNames = G.sections[0].items.map(i => i.t);
['Jay Adams','Thomas Oden','O. Hobart Mowrer','John Bettler','John Broger','Ed Welch','David Powlison','Garrett Higbee','Gregory the Great']
  .forEach(n => ok(guideNames.includes(n), 'guide lists ' + n));
ok(guideNames.length === 9, 'exactly the nine figures on the handout', guideNames.length);
const notBcm = G.sections[0].items.filter(i => i.not).map(i => i.t).sort();
ok(JSON.stringify(notBcm) === JSON.stringify(['Gregory the Great','O. Hobart Mowrer','Thomas Oden']), 'exactly Oden, Mowrer and Gregory are marked not BCM', JSON.stringify(notBcm));
ok(JSON.stringify(G.sections[1].items.map(i => i.t)) === JSON.stringify(['CCEF','NANC / ACBC','ABC','BCC']), 'the four organizations, in the handout order');
['Generations of Biblical Counseling','Historical Shifts'].forEach(t => ok(G.sections[2].items.some(i => i.t === t), 'history item: ' + t));
['The Term “Counseling”','Sufficiency of Scripture','Biblical Framework of Humanity','Common Grace and Secular Material','Protectors and Explorers']
  .forEach(t => ok(G.sections[3].items.some(i => i.t === t), 'theology item: ' + t));
ok(/continuity and development/.test(G.sections[2].items[0].ask), 'generations item keeps the handout wording');
ok(/mid-1800s/.test(G.sections[2].items[1].ask), 'shift item keeps the handout wording');
ok(G.prep.length === 3 && /notes/.test(G.prep[0]) && /practical implications/.test(G.prep[1]) && /reference/.test(G.prep[2]), 'the three preparation steps');
const allItems = G.sections.flatMap(s => s.items);
ok(new Set(allItems.map(i => i.id)).size === allItems.length, 'guide item ids unique (checkbox storage)');
allItems.forEach(i => {
  ok(i.short && i.short.length > 40, 'guide item has a short answer: ' + i.t);
  ok(/^(people|orgs|history|theology)\/(chart|story|gens|notes)$/.test(i.go), 'guide item links to a real panel: ' + i.t, i.go);
  ok(html.includes('data-panel="' + i.go + '"'), 'linked panel exists: ' + i.go);
});
// anchors resolve to rendered ids
allItems.filter(i => i.a).forEach(i => {
  if (i.a.startsWith('p-')) ok(A.PEOPLE.some(p => 'p-' + p.id === i.a && p.guide), 'anchor points at a guide person: ' + i.a);
  if (i.a.startsWith('o-')) ok(A.ORG_FOCUS.some(o => 'o-' + o.id === i.a), 'anchor points at a focus org: ' + i.a);
  if (i.a.startsWith('theo-')) ok(A.THEO.some(s => 'theo-' + s.id === i.a), 'anchor points at a theology section: ' + i.a);
});

// ---------- 2. people ----------
head('key figures');
ok(A.PEOPLE.filter(p => p.guide).length === 9, 'nine people marked as on the guide');
ok(new Set(A.PEOPLE.map(p => p.id)).size === A.PEOPLE.length, 'person ids unique');
ok(new Set(A.PEOPLE.map(p => p.line)).size === A.PEOPLE.length, 'match descriptors unique');
A.PEOPLE.forEach(p => {
  ok(p.pts.length >= 1 && p.why.length > 40 && p.line && p.gen, 'person complete: ' + p.name);
});
const P = id => A.PEOPLE.find(p => p.id === id);
ok(!P('oden').bcm && !P('mowrer').bcm && !P('gregory').bcm, 'Oden, Mowrer, Gregory are not BCM');
ok(P('adams').bcm && P('bettler').bcm && P('broger').bcm && P('welch').bcm && P('powlison').bcm && P('higbee').bcm, 'the other six are BCM');
// facts straight from the lectures
const adams = P('adams').pts.join(' ');
[['1952','pastoral ministry'],['1963','Westminster'],['1965','Mowrer'],['1969','Competent to Counsel']].forEach(([y, w]) => ok(adams.includes(y) && adams.includes(w), 'Adams: ' + y + ' ' + w));
ok(/Johns Hopkins/.test(adams), 'Adams studied at Johns Hopkins');
ok(/1931/.test(adams) && /1929/.test(adams), 'the 1929 / 1931 discrepancy is flagged');
ok(/Herberg/.test(P('oden').pts.join(' ')) && /1984/.test(P('oden').pts.join(' ')), 'Oden: Herberg and 1984');
ok(/Pastoral Rule/.test(P('gregory').pts.join(' ')), 'Gregory: The Book of Pastoral Rule');
ok(/specialized pastoral/.test(P('bettler').pts.join(' ')), 'Bettler = specialized pastoral counselors');
ok(/lay people/.test(P('broger').pts.join(' ')) && /Self-Confrontation/.test(P('broger').pts.join(' ')), 'Broger = lay people, Self-Confrontation');
ok(/neuropsychology/.test(P('welch').pts.join(' ')), 'Welch: PhD in neuropsychology');
ok(/Continuum of Care/.test(P('higbee').pts.join(' ')), 'Higbee: Continuum of Care');
ok(/1949/.test(P('powlison').yrs) && /2019/.test(P('powlison').yrs), 'Powlison 1949-2019 (Basic Map)');

// ---------- 3. organizations ----------
head('organizations');
ok(A.ORG_FOCUS.length === 4, 'four focus organizations');
A.ORG_FOCUS.forEach(o => ok(o.role && o.people && o.when && o.does.length >= 3 && o.roots && o.mark, 'focus org complete: ' + o.abbr));
const O = id => A.ORG_FOCUS.find(o => o.id === id);
ok(/generalist/.test(O('acbc').does.join(' ')), 'ACBC: lay and pastoral generalist certifying agency');
ok(/secular fields/.test(O('abc').does.join(' ')), 'ABC: Christians in secular fields');
ok(/Confessional Statement/.test(O('bcc').does.join(' ')), 'BCC: Confessional Statement');
ok(/embodiment/.test(O('ccef').does.join(' ')), 'CCEF: embodiment');
ok(/Kevin Carson/.test(O('bcc').people) && /Kellemen/.test(O('bcc').people), 'BCC leaders');
ok(A.ORG_OTHER.length >= 12 && A.ORG_OTHER.every(o => o.abbr && o.role && o.d), 'wider landscape complete');
ok(A.ORG_OTHER.some(o => /IBCD/.test(o.abbr) && /1982/.test(o.d) && /CCEF West/.test(o.d)), 'IBCD founded 1982 as CCEF West');

// ---------- 4. history ----------
head('history and generations');
ok(A.FOUR_Q.length === 4 && A.FRAMES.every(f => f.a.length === 4), 'four questions answered by each framework');
ok(A.GENS.length === 3, 'three generations');
ok(A.GENS[0].dates === '1960s–1980s' && A.GENS[1].dates === '1980s–2000s' && A.GENS[2].dates === '2000s–present', 'Basic Map dates');
ok(A.GENS[0].lect === '1970–1990' && /1990/.test(A.GENS[1].lect) && /2005/.test(A.GENS[2].lect), 'lecture dates');
A.GENS.forEach(g => ok(g.who && g.focus && g.marks.length >= 4 && g.orgs, 'generation complete: ' + g.n));
ok(A.GEN_CONTINUITY.length >= 2 && A.GEN_DEVELOPMENT.length >= 3, 'continuity and development both covered');
ok(A.TIMELINE.some(e => e.y === '1859' && /Origin of Species/.test(e.t)), 'timeline: 1859 Darwin');
const years = A.TIMELINE.filter(e => e.y && /^\d{4}/.test(e.y)).map(e => parseInt(e.y, 10));
ok(years.every((y, i) => i === 0 || y >= years[i - 1]), 'timeline in order', years.join(','));
ok(new Set(A.HIST_PAIRS.map(p => p[1])).size === A.HIST_PAIRS.length, 'history match descriptors unique');
ok(A.STORY.length >= 5 && A.STORY.every(s => s.h && s.body), 'story sections');
ok(/chronological snobbery/.test(A.STORY[0].body), 'value of history includes chronological snobbery');

// ---------- 5. theology ----------
head('theology');
ok(A.THEO.length === 5, 'five theology sections, one per handout item');
const T = id => A.THEO.find(s => s.id === id).body;
['Progressive','Completed','Formal','Material'].forEach(c => ok(T('sufficiency').includes('<h4>' + c + '</h4>'), 'sufficiency category: ' + c));
ok(/2 Pet 1:3/.test(T('sufficiency')) && /2 Tim 3:16/.test(T('sufficiency')), 'sufficiency texts');
['Divine moral provision','Physical provision','Intellectual provision'].forEach(c => ok(T('grace').includes(c), 'common grace category: ' + c));
['Observation','Interpretation','Intervention'].forEach(c => ok(T('grace').includes('<b>' + c + '</b>'), 'paradigm level: ' + c));
ok((T('grace').match(/<li>/g) || []).length >= 8, 'five caveats + three levels listed');
ok(/Isa 28:23/.test(T('grace')) && /Matt 5:45/.test(T('grace')), 'common grace texts');
['Gen 1:28','Gen 2:16','Gen 3:1','Col 3:16','Rom 15:14','Gal 6:1','Gal 6:2','Jas 5:16','Titus 2','1 Pet 5:1'].forEach(r => ok(T('counseling').includes(r), 'counseling key text: ' + r));
['Rom 12:2','Eph 4:18','Eph 3:16','Prov 4:23','Mark 7:21','1 Cor 6:19','2 Cor 4:16','Matt 10:28'].forEach(r => ok(T('humanity').includes(r), 'anthropology text: ' + r));
ok(/Protectors/.test(T('protect')) && /Explorers/.test(T('protect')) && /agree/.test(T('protect')), 'protectors, explorers and the shared ground');
ok(new Set(A.TERMS.map(t => t[0])).size === A.TERMS.length, 'term cards unique');
ok(new Set(A.VERSES.map(v => v[0])).size === A.VERSES.length, 'verse cards unique');
ok(new Set(A.THEO_PAIRS.map(p => p[1])).size === A.THEO_PAIRS.length, 'theology match descriptors unique');

// ---------- 6. essays ----------
head('essays and cases');
ok(A.ESSAYS.length >= 7, 'at least seven essay outlines', A.ESSAYS.length);
A.ESSAYS.forEach(e => ok(e.q && e.thesis && e.pts.length >= 5 && e.tip, 'essay complete: ' + e.id));
ok(new Set(A.ESSAYS.map(e => e.id)).size === A.ESSAYS.length, 'essay ids unique (draft storage)');
ok(A.REFLECT.length >= 3, 'reflective prompts');
ok(A.CASES.length >= 6 && A.CASES.every(c => c.name && c.src && c.story && c.asks.length && c.angles.length), 'case studies complete');
['Carl','Harold','Catherine','Tara'].forEach(n => ok(A.CASES.some(c => c.name === n), 'case: ' + n));

// ---------- 7. question bank ----------
head('question bank');
const tps = ['people','orgs','history','theology'];
tps.forEach(tp => ok(A.QB.filter(q => q.tp === tp).length >= 18, 'at least 18 written questions on ' + tp, A.QB.filter(q => q.tp === tp).length));
ok(A.QB.filter(q => q.t === 'tf').length >= 20, 'true/false questions present');
ok(A.QB.filter(q => q.ap).length >= 12, 'application questions present', A.QB.filter(q => q.ap).length);
A.QB.forEach((q, i) => {
  ok(tps.includes(q.tp), 'known topic #' + i);
  ok(q.q && q.e, 'question and explanation #' + i);
  if (q.t === 'mc') {
    ok(q.w.length === 3, 'three wrong answers #' + i, q.q);
    ok(!q.w.includes(q.a), 'right answer not among the wrong #' + i, q.q);
    ok(new Set([q.a].concat(q.w)).size === 4, 'four distinct options #' + i, q.q);
  } else ok(q.t === 'tf' && typeof q.a === 'boolean', 'true/false has a boolean answer #' + i);
});
ok(new Set(A.QB.map(q => q.q)).size === A.QB.length, 'no duplicate questions');

head('question generators (100 runs)');
for (let run = 0; run < 100; run++) {
  tps.forEach(tp => {
    const qs = A.topicQuestions(tp, null, 10);
    ok(qs.length === 10, tp + ': ten questions', qs.length);
    ok(new Set(qs.map(q => q.key.replace(/r$/, ''))).size === qs.length, tp + ': no repeated question', qs.map(q => q.key).join(','));
    qs.forEach(q => {
      ok(q.opts.filter(o => o.ok).length === 1, tp + ': exactly one right answer', q.text);
      ok(new Set(q.opts.map(o => o.html)).size === q.opts.length, tp + ': options distinct', q.opts.map(o => o.html).join(' | '));
      ok(q.opts.length === (q.kind === 'tf' ? 2 : 4), tp + ': option count', q.kind + ' ' + q.opts.length);
      ok(q.tp === tp && q.explain && q.miss, tp + ': question complete');
    });
    const gen = qs.filter(q => q.kind === 'id').length;
    ok(gen <= 3, tp + ': identification at most a third', gen);
  });
  [15, 25, 40].forEach(n => {
    const mx = A.mockQuestions({ n, types: 'all', topics: [] });
    ok(mx.length === n, 'mock exam fills to ' + n, mx.length);
    tps.forEach(tp => ok(mx.some(q => q.tp === tp), 'mock exam of ' + n + ' covers ' + tp));
    ok(new Set(mx.map(q => q.key)).size === mx.length, 'mock exam has no repeats');
  });
  ok(A.mockQuestions({ n: 25, types: 'tf', topics: [] }).every(q => q.kind === 'tf'), 'true/false-only mock');
  ok(A.mockQuestions({ n: 25, types: 'ap', topics: [] }).every(q => q.ap), 'application-only mock');
  ok(A.mockQuestions({ n: 15, types: 'all', topics: ['orgs'] }).every(q => q.tp === 'orgs'), 'single-topic mock');
}
const sampleKeys = A.topicQuestions('people', null, 10).map(q => q.key);
const back = A.questionsByKeys(sampleKeys);
ok(back.length === sampleKeys.length && back.every((q, i) => q.key === sampleKeys[i]), 'practice-the-misses rebuilds the same questions');
ok(A.questionsByKeys(['nonsense:99', 'people:999999']).length === 0, 'bad keys are ignored');

// ---------- 8. decks, match, verdicts ----------
head('decks, match and verdicts');
ok(A.peopleDeck().length === A.PEOPLE.length, 'people deck complete');
ok(A.orgDeck().length === A.ORG_FOCUS.length + A.ORG_OTHER.length, 'organization deck complete');
tps.forEach(tp => {
  for (let run = 0; run < 30; run++) {
    const r = A.matchRound(tp, 6);
    ok(r.items.length === 6 && new Set(r.items.map(x => x.right)).size === 6 && new Set(r.items.map(x => x.left)).size === 6, tp + ' match round: six unique pairs');
  }
});
const lines = A.VERDICTS.flatMap(v => v.t.concat([v.a])).join(' | ');
ok(!/cheeks|goat|bruh|cooked|twin|\bbro\b|\bchat\b|aura|npc|crack a|\bnah\b|ain.t|dawg|\bW\b|no cap|lock in|\bhim\b|\bL\b|mid\.|headlock|trenches/i.test(lines), 'no slang anywhere in the verdicts', lines);
ok(A.VERDICTS.length === 5 && A.VERDICTS.every(v => v.t.length >= 3 && v.a.length > 20), 'five tiers, each with several gracious lines and advice');
ok(!/function reaction\(/.test(src) && !/\bREACT\b/.test(src), 'per-answer quips are gone');
ok(/<b>Correct\.<\/b>/.test(src) && /<b>Not this one\.<\/b>/.test(src), 'answer feedback is plain');
[100, 90, 75, 55, 10].forEach(p => ok(!!A.verdictFor(p).t, 'verdict for ' + p));

// ---------- 9. markup ----------
head('markup');
const ids = [...new Set((src.match(/\$\("#([A-Za-z0-9_-]+)"/g) || []).map(s => s.slice(4, -1)))];
const dynamic = ['gCount','gBar','gPrint','gReset','prSel','prText','prBox','prWords','prClock','prChecks','prOutline','prOutlineBox','prTimer','mxN','mxT','mxP','mxStart'];
['findBox','findRes','toTop','pFold'].forEach(id => ok(html.includes('id="' + id + '"'), 'convenience element exists: ' + id));
ok(/\.topics\{position:sticky/.test(html), 'tab bar is pinned while scrolling');
ok(/\.topics\{flex-wrap:nowrap[^}]*overflow-x:auto/.test(html), 'tab bar becomes one swipeable row on phones');
ok(/scroll-margin-top/.test(html), 'jump targets clear the pinned bar');
ok(/beforeprint/.test(src) && /afterprint/.test(src), 'printing opens every collapsed section, then restores');
ok(/e\.key === "\/"/.test(src), 'slash focuses the search box');
const missing = ids.filter(id => !html.includes('id="' + id + '"') && !dynamic.includes(id));
ok(missing.length === 0, 'every element referenced by id exists', missing.join(', '));
const panels = [...new Set((html.match(/data-panel="([^"]+)"/g) || []).map(s => s.slice(12, -1)))];
console.log('  panels: ' + panels.join(', '));
panels.forEach(pn => {
  const [t, mo] = pn.split('/');
  ok(html.includes('data-modes="' + t + '"'), 'panel ' + pn + ' has a mode switch');
  ok(new RegExp('data-modes="' + t + '"[\\s\\S]*?data-mode="' + mo + '"').test(html), 'panel ' + pn + ' has its mode button');
});
['guide','people','orgs','history','theology','essays','exam'].forEach(t => {
  ok(html.includes('data-topic="' + t + '"') && html.includes('id="topic-' + t + '"'), 'topic ' + t + ' has a tab and a section');
});
ok(/data-topic="guide"\s+aria-selected="true"/.test(html), 'Midterm Guide is the first, default tab');
ok((html.match(/<script>/g) || []).length === 1, 'a single script block');
['div','section','button','nav','main','header','footer','svg','symbol','details','summary'].forEach(t => {
  const open = (html.match(new RegExp('<' + t + '[\\s>]', 'g')) || []).length;
  const close = (html.match(new RegExp('</' + t + '>', 'g')) || []).length;
  ok(open === close, t + ' tags balanced', open + ' vs ' + close);
});
ok(html.includes('id="flourish"') && html.includes('class="rail left"'), 'Greek ornaments and side rails carried over');
const themeAt = html.indexOf('edition theme'), baseAt = html.indexOf('--gold:#9a7a44');
ok(themeAt > baseAt && baseAt > 0, 'the edition theme is loaded after the Greek base, so it overrides it');
ok(/--gold:#7a2f33/.test(html) && /--gold-soft:#a99282/.test(html), 'oxblood accent and taupe ornaments defined');
ok(/fonts\.googleapis\.com\/css2\?family=Cormorant\+Garamond/.test(html) && /"Cormorant Garamond","Palatino Linotype"/.test(html), 'display face loads with a Palatino fallback');
ok(/content:"\\2767"/.test(html), 'dividers use the hedera');
ok(!/var\(--serif\);font-weight:400;font-size:26px/.test(src), 'result verdict uses the display face');
ok(html.includes('og:image') && html.includes('bcc-midterm'), 'link preview metadata');
ok(!/�/.test(html), 'no broken characters');
console.log('  file size: ' + (fs.statSync(path.join(ROOT, 'index.html')).size / 1024).toFixed(1) + ' KB');

console.log('\n' + (fails === 0 ? 'ALL ' + checks + ' CHECKS PASSED' : fails + ' FAILURES out of ' + checks + ' checks'));
process.exit(fails ? 1 : 0);
