// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"c_script", title:"The Karnos Tablets", discipline:"Linguistics & Decipherment",
  teaser:"A forgotten script gave up its secret: a lost royal epic, one scholar swore. An unbreakable code? A hoax reading? Or a grid that tells a duller truth?", overclaimTag:"a lost royal epic", truthTag:"a fabricated decipherment",
  venue:"the Karnos tablets inquiry", agent:{name:"Investigator Yara Sol", role:"Investigator's Notepad"},
  standingLabel:"Commission credibility", readingShort:"Decipherers", readingLabel:"Decipherers & Linguists",
  dossierName:"DECIPHERERS & LINGUISTS", enterLabel:"Open the inquiry", subt:"A deduction game inside the Karnos tablets inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (a lost royal epic) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"sc_claimant", items:[
      {id:"sc_claimant", label:"Prof. Malden Croft — the sensational decipherer"},
      {id:"sc_rival", label:"Dr. Sena — a rival philologist"},
      {id:"sc_curator", label:"The museum curator"} ]},
    where:{ title:"Where it culminates", truth:"sc_study", items:[
      {id:"sc_gallery", label:"The Tablet Gallery & Find-Site"},
      {id:"sc_epigraphy", label:"The Epigraphy Lab"},
      {id:"sc_study", label:"The Decipherment Study"} ]},
    what:{ title:"What is happening", truth:"sc_fabreading", items:[
      {id:"sc_epic", label:"A lost royal epic naming a forgotten king"},
      {id:"sc_undecipherable", label:"An unreadable script — meaningless marks"},
      {id:"sc_fabreading", label:"A fabricated decipherment; the grid reads a plain ledger"} ]}
  },
  PLACES:{
    sc_gallery:{name:"The Tablet Gallery & Find-Site", xy:[140,90]},
    sc_epigraphy:{name:"The Epigraphy Lab", xy:[330,240]},
    sc_study:{name:"The Decipherment Study", xy:[520,90]}
  },
  EDGES:[["sc_gallery","sc_epigraphy"],["sc_epigraphy","sc_study"]],
  CHARACTERS:{
    sc_epigrapher:{ name:"Epigrapher Tuma", role:"Field epigrapher", face:"📷", badge:"T", legend:"the epigraphy lab", hint:"Makes the squeezes and photographs; the claimed signs are not on the tablets at all." },
    sc_registrar:{ name:"Registrar Ode", role:"Find-site registrar", face:"🗂", badge:"O", legend:"the gallery", hint:"Logs where each tablet came from; the 'epic' tablets share a suspiciously modern context." },
    sc_statistician:{ name:"Analyst Ven", role:"Computational linguist", face:"🔡", badge:"V", legend:"the study", hint:"Counts the sign frequencies; the grid points to an inventory, not a poem." }
  },
  TOPICMAP:{
    sc_gallery:{ sc_epigrapher:["sc_champollion","sc_young"], sc_registrar:["sc_grotefend","sc_rawlinson"], sc_statistician:["sc_hincks","sc_hrozny"] },
    sc_epigraphy:{ sc_epigrapher:["sc_ventris","sc_kober"], sc_registrar:["sc_chadwick","sc_knorozov"], sc_statistician:["sc_proskouriakoff","sc_thompson"] },
    sc_study:{ sc_epigrapher:["sc_saussure","sc_jones"], sc_registrar:["sc_rask","sc_grimm"], sc_statistician:["sc_gelb","sc_friedman"] }
  },
  TOPICS:{
    // cell: Epigrapher Tuma @ The Tablet Gallery & Find-Site
    sc_champollion:{ sci:"Jean-François Champollion (1790–1832)", topic:"The decipherment of hieroglyphs", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: Epigrapher Tuma @ The Tablet Gallery & Find-Site
    sc_young:{ sci:"Thomas Young (1773–1829)", topic:"The Rosetta Stone & phonetic values", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: Registrar Ode @ The Tablet Gallery & Find-Site
    sc_grotefend:{ sci:"Georg F. Grotefend (1775–1853)", topic:"The first cuneiform readings", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: Registrar Ode @ The Tablet Gallery & Find-Site
    sc_rawlinson:{ sci:"Henry Rawlinson (1810–1895)", topic:"The Behistun inscription & Old Persian", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: Analyst Ven @ The Tablet Gallery & Find-Site
    sc_hincks:{ sci:"Edward Hincks (1792–1866)", topic:"Akkadian cuneiform", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: Analyst Ven @ The Tablet Gallery & Find-Site
    sc_hrozny:{ sci:"Bedřich Hrozný (1879–1952)", topic:"The decipherment of Hittite", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: Epigrapher Tuma @ The Epigraphy Lab
    sc_ventris:{ sci:"Michael Ventris (1922–1956)", topic:"The decipherment of Linear B", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: Epigrapher Tuma @ The Epigraphy Lab
    sc_kober:{ sci:"Alice Kober (1906–1950)", topic:"The grids that prepared Linear B", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: Registrar Ode @ The Epigraphy Lab
    sc_chadwick:{ sci:"John Chadwick (1920–1998)", topic:"Documents in Mycenaean Greek", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: Registrar Ode @ The Epigraphy Lab
    sc_knorozov:{ sci:"Yuri Knorozov (1922–1999)", topic:"The phonetic decipherment of Maya glyphs", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: Analyst Ven @ The Epigraphy Lab
    sc_proskouriakoff:{ sci:"Tatiana Proskouriakoff (1909–1985)", topic:"Reading Maya historical inscriptions", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: Analyst Ven @ The Epigraphy Lab
    sc_thompson:{ sci:"J. Eric S. Thompson (1898–1975)", topic:"The authority who resisted Maya decipherment", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Epigrapher Tuma @ The Decipherment Study
    sc_saussure:{ sci:"Ferdinand de Saussure (1857–1913)", topic:"The linguistic sign & structure", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Epigrapher Tuma @ The Decipherment Study
    sc_jones:{ sci:"William Jones (1746–1794)", topic:"Comparative philology & Indo-European", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: Registrar Ode @ The Decipherment Study
    sc_rask:{ sci:"Rasmus Rask (1787–1832)", topic:"Comparative grammar & sound laws", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: Registrar Ode @ The Decipherment Study
    sc_grimm:{ sci:"Jacob Grimm (1785–1863)", topic:"Grimm's law of sound shifts", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: Analyst Ven @ The Decipherment Study
    sc_gelb:{ sci:"Ignace J. Gelb (1907–1985)", topic:"Grammatology & the theory of writing", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: Analyst Ven @ The Decipherment Study
    sc_friedman:{ sci:"William F. Friedman (1891–1969)", topic:"Cryptanalysis & letter-frequency method", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    sc_epigrapher:{ sc_gallery:"", sc_epigraphy:"", sc_study:"" },
    sc_registrar:{ sc_gallery:"", sc_epigraphy:"", sc_study:"" },
    sc_statistician:{ sc_gallery:"", sc_epigraphy:"", sc_study:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"sc_epic", dismissalWhat:"sc_undecipherable",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};