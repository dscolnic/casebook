// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"w_trial", title:"The Trial Data", discipline:"Clinical Trials & Biostatistics",
  teaser:"A blockbuster drug sailed through its trials, then patients began dying of its side effects. A crank whistleblower? Random noise? Or adverse-event data that was fabricated and buried?", overclaimTag:"a rogue trial investigator", truthTag:"suppressed adverse-event data",
  venue:"the Verazol drug-trial inquiry", agent:{name:"Investigator Sam Rourke", role:"Investigator's Notepad"},
  standingLabel:"Inquiry credibility", readingShort:"Pioneers", readingLabel:"Trial & Statistics Pioneers",
  dossierName:"CLINICAL-TRIAL PIONEERS", enterLabel:"Open the inquiry", subt:"A deduction game inside the Verazol drug-trial inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (a rogue trial investigator) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"sponsor", items:[
      {id:"investigator", label:"The lead trial investigator"},
      {id:"sponsor", label:"Sable — the sponsor's clinical-trials director"},
      {id:"monitor", label:"The trial-monitoring auditor"} ]},
    where:{ title:"Where it culminates", truth:"headoffice", items:[
      {id:"site", label:"The Trial Site & Clinic"},
      {id:"datacenter", label:"The Data-Management Center"},
      {id:"headoffice", label:"The Sponsor's Head Office"} ]},
    what:{ title:"What is happening", truth:"suppression", items:[
      {id:"fraudsite", label:"A rogue investigator who faked the results"},
      {id:"noise", label:"The deaths are unrelated — statistical noise"},
      {id:"suppression", label:"Adverse-event data fabricated and suppressed behind the approval"} ]}
  },
  PLACES:{
    site:{name:"The Trial Site & Clinic", xy:[140,90]},
    datacenter:{name:"The Data-Management Center", xy:[330,240]},
    headoffice:{name:"The Sponsor's Head Office", xy:[520,90]}
  },
  EDGES:[["site","datacenter"],["datacenter","headoffice"]],
  CHARACTERS:{
    trialnurse:{ name:"Trial Nurse Devi", role:"Research nurse", face:"💊", badge:"N", legend:"the clinic", hint:"Saw the patients; the serious side effects she reported never reached the file." },
    stat:{ name:"The Statistician", role:"Trial biostatistician", face:"📊", badge:"S", legend:"the data center", hint:"Runs the numbers; whole batches of adverse events were recoded as 'unrelated' before analysis." },
    clerk:{ name:"The Clerk", role:"Sponsor records clerk", face:"🗂", badge:"C", legend:"the office", hint:"Keeps the case-report forms — and the safety signal the sponsor sat on." }
  },
  TOPICMAP:{
    site:{ trialnurse:["scurvy","numerical"], stat:["ttest","randomization"], clerk:["confidence","hypothesis"] },
    datacenter:{ trialnurse:["doe","rct"], stat:["cohort","doubleblind"], clerk:["ebm","metaanalysis"] },
    headoffice:{ trialnurse:["consent","thalidomide"], stat:["clinepi","appraisal"], clerk:["consort","reliability"] }
  },
  TOPICS:{
    // cell: Trial Nurse Devi @ The Trial Site & Clinic
    scurvy:{ sci:"James Lind (1716-1794)", topic:"The first controlled trial", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: Trial Nurse Devi @ The Trial Site & Clinic
    numerical:{ sci:"Pierre-Charles-Alexandre Louis (1787-1872)", topic:"The numerical method", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: The Statistician @ The Trial Site & Clinic
    ttest:{ sci:"William Sealy Gosset — 'Student' (1876-1937)", topic:"Small samples & the t-test", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: The Statistician @ The Trial Site & Clinic
    randomization:{ sci:"Ronald A. Fisher (1890-1962)", topic:"Randomization & experimental design", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Trial Site & Clinic
    confidence:{ sci:"Jerzy Neyman (1894-1981)", topic:"Confidence intervals & hypothesis testing", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Trial Site & Clinic
    hypothesis:{ sci:"Egon Pearson (1895-1980)", topic:"Statistical hypothesis testing", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: Trial Nurse Devi @ The Data-Management Center
    doe:{ sci:"Frank Yates (1902-1994)", topic:"The design of experiments", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: Trial Nurse Devi @ The Data-Management Center
    rct:{ sci:"Austin Bradford Hill (1897-1991)", topic:"The randomized controlled trial", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The Statistician @ The Data-Management Center
    cohort:{ sci:"Richard Doll (1912-2005)", topic:"Cohort studies & causation", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The Statistician @ The Data-Management Center
    doubleblind:{ sci:"Harry Gold (1899-1972)", topic:"The double-blind trial", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Data-Management Center
    ebm:{ sci:"Archie Cochrane (1909-1988)", topic:"Evidence-based medicine", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Data-Management Center
    metaanalysis:{ sci:"Thomas Chalmers (1917-1995)", topic:"Meta-analysis of trials", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Trial Nurse Devi @ The Sponsor's Head Office
    consent:{ sci:"Louis Lasagna (1923-2003)", topic:"Trial ethics & informed consent", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Trial Nurse Devi @ The Sponsor's Head Office
    thalidomide:{ sci:"Frances Oldham Kelsey (1914-2015)", topic:"Thalidomide & adverse-event review", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The Statistician @ The Sponsor's Head Office
    clinepi:{ sci:"Alvan Feinstein (1925-2001)", topic:"Clinical epidemiology", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The Statistician @ The Sponsor's Head Office
    appraisal:{ sci:"David Sackett (1934-2015)", topic:"Critical appraisal of the evidence", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Sponsor's Head Office
    consort:{ sci:"Doug Altman (1948-2018)", topic:"Honest reporting of trials", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Sponsor's Head Office
    reliability:{ sci:"John Ioannidis (b. 1965)", topic:"The reliability of research findings", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    trialnurse:{ site:"", datacenter:"", headoffice:"" },
    stat:{ site:"", datacenter:"", headoffice:"" },
    clerk:{ site:"", datacenter:"", headoffice:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"fraudsite", dismissalWhat:"noise",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};