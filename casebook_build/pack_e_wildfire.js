// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"e_wildfire", title:"The Pinehaven Fire", discipline:"Wildfire & Combustion Science",
  teaser:"A firestorm erased a mountain town in an afternoon. Arson on the wind? A blaze beyond anything nature had shown? Or fuel left to pile up and an evacuation held too long?", overclaimTag:"coordinated arson", truthTag:"deferred fuel management",
  venue:"the Pinehaven wildfire inquiry", agent:{name:"Investigator June Alaric", role:"Investigator's Notepad"},
  standingLabel:"Inquiry credibility", readingShort:"Pioneers", readingLabel:"Wildfire-Science Pioneers",
  dossierName:"WILDFIRE-SCIENCE PIONEERS", enterLabel:"Open the inquiry", subt:"A deduction game inside the Pinehaven wildfire inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (coordinated arson) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"chief", items:[
      {id:"chief", label:"Garrett Pyle — forest district fire chief"},
      {id:"fbehavior", label:"The fire-behavior analyst"},
      {id:"sheriff", label:"The county sheriff"} ]},
    where:{ title:"Where it culminates", truth:"office", items:[
      {id:"ridge", label:"The Ridge & Fuel Breaks"},
      {id:"firecamp", label:"The Incident Command Post"},
      {id:"office", label:"The Forest District Office"} ]},
    what:{ title:"What is happening", truth:"deferred", items:[
      {id:"arson", label:"A coordinated arson attack"},
      {id:"freak", label:"A freak firestorm nothing could stop — an act of God"},
      {id:"deferred", label:"Deferred fuel clearing & a delayed evacuation order"} ]}
  },
  PLACES:{
    ridge:{name:"The Ridge & Fuel Breaks", xy:[140,90]},
    firecamp:{name:"The Incident Command Post", xy:[330,240]},
    office:{name:"The Forest District Office", xy:[520,90]}
  },
  EDGES:[["ridge","firecamp"],["firecamp","office"]],
  CHARACTERS:{
    lookout:{ name:"Lookout Wren", role:"Fire lookout", face:"🔭", badge:"W", legend:"the ridge", hint:"Spotted the first smoke; watched the brush no one had cleared catch and run." },
    dispatcher:{ name:"The Dispatcher", role:"Incident dispatcher", face:"📻", badge:"D", legend:"the command post", hint:"Ran the radios; the evacuation call was held while the fire jumped the line." },
    clerk:{ name:"The Clerk", role:"District-office clerk", face:"🗂", badge:"C", legend:"the office", hint:"Keeps the burn plans — and the fuel-reduction work that was cut from the budget." }
  },
  TOPICMAP:{
    ridge:{ lookout:["zeldovich","blewis"], dispatcher:["emmons","gisborne"], clerk:["fons","byram"] },
    firecamp:{ lookout:["countryman","mcarthur"], dispatcher:["rothermel","vanwagner"], clerk:["biswell","stoddard"] },
    office:{ lookout:["pyne","cohen"], dispatcher:["fwilliams","drysdale"], clerk:["quintiere","babrauskas"] }
  },
  TOPICS:{
    // cell: Lookout Wren @ The Ridge & Fuel Breaks
    zeldovich:{ sci:"Yakov Zeldovich (1914-1987)", topic:"Flame propagation & combustion theory", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: Lookout Wren @ The Ridge & Fuel Breaks
    blewis:{ sci:"Bernard Lewis (1899-1993)", topic:"Flames, combustion & explosions", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: The Dispatcher @ The Ridge & Fuel Breaks
    emmons:{ sci:"Howard Emmons (1912-1998)", topic:"The physics of fire", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: The Dispatcher @ The Ridge & Fuel Breaks
    gisborne:{ sci:"Harry Gisborne (1893-1949)", topic:"Fire-danger measurement", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Ridge & Fuel Breaks
    fons:{ sci:"William Fons (fire scientist)", topic:"Modeling the spread of fire", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Ridge & Fuel Breaks
    byram:{ sci:"George Byram (1909-1996)", topic:"Fireline intensity & fire behavior", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: Lookout Wren @ The Incident Command Post
    countryman:{ sci:"Clive Countryman (fire scientist)", topic:"The fire environment & fire weather", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: Lookout Wren @ The Incident Command Post
    mcarthur:{ sci:"Alan McArthur (1923-1978)", topic:"The forest fire-danger meter", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The Dispatcher @ The Incident Command Post
    rothermel:{ sci:"Richard Rothermel (1929-2023)", topic:"The fire-spread model", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The Dispatcher @ The Incident Command Post
    vanwagner:{ sci:"Charles Van Wagner (1925-2004)", topic:"Crown fire & fire intensity", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Incident Command Post
    biswell:{ sci:"Harold Biswell (1905-1992)", topic:"Prescribed burning & fuel management", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Incident Command Post
    stoddard:{ sci:"Herbert Stoddard (1889-1970)", topic:"Fire ecology & controlled burns", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Lookout Wren @ The Forest District Office
    pyne:{ sci:"Stephen Pyne (b. 1949)", topic:"The history of wildfire", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Lookout Wren @ The Forest District Office
    cohen:{ sci:"Jack Cohen (fire scientist)", topic:"The home-ignition zone", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The Dispatcher @ The Forest District Office
    fwilliams:{ sci:"Forman Williams (b. 1934)", topic:"Combustion theory", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The Dispatcher @ The Forest District Office
    drysdale:{ sci:"Dougal Drysdale (fire scientist)", topic:"Fire dynamics", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Forest District Office
    quintiere:{ sci:"James Quintiere (fire scientist)", topic:"Flame spread & fire growth", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Forest District Office
    babrauskas:{ sci:"Vytenis Babrauskas (fire scientist)", topic:"Ignition & heat release", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    lookout:{ ridge:"", firecamp:"", office:"" },
    dispatcher:{ ridge:"", firecamp:"", office:"" },
    clerk:{ ridge:"", firecamp:"", office:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"arson", dismissalWhat:"freak",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};