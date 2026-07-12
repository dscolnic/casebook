// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"m_railx", title:"The Marsh Lane Crossing", discipline:"Railway Signalling & Interlocking",
  teaser:"An express hit a stopped train at a level crossing that should have held it back. A bomb on the line? A driver who ran the signal? Or an interlock someone jumped?", overclaimTag:"sabotage on the line", truthTag:"a jumped interlock and deferred maintenance",
  venue:"the Marsh Lane crossing inquiry", agent:{name:"Investigator Glen Ashby", role:"Investigator's Notepad"},
  standingLabel:"Inquiry credibility", readingShort:"Pioneers", readingLabel:"Railway-Signalling Pioneers",
  dossierName:"RAILWAY-SIGNALLING PIONEERS", enterLabel:"Open the inquiry", subt:"A deduction game inside the Marsh Lane crossing inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (sabotage on the line) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"rx_infra", items:[
      {id:"rx_infra", label:"Perren Voss — signalling infrastructure manager"},
      {id:"rx_driver", label:"The express driver"},
      {id:"rx_regulator", label:"The rail-safety inspector"} ]},
    where:{ title:"Where it culminates", truth:"rx_office", items:[
      {id:"rx_crossing", label:"The Crossing & Points"},
      {id:"rx_signalbox", label:"The Signalling Control Centre"},
      {id:"rx_office", label:"The Infrastructure Head Office"} ]},
    what:{ title:"What is happening", truth:"rx_interlock", items:[
      {id:"rx_sabotage", label:"Sabotage — something left on the line"},
      {id:"rx_driver", label:"Simple driver error — a signal run by"},
      {id:"rx_interlock", label:"A bypassed interlock and deferred signalling maintenance"} ]}
  },
  PLACES:{
    rx_crossing:{name:"The Crossing & Points", xy:[140,90]},
    rx_signalbox:{name:"The Signalling Control Centre", xy:[330,240]},
    rx_office:{name:"The Infrastructure Head Office", xy:[520,90]}
  },
  EDGES:[["rx_crossing","rx_signalbox"],["rx_signalbox","rx_office"]],
  CHARACTERS:{
    rx_technician:{ name:"S&T Tech Mara Doss", role:"Signal & telegraph technician", face:"🔧", badge:"M", legend:"the crossing", hint:"Maintains the gear; knows which interlock was strapped out to keep trains running." },
    rx_signaller:{ name:"The Signaller", role:"Signalling-centre operator", face:"🚦", badge:"S", legend:"the control centre", hint:"Works the panel; saw the crossing show clear with a train still standing on it." },
    rx_clerk:{ name:"The Clerk", role:"Infrastructure records clerk", face:"🗂", badge:"C", legend:"the office", hint:"Holds the fault log — and the deferral that left the interlock unrepaired." }
  },
  TOPICMAP:{
    rx_crossing:{ rx_technician:["rx_wheatstone","rx_cooke"], rx_signaller:["rx_gregory","rx_sykes"], rx_clerk:["rx_tyer","rx_hall"] },
    rx_signalbox:{ rx_technician:["rx_robinson","rx_welch"], rx_signaller:["rx_raven","rx_gresham"], rx_clerk:["rx_raynar","rx_fox"] },
    rx_office:{ rx_technician:["rx_trevithick","rx_locke"], rx_signaller:["rx_gooch","rx_stroudley"], rx_clerk:["rx_bradshaw","rx_ramsbottom"] }
  },
  TOPICS:{
    // cell: S&T Tech Mara Doss @ The Crossing & Points
    rx_wheatstone:{ sci:"Charles Wheatstone (1802-1875)", topic:"The electric telegraph & railway signalling", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: S&T Tech Mara Doss @ The Crossing & Points
    rx_cooke:{ sci:"William Fothergill Cooke (1806-1879)", topic:"The block-telegraph system", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: The Signaller @ The Crossing & Points
    rx_gregory:{ sci:"Charles Hutton Gregory (1817-1898)", topic:"The semaphore railway signal", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: The Signaller @ The Crossing & Points
    rx_sykes:{ sci:"William Robert Sykes (1840-1917)", topic:"Lock-and-block interlocking", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Crossing & Points
    rx_tyer:{ sci:"Edward Tyer (1830-1912)", topic:"The single-line token & tablet", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Crossing & Points
    rx_hall:{ sci:"Thomas S. Hall (1827-1880)", topic:"Automatic signalling", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: S&T Tech Mara Doss @ The Signalling Control Centre
    rx_robinson:{ sci:"William Robinson (1840-1921)", topic:"The closed track circuit", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: S&T Tech Mara Doss @ The Signalling Control Centre
    rx_welch:{ sci:"Ashbel Welch (1809-1882)", topic:"The manual block system", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The Signaller @ The Signalling Control Centre
    rx_raven:{ sci:"Vincent Raven (1859-1934)", topic:"Early automatic train control", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The Signaller @ The Signalling Control Centre
    rx_gresham:{ sci:"James Gresham (1836-1914)", topic:"The automatic vacuum brake", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Signalling Control Centre
    rx_raynar:{ sci:"H. Raynar Wilson (railway-signalling historian)", topic:"Signalling principles & accident lessons", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Signalling Control Centre
    rx_fox:{ sci:"Charles Fox (1810-1874)", topic:"The railway switch & points", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: S&T Tech Mara Doss @ The Infrastructure Head Office
    rx_trevithick:{ sci:"Richard Trevithick (1771-1833)", topic:"The first steam locomotive", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: S&T Tech Mara Doss @ The Infrastructure Head Office
    rx_locke:{ sci:"Joseph Locke (1805-1860)", topic:"Railway civil engineering", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The Signaller @ The Infrastructure Head Office
    rx_gooch:{ sci:"Daniel Gooch (1816-1889)", topic:"Locomotive engineering & the broad gauge", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The Signaller @ The Infrastructure Head Office
    rx_stroudley:{ sci:"William Stroudley (1833-1889)", topic:"Locomotive design & braking", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Infrastructure Head Office
    rx_bradshaw:{ sci:"George Bradshaw (1801-1853)", topic:"The railway timetable & scheduling", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Infrastructure Head Office
    rx_ramsbottom:{ sci:"John Ramsbottom (1814-1897)", topic:"The safety valve & water trough", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    rx_technician:{ rx_crossing:"", rx_signalbox:"", rx_office:"" },
    rx_signaller:{ rx_crossing:"", rx_signalbox:"", rx_office:"" },
    rx_clerk:{ rx_crossing:"", rx_signalbox:"", rx_office:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"rx_sabotage", dismissalWhat:"rx_driver",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};