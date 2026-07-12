// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"forensics", title:"A Death at Ashford House", discipline:"Forensic Science",
  teaser:"A wealthy man is found dead in a locked study. Murder? Misadventure? Or a truth the evidence — not the theatrics — decides?", overclaimTag:"a framing by overstated 'certainty'", truthTag:"a concealed poisoning masked as natural death",
  venue:"the Ashford House inquest", agent:{name:"Examiner Ruth Calloway", role:"Investigator's Notepad"},
  standingLabel:"Forensic credibility", readingShort:"Pioneers", readingLabel:"Forensic Pioneers",
  dossierName:"FORENSIC PIONEERS", enterLabel:"Open the case", subt:"A deduction game inside the Ashford House inquest", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:`And mistrust the confident "match": the certainty that would hang the heir is theatre — the truth is quieter, and it is still in the evidence, waiting for the right test.`,
  CATS:{
    who:{ title:"Who is behind it", truth:"physician", items:[
      {id:"nephew", label:"Julian Ashford — the heir"},
      {id:"physician", label:"Dr. Merrick — family physician"},
      {id:"maid", label:"Agnes — the housekeeper"} ]},
    where:{ title:"Where it culminates", truth:"dispensary", items:[
      {id:"study", label:"The Locked Study"},
      {id:"dispensary", label:"The House Dispensary"},
      {id:"conservatory", label:"The Conservatory"} ]},
    what:{ title:"What is happening", truth:"poison", items:[
      {id:"murderpin", label:"A violent murder — the heir, by a forensic 'match'"},
      {id:"natural", label:"Natural causes — a simple heart attack"},
      {id:"poison", label:"A concealed poisoning disguised as natural death"} ]}
  },
  PLACES:{
    study:{name:"The Locked Study", xy:[140,90]},
    dispensary:{name:"The House Dispensary", xy:[330,240]},
    conservatory:{name:"The Conservatory", xy:[520,90]}
  },
  EDGES:[["study","dispensary"],["dispensary","conservatory"]],
  CHARACTERS:{
    constable:{ name:"Constable Pike", role:"First officer on scene", face:"🔦", badge:"P", legend:"the scene", hint:"Secured the study; worries the 'obvious' match is too neat." },
    pathologist:{ name:"Dr. Okafor", role:"Police pathologist", face:"⚖", badge:"M", legend:"the morgue", hint:"Reads the body — livor, rigor, stomach contents — and won't be rushed." },
    chemist:{ name:"The Analyst", role:"Toxicology chemist", face:"🧪", badge:"A", legend:"the lab", hint:"Runs the assays; a poison leaves a signature if you know the test." }
  },
  TOPICMAP:{
    study:{ constable:["locard","tod"], pathologist:["toxicology","dna"], chemist:["fingerprint","bloodtype"] },
    dispensary:{ constable:["ballistics","bloodspatter"], pathologist:["entomology","questioneddocs"], chemist:["traceevidence","biasmatch"] },
    conservatory:{ constable:["chainofcustody","autopsy"], pathologist:["poisondetect","anthropology"], chemist:["crimescene","identification"] }
  },
  TOPICS:{
    // cell: Constable Pike @ The Locked Study
    locard:{ sci:"Edmond Locard (1877-1966)", topic:"Locard's exchange principle", lede:"The Lyon detective who proved that no one can act at a scene and leave it exactly as they found it.", no:1,
      profile:`Edmond Locard (1877-1966) trained in both medicine and law before opening, in 1910, what is often called the first police forensic laboratory — two cramped attic rooms in Lyon, France. His admirers called him "the Sherlock Holmes of France," and he earned it by turning dust, fibres, and stains into evidence. His name endures in a single idea now taught to every investigator: the exchange principle, usually paraphrased as "every contact leaves a trace."\n\nThe principle holds that when two objects meet — a hand and a glass, a shoe and a carpet, a body and a killer — material passes both ways. The intruder carries away fibres from the room and leaves behind his own hair, skin, or grime. Locard showed that these silent witnesses cannot forget, lie, or be intimidated; the investigator's task is only to find and read them, and he proved it in practice, once linking a strangler to his victim by the cells and face powder lodged under the suspect's fingernails.\n\nBut Locard understood the limits better than his imitators. A trace proves contact, not guilt, and not when the contact happened; the family physician touches every room by right. Contamination cuts both ways — a careless investigator leaves his own traces and carries material from place to place. And the absence of a trace is not proof of innocence.\n\nFor the Ashford inquest this is the discipline you most need. The scene offers tempting "contacts" that seem to accuse a man, and it offers none where a violent struggle should have left many. Ask always what a trace can honestly say — and refuse to let it say more.`,
      frame:`Pike sets his lantern on the desk. "I secured this room myself, and something's off — too tidy for a killing, too quiet for a heart giving out. Before I trust you with what I saw, show me you understand how a scene really talks:"`,
      q:[
        { q:"What does Locard's exchange principle state?", o:[
          { t:"That whenever two objects come into contact, material transfers both ways.", v:"expert", fb:"Exactly — contact is a two-way exchange, and the traces are the witnesses." },
          { t:"That a criminal always leaves behind far more than he ever carries away.", v:"wrong", fb:"No — the transfer runs both directions, and neither side is guaranteed larger." },
          { t:"That any trace found upon a suspect is proof he committed the crime.", v:"danger", fb:"A trace proves contact, never guilt — this is the leap that convicts the innocent." },
          { t:"That a careful search of any scene will always recover the culprit's prints.", v:"partial", fb:"Searching helps, but absence of a trace is not proof, and prints aren't assured." } ] },
        { q:"Why is Locard's principle double-edged for an investigator?", o:[
          { t:"Because investigators and innocents also leave traces, so contact can mislead.", v:"expert", fb:"Right — contamination and lawful presence both muddy what a trace means." },
          { t:"Because traces from a scene decay within minutes and are useless by morning.", v:"wrong", fb:"Many traces persist for a long time; that isn't the principle's real caution." },
          { t:"Because only violent crimes ever leave behind any transfer of material.", v:"wrong", fb:"All contact transfers material, violent or not — that's the whole point." },
          { t:"Because a trace can reveal precisely when the contact between two objects occurred.", v:"danger", fb:"It usually cannot time the contact — assuming so is a dangerous overreach." } ] },
        { q:"A room shows a physician's fibres but no sign of a struggle. That suggests:", o:[
          { t:"Contact consistent with a lawful visit, not the violence the story claims.", v:"expert", fb:"Just so — the traces present, and absent, both argue against a brawl." },
          { t:"That the physician violently attacked the victim and then calmly tidied up after.", v:"danger", fb:"Fibres prove presence, not assault — this is the overclaim the scene invites." },
          { t:"That no crime of any kind can possibly have taken place in that room.", v:"wrong", fb:"Absence of struggle rules out a beating, not a quiet poisoning." },
          { t:"That the fibres must have blown in from another part of the house.", v:"partial", fb:"Transfer can happen, but here the simplest read is a lawful visit's contact." } ] }
      ] },
    // cell: Constable Pike @ The Locked Study
    tod:{ sci:"Bernard Spilsbury (1877-1947)", topic:"Time of death: algor, rigor & livor mortis", lede:"Britain's first celebrity pathologist, whose courtroom certainty could hang a man — for better and, sometimes, worse.", no:2,
      profile:`Sir Bernard Spilsbury (1877-1947) was the most famous forensic pathologist Britain ever produced. From the Crippen trial of 1910 to the "Brides in the Bath" murders, juries hung on his every word; his calm, immaculate testimony carried the authority of science itself. He helped popularise the investigator's "murder bag" and raised the standing of pathology in the courts.\n\nAmong his stock-in-trade was estimating the time of death from three changes the body undergoes after it dies. Algor mortis is the cooling of the corpse, which loses heat toward room temperature at a rough and variable rate. Rigor mortis is the stiffening of the muscles, generally beginning within a few hours, peaking around twelve, and passing off by a day and a half. Livor mortis — lividity — is the pooling of blood under gravity, which stains the skin and, once "fixed," reveals the position in which a body lay.\n\nRead together, these signs bracket the time of death. But Spilsbury is also a cautionary figure. His confidence hardened into infallibility; he kept his notes to himself, brooked no disagreement, and modern reviewers believe some of his certainties sent innocent people to the gallows. Later scientists showed that every post-mortem clock is a wide range, not a reading — body size, clothing, illness, and room temperature all shift it.\n\nFor the Ashford inquest, the body's timetable matters twice over. It can confirm or destroy an alibi, and it can reveal whether lividity matches where the man was found. But treat any single estimate as a window, never a verdict — and be wary of the expert who is too sure.`,
      frame:`"The doctor called it his heart before I'd finished my notes," Pike says. "But the way he was slumped, the colour of him — it didn't sit right with me. Show me you can read a body's clock:"`,
      q:[
        { q:"What are the three classic post-mortem changes used to time a death?", o:[
          { t:"Algor, rigor, and livor mortis — the cooling, stiffening, and pooling.", v:"expert", fb:"Correct — cooling, stiffening, and lividity together bracket the hour." },
          { t:"Blood clotting, tissue swelling, and the drying of the skin at the lips.", v:"wrong", fb:"These aren't the standard triad; the estimate rests on cooling, stiffening, pooling." },
          { t:"Decay, insect activity, and the slow collapse of the internal organs.", v:"partial", fb:"Those matter days later; the early clock is algor, rigor, and livor mortis." },
          { t:"The last meal, the folded hands, and the look fixed upon the face.", v:"danger", fb:"Folklore, not physiology — a fixed expression tells you nothing reliable." } ] },
        { q:"Why did later scientists distrust Spilsbury's certainty?", o:[
          { t:"Because a post-mortem estimate is a broad range he treated as a fixed fact.", v:"expert", fb:"Exactly — he read a window as a clock, and juries took it as gospel." },
          { t:"Because he worked alone and rarely kept notes that others could check.", v:"partial", fb:"True and troubling, but the deeper fault was overstating a wide range." },
          { t:"Because he refused ever to appear in court or explain his reasoning.", v:"wrong", fb:"The opposite — his commanding courtroom presence was the very problem." },
          { t:"Because forensic pathology is a fraud that reveals nothing at all about a death.", v:"danger", fb:"Pathology reveals a great deal; the flaw was false certainty, not the field." } ] },
        { q:"Fixed lividity that does not match the body's found position suggests:", o:[
          { t:"That the body was moved some hours after death, once the blood had pooled.", v:"expert", fb:"Right — fixed lividity records an earlier position, so the body was shifted." },
          { t:"That death was instant, occurring before the blood had any time at all to settle.", v:"wrong", fb:"Instant death doesn't prevent pooling; fixed lividity means hours had passed." },
          { t:"That the room was unusually warm, changing the skin's colour over time.", v:"partial", fb:"Warmth affects cooling, but mismatched lividity points to the body being moved." },
          { t:"Nothing at all — lividity is random and tells an investigator nothing.", v:"danger", fb:"Lividity is highly informative; dismissing it discards a real clue." } ] }
      ] },
    // cell: Dr. Okafor @ The Locked Study
    toxicology:{ sci:"Mathieu Orfila (1787-1853)", topic:"Toxicology & poisons", lede:"The physician who dragged poison out of legend and onto the laboratory bench, founding toxicology as a science.", no:3,
      profile:`Mathieu Orfila (1787-1853), born in Menorca and made his career in Paris, is regarded as the founder of modern toxicology. His 1813 Traité des poisons was the first systematic treatment of poisons — how they act on the body, how they distribute through its organs, and how they might be detected. He insisted that toxicology rest on controlled experiment rather than folklore.\n\nHis most famous hour came in the 1840 trial of Marie Lafarge, accused of poisoning her husband with arsenic. When the initial tests confused the court, Orfila was summoned; using the newly devised Marsh test on the exhumed tissues, he demonstrated arsenic in the body and, crucially, argued it had not seeped in from the surrounding soil. It was a landmark: chemistry, not rumour, deciding a capital case.\n\nOrfila taught a lesson central to any poisoning inquiry. Poisons often kill by mimicking natural disease — arsenic looks like cholera or gastric illness, and many alkaloids simply stop the heart or the breath, leaving a body that a hurried examiner will happily call "natural." Only deliberate analysis of the organs and fluids, guided by the symptoms, can reveal the true agent. He also warned that detection depends on asking the right question: a test finds only the poison it is designed to find.\n\nFor the Ashford inquest this is the hinge of the whole matter. A man is dead with no wound and no struggle, and the easy answer — a failing heart — is exactly the disguise a poisoner relies upon. Orfila's discipline says: do not close the book on the body until the chemistry has spoken. The absence of violence is not the absence of a crime.`,
      frame:`Dr. Okafor lays out the file without hurry. "Everyone in that house wants me to sign 'heart failure' and let them grieve. I won't be rushed. Prove you understand what a poison can hide behind:"`,
      q:[
        { q:"Why is Orfila considered the founder of modern toxicology?", o:[
          { t:"He treated poisons as a subject for systematic experiment, not folklore.", v:"expert", fb:"Just so — he put poison on the laboratory bench and made it testable." },
          { t:"He gathered famous poisoning cases into one volume of courtroom tales.", v:"partial", fb:"He did write foundational texts, but his method, not anecdote, is the legacy." },
          { t:"He discovered the one universal antidote that reverses every known mineral poison.", v:"wrong", fb:"No such universal antidote exists; his advance was detection and method." },
          { t:"He proved poisons leave no trace and can never be shown in a courtroom.", v:"danger", fb:"The reverse — he showed poisons can be found in the organs and demonstrated." } ] },
        { q:"Why are poisonings so often mistaken for natural death?", o:[
          { t:"Because many poisons mimic disease, leaving a body that looks unremarkable.", v:"expert", fb:"Exactly — the disguise of natural illness is what the poisoner counts on." },
          { t:"Because poisons always dissolve completely within an hour of a death.", v:"wrong", fb:"Many poisons persist in tissue for a long time and can be recovered." },
          { t:"Because grieving families strongly discourage examining a respected man's body.", v:"partial", fb:"Pressure is real, but the core reason is that poisons imitate natural illness." },
          { t:"Because a heart attack and a poisoning are, in the end, the same event.", v:"danger", fb:"They are not — a poison can stop a sound heart, and the two must be told apart." } ] },
        { q:"What did Orfila's work in the Lafarge case establish?", o:[
          { t:"That careful chemistry on the organs could prove poison and rule out soil.", v:"expert", fb:"Right — he showed the arsenic was in the body, not leached from the grave." },
          { t:"That arsenic can only ever be detected in the living, and never once after burial.", v:"wrong", fb:"He detected it in exhumed tissue — burial is no barrier to a good assay." },
          { t:"That a confession is still required before poisoning can be charged.", v:"partial", fb:"Chemistry, not confession, carried the case — that was the whole breakthrough." },
          { t:"That any death with stomach pain should be presumed to be arsenic.", v:"danger", fb:"Symptoms suggest; only the assay proves — presuming the poison is the error." } ] }
      ] },
    // cell: Dr. Okafor @ The Locked Study
    dna:{ sci:"Alec Jeffreys (b. 1950)", topic:"DNA profiling", lede:"The Leicester geneticist who glimpsed, in a Monday-morning X-ray film, a barcode unique to each of us.", no:4,
      profile:`Sir Alec Jeffreys (b. 1950) discovered genetic fingerprinting on the morning of 10 September 1984, when an X-ray film of repetitive DNA regions in his Leicester laboratory revealed a pattern unique to each individual yet inherited from both parents. He grasped at once its use for identity, immigration disputes, and crime.\n\nThe method reads highly variable stretches of DNA that differ enormously from person to person; the chance of two unrelated people sharing a full profile is vanishingly small. Its first criminal use, in the 1986 Pitchfork case near Leicester, is the more instructive story: Jeffreys' test first cleared an innocent youth who had even confessed, and only then identified the true killer. DNA's first triumph was an exoneration.\n\nThat order matters. DNA is the most powerful individualising evidence forensic science possesses, but it has strict limits. It tells you whose cells are present, not when they were left or how — a physician's DNA in a sickroom means only that he was there, as he was entitled to be. It can be transferred innocently from object to object; it needs a reference sample to mean anything; and a contaminated or degraded trace can mislead. Above all, a DNA match answers "whose," never "guilty."\n\nFor the Ashford inquest, DNA can do two honest jobs: help clear a man the theatrics are eager to hang, and confirm whose hand touched a particular vessel. But it cannot, by itself, say a touch was murder. Let it narrow the field and protect the innocent — the very thing Jeffreys' invention did first — without pretending it can read intent.`,
      frame:`Okafor slides two swabs across the table. "The loudest voices here have already chosen the culprit. I'd rather let the cells speak. Tell me what a DNA profile can honestly settle — and what it can't:"`,
      q:[
        { q:"What did Jeffreys' DNA fingerprinting first accomplish in a case?", o:[
          { t:"It cleared an innocent suspect, then identified the man truly guilty.", v:"expert", fb:"Yes — DNA's debut was an exoneration before it was ever a conviction." },
          { t:"It secured the very first criminal conviction ever won on a confession alone.", v:"danger", fb:"The opposite — it overturned a false confession, showing DNA can free the innocent." },
          { t:"It proved that identical twins carry entirely different profiles.", v:"wrong", fb:"Identical twins share a profile; that is a known limit, not the first triumph." },
          { t:"It matched a fibre at the scene to the coat of the accused killer.", v:"partial", fb:"That's trace evidence; DNA reads cells, and its first feat was an exoneration." } ] },
        { q:"What is the key limit of a DNA match at a scene?", o:[
          { t:"It shows whose cells are present, not when or how they got there.", v:"expert", fb:"Exactly — presence is not timing, and neither is it intent." },
          { t:"It reveals the exact hour a person touched an object, to the minute.", v:"wrong", fb:"DNA carries no clock; it cannot date when a cell was deposited." },
          { t:"It works only from a fresh reference taken from a living suspect.", v:"partial", fb:"A reference is needed, but it need not be fresh or from the living." },
          { t:"It proves guilt, since innocent people never leave their DNA behind.", v:"danger", fb:"Everyone sheds DNA lawfully all the time — a match is not a confession." } ] },
        { q:"Why is DNA especially useful for protecting the wrongly accused?", o:[
          { t:"A non-match can exclude a suspect outright, whatever else is claimed.", v:"expert", fb:"Right — exclusion is DNA's most decisive and protective power." },
          { t:"It is cheaper and faster than any other test open to an investigator.", v:"partial", fb:"Not really its strength; its protective power is clean, decisive exclusion." },
          { t:"A match can prove the exact motive behind a killing, not just identity.", v:"wrong", fb:"DNA speaks to identity alone; motive is beyond any profile." },
          { t:"It is infallible, so a profile it produces can never be questioned.", v:"danger", fb:"Contamination and transfer are real — a match must always be interrogated." } ] }
      ] },
    // cell: The Analyst @ The Locked Study
    fingerprint:{ sci:"Henry Faulds (1843-1930)", topic:"Fingerprints", lede:"The Scottish missionary-doctor in Tokyo who saw a whole system of justice in the ridges of a fingertip.", no:5,
      profile:`Henry Faulds (1843-1930) was a Scottish physician working as a medical missionary in Tokyo when, examining ridge patterns first on ancient pottery and then on living hands, he realised that fingerprints were unique and unchanging. In an 1880 letter to the journal Nature he proposed what no one had before: that latent prints left at a crime scene could identify — or clear — a suspect. He even described using a greasy print to exonerate one man and implicate another in a minor case.\n\nFaulds spent decades in a bitter priority dispute with William Herschel and saw the credit for fingerprinting drift to Francis Galton and Edward Henry, whose classification system the police adopted. History has since restored much of his due. His core insight endures: the friction ridges on our fingers form patterns essentially unique to each person and stable across a lifetime.\n\nBut fingerprint evidence is not the certainty juries imagine. Latent prints from a real scene are often smudged, partial, and overlapping. Comparison rests on an examiner's trained judgement, not a machine's verdict, and studies have shown examiners can disagree — and can be swayed by knowing what answer is "expected." A print proves a finger touched a surface; it cannot say when, or with what intent.\n\nFor the Ashford inquest, prints on a glass or a bottle can place a hand where it should not be — or confirm one exactly where it belongs. Faulds' own first instinct is the one to keep: use the ridges to clear the innocent as readily as to accuse. A found print is a question, not a confession, and the confident "certain match" is precisely the claim to interrogate.`,
      frame:`The Analyst dusts a tumbler and lifts a print onto tape. "The Constable wants me to swear this ridge pattern damns a man. I deal in what the evidence supports, no more. Show me you know a print's limits:"`,
      q:[
        { q:"What did Henry Faulds propose in his 1880 letter to Nature?", o:[
          { t:"That latent prints at a scene could be used to identify or clear a suspect.", v:"expert", fb:"Exactly — and note that clearing the innocent was part of his idea from the first." },
          { t:"That fingerprints should replace all written signatures on documents.", v:"partial", fb:"Prints do identify, but his forensic proposal was about scenes and suspects." },
          { t:"That a person's ridge patterns slowly change and need careful yearly re-recording.", v:"wrong", fb:"Ridges are stable for life — that permanence is what makes them useful." },
          { t:"That a matching print is absolute proof of guilt beyond any doubt.", v:"danger", fb:"A print proves a touch, never guilt — this is the overreach to resist." } ] },
        { q:"Why is fingerprint comparison less certain than juries assume?", o:[
          { t:"Real latent prints are partial and smudged, and comparison is judgement.", v:"expert", fb:"Right — it is expert interpretation of imperfect marks, not a machine's verdict." },
          { t:"Fingerprints change with age, so an old record never matches a new print.", v:"wrong", fb:"Ridges don't change; the uncertainty is in reading degraded latent prints." },
          { t:"There are too few patterns, so many strangers share one exactly.", v:"partial", fb:"Full prints are highly individual; the doubt lies in partial, smudged marks." },
          { t:"It isn't — a trained examiner's match is mechanical and never mistaken.", v:"danger", fb:"Examiners do err and can be biased; treating them as infallible is the trap." } ] },
        { q:"What can a fingerprint on an object honestly establish?", o:[
          { t:"That a particular finger touched that surface — not when, nor why.", v:"expert", fb:"Just so — it fixes contact, not the time or the intention behind it." },
          { t:"That the person it belongs to is guilty of what happened in the room.", v:"danger", fb:"Touch is not guilt; the leap from print to culprit is the overclaim." },
          { t:"The exact moment the object was last handled, from the print's freshness.", v:"wrong", fb:"Latent prints cannot be reliably dated; freshness gives no such clock." },
          { t:"That no one else could ever have handled the object before or after.", v:"partial", fb:"One print doesn't exclude other handlers; it only records one contact." } ] }
      ] },
    // cell: The Analyst @ The Locked Study
    bloodtype:{ sci:"Karl Landsteiner (1868-1943)", topic:"Blood groups & serology", lede:"The Viennese immunologist who learned why one person's blood curdles in another's veins — and won a Nobel for it.", no:6,
      profile:`Karl Landsteiner (1868-1943) discovered the ABO blood groups in 1901, explaining why some transfusions saved lives and others killed: red cells carry markers that another person's serum may attack. The finding made safe transfusion possible and earned him the 1930 Nobel Prize. In 1940, with Alexander Wiener, he helped identify the Rh factor. His work founded the science of serology.\n\nFor early forensic science, blood typing was a breakthrough. A stain could be shown to be human, then sorted into A, B, AB, or O. If a bloodstain at a scene was a group the victim did not share, it might belong to an assailant; if it matched a suspect's group, suspicion grew.\n\nBut Landsteiner's groups teach the essential distinction between class evidence and individual evidence. Roughly two of every five people share the commonest group. To say a stain is type O narrows the field to a huge crowd; it can never point to one person the way a fingerprint or DNA profile can. Blood typing is far better at exclusion — a suspect of a different group simply cannot be the source — than at accusation. Modern DNA has largely superseded it for identity, but the logic remains: know whether your "match" identifies an individual or merely a category.\n\nFor the Ashford inquest, serology can help decide whether blood at the scene is even the victim's, and whether any belongs to someone else. But if the sensational case rests on blood "matching" the accused, remember how many innocents share that same group. A class match is a beginning, never a proof — and mistaking one for the other is how theatrics convict.`,
      frame:`"They'll tell you a bloodstain 'matches' the heir," the Analyst says flatly. "Matches how closely — one man, or two in five? That difference decides everything. Show me you can tell them apart:"`,
      q:[
        { q:"What did Karl Landsteiner discover in 1901?", o:[
          { t:"The ABO blood groups, explaining why some transfusions kill and others save.", v:"expert", fb:"Correct — the incompatible markers that made safe transfusion possible." },
          { t:"A way to store donated blood safely for weeks before a transfusion.", v:"wrong", fb:"That came later; his 1901 discovery was the ABO grouping itself." },
          { t:"That every single individual carries a completely unique and personal blood type.", v:"danger", fb:"Groups are shared by millions — treating type as unique is the error to avoid." },
          { t:"That a stain's blood group can pinpoint one specific person for certain.", v:"wrong", fb:"A group is a category, not an identity — it cannot name one person." } ] },
        { q:"Why is blood typing 'class' rather than 'individual' evidence?", o:[
          { t:"A single group is shared by millions, pointing to a category, not a person.", v:"expert", fb:"Exactly — it narrows the crowd but can never single out one individual." },
          { t:"Blood groups are so rare that under one person in every thousand can share each.", v:"wrong", fb:"Common groups are shared by huge fractions of people — the reverse of rare." },
          { t:"Typing works only on fresh blood and fails on any dried older stain.", v:"partial", fb:"Degradation matters, but the core point is that a group is a shared category." },
          { t:"It isn't — a matching group identifies the source as surely as DNA does.", v:"danger", fb:"A group is class evidence; equating it with DNA is the mistake theatrics exploit." } ] },
        { q:"What is blood typing best suited to prove?", o:[
          { t:"Exclusion — a suspect of a different group cannot be the stain's source.", v:"expert", fb:"Right — its real power is ruling people out, not naming the culprit." },
          { t:"Guilt — a matching blood group is enough on its own to convict the accused outright.", v:"danger", fb:"A shared group convicts no one; millions match, so it proves nothing alone." },
          { t:"Age — the group of a stain reveals how long ago the blood was shed.", v:"wrong", fb:"Group says nothing about age; that's a different question entirely." },
          { t:"Sex — the ABO group of a stain reveals whether its source was a man.", v:"wrong", fb:"ABO group carries no information about the sex of the source." } ] }
      ] },
    // cell: Constable Pike @ The House Dispensary
    ballistics:{ sci:"Calvin Goddard (1891-1955)", topic:"Ballistics & the comparison microscope", lede:"The American army doctor who taught a microscope to prove which gun fired which bullet.", no:7,
      profile:`Calvin Goddard (1891-1955), a physician by training, became the pioneer of scientific firearms identification in the United States. With Charles Waite, Philip Gravelle, and John Fisher he built the Bureau of Forensic Ballistics in the 1920s and helped perfect the comparison microscope, which places two bullets side by side in a single field of view so their surface markings can be aligned.\n\nThe science rests on tool marks. A gun barrel's rifling, and the tiny imperfections of its machining, scratch a distinctive pattern of striations onto every bullet it fires, and the breech and firing pin leave their own marks on the cartridge case. By comparing a questioned bullet with one test-fired from a suspect weapon, an examiner can judge whether they came from the same gun. Goddard's testimony in the 1929 St. Valentine's Day Massacre inquiry made the method famous, and he helped found the pioneering scientific crime laboratory at Northwestern University.\n\nYet firearms identification is a comparison of marks by a trained eye, and modern reviewers have cautioned against overstating its certainty; like other "pattern" disciplines it depends on judgement and can be biased by expectation. Its first duty in any case is honest: to say whether a weapon was even involved at all.\n\nFor the Ashford inquest, that duty is decisive. There was no gunshot, no wound, no weapon — and ballistics, properly applied, quietly rules out the whole picture of a violent, forced killing. The value of a forensic method sometimes lies in what it cleanly excludes. When the theatrical story demands a struggle that left no mark of any weapon, the silence of the ballistics bench is itself a finding.`,
      frame:`Pike frowns at the shelves of bottles. "No gun, no shot, no wound — yet half the household wants a murder with a smoking weapon. I respect what evidence rules out. Prove you know how firearms are matched:"`,
      q:[
        { q:"How does the comparison microscope identify a firearm?", o:[
          { t:"It aligns two bullets side by side so their striations can be compared.", v:"expert", fb:"Correct — one field of view lets an examiner match the surface markings." },
          { t:"It measures the exact weight and calibre of a bullet to name the weapon.", v:"partial", fb:"Calibre narrows the field, but identification comes from matching the striations." },
          { t:"It detects the gunpowder residue left on the hands of the person firing.", v:"wrong", fb:"That's residue analysis, a different test — the microscope compares bullet marks." },
          { t:"It reads a serial number that every barrel stamps onto its own bullets.", v:"danger", fb:"Barrels stamp no numbers on bullets; the marks are irregular striations." } ] },
        { q:"What marks make firearms identification possible?", o:[
          { t:"Striations from the barrel's rifling and flaws, plus breech and pin marks.", v:"expert", fb:"Right — barrel and mechanism both leave characteristic marks to compare." },
          { t:"A chemical dye unique to each maker, coating every round it discharges.", v:"wrong", fb:"No such dye exists; identification rests on physical tool marks." },
          { t:"Scorch marks whose spread reveals the exact distance from which the shot was fired.", v:"partial", fb:"Scorching estimates range, not which gun — the striations do the matching." },
          { t:"A perfectly unique signature no examiner could ever possibly misread.", v:"danger", fb:"It is judgement of marks and can err; claiming perfection is the overreach." } ] },
        { q:"In a death with no wound or weapon, what does ballistics contribute?", o:[
          { t:"It cleanly excludes a firearm, undercutting any tale of a violent shooting.", v:"expert", fb:"Exactly — a method's value can lie in what it honestly rules out." },
          { t:"It can still reconstruct the fatal shot from the position of the body.", v:"danger", fb:"With no shot fired there is nothing to reconstruct — this invents evidence." },
          { t:"It proves the weapon was carried away from the scene shortly after the killing.", v:"wrong", fb:"Absence of a wound points to no shooting at all, not a removed gun." },
          { t:"Nothing useful, since a poisoning leaves no marks for it to examine.", v:"partial", fb:"It won't find the poison, but ruling out a firearm is itself a real finding." } ] }
      ] },
    // cell: Constable Pike @ The House Dispensary
    bloodspatter:{ sci:"Herbert MacDonell (1928-2019)", topic:"Bloodstain-pattern analysis", lede:"The chemist who turned the geometry of flung blood into evidence — and warned how easily it is oversold.", no:8,
      profile:`Herbert Leon MacDonell (1928-2019) is regarded as the father of modern bloodstain-pattern analysis in the United States. His 1971 study "Flight Characteristics of Human Blood and Their Stain Patterns" laid experimental groundwork, and through his Bloodstain Evidence Institute he trained a generation of examiners. He testified in prominent cases, including the O. J. Simpson trial.\n\nThe discipline reads the size, shape, and distribution of bloodstains to reconstruct events. A drop's elongated shape and "tail" can indicate its direction of travel; the angle at which it struck a surface can be estimated from how oval it is; converging trajectories can suggest where blood originated. In principle, spatter can distinguish a beating from a gunshot, or reveal where an attacker stood.\n\nBut bloodstain-pattern analysis is among the most contested of the forensic sciences. A landmark 2009 review by the U.S. National Academy of Sciences warned that many of its courtroom conclusions were overstated and rested more on an examiner's experience than on firm science. Interpretations can vary between experts and be swayed by what they expect to find. It is suggestive, rarely decisive, and dangerous when delivered with false confidence.\n\nFor the Ashford inquest, the discipline matters mostly for what is absent. A violent killing of the kind the sensational story demands would fling and smear blood across a room; a quiet poisoning leaves the walls clean. When a scene shows no spatter where a beating should have painted it, the theatrical narrative loses its stage. And when someone offers a vivid, certain "reconstruction" from a few ambiguous drops, that overreach is itself a warning to slow down.`,
      frame:`"There's not a drop out of place in that study — no spray, no smear," Pike says. "To some minds that's a disappointment; to me it's a clue. Show me what blood patterns can, and can't, prove:"`,
      q:[
        { q:"What can bloodstain-pattern analysis attempt to reconstruct?", o:[
          { t:"The direction, angle, and origin of blood, and roughly what act caused it.", v:"expert", fb:"Right — geometry of the stains suggests how and from where blood was shed." },
          { t:"The precise identity of the person whose blood was shed at the scene.", v:"wrong", fb:"Pattern is not identity; typing or DNA answers whose blood, not spatter." },
          { t:"The exact time of the attack, read from how far the droplets travelled.", v:"partial", fb:"Distance hints at force, not the clock — spatter doesn't time an attack." },
          { t:"The whole sequence of a killing, replayed with total certainty from stains.", v:"danger", fb:"That false confidence is exactly what the 2009 review warned against." } ] },
        { q:"Why did the 2009 National Academy review criticise the field?", o:[
          { t:"Many courtroom claims were overstated, resting on experience, not science.", v:"expert", fb:"Exactly — it flagged the gap between confident testimony and firm evidence." },
          { t:"The equipment was too costly for most police laboratories to afford.", v:"wrong", fb:"Cost wasn't the issue; overstated, subjective conclusions were." },
          { t:"It found that blood patterns are wholly random and so carry no real information.", v:"partial", fb:"Patterns do carry information; the fault was overstating how much." },
          { t:"It concluded the method is flawless and must never be questioned at all.", v:"danger", fb:"The opposite — it urged far more caution, not blind trust." } ] },
        { q:"In the Ashford study, what does the absence of spatter suggest?", o:[
          { t:"That no violent, bloody attack happened there, against the lurid account.", v:"expert", fb:"Just so — a beating would paint the room; clean walls argue against it." },
          { t:"That the killer meticulously scrubbed every trace of a savage beating away.", v:"danger", fb:"Assuming a hidden bloodbath fits the story, not the evidence in the room." },
          { t:"That the victim was killed elsewhere and carried into the study after.", v:"wrong", fb:"A locked room and lividity would show that; clean walls point to no beating." },
          { t:"Nothing at all — a lack of spatter carries no meaning whatsoever.", v:"partial", fb:"Absence is meaningful here: no spatter is real evidence against a beating." } ] }
      ] },
    // cell: Dr. Okafor @ The House Dispensary
    entomology:{ sci:"Jean Pierre Mégnin (1828-1905)", topic:"Forensic entomology", lede:"The French veterinarian who read the calendar of death in the insects that arrive to claim a corpse.", no:9,
      profile:`Jean Pierre Mégnin (1828-1905) was a French army veterinarian and entomologist whose 1894 book La Faune des cadavres made forensic entomology a systematic study. He observed that a dead body is colonised by insects in a predictable succession of "waves" — different species arriving at different stages of decomposition — and that reading which insects are present, and in what stage of their own life cycle, can estimate how long a body has lain.\n\nThe logic is developmental. Blowflies find a fresh corpse within hours and lay eggs; those eggs hatch into larvae that grow and pupate on a temperature-dependent schedule. By identifying the species and measuring the oldest stage present, an entomologist can estimate the minimum time since death — often more reliably, days after death, than the classic cooling-and-stiffening signs, which fade.\n\nIts limits are equally clear. Insect development depends heavily on temperature, weather, and whether a body was indoors, buried, or wrapped; the method gives a bracketed estimate, not a precise hour, and it estimates when insects first gained access, which is not always the moment of death.\n\nFor the Ashford inquest, entomology is unlikely to crown the case — the body was found quickly, indoors, at a desk. But it teaches the pathologist's cardinal habit: time of death is reconstructed from converging natural processes, each with a known range, none infallible. And it reinforces the theme of the whole inquiry — that patient, unglamorous observation of the ordinary (a fly, a stain, a log-book entry) tells the truth more reliably than a dramatic, over-certain pronouncement made at a first glance.`,
      frame:`"When a body isn't found for days, the insects keep a more honest clock than the flesh does," Okafor notes. "This one turned up within the hour, but the principle still governs my reasoning. Test me:"`,
      q:[
        { q:"What is the basis of the entomological estimate of time since death?", o:[
          { t:"The predictable succession of insect species and their developmental stages.", v:"expert", fb:"Right — the waves of colonisers and their life stages mark elapsed time." },
          { t:"The total number of insects present, divided by the weight of the body.", v:"wrong", fb:"Raw counts aren't the method; species and their maturity are what matter." },
          { t:"The species of insect alone, whatever life stage it has reached.", v:"partial", fb:"Species matters, but the stage of development is what times the estimate." },
          { t:"The exact instant of death, which insects are said to record with perfect precision.", v:"danger", fb:"Insects give a bracketed range, and only from when they first gained access." } ] },
        { q:"What most strongly affects how fast the insect 'clock' runs?", o:[
          { t:"Temperature and conditions — indoors, buried, or exposed all change the rate.", v:"expert", fb:"Exactly — development is temperature-driven, so context is everything." },
          { t:"The size of the body, which alone sets how quickly the larvae mature.", v:"partial", fb:"Size plays a small role; temperature dominates the developmental rate." },
          { t:"The time of year alone, since insects are thought to develop at a fixed annual rate.", v:"wrong", fb:"There is no fixed rate; it rises and falls with temperature and conditions." },
          { t:"Nothing — insect development is constant, whatever the surroundings.", v:"danger", fb:"It is highly variable; ignoring conditions would wreck the estimate." } ] },
        { q:"What does the entomological estimate actually measure?", o:[
          { t:"The minimum time since insects first reached the body, as a bracketed range.", v:"expert", fb:"Just so — it dates colonisation, not necessarily the moment of death." },
          { t:"The precise clock hour of death, accurate to within a few short minutes.", v:"wrong", fb:"No such precision exists; the answer is a range, not a minute." },
          { t:"The identity of the killer, inferred from species that follow one particular person.", v:"danger", fb:"Insects don't track people; that's fantasy, not entomology." },
          { t:"The cause of death, read from which insects choose to colonise a body.", v:"partial", fb:"Colonisers can hint at wounds or drugs, but they time death, not its cause." } ] }
      ] },
    // cell: Dr. Okafor @ The House Dispensary
    questioneddocs:{ sci:"Albert S. Osborn (1858-1946)", topic:"Questioned documents & forgery", lede:"The examiner who taught courts that ink, paper, and a doctored line can testify as plainly as any witness.", no:10,
      profile:`Albert Sherman Osborn (1858-1946) was the foremost American authority on questioned documents and effectively founded the discipline. His 1910 book Questioned Documents became its bible, and his methods shaped courtroom practice for a century; he testified in the Lindbergh kidnapping trial and helped establish the American Society of Questioned Document Examiners.\n\nHis field asks whether a document is what it claims to be. Examiners study handwriting for the habitual, unconscious features that are hard to disguise; they compare inks and papers, detect erasures and chemical alterations, read the ghost of "indented writing" pressed through from a page above, and expose insertions squeezed into a line or entries added later in a different pen. A ledger that has been "improved" after the fact rarely hides every seam.\n\nOsborn insisted the work be demonstrable — that an examiner show the court, with enlarged photographs and measurable features, why a signature is forged or a line was added, rather than simply asserting expertise. That discipline, of proving rather than pronouncing, is exactly what separates evidence from theatre.\n\nFor the Ashford inquest, this is one of the sharpest tools you have. A dispensary keeps a log — every drug measured out, every dose recorded, signed and dated. If a fatal preparation was made and then written out of the record, the alteration should betray itself: a crowded entry, a fresher ink, a changed slant, an erased line beneath a new one. Osborn's method turns a doctored logbook from an alibi into the very proof of the crime. Where a body can be argued over, an altered document, honestly examined, is hard to talk away.`,
      frame:`Okafor sets the dispensary log-book before you, open to a smudged page. "A record like this is a witness that cannot flee the country — if you can read where it's been tampered with. Show me you can:"`,
      q:[
        { q:"What is the central question of questioned-document examination?", o:[
          { t:"Whether a document is truly what it claims, and unchanged since writing.", v:"expert", fb:"Exactly — authenticity and integrity are the whole of the inquiry." },
          { t:"Whose handwriting appears on a page, judged purely by its overall neatness alone.", v:"partial", fb:"Authorship matters, but neatness alone is no basis, and integrity is the core." },
          { t:"How old a sheet of paper is, measured by the yellowing at its edges.", v:"wrong", fb:"Ageing paper is a minor cue; the field asks whether the document is genuine." },
          { t:"Whether a suspect is lying, read straight from the pressure of the pen.", v:"danger", fb:"Pen pressure reveals no lie; that's a leap the discipline never makes." } ] },
        { q:"How might a later alteration to a logbook betray itself?", o:[
          { t:"By a crowded entry, a fresher ink, a changed slant, or an erasure beneath.", v:"expert", fb:"Right — these seams are exactly what a document examiner hunts for." },
          { t:"By the paper tearing wherever a dishonest hand has touched its surface.", v:"wrong", fb:"Paper doesn't betray dishonesty by tearing; look for ink and spacing seams." },
          { t:"By the writer signing a false name that appears nowhere else in it.", v:"partial", fb:"A forged signature is one clue, but alterations show in ink, slant, and spacing." },
          { t:"It cannot — a careful forgery is always entirely undetectable by anyone at all.", v:"danger", fb:"Careful forgeries usually leave seams; assuming none is the poisoner's hope." } ] },
        { q:"What did Osborn insist an examiner must do in court?", o:[
          { t:"Demonstrate the findings with measurable features, not merely claim expertise.", v:"expert", fb:"Just so — show the jury the proof rather than pronounce from authority." },
          { t:"State a confident conclusion and simply let the jury trust the expert's standing.", v:"danger", fb:"That is the very authority-worship Osborn's demonstrable method rejects." },
          { t:"Refuse to show the documents, to protect the secrecy of the method used.", v:"wrong", fb:"He demanded the opposite — full, visible demonstration to the court." },
          { t:"Compare only the signatures, ignoring the ink, paper, and any erasures.", v:"partial", fb:"Signatures are one part; a full examination weighs ink, paper, and erasures too." } ] }
      ] },
    // cell: The Analyst @ The House Dispensary
    traceevidence:{ sci:"Paul L. Kirk (1902-1970)", topic:"Trace evidence & its limits", lede:"The Berkeley criminalist who preached that physical evidence 'cannot lie' — and whose field later relearned its limits.", no:11,
      profile:`Paul Leland Kirk (1902-1970) was an American biochemist who became one of the great figures of criminalistics. From the University of California, Berkeley, he built the study of trace evidence — hairs, fibres, glass, soil, dust — into a rigorous discipline, and his 1953 text Crime Investigation trained generations. He is famous for his re-examination of the Sam Sheppard murder case, where his analysis of the bloodstains helped overturn a conviction.\n\nKirk's creed was that physical evidence "cannot be wrong; it cannot perjure itself; it cannot be wholly absent" — only its interpreters fail it. He championed the idea of individualization: that with enough detail, a trace could be tied to a single source.\n\nBut that ambition is exactly where his field later had to be humbled, and it bears directly on this case. Microscopic hair comparison, long offered in court as near-certain, was shown in the 2010s to have been drastically overstated: a U.S. review found examiners had for decades exaggerated the strength of hair "matches," contributing to wrongful convictions. Hairs and fibres are, for the most part, class evidence — they say a source is consistent with a type, not that it is the one source in the world.\n\nFor the Ashford inquest, this is the crux of the overclaim. The sensational case leans on a hair or fibre said to "match" the heir with courtroom certainty. Kirk's honest legacy answers it two ways: trace evidence is real and worth gathering, but a microscopic hair comparison identifies a category, not a culprit. Respect the trace; distrust the man who inflates it into a name.`,
      frame:`The Analyst holds a single hair to the light with tweezers. "Somebody upstairs wants me to swear this hair belongs to one man and no other. I can't, and I won't pretend. Show me where trace evidence stops:"`,
      q:[
        { q:"What did Paul Kirk build into a rigorous discipline?", o:[
          { t:"Trace evidence — the study of hairs, fibres, glass, soil, and dust.", v:"expert", fb:"Correct — the small transferred materials that a scene leaves behind." },
          { t:"The classification of fingerprints into loops, whorls, and arches.", v:"partial", fb:"That's fingerprint work; Kirk's field was hairs, fibres, glass, and dust." },
          { t:"The chemical detection of poisons in the organs of an exhumed body.", v:"wrong", fb:"That's toxicology; Kirk's discipline was physical trace evidence." },
          { t:"A method proving any single hair belongs to one person for certain.", v:"danger", fb:"Hair comparison can't individualise — that overclaim is what humbled the field." } ] },
        { q:"What was later found to be wrong about microscopic hair comparison?", o:[
          { t:"Examiners had for decades overstated how strongly a hair 'matched' a source.", v:"expert", fb:"Exactly — the certainty claimed in court far exceeded what the science allowed." },
          { t:"Hairs turned out to carry no usable features at all and were discarded entirely.", v:"wrong", fb:"Hairs do carry features; the fault was overstating how conclusive they are." },
          { t:"The microscopes were too weak to resolve the fine detail of a hair.", v:"partial", fb:"The tool wasn't the problem; overstated conclusions from it were." },
          { t:"Nothing — a microscopic hair match reliably identifies one person.", v:"danger", fb:"It identifies a type, not a person; believing otherwise convicted the innocent." } ] },
        { q:"What kind of evidence is a hair or fibre, honestly described?", o:[
          { t:"Class evidence — consistent with a type, not proof of one unique source.", v:"expert", fb:"Right — it narrows to a category, and must never be sold as an identity." },
          { t:"Individual evidence — as conclusive as a fingerprint or DNA profile is.", v:"danger", fb:"This is the overclaim itself; hair comparison is class, not individual, evidence." },
          { t:"Circumstantial only — it can never be collected or analysed in a lab.", v:"wrong", fb:"It is analysed in the lab routinely; it's simply class, not individual, evidence." },
          { t:"Useless evidence — hairs and fibres tell an investigator nothing at all.", v:"partial", fb:"They tell you a good deal at the class level; the error is inflating that." } ] }
      ] },
    // cell: The Analyst @ The House Dispensary
    biasmatch:{ sci:"Itiel Dror (forensic-cognition researcher)", topic:"Cognitive bias & the overstated 'match'", lede:"The cognitive scientist who proved even fingerprint experts can be steered by what they expect to see.", no:12,
      profile:`Itiel Dror is a cognitive neuroscientist, based at University College London, who studies how expert forensic judgement can be distorted by context. In a landmark 2006 experiment, he gave fingerprint examiners prints they had themselves previously judged — but attached a misleading story (for instance, that the suspect had confessed, or had a solid alibi). A number of the experts reversed their own earlier conclusions. The prints had not changed; only the context had.\n\nDror's work named and measured "forensic confirmation bias": the way extraneous information — a confession, a detective's hunch, the emotional weight of a case — can unconsciously shape what an analyst perceives as a "match." It is not fraud or incompetence; it is ordinary human cognition operating where it should not. He has documented similar effects across disciplines, from DNA mixture interpretation to forensic pathology.\n\nHis proposed remedy is procedural, not personal: "linear sequential unmasking" and context management, so that examiners see the evidence before they learn the story police want it to tell, and reach conclusions blind to the desired answer. Bias, he argues, is fought by design, not by insisting one is immune to it.\n\nFor the Ashford inquest, Dror is the key to the whole trap. The sensational case is being built backward: the household has already chosen the heir, and now every ambiguous trace is read as "matching" him. That is confirmation bias in action — the confident expert who "sees" the answer everyone expects. The truth here will not announce itself with a dramatic match; it must be found by examiners who look at the chemistry and the record first, and let those speak before the story does.`,
      frame:`"Ask a decent examiner a question after you've told him the answer you want, and watch what happens," the Analyst says. "This whole house has picked its villain. Show me how that poisons a so-called match:"`,
      q:[
        { q:"What did Dror's 2006 experiment demonstrate?", o:[
          { t:"Examiners reversed their own past conclusions when given misleading context.", v:"expert", fb:"Exactly — the prints were identical; only the surrounding story had changed." },
          { t:"That fingerprint examiners are frauds who fabricate matches for pay.", v:"wrong", fb:"Not fraud — ordinary cognition; honest experts were swayed unconsciously." },
          { t:"That prints from identical twins are far too similar for anyone to tell them apart.", v:"partial", fb:"A different limit entirely; his finding was about biasing context, not twins." },
          { t:"That expert judgement is infallible once a person is properly trained.", v:"danger", fb:"The reverse — even trained experts were biased, which is the whole warning." } ] },
        { q:"What is 'forensic confirmation bias'?", o:[
          { t:"Extraneous information unconsciously shaping what an analyst reads as a match.", v:"expert", fb:"Right — the desired answer quietly steers perception without the analyst knowing." },
          { t:"A deliberate choice to ignore any evidence that happens to contradict a police theory.", v:"partial", fb:"That's conscious misconduct; the bias Dror studied is unconscious and honest." },
          { t:"A rule requiring examiners to confirm every match with a second expert.", v:"wrong", fb:"That's a verification procedure, not the cognitive bias itself." },
          { t:"A myth — trained experts are simply immune to any outside influence.", v:"danger", fb:"Believing oneself immune is precisely what leaves an expert most exposed." } ] },
        { q:"What remedy does Dror propose?", o:[
          { t:"Shield examiners from the case story until they have judged the evidence.", v:"expert", fb:"Exactly — manage context by design so the evidence is read blind first." },
          { t:"Trust experienced experts to consciously set aside whatever they are told.", v:"danger", fb:"Willpower doesn't work on unconscious bias; only procedure does." },
          { t:"Abolish forensic comparison entirely, since all of it is hopelessly biased.", v:"wrong", fb:"He reforms the process, not abolishes it — bias is managed, not fatal." },
          { t:"Have detectives brief the examiner fully before any analysis begins.", v:"partial", fb:"That's backwards — full briefing first is exactly what introduces the bias." } ] }
      ] },
    // cell: Constable Pike @ The Conservatory
    chainofcustody:{ sci:"Hans Gross (1847-1915)", topic:"Criminalistics & chain of custody", lede:"The Austrian magistrate who wrote the first handbook of scientific investigation and gave the field its name.", no:13,
      profile:`Hans Gross (1847-1915) was an Austrian examining magistrate and later professor who effectively founded criminalistics as a systematic profession. His 1893 Handbuch für Untersuchungsrichter ("Handbook for Examining Magistrates") gathered, for the first time, the practical science of investigation — how to examine a scene, handle physical clues, use experts, and avoid the errors of assumption. He is often credited with coining the term "criminalistics."\n\nGross's insistence was on method and discipline. An investigator, he argued, must approach a scene as a scientist approaches an experiment: observe before touching, record meticulously, preserve every object in the state it was found, and guard against the human tendency to see what one expects. From his teaching grew the modern idea of chain of custody — the unbroken, documented trail showing who handled each piece of evidence, when, and how, so that what reaches the court is demonstrably the same, uncontaminated item taken from the scene.\n\nChain of custody is unglamorous but decisive. Evidence with a broken trail can be excluded or doubted, however damning it seems; evidence with a clean one can withstand attack. It also protects the innocent, because it exposes contamination, substitution, and the loss that lets a real clue vanish.\n\nFor the Ashford inquest, Gross's discipline governs everything. The bottle from the dispensary, the log-book, the swabs from the body — each is only as good as the record of its handling. A poisoning proved by careful toxicology can still collapse if the sample's custody is in doubt; and a theatrical "match" is worth even less if no one can say where the exhibit has been. Method is not bureaucracy here. It is the difference between a truth that stands and one talked away.`,
      frame:`Pike lays his evidence bags on the wicker table, each one tagged and signed. "I've seen good cases thrown out over sloppy handling. Before I hand you these, show me you respect the chain:"`,
      q:[
        { q:"What did Hans Gross contribute to forensic science?", o:[
          { t:"The first systematic handbook of investigation, and the term criminalistics.", v:"expert", fb:"Correct — he codified scientific method for investigators and named the field." },
          { t:"The comparison microscope used to match a bullet to a particular gun.", v:"wrong", fb:"That was Goddard and colleagues; Gross's gift was systematic method." },
          { t:"The discovery that fingerprints are unique to each individual person.", v:"partial", fb:"Others established prints; Gross's legacy is disciplined investigation itself." },
          { t:"A method proving a suspect's guilt directly from the state of the scene.", v:"danger", fb:"His method builds sound cases, but scenes suggest — they don't prove guilt alone." } ] },
        { q:"What is 'chain of custody'?", o:[
          { t:"The documented trail of who handled each exhibit, when, and how it was kept.", v:"expert", fb:"Right — the unbroken record that proves the exhibit is the same, untampered item." },
          { t:"The order in which suspects are questioned during an investigation.", v:"wrong", fb:"That's interview sequence, not the handling record of physical evidence." },
          { t:"The list of every officer who was present at the scene of the crime.", v:"partial", fb:"Presence isn't custody; the chain tracks who handled each exhibit and how." },
          { t:"A formality that can be safely skipped when the evidence is obvious.", v:"danger", fb:"Skipping it is how obvious evidence gets thrown out of court." } ] },
        { q:"Why does chain of custody matter to a case?", o:[
          { t:"Broken custody lets damning evidence be doubted; a clean trail withstands it.", v:"expert", fb:"Exactly — integrity of handling is what makes an exhibit trustworthy in court." },
          { t:"It doesn't — if evidence looks conclusive, its handling is beside the point.", v:"danger", fb:"Even conclusive-looking evidence collapses if its custody is in doubt." },
          { t:"It speeds a trial by letting the court skip examining the exhibits.", v:"wrong", fb:"Custody documents handling; it never replaces examining the evidence." },
          { t:"It records the crime's timeline, which is its only real purpose in a case.", v:"partial", fb:"It records handling, not the crime's timeline; that's a different task." } ] }
      ] },
    // cell: Constable Pike @ The Conservatory
    autopsy:{ sci:"Rudolf Virchow (1821-1902)", topic:"The medico-legal autopsy", lede:"The German physician who founded cellular pathology and made the systematic autopsy the anchor of any cause of death.", no:14,
      profile:`Rudolf Virchow (1821-1902) was a German physician, the father of modern pathology, who established that disease originates in cells — "omnis cellula e cellula," every cell from a cell. Beyond his vast scientific and public-health legacy, he standardised the autopsy: the Virchow method, in which the organs are removed and examined one at a time, brought order and completeness to post-mortem examination and made findings comparable from one case to the next.\n\nA medico-legal autopsy asks a disciplined series of questions: what is the cause of death (the disease or injury that led to it), the mechanism (the physiological failure), and, where relevant, the manner (natural, accident, suicide, homicide). A systematic examination inspects every organ, samples tissue and fluid, and documents what it finds and — just as importantly — what it does not.\n\nVirchow's legacy warns against the lazy conclusion. A hurried external glance at a well-dressed man slumped at his desk invites the words "heart failure." But a heart can stop for many reasons, and a proper autopsy distinguishes a diseased heart from a healthy one poisoned into stillness. Where the examination finds no natural disease sufficient to explain death, "natural causes" is not a diagnosis — it is a gap that demands the toxicologist.\n\nFor the Ashford inquest, the autopsy is the wall the dismissal breaks against. If Dr. Merrick's convenient certificate says "heart attack," the systematic post-mortem is what tests that claim organ by organ. Should it find a sound heart and no natural cause, the comfortable story fails, and the search turns — as Orfila taught — to the chemistry. The autopsy does not close the case; done honestly, it refuses to let the case be closed too soon.`,
      frame:`"The family doctor signed 'heart failure' before the body was cold," Pike mutters. "I'm no medical man, but even I know that's not a proper examination. Show me what a real autopsy settles:"`,
      q:[
        { q:"What did Virchow establish about disease and the autopsy?", o:[
          { t:"That disease begins in cells, and that autopsies proceed organ by organ.", v:"expert", fb:"Correct — cellular pathology plus a systematic, complete post-mortem method." },
          { t:"That most sudden deaths in older men are caused by heart disease alone.", v:"danger", fb:"Assuming the heart is exactly the lazy shortcut a systematic autopsy resists." },
          { t:"That an external look at the body is enough to state a cause of death.", v:"wrong", fb:"His whole method is internal and systematic — the external glance is not enough." },
          { t:"That a physician's certificate makes any further examination needless.", v:"partial", fb:"A certificate is a claim to be tested, not a substitute for the autopsy." } ] },
        { q:"What does a medico-legal autopsy seek to determine?", o:[
          { t:"The cause, mechanism, and manner of death, from a full internal exam.", v:"expert", fb:"Right — what led to death, how the body failed, and by whose hand if any." },
          { t:"Only the exact minute of death, ignoring what actually caused it.", v:"wrong", fb:"Timing is one input; cause, mechanism, and manner are the real questions." },
          { t:"Whether the deceased had any illness, regardless of what killed them.", v:"partial", fb:"Illness is noted, but the point is what actually caused this death." },
          { t:"Whichever cause the attending physician has already written down.", v:"danger", fb:"Rubber-stamping the certificate is exactly the failure to guard against." } ] },
        { q:"An autopsy finds no natural disease sufficient to explain death. That means:", o:[
          { t:"'Natural causes' is unproven, and the search must turn to toxicology.", v:"expert", fb:"Exactly — an unexplained death points onward to the chemistry, not to closure." },
          { t:"The death was natural anyway, since no other cause is visible to the eye.", v:"danger", fb:"An invisible cause is the poisoner's cover; absence of disease demands more tests." },
          { t:"The examination failed and should simply be repeated from the start.", v:"wrong", fb:"The finding isn't a failure; it's a signal to escalate to toxicology." },
          { t:"The cause is unknowable, and the case must be closed as a mystery.", v:"partial", fb:"It isn't unknowable yet — the toxicologist has not had the sample." } ] }
      ] },
    // cell: Dr. Okafor @ The Conservatory
    poisondetect:{ sci:"James Marsh (1794-1846)", topic:"Detecting poison: the Marsh test", lede:"The British chemist who devised a test for arsenic so clear a jury could watch the poison appear.", no:15,
      profile:`James Marsh (1794-1846) was a British chemist at the Royal Arsenal in Woolwich who, in 1836, published the sensitive test for arsenic that bears his name. Earlier methods were unreliable and easy for a defence to dispute; worse, a jury could not see them. Marsh's frustration after a poisoning trial collapsed for want of convincing evidence drove him to a better way.\n\nThe Marsh test treats a suspect sample with zinc and acid, converting any arsenic present into arsine gas; heated, the gas decomposes and deposits a glistening black "arsenic mirror" on a cold surface. The stain is stable, can be measured against known standards, and — crucially — can be produced in the courtroom for all to see. It could detect minute quantities and gave toxicology its first truly reliable, demonstrable assay for a common murder weapon of the age.\n\nThe test's fame was sealed in the 1840 Lafarge trial, where Mathieu Orfila used it on exhumed tissue to prove arsenic in the body. Its lesson outlived arsenic itself: the right chemical test, sensitive and reproducible, can drag a hidden poison into the light where no autopsy alone could. But the same lesson carries a caution — a test finds only what it is designed to find, so the investigator must ask for the correct one.\n\nFor the Ashford inquest, Marsh is the shape of the answer. A death that looks natural, a body without a wound, a suspicion no one can prove — this is precisely the situation his test was born to resolve. The truth will not come from a dramatic match or a hasty certificate, but from a specific, sensitive assay applied on purpose to the organs and to whatever was prepared in that dispensary.`,
      frame:`"An autopsy told me what didn't kill this man," Okafor says. "For what did, I need the right assay — sensitive, and demonstrable in court. Show me how a poison is actually caught:"`,
      q:[
        { q:"Why was the Marsh test such an advance?", o:[
          { t:"It was sensitive, reproducible, and could be demonstrated to a jury.", v:"expert", fb:"Exactly — a stable, visible result a court could trust and see for itself." },
          { t:"It was faster than earlier methods, though no more accurate than them.", v:"partial", fb:"Its real leap was reliability and visible proof, not merely speed." },
          { t:"It could detect every known poison at once in a single reaction.", v:"wrong", fb:"It was specific to arsenic; no test finds every poison at once." },
          { t:"It made autopsies needless by naming any poison from a drop of blood.", v:"danger", fb:"It complements the autopsy for arsenic; it replaces nothing and names one poison." } ] },
        { q:"How does the Marsh test reveal arsenic?", o:[
          { t:"It converts arsenic to a gas that deposits a black mirror on cold glass.", v:"expert", fb:"Right — arsine gas decomposes to a measurable metallic film." },
          { t:"It turns any sample containing arsenic a deep, permanent shade of blue.", v:"wrong", fb:"There's no blue colour reaction; the result is a black arsenic mirror." },
          { t:"It weighs the sample before and after heating to infer the arsenic.", v:"partial", fb:"Not a weighing method; it produces a visible metallic deposit." },
          { t:"It glows in the dark wherever the poison has touched the body's tissue.", v:"danger", fb:"No glow is involved; that's invention, not chemistry." } ] },
        { q:"What caution does the Marsh test carry for an investigator?", o:[
          { t:"A test finds only what it targets, so you must ask for the right assay.", v:"expert", fb:"Exactly — a negative for arsenic says nothing about other poisons." },
          { t:"Once run, it rules out every poison it does not happen to detect.", v:"danger", fb:"A specific test excludes only its own target — never all poisons." },
          { t:"It works only on living patients and fails on any exhumed remains.", v:"wrong", fb:"It worked famously on exhumed tissue in the Lafarge case." },
          { t:"It requires a confession before its result can be admitted at trial.", v:"partial", fb:"No confession is needed; the demonstrable result is the evidence itself." } ] }
      ] },
    // cell: Dr. Okafor @ The Conservatory
    anthropology:{ sci:"William M. Bass (b. 1928)", topic:"Forensic anthropology", lede:"The American scientist who founded the 'Body Farm' to learn what bones and decay honestly reveal.", no:16,
      profile:`William M. Bass (b. 1928) is an American forensic anthropologist who, in 1981, founded the Anthropology Research Facility at the University of Tennessee — the famous "Body Farm" — where donated human remains decompose under studied conditions so that science can learn what really happens after death, rather than what folklore supposes. He trained many of the field's leading practitioners and helped professionalise the discipline.\n\nForensic anthropology reads the skeleton. From bones an expert can estimate a person's age, sex, ancestry, and stature, identify old healed injuries, and recognise perimortem trauma — fractures inflicted at or near the time of death, distinguishable from post-mortem damage. The Body Farm's decomposition research also refined estimates of the post-mortem interval from the stage and rate of decay under known conditions.\n\nBass's career includes a famous, instructive error: early on he misjudged the age of remains by more than a century, mistaking a well-preserved Civil War-era body for a recent death. He turned the mistake into a lesson about testing assumptions and grounding estimates in real data — which is exactly what the Body Farm was built to provide.\n\nFor the Ashford inquest, anthropology is not the centrepiece; the deceased is freshly dead, identified, and intact, with soft tissue for the pathologist to examine. But Bass's discipline reinforces the case's spine: identity and trauma are established from physical evidence patiently gathered, estimates come as ranges anchored in data, and even a great expert must check his first impression. The confident glance is the enemy; the tested conclusion is the friend. That habit, more than any single bone, is what this inquiry needs.`,
      frame:`"When there's flesh to read, I read it; when there's only bone, I'd call a man like Bass," Okafor says. "Either way the rule holds — anchor every estimate in evidence. Show me what the skeleton tells:"`,
      q:[
        { q:"Why did William Bass found the 'Body Farm'?", o:[
          { t:"To study human decomposition under real conditions, not folklore.", v:"expert", fb:"Right — to replace guesswork about decay with measured, observed data." },
          { t:"To train police dogs to find remains buried in shallow woodland graves.", v:"wrong", fb:"That's cadaver-dog work; the facility studies decomposition itself." },
          { t:"To prove that bones reveal nothing reliable about a person's identity.", v:"danger", fb:"Bones reveal a great deal; the farm was built to ground that in data." },
          { t:"To show that time since death can be named to the exact day from decay.", v:"partial", fb:"It refined ranges, not exact days — precision has real limits." } ] },
        { q:"What can forensic anthropology read from a skeleton?", o:[
          { t:"Age, sex, ancestry, stature, old injuries, and trauma near the time of death.", v:"expert", fb:"Exactly — the biological profile plus healed and perimortem injuries." },
          { t:"The person's cause of death and their occupation in life, from bone alone.", v:"wrong", fb:"Bone rarely gives cause of death or job; it gives the biological profile." },
          { t:"Only the height of the individual, estimated from the length of the femur.", v:"partial", fb:"Stature is one output among several — age, sex, and trauma come too." },
          { t:"The identity of the killer, matched directly to marks left on the bones.", v:"danger", fb:"Bones don't name a killer; that leap far exceeds what they can show." } ] },
        { q:"What lesson did Bass draw from his famous dating error?", o:[
          { t:"To test first impressions and anchor every estimate in measured data.", v:"expert", fb:"Just so — the corrective to a confident glance is grounded, tested data." },
          { t:"That an expert's trained first impression should be trusted, unchecked.", v:"danger", fb:"His century-off error is the very reason a first impression must be tested." },
          { t:"That forensic anthropology cannot estimate the age of any remains.", v:"wrong", fb:"It can, with care and data; the error taught rigour, not futility." },
          { t:"That only radiocarbon dating should ever be used on any remains.", v:"partial", fb:"Radiocarbon suits ancient remains; forensic cases need other, data-based methods." } ] }
      ] },
    // cell: The Analyst @ The Conservatory
    crimescene:{ sci:"Frances Glessner Lee (1878-1962)", topic:"Scene reconstruction", lede:"The heiress who built dollhouse death scenes to teach detectives to see everything and assume nothing.", no:17,
      profile:`Frances Glessner Lee (1878-1962) is often called the mother of forensic science in America. Barred from formal medical training as a young woman, she used her inheritance to endow the department of legal medicine at Harvard and to campaign for professional, scientific death investigation to replace the untrained coroner system. In her sixties she was made an honorary captain in the New Hampshire State Police.\n\nHer most original creation was the "Nutshell Studies of Unexplained Death" — a series of meticulously handcrafted dollhouse-scale dioramas, each reconstructing a real or composite death scene down to working locks, tiny bloodstains, and the precise position of a body. They were, and still are, teaching tools: a detective studies a Nutshell to practise observing systematically, without leaping to the obvious explanation. Her guiding motto was to "convict the guilty, clear the innocent, and find the truth in a nutshell."\n\nLee's method embodied the discipline of reconstruction: read a scene as a whole, note every detail in relation to every other, and let the physical arrangement — not a first hunch — suggest what happened. A body's position, an untouched meal, a locked door, a fallen glass: each is a fact to be explained, and a scene that has been staged often betrays itself by an inconsistency the careful eye can catch.\n\nFor the Ashford inquest, Lee is the presiding spirit. A locked study, a man at his desk, a household certain of its story — it is a Nutshell made real. Her charge is precisely yours: do not seize the dramatic explanation the room seems to offer, and do not accept the comfortable one either. Observe everything, assume nothing, and let the whole scene, read together, reveal the truth.`,
      frame:`The Analyst gestures from the conservatory to the case photographs. "Glessner Lee built whole scenes in miniature to teach people to look before concluding. That study is her lesson made real. Read it without leaping:"`,
      q:[
        { q:"What were Frances Glessner Lee's 'Nutshell Studies'?", o:[
          { t:"Detailed dollhouse death scenes built to teach systematic observation.", v:"expert", fb:"Right — training dioramas that reward patient looking over quick conclusions." },
          { t:"A written casebook of unsolved deaths compiled to train detectives.", v:"partial", fb:"They taught detectives, but the medium was the miniature scene, not a casebook." },
          { t:"A collection of real crime-scene photographs from her investigations.", v:"wrong", fb:"They were handcrafted models, not photographs of real scenes." },
          { t:"A method for naming a killer instantly from the layout of any room.", v:"danger", fb:"They teach the opposite — to observe carefully, not to leap to a culprit." } ] },
        { q:"What discipline do the Nutshells teach?", o:[
          { t:"To observe every detail and its relations before seizing an explanation.", v:"expert", fb:"Exactly — read the whole scene as facts to explain, not a story to confirm." },
          { t:"To identify the most obvious suspect from the scene as fast as possible.", v:"danger", fb:"Speed toward the obvious is precisely the habit the Nutshells train out." },
          { t:"To memorise the fixed layout every genuine murder scene must have.", v:"wrong", fb:"There is no fixed layout; each scene is read on its own particular facts." },
          { t:"To photograph a scene thoroughly before any evidence is moved.", v:"partial", fb:"Good practice, but the Nutshells teach how to observe and reason, not to shoot photos." } ] },
        { q:"How might a staged scene betray itself?", o:[
          { t:"By an inconsistency the careful eye catches among the physical details.", v:"expert", fb:"Right — staging usually leaves a detail that doesn't fit the claimed story." },
          { t:"By always leaving an obvious clue the culprit deliberately wants found.", v:"wrong", fb:"Staging hides, not advertises; it betrays itself by inconsistency, not signposts." },
          { t:"By feeling somehow wrong, a sense the trained detective learns to trust.", v:"partial", fb:"A hunch may prompt a second look, but it's the concrete inconsistency that proves it." },
          { t:"It cannot — a scene arranged with any care is impossible to see through.", v:"danger", fb:"Careful staging still leaves seams; assuming otherwise lets the guilty walk." } ] }
      ] },
    // cell: The Analyst @ The Conservatory
    identification:{ sci:"Alphonse Bertillon (1853-1914)", topic:"Identification & forensic photography", lede:"The clerk who first gave police a scientific way to name a suspect — and whose overreach helped convict an innocent man.", no:18,
      profile:`Alphonse Bertillon (1853-1914) was a French police clerk who, in the 1880s, invented the first systematic method of criminal identification: anthropometry, or "Bertillonage," a set of precise body measurements — head length, arm span, foot size and more — recorded on cards so a repeat offender could be matched despite a false name. He also standardised the police "mug shot," pairing full-face and profile photographs, and pioneered rigorous metric photography of crime scenes.\n\nFor a time Bertillonage was the world standard, and its disciplined measurement genuinely advanced policing. But it was fragile: measurements varied between operators, and the system famously failed when two unrelated prisoners, Will and William West, were found to share nearly identical measurements — helping fingerprinting, which Bertillon resisted, to supplant it.\n\nBertillon's darker legacy is a warning at the heart of this case. In the Dreyfus affair, he testified as a self-styled handwriting expert, spinning an elaborate, pseudo-scientific theory to claim that Alfred Dreyfus had forged an incriminating document. He was wrong; his "expertise" lay entirely outside his competence, and it helped send an innocent officer to Devil's Island. The scandal is a textbook case of forensic overreach — confident, technical-sounding testimony masking baseless conclusions.\n\nFor the Ashford inquest, Bertillon is both tool and caution. His better legacy — careful measurement, systematic photography, honest identification — is the patient work that serves truth. His worse one is the exact danger you must reject: the impressive expert who ventures beyond the evidence and, with borrowed authority, convicts the wrong person. When a "match" is delivered with theatrical certainty, remember Dreyfus.`,
      frame:`"Bertillon gave us the mug shot and the measured card — honest work," the Analyst says. "He also talked a jury into an innocent man's ruin, playing expert where he had none. Tell his best work from his worst:"`,
      q:[
        { q:"What identification method did Bertillon invent?", o:[
          { t:"Anthropometry — matching a person by a set of precise body measurements.", v:"expert", fb:"Correct — the measured-card system that first let police name repeat offenders." },
          { t:"Fingerprinting — matching a person by the ridge patterns on the fingers.", v:"partial", fb:"Prints supplanted his method; he actually resisted them for years." },
          { t:"Blood typing — matching a person by the group of a stain they left.", v:"wrong", fb:"That's serology, decades later; his method was body measurement." },
          { t:"A foolproof system that could never confuse one individual for another.", v:"danger", fb:"It was not foolproof — the West case exposed exactly that confusion." } ] },
        { q:"Why did Bertillonage eventually give way to fingerprinting?", o:[
          { t:"Measurements varied by operator, and two men shared nearly identical ones.", v:"expert", fb:"Right — the West case laid bare its fragility, and prints proved more reliable." },
          { t:"It was found that body measurements change constantly through adult life.", v:"wrong", fb:"Adult skeletons are fairly stable; the flaw was operator error and coincidence." },
          { t:"It was simply too slow to carry out on large numbers of prisoners.", v:"partial", fb:"Speed was a factor, but the decisive blow was its demonstrated unreliability." },
          { t:"It never failed, but fingerprints were merely cheaper to record and file.", v:"danger", fb:"It did fail — visibly — which is precisely why prints replaced it." } ] },
        { q:"What is the cautionary lesson of Bertillon's role in the Dreyfus affair?", o:[
          { t:"An expert who ventures beyond his competence can convict an innocent man.", v:"expert", fb:"Exactly — borrowed authority and pseudo-science are the overclaim to fear." },
          { t:"A confident expert should be trusted even outside his field of training.", v:"danger", fb:"That misplaced trust is what sent Dreyfus to Devil's Island." },
          { t:"Handwriting analysis is the single most reliable of the forensic sciences.", v:"wrong", fb:"His handwriting theory was baseless — the case is a warning, not an endorsement." },
          { t:"Identification evidence should never be presented to a jury in any form.", v:"partial", fb:"Honest identification has value; the lesson is against overreach, not all of it." } ] }
      ] }
  },
  STORIES:{
    constable:{
      study:`Pike stands guard at the study door, notebook in hand. "I found him right there, locked in, peaceful as you please — and that's exactly what bothers me. Too neat by half for a killing."`,
      dispensary:`Pike runs a thumb along the dispensary shelves. "The doctor kept his powders here, all in a row. Funny thing — the log's the one book with a page that's been got at."`,
      conservatory:`Pike meets you among the potted ferns, glad of the air. "Quiet spot to think. I keep coming back to it — a room locked from inside, and everyone so sure it was the young master."`
    },
    pathologist:{
      study:`Okafor examines the chair where the body sat, unhurried. "No wound, no struggle, and the colour all wrong for a simple heart. I don't sign a cause until the body has finished its story."`,
      dispensary:`Okafor studies the dispensary's measuring glasses. "Whatever stopped that heart was prepared with care. Bring me the residue in these, and the chemistry will name it for us."`,
      conservatory:`Okafor turns a leaf over thoughtfully in the conservatory. "Some of these plants are physic and some are poison, and the line is thinner than people think — as thin as grief and a cover story."`
    },
    chemist:{
      study:`The Analyst swabs the rim of a glass by the desk. "Everything in this room is a sample to me. What matters isn't how it looks — it's what the assay says when I run it."`,
      dispensary:`The Analyst holds a vial from the dispensary up to the light. "This is where the answer lives, if it lives anywhere. A poison prepared here left a signature; I need only the right test."`,
      conservatory:`The Analyst frowns at the conservatory's flowering shrubs. "Pretty, and half of them lethal. But I don't guess from petals — give me the extract and I'll tell you precisely what killed him."`
    }
  },
  story:[
    `<b>Ashford House</b> stands grey above the moor, and its master, <b>Sir Edmund Ashford</b>, lies dead in his study — the door locked from within, the fire burned to ash, no wound upon him. The family physician was quick to call it a failing heart; the newspapers, quicker still, cry murder. You are <b>Examiner Ruth Calloway</b>, sent by the coroner to hold an inquest and decide, from evidence and not rumour, what truly killed him.`,
    `<b>Three at the house will help you</b>, each in their own key. <b>Constable Pike</b>, first through the door, who cannot shake the feeling the scene is too tidy for a killing. <b>Dr. Okafor</b>, the police pathologist, who reads the body — its cooling, its colour, its contents — and refuses to be hurried to a verdict. And <b>the Analyst</b>, a toxicology chemist for whom every object is a sample and every poison a signature awaiting the right test. None is the culprit; each holds a fragment of the truth.`,
    `<b>Three names sit in your notepad.</b> <b>Julian Ashford</b>, the heir with debts and everything to gain; <b>Dr. Merrick</b>, the trusted family physician; and <b>Agnes</b>, the long-serving housekeeper. Each column of the case — <b>who</b> is behind it, <b>where</b> it culminates, and <b>what</b> truly happened — hides a tempting wrong answer. The sensational story pins a <b>violent murder on the heir</b>, propped up by a forensic "match" sworn to with theatrical certainty. The comfortable story calls it <b>natural causes</b> and closes the book. The truth is quieter and graver than either — and it will take patient science, not theatre, to prove it.`,
    `You have <b>eight days</b> and a single accusation to make. Name it right, and careful science convicts the guilty and clears the innocent. Name it wrong, and either a fantasy hangs an innocent man, or a murderer walks free behind a physician's signature.`
  ],
  endings:{ overclaimWhat:"murderpin", dismissalWhat:"natural",
    win:{
      expertTitle:"What the Evidence Supports, and No More",
      expert:[
        `Calloway names it exactly: Dr. Merrick, the trusted physician, who prepared and administered a fatal dose; the crime culminating in the House Dispensary, where the preparation was measured out and the log doctored to hide it; a concealed poisoning dressed as a natural death — proved by toxicology and an altered record, not by any theatrical "match."`,
        `Every card accounted for. She refused the tabloid murder and the lazy heart attack alike, worked the body, the chemistry, and the doctored page, and claimed only what she could demonstrate in court. The heir walks free; the physician's own signature becomes the thing that convicts him.`
      ],
      soundTitle:"Right — but Lightly Proven",
      sound:[
        `Calloway names the right three — Dr. Merrick, the Dispensary, a poisoning masked as natural death. The shape is correct, and her refusal of both the flashy match and the easy certificate is exactly right.`,
        `But she left too many clues ungathered; the coroner's court will have to firm up the toxicology and the chain of custody before it can act. Close and honest — a few more days at the bench would have made it unanswerable.`
      ],
      namedTitle:"The Right Answer, Unearned",
      named:[
        `Calloway names the truth — Merrick, the Dispensary, a concealed poisoning — but gathered too few clues to back it. Set beside a physician's confident certificate, it reads like a hunch.`,
        `An inquest cannot rest a poisoning charge on so thin a foundation, however correct. Being right is not the same as being able to prove it.`
      ]
    },
    overclaim:{ title:"The Examiner Who Cried Murder",
      body:[
        `Calloway endorses the sensational case: a violent murder by the heir, Julian Ashford, sworn to on a hair "match" delivered with courtroom certainty.`,
        `But no wound, no struggle, no spatter, and no weapon ever supported it — and a microscopic hair comparison names a category, not a culprit, especially when everyone already "knew" the answer. The overclaim collapses under the first honest question, and worse, it discredits the real, provable finding: a poisoning that the theatrics buried beneath a fantasy of blood.`
      ] },
    dismissal:{ title:"The Comfortable Certificate",
      body:[
        `Calloway accepts the physician's word — a failing heart, natural causes — and closes the inquest. It is the easy answer, and it is wrong.`,
        `A proper autopsy found no natural disease to explain the death, and the dispensary log had been altered where a fatal dose was measured out. She mistook the disguise for the diagnosis, signed exactly where the poisoner needed her to sign, and let a murderer keep his good name.`
      ] },
    wrongNames:{ title:"So Close",
      body:[
        `Calloway has the nature of it cold — a concealed poisoning dressed as a natural death, proved by toxicology and a doctored record, and neither a butchering by the heir nor an honest heart attack. But she has fixed on the wrong hand and the wrong room.`
      ] } },
}};
