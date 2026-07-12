// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"w_surg", title:"The Wrong Side", discipline:"Surgery & Patient Safety",
  teaser:"An operation went catastrophically wrong on a routine list. A butcher of a surgeon? Sheer bad luck? Or a safety count quietly skipped to save time?", overclaimTag:"an incompetent surgeon", truthTag:"a bypassed surgical safeguard",
  venue:"the St. Auben Hospital inquiry", agent:{name:"Investigator Cole Ferris", role:"Investigator's Notepad"},
  standingLabel:"Inquiry credibility", readingShort:"Pioneers", readingLabel:"Surgery Pioneers",
  dossierName:"SURGERY & SAFETY PIONEERS", enterLabel:"Open the inquiry", subt:"A deduction game inside the St. Auben Hospital inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (an incompetent surgeon) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"chief", items:[
      {id:"surgeon", label:"Mr. Rasch — the operating surgeon"},
      {id:"chief", label:"Dr. Vane — the surgical chief of service"},
      {id:"vendor", label:"The theatre-supplies vendor"} ]},
    where:{ title:"Where it culminates", truth:"records", items:[
      {id:"theatre", label:"The Operating Theatre"},
      {id:"stores", label:"The Sterile Stores & Instrument Count"},
      {id:"records", label:"The Surgical Office & Records"} ]},
    what:{ title:"What is happening", truth:"bypass", items:[
      {id:"incompetence", label:"A careless surgeon operating on the wrong site"},
      {id:"complication", label:"An unavoidable surgical complication — bad luck"},
      {id:"bypass", label:"A safety count and checklist quietly bypassed to save time"} ]}
  },
  PLACES:{
    theatre:{name:"The Operating Theatre", xy:[140,90]},
    stores:{name:"The Sterile Stores & Instrument Count", xy:[330,240]},
    records:{name:"The Surgical Office & Records", xy:[520,90]}
  },
  EDGES:[["theatre","stores"],["stores","records"]],
  CHARACTERS:{
    scrubnurse:{ name:"Scrub Nurse Adler", role:"Scrub nurse", face:"🧤", badge:"S", legend:"the theatre", hint:"Passes every instrument; the count came up short and the case pressed on anyway." },
    orderly:{ name:"The Orderly", role:"Theatre orderly", face:"🧺", badge:"O", legend:"the stores", hint:"Wheels the patients and trays; the site-marking and time-out were skipped on a packed list." },
    clerk:{ name:"The Clerk", role:"Surgical records clerk", face:"🗂", badge:"C", legend:"the office", hint:"Files the checklists and count sheets — and the memo that made them optional." }
  },
  TOPICMAP:{
    theatre:{ scrubnurse:["ligature","ovariotomy"], orderly:["fastknife","antiseptic"], clerk:["abdominal","steam"] },
    stores:{ scrubnurse:["thyroid","asepsis"], orderly:["operatingroom","neurosurg"], clerk:["endresult","vascular"] },
    records:{ scrubnurse:["quality","error"], orderly:["icuchecklist","surgchecklist"], clerk:["neverevents","improvement"] }
  },
  TOPICS:{
    // cell: Scrub Nurse Adler @ The Operating Theatre
    ligature:{ sci:"Ambroise Paré (1510-1590)", topic:"Battlefield surgery & the ligature", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: Scrub Nurse Adler @ The Operating Theatre
    ovariotomy:{ sci:"Ephraim McDowell (1771-1830)", topic:"Early abdominal surgery", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: The Orderly @ The Operating Theatre
    fastknife:{ sci:"Robert Liston (1794-1847)", topic:"Surgery in the age before anesthesia", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: The Orderly @ The Operating Theatre
    antiseptic:{ sci:"Joseph Lister (1827-1912)", topic:"Antiseptic surgery", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Operating Theatre
    abdominal:{ sci:"Theodor Billroth (1829-1894)", topic:"The birth of abdominal surgery", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Operating Theatre
    steam:{ sci:"Ernst von Bergmann (1836-1907)", topic:"Steam sterilization of instruments", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: Scrub Nurse Adler @ The Sterile Stores & Instrument Count
    thyroid:{ sci:"Theodor Kocher (1841-1917)", topic:"Precision thyroid surgery", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: Scrub Nurse Adler @ The Sterile Stores & Instrument Count
    asepsis:{ sci:"William Halsted (1852-1922)", topic:"Aseptic technique & surgical gloves", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The Orderly @ The Sterile Stores & Instrument Count
    operatingroom:{ sci:"Gustav Neuber (1850-1932)", topic:"The aseptic operating room", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The Orderly @ The Sterile Stores & Instrument Count
    neurosurg:{ sci:"Harvey Cushing (1869-1939)", topic:"Neurosurgery & the anesthesia record", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Sterile Stores & Instrument Count
    endresult:{ sci:"Ernest Codman (1869-1940)", topic:"The 'end result' & surgical accountability", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Sterile Stores & Instrument Count
    vascular:{ sci:"Alexis Carrel (1873-1944)", topic:"Vascular suture technique", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Scrub Nurse Adler @ The Surgical Office & Records
    quality:{ sci:"Avedis Donabedian (1919-2000)", topic:"Measuring the quality of care", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Scrub Nurse Adler @ The Surgical Office & Records
    error:{ sci:"Lucian Leape (patient-safety researcher, b. 1930)", topic:"Medical error & preventable harm", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The Orderly @ The Surgical Office & Records
    icuchecklist:{ sci:"Peter Pronovost (b. 1964)", topic:"The checklist in intensive care", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The Orderly @ The Surgical Office & Records
    surgchecklist:{ sci:"Atul Gawande (b. 1965)", topic:"The surgical safety checklist", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Surgical Office & Records
    neverevents:{ sci:"Martin Makary (surgeon & researcher)", topic:"Wrong-site surgery & 'never events'", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Surgical Office & Records
    improvement:{ sci:"Donald Berwick (b. 1946)", topic:"Quality improvement & reducing harm", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    scrubnurse:{ theatre:"", stores:"", records:"" },
    orderly:{ theatre:"", stores:"", records:"" },
    clerk:{ theatre:"", stores:"", records:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"incompetence", dismissalWhat:"complication",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};