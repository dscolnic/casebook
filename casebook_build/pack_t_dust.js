// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"t_dust", title:"The Corriston Mill Blast", discipline:"Combustion & Dust-Explosion Engineering",
  teaser:"A sugar mill blew apart floor by floor one evening. A bomb? A one-in-a-million spark? Or dust someone let pile up?", overclaimTag:"sabotage or a bomb", truthTag:"neglected dust with cut cleaning & ventilation",
  venue:"the Corriston mill inquiry", agent:{name:"Inspector Nash Verel", role:"Investigator's Notepad"},
  standingLabel:"Inquiry credibility", readingShort:"Pioneers", readingLabel:"Combustion Pioneers",
  dossierName:"COMBUSTION & EXPLOSION PIONEERS", enterLabel:"Open the inquiry", subt:"A deduction game inside the Corriston mill inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (sabotage or a bomb) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"owner", items:[
      {id:"owner", label:"Corwin Ash — plant owner"},
      {id:"manager", label:"The production manager"},
      {id:"inspector", label:"The safety inspector"} ]},
    where:{ title:"Where it culminates", truth:"office", items:[
      {id:"floor", label:"The Production Floor & Ducts"},
      {id:"mcc", label:"The Motor Control Room"},
      {id:"office", label:"The Owner's Plant Office"} ]},
    what:{ title:"What is happening", truth:"neglect", items:[
      {id:"attack", label:"Sabotage or a bomb"},
      {id:"freak", label:"A freak spark — bad luck"},
      {id:"neglect", label:"Cut housekeeping & ventilation, with dust left to accumulate"} ]}
  },
  PLACES:{
    floor:{name:"The Production Floor & Ducts", xy:[140,90]},
    mcc:{name:"The Motor Control Room", xy:[330,240]},
    office:{name:"The Owner's Plant Office", xy:[520,90]}
  },
  EDGES:[["floor","mcc"],["mcc","office"]],
  CHARACTERS:{
    sweeper:{ name:"Sweeper Ruiz", role:"Housekeeping hand", face:"🧹", badge:"S", legend:"the production floor", hint:"Sweeps the catwalks; knows the crew was cut and the dust lay inches deep." },
    electrician:{ name:"The Electrician", role:"Plant electrician", face:"⚡", badge:"E", legend:"the motor room", hint:"Wires the motors; saw the ductwork clogged and the fans switched off." },
    clerk:{ name:"The Clerk", role:"Records clerk", face:"🗂", badge:"C", legend:"the office", hint:"Keeps the cleaning logs and the memo that ended the night sweep." }
  },
  TOPICMAP:{
    floor:{ sweeper:["du_boyle","du_priestley"], electrician:["du_scheele","du_lomonosov"], clerk:["du_gaylussac","du_avogadro"] },
    mcc:{ sweeper:["du_mallard","du_vieille"], electrician:["du_mach","du_hinshelwood"], clerk:["du_bartknecht","du_eckhoff"] },
    office:{ sweeper:["du_galloway","du_haldane"], electrician:["du_bagnold","du_gray"], clerk:["du_lichtenberg","du_fourier"] }
  },
  TOPICS:{
    // cell: Sweeper Ruiz @ The Production Floor & Ducts
    du_boyle:{ sci:"Robert Boyle (1627-1691)", topic:"Air, pressure & combustion", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: Sweeper Ruiz @ The Production Floor & Ducts
    du_priestley:{ sci:"Joseph Priestley (1733-1804)", topic:"Oxygen & combustion", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: The Electrician @ The Production Floor & Ducts
    du_scheele:{ sci:"Carl Wilhelm Scheele (1742-1786)", topic:"The discovery of oxygen", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: The Electrician @ The Production Floor & Ducts
    du_lomonosov:{ sci:"Mikhail Lomonosov (1711-1765)", topic:"Combustion & conservation of mass", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Production Floor & Ducts
    du_gaylussac:{ sci:"Joseph Louis Gay-Lussac (1778-1850)", topic:"Gas pressure, temperature & explosion", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Production Floor & Ducts
    du_avogadro:{ sci:"Amedeo Avogadro (1776-1856)", topic:"Gases, the mole & fuel-air ratio", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: Sweeper Ruiz @ The Motor Control Room
    du_mallard:{ sci:"Ernest-Francois Mallard (1833-1894)", topic:"Flame propagation in gases", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: Sweeper Ruiz @ The Motor Control Room
    du_vieille:{ sci:"Paul Vieille (1854-1934)", topic:"Detonation & the blast wave", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The Electrician @ The Motor Control Room
    du_mach:{ sci:"Ernst Mach (1838-1916)", topic:"Shock waves", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The Electrician @ The Motor Control Room
    du_hinshelwood:{ sci:"Cyril Norman Hinshelwood (1897-1967)", topic:"Chain reactions & combustion kinetics", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Motor Control Room
    du_bartknecht:{ sci:"Wolfgang Bartknecht (dust-explosion researcher)", topic:"Dust-explosion severity & venting", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Motor Control Room
    du_eckhoff:{ sci:"Rolf K. Eckhoff (dust-explosion researcher)", topic:"Dust explosions & prevention", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Sweeper Ruiz @ The Owner's Plant Office
    du_galloway:{ sci:"William Galloway (coal-dust explosion researcher)", topic:"Coal-dust explosions", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Sweeper Ruiz @ The Owner's Plant Office
    du_haldane:{ sci:"John Scott Haldane (1860-1936)", topic:"Mine gases & ventilation", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The Electrician @ The Owner's Plant Office
    du_bagnold:{ sci:"Ralph A. Bagnold (1896-1990)", topic:"The physics of blown particles", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The Electrician @ The Owner's Plant Office
    du_gray:{ sci:"Stephen Gray (1666-1736)", topic:"Electrostatic charge & conduction", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Owner's Plant Office
    du_lichtenberg:{ sci:"Georg Christoph Lichtenberg (1742-1799)", topic:"Static discharge", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Owner's Plant Office
    du_fourier:{ sci:"Joseph Fourier (1768-1830)", topic:"Heat conduction & thermal build-up", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    sweeper:{ floor:"", mcc:"", office:"" },
    electrician:{ floor:"", mcc:"", office:"" },
    clerk:{ floor:"", mcc:"", office:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"attack", dismissalWhat:"freak",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};