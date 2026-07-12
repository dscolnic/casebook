// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"j_capture", title:"The Halcyon Grid", discipline:"Regulation & Public Choice",
  teaser:"A power utility keeps winning every rate case while the lights keep failing. A shadowy cabal? Just how regulation works? Or a board quietly staffed by the firm it is meant to watch?", overclaimTag:"a shadowy cabal", truthTag:"a captured oversight board",
  venue:"the Halcyon utility oversight inquiry", agent:{name:"Investigator Owen Marsh", role:"Investigator's Notepad"},
  standingLabel:"Commission credibility", readingShort:"Theorists", readingLabel:"Theorists of the State & the Firm",
  dossierName:"THEORISTS OF REGULATION", enterLabel:"Open the inquiry", subt:"A deduction game inside the Halcyon utility oversight inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (a shadowy cabal) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"chair", items:[
      {id:"ceo", label:"The utility's chief executive"},
      {id:"chair", label:"Regina Poll — the oversight board chair"},
      {id:"staff", label:"The commission staff director"} ]},
    where:{ title:"Where it culminates", truth:"boardfiles", items:[
      {id:"ratehearing", label:"The Rate-Hearing Chamber"},
      {id:"utilityhq", label:"The Utility's Head Office"},
      {id:"boardfiles", label:"The Oversight Board's Records"} ]},
    what:{ title:"What is happening", truth:"capture", items:[
      {id:"cabal", label:"A shadowy cabal secretly runs the grid"},
      {id:"normal", label:"Nothing amiss — ordinary regulation at work"},
      {id:"capture", label:"The firm staffed & steered its own regulator"} ]}
  },
  PLACES:{
    ratehearing:{name:"The Rate-Hearing Chamber", xy:[140,90]},
    utilityhq:{name:"The Utility's Head Office", xy:[330,240]},
    boardfiles:{name:"The Oversight Board's Records", xy:[520,90]}
  },
  EDGES:[["ratehearing","utilityhq"],["utilityhq","boardfiles"]],
  CHARACTERS:{
    analyst:{ name:"Staff Analyst Devi Rao", role:"Commission staff analyst", face:"📊", badge:"R", legend:"the commission", hint:"Runs the rate models; her adverse findings kept getting revised upward." },
    clerk:{ name:"The Records Clerk", role:"Board records clerk", face:"🗂", badge:"C", legend:"the board office", hint:"Keeps the appointment files — and the résumés that all trace to one firm." },
    lineworker:{ name:"Lineworker Hobbs", role:"Utility lineworker", face:"🔌", badge:"H", legend:"the utility", hint:"Patches the failing grid the rate money never seems to reach." }
  },
  TOPICMAP:{
    ratehearing:{ analyst:["bureaucracy","oligarchy"], clerk:["sunshine","publicity"], lineworker:["adminprocess","lifecycle"] },
    utilityhq:{ analyst:["railhistory","regecon"], clerk:["fcc","capturetheory"], lineworker:["collective","publicchoice"] },
    boardfiles:{ analyst:["rentseeking","peltzman"], clerk:["pricing","interestgroup"], lineworker:["moderncapture","budgetbureau"] }
  },
  TOPICS:{
    // cell: Staff Analyst Devi Rao @ The Rate-Hearing Chamber
    bureaucracy:{ sci:"Max Weber (1864-1920)", topic:"Bureaucracy & rational-legal authority", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: Staff Analyst Devi Rao @ The Rate-Hearing Chamber
    oligarchy:{ sci:"Robert Michels (1876-1936)", topic:"The iron law of oligarchy", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: The Records Clerk @ The Rate-Hearing Chamber
    sunshine:{ sci:"Charles Francis Adams Jr. (1835-1915)", topic:"The 'sunshine' railroad commission", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: The Records Clerk @ The Rate-Hearing Chamber
    publicity:{ sci:"Louis Brandeis (1856-1941)", topic:"The curse of bigness & publicity", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: Lineworker Hobbs @ The Rate-Hearing Chamber
    adminprocess:{ sci:"James M. Landis (1899-1964)", topic:"The administrative process & its capture", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: Lineworker Hobbs @ The Rate-Hearing Chamber
    lifecycle:{ sci:"Marver Bernstein (1919-1990)", topic:"The life cycle of a captured commission", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: Staff Analyst Devi Rao @ The Utility's Head Office
    railhistory:{ sci:"Gabriel Kolko (1932-2014)", topic:"The political history of rail regulation", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: Staff Analyst Devi Rao @ The Utility's Head Office
    regecon:{ sci:"Alfred E. Kahn (1917-2010)", topic:"The economics of regulation", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The Records Clerk @ The Utility's Head Office
    fcc:{ sci:"Ronald Coase (1910-2013)", topic:"The FCC & the case for markets", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The Records Clerk @ The Utility's Head Office
    capturetheory:{ sci:"George Stigler (1911-1991)", topic:"The theory of regulatory capture", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: Lineworker Hobbs @ The Utility's Head Office
    collective:{ sci:"Mancur Olson (1932-1998)", topic:"The logic of concentrated interests", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: Lineworker Hobbs @ The Utility's Head Office
    publicchoice:{ sci:"James M. Buchanan (1919-2013)", topic:"Public choice & the state", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Staff Analyst Devi Rao @ The Oversight Board's Records
    rentseeking:{ sci:"Gordon Tullock (1922-2014)", topic:"Rent-seeking", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Staff Analyst Devi Rao @ The Oversight Board's Records
    peltzman:{ sci:"Sam Peltzman (b. 1940)", topic:"The economic theory of regulation", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The Records Clerk @ The Oversight Board's Records
    pricing:{ sci:"Richard Posner (b. 1939)", topic:"The pricing of regulation", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The Records Clerk @ The Oversight Board's Records
    interestgroup:{ sci:"Theodore Lowi (1931-2017)", topic:"Interest-group liberalism", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: Lineworker Hobbs @ The Oversight Board's Records
    moderncapture:{ sci:"Jean Tirole (b. 1953)", topic:"The modern theory of regulatory capture", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: Lineworker Hobbs @ The Oversight Board's Records
    budgetbureau:{ sci:"William Niskanen (1933-2011)", topic:"The budget-maximizing bureau", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    analyst:{ ratehearing:"", utilityhq:"", boardfiles:"" },
    clerk:{ ratehearing:"", utilityhq:"", boardfiles:"" },
    lineworker:{ ratehearing:"", utilityhq:"", boardfiles:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"cabal", dismissalWhat:"normal",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};