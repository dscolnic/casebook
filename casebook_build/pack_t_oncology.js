// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"t_oncology", title:"The Meredith Clinic Overdose", discipline:"Radiation Physics & Medical Dosimetry",
  teaser:"Cancer patients were burned by their own treatment beam. A software glitch? A rare reaction? Or a calibration check that stopped being done?", overclaimTag:"a software or computer glitch", truthTag:"a calibration & QA gap in the beam",
  venue:"the Meredith clinic inquiry", agent:{name:"Inspector Tovah Riis", role:"Investigator's Notepad"},
  standingLabel:"Inquiry credibility", readingShort:"Pioneers", readingLabel:"Radiation & Dosimetry Pioneers",
  dossierName:"RADIATION & DOSIMETRY PIONEERS", enterLabel:"Open the inquiry", subt:"A deduction game inside the Meredith clinic inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (a software or computer glitch) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"clinic", items:[
      {id:"clinic", label:"Dr. Halvard Bre — clinic director"},
      {id:"physicist", label:"The chief medical physicist"},
      {id:"regulator", label:"The radiation safety regulator"} ]},
    where:{ title:"Where it culminates", truth:"office", items:[
      {id:"vault", label:"The Treatment Vault & Machine"},
      {id:"planning", label:"The Dosimetry & Planning Room"},
      {id:"office", label:"The Clinic Director's Office"} ]},
    what:{ title:"What is happening", truth:"qagap", items:[
      {id:"software", label:"A rogue software or computer glitch"},
      {id:"freak", label:"A one-off patient reaction — sheer misfortune"},
      {id:"qagap", label:"A calibration & QA gap in the treatment chain"} ]}
  },
  PLACES:{
    vault:{name:"The Treatment Vault & Machine", xy:[140,90]},
    planning:{name:"The Dosimetry & Planning Room", xy:[330,240]},
    office:{name:"The Clinic Director's Office", xy:[520,90]}
  },
  EDGES:[["vault","planning"],["planning","office"]],
  CHARACTERS:{
    therapist:{ name:"Therapist Iyla", role:"Radiation therapist", face:"☢", badge:"T", legend:"the treatment vault", hint:"Runs the beam; saw the patients' skin burn and the machine left unchecked." },
    dosimetrist:{ name:"The Dosimetrist", role:"Clinical dosimetrist", face:"📐", badge:"D", legend:"the planning room", hint:"Builds the plans; the output was never re-calibrated after the source swap." },
    clerk:{ name:"The Clerk", role:"Records clerk", face:"🗂", badge:"C", legend:"the office", hint:"Keeps the QA logs and the memo that cut the physics checks." }
  },
  TOPICMAP:{
    vault:{ therapist:["rx_rontgen","rx_becquerel"], dosimetrist:["rx_whbragg","rx_coolidge"], clerk:["rx_wideroe","rx_kerst"] },
    planning:{ therapist:["rx_johns","rx_rwilson"], dosimetrist:["rx_gray","rx_sievert"], clerk:["rx_failla","rx_quimby"] },
    office:{ therapist:["rx_paterson","rx_parker"], dosimetrist:["rx_fricke","rx_cameron"], clerk:["rx_evans","rx_cormack"] }
  },
  TOPICS:{
    // cell: Therapist Iyla @ The Treatment Vault & Machine
    rx_rontgen:{ sci:"Wilhelm Rontgen (1845-1923)", topic:"The discovery of X-rays", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: Therapist Iyla @ The Treatment Vault & Machine
    rx_becquerel:{ sci:"Henri Becquerel (1852-1908)", topic:"Natural radioactivity", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: The Dosimetrist @ The Treatment Vault & Machine
    rx_whbragg:{ sci:"William Henry Bragg (1862-1942)", topic:"Ionization & the Bragg peak", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: The Dosimetrist @ The Treatment Vault & Machine
    rx_coolidge:{ sci:"William D. Coolidge (1873-1975)", topic:"The X-ray tube", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Treatment Vault & Machine
    rx_wideroe:{ sci:"Rolf Wideroe (1902-1996)", topic:"The linear accelerator concept", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Treatment Vault & Machine
    rx_kerst:{ sci:"Donald Kerst (1911-1993)", topic:"The betatron & medical radiation", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: Therapist Iyla @ The Dosimetry & Planning Room
    rx_johns:{ sci:"Harold E. Johns (1915-1998)", topic:"Cobalt-60 radiotherapy & medical physics", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: Therapist Iyla @ The Dosimetry & Planning Room
    rx_rwilson:{ sci:"Robert R. Wilson (1914-2000)", topic:"Proton therapy & the Bragg peak", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The Dosimetrist @ The Dosimetry & Planning Room
    rx_gray:{ sci:"Louis Harold Gray (1905-1965)", topic:"The gray & absorbed dose", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The Dosimetrist @ The Dosimetry & Planning Room
    rx_sievert:{ sci:"Rolf Sievert (1896-1966)", topic:"Dose equivalent & radiation protection", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Dosimetry & Planning Room
    rx_failla:{ sci:"Gioacchino Failla (1891-1961)", topic:"Radiation dosimetry", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Dosimetry & Planning Room
    rx_quimby:{ sci:"Edith Quimby (1891-1982)", topic:"Clinical radiation dosimetry", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Therapist Iyla @ The Clinic Director's Office
    rx_paterson:{ sci:"Ralston Paterson (1897-1981)", topic:"The Paterson-Parker dose system", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Therapist Iyla @ The Clinic Director's Office
    rx_parker:{ sci:"Herbert M. Parker (1910-1984)", topic:"Dosimetry & dose units", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The Dosimetrist @ The Clinic Director's Office
    rx_fricke:{ sci:"Hugo Fricke (1892-1972)", topic:"Chemical (Fricke) dosimetry", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The Dosimetrist @ The Clinic Director's Office
    rx_cameron:{ sci:"John R. Cameron (1922-2005)", topic:"Thermoluminescent dosimetry", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Clinic Director's Office
    rx_evans:{ sci:"Robley D. Evans (1907-1995)", topic:"Radiation measurement & dosimetry", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Clinic Director's Office
    rx_cormack:{ sci:"Allan Cormack (1924-1998)", topic:"CT imaging & dose computation", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    therapist:{ vault:"", planning:"", office:"" },
    dosimetrist:{ vault:"", planning:"", office:"" },
    clerk:{ vault:"", planning:"", office:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"software", dismissalWhat:"freak",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};