// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"e_quake", title:"Nine Seconds to Cordera", discipline:"Seismology & Earthquake Science",
  teaser:"A city shook awake at dawn with no alarm and no seconds to run. A secret underground blast? A quake beyond all odds? Or a warning system quietly switched off?", overclaimTag:"a secret blast or weapon", truthTag:"a silenced early-warning network",
  venue:"the Cordera earthquake inquiry", agent:{name:"Investigator Mara Solveig", role:"Investigator's Notepad"},
  standingLabel:"Inquiry credibility", readingShort:"Pioneers", readingLabel:"Seismology Pioneers",
  dossierName:"SEISMOLOGY PIONEERS", enterLabel:"Open the inquiry", subt:"A deduction game inside the Cordera earthquake inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (a secret blast or weapon) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"director", items:[
      {id:"director", label:"Roan Vesk — seismic-network director"},
      {id:"seismologist", label:"The state seismologist"},
      {id:"engineer", label:"The building-code engineer"} ]},
    where:{ title:"Where it culminates", truth:"office", items:[
      {id:"fault", label:"The Fault Line & Sensor Sites"},
      {id:"warncenter", label:"The Alert Operations Centre"},
      {id:"office", label:"The Network's Budget Office"} ]},
    what:{ title:"What is happening", truth:"silenced", items:[
      {id:"blast", label:"A secret underground blast or weapon"},
      {id:"freak", label:"A freak quake beyond all odds — an act of God"},
      {id:"silenced", label:"A defunded sensor network & a buried risk map"} ]}
  },
  PLACES:{
    fault:{name:"The Fault Line & Sensor Sites", xy:[140,90]},
    warncenter:{name:"The Alert Operations Centre", xy:[330,240]},
    office:{name:"The Network's Budget Office", xy:[520,90]}
  },
  EDGES:[["fault","warncenter"],["warncenter","office"]],
  CHARACTERS:{
    fieldtech:{ name:"Field Tech Odile", role:"Seismic field technician", face:"📡", badge:"O", legend:"the fault sites", hint:"Services the sensors; logged the ones that went dark and were never repaired." },
    dutyofficer:{ name:"The Duty Officer", role:"Alert-centre duty officer", face:"🚨", badge:"D", legend:"the alert centre", hint:"Sat the desk that dawn; the alert was written but never sent." },
    clerk:{ name:"The Clerk", role:"Budget-office clerk", face:"🗂", badge:"C", legend:"the office", hint:"Keeps the funding files — and the risk map stamped and shelved." }
  },
  TOPICMAP:{
    fault:{ fieldtech:["mallet","milne"], dutyofficer:["wiechert","omori"], clerk:["reid","moho"] },
    warncenter:{ fieldtech:["gutenberg","jeffreys"], dutyofficer:["bullen","wadati"], clerk:["byerly","press"] },
    office:{ fieldtech:["kanamori","aki"], dutyofficer:["hanks","housner"], clerk:["cornell","mogi"] }
  },
  TOPICS:{
    // cell: Field Tech Odile @ The Fault Line & Sensor Sites
    mallet:{ sci:"Robert Mallet (1810-1881)", topic:"The founding of seismology", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: Field Tech Odile @ The Fault Line & Sensor Sites
    milne:{ sci:"John Milne (1850-1913)", topic:"The modern seismograph", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: The Duty Officer @ The Fault Line & Sensor Sites
    wiechert:{ sci:"Emil Wiechert (1861-1928)", topic:"The seismograph & Earth's interior", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: The Duty Officer @ The Fault Line & Sensor Sites
    omori:{ sci:"Fusakichi Omori (1868-1923)", topic:"Omori's law of aftershocks", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Fault Line & Sensor Sites
    reid:{ sci:"Harry Fielding Reid (1859-1944)", topic:"Elastic rebound & fault rupture", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Fault Line & Sensor Sites
    moho:{ sci:"Andrija Mohorovičić (1857-1936)", topic:"The crust-mantle boundary", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: Field Tech Odile @ The Alert Operations Centre
    gutenberg:{ sci:"Beno Gutenberg (1889-1960)", topic:"Earth's core & the magnitude scale", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: Field Tech Odile @ The Alert Operations Centre
    jeffreys:{ sci:"Harold Jeffreys (1891-1989)", topic:"Travel times & the liquid core", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The Duty Officer @ The Alert Operations Centre
    bullen:{ sci:"Keith Bullen (1906-1976)", topic:"The layered model of the Earth", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The Duty Officer @ The Alert Operations Centre
    wadati:{ sci:"Kiyoo Wadati (1902-1995)", topic:"Deep earthquakes & the dipping zone", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Alert Operations Centre
    byerly:{ sci:"Perry Byerly (1897-1978)", topic:"First motions & fault planes", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Alert Operations Centre
    press:{ sci:"Frank Press (1924-2020)", topic:"Surface waves & the deep Earth", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Field Tech Odile @ The Network's Budget Office
    kanamori:{ sci:"Hiroo Kanamori (b. 1936)", topic:"The moment magnitude scale", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Field Tech Odile @ The Network's Budget Office
    aki:{ sci:"Keiiti Aki (1930-2005)", topic:"Seismic moment & the earthquake source", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The Duty Officer @ The Network's Budget Office
    hanks:{ sci:"Thomas C. Hanks (b. 1944)", topic:"Strong ground motion & stress drop", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The Duty Officer @ The Network's Budget Office
    housner:{ sci:"George W. Housner (1910-2008)", topic:"Earthquake engineering & response spectra", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Network's Budget Office
    cornell:{ sci:"C. Allin Cornell (1938-2007)", topic:"Probabilistic seismic hazard", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Network's Budget Office
    mogi:{ sci:"Kiyoo Mogi (1929-2021)", topic:"Earthquake prediction & precursors", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    fieldtech:{ fault:"", warncenter:"", office:"" },
    dutyofficer:{ fault:"", warncenter:"", office:"" },
    clerk:{ fault:"", warncenter:"", office:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"blast", dismissalWhat:"freak",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};