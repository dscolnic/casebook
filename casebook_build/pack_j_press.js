// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"j_press", title:"The Ashford Dispatch", discipline:"Journalism Ethics & Verification",
  teaser:"A prize-winning series turns out to rest on a source no one can find. A plot to smear the paper? Just an honest mistake? Or a reporter's inventions waved through every check?", overclaimTag:"a plot against the paper", truthTag:"fabricated sourcing",
  venue:"the Ashford Dispatch review", agent:{name:"Investigator Nadia Kerr", role:"Investigator's Notepad"},
  standingLabel:"Newsroom credibility", readingShort:"Editors", readingLabel:"Figures of the Free Press",
  dossierName:"FIGURES OF THE FREE PRESS", enterLabel:"Open the review", subt:"A deduction game inside the Ashford Dispatch review", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (a plot against the paper) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"reporter", items:[
      {id:"reporter", label:"Corin Faye — the star reporter"},
      {id:"editor", label:"The managing editor"},
      {id:"publisher", label:"The publisher"} ]},
    where:{ title:"Where it culminates", truth:"sourcefiles", items:[
      {id:"newsroom", label:"The Newsroom Floor"},
      {id:"editdesk", label:"The Editor's Desk"},
      {id:"sourcefiles", label:"The Source & Fact-Check Files"} ]},
    what:{ title:"What is happening", truth:"fabrication", items:[
      {id:"smear", label:"An outside plot planted lies to smear the paper"},
      {id:"mistake", label:"Nothing sinister — an honest reporting error"},
      {id:"fabrication", label:"Invented sources waved past every check"} ]}
  },
  PLACES:{
    newsroom:{name:"The Newsroom Floor", xy:[140,90]},
    editdesk:{name:"The Editor's Desk", xy:[330,240]},
    sourcefiles:{name:"The Source & Fact-Check Files", xy:[520,90]}
  },
  EDGES:[["newsroom","editdesk"],["editdesk","sourcefiles"]],
  CHARACTERS:{
    factchecker:{ name:"Fact-Checker Jonah Pell", role:"Newsroom fact-checker", face:"✅", badge:"P", legend:"the newsroom", hint:"Flagged the quotes he couldn't verify — and was told to move on." },
    clerk:{ name:"The Records Clerk", role:"Editorial records clerk", face:"🗂", badge:"C", legend:"the source files", hint:"Keeps the assignment logs and the source file that came back empty." },
    stringer:{ name:"Local Stringer Ames", role:"Local stringer", face:"📰", badge:"A", legend:"the field", hint:"Worked the same town; none of the named witnesses ever existed." }
  },
  TOPICMAP:{
    newsroom:{ factchecker:["freepress","accuracy"], clerk:["record","muckrake"], stringer:["shame","publicopinion"] },
    editdesk:{ factchecker:["presscrit","fromrecord"], clerk:["broadcast","thepress"], stringer:["fourtheories","gatekeeper"] },
    sourcefiles:{ factchecker:["editor","whatsnews"], clerk:["objritual","sourcing"], stringer:["objorigins","verification"] }
  },
  TOPICS:{
    // cell: Fact-Checker Jonah Pell @ The Newsroom Floor
    freepress:{ sci:"John Peter Zenger (1697-1746)", topic:"Truth & the free press", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: Fact-Checker Jonah Pell @ The Newsroom Floor
    accuracy:{ sci:"Joseph Pulitzer (1847-1911)", topic:"Accuracy & the ethics of the press", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: The Records Clerk @ The Newsroom Floor
    record:{ sci:"Adolph S. Ochs (1858-1935)", topic:"The standard of the record", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: The Records Clerk @ The Newsroom Floor
    muckrake:{ sci:"Ida Tarbell (1857-1944)", topic:"Documentary investigative reporting", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: Local Stringer Ames @ The Newsroom Floor
    shame:{ sci:"Lincoln Steffens (1866-1936)", topic:"Muckraking & the shame of the cities", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: Local Stringer Ames @ The Newsroom Floor
    publicopinion:{ sci:"Walter Lippmann (1889-1974)", topic:"Public opinion & the news", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: Fact-Checker Jonah Pell @ The Editor's Desk
    presscrit:{ sci:"George Seldes (1890-1995)", topic:"Press criticism", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: Fact-Checker Jonah Pell @ The Editor's Desk
    fromrecord:{ sci:"I. F. Stone (1907-1989)", topic:"Verify it from the public record", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The Records Clerk @ The Editor's Desk
    broadcast:{ sci:"Edward R. Murrow (1908-1965)", topic:"Broadcast integrity", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The Records Clerk @ The Editor's Desk
    thepress:{ sci:"A. J. Liebling (1904-1963)", topic:"The press & its critics", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: Local Stringer Ames @ The Editor's Desk
    fourtheories:{ sci:"Fred S. Siebert (1901-1982)", topic:"Four theories of the press", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: Local Stringer Ames @ The Editor's Desk
    gatekeeper:{ sci:"David Manning White (1917-1993)", topic:"The gatekeeper", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Fact-Checker Jonah Pell @ The Source & Fact-Check Files
    editor:{ sci:"Ben Bradlee (1921-2014)", topic:"The editor & the fabricated story", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Fact-Checker Jonah Pell @ The Source & Fact-Check Files
    whatsnews:{ sci:"Herbert J. Gans (1927-2024)", topic:"Deciding what's news", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The Records Clerk @ The Source & Fact-Check Files
    objritual:{ sci:"Gaye Tuchman (b. 1943)", topic:"Objectivity as strategic ritual", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The Records Clerk @ The Source & Fact-Check Files
    sourcing:{ sci:"Carl Bernstein (b. 1944)", topic:"The discipline of sourcing", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: Local Stringer Ames @ The Source & Fact-Check Files
    objorigins:{ sci:"Michael Schudson (b. 1946)", topic:"The origins of objectivity", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: Local Stringer Ames @ The Source & Fact-Check Files
    verification:{ sci:"Bill Kovach (1932-2021)", topic:"The elements of verification", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    factchecker:{ newsroom:"", editdesk:"", sourcefiles:"" },
    clerk:{ newsroom:"", editdesk:"", sourcefiles:"" },
    stringer:{ newsroom:"", editdesk:"", sourcefiles:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"smear", dismissalWhat:"mistake",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};