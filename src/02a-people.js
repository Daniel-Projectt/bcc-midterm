/* ================================================================ key figures
   guide:true  = named on the Midterm Exam Guidance
   bcm:false   = the guide itself marks them "not BCM"
   line        = the one-line descriptor used by Match (must be unique)          */
var PEOPLE = [
 {id:"adams", name:"Jay E. Adams", yrs:"1929 – 2020", guide:true, bcm:true, gen:"First generation · founder",
  tags:["Founder","Nouthetic counseling","Westminster"],
  pts:[
   "Born in 1929 into a non-Christian home. Studied classical languages at Johns Hopkins, where he first met psychology. (The Basic Map prints 1931; the lecture says 1929.)",
   "Began pastoral ministry in 1952 and felt unprepared to help people with personal problems.",
   "Read widely for a decade: secular psychologists, mainline pastoral counselors, early evangelical psychologists. What he found was depth psychology plus Rogers-style non-directive affirmation, with pastors trained to refer people out.",
   "1963: began lecturing on practical theology at Westminster Theological Seminary.",
   "1965: took an intensive course with O. Hobart Mowrer, which sparked his rethinking.",
   "1969: <i>Competent to Counsel</i> introduced <b>nouthetic counseling</b>. Told it was “too rough,” he went home and “sharpened it up some more.”",
   "Method was presuppositional: the inerrant Bible is the standard; science is a “useful adjunct,” but psychiatry had largely given way to humanistic philosophy."],
  why:"Widely recognized as the founder of the modern biblical counseling movement. He challenged integrationist models, put sin and responsibility back at the center, and argued that pastors and Christians are competent to counsel from Scripture. Powlison later called him the “biblical conscience” of the evangelical counseling world.",
  quote:{t:"I avowedly accept the inerrant Bible as the Standard of faith and practice.", s:"Adams, Competent to Counsel, p. xxi"},
  line:"Founder of the modern movement; nouthetic counseling; Competent to Counsel (1969)"},

 {id:"mowrer", name:"O. Hobart Mowrer", yrs:"1907 – 1982", guide:true, bcm:false, gen:"Not BCM · secular influence on Adams",
  tags:["Not BCM","Secular moral therapist"],
  pts:[
   "A <b>secular</b> moral therapist — not a Christian counselor and not part of the movement.",
   "Challenged the dominant psychological and therapeutic models of his day; Adams took up his label “Freudian” for depth psychology.",
   "In 1965 Adams encountered him and took an intensive course with him."],
  why:"His moral approach significantly influenced Adams’s rethinking of counseling. Mowrer is the outside spark: a secular voice that challenged the therapeutic consensus and pushed Adams back to Scripture.",
  line:"Secular moral therapist whose approach sparked Adams’s rethinking in 1965"},

 {id:"oden", name:"Thomas C. Oden", yrs:"1931 – 2016", guide:true, bcm:false, gen:"Not BCM · parallel rethinking",
  tags:["Not BCM","Classic tradition","Care of Souls (1984)"],
  pts:[
   "Born in rural Oklahoma in 1931; honors student at the University of Oklahoma; influenced by Marxism. The Methodist youth movement wanted a revolution that would replace the traditional gospel.",
   "At Yale (under Niebuhr) he took up the psychology of religion and tried to integrate Freudian, then Rogerian, therapy with liberal theology — “a therapy of personal self-disclosure with a theology of divine self-disclosure.”",
   "At Drew University, Will Herberg challenged him deeply, and he set out to rediscover the classic Christian tradition.",
   "1984: <i>Care of Souls in the Classic Tradition</i>. The tradition had been “misplaced and atrophied”; pastoral theology had become “a thoughtless mimic of the most current psychological trends.”",
   "Used Gregory the Great as his case study of classic soul care."],
  why:"Not part of the movement, but a parallel witness: a former integrationist who showed what the therapeutic world and many churches had lost — the church’s own long tradition of soul care, with Christ as the true pastor. He is the class’s guard against “chronological snobbery.”",
  quote:{t:"Our interpersonal care can at best be only a modest refraction of the radiance of God’s own caring for us in Jesus Christ.", s:"Oden, Care of Souls in the Classic Tradition, pp. 56–57"},
  line:"Former integrationist who called pastoral care back to the classic tradition (1984)"},

 {id:"gregory", name:"Gregory the Great", yrs:"c. 540 – 604", guide:true, bcm:false, gen:"Not BCM · the classic tradition",
  tags:["Not BCM","The Book of Pastoral Rule"],
  pts:[
   "Born about 540 — roughly 500 years after Jesus and 1,000 before the Reformation.",
   "Wrote <i>The Book of Pastoral Rule</i>, the classic handbook of soul care.",
   "Taught that the shepherd must attend to the inner life without neglecting outward duties, and to outward matters without neglecting the inner life.",
   "Counsel must be adapted to the person: what helps one person harms another, like herbs that feed one animal and kill another. Same common doctrine, distinct exhortations."],
  why:"Oden’s case study for the classic tradition. Gregory shows individualized care, attention to self-deception and rationalization, hidden weaknesses behind apparent strengths, the inner and outer person — and Christ’s care kept primary. With Carl, he would know Carl specifically, see both his outer and inner life, and apply Scripture with individual wisdom.",
  quote:{t:"The discourse of the teacher should be adapted to the character of his audience so that it can address the specific needs of each individual.", s:"Gregory, The Book of Pastoral Rule, p. 89"},
  line:"Author of The Book of Pastoral Rule; Oden’s case study of classic soul care"},

 {id:"bettler", name:"John Bettler", yrs:"", guide:true, bcm:true, gen:"First generation · one of the three originals",
  tags:["First generation","CCEF","Specialized pastoral counselors"],
  pts:[
   "Early leader of CCEF.",
   "One of the “three originals” of the first generation, with Adams and Broger.",
   "Represented <b>specialized pastoral counselors</b> — counseling as a focused ministry, beyond the generalist pastor."],
  why:"His organizing concern shows the movement was never one thing: from the start there were three tendencies. Bettler’s CCEF became the institution that later broadened and deepened the movement.",
  line:"Early CCEF leader; represented specialized pastoral counselors"},

 {id:"broger", name:"John Broger", yrs:"", guide:true, bcm:true, gen:"First generation · one of the three originals",
  tags:["First generation","Self-Confrontation","Lay people"],
  pts:[
   "One of the “three originals” of the first generation.",
   "Represented <b>lay people</b>: counseling as the work of ordinary believers.",
   "Created <i>Self-Confrontation</i>, a lay-oriented training approach and an early expression of nouthetic counseling."],
  why:"Broger carried biblical counseling to the pew: training ordinary Christians, not just pastors, to counsel one another from Scripture.",
  line:"Lay-level training through Self-Confrontation; represented lay people"},

 {id:"powlison", name:"David Powlison", yrs:"1949 – 2019", guide:true, bcm:true, gen:"Second generation · CCEF",
  tags:["Second generation","CCEF","Heart and motives"],
  pts:[
   "Trained in psychology, ministry, and the history of psychiatry.",
   "Key figure of the second generation, at CCEF with Ed Welch.",
   "Broadened and deepened the movement: careful listening, rich biblical theology, the complexity of suffering and sin, the heart and its motives.",
   "Defined counseling simply: “Intentional helpful conversations — that’s all counseling is” (<i>Seeing with New Eyes</i>).",
   "Wrote the history the class draws on: <i>The Biblical Counseling Movement: History and Context</i>."],
  why:"He is the reason the second generation reads the heart, not only behavior. He kept Adams’s commitments while correcting early excesses and giving the movement theological and pastoral depth.",
  quote:{t:"Intentional helpful conversations — that’s all counseling is.", s:"Powlison, Seeing with New Eyes"},
  line:"Second generation at CCEF; deepened the movement; “intentional helpful conversations”"},

 {id:"welch", name:"Ed Welch", yrs:"", guide:true, bcm:true, gen:"Second generation · CCEF",
  tags:["Second generation","CCEF","Inner and outer person"],
  pts:[
   "Ministry training at Westminster and a PhD in neuropsychology.",
   "Key figure of the second generation, at CCEF with Powlison.",
   "Known for thinking carefully about the <b>inner and outer person</b> — heart and body — and issues of embodiment.",
   "<i>The Counselor’s Guide to the Brain and Its Disorders</i>: the heart–body diagram the class uses (p. 32)."],
  why:"He gave the movement a more careful account of the body. The second generation’s nuance on “organic vs. nonorganic” problems runs through Welch: body and heart influence each other, and either can be where a struggle like depression starts.",
  quote:{t:"Regardless of whether the cause is the heart or the body, finding hope in Christ in the midst of such pain can be a difficult process — a spiritual battle — and biblical care is essential.", s:"Welch, The Counselor’s Guide to the Brain and Its Disorders, p. 185"},
  line:"Second generation; PhD in neuropsychology; the inner and outer person"},

 {id:"higbee", name:"Garrett Higbee", yrs:"", guide:true, bcm:true, gen:"Third generation · soul care in the church",
  tags:["Third generation","Continuum of Care","Soul Care Consulting"],
  pts:[
   "Counseling leader tied to the movement’s broader development and to <b>intensive</b> counseling.",
   "Champions biblical soul care in the local church through Soul Care Consulting; “A Culture of Care.”",
   "Proposed the <b>Continuum of Care</b>: intentional discipleship → relational mentoring and coaching → formal soul care → intensive soul care.",
   "A past leader of the Biblical Counseling Coalition."],
  why:"He answers “what level and kind of care does this person need?” His continuum moves care back into the whole body of Christ while matching competency to complexity.",
  line:"Continuum of Care; soul care in the local church; Soul Care Consulting"},

 {id:"rogers", name:"Carl Rogers", yrs:"1902 – 1987", guide:false, bcm:false, gen:"Context · the therapeutic culture",
  tags:["Not BCM","Client-centered therapy"],
  pts:[
   "The major secular influence on 20th-century personal development and counseling.",
   "“Experience is, for me, the highest authority” — above the Bible, the prophets, Freud, or research (<i>On Becoming a Person</i>, p. 73).",
   "Emphasized empathy, self-acceptance and self-realization; the counselor facilitates self-discovery rather than applying an outside standard.",
   "The therapeutic relationship: empathy, congruence (genuineness), and unconditional positive regard."],
  why:"His answers to the four worldview questions are the foil for biblical counseling: we are self-directing growers; our problem is “conditions of worth”; the goal is a fully functioning self; the path is an empathic relationship.",
  line:"“Experience is the highest authority”; client-centered therapy"},

 {id:"fosdick", name:"Harry Emerson Fosdick", yrs:"1878 – 1969", guide:false, bcm:false, gen:"Context · early 20th century",
  tags:["Not BCM","Liberal preaching"],
  pts:[
   "The lecture’s early-20th-century case study.",
   "“The key to the understanding of all life is the value of personality.”",
   "Recast Jesus as “a champion of personality.”"],
  why:"Shows the therapeutic turn reaching the pulpit: personality, not God, becomes the center, and the gospel is reread through self-realization.",
  line:"Liberal preacher: “the key to all life is the value of personality”"},

 {id:"lambert", name:"Heath Lambert", yrs:"", guide:false, bcm:true, gen:"Third generation · ACBC",
  tags:["First PhD in Biblical Counseling","ACBC"],
  pts:[
   "Recipient of the first PhD in Biblical Counseling; former executive director of ACBC.",
   "<i>A Theology of Biblical Counseling</i>: the sufficiency definition and categories, the common-grace categories, and the three-level paradigm the class uses.",
   "Also wrote <i>Biblical Counseling and Common Grace</i>; spoke on the “generations” of the movement."],
  why:"Most of the Unit 2 theology on the exam is framed in his terms. He is also a current figure in the movement’s debates.",
  line:"First PhD in Biblical Counseling; former ACBC director; A Theology of Biblical Counseling"},

 {id:"kellemen", name:"Bob Kellemen", yrs:"", guide:false, bcm:true, gen:"Third generation · BCC",
  tags:["BCC","RPM Ministries"],
  pts:["First executive director of the Biblical Counseling Coalition.","A contemporary voice in the movement’s current debates."],
  why:"He led the coalition that tried to give the whole movement a shared voice and a place to talk.",
  line:"First executive director of the Biblical Counseling Coalition"},

 {id:"carson", name:"Kevin Carson", yrs:"", guide:false, bcm:true, gen:"Today · BCC",
  tags:["BCC"],
  pts:["A current executive leader of the Biblical Counseling Coalition."],
  why:"Names the BCC’s present leadership; earlier leaders were Kellemen, Higbee and Curtis Solomon.",
  line:"Current executive leader of the Biblical Counseling Coalition"},

 {id:"tripp", name:"Paul David Tripp", yrs:"", guide:false, bcm:true, gen:"Second generation · writer",
  tags:["Second generation","How People Change"],
  pts:["Named with Powlison and Welch among those who deepened the movement.","One of the second generation’s writers, with Elyse Fitzpatrick.","Co-author (with Timothy Lane) of <i>How People Change</i>, the course reading."],
  why:"A second-generation voice on the heart and change — and the author of the book you are reading.",
  line:"Second-generation writer; co-author of How People Change"},

 {id:"viars", name:"Steve Viars", yrs:"", guide:false, bcm:true, gen:"Organizational leader",
  tags:["Faith Church"],
  pts:["Helped bring organizational leadership to the movement.","Part of Faith Biblical Counseling Ministries / Faith Church."],
  why:"Leadership and structure helped a set of convictions become a lasting movement.",
  line:"Brought organizational leadership to the movement; Faith Church"},

 {id:"patten", name:"Randy Patten", yrs:"", guide:false, bcm:true, gen:"Organizational leader · NANC",
  tags:["NANC"],
  pts:["The first full-time executive director of NANC.","Grew NANC tremendously and influenced the wider movement."],
  why:"Under him the certifying body became a real institution.",
  line:"First full-time executive director of NANC"},

 {id:"collins", name:"Gary Collins", yrs:"", guide:false, bcm:false, gen:"Reception of Adams",
  tags:["Not BCM","Evangelical psychologist"],
  pts:[
   "Evangelical psychologist who reflected on <i>Competent to Counsel</i> in 1993.",
   "Liked its stress on what the Bible says about problems, on the Holy Spirit, and on pastors counseling instead of referring.",
   "Objected that, except for biological problems, Adams traced all problems to the counselee’s own sin.",
   "Still granted that the book boldly put sin back on the table for Christian counseling."],
  why:"His response shows how Adams was received: provocative, too sweeping for many, but impossible to ignore.",
  line:"Evangelical psychologist whose 1993 response praised and critiqued Competent to Counsel"},

 {id:"lelek", name:"Jeremy Lelek", yrs:"", guide:false, bcm:true, gen:"ABC",
  tags:["ABC"],
  pts:["A key leader of the Association of Biblical Counselors, with Shauna Van Dyke.","Named in the second generation’s growth: “the professional world: ABC and Jeremy Lelek.”"],
  why:"Represents the movement’s engagement with Christians working in professional and secular fields.",
  line:"Key ABC leader; the movement’s professional-world development"}
];
