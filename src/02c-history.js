/* ================================================================ history */

/* The four questions every framework answers — the spine of Unit 1 */
var FOUR_Q = ["Who are we?","What’s wrong with us?","What should we become?","How do we get there?"];

var FRAMES = [
 {name:"The Christian framework", a:[
   "Creatures made by God in his image, morally responsible to him.",
   "Sin, and sinful responses to the problems of life.",
   "Conformed to Christ; godliness.",
   "Redemption in Christ, applied through God’s Word and his people."]},
 {name:"The therapeutic framework (Rogers)", a:[
   "Persons with an inherent capacity for growth, able to discover and direct who they become.",
   "“Conditions of worth” and outside expectations alienate us from our own experience and authentic self.",
   "Congruent, self-accepting, open to experience, “fully functioning” — self-actualized.",
   "A therapeutic relationship of empathy, congruence and unconditional positive regard that facilitates self-discovery."]},
 {name:"Jay Adams’s model", a:[
   "God’s creatures and image-bearers, morally responsible before him.",
   "Fundamentally sin, and sinful responses to the problems of life.",
   "Godliness through redemption in Christ, our ultimate hope.",
   "God’s Word applied through repentance, obedience, put-off/put-on, and forming godly habits."]}
];

var STORY = [
 {h:"Why study the history?", body:
  '<ol><li>It exposes our assumptions.</li><li>It helps us notice change.</li><li>It protects us from <b>chronological snobbery</b> — assuming our moment sees more clearly than those before us.</li><li>It helps us understand the present.</li></ol>'},
 {h:"The mid-1800s shift", body:
  '<p>A competing framework for reality emerged: an alternative meta-narrative to the Judeo-Christian worldview. <b>Darwin’s <i>Origin of Species</i> (1859)</b> sparked an intellectual crisis. The issue was not only Genesis but <i>whether the Bible could be trusted at all</i>.</p>'+
  '<div class="quote">It would be difficult to overstate the crucial importance of the absolute integrity of the Bible to the nineteenth-century American evangelical’s whole way of thinking. When this cornerstone began to be shaken, major adjustments… had to be made from top to bottom.<small>George Marsden, Understanding Fundamentalism and Evangelicalism, pp. 12–13</small></div>'+
  '<div class="quote">The personal God who could be known through revelation and experience… was replaced by a more radically unknown and unknowable “something” that underlay the veil of mental and physical phenomena.<small>Thomas Dixon, From Passions to Emotions, p. 142</small></div>'},
 {h:"Early 1900s: humans understood without God", body:
  '<ol><li>A search for <b>natural explanations</b> for human problems.</li><li>Secular social sciences shaping everyday life.</li><li>A focus on a “good personality” — “adaptability, cheer, and the ability to work smoothly with others” (Holifield).</li></ol><p><b>Secondary issues became matters of greatest importance.</b> Carl Rogers became the major influence: experience as the highest authority, empathy, self-acceptance, self-realization.</p>'},
 {h:"What it did to the care of souls", body:
  '<ul><li>Mainline, liberal theology moved toward the social gospel and embraced the new view of humanity.</li><li>Pastoral care leaders were dissatisfied with clergy seen as “suppressing vices rather than healing pain” (Holifield, <i>A History of Pastoral Care in America: From Salvation to Self-Realization</i>, p. 219).</li><li>Harry Emerson Fosdick: “the key to the understanding of all life is the value of personality.”</li><li>Many conservative churches had other focuses than the care of souls (Basic Map).</li></ul>'+
  '<div class="exam-tip"><b>The impact in one line</b>People were no longer understood primarily within God’s created order, but through development, personality, pain, maladjustment or evolutionary inheritance. The goal became a healthy, self-realizing person, reached through psychological insight and therapeutic relationships — and pastors learned to refer people out.</div>'},
 {h:"The 1960s rethinking", body:
  '<p>Roughly a hundred-year shift (1865 → 1960s) produced two responses in the 1960s–80s:</p><ul><li><b>Thomas Oden</b> (not BCM): a former integrationist who called the church back to its <i>classic</i> tradition of soul care, with Gregory the Great as the model.</li><li><b>Jay Adams</b>: after Mowrer’s challenge, rebuilt counseling on Scripture — <i>Competent to Counsel</i> (1969) and nouthetic counseling.</li></ul>'}
];

var TIMELINE = [
 {era:"The classic tradition"},
 {y:"c. 540", t:"<b>Gregory the Great</b> is born", s:"The Book of Pastoral Rule — roughly 500 years after Jesus, 1,000 before the Reformation."},
 {y:"1517", t:"<b>The Reformation</b>", s:"About 450 years before the 1960s rethinking."},
 {era:"The shift"},
 {y:"1859", t:"<b>Darwin, <i>Origin of Species</i></b>", s:"An intellectual crisis: can the Bible be trusted at all?", big:true},
 {y:"1865+", t:"<b>Post-Civil War</b>", s:"The competing framework spreads."},
 {y:"1918+", t:"<b>Post-World War I</b>", s:"Natural explanations; the “good personality”; Fosdick; social gospel."},
 {y:"1929", t:"<b>Jay Adams born</b>", s:"Into a non-Christian home. (The Basic Map prints 1931.)"},
 {y:"1931", t:"<b>Thomas Oden born</b>", s:"In rural Oklahoma."},
 {y:"1945", t:"<b>Post-World War II</b>", s:"Rogers and the therapeutic culture dominate."},
 {era:"The rethinking"},
 {y:"1952", t:"<b>Adams enters the pastorate</b>", s:"Feels unprepared for people’s personal problems."},
 {y:"1963", t:"<b>Adams at Westminster</b>", s:"Begins lecturing on practical theology."},
 {y:"1965", t:"<b>Adams meets O. Hobart Mowrer</b>", s:"Takes his intensive course; begins rethinking counseling.", big:true},
 {y:"1966", t:"<b>Adams introduces his approach</b>", s:"First public presentation of the new model."},
 {y:"1969", t:"<b><i>Competent to Counsel</i></b>", s:"Nouthetic counseling. In March he hears “too rough” — and sharpens it.", big:true},
 {y:"1982", t:"<b>CCEF West founded</b>", s:"Later independent as IBCD."},
 {y:"1984", t:"<b>Oden, <i>Care of Souls in the Classic Tradition</i></b>", s:"Calls pastoral theology back from “thoughtless mimic” of psychology."},
 {y:"1988", t:"<b>Adams honored</b>", s:"First International Congress on Christian Counseling, as one of its fathers."},
 {y:"1993", t:"<b>Gary Collins reflects</b>", s:"Praises and critiques Competent to Counsel."}
];

/* Generations. The lecture and the Basic Map give different dates; both are
   shown because the Map is allowed in the exam and the lecture is what was taught. */
var GENS = [
 {n:"First", dates:"1960s–1980s", lect:"1970–1990",
  who:"Jay Adams, John Bettler, John Broger",
  focus:"From model to movement. Pastoral care reoriented around Scripture, responsibility, Christ, biblical change and the church; training institutions and organizations emerge.",
  marks:[
   "Organic vs. nonorganic: two options; treat real bodily disease medically, counsel the rest.",
   "The past is not the focus; the present response is.",
   "Change happens primarily through habituation: put-off/put-on.",
   "In suffering, the focus is the right response.",
   "Method: nouthetic — admonishing, warning, instructing."],
  orgs:"Westminster, CCEF, NANC, Self-Confrontation. Three tendencies: Adams (generalist pastors), Bettler (specialized pastoral counselors), Broger (lay people)."},
 {n:"Second", dates:"1980s–2000s", lect:"1990–2005?",
  who:"David Powlison, Ed Welch (CCEF), Paul Tripp, Elyse Fitzpatrick",
  focus:"Toward a deeper biblical anthropology. The same fundamental answers, with nuance in the secondary issues: suffering, the heart and motives, compassionate care, more complex problems.",
  marks:[
   "Organic vs. nonorganic: more nuance in issues of embodiment.",
   "The past and context can affect a person now.",
   "Suffering: respond well, but also show compassion, help lament, provide moorings.",
   "Heart vs. habit: critique of mere habituation; identity in Christ, motives, the heart.",
   "Method: “nouthetic” becomes “biblical counseling,” fitted to the individual."],
  orgs:"NANC growth and strategic vision; writing; the professional world (ABC, Jeremy Lelek); academic institutions; the Journal of Pastoral Practice relaunched as the Journal of Biblical Counseling."},
 {n:"Third", dates:"2000s–present", lect:"2005–present",
  who:"Garrett Higbee, Heath Lambert, Bob Kellemen, Kevin Carson and many more",
  focus:"A broadening movement: institutional, academic, international and specialized growth — and, with breadth, new debates about method, common grace, identity and boundaries.",
  marks:[
   "Breadth: NANC becomes ACBC; academic expansion; publishing; international growth.",
   "Depth: intensive ministries (Twelve Stones, Vision of Hope, The Addiction Connection) and specialized ones (Fieldstone, Gospel Care Collective); Higbee’s Continuum of Care.",
   "Collaboration: the BCC, its Confessional Statement, Leadership Summit, a megaphone for the movement.",
   "Debates: can a technique be separated from its worldview? Complex issues like trauma? A place for secularly trained Christians? Protectors vs. explorers."],
  orgs:"ACBC, BCC, ABC, IABC, IBCD, specialized and intensive ministries. A growing spectrum, united by the authority and sufficiency of God’s Word."}
];

var GEN_CONTINUITY = [
 "The same core answers to the four questions: image-bearers, responsible before God; sin is the root problem; Christ is the hope; God’s Word brings change.",
 "Scripture’s authority and sufficiency stay the shared foundation.",
 "The church remains the primary home of counseling."];
var GEN_DEVELOPMENT = [
 "From behavior and habit (first) to the heart, motives and identity in Christ (second).",
 "From “organic vs. nonorganic” (first) to embodied nuance (second) to specialized ministries (third).",
 "From a right response in suffering (first) to compassion and lament (second).",
 "From one model (first) to institutions and writing (second) to breadth, collaboration and debate (third)."];
var FUTURE = ["Children","Geriatrics","Deeper anthropology","Continued specialization","Context in and beyond the church","Academics"];

/* flashcards and match */
var HIST_CARDS = [
 ["The four questions of any framework","Who are we? What’s wrong with us? What should we become? How do we get there?"],
 ["Four values of studying history","Exposes assumptions; helps us notice change; protects from chronological snobbery; helps us understand the present."],
 ["Chronological snobbery","Assuming our present moment sees more clearly and has more insight than those who came before us."],
 ["The mid-1800s shift","A competing meta-narrative to the Judeo-Christian worldview; Darwin’s Origin of Species (1859) raised whether the Bible could be trusted at all."],
 ["Three marks of the early 1900s","Natural explanations for human problems; secular social science in everyday life; focus on a “good personality.”"],
 ["“Secondary issues became matters of greatest importance”","The early-1900s drift: adaptability, cheer and personality eclipsed God, sin and redemption."],
 ["Impact on the care of souls","Mainline churches embraced the social gospel and the new view of humanity; pastoral care became therapeutic; many conservatives focused elsewhere."],
 ["The hundred-year shift","From about 1865 to the 1960s, soul care in the U.S. moved from salvation toward self-realization."],
 ["First generation (Map dates)","1960s–1980s — lecture: 1970–1990. Adams, Bettler, Broger: from model to movement."],
 ["Second generation (Map dates)","1980s–2000s — lecture: 1990–2005. Powlison, Welch: a deeper biblical anthropology."],
 ["Third generation (Map dates)","2000s–present — lecture: 2005–present. Breadth, depth, collaboration and debate."],
 ["The three originals and their concerns","Adams: generalist local-church pastors. Bettler: specialized pastoral counselors. Broger: lay people."],
 ["Adams’s vision for organizing the movement","Academic education, practical training, pastoral or lay certification, and a continual pastoral resource."],
 ["Second generation: what stayed the same","The same fundamental answers to the key questions."],
 ["Second generation: heart vs. habit","A critique of habituation; focus on identity in Christ, motives and the heart."],
 ["Second generation: suffering","Respond well — but also show compassion, help people lament, and provide moorings."],
 ["Third generation debates","Can a technique be separated from its worldview? Complex issues like trauma? Room for secularly trained Christians? Protectors vs. explorers."],
 ["“Generations are phases, not bins”","Organizations continue across phases and leaders shape later ones — use generations to see development, not to file every person."]
];
var HIST_PAIRS = [
 ["1859","Darwin’s Origin of Species"],
 ["1952","Adams begins pastoral ministry"],
 ["1963","Adams begins lecturing at Westminster"],
 ["1965","Adams takes Mowrer’s intensive course"],
 ["1969","Competent to Counsel is published"],
 ["1982","CCEF West, later IBCD, is founded"],
 ["1984","Oden’s Care of Souls in the Classic Tradition"],
 ["1988","Adams honored at the First International Congress on Christian Counseling"],
 ["c. 540","Gregory the Great is born"],
 ["1517","The Reformation"],
 ["First generation","Model to movement; habituation, put-off/put-on"],
 ["Second generation","Heart and motives; compassion in suffering; embodiment"],
 ["Third generation","Breadth, specialization, the BCC, and debate"]
];
