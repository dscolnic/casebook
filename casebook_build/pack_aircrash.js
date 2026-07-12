// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"aircrash", title:"The Fall of Ardent 9", discipline:"Aerospace Engineering",
  teaser:"A brand-new airliner fell from a clear sky. Terror? Pilot error? Or something no one wants you to find?", overclaimTag:"terrorism or a bomb", truthTag:"a concealed flight-control flaw",
  venue:"the Ardent 9 accident board", agent:{name:"Investigator Sam Okoye", role:"Investigator's Notepad"},
  standingLabel:"Board credibility", readingShort:"Pioneers", readingLabel:"Aviation Pioneers",
  dossierName:"AVIATION PIONEERS", enterLabel:"Open the inquiry", subt:"A deduction game inside the Ardent 9 accident board", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"And beware the answer the cameras want: the evidence points not to a bomb, but to something quieter — and harder to bury.",
  CATS:{
    who:{ title:"Who is behind it", truth:"maker", items:[
      {id:"crew", label:"The flight crew"},
      {id:"maker", label:"Vaughn — manufacturer program manager"},
      {id:"airline", label:"The airline's maintenance chief"} ]},
    where:{ title:"Where it culminates", truth:"designbay", items:[
      {id:"wreck", label:"The Wreckage & Recorders"},
      {id:"hangar", label:"The Airline Maintenance Hangar"},
      {id:"designbay", label:"The Manufacturer's Design Bay"} ]},
    what:{ title:"What is happening", truth:"flaw", items:[
      {id:"terror", label:"A bomb or deliberate sabotage"},
      {id:"piloterror", label:"Simple pilot error — nothing systemic"},
      {id:"flaw", label:"A concealed flight-control/design flaw"} ]}
  },
  PLACES:{
    wreck:{name:"The Wreckage & Recorders", xy:[140,90]},
    hangar:{name:"The Airline Maintenance Hangar", xy:[330,240]},
    designbay:{name:"The Manufacturer's Design Bay", xy:[520,90]}
  },
  EDGES:[["wreck","hangar"],["hangar","designbay"]],
  CHARACTERS:{
    atc:{ name:"Controller Diaz", role:"Air-traffic controller", face:"🗼", badge:"C", legend:"the tower", hint:"Heard the crew's last calls; knows the plane was fighting itself." },
    mech:{ name:"Mechanic Rao", role:"Line mechanic", face:"🔧", badge:"M", legend:"the hangar", hint:"Signed off the airframe; noticed a sensor that kept being replaced." },
    whistle:{ name:"The Whistleblower", role:"Manufacturer test engineer", face:"✈", badge:"W", legend:"the design bay", hint:"Flagged the control system in testing; was told to stay quiet." }
  },
  TOPICMAP:{
    wreck:{ atc:["lift","stall"], mech:["drag","stability"], whistle:["controls","loadfactor"] },
    hangar:{ atc:["fatigue","flutter"], mech:["automation","accidentchain"], whistle:["propulsion","pressurization"] },
    designbay:{ atc:["balance","recorders"], mech:["humanfactors","certification"], whistle:["airspeed","windtunnel"] }
  },
  TOPICS:{
    // cell: Controller Diaz @ The Wreckage & Recorders
    lift:{ sci:"Ludwig Prandtl (1875-1953)", topic:"Lift & the boundary layer", lede:"The Göttingen professor who saw that all the drama of a moving fluid hides in a film thinner than a coat of paint.", no:1,
      profile:"Ludwig Prandtl is widely called the father of modern aerodynamics. In 1904, at a mathematics congress in Heidelberg, he presented a short paper that changed fluid mechanics forever: the idea of the boundary layer. He proposed that when air flows past a surface, friction matters only within a very thin layer clinging to that surface, while beyond it the flow behaves as if frictionless. This single insight reconciled the elegant but wrong 'ideal fluid' theory with the messy reality engineers measured, and it made it possible to calculate drag, predict where flow separates, and understand how a wing truly generates lift.\n\nFrom his institute at Göttingen, Prandtl built wind tunnels, trained a generation of aerodynamicists (Max Munk and Theodore von Kármán among them), and developed lifting-line theory, which explains how a finite wing sheds vortices and how its shape sets its lift and induced drag. He showed that lift arises from the pressure difference created as a wing turns the airflow, and that the health of the boundary layer — attached or separated — decides whether a wing flies or stalls.\n\nFor this board, Prandtl's lesson is discipline. Lift is not magic and its loss is not mystery: it obeys pressure, circulation, and the fragile boundary layer. When a wing stops flying, an investigator can trace exactly why, from measurable causes. Before anyone reaches for the word 'bomb,' Prandtl would ask what the air over that wing was doing — because the difference between a sabotaged aircraft and a mishandled one is written in the flow, not in headlines.",
      frame:"Diaz taps a wreckage photo. \"They'll tell you a wing that stops flying is a mystery. It isn't. Show me you know what actually holds a plane up.\"",
      q:[
        { q:"What did Prandtl's boundary-layer idea establish?", o:[
          { t:"Fluid friction acts mainly in a thin layer at the surface, with near-frictionless flow beyond.", v:"expert", fb:"That thin layer is exactly Prandtl's insight, and it made drag calculable." },
          { t:"Air is truly frictionless everywhere, so the drag on a wing is essentially an illusion.", v:"danger", fb:"That is the old ideal-fluid error Prandtl fixed; friction is real, just concentrated." },
          { t:"Friction fills the whole airflow evenly, making any thin-layer analysis impossible to use.", v:"wrong", fb:"The point was the opposite: friction concentrates near the surface." },
          { t:"Drag depends only on a body's shape, with the surrounding air playing no real part.", v:"partial", fb:"Shape matters, but the boundary layer and separation are what actually govern drag." } ] },
        { q:"How does a wing generate lift, in Prandtl's account?", o:[
          { t:"By turning the airflow and setting up a pressure difference across its surfaces.", v:"expert", fb:"Lift is the pressure difference from the wing deflecting the flow." },
          { t:"By a hidden reaction unrelated to the air, so a sudden loss of lift suggests foul play.", v:"danger", fb:"Lift is pure aerodynamics; losing it points to the flow, not to sabotage." },
          { t:"By trapping a cushion of still air beneath it that physically holds the aircraft aloft.", v:"wrong", fb:"There is no trapped cushion; lift comes from pressure differences in moving air." },
          { t:"By moving fast enough that raw momentum carries it, with wing shape being irrelevant.", v:"partial", fb:"Speed matters, but the wing's shape and angle are what convert it to lift." } ] },
        { q:"Why does Prandtl's rigor help a board resist a sensational cause?", o:[
          { t:"Because lift and its loss follow measurable causes an investigator can trace step by step.", v:"expert", fb:"Traceable physics is the antidote to guessing at a lurid cause." },
          { t:"Because it proves a clear-air loss of lift can only result from a deliberate attack.", v:"danger", fb:"It proves nothing of the kind; loss of lift is usually ordinary aerodynamics." },
          { t:"Because it shows aerodynamics is unknowable, so any cause is as good as any other.", v:"wrong", fb:"Prandtl made aerodynamics knowable, not unknowable." },
          { t:"Because it lets you rule out the wing entirely and study only the engines every time.", v:"partial", fb:"It informs the wing analysis; it does not let you skip it." } ] }
      ] },
    // cell: Controller Diaz @ The Wreckage & Recorders
    stall:{ sci:"Otto Lilienthal (1848-1896)", topic:"Angle of attack & the stall", lede:"The 'Glider King' who logged two thousand flights from a hill of his own making — and died proving how fast a wing can quit.", no:2,
      profile:"Otto Lilienthal was the first person to make repeated, well-documented, controlled flights, and the first whose data and photographs could inspire others — the Wright brothers among them. A German engineer, he studied bird flight for decades and published 'Birdflight as the Basis of Aviation' in 1889, in which he measured the lift and drag of curved (cambered) wings and showed that arched surfaces vastly outperform flat plates. He built a series of gliders and launched himself from hills, including an artificial cone he heaped up near Berlin, making roughly two thousand flights.\n\nLilienthal understood, viscerally, the concept at the center of this case: angle of attack. A wing flies because it meets the oncoming air at a modest angle; increase that angle too far and the smooth flow over the top separates, lift collapses, and the wing stalls. He steered his gliders by swinging his body to shift his weight, which worked until it didn't. In August 1896 a gust pitched his glider nose-high; it stalled, he could not recover, and he fell, dying the next day. His reported last words: 'Sacrifices must be made.'\n\nFor this board, Lilienthal is the ghost at the table. A stall is not sabotage; it is geometry — too high an angle of attack for the speed. Modern airliners carry sensors and automatic systems precisely to sense that angle and protect against it. So the investigator must ask: what was the angle of attack, what was the aircraft told it was, and what did the aircraft do in response? A stall, real or falsely sensed, can look exactly like a plane fighting for its life.",
      frame:"Diaz's voice drops. \"I've heard a stall warning over the radio and a crew who couldn't out-argue it. Before I trust you with what I heard, tell me what a stall really is.\"",
      q:[
        { q:"What is the angle of attack?", o:[
          { t:"The angle between the wing and the oncoming air, which sets how much lift it makes.", v:"expert", fb:"Angle of attack is wing-to-airflow, and it governs lift up to the stall." },
          { t:"The angle between the nose and the horizon, read straight off the artificial horizon.", v:"wrong", fb:"That is pitch attitude; angle of attack is measured against the airflow." },
          { t:"The steepness of the climb the pilot has chosen, set by how hard the engines push.", v:"wrong", fb:"Climb angle is set by lift and thrust; it is not the angle of attack." },
          { t:"The bank angle in a turn, which is what decides the moment a wing will stall.", v:"partial", fb:"Bank raises the stall speed, but the stall itself is fixed by angle of attack." } ] },
        { q:"What happens in an aerodynamic stall?", o:[
          { t:"Airflow over the wing separates past a critical angle and lift drops away sharply.", v:"expert", fb:"Separation past the critical angle is the stall, and lift collapses." },
          { t:"The wings physically shed structure, which on a new jet points to a planted charge.", v:"danger", fb:"A stall is loss of lift, not structural failure; nothing has exploded." },
          { t:"The engines flame out from lack of air, while the wing keeps flying until fuel runs low.", v:"wrong", fb:"A stall is about the wing's airflow, not the engines." },
          { t:"The aircraft simply drops below a fixed speed, whatever angle the wing meets the air at.", v:"partial", fb:"Stall tracks angle of attack, not a single fixed speed." } ] },
        { q:"Why does a stall matter to how we read this crash?", o:[
          { t:"Because a false high-angle signal can trigger protection against a stall that isn't real.", v:"expert", fb:"A bad angle-of-attack reading is exactly the thread this case pulls on." },
          { t:"Because only an onboard blast could pitch a certified airliner into a stall from cruise.", v:"danger", fb:"A wrongly sensed stall needs no blast at all — just one faulty vane." },
          { t:"Because a stall proves the crew stopped flying and simply let the aircraft fall down.", v:"wrong", fb:"A crew can be fighting an automatic command and still be flying hard." },
          { t:"Because stalls happen only near the ground, so a cruising jet is immune to them.", v:"partial", fb:"Any wing can be stalled at any altitude if the angle gets too high." } ] }
      ] },
    // cell: Mechanic Rao @ The Wreckage & Recorders
    drag:{ sci:"Frederick Lanchester (1868-1946)", topic:"Drag & circulation", lede:"The English engineer who built the first British motorcar and, on the side, worked out why wings trail invisible whirlwinds.", no:3,
      profile:"Frederick Lanchester was a British polymath — automobile pioneer, engineer, and self-taught aerodynamicist — who arrived at a circulation theory of lift years before it was accepted. Working largely alone around 1897 to 1907, he proposed that a lifting wing sets up a circulation of air around it and trails vortices from its tips, and that these trailing vortices are the price of lift: they create what we now call induced drag. His ideas, published in 'Aerodynamics' in 1907, were dismissed in Britain but later formalized by Prandtl in Germany, so the result is often called the Lanchester-Prandtl theory.\n\nLanchester's picture explains why real, finite wings behave as they do. A wing generates lift by bending the air; at the tips, high-pressure air below spills up toward the low-pressure region above, rolling into vortices that stream behind the aircraft. This wake is why aircraft must be spaced on approach, and why longer, more slender wings (higher aspect ratio) are more efficient — they leak less at the tips. Total drag is thus the drag from skin friction and shape plus this induced drag that comes bundled with lift itself.\n\nFor this board, Lanchester teaches that an airliner's behavior in normal flight is thoroughly predictable. Its drag, its wake, and its glide are known quantities. When something departs from that predictability — a sudden, repeated nose-down that no gust or wake explains — the anomaly is a clue, not a mystery. Before an investigator entertains a bomb, they should account for the ordinary forces first. Most crashes are not exotic; they are the ordinary physics of flight interrupted by something hidden.",
      frame:"Rao wipes his hands. \"Normal flight is no mystery to me — every rivet behaves. Show me you know the ordinary forces, and I'll point at what wasn't ordinary.\"",
      q:[
        { q:"What is induced drag?", o:[
          { t:"The drag that comes with making lift, caused by vortices trailing off the wingtips.", v:"expert", fb:"Induced drag is the unavoidable price of lift, born at the tips." },
          { t:"The drag from air rubbing the skin, which grows only with the wetted surface area.", v:"wrong", fb:"That is skin-friction drag, a separate part of the total." },
          { t:"The drag added by the engine intakes, entirely separate from what the wing does.", v:"wrong", fb:"Induced drag comes from the wing's own lift, not the intakes." },
          { t:"The drag from a blunt fuselage, which dominates at every speed the aircraft flies.", v:"partial", fb:"Form drag matters, but induced drag is specifically the cost of lift." } ] },
        { q:"Why are long, slender wings more efficient?", o:[
          { t:"They lose less air over the tips, so they trail weaker vortices and less induced drag.", v:"expert", fb:"Higher aspect ratio means weaker tip vortices and lower induced drag." },
          { t:"They flex much more, and that flexing is what quietly tears new airframes apart.", v:"danger", fb:"Flex is a design concern, not the reason slender wings are efficient." },
          { t:"They weigh far less than short wings, so the engines need much less thrust to hold speed.", v:"wrong", fb:"Long wings often weigh more; their edge is reduced induced drag." },
          { t:"They cut skin friction to almost nothing, which is the whole source of their advantage.", v:"partial", fb:"The gain is in induced drag; skin friction can even rise with span." } ] },
        { q:"What does predictable drag tell an accident board?", o:[
          { t:"Normal flight is well understood, so a sharp departure from it is a clue worth tracing.", v:"expert", fb:"Deviation from predictable physics is where the real cause hides." },
          { t:"Any wake behind the jet must have come from a second aircraft sent to bring it down.", v:"danger", fb:"A jet trails its own wake; no phantom attacker is implied." },
          { t:"Drag can never be calculated ahead of time, so unexplained motion is always expected.", v:"wrong", fb:"Drag is highly predictable, which is exactly why anomalies stand out." },
          { t:"Drag alone fixes the cause of every crash, so the wake settles the whole inquiry.", v:"partial", fb:"Drag helps rule things in or out; it rarely closes a case by itself." } ] }
      ] },
    // cell: Mechanic Rao @ The Wreckage & Recorders
    stability:{ sci:"George Cayley (1773-1857)", topic:"Stability & the forces of flight", lede:"The Yorkshire baronet who, a century before the Wrights, named the four forces of flight and sent his coachman soaring.", no:4,
      profile:"Sir George Cayley is often called the father of aeronautics. Working in Yorkshire across six decades, he was the first to identify the four forces acting on a flying machine — lift, weight, thrust, and drag — and to separate the job of making lift from the job of propulsion, breaking with the flapping-wing tradition of the day. He grasped that a fixed cambered wing could provide lift while a separate means provided thrust, which is the basic layout of every airplane since.\n\nCayley also understood stability. He recognized the value of dihedral — wings angled upward in a shallow V — for keeping an aircraft level, and the need for a tail with surfaces to control pitch and yaw. He tested ideas with a whirling-arm apparatus and model gliders, and in 1853 he reportedly built a glider that carried his reluctant coachman across a valley, one of the first heavier-than-air flights with a person aboard. He set out his findings in 'On Aerial Navigation' (1809-1810), a founding document of the field.\n\nFor this board, Cayley frames the central question. A well-designed aircraft is stable: disturb it, and it tends to return to steady flight on its own. So when a modern airliner repeatedly pitches its nose down and will not settle, the investigator must ask what is overriding that built-in stability. Weight and lift balanced, tail doing its job — a stable aircraft does not simply dive. Something must be commanding it to. That something is either a person, a failure, or a system doing exactly what it was designed to do with the wrong information.",
      frame:"Rao sets down his wrench. \"A good airplane flies itself straight. This one wouldn't. Tell me what stability means before I tell you what I saw.\"",
      q:[
        { q:"What are Cayley's four forces of flight?", o:[
          { t:"Lift, weight, thrust, and drag — the balance every aircraft in flight must strike.", v:"expert", fb:"Those four are Cayley's enduring framework for analyzing flight." },
          { t:"Lift, spin, heat, and pressure, the quantities a pilot trims against in steady cruise.", v:"wrong", fb:"Those are not the four forces; it is lift, weight, thrust, and drag." },
          { t:"Thrust, camber, yaw, and roll, the four settings a designer fixes before any flight.", v:"wrong", fb:"Camber, yaw, and roll are not forces; the four forces are the classic set." },
          { t:"Lift and weight only, since thrust and drag are really just versions of those two.", v:"partial", fb:"All four are distinct; thrust and drag are not sub-cases of lift and weight." } ] },
        { q:"What does dihedral (upswept wings) provide?", o:[
          { t:"A tendency to roll back level after a disturbance, improving stability.", v:"expert", fb:"Dihedral gives roll stability, righting the aircraft on its own." },
          { t:"A hidden weakness at the wing root that lets a small charge fold the wing.", v:"danger", fb:"Dihedral is a stability feature, not a structural vulnerability." },
          { t:"Extra lift at every speed, which is why heavy jets sweep their wings sharply up.", v:"wrong", fb:"Dihedral is about stability, not a general boost in lift." },
          { t:"Faster rolling into turns, which is the only reason designers ever angle the wings.", v:"partial", fb:"Dihedral actually resists roll; its purpose is stability, not agility." } ] },
        { q:"What follows if a stable airliner keeps pitching nose-down?", o:[
          { t:"Something is overriding its natural tendency to settle, and that cause must be found.", v:"expert", fb:"A stable aircraft does not dive on its own — something is commanding it." },
          { t:"Only a detonation could defeat the stability built into a modern certified jet.", v:"danger", fb:"A control command, not a blast, can override stability just as easily." },
          { t:"The aircraft was never stable to begin with, so no real explanation is required.", v:"wrong", fb:"Certified airliners are stable; the override is what needs explaining." },
          { t:"The crew simply stopped trimming, and nothing beyond their inattention needs a look.", v:"partial", fb:"Loss of trim is possible, but a repeated nose-down suggests an active command." } ] }
      ] },
    // cell: The Whistleblower @ The Wreckage & Recorders
    controls:{ sci:"The Wright Brothers (1867-1912 / 1871-1948)", topic:"Three-axis flight control", lede:"Two bicycle makers from Dayton who cracked the problem everyone else ignored: not lift or power, but control.", no:5,
      profile:"Wilbur (1867-1912) and Orville (1871-1948) Wright achieved the first sustained, controlled, powered flight on December 17, 1903, at Kitty Hawk. Their decisive insight was that the unsolved problem of flight was not lift or engines but control — keeping a machine balanced and steerable in three dimensions. Where others chased inherent stability, the Wrights embraced an aircraft the pilot actively controlled about all three axes: pitch (nose up and down), roll (wings banking), and yaw (nose swinging left and right).\n\nThey achieved roll with wing-warping — twisting the wingtips to raise one side and lower the other — and paired it with a movable rudder to coordinate turns, having learned that roll and yaw must be managed together to avoid a spin. A forward elevator controlled pitch. Crucially, they built their own wind tunnel in 1901 to correct the flawed lift data of the era, tested some two hundred wing shapes, and taught themselves to fly gliders before adding an engine. Their patent covered this system of three-axis control, the ancestor of every yoke and sidestick since.\n\nFor this board, three-axis control is the frame for the whole case. Pitch is commanded by moving a horizontal surface — an elevator, or a movable stabilizer trim. The question the investigator must answer is who or what was moving that surface in the final minutes: the crew pulling back, or an automatic system trimming the nose down. Modern aircraft let software move the same surfaces the Wrights first mastered. When the nose keeps dropping, the recorders can show whether human hands or an automatic command were winning the fight for the pitch axis.",
      frame:"The whistleblower studies you. \"The whole case turns on who was moving the nose. Show me you understand flight control, and I'll tell you what the system did.\"",
      q:[
        { q:"What was the Wrights' key contribution?", o:[
          { t:"Active three-axis control — managing pitch, roll, and yaw — as the core problem of flight.", v:"expert", fb:"Control about all three axes was their true breakthrough." },
          { t:"The first engine light enough to fly, which is what every prior attempt had lacked.", v:"wrong", fb:"Others had engines; the Wrights solved control, not power." },
          { t:"The cambered wing itself, an idea no earlier experimenter had ever thought to try.", v:"wrong", fb:"Cambered wings predate them; their gift was three-axis control." },
          { t:"Inherent stability so strong the machine needed no pilot input once it was airborne.", v:"partial", fb:"They chose active control over inherent stability, not the reverse." } ] },
        { q:"How did the Wrights control roll?", o:[
          { t:"By warping the wingtips to raise one side and lower the other, coordinated with rudder.", v:"expert", fb:"Wing-warping plus rudder was their roll-and-yaw solution." },
          { t:"By shifting a heavy weight in the wing, a mechanism prone to jamming and sudden failure.", v:"danger", fb:"They warped the wing's shape; there was no sliding mass." },
          { t:"By speeding up one propeller to drag that wing forward and bank the aircraft over.", v:"wrong", fb:"Differential thrust was not their method; they warped the wing." },
          { t:"By the rudder alone, which is all that is ever needed to roll an aircraft into a turn.", v:"partial", fb:"Rudder yaws; roll came from wing-warping, coordinated with it." } ] },
        { q:"Why does the pitch axis matter to this crash?", o:[
          { t:"Because the recorders can reveal whether crew or an automatic command moved the nose down.", v:"expert", fb:"The pitch trace is where human input and automation can be told apart." },
          { t:"Because only a bomb in the tail could move the pitch surfaces without any pilot input.", v:"danger", fb:"Software moves those surfaces routinely; no blast is required." },
          { t:"Because pitch is controlled by the throttles, so it points straight to an engine failure.", v:"wrong", fb:"Pitch is set by elevator and stabilizer, not by the throttles." },
          { t:"Because pitch is set once before takeoff and never changes, so it can be set aside.", v:"partial", fb:"Pitch is trimmed continuously in flight; it is central here, not fixed." } ] }
      ] },
    // cell: The Whistleblower @ The Wreckage & Recorders
    loadfactor:{ sci:"Max Munk (1890-1986)", topic:"Aerodynamic & gust loads", lede:"Prandtl's brilliant, prickly protégé who brought thin-airfoil theory to America and reckoned the loads a wing must bear.", no:6,
      profile:"Max Munk was a German-American aerodynamicist, a doctoral student of Ludwig Prandtl, who emigrated to the United States and shaped early NACA research in the 1920s. He is best known for thin-airfoil theory, which predicts the lift and pitching moment of a wing section from its shape, and for conceiving the variable-density wind tunnel, which let engineers test models at realistic conditions by pressurizing the air — a major advance in getting trustworthy load data.\n\nMunk's mathematics gave designers a way to calculate the aerodynamic loads a wing actually carries and how they are distributed along it. This matters because a structure is built to a load factor — the ratio of the lift it carries to the weight it supports, measured in 'g.' In steady level flight the load factor is one; in a sharp pull-up or a strong gust it climbs, and the wing must withstand that multiplied force. Airliners are certified to specific limit and ultimate load factors, with margins, so that maneuvers and turbulence within the flight envelope never overstress the structure.\n\nFor this board, load factor separates a structural story from a control story. A bomb or a catastrophic overload would leave the signature of forces beyond the design envelope — the airframe failing under load. But if the recorders show the aircraft repeatedly pushed nose-down within its structural limits, then the airframe never failed; it did as it was commanded. Munk's numbers let the board check whether the aircraft was torn apart by force or flown into the ground intact. That single distinction points toward, or away from, the sensational answer.",
      frame:"The whistleblower speaks carefully. \"People assume it was torn apart. The numbers say otherwise. Prove you can read loads, and I'll trust you with the rest.\"",
      q:[
        { q:"What is load factor?", o:[
          { t:"The ratio of the lift being carried to the aircraft's weight, expressed in g.", v:"expert", fb:"Load factor is lift over weight, and it spikes in pull-ups and gusts." },
          { t:"The total cargo and passenger mass loaded aboard before the aircraft leaves the gate.", v:"wrong", fb:"That is payload; load factor is an in-flight ratio of forces." },
          { t:"The fraction of engine thrust spent to climb, which rises steeply in any hard pull-up.", v:"wrong", fb:"Load factor is about lift versus weight, not thrust." },
          { t:"The number of flights flown per hour, which is what fatigues an airframe over its life.", v:"partial", fb:"Cycle count drives fatigue; load factor is a force ratio, not a tally." } ] },
        { q:"What was Munk's variable-density tunnel for?", o:[
          { t:"Pressurizing the air so small models behave like full-size wings, giving true load data.", v:"expert", fb:"Raising density matched real conditions and yielded trustworthy loads." },
          { t:"Testing explosives against wing panels to see how much charge a spar could survive.", v:"danger", fb:"It was for aerodynamic load data, not blast testing." },
          { t:"Chilling the air to freezing so engineers could study icing on the leading edge.", v:"wrong", fb:"That is an icing tunnel; Munk's raised air density, not lowered temperature." },
          { t:"Running models faster than sound, the only regime where real load data can be gotten.", v:"partial", fb:"It worked at ordinary speeds; its trick was density, not supersonic flow." } ] },
        { q:"How does load factor help read this crash?", o:[
          { t:"If loads stayed within limits, the airframe never failed — it was flown down intact.", v:"expert", fb:"Loads inside the envelope point to a control cause, not a breakup." },
          { t:"Any load above one g proves a blast, since level flight can never exceed that figure.", v:"danger", fb:"Ordinary maneuvers and gusts exceed one g; that is no sign of a bomb." },
          { t:"Load factor rises only on the ground, so it tells the board nothing about the flight.", v:"wrong", fb:"Load factor is fundamentally an in-flight quantity." },
          { t:"A high load factor always means pilot error, closing the case on the crew at once.", v:"partial", fb:"High g can come from gusts or systems too; it does not alone blame the crew." } ] }
      ] },
    // cell: Controller Diaz @ The Airline Maintenance Hangar
    fatigue:{ sci:"Arnold Hall (1915-2000)", topic:"Metal fatigue & the Comet inquiry", lede:"The scientist handed a fleet of grounded jets and one question: why do brand-new Comets keep falling into the sea?", no:7,
      profile:"Sir Arnold Hall was director of the Royal Aircraft Establishment at Farnborough when, in 1954, two de Havilland Comets — the world's first jet airliners — broke up in flight over the Mediterranean within months of each other. With no obvious cause and a nation's pride at stake, Hall led one of the most rigorous accident investigations ever mounted. Rather than guess, he had a Comet fuselage repeatedly pressurized and depressurized inside a giant water tank, simulating thousands of flights.\n\nThe tank test cracked the case. After the equivalent of a few thousand cycles, the fuselage failed by metal fatigue — cracks that began at the corner of a window-shaped opening, where stress concentrated, and grew a little with each pressurization until the structure tore. The nearly square windows and a rivet hole had created stress raisers no one had appreciated. Hall's team also recovered wreckage from the seabed and matched the failure to the tank result. The lesson reshaped engineering: fatigue is a cumulative, hidden process, and stress concentrations must be designed out.\n\nFor this board, Hall is the model investigator. He faced enormous pressure to name a cause fast, and a public half-ready to blame sabotage. He refused to speculate and instead reproduced the failure experimentally, letting the structure confess. He also showed that a brand-new, celebrated aircraft can carry a fatal flaw its makers never saw — or, in other cases, chose not to see. When this board is tempted by the quick and lurid answer, Hall's water tank is the reminder: build the test that forces the truth into the open.",
      frame:"Diaz leans on an airframe jig. \"New metal, old failure — it's happened before. Prove you know how metal quits, and I'll tell you what this fleet was doing.\"",
      q:[
        { q:"What is metal fatigue?", o:[
          { t:"Cracks that grow a little with each load cycle until the structure finally fails.", v:"expert", fb:"Fatigue is cumulative cracking under repeated loading." },
          { t:"A gradual rusting of the metal that eats an airframe from its surface inward.", v:"wrong", fb:"That is corrosion; fatigue is cracking driven by cyclic stress." },
          { t:"A sudden softening of the metal when it is heated by fast flight through the air.", v:"wrong", fb:"That is thermal weakening; fatigue is a mechanical, cyclic process." },
          { t:"A one-time overload that snaps a part the very first time it is stressed at all.", v:"partial", fb:"That is a single overload failure; fatigue needs many repeated cycles." } ] },
        { q:"What did Hall's water-tank test reveal about the Comet?", o:[
          { t:"Fatigue cracks starting at a window corner, where stress concentrated, then spreading.", v:"expert", fb:"The window-corner stress raiser was the origin of the failure." },
          { t:"Traces of a smuggled device, confirming the sabotage the public already suspected.", v:"danger", fb:"There was no device; the cause was fatigue, found by testing." },
          { t:"That the engines had ingested seawater on climb-out, flooding and stalling in turn.", v:"wrong", fb:"The failure was structural fatigue, not an engine event." },
          { t:"That the wings flexed too far in cruise, a flutter problem unrelated to the cabin.", v:"partial", fb:"The failure was pressurization fatigue of the fuselage, not wing flutter." } ] },
        { q:"What does Hall's method teach this board?", o:[
          { t:"Reproduce the failure and let the evidence decide, rather than name a lurid cause fast.", v:"expert", fb:"Testing to confession is the discipline that resists sensational guesses." },
          { t:"When a new jet falls, assume sabotage first, since fatigue is far too slow to blame.", v:"danger", fb:"Hall did the opposite: he refused to assume and tested instead." },
          { t:"Recover no wreckage and rely on witness accounts, which settle most crashes cleanly.", v:"wrong", fb:"Hall prized physical evidence; witnesses rarely settle a technical cause." },
          { t:"Trust the maker's own analysis, since the designer always knows the airframe best.", v:"partial", fb:"Independent testing exists precisely because makers can miss or hide flaws." } ] }
      ] },
    // cell: Controller Diaz @ The Airline Maintenance Hangar
    flutter:{ sci:"Theodore von Kármán (1881-1963)", topic:"Aeroelastic flutter", lede:"The Caltech genius who read the whirlpools behind a bluff body and the tremor that can shake a wing to pieces.", no:8,
      profile:"Theodore von Kármán was a Hungarian-American engineer and one of the towering figures of aerodynamics, a student of Prandtl who led Caltech's aeronautics laboratory and helped found the Jet Propulsion Laboratory. His name is attached to the Kármán vortex street — the regular pattern of alternating vortices shed behind a bluff body in a flow — which explains phenomena from singing wires to the oscillation that helped destroy the Tacoma Narrows Bridge in 1940.\n\nVon Kármán advanced the study of aeroelasticity: the interaction between aerodynamic forces and a structure's elastic flexing. The most dangerous form is flutter, a self-feeding vibration in which airflow pumps energy into a wing's natural bending and twisting. Below a critical speed the motion damps out; above it, the oscillation grows with each cycle until the structure can fail in seconds. Designers must ensure the flutter speed lies safely beyond the aircraft's maximum, using mass balancing, stiffness, and both wind-tunnel and flight testing to prove the margin.\n\nFor this board, flutter is a hypothesis to test and, likely, to rule out. Flutter destroys structure violently and leaves distinctive evidence — twisted spars, a wing or tail shed in flight, a rising vibration on the recorders. If instead the aircraft descended under a repeated, deliberate pitch command with the airframe intact, flutter is not the story. Von Kármán's discipline is to name each failure mode's signature and check the wreckage and data against it. Ruling a cause out cleanly is as valuable as ruling one in, and it keeps a board honest against the pull to guess.",
      frame:"Diaz eyes the wreckage. \"Some breakups are the wing shaking itself apart. I need to know you can tell that from what I heard. Convince me.\"",
      q:[
        { q:"What is aeroelastic flutter?", o:[
          { t:"A self-feeding vibration where airflow pumps energy into a structure's own flexing.", v:"expert", fb:"Flutter is aerodynamics feeding a structure's natural oscillation." },
          { t:"A buffeting felt only in turbulence, which fades the moment the rough air is left.", v:"wrong", fb:"That is turbulence buffet; flutter is a self-sustaining instability." },
          { t:"A vibration from an unbalanced engine that shakes the airframe while at ground idle.", v:"wrong", fb:"That is engine vibration; flutter is an aeroelastic phenomenon of flight." },
          { t:"A gentle flexing of the wing in gusts that stays harmless at every airspeed flown.", v:"partial", fb:"Below its critical speed flexing is benign; above it, flutter turns deadly." } ] },
        { q:"How do designers guard against flutter?", o:[
          { t:"By keeping the flutter speed safely above the aircraft's maximum, proven by testing.", v:"expert", fb:"A margin between flutter speed and top speed, verified by test, is the guard." },
          { t:"By armoring the spars so a blast cannot start the vibration that tears a wing off.", v:"danger", fb:"Flutter is not blast-triggered; the defense is stiffness and mass balance." },
          { t:"By flying slowly at all times, since flutter can strike at any speed without warning.", v:"wrong", fb:"Flutter has a critical speed; below it the motion damps out." },
          { t:"By adding fuel in the wings, whose weight alone is enough to stop any oscillation.", v:"partial", fb:"Mass balancing helps, but it must be engineered, not just fuel load." } ] },
        { q:"How would the board treat flutter here?", o:[
          { t:"As a testable hypothesis, ruled out if the airframe stayed intact under control.", v:"expert", fb:"Flutter has a signature; an intact, commanded descent rules it out." },
          { t:"As proof of a bomb, since only an explosion can start a wing vibrating in cruise.", v:"danger", fb:"Flutter is aerodynamic, not a sign of a blast." },
          { t:"As irrelevant, because flutter is a myth that modern aircraft have long outgrown.", v:"wrong", fb:"Flutter is real and still designed against on every aircraft." },
          { t:"As the certain cause, since any unexplained jet breakup is flutter by default.", v:"partial", fb:"Flutter is one candidate among several, not a default answer." } ] }
      ] },
    // cell: Mechanic Rao @ The Airline Maintenance Hangar
    automation:{ sci:"Earl Wiener (1933-2013)", topic:"Automation & the human factor", lede:"The human-factors scientist who warned that the smartest cockpit computer can be the one that surprises a crew to death.", no:9,
      profile:"Earl Wiener was an American human-factors researcher whose studies of cockpit automation reshaped how engineers and airlines think about the relationship between pilots and machines. As jets grew more automated in the 1980s, Wiener documented a paradox: automation reduces workload when things are calm but can sharply increase it at the worst moments, when a crew must suddenly work out what the automation is doing and why. He described 'clumsy automation' and cataloged 'automation surprises' — moments when the aircraft does something the pilots did not expect and cannot immediately explain.\n\nWiener is remembered for 'Wiener's Laws,' a set of wry aphorisms about automated flight, including the observation that digital devices tune out small errors while creating openings for large ones, and that every automated system raises the questions 'What is it doing now? Why is it doing that? What will it do next?' His central point was not that automation is bad but that designers must keep the human informed and in command, because a crew that does not understand the system cannot supervise it.\n\nFor this board, Wiener is close to the heart of the matter. If an automatic system moved the aircraft's nose based on faulty data, and the crew was neither told the system existed nor trained to recognize and defeat it, then calling the outcome 'pilot error' mistakes the symptom for the cause. Wiener would ask what the crew could have known and done in the seconds they had. An automation surprise designed into the aircraft, and hidden from those flying it, is a failure of the machine and its makers first.",
      frame:"Rao turns the sensor over in his hand. \"The computer was smarter than the crew was allowed to be. Show me you get automation, and I'll show you the logbook.\"",
      q:[
        { q:"What did Wiener mean by 'clumsy automation'?", o:[
          { t:"Automation that eases calm moments but adds workload when the crew can least afford it.", v:"expert", fb:"Clumsy automation shifts effort to the worst possible moment." },
          { t:"Automation so slow to respond that the pilots always hand-fly the aircraft instead.", v:"wrong", fb:"The issue is not sluggishness but where it dumps workload." },
          { t:"Cockpit controls placed so poorly that the crew cannot reach the switches in time.", v:"wrong", fb:"That is a control-layout problem, not clumsy automation." },
          { t:"Any automatic system at all, since Wiener held automation only ever does harm.", v:"partial", fb:"Wiener valued automation; he warned about designing it badly." } ] },
        { q:"What questions did Wiener say automation forces on a crew?", o:[
          { t:"What is it doing now, why is it doing that, and what will it do next?", v:"expert", fb:"Those three questions capture the burden of supervising automation." },
          { t:"Whether the aircraft has been seized remotely by someone on the ground.", v:"danger", fb:"Wiener's concern was understanding the system, not hijacking." },
          { t:"How much fuel remains and whether the destination weather has changed.", v:"wrong", fb:"Those are routine tasks, not Wiener's automation questions." },
          { t:"Which checklist to read, since automation only ever adds paperwork to the job.", v:"partial", fb:"Automation adds monitoring, not merely paperwork; the questions are about intent." } ] },
        { q:"How does Wiener reframe an 'automation surprise' crash?", o:[
          { t:"A system acting on bad data, with an uninformed crew, is a machine failure first.", v:"expert", fb:"Undisclosed automation on bad data is a design failure, not just crew error." },
          { t:"A surprising cockpit event is the fingerprint of a hijacker feeding false commands.", v:"danger", fb:"A surprise usually means poor design, not an intruder." },
          { t:"Any surprise proves the crew ignored training and is solely at fault for the loss.", v:"wrong", fb:"You cannot train for a system you were never told existed." },
          { t:"Automation is flawless, so a surprise must trace to a mechanical break elsewhere.", v:"partial", fb:"Automation surprises are often the automation itself behaving as designed." } ] }
      ] },
    // cell: Mechanic Rao @ The Airline Maintenance Hangar
    accidentchain:{ sci:"James Reason (human-error researcher)", topic:"The accident chain & the Swiss-cheese model", lede:"The psychologist who drew disaster as a stack of Swiss cheese, and showed the holes must line up before anyone dies.", no:10,
      profile:"James Reason is a British psychologist whose work transformed how industries understand accidents. In his 1990 book 'Human Error' and later writing, he argued that major failures in complex systems are rarely the fault of a single careless person. Instead they result from a chain of smaller failures that must line up. His famous Swiss-cheese model pictures an organization's defenses as slices of cheese stacked together: each slice has holes — weaknesses — and an accident happens only when holes in every slice momentarily align, letting a hazard pass all the way through.\n\nReason distinguished 'active failures' — the unsafe acts at the sharp end, like a pilot's mistake — from 'latent conditions,' the hidden weaknesses built in long before by designers, managers, and regulators. Latent conditions can lie dormant for years: a flawed design decision, a gap in training, a certification shortcut, a maintenance procedure that invites error. When an active failure finally occurs, these latent holes let it become a catastrophe. Blaming only the person at the sharp end, he argued, leaves the deeper holes open for the next crew.\n\nFor this board, Reason is the antidote to both traps. 'Terrorism' imagines a single malevolent cause; 'pilot error' imagines a single careless one. Reason insists on the chain: a faulty sensor, a hidden automatic system, absent training, a certification signed under schedule pressure, and a crew given seconds to solve a puzzle they were never handed. Each hole alone might have been survivable. Aligned, they were fatal. The board's job is to map every slice, and to name the latent conditions the makers could have closed, not just the last hand on the controls.",
      frame:"Rao shakes his head. \"Everyone wants one villain. It's never one thing. Prove you understand how failures stack up, and I'll walk you through mine.\"",
      q:[
        { q:"What does the Swiss-cheese model say about accidents?", o:[
          { t:"They happen when holes in many layers of defense line up at the same moment.", v:"expert", fb:"Aligned holes across the defenses are the essence of the model." },
          { t:"They trace to one decisive error a single competent person could have stopped.", v:"wrong", fb:"The model rejects the single-cause story for complex systems." },
          { t:"They are random events that no amount of system design can ever hope to prevent.", v:"wrong", fb:"The model is about designed defenses and their gaps, not pure chance." },
          { t:"They come from worn-out equipment, so replacing parts on time removes all the risk.", v:"partial", fb:"Maintenance is one slice; the model spans design, training, and management too." } ] },
        { q:"What is a 'latent condition' in Reason's model?", o:[
          { t:"A hidden weakness built in earlier by designers, managers, or regulators.", v:"expert", fb:"Latent conditions are the dormant flaws upstream of the sharp end." },
          { t:"A dormant explosive device waiting for the moment to bring an aircraft down.", v:"danger", fb:"A latent condition is an organizational weakness, not a planted bomb." },
          { t:"A pilot's split-second slip at the controls in the final moments of a flight.", v:"wrong", fb:"That is an active failure; latent conditions are the hidden setup." },
          { t:"A weather hazard that appears without warning and defeats any preparation.", v:"partial", fb:"Weather is a trigger; latent conditions are built-in system weaknesses." } ] },
        { q:"How does Reason's model treat 'terrorism' and 'pilot error'?", o:[
          { t:"As single-cause stories that ignore the chain of aligned failures behind a crash.", v:"expert", fb:"Both traps collapse a chain into one villain; Reason resists that." },
          { t:"As the only two explanations, since every crash is either a bomb or a bad pilot.", v:"danger", fb:"That false binary is exactly what the Swiss-cheese model dismantles." },
          { t:"As equally proven, so the board should simply pick whichever is easier to file.", v:"wrong", fb:"Neither is proven; the model demands mapping the whole chain." },
          { t:"As latent conditions themselves, making them the deepest holes in every case.", v:"partial", fb:"They are simplistic conclusions, not latent conditions in the model." } ] }
      ] },
    // cell: The Whistleblower @ The Airline Maintenance Hangar
    propulsion:{ sci:"Frank Whittle (1907-1996)", topic:"The jet engine", lede:"The RAF cadet who patented the jet engine at twenty-three, and waited a decade for anyone to believe him.", no:11,
      profile:"Sir Frank Whittle was a Royal Air Force officer and engineer who invented the turbojet engine in Britain, patenting the concept in 1930 while still in his early twenties. His idea was elegant: instead of a propeller clawing at the air, draw air into a compressor, mix it with fuel and burn it, and let the hot, high-pressure gas rush out through a turbine that drives the compressor — thrust from the jet of exhaust. For years he struggled for funding and belief, but his company Power Jets ran the first British turbojet in 1937, and the Gloster E.28/39 flew on his engine in 1941.\n\nThe turbojet, and its efficient descendant the turbofan, made the modern airliner possible: smooth, reliable, high-altitude flight at speeds no propeller could match. A jet engine is, in normal operation, extraordinarily dependable, and it announces its failures — a flameout, a compressor stall, an uncontained turbine burst, a fire — with clear signatures on instruments, in performance, and in the wreckage. Engines are among the most monitored and best-understood systems on any aircraft.\n\nFor this board, propulsion is a line of inquiry to be checked and, most likely, cleared. If the recorders show both engines producing commanded thrust to the end, then engine failure did not bring the aircraft down, and neither did a blast in a nacelle. Ruling the engines out sharpens the question: an aircraft with good engines, intact structure, and a repeated nose-down command was not felled by power or by a bomb. Whittle's dependable machine, still running, points the board past the engines toward the flight-control system.",
      frame:"The whistleblower glances at the engine stand. \"Everyone suspects the engines first. Show me you know how a jet fails, and I'll help you clear them.\"",
      q:[
        { q:"How does a turbojet make thrust?", o:[
          { t:"It compresses air, burns fuel, and expels hot gas through a turbine as a jet.", v:"expert", fb:"Compress, burn, expand through the turbine — that is the turbojet cycle." },
          { t:"It spins a large propeller very fast, with the burner only there to warm the air.", v:"wrong", fb:"A turbojet's thrust is the exhaust jet, not a propeller." },
          { t:"It heats air in a sealed tank until pressure alone shoves the aircraft forward.", v:"wrong", fb:"The flow is continuous through compressor and turbine, not a sealed tank." },
          { t:"It rams air through a plain open tube, needing no moving parts at low speed.", v:"partial", fb:"That describes a ramjet, which cannot start from rest as a turbojet can." } ] },
        { q:"How do jet engines typically announce failure?", o:[
          { t:"With clear signatures on the instruments, in performance, and in the wreckage.", v:"expert", fb:"Engine failures leave readable traces investigators can find." },
          { t:"With no warning at all, exactly as a hidden charge in the nacelle would behave.", v:"danger", fb:"Real engine faults leave signatures; silence is not their hallmark." },
          { t:"By silently losing thrust in a way that no recorder or gauge can ever capture.", v:"wrong", fb:"Thrust loss is recorded on multiple parameters." },
          { t:"Only by catching fire, since every other fault leaves the engine running fine.", v:"partial", fb:"Fire is one mode; stalls, flameouts, and bursts show up too." } ] },
        { q:"What does it mean if both engines ran to the end?", o:[
          { t:"Neither engine failure nor a nacelle blast brought the aircraft down.", v:"expert", fb:"Running engines clear both the engine and a nacelle-bomb theory." },
          { t:"A bomb must have been placed in the cabin instead, away from the engines.", v:"danger", fb:"Clearing engines does not conjure a cabin bomb; look at the controls." },
          { t:"The crew shut nothing down, which proves they did absolutely nothing wrong.", v:"wrong", fb:"Intact engines say nothing about whether the crew erred." },
          { t:"The fuel was contaminated, which is the only remaining cause worth pursuing.", v:"partial", fb:"Running engines argue against fuel trouble, not for it." } ] }
      ] },
    // cell: The Whistleblower @ The Airline Maintenance Hangar
    pressurization:{ sci:"Geoffrey de Havilland (1882-1965)", topic:"Pressurization & the Comet windows", lede:"The designer whose beautiful Comet gave the world jet travel, and taught it the price of pressurizing thin metal.", no:12,
      profile:"Sir Geoffrey de Havilland was a British aircraft designer and manufacturer whose company produced the Moth trainers, the wartime Mosquito, and the de Havilland Comet — the world's first commercial jet airliner, which entered service in 1952. The Comet flew higher and faster than any airliner before it, and to carry passengers in comfort at those altitudes it had to be pressurized: the cabin held near sea-level air while the thin air outside dropped away, so the fuselage was inflated like a balloon on every flight.\n\nThat pressurization was the hidden hazard. Each climb stretched the fuselage skin and each descent relaxed it, cycling the metal. Around window and hatch openings the stress concentrated, and after a few thousand cycles fatigue cracks grew until two Comets tore apart in 1954. The investigation, led by Arnold Hall's team, traced the failures to fatigue at the corners of openings, and the lessons — rounded windows, fail-safe structure, full-scale fatigue testing — were absorbed into every airliner that followed, including de Havilland's rivals who overtook him.\n\nFor this board, de Havilland's story carries two warnings. First, a brand-new, admired aircraft can hide a fatal flaw invisible in early service and unrelated to any saboteur. Second, the flaw was a consequence of a genuine engineering trade-off, not malice — which is precisely why it took disciplined investigation, not suspicion, to find. If the Ardent 9's failure is structural, the board will see pressurization and fatigue signatures. If instead the fuselage was whole and the nose was driven down by command, the parallel is subtler: a maker who, like the Comet's, may have known more than it revealed in time.",
      frame:"The whistleblower keeps their voice low. \"A pretty new jet can still hide a killer. Show me you understand that, and I'll tell you what we hid.\"",
      q:[
        { q:"Why must a high-flying airliner be pressurized?", o:[
          { t:"To hold near sea-level air inside while the outside air thins with altitude.", v:"expert", fb:"Pressurization keeps breathable air in as ambient pressure falls." },
          { t:"To force fresh fuel vapor through the cabin so the engines burn it cleanly.", v:"wrong", fb:"Cabin air is for people, not fuel delivery." },
          { t:"To press the doors shut, since low outside pressure would blow them open.", v:"wrong", fb:"Doors are plug-type and held by the pressure; that is not the purpose." },
          { t:"To keep the wings rigid, which sag badly without inside air to hold them up.", v:"partial", fb:"Cabin pressure is about occupants, not wing stiffness." } ] },
        { q:"What destroyed the early Comets?", o:[
          { t:"Fatigue cracks at the corners of openings, grown by repeated pressurization.", v:"expert", fb:"Cyclic pressurization plus stress raisers at windows caused the failures." },
          { t:"A concealed device, the sabotage many had suspected from the very first crash.", v:"danger", fb:"There was no device; disciplined testing found metal fatigue." },
          { t:"Engines that flamed out at altitude, leaving the jets to glide into the sea.", v:"wrong", fb:"The cause was structural fatigue, not engine failure." },
          { t:"Wings that flexed past their limit, a flutter fault deep within the structure.", v:"partial", fb:"It was fuselage fatigue from pressurization, not wing flutter." } ] },
        { q:"What warning does the Comet hold for this board?", o:[
          { t:"A new, admired aircraft can hide a fatal flaw with no saboteur involved.", v:"expert", fb:"Novelty and praise do not rule out a built-in, deadly flaw." },
          { t:"Any new jet that crashes was almost certainly brought down by a bomb aboard.", v:"danger", fb:"The Comet showed the opposite — the flaw was in the design." },
          { t:"Makers always find their own flaws early, so investigators can trust them fully.", v:"wrong", fb:"The Comet's makers missed it; independent inquiry found it." },
          { t:"Only old aircraft carry hidden flaws, so a new airframe can be cleared at once.", v:"partial", fb:"The Comet was new; age is no guarantee of safety." } ] }
      ] },
    // cell: Controller Diaz @ The Manufacturer's Design Bay
    balance:{ sci:"Jerome Hunsaker (1886-1984)", topic:"Weight, balance & center of gravity", lede:"The naval officer turned MIT professor who built America's first serious wind tunnel and taught a nation to weigh its aircraft.", no:13,
      profile:"Jerome Hunsaker was a U.S. Navy officer and engineer who founded aeronautical engineering education in America. After studying European aerodynamics, he built one of the first wind tunnels in the United States at MIT around 1914 and established its aeronautics program, training generations of designers. He led naval aircraft and airship development, later chaired the National Advisory Committee for Aeronautics (NACA), and worked across stability, structures, and the practical business of making aircraft fly safely.\n\nCentral to Hunsaker's world is weight and balance. Every aircraft has a center of gravity — the point about which its weight balances — and it must sit within a defined range for the aircraft to be controllable. Load the cargo and passengers too far aft and the aircraft becomes tail-heavy and unstable in pitch; too far forward and it is nose-heavy and sluggish, hard to rotate and to flare. The relationship between the center of gravity and the wing's center of lift sets how the aircraft trims and whether the tail can hold the nose where the pilot wants it.\n\nFor this board, weight and balance is a suspect to interview and, likely, to release. A loading error can cause pitch trouble, so the investigators must confirm the aircraft's center of gravity was within limits — from the load sheet, the cargo, and the recorders. If it was, then an out-of-balance airplane did not cause the repeated nose-down. That clears an innocent explanation and, with it, the crew and the loaders — pushing the inquiry toward a system that commanded the pitch surfaces regardless of a properly balanced aircraft.",
      frame:"Diaz frowns at a load sheet. \"They'll want to blame the loaders. Show me you understand balance before I let you near that theory.\"",
      q:[
        { q:"What is an aircraft's center of gravity?", o:[
          { t:"The point about which its weight balances, which must stay within set limits.", v:"expert", fb:"The CG must lie inside its allowed range for the aircraft to be flyable." },
          { t:"The heaviest single item aboard, usually the fuel, around which it pivots.", v:"wrong", fb:"CG is a balance point of all mass, not the single heaviest item." },
          { t:"The exact middle of the fuselage, fixed by the airframe's overall length.", v:"wrong", fb:"CG depends on how load is distributed, not on geometric center." },
          { t:"The spot where the wings meet the body, which never shifts once built.", v:"partial", fb:"CG moves with loading and fuel burn; it is not fixed at the wing root." } ] },
        { q:"What happens if the load is too far aft?", o:[
          { t:"The aircraft becomes tail-heavy and unstable in pitch, and harder to control.", v:"expert", fb:"An aft CG erodes pitch stability and controllability." },
          { t:"The tail snaps off on rotation, a break easily mistaken for a bomb blast.", v:"danger", fb:"Aft loading upsets balance; it does not shear the tail off." },
          { t:"The engines lose thrust as fuel drains away from their intakes in the back.", v:"wrong", fb:"CG is about balance, not fuel feeding the engines." },
          { t:"Nothing changes in flight, since balance only matters while on the ground.", v:"partial", fb:"Balance matters most in flight, where it governs pitch control." } ] },
        { q:"Why check weight and balance in this crash?", o:[
          { t:"To confirm the CG was in limits and clear loading as the cause of the dive.", v:"expert", fb:"Clearing balance narrows the field toward a control-system cause." },
          { t:"To prove the cargo hid a device, since imbalance always means sabotage aboard.", v:"danger", fb:"Imbalance is a loading issue, not evidence of a bomb." },
          { t:"To blame the loaders, who are at fault whenever an aircraft pitches nose-down.", v:"wrong", fb:"A nose-down has many causes; loaders are not the default culprit." },
          { t:"To recalculate fuel burn, the only reason balance ever concerns a safety board.", v:"partial", fb:"Fuel affects CG, but the check is about controllability, not just burn." } ] }
      ] },
    // cell: Controller Diaz @ The Manufacturer's Design Bay
    recorders:{ sci:"David Warren (1925-2010)", topic:"The black-box recorders", lede:"The Australian whose father died in an air crash, and who spent his life building the box that lets the dead testify.", no:14,
      profile:"David Warren was an Australian research scientist who invented the flight data recorder and the cockpit voice recorder — the 'black box.' His father had died in an aircraft accident when Warren was a boy. Working at the Aeronautical Research Laboratories in Melbourne in the 1950s, and reflecting on the unexplained crashes of the early Comet jets, he reasoned that if investigators could hear the crew and read the instruments from the final minutes, the causes would stop being mysteries. In 1957 he built a prototype, the 'ARL Flight Memory Unit.'\n\nThe idea was slow to catch on — some worried about crews being recorded — but the value proved undeniable, and recorders became mandatory worldwide, housed in crash- and fire-resistant cases and painted bright orange. Modern recorders capture hundreds of parameters: control positions, engine settings, airspeed, altitude, and, crucially, the commands and motions of the flight-control system, alongside the voices and sounds of the cockpit. They turn speculation into evidence.\n\nFor this board, the recorders are the decisive witness, and Warren's invention is why the sensational and the dismissive answers can both be tested rather than argued. The data will show what the angle-of-attack sensors reported, whether an automatic system commanded the stabilizer nose-down, how the crew responded, and whether the engines ran. If the trace shows repeated automatic trim against a struggling crew, no bomb and no simple blunder fits the record. Warren built the box precisely so a board would not have to guess — and so that a maker's account could be checked against what the aircraft itself recorded.",
      frame:"Diaz nods at the orange boxes. \"Everything I heard, those boxes saw. Prove you know what they record, and we'll read them together.\"",
      q:[
        { q:"Why did David Warren build the flight recorder?", o:[
          { t:"So the crew's voices and instrument data could reveal a crash's true cause.", v:"expert", fb:"Warren wanted the aircraft's final minutes to speak for themselves." },
          { t:"So airlines could bill pilots for any rough handling of the aircraft in flight.", v:"wrong", fb:"His aim was accident investigation, not disciplining crews." },
          { t:"So engineers could tune the engines using the performance logged on each trip.", v:"wrong", fb:"The purpose was to explain crashes, not routine engine tuning." },
          { t:"So controllers could track each aircraft's position along its whole route.", v:"partial", fb:"That is what radar does; recorders exist for post-crash analysis." } ] },
        { q:"What do modern recorders capture?", o:[
          { t:"Hundreds of parameters, including control-system commands, plus cockpit sound.", v:"expert", fb:"That breadth is exactly what lets the data settle a case." },
          { t:"Only the moment of any explosion, which is all a board really needs to see.", v:"danger", fb:"Recorders capture the whole flight, not just a blast instant." },
          { t:"Just the final radio call, from which the rest of the flight is reconstructed.", v:"wrong", fb:"They log continuous parameters, far more than a single call." },
          { t:"Engine data alone, since the flight controls are not worth recording in flight.", v:"partial", fb:"Control positions are recorded and are central to this case." } ] },
        { q:"How do the recorders test the two trap answers?", o:[
          { t:"They show whether automatic trim, a bomb, or a simple slip fits the actual data.", v:"expert", fb:"The trace can confirm or kill each theory against the record." },
          { t:"They confirm sabotage, since a black box only ever survives a deliberate blast.", v:"danger", fb:"Recorders survive all kinds of crashes; survival implies nothing." },
          { t:"They prove pilot error, because recorders capture only the crew's own mistakes.", v:"wrong", fb:"They capture the whole system, including automation acting on its own." },
          { t:"They settle nothing, as recorders rarely survive and are best left out of a case.", v:"partial", fb:"Recorders usually survive and are the board's most decisive evidence." } ] }
      ] },
    // cell: Mechanic Rao @ The Manufacturer's Design Bay
    humanfactors:{ sci:"Paul Fitts (1912-1965)", topic:"Human factors & cockpit design", lede:"The psychologist who studied why good pilots pulled up the gear instead of the flaps, and blamed the cockpit, not the crew.", no:15,
      profile:"Paul Fitts was an American psychologist who helped create the field of human factors, or engineering psychology. During and after the Second World War he studied why experienced, competent pilots made certain errors again and again — and found the answers in cockpit design, not in the men. In a landmark study he analyzed hundreds of 'pilot-error' incidents and showed that many were 'designer errors': controls for the landing gear and the flaps placed side by side and shaped alike, so that under stress a pilot would grab the wrong one. Move or reshape the control, and the error largely vanished.\n\nFitts also gave us 'Fitts's Law,' a mathematical relationship predicting how long it takes to move to a target based on its distance and size, foundational to the design of everything from cockpits to computer interfaces. And he framed the 'Fitts List,' an early attempt to allocate tasks between humans and machines according to what each does best. His guiding principle: design the system to fit the human, because a well-trained person placed in a badly designed system will still fail in predictable ways.\n\nFor this board, Fitts is the check against the dismissal trap. When a crew loses a fight with their aircraft, the lazy verdict is 'pilot error.' Fitts's life work says: ask first what the design demanded of them. If the crew faced an automatic system they were never told about, fed by a single faulty sensor, with only seconds and an unfamiliar drill to save themselves, then the 'error' was engineered into the cockpit. Blaming the pilots would repeat the very mistake Fitts spent his career exposing.",
      frame:"Rao jabs a finger at a cockpit mock-up. \"They'll say the crew fumbled. I say look at what they were handed. Show me you know the difference.\"",
      q:[
        { q:"What did Fitts find behind many 'pilot errors'?", o:[
          { t:"Design flaws, like look-alike controls side by side, that invited the mistake.", v:"expert", fb:"Fitts showed many 'pilot errors' were really designer errors." },
          { t:"Poor training, showing the airlines simply put unready pilots in the cockpit.", v:"wrong", fb:"His finding was about design, not training gaps." },
          { t:"Fatigue from long duty days, which no change to the cockpit could ever fix.", v:"wrong", fb:"He traced the errors to layout, which redesign did fix." },
          { t:"Bad luck, since these slips were random and no pattern could explain any of them.", v:"partial", fb:"He found a clear pattern in the design, not randomness." } ] },
        { q:"What is the core principle of human factors?", o:[
          { t:"Design the system to fit the human, who will otherwise fail in predictable ways.", v:"expert", fb:"Fit the machine to the person — that is the founding principle." },
          { t:"Trust the machine over the human, whose errors are the sole source of all risk.", v:"danger", fb:"The field distributes tasks; it does not simply distrust people." },
          { t:"Train humans to be flawless, after which the design no longer matters at all.", v:"wrong", fb:"No training makes people flawless; design must support them." },
          { t:"Automate every task, since a person in the loop can only ever add new mistakes.", v:"partial", fb:"The Fitts List allocates tasks; it does not automate everything." } ] },
        { q:"How does Fitts guard against the 'pilot error' verdict?", o:[
          { t:"By asking what the design demanded before blaming the crew for failing at it.", v:"expert", fb:"Design-first analysis is Fitts's shield against scapegoating crews." },
          { t:"By proving crews are never at fault, so the cause must be a device planted aboard.", v:"danger", fb:"He did not exonerate crews wholesale, nor point to sabotage." },
          { t:"By showing all errors are the pilot's, which closes the case on the crew fast.", v:"wrong", fb:"That is the opposite of Fitts's conclusion." },
          { t:"By ignoring the cockpit entirely and studying only the airline's hiring records.", v:"partial", fb:"He studied the cockpit closely; that is where he found the cause." } ] }
      ] },
    // cell: Mechanic Rao @ The Manufacturer's Design Bay
    certification:{ sci:"Jerome Lederer (1902-2004)", topic:"Airworthiness & safety culture", lede:"The man who inspected Lindbergh's plane before Paris and spent seventy years insisting that safety is a system, not a slogan.", no:16,
      profile:"Jerome Lederer — known as 'Mr. Aviation Safety' — devoted more than seven decades to making flight safe. As a young engineer he inspected the Spirit of St. Louis before Charles Lindbergh's 1927 Atlantic flight. He founded the Flight Safety Foundation, led the Cornell-Guggenheim Aviation Safety Center, and, after the Apollo 1 fire killed three astronauts in 1967, was brought in to run safety for NASA's crewed spaceflight programs. He championed 'system safety' — the idea that safety must be engineered into a program deliberately, at every level, rather than hoped for.\n\nLederer taught that airworthiness is not a single test passed once but a discipline: hazards identified in advance, designs reviewed independently, failures analyzed honestly, and a culture in which raising a safety concern is rewarded, not punished. He understood the pressures that erode this — schedule, cost, pride, and the temptation to certify by assuming a component will not fail rather than proving it. Certification exists to force those assumptions into the open before an aircraft ever carries passengers.\n\nFor this board, Lederer names the deepest layer of the case. If a manufacturer relied on a single angle-of-attack sensor, judged an automatic system too minor to disclose, and pressed certification along under schedule pressure, then the failure is one of safety culture, not merely of a part. Lederer's standard asks whether the maker treated safety as a system or as an obstacle to a deadline. A concealed flaw and a buried test memo are exactly the signatures he warned of — the moment a program decides that what it does not admit cannot hurt it.",
      frame:"Rao lowers his voice. \"Somebody signed this airplane safe. Show me you understand what that signature was supposed to mean, and I'll tell you what it didn't.\"",
      q:[
        { q:"What did Lederer mean by 'system safety'?", o:[
          { t:"Safety engineered deliberately into a program at every level, not merely hoped for.", v:"expert", fb:"System safety builds safety in by design, top to bottom." },
          { t:"A single final inspection that certifies an aircraft the day before it enters service.", v:"wrong", fb:"Safety is a continuous discipline, not one last look." },
          { t:"Backup parts for every component, after which no further safety work is needed.", v:"wrong", fb:"Redundancy is one tool; system safety is far broader." },
          { t:"The pilots' own vigilance, which is where responsibility for safety really belongs.", v:"partial", fb:"Crews matter, but Lederer put safety on the whole system, not just pilots." } ] },
        { q:"What pressures did Lederer warn erode airworthiness?", o:[
          { t:"Schedule, cost, and pride, which tempt makers to assume failures away.", v:"expert", fb:"Those pressures are what safety culture must resist." },
          { t:"Foreign saboteurs, whose infiltration is the chief threat to any program.", v:"danger", fb:"His concern was internal pressure, not saboteurs." },
          { t:"Overcautious regulators, whose demands are the true danger to safe flight.", v:"wrong", fb:"Lederer saw regulators as a safeguard, not the danger." },
          { t:"Bad weather alone, the single hazard a safety culture exists to manage.", v:"partial", fb:"Weather is one hazard; he warned of organizational pressures." } ] },
        { q:"How does Lederer's standard read a concealed flaw?", o:[
          { t:"As a failure of safety culture — treating what it hid as if it could not hurt.", v:"expert", fb:"Concealment is the exact safety-culture failure he warned about." },
          { t:"As proof of sabotage, since only an enemy would hide a flaw from a maker.", v:"danger", fb:"Here the maker hid it — that is a culture failure, not sabotage." },
          { t:"As a minor paperwork lapse, since certification is a formality either way.", v:"wrong", fb:"Certification exists precisely so such flaws cannot be waved through." },
          { t:"As the crew's burden, since pilots must catch whatever the maker overlooks.", v:"partial", fb:"The burden starts with the maker's disclosure, not the crew's reflexes." } ] }
      ] },
    // cell: The Whistleblower @ The Manufacturer's Design Bay
    airspeed:{ sci:"Henri Pitot (1695-1771)", topic:"Airspeed, the pitot tube & icing", lede:"The French engineer who, clearing sludge from the Seine, invented the little bent tube that tells every airliner how fast it flies.", no:17,
      profile:"Henri Pitot was a French hydraulic engineer who, around 1732, invented the device that bears his name to measure the speed of flowing water in the river Seine. The Pitot tube works on a simple principle: a tube facing into the flow senses the 'stagnation' pressure — the static pressure plus the extra pressure of the moving fluid brought to rest — and comparing that with the static pressure alone yields the flow speed. Centuries later the same instrument, as the pitot-static system, became how aircraft measure airspeed.\n\nThe principle is sound, but it depends entirely on clean, unobstructed sensing. If a pitot tube ices over, gets blocked by insects, or is left with its cover on, the airspeed reading becomes false — sometimes wildly so — and any automation that trusts that reading inherits the error. Blocked pitot tubes and iced sensors have been at the root of real accidents, where crews received contradictory or impossible airspeed indications and, in the confusion, lost control. The lesson generalizes to every air-data sensor, including the angle-of-attack vanes.\n\nFor this board, Pitot points straight at the sensor question. An aircraft's automatic systems are only as trustworthy as the data they are fed. If a single angle-of-attack sensor failed — iced, damaged, or miscalibrated — and an automatic system acted on that one faulty number without cross-checking a second source, then the aircraft was driven by a lie it had been designed to believe. That is not sabotage and not simple pilot error; it is a design that trusted one fragile sensor too far. Pitot's tube is the reminder that good physics fails on bad input.",
      frame:"The whistleblower's jaw tightens. \"One bad number, and the airplane believed it. Prove you understand sensors, and I'll tell you which one lied.\"",
      q:[
        { q:"How does a Pitot tube measure speed?", o:[
          { t:"By comparing the flow's stagnation pressure with the static pressure around it.", v:"expert", fb:"Stagnation minus static pressure gives the speed of the flow." },
          { t:"By timing how long a pulse of sound takes to travel the length of the tube.", v:"wrong", fb:"There is no sound pulse; it is a pressure measurement." },
          { t:"By counting how fast a tiny turbine inside the tube is spun by the flow.", v:"wrong", fb:"A Pitot tube has no turbine; it senses pressure." },
          { t:"By weighing the air that enters the tube over a fixed interval of time.", v:"partial", fb:"It measures pressure difference, not the mass of captured air." } ] },
        { q:"What happens if a pitot tube ices over?", o:[
          { t:"The airspeed reading turns false, and any automation trusting it inherits the error.", v:"expert", fb:"A blocked probe feeds a lie straight into the systems." },
          { t:"The tube bursts from the pressure, a rupture easily confused with a small blast.", v:"danger", fb:"Blockage corrupts the reading; it does not detonate." },
          { t:"Nothing, since airspeed is measured by the engines and not by the pitot at all.", v:"wrong", fb:"Airspeed comes from the pitot-static system, not the engines." },
          { t:"The reading freezes at the last value, which is always safe to keep flying on.", v:"partial", fb:"A frozen or false reading is dangerous, not safe, to trust." } ] },
        { q:"What does Pitot's lesson suggest here?", o:[
          { t:"Automation is only as good as its sensors; one faulty vane can drive the aircraft.", v:"expert", fb:"Garbage in, garbage out — a single bad sensor can command the plane." },
          { t:"A failed sensor means tampering, since sensors never fail on their own in flight.", v:"danger", fb:"Sensors fail from ice and wear routinely; failure is not tampering." },
          { t:"Sensors are irrelevant, because pilots ignore them and fly by feel the whole time.", v:"wrong", fb:"Automation relies on sensors even when pilots cross-check by feel." },
          { t:"Only airspeed sensors matter, so the angle-of-attack vanes can be set aside here.", v:"partial", fb:"The same lesson applies to the angle-of-attack vanes, which are central here." } ] }
      ] },
    // cell: The Whistleblower @ The Manufacturer's Design Bay
    windtunnel:{ sci:"Osborne Reynolds (1842-1912)", topic:"Similitude & wind-tunnel testing", lede:"The Manchester professor who dyed a thread of water and revealed the exact instant smooth flow dissolves into turbulence.", no:18,
      profile:"Osborne Reynolds was a British engineer and physicist whose 1883 experiment — injecting a thin stream of dye into water flowing through a glass tube — revealed how flow transitions from smooth (laminar) to chaotic (turbulent) as speed increases. He showed that this transition is governed by a single dimensionless ratio, now called the Reynolds number, which compares inertial forces to viscous forces in a flow. Two flows with the same Reynolds number behave alike, whatever their actual size or speed.\n\nThis principle of dynamic similarity is what makes wind-tunnel testing valid. An engineer cannot always test a full-size aircraft, but a scale model tested at a matching Reynolds number will reproduce the same flow patterns, letting designers measure lift, drag, and — critically — how and when the airflow separates and the wing stalls. Reynolds's insight turned the wind tunnel from a curiosity into a quantitative instrument, the place where an aircraft's aerodynamic behavior is mapped before it ever flies.\n\nFor this board, Reynolds stands for what testing can reveal and what concealment can bury. The behavior of a stall-protection system, its response to a failed sensor, and the forces it commands can all be studied in the tunnel and in simulation before certification. If the maker's own tests exposed the flaw — a system that pushed the nose down hard on a single bad reading — and that finding was set aside to protect a schedule, then the truth was known and hidden. Reynolds's discipline is that the flow does not lie; the only question is whether anyone chose to look, and to report what they saw.",
      frame:"The whistleblower finally meets your eyes. \"We could have caught it in the tunnel. We did. Show me you understand testing, and I'll tell you where the memo went.\"",
      q:[
        { q:"What does the Reynolds number compare?", o:[
          { t:"Inertial forces to viscous forces, setting whether a flow is smooth or turbulent.", v:"expert", fb:"That ratio predicts the laminar-to-turbulent transition." },
          { t:"Lift to drag, which fixes how far an aircraft can glide with its engines off.", v:"wrong", fb:"That is the glide ratio, a different quantity entirely." },
          { t:"Air speed to the speed of sound, which decides when shock waves will form.", v:"wrong", fb:"That is the Mach number, not the Reynolds number." },
          { t:"Model size to full size, which is all that scaling a wind-tunnel test requires.", v:"partial", fb:"Scale matters, but similarity requires matching the Reynolds number." } ] },
        { q:"Why does dynamic similarity make wind tunnels valid?", o:[
          { t:"A model at a matching Reynolds number reproduces the full-size flow patterns.", v:"expert", fb:"Matched Reynolds number means the model's flow mirrors the real one." },
          { t:"A tunnel can detonate charges safely, the only way to test a jet's blast limits.", v:"danger", fb:"Tunnels study airflow, not explosions." },
          { t:"A model always behaves like the real aircraft, whatever the test conditions are.", v:"wrong", fb:"Only when the key parameters, like Reynolds number, are matched." },
          { t:"A tunnel removes gravity, so results transfer directly to real flight every time.", v:"partial", fb:"Tunnels do not remove gravity; validity comes from similitude." } ] },
        { q:"What does Reynolds's discipline imply about the flaw?", o:[
          { t:"Testing could have exposed the system's behavior — if anyone chose to report it.", v:"expert", fb:"The flaw was findable in test; the failure was in disclosing it." },
          { t:"Only a saboteur could hide a flaw, since tunnels catch every fault every time.", v:"danger", fb:"Tunnels reveal much, but people choose whether to report it." },
          { t:"Wind tunnels cannot study automation, so the flaw was impossible to foresee.", v:"wrong", fb:"System behavior is studied in test rigs and simulation before flight." },
          { t:"The flaw was pure bad luck, undetectable by any test the maker could run.", v:"partial", fb:"It was detectable; the evidence suggests it was found and buried." } ] }
      ] }
  },
  STORIES:{
    atc:{
      wreck:"Controller Diaz stands over the recorder bench, jaw tight. \"I had them on frequency the whole way down — calm, then confused, then just busy. Read me what the boxes say, and I'll tell you if it matches what I heard.\"",
      hangar:"Diaz walks the hangar between the jacked-up airframes. \"On the scope this fleet was the quiet one — until it wasn't. Show me you understand the machine, and I'll tell you which flights logged the same fight.\"",
      designbay:"Diaz looks out of place among the engineers' screens, arms folded. \"I heard a crew lose to their own airplane. Somebody in this room knew it could happen. Prove you can follow the technical thread, and I'll point.\""
    },
    mech:{
      wreck:"Rao crouches by the twisted stabilizer jackscrew, thumb on the threads. \"This tells a story if you can read it. I signed off this tail. Show me you know your aerodynamics and I'll tell you what I saw.\"",
      hangar:"Rao meets you at his own bench, a scarred vane sensor in his palm. \"I replaced this part three times in two months and nobody upstairs blinked. Know your systems, and I'll show you the paperwork.\"",
      designbay:"Rao looks like he wants to leave the design bay. \"Out here they draw it; I'm the one who bolts it on. If you grasp how a cockpit's meant to work, I'll tell you what they never told the crews.\""
    },
    whistle:{
      wreck:"The whistleblower keeps their back to the recorder screens. \"I know what those traces will show, because I saw it on a test rig two years ago. Convince me you'll understand it, and I'll tell you what we found.\"",
      hangar:"They find you between the engine stands, voice low. \"They keep the ugly parts off the shop floor. I flagged the control law and was told to stay in my lane. Show me you know the engineering, and I'll say more.\"",
      designbay:"In their own design bay the whistleblower is finally still. \"The memo is in this building. I wrote part of it. If you can follow the physics of what we hid, I'll tell you where to look.\""
    }
  },
  story:[
    "The <b>Ardent 9</b> was the newest thing in the sky — a clean-sheet airliner, praised on every trade cover, filling order books faster than the factory could build it. Then, on a cloudless morning, one fell out of level flight and into a field, and the questions began before the smoke cleared. You are <b>Investigator Sam Okoye</b>, and the accident board has handed you the file no one wants and everyone is watching.",
    "<b>Three people inside will help you</b>, each carrying a piece and none the whole. <b>Controller Diaz</b>, who worked the tower and heard the crew lose a fight with their own aircraft. <b>Mechanic Rao</b>, who signed off the airframe and kept replacing one small sensor that would not behave. And <b>the Whistleblower</b>, a test engineer from the manufacturer who saw something on a rig two years ago and was told to stay in their lane. Earn their trust and they will talk.",
    "<b>Someone here is behind it.</b> Three names sit in your notepad: the <b>flight crew</b>, who had seconds and no warning; <b>Vaughn</b>, the manufacturer's program manager, who owned the schedule; and the <b>airline's maintenance chief</b>, who kept the fleet flying. Every column of the case — <b>who</b> is behind it, <b>where</b> it culminates, and <b>what</b> truly happened — hides a tempting wrong answer. The cameras want <b>terrorism, a bomb in the hold</b>. The quick file wants <b>simple pilot error, nothing systemic</b>. The truth is narrower than the first and graver than the second — and someone has already shredded the page that names it.",
    "You have <b>8 days</b> and a single accusation to make. Name it well and a buried test memo becomes proof; name it wrong and a real, provable failure is lost to a headline or a scapegoat."
  ],
  endings:{ overclaimWhat:"terror", dismissalWhat:"piloterror",
    win:{
      expertTitle:"What the Recorders Prove, and No More",
      expert:["Okoye names it exactly: Vaughn, the manufacturer's program manager, who owned the schedule and buried the finding; the truth culminating in the Manufacturer's Design Bay, where the flawed control law and the shelved test memo live; and a concealed flight-control flaw — an automatic stall-protection system that drove the nose down on a single faulty angle-of-attack sensor. Not a bomb. Not a careless crew.",
        "Every card accounted for. Okoye worked the tower, the hangar, and the design bay, turned a frightened test engineer into a witness, and claimed precisely what the recorders and the memo could defend. The board issues findings that ground the fleet and fix the system — which is the entire point of doing it right."],
      soundTitle:"Right — but Lightly Proven",
      sound:["Okoye names the right three — Vaughn, the Design Bay, and the concealed flight-control flaw driven by one bad sensor. The shape of the case is correct, and the refusal to cry sabotage or blame the crew is exactly right.",
        "But too many threads were left loose, and the maker's lawyers will pull at them. A few more days tracing the sensor and the buried memo would have made the finding unassailable. Close and honest, if not yet airtight."],
      namedTitle:"The Right Answer, Unearned",
      named:["Okoye names the truth — Vaughn, the Design Bay, the hidden control-system flaw — but gathered too little to back it. It reads like a hunch that happened to land.",
        "The board cannot ground a fleet on an accusation this thin, however correct. Being right is not the same as being able to prove it to the people who will fight the finding."]
    },
    overclaim:{ title:"The Board That Cried Bomb",
      body:["Okoye reports terrorism — a bomb in the hold — the answer the cameras were already broadcasting. It is vivid, and it is not what the evidence shows.",
        "The airframe was intact, both engines ran to the end, and the recorders show no blast — only a stabilizer trimming the nose down, again and again, against a struggling crew. When the overclaim collapses, it takes credibility with it, and the real, provable flaw is dismissed as just another conspiracy theory. The only saboteur was a single faulty sensor and a system built to obey it."] },
    dismissal:{ title:"Case Closed on the Crew",
      body:["Okoye files it as simple pilot error — the crew mishandled an upset, nothing systemic, close the file. It is half true and misses the graver half.",
        "The crew were fighting an automatic system they were never told existed, fed by one bad sensor, with seconds to diagnose a drill no one had taught them. Blaming them leaves the flaw in every other Ardent 9 still flying, waiting for the next crew to lose the same fight. The board saw the last hand on the controls and never the hole cut into the design."] },
    wrongNames:{ title:"So Close",
      body:["Okoye has the nature of it cold — a concealed flight-control flaw, an automatic system driving the nose down on a single faulty sensor, neither a bomb nor a careless crew. But the finger lands on the wrong name or the wrong room."] } },
}};
