// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"t_wind", title:"The Fenmark Turbine Collapse", discipline:"Wind Energy & Fatigue Engineering",
  teaser:"A wind turbine threw a blade and toppled its tower. Sabotage? A freak gust? Or fatigue that maintenance would have found?", overclaimTag:"sabotage or a strike", truthTag:"blade & bolt fatigue with maintenance skipped",
  venue:"the Fenmark turbine inquiry", agent:{name:"Inspector Yara Doss", role:"Investigator's Notepad"},
  standingLabel:"Inquiry credibility", readingShort:"Pioneers", readingLabel:"Wind & Fatigue Pioneers",
  dossierName:"WIND & FATIGUE PIONEERS", enterLabel:"Open the inquiry", subt:"A deduction game inside the Fenmark turbine inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (sabotage or a strike) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"operator", items:[
      {id:"operator", label:"Sylvie Renn — wind-farm operator"},
      {id:"technician", label:"The turbine service lead"},
      {id:"regulator", label:"The turbine safety regulator"} ]},
    where:{ title:"Where it culminates", truth:"office", items:[
      {id:"nacelle", label:"The Nacelle & Rotor"},
      {id:"scada", label:"The SCADA Control Hut"},
      {id:"office", label:"The Operator's Asset Office"} ]},
    what:{ title:"What is happening", truth:"fatigue", items:[
      {id:"attack", label:"Sabotage or a strike on the tower"},
      {id:"freak", label:"A freak gust — an act of God"},
      {id:"fatigue", label:"Blade & bolt fatigue with maintenance skipped"} ]}
  },
  PLACES:{
    nacelle:{name:"The Nacelle & Rotor", xy:[140,90]},
    scada:{name:"The SCADA Control Hut", xy:[330,240]},
    office:{name:"The Operator's Asset Office", xy:[520,90]}
  },
  EDGES:[["nacelle","scada"],["scada","office"]],
  CHARACTERS:{
    climber:{ name:"Blade Tech Aro", role:"Rope-access technician", face:"🧗", badge:"A", legend:"the nacelle", hint:"Climbs the blades; photographed the cracked root and loose hub bolts." },
    scadaop:{ name:"The SCADA Operator", role:"Control-hut operator", face:"🖥", badge:"S", legend:"the control hut", hint:"Reads the vibration alarms that were muted to keep the turbine turning." },
    clerk:{ name:"The Clerk", role:"Asset-records clerk", face:"🗂", badge:"C", legend:"the office", hint:"Keeps the service logs and the maintenance rounds that were skipped." }
  },
  TOPICMAP:{
    nacelle:{ climber:["wd_betz","wd_lacour"], scadaop:["wd_brush","wd_juul"], clerk:["wd_hutter","wd_darrieus"] },
    scada:{ climber:["wd_savonius","wd_glauert"], scadaop:["wd_kutta","wd_rayleigh"], clerk:["wd_stodola","wd_mohr"] },
    office:{ climber:["wd_ewing","wd_gough"], scadaop:["wd_palmgren","wd_miner"], clerk:["wd_paris","wd_stribeck"] }
  },
  TOPICS:{
    // cell: Blade Tech Aro @ The Nacelle & Rotor
    wd_betz:{ sci:"Albert Betz (1885-1968)", topic:"The Betz limit & wind-turbine theory", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: Blade Tech Aro @ The Nacelle & Rotor
    wd_lacour:{ sci:"Poul la Cour (1846-1908)", topic:"The electricity-generating windmill", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: The SCADA Operator @ The Nacelle & Rotor
    wd_brush:{ sci:"Charles F. Brush (1849-1929)", topic:"The first automatic wind generator", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: The SCADA Operator @ The Nacelle & Rotor
    wd_juul:{ sci:"Johannes Juul (1887-1969)", topic:"AC wind power & the Gedser turbine", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Nacelle & Rotor
    wd_hutter:{ sci:"Ulrich Hutter (1910-1990)", topic:"Modern wind-turbine blade design", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Nacelle & Rotor
    wd_darrieus:{ sci:"Georges Darrieus (1888-1979)", topic:"The vertical-axis wind turbine", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: Blade Tech Aro @ The SCADA Control Hut
    wd_savonius:{ sci:"Sigurd Savonius (1884-1931)", topic:"The Savonius rotor", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: Blade Tech Aro @ The SCADA Control Hut
    wd_glauert:{ sci:"Hermann Glauert (1892-1934)", topic:"Blade-element momentum & rotor aerodynamics", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The SCADA Operator @ The SCADA Control Hut
    wd_kutta:{ sci:"Martin Kutta (1867-1944)", topic:"Airfoil lift theory", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The SCADA Operator @ The SCADA Control Hut
    wd_rayleigh:{ sci:"Lord Rayleigh (1842-1919)", topic:"Vibration & resonance", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The SCADA Control Hut
    wd_stodola:{ sci:"Aurel Stodola (1859-1942)", topic:"Turbine blades & vibration", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The SCADA Control Hut
    wd_mohr:{ sci:"Otto Mohr (1835-1918)", topic:"Stress analysis & Mohr's circle", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Blade Tech Aro @ The Operator's Asset Office
    wd_ewing:{ sci:"James Alfred Ewing (1855-1935)", topic:"Hysteresis & metal fatigue", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Blade Tech Aro @ The Operator's Asset Office
    wd_gough:{ sci:"Herbert J. Gough (1890-1965)", topic:"Metal fatigue research", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The SCADA Operator @ The Operator's Asset Office
    wd_palmgren:{ sci:"Arvid Palmgren (1890-1971)", topic:"Bearing life & cumulative fatigue", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The SCADA Operator @ The Operator's Asset Office
    wd_miner:{ sci:"Milton A. Miner (fatigue engineer)", topic:"Cumulative fatigue damage", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Operator's Asset Office
    wd_paris:{ sci:"Paul C. Paris (1930-2017)", topic:"Fatigue crack growth", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Operator's Asset Office
    wd_stribeck:{ sci:"Richard Stribeck (1861-1950)", topic:"Bearing friction & lubrication", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    climber:{ nacelle:"", scada:"", office:"" },
    scadaop:{ nacelle:"", scada:"", office:"" },
    clerk:{ nacelle:"", scada:"", office:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"attack", dismissalWhat:"freak",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};