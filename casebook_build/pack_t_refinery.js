// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"t_refinery", title:"The Halden Refinery Fire", discipline:"Process Safety & Combustion Engineering",
  teaser:"A refinery unit erupted in a fireball at dawn. An attack on the plant? A freak spark? Or a safety system quietly switched off?", overclaimTag:"sabotage or an attack", truthTag:"a disabled safety system & ignored corrosion",
  venue:"the Halden refinery inquiry", agent:{name:"Investigator Cara Mendel", role:"Investigator's Notepad"},
  standingLabel:"Inquiry credibility", readingShort:"Pioneers", readingLabel:"Combustion & Corrosion Pioneers",
  dossierName:"COMBUSTION & CORROSION PIONEERS", enterLabel:"Open the inquiry", subt:"A deduction game inside the Halden refinery inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (sabotage or an attack) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"operator", items:[
      {id:"operator", label:"Garon Voss — refinery operator"},
      {id:"superintendent", label:"The unit superintendent"},
      {id:"inspector", label:"The state safety inspector"} ]},
    where:{ title:"Where it culminates", truth:"office", items:[
      {id:"units", label:"The Process Units & Flare"},
      {id:"control", label:"The Control Room"},
      {id:"office", label:"The Operator's Corporate Office"} ]},
    what:{ title:"What is happening", truth:"neglect", items:[
      {id:"attack", label:"Sabotage or a deliberate blast"},
      {id:"freak", label:"A freak ignition — an act of God"},
      {id:"neglect", label:"A disabled relief/flare system & ignored corrosion"} ]}
  },
  PLACES:{
    units:{name:"The Process Units & Flare", xy:[140,90]},
    control:{name:"The Control Room", xy:[330,240]},
    office:{name:"The Operator's Corporate Office", xy:[520,90]}
  },
  EDGES:[["units","control"],["control","office"]],
  CHARACTERS:{
    unitop:{ name:"Operator Delia Fenn", role:"Unit operator", face:"🔥", badge:"U", legend:"the process units", hint:"Ran the tower; logged the relief valve that was carded out of service." },
    boardop:{ name:"The Board Operator", role:"Control-room operator", face:"🎛", badge:"B", legend:"the control room", hint:"Watched the pressure climb with the flare down and no way to vent." },
    clerk:{ name:"The Clerk", role:"Records clerk", face:"🗂", badge:"C", legend:"the office", hint:"Keeps the corrosion reports and the deferral memo that shelved the fix." }
  },
  TOPICMAP:{
    units:{ unitop:["rf_carnot","rf_clausius"], boardop:["rf_joule","rf_boltzmann"], clerk:["rf_clapeyron","rf_hess"] },
    control:{ unitop:["rf_berthelot","rf_bunsen"], boardop:["rf_davy","rf_lewis"], clerk:["rf_zeldovich","rf_fk"] },
    office:{ unitop:["rf_pourbaix","rf_uhlig"], boardop:["rf_shukhov","rf_burton"], clerk:["rf_houdry","rf_papin"] }
  },
  TOPICS:{
    // cell: Operator Delia Fenn @ The Process Units & Flare
    rf_carnot:{ sci:"Sadi Carnot (1796-1832)", topic:"Heat engines & the second law", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: Operator Delia Fenn @ The Process Units & Flare
    rf_clausius:{ sci:"Rudolf Clausius (1822-1888)", topic:"Entropy & the second law", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: The Board Operator @ The Process Units & Flare
    rf_joule:{ sci:"James Prescott Joule (1818-1889)", topic:"The mechanical equivalent of heat", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: The Board Operator @ The Process Units & Flare
    rf_boltzmann:{ sci:"Ludwig Boltzmann (1844-1906)", topic:"Statistical thermodynamics & heat", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Process Units & Flare
    rf_clapeyron:{ sci:"Benoit Clapeyron (1799-1864)", topic:"Vapor pressure & the Clausius-Clapeyron relation", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Process Units & Flare
    rf_hess:{ sci:"Germain Hess (1802-1850)", topic:"Thermochemistry & heats of reaction", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: Operator Delia Fenn @ The Control Room
    rf_berthelot:{ sci:"Marcellin Berthelot (1827-1907)", topic:"Thermochemistry & explosives", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: Operator Delia Fenn @ The Control Room
    rf_bunsen:{ sci:"Robert Bunsen (1811-1899)", topic:"The burner & flame chemistry", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The Board Operator @ The Control Room
    rf_davy:{ sci:"Humphry Davy (1778-1829)", topic:"The safety lamp & flame arrest", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The Board Operator @ The Control Room
    rf_lewis:{ sci:"Bernard Lewis (1899-1993)", topic:"Combustion, flames & explosions", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Control Room
    rf_zeldovich:{ sci:"Yakov Zeldovich (1914-1987)", topic:"Detonation & flame theory", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Control Room
    rf_fk:{ sci:"David Frank-Kamenetskii (1910-1970)", topic:"Thermal explosion theory", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Operator Delia Fenn @ The Operator's Corporate Office
    rf_pourbaix:{ sci:"Marcel Pourbaix (1904-1998)", topic:"Corrosion & potential-pH diagrams", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Operator Delia Fenn @ The Operator's Corporate Office
    rf_uhlig:{ sci:"Herbert H. Uhlig (1907-1993)", topic:"Corrosion engineering", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The Board Operator @ The Operator's Corporate Office
    rf_shukhov:{ sci:"Vladimir Shukhov (1853-1939)", topic:"Oil refining & thermal cracking", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The Board Operator @ The Operator's Corporate Office
    rf_burton:{ sci:"William M. Burton (1865-1954)", topic:"Thermal cracking of petroleum", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Operator's Corporate Office
    rf_houdry:{ sci:"Eugene Houdry (1892-1962)", topic:"Catalytic cracking", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Operator's Corporate Office
    rf_papin:{ sci:"Denis Papin (1647-1713)", topic:"The pressure vessel & the safety valve", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    unitop:{ units:"", control:"", office:"" },
    boardop:{ units:"", control:"", office:"" },
    clerk:{ units:"", control:"", office:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"attack", dismissalWhat:"freak",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};