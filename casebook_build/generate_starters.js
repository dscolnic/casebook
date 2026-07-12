// Encodes the 9 additional Casebook games (structural skeletons) and writes a
// starter pack_<id>.js for each, with prose fields left as stubs for authors.
const fs=require('fs');
const XY=[[140,90],[330,240],[520,90]];   // shared triangle board

const GAMES=[
{ id:"tower", title:"The Verrin Tower", discipline:"Structural Engineering",
  teaser:"A record-breaking tower has begun to groan in the wind. Fate, sabotage — or a number someone quietly changed?",
  overclaimTag:"deliberate sabotage", truthTag:"a concealed cut to the safety margin",
  venue:"the Verrin Tower inquiry", agent:"Inspector Dana Reyes", standingLabel:"Engineering credibility",
  readingShort:"Engineers", readingLabel:"Structural Pioneers", dossierName:"STRUCTURAL PIONEERS",
  enterLabel:"Enter the inquiry", subt:"A deduction game inside the Verrin Tower inquiry",
  who:{truth:"dev", items:[["dev","Marcus Ketterly — developer & owner"],["arch","Halvard Sten — celebrity architect"],["eng","Priya Anand — engineer of record"]]},
  where:{truth:"office", items:[["site","The Tower Site & its Connections"],["shop","The Steel Fabrication Shop"],["office","The Design & Project Office"]]},
  what:{truth:"cut", overclaim:"sabotage", dismissal:"act", items:[["sabotage","Deliberate sabotage or a planted charge"],["act","An unforeseeable freak wind — an act of God"],["cut","A concealed value-engineering cut to the safety factor"]]},
  places:["site","shop","office"],
  chars:[["foreman","Tomas Brandt","Site foreman & welder","🔩","F","the site","Bolted and welded every connection; watched inspectors get waved through."],
         ["clerk","The Clerk","Project records clerk","🗂","C","the office","Holds the drawings, change-orders, and memos that were meant to vanish."],
         ["driver","Odette Fer","Steel-yard driver","🚚","D","the yard","Hauls the beams and plate; knows what grade showed up versus what was ordered."]],
  topics:[["loads","John Smeaton (1724-1792)","Dead, live & wind loads"],["safetyfactor","Alfred Freudenthal (1906-1977)","The factor of safety & structural reliability"],
    ["tensioncomp","Robert Hooke (1635-1703)","Tension, compression & elasticity"],["buckling","Leonhard Euler (1707-1783)","Buckling of slender columns"],
    ["bending","Claude-Louis Navier (1785-1836)","Beams & bending"],["suspension","John A. Roebling (1806-1869)","Suspension & cables"],
    ["arch","Robert Maillart (1872-1940)","The arch & thin-shell concrete"],["tallsystems","Fazlur Rahman Khan (1929-1982)","Tall-building structural systems"],
    ["flutter","Theodore von Kármán (1881-1963)","Resonance & aeroelastic flutter"],["fatigue","August Wöhler (1819-1914)","Metal fatigue"],
    ["brittle","Constance Tipper (1894-1995)","Brittle fracture"],["connections","Hardy Cross (1885-1959)","Connections & indeterminate frames"],
    ["redundancy","Mario Salvadori (1907-1997)","Redundancy & progressive collapse"],["foundations","Karl Terzaghi (1883-1963)","Foundations & soil mechanics"],
    ["concrete","François Hennebique (1842-1921)","Reinforced concrete"],["windeng","Alan G. Davenport (1932-2009)","Wind engineering"],
    ["ethics","William LeMessurier (1926-2007)","Engineering ethics & the whistle"],["failurelesson","Henry Petroski (1942-2023)","Failure as the great teacher"]],
},
{ id:"outbreak", title:"The Meridian Fever", discipline:"Epidemiology",
  teaser:"A strange fever spreads through a river city. A weapon, a nothing, or a spillover someone let smolder?",
  overclaimTag:"an engineered bioweapon", truthTag:"a natural spillover with a buried delay",
  venue:"Meridian City", agent:"Dr. Iris Vale", standingLabel:"Public-health standing",
  readingShort:"Detectives", readingLabel:"Disease Detectives", dossierName:"DISEASE DETECTIVES",
  enterLabel:"Enter the field", subt:"A deduction game inside the Meridian fever investigation",
  who:{truth:"health", items:[["health","Director Payne — city health ministry"],["lab","Dr. Sorokin — virology lab head"],["vet","Dr. Adeyemi — market/veterinary inspector"]]},
  where:{truth:"market", items:[["hospital","Meridian General Hospital"],["market","The Riverside Live-Animal Market"],["lab","The Provincial Virology Lab"]]},
  what:{truth:"spillover", overclaim:"bioweapon", dismissal:"seasonal", items:[["bioweapon","A deliberately engineered bioweapon"],["seasonal","Just ordinary seasonal flu — nothing new"],["spillover","A natural animal-to-human spillover, its early spread hidden"]]},
  places:["hospital","market","lab"],
  chars:[["nurse","Nurse Mei","ER charge nurse","🩺","N","the ward","Saw the first cases — and the order to call them 'pneumonia of unknown cause.'"],
         ["tracer","Kofi the Tracer","Contact tracer","🗺","T","the field","Maps who infected whom; his line list keeps pointing back to the market."],
         ["techx","The Lab Tech","Sequencing technician","🧫","L","the lab","Reads the viral genomes; knows the family tree says 'nature,' not 'lab.'"]],
  topics:[["r0","Ronald Ross (1857-1932)","The basic reproduction number, R₀"],["transmission","Charles V. Chapin (1856-1941)","Modes of transmission"],
    ["incubation","Peter Panum (1820-1885)","Incubation & the serial interval"],["cfr","William Farr (1807-1883)","Case-fatality & vital statistics"],
    ["pcrtest","Kary Mullis (1944-2019)","PCR & molecular testing"],["serology","Emil von Behring (1854-1917)","Serology & antibodies"],
    ["tracing","William Foege (b. 1936)","Contact tracing & ring containment"],["linelist","Alexander Langmuir (1910-1993)","Surveillance & the line list"],
    ["reservoir","Frank Fenner (1914-2010)","Animal reservoirs & zoonosis"],["phylo","Carl Woese (1928-2012)","Phylogenetics: natural vs engineered"],
    ["spillevent","Robert Webster (1932-2024)","Spillover & One Health"],["vaccine","Edward Jenner (1749-1823)","Vaccination"],
    ["herd","Wade Hampton Frost (1880-1938)","Herd immunity"],["quarantine","Wu Lien-teh (1879-1960)","Quarantine & masks"],
    ["waterborne","John Snow (1813-1858)","Waterborne spread & the Broad Street pump"],["handwash","Ignaz Semmelweis (1818-1865)","Asepsis & handwashing"],
    ["koch","Robert Koch (1843-1910)","Koch's postulates & causation"],["datavis","Florence Nightingale (1820-1910)","Epidemiological data & the case for sanitation"]],
},
{ id:"forensics", title:"A Death at Ashford House", discipline:"Forensic Science",
  teaser:"A wealthy man is found dead in a locked study. Murder? Misadventure? Or a truth the evidence — not the theatrics — decides?",
  overclaimTag:"a framing by overstated 'certainty'", truthTag:"a concealed poisoning masked as natural death",
  venue:"the Ashford House inquest", agent:"Examiner Ruth Calloway", standingLabel:"Forensic credibility",
  readingShort:"Pioneers", readingLabel:"Forensic Pioneers", dossierName:"FORENSIC PIONEERS",
  enterLabel:"Open the case", subt:"A deduction game inside the Ashford House inquest",
  who:{truth:"physician", items:[["nephew","Julian Ashford — the heir"],["physician","Dr. Merrick — family physician"],["maid","Agnes — the housekeeper"]]},
  where:{truth:"dispensary", items:[["study","The Locked Study"],["dispensary","The House Dispensary"],["conservatory","The Conservatory"]]},
  what:{truth:"poison", overclaim:"murderpin", dismissal:"natural", items:[["murderpin","A violent murder — the heir, by a forensic 'match'"],["natural","Natural causes — a simple heart attack"],["poison","A concealed poisoning disguised as natural death"]]},
  places:["study","dispensary","conservatory"],
  chars:[["constable","Constable Pike","First officer on scene","🔦","P","the scene","Secured the study; worries the 'obvious' match is too neat."],
         ["pathologist","Dr. Okafor","Police pathologist","⚖","M","the morgue","Reads the body — livor, rigor, stomach contents — and won't be rushed."],
         ["chemist","The Analyst","Toxicology chemist","🧪","A","the lab","Runs the assays; a poison leaves a signature if you know the test."]],
  topics:[["locard","Edmond Locard (1877-1966)","Locard's exchange principle"],["tod","Bernard Spilsbury (1877-1947)","Time of death: algor, rigor & livor mortis"],
    ["toxicology","Mathieu Orfila (1787-1853)","Toxicology & poisons"],["dna","Alec Jeffreys (b. 1950)","DNA profiling"],
    ["fingerprint","Henry Faulds (1843-1930)","Fingerprints"],["bloodtype","Karl Landsteiner (1868-1943)","Blood groups & serology"],
    ["ballistics","Calvin Goddard (1891-1955)","Ballistics & the comparison microscope"],["bloodspatter","Herbert MacDonell (1928-2019)","Bloodstain-pattern analysis"],
    ["entomology","Jean Pierre Mégnin (1828-1905)","Forensic entomology"],["questioneddocs","Albert S. Osborn (1858-1946)","Questioned documents & forgery"],
    ["traceevidence","Paul L. Kirk (1902-1970)","Trace evidence & its limits"],["biasmatch","Itiel Dror (forensic-cognition researcher)","Cognitive bias & the overstated 'match'"],
    ["chainofcustody","Hans Gross (1847-1915)","Criminalistics & chain of custody"],["autopsy","Rudolf Virchow (1821-1902)","The medico-legal autopsy"],
    ["poisondetect","James Marsh (1794-1846)","Detecting poison: the Marsh test"],["anthropology","William M. Bass (b. 1928)","Forensic anthropology"],
    ["crimescene","Frances Glessner Lee (1878-1962)","Scene reconstruction"],["identification","Alphonse Bertillon (1853-1914)","Identification & forensic photography"]],
},
{ id:"signal", title:"The Vasca Signal", discipline:"Astronomy & Astrophysics",
  teaser:"A repeating radio burst has an observatory in an uproar. First contact? A glitch? Or a new kind of star nobody's named?",
  overclaimTag:"an alien technosignature", truthTag:"a natural transient, oversold",
  venue:"the Vasca Ridge Observatory", agent:"Dr. Halley Renn", standingLabel:"Scientific standing",
  readingShort:"Pioneers", readingLabel:"Astronomy Pioneers", dossierName:"ASTRONOMY PIONEERS",
  enterLabel:"Enter the observatory", subt:"A deduction game inside the Vasca Ridge signal review",
  who:{truth:"director", items:[["director","Director Okonkwo — observatory head"],["grad","Sela Voss — the grad student who found it"],["instr","Dr. Reyes — instrument scientist"]]},
  where:{truth:"control", items:[["dish","The Radio Dish & Feed"],["control","The Control Room & Data Pipeline"],["archive","The Archive & Calibration Lab"]]},
  what:{truth:"transient", overclaim:"aliens", dismissal:"glitch", items:[["aliens","An alien technosignature — first contact"],["glitch","A mere instrument glitch or interference"],["transient","A new natural transient (a magnetar), oversold"]]},
  places:["dish","control","archive"],
  chars:[["op","Bo the Night Op","Telescope operator","📡","O","the dish","Runs the dish overnight; knows which 'signals' are just planes and phones."],
         ["eng","The Pipeline Engineer","Data-pipeline engineer","💾","E","the pipeline","Reduces the raw data; can show where a calibration step went wrong."],
         ["theo","Dr. Amara","Theoretical astrophysicist","✶","H","the whiteboard","Knows what nature can and can't do; skeptical of extraordinary claims."]],
  topics:[["radio","Karl Jansky (1905-1950)","The birth of radio astronomy"],["rfi","Grote Reber (1911-2002)","Interference: cosmic vs terrestrial"],
    ["dispersion","Duncan Lorimer (radio astronomer)","Dispersion measure & distance"],["pulsars","Jocelyn Bell Burnell (b. 1943)","Pulsars & 'LGM-1'"],
    ["magnetars","Chryssa Kouveliotou (b. 1953)","Magnetars"],["frbs","Victoria Kaspi (b. 1967)","Fast radio bursts"],
    ["doppler","Christian Doppler (1803-1853)","The Doppler effect & redshift"],["standardcandle","Henrietta Swan Leavitt (1868-1921)","Cepheids & the distance ladder"],
    ["expansion","Edwin Hubble (1889-1953)","Cosmic expansion"],["blackbody","Gustav Kirchhoff (1824-1887)","Thermal radiation & Kirchhoff's laws"],
    ["composition","Cecilia Payne-Gaposchkin (1900-1979)","What the stars are made of"],["seti","Frank Drake (1930-2022)","SETI & technosignatures"],
    ["extraordinary","Carl Sagan (1934-1996)","Extraordinary claims & evidence"],["interferometry","Martin Ryle (1918-1984)","Interferometry & resolution"],
    ["darkmatter","Vera Rubin (1928-2016)","Rotation curves & dark matter"],["cmb","Arno Penzias (1933-2024)","A cosmic signal mistaken for noise"],
    ["parallax","Friedrich Bessel (1784-1846)","Parallax & stellar distance"],["supernovae","Fritz Zwicky (1898-1974)","Supernovae & neutron stars"]],
},
{ id:"aircrash", title:"The Fall of Ardent 9", discipline:"Aerospace Engineering",
  teaser:"A brand-new airliner fell from a clear sky. Terror? Pilot error? Or something the maker knew and the schedule buried?",
  overclaimTag:"terrorism or a bomb", truthTag:"a concealed flight-control flaw",
  venue:"the Ardent 9 accident board", agent:"Investigator Sam Okoye", standingLabel:"Board credibility",
  readingShort:"Pioneers", readingLabel:"Aviation Pioneers", dossierName:"AVIATION PIONEERS",
  enterLabel:"Open the inquiry", subt:"A deduction game inside the Ardent 9 accident board",
  who:{truth:"maker", items:[["crew","The flight crew"],["maker","Vaughn — manufacturer program manager"],["airline","The airline's maintenance chief"]]},
  where:{truth:"designbay", items:[["wreck","The Wreckage & Recorders"],["hangar","The Airline Maintenance Hangar"],["designbay","The Manufacturer's Design Bay"]]},
  what:{truth:"flaw", overclaim:"terror", dismissal:"piloterror", items:[["terror","A bomb or deliberate sabotage"],["piloterror","Simple pilot error — nothing systemic"],["flaw","A concealed flight-control/design flaw"]]},
  places:["wreck","hangar","designbay"],
  chars:[["atc","Controller Diaz","Air-traffic controller","🗼","C","the tower","Heard the crew's last calls; knows the plane was fighting itself."],
         ["mech","Mechanic Rao","Line mechanic","🔧","M","the hangar","Signed off the airframe; noticed a sensor that kept being replaced."],
         ["whistle","The Whistleblower","Manufacturer test engineer","✈","W","the design bay","Flagged the control system in testing; was told to stay quiet."]],
  topics:[["lift","Ludwig Prandtl (1875-1953)","Lift & the boundary layer"],["stall","Otto Lilienthal (1848-1896)","Angle of attack & the stall"],
    ["drag","Frederick Lanchester (1868-1946)","Drag & circulation"],["stability","George Cayley (1773-1857)","Stability & the forces of flight"],
    ["controls","The Wright Brothers (1867-1912 / 1871-1948)","Three-axis flight control"],["loadfactor","Max Munk (1890-1986)","Aerodynamic & gust loads"],
    ["fatigue","Arnold Hall (1915-2000)","Metal fatigue & the Comet inquiry"],["flutter","Theodore von Kármán (1881-1963)","Aeroelastic flutter"],
    ["automation","Earl Wiener (1933-2013)","Automation & the human factor"],["accidentchain","James Reason (human-error researcher)","The accident chain & the Swiss-cheese model"],
    ["propulsion","Frank Whittle (1907-1996)","The jet engine"],["pressurization","Geoffrey de Havilland (1882-1965)","Pressurization & the Comet windows"],
    ["balance","Jerome Hunsaker (1886-1984)","Weight, balance & center of gravity"],["recorders","David Warren (1925-2010)","The black-box recorders"],
    ["humanfactors","Paul Fitts (1912-1965)","Human factors & cockpit design"],["certification","Jerome Lederer (1902-2004)","Airworthiness & safety culture"],
    ["airspeed","Henri Pitot (1695-1771)","Airspeed, the pitot tube & icing"],["windtunnel","Osborne Reynolds (1842-1912)","Similitude & wind-tunnel testing"]],
},
{ id:"volcano", title:"The Halcyon Caldera", discipline:"Volcanology & Seismology",
  teaser:"The mountain above the town is stirring. Do you evacuate — and risk crying wolf — or trust the official 'all clear'?",
  overclaimTag:"an imminent apocalypse", truthTag:"a real, uncertain hazard being downplayed",
  venue:"the Halcyon Volcano Observatory", agent:"Dr. Nils Aakre", standingLabel:"Scientific standing",
  readingShort:"Pioneers", readingLabel:"Earth-Science Pioneers", dossierName:"EARTH-SCIENCE PIONEERS",
  enterLabel:"Enter the observatory", subt:"A deduction game inside the Halcyon eruption crisis",
  who:{truth:"mayor", items:[["director","The observatory director"],["geologist","Dr. Sasi — field geologist"],["mayor","Mayor Holt — civil-protection chief"]]},
  where:{truth:"town", items:[["summit","The Summit & Crater"],["station","The Monitoring Station"],["town","The Town & Evacuation Zone"]]},
  what:{truth:"hazard", overclaim:"apocalypse", dismissal:"allclear", items:[["apocalypse","A civilization-ending supereruption"],["allclear","Nothing — harmless steam, all clear"],["hazard","A real, imminent, survivable-if-you-act hazard, downplayed"]]},
  places:["summit","station","town"],
  chars:[["guide","Guide Rún","Mountain guide","⛰","G","the summit","Knows the mountain's moods; smells the sulfur changing."],
         ["seismo","The Seismologist","Duty seismologist","📈","S","the station","Watches the drums; the tremor pattern has changed and no one's listening."],
         ["warden","Warden Cole","Evacuation warden","🚨","E","the town","Runs the drills; caught between the science and the mayor's office."]],
  topics:[["platetectonics","Alfred Wegener (1880-1930)","Plate tectonics & continental drift"],["seismicwaves","Richard Dixon Oldham (1858-1936)","P & S waves"],
    ["magnitude","Charles Richter (1900-1985)","Earthquake magnitude"],["intensity","Giuseppe Mercalli (1850-1914)","Intensity vs magnitude"],
    ["innercore","Inge Lehmann (1888-1993)","Earth's interior"],["seafloor","Harry Hess (1906-1969)","Seafloor spreading"],
    ["magma","Norman L. Bowen (1887-1956)","Magma, silica & viscosity"],["vei","Christopher Newhall (volcanologist)","Eruption size & the VEI"],
    ["pyroclastic","Alfred Lacroix (1863-1948)","Pyroclastic flows & Mont Pelée"],["lahar","Barry Voight (1937-2024)","Lahars & flank collapse"],
    ["gas","Haroun Tazieff (1914-1998)","Volcanic gases as precursors"],["tremor","Bernard Chouet (b. 1949)","Harmonic tremor & precursors"],
    ["forecasting","Katia & Maurice Krafft (d. 1991)","Forecasting, evacuation & the warning"],["hotspot","J. Tuzo Wilson (1908-1993)","Hotspots & transform faults"],
    ["calderas","Robert Christiansen (1933-2022)","Calderas & supervolcanoes"],["tsunami","Rogier Verbeek (1845-1926)","Volcanic tsunami & Krakatoa"],
    ["paleomag","Motonori Matuyama (1884-1958)","Geomagnetic reversals"],["monitoring","Thomas Jaggar (1871-1953)","Continuous monitoring"]],
},
{ id:"blackout", title:"The Cascade", discipline:"Electrical Engineering & the Grid",
  teaser:"Fifty million people went dark in nine seconds. A cyberattack? A fluke? Or a tree, a bug, and a room full of blind operators?",
  overclaimTag:"a cyberattack", truthTag:"a cascading failure with a hidden alarm bug",
  venue:"the blackout inquiry", agent:"Analyst Robin Vasquez", standingLabel:"Technical credibility",
  readingShort:"Pioneers", readingLabel:"Electrical Pioneers", dossierName:"ELECTRICAL PIONEERS",
  enterLabel:"Open the inquiry", subt:"A deduction game inside the blackout inquiry",
  who:{truth:"utility", items:[["utility","Delgado — utility control-room manager"],["vendor","The control-software vendor"],["regulator","The grid regulator"]]},
  where:{truth:"controlroom", items:[["substation","The Substation & Lines"],["controlroom","The Utility Control Room"],["datacenter","The Grid-Operator Data Center"]]},
  what:{truth:"cascade", overclaim:"cyber", dismissal:"fluke", items:[["cyber","A coordinated cyberattack"],["fluke","A random one-off equipment failure"],["cascade","A cascading failure: a line, a software bug, blind operators"]]},
  places:["substation","controlroom","datacenter"],
  chars:[["line","Lineman Ojo","Field lineman","⚡","L","the lines","Walks the corridor; knows which line arced into an overgrown tree."],
         ["op","The Operator","Control-room operator","🖥","O","the control room","Watched the screens freeze; the alarms never sounded."],
         ["veng","The Vendor Engineer","Software-vendor engineer","🐛","V","the data center","Knows the race-condition bug that silenced the alarm system."]],
  topics:[["charge","Charles-Augustin de Coulomb (1736-1806)","Electric charge & force"],["current","André-Marie Ampère (1775-1836)","Electric current"],
    ["voltage","Alessandro Volta (1745-1827)","Potential & the battery"],["ohm","Georg Ohm (1789-1854)","Ohm's law & resistance"],
    ["induction","Michael Faraday (1791-1867)","Electromagnetic induction"],["maxwell","James Clerk Maxwell (1831-1879)","The field equations"],
    ["acdc","Nikola Tesla (1856-1943)","AC vs DC & the War of Currents"],["transformer","William Stanley Jr. (1858-1916)","Transformers & transmission"],
    ["threephase","Mikhail Dolivo-Dobrovolsky (1861-1919)","Three-phase power"],["acmath","Charles Proteus Steinmetz (1865-1923)","AC circuit math & phasors"],
    ["reactive","Oliver Heaviside (1850-1925)","Reactance & reactive power"],["gridsystem","Samuel Insull (1859-1938)","The grid as a system & load balancing"],
    ["loadflow","Edith Clarke (1883-1959)","Network analysis"],["statestimation","Fred Schweppe (1933-1988)","State estimation & seeing the grid"],
    ["cascade","Charles Concordia (1908-2003)","Stability & cascading failure"],["feedback","Harry Nyquist (1889-1976)","Feedback & stability"],
    ["cybernetics","Norbert Wiener (1894-1964)","Control & cybernetics"],["information","Claude Shannon (1916-2001)","Information & the data that failed"]],
},
{ id:"chemplant", title:"The Ardsley Works", discipline:"Chemical & Process Engineering",
  teaser:"A gas cloud rolled out of a chemical plant at midnight. A saboteur, bad luck — or safety systems switched off to save money?",
  overclaimTag:"sabotage", truthTag:"disabled safety systems, to cut costs",
  venue:"the Ardsley Works inquiry", agent:"Inspector Grace Mbeki", standingLabel:"Safety credibility",
  readingShort:"Pioneers", readingLabel:"Chemical Pioneers", dossierName:"CHEMICAL PIONEERS",
  enterLabel:"Open the inquiry", subt:"A deduction game inside the Ardsley Works disaster inquiry",
  who:{truth:"manager", items:[["manager","Voss — plant manager"],["operator","The night-shift operator"],["contractor","The maintenance contractor"]]},
  where:{truth:"office", items:[["tank","The Storage Tank & Reactor"],["controlroom","The Plant Control Room"],["office","The Plant Manager's Office"]]},
  what:{truth:"disabled", overclaim:"sabotage", dismissal:"freak", items:[["sabotage","Deliberate sabotage by an intruder"],["freak","An unforeseeable freak accident"],["disabled","Safety systems disabled to cut costs"]]},
  places:["tank","controlroom","office"],
  chars:[["operator","Operator Sahni","Night-shift operator","🎛","O","the control room","Watched the pressure climb with the scrubber offline and the flare cold."],
         ["safety","The Safety Officer","Process-safety officer","🧯","S","the plant","Filed reports warning the interlocks were bypassed; they were shelved."],
         ["driver","Tanker Driver Vale","Chemical tanker driver","🛢","D","the yard","Knows what was stored, how much, and that the refrigeration was off."]],
  topics:[["stoichiometry","Antoine Lavoisier (1743-1794)","Conservation of mass & stoichiometry"],["thermo","J. Willard Gibbs (1839-1903)","Chemical thermodynamics"],
    ["kinetics","Svante Arrhenius (1859-1927)","Reaction rate & activation energy"],["equilibrium","Henry Le Chatelier (1850-1936)","Chemical equilibrium"],
    ["catalysis","Paul Sabatier (1854-1941)","Catalysis"],["runaway","Nikolay Semyonov (1896-1986)","Chain reactions & thermal runaway"],
    ["highpressure","Carl Bosch (1874-1940)","High-pressure vessels & relief"],["unitops","Warren K. Lewis (1882-1975)","Unit operations & mass balance"],
    ["distillation","George E. Davis (1850-1907)","Separation & distillation"],["heattransfer","Wilhelm Nusselt (1882-1957)","Heat transfer & cooling"],
    ["dispersion","Frank Pasquill (1914-1994)","Gas dispersion & the plume"],["doseresponse","Paracelsus (1493-1541)","Dose-response: the dose makes the poison"],
    ["inherentsafety","Trevor Kletz (1922-2013)","Inherently safer design"],["riskdrift","Jens Rasmussen (1926-2018)","Why safeguards get bypassed"],
    ["nearmiss","Herbert Heinrich (1886-1962)","The accident triangle & near-misses"],["corrosion","Ulick R. Evans (1889-1980)","Corrosion"],
    ["ammonia","Fritz Haber (1868-1934)","The Haber process & dual-use"],["processcontrol","Nicolas Minorsky (1885-1970)","Process control & feedback"]],
},
{ id:"software", title:"Fatal Exception", discipline:"Software & Systems Safety",
  teaser:"A radiation machine gave patients a hundredfold overdose. A hacker? Careless nurses? Or a bug built in — and hidden?",
  overclaimTag:"a malicious hack", truthTag:"a fatal software defect, concealed",
  venue:"the Calder radiotherapy inquiry", agent:"Auditor Lena Foss", standingLabel:"Engineering credibility",
  readingShort:"Pioneers", readingLabel:"Computing Pioneers", dossierName:"COMPUTING PIONEERS",
  enterLabel:"Open the inquiry", subt:"A deduction game inside the Calder radiotherapy inquiry",
  who:{truth:"maker", items:[["operator","The radiotherapy technicians"],["maker","Renwick — the manufacturer's software lead"],["hospital","The hospital physicist"]]},
  where:{truth:"vendor", items:[["treatment","The Treatment Room & Console"],["biomed","The Hospital Biomedical Lab"],["vendor","The Manufacturer's Software Office"]]},
  what:{truth:"defect", overclaim:"hack", dismissal:"usererror", items:[["hack","A malicious hack or cyberattack"],["usererror","Simple operator error — nothing systemic"],["defect","A concealed software defect & a removed interlock"]]},
  places:["treatment","biomed","vendor"],
  chars:[["tech","Technician Ama","Radiotherapy technician","☢","T","the console","Typed the fast edit that triggered the fault; blamed, but she saw 'MALFUNCTION 54.'"],
         ["phys","The Medical Physicist","Hospital medical physicist","📟","P","the biomed lab","Reconstructed the doses; proved the machine, not the patient, was wrong."],
         ["qa","The QA Engineer","Manufacturer QA engineer","🐞","Q","the vendor office","Knows the race condition was known, and the hardware interlock was removed to cut cost."]],
  topics:[["algorithm","Ada Lovelace (1815-1852)","The first algorithm"],["turing","Alan Turing (1912-1954)","Computability & the Turing machine"],
    ["boolean","George Boole (1815-1864)","Boolean logic"],["architecture","John von Neumann (1903-1957)","The stored-program computer"],
    ["compiler","Grace Hopper (1906-1992)","Compilers & the first 'bug'"],["abstraction","Barbara Liskov (b. 1939)","Data abstraction"],
    ["concurrency","Leslie Lamport (b. 1941)","Concurrency & race conditions"],["synchronization","Edsger Dijkstra (1930-2002)","Synchronization & deadlock"],
    ["overflow","Jacques-Louis Lions (1928-2001)","Integer overflow & the Ariane 5 inquiry"],["nullref","Tony Hoare (b. 1934)","The 'billion-dollar mistake'"],
    ["testing","Glenford Myers (software-testing pioneer)","Testing & its limits"],["formalmethods","Robert W. Floyd (1936-2001)","Proving programs correct"],
    ["softwaresafety","Nancy Leveson (b. 1948)","Software safety engineering"],["criticalsoftware","David Parnas (b. 1941)","Safety-critical software & its limits"],
    ["robusterror","Margaret Hamilton (b. 1936)","Robust error handling & Apollo"],["hci","Donald Norman (b. 1935)","Human error & design"],
    ["complexity","Donald Knuth (b. 1938)","The analysis of algorithms"],["mythicalmonth","Fred Brooks (1931-2022)","Schedule pressure & the mythical man-month"]],
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
  P.push(`  overclaimTease:"FILL: one italic sentence warning off the overclaim (${g.overclaimTag}) toward the truth (${g.truthTag}).",`);
  P.push(`  CATS:{`);
  P.push(catBlock("who",g.who)+",");
  P.push(catBlock("where",g.where)+",");
  P.push(catBlock("what",g.what));
  P.push(`  },`);
  // places
  const pl=g.places.map((id,i)=>{ const label=g.where.items.find(it=>it[0]===id)[1]; return `    ${id}:{name:"${esc(label)}", xy:[${XY[i][0]},${XY[i][1]}]}`; }).join(",\n");
  P.push(`  PLACES:{\n${pl}\n  },`);
  P.push(`  EDGES:[["${g.places[0]}","${g.places[1]}"],["${g.places[1]}","${g.places[2]}"]],`);
  // characters
  const ch=g.chars.map(([id,name,role,face,badge,legend,hint])=>`    ${id}:{ name:"${esc(name)}", role:"${esc(role)}", face:"${face}", badge:"${badge}", legend:"${esc(legend)}", hint:"${esc(hint)}" }`).join(",\n");
  P.push(`  CHARACTERS:{\n${ch}\n  },`);
  // TOPICMAP: assign 18 topics to 9 cells (place x informant), 2 each, in order
  const cells=[]; g.places.forEach(pl=>g.chars.forEach(c=>cells.push([pl,c[0]])));
  const tm={}; g.places.forEach(pl=>{tm[pl]={};});
  g.topics.forEach((t,idx)=>{ const [pl,inf]=cells[Math.floor(idx/2)]; (tm[pl][inf]=tm[pl][inf]||[]).push(t[0]); });
  const tmLines=g.places.map(pl=>`    ${pl}:{ ${g.chars.map(c=>`${c[0]}:["${tm[pl][c[0]][0]}","${tm[pl][c[0]][1]}"]`).join(", ")} }`).join(",\n");
  P.push(`  TOPICMAP:{\n${tmLines}\n  },`);
  // TOPICS stubs
  const cellFor={}; g.topics.forEach((t,idx)=>{ cellFor[t[0]]=cells[Math.floor(idx/2)]; });
  const topicStubs=g.topics.map((t,i)=>{
    const [id,pioneer,concept]=t; const [pl,inf]=cellFor[id];
    const infName=g.chars.find(c=>c[0]===inf)[1]; const plName=g.where.items.find(it=>it[0]===pl)[1];
    return `    // cell: ${infName} @ ${plName}\n    ${id}:{ sci:"${esc(pioneer)}", topic:"${esc(concept)}", lede:"", no:${i+1}, profile:"",\n      frame:"", q:[] }`;
  }).join(",\n");
  P.push(`  TOPICS:{\n${topicStubs}\n  },`);
  // STORIES stubs
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
console.log("\n"+GAMES.length+" starters written.");
