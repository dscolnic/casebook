module.exports = { PACK: {
  "id": "c_script",
  "title": "The Karnos Tablets",
  "discipline": "Linguistics & Decipherment",
  "teaser": "A forgotten script gave up its secret: a lost royal epic, one scholar swore. An unbreakable code? A hoax reading? Or a grid that tells a duller truth?",
  "overclaimTag": "a lost royal epic",
  "truthTag": "a fabricated decipherment",
  "venue": "the Karnos tablets inquiry",
  "agent": {
    "name": "Investigator Yara Sol",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Commission credibility",
  "readingShort": "Decipherers",
  "readingLabel": "Decipherers & Linguists",
  "dossierName": "DECIPHERERS & LINGUISTS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Karnos tablets inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The place you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "A magnificent translation deserves less awe, not more, until the signs can repeat it without the translator’s help.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "sc_claimant",
      "items": [
        {
          "id": "sc_claimant",
          "label": "Prof. Malden Croft — the sensational decipherer"
        },
        {
          "id": "sc_rival",
          "label": "Dr. Sena — a rival philologist"
        },
        {
          "id": "sc_curator",
          "label": "The museum curator"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "sc_study",
      "items": [
        {
          "id": "sc_gallery",
          "label": "The Tablet Gallery & Find-Site"
        },
        {
          "id": "sc_epigraphy",
          "label": "The Epigraphy Lab"
        },
        {
          "id": "sc_study",
          "label": "The Decipherment Study"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "sc_fabreading",
      "items": [
        {
          "id": "sc_epic",
          "label": "A lost royal epic naming a forgotten king"
        },
        {
          "id": "sc_undecipherable",
          "label": "An unreadable script — meaningless marks"
        },
        {
          "id": "sc_fabreading",
          "label": "A fabricated decipherment; the grid reads a plain ledger"
        }
      ]
    }
  },
  "PLACES": {
    "sc_gallery": {
      "name": "The Tablet Gallery & Find-Site",
      "xy": [
        140,
        90
      ]
    },
    "sc_epigraphy": {
      "name": "The Epigraphy Lab",
      "xy": [
        330,
        240
      ]
    },
    "sc_study": {
      "name": "The Decipherment Study",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "sc_gallery",
      "sc_epigraphy"
    ],
    [
      "sc_epigraphy",
      "sc_study"
    ]
  ],
  "CHARACTERS": {
    "sc_epigrapher": {
      "name": "Epigrapher Tuma",
      "role": "Field epigrapher",
      "face": "📷",
      "badge": "T",
      "legend": "the epigraphy lab",
      "hint": "Makes the squeezes and photographs; the claimed signs are not on the tablets at all."
    },
    "sc_registrar": {
      "name": "Registrar Ode",
      "role": "Find-site registrar",
      "face": "🗂",
      "badge": "O",
      "legend": "the gallery",
      "hint": "Logs where each tablet came from; the 'epic' tablets share a suspiciously modern context."
    },
    "sc_statistician": {
      "name": "Analyst Ven",
      "role": "Computational linguist",
      "face": "🔡",
      "badge": "V",
      "legend": "the study",
      "hint": "Counts the sign frequencies; the grid points to an inventory, not a poem."
    }
  },
  "TOPICMAP": {
    "sc_gallery": {
      "sc_epigrapher": [
        "sc_champollion"
      ],
      "sc_registrar": [
        "sc_grotefend"
      ],
      "sc_statistician": [
        "sc_hincks"
      ]
    },
    "sc_epigraphy": {
      "sc_epigrapher": [
        "sc_ventris"
      ],
      "sc_registrar": [
        "sc_chadwick"
      ],
      "sc_statistician": [
        "sc_proskouriakoff"
      ]
    },
    "sc_study": {
      "sc_epigrapher": [
        "sc_saussure"
      ],
      "sc_registrar": [
        "sc_rask"
      ],
      "sc_statistician": [
        "sc_gelb"
      ]
    }
  },
  "TOPICS": {
    "sc_champollion": {
      "sci": "Jean-François Champollion (1790–1832)",
      "topic": "The decipherment of hieroglyphs",
      "lede": "A childhood obsession with Egypt became a multilingual assault on signs that scholars had mistaken for pictures alone.",
      "no": 1,
      "profile": "Jean-François Champollion grew up in revolutionary France fascinated by ancient Egypt and unusually gifted in languages. He studied Coptic—the late form of the Egyptian language written mainly with Greek letters—because he believed it preserved the speech behind the monuments. That preparation mattered more than any sudden flash of inspiration. The Rosetta Stone supplied one decree in Greek, demotic, and hieroglyphic scripts, but a parallel text is useful only when a reader can test how names, grammar, and sounds move between versions.\n\nThomas Young had already identified phonetic values in the royal name Ptolemy. Champollion expanded the approach by comparing cartouches, including Ptolemy and Cleopatra, across inscriptions. In 1822 his Lettre à M. Dacier announced a phonetic system. He realized hieroglyphic writing was mixed: signs could represent sounds, whole words, or meaning-classifiers now called determinatives. Phonetic spelling was not limited to foreign names; it operated within Egyptian words themselves.\n\nChampollion’s command of Coptic let him connect reconstructed sounds with known Egyptian vocabulary. He then tested readings across many texts rather than extracting one attractive sentence. His 1824 Précis du système hiéroglyphique developed the system further, and his later expedition to Egypt copied inscriptions in their archaeological settings. Decipherment became a cumulative grammar, not a private translation performance.\n\nThe Karnos claim must meet the same burden. A royal name that appears once can be guessed into almost anything; a real reading assigns values consistently across tablets, sign positions, and repeated formulas. Tuma’s photographs ask whether Croft’s claimed signs exist at all, while Ven’s grid asks whether the values predict ordinary entries beyond the celebrated passage. Champollion’s achievement rejects both theatrical certainty and the lazy verdict that unfamiliar marks are meaningless.",
      "frame": "Tuma angles a raking light across the tablet. “Champollion did not read a king because he wanted one. He made the same signs work again and again. Show me what turns recognition into decipherment.”",
      "q": [
        {
          "q": "What was Champollion’s crucial linguistic preparation?",
          "o": [
            {
              "t": "He learned Coptic as a surviving descendant of ancient Egyptian.",
              "v": "expert",
              "fb": "Coptic supplied vocabulary and grammar that could test reconstructed hieroglyphic readings."
            },
            {
              "t": "He memorized every royal portrait carved on surviving temple walls.",
              "v": "wrong",
              "fb": "Portrait recognition could not supply the language encoded by the signs."
            },
            {
              "t": "He assumed the Greek text translated each hieroglyph in the same order.",
              "v": "danger",
              "fb": "Translations do not align sign by sign, so that shortcut would mislead."
            },
            {
              "t": "He treated every enclosed cartouche as a complete historical sentence.",
              "v": "wrong",
              "fb": "Cartouches usually marked royal names, not entire narratives."
            }
          ]
        },
        {
          "q": "What did Champollion discover about hieroglyphic writing?",
          "o": [
            {
              "t": "It mixed phonetic signs, word signs, and semantic classifiers.",
              "v": "expert",
              "fb": "Egyptian writing combined several sign functions within the same system."
            },
            {
              "t": "It was a pure picture language with no connection to spoken sounds.",
              "v": "danger",
              "fb": "The phonetic component was essential to the successful decipherment."
            },
            {
              "t": "It used one alphabetic sign for every consonant and written vowel.",
              "v": "partial",
              "fb": "Some signs represented single consonants, but the system was not a simple alphabet."
            },
            {
              "t": "It encoded mainly foreign rulers phonetically and Egyptian words visually.",
              "v": "wrong",
              "fb": "Champollion showed phonetic spelling also operated in native Egyptian words."
            }
          ]
        },
        {
          "q": "What would most strongly support a Karnos sign value?",
          "o": [
            {
              "t": "It predicts sensible readings in several unrelated tablet contexts.",
              "v": "expert",
              "fb": "Consistent success beyond the initial passage distinguishes a system from a guess."
            },
            {
              "t": "It produces one dramatic royal title after several signs are ignored.",
              "v": "danger",
              "fb": "Selective success cannot validate values that fail elsewhere."
            },
            {
              "t": "It resembles a familiar letter when the tablet is viewed upside down.",
              "v": "wrong",
              "fb": "Visual resemblance alone does not establish linguistic value."
            },
            {
              "t": "It appears in a museum caption written after Croft announced the epic.",
              "v": "wrong",
              "fb": "A dependent caption adds no independent evidence."
            }
          ]
        }
      ]
    },
    "sc_grotefend": {
      "sci": "Georg F. Grotefend (1775–1853)",
      "topic": "The first cuneiform readings",
      "lede": "Without a bilingual key, he began with the formal boast of kings and guessed which dynasty could fit its pattern.",
      "no": 2,
      "profile": "Georg Friedrich Grotefend was a German schoolteacher and classical scholar who tackled copies of short cuneiform inscriptions from Persepolis around 1800. The script was unknown, and he did not possess a Rosetta-style translation. Instead, he used the inscriptions’ setting and repeated structure. Palace texts were likely to name rulers, fathers, and titles in formulaic arrangements.\n\nGrotefend noticed recurring sign groups positioned like “king,” “son of,” and royal names. He reasoned that two inscriptions could represent successive Achaemenid rulers whose genealogies were known from Greek sources. By testing the sequence Darius, Xerxes, and Hystaspes against the patterns, he proposed values for several Old Persian signs. Some guesses were wrong, but enough were close to establish that disciplined inference could penetrate the script.\n\nHis work illustrates constrained hypothesis rather than free association. The proposed names had to differ and repeat in the right places; a ruler’s father might lack the title king; sign values inferred from one name had to remain stable in another. Later discoveries and longer inscriptions completed and corrected the decipherment. Grotefend never produced a full reading of Old Persian, yet his structural reasoning opened the route.\n\nRegistrar Ode faces a similar temptation at Karnos. Find-site and object type can suggest likely genres—dedication, ration list, inventory—but context cannot authorize any desired translation. A royal formula should recur with names and titles in patterned slots. If Croft changes values whenever the “epic” needs a new word, his method lacks Grotefend’s constraints. If Ven finds repeated commodity-and-number frames, that ordinary pattern deserves testing rather than dismissal as meaningless scratches.",
      "frame": "Ode traces three repeated clusters on the catalogue photographs. “Grotefend used genealogy as a constraint, not a costume. Make the names fit the pattern without letting the pattern fit anything.”",
      "q": [
        {
          "q": "What gave Grotefend his initial leverage on Old Persian?",
          "o": [
            {
              "t": "Repeated royal formulas could be matched to known dynastic names.",
              "v": "expert",
              "fb": "Position, genealogy, and repetition constrained the possible identifications."
            },
            {
              "t": "A hidden Greek translation was discovered beneath each inscription.",
              "v": "wrong",
              "fb": "He worked without a direct bilingual translation."
            },
            {
              "t": "Every cuneiform sign visibly depicted the object it named.",
              "v": "danger",
              "fb": "The signs were not read through pictorial resemblance."
            },
            {
              "t": "A complete sign list survived in a later Persian manuscript.",
              "v": "wrong",
              "fb": "No ancient key simply supplied the values."
            }
          ]
        },
        {
          "q": "Why was the father’s title useful in his reasoning?",
          "o": [
            {
              "t": "A non-king father distinguished one royal genealogy from another.",
              "v": "expert",
              "fb": "Differences in titles helped test which known sequence fit the repeated formula."
            },
            {
              "t": "The title determined whether the text should be read left to right.",
              "v": "wrong",
              "fb": "Genealogy constrained names, not writing direction by itself."
            },
            {
              "t": "Every Persian ruler used a unique cuneiform sign for “father.”",
              "v": "wrong",
              "fb": "The formula relied on repeated signs rather than private royal symbols."
            },
            {
              "t": "It allowed all uncertain signs to be treated as decorative fillers.",
              "v": "danger",
              "fb": "Uncertain signs still had to receive consistent values."
            }
          ]
        },
        {
          "q": "Which Karnos inference best follows Grotefend’s method?",
          "o": [
            {
              "t": "Test repeated title-name slots against a historically plausible sequence.",
              "v": "expert",
              "fb": "A structural hypothesis should survive across several inscriptions."
            },
            {
              "t": "Choose the most famous king and reshape every cluster around his name.",
              "v": "danger",
              "fb": "A favored identity must not override mismatching sign patterns."
            },
            {
              "t": "Reject short inscriptions because mainly long narratives can be deciphered. too",
              "v": "wrong",
              "fb": "Short formulaic texts can provide strong constraints."
            },
            {
              "t": "Assume every repeated cluster names the same royal person in the dynasty.",
              "v": "partial",
              "fb": "Repeated groups may be titles, commodities, or names; position helps decide."
            }
          ]
        }
      ]
    },
    "sc_hincks": {
      "sci": "Edward Hincks (1792–1866)",
      "topic": "Akkadian cuneiform",
      "lede": "An Irish clergyman realized cuneiform signs could carry several values, the apparent defect that made the system decipherable.",
      "no": 3,
      "profile": "Edward Hincks was an Irish Anglican clergyman with formidable abilities in mathematics and ancient languages. Working largely away from major imperial collections, he became one of the central decipherers of Mesopotamian cuneiform. The script posed a harder problem than Old Persian because Babylonian and Assyrian texts used hundreds of signs with several functions.\n\nHincks recognized that the language now called Akkadian was Semitic, related in structure to Hebrew and Arabic, but written in a system inherited from Sumerian. A sign might represent a whole word, a syllable, or a determinative marking a semantic category. It could also have multiple readings. What looked like chaos was historical layering. Grammatical endings and recurring contexts helped decide which value applied.\n\nHe contributed to readings of names, numerals, syllabic values, and grammar, and he participated in the broader validation of cuneiform decipherment. His work sometimes competed with Rawlinson’s, yet their independent approaches strengthened the field. A system with polyvalent signs was not “unbreakable”; it required enough examples to infer how neighboring signs and language structure selected among alternatives.\n\nVen’s frequency tables should be read with that complexity in mind. A Karnos sign occurring in several positions need not have one English word as its eternal translation. It might encode a syllable, a commodity label, or a classifier. But flexibility is not permission for arbitrary readings. Croft must state rules that tell readers when each value applies. Hincks distinguishes genuine complexity from convenient shape-shifting: a difficult script has patterned alternatives, whereas a fabricated decipherment changes values only to rescue the desired story.",
      "frame": "Ven highlights one Karnos sign in three columns. “Polyvalence is real; improvisation is not. Hincks made multiple values obey grammar. Croft makes them obey the headline.”",
      "q": [
        {
          "q": "Why was Akkadian cuneiform unusually difficult to decipher?",
          "o": [
            {
              "t": "Signs could represent words, syllables, determinatives, or several readings.",
              "v": "expert",
              "fb": "The inherited mixed system was systematic but highly polyvalent."
            },
            {
              "t": "Every scribe invented a private script for each individual tablet. in context",
              "v": "danger",
              "fb": "Variation existed, but shared conventions made reading possible."
            },
            {
              "t": "The language had no grammar and therefore no recurring structures.",
              "v": "wrong",
              "fb": "Akkadian has rich Semitic grammar that aided analysis."
            },
            {
              "t": "The tablets contained mainly numbers without any linguistic signs. too",
              "v": "wrong",
              "fb": "Cuneiform recorded extensive linguistic texts as well as accounts."
            }
          ]
        },
        {
          "q": "How did recognizing Akkadian as Semitic help?",
          "o": [
            {
              "t": "Known grammatical patterns constrained endings, roots, and word forms.",
              "v": "expert",
              "fb": "Language family structure narrowed plausible readings of ambiguous signs."
            },
            {
              "t": "It proved Akkadian used the same alphabet as biblical Hebrew.",
              "v": "wrong",
              "fb": "The languages are related, but their writing systems differ greatly."
            },
            {
              "t": "It allowed scholars to ignore the script’s Sumerian inheritance.",
              "v": "danger",
              "fb": "That inheritance explains many logograms and sign values."
            },
            {
              "t": "It supplied a direct translation for every surviving tablet.",
              "v": "wrong",
              "fb": "Related languages provide constraints, not ready-made translations."
            }
          ]
        },
        {
          "q": "When is assigning multiple values to one sign legitimate?",
          "o": [
            {
              "t": "When context and grammar predict which attested value applies.",
              "v": "expert",
              "fb": "Polyvalence must follow repeatable rules across texts."
            },
            {
              "t": "Whenever a preferred translation needs a different word at that spot.",
              "v": "danger",
              "fb": "Ad hoc switching makes a reading unfalsifiable."
            },
            {
              "t": "mainly when the sign has been physically recut by a later scribe.",
              "v": "wrong",
              "fb": "One unchanged sign can conventionally carry several readings."
            },
            {
              "t": "When no other tablet contains the sign in a comparable position.",
              "v": "partial",
              "fb": "A unique context weakens rather than strengthens the case for several values."
            }
          ]
        }
      ]
    },
    "sc_ventris": {
      "sci": "Michael Ventris (1922–1956)",
      "topic": "The decipherment of Linear B",
      "lede": "An architect treated Linear B like a design problem, then discovered that its palace records encoded an early form of Greek.",
      "no": 4,
      "profile": "Michael Ventris encountered the undeciphered Linear B script as a schoolboy during a British Museum lecture by Arthur Evans. He later trained as an architect and served in the Royal Air Force during the Second World War. Architecture’s habits of grids, constraints, and iterative models suited his private campaign to solve the Bronze Age tablets from Crete and mainland Greece.\n\nVentris circulated work notes to other scholars, listing hypotheses and failures rather than guarding a single revelation. He initially suspected the language was Etruscan, then abandoned that idea as patterns accumulated. Alice Kober’s analysis had identified inflectional relationships and organized signs in grids. New tablets from Pylos, published by Emmett Bennett, provided place-name patterns that Ventris tested against Cretan geography and sign alternations.\n\nIn 1952 Ventris announced in a BBC broadcast that Linear B appeared to write an archaic form of Greek. Classicist John Chadwick joined him to test vocabulary and grammar. The result was surprising because Evans had assumed the script represented a non-Greek Minoan language. Yet readings continued to work across administrative tablets, including records of people, livestock, land, and offerings. The corpus, not the romance of the answer, carried the decipherment.\n\nThe Karnos “epic” should face Ventris’s standard of productive revision. A serious analyst records failed hypotheses, shares sign tables, and applies the system to unseen documents. Croft instead presents a finished triumph with no trail of discarded models. Ven’s grid may yield repetitive accounting language rather than literature; that would be historically ordinary and linguistically stronger. The question is not whether the solution is exciting, but whether it keeps generating constrained readings after the first tablet.",
      "frame": "Tuma unfolds Ventris’s numbered work notes beside Croft’s polished monograph. “A real solution leaves a trail of wrong turns. This one arrived without footprints.”",
      "q": [
        {
          "q": "What language did Ventris conclude Linear B encoded?",
          "o": [
            {
              "t": "An early Mycenaean form of the Greek language in palace records.",
              "v": "expert",
              "fb": "Greek vocabulary and inflection repeatedly fit the Linear B sign patterns."
            },
            {
              "t": "A secret alphabetic code made by classical Athenian scribes. here",
              "v": "wrong",
              "fb": "Linear B is a Bronze Age syllabic script, not a later Athenian cipher."
            },
            {
              "t": "Etruscan, as Ventris had predicted from the beginning.",
              "v": "wrong",
              "fb": "He initially considered Etruscan but changed course with the evidence."
            },
            {
              "t": "A language used mainly for palace religious ceremonies.",
              "v": "danger",
              "fb": "The tablets contain extensive practical administration."
            }
          ]
        },
        {
          "q": "Which prior work was especially important to Ventris?",
          "o": [
            {
              "t": "Kober’s inflectional grids and Bennett’s organized sign corpus.",
              "v": "expert",
              "fb": "Their pattern analysis and improved data made stronger tests possible."
            },
            {
              "t": "A complete Greek translation secretly supplied by Arthur Evans.",
              "v": "wrong",
              "fb": "Evans did not solve Linear B and doubted a Greek reading."
            },
            {
              "t": "A phonograph recording of Bronze Age Cretan pronunciation.",
              "v": "wrong",
              "fb": "No ancient audio evidence existed."
            },
            {
              "t": "A royal epic whose meter fixed every uncertain syllable.",
              "v": "danger",
              "fb": "The key corpus consisted largely of administrative documents."
            }
          ]
        },
        {
          "q": "What made the Greek reading convincing?",
          "o": [
            {
              "t": "It kept producing vocabulary and grammar across many tablets.",
              "v": "expert",
              "fb": "Broad predictive success outweighed the surprise of the result."
            },
            {
              "t": "Ventris was an architect and therefore unbiased by linguistics.",
              "v": "partial",
              "fb": "His background aided pattern work, but evidence—not outsider status—validated it."
            },
            {
              "t": "The BBC announcement alone made the solution publicly famous.",
              "v": "wrong",
              "fb": "Publicity did not establish the sign values."
            },
            {
              "t": "The translation revealed a more dramatic story than scholars expected.",
              "v": "danger",
              "fb": "The records were often mundane, and that regularity strengthened the reading."
            }
          ]
        }
      ]
    },
    "sc_chadwick": {
      "sci": "John Chadwick (1920–1998)",
      "topic": "Documents in Mycenaean Greek",
      "lede": "A wartime codebreaker supplied the Greek grammar that turned Ventris’s startling proposal into a durable decipherment.",
      "no": 5,
      "profile": "John Chadwick was a British classical philologist who had worked on codebreaking during the Second World War. Soon after Michael Ventris announced that Linear B encoded Greek, Chadwick contacted him. Ventris could manipulate the sign system brilliantly; Chadwick brought deep knowledge of historical Greek vocabulary, morphology, and dialects. Their collaboration tested whether the proposed syllabic values produced a coherent ancient language.\n\nLinear B was an awkward vehicle for Greek. The script generally wrote open syllables and did not represent many final consonants or consonant clusters directly. Different Greek sounds could collapse into one written series. A superficial reading therefore looked strange. Chadwick showed that these distortions followed rules and that reconstructed words fit Mycenaean Greek forms. Administrative formulas, names, commodities, and grammatical endings reinforced one another.\n\nVentris and Chadwick published Documents in Mycenaean Greek in 1956. It presented the decipherment, selected tablets, vocabulary, and interpretation in a form other specialists could challenge. After Ventris died that year in a road accident, Chadwick continued defending and refining the reading. Acceptance came because the system handled new texts and difficult details, not because of the collaborators’ authority.\n\nRegistrar Ode should demand the same from Croft: a grammar, a sign list, explicit spelling rules, and translations that other scholars can reproduce. A decipherment may yield forms that look imperfect because scripts omit sounds, but those irregularities must be regular. If every awkward Karnos sequence receives a different rescue rule, there is no language model. Chadwick’s contribution turns “it sounds like a word” into a disciplined account of how writing maps onto speech.",
      "frame": "Ode marks every place where Croft silently inserts a vowel. “Chadwick could explain why Linear B distorted Greek. A missing sound needs a rule, not an author’s convenience.”",
      "q": [
        {
          "q": "What did Chadwick add to the Linear B decipherment?",
          "o": [
            {
              "t": "Expert knowledge of Greek grammar, vocabulary, and historical forms.",
              "v": "expert",
              "fb": "His philology tested whether Ventris’s sign values produced a real language."
            },
            {
              "t": "The first photographs proving that Linear B tablets physically existed.",
              "v": "wrong",
              "fb": "The tablets had long been known and published."
            },
            {
              "t": "A claim that the script represented closely spelled classical Greek.",
              "v": "wrong",
              "fb": "Linear B encoded much earlier Greek through an imperfect syllabary."
            },
            {
              "t": "A royal legend that fixed the meaning of every administrative term.",
              "v": "danger",
              "fb": "The decipherment grew from repetitive records, not one literary key."
            }
          ]
        },
        {
          "q": "Why can Linear B Greek look distorted?",
          "o": [
            {
              "t": "Its syllabary omitted or simplified clusters and many final consonants.",
              "v": "expert",
              "fb": "The script’s structure forced regular spelling conventions onto Greek words."
            },
            {
              "t": "The scribes deliberately encrypted palace accounts from their rulers.",
              "v": "wrong",
              "fb": "The distortions reflect script fit, not secret cryptography."
            },
            {
              "t": "Ventris changed sign values randomly whenever a word looked unfamiliar.",
              "v": "danger",
              "fb": "The reading succeeded because its spelling rules were consistent."
            },
            {
              "t": "Greek had no consonants during the Mycenaean palace period at all.",
              "v": "wrong",
              "fb": "Greek consonants existed even when the script represented them imperfectly."
            }
          ]
        },
        {
          "q": "What would make an inserted Karnos sound acceptable?",
          "o": [
            {
              "t": "A stated spelling rule predicts the same insertion in other words.",
              "v": "expert",
              "fb": "Systematic omissions can be reconstructed when the rule generalizes."
            },
            {
              "t": "The extra sound makes the royal translation more dramatic.",
              "v": "danger",
              "fb": "Literary effect cannot justify an unwritten phonetic value."
            },
            {
              "t": "Croft says ancient scribes were inconsistent whenever challenged.",
              "v": "wrong",
              "fb": "Unlimited inconsistency removes the possibility of testing."
            },
            {
              "t": "No photograph clearly shows a sign where the sound should occur.",
              "v": "partial",
              "fb": "Absence might reflect script rules, but those rules need independent evidence."
            }
          ]
        }
      ]
    },
    "sc_proskouriakoff": {
      "sci": "Tatiana Proskouriakoff (1909–1985)",
      "topic": "Reading Maya historical inscriptions",
      "lede": "She turned carved dates into biographies, proving Maya monuments recorded births, accessions, wars, and deaths.",
      "no": 6,
      "profile": "Tatiana Proskouriakoff was born in Russia and trained as an architect in the United States. She entered Maya archaeology through reconstruction drawings that combined measured ruins with disciplined visual inference. At Piedras Negras in Guatemala, she studied dated stelae arranged in groups and noticed that their patterns fit the span of individual human lives.\n\nIn a landmark 1960 paper, Proskouriakoff argued that Maya inscriptions recorded historical events. Certain glyphs clustered near the beginning of a sequence at dates compatible with birth; others appeared roughly at accession; later monuments marked events and death. She did not yet read all the phonetic details. Instead, chronology, monument sequence, and repeated sign positions revealed a biographical structure.\n\nHer result overturned the influential view that Maya inscriptions concerned almost exclusively astronomy, ritual, and timeless calendrical cycles. It also opened a route for identifying rulers and dynasties as phonetic decipherment advanced. The achievement shows that text type and historical content can sometimes be inferred before every word is sounded out, provided patterns are tightly constrained.\n\nVen’s grid may likewise reveal Karnos document type before full translation. Repeated number columns, item signs, and totals would support an account or inventory; long sequences tied to royal life events would look different. Croft skips that structural diagnosis and begins with a literary conclusion. Proskouriakoff offers a middle course between “we can read the epic” and “the marks mean nothing”: use dates, recurrence, and document layout to identify what kind of record the signs most plausibly organize. Her architectural training made arrangements on stone and paper legible as sequences rather than decoration.",
      "frame": "Ven maps Karnos sign clusters against tablet rows. “Proskouriakoff found history before she could pronounce every glyph. Genre leaves a measurable skeleton.”",
      "q": [
        {
          "q": "What pattern did Proskouriakoff find at Piedras Negras?",
          "o": [
            {
              "t": "Dated monument sequences fit births, accessions, events, and deaths.",
              "v": "expert",
              "fb": "Chronology revealed biographies of rulers within the inscriptions."
            },
            {
              "t": "Every stela repeated one timeless astronomical table unchanged.",
              "v": "wrong",
              "fb": "The sequences varied in ways consistent with historical lives."
            },
            {
              "t": "The glyphs formed an alphabet identical to modern Spanish.",
              "v": "wrong",
              "fb": "Her breakthrough was structural and historical, not an alphabet discovery."
            },
            {
              "t": "Random dates could be rearranged to fit any desired royal biography.",
              "v": "danger",
              "fb": "The ordered monument groups imposed strong chronological constraints."
            }
          ]
        },
        {
          "q": "Did she need to read every glyph phonetically first?",
          "o": [
            {
              "t": "No; chronology and repeated positions exposed historical structure.",
              "v": "expert",
              "fb": "Document patterns can identify functions before complete phonetic reading."
            },
            {
              "t": "Yes; she translated every sentence before noticing the dates.",
              "v": "wrong",
              "fb": "Her argument preceded full phonetic decipherment."
            },
            {
              "t": "No; pictures alone supplied exact names and spoken titles.",
              "v": "partial",
              "fb": "Images helped, but the decisive evidence was inscriptional sequence and dating."
            },
            {
              "t": "Yes; genre can rarely be inferred from layout or repetition.",
              "v": "wrong",
              "fb": "Her work is a classic counterexample."
            }
          ]
        },
        {
          "q": "Which Karnos pattern would most suggest a ledger?",
          "o": [
            {
              "t": "Repeated item signs beside quantities and recurring total positions.",
              "v": "expert",
              "fb": "Administrative texts often organize commodities and numbers in stable frames."
            },
            {
              "t": "One long line that Croft translates as a heroic battle speech.",
              "v": "danger",
              "fb": "A solitary literary claim cannot outweigh corpus-wide structure."
            },
            {
              "t": "A damaged edge that vaguely resembles a crowned human figure.",
              "v": "wrong",
              "fb": "Incidental shape resemblance does not establish document genre."
            },
            {
              "t": "No repeated signs, numbers, columns, or positional regularities.",
              "v": "wrong",
              "fb": "The absence of structure would weaken a ledger interpretation."
            }
          ]
        }
      ]
    },
    "sc_saussure": {
      "sci": "Ferdinand de Saussure (1857–1913)",
      "topic": "The linguistic sign & structure",
      "lede": "He taught linguists to find meaning not inside isolated marks, but in the patterned differences that connect an entire system.",
      "no": 7,
      "profile": "Ferdinand de Saussure was a Swiss linguist whose early work helped reconstruct Indo-European sound patterns. He became far more famous through the Course in General Linguistics, assembled by students from lectures and published after his death in 1916. The book redirected linguistics toward the structure of a language at a given time.\n\nSaussure described the linguistic sign as a relation between a signifier, such as a sound pattern, and a signified, the concept associated with it. The connection is largely arbitrary: there is nothing naturally tree-like about the English sound tree. Meaning arises through differences within a system. A word has value because it contrasts with neighboring words; a sound matters because replacing it can distinguish forms.\n\nHe also distinguished langue, the shared social system of conventions, from parole, individual acts of speaking. The distinction encouraged analysts to infer underlying rules from many utterances rather than treating each expression as self-contained. Writing is not identical to language, but a script likewise gains function through contrasts, distributions, and combinations among signs.\n\nCroft’s Karnos method treats signs as isolated emblems: crown equals king, wave equals sea, spear equals conquest. Saussure’s approach asks whether those values are supported by oppositions and recurring contexts across the corpus. A sign beside numerals may have value because it contrasts with other commodity labels, not because its shape resembles an object. Tuma must preserve the actual marks, and Ven must map their relations. The system decides more than the decipherer’s visual imagination. Individual marks become evidence only through the network of contrasts around them.",
      "frame": "Tuma covers Croft’s picture-glosses and leaves only the sign sequences. “Saussure would begin with contrasts. What changes when one mark replaces another?”",
      "q": [
        {
          "q": "What are the signifier and signified?",
          "o": [
            {
              "t": "The perceptible form of a sign and the concept linked to it.",
              "v": "expert",
              "fb": "A linguistic sign joins a sound-image or form with a concept."
            },
            {
              "t": "The writer of a text and the reader who later interprets it.",
              "v": "wrong",
              "fb": "Those are participants, not the two sides of Saussure’s sign."
            },
            {
              "t": "A picture and the physical object it would naturally resemble.",
              "v": "danger",
              "fb": "Saussure emphasized that sign relations are largely conventional."
            },
            {
              "t": "The first letter of a word and its final grammatical ending.",
              "v": "wrong",
              "fb": "The distinction does not refer to word position."
            }
          ]
        },
        {
          "q": "What does it mean that signs have value through differences?",
          "o": [
            {
              "t": "Their functions depend on contrasts with other signs in the system.",
              "v": "expert",
              "fb": "Meaning is relational rather than stored in each form by itself."
            },
            {
              "t": "Every sign would look visibly different from signs in all other scripts.",
              "v": "wrong",
              "fb": "The relevant contrasts operate within a language or sign system."
            },
            {
              "t": "A sign can mean anything if its interpreter explains the choice.",
              "v": "danger",
              "fb": "Arbitrariness is social convention, not private freedom."
            },
            {
              "t": "mainly rare signs carry meaning because common signs lose distinctiveness.",
              "v": "wrong",
              "fb": "Common signs can be highly meaningful through structured contrasts."
            }
          ]
        },
        {
          "q": "Which analysis is most Saussurean?",
          "o": [
            {
              "t": "Compare where signs occur and what substitutions change the pattern.",
              "v": "expert",
              "fb": "Distribution and opposition reveal systemic value."
            },
            {
              "t": "Translate each sign from the object its outline resembles.",
              "v": "danger",
              "fb": "Pictorial intuition ignores conventional and relational structure."
            },
            {
              "t": "Ask which proposed story best matches the museum exhibition theme.",
              "v": "wrong",
              "fb": "Curatorial preference cannot determine linguistic value."
            },
            {
              "t": "Treat every tablet as a unique code with no shared conventions.",
              "v": "wrong",
              "fb": "A language depends on a communal system across individual uses."
            }
          ]
        }
      ]
    },
    "sc_rask": {
      "sci": "Rasmus Rask (1787–1832)",
      "topic": "Comparative grammar & sound laws",
      "lede": "He made language kinship answer to recurring consonant correspondences rather than the seduction of words that merely looked alike.",
      "no": 8,
      "profile": "Rasmus Rask was a Danish linguist who traveled widely and studied Icelandic, Germanic, Iranian, and other languages. In his 1818 investigation of the origin of Old Norse, he compared grammatical systems and basic vocabulary across language families. He insisted that relationship could not rest on a handful of similar words, which might be borrowed or coincidental.\n\nRask observed recurring consonant correspondences between Germanic languages and Greek, Latin, and Sanskrit. Where one language had a particular sound, another regularly showed a different one in cognate words. He did not formulate the later famous pattern in precisely Grimm’s terms, but he supplied much of the empirical foundation. He also recognized the special evidential weight of inflectional endings, which are less readily borrowed than fashionable vocabulary.\n\nHis method disciplined comparison. Proposed relatives should show numerous matches in basic terms, parallel grammatical structures, and sound changes that apply across examples. Exceptions require explanation, not silent deletion. A system can be incomplete and still scientific if it exposes its rules to new words.\n\nRegistrar Ode can use Rask’s standard to evaluate Croft’s claim that Karnos encodes an ancestral language. The alleged royal name has been compared with distant rulers, but the remaining vocabulary shows no regular sound mapping. Ven’s ledger interpretation may instead rely on internal repetition without claiming external kinship. Rask teaches that modest structure beats glamorous resemblance: a dependable pattern among ordinary forms is better evidence than one name engineered to cross millennia. His approach made correspondence tables into tests that any later scholar could extend or overturn.",
      "frame": "Ode places Croft’s list of “similar” royal names beside a blank correspondence table. “Rask would ask what every consonant does, not applaud the closest-looking word.”",
      "q": [
        {
          "q": "What did Rask require beyond similar-looking words?",
          "o": [
            {
              "t": "Regular sound correspondences plus grammar and basic vocabulary.",
              "v": "expert",
              "fb": "Relationship must appear as a system across many forms."
            },
            {
              "t": "A legend claiming both peoples descended from the same king.",
              "v": "danger",
              "fb": "Traditional stories cannot establish linguistic ancestry."
            },
            {
              "t": "Identical alphabets maintained without change across centuries.",
              "v": "wrong",
              "fb": "Related languages may use different scripts and shifted sounds."
            },
            {
              "t": "One long borrowed word shared by merchants in both regions.",
              "v": "partial",
              "fb": "Borrowing shows contact, not necessarily common descent."
            }
          ]
        },
        {
          "q": "Why are grammatical endings valuable in comparison?",
          "o": [
            {
              "t": "They are structured and generally less easily borrowed than prestige words.",
              "v": "expert",
              "fb": "Inflectional systems can preserve deep genealogical evidence."
            },
            {
              "t": "They remain unchanged across every stage of a language’s known history.",
              "v": "wrong",
              "fb": "Endings change, but their patterned correspondences remain informative."
            },
            {
              "t": "They alone reveal the archaeological location of every written tablet.",
              "v": "wrong",
              "fb": "Grammar does not determine find provenance."
            },
            {
              "t": "They can be ignored whenever a royal name seems fully convincing to scholars.",
              "v": "danger",
              "fb": "A name cannot outweigh contradictory systemic evidence."
            }
          ]
        },
        {
          "q": "What would weaken Croft’s ancestry claim most?",
          "o": [
            {
              "t": "Proposed sound matches fail to recur in ordinary Karnos vocabulary.",
              "v": "expert",
              "fb": "A relationship that works only for one name is likely selective fitting."
            },
            {
              "t": "Some tablets contain repetitive quantities rather than complete sentences.",
              "v": "partial",
              "fb": "Administrative genre does not by itself rule out a language relationship."
            },
            {
              "t": "The script uses signs unlike the alphabet of the proposed relative.",
              "v": "partial",
              "fb": "Different scripts can write related languages."
            },
            {
              "t": "The candidate language was spoken by a politically unimportant group.",
              "v": "wrong",
              "fb": "Political status has no bearing on linguistic descent."
            }
          ]
        }
      ]
    },
    "sc_gelb": {
      "sci": "Ignace J. Gelb (1907–1985)",
      "topic": "Grammatology & the theory of writing",
      "lede": "He built a comparative science of writing systems, even as later scholars challenged his tidy evolutionary ladder.",
      "no": 9,
      "profile": "Ignace J. Gelb was an Assyriologist at the University of Chicago who proposed grammatology as a general study of writing. His 1952 book A Study of Writing compared scripts across regions and periods, asking how marks represent language. He distinguished devices that convey ideas loosely from systems that encode stable linguistic units.\n\nGelb examined logographic, syllabic, and alphabetic principles and emphasized that real scripts often combine them. He wanted classifications based on function rather than exotic appearance. How many signs exist? Do they recur in word-like sequences? Are phonetic complements used? Do signs encode morphemes, syllables, consonants, or some mixture? These questions can characterize a system before every inscription is translated.\n\nParts of Gelb’s theory are now criticized, especially a unilinear story in which writing progresses from pictures through syllables toward alphabets. Scripts do not move along one universal ladder, and alphabetic writing is not inherently superior to systems adapted for other languages. Even flawed classifications can be useful when their assumptions are made explicit and revised.\n\nVen can apply the durable portion of Gelb’s program to Karnos. The inventory size, sign order, number notation, and repeated row structure may indicate what units the script encodes. Croft’s method instead jumps from visual resemblance to literary translation without specifying a writing system. Calling the marks undecipherable is equally premature. Before choosing a language or story, the inquiry should identify the machinery: what distinctions the signs consistently make and how the tablet layout channels them. A classification is useful when it narrows future readings and remains revisable as new evidence arrives.",
      "frame": "Ven counts distinct signs, positional variants, and number marks. “Before asking what the poem says, Gelb would ask what sort of writing machine this is.”",
      "q": [
        {
          "q": "What is grammatology in Gelb’s usage?",
          "o": [
            {
              "t": "The comparative study of writing systems and how they encode language.",
              "v": "expert",
              "fb": "Gelb sought general functional categories across scripts."
            },
            {
              "t": "The correction of spelling mistakes in ancient royal literature.",
              "v": "wrong",
              "fb": "Grammatology addresses writing systems, not copyediting."
            },
            {
              "t": "A method for translating every sign through its pictorial resemblance.",
              "v": "danger",
              "fb": "Functional analysis goes beyond pictures."
            },
            {
              "t": "The belief that grammar can exist mainly after alphabetic writing.",
              "v": "wrong",
              "fb": "Spoken languages have grammar regardless of script."
            }
          ]
        },
        {
          "q": "Which feature helps classify an unknown script?",
          "o": [
            {
              "t": "Sign inventory, sequence patterns, recurrence, and encoded units.",
              "v": "expert",
              "fb": "Distributional properties can distinguish likely writing principles."
            },
            {
              "t": "How impressive the tablets appear under museum lighting.",
              "v": "wrong",
              "fb": "Display aesthetics reveal little about linguistic function."
            },
            {
              "t": "Whether the claimant’s translation contains a royal battle.",
              "v": "danger",
              "fb": "Content claims cannot substitute for a model of the script."
            },
            {
              "t": "The number of visitors who recognize familiar-looking symbols.",
              "v": "wrong",
              "fb": "Recognition by shape is vulnerable to coincidence."
            }
          ]
        },
        {
          "q": "What part of Gelb’s framework drew later criticism?",
          "o": [
            {
              "t": "Its evolutionary ladder treated alphabets as a universal endpoint.",
              "v": "expert",
              "fb": "Writing systems do not follow one simple path toward alphabetic superiority."
            },
            {
              "t": "Its claim that mixed writing systems can use several sign functions.",
              "v": "wrong",
              "fb": "Mixed systems are well documented."
            },
            {
              "t": "Its use of sign counts and positional evidence in classification.",
              "v": "wrong",
              "fb": "Those remain productive analytical tools."
            },
            {
              "t": "Its refusal to compare scripts from different regions or periods.",
              "v": "wrong",
              "fb": "Cross-cultural comparison was central to the project."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "sc_epigrapher": {
      "sc_gallery": "Tuma kneels beside the display case with a raking lamp. “Croft’s drawing has three strokes the clay does not,” she says. “A decipherment cannot begin from signs added during copying.”",
      "sc_epigraphy": "In the epigraphy lab, Tuma aligns photographs taken under changing light. “A crack can masquerade as a wedge from one angle,” she says. “Real signs survive the whole image stack.”",
      "sc_study": "Tuma sets the original tablet beside Croft’s inked transcription. “He cleaned the line until it said what he needed,” she says. “The clay kept the mess he erased.”"
    },
    "sc_registrar": {
      "sc_gallery": "Ode opens the excavation register to a page patched with newer paper. “These showcase tablets were not logged with the palace archive,” she says. “Their context appears years later, in Croft’s handwriting.”",
      "sc_epigraphy": "Ode checks accession numbers against conservation photographs. “Objects have biographies,” she says. “When a tablet’s first chapter is missing, every later claim needs harder proof.”",
      "sc_study": "Ode lays shipping receipts beside the catalogue. “Croft handled the disputed pieces before the museum recorded them,” she says. “That does not decide the reading, but it changes who could shape the evidence.”"
    },
    "sc_statistician": {
      "sc_gallery": "Ven counts signs across the gallery labels rather than reading the translations. “The supposed royal names sit where quantities sit on every other tablet,” he says. “Position is evidence.”",
      "sc_epigraphy": "Ven projects a matrix of sign pairs across the wall. “Croft’s values work only in the highlighted line,” he says. “The untouched rows obey a different, repetitive grammar.”",
      "sc_study": "Ven slides the final grid across the desk. “Same prefixes, item columns, numerals, and totals,” he says. “A decipherment should make the boring rows readable too.”"
    }
  },
  "story": [
    "The <b>Karnos tablets</b> emerged from storage with a translation grand enough to rewrite a dynasty: a forgotten king, a victorious campaign, and an epic no ancient historian had mentioned. Under angled light, some celebrated signs begin to waver.",
    "You can consult <b>Epigrapher Tuma</b>, who knows every wedge and crack; <b>Registrar Ode</b>, who can reconstruct each object’s path from soil to case; and <b>Analyst Ven</b>, whose sign grids test whether a reading survives beyond one chosen line.",
    "Prof. Malden Croft, Dr. Sena, and the museum curator all have reasons to control the announcement. The inquiry is pulled toward <b>a lost royal epic naming a forgotten king</b> or toward <b>an unreadable script—meaningless marks</b>. Both verdicts are easier than making every sign answer to the full archive.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide the <b>WHAT</b> from the evidence."
  ],
  "endings": {
    "overclaimWhat": "sc_epic",
    "dismissalWhat": "sc_undecipherable",
    "win": {
      "expertTitle": "The Grid Holds",
      "expert": [
        "You identify <b>Prof. Malden Croft</b>, <b>the Decipherment Study</b>, and <b>a fabricated decipherment; the grid reads a plain ledger</b>. The alleged royal signs are absent from the clay, Croft’s values change without rules, and the repeated rows align with quantities, commodities, and totals. Not a lost royal epic. Not meaningless marks.",
        "Your accusation explains both seductions without overstating the evidence. Tuma establishes altered transcription, Ode places Croft in control before accession, and Ven shows that a stable grid reads untouched rows. The museum withdraws the epic, preserves the tablets, and publishes the administrative reading with its remaining uncertainties."
      ],
      "soundTitle": "A Reading That Repeats",
      "sound": [
        "You correctly name Prof. Malden Croft and the Decipherment Study. The claimed epic depends on inserted signs and shifting values, while the reproducible grid reveals a plain ledger rather than an unreadable script.",
        "The commission accepts the central finding. Your account leaves some provenance details unresolved, but it gives other scholars a sign system they can test on the rest of the archive."
      ],
      "namedTitle": "The Right Key",
      "named": [
        "You name Prof. Malden Croft, the Decipherment Study, and a fabricated decipherment whose grid reads a plain ledger. The conclusion is right, though you do not fully show how the photographs, accession history, and sign frequencies converge.",
        "The catalogue is halted. A stronger report must still demonstrate the evidential chain so the correction cannot be dismissed as rivalry between philologists."
      ]
    },
    "overclaim": {
      "title": "The King Who Existed Only in Translation",
      "body": [
        "You endorse the lost royal epic. Its finest lines rely on strokes absent from the tablets and on sign values that change whenever the narrative requires another word.",
        "The announcement turns a weak reading into cultural fact. When the fabrication is later exposed, legitimate work on the Karnos script is tainted by the spectacle, and the plain, testable patterns in the archive are treated as collateral damage."
      ]
    },
    "dismissal": {
      "title": "The Script You Declared Empty",
      "body": [
        "You dismiss the tablets as unreadable, meaningless marks. Yet repeated signs occupy stable item, quantity, and total positions, and Ven’s grid predicts rows Croft never published.",
        "By walking away, you confuse a false translation with the absence of writing. Croft’s fabrication survives as the only attempted reading, while the archive’s actual administrative language remains buried under cynicism."
      ]
    },
    "wrongNames": {
      "title": "The Text, Without Its Author",
      "body": [
        "You recognize that the epic was fabricated and that the grid yields a plain ledger, but you assign the act to the wrong person or room. The commission still needs the point where altered transcriptions, private custody, and the final sign key came together—"
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"Clay tablets beside a sign-frequency grid\"><path d=\"M58 30 Q118 18 178 30 L170 108 Q118 120 66 108 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M82 48 l18 -8 l14 12 l20 -10 l18 12 M82 70 l14 -8 l18 12 l18 -8 l16 10 M82 92 l18 -8 l16 10 l20 -8\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.3\"/><rect x=\"276\" y=\"26\" width=\"286\" height=\"86\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M276 54 H562 M276 82 H562 M332 26 V112 M388 26 V112 M444 26 V112 M500 26 V112\" stroke=\"#e2e2d8\" stroke-width=\"1\"/><path d=\"M388 54 L444 82 M444 54 L388 82\" stroke=\"#B3261E\" stroke-width=\"2\"/></svg>"
}};
