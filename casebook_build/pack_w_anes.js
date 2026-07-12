// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"w_anes", title:"The Silent Theatre", discipline:"Anesthesiology & Patient Safety",
  teaser:"A healthy patient went under for routine surgery and never woke. A reckless anesthetist? A freak drug reaction? Or an alarm someone had already switched off?", overclaimTag:"a reckless anesthetist", truthTag:"a normalized monitoring gap",
  venue:"the Halden Surgical Center inquiry", agent:{name:"Investigator Nora Vance", role:"Investigator's Notepad"},
  standingLabel:"Inquiry credibility", readingShort:"Pioneers", readingLabel:"Anesthesia Pioneers",
  dossierName:"ANESTHESIA PIONEERS", enterLabel:"Open the inquiry", subt:"A deduction game inside the Halden Surgical Center inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (a reckless anesthetist) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"director", items:[
      {id:"anesth", label:"Dr. Payne — the anesthetist on the case"},
      {id:"director", label:"Lorne Halden — the surgical center's director"},
      {id:"rep", label:"The drug-supply rep"} ]},
    where:{ title:"Where it culminates", truth:"admin", items:[
      {id:"theatre", label:"The Operating Theatre"},
      {id:"drugroom", label:"The Drug Room & Vial Store"},
      {id:"admin", label:"The Center's Administration Office"} ]},
    what:{ title:"What is happening", truth:"monitoring", items:[
      {id:"overdose", label:"A reckless anesthetist who overdosed the patient"},
      {id:"reaction", label:"A rare, fatal drug reaction — an act of God"},
      {id:"monitoring", label:"A silenced alarm and a look-alike vial, normalized to save time"} ]}
  },
  PLACES:{
    theatre:{name:"The Operating Theatre", xy:[140,90]},
    drugroom:{name:"The Drug Room & Vial Store", xy:[330,240]},
    admin:{name:"The Center's Administration Office", xy:[520,90]}
  },
  EDGES:[["theatre","drugroom"],["drugroom","admin"]],
  CHARACTERS:{
    nurse:{ name:"Nurse Beale", role:"Circulating nurse", face:"💉", badge:"N", legend:"the theatre", hint:"Stood at the table all morning; heard the monitor's alarm muted before the first cut." },
    biotech:{ name:"The Biomed Tech", role:"Clinical engineer", face:"🔧", badge:"B", legend:"the drug room", hint:"Services the monitors and stocks the shelves; two drugs sat in near-identical vials side by side." },
    clerk:{ name:"The Clerk", role:"Records clerk", face:"🗂", badge:"C", legend:"the office", hint:"Keeps the service logs — and the standing order telling staff to keep the alarms quiet." }
  },
  TOPICMAP:{
    theatre:{ nurse:["ether","etherday"], biotech:["nitrous","chloroform"], clerk:["inhaler","spinal"] },
    drugroom:{ nurse:["depth","circuit"], biotech:["machine","intubation"], clerk:["laryngoscope","relaxant"] },
    admin:{ nurse:["apgar","mortality"], biotech:["bloodgas","oximetry"], clerk:["mishaps","apsf"] }
  },
  TOPICS:{
    // cell: Nurse Beale @ The Operating Theatre
    ether:{ sci:"Crawford Long (1815-1878)", topic:"Ether anesthesia", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: Nurse Beale @ The Operating Theatre
    etherday:{ sci:"William T.G. Morton (1819-1868)", topic:"The public ether demonstration", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: The Biomed Tech @ The Operating Theatre
    nitrous:{ sci:"Horace Wells (1815-1848)", topic:"Nitrous oxide", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: The Biomed Tech @ The Operating Theatre
    chloroform:{ sci:"James Young Simpson (1811-1870)", topic:"Chloroform anesthesia", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Operating Theatre
    inhaler:{ sci:"Joseph Clover (1825-1882)", topic:"The chloroform inhaler & patient safety", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Operating Theatre
    spinal:{ sci:"August Bier (1861-1949)", topic:"Spinal anesthesia", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: Nurse Beale @ The Drug Room & Vial Store
    depth:{ sci:"Arthur Guedel (1883-1956)", topic:"The stages & depth of anesthesia", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: Nurse Beale @ The Drug Room & Vial Store
    circuit:{ sci:"Ralph Waters (1883-1979)", topic:"Closed-circuit anesthesia & CO2 absorption", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The Biomed Tech @ The Drug Room & Vial Store
    machine:{ sci:"Elmer McKesson (1881-1935)", topic:"The anesthesia machine", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The Biomed Tech @ The Drug Room & Vial Store
    intubation:{ sci:"Ivan Magill (1888-1986)", topic:"Endotracheal intubation", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Drug Room & Vial Store
    laryngoscope:{ sci:"Robert Macintosh (1897-1989)", topic:"The laryngoscope", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Drug Room & Vial Store
    relaxant:{ sci:"Harold Griffith (1894-1985)", topic:"Curare & muscle relaxants", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Nurse Beale @ The Center's Administration Office
    apgar:{ sci:"Virginia Apgar (1909-1974)", topic:"Scoring the newborn's vital signs", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Nurse Beale @ The Center's Administration Office
    mortality:{ sci:"Henry Beecher (1904-1976)", topic:"Anesthesia mortality & research ethics", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The Biomed Tech @ The Center's Administration Office
    bloodgas:{ sci:"John Severinghaus (1922-2021)", topic:"The blood-gas electrode", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The Biomed Tech @ The Center's Administration Office
    oximetry:{ sci:"Takuo Aoyagi (1936-2020)", topic:"Pulse oximetry", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Center's Administration Office
    mishaps:{ sci:"Jeffrey Cooper (anesthesia-safety engineer)", topic:"Anesthesia mishaps & human factors", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Center's Administration Office
    apsf:{ sci:"Ellison Pierce (anesthesiologist, 1929-2011)", topic:"The anesthesia patient-safety movement", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    nurse:{ theatre:"", drugroom:"", admin:"" },
    biotech:{ theatre:"", drugroom:"", admin:"" },
    clerk:{ theatre:"", drugroom:"", admin:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"overdose", dismissalWhat:"reaction",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};