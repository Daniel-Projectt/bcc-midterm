/* ================================================================ helpers */
function $(s,r){ return (r||document).querySelector(s); }
function $$(s,r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); }
function shuffle(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)), t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
function pick(a,n){ return shuffle(a).slice(0,n); }
function uniqBy(arr, fn){ var seen={}, out=[]; arr.forEach(function(x){ var k=fn(x); if(!seen[k]){ seen[k]=1; out.push(x); } }); return out; }
function strip(s){ return String(s).replace(/<[^>]+>/g,""); }
var store = {
  get:function(k){ try{ return localStorage.getItem("bcc."+k); }catch(e){ return null; } },
  set:function(k,v){ try{ localStorage.setItem("bcc."+k, v); }catch(e){} }
};
var CORNERS = ['tl','tr','bl','br'].map(function(c){ return '<svg class="c '+c+'" aria-hidden="true"><use href="#corner"/></svg>'; }).join('');
var TOPIC_NAMES = {people:"Key Figures", orgs:"Organizations", history:"History & Generations", theology:"Theology"};

/* ---- verdicts by grade: warm, plain, never a joke at the reader's expense ---- */
var VERDICTS = [
  {min:100, a:"Nothing left to fix here. Try the full mock exam next.",
   t:["Flawless.","Perfect \u2014 every one.","Word-perfect.","Nothing to correct."]},
  {min:85,  a:"Strong. The misses below are the whole job now.",
   t:["Strong.","Very well done.","Nearly perfect.","Excellent work."]},
  {min:70,  a:"A solid base, with a few real gaps. Work the misses, then take it again.",
   t:["Good work.","A solid pass.","Coming along nicely.","Well on your way."]},
  {min:50,  a:"About half. A pass through the chart and flashcards for this topic before testing again will lift this quickly.",
   t:["Halfway there.","A fair start.","Keep going.","Room to grow."]},
  {min:0,   a:"It is easier to test once the material is in place \u2014 start with the notes and flashcards, then come back.",
   t:["A first pass.","Early days.","Not yet \u2014 and that\u2019s all right.","Begin with the notes."]}
];
function verdictFor(p){
  for(var i=0;i<VERDICTS.length;i++){ if(p >= VERDICTS[i].min){ var v = VERDICTS[i]; return {t:pick(v.t,1)[0], a:v.a}; } }
  var last = VERDICTS[VERDICTS.length-1]; return {t:last.t[0], a:last.a};
}

/* ================================================================ question building */
/* Pair sets used for Match and for generated identification questions */
var PAIRSETS = {
  people:  {left:"Figure", right:"Description", pairs:PEOPLE.map(function(p){ return [p.name, p.line]; })},
  orgs:    {left:"Organization", right:"What sets it apart", pairs:ORG_PAIRS},
  history: {left:"Date or phase", right:"What happened", pairs:HIST_PAIRS},
  theology:{left:"Term", right:"Meaning", pairs:THEO_PAIRS}
};

function fromBank(b, i){
  var q = {key:b.tp+":"+i, tp:b.tp, ap:!!b.ap, kind:b.t, text:b.q, explain:b.e};
  if(b.t === "tf"){
    q.opts = [{html:"True", ok:b.a === true, cls:"tf"}, {html:"False", ok:b.a === false, cls:"tf"}];
    q.miss = strip(b.q) + " — <b>" + (b.a ? "True" : "False") + "</b>";
  } else {
    q.opts = shuffle([{html:b.a, ok:true}].concat(b.w.map(function(w){ return {html:w, ok:false}; })));
    q.miss = strip(b.q) + " — <b>" + b.a + "</b>";
  }
  return q;
}
/* Identification questions generated from a pair set; wrong answers redrawn each time */
function fromPair(tp, idx, reverse){
  var set = PAIRSETS[tp], p = set.pairs[idx];
  var others = pick(set.pairs.filter(function(o, j){ return j !== idx; }), 3);
  var q = {key:tp+":p"+idx+(reverse?"r":""), tp:tp, ap:false, kind:"id"};
  if(reverse){
    q.text = "Which " + set.right.toLowerCase() + " fits <b>" + p[0] + "</b>?";
    q.opts = shuffle([{html:p[1], ok:true}].concat(others.map(function(o){ return {html:o[1], ok:false}; })));
  } else {
    q.text = "“" + p[1] + "” — which " + set.left.toLowerCase() + "?";
    q.opts = shuffle([{html:p[0], ok:true}].concat(others.map(function(o){ return {html:o[0], ok:false}; })));
  }
  q.explain = "<b>" + p[0] + "</b>: " + p[1] + ".";
  q.miss = p[0] + " — <b>" + p[1] + "</b>";
  return q;
}
function bankFor(tp){ var out = []; QB.forEach(function(b, i){ if(!tp || b.tp === tp) out.push({b:b, i:i}); }); return out; }

/* A topic quiz: mostly written questions, about a third identification */
function topicQuestions(tp, keys, n){
  n = n || 10;
  if(keys && keys.length) return shuffle(questionsByKeys(keys)).slice(0, n);
  var bank = bankFor(tp).map(function(x){ return fromBank(x.b, x.i); });
  /* one identification question per pair, in a random direction, so a quiz never asks the same pair twice */
  var gen = PAIRSETS[tp].pairs.map(function(p, i){ return fromPair(tp, i, Math.random() < 0.5); });
  var nGen = Math.min(gen.length, Math.floor(n/3));
  return shuffle(pick(bank, n - nGen).concat(pick(gen, nGen)));
}
/* Rebuild exact questions from their keys ("tp:i" bank, "tp:pN" / "tp:pNr" pairs); anything malformed is dropped */
function questionsByKeys(keys){
  return uniqBy(keys, function(k){ return k; }).map(function(k){
    var m = /^([a-z]+):p(\d+)(r?)$/.exec(k);
    if(m){
      var set = PAIRSETS[m[1]], i = parseInt(m[2],10);
      return (set && i < set.pairs.length) ? fromPair(m[1], i, m[3] === "r") : null;
    }
    var b = /^([a-z]+):(\d+)$/.exec(k);
    if(!b) return null;
    var j = parseInt(b[2],10);
    return (QB[j] && QB[j].tp === b[1]) ? fromBank(QB[j], j) : null;
  }).filter(Boolean);
}
/* The mock exam: every topic, mc + tf, reshuffled */
function mockQuestions(cfg){
  var tps = cfg.topics && cfg.topics.length ? cfg.topics : ["people","orgs","history","theology"];
  var n = cfg.n || 25;
  var pool = [];
  QB.forEach(function(b, i){
    if(tps.indexOf(b.tp) < 0) return;
    if(cfg.types === "mc" && b.t !== "mc") return;
    if(cfg.types === "tf" && b.t !== "tf") return;
    if(cfg.types === "ap" && !b.ap) return;
    pool.push(fromBank(b, i));
  });
  if(cfg.types !== "tf" && cfg.types !== "ap"){
    tps.forEach(function(tp){
      pick(PAIRSETS[tp].pairs.map(function(p, i){ return i; }), 3).forEach(function(i){ pool.push(fromPair(tp, i, Math.random() < 0.5)); });
    });
  }
  /* spread across topics */
  var byTp = {}; tps.forEach(function(t){ byTp[t] = shuffle(pool.filter(function(q){ return q.tp === t; })); });
  var out = [], k = 0;
  while(out.length < n){
    var t = tps[k % tps.length], list = byTp[t];
    if(list.length) out.push(list.shift());
    if(tps.every(function(x){ return !byTp[x].length; })) break;
    k++;
  }
  return shuffle(out);
}

/* ================================================================ decks */
function peopleDeck(){
  return shuffle(PEOPLE).map(function(p){
    return {front:'<div class="mid" style="font-family:var(--display);font-weight:600;letter-spacing:.01em;text-transform:none;font-size:clamp(28px,6vw,40px)">'+p.name+'</div><div class="hint">'+(p.bcm ? "Biblical counseling" : "Not BCM")+'</div>',
            back:'<div class="bname">'+p.name+'</div><div class="bsound" style="margin-top:12px">'+p.why+'</div><div class="btr" style="margin-top:10px">'+p.gen+'</div>'};
  });
}
function orgDeck(){
  var a = ORG_FOCUS.map(function(o){
    return {front:'<div class="mid" style="letter-spacing:.08em">'+o.abbr+'</div><div class="hint">'+o.name+'</div>',
            back:'<div class="bname">'+o.abbr+' · '+o.role+'</div><div class="bsound" style="margin-top:12px">'+o.does.join(" ")+'</div><div class="btr" style="margin-top:10px">'+o.people+'</div>'};
  });
  var b = ORG_OTHER.map(function(o){
    return {front:'<div class="mid" style="font-family:var(--display);font-weight:600;letter-spacing:.01em;text-transform:none;font-size:clamp(24px,5vw,32px)">'+o.abbr+'</div><div class="hint">'+o.role+'</div>',
            back:'<div class="bname">'+o.abbr+'</div><div class="bsound" style="margin-top:12px">'+o.d+'</div>'};
  });
  return shuffle(a.concat(b));
}
function pairDeck(list){
  return shuffle(list).map(function(p){
    return {front:'<div class="mid" style="font-family:var(--display);font-weight:600;letter-spacing:.005em;text-transform:none;font-size:clamp(23px,4.6vw,30px);line-height:1.3">'+p[0]+'</div>',
            back:'<div class="bname">'+p[0]+'</div><div class="bsound" style="margin-top:12px">'+p[1]+'</div>'};
  });
}
function matchRound(tp, n){
  var set = PAIRSETS[tp];
  var items = uniqBy(set.pairs.map(function(p, i){ return {id:tp+i, left:p[0], right:p[1]}; }), function(x){ return x.right; });
  return {leftTitle:set.left, rightTitle:set.right, items:pick(items, Math.min(n || 6, items.length))};
}
