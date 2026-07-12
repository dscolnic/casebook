// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"c_fraud", title:"The Lindqvist Result", discipline:"Research Integrity & Scientific Method",
  teaser:"One lab announced the breakthrough of the decade — and no one else could reproduce it. A genius ahead of the field? A dead end best forgotten? Or a result that was manufactured?", overclaimTag:"the breakthrough of the decade", truthTag:"fabricated results",
  venue:"the Lindqvist Result inquiry", agent:{name:"Investigator Nora Vance", role:"Investigator's Notepad"},
  standingLabel:"Panel credibility", readingShort:"Skeptics", readingLabel:"Method & Research Integrity",
  dossierName:"METHOD & RESEARCH INTEGRITY", enterLabel:"Open the inquiry", subt:"A deduction game inside the Lindqvist Result inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (the breakthrough of the decade) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"fr_pi", items:[
      {id:"fr_pi", label:"Prof. Cassian Lund — the principal investigator"},
      {id:"fr_postdoc", label:"Dr. Ames — a postdoc co-author"},
      {id:"fr_director", label:"The institute director"} ]},
    where:{ title:"Where it culminates", truth:"fr_forensics", items:[
      {id:"fr_lab", label:"The Laboratory & Instrument Room"},
      {id:"fr_press", label:"The Journal & Press Office"},
      {id:"fr_forensics", label:"The Notebook & Image-Forensics Room"} ]},
    what:{ title:"What is happening", truth:"fr_fabrication", items:[
      {id:"fr_breakthrough", label:"The breakthrough of the decade"},
      {id:"fr_deadend", label:"An honest dead end — just science that failed"},
      {id:"fr_fabrication", label:"Fabricated figures & suppressed failed replications"} ]}
  },
  PLACES:{
    fr_lab:{name:"The Laboratory & Instrument Room", xy:[140,90]},
    fr_press:{name:"The Journal & Press Office", xy:[330,240]},
    fr_forensics:{name:"The Notebook & Image-Forensics Room", xy:[520,90]}
  },
  EDGES:[["fr_lab","fr_press"],["fr_press","fr_forensics"]],
  CHARACTERS:{
    fr_whistle:{ name:"Postdoc Iida", role:"Whistleblower postdoc", face:"🧑‍🔬", badge:"I", legend:"the laboratory", hint:"Tried for months to reproduce the result; the key runs never once worked." },
    fr_imaging:{ name:"Analyst Brede", role:"Image-forensics analyst", face:"🖥", badge:"B", legend:"the forensics room", hint:"Overlays the published figures; the same band appears in three 'different' experiments." },
    fr_investigator:{ name:"Auditor Kase", role:"Integrity investigator", face:"🗂", badge:"K", legend:"the press office", hint:"Holds the notebooks and reviewer files — including the replications quietly buried." }
  },
  TOPICMAP:{
    fr_lab:{ fr_whistle:["fr_bacon","fr_boyle"], fr_imaging:["fr_whewell","fr_babbage"], fr_investigator:["fr_popper","fr_merton"] },
    fr_press:{ fr_whistle:["fr_kuhn","fr_fleck"], fr_imaging:["fr_lakatos","fr_medawar"], fr_investigator:["fr_langmuir","fr_kohn"] },
    fr_forensics:{ fr_whistle:["fr_goodstein","fr_bik"], fr_imaging:["fr_schon","fr_hwang"], fr_investigator:["fr_darsee","fr_fanelli"] }
  },
  TOPICS:{
    // cell: Postdoc Iida @ The Laboratory & Instrument Room
    fr_bacon:{ sci:"Francis Bacon (1561–1626)", topic:"The inductive experimental method", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: Postdoc Iida @ The Laboratory & Instrument Room
    fr_boyle:{ sci:"Robert Boyle (1627–1691)", topic:"Reproducibility & witnessing experiments", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: Analyst Brede @ The Laboratory & Instrument Room
    fr_whewell:{ sci:"William Whewell (1794–1866)", topic:"Induction & the consilience of evidence", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: Analyst Brede @ The Laboratory & Instrument Room
    fr_babbage:{ sci:"Charles Babbage (1791–1871)", topic:"'Cooking, trimming & forging' of data", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: Auditor Kase @ The Laboratory & Instrument Room
    fr_popper:{ sci:"Karl Popper (1902–1994)", topic:"Falsifiability & conjectures", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: Auditor Kase @ The Laboratory & Instrument Room
    fr_merton:{ sci:"Robert K. Merton (1910–2003)", topic:"The norms of science & organized skepticism", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: Postdoc Iida @ The Journal & Press Office
    fr_kuhn:{ sci:"Thomas Kuhn (1922–1996)", topic:"Paradigms, anomalies & revolutions", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: Postdoc Iida @ The Journal & Press Office
    fr_fleck:{ sci:"Ludwik Fleck (1896–1961)", topic:"How a scientific fact is made", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: Analyst Brede @ The Journal & Press Office
    fr_lakatos:{ sci:"Imre Lakatos (1922–1974)", topic:"Degenerating research programmes", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: Analyst Brede @ The Journal & Press Office
    fr_medawar:{ sci:"Peter Medawar (1915–1987)", topic:"'Is the scientific paper a fraud?'", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: Auditor Kase @ The Journal & Press Office
    fr_langmuir:{ sci:"Irving Langmuir (1881–1957)", topic:"'Pathological science'", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: Auditor Kase @ The Journal & Press Office
    fr_kohn:{ sci:"Alexander Kohn (1919–1994)", topic:"The history of scientific fraud", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Postdoc Iida @ The Notebook & Image-Forensics Room
    fr_goodstein:{ sci:"David Goodstein (1939–2024)", topic:"'On Fact and Fraud'", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Postdoc Iida @ The Notebook & Image-Forensics Room
    fr_bik:{ sci:"Elisabeth Bik (image-integrity analyst)", topic:"Detecting duplicated figures", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: Analyst Brede @ The Notebook & Image-Forensics Room
    fr_schon:{ sci:"Jan Hendrik Schön (physicist, fabricated-breakthrough case)", topic:"How faked results collapse", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: Analyst Brede @ The Notebook & Image-Forensics Room
    fr_hwang:{ sci:"Hwang Woo-suk (biologist, fabricated stem-cell case)", topic:"Suppressed failed replications", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: Auditor Kase @ The Notebook & Image-Forensics Room
    fr_darsee:{ sci:"John Darsee (researcher, fabricated-data case)", topic:"Detecting invented data", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: Auditor Kase @ The Notebook & Image-Forensics Room
    fr_fanelli:{ sci:"Daniele Fanelli (meta-scientist, research misconduct)", topic:"How common is misconduct?", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    fr_whistle:{ fr_lab:"", fr_press:"", fr_forensics:"" },
    fr_imaging:{ fr_lab:"", fr_press:"", fr_forensics:"" },
    fr_investigator:{ fr_lab:"", fr_press:"", fr_forensics:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"fr_breakthrough", dismissalWhat:"fr_deadend",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};