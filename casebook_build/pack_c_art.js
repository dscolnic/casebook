// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"c_art", title:"The Halberstadt Panel", discipline:"Art History & Authentication",
  teaser:"A lost masterpiece surfaced from nowhere and sold for a fortune. A priceless discovery? An obvious daub? Or something with a hidden tell?", overclaimTag:"a priceless lost masterpiece", truthTag:"a forgery with a hidden tell",
  venue:"the Halberstadt Panel inquiry", agent:{name:"Investigator Rhea Voss", role:"Investigator's Notepad"},
  standingLabel:"Commission credibility", readingShort:"Connoisseurs", readingLabel:"Connoisseurs & Conservators",
  dossierName:"CONNOISSEURS & CONSERVATORS", enterLabel:"Open the inquiry", subt:"A deduction game inside the Halberstadt Panel inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (a priceless lost masterpiece) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"ar_restorer", items:[
      {id:"ar_restorer", label:"Anselm Roterman — the panel's restorer"},
      {id:"ar_dealer", label:"Emile Vasse — the gallery dealer"},
      {id:"ar_curator", label:"Dr. Halvard — the museum's connoisseur"} ]},
    where:{ title:"Where it culminates", truth:"ar_lab", items:[
      {id:"ar_gallery", label:"The Auction House & Gallery"},
      {id:"ar_provenance", label:"The Provenance Archive"},
      {id:"ar_lab", label:"The Conservation Laboratory"} ]},
    what:{ title:"What is happening", truth:"ar_forgery", items:[
      {id:"ar_masterpiece", label:"A priceless rediscovered Old Master"},
      {id:"ar_obvious", label:"An obvious, clumsy fake — beneath notice"},
      {id:"ar_forgery", label:"A forgery moved on faked provenance, betrayed by an anachronistic pigment"} ]}
  },
  PLACES:{
    ar_gallery:{name:"The Auction House & Gallery", xy:[140,90]},
    ar_provenance:{name:"The Provenance Archive", xy:[330,240]},
    ar_lab:{name:"The Conservation Laboratory", xy:[520,90]}
  },
  EDGES:[["ar_gallery","ar_provenance"],["ar_provenance","ar_lab"]],
  CHARACTERS:{
    ar_conservator:{ name:"Conservator Nel", role:"Paintings conservator", face:"🔬", badge:"N", legend:"the laboratory", hint:"Takes the paint cross-sections; found a pigment that did not exist when the panel was supposedly made." },
    ar_archivist:{ name:"Archivist Boll", role:"Provenance archivist", face:"🗂", badge:"B", legend:"the archive", hint:"Traces old sale records; the panel's 'centuries-old' history dead-ends in a forged bill of sale." },
    ar_framer:{ name:"Framer Ruys", role:"Frame-maker & studio hand", face:"🖼", badge:"R", legend:"the gallery", hint:"Built frames for the restorer's studio; saw a 'new' old panel aged in the back room." }
  },
  TOPICMAP:{
    ar_gallery:{ ar_conservator:["ar_morelli","ar_berenson"], ar_archivist:["ar_friedlander","ar_bode"], ar_framer:["ar_bredius","ar_vanmeegeren"] },
    ar_provenance:{ ar_conservator:["ar_coremans","ar_kurz"], ar_archivist:["ar_zeri","ar_mccrone"], ar_framer:["ar_gettens","ar_stout"] },
    ar_lab:{ ar_conservator:["ar_forbes","ar_plesters"], ar_archivist:["ar_vandantzig","ar_hebborn"], ar_framer:["ar_keating","ar_clark"] }
  },
  TOPICS:{
    // cell: Conservator Nel @ The Auction House & Gallery
    ar_morelli:{ sci:"Giovanni Morelli (1816–1891)", topic:"The Morellian method: the telltale detail", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: Conservator Nel @ The Auction House & Gallery
    ar_berenson:{ sci:"Bernard Berenson (1865–1959)", topic:"Connoisseurship & attribution", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: Archivist Boll @ The Auction House & Gallery
    ar_friedlander:{ sci:"Max J. Friedländer (1867–1958)", topic:"The trained connoisseur's eye", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: Archivist Boll @ The Auction House & Gallery
    ar_bode:{ sci:"Wilhelm von Bode (1845–1929)", topic:"The museum director's eye for Old Masters", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: Framer Ruys @ The Auction House & Gallery
    ar_bredius:{ sci:"Abraham Bredius (1855–1946)", topic:"The Vermeer authority who was deceived", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: Framer Ruys @ The Auction House & Gallery
    ar_vanmeegeren:{ sci:"Han van Meegeren (1889–1947)", topic:"The forger of false Vermeers", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: Conservator Nel @ The Provenance Archive
    ar_coremans:{ sci:"Paul Coremans (1908–1965)", topic:"The laboratory that unmasked the forgery", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: Conservator Nel @ The Provenance Archive
    ar_kurz:{ sci:"Otto Kurz (1908–1975)", topic:"The history of fakes & forgeries", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: Archivist Boll @ The Provenance Archive
    ar_zeri:{ sci:"Federico Zeri (1921–1998)", topic:"The connoisseur & the fake", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: Archivist Boll @ The Provenance Archive
    ar_mccrone:{ sci:"Walter McCrone (1916–2002)", topic:"Polarized-light microscopy of pigments", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: Framer Ruys @ The Provenance Archive
    ar_gettens:{ sci:"Rutherford J. Gettens (1900–1974)", topic:"The technical analysis of pigments", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: Framer Ruys @ The Provenance Archive
    ar_stout:{ sci:"George L. Stout (1897–1978)", topic:"Conservation science", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Conservator Nel @ The Conservation Laboratory
    ar_forbes:{ sci:"Edward W. Forbes (1873–1969)", topic:"The pigment archive & conservation", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Conservator Nel @ The Conservation Laboratory
    ar_plesters:{ sci:"Joyce Plesters (1927–1996)", topic:"Paint cross-sections & pigment identification", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: Archivist Boll @ The Conservation Laboratory
    ar_vandantzig:{ sci:"Maurits M. van Dantzig (1903–1960)", topic:"'Pictology': the science of authenticity", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: Archivist Boll @ The Conservation Laboratory
    ar_hebborn:{ sci:"Eric Hebborn (1934–1996)", topic:"The master forger of Old Master drawings", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: Framer Ruys @ The Conservation Laboratory
    ar_keating:{ sci:"Tom Keating (1917–1984)", topic:"The forger & the deliberate 'time bomb'", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: Framer Ruys @ The Conservation Laboratory
    ar_clark:{ sci:"Kenneth Clark (1903–1983)", topic:"Connoisseurship at the National Gallery", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    ar_conservator:{ ar_gallery:"", ar_provenance:"", ar_lab:"" },
    ar_archivist:{ ar_gallery:"", ar_provenance:"", ar_lab:"" },
    ar_framer:{ ar_gallery:"", ar_provenance:"", ar_lab:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"ar_masterpiece", dismissalWhat:"ar_obvious",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};