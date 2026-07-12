// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"w_water", title:"The Tap", discipline:"Water Supply & Environmental Health",
  teaser:"A city switched its water source and children started turning up sick. Old pipes bursting? A scare over nothing? Or a corrosion safeguard skipped and the warnings buried?", overclaimTag:"a rogue plant operator", truthTag:"skipped corrosion control",
  venue:"the Rushton water inquiry", agent:{name:"Investigator Faye Orwell", role:"Investigator's Notepad"},
  standingLabel:"Inquiry credibility", readingShort:"Pioneers", readingLabel:"Water Pioneers",
  dossierName:"WATER & PUBLIC-HEALTH PIONEERS", enterLabel:"Open the inquiry", subt:"A deduction game inside the Rushton water inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (a rogue plant operator) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"official", items:[
      {id:"operator", label:"The water-plant operator"},
      {id:"official", label:"Merrick — the city's emergency manager"},
      {id:"regulator", label:"The state environmental regulator"} ]},
    where:{ title:"Where it culminates", truth:"cityhall", items:[
      {id:"plant", label:"The Treatment Plant & Intake"},
      {id:"lab", label:"The Water-Testing Lab"},
      {id:"cityhall", label:"The City Manager's Office"} ]},
    what:{ title:"What is happening", truth:"corrosion", items:[
      {id:"tampering", label:"A rogue operator poisoning the supply"},
      {id:"safe", label:"Nothing wrong — the water meets the rules"},
      {id:"corrosion", label:"Corrosion control skipped and the warnings suppressed"} ]}
  },
  PLACES:{
    plant:{name:"The Treatment Plant & Intake", xy:[140,90]},
    lab:{name:"The Water-Testing Lab", xy:[330,240]},
    cityhall:{name:"The City Manager's Office", xy:[520,90]}
  },
  EDGES:[["plant","lab"],["lab","cityhall"]],
  CHARACTERS:{
    operator2:{ name:"Operator Nunez", role:"Treatment-plant operator", face:"🚰", badge:"O", legend:"the plant", hint:"Runs the intake; was told to skip the anti-corrosion dosing to cut costs." },
    chemist:{ name:"The Water Chemist", role:"Water-testing chemist", face:"🧪", badge:"W", legend:"the lab", hint:"Runs the samples; the lead numbers climbed and the high readings were dropped from the average." },
    clerk:{ name:"The Clerk", role:"City-hall records clerk", face:"🗂", badge:"C", legend:"the office", hint:"Keeps the correspondence — the resident complaints and the memo that dismissed them." }
  },
  TOPICMAP:{
    plant:{ operator2:["wateranalysis","sanitaryscience"], chemist:["sanitarychem","sewers"], clerk:["filtration","chlorination"] },
    lab:{ operator2:["chlorinecontrol","sanitaryeng"], chemist:["wastewater","corrosionchem"], clerk:["corrosioncontrol","tetraethyl"] },
    cityhall:{ operator2:["leadthreshold","industrial"], chemist:["envlead","leadkids"], clerk:["flintcorrosion","bloodlead"] }
  },
  TOPICS:{
    // cell: Operator Nunez @ The Treatment Plant & Intake
    wateranalysis:{ sci:"Edward Frankland (1825-1899)", topic:"Water analysis & purity", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: Operator Nunez @ The Treatment Plant & Intake
    sanitaryscience:{ sci:"William Sedgwick (1855-1921)", topic:"Sanitary science & waterborne disease", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: The Water Chemist @ The Treatment Plant & Intake
    sanitarychem:{ sci:"Ellen Swallow Richards (1842-1911)", topic:"Sanitary chemistry & water quality", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: The Water Chemist @ The Treatment Plant & Intake
    sewers:{ sci:"Joseph Bazalgette (1819-1891)", topic:"Sewers & urban sanitation", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Treatment Plant & Intake
    filtration:{ sci:"George Warren Fuller (1868-1934)", topic:"Water filtration & treatment", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Treatment Plant & Intake
    chlorination:{ sci:"John L. Leal (1858-1914)", topic:"Chlorination of drinking water", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: Operator Nunez @ The Water-Testing Lab
    chlorinecontrol:{ sci:"Abel Wolman (1892-1989)", topic:"Controlled water chlorination", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: Operator Nunez @ The Water-Testing Lab
    sanitaryeng:{ sci:"Gordon Maskew Fair (1894-1970)", topic:"Sanitary engineering", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The Water Chemist @ The Water-Testing Lab
    wastewater:{ sci:"Karl Imhoff (1876-1965)", topic:"Wastewater treatment", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The Water Chemist @ The Water-Testing Lab
    corrosionchem:{ sci:"Marcel Pourbaix (1904-1998)", topic:"Corrosion chemistry & passivation", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Water-Testing Lab
    corrosioncontrol:{ sci:"Herbert Uhlig (1907-1993)", topic:"Corrosion control", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Water-Testing Lab
    tetraethyl:{ sci:"Thomas Midgley Jr. (1889-1944)", topic:"Tetraethyl lead", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Operator Nunez @ The City Manager's Office
    leadthreshold:{ sci:"Robert Kehoe (1893-1992)", topic:"The industry threshold for lead", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Operator Nunez @ The City Manager's Office
    industrial:{ sci:"Alice Hamilton (1869-1970)", topic:"Industrial lead poisoning", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The Water Chemist @ The City Manager's Office
    envlead:{ sci:"Clair Patterson (1922-1995)", topic:"Environmental lead contamination", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The Water Chemist @ The City Manager's Office
    leadkids:{ sci:"Herbert Needleman (1927-2017)", topic:"Lead & children's development", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The City Manager's Office
    flintcorrosion:{ sci:"Marc Edwards (environmental engineer, b. 1964)", topic:"Corrosion control & the Flint crisis", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The City Manager's Office
    bloodlead:{ sci:"Mona Hanna-Attisha (pediatrician, b. 1976)", topic:"Blood-lead in children & the alarm", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    operator2:{ plant:"", lab:"", cityhall:"" },
    chemist:{ plant:"", lab:"", cityhall:"" },
    clerk:{ plant:"", lab:"", cityhall:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"tampering", dismissalWhat:"safe",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};