// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"m_tunnel", title:"The Kingsgate Bore", discipline:"Tunnelling & Ground Engineering",
  teaser:"A metro tunnel under the city caved in and swallowed the street above. A gas explosion underground? A freak sinkhole in old ground? Or monitoring that was switched off?", overclaimTag:"a gas explosion", truthTag:"cut grouting and ignored settlement gauges",
  venue:"the Kingsgate tunnel inquiry", agent:{name:"Inspector Mabel Crane", role:"Investigator's Notepad"},
  standingLabel:"Inquiry credibility", readingShort:"Pioneers", readingLabel:"Tunnelling & Ground Pioneers",
  dossierName:"TUNNELLING & GROUND-ENGINEERING PIONEERS", enterLabel:"Open the inquiry", subt:"A deduction game inside the Kingsgate tunnel inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"FILL: one italic sentence warning off the overclaim (a gas explosion) toward the truth, WITHOUT naming the true WHAT.",
  CATS:{
    who:{ title:"Who is behind it", truth:"tn_contractor", items:[
      {id:"tn_contractor", label:"Emil Radek — tunnelling contractor"},
      {id:"tn_engineer", label:"The tunnel design engineer"},
      {id:"tn_inspector", label:"The transit-authority inspector"} ]},
    where:{ title:"Where it culminates", truth:"tn_office", items:[
      {id:"tn_face", label:"The Tunnel Face & TBM"},
      {id:"tn_surface", label:"The Surface & Settlement Markers"},
      {id:"tn_office", label:"The Contractor's Site Office"} ]},
    what:{ title:"What is happening", truth:"tn_settlement", items:[
      {id:"tn_explosion", label:"A gas explosion in the bore"},
      {id:"tn_sinkhole", label:"A freak natural sinkhole — an act of God"},
      {id:"tn_settlement", label:"Cut grouting and ignored ground-settlement monitoring"} ]}
  },
  PLACES:{
    tn_face:{name:"The Tunnel Face & TBM", xy:[140,90]},
    tn_surface:{name:"The Surface & Settlement Markers", xy:[330,240]},
    tn_office:{name:"The Contractor's Site Office", xy:[520,90]}
  },
  EDGES:[["tn_face","tn_surface"],["tn_surface","tn_office"]],
  CHARACTERS:{
    tn_miner:{ name:"Miner Jud Kolb", role:"Tunnel-face miner", face:"⛏", badge:"J", legend:"the tunnel face", hint:"Works the shield; watched the grout runs cut short to keep the machine moving." },
    tn_surveyor:{ name:"The Monitoring Surveyor", role:"Ground-settlement surveyor", face:"📐", badge:"S", legend:"the surface", hint:"Reads the surface markers; the settlement gauges were climbing for days." },
    tn_clerk:{ name:"The Clerk", role:"Site records clerk", face:"🗂", badge:"C", legend:"the office", hint:"Keeps the logs — and the memo that halved the grouting to hold the schedule." }
  },
  TOPICMAP:{
    tn_face:{ tn_miner:["tn_marcbrunel","tn_barlow"], tn_surveyor:["tn_greathead","tn_moir"], tn_clerk:["tn_rabcewicz","tn_muller"] },
    tn_surface:{ tn_miner:["tn_stini","tn_robbins"], tn_surveyor:["tn_muirwood","tn_mair"], tn_clerk:["tn_berigny","tn_proctor"] },
    tn_office:{ tn_miner:["tn_barton","tn_bieniawski"], tn_surveyor:["tn_kerisel","tn_deere"], tn_clerk:["tn_hoek","tn_westergaard"] }
  },
  TOPICS:{
    // cell: Miner Jud Kolb @ The Tunnel Face & TBM
    tn_marcbrunel:{ sci:"Marc Isambard Brunel (1769-1849)", topic:"The tunnelling shield", lede:"The émigré engineer who watched a shipworm chew through oak and copied its armored head to drive the first tunnel under a river.", no:1,
      profile:"Marc Isambard Brunel was a French-born engineer who, after fleeing the Revolution and building a career in Britain, solved one of the oldest problems in civil engineering: how to dig through soft, waterlogged ground without the roof collapsing on the miners. His inspiration was biological. Watching the shipworm Teredo navalis bore through ship timber, its soft body shielded by hard plates at the head while it lined the hole behind it, he patented in 1818 a tunnelling shield that did the same for men.\n\nBrunel's shield was a great iron frame divided into cells, one miner to each, that held back the earth at the face while workers removed a board's width of soil at a time. As the shield inched forward on screws, bricklayers followed immediately behind, building the permanent lining before the ground could move. With it he drove the Thames Tunnel between Rotherhithe and Wapping from 1825 to 1843 — the first tunnel successfully built beneath a navigable river — through gravel, quicksand, and repeated floods that nearly killed his son Isambard Kingdom Brunel.\n\nFor this board, Brunel is the origin of one unbreakable principle: in soft ground the tunnel is a race between excavation and support, and support must never fall behind. His shield exists because unsupported soft ground does not stay up — it flows, it settles, it seeks the surface. So when a street collapses over a modern bore, Brunel's ghost asks the plainest question first: was the ground held as fast as it was opened? A gas blast is loud and a sinkhole sounds like fate, but the older, quieter answer is that the support fell behind the dig.",
      frame:"Kolb rests a hand on the shield ram. \"This machine only earns its keep if the lining goes in as fast as we cut. Tell me you know why the shield was ever built, and I'll tell you what we skipped.\"",
      q:[
        { q:"What problem did Brunel's shield solve?", o:[
          { t:"Holding soft, wet ground at the face until the lining went in behind.", v:"expert", fb:"The shield's whole point was supporting the face while the lining was built." },
          { t:"Sniffing out pockets of explosive gas well before miners ever reached them.", v:"danger", fb:"The shield handled ground collapse, not gas; that is a different hazard." },
          { t:"Cutting through hard rock far faster than hand tools and black powder could.", v:"wrong", fb:"The shield was for soft, flowing ground, not for hard-rock excavation." },
          { t:"Pumping the water out so the tunnel could be dug completely dry throughout.", v:"partial", fb:"Water was a constant enemy, but the shield's job was holding the ground." } ] },
        { q:"How did Brunel copy the shipworm?", o:[
          { t:"A hard front shielded the diggers while lining was placed in the bored hole.", v:"expert", fb:"Armored head, immediate lining behind — exactly the worm's method." },
          { t:"A drill bit shaped like the worm's jaws chewed the clay into fine paste.", v:"wrong", fb:"He copied the worm's protection and lining, not a jaw-shaped bit." },
          { t:"A chemical the worm secretes was reproduced to soften rock ahead of the face.", v:"wrong", fb:"There was no chemical; the idea was mechanical shielding and lining." },
          { t:"The worm's speed was matched so the tunnel advanced many feet each day.", v:"partial", fb:"Progress was slow; the borrowed idea was armor and lining, not speed." } ] },
        { q:"What does Brunel's principle tell this inquiry?", o:[
          { t:"In soft ground, support must keep pace with the dig or the surface pays.", v:"expert", fb:"Support falling behind the excavation is the classic soft-ground failure." },
          { t:"A collapse over a bore is nearly always a buried gas main going off.", v:"danger", fb:"Gas is the loud guess; unsupported ground is the older, likelier cause." },
          { t:"Soft ground stands on its own for weeks, so support timing hardly matters.", v:"wrong", fb:"Soft ground does not stand alone; that is precisely why the shield exists." },
          { t:"Once the shield passes, the ground behind it is safe and needs no more work.", v:"partial", fb:"The lining and its grouting behind the shield are what keep it safe." } ] }
      ] },
    // cell: Miner Jud Kolb @ The Tunnel Face & TBM
    tn_barlow:{ sci:"Peter W. Barlow (1809-1885)", topic:"The cylindrical tunnelling shield", lede:"The railway engineer who turned Brunel's clumsy rectangular frame into a simple iron circle — the shape every soft-ground tunnel has kept ever since.", no:2,
      profile:"Peter William Barlow was a British civil engineer, known first for his railway and suspension-bridge work, who made a decisive improvement to the tunnelling shield. Brunel's Thames Tunnel had proved a shield could work, but its rectangular frame was cumbersome, and a square bore concentrates stress badly in soft ground. Barlow patented, in the 1860s, a circular shield — a plain iron cylinder pushed forward by screw jacks while a ring of iron segments was bolted up behind it to form the lining.\n\nThe circle was the insight. A round tunnel in soft ground behaves like an arch turned all the way around: the earth's pressure is carried in compression through the ring, where iron and later concrete are strongest, rather than bending a flat roof. In 1869 Barlow and his engineer James Henry Greathead used this method to drive the Tower Subway beneath the Thames — a small cast-iron tube barely two metres across — quickly and cheaply, proving the circular shield and bolted iron lining that the deep London 'tube' railways would soon adopt wholesale.\n\nFor this board, Barlow marks the birth of the modern lined bore: a ring of segments erected right at the shield's tail, immediately behind the cut. That immediacy is the safeguard. The gap between the excavated diameter and the lining — the annulus — must be filled at once, or the ground around it relaxes inward and the settlement travels up to the street. Barlow's circle tells the investigator that a well-built bore does not simply fall in. If the ground above one gave way, the question is whether that ring and its filling were completed as designed, or quietly shortchanged.",
      frame:"Kolb taps a curved lining segment. \"Round holds; square doesn't. But a ring's only as good as what you pack behind it. Show me you know why we bore circles, and I'll tell you about the packing.\"",
      q:[
        { q:"Why is a circular tunnel better in soft ground?", o:[
          { t:"The ring carries the earth's pressure in compression, like an arch turned round.", v:"expert", fb:"A circle loads the lining in compression, where it is strongest." },
          { t:"A round bore lets explosive gas vent upward instead of pooling at the crown.", v:"danger", fb:"The circle is about structural loading, not gas venting at all." },
          { t:"A circle is simply cheaper to draw, with no real effect on how loads travel.", v:"wrong", fb:"The shape changes the load path fundamentally; it is not just cosmetic." },
          { t:"A round tunnel drains groundwater to its base, keeping the whole face bone dry.", v:"partial", fb:"Shape aids drainage a little, but its real gain is carrying load in a ring." } ] },
        { q:"What did Barlow and Greathead build in 1869?", o:[
          { t:"The Tower Subway, a small cast-iron tube proving the round shield and lining.", v:"expert", fb:"The Tower Subway was the proof of the circular shield method." },
          { t:"A gas-lit road tunnel that first tested detectors for firedamp underground.", v:"danger", fb:"It was a demonstration of the shield, not any gas-detection work." },
          { t:"A hard-rock railway bore cut by drilling and blasting through solid granite.", v:"wrong", fb:"It was a soft-ground clay tunnel driven by shield, not blasting." },
          { t:"An open cut later roofed over, the trench-and-cover method of the day.", v:"partial", fb:"It was a true bored tunnel, not a cut-and-cover trench." } ] },
        { q:"Why does the lining ring matter to this collapse?", o:[
          { t:"The gap behind the ring must be filled at once or the ground relaxes inward.", v:"expert", fb:"An unfilled annulus lets soil move in and settlement reach the surface." },
          { t:"An iron ring is airtight, so a collapse above it can only mean an explosion.", v:"danger", fb:"A ring is not sealed by nature; unfilled voids, not blasts, cause caving." },
          { t:"Once bolted, the ring makes the surrounding ground permanently self-supporting.", v:"wrong", fb:"The ring supports the ground; the ground does not become self-supporting." },
          { t:"The ring only carries the train's weight, not the earth pressing in around it.", v:"partial", fb:"Its first job is resisting ground pressure, long before any train runs." } ] }
      ] },
    // cell: The Monitoring Surveyor @ The Tunnel Face & TBM
    tn_greathead:{ sci:"James Henry Greathead (1844-1896)", topic:"The shield & compressed-air tunnelling", lede:"The South-African-born engineer who fused shield, compressed air, and cement grout into the recipe that dug London's deep tube — and named the void that grout must fill.", no:3,
      profile:"James Henry Greathead was a civil engineer, born in South Africa and trained in Britain, who took the tunnelling shield from a clever prototype to a mature system. Having worked with Peter Barlow on the Tower Subway in 1869, he went on to build the City & South London Railway, opened in 1890 — the world's first deep-level electric underground railway — using a refined circular shield that became the template for the whole London 'tube.'\n\nGreathead's genius was combination. He drove his shield through wet ground and used compressed air to hold back water where the ground was worst, balancing the air pressure against the water trying to seep in. Most important for this case, he perfected grouting: as the shield advanced, cement grout was pumped under pressure into the annular gap left between the excavated bore and the iron lining behind the shield's tail. This filled the void, locked the lining against the surrounding soil, and stopped the ground from relaxing inward. The tool he used, the grout injector, is still called a Greathead grout pan.\n\nFor this board, Greathead is the direct ancestor of the very thing at issue. He understood that every metre of shield tunnelling opens a ring-shaped void, and that this void must be grouted promptly and fully or the soil above will settle into it. Grouting is not decoration; it is structural, and it is precisely where a contractor under schedule pressure can quietly economise. When settlement climbs and a street drops, Greathead's method tells the investigator to check the grout: was the annulus filled as the design required, or was the pump run short?",
      frame:"The surveyor unrolls a section drawing. \"Greathead taught us the gap behind the ring has to be filled, every time. Prove you understand the grout, and I'll show you what my gauges have been screaming.\"",
      q:[
        { q:"What did Greathead pump into the gap behind the lining?", o:[
          { t:"Cement grout under pressure, filling the void so the ground could not relax in.", v:"expert", fb:"Grouting the annulus is the structural step that stops ground movement." },
          { t:"Inert gas, to purge any firedamp that might collect behind the iron rings.", v:"danger", fb:"He pumped grout to fill a void; gas purging was never the purpose." },
          { t:"Loose sand, shovelled in dry to let the tunnel breathe and drain freely.", v:"wrong", fb:"Dry sand would not lock the lining; pressurised cement grout did." },
          { t:"Nothing — the iron ring was simply left snug against the bare soil.", v:"partial", fb:"Leaving the gap unfilled is exactly the failure grouting prevents." } ] },
        { q:"Why did Greathead use compressed air?", o:[
          { t:"To hold back groundwater at the face by balancing the pressure trying to seep in.", v:"expert", fb:"Compressed air counters water pressure so the face stays workable." },
          { t:"To blow suspected explosive gas out of the bore ahead of the advancing shield.", v:"danger", fb:"Its job was resisting water, not clearing gas from the tunnel." },
          { t:"To power the shield's jacks, since no other source of force was available then.", v:"wrong", fb:"Jacks were driven hydraulically; the air held back water at the face." },
          { t:"To cool the miners working in the deep, hot ground beneath the river.", v:"partial", fb:"Comfort was incidental; the air's real job was resisting groundwater." } ] },
        { q:"What does Greathead's grouting mean for this collapse?", o:[
          { t:"An unfilled or shortchanged annulus lets the ground settle and reach the street.", v:"expert", fb:"Skimped grouting behind the lining is a direct route to surface collapse." },
          { t:"Grout is a finish coat, so skipping it could never bring down a road above.", v:"danger", fb:"Grout is structural; skimping it is a leading cause of settlement." },
          { t:"Modern rings seal themselves, so grouting is an old habit safely dropped now.", v:"wrong", fb:"Segmental rings still require prompt annulus grouting to control settlement." },
          { t:"Grout only speeds the work; leaving it out simply makes the tunnel slower.", v:"partial", fb:"Grout controls ground movement, not schedule; omitting it is dangerous." } ] }
      ] },
    // cell: The Monitoring Surveyor @ The Tunnel Face & TBM
    tn_moir:{ sci:"Ernest William Moir (1862-1933)", topic:"Caisson & compressed-air work", lede:"The engineer who watched his men crawl out of the pressurised tunnel crippled by 'the bends' — and built the first airlock to save them.", no:4,
      profile:"Ernest William Moir was a British civil engineer who worked at the frontier of compressed-air tunnelling, the technique of pressurising a working chamber to hold back water and soft ground while men dug beneath rivers and harbours. In the 1880s he took charge of the stalled Hudson River tunnels between New Jersey and Manhattan, and later worked on the Blackwall Tunnel and the Hudson & Manhattan railroad tubes, driving through silt under high air pressure.\n\nMoir's lasting contribution was medical as much as structural. Men working in compressed air absorb extra nitrogen into their blood and tissues; if they leave too quickly, the gas fizzes out as bubbles, causing 'caisson disease' — the crippling and sometimes fatal condition sailors call the bends. Moir reasoned that recompressing a stricken worker would redissolve the gas, allowing a slow, safe release. In 1889 he installed a medical airlock beside the Hudson tunnel, and the death rate among his workforce fell dramatically. It was one of the first practical uses of recompression to treat decompression sickness.\n\nFor this board, Moir stands for a hard truth about tunnelling: the hazards are known, measurable, and manageable — if the numbers are respected. Air pressure, exposure time, and decompression schedules are not guesswork; ignore them and men are hurt in predictable ways. The same logic governs the ground itself. Settlement, water pressure, and grout takeup are all measured quantities with warning thresholds. When something goes wrong underground, Moir's example says look for the number that was known and disregarded, not for an act of God or a lurid blast. Discipline with data is what separates a safe bore from a disaster.",
      frame:"The surveyor sets down a logbook of readings. \"Moir proved the underground obeys numbers, if you respect them. Show me you grasp that, and I'll tell you which numbers were staring us in the face.\"",
      q:[
        { q:"What causes caisson disease (the bends)?", o:[
          { t:"Dissolved gas bubbling out of the blood when pressure drops too fast on exit.", v:"expert", fb:"Rapid decompression lets absorbed nitrogen form bubbles in the tissues." },
          { t:"Poisonous underground gas seeping into the lungs of men at the tunnel face.", v:"danger", fb:"The bends is decompression sickness, not inhaled toxic or explosive gas." },
          { t:"Cold river water chilling the workers until their muscles cramp and seize.", v:"wrong", fb:"It is a gas-pressure illness, not a matter of cold or cramp." },
          { t:"Exhaustion from long shifts, which no change in procedure could ever prevent.", v:"partial", fb:"Fatigue matters, but the bends is specifically a decompression illness." } ] },
        { q:"What was Moir's medical airlock for?", o:[
          { t:"Recompressing a stricken worker so the gas redissolved and could leave slowly.", v:"expert", fb:"Recompression, then slow release, is the treatment Moir pioneered." },
          { t:"Detecting explosive gas so the chamber could be evacuated before ignition.", v:"danger", fb:"It treated the bends by recompression; it was not a gas alarm." },
          { t:"Storing the tools under pressure so they would not corrode in the wet silt.", v:"wrong", fb:"It was a medical chamber for men, not a store for tools." },
          { t:"Speeding men out of the tunnel faster at the end of each long shift.", v:"partial", fb:"It did the opposite — controlled, slow decompression, not haste." } ] },
        { q:"What lesson does Moir hold for this inquiry?", o:[
          { t:"Underground hazards obey known numbers; look for the reading that was ignored.", v:"expert", fb:"Measured thresholds, disregarded, are where tunnel failures hide." },
          { t:"The underground is unknowable, so a sudden collapse is nobody's fault to trace.", v:"danger", fb:"That is the act-of-God trap; the numbers were usually there to read." },
          { t:"Only medical risks can be measured; ground movement is pure chance.", v:"wrong", fb:"Settlement and pressure are measured just as rigorously as air exposure." },
          { t:"Once safety gear is installed, no further monitoring of the work is needed.", v:"partial", fb:"Moir's point was continuous respect for the readings, not one fix." } ] }
      ] },
    // cell: The Clerk @ The Tunnel Face & TBM
    tn_rabcewicz:{ sci:"Ladislaus von Rabcewicz (1893-1975)", topic:"The New Austrian Tunnelling Method", lede:"The Austrian engineer who stopped fighting the ground and let it carry its own weight — but only if you measured its every move.", no:5,
      profile:"Ladislaus von Rabcewicz was an Austrian civil engineer who, drawing on decades of Alpine tunnelling, formalised in the 1960s what he named the New Austrian Tunnelling Method, or NATM. His central idea overturned an old assumption. Earlier practice treated the ground as a dead load to be held up by a heavy, rigid lining. Rabcewicz argued that the surrounding rock or soil is itself a structural element: if you support it just enough, and let it deform a controlled amount, the ground arches around the opening and carries most of the load itself.\n\nThe method uses a thin, flexible initial support — sprayed concrete (shotcrete) and rock bolts — applied quickly, then permits measured deformation before a final lining goes in. What makes it work, and what makes it dangerous when abused, is monitoring. NATM demands continuous measurement of how the tunnel converges: extensometers, load cells, and survey targets track every millimetre of movement, and the support is adjusted in response. The ground is allowed to move, but only within limits the instruments confirm.\n\nFor this board, Rabcewicz is the case's beating heart. NATM is safe precisely because it is instrumented; the deformation readings are not paperwork but the early-warning system. If convergence accelerates, the ground is telling you it is about to fail, and there is usually time to act. A method that relies on monitoring collapses catastrophically if the monitoring is ignored — the gauges climb, the warning is there, and no one reads it. When a bore caves in, Rabcewicz would not ask about gas or fate; he would ask what the instruments showed in the days before, and who chose not to look.",
      frame:"The clerk slides a monitoring log across the desk. \"NATM lives or dies by the readings. Show me you understand why we watch the ground move, and I'll show you the days these numbers were left unread.\"",
      q:[
        { q:"What is the core idea of NATM?", o:[
          { t:"Let the ground carry its own load by supporting it just enough to arch around the bore.", v:"expert", fb:"Mobilising the ground's own strength is the essence of the method." },
          { t:"Seal the bore airtight so no explosive gas can ever collect against the lining.", v:"danger", fb:"NATM is about mobilising ground strength, not gas sealing." },
          { t:"Encase the tunnel in the heaviest possible rigid lining to resist all movement.", v:"wrong", fb:"That is the old approach NATM replaced; it allows controlled movement." },
          { t:"Freeze the surrounding soil so it becomes solid and needs no support at all.", v:"partial", fb:"Ground freezing is a different technique; NATM uses shotcrete and bolts." } ] },
        { q:"Why is monitoring essential to NATM?", o:[
          { t:"Convergence readings warn when the ground is failing, giving time to add support.", v:"expert", fb:"The instruments are the early-warning system the method depends on." },
          { t:"Readings are logged only to bill the client for each metre of progress.", v:"wrong", fb:"Monitoring governs safety and support, not payment for progress." },
          { t:"Gauges are used once at handover to certify the finished tunnel is sound.", v:"wrong", fb:"Monitoring is continuous during driving, not a single final check." },
          { t:"They confirm the shotcrete's colour has cured to the right shade before lining.", v:"partial", fb:"Curing is checked otherwise; monitoring tracks ground deformation." } ] },
        { q:"What happens if NATM monitoring is ignored?", o:[
          { t:"The warning of accelerating movement is missed, and the ground can fail suddenly.", v:"expert", fb:"Unread gauges turn a controllable method into a collapse waiting to happen." },
          { t:"Nothing — the method is robust and works fine whether or not you read the gauges.", v:"danger", fb:"Ignoring the readings removes the very safeguard NATM is built on." },
          { t:"The tunnel simply finishes a little later, with no effect on its safety at all.", v:"wrong", fb:"The risk is collapse, not delay; monitoring is a safety function." },
          { t:"Only the final lining is affected; the driving stage carries no added risk.", v:"partial", fb:"The driving stage is exactly when unread convergence is most deadly." } ] }
      ] },
    // cell: The Clerk @ The Tunnel Face & TBM
    tn_muller:{ sci:"Leopold Müller (1908-1988)", topic:"Rock mechanics & tunnel support", lede:"The Salzburg engineer who insisted the rock's cracks and joints matter more than the rock itself — and built a whole science around them.", no:6,
      profile:"Leopold Müller was an Austrian engineer and geologist, the founder of the 'Salzburg school' of rock mechanics and a co-developer, with Ladislaus von Rabcewicz, of the New Austrian Tunnelling Method. In 1962 he founded the International Society for Rock Mechanics and served as its first president, giving a scattered practice its first coherent scientific footing.\n\nMüller's central teaching was that a rock mass is not a solid block but a jointed, layered, faulted assembly, and that its behaviour is governed by those discontinuities — the cracks, bedding planes, and shear zones — far more than by the strength of the intact rock between them. A tunnel does not fail because sound granite crushes; it fails because blocks slide along joints, because a clay seam gives way, because water pressure prises a fracture open. He argued that support must be designed for how the whole rock mass will actually deform, observed and measured in place, not for an idealised material tested in a laboratory.\n\nFor this board, Müller supplies the mindset the case demands: read the ground as it really is, and watch how it moves. His science is inseparable from instrumentation, because the behaviour of a jointed mass can only be known by measuring it. A collapse, to Müller, is rarely a bolt from the blue; it is the end of a process that the discontinuities and the monitoring were signalling all along. Against a story of freak misfortune, he would set the record of deformation, and against a story of sudden explosion, he would set the slow, readable slide of a mass that was never properly supported or watched.",
      frame:"The clerk taps a photograph of the fractured face. \"Müller would say the ground was talking through every joint and gauge. Prove you can read a rock mass, and I'll tell you what ours was saying.\"",
      q:[
        { q:"What did Müller say governs a rock mass's behaviour?", o:[
          { t:"Its discontinuities — joints, bedding, and shear zones — more than the intact rock.", v:"expert", fb:"Cracks and seams, not the solid rock, usually decide how a mass behaves." },
          { t:"The buildup of explosive gas trapped within the pores of the deep rock.", v:"danger", fb:"Rock-mass behaviour is about structure and joints, not trapped gas." },
          { t:"Only the crushing strength of the intact rock measured on a lab sample.", v:"wrong", fb:"Müller's point was the opposite: joints matter more than intact strength." },
          { t:"The colour and mineral content, which fix its strength once and for all.", v:"partial", fb:"Composition matters, but discontinuities govern the mass's behaviour." } ] },
        { q:"How does a jointed rock mass typically fail in a tunnel?", o:[
          { t:"Blocks slide along joints or a weak seam gives way, not by the sound rock crushing.", v:"expert", fb:"Movement along discontinuities is the usual failure mode." },
          { t:"The intact rock detonates when the boring machine sparks against it.", v:"danger", fb:"Rock does not detonate; failure is movement along joints and seams." },
          { t:"It cannot fail at all once a lining is placed, whatever the joints do.", v:"wrong", fb:"A lining helps, but joint movement can still overload it if unmonitored." },
          { t:"It fails only from the weight of water sitting directly on top of the tunnel.", v:"partial", fb:"Water can drive failure, but chiefly by acting on the joints." } ] },
        { q:"What is Müller's stance on collapse?", o:[
          { t:"Rarely a bolt from the blue — the joints and instruments signal it in advance.", v:"expert", fb:"Failure is usually a readable process, not a sudden surprise." },
          { t:"Always a sudden, unforeseeable event that no measurement could predict.", v:"danger", fb:"That is the act-of-God trap Müller's monitoring science rejects." },
          { t:"Purely a matter of the lining, unrelated to how the surrounding mass moves.", v:"wrong", fb:"The mass's movement is precisely what loads and can defeat the lining." },
          { t:"Something only laboratory tests, not field readings, can ever anticipate.", v:"partial", fb:"Field instrumentation is central; the lab alone cannot read the real mass." } ] }
      ] },
    // cell: Miner Jud Kolb @ The Surface & Settlement Markers
    tn_stini:{ sci:"Josef Stini (1880-1958)", topic:"Engineering geology for tunnels", lede:"The Vienna professor who married geology to construction and taught engineers that the ground writes its own warning long before the first shovel.", no:7,
      profile:"Josef Stini was an Austrian geologist, a professor at the Technical University of Vienna, widely regarded as a founder of engineering geology — the discipline that brings systematic geological knowledge to bear on building. In 1929 he founded the journal 'Geologie und Bauwesen' (Geology and Construction), and he wrote extensively on landslides, springs, rockfalls, and the behaviour of ground during tunnelling, insisting that geology was not academic decoration but the first and most decisive input to any large civil project.\n\nStini's message was that ground conditions can and must be investigated before construction begins: map the strata, find the faults and water-bearing zones, understand the springs and the slopes. He studied how water moves through rock and soil and how it destabilises slopes and excavations, and he catalogued the ways ground gives warning — seepage, small movements, changes in the water table — before it fails outright. To Stini, most 'unforeseen' ground disasters were foreseeable; they had simply not been investigated or heeded.\n\nFor this board, Stini is the answer to the dismissal trap. A 'freak sinkhole,' an 'act of God' — these are the phrases used when nobody wants to admit the ground was readable. Stini would insist that a modern metro bore is preceded by boreholes and geological surveys, that the strata and the water were known quantities, and that if the ground gave way, it likely gave warning first. The sinkhole story survives only where the investigation stops early. His discipline pushes the inquiry to ask what the ground had already told anyone who cared to read it.",
      frame:"Kolb kicks at the broken kerb. \"Folk up here call it an act of God. Stini would've called it laziness. Show me you know that ground can be read, and I'll tell you what the surveys said.\"",
      q:[
        { q:"What did Stini establish about ground conditions?", o:[
          { t:"They can be investigated and largely foreseen before any construction starts.", v:"expert", fb:"Pre-construction geology turns 'surprises' into known, mappable conditions." },
          { t:"They are ruled by chance, so no survey can predict how the ground behaves.", v:"danger", fb:"That is the act-of-God view Stini spent his career refuting." },
          { t:"They matter only for dams, never for tunnels driven through soft ground.", v:"wrong", fb:"Stini applied engineering geology across all civil works, tunnels included." },
          { t:"They can be judged well enough by eye once digging is already underway.", v:"partial", fb:"He insisted on investigation before the work, not after it begins." } ] },
        { q:"What role did water play in Stini's work?", o:[
          { t:"A prime destabiliser of slopes and excavations, and a key thing to map early.", v:"expert", fb:"Groundwater movement was central to how Stini read ground stability." },
          { t:"A source of the explosive vapour that he believed caused most ground failures.", v:"danger", fb:"Water destabilises ground mechanically; it is not an explosive agent here." },
          { t:"A minor concern, since dry rock and wet rock behave in the same way.", v:"wrong", fb:"Water dramatically changes ground behaviour; Stini stressed exactly that." },
          { t:"Useful only for supplying the site, not for judging the ground's stability.", v:"partial", fb:"For Stini, water was foremost a stability hazard to be mapped and watched." } ] },
        { q:"How does Stini undercut the 'freak sinkhole' story?", o:[
          { t:"Boreholes and surveys usually make the strata and water known in advance.", v:"expert", fb:"A properly investigated site rarely holds a truly unforeseeable void." },
          { t:"He proves sinkholes strike at random, so no one could ever be at fault.", v:"danger", fb:"He argued the reverse — most such failures were foreseeable." },
          { t:"He shows geology is too complex to survey, so guessing is unavoidable.", v:"wrong", fb:"Stini made geology surveyable and practical, not hopeless." },
          { t:"He says only the tunnel face matters, not the ground above the crown.", v:"partial", fb:"He read the whole ground column, surface and strata alike." } ] }
      ] },
    // cell: Miner Jud Kolb @ The Surface & Settlement Markers
    tn_robbins:{ sci:"James S. Robbins (1913-1958)", topic:"The modern tunnel-boring machine", lede:"", no:8, profile:"",
      frame:"", q:[] },
    // cell: The Monitoring Surveyor @ The Surface & Settlement Markers
    tn_muirwood:{ sci:"Alan Muir Wood (1921-2009)", topic:"Soft-ground tunnelling", lede:"", no:9, profile:"",
      frame:"", q:[] },
    // cell: The Monitoring Surveyor @ The Surface & Settlement Markers
    tn_mair:{ sci:"Robert Mair (ground-settlement researcher, b. 1950)", topic:"Tunnelling-induced ground settlement", lede:"", no:10, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Surface & Settlement Markers
    tn_berigny:{ sci:"Charles Bérigny (grouting pioneer)", topic:"Pressure grouting of ground", lede:"", no:11, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Surface & Settlement Markers
    tn_proctor:{ sci:"Ralph R. Proctor (soil-compaction researcher)", topic:"Compaction & the Proctor test", lede:"", no:12, profile:"",
      frame:"", q:[] },
    // cell: Miner Jud Kolb @ The Contractor's Site Office
    tn_barton:{ sci:"Nick Barton (rock-mechanics researcher)", topic:"The Q-system for rock tunnels", lede:"", no:13, profile:"",
      frame:"", q:[] },
    // cell: Miner Jud Kolb @ The Contractor's Site Office
    tn_bieniawski:{ sci:"Z. T. Bieniawski (rock-mechanics researcher)", topic:"The rock-mass rating", lede:"", no:14, profile:"",
      frame:"", q:[] },
    // cell: The Monitoring Surveyor @ The Contractor's Site Office
    tn_kerisel:{ sci:"Jean Kérisel (1908-2005)", topic:"Earth pressure & deep foundations", lede:"", no:15, profile:"",
      frame:"", q:[] },
    // cell: The Monitoring Surveyor @ The Contractor's Site Office
    tn_deere:{ sci:"Don U. Deere (1922-2011)", topic:"The rock quality designation (RQD)", lede:"", no:16, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Contractor's Site Office
    tn_hoek:{ sci:"Evert Hoek (1933-2024)", topic:"Rock-mass strength & the Hoek-Brown criterion", lede:"", no:17, profile:"",
      frame:"", q:[] },
    // cell: The Clerk @ The Contractor's Site Office
    tn_westergaard:{ sci:"Harald M. Westergaard (1888-1950)", topic:"Stresses in soils & slabs", lede:"", no:18, profile:"",
      frame:"", q:[] }
  },
  STORIES:{
    tn_miner:{ tn_face:"", tn_surface:"", tn_office:"" },
    tn_surveyor:{ tn_face:"", tn_surface:"", tn_office:"" },
    tn_clerk:{ tn_face:"", tn_surface:"", tn_office:"" }
  },
  story:[ "", "", "", "" ],
  endings:{ overclaimWhat:"tn_explosion", dismissalWhat:"tn_sinkhole",
    win:{ expertTitle:"", expert:["",""], soundTitle:"", sound:["",""], namedTitle:"", named:["",""] },
    overclaim:{ title:"", body:["",""] },
    dismissal:{ title:"", body:["",""] },
    wrongNames:{ title:"", body:[""] } },
}};