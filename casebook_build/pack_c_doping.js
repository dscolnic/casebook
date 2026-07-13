// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"c_doping", title:"The Verano Ascent", discipline:"Sports Science & Anti-Doping",
  teaser:"A champion rewrote the record books and passed every test. A once-in-a-century talent? A meaningless mark in a dirty sport? Or something built to beat the lab?", overclaimTag:"a once-in-a-century clean champion", truthTag:"a systematic doping program",
  venue:"the Verano doping inquiry", agent:{name:"Investigator Marek Dane", role:"Investigator's Notepad"},
  standingLabel:"Inquiry credibility", readingShort:"Physiologists", readingLabel:"Sport Science & Anti-Doping",
  dossierName:"SPORT SCIENCE & ANTI-DOPING", enterLabel:"Open the inquiry", subt:"A deduction game inside the Verano doping inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"A flawless legend can be engineered as carefully as a test schedule, so follow the biology and custody rather than the applause.",
  CATS:{
    who:{ title:"Who is behind it", truth:"dp_doctor", items:[
      {id:"dp_doctor", label:"Dr. Halden Reuss — the team physician"},
      {id:"dp_athlete", label:"The champion athlete"},
      {id:"dp_official", label:"The federation official"} ]},
    where:{ title:"Where it culminates", truth:"dp_lab", items:[
      {id:"dp_camp", label:"The Training Camp & Velodrome"},
      {id:"dp_federation", label:"The Federation Office"},
      {id:"dp_lab", label:"The Anti-Doping Laboratory"} ]},
    what:{ title:"What is happening", truth:"dp_program", items:[
      {id:"dp_phenom", label:"A clean, once-in-a-century champion"},
      {id:"dp_everyone", label:"A meaningless record — everyone dopes anyway"},
      {id:"dp_program", label:"A systematic doping program built to beat the tests"} ]}
  },
  PLACES:{
    dp_camp:{name:"The Training Camp & Velodrome", xy:[140,90]},
    dp_federation:{name:"The Federation Office", xy:[330,240]},
    dp_lab:{name:"The Anti-Doping Laboratory", xy:[520,90]}
  },
  EDGES:[["dp_camp","dp_federation"],["dp_federation","dp_lab"]],
  CHARACTERS:{
    dp_scientist:{ name:"Lab Scientist Aro", role:"Anti-doping scientist", face:"🧪", badge:"A", legend:"the laboratory", hint:"Retests the frozen samples; the blood passport shows values no clean rider can hold." },
    dp_soigneur:{ name:"Soigneur Vela", role:"Former team soigneur", face:"🚴", badge:"V", legend:"the training camp", hint:"Worked inside the team; knows the fridge, the schedule, and the microdosing." },
    dp_officer:{ name:"Control Officer Renn", role:"Doping-control officer", face:"📋", badge:"R", legend:"the federation office", hint:"Handles the test chain; can show which controls were dodged, delayed, or warned in advance." }
  },
  TOPICMAP:{
    dp_camp:{ dp_scientist:["dp_hill","dp_krogh"], dp_soigneur:["dp_astrand","dp_saltin"], dp_officer:["dp_donike","dp_beckett"] },
    dp_federation:{ dp_scientist:["dp_catlin","dp_ayotte"], dp_soigneur:["dp_ekblom","dp_parisotto"], dp_officer:["dp_lasne","dp_ashenden"] },
    dp_lab:{ dp_scientist:["dp_franke","dp_berendonk"], dp_soigneur:["dp_yesalis","dp_prokop"], dp_officer:["dp_bergstrom","dp_rodchenkov"] }
  },
  TOPICS:{
    // cell: Lab Scientist Aro @ The Training Camp & Velodrome
    dp_hill:{ sci:"A. V. Hill (1886–1977)", topic:"VO2 max & muscle physiology", lede:"He followed heat and oxygen through working muscle, giving endurance sport a measurable ceiling instead of a heroic myth.", no:1, profile:"Archibald Vivian Hill was a British physiologist, mathematician, and athlete whose experiments made muscle performance quantitatively tractable. He built sensitive instruments to measure the tiny heat released by contracting muscle and shared the 1922 Nobel Prize in Physiology or Medicine with Otto Meyerhof for work on muscular energy. Hill’s laboratory joined mechanics, chemistry, respiration, and time-resolved measurement.\n\nWith Hartley Lupton in the 1920s, Hill studied oxygen consumption during running. As speed rose, oxygen uptake increased until it approached a maximum; beyond that point, additional work relied more heavily on energy pathways that did not immediately use oxygen. This helped establish the concept now called VO2 max: the highest rate at which the body can take in, transport, and use oxygen during intense exercise. Hill also discussed oxygen debt, an older framework for elevated recovery metabolism.\n\nVO2 max is not a single magic number. It depends on cardiac output, hemoglobin, blood volume, muscle extraction, training, protocol, and measurement quality. Exceptional athletes can be physiologically rare without violating biology. Conversely, a striking performance cannot prove doping by itself, because tactics, aerodynamics, weather, equipment, and efficiency all shape speed.\n\nAro needs Hill’s restraint in the Verano inquiry. The champion’s power profile can be compared with measured oxygen delivery and recovery, but no record alone identifies a drug. The useful clue is whether performance, blood values, and longitudinal physiology form a plausible human trajectory. Hill helps reject worship of a once-in-a-century body and the cynical claim that physiology means nothing in a dirty sport.",
      frame:"Aro clips a metabolic cart printout beside the champion’s power file. “Hill made effort answer to oxygen. Records can be astonishing, but the body still has linked systems. Tell me which link we actually measured.”", q:[
        { q:"What does VO2 max describe?",
          o:[
            { t:"The highest rate of oxygen uptake and use during intense exercise.", v:"expert", fb:"VO2 max integrates pulmonary, cardiovascular, blood, and muscular oxygen delivery." },
            { t:"The greatest speed an athlete can hold for exactly one minute.", v:"partial", fb:"Speed depends on efficiency and mechanics as well as oxygen uptake." },
            { t:"The total amount of oxygen stored inside the lungs before exercise.", v:"wrong", fb:"VO2 max is a rate of uptake and utilization, not a stored volume." },
            { t:"A number that proves doping whenever it exceeds the population average.", v:"danger", fb:"Rare physiology is not by itself evidence of a prohibited method." }
          ] },
        { q:"Why can speed rise after oxygen uptake plateaus?",
          o:[
            { t:"Additional energy can come from anaerobic pathways for a limited time.", v:"expert", fb:"Work above maximal oxygen supply draws more heavily on finite non-oxidative energy." },
            { t:"The muscles stop consuming energy once maximum oxygen is reached.", v:"wrong", fb:"Higher speed requires more energy, not less." },
            { t:"The athlete begins storing oxygen in bone and connective tissue. under review", v:"wrong", fb:"Those tissues do not provide a hidden oxygen reservoir for sprinting." },
            { t:"A plateau means the measuring equipment must always be malfunctioning.", v:"danger", fb:"Instrument checks matter, but a physiological plateau can be genuine." }
          ] },
        { q:"What can Hill’s physiology establish in this case?",
          o:[
            { t:"Whether linked performance and oxygen measures are physiologically coherent.", v:"expert", fb:"Physiology tests plausibility, while doping responsibility requires additional evidence." },
            { t:"Which team employee supplied a prohibited substance to the athlete.", v:"wrong", fb:"A metabolic test cannot identify the organizer of a program." },
            { t:"That every extraordinary performance must have a pharmacological cause.", v:"danger", fb:"Training, genetics, technique, and equipment can also produce exceptional results." },
            { t:"That passing one urine test proves the athlete was always clean. in this case", v:"wrong", fb:"A single test covers limited substances and detection windows." }
          ] }
      ] },
    // cell: Lab Scientist Aro @ The Training Camp & Velodrome
    dp_krogh:{ sci:"August Krogh (1874–1949)", topic:"Capillaries & exercise physiology", lede:"He watched capillaries open around working tissue and showed that oxygen delivery changes locally, not just at the lungs.", no:2, profile:"August Krogh was a Danish physiologist who investigated respiration from insects to humans. He developed ingenious apparatus for measuring gas exchange and circulation, often working with his wife and collaborator Marie Krogh, a physician and physiologist. In 1920 he received the Nobel Prize in Physiology or Medicine for discovering mechanisms that regulate capillary blood flow in skeletal muscle.\n\nCapillaries are the smallest blood vessels, where oxygen, carbon dioxide, nutrients, and wastes move between blood and tissue. Krogh showed that tissue demand and local circulation are tightly linked. Modern understanding has revised details of his original capillary-recruitment picture, but his central insight endures: exercise physiology depends on matching delivery to active muscle at microscopic scale.\n\nKrogh also articulated what became known as the Krogh principle: for many biological problems, some species or preparation is especially well suited to study. His comparative approach encouraged researchers to choose models that reveal a mechanism clearly, then ask how far the lesson generalizes. In sport, oxygen delivery depends not only on lungs but on heart, hemoglobin, vessels, capillary exchange, mitochondria, and fiber recruitment.\n\nThat chain matters in Verano. Erythropoietin or blood transfusion can raise red-cell mass and oxygen-carrying capacity, but performance response still depends on circulation and muscle use. Aro should not infer a hidden program from one fast ascent, nor dismiss unusual blood markers because the athlete looked healthy. Krogh’s lesson is to connect scale: a manipulated blood compartment leaves physiological consequences that can be tracked over time. His method asks investigators to explain each transition from blood value to actual tissue performance.",
      frame:"Aro sketches a red cell’s route from lung to muscle fiber. “Krogh taught us that delivery ends in capillaries, not in a press release. Follow the pathway before naming the cause.”", q:[
        { q:"What was Krogh’s Nobel-recognized contribution?",
          o:[
            { t:"He explained regulation of capillary blood flow in working muscle.", v:"expert", fb:"His research linked local tissue activity with microscopic circulation." },
            { t:"He discovered that lungs manufacture red blood cells during exercise.", v:"wrong", fb:"Red cells are produced mainly in bone marrow, not the lungs." },
            { t:"He proved every capillary remains fully open at all exercise intensities.", v:"wrong", fb:"Local flow changes with demand rather than remaining maximally fixed." },
            { t:"He invented a blood test that directly identifies every form of EPO.", v:"danger", fb:"His work was foundational physiology, not modern anti-doping chemistry." }
          ] },
        { q:"What is the Krogh principle?",
          o:[
            { t:"Choose the organism or preparation best suited to reveal a problem.", v:"expert", fb:"Comparative biology can expose mechanisms more clearly in an appropriate model." },
            { t:"Use only human champions because animal physiology never generalizes.", v:"wrong", fb:"Krogh’s method deliberately compared species and preparations." },
            { t:"Assume one model’s result applies unchanged to every organism.", v:"danger", fb:"A revealing model still requires careful generalization." },
            { t:"Select the experiment most likely to produce the desired conclusion.", v:"wrong", fb:"Suitability concerns access to mechanism, not outcome selection." }
          ] },
        { q:"Why is oxygen delivery a chain rather than one measurement?",
          o:[
            { t:"Heart, hemoglobin, vessels, capillaries, and muscle use all contribute.", v:"expert", fb:"A high value in one compartment does not alone determine whole-body performance." },
            { t:"Only lung size matters once an athlete reaches elite competition.", v:"wrong", fb:"Cardiovascular and muscular factors remain central at every level." },
            { t:"Capillary exchange becomes irrelevant whenever blood contains more red cells.", v:"danger", fb:"Extra oxygen capacity must still be delivered and extracted in tissue." },
            { t:"The chain proves any unusual blood value was deliberately manipulated.", v:"wrong", fb:"Physiological variation and illness must be considered before intent." }
          ] }
      ] },
    // cell: Soigneur Vela @ The Training Camp & Velodrome
    dp_astrand:{ sci:"Per-Olof Åstrand (1922–2015)", topic:"The textbook of work physiology", lede:"He put exercise on the cycle ergometer and built practical tests that connected laboratory oxygen measurements to ordinary athletes.", no:3, profile:"Per-Olof Åstrand was a Swedish physiologist whose research and teaching helped define modern work physiology. At the Karolinska Institute, he studied aerobic capacity, age, sex, training, and the body’s responses to sustained exercise. His Textbook of Work Physiology, written with Kaare Rodahl and later colleagues, became a standard reference for generations of students in sport, medicine, and occupational health.\n\nÅstrand helped popularize a submaximal cycle-ergometer test that estimates aerobic capacity from workload and heart rate. The logic is practical: below maximal effort, heart rate usually rises with oxygen demand, so a controlled test can infer a likely maximum. The estimate is imperfect and depends on age correction, medication, temperature, fatigue, and individual heart-rate behavior, but it made physiology accessible beyond specialized maximal-testing laboratories.\n\nHis broader work stressed variation across the lifespan and the specificity of training. Endurance performance reflects maximal oxygen uptake, economy, sustainable fraction of maximum, fuel supply, and recovery. A champion can improve without a huge change in VO2 max by becoming more economical or better able to sustain a high fraction. That is why one physiological number cannot explain a record.\n\nSoigneur Vela has seen the team turn ordinary measurements into a mythology of limitless adaptation. Åstrand offers a better baseline: repeated tests under standardized loads, interpreted as trends rather than talismans. If heart rate, workload, hemoglobin, and recovery change abruptly in coordinated ways, investigators should ask why. They should not call the athlete superhuman, and they should not assume every rider shares the same hidden practice.",
      frame:"Vela spins the old ergometer wheel with one finger. “A team can make a chart look like destiny. Åstrand used controlled workloads so the chart had to answer back.”", q:[
        { q:"How does the Åstrand submaximal test estimate aerobic capacity?",
          o:[
            { t:"It relates heart rate at controlled workloads to an expected maximum.", v:"expert", fb:"Submaximal responses can provide a practical estimate of VO2 max." },
            { t:"It measures every muscle fiber directly while the athlete rests.", v:"wrong", fb:"The test uses exercise heart rate and workload, not direct fiber sampling." },
            { t:"It assumes all athletes share one identical resting and maximal pulse.", v:"danger", fb:"Age and individual variation must be considered." },
            { t:"It records the fastest lap and converts speed directly into lung volume.", v:"wrong", fb:"Speed includes mechanics and resistance beyond aerobic capacity." }
          ] },
        { q:"Why is the result an estimate rather than an exact measurement?",
          o:[
            { t:"Heart-rate responses vary with age, fatigue, heat, drugs, and individuals.", v:"expert", fb:"The inference depends on assumptions that are not identical across athletes." },
            { t:"Cycle ergometers cannot measure workload in physical units. in this case", v:"wrong", fb:"Properly calibrated ergometers quantify external work." },
            { t:"Oxygen uptake has no relationship to cardiovascular response. in this case", v:"wrong", fb:"The relationship is real but variable." },
            { t:"Any estimate is scientifically meaningless compared with competition results.", v:"danger", fb:"Practical estimates can be useful when their uncertainty is respected." }
          ] },
        { q:"How might endurance improve without a large VO2-max rise?",
          o:[
            { t:"Better economy and sustainable fraction can increase speed at the same uptake.", v:"expert", fb:"Performance depends on how efficiently and durably aerobic capacity is used." },
            { t:"The body can eliminate its need for oxygen through technical training.", v:"wrong", fb:"Aerobic metabolism remains necessary for endurance exercise." },
            { t:"A rider can store unlimited anaerobic energy for an entire mountain stage.", v:"danger", fb:"Anaerobic stores are limited and cannot sustain prolonged climbing." },
            { t:"Only the federation’s timing system can create such an improvement. in this case", v:"wrong", fb:"Timing errors are possible, but real physiological pathways also exist." }
          ] }
      ] },
    // cell: Soigneur Vela @ The Training Camp & Velodrome
    dp_saltin:{ sci:"Bengt Saltin (1935–2014)", topic:"Muscle biopsy & endurance physiology", lede:"With biopsy needles, bed rest, and hard exercise, he mapped how endurance training rewrites muscle rather than merely toughening the will.", no:4, profile:"Bengt Saltin was a Swedish physiologist whose career connected whole-body performance with the chemistry and structure of skeletal muscle. He worked in Scandinavia and helped establish major exercise-research centers, including the Copenhagen Muscle Research Centre. His studies were often collaborative, combining invasive measurements with carefully controlled training, inactivity, diet, and exercise protocols.\n\nMuscle biopsy removes a small tissue sample for microscopic and biochemical analysis. Using biopsy methods developed by Jonas Bergström and others, Saltin’s research examined fiber types, capillary density, mitochondrial enzymes, glycogen, and the adaptations produced by endurance training. Bed-rest and detraining studies showed how quickly cardiovascular and muscular capacity can decline when normal activity disappears.\n\nSaltin also investigated carbohydrate loading and muscle glycogen, the stored form of glucose used during exercise. Depleting glycogen and then increasing dietary carbohydrate could expand stores and delay fatigue in prolonged events. The lesson was mechanistic: endurance changes through measurable fuel, enzymes, blood flow, and cellular machinery. It is not a single trait labeled talent.\n\nVela’s knowledge of the Verano camp includes both legitimate altitude blocks and suspicious medical schedules. Saltin helps separate them. Training adaptation normally unfolds through linked changes over time; abrupt blood shifts without matching workload or muscle trajectory deserve scrutiny. Yet muscle improvement is real and can be dramatic, so a record does not prove cheating. The inquiry needs longitudinal coherence, not admiration and not blanket cynicism. That comparison also protects legitimate training science: altitude, diet, and workload should be credited when their predicted muscular adaptations appear in the right order and magnitude.",
      frame:"Vela places biopsy photographs beside the camp calendar. “Saltin could show what training changed inside a fiber. When the blood changes overnight but the training story does not, that mismatch matters.”", q:[
        { q:"What does a muscle biopsy allow researchers to examine?",
          o:[
            { t:"Fiber types, glycogen, capillaries, and cellular enzyme adaptations.", v:"expert", fb:"A small tissue sample links performance to muscle structure and chemistry." },
            { t:"The athlete’s complete lifetime history of prohibited drug use.", v:"wrong", fb:"A biopsy is not a retrospective record of every exposure." },
            { t:"Only the size of the muscle visible from outside the body. in this case", v:"wrong", fb:"Microscopy and biochemical analysis reach far beyond external size." },
            { t:"Whether a rider intended to violate anti-doping rules. in this case", v:"wrong", fb:"Biological tissue cannot establish a person’s intent." }
          ] },
        { q:"Why does muscle glycogen matter in endurance sport?",
          o:[
            { t:"It supplies carbohydrate fuel whose depletion contributes to fatigue.", v:"expert", fb:"Expanded glycogen stores can support prolonged high-intensity work." },
            { t:"It carries oxygen through blood in place of hemoglobin. in this case", v:"wrong", fb:"Hemoglobin transports oxygen; glycogen stores carbohydrate in tissue." },
            { t:"It permanently raises red-cell mass after a single large meal.", v:"wrong", fb:"Dietary carbohydrate does not directly create lasting erythrocytosis." },
            { t:"It proves every carbohydrate-loading athlete is using a banned method.", v:"danger", fb:"Carbohydrate loading is a legal nutritional strategy." }
          ] },
        { q:"Which pattern best fits ordinary training adaptation?",
          o:[
            { t:"Linked changes in workload, muscle traits, recovery, and performance over time.", v:"expert", fb:"Coherent gradual adaptation differs from isolated abrupt biological jumps." },
            { t:"A sudden hematology shift with no change in training or environment. under review", v:"danger", fb:"That mismatch warrants investigation rather than automatic celebration." },
            { t:"Identical improvement in every athlete regardless of baseline physiology.", v:"wrong", fb:"Individuals respond differently to the same training." },
            { t:"No measurable cellular change despite months of effective endurance work.", v:"partial", fb:"Some gains are hard to capture, but training commonly leaves physiological traces." }
          ] }
      ] },
    // cell: Control Officer Renn @ The Training Camp & Velodrome
    dp_donike:{ sci:"Manfred Donike (1933–1995)", topic:"GC/MS steroid testing & the T/E ratio", lede:"He brought chromatograms and mass spectra into sport, forcing steroids to leave chemical identities rather than rumors.", no:5, profile:"Manfred Donike was a German chemist, former competitive cyclist, and a central architect of modern anti-doping analysis. He led the Cologne laboratory and worked with international sport organizations to improve testing. His experience in cycling gave him practical knowledge of the substances and evasions circulating through elite competition.\n\nDonike advanced the use of gas chromatography and mass spectrometry for steroid detection. Gas chromatography separates compounds in a sample; mass spectrometry helps identify them by the masses and fragmentation patterns of their ions. Together, GC/MS can distinguish closely related steroids and metabolites far more specifically than broad color reactions or rumor-based policing.\n\nHe also helped establish use of the testosterone-to-epitestosterone ratio, usually called the T/E ratio. Because administered testosterone can elevate testosterone relative to epitestosterone, an unusual ratio can trigger further investigation. The ratio varies naturally and can be manipulated, so later isotope-ratio methods and longitudinal profiling improved interpretation. A screening threshold is not identical to proof.\n\nControl Officer Renn needs that distinction. A program designed to beat tests may microdose, time administration, substitute samples, or exploit warning. Donike’s legacy is not faith in one cutoff; it is analytical escalation. A normal-looking result can coexist with doping outside the detection window, while an unusual ratio can have innocent explanations. Chain of custody, confirmatory spectra, and patterns across time turn suspicion into evidence. The strongest laboratory conclusion therefore states the compound, method, uncertainty, and custody separately, leaving organizers and intent to documentary evidence rather than stretching chemistry beyond its reach.",
      frame:"Renn sets a chromatogram on the control form. “Donike replaced whispers with peaks, but he never made one threshold omniscient. Tell me what screening can and cannot prove.”", q:[
        { q:"What does GC/MS contribute to steroid testing?",
          o:[
            { t:"It separates compounds and identifies them through characteristic spectra.", v:"expert", fb:"Chromatography plus mass spectrometry provides chemically specific evidence." },
            { t:"It measures cycling speed and converts it into a drug concentration.", v:"wrong", fb:"Performance data are not chemical identification." },
            { t:"It detects only substances visible as colored particles in urine. in this case", v:"wrong", fb:"The method analyzes molecular separation and ion fragments." },
            { t:"It identifies the team organizer from the athlete’s sample alone. under review", v:"wrong", fb:"Chemistry can show exposure, not the full chain of responsibility." }
          ] },
        { q:"What is the purpose of the T/E ratio?",
          o:[
            { t:"It screens for testosterone administration through hormonal imbalance.", v:"expert", fb:"An elevated relationship can prompt confirmatory investigation." },
            { t:"It compares training effort with expected finishing time. in this case", v:"wrong", fb:"The ratio concerns testosterone and epitestosterone in a sample." },
            { t:"It proves innocence whenever the value lies below one fixed cutoff.", v:"danger", fb:"Doping may occur without crossing a screening threshold." },
            { t:"It distinguishes blood transfusion from recombinant EPO directly. in this case", v:"wrong", fb:"Those are different methods requiring hematological or EPO-focused analysis." }
          ] },
        { q:"Why is a screening threshold not final proof?",
          o:[
            { t:"Biological variation and manipulation require confirmation and context.", v:"expert", fb:"Thresholds identify samples needing deeper analytical work." },
            { t:"Laboratory instruments never produce quantitative measurements.", v:"wrong", fb:"Analytical instruments can measure precisely when validated." },
            { t:"Any athlete may choose a personal cutoff after the result arrives.", v:"danger", fb:"Rules must be established and applied consistently." },
            { t:"A value beyond threshold always comes from contaminated food. in this case", v:"wrong", fb:"Contamination is one possibility, not an automatic explanation." }
          ] }
      ] },
    // cell: Control Officer Renn @ The Training Camp & Velodrome
    dp_beckett:{ sci:"Arnold Beckett (1920–2010)", topic:"Early doping analysis & drug control", lede:"He helped turn scattered drug checks into a professional laboratory discipline built around samples, methods, and custody.", no:6, profile:"Arnold Beckett was a British pharmacist and analytical chemist who became an early leader in sports drug testing. His academic work examined how drugs are absorbed, metabolized, and excreted—knowledge essential for deciding what to look for in urine and when a compound or metabolite might remain detectable. He helped build laboratory capacity as international sport moved from occasional suspicion to formal control.\n\nEarly anti-doping analysis faced difficult conditions. Lists of prohibited stimulants and narcotics changed, analytical sensitivity was limited, and sport officials needed procedures that would survive appeals. A result had to connect an athlete to a labeled sample, preserve seals and documentation, use validated methods, and distinguish a parent drug from metabolites or chemically similar compounds.\n\nBeckett participated in Olympic drug-control work and promoted professional standards for laboratories. The broader achievement was procedural as much as chemical. A technically correct result can be ruined by a broken chain of custody; a perfectly documented sample can still be useless if the method cannot identify the substance specifically. Effective control joins collection, transport, analysis, review, and reporting.\n\nRenn’s files show controls delayed and schedules leaked to the Verano team. Beckett’s framework reveals why that is not a minor administrative flaw. Timing affects detection, and forewarning lets a program adjust doses or avoid collection. A negative result from a compromised process is not strong evidence of cleanliness. At the same time, missing paperwork alone does not prove the physician ran a doping program. It shows which tests cannot bear the weight placed on them.",
      frame:"Renn runs a finger over an unbroken seal, then points to a control notice sent hours early. “Beckett knew the chemistry starts before the bottle reaches the bench.”", q:[
        { q:"Why does pharmacokinetics matter in anti-doping?",
          o:[
            { t:"Absorption, metabolism, and excretion determine detection targets and timing.", v:"expert", fb:"Laboratories often detect metabolites within limited biological windows." },
            { t:"It predicts which athlete will win from body mass and dosage alone. in this case", v:"wrong", fb:"Performance response is complex and not the purpose of testing kinetics." },
            { t:"It guarantees every prohibited substance remains detectable for months.", v:"danger", fb:"Detection windows vary widely and may be short." },
            { t:"It identifies a sample collector’s motives from the urine chemistry.", v:"wrong", fb:"Chemistry cannot reveal administrative intent." }
          ] },
        { q:"What is chain of custody?",
          o:[
            { t:"The documented control and transfer of a sample from collection onward.", v:"expert", fb:"Continuous records protect identity, integrity, and admissibility." },
            { t:"A list ranking athletes by prior anti-doping suspicions. in this case", v:"wrong", fb:"Custody concerns the sample’s physical and documentary history." },
            { t:"A chemical chain showing how one steroid converts into another. in this case", v:"partial", fb:"Metabolic pathways matter, but they are not chain of custody." },
            { t:"Permission for team staff to hold samples before laboratory delivery.", v:"danger", fb:"Uncontrolled team access would compromise the process." }
          ] },
        { q:"What does advance warning do to a negative test?",
          o:[
            { t:"It weakens the result because timing and dosing can be adjusted.", v:"expert", fb:"Foreknowledge can help users avoid the method’s detection window." },
            { t:"It strengthens the result because athletes can prepare cleaner paperwork.", v:"danger", fb:"Administrative preparation is not evidence of an unmanipulated body." },
            { t:"It has no effect because all drugs remain detectable indefinitely.", v:"wrong", fb:"Many substances and methods have limited windows." },
            { t:"It proves the federation official personally supplied the drugs.", v:"wrong", fb:"Warning is evidence of compromised control, not automatically supply." }
          ] }
      ] },
    // cell: Lab Scientist Aro @ The Federation Office
    dp_catlin:{ sci:"Don Catlin (b. 1938)", topic:"The lab that caught the designer steroid THG", lede:"A used syringe carried an unnamed steroid to his laboratory, where its molecular fingerprint exposed the BALCO design.", no:7, profile:"Don Catlin founded and led the UCLA Olympic Analytical Laboratory, one of the major anti-doping laboratories in the United States. Over decades he developed tests for performance-enhancing drugs and worked on methods that had to keep pace with substances designed specifically to escape existing screens.\n\nThe BALCO scandal showed the challenge. In 2003, a syringe containing residue of a previously unknown designer steroid reached anti-doping authorities through coach Trevor Graham. Catlin’s laboratory analyzed the material and identified tetrahydrogestrinone, or THG. Because routine tests did not yet target it, athletes could use the substance while appearing negative. Once the structure and metabolites were understood, laboratories created a specific method and reexamined samples.\n\nDesigner drugs exploit a basic asymmetry. Chemists may alter a known steroid enough to avoid a library match while preserving anabolic activity. A laboratory cannot reliably target a molecule it has never characterized. Investigations therefore combine intelligence, seized material, reference standards, metabolism studies, and retrospective testing. A passed test means no targeted prohibited evidence was found under that method; it does not certify every possible substance absent.\n\nAro sees the same false comfort in Verano’s immaculate test history. The right inference is neither that the champion is uniquely clean nor that all testing is theater. Catlin’s case shows that a specific hidden program can outrun a method temporarily and then become visible when new chemical information arrives. Frozen samples matter because knowledge changes while molecules remain. Retrospective analysis is fair only when storage integrity, validated methods, and applicable rules are documented as carefully as the new molecular match.",
      frame:"Aro places a sealed archive vial beneath a photograph of the BALCO syringe. “Yesterday’s negative can become tomorrow’s evidence when the target finally has a name.”", q:[
        { q:"Why did THG initially evade routine testing?",
          o:[
            { t:"Laboratories lacked a targeted method for the previously unknown steroid.", v:"expert", fb:"A designer compound can escape screens until its structure and metabolites are characterized." },
            { t:"THG vanished from all samples the instant exercise began. under review", v:"wrong", fb:"Its evasion came from analytical novelty, not magical disappearance." },
            { t:"The substance was permitted whenever supplied by a private laboratory.", v:"wrong", fb:"Source does not determine whether a steroid is prohibited." },
            { t:"Every anti-doping laboratory agreed not to test BALCO athletes. under review", v:"danger", fb:"The key gap was technical knowledge, not universal collusion." }
          ] },
        { q:"What allowed Catlin’s team to develop a THG test?",
          o:[
            { t:"Physical residue supplied the molecule for structural analysis.", v:"expert", fb:"A real sample provided the reference needed to identify the designer drug." },
            { t:"A race video revealed the steroid’s chemical formula from riding style.", v:"wrong", fb:"Performance footage cannot determine molecular structure." },
            { t:"Athletes voted on which unknown steroid they thought was present.", v:"wrong", fb:"Analytical chemistry, not preference, established identity." },
            { t:"The old screening method was declared perfect without modification.", v:"danger", fb:"Detection required a newly tailored assay." }
          ] },
        { q:"Why preserve frozen samples?",
          o:[
            { t:"New methods can detect substances that earlier tests could not target.", v:"expert", fb:"Retesting extends accountability as analytical knowledge improves." },
            { t:"Freezing guarantees every drug concentration rises over time.", v:"wrong", fb:"Storage preserves material; it does not universally concentrate drugs." },
            { t:"Archived samples reveal who organized the program without other evidence.", v:"wrong", fb:"They may show exposure but not the entire conspiracy." },
            { t:"A past negative becomes proof of guilt whenever science advances.", v:"danger", fb:"Retesting still requires validated detection of a prohibited substance." }
          ] }
      ] },
    // cell: Lab Scientist Aro @ The Federation Office
    dp_ayotte:{ sci:"Christiane Ayotte (anti-doping chemist, Montreal lab)", topic:"Detecting masked steroids", lede:"She learned to hunt the metabolites, masking agents, and altered ratios left after athletes try to make steroids disappear.", no:8, profile:"Christiane Ayotte is a Canadian anti-doping chemist long associated with the Montreal laboratory. Her work has involved steroid analysis, prohibited-substance detection, method development, and the interpretation of findings that may be complicated by metabolism, contamination, medication, or deliberate masking.\n\nAthletes rarely excrete a drug in the same form and concentration in which it was taken. Enzymes transform compounds into metabolites, some short-lived and some detectable longer. Laboratories improve sensitivity by identifying these products, using chromatography and mass spectrometry, and validating how they differ from naturally produced hormones. Diuretics and other masking strategies may dilute urine or alter excretion but can themselves become analytical targets.\n\nSteroid interpretation is especially demanding because the body naturally produces related hormones. Ratios, longitudinal steroid profiles, carbon-isotope analysis, and compound-specific metabolites can help separate endogenous production from external administration. Dietary contamination and pharmaceutical manufacturing problems also require careful investigation. Specificity protects clean athletes as much as it catches sophisticated doping.\n\nIn Verano, a normal single sample may be the designed outcome of microdosing and timing. Ayotte’s approach looks for the biochemical wake: metabolite patterns, changing steroid profiles, dilution, and inconsistencies across collections. Yet an odd profile is not a license for a sensational accusation. The laboratory must show that the finding survives confirmation and plausible alternative explanations. Precision is what lets the inquiry move beyond both hero worship and “everyone dopes.” Her work makes anti-doping less dependent on catching a parent compound at one lucky moment and more capable of reading a deliberately altered excretion pattern.",
      frame:"Aro expands the chromatogram until minor metabolites fill the screen. “The parent drug may be gone. Ayotte taught laboratories to follow what metabolism leaves behind.”", q:[
        { q:"Why do laboratories often target metabolites?",
          o:[
            { t:"They may persist after the parent drug has been transformed or cleared.", v:"expert", fb:"Metabolic products can extend or sharpen the detection window." },
            { t:"Metabolites are unrelated chemicals produced only by laboratory instruments.", v:"wrong", fb:"They are biological transformation products of substances in the body." },
            { t:"Every metabolite proves a prohibited drug was intentionally taken.", v:"danger", fb:"Source, thresholds, and alternative exposure explanations still matter." },
            { t:"Parent compounds can never be measured in any anti-doping sample.", v:"wrong", fb:"Some parent drugs are detectable; metabolites are often additional targets." }
          ] },
        { q:"How can a diuretic function as a masking agent?",
          o:[
            { t:"It can dilute urine or change excretion while also being detectable itself.", v:"expert", fb:"Dilution may reduce concentrations, though the diuretic can trigger a finding." },
            { t:"It permanently replaces all prohibited molecules with water. in this case", v:"wrong", fb:"Dilution does not chemically erase every analyte." },
            { t:"It raises red-cell mass directly for the entire competition season. in this case", v:"wrong", fb:"Diuretics reduce fluid volume rather than building sustained red-cell mass." },
            { t:"It guarantees a negative result under every modern laboratory method.", v:"danger", fb:"Modern programs test for many diuretics and use validity checks." }
          ] },
        { q:"Why are longitudinal steroid profiles useful?",
          o:[
            { t:"Each athlete’s pattern can reveal changes hidden by population cutoffs.", v:"expert", fb:"Within-person comparison can detect unusual shifts from an established baseline." },
            { t:"They prove that every stable profile belongs to a clean athlete.", v:"danger", fb:"Careful dosing may avoid obvious shifts, and profiles have uncertainty." },
            { t:"They replace all confirmatory chemistry with visual inspection. in this case", v:"wrong", fb:"Profiles trigger and support deeper analytical evaluation." },
            { t:"They identify the physician solely from the shape of the graph. in this case", v:"wrong", fb:"Responsibility requires documentary and testimonial evidence." }
          ] }
      ] },
    // cell: Soigneur Vela @ The Federation Office
    dp_ekblom:{ sci:"Björn Ekblom (b. 1938)", topic:"Blood doping & the physiology of EPO", lede:"By removing and reinfusing blood, he showed exactly why more red cells can turn oxygen transport into speed.", no:9, profile:"Björn Ekblom is a Swedish exercise physiologist whose research helped establish the performance effects of blood doping. Blood doping increases oxygen-carrying capacity by raising red-cell mass, historically through transfusion and later through drugs such as recombinant erythropoietin, or EPO. Ekblom’s controlled studies examined how changing hemoglobin mass affected maximal oxygen uptake and endurance.\n\nIn transfusion experiments, blood was withdrawn, stored, and later reinfused after the body had begun replacing the removed cells. Reinfusion could raise hemoglobin and VO2 max, improving endurance performance. The mechanism follows the Fick principle: oxygen consumption depends on blood flow multiplied by the arterial-venous oxygen difference. More hemoglobin can increase oxygen delivered per unit of blood.\n\nThe manipulation carries risks. Excess red-cell concentration can increase blood viscosity, while transfusion adds risks of reaction, infection, and identification errors. EPO stimulates the athlete’s own red-cell production but can also push hematology dangerously. Hydration, altitude, illness, and training affect measured concentrations, so anti-doping assessment must distinguish concentration from total red-cell mass and inspect trends.\n\nVela’s fridge schedule and Aro’s passport data fit Ekblom’s physiology better than a vague story about extraordinary will. Still, a high hemoglobin reading alone is not proof. The case grows when rises, reticulocyte responses, training dates, and control avoidance align. Blood doping is a specific mechanism with measurable consequences—not evidence that every rider cheats, and not a miracle talent beyond analysis. That mechanistic sequence lets experts test the team’s altitude explanation against dates and marrow behavior instead of treating either performance or suspicion as self-validating.",
      frame:"Vela opens a training chart where power rises after an unexplained “recovery” day. “Ekblom showed what extra red cells buy. The schedule tells us when somebody may have paid for it.”", q:[
        { q:"How can blood doping improve endurance?",
          o:[
            { t:"More red-cell mass increases oxygen-carrying capacity to working muscle.", v:"expert", fb:"Extra hemoglobin can raise maximal oxygen delivery and aerobic performance." },
            { t:"Stored blood supplies an unlimited reserve of muscle glycogen.", v:"wrong", fb:"Transfusion changes blood cells, not carbohydrate storage directly." },
            { t:"It reduces the body’s need for a heart or capillary circulation.", v:"wrong", fb:"The cardiovascular chain remains necessary to deliver oxygen." },
            { t:"It works only by convincing athletes that they feel stronger. in this case", v:"danger", fb:"Controlled studies show a real physiological mechanism beyond placebo." }
          ] },
        { q:"What is the key distinction between concentration and red-cell mass?",
          o:[
            { t:"Plasma-volume shifts can change concentration without adding total cells.", v:"expert", fb:"Dehydration may raise hematocrit even when total red-cell mass is unchanged." },
            { t:"They are always identical under every hydration and altitude condition.", v:"wrong", fb:"Fluid balance can separate the two measurements." },
            { t:"Only concentration influences oxygen transport during exercise. in this case", v:"partial", fb:"Concentration matters, but total hemoglobin mass is a deeper capacity measure." },
            { t:"Red-cell mass can be read directly from one ordinary urine sample.", v:"wrong", fb:"It requires blood-based or specialized measurement approaches." }
          ] },
        { q:"Which evidence would strengthen a transfusion hypothesis?",
          o:[
            { t:"Blood shifts, low reticulocytes, timing records, and control avoidance align.", v:"expert", fb:"Multiple physiological and logistical clues can converge on reinfusion." },
            { t:"The athlete wins one mountain stage after years of steady training. in this case", v:"danger", fb:"A performance result alone does not identify a blood manipulation." },
            { t:"A single hematocrit value is high during documented dehydration. under review", v:"partial", fb:"Dehydration is an alternative explanation that must be resolved." },
            { t:"The team physician praises altitude training in an interview. in this case", v:"wrong", fb:"Public explanation is not independent biological evidence." }
          ] }
      ] },
    // cell: Soigneur Vela @ The Federation Office
    dp_parisotto:{ sci:"Robin Parisotto (sports scientist, EPO & blood passport)", topic:"Blood markers of doping", lede:"He helped turn blood counts into a longitudinal fingerprint, making indirect EPO effects visible after the drug itself faded.", no:10, profile:"Robin Parisotto is an Australian sports scientist associated with the development of hematological approaches to detecting blood doping. Directly finding recombinant EPO in urine can be difficult because the molecule may clear while its effects on red-cell production remain. Parisotto and colleagues investigated combinations of blood markers that could reveal those effects.\n\nEPO stimulates immature red cells called reticulocytes to enter circulation. Hemoglobin and hematocrit may rise later. During use, reticulocytes can be elevated; after dosing stops, feedback may suppress them while hemoglobin remains high. Models combining markers were developed to identify patterns inconsistent with ordinary physiology. This work contributed to the logic behind the athlete biological passport.\n\nA passport does not search for one named molecule. It builds an athlete-specific record and asks whether new values fit the person’s expected range after accounting for analytical and biological variation. Altitude exposure, illness, bleeding, dehydration, and laboratory factors can shift markers, so expert review and documented context are essential. The strength is longitudinal: each sample informs interpretation of the next.\n\nThe Verano program was allegedly designed around short direct-detection windows. Parisotto’s method attacks that strategy by following consequences across weeks and seasons. Aro’s concern is not one spectacular number but a sequence: stimulated production, rising oxygen capacity, then suppressed reticulocytes around competition. Such a pattern can justify targeted testing and formal passport review without declaring every exceptional athlete guilty. The method is most persuasive when laboratory precision, collection timing, and medical context are preserved well enough for independent experts to reproduce the interpretation.",
      frame:"Vela traces the reticulocyte curve with a grease pencil. “The dose may be gone by race day. Parisotto followed the marrow’s response after the syringe left the room.”", q:[
        { q:"Why can blood markers reveal EPO after direct detection ends?",
          o:[
            { t:"Red-cell production changes persist longer than the drug in the sample.", v:"expert", fb:"The biological response can outlast the direct analytical window." },
            { t:"EPO permanently dyes every mature red cell a unique color. under review", v:"wrong", fb:"Detection relies on counts and molecular methods, not visible dye." },
            { t:"The body stores every injected dose unchanged in plasma for years. in this case", v:"wrong", fb:"EPO is cleared while hematological effects evolve." },
            { t:"Any endurance improvement automatically creates an abnormal passport.", v:"danger", fb:"Training gains can occur within normal biological ranges." }
          ] },
        { q:"What are reticulocytes?",
          o:[
            { t:"Young red blood cells recently released from bone marrow.", v:"expert", fb:"Their proportion reflects recent erythropoietic activity." },
            { t:"White blood cells that transport oxygen during hard exercise.", v:"wrong", fb:"Hemoglobin-containing red cells carry oxygen." },
            { t:"Platelets enlarged by dehydration during competition.", v:"wrong", fb:"Reticulocytes are immature erythrocytes, not platelets." },
            { t:"Synthetic EPO molecules counted directly by a blood analyzer.", v:"wrong", fb:"They are the body’s cells responding to production signals." }
          ] },
        { q:"What gives the biological passport its main strength?",
          o:[
            { t:"Repeated within-athlete measurements expose unlikely personal changes.", v:"expert", fb:"Longitudinal comparison can reveal manipulation hidden within population ranges." },
            { t:"One universal cutoff proves guilt for every athlete worldwide. under review", v:"danger", fb:"The passport models individual variation rather than relying only on one cutoff." },
            { t:"It ignores altitude, illness, hydration, and analytical uncertainty.", v:"wrong", fb:"Those factors must be considered during expert review." },
            { t:"It replaces sample collection with coaches’ reports about training.", v:"wrong", fb:"Laboratory measurements remain central." }
          ] }
      ] },
    // cell: Control Officer Renn @ The Federation Office
    dp_lasne:{ sci:"Françoise Lasne (anti-doping scientist)", topic:"The urine test for EPO", lede:"She separated natural and recombinant EPO patterns in urine, giving laboratories a direct view of a hormone made to mimic the body.", no:11, profile:"Françoise Lasne is a French anti-doping scientist whose work helped create a direct urine test for recombinant erythropoietin. EPO is a glycoprotein hormone produced mainly by the kidneys that stimulates red-cell production. Pharmaceutical EPO was developed to treat anemia, but its endurance benefit made it attractive in sport.\n\nNatural and recombinant EPO share their protein backbone yet differ in patterns of attached sugar chains and electrical charge. Lasne and colleagues used isoelectric focusing to separate EPO isoforms according to charge, followed by immunological detection. The resulting band patterns could distinguish typical endogenous hormone from pharmaceutical preparations. The method was introduced into elite anti-doping around the 2000 Olympic era and evolved as new EPO products appeared.\n\nDirect testing has limits. Urinary concentrations can be low, the detection window is short, samples degrade, and manufacturers can produce molecules with new patterns. Laboratories need validated controls and careful interpretation to avoid mistaking technical artifacts or unusual natural profiles for doping. Direct EPO analysis therefore complements, rather than eliminates, longitudinal blood evidence.\n\nRenn’s control records show that Verano athletes were repeatedly tested after delays. Lasne’s work explains why hours and days matter. A negative sample collected outside the window cannot certify the preceding training block. Conversely, a valid recombinant pattern is powerful chemical evidence. The inquiry must distinguish absence of detection from evidence of absence, then connect any finding to the physician, schedule, and sample chain. Her contribution also illustrates an arms race: each new pharmaceutical form forces laboratories to update reference patterns while preserving specificity for naturally produced hormone.",
      frame:"Renn points to two band patterns: one broad, one shifted. “Lasne made a near-copy of a human hormone betray its manufacturing history. But only if we collect while the trail remains.”", q:[
        { q:"How can recombinant EPO differ from natural EPO analytically?",
          o:[
            { t:"Its sugar chains create a distinguishable pattern of electrical charges.", v:"expert", fb:"Isoelectric focusing can separate isoforms with different charge distributions." },
            { t:"It contains iron filings that settle visibly at the bottom of urine.", v:"wrong", fb:"The distinction is molecular, not a visible sediment." },
            { t:"It changes every red blood cell into a white blood cell. in this case", v:"wrong", fb:"EPO stimulates erythropoiesis rather than changing cell lineage." },
            { t:"It always remains unchanged in urine for an entire season. in this case", v:"danger", fb:"The direct detection window can be limited." }
          ] },
        { q:"What does isoelectric focusing do?",
          o:[
            { t:"It separates protein forms according to their isoelectric charge behavior.", v:"expert", fb:"Different EPO isoforms migrate to characteristic positions in a pH gradient." },
            { t:"It counts race photographs to estimate the athlete’s effort. in this case", v:"wrong", fb:"The method is laboratory protein separation." },
            { t:"It amplifies DNA sequences from the athlete’s muscle cells. in this case", v:"wrong", fb:"That describes a different family of molecular techniques." },
            { t:"It proves who administered a hormone from the band pattern alone.", v:"wrong", fb:"The pattern identifies the substance, not the organizer." }
          ] },
        { q:"Why do delayed controls matter for EPO?",
          o:[
            { t:"The drug may clear before collection while blood effects persist.", v:"expert", fb:"A missed direct window can leave only indirect hematological evidence." },
            { t:"Delay makes recombinant EPO become legally permitted retroactively.", v:"wrong", fb:"Rule status does not change with collection timing." },
            { t:"Every hour of delay creates a false positive in clean urine.", v:"wrong", fb:"Delay may reduce detectability rather than automatically create positives." },
            { t:"A late negative proves the earlier training period was clean.", v:"danger", fb:"A negative outside the window cannot support that conclusion." }
          ] }
      ] },
    // cell: Control Officer Renn @ The Federation Office
    dp_ashenden:{ sci:"Michael Ashenden (sports scientist, biological passport)", topic:"The athlete biological passport", lede:"He made an athlete’s own history the comparator, so a “normal” population value could still look abnormal in sequence.", no:12, profile:"Michael Ashenden is an Australian sports scientist known for research and expert work on blood doping and the athlete biological passport. He studied how hemoglobin, reticulocytes, altitude, transfusion, and EPO interact, and he argued for longitudinal surveillance when direct tests alone left exploitable gaps.\n\nPopulation reference ranges are blunt. An athlete with naturally low hemoglobin might raise it substantially yet remain inside a broad “normal” interval. A passport uses repeated measurements and adaptive statistical models to estimate what is plausible for that individual. Values are interpreted together, with attention to sample quality, timing, altitude exposure, illness, bleeding, and other explanations.\n\nPassport evidence is indirect: it detects the biological consequences of a prohibited method rather than necessarily finding the drug or stored blood. That does not make it weak, but it changes the reasoning. Experts evaluate the probability of the sequence under normal conditions, seek corroborating information, and follow formal procedures that allow review and challenge. The goal is not to punish unusual physiology; it is to identify changes too structured to dismiss as ordinary variation.\n\nAro’s Verano file contains values that each sit near accepted ranges while their order tracks camp and race dates with remarkable precision. Ashenden’s method treats the sequence as the evidence. The overclaim says a clean champion simply lives at the edge of human ability; the dismissal says everyone’s blood is strange. A passport asks a sharper question: is this athlete’s own pattern credible without manipulation? A formal conclusion should explain the improbable sequence, not merely attach a suspicious label to an athlete with unusual biology.",
      frame:"Renn covers the population range and leaves only the athlete’s time series visible. “Ashenden would compare this rider with himself before comparing him with the world.”", q:[
        { q:"Why can population reference ranges miss manipulation?",
          o:[
            { t:"A large personal shift may remain inside a broad group interval.", v:"expert", fb:"Within-athlete baselines can reveal changes hidden by population cutoffs." },
            { t:"Population ranges contain no measurements from real human beings.", v:"wrong", fb:"They summarize real groups but can be too broad for individual change." },
            { t:"Every value inside a reference range is scientifically meaningless.", v:"danger", fb:"Values remain informative when interpreted with context and history." },
            { t:"Manipulated blood always lies below the population average.", v:"wrong", fb:"Doping can shift markers in several directions and phases." }
          ] },
        { q:"Why is passport evidence called indirect?",
          o:[
            { t:"It detects physiological effects rather than necessarily finding the agent.", v:"expert", fb:"The method infers manipulation from an unlikely biological pattern." },
            { t:"It relies only on anonymous rumors supplied by rival teams. in this case", v:"wrong", fb:"Laboratory blood measurements are the core evidence." },
            { t:"It never uses statistics or validated sample procedures. in this case", v:"wrong", fb:"Adaptive models and standardized collection are fundamental." },
            { t:"Indirect evidence cannot support any formal anti-doping action.", v:"danger", fb:"Robust indirect evidence can be probative under established procedures." }
          ] },
        { q:"Which alternative must experts consider?",
          o:[
            { t:"Altitude, illness, bleeding, hydration, and analytical variation.", v:"expert", fb:"Plausible non-doping causes must be evaluated before concluding manipulation." },
            { t:"Whether the athlete’s story is inspirational to the public.", v:"wrong", fb:"Narrative appeal does not explain hematological change." },
            { t:"Whether every teammate has an identical blood sequence.", v:"partial", fb:"Team patterns may help, but individual explanations remain necessary." },
            { t:"Whether a federation prefers direct tests for public relations.", v:"wrong", fb:"Scientific interpretation should not follow publicity preferences." }
          ] }
      ] },
    // cell: Lab Scientist Aro @ The Anti-Doping Laboratory
    dp_franke:{ sci:"Werner Franke (1940–2022)", topic:"Exposing the East German state doping program", lede:"He read secret pharmaceutical records as evidence, exposing how a state converted young athletes into planned experiments.", no:13, profile:"Werner Franke was a German molecular and cell biologist known both for cancer and cytoskeleton research and for exposing the former East German doping system. Together with his wife, former elite athlete Brigitte Berendonk, he examined documents recovered after German reunification that described a centrally organized program of performance-enhancing drugs.\n\nThe records included research plans, dosing schedules, reports, and coded references associated with State Plan 14.25. Anabolic steroids such as Oral-Turinabol were administered to athletes, including minors, often without meaningful informed consent. Coaches, physicians, scientists, and security structures helped convert doping from scattered rule-breaking into policy. Medal production was linked to biomedical monitoring and secrecy.\n\nFranke’s scientific background helped him interpret the pharmacology and documentary language. A list of substances alone would not prove who received what; schedules, names or codes, medical observations, and institutional chains supplied the architecture. The human cost included lasting reproductive, cardiovascular, psychiatric, and other health harms reported by former athletes.\n\nAro should look for the same distinction at Verano. A suspicious sample can implicate an exposure; a systematic program appears when prescriptions, storage, timing, testing intelligence, and authority connect. The East German case does not prove every successful team runs a state machine, and it does not make anti-doping hopeless. It shows why documents and logistics are essential when clean test sheets were themselves part of the planned appearance. The documents made it possible to distinguish athletes used by the machinery from professionals who designed, monitored, and concealed that machinery over many competitive seasons.",
      frame:"Aro opens a coded medication ledger beside the team’s “recovery protocol.” “Franke did not expose a system with one positive urine. He exposed the paperwork that made negatives possible.”", q:[
        { q:"What made the East German doping program systematic?",
          o:[
            { t:"State plans connected drugs, doctors, coaches, monitoring, and secrecy.", v:"expert", fb:"The evidence showed an organized institutional structure rather than isolated use." },
            { t:"Every athlete independently chose the same supplement by coincidence.", v:"danger", fb:"Central documents and coordinated administration contradict that account." },
            { t:"One laboratory instrument produced false positives for an entire decade.", v:"wrong", fb:"The program was documented through records and testimony beyond testing artifacts." },
            { t:"Foreign rivals invented all records after German reunification.", v:"wrong", fb:"Recovered internal documents and corroborating accounts supported the findings." }
          ] },
        { q:"Why were the documents especially powerful?",
          o:[
            { t:"They linked substances and schedules to institutional roles and decisions.", v:"expert", fb:"Program responsibility requires more than detecting a molecule in one athlete." },
            { t:"A document automatically proves every handwritten claim is accurate.", v:"danger", fb:"Authenticity, context, and corroboration still need evaluation." },
            { t:"The papers contained no codes, technical terms, or missing information.", v:"wrong", fb:"Interpreting records required scientific and historical reconstruction." },
            { t:"They showed performance drugs have no medical risks for young athletes.", v:"wrong", fb:"Former athletes reported serious long-term harms." }
          ] },
        { q:"What pattern would indicate a Verano program rather than solo use?",
          o:[
            { t:"Medical orders, stored products, synchronized dosing, and test warnings align.", v:"expert", fb:"Converging logistics can establish coordinated control." },
            { t:"The champion gives an unusually confident interview after a victory.", v:"wrong", fb:"Confidence is not evidence of organization." },
            { t:"One teammate has a naturally high hematocrit at altitude. in this case", v:"partial", fb:"A single explainable value does not show a system." },
            { t:"The sport has a historical reputation for widespread doping. in this case", v:"danger", fb:"Field reputation cannot assign conduct in this case." }
          ] }
      ] },
    // cell: Lab Scientist Aro @ The Anti-Doping Laboratory
    dp_berendonk:{ sci:"Brigitte Berendonk (b. 1942)", topic:"Documenting state-sponsored doping", lede:"An Olympic thrower preserved the documents that showed medals, hormones, and silence had been administered together.", no:14, profile:"Brigitte Berendonk competed for East Germany in the shot put and discus and later became a physician. She experienced the elite sports system from inside and came to understand that athletes were being given performance-enhancing substances under medical and coaching authority. After leaving East Germany, she became a prominent critic of the program.\n\nFollowing German reunification, Berendonk and Werner Franke studied records from the former system. Her 1991 book Doping Documents described a broad state-sponsored enterprise involving anabolic steroids, research institutes, sports physicians, coaches, and secret planning. The documents helped move public debate from allegation to a reconstructable administrative history.\n\nBerendonk’s position matters because athletes in such systems occupy complicated roles. Some knew or suspected what they were taking; others were minors or were given pills described as vitamins or support medication. Consent under authoritarian sporting pressure cannot be inferred from swallowing a tablet. The program’s victims could also be its public symbols.\n\nSoigneur Vela sees a smaller version of that ambiguity in Verano. The champion may have benefited and may bear responsibility, but the inquiry asks who designed and controlled the medical schedule. Berendonk’s lesson is to separate athlete exposure from program authorship using records, access, and power. Declaring a flawless clean hero ignores the system; saying everyone dopes erases coercion, accountability, and the possibility of proving a particular scheme. That distinction keeps the inquiry centered on informed choice, medical duty, and command rather than reducing every participant to either innocent icon or willing cheat in a national system.",
      frame:"Aro places Berendonk’s documentary work beside consent forms signed after the camp ended. “An athlete’s body can contain evidence without the athlete being the architect.”", q:[
        { q:"What did Berendonk’s documentary work establish?",
          o:[
            { t:"Doping was organized through state sporting and medical institutions.", v:"expert", fb:"The records revealed coordinated policy and administration." },
            { t:"Only a few athletes secretly bought steroids without official knowledge.", v:"danger", fb:"That account conflicts with the documented institutional program." },
            { t:"Every East German sports result was fabricated rather than performed.", v:"wrong", fb:"Athletes performed, but many were pharmacologically manipulated." },
            { t:"Anabolic steroids had been openly listed as vitamins on public labels.", v:"partial", fb:"Deceptive descriptions occurred, but the wider finding was systemic organization." }
          ] },
        { q:"Why is athlete consent difficult to infer in such a system?",
          o:[
            { t:"Minors and dependent athletes may receive drugs under coercive authority.", v:"expert", fb:"Taking a substance does not prove informed, voluntary agreement." },
            { t:"Elite athletes are biologically incapable of understanding medication.", v:"wrong", fb:"The issue is information and power, not incapacity by athletic status." },
            { t:"Any benefit automatically eliminates the possibility of victimization.", v:"danger", fb:"Benefit can coexist with deception, coercion, and health harm." },
            { t:"Consent is irrelevant whenever a team wins international medals.", v:"wrong", fb:"Success does not erase medical ethics." }
          ] },
        { q:"What should investigators separate in Verano?",
          o:[
            { t:"Evidence of athlete exposure from evidence of program authorship.", v:"expert", fb:"The body may show use while records identify who designed and controlled it." },
            { t:"The champion’s popularity from every laboratory measurement.", v:"wrong", fb:"Public image is not a biological or documentary finding." },
            { t:"Team medical decisions from the physician who signed them.", v:"danger", fb:"Authorship and authority are precisely what must be traced." },
            { t:"The present case from all lessons of historical doping systems.", v:"partial", fb:"History informs questions, though it cannot decide facts by analogy." }
          ] }
      ] },
    // cell: Soigneur Vela @ The Anti-Doping Laboratory
    dp_yesalis:{ sci:"Charles Yesalis (epidemiologist, anabolic steroids)", topic:"The spread of steroid use", lede:"He studied steroids as a population problem, showing that use spreads through gyms, schools, medicine, and sporting cultures.", no:15, profile:"Charles Yesalis was an epidemiologist and public-health scholar who studied anabolic-androgenic steroids and other performance-enhancing drugs. Rather than focusing only on elite positive tests, he examined prevalence, motives, health consequences, and the social environments that make use possible among athletes and non-athletes.\n\nAnabolic steroids are synthetic relatives of testosterone that can increase muscle protein synthesis and support gains in strength and lean mass when combined with training. Effects vary with compound, dose, duration, nutrition, and individual biology. Risks can include endocrine suppression, infertility, cardiovascular changes, liver injury with some oral agents, psychiatric effects, and harms from unregulated products or injection practices.\n\nEstimating use is difficult. Surveys depend on honesty and definitions; test positives miss users outside detection windows; clinic populations are not representative; and stigma can suppress reporting. Yesalis emphasized that a low official positive rate is not the same as a low prevalence. He also rejected the idea that one stereotype captures all users or motives.\n\nVela’s camp testimony fits a network model: access, norms, medical language, and fear of losing selection can shape decisions. Yet prevalence cannot convict Dr. Reuss. The inquiry needs specific schedules, products, markers, and control interference. Yesalis helps defeat the dismissal that a dirty sport makes one record meaningless. Widespread risk increases the need for precise case evidence; it does not make accountability impossible. Public-health analysis therefore studies supply, normalization, body image, competitive pressure, and medical access alongside the pharmacology itself, without converting prevalence into individual accusation or assuming one pathway explains every user.",
      frame:"Vela closes a locker full of ordinary supplements. “Yesalis studied the culture around the vial. Not every powder is a drug, and not every user arrives through the same door.”", q:[
        { q:"Why are official positive rates poor estimates of total steroid use?",
          o:[
            { t:"Testing misses some users, windows, populations, and undisclosed behavior.", v:"expert", fb:"Detected cases are a selected subset of actual exposure." },
            { t:"Every steroid user tests positive during every collection. in this case", v:"wrong", fb:"Timing, substances, and methods can produce negative tests." },
            { t:"Surveys always produce exact answers with no reporting bias. in this case", v:"wrong", fb:"Stigma and question wording affect self-report." },
            { t:"Positive rates are meaningless because laboratories invent all results.", v:"danger", fb:"Testing provides evidence despite incomplete coverage." }
          ] },
        { q:"What is a primary anabolic effect of these steroids?",
          o:[
            { t:"They can support muscle protein synthesis and strength gains with training.", v:"expert", fb:"Anabolic-androgenic compounds can increase lean mass and performance capacity." },
            { t:"They replace the need for resistance training and dietary energy.", v:"danger", fb:"Drugs do not eliminate training, nutrition, or individual response." },
            { t:"They directly create red blood cells without affecting other tissues.", v:"partial", fb:"Some androgens affect erythropoiesis, but their actions are much broader." },
            { t:"They improve only coordination while leaving muscle unchanged. under review", v:"wrong", fb:"Muscle and strength effects are central reasons for misuse." }
          ] },
        { q:"How should prevalence evidence be used here?",
          o:[
            { t:"It frames risk but cannot identify the physician behind this program.", v:"expert", fb:"Population patterns do not substitute for person-specific evidence." },
            { t:"It proves every elite athlete in the sport uses the same regimen.", v:"danger", fb:"No prevalence estimate supports universal individual guilt." },
            { t:"It makes medical records and sample evidence unnecessary.", v:"wrong", fb:"Direct case evidence remains essential." },
            { t:"It proves the champion is clean because official positives are rare.", v:"danger", fb:"Low detection rates do not certify an individual." }
          ] }
      ] },
    // cell: Soigneur Vela @ The Anti-Doping Laboratory
    dp_prokop:{ sci:"Ludwig Prokop (1920–2013)", topic:"Sports medicine & early doping controls", lede:"He helped early sports medicine confront a problem it could not solve with moral lectures alone: drugs required rules and laboratories.", no:16, profile:"Ludwig Prokop was an Austrian physician and sports-medicine figure active during the period when international sport began formalizing doping controls. Early anti-doping efforts had to define prohibited practices, persuade federations to collect samples, and build scientific methods capable of supporting sanctions rather than relying on rumor or visible collapse.\n\nSports medicine occupied an uneasy position. Physicians could protect athlete health, study exercise, and treat injury, but medical authority could also be used to rationalize stimulants, hormones, and risky recovery practices. Effective control required independence from team performance goals. It also required distinguishing therapeutic treatment from enhancement and documenting any permitted medical use.\n\nThe first control systems were limited. They focused heavily on stimulants and narcotics, had narrower analytical menus, and often tested only around competitions. Programs adapted by changing substances, doses, and timing. The history explains why modern anti-doping added out-of-competition testing, accredited laboratories, therapeutic-use procedures, intelligence, and long-term sample storage.\n\nRenn’s Verano file shows the danger of treating control as a ceremonial visit. Tests announced through federation channels let the physician prepare a clean window. Prokop’s era teaches that rules without implementation are public theater, but imperfect beginnings are not meaningless. The right response is to identify where independence failed and restore it—not to crown the athlete clean because forms exist, or declare all forms worthless because some were compromised. A credible system must make surprise real, protect collectors from sporting influence, and give laboratories enough authority and information to pursue unexpected findings across competitions and training periods.",
      frame:"Vela holds up an old control card beside the team’s modern app notification. “The equipment changed. The old weakness—letting performance staff shape medical policing—did not.”", q:[
        { q:"Why must anti-doping medicine be independent of team performance goals?",
          o:[
            { t:"The same authority should not both enhance performance and police it.", v:"expert", fb:"Conflicted medical control can turn health oversight into program protection." },
            { t:"Team physicians can never provide legitimate treatment to athletes.", v:"wrong", fb:"Clinical care is appropriate when ethically and transparently delivered." },
            { t:"Independence guarantees no athlete will ever use a prohibited drug.", v:"danger", fb:"It reduces conflicts but cannot eliminate all misconduct." },
            { t:"Only retired athletes are qualified to collect biological samples.", v:"wrong", fb:"Collectors require training and procedural independence, not athletic retirement." }
          ] },
        { q:"Why were early competition-only controls easy to evade?",
          o:[
            { t:"Users could alter timing and stop substances before scheduled events.", v:"expert", fb:"Predictable narrow windows favor planned avoidance." },
            { t:"Competition samples contain no measurable drugs or metabolites.", v:"wrong", fb:"Many substances can be detected in competition samples." },
            { t:"Athletes were legally allowed to dope during all training periods.", v:"wrong", fb:"Rules evolved, but the analytical gap was not simple permission." },
            { t:"A single event test reveals every exposure from the prior year.", v:"danger", fb:"Most direct detection windows are far shorter." }
          ] },
        { q:"What is the best response to a compromised control system?",
          o:[
            { t:"Document the failure and strengthen independent collection and oversight.", v:"expert", fb:"Reform should target the specific procedural vulnerability." },
            { t:"Declare every athlete tested by it guilty without further evidence.", v:"danger", fb:"System weakness does not establish universal violations." },
            { t:"Treat all negative samples as permanent certificates of cleanliness.", v:"danger", fb:"Compromised timing sharply limits that inference." },
            { t:"End laboratory testing and rely entirely on sporting reputation.", v:"wrong", fb:"Reputation is less probative than improved evidence." }
          ] }
      ] },
    // cell: Control Officer Renn @ The Anti-Doping Laboratory
    dp_bergstrom:{ sci:"Jonas Bergström (1929–2001)", topic:"The muscle-biopsy needle & glycogen", lede:"His needle made living muscle chemically readable, revealing how glycogen stores fall, refill, and shape endurance.", no:17, profile:"Jonas Bergström was a Swedish physician and researcher associated with development and use of the percutaneous muscle-biopsy needle. Earlier biopsies often required surgical exposure. The improved needle approach allowed small samples of skeletal muscle to be taken repeatedly with local anesthesia, making controlled studies of human exercise and metabolism far more practical.\n\nWorking with Eric Hultman and others, Bergström helped show how muscle glycogen changes with diet and exercise. Prolonged activity can deplete glycogen, while a high-carbohydrate diet after depletion can produce unusually large stores. Endurance time was strongly related to starting glycogen in classic studies. The work provided a physiological basis for carbohydrate loading.\n\nRepeated biopsy transformed claims about fatigue into measurements of substrate, enzymes, and fiber response. It also taught humility: one small sample represents a limited region of one muscle, and the procedure itself, timing, handling, and laboratory analysis affect results. Invasive measurement is powerful because it reaches mechanism, not because it is automatically complete.\n\nRenn can use that lesson when comparing Verano’s legal nutrition program with its secret medical schedule. Glycogen loading can explain improved endurance and is not doping. It cannot explain coordinated hemoglobin and reticulocyte anomalies. Bergström helps keep mechanisms separate. Investigators should credit lawful physiology where it fits, then refuse to let a true carbohydrate story cover a different blood story. The narrow tissue core also reminds investigators to avoid asking one measurement to answer questions about another compartment, especially when legal fueling and prohibited blood manipulation coexist within the same performance record.",
      frame:"Renn taps a biopsy diagram beside the team meal plan. “Bergström proved carbohydrates can change endurance honestly. That makes them a control explanation, not an all-purpose alibi.”", q:[
        { q:"What did the biopsy needle make possible?",
          o:[
            { t:"Repeated small samples of living human skeletal muscle.", v:"expert", fb:"Researchers could follow biochemical changes across controlled conditions." },
            { t:"Removal of an athlete’s entire muscle without surgery.", v:"wrong", fb:"The method collects a small tissue core." },
            { t:"Direct measurement of every red cell circulating in the body.", v:"wrong", fb:"A muscle sample does not measure total blood-cell mass." },
            { t:"A permanent record of every substance ever taken by the athlete.", v:"danger", fb:"Biopsy chemistry reflects limited tissue and time." }
          ] },
        { q:"What did classic glycogen studies show?",
          o:[
            { t:"Higher starting muscle glycogen can prolong endurance performance.", v:"expert", fb:"Carbohydrate availability helps sustain prolonged work." },
            { t:"Glycogen loading directly creates recombinant EPO in muscle.", v:"wrong", fb:"Carbohydrate storage and EPO administration are distinct mechanisms." },
            { t:"Once glycogen is high, fatigue becomes biologically impossible.", v:"danger", fb:"Many other limits remain, and stores are finite." },
            { t:"A low-carbohydrate diet always maximizes endurance in every event.", v:"wrong", fb:"Classic loading work found benefit from increased carbohydrate stores." }
          ] },
        { q:"Why is a true nutrition explanation not a complete alibi?",
          o:[
            { t:"It may explain fuel gains but not independent blood-marker anomalies.", v:"expert", fb:"Different mechanisms should account for their own predicted evidence." },
            { t:"Legal nutrition cannot improve elite performance under any circumstances.", v:"wrong", fb:"Dietary strategies can produce real gains." },
            { t:"Every athlete who loads carbohydrate also uses prohibited hormones.", v:"danger", fb:"One practice does not imply the other." },
            { t:"Muscle and blood measurements are always identical quantities.", v:"wrong", fb:"They describe different compartments and processes." }
          ] }
      ] },
    // cell: Control Officer Renn @ The Anti-Doping Laboratory
    dp_rodchenkov:{ sci:"Grigory Rodchenkov (b. 1958)", topic:"The lab chief who exposed a national doping program", lede:"The laboratory chief who helped defeat testing later revealed the sample-swapping system built behind the laboratory wall.", no:18, profile:"Grigory Rodchenkov was director of the Moscow anti-doping laboratory and became a central witness to Russia’s state-supported doping and concealment. He had deep analytical knowledge of prohibited substances and testing, but he also participated in a system designed to protect selected athletes. His later disclosures showed how expertise can be used both to enforce and to defeat control.\n\nRodchenkov described a steroid mixture timed to reduce detection and a prearranged scheme during the 2014 Sochi Winter Olympics. Officials had collected clean urine from protected athletes in advance. At night, sealed sample bottles were passed through an opening in the laboratory wall, opened by security personnel, and replaced with stored clean urine while identifying information was preserved. Salt and other characteristics sometimes had to be adjusted.\n\nHis account was investigated through documentary evidence, forensic examination of bottles, data, and independent inquiries including the McLaren reports. The scandal demonstrated that an accredited laboratory can produce negative results inside a corrupt chain. It also required caution: whistleblower testimony gains strength when corroborated, and responsibility must be assigned through records rather than nationality or association.\n\nRenn’s Verano concern is smaller but structurally familiar: advance warning, delayed collection, and physician-controlled logistics can engineer negatives without changing the instrument. Rodchenkov’s story destroys the claim that passed tests settle the matter, but it does not prove everyone dopes. It shows exactly what evidence a program leaves—communications, substitute samples, altered custody, dosing schedules, and insiders able to explain how the pieces fit. Corroboration turned an insider narrative into a testable account.",
      frame:"Renn sets a sealed bottle under magnification. “Rodchenkov knew the machine could be honest while the process around it lied. Follow the bottle, not the accreditation plaque.”", q:[
        { q:"How were protected Sochi samples allegedly replaced?",
          o:[
            { t:"Sealed bottles were covertly opened and clean stored urine substituted.", v:"expert", fb:"The scheme preserved labels while changing the biological contents." },
            { t:"Laboratory instruments were programmed to call every drug vitamin C.", v:"wrong", fb:"The reported operation relied heavily on physical sample swapping." },
            { t:"Athletes drank clean urine immediately before each competition test.", v:"wrong", fb:"Stored substitute samples were used behind the laboratory process." },
            { t:"Every Russian sample was destroyed without any result being reported.", v:"danger", fb:"The scheme targeted protected samples rather than erasing the entire event." }
          ] },
        { q:"Why did laboratory accreditation not guarantee valid negatives?",
          o:[
            { t:"Corrupt custody and substitution can defeat accurate analytical instruments.", v:"expert", fb:"A reliable method cannot rescue a sample whose identity was changed." },
            { t:"Accredited instruments are designed to ignore all anabolic steroids.", v:"wrong", fb:"Accreditation aims to validate detection, not suppress it." },
            { t:"A laboratory becomes legally exempt from chain-of-custody rules.", v:"wrong", fb:"Custody remains essential in accredited settings." },
            { t:"Negative results are never useful under any collection system. under review", v:"danger", fb:"Properly collected negatives provide bounded evidence." }
          ] },
        { q:"What makes whistleblower testimony strongest?",
          o:[
            { t:"Independent documents, forensics, and records corroborate the mechanism.", v:"expert", fb:"Detailed accounts gain force when external evidence matches their predictions." },
            { t:"The witness offers the most sensational version to international media.", v:"danger", fb:"Drama cannot replace corroboration." },
            { t:"The witness once held a senior title inside the accused institution.", v:"partial", fb:"Access matters, but status alone does not prove truth." },
            { t:"Investigators assume every compatriot participated in the same conduct.", v:"wrong", fb:"Collective guilt is not evidence." }
          ] }
      ] }
  },
  STORIES:{
    dp_scientist:{ dp_camp:"Aro clips a portable analyzer to the warm-up bike. “The power curve is real,” she says. “The question is whether the blood history that supports it is humanly continuous.”", dp_federation:"Aro opens a passport report that was closed without expert review. “No single value crossed the public line,” she says. “The sequence crossed the athlete’s own.”", dp_lab:"Aro unlocks the freezer rack and lifts a vial from the championship week. “The old method called this negative,” she says. “The new assay finally knows what to ask.”" },
    dp_soigneur:{ dp_camp:"Vela stands beside a locked medical refrigerator behind the mechanics’ bay. “The labels said recovery,” she says. “The timing said before altitude, after controls, and never when outsiders visited.”", dp_federation:"Vela points to travel changes approved only for three riders. “We called them equipment delays,” she says. “They always moved the athletes away from an unannounced tester.”", dp_lab:"Vela recognizes color-coded tubes in an evidence tray. “Reuss kept the dosing chart in symbols,” she says. “I filled the cooler; he decided whose symbol appeared.”" },
    dp_officer:{ dp_camp:"Renn compares a surprise-control order with a team message sent four hours earlier. “Someone turned no-notice testing into an appointment,” he says. “That changes what a negative can mean.”", dp_federation:"Renn pulls server logs from the federation terminal. “The official viewed sealed control locations,” he says. “Minutes later, Reuss changed the team’s training route.”", dp_lab:"Renn follows barcodes from collection to freezer. “These seals are intact,” he says. “The weakness was earlier—who was available, who was warned, and when the bottle existed.”" }
  },
  story:["The <b>Verano Ascent</b> rewrote the climbing record while its champion passed every announced test. The victory photographs show effortless speed; the frozen samples and blood history show a more complicated calendar.","Your inquiry can call <b>Lab Scientist Aro</b>, who reads metabolites and passport shifts; <b>Soigneur Vela</b>, who worked beside the team refrigerator; and <b>Control Officer Renn</b>, who can trace warnings, missed visits, and every sample seal.","Dr. Halden Reuss, the champion athlete, and a federation official each touched a different part of the system. The easy stories are <b>a clean, once-in-a-century champion</b> and <b>a meaningless record—everyone dopes anyway</b>. Both let the actual chain of decisions disappear.","The hearing opens in eight days, before the archive samples are returned and the federation certifies the record permanently. Your accusation must connect a person, a place, and a method without turning physiology into either worship or despair."],
  endings:{ overclaimWhat:"dp_phenom", dismissalWhat:"dp_everyone",
    win:{ expertTitle:"The Program Behind the Peak", expert:["You identify <b>Dr. Halden Reuss—the team physician</b>, <b>the Anti-Doping Laboratory</b>, and <b>a systematic doping program built to beat the tests</b>. Retesting identifies the hidden agent, the passport sequence shows timed blood manipulation, and control logs match Reuss’s dosing and travel changes. Not a clean once-in-a-century champion. Not a meaningless record where everyone dopes.","Your finding separates the athlete’s exposure from the program’s authorship. The federation official leaked control information, but Reuss designed the medical schedule, controlled the products, and used those warnings to create negative windows. The record is suspended, samples are preserved, and athlete responsibility is adjudicated separately from the physician’s organization."], soundTitle:"A Chain That Holds", sound:["You correctly name Dr. Halden Reuss, the Anti-Doping Laboratory, and a systematic program designed to beat testing. The retest, biological passport, refrigerator schedule, and leaked controls converge on coordinated medical manipulation.","The inquiry accepts the accusation. Some details of the athlete’s knowledge remain unresolved, but the program and its architect are established strongly enough for sanctions and a broader federation review."], namedTitle:"The Correct Program", named:["You name Dr. Halden Reuss, the Anti-Doping Laboratory, and a systematic doping program built to beat the tests. The conclusion is right, though your account does not fully connect the direct assay, longitudinal blood markers, and warning logs.","The record is frozen pending action. A complete decision will need the evidential chain you only outlined, especially the difference between benefiting from the program and directing it."] },
    overclaim:{ title:"The Legend the Tests Were Built to Sell", body:["You declare the champion a clean, once-in-a-century phenomenon. That verdict treats scheduled negatives as universal proof and ignores a passport sequence synchronized with the physician’s camp calendar.","The heroic story discredits later correction as jealousy. Reuss gains time to dismantle the logistics, the federation certifies the record, and the specific, provable program is hidden behind admiration for an athlete who appeared chemically untouchable."] },
    dismissal:{ title:"Cynicism as an Acquittal", body:["You call the record meaningless because everyone dopes anyway. Prevalence cannot erase the retested sample, the blood sequence, the leaked controls, or the physician’s coded schedule.","The shrug protects the organizer more effectively than any failed assay. Clean competitors lose the possibility of a specific finding, coerced athletes become indistinguishable from architects, and the federation avoids repairing the exact control failures the evidence exposed."] },
    wrongNames:{ title:"The Method, Without Its Architect", body:["You recognize a systematic program designed to beat testing, but place it with the wrong person or at the wrong site. The unresolved task is locating where products, passport timing, and advance control information became medical orders—"] } },
}};