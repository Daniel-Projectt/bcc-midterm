/* ================================================================ organizations
   The four the study guide names get the comparison table; the rest are the
   wider landscape from the Basic Map and the lectures.                          */
var ORG_FOCUS = [
 {id:"ccef", abbr:"CCEF", name:"Christian Counseling & Educational Foundation",
  role:"Counseling, training and thought leadership",
  people:"John Bettler (early leader); David Powlison and Ed Welch",
  when:"Rooted in the first generation; the key thought leader of the second",
  does:[
   "An early counseling, training and institutional center, associated with John Bettler.",
   "Helped broaden and deepen biblical counseling beyond some early limitations — correcting early excesses, in Powlison’s own account.",
   "The key thought leader for second-generation emphases: the heart and motives, suffering, and issues of embodiment."],
  roots:"Westminster Seminary Philadelphia, where Adams built his framework, was foundational for CCEF.",
  mark:"Depth — the heart, suffering, embodiment"},
 {id:"acbc", abbr:"NANC / ACBC", name:"National Association of Nouthetic Counselors, now the Association of Certified Biblical Counselors",
  role:"Certification and training",
  people:"Randy Patten (first full-time director of NANC); Heath Lambert (former director of ACBC)",
  when:"Founded in the first generation; grew in the second; renamed ACBC in the third",
  does:[
   "NANC was the early training and certifying organization of the nouthetic counseling world; ACBC is its later development.",
   "A lay and pastoral <b>generalist</b> certifying agency.",
   "Foundational to the movement and still thriving. OIC (now Biblical Counseling Ministries Worldwide) is an ACBC training group that pioneered international growth."],
  roots:"Grew out of Adams’s nouthetic counseling and his vision of pastoral and lay certification.",
  mark:"Certification — generalist, lay and pastoral"},
 {id:"abc", abbr:"ABC", name:"Association of Biblical Counselors",
  role:"Church care and the professional world",
  people:"Jeremy Lelek and Shauna Van Dyke",
  when:"Named in the second generation’s growth; a contemporary organization",
  does:[
   "A contemporary organization within the broader biblical counseling landscape.",
   "Considers both pastoral and lay biblical counseling <b>and</b> Christians working in secular fields.",
   "Represents the professional-world and organizational development of the movement."],
  roots:"The second-generation lecture lists it as “the professional world: ABC and Jeremy Lelek.”",
  mark:"Professional world — lay and pastoral care, plus Christians in secular fields"},
 {id:"bcc", abbr:"BCC", name:"Biblical Counseling Coalition",
  role:"Coalition — unity, dialogue and a shared voice",
  people:"Bob Kellemen (first director); Garrett Higbee and Curtis Solomon (past leaders); Kevin Carson (current)",
  when:"A third-generation, collaborative development",
  does:[
   "A collaborative network for unity and shared work across the movement.",
   "Unified by a <b>Confessional Statement</b>; hosts a Leadership Summit; serves as a “megaphone” for the movement.",
   "Fosters dialogue amid the growing diversity — and so has also become a setting for important debates."],
  roots:"Formed as the movement broadened. Its Confessional Statement supplies the common-grace wording quoted in class.",
  mark:"Coalition — unity and dialogue, not certification"}
];

var ORG_OTHER = [
 {abbr:"Westminster Theological Seminary", role:"Academic setting",
  d:"Where Adams taught practical theology from 1963 and first built his framework for nouthetic counseling. Foundational for biblical counseling, including CCEF."},
 {abbr:"Faith Biblical Counseling Ministries / Faith Church", role:"Church-based center",
  d:"A long-standing church-based counseling and training center in Lafayette, Indiana; a catalyst for the movement’s growth with a large annual conference. Figures include Bill Goode, Bob Smith, Steve Viars, Amy Baker and Charles Hodges."},
 {abbr:"Self-Confrontation", role:"Lay training",
  d:"John Broger’s lay-oriented training approach; an early expression of nouthetic counseling."},
 {abbr:"Journal of Pastoral Practice → Journal of Biblical Counseling", role:"Journal",
  d:"A journal to keep pastors current on biblical counseling; relaunched in the second generation as the Journal of Biblical Counseling."},
 {abbr:"New Growth Press", role:"Publisher",
  d:"A second-generation publisher that has supported the movement’s growing body of books and writers."},
 {abbr:"P&R Publishing", role:"Publisher",
  d:"An early publisher of biblical counseling materials that still exists today."},
 {abbr:"IBCD", role:"Training and resources",
  d:"Institute for Biblical Counseling & Discipleship. Founded in 1982 as CCEF West; now independent, strengthening churches in one-another care through training, counseling, events and materials."},
 {abbr:"IABC", role:"Association",
  d:"International Association of Biblical Counselors. Like ACBC and ABC it offers membership, training, certification and conferences, with a strong emphasis on sufficiency and local-church care — and is a bit more theologically expansive."},
 {abbr:"OIC → BCMW", role:"International training",
  d:"Overseas Instruction in Counseling, renamed Biblical Counseling Ministries Worldwide: an ACBC training group that pioneered international growth."},
 {abbr:"Twelve Stones", role:"Intensive ministry",
  d:"An intensive counseling ministry highlighted in the movement’s third-generation depth."},
 {abbr:"Vision of Hope", role:"Residential ministry",
  d:"An early residential biblical counseling ministry associated with Faith Church in Lafayette, Indiana."},
 {abbr:"The Addiction Connection", role:"Specialized ministry",
  d:"Mark Shaw’s specialized ministry focused on addiction."},
 {abbr:"Soul Care Consulting", role:"Church consulting",
  d:"Garrett Higbee’s work helping local churches build biblical soul care."},
 {abbr:"Fieldstone · Gospel Care Collective", role:"Specialized counseling",
  d:"Examples the lecture gives of the third generation’s specialized counseling."}
];

/* Match pairs: the abbreviation to the one line that sets it apart */
var ORG_PAIRS = [
 ["CCEF","Deepened the movement: heart, suffering, embodiment — home of Powlison and Welch"],
 ["NANC / ACBC","The generalist lay and pastoral certifying agency"],
 ["ABC","Serves lay and pastoral counselors and Christians in secular fields"],
 ["BCC","Coalition united by a Confessional Statement; fosters dialogue"],
 ["Westminster","Where Adams first developed nouthetic counseling"],
 ["Faith Church","Church-based training center in Lafayette with a large annual conference"],
 ["IBCD","Founded in 1982 as CCEF West"],
 ["IABC","Similar to ACBC and ABC, but a bit more theologically expansive"],
 ["New Growth Press","Second-generation publisher of biblical counseling books"],
 ["P&R Publishing","Early publisher of biblical counseling materials, still going"],
 ["OIC / BCMW","ACBC training group that pioneered international growth"],
 ["Vision of Hope","Early residential ministry tied to Faith Church"],
 ["The Addiction Connection","Mark Shaw’s specialized ministry on addiction"],
 ["Self-Confrontation","John Broger’s lay training course"]
];
