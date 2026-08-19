// STARTER — fill every "" and [] with authored prose per SPEC.md. Structure is fixed; do not change ids.
module.exports = { PACK: {
  id:"c_script", title:"The Karnos Tablets", discipline:"Linguistics & Decipherment",
  teaser:"A forgotten script gave up its secret: a lost royal epic, one scholar swore. An unbreakable code? A hoax reading? Or a grid that tells a duller truth?", overclaimTag:"a lost royal epic", truthTag:"a fabricated decipherment",
  venue:"the Karnos tablets inquiry", agent:{name:"Investigator Yara Sol", role:"Investigator's Notepad"},
  standingLabel:"Commission credibility", readingShort:"Decipherers", readingLabel:"Decipherers & Linguists",
  dossierName:"DECIPHERERS & LINGUISTS", enterLabel:"Open the inquiry", subt:"A deduction game inside the Karnos tablets inquiry", DAYS_TOTAL:8,
  boardNarr:"You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  placeNarr:"You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  overclaimTease:"A magnificent translation deserves less awe, not more, until the signs can repeat it without the translator’s help.",
  CATS:{
    who:{ title:"Who is behind it", truth:"sc_claimant", items:[
      {id:"sc_claimant", label:"Prof. Malden Croft — the sensational decipherer"},
      {id:"sc_rival", label:"Dr. Sena — a rival philologist"},
      {id:"sc_curator", label:"The museum curator"} ]},
    where:{ title:"Where it culminates", truth:"sc_study", items:[
      {id:"sc_gallery", label:"The Tablet Gallery & Find-Site"},
      {id:"sc_epigraphy", label:"The Epigraphy Lab"},
      {id:"sc_study", label:"The Decipherment Study"} ]},
    what:{ title:"What is happening", truth:"sc_fabreading", items:[
      {id:"sc_epic", label:"A lost royal epic naming a forgotten king"},
      {id:"sc_undecipherable", label:"An unreadable script — meaningless marks"},
      {id:"sc_fabreading", label:"A fabricated decipherment; the grid reads a plain ledger"} ]}
  },
  PLACES:{
    sc_gallery:{name:"The Tablet Gallery & Find-Site", xy:[140,90]},
    sc_epigraphy:{name:"The Epigraphy Lab", xy:[330,240]},
    sc_study:{name:"The Decipherment Study", xy:[520,90]}
  },
  EDGES:[["sc_gallery","sc_epigraphy"],["sc_epigraphy","sc_study"]],
  CHARACTERS:{
    sc_epigrapher:{ name:"Epigrapher Tuma", role:"Field epigrapher", face:"📷", badge:"T", legend:"the epigraphy lab", hint:"Makes the squeezes and photographs; the claimed signs are not on the tablets at all." },
    sc_registrar:{ name:"Registrar Ode", role:"Find-site registrar", face:"🗂", badge:"O", legend:"the gallery", hint:"Logs where each tablet came from; the 'epic' tablets share a suspiciously modern context." },
    sc_statistician:{ name:"Analyst Ven", role:"Computational linguist", face:"🔡", badge:"V", legend:"the study", hint:"Counts the sign frequencies; the grid points to an inventory, not a poem." }
  },
  TOPICMAP:{
    sc_gallery:{ sc_epigrapher:["sc_champollion","sc_young"], sc_registrar:["sc_grotefend","sc_rawlinson"], sc_statistician:["sc_hincks","sc_hrozny"] },
    sc_epigraphy:{ sc_epigrapher:["sc_ventris","sc_kober"], sc_registrar:["sc_chadwick","sc_knorozov"], sc_statistician:["sc_proskouriakoff","sc_thompson"] },
    sc_study:{ sc_epigrapher:["sc_saussure","sc_jones"], sc_registrar:["sc_rask","sc_grimm"], sc_statistician:["sc_gelb","sc_friedman"] }
  },
  TOPICS:{
    // cell: Epigrapher Tuma @ The Tablet Gallery & Find-Site
    sc_champollion:{ sci:"Jean-François Champollion (1790–1832)", topic:"The decipherment of hieroglyphs", lede:"A childhood obsession with Egypt became a multilingual assault on signs that scholars had mistaken for pictures alone.", no:1, profile:"Jean-François Champollion grew up in revolutionary France fascinated by ancient Egypt and unusually gifted in languages. He studied Coptic—the late form of the Egyptian language written mainly with Greek letters—because he believed it preserved the speech behind the monuments. That preparation mattered more than any sudden flash of inspiration. The Rosetta Stone supplied one decree in Greek, demotic, and hieroglyphic scripts, but a parallel text is useful only when a reader can test how names, grammar, and sounds move between versions.\n\nThomas Young had already identified phonetic values in the royal name Ptolemy. Champollion expanded the approach by comparing cartouches, including Ptolemy and Cleopatra, across inscriptions. In 1822 his Lettre à M. Dacier announced a phonetic system. He realized hieroglyphic writing was mixed: signs could represent sounds, whole words, or meaning-classifiers now called determinatives. Phonetic spelling was not limited to foreign names; it operated within Egyptian words themselves.\n\nChampollion’s command of Coptic let him connect reconstructed sounds with known Egyptian vocabulary. He then tested readings across many texts rather than extracting one attractive sentence. His 1824 Précis du système hiéroglyphique developed the system further, and his later expedition to Egypt copied inscriptions in their archaeological settings. Decipherment became a cumulative grammar, not a private translation performance.\n\nThe Karnos claim must meet the same burden. A royal name that appears once can be guessed into almost anything; a real reading assigns values consistently across tablets, sign positions, and repeated formulas. Tuma’s photographs ask whether Croft’s claimed signs exist at all, while Ven’s grid asks whether the values predict ordinary entries beyond the celebrated passage. Champollion’s achievement rejects both theatrical certainty and the lazy verdict that unfamiliar marks are meaningless.",
      frame:"Tuma angles a raking light across the tablet. “Champollion did not read a king because he wanted one. He made the same signs work again and again. Show me what turns recognition into decipherment.”", q:[
        { q:"What was Champollion’s crucial linguistic preparation?",
          o:[
            { t:"He learned Coptic as a surviving descendant of ancient Egyptian.", v:"expert", fb:"Coptic supplied vocabulary and grammar that could test reconstructed hieroglyphic readings." },
            { t:"He memorized every royal portrait carved on surviving temple walls.", v:"wrong", fb:"Portrait recognition could not supply the language encoded by the signs." },
            { t:"He assumed the Greek text translated each hieroglyph in the same order.", v:"danger", fb:"Translations do not align sign by sign, so that shortcut would mislead." },
            { t:"He treated every enclosed cartouche as a complete historical sentence.", v:"wrong", fb:"Cartouches usually marked royal names, not entire narratives." }
          ] },
        { q:"What did Champollion discover about hieroglyphic writing?",
          o:[
            { t:"It mixed phonetic signs, word signs, and semantic classifiers.", v:"expert", fb:"Egyptian writing combined several sign functions within the same system." },
            { t:"It was a pure picture language with no connection to spoken sounds.", v:"danger", fb:"The phonetic component was essential to the successful decipherment." },
            { t:"It used one alphabetic sign for every consonant and written vowel.", v:"partial", fb:"Some signs represented single consonants, but the system was not a simple alphabet." },
            { t:"It encoded only foreign rulers phonetically and Egyptian words visually.", v:"wrong", fb:"Champollion showed phonetic spelling also operated in native Egyptian words." }
          ] },
        { q:"What would most strongly support a Karnos sign value?",
          o:[
            { t:"It predicts sensible readings in several unrelated tablet contexts.", v:"expert", fb:"Consistent success beyond the initial passage distinguishes a system from a guess." },
            { t:"It produces one dramatic royal title after several signs are ignored.", v:"danger", fb:"Selective success cannot validate values that fail elsewhere." },
            { t:"It resembles a familiar letter when the tablet is viewed upside down.", v:"wrong", fb:"Visual resemblance alone does not establish linguistic value." },
            { t:"It appears in a museum caption written after Croft announced the epic.", v:"wrong", fb:"A dependent caption adds no independent evidence." }
          ] }
      ] },
    // cell: Epigrapher Tuma @ The Tablet Gallery & Find-Site
    sc_young:{ sci:"Thomas Young (1773–1829)", topic:"The Rosetta Stone & phonetic values", lede:"The physicist who explained interference in light also found sound values hidden inside an Egyptian king’s oval frame.", no:2, profile:"Thomas Young ranged across physics, medicine, physiology, and languages. His name is attached to the double-slit demonstration of light interference and to Young’s modulus in elasticity. While working for the Encyclopaedia Britannica, he also studied the Rosetta Stone. The same appetite for patterns that served him in optics helped him compare repeated groups across the stone’s Greek, demotic, and hieroglyphic texts.\n\nYoung recognized that the oval cartouche in the hieroglyphic inscription probably contained the royal name Ptolemy, prominent in the Greek decree. By comparing signs and positions, he assigned several phonetic values. He also clarified relationships between demotic and hieroglyphic writing and identified signs used in the names of foreign rulers. His results were incomplete, and he continued to think phonetic writing was used more narrowly than Champollion later demonstrated.\n\nPriority disputes between Young and Champollion became heated, but decipherment was not a single winner’s trick. Young’s identifications supplied footholds; Champollion’s Coptic expertise and broader comparisons turned them into a working system. The episode shows why a proposed value should be credited according to what it actually explains. Partial readings can be genuine progress without being a finished decipherment.\n\nAt Karnos, an isolated match between a sign cluster and a hoped-for royal name would be Young’s starting point, not Croft’s finish line. The cluster must recur where the proposed name or sounds make sense, and the rest of the script must obey compatible rules. Tuma can verify the marks; Ode can verify which tablets were found together; Ven can test the distribution. A plausible first key is neither proof of an epic nor grounds to call every mark unreadable.",
      frame:"Tuma lays a Rosetta facsimile beside Croft’s annotated photograph. “Young earned a foothold, not a blank check. Tell me how a royal name can begin an analysis without ending it.”", q:[
        { q:"How did Young identify phonetic values on the Rosetta Stone?",
          o:[
            { t:"He linked a cartouche to Ptolemy in the parallel Greek text.", v:"expert", fb:"The known royal name provided a constrained comparison for repeated signs." },
            { t:"He translated every picture directly from its visual appearance.", v:"danger", fb:"Hieroglyphs cannot be read as a sequence of literal pictures." },
            { t:"He found a complete Egyptian alphabet engraved below the decree.", v:"wrong", fb:"No ready-made alphabet accompanied the Rosetta inscription." },
            { t:"He matched the signs to Hebrew letters with similar shapes.", v:"wrong", fb:"Shape resemblance to another script was not the basis of his values." }
          ] },
        { q:"Why was Young’s decipherment incomplete?",
          o:[
            { t:"He restricted phonetic use more narrowly than the evidence required.", v:"expert", fb:"Champollion later showed phonetic principles working broadly in Egyptian vocabulary." },
            { t:"He refused to compare the hieroglyphic and Greek versions at all.", v:"wrong", fb:"That comparison was central to his progress." },
            { t:"He believed cartouches never contained names of historical rulers.", v:"wrong", fb:"He used the Ptolemy cartouche precisely as a royal name." },
            { t:"He proved the script alphabetic and therefore stopped testing syllables.", v:"partial", fb:"The larger issue was his limited model of where phonetic writing operated." }
          ] },
        { q:"What is the proper status of a convincing first sign match?",
          o:[
            { t:"A promising hypothesis that must predict additional readings.", v:"expert", fb:"A foothold becomes decipherment only through repeated, independent tests." },
            { t:"Final proof that the surrounding text has the desired literary genre.", v:"danger", fb:"One name cannot establish that the document is an epic." },
            { t:"Evidence that all unmatched signs are decorative rather than linguistic.", v:"wrong", fb:"Unresolved signs remain part of the problem, not dispensable ornament." },
            { t:"A reason to replace archaeological context with linguistic intuition.", v:"wrong", fb:"Context and internal structure should constrain one another." }
          ] }
      ] },
    // cell: Registrar Ode @ The Tablet Gallery & Find-Site
    sc_grotefend:{ sci:"Georg F. Grotefend (1775–1853)", topic:"The first cuneiform readings", lede:"Without a bilingual key, he began with the formal boast of kings and guessed which dynasty could fit its pattern.", no:3, profile:"Georg Friedrich Grotefend was a German schoolteacher and classical scholar who tackled copies of short cuneiform inscriptions from Persepolis around 1800. The script was unknown, and he did not possess a Rosetta-style translation. Instead, he used the inscriptions’ setting and repeated structure. Palace texts were likely to name rulers, fathers, and titles in formulaic arrangements.\n\nGrotefend noticed recurring sign groups positioned like “king,” “son of,” and royal names. He reasoned that two inscriptions could represent successive Achaemenid rulers whose genealogies were known from Greek sources. By testing the sequence Darius, Xerxes, and Hystaspes against the patterns, he proposed values for several Old Persian signs. Some guesses were wrong, but enough were close to establish that disciplined inference could penetrate the script.\n\nHis work illustrates constrained hypothesis rather than free association. The proposed names had to differ and repeat in the right places; a ruler’s father might lack the title king; sign values inferred from one name had to remain stable in another. Later discoveries and longer inscriptions completed and corrected the decipherment. Grotefend never produced a full reading of Old Persian, yet his structural reasoning opened the route.\n\nRegistrar Ode faces a similar temptation at Karnos. Find-site and object type can suggest likely genres—dedication, ration list, inventory—but context cannot authorize any desired translation. A royal formula should recur with names and titles in patterned slots. If Croft changes values whenever the “epic” needs a new word, his method lacks Grotefend’s constraints. If Ven finds repeated commodity-and-number frames, that ordinary pattern deserves testing rather than dismissal as meaningless scratches.",
      frame:"Ode traces three repeated clusters on the catalogue photographs. “Grotefend used genealogy as a constraint, not a costume. Make the names fit the pattern without letting the pattern fit anything.”", q:[
        { q:"What gave Grotefend his initial leverage on Old Persian?",
          o:[
            { t:"Repeated royal formulas could be matched to known dynastic names.", v:"expert", fb:"Position, genealogy, and repetition constrained the possible identifications." },
            { t:"A hidden Greek translation was discovered beneath each inscription.", v:"wrong", fb:"He worked without a direct bilingual translation." },
            { t:"Every cuneiform sign visibly depicted the object it named.", v:"danger", fb:"The signs were not read through pictorial resemblance." },
            { t:"A complete sign list survived in a later Persian manuscript.", v:"wrong", fb:"No ancient key simply supplied the values." }
          ] },
        { q:"Why was the father’s title useful in his reasoning?",
          o:[
            { t:"A non-king father distinguished one royal genealogy from another.", v:"expert", fb:"Differences in titles helped test which known sequence fit the repeated formula." },
            { t:"The title determined whether the text should be read left to right.", v:"wrong", fb:"Genealogy constrained names, not writing direction by itself." },
            { t:"Every Persian ruler used a unique cuneiform sign for “father.”", v:"wrong", fb:"The formula relied on repeated signs rather than private royal symbols." },
            { t:"It allowed all uncertain signs to be treated as decorative fillers.", v:"danger", fb:"Uncertain signs still had to receive consistent values." }
          ] },
        { q:"Which Karnos inference best follows Grotefend’s method?",
          o:[
            { t:"Test repeated title-name slots against a historically plausible sequence.", v:"expert", fb:"A structural hypothesis should survive across several inscriptions." },
            { t:"Choose the most famous king and reshape every cluster around his name.", v:"danger", fb:"A favored identity must not override mismatching sign patterns." },
            { t:"Reject short inscriptions because only long narratives can be deciphered. too", v:"wrong", fb:"Short formulaic texts can provide strong constraints." },
            { t:"Assume every repeated cluster names the same royal person in the dynasty.", v:"partial", fb:"Repeated groups may be titles, commodities, or names; position helps decide." }
          ] }
      ] },
    // cell: Registrar Ode @ The Tablet Gallery & Find-Site
    sc_rawlinson:{ sci:"Henry Rawlinson (1810–1895)", topic:"The Behistun inscription & Old Persian", lede:"He copied a royal proclamation from a cliff and used its three languages to turn cuneiform into readable history.", no:4, profile:"Henry Creswicke Rawlinson was a British army officer and diplomat posted in Persia. Near the town of Behistun, a monumental inscription commissioned by Darius I was carved high on a cliff in three cuneiform languages: Old Persian, Elamite, and Babylonian. Rawlinson risked dangerous climbs and used local assistance to copy portions of the text during the 1830s and 1840s.\n\nOld Persian was the simplest of the three scripts and contained royal names and formulas already approached by Grotefend. Rawlinson expanded the sign values and translated much of that version. Because the three texts conveyed corresponding content, the Old Persian reading became a bridge into the more complex Elamite and Babylonian sections. Other scholars, including Edward Hincks, Jules Oppert, and William Henry Fox Talbot, contributed crucial independent work.\n\nIn 1857 the Royal Asiatic Society sent a new Assyrian inscription to four decipherers and compared their sealed translations. Their substantial agreement publicly demonstrated that cuneiform reading was not one man’s improvisation. Behistun is often called the Rosetta Stone of cuneiform, but the success depended on accurate copies, known history, cross-language alignment, and a community willing to test results independently.\n\nThe Karnos tablets offer no such royal trilingual monument, making Croft’s certainty especially suspect. A parallel document need not match word for word, but corresponding names, numbers, and formulas should line up systematically. Ode’s provenance records determine whether tablets truly belong to one archive; Tuma’s copies establish the signs; Ven’s independent grid tests whether another analyst reaches compatible values. Rawlinson’s story shows that difficult scripts can yield, but only through evidence that outruns the decipherer’s imagination.",
      frame:"Ode pins a photograph of Behistun above the find register. “A cliff, three languages, four independent translations—that is a chain. Croft gives us one desk and one triumphant reading.”", q:[
        { q:"Why was the Behistun inscription so valuable?",
          o:[
            { t:"It presented corresponding royal text in three cuneiform languages.", v:"expert", fb:"The multilingual versions allowed known readings to constrain harder ones." },
            { t:"It contained a carved dictionary defining every cuneiform sign. here", v:"wrong", fb:"Behistun was a proclamation, not an explicit sign list." },
            { t:"Its images revealed the spoken sound of each written symbol.", v:"wrong", fb:"Reliefs supplied context but could not pronounce the script." },
            { t:"It was the only cuneiform inscription ever found in Persia.", v:"wrong", fb:"Many inscriptions existed; Behistun was exceptional for its multilingual scale." }
          ] },
        { q:"What did the 1857 translation comparison demonstrate?",
          o:[
            { t:"Independent decipherers produced substantially compatible readings.", v:"expert", fb:"Agreement on a new text showed that cuneiform values were reproducible." },
            { t:"Rawlinson’s translation was accepted without anyone seeing the source.", v:"danger", fb:"Independent sealed versions were the strength of the demonstration." },
            { t:"All four scholars used identical notes supplied by one museum curator.", v:"wrong", fb:"The point was comparison among separately working experts." },
            { t:"Only royal names could be read; ordinary grammar remained unknown.", v:"wrong", fb:"The translations extended well beyond isolated names." }
          ] },
        { q:"What would be a Karnos equivalent of the sealed-translation test?",
          o:[
            { t:"Give an unseen tablet to analysts using the published sign system.", v:"expert", fb:"A real decipherment should permit independent reading of new material." },
            { t:"Ask Croft to explain the same famous tablet with greater confidence.", v:"danger", fb:"Repeated assertion by the claimant is not independent validation." },
            { t:"Display the tablet to visitors and count which translation they prefer.", v:"wrong", fb:"Popularity cannot test linguistic prediction." },
            { t:"Hide the provenance so analysts cannot be influenced by archaeology.", v:"partial", fb:"Blinding can help, but stripping all relevant context may remove legitimate constraints." }
          ] }
      ] },
    // cell: Analyst Ven @ The Tablet Gallery & Find-Site
    sc_hincks:{ sci:"Edward Hincks (1792–1866)", topic:"Akkadian cuneiform", lede:"An Irish clergyman realized cuneiform signs could carry several values, the apparent defect that made the system decipherable.", no:5, profile:"Edward Hincks was an Irish Anglican clergyman with formidable abilities in mathematics and ancient languages. Working largely away from major imperial collections, he became one of the central decipherers of Mesopotamian cuneiform. The script posed a harder problem than Old Persian because Babylonian and Assyrian texts used hundreds of signs with several functions.\n\nHincks recognized that the language now called Akkadian was Semitic, related in structure to Hebrew and Arabic, but written in a system inherited from Sumerian. A sign might represent a whole word, a syllable, or a determinative marking a semantic category. It could also have multiple readings. What looked like chaos was historical layering. Grammatical endings and recurring contexts helped decide which value applied.\n\nHe contributed to readings of names, numerals, syllabic values, and grammar, and he participated in the broader validation of cuneiform decipherment. His work sometimes competed with Rawlinson’s, yet their independent approaches strengthened the field. A system with polyvalent signs was not “unbreakable”; it required enough examples to infer how neighboring signs and language structure selected among alternatives.\n\nVen’s frequency tables should be read with that complexity in mind. A Karnos sign occurring in several positions need not have one English word as its eternal translation. It might encode a syllable, a commodity label, or a classifier. But flexibility is not permission for arbitrary readings. Croft must state rules that tell readers when each value applies. Hincks distinguishes genuine complexity from convenient shape-shifting: a difficult script has patterned alternatives, whereas a fabricated decipherment changes values only to rescue the desired story.",
      frame:"Ven highlights one Karnos sign in three columns. “Polyvalence is real; improvisation is not. Hincks made multiple values obey grammar. Croft makes them obey the headline.”", q:[
        { q:"Why was Akkadian cuneiform unusually difficult to decipher?",
          o:[
            { t:"Signs could represent words, syllables, determinatives, or several readings.", v:"expert", fb:"The inherited mixed system was systematic but highly polyvalent." },
            { t:"Every scribe invented a private script for each individual tablet. in context", v:"danger", fb:"Variation existed, but shared conventions made reading possible." },
            { t:"The language had no grammar and therefore no recurring structures.", v:"wrong", fb:"Akkadian has rich Semitic grammar that aided analysis." },
            { t:"The tablets contained only numbers without any linguistic signs. too", v:"wrong", fb:"Cuneiform recorded extensive linguistic texts as well as accounts." }
          ] },
        { q:"How did recognizing Akkadian as Semitic help?",
          o:[
            { t:"Known grammatical patterns constrained endings, roots, and word forms.", v:"expert", fb:"Language family structure narrowed plausible readings of ambiguous signs." },
            { t:"It proved Akkadian used the same alphabet as biblical Hebrew.", v:"wrong", fb:"The languages are related, but their writing systems differ greatly." },
            { t:"It allowed scholars to ignore the script’s Sumerian inheritance.", v:"danger", fb:"That inheritance explains many logograms and sign values." },
            { t:"It supplied a direct translation for every surviving tablet.", v:"wrong", fb:"Related languages provide constraints, not ready-made translations." }
          ] },
        { q:"When is assigning multiple values to one sign legitimate?",
          o:[
            { t:"When context and grammar predict which attested value applies.", v:"expert", fb:"Polyvalence must follow repeatable rules across texts." },
            { t:"Whenever a preferred translation needs a different word at that spot.", v:"danger", fb:"Ad hoc switching makes a reading unfalsifiable." },
            { t:"Only when the sign has been physically recut by a later scribe.", v:"wrong", fb:"One unchanged sign can conventionally carry several readings." },
            { t:"When no other tablet contains the sign in a comparable position.", v:"partial", fb:"A unique context weakens rather than strengthens the case for several values." }
          ] }
      ] },
    // cell: Analyst Ven @ The Tablet Gallery & Find-Site
    sc_hrozny:{ sci:"Bedřich Hrozný (1879–1952)", topic:"The decipherment of Hittite", lede:"A line about bread and water revealed that the language of Hittite tablets belonged to the Indo-European family.", no:6, profile:"Bedřich Hrozný was a Czech Assyriologist who studied tablets excavated at Hattusa, capital of the Hittite empire. The cuneiform signs were largely readable because scholars knew their Akkadian values, but the language they encoded remained unknown. During the First World War, Hrozný searched for recurring words and grammatical clues rather than treating the texts as an opaque code.\n\nHis famous breakthrough involved a sentence containing the Sumerian logogram NINDA, known to mean bread, followed by a form he read as ezzatteni. He compared that form with Indo-European words related to eating. Later in the line, watar resembled words for water, and ekutteni appeared connected with drinking. He translated the sense as “Now you will eat bread, and you will drink water.”\n\nFrom such comparisons and grammatical endings, Hrozný argued in 1915 that Hittite was Indo-European. Subsequent study confirmed the family relationship, though not every detail of his initial work survived unchanged. The case separates script decipherment from language identification: scholars could pronounce many cuneiform signs before they understood the Hittite language written with them.\n\nKarnos may present the reverse difficulty or a mixed one. Croft treats a few visually assigned values as if they guarantee an entire royal narrative. Hrozný needed lexical resemblance, grammar, and repeated endings to work together. Ven should ask whether proposed Karnos words participate in patterns—plural markers, case endings, fixed numerical frames—not merely whether one cluster can be made to sound like a king’s name. A plain administrative sentence can be a greater decipherment than a magnificent invented epic.",
      frame:"Ven writes NINDA beside a Karnos commodity sign. “Bread and water beat poetry because grammar held them together. Let’s test whether Croft’s words have any syntax behind them.”", q:[
        { q:"What was known before Hrozný identified the Hittite language?",
          o:[
            { t:"Many cuneiform sign values were readable, but the language was not.", v:"expert", fb:"Script values and language understanding are separate stages of decipherment." },
            { t:"The language was fluent, but nobody could recognize cuneiform signs.", v:"wrong", fb:"The situation was largely the reverse." },
            { t:"A Greek translation supplied the meaning of every Hittite tablet.", v:"wrong", fb:"No complete bilingual key solved the corpus." },
            { t:"Only royal portraits were understood; written sounds remained unknown.", v:"partial", fb:"Some names helped, but many sign values came from cuneiform scholarship." }
          ] },
        { q:"Why was the bread-and-water sentence persuasive?",
          o:[
            { t:"Related words and grammatical endings formed a coherent Indo-European reading.", v:"expert", fb:"Several linked features supported the language-family identification." },
            { t:"Bread and water were the only two objects pictured together on the tablet surface.", v:"wrong", fb:"The reasoning used written forms, not accompanying illustrations." },
            { t:"Any word resembling a modern language proves direct historical identity.", v:"danger", fb:"Chance resemblance alone is weak without systematic sound and grammar evidence." },
            { t:"The sentence named a known king in exactly the expected position there.", v:"wrong", fb:"Its importance came from ordinary vocabulary and morphology." }
          ] },
        { q:"What should Ven seek beyond a proposed Karnos word?",
          o:[
            { t:"Recurring grammatical patterns that constrain neighboring sign sequences.", v:"expert", fb:"A language reading should predict structured forms across the corpus." },
            { t:"A translation dramatic enough to explain why the tablets were buried.", v:"danger", fb:"Narrative appeal does not provide linguistic structure." },
            { t:"A modern word with roughly similar sound in any language whatsoever.", v:"wrong", fb:"Uncontrolled resemblance produces endless false matches." },
            { t:"Permission to alter a sign value whenever the sentence sounds awkward. too", v:"wrong", fb:"Consistent values and stated rules are necessary for testing." }
          ] }
      ] },
    // cell: Epigrapher Tuma @ The Epigraphy Lab
    sc_ventris:{ sci:"Michael Ventris (1922–1956)", topic:"The decipherment of Linear B", lede:"An architect treated Linear B like a design problem, then discovered that its palace records encoded an early form of Greek.", no:7, profile:"Michael Ventris encountered the undeciphered Linear B script as a schoolboy during a British Museum lecture by Arthur Evans. He later trained as an architect and served in the Royal Air Force during the Second World War. Architecture’s habits of grids, constraints, and iterative models suited his private campaign to solve the Bronze Age tablets from Crete and mainland Greece.\n\nVentris circulated work notes to other scholars, listing hypotheses and failures rather than guarding a single revelation. He initially suspected the language was Etruscan, then abandoned that idea as patterns accumulated. Alice Kober’s analysis had identified inflectional relationships and organized signs in grids. New tablets from Pylos, published by Emmett Bennett, provided place-name patterns that Ventris tested against Cretan geography and sign alternations.\n\nIn 1952 Ventris announced in a BBC broadcast that Linear B appeared to write an archaic form of Greek. Classicist John Chadwick joined him to test vocabulary and grammar. The result was surprising because Evans had assumed the script represented a non-Greek Minoan language. Yet readings continued to work across administrative tablets, including records of people, livestock, land, and offerings. The corpus, not the romance of the answer, carried the decipherment.\n\nThe Karnos “epic” should face Ventris’s standard of productive revision. A serious analyst records failed hypotheses, shares sign tables, and applies the system to unseen documents. Croft instead presents a finished triumph with no trail of discarded models. Ven’s grid may yield repetitive accounting language rather than literature; that would be historically ordinary and linguistically stronger. The question is not whether the solution is exciting, but whether it keeps generating constrained readings after the first tablet.",
      frame:"Tuma unfolds Ventris’s numbered work notes beside Croft’s polished monograph. “A real solution leaves a trail of wrong turns. This one arrived without footprints.”", q:[
        { q:"What language did Ventris conclude Linear B encoded?",
          o:[
            { t:"An early Mycenaean form of the Greek language in palace records.", v:"expert", fb:"Greek vocabulary and inflection repeatedly fit the Linear B sign patterns." },
            { t:"A secret alphabetic code made by classical Athenian scribes. here", v:"wrong", fb:"Linear B is a Bronze Age syllabic script, not a later Athenian cipher." },
            { t:"Etruscan, as Ventris had predicted from the beginning.", v:"wrong", fb:"He initially considered Etruscan but changed course with the evidence." },
            { t:"A language used only for palace religious ceremonies.", v:"danger", fb:"The tablets contain extensive practical administration." }
          ] },
        { q:"Which prior work was especially important to Ventris?",
          o:[
            { t:"Kober’s inflectional grids and Bennett’s organized sign corpus.", v:"expert", fb:"Their pattern analysis and improved data made stronger tests possible." },
            { t:"A complete Greek translation secretly supplied by Arthur Evans.", v:"wrong", fb:"Evans did not solve Linear B and doubted a Greek reading." },
            { t:"A phonograph recording of Bronze Age Cretan pronunciation.", v:"wrong", fb:"No ancient audio evidence existed." },
            { t:"A royal epic whose meter fixed every uncertain syllable.", v:"danger", fb:"The key corpus consisted largely of administrative documents." }
          ] },
        { q:"What made the Greek reading convincing?",
          o:[
            { t:"It kept producing vocabulary and grammar across many tablets.", v:"expert", fb:"Broad predictive success outweighed the surprise of the result." },
            { t:"Ventris was an architect and therefore unbiased by linguistics.", v:"partial", fb:"His background aided pattern work, but evidence—not outsider status—validated it." },
            { t:"The BBC announcement alone made the solution publicly famous.", v:"wrong", fb:"Publicity did not establish the sign values." },
            { t:"The translation revealed a more dramatic story than scholars expected.", v:"danger", fb:"The records were often mundane, and that regularity strengthened the reading." }
          ] }
      ] },
    // cell: Epigrapher Tuma @ The Epigraphy Lab
    sc_kober:{ sci:"Alice Kober (1906–1950)", topic:"The grids that prepared Linear B", lede:"She cut more than a hundred thousand paper slips and built the grammatical grid that made Linear B vulnerable.", no:8, profile:"Alice Kober was a classicist at Brooklyn College who devoted years to Linear B while carrying a heavy teaching load. Without electronic databases, she copied sign groups onto hand-cut cards and filed them in boxes made from reused materials. The archive eventually contained an enormous number of slips, allowing her to sort occurrences by endings, neighboring signs, and tablet context.\n\nKober refused to guess the underlying language too early. She identified sets of words that shared stems but changed their final signs, which she called triplets. Those alternations suggested an inflected language in which grammatical endings varied by case, number, or another category. By arranging recurring signs into a grid, she inferred relationships among syllabic values without yet naming the sounds.\n\nHer restraint was a scientific strength. Many would-be decipherers found whatever language they hoped to find by assigning flexible values to isolated signs. Kober demanded internal structure first. Ill health and overwork cut her life short in 1950, before the decipherment was announced. Ventris drew directly on the patterns she had established, and later scholarship has restored her central place in the story.\n\nAnalyst Ven’s Karnos grid follows Kober’s logic. A ledger should display recurring frames: item signs, personal or place names, quantities, totals, and perhaps endings that vary predictably. An epic claim should also leave linguistic structure, not just evocative translations. Croft’s reading becomes weaker when sign values change to preserve a royal sentence; the plain grid becomes stronger when it predicts untouched rows. Kober teaches that one can learn what a script is doing before knowing exactly what every sign sounds like.",
      frame:"Tuma opens a drawer of Kober-style index cards. “No prophecy, no king, no flash of genius—just endings sorted until the script could not hide its grammar.”", q:[
        { q:"What were Kober’s “triplets”?",
          o:[
            { t:"Related sign groups sharing a stem but showing patterned endings.", v:"expert", fb:"The alternations revealed inflection before the language was identified." },
            { t:"Three competing translations selected by museum visitors.", v:"wrong", fb:"They were internal word patterns, not public votes." },
            { t:"Sets of three tablets found in the same archaeological trench.", v:"wrong", fb:"Find context mattered, but triplets referred to sign sequences." },
            { t:"Royal names written once in each of three ancient languages.", v:"danger", fb:"Linear B lacked a trilingual royal key." }
          ] },
        { q:"Why did Kober delay guessing the language?",
          o:[
            { t:"Premature identification could bend sign values toward a favorite answer.", v:"expert", fb:"She built structural constraints before attaching specific sounds and words." },
            { t:"She believed scripts can be decoded without representing any language.", v:"wrong", fb:"Her grids sought the grammatical language beneath the signs." },
            { t:"She had no access to reliable published copies of the Linear B tablets anywhere.", v:"wrong", fb:"Her extensive card files were built from published inscriptions." },
            { t:"She expected a dramatic epic to reveal the language automatically to readers.", v:"danger", fb:"The administrative corpus required patient pattern analysis." }
          ] },
        { q:"What can a grid reveal before full translation?",
          o:[
            { t:"Sign relationships, recurring endings, and likely grammatical classes.", v:"expert", fb:"Distributional structure narrows the values a decipherment can assign." },
            { t:"The personal motives of the ancient scribe who wrote each tablet.", v:"wrong", fb:"Sign distributions do not expose individual psychology." },
            { t:"A complete royal chronology with no external historical evidence.", v:"danger", fb:"A grid constrains forms but cannot conjure unsupported history." },
            { t:"Which modern language readers will find most aesthetically pleasing.", v:"wrong", fb:"Preference has no role in structural analysis." }
          ] }
      ] },
    // cell: Registrar Ode @ The Epigraphy Lab
    sc_chadwick:{ sci:"John Chadwick (1920–1998)", topic:"Documents in Mycenaean Greek", lede:"A wartime codebreaker supplied the Greek grammar that turned Ventris’s startling proposal into a durable decipherment.", no:9, profile:"John Chadwick was a British classical philologist who had worked on codebreaking during the Second World War. Soon after Michael Ventris announced that Linear B encoded Greek, Chadwick contacted him. Ventris could manipulate the sign system brilliantly; Chadwick brought deep knowledge of historical Greek vocabulary, morphology, and dialects. Their collaboration tested whether the proposed syllabic values produced a coherent ancient language.\n\nLinear B was an awkward vehicle for Greek. The script generally wrote open syllables and did not represent many final consonants or consonant clusters directly. Different Greek sounds could collapse into one written series. A superficial reading therefore looked strange. Chadwick showed that these distortions followed rules and that reconstructed words fit Mycenaean Greek forms. Administrative formulas, names, commodities, and grammatical endings reinforced one another.\n\nVentris and Chadwick published Documents in Mycenaean Greek in 1956. It presented the decipherment, selected tablets, vocabulary, and interpretation in a form other specialists could challenge. After Ventris died that year in a road accident, Chadwick continued defending and refining the reading. Acceptance came because the system handled new texts and difficult details, not because of the collaborators’ authority.\n\nRegistrar Ode should demand the same from Croft: a grammar, a sign list, explicit spelling rules, and translations that other scholars can reproduce. A decipherment may yield forms that look imperfect because scripts omit sounds, but those irregularities must be regular. If every awkward Karnos sequence receives a different rescue rule, there is no language model. Chadwick’s contribution turns “it sounds like a word” into a disciplined account of how writing maps onto speech.",
      frame:"Ode marks every place where Croft silently inserts a vowel. “Chadwick could explain why Linear B distorted Greek. A missing sound needs a rule, not an author’s convenience.”", q:[
        { q:"What did Chadwick add to the Linear B decipherment?",
          o:[
            { t:"Expert knowledge of Greek grammar, vocabulary, and historical forms.", v:"expert", fb:"His philology tested whether Ventris’s sign values produced a real language." },
            { t:"The first photographs proving that Linear B tablets physically existed.", v:"wrong", fb:"The tablets had long been known and published." },
            { t:"A claim that the script represented perfectly spelled classical Greek.", v:"wrong", fb:"Linear B encoded much earlier Greek through an imperfect syllabary." },
            { t:"A royal legend that fixed the meaning of every administrative term.", v:"danger", fb:"The decipherment grew from repetitive records, not one literary key." }
          ] },
        { q:"Why can Linear B Greek look distorted?",
          o:[
            { t:"Its syllabary omitted or simplified clusters and many final consonants.", v:"expert", fb:"The script’s structure forced regular spelling conventions onto Greek words." },
            { t:"The scribes deliberately encrypted palace accounts from their rulers.", v:"wrong", fb:"The distortions reflect script fit, not secret cryptography." },
            { t:"Ventris changed sign values randomly whenever a word looked unfamiliar.", v:"danger", fb:"The reading succeeded because its spelling rules were consistent." },
            { t:"Greek had no consonants during the Mycenaean palace period at all.", v:"wrong", fb:"Greek consonants existed even when the script represented them imperfectly." }
          ] },
        { q:"What would make an inserted Karnos sound acceptable?",
          o:[
            { t:"A stated spelling rule predicts the same insertion in other words.", v:"expert", fb:"Systematic omissions can be reconstructed when the rule generalizes." },
            { t:"The extra sound makes the royal translation more dramatic.", v:"danger", fb:"Literary effect cannot justify an unwritten phonetic value." },
            { t:"Croft says ancient scribes were inconsistent whenever challenged.", v:"wrong", fb:"Unlimited inconsistency removes the possibility of testing." },
            { t:"No photograph clearly shows a sign where the sound should occur.", v:"partial", fb:"Absence might reflect script rules, but those rules need independent evidence." }
          ] }
      ] },
    // cell: Registrar Ode @ The Epigraphy Lab
    sc_knorozov:{ sci:"Yuri Knorozov (1922–1999)", topic:"The phonetic decipherment of Maya glyphs", lede:"Working from reproduced codices in the Soviet Union, he showed that Maya signs recorded sounds as well as ideas.", no:10, profile:"Yuri Knorozov was a Soviet linguist who studied the surviving Maya codices and colonial accounts without early access to the monuments of Mexico and Central America. A key source was the sixteenth-century Relación de las cosas de Yucatán by Diego de Landa. Landa had recorded what he thought was a Maya alphabet, but the signs did not behave like simple letters.\n\nKnorozov proposed that many entries represented syllables elicited through Spanish letter names. He treated Maya writing as logosyllabic: signs could represent whole words and syllables, with phonetic complements helping specify readings. He applied the rebus principle, by which a sign can be used for its sound rather than its pictured meaning. In 1952 he published an argument for phonetic decipherment grounded in sign combinations and language structure.\n\nCold War politics and scholarly resistance slowed acceptance, especially among influential Western Mayanists. Yet later work with inscriptions and spoken Mayan languages confirmed the phonetic approach. Knorozov’s achievement did not instantly translate every glyph. It supplied a productive mechanism that other epigraphers could test and extend.\n\nThe Karnos tablets require the same distinction between an imperfect historical clue and an unlimited key. A scribe’s sign list, if one existed, might reflect syllable names rather than alphabetic letters. But Croft cannot assign whatever sound produces his epic. Ven should test whether proposed phonetic values recur in compatible environments, while Ode checks whether the tablets belong to the same period and archive. Knorozov broke an apparent deadlock by respecting the script’s mixed structure, not by declaring every mark either a picture or nonsense.",
      frame:"Ode turns Landa’s “alphabet” sideways beside Croft’s one-sign-one-letter chart. “A bad description can preserve a good clue. Knorozov rescued the clue without obeying the mistake.”", q:[
        { q:"How did Knorozov reinterpret Landa’s “alphabet”?",
          o:[
            { t:"Many signs represented syllables elicited through Spanish letter names.", v:"expert", fb:"The mismatch made sense once the entries were treated as syllabic values." },
            { t:"Landa had copied a complete Roman alphabet used by Maya scribes.", v:"wrong", fb:"Maya writing was not a simple alphabetic transcription of Spanish." },
            { t:"Every sign named only the object that its picture resembled.", v:"danger", fb:"Phonetic and rebus uses were essential." },
            { t:"The list was worthless and played no role in later decipherment.", v:"wrong", fb:"Knorozov extracted valuable evidence from its flawed presentation." }
          ] },
        { q:"What does “logosyllabic” mean?",
          o:[
            { t:"A system combines whole-word signs with signs for spoken syllables.", v:"expert", fb:"Maya writing uses both logographic and phonetic resources." },
            { t:"A script writes only ideas and never represents speech sounds.", v:"wrong", fb:"That describes the misconception Knorozov helped overturn." },
            { t:"Each sign always equals one alphabetic consonant in every context.", v:"wrong", fb:"Syllabic and logographic values are more complex than a fixed alphabet." },
            { t:"Writers may assign any meaning to a sign without conventions.", v:"danger", fb:"Mixed systems remain governed by shared rules." }
          ] },
        { q:"What would validate a proposed phonetic Karnos value?",
          o:[
            { t:"The same sound explains recurring combinations across multiple words.", v:"expert", fb:"Repetition across contexts makes a phonetic assignment predictive." },
            { t:"It creates a recognizable royal name on the showcase tablet alone.", v:"danger", fb:"One desired name is vulnerable to selective fitting." },
            { t:"Its sign resembles the mouth position used to pronounce the sound.", v:"wrong", fb:"Visual resemblance to articulation is not a general decipherment method." },
            { t:"The value changes whenever the surrounding translation requires it.", v:"wrong", fb:"Unconstrained switching destroys reproducibility." }
          ] }
      ] },
    // cell: Analyst Ven @ The Epigraphy Lab
    sc_proskouriakoff:{ sci:"Tatiana Proskouriakoff (1909–1985)", topic:"Reading Maya historical inscriptions", lede:"She turned carved dates into biographies, proving Maya monuments recorded births, accessions, wars, and deaths.", no:11, profile:"Tatiana Proskouriakoff was born in Russia and trained as an architect in the United States. She entered Maya archaeology through reconstruction drawings that combined measured ruins with disciplined visual inference. At Piedras Negras in Guatemala, she studied dated stelae arranged in groups and noticed that their patterns fit the span of individual human lives.\n\nIn a landmark 1960 paper, Proskouriakoff argued that Maya inscriptions recorded historical events. Certain glyphs clustered near the beginning of a sequence at dates compatible with birth; others appeared roughly at accession; later monuments marked events and death. She did not yet read all the phonetic details. Instead, chronology, monument sequence, and repeated sign positions revealed a biographical structure.\n\nHer result overturned the influential view that Maya inscriptions concerned almost exclusively astronomy, ritual, and timeless calendrical cycles. It also opened a route for identifying rulers and dynasties as phonetic decipherment advanced. The achievement shows that text type and historical content can sometimes be inferred before every word is sounded out, provided patterns are tightly constrained.\n\nVen’s grid may likewise reveal Karnos document type before full translation. Repeated number columns, item signs, and totals would support an account or inventory; long sequences tied to royal life events would look different. Croft skips that structural diagnosis and begins with a literary conclusion. Proskouriakoff offers a middle course between “we can read the epic” and “the marks mean nothing”: use dates, recurrence, and document layout to identify what kind of record the signs most plausibly organize. Her architectural training made arrangements on stone and paper legible as sequences rather than decoration.",
      frame:"Ven maps Karnos sign clusters against tablet rows. “Proskouriakoff found history before she could pronounce every glyph. Genre leaves a measurable skeleton.”", q:[
        { q:"What pattern did Proskouriakoff find at Piedras Negras?",
          o:[
            { t:"Dated monument sequences fit births, accessions, events, and deaths.", v:"expert", fb:"Chronology revealed biographies of rulers within the inscriptions." },
            { t:"Every stela repeated one timeless astronomical table unchanged.", v:"wrong", fb:"The sequences varied in ways consistent with historical lives." },
            { t:"The glyphs formed an alphabet identical to modern Spanish.", v:"wrong", fb:"Her breakthrough was structural and historical, not an alphabet discovery." },
            { t:"Random dates could be rearranged to fit any desired royal biography.", v:"danger", fb:"The ordered monument groups imposed strong chronological constraints." }
          ] },
        { q:"Did she need to read every glyph phonetically first?",
          o:[
            { t:"No; chronology and repeated positions exposed historical structure.", v:"expert", fb:"Document patterns can identify functions before complete phonetic reading." },
            { t:"Yes; she translated every sentence before noticing the dates.", v:"wrong", fb:"Her argument preceded full phonetic decipherment." },
            { t:"No; pictures alone supplied exact names and spoken titles.", v:"partial", fb:"Images helped, but the decisive evidence was inscriptional sequence and dating." },
            { t:"Yes; genre can never be inferred from layout or repetition.", v:"wrong", fb:"Her work is a classic counterexample." }
          ] },
        { q:"Which Karnos pattern would most suggest a ledger?",
          o:[
            { t:"Repeated item signs beside quantities and recurring total positions.", v:"expert", fb:"Administrative texts often organize commodities and numbers in stable frames." },
            { t:"One long line that Croft translates as a heroic battle speech.", v:"danger", fb:"A solitary literary claim cannot outweigh corpus-wide structure." },
            { t:"A damaged edge that vaguely resembles a crowned human figure.", v:"wrong", fb:"Incidental shape resemblance does not establish document genre." },
            { t:"No repeated signs, numbers, columns, or positional regularities.", v:"wrong", fb:"The absence of structure would weaken a ledger interpretation." }
          ] }
      ] },
    // cell: Analyst Ven @ The Epigraphy Lab
    sc_thompson:{ sci:"J. Eric S. Thompson (1898–1975)", topic:"The authority who resisted Maya decipherment", lede:"His immense authority organized Maya studies—and helped delay the phonetic breakthrough that contradicted his preferred vision.", no:12, profile:"J. Eric S. Thompson was the dominant Mayanist of much of the twentieth century. He produced influential studies of the Maya calendar, codices, religion, and iconography, and his catalogue numbers for glyphs remain widely recognized. His erudition helped organize a difficult field and made him a formidable gatekeeper of interpretation.\n\nThompson emphasized calendrical and ritual meanings and resisted proposals that Maya glyphs extensively represented spoken language. He viewed many inscriptions as concerned with priests, gods, and cycles rather than dynastic history. He criticized Yuri Knorozov’s phonetic approach, sometimes through the ideological lens of the Cold War, and opposed historical readings that later evidence supported.\n\nThe problem was not that Thompson contributed nothing. His classifications and careful observations became tools used by later decipherers. The cautionary lesson concerns authority and model commitment. A scholar can accurately catalogue signs while holding an incorrect theory of what they do. When younger researchers found phonetic spellings and historical sequences, prestige initially made the contradiction harder to absorb.\n\nAt Karnos, the museum could repeat Thompson’s mistake in either direction. It might protect Croft’s epic because a celebrated specialist announced it, or reject Ven’s plain structural result because it lacks drama. Skepticism should target methods, not social rank. Tuma’s photographs can show that some claimed signs were drawn into Croft’s copies; that fact does not make every catalogue entry worthless. Good inquiry preserves useful documentation while discarding interpretations the evidence no longer supports. Catalogues should remain practical working tools, not monuments to the cataloguer’s final theory.",
      frame:"Ven sets Thompson’s sign catalogue beside a page where he rejected phonetic readings. “A person can classify the evidence superbly and still misunderstand its engine. Authority is not a package deal.”", q:[
        { q:"What did Thompson contribute despite resisting decipherment?",
          o:[
            { t:"Major calendrical studies and a durable catalogue of Maya glyphs.", v:"expert", fb:"His documentation remained useful even when his linguistic model failed." },
            { t:"The first complete phonetic reading of every Maya inscription.", v:"wrong", fb:"He resisted the broad phonetic approach that later succeeded." },
            { t:"Proof that Maya texts contained no dates or historical names.", v:"danger", fb:"Later work demonstrated extensive historical content." },
            { t:"A bilingual Maya-Greek inscription from a royal tomb.", v:"wrong", fb:"No such artifact underpinned Maya studies." }
          ] },
        { q:"Why did Thompson’s authority become an obstacle?",
          o:[
            { t:"His prestige amplified resistance to phonetic and historical evidence.", v:"expert", fb:"Gatekeeping can delay acceptance when a leading model is deeply entrenched." },
            { t:"He physically destroyed all codices that disagreed with his theory.", v:"wrong", fb:"The issue was interpretive influence, not destruction of every source." },
            { t:"He refused to catalogue signs until they had complete translations.", v:"wrong", fb:"His sign cataloguing was one of his important contributions." },
            { t:"His calendar calculations proved phonetic readings logically impossible.", v:"danger", fb:"Calendrical expertise did not exclude language encoding." }
          ] },
        { q:"How should investigators treat a partly mistaken authority?",
          o:[
            { t:"Retain sound observations while retesting the interpretive framework.", v:"expert", fb:"Evidence and classification can survive the theory once placed under new tests." },
            { t:"Accept every claim because correcting one expert would damage the field.", v:"danger", fb:"Reputation cannot immunize an interpretation." },
            { t:"Discard all records the scholar ever touched as contaminated.", v:"danger", fb:"Wholesale rejection wastes reliable work and confuses error with fraud." },
            { t:"Replace expert judgment with whichever translation attracts visitors.", v:"wrong", fb:"Popularity is not a methodological correction." }
          ] }
      ] },
    // cell: Epigrapher Tuma @ The Decipherment Study
    sc_saussure:{ sci:"Ferdinand de Saussure (1857–1913)", topic:"The linguistic sign & structure", lede:"He taught linguists to find meaning not inside isolated marks, but in the patterned differences that connect an entire system.", no:13, profile:"Ferdinand de Saussure was a Swiss linguist whose early work helped reconstruct Indo-European sound patterns. He became far more famous through the Course in General Linguistics, assembled by students from lectures and published after his death in 1916. The book redirected linguistics toward the structure of a language at a given time.\n\nSaussure described the linguistic sign as a relation between a signifier, such as a sound pattern, and a signified, the concept associated with it. The connection is largely arbitrary: there is nothing naturally tree-like about the English sound tree. Meaning arises through differences within a system. A word has value because it contrasts with neighboring words; a sound matters because replacing it can distinguish forms.\n\nHe also distinguished langue, the shared social system of conventions, from parole, individual acts of speaking. The distinction encouraged analysts to infer underlying rules from many utterances rather than treating each expression as self-contained. Writing is not identical to language, but a script likewise gains function through contrasts, distributions, and combinations among signs.\n\nCroft’s Karnos method treats signs as isolated emblems: crown equals king, wave equals sea, spear equals conquest. Saussure’s approach asks whether those values are supported by oppositions and recurring contexts across the corpus. A sign beside numerals may have value because it contrasts with other commodity labels, not because its shape resembles an object. Tuma must preserve the actual marks, and Ven must map their relations. The system decides more than the decipherer’s visual imagination. Individual marks become evidence only through the network of contrasts around them.",
      frame:"Tuma covers Croft’s picture-glosses and leaves only the sign sequences. “Saussure would begin with contrasts. What changes when one mark replaces another?”", q:[
        { q:"What are the signifier and signified?",
          o:[
            { t:"The perceptible form of a sign and the concept linked to it.", v:"expert", fb:"A linguistic sign joins a sound-image or form with a concept." },
            { t:"The writer of a text and the reader who later interprets it.", v:"wrong", fb:"Those are participants, not the two sides of Saussure’s sign." },
            { t:"A picture and the physical object it must naturally resemble.", v:"danger", fb:"Saussure emphasized that sign relations are largely conventional." },
            { t:"The first letter of a word and its final grammatical ending.", v:"wrong", fb:"The distinction does not refer to word position." }
          ] },
        { q:"What does it mean that signs have value through differences?",
          o:[
            { t:"Their functions depend on contrasts with other signs in the system.", v:"expert", fb:"Meaning is relational rather than stored in each form by itself." },
            { t:"Every sign must look visibly different from signs in all other scripts.", v:"wrong", fb:"The relevant contrasts operate within a language or sign system." },
            { t:"A sign can mean anything if its interpreter explains the choice.", v:"danger", fb:"Arbitrariness is social convention, not private freedom." },
            { t:"Only rare signs carry meaning because common signs lose distinctiveness.", v:"wrong", fb:"Common signs can be highly meaningful through structured contrasts." }
          ] },
        { q:"Which analysis is most Saussurean?",
          o:[
            { t:"Compare where signs occur and what substitutions change the pattern.", v:"expert", fb:"Distribution and opposition reveal systemic value." },
            { t:"Translate each sign from the object its outline resembles.", v:"danger", fb:"Pictorial intuition ignores conventional and relational structure." },
            { t:"Ask which proposed story best matches the museum exhibition theme.", v:"wrong", fb:"Curatorial preference cannot determine linguistic value." },
            { t:"Treat every tablet as a unique code with no shared conventions.", v:"wrong", fb:"A language depends on a communal system across individual uses." }
          ] }
      ] },
    // cell: Epigrapher Tuma @ The Decipherment Study
    sc_jones:{ sci:"William Jones (1746–1794)", topic:"Comparative philology & Indo-European", lede:"A judge in colonial India heard Sanskrit echoes of Greek and Latin and proposed a common ancestral source.", no:14, profile:"William Jones was a British judge and gifted linguist who helped found the Asiatic Society of Bengal. Studying Sanskrit in India, he was struck by systematic similarities with Greek and Latin. In a famous 1786 address, he argued that the three languages had sprung from a common source, perhaps no longer existing, and suggested connections with Gothic, Celtic, and Persian as well.\n\nJones did not invent the observation that languages resemble one another, nor did he construct the later full comparative method. His importance lies in stating a genealogical hypothesis based on grammar and core vocabulary, not superficial borrowing. Words for kinship, numbers, and basic actions showed patterned correspondences, while inflectional systems shared deeper architecture.\n\nComparative philology grew by replacing resemblance hunting with regularity. Related languages do not keep every sound unchanged; they transform them in recurring ways. Chance look-alikes and loanwords must be separated from inherited cognates. Scholars such as Rask, Grimm, and later Neogrammarians made those tests increasingly strict.\n\nA Karnos decipherer may be tempted to announce that one sign cluster “looks like” a royal name in a distant language. Jones’s legacy demands a larger comparison: multiple basic words, consistent sound correspondences, and compatible grammar. Archaeological contact can explain borrowing, while chronology constrains possible ancestry. A real relationship makes many predictions at once. One convenient resemblance can decorate a fabricated reading without supporting it. Comparison is strongest when the least glamorous words and inflections obey the same history as the famous names across the entire surviving corpus. Ordinary forms are decisive witnesses.",
      frame:"Tuma writes three proposed cognates in a column, then crosses out the one Croft altered twice. “Jones heard kinship in a system, not in a lucky syllable.”", q:[
        { q:"What did Jones propose about Sanskrit, Greek, and Latin?",
          o:[
            { t:"They descended from a common source no longer directly known.", v:"expert", fb:"His genealogical proposal helped launch Indo-European comparative study." },
            { t:"Sanskrit was invented by Greek settlers during the Roman period.", v:"wrong", fb:"He argued for shared ancestry, not recent invention." },
            { t:"All three were alternate scripts for one unchanged spoken language.", v:"wrong", fb:"They are distinct languages with historical relationships." },
            { t:"Any similar word proves direct borrowing from Sanskrit.", v:"danger", fb:"Systematic grammar and vocabulary, not isolated similarity, support kinship." }
          ] },
        { q:"Which evidence is strongest for language relationship?",
          o:[
            { t:"Many core words and grammatical forms show regular correspondences.", v:"expert", fb:"Broad patterned agreement is difficult to explain by chance or borrowing alone." },
            { t:"One royal title sounds similar after several consonants are removed.", v:"danger", fb:"A manipulated single match has almost no genealogical force." },
            { t:"Two scripts use signs with roughly comparable visual shapes.", v:"wrong", fb:"Script shape does not establish spoken-language ancestry." },
            { t:"A museum labels the cultures as members of one civilization.", v:"wrong", fb:"Curatorial grouping cannot replace linguistic comparison." }
          ] },
        { q:"Why are loanwords a complication?",
          o:[
            { t:"They create similarities through contact rather than common descent.", v:"expert", fb:"Borrowing must be separated from inherited cognates." },
            { t:"They cause every related language to lose its grammar completely.", v:"wrong", fb:"Languages borrow vocabulary without erasing all grammar." },
            { t:"They can occur only in royal epics and never in account texts.", v:"wrong", fb:"Borrowing appears across many genres and social settings." },
            { t:"They make historical comparison impossible under all circumstances.", v:"danger", fb:"Regular sound patterns and basic vocabulary still permit careful inference." }
          ] }
      ] },
    // cell: Registrar Ode @ The Decipherment Study
    sc_rask:{ sci:"Rasmus Rask (1787–1832)", topic:"Comparative grammar & sound laws", lede:"He made language kinship answer to recurring consonant correspondences rather than the seduction of words that merely looked alike.", no:15, profile:"Rasmus Rask was a Danish linguist who traveled widely and studied Icelandic, Germanic, Iranian, and other languages. In his 1818 investigation of the origin of Old Norse, he compared grammatical systems and basic vocabulary across language families. He insisted that relationship could not rest on a handful of similar words, which might be borrowed or coincidental.\n\nRask observed recurring consonant correspondences between Germanic languages and Greek, Latin, and Sanskrit. Where one language had a particular sound, another regularly showed a different one in cognate words. He did not formulate the later famous pattern in precisely Grimm’s terms, but he supplied much of the empirical foundation. He also recognized the special evidential weight of inflectional endings, which are less readily borrowed than fashionable vocabulary.\n\nHis method disciplined comparison. Proposed relatives should show numerous matches in basic terms, parallel grammatical structures, and sound changes that apply across examples. Exceptions require explanation, not silent deletion. A system can be incomplete and still scientific if it exposes its rules to new words.\n\nRegistrar Ode can use Rask’s standard to evaluate Croft’s claim that Karnos encodes an ancestral language. The alleged royal name has been compared with distant rulers, but the remaining vocabulary shows no regular sound mapping. Ven’s ledger interpretation may instead rely on internal repetition without claiming external kinship. Rask teaches that modest structure beats glamorous resemblance: a dependable pattern among ordinary forms is better evidence than one name engineered to cross millennia. His approach made correspondence tables into tests that any later scholar could extend or overturn.",
      frame:"Ode places Croft’s list of “similar” royal names beside a blank correspondence table. “Rask would ask what every consonant does, not applaud the closest-looking word.”", q:[
        { q:"What did Rask require beyond similar-looking words?",
          o:[
            { t:"Regular sound correspondences plus grammar and basic vocabulary.", v:"expert", fb:"Relationship must appear as a system across many forms." },
            { t:"A legend claiming both peoples descended from the same king.", v:"danger", fb:"Traditional stories cannot establish linguistic ancestry." },
            { t:"Identical alphabets maintained without change across centuries.", v:"wrong", fb:"Related languages may use different scripts and shifted sounds." },
            { t:"One long borrowed word shared by merchants in both regions.", v:"partial", fb:"Borrowing shows contact, not necessarily common descent." }
          ] },
        { q:"Why are grammatical endings valuable in comparison?",
          o:[
            { t:"They are structured and generally less easily borrowed than prestige words.", v:"expert", fb:"Inflectional systems can preserve deep genealogical evidence." },
            { t:"They remain unchanged across every stage of a language’s known history.", v:"wrong", fb:"Endings change, but their patterned correspondences remain informative." },
            { t:"They alone reveal the archaeological location of every written tablet.", v:"wrong", fb:"Grammar does not determine find provenance." },
            { t:"They can be ignored whenever a royal name seems fully convincing to scholars.", v:"danger", fb:"A name cannot outweigh contradictory systemic evidence." }
          ] },
        { q:"What would weaken Croft’s ancestry claim most?",
          o:[
            { t:"Proposed sound matches fail to recur in ordinary Karnos vocabulary.", v:"expert", fb:"A relationship that works only for one name is likely selective fitting." },
            { t:"Some tablets contain repetitive quantities rather than complete sentences.", v:"partial", fb:"Administrative genre does not by itself rule out a language relationship." },
            { t:"The script uses signs unlike the alphabet of the proposed relative.", v:"partial", fb:"Different scripts can write related languages." },
            { t:"The candidate language was spoken by a politically unimportant group.", v:"wrong", fb:"Political status has no bearing on linguistic descent." }
          ] }
      ] },
    // cell: Registrar Ode @ The Decipherment Study
    sc_grimm:{ sci:"Jacob Grimm (1785–1863)", topic:"Grimm's law of sound shifts", lede:"The storyteller and philologist found a lawlike chain behind Germanic consonants, turning exceptions into questions instead of excuses.", no:16, profile:"Jacob Grimm is famous with his brother Wilhelm for collecting folktales, but he was also a foundational scholar of Germanic languages. In the second edition of his Deutsche Grammatik, published in the 1820s, he set out systematic correspondences now called Grimm’s law. Earlier observations by Rask helped establish the pattern.\n\nThe law describes shifts from Proto-Indo-European consonants into Proto-Germanic. Voiceless stops such as p, t, and k became fricatives such as f, th, and h; voiced stops shifted toward voiceless stops; and voiced aspirated stops changed in another regular series. Thus Latin pater corresponds with English father, not because p randomly resembles f, but because the same relationship recurs across many cognates.\n\nGrimm’s formulation had apparent exceptions. Later, Karl Verner showed that many depended on the position of stress in the ancestral word, producing Verner’s law. That development is methodologically important: the response to exceptions was a new rule that predicted a class of cases, not arbitrary permission to alter sounds one by one.\n\nCroft’s Karnos reading lacks that discipline. He converts one sign to k in a royal name, g in a title, and silence in a troublesome ledger row without stating a conditioning rule. A genuine decipherment may contain allographs, sound shifts, and omissions, but each should recur under describable circumstances. Grimm’s law arms Ven to ask whether irregularities open new structure or merely protect the epic from failure. Regularity does not demand perfection; instead, it demands that the explanation of exceptions carry genuine new predictive weight afterward.",
      frame:"Ode circles three different sounds assigned to one Karnos sign. “Grimm could tolerate exceptions because later rules grouped them. Croft’s exceptions travel alone.”", q:[
        { q:"What does Grimm’s law describe?",
          o:[
            { t:"Systematic consonant shifts from Indo-European into Germanic.", v:"expert", fb:"The law captures recurring sound correspondences across many cognates." },
            { t:"A rule that folktales must preserve their oldest wording exactly.", v:"wrong", fb:"The law belongs to historical phonology, not story collection." },
            { t:"A cipher replacing each Latin letter with the next German letter.", v:"wrong", fb:"Historical sound change is not a simple written substitution code." },
            { t:"Proof that English descended directly from classical Latin.", v:"danger", fb:"English and Latin share deeper ancestry rather than direct descent." }
          ] },
        { q:"Why was Verner’s later explanation important?",
          o:[
            { t:"It grouped apparent exceptions by an earlier stress condition.", v:"expert", fb:"A predictive conditioning rule strengthened rather than abandoned regularity." },
            { t:"It allowed any consonant mismatch to count as supporting evidence.", v:"danger", fb:"An exception rule must itself apply consistently." },
            { t:"It showed that Grimm had fabricated all of his comparative examples.", v:"wrong", fb:"Verner refined the pattern; he did not expose fraud." },
            { t:"It replaced spoken sound history with visual comparison of scripts.", v:"wrong", fb:"Both laws concern phonological change." }
          ] },
        { q:"When is an irregular Karnos value scientifically acceptable?",
          o:[
            { t:"A recurring contextual rule predicts when the alternate value appears.", v:"expert", fb:"Conditioned variation must generalize beyond the example that inspired it." },
            { t:"The alternate value rescues a celebrated translation from contradiction.", v:"danger", fb:"Rescue alone is post hoc fitting." },
            { t:"Croft assigns it privately and declines to publish the conditions.", v:"wrong", fb:"Undisclosed rules cannot be independently tested." },
            { t:"The sign is aesthetically similar to two modern alphabet letters.", v:"wrong", fb:"Visual resemblance does not establish historical sound behavior." }
          ] }
      ] },
    // cell: Analyst Ven @ The Decipherment Study
    sc_gelb:{ sci:"Ignace J. Gelb (1907–1985)", topic:"Grammatology & the theory of writing", lede:"He built a comparative science of writing systems, even as later scholars challenged his tidy evolutionary ladder.", no:17, profile:"Ignace J. Gelb was an Assyriologist at the University of Chicago who proposed grammatology as a general study of writing. His 1952 book A Study of Writing compared scripts across regions and periods, asking how marks represent language. He distinguished devices that convey ideas loosely from systems that encode stable linguistic units.\n\nGelb examined logographic, syllabic, and alphabetic principles and emphasized that real scripts often combine them. He wanted classifications based on function rather than exotic appearance. How many signs exist? Do they recur in word-like sequences? Are phonetic complements used? Do signs encode morphemes, syllables, consonants, or some mixture? These questions can characterize a system before every inscription is translated.\n\nParts of Gelb’s theory are now criticized, especially a unilinear story in which writing progresses from pictures through syllables toward alphabets. Scripts do not move along one universal ladder, and alphabetic writing is not inherently superior to systems adapted for other languages. Even flawed classifications can be useful when their assumptions are made explicit and revised.\n\nVen can apply the durable portion of Gelb’s program to Karnos. The inventory size, sign order, number notation, and repeated row structure may indicate what units the script encodes. Croft’s method instead jumps from visual resemblance to literary translation without specifying a writing system. Calling the marks undecipherable is equally premature. Before choosing a language or story, the inquiry should identify the machinery: what distinctions the signs consistently make and how the tablet layout channels them. A classification is useful when it narrows future readings and remains revisable as new evidence arrives.",
      frame:"Ven counts distinct signs, positional variants, and number marks. “Before asking what the poem says, Gelb would ask what sort of writing machine this is.”", q:[
        { q:"What is grammatology in Gelb’s usage?",
          o:[
            { t:"The comparative study of writing systems and how they encode language.", v:"expert", fb:"Gelb sought general functional categories across scripts." },
            { t:"The correction of spelling mistakes in ancient royal literature.", v:"wrong", fb:"Grammatology addresses writing systems, not copyediting." },
            { t:"A method for translating every sign through its pictorial resemblance.", v:"danger", fb:"Functional analysis goes beyond pictures." },
            { t:"The belief that grammar can exist only after alphabetic writing.", v:"wrong", fb:"Spoken languages have grammar regardless of script." }
          ] },
        { q:"Which feature helps classify an unknown script?",
          o:[
            { t:"Sign inventory, sequence patterns, recurrence, and encoded units.", v:"expert", fb:"Distributional properties can distinguish likely writing principles." },
            { t:"How impressive the tablets appear under museum lighting.", v:"wrong", fb:"Display aesthetics reveal little about linguistic function." },
            { t:"Whether the claimant’s translation contains a royal battle.", v:"danger", fb:"Content claims cannot substitute for a model of the script." },
            { t:"The number of visitors who recognize familiar-looking symbols.", v:"wrong", fb:"Recognition by shape is vulnerable to coincidence." }
          ] },
        { q:"What part of Gelb’s framework drew later criticism?",
          o:[
            { t:"Its evolutionary ladder treated alphabets as a universal endpoint.", v:"expert", fb:"Writing systems do not follow one simple path toward alphabetic superiority." },
            { t:"Its claim that mixed writing systems can use several sign functions.", v:"wrong", fb:"Mixed systems are well documented." },
            { t:"Its use of sign counts and positional evidence in classification.", v:"wrong", fb:"Those remain productive analytical tools." },
            { t:"Its refusal to compare scripts from different regions or periods.", v:"wrong", fb:"Cross-cultural comparison was central to the project." }
          ] }
      ] },
    // cell: Analyst Ven @ The Decipherment Study
    sc_friedman:{ sci:"William F. Friedman (1891–1969)", topic:"Cryptanalysis & letter-frequency method", lede:"He turned letter counts, repeated patterns, and probability into a professional science of breaking codes without trusting intuition.", no:18, profile:"William F. Friedman was a pioneering American cryptanalyst. He began at Riverbank Laboratories in Illinois, where genetics, photography, and code work unexpectedly intersected. Alongside Elizebeth Smith Friedman, who became a major cryptanalyst in her own right, he developed systematic training and methods for analyzing ciphers.\n\nFriedman’s work used frequency, repetition, coincidence, and statistical structure. In a simple substitution cipher, symbols preserve some patterns of the underlying language even when letters are renamed. He developed the index of coincidence, a measure based on how often two sampled letters match, which helps distinguish language-like text and estimate features such as key length in polyalphabetic systems. During his later government career, the team he built in the U.S. Army Signal Intelligence Service helped solve Japan’s PURPLE diplomatic cipher.\n\nCryptanalysis differs from ancient-script decipherment because a cipher is designed to conceal a known communication system. Yet both fields depend on distributions, recurring sequences, external cribs, and independent verification. A solution should decode more than the passage used to discover it and should preserve the statistical texture expected of a language or document type.\n\nVen’s Karnos counts therefore have real force. If the tablets are ledgers, sign frequencies and repeated row frames should reflect commodities, names, and numbers. Croft’s epic requires signs to change value so often that the decoded text loses any reproducible mapping. Friedman would not accept a beautiful plaintext selected from countless flexible keys. He would test the key on untouched material and ask whether its success is improbable under chance.",
      frame:"Ven runs a finger down the frequency table. “Friedman knew every code leaks structure. A key that decodes only the message chosen to advertise it is not a key.”", q:[
        { q:"What does the index of coincidence measure?",
          o:[
            { t:"How often two sampled symbols or letters from a text match.", v:"expert", fb:"The matching rate reveals statistical structure useful in cipher analysis." },
            { t:"How closely a decoded story resembles a known historical legend.", v:"wrong", fb:"The measure is statistical, not literary." },
            { t:"The probability that two tablets came from the same excavation trench.", v:"wrong", fb:"Archaeological association requires provenance evidence." },
            { t:"Whether every sign occurs exactly the same number of times.", v:"partial", fb:"Frequency balance affects the statistic, but equal counts are not the definition." }
          ] },
        { q:"Why can frequency analysis break substitution ciphers?",
          o:[
            { t:"Renamed symbols retain unequal patterns inherited from the language.", v:"expert", fb:"Substitution changes labels while preserving many distributional relationships." },
            { t:"Every language uses its alphabet in exactly the same proportions.", v:"wrong", fb:"Frequencies vary by language, genre, and sample size." },
            { t:"Cipher makers always leave a written key beside the message.", v:"wrong", fb:"Cryptanalysis is needed precisely when the key is unavailable." },
            { t:"The most common symbol must always translate to the letter e.", v:"danger", fb:"That is a useful guess in some English texts, not an infallible rule." }
          ] },
        { q:"How should Croft’s Karnos key be tested?",
          o:[
            { t:"Apply it unchanged to tablets not used to construct the reading.", v:"expert", fb:"Out-of-sample decoding reveals whether the mapping generalizes." },
            { t:"Let Croft revise it after seeing every failed translation.", v:"danger", fb:"Unlimited revision can fit almost any chosen text." },
            { t:"Judge it by how moving the royal epic sounds when read aloud.", v:"wrong", fb:"Aesthetic effect does not validate a code or script mapping." },
            { t:"Compare only the tablet already printed in the exhibition catalogue.", v:"wrong", fb:"Testing on the discovery example alone invites overfitting." }
          ] }
      ] }
  },
  STORIES:{
    sc_epigrapher:{ sc_gallery:"Tuma kneels beside the display case with a raking lamp. “Croft’s drawing has three strokes the clay does not,” she says. “A decipherment cannot begin from signs added during copying.”", sc_epigraphy:"In the epigraphy lab, Tuma aligns photographs taken under changing light. “A crack can masquerade as a wedge from one angle,” she says. “Real signs survive the whole image stack.”", sc_study:"Tuma sets the original tablet beside Croft’s inked transcription. “He cleaned the line until it said what he needed,” she says. “The clay kept the mess he erased.”" },
    sc_registrar:{ sc_gallery:"Ode opens the excavation register to a page patched with newer paper. “These showcase tablets were not logged with the palace archive,” she says. “Their context appears years later, in Croft’s handwriting.”", sc_epigraphy:"Ode checks accession numbers against conservation photographs. “Objects have biographies,” she says. “When a tablet’s first chapter is missing, every later claim needs harder proof.”", sc_study:"Ode lays shipping receipts beside the catalogue. “Croft handled the disputed pieces before the museum recorded them,” she says. “That does not decide the reading, but it changes who could shape the evidence.”" },
    sc_statistician:{ sc_gallery:"Ven counts signs across the gallery labels rather than reading the translations. “The supposed royal names sit where quantities sit on every other tablet,” he says. “Position is evidence.”", sc_epigraphy:"Ven projects a matrix of sign pairs across the wall. “Croft’s values work only in the highlighted line,” he says. “The untouched rows obey a different, repetitive grammar.”", sc_study:"Ven slides the final grid across the desk. “Same prefixes, item columns, numerals, and totals,” he says. “A decipherment should make the boring rows readable too.”" }
  },
  story:["The <b>Karnos tablets</b> emerged from storage with a translation grand enough to rewrite a dynasty: a forgotten king, a victorious campaign, and an epic no ancient historian had mentioned. Under angled light, some celebrated signs begin to waver.","You can consult <b>Epigrapher Tuma</b>, who knows every wedge and crack; <b>Registrar Ode</b>, who can reconstruct each object’s path from soil to case; and <b>Analyst Ven</b>, whose sign grids test whether a reading survives beyond one chosen line.","Prof. Malden Croft, Dr. Sena, and the museum curator all have reasons to control the announcement. The inquiry is pulled toward <b>a lost royal epic naming a forgotten king</b> or toward <b>an unreadable script—meaningless marks</b>. Both verdicts are easier than making every sign answer to the full archive.","The commission reports in eight days, before the tablets leave for an international exhibition. Once the catalogue is printed and the objects disperse, a false reading—or a careless dismissal—will harden into the record."],
  endings:{ overclaimWhat:"sc_epic", dismissalWhat:"sc_undecipherable",
    win:{ expertTitle:"The Grid Holds", expert:["You identify <b>Prof. Malden Croft</b>, <b>the Decipherment Study</b>, and <b>a fabricated decipherment; the grid reads a plain ledger</b>. The alleged royal signs are absent from the clay, Croft’s values change without rules, and the repeated rows align with quantities, commodities, and totals. Not a lost royal epic. Not meaningless marks.","Your accusation explains both seductions without overstating the evidence. Tuma establishes altered transcription, Ode places Croft in control before accession, and Ven shows that a stable grid reads untouched rows. The museum withdraws the epic, preserves the tablets, and publishes the administrative reading with its remaining uncertainties."], soundTitle:"A Reading That Repeats", sound:["You correctly name Prof. Malden Croft and the Decipherment Study. The claimed epic depends on inserted signs and shifting values, while the reproducible grid reveals a plain ledger rather than an unreadable script.","The commission accepts the central finding. Your account leaves some provenance details unresolved, but it gives other scholars a sign system they can test on the rest of the archive."], namedTitle:"The Right Key", named:["You name Prof. Malden Croft, the Decipherment Study, and a fabricated decipherment whose grid reads a plain ledger. The conclusion is right, though you do not fully show how the photographs, accession history, and sign frequencies converge.","The catalogue is halted. A stronger report must still demonstrate the evidential chain so the correction cannot be dismissed as rivalry between philologists."] },
    overclaim:{ title:"The King Who Existed Only in Translation", body:["You endorse the lost royal epic. Its finest lines rely on strokes absent from the tablets and on sign values that change whenever the narrative requires another word.","The announcement turns a weak reading into cultural fact. When the fabrication is later exposed, legitimate work on the Karnos script is tainted by the spectacle, and the plain, testable patterns in the archive are treated as collateral damage."] },
    dismissal:{ title:"The Script You Declared Empty", body:["You dismiss the tablets as unreadable, meaningless marks. Yet repeated signs occupy stable item, quantity, and total positions, and Ven’s grid predicts rows Croft never published.","By walking away, you confuse a false translation with the absence of writing. Croft’s fabrication survives as the only attempted reading, while the archive’s actual administrative language remains buried under cynicism."] },
    wrongNames:{ title:"The Text, Without Its Author", body:["You recognize that the epic was fabricated and that the grid yields a plain ledger, but you assign the act to the wrong person or room. The commission still needs the point where altered transcriptions, private custody, and the final sign key came together—"] } },
}};