// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"t_battery", title:"The Kelso Grid-Battery Fire", discipline:"Electrochemistry & Battery Safety",
  teaser:"A grid battery bank caught fire and burned for days. Arson? A freak cell? Or a safeguard someone switched off?", overclaimTag:"arson or sabotage", truthTag:"a cell defect & a disabled safeguard",
  venue:"the Kelso battery-fire inquiry", agent:{name:"Investigator Pier Solano", role:"Investigator's Notepad"},
  standingLabel:"Inquiry credibility", readingShort:"Pioneers", readingLabel:"Battery & Electrochemistry Pioneers",
  dossierName:"BATTERY & ELECTROCHEMISTRY PIONEERS", enterLabel:"Open the inquiry", subt:"A deduction game inside the Kelso battery-fire inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (arson or sabotage) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"maker", items:[
      {id:"maker", label:"Elena Corso — battery manufacturer"},
      {id:"operator", label:"The storage-site operator"},
      {id:"regulator", label:"The grid safety regulator"} ]},
    where:{ title:"Where it culminates", truth:"office", items:[
      {id:"yard", label:"The Battery Yard & Racks"},
      {id:"bms", label:"The Control & BMS Room"},
      {id:"office", label:"The Manufacturer's Design Office"} ]},
    what:{ title:"What is happening", truth:"defect", items:[
      {id:"attack", label:"Arson or sabotage"},
      {id:"freak", label:"A freak cell failure — one in a million"},
      {id:"defect", label:"A cell defect with the battery-management & cooling safeguard disabled"} ]}
  },
  PLACES:{
    yard:{name:"The Battery Yard & Racks", xy:[140,90]},
    bms:{name:"The Control & BMS Room", xy:[330,240]},
    office:{name:"The Manufacturer's Design Office", xy:[520,90]}
  },
  EDGES:[["yard","bms"],["bms","office"]],
  CHARACTERS:{
    tech:{ name:"Technician Oyaro", role:"Battery technician", face:"🔋", badge:"T", legend:"the battery yard", hint:"Racks the modules; flagged the cells that ran hot and swollen." },
    bmseng:{ name:"The BMS Engineer", role:"Battery-management engineer", face:"🖥", badge:"M", legend:"the control room", hint:"Reads the cell data; the thermal cutoff was disabled to stop nuisance trips." },
    clerk:{ name:"The Clerk", role:"Records clerk", face:"🗂", badge:"C", legend:"the office", hint:"Keeps the cell-test files and the recall notice that never went out." }
  },
  TOPICMAP:{
    yard:{ tech:["bt_galvani","bt_daniell"], bmseng:["bt_grove","bt_plante"], clerk:["bt_leclanche","bt_jungner"] },
    bms:{ tech:["bt_edison","bt_nernst"], bmseng:["bt_tafel","bt_frumkin"], clerk:["bt_whittingham","bt_goodenough"] },
    office:{ tech:["bt_yoshino","bt_yazami"], bmseng:["bt_armand","bt_tarascon"], clerk:["bt_newman","bt_peltier"] }
  },
  TOPICS:{
    // cell: Technician Oyaro @ The Battery Yard & Racks
    bt_galvani:{ sci:"Luigi Galvani (1737-1798)", topic:"Galvanic action & the cell", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: Technician Oyaro @ The Battery Yard & Racks
    bt_daniell:{ sci:"John Frederic Daniell (1790-1845)", topic:"The Daniell cell", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: The BMS Engineer @ The Battery Yard & Racks
    bt_grove:{ sci:"William Robert Grove (1811-1896)", topic:"The fuel cell", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: The BMS Engineer @ The Battery Yard & Racks
    bt_plante:{ sci:"Gaston Plante (1834-1889)", topic:"The lead-acid battery", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Battery Yard & Racks
    bt_leclanche:{ sci:"Georges Leclanche (1839-1882)", topic:"The dry cell", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Battery Yard & Racks
    bt_jungner:{ sci:"Waldemar Jungner (1869-1924)", topic:"The nickel-cadmium cell", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: Technician Oyaro @ The Control & BMS Room
    bt_edison:{ sci:"Thomas Edison (1847-1931)", topic:"The nickel-iron battery", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: Technician Oyaro @ The Control & BMS Room
    bt_nernst:{ sci:"Walther Nernst (1864-1941)", topic:"Electrode potentials & the Nernst equation", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The BMS Engineer @ The Control & BMS Room
    bt_tafel:{ sci:"Julius Tafel (1862-1918)", topic:"Electrode kinetics & the Tafel equation", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The BMS Engineer @ The Control & BMS Room
    bt_frumkin:{ sci:"Alexander Frumkin (1895-1976)", topic:"Electrochemical kinetics & the double layer", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Control & BMS Room
    bt_whittingham:{ sci:"M. Stanley Whittingham (b. 1941)", topic:"Intercalation & the lithium battery", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Control & BMS Room
    bt_goodenough:{ sci:"John B. Goodenough (1922-2023)", topic:"The lithium-ion cathode", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Technician Oyaro @ The Manufacturer's Design Office
    bt_yoshino:{ sci:"Akira Yoshino (b. 1948)", topic:"The lithium-ion battery", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Technician Oyaro @ The Manufacturer's Design Office
    bt_yazami:{ sci:"Rachid Yazami (b. 1953)", topic:"The graphite anode", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The BMS Engineer @ The Manufacturer's Design Office
    bt_armand:{ sci:"Michel Armand (b. 1946)", topic:"Electrolytes & battery materials", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The BMS Engineer @ The Manufacturer's Design Office
    bt_tarascon:{ sci:"Jean-Marie Tarascon (b. 1953)", topic:"Lithium-ion materials & safety", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Manufacturer's Design Office
    bt_newman:{ sci:"John Newman (electrochemical engineer)", topic:"Battery modeling & thermal runaway", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Manufacturer's Design Office
    bt_peltier:{ sci:"Jean-Charles Peltier (1785-1845)", topic:"Thermoelectric heating & cooling", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    tech:{ yard:"", bms:"", office:"" },
    bmseng:{ yard:"", bms:"", office:"" },
    clerk:{ yard:"", bms:"", office:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"attack", dismissalWhat:"freak",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};