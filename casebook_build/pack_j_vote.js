// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"j_vote", title:"The Kessler County Count", discipline:"Elections & Democratic Theory",
  teaser:"A knife-edge election, and half a county's votes seem to vanish into the margins. A foreign hand on the scales? Just politics as usual? Or a map and a purge doing quiet work?", overclaimTag:"a foreign plot", truthTag:"a documented gerrymander & purge",
  venue:"the Kessler County election inquiry", agent:{name:"Investigator Lena Ward", role:"Investigator's Notepad"},
  standingLabel:"Inquiry credibility", readingShort:"Thinkers", readingLabel:"Theorists of the Vote",
  dossierName:"THEORISTS OF THE VOTE", enterLabel:"Open the inquiry", subt:"A deduction game inside the Kessler County election inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (a foreign plot) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"registrar", items:[
      {id:"party", label:"The county party boss"},
      {id:"registrar", label:"Supervisor Hollis Crane — the elections registrar"},
      {id:"observer", label:"The foreign-affairs observer"} ]},
    where:{ title:"Where it culminates", truth:"electionoffice", items:[
      {id:"pollingsite", label:"The Polling Precincts"},
      {id:"partyhq", label:"The County Party Headquarters"},
      {id:"electionoffice", label:"The County Elections Office"} ]},
    what:{ title:"What is happening", truth:"gerrymander", items:[
      {id:"foreign", label:"A foreign plot rigged the whole election"},
      {id:"usual", label:"Nothing unusual — politics as it always is"},
      {id:"gerrymander", label:"A drawn map & a quiet purge of the rolls"} ]}
  },
  PLACES:{
    pollingsite:{name:"The Polling Precincts", xy:[140,90]},
    partyhq:{name:"The County Party Headquarters", xy:[330,240]},
    electionoffice:{name:"The County Elections Office", xy:[520,90]}
  },
  EDGES:[["pollingsite","partyhq"],["partyhq","electionoffice"]],
  CHARACTERS:{
    pollworker:{ name:"Poll Captain Ada Reyes", role:"Precinct poll captain", face:"🗳", badge:"R", legend:"the precinct", hint:"Worked the tables; watched voters turned away as 'inactive' by the hundred." },
    clerk:{ name:"The Records Clerk", role:"Elections records clerk", face:"🗂", badge:"C", legend:"the elections office", hint:"Keeps the purge logs and the district map redrawn behind closed doors." },
    canvasser:{ name:"Canvasser Dumont", role:"Party canvasser", face:"📋", badge:"D", legend:"the party office", hint:"Knocks every door; knew which blocks were carved out of which district." }
  },
  TOPICMAP:{
    pollingsite:{ pollworker:["forms","separation"], clerk:["paradox","borda"], canvasser:["origins","faction"] },
    partyhq:{ pollworker:["majority","represent"], clerk:["heresthetics","bias"], canvasser:["southern","median"] },
    electionoffice:{ pollworker:["polyarchy","duverger"], clerk:["impossible","econdemo"], canvasser:["partysystems","measurebias"] }
  },
  TOPICS:{
    // cell: Poll Captain Ada Reyes @ The Polling Precincts
    forms:{ sci:"Aristotle (384-322 BC)", topic:"The forms of government & citizenship", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: Poll Captain Ada Reyes @ The Polling Precincts
    separation:{ sci:"Montesquieu (1689-1755)", topic:"The separation of powers", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: The Records Clerk @ The Polling Precincts
    paradox:{ sci:"Nicolas de Condorcet (1743-1794)", topic:"The voting paradox", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: The Records Clerk @ The Polling Precincts
    borda:{ sci:"Jean-Charles de Borda (1733-1799)", topic:"Methods of election", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: Canvasser Dumont @ The Polling Precincts
    origins:{ sci:"Elbridge Gerry (1744-1814)", topic:"The original gerrymander", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: Canvasser Dumont @ The Polling Precincts
    faction:{ sci:"James Madison (1751-1836)", topic:"Faction & Federalist No. 10", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: Poll Captain Ada Reyes @ The County Party Headquarters
    majority:{ sci:"Alexis de Tocqueville (1805-1859)", topic:"The tyranny of the majority", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: Poll Captain Ada Reyes @ The County Party Headquarters
    represent:{ sci:"John Stuart Mill (1806-1873)", topic:"Representative government & the minority", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The Records Clerk @ The County Party Headquarters
    heresthetics:{ sci:"William H. Riker (1920-1993)", topic:"Social choice & the manipulation of agendas", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The Records Clerk @ The County Party Headquarters
    bias:{ sci:"E. E. Schattschneider (1892-1971)", topic:"The mobilization of bias", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: Canvasser Dumont @ The County Party Headquarters
    southern:{ sci:"V. O. Key Jr. (1908-1963)", topic:"Southern politics & disenfranchisement", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: Canvasser Dumont @ The County Party Headquarters
    median:{ sci:"Duncan Black (1908-1991)", topic:"The median voter", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Poll Captain Ada Reyes @ The County Elections Office
    polyarchy:{ sci:"Robert A. Dahl (1915-2014)", topic:"Polyarchy & who governs", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Poll Captain Ada Reyes @ The County Elections Office
    duverger:{ sci:"Maurice Duverger (1917-2014)", topic:"Electoral laws & party systems", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The Records Clerk @ The County Elections Office
    impossible:{ sci:"Kenneth Arrow (1921-2017)", topic:"The impossibility theorem", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The Records Clerk @ The County Elections Office
    econdemo:{ sci:"Anthony Downs (1930-2021)", topic:"The economic theory of democracy", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: Canvasser Dumont @ The County Elections Office
    partysystems:{ sci:"Giovanni Sartori (1924-2017)", topic:"Parties & the counting of votes", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: Canvasser Dumont @ The County Elections Office
    measurebias:{ sci:"Bernard Grofman (b. 1944)", topic:"The measurement of gerrymandering", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    pollworker:{ pollingsite:"", partyhq:"", electionoffice:"" },
    clerk:{ pollingsite:"", partyhq:"", electionoffice:"" },
    canvasser:{ pollingsite:"", partyhq:"", electionoffice:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"foreign", dismissalWhat:"usual",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};