// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"f_privacy", title:"The Beacon Consent Scandal", discipline:"Data Privacy & Information Systems",
  teaser:"A billion intimate records turned up for sale. A criminal data theft? All fair and anonymized? Or consent quietly stripped and the data sold?", overclaimTag:"a criminal data theft", truthTag:"anonymization defeated and data monetized",
  venue:"the Beacon data-privacy inquiry", agent:{name:"Investigator Iris Kohl", role:"Investigator's Notepad"},
  standingLabel:"Inquiry credibility", readingShort:"Pioneers", readingLabel:"Data-Privacy Pioneers",
  dossierName:"DATA-PRIVACY & DATABASE PIONEERS", enterLabel:"Open the inquiry", subt:"A deduction game inside the Beacon data-privacy inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (a criminal data theft) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"dataexec", items:[
      {id:"thieves", label:"An outside data-theft ring"},
      {id:"dataexec", label:"Reed Calloway — the firm's data-product chief"},
      {id:"processor", label:"The third-party data processor"} ]},
    where:{ title:"Where it culminates", truth:"office", items:[
      {id:"warehouse", label:"The Customer Data Warehouse"},
      {id:"analytics", label:"The Analytics & Re-identification Lab"},
      {id:"office", label:"The Data Chief's Office"} ]},
    what:{ title:"What is happening", truth:"monetized", items:[
      {id:"theft", label:"Criminals stole the data in a break-in"},
      {id:"anon", label:"It was all anonymized and consented — nothing wrong"},
      {id:"monetized", label:"Consent and anonymization quietly defeated, the data sold"} ]}
  },
  PLACES:{
    warehouse:{name:"The Customer Data Warehouse", xy:[140,90]},
    analytics:{name:"The Analytics & Re-identification Lab", xy:[330,240]},
    office:{name:"The Data Chief's Office", xy:[520,90]}
  },
  EDGES:[["warehouse","analytics"],["analytics","office"]],
  CHARACTERS:{
    dataeng2:{ name:"The Data Engineer", role:"Data-warehouse engineer", face:"🗄", badge:"D", legend:"the data warehouse", hint:"Built the pipelines; the 'anonymous' IDs could be traced straight back." },
    analyst2:{ name:"The Analytics Lead", role:"Analytics & re-identification lead", face:"📈", badge:"A", legend:"the analytics lab", hint:"Re-linked the records to real names — and was told to keep selling them." },
    clerk:{ name:"The Clerk", role:"Compliance records clerk", face:"🗂", badge:"C", legend:"the office", hint:"Keeps the consent forms — and the deal that sold what they never agreed to." }
  },
  TOPICMAP:{
    warehouse:{ dataeng2:["p_infoprivacy","p_reident"], analyst2:["p_diffpriv","p_context"], clerk:["p_deanon","p_breakanon"] },
    analytics:{ dataeng2:["p_anonfail","p_mixnet"], analyst2:["p_tor","p_policy"], clerk:["p_econ","p_sanitize"] },
    office:{ dataeng2:["p_relational","p_dbms"], analyst2:["p_ermodel","p_dbsystems"], clerk:["p_transactions","p_integration"] }
  },
  TOPICS:{
    // cell: The Data Engineer @ The Customer Data Warehouse
    p_infoprivacy:{ sci:"Alan Westin (1929-2013)", topic:"Informational privacy & self-determination", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: The Data Engineer @ The Customer Data Warehouse
    p_reident:{ sci:"Latanya Sweeney (b. 1968)", topic:"Re-identification & k-anonymity", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: The Analytics Lead @ The Customer Data Warehouse
    p_diffpriv:{ sci:"Cynthia Dwork (b. 1958)", topic:"Differential privacy", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: The Analytics Lead @ The Customer Data Warehouse
    p_context:{ sci:"Helen Nissenbaum (b. 1954)", topic:"Privacy as contextual integrity", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Customer Data Warehouse
    p_deanon:{ sci:"Arvind Narayanan (data-privacy researcher)", topic:"De-anonymizing large datasets", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Customer Data Warehouse
    p_breakanon:{ sci:"Vitaly Shmatikov (data-privacy researcher)", topic:"Breaking anonymized data", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: The Data Engineer @ The Analytics & Re-identification Lab
    p_anonfail:{ sci:"Paul Ohm (privacy-law scholar)", topic:"The failure of anonymization", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: The Data Engineer @ The Analytics & Re-identification Lab
    p_mixnet:{ sci:"David Chaum (b. 1955)", topic:"Anonymous communication & digital cash", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The Analytics Lead @ The Analytics & Re-identification Lab
    p_tor:{ sci:"Roger Dingledine (anonymity-network pioneer)", topic:"The Tor anonymity network", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The Analytics Lead @ The Analytics & Re-identification Lab
    p_policy:{ sci:"Susan Landau (b. 1954)", topic:"Surveillance, privacy & policy", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Analytics & Re-identification Lab
    p_econ:{ sci:"Ross Anderson (1956-2024)", topic:"Security & privacy economics", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Analytics & Re-identification Lab
    p_sanitize:{ sci:"Simson Garfinkel (privacy & forensics researcher)", topic:"Privacy & data sanitization", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: The Data Engineer @ The Data Chief's Office
    p_relational:{ sci:"Edgar F. Codd (1923-2003)", topic:"The relational database", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: The Data Engineer @ The Data Chief's Office
    p_dbms:{ sci:"Charles Bachman (1924-2017)", topic:"The database management system", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The Analytics Lead @ The Data Chief's Office
    p_ermodel:{ sci:"Peter Chen (b. 1947)", topic:"The entity-relationship model", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The Analytics Lead @ The Data Chief's Office
    p_dbsystems:{ sci:"Michael Stonebraker (b. 1943)", topic:"Modern database systems", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Data Chief's Office
    p_transactions:{ sci:"Jim Gray (b. 1944)", topic:"Transactions & data at scale", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Data Chief's Office
    p_integration:{ sci:"Hector Garcia-Molina (1954-2019)", topic:"Databases & data integration", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    dataeng2:{ warehouse:"", analytics:"", office:"" },
    analyst2:{ warehouse:"", analytics:"", office:"" },
    clerk:{ warehouse:"", analytics:"", office:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"theft", dismissalWhat:"anon",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};