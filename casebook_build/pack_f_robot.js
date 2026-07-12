// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"f_robot", title:"The Cell-9 Robot", discipline:"Robotics & Autonomous Systems",
  teaser:"A robot arm killed a technician inside its safety cage. A hacked machine? A careless worker? Or a safety lock someone had bypassed?", overclaimTag:"a hacked machine", truthTag:"a bypassed safety interlock and a known fault",
  venue:"the Cell-9 robotics inquiry", agent:{name:"Investigator Mara Quint", role:"Investigator's Notepad"},
  standingLabel:"Inquiry credibility", readingShort:"Pioneers", readingLabel:"Robotics & Autonomy Pioneers",
  dossierName:"ROBOTICS & AUTONOMY PIONEERS", enterLabel:"Open the inquiry", subt:"A deduction game inside the Cell-9 robotics inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (a hacked machine) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"automation", items:[
      {id:"hacker", label:"An outside attacker who seized the machine"},
      {id:"automation", label:"Guy Halloran — the plant automation manager"},
      {id:"worker", label:"The maintenance crew"} ]},
    where:{ title:"Where it culminates", truth:"office", items:[
      {id:"cell", label:"The Robot Cell & Safety Cage"},
      {id:"controls", label:"The Robot Control & Interlock Room"},
      {id:"office", label:"The Automation Manager's Office"} ]},
    what:{ title:"What is happening", truth:"interlock", items:[
      {id:"hack", label:"The robot was hacked and turned deadly"},
      {id:"operator", label:"Simple operator error — the worker stepped in"},
      {id:"interlock", label:"A safety interlock bypassed and a known fault left unfixed"} ]}
  },
  PLACES:{
    cell:{name:"The Robot Cell & Safety Cage", xy:[140,90]},
    controls:{name:"The Robot Control & Interlock Room", xy:[330,240]},
    office:{name:"The Automation Manager's Office", xy:[520,90]}
  },
  EDGES:[["cell","controls"],["controls","office"]],
  CHARACTERS:{
    technician:{ name:"The Robot Technician", role:"Robotics maintenance tech", face:"🤖", badge:"R", legend:"the robot cell", hint:"Services the arm; the door interlock had been jumpered out to keep the line moving." },
    controls2:{ name:"The Controls Engineer", role:"Control-systems engineer", face:"🎛", badge:"E", legend:"the control room", hint:"Reads the logs; the arm had lunged unexpectedly before, and it was written up." },
    clerk:{ name:"The Clerk", role:"Safety-records clerk", face:"🗂", badge:"C", legend:"the office", hint:"Keeps the incident file — and the order to bypass the guard 'temporarily'." }
  },
  TOPICMAP:{
    cell:{ technician:["r_firstrobot","r_industrial"], controls2:["r_arm","r_shakey"], clerk:["r_planning","r_behavior"] },
    controls:{ technician:["r_legged","r_navigation"], controls2:["r_activeperc","r_vision"], clerk:["r_motion","r_autodrive"] },
    office:{ technician:["r_selfdrive","r_intelligent"], controls2:["r_field","r_kalman"], clerk:["r_fuzzy","r_grasp"] }
  },
  TOPICS:{
    // cell: The Robot Technician @ The Robot Cell & Safety Cage
    r_firstrobot:{ sci:"George Devol (1912-2011)", topic:"The first industrial robot", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: The Robot Technician @ The Robot Cell & Safety Cage
    r_industrial:{ sci:"Joseph Engelberger (1925-2015)", topic:"Industrial robotics", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: The Controls Engineer @ The Robot Cell & Safety Cage
    r_arm:{ sci:"Victor Scheinman (1942-2016)", topic:"The programmable robotic arm", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: The Controls Engineer @ The Robot Cell & Safety Cage
    r_shakey:{ sci:"Charles Rosen (1917-2002)", topic:"Shakey & the mobile robot", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Robot Cell & Safety Cage
    r_planning:{ sci:"Nils Nilsson (1933-2019)", topic:"Robot planning & the A* search", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Robot Cell & Safety Cage
    r_behavior:{ sci:"Rodney Brooks (b. 1954)", topic:"Behaviour-based robotics", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: The Robot Technician @ The Robot Control & Interlock Room
    r_legged:{ sci:"Marc Raibert (b. 1949)", topic:"Dynamic & legged robots", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: The Robot Technician @ The Robot Control & Interlock Room
    r_navigation:{ sci:"Hans Moravec (b. 1948)", topic:"Robot navigation & perception", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The Controls Engineer @ The Robot Control & Interlock Room
    r_activeperc:{ sci:"Ruzena Bajcsy (b. 1933)", topic:"Active perception", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The Controls Engineer @ The Robot Control & Interlock Room
    r_vision:{ sci:"Takeo Kanade (b. 1945)", topic:"Computer vision for robots", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Robot Control & Interlock Room
    r_motion:{ sci:"Oussama Khatib (robot-control pioneer)", topic:"Robot motion & obstacle avoidance", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Robot Control & Interlock Room
    r_autodrive:{ sci:"Ernst Dickmanns (b. 1936)", topic:"Vision-guided autonomous driving", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: The Robot Technician @ The Automation Manager's Office
    r_selfdrive:{ sci:"Sebastian Thrun (b. 1967)", topic:"Self-driving & probabilistic robotics", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: The Robot Technician @ The Automation Manager's Office
    r_intelligent:{ sci:"Raj Reddy (b. 1937)", topic:"Robotics & intelligent systems", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The Controls Engineer @ The Automation Manager's Office
    r_field:{ sci:"Red Whittaker (b. 1948)", topic:"Field & autonomous vehicles", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The Controls Engineer @ The Automation Manager's Office
    r_kalman:{ sci:"Rudolf Kálmán (1930-2016)", topic:"The Kalman filter & state estimation", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Automation Manager's Office
    r_fuzzy:{ sci:"Lotfi Zadeh (1921-2017)", topic:"Fuzzy logic & control", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Automation Manager's Office
    r_grasp:{ sci:"Ken Goldberg (b. 1961)", topic:"Robot grasping & reliability", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    technician:{ cell:"", controls:"", office:"" },
    controls2:{ cell:"", controls:"", office:"" },
    clerk:{ cell:"", controls:"", office:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"hack", dismissalWhat:"operator",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};