module.exports = { PACK: {
  "id": "m_tailings",
  "title": "The Serra Verde Tailings Dam",
  "discipline": "Slope Stability & Soil Liquefaction",
  "teaser": "A mine's tailings dam liquefied in seconds and buried the works below. Was it a blast or an earthquake? A freak downpour beyond any design? Or gauges that were read and ignored?",
  "overclaimTag": "a blast or an earthquake",
  "truthTag": "liquefaction the piezometers foretold",
  "venue": "the Serra Verde tailings inquiry",
  "agent": {
    "name": "Inspector Rui Alvares",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Engineering credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Slope & Soil Pioneers",
  "dossierName": "SLOPE-STABILITY & SOIL PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Serra Verde tailings inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The place you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "A blast or an earthquake shaking the dam is persuasive at first glance; the measurements and sequence must decide whether it survives.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "tl_miningco",
      "items": [
        {
          "id": "tl_miningco",
          "label": "Bruna Teixeira — mine operations director"
        },
        {
          "id": "tl_engineer",
          "label": "The dam-of-record engineer"
        },
        {
          "id": "tl_auditor",
          "label": "The independent dam auditor"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "tl_office",
      "items": [
        {
          "id": "tl_crest",
          "label": "The Raised Dam Crest"
        },
        {
          "id": "tl_toe",
          "label": "The Toe & Piezometers"
        },
        {
          "id": "tl_office",
          "label": "The Mine's Operations Office"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "tl_liquefaction",
      "items": [
        {
          "id": "tl_quake",
          "label": "A blast or an earthquake shaking the dam"
        },
        {
          "id": "tl_rain",
          "label": "A freak downpour overtopping the dam — an act of God"
        },
        {
          "id": "tl_liquefaction",
          "label": "Static liquefaction of a raised dam its piezometers foretold"
        }
      ]
    }
  },
  "PLACES": {
    "tl_crest": {
      "name": "The Raised Dam Crest",
      "xy": [
        140,
        90
      ]
    },
    "tl_toe": {
      "name": "The Toe & Piezometers",
      "xy": [
        330,
        240
      ]
    },
    "tl_office": {
      "name": "The Mine's Operations Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "tl_crest",
      "tl_toe"
    ],
    [
      "tl_toe",
      "tl_office"
    ]
  ],
  "CHARACTERS": {
    "tl_walker": {
      "name": "Dam-Walker Ana Reis",
      "role": "Tailings-dam walker",
      "face": "💧",
      "badge": "A",
      "legend": "the toe",
      "hint": "Walks the toe daily; saw wet seeps and bulging the reports called normal."
    },
    "tl_reader": {
      "name": "The Instrument Reader",
      "role": "Geotechnical-instrument reader",
      "face": "📟",
      "badge": "I",
      "legend": "the crest",
      "hint": "Downloads the piezometers; the pore-pressures were red for weeks."
    },
    "tl_clerk": {
      "name": "The Clerk",
      "role": "Operations records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Keeps the safety file — and the raise approved despite the auditor's warning."
    }
  },
  "TOPICMAP": {
    "tl_crest": {
      "tl_walker": [
        "tl_fellenius"
      ],
      "tl_reader": [
        "tl_janbu"
      ],
      "tl_clerk": [
        "tl_bjerrum"
      ]
    },
    "tl_toe": {
      "tl_walker": [
        "tl_ishihara"
      ],
      "tl_reader": [
        "tl_poulos"
      ],
      "tl_clerk": [
        "tl_roscoe"
      ]
    },
    "tl_office": {
      "tl_walker": [
        "tl_wroth"
      ],
      "tl_reader": [
        "tl_wilson"
      ],
      "tl_clerk": [
        "tl_whitman"
      ]
    }
  },
  "TOPICS": {
    "tl_fellenius": {
      "sci": "Wolmar Fellenius (1876-1957)",
      "topic": "The slip-circle method",
      "lede": "The Swedish engineer who, after the harbor slides at Gothenburg, taught the world to weigh a slope against a sliding circle of earth.",
      "no": 1,
      "profile": "Wolmar Fellenius was a Swedish civil engineer whose name is attached to the first practical method for judging whether a slope will slide. After a run of destructive quay and railway-embankment failures in early twentieth-century Sweden — the Stigberg quay collapse in Gothenburg among them — the State Railways' Geotechnical Commission set out to learn why saturated ground gave way. Fellenius, drawing on the observation that failed slopes tended to break along curved surfaces, formalized the slip-circle, or Swedish circle, method in the 1920s.\n\nHis idea was to assume the sliding mass rotates on a circular arc, divide it into vertical slices, and balance the moments about the circle's center: the resisting moment from the soil's shear strength against the driving moment from its weight. The ratio of the two is the factor of safety; if it falls below one, the slope moves. By testing many circles, an engineer finds the most dangerous one. Simple and deliberately conservative — it neglects the forces between slices — the method became the foundation of every limit-equilibrium analysis that followed.\n\nFor this inquiry, Fellenius offers both a tool and a warning. A tailings dam is a slope, and its safety is computed in exactly this way. But the number depends entirely on the shear strength you assume. Fellenius's circles balance weight against strength that is present; they cannot foresee a strength that suddenly vanishes when loose, saturated tailings collapse. A dam can show a comfortable factor of safety on paper and still fail in seconds. A reassuring calculation is therefore neither an act of God nor proof of a blast — it is a question about which strength was really there.",
      "frame": "Ana Reis walks you along the crest. \"They kept showing me a safety number bigger than one, like it settled everything. Tell me what that number actually weighs, and I'll tell you what I saw down at the toe.\"",
      "q": [
        {
          "q": "What does Fellenius's slip-circle method compute?",
          "o": [
            {
              "t": "A factor of safety: resisting moment over driving moment on a circle.",
              "v": "expert",
              "fb": "It weighs the soil's strength against its own weight about the circle's center."
            },
            {
              "t": "The exact day a slope will fail, counted from the day it was first built.",
              "v": "wrong",
              "fb": "It yields a safety ratio, not a countdown to a failure date."
            },
            {
              "t": "The volume of rain a slope can soak up before a storm washes it away.",
              "v": "danger",
              "fb": "It is a strength-versus-weight balance, not a rainfall threshold."
            },
            {
              "t": "The yearly settlement a slope undergoes as it compresses under its weight.",
              "v": "partial",
              "fb": "That is consolidation; the method judges sliding, not settlement."
            }
          ]
        },
        {
          "q": "What makes Fellenius's method deliberately conservative?",
          "o": [
            {
              "t": "It ignores the forces between slices, so it tends to underrate the safety.",
              "v": "expert",
              "fb": "Dropping the interslice forces makes the computed safety a lower bound."
            },
            {
              "t": "It assumes a strong earthquake, so it mainly flags slopes that get shaken.",
              "v": "danger",
              "fb": "The method is static; it assumes no earthquake at all."
            },
            {
              "t": "It doubles the driving weight, so nearly every slope it checks looks unsafe.",
              "v": "wrong",
              "fb": "It does not inflate the weight; it simply omits the interslice forces."
            },
            {
              "t": "It fixes a circular surface, though real failures can follow other shapes.",
              "v": "partial",
              "fb": "The circle is a real limit, but the conservatism comes from the slices."
            }
          ]
        },
        {
          "q": "Why can a safe-looking factor of safety still hide danger?",
          "o": [
            {
              "t": "Because it assumes a strength that loose, saturated soil can suddenly lose.",
              "v": "expert",
              "fb": "The number is only as good as the strength you feed it, which can vanish."
            },
            {
              "t": "Because mainly a blast could overturn a slope the numbers had called safe.",
              "v": "danger",
              "fb": "No blast is needed; a strength collapse defeats the calculation quietly."
            },
            {
              "t": "Because a freak storm can overtop any slope, so the number rarely mattered.",
              "v": "danger",
              "fb": "Overtopping is one failure; a hidden strength loss is another and graver one."
            },
            {
              "t": "Because engineers sometimes pick the wrong circle and miss the true one.",
              "v": "partial",
              "fb": "Trying many circles guards that; the deeper risk is the strength itself."
            }
          ]
        }
      ]
    },
    "tl_janbu": {
      "sci": "Nilmar Janbu (1921-2013)",
      "topic": "Generalized slope-stability analysis",
      "lede": "The Norwegian professor who freed slope analysis from the tidy circle and let a failure surface follow the weak layer it truly finds.",
      "no": 2,
      "profile": "Nilmar Janbu was a Norwegian geotechnical engineer and a long-serving professor at the Norwegian Institute of Technology in Trondheim. He recognized that real slope failures rarely follow a neat circular arc; they seek out the weakest path, threading along soft seams and buried layers. In the 1950s he developed the methods that bear his name — Janbu's Simplified Method for rapid analysis and the Generalized Procedure of Slices, which permits a slip surface of arbitrary, non-circular shape while satisfying force equilibrium slice by slice. His simplified method carries a correction factor to account for the interslice forces it only approximates.\n\nJanbu also worked deeply on soil deformation, introducing a tangent-modulus concept for settlement and compressibility that let engineers predict how soft ground yields under load. His charts and texts became standard tools across Scandinavia and far beyond, and his generalized analysis remains a foundation of modern stability software.\n\nFor this inquiry, Janbu matters because the shape of a failure is itself a clue. A tailings dam is a layered thing — coarser sand near the wall, loose fine slimes behind, saturated throughout — and when it fails it will not politely follow a circle. It runs along the loosest, wettest, weakest layer, often a near-horizontal one, exactly where the pore pressures stand highest. Janbu's generalized method is what lets an engineer test that real geometry instead of a convenient one. A failure surface diving through saturated tailings is not the fingerprint of a downpour over the crest, nor of an explosion; it is the shape that strength loss leaves behind, along a path the instruments had already marked as the most dangerous.",
      "frame": "Spreads a plot of the slip geometry across the table. \"Everyone draws a circle because it's easy. The ground doesn't. Prove you know how a real failure surface behaves, and I'll show you where my pressures peaked.\"",
      "q": [
        {
          "q": "What did Janbu's Generalized Procedure of Slices allow?",
          "o": [
            {
              "t": "Slip surfaces of any non-circular shape, in force equilibrium slice by slice.",
              "v": "expert",
              "fb": "It freed the analysis from the circle to follow the true failure path."
            },
            {
              "t": "mainly closely circular arcs, but solved faster than Bishop had managed to.",
              "v": "wrong",
              "fb": "Its whole point was to escape the circle, not to preserve it."
            },
            {
              "t": "Slip surfaces that appear mainly once an earthquake shakes the slope apart.",
              "v": "danger",
              "fb": "The method is static; it needs no earthquake to define a surface."
            },
            {
              "t": "A single planar wedge, which suits most real slopes well enough in practice.",
              "v": "partial",
              "fb": "A wedge is a special case; Janbu handled general curved surfaces."
            }
          ]
        },
        {
          "q": "Why does the shape of a failure surface matter?",
          "o": [
            {
              "t": "A real failure seeks the weakest, wettest layer rather than a tidy circle.",
              "v": "expert",
              "fb": "Slides follow the loosest saturated seam, which a forced circle can miss."
            },
            {
              "t": "Its shape reveals the size of the charge that would have blown the dam.",
              "v": "danger",
              "fb": "The surface reflects weak layers and pore pressure, not any explosive."
            },
            {
              "t": "Its shape is arbitrary and tells an investigator nothing worth knowing.",
              "v": "wrong",
              "fb": "The geometry is a strong clue to where and why a slope gave way."
            },
            {
              "t": "Its shape mainly sets how much earth moves, not why the slope failed.",
              "v": "partial",
              "fb": "Volume matters, but the path itself points to the mechanism of failure."
            }
          ]
        },
        {
          "q": "What does a failure running through saturated tailings suggest?",
          "o": [
            {
              "t": "Strength was lost along the wettest layer the gauges had already flagged.",
              "v": "expert",
              "fb": "The slide followed the high pore pressure the instruments recorded."
            },
            {
              "t": "An earthquake below, since mainly shaking can carve a surface that deep.",
              "v": "danger",
              "fb": "A static strength loss can cut the same surface with no quake at all."
            },
            {
              "t": "A downpour above, since mainly surface water can reach that deep in a dam.",
              "v": "danger",
              "fb": "The water that mattered was pore pressure within, not rain from above."
            },
            {
              "t": "Poor compaction alone, a flaw with nothing to do with the pore water.",
              "v": "partial",
              "fb": "Loose placement matters, but it acts through the pore pressure it traps."
            }
          ]
        }
      ]
    },
    "tl_bjerrum": {
      "sci": "Laurits Bjerrum (1918-1973)",
      "topic": "Soft-clay strength & landslides",
      "lede": "The founder of Norway's soil institute, who read in the quick-clay slides how a soil can turn from solid to soup.",
      "no": 3,
      "profile": "Laurits Bjerrum was a Norwegian geotechnical engineer and the founding director of the Norwegian Geotechnical Institute, which he built into one of the world's leading centers for soil mechanics. He devoted much of his career to the treacherous soft and sensitive clays of Scandinavia, whose behavior lay behind a long history of destructive landslides.\n\nBjerrum illuminated the concept of sensitivity — the ratio of a clay's undrained strength when intact to its strength once remolded. In highly sensitive quick clays that ratio is enormous: once disturbed, the material collapses from a firm solid into a nearly liquid slurry that can flow like water. He clarified the difference between drained and undrained strength, showed how pore pressure governs the effective stress that gives soil its strength, and studied progressive failure, in which a slope does not fail all at once but unzips as overstressed zones shed their load onto neighbors.\n\nFor this inquiry, Bjerrum's lesson is that a soil's strength is not a fixed property but a state that can be lost. A material standing firm one moment can, once its structure is disturbed or its pore pressure driven up, give way completely. That is the essence of what befalls loose, saturated tailings. Bjerrum trains the board to distrust the comforting assumption that ground which held for years must be sound. The collapse of such a soil needs no earthquake to shake it and no storm to drown it; it needs only the right conditions, building silently, of the kind the dam's own records and gauges had been tracking all along.",
      "frame": "Slides a worn file across the desk but keeps a hand flat on it. \"On paper this fill was 'firm.' Papers can be wrong. Show me you know how firm ground turns to soup, and you can read the rest.\"",
      "q": [
        {
          "q": "What is a clay's sensitivity?",
          "o": [
            {
              "t": "The ratio of its intact undrained strength to its strength once remolded.",
              "v": "expert",
              "fb": "High sensitivity means a soil loses most of its strength when disturbed."
            },
            {
              "t": "How sharply its strength climbs with the depth of soil piled above it.",
              "v": "wrong",
              "fb": "That is a strength profile; sensitivity compares intact and remolded strength."
            },
            {
              "t": "How strongly it answers to the shaking of a distant, deep earthquake.",
              "v": "danger",
              "fb": "Sensitivity is about disturbance in general, not seismic shaking."
            },
            {
              "t": "How much water it can hold before it slowly begins to lose cohesion.",
              "v": "partial",
              "fb": "Water content matters, but sensitivity is an intact-versus-remolded ratio."
            }
          ]
        },
        {
          "q": "What happens when a quick clay is disturbed?",
          "o": [
            {
              "t": "It collapses from a firm solid into a nearly liquid slurry that flows.",
              "v": "expert",
              "fb": "Loss of structure turns sensitive clay into a mass that runs like water."
            },
            {
              "t": "It shatters like glass, sure proof that a blast would have struck it.",
              "v": "danger",
              "fb": "Collapse to a slurry needs no explosion; disturbance alone suffices."
            },
            {
              "t": "It hardens further and grows steadily stronger the more it is worked.",
              "v": "wrong",
              "fb": "The opposite: a sensitive clay weakens dramatically when remolded."
            },
            {
              "t": "It swells with water yet keeps most of its original firm strength.",
              "v": "partial",
              "fb": "A truly sensitive clay loses, rather than keeps, its strength."
            }
          ]
        },
        {
          "q": "What does progressive failure teach the board?",
          "o": [
            {
              "t": "A slope can unzip as overstressed zones shed their load onto neighbors.",
              "v": "expert",
              "fb": "Failure need not be sudden or seismic; it can spread from a weak start."
            },
            {
              "t": "A slope fails mainly all at once, so any slide means a violent trigger.",
              "v": "danger",
              "fb": "Progressive failure spreads gradually; no violent trigger is implied."
            },
            {
              "t": "A slope holds forever unless water finally pours over its crest above.",
              "v": "danger",
              "fb": "Internal strength loss can fail a slope with no overtopping at all."
            },
            {
              "t": "A slope's strength is fixed, so past performance indicates its future.",
              "v": "partial",
              "fb": "Strength is a state that can be lost; the past is no guarantee."
            }
          ]
        }
      ]
    },
    "tl_ishihara": {
      "sci": "Kenji Ishihara (b. 1934)",
      "topic": "The liquefaction of sands",
      "lede": "The Tokyo professor who mapped exactly when a saturated sand will flow like a liquid and when it will merely shudder and hold.",
      "no": 4,
      "profile": "Kenji Ishihara is a Japanese geotechnical engineer, professor emeritus at the University of Tokyo, and one of the foremost authorities on the behavior of soils during liquefaction. Working in a nation shaped by earthquakes, he devoted his career to understanding how saturated sands respond when their pore water cannot drain away quickly enough to keep pace with the loading.\n\nIshihara clarified a crucial distinction: between true flow liquefaction, in which a loose sand loses most of its strength and flows like a heavy liquid, and cyclic mobility, in which a denser sand accumulates strain during shaking but does not collapse. The deciding factor is the soil's state — chiefly whether it is loose and contractive, tending to shrink and expel water when sheared, or dense and dilative, tending to expand. A contractive sand sheared undrained builds pore pressure and can lose nearly all its strength; a dilative one stiffens. He set these behaviors on a rigorous, testable footing.\n\nFor this inquiry, Ishihara's framework is the diagnostic core. Tailings, pumped as a slurry and loosely deposited, are very often contractive and saturated — the exact recipe for flow liquefaction. The question the board must answer is not whether the ground shook but whether the tailings were loose enough to collapse when pushed. If they were, a small disturbance, or simply the rising dam's own weight, can trigger a flow slide. That is neither an act of God from the sky nor an attack from outside; it is a state of the soil that testing could reveal and monitoring could track.",
      "frame": "Ana kneels by a piezometer standpipe at the toe. \"I've watched this sand sit quiet for years. Tell me what decides whether a sand like this flows or holds, and I'll show you where it was weeping.\"",
      "q": [
        {
          "q": "What decides whether a saturated sand flows when sheared?",
          "o": [
            {
              "t": "Whether it is loose and contractive or dense and dilative in its state.",
              "v": "expert",
              "fb": "A contractive sand loses strength; a dilative one stiffens instead."
            },
            {
              "t": "Whether an earthquake strikes it, since the sand is stable otherwise.",
              "v": "danger",
              "fb": "Loose contractive sand can flow with no earthquake at all."
            },
            {
              "t": "Its color, since darker sands drain faster and does not liquefy at all.",
              "v": "wrong",
              "fb": "Color is irrelevant; the state, loose or dense, is what matters."
            },
            {
              "t": "Its grain size alone, with coarse sands being largely immune to flowing.",
              "v": "partial",
              "fb": "Grain size plays a part, but the density state is the deciding factor."
            }
          ]
        },
        {
          "q": "How do flow liquefaction and cyclic mobility differ?",
          "o": [
            {
              "t": "Flow means a near-total strength loss; cyclic mobility only strains it.",
              "v": "expert",
              "fb": "Loose sand can flow; denser sand merely accumulates strain and holds."
            },
            {
              "t": "There is none, so any liquefaction would mean an earthquake had struck.",
              "v": "danger",
              "fb": "They differ sharply, and flow liquefaction can be triggered statically."
            },
            {
              "t": "Flow needs cold weather; cyclic mobility needs mainly warm, wet soil.",
              "v": "wrong",
              "fb": "Temperature plays no role; density and drainage govern the behavior."
            },
            {
              "t": "mainly the depth differs, with deep sand generally flowing more freely.",
              "v": "partial",
              "fb": "Depth is not the divide; the soil's contractive state is."
            }
          ]
        },
        {
          "q": "Why are pumped tailings prone to flow liquefaction?",
          "o": [
            {
              "t": "Deposited loose and saturated, they are contractive — primed to collapse.",
              "v": "expert",
              "fb": "Loose, wet tailings are the exact recipe Ishihara warned of."
            },
            {
              "t": "They pack dense at the wall, so mainly a bomb could ever fail them.",
              "v": "danger",
              "fb": "The loose slimes behind the wall, not a bomb, are the hazard."
            },
            {
              "t": "They are so dry that mainly a heavy storm could ever set them moving.",
              "v": "danger",
              "fb": "Tailings sit saturated; the danger is internal, not a passing storm."
            },
            {
              "t": "They are chemically unstable, corroding until the dam simply dissolves.",
              "v": "partial",
              "fb": "The hazard is mechanical liquefaction, not chemical corrosion."
            }
          ]
        }
      ]
    },
    "tl_poulos": {
      "sci": "Steve J. Poulos (steady-state-strength researcher)",
      "topic": "The steady-state strength line",
      "lede": "The engineer who gave collapse a number — the single residual strength a flowing soil keeps once it has surrendered the rest.",
      "no": 5,
      "profile": "Steve J. Poulos was a geotechnical engineer who, building on Casagrande's and Castro's work, formalized the steady state of deformation in an influential 1981 paper. He defined the steady state as the condition in which a soil deforms continuously at constant volume, constant effective stress, and constant shear strength — a well-defined end point independent of how the soil arrived there.\n\nCrucially, Poulos argued that this steady-state strength is a soil property tied to void ratio, and that it can be measured and used directly in stability analysis. For a loose, saturated soil that might liquefy, the relevant strength is not the peak read in a quick test but this much lower residual value that governs once flow begins. Poulos and colleagues laid out a practical procedure for estimating it and applying it to embankments and tailings dams, so that engineers could check stability against a flow slide rather than against a deceptively high peak.\n\nFor this inquiry, Poulos supplies the number that settles the argument. If the tailings' steady-state strength was low — as it is for a loose, contractive fill — then the factor of safety against a flow slide could have sat below one even while the conventional analysis, using peak strength, looked reassuring. The dam could be, in effect, already failing by the only strength that mattered. That is not a storm and not a bomb; it is a design checked against the wrong strength, a gap that steady-state analysis, and the piezometers feeding it, were built to close.",
      "frame": "Lays a strength plot beside the pressure logs. \"Peak strength looks fine. There's a lower number that actually rules a flow. Tell me what it is, and I'll match it to my readings.\"",
      "q": [
        {
          "q": "What is the steady-state strength of a soil?",
          "o": [
            {
              "t": "The constant residual strength at which it flows on at constant volume.",
              "v": "expert",
              "fb": "It is the low strength that governs once a flow slide is under way."
            },
            {
              "t": "The strength it shows mainly while an earthquake is actively shaking it.",
              "v": "danger",
              "fb": "It is a static soil property, not something a quake conjures up."
            },
            {
              "t": "The peak strength read in a fast test, the highest the soil can reach.",
              "v": "wrong",
              "fb": "It is the low residual value, well below the deceptive peak."
            },
            {
              "t": "The strength it has when closely dry and fully drained of its water.",
              "v": "partial",
              "fb": "It is defined for undrained flow, not for a dry, drained soil."
            }
          ]
        },
        {
          "q": "Why use steady-state strength for a loose tailings dam?",
          "o": [
            {
              "t": "Because a flow slide is governed by the residual, not the peak, strength.",
              "v": "expert",
              "fb": "Loose fill can flow at a strength far below its measured peak value."
            },
            {
              "t": "Because mainly shaking can be assessed, and the peak strength ignores it.",
              "v": "danger",
              "fb": "Steady-state analysis concerns static flow, not seismic loading."
            },
            {
              "t": "Because the rainfall design needs it, and nothing else can fail a dam.",
              "v": "danger",
              "fb": "It addresses internal flow strength, not the weather outside."
            },
            {
              "t": "Because it is easier to measure than the peak strength in the field.",
              "v": "partial",
              "fb": "It is not merely easier; it is the strength that actually rules a flow."
            }
          ]
        },
        {
          "q": "What if the steady-state factor of safety was below one?",
          "o": [
            {
              "t": "The dam was effectively failing by the only strength that mattered.",
              "v": "expert",
              "fb": "A peak-based check can look safe while a flow slide is already due."
            },
            {
              "t": "Nothing, unless a blast arrived to turn the margin into a failure.",
              "v": "danger",
              "fb": "A margin below one fails on its own; no blast is required."
            },
            {
              "t": "It is harmless, since the peak strength is what truly holds the dam.",
              "v": "wrong",
              "fb": "For a loose fill, the residual strength, not the peak, governs a flow."
            },
            {
              "t": "It mainly matters during a flood, when water finally tops the crest.",
              "v": "partial",
              "fb": "It governs a flow slide with no flood or overtopping at all."
            }
          ]
        }
      ]
    },
    "tl_roscoe": {
      "sci": "Kenneth H. Roscoe (1914-1970)",
      "topic": "Critical-state soil mechanics",
      "lede": "Kenneth Roscoe turned loose grains and pore water into a map of how saturated soil reaches failure.",
      "no": 6,
      "profile": "Kenneth H. Roscoe led the Cambridge group that helped create critical-state soil mechanics, a framework for describing soil with three linked quantities: effective pressure, shear stress, and specific volume. Earlier soil tests often produced separate empirical rules for strength and compression. Roscoe and his colleagues instead traced stress paths and showed that remolded soil tends toward a critical state where it can continue shearing at roughly constant stress and volume. The work made density and drainage history central to predicting failure.\n\nThe key variable is effective stress: the part of total stress carried by grain contacts rather than pore water. In saturated soil, rapid loading can raise pore pressure before water has time to drain. That rise reduces effective stress even when the total weight above has not changed. Loose material may contract as it shears; if drainage is blocked, the attempted contraction appears as still more pore pressure. Grain contacts weaken, deformation accelerates, and a solid-looking mass can begin to flow.\n\nCritical-state diagrams do not turn every slope into one universal curve. Sampling disturbance, particle crushing, fabric, anisotropy, and drainage conditions still matter. Their value is that they force an engineer to ask where the material begins in density and stress space, how the loading path moves, and whether the path approaches a state of continuing shear.\n\nFor tailings, the distinction between total stress and effective stress is decisive. A high pore-pressure reading is not merely “more water”; it means less contact force is holding the grains together. Trends in density, saturation, and pore pressure can therefore reveal a narrowing margin before visible movement begins.",
      "frame": "Taps the pore-pressure plot. \"Roscoe made soil failure a path, not a surprise. Show me what happens when water takes the load away from the grains.\"",
      "q": [
        {
          "q": "What is the central idea of critical-state soil mechanics?",
          "o": [
            {
              "t": "Soil strength depends on stress, density, drainage history, and the path toward continuing shear.",
              "v": "expert",
              "fb": "Critical-state theory links stress and volume rather than treating strength as one fixed number."
            },
            {
              "t": "Soil strength can be estimated from density while pore pressure and drainage remain secondary details.",
              "v": "partial",
              "fb": "Density matters, but effective stress and drainage control how that density behaves during loading."
            },
            {
              "t": "Saturated soil keeps the same grain-contact stress whenever the total overburden remains unchanged.",
              "v": "wrong",
              "fb": "Pore-pressure changes can reduce effective stress even when total stress stays similar."
            },
            {
              "t": "A stable surface appearance is enough to show that loose tailings are far from a flow condition.",
              "v": "danger",
              "fb": "Loose saturated material can lose effective stress before large surface deformation is visible."
            }
          ]
        },
        {
          "q": "Why can rapid undrained loading weaken loose saturated tailings?",
          "o": [
            {
              "t": "Attempted contraction raises pore pressure and reduces the effective stress carried by grain contacts.",
              "v": "expert",
              "fb": "With little drainage, contractive behavior transfers load from the grain skeleton to pore water."
            },
            {
              "t": "Water adds weight to the deposit, while the grain-contact forces stay nearly unchanged during shearing.",
              "v": "partial",
              "fb": "Added weight is not the main mechanism; pore pressure changes the effective stress directly."
            },
            {
              "t": "Rapid loading drains the pores efficiently and increases the contact force between neighboring grains.",
              "v": "wrong",
              "fb": "Rapid loading usually leaves less time for drainage, allowing excess pore pressure to build."
            },
            {
              "t": "An operator may treat rising pore pressure as a harmless seasonal signal when the crest looks unchanged.",
              "v": "danger",
              "fb": "Instrument trends can show a loss of effective stress before the crest visibly moves."
            }
          ]
        },
        {
          "q": "Which record best tests a critical-state explanation?",
          "o": [
            {
              "t": "Density, saturation, pore-pressure trends, stress path, and whether drainage could keep pace with loading.",
              "v": "expert",
              "fb": "Those measurements locate the material state and show how the loading path approached failure."
            },
            {
              "t": "Rainfall totals and crest photographs, without laboratory density or pore-pressure interpretation; on record.",
              "v": "partial",
              "fb": "Those observations help, but they do not define the material state or effective stress path."
            },
            {
              "t": "A post-failure description that assigns one constant shear strength to every zone of the deposit.",
              "v": "wrong",
              "fb": "Tailings zones can differ in density, fabric, saturation, and drainage history."
            },
            {
              "t": "A management summary that averages the piezometers until the highest readings disappear from view.",
              "v": "danger",
              "fb": "Averaging can conceal the localized pore-pressure rise that controls instability."
            }
          ]
        }
      ]
    },
    "tl_wroth": {
      "sci": "Peter Wroth (1929-1991)",
      "topic": "Critical-state soil behaviour",
      "lede": "Peter Wroth connected critical-state theory to the measurements engineers can make in the ground itself.",
      "no": 7,
      "profile": "Peter Wroth was a British geotechnical engineer closely associated with the development of critical-state soil mechanics at Cambridge. With Andrew Schofield he wrote the influential 1968 book Critical State Soil Mechanics, which organized soil behavior around effective stress, specific volume, and shear stress. Wroth also devoted major attention to in-situ testing: the difficult task of estimating soil properties without pretending that a small disturbed sample perfectly represents a large deposit.\n\nCritical-state thinking explains why identical-looking soils may respond differently. A loose, normally consolidated material may try to contract under shear, while a dense or overconsolidated material may dilate. In an undrained saturated deposit, contractive tendency generates positive pore pressure and lowers effective stress. Dilative tendency can do the reverse. The initial state and stress history therefore help determine whether deformation stabilizes or runs away.\n\nWroth emphasized interpretation rather than instrument worship. A cone penetration test, pressuremeter, vane test, or laboratory specimen does not directly announce “safe” or “unsafe.” Each disturbs the ground in a particular way and must be connected to a model of drainage, stress history, and soil fabric. Correlations are useful only when their limits are visible.\n\nThat discipline matters wherever fine waste is placed in stages. Raises alter stress paths; deposition changes density and layering; drainage systems age; and apparently small construction decisions reshape the future response. A reliable assessment combines field observations, in-situ measurements, laboratory behavior, and the history of how the deposit was built. No single tidy number replaces that chain. Field interpretation also benefits from repeat measurements, because a trend can reveal changing drainage or deformation that one isolated test cannot show.",
      "frame": "Folds the inspection sheet. \"Wroth would not let one neat strength number erase how this material was placed. Tell me what state and stress history change.\"",
      "q": [
        {
          "q": "What did Wroth help critical-state soil mechanics emphasize?",
          "o": [
            {
              "t": "The response of soil depends on its initial density, effective stress, drainage, and loading history.",
              "v": "expert",
              "fb": "The same soil type can contract or dilate depending on state and stress history."
            },
            {
              "t": "The response of soil is controlled mainly by grain size, with construction history adding a small correction.",
              "v": "partial",
              "fb": "Grain size matters, but density, fabric, drainage, and stress history can dominate behavior."
            },
            {
              "t": "A laboratory shear strength transfers directly to every layer of a field deposit without interpretation.",
              "v": "wrong",
              "fb": "Sampling and field stress paths differ, so laboratory values require careful interpretation."
            },
            {
              "t": "One favorable test result can stand in for the varied states created by years of staged deposition.",
              "v": "danger",
              "fb": "A staged tailings deposit can contain zones with very different density and drainage conditions."
            }
          ]
        },
        {
          "q": "Why can loose saturated soil weaken during undrained shear?",
          "o": [
            {
              "t": "Its contractive tendency raises pore pressure, reducing the effective stress between grains; in use.",
              "v": "expert",
              "fb": "Undrained contraction appears as excess pore pressure and loss of grain-contact strength."
            },
            {
              "t": "Its water content increases the total weight while leaving effective stress mostly unaffected.",
              "v": "partial",
              "fb": "The decisive change is in pore pressure and effective stress, not weight alone."
            },
            {
              "t": "Its grains separate because rapid loading removes pore water and creates extra drainage capacity.",
              "v": "wrong",
              "fb": "Rapid loading usually restricts drainage and traps excess pore pressure."
            },
            {
              "t": "Its stability can be judged from the crest alone even when the toe and internal layers behave differently.",
              "v": "danger",
              "fb": "Local conditions and hidden layers may control the first unstable zone."
            }
          ]
        },
        {
          "q": "How should engineers use an in-situ test?",
          "o": [
            {
              "t": "Interpret the reading through the test disturbance, soil state, drainage condition, and stress history.",
              "v": "expert",
              "fb": "An in-situ measurement becomes useful when its mechanism and limitations are understood."
            },
            {
              "t": "Treat the reading as a direct material constant, then apply it uniformly across the whole impoundment.",
              "v": "partial",
              "fb": "The measurement is relevant, but spatial variability and test mechanism still require interpretation."
            },
            {
              "t": "Replace field monitoring with one penetration test because both concern resistance in soil; on record.",
              "v": "wrong",
              "fb": "A penetration test and long-term monitoring answer different questions about behavior."
            },
            {
              "t": "Select the correlation that gives the largest margin and leave conflicting field observations outside the review.",
              "v": "danger",
              "fb": "Choosing a favorable correlation can hide the evidence that the model is wrong."
            }
          ]
        }
      ]
    },
    "tl_wilson": {
      "sci": "Stanley D. Wilson (geotechnical-instrumentation pioneer)",
      "topic": "The piezometer & slope inclinometer",
      "lede": "Stanley Wilson helped make hidden ground movement and pore pressure visible through practical field instrumentation.",
      "no": 8,
      "profile": "Stanley D. Wilson is remembered in geotechnical practice for advancing field instrumentation used to watch slopes, embankments, and foundations. Instruments such as piezometers and inclinometers translate hidden changes underground into time series an engineer can inspect. A piezometer measures water pressure at a chosen depth or zone. An inclinometer tracks lateral deformation by measuring the changing shape of a grooved casing installed in a borehole.\n\nNeither instrument is a magic alarm. A piezometer must be installed in the right material, allowed to respond, protected from blockage, and tied to an elevation datum. Different designs respond at different speeds. An inclinometer can miss movement outside its casing or become unreadable after severe deformation. Baseline readings, calibration, installation records, and repeatable procedures are therefore part of the measurement itself.\n\nThe power comes from trends and spatial patterns. A rising pore-pressure line near a dam toe may indicate that drainage is failing or that the phreatic surface is climbing. A growing bend in an inclinometer profile can locate a shear zone before a large surface displacement appears. Several instruments that change together are stronger evidence than one isolated value, but a single extreme reading should not be averaged away before it is investigated.\n\nInstrumentation creates an obligation as well as information. Thresholds need owners, response actions, and escalation rules. A red reading that is downloaded, filed, and ignored is not a functioning warning system. Good monitoring preserves raw data, maintenance history, missed readings, corrections, and the decisions made after each change. Redundancy should be purposeful: different instruments should test different parts of the same physical explanation rather than duplicate one uncertain assumption.",
      "frame": "Holds up two traces. \"Wilson gave us eyes inside the dam. Explain what a piezometer and an inclinometer can reveal—and what they can miss.\"",
      "q": [
        {
          "q": "What does a piezometer measure in an embankment?",
          "o": [
            {
              "t": "Water pressure at a defined zone, which helps estimate effective stress and drainage behavior.",
              "v": "expert",
              "fb": "Pore pressure is needed to understand how much load remains on the soil skeleton."
            },
            {
              "t": "The total vertical weight of the embankment, which indirectly summarizes all drainage conditions.",
              "v": "partial",
              "fb": "Total stress matters, but a piezometer specifically measures pore-water pressure."
            },
            {
              "t": "The horizontal displacement profile of the dam through a grooved borehole casing; in use.",
              "v": "wrong",
              "fb": "That is the role of an inclinometer rather than a piezometer."
            },
            {
              "t": "A single safe reading can be used to close the warning even when nearby instruments continue rising.",
              "v": "danger",
              "fb": "Monitoring should evaluate trends, spatial patterns, and instrument condition together."
            }
          ]
        },
        {
          "q": "What does an inclinometer contribute?",
          "o": [
            {
              "t": "It tracks lateral deformation with depth and can identify a developing shear zone; in use.",
              "v": "expert",
              "fb": "Changes in casing shape can locate movement that is not yet obvious at the surface."
            },
            {
              "t": "It directly measures pore pressure and converts that value into a complete factor of safety.",
              "v": "partial",
              "fb": "An inclinometer measures deformation, not pore pressure or a complete safety factor."
            },
            {
              "t": "It establishes the chemical composition and grain-size distribution of the tailings; in use.",
              "v": "wrong",
              "fb": "Those properties require sampling and laboratory analysis."
            },
            {
              "t": "A flat surface survey can replace it because internal movement reaches the crest at the same time.",
              "v": "danger",
              "fb": "Subsurface deformation may begin before the crest shows a clear displacement."
            }
          ]
        },
        {
          "q": "What makes an instrumentation program operationally credible?",
          "o": [
            {
              "t": "Baselines, calibration, raw trends, maintenance records, thresholds, and assigned response actions.",
              "v": "expert",
              "fb": "A warning system includes both reliable measurements and a defined decision process."
            },
            {
              "t": "A dashboard that reports monthly averages while retaining little information about individual sensors.",
              "v": "partial",
              "fb": "Summaries help, but they can conceal localized or rapidly changing conditions."
            },
            {
              "t": "Installing many instruments without checking whether they remain connected to the intended zones.",
              "v": "wrong",
              "fb": "Quantity cannot compensate for poor installation, blockage, or lost calibration."
            },
            {
              "t": "Treating alarm thresholds as advisory once production targets make the prescribed response inconvenient.",
              "v": "danger",
              "fb": "A threshold without an enforced response is paperwork rather than protection."
            }
          ]
        }
      ]
    },
    "tl_whitman": {
      "sci": "Robert V. Whitman (1928-2012)",
      "topic": "Geotechnical risk & reliability",
      "lede": "Robert Whitman brought probability and consequence into geotechnical decisions that could not be made with certainty.",
      "no": 9,
      "profile": "Robert V. Whitman spent more than four decades at MIT working across soil dynamics, earthquake engineering, and geotechnical risk. His career helped engineers move from asking whether a calculation was simply “safe” toward asking how uncertain the inputs were, how failure could occur, and what consequences followed. Natural materials vary, subsurface investigations sample only a small fraction of the ground, and models simplify complex behavior. Responsible design makes those uncertainties explicit.\n\nRisk combines likelihood and consequence. A low-probability event can still demand action when the potential loss is enormous, while a common minor deviation may be tolerable. Reliability methods treat loads, strengths, pore pressures, and model error as distributions rather than perfectly known constants. They do not eliminate engineering judgment; they expose where judgment enters.\n\nWhitman also worked in soil dynamics and earthquake engineering, fields where response depends on time, cyclic loading, and nonlinear behavior. That background reinforced an important lesson: a structure or slope can have several failure modes, and the controlling mode may change as conditions evolve. Monitoring data should update the assessment rather than sit beside an unchanged design calculation.\n\nFor high-consequence earth structures, governance is part of reliability. Independent review, clear alarm thresholds, credible evacuation planning, and authority to stop operations reduce risk even when the exact failure probability remains uncertain. A numerical margin is meaningful only if the observations feeding it are current and the organization is prepared to act when the margin shrinks. Emergency planning belongs in the same analysis, because warning time and downstream exposure determine how a technical failure becomes a human disaster.",
      "frame": "Closes the production ledger. \"Whitman treated uncertainty as something to manage, not a reason to postpone. Show me how probability and consequence belong in the same decision.\"",
      "q": [
        {
          "q": "What does geotechnical risk combine?",
          "o": [
            {
              "t": "The likelihood of a failure mode with the consequences if that failure occurs; on record.",
              "v": "expert",
              "fb": "Risk depends on both probability and consequence rather than either one alone."
            },
            {
              "t": "The calculated factor of safety with the construction cost of adding another monitoring instrument.",
              "v": "partial",
              "fb": "Cost matters in decisions, but risk begins with likelihood and consequence."
            },
            {
              "t": "The most favorable soil strength with the least disruptive interpretation of the monitoring data.",
              "v": "wrong",
              "fb": "Selecting favorable inputs hides uncertainty instead of managing it."
            },
            {
              "t": "A very uncertain probability can justify inaction even when the possible loss is catastrophic.",
              "v": "danger",
              "fb": "Large consequences can require precaution despite uncertainty in the exact probability."
            }
          ]
        },
        {
          "q": "Why use reliability methods in geotechnical engineering?",
          "o": [
            {
              "t": "They represent uncertainty in loads, strengths, pore pressure, and model error rather than hiding it.",
              "v": "expert",
              "fb": "Reliability analysis makes uncertain inputs and assumptions visible."
            },
            {
              "t": "They convert every uncertain soil property into one exact value suitable for a final design table.",
              "v": "partial",
              "fb": "Reliability does not remove uncertainty; it represents and propagates it."
            },
            {
              "t": "They show that field observations are unnecessary once a probability has been calculated.",
              "v": "wrong",
              "fb": "Monitoring can update the probability as real conditions change."
            },
            {
              "t": "They allow a manager to choose a low failure estimate without documenting the assumptions behind it.",
              "v": "danger",
              "fb": "Transparent assumptions are essential to a credible risk estimate."
            }
          ]
        },
        {
          "q": "Which action best follows a risk-based approach?",
          "o": [
            {
              "t": "Update the assessment with monitoring trends and preserve independent authority to stop operations.",
              "v": "expert",
              "fb": "Risk management must connect new evidence to decisions and protective actions."
            },
            {
              "t": "Keep the original assessment in force while treating later instrument trends as a separate maintenance matter.",
              "v": "partial",
              "fb": "The design assessment should change when conditions and measurements change."
            },
            {
              "t": "Focus on the most likely failure mode and omit lower-probability modes with severe consequences; in use.",
              "v": "wrong",
              "fb": "Low-probability, high-consequence modes still belong in the risk picture."
            },
            {
              "t": "Delay escalation until the estimated probability becomes precise enough to remove managerial disagreement.",
              "v": "danger",
              "fb": "Waiting for false precision can consume the time available for protective action."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "tl_walker": {
      "tl_crest": "",
      "tl_toe": "",
      "tl_office": ""
    },
    "tl_reader": {
      "tl_crest": "",
      "tl_toe": "",
      "tl_office": ""
    },
    "tl_clerk": {
      "tl_crest": "",
      "tl_toe": "",
      "tl_office": ""
    }
  },
  "story": [
    "<b>The Serra Verde Tailings Dam</b> opens inside the Serra Verde tailings inquiry, where the visible evidence supports more than one plausible account.",
    "<b>Dam-Walker Ana Reis</b>, <b>The Instrument Reader</b>, and <b>The Clerk</b> each control a different part of the record.",
    "The inquiry is pulled between <b>A blast or an earthquake shaking the dam</b> and <b>A freak downpour overtopping the dam — an act of God</b>, while the readings test what each explanation can actually support.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide the <b>WHAT</b> from the evidence."
  ],
  "endings": {
    "overclaimWhat": "tl_quake",
    "dismissalWhat": "tl_rain",
    "win": {
      "expertTitle": "",
      "expert": [
        "",
        ""
      ],
      "soundTitle": "",
      "sound": [
        "",
        ""
      ],
      "namedTitle": "",
      "named": [
        "",
        ""
      ]
    },
    "overclaim": {
      "title": "",
      "body": [
        "",
        ""
      ]
    },
    "dismissal": {
      "title": "",
      "body": [
        "",
        ""
      ]
    },
    "wrongNames": {
      "title": "",
      "body": [
        ""
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A raised tailings dam with rising piezometer pressure\"><path d=\"M34 112 L178 42 L326 112 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.6\"/><path d=\"M178 42 L232 70 L286 96\" fill=\"none\" stroke=\"#e2e2d8\" stroke-width=\"1\"/><line x1=\"240\" y1=\"42\" x2=\"240\" y2=\"112\" stroke=\"#121212\" stroke-width=\"1.4\"/><path d=\"M232 90 H248\" stroke=\"#B3261E\" stroke-width=\"5\"/><path d=\"M374 106 V28 M374 106 H610\" stroke=\"#121212\" stroke-width=\"1.4\"/><path d=\"M396 92 L438 84 L480 70 L522 46 L574 34\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2.2\"/><path d=\"M396 62 H584\" stroke=\"#326891\" stroke-width=\"1.3\" stroke-dasharray=\"4 4\"/></svg>"
}};
