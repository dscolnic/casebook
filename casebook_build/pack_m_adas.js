// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"m_adas", title:"The Autopilot on Vane Street", discipline:"Vehicle Automation & Safety",
  teaser:"A self-driving car ran down a pedestrian at night, its autopilot engaged. Was the car hacked and hijacked? A one-in-a-million glitch? Or a safeguard someone switched off?", overclaimTag:"a hack or remote hijack", truthTag:"a sensor blind spot and a disabled driver-monitor",
  venue:"the Vane Street autonomy inquiry", agent:{name:"Investigator Dana Okafor", role:"Investigator's Notepad"},
  standingLabel:"Inquiry credibility", readingShort:"Pioneers", readingLabel:"Vehicle-Automation Pioneers",
  dossierName:"VEHICLE-AUTOMATION & SAFETY PIONEERS", enterLabel:"Open the inquiry", subt:"A deduction game inside the Vane Street autonomy inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"And beware the answer the cameras want: the evidence points not to a hijacker at the wheel, but to something quieter — and far harder to admit.",
  CATS:{
    who:{ title:"Who is behind it", truth:"ad_maker", items:[
      {id:"ad_maker", label:"Sloane Pace — self-driving program lead"},
      {id:"ad_driver", label:"The backup safety driver"},
      {id:"ad_regulator", label:"The transport-safety regulator"} ]},
    where:{ title:"Where it culminates", truth:"ad_office", items:[
      {id:"ad_vehicle", label:"The Vehicle & Its Sensors"},
      {id:"ad_datacenter", label:"The Telemetry & Perception Logs"},
      {id:"ad_office", label:"The Program's Development Office"} ]},
    what:{ title:"What is happening", truth:"ad_sensorsafeguard", items:[
      {id:"ad_hack", label:"A hack or remote hijack of the car"},
      {id:"ad_glitch", label:"A freak one-off software glitch — bad luck"},
      {id:"ad_sensorsafeguard", label:"A sensor blind spot met by a disabled driver-monitoring safeguard"} ]}
  },
  PLACES:{
    ad_vehicle:{name:"The Vehicle & Its Sensors", xy:[140,90]},
    ad_datacenter:{name:"The Telemetry & Perception Logs", xy:[330,240]},
    ad_office:{name:"The Program's Development Office", xy:[520,90]}
  },
  EDGES:[["ad_vehicle","ad_datacenter"],["ad_datacenter","ad_office"]],
  CHARACTERS:{
    ad_tech:{ name:"Field Tech Ravi Sen", role:"Vehicle field technician", face:"🔧", badge:"R", legend:"the vehicle", hint:"Services the sensors; saw the car repeatedly miss objects in the dark." },
    ad_analyst:{ name:"The Perception Analyst", role:"Perception-log analyst", face:"📈", badge:"P", legend:"the data centre", hint:"Reads the logs; the car classified the victim three ways and braked too late." },
    ad_clerk:{ name:"The Clerk", role:"Program records clerk", face:"🗂", badge:"C", legend:"the office", hint:"Holds the release notes — and the ticket that disabled the driver-attention alarm." }
  },
  TOPICMAP:{
    ad_vehicle:{ ad_tech:["ad_nader","ad_bohlin"], ad_analyst:["ad_barenyi","ad_haddon"], ad_clerk:["ad_stapp","ad_dehaven"] },
    ad_datacenter:{ ad_tech:["ad_hulsmeyer","ad_maiman"], ad_analyst:["ad_fossum","ad_dickmanns"], ad_clerk:["ad_parkinson","ad_kalman"] },
    ad_office:{ ad_tech:["ad_thrun","ad_bainbridge"], ad_analyst:["ad_parasuraman","ad_sheridan"], ad_clerk:["ad_endsley","ad_moray"] }
  },
  TOPICS:{
    // cell: Field Tech Ravi Sen @ The Vehicle & Its Sensors
    ad_nader:{ sci:"Ralph Nader (b. 1934)", topic:"Automobile safety & crashworthiness", lede:"The lawyer who made a nation stop blaming the driver and start reading the blueprints.", no:1,
      profile:"Ralph Nader is the American lawyer and consumer advocate whose 1965 book 'Unsafe at Any Speed' forced a nation to see the car crash as a design problem, not merely a driver problem. Its opening chapter dissected the handling of the Chevrolet Corvair, but its larger argument was broader: the industry had spent decades blaming 'the nut behind the wheel' while refusing to engineer cars that protected people when crashes inevitably happened. Nader marshaled evidence that manufacturers already knew how to make vehicles safer and had chosen not to.\n\nThe book's impact was immediate. It helped drive passage of the National Traffic and Motor Vehicle Safety Act of 1966, which for the first time let the federal government set binding safety standards and created the agency that became the National Highway Traffic Safety Administration. Nader popularized 'crashworthiness' — the idea of the 'second collision,' in which an occupant strikes the interior after the car strikes something — and argued that padded surfaces, collapsible columns, and belts should be designed in, not left to chance or to the buyer.\n\nHis deeper contribution was a way of thinking. A crash, Nader insisted, is a foreseeable event with foreseeable causes, and calling it an 'accident' too often excuses the people who could have prevented it.\n\nFor this inquiry, that lesson cuts against both easy answers. When an automated car kills someone, the sensational story reaches for an outside villain — a hijacker — and the comfortable story reaches for bad luck, a freak glitch. Nader would ask a colder question: what did the makers know they should build, and what did they leave out? The answer to that question is where responsibility, and the truth, actually live.",
      frame:"Sen wipes grease from a bracket. \"Folks love to call a crash bad luck, or pin it on whoever was behind the wheel. Ralph Nader never bought that, and neither do I. Show me you know what he actually changed.\"",
      q:[
        { q:"What was the central argument of 'Unsafe at Any Speed'?", o:[
          { t:"Cars should be built to protect occupants, not merely to blame drivers.", v:"expert", fb:"Nader shifted the focus from the driver to the safety built into the car." },
          { t:"Bad drivers cause almost every crash, so vehicle design barely matters.", v:"danger", fb:"That 'nut behind the wheel' excuse is exactly what Nader dismantled." },
          { t:"Faster engines are always safer, since raw speed was never the hazard.", v:"wrong", fb:"He never argued speed was harmless; he argued cars must be crashworthy." },
          { t:"Only the Corvair was unsafe, so fixing one model solved the problem.", v:"partial", fb:"The Corvair opened the book, but his case was against the whole industry." } ] },
        { q:"What does 'crashworthiness' and the second collision mean?", o:[
          { t:"Designing a car so occupants survive striking the interior in a crash.", v:"expert", fb:"The 'second collision' is the occupant hitting the interior; design for it." },
          { t:"Building the car so rigid that it never deforms at all in a collision.", v:"wrong", fb:"Crashworthiness manages the occupant's impact, not just body stiffness." },
          { t:"Trusting a careful driver to simply avoid every crash before it starts.", v:"danger", fb:"Avoidance helps, but the point was to survive the crashes that happen." },
          { t:"Adding a single belt and treating the rest of the cabin as good enough.", v:"partial", fb:"Belts matter, but crashworthiness spans the whole occupant environment." } ] },
        { q:"Why does Nader's thinking matter to this inquiry?", o:[
          { t:"Treat the crash as foreseeable and ask what the makers left out or hid.", v:"expert", fb:"Nader's frame points straight at design choices and what was concealed." },
          { t:"A modern automated crash means an outsider seized control of the car.", v:"danger", fb:"That leaps to a hijacker; Nader would look first at the car's own design." },
          { t:"Label it a freak accident and the file closes with nobody responsible.", v:"wrong", fb:"'Freak accident' is the very excuse Nader spent his career refuting." },
          { t:"Blame only the regulator, since a maker is never at fault in a crash.", v:"partial", fb:"Regulators share blame, but the maker's design choices come first here." } ] }
      ] },
    // cell: Field Tech Ravi Sen @ The Vehicle & Its Sensors
    ad_bohlin:{ sci:"Nils Bohlin (1920-2002)", topic:"The three-point seatbelt", lede:"The engineer who designed the belt that has saved more than a million lives — then let the world copy it for free.", no:2,
      profile:"Nils Bohlin was a Swedish engineer who, in 1959, designed the modern three-point seatbelt while working at Volvo. He came to cars from aviation: he had developed ejection seats at Saab, so he understood restraint under violent forces. The belts of the day were two-point lap belts that held the pelvis but let the upper body jackknife forward, sometimes causing severe internal injuries. Bohlin's insight was a belt that secured both the chest and the pelvis with a single buckle a driver could fasten one-handed, spreading crash forces across the strong bones of the shoulder and hips.\n\nThe design was elegant and, crucially, practical enough that people would actually wear it. Volvo made the three-point belt standard in 1959 and then did something rare: it left the patent open, allowing every other manufacturer to adopt the design freely because the safety benefit mattered more than the licensing revenue. The belt is now regarded as one of the most effective safety devices ever invented, credited with saving more than a million lives.\n\nBohlin's lesson is deceptively simple: a safety device only works when it is present, correct, and actually in use. A belt in the glovebox saves no one.\n\nFor this inquiry, that principle is sharp. Automated vehicles carry safeguards too — automatic braking, driver-attention monitors, watchdogs that catch the machine's blind spots. Like a belt, each is worthless if it is switched off, unbuckled, or quietly disabled. When the sensational story shouts 'hijack' and the lazy story shrugs 'glitch,' Bohlin would ask the plainer question: which protection was supposed to catch this, and was it actually engaged?",
      frame:"Sen holds up a frayed belt webbing. \"A safety part only counts when it's switched on and doing its job. Nils Bohlin proved that with a buckle. Convince me you understand why that matters here.\"",
      q:[
        { q:"What made Bohlin's three-point belt better than earlier belts?", o:[
          { t:"It restrained chest and pelvis together, spreading force onto strong bones.", v:"expert", fb:"The three-point belt loads the shoulder and hips, sparing soft organs." },
          { t:"It let the upper body swing freely so the ribs absorbed the whole impact.", v:"wrong", fb:"That describes the old lap belt's flaw, which Bohlin's design fixed." },
          { t:"It replaced the need for any structural crumple zone at the front of the car.", v:"wrong", fb:"Belts complement crumple zones; they do not replace crash structure." },
          { t:"It held the driver so rigidly that the body never moved at all in a crash.", v:"partial", fb:"It manages motion and force; it does not freeze the body in place." } ] },
        { q:"Why is it notable that Volvo left the belt patent open?", o:[
          { t:"The safety benefit was judged to matter more than the licensing revenue.", v:"expert", fb:"Volvo shared the design so every maker's cars could be safer." },
          { t:"The patent was worthless because no rival ever wanted the design anyway.", v:"wrong", fb:"Rivals adopted it widely; the choice was deliberate generosity." },
          { t:"It hid the belt's flaws so competitors would take the blame for failures.", v:"danger", fb:"There was no cover-up; the belt was shared precisely because it worked." },
          { t:"It was a marketing stunt with no real effect on other manufacturers.", v:"partial", fb:"It was more than a stunt; open sharing spread a proven lifesaver." } ] },
        { q:"How does Bohlin's principle apply to this inquiry?", o:[
          { t:"A safeguard saves no one unless it is present, correct, and switched on.", v:"expert", fb:"Ask which protection should have caught this, and whether it was engaged." },
          { t:"A missing safeguard proves an outsider hacked in and turned it off remotely.", v:"danger", fb:"A safeguard can be disabled from inside; that need not mean a hijacker." },
          { t:"Safeguards never fail in practice, so this crash must simply be bad luck.", v:"wrong", fb:"Safeguards fail constantly when disabled; that is not mere bad luck." },
          { t:"Only the belt matters, since electronic safeguards are decorative extras.", v:"partial", fb:"Electronic safeguards are as real as belts; both must be active to help." } ] }
      ] },
    // cell: The Perception Analyst @ The Vehicle & Its Sensors
    ad_barenyi:{ sci:"Béla Barényi (1907-1997)", topic:"The crumple zone & passive safety", lede:"The Mercedes engineer who realized a car should crush on purpose to keep its people whole.", no:3,
      profile:"Béla Barényi was an Austrian-Hungarian engineer at Mercedes-Benz whose ideas quietly reshaped how every car is built. Against the intuition of his era — that a safe car is a strong, rigid car — Barényi argued the opposite. In a patent filed in 1952 he set out the crumple zone: a passenger compartment kept rigid to survive as a protective cell, flanked by front and rear structures deliberately engineered to deform and crush on impact. Those crumpling ends absorb the kinetic energy of a collision over a longer distance and time, so less of that violence reaches the people inside.\n\nThis is the essence of 'passive safety' — features that protect occupants during a crash rather than trying to prevent it. Barényi held an extraordinary number of patents, thousands over his career, covering safety-related structures and details most drivers never notice. Mercedes-Benz introduced production cars with his crumple-zone principle in 1959, and the concept became universal. His work made explicit a hard truth: some collisions cannot be avoided, so the intelligent response is to design for them in advance.\n\nFor this inquiry, Barényi reframes the whole question. Automated driving will not eliminate the moment when a hazard appears too late to fully avoid — a pedestrian stepping from shadow, a sensor's blind spot. A responsible system, like a responsible car body, is engineered to detect, slow, and mitigate that moment, not to pretend it will never come. The sensational answer imagines an external attacker; the dismissive answer calls the death unavoidable bad luck. Barényi's discipline asks instead what the designers built to manage the collision they knew could happen — and what protection was missing when it did.",
      frame:"The analyst pulls up a deformation model. \"Barényi taught that a car should crush in the right places on purpose. Show me you grasp designing for the crash you can't dodge, and I'll show you the perception trace.\"",
      q:[
        { q:"What is the core idea of the crumple zone?", o:[
          { t:"A rigid cabin with crushable ends that absorb the energy of an impact.", v:"expert", fb:"Deforming ends soak up energy so the protected cell stays intact." },
          { t:"A uniformly rigid shell so the whole car resists deforming anywhere at all.", v:"danger", fb:"A fully rigid car transmits the crash to its occupants; Barényi rejected that." },
          { t:"A soft outer skin whose only job is to reduce the cost of body repairs.", v:"wrong", fb:"Crumple zones protect people by managing energy, not to cut repair bills." },
          { t:"A heavy bumper that bounces the car back off whatever it happens to strike.", v:"partial", fb:"It is about absorbing energy through deformation, not rebounding away." } ] },
        { q:"What does 'passive safety' describe?", o:[
          { t:"Features that protect occupants during a crash rather than preventing it.", v:"expert", fb:"Passive safety limits harm once a collision is already happening." },
          { t:"Systems that steer or brake automatically to avoid the crash before it starts.", v:"wrong", fb:"That is active safety; passive safety works during the impact itself." },
          { t:"A driver staying alert and cautious so that no crash ever actually occurs.", v:"wrong", fb:"That is driver behavior, not the built-in passive protection Barényi meant." },
          { t:"Insurance and warning labels that shift the blame after a crash has happened.", v:"partial", fb:"Passive safety is engineered structure, not paperwork after the fact." } ] },
        { q:"How does Barényi's thinking bear on this inquiry?", o:[
          { t:"Design for the collision you cannot fully avoid, not for a world without one.", v:"expert", fb:"A sound system detects and mitigates the hazard it may meet too late." },
          { t:"Since crashes can be designed for, any real crash means the car was attacked.", v:"danger", fb:"Designing for impact assumes crashes happen; it does not imply an attacker." },
          { t:"If a crash still happened, it was simply unavoidable and no one is at fault.", v:"wrong", fb:"Barényi's point is that foreseeable impacts must be engineered for, not excused." },
          { t:"Passive safety alone settles the case, so the sensors need no examination.", v:"partial", fb:"Passive safety is one layer; the perception failure still demands scrutiny." } ] }
      ] },
    // cell: The Perception Analyst @ The Vehicle & Its Sensors
    ad_haddon:{ sci:"William Haddon Jr. (1926-1985)", topic:"The epidemiology of crashes & the Haddon matrix", lede:"The physician who treated the car crash as a disease — with a cause, a course, and a cure.", no:4,
      profile:"William Haddon Jr. was an American physician and epidemiologist who became the first head of the federal agency now known as NHTSA in 1966. His radical move was to treat traffic injury as a public-health problem, subject to the same rigorous analysis as an epidemic. In this view the 'agent' of injury is energy — mechanical energy transferred to the body in a crash — and the task is to control that energy's release just as one would control a pathogen.\n\nHaddon built a framework, now called the Haddon Matrix, that organizes a crash into three phases — pre-crash, crash, and post-crash — crossed with three sets of factors: the human, the vehicle, and the physical and social environment. Each cell suggests places to intervene. Better hazard detection acts in the pre-crash phase; crumple zones and belts act in the crash phase; fast rescue and trauma care act in the post-crash phase. He also cataloged ten general strategies for injury control, from preventing the hazard's creation to strengthening the potential victim.\n\nThe power of the matrix is that it refuses single-cause thinking. A crash is never just a careless driver or just fate; it is a set of factors, many of them engineerable, interacting across time.\n\nFor this inquiry, Haddon is a compass. Faced with a fatal automated-vehicle crash, he would fill in the grid: what could the machine have sensed and done before impact; what protected the victim during it; what factors in the vehicle and its makers set the stage? That method exposes the trap answers for what they are. 'Hijack' fixates on one lurid human agent; 'freak glitch' pretends no factor was controllable. The matrix shows the controllable factors plainly.",
      frame:"The analyst sketches a three-by-three grid. \"Haddon wouldn't let anyone blame the driver or fate before filling in every box. Show me you can think in his matrix, and I'll walk you through the logs.\"",
      q:[
        { q:"What was Haddon's central reframing of traffic injury?", o:[
          { t:"As a public-health problem in which energy is the controllable agent of harm.", v:"expert", fb:"Haddon treated crash injury like a disease, with energy as the agent." },
          { t:"As a moral failing of reckless drivers that only stiffer penalties could cure.", v:"danger", fb:"He rejected blaming the driver alone for a systemic, engineerable problem." },
          { t:"As random misfortune that no method could study, predict, or hope to reduce.", v:"wrong", fb:"His whole point was that injury is patterned and preventable, not random." },
          { t:"As purely a vehicle problem, with the human and environment left out of it.", v:"partial", fb:"His matrix included human and environment factors, not the vehicle alone." } ] },
        { q:"What does the Haddon Matrix organize?", o:[
          { t:"Pre-crash, crash, and post-crash phases against human, vehicle, environment.", v:"expert", fb:"Three phases crossed with three factor sets map every point to intervene." },
          { t:"Only the seconds of impact, since nothing before or after it can be changed.", v:"wrong", fb:"The matrix spans before and after the crash, not just the impact instant." },
          { t:"A ranking of drivers by blame so the guiltiest can be prosecuted the hardest.", v:"danger", fb:"It is an analysis of factors to fix, not a tool for assigning driver blame." },
          { t:"A list of vehicle parts to inspect, with people and setting left off the grid.", v:"partial", fb:"Parts are one cell; the grid also covers human and environmental factors." } ] },
        { q:"How does the matrix expose the two trap answers here?", o:[
          { t:"It shows controllable factors the makers could have addressed before impact.", v:"expert", fb:"The grid surfaces exactly the design factors both traps ignore." },
          { t:"It proves a single hostile agent, since only a person can appear in the grid.", v:"danger", fb:"The grid holds vehicle and environment factors too, not just a lone attacker." },
          { t:"It confirms nothing was controllable, so the death was pure random misfortune.", v:"wrong", fb:"The matrix is built to reveal the controllable factors, not excuse them." },
          { t:"It points only at the post-crash rescue, leaving the sensors out of the picture.", v:"partial", fb:"Rescue is one column; the pre-crash sensing factors are central here." } ] }
      ] },
    // cell: The Clerk @ The Vehicle & Its Sensors
    ad_stapp:{ sci:"John Paul Stapp (1910-1999)", topic:"Human tolerance to deceleration", lede:"The Air Force doctor who strapped himself to a rocket sled to learn exactly how much a body can take.", no:5,
      profile:"John Paul Stapp was a U.S. Air Force flight surgeon and biophysicist who answered a life-or-death question by making himself the test subject. In the late 1940s the received wisdom was that roughly 18 g of deceleration was the limit of human survival, a belief that led designers to build flimsy restraints and cockpits on the assumption that crashes above that were hopeless. Stapp doubted the number and set out to measure it directly, riding rocket-propelled sleds that accelerated hard and then braked violently on a measured track.\n\nOn December 10, 1954, aboard the sled 'Sonic Wind,' Stapp decelerated from over 600 mph to a stop in about a second, enduring a peak of roughly 46 g — far beyond the supposed lethal limit — and survived, though at real cost to his body and eyes. His experiments proved that humans could tolerate much greater forces than assumed if properly restrained, and they drove better harnesses, seats, and eventually automobile safety. He was also a tireless campaigner for car seatbelts, and his projects gave rise to the popular telling of 'Murphy's Law.'\n\nStapp's method is his message: replace assumption with measurement, even when the assumption is comfortable and the measurement is hard.\n\nFor this inquiry, that discipline is central. The forces, speeds, and timing of an automated-vehicle crash are not matters of opinion — they are recorded to the millisecond. The sensational and dismissive stories both rest on assumptions: that an intruder must have struck, or that nothing could have been done. Stapp would demand the numbers first — how fast, how late the braking, how much warning the machine had — and let the measured record, not the assumption, decide what happened.",
      frame:"The clerk lays out a deceleration chart. \"Stapp never trusted a comfortable assumption when he could measure the truth on his own spine. Show me you respect the numbers, and I'll open the file.\"",
      q:[
        { q:"What did Stapp's rocket-sled runs prove?", o:[
          { t:"Humans can survive far more deceleration than assumed if well restrained.", v:"expert", fb:"He shattered the 18-g myth, showing survival with proper restraint." },
          { t:"That roughly 18 g was indeed the hard ceiling on human survival after all.", v:"wrong", fb:"He disproved that very ceiling, enduring far higher forces himself." },
          { t:"That restraint is pointless, since the body cannot be protected in any crash.", v:"danger", fb:"He proved the opposite: restraint is what makes survival possible." },
          { t:"That only unmanned tests can measure crash forces safely on any vehicle.", v:"partial", fb:"He used himself precisely to get human data machines could not give." } ] },
        { q:"What was the essence of Stapp's method?", o:[
          { t:"Replace a comfortable assumption with a direct, measured experiment.", v:"expert", fb:"He measured the limit rather than accepting the received number." },
          { t:"Accept the established figure, since testing a known limit wastes resources.", v:"wrong", fb:"He refused the established figure and tested it to destruction." },
          { t:"Trust intuition about danger, because bodies vary too much to ever measure.", v:"danger", fb:"He showed the limit was measurable, not a matter of intuition." },
          { t:"Run one quick trial and generalize freely from that single data point.", v:"partial", fb:"He ran careful, instrumented, repeated runs, not a single casual trial." } ] },
        { q:"How does Stapp's discipline apply to this crash?", o:[
          { t:"Demand the recorded speed, timing, and braking before accepting any story.", v:"expert", fb:"The measured record, not assumption, should decide what happened." },
          { t:"Assume an intruder caused it, since a machine could not fail on its own.", v:"danger", fb:"That is an assumption; the recorded data can test it directly instead." },
          { t:"Assume nothing could be done, so the numbers are not worth examining.", v:"wrong", fb:"Stapp's whole life argued the numbers are exactly what must be examined." },
          { t:"Trust the makers' summary rather than the raw deceleration record itself.", v:"partial", fb:"A summary can mislead; Stapp would insist on the raw measured data." } ] }
      ] },
    // cell: The Clerk @ The Vehicle & Its Sensors
    ad_dehaven:{ sci:"Hugh DeHaven (1895-1980)", topic:"Crash survival & occupant packaging", lede:"", no:6, profile:"",
      frame:"", q:[] },
    // cell: Field Tech Ravi Sen @ The Telemetry & Perception Logs
    ad_hulsmeyer:{ sci:"Christian Hülsmeyer (1881-1957)", topic:"Radar & obstacle detection", lede:"", no:7, profile:"",
      frame:"", q:[] },
    // cell: Field Tech Ravi Sen @ The Telemetry & Perception Logs
    ad_maiman:{ sci:"Theodore Maiman (1927-2007)", topic:"The laser behind lidar", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The Perception Analyst @ The Telemetry & Perception Logs
    ad_fossum:{ sci:"Eric Fossum (image-sensor researcher)", topic:"The CMOS camera sensor", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The Perception Analyst @ The Telemetry & Perception Logs
    ad_dickmanns:{ sci:"Ernst Dickmanns (b. 1936)", topic:"Machine vision & the first self-driving car", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Telemetry & Perception Logs
    ad_parkinson:{ sci:"Bradford Parkinson (b. 1935)", topic:"The GPS navigation system", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Telemetry & Perception Logs
    ad_kalman:{ sci:"Rudolf E. Kálmán (1930-2016)", topic:"The Kalman filter & sensor fusion", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Field Tech Ravi Sen @ The Program's Development Office
    ad_thrun:{ sci:"Sebastian Thrun (b. 1967)", topic:"Autonomous driving & the DARPA challenge", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Field Tech Ravi Sen @ The Program's Development Office
    ad_bainbridge:{ sci:"Lisanne Bainbridge (automation-ironies researcher)", topic:"The ironies of automation", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The Perception Analyst @ The Program's Development Office
    ad_parasuraman:{ sci:"Raja Parasuraman (1950-2015)", topic:"Automation complacency & vigilance", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The Perception Analyst @ The Program's Development Office
    ad_sheridan:{ sci:"Thomas B. Sheridan (b. 1929)", topic:"Supervisory control of automation", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Program's Development Office
    ad_endsley:{ sci:"Mica Endsley (b. 1960)", topic:"Situation awareness", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Program's Development Office
    ad_moray:{ sci:"Neville Moray (1935-2017)", topic:"Attention & mental workload", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    ad_tech:{ ad_vehicle:"", ad_datacenter:"", ad_office:"" },
    ad_analyst:{ ad_vehicle:"", ad_datacenter:"", ad_office:"" },
    ad_clerk:{ ad_vehicle:"", ad_datacenter:"", ad_office:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"ad_hack", dismissalWhat:"ad_glitch",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};