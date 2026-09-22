/* ================================================================ small helpers */
function segWire(sel, attr, fn){
  var seg = $(sel); if(!seg) return;
  seg.addEventListener("click", function(e){
    var b = e.target.closest ? e.target.closest("button["+attr+"]") : null;
    if(!b) return;
    $$("button", seg).forEach(function(x){ x.setAttribute("aria-pressed", String(x === b)); });
    fn(b.getAttribute(attr));
  });
}
function divider(){ return '<div class="divider"><span>&#9670;</span></div>'; }
function getJSON(k, dflt){ try{ var v = store.get(k); return v ? JSON.parse(v) : dflt; }catch(e){ return dflt; } }

/* ================================================================ midterm guide */
function renderGuide(){
  var done = getJSON("guide", {}), total = 0;
  GUIDE.sections.forEach(function(s){ total += s.items.length; });
  var html =
    '<div class="gtop"><div class="box"><h4>What’s on the exam</h4><ul>'+GUIDE.format.map(function(f){ return "<li>"+f+"</li>"; }).join("")+'</ul></div>'+
    '<div class="box"><h4>The rules</h4><ul>'+GUIDE.rules.map(function(r){ return "<li>"+r+"</li>"; }).join("")+'</ul></div></div>'+
    '<div class="gprog"><span class="count" id="gCount"></span><div class="bar"><i id="gBar" style="width:0"></i></div></div>';
  GUIDE.sections.forEach(function(s){
    html += '<div class="gsec"><h2>'+s.h+'</h2>'+divider()+(s.ask ? '<p class="gask">'+s.ask+'</p>' : '');
    s.items.forEach(function(it){
      html += '<div class="gitem'+(done[it.id] ? " ok" : "")+'" data-gi="'+it.id+'">'+
        '<input type="checkbox" aria-label="I can explain '+strip(it.t)+'" data-g="'+it.id+'"'+(done[it.id] ? " checked" : "")+'>'+
        '<div><div class="gt">'+it.t+(it.not ? '<span class="nb">not BCM</span>' : '')+'</div>'+
          (it.ask ? '<div class="gq">'+it.ask+'</div>' : '')+
          '<div class="gs">'+it.short+'</div></div>'+
        '<button class="btn" type="button" data-go="'+it.go+'"'+(it.a ? ' data-a="'+it.a+'"' : '')+'>Study it</button></div>';
    });
    html += '</div>';
  });
  html += '<div class="gsec"><h2>To prepare for the exam</h2>'+divider()+
    '<div class="box"><ul>'+GUIDE.prep.map(function(p){ return "<li>"+p+"</li>"; }).join("")+'</ul></div>'+
    '<p class="gask" style="margin-top:14px">The exam is open-notes. Printing this list gives you a one-page map of everything it covers.</p>'+
    '<div class="toolbar">'+
      '<button class="btn primary" type="button" data-go="exam/mock">Mock exam</button>'+
      '<button class="btn" type="button" data-go="people/match">Matching</button>'+
      '<button class="btn" type="button" data-go="essays/practice">Essay practice</button>'+
      '<button class="btn" type="button" data-go="essays/practice" data-reflect="1">Reflective question</button>'+
      '<button class="btn" type="button" id="gPrint">Print this guide</button>'+
    '</div></div>';
  $("#guideRoot").innerHTML = html;
  function progress(){
    var d = getJSON("guide", {}), n = Object.keys(d).filter(function(k){ return d[k]; }).length;
    $("#gCount").innerHTML = "Ready on <b>"+n+" of "+total+"</b>";
    $("#gBar").style.width = (n/total*100) + "%";
  }
  $$("#guideRoot input[data-g]").forEach(function(cb){
    cb.addEventListener("change", function(){
      var d = getJSON("guide", {}); d[cb.getAttribute("data-g")] = cb.checked; store.set("guide", JSON.stringify(d));
      cb.closest(".gitem").classList.toggle("ok", cb.checked); progress();
    });
  });
  $$("#guideRoot [data-go]").forEach(function(b){
    b.addEventListener("click", function(){
      if(b.getAttribute("data-reflect")) practiceKey = "r:0";
      goTo(b.getAttribute("data-go"), b.getAttribute("data-a"));
    });
  });
  $("#gPrint").addEventListener("click", function(){ window.print(); });
  progress();
}
function goTo(path, anchor){
  var parts = path.split("/"), t = parts[0], m = parts[1];
  currentMode[t] = m;
  showTopic(t);
  if(!anchor){ window.scrollTo({top:$(".topics").offsetTop - 8, behavior:"smooth"}); return; }
  setTimeout(function(){
    var el = document.getElementById(anchor);
    if(!el && t === "people"){ setPeopleFilter("all"); el = document.getElementById(anchor); }
    if(!el) return;
    el.scrollIntoView({behavior:"smooth", block:"start"});
    el.classList.add("flashhit"); setTimeout(function(){ el.classList.remove("flashhit"); }, 1800);
  }, 60);
}

/* ================================================================ key figures */
var peopleFilter = "guide";
function setPeopleFilter(v){
  peopleFilter = v;
  $$('#pFilter button').forEach(function(b){ b.setAttribute("aria-pressed", String(b.getAttribute("data-pf") === v)); });
  renderPeople();
}
function renderPeople(){
  var list = PEOPLE.filter(function(p){ return peopleFilter === "guide" ? p.guide : (peopleFilter === "notbcm" ? !p.bcm : true); });
  $("#peopleGrid").innerHTML = list.map(function(p){
    return '<article class="pcard" id="p-'+p.id+'">'+(p.guide ? '<span class="star">On the guide</span>' : '')+
      '<h3>'+p.name+'</h3>'+(p.yrs ? '<div class="yrs">'+p.yrs+'</div>' : '')+
      '<div><span class="tag'+(p.bcm ? '' : ' no')+'">'+p.gen+'</span></div>'+
      '<ul>'+p.pts.map(function(x){ return "<li>"+x+"</li>"; }).join("")+'</ul>'+
      '<div class="why"><b>Why it matters</b>'+p.why+'</div>'+
      (p.quote ? '<div class="q">“'+p.quote.t+'”<small>'+p.quote.s+'</small></div>' : '')+
    '</article>';
  }).join("");
}

/* ================================================================ organizations */
function renderOrgs(){
  var rows = [["Main role","role"],["Key people","people"],["Where it fits","when"],["Remember it as","mark"]];
  var html = '<h2 class="h2">The four on the study guide</h2>'+divider()+
    '<div class="pgrid">'+ORG_FOCUS.map(function(o){
      return '<article class="pcard" id="o-'+o.id+'"><span class="star">On the guide</span><h3>'+o.abbr+'</h3><div class="yrs">'+o.name+'</div>'+
        '<div><span class="tag">'+o.role+'</span></div>'+
        '<ul>'+o.does.map(function(x){ return "<li>"+x+"</li>"; }).join("")+'</ul>'+
        '<div class="why"><b>Remember it as</b>'+o.mark+'</div>'+
        '<div class="q">'+o.roots+'<small>'+o.people+'</small></div></article>';
    }).join("")+'</div>'+
    '<h2 class="h2">Side by side</h2>'+divider()+
    '<div class="tblwrap"><table class="tbl"><thead><tr><th></th>'+ORG_FOCUS.map(function(o){ return "<th>"+o.abbr+"</th>"; }).join("")+'</tr></thead><tbody>'+
    rows.map(function(r){ return '<tr><td class="head">'+r[0]+'</td>'+ORG_FOCUS.map(function(o){ return '<td class="sm">'+o[r[1]]+'</td>'; }).join("")+'</tr>'; }).join("")+
    '</tbody></table></div>'+
    '<p class="note">Think in roles: CCEF deepens, ACBC certifies, ABC bridges to the professional world, BCC gathers everyone to the table.</p>'+
    '<h2 class="h2">The wider landscape</h2>'+divider()+
    '<div class="rules">'+ORG_OTHER.map(function(o){ return '<div class="rule"><h4>'+o.role+'</h4><p><b>'+o.abbr+'</b></p><p class="ex">'+o.d+'</p></div>'; }).join("")+'</div>';
  $("#orgChart").innerHTML = html;
}

/* ================================================================ history */
function renderStory(){
  var html = '<div class="tblwrap" style="max-width:900px;margin:0 auto 30px"><table class="tbl"><thead><tr><th>The four questions</th>'+
    FRAMES.map(function(f){ return "<th>"+f.name+"</th>"; }).join("")+'</tr></thead><tbody>'+
    FOUR_Q.map(function(q, i){ return '<tr><td class="head">'+q+'</td>'+FRAMES.map(function(f){ return '<td class="sm">'+f.a[i]+'</td>'; }).join("")+'</tr>'; }).join("")+
    '</tbody></table></div>';
  html += STORY.map(function(s){ return '<div class="note-sec"><h2>'+s.h+'</h2>'+divider()+s.body+'</div>'; }).join("");
  $("#histStory").innerHTML = html;
}
function renderTimeline(){
  $("#histTimeline").innerHTML = '<div class="tl">'+TIMELINE.map(function(e){
    if(e.era) return '<div class="era">'+e.era+'</div>';
    return '<div class="ev'+(e.big ? " big" : "")+'"><div class="y">'+e.y+'</div><div class="t">'+e.t+'<span>'+e.s+'</span></div></div>';
  }).join("")+'</div>';
}
function renderGens(){
  var rows = [["Dates (Basic Map)","dates"],["Dates (lecture)","lect"],["Key figures","who"],["Focus","focus"],["Secondary issues","marks"],["Organizations and growth","orgs"]];
  var html = '<div class="tblwrap"><table class="tbl"><thead><tr><th></th>'+GENS.map(function(g){ return "<th>"+g.n+" generation</th>"; }).join("")+'</tr></thead><tbody>'+
    rows.map(function(r){
      return '<tr><td class="head">'+r[0]+'</td>'+GENS.map(function(g){
        var v = g[r[1]];
        return '<td class="sm">'+(Array.isArray(v) ? "<ul>"+v.map(function(x){ return "<li>"+x+"</li>"; }).join("")+"</ul>" : v)+'</td>';
      }).join("")+'</tr>';
    }).join("")+'</tbody></table></div>'+
    '<p class="note">The lecture slides and the Basic Map date the generations differently. Both are here; the Map is allowed during the exam, and it stresses that generations are broad phases, not rigid bins.</p>'+
    '<div class="note-sec" style="margin-top:26px"><div class="boxrow"><div class="box"><h4>Continuity</h4><ul>'+GEN_CONTINUITY.map(function(x){ return "<li>"+x+"</li>"; }).join("")+'</ul></div>'+
    '<div class="box"><h4>Development</h4><ul>'+GEN_DEVELOPMENT.map(function(x){ return "<li>"+x+"</li>"; }).join("")+'</ul></div></div>'+
    '<h3 style="text-align:center">Where it may grow next</h3><div class="chips">'+FUTURE.map(function(f){ return '<span class="chip">'+f+'</span>'; }).join("")+'</div></div>';
  $("#histGens").innerHTML = html;
}

/* ================================================================ theology */
function renderTheoNotes(){
  $("#theoNotes").innerHTML = '<div class="secnav">'+THEO.map(function(s){ return '<a href="#theo-'+s.id+'" data-a="theo-'+s.id+'">'+s.h.replace(/“|”/g,"")+'</a>'; }).join("")+'</div>'+
    THEO.map(function(s){ return '<div class="note-sec" id="theo-'+s.id+'"><h2>'+s.h+'</h2>'+divider()+s.body+'</div>'; }).join("");
  $$("#theoNotes .secnav a").forEach(function(a){
    a.addEventListener("click", function(e){ e.preventDefault(); var el = document.getElementById(a.getAttribute("data-a")); if(el) el.scrollIntoView({behavior:"smooth", block:"start"}); });
  });
}

/* ================================================================ essays */
function renderOutlines(){
  var html = ESSAYS.map(function(es){
    return '<details class="outline"><summary>'+es.q+'</summary><div class="body">'+
      '<h4>A thesis to build on</h4><p>'+es.thesis+'</p>'+
      '<h4>Points to hit</h4><ul>'+es.pts.map(function(p){ return "<li>"+p+"</li>"; }).join("")+'</ul>'+
      '<h4>Make it stand out</h4><p>'+es.tip+'</p></div></details>';
  }).join("");
  html += '<div class="note-sec" style="margin-top:30px"><h2>The reflective question</h2>'+divider()+
    '<p style="text-align:center;color:var(--ink-soft)">The guidance says to reflect on the practical implications of the doctrines. Prompts to rehearse:</p><ul>'+
    REFLECT.map(function(r){ return "<li>"+r+"</li>"; }).join("")+'</ul></div>';
  $("#essayOutlines").innerHTML = html;
}
var practiceKey = store.get("practice") || "e:gens", practiceTimer = null, practiceBuilt = false;
var REFLECT_CHECKS = ["Name the doctrine or idea precisely.","Tie it to a Scripture text or a lecture source.","Apply it to a real person or case (Carl, Harold, Catherine…).","Say what it changes in how you would actually care for someone."];
function practiceItem(k){
  var m = /^([er]):(.+)$/.exec(k) || ["","e","gens"];
  if(m[1] === "r"){ var i = parseInt(m[2],10) || 0; return {q:REFLECT[i] || REFLECT[0], pts:REFLECT_CHECKS, outline:null}; }
  var es = ESSAYS.filter(function(x){ return x.id === m[2]; })[0] || ESSAYS[0];
  return {q:es.q, pts:es.pts, outline:es};
}
function renderPractice(){
  var opts = ESSAYS.map(function(es, i){ return '<option value="e:'+es.id+'">Essay '+(i+1)+' — '+strip(es.q).slice(0,70)+'…</option>'; }).join("")+
             REFLECT.map(function(r, i){ return '<option value="r:'+i+'">Reflective '+(i+1)+' — '+r.slice(0,70)+(r.length > 70 ? "…" : "")+'</option>'; }).join("");
  $("#essayPractice").innerHTML = '<div class="practice">'+
    '<div class="toolbar"><span class="label">Prompt</span><select id="prSel" style="font-family:var(--serif);font-size:15px;padding:8px 10px;border:1px solid var(--line-strong);border-radius:3px;background:#fff;max-width:100%">'+opts+'</select></div>'+
    '<p class="prompt" id="prText"></p>'+
    '<div class="toolbar"><span class="label">Timer</span><div class="seg" id="prTimer"><button type="button" data-min="0" aria-pressed="true">Off</button><button type="button" data-min="15" aria-pressed="false">15 min</button><button type="button" data-min="25" aria-pressed="false">25 min</button></div></div>'+
    '<textarea id="prBox" placeholder="Write your answer here. It saves on this device as you type."></textarea>'+
    '<div class="pmeta"><span id="prWords">0 words</span><span id="prClock"></span><span>Saved on this device</span></div>'+
    '<h3 class="h2" style="font-size:19px;margin-top:26px">Check yourself</h3><div class="checks" id="prChecks"></div>'+
    '<details class="outline" id="prOutlineBox" style="margin-top:18px"><summary>Show the outline</summary><div class="body" id="prOutline"></div></details>'+
  '</div>';
  var sel = $("#prSel");
  sel.addEventListener("change", function(){ loadPractice(sel.value); });
  $("#prBox").addEventListener("input", function(){ store.set("draft:"+practiceKey, this.value); words(); });
  segWire("#prTimer", "data-min", function(v){ startTimer(parseInt(v,10)); });
  practiceBuilt = true;
  loadPractice(practiceKey);
}
function words(){ var v = $("#prBox").value.trim(); $("#prWords").textContent = (v ? v.split(/\s+/).length : 0) + " words"; }
function loadPractice(k){
  practiceKey = k; store.set("practice", k);
  var it = practiceItem(k);
  if($("#prSel").value !== k) $("#prSel").value = k;
  $("#prText").innerHTML = it.q;
  $("#prBox").value = store.get("draft:"+k) || ""; words();
  var chk = getJSON("chk:"+k, []);
  $("#prChecks").innerHTML = it.pts.map(function(p, i){
    return '<label'+(chk.indexOf(i) >= 0 ? ' class="done"' : '')+'><input type="checkbox" data-c="'+i+'"'+(chk.indexOf(i) >= 0 ? " checked" : "")+'> <span>'+p+'</span></label>';
  }).join("");
  $$("#prChecks input").forEach(function(cb){
    cb.addEventListener("change", function(){
      var c = getJSON("chk:"+practiceKey, []), i = parseInt(cb.getAttribute("data-c"),10);
      c = c.filter(function(x){ return x !== i; }); if(cb.checked) c.push(i);
      store.set("chk:"+practiceKey, JSON.stringify(c)); cb.parentNode.classList.toggle("done", cb.checked);
    });
  });
  var box = $("#prOutlineBox");
  if(it.outline){ box.hidden = false; box.open = false; $("#prOutline").innerHTML = '<h4>A thesis to build on</h4><p>'+it.outline.thesis+'</p><h4>Make it stand out</h4><p>'+it.outline.tip+'</p>'; }
  else box.hidden = true;
}
function startTimer(min){
  if(practiceTimer){ clearInterval(practiceTimer); practiceTimer = null; }
  var clock = $("#prClock"); clock.style.color = "";
  if(!min){ clock.textContent = ""; return; }
  var end = Date.now() + min*60000;
  function tick(){
    var s = Math.max(0, Math.round((end - Date.now())/1000));
    clock.textContent = Math.floor(s/60) + ":" + ("0"+(s%60)).slice(-2) + " left";
    if(s === 0){ clock.textContent = "Time — finish your sentence"; clock.style.color = "var(--bad)"; clearInterval(practiceTimer); practiceTimer = null; }
  }
  tick(); practiceTimer = setInterval(tick, 1000);
}
function renderCases(){
  $("#essayCases").innerHTML = CASES.map(function(c){
    return '<div class="casecard"><h3>'+c.name+'</h3><div class="src">'+c.src+'</div><p>'+c.story+'</p>'+
      '<ul class="asks">'+c.asks.map(function(a){ return "<li>"+a+"</li>"; }).join("")+'</ul>'+
      '<details class="outline" style="margin:12px 0 0;box-shadow:none"><summary style="font-size:15.5px">Angles from the lectures</summary><div class="body">'+
      '<ul>'+c.angles.map(function(a){ return "<li>"+a+"</li>"; }).join("")+'</ul></div></details></div>';
  }).join("");
}

/* ================================================================ mock exam */
var mockCfg = getJSON("mockcfg", {n:25, types:"all", topic:"all"});
function renderMockSetup(){
  var root = $("#mockExam");
  function seg(id, attr, val, list){
    return '<div class="seg" id="'+id+'">'+list.map(function(o){ return '<button type="button" '+attr+'="'+o[0]+'" aria-pressed="'+(String(o[0]) === String(val))+'">'+o[1]+'</button>'; }).join("")+'</div>';
  }
  root.innerHTML = '<div class="quizWrap"><div class="qcard card-corners">'+CORNERS+
    '<div class="qnum">Mock exam</div><p class="qtext">Set it up, then answer against the whole unit. Each run is drawn fresh.</p>'+
    '<div class="setup">'+
      '<div class="row"><span class="label">Length</span><br>'+seg("mxN","data-n",mockCfg.n,[[15,"15"],[25,"25"],[40,"40"]])+'</div>'+
      '<div class="row"><span class="label">Question types</span><br>'+seg("mxT","data-t",mockCfg.types,[["all","Everything"],["mc","Multiple choice"],["tf","True / false"],["ap","Application"]])+'</div>'+
      '<div class="row"><span class="label">Topics</span><br>'+seg("mxP","data-p",mockCfg.topic,[["all","All four"],["people","Figures"],["orgs","Organizations"],["history","History"],["theology","Theology"]])+'</div>'+
      '<div class="row" style="margin-top:22px"><button class="btn primary" type="button" id="mxStart">Start the mock exam</button></div>'+
      '<p class="hint" style="margin-top:12px">Matching and the essays are practiced in their own tabs.</p>'+
    '</div></div></div>';
  segWire("#mxN","data-n",function(v){ mockCfg.n = parseInt(v,10); store.set("mockcfg", JSON.stringify(mockCfg)); });
  segWire("#mxT","data-t",function(v){ mockCfg.types = v; store.set("mockcfg", JSON.stringify(mockCfg)); });
  segWire("#mxP","data-p",function(v){ mockCfg.topic = v; store.set("mockcfg", JSON.stringify(mockCfg)); });
  $("#mxStart").addEventListener("click", function(){
    engines.mock = makeQuiz(root, function(){ return mockQuestions({n:mockCfg.n, types:mockCfg.types, topics:mockCfg.topic === "all" ? [] : [mockCfg.topic]}); },
                            {showTopic:true, againLabel:"New mock exam", onSetup:renderMockSetup});
    engines.mock.start(null);
  });
  engines.mock = null;
}

/* ================================================================ wiring */
var engines = {};
engines.peopleCards = makeCards($("#peopleCards")); engines.peopleCards.load(peopleDeck());
engines.orgCards    = makeCards($("#orgCards"));    engines.orgCards.load(orgDeck());
engines.histCards   = makeCards($("#histCards"));   engines.histCards.load(pairDeck(HIST_CARDS));
engines.theoCards   = makeCards($("#theoCards"));   engines.theoCards.load(pairDeck(TERMS));
["people","orgs","history","theology"].forEach(function(tp){
  var ids = {people:["peopleMatch","peopleQuiz"], orgs:["orgMatch","orgQuiz"], history:["histMatch","histQuiz"], theology:["theoMatch","theoQuiz"]}[tp];
  engines[tp+"Match"] = makeMatch($("#"+ids[0]), function(){ return matchRound(tp, 6); });
  engines[tp+"Quiz"]  = makeQuiz($("#"+ids[1]), function(){ return topicQuestions(tp, null, 10); });
});
var theoDeck = "terms";
segWire("#pFilter", "data-pf", function(v){ setPeopleFilter(v); });
segWire("#tDeck", "data-tdeck", function(v){ theoDeck = v; engines.theoCards.load(pairDeck(v === "verses" ? VERSES : TERMS)); });
$("#pcShuffle").addEventListener("click", function(){ engines.peopleCards.load(peopleDeck()); });
$("#ocShuffle").addEventListener("click", function(){ engines.orgCards.load(orgDeck()); });
$("#hcShuffle").addEventListener("click", function(){ engines.histCards.load(pairDeck(HIST_CARDS)); });
$("#tcShuffle").addEventListener("click", function(){ engines.theoCards.load(pairDeck(theoDeck === "verses" ? VERSES : TERMS)); });

renderGuide(); renderPeople(); renderOrgs(); renderStory(); renderTimeline(); renderGens(); renderTheoNotes(); renderOutlines(); renderCases();

var ON_SHOW = {
  "people/match":  function(){ engines.peopleMatch.ensure(); },
  "people/quiz":   function(){ engines.peopleQuiz.ensure(); },
  "orgs/match":    function(){ engines.orgsMatch.ensure(); },
  "orgs/quiz":     function(){ engines.orgsQuiz.ensure(); },
  "history/match": function(){ engines.historyMatch.ensure(); },
  "history/quiz":  function(){ engines.historyQuiz.ensure(); },
  "theology/match":function(){ engines.theologyMatch.ensure(); },
  "theology/quiz": function(){ engines.theologyQuiz.ensure(); },
  "essays/practice":function(){ if(!practiceBuilt) renderPractice(); else loadPractice(practiceKey); },
  "exam/mock":     function(){ if(!engines.mock) renderMockSetup(); }
};
var KEYS = {
  "people/cards":  function(e){ return engines.peopleCards.keys(e); },
  "orgs/cards":    function(e){ return engines.orgCards.keys(e); },
  "history/cards": function(e){ return engines.histCards.keys(e); },
  "theology/cards":function(e){ return engines.theoCards.keys(e); },
  "people/quiz":   function(e){ return engines.peopleQuiz.keys(e); },
  "orgs/quiz":     function(e){ return engines.orgsQuiz.keys(e); },
  "history/quiz":  function(e){ return engines.historyQuiz.keys(e); },
  "theology/quiz": function(e){ return engines.theologyQuiz.keys(e); },
  "exam/mock":     function(e){ return engines.mock ? engines.mock.keys(e) : false; }
};
var TOPICS = ["guide","people","orgs","history","theology","essays","exam"];
var currentTopic = "guide", currentMode = {guide:"overview", people:"chart", orgs:"chart", history:"story", theology:"notes", essays:"outlines", exam:"mock"};
function showMode(topic, mode){
  currentMode[topic] = mode;
  $$('.seg[data-modes="'+topic+'"] button').forEach(function(b){ b.setAttribute("aria-pressed", String(b.getAttribute("data-mode") === mode)); });
  $$('#topic-'+topic+' .panel').forEach(function(p){ p.hidden = (p.getAttribute("data-panel") !== topic+"/"+mode); });
  var id = topic+"/"+mode;
  if(ON_SHOW[id]) ON_SHOW[id]();
  store.set("mode."+topic, mode);
}
function showTopic(id){
  currentTopic = id;
  $$(".topic-btn").forEach(function(b){ b.setAttribute("aria-selected", String(b.getAttribute("data-topic") === id)); });
  $$(".topic").forEach(function(s){ s.hidden = (s.id !== "topic-"+id); });
  showMode(id, currentMode[id]);
  store.set("topic", id);
}
$$(".topic-btn").forEach(function(b){
  b.addEventListener("click", function(){ showTopic(b.getAttribute("data-topic")); window.scrollTo({top:$(".topics").offsetTop - 8, behavior:"smooth"}); });
});
$$(".seg[data-modes]").forEach(function(seg){
  seg.addEventListener("click", function(e){
    var b = e.target.closest ? e.target.closest("button[data-mode]") : null;
    if(b) showMode(seg.getAttribute("data-modes"), b.getAttribute("data-mode"));
  });
});
document.addEventListener("keydown", function(e){
  var t = e.target, tag = (t && t.tagName) || "";
  if(/INPUT|TEXTAREA|SELECT/.test(tag)) return;
  if(tag === "BUTTON" && (e.key === " " || e.key === "Enter")) return;
  var h = KEYS[currentTopic+"/"+currentMode[currentTopic]];
  if(h && h(e)) e.preventDefault();
});

/* ---- come back to where you were ---- */
(function(){
  var t = store.get("topic");
  TOPICS.forEach(function(k){ var m = store.get("mode."+k); if(m && $('.seg[data-modes="'+k+'"] button[data-mode="'+m+'"]')) currentMode[k] = m; });
  showTopic(t && TOPICS.indexOf(t) >= 0 ? t : "guide");
})();
