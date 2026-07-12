// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"j_fraud", title:"The Amberline Collapse", discipline:"Accounting & Corporate Finance",
  teaser:"A high-flying energy trader went from market darling to dust in a month. A raid by short-sellers? Just the market turning? Or billions parked where no auditor would look?", overclaimTag:"a short-seller raid", truthTag:"losses hidden off the books",
  venue:"the Amberline bankruptcy examination", agent:{name:"Examiner Dana Roth", role:"Investigator's Notepad"},
  standingLabel:"Examiner credibility", readingShort:"Reckoners", readingLabel:"Masters of the Ledger",
  dossierName:"MASTERS OF THE LEDGER", enterLabel:"Open the examination", subt:"A deduction game inside the Amberline bankruptcy examination", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (a short-seller raid) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"cfo", items:[
      {id:"ceo", label:"The chief executive"},
      {id:"cfo", label:"Julian Frael — the chief financial officer"},
      {id:"auditor", label:"The outside auditor"} ]},
    where:{ title:"Where it culminates", truth:"spes", items:[
      {id:"trading", label:"The Trading Floor"},
      {id:"auditroom", label:"The Auditor's Workroom"},
      {id:"spes", label:"The Off-Books Partnership Files"} ]},
    what:{ title:"What is happening", truth:"offbooks", items:[
      {id:"raid", label:"A short-seller raid sank a sound company"},
      {id:"cycle", label:"Nothing wrong — just the market turning"},
      {id:"offbooks", label:"Losses hidden in off-books entities"} ]}
  },
  PLACES:{
    trading:{name:"The Trading Floor", xy:[140,90]},
    auditroom:{name:"The Auditor's Workroom", xy:[330,240]},
    spes:{name:"The Off-Books Partnership Files", xy:[520,90]}
  },
  EDGES:[["trading","auditroom"],["auditroom","spes"]],
  CHARACTERS:{
    controller:{ name:"Assistant Controller Pia Voss", role:"Assistant controller", face:"🧮", badge:"V", legend:"the finance floor", hint:"Booked the entries; the same losses kept moving to partnerships she couldn't see." },
    junioraudit:{ name:"The Junior Auditor", role:"Audit-team junior", face:"🗂", badge:"A", legend:"the auditor's room", hint:"Ticked the confirmations; the partnership balances never confirmed back." },
    trader:{ name:"Desk Trader Okonkwo", role:"Energy-desk trader", face:"📈", badge:"O", legend:"the trading floor", hint:"Marked the book to models no one outside could check." }
  },
  TOPICMAP:{
    trading:{ controller:["doubleentry","agency"], junioraudit:["auditduty","principles"], trader:["goingconcern","theory"] },
    auditroom:{ controller:["statements","whitecollar"], junioraudit:["bezzle","triangle"], trader:["creative","incentives"] },
    spes:{ controller:["asymmetry","numbersgame"], junioraudit:["shenanigans","enronwarn"], trader:["internalaudit","forensic"] }
  },
  TOPICS:{
    // cell: Assistant Controller Pia Voss @ The Trading Floor
    doubleentry:{ sci:"Luca Pacioli (c. 1447-1517)", topic:"Double-entry bookkeeping", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: Assistant Controller Pia Voss @ The Trading Floor
    agency:{ sci:"Adam Smith (1723-1790)", topic:"The joint-stock firm & the agency problem", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: The Junior Auditor @ The Trading Floor
    auditduty:{ sci:"Robert H. Montgomery (1872-1953)", topic:"The auditor's duty", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: The Junior Auditor @ The Trading Floor
    principles:{ sci:"George O. May (1875-1961)", topic:"Accounting principles & disclosure", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: Desk Trader Okonkwo @ The Trading Floor
    goingconcern:{ sci:"William A. Paton (1889-1991)", topic:"Accounting theory & the going concern", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: Desk Trader Okonkwo @ The Trading Floor
    theory:{ sci:"A. C. Littleton (1886-1974)", topic:"The structure of accounting theory", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: Assistant Controller Pia Voss @ The Auditor's Workroom
    statements:{ sci:"Benjamin Graham (1894-1976)", topic:"Reading the financial statements", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: Assistant Controller Pia Voss @ The Auditor's Workroom
    whitecollar:{ sci:"Edwin Sutherland (1883-1950)", topic:"White-collar crime", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The Junior Auditor @ The Auditor's Workroom
    bezzle:{ sci:"John Kenneth Galbraith (1908-2006)", topic:"The crash & 'the bezzle'", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The Junior Auditor @ The Auditor's Workroom
    triangle:{ sci:"Donald Cressey (1919-1987)", topic:"The fraud triangle & other people's money", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: Desk Trader Okonkwo @ The Auditor's Workroom
    creative:{ sci:"Abraham Briloff (1917-2013)", topic:"Unaccountable, creative accounting", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: Desk Trader Okonkwo @ The Auditor's Workroom
    incentives:{ sci:"Michael C. Jensen (1939-2024)", topic:"Agency theory & managerial incentives", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Assistant Controller Pia Voss @ The Off-Books Partnership Files
    asymmetry:{ sci:"George Akerlof (b. 1940)", topic:"Asymmetric information & 'lemons'", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Assistant Controller Pia Voss @ The Off-Books Partnership Files
    numbersgame:{ sci:"Arthur Levitt (b. 1931)", topic:"Earnings management & the numbers game", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The Junior Auditor @ The Off-Books Partnership Files
    shenanigans:{ sci:"Howard Schilit (forensic-accounting author)", topic:"Financial shenanigans", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The Junior Auditor @ The Off-Books Partnership Files
    enronwarn:{ sci:"Sherron Watkins (b. 1959)", topic:"The Enron off-books warning", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: Desk Trader Okonkwo @ The Off-Books Partnership Files
    internalaudit:{ sci:"Cynthia Cooper (WorldCom internal auditor)", topic:"The internal auditor's discovery", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: Desk Trader Okonkwo @ The Off-Books Partnership Files
    forensic:{ sci:"Harry Markopolos (b. 1956)", topic:"The forensic whistleblower", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    controller:{ trading:"", auditroom:"", spes:"" },
    junioraudit:{ trading:"", auditroom:"", spes:"" },
    trader:{ trading:"", auditroom:"", spes:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"raid", dismissalWhat:"cycle",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};