// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"m_rig", title:"The Deepwater Meridian", discipline:"Drilling & Well Control",
  teaser:"An offshore rig blew out and burned at the wellhead. An enemy strike on the platform? A freak pocket of gas no one could predict? Or a safety test that was skipped?", overclaimTag:"an attack on the rig", truthTag:"a skipped cement test and a disabled preventer",
  venue:"the Meridian blowout inquiry", agent:{name:"Investigator Ike Marlow", role:"Investigator's Notepad"},
  standingLabel:"Commission credibility", readingShort:"Pioneers", readingLabel:"Drilling & Well-Control Pioneers",
  dossierName:"DRILLING & WELL-CONTROL PIONEERS", enterLabel:"Open the inquiry", subt:"A deduction game inside the Meridian blowout inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (an attack on the rig) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"rg_operator", items:[
      {id:"rg_operator", label:"Dalton Voss — well operator's rig manager"},
      {id:"rg_driller", label:"The rig's driller"},
      {id:"rg_regulator", label:"The offshore-safety regulator"} ]},
    where:{ title:"Where it culminates", truth:"rg_office", items:[
      {id:"rg_wellhead", label:"The Wellhead & Blowout Preventer"},
      {id:"rg_floor", label:"The Drill Floor & Mud Logging"},
      {id:"rg_office", label:"The Operator's Onshore Office"} ]},
    what:{ title:"What is happening", truth:"rg_wellcontrol", items:[
      {id:"rg_attack", label:"An attack or sabotage on the platform"},
      {id:"rg_pocket", label:"A freak gas pocket — an act of God"},
      {id:"rg_wellcontrol", label:"A skipped cement test and a disabled blowout preventer"} ]}
  },
  PLACES:{
    rg_wellhead:{name:"The Wellhead & Blowout Preventer", xy:[140,90]},
    rg_floor:{name:"The Drill Floor & Mud Logging", xy:[330,240]},
    rg_office:{name:"The Operator's Onshore Office", xy:[520,90]}
  },
  EDGES:[["rg_wellhead","rg_floor"],["rg_floor","rg_office"]],
  CHARACTERS:{
    rg_roughneck:{ name:"Roughneck Sal Ortiz", role:"Drill-floor roughneck", face:"🔧", badge:"R", legend:"the drill floor", hint:"Works the tongs; saw the well kick back mud while the alarms were bypassed." },
    rg_mudlogger:{ name:"The Mud Logger", role:"Mud-logging technician", face:"📈", badge:"M", legend:"the logging cabin", hint:"Reads the returns; the pressure test failed and got recorded as a pass." },
    rg_clerk:{ name:"The Clerk", role:"Operator records clerk", face:"🗂", badge:"C", legend:"the office", hint:"Holds the well plan — and the order to skip the cement bond log to save a day." }
  },
  TOPICMAP:{
    rg_wellhead:{ rg_roughneck:["rg_bernoulli","rg_torricelli"], rg_mudlogger:["rg_boyle","rg_bingham"], rg_clerk:["rg_hubbert","rg_muskat"] },
    rg_floor:{ rg_roughneck:["rg_pratt","rg_lucas"], rg_mudlogger:["rg_hughes","rg_schlumberger"], rg_clerk:["rg_halliburton","rg_abercrombie"] },
    rg_office:{ rg_roughneck:["rg_cameron","rg_kinley"], rg_mudlogger:["rg_adair","rg_morison"], rg_clerk:["rg_collipp","rg_lees"] }
  },
  TOPICS:{
    // cell: Roughneck Sal Ortiz @ The Wellhead & Blowout Preventer
    rg_bernoulli:{ sci:"Daniel Bernoulli (1700-1782)", topic:"Fluid pressure & flow in the well", lede:"The Swiss mathematician who wrote the book on moving fluids and showed that a well is nothing but a pressure ledger that must balance.", no:1,
      profile:"Daniel Bernoulli was a Swiss mathematician and physicist, one of a famous mathematical family, whose 1738 masterwork 'Hydrodynamica' founded the study of fluids in motion. His central result, still taught as Bernoulli's principle, is a statement of energy conservation along a streamline: where a flowing fluid speeds up its pressure falls, and where it slows its pressure rises, with pressure, speed, and elevation trading against one another so their sum stays constant. From that single balance he drew consequences reaching from the flow of water in pipes to the rise of oil up a mile of steel.\n\nA drilled well is a plumbing problem Bernoulli would have recognized at once. The column of drilling mud presses down on the rock; the formation at the bottom presses back. So long as the mud's pressure exceeds the formation's, nothing flows in and the well is 'balanced' and quiet. Let the mud pressure slip below the formation's, and fluid enters, accelerates up the narrowing annulus, and loses pressure as it climbs, which only feeds the flow faster. Every kick and every blowout obeys this bookkeeping of pressure and speed.\n\nFor this inquiry, Bernoulli is the reminder that a blowout is not sorcery and not sabotage — it is arithmetic. The pressures at the bottom of the Meridian's well were known, or knowable, before the last valve was set. If someone let the formation's push win, the physics did the rest, exactly as the equation predicts. An 'act of God' invites you to shrug at numbers that sat on a chart; an 'attack' invites you to hunt a villain when the ledger already balances. Follow the pressures, and the well states plainly what was done to it.",
      frame:"Ortiz jabs a thumb at the standpipe. \"They'll tell you the well 'just let go,' like weather. It doesn't. It's numbers. Show me you can read the pressures and I'll tell you what I felt through the floor.\"",
      q:[
        { q:"What does Bernoulli's principle say about a flowing fluid?", o:[
          { t:"Where a flowing fluid speeds up, its pressure falls, with the total energy conserved.", v:"expert", fb:"Speed up, pressure down, sum conserved — that is the whole of Bernoulli." },
          { t:"A fluid's pressure climbs higher and higher the faster it is forced along a pipe.", v:"wrong", fb:"It is the reverse: faster flow means lower pressure along the streamline." },
          { t:"A fluid in motion carries no pressure at all, so a flowing well cannot push back.", v:"danger", fb:"Flowing fluid still exerts pressure; a live well pushes hard the whole way up." },
          { t:"Speed adds force to a fluid, but its pressure and its speed never affect one another.", v:"partial", fb:"They are tightly coupled; trading pressure for speed is the entire idea." } ] },
        { q:"When does formation fluid start entering a well?", o:[
          { t:"When mud pressure at the bottom drops below the pressure of the formation itself.", v:"expert", fb:"Underbalance — formation pressure winning — is exactly when a kick begins." },
          { t:"Only when a charge or intruder physically breaches the casing from the outside.", v:"danger", fb:"No breach is needed; a pressure imbalance alone invites the formation in." },
          { t:"Whenever the drill bit is turning, since rotation alone pulls fluid up the hole.", v:"wrong", fb:"Rotation does not draw fluid in; the balance of pressures does." },
          { t:"Never, as a sealed well is proof against inflow no matter how the pressures sit.", v:"partial", fb:"A well is only as sealed as its pressure margin; lose that and fluid enters." } ] },
        { q:"Why does Bernoulli's bookkeeping matter to this board?", o:[
          { t:"Because the pressures that drove the blowout were charted numbers, not mysteries.", v:"expert", fb:"Known, traceable pressures are the antidote to both 'act of God' and 'attack'." },
          { t:"Because it proves only a deliberate strike could ever unbalance a modern well.", v:"danger", fb:"Wells go underbalanced through ordinary decisions, no saboteur required." },
          { t:"Because it shows well pressures are unknowable, so any cause is as likely as another.", v:"wrong", fb:"Bernoulli made the flow calculable; the numbers narrow the cause sharply." },
          { t:"Because it lets the board study the mud alone and ignore the formation entirely.", v:"partial", fb:"Both sides of the balance matter; you cannot drop the formation's pressure." } ] }
      ] },
    // cell: Roughneck Sal Ortiz @ The Wellhead & Blowout Preventer
    rg_torricelli:{ sci:"Evangelista Torricelli (1608-1647)", topic:"Pressure head & efflux", lede:"Galileo's last student, who filled a tube with mercury, weighed the whole sky against it, and learned that a column of fluid is a pressure you can measure.", no:2,
      profile:"Evangelista Torricelli was an Italian physicist and mathematician, briefly Galileo's assistant and successor as court mathematician in Florence. In 1643 he performed the experiment that made him famous: he filled a long glass tube with mercury, inverted it into a dish, and watched the mercury fall until it stood about 76 centimetres high, leaving a vacuum above. He had invented the barometer and, more profoundly, shown that a column of fluid exerts a pressure set by its height and density, and that the atmosphere itself has weight enough to hold that column up.\n\nHe also gave us Torricelli's law: fluid draining from a hole in a tank rushes out at a speed set by the height of fluid above the opening, the same speed a body would reach falling that far. Both results turn on a single idea an offshore engineer lives by — 'head.' The pressure at the bottom of any fluid column is its height times its density times gravity. A drilling mud column a mile deep is a barometer pointed downward: its head is the primary force keeping the formation's oil and gas where they belong.\n\nFor this inquiry, Torricelli sets the first test any well must pass. Before drilling ends, crews run a negative-pressure test — they lower the pressure inside and watch whether the well stays quiet, confirming the cement and casing hold when the mud's protective head is reduced. Pass, and the well is sealed; fail, and fluid is already finding its way in. Torricelli's mercury teaches that this is a reading, not an opinion: the well either holds the pressure or it does not. A test that 'failed' but was written down as a pass is not an act of God and not an enemy — it is a number that someone chose to ignore.",
      frame:"Ortiz sets down a mud sample jar. \"A column of mud is the only thing between us and the whole reservoir. Tell me how a fluid's height becomes pressure, and I'll believe you can read what went wrong here.\"",
      q:[
        { q:"What sets the pressure at the bottom of a fluid column?", o:[
          { t:"Its height, its density, and gravity together — the column's 'head' of pressure.", v:"expert", fb:"Height times density times gravity is the hydrostatic head, Torricelli's insight." },
          { t:"Only the width of the column, since a broader tube presses down far harder.", v:"wrong", fb:"Width does not matter; height and density set the pressure, not bore." },
          { t:"Nothing measurable, so the load a mud column carries can only be guessed at.", v:"danger", fb:"Head is exactly measurable; the well's balance is a number, not a guess." },
          { t:"The temperature of the fluid alone, which fixes how hard the column can push.", v:"partial", fb:"Temperature shifts density a little; height and density are what govern head." } ] },
        { q:"What does Torricelli's law describe?", o:[
          { t:"How fast fluid escapes a hole, set by the height of fluid standing above it.", v:"expert", fb:"Efflux speed follows the head, as if the fluid had fallen that height." },
          { t:"How mercury freezes inside a sealed tube once the surrounding air is removed.", v:"wrong", fb:"Torricelli's law is about efflux and head, not the freezing of mercury." },
          { t:"How a fluid at rest slowly evaporates upward against the pull of gravity itself.", v:"wrong", fb:"It concerns draining flow driven by head, not evaporation." },
          { t:"How pressure vanishes the instant a tank is opened, letting fluid dribble out.", v:"partial", fb:"Pressure does not vanish; the standing head drives the outflow at a set speed." } ] },
        { q:"Why does 'head' decide the negative-pressure test?", o:[
          { t:"Lower the mud's head and the test shows plainly whether the seal still holds.", v:"expert", fb:"The test reads a real barrier; a fail written as a pass ignores that reading." },
          { t:"Because only tampering could make a passing well fail such a simple reading.", v:"danger", fb:"A genuine barrier failure fails the test on its own, with no tampering at all." },
          { t:"Because the test measures the crew's reflexes rather than the well's condition.", v:"wrong", fb:"It measures the barrier, not the people; the pressure either holds or it does not." },
          { t:"Because the reading matters only after the well has already begun to flow freely.", v:"partial", fb:"The point is to catch a weak seal before flow starts, not after." } ] }
      ] },
    // cell: The Mud Logger @ The Wellhead & Blowout Preventer
    rg_boyle:{ sci:"Robert Boyle (1627-1691)", topic:"The gas law & expanding gas", lede:"The founder of the chemical experiment, who squeezed air in a bent glass tube and found the law that turns a bubble at depth into a wall of gas at the surface.", no:3,
      profile:"Robert Boyle was an Anglo-Irish natural philosopher, a founder of the Royal Society, and a champion of the experimental method who insisted that claims be tested, measured, and reported honestly. Working with his assistant Robert Hooke and an improved air pump, he studied the 'spring of the air.' In 1662 he published the relationship now called Boyle's law: at constant temperature, the pressure of a fixed amount of gas is inversely proportional to its volume. Halve the pressure and the gas doubles in size; drop the pressure to a fraction and the gas swells enormously.\n\nThat inverse law is the engine of a blowout. Gas that enters a well at the bottom sits under thousands of pounds of pressure, squeezed into a small volume. As the well flows and that gas migrates upward, the pressure around it falls, and by Boyle's law it expands — slowly at first, then violently in the last few hundred metres, where each drop in pressure multiplies its volume. The expanding gas pushes mud out ahead of it, which lowers the pressure further, which expands the gas further: a runaway that can empty a well in seconds.\n\nFor this inquiry, Boyle explains why a small, ignored inflow becomes a fireball. A kick that looks minor at depth is a coiled spring; let it climb unchecked and Boyle's law releases it all at once. This is not the caprice of a 'freak pocket' — it is a law known since 1662, and it is precisely why wells carry blowout preventers to shut the gas in while it is still small and deep. The physics is old and certain. The only variable at the Meridian was whether the barriers meant to interrupt it were doing their job.",
      frame:"Ortiz's voice goes flat. \"A cupful of gas down deep is a truckload by the time it reaches you. Prove you understand that, and I'll tell you how fast the floor cleared.\"",
      q:[
        { q:"What does Boyle's law relate?", o:[
          { t:"A gas's pressure and volume inversely, at a fixed temperature and amount.", v:"expert", fb:"Lower the pressure and the volume rises in proportion — Boyle's inverse law." },
          { t:"A gas's temperature and volume directly, so warming always shrinks the gas.", v:"wrong", fb:"That is a different relation, and warming expands rather than shrinks a gas." },
          { t:"A gas's weight and its color, letting one read its pressure by eye at depth.", v:"wrong", fb:"Boyle's law links pressure and volume, not weight and color." },
          { t:"A gas's pressure and volume, but only for gases that never actually flow.", v:"partial", fb:"The law holds for flowing gas too; migrating gas obeys it as it rises." } ] },
        { q:"Why does a small gas kick become dangerous near the surface?", o:[
          { t:"Falling pressure lets it expand fast, pushing out mud and unloading the well.", v:"expert", fb:"Expansion near the top is explosive because pressure drops fastest there." },
          { t:"Because the surface air chemically ignites any gas the instant it arrives.", v:"danger", fb:"The danger is expansion and volume, not spontaneous ignition on contact." },
          { t:"Because gas gains mass as it rises, growing heavier with every metre it climbs.", v:"wrong", fb:"Its mass is fixed; it is the volume that grows as pressure falls." },
          { t:"Because the drill pipe narrows near the top, squeezing the gas into a smaller space.", v:"partial", fb:"Geometry matters less than Boyle's law; the gas expands regardless." } ] },
        { q:"What does Boyle's law say about a 'freak pocket' explanation?", o:[
          { t:"Gas behaves by a known law, so a preventer is meant to catch it while small.", v:"expert", fb:"The physics is predictable, which is exactly why barriers exist to interrupt it." },
          { t:"Nothing — expanding gas is chaotic, so no equipment could ever have stopped it.", v:"danger", fb:"Preventers are built precisely because the expansion is lawful and foreseeable." },
          { t:"That gas expansion is far too slow to matter over the height of a real well.", v:"wrong", fb:"Expansion accelerates near the surface and is anything but slow." },
          { t:"That only unusually deep wells ever face expanding gas on the way up.", v:"partial", fb:"Any well with gas below faces expansion; depth changes degree, not kind." } ] }
      ] },
    // cell: The Mud Logger @ The Wellhead & Blowout Preventer
    rg_bingham:{ sci:"Eugene C. Bingham (1878-1945)", topic:"Drilling-mud rheology", lede:"The chemist who coined the word 'rheology' and explained why drilling mud, unlike water, can hold cuttings in place until you push it hard enough to move.", no:4,
      profile:"Eugene Cook Bingham was an American chemist at Lafayette College who studied how materials flow, and who, with a colleague, coined the term 'rheology' — the science of deformation and flow — in the 1920s. He is remembered for the Bingham plastic: a material that behaves like a solid until the stress on it exceeds a threshold called the yield stress, then flows like a thick liquid. Toothpaste, paint, and drilling mud all behave this way, which is why they cling in place until forced to move.\n\nDrilling mud is the well's first and most constant line of defence, and its rheology is engineered on purpose. Its density supplies the hydrostatic head that holds back the formation; its yield stress and gel strength let it suspend rock cuttings and, when circulation stops, hold them and any trace of gas in place rather than letting them fall or rise. A mud tuned as a Bingham plastic can be pumped when you want flow and can set into a gel when you want stillness, giving crews a barrier they can control with weight and chemistry.\n\nFor this inquiry, mud is the barrier that must never be given up carelessly. Blowouts often begin when heavy mud is displaced by something lighter — seawater, or an untested spacer — before the cement below has been proven to hold. Remove the mud's head prematurely and you are betting the whole well on a cement seal no one has confirmed. Bingham's science says the mud's protective behavior is designable and measurable; it does not fail by magic. If the Meridian's mud was pulled early to save time, that was a decision about a known barrier, not a freak of nature and not the work of an enemy.",
      frame:"The mud logger taps a viscometer dial. \"Everyone forgets the mud is a barrier until it's gone. Tell me what makes it hold, and I'll show you the night it stopped holding.\"",
      q:[
        { q:"What defines a Bingham plastic like drilling mud?", o:[
          { t:"It stays put until the stress exceeds a yield point, then flows like a liquid.", v:"expert", fb:"A yield stress that must be overcome before flow is the Bingham hallmark." },
          { t:"It flows freely at the faintest touch, exactly like plain water in a pipe.", v:"wrong", fb:"Unlike water, it resists flow until its yield stress is exceeded." },
          { t:"It hardens permanently into rock once it has been pumped down the borehole.", v:"wrong", fb:"It gels reversibly; it does not set to rock like cement does." },
          { t:"It thins with pressure but has no yield stress worth taking into account.", v:"partial", fb:"The yield stress is central; it is what lets mud suspend cuttings and gas." } ] },
        { q:"How does drilling mud act as a well-control barrier?", o:[
          { t:"Its weight supplies head, and its gel suspends cuttings and gas when still.", v:"expert", fb:"Density plus gel strength make mud both a pressure and a suspension barrier." },
          { t:"By chemically dissolving any gas it meets so none can ever reach the surface.", v:"danger", fb:"Mud holds gas by weight and gel, not by dissolving it away." },
          { t:"By cooling the drill bit, which is the only real job the mud does downhole.", v:"partial", fb:"Cooling matters, but the mud's density is the primary pressure barrier." },
          { t:"By setting hard around the pipe to form the well's permanent pressure seal.", v:"wrong", fb:"Mud stays fluid; the permanent seal is the cement, a separate barrier." } ] },
        { q:"Why does displacing mud early raise the stakes?", o:[
          { t:"It removes the proven head and bets the well on an unconfirmed cement seal.", v:"expert", fb:"Pulling mud before the cement is verified stakes everything on that seal." },
          { t:"It cannot matter, since seawater is always heavier than any drilling mud.", v:"wrong", fb:"Seawater is lighter than weighted mud, so it reduces the protective head." },
          { t:"It only matters if a saboteur has first weakened the casing from outside.", v:"danger", fb:"No sabotage is needed; lightening the column alone can unbalance the well." },
          { t:"It changes the mud's color, which is the real signal crews watch for at night.", v:"partial", fb:"The signal is returns and pressure, not color; the risk is the lost head." } ] }
      ] },
    // cell: The Clerk @ The Wellhead & Blowout Preventer
    rg_hubbert:{ sci:"M. King Hubbert (1903-1989)", topic:"Subsurface pressure & rock fracture", lede:"The Shell geophysicist famous for predicting peak oil, who also worked out the pressures the rock itself carries and the exact stress at which it splits.", no:5,
      profile:"Marion King Hubbert was an American geophysicist, best known publicly for his 1956 prediction of a peak in U.S. oil production, but revered among engineers for putting the mechanics of the subsurface on a rigorous footing. Working at Shell's research lab, he studied how fluids move through rock and how rock deforms and fractures under stress. With David Willis in 1957 he published the theory of hydraulic fracturing, explaining that a formation splits open when the pressure applied to it exceeds the least of the natural stresses squeezing the rock.\n\nHubbert made clear that the underground is not empty space but a stressed, fluid-filled solid with two pressures every driller must respect. There is pore pressure — the pressure of fluids trapped in the rock's pores, which the mud must exceed to keep the formation out. And there is the fracture pressure — the higher pressure at which the rock cracks and swallows the mud. Safe drilling lives in the narrow 'mud-weight window' between them: heavy enough to hold the formation back, light enough not to fracture it and lose the well.\n\nFor this inquiry, Hubbert dismantles the 'freak pocket' story. Formation pressures are not surprises sprung from nowhere; they are estimated before the bit turns, refined while drilling, and logged. An overpressured zone is a hazard you plan for, not an ambush. If the Meridian met pressure its crew had mapped and still lost control, the failure was in the barriers and the decisions, not in the geology. Hubbert's work says the rock plays by rules that were written on the well plan. An 'act of God' asks you to forget that plan; the plan is exactly where an investigator should start.",
      frame:"The mud logger slides a pore-pressure plot across the bench. \"People love to call the pressure a surprise. It was on this chart. Show me you understand it, and I'll show you what the plan actually said.\"",
      q:[
        { q:"What is pore pressure?", o:[
          { t:"The pressure of fluids held in the rock's pores, which the mud must exceed.", v:"expert", fb:"Pore pressure is what the mud's head has to overbalance to hold the formation." },
          { t:"The weight of the rig and derrick bearing straight down on the seabed below.", v:"wrong", fb:"That is surface load; pore pressure is the fluid pressure within the rock." },
          { t:"The pressure a saboteur must inject to force a sealed formation into flowing.", v:"danger", fb:"Pore pressure is natural to the rock; no injection is needed for it to exist." },
          { t:"The pressure inside the drill pipe, set entirely by how hard the pumps run.", v:"partial", fb:"Pump pressure is separate; pore pressure belongs to the formation itself." } ] },
        { q:"What is the 'mud-weight window'?", o:[
          { t:"The range heavy enough to hold the formation yet light enough not to fracture it.", v:"expert", fb:"Between pore pressure and fracture pressure is the safe window Hubbert defined." },
          { t:"The span of hours in which a well can be drilled before the mud spoils.", v:"wrong", fb:"It is a range of mud weights, not a window of time." },
          { t:"The gap between two rig shifts, when no one is watching the mud at all.", v:"wrong", fb:"It refers to fluid density limits, not to crew scheduling." },
          { t:"The mud weight the pumps prefer, chosen for smooth flow rather than safety.", v:"partial", fb:"The window is set by formation limits, not by what the pumps like." } ] },
        { q:"How does Hubbert's work read the 'freak pocket' claim?", o:[
          { t:"As avoidable — formation pressures are mapped and planned for before drilling.", v:"expert", fb:"Charted, predictable pressures are the opposite of an unforeseeable pocket." },
          { t:"As proof of the unknowable, since deep pressures cannot be estimated at all.", v:"wrong", fb:"Hubbert's methods estimate them well; ambush is rarely the real story." },
          { t:"As evidence that only a planted charge could have raised the pressure so high.", v:"danger", fb:"High pressure is natural and predicted; it needs no charge to explain it." },
          { t:"As a matter for the geologist alone, of no concern to the well's barriers.", v:"partial", fb:"Geology sets the challenge; barriers and decisions determine the outcome." } ] }
      ] },
    // cell: The Clerk @ The Wellhead & Blowout Preventer
    rg_muskat:{ sci:"Morris Muskat (1906-1998)", topic:"Flow through porous reservoir rock", lede:"The Gulf Oil physicist who took a French engineer's law for water in sand and turned it into the mathematics of every reservoir on Earth.", no:6,
      profile:"Morris Muskat was an American physicist and petroleum engineer at Gulf Research who, in his 1937 book 'The Flow of Homogeneous Fluids Through Porous Media,' laid the mathematical foundation of modern reservoir engineering. He built on Darcy's law — the nineteenth-century observation that fluid flows through porous material at a rate set by the pressure difference across it, the rock's permeability, and the fluid's viscosity — and extended it into a full theory of how oil, gas, and water move underground toward a well.\n\nMuskat's central quantities are porosity, the fraction of the rock that is open pore space, and permeability, the ease with which fluid threads through those connected pores. A high-permeability reservoir can deliver fluid to a well astonishingly fast; a low-permeability one only trickles. The rate of inflow depends on how far the well's pressure has been drawn below the reservoir's — the 'drawdown.' This is why controlling the pressure at the bottom of the hole is controlling the well: it sets how hard the reservoir pushes its fluids in.\n\nFor this inquiry, Muskat explains the tempo of disaster. A high-permeability formation, once underbalanced, does not leak — it floods, delivering a large kick in little time. That leaves scant margin for error and makes the barriers that shut flow in, promptly and reliably, all the more vital. Muskat's mathematics shows the inflow rate was governed by rock properties measured before drilling and by the pressure the crew allowed. Neither is mysterious. A reservoir doing exactly what its permeability dictates is not an 'act of God,' and its speed is not evidence of an 'attack' — it is the predictable arithmetic of flow that the well's defences existed to counter.",
      frame:"The mud logger points at a core sample. \"See how it drinks water? That's permeability. It tells you how fast this well could turn on you. Prove you get it, and I'll tell you how fast it did.\"",
      q:[
        { q:"What does permeability measure?", o:[
          { t:"How easily fluid threads through a rock's connected pores toward the well.", v:"expert", fb:"Permeability is the rock's conductivity to flow, central to Muskat's theory." },
          { t:"How much total oil a reservoir holds before any of it is ever produced.", v:"wrong", fb:"That is closer to reserves; permeability is about ease of flow, not volume." },
          { t:"How deep the reservoir sits beneath the seabed and the rig above it.", v:"wrong", fb:"Depth is unrelated; permeability describes flow through the pore network." },
          { t:"How porous the rock is, which by itself fixes how fast fluid can move.", v:"partial", fb:"Porosity is space; permeability is connectivity, and it governs flow rate." } ] },
        { q:"What does Darcy's law, as Muskat used it, say drives inflow?", o:[
          { t:"The pressure drawdown, the permeability, and the fluid's viscosity together.", v:"expert", fb:"Those three set the flow rate into a well under Darcy's law." },
          { t:"The color of the crude alone, since darker oil always flows faster than light.", v:"wrong", fb:"Color is irrelevant; viscosity and pressure difference drive the flow." },
          { t:"The number of pumps running at surface, which pull the reservoir fluid upward.", v:"wrong", fb:"Surface pumps do not draw the reservoir; downhole pressure drawdown does." },
          { t:"The reservoir pressure only, with the rock's properties making no difference.", v:"partial", fb:"Pressure matters, but permeability and viscosity are equally in the equation." } ] },
        { q:"Why does high permeability matter to the pace of a kick?", o:[
          { t:"It lets the reservoir flood the well fast, leaving little margin to react.", v:"expert", fb:"High permeability means a large, quick kick — barriers must act promptly." },
          { t:"It proves the flood was engineered, since nature never flows that quickly.", v:"danger", fb:"Nature flows fast through permeable rock; speed is no sign of sabotage." },
          { t:"It slows the well down, since permeable rock resists any inflow at all.", v:"wrong", fb:"Permeable rock eases flow; it speeds a kick, not slows it." },
          { t:"It matters only after the fire, not during the loss of well control.", v:"partial", fb:"It governs the kick as it happens, which is precisely the critical window." } ] }
      ] },
    // cell: Roughneck Sal Ortiz @ The Drill Floor & Mud Logging
    rg_pratt:{ sci:"Wallace Pratt (1885-1981)", topic:"Petroleum geology & the reservoir", lede:"The Humble Oil geologist who insisted oil is found first in the minds of men, and taught an industry to read the rock before it drilled.", no:7,
      profile:"Wallace Everette Pratt was one of America's most influential petroleum geologists, a founder and long-serving chief geologist of Humble Oil (later part of Exxon). He rose to prominence in the early twentieth century as the industry shifted from wildcat luck to systematic science, and he championed geology as the discipline that finds oil. His often-quoted line — 'oil is first found in the minds of men' — captured his belief that understanding the subsurface, not blind drilling, is what turns rock into a reservoir.\n\nPratt taught that a commercial reservoir requires a specific combination: a source rock that generated hydrocarbons, a porous and permeable reservoir rock to hold them, and an impermeable cap rock or trap to keep them from escaping over geologic time. Oil and gas migrate upward through the crust until a trap stops them, accumulating under pressure. Where the geology is understood, the depth, pressure, and character of a reservoir can be anticipated before a well is drilled — which is the whole purpose of the science he helped build.\n\nFor this inquiry, Pratt frames the reservoir as a known adversary, not a lurking monster. The Meridian's target was studied, mapped, and modelled; its pressure and productivity were estimated in advance. A geologist's reservoir behaves as its trap and rock dictate — it does not conspire and it does not detonate. When a well reaches a formation the science already described and control is lost anyway, the explanation lies in how the well was built and handled, not in the rock's malice. Pratt's legacy tells the board to trust the geology it has, and to look at the human choices layered on top of it.",
      frame:"Ortiz thumbs a rolled-up prospect map. \"The geologists knew what was down there before we spudded. This wasn't a monster we woke up. Show me you understand the reservoir, and I'll tell you the rest.\"",
      q:[
        { q:"What three elements did Pratt say make a commercial reservoir?", o:[
          { t:"A source rock, a porous reservoir rock, and a trap that holds the oil in.", v:"expert", fb:"Source, reservoir, and trap together are the classic petroleum system." },
          { t:"A deep enough well, a fast enough pump, and a calm enough sea overhead.", v:"wrong", fb:"Those are operational; Pratt's elements are geological — source, reservoir, trap." },
          { t:"A salt dome, a coal seam, and a river delta stacked directly on top of it.", v:"wrong", fb:"Some traps involve salt, but the general system is source, reservoir, and trap." },
          { t:"A porous rock alone, since oil forms in place wherever the pores are open.", v:"partial", fb:"Porosity is one part; oil must be sourced and trapped as well." } ] },
        { q:"Why did Pratt say oil is 'found in the minds of men'?", o:[
          { t:"Because understanding the subsurface, not blind luck, is what locates oil.", v:"expert", fb:"Pratt made geological reasoning, not chance, the way oil is found." },
          { t:"Because oil is imaginary until a rig proves it, so geology tells us nothing.", v:"wrong", fb:"He meant geology reveals real oil; it is far from useless." },
          { t:"Because only a saboteur's mind decides where a well will truly fail.", v:"danger", fb:"The phrase is about discovery through science, not about sabotage." },
          { t:"Because drilling in enough places at random will always strike oil eventually.", v:"partial", fb:"That is the wildcat approach Pratt argued against with science." } ] },
        { q:"How should the board regard a well-mapped reservoir?", o:[
          { t:"As a known adversary whose pressure and yield were estimated in advance.", v:"expert", fb:"A studied reservoir is predictable; loss of control points to human choices." },
          { t:"As an unknowable force, so the blowout could not have been foreseen at all.", v:"wrong", fb:"Mapping makes it foreseeable; that is why geology is done before drilling." },
          { t:"As proof the rock itself turned hostile and struck the platform deliberately.", v:"danger", fb:"Rock does not attack; a described reservoir simply behaved as expected." },
          { t:"As irrelevant once drilling starts, since geology stops mattering at that point.", v:"partial", fb:"Geology guides the whole operation; it never stops informing well control." } ] }
      ] },
    // cell: Roughneck Sal Ortiz @ The Drill Floor & Mud Logging
    rg_lucas:{ sci:"Anthony F. Lucas (1855-1921)", topic:"The gusher & the danger of blowout", lede:"The engineer whose 1901 Spindletop gusher blew a hundred thousand barrels a day into the Texas sky and announced that an uncontrolled well is a monster to be tamed.", no:8,
      profile:"Anthony Francis Lucas was an Austrian-born, American mining and salt-dome engineer whose well at Spindletop, near Beaumont, Texas, ushered in the modern petroleum age. On January 10, 1901, drilling into a salt-dome structure others had dismissed, his crew struck a reservoir under enormous pressure. Mud, then gas, then a column of oil erupted through the derrick, and the well flowed uncontrolled — a 'gusher' — throwing an estimated 100,000 barrels a day into the air for nine days before it could be capped.\n\nSpindletop was a triumph and a warning. It proved the vast productivity of pressured salt-dome reservoirs and launched the Texas oil boom, but the nine days of open flow — wasting oil, drenching the countryside, and threatening catastrophic fire — showed the industry that finding oil under pressure and controlling it were two very different problems. The gusher became the emblem of a well let loose, and the decades that followed were, in large part, the story of learning to prevent it: heavier muds, cemented casing, and, eventually, the blowout preventer.\n\nFor this inquiry, Lucas is the historical memory that makes the 'act of God' excuse indefensible. The danger of an uncontrolled well has been vivid and understood for well over a century. Nobody in 1901 could stop a gusher; everybody since has been expected to. The entire apparatus of modern well control exists because Spindletop taught the trade what a pressured reservoir does when its barriers are absent. A blowout in the present day is not an unforeseeable shock — it is the oldest known hazard in the business, and its occurrence points not to fate but to defences that were missing or defeated.",
      frame:"Ortiz's jaw tightens. \"Men have known what a loose well does since Spindletop. Nobody gets to act surprised. Show me you know that history, and I'll tell you why this one got loose.\"",
      q:[
        { q:"What made the 1901 Spindletop well a 'gusher'?", o:[
          { t:"A pressured reservoir flowed uncontrolled up the hole and out of the derrick.", v:"expert", fb:"An open, uncontrolled flow of pressured oil is precisely a gusher." },
          { t:"A lightning strike ignited the derrick and blew the oil upward in the blast.", v:"danger", fb:"No blast was involved; reservoir pressure alone drove the uncontrolled flow." },
          { t:"A pump was run so hard it forced oil hundreds of feet into the open air.", v:"wrong", fb:"No pump did that; the formation's own pressure erupted the well." },
          { t:"An earthquake cracked the salt dome and shook the oil loose to the surface.", v:"wrong", fb:"It was drilling into a pressured zone, not an earthquake, that let it flow." } ] },
        { q:"What lesson did Spindletop teach the young industry?", o:[
          { t:"Finding oil under pressure and controlling it are two different problems.", v:"expert", fb:"Spindletop split discovery from control, driving well-control invention." },
          { t:"That salt domes hold no oil, so drilling them is always a waste of effort.", v:"wrong", fb:"The opposite: it proved salt domes can hold enormous, pressured reservoirs." },
          { t:"That gushers are harmless spectacles best left to flow until they tire out.", v:"danger", fb:"Nine days of open flow was dangerous waste, not a harmless show." },
          { t:"That deeper wells are always safer, since pressure fades with more depth.", v:"partial", fb:"Depth does not tame pressure; control came from barriers, not deeper holes." } ] },
        { q:"Why does Lucas undercut the 'act of God' defence?", o:[
          { t:"The danger of a loose well has been understood and guarded against since 1901.", v:"expert", fb:"A century of known hazard makes 'unforeseeable' an untenable excuse." },
          { t:"Because gushers are so rare now that any modern one must be an enemy strike.", v:"danger", fb:"They are rare because of barriers, not because only sabotage causes them." },
          { t:"Because it shows blowouts are pure chance that no equipment can influence.", v:"wrong", fb:"The whole point was that equipment and method can prevent them." },
          { t:"Because it proves only very shallow wells were ever really at risk of blowing.", v:"partial", fb:"Depth is not the safeguard; barriers are, at any depth." } ] }
      ] },
    // cell: The Mud Logger @ The Drill Floor & Mud Logging
    rg_hughes:{ sci:"Howard Hughes Sr. (1869-1924)", topic:"The roller-cone drill bit", lede:"The inventor whose rolling-cutter bit chewed through rock that had stopped every driller before him, and built the fortune his famous son would spend.", no:9,
      profile:"Howard Robard Hughes Sr. was an American inventor and businessman who, with partner Walter Sharp, patented the two-cone roller drill bit in 1909 and founded the Sharp-Hughes Tool Company. Before his bit, wells were drilled largely by pounding or by simple fishtail blades that failed quickly in hard rock. Hughes's design put rotating cones studded with hardened teeth at the end of the pipe; as the drill string turned, the cones rolled and their teeth chipped and crushed the rock beneath, drilling formations that had been effectively impassable.\n\nThe roller-cone bit transformed drilling from a shallow art into a deep science, opening reservoirs that older tools could never have reached and making Hughes's company (later Hughes Tool) a cornerstone of the oil-field supply business. The principle — rolling cutters that fail rock by crushing rather than scraping — remains the basis of many bits today, refined with tungsten-carbide inserts and sealed bearings, and it is one reason wells now routinely reach depths measured in miles.\n\nFor this inquiry, Hughes represents the deep well as a normal, achievable thing — and a demanding one. Reaching a pressured formation far below the seabed is routine engineering, but every added mile of depth raises the pressures the barriers must hold and shortens the time a crew has to react to a kick. The bit that made such depths possible did not make them casual. Hughes's legacy reminds the board that depth alone explains nothing: it is not a mysterious frontier where 'freak' events lurk, but a well-understood regime whose hazards are met by design, cement, and preventers. Where those held, deep wells are safe; where they were skipped, depth only sharpened the consequences.",
      frame:"Ortiz spins a worn cone bit on the bench. \"Hughes made it possible to drill this deep. Deep isn't magic — it's just less time to fix a mistake. Prove you understand the tool, and I'll talk.\"",
      q:[
        { q:"How does a roller-cone bit break rock?", o:[
          { t:"Rotating cones press hardened teeth into the rock, crushing and chipping it.", v:"expert", fb:"Rolling cutters that crush the rock are Hughes's core innovation." },
          { t:"A single fixed blade scrapes the rock away exactly as the old fishtails did.", v:"wrong", fb:"That is the older design Hughes's rolling cones replaced." },
          { t:"A jet of burning gas melts the rock ahead of the pipe as it advances.", v:"wrong", fb:"There is no flame; the cones crush rock mechanically." },
          { t:"Pounding the pipe up and down to hammer through the formation by impact.", v:"partial", fb:"That is cable-tool pounding; Hughes's bit rolls and crushes instead." } ] },
        { q:"Why did the roller-cone bit matter to the industry?", o:[
          { t:"It let drillers pass hard rock and reach far deeper, pressured reservoirs.", v:"expert", fb:"Deeper reach into hard formations was the bit's transformative gift." },
          { t:"It removed the need for any drilling mud, since the cones cooled themselves.", v:"wrong", fb:"Mud remained essential for cooling, lifting cuttings, and control." },
          { t:"It made blowout preventers unnecessary by drilling too slowly to cause kicks.", v:"danger", fb:"Faster, deeper drilling raised the stakes; preventers grew more vital, not less." },
          { t:"It let wells be drilled without any casing, straight into open hard rock.", v:"partial", fb:"Casing stayed essential; the bit improved cutting, not well construction." } ] },
        { q:"What does depth itself imply about a blowout's cause?", o:[
          { t:"Depth is routine but demanding; it sharpens consequences, it does not create mystery.", v:"expert", fb:"Deep wells are well understood; depth explains speed, not an unforeseeable freak." },
          { t:"Deep wells are a frontier where freak events strike beyond any prevention.", v:"danger", fb:"Depth is engineered for; its hazards are met by design, not left to chance." },
          { t:"Depth makes wells inherently safer, so a deep blowout must be an outside attack.", v:"wrong", fb:"Depth raises pressures and shortens reaction time; it does not imply sabotage." },
          { t:"Depth is the sole cause of any blowout, regardless of how the well was built.", v:"partial", fb:"Depth is a factor; barriers and decisions determine whether control is kept." } ] }
      ] },
    // cell: The Mud Logger @ The Drill Floor & Mud Logging
    rg_schlumberger:{ sci:"Conrad Schlumberger (1878-1936)", topic:"Electrical well logging", lede:"The French physicist who lowered electrodes into a well and let electricity draw a map of the rock no one could see.", no:10,
      profile:"Conrad Schlumberger was a French physicist who, with his brother Marcel, invented electrical well logging — a way to measure the properties of rock deep in a borehole without bringing it to the surface. Trained at the École des Mines, Conrad reasoned that different rocks and fluids conduct electricity differently: porous rock saturated with salty water conducts well, while rock filled with oil or gas resists. In 1927, at Pechelbronn in France, the brothers lowered electrodes down a well and recorded the first electrical resistivity log, reading the formation's character point by point down the hole.\n\nThe technique, refined by the company they founded, gave the industry eyes underground. A wireline tool lowered into a well can now map porosity, identify oil- and gas-bearing zones, measure pressures, and — crucially for well integrity — assess the cement behind the casing. The cement bond log, a descendant of their idea, sends sound through the casing and reads the echo to judge whether cement is properly bonded to the pipe and rock, or whether channels and gaps leave a path for gas to rise.\n\nFor this inquiry, Schlumberger's legacy is the tool that could have caught the flaw. Well logs turn the invisible into a chart: the state of the cement, the pressure of the zones, the presence of gas. A cement bond log run after cementing would have shown whether the barrier at the bottom of the Meridian's well was sound. If such a log was skipped to save rig time, then the means to see the danger existed and was set aside. That is not fate and not an enemy — it is a measurement declined. The board should ask what logs were run, what they showed, and which ones were quietly left out.",
      frame:"The mud logger lays a paper log across the desk. \"This is how we see through steel and rock. A bond log would have shown the cement plain as day. Prove you understand logging, and I'll tell you which log nobody ran.\"",
      q:[
        { q:"What did the Schlumberger brothers' 1927 log measure?", o:[
          { t:"The electrical resistivity of the rock, distinguishing water from oil zones.", v:"expert", fb:"Resistivity told water-filled from hydrocarbon-filled rock — the first well log." },
          { t:"The exact age of the formation, dated from electric current run through it.", v:"wrong", fb:"Logs read resistivity and properties, not geological age." },
          { t:"The temperature of the drilling crew's tools left at the bottom of the hole.", v:"wrong", fb:"It measured formation electrical properties, not tool temperature." },
          { t:"The rock's color, read by a camera lowered on the same wireline cable.", v:"partial", fb:"Early logs were electrical, not photographic; resistivity was the measurement." } ] },
        { q:"What does a cement bond log assess?", o:[
          { t:"Whether cement is bonded to casing and rock, or leaves a channel for gas.", v:"expert", fb:"The bond log judges the cement barrier's integrity behind the pipe." },
          { t:"How much crude oil the reservoir will ultimately produce over its life.", v:"wrong", fb:"That is a reservoir estimate; the bond log checks cement, not reserves." },
          { t:"Whether an intruder has planted a device against the outside of the casing.", v:"danger", fb:"It reads cement quality, not tampering; the concern is bonding, not bombs." },
          { t:"How fast the drill bit was turning when the casing was first run in.", v:"partial", fb:"It evaluates the set cement, not the earlier drilling parameters." } ] },
        { q:"Why does a skipped bond log matter to this board?", o:[
          { t:"The means to see the cement flaw existed and was declined, not unavailable.", v:"expert", fb:"A skipped log is a measurement refused — neither fate nor an enemy." },
          { t:"It matters only if sabotage is suspected, since logs detect intruders alone.", v:"danger", fb:"Logs verify barriers; a skipped one hides an ordinary flaw, not an attacker." },
          { t:"It does not matter, since cement quality cannot be checked once it is set.", v:"wrong", fb:"A bond log checks set cement precisely; that is its purpose." },
          { t:"It matters only to the geologist, not to anyone judging the well's safety.", v:"partial", fb:"Cement integrity is a safety question central to well control." } ] }
      ] },
    // cell: The Clerk @ The Drill Floor & Mud Logging
    rg_halliburton:{ sci:"Erle P. Halliburton (1892-1957)", topic:"Oil-well cementing", lede:"The tinkerer who pumped cement down a well to seal it, patented the method against fierce resistance, and made the sealed borehole the foundation of well control.", no:11,
      profile:"Erle Palmer Halliburton was an American oil-field entrepreneur who turned well cementing into a reliable, measured process and built one of the world's great oil-service companies around it. In the early 1920s, borrowing an idea from a former employer, he developed a method for pumping cement slurry down the inside of the casing and up into the space behind it, then founded the Halliburton Oil Well Cementing Company in 1919 in Oklahoma. He patented his jet mixer and cementing techniques and defended them vigorously, standardizing a step that had been crude and unreliable.\n\nCementing is the operation that seals a well. After steel casing is run into the hole, cement is pumped down and around it to bond the pipe to the rock and, above all, to isolate the pressured formations from one another and from the surface. A good cement job at the bottom of a well is the primary barrier against the reservoir: it keeps oil and gas confined until they are meant to be produced. A bad job — cement that channels, fails to set, or is contaminated — leaves a hidden path for gas to migrate up behind the casing.\n\nFor this inquiry, cement is the heart of the matter. It is the barrier the whole well rests on, and its condition is not a matter of faith: it is tested. A negative-pressure test checks whether the cement and casing hold when the mud's weight is reduced, and a cement bond log images the seal directly. A cement job accepted without a convincing test is a barrier assumed rather than proven. If the Meridian's crew ran seawater in and trusted a cement seal no test had confirmed — or dismissed a test that failed — then the well's first defence was never really in place. Halliburton's discipline was to prove the seal, not to hope for it.",
      frame:"The clerk sets a well diagram on the desk and taps the shoe. \"Everything hangs on the cement down here. It's meant to be tested, not trusted. Show me you understand that, and I'll show you what the plan ordered.\"",
      q:[
        { q:"What is the purpose of cementing a well?", o:[
          { t:"To bond the casing to the rock and isolate the pressured formations behind it.", v:"expert", fb:"Cement seals and isolates the formations — the well's primary barrier." },
          { t:"To lubricate the casing so the drill string slides in and out more smoothly.", v:"wrong", fb:"Cement seals; it is not a lubricant for the drill string." },
          { t:"To fill the whole borehole solid so no oil is ever produced from the well.", v:"wrong", fb:"Cement isolates zones behind the pipe; the well still produces through it." },
          { t:"To cool the reservoir rock so its pressure drops to a safe level before flow.", v:"partial", fb:"Cement does not cool the reservoir; it seals and isolates the well." } ] },
        { q:"What is a bad cement job likely to leave behind?", o:[
          { t:"Channels or gaps that give gas a hidden path to migrate up the well.", v:"expert", fb:"Poor cement channels, letting gas rise behind the casing unseen." },
          { t:"A stronger seal than good cement, since gaps let pressure escape harmlessly.", v:"wrong", fb:"Gaps weaken the seal and invite flow; they do not relieve pressure safely." },
          { t:"Evidence of a planted charge, since only a blast disturbs setting cement.", v:"danger", fb:"Contamination and channeling are ordinary failures, not signs of a bomb." },
          { t:"No consequence at all, because the mud alone keeps the well fully sealed.", v:"partial", fb:"Mud is temporary; cement is the permanent barrier, and its flaws matter." } ] },
        { q:"How is a cement barrier meant to be confirmed?", o:[
          { t:"By a negative-pressure test and a bond log, not by assumption or faith.", v:"expert", fb:"Testing proves the seal; an accepted-but-untested job is only assumed." },
          { t:"By the rig manager's signature alone, which certifies the cement is sound.", v:"wrong", fb:"A signature is not a test; the barrier must be physically verified." },
          { t:"By waiting for the well to flow, since a leak proves the cement failed.", v:"danger", fb:"Waiting for flow is waiting for a blowout; tests catch failure beforehand." },
          { t:"By checking the color of the returns, which reveals the seal below.", v:"partial", fb:"Returns hint at problems, but the seal is confirmed by pressure test and log." } ] }
      ] },
    // cell: The Clerk @ The Drill Floor & Mud Logging
    rg_abercrombie:{ sci:"James S. Abercrombie (blowout-preventer co-inventor)", topic:"The ram blowout preventer", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Roughneck Sal Ortiz @ The Operator's Onshore Office
    rg_cameron:{ sci:"Harry S. Cameron (well-control equipment pioneer)", topic:"Blowout-preventer engineering", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Roughneck Sal Ortiz @ The Operator's Onshore Office
    rg_kinley:{ sci:"Myron Kinley (1898-1978)", topic:"Blowout & well-fire control", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The Mud Logger @ The Operator's Onshore Office
    rg_adair:{ sci:"Red Adair (1915-2004)", topic:"Offshore blowout firefighting", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The Mud Logger @ The Operator's Onshore Office
    rg_morison:{ sci:"J. R. Morison (offshore wave-load researcher)", topic:"Wave forces on offshore structures", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Operator's Onshore Office
    rg_collipp:{ sci:"Bruce Collipp (semisubmersible-rig pioneer)", topic:"The floating offshore rig", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Operator's Onshore Office
    rg_lees:{ sci:"Frank P. Lees (1931-1999)", topic:"Process safety & loss prevention", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    rg_roughneck:{ rg_wellhead:"", rg_floor:"", rg_office:"" },
    rg_mudlogger:{ rg_wellhead:"", rg_floor:"", rg_office:"" },
    rg_clerk:{ rg_wellhead:"", rg_floor:"", rg_office:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"rg_attack", dismissalWhat:"rg_pocket",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};