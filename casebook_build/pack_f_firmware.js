// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"f_firmware", title:"The Halden Infusion Pump", discipline:"Embedded & Firmware Engineering",
  teaser:"A drug pump delivered a lethal dose to a sleeping patient. A tampered device? A one-in-a-million glitch? Or a defect hidden and a hardware check taken out?", overclaimTag:"a tampered device", truthTag:"a hidden firmware defect and a deleted hardware check",
  venue:"the infusion-pump firmware inquiry", agent:{name:"Investigator Dana Voss", role:"Investigator's Notepad"},
  standingLabel:"Inquiry credibility", readingShort:"Pioneers", readingLabel:"Firmware & Coding Pioneers",
  dossierName:"FIRMWARE, CODING & HARDWARE PIONEERS", enterLabel:"Open the inquiry", subt:"A deduction game inside the infusion-pump firmware inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (a tampered device) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"firmlead", items:[
      {id:"tamperer", label:"An outside tamperer"},
      {id:"firmlead", label:"Cal Devereux — the device firmware lead"},
      {id:"regulator", label:"The device regulator"} ]},
    where:{ title:"Where it culminates", truth:"office", items:[
      {id:"bench", label:"The Device & Test Bench"},
      {id:"firmlab", label:"The Firmware Verification Lab"},
      {id:"office", label:"The Engineering Lead's Office"} ]},
    what:{ title:"What is happening", truth:"defect", items:[
      {id:"tamper", label:"The device was tampered with"},
      {id:"glitch", label:"A one-in-a-million glitch — nothing preventable"},
      {id:"defect", label:"A concealed firmware defect and a hardware safety check removed"} ]}
  },
  PLACES:{
    bench:{name:"The Device & Test Bench", xy:[140,90]},
    firmlab:{name:"The Firmware Verification Lab", xy:[330,240]},
    office:{name:"The Engineering Lead's Office", xy:[520,90]}
  },
  EDGES:[["bench","firmlab"],["firmlab","office"]],
  CHARACTERS:{
    firmeng:{ name:"The Firmware Engineer", role:"Embedded firmware engineer", face:"💾", badge:"F", legend:"the firmware lab", hint:"Wrote the tests; the failing case was known and quietly closed as 'won't fix'." },
    hwtech:{ name:"The Hardware Test Engineer", role:"Hardware test engineer", face:"🔌", badge:"H", legend:"the test bench", hint:"Checks the boards; the safety watchdog chip was deleted to cut cost." },
    clerk:{ name:"The Clerk", role:"Design records clerk", face:"🗂", badge:"C", legend:"the office", hint:"Keeps the defect log — and the order to ship with the check removed." }
  },
  TOPICMAP:{
    bench:{ firmeng:["m_hamming","m_huffman"], hwtech:["m_fano","m_reed"], clerk:["m_solomon","m_viterbi"] },
    firmlab:{ firmeng:["m_ldpc","m_elias"], hwtech:["m_kilby","m_noyce"], clerk:["m_micro","m_vlsi"] },
    office:{ firmeng:["m_vlsimethod","m_microprog"], hwtech:["m_faulttol","m_faulttest"], clerk:["m_dependable","m_dependability"] }
  },
  TOPICS:{
    // cell: The Firmware Engineer @ The Device & Test Bench
    m_hamming:{ sci:"Richard Hamming (1915-1998)", topic:"Error-detecting & correcting codes", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: The Firmware Engineer @ The Device & Test Bench
    m_huffman:{ sci:"David A. Huffman (1925-1999)", topic:"Data compression & coding", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: The Hardware Test Engineer @ The Device & Test Bench
    m_fano:{ sci:"Robert Fano (1917-2016)", topic:"Information & coding theory", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: The Hardware Test Engineer @ The Device & Test Bench
    m_reed:{ sci:"Irving S. Reed (1923-2012)", topic:"Reed-Solomon error correction", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Device & Test Bench
    m_solomon:{ sci:"Gustave Solomon (1930-1996)", topic:"Reed-Solomon codes", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Device & Test Bench
    m_viterbi:{ sci:"Andrew Viterbi (b. 1935)", topic:"The Viterbi decoding algorithm", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: The Firmware Engineer @ The Firmware Verification Lab
    m_ldpc:{ sci:"Robert Gallager (b. 1931)", topic:"Low-density parity-check codes", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: The Firmware Engineer @ The Firmware Verification Lab
    m_elias:{ sci:"Peter Elias (1923-2001)", topic:"Convolutional codes & error control", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The Hardware Test Engineer @ The Firmware Verification Lab
    m_kilby:{ sci:"Jack Kilby (1923-2005)", topic:"The integrated circuit", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The Hardware Test Engineer @ The Firmware Verification Lab
    m_noyce:{ sci:"Robert Noyce (1927-1990)", topic:"The integrated circuit", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Firmware Verification Lab
    m_micro:{ sci:"Federico Faggin (b. 1941)", topic:"The microprocessor", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Firmware Verification Lab
    m_vlsi:{ sci:"Carver Mead (b. 1934)", topic:"VLSI design", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: The Firmware Engineer @ The Engineering Lead's Office
    m_vlsimethod:{ sci:"Lynn Conway (1938-2024)", topic:"VLSI design methodology", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: The Firmware Engineer @ The Engineering Lead's Office
    m_microprog:{ sci:"Maurice Wilkes (1913-2010)", topic:"Microprogramming & stored control", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The Hardware Test Engineer @ The Engineering Lead's Office
    m_faulttol:{ sci:"Algirdas Avizienis (1932-2022)", topic:"Fault-tolerant computing", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The Hardware Test Engineer @ The Engineering Lead's Office
    m_faulttest:{ sci:"Edward J. McCluskey (1929-2016)", topic:"Logic design & fault testing", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Engineering Lead's Office
    m_dependable:{ sci:"Brian Randell (b. 1936)", topic:"Dependable & fault-tolerant systems", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Engineering Lead's Office
    m_dependability:{ sci:"Jean-Claude Laprie (1944-2010)", topic:"The concepts of dependability", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    firmeng:{ bench:"", firmlab:"", office:"" },
    hwtech:{ bench:"", firmlab:"", office:"" },
    clerk:{ bench:"", firmlab:"", office:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"tamper", dismissalWhat:"glitch",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};