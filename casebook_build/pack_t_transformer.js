// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"t_transformer", title:"The Aldergate Substation Fire", discipline:"Power Engineering & Dielectrics",
  teaser:"A substation transformer exploded into flame and blacked out the city. An attack? A lightning strike? Or an overload nobody logged?", overclaimTag:"sabotage or an attack", truthTag:"chronic overload & deferred oil testing",
  venue:"the Aldergate substation inquiry", agent:{name:"Investigator Emun Halle", role:"Investigator's Notepad"},
  standingLabel:"Inquiry credibility", readingShort:"Pioneers", readingLabel:"Power & Dielectric Pioneers",
  dossierName:"POWER & DIELECTRIC PIONEERS", enterLabel:"Open the inquiry", subt:"A deduction game inside the Aldergate substation inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (sabotage or an attack) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"operator", items:[
      {id:"operator", label:"Bram Odell — utility operator"},
      {id:"engineer", label:"The substation engineer"},
      {id:"regulator", label:"The grid safety regulator"} ]},
    where:{ title:"Where it culminates", truth:"office", items:[
      {id:"yard", label:"The Substation Yard & Transformer"},
      {id:"relay", label:"The Relay & Control House"},
      {id:"office", label:"The Utility's Asset Office"} ]},
    what:{ title:"What is happening", truth:"overload", items:[
      {id:"attack", label:"Sabotage or an attack on the yard"},
      {id:"freak", label:"A freak lightning strike — an act of God"},
      {id:"overload", label:"Chronic overload with insulating-oil testing deferred"} ]}
  },
  PLACES:{
    yard:{name:"The Substation Yard & Transformer", xy:[140,90]},
    relay:{name:"The Relay & Control House", xy:[330,240]},
    office:{name:"The Utility's Asset Office", xy:[520,90]}
  },
  EDGES:[["yard","relay"],["relay","office"]],
  CHARACTERS:{
    subop:{ name:"Operator Nkemi", role:"Substation operator", face:"⚡", badge:"N", legend:"the substation yard", hint:"Switches the yard; watched the transformer run hot and over its rating." },
    oiltech:{ name:"The Oil Technician", role:"Insulating-oil technician", face:"🧪", badge:"O", legend:"the control house", hint:"Draws the oil samples; the dissolved-gas tests were long overdue." },
    clerk:{ name:"The Clerk", role:"Asset-records clerk", face:"🗂", badge:"C", legend:"the office", hint:"Keeps the load records and the test schedule that was deferred." }
  },
  TOPICMAP:{
    yard:{ subop:["tx_hopkinson","tx_blathy"], oiltech:["tx_zipernowsky","tx_gaulard"], clerk:["tx_deri","tx_ferraris"] },
    relay:{ subop:["tx_ferranti","tx_weiss"], oiltech:["tx_barkhausen","tx_debye"], clerk:["tx_mossotti","tx_paschen"] },
    office:{ subop:["tx_townsend","tx_peek"], oiltech:["tx_rogowski","tx_stefan"], clerk:["tx_schmidt","tx_seebeck"] }
  },
  TOPICS:{
    // cell: Operator Nkemi @ The Substation Yard & Transformer
    tx_hopkinson:{ sci:"John Hopkinson (1849-1898)", topic:"Magnetic circuits & transformer theory", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: Operator Nkemi @ The Substation Yard & Transformer
    tx_blathy:{ sci:"Otto Blathy (1860-1939)", topic:"The ZBD transformer", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: The Oil Technician @ The Substation Yard & Transformer
    tx_zipernowsky:{ sci:"Karoly Zipernowsky (1853-1942)", topic:"AC distribution & the transformer", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: The Oil Technician @ The Substation Yard & Transformer
    tx_gaulard:{ sci:"Lucien Gaulard (1850-1888)", topic:"The early AC transformer", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Substation Yard & Transformer
    tx_deri:{ sci:"Miksa Deri (1854-1938)", topic:"The ZBD transformer & AC", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Substation Yard & Transformer
    tx_ferraris:{ sci:"Galileo Ferraris (1847-1897)", topic:"AC theory & the rotating field", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: Operator Nkemi @ The Relay & Control House
    tx_ferranti:{ sci:"Sebastian Ziani de Ferranti (1864-1930)", topic:"High-voltage AC & the Ferranti effect", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: Operator Nkemi @ The Relay & Control House
    tx_weiss:{ sci:"Pierre Weiss (1865-1940)", topic:"Ferromagnetism & magnetic domains", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The Oil Technician @ The Relay & Control House
    tx_barkhausen:{ sci:"Heinrich Barkhausen (1881-1956)", topic:"Magnetization & core losses", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The Oil Technician @ The Relay & Control House
    tx_debye:{ sci:"Peter Debye (1884-1966)", topic:"Dielectrics & polarization", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Relay & Control House
    tx_mossotti:{ sci:"Ottaviano Mossotti (1791-1863)", topic:"Dielectric polarization", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Relay & Control House
    tx_paschen:{ sci:"Friedrich Paschen (1865-1947)", topic:"Gas breakdown & Paschen's law", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Operator Nkemi @ The Utility's Asset Office
    tx_townsend:{ sci:"John Sealy Townsend (1868-1957)", topic:"Gas discharge & avalanche breakdown", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Operator Nkemi @ The Utility's Asset Office
    tx_peek:{ sci:"Frank W. Peek (1881-1933)", topic:"Corona & dielectric breakdown", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The Oil Technician @ The Utility's Asset Office
    tx_rogowski:{ sci:"Walther Rogowski (1881-1947)", topic:"Dielectric field control", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The Oil Technician @ The Utility's Asset Office
    tx_stefan:{ sci:"Josef Stefan (1835-1893)", topic:"Thermal radiation & heat loss", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Utility's Asset Office
    tx_schmidt:{ sci:"Ernst Schmidt (1892-1975)", topic:"Heat transfer & thermal analysis", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Utility's Asset Office
    tx_seebeck:{ sci:"Thomas Johann Seebeck (1770-1831)", topic:"Thermoelectric hot-spot sensing", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    subop:{ yard:"", relay:"", office:"" },
    oiltech:{ yard:"", relay:"", office:"" },
    clerk:{ yard:"", relay:"", office:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"attack", dismissalWhat:"freak",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};