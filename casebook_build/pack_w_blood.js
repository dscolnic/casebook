// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"w_blood", title:"The Crossmatch", discipline:"Transfusion & Blood Banking",
  teaser:"A transfusion patient died within minutes on a quiet ward. A murderous nurse? A one-in-a-million reaction? Or a matching safeguard that was defeated?", overclaimTag:"a murderous nurse", truthTag:"a defeated matching safeguard",
  venue:"the Carraway Hospital blood-bank inquiry", agent:{name:"Investigator June Halloway", role:"Investigator's Notepad"},
  standingLabel:"Inquiry credibility", readingShort:"Pioneers", readingLabel:"Transfusion Pioneers",
  dossierName:"TRANSFUSION PIONEERS", enterLabel:"Open the inquiry", subt:"A deduction game inside the Carraway Hospital blood-bank inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (a murderous nurse) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"manager", items:[
      {id:"nurse2", label:"The transfusion nurse"},
      {id:"manager", label:"Alder — the blood-bank manager"},
      {id:"assessor", label:"The lab accreditation assessor"} ]},
    where:{ title:"Where it culminates", truth:"records", items:[
      {id:"ward", label:"The Transfusion Ward"},
      {id:"bloodbank", label:"The Blood Bank & Crossmatch Lab"},
      {id:"records", label:"The Blood-Bank Office & Records"} ]},
    what:{ title:"What is happening", truth:"mismatch", items:[
      {id:"murder", label:"A nurse who deliberately killed the patient"},
      {id:"rareReaction", label:"A rare, unforeseeable transfusion reaction"},
      {id:"mismatch", label:"A typing and crossmatch safeguard defeated to save time"} ]}
  },
  PLACES:{
    ward:{name:"The Transfusion Ward", xy:[140,90]},
    bloodbank:{name:"The Blood Bank & Crossmatch Lab", xy:[330,240]},
    records:{name:"The Blood-Bank Office & Records", xy:[520,90]}
  },
  EDGES:[["ward","bloodbank"],["bloodbank","records"]],
  CHARACTERS:{
    wardnurse:{ name:"Nurse Okafor", role:"Ward nurse", face:"🩸", badge:"N", legend:"the ward", hint:"Hung the unit; the wristband and the bag label were never checked against each other." },
    labtech:{ name:"The Lab Tech", role:"Blood-bank technologist", face:"🔬", badge:"L", legend:"the blood bank", hint:"Runs the crossmatch; the compatibility step had been switched to 'electronic release' to clear the backlog." },
    clerk:{ name:"The Clerk", role:"Blood-bank records clerk", face:"🗂", badge:"C", legend:"the office", hint:"Keeps the sample logs — and the mislabeled tube that started it all." }
  },
  TOPICMAP:{
    ward:{ wardnurse:["circulation","firsttransfusion"], labtech:["earlytransfusion","humantransfusion"], clerk:["crossmatch","typingfirst"] },
    bloodbank:{ wardnurse:["groups","classification"], labtech:["citrate","storedblood"], clerk:["preservation","depot"] },
    records:{ wardnurse:["bankterm","plasma"], labtech:["banking","rhfactor"], clerk:["hepb","hepc"] }
  },
  TOPICS:{
    // cell: Nurse Okafor @ The Transfusion Ward
    circulation:{ sci:"William Harvey (1578-1657)", topic:"The circulation of the blood", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: Nurse Okafor @ The Transfusion Ward
    firsttransfusion:{ sci:"Richard Lower (1631-1691)", topic:"The first transfusion experiments", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: The Lab Tech @ The Transfusion Ward
    earlytransfusion:{ sci:"Jean-Baptiste Denys (1643-1704)", topic:"Early transfusion & its dangers", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: The Lab Tech @ The Transfusion Ward
    humantransfusion:{ sci:"James Blundell (1791-1878)", topic:"Human blood transfusion", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Transfusion Ward
    crossmatch:{ sci:"Reuben Ottenberg (1882-1959)", topic:"Compatibility testing & the crossmatch", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Transfusion Ward
    typingfirst:{ sci:"Ludvig Hektoen (1863-1951)", topic:"Typing before transfusion", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: Nurse Okafor @ The Blood Bank & Crossmatch Lab
    groups:{ sci:"Jan Janský (1873-1921)", topic:"The four blood groups", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: Nurse Okafor @ The Blood Bank & Crossmatch Lab
    classification:{ sci:"William L. Moss (1876-1957)", topic:"Blood-group classification", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The Lab Tech @ The Blood Bank & Crossmatch Lab
    citrate:{ sci:"Luis Agote (1868-1954)", topic:"Citrate anticoagulation", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The Lab Tech @ The Blood Bank & Crossmatch Lab
    storedblood:{ sci:"Albert Hustin (1882-1967)", topic:"Anticoagulated stored blood", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Blood Bank & Crossmatch Lab
    preservation:{ sci:"Peyton Rous (1879-1970)", topic:"Blood preservation for storage", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Blood Bank & Crossmatch Lab
    depot:{ sci:"Oswald Robertson (1886-1966)", topic:"The first blood depot", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Nurse Okafor @ The Blood-Bank Office & Records
    bankterm:{ sci:"Bernard Fantus (1874-1940)", topic:"The 'blood bank'", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Nurse Okafor @ The Blood-Bank Office & Records
    plasma:{ sci:"Edwin Cohn (1892-1953)", topic:"Plasma fractionation", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The Lab Tech @ The Blood-Bank Office & Records
    banking:{ sci:"Charles Drew (1904-1950)", topic:"Blood plasma & banking", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The Lab Tech @ The Blood-Bank Office & Records
    rhfactor:{ sci:"Philip Levine (1900-1987)", topic:"The Rh factor & hemolytic disease", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Blood-Bank Office & Records
    hepb:{ sci:"Baruch Blumberg (1925-2011)", topic:"Hepatitis B & blood screening", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Blood-Bank Office & Records
    hepc:{ sci:"Harvey Alter (b. 1935)", topic:"Hepatitis C & transfusion safety", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    wardnurse:{ ward:"", bloodbank:"", records:"" },
    labtech:{ ward:"", bloodbank:"", records:"" },
    clerk:{ ward:"", bloodbank:"", records:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"murder", dismissalWhat:"rareReaction",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};