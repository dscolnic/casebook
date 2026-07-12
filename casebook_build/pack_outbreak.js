// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"outbreak", title:"The Meridian Fever", discipline:"Epidemiology",
  teaser:"A strange fever spreads through a river city. A weapon, a nothing, or something someone let smolder?", overclaimTag:"an engineered bioweapon", truthTag:"a natural spillover with a buried delay",
  venue:"Meridian City", agent:{name:"Dr. Iris Vale", role:"Investigator's Notepad"},
  standingLabel:"Public-health standing", readingShort:"Detectives", readingLabel:"Disease Detectives",
  dossierName:"DISEASE DETECTIVES", enterLabel:"Enter the field", subt:"A deduction game inside the Meridian fever investigation", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:`And beware the headline waiting to be written: the evidence points not to a laboratory weapon, but to something quieter that someone chose not to announce.`,
  CATS:{
    who:{ title:"Who is behind it", truth:"health", items:[
      {id:"health", label:"Director Payne — city health ministry"},
      {id:"lab", label:"Dr. Sorokin — virology lab head"},
      {id:"vet", label:"Dr. Adeyemi — market/veterinary inspector"} ]},
    where:{ title:"Where it culminates", truth:"market", items:[
      {id:"hospital", label:"Meridian General Hospital"},
      {id:"market", label:"The Riverside Live-Animal Market"},
      {id:"lab", label:"The Provincial Virology Lab"} ]},
    what:{ title:"What is happening", truth:"spillover", items:[
      {id:"bioweapon", label:"A deliberately engineered bioweapon"},
      {id:"seasonal", label:"Just ordinary seasonal flu — nothing new"},
      {id:"spillover", label:"A natural animal-to-human spillover, its early spread hidden"} ]}
  },
  PLACES:{
    hospital:{name:"Meridian General Hospital", xy:[140,90]},
    market:{name:"The Riverside Live-Animal Market", xy:[330,240]},
    lab:{name:"The Provincial Virology Lab", xy:[520,90]}
  },
  EDGES:[["hospital","market"],["market","lab"]],
  CHARACTERS:{
    nurse:{ name:"Nurse Mei", role:"ER charge nurse", face:"🩺", badge:"N", legend:"the ward", hint:"Saw the first cases — and the order to call them 'pneumonia of unknown cause.'" },
    tracer:{ name:"Kofi the Tracer", role:"Contact tracer", face:"🗺", badge:"T", legend:"the field", hint:"Maps who infected whom; his line list keeps pointing back to the market." },
    techx:{ name:"The Lab Tech", role:"Sequencing technician", face:"🧫", badge:"L", legend:"the lab", hint:"Reads the viral genomes; knows the family tree says 'nature,' not 'lab.'" }
  },
  TOPICMAP:{
    hospital:{ nurse:["r0","transmission"], tracer:["incubation","cfr"], techx:["pcrtest","serology"] },
    market:{ nurse:["tracing","linelist"], tracer:["reservoir","phylo"], techx:["spillevent","vaccine"] },
    lab:{ nurse:["herd","quarantine"], tracer:["waterborne","handwash"], techx:["koch","datavis"] }
  },
  TOPICS:{
    // cell: Nurse Mei @ Meridian General Hospital
    r0:{ sci:"Ronald Ross (1857-1932)", topic:"The basic reproduction number, R₀", lede:`The single number that decides whether one fever becomes a spark or a wildfire.`, no:1,
      profile:`Ronald Ross was a British Army physician who, in 1897, proved that mosquitoes carry malaria — work that won him the 1902 Nobel Prize. But his deeper gift to epidemiology was arithmetic. Sanitarians of his day believed a disease could only be beaten by killing every last mosquito. Ross disagreed, and built equations — he called it "a priori pathometry" — showing that transmission has a threshold. Push the mosquito population below a critical level and malaria dies out on its own, even with mosquitoes still buzzing.

That threshold idea is the seed of the basic reproduction number, R₀: the average number of fresh cases one infected person produces in a population with no immunity. The logic is brutally simple. If each case begets more than one new case, chains of infection multiply and the outbreak grows. If each begets fewer than one, every chain shrinks and the fire burns out. R₀ = 1 is the knife-edge between the two.

Crucially, R₀ measures how a pathogen behaves, not where it came from. Nature routinely produces viruses with R₀ far above 1; a high number is no fingerprint of a laboratory. What R₀ does reveal is whether you are watching something ordinary or something new. Ordinary seasonal flu spreads through a population that is already partly immune, so its effective reproduction number sits low. A fever tearing through Meridian with no prior immunity, doubling week on week, has an R₀ that ordinary flu simply cannot match.

For your inquiry, Ross's number is the first lie-detector. It will not tell you a weapon was built. It will tell you, coldly, that "nothing new is happening here" cannot be true.`,
      frame:`Nurse Mei keeps her voice low, eyes on the ward doors. "They keep telling the families it's a bad flu season. I count the beds, and the beds don't lie. Before I trust you with what I saw, show me you understand the one number they're all afraid of:"`,
      q:[
        { q:"What does the basic reproduction number, R₀, actually measure?", o:[
          { t:"How deadly the disease is once a patient has already caught it and fallen ill.", v:"wrong", fb:"That is the case-fatality ratio; R₀ measures spread, not lethality." },
          { t:"Average new cases one infected person causes where nobody is yet immune.", v:"expert", fb:"Exactly — average secondary cases in a fully susceptible population." },
          { t:"How fast a single patient's symptoms worsen over the days after exposure.", v:"wrong", fb:"That is clinical progression in one person, not transmission between people." },
          { t:"The total count of people a city will lose before an outbreak finally ends.", v:"wrong", fb:"That is a projected death toll, not the per-case reproduction number." } ] },
        { q:"An outbreak grows when R₀ is above 1. What does that inequality tell you?", o:[
          { t:"Each case seeds more than one further case, so infection chains multiply.", v:"expert", fb:"Above 1, every case more than replaces itself and the fire spreads." },
          { t:"The pathogen was assembled in a laboratory to spread more than naturally.", v:"danger", fb:"A high R₀ is common in nature and is never a signature of engineering." },
          { t:"The disease has already infected more than half of every household across the city.", v:"wrong", fb:"R₀ describes per-case spread, not the fraction of a city infected." },
          { t:"Symptoms in each patient will last longer than a single week of illness.", v:"wrong", fb:"R₀ counts onward infections, not how long one person stays sick." } ] },
        { q:"Why does R₀ help you rule out 'just ordinary seasonal flu' in Meridian?", o:[
          { t:"Because seasonal flu is completely harmless and can never fill a hospital ward.", v:"wrong", fb:"Seasonal flu does kill, but that is fatality, not the reproduction argument." },
          { t:"Because any flu strain by definition always carries an R₀ far below one.", v:"wrong", fb:"Flu spreads with R₀ near or above 1; the point is the missing immunity." },
          { t:"Because seasonal flu meets partial immunity, so it cannot double week on week.", v:"expert", fb:"Prior immunity holds flu's effective spread down; this fever has none." },
          { t:"Because flu can only ever spread during the coldest months of the winter.", v:"partial", fb:"Seasonality matters, but the decisive clue is the absent background immunity." } ] }
      ] },
    // cell: Nurse Mei @ Meridian General Hospital
    transmission:{ sci:"Charles V. Chapin (1856-1941)", topic:"Modes of transmission", lede:`How a germ actually travels from one body to the next — and how many false routes we once blamed.`, no:2,
      profile:`Charles V. Chapin spent forty years as health officer of Providence, Rhode Island, and used the post to overturn a superstition. In his era, disease was blamed on "miasma" — foul air rising from filth — and on fomites, the touched objects thought to carry contagion everywhere. Chapin's 1910 masterwork, "The Sources and Modes of Infection," argued that most spread was far more intimate: contact and droplets passing directly between people, close and personal, not drifting on the wind.

He drew the distinctions epidemiologists still use. Contact spread moves through touch, direct or via a contaminated surface. Droplet spread rides the large, heavy sprays of a cough or sneeze that fall within a metre or two. Airborne spread travels on tiny particles that linger and drift across a room. Vector-borne spread relies on a living carrier such as a mosquito. Vehicle-borne spread moves through a shared medium — food, water, or blood. Each route demands a different defence, and mistaking one for another wastes the response: scrubbing floors does nothing against a disease that is truly airborne.

Chapin also insisted that the route be proven, not assumed. He was skeptical of fashionable panics and demanded evidence for each claimed pathway before committing a city's resources to it.

For Meridian, transmission mode is a compass pointing back to a source. A respiratory fever spread by droplets among people who all passed through one crowded, animal-packed market square tells you where the chain begins. It also disciplines the imagination: the way this fever moves — cough to cough, in a specific place — is the ordinary behaviour of a natural respiratory pathogen, not evidence of a device dispersed to blanket a population. Follow the route Chapin taught you to see, and it leads to a market stall, not a weapons lab.`,
      frame:`Mei nods toward a coughing patient behind the curtain. "Everyone panics about the air, the water, the food — all at once. Chapin taught us to ask how it really moves before we guess. So tell me how this thing travels:"`,
      q:[
        { q:"What was Charles Chapin's central argument about how infection spreads?", o:[
          { t:"That foul air, or miasma, rising off filth was the true engine of most epidemics.", v:"danger", fb:"That is the miasma theory Chapin worked to dismantle, not his view." },
          { t:"That most spread is intimate — direct contact and droplets between people.", v:"expert", fb:"Yes — he shifted the focus from air and objects to person-to-person contact." },
          { t:"That every disease travels chiefly on doorknobs, coins, and shared clothing.", v:"wrong", fb:"Chapin actually downplayed fomites, arguing contact mattered far more." },
          { t:"That contagion is carried mainly by insects biting one host after another.", v:"partial", fb:"Vectors matter for some diseases, but that was not Chapin's core claim." } ] },
        { q:"Droplet and airborne spread are often confused. How do they differ?", o:[
          { t:"Droplets are large sprays that fall within a metre or two of the source.", v:"expert", fb:"Right — droplets are heavy and settle quickly; airborne particles linger and drift." },
          { t:"Droplets travel only through contaminated drinking water and never through air.", v:"wrong", fb:"Water-borne is a separate route; droplets are expelled sprays in the air." },
          { t:"Droplets can only pass by directly touching an infected person's bare skin.", v:"wrong", fb:"That is contact spread; droplets are propelled through the air by coughs." },
          { t:"Droplets hang suspended for hours and can cross an entire building's rooms.", v:"wrong", fb:"That describes airborne aerosols; droplets fall fast and travel short distances." } ] },
        { q:"Why does identifying the transmission route matter for the Meridian response?", o:[
          { t:"Because the wrong route wastes the defence — scrubbing floors won't stop airborne spread.", v:"expert", fb:"Correct — the countermeasure must match the actual pathway to work." },
          { t:"Because a droplet-spread fever proves almost beyond any doubt that it was deliberately released as a weapon.", v:"danger", fb:"Droplet spread is how ordinary respiratory viruses move; it proves no weapon." },
          { t:"Because knowing the route lets you cure each patient without any medicine at all.", v:"wrong", fb:"Route guides prevention, not treatment; it does not replace medicine." },
          { t:"Because only water-borne diseases are ever worth a city health officer's time.", v:"wrong", fb:"Every route matters; Chapin's point was to identify the right one." } ] }
      ] },
    // cell: Kofi the Tracer @ Meridian General Hospital
    incubation:{ sci:"Peter Panum (1820-1885)", topic:"Incubation & the serial interval", lede:`The silent gap between catching a disease and showing it — the clock every outbreak runs on.`, no:3,
      profile:`In 1846 a young Danish physician named Peter Ludvig Panum was sent to the Faroe Islands, where measles had erupted after sixty-five years of absence. The isolation of the islands made them a natural laboratory, and Panum used them like one. By interviewing survivors and tracing exactly who fell ill after meeting whom, he pinned the incubation period of measles at close to fourteen days — the quiet interval between exposure and the first rash.

He found something else that reshaped epidemiology: the elderly islanders who had survived the previous epidemic in 1781 did not catch it again. Immunity, once earned, lasted a lifetime. From clean field observation alone, Panum had measured both the incubation period and the durability of immunity, decades before anyone could see a virus.

Two clocks matter here. The incubation period is the delay from infection to symptoms in one person. The serial interval is the gap between symptom onset in a case and onset in the person they infect. Together these set the tempo of an epidemic — how fast cases pile up, how long a chain of transmission takes to reveal itself, and how far back you must look to find who exposed whom.

For your inquiry, these intervals are a truth serum applied to the calendar. If patients are arriving now, the exposures that seeded them happened days or weeks ago — the outbreak began before the first official announcement. Line up the incubation clock against the ministry's timeline and the gap becomes visible: cases whose infection dates fall inside the silence. Panum's method turns a vague suspicion of concealment into arithmetic. The disease was already spreading while the city was being told there was nothing to see.`,
      frame:`Kofi spreads a hand-drawn calendar across the table, dates circled in red. "People think the outbreak started when the announcement did. The incubation clock says otherwise. Before I show you my dates, prove you can read the clock:"`,
      q:[
        { q:"What did Peter Panum establish from the 1846 Faroe Islands measles epidemic?", o:[
          { t:"That measles has an incubation of roughly two weeks and immunity lasts for life.", v:"expert", fb:"Exactly — he measured both the ~14-day delay and lifelong immunity by observation." },
          { t:"That measles spreads only through contaminated island drinking-water wells and cisterns.", v:"wrong", fb:"Measles is respiratory; Panum studied its timing, not a water source." },
          { t:"That people who survive measles once will reliably catch it again each decade.", v:"danger", fb:"The opposite — survivors of 1781 did not catch it in 1846." },
          { t:"That measles cannot spread at all in a small, isolated island population.", v:"wrong", fb:"It spread explosively; the isolation just made the chains easy to trace." } ] },
        { q:"What is the difference between the incubation period and the serial interval?", o:[
          { t:"Incubation is infection-to-symptoms in one person; serial interval is onset to onset between two.", v:"expert", fb:"Right — one clock is within a person, the other links a case to the next." },
          { t:"Incubation applies only to bacterial infections, while the serial interval applies solely to viral ones.", v:"wrong", fb:"Both terms apply to any pathogen; the distinction is what they measure." },
          { t:"Incubation is measured in years, while the serial interval is always under one hour.", v:"wrong", fb:"Both are typically measured in days for an acute infection like this." },
          { t:"Incubation is the time to recover, and the serial interval is the time to relapse.", v:"wrong", fb:"Neither concerns recovery; both concern the timing of transmission." } ] },
        { q:"How does the incubation clock expose a concealed start to the Meridian outbreak?", o:[
          { t:"By working backward from today's cases to infection dates that predate the announcement.", v:"expert", fb:"Correct — the exposures that seeded current cases fall inside the official silence." },
          { t:"By proving the virus was deliberately engineered to have an unusually long, hidden incubation period.", v:"danger", fb:"Natural pathogens have incubation periods too; the timing shows delay, not design." },
          { t:"By showing symptoms appear the very instant a person is first exposed to the virus.", v:"wrong", fb:"There is always a lag; that lag is precisely what lets you date the start." },
          { t:"By counting only the patients who were admitted after the ministry's press briefing.", v:"wrong", fb:"That ignores the earlier chains; the clock reaches back before the briefing." } ] }
      ] },
    // cell: Kofi the Tracer @ Meridian General Hospital
    cfr:{ sci:"William Farr (1807-1883)", topic:"Case-fatality & vital statistics", lede:`Counting the dead well enough that the numbers tell you what killed them.`, no:4,
      profile:`William Farr built the modern discipline of health statistics almost single-handedly. As compiler of abstracts at Britain's General Register Office from 1839, he turned the dry registration of births and deaths into a weapon against disease. He designed a classification of causes of death, insisted every death be recorded by cause, age, place, and occupation, and used the resulting tables to show, with numbers, where and why people were dying.

Farr gave epidemiology several enduring tools. The case-fatality ratio — the share of diagnosed cases who die — measures a disease's severity. He tracked mortality rates across districts and occupations, exposing how sharply death clustered in crowded, filthy places. He even described the roughly bell-shaped rise and fall of an epidemic's death curve, sometimes called Farr's law. Famously, in London's cholera years, his meticulous district tables helped reveal how mortality tracked the water supply.

His iron rule was that a number is only as honest as its denominator. A count of deaths means little without knowing how many were at risk or how many were diagnosed. Change who gets counted as a "case," and you can make the same disease look mild or catastrophic at will.

That is exactly why Farr's arithmetic matters in Meridian. If the fever's case-fatality ratio runs well above ordinary seasonal flu, the reassuring "nothing new" story collapses. But watch the denominator. A ministry that quietly reclassifies deaths as "pneumonia of unknown cause," or that never counts the earliest victims at all, can flatten the ratio and hide the toll. Farr teaches you to ask not just how many died, but who decided which deaths to count — and that question points straight at whoever controlled the register.`,
      frame:`Kofi taps a column of figures. "Everyone quotes the death rate. Nobody asks what's underneath the line. Farr would've torn this ministry's numbers apart. Show me you can read a fatality ratio before I trust you with mine:"`,
      q:[
        { q:"What does the case-fatality ratio measure?", o:[
          { t:"The proportion of diagnosed cases of a disease who go on to die from it.", v:"expert", fb:"Exactly — deaths divided by diagnosed cases, a measure of severity." },
          { t:"The number of people one infected case will pass the disease along to next.", v:"wrong", fb:"That is the reproduction number; case-fatality is about severity, not spread." },
          { t:"The share of an entire city's population expected to catch the disease overall.", v:"wrong", fb:"That is the attack rate; case-fatality concerns only diagnosed cases." },
          { t:"The average number of days a patient survives after first being diagnosed.", v:"wrong", fb:"That is survival time; case-fatality is a proportion, not a duration." } ] },
        { q:"Why did Farr insist a mortality number is only as good as its denominator?", o:[
          { t:"Because changing who counts as a 'case' can make one disease look mild or deadly.", v:"expert", fb:"Right — the denominator decides the ratio and can be quietly manipulated." },
          { t:"Because deaths are impossible to count accurately and should simply be ignored.", v:"wrong", fb:"Farr counted deaths obsessively; his point was to pair them with the right base." },
          { t:"Because only the raw number of deaths matters and ratios merely confuse the public.", v:"wrong", fb:"Farr championed ratios precisely because raw counts mislead without context." },
          { t:"Because the denominator determines how contagious rather than how deadly a germ is.", v:"wrong", fb:"The denominator here shapes the fatality ratio, a severity measure." } ] },
        { q:"How could a case-fatality figure be used to hide the truth in Meridian?", o:[
          { t:"By reclassifying deaths as 'pneumonia of unknown cause' so they never join the count.", v:"expert", fb:"Correct — miscoding deaths shrinks the numerator and flattens the apparent toll." },
          { t:"By admitting a high fatality ratio, which would instantly prove a bioweapon was used.", v:"danger", fb:"A high fatality ratio signals severity, not a weapon; nature produces deadly germs." },
          { t:"By reporting the true ratio openly, which is the one thing a cover-up would do.", v:"wrong", fb:"A cover-up conceals; honest reporting is what Farr's method demands." },
          { t:"By counting every single flu death across the entire nation to make the local number look tiny.", v:"partial", fb:"Diluting a denominator can mislead, but the classic trick here is dropping deaths." } ] }
      ] },
    // cell: The Lab Tech @ Meridian General Hospital
    pcrtest:{ sci:"Kary Mullis (1944-2019)", topic:"PCR & molecular testing", lede:`A chemical photocopier that finds a single needle of viral genetic code in a haystack of blood.`, no:5,
      profile:`Kary Mullis was an American biochemist who, on a night drive through the California mountains in 1983, worked out how to copy a chosen stretch of DNA over and over until a vanishingly rare sequence became abundant enough to detect. The polymerase chain reaction, or PCR, won him the 1993 Nobel Prize and became the workhorse of molecular biology and diagnostics.

The idea is a cycle. Heat splits the double helix into single strands. Short primers, designed to match the ends of the target sequence, latch on. A heat-stable polymerase then builds complementary copies. Each cycle doubles the target, so twenty or thirty cycles turn one molecule into millions — an exponential amplification that makes the invisible visible. For an RNA virus, a first step transcribes the RNA into DNA, giving RT-PCR.

PCR's power is its exquisite specificity. Because the primers only bind their matching sequence, a well-designed test detects one particular pathogen and ignores everything else. That same specificity is its discipline: a PCR test only finds what it was designed to look for. A kit built to detect seasonal influenza will come back negative on a novel virus — not because no one is sick, but because the test was aimed at the wrong target.

That distinction is decisive in Meridian. When patients test negative for known flu strains yet are gravely ill, the honest reading is not "nothing is here." It is "this is something our existing tests were never designed to catch." PCR can then be redirected: design primers against the new genome and confirm the true agent directly, molecule by molecule. Mullis's photocopier does not tell you a virus was built; it tells you, with molecular precision, that what is spreading is not the familiar seasonal bug the city was promised.`,
      frame:`The Lab Tech pushes a rack of tubes under the light. "People treat a negative result like an all-clear. It only means the test didn't find what it was aimed at. Before I walk you through these plates, tell me what PCR really does:"`,
      q:[
        { q:"How does PCR make a rare genetic sequence detectable?", o:[
          { t:"By repeatedly doubling the target sequence until millions of copies exist.", v:"expert", fb:"Exactly — cyclic amplification turns one molecule into a detectable multitude." },
          { t:"By dissolving away every part of the sample except the one gene of interest.", v:"wrong", fb:"PCR copies the target; it does not destroy the rest of the sample." },
          { t:"By growing the whole live virus in a dish until there is enough to see it.", v:"wrong", fb:"That is viral culture; PCR amplifies genetic material chemically, not by culture." },
          { t:"By staining the patient's blood so that any infection changes its colour.", v:"wrong", fb:"That is not PCR; PCR amplifies a specific nucleic-acid target." } ] },
        { q:"Why can a patient be seriously ill yet test negative on a flu PCR test?", o:[
          { t:"Because a flu test's primers only match flu, and will miss a novel virus entirely.", v:"expert", fb:"Right — PCR finds only its designed target; a new agent slips past a flu kit." },
          { t:"Because a negative PCR result reliably proves the patient was never truly infected.", v:"danger", fb:"A negative only means that target wasn't found, not that nothing is present." },
          { t:"Because PCR stops working once a patient's fever climbs above a certain point.", v:"wrong", fb:"Body temperature does not disable a laboratory PCR assay." },
          { t:"Because PCR can only detect bacteria and is completely blind to any virus.", v:"wrong", fb:"PCR detects viral genomes routinely; specificity is the real issue here." } ] },
        { q:"What does a negative known-flu PCR, in gravely ill patients, tell your investigation?", o:[
          { t:"That the illness is something existing tests were never designed to catch.", v:"expert", fb:"Correct — redirect PCR at the new genome to confirm the true agent." },
          { t:"That the sickness must have been deliberately engineered to evade all PCR tests.", v:"danger", fb:"Evading a flu-specific test is ordinary for a new natural virus, not proof of design." },
          { t:"That the patients are not really infected and are suffering something non-infectious.", v:"wrong", fb:"Severe matched illness argues for a real pathogen the test simply missed." },
          { t:"That the laboratory equipment is broken and every result should be discarded.", v:"wrong", fb:"Consistent negatives against a specific target point to the target, not the machine." } ] }
      ] },
    // cell: The Lab Tech @ Meridian General Hospital
    serology:{ sci:"Emil von Behring (1854-1917)", topic:"Serology & antibodies", lede:`The footprints an infection leaves in the blood long after the germ itself has gone.`, no:6,
      profile:`Emil von Behring was a German physiologist who, working in Robert Koch's institute in the 1890s, discovered that the blood serum of an animal that had survived diphtheria could protect and even cure another animal. The active agent was what we now call an antibody. His serum therapy against diphtheria — a disease that was strangling children by the thousands — earned him the first Nobel Prize in Medicine in 1901.

Behring's work opened the field of serology: the study of antibodies in blood and what they reveal. When the immune system meets a new pathogen, it manufactures antibodies tailored to that specific invader. Those antibodies persist after the infection clears, leaving a durable record. A serological test hunts for them, and their presence testifies that the body has met that particular germ — recently or long ago.

Serology answers a question that direct virus-detection cannot. PCR asks, "is the pathogen here right now?" Serology asks, "has this person ever been infected?" That makes it the tool for reconstructing the hidden past of an outbreak. By testing stored or fresh blood across a population, investigators can find people who were infected weeks earlier and have already recovered — the invisible early wave that direct testing missed entirely.

In Meridian, serology is how you exhume a buried beginning. If market workers and their families carry antibodies to the new virus dated to before the first official case, then the outbreak was seeding quietly while the city was told all was well. The antibodies do not care what the ministry announced; they are a biological calendar. And their pattern — clustered first around the market — points not to a laboratory release, but to a spillover that began among people who handled animals, and was left to spread in silence.`,
      frame:`The Lab Tech holds a vial to the light. "The virus leaves the body, but it leaves its shadow behind in the blood. That shadow is how we prove who was infected before anyone admitted it. Tell me what an antibody test can and can't show:"`,
      q:[
        { q:"What did Emil von Behring discover about surviving an infection?", o:[
          { t:"That serum from a survivor contains a protective factor able to treat another patient.", v:"expert", fb:"Exactly — his diphtheria antitoxin revealed antibodies in survivor serum." },
          { t:"That survivors of a disease permanently carry the live germ inside their blood.", v:"wrong", fb:"They carry antibodies, not the living pathogen; that is the key distinction." },
          { t:"That a survivor's blood is dangerous and will infect anyone who receives it.", v:"danger", fb:"The opposite — survivor serum could protect, which was Behring's breakthrough." },
          { t:"That no one who has recovered from a disease can ever again fall ill from anything at all.", v:"wrong", fb:"Immunity is specific to that pathogen, not blanket protection against all illness." } ] },
        { q:"How does a serology test differ from a direct test like PCR?", o:[
          { t:"Serology asks whether a person was ever infected; PCR asks if the germ is present now.", v:"expert", fb:"Right — antibodies record past exposure; PCR detects a current infection." },
          { t:"Serology detects the live virus directly, while PCR merely infers a past exposure indirectly.", v:"wrong", fb:"That is reversed; PCR finds the pathogen, serology finds antibodies." },
          { t:"Serology and PCR measure exactly the same thing and are fully interchangeable.", v:"wrong", fb:"They answer different questions — present infection versus past exposure." },
          { t:"Serology works only on animals and can never be used on human patients at all.", v:"wrong", fb:"Serology is routine in humans; Behring's own therapy moved into people." } ] },
        { q:"How can serology reveal a concealed early wave of the Meridian outbreak?", o:[
          { t:"By finding antibodies dated before the first official case, clustered around the market.", v:"expert", fb:"Correct — antibodies are a calendar exposing spread during the official silence." },
          { t:"By proving the antibodies themselves were manufactured in a laboratory as a weapon.", v:"danger", fb:"Antibodies are the body's own response; their pattern shows natural early spread." },
          { t:"By detecting the live virus in people who feel completely healthy right now.", v:"wrong", fb:"Serology finds past-infection antibodies, not current live virus." },
          { t:"By showing that nobody at all was infected until the very day the ministry made its announcement.", v:"wrong", fb:"Pre-announcement antibodies would show the opposite — infection came first." } ] }
      ] },
    // cell: Nurse Mei @ The Riverside Live-Animal Market
    tracing:{ sci:"William Foege (b. 1936)", topic:"Contact tracing & ring containment", lede:`You don't need to vaccinate everyone — only the ring of people around each spark.`, no:7,
      profile:`William Foege is the American epidemiologist whose strategy helped drive smallpox from the earth. In 1966, working in eastern Nigeria with limited vaccine, Foege could not immunize entire populations. So he did something smarter. He and his team found each case, then traced and vaccinated the people in close contact around it — the "ring" through which the virus would otherwise jump. Contain every spark's immediate surroundings, and the fire has nowhere to go, even if most of the population remains unvaccinated.

This surveillance-and-containment approach — often called ring vaccination — became the backbone of the global smallpox eradication that succeeded in 1980. Its logic rests on contact tracing: identify a case, then systematically find everyone that case may have exposed, and act on that ring before those contacts can seed new chains. It transformed epidemic control from a blunt, resource-hungry effort into a precise, targeted one.

Contact tracing does more than contain a disease; it maps it. Every traced link is a documented edge in the network of who infected whom. Assemble enough of them and the shape of an outbreak emerges — where chains converge, and where the very first links begin.

For Meridian, that map is your evidence. If independent chains of transmission all trace back through people who bought, sold, or worked at the Riverside market, the ring is not scattered randomly across the city — it is anchored to one place. Foege's method turns rumor into a diagram with a center. And a center matters: a natural spillover has a physical origin, a place where animal met human, whereas a deliberately dispersed weapon would seed many places at once. The rings converging on the market are the geometry of a spillover, not a release.`,
      frame:`Mei gestures at the crowded market stalls around you. "Every patient I admitted had been through here. Foege proved you beat a plague by working the ring around each case, not by panicking at the whole city. Show me you understand the ring before I point you at mine:"`,
      q:[
        { q:"What was William Foege's key insight in fighting smallpox?", o:[
          { t:"Vaccinate the ring of contacts around each case rather than a whole population.", v:"expert", fb:"Exactly — surveillance and containment starved the virus of new hosts." },
          { t:"Vaccinate absolutely everyone in a country simultaneously on a single day.", v:"wrong", fb:"Mass vaccination was the old approach; Foege's power was targeting rings." },
          { t:"Isolate every recovered patient permanently to keep them from spreading it again.", v:"wrong", fb:"Recovered smallpox patients were immune; the strategy targeted contacts, not survivors." },
          { t:"Wait for the disease to burn out naturally without any intervention at all.", v:"danger", fb:"That abandons control; Foege's method was active, precise intervention." } ] },
        { q:"Beyond containment, what does contact tracing produce for an investigator?", o:[
          { t:"A documented map of who infected whom, revealing where the chains converge.", v:"expert", fb:"Right — each traced link is an edge, and the network shows the outbreak's center." },
          { t:"A guaranteed and lasting cure for every contact who is found and interviewed in time.", v:"wrong", fb:"Tracing maps and contains spread; it is not itself a treatment." },
          { t:"A single number counting how deadly the disease is once caught.", v:"wrong", fb:"That is case-fatality; tracing charts the links between people." },
          { t:"Proof that the pathogen was released in many places by a hidden hand.", v:"danger", fb:"Tracing usually reveals a single origin, the opposite of a dispersed release." } ] },
        { q:"What does it mean that Meridian's chains all trace back through the market?", o:[
          { t:"The outbreak has one physical center, the geometry expected of a spillover.", v:"expert", fb:"Correct — a converging center fits an animal source, not a scattered release." },
          { t:"The virus was deliberately seeded across the whole of the city at the very same moment.", v:"danger", fb:"Convergence on one place argues against dispersal; it points to a single origin." },
          { t:"The market is irrelevant and the true source must lie somewhere untraced.", v:"wrong", fb:"When independent chains converge on one site, that site is the lead, not a distraction." },
          { t:"The disease is spreading purely at random with no identifiable pattern.", v:"wrong", fb:"A clear convergence is a pattern; that pattern is the whole point of tracing." } ] }
      ] },
    // cell: Nurse Mei @ The Riverside Live-Animal Market
    linelist:{ sci:"Alexander Langmuir (1910-1993)", topic:"Surveillance & the line list", lede:`One case per row, one fact per column — the humble table that catches an epidemic in the act.`, no:8,
      profile:`Alexander Langmuir made disease surveillance a discipline. Joining the U.S. Communicable Disease Center in 1949, he defined surveillance as the continuous, systematic collection, analysis, and — crucially — dissemination of health data to those who need to act. In 1951 he founded the Epidemic Intelligence Service, the corps of "disease detectives" trained to descend on outbreaks, gather data on the ground, and report it fast. His creed was that data hoarded is data wasted: surveillance only works if the findings reach the people who can respond.

Langmuir's practical instrument is the line list — a plain table with one row per case and one column per fact: name or code, age, symptom-onset date, location, exposures, outcome. Built case by case, it is deceptively powerful. Sort by onset date and the epidemic curve appears. Sort by place and clusters jump out. Cross-tabulate exposures and a common source announces itself. The line list is where a heap of anecdotes becomes a testable pattern.

It is also, quietly, an audit trail. Because each row is dated and sourced, a line list records not only when people fell ill but when the system knew. Gaps, backdated entries, and cases logged long after onset all leave marks.

In Meridian, the line list is your ledger of the concealment. If onset dates cluster weeks before the first reported case, and if the earliest rows share the market as their common exposure, the table testifies to two things at once: a spillover beginning among market-linked people, and a surveillance system that saw it and stayed silent. Langmuir would say the failure was not knowing — it was not disseminating. The line list names both the source and the delay, in rows and columns anyone can check.`,
      frame:`Mei lays a battered notebook on the crate between you. "This is my own line list — the one I kept when the official one went quiet. Every row is a person they didn't count. Prove to me you know what a line list is for:"`,
      q:[
        { q:"How did Alexander Langmuir define disease surveillance?", o:[
          { t:"Continuous collection and analysis of data, plus dissemination to those who must act.", v:"expert", fb:"Exactly — he stressed that surveillance is useless unless the findings reach responders." },
          { t:"The one-time counting of cases at the very end of an outbreak, for the record.", v:"wrong", fb:"Surveillance is continuous and ongoing, not a single retrospective tally." },
          { t:"The quiet gathering of data by officials who keep the results to themselves.", v:"danger", fb:"Langmuir's core point was dissemination; hoarded data defeats surveillance." },
          { t:"The laboratory testing of collected samples with no attention paid to when the cases arose.", v:"wrong", fb:"Surveillance centers on timing, place, and person, not lab work alone." } ] },
        { q:"Why is a simple line list so powerful in an outbreak?", o:[
          { t:"Sorting its rows reveals the epidemic curve, clusters, and a common source.", v:"expert", fb:"Right — one row per case turns scattered anecdotes into a testable pattern." },
          { t:"It cures patients faster by keeping their treatment records neatly in order.", v:"wrong", fb:"A line list organizes data for analysis; it is not a treatment tool." },
          { t:"It lists only the patients who have already died, ignoring everyone still ill.", v:"wrong", fb:"A line list records all cases, with outcome as just one column." },
          { t:"It replaces the need to ever visit the field or interview a single case.", v:"wrong", fb:"The rows come from exactly that field work; it organizes it, not replaces it." } ] },
        { q:"How can a line list document the concealment in Meridian?", o:[
          { t:"By dating each row, it shows when illness began and when the system knew.", v:"expert", fb:"Correct — onset dates before the first report expose a silence that was chosen." },
          { t:"By proving from its columns that the virus was assembled in a laboratory.", v:"danger", fb:"A line list records people and exposures, not a pathogen's origin story." },
          { t:"By listing only cases after the official announcement, confirming a late start.", v:"wrong", fb:"A complete list reaches back before the announcement; that is where the delay shows." },
          { t:"By showing the cases are scattered with no shared exposure whatsoever.", v:"wrong", fb:"Here the early rows share the market — a common source, not random scatter." } ] }
      ] },
    // cell: Kofi the Tracer @ The Riverside Live-Animal Market
    reservoir:{ sci:"Frank Fenner (1914-2010)", topic:"Animal reservoirs & zoonosis", lede:`Most human plagues begin as somebody else's disease — an animal's — that learned to jump.`, no:9,
      profile:`Frank Fenner was an Australian virologist who understood epidemics as ecology. His classic studies of myxoma virus in Australian rabbits, beginning in 1950, followed a pathogen and its host across years, watching virulence and resistance co-evolve in the wild. It was a masterclass in how a virus lives inside an animal population — its reservoir — and how the balance between germ and host shifts over time. Fenner later chaired the global commission that in 1980 certified the eradication of smallpox, one of the rare human diseases with no animal reservoir to hide in.

That last point is the heart of the matter. A reservoir is the animal population in which a pathogen naturally persists, often causing its hosts little harm. A zoonosis is a disease that spills from such a reservoir into humans. The great majority of new human infectious diseases are zoonotic in origin — they begin as bird, bat, pig, or rodent viruses that acquire the ability to infect people, usually where humans and animals crowd together.

Fenner's ecological view reframes an outbreak. The right question is not only "who is sick?" but "what animal was this virus living in, and where did human and animal meet?" Find the reservoir and the interface, and you find the origin.

In Meridian, this points like a needle. A live-animal market is a textbook zoonotic interface: many species, many humans, blood and cages and close contact, exactly the conditions under which a reservoir virus crosses over. The existence of a plausible animal reservoir and a crowded market is the natural, ordinary explanation for a new fever — and it is a far simpler account than a clandestine weapons program. Fenner teaches you that a new human disease usually comes from an animal, not an armory.`,
      frame:`Kofi crouches beside a stack of poultry cages, unbothered by the noise. "City folk hear 'new virus' and think laboratory. I hear it and think: which animal, and where did it meet us? Tell me what a reservoir is before we go looking for one:"`,
      q:[
        { q:"What is an animal reservoir, in Fenner's ecological sense?", o:[
          { t:"An animal population where a pathogen naturally persists, often with little harm.", v:"expert", fb:"Exactly — the reservoir is the host species that quietly maintains the virus." },
          { t:"A stockpile of frozen virus samples deliberately kept for later release.", v:"danger", fb:"That is a weapons image; a reservoir is a living wild host population." },
          { t:"The single first human patient from whom every later case descends.", v:"wrong", fb:"That is the index case; a reservoir is the animal source that predates it." },
          { t:"A locked laboratory freezer where dangerous frozen cultures are stored under strict guard.", v:"wrong", fb:"A reservoir is ecological, not a freezer — an animal population in the wild." } ] },
        { q:"What does it mean that most new human diseases are zoonotic?", o:[
          { t:"They begin in animals and gain the ability to infect people where the two meet.", v:"expert", fb:"Right — bird, bat, pig, or rodent viruses crossing over is the usual origin." },
          { t:"They are secretly manufactured in laboratories and then blamed on animals as a cover story.", v:"danger", fb:"Zoonosis is a well-documented natural process, not a fabricated alibi." },
          { t:"They can only ever infect the original animal and never truly reach humans.", v:"wrong", fb:"The whole point of a zoonosis is that it does cross into people." },
          { t:"They arise spontaneously in humans with no animal involvement whatsoever.", v:"wrong", fb:"The defining feature is an animal origin, not spontaneous human emergence." } ] },
        { q:"Why does a live-animal market fit the origin of a new fever so well?", o:[
          { t:"It packs many species and people together — the classic interface for a spillover.", v:"expert", fb:"Correct — crowded animals and humans are exactly where reservoir viruses cross." },
          { t:"It proves the virus must have been released there as a deliberate weapon.", v:"danger", fb:"A market is a natural spillover setting; it points to ecology, not sabotage." },
          { t:"Markets are always perfectly clean and could never harbor an animal pathogen.", v:"wrong", fb:"The opposite — the close animal-human contact is precisely the risk." },
          { t:"Animals sold at these markets are immune to every virus and so pose no real risk at all.", v:"wrong", fb:"Reservoir hosts carry viruses while appearing healthy; that is the danger." } ] }
      ] },
    // cell: Kofi the Tracer @ The Riverside Live-Animal Market
    phylo:{ sci:"Carl Woese (1928-2012)", topic:"Phylogenetics: natural vs engineered", lede:`Read a genome as a family tree, and it will tell you where it was born.`, no:10,
      profile:`Carl Woese was an American microbiologist who taught biology to read genes as genealogy. In the 1970s, by comparing the sequences of ribosomal RNA across organisms, he built molecular family trees — phylogenies — from the code itself rather than from outward appearance. The method revealed a whole domain of life no one had recognized, the Archaea, and reshaped the tree of life. His central insight was that shared sequence changes, inherited down the generations, record ancestry with a precision anatomy never could.

Applied to pathogens, phylogenetics places a virus on the tree of its relatives. Sequence the new genome, compare it to known viruses, and its nearest branches reveal its lineage — which animal viruses it descends from, and how recently it diverged. Because mutations accumulate at a roughly steady pace, the branch lengths even act as a molecular clock, dating how long the virus has been evolving on its own.

This is the sharpest tool for telling a natural virus from an engineered one. A virus born of nature sits comfortably on a tree among wild relatives, its genome a gradual mosaic of mutations and reassortments seen throughout that family. An engineered pathogen tends to betray itself: seams where sequences were stitched together, cloning scars, restriction sites, or genes lifted from distant organisms that no natural ancestry would place side by side. The tree either flows or it does not.

For Meridian, this is the evidence that dismantles the bioweapon story. If the new virus nests snugly among known animal viruses, sharing their natural signatures with no splice marks or foreign inserts, then its own genome testifies to a natural origin. Woese's family tree does not merely suggest nature — it can effectively rule out the laboratory, letting you set the sensational fear aside and follow the trail back to the market.`,
      frame:`Kofi unrolls a printout branching like a tree. "This is the part that stops the weapon rumors cold. A genome remembers its ancestors. Before I show you where this one sits on the tree, tell me how a family tree of genes is even built:"`,
      q:[
        { q:"What was Carl Woese's foundational contribution to biology?", o:[
          { t:"Building family trees from gene sequences, which revealed the Archaea.", v:"expert", fb:"Exactly — molecular phylogenetics from rRNA remade the tree of life." },
          { t:"Proving that all viruses were originally designed in ancient laboratories.", v:"danger", fb:"Nothing of the kind; Woese read natural ancestry from sequences." },
          { t:"Inventing the microscope that first let scientists see living bacteria.", v:"wrong", fb:"That was centuries earlier; Woese worked with molecular sequences." },
          { t:"Classifying organisms purely by their outward shape and visible anatomy.", v:"wrong", fb:"His breakthrough was abandoning appearance for sequence-based ancestry." } ] },
        { q:"How does phylogenetics place a new virus on the tree of life?", o:[
          { t:"By comparing its sequence to known viruses to find its nearest relatives.", v:"expert", fb:"Right — shared inherited changes reveal lineage and time of divergence." },
          { t:"By measuring how sick the virus makes a patient over the course of a week.", v:"wrong", fb:"Severity is clinical; phylogeny is built from genetic sequence alone." },
          { t:"By counting how many people the virus has infected across the whole city.", v:"wrong", fb:"Case counts are epidemiology; the tree comes from the genome itself." },
          { t:"By observing the virus's colour and shape under a powerful microscope.", v:"wrong", fb:"Appearance misled biologists; Woese's method reads the code instead." } ] },
        { q:"How can a phylogenetic tree effectively rule out an engineered origin?", o:[
          { t:"A natural virus nests among wild relatives with no splice marks or foreign inserts.", v:"expert", fb:"Correct — a smooth fit on the tree, without cloning scars, testifies to nature." },
          { t:"Any virus with a notably high transmission rate must by definition be laboratory-made.", v:"danger", fb:"Transmissibility is common in nature and says nothing about engineering." },
          { t:"A tree cannot distinguish natural from engineered viruses in any way at all.", v:"wrong", fb:"Engineered genomes often show tell-tale seams a tree can reveal." },
          { t:"An engineered virus always sits perfectly among its wild natural relatives.", v:"wrong", fb:"Engineering tends to leave signatures that break the natural pattern." } ] }
      ] },
    // cell: The Lab Tech @ The Riverside Live-Animal Market
    spillevent:{ sci:"Robert Webster (1932-2024)", topic:"Spillover & One Health", lede:`Where birds, pigs, and people breathe the same air, the next pandemic is already rehearsing.`, no:11,
      profile:`Robert Webster, a New Zealand-born virologist, was called the godfather of influenza. His defining discovery was that wild aquatic birds are the great natural reservoir of influenza A viruses, carrying a vast diversity of strains that seed the flu viruses of other species. He showed how influenza can leap and mix: when two strains infect the same host — a pig, say, exposed to both bird and human flu — their genomes can reassort, swapping whole segments to produce a new virus for which humans have no immunity. This is how pandemics are born.

Webster's insight matured into what is now called One Health: the recognition that human, animal, and environmental health are one interconnected system, and that emerging diseases must be watched at the seams between them. He argued for years that live-animal markets and mixed farms — where many species and people press together — are the crucibles where spillover and reassortment happen. Watch those interfaces, he said, and you might see the next pandemic before it arrives.

A spillover event is the moment a pathogen crosses from its animal reservoir into a human host and begins to transmit. It is not a single freak accident but a probabilistic hazard, made likelier by every added contact between species. Markets stack those contacts by the thousand.

For Meridian, Webster's framework is the truth the two traps miss. The dismissal — "just seasonal flu" — ignores that a reassorted or newly spilled strain is precisely a novel virus the population has never met. The overclaim — "a bioweapon" — ignores that nature builds new flu-like viruses this way constantly, without any help. A live-animal market on a river is a Webster crucible. The ordinary, well-documented mechanism of spillover explains everything, if only someone had been watching the seam.`,
      frame:`The Lab Tech studies the caged birds and penned pigs with a professional's wariness. "Webster spent his life warning that places exactly like this one brew new viruses. Nobody watched this seam. Before I tell you what we found, explain to me what a spillover really is:"`,
      q:[
        { q:"What was Robert Webster's central discovery about influenza?", o:[
          { t:"Wild aquatic birds are the great natural reservoir of influenza A viruses.", v:"expert", fb:"Exactly — that reservoir seeds the flu strains of other species, including us." },
          { t:"Influenza is a laboratory creation with no natural host anywhere in the wild.", v:"danger", fb:"The opposite — Webster mapped flu's vast natural reservoir in wild birds." },
          { t:"Influenza can only ever infect humans and is harmless to every animal.", v:"wrong", fb:"Flu is deeply zoonotic; birds and pigs are central to its ecology." },
          { t:"Influenza never changes, so last year's vaccine always works perfectly.", v:"wrong", fb:"Flu changes constantly, by mutation and reassortment — Webster's key theme." } ] },
        { q:"What does the One Health framework recognize?", o:[
          { t:"Human, animal, and environmental health form one interconnected system.", v:"expert", fb:"Right — emerging disease must be watched at the seams between them." },
          { t:"Only human hospitals matter, and animal health is irrelevant to outbreaks.", v:"wrong", fb:"One Health arose precisely to reject that human-only blind spot." },
          { t:"Diseases in animals and people are entirely separate and never connect.", v:"wrong", fb:"The framework's whole premise is that they are connected." },
          { t:"Environmental conditions have no bearing on how epidemics emerge or spread.", v:"wrong", fb:"Environment is one of the three linked pillars of One Health." } ] },
        { q:"How does spillover explain Meridian better than either trap?", o:[
          { t:"A newly spilled strain is a novel virus, yet nature builds such strains routinely.", v:"expert", fb:"Correct — it is neither ordinary flu nor a weapon, but a documented natural hazard." },
          { t:"It proves a hidden laboratory deliberately reassorted the virus to start a pandemic.", v:"danger", fb:"Reassortment happens in nature constantly; spillover needs no laboratory." },
          { t:"It shows the illness is merely the usual seasonal flu the city already knows.", v:"danger", fb:"A spilled or reassorted strain is exactly what the population has never met." },
          { t:"It means the disease cannot spread between humans and will simply die out.", v:"wrong", fb:"A successful spillover begins human-to-human transmission, which is the danger." } ] }
      ] },
    // cell: The Lab Tech @ The Riverside Live-Animal Market
    vaccine:{ sci:"Edward Jenner (1749-1823)", topic:"Vaccination", lede:`A milkmaid's mild pox, borrowed to teach the body how to fight a deadly one.`, no:12,
      profile:`Edward Jenner was an English country doctor who gave the world its first vaccine. Country lore held that milkmaids who caught cowpox — a mild disease of cattle — seemed spared from smallpox, one of history's great killers. In 1796 Jenner tested the idea directly: he took material from a cowpox sore on a dairymaid's hand and inoculated a young boy, then later exposed him to smallpox. The boy did not fall ill. Jenner called the method vaccination, from vacca, the Latin for cow.

The principle he stumbled onto is the foundation of immunology. Exposing the body to a harmless or weakened form of a pathogen — or something closely related, as cowpox is to smallpox — trains the immune system to recognize and destroy the real threat before it can take hold. Jenner did not know about viruses or antibodies; he reasoned from careful observation of who got sick and who did not. His work would eventually make smallpox the first, and so far only, human disease deliberately eradicated.

Vaccination is the tool that turns understanding into protection. Once you know what agent is spreading, a matched vaccine can blunt an outbreak — but only once the agent is correctly identified.

That caveat matters in Meridian. A stockpile of ordinary seasonal-flu vaccine is worthless against a virus that is not seasonal flu; deploying it and declaring the city protected would be a dangerous illusion. Jenner's legacy cuts against the dismissal: naming the true agent is the precondition for any real defence. And it cuts against the overclaim too — vaccination is how a society answers a natural spillover, calmly and provably, without inventing a phantom weapon to explain the fear.`,
      frame:`The Lab Tech taps a crate of vaccine vials stamped with last winter's flu strain. "Someone up the chain wants to hand these out and call it solved. Against the wrong virus, that's theater. Tell me what Jenner actually proved, and why it matters here:"`,
      q:[
        { q:"What did Edward Jenner demonstrate in 1796?", o:[
          { t:"That exposure to mild cowpox could protect a person against deadly smallpox.", v:"expert", fb:"Exactly — cowpox material trained immunity against its lethal relative." },
          { t:"That smallpox itself could readily be cured with medicine once a patient had fallen ill.", v:"wrong", fb:"Jenner prevented disease beforehand; he did not cure active smallpox." },
          { t:"That injecting live smallpox into healthy people was completely safe.", v:"danger", fb:"He used mild cowpox precisely to avoid the danger of smallpox itself." },
          { t:"That smallpox was caused by cattle and could be stopped by avoiding cows.", v:"wrong", fb:"Cowpox protected against smallpox; cattle were the source of the safe vaccine." } ] },
        { q:"What is the underlying principle of vaccination?", o:[
          { t:"Training the immune system with a harmless form to recognize the real threat.", v:"expert", fb:"Right — a safe preview lets the body destroy the true pathogen quickly." },
          { t:"Flooding the entire body with antibiotics well before any infection can take hold.", v:"wrong", fb:"Vaccines prime the immune system; antibiotics treat bacterial infection." },
          { t:"Replacing a person's blood with the blood of someone already immune.", v:"wrong", fb:"That is a transfusion idea; vaccination trains one's own immunity." },
          { t:"Keeping patients away from all germs so they never build any immunity.", v:"wrong", fb:"Vaccination deliberately introduces a safe exposure, the opposite of avoidance." } ] },
        { q:"Why is a stockpile of seasonal-flu vaccine a false comfort in Meridian?", o:[
          { t:"It cannot protect against a virus that is not the seasonal flu it targets.", v:"expert", fb:"Correct — a matched vaccine requires first naming the true agent." },
          { t:"It proves the outbreak is a bioweapon that no vaccine could ever counter.", v:"danger", fb:"The mismatch reflects a novel natural virus, not an unstoppable weapon." },
          { t:"Vaccines never work against any virus, so the whole stockpile is pointless.", v:"wrong", fb:"Vaccines work well — against the right target, which this stockpile is not." },
          { t:"Flu vaccine will cure the patients already lying ill in the wards today.", v:"wrong", fb:"Vaccines prevent, not cure, and this one is aimed at the wrong virus anyway." } ] }
      ] },
    // cell: Nurse Mei @ The Provincial Virology Lab
    herd:{ sci:"Wade Hampton Frost (1880-1938)", topic:"Herd immunity", lede:`When enough of a flock is protected, even the unprotected are shielded — until they aren't.`, no:13,
      profile:`Wade Hampton Frost was America's first professor of epidemiology, appointed at Johns Hopkins in 1919 after years as an officer in the Public Health Service investigating typhoid, polio, and influenza. A careful, quantitative thinker, Frost helped formalize several ideas epidemiologists now take for granted: the index case, cohort analysis, and — most famously — herd immunity.

Herd immunity is the observation that a disease stops spreading efficiently once a sufficient fraction of a population is immune, whether through past infection or vaccination. Immune individuals act as dead ends: a chain of transmission that runs into them simply stops. Above a threshold, so many chains are broken that even susceptible people are indirectly protected, because the virus can no longer find a path to them. The threshold depends on how transmissible the disease is — the higher its reproduction number, the greater the share who must be immune to hold it back.

The flip side is the part that matters for a new disease. When a virus is genuinely novel, essentially no one is immune. There is no herd protection at all, and the pathogen can spread through the population unchecked, at its full reproductive potential. That is why a never-before-seen virus behaves so differently from a familiar one.

In Meridian, herd immunity is the quiet argument against the "just seasonal flu" story. Ordinary flu circulates in a population carrying years of accumulated partial immunity, which throttles its spread and softens each season. A fever ripping through the city with no brake, infecting the young and healthy as readily as anyone, is behaving like a virus meeting a population with zero prior exposure. Frost's concept explains why: this is not the old flu the herd already knows — it is something new the herd has never faced.`,
      frame:`Mei looks through the lab window at rows of samples. "They keep saying the city's seen flu before, so we'll be fine. Frost would ask: seen this? Explain herd immunity to me, and then you'll understand why 'we've had flu before' is no comfort at all:"`,
      q:[
        { q:"What is herd immunity?", o:[
          { t:"Spread stalls once enough of a population is immune to break transmission chains.", v:"expert", fb:"Exactly — immune individuals are dead ends that indirectly shield the susceptible." },
          { t:"A single powerful animal in a herd whose immunity protects all the others.", v:"wrong", fb:"It is a population-wide effect, not one protective individual." },
          { t:"The idea that crowding a herd together makes every member immune faster.", v:"wrong", fb:"Crowding spreads disease; immunity comes from prior exposure or vaccination." },
          { t:"A firm guarantee that once achieved, a disease can never again return to a population.", v:"wrong", fb:"Immunity can wane and thresholds can be lost; it is not permanent." } ] },
        { q:"Why does a genuinely novel virus spread without any brake?", o:[
          { t:"Because essentially no one is immune, so there is no herd protection at all.", v:"expert", fb:"Right — with zero prior exposure, the virus spreads at full potential." },
          { t:"Because a novel virus is always far deadlier than any older one.", v:"partial", fb:"Novelty means no immunity; severity is a separate question from spread." },
          { t:"Because new viruses reproduce faster than the laws of biology usually allow.", v:"wrong", fb:"They spread freely due to absent immunity, not superhuman reproduction." },
          { t:"Because the population as a whole deliberately refuses to take any precautions at all.", v:"wrong", fb:"Even with precautions, a fully susceptible population lacks herd protection." } ] },
        { q:"How does herd immunity argue against the 'just seasonal flu' story?", o:[
          { t:"Old flu meets years of partial immunity; this fever meets a defenceless population.", v:"expert", fb:"Correct — unchecked spread signals a virus the herd has never faced before." },
          { t:"It proves the virus was engineered specifically to bypass the population's natural immunity.", v:"danger", fb:"A novel natural virus finds no immunity either; that is not evidence of design." },
          { t:"It shows seasonal flu could never infect healthy young adults, unlike this.", v:"wrong", fb:"Seasonal flu can hit the young; the real contrast is the missing herd immunity." },
          { t:"It means the city is already protected and the outbreak will stop on its own.", v:"wrong", fb:"With no prior immunity there is no such protection; that is the danger." } ] }
      ] },
    // cell: Nurse Mei @ The Provincial Virology Lab
    quarantine:{ sci:"Wu Lien-teh (1879-1960)", topic:"Quarantine & masks", lede:`A doctor who read an airborne plague correctly, and gave the world the mask to fight it.`, no:14,
      profile:`Wu Lien-teh was a Malaysian-born, Cambridge-trained physician who, in 1910, was sent to confront a terrifying plague spreading through Manchuria. The prevailing view held that plague was carried by rats and their fleas. Wu performed an autopsy — itself a bold act in that time and place — and, examining the tissue, concluded that this plague was pneumonic: it lived in the lungs and spread directly through the air between people, from cough and breath, not merely through rat fleas.

Acting on that diagnosis, Wu mounted one of history's first modern epidemic responses. He imposed quarantine of the sick and their contacts, restricted travel along the railways that were carrying the disease, and — over official resistance — ordered the mass cremation of infected corpses that were seeding new infections. He also designed and distributed a gauze-and-cotton face mask, the "Wu mask," to block the airborne droplets he had identified. Within months the epidemic, which had killed some sixty thousand people, was brought under control.

Wu's triumph was matching the intervention to the true mode of spread. Quarantine separates the potentially infectious from the well, buying time and breaking chains; a mask blocks the specific droplet route he had proven. Both are only as good as the diagnosis behind them.

For Meridian, Wu is the model of a correct, proportionate response — and a rebuke to two failures. Doing nothing, on the theory that it is only seasonal flu, squanders the window Wu fought to seize. But panicking toward a bioweapon narrative is its own derailment: it aims fear at a phantom instead of the practical measures — isolate cases, mask against droplets, close the market interface — that actually stop a real, natural outbreak.`,
      frame:`Mei ties a mask behind her ears out of long habit. "Wu Lien-teh figured out an airborne plague and beat it with quarantine and a scrap of gauze. No panic, no fantasy — the right move for the real disease. Show me you understand what he actually did:"`,
      q:[
        { q:"What did Wu Lien-teh establish about the 1910 Manchurian plague?", o:[
          { t:"That it was pneumonic and spread through the air between people, not just via fleas.", v:"expert", fb:"Exactly — his autopsy revealed airborne, person-to-person spread." },
          { t:"That it spread only through the contaminated drinking water supplied along the railway line.", v:"wrong", fb:"He identified airborne droplet spread, not a water-borne route." },
          { t:"That it could not spread between humans at all and posed no real danger.", v:"danger", fb:"The opposite — it spread lethally person to person, which he proved." },
          { t:"That it was carried solely by rats and their fleas, as others believed.", v:"wrong", fb:"Wu overturned exactly that assumption for this pneumonic form." } ] },
        { q:"Why did Wu's quarantine and mask campaign succeed?", o:[
          { t:"Because each measure matched the airborne route he had correctly diagnosed.", v:"expert", fb:"Right — interventions work only when matched to the true mode of spread." },
          { t:"Because he had a vaccine ready that instantly protected the whole province.", v:"wrong", fb:"There was no such vaccine; his tools were quarantine, masks, and cremation." },
          { t:"Because the plague was mild and would have faded without any action.", v:"wrong", fb:"It killed tens of thousands; his active response is what curbed it." },
          { t:"Because he ignored transmission entirely and simply treated each patient's own symptoms.", v:"wrong", fb:"His success came from breaking transmission, not symptom care alone." } ] },
        { q:"How does Wu's example judge Meridian's competing responses?", o:[
          { t:"Isolate cases and mask against droplets; skip both the panic and the do-nothing.", v:"expert", fb:"Correct — a proportionate response fits a real natural outbreak, not a phantom." },
          { t:"Declare a bioweapon and militarize the city to hunt for the hidden lab.", v:"danger", fb:"That aims fear at a phantom instead of the measures that actually work." },
          { t:"Do nothing, since seasonal flu always resolves without intervention.", v:"danger", fb:"That squanders the very window Wu fought to seize against a real disease." },
          { t:"Wait for a perfect diagnosis before taking any protective action at all.", v:"partial", fb:"Diagnosis guides action, but Wu acted decisively once the route was clear." } ] }
      ] },
    // cell: Kofi the Tracer @ The Provincial Virology Lab
    waterborne:{ sci:"John Snow (1813-1858)", topic:"Waterborne spread & the Broad Street pump", lede:`One map, one pump handle, and the birth of the idea that disease has a traceable source.`, no:15,
      profile:`John Snow was a London physician, better known in his own day as a pioneer of anesthesia, who founded modern epidemiology almost as a side pursuit. During the 1854 cholera outbreak in London's Soho, the reigning theory blamed "bad air." Snow suspected the water. He interviewed the households of the dead and plotted every case on a street map, and the dots clustered tightly around a single public water pump on Broad Street. Cases fell away with distance from it; a nearby workhouse and brewery, with their own water, were strangely spared.

His most quoted act was persuading the parish to remove the pump's handle, after which cases declined — though the outbreak was already waning. His more rigorous work was a natural experiment across South London, where two water companies supplied intermingled houses; the company drawing sewage-tainted water from downstream had vastly higher cholera mortality. Snow had shown, with data alone and no knowledge of the cholera bacterium, that the disease traveled through contaminated water from an identifiable source.

Snow's true legacy is a method: map the cases, find where they cluster, identify the common exposure, and act on the source. It is the logic every outbreak investigation still follows.

For Meridian, Snow is your patron saint of geography — with a warning built in. His method is exactly how the market emerges as the center of the case: plot the cases, and they cluster around it. But Snow also teaches you to name the right route. This fever spreads person to person through the air, not through the water supply. The clustering points to the market as the place where humans met the source, not to a poisoned reservoir. Follow Snow's map, but read the route correctly, and it leads to a market stall.`,
      frame:`Kofi pins a city map to the wall and starts marking cases with a grease pencil. "Snow did this with cholera and a pump. Watch where the dots pile up. But he'd warn you to name the right route first — so tell me what Snow actually proved:"`,
      q:[
        { q:"How did John Snow investigate the 1854 Broad Street cholera outbreak?", o:[
          { t:"He mapped every case and found them clustered around one public water pump.", v:"expert", fb:"Exactly — the spatial cluster pointed straight to a common source." },
          { t:"He cultured the cholera bacterium and identified it under the microscope.", v:"wrong", fb:"The bacterium was unknown to him; he reasoned from mapped case data." },
          { t:"He proved the outbreak was caused by bad air rising from the Soho streets.", v:"danger", fb:"Snow argued against the miasma theory, showing water was the route." },
          { t:"He surveyed the wind direction to trace how the foul air was drifting.", v:"wrong", fb:"He traced water, not air; his map centered on the pump." } ] },
        { q:"What is the enduring method Snow's investigation established?", o:[
          { t:"Map the cases, find the cluster, identify the common exposure, act on the source.", v:"expert", fb:"Right — that sequence is still the backbone of outbreak investigation." },
          { t:"Treat each patient individually and never look for any shared pattern.", v:"wrong", fb:"Snow's whole advance was seeing the pattern across cases." },
          { t:"Assume every epidemic is airborne and search the atmosphere for its cause.", v:"wrong", fb:"He rejected the air theory in favor of tracing a physical source." },
          { t:"Wait until an outbreak ends, then count the dead for the official record.", v:"wrong", fb:"Snow acted during the outbreak, using live data to find the source." } ] },
        { q:"How does Snow's method apply to Meridian — and where must you adjust it?", o:[
          { t:"Map the cases to the market, but recognize the route is airborne, not the water.", v:"expert", fb:"Correct — same clustering logic, correct route: a market interface, not a pump." },
          { t:"Conclude the city's water was poisoned deliberately as an act of sabotage.", v:"danger", fb:"The route here is respiratory; a poisoned-water weapon does not fit the data." },
          { t:"Ignore geography entirely, since mapping only ever works for cholera.", v:"wrong", fb:"Snow's mapping generalizes to any disease with a traceable source." },
          { t:"Shut down the water pumps across the whole city as the first response.", v:"wrong", fb:"This fever is not water-borne; closing pumps would miss the true interface." } ] }
      ] },
    // cell: Kofi the Tracer @ The Provincial Virology Lab
    handwash:{ sci:"Ignaz Semmelweis (1818-1865)", topic:"Asepsis & handwashing", lede:`A number no one wanted to hear, and the doctor destroyed for insisting it was true.`, no:16,
      profile:`Ignaz Semmelweis was a Hungarian obstetrician working in Vienna's General Hospital in the 1840s, where he confronted a horror hidden in the data. The maternity hospital had two clinics. In the first, staffed by doctors and medical students, women were dying of childbed fever at rates several times higher than in the second, run by midwives. Semmelweis counted the deaths obsessively and refused to accept the gap as fate.

His breakthrough came when a colleague died after a scalpel nick during an autopsy, with symptoms identical to childbed fever. Semmelweis reasoned that the doctors were carrying invisible "cadaverous particles" from the dissecting room straight to the delivery beds — something the midwives, who did no autopsies, never did. He ordered handwashing in chlorinated lime between the morgue and the ward. Mortality in the doctors' clinic plummeted to match the midwives'.

Yet Semmelweis was mocked and driven out. His findings clashed with the medical pride of the day, he published his evidence poorly and late, and germ theory did not yet exist to explain why he was right. He died in an asylum, vindicated only decades later by Pasteur and Lister.

For Meridian, Semmelweis carries two lessons, and both cut at your traps. First, the data can reveal a true, deadly cause before anyone can name the microbe — a stark difference in numbers is a signal, not noise, and must not be dismissed. Second, and more pointed, is the human failure: institutions suppress inconvenient findings to protect their reputation, and people die in the gap. A health ministry that buries early reports to avoid alarm is repeating the exact sin that killed Semmelweis's mothers — knowing, and staying silent.`,
      frame:`Kofi sets down two columns of numbers, one far worse than the other. "Semmelweis saw a gap like this and they destroyed him for pointing at it. That's the part that keeps me up — not the germ, the silence. Tell me what he found:"`,
      q:[
        { q:"What did Semmelweis discover in Vienna's maternity clinics?", o:[
          { t:"Doctors carried deadly particles from the morgue to the delivery ward on their hands.", v:"expert", fb:"Exactly — handwashing in chlorinated lime cut the fatal childbed fever sharply." },
          { t:"Midwives were secretly poisoning the mothers in the second clinic.", v:"wrong", fb:"The midwives' clinic was safer; the danger came from the doctors' morgue contact." },
          { t:"Childbed fever was caused entirely by bad air in the hospital wards.", v:"danger", fb:"He traced it to contamination carried on hands, not to miasma." },
          { t:"The deaths were purely random, and no single clinic was any more dangerous than another.", v:"wrong", fb:"The clinics differed several-fold — a signal he refused to dismiss." } ] },
        { q:"Why is Semmelweis's story a warning as much as a discovery?", o:[
          { t:"Institutions suppressed his inconvenient finding to protect pride, and mothers died.", v:"expert", fb:"Right — the human failure of silence is the lesson that echoes here." },
          { t:"His handwashing idea was proven wrong the moment germ theory arrived.", v:"wrong", fb:"Germ theory vindicated him; he was right before it could explain why." },
          { t:"He fabricated his mortality data to make the doctors look dangerous.", v:"wrong", fb:"His counts were painstaking and real; that is why they held up." },
          { t:"He kept his findings secret and never tried to warn anyone at all.", v:"wrong", fb:"He fought to publicize them; it was others who refused to listen." } ] },
        { q:"How does Semmelweis's fate illuminate the Meridian ministry's conduct?", o:[
          { t:"Burying early reports to avoid alarm repeats the deadly sin of chosen silence.", v:"expert", fb:"Correct — knowing and staying quiet is precisely the failure that kills." },
          { t:"It proves the ministry must be manufacturing the virus in a secret laboratory.", v:"danger", fb:"Suppressing reports is a cover-up, not proof of a bioweapon program." },
          { t:"It shows that ignoring a data gap is always the safest course of action.", v:"wrong", fb:"The whole lesson is that ignoring the gap costs lives." },
          { t:"It means the numbers can never be trusted and should simply be discarded.", v:"wrong", fb:"Semmelweis's numbers were trustworthy; it was the silence that failed." } ] }
      ] },
    // cell: The Lab Tech @ The Provincial Virology Lab
    koch:{ sci:"Robert Koch (1843-1910)", topic:"Koch's postulates & causation", lede:`Four hard rules to separate the germ that causes a disease from the bystanders that don't.`, no:17,
      profile:`Robert Koch was a German physician who turned the germ theory of disease from a hypothesis into a rigorous science. Working first as a rural doctor with a homemade laboratory, he identified the bacteria behind anthrax, tuberculosis, and cholera, and won the 1905 Nobel Prize. His lasting contribution to method is a set of criteria — Koch's postulates — for proving that a particular microbe causes a particular disease.

The postulates, in their classic form, demand four things. The microbe must be found in all who have the disease and absent in the healthy. It must be isolated from a sick host and grown in pure culture. The cultured microbe, introduced into a healthy host, must produce the same disease. And it must then be re-isolated from that newly sick host and shown to match the original. Meeting all four builds a chain of evidence that a suspect germ is truly the culprit, not an innocent passenger.

Koch himself knew the rules had limits — some pathogens cannot be cultured, and some infected hosts stay healthy carriers — and modern versions adapt them for viruses and molecular evidence. But the core discipline endures: association is not causation, and proving a cause takes deliberate, reproducible steps.

For Meridian, Koch is the standard that keeps your investigation honest. It is not enough that a new virus is present in some patients; you must show it is consistently found in the sick, absent in the well, and capable of causing this exact illness. That rigor is what lets you reject a scapegoat and name the true agent with confidence. It also disciplines both traps: the dismissal that hand-waves the cause away, and the overclaim that leaps to a designed weapon, each fail Koch's demand for a proven causal chain.`,
      frame:`The Lab Tech lines up a row of culture plates. "Finding a virus in a patient isn't proof it's the cause. Koch made us earn that word. Before I tell you what we isolated, walk me through how you actually prove causation:"`,
      q:[
        { q:"What do Koch's postulates set out to establish?", o:[
          { t:"That one specific microbe is the true cause of one specific disease.", v:"expert", fb:"Exactly — they build a reproducible chain from suspect germ to disease." },
          { t:"That every disease is caused by several microbes acting together at once.", v:"wrong", fb:"They isolate a single causal agent, not a committee of germs." },
          { t:"That a microbe found near a patient is automatically the cause of illness.", v:"danger", fb:"That is the association-equals-causation error Koch's rules exist to prevent." },
          { t:"That diseases arise spontaneously without any microbial cause at all.", v:"wrong", fb:"Koch's work established microbial causation, the opposite of spontaneous origin." } ] },
        { q:"Which step is part of the classic postulates?", o:[
          { t:"Isolate the microbe, grow it in pure culture, and reproduce the disease.", v:"expert", fb:"Right — pure culture and re-creation of the disease are central steps." },
          { t:"Ask the patient which germ they believe made them ill and record it.", v:"wrong", fb:"Postulates rely on laboratory proof, not the patient's belief." },
          { t:"Count how many people caught the disease before drawing any conclusion.", v:"wrong", fb:"Case counts are epidemiology; the postulates are about causal proof." },
          { t:"Confirm the microbe appears in healthy and sick people in equal numbers.", v:"wrong", fb:"The cause should be present in the sick and absent in the healthy." } ] },
        { q:"How does Koch's standard discipline the Meridian investigation?", o:[
          { t:"It demands the virus be shown in the sick, absent in the well, and truly causal.", v:"expert", fb:"Correct — that rigor lets you name the real agent and reject a scapegoat." },
          { t:"It lets you declare a bioweapon as soon as any unusual virus is detected.", v:"danger", fb:"Detection is not causation, let alone proof of design; Koch forbids the leap." },
          { t:"It proves the illness has no real cause at all worth investigating, so you may stand down.", v:"danger", fb:"Koch drives toward finding the cause, never toward dismissing it." },
          { t:"It requires only that a virus be present in a single patient to close the case.", v:"wrong", fb:"One presence is mere association; the postulates demand far more." } ] }
      ] },
    // cell: The Lab Tech @ The Provincial Virology Lab
    datavis:{ sci:"Florence Nightingale (1820-1910)", topic:"Epidemiological data & the case for sanitation", lede:`She proved with a picture what tables of numbers could not: that most soldiers died of filth, not battle.`, no:18,
      profile:`Florence Nightingale is remembered as the founder of modern nursing, but she was also a formidable statistician — one of the first to use data visualization to change policy. Sent to the military hospitals of the Crimean War in 1854, she found soldiers dying far more often from preventable disease — typhus, cholera, infection bred by filth and overcrowding — than from their wounds. She did not merely assert this; she counted, and she drew.

Her famous "coxcomb" or polar-area diagrams showed month by month how deaths from disease dwarfed deaths from combat, and how they fell after sanitary reforms were introduced. The visual was undeniable in a way a table of figures was not, and it helped persuade a reluctant establishment to overhaul military hygiene. Elected the first female fellow of the Royal Statistical Society, Nightingale insisted that clear evidence, well presented, was the engine of public-health reform.

Her lesson is that data is not neutral decoration; it is argument. How you count, and how you display what you counted, determines whether a hidden killer is seen or ignored. A well-made epidemic curve or map can force a truth into the open that officials would rather keep blurred.

For Meridian, Nightingale is the closing argument. The numbers you and the informants have gathered — the onset dates, the market cluster, the fatality figures, the antibody calendar — become powerful only when assembled into a clear picture. Displayed honestly, the epidemic curve shows a rise that began before the first official word; the map shows a cluster at the market; the whole tells a single story of a natural spillover concealed by delay. Nightingale teaches that the antidote to a cover-up is not louder accusation but a chart no honest official can look away from.`,
      frame:`The Lab Tech spreads the assembled data across the bench — dates, maps, counts. "Nightingale beat an establishment with a diagram they couldn't argue with. This is where all our fragments become one picture. Tell me what she really proved:"`,
      q:[
        { q:"What did Florence Nightingale demonstrate with her data from the Crimean War?", o:[
          { t:"That far more soldiers died of preventable disease than of their battle wounds.", v:"expert", fb:"Exactly — her diagrams made the toll of filth and infection undeniable." },
          { t:"That better weapons, not better hygiene, were what saved soldiers' lives.", v:"wrong", fb:"Her case was for sanitation; disease, not combat, was the chief killer." },
          { t:"That battlefield wounds were the overwhelming cause of every military death.", v:"danger", fb:"Her data showed the reverse — disease dwarfed wounds until hygiene improved." },
          { t:"That statistics could not really explain why soldiers were dying in hospital.", v:"wrong", fb:"Statistics were precisely how she explained and then reduced the deaths." } ] },
        { q:"What was the point of Nightingale's famous polar-area diagrams?", o:[
          { t:"To make an undeniable visual argument that tables of figures could not.", v:"expert", fb:"Right — she used display itself as persuasion to drive reform." },
          { t:"To decorate her reports so officials would find them pleasant to read.", v:"wrong", fb:"The charts were argument, not decoration; they forced a conclusion." },
          { t:"To hide the true death toll behind a confusing tangle of colours.", v:"danger", fb:"She used visuals to reveal the toll, not to obscure it." },
          { t:"To count the soldiers without regard to what they died from or when.", v:"wrong", fb:"Her charts turned on cause and timing of death, precisely." } ] },
        { q:"How does Nightingale's approach bring the Meridian case together?", o:[
          { t:"Assembled honestly, the curve, map, and counts tell one story of concealed spillover.", v:"expert", fb:"Correct — a clear picture is the antidote to a cover-up no official can dismiss." },
          { t:"A single dramatic chart could prove the virus was built as a weapon.", v:"danger", fb:"The data shows natural origin and delay; no chart converts that into a weapon." },
          { t:"Only raw tables matter, and turning them into a picture adds nothing.", v:"wrong", fb:"Nightingale's whole point was that the picture persuades where tables fail." },
          { t:"The fragments should each be reported entirely alone, never combined into one single view.", v:"wrong", fb:"Her method is to assemble the fragments into a single, undeniable picture." } ] }
      ] }
  },
  STORIES:{
    nurse:{
      hospital:`Nurse Mei meets you in the crowded ER corridor, a chart clutched to her chest. "I was here for the first ones," she says quietly. "And I was here when they told us to write 'pneumonia of unknown cause' and stop asking. Ask me something real."`,
      market:`Mei has come to the market on her day off, mask on, scanning the stalls. "Half my patients breathed this air before they breathed mine," she murmurs. "I keep my own list now. Show me you can read it right."`,
      lab:`At the lab's viewing window Mei looks exhausted but unbowed. "They send the samples here and call it handled," she says. "I came to see for myself. Prove you understand what these numbers mean, and I'll tell you what I saw."`
    },
    tracer:{
      hospital:`Kofi finds you between gurneys, a folded map already in hand. "Every admission I've charted walked the same road before they got sick," he says. "The road runs through the market. Earn it, and I'll show you the lines."`,
      market:`Kofi is in his element among the stalls, marking a diagram as he walks. "This is the center — I can feel it in the arrows," he says. "But feelings aren't evidence. Convince me you know how tracing works, and I'll hand you the diagram."`,
      lab:`Kofi spreads his case map across a lab bench, pinning corners with reagent bottles. "Snow had a pump; I've got a market," he says. "Same logic, older than any of us. Show me you can read a map of the dead."`
    },
    techx:{
      hospital:`The Lab Tech meets you near the ER's sample drop, gloves still on. "They keep running the flu panel and calling every negative an all-clear," they say flatly. "It isn't. Tell me you understand what a test really finds."`,
      market:`The Lab Tech walks the market with you, eyeing the cages. "Everything about this place says spillover to anyone who's read Webster," they say. "The genome will settle it. First, show me you'd know what the genome is saying."`,
      lab:`In the sequencing room the Lab Tech turns a screen toward you, a branching tree glowing on it. "This is where the weapon rumor dies," they say. "The family tree says nature. Prove you can read it, and I'll walk you through every branch."`
    }
  },
  story:[
    `The <b>Meridian Fever</b> came up out of the river districts in the wet season — a cough, a burning fever, then wards filling faster than anyone would say aloud. The city health ministry calls it a hard flu season and asks for calm. The tabloids whisper of a <b>laboratory weapon</b> loosed on the poor. You are <b>Dr. Iris Vale</b>, and the Bureau has sent you in with a plain brief: find what is actually happening before the fear writes its own ending.`,
    `<b>Three people inside will help you</b> — each for their own reasons, and only if you earn it. <b>Nurse Mei</b>, the ER charge nurse who saw the first cases and heard the order to call them something else. <b>Kofi the Tracer</b>, whose line list keeps bending back toward one crowded square. And <b>the Lab Tech</b>, who reads the viral genomes and already knows what the family tree is saying. None of them is the culprit; each holds only fragments.`,
    `<b>Someone here let this smolder.</b> Three names sit in your notepad: <b>Director Payne</b> of the city health ministry; <b>Dr. Sorokin</b>, who runs the provincial virology lab; and <b>Dr. Adeyemi</b>, the market and veterinary inspector. Each column — <b>who</b> is behind it, <b>where</b> it culminates, <b>what</b> is truly happening — hides a tempting wrong answer. The overclaim is <b>an engineered bioweapon</b>. The dismissal is <b>just ordinary seasonal flu</b>. The truth is quieter than the first and graver than the second — and every day it stays hidden, it spreads.`,
    `You have <b>8 days</b> and a single accusation. Get it right and a buried outbreak becomes a provable case; get it wrong and a real, natural spillover is lost inside a fantasy — or waved away as nothing at all.`
  ],
  endings:{ overclaimWhat:"bioweapon", dismissalWhat:"seasonal",
    win:{
      expertTitle:"What the Evidence Supports, and No More",
      expert:[
        `Vale names it exactly: Director Payne of the health ministry, who saw the early reports and buried them; the outbreak culminating at the Riverside Live-Animal Market, where the virus first crossed from animals to people; and a natural animal-to-human spillover whose early spread was hidden by a delayed alarm. Not a bioweapon. Not a bad flu season.`,
        `Every card accounted for. The genome's family tree ruled out the laboratory; the incubation clock and the antibody calendar exposed the concealed early wave; the line list and the map anchored it all to the market. Vale claims precisely what she can prove — a real spillover and a real cover-up — and refuses both the tabloid word and the ministry's comfort.`
      ],
      soundTitle:"Right — but Lightly Proven",
      sound:[
        `Vale names the right three: Payne, the market, and a concealed natural spillover. The shape is correct — nature over weapon, something new over nothing new — and her restraint is exactly right.`,
        `But she left too many clues unturned, and the ministry's lawyers will pick at the seams. A few more days tracing the line list and the antibody dates would have made the case unassailable rather than merely sound.`
      ],
      namedTitle:"The Right Answer, Unearned",
      named:[
        `Vale names the truth — Payne, the market, the hidden spillover — but gathered too little to back it. It reads like a hunch that happened to land.`,
        `The Bureau cannot move on an accusation this thin, however correct. Being right about a cover-up is not the same as being able to prove one.`
      ]
    },
    overclaim:{ title:"The Detective Who Cried Bioweapon",
      body:[
        `Vale reports a deliberately engineered bioweapon loosed on Meridian — lurid, frightening, and flatly against the evidence she herself gathered.`,
        `The viral family tree nests the pathogen snugly among wild animal viruses, with no splice marks, no foreign inserts, no engineering seams; its high transmissibility is ordinary for a natural respiratory virus. The overclaim collapses on contact with the genome, and it does worse than fail — it discredits the real, provable finding, letting the guilty ministry dismiss the whole inquiry as paranoia.`
      ] },
    dismissal:{ title:"A Hard Flu Season",
      body:[
        `Vale accepts the ministry's line: ordinary seasonal flu, nothing new, calm advised. She stops exactly where Director Payne hoped she would.`,
        `But the numbers refuse the story. The reproduction number runs too high against a population with no immunity; the flu panels come back negative in the gravely ill; the case-fatality ratio sits well above a normal season. She has mistaken a novel spillover for a familiar bug, and in doing so has helped bury the very delay that let it spread.`
      ] },
    wrongNames:{ title:"So Close",
      body:[
        `Vale reads the nature of it correctly — a natural animal-to-human spillover whose early spread was concealed, neither a laboratory weapon nor a routine flu. The science, she has cold; it is the names that slipped.`
      ] } },
}};
