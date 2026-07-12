// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"c_doping", title:"The Verano Ascent", discipline:"Sports Science & Anti-Doping",
  teaser:"A champion rewrote the record books and passed every test. A once-in-a-century talent? A meaningless mark in a dirty sport? Or something built to beat the lab?", overclaimTag:"a once-in-a-century clean champion", truthTag:"a systematic doping program",
  venue:"the Verano doping inquiry", agent:{name:"Investigator Marek Dane", role:"Investigator's Notepad"},
  standingLabel:"Inquiry credibility", readingShort:"Physiologists", readingLabel:"Sport Science & Anti-Doping",
  dossierName:"SPORT SCIENCE & ANTI-DOPING", enterLabel:"Open the inquiry", subt:"A deduction game inside the Verano doping inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (a once-in-a-century clean champion) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"dp_doctor", items:[
      {id:"dp_doctor", label:"Dr. Halden Reuss — the team physician"},
      {id:"dp_athlete", label:"The champion athlete"},
      {id:"dp_official", label:"The federation official"} ]},
    where:{ title:"Where it culminates", truth:"dp_lab", items:[
      {id:"dp_camp", label:"The Training Camp & Velodrome"},
      {id:"dp_federation", label:"The Federation Office"},
      {id:"dp_lab", label:"The Anti-Doping Laboratory"} ]},
    what:{ title:"What is happening", truth:"dp_program", items:[
      {id:"dp_phenom", label:"A clean, once-in-a-century champion"},
      {id:"dp_everyone", label:"A meaningless record — everyone dopes anyway"},
      {id:"dp_program", label:"A systematic doping program built to beat the tests"} ]}
  },
  PLACES:{
    dp_camp:{name:"The Training Camp & Velodrome", xy:[140,90]},
    dp_federation:{name:"The Federation Office", xy:[330,240]},
    dp_lab:{name:"The Anti-Doping Laboratory", xy:[520,90]}
  },
  EDGES:[["dp_camp","dp_federation"],["dp_federation","dp_lab"]],
  CHARACTERS:{
    dp_scientist:{ name:"Lab Scientist Aro", role:"Anti-doping scientist", face:"🧪", badge:"A", legend:"the laboratory", hint:"Retests the frozen samples; the blood passport shows values no clean rider can hold." },
    dp_soigneur:{ name:"Soigneur Vela", role:"Former team soigneur", face:"🚴", badge:"V", legend:"the training camp", hint:"Worked inside the team; knows the fridge, the schedule, and the microdosing." },
    dp_officer:{ name:"Control Officer Renn", role:"Doping-control officer", face:"📋", badge:"R", legend:"the federation office", hint:"Handles the test chain; can show which controls were dodged, delayed, or warned in advance." }
  },
  TOPICMAP:{
    dp_camp:{ dp_scientist:["dp_hill","dp_krogh"], dp_soigneur:["dp_astrand","dp_saltin"], dp_officer:["dp_donike","dp_beckett"] },
    dp_federation:{ dp_scientist:["dp_catlin","dp_ayotte"], dp_soigneur:["dp_ekblom","dp_parisotto"], dp_officer:["dp_lasne","dp_ashenden"] },
    dp_lab:{ dp_scientist:["dp_franke","dp_berendonk"], dp_soigneur:["dp_yesalis","dp_prokop"], dp_officer:["dp_bergstrom","dp_rodchenkov"] }
  },
  TOPICS:{
    // cell: Lab Scientist Aro @ The Training Camp & Velodrome
    dp_hill:{ sci:"A. V. Hill (1886–1977)", topic:"VO2 max & muscle physiology", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: Lab Scientist Aro @ The Training Camp & Velodrome
    dp_krogh:{ sci:"August Krogh (1874–1949)", topic:"Capillaries & exercise physiology", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: Soigneur Vela @ The Training Camp & Velodrome
    dp_astrand:{ sci:"Per-Olof Åstrand (1922–2015)", topic:"The textbook of work physiology", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: Soigneur Vela @ The Training Camp & Velodrome
    dp_saltin:{ sci:"Bengt Saltin (1935–2014)", topic:"Muscle biopsy & endurance physiology", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: Control Officer Renn @ The Training Camp & Velodrome
    dp_donike:{ sci:"Manfred Donike (1933–1995)", topic:"GC/MS steroid testing & the T/E ratio", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: Control Officer Renn @ The Training Camp & Velodrome
    dp_beckett:{ sci:"Arnold Beckett (1920–2010)", topic:"Early doping analysis & drug control", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: Lab Scientist Aro @ The Federation Office
    dp_catlin:{ sci:"Don Catlin (b. 1938)", topic:"The lab that caught the designer steroid THG", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: Lab Scientist Aro @ The Federation Office
    dp_ayotte:{ sci:"Christiane Ayotte (anti-doping chemist, Montreal lab)", topic:"Detecting masked steroids", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: Soigneur Vela @ The Federation Office
    dp_ekblom:{ sci:"Björn Ekblom (b. 1938)", topic:"Blood doping & the physiology of EPO", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: Soigneur Vela @ The Federation Office
    dp_parisotto:{ sci:"Robin Parisotto (sports scientist, EPO & blood passport)", topic:"Blood markers of doping", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: Control Officer Renn @ The Federation Office
    dp_lasne:{ sci:"Françoise Lasne (anti-doping scientist)", topic:"The urine test for EPO", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: Control Officer Renn @ The Federation Office
    dp_ashenden:{ sci:"Michael Ashenden (sports scientist, biological passport)", topic:"The athlete biological passport", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Lab Scientist Aro @ The Anti-Doping Laboratory
    dp_franke:{ sci:"Werner Franke (1940–2022)", topic:"Exposing the East German state doping program", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Lab Scientist Aro @ The Anti-Doping Laboratory
    dp_berendonk:{ sci:"Brigitte Berendonk (b. 1942)", topic:"Documenting state-sponsored doping", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: Soigneur Vela @ The Anti-Doping Laboratory
    dp_yesalis:{ sci:"Charles Yesalis (epidemiologist, anabolic steroids)", topic:"The spread of steroid use", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: Soigneur Vela @ The Anti-Doping Laboratory
    dp_prokop:{ sci:"Ludwig Prokop (1920–2013)", topic:"Sports medicine & early doping controls", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: Control Officer Renn @ The Anti-Doping Laboratory
    dp_bergstrom:{ sci:"Jonas Bergström (1929–2001)", topic:"The muscle-biopsy needle & glycogen", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: Control Officer Renn @ The Anti-Doping Laboratory
    dp_rodchenkov:{ sci:"Grigory Rodchenkov (b. 1958)", topic:"The lab chief who exposed a national doping program", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    dp_scientist:{ dp_camp:"", dp_federation:"", dp_lab:"" },
    dp_soigneur:{ dp_camp:"", dp_federation:"", dp_lab:"" },
    dp_officer:{ dp_camp:"", dp_federation:"", dp_lab:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"dp_phenom", dismissalWhat:"dp_everyone",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};