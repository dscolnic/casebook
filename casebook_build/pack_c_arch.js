// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"c_arch", title:"The Cranmoor Skull", discipline:"Archaeology & Scientific Dating",
  teaser:"A gravel pit gave up the missing link. The discovery of the century? A crank's blunder? Or something that was put there?", overclaimTag:"the discovery of the century", truthTag:"a planted, doctored artifact",
  venue:"the Cranmoor Skull inquiry", agent:{name:"Inspector Cal Merrin", role:"Investigator's Notepad"},
  standingLabel:"Inquiry credibility", readingShort:"Archaeologists", readingLabel:"Archaeology & Dating Pioneers",
  dossierName:"ARCHAEOLOGY & DATING PIONEERS", enterLabel:"Open the inquiry", subt:"A deduction game inside the Cranmoor Skull inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (the discovery of the century) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"ah_amateur", items:[
      {id:"ah_amateur", label:"Silas Fenn — the amateur antiquary who 'found' it"},
      {id:"ah_keeper", label:"Dr. Marrick — the museum keeper"},
      {id:"ah_geologist", label:"Prof. Aldous — the site geologist"} ]},
    where:{ title:"Where it culminates", truth:"ah_lab", items:[
      {id:"ah_pit", label:"The Gravel Pit & Dig"},
      {id:"ah_gallery", label:"The Museum Gallery"},
      {id:"ah_lab", label:"The Dating Laboratory"} ]},
    what:{ title:"What is happening", truth:"ah_planted", items:[
      {id:"ah_link", label:"The missing link — the earliest human ancestor"},
      {id:"ah_mistake", label:"A muddle — an amateur's honest mistake"},
      {id:"ah_planted", label:"A planted composite: filed, stained, and caught by dating"} ]}
  },
  PLACES:{
    ah_pit:{name:"The Gravel Pit & Dig", xy:[140,90]},
    ah_gallery:{name:"The Museum Gallery", xy:[330,240]},
    ah_lab:{name:"The Dating Laboratory", xy:[520,90]}
  },
  EDGES:[["ah_pit","ah_gallery"],["ah_gallery","ah_lab"]],
  CHARACTERS:{
    ah_tech:{ name:"Lab Tech Oona", role:"Dating-lab technician", face:"🧪", badge:"O", legend:"the laboratory", hint:"Runs the fluorine and nitrogen tests; the jaw and the skull are nowhere near the same age." },
    ah_foreman:{ name:"Dig Foreman Cray", role:"Excavation foreman", face:"⛏", badge:"C", legend:"the gravel pit", hint:"Dug the pit for years; the prize pieces only ever turned up when one man was watching." },
    ah_registrar:{ name:"Registrar Pell", role:"Museum registrar", face:"🗂", badge:"P", legend:"the gallery", hint:"Keeps the accession records; the find has no honest chain of discovery." }
  },
  TOPICMAP:{
    ah_pit:{ ah_tech:["ah_petrie","ah_pittrivers"], ah_foreman:["ah_schliemann","ah_evans"], ah_registrar:["ah_wheeler","ah_kenyon"] },
    ah_gallery:{ ah_tech:["ah_garrod","ah_libby"], ah_foreman:["ah_douglass","ah_oakley"], ah_registrar:["ah_weiner","ah_legrosclark"] },
    ah_lab:{ ah_tech:["ah_grahameclark","ah_childe"], ah_foreman:["ah_nelson","ah_kidder"], ah_registrar:["ah_suess","ah_renfrew"] }
  },
  TOPICS:{
    // cell: Lab Tech Oona @ The Gravel Pit & Dig
    ah_petrie:{ sci:"Flinders Petrie (1853–1942)", topic:"Seriation & scientific excavation", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: Lab Tech Oona @ The Gravel Pit & Dig
    ah_pittrivers:{ sci:"Augustus Pitt Rivers (1827–1900)", topic:"Stratigraphy & typology", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: Dig Foreman Cray @ The Gravel Pit & Dig
    ah_schliemann:{ sci:"Heinrich Schliemann (1822–1890)", topic:"Troy & the perils of the eager digger", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: Dig Foreman Cray @ The Gravel Pit & Dig
    ah_evans:{ sci:"Arthur Evans (1851–1941)", topic:"Knossos & the risk of over-restoration", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: Registrar Pell @ The Gravel Pit & Dig
    ah_wheeler:{ sci:"Mortimer Wheeler (1890–1976)", topic:"The grid method & stratigraphic rigor", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: Registrar Pell @ The Gravel Pit & Dig
    ah_kenyon:{ sci:"Kathleen Kenyon (1906–1978)", topic:"The Wheeler–Kenyon method at Jericho", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: Lab Tech Oona @ The Museum Gallery
    ah_garrod:{ sci:"Dorothy Garrod (1892–1968)", topic:"Palaeolithic prehistory & method", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: Lab Tech Oona @ The Museum Gallery
    ah_libby:{ sci:"Willard Libby (1908–1980)", topic:"Radiocarbon dating", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: Dig Foreman Cray @ The Museum Gallery
    ah_douglass:{ sci:"A. E. Douglass (1867–1962)", topic:"Dendrochronology: tree-ring dating", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: Dig Foreman Cray @ The Museum Gallery
    ah_oakley:{ sci:"Kenneth Oakley (1911–1981)", topic:"The fluorine test that broke Piltdown", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: Registrar Pell @ The Museum Gallery
    ah_weiner:{ sci:"Joseph Weiner (1915–1982)", topic:"The exposure of the Piltdown hoax", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: Registrar Pell @ The Museum Gallery
    ah_legrosclark:{ sci:"Wilfrid Le Gros Clark (1895–1971)", topic:"The anatomy that revealed the fake", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Lab Tech Oona @ The Dating Laboratory
    ah_grahameclark:{ sci:"Grahame Clark (1907–1995)", topic:"Economic prehistory & method", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Lab Tech Oona @ The Dating Laboratory
    ah_childe:{ sci:"V. Gordon Childe (1892–1957)", topic:"Archaeological cultures & synthesis", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: Dig Foreman Cray @ The Dating Laboratory
    ah_nelson:{ sci:"Nels Nelson (1875–1964)", topic:"Stratigraphic excavation", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: Dig Foreman Cray @ The Dating Laboratory
    ah_kidder:{ sci:"Alfred Kidder (1885–1963)", topic:"Stratigraphy & Southwestern archaeology", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: Registrar Pell @ The Dating Laboratory
    ah_suess:{ sci:"Hans Suess (1909–1993)", topic:"Radiocarbon calibration", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: Registrar Pell @ The Dating Laboratory
    ah_renfrew:{ sci:"Colin Renfrew (1937–2024)", topic:"The radiocarbon revolution & rigor", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    ah_tech:{ ah_pit:"", ah_gallery:"", ah_lab:"" },
    ah_foreman:{ ah_pit:"", ah_gallery:"", ah_lab:"" },
    ah_registrar:{ ah_pit:"", ah_gallery:"", ah_lab:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"ah_link", dismissalWhat:"ah_mistake",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};