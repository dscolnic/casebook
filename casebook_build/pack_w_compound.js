// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"w_compound", title:"The Compounding Room", discipline:"Pharmacy & Sterile Compounding",
  teaser:"Patients who got a routine injection began falling gravely ill across three states. A poisoner? A run of bad luck? Or a sterility control someone quietly switched off?", overclaimTag:"a deliberate poisoning", truthTag:"abandoned sterility controls",
  venue:"the Meridian Compounding inquiry", agent:{name:"Investigator Del Marsh", role:"Investigator's Notepad"},
  standingLabel:"Inquiry credibility", readingShort:"Pioneers", readingLabel:"Pharmacy Pioneers",
  dossierName:"PHARMACY & STERILITY PIONEERS", enterLabel:"Open the inquiry", subt:"A deduction game inside the Meridian Compounding inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (a deliberate poisoning) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"owner", items:[
      {id:"pharmacist", label:"The compounding pharmacist"},
      {id:"owner", label:"Guillory — the pharmacy's owner"},
      {id:"inspector", label:"The state pharmacy inspector"} ]},
    where:{ title:"Where it culminates", truth:"office", items:[
      {id:"cleanroom", label:"The Clean Room & Autoclave"},
      {id:"culture", label:"The Environmental-Monitoring Lab"},
      {id:"office", label:"The Owner's Business Office"} ]},
    what:{ title:"What is happening", truth:"sterility", items:[
      {id:"poison", label:"A deliberate poisoning of the medicine"},
      {id:"coincidence", label:"A run of coincidental illnesses — bad luck"},
      {id:"sterility", label:"Sterility controls cut and contamination ignored to raise output"} ]}
  },
  PLACES:{
    cleanroom:{name:"The Clean Room & Autoclave", xy:[140,90]},
    culture:{name:"The Environmental-Monitoring Lab", xy:[330,240]},
    office:{name:"The Owner's Business Office", xy:[520,90]}
  },
  EDGES:[["cleanroom","culture"],["culture","office"]],
  CHARACTERS:{
    tech:{ name:"Pharmacy Tech Ruiz", role:"Compounding technician", face:"⚗", badge:"T", legend:"the clean room", hint:"Fills the vials; the autoclave cycles were shortened and the hood left unchecked." },
    micro:{ name:"The Micro Analyst", role:"Environmental-monitoring analyst", face:"🧫", badge:"M", legend:"the lab", hint:"Reads the settle plates; mold grew on the monitors and the results were waved through." },
    clerk:{ name:"The Clerk", role:"Records clerk", face:"🗂", badge:"C", legend:"the office", hint:"Keeps the batch records — and the sterility failures stamped 'release anyway.'" }
  },
  TOPICMAP:{
    cleanroom:{ tech:["materiamedica","canon"], micro:["dose","morphine"], clerk:["pharmacy","purity"] },
    culture:{ tech:["germtheory","tyndall"], micro:["spores","autoclave"], clerk:["mycology","fungi"] },
    office:{ tech:["magicbullet","purefood"], micro:["standardization","medmycology"], clerk:["mycoses","biologics"] }
  },
  TOPICS:{
    // cell: Pharmacy Tech Ruiz @ The Clean Room & Autoclave
    materiamedica:{ sci:"Galen (c.129-216)", topic:"Materia medica & compounding", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: Pharmacy Tech Ruiz @ The Clean Room & Autoclave
    canon:{ sci:"Avicenna — Ibn Sina (980-1037)", topic:"The pharmacopoeia", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: The Micro Analyst @ The Clean Room & Autoclave
    dose:{ sci:"William Withering (1741-1799)", topic:"Dosage & the therapeutic dose", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: The Micro Analyst @ The Clean Room & Autoclave
    morphine:{ sci:"Friedrich Sertürner (1783-1841)", topic:"Morphine & alkaloid purity", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Clean Room & Autoclave
    pharmacy:{ sci:"William Procter Jr. (1817-1874)", topic:"The founding of pharmacy practice", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Clean Room & Autoclave
    purity:{ sci:"Edward R. Squibb (1819-1900)", topic:"Drug-purity standards", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: Pharmacy Tech Ruiz @ The Environmental-Monitoring Lab
    germtheory:{ sci:"Louis Pasteur (1822-1895)", topic:"Germ theory & sterilization", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: Pharmacy Tech Ruiz @ The Environmental-Monitoring Lab
    tyndall:{ sci:"John Tyndall (1820-1893)", topic:"Tyndallization & heat-resistant spores", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The Micro Analyst @ The Environmental-Monitoring Lab
    spores:{ sci:"Ferdinand Cohn (1828-1898)", topic:"Bacterial spores", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The Micro Analyst @ The Environmental-Monitoring Lab
    autoclave:{ sci:"Charles Chamberland (1851-1908)", topic:"The autoclave & the sterilizing filter", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Environmental-Monitoring Lab
    mycology:{ sci:"David Gruby (1810-1898)", topic:"The founding of medical mycology", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Environmental-Monitoring Lab
    fungi:{ sci:"Raymond Sabouraud (1864-1938)", topic:"Culturing pathogenic fungi", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Pharmacy Tech Ruiz @ The Owner's Business Office
    magicbullet:{ sci:"Paul Ehrlich (1854-1915)", topic:"Chemotherapy & the 'magic bullet'", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Pharmacy Tech Ruiz @ The Owner's Business Office
    purefood:{ sci:"Harvey Wiley (1844-1930)", topic:"Pure-food & drug law", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The Micro Analyst @ The Owner's Business Office
    standardization:{ sci:"Torald Sollmann (1874-1965)", topic:"Pharmacology & drug standardization", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The Micro Analyst @ The Owner's Business Office
    medmycology:{ sci:"Rhoda Benham (1894-1957)", topic:"Medical mycology", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Owner's Business Office
    mycoses:{ sci:"Chester Emmons (1900-1985)", topic:"Fungal taxonomy & the mycoses", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Owner's Business Office
    biologics:{ sci:"Milton J. Rosenau (1869-1946)", topic:"Biologics sterility & standards", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    tech:{ cleanroom:"", culture:"", office:"" },
    micro:{ cleanroom:"", culture:"", office:"" },
    clerk:{ cleanroom:"", culture:"", office:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"poison", dismissalWhat:"coincidence",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};