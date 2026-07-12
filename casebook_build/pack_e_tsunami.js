// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"e_tsunami", title:"The Sable Point Wave", discipline:"Tsunami Science & Oceanography",
  teaser:"The sea drew back, then took the shore. A weapon beneath the waves? A freak swell out of nowhere? Or a warning network left to rust and a hazard waved away?", overclaimTag:"a blast beneath the sea", truthTag:"a neglected warning-buoy network",
  venue:"the Sable Point tsunami inquiry", agent:{name:"Investigator Ravi Enns", role:"Investigator's Notepad"},
  standingLabel:"Inquiry credibility", readingShort:"Pioneers", readingLabel:"Tsunami-Science Pioneers",
  dossierName:"TSUNAMI-SCIENCE PIONEERS", enterLabel:"Open the inquiry", subt:"A deduction game inside the Sable Point tsunami inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (a blast beneath the sea) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"chief", items:[
      {id:"chief", label:"Nadia Voss — tsunami warning-centre chief"},
      {id:"oceanographer", label:"The duty oceanographer"},
      {id:"portauthority", label:"The port authority director"} ]},
    where:{ title:"Where it culminates", truth:"office", items:[
      {id:"shore", label:"The Shore & Tide Stations"},
      {id:"watchfloor", label:"The Tsunami Warning Centre"},
      {id:"office", label:"The Warning Programme Office"} ]},
    what:{ title:"What is happening", truth:"neglected", items:[
      {id:"blast", label:"A blast or weapon beneath the sea"},
      {id:"freak", label:"A freak wave from nowhere — an act of God"},
      {id:"neglected", label:"A disabled buoy network & a downplayed hazard"} ]}
  },
  PLACES:{
    shore:{name:"The Shore & Tide Stations", xy:[140,90]},
    watchfloor:{name:"The Tsunami Warning Centre", xy:[330,240]},
    office:{name:"The Warning Programme Office", xy:[520,90]}
  },
  EDGES:[["shore","watchfloor"],["watchfloor","office"]],
  CHARACTERS:{
    buoytech:{ name:"Buoy Tech Sana", role:"Ocean-buoy technician", face:"🛟", badge:"S", legend:"the shore stations", hint:"Services the sea buoys; half the network had flatlined and stayed down." },
    watchstander:{ name:"The Watchstander", role:"Warning-centre watchstander", face:"🌊", badge:"W", legend:"the watch floor", hint:"Held the desk when the quake hit; the bulletin sat unissued." },
    clerk:{ name:"The Clerk", role:"Programme-office clerk", face:"🗂", badge:"C", legend:"the office", hint:"Keeps the maintenance logs — and the hazard study that was toned down." }
  },
  TOPICMAP:{
    shore:{ buoytech:["laplace","airy"], watchstander:["lamb","nansen"], clerk:["love","sverdrup"] },
    watchfloor:{ buoytech:["proudman","doodson"], watchstander:["shepard","ewing"], clerk:["cox","munk"] },
    office:{ buoytech:["vandorn","iida"], watchstander:["kajiura","wyrtki"], clerk:["ebernard","titov"] }
  },
  TOPICS:{
    // cell: Buoy Tech Sana @ The Shore & Tide Stations
    laplace:{ sci:"Pierre-Simon Laplace (1749-1827)", topic:"The dynamical theory of tides", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: Buoy Tech Sana @ The Shore & Tide Stations
    airy:{ sci:"George Biddell Airy (1801-1892)", topic:"Wave theory & the tides", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: The Watchstander @ The Shore & Tide Stations
    lamb:{ sci:"Horace Lamb (1849-1934)", topic:"Hydrodynamics & water waves", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: The Watchstander @ The Shore & Tide Stations
    nansen:{ sci:"Fridtjof Nansen (1861-1930)", topic:"Ocean currents & polar seas", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Shore & Tide Stations
    love:{ sci:"Augustus E. H. Love (1863-1940)", topic:"Elastic waves & Earth tides", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Shore & Tide Stations
    sverdrup:{ sci:"Harald Sverdrup (1888-1957)", topic:"Physical oceanography & wave forecasting", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: Buoy Tech Sana @ The Tsunami Warning Centre
    proudman:{ sci:"Joseph Proudman (1888-1975)", topic:"Dynamical oceanography & tides", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: Buoy Tech Sana @ The Tsunami Warning Centre
    doodson:{ sci:"Arthur Doodson (1890-1968)", topic:"Tidal prediction & storm surge", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The Watchstander @ The Tsunami Warning Centre
    shepard:{ sci:"Francis Parker Shepard (1897-1985)", topic:"Marine geology & tsunami deposits", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The Watchstander @ The Tsunami Warning Centre
    ewing:{ sci:"Maurice Ewing (1906-1974)", topic:"Marine seismology & tsunami sources", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Tsunami Warning Centre
    cox:{ sci:"Doak Cox (1917-2003)", topic:"Tsunami research & the Pacific warning system", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Tsunami Warning Centre
    munk:{ sci:"Walter Munk (1917-2019)", topic:"Ocean waves & their forecasting", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Buoy Tech Sana @ The Warning Programme Office
    vandorn:{ sci:"William Van Dorn (1919-2018)", topic:"Tsunami hydrodynamics & wave runup", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Buoy Tech Sana @ The Warning Programme Office
    iida:{ sci:"Kumizi Iida (tsunami seismologist)", topic:"Tsunami magnitude & catalogs", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The Watchstander @ The Warning Programme Office
    kajiura:{ sci:"Kinjiro Kajiura (tsunami hydrodynamicist)", topic:"Tsunami source & propagation", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The Watchstander @ The Warning Programme Office
    wyrtki:{ sci:"Klaus Wyrtki (1925-2013)", topic:"Sea level & the Pacific warning centre", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Warning Programme Office
    ebernard:{ sci:"Eddie Bernard (tsunami-warning oceanographer)", topic:"The DART deep-ocean buoy network", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Warning Programme Office
    titov:{ sci:"Vasily Titov (tsunami modeler)", topic:"Tsunami forecast modeling", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    buoytech:{ shore:"", watchfloor:"", office:"" },
    watchstander:{ shore:"", watchfloor:"", office:"" },
    clerk:{ shore:"", watchfloor:"", office:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"blast", dismissalWhat:"freak",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};