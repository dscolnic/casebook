module.exports = { PACK: {
  "id": "gmtroy",
  "title": "The Fall of Ilios",
  "discipline": "Greek Myth & the Archaeology of Troy",
  "teaser": "Schliemann tore into the mound at Hisarlik and pulled out a hoard of gold he crowned 'Priam's Treasure.' But nine cities are stacked in that mound — so which one is the Troy Homer sang of? The city with the gold, the city with the great walls, or the burnt and crowded city almost no one notices?",
  "overclaimTag": "Schliemann's gold — 'Priam's Treasure'",
  "truthTag": "the plain, burnt city that actually fell in war",
  "venue": "the Ilios inquiry",
  "agent": {
    "name": "Archivist Vale",
    "role": "Inquiry Notebook"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Scholars",
  "readingLabel": "Scholars of Troy & the Epics",
  "dossierName": "SCHOLARS OF TROY & THE EPICS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the fall of Troy",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The place you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "The gold layer and the grand-walled layer both dazzle; the city that actually fell in war is the shabby one nobody photographs.",
  "CATS": {
    "who": {
      "title": "Who first identified the site as Troy",
      "truth": "gm_calvert",
      "items": [
        {
          "id": "gm_calvert",
          "label": "Frank Calvert — who pointed to the mound first"
        },
        {
          "id": "gm_schl",
          "label": "Heinrich Schliemann — who took the fame"
        },
        {
          "id": "gm_dorp",
          "label": "Wilhelm Dörpfeld — Schliemann's architect and heir"
        }
      ]
    },
    "where": {
      "title": "Where the war-destruction lies",
      "truth": "gm_walls",
      "items": [
        {
          "id": "gm_walls",
          "label": "The citadel and the South Gate"
        },
        {
          "id": "gm_mound",
          "label": "The deep trench driven through the mound"
        },
        {
          "id": "gm_shore",
          "label": "The plain below and Beşik Bay"
        }
      ]
    },
    "what": {
      "title": "Which buried city is Homer's Troy",
      "truth": "gm_troy7",
      "items": [
        {
          "id": "gm_troy2",
          "label": "Troy II — the layer of Schliemann's gold, 'Priam's Treasure'"
        },
        {
          "id": "gm_troy6",
          "label": "Troy VI — the grand, high-walled fortress"
        },
        {
          "id": "gm_troy7",
          "label": "Troy VIIa — poorer and crowded, but burned, with weapons and unburied dead"
        }
      ]
    }
  },
  "PLACES": {
    "gm_shore": {
      "name": "The Achaean Camp",
      "xy": [
        140,
        90
      ]
    },
    "gm_walls": {
      "name": "The Walls of Troy",
      "xy": [
        330,
        240
      ]
    },
    "gm_mound": {
      "name": "The Excavated Mound (Hisarlik)",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "gm_shore",
      "gm_walls"
    ],
    [
      "gm_walls",
      "gm_mound"
    ]
  ],
  "CHARACTERS": {
    "gm_bard": {
      "name": "Kleio the Rhapsode",
      "role": "Keeper of the sung tradition",
      "face": "📜",
      "badge": "K",
      "legend": "the sung tradition",
      "hint": "Knows the epics cold — and where the poems were stitched, sung, and quietly changed over centuries."
    },
    "gm_digger": {
      "name": "Dr. Hale",
      "role": "Field archaeologist at Hisarlik",
      "face": "⛏",
      "badge": "H",
      "legend": "the dig",
      "hint": "Reads burn layers and wall courses; the ground keeps telling a plainer story than the songs do."
    },
    "gm_chron": {
      "name": "Prof. Wren",
      "role": "Historian of the Bronze Age",
      "face": "📚",
      "badge": "W",
      "legend": "the record",
      "hint": "Sets the tale against real kings, trade routes, and the collapse of an age."
    }
  },
  "TOPICMAP": {
    "gm_shore": {
      "gm_bard": [
        "gm_homer"
      ],
      "gm_digger": [
        "gm_schliemann"
      ],
      "gm_chron": [
        "gm_herodotus"
      ]
    },
    "gm_walls": {
      "gm_bard": [
        "gm_parry"
      ],
      "gm_digger": [
        "gm_blegen"
      ],
      "gm_chron": [
        "gm_euhemerus"
      ]
    },
    "gm_mound": {
      "gm_bard": [
        "gm_wilson"
      ],
      "gm_digger": [
        "gm_ventris"
      ],
      "gm_chron": [
        "gm_cline"
      ]
    }
  },
  "TOPICS": {
    "gm_homer": {
      "sci": "Homer (c. 8th century BC)",
      "topic": "The Iliad and the oral epic of the wrath",
      "lede": "The elusive poet whose war song made divine anger, human pride, and a ruined city inseparable.",
      "no": 1,
      "profile": "No secure biography of Homer survives. Ancient Greeks imagined him as a blind wandering singer, and several cities claimed him, but modern scholarship treats “Homer” cautiously: perhaps one extraordinary poet, perhaps a name attached to a long tradition, perhaps both. The Iliad reached something like its surviving form around the eighth century BC, centuries after the Late Bronze Age world it evokes. Its subject is not the whole Trojan War. It begins with the wrath of Achilles and ends with the burial of Hector, before Troy falls.\n\nThe poem was built for performance in dactylic hexameter. Repeated phrases such as “swift-footed Achilles” or “rosy-fingered Dawn” fit useful metrical spaces, but they are more than padding. They help a singer shape scenes, recall inherited material, and vary a story before an audience. The gods intervene constantly—Athena restrains Achilles, Apollo sends plague, Zeus weighs fates—yet the poem also insists on human decisions. Agamemnon humiliates Achilles; Hector remains outside the walls; warriors choose honor, pity, or revenge.\n\nHomeric poetry preserves Bronze Age memories beside later customs. Bronze weapons coexist with social practices more familiar from the early Iron Age. Places and names may be old, while speeches and institutions reflect generations of retelling. That mixture is what an oral tradition naturally produces: it conserves memorable forms while adapting them to new listeners.\n\nReading Homer historically therefore requires two disciplines at once. The Iliad is evidence for Greek memory and poetic values, not a battlefield report. Its gods cannot simply be converted into weather reports or officers, but neither does divine action erase the poem’s close attention to logistics, wounds, walls, bargaining, and human motive. The song’s power comes from binding mythic explanation to recognizable choices.",
      "frame": "Kleio draws a plectrum across the lyre strings. \"Do not confuse what the song explains with what the song records. Show me you can hear both layers at once.\"",
      "q": [
        {
          "q": "What event actually drives the plot of the Iliad?",
          "o": [
            {
              "t": "Achilles' quarrel with Agamemnon and the consequences of his wrath.",
              "v": "expert",
              "fb": "The Iliad is organized around Achilles' anger, withdrawal, return, and reconciliation."
            },
            {
              "t": "The building of the wooden horse and the secret opening of Troy's gates.",
              "v": "danger",
              "fb": "The horse belongs to later parts of the Trojan cycle, not the Iliad's central action."
            },
            {
              "t": "The entire ten-year war, from Helen's departure through Troy's destruction.",
              "v": "partial",
              "fb": "The war forms the background, but the poem covers only a short episode near its end."
            },
            {
              "t": "A contest among the gods to decide which city will rule the Aegean world.",
              "v": "wrong",
              "fb": "Divine rivalries matter, but no such contest supplies the poem's narrative structure."
            }
          ]
        },
        {
          "q": "Why do fixed epithets recur so often in Homeric verse?",
          "o": [
            {
              "t": "They helped oral poets compose metrically while drawing on inherited diction.",
              "v": "expert",
              "fb": "Formulaic phrases fit the meter and supported composition during performance."
            },
            {
              "t": "They were secret markers inserted by Alexandrian editors to identify sources.",
              "v": "wrong",
              "fb": "The formulas belong to the poetic tradition, long before Alexandrian scholarship."
            },
            {
              "t": "They proved every named hero was a historical person with a fixed title.",
              "v": "danger",
              "fb": "A traditional epithet is a poetic tool, not a certificate of historicity."
            },
            {
              "t": "They allowed scribes to replace damaged lines without changing the manuscript.",
              "v": "partial",
              "fb": "Scribes could use familiar language, but oral composition best explains the system."
            }
          ]
        },
        {
          "q": "How should divine intervention in the Iliad be read historically?",
          "o": [
            {
              "t": "As poetic causation intertwined with detailed human choices and consequences.",
              "v": "expert",
              "fb": "The poem lets gods and human agency operate together rather than canceling either."
            },
            {
              "t": "As literal eyewitness evidence that Olympian beings fought beside the armies.",
              "v": "danger",
              "fb": "Epic theology expresses meaning within the story; it is not independent observation."
            },
            {
              "t": "As decorative fantasy that can be removed without changing the poem's logic.",
              "v": "wrong",
              "fb": "The gods organize motives, values, and outcomes throughout the poem."
            },
            {
              "t": "As encrypted names for officers whose identities were lost during transmission.",
              "v": "partial",
              "fb": "Some myths may preserve transformed memories, but one-to-one decoding is unsupported."
            }
          ]
        }
      ]
    },
    "gm_schliemann": {
      "sci": "Heinrich Schliemann (1822–1890)",
      "topic": "Digging for Troy — discovery and self-mythologizing",
      "lede": "The merchant-adventurer who found ancient Troy while cutting through it too quickly and narrating himself as hero.",
      "no": 2,
      "profile": "Heinrich Schliemann made a fortune in commerce before turning his wealth and restless ambition toward archaeology. Convinced that Homer preserved real geography, he focused on Hisarlik in northwestern Anatolia, a mound already identified as a strong candidate for Troy by scholars including Frank Calvert. Schliemann began major excavations there in 1870. He later presented the search as the fulfillment of a childhood vow, but parts of that heroic autobiography are difficult to verify and were polished for effect.\n\nHis excavation exposed something decisive: Hisarlik contained many ancient settlements stacked one above another. Yet his methods were destructive even by the developing standards of his time. A huge trench drove through later levels because he expected Homer's Troy near the bottom. In 1873 he announced a rich metal assemblage as “Priam's Treasure.” The objects came from Troy II, roughly a millennium too early for the conventional setting of the Trojan War. His famous account of his wife Sophia carrying the treasure away in her shawl cannot be literal, because she was not at the site that day.\n\nSchliemann also dug at Mycenae, where he uncovered wealthy shaft graves and the gold mask popularly called the “Mask of Agamemnon.” Those burials were real and important, though the personal identifications were not established. His appetite for Homeric names made discoveries vivid while encouraging claims beyond the evidence.\n\nSchliemann's legacy is therefore double. He helped demonstrate that the places behind Greek epic belonged to substantial Bronze Age worlds, and his publicity transformed public interest in Aegean archaeology. He also destroyed contexts, misdated finds, minimized predecessors, and turned excavation into personal legend. Archaeology advanced not by choosing between “visionary” and “fraud,” but by separating the mound, layers, and objects from the story their excavator told about himself.",
      "frame": "Rubs a thumb across the edge of Schliemann's great trench. \"Finding the mound was not the same as identifying the layer. Separate the discovery from the performance.\"",
      "q": [
        {
          "q": "What did Schliemann establish most securely at Hisarlik?",
          "o": [
            {
              "t": "The mound contained a long sequence of substantial ancient settlements.",
              "v": "expert",
              "fb": "His excavations revealed multiple cities, even though he misidentified key levels."
            },
            {
              "t": "Priam's palace and the wooden horse survived together in the lowest layer.",
              "v": "danger",
              "fb": "Neither claim is supported, and the lowest levels long predate a Homeric war."
            },
            {
              "t": "Every geographical detail in the Iliad matched the excavated landscape exactly.",
              "v": "wrong",
              "fb": "Some geography is suggestive, but epic description is not a precise site plan."
            },
            {
              "t": "The richest treasure would belong to the latest city because wealth accumulates.",
              "v": "partial",
              "fb": "Stratigraphy, not richness, determines sequence; the treasure belonged to Troy II."
            }
          ]
        },
        {
          "q": "Why is 'Priam's Treasure' a misleading name?",
          "o": [
            {
              "t": "Its archaeological level is about a millennium earlier than a likely Trojan War.",
              "v": "expert",
              "fb": "The assemblage came from Troy II, far earlier than the Late Bronze Age setting."
            },
            {
              "t": "The objects were modern replicas commissioned for Schliemann's museum display.",
              "v": "wrong",
              "fb": "The objects are ancient; the problem is their date and attribution."
            },
            {
              "t": "The treasure came from Mycenae and was secretly moved to Hisarlik afterward.",
              "v": "danger",
              "fb": "No such transfer explains the find; it was excavated at Hisarlik."
            },
            {
              "t": "Priam is named mainly in Roman poetry and rarely appears in early Greek epic.",
              "v": "partial",
              "fb": "Priam is central in the Iliad, but the treasure cannot be linked to him."
            }
          ]
        },
        {
          "q": "What is the best assessment of Schliemann's archaeological legacy?",
          "o": [
            {
              "t": "Major discoveries were paired with destructive methods and inflated claims.",
              "v": "expert",
              "fb": "His work opened the field while also damaging contexts and overstating identities."
            },
            {
              "t": "His errors cancel every observation, so Hisarlik offers no historical evidence.",
              "v": "danger",
              "fb": "Later archaeology corrected him and recovered much reliable evidence from the site."
            },
            {
              "t": "His faith in Homer made his dates accurate despite the absence of stratigraphy.",
              "v": "wrong",
              "fb": "Conviction cannot substitute for dating, context, and comparative material."
            },
            {
              "t": "His mainly contribution was publicity; other excavators found all physical remains.",
              "v": "partial",
              "fb": "Publicity mattered, but he also uncovered major structures and assemblages."
            }
          ]
        }
      ]
    },
    "gm_herodotus": {
      "sci": "Herodotus (c. 484–c. 425 BC)",
      "topic": "Inquiry — sifting legend for what can be checked",
      "lede": "The traveler-historian who preserved competing stories and made disagreement part of historical inquiry.",
      "no": 3,
      "profile": "Herodotus called his work an historia—an inquiry—into the causes and memorable deeds of the Greek struggle against the Persian Empire. Writing in the fifth century BC, he traveled, questioned informants, described monuments and customs, and compared stories from different communities. He is famous for marvels and digressions, but also for signaling uncertainty: “I am obliged to report what is said, but I am not obliged to believe it.” The exact wording varies by translation; the habit of distinction is unmistakable.\n\nHis treatment of Helen shows how he handled epic tradition. In Book 2 of the Histories, Herodotus reports an Egyptian account in which Helen never reached Troy. Paris was driven to Egypt, where the ruler detained Helen and her wealth; the Trojans therefore could not return her to the Greeks. Herodotus reasons that Priam would not have sacrificed his city merely to protect Paris, and he suggests Homer knew an alternative version but chose the one better suited to epic poetry.\n\nThis argument is not modern source criticism in full form. Herodotus sometimes trusts priests, oral reports, or plausible reasoning where independent confirmation is impossible. Yet he does not treat tradition as a single block. He identifies speakers, compares versions, examines motive, and asks whether conduct makes sense. A story can be culturally important without being factually uniform.\n\nHerodotus offers a useful model for reading legends around real places. Preserve variants before harmonizing them. Ask who tells each version and what it explains. Compare claims with geography, institutions, and ordinary incentives. Then state the degree of confidence rather than disguising conjecture as certainty. Historical inquiry begins not when stories disappear, but when their differences become evidence.",
      "frame": "Closes one scroll and opens another. \"The versions disagree. Good. That gives us something to test rather than something to smooth away.\"",
      "q": [
        {
          "q": "What does Herodotus often do when sources conflict?",
          "o": [
            {
              "t": "He reports distinct versions, identifies their sources, and weighs plausibility.",
              "v": "expert",
              "fb": "Herodotus frequently preserves disagreement instead of silently merging accounts."
            },
            {
              "t": "He chooses the most miraculous version because wonder indicates antiquity.",
              "v": "danger",
              "fb": "He enjoys marvels, but often marks doubt and offers competing explanations."
            },
            {
              "t": "He deletes all oral testimony and accepts mainly inscribed official documents.",
              "v": "wrong",
              "fb": "Much of his evidence is oral, observational, or comparative."
            },
            {
              "t": "He treats every community's account as equally true in every factual detail.",
              "v": "partial",
              "fb": "He preserves voices but also judges credibility and reasoning."
            }
          ]
        },
        {
          "q": "What alternative story about Helen appears in Herodotus?",
          "o": [
            {
              "t": "She was detained in Egypt, so Troy could not return her to the Greeks.",
              "v": "expert",
              "fb": "Herodotus records and argues for an Egyptian version in which Helen was absent from Troy."
            },
            {
              "t": "She stayed in Sparta while a goddess made the Trojan city an illusion.",
              "v": "danger",
              "fb": "That is not the Egyptian account Herodotus presents."
            },
            {
              "t": "She ruled Troy after Priam died and negotiated peace with Agamemnon.",
              "v": "wrong",
              "fb": "No such episode forms Herodotus's alternative narrative."
            },
            {
              "t": "She reached Troy but left before the war aboard a Phoenician merchant ship.",
              "v": "partial",
              "fb": "Phoenician abduction tales appear elsewhere, but not as this specific account."
            }
          ]
        },
        {
          "q": "Why is Herodotus useful for studying myth and history together?",
          "o": [
            {
              "t": "He treats variants, motives, and named informants as material for inquiry.",
              "v": "expert",
              "fb": "His method turns differences among traditions into questions that can be assessed."
            },
            {
              "t": "He suggests that a reasonable-sounding story would be historically exact.",
              "v": "danger",
              "fb": "Plausibility is evidence to weigh, not final proof."
            },
            {
              "t": "He demonstrates that poetry should generally override archaeology and geography.",
              "v": "wrong",
              "fb": "He compares literary tradition with places, customs, and alternative testimony."
            },
            {
              "t": "He eliminates uncertainty by assigning every legend one authoritative version.",
              "v": "partial",
              "fb": "His work often preserves uncertainty rather than abolishing it."
            }
          ]
        }
      ]
    },
    "gm_parry": {
      "sci": "Milman Parry (1902–1935)",
      "topic": "Oral-formulaic composition — how epics were built to be sung",
      "lede": "The young classicist who listened to living singers and changed how scholars understood Homer's repeated language.",
      "no": 4,
      "profile": "Milman Parry began with a technical puzzle: why does Homer so often pair the same heroes and gods with the same epithets? Studying the distribution of phrases in dactylic hexameter, he argued that expressions such as “swift-footed Achilles” belonged to a highly economical system of formulas. For a given person, grammatical case, and metrical space, the tradition supplied ready phrases that were useful in composing verse. Their repetition was not evidence of careless copying; it revealed how the poetry had been made.\n\nParry's early work was based on the Greek texts, but he wanted comparative evidence from a living oral tradition. In the 1930s he traveled in the former Yugoslavia with his student Albert Lord and recorded South Slavic guslari, singers who performed long heroic narratives. Using aluminum discs and written transcriptions, they documented poets composing during performance from inherited themes and formulas. A singer could tell the same story again at different length and with changed wording without memorizing a fixed text.\n\nThe comparison did not make South Slavic epic identical to Homer. Languages, meters, societies, and performance settings differed. Its force was methodological: it showed that lengthy, structured poetry could be created orally through traditional technique. Parry died in 1935 at thirty-three, before publishing the full results. Lord carried the project forward in The Singer of Tales, and Parry's recordings became a major archive of oral literature.\n\nOral-formulaic theory changed the “Homeric Question.” Instead of asking only whether one author or several wrote the poems, scholars could investigate how a tradition produced, transmitted, and eventually textualized them. A formula can preserve old language while serving a new performance. Variation is therefore not mere corruption; it may be the normal life of an oral poem before a written version becomes dominant.",
      "frame": "Kleio repeats one line twice, changing its ending to fit the melody. \"A singer does not carry a scroll inside the skull. Tell me what tradition supplies instead.\"",
      "q": [
        {
          "q": "What did Parry mean by a Homeric formula?",
          "o": [
            {
              "t": "A traditional phrase shaped to express an idea within a metrical slot.",
              "v": "expert",
              "fb": "Parry linked recurring expressions to the practical demands of oral hexameter."
            },
            {
              "t": "A secret numerical code that identifies the date of each episode's composition.",
              "v": "danger",
              "fb": "Formulaic diction is linguistic and metrical, not a hidden chronology."
            },
            {
              "t": "A line copied mechanically by scribes whenever a manuscript had a gap.",
              "v": "wrong",
              "fb": "The system originated in poetic composition, not manuscript repair."
            },
            {
              "t": "A ceremonial oath that performers swore before reciting heroic poetry.",
              "v": "partial",
              "fb": "Performance customs matter, but this is not Parry's technical meaning."
            }
          ]
        },
        {
          "q": "What did Parry's fieldwork among South Slavic singers demonstrate?",
          "o": [
            {
              "t": "Long epics could be composed in performance from formulas and themes.",
              "v": "expert",
              "fb": "The recordings showed structured oral creation without verbatim memorization."
            },
            {
              "t": "Every singer reproduced a single master text without changing one syllable.",
              "v": "wrong",
              "fb": "Performances varied in wording and length while retaining traditional structure."
            },
            {
              "t": "Homer personally traveled in the Balkans and learned the songs recorded there.",
              "v": "danger",
              "fb": "The comparison concerns analogous technique, not direct contact with Homer."
            },
            {
              "t": "Writing was required before any performer could sustain a lengthy narrative.",
              "v": "partial",
              "fb": "The fieldwork supplied strong evidence that oral technique could support long poems."
            }
          ]
        },
        {
          "q": "How did Parry's work reshape the Homeric Question?",
          "o": [
            {
              "t": "It shifted attention toward the traditional process behind the surviving texts.",
              "v": "expert",
              "fb": "Authorship remained important, but oral composition and transmission became central."
            },
            {
              "t": "It proved that the Iliad was dictated in one sitting exactly as we possess it.",
              "v": "danger",
              "fb": "Oral theory does not establish a single unchanged dictation event."
            },
            {
              "t": "It showed that repeated phrases were later additions by careless editors.",
              "v": "wrong",
              "fb": "Parry treated the formulas as fundamental to the poetry's composition."
            },
            {
              "t": "It ended all debate about when and how the poems became written texts.",
              "v": "partial",
              "fb": "The theory transformed the debate but did not settle every stage of textualization."
            }
          ]
        }
      ]
    },
    "gm_blegen": {
      "sci": "Carl Blegen (1887–1971)",
      "topic": "Troy VIIa — a layer destroyed by war",
      "lede": "The careful excavator who separated an earthquake-struck fortress from a cramped city later destroyed in fire.",
      "no": 5,
      "profile": "Carl Blegen was an American archaeologist associated with the University of Cincinnati and a veteran excavator in Greece before he returned to Troy. From 1932 to 1938, his team conducted systematic campaigns at Hisarlik, refining the site's stratigraphy and pottery sequence. Blegen's publications made the numbered cities more precise by dividing them into phases and documenting architecture, deposits, and finds with standards far stronger than those of Schliemann's first campaigns.\n\nHis interpretation distinguished the ends of Troy VI and Troy VIIa. Troy VI had massive fortifications and impressive houses, but Blegen saw evidence that its final phase was ruined by earthquake: walls were displaced, stones tumbled in characteristic ways, and clear signs of a successful assault seemed limited. The settlement was rebuilt as Troy VIIa. Within the old defenses, rooms were subdivided, houses crowded together, and large storage vessels were sunk into floors, features Blegen interpreted as preparation for pressure or siege.\n\nTroy VIIa ended in destruction by fire around the transition from the thirteenth to the twelfth century BC. Human remains and damage led Blegen to favor warfare, making this phase his candidate for the city behind the Trojan War. Later researchers have revised dates and debated individual indicators. Storage can have several causes; fire does not name an attacker; an earthquake and conflict need not be mutually exclusive across phases. No destruction layer identifies Achilles, Priam, or a wooden horse.\n\nBlegen's importance lies in the cumulative argument. A historical interpretation should emerge from many observations that agree—construction sequence, ceramics, damage, storage, demography, and chronology. Each clue is ambiguous alone. Together they can distinguish plausible scenarios without turning a burnt layer into a line-by-line confirmation of epic.",
      "frame": "Sets two trays on the bench: fallen masonry from one phase, burned debris from another. \"Disaster is not one archaeological signature. Diagnose the layer before naming the cause.\"",
      "q": [
        {
          "q": "How did Blegen distinguish the ends of Troy VI and Troy VIIa?",
          "o": [
            {
              "t": "He read Troy VI as earthquake-damaged and VIIa as violently burned.",
              "v": "expert",
              "fb": "Different patterns of destruction led him to different explanations for the phases."
            },
            {
              "t": "He found written labels stating 'earthquake' in VI and 'war' in VIIa.",
              "v": "danger",
              "fb": "No such contemporary explanatory labels were recovered."
            },
            {
              "t": "He assumed every collapsed wall meant battle and every fire meant accident.",
              "v": "wrong",
              "fb": "His interpretation depended on structural and contextual patterns."
            },
            {
              "t": "He treated both phases as simultaneous districts of one undamaged settlement.",
              "v": "partial",
              "fb": "The phases are sequential, with VIIa rebuilding after Troy VI."
            }
          ]
        },
        {
          "q": "Why did Blegen regard Troy VIIa as a possible siege settlement?",
          "o": [
            {
              "t": "Crowded rooms and abundant storage suggested a community under pressure.",
              "v": "expert",
              "fb": "Subdivision and storage were interpreted as preparations for difficult conditions."
            },
            {
              "t": "A tablet inside the gate recorded the names of the besieging Achaean kings.",
              "v": "danger",
              "fb": "No such narrative tablet has been found at Troy."
            },
            {
              "t": "Every house contained identical bronze armor issued by a centralized army.",
              "v": "wrong",
              "fb": "The material assemblage does not show such uniform military equipment."
            },
            {
              "t": "Its defenses were newly built after the city had already been abandoned.",
              "v": "partial",
              "fb": "Troy VIIa reused the formidable defenses of Troy VI."
            }
          ]
        },
        {
          "q": "What limit remains on interpreting Troy VIIa's destruction?",
          "o": [
            {
              "t": "Fire and damage can support conflict without identifying the attackers or story.",
              "v": "expert",
              "fb": "Archaeology can establish destruction more readily than named participants."
            },
            {
              "t": "A destruction layer suggests every episode in the Iliad happened at that phase.",
              "v": "danger",
              "fb": "Matching a broad event does not authenticate poetic detail."
            },
            {
              "t": "Burned buildings does not result from warfare in any archaeological setting.",
              "v": "wrong",
              "fb": "Warfare is one possible cause of urban burning."
            },
            {
              "t": "Precise pottery dates make all questions of motive and agency unnecessary.",
              "v": "partial",
              "fb": "Chronology narrows possibilities but does not by itself reveal motive or identity."
            }
          ]
        }
      ]
    },
    "gm_euhemerus": {
      "sci": "Euhemerus (fl. c. 300 BC)",
      "topic": "Euhemerism — gods as remembered mortals",
      "lede": "The Hellenistic writer whose imaginary voyage turned gods into ancient rulers magnified by memory.",
      "no": 6,
      "profile": "Euhemerus was a writer of the late fourth or early third century BC, probably connected with the court of Cassander of Macedon. His main work, the Sacred History, survives only in fragments and later summaries, including a Latin adaptation by Ennius. It described a voyage to a distant island called Panchaea, where the narrator found a golden inscription recording the deeds of Uranus, Cronus, Zeus, and other figures.\n\nIn this account, the gods had once been exceptional mortal rulers or benefactors. Zeus traveled, founded institutions, defeated enemies, and was honored after death. Worship grew from commemoration, royal power, and gratitude. The strategy gave myth a historical-looking foundation while also commenting on the politics of divine honors in the Hellenistic world, where rulers could receive cult. The voyage and inscription lent authority to the interpretation even though Panchaea belonged to imaginative geography.\n\nLater readers turned Euhemerus's name into “euhemerism”: the explanation of gods as deified humans and myths as distorted memories of historical events. Early Christian authors sometimes used the method polemically, arguing that pagan gods were merely dead rulers rather than true divinities. Modern popular accounts often extend it further, decoding every monster, miracle, or deity as a disguised person or technology.\n\nEuhemerism can be a useful question, not a universal key. Hero cult, ancestor memory, ruler worship, and historical reputation clearly can contribute to divine stories. But Greek gods also embody natural forces, ritual roles, social categories, and inherited narrative patterns. A myth may combine several processes. Euhemerus teaches how rationalization works: it preserves the outline of a sacred story while replacing supernatural agency with political biography. That replacement reveals as much about the interpreter's age as about the myth's origin.",
      "frame": "Smiles at the golden inscription in Euhemerus's impossible island. \"A rational explanation can be another crafted story. Test the key before using it on every lock.\"",
      "q": [
        {
          "q": "What is the core claim associated with Euhemerism?",
          "o": [
            {
              "t": "Some gods began as remarkable mortals later honored as divine.",
              "v": "expert",
              "fb": "Euhemerus recast divine figures as ancient rulers and benefactors."
            },
            {
              "t": "All gods are planets whose orbital periods were encoded in genealogies.",
              "v": "danger",
              "fb": "Astral interpretations exist, but that is not Euhemerus's defining method."
            },
            {
              "t": "Myths have no relation to society and should be excluded from history.",
              "v": "wrong",
              "fb": "Euhemerus offered a social and political origin for divine worship."
            },
            {
              "t": "Every ancient king was a priest impersonating a god during ritual.",
              "v": "partial",
              "fb": "Ruler cult can matter, but the universal impersonation claim is unsupported."
            }
          ]
        },
        {
          "q": "How did the Sacred History present its authority?",
          "o": [
            {
              "t": "A traveler found an inscription on Panchaea recording mortal divine careers.",
              "v": "expert",
              "fb": "The fictional voyage and inscription framed the rationalized theology."
            },
            {
              "t": "Euhemerus excavated Zeus's signed tomb beneath the Athenian Acropolis.",
              "v": "danger",
              "fb": "No such excavation underlies the work."
            },
            {
              "t": "A Delphic oracle dictated a complete chronological list of Olympic gods.",
              "v": "wrong",
              "fb": "The surviving account centers on Panchaea and its inscription."
            },
            {
              "t": "Roman senators supplied archives proving Greek cults began under the Republic.",
              "v": "partial",
              "fb": "Roman authors preserved Euhemerus, but his story was earlier and Hellenistic."
            }
          ]
        },
        {
          "q": "What is the main limitation of applying Euhemerism?",
          "o": [
            {
              "t": "Not every deity or myth can be reduced to a disguised historical person.",
              "v": "expert",
              "fb": "Greek religion also reflects ritual, nature, social structures, and poetic inheritance."
            },
            {
              "t": "It fails mainly because ancient rulers were rarely given worship after death.",
              "v": "wrong",
              "fb": "Ruler and hero cults show that mortals could receive divine honors."
            },
            {
              "t": "It suggests supernatural claims literally whenever a king's name is preserved.",
              "v": "danger",
              "fb": "A possible historical memory does not authenticate supernatural details."
            },
            {
              "t": "It can explain political myths but would rarely be compared with ritual evidence.",
              "v": "partial",
              "fb": "Ritual evidence is essential for judging how divine identities functioned."
            }
          ]
        }
      ]
    },
    "gm_wilson": {
      "sci": "Emily Wilson (b. 1971)",
      "topic": "Translation — how each age remakes the myth",
      "lede": "The translator who made Homer's familiar heroes newly strange by choosing clarity over inherited English grandeur.",
      "no": 7,
      "profile": "Emily Wilson is a classicist, literary scholar, and translator whose work examines ancient texts alongside their long afterlives. Her 2017 Odyssey was the first complete English translation of that poem published by a woman. She followed it with an Iliad in 2023. Both translations use regular iambic pentameter rather than imitating Greek dactylic hexameter, and both aim for direct, performable English without pretending that simplicity is neutrality.\n\nTranslation begins with choices that no dictionary can settle automatically. The first word of the Odyssey, andra, means “man,” but the poem immediately complicates what kind of man Odysseus is. Polytropos can suggest “much-turned,” versatile, wandering, or wily. Wilson's opening calls him a “complicated man,” foregrounding moral and psychological ambiguity. Elsewhere she pays close attention to status. The enslaved women killed at the poem's end are not softened into merely disloyal “maids,” and terms for slaves, servants, strangers, and nobles are rendered with their inequalities visible.\n\nHer work also demonstrates how earlier English Homers reflect their own moments. Victorian elevation, modernist compression, martial masculinity, and contemporary plainness all reshape tone. Even line count matters: Wilson keeps her Odyssey to the same number of lines as the Greek, resisting expansion that can quietly add explanation. Reviews and scholars debate individual decisions, as they should; a translation is an argument conducted word by word.\n\nTranslation does not simply carry an ancient object unchanged across time. It chooses rhythm, register, ambiguity, and emphasis for a new audience. Comparing versions can reveal where the Greek permits several readings and where English tradition has made one interpretation seem inevitable. The differences among translations are therefore evidence about reception as well as language.",
      "frame": "Kleio places three English openings beside the same Greek line. \"They cannot all sound alike, yet each claims Homer. Show me where translation becomes interpretation.\"",
      "q": [
        {
          "q": "What does Wilson's phrase 'a complicated man' translate?",
          "o": [
            {
              "t": "Polytropos, a word suggesting versatility, wandering, and cunning.",
              "v": "expert",
              "fb": "Her choice emphasizes the Greek adjective's moral and semantic complexity."
            },
            {
              "t": "Andra, the ordinary noun for man, with no descriptive adjective attached.",
              "v": "partial",
              "fb": "Andra is present, but 'complicated' responds to polytropos."
            },
            {
              "t": "A later Byzantine title added to praise Odysseus as a Christian thinker.",
              "v": "wrong",
              "fb": "The word belongs to the ancient opening of the Odyssey."
            },
            {
              "t": "An inscription from Ithaca that identifies the historical king's personality.",
              "v": "danger",
              "fb": "The phrase is a translation choice, not archaeological testimony."
            }
          ]
        },
        {
          "q": "Why can translating social status change a reader's interpretation?",
          "o": [
            {
              "t": "Words like slave, servant, and maid carry different power relationships.",
              "v": "expert",
              "fb": "Wilson makes inequalities explicit where older English can blur them."
            },
            {
              "t": "Greek epic rarely distinguishes free people from enslaved household workers.",
              "v": "wrong",
              "fb": "Status distinctions are pervasive in the poems."
            },
            {
              "t": "Modern translators may assign nobility mainly to characters they personally admire.",
              "v": "danger",
              "fb": "Responsible translation follows the Greek, though wording still frames perception."
            },
            {
              "t": "Status matters mainly in legal documents and has no effect on narrative ethics.",
              "v": "partial",
              "fb": "Hierarchy shapes agency, punishment, labor, and sympathy throughout epic."
            }
          ]
        },
        {
          "q": "What does comparison among Homer translations reveal?",
          "o": [
            {
              "t": "Each version makes interpretive choices about rhythm, tone, and ambiguity.",
              "v": "expert",
              "fb": "Translation is constrained by Greek but cannot avoid consequential decisions."
            },
            {
              "t": "The newest version automatically recovers the poet's exact original voice.",
              "v": "danger",
              "fb": "No English version can reproduce every feature of the Greek or its performance."
            },
            {
              "t": "Differences suggests that the ancient text itself contains no stable wording.",
              "v": "wrong",
              "fb": "A comparatively stable Greek text can still permit many translations."
            },
            {
              "t": "mainly prose translations interpret; verse translations transfer meaning directly.",
              "v": "partial",
              "fb": "Both prose and verse make interpretive choices."
            }
          ]
        }
      ]
    },
    "gm_ventris": {
      "sci": "Michael Ventris (1922–1956)",
      "topic": "Deciphering Linear B — the Greeks behind the legend",
      "lede": "The architect-codebreaker who proved that palace accountants were writing Greek centuries before Homer.",
      "no": 8,
      "profile": "Michael Ventris was an English architect with a lifelong fascination for Linear B, the script found on clay tablets from Bronze Age Crete and mainland Greece. Arthur Evans had distinguished it from the earlier Linear A but believed the language was probably not Greek. Ventris approached the problem through sign patterns, place-name hypotheses, and the structural groundwork of other researchers, especially Alice Kober, whose meticulous grids revealed recurring endings and relationships among words.\n\nIn 1952 Ventris announced that Linear B represented an early form of Greek. He tested proposed sound values against tablets from different sites and found recognizable place names and vocabulary. The decipherment was strengthened when additional evidence, including tablets from Pylos, produced forms that made sense in Greek. John Chadwick, a classicist and linguist, collaborated with Ventris to refine and publish the interpretation.\n\nThe tablets transformed knowledge of the Mycenaean world. They record allocations, livestock, personnel, land, textiles, offerings, weapons, and palace administration. They include names of several gods later familiar from Greek religion. They do not contain epics, royal chronicles, or accounts of the Trojan War. Most tablets survived accidentally because fires baked clay records that were ordinarily temporary. Their bureaucratic language differs sharply from Homeric verse.\n\nLinear B proved that Greek speakers operated palace states during the Late Bronze Age, narrowing the cultural distance between the Mycenaean world and later Greek tradition. It did not prove that Homer preserved an exact Mycenaean archive. Decipherment works when proposed values generate a coherent system across many documents, not when a few signs can be made to resemble a desired name. Ventris's achievement joined pattern analysis, cautious guessing, and relentless cross-checking.",
      "frame": "Lays Kober's grids beside Ventris's sign values. \"A decipherment earns trust by working everywhere, not by producing one exciting name.\"",
      "q": [
        {
          "q": "What did Ventris demonstrate about Linear B?",
          "o": [
            {
              "t": "It recorded an early form of Greek used by Mycenaean palace administrations.",
              "v": "expert",
              "fb": "The decipherment connected the tablets with Greek language and bureaucracy."
            },
            {
              "t": "It was a secret alphabet invented by Homer to preserve the Iliad verbatim.",
              "v": "danger",
              "fb": "The tablets are centuries earlier and contain administrative records, not epic."
            },
            {
              "t": "It represented Latin brought to Crete by merchants from republican Rome.",
              "v": "wrong",
              "fb": "Latin and republican Rome are far later than Linear B."
            },
            {
              "t": "It was identical to Linear A, whose underlying language is now fully known.",
              "v": "partial",
              "fb": "The scripts are related, but Linear A remains undeciphered as a language."
            }
          ]
        },
        {
          "q": "What contribution did Alice Kober make before Ventris's breakthrough?",
          "o": [
            {
              "t": "She charted recurring sign patterns and endings that exposed grammatical structure.",
              "v": "expert",
              "fb": "Kober's systematic grids supplied crucial constraints for later decipherment."
            },
            {
              "t": "She excavated the first tablets and translated them immediately as Homeric songs.",
              "v": "wrong",
              "fb": "Evans's excavations found many tablets, and Kober did not claim an epic translation."
            },
            {
              "t": "She invented Greek words to fit each sign cluster without testing repetition.",
              "v": "danger",
              "fb": "Her work was notable for disciplined pattern analysis and restraint."
            },
            {
              "t": "She proved the script contained no vowels and therefore could not represent Greek.",
              "v": "partial",
              "fb": "Linear B is a syllabic script with limitations, but it does represent Greek."
            }
          ]
        },
        {
          "q": "What kind of information dominates Linear B tablets?",
          "o": [
            {
              "t": "Inventories, personnel, offerings, land, livestock, and palace allocations.",
              "v": "expert",
              "fb": "The surviving tablets are administrative documents from palace economies."
            },
            {
              "t": "A continuous heroic narrative describing the siege and capture of Troy.",
              "v": "danger",
              "fb": "No Trojan epic or narrative chronicle appears in Linear B."
            },
            {
              "t": "Philosophical dialogues about democracy written for public performance.",
              "v": "wrong",
              "fb": "The tablets predate classical philosophy and serve bureaucratic purposes."
            },
            {
              "t": "Private love letters exchanged among sailors throughout the Aegean world.",
              "v": "partial",
              "fb": "Personal correspondence is not the characteristic Linear B genre."
            }
          ]
        }
      ]
    },
    "gm_cline": {
      "sci": "Eric H. Cline (b. 1960)",
      "topic": "1177 BC and the Late Bronze Age collapse",
      "lede": "The archaeologist who explains the Bronze Age collapse as an interconnected systems failure, not one invading horde.",
      "no": 9,
      "profile": "Eric H. Cline is an archaeologist and ancient historian whose research spans the Late Bronze Age Aegean and eastern Mediterranean. He has excavated at sites including Megiddo and Tel Kabri and has written on international trade, diplomacy, warfare, Troy, and archaeological method. His widely read book 1177 BC: The Year Civilization Collapsed presents the end of the Bronze Age to a broad audience while emphasizing uncertainty and interaction among causes.\n\nAround 1200 BC, palaces and cities across Greece, Anatolia, the Levant, and neighboring regions were destroyed, abandoned, or transformed. The Hittite Empire disappeared; Mycenaean palace administration ended; trade networks contracted; and writing vanished in some areas for centuries. Egyptian inscriptions describe attacks involving groups conventionally called the Sea Peoples, but those texts do not provide a complete regional explanation.\n\nCline argues against a single-cause story. Earthquakes, drought, famine, migration, warfare, internal rebellion, political failure, and disrupted trade may have combined. The Late Bronze Age powers were deeply connected through exchange of metals, luxury goods, grain, diplomatic marriages, and specialist labor. Interdependence brought prosperity but could also transmit shocks. In systems language, several stresses arriving close together can push a complex network beyond its capacity to recover.\n\nThe date 1177 BC is a useful dramatic marker, associated with the reign of Ramesses III and conflict recorded in Egypt, not a claim that every civilization collapsed in one calendar year. Different regions followed different trajectories, and some communities survived or adapted. This framework places any possible Trojan conflict within a period of broad instability without making Troy the cause or symbol of everything. Historical collapse is usually a process: institutions fail unevenly, people move, and new societies emerge from the disruption.",
      "frame": "Draws trade routes until the page resembles a net. \"A connected world can fail through several links at once. Do not mistake a memorable date for a single switch.\"",
      "q": [
        {
          "q": "What is central to Cline's explanation of the Late Bronze Age collapse?",
          "o": [
            {
              "t": "Multiple stresses interacted across highly connected political and trade systems.",
              "v": "expert",
              "fb": "The argument emphasizes a combination of shocks rather than one universal cause."
            },
            {
              "t": "One Sea Peoples invasion destroyed every city on the same day in 1177 BC.",
              "v": "danger",
              "fb": "The crises unfolded unevenly, and the Sea Peoples are only part of the evidence."
            },
            {
              "t": "A single volcanic eruption buried the entire eastern Mediterranean civilization.",
              "v": "wrong",
              "fb": "No one eruption explains the regional pattern described."
            },
            {
              "t": "Palace societies declined peacefully because trade had rarely linked them together.",
              "v": "partial",
              "fb": "The region was strongly interconnected, and many sites show violence or disruption."
            }
          ]
        },
        {
          "q": "Why is interdependence important in collapse studies?",
          "o": [
            {
              "t": "Networks spread resources in good times and transmit shortages when links fail.",
              "v": "expert",
              "fb": "Connected systems can amplify disruption as well as prosperity."
            },
            {
              "t": "It indicates every connected kingdom experiences identical political outcomes.",
              "v": "danger",
              "fb": "Shared shocks can produce different local responses and survivals."
            },
            {
              "t": "It means climate, warfare, and internal revolt can rarely operate simultaneously.",
              "v": "wrong",
              "fb": "The framework specifically allows several pressures to interact."
            },
            {
              "t": "It matters mainly for luxury art and has no effect on food, metals, or labor.",
              "v": "partial",
              "fb": "Trade networks carried essential materials and specialist relationships too."
            }
          ]
        },
        {
          "q": "How should the date 1177 BC be understood in Cline's account?",
          "o": [
            {
              "t": "As a vivid marker within a longer, regionally uneven collapse process.",
              "v": "expert",
              "fb": "The title organizes a complex era rather than assigning one universal destruction date."
            },
            {
              "t": "As the exact year in which Troy, Mycenae, Egypt, and Hatti all ceased to exist.",
              "v": "danger",
              "fb": "Those societies followed different chronologies, and Egypt continued."
            },
            {
              "t": "As a date calculated from Homeric meter without archaeological evidence.",
              "v": "wrong",
              "fb": "The date relates to Egyptian chronology and broader Late Bronze Age history."
            },
            {
              "t": "As proof that events before or after that year are irrelevant to explanation.",
              "v": "partial",
              "fb": "Longer-term pressures and later transformations are essential to the analysis."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "gm_bard": {
      "gm_shore": "Kleio sits beside an overturned shield, fitting an old epithet to a new cadence. \"A song can remember a shoreline for centuries and still change who caused the storm,\" she says.",
      "gm_walls": "Kleio presses her palm to the dressed stone and recites two versions of the same death. \"The wall stays put; the verse travels. Do not demand that they preserve time in the same way.\"",
      "gm_mound": "Kleio watches dust rise from the excavation while turning a modern translation in her hands. \"Every age digs its own Troy in language before it reaches the soil.\""
    },
    "gm_digger": {
      "gm_shore": "Dr. Hale kneels where the camp would have faced the strait and studies the terrain rather than the poem. \"A plausible anchorage is useful evidence, not a signed guest list.\"",
      "gm_walls": "Dr. Hale traces a repair seam across the fortification. \"This block belongs to one city and that tower to another; mix them, and you can manufacture any Troy you please.\"",
      "gm_mound": "Dr. Hale lowers a pottery sherd into a labeled tray. \"The heroic object is usually the one with the best context, not the brightest metal.\""
    },
    "gm_chron": {
      "gm_shore": "Prof. Wren lays a map of Bronze Age sea routes over the imagined Achaean camp. \"Wars need ships, grain, allies, and reasons. The gods are cheaper to provision.\"",
      "gm_walls": "Prof. Wren compares a Hittite place-name with the Greek form Ilios. \"A resemblance opens a file; it does not close the argument.\"",
      "gm_mound": "Prof. Wren stands between the burn layer and a shelf of epic editions. \"History begins when neither the poem nor the trench is allowed to testify alone.\""
    }
  },
  "story": [
    "<b>Nine cities in one mound, and only one is Homer's.</b> Hisarlik is a layer cake of settlements stacked over two thousand years. Somewhere in it is the Troy the poems remember — flanked by two impostors that look far more the part.",
    "Kleio the Rhapsode guards the changing epic tradition; Dr. Hale reads masonry, pottery, and destruction layers; Prof. Wren tests the tale against Bronze Age states, trade, and chronology.",
    "The dazzling verdicts are already waiting: the layer of <b>Schliemann's gold hoard</b>, or the <b>grand high-walled city</b> that simply looks the most like Ilios. Each is the wrong Troy for its own reason — one too old by a thousand years, one thrown down by an earthquake rather than an enemy.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide the <b>WHAT</b> from the evidence."
  ],
  "endings": {
    "overclaimWhat": "gm_troy2",
    "dismissalWhat": "gm_troy6",
    "win": {
      "expertTitle": "The Plain City That Burned",
      "expert": [
        "You name <b>Frank Calvert</b>, <b>the citadel and the South Gate</b>, and <b>Troy VIIa — the poorer, crowded city that burned</b>. Not the gold layer, which is roughly a thousand years too early; not the grand VI, whose walls were thrown down by an earthquake. VIIa shows fire, weapons in the streets, hasty burials, and storage jars sunk for a siege: a community destroyed by war, in the right era.",
        "You also refuse the easy credit. Calvert identified Hisarlik as a strong candidate before Schliemann ever raised a spade there. You separated the city that <i>looks</i> Homeric from the city the evidence actually supports."
      ],
      "soundTitle": "The Right Layer",
      "sound": [
        "Your accusation correctly joins <b>Calvert</b>, <b>the citadel</b>, and <b>Troy VIIa</b>. You resisted both dazzling wrong answers — the famous gold and the grand walls — and privileged how the city <i>died</i> over how grand it looked.",
        "The case is sound even though a burnt layer can never name Achilles, Priam, or a wooden horse. The decisive move is reading destruction, dating, and demography together instead of trusting the most impressive ruin."
      ],
      "namedTitle": "The Right City",
      "named": [
        "You identify <b>Calvert</b>, <b>the citadel</b>, and <b>Troy VIIa</b>. The answer is right, though your account leaves the reasoning from layers to conclusion mostly unspoken.",
        "The commission accepts it. A stronger case would spell out why II is too early, why VI's fall reads as an earthquake, and why VIIa's fire and weapons point to war."
      ]
    },
    "overclaim": {
      "title": "Fool's Gold",
      "body": [
        "You crown the layer of 'Priam's Treasure' — Schliemann's gold hoard — as Homer's Troy. It is the most seductive stratum in the mound, and it is wrong by roughly a thousand years. Troy II belongs to the Early Bronze Age, long before any plausible Trojan War; Schliemann drove his great trench straight down to it because he expected Homer's city at the very bottom.",
        "Bright metal is not a date. A hoard tells you a settlement was once wealthy, not that it was the city the epics remember. The gold dazzled its own finder into misdating the whole mound — and it can do the same to you."
      ]
    },
    "dismissal": {
      "title": "The Grandest, Not the Right One",
      "body": [
        "You choose Troy VI — the high-walled, monumental city that looks the part of proud Ilios. Dörpfeld argued the same, reasonably, from its scale and Late Bronze Age date. But Blegen's evidence points to an <i>earthquake</i>: walls displaced and tumbled in characteristic ways, without the clear marks of a successful assault.",
        "A city can be magnificent and still fall to the ground rather than to an enemy. Choosing the grandest ruin lets architecture outvote the destruction evidence — the very mistake the burnt, crowded VIIa above it was waiting to correct."
      ]
    },
    "wrongNames": {
      "title": "The Right City, the Wrong Credit",
      "body": [
        "You correctly pick <b>Troy VIIa</b>, the burnt war-layer — but attach it to the wrong finder or the wrong ground. The site was first flagged by the man who studied the mound before the famous spade arrived, and the war-destruction sits where the citadel meets its gate, namely"
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"Stacked archaeological layers of Troy with one burned layer marked\"><path d=\"M34 30 C150 22,250 38,360 28 S548 20,626 32\" fill=\"none\" stroke=\"#e2e2d8\" stroke-width=\"1\"/><path d=\"M34 56 C150 48,250 64,360 54 S548 46,626 58\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.4\"/><path d=\"M34 82 C150 74,250 90,360 80 S548 72,626 84\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2.2\"/><path d=\"M34 108 C150 100,250 116,360 106 S548 98,626 110\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.4\"/><path d=\"M102 56 L102 108 M214 56 L214 108 M326 56 L326 108\" stroke=\"#e2e2d8\" stroke-width=\"1\"/><path d=\"M452 42 L520 42 L520 82 L452 82 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M470 82 L470 104 M502 82 L502 104\" stroke=\"#121212\" stroke-width=\"1.5\"/></svg>"
}};
