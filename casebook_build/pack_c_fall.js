// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"c_fall", title:"The Last Council of Vellano", discipline:"History & Historical Method",
  teaser:"A proud republic fell in a single night. A traitor's bargain? A state already doomed? Or one decision buried in the council minutes?", overclaimTag:"one great traitor", truthTag:"a documented contingent decision",
  venue:"the Vellano fall inquiry", agent:{name:"Archivist-Investigator Lena Corvo", role:"Investigator's Notepad"},
  standingLabel:"Commission credibility", readingShort:"Historians", readingLabel:"Historians of Method",
  dossierName:"HISTORIANS OF METHOD", enterLabel:"Open the inquiry", subt:"A deduction game inside the Vellano fall inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (one great traitor) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"fa_provv", items:[
      {id:"fa_provv", label:"Provveditore Bassi — the council's war magistrate"},
      {id:"fa_general", label:"Ugo Sanvitale — the exiled condottiero"},
      {id:"fa_doge", label:"Doge Reniero — the last head of state"} ]},
    where:{ title:"Where it culminates", truth:"fa_archive", items:[
      {id:"fa_walls", label:"The City Walls & the River Gate"},
      {id:"fa_chamber", label:"The Council Chamber"},
      {id:"fa_archive", label:"The State Archive & Chancery"} ]},
    what:{ title:"What is happening", truth:"fa_decision", items:[
      {id:"fa_betrayal", label:"A single traitor sold the city from within"},
      {id:"fa_inevit", label:"A dying republic — its fall was inevitable"},
      {id:"fa_decision", label:"A documented council vote that stood down the garrison and left the gate unbarred"} ]}
  },
  PLACES:{
    fa_walls:{name:"The City Walls & the River Gate", xy:[140,90]},
    fa_chamber:{name:"The Council Chamber", xy:[330,240]},
    fa_archive:{name:"The State Archive & Chancery", xy:[520,90]}
  },
  EDGES:[["fa_walls","fa_chamber"],["fa_chamber","fa_archive"]],
  CHARACTERS:{
    fa_chancellor:{ name:"Chancery Clerk Orso", role:"Chancery records clerk", face:"🗂", badge:"O", legend:"the archive", hint:"Keeps the council minute-books; can find the vote that stood the mercenaries down." },
    fa_warden:{ name:"Gate Warden Pia", role:"River-gate warden", face:"🗝", badge:"P", legend:"the walls", hint:"Kept the gate watch; knows on whose written order the postern was left unbarred." },
    fa_notary:{ name:"Notary Ferro", role:"City notary & chronicler", face:"🪶", badge:"F", legend:"the chamber", hint:"Recorded the debates verbatim; heard which faction forced the fatal motion through." }
  },
  TOPICMAP:{
    fa_walls:{ fa_chancellor:["fa_herodotus","fa_thucydides"], fa_warden:["fa_polybius","fa_simaqian"], fa_notary:["fa_tacitus","fa_ibnkhaldun"] },
    fa_chamber:{ fa_chancellor:["fa_valla","fa_ranke"], fa_warden:["fa_michelet","fa_fustel"], fa_notary:["fa_bloch","fa_febvre"] },
    fa_archive:{ fa_chancellor:["fa_braudel","fa_ginzburg"], fa_warden:["fa_davis","fa_carr"], fa_notary:["fa_collingwood","fa_burckhardt"] }
  },
  TOPICS:{
    // cell: Chancery Clerk Orso @ The City Walls & the River Gate
    fa_herodotus:{ sci:"Herodotus (c.484–425 BC)", topic:"Inquiry & the first histories", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: Chancery Clerk Orso @ The City Walls & the River Gate
    fa_thucydides:{ sci:"Thucydides (c.460–400 BC)", topic:"Evidence, cause & political history", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: Gate Warden Pia @ The City Walls & the River Gate
    fa_polybius:{ sci:"Polybius (c.200–118 BC)", topic:"Why states rise and fall", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: Gate Warden Pia @ The City Walls & the River Gate
    fa_simaqian:{ sci:"Sima Qian (c.145–86 BC)", topic:"The grand historian & his sources", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: Notary Ferro @ The City Walls & the River Gate
    fa_tacitus:{ sci:"Tacitus (c.56–120 AD)", topic:"The corruption of a republic", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: Notary Ferro @ The City Walls & the River Gate
    fa_ibnkhaldun:{ sci:"Ibn Khaldun (1332–1406)", topic:"The science of the rise & fall of dynasties", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: Chancery Clerk Orso @ The Council Chamber
    fa_valla:{ sci:"Lorenzo Valla (1407–1457)", topic:"Philology & exposing the Donation of Constantine", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: Chancery Clerk Orso @ The Council Chamber
    fa_ranke:{ sci:"Leopold von Ranke (1795–1886)", topic:"Archival method & 'how it actually was'", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: Gate Warden Pia @ The Council Chamber
    fa_michelet:{ sci:"Jules Michelet (1798–1874)", topic:"The archive as living narrative", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: Gate Warden Pia @ The Council Chamber
    fa_fustel:{ sci:"Fustel de Coulanges (1830–1889)", topic:"Documents over theory", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: Notary Ferro @ The Council Chamber
    fa_bloch:{ sci:"Marc Bloch (1886–1944)", topic:"The historian's craft & source criticism", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: Notary Ferro @ The Council Chamber
    fa_febvre:{ sci:"Lucien Febvre (1878–1956)", topic:"The Annales & the history of mentalities", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Chancery Clerk Orso @ The State Archive & Chancery
    fa_braudel:{ sci:"Fernand Braudel (1902–1985)", topic:"Structures & the long duration", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Chancery Clerk Orso @ The State Archive & Chancery
    fa_ginzburg:{ sci:"Carlo Ginzburg (b. 1939)", topic:"Microhistory & the evidential paradigm", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: Gate Warden Pia @ The State Archive & Chancery
    fa_davis:{ sci:"Natalie Zemon Davis (1928–2023)", topic:"Microhistory & archival reconstruction", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: Gate Warden Pia @ The State Archive & Chancery
    fa_carr:{ sci:"E. H. Carr (1892–1982)", topic:"'What is History?' & the selection of facts", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: Notary Ferro @ The State Archive & Chancery
    fa_collingwood:{ sci:"R. G. Collingwood (1889–1943)", topic:"Historical evidence & re-enactment", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: Notary Ferro @ The State Archive & Chancery
    fa_burckhardt:{ sci:"Jacob Burckhardt (1818–1897)", topic:"The civilization of the city-state", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    fa_chancellor:{ fa_walls:"", fa_chamber:"", fa_archive:"" },
    fa_warden:{ fa_walls:"", fa_chamber:"", fa_archive:"" },
    fa_notary:{ fa_walls:"", fa_chamber:"", fa_archive:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"fa_betrayal", dismissalWhat:"fa_inevit",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};