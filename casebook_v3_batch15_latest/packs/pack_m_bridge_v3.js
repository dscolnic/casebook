// Casebook V3 — three informants, three readings, one clue per correct answer.
module.exports = { PACK: {
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "m_bridge",
  "title": "The Halloway Span",
  "discipline": "Structural & Fracture Mechanics",
  "venue": "the Halloway bridge inquiry",
  "agent": {
    "name": "Inspector Nora Selby",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Engineering credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Structural & Fracture Pioneers",
  "dossierName": "STRUCTURAL & FRACTURE PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Halloway bridge inquiry",
  "DAYS_TOTAL": 3,
  "teaser": "A bridge span drops during rush hour. Did exceptional scour remove a support, did a hidden fatigue crack finally run, or did a towboat strike the pier hard enough to launch the failure?",
  "overclaimTag": "a vessel collision at the bridge",
  "truthTag": "a documented towboat impact at the pier",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A truss bridge with a fatigue crack at a gusset connection\"><path d=\"M40 94 H620\" stroke=\"#326891\" stroke-width=\"2\"/><path d=\"M80 76 H580\" stroke=\"#121212\" stroke-width=\"5\"/><path d=\"M100 76 l55-42 55 42 55-42 55 42 55-42 55 42 55-42 55 42\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M330 68 l-10 9 13 8 -9 13\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"3\"/><path d=\"M145 76 v34 M515 76 v34\" stroke=\"#121212\" stroke-width=\"6\"/></svg>",
  "overclaimTease": "Fracture mechanics does not automatically mean fatigue. Read the fresh metal, impact geometry, timing records, and prior inspection together before choosing between a long-growing flaw and a sudden collision.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "br_inspector",
      "items": [
        {
          "id": "br_engineer",
          "label": "The bridge maintenance engineer"
        },
        {
          "id": "br_inspector",
          "label": "Marlow Venn — the towboat captain"
        },
        {
          "id": "br_authority",
          "label": "Gideon Marsh — bridge authority director"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "br_pier",
      "items": [
        {
          "id": "br_truss",
          "label": "The Truss & Gusset Connections"
        },
        {
          "id": "br_office",
          "label": "The Bridge Authority Office"
        },
        {
          "id": "br_pier",
          "label": "The Piers & Navigation Channel"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "br_strike",
      "items": [
        {
          "id": "br_flood",
          "label": "Exceptional scour undermined a primary bridge support"
        },
        {
          "id": "br_strike",
          "label": "A vessel impact initiated the span’s structural failure"
        },
        {
          "id": "br_fatigue",
          "label": "A fatigue crack passed a scheduled reinspection window"
        }
      ]
    }
  },
  "READING_ORDER": [
    "br_rigger",
    "br_ndt",
    "br_clerk"
  ],
  "CHARACTERS": {
    "br_rigger": {
      "name": "Rigger Tom Vasa",
      "role": "Bridge steel rigger",
      "face": "🔧",
      "badge": "R",
      "legend": "the truss",
      "hint": "The failed connection shows a fresh overload tear and transferred marine paint rather than an old oxidized fatigue face.",
      "reading": "br_griffith"
    },
    "br_ndt": {
      "name": "The NDT Technician",
      "role": "Nondestructive-test technician",
      "face": "🧲",
      "badge": "N",
      "legend": "the inspection platform",
      "hint": "The last complete scan covered the fracture origin and found no growing indication before the collision date.",
      "reading": "br_paris"
    },
    "br_clerk": {
      "name": "The Navigation Records Clerk",
      "role": "Tow and bridge-event records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the navigation archive",
      "hint": "AIS gaps, tow logs, hull repairs, and the bridge accelerometer converge on one captain’s vessel.",
      "reading": "br_wells"
    }
  },
  "TOPICS": {
    "br_griffith": {
      "sci": "A. A. Griffith (1893-1963)",
      "topic": "The energy theory of fracture",
      "lede": "The engineer who pulled glass fibers until they told him the secret every broken thing shares: it started at a flaw.",
      "no": 1,
      "profile": "A. A. Griffith was a British aeronautical engineer whose 1920 paper 'The Phenomena of Rupture and Flow in Solids' founded the modern science of fracture. He was gnawed by a long-standing puzzle: real materials broke at stresses far below the enormous strength their atomic bonds predicted. Testing thin glass fibers, he found that thinner fibers were stronger, which pointed at tiny flaws as the culprit — the smaller the sample, the smaller its worst crack could be.\n\nGriffith reframed fracture as a competition of energies. A crack in a stressed body stores elastic strain energy in the material around it; extending the crack releases some of that energy but costs energy to create fresh surface. He showed a crack grows only when the strain energy released outpaces the surface energy required. This gives a critical crack size for a given stress: below it the crack sits stable, above it the crack runs and the part fails. Small flaws, not weak atoms, set real strength.\n\nGriffith later helped pioneer the jet engine at Rolls-Royce, but his fracture criterion stayed his monument, soon extended to metals by Irwin and Orowan.\n\nGriffith’s theory does not decree that every fracture began as years of fatigue. It supplies a way to ask whether a pre-existing flaw released stored energy or whether a sudden external load created the critical condition. At Halloway, most of the fracture surface is bright and recently torn, the pier bears a fresh scrape, and marine coating is embedded near the initiating deformation. Those observations fit abrupt overload after impact far better than an old oxidized crack or support loss from scour.",
      "frame": "Holds a bright torn edge beside the scraped pier coating. “A fracture surface remembers whether the load grew for years or arrived in one violent contact. Read the metal.”",
      "q": [
        {
          "q": "What problem did Griffith’s fracture theory explain?",
          "o": [
            {
              "t": "Why tiny flaws make real materials fail far below ideal atomic strength.",
              "v": "expert",
              "fb": "Griffith connected practical strength to pre-existing cracks rather than perfect bond strength."
            },
            {
              "t": "Why sound steel requires a major external impact before any fracture can begin.",
              "v": "danger",
              "fb": "Existing flaws can grow under service stress without a single violent initiating blow."
            },
            {
              "t": "Why nearly every old bridge eventually loses strength at the same calendar age.",
              "v": "wrong",
              "fb": "Fracture depends on flaw, stress, material, and environment rather than age alone."
            },
            {
              "t": "Why corrosion is the primary mechanism capable of creating a crack in steel.",
              "v": "partial",
              "fb": "Corrosion can assist damage, but fatigue, fabrication flaws, and other mechanisms also create cracks."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — lead",
            "text": "The fracture is dominated by bright recent overload tearing rather than an oxidized fatigue region grown over years."
          }
        },
        {
          "q": "When does a crack grow in Griffith’s energy balance?",
          "o": [
            {
              "t": "Whenever any moving vehicle crosses the structure, regardless of crack size.",
              "v": "wrong",
              "fb": "Small flaws can remain stable under loads that do not reach the growth condition."
            },
            {
              "t": "When a barge or blast supplies energy from outside the bridge.",
              "v": "danger",
              "fb": "Stored elastic energy under ordinary loading can drive fracture once the flaw is critical."
            },
            {
              "t": "When released strain energy exceeds the cost of creating new surfaces.",
              "v": "expert",
              "fb": "Crack advance becomes favorable when the energy gained by extension exceeds the surface-energy requirement."
            },
            {
              "t": "When the crack reaches the geometric center of the gusset plate.",
              "v": "partial",
              "fb": "Criticality depends on energy, stress, geometry, and material—not a universal central location."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — lead",
            "text": "The initiating damage carries marine paint and geometry matching one towboat, not maintenance tools or inspection equipment."
          }
        },
        {
          "q": "Which fracture observation most favors a recent vessel impact over long fatigue growth?",
          "o": [
            {
              "t": "A broad oxidized fracture region crossed by many fatigue beach marks.",
              "v": "partial",
              "fb": "Oxidation and beach marks would instead support progressive crack growth."
            },
            {
              "t": "A bright ductile tear beside fresh deformation and transferred marine paint.",
              "v": "expert",
              "fb": "Fresh overload features and material transfer point to a sudden contact event."
            },
            {
              "t": "A clean office file showing that reinspection funding was deferred.",
              "v": "wrong",
              "fb": "Paperwork cannot replace physical evidence at the fracture origin."
            },
            {
              "t": "A deep scour hole beneath a pier after several weeks of high river flow.",
              "v": "danger",
              "fb": "Scour affects support conditions but does not create marine paint transfer."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — lead",
            "text": "Fresh scraping and paint transfer begin at the navigation-side pier rather than at an old truss crack or scour cavity."
          }
        }
      ]
    },
    "br_paris": {
      "sci": "Paul C. Paris (1930-2017)",
      "topic": "The law of fatigue-crack growth",
      "lede": "The young engineer whose equation was rejected by three journals, then became the law that predicts how a crack creeps forward one truck at a time.",
      "no": 2,
      "profile": "Paul C. Paris was an American engineer who, around 1960, wrote the equation that lets engineers predict how fast a fatigue crack grows. Fracture mechanics could already say when a crack would fail, but not how quickly an existing crack would creep toward that point under repeated loads. Paris proposed that the growth per loading cycle depends on the range of the stress-intensity factor at the crack tip. His paper was famously turned down by leading journals before it became one of the most cited results in the field.\n\nParis's law states that the crack advance per cycle, da/dN, scales with the stress-intensity range, delta-K, raised to a power: da/dN equals C times delta-K to the m. Each pass of a loaded truck opens and closes the crack a little, and each cycle nudges the crack tip forward by an amount the law predicts. Because delta-K grows as the crack lengthens, the crack accelerates — slow for years, then alarmingly fast near the end. This is the mathematical heart of 'damage-tolerant' design: assume a flaw exists, calculate how many cycles it takes to reach critical size, and inspect well before then.\n\nParis’s law gives fatigue a clock: repeated loads should leave a detectable growth history, a prior indication, and characteristic progression toward critical size. Halloway’s complete scan covered the later origin without finding such a reflector, and the recovered surface lacks the broad fatigue region that years of truck cycles would produce. The absence does not prove perfect steel, but paired with the sudden bridge acceleration and vessel timing it makes a long missed reinspection story less credible than a new high-energy event.",
      "frame": "Marks the later origin on the prior scan coverage map. “Fatigue needs a clock and a detectable history. Show me what their absence means before you blame a missed interval.”",
      "q": [
        {
          "q": "Which variables determine fatigue-crack growth in Paris’s law?",
          "o": [
            {
              "t": "Bridge deflection to river current and the height of floodwater.",
              "v": "wrong",
              "fb": "Those variables concern structural and hydraulic response, not fatigue-crack growth."
            },
            {
              "t": "Impact force to the speed and mass of a striking vessel.",
              "v": "partial",
              "fb": "Impact mechanics can be calculated, but Paris’s law addresses repeated cyclic loading."
            },
            {
              "t": "Crack growth mainly to the number of years since the bridge opened.",
              "v": "danger",
              "fb": "Traffic cycles and stress range matter more directly than calendar time alone."
            },
            {
              "t": "Fatigue-crack growth per load cycle to the range of stress intensity.",
              "v": "expert",
              "fb": "The law predicts how repeated loading advances a crack through its stable-growth regime."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — corroboration",
            "text": "A complete prior scan covered the eventual origin and found no crack-growth indication before the event."
          }
        },
        {
          "q": "Why does a growing fatigue crack accelerate near the end of life?",
          "o": [
            {
              "t": "As the crack lengthens, stress-intensity range rises and each cycle advances it farther.",
              "v": "expert",
              "fb": "The same traffic cycle becomes more damaging as the crack grows and amplifies tip stress."
            },
            {
              "t": "Steel chemically changes into a brittle material after a fixed number of trucks.",
              "v": "wrong",
              "fb": "Material condition matters, but the geometric growth of the crack drives increasing stress intensity."
            },
            {
              "t": "The final vehicle is assumed heavy enough to create the entire crack at once.",
              "v": "danger",
              "fb": "The last load may trigger failure after most of the crack developed over many ordinary cycles."
            },
            {
              "t": "Cracks move at a constant rate until they reach the far edge of the plate.",
              "v": "partial",
              "fb": "Paris behavior is not constant-rate; growth generally changes with stress-intensity range."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — corroboration",
            "text": "Bridge sensors register the first impulse at the pier seconds before load redistributes into the span."
          }
        },
        {
          "q": "What finding would most weaken the theory of a fatigue crack missed by inspection?",
          "o": [
            {
              "t": "A small prior indication that was scheduled for a timed return examination.",
              "v": "partial",
              "fb": "A prior indication would create the very crack-growth timeline the theory requires."
            },
            {
              "t": "Traffic growth that increased the number of stress cycles on the span.",
              "v": "wrong",
              "fb": "More cycles matter only if a flaw existed and grew at the relevant location."
            },
            {
              "t": "A complete scan of the origin showing no reflector, then fresh overload tearing.",
              "v": "expert",
              "fb": "Coverage at the later origin plus fresh morphology removes the expected fatigue history."
            },
            {
              "t": "A repair deferral signed after engineers calculated an inspection window.",
              "v": "danger",
              "fb": "A signed deferral would support institutional neglect rather than sudden impact."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — corroboration",
            "text": "AIS timing and a fresh hull repair place the same vessel against the pier during the bridge’s first acceleration spike."
          }
        }
      ]
    },
    "br_wells": {
      "sci": "Alan A. Wells (1924-2005)",
      "topic": "Crack-tip opening displacement",
      "lede": "The welding engineer who measured how far a crack yawns open before it runs, and gave shipyards and bridge shops a test they could trust.",
      "no": 3,
      "profile": "Alan A. Wells was a British engineer at the Welding Institute who, around 1961, gave the profession a fracture parameter suited to the tough, weldable steels used in ships, pipelines, and bridges. Irwin's linear elastic fracture mechanics assumes only a small pocket of yielding at a crack tip, but structural steel — especially near welds — yields a great deal before it breaks. Wells needed a measurable quantity that stayed meaningful once the metal at the tip had plastically deformed.\n\nHis idea was crack-tip opening displacement, or CTOD: as load rises, a sharp crack blunts and its faces separate by a measurable amount, and fracture occurs when that opening reaches a critical value characteristic of the material. CTOD can be measured in a laboratory test on a notched specimen and used to judge whether a real flaw in a real structure is tolerable. It became a cornerstone of engineering-critical-assessment procedures and welding standards, letting engineers set safe flaw sizes for steel that is too ductile for purely elastic analysis.\n\nWells’s crack-opening work helps interpret the final tear as ductile overload rather than assume all large fractures share one history. The structural evidence must then be joined to navigation records: AIS position, tow timing, impact marks, paint chemistry, and a fresh hull repair. Together they place the initiating force at the pier and identify the vessel operator who altered the voyage record afterward. Fracture mechanics remains central, but here it confirms the dramatic explanation instead of replacing it. The navigation record supplies the final independent comparison.",
      "frame": "Lays the towboat’s AIS trace over bridge accelerometer timing and a hull-repair photograph. “The steel gives the force; the navigation record gives the hand behind it.”",
      "q": [
        {
          "q": "What does crack-tip opening displacement measure?",
          "o": [
            {
              "t": "How much the whole bridge deck moves vertically under one truck.",
              "v": "wrong",
              "fb": "Deck deflection is a global response, while CTOD is a local crack-tip measure."
            },
            {
              "t": "How far the crack faces separate near the tip as the material deforms.",
              "v": "expert",
              "fb": "CTOD gives a practical measure of fracture resistance in elastic-plastic materials such as structural steel."
            },
            {
              "t": "How wide an impact dent needs to be before it is classified as a barge strike.",
              "v": "partial",
              "fb": "Impact geometry is different from the opening displacement used in fracture assessment."
            },
            {
              "t": "How quickly rust color spreads across a newly painted gusset plate.",
              "v": "danger",
              "fb": "Surface appearance cannot replace a mechanical crack-tip assessment."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — decisive",
            "text": "A timed towboat contact supplied the sudden load that initiated failure; neither progressive fatigue nor exceptional scour fits the joined record."
          }
        },
        {
          "q": "Why is CTOD useful for welded structural steel?",
          "o": [
            {
              "t": "It assumes the entire member remains perfectly brittle until it shatters.",
              "v": "wrong",
              "fb": "CTOD was developed precisely to handle significant plasticity near the crack tip."
            },
            {
              "t": "It converts nearly every crack into a harmless rounded notch during service.",
              "v": "danger",
              "fb": "Measurement does not blunt or repair the defect; it estimates resistance and margin."
            },
            {
              "t": "It replaces inspection because a design value remains valid for nearly every future flaw.",
              "v": "partial",
              "fb": "Assessment needs the actual crack, load, material state, and updated inspection data."
            },
            {
              "t": "It accounts for plastic deformation near a crack before unstable fracture.",
              "v": "expert",
              "fb": "Structural steels may yield locally, so a practical toughness measure must include elastic-plastic behavior."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — decisive",
            "text": "Impact marks, hull geometry, navigation timing, and the structural response converge where the marked channel passes the bridge supports."
          }
        },
        {
          "q": "Which joined record most directly identifies the source of the sudden bridge load?",
          "o": [
            {
              "t": "AIS timing, pier marks, hull damage, and a captain’s altered tow log.",
              "v": "expert",
              "fb": "Independent navigation and physical records connect one vessel to the impact."
            },
            {
              "t": "A maintenance estimate for repairing an unrelated gusset connection.",
              "v": "partial",
              "fb": "An unrelated repair estimate does not establish the initiating event."
            },
            {
              "t": "A flood bulletin describing elevated river levels upstream of the bridge.",
              "v": "wrong",
              "fb": "High water alone does not match the contact marks and vessel timing."
            },
            {
              "t": "A state inspection report issued after the span had already collapsed.",
              "v": "danger",
              "fb": "Post-event inspection describes consequences, not the source of the load."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — decisive",
            "text": "The towboat captain altered the voyage log after the collision while the authority and maintenance records remained internally consistent."
          }
        }
      ]
    }
  },
  "story": [
    "<b>The Halloway Span fell in seconds, but its steel can still say whether the fatal load arrived suddenly or grew unseen.</b>",
    "Rigger Tom Vasa can read the torn connection. The NDT Technician has the last complete scan. The Navigation Records Clerk can join bridge sensors to vessel movement.",
    "A hidden fatigue crack, exceptional scour, and a direct vessel strike each predict a different fracture surface and event sequence.",
    "The nine clues must connect the first physical impulse, its location, and the operator responsible for it."
  ],
  "endings": {
    "overclaimWhat": "br_fatigue",
    "dismissalWhat": "br_flood",
    "win": {
      "expertTitle": "The Towboat at the Pier",
      "expert": [
        "You connect Marlow Venn, the Piers & Navigation Channel, and a vessel impact that initiated the span failure. Fresh overload tearing, paint transfer, sensor timing, and hull damage form one event.",
        "The fatigue theory overreads the field merely because fracture mechanics is involved; the scour theory cannot explain the contact marks or timed impulse. The dramatic answer is the one the evidence earns here."
      ],
      "soundTitle": "The Impact Sequence",
      "sound": [
        "Your accusation identifies the captain, the pier, and the vessel strike.",
        "Some fracture or navigation details remain missing, but the fresh morphology and event timing support the conclusion."
      ],
      "namedTitle": "Right Collision, Thin Reconstruction",
      "named": [
        "You select the correct actor, location, and mechanism.",
        "The verdict holds, although missed clues leave parts of the scan history, hull match, or timing chain incomplete."
      ]
    },
    "overclaim": {
      "title": "The Fatigue Story Became the Overreach",
      "body": [
        "The prior scan covered the origin, and the recovered surface lacks the long oxidized growth region expected from a missed fatigue crack.",
        "Institutional neglect is plausible in many bridge cases, but here it is the tempting systemic story that the physical evidence rejects."
      ]
    },
    "dismissal": {
      "title": "Scour Does Not Leave a Towboat’s Signature",
      "body": [
        "Exceptional water levels cannot account for marine paint, matching hull damage, and a synchronized impulse at the navigation-side pier.",
        "The event was sudden, but it was not an untraceable act of the river."
      ]
    },
    "wrongNames": {
      "title": "The Impact, Assigned Elsewhere",
      "body": [
        "You recognize a vessel strike but misidentify the operator or move the initiating event away from the pier where all records converge."
      ]
    }
  }
}
};
