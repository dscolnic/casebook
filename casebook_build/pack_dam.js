// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"dam", title:"The Marrow Valley Dam", discipline:"Hydraulics & Geotechnics",
  teaser:"An earth dam let go at midnight and took the town below. Sabotage? A thousand-year flood? Or seepage someone ignored?", overclaimTag:"sabotage or an earthquake", truthTag:"a concealed internal erosion",
  venue:"the Marrow Valley dam inquiry", agent:{name:"Inspector Dale Ferran", role:"Investigator's Notepad"},
  standingLabel:"Engineering credibility", readingShort:"Pioneers", readingLabel:"Hydraulics Pioneers",
  dossierName:"HYDRAULICS & SOIL PIONEERS", enterLabel:"Open the inquiry", subt:"A deduction game inside the Marrow Valley dam inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"And beware the answer the town is shouting for: the evidence points not to a blast in the night, but to something slower, and far harder to forgive.",
  CATS:{
    who:{ title:"Who is behind it", truth:"owner", items:[
      {id:"owner", label:"Cass Herrick — dam owner"},
      {id:"chief", label:"The chief engineer"},
      {id:"inspector", label:"The state dam inspector"} ]},
    where:{ title:"Where it culminates", truth:"office", items:[
      {id:"spillway", label:"The Spillway & Outlet Works"},
      {id:"embankment", label:"The Embankment & Abutment"},
      {id:"office", label:"The Owner's Project Office"} ]},
    what:{ title:"What is happening", truth:"piping", items:[
      {id:"attack", label:"Sabotage or an earthquake strike"},
      {id:"flood", label:"A freak flood — an act of God"},
      {id:"piping", label:"A concealed internal erosion through the dam"} ]}
  },
  PLACES:{
    spillway:{name:"The Spillway & Outlet Works", xy:[140,90]},
    embankment:{name:"The Embankment & Abutment", xy:[330,240]},
    office:{name:"The Owner's Project Office", xy:[520,90]}
  },
  EDGES:[["spillway","embankment"],["embankment","office"]],
  CHARACTERS:{
    warden:{ name:"Warden Sol", role:"Downstream warden", face:"💧", badge:"W", legend:"the toe", hint:"Walks the toe of the dam; logged the muddy seepage that kept growing." },
    clerk:{ name:"The Clerk", role:"Records clerk", face:"🗂", badge:"C", legend:"the office", hint:"Keeps the inspection reports and the change-orders that shelved them." },
    surveyor:{ name:"Surveyor Pine", role:"Embankment surveyor", face:"📐", badge:"S", legend:"the crest", hint:"Reads the instruments on the crest; the settlement gauges were moving." }
  },
  TOPICMAP:{
    spillway:{ warden:["hydrostatics","channelflow"], clerk:["seepage","resistance"], surveyor:["filters","flownets"] },
    embankment:{ warden:["porepressure","obsmethod"], clerk:["shallowwater","soilstress"], surveyor:["stfrancis","floodnumerics"] },
    office:{ warden:["infiltration","openchannel"], clerk:["seismicdam","damdesign"], surveyor:["damsafety","fluidmech"] }
  },
  TOPICS:{
    // cell: Warden Sol @ The Spillway & Outlet Works
    hydrostatics:{ sci:"Blaise Pascal (1623-1662)", topic:"Hydrostatic pressure & head", lede:"The French prodigy who burst a stout cask with a thin tube of water and proved that depth, not volume, builds the pressure.", no:1,
      profile:"Blaise Pascal was a French mathematician, physicist, and philosopher who, in a few short years, laid the foundations of fluid statics. In experiments around 1647 to 1653 he established what we now call Pascal's law: pressure applied to a confined fluid is transmitted undiminished in every direction. He showed that the pressure at a point in a fluid at rest depends only on the depth below the surface, not on the shape of the container. His famous 'barrel' demonstration, in which a tall thin tube of water burst a stout cask, proved that it is height, not volume, that builds pressure.\n\nFrom this comes the idea of head: the pressure at the base of a body of water equals the weight of the column above it, so engineers speak of pressure as a height of water. A reservoir a hundred feet deep presses on the dam and its foundation with a force set by that depth, and that same pressure reaches into every crack, pore, and seam the water can touch. Pascal also clarified how pressure acts on submerged surfaces and pioneered the hydraulic-press principle, in which a small force over a small area balances a large force over a large one.\n\nFor this inquiry, Pascal's law is where suspicion must start. The reservoir needs no saboteur and no freak storm to push water into the dam; the head is always there, patiently, driving water into the embankment day and night. That steady pressure is what feeds a slow leak and can turn a trickle into an eroding channel over months. Understanding that the force comes from depth, not drama, helps the board see that a failure can be born from ordinary, ever-present pressure working on a weakness, not from a sudden blast or a once-in-a-thousand-year wave.",
      frame:"Warden Sol scrapes river mud off his boots. \"Folks think it takes a storm to break a dam. It don't. That water pushes every minute of every day. Tell me you know where the push comes from.\"",
      q:[
        { q:"What does Pascal's law say about pressure in a confined fluid?", o:[
          { t:"It is passed on equally in every direction throughout the fluid.", v:"expert", fb:"Equal transmission in all directions is exactly Pascal's law." },
          { t:"It builds only where a shock or blast first strikes the water.", v:"danger", fb:"Pressure needs no blast; a still reservoir transmits it constantly." },
          { t:"It acts straight downward, so only the floor of the vessel feels it.", v:"wrong", fb:"Fluid pressure acts in all directions, not only downward." },
          { t:"It rises with the volume of water held, not with the depth.", v:"partial", fb:"Depth sets the pressure, not the volume held behind the dam." } ] },
        { q:"What does the term 'head' describe?", o:[
          { t:"Pressure at a depth, written as a height of water above it.", v:"expert", fb:"Head expresses pressure as the equivalent column of water." },
          { t:"The flow of water spilling over the top of the dam's crest.", v:"wrong", fb:"That is overtopping flow, not the meaning of head." },
          { t:"The width of the reservoir measured across its broadest point.", v:"partial", fb:"Head is about pressure and depth, not the reservoir's width." },
          { t:"The surge a sudden wave adds on top of the normal water line.", v:"danger", fb:"Head is the steady standing pressure, not a wave's surge." } ] },
        { q:"Why does Pascal's law matter to how this dam failed?", o:[
          { t:"Steady head drives water into the dam with no storm or attack needed.", v:"expert", fb:"Ever-present head can feed a leak for months without any drama." },
          { t:"Only a blast could force water deep into a solid earth embankment.", v:"danger", fb:"The reservoir's own pressure pushes water in; no blast is required." },
          { t:"Pressure vanishes once water stops flowing, so a calm reservoir is safe.", v:"wrong", fb:"A still reservoir still presses hard; the head never goes away." },
          { t:"Head only matters during a flood, when the water tops the spillway.", v:"partial", fb:"Head presses at every water level, not only in flood." } ] }
      ] },
    // cell: Warden Sol @ The Spillway & Outlet Works
    channelflow:{ sci:"Antoine de Chezy (1718-1798)", topic:"Open-channel flow", lede:"The engineer of Paris's water supply who first put a number to how much a channel can carry before it overflows.", no:2,
      profile:"Antoine de Chezy was a French hydraulic engineer who, while working on the water supply of Paris, derived the first practical formula for the velocity of water in an open channel. Around 1769 to 1776, studying flow in the Canal de l'Yvette and the Seine, he reasoned that in steady uniform flow the pull of gravity down the slope must balance the friction dragging along the bed and banks. From this balance he produced the relation now written V equals C times the square root of R times S, where V is the mean velocity, R the hydraulic radius (flow area divided by wetted perimeter), S the channel slope, and C a coefficient describing the channel's roughness.\n\nChezy's formula meant that engineers could, for the first time, estimate how much water a canal, river, or spillway would carry at a given depth and slope. It became the backbone of open-channel hydraulics and the parent of the later resistance formulas. The key idea is capacity: a channel of known size and slope can pass only so much flow before the water level climbs and it overtops its banks.\n\nFor this inquiry, Chezy speaks directly to the flood theory. A dam's spillway is an open channel built to carry flood water safely past the dam, and its capacity can be calculated. If the board wants to blame a freak flood, it must show the inflow actually exceeded what the spillway and reservoir could pass, so that the water rose over the crest and overtopped the dam. Chezy's arithmetic lets an investigator test that claim instead of assuming it. When the spillway was never overwhelmed and the crest was never overtopped, the water did not come over the top, which turns the question inward, to how it got through.",
      frame:"Sol nods at the spillway chute. \"Everybody wants to say the river beat us. That channel carries more than they think. Figure what a spillway holds before you go blaming the sky.\"",
      q:[
        { q:"What does Chezy's formula let an engineer estimate?", o:[
          { t:"The mean velocity of steady flow from a channel's slope and shape.", v:"expert", fb:"Chezy ties velocity to slope and hydraulic radius." },
          { t:"The exact depth a flood will reach at any point downstream of a dam.", v:"wrong", fb:"It gives velocity, not a full flood profile down the valley." },
          { t:"The roughness of a channel bed once its material is known.", v:"partial", fb:"Roughness is an input to the formula, not its output." },
          { t:"The size of a wave a sudden collapse would send down the valley.", v:"danger", fb:"Chezy describes steady channel flow, not a collapse surge." } ] },
        { q:"In Chezy's formula, what is the hydraulic radius R?", o:[
          { t:"The flow area divided by the wetted perimeter of the channel.", v:"expert", fb:"Hydraulic radius is area over wetted perimeter." },
          { t:"The radius of the largest pipe the channel could be swapped for.", v:"wrong", fb:"It is a ratio of the channel section, not a pipe radius." },
          { t:"The depth of the water measured at the deepest point of flow.", v:"partial", fb:"Depth relates to R but is not its definition." },
          { t:"The distance a flood spreads sideways once it leaves the banks.", v:"danger", fb:"R is a property of the channel section, not flood spread." } ] },
        { q:"How does channel capacity bear on the flood theory here?", o:[
          { t:"If the spillway passed the inflow, the water never overtopped.", v:"expert", fb:"A spillway that coped means overtopping did not occur." },
          { t:"A flood so rare it beat the spillway is the only way a dam fails.", v:"danger", fb:"Overtopping is one failure mode, not the only one." },
          { t:"Spillway capacity cannot be known, so the flood claim can't be tested.", v:"wrong", fb:"Capacity is calculable; the flood claim can be checked." },
          { t:"A big enough channel makes any dam safe from every possible flood.", v:"partial", fb:"Capacity reduces risk but never removes seepage failure." } ] }
      ] },
    // cell: The Clerk @ The Spillway & Outlet Works
    seepage:{ sci:"Henry Darcy (1803-1858)", topic:"Darcy's law & seepage", lede:"The engineer who gave Dijon its water and, in a column of sand, found the law that governs every leak through every dam.", no:3,
      profile:"Henry Darcy was a French engineer who gave his home city of Dijon one of the finest water supplies in Europe, and who, along the way, discovered the law that governs how water moves through soil. In 1856, investigating the sand filters used to clean the city's supply, he ran careful experiments passing water through columns of sand. He found the flow rate was proportional to the cross-sectional area, proportional to the difference in water pressure across the sand, and inversely proportional to the length of the path, a relation now called Darcy's law.\n\nWritten as flow equals permeability times area times the hydraulic gradient, the law says seepage depends on the permeability of the material, the area, and the gradient, meaning how steeply the pressure head falls along the flow path. Coarse gravel has a high permeability and passes water freely; dense clay has a very low one. Darcy's law is the foundation of groundwater hydrology and of every calculation of seepage through and beneath a dam.\n\nFor this inquiry, Darcy is the quiet center of the case. Every earth dam seeps; water under reservoir head steadily works its way through the embankment along paths governed by Darcy's law. That seepage is normal, until it is not. When the flow at the toe grows over weeks, or turns cloudy with soil it is carrying away, the gradient is high enough to move particles, and the law that describes gentle filtration now describes erosion. Darcy teaches the board to read seepage as data, not decoration: a leak that increases and muddies is not an act of God or a bomb, but water obeying a known law through a widening flaw.",
      frame:"The Clerk squares a stack of reports. \"Seepage was logged. It was always logged, and always filed as normal. Before I hand you these, satisfy me that you know what seepage actually is.\"",
      q:[
        { q:"What did Darcy's sand-column experiments measure?", o:[
          { t:"Flow of water through sand as pressure and path length varied.", v:"expert", fb:"He related seepage flow to gradient and permeability." },
          { t:"The pressure a full reservoir exerts on the face of a dam.", v:"wrong", fb:"That is hydrostatic load, not Darcy's seepage work." },
          { t:"The rate rain soaks into a bare soil surface during a storm.", v:"partial", fb:"That is infiltration; Darcy studied flow through the soil." },
          { t:"The force needed to blast a channel through a packed embankment.", v:"danger", fb:"Darcy's law describes gentle seepage, not blasting." } ] },
        { q:"In Darcy's law, what does permeability describe?", o:[
          { t:"How readily a material lets water seep through it.", v:"expert", fb:"Permeability is the material's ability to transmit water." },
          { t:"How much water a reservoir can store behind the dam.", v:"wrong", fb:"That is storage, not permeability." },
          { t:"How steeply the pressure head falls along the flow path.", v:"partial", fb:"That is the gradient, a separate term in the law." },
          { t:"How quickly a crack from an earthquake will open up.", v:"danger", fb:"Permeability is a soil property, unrelated to seismic cracking." } ] },
        { q:"How should the board read growing, muddy seepage?", o:[
          { t:"As water moving soil: a flaw widening, not a normal leak.", v:"expert", fb:"Muddy, rising seepage means erosion is underway." },
          { t:"As harmless weeping that every dam shows and none needs watched.", v:"wrong", fb:"Clear seepage is normal; muddy, growing seepage is not." },
          { t:"As proof a saboteur bored a channel clean through the dam.", v:"danger", fb:"Erosion needs no saboteur; the head bores the channel itself." },
          { t:"As a sign the reservoir is simply too full and should be lowered.", v:"partial", fb:"Lowering slows it, but the muddy flow signals active erosion." } ] }
      ] },
    // cell: The Clerk @ The Spillway & Outlet Works
    resistance:{ sci:"Robert Manning (1816-1897)", topic:"Flow resistance", lede:"The accountant-turned-engineer whose one tidy formula still sizes every canal, culvert, and spillway on Earth.", no:4,
      profile:"Robert Manning was an Irish engineer, trained first as an accountant, who spent his career with Ireland's public works and drainage boards and gave open-channel hydraulics its most enduring formula. In 1889 he proposed a simple resistance relation for uniform flow, refined into the form engineers still use: velocity equals one over n, times R to the two-thirds power, times the square root of the slope, where R is the hydraulic radius, S the slope, and n a roughness coefficient now called Manning's n. A smooth concrete-lined channel has a low n and carries water fast; a rocky, weed-choked one has a high n and carries it slowly.\n\nManning's formula built on Chezy's balance of gravity against friction, but it tied the resistance directly to a measurable roughness, and it proved so practical that it became the world standard for designing canals, sewers, culverts, and spillways. With it, an engineer can predict the depth of flow in a channel for a given discharge, or the discharge a channel will carry before it overflows.\n\nFor this inquiry, Manning's n is a tool for testing the flood story with numbers rather than nerves. The capacity of the dam's spillway, meaning how large a flood it can pass before the reservoir rises to the crest, depends on its size, slope, and roughness, all of which Manning's formula turns into a discharge. If investigators reconstruct the storm inflow and run it against the spillway's rated capacity, they can see whether the water ever truly threatened to top the dam. When the numbers show the spillway had margin to spare, the freak-flood explanation loses its footing, and attention must move from the water going over the dam to the water going through it.",
      frame:"The Clerk slides a rating curve across the desk. \"The spillway had a number, and the flood had a number. I want to know you can compare them before we pretend the river was to blame.\"",
      q:[
        { q:"What does Manning's roughness coefficient n represent?", o:[
          { t:"The roughness of a channel's surface, resisting the flow.", v:"expert", fb:"Manning's n is the channel roughness coefficient." },
          { t:"The slope of the channel bed along the direction of flow.", v:"wrong", fb:"Slope is S in the formula, not n." },
          { t:"The hydraulic radius of the channel's flowing cross-section.", v:"partial", fb:"Hydraulic radius is R, a separate term." },
          { t:"The chance a channel will crack under an earthquake's shaking.", v:"danger", fb:"n is a hydraulic roughness, not a seismic property." } ] },
        { q:"What does Manning's formula let you predict?", o:[
          { t:"The flow a channel carries before its water overflows.", v:"expert", fb:"It gives velocity and discharge for a channel." },
          { t:"The exact moment a dam's embankment will begin to erode.", v:"wrong", fb:"It is a flow formula, not an erosion timer." },
          { t:"The pressure of the reservoir against the upstream face.", v:"partial", fb:"Reservoir pressure is hydrostatics, not Manning's n." },
          { t:"The blast radius a charge would carve in a concrete chute.", v:"danger", fb:"Manning's formula concerns flow, not explosives." } ] },
        { q:"How does spillway capacity test the flood theory?", o:[
          { t:"If the chute could pass the inflow, the dam was never topped.", v:"expert", fb:"Adequate capacity means no overtopping occurred." },
          { t:"No spillway can be sized, so a killer flood can never be ruled out.", v:"danger", fb:"Spillways are sized routinely; the claim is testable." },
          { t:"Roughness never changes, so old capacity figures always hold true.", v:"wrong", fb:"Roughness shifts with weeds and debris and must be checked." },
          { t:"A lined spillway guarantees a dam survives any storm it ever meets.", v:"partial", fb:"Capacity helps, but seepage can still fail the dam." } ] }
      ] },
    // cell: Surveyor Pine @ The Spillway & Outlet Works
    filters:{ sci:"Allen Hazen (1869-1930)", topic:"Filters, grain size & piping", lede:"The sanitary engineer who turned a fistful of sand into numbers, and showed how a graded filter can stop a dam eroding itself.", no:5,
      profile:"Allen Hazen was an American sanitary and hydraulic engineer who did more than almost anyone to make the properties of granular soils and filter sands measurable. Working on water purification in the 1890s at the Lawrence Experiment Station in Massachusetts, he studied how sand filters clean water and how quickly water passes through them. From this work he introduced the effective size (D-ten, the grain diameter that ten percent of a sample by weight is finer than) and the uniformity coefficient (D-sixty over D-ten), and proposed that a clean sand's permeability rises roughly with the square of its effective size.\n\nThese humble numbers proved powerful. They let an engineer predict a soil's permeability, judge whether a sand is well or poorly graded, and, most important for dams, design filters. A properly graded filter is a layer of granular material sized so its pores are small enough to catch the fine particles of the soil it protects, yet coarse enough to let water pass freely and safely away. Hazen also lent his name to the Hazen-Williams formula for flow in pipes.\n\nFor this inquiry, Hazen is the antidote to fatalism about seepage. Internal erosion, called piping, happens when seeping water plucks fine particles out of the embankment and carries them off, enlarging the passage until it runs backward into an open pipe. The century-old defense is exactly Hazen's filter: a correctly graded layer that lets water out but holds the soil in. If a dam's seepage ran muddy for months, the filter was failing or was never built to Hazen's criteria, a knowable, preventable, human failure and not a bolt from the blue. Muddy water means soil is leaving; a filter is what should have stopped it.",
      frame:"Pine sets down a jar of cloudy water from the toe drain. \"Clean water leaving is fine. Soil leaving is not. If you understand what a filter is meant to do, you'll know why this jar frightens me.\"",
      q:[
        { q:"What is a soil's 'effective size' (D-ten)?", o:[
          { t:"The grain size that ten percent of the sample is finer than.", v:"expert", fb:"D-ten is the ten-percent-finer grain diameter." },
          { t:"The average diameter of all the grains in the sample by weight.", v:"wrong", fb:"That is a mean size; D-ten is a specific percentile." },
          { t:"The size of the largest grains that a filter must hold back.", v:"partial", fb:"Filters are sized from D-ten, but that is not its definition." },
          { t:"The crack width a tremor must open before piping can start.", v:"danger", fb:"D-ten is a grain statistic, not a seismic crack width." } ] },
        { q:"What is the purpose of a graded filter in a dam?", o:[
          { t:"To let seep water pass while holding the soil's fines in place.", v:"expert", fb:"A filter drains water yet retains soil particles." },
          { t:"To seal the dam completely so that no water can ever seep through.", v:"danger", fb:"Filters pass water on purpose; they do not seal it off." },
          { t:"To store extra water for release during a dry summer season.", v:"wrong", fb:"A filter controls seepage; it is not for storage." },
          { t:"To slow every leak until the reservoir can be safely drawn down.", v:"partial", fb:"A filter is permanent protection, not a stalling measure." } ] },
        { q:"What does months of muddy seepage tell an investigator?", o:[
          { t:"Soil is washing out: the filter failed or was never built.", v:"expert", fb:"Muddy seepage means fines are migrating, a filter failure." },
          { t:"Nothing; every dam sheds a little mud and it means nothing at all.", v:"wrong", fb:"Clear seepage is fine; carried soil is a warning." },
          { t:"That someone tunneled explosives straight through the embankment.", v:"danger", fb:"Piping needs no explosives; water moves the soil." },
          { t:"That the reservoir sits too high and simply needs to be lowered.", v:"partial", fb:"Lowering slows it, but a proper filter is the real fix." } ] }
      ] },
    // cell: Surveyor Pine @ The Spillway & Outlet Works
    flownets:{ sci:"Arthur Casagrande (1902-1981)", topic:"Seepage, piping & flow nets", lede:"Terzaghi's protege, who drew the invisible paths water takes through a dam and marked the exact spot where it starts to bite.", no:6,
      profile:"Arthur Casagrande was an Austrian-born engineer who became a founder of modern soil mechanics in America, first as Karl Terzaghi's assistant and later as a professor at Harvard. Two of his contributions matter most here: the flow net and the study of seepage through earth dams. A flow net is a graphical solution to a seepage problem, a grid of flow lines (the paths water follows) and equipotential lines (contours of equal pressure head) drawn at right angles to one another. By sketching this net through the cross-section of a dam, an engineer can find where water travels, how fast, and, crucially, how strong the seepage forces are where the water exits.\n\nCasagrande showed how to locate the phreatic line, the top surface of seeping water inside an embankment, and how the seepage emerges at the downstream toe. He warned that where the exit gradient is high, the upward seepage force can lift and carry away soil grains, starting internal erosion. He also developed the plasticity chart for classifying soils and studied liquefaction. His work made seepage a thing engineers could draw, calculate, and control with filters and drains.\n\nFor this inquiry, Casagrande's flow net is the picture the board needs in its head. Piping begins at the downstream side, where concentrated seepage exits with enough force to pull grains loose; the erosion then works backward toward the reservoir along a growing channel. This is slow, progressive, and marked at the surface by exactly what the warden logged, an increasing, soil-laden leak near the toe. A flow net predicts where such a leak should appear and why. It leaves no room for a thousand-year flood or a saboteur: the mechanism is seepage force acting on unprotected soil, drawn plainly on paper decades ago.",
      frame:"Pine unrolls a cross-section of the dam. \"I can draw you where the water should come out, and how hard. What I logged doesn't match a healthy dam. Read a flow net for me and I'll show you.\"",
      q:[
        { q:"What does a flow net represent?", o:[
          { t:"Seepage paths and equal-head lines crossing at right angles.", v:"expert", fb:"A flow net is flow lines and equipotential lines." },
          { t:"The network of pipes that drain a reservoir after a flood recedes.", v:"wrong", fb:"That is a drainage system, not a flow net." },
          { t:"The grid a surveyor lays to map the surface of an embankment.", v:"partial", fb:"A survey grid maps the surface, not the seepage." },
          { t:"The pattern of cracks an earthquake tears through a dam's core.", v:"danger", fb:"A flow net shows seepage, not seismic cracking." } ] },
        { q:"Where does Casagrande warn that piping begins?", o:[
          { t:"At the downstream exit, where seepage force lifts loose grains.", v:"expert", fb:"Piping starts at the downstream exit gradient." },
          { t:"At the crest, where the reservoir first presses on the dam.", v:"wrong", fb:"The reservoir pushes at the crest, but erosion starts at the toe." },
          { t:"Along the phreatic line where the water surface sits inside.", v:"partial", fb:"The phreatic line matters, but erosion begins at the exit." },
          { t:"Wherever a blast or quake first fractures the embankment core.", v:"danger", fb:"Piping is a seepage process, not a fracture from a blast." } ] },
        { q:"How does erosion progress in a piping failure?", o:[
          { t:"Backward from the toe toward the reservoir along a channel.", v:"expert", fb:"Piping erodes backward, toe to reservoir, over time." },
          { t:"Instantly, the moment a hidden charge splits the dam in two.", v:"danger", fb:"It is gradual, not an instant split from a charge." },
          { t:"Downward from the crest until the whole dam slumps at once.", v:"wrong", fb:"It works backward from the toe, not down from the crest." },
          { t:"Evenly across the outer face until the whole slope washes off.", v:"partial", fb:"It concentrates along a pipe, not evenly over the face." } ] }
      ] },
    // cell: Warden Sol @ The Embankment & Abutment
    porepressure:{ sci:"Alec Skempton (1914-2001)", topic:"Soil mechanics & pore pressure", lede:"The founder of British soil mechanics, who explained why a bank that stood for years can quietly weaken and let go.", no:7,
      profile:"Alec Skempton was a British civil engineer who helped turn soil mechanics into a rigorous science and founded the discipline in Britain. Building on Terzaghi's principle of effective stress, Skempton clarified one of the most important ideas in geotechnics: that the strength of a soil is governed not by the total stress pressing on it, but by the effective stress, the total stress minus the pressure of the water filling its pores. Squeeze a saturated soil and, if the water cannot escape, the load is carried by the pore water; only as that water drains does the soil skeleton take up the stress and gain strength.\n\nSkempton introduced the pore-pressure coefficients A and B, which predict how pore-water pressure changes when a soil is loaded, and he applied these ideas to real failures: landslides, foundations, and embankment dams. He showed that a slope or a dam can stand for years and then fail when pore pressures rise, because high pore pressure lowers the effective stress and with it the soil's resistance to sliding and to erosion. He was also a noted historian of his own field, tracing its ideas to their sources.\n\nFor this inquiry, Skempton explains why a leaking dam is a weakening dam. As seepage pushes through the embankment, it raises pore-water pressures inside; where those pressures are high, the effective stress binding the grains together falls, and soil that was firm becomes vulnerable to being lifted and carried by the flow. A steady rise in seepage is therefore not cosmetic; it is a measure of the dam quietly losing strength from the inside. That is a slow, physical, recordable decline, the opposite of a sudden blast or a single overwhelming wave. The danger builds where the water is, over time.",
      frame:"Sol presses a boot into the soft ground at the toe. \"Ground that held my weight last spring gives now. Tell me what water does to the strength of soil, and you'll see why I stopped trusting this slope.\"",
      q:[
        { q:"What is effective stress?", o:[
          { t:"The total stress on a soil minus its pore-water pressure.", v:"expert", fb:"Effective stress is total stress minus pore pressure." },
          { t:"The total weight of water stored behind the dam's embankment.", v:"wrong", fb:"That is reservoir storage, not effective stress." },
          { t:"The pressure the reservoir applies against the upstream face.", v:"partial", fb:"That is hydrostatic load, a different quantity." },
          { t:"The shock load a passing earthquake drives through the soil.", v:"danger", fb:"Effective stress is a static balance, not a seismic shock." } ] },
        { q:"What happens as pore-water pressure rises in a soil?", o:[
          { t:"Effective stress falls and the soil loses strength.", v:"expert", fb:"Higher pore pressure means lower effective stress and strength." },
          { t:"The soil hardens, so a rising leak actually makes a dam safer.", v:"danger", fb:"Rising pore pressure weakens soil; it does not harden it." },
          { t:"The soil's total weight climbs until the embankment collapses.", v:"wrong", fb:"It is effective stress that falls, not weight that rises." },
          { t:"Nothing changes until the water finally reaches the outer face.", v:"partial", fb:"The weakening happens inside as pressures rise, not only at the face." } ] },
        { q:"Why does Skempton's idea argue against a sudden cause?", o:[
          { t:"Weakening builds slowly where seepage raises pore pressure.", v:"expert", fb:"Pore-pressure weakening is gradual and recordable." },
          { t:"Because only a blast can drop a soil's strength fast enough to fail.", v:"danger", fb:"Seepage lowers strength slowly; no blast is needed." },
          { t:"Because soil strength never changes, so the dam must have been struck.", v:"wrong", fb:"Soil strength does change with pore pressure over time." },
          { t:"Because pore pressure matters only during the shaking of a quake.", v:"partial", fb:"Pore pressures build steadily from seepage, not only in quakes." } ] }
      ] },
    // cell: Warden Sol @ The Embankment & Abutment
    obsmethod:{ sci:"Ralph B. Peck (1912-2008)", topic:"The observational method", lede:"The engineer who taught the world to treat a dam as an experiment that talks back, if only anyone will listen.", no:8,
      profile:"Ralph B. Peck was an American civil engineer, Terzaghi's foremost collaborator, and co-author with him of 'Soil Mechanics in Engineering Practice,' the text that taught the world's geotechnical engineers. Peck's signature contribution was to champion and codify the observational method: an approach to building on uncertain ground that treats a structure as an ongoing experiment. Because soil is variable and never fully known in advance, the engineer designs for the most probable conditions, predicts how the ground should behave, installs instruments to measure the actual behavior, and prepares in advance the actions to take if the measurements stray from the predictions.\n\nThe heart of the method is that measurement is not a formality but a duty: piezometers, settlement gauges, and seepage weirs are placed so the structure can tell you what it is doing, and the engineer must act on what they report. Peck applied this to dams, tunnels, and foundations worldwide, and he insisted that engineering judgment be disciplined by observation rather than replaced by it. He received the National Medal of Science for this body of work.\n\nFor this inquiry, Peck is the standard against which the owner's conduct must be judged. A dam is exactly the kind of structure the observational method was made for: it is watched with instruments precisely because seepage, pore pressure, and settlement reveal trouble long before failure. The muddy seepage that grew, the settlement gauges that moved, these were the dam speaking, in Peck's sense. The failure was not the absence of warning but the refusal to act on it. When readings drift toward danger and the prepared response is filed away instead of taken, that is not fate or sabotage; it is the observational method abandoned.",
      frame:"Sol taps the little weir he built at the toe. \"I read this dam every week. It was telling us something. See why you watch a dam at all, and you'll see what we ignored.\"",
      q:[
        { q:"What is the core of Peck's observational method?", o:[
          { t:"Design, measure the real behavior, then act on the data.", v:"expert", fb:"Predict, measure, and respond to what the instruments say." },
          { t:"Design for the worst case and never revisit it once it is built.", v:"wrong", fb:"The method revisits design as measurements come in." },
          { t:"Install instruments and archive their readings for the record.", v:"partial", fb:"Recording is not enough; the method demands acting on it." },
          { t:"Trust the engineer's judgment and skip the cost of monitoring.", v:"danger", fb:"The method disciplines judgment with measurement, not without it." } ] },
        { q:"Why are piezometers and gauges placed in a dam?", o:[
          { t:"So the dam reports seepage and settlement before it fails.", v:"expert", fb:"Instruments give early warning of internal trouble." },
          { t:"So a court has someone to blame after the dam has broken.", v:"danger", fb:"Monitoring is for prevention, not just assigning blame." },
          { t:"So the reservoir level can be read without visiting the crest.", v:"wrong", fb:"Gauges track internal behavior, not just water level." },
          { t:"So the owner can prove the dam was inspected on schedule.", v:"partial", fb:"The point is to act on readings, not merely log inspections." } ] },
        { q:"What does Peck's method say about ignored warnings?", o:[
          { t:"Drifting readings demand action, not a filing cabinet.", v:"expert", fb:"The method fails when warnings are shelved, not heeded." },
          { t:"That no warning can be seen, so every dam failure is a surprise.", v:"danger", fb:"Dams warn through instruments; the signs were readable." },
          { t:"That instruments are optional and judgment alone keeps a dam safe.", v:"wrong", fb:"The method makes monitoring essential, not optional." },
          { t:"That gauges can be checked once a decade and still catch trouble.", v:"partial", fb:"Trends must be watched closely, not sampled once a decade." } ] }
      ] },
    // cell: The Clerk @ The Embankment & Abutment
    shallowwater:{ sci:"Adhemar Barre de Saint-Venant (1797-1886)", topic:"The shallow-water equations", lede:"The Frenchman whose equations route a flood wave down a valley, and can tell a wave that came over a dam from one that came through it.", no:9,
      profile:"Adhemar Jean Claude Barre de Saint-Venant was a French engineer and mathematician of extraordinary range, remembered in both fluid mechanics and elasticity. In hydraulics his name attaches to the shallow-water equations, also called the Saint-Venant equations, which he set down in 1871 to describe unsteady flow in open channels: how a flood wave, a surge, or a released volume of water moves and changes shape as it travels down a river or canal. The equations express two physical laws along the channel: conservation of mass (water is neither created nor destroyed) and conservation of momentum (the water accelerates under gravity, pressure differences, and friction).\n\nBecause a full three-dimensional treatment of a river is impossibly complex, Saint-Venant reduced the problem by assuming the water is shallow relative to its length, so pressure is essentially hydrostatic and the flow can be described by depth and velocity along the channel. This made flood routing, meaning predicting how a flood crest rises, moves, and attenuates downstream, a solvable problem, and his equations remain the basis of river and dam-break modeling today. In elasticity he is equally known for Saint-Venant's principle.\n\nFor this inquiry, Saint-Venant provides the mathematics to test both a flood and a sudden breach. His equations can route the storm inflow to see whether the reservoir could have risen enough to overtop the dam, and they can model the wave a dam-break sends downstream. Run one way, they check the freak-flood claim; run another, they show that a slow internal failure and a sudden catastrophic breach send very different waves down the valley. The signature of the flood that struck the town is itself evidence about how the dam let go: over the top, or from within.",
      frame:"The Clerk lays out the downstream gauge traces. \"The water that hit the town left a record of its own. I'd like to know you can tell a wave that came over a dam from one that came through it.\"",
      q:[
        { q:"What do the Saint-Venant equations describe?", o:[
          { t:"Unsteady flow of a flood wave down an open channel.", v:"expert", fb:"They govern unsteady open-channel flood flow." },
          { t:"The still pressure a reservoir exerts on the dam at rest.", v:"wrong", fb:"That is hydrostatics, not unsteady channel flow." },
          { t:"The steady velocity of uniform flow in a lined channel.", v:"partial", fb:"Uniform flow is a special steady case, not the general one." },
          { t:"The blast wave a charge sends through a body of water.", v:"danger", fb:"The equations describe water flow, not explosive shock." } ] },
        { q:"Which two laws do the equations express?", o:[
          { t:"Conservation of mass and of momentum along the channel.", v:"expert", fb:"Mass and momentum are the two governing laws." },
          { t:"Conservation of energy and of temperature in the water.", v:"wrong", fb:"It is momentum, not temperature, alongside mass." },
          { t:"Conservation of mass alone, since momentum can be ignored.", v:"partial", fb:"Momentum cannot be dropped in unsteady flow." },
          { t:"Conservation of the reservoir's charge before a strike.", v:"danger", fb:"The laws are mass and momentum, not a stored charge." } ] },
        { q:"How can these equations test how the dam failed?", o:[
          { t:"A slow seep and a sudden breach send different waves down.", v:"expert", fb:"The downstream wave shape distinguishes breach modes." },
          { t:"The flood wave alone proves a bomb, since only blasts move water.", v:"danger", fb:"Water moves by gravity and release, not only by blasts." },
          { t:"They cannot model dam breaks, so the failure mode is unknowable.", v:"wrong", fb:"Dam-break routing is exactly what these equations do." },
          { t:"Any large wave downstream means the reservoir simply overtopped.", v:"partial", fb:"A breach from within also makes a wave; shape tells them apart." } ] }
      ] },
    // cell: The Clerk @ The Embankment & Abutment
    soilstress:{ sci:"Joseph Boussinesq (1842-1929)", topic:"Stresses in a soil mass", lede:"The mathematician who worked out how a load at the surface spreads its weight into the ground below, in a bulb of stress.", no:10,
      profile:"Joseph Valentin Boussinesq was a French physicist and mathematician who worked across fluid mechanics and the mechanics of solids, and whose name attaches to several ideas an engineer still uses daily. In soil mechanics his most famous result, published in 1885, is the solution for how a load applied at the surface of an elastic body spreads into the ground beneath it. Boussinesq treated the soil as a semi-infinite elastic half-space and calculated the increase in vertical and shear stress at any point below and around a point load. From his solution comes the familiar picture of a stress bulb spreading downward and outward beneath a footing or an embankment.\n\nThis mattered enormously for foundations and earthworks: it let engineers estimate the stresses a structure imposes on the soil, and therefore how much the ground will settle and whether it can safely carry the load. Boussinesq also contributed to turbulence, through the Boussinesq eddy-viscosity idea, and to groundwater flow, but it is his stress-distribution solution that underlies the analysis of any soil mass loaded from above, including the body of an earth dam.\n\nFor this inquiry, Boussinesq helps the board separate a structural collapse from an erosion failure. His equations describe how the weight of the embankment and reservoir distributes stress through the soil, and whether the dam, as a loaded mass, is stable against sliding or crushing. If the numbers show the embankment was comfortably within its strength, so that it was not on the verge of a structural slump, then the dam did not simply fail under load or shrug off in an earthquake. The failure came instead from water moving through and removing the soil, a process that quietly voids the very ground his stresses were relying on.",
      frame:"The Clerk produces a stability calculation. \"On paper this bank was strong enough to stand. So it didn't merely slump under its own weight. Show me you grasp how load moves through soil, and we'll ask what did.\"",
      q:[
        { q:"What did Boussinesq's 1885 solution give engineers?", o:[
          { t:"How a surface load spreads stress into the soil beneath it.", v:"expert", fb:"It gives the stress increase below a surface load." },
          { t:"How fast water seeps through a sand under a pressure head.", v:"wrong", fb:"That is seepage; Boussinesq solved stress distribution." },
          { t:"How much a footing weighs before it is placed on the ground.", v:"partial", fb:"The load is the input; the stress spread is the result." },
          { t:"How large a crater a buried charge blasts through an embankment.", v:"danger", fb:"It is an elastic stress solution, not a blast model." } ] },
        { q:"What is the stress 'bulb' beneath a footing?", o:[
          { t:"The zone of raised stress spreading below a load.", v:"expert", fb:"The bulb is the region of added stress under the load." },
          { t:"The pocket of trapped water that pools below a leaking dam.", v:"wrong", fb:"That is seepage water, not a stress bulb." },
          { t:"The rounded base an engineer digs to seat a heavy footing.", v:"partial", fb:"The bulb is a stress field, not an excavation shape." },
          { t:"The dome of gas an explosion leaves under a soil surface.", v:"danger", fb:"The bulb is elastic stress, not gas from a blast." } ] },
        { q:"How does Boussinesq help rule out a structural collapse?", o:[
          { t:"If stresses stayed within strength, the dam did not slump.", v:"expert", fb:"In-limit stresses point away from a structural slump." },
          { t:"A stable calculation proves only a bomb could break the dam.", v:"danger", fb:"A stable mass can still fail by internal erosion, not a bomb." },
          { t:"Stress cannot be estimated, so a load failure can't be excluded.", v:"wrong", fb:"Soil stresses are calculable; a load failure can be tested." },
          { t:"A strong embankment is immune to every failure, seepage included.", v:"partial", fb:"Strength against load does not stop water removing soil." } ] }
      ] },
    // cell: Surveyor Pine @ The Embankment & Abutment
    stfrancis:{ sci:"William Mulholland (1855-1935)", topic:"The St. Francis Dam & the duty to warn", lede:"The most powerful engineer in California, who inspected a muddy leak one morning and buried a valley by midnight.", no:11,
      profile:"William Mulholland was a self-taught Irish-American engineer who built the Los Angeles Aqueduct and rose to lead the city's water department, one of the most powerful engineers in America. In March 1926 his department completed the St. Francis Dam, a concrete gravity dam north of Los Angeles, to store aqueduct water. Over the next two years the reservoir filled, and cracks and leaks appeared, some carrying muddy water. On the morning of March 12, 1928, Mulholland and his assistant were called to inspect new leaks and judged the dam safe. Just before midnight it failed catastrophically, sending a wall of water down the valley that killed some four hundred and fifty people, one of the worst American civil-engineering disasters of the twentieth century.\n\nInvestigations traced the failure to a defective foundation: one abutment sat on an ancient landslide and weak conglomerate that weakened when saturated, with uplift and possibly internal erosion contributing. Mulholland accepted responsibility before the inquest, famously saying he envied the dead. The disaster reshaped American practice, leading to state oversight of dam safety and independent review.\n\nFor this inquiry, St. Francis is the cautionary twin of the case. Its most haunting detail is the muddy leak inspected and pronounced harmless mere hours before the dam let go. Muddy water is soil on the move; it is the visible signature of internal erosion, and reading it as harmless has killed hundreds. The lesson is a duty to warn and to act: leaks that carry sediment are not nuisances to watch but symptoms to believe. When the same signs appear again, and are again explained away to avoid alarm or expense, the failure is not an unforeseeable act of God. It is a warning refused, exactly as it was at St. Francis.",
      frame:"Pine sets a photograph of a ruined dam on the table. \"Nineteen twenty-eight. Muddy leaks, inspected, called safe. Everyone below was dead by morning. Tell me you know that story, because I think we're living it.\"",
      q:[
        { q:"What warning sign preceded the St. Francis Dam failure?", o:[
          { t:"Muddy leaks, inspected hours before and judged to be safe.", v:"expert", fb:"Muddy leaks, misread as harmless, preceded the break." },
          { t:"A sudden earthquake felt across the valley that same morning.", v:"wrong", fb:"No quake caused it; the failure was in the foundation." },
          { t:"A reservoir brimming far above its rated storage capacity.", v:"partial", fb:"The reservoir was full, but the muddy leaks were the tell." },
          { t:"A saboteur's charge discovered wedged against the abutment.", v:"danger", fb:"There was no sabotage; muddy seepage was the true warning." } ] },
        { q:"What did investigators blame for the collapse?", o:[
          { t:"A defective foundation that weakened as it saturated.", v:"expert", fb:"A weak, saturating foundation caused the failure." },
          { t:"A deliberate act of sabotage against the city's water supply.", v:"danger", fb:"It was a foundation failure, not sabotage." },
          { t:"An overtopping flood that poured across the dam's crest.", v:"wrong", fb:"The dam did not overtop; the foundation gave way." },
          { t:"A flaw in the concrete mix that was used to pour the dam.", v:"partial", fb:"The concrete was less at fault than the ground beneath it." } ] },
        { q:"What lesson does St. Francis hold for this case?", o:[
          { t:"Muddy leaks are escaping soil and must be believed.", v:"expert", fb:"Sediment-laden leaks are symptoms to act on at once." },
          { t:"A dam this size can only be brought down by a planned attack.", v:"danger", fb:"St. Francis was no attack; it was a misread warning." },
          { t:"Muddy water is harmless, so growing leaks can safely be ignored.", v:"wrong", fb:"Muddy water is the opposite of harmless; it is erosion." },
          { t:"Only concrete dams fail this way, so an earth dam is safe from it.", v:"partial", fb:"Earth dams pipe too; the warning applies here as well." } ] }
      ] },
    // cell: Surveyor Pine @ The Embankment & Abutment
    floodnumerics:{ sci:"Lewis Fry Richardson (1881-1953)", topic:"Numerical flood prediction", lede:"The Quaker visionary who dreamed of a factory of human computers forecasting the weather, and taught us to compute a flood instead of fearing it.", no:12,
      profile:"Lewis Fry Richardson was a British scientist of remarkable originality, a physicist, meteorologist, and pacifist, who pioneered predicting natural phenomena by numerical calculation. In his 1922 book 'Weather Prediction by Numerical Process,' he proposed solving the equations of the atmosphere on a grid, advancing the weather forward step by step using finite differences. His own hand calculation famously failed, and he imagined a forecast factory of thousands of human computers working in parallel, a vision realized decades later by electronic computers, which is exactly how weather and floods are forecast today.\n\nRichardson's methods reach well beyond weather. The same finite-difference approach underlies numerical flood modeling: dividing a river or catchment into cells and stepping the flow equations through time to predict how high and how fast water will rise. He also gave us the Richardson number, a measure of flow stability, Richardson extrapolation for improving numerical accuracy, and early insight into turbulence and even the fractal nature of coastlines. He was, above all, a champion of replacing guesswork with computation.\n\nFor this inquiry, Richardson stands for quantifying the flood claim rather than invoking it. 'A thousand-year flood' is a phrase, not a measurement; numerical hydrology can take the actual rainfall and catchment and compute how much water reached the reservoir and how high it rose. If the calculation shows the inflow was well within what the dam had survived many times before, then the storm was not the extraordinary event the dismissal requires. Richardson's discipline turns an act of God into a number that can be checked, and a flood that was ordinary cannot be the reason an ordinary dam suddenly failed from within.",
      frame:"Pine opens a rainfall ledger. \"They keep saying thousand-year storm. That's a feeling, not a figure. Show me you'd rather compute the flood than be frightened by it.\"",
      q:[
        { q:"What did Richardson pioneer in 1922?", o:[
          { t:"Predicting weather by stepping equations over a grid.", v:"expert", fb:"He solved the weather equations numerically on a grid." },
          { t:"Measuring rainfall with a denser network of ground gauges.", v:"wrong", fb:"Better gauges came later; his idea was computation." },
          { t:"Forecasting storms by matching them to past weather charts.", v:"partial", fb:"He computed from physics, not analog matching." },
          { t:"Warning that floods are random and can never be predicted.", v:"danger", fb:"His whole point was that prediction is possible." } ] },
        { q:"How does numerical modeling assess a flood?", o:[
          { t:"It steps the flow equations through cells to compute the rise.", v:"expert", fb:"Cell-by-cell routing computes flood depth and timing." },
          { t:"It proves any large flood must have been engineered by someone.", v:"danger", fb:"Modeling estimates floods; it does not imply sabotage." },
          { t:"It replaces measurement, so no real rainfall data is needed.", v:"wrong", fb:"Models are driven by real rainfall data, not freed of it." },
          { t:"It can rank a flood's size but never estimate how high it rose.", v:"partial", fb:"Models compute stage and depth, not just a ranking." } ] },
        { q:"Why does computing the flood matter to the dismissal?", o:[
          { t:"A flood shown to be ordinary can't explain a sudden failure.", v:"expert", fb:"An ordinary inflow undercuts the freak-flood story." },
          { t:"A rare flood is the only thing that can ever break a sound dam.", v:"danger", fb:"Dams fail from within too, not only from rare floods." },
          { t:"Floods can't be quantified, so 'act of God' can't be disproven.", v:"wrong", fb:"Floods are quantifiable; the claim can be tested." },
          { t:"Any flood at all is enough to excuse the dam, whatever its size.", v:"partial", fb:"Only a flood that overtopped could excuse the dam." } ] }
      ] },
    // cell: Warden Sol @ The Owner's Project Office
    infiltration:{ sci:"Robert E. Horton (1875-1945)", topic:"Infiltration & runoff", lede:"The hydrologist who showed that rain is not flood: most of it soaks in, and only the excess ever reaches the reservoir.", no:13,
      profile:"Robert E. Horton was an American hydraulic engineer and hydrologist often called a father of modern hydrology. Working largely from his own laboratory in Voorheesville, New York, he studied how rainfall is partitioned when it reaches the ground: some soaks in, some is held on the surface, and the rest runs off toward streams. His central concept was infiltration capacity, the maximum rate at which a given soil can absorb water. As rain falls, the soil absorbs it up to that capacity; once the rainfall rate exceeds it, the excess becomes overland flow, now called Hortonian runoff, which gathers into the streams and reservoirs downstream.\n\nHorton captured this in an equation describing how infiltration capacity starts high on dry ground and decays toward a steady rate as the soil saturates, and he developed influential ideas on drainage-basin form and stream networks, known as Horton's laws of stream order. His work made it possible to estimate, from a storm and a catchment, how much water would actually reach a reservoir, the essential first step in any flood analysis.\n\nFor this inquiry, Horton supplies the front end of the flood question. Before anyone can claim the reservoir was overwhelmed, they must estimate how much of the storm's rain became runoff and flowed in, and that depends on infiltration, soil, and antecedent wetness, all things Horton quantified. If the catchment absorbed much of the rain and the runoff was moderate, the inflow to the reservoir was moderate too, and the freak flood loses its water. Horton keeps the board honest about how much water there really was, so the dismissal cannot hide behind a storm that never delivered the flood it is blamed for.",
      frame:"Sol shakes rain off his hat. \"Rain isn't flood. Most of it soaks in. Before you tell me the reservoir was overrun, show me you know how much of a storm even reaches the water.\"",
      q:[
        { q:"What is infiltration capacity?", o:[
          { t:"The fastest rate at which a soil can soak up falling rain.", v:"expert", fb:"It is the maximum rate soil can absorb water." },
          { t:"The total volume of water a reservoir can hold behind a dam.", v:"wrong", fb:"That is storage, not infiltration capacity." },
          { t:"The share of rainfall that runs straight off into the streams.", v:"partial", fb:"Runoff is the leftover once capacity is exceeded." },
          { t:"The speed at which a leak bores a pipe through an embankment.", v:"danger", fb:"That is piping, an unrelated seepage process." } ] },
        { q:"What becomes 'Hortonian' overland flow?", o:[
          { t:"Rain that falls faster than the soil can absorb it.", v:"expert", fb:"Runoff is rainfall in excess of infiltration capacity." },
          { t:"Water that seeps deep underground to feed a distant spring.", v:"wrong", fb:"That is deep percolation, not overland flow." },
          { t:"The full amount of rain that lands on the catchment area.", v:"partial", fb:"Only the excess over infiltration runs off, not all of it." },
          { t:"The surge released when a dam bursts across the valley floor.", v:"danger", fb:"That is a dam-break wave, not rainfall runoff." } ] },
        { q:"How does infiltration bear on the flood theory?", o:[
          { t:"Modest runoff means modest inflow, so no overwhelming flood.", v:"expert", fb:"If little ran off, the reservoir inflow was moderate." },
          { t:"Any heavy rain guarantees a flood able to overtop any dam.", v:"danger", fb:"Rain soaks in; heavy rain need not overtop a dam." },
          { t:"All rain becomes runoff, so every storm floods the reservoir.", v:"wrong", fb:"Much rain infiltrates; not all becomes runoff." },
          { t:"Infiltration only matters in droughts, never during a big storm.", v:"partial", fb:"Infiltration governs runoff in big storms too." } ] }
      ] },
    // cell: Warden Sol @ The Owner's Project Office
    openchannel:{ sci:"Ven Te Chow (1919-1981)", topic:"Open-channel hydraulics", lede:"The scholar who gathered a century of channel science into one book, and put a real probability behind the phrase 'thousand-year flood.'", no:14,
      profile:"Ven Te Chow was a Chinese-American engineer and professor at the University of Illinois who became one of the twentieth century's most influential authorities on open-channel flow and hydrology. His 1959 textbook 'Open-Channel Hydraulics' and his 1964 'Handbook of Applied Hydrology' organized and standardized the field for generations of engineers, drawing together the work of Chezy, Manning, Saint-Venant, and others into a coherent, usable discipline. He wrote with unusual clarity about gradually and rapidly varied flow, the hydraulics of channel transitions, and the behavior of spillways and control structures.\n\nChow also advanced the statistical side of hydrology, the frequency analysis that assigns a probability to floods. Behind every phrase like 'the hundred-year flood' lies a frequency analysis of the kind Chow systematized: a flood of a given size has a certain annual probability of being equaled or exceeded, estimated from records and fitted distributions. This is how engineers size spillways to a chosen risk, and how they judge, after the fact, how rare a given flood really was.\n\nFor this inquiry, Chow ties together the water side of the case. His open-channel hydraulics let the board evaluate whether the spillway performed as designed, and his flood-frequency methods let them judge the storm honestly: was it truly the thousand-year event the dismissal needs, or a flood well within the record? A spillway that functioned and a flood of unremarkable frequency together drain the act of God explanation dry. Chow's careful accounting insists that both the structure and the storm be measured against known standards before anyone declares the failure unforeseeable.",
      frame:"Sol points a thumb at the office files. \"Somewhere in there is the real number for that storm and that spillway. Show me you can size a flood by the record, not by the panic.\"",
      q:[
        { q:"What did Chow's 1959 book organize?", o:[
          { t:"The field of open-channel flow into one usable discipline.", v:"expert", fb:"He systematized open-channel hydraulics for engineers." },
          { t:"The design rules for concrete gravity dams and their piers.", v:"wrong", fb:"That is dam structural design, a different subject." },
          { t:"The classification of soils by their grain-size distribution.", v:"partial", fb:"Soil grading is geotechnics, not Chow's channel work." },
          { t:"The methods for demolishing dams with placed explosives.", v:"danger", fb:"Chow wrote on flow, not on demolition." } ] },
        { q:"What does flood-frequency analysis provide?", o:[
          { t:"The annual probability that a flood of a size is exceeded.", v:"expert", fb:"It gives a flood's annual exceedance probability." },
          { t:"The exact date the next large flood will strike the valley.", v:"wrong", fb:"It gives probability, never a specific future date." },
          { t:"The average depth of rain a catchment sees in a typical year.", v:"partial", fb:"That is mean rainfall, not flood frequency." },
          { t:"The certainty that a rare flood caused any given dam to fail.", v:"danger", fb:"Frequency ranks floods; it does not assign blame." } ] },
        { q:"How does Chow's work test the 'act of God' claim?", o:[
          { t:"It measures the storm's rarity and the spillway's function.", v:"expert", fb:"Rarity and spillway function are both quantifiable." },
          { t:"It shows only a freak flood could ever break a well-built dam.", v:"danger", fb:"Dams also fail from within, not only from freak floods." },
          { t:"It proves floods are unknowable, so no failure is foreseeable.", v:"wrong", fb:"Floods are quantifiable, so foreseeability can be judged." },
          { t:"It confirms any failed dam must have met a record-breaking flood.", v:"partial", fb:"Many dams fail without any record flood at all." } ] }
      ] },
    // cell: The Clerk @ The Owner's Project Office
    seismicdam:{ sci:"Nathan M. Newmark (1910-1981)", topic:"Earthquake design of dams", lede:"The engineer who stopped asking whether a dam would survive a quake and started asking how far it would move, and what a quake's damage looks like.", no:15,
      profile:"Nathan M. Newmark was an American engineer at the University of Illinois who shaped the field of earthquake engineering and structural dynamics. He devised the Newmark-beta method, a numerical technique for integrating the equations of motion that is still used to compute how structures respond to dynamic loads, and he developed the design concept of response spectra for earthquake-resistant design. For dams and embankments his most influential contribution was the sliding-block method, introduced in his 1965 Rankine Lecture: rather than ask merely whether a slope is stable, he asked how far it would move during an earthquake, modeling the sliding mass as a block that slips whenever ground acceleration exceeds a yield threshold and accumulating its displacement over the shaking.\n\nThis shifted seismic dam engineering from a yes-or-no factor of safety to an estimate of permanent deformation: inches of slumping the dam could tolerate, or feet it could not. Newmark's approach let engineers judge whether a given earthquake would merely nudge an embankment or slide it apart, and it remains central to how earth dams are assessed for seismic safety.\n\nFor this inquiry, Newmark is the expert witness against the earthquake overclaim. A seismic failure has a signature: it is tied to a recorded ground motion at a specific instant, and it produces characteristic deformation such as cracking, slumping, and lateral spreading, all occurring during the shaking. If no earthquake of consequence was recorded, and the damage pattern is not seismic slumping but a concentrated erosion channel that grew over months, then Newmark's own framework rules the quake out. His methods do not just design against earthquakes; they let an investigator recognize when an earthquake was, and was not, the cause.",
      frame:"The Clerk produces the seismograph log for the district. \"If it was a quake, the ground wrote it down, and the damage would look a certain way. I'd like you to know what a seismic failure actually looks like.\"",
      q:[
        { q:"What does Newmark's sliding-block method estimate?", o:[
          { t:"How far an embankment slides during an earthquake's shaking.", v:"expert", fb:"It computes permanent seismic displacement of the mass." },
          { t:"The magnitude of the earthquake a fault is capable of producing.", v:"wrong", fb:"That is seismology, not the sliding-block method." },
          { t:"Whether a slope's factor of safety is above or below one.", v:"partial", fb:"It moves beyond a yes/no factor to a displacement." },
          { t:"The size of the charge needed to slump a dam deliberately.", v:"danger", fb:"It is a seismic tool, not a demolition estimate." } ] },
        { q:"How did Newmark reframe seismic slope safety?", o:[
          { t:"From a yes-or-no safety factor to inches of movement.", v:"expert", fb:"He asked how much a slope moves, not just if it's stable." },
          { t:"From soil strength to the concrete quality of the core.", v:"wrong", fb:"His shift was about displacement, not concrete." },
          { t:"From displacement back to a single factor of safety.", v:"partial", fb:"He moved toward displacement, not back to a factor." },
          { t:"From engineering to guessing, since quakes defy analysis.", v:"danger", fb:"He made quakes analyzable, not a matter of guessing." } ] },
        { q:"How does Newmark's work weigh against an earthquake cause?", o:[
          { t:"A quake leaves a timed jolt and slumping, not a slow channel.", v:"expert", fb:"Seismic failure is timed and slumps; piping is slow." },
          { t:"Any dam failure is proof a quake struck, recorded or not.", v:"danger", fb:"No recorded quake means a quake is not the cause." },
          { t:"Earthquakes leave no trace, so a quake can never be ruled out.", v:"wrong", fb:"Earthquakes are recorded and leave clear damage." },
          { t:"A seismic failure and a piping failure look exactly alike.", v:"partial", fb:"They differ: seismic slumping versus an erosion pipe." } ] }
      ] },
    // cell: The Clerk @ The Owner's Project Office
    damdesign:{ sci:"Julian Hinds (1881-1977)", topic:"Gravity & earth-dam design", lede:"The Reclamation engineer who wrote the book on how a safe dam fits together, each part guarding against one way to die.", no:16,
      profile:"Julian Hinds was an American civil engineer who spent much of his career with the U.S. Bureau of Reclamation and on major water projects, and who co-authored the classic text 'Engineering for Dams' (1945) with William Creager and Joel Justin. He worked on the era's great dams, including as an engineer associated with the Colorado River projects that led to Hoover Dam, and he became a leading authority on the design of both concrete gravity dams and earth-fill embankments. His writing set out, in practical detail, how the pieces of a safe dam fit together.\n\nHinds understood a dam as a system of defenses. A gravity dam resists water by its sheer weight, and must be checked against sliding, overturning, and the uplift pressure of water seeping beneath it. An earth dam must have adequate freeboard so waves and floods cannot overtop it, a spillway large enough to pass the design flood, an impervious core to limit seepage, and, vitally, internal filters and drains to carry seepage away safely without moving soil. Each element guards against a specific way a dam can fail.\n\nFor this inquiry, Hinds lets the board audit the dam against how it should have been built and maintained. Overtopping is prevented by freeboard and spillway capacity; internal erosion is prevented by the core, filters, and drains. If the freeboard and spillway were adequate, a flood did not overtop the dam; if the seepage ran muddy and growing, the internal defenses, the very filters and drains Hinds insisted on, were failing or absent. Checking the design element by element separates a dam killed from outside by water it could not pass from a dam killed from inside by seepage it could not safely carry.",
      frame:"The Clerk opens the design drawings. \"A proper dam has a filter, a drain, a core, a freeboard, each stopping one kind of death. Let's see which of these this dam actually had before we call it fate.\"",
      q:[
        { q:"In Hinds's view, what is an earth dam?", o:[
          { t:"A system of defenses, each guarding one way it can fail.", v:"expert", fb:"Freeboard, core, filters, and drains each guard a failure mode." },
          { t:"A solid mound of clay that keeps water out by mass alone.", v:"wrong", fb:"An earth dam is layered defenses, not one mass of clay." },
          { t:"A core wall whose only real job is to block all seepage.", v:"partial", fb:"The core is one defense; filters and drains matter too." },
          { t:"A fragile bank that any determined attacker can breach.", v:"danger", fb:"Dams fail mostly from water and seepage, not attackers." } ] },
        { q:"What prevents an earth dam from overtopping?", o:[
          { t:"Enough freeboard and spillway to pass the design flood.", v:"expert", fb:"Freeboard plus spillway capacity stop overtopping." },
          { t:"A charge-proof crest that no saboteur can blow open.", v:"danger", fb:"Overtopping is about water level, not sabotage." },
          { t:"A deep impervious core running down through the dam.", v:"wrong", fb:"The core limits seepage; freeboard stops overtopping." },
          { t:"A downstream filter that carries the seepage safely away.", v:"partial", fb:"Filters stop erosion, not overtopping." } ] },
        { q:"What defends against internal erosion?", o:[
          { t:"An impervious core with filters and drains behind it.", v:"expert", fb:"Core, filters, and drains stop internal erosion." },
          { t:"A tall freeboard above the reservoir's normal level.", v:"wrong", fb:"Freeboard stops overtopping, not internal erosion." },
          { t:"A wide spillway able to pass the largest design flood.", v:"partial", fb:"A spillway handles floods, not seepage erosion." },
          { t:"A steel liner strong enough to resist a planted charge.", v:"danger", fb:"Erosion is stopped by filters, not armor against bombs." } ] }
      ] },
    // cell: Surveyor Pine @ The Owner's Project Office
    damsafety:{ sci:"John R. Freeman (1855-1932)", topic:"Hydraulics & dam safety", lede:"The insurance engineer who counted the true cost of a failure, and warned that shelving a repair to save money is a gamble with lives downstream.", no:17,
      profile:"John Ripley Freeman was an American hydraulic engineer whose career bridged fire-protection engineering, insurance, and the science of water. As an engineer for the factory mutual insurance companies, he learned to think about catastrophic risk in hard financial terms: how failures happen, what they cost, and how inspection and design prevent them. He became a leading consulting hydraulic engineer, advised on major water and flood projects, and was a tireless advocate for putting hydraulics on a rigorous, experimental footing, endowing and promoting hydraulic laboratories so that structures could be tested on models before they were built at full scale.\n\nFreeman brought an underwriter's clear eye to dam safety: a dam is a stored hazard whose risk must be actively managed through sound design, honest inspection, and prompt maintenance. He understood that the costs of prevention are small and knowable, while the costs of failure are catastrophic and borne by the people downstream. His insurance background made him unusually alert to the temptation to defer maintenance to save money, and to the way that deferral quietly transfers risk onto others.\n\nFor this inquiry, Freeman speaks to motive and duty. His whole philosophy holds that a dam owner carries an ongoing obligation to inspect, to test, and to repair, and that shelving a needed repair to protect a budget is not thrift but a gamble with lives downstream. When inspection reports flag growing seepage and the recommended repairs are quietly filed away as too costly, that is precisely the failure of stewardship Freeman warned against. It points the board not to an unforeseeable disaster but to a decision, made in an office, over money, to let a known danger ride.",
      frame:"Pine sets down a shelved repair order. \"Freeman treated a dam like a debt that comes due. Someone here decided a repair cost too much. Show me you understand a safety duty, and I'll show you who signed.\"",
      q:[
        { q:"How did Freeman's insurance background shape his view?", o:[
          { t:"He weighed cheap prevention against ruinous failure cost.", v:"expert", fb:"He saw prevention as cheap and failure as ruinous." },
          { t:"He judged dams only by how gracefully their spillways looked.", v:"wrong", fb:"He judged dams by risk and safety, not appearance." },
          { t:"He believed dams should never be inspected once completed.", v:"partial", fb:"He insisted on ongoing inspection, not a one-time check." },
          { t:"He held that failures are pure chance and cannot be managed.", v:"danger", fb:"He held failure is manageable, not mere chance." } ] },
        { q:"What did Freeman promote to make hydraulics rigorous?", o:[
          { t:"Hydraulic laboratories to test designs on models first.", v:"expert", fb:"He championed model testing in hydraulic labs." },
          { t:"Bigger dams built quickly to outrun any possible flood.", v:"wrong", fb:"Speed and size were not his answer; testing was." },
          { t:"More inspectors sent out only after a dam had failed.", v:"partial", fb:"He wanted inspection before failure, not after." },
          { t:"Armed guards to protect every dam against sabotage.", v:"danger", fb:"His concern was engineering rigor, not guards." } ] },
        { q:"How does Freeman's view frame a shelved repair?", o:[
          { t:"As a gamble with downstream lives, not honest thrift.", v:"expert", fb:"Deferring a known repair transfers risk onto others." },
          { t:"As proof the failure was an accident no one could prevent.", v:"danger", fb:"A shelved repair makes the failure foreseeable, not fated." },
          { t:"As sensible saving, since repairs rarely change a dam's fate.", v:"wrong", fb:"Deferred maintenance is a gamble, not a saving." },
          { t:"As a minor lapse, since owners owe no real duty to inspect.", v:"partial", fb:"Owners carry a real, ongoing duty to inspect and repair." } ] }
      ] },
    // cell: Surveyor Pine @ The Owner's Project Office
    fluidmech:{ sci:"Hunter Rouse (1906-1996)", topic:"Fluid mechanics & hydraulics", lede:"The father of modern American hydraulic education, who insisted that muddy water is mechanics, not mystery.", no:18,
      profile:"Hunter Rouse was an American engineer widely regarded as the father of modern hydraulic engineering education in the United States. As director of the Iowa Institute of Hydraulic Research, he blended rigorous fluid mechanics with careful experiment and clear teaching, and his textbooks, including 'Elementary Mechanics of Fluids,' trained a generation of engineers to reason from fundamental principles rather than empirical rules of thumb. With Simon Ince he also wrote 'History of Hydraulics,' preserving the lineage from Archimedes and Pascal through Chezy, Darcy, and Manning to the modern era.\n\nRouse's science covered turbulence, boundary layers, energy dissipation, and, of particular relevance here, the mechanics of sediment transport and local scour: how moving water picks up, carries, and deposits soil, and how it erodes around structures. He insisted that hydraulic problems be understood through the underlying physics of the flow, and he brought experimental precision to phenomena long treated by guesswork, making him a bridge between the empirical past and the analytical present of the field.\n\nFor this inquiry, Rouse is the capstone that ties the water and the soil together. Internal erosion is, at bottom, sediment transport inside a dam: seeping water exerting enough force to entrain soil grains and carry them away, exactly the physics Rouse studied. His insistence on understanding the mechanism, meaning the flow, the force, and the moving particle, is what lets the board reject both easy stories. A blast or a freak flood is a headline; the actual failure is a slow, physical, traceable process of water removing soil from within, obeying the same fluid mechanics Rouse taught the field to take seriously. The evidence is muddy water, and muddy water is mechanics, not mystery.",
      frame:"Pine caps her pen. \"Everything in this room comes down to water moving soil. Show me you'll trust the mechanics over the melodrama, and I'll sign my name to what the instruments said.\"",
      q:[
        { q:"What was Hunter Rouse best known for?", o:[
          { t:"Grounding hydraulic engineering in rigorous fluid mechanics.", v:"expert", fb:"He built modern hydraulics education on fluid mechanics." },
          { t:"Designing the tallest concrete gravity dams of his century.", v:"wrong", fb:"He was an educator and researcher, not a dam designer." },
          { t:"Cataloging rivers by the shape of their drainage networks.", v:"partial", fb:"Stream ordering was Horton's work, not Rouse's." },
          { t:"Proving that scour and erosion can never be predicted at all.", v:"danger", fb:"Rouse showed scour follows analyzable physics." } ] },
        { q:"Which topic that Rouse studied bears on piping?", o:[
          { t:"Sediment transport: how flowing water carries soil away.", v:"expert", fb:"Piping is sediment transport driven by seepage force." },
          { t:"The freezing of water inside cracks during winter cold snaps.", v:"wrong", fb:"Freeze-thaw is a different process from piping." },
          { t:"The pressure a still reservoir exerts against a dam face.", v:"partial", fb:"Static pressure sets up seepage, but transport moves the soil." },
          { t:"The shock a blast transmits through a saturated soil mass.", v:"danger", fb:"Piping is a flow process, not a blast phenomenon." } ] },
        { q:"Why does Rouse's mechanics defeat both easy stories?", o:[
          { t:"It shows failure as water moving soil: physics, not headline.", v:"expert", fb:"Piping is analyzable sediment mechanics, not melodrama." },
          { t:"It shows only a bomb could move that much soil so fast.", v:"danger", fb:"Seepage moves soil slowly; no bomb is required." },
          { t:"It proves erosion is random, so any cause is as likely as another.", v:"wrong", fb:"Erosion follows physics; it is not random." },
          { t:"It confirms the failure could only have been a giant flood.", v:"partial", fb:"A flood overtops; piping works from within instead." } ] }
      ] }
  },
  STORIES:{
    warden:{
      spillway:"Sol meets you at the spillway apron, boots caked in silt. \"They built this chute to swallow a storm, and swallow one it did; I watched it work. So don't tell me the river came over the top. Know your hydraulics and I'll tell you what I saw lower down.\"",
      embankment:"Sol crouches at the toe of the bank, prodding the wet ground. \"Here's where I do my walking. This soil's been weeping for months, and lately it weeps mud. Show me you understand a dam's insides and I'll walk you through my whole logbook.\"",
      office:"Sol looks uneasy under the office lights. \"I do my reading outdoors, not in a filing room. But the numbers that could have saved us are in here. Prove you can handle them and I'll say where I'd look.\""
    },
    clerk:{
      spillway:"The Clerk has followed the paper trail out to the spillway. \"Every gauge reading became a form, and every form found a drawer. Convince me you understand the flow, and I'll tell you which forms went missing.\"",
      embankment:"The Clerk stands stiffly on the crest, a folder clutched tight. \"I don't like it up here; I like it filed. But the reports describe this bank, and they don't match the calm face of it. Show me you can read soil and I'll read you the reports.\"",
      office:"The Clerk is finally at home among the cabinets. \"This is where the inspection reports live, and the change-orders that overruled them. Satisfy me you grasp the engineering, and I'll show you whose signature closed each one.\""
    },
    surveyor:{
      spillway:"Pine has set up a level near the spillway, one eye to the scope. \"I measure things for a living, so I don't guess about floods. This channel had room to spare. Show me you'd rather compute than panic, and I'll share my figures.\"",
      embankment:"Pine kneels by a settlement gauge on the crest, frowning at the reading. \"This pin has moved more this season than in five years before. That means something inside is changing. Prove you understand a dam's mechanics and I'll show you every gauge.\"",
      office:"Pine spreads her survey notes across the office table. \"My instruments told a story all year. Someone in this room decided it wasn't worth the repair. Show me you can read what they read, and I'll show you what they filed.\""
    }
  },
  story:[
    "The <b>Marrow Valley Dam</b> stood above the town for forty years, an earth embankment holding back a reservoir the valley had long since stopped noticing. Then, a few minutes past midnight, it let go, not with a roar from the sky but from somewhere inside itself, and the water took the streets below while people slept. You are <b>Inspector Dale Ferran</b>, sent to hold the inquiry no one downstream will forgive you for getting wrong.",
    "<b>Three people will talk to you</b>, each holding a corner of the truth. <b>Warden Sol</b>, the downstream warden, walks the toe of the dam every week and kept a logbook of a leak that would not stop growing. <b>The Clerk</b> is keeper of the inspection reports and the change-orders that quietly overruled them. And <b>Surveyor Pine</b> reads the instruments on the crest, and watched the settlement gauges begin to move. Earn their trust with what you know, and they will open their records.",
    "<b>Someone here is behind it.</b> Three names wait in your notepad: <b>Cass Herrick</b>, who owns the dam; <b>the chief engineer</b>, who built and ran it; and <b>the state dam inspector</b>, who was meant to catch what went wrong. Every column of the case, <b>who</b> is behind it, <b>where</b> it culminates, and <b>what</b> truly happened, hides a tempting wrong answer. The town wants a villain: <b>sabotage, or an earthquake</b> that struck in the dark. The insurers want an <b>act of God, a freak thousand-year flood</b> no one could have foreseen. The truth is quieter than the first and graver than the second, and it has left its signature in mud and paper for anyone willing to read it.",
    "You have <b>8 days</b> and a single accusation to make. Name it well and a shelved report becomes proof that saves the next valley; name it wrong and a real, preventable failure is buried under a headline or written off as fate."
  ],
  endings:{ overclaimWhat:"attack", dismissalWhat:"flood",
    win:{
      expertTitle:"What the Mud and the Paper Prove",
      expert:["Ferran names it exactly: Cass Herrick, the dam's owner, who shelved the repairs to protect a budget; the truth culminating in the Owner's Project Office, where the inspection reports and the overruling change-orders sit side by side; and a concealed internal erosion, piping, that carried the embankment away from within, one muddy leak at a time. Not a bomb. Not an act of God.",
        "Every card accounted for. Ferran walked the toe with the warden, read the crest gauges with the surveyor, and matched the clerk's filed reports to the change-orders that buried them. The finding rests on no melodrama and blames no phantom: it names a known, growing, ignored danger and the office where the decision to ignore it was made. That is what lets the next valley downstream sleep."],
      soundTitle:"Right, but Lightly Proven",
      sound:["Ferran names the right three: Herrick, the Owner's Project Office, and a concealed internal erosion that piped the dam out from inside. The shape of the case is correct, and the refusal to cry sabotage or shrug at a freak flood is exactly right.",
        "But too many threads were left loose, and the owner's lawyers will pull at them. A few more days tracing the muddy seepage to the shelved repair orders would have made the finding unassailable. Close and honest, if not yet airtight."],
      namedTitle:"The Right Answer, Unearned",
      named:["Ferran names the truth, Herrick, the Owner's Project Office, the internal erosion that hollowed the dam, but gathered too little to back it. It reads like a hunch that happened to land.",
        "An inquiry cannot condemn an owner and clear a valley on an accusation this thin, however correct. Being right is not the same as being able to prove it to the people who will fight the finding in every court they can reach."]
    },
    overclaim:{ title:"The Inquiry That Cried Sabotage",
      body:["Ferran reports an attack, sabotage or an earthquake in the dark, the villain the town was already demanding. It is vivid, and it is not what the evidence shows.",
        "No seismograph recorded a jolt, no blast scarred the embankment, and the dam did not fail all at once. What the records show is a leak that grew muddy over months, gauges that crept, and repair orders quietly shelved. When the sabotage story collapses, it takes the inquiry's credibility with it, and the real, provable failure at the Owner's Project Office is dismissed as just another conspiracy theory. The only saboteur was water, patiently removing soil no one would pay to protect."] },
    dismissal:{ title:"Case Closed on the Weather",
      body:["Ferran files it as an act of God, a freak thousand-year flood, nothing anyone could have foreseen, close the file. It is the comfortable answer, and it misses the graver truth.",
        "The spillway had room to spare and the storm never topped the crest; the water did not come over the dam but through it, along a channel that internal erosion had been widening for months while the warnings sat in a drawer. Blaming the sky leaves the same flaw in every dam whose owner would rather file a report than fix it. The inquiry saw the flood downstream and never the office upstream, where the danger was known and shelved."] },
    wrongNames:{ title:"So Close",
      body:["Ferran has the nature of it cold: a concealed internal erosion that piped the embankment out from within, neither a bomb nor a freak flood. But the finger lands on the wrong name or the wrong room, and the inquiry cannot rest there."] } },
}};