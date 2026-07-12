// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"f_netout", title:"The Great Grey-Out", discipline:"Computer Networks & the Internet",
  teaser:"Half the web went dark in twenty minutes. A coordinated cyber-attack? An unlucky traffic surge? Or one bad config and a safety net someone removed?", overclaimTag:"a coordinated cyber-attack", truthTag:"a misconfiguration and a removed safeguard",
  venue:"the network-outage inquiry", agent:{name:"Investigator Tay Brennan", role:"Investigator's Notepad"},
  standingLabel:"Inquiry credibility", readingShort:"Pioneers", readingLabel:"Networking Pioneers",
  dossierName:"NETWORKING & INTERNET PIONEERS", enterLabel:"Open the inquiry", subt:"A deduction game inside the network-outage inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (a coordinated cyber-attack) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"netops", items:[
      {id:"attackers", label:"An outside attack crew"},
      {id:"netops", label:"Cory Idris — the network operations lead"},
      {id:"registry", label:"The routing registry"} ]},
    where:{ title:"Where it culminates", truth:"office", items:[
      {id:"routers", label:"The Core Routers & Peering"},
      {id:"noc", label:"The Network Operations Centre"},
      {id:"office", label:"The Operations Manager's Office"} ]},
    what:{ title:"What is happening", truth:"misconfig", items:[
      {id:"attack", label:"A coordinated attack knocked the network down"},
      {id:"surge", label:"An unlucky traffic surge — the internet is just fragile"},
      {id:"misconfig", label:"A routing misconfiguration and a removed safeguard cascaded"} ]}
  },
  PLACES:{
    routers:{name:"The Core Routers & Peering", xy:[140,90]},
    noc:{name:"The Network Operations Centre", xy:[330,240]},
    office:{name:"The Operations Manager's Office", xy:[520,90]}
  },
  EDGES:[["routers","noc"],["noc","office"]],
  CHARACTERS:{
    engineer:{ name:"The Network Engineer", role:"On-call network engineer", face:"🌐", badge:"N", legend:"the operations centre", hint:"Pushed the change on orders; the route filter had been switched off to save time." },
    peering:{ name:"The Peering Coordinator", role:"Peering & routing coordinator", face:"🔀", badge:"P", legend:"the router hall", hint:"Watches the routes; saw one bad announcement leak everywhere at once." },
    clerk:{ name:"The Clerk", role:"Change-records clerk", face:"🗂", badge:"C", legend:"the office", hint:"Keeps the change tickets — and the sign-off that removed the safety filter." }
  },
  TOPICMAP:{
    routers:{ engineer:["n_vision","n_packet"], peering:["n_packetname","n_queue"], clerk:["n_arpanet","n_tcpip"] },
    noc:{ engineer:["n_internetwork","n_dns"], peering:["n_dnsdesign","n_arch"], clerk:["n_spanning","n_congestion"] },
    office:{ engineer:["n_aqm","n_ethernet"], peering:["n_datagram","n_web"], clerk:["n_bgp","n_dnssec"] }
  },
  TOPICS:{
    // cell: The Network Engineer @ The Core Routers & Peering
    n_vision:{ sci:"J.C.R. Licklider (1915-1990)", topic:"The vision of networked computing", lede:"", no:1, profile:"",
      frame:"", q:[] },
    // cell: The Network Engineer @ The Core Routers & Peering
    n_packet:{ sci:"Paul Baran (1926-2011)", topic:"Packet switching & survivable networks", lede:"", no:2, profile:"",
      frame:"", q:[] },
    // cell: The Peering Coordinator @ The Core Routers & Peering
    n_packetname:{ sci:"Donald Davies (1924-2000)", topic:"Packet switching, named", lede:"", no:3, profile:"",
      frame:"", q:[] },
    // cell: The Peering Coordinator @ The Core Routers & Peering
    n_queue:{ sci:"Leonard Kleinrock (b. 1934)", topic:"Queueing theory & the ARPANET", lede:"", no:4, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Core Routers & Peering
    n_arpanet:{ sci:"Lawrence Roberts (1937-2018)", topic:"Building the ARPANET", lede:"", no:5, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Core Routers & Peering
    n_tcpip:{ sci:"Vint Cerf (b. 1943)", topic:"TCP/IP", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: The Network Engineer @ The Network Operations Centre
    n_internetwork:{ sci:"Bob Kahn (b. 1938)", topic:"TCP/IP & internetworking", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: The Network Engineer @ The Network Operations Centre
    n_dns:{ sci:"Jon Postel (1943-1998)", topic:"The DNS, addresses & IANA", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The Peering Coordinator @ The Network Operations Centre
    n_dnsdesign:{ sci:"Paul Mockapetris (b. 1948)", topic:"The Domain Name System", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The Peering Coordinator @ The Network Operations Centre
    n_arch:{ sci:"David D. Clark (b. 1944)", topic:"Internet architecture & robustness", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Network Operations Centre
    n_spanning:{ sci:"Radia Perlman (b. 1951)", topic:"The spanning-tree protocol", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Network Operations Centre
    n_congestion:{ sci:"Van Jacobson (b. 1950)", topic:"TCP congestion control", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: The Network Engineer @ The Operations Manager's Office
    n_aqm:{ sci:"Sally Floyd (1950-2019)", topic:"Congestion control & active queue management", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: The Network Engineer @ The Operations Manager's Office
    n_ethernet:{ sci:"Robert Metcalfe (b. 1946)", topic:"Ethernet", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The Peering Coordinator @ The Operations Manager's Office
    n_datagram:{ sci:"Louis Pouzin (b. 1931)", topic:"The datagram", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The Peering Coordinator @ The Operations Manager's Office
    n_web:{ sci:"Tim Berners-Lee (b. 1955)", topic:"The World Wide Web", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Operations Manager's Office
    n_bgp:{ sci:"Yakov Rekhter (Internet-routing pioneer)", topic:"The Border Gateway Protocol", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Operations Manager's Office
    n_dnssec:{ sci:"Dan Kaminsky (1979-2021)", topic:"DNS security & cache poisoning", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    engineer:{ routers:"", noc:"", office:"" },
    peering:{ routers:"", noc:"", office:"" },
    clerk:{ routers:"", noc:"", office:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"attack", dismissalWhat:"surge",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};