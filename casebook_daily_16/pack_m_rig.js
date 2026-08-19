module.exports = { PACK: {
  "id": "m_rig",
  "title": "The Deepwater Meridian",
  "discipline": "Drilling & Well Control",
  "teaser": "An offshore rig blew out and burned at the wellhead. An enemy strike on the platform? A freak pocket of gas no one could predict? Or a safety test that was skipped?",
  "overclaimTag": "an attack on the rig",
  "truthTag": "a skipped cement test and a disabled preventer",
  "venue": "the Meridian blowout inquiry",
  "agent": {
    "name": "Investigator Ike Marlow",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Commission credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Drilling & Well-Control Pioneers",
  "dossierName": "DRILLING & WELL-CONTROL PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Meridian blowout inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The place you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "An attack or sabotage on the platform is persuasive at first glance; the measurements and sequence must decide whether it survives.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "rg_operator",
      "items": [
        {
          "id": "rg_operator",
          "label": "Dalton Voss — well operator's rig manager"
        },
        {
          "id": "rg_driller",
          "label": "The rig's driller"
        },
        {
          "id": "rg_regulator",
          "label": "The offshore-safety regulator"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "rg_office",
      "items": [
        {
          "id": "rg_wellhead",
          "label": "The Wellhead & Blowout Preventer"
        },
        {
          "id": "rg_floor",
          "label": "The Drill Floor & Mud Logging"
        },
        {
          "id": "rg_office",
          "label": "The Operator's Onshore Office"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "rg_wellcontrol",
      "items": [
        {
          "id": "rg_attack",
          "label": "An attack or sabotage on the platform"
        },
        {
          "id": "rg_pocket",
          "label": "A freak gas pocket — an act of God"
        },
        {
          "id": "rg_wellcontrol",
          "label": "A skipped cement test and a disabled blowout preventer"
        }
      ]
    }
  },
  "PLACES": {
    "rg_wellhead": {
      "name": "The Wellhead & Blowout Preventer",
      "xy": [
        140,
        90
      ]
    },
    "rg_floor": {
      "name": "The Drill Floor & Mud Logging",
      "xy": [
        330,
        240
      ]
    },
    "rg_office": {
      "name": "The Operator's Onshore Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "rg_wellhead",
      "rg_floor"
    ],
    [
      "rg_floor",
      "rg_office"
    ]
  ],
  "CHARACTERS": {
    "rg_roughneck": {
      "name": "Roughneck Sal Ortiz",
      "role": "Drill-floor roughneck",
      "face": "🔧",
      "badge": "R",
      "legend": "the drill floor",
      "hint": "Works the tongs; saw the well kick back mud while the alarms were bypassed."
    },
    "rg_mudlogger": {
      "name": "The Mud Logger",
      "role": "Mud-logging technician",
      "face": "📈",
      "badge": "M",
      "legend": "the logging cabin",
      "hint": "Reads the returns; the pressure test failed and got recorded as a pass."
    },
    "rg_clerk": {
      "name": "The Clerk",
      "role": "Operator records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Holds the well plan — and the order to skip the cement bond log to save a day."
    }
  },
  "TOPICMAP": {
    "rg_wellhead": {
      "rg_roughneck": [
        "rg_bernoulli"
      ],
      "rg_mudlogger": [
        "rg_boyle"
      ],
      "rg_clerk": [
        "rg_hubbert"
      ]
    },
    "rg_floor": {
      "rg_roughneck": [
        "rg_pratt"
      ],
      "rg_mudlogger": [
        "rg_hughes"
      ],
      "rg_clerk": [
        "rg_halliburton"
      ]
    },
    "rg_office": {
      "rg_roughneck": [
        "rg_cameron"
      ],
      "rg_mudlogger": [
        "rg_adair"
      ],
      "rg_clerk": [
        "rg_collipp"
      ]
    }
  },
  "TOPICS": {
    "rg_bernoulli": {
      "sci": "Daniel Bernoulli (1700-1782)",
      "topic": "Fluid pressure & flow in the well",
      "lede": "The Swiss mathematician who wrote the book on moving fluids and showed that a well is nothing but a pressure ledger that must balance.",
      "no": 1,
      "profile": "Daniel Bernoulli was a Swiss mathematician and physicist, one of a famous mathematical family, whose 1738 masterwork 'Hydrodynamica' founded the study of fluids in motion. His central result, still taught as Bernoulli's principle, is a statement of energy conservation along a streamline: where a flowing fluid speeds up its pressure falls, and where it slows its pressure rises, with pressure, speed, and elevation trading against one another so their sum stays constant. From that single balance he drew consequences reaching from the flow of water in pipes to the rise of oil up a mile of steel.\n\nA drilled well is a plumbing problem Bernoulli would have recognized at once. The column of drilling mud presses down on the rock; the formation at the bottom presses back. So long as the mud's pressure exceeds the formation's, nothing flows in and the well is 'balanced' and quiet. Let the mud pressure slip below the formation's, and fluid enters, accelerates up the narrowing annulus, and loses pressure as it climbs, which only feeds the flow faster. Every kick and every blowout obeys this bookkeeping of pressure and speed.\n\nFor this inquiry, Bernoulli is the reminder that a blowout is not sorcery and not sabotage — it is arithmetic. The pressures at the bottom of the Meridian's well were known, or knowable, before the last valve was set. If someone let the formation's push win, the physics did the rest, exactly as the equation predicts. An 'act of God' invites you to shrug at numbers that sat on a chart; an 'attack' invites you to hunt a villain when the ledger already balances. Follow the pressures, and the well states plainly what was done to it.",
      "frame": "Ortiz jabs a thumb at the standpipe. \"They'll tell you the well 'just let go,' like weather. It doesn't. It's numbers. Show me you can read the pressures and I'll tell you what I felt through the floor.\"",
      "q": [
        {
          "q": "What does Bernoulli's principle say about a flowing fluid?",
          "o": [
            {
              "t": "Where a flowing fluid speeds up, its pressure falls, with the total energy conserved.",
              "v": "expert",
              "fb": "Speed up, pressure down, sum conserved — that is the whole of Bernoulli."
            },
            {
              "t": "A fluid's pressure climbs higher and higher the faster it is forced along a pipe.",
              "v": "wrong",
              "fb": "It is the reverse: faster flow means lower pressure along the streamline."
            },
            {
              "t": "A fluid in motion carries no pressure at all, so a flowing well does not push back.",
              "v": "danger",
              "fb": "Flowing fluid still exerts pressure; a live well pushes hard the whole way up."
            },
            {
              "t": "Speed adds force to a fluid, but its pressure and its speed rarely affect one another.",
              "v": "partial",
              "fb": "They are tightly coupled; trading pressure for speed is the entire idea."
            }
          ]
        },
        {
          "q": "When does formation fluid start entering a well?",
          "o": [
            {
              "t": "When mud pressure at the bottom drops below the pressure of the formation itself.",
              "v": "expert",
              "fb": "Underbalance — formation pressure winning — is exactly when a kick begins."
            },
            {
              "t": "mainly when a charge or intruder physically breaches the casing from the outside.",
              "v": "danger",
              "fb": "No breach is needed; a pressure imbalance alone invites the formation in."
            },
            {
              "t": "Whenever the drill bit is turning, since rotation alone pulls fluid up the hole.",
              "v": "wrong",
              "fb": "Rotation does not draw fluid in; the balance of pressures does."
            },
            {
              "t": "rarely, as a sealed well is proof against inflow no matter how the pressures sit.",
              "v": "partial",
              "fb": "A well is only as sealed as its pressure margin; lose that and fluid enters."
            }
          ]
        },
        {
          "q": "Why does Bernoulli's bookkeeping matter to this board?",
          "o": [
            {
              "t": "Because the pressures that drove the blowout were charted numbers, not mysteries.",
              "v": "expert",
              "fb": "Known, traceable pressures are the antidote to both 'act of God' and 'attack'."
            },
            {
              "t": "Because it suggests mainly a deliberate strike could ever unbalance a modern well.",
              "v": "danger",
              "fb": "Wells go underbalanced through ordinary decisions, no saboteur required."
            },
            {
              "t": "Because it shows well pressures are unknowable, so any cause is as likely as another.",
              "v": "wrong",
              "fb": "Bernoulli made the flow calculable; the numbers narrow the cause sharply."
            },
            {
              "t": "Because it lets the board study the mud alone and ignore the formation largely.",
              "v": "partial",
              "fb": "Both sides of the balance matter; you cannot drop the formation's pressure."
            }
          ]
        }
      ]
    },
    "rg_boyle": {
      "sci": "Robert Boyle (1627-1691)",
      "topic": "The gas law & expanding gas",
      "lede": "The founder of the chemical experiment, who squeezed air in a bent glass tube and found the law that turns a bubble at depth into a wall of gas at the surface.",
      "no": 2,
      "profile": "Robert Boyle was an Anglo-Irish natural philosopher, a founder of the Royal Society, and a champion of the experimental method who insisted that claims be tested, measured, and reported honestly. Working with his assistant Robert Hooke and an improved air pump, he studied the 'spring of the air.' In 1662 he published the relationship now called Boyle's law: at constant temperature, the pressure of a fixed amount of gas is inversely proportional to its volume. Halve the pressure and the gas doubles in size; drop the pressure to a fraction and the gas swells enormously.\n\nThat inverse law is the engine of a blowout. Gas that enters a well at the bottom sits under thousands of pounds of pressure, squeezed into a small volume. As the well flows and that gas migrates upward, the pressure around it falls, and by Boyle's law it expands — slowly at first, then violently in the last few hundred metres, where each drop in pressure multiplies its volume. The expanding gas pushes mud out ahead of it, which lowers the pressure further, which expands the gas further: a runaway that can empty a well in seconds.\n\nFor this inquiry, Boyle explains why a small, ignored inflow becomes a fireball. A kick that looks minor at depth is a coiled spring; let it climb unchecked and Boyle's law releases it all at once. This is not the caprice of a 'freak pocket' — it is a law known since 1662, and it is precisely why wells carry blowout preventers to shut the gas in while it is still small and deep. The physics is old and certain. The only variable at the Meridian was whether the barriers meant to interrupt it were doing their job.",
      "frame": "Ortiz's voice goes flat. \"A cupful of gas down deep is a truckload by the time it reaches you. Prove you understand that, and I'll tell you how fast the floor cleared.\"",
      "q": [
        {
          "q": "What does Boyle's law relate?",
          "o": [
            {
              "t": "A gas's pressure and volume inversely, at a fixed temperature and amount.",
              "v": "expert",
              "fb": "Lower the pressure and the volume rises in proportion — Boyle's inverse law."
            },
            {
              "t": "A gas's temperature and volume directly, so warming generally shrinks the gas.",
              "v": "wrong",
              "fb": "That is a different relation, and warming expands rather than shrinks a gas."
            },
            {
              "t": "A gas's weight and its color, letting one read its pressure by eye at depth.",
              "v": "wrong",
              "fb": "Boyle's law links pressure and volume, not weight and color."
            },
            {
              "t": "A gas's pressure and volume, but mainly for gases that rarely actually flow.",
              "v": "partial",
              "fb": "The law holds for flowing gas too; migrating gas obeys it as it rises."
            }
          ]
        },
        {
          "q": "Why does a small gas kick become dangerous near the surface?",
          "o": [
            {
              "t": "Falling pressure lets it expand fast, pushing out mud and unloading the well.",
              "v": "expert",
              "fb": "Expansion near the top is explosive because pressure drops fastest there."
            },
            {
              "t": "Because the surface air chemically ignites any gas the instant it arrives.",
              "v": "danger",
              "fb": "The danger is expansion and volume, not spontaneous ignition on contact."
            },
            {
              "t": "Because gas gains mass as it rises, growing heavier with every metre it climbs.",
              "v": "wrong",
              "fb": "Its mass is fixed; it is the volume that grows as pressure falls."
            },
            {
              "t": "Because the drill pipe narrows near the top, squeezing the gas into a smaller space.",
              "v": "partial",
              "fb": "Geometry matters less than Boyle's law; the gas expands regardless."
            }
          ]
        },
        {
          "q": "What does Boyle's law say about a 'freak pocket' explanation?",
          "o": [
            {
              "t": "Gas behaves by a known law, so a preventer is meant to catch it while small.",
              "v": "expert",
              "fb": "The physics is predictable, which is exactly why barriers exist to interrupt it."
            },
            {
              "t": "Nothing — expanding gas is chaotic, so no equipment could ever have stopped it.",
              "v": "danger",
              "fb": "Preventers are built precisely because the expansion is lawful and foreseeable."
            },
            {
              "t": "That gas expansion is far too slow to matter over the height of a real well.",
              "v": "wrong",
              "fb": "Expansion accelerates near the surface and is anything but slow."
            },
            {
              "t": "That mainly unusually deep wells ever face expanding gas on the way up.",
              "v": "partial",
              "fb": "Any well with gas below faces expansion; depth changes degree, not kind."
            }
          ]
        }
      ]
    },
    "rg_hubbert": {
      "sci": "M. King Hubbert (1903-1989)",
      "topic": "Subsurface pressure & rock fracture",
      "lede": "The Shell geophysicist famous for predicting peak oil, who also worked out the pressures the rock itself carries and the exact stress at which it splits.",
      "no": 3,
      "profile": "Marion King Hubbert was an American geophysicist, best known publicly for his 1956 prediction of a peak in U.S. oil production, but revered among engineers for putting the mechanics of the subsurface on a rigorous footing. Working at Shell's research lab, he studied how fluids move through rock and how rock deforms and fractures under stress. With David Willis in 1957 he published the theory of hydraulic fracturing, explaining that a formation splits open when the pressure applied to it exceeds the least of the natural stresses squeezing the rock.\n\nHubbert made clear that the underground is not empty space but a stressed, fluid-filled solid with two pressures every driller must respect. There is pore pressure — the pressure of fluids trapped in the rock's pores, which the mud must exceed to keep the formation out. And there is the fracture pressure — the higher pressure at which the rock cracks and swallows the mud. Safe drilling lives in the narrow 'mud-weight window' between them: heavy enough to hold the formation back, light enough not to fracture it and lose the well.\n\nFor this inquiry, Hubbert dismantles the 'freak pocket' story. Formation pressures are not surprises sprung from nowhere; they are estimated before the bit turns, refined while drilling, and logged. An overpressured zone is a hazard you plan for, not an ambush. If the Meridian met pressure its crew had mapped and still lost control, the failure was in the barriers and the decisions, not in the geology. Hubbert's work says the rock plays by rules that were written on the well plan. An 'act of God' asks you to forget that plan; the plan is exactly where an investigator should start.",
      "frame": "The mud logger slides a pore-pressure plot across the bench. \"People love to call the pressure a surprise. It was on this chart. Show me you understand it, and I'll show you what the plan actually said.\"",
      "q": [
        {
          "q": "What is pore pressure?",
          "o": [
            {
              "t": "The pressure of fluids held in the rock's pores, which the mud must exceed.",
              "v": "expert",
              "fb": "Pore pressure is what the mud's head has to overbalance to hold the formation."
            },
            {
              "t": "The weight of the rig and derrick bearing straight down on the seabed below.",
              "v": "wrong",
              "fb": "That is surface load; pore pressure is the fluid pressure within the rock."
            },
            {
              "t": "The pressure a saboteur would inject to force a sealed formation into flowing.",
              "v": "danger",
              "fb": "Pore pressure is natural to the rock; no injection is needed for it to exist."
            },
            {
              "t": "The pressure inside the drill pipe, set largely by how hard the pumps run.",
              "v": "partial",
              "fb": "Pump pressure is separate; pore pressure belongs to the formation itself."
            }
          ]
        },
        {
          "q": "What is the 'mud-weight window'?",
          "o": [
            {
              "t": "The range heavy enough to hold the formation yet light enough not to fracture it.",
              "v": "expert",
              "fb": "Between pore pressure and fracture pressure is the safe window Hubbert defined."
            },
            {
              "t": "The span of hours in which a well can be drilled before the mud spoils.",
              "v": "wrong",
              "fb": "It is a range of mud weights, not a window of time."
            },
            {
              "t": "The gap between two rig shifts, when no one is watching the mud at all.",
              "v": "wrong",
              "fb": "It refers to fluid density limits, not to crew scheduling."
            },
            {
              "t": "The mud weight the pumps prefer, chosen for smooth flow rather than safety.",
              "v": "partial",
              "fb": "The window is set by formation limits, not by what the pumps like."
            }
          ]
        },
        {
          "q": "How does Hubbert's work read the 'freak pocket' claim?",
          "o": [
            {
              "t": "As avoidable — formation pressures are mapped and planned for before drilling.",
              "v": "expert",
              "fb": "Charted, predictable pressures are the opposite of an unforeseeable pocket."
            },
            {
              "t": "As proof of the unknowable, since deep pressures does not be estimated at all.",
              "v": "wrong",
              "fb": "Hubbert's methods estimate them well; ambush is rarely the real story."
            },
            {
              "t": "As evidence that mainly a planted charge could have raised the pressure so high.",
              "v": "danger",
              "fb": "High pressure is natural and predicted; it needs no charge to explain it."
            },
            {
              "t": "As a matter for the geologist alone, of no concern to the well's barriers.",
              "v": "partial",
              "fb": "Geology sets the challenge; barriers and decisions determine the outcome."
            }
          ]
        }
      ]
    },
    "rg_pratt": {
      "sci": "Wallace Pratt (1885-1981)",
      "topic": "Petroleum geology & the reservoir",
      "lede": "The Humble Oil geologist who insisted oil is found first in the minds of men, and taught an industry to read the rock before it drilled.",
      "no": 4,
      "profile": "Wallace Everette Pratt was one of America's most influential petroleum geologists, a founder and long-serving chief geologist of Humble Oil (later part of Exxon). He rose to prominence in the early twentieth century as the industry shifted from wildcat luck to systematic science, and he championed geology as the discipline that finds oil. His often-quoted line — 'oil is first found in the minds of men' — captured his belief that understanding the subsurface, not blind drilling, is what turns rock into a reservoir.\n\nPratt taught that a commercial reservoir requires a specific combination: a source rock that generated hydrocarbons, a porous and permeable reservoir rock to hold them, and an impermeable cap rock or trap to keep them from escaping over geologic time. Oil and gas migrate upward through the crust until a trap stops them, accumulating under pressure. Where the geology is understood, the depth, pressure, and character of a reservoir can be anticipated before a well is drilled — which is the whole purpose of the science he helped build.\n\nFor this inquiry, Pratt frames the reservoir as a known adversary, not a lurking monster. The Meridian's target was studied, mapped, and modelled; its pressure and productivity were estimated in advance. A geologist's reservoir behaves as its trap and rock dictate — it does not conspire and it does not detonate. When a well reaches a formation the science already described and control is lost anyway, the explanation lies in how the well was built and handled, not in the rock's malice. Pratt's legacy tells the board to trust the geology it has, and to look at the human choices layered on top of it.",
      "frame": "Ortiz thumbs a rolled-up prospect map. \"The geologists knew what was down there before we spudded. This wasn't a monster we woke up. Show me you understand the reservoir, and I'll tell you the rest.\"",
      "q": [
        {
          "q": "What three elements did Pratt say make a commercial reservoir?",
          "o": [
            {
              "t": "A source rock, a porous reservoir rock, and a trap that holds the oil in.",
              "v": "expert",
              "fb": "Source, reservoir, and trap together are the classic petroleum system."
            },
            {
              "t": "A deep enough well, a fast enough pump, and a calm enough sea overhead.",
              "v": "wrong",
              "fb": "Those are operational; Pratt's elements are geological — source, reservoir, trap."
            },
            {
              "t": "A salt dome, a coal seam, and a river delta stacked directly on top of it.",
              "v": "wrong",
              "fb": "Some traps involve salt, but the general system is source, reservoir, and trap."
            },
            {
              "t": "A porous rock alone, since oil forms in place wherever the pores are open.",
              "v": "partial",
              "fb": "Porosity is one part; oil must be sourced and trapped as well."
            }
          ]
        },
        {
          "q": "Why did Pratt say oil is 'found in the minds of men'?",
          "o": [
            {
              "t": "Because understanding the subsurface, not blind luck, is what locates oil.",
              "v": "expert",
              "fb": "Pratt made geological reasoning, not chance, the way oil is found."
            },
            {
              "t": "Because oil is imaginary until a rig suggests it, so geology tells us nothing.",
              "v": "wrong",
              "fb": "He meant geology reveals real oil; it is far from useless."
            },
            {
              "t": "Because mainly a saboteur's mind decides where a well will truly fail.",
              "v": "danger",
              "fb": "The phrase is about discovery through science, not about sabotage."
            },
            {
              "t": "Because drilling in enough places at random will generally strike oil eventually.",
              "v": "partial",
              "fb": "That is the wildcat approach Pratt argued against with science."
            }
          ]
        },
        {
          "q": "How should the board regard a well-mapped reservoir?",
          "o": [
            {
              "t": "As a known adversary whose pressure and yield were estimated in advance.",
              "v": "expert",
              "fb": "A studied reservoir is predictable; loss of control points to human choices."
            },
            {
              "t": "As an unknowable force, so the blowout could not have been foreseen at all.",
              "v": "wrong",
              "fb": "Mapping makes it foreseeable; that is why geology is done before drilling."
            },
            {
              "t": "As proof the rock itself turned hostile and struck the platform deliberately.",
              "v": "danger",
              "fb": "Rock does not attack; a described reservoir simply behaved as expected."
            },
            {
              "t": "As irrelevant once drilling starts, since geology stops mattering at that point.",
              "v": "partial",
              "fb": "Geology guides the whole operation; it never stops informing well control."
            }
          ]
        }
      ]
    },
    "rg_hughes": {
      "sci": "Howard Hughes Sr. (1869-1924)",
      "topic": "The roller-cone drill bit",
      "lede": "The inventor whose rolling-cutter bit chewed through rock that had stopped every driller before him, and built the fortune his famous son would spend.",
      "no": 5,
      "profile": "Howard Robard Hughes Sr. was an American inventor and businessman who, with partner Walter Sharp, patented the two-cone roller drill bit in 1909 and founded the Sharp-Hughes Tool Company. Before his bit, wells were drilled largely by pounding or by simple fishtail blades that failed quickly in hard rock. Hughes's design put rotating cones studded with hardened teeth at the end of the pipe; as the drill string turned, the cones rolled and their teeth chipped and crushed the rock beneath, drilling formations that had been effectively impassable.\n\nThe roller-cone bit transformed drilling from a shallow art into a deep science, opening reservoirs that older tools could never have reached and making Hughes's company (later Hughes Tool) a cornerstone of the oil-field supply business. The principle — rolling cutters that fail rock by crushing rather than scraping — remains the basis of many bits today, refined with tungsten-carbide inserts and sealed bearings, and it is one reason wells now routinely reach depths measured in miles.\n\nFor this inquiry, Hughes represents the deep well as a normal, achievable thing — and a demanding one. Reaching a pressured formation far below the seabed is routine engineering, but every added mile of depth raises the pressures the barriers must hold and shortens the time a crew has to react to a kick. The bit that made such depths possible did not make them casual. Hughes's legacy reminds the board that depth alone explains nothing: it is not a mysterious frontier where 'freak' events lurk, but a well-understood regime whose hazards are met by design, cement, and preventers. Where those held, deep wells are safe; where they were skipped, depth only sharpened the consequences.",
      "frame": "Ortiz spins a worn cone bit on the bench. \"Hughes made it possible to drill this deep. Deep isn't magic — it's just less time to fix a mistake. Prove you understand the tool, and I'll talk.\"",
      "q": [
        {
          "q": "How does a roller-cone bit break rock?",
          "o": [
            {
              "t": "Rotating cones press hardened teeth into the rock, crushing and chipping it.",
              "v": "expert",
              "fb": "Rolling cutters that crush the rock are Hughes's core innovation."
            },
            {
              "t": "A single fixed blade scrapes the rock away exactly as the old fishtails did.",
              "v": "wrong",
              "fb": "That is the older design Hughes's rolling cones replaced."
            },
            {
              "t": "A jet of burning gas melts the rock ahead of the pipe as it advances.",
              "v": "wrong",
              "fb": "There is no flame; the cones crush rock mechanically."
            },
            {
              "t": "Pounding the pipe up and down to hammer through the formation by impact.",
              "v": "partial",
              "fb": "That is cable-tool pounding; Hughes's bit rolls and crushes instead."
            }
          ]
        },
        {
          "q": "Why did the roller-cone bit matter to the industry?",
          "o": [
            {
              "t": "It let drillers pass hard rock and reach far deeper, pressured reservoirs.",
              "v": "expert",
              "fb": "Deeper reach into hard formations was the bit's transformative gift."
            },
            {
              "t": "It removed the need for any drilling mud, since the cones cooled themselves.",
              "v": "wrong",
              "fb": "Mud remained essential for cooling, lifting cuttings, and control."
            },
            {
              "t": "It made blowout preventers unnecessary by drilling too slowly to cause kicks.",
              "v": "danger",
              "fb": "Faster, deeper drilling raised the stakes; preventers grew more vital, not less."
            },
            {
              "t": "It let wells be drilled without any casing, straight into open hard rock.",
              "v": "partial",
              "fb": "Casing stayed essential; the bit improved cutting, not well construction."
            }
          ]
        },
        {
          "q": "What does depth itself imply about a blowout's cause?",
          "o": [
            {
              "t": "Depth is routine but demanding; it sharpens consequences, it does not create mystery.",
              "v": "expert",
              "fb": "Deep wells are well understood; depth explains speed, not an unforeseeable freak."
            },
            {
              "t": "Deep wells are a frontier where freak events strike beyond any prevention.",
              "v": "danger",
              "fb": "Depth is engineered for; its hazards are met by design, not left to chance."
            },
            {
              "t": "Depth makes wells inherently safer, so a deep blowout would be an outside attack.",
              "v": "wrong",
              "fb": "Depth raises pressures and shortens reaction time; it does not imply sabotage."
            },
            {
              "t": "Depth is the sole cause of any blowout, regardless of how the well was built.",
              "v": "partial",
              "fb": "Depth is a factor; barriers and decisions determine whether control is kept."
            }
          ]
        }
      ]
    },
    "rg_halliburton": {
      "sci": "Erle P. Halliburton (1892-1957)",
      "topic": "Oil-well cementing",
      "lede": "The tinkerer who pumped cement down a well to seal it, patented the method against fierce resistance, and made the sealed borehole the foundation of well control.",
      "no": 6,
      "profile": "Erle Palmer Halliburton was an American oil-field entrepreneur who turned well cementing into a reliable, measured process and built one of the world's great oil-service companies around it. In the early 1920s, borrowing an idea from a former employer, he developed a method for pumping cement slurry down the inside of the casing and up into the space behind it, then founded the Halliburton Oil Well Cementing Company in 1919 in Oklahoma. He patented his jet mixer and cementing techniques and defended them vigorously, standardizing a step that had been crude and unreliable.\n\nCementing is the operation that seals a well. After steel casing is run into the hole, cement is pumped down and around it to bond the pipe to the rock and, above all, to isolate the pressured formations from one another and from the surface. A good cement job at the bottom of a well is the primary barrier against the reservoir: it keeps oil and gas confined until they are meant to be produced. A bad job — cement that channels, fails to set, or is contaminated — leaves a hidden path for gas to migrate up behind the casing.\n\nFor this inquiry, cement is the heart of the matter. It is the barrier the whole well rests on, and its condition is not a matter of faith: it is tested. A negative-pressure test checks whether the cement and casing hold when the mud's weight is reduced, and a cement bond log images the seal directly. A cement job accepted without a convincing test is a barrier assumed rather than proven. If the Meridian's crew ran seawater in and trusted a cement seal no test had confirmed — or dismissed a test that failed — then the well's first defence was never really in place. Halliburton's discipline was to prove the seal, not to hope for it.",
      "frame": "The clerk sets a well diagram on the desk and taps the shoe. \"Everything hangs on the cement down here. It's meant to be tested, not trusted. Show me you understand that, and I'll show you what the plan ordered.\"",
      "q": [
        {
          "q": "What is the purpose of cementing a well?",
          "o": [
            {
              "t": "To bond the casing to the rock and isolate the pressured formations behind it.",
              "v": "expert",
              "fb": "Cement seals and isolates the formations — the well's primary barrier."
            },
            {
              "t": "To lubricate the casing so the drill string slides in and out more smoothly.",
              "v": "wrong",
              "fb": "Cement seals; it is not a lubricant for the drill string."
            },
            {
              "t": "To fill the whole borehole solid so no oil is ever produced from the well.",
              "v": "wrong",
              "fb": "Cement isolates zones behind the pipe; the well still produces through it."
            },
            {
              "t": "To cool the reservoir rock so its pressure drops to a safe level before flow.",
              "v": "partial",
              "fb": "Cement does not cool the reservoir; it seals and isolates the well."
            }
          ]
        },
        {
          "q": "What is a bad cement job likely to leave behind?",
          "o": [
            {
              "t": "Channels or gaps that give gas a hidden path to migrate up the well.",
              "v": "expert",
              "fb": "Poor cement channels, letting gas rise behind the casing unseen."
            },
            {
              "t": "A stronger seal than good cement, since gaps let pressure escape harmlessly.",
              "v": "wrong",
              "fb": "Gaps weaken the seal and invite flow; they do not relieve pressure safely."
            },
            {
              "t": "Evidence of a planted charge, since mainly a blast disturbs setting cement.",
              "v": "danger",
              "fb": "Contamination and channeling are ordinary failures, not signs of a bomb."
            },
            {
              "t": "No consequence at all, because the mud alone keeps the well fully sealed.",
              "v": "partial",
              "fb": "Mud is temporary; cement is the permanent barrier, and its flaws matter."
            }
          ]
        },
        {
          "q": "How is a cement barrier meant to be confirmed?",
          "o": [
            {
              "t": "By a negative-pressure test and a bond log, not by assumption or faith.",
              "v": "expert",
              "fb": "Testing proves the seal; an accepted-but-untested job is only assumed."
            },
            {
              "t": "By the rig manager's signature alone, which certifies the cement is sound.",
              "v": "wrong",
              "fb": "A signature is not a test; the barrier must be physically verified."
            },
            {
              "t": "By waiting for the well to flow, since a leak suggests the cement failed.",
              "v": "danger",
              "fb": "Waiting for flow is waiting for a blowout; tests catch failure beforehand."
            },
            {
              "t": "By checking the color of the returns, which reveals the seal below.",
              "v": "partial",
              "fb": "Returns hint at problems, but the seal is confirmed by pressure test and log."
            }
          ]
        }
      ]
    },
    "rg_cameron": {
      "sci": "Harry S. Cameron (well-control equipment pioneer)",
      "topic": "Blowout-preventer engineering",
      "lede": "The Houston machinist who turned a driller's wish into steel, engineering rams that could seal a live well and founding the shop that armed the whole industry.",
      "no": 7,
      "profile": "Harry S. Cameron was an American machinist and engineer whose craftsmanship made the blowout preventer a working reality rather than a good idea. When the driller James Abercrombie brought him the problem of shutting in a flowing well, it was Cameron who solved it in metal: in 1920 the pair founded Cameron Iron Works in Houston, and Cameron engineered the mechanisms that let steel rams close across a wellbore and hold against thousands of pounds of pressure without leaking.\n\nEngineering a preventer is harder than the idea sounds. The rams must seal on rough, sometimes moving pipe; the elastomer seals must survive heat, abrasion, and sand; the hydraulics must drive the rams home in seconds and hold them there; and every part must be machined so no path is left for high-pressure gas. Cameron's shop built to a standard that made the company a fixture of the oil field, and the principles he worked out — replaceable ram blocks, pressure-energized seals, robust hydraulic actuation — still govern how preventers are designed and maintained.\n\nFor this inquiry, Cameron's legacy is that a preventer is only as good as its engineering and its upkeep. A stack is not a charm; it is a machine with seals that wear, hydraulics that must stay charged, and tests that must be run to prove it will close and hold when called. A preventer that was never function-tested, or whose control system was disabled, is engineering defeated by neglect. That steers the board away from an unforeseeable act of nature and away from a phantom saboteur, toward the plain question Cameron would have asked first: was the machine maintained and tested, or was it not?",
      "frame": "Ortiz taps a greasy schematic. \"That preventer's a machine, not a prayer. Seals wear, hydraulics leak, and it only saves you if somebody proves it still works. Show me you know how it's built, and I'll tell you what nobody bothered to test.\"",
      "q": [
        {
          "q": "What made engineering a working preventer so difficult?",
          "o": [
            {
              "t": "The rams and seals had to hold high-pressure gas on rough pipe with no leak path.",
              "v": "expert",
              "fb": "Sealing high-pressure gas on rough pipe with no leak path is the core of the design."
            },
            {
              "t": "The device had to be light enough for a single man to carry up the derrick by hand.",
              "v": "wrong",
              "fb": "Preventers are massive fixed equipment, never carried by hand up the derrick."
            },
            {
              "t": "The rams had to spin continuously to grind away the pipe during normal drilling.",
              "v": "wrong",
              "fb": "Rams close and seal; they never spin or grind during ordinary drilling."
            },
            {
              "t": "The seals mainly had to work in still air, since a well rarely carries real pressure.",
              "v": "danger",
              "fb": "Wells carry enormous pressure; a seal that fails under it is the whole hazard."
            }
          ]
        },
        {
          "q": "Which of Cameron's design principles still endure today?",
          "o": [
            {
              "t": "Replaceable ram blocks, pressure-energized seals, and robust hydraulic actuation.",
              "v": "expert",
              "fb": "Changeable rams, energized seals, and strong hydraulics still define BOP design."
            },
            {
              "t": "A single welded-in ram that can rarely be changed once the whole stack is built.",
              "v": "wrong",
              "fb": "Ram blocks are made replaceable precisely so they can be serviced and swapped."
            },
            {
              "t": "Soft wax seals that are meant to melt away on purpose once the well turns hot.",
              "v": "wrong",
              "fb": "Seals must survive heat; a melting seal would open the well, not shut it in."
            },
            {
              "t": "A manual hand-crank as the mainly means ever used to close the rams on a live well.",
              "v": "partial",
              "fb": "Manual closure exists as a backup, but hydraulics are the primary actuation."
            }
          ]
        },
        {
          "q": "What does Cameron's view imply about a failed preventer?",
          "o": [
            {
              "t": "A stack is a machine that must be tested and maintained, or it will not hold.",
              "v": "expert",
              "fb": "Tested and maintained, a stack holds; neglected, it fails — engineering, not fate."
            },
            {
              "t": "That a preventer does not fail, so any failure would be an outside enemy's doing.",
              "v": "danger",
              "fb": "Preventers fail from worn seals and dead hydraulics far more than from enemies."
            },
            {
              "t": "That a preventer is a charm whose failure is simply fate that no one can prevent.",
              "v": "wrong",
              "fb": "A preventer's failure is traceable to maintenance and testing, never to blind fate."
            },
            {
              "t": "That a preventer needs testing mainly once, on the day it is first installed.",
              "v": "partial",
              "fb": "Preventers are function-tested repeatedly; a single install-day check is not enough."
            }
          ]
        }
      ]
    },
    "rg_adair": {
      "sci": "Red Adair (1915-2004)",
      "topic": "Offshore blowout firefighting",
      "lede": "The most famous firefighter oil ever produced, who capped burning wells from the Sahara to the North Sea and proved even an offshore inferno yields to patience and physics.",
      "no": 8,
      "profile": "Paul Neal \"Red\" Adair was an American oil-well firefighter who became the public face of the trade Myron Kinley invented. After learning the work under Kinley, Adair founded the Red Adair Company in 1959 and spent decades traveling to the world's worst blowouts. In 1962 he capped the 'Devil's Cigarette Lighter,' a Saharan gas fire in Algeria whose flame stood hundreds of feet high; his exploits inspired the 1968 film 'Hellfighters.' He later fought the Bay Marchand fire in the Gulf of Mexico in 1970, the Piper Alpha platform disaster in the North Sea in 1988, and hundreds of the Kuwaiti oil fires set during the 1991 Gulf War.\n\nOffshore work sharpened every difficulty. On a platform there is no room to retreat, wreckage tangles the wellhead, and the sea itself complicates the approach. Adair's method was disciplined rather than reckless: cool the steel with water, clear the debris, snuff the flame with a placed explosive, and then cap or divert the flowing well. Every step assumed the well was still live and lethal until proven otherwise.\n\nFor this inquiry, Adair embodies the offshore blowout as a known, survivable hazard — one the industry has faced and beaten again and again. His career is a catalogue of wells that people brought back under control, which means those wells were never beyond understanding. The Meridian's fire was terrible, but it was the same kind of event Adair spent his life ending. That reframes the board's question: not whether the blaze was some unimaginable act of God or the mark of an enemy, but which ordinary barrier failed to keep the well from ever reaching Adair's arena at all.",
      "frame": "The mud logger sets down a photograph of a capped offshore well. \"Adair beat fires worse than ours and lived to bill for it. That tells you these things are survivable — and preventable. Show me you understand how he worked, and I'll walk you through the returns.\"",
      "q": [
        {
          "q": "What made Red Adair famous in 1962?",
          "o": [
            {
              "t": "He capped the Saharan 'Devil's Cigarette Lighter,' a gas fire hundreds of feet tall.",
              "v": "expert",
              "fb": "The Algerian gas-fire cap made his name and inspired the film 'Hellfighters'."
            },
            {
              "t": "He drilled the very first offshore well ever sunk far out of the sight of land.",
              "v": "wrong",
              "fb": "Adair fought fires; he did not drill the first offshore well."
            },
            {
              "t": "He invented the ram blowout preventer that now sits on top of every wellhead.",
              "v": "wrong",
              "fb": "The ram preventer was Abercrombie and Cameron's work; Adair fought the fires."
            },
            {
              "t": "He proved that offshore fires are unbeatable and would generally be left to burn out.",
              "v": "danger",
              "fb": "Adair's career proved the opposite — even offshore fires can be beaten."
            }
          ]
        },
        {
          "q": "Why is an offshore blowout harder to fight than one on land?",
          "o": [
            {
              "t": "There is no room to retreat, wreckage tangles the head, and the sea blocks approach.",
              "v": "expert",
              "fb": "No retreat, tangled wreckage, and the sea make the offshore approach far harder."
            },
            {
              "t": "The gas offshore is chemically different and does not be snuffed by any explosive.",
              "v": "wrong",
              "fb": "Offshore gas burns and snuffs like any other; the trouble is access, not chemistry."
            },
            {
              "t": "The saltwater around the rig puts the fire out on its own, so no crew is needed.",
              "v": "danger",
              "fb": "The sea does not extinguish a pressured well fire; crews still must cap the flow."
            },
            {
              "t": "Offshore fires are far easier, in truth, since the ocean cools everything at once.",
              "v": "wrong",
              "fb": "The ocean does not cool a roaring wellhead; offshore work is harder, not easier."
            }
          ]
        },
        {
          "q": "How should Adair's career frame the Meridian fire?",
          "o": [
            {
              "t": "As a known, survivable hazard, so the real question is which barrier failed first.",
              "v": "expert",
              "fb": "A survivable, familiar event points to a failed barrier, not to fate or an enemy."
            },
            {
              "t": "As proof the fire was unimaginable, since no one had ever faced its like before.",
              "v": "wrong",
              "fb": "Adair fought this exact kind of fire for decades; nothing about it was unimaginable."
            },
            {
              "t": "As a sign of sabotage, since mainly an enemy could ever light a well quite that badly.",
              "v": "danger",
              "fb": "Blowouts ignite from lost control far more often than from any deliberate attack."
            },
            {
              "t": "As irrelevant to prevention, since firefighting and drilling truly share nothing.",
              "v": "partial",
              "fb": "The same physics links drilling and firefighting; prevention is the near side of it."
            }
          ]
        }
      ]
    },
    "rg_collipp": {
      "sci": "Bruce Collipp (semisubmersible-rig pioneer)",
      "topic": "The floating offshore rig",
      "lede": "The Shell engineer who realised a drilling rig need not touch bottom — sink its hull just below the waves and it will float steady enough to drill the deep.",
      "no": 9,
      "profile": "Bruce Collipp was an American engineer at Shell who is credited with pioneering the semisubmersible drilling rig in the early 1960s. The problem he solved was stability. A ship-shaped vessel rolls and heaves too much to drill safely in open water, while a fixed platform can stand only in shallow depths. Collipp's insight, developed as engineers experimented with submersible rigs, was that a hull carried on large pontoons and columns held well below the waterline would ride far more calmly, because most of its buoyancy sits beneath the turbulent surface where wave action is weak.\n\nBy ballasting the pontoons down until the working deck stood high above a submerged hull, the semisubmersible gained a long, slow natural period of motion that kept it nearly steady even in heavy seas. Moored or, later, dynamically positioned over the wellhead, such rigs could drill in water far too deep for any fixed structure. The design, refined from the first units of the early 1960s, opened the deep-water provinces that fixed platforms could never reach and became a workhorse of offshore drilling.\n\nFor this inquiry, Collipp's rig defines the stage on which the disaster played out — and its limits. A floating rig drills through a riser and a subsea or surface stack, and it depends utterly on well-control barriers because it cannot simply be walked off onto solid ground. The floating platform did not fail because floating is inherently doomed; these rigs work worldwide every day. That reframes the board's task: the Meridian's loss was not the sea defeating a fragile idea, and not an enemy toppling a platform, but a well-control failure on a rig doing exactly what Collipp designed it to do.",
      "frame": "The clerk slides a rig schematic across the desk. \"Understand the machine first. This thing floats on purpose — it's stable, it's proven, it's not some house of cards the sea knocked over. Show me you grasp how it stays up, and I'll open the paperwork.\"",
      "q": [
        {
          "q": "How does a semisubmersible rig stay steady in heavy seas?",
          "o": [
            {
              "t": "Its buoyancy sits in pontoons submerged below the waves, giving slow, steady motion.",
              "v": "expert",
              "fb": "Deep submerged buoyancy gives the long, slow motion that keeps the rig steady."
            },
            {
              "t": "Its flat hull rides on the surface like a ship, rolling with each wave that passes.",
              "v": "wrong",
              "fb": "A ship-shaped hull rolls too much; the submerged pontoons are what settle it."
            },
            {
              "t": "It stands on steel legs driven deep into the seabed, exactly like a fixed platform.",
              "v": "wrong",
              "fb": "A semisubmersible floats; it does not stand on the seabed like a fixed rig."
            },
            {
              "t": "Heavy engines spin flywheels below decks that cancel each wave the moment it arrives.",
              "v": "danger",
              "fb": "No flywheels cancel waves; the stability comes from the submerged hull's buoyancy."
            }
          ]
        },
        {
          "q": "Why did the semisubmersible open up deep water?",
          "o": [
            {
              "t": "It floats directly over the well, reaching depths no fixed platform could stand in.",
              "v": "expert",
              "fb": "Floating over the well let rigs reach depths fixed platforms never could."
            },
            {
              "t": "It drills far faster than any other rig, so the water depth stopped mattering at all.",
              "v": "wrong",
              "fb": "It reached deeper water; the speed of drilling was not the breakthrough."
            },
            {
              "t": "It removed the need for a marine riser or a blowout preventer of any kind at all.",
              "v": "danger",
              "fb": "Floating rigs still need risers and preventers; they lean on them more, not less."
            },
            {
              "t": "It made drilling cheaper on land, which is in fact where most of its work was done.",
              "v": "wrong",
              "fb": "It is an offshore rig built for deep water, not a land-drilling machine."
            }
          ]
        },
        {
          "q": "What does Collipp's rig imply about the Meridian's loss?",
          "o": [
            {
              "t": "A floating rig depends on its well barriers, so a barrier failure is where to look.",
              "v": "expert",
              "fb": "A floating rig lives or dies by its barriers; that is where the answer sits."
            },
            {
              "t": "That floating itself is doomed, so the open sea was generally going to claim this rig.",
              "v": "danger",
              "fb": "These rigs float safely worldwide; floating did not doom the Meridian."
            },
            {
              "t": "That mainly a determined enemy could topple a platform this large and well engineered.",
              "v": "danger",
              "fb": "No enemy toppled it; a floating rig is lost through well control, not attack."
            },
            {
              "t": "That the rig type had no bearing at all on how well control was actually kept.",
              "v": "partial",
              "fb": "The rig type sets the stakes; barriers and decisions still decide the outcome."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "rg_roughneck": {
      "rg_wellhead": "Out on the ruined wellhead Ortiz stares at the capped stack. \"I felt her kick right here — the whole floor shuddered. Mud came back at us wrong, and the alarms just... didn't,\" he says.",
      "rg_floor": "On the drill floor Ortiz works an imaginary set of tongs from memory. \"I've made this connection a thousand times. That night the well was talking, and somebody turned the volume way down,\" he mutters.",
      "rg_office": "In the onshore office Ortiz looks out of place in his coveralls. \"They make the calls in rooms like this,\" he says, \"then act shocked when the floor pays for them.\""
    },
    "rg_mudlogger": {
      "rg_wellhead": "At the wellhead the mud logger studies the twisted preventer. \"The numbers were right here on the returns,\" she says. \"A well tells you before it goes. This one told us.\"",
      "rg_floor": "In the logging cabin she rewinds the pressure charts. \"A test can fail and still get written down as a pass,\" she says quietly. \"Ink is a lot cheaper than rig time.\"",
      "rg_office": "In the office the mud logger sets her charts beside the operator's report. \"Same well, two different stories,\" she says. \"One of them was measured. The other one was convenient.\""
    },
    "rg_clerk": {
      "rg_wellhead": "The clerk rarely comes to the wellhead and flinches at the wind. \"I only ever knew this well as paper,\" he admits, \"but the paper knew exactly what the steel would do.\"",
      "rg_floor": "On the drill floor the clerk clutches a folder to his chest. \"Every step out here has an order behind it somewhere,\" he says. \"Find the order, and you find the reason.\"",
      "rg_office": "At his desk the clerk lowers his voice. \"The plan changed to save a day,\" he says. \"I filed the change. I did not sign off on it.\""
    }
  },
  "story": [
    "<b>The Deepwater Meridian</b> opens inside the Meridian blowout inquiry, where the visible evidence supports more than one plausible account.",
    "<b>Roughneck Sal Ortiz</b>, <b>The Mud Logger</b>, and <b>The Clerk</b> each control a different part of the record.",
    "The inquiry is pulled between <b>An attack or sabotage on the platform</b> and <b>A freak gas pocket — an act of God</b>, while the readings test what each explanation can actually support.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide the <b>WHAT</b> from the evidence."
  ],
  "endings": {
    "overclaimWhat": "rg_attack",
    "dismissalWhat": "rg_pocket",
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
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"An offshore rig above a well blowout\"><path d=\"M0 108 C120 98,240 116,360 106 S540 98,660 108\" fill=\"none\" stroke=\"#326891\" stroke-width=\"1.5\"/><path d=\"M160 102 L206 26 L252 102 M178 72 H234 M168 88 H244\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.6\"/><path d=\"M206 102 V122\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M206 78 C190 62,194 48,206 36 C218 48,222 62,206 78\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2.2\"/><path d=\"M340 54 H566 V102 H340 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.4\"/><path d=\"M454 54 V102\" stroke=\"#e2e2d8\" stroke-width=\"1\"/></svg>"
}};
