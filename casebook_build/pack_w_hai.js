// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"w_hai", title:"The Ward Cluster", discipline:"Hospital Epidemiology & Microbiology",
  teaser:"A run of deadly infections tore through one hospital ward. A murderous staffer? A stroke of terrible luck? Or a sterilization protocol defeated and hidden in the records?", overclaimTag:"a murderous staffer", truthTag:"a defeated sterilization protocol",
  venue:"the Kettleridge Hospital infection inquiry", agent:{name:"Investigator Ida Brenner", role:"Investigator's Notepad"},
  standingLabel:"Inquiry credibility", readingShort:"Pioneers", readingLabel:"Microbiology Pioneers",
  dossierName:"MICROBIOLOGY & INFECTION PIONEERS", enterLabel:"Open the inquiry", subt:"A deduction game inside the Kettleridge Hospital infection inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (a murderous staffer) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"opsmanager", items:[
      {id:"nurse4", label:"A ward nurse"},
      {id:"opsmanager", label:"Whitlock — the hospital's operations manager"},
      {id:"inspector2", label:"The infection-control inspector"} ]},
    where:{ title:"Where it culminates", truth:"records", items:[
      {id:"ward2", label:"The Affected Ward"},
      {id:"sterile", label:"The Sterile-Processing Department"},
      {id:"records", label:"The Infection-Control Office & Records"} ]},
    what:{ title:"What is happening", truth:"protocol", items:[
      {id:"killer", label:"A staff member deliberately harming patients"},
      {id:"chance", label:"A tragic run of unrelated infections — chance"},
      {id:"protocol", label:"A sterilization and isolation protocol defeated, traced through the records"} ]}
  },
  PLACES:{
    ward2:{name:"The Affected Ward", xy:[140,90]},
    sterile:{name:"The Sterile-Processing Department", xy:[330,240]},
    records:{name:"The Infection-Control Office & Records", xy:[520,90]}
  },
  EDGES:[["ward2","sterile"],["sterile","records"]],
  CHARACTERS:{
    chargenurse:{ name:"Charge Nurse Iyer", role:"Charge nurse", face:"🩺", badge:"N", legend:"the ward", hint:"Runs the ward; the isolation precautions were dropped once the beds filled up." },
    cssdtech:{ name:"The Sterile-Processing Tech", role:"Sterile-processing technician", face:"♨", badge:"P", legend:"the sterile unit", hint:"Reprocesses the instruments; the sterilizer failed its spore test and kept running." },
    clerk:{ name:"The Clerk", role:"Infection-control records clerk", face:"🗂", badge:"C", legend:"the office", hint:"Keeps the surveillance logs — where the cluster stands out for anyone who reads them." }
  },
  TOPICMAP:{
    ward2:{ chargenurse:["microscopy","staph"], cssdtech:["ecoli","bacteriology"], clerk:["cultureplate","agar"] },
    sterile:{ chargenurse:["gramstain","strep"], cssdtech:["anaerobe","sulfa"], clerk:["penicillin","pendevelopment"] },
    records:{ chargenurse:["penisolation","streptomycin"], cssdtech:["resistance","rfactor"], clerk:["infectioncontrol","handhygiene"] }
  },
  TOPICS:{
    // cell: Charge Nurse Iyer @ The Affected Ward
    microscopy:{ sci:"Antonie van Leeuwenhoek (1632-1723)", topic:"The first sight of microbes", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: Charge Nurse Iyer @ The Affected Ward
    staph:{ sci:"Alexander Ogston (1844-1929)", topic:"The discovery of Staphylococcus", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: The Sterile-Processing Tech @ The Affected Ward
    ecoli:{ sci:"Theodor Escherich (1857-1911)", topic:"E. coli & the gut flora", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: The Sterile-Processing Tech @ The Affected Ward
    bacteriology:{ sci:"Friedrich Loeffler (1852-1915)", topic:"Bacteriology & pathogens", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Affected Ward
    cultureplate:{ sci:"Julius Petri (1852-1921)", topic:"The culture plate", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Affected Ward
    agar:{ sci:"Fanny Hesse (1850-1934)", topic:"Agar culture medium", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: Charge Nurse Iyer @ The Sterile-Processing Department
    gramstain:{ sci:"Hans Christian Gram (1853-1938)", topic:"The Gram stain", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: Charge Nurse Iyer @ The Sterile-Processing Department
    strep:{ sci:"Rebecca Lancefield (1895-1981)", topic:"Streptococcus grouping", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The Sterile-Processing Tech @ The Sterile-Processing Department
    anaerobe:{ sci:"Kitasato Shibasaburō (1853-1931)", topic:"Anaerobic culture & pathogens", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The Sterile-Processing Tech @ The Sterile-Processing Department
    sulfa:{ sci:"Gerhard Domagk (1895-1964)", topic:"The sulfa drugs", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Sterile-Processing Department
    penicillin:{ sci:"Alexander Fleming (1881-1955)", topic:"Penicillin", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Sterile-Processing Department
    pendevelopment:{ sci:"Howard Florey (1898-1968)", topic:"Turning penicillin into a medicine", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Charge Nurse Iyer @ The Infection-Control Office & Records
    penisolation:{ sci:"Ernst Chain (1906-1979)", topic:"Isolating penicillin", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Charge Nurse Iyer @ The Infection-Control Office & Records
    streptomycin:{ sci:"Selman Waksman (1888-1973)", topic:"Streptomycin & the antibiotic", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The Sterile-Processing Tech @ The Infection-Control Office & Records
    resistance:{ sci:"Mary Barber (1911-1965)", topic:"Hospital antibiotic resistance", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The Sterile-Processing Tech @ The Infection-Control Office & Records
    rfactor:{ sci:"Tsutomu Watanabe (1923-1977)", topic:"Transferable drug resistance", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Infection-Control Office & Records
    infectioncontrol:{ sci:"E.J.L. Lowbury (1913-2007)", topic:"Hospital infection control", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Infection-Control Office & Records
    handhygiene:{ sci:"Didier Pittet (b. 1957)", topic:"Hand hygiene & healthcare infection", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    chargenurse:{ ward2:"", sterile:"", records:"" },
    cssdtech:{ ward2:"", sterile:"", records:"" },
    clerk:{ ward2:"", sterile:"", records:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"killer", dismissalWhat:"chance",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};