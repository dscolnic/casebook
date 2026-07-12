// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"j_bank", title:"The Sterling Trust Collapse", discipline:"Banking & Systemic Risk",
  teaser:"A pillar bank that passed every stress test failed in a single weekend. A foreign raid on the currency? A once-a-century storm? Or leverage no model was allowed to see?", overclaimTag:"an attack on the currency", truthTag:"hidden leverage & gamed models",
  venue:"the Sterling Trust failure inquiry", agent:{name:"Investigator Cara Finch", role:"Investigator's Notepad"},
  standingLabel:"Inquiry credibility", readingShort:"Economists", readingLabel:"Students of Panics & Risk",
  dossierName:"STUDENTS OF PANICS & RISK", enterLabel:"Open the inquiry", subt:"A deduction game inside the Sterling Trust failure inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (an attack on the currency) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"cro", items:[
      {id:"ceo", label:"The bank's chief executive"},
      {id:"cro", label:"Adrian Sable — the chief risk officer"},
      {id:"regulator", label:"The bank supervisor"} ]},
    where:{ title:"Where it culminates", truth:"riskfiles", items:[
      {id:"dealing", label:"The Dealing Room"},
      {id:"supervisor", label:"The Supervisor's Office"},
      {id:"riskfiles", label:"The Risk Department's Model Files"} ]},
    what:{ title:"What is happening", truth:"leverage", items:[
      {id:"attack", label:"A foreign raid on the currency broke the bank"},
      {id:"storm", label:"A once-a-century storm no one could foresee"},
      {id:"leverage", label:"Hidden leverage & risk models quietly gamed"} ]}
  },
  PLACES:{
    dealing:{name:"The Dealing Room", xy:[140,90]},
    supervisor:{name:"The Supervisor's Office", xy:[330,240]},
    riskfiles:{name:"The Risk Department's Model Files", xy:[520,90]}
  },
  EDGES:[["dealing","supervisor"],["supervisor","riskfiles"]],
  CHARACTERS:{
    quant:{ name:"Quant Analyst Priya Sen", role:"Risk quant", face:"🧮", badge:"P", legend:"the risk desk", hint:"Built the model; watched its worst-case number get dialed down by hand." },
    clerk:{ name:"The Records Clerk", role:"Risk-department clerk", face:"🗂", badge:"C", legend:"the risk office", hint:"Keeps the model sign-offs and the exposures kept off the main book." },
    dealer:{ name:"Head Dealer Marlow", role:"Head bond dealer", face:"📉", badge:"M", legend:"the dealing room", hint:"Ran the leverage everyone praised until the repo lenders vanished." }
  },
  TOPICMAP:{
    dealing:{ quant:["crowds","lastresort"], clerk:["debtdeflation","uncertainty"], dealer:["liquidity","manias"] },
    supervisor:{ quant:["instability","portfolio"], clerk:["fattails","goodhart"], dealer:["exuberance","modelsbad"] },
    riskfiles:{ quant:["thistime","bankleverage"], clerk:["warning","repo"], dealer:["blackswan","systemic"] }
  },
  TOPICS:{
    // cell: Quant Analyst Priya Sen @ The Dealing Room
    crowds:{ sci:"Charles Mackay (1814-1889)", topic:"Popular delusions & the madness of crowds", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: Quant Analyst Priya Sen @ The Dealing Room
    lastresort:{ sci:"Walter Bagehot (1826-1877)", topic:"Lombard Street & the lender of last resort", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: The Records Clerk @ The Dealing Room
    debtdeflation:{ sci:"Irving Fisher (1867-1947)", topic:"Debt-deflation", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: The Records Clerk @ The Dealing Room
    uncertainty:{ sci:"Frank Knight (1885-1972)", topic:"Risk versus uncertainty", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: Head Dealer Marlow @ The Dealing Room
    liquidity:{ sci:"John Maynard Keynes (1883-1946)", topic:"Liquidity & animal spirits", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: Head Dealer Marlow @ The Dealing Room
    manias:{ sci:"Charles P. Kindleberger (1910-2003)", topic:"Manias, panics & crashes", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: Quant Analyst Priya Sen @ The Supervisor's Office
    instability:{ sci:"Hyman Minsky (1919-1996)", topic:"The financial-instability hypothesis", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: Quant Analyst Priya Sen @ The Supervisor's Office
    portfolio:{ sci:"Harry Markowitz (1927-2023)", topic:"Portfolio risk & the model", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The Records Clerk @ The Supervisor's Office
    fattails:{ sci:"Benoit Mandelbrot (1924-2010)", topic:"Fat tails & the misbehavior of markets", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The Records Clerk @ The Supervisor's Office
    goodhart:{ sci:"Charles Goodhart (b. 1936)", topic:"Goodhart's law & gamed metrics", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: Head Dealer Marlow @ The Supervisor's Office
    exuberance:{ sci:"Robert Shiller (b. 1946)", topic:"Bubbles & irrational exuberance", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: Head Dealer Marlow @ The Supervisor's Office
    modelsbad:{ sci:"Emanuel Derman (b. 1945)", topic:"Models behaving badly", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Quant Analyst Priya Sen @ The Risk Department's Model Files
    thistime:{ sci:"Carmen Reinhart (b. 1955)", topic:"'This time is different'", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Quant Analyst Priya Sen @ The Risk Department's Model Files
    bankleverage:{ sci:"Anat Admati (b. 1956)", topic:"Bank leverage & the bankers' new clothes", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The Records Clerk @ The Risk Department's Model Files
    warning:{ sci:"Raghuram Rajan (b. 1963)", topic:"The 2005 warning on hidden risk", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The Records Clerk @ The Risk Department's Model Files
    repo:{ sci:"Gary Gorton (shadow-banking economist)", topic:"The run on repo & shadow banking", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: Head Dealer Marlow @ The Risk Department's Model Files
    blackswan:{ sci:"Nassim Nicholas Taleb (b. 1960)", topic:"The black swan & tail risk", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: Head Dealer Marlow @ The Risk Department's Model Files
    systemic:{ sci:"Andrew W. Lo (b. 1960)", topic:"Systemic risk & adaptive markets", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    quant:{ dealing:"", supervisor:"", riskfiles:"" },
    clerk:{ dealing:"", supervisor:"", riskfiles:"" },
    dealer:{ dealing:"", supervisor:"", riskfiles:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"attack", dismissalWhat:"storm",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};