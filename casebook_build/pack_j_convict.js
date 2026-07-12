// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"j_convict", title:"The Vale Conviction", discipline:"Law: Criminal Evidence & Due Process",
  teaser:"A man is doing life for a killing he swears he never did. A vast plot to frame him? Just a guilty man's excuses? Or something the jury was never allowed to see?", overclaimTag:"a vast frame-up conspiracy", truthTag:"a buried exculpatory file",
  venue:"the Vale conviction-review inquiry", agent:{name:"Investigator Ruth Calder", role:"Investigator's Notepad"},
  standingLabel:"Review-board credibility", readingShort:"Jurists", readingLabel:"Jurists of Evidence & Proof",
  dossierName:"JURISTS OF EVIDENCE", enterLabel:"Open the inquiry", subt:"A deduction game inside the Vale conviction-review", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (a vast frame-up conspiracy) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"prosecutor", items:[
      {id:"detective", label:"The lead detective"},
      {id:"prosecutor", label:"District Attorney Miles Crade — the prosecutor"},
      {id:"judge", label:"The trial judge"} ]},
    where:{ title:"Where it culminates", truth:"dafiles", items:[
      {id:"precinct", label:"The Police Precinct & Lineup Room"},
      {id:"courthouse", label:"The Courthouse & Trial Record"},
      {id:"dafiles", label:"The District Attorney's Case Files"} ]},
    what:{ title:"What is happening", truth:"brady", items:[
      {id:"frameup", label:"A vast conspiracy framed an innocent man"},
      {id:"guilty", label:"Nothing amiss — the right man was convicted"},
      {id:"brady", label:"A buried exculpatory file & a rigged lineup"} ]}
  },
  PLACES:{
    precinct:{name:"The Police Precinct & Lineup Room", xy:[140,90]},
    courthouse:{name:"The Courthouse & Trial Record", xy:[330,240]},
    dafiles:{name:"The District Attorney's Case Files", xy:[520,90]}
  },
  EDGES:[["precinct","courthouse"],["courthouse","dafiles"]],
  CHARACTERS:{
    paralegal:{ name:"Paralegal Nora Wyss", role:"Defense paralegal", face:"📎", badge:"N", legend:"the defense office", hint:"Boxed the old case file; found a lab report the defense was never handed." },
    clerk:{ name:"The Court Clerk", role:"Courthouse records clerk", face:"🗂", badge:"C", legend:"the courthouse", hint:"Keeps the transcript and the exhibit log that never quite matched." },
    sergeant:{ name:"Desk Sergeant Boone", role:"Retired desk sergeant", face:"🚔", badge:"B", legend:"the precinct", hint:"Ran the room the night of the lineup; saw the witness steered to a face." }
  },
  TOPICMAP:{
    precinct:{ paralegal:["dueprocess","ratio"], clerk:["presumption","judicialevidence"], sergeant:["cautionrule","evidencelaw"] },
    courthouse:{ paralegal:["proof","judicialproof"], clerk:["testimony","rightcounsel"], sergeant:["exclusion","innocents"] },
    dafiles:{ paralegal:["disclosure","procedure"], clerk:["memory","lineups"], sergeant:["dnaexon","anatomy"] }
  },
  TOPICS:{
    // cell: Paralegal Nora Wyss @ The Police Precinct & Lineup Room
    dueprocess:{ sci:"Edward Coke (1552-1634)", topic:"Due process & the law of the land", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: Paralegal Nora Wyss @ The Police Precinct & Lineup Room
    ratio:{ sci:"William Blackstone (1723-1780)", topic:"Blackstone's ratio: ten guilty spared", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: The Court Clerk @ The Police Precinct & Lineup Room
    presumption:{ sci:"Cesare Beccaria (1738-1794)", topic:"The presumption of innocence", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: The Court Clerk @ The Police Precinct & Lineup Room
    judicialevidence:{ sci:"Jeremy Bentham (1748-1832)", topic:"The rationale of judicial evidence", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: Desk Sergeant Boone @ The Police Precinct & Lineup Room
    cautionrule:{ sci:"Matthew Hale (1609-1676)", topic:"The caution against easy accusation", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: Desk Sergeant Boone @ The Police Precinct & Lineup Room
    evidencelaw:{ sci:"Simon Greenleaf (1783-1853)", topic:"The treatise on evidence", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: Paralegal Nora Wyss @ The Courthouse & Trial Record
    proof:{ sci:"James Fitzjames Stephen (1829-1894)", topic:"The criminal law & the burden of proof", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: Paralegal Nora Wyss @ The Courthouse & Trial Record
    judicialproof:{ sci:"John Henry Wigmore (1863-1943)", topic:"The science of judicial proof", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The Court Clerk @ The Courthouse & Trial Record
    testimony:{ sci:"Hugo Münsterberg (1863-1916)", topic:"The psychology of the witness stand", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The Court Clerk @ The Courthouse & Trial Record
    rightcounsel:{ sci:"Hugo Black (1886-1971)", topic:"The right to counsel", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: Desk Sergeant Boone @ The Courthouse & Trial Record
    exclusion:{ sci:"Benjamin Cardozo (1870-1938)", topic:"The exclusionary rule & the constable's blunder", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: Desk Sergeant Boone @ The Courthouse & Trial Record
    innocents:{ sci:"Edwin Borchard (1884-1948)", topic:"Convicting the Innocent", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Paralegal Nora Wyss @ The District Attorney's Case Files
    disclosure:{ sci:"William O. Douglas (1898-1980)", topic:"Brady v. Maryland & the duty to disclose", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Paralegal Nora Wyss @ The District Attorney's Case Files
    procedure:{ sci:"Earl Warren (1891-1974)", topic:"Criminal procedure & the fair trial", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The Court Clerk @ The District Attorney's Case Files
    memory:{ sci:"Elizabeth Loftus (b. 1944)", topic:"The malleability of memory", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The Court Clerk @ The District Attorney's Case Files
    lineups:{ sci:"Gary L. Wells (b. 1950)", topic:"Eyewitness ID & the suggestive lineup", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: Desk Sergeant Boone @ The District Attorney's Case Files
    dnaexon:{ sci:"Barry Scheck (b. 1949)", topic:"DNA exoneration & the Innocence Project", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: Desk Sergeant Boone @ The District Attorney's Case Files
    anatomy:{ sci:"Brandon Garrett (wrongful-conviction scholar)", topic:"The anatomy of a wrongful conviction", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    paralegal:{ precinct:"", courthouse:"", dafiles:"" },
    clerk:{ precinct:"", courthouse:"", dafiles:"" },
    sergeant:{ precinct:"", courthouse:"", dafiles:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"frameup", dismissalWhat:"guilty",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};