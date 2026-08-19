module.exports = { PACK: {
  "id": "dam",
  "title": "The Marrow Valley Dam",
  "discipline": "Hydraulics & Geotechnics",
  "teaser": "An earth dam let go at midnight and took the town below. Sabotage? A thousand-year flood? Or seepage someone ignored?",
  "overclaimTag": "sabotage or an earthquake",
  "truthTag": "a concealed internal erosion",
  "venue": "the Marrow Valley dam inquiry",
  "agent": {
    "name": "Inspector Dale Ferran",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Engineering credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Hydraulics Pioneers",
  "dossierName": "HYDRAULICS & SOIL PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Marrow Valley dam inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The WHERE you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "And beware the answer the town is shouting for: the evidence points not to a blast in the night, but to something slower, and far harder to forgive.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "owner",
      "items": [
        {
          "id": "owner",
          "label": "Cass Herrick — dam owner"
        },
        {
          "id": "chief",
          "label": "The chief engineer"
        },
        {
          "id": "inspector",
          "label": "The state dam inspector"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "office",
      "items": [
        {
          "id": "spillway",
          "label": "The Spillway & Outlet Works"
        },
        {
          "id": "embankment",
          "label": "The Embankment & Abutment"
        },
        {
          "id": "office",
          "label": "The Owner's Project Office"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "piping",
      "items": [
        {
          "id": "attack",
          "label": "Sabotage or an earthquake strike"
        },
        {
          "id": "flood",
          "label": "A freak flood — an act of God"
        },
        {
          "id": "piping",
          "label": "A concealed internal erosion through the dam"
        }
      ]
    }
  },
  "PLACES": {
    "spillway": {
      "name": "The Spillway & Outlet Works",
      "xy": [
        140,
        90
      ]
    },
    "embankment": {
      "name": "The Embankment & Abutment",
      "xy": [
        330,
        240
      ]
    },
    "office": {
      "name": "The Owner's Project Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "spillway",
      "embankment"
    ],
    [
      "embankment",
      "office"
    ]
  ],
  "CHARACTERS": {
    "warden": {
      "name": "Warden Sol",
      "role": "Downstream warden",
      "face": "💧",
      "badge": "W",
      "legend": "the toe",
      "hint": "Walks the toe of the dam; logged the muddy seepage that kept growing."
    },
    "clerk": {
      "name": "The Clerk",
      "role": "Records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Keeps the inspection reports and the change-orders that shelved them."
    },
    "surveyor": {
      "name": "Surveyor Pine",
      "role": "Embankment surveyor",
      "face": "📐",
      "badge": "S",
      "legend": "the crest",
      "hint": "Reads the instruments on the crest; the settlement gauges were moving."
    }
  },
  "TOPICMAP": {
    "spillway": {
      "warden": [
        "hydrostatics"
      ],
      "clerk": [
        "seepage"
      ],
      "surveyor": [
        "filters"
      ]
    },
    "embankment": {
      "warden": [
        "porepressure"
      ],
      "clerk": [
        "shallowwater"
      ],
      "surveyor": [
        "stfrancis"
      ]
    },
    "office": {
      "warden": [
        "infiltration"
      ],
      "clerk": [
        "seismicdam"
      ],
      "surveyor": [
        "damsafety"
      ]
    }
  },
  "TOPICS": {
    "hydrostatics": {
      "sci": "Blaise Pascal (1623-1662)",
      "topic": "Hydrostatic pressure & head",
      "lede": "The French prodigy who burst a stout cask with a thin tube of water and proved that depth, not volume, builds the pressure.",
      "no": 1,
      "profile": "Blaise Pascal was a French mathematician, physicist, and philosopher who, in a few short years, laid the foundations of fluid statics. In experiments around 1647 to 1653 he established what we now call Pascal's law: pressure applied to a confined fluid is transmitted undiminished in every direction. He showed that the pressure at a point in a fluid at rest depends only on the depth below the surface, not on the shape of the container. His famous 'barrel' demonstration, in which a tall thin tube of water burst a stout cask, proved that it is height, not volume, that builds pressure.\n\nFrom this comes the idea of head: the pressure at the base of a body of water equals the weight of the column above it, so engineers speak of pressure as a height of water. A reservoir a hundred feet deep presses on the dam and its foundation with a force set by that depth, and that same pressure reaches into every crack, pore, and seam the water can touch. Pascal also clarified how pressure acts on submerged surfaces and pioneered the hydraulic-press principle, in which a small force over a small area balances a large force over a large one.\n\nFor this inquiry, Pascal's law is where suspicion must start. The reservoir needs no saboteur and no freak storm to push water into the dam; the head is always there, patiently, driving water into the embankment day and night. That steady pressure is what feeds a slow leak and can turn a trickle into an eroding channel over months. Understanding that the force comes from depth, not drama, helps the board see that a failure can be born from ordinary, ever-present pressure working on a weakness, not from a sudden blast or a once-in-a-thousand-year wave.",
      "frame": "Scrapes river mud off his boots. \"Folks think it takes a storm to break a dam. It don't. That water pushes every minute of every day. Tell me you know where the push comes from.\"",
      "q": [
        {
          "q": "What does Pascal's law say about pressure in a confined fluid?",
          "o": [
            {
              "t": "It is passed on equally in every direction throughout the fluid.",
              "v": "expert",
              "fb": "Equal transmission in all directions is exactly Pascal's law."
            },
            {
              "t": "It builds primarily where a shock or blast first strikes the water.",
              "v": "danger",
              "fb": "Pressure needs no blast; a still reservoir transmits it constantly."
            },
            {
              "t": "It acts straight downward, so primarily the floor of the vessel feels it.",
              "v": "wrong",
              "fb": "Fluid pressure acts in all directions, not primarily downward."
            },
            {
              "t": "It rises with the volume of water held, not with the depth, in use.",
              "v": "partial",
              "fb": "Depth sets the pressure, not the volume held behind the dam."
            }
          ]
        },
        {
          "q": "What does the term 'head' describe?",
          "o": [
            {
              "t": "Pressure at a depth, written as a height of water above it.",
              "v": "expert",
              "fb": "Head expresses pressure as the equivalent column of water."
            },
            {
              "t": "The flow of water spilling over the top of the dam's crest.",
              "v": "wrong",
              "fb": "That is overtopping flow, not the meaning of head."
            },
            {
              "t": "The width of the reservoir measured across its broadest point.",
              "v": "partial",
              "fb": "Head is about pressure and depth, not the reservoir's width."
            },
            {
              "t": "The surge a sudden wave adds on top of the normal water line.",
              "v": "danger",
              "fb": "Head is the steady standing pressure, not a wave's surge."
            }
          ]
        },
        {
          "q": "Why does Pascal's law matter to how this dam failed?",
          "o": [
            {
              "t": "Steady head drives water into the dam with no storm or attack needed.",
              "v": "expert",
              "fb": "Ever-present head can feed a leak for months without any drama."
            },
            {
              "t": "primarily a blast could force water deep into a solid earth embankment.",
              "v": "danger",
              "fb": "The reservoir's own pressure pushes water in; no blast is required."
            },
            {
              "t": "Pressure vanishes once water stops flowing, so a calm reservoir is safe.",
              "v": "wrong",
              "fb": "A still reservoir still presses hard; the head rarely goes away."
            },
            {
              "t": "Head primarily matters during a flood, when the water tops the spillway.",
              "v": "partial",
              "fb": "Head presses at every water level, not primarily in flood."
            }
          ]
        }
      ]
    },
    "seepage": {
      "sci": "Henry Darcy (1803-1858)",
      "topic": "Darcy's law & seepage",
      "lede": "The engineer who gave Dijon its water and, in a column of sand, found the law that governs every leak through every dam.",
      "no": 2,
      "profile": "Henry Darcy was a French engineer who gave his home city of Dijon one of the finest water supplies in Europe, and who, along the way, discovered the law that governs how water moves through soil. In 1856, investigating the sand filters used to clean the city's supply, he ran careful experiments passing water through columns of sand. He found the flow rate was proportional to the cross-sectional area, proportional to the difference in water pressure across the sand, and inversely proportional to the length of the path, a relation now called Darcy's law.\n\nWritten as flow equals permeability times area times the hydraulic gradient, the law says seepage depends on the permeability of the material, the area, and the gradient, meaning how steeply the pressure head falls along the flow path. Coarse gravel has a high permeability and passes water freely; dense clay has a very low one. Darcy's law is the foundation of groundwater hydrology and of every calculation of seepage through and beneath a dam.\n\nFor this inquiry, Darcy is the quiet center of the case. Every earth dam seeps; water under reservoir head steadily works its way through the embankment along paths governed by Darcy's law. That seepage is normal, until it is not. When the flow at the toe grows over weeks, or turns cloudy with soil it is carrying away, the gradient is high enough to move particles, and the law that describes gentle filtration now describes erosion. Darcy teaches the board to read seepage as data, not decoration: a leak that increases and muddies is not an act of God or a bomb, but water obeying a known law through a widening flaw.",
      "frame": "Squares a stack of reports. \"Seepage was logged. It was always logged, and always filed as normal. Before I hand you these, satisfy me that you know what seepage actually is.\"",
      "q": [
        {
          "q": "What did Darcy's sand-column experiments measure?",
          "o": [
            {
              "t": "Flow of water through sand as pressure and path length varied.",
              "v": "expert",
              "fb": "He related seepage flow to gradient and permeability."
            },
            {
              "t": "The pressure a full reservoir exerts on the face of a dam.",
              "v": "wrong",
              "fb": "That is hydrostatic load, not Darcy's seepage work."
            },
            {
              "t": "The rate rain soaks into a bare soil surface during a storm.",
              "v": "partial",
              "fb": "That is infiltration; Darcy studied flow through the soil."
            },
            {
              "t": "The force needed to blast a channel through a packed embankment.",
              "v": "danger",
              "fb": "Darcy's law describes gentle seepage, not blasting."
            }
          ]
        },
        {
          "q": "In Darcy's law, what does permeability describe?",
          "o": [
            {
              "t": "How readily a material lets water seep through it.",
              "v": "expert",
              "fb": "Permeability is the material's ability to transmit water."
            },
            {
              "t": "How much water a reservoir can store behind the dam.",
              "v": "wrong",
              "fb": "That is storage, not permeability."
            },
            {
              "t": "How steeply the pressure head falls along the flow path.",
              "v": "partial",
              "fb": "That is the gradient, a separate term in the law."
            },
            {
              "t": "How quickly a crack from an earthquake will open up.",
              "v": "danger",
              "fb": "Permeability is a soil property, unrelated to seismic cracking."
            }
          ]
        },
        {
          "q": "How should the board read growing, muddy seepage?",
          "o": [
            {
              "t": "As water moving soil: a flaw widening, not a normal leak.",
              "v": "expert",
              "fb": "Muddy, rising seepage means erosion is underway."
            },
            {
              "t": "As harmless weeping that every dam shows and none needs watched.",
              "v": "wrong",
              "fb": "Clear seepage is normal; muddy, growing seepage is not."
            },
            {
              "t": "As proof a saboteur bored a channel clean through the dam.",
              "v": "danger",
              "fb": "Erosion needs no saboteur; the head bores the channel itself."
            },
            {
              "t": "As a sign the reservoir is simply too full and should be lowered.",
              "v": "partial",
              "fb": "Lowering slows it, but the muddy flow signals active erosion."
            }
          ]
        }
      ]
    },
    "filters": {
      "sci": "Allen Hazen (1869-1930)",
      "topic": "Filters, grain size & piping",
      "lede": "The sanitary engineer who turned a fistful of sand into numbers, and showed how a graded filter can stop a dam eroding itself.",
      "no": 3,
      "profile": "Allen Hazen was an American sanitary and hydraulic engineer who did more than almost anyone to make the properties of granular soils and filter sands measurable. Working on water purification in the 1890s at the Lawrence Experiment Station in Massachusetts, he studied how sand filters clean water and how quickly water passes through them. From this work he introduced the effective size (D-ten, the grain diameter that ten percent of a sample by weight is finer than) and the uniformity coefficient (D-sixty over D-ten), and proposed that a clean sand's permeability rises roughly with the square of its effective size.\n\nThese humble numbers proved powerful. They let an engineer predict a soil's permeability, judge whether a sand is well or poorly graded, and, most important for dams, design filters. A properly graded filter is a layer of granular material sized so its pores are small enough to catch the fine particles of the soil it protects, yet coarse enough to let water pass freely and safely away. Hazen also lent his name to the Hazen-Williams formula for flow in pipes.\n\nFor this inquiry, Hazen is the antidote to fatalism about seepage. Internal erosion, called piping, happens when seeping water plucks fine particles out of the embankment and carries them off, enlarging the passage until it runs backward into an open pipe. The century-old defense is exactly Hazen's filter: a correctly graded layer that lets water out but holds the soil in. If a dam's seepage ran muddy for months, the filter was failing or was never built to Hazen's criteria, a knowable, preventable, human failure and not a bolt from the blue. Muddy water means soil is leaving; a filter is what should have stopped it.",
      "frame": "Pine sets down a jar of cloudy water from the toe drain. \"Clean water leaving is fine. Soil leaving is not. If you understand what a filter is meant to do, you'll know why this jar frightens me.\"",
      "q": [
        {
          "q": "What is a soil's 'effective size' (D-ten)?",
          "o": [
            {
              "t": "The grain size that ten percent of the sample is finer than.",
              "v": "expert",
              "fb": "D-ten is the ten-percent-finer grain diameter."
            },
            {
              "t": "The average diameter of all the grains in the sample by weight.",
              "v": "wrong",
              "fb": "That is a mean size; D-ten is a specific percentile."
            },
            {
              "t": "The size of the largest grains that a filter is likely to hold back.",
              "v": "partial",
              "fb": "Filters are sized from D-ten, but that is not its definition."
            },
            {
              "t": "The crack width a tremor is likely to open before piping can start.",
              "v": "danger",
              "fb": "D-ten is a grain statistic, not a seismic crack width."
            }
          ]
        },
        {
          "q": "What is the purpose of a graded filter in a dam?",
          "o": [
            {
              "t": "To let seep water pass while holding the soil's fines in place.",
              "v": "expert",
              "fb": "A filter drains water yet retains soil particles."
            },
            {
              "t": "To seal the dam substantially so that no water can ever seep through.",
              "v": "danger",
              "fb": "Filters pass water on purpose; they do not seal it off."
            },
            {
              "t": "To store extra water for release during a dry summer season.",
              "v": "wrong",
              "fb": "A filter controls seepage; it is not for storage."
            },
            {
              "t": "To slow every leak until the reservoir can be safely drawn down.",
              "v": "partial",
              "fb": "A filter is permanent protection, not a stalling measure."
            }
          ]
        },
        {
          "q": "What does months of muddy seepage tell an investigator?",
          "o": [
            {
              "t": "Soil is washing out: the filter failed or was never built.",
              "v": "expert",
              "fb": "Muddy seepage means fines are migrating, a filter failure."
            },
            {
              "t": "Nothing; every dam sheds a little mud and it means nothing at all.",
              "v": "wrong",
              "fb": "Clear seepage is fine; carried soil is a warning."
            },
            {
              "t": "That someone tunneled explosives straight through the embankment.",
              "v": "danger",
              "fb": "Piping needs no explosives; water moves the soil."
            },
            {
              "t": "That the reservoir sits too high and simply needs to be lowered.",
              "v": "partial",
              "fb": "Lowering slows it, but a proper filter is the real fix."
            }
          ]
        }
      ]
    },
    "porepressure": {
      "sci": "Alec Skempton (1914-2001)",
      "topic": "Soil mechanics & pore pressure",
      "lede": "The founder of British soil mechanics, who explained why a bank that stood for years can quietly weaken and let go.",
      "no": 4,
      "profile": "Alec Skempton was a British civil engineer who helped turn soil mechanics into a rigorous science and founded the discipline in Britain. Building on Terzaghi's principle of effective stress, Skempton clarified one of the most important ideas in geotechnics: that the strength of a soil is governed not by the total stress pressing on it, but by the effective stress, the total stress minus the pressure of the water filling its pores. Squeeze a saturated soil and, if the water cannot escape, the load is carried by the pore water; only as that water drains does the soil skeleton take up the stress and gain strength.\n\nSkempton introduced the pore-pressure coefficients A and B, which predict how pore-water pressure changes when a soil is loaded, and he applied these ideas to real failures: landslides, foundations, and embankment dams. He showed that a slope or a dam can stand for years and then fail when pore pressures rise, because high pore pressure lowers the effective stress and with it the soil's resistance to sliding and to erosion. He was also a noted historian of his own field, tracing its ideas to their sources.\n\nFor this inquiry, Skempton explains why a leaking dam is a weakening dam. As seepage pushes through the embankment, it raises pore-water pressures inside; where those pressures are high, the effective stress binding the grains together falls, and soil that was firm becomes vulnerable to being lifted and carried by the flow. A steady rise in seepage is therefore not cosmetic; it is a measure of the dam quietly losing strength from the inside. That is a slow, physical, recordable decline, the opposite of a sudden blast or a single overwhelming wave. The danger builds where the water is, over time.",
      "frame": "Sol presses a boot into the soft ground at the toe. \"Ground that held my weight last spring gives now. Tell me what water does to the strength of soil, and you'll see why I stopped trusting this slope.\"",
      "q": [
        {
          "q": "What is effective stress?",
          "o": [
            {
              "t": "The total stress on a soil minus its pore-water pressure.",
              "v": "expert",
              "fb": "Effective stress is total stress minus pore pressure."
            },
            {
              "t": "The total weight of water stored behind the dam's embankment.",
              "v": "wrong",
              "fb": "That is reservoir storage, not effective stress."
            },
            {
              "t": "The pressure the reservoir applies against the upstream face.",
              "v": "partial",
              "fb": "That is hydrostatic load, a different quantity."
            },
            {
              "t": "The shock load a passing earthquake drives through the soil.",
              "v": "danger",
              "fb": "Effective stress is a static balance, not a seismic shock."
            }
          ]
        },
        {
          "q": "What happens as pore-water pressure rises in a soil?",
          "o": [
            {
              "t": "Effective stress falls and the soil loses strength.",
              "v": "expert",
              "fb": "Higher pore pressure means lower effective stress and strength."
            },
            {
              "t": "The soil hardens, so a rising leak actually makes a dam safer.",
              "v": "danger",
              "fb": "Rising pore pressure weakens soil; it does not harden it."
            },
            {
              "t": "The soil's total weight climbs until the embankment collapses.",
              "v": "wrong",
              "fb": "It is effective stress that falls, not weight that rises."
            },
            {
              "t": "Nothing changes until the water finally reaches the outer face.",
              "v": "partial",
              "fb": "The weakening happens inside as pressures rise, not primarily at the face."
            }
          ]
        },
        {
          "q": "Why does Skempton's idea argue against a sudden cause?",
          "o": [
            {
              "t": "Weakening builds slowly where seepage raises pore pressure, in use.",
              "v": "expert",
              "fb": "Pore-pressure weakening is gradual and recordable."
            },
            {
              "t": "Because primarily a blast can drop a soil's strength fast enough to fail.",
              "v": "danger",
              "fb": "Seepage lowers strength slowly; no blast is needed."
            },
            {
              "t": "Because soil strength rarely changes, so the dam is likely to have been struck.",
              "v": "wrong",
              "fb": "Soil strength does change with pore pressure over time."
            },
            {
              "t": "Because pore pressure matters primarily during the shaking of a quake.",
              "v": "partial",
              "fb": "Pore pressures build steadily from seepage, not primarily in quakes."
            }
          ]
        }
      ]
    },
    "shallowwater": {
      "sci": "Adhemar Barre de Saint-Venant (1797-1886)",
      "topic": "The shallow-water equations",
      "lede": "The Frenchman whose equations route a flood wave down a valley, and can tell a wave that came over a dam from one that came through it.",
      "no": 5,
      "profile": "Adhemar Jean Claude Barre de Saint-Venant was a French engineer and mathematician of extraordinary range, remembered in both fluid mechanics and elasticity. In hydraulics his name attaches to the shallow-water equations, also called the Saint-Venant equations, which he set down in 1871 to describe unsteady flow in open channels: how a flood wave, a surge, or a released volume of water moves and changes shape as it travels down a river or canal. The equations express two physical laws along the channel: conservation of mass (water is neither created nor destroyed) and conservation of momentum (the water accelerates under gravity, pressure differences, and friction).\n\nBecause a full three-dimensional treatment of a river is impossibly complex, Saint-Venant reduced the problem by assuming the water is shallow relative to its length, so pressure is essentially hydrostatic and the flow can be described by depth and velocity along the channel. This made flood routing, meaning predicting how a flood crest rises, moves, and attenuates downstream, a solvable problem, and his equations remain the basis of river and dam-break modeling today. In elasticity he is equally known for Saint-Venant's principle.\n\nFor this inquiry, Saint-Venant provides the mathematics to test both a flood and a sudden breach. His equations can route the storm inflow to see whether the reservoir could have risen enough to overtop the dam, and they can model the wave a dam-break sends downstream. Run one way, they check the freak-flood claim; run another, they show that a slow internal failure and a sudden catastrophic breach send very different waves down the valley. The signature of the flood that struck the town is itself evidence about how the dam let go: over the top, or from within.",
      "frame": "Lays out the downstream gauge traces. \"The water that hit the town left a record of its own. I'd like to know you can tell a wave that came over a dam from one that came through it.\"",
      "q": [
        {
          "q": "What do the Saint-Venant equations describe?",
          "o": [
            {
              "t": "Unsteady flow of a flood wave down an open channel.",
              "v": "expert",
              "fb": "They govern unsteady open-channel flood flow."
            },
            {
              "t": "The still pressure a reservoir exerts on the dam at rest.",
              "v": "wrong",
              "fb": "That is hydrostatics, not unsteady channel flow."
            },
            {
              "t": "The steady velocity of uniform flow in a lined channel.",
              "v": "partial",
              "fb": "Uniform flow is a special steady case, not the general one."
            },
            {
              "t": "The blast wave a charge sends through a body of water.",
              "v": "danger",
              "fb": "The equations describe water flow, not explosive shock."
            }
          ]
        },
        {
          "q": "Which two laws do the equations express?",
          "o": [
            {
              "t": "Conservation of mass and of momentum along the channel.",
              "v": "expert",
              "fb": "Mass and momentum are the two governing laws."
            },
            {
              "t": "Conservation of energy and of temperature in the water.",
              "v": "wrong",
              "fb": "It is momentum, not temperature, alongside mass."
            },
            {
              "t": "Conservation of mass alone, since momentum can be ignored.",
              "v": "partial",
              "fb": "Momentum does not be dropped in unsteady flow."
            },
            {
              "t": "Conservation of the reservoir's charge before a strike.",
              "v": "danger",
              "fb": "The laws are mass and momentum, not a stored charge."
            }
          ]
        },
        {
          "q": "How can these equations test how the dam failed?",
          "o": [
            {
              "t": "A slow seep and a sudden breach send different waves down, in the record, in use.",
              "v": "expert",
              "fb": "The downstream wave shape distinguishes breach modes."
            },
            {
              "t": "The flood wave alone is presented as showing a bomb, since primarily blasts move water.",
              "v": "danger",
              "fb": "Water moves by gravity and release, not primarily by blasts."
            },
            {
              "t": "They does not model dam breaks, so the failure mode is unknowable, on site.",
              "v": "wrong",
              "fb": "Dam-break routing is exactly what these equations do."
            },
            {
              "t": "Any large wave downstream means the reservoir simply overtopped, on review.",
              "v": "partial",
              "fb": "A breach from within also makes a wave; shape tells them apart."
            }
          ]
        }
      ]
    },
    "stfrancis": {
      "sci": "William Mulholland (1855-1935)",
      "topic": "The St. Francis Dam & the duty to warn",
      "lede": "The most powerful engineer in California, who inspected a muddy leak one morning and buried a valley by midnight.",
      "no": 6,
      "profile": "William Mulholland was a self-taught Irish-American engineer who built the Los Angeles Aqueduct and rose to lead the city's water department, one of the most powerful engineers in America. In March 1926 his department completed the St. Francis Dam, a concrete gravity dam north of Los Angeles, to store aqueduct water. Over the next two years the reservoir filled, and cracks and leaks appeared, some carrying muddy water. On the morning of March 12, 1928, Mulholland and his assistant were called to inspect new leaks and judged the dam safe. Just before midnight it failed catastrophically, sending a wall of water down the valley that killed some four hundred and fifty people, one of the worst American civil-engineering disasters of the twentieth century.\n\nInvestigations traced the failure to a defective foundation: one abutment sat on an ancient landslide and weak conglomerate that weakened when saturated, with uplift and possibly internal erosion contributing. Mulholland accepted responsibility before the inquest, famously saying he envied the dead. The disaster reshaped American practice, leading to state oversight of dam safety and independent review.\n\nFor this inquiry, St. Francis is the cautionary twin of the case. Its most haunting detail is the muddy leak inspected and pronounced harmless mere hours before the dam let go. Muddy water is soil on the move; it is the visible signature of internal erosion, and reading it as harmless has killed hundreds. The lesson is a duty to warn and to act: leaks that carry sediment are not nuisances to watch but symptoms to believe. When the same signs appear again, and are again explained away to avoid alarm or expense, the failure is not an unforeseeable act of God. It is a warning refused, exactly as it was at St. Francis.",
      "frame": "Pine sets a photograph of a ruined dam on the table. \"Nineteen twenty-eight. Muddy leaks, inspected, called safe. Everyone below was dead by morning. Tell me you know that story, because I think we're living it.\"",
      "q": [
        {
          "q": "What warning sign preceded the St. Francis Dam failure?",
          "o": [
            {
              "t": "Muddy leaks, inspected hours before and judged to be safe.",
              "v": "expert",
              "fb": "Muddy leaks, misread as harmless, preceded the break."
            },
            {
              "t": "A sudden earthquake felt across the valley that same morning.",
              "v": "wrong",
              "fb": "No quake caused it; the failure was in the foundation."
            },
            {
              "t": "A reservoir brimming far above its rated storage capacity.",
              "v": "partial",
              "fb": "The reservoir was full, but the muddy leaks were the tell."
            },
            {
              "t": "A saboteur's charge discovered wedged against the abutment.",
              "v": "danger",
              "fb": "There was no sabotage; muddy seepage was the true warning."
            }
          ]
        },
        {
          "q": "What did investigators blame for the collapse?",
          "o": [
            {
              "t": "A defective foundation that weakened as it saturated.",
              "v": "expert",
              "fb": "A weak, saturating foundation caused the failure."
            },
            {
              "t": "A deliberate act of sabotage against the city's water supply.",
              "v": "danger",
              "fb": "It was a foundation failure, not sabotage."
            },
            {
              "t": "An overtopping flood that poured across the dam's crest.",
              "v": "wrong",
              "fb": "The dam did not overtop; the foundation gave way."
            },
            {
              "t": "A flaw in the concrete mix that was used to pour the dam.",
              "v": "partial",
              "fb": "The concrete was less at fault than the ground beneath it."
            }
          ]
        },
        {
          "q": "What lesson does St. Francis hold for this case?",
          "o": [
            {
              "t": "Muddy leaks are escaping soil and must be believed, in use.",
              "v": "expert",
              "fb": "Sediment-laden leaks are symptoms to act on at once."
            },
            {
              "t": "A dam this size can primarily be brought down by a planned attack.",
              "v": "danger",
              "fb": "St. Francis was no attack; it was a misread warning."
            },
            {
              "t": "Muddy water is harmless, so growing leaks can safely be ignored.",
              "v": "wrong",
              "fb": "Muddy water is the opposite of harmless; it is erosion."
            },
            {
              "t": "primarily concrete dams fail this way, so an earth dam is safe from it.",
              "v": "partial",
              "fb": "Earth dams pipe too; the warning applies here as well."
            }
          ]
        }
      ]
    },
    "infiltration": {
      "sci": "Robert E. Horton (1875-1945)",
      "topic": "Infiltration & runoff",
      "lede": "The hydrologist who showed that rain is not flood: most of it soaks in, and only the excess ever reaches the reservoir.",
      "no": 7,
      "profile": "Robert E. Horton was an American hydraulic engineer and hydrologist often called a father of modern hydrology. Working largely from his own laboratory in Voorheesville, New York, he studied how rainfall is partitioned when it reaches the ground: some soaks in, some is held on the surface, and the rest runs off toward streams. His central concept was infiltration capacity, the maximum rate at which a given soil can absorb water. As rain falls, the soil absorbs it up to that capacity; once the rainfall rate exceeds it, the excess becomes overland flow, now called Hortonian runoff, which gathers into the streams and reservoirs downstream.\n\nHorton captured this in an equation describing how infiltration capacity starts high on dry ground and decays toward a steady rate as the soil saturates, and he developed influential ideas on drainage-basin form and stream networks, known as Horton's laws of stream order. His work made it possible to estimate, from a storm and a catchment, how much water would actually reach a reservoir, the essential first step in any flood analysis.\n\nFor this inquiry, Horton supplies the front end of the flood question. Before anyone can claim the reservoir was overwhelmed, they must estimate how much of the storm's rain became runoff and flowed in, and that depends on infiltration, soil, and antecedent wetness, all things Horton quantified. If the catchment absorbed much of the rain and the runoff was moderate, the inflow to the reservoir was moderate too, and the freak flood loses its water. Horton keeps the board honest about how much water there really was, so the dismissal cannot hide behind a storm that never delivered the flood it is blamed for.",
      "frame": "Sol shakes rain off his hat. \"Rain isn't flood. Most of it soaks in. Before you tell me the reservoir was overrun, show me you know how much of a storm even reaches the water.\"",
      "q": [
        {
          "q": "What is infiltration capacity?",
          "o": [
            {
              "t": "The fastest rate at which a soil can soak up falling rain.",
              "v": "expert",
              "fb": "It is the maximum rate soil can absorb water."
            },
            {
              "t": "The total volume of water a reservoir can hold behind a dam.",
              "v": "wrong",
              "fb": "That is storage, not infiltration capacity."
            },
            {
              "t": "The share of rainfall that runs straight off into the streams.",
              "v": "partial",
              "fb": "Runoff is the leftover once capacity is exceeded."
            },
            {
              "t": "The speed at which a leak bores a pipe through an embankment.",
              "v": "danger",
              "fb": "That is piping, an unrelated seepage process."
            }
          ]
        },
        {
          "q": "What becomes 'Hortonian' overland flow?",
          "o": [
            {
              "t": "Rain that falls faster than the soil can absorb it.",
              "v": "expert",
              "fb": "Runoff is rainfall in excess of infiltration capacity."
            },
            {
              "t": "Water that seeps deep underground to feed a distant spring.",
              "v": "wrong",
              "fb": "That is deep percolation, not overland flow."
            },
            {
              "t": "The full amount of rain that lands on the catchment area.",
              "v": "partial",
              "fb": "primarily the excess over infiltration runs off, not all of it."
            },
            {
              "t": "The surge released when a dam bursts across the valley floor.",
              "v": "danger",
              "fb": "That is a dam-break wave, not rainfall runoff."
            }
          ]
        },
        {
          "q": "How does infiltration bear on the flood theory?",
          "o": [
            {
              "t": "Modest runoff means modest inflow, so no overwhelming flood.",
              "v": "expert",
              "fb": "If little ran off, the reservoir inflow was moderate."
            },
            {
              "t": "Any heavy rain strongly supports a flood able to overtop any dam.",
              "v": "danger",
              "fb": "Rain soaks in; heavy rain need not overtop a dam."
            },
            {
              "t": "All rain becomes runoff, so every storm floods the reservoir.",
              "v": "wrong",
              "fb": "Much rain infiltrates; not all becomes runoff."
            },
            {
              "t": "Infiltration primarily matters in droughts, rarely during a big storm.",
              "v": "partial",
              "fb": "Infiltration governs runoff in big storms too."
            }
          ]
        }
      ]
    },
    "seismicdam": {
      "sci": "Nathan M. Newmark (1910-1981)",
      "topic": "Earthquake design of dams",
      "lede": "The engineer who stopped asking whether a dam would survive a quake and started asking how far it would move, and what a quake's damage looks like.",
      "no": 8,
      "profile": "Nathan M. Newmark was an American engineer at the University of Illinois who shaped the field of earthquake engineering and structural dynamics. He devised the Newmark-beta method, a numerical technique for integrating the equations of motion that is still used to compute how structures respond to dynamic loads, and he developed the design concept of response spectra for earthquake-resistant design. For dams and embankments his most influential contribution was the sliding-block method, introduced in his 1965 Rankine Lecture: rather than ask merely whether a slope is stable, he asked how far it would move during an earthquake, modeling the sliding mass as a block that slips whenever ground acceleration exceeds a yield threshold and accumulating its displacement over the shaking.\n\nThis shifted seismic dam engineering from a yes-or-no factor of safety to an estimate of permanent deformation: inches of slumping the dam could tolerate, or feet it could not. Newmark's approach let engineers judge whether a given earthquake would merely nudge an embankment or slide it apart, and it remains central to how earth dams are assessed for seismic safety.\n\nFor this inquiry, Newmark is the expert witness against the earthquake overclaim. A seismic failure has a signature: it is tied to a recorded ground motion at a specific instant, and it produces characteristic deformation such as cracking, slumping, and lateral spreading, all occurring during the shaking. If no earthquake of consequence was recorded, and the damage pattern is not seismic slumping but a concentrated erosion channel that grew over months, then Newmark's own framework rules the quake out. His methods do not just design against earthquakes; they let an investigator recognize when an earthquake was, and was not, the cause.",
      "frame": "Produces the seismograph log for the district. \"If it was a quake, the ground wrote it down, and the damage would look a certain way. I'd like you to know what a seismic failure actually looks like.\"",
      "q": [
        {
          "q": "What does Newmark's sliding-block method estimate?",
          "o": [
            {
              "t": "How far an embankment slides during an earthquake's shaking.",
              "v": "expert",
              "fb": "It computes permanent seismic displacement of the mass."
            },
            {
              "t": "The magnitude of the earthquake a fault is capable of producing.",
              "v": "wrong",
              "fb": "That is seismology, not the sliding-block method."
            },
            {
              "t": "Whether a slope's factor of safety is above or below one.",
              "v": "partial",
              "fb": "It moves beyond a yes/no factor to a displacement."
            },
            {
              "t": "The size of the charge needed to slump a dam deliberately.",
              "v": "danger",
              "fb": "It is a seismic tool, not a demolition estimate."
            }
          ]
        },
        {
          "q": "How did Newmark reframe seismic slope safety?",
          "o": [
            {
              "t": "From a yes-or-no safety factor to inches of movement.",
              "v": "expert",
              "fb": "He asked how much a slope moves, not just if it's stable."
            },
            {
              "t": "From soil strength to the concrete quality of the core.",
              "v": "wrong",
              "fb": "His shift was about displacement, not concrete."
            },
            {
              "t": "From displacement back to a single factor of safety.",
              "v": "partial",
              "fb": "He moved toward displacement, not back to a factor."
            },
            {
              "t": "From engineering to guessing, since quakes defy analysis.",
              "v": "danger",
              "fb": "He made quakes analyzable, not a matter of guessing."
            }
          ]
        },
        {
          "q": "How does Newmark's work weigh against an earthquake cause?",
          "o": [
            {
              "t": "A quake leaves a timed jolt and slumping, not a slow channel.",
              "v": "expert",
              "fb": "Seismic failure is timed and slumps; piping is slow."
            },
            {
              "t": "Any dam failure is proof a quake struck, recorded or not.",
              "v": "danger",
              "fb": "No recorded quake means a quake is not the cause."
            },
            {
              "t": "Earthquakes leave no trace, so a quake can rarely be ruled out.",
              "v": "wrong",
              "fb": "Earthquakes are recorded and leave clear damage."
            },
            {
              "t": "A seismic failure and a piping failure look exactly alike.",
              "v": "partial",
              "fb": "They differ: seismic slumping versus an erosion pipe."
            }
          ]
        }
      ]
    },
    "damsafety": {
      "sci": "John R. Freeman (1855-1932)",
      "topic": "Hydraulics & dam safety",
      "lede": "The insurance engineer who counted the true cost of a failure, and warned that shelving a repair to save money is a gamble with lives downstream.",
      "no": 9,
      "profile": "John Ripley Freeman was an American hydraulic engineer whose career bridged fire-protection engineering, insurance, and the science of water. As an engineer for the factory mutual insurance companies, he learned to think about catastrophic risk in hard financial terms: how failures happen, what they cost, and how inspection and design prevent them. He became a leading consulting hydraulic engineer, advised on major water and flood projects, and was a tireless advocate for putting hydraulics on a rigorous, experimental footing, endowing and promoting hydraulic laboratories so that structures could be tested on models before they were built at full scale.\n\nFreeman brought an underwriter's clear eye to dam safety: a dam is a stored hazard whose risk must be actively managed through sound design, honest inspection, and prompt maintenance. He understood that the costs of prevention are small and knowable, while the costs of failure are catastrophic and borne by the people downstream. His insurance background made him unusually alert to the temptation to defer maintenance to save money, and to the way that deferral quietly transfers risk onto others.\n\nFor this inquiry, Freeman speaks to motive and duty. His whole philosophy holds that a dam owner carries an ongoing obligation to inspect, to test, and to repair, and that shelving a needed repair to protect a budget is not thrift but a gamble with lives downstream. When inspection reports flag growing seepage and the recommended repairs are quietly filed away as too costly, that is precisely the failure of stewardship Freeman warned against. It points the board not to an unforeseeable disaster but to a decision, made in an office, over money, to let a known danger ride.",
      "frame": "Pine sets down a shelved repair order. \"Freeman treated a dam like a debt that comes due. Someone here decided a repair cost too much. Show me you understand a safety duty, and I'll show you who signed.\"",
      "q": [
        {
          "q": "How did Freeman's insurance background shape his view?",
          "o": [
            {
              "t": "He weighed cheap prevention against ruinous failure cost.",
              "v": "expert",
              "fb": "He saw prevention as cheap and failure as ruinous."
            },
            {
              "t": "He judged dams primarily by how gracefully their spillways looked.",
              "v": "wrong",
              "fb": "He judged dams by risk and safety, not appearance."
            },
            {
              "t": "He believed dams should rarely be inspected once completed.",
              "v": "partial",
              "fb": "He insisted on ongoing inspection, not a one-time check."
            },
            {
              "t": "He held that failures are pure chance and does not be managed.",
              "v": "danger",
              "fb": "He held failure is manageable, not mere chance."
            }
          ]
        },
        {
          "q": "What did Freeman promote to make hydraulics rigorous?",
          "o": [
            {
              "t": "Hydraulic laboratories to test designs on models first.",
              "v": "expert",
              "fb": "He championed model testing in hydraulic labs."
            },
            {
              "t": "Bigger dams built quickly to outrun any possible flood.",
              "v": "wrong",
              "fb": "Speed and size were not his answer; testing was."
            },
            {
              "t": "More inspectors sent out primarily after a dam had failed.",
              "v": "partial",
              "fb": "He wanted inspection before failure, not after."
            },
            {
              "t": "Armed guards to protect every dam against sabotage.",
              "v": "danger",
              "fb": "His concern was engineering rigor, not guards."
            }
          ]
        },
        {
          "q": "How does Freeman's view frame a shelved repair?",
          "o": [
            {
              "t": "As a gamble with downstream lives, not honest thrift.",
              "v": "expert",
              "fb": "Deferring a known repair transfers risk onto others."
            },
            {
              "t": "As proof the failure was an accident no one could prevent.",
              "v": "danger",
              "fb": "A shelved repair makes the failure foreseeable, not fated."
            },
            {
              "t": "As sensible saving, since repairs rarely change a dam's fate.",
              "v": "wrong",
              "fb": "Deferred maintenance is a gamble, not a saving."
            },
            {
              "t": "As a minor lapse, since owners owe no real duty to inspect.",
              "v": "partial",
              "fb": "Owners carry a real, ongoing duty to inspect and repair."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "warden": {
      "spillway": "Sol meets you at the spillway apron, boots caked in silt. \"They built this chute to swallow a storm, and swallow one it did; I watched it work. So don't tell me the river came over the top. Know your hydraulics and I'll tell you what I saw lower down.\"",
      "embankment": "Sol crouches at the toe of the bank, prodding the wet ground. \"Here's where I do my walking. This soil's been weeping for months, and lately it weeps mud. Show me you understand a dam's insides and I'll walk you through my whole logbook.\"",
      "office": "Sol looks uneasy under the office lights. \"I do my reading outdoors, not in a filing room. But the numbers that could have saved us are in here. Prove you can handle them and I'll say where I'd look.\""
    },
    "clerk": {
      "spillway": "The Clerk has followed the paper trail out to the spillway. \"Every gauge reading became a form, and every form found a drawer. Convince me you understand the flow, and I'll tell you which forms went missing.\"",
      "embankment": "The Clerk stands stiffly on the crest, a folder clutched tight. \"I don't like it up here; I like it filed. But the reports describe this bank, and they don't match the calm face of it. Show me you can read soil and I'll read you the reports.\"",
      "office": "The Clerk is finally at home among the cabinets. \"This is where the inspection reports live, and the change-orders that overruled them. Satisfy me you grasp the engineering, and I'll show you whose signature closed each one.\""
    },
    "surveyor": {
      "spillway": "Pine has set up a level near the spillway, one eye to the scope. \"I measure things for a living, so I don't guess about floods. This channel had room to spare. Show me you'd rather compute than panic, and I'll share my figures.\"",
      "embankment": "Pine kneels by a settlement gauge on the crest, frowning at the reading. \"This pin has moved more this season than in five years before. That means something inside is changing. Prove you understand a dam's mechanics and I'll show you every gauge.\"",
      "office": "Pine spreads her survey notes across the office table. \"My instruments told a story all year. Someone in this room decided it wasn't worth the repair. Show me you can read what they read, and I'll show you what they filed.\""
    }
  },
  "story": [
    "<b>The Marrow Valley Dam</b> begins inside the Marrow Valley dam inquiry, where the first explanation is already spreading faster than the evidence.",
    "<b>Warden Sol</b>, <b>The Clerk</b>, and <b>Surveyor Pine</b> each hold a different part of the record, and each conversation opens with one real pioneer whose work changes how the evidence should be read.",
    "The inquiry keeps circling <b>Sabotage or an earthquake strike</b> and <b>A freak flood — an act of God</b>. Both are tempting, and neither can be accepted just because it makes the cleanest headline.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and make the final WHAT judgment from what you learned."
  ],
  "endings": {
    "overclaimWhat": "attack",
    "dismissalWhat": "flood",
    "win": {
      "expertTitle": "What the Mud and the Paper Prove",
      "expert": [
        "Ferran names it exactly: Cass Herrick, the dam's owner, who shelved the repairs to protect a budget; the truth culminating in the Owner's Project Office, where the inspection reports and the overruling change-orders sit side by side; and a concealed internal erosion, piping, that carried the embankment away from within, one muddy leak at a time. Not a bomb. Not an act of God.",
        "Every card accounted for. Ferran walked the toe with the warden, read the crest gauges with the surveyor, and matched the clerk's filed reports to the change-orders that buried them. The finding rests on no melodrama and blames no phantom: it names a known, growing, ignored danger and the office where the decision to ignore it was made. That is what lets the next valley downstream sleep."
      ],
      "soundTitle": "Right, but Lightly Proven",
      "sound": [
        "Ferran names the right three: Herrick, the Owner's Project Office, and a concealed internal erosion that piped the dam out from inside. The shape of the case is correct, and the refusal to cry sabotage or shrug at a freak flood is exactly right.",
        "But too many threads were left loose, and the owner's lawyers will pull at them. A few more days tracing the muddy seepage to the shelved repair orders would have made the finding unassailable. Close and honest, if not yet airtight."
      ],
      "namedTitle": "The Right Answer, Unearned",
      "named": [
        "Ferran names the truth, Herrick, the Owner's Project Office, the internal erosion that hollowed the dam, but gathered too little to back it. It reads like a hunch that happened to land.",
        "An inquiry cannot condemn an owner and clear a valley on an accusation this thin, however correct. Being right is not the same as being able to prove it to the people who will fight the finding in every court they can reach."
      ]
    },
    "overclaim": {
      "title": "The Inquiry That Cried Sabotage",
      "body": [
        "Ferran reports an attack, sabotage or an earthquake in the dark, the villain the town was already demanding. It is vivid, and it is not what the evidence shows.",
        "No seismograph recorded a jolt, no blast scarred the embankment, and the dam did not fail all at once. What the records show is a leak that grew muddy over months, gauges that crept, and repair orders quietly shelved. When the sabotage story collapses, it takes the inquiry's credibility with it, and the real, provable failure at the Owner's Project Office is dismissed as just another conspiracy theory. The only saboteur was water, patiently removing soil no one would pay to protect."
      ]
    },
    "dismissal": {
      "title": "Case Closed on the Weather",
      "body": [
        "Ferran files it as an act of God, a freak thousand-year flood, nothing anyone could have foreseen, close the file. It is the comfortable answer, and it misses the graver truth.",
        "The spillway had room to spare and the storm never topped the crest; the water did not come over the dam but through it, along a channel that internal erosion had been widening for months while the warnings sat in a drawer. Blaming the sky leaves the same flaw in every dam whose owner would rather file a report than fix it. The inquiry saw the flood downstream and never the office upstream, where the danger was known and shelved."
      ]
    },
    "wrongNames": {
      "title": "So Close",
      "body": [
        "Ferran has the nature of it cold: a concealed internal erosion that piped the embankment out from within, neither a bomb nor a freak flood. But the finger lands on the wrong name or the wrong room, and the inquiry cannot rest there."
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"An earth dam with internal erosion seepage\"><path d=\"M76 112 L190 34 L330 112 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.6\"/><path d=\"M190 34 L494 34\" stroke=\"#326891\" stroke-width=\"2\"/><path d=\"M244 70 C264 82,278 92,296 108\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2.2\" stroke-dasharray=\"4 4\"/><circle cx=\"298\" cy=\"108\" r=\"5\" fill=\"#B3261E\"/><path d=\"M334 112 C394 96,468 96,556 108\" fill=\"none\" stroke=\"#326891\" stroke-width=\"1.6\"/></svg>"
}};
