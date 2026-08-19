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
  "teaser": "A bridge span drops during rush hour. Did a vessel strike the structure, did exceptional scour remove a support, or had a growing crack already passed the reinspection window under ordinary traffic?",
  "overclaimTag": "an impact event at the span",
  "truthTag": "a fatigue crack left beyond its inspection window",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A truss bridge with a fatigue crack at a gusset connection\"><path d=\"M40 94 H620\" stroke=\"#326891\" stroke-width=\"2\"/><path d=\"M80 76 H580\" stroke=\"#121212\" stroke-width=\"5\"/><path d=\"M100 76 l55-42 55 42 55-42 55 42 55-42 55 42 55-42 55 42\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M330 68 l-10 9 13 8 -9 13\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"3\"/><path d=\"M145 76 v34 M515 76 v34\" stroke=\"#121212\" stroke-width=\"6\"/></svg>",
  "overclaimTease": "A bridge can fall in one moment after a flaw grows for years. Separate fresh impact and support loss from the fracture surface, crack-growth clock, and missed inspection record.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "br_authority",
      "items": [
        {
          "id": "br_authority",
          "label": "Gideon Marsh — bridge authority director"
        },
        {
          "id": "br_engineer",
          "label": "The bridge maintenance engineer"
        },
        {
          "id": "br_inspector",
          "label": "The state bridge inspector"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "br_office",
      "items": [
        {
          "id": "br_truss",
          "label": "The Truss & Cracked Gusset"
        },
        {
          "id": "br_pier",
          "label": "The Piers & Bearings"
        },
        {
          "id": "br_office",
          "label": "The Bridge Authority Office"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "br_fatigue",
      "items": [
        {
          "id": "br_strike",
          "label": "A vessel impact at the span initiated the structural failure"
        },
        {
          "id": "br_flood",
          "label": "Exceptional scour undermined a primary bridge support"
        },
        {
          "id": "br_fatigue",
          "label": "A fatigue crack passed the scheduled reinspection window"
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
      "hint": "The fracture began at a painted-over gusset flaw with old rust along most of its surface.",
      "reading": "br_griffith"
    },
    "br_ndt": {
      "name": "The NDT Technician",
      "role": "Nondestructive-test technician",
      "face": "🧲",
      "badge": "N",
      "legend": "the inspection platform",
      "hint": "An earlier scan found a small reflector and called for a timed reinspection that never occurred.",
      "reading": "br_paris"
    },
    "br_clerk": {
      "name": "The Authority Records Clerk",
      "role": "Inspection records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the authority office",
      "hint": "The director deferred the reinspection while traffic and crack-opening estimates continued to rise.",
      "reading": "br_wells"
    }
  },
  "TOPICS": {
    "br_griffith": {
      "sci": "A. A. Griffith (1893-1963)",
      "topic": "The energy theory of fracture",
      "lede": "The engineer who pulled glass fibers until they told him the secret every broken thing shares: it started at a flaw.",
      "no": 1,
      "profile": "A. A. Griffith was a British aeronautical engineer whose 1920 paper 'The Phenomena of Rupture and Flow in Solids' founded the modern science of fracture. He was gnawed by a long-standing puzzle: real materials broke at stresses far below the enormous strength their atomic bonds predicted. Testing thin glass fibers, he found that thinner fibers were stronger, which pointed at tiny flaws as the culprit — the smaller the sample, the smaller its worst crack could be.\n\nGriffith reframed fracture as a competition of energies. A crack in a stressed body stores elastic strain energy in the material around it; extending the crack releases some of that energy but costs energy to create fresh surface. He showed a crack grows only when the strain energy released outpaces the surface energy required. This gives a critical crack size for a given stress: below it the crack sits stable, above it the crack runs and the part fails. Small flaws, not weak atoms, set real strength.\n\nGriffith later helped pioneer the jet engine at Rolls-Royce, but his fracture criterion stayed his monument, soon extended to metals by Irwin and Orowan.\n\nFor this inquiry, Griffith is the first lesson against both easy stories. A steel truss does not fail because an angry river or a passing barge 'attacked' it from nowhere, nor is its failure an unknowable act of God. Fracture obeys an energy balance around a flaw of a definite, measurable size. A crack grown to critical length under ordinary traffic loads will let go — no barge and no flood needed. Griffith tells the board to find the flaw, measure it, and ask how long it was allowed to grow past the size at which it should have been caught.",
      "frame": "Runs a fingertip along the rusted portion of the fracture and stops at a narrow bright lip. “Most of this crack existed before the span fell. Tell me what makes a flaw become a failure.”",
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
              "t": "Why every old bridge eventually loses strength at the same calendar age.",
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
            "label": "WHAT clue",
            "text": "The fracture contains a broad oxidized region and a small final bright tear, showing a long-standing flaw that ran only after reaching critical size."
          }
        },
        {
          "q": "When does a crack grow in Griffith’s energy balance?",
          "o": [
            {
              "t": "When released strain energy exceeds the cost of creating new surfaces.",
              "v": "expert",
              "fb": "Crack advance becomes favorable when the energy gained by extension exceeds the surface-energy requirement."
            },
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
              "t": "When the crack reaches the geometric center of the gusset plate.",
              "v": "partial",
              "fb": "Criticality depends on energy, stress, geometry, and material—not a universal central location."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "Maintenance crews had reported the painted crack, but the decision to leave it in service came from the authority that controlled closure and reinspection funding."
          }
        },
        {
          "q": "Which location best preserves whether the old flaw was knowingly accepted?",
          "o": [
            {
              "t": "The authority file joining photographs, work orders, and inspection disposition.",
              "v": "expert",
              "fb": "The steel shows the flaw; the office record shows how observations were classified and acted upon."
            },
            {
              "t": "The river channel and pier faces where investigators searched for a striking vessel.",
              "v": "partial",
              "fb": "The channel tests one alternative cause but cannot document treatment of the known crack."
            },
            {
              "t": "The intact pier cap because bridge failures are assumed to originate at supports.",
              "v": "wrong",
              "fb": "This fracture began in the truss connection, and support inspection cannot replace its record."
            },
            {
              "t": "A collapse video whose first visible motion is treated as proof of responsibility.",
              "v": "danger",
              "fb": "Collapse footage records the end sequence, not the years of inspection decisions."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The gusset preserves the fracture history, while the authority office preserves the reports and dispositions that allowed the flaw to remain."
          }
        }
      ]
    },
    "br_paris": {
      "sci": "Paul C. Paris (1930-2017)",
      "topic": "The law of fatigue-crack growth",
      "lede": "The young engineer whose equation was rejected by three journals, then became the law that predicts how a crack creeps forward one truck at a time.",
      "no": 2,
      "profile": "Paul C. Paris was an American engineer who, around 1960, wrote the equation that lets engineers predict how fast a fatigue crack grows. Fracture mechanics could already say when a crack would fail, but not how quickly an existing crack would creep toward that point under repeated loads. Paris proposed that the growth per loading cycle depends on the range of the stress-intensity factor at the crack tip. His paper was famously turned down by leading journals before it became one of the most cited results in the field.\n\nParis's law states that the crack advance per cycle, da/dN, scales with the stress-intensity range, delta-K, raised to a power: da/dN equals C times delta-K to the m. Each pass of a loaded truck opens and closes the crack a little, and each cycle nudges the crack tip forward by an amount the law predicts. Because delta-K grows as the crack lengthens, the crack accelerates — slow for years, then alarmingly fast near the end. This is the mathematical heart of 'damage-tolerant' design: assume a flaw exists, calculate how many cycles it takes to reach critical size, and inspect well before then.\n\nFor this inquiry, Paris is the truth's own clock. A fatigue crack in a bridge gusset does not appear overnight and does not need a barge to grow; it advances a hair with every rush hour, year upon year, exactly as his law predicts. Crucially, the law tells inspectors when to look: there is a window in which the crack is detectable but not yet fatal. A skipped inspection is a skipped chance to catch it inside that window. Paris lets the board show the failure was slow, predictable, and missed — not sudden, and not fate.",
      "frame": "Marks the old scan indication on a plot of predicted crack length versus truck cycles. “A fatigue crack has a clock. The inspection interval is supposed to beat it.”",
      "q": [
        {
          "q": "What does Paris’s law relate?",
          "o": [
            {
              "t": "Fatigue-crack growth per load cycle to the range of stress intensity.",
              "v": "expert",
              "fb": "The law predicts how repeated loading advances a crack through its stable-growth regime."
            },
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
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "The scan indication, traffic history, and fracture markings fit stable cyclic growth from detectable size to final failure under ordinary crossings."
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
            "label": "WHERE clue",
            "text": "The NDT platform found the initial indication, but the missed reinspection exists as a scheduling and disposition decision in the authority office."
          }
        },
        {
          "q": "What is the purpose of setting a fatigue reinspection interval?",
          "o": [
            {
              "t": "Return before a detectable crack can grow to its critical failure size.",
              "v": "expert",
              "fb": "Damage-tolerant inspection schedules are designed to intercept growth inside a safe observation window."
            },
            {
              "t": "Confirm that no truck has exceeded the posted weight since the last visit.",
              "v": "partial",
              "fb": "Traffic records help loading analysis but do not substitute for examining the known flaw."
            },
            {
              "t": "Delay inspection until the crack produces visible distortion from the roadway.",
              "v": "danger",
              "fb": "Visible deformation may arrive too late for a safe repair window."
            },
            {
              "t": "Prove the original scan was false if the bridge remains standing for another year.",
              "v": "wrong",
              "fb": "Continued survival does not invalidate a small flaw or stop its cyclic growth."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The technician requested the timed return, while the director’s office removed it from the funded inspection calendar despite updated traffic counts."
          }
        }
      ]
    },
    "br_wells": {
      "sci": "Alan A. Wells (1924-2005)",
      "topic": "Crack-tip opening displacement",
      "lede": "The welding engineer who measured how far a crack yawns open before it runs, and gave shipyards and bridge shops a test they could trust.",
      "no": 3,
      "profile": "Alan A. Wells was a British engineer at the Welding Institute who, around 1961, gave the profession a fracture parameter suited to the tough, weldable steels used in ships, pipelines, and bridges. Irwin's linear elastic fracture mechanics assumes only a small pocket of yielding at a crack tip, but structural steel — especially near welds — yields a great deal before it breaks. Wells needed a measurable quantity that stayed meaningful once the metal at the tip had plastically deformed.\n\nHis idea was crack-tip opening displacement, or CTOD: as load rises, a sharp crack blunts and its faces separate by a measurable amount, and fracture occurs when that opening reaches a critical value characteristic of the material. CTOD can be measured in a laboratory test on a notched specimen and used to judge whether a real flaw in a real structure is tolerable. It became a cornerstone of engineering-critical-assessment procedures and welding standards, letting engineers set safe flaw sizes for steel that is too ductile for purely elastic analysis.\n\nWells matters to this case because bridges are welded and bolted from tough steel, and the crucial cracks tend to start at welds, where residual stresses and defects concentrate. His work means the tolerable flaw size in a gusset or weld is not a judgment call — it can be tested and specified in advance, and a real crack compared against it. That is the substance of the re-inspection that was shelved. Wells arms the board to argue that the standards existed, the acceptance criteria existed, and the crack could have been measured against them. What was missing was not knowledge but the will to look again.",
      "frame": "Opens a calculation sheet for crack-tip opening displacement and lays it over the deferred work order. “The steel had measurable remaining tolerance. The office spent the time that tolerance bought.”",
      "q": [
        {
          "q": "What does crack-tip opening displacement measure?",
          "o": [
            {
              "t": "How far the crack faces separate near the tip as the material deforms.",
              "v": "expert",
              "fb": "CTOD gives a practical measure of fracture resistance in elastic-plastic materials such as structural steel."
            },
            {
              "t": "How much the whole bridge deck moves vertically under one truck.",
              "v": "wrong",
              "fb": "Deck deflection is a global response, while CTOD is a local crack-tip measure."
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
            "label": "WHAT clue",
            "text": "The measured flaw and CTOD assessment still allowed a repair window at the prior inspection; failure followed only after that window was extended."
          }
        },
        {
          "q": "Why is CTOD useful for welded structural steel?",
          "o": [
            {
              "t": "It accounts for plastic deformation near a crack before unstable fracture.",
              "v": "expert",
              "fb": "Structural steels may yield locally, so a practical toughness measure must include elastic-plastic behavior."
            },
            {
              "t": "It assumes the entire member remains perfectly brittle until it shatters.",
              "v": "wrong",
              "fb": "CTOD was developed precisely to handle significant plasticity near the crack tip."
            },
            {
              "t": "It converts every crack into a harmless rounded notch during service.",
              "v": "danger",
              "fb": "Measurement does not blunt or repair the defect; it estimates resistance and margin."
            },
            {
              "t": "It replaces inspection because a design value remains valid for every future flaw.",
              "v": "partial",
              "fb": "Assessment needs the actual crack, load, material state, and updated inspection data."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The engineering calculation, recommended deadline, funding deferral, and final disposition are joined in the Bridge Authority Office."
          }
        },
        {
          "q": "What file best shows who allowed the repair window to expire?",
          "o": [
            {
              "t": "A signed deferral extending service beyond the assessed repair or reinspection date.",
              "v": "expert",
              "fb": "The signature identifies who accepted the known crack risk after engineers quantified the remaining window."
            },
            {
              "t": "The maintenance engineer’s calculation that initially defined the window.",
              "v": "partial",
              "fb": "The calculation identifies risk and timing, while the later deferral identifies the governing decision."
            },
            {
              "t": "The state inspector’s arrival after collapse and closure of the river crossing.",
              "v": "wrong",
              "fb": "Post-event response does not establish who postponed the earlier required action."
            },
            {
              "t": "A theory that a vessel struck the bridge without appearing on any tracking record.",
              "v": "danger",
              "fb": "An unsupported invisible-impact story cannot outweigh fracture morphology and signed deferral evidence."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The authority official who overrode the engineering deadline, deferred the scan, and kept the span open signed the decisive disposition."
          }
        }
      ]
    }
  },
  "story": [
    "<b>The Halloway Span failed in seconds, but most of its fracture surface had been exposed long enough to rust.</b> The bright final tear is only the last part of the break.",
    "Rigger Tom Vasa knows the painted flaw. The NDT Technician has the first scan and predicted growth interval. The Authority Records Clerk holds the calculation and signed deferral.",
    "A vessel strike would leave fresh impact evidence. Scour would begin at a support. The truss, crack clock, and inspection record test whether the bridge instead failed from a known flaw under ordinary traffic.",
    "Nine clues can reconstruct the flaw’s life from stable crack to missed intervention and the authority that chose continued service."
  ],
  "endings": {
    "overclaimWhat": "br_strike",
    "dismissalWhat": "br_flood",
    "win": {
      "expertTitle": "The Inspection Window Closed",
      "expert": [
        "You join the old fracture surface, Paris-law growth interval, CTOD repair margin, and signed reinspection deferral to Gideon Marsh and the Bridge Authority Office.",
        "No vessel impact or pier scour is needed to explain the collapse. A detectable fatigue crack was allowed to grow through the window designed to catch it."
      ],
      "soundTitle": "The Crack Clock Holds",
      "sound": [
        "Your accusation identifies the authority director, the office, and the fatigue crack beyond its reinspection date.",
        "Some fracture details remain incomplete, but the location and scheduling chain reject both alternatives."
      ],
      "namedTitle": "Correct Crack, Thin File",
      "named": [
        "You choose the correct person, place, and mechanism.",
        "The verdict holds, though missed clues leave the growth calculation or deferral sequence less fully established."
      ]
    },
    "overclaim": {
      "title": "No Fresh Impact at the Origin",
      "body": [
        "The fracture began at an oxidized gusset flaw rather than a new dent or gouge, and tracking evidence supplies no striking vessel.",
        "An impact story ignores the known crack and missed reinspection that already explain the span’s lost capacity."
      ]
    },
    "dismissal": {
      "title": "The Piers Were Not the Origin",
      "body": [
        "Scour inspections and bearings do not place the initiating damage at a support. The fracture origin is in the truss gusset.",
        "Calling the collapse a freak flood erases a measurable crack-growth and inspection history."
      ]
    },
    "wrongNames": {
      "title": "The Crack, Assigned Elsewhere",
      "body": [
        "You identify the fatigue mechanism but place responsibility or culmination away from the office disposition that extended service beyond the assessed window."
      ]
    }
  }
}
};
