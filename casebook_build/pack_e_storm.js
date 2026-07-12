// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"e_storm", title:"The Halloway Landfall", discipline:"Meteorology & Storm Forecasting",
  teaser:"A killer storm came ashore on a coast that was told to stay. A weapon in the clouds? A freak of nature no one could foresee? Or a warning someone chose to soften?", overclaimTag:"weather as a weapon", truthTag:"a downgraded storm warning",
  venue:"the Halloway storm inquiry", agent:{name:"Investigator Cole Renard", role:"Investigator's Notepad"},
  standingLabel:"Inquiry credibility", readingShort:"Pioneers", readingLabel:"Meteorology Pioneers",
  dossierName:"METEOROLOGY PIONEERS", enterLabel:"Open the inquiry", subt:"A deduction game inside the Halloway storm inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (weather as a weapon) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"official", items:[
      {id:"official", label:"Delia Marsh — regional emergency-management chief"},
      {id:"forecaster", label:"The lead hurricane forecaster"},
      {id:"mayor", label:"The resort-town mayor"} ]},
    where:{ title:"Where it culminates", truth:"office", items:[
      {id:"coast", label:"The Coast & Tide Gauges"},
      {id:"forecastfloor", label:"The Hurricane Forecast Floor"},
      {id:"office", label:"The Emergency-Management Office"} ]},
    what:{ title:"What is happening", truth:"downgraded", items:[
      {id:"weapon", label:"Weather turned into a weapon"},
      {id:"freak", label:"A freak storm no forecast could catch — an act of God"},
      {id:"downgraded", label:"A warning downgraded to protect the season & the vote"} ]}
  },
  PLACES:{
    coast:{name:"The Coast & Tide Gauges", xy:[140,90]},
    forecastfloor:{name:"The Hurricane Forecast Floor", xy:[330,240]},
    office:{name:"The Emergency-Management Office", xy:[520,90]}
  },
  EDGES:[["coast","forecastfloor"],["forecastfloor","office"]],
  CHARACTERS:{
    spotter:{ name:"Storm Spotter Vane", role:"Volunteer storm spotter", face:"🌀", badge:"V", legend:"the coast", hint:"Called in the wind rising fast; the surge was already over the road." },
    radar:{ name:"The Radar Analyst", role:"Radar analyst", face:"📡", badge:"R", legend:"the forecast floor", hint:"Watched the eye close on the coast; the warning on screen was pulled back." },
    clerk:{ name:"The Clerk", role:"Emergency-office clerk", face:"🗂", badge:"C", legend:"the office", hint:"Keeps the call logs — and the order that softened the evacuation." }
  },
  TOPICMAP:{
    coast:{ spotter:["beaufort","coriolis"], radar:["ferrel","abbe"], clerk:["shaw","vbjerknes"] },
    forecastfloor:{ spotter:["bergeron","jbjerknes"], radar:["rossby","petterssen"], clerk:["wexler","rsimpson"] },
    office:{ spotter:["saffir","charney"], radar:["lorenz","fujita"], clerk:["jsimpson","atlas"] }
  },
  TOPICS:{
    // cell: Storm Spotter Vane @ The Coast & Tide Gauges
    beaufort:{ sci:"Francis Beaufort (1774-1857)", topic:"The wind-force scale", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: Storm Spotter Vane @ The Coast & Tide Gauges
    coriolis:{ sci:"Gaspard-Gustave de Coriolis (1792-1843)", topic:"The Coriolis effect", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: The Radar Analyst @ The Coast & Tide Gauges
    ferrel:{ sci:"William Ferrel (1817-1891)", topic:"The circulation of the atmosphere", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: The Radar Analyst @ The Coast & Tide Gauges
    abbe:{ sci:"Cleveland Abbe (1838-1916)", topic:"The first weather forecasts", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Coast & Tide Gauges
    shaw:{ sci:"Napier Shaw (1854-1945)", topic:"Dynamic meteorology & the upper air", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Coast & Tide Gauges
    vbjerknes:{ sci:"Vilhelm Bjerknes (1862-1951)", topic:"The equations of weather prediction", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: Storm Spotter Vane @ The Hurricane Forecast Floor
    bergeron:{ sci:"Tor Bergeron (1891-1977)", topic:"The Bergen school & precipitation", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: Storm Spotter Vane @ The Hurricane Forecast Floor
    jbjerknes:{ sci:"Jacob Bjerknes (1897-1975)", topic:"Fronts & the life of cyclones", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The Radar Analyst @ The Hurricane Forecast Floor
    rossby:{ sci:"Carl-Gustaf Rossby (1898-1957)", topic:"Rossby waves & the jet stream", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The Radar Analyst @ The Hurricane Forecast Floor
    petterssen:{ sci:"Sverre Petterssen (1898-1974)", topic:"Weather analysis & forecasting", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Hurricane Forecast Floor
    wexler:{ sci:"Harry Wexler (1911-1962)", topic:"Hurricanes & weather satellites", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Hurricane Forecast Floor
    rsimpson:{ sci:"Robert Simpson (1912-2014)", topic:"The Saffir-Simpson hurricane scale", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Storm Spotter Vane @ The Emergency-Management Office
    saffir:{ sci:"Herbert Saffir (1917-2007)", topic:"Hurricane wind & structural damage", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Storm Spotter Vane @ The Emergency-Management Office
    charney:{ sci:"Jule Charney (1917-1981)", topic:"Numerical weather prediction", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The Radar Analyst @ The Emergency-Management Office
    lorenz:{ sci:"Edward Lorenz (1917-2008)", topic:"Chaos & the limits of prediction", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The Radar Analyst @ The Emergency-Management Office
    fujita:{ sci:"Tetsuya Ted Fujita (1920-1998)", topic:"The tornado intensity scale", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Emergency-Management Office
    jsimpson:{ sci:"Joanne Simpson (1923-2010)", topic:"Hurricane structure & cloud towers", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Emergency-Management Office
    atlas:{ sci:"David Atlas (1924-2015)", topic:"Radar meteorology & storm detection", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    spotter:{ coast:"", forecastfloor:"", office:"" },
    radar:{ coast:"", forecastfloor:"", office:"" },
    clerk:{ coast:"", forecastfloor:"", office:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"weapon", dismissalWhat:"freak",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};