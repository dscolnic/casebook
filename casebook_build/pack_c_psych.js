// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"c_psych", title:"The Mimicry Effect", discipline:"Psychology & Research Method",
  teaser:"A dazzling result took the field by storm — then no one could repeat it. A brilliant discovery? A fluke worth forgetting? Or numbers that never came from real people?", overclaimTag:"a landmark discovery", truthTag:"fabricated data",
  venue:"the Mimicry Effect inquiry", agent:{name:"Investigator Dana Pell", role:"Investigator's Notepad"},
  standingLabel:"Panel credibility", readingShort:"Psychologists", readingLabel:"Psychology & Method",
  dossierName:"PSYCHOLOGY & METHOD", enterLabel:"Open the inquiry", subt:"A deduction game inside the Mimicry Effect inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (a landmark discovery) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"ps_prof", items:[
      {id:"ps_prof", label:"Prof. Adrian Voss — the celebrated lead author"},
      {id:"ps_junior", label:"Dr. Kline — a junior co-author"},
      {id:"ps_editor", label:"The journal editor"} ]},
    where:{ title:"Where it culminates", truth:"ps_dataroom", items:[
      {id:"ps_lab", label:"The Psychology Laboratory"},
      {id:"ps_journal", label:"The Journal's Editorial Office"},
      {id:"ps_dataroom", label:"The Raw-Data Archive"} ]},
    what:{ title:"What is happening", truth:"ps_fabricated", items:[
      {id:"ps_landmark", label:"A landmark, field-defining effect"},
      {id:"ps_noise", label:"A fragile fluke — just noise, best forgotten"},
      {id:"ps_fabricated", label:"Fabricated data behind the famous result"} ]}
  },
  PLACES:{
    ps_lab:{name:"The Psychology Laboratory", xy:[140,90]},
    ps_journal:{name:"The Journal's Editorial Office", xy:[330,240]},
    ps_dataroom:{name:"The Raw-Data Archive", xy:[520,90]}
  },
  EDGES:[["ps_lab","ps_journal"],["ps_journal","ps_dataroom"]],
  CHARACTERS:{
    ps_grad:{ name:"Grad Student Rhee", role:"Doctoral student", face:"🎓", badge:"R", legend:"the laboratory", hint:"Ran the follow-up studies; the 'raw' data are too clean to have come from real subjects." },
    ps_auditor:{ name:"Data Auditor Sol", role:"Statistical auditor", face:"📊", badge:"S", legend:"the data archive", hint:"Re-checks the numbers; the summary statistics are impossible for the sample sizes claimed." },
    ps_replicator:{ name:"Dr. Ives", role:"Replication-team lead", face:"🔁", badge:"I", legend:"the editorial office", hint:"Led the multi-lab replication; the effect vanishes every time it is run honestly." }
  },
  TOPICMAP:{
    ps_lab:{ ps_grad:["ps_wundt","ps_james"], ps_auditor:["ps_galton","ps_pearson"], ps_replicator:["ps_fisher","ps_cohen"] },
    ps_journal:{ ps_grad:["ps_meehl","ps_kahneman"], ps_auditor:["ps_tversky","ps_rosenthal"], ps_replicator:["ps_ioannidis","ps_nosek"] },
    ps_dataroom:{ ps_grad:["ps_simonsohn","ps_gigerenzer"], ps_auditor:["ps_greenwald","ps_bem"], ps_replicator:["ps_stapel","ps_hauser"] }
  },
  TOPICS:{
    // cell: Grad Student Rhee @ The Psychology Laboratory
    ps_wundt:{ sci:"Wilhelm Wundt (1832–1920)", topic:"The first experimental psychology laboratory", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: Grad Student Rhee @ The Psychology Laboratory
    ps_james:{ sci:"William James (1842–1910)", topic:"The principles of psychology", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: Data Auditor Sol @ The Psychology Laboratory
    ps_galton:{ sci:"Francis Galton (1822–1911)", topic:"Correlation & the measurement of mind", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: Data Auditor Sol @ The Psychology Laboratory
    ps_pearson:{ sci:"Karl Pearson (1857–1936)", topic:"Correlation & statistical method", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: Dr. Ives @ The Psychology Laboratory
    ps_fisher:{ sci:"Ronald A. Fisher (1890–1962)", topic:"Significance testing & experimental design", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: Dr. Ives @ The Psychology Laboratory
    ps_cohen:{ sci:"Jacob Cohen (1923–1998)", topic:"Statistical power & effect size", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: Grad Student Rhee @ The Journal's Editorial Office
    ps_meehl:{ sci:"Paul Meehl (1920–2003)", topic:"Clinical versus statistical prediction", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: Grad Student Rhee @ The Journal's Editorial Office
    ps_kahneman:{ sci:"Daniel Kahneman (1934–2024)", topic:"Heuristics, biases & a warning on reliability", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: Data Auditor Sol @ The Journal's Editorial Office
    ps_tversky:{ sci:"Amos Tversky (1937–1996)", topic:"Judgment under uncertainty", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: Data Auditor Sol @ The Journal's Editorial Office
    ps_rosenthal:{ sci:"Robert Rosenthal (1933–2024)", topic:"Experimenter effects & the file-drawer problem", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: Dr. Ives @ The Journal's Editorial Office
    ps_ioannidis:{ sci:"John Ioannidis (b. 1965)", topic:"Why most published findings may be false", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: Dr. Ives @ The Journal's Editorial Office
    ps_nosek:{ sci:"Brian Nosek (b. 1973)", topic:"The reproducibility project & open science", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Grad Student Rhee @ The Raw-Data Archive
    ps_simonsohn:{ sci:"Uri Simonsohn (behavioral scientist, p-curve method)", topic:"Detecting p-hacking in results", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Grad Student Rhee @ The Raw-Data Archive
    ps_gigerenzer:{ sci:"Gerd Gigerenzer (b. 1947)", topic:"The misuse of null-hypothesis testing", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: Data Auditor Sol @ The Raw-Data Archive
    ps_greenwald:{ sci:"Anthony Greenwald (b. 1939)", topic:"Implicit measures & the replication debate", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: Data Auditor Sol @ The Raw-Data Archive
    ps_bem:{ sci:"Daryl Bem (b. 1938)", topic:"The 'feeling the future' study that sparked the crisis", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: Dr. Ives @ The Raw-Data Archive
    ps_stapel:{ sci:"Diederik Stapel (social psychologist, fabricated-data case)", topic:"How fabricated datasets were exposed", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: Dr. Ives @ The Raw-Data Archive
    ps_hauser:{ sci:"Marc Hauser (cognitive scientist, misconduct case)", topic:"Data integrity in the lab", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    ps_grad:{ ps_lab:"", ps_journal:"", ps_dataroom:"" },
    ps_auditor:{ ps_lab:"", ps_journal:"", ps_dataroom:"" },
    ps_replicator:{ ps_lab:"", ps_journal:"", ps_dataroom:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"ps_landmark", dismissalWhat:"ps_noise",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};