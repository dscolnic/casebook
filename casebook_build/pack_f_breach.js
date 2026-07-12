// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"f_breach", title:"The Halcyon Data Breach", discipline:"Computer Security & Information Systems",
  teaser:"Ninety million records walked out the door overnight. A nation-state mastermind? An unstoppable zero-day? Or a patch that was never applied and an alarm that was switched off?", overclaimTag:"a nation-state mastermind", truthTag:"a known-unpatched flaw and a silenced alarm",
  venue:"the Halcyon breach inquiry", agent:{name:"Investigator Nora Vance", role:"Investigator's Notepad"},
  standingLabel:"Inquiry credibility", readingShort:"Pioneers", readingLabel:"Computer-Security Pioneers",
  dossierName:"COMPUTER-SECURITY PIONEERS", enterLabel:"Open the inquiry", subt:"A deduction game inside the Halcyon breach inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (a nation-state mastermind) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"cto", items:[
      {id:"hacker", label:"A foreign intrusion crew"},
      {id:"cto", label:"Dane Ferro — the firm's security chief"},
      {id:"vendor", label:"The software vendor"} ]},
    where:{ title:"Where it culminates", truth:"office", items:[
      {id:"servers", label:"The Customer Database Servers"},
      {id:"soc", label:"The Security Operations Centre"},
      {id:"office", label:"The Security Chief's Office"} ]},
    what:{ title:"What is happening", truth:"unpatched", items:[
      {id:"mastermind", label:"A genius nation-state hacker breached us"},
      {id:"zeroday", label:"An unavoidable zero-day — no one could have stopped it"},
      {id:"unpatched", label:"A known-unpatched system and an alert switched off"} ]}
  },
  PLACES:{
    servers:{name:"The Customer Database Servers", xy:[140,90]},
    soc:{name:"The Security Operations Centre", xy:[330,240]},
    office:{name:"The Security Chief's Office", xy:[520,90]}
  },
  EDGES:[["servers","soc"],["soc","office"]],
  CHARACTERS:{
    analyst:{ name:"The SOC Analyst", role:"Security-operations analyst", face:"🖥", badge:"A", legend:"the operations centre", hint:"Watched the alert fire for weeks; it was acknowledged, then muted." },
    admin:{ name:"Sysadmin Rao", role:"Systems administrator", face:"🔧", badge:"S", legend:"the server room", hint:"Ran the scanners; the critical patch sat in the queue, signed off as 'deferred'." },
    clerk:{ name:"The Clerk", role:"Records clerk", face:"🗂", badge:"C", legend:"the office", hint:"Keeps the risk register — and the memo that accepted the risk and moved on." }
  },
  TOPICMAP:{
    servers:{ analyst:["b_threatmon","b_ids"], admin:["b_kernel","b_access"], clerk:["b_leastpriv","b_protprin"] },
    soc:{ analyst:["b_bella","b_lapadula"], admin:["b_biba","b_virus"], clerk:["b_worm","b_passwd"] },
    office:{ analyst:["b_trust","b_timeshare"], admin:["b_ware","b_risks"], clerk:["b_cuckoo","b_auth"] }
  },
  TOPICS:{
    // cell: The SOC Analyst @ The Customer Database Servers
    b_threatmon:{ sci:"James P. Anderson (1930-2007)", topic:"Computer-security threat monitoring", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: The SOC Analyst @ The Customer Database Servers
    b_ids:{ sci:"Dorothy Denning (b. 1945)", topic:"Intrusion detection", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: Sysadmin Rao @ The Customer Database Servers
    b_kernel:{ sci:"Roger Schell (b. 1939)", topic:"The security kernel & trusted systems", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: Sysadmin Rao @ The Customer Database Servers
    b_access:{ sci:"Butler Lampson (b. 1943)", topic:"Access control & protection", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Customer Database Servers
    b_leastpriv:{ sci:"Jerome Saltzer (b. 1939)", topic:"Protection & least privilege", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Customer Database Servers
    b_protprin:{ sci:"Michael Schroeder (computer-security pioneer)", topic:"The principles of protecting information", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: The SOC Analyst @ The Security Operations Centre
    b_bella:{ sci:"David Elliott Bell (security-model pioneer)", topic:"The Bell-LaPadula confidentiality model", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: The SOC Analyst @ The Security Operations Centre
    b_lapadula:{ sci:"Leonard LaPadula (security-model pioneer)", topic:"Multilevel security models", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: Sysadmin Rao @ The Security Operations Centre
    b_biba:{ sci:"Kenneth Biba (integrity-model pioneer)", topic:"The integrity model", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: Sysadmin Rao @ The Security Operations Centre
    b_virus:{ sci:"Fred Cohen (b. 1956)", topic:"The computer virus, defined", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Security Operations Centre
    b_worm:{ sci:"Eugene Spafford (b. 1956)", topic:"Worms, malware & incident analysis", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Security Operations Centre
    b_passwd:{ sci:"Robert Morris Sr. (1932-2011)", topic:"Password security & one-way hashing", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: The SOC Analyst @ The Security Chief's Office
    b_trust:{ sci:"Ken Thompson (b. 1943)", topic:"Trusting trust & Unix security", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: The SOC Analyst @ The Security Chief's Office
    b_timeshare:{ sci:"Fernando Corbató (1926-2019)", topic:"Time-sharing & the computer password", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: Sysadmin Rao @ The Security Chief's Office
    b_ware:{ sci:"Willis Ware (1920-2013)", topic:"Computer security & privacy safeguards", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: Sysadmin Rao @ The Security Chief's Office
    b_risks:{ sci:"Peter G. Neumann (b. 1932)", topic:"Computer-related risks to the public", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Security Chief's Office
    b_cuckoo:{ sci:"Cliff Stoll (b. 1950)", topic:"Tracking the intruder through the logs", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Security Chief's Office
    b_auth:{ sci:"Roger Needham (1934-2003)", topic:"Authentication protocols & stored passwords", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    analyst:{ servers:"", soc:"", office:"" },
    admin:{ servers:"", soc:"", office:"" },
    clerk:{ servers:"", soc:"", office:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"mastermind", dismissalWhat:"zeroday",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};