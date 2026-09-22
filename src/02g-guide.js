/* ================================================================ midterm guide
   Mirrors the "Mid-Term Exam Guidance" handout item by item. "ask" is the
   handout's own wording; "short" is the one-breath answer from the lectures;
   "go" is where the full material lives ("topic/mode" and an optional anchor). */
var GUIDE = {
 format:["Multiple-choice","True/false","Matching","Two essay questions","One reflective question"],
 rules:[
  "You may use your notes and books during the exam.",
  "Collaboration with others is not permitted unless you have approved accommodations.",
  "You are not permitted to use AI in taking this exam.",
  "You will need to confirm that you completed the exam independently."],
 sections:[
  {h:"Key Figures in the Historical Context of the BCM",
   ask:"Be familiar with each individual’s contributions to the movement and their significance for BCM.",
   items:[
    {id:"g-adams",   t:"Jay Adams", go:"people/chart", a:"p-adams",
     short:"Founder of the modern movement. After Mowrer (1965) he wrote <i>Competent to Counsel</i> (1969) at Westminster, launching nouthetic counseling and putting Scripture, sin and responsibility at the center."},
    {id:"g-oden",    t:"Thomas Oden", not:true, go:"people/chart", a:"p-oden",
     short:"A former integrationist who, through Will Herberg, recovered the classic tradition: <i>Care of Souls in the Classic Tradition</i> (1984), with Gregory the Great as the model. A parallel witness, not BCM."},
    {id:"g-mowrer",  t:"O. Hobart Mowrer", not:true, go:"people/chart", a:"p-mowrer",
     short:"A secular moral therapist who challenged the dominant therapeutic models; his 1965 course sparked Adams’s rethinking."},
    {id:"g-bettler", t:"John Bettler", go:"people/chart", a:"p-bettler",
     short:"Early CCEF leader; the first-generation original who represented specialized pastoral counselors."},
    {id:"g-broger",  t:"John Broger", go:"people/chart", a:"p-broger",
     short:"The first-generation original who represented lay people, through the <i>Self-Confrontation</i> training."},
    {id:"g-welch",   t:"Ed Welch", go:"people/chart", a:"p-welch",
     short:"Second generation at CCEF; PhD in neuropsychology; known for the inner and outer person and issues of embodiment."},
    {id:"g-powlison",t:"David Powlison", go:"people/chart", a:"p-powlison",
     short:"Second generation at CCEF; deepened the movement — the heart and motives, suffering, rich biblical theology; “intentional helpful conversations.”"},
    {id:"g-higbee",  t:"Garrett Higbee", go:"people/chart", a:"p-higbee",
     short:"Soul care in the local church: the Continuum of Care, intensive counseling, Soul Care Consulting; a past BCC leader."},
    {id:"g-gregory", t:"Gregory the Great", not:true, go:"people/chart", a:"p-gregory",
     short:"Author of <i>The Book of Pastoral Rule</i> (b. c. 540): individualized, inner-and-outer, Christ-centered care. Oden’s model, not BCM."}]},
  {h:"Distinctions Among Biblical Counseling Organizations",
   ask:"Understand the broad differences and contributions of each organization to BCM.",
   items:[
    {id:"g-ccef", t:"CCEF", go:"orgs/chart", a:"o-ccef",
     short:"Counseling, training and thought leadership. Broadened and deepened the movement: the heart, suffering, embodiment. Home of Powlison and Welch."},
    {id:"g-acbc", t:"NANC / ACBC", go:"orgs/chart", a:"o-acbc",
     short:"The certifying body: NANC began it, ACBC continues it. A lay and pastoral generalist certifying agency."},
    {id:"g-abc",  t:"ABC", go:"orgs/chart", a:"o-abc",
     short:"Serves pastoral and lay counselors and Christians working in secular fields — the movement’s professional-world development."},
    {id:"g-bcc",  t:"BCC", go:"orgs/chart", a:"o-bcc",
     short:"A coalition, not a certifier: unity and dialogue across the movement, under a shared Confessional Statement."}]},
  {h:"Historical Context and Growth of BCM", ask:"",
   items:[
    {id:"g-gens", t:"Generations of Biblical Counseling", go:"history/gens",
     ask:"Be able to explain the distinguishing emphases of the 1st, 2nd, and 3rd generations, including both continuity and development across the generations.",
     short:"First: model to movement — responsibility, habit, put-off/put-on. Second: deeper anthropology — the heart, suffering, the body. Third: breadth, depth, collaboration and debate. The same core answers throughout."},
    {id:"g-shift", t:"Historical Shifts", go:"history/story",
     ask:"Explain the major shift in counseling that occurred in the mid-1800s and its impact on the field.",
     short:"From the mid-1800s (Darwin, 1859) a secular framework redefined who we are and what help is. Over about a century soul care moved from salvation to self-realization, and the church learned to refer people out."}]},
  {h:"Theological Distinctives Informing BCM", ask:"",
   items:[
    {id:"g-term", t:"The Term “Counseling”", go:"theology/notes", a:"theo-counseling",
     ask:"Discuss why the term “counseling” can be problematic and explore proposed ways the church can address this issue. Be familiar with key texts that support the church’s approach to counseling.",
     short:"It sounds like a professional service, so the church hands it off. Recover the Bible’s broad, one-another counsel (Gen 1–3; Col 3:16; Rom 15:14; Gal 6:1–2; Jas 5:16; Titus 2; 1 Pet 5:1–5) and a continuum of care."},
    {id:"g-suff", t:"Sufficiency of Scripture", go:"theology/notes", a:"theo-sufficiency",
     ask:"Explain the concept of the sufficiency of Scripture, including major categories of sufficiency.",
     short:"The Bible contains all we need to know God’s will and live a life pleasing to him (Lambert). Four categories: progressive, completed, formal, material. 2 Pet 1:3–4; 2 Tim 3:16–17."},
    {id:"g-human", t:"Biblical Framework of Humanity", go:"theology/notes", a:"theo-humanity",
     ask:"Describe major categories of humanity from a biblical perspective and how they should inform your counseling approach, including the inner and outer person and how these aspects of the whole person can influence one another.",
     short:"An inner person (mind, understanding, inner self, heart) and an outer person (the body) that influence each other (Welch). Care for the whole person, body and soul together."},
    {id:"g-grace", t:"Common Grace and Secular Material", go:"theology/notes", a:"theo-grace",
     ask:"Know the Scriptural support and categories for common grace. Be able to explain the basic paradigm for discerningly examining secular material.",
     short:"God’s goodness to all creation (Isa 28:23–29; Matt 5:45): moral, physical and intellectual provision. Weigh secular material at three levels: observation, interpretation, intervention."},
    {id:"g-prot", t:"Protectors and Explorers", go:"theology/notes", a:"theo-protect",
     ask:"Understand the concerns represented by both “protectors” and “explorers” and how these concerns relate to Scripture, common grace, and the use of knowledge from outside the Bible.",
     short:"Both hold Scripture supreme and sufficient. They differ on whether secular techniques known through common grace can be carefully redeemed — protectors guard against a borrowed worldview; explorers take common grace seriously."}]}
 ],
 prep:[
  "Review your class notes thoroughly.",
  "Reflect on the practical implications of the doctrines discussed.",
  "Organize your notes and materials in a way that will allow you to easily reference them during the exam."]
};
