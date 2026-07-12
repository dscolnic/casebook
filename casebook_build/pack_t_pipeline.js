// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"t_pipeline", title:"The Brant Hollow Pipeline", discipline:"Pipeline Integrity & Fluid Mechanics",
  teaser:"A gas main ruptured and levelled a street block. A deliberate strike? An act of God? Or corrosion an inspection would have caught?", overclaimTag:"sabotage or a strike", truthTag:"corrosion & a skipped inline inspection",
  venue:"the Brant Hollow pipeline inquiry", agent:{name:"Investigator Rhea Colton", role:"Investigator's Notepad"},
  standingLabel:"Inquiry credibility", readingShort:"Pioneers", readingLabel:"Fluid-Flow & Corrosion Pioneers",
  dossierName:"FLUID-FLOW & CORROSION PIONEERS", enterLabel:"Open the inquiry", subt:"A deduction game inside the Brant Hollow pipeline inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (sabotage or a strike) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"operator", items:[
      {id:"operator", label:"Hollis Trask — pipeline operator"},
      {id:"controller", label:"The gas control dispatcher"},
      {id:"regulator", label:"The pipeline safety regulator"} ]},
    where:{ title:"Where it culminates", truth:"office", items:[
      {id:"rightofway", label:"The Right-of-Way & Rupture Site"},
      {id:"control", label:"The Gas Control Center"},
      {id:"office", label:"The Operator's Integrity Office"} ]},
    what:{ title:"What is happening", truth:"corrosion", items:[
      {id:"attack", label:"Sabotage or a third-party strike"},
      {id:"freak", label:"A freak ground shift — an act of God"},
      {id:"corrosion", label:"Advanced corrosion with the inline inspection skipped"} ]}
  },
  PLACES:{
    rightofway:{name:"The Right-of-Way & Rupture Site", xy:[140,90]},
    control:{name:"The Gas Control Center", xy:[330,240]},
    office:{name:"The Operator's Integrity Office", xy:[520,90]}
  },
  EDGES:[["rightofway","control"],["control","office"]],
  CHARACTERS:{
    patrol:{ name:"Line-Walker Dumas", role:"Pipeline patroller", face:"🚶", badge:"P", legend:"the right-of-way", hint:"Walks the line; reported the bubbling ground and bare, pitted pipe." },
    dispatch:{ name:"The Dispatcher", role:"Gas-control dispatcher", face:"🖥", badge:"D", legend:"the control center", hint:"Watched the pressure drop; the SCADA alarm was standing when it let go." },
    clerk:{ name:"The Clerk", role:"Integrity-records clerk", face:"🗂", badge:"C", legend:"the office", hint:"Keeps the inspection schedule and the pig run that was cancelled." }
  },
  TOPICMAP:{
    rightofway:{ patrol:["pp_bernoulli","pp_hagen"], dispatch:["pp_poiseuille","pp_weisbach"], clerk:["pp_moody","pp_colebrook"] },
    control:{ patrol:["pp_joukowsky","pp_vdwaals"], dispatch:["pp_graham","pp_wagner"], clerk:["pp_fontana","pp_hackerman"] },
    office:{ patrol:["pp_kuhn","pp_inglis"], dispatch:["pp_griffith","pp_irwin"], clerk:["pp_firestone","pp_venturi"] }
  },
  TOPICS:{
    // cell: Line-Walker Dumas @ The Right-of-Way & Rupture Site
    pp_bernoulli:{ sci:"Daniel Bernoulli (1700-1782)", topic:"Flow, pressure & Bernoulli's principle", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: Line-Walker Dumas @ The Right-of-Way & Rupture Site
    pp_hagen:{ sci:"Gotthilf Hagen (1797-1884)", topic:"Laminar flow in pipes", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: The Dispatcher @ The Right-of-Way & Rupture Site
    pp_poiseuille:{ sci:"Jean Poiseuille (1797-1869)", topic:"Viscous flow in pipes", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: The Dispatcher @ The Right-of-Way & Rupture Site
    pp_weisbach:{ sci:"Julius Weisbach (1806-1871)", topic:"Pipe friction & head loss", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Right-of-Way & Rupture Site
    pp_moody:{ sci:"Lewis Ferry Moody (1880-1953)", topic:"The Moody friction chart", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Right-of-Way & Rupture Site
    pp_colebrook:{ sci:"Cyril F. Colebrook (pipe-flow engineer)", topic:"Pipe roughness & friction", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: Line-Walker Dumas @ The Gas Control Center
    pp_joukowsky:{ sci:"Nikolai Joukowsky (1847-1921)", topic:"Water hammer & pressure surge", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: Line-Walker Dumas @ The Gas Control Center
    pp_vdwaals:{ sci:"Johannes van der Waals (1837-1923)", topic:"Real gases at high pressure", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The Dispatcher @ The Gas Control Center
    pp_graham:{ sci:"Thomas Graham (1805-1869)", topic:"Gas diffusion & leakage", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The Dispatcher @ The Gas Control Center
    pp_wagner:{ sci:"Carl Wagner (1901-1977)", topic:"Oxidation & corrosion theory", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Gas Control Center
    pp_fontana:{ sci:"Mars G. Fontana (1910-1988)", topic:"Corrosion engineering", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Gas Control Center
    pp_hackerman:{ sci:"Norman Hackerman (1912-2007)", topic:"Corrosion inhibition & surfaces", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Line-Walker Dumas @ The Operator's Integrity Office
    pp_kuhn:{ sci:"Robert J. Kuhn (cathodic-protection engineer)", topic:"Pipeline cathodic protection", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Line-Walker Dumas @ The Operator's Integrity Office
    pp_inglis:{ sci:"Charles Inglis (1875-1952)", topic:"Stress concentration at flaws", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The Dispatcher @ The Operator's Integrity Office
    pp_griffith:{ sci:"A. A. Griffith (1893-1963)", topic:"Brittle fracture & crack growth", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The Dispatcher @ The Operator's Integrity Office
    pp_irwin:{ sci:"George R. Irwin (1907-1998)", topic:"Fracture mechanics & stress intensity", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Operator's Integrity Office
    pp_firestone:{ sci:"Floyd Firestone (1898-1986)", topic:"Ultrasonic flaw detection", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Operator's Integrity Office
    pp_venturi:{ sci:"Giovanni Battista Venturi (1746-1822)", topic:"The Venturi effect & flow metering", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    patrol:{ rightofway:"", control:"", office:"" },
    dispatch:{ rightofway:"", control:"", office:"" },
    clerk:{ rightofway:"", control:"", office:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"attack", dismissalWhat:"freak",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};