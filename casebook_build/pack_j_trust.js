// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"j_trust", title:"The Cygnet Standard", discipline:"Antitrust & Industrial Organization",
  teaser:"A tech giant's rivals keep dying just as they start to win. A ruthless plot to control everything? Just a better competitor winning? Or prices set below cost, and a study buried to hide it?", overclaimTag:"an all-controlling conspiracy", truthTag:"concealed predatory pricing",
  venue:"the Cygnet antitrust inquiry", agent:{name:"Investigator Cole Ashby", role:"Investigator's Notepad"},
  standingLabel:"Inquiry credibility", readingShort:"Economists", readingLabel:"Economists of Monopoly",
  dossierName:"ECONOMISTS OF MONOPOLY", enterLabel:"Open the inquiry", subt:"A deduction game inside the Cygnet antitrust inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (an all-controlling conspiracy) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"ceo", items:[
      {id:"ceo", label:"Roland Vane — the founder & chief executive"},
      {id:"strategist", label:"The chief strategy officer"},
      {id:"regulator", label:"The antitrust regulator"} ]},
    where:{ title:"Where it culminates", truth:"strategyfiles", items:[
      {id:"market", label:"The Marketplace & Rivals"},
      {id:"boardroom", label:"The Company Boardroom"},
      {id:"strategyfiles", label:"The Strategy Office's Files"} ]},
    what:{ title:"What is happening", truth:"predation", items:[
      {id:"empire", label:"A sinister plot to control everything"},
      {id:"merit", label:"Nothing wrong — just a better competitor winning"},
      {id:"predation", label:"Below-cost pricing & a buried internal study"} ]}
  },
  PLACES:{
    market:{name:"The Marketplace & Rivals", xy:[140,90]},
    boardroom:{name:"The Company Boardroom", xy:[330,240]},
    strategyfiles:{name:"The Strategy Office's Files", xy:[520,90]}
  },
  EDGES:[["market","boardroom"],["boardroom","strategyfiles"]],
  CHARACTERS:{
    analyst:{ name:"Analyst Mira Kade", role:"Strategy analyst", face:"📊", badge:"K", legend:"the strategy office", hint:"Ran the numbers showing the price war lost money on purpose — then watched them vanish." },
    clerk:{ name:"The Records Clerk", role:"Company records clerk", face:"🗂", badge:"C", legend:"the boardroom", hint:"Keeps the board minutes and the study stamped 'do not distribute'." },
    rival:{ name:"Rival Founder Estes", role:"Rival startup founder", face:"💻", badge:"E", legend:"the marketplace", hint:"Watched Cygnet undercut him below cost until his funding dried up." }
  },
  TOPICMAP:{
    market:{ analyst:["monopolytheory","pricecomp"], clerk:["shermanact","industry"], rival:["trusts","enterprise"] },
    boardroom:{ analyst:["creativedest","monopcomp"], clerk:["imperfect","dominant"], rival:["control","administered"] },
    strategyfiles:{ analyst:["scp","barriers"], clerk:["trustbust","predatorytest"], rival:["paradox","foreclosure"] }
  },
  TOPICS:{
    // cell: Analyst Mira Kade @ The Marketplace & Rivals
    monopolytheory:{ sci:"Antoine Augustin Cournot (1801-1877)", topic:"The theory of monopoly", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: Analyst Mira Kade @ The Marketplace & Rivals
    pricecomp:{ sci:"Joseph Bertrand (1822-1900)", topic:"Price competition", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: The Records Clerk @ The Marketplace & Rivals
    shermanact:{ sci:"John Sherman (1823-1900)", topic:"The Antitrust Act", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: The Records Clerk @ The Marketplace & Rivals
    industry:{ sci:"Alfred Marshall (1842-1924)", topic:"The economics of industry", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: Rival Founder Estes @ The Marketplace & Rivals
    trusts:{ sci:"John Bates Clark (1847-1938)", topic:"The control of the trusts", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: Rival Founder Estes @ The Marketplace & Rivals
    enterprise:{ sci:"Thorstein Veblen (1857-1929)", topic:"The theory of business enterprise", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: Analyst Mira Kade @ The Company Boardroom
    creativedest:{ sci:"Joseph A. Schumpeter (1883-1950)", topic:"Creative destruction & monopoly", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: Analyst Mira Kade @ The Company Boardroom
    monopcomp:{ sci:"Edward Chamberlin (1899-1967)", topic:"Monopolistic competition", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The Records Clerk @ The Company Boardroom
    imperfect:{ sci:"Joan Robinson (1903-1983)", topic:"Imperfect competition", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The Records Clerk @ The Company Boardroom
    dominant:{ sci:"Heinrich von Stackelberg (1905-1946)", topic:"The dominant firm & leadership", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: Rival Founder Estes @ The Company Boardroom
    control:{ sci:"Adolf A. Berle (1895-1971)", topic:"The modern corporation & control", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: Rival Founder Estes @ The Company Boardroom
    administered:{ sci:"Gardiner C. Means (1896-1988)", topic:"Administered prices", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Analyst Mira Kade @ The Strategy Office's Files
    scp:{ sci:"Edward S. Mason (1899-1992)", topic:"Structure, conduct & performance", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Analyst Mira Kade @ The Strategy Office's Files
    barriers:{ sci:"Joe S. Bain (1912-1991)", topic:"Barriers to entry", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The Records Clerk @ The Strategy Office's Files
    trustbust:{ sci:"Thurman Arnold (1891-1969)", topic:"Trustbusting & enforcement", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The Records Clerk @ The Strategy Office's Files
    predatorytest:{ sci:"Phillip Areeda (1930-1995)", topic:"The test for predatory pricing", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: Rival Founder Estes @ The Strategy Office's Files
    paradox:{ sci:"Robert H. Bork (1927-2012)", topic:"The antitrust paradox", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: Rival Founder Estes @ The Strategy Office's Files
    foreclosure:{ sci:"Oliver E. Williamson (1932-2020)", topic:"Markets, hierarchies & foreclosure", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    analyst:{ market:"", boardroom:"", strategyfiles:"" },
    clerk:{ market:"", boardroom:"", strategyfiles:"" },
    rival:{ market:"", boardroom:"", strategyfiles:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"empire", dismissalWhat:"merit",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};