// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"e_avalanche", title:"The Whitewall Slide", discipline:"Snow, Avalanche & Glacier Science",
  teaser:"A wall of snow buried a packed resort run at noon. A charge set off on purpose? A slide no one could have called? Or a snowpack watched, warned about, and skied anyway?", overclaimTag:"a deliberate blast", truthTag:"ignored snowpack warnings",
  venue:"the Whitewall avalanche inquiry", agent:{name:"Investigator Lena Harkness", role:"Investigator's Notepad"},
  standingLabel:"Inquiry credibility", readingShort:"Pioneers", readingLabel:"Snow & Avalanche Pioneers",
  dossierName:"SNOW & AVALANCHE PIONEERS", enterLabel:"Open the inquiry", subt:"A deduction game inside the Whitewall avalanche inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (a deliberate blast) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"manager", items:[
      {id:"manager", label:"Kurt Halden — resort operations manager"},
      {id:"forecaster", label:"The avalanche forecaster"},
      {id:"patrol", label:"The ski-patrol director"} ]},
    where:{ title:"Where it culminates", truth:"office", items:[
      {id:"slope", label:"The Slope & Start Zone"},
      {id:"patrolhut", label:"The Patrol & Forecast Hut"},
      {id:"office", label:"The Resort Management Office"} ]},
    what:{ title:"What is happening", truth:"kept", items:[
      {id:"blast", label:"A charge set off deliberately"},
      {id:"freak", label:"A freak slide beyond any warning — an act of God"},
      {id:"kept", label:"Ignored snowpack monitoring & a slope kept open"} ]}
  },
  PLACES:{
    slope:{name:"The Slope & Start Zone", xy:[140,90]},
    patrolhut:{name:"The Patrol & Forecast Hut", xy:[330,240]},
    office:{name:"The Resort Management Office", xy:[520,90]}
  },
  EDGES:[["slope","patrolhut"],["patrolhut","office"]],
  CHARACTERS:{
    patroller:{ name:"Patroller Sten", role:"Ski-patrol observer", face:"⛷", badge:"S", legend:"the start zone", hint:"Dug the snow pits; the weak layer was there and shouting for days." },
    snowforecaster:{ name:"The Snow Forecaster", role:"Avalanche forecaster", face:"🏔", badge:"F", legend:"the forecast hut", hint:"Wrote the hazard bulletins; the high rating was overruled to keep the run open." },
    clerk:{ name:"The Clerk", role:"Resort-office clerk", face:"🗂", badge:"C", legend:"the office", hint:"Keeps the closure logs — and the order that reopened the slope early." }
  },
  TOPICMAP:{
    slope:{ patroller:["agassiz","jdforbes"], snowforecaster:["tyndall","church"], clerk:["paulcke","seligman"] },
    patrolhut:{ patroller:["voellmy","atwater"], snowforecaster:["roch","bader"], clerk:["dequervain","nye"] },
    office:{ patroller:["weertman","lachapelle"], snowforecaster:["perla","schaerer"], clerk:["mcclung","colbeck"] }
  },
  TOPICS:{
    // cell: Patroller Sten @ The Slope & Start Zone
    agassiz:{ sci:"Louis Agassiz (1807-1873)", topic:"Glaciers & the ice age", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: Patroller Sten @ The Slope & Start Zone
    jdforbes:{ sci:"James David Forbes (1809-1868)", topic:"The viscous flow of glaciers", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: The Snow Forecaster @ The Slope & Start Zone
    tyndall:{ sci:"John Tyndall (1820-1893)", topic:"Glacier motion & regelation", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: The Snow Forecaster @ The Slope & Start Zone
    church:{ sci:"James E. Church (1869-1959)", topic:"Snow surveying & snowpack measurement", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Slope & Start Zone
    paulcke:{ sci:"Wilhelm Paulcke (1873-1949)", topic:"The science of avalanches", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Slope & Start Zone
    seligman:{ sci:"Gerald Seligman (1886-1973)", topic:"Snow structure & the ski field", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: Patroller Sten @ The Patrol & Forecast Hut
    voellmy:{ sci:"Adolf Voellmy (1902-1977)", topic:"Avalanche dynamics & runout", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: Patroller Sten @ The Patrol & Forecast Hut
    atwater:{ sci:"Montgomery Atwater (1904-1976)", topic:"Avalanche forecasting & control", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The Snow Forecaster @ The Patrol & Forecast Hut
    roch:{ sci:"André Roch (1906-2002)", topic:"Snow, avalanches & the slope", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The Snow Forecaster @ The Patrol & Forecast Hut
    bader:{ sci:"Henri Bader (1907-1998)", topic:"Snow physics & metamorphism", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Patrol & Forecast Hut
    dequervain:{ sci:"Marcel de Quervain (snow scientist)", topic:"Snow classification & avalanche release", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Patrol & Forecast Hut
    nye:{ sci:"John F. Nye (1923-2019)", topic:"The mechanics of glacier flow", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Patroller Sten @ The Resort Management Office
    weertman:{ sci:"Johannes Weertman (1925-2018)", topic:"Glacier sliding & ice flow", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Patroller Sten @ The Resort Management Office
    lachapelle:{ sci:"Edward LaChapelle (1926-2007)", topic:"Avalanche science & snow crystals", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The Snow Forecaster @ The Resort Management Office
    perla:{ sci:"Ronald Perla (avalanche scientist)", topic:"Snow mechanics & the avalanche handbook", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The Snow Forecaster @ The Resort Management Office
    schaerer:{ sci:"Peter Schaerer (avalanche scientist)", topic:"Avalanche dynamics & defense", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Resort Management Office
    mcclung:{ sci:"David McClung (avalanche scientist)", topic:"Snow-slab stability & forecasting", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Resort Management Office
    colbeck:{ sci:"Samuel Colbeck (snow scientist)", topic:"Snow metamorphism & wet snow", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    patroller:{ slope:"", patrolhut:"", office:"" },
    snowforecaster:{ slope:"", patrolhut:"", office:"" },
    clerk:{ slope:"", patrolhut:"", office:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"blast", dismissalWhat:"freak",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};