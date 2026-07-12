// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"m_tailings", title:"The Serra Verde Tailings Dam", discipline:"Slope Stability & Soil Liquefaction",
  teaser:"A mine's tailings dam liquefied in seconds and buried the works below. Was it a blast or an earthquake? A freak downpour beyond any design? Or gauges that were read and ignored?", overclaimTag:"a blast or an earthquake", truthTag:"liquefaction the piezometers foretold",
  venue:"the Serra Verde tailings inquiry", agent:{name:"Inspector Rui Alvares", role:"Investigator's Notepad"},
  standingLabel:"Engineering credibility", readingShort:"Pioneers", readingLabel:"Slope & Soil Pioneers",
  dossierName:"SLOPE-STABILITY & SOIL PIONEERS", enterLabel:"Open the inquiry", subt:"A deduction game inside the Serra Verde tailings inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (a blast or an earthquake) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"tl_miningco", items:[
      {id:"tl_miningco", label:"Bruna Teixeira — mine operations director"},
      {id:"tl_engineer", label:"The dam-of-record engineer"},
      {id:"tl_auditor", label:"The independent dam auditor"} ]},
    where:{ title:"Where it culminates", truth:"tl_office", items:[
      {id:"tl_crest", label:"The Raised Dam Crest"},
      {id:"tl_toe", label:"The Toe & Piezometers"},
      {id:"tl_office", label:"The Mine's Operations Office"} ]},
    what:{ title:"What is happening", truth:"tl_liquefaction", items:[
      {id:"tl_quake", label:"A blast or an earthquake shaking the dam"},
      {id:"tl_rain", label:"A freak downpour overtopping the dam — an act of God"},
      {id:"tl_liquefaction", label:"Static liquefaction of a raised dam its piezometers foretold"} ]}
  },
  PLACES:{
    tl_crest:{name:"The Raised Dam Crest", xy:[140,90]},
    tl_toe:{name:"The Toe & Piezometers", xy:[330,240]},
    tl_office:{name:"The Mine's Operations Office", xy:[520,90]}
  },
  EDGES:[["tl_crest","tl_toe"],["tl_toe","tl_office"]],
  CHARACTERS:{
    tl_walker:{ name:"Dam-Walker Ana Reis", role:"Tailings-dam walker", face:"💧", badge:"A", legend:"the toe", hint:"Walks the toe daily; saw wet seeps and bulging the reports called normal." },
    tl_reader:{ name:"The Instrument Reader", role:"Geotechnical-instrument reader", face:"📟", badge:"I", legend:"the crest", hint:"Downloads the piezometers; the pore-pressures were red for weeks." },
    tl_clerk:{ name:"The Clerk", role:"Operations records clerk", face:"🗂", badge:"C", legend:"the office", hint:"Keeps the safety file — and the raise approved despite the auditor's warning." }
  },
  TOPICMAP:{
    tl_crest:{ tl_walker:["tl_fellenius","tl_bishop"], tl_reader:["tl_janbu","tl_morgenstern"], tl_clerk:["tl_bjerrum","tl_seed"] },
    tl_toe:{ tl_walker:["tl_ishihara","tl_castro"], tl_reader:["tl_poulos","tl_biot"], tl_clerk:["tl_roscoe","tl_schofield"] },
    tl_office:{ tl_walker:["tl_wroth","tl_blight"], tl_reader:["tl_wilson","tl_whitman"], tl_clerk:["tl_sowers","tl_hoover"] }
  },
  TOPICS:{
    // cell: Dam-Walker Ana Reis @ The Raised Dam Crest
    tl_fellenius:{ sci:"Wolmar Fellenius (1876-1957)", topic:"The slip-circle method", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: Dam-Walker Ana Reis @ The Raised Dam Crest
    tl_bishop:{ sci:"Alec W. Bishop (1920-1988)", topic:"The method of slices & slope stability", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: The Instrument Reader @ The Raised Dam Crest
    tl_janbu:{ sci:"Nilmar Janbu (1921-2013)", topic:"Generalized slope-stability analysis", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: The Instrument Reader @ The Raised Dam Crest
    tl_morgenstern:{ sci:"Norbert R. Morgenstern (b. 1935)", topic:"Slope stability & tailings-dam safety", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Raised Dam Crest
    tl_bjerrum:{ sci:"Laurits Bjerrum (1918-1973)", topic:"Soft-clay strength & landslides", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Raised Dam Crest
    tl_seed:{ sci:"Harry Bolton Seed (1922-1989)", topic:"Cyclic loading & liquefaction", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: Dam-Walker Ana Reis @ The Toe & Piezometers
    tl_ishihara:{ sci:"Kenji Ishihara (b. 1934)", topic:"The liquefaction of sands", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: Dam-Walker Ana Reis @ The Toe & Piezometers
    tl_castro:{ sci:"Gonzalo Castro (static-liquefaction researcher)", topic:"Steady-state & static liquefaction", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The Instrument Reader @ The Toe & Piezometers
    tl_poulos:{ sci:"Steve J. Poulos (steady-state-strength researcher)", topic:"The steady-state strength line", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The Instrument Reader @ The Toe & Piezometers
    tl_biot:{ sci:"Maurice A. Biot (1905-1985)", topic:"Poroelasticity & pore pressure", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Toe & Piezometers
    tl_roscoe:{ sci:"Kenneth H. Roscoe (1914-1970)", topic:"Critical-state soil mechanics", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Toe & Piezometers
    tl_schofield:{ sci:"Andrew N. Schofield (b. 1926)", topic:"Critical state & centrifuge modelling", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Dam-Walker Ana Reis @ The Mine's Operations Office
    tl_wroth:{ sci:"Peter Wroth (1929-1991)", topic:"Critical-state soil behaviour", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Dam-Walker Ana Reis @ The Mine's Operations Office
    tl_blight:{ sci:"Geoffrey E. Blight (tailings-dam researcher)", topic:"The mechanics of tailings dams", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The Instrument Reader @ The Mine's Operations Office
    tl_wilson:{ sci:"Stanley D. Wilson (geotechnical-instrumentation pioneer)", topic:"The piezometer & slope inclinometer", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The Instrument Reader @ The Mine's Operations Office
    tl_whitman:{ sci:"Robert V. Whitman (1928-2012)", topic:"Geotechnical risk & reliability", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Mine's Operations Office
    tl_sowers:{ sci:"George F. Sowers (1921-1996)", topic:"Embankment & foundation failures", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Mine's Operations Office
    tl_hoover:{ sci:"Herbert Hoover (1874-1964)", topic:"Mining engineering & ore extraction", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    tl_walker:{ tl_crest:"", tl_toe:"", tl_office:"" },
    tl_reader:{ tl_crest:"", tl_toe:"", tl_office:"" },
    tl_clerk:{ tl_crest:"", tl_toe:"", tl_office:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"tl_quake", dismissalWhat:"tl_rain",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};