// Generates 5 ADDITIONAL Casebook game skeletons (marine, dam, rail, rocket,
// nuclear) as pack_<id>.js starters, prose fields left empty for authoring.
// Same structure/shape as generate_starters.js. Run: node generate_more.js
const fs = require('fs');
const XY = [[140,90],[330,240],[520,90]];

const GAMES = [
{ id:"marine", title:"The Kestrel's Roll", discipline:"Marine & Naval Architecture",
  teaser:"A packed ferry rolled over in calm water minutes from port. An attack? A freak wave? Or a number in the loading book?",
  overclaimTag:"a torpedo or attack", truthTag:"a concealed loss of stability",
  venue:"the Kestrel ferry inquiry", agent:"Investigator Mara Ostend", standingLabel:"Board credibility",
  readingShort:"Pioneers", readingLabel:"Naval-Architecture Pioneers", dossierName:"NAVAL-ARCHITECTURE PIONEERS",
  enterLabel:"Open the inquiry", subt:"A deduction game inside the Kestrel ferry inquiry",
  who:{truth:"operator", items:[["operator","Harmon Vell — ferry line owner"],["captain","Captain Iris Sund — ship's master"],["surveyor","The maritime surveyor"]]},
  where:{truth:"office", items:[["cardeck","The Vehicle Deck & Bow Door"],["bridge","The Bridge & Ballast Controls"],["office","The Ferry Line's Office"]]},
  what:{truth:"stability", overclaim:"attack", dismissal:"rogue", items:[["attack","A torpedo, mine, or deliberate attack"],["rogue","A freak rogue wave — an act of God"],["stability","A concealed loss of stability from overloading"]]},
  places:["cardeck","bridge","office"],
  chars:[["bosun","Bosun Adisa","Deck bosun & loading hand","⚓","B","the car deck","Waved the cars aboard; knows they were never tallied or lashed."],
         ["purser","The Purser","Ship's purser & records","🗂","P","the office","Holds the manifests and the head-count the sailing was booked past."],
         ["pilot","Harbor Pilot Enns","Harbor pilot","🧭","H","the quay","Boards every ship; saw the Kestrel riding low, her marks underwater."]],
  topics:[["buoyancy","Archimedes (c.287-212 BC)","Buoyancy & displacement"],["metacentre","Pierre Bouguer (1698-1758)","Metacentric height & stability"],
    ["floatstab","Christiaan Huygens (1629-1695)","The stability of floating bodies"],["loadline","Samuel Plimsoll (1824-1898)","The load line & overloading"],
    ["hullform","Frederik H. af Chapman (1721-1808)","Naval architecture & hull form"],["modeltest","William Froude (1810-1879)","Model testing & the Froude number"],
    ["modelbasin","David W. Taylor (1864-1940)","The ship model basin"],["shiptheory","William J. M. Rankine (1820-1872)","Shipbuilding theory & stability"],
    ["waves","John Scott Russell (1808-1882)","Waves & the wave-line hull"],["wake","Lord Kelvin — William Thomson (1824-1907)","The ship wake & the tides"],
    ["viscousdrag","George Gabriel Stokes (1819-1903)","Viscosity & water resistance"],["freesurface","Sir William H. White (1845-1913)","Roll & the free-surface effect"],
    ["scaling","Osborne Reynolds (1842-1912)","Turbulence & scale models"],["currents","Vagn Walfrid Ekman (1874-1954)","Wind-driven currents & drift"],
    ["charts","Matthew Fontaine Maury (1806-1873)","Wind & current charts"],["forecast","Robert FitzRoy (1805-1865)","Weather forecasting & storm warnings"],
    ["gyro","Elmer Sperry (1860-1930)","The gyrocompass & ship stabilizer"],["hydrostatics","Blaise Pascal (1623-1662)","Hydrostatic pressure"]],
},
{ id:"dam", title:"The Marrow Valley Dam", discipline:"Hydraulics & Geotechnics",
  teaser:"An earth dam let go at midnight and took the town below. Sabotage? A thousand-year flood? Or seepage someone ignored?",
  overclaimTag:"sabotage or an earthquake", truthTag:"a concealed internal erosion",
  venue:"the Marrow Valley dam inquiry", agent:"Inspector Dale Ferran", standingLabel:"Engineering credibility",
  readingShort:"Pioneers", readingLabel:"Hydraulics Pioneers", dossierName:"HYDRAULICS & SOIL PIONEERS",
  enterLabel:"Open the inquiry", subt:"A deduction game inside the Marrow Valley dam inquiry",
  who:{truth:"owner", items:[["owner","Cass Herrick — dam owner"],["chief","The chief engineer"],["inspector","The state dam inspector"]]},
  where:{truth:"office", items:[["spillway","The Spillway & Outlet Works"],["embankment","The Embankment & Abutment"],["office","The Owner's Project Office"]]},
  what:{truth:"piping", overclaim:"attack", dismissal:"flood", items:[["attack","Sabotage or an earthquake strike"],["flood","A freak flood — an act of God"],["piping","A concealed internal erosion through the dam"]]},
  places:["spillway","embankment","office"],
  chars:[["warden","Warden Sol","Downstream warden","💧","W","the toe","Walks the toe of the dam; logged the muddy seepage that kept growing."],
         ["clerk","The Clerk","Records clerk","🗂","C","the office","Keeps the inspection reports and the change-orders that shelved them."],
         ["surveyor","Surveyor Pine","Embankment surveyor","📐","S","the crest","Reads the instruments on the crest; the settlement gauges were moving."]],
  topics:[["hydrostatics","Blaise Pascal (1623-1662)","Hydrostatic pressure & head"],["channelflow","Antoine de Chezy (1718-1798)","Open-channel flow"],
    ["seepage","Henry Darcy (1803-1858)","Darcy's law & seepage"],["resistance","Robert Manning (1816-1897)","Flow resistance"],
    ["filters","Allen Hazen (1869-1930)","Filters, grain size & piping"],["flownets","Arthur Casagrande (1902-1981)","Seepage, piping & flow nets"],
    ["porepressure","Alec Skempton (1914-2001)","Soil mechanics & pore pressure"],["obsmethod","Ralph B. Peck (1912-2008)","The observational method"],
    ["shallowwater","Adhemar Barre de Saint-Venant (1797-1886)","The shallow-water equations"],["soilstress","Joseph Boussinesq (1842-1929)","Stresses in a soil mass"],
    ["stfrancis","William Mulholland (1855-1935)","The St. Francis Dam & the duty to warn"],["floodnumerics","Lewis Fry Richardson (1881-1953)","Numerical flood prediction"],
    ["infiltration","Robert E. Horton (1875-1945)","Infiltration & runoff"],["openchannel","Ven Te Chow (1919-1981)","Open-channel hydraulics"],
    ["seismicdam","Nathan M. Newmark (1910-1981)","Earthquake design of dams"],["damdesign","Julian Hinds (1881-1977)","Gravity & earth-dam design"],
    ["damsafety","John R. Freeman (1855-1932)","Hydraulics & dam safety"],["fluidmech","Hunter Rouse (1906-1996)","Fluid mechanics & hydraulics"]],
},
{ id:"rail", title:"The 8:14 to Ardenmoor", discipline:"Railway Safety Engineering",
  teaser:"A commuter train left the rails on a straight. A bomb on the line? A careless driver? Or maintenance quietly deferred?",
  overclaimTag:"sabotage on the line", truthTag:"concealed deferred maintenance",
  venue:"the Ardenmoor rail inquiry", agent:"Investigator Wren Halcott", standingLabel:"Inquiry credibility",
  readingShort:"Pioneers", readingLabel:"Railway Pioneers", dossierName:"RAILWAY PIONEERS",
  enterLabel:"Open the inquiry", subt:"A deduction game inside the Ardenmoor rail inquiry",
  who:{truth:"infra", items:[["infra","Doran Kell — infrastructure operator"],["driver","The train driver"],["regulator","The rail safety inspector"]]},
  where:{truth:"office", items:[["track","The Track & Points"],["signalbox","The Signal Centre"],["office","The Operator's Head Office"]]},
  what:{truth:"neglect", overclaim:"sabotage", dismissal:"driver", items:[["sabotage","Sabotage — something left on the line"],["driver","Simple driver error — a signal passed"],["neglect","Concealed deferred maintenance & a bypassed safeguard"]]},
  places:["track","signalbox","office"],
  chars:[["ganger","Ganger Roe","Permanent-way ganger","🔧","R","the track","Walks the rails; flagged the cracked joint that was never renewed."],
         ["signaller","The Signaller","Signal-centre operator","🚦","S","the box","Worked the panel; knows which safeguard was switched out to keep trains running."],
         ["clerk","The Clerk","Records clerk","🗂","C","the office","Holds the maintenance backlog and the budget memo that froze it."]],
  topics:[["railpioneer","George Stephenson (1781-1848)","The Rocket & the birth of railways"],["gauge","Isambard Kingdom Brunel (1806-1859)","Gauge, track & the Great Western"],
    ["locomotive","Robert Stephenson (1803-1859)","Locomotives & rail bridges"],["airbrake","George Westinghouse (1846-1914)","The fail-safe air brake"],
    ["railprofile","Charles Vignoles (1793-1875)","The flat-bottom rail"],["interlocking","John Saxby (1821-1913)","Signal interlocking"],
    ["steelrail","Henry Bessemer (1813-1898)","Steel & the durable rail"],["fatigue","August Wohler (1819-1914)","Metal fatigue & the railway axle"],
    ["axlefail","William J. M. Rankine (1820-1872)","Fatigue & the failure of axles"],["electrictraction","Werner von Siemens (1816-1892)","Electric traction"],
    ["mucontrol","Frank J. Sprague (1857-1934)","Electric railways & multiple-unit control"],["stresses","Karl Culmann (1821-1881)","Graphic statics & stress"],
    ["vibration","Stephen Timoshenko (1878-1972)","Strength of materials & vibration"],["mechanics","Jean-Victor Poncelet (1788-1867)","Work, energy & applied mechanics"],
    ["brittle","Constance Tipper (1894-1995)","Brittle fracture & cold rails"],["wheelrail","Heinrich Hertz (1857-1894)","Contact stress: wheel on rail"],
    ["speed","Sir Nigel Gresley (1876-1941)","Speed, streamlining & the locomotive"],["safetyvalve","Timothy Hackworth (1786-1850)","Early locomotives & the safety valve"]],
},
{ id:"rocket", title:"Meridian-1", discipline:"Rocketry & Spaceflight",
  teaser:"A rocket tore apart on ascent, live on every screen. An enemy strike? Sheer bad luck? Or a warning that was overruled?",
  overclaimTag:"sabotage or a strike", truthTag:"a known flaw flown anyway",
  venue:"the Meridian-1 launch inquiry", agent:"Investigator Sol Reyes", standingLabel:"Commission credibility",
  readingShort:"Pioneers", readingLabel:"Spaceflight Pioneers", dossierName:"SPACEFLIGHT PIONEERS",
  enterLabel:"Open the inquiry", subt:"A deduction game inside the Meridian-1 launch inquiry",
  who:{truth:"program", items:[["program","Director Halloran — launch program manager"],["engineer","The propulsion engineer"],["contractor","The booster contractor"]]},
  where:{truth:"mgmt", items:[["pad","The Launch Pad & Booster"],["telemetry","The Telemetry & Data Room"],["mgmt","The Program Management Office"]]},
  what:{truth:"knownflaw", overclaim:"sabotage", dismissal:"freak", items:[["sabotage","Sabotage or an enemy strike"],["freak","A freak one-off failure — bad luck"],["knownflaw","A known joint flaw flown anyway, its warning overruled"]]},
  places:["pad","telemetry","mgmt"],
  chars:[["padtech","Pad Tech Rios","Pad technician","🔧","R","the pad","Bolts up the booster; saw the seals blow by on the last cold morning."],
         ["telem","The Telemetry Analyst","Telemetry analyst","📈","T","the data room","Reads the traces; the pressure trace tells a story no one wanted filed."],
         ["clerk","The Clerk","Program records clerk","🗂","C","the office","Keeps the memos — including the launch-eve warning that was overruled."]],
  topics:[["rocketeq","Konstantin Tsiolkovsky (1857-1935)","The rocket equation"],["liquidfuel","Robert H. Goddard (1882-1945)","Liquid-fuel rockets"],
    ["spaceflight","Hermann Oberth (1894-1989)","Spaceflight theory"],["bigrocket","Wernher von Braun (1912-1977)","Large launch vehicles"],
    ["chiefdesigner","Sergei Korolev (1907-1966)","Orbital launch & the chief designer"],["engines","Valentin Glushko (1908-1989)","Rocket engines & combustion"],
    ["combustion","Theodore von Karman (1881-1963)","Combustion instability & JPL"],["propellant","Frank Malina (1912-1981)","Solid propellants & JPL"],
    ["systems","Qian Xuesen (1911-2009)","Rocketry & systems engineering"],["trajectory","Katherine Johnson (1918-2020)","Trajectory & orbital mechanics"],
    ["propulsiondesign","Yvonne Brill (1924-2013)","Propulsion & station-keeping"],["reliability","Robert Lusser (1899-1969)","Reliability & the weakest link"],
    ["oring","Richard Feynman (1918-1988)","The O-ring, cold & the commission"],["nozzle","Gustaf de Laval (1845-1913)","The converging-diverging nozzle"],
    ["staging","Mikhail Tikhonravov (1900-1974)","Multistage rockets & clustering"],["guidance","Charles Stark Draper (1901-1987)","Inertial guidance"],
    ["flightsoftware","Margaret Hamilton (b. 1936)","Flight software & Apollo"],["systemsafety","Nancy Leveson (b. 1948)","System safety & organizational risk"]],
},
{ id:"reactor", title:"The Thornbury Reactor", discipline:"Nuclear Reactor Safety",
  teaser:"A reactor ran wild during a night-shift test. An attack? A one-in-a-billion fluke? Or a design flaw someone buried?",
  overclaimTag:"sabotage or an attack", truthTag:"a concealed reactor design flaw",
  venue:"the Thornbury reactor inquiry", agent:"Inspector Ada Vrain", standingLabel:"Inquiry credibility",
  readingShort:"Pioneers", readingLabel:"Nuclear Pioneers", dossierName:"NUCLEAR PIONEERS",
  enterLabel:"Open the inquiry", subt:"A deduction game inside the Thornbury reactor inquiry",
  who:{truth:"designer", items:[["operator","Operations chief Marsh"],["designer","Aldous Reeve — chief reactor designer"],["regulator","The nuclear inspector"]]},
  where:{truth:"designoffice", items:[["control","The Reactor Control Room"],["hall","The Reactor Hall & Core"],["designoffice","The Design Authority's Office"]]},
  what:{truth:"designflaw", overclaim:"attack", dismissal:"freak", items:[["attack","Sabotage or an attack on the plant"],["freak","A freak accident — vanishingly unlikely"],["designflaw","A concealed reactor design flaw, run past its margin"]]},
  places:["control","hall","designoffice"],
  chars:[["operator2","Operator Nadia Sorel","Reactor operator","🎛","O","the control room","Ran the test to the book she was handed; the book was wrong."],
         ["healthphys","The Health Physicist","Health physicist","☢","H","the reactor hall","Reads the dose and the core; knows how fast the power really ran away."],
         ["clerk","The Clerk","Design-office clerk","🗂","C","the office","Keeps the design files — and the flaw report stamped and shelved."]],
  topics:[["radioactivity","Marie Curie (1867-1934)","Radioactivity"],["nucleus","Ernest Rutherford (1871-1937)","The nuclear atom"],
    ["neutron","James Chadwick (1891-1974)","The neutron"],["fission","Lise Meitner (1878-1968)","Nuclear fission"],
    ["fissionchem","Otto Hahn (1879-1968)","The chemistry of fission"],["chainreaction","Leo Szilard (1898-1964)","The chain reaction"],
    ["firstpile","Enrico Fermi (1901-1954)","The first controlled pile"],["dropmodel","Niels Bohr (1885-1962)","The liquid-drop nucleus & fission"],
    ["reactorphysics","Eugene Wigner (1902-1995)","Reactor physics & the Wigner effect"],["reactoreng","Walter Zinn (1906-2000)","Reactor engineering & control"],
    ["betadecay","Chien-Shiung Wu (1912-1997)","Beta decay & precision measurement"],["navalreactor","Hyman Rickover (1900-1986)","The naval reactor & safety culture"],
    ["inherentsafety","Alvin Weinberg (1915-2006)","Reactor design & inherent safety"],["delayedneutrons","John Wheeler (1911-2008)","Fission theory & delayed neutrons"],
    ["healthphysics","Karl Z. Morgan (1907-1999)","Health physics & radiation dose"],["halflife","Frederick Soddy (1877-1956)","Isotopes & half-life"],
    ["riskassessment","Norman Rasmussen (1927-2003)","Reactor risk assessment"],["riskcell","Chauncey Starr (1912-2007)","Risk, safety & how safe is safe enough"]],
},
];

function esc(s){ return String(s).replace(/\\/g,'\\\\').replace(/"/g,'\\"'); }
function catBlock(name,c){
  const items=c.items.map(([id,label])=>`      {id:"${id}", label:"${esc(label)}"}`).join(",\n");
  const title = name==="who"?"Who is behind it":name==="where"?"Where it culminates":"What is happening";
  return `    ${name}:{ title:"${title}", truth:"${c.truth}", items:[\n${items} ]}`;
}
function starter(g){
  const P=[];
  P.push(`// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.`);
  P.push(`module.exports = { PACK: {`);
  P.push(`  id:"${g.id}", title:"${esc(g.title)}", discipline:"${esc(g.discipline)}",`);
  P.push(`  teaser:"${esc(g.teaser)}", overclaimTag:"${esc(g.overclaimTag)}", truthTag:"${esc(g.truthTag)}",`);
  P.push(`  venue:"${esc(g.venue)}", agent:{name:"${esc(g.agent)}", role:"Investigator's Notepad"},`);
  P.push(`  standingLabel:"${esc(g.standingLabel)}", readingShort:"${esc(g.readingShort)}", readingLabel:"${esc(g.readingLabel)}",`);
  P.push(`  dossierName:"${esc(g.dossierName)}", enterLabel:"${esc(g.enterLabel)}", subt:"${esc(g.subt)}", DAYS_TOTAL:8,`);
  P.push(`  boardNarr:"You have \${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",`);
  P.push(`  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",`);
  P.push(`  overclaimTease:"FILL: one italic sentence warning off the overclaim (${g.overclaimTag}) toward the truth, WITHOUT naming the true WHAT.",`);
  P.push(`  CATS:{`);
  P.push(catBlock("who",g.who)+",");
  P.push(catBlock("where",g.where)+",");
  P.push(catBlock("what",g.what));
  P.push(`  },`);
  const pl=g.places.map((id,i)=>{ const label=g.where.items.find(it=>it[0]===id)[1]; return `    ${id}:{name:"${esc(label)}", xy:[${XY[i][0]},${XY[i][1]}]}`; }).join(",\n");
  P.push(`  PLACES:{\n${pl}\n  },`);
  P.push(`  EDGES:[["${g.places[0]}","${g.places[1]}"],["${g.places[1]}","${g.places[2]}"]],`);
  const ch=g.chars.map(([id,name,role,face,badge,legend,hint])=>`    ${id}:{ name:"${esc(name)}", role:"${esc(role)}", face:"${face}", badge:"${badge}", legend:"${esc(legend)}", hint:"${esc(hint)}" }`).join(",\n");
  P.push(`  CHARACTERS:{\n${ch}\n  },`);
  const cells=[]; g.places.forEach(pl=>g.chars.forEach(c=>cells.push([pl,c[0]])));
  const tm={}; g.places.forEach(pl=>{tm[pl]={};});
  g.topics.forEach((t,idx)=>{ const [pl,inf]=cells[Math.floor(idx/2)]; (tm[pl][inf]=tm[pl][inf]||[]).push(t[0]); });
  const tmLines=g.places.map(pl=>`    ${pl}:{ ${g.chars.map(c=>`${c[0]}:["${tm[pl][c[0]][0]}","${tm[pl][c[0]][1]}"]`).join(", ")} }`).join(",\n");
  P.push(`  TOPICMAP:{\n${tmLines}\n  },`);
  const cellFor={}; g.topics.forEach((t,idx)=>{ cellFor[t[0]]=cells[Math.floor(idx/2)]; });
  const topicStubs=g.topics.map((t,i)=>{
    const [id,pioneer,concept]=t; const [pl,inf]=cellFor[id];
    const infName=g.chars.find(c=>c[0]===inf)[1]; const plName=g.where.items.find(it=>it[0]===pl)[1];
    return `    // cell: ${infName} @ ${plName}\n    ${id}:{ sci:"${esc(pioneer)}", topic:"${esc(concept)}", lede:"", no:${i+1}, profile:"",\n      frame:"", q:[] }`;
  }).join(",\n");
  P.push(`  TOPICS:{\n${topicStubs}\n  },`);
  const st=g.chars.map(c=>`    ${c[0]}:{ ${g.places.map(pl=>`${pl}:""`).join(", ")} }`).join(",\n");
  P.push(`  STORIES:{\n${st}\n  },`);
  P.push(`  story:[ "", "", "", "" ],`);
  P.push(`  endings:{ overclaimWhat:"${g.what.overclaim}", dismissalWhat:"${g.what.dismissal}",`);
  P.push(`    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },`);
  P.push(`    overclaim:{ title:"", body:["",""] },`);
  P.push(`    dismissal:{ title:"", body:["",""] },`);
  P.push(`    wrongNames:{ title:"", body:[""] } },`);
  P.push(`}};`);
  return P.join("\n");
}

GAMES.forEach(g=>{
  fs.writeFileSync(__dirname+`/pack_${g.id}.js`, starter(g));
  console.log("wrote pack_"+g.id+".js  ("+g.title+")");
});
console.log("\n"+GAMES.length+" new starters written.");
