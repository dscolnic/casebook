// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"e_flood", title:"The Rossmere Flood", discipline:"Hydrology & Flood Science",
  teaser:"A wall of water took a canyon town in the dark. A dam blown open on purpose? A rain beyond any record? Or gauges gone silent and a flood map locked in a drawer?", overclaimTag:"sabotage of the dam", truthTag:"an ignored flood-gauge network",
  venue:"the Rossmere flood inquiry", agent:{name:"Inspector Tomasz Bey", role:"Investigator's Notepad"},
  standingLabel:"Inquiry credibility", readingShort:"Pioneers", readingLabel:"Hydrology Pioneers",
  dossierName:"HYDROLOGY PIONEERS", enterLabel:"Open the inquiry", subt:"A deduction game inside the Rossmere flood inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (sabotage of the dam) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"manager", items:[
      {id:"manager", label:"Elias Thorn — reservoir operations manager"},
      {id:"hydrologist", label:"The county hydrologist"},
      {id:"planner", label:"The floodplain planner"} ]},
    where:{ title:"Where it culminates", truth:"office", items:[
      {id:"gauges", label:"The Creek & Gauge Stations"},
      {id:"controlroom", label:"The Dam Control Room"},
      {id:"office", label:"The Water District Office"} ]},
    what:{ title:"What is happening", truth:"ignored", items:[
      {id:"sabotage", label:"The dam blown open by sabotage"},
      {id:"freak", label:"A thousand-year rain no one could plan for — an act of God"},
      {id:"ignored", label:"A silenced gauge network & a buried floodplain study"} ]}
  },
  PLACES:{
    gauges:{name:"The Creek & Gauge Stations", xy:[140,90]},
    controlroom:{name:"The Dam Control Room", xy:[330,240]},
    office:{name:"The Water District Office", xy:[520,90]}
  },
  EDGES:[["gauges","controlroom"],["controlroom","office"]],
  CHARACTERS:{
    gaugekeeper:{ name:"Gauge Keeper Wynn", role:"Stream-gauge keeper", face:"💧", badge:"W", legend:"the gauge stations", hint:"Reads the creek gauges; the upstream ones stopped reporting weeks back." },
    operator:{ name:"The Gate Operator", role:"Dam gate operator", face:"🎚", badge:"G", legend:"the control room", hint:"Worked the release gates; the order came late and came big." },
    clerk:{ name:"The Clerk", role:"Water-district clerk", face:"🗂", badge:"C", legend:"the office", hint:"Keeps the studies — including the flood map that was never released." }
  },
  TOPICMAP:{
    gauges:{ gaugekeeper:["dbernoulli","mulvaney"], operator:["kuichling","newell"], clerk:["sherman","hurst"] },
    controlroom:{ gaugekeeper:["bakhmeteff","keulegan"], operator:["snyder","langbein"], clerk:["white","leopold"] },
    office:{ gaugekeeper:["linsley","nash"], operator:["ippen","maddock"], clerk:["haeinstein","vanoni"] }
  },
  TOPICS:{
    // cell: Gauge Keeper Wynn @ The Creek & Gauge Stations
    dbernoulli:{ sci:"Daniel Bernoulli (1700-1782)", topic:"Hydrodynamics & Bernoulli's principle", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: Gauge Keeper Wynn @ The Creek & Gauge Stations
    mulvaney:{ sci:"Thomas Mulvaney (1822-1892)", topic:"The rational method for peak flow", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: The Gate Operator @ The Creek & Gauge Stations
    kuichling:{ sci:"Emil Kuichling (1848-1919)", topic:"Urban storm drainage & runoff", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: The Gate Operator @ The Creek & Gauge Stations
    newell:{ sci:"Frederick H. Newell (1862-1932)", topic:"Stream gauging & the hydrographic survey", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Creek & Gauge Stations
    sherman:{ sci:"LeRoy K. Sherman (1869-1954)", topic:"The unit hydrograph", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Creek & Gauge Stations
    hurst:{ sci:"Harold Edwin Hurst (1880-1978)", topic:"Long-term storage & flood records", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: Gauge Keeper Wynn @ The Dam Control Room
    bakhmeteff:{ sci:"Boris Bakhmeteff (1880-1951)", topic:"Open-channel hydraulics", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: Gauge Keeper Wynn @ The Dam Control Room
    keulegan:{ sci:"Garbis Keulegan (1890-1989)", topic:"Hydraulics & channel flow", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The Gate Operator @ The Dam Control Room
    snyder:{ sci:"Franklin F. Snyder (hydrologist)", topic:"The synthetic unit hydrograph", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The Gate Operator @ The Dam Control Room
    langbein:{ sci:"Walter B. Langbein (1907-1982)", topic:"Statistical hydrology & runoff", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Dam Control Room
    white:{ sci:"Gilbert F. White (1911-2006)", topic:"Floodplain management & flood risk", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Dam Control Room
    leopold:{ sci:"Luna Leopold (1915-2006)", topic:"River channels & fluvial geomorphology", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Gauge Keeper Wynn @ The Water District Office
    linsley:{ sci:"Ray K. Linsley (1917-1990)", topic:"Hydrologic forecasting", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Gauge Keeper Wynn @ The Water District Office
    nash:{ sci:"James E. Nash (1927-1998)", topic:"The instantaneous unit hydrograph", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The Gate Operator @ The Water District Office
    ippen:{ sci:"Arthur T. Ippen (1907-1974)", topic:"Hydraulics & flood routing", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The Gate Operator @ The Water District Office
    maddock:{ sci:"Thomas Maddock Jr. (hydrologist)", topic:"The hydraulic geometry of rivers", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Water District Office
    haeinstein:{ sci:"Hans Albert Einstein (1904-1973)", topic:"Sediment transport in rivers", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Water District Office
    vanoni:{ sci:"Vito Vanoni (1904-1999)", topic:"River sedimentation", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    gaugekeeper:{ gauges:"", controlroom:"", office:"" },
    operator:{ gauges:"", controlroom:"", office:"" },
    clerk:{ gauges:"", controlroom:"", office:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"sabotage", dismissalWhat:"freak",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};