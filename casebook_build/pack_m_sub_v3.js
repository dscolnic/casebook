// Casebook V3 — three informants, three readings, one clue per correct answer.
module.exports = { PACK: {
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "m_sub",
  "title": "The Carrow Deep Implosion",
  "discipline": "Deep Submergence & the Physics of Pressure",
  "venue": "the Carrow Deep inquiry",
  "agent": {
    "name": "Investigator Okonkwo",
    "role": "Board of Inquiry Notebook"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Pioneers of the Deep",
  "dossierName": "PIONEERS OF THE DEEP",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside a deep-submersible disaster",
  "teaser": "The Sirena disappears during descent with one implosive acoustic pulse. Did it collide with the wreck, did a life-support casualty disable the crew first, or did its founder continue diving a composite pressure hull after repeated-cycle warning and without full certification?",
  "overclaimTag": "a collision with the wreck",
  "truthTag": "a repeatedly cycled hull flown beyond its evidence",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A submersible descending to a wreck; an implosion above it\"><path d=\"M0 52 C130 46,270 58,410 52 S620 46,660 52\" fill=\"none\" stroke=\"#e2e2d8\" stroke-width=\"1\"/><path d=\"M0 80 C130 74,270 86,410 80 S620 74,660 80\" fill=\"none\" stroke=\"#e2e2d8\" stroke-width=\"1\"/><path d=\"M0 108 C130 102,270 114,410 108 S620 102,660 108\" fill=\"none\" stroke=\"#e2e2d8\" stroke-width=\"1\"/><path d=\"M0 22 C90 14,180 30,270 22 S450 14,540 22 S650 28,660 22\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><line x1=\"300\" y1=\"24\" x2=\"300\" y2=\"58\" stroke=\"#326891\" stroke-width=\"1.5\" stroke-dasharray=\"3 4\"/><g stroke=\"#B3261E\" stroke-width=\"1.6\" stroke-linecap=\"round\"><line x1=\"300\" y1=\"54\" x2=\"300\" y2=\"82\"/><line x1=\"286\" y1=\"68\" x2=\"314\" y2=\"68\"/><line x1=\"290\" y1=\"58\" x2=\"310\" y2=\"78\"/><line x1=\"310\" y1=\"58\" x2=\"290\" y2=\"78\"/></g><circle cx=\"300\" cy=\"68\" r=\"3.5\" fill=\"#B3261E\"/><g transform=\"rotate(-7 470 118)\"><path d=\"M432 116 L512 116 L500 128 L446 128 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><line x1=\"470\" y1=\"116\" x2=\"470\" y2=\"105\" stroke=\"#121212\" stroke-width=\"1.5\"/></g></svg>",
  "overclaimTease": "Event depth, acoustic shape, recovered fragments, dive cycles, and emission history must agree; the famous wreck is only one candidate source of damage.",
  "DAYS_TOTAL": 3,
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "sd_founder",
      "items": [
        {
          "id": "sd_founder",
          "label": "Marcus Vane — the expedition founder-pilot"
        },
        {
          "id": "sd_opsdir",
          "label": "The surface-operations director"
        },
        {
          "id": "sd_engineer",
          "label": "The lead hull engineer"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "sd_lab",
      "items": [
        {
          "id": "sd_ship",
          "label": "The Support Ship & Acoustic Record"
        },
        {
          "id": "sd_dock",
          "label": "The Expedition Dock & Hangar"
        },
        {
          "id": "sd_lab",
          "label": "The Materials Lab & Recovered Fragments"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "sd_fatigue",
      "items": [
        {
          "id": "sd_strike",
          "label": "A collision with the wreck breached an otherwise sound pressure hull"
        },
        {
          "id": "sd_fatigue",
          "label": "Repeated pressure cycles degraded the hull until it buckled during descent"
        },
        {
          "id": "sd_life",
          "label": "A battery or oxygen casualty disabled the crew before structural loss"
        }
      ]
    }
  },
  "READING_ORDER": [
    "diver",
    "acoust",
    "clerk"
  ],
  "CHARACTERS": {
    "diver": {
      "name": "Salvage Lead Reyes",
      "role": "Deep-recovery ROV lead",
      "face": "🤿",
      "badge": "R",
      "legend": "the fragment field",
      "hint": "The debris lies well short of the wreck and shows inward collapse rather than a local collision breach.",
      "reading": "sd_timoshenko"
    },
    "acoust": {
      "name": "The Acoustics Analyst",
      "role": "Hydrophone-array analyst",
      "face": "🎧",
      "badge": "A",
      "legend": "the sound record",
      "hint": "One broadband implosive pulse occurs at depth without a preceding fire or collision transient.",
      "reading": "sd_wohler"
    },
    "clerk": {
      "name": "The Certification Clerk",
      "role": "Materials and dive-cycle clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the materials file",
      "hint": "Early-cycle acoustic emissions recurred, certification remained incomplete, and the founder approved the final dive.",
      "reading": "sd_kaiser"
    }
  },
  "TOPICS": {
    "sd_timoshenko": {
      "whatHint": "Timoshenko shows a thin shell fails by sudden buckling once its margin is gone — a whole-hull collapse, not a local puncture. Ask what the shell's history had already spent.",
      "sci": "Stephen Timoshenko (1878-1972)",
      "topic": "Why thin shells buckle and collapse",
      "lede": "Stephen Timoshenko showed why a flawless-looking shell can fail suddenly under pressure it once survived.",
      "no": 1,
      "profile": "Stephen Timoshenko became one of the twentieth century’s most influential teachers of engineering mechanics. Born in the Russian Empire in what is now Ukraine, he worked across Europe before joining American universities, eventually teaching at the University of Michigan and Stanford. His books on strength of materials, elasticity, vibration, and structural stability trained generations of engineers to translate loads into stresses, deflections, and failure modes.\n\nOne of his central subjects was buckling: a loss of structural stability rather than a simple crushing of the material. A slender column may bow sideways under a compressive load even though the metal has not reached its ordinary breaking strength. Thin cylindrical and spherical shells behave similarly. Under external pressure, a shell can remain nearly unchanged until a small imperfection—an uneven wall, a slightly distorted shape, a weak joint, or a local delamination—concentrates deformation. Once instability begins, the geometry redirects the load and collapse can accelerate abruptly.\n\nThat distinction matters for deep submergence. Water pressure rises by roughly one atmosphere for every ten metres of depth, pressing inward over the entire hull. A pressure vessel is therefore judged not only by the strength of its material but by its shape, thickness, joints, penetrations, manufacturing tolerances, and previous damage. A successful static pressure test proves survival of that test; it does not automatically establish unlimited life under repeated dives.\n\nTimoshenko’s framework separates a slow life-support emergency from structural implosion. Oxygen loss, carbon-dioxide buildup, or battery trouble normally develops through measurable changes. Buckling of a critically weakened shell can cross its stability threshold with little visible warning and finish in a fraction of a second. The useful question is not merely whether the material was “strong,” but whether the complete shell still possessed sufficient stability at that depth.",
      "frame": "Reyes taps a chalked ring on the hangar floor. “A pressure hull does not have to crack open slowly. Show me you understand how a shell can lose stability all at once.”",
      "q": [
        {
          "q": "What makes elastic buckling different from ordinary material crushing?",
          "o": [
            {
              "t": "A structure melts locally before its material reaches the stated service limit.",
              "v": "wrong",
              "fb": "Melting is a thermal failure, whereas buckling is driven by compressive load and geometry."
            },
            {
              "t": "A structure loses geometric stability before its material reaches full strength.",
              "v": "expert",
              "fb": "Buckling is an instability of shape, so it may occur below the material’s crushing or yield strength."
            },
            {
              "t": "A structure corrodes evenly until nearly every part reaches the same reduced thickness.",
              "v": "partial",
              "fb": "Corrosion can promote buckling, but uniform thinning is not what defines the instability."
            },
            {
              "t": "A structure fractures mainly after nearly every section carries identical tensile stress.",
              "v": "wrong",
              "fb": "Buckling usually begins under compression and does not require uniform tensile stress."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "Timoshenko’s shell-buckling mechanism explains the nearly simultaneous inward collapse of the recovered hull rather than a local puncture at the wreck."
          }
        },
        {
          "q": "Why are small imperfections important in a pressure shell?",
          "o": [
            {
              "t": "They increase buoyancy and therefore raise the external pressure on nearly every surface.",
              "v": "wrong",
              "fb": "Buoyancy does not turn a small geometric flaw into extra hydrostatic pressure."
            },
            {
              "t": "They equalize the stress field and delay buckling until the material fully yields.",
              "v": "danger",
              "fb": "Imperfections generally weaken shell stability rather than making the stress field more uniform."
            },
            {
              "t": "They focus deformation and can sharply reduce the pressure needed for collapse.",
              "v": "expert",
              "fb": "Real shells buckle below ideal predictions because imperfections concentrate displacement and stress."
            },
            {
              "t": "They matter mainly after a shell has already split substantially along a welded seam.",
              "v": "wrong",
              "fb": "Imperfections can trigger instability before any complete split or open crack appears."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "Imperfection-sensitive buckling is read from the deformed fragments and interface geometry in the materials lab."
          }
        },
        {
          "q": "What does one successful pressure test establish most securely?",
          "o": [
            {
              "t": "The vessel will survive nearly every later dive regardless of damage or modifications.",
              "v": "danger",
              "fb": "Past survival cannot guarantee future integrity when defects and cycle damage can accumulate."
            },
            {
              "t": "The vessel material can rarely buckle because its static strength was demonstrated.",
              "v": "wrong",
              "fb": "Static material strength and shell-buckling resistance are related but not interchangeable."
            },
            {
              "t": "The vessel needs no inspection until its rated operating depth is exceeded.",
              "v": "wrong",
              "fb": "Inspection remains necessary because damage can grow during service below the nominal depth limit."
            },
            {
              "t": "The vessel survived that particular load history and test configuration.",
              "v": "expert",
              "fb": "A passed test supports that tested condition, not unlimited future cycles or altered configurations."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The design warnings and depth limit were available before launch, shifting responsibility toward the founder who authorized continued operation."
          }
        }
      ]
    },
    "sd_wohler": {
      "whatHint": "Wöhler counted the cycles a part survives before it fails without warning. A dive log is a cycle count; ask how many this hull had spent against the number it was certified for.",
      "sci": "August Wöhler (1819-1914)",
      "topic": "Fatigue and the life of a cyclically loaded part",
      "lede": "August Wöhler discovered that modest loads, repeated often enough, can break parts that pass static tests.",
      "no": 2,
      "profile": "August Wöhler was a German railway engineer confronted by a disturbing industrial mystery: axles sometimes fractured after long service even though ordinary calculations said the loads were safe. Railway expansion made the problem urgent. A broken axle could derail a train, yet the part might show no single overload large enough to explain the failure.\n\nWöhler built systematic test machines and repeatedly loaded specimens until they broke. He varied the stress and counted the cycles. The resulting relationship, later represented by stress-life or S–N curves, established fatigue as a distinct failure process. High repeated stresses produced failure in fewer cycles; lower stresses permitted longer life. A component could fail under loads well below the force needed to break it in one pull because microscopic damage initiated and grew with repetition.\n\nFatigue begins locally. Surface marks, holes, joints, manufacturing defects, residual stresses, and abrupt changes in shape raise the stress at particular points. Tiny cracks can advance by minute amounts on each cycle and then accelerate after the remaining sound section becomes too small. The final fracture may look sudden, but much of its history was written gradually. Counting cycles, examining fracture surfaces, and knowing the actual load spectrum therefore matter as much as the maximum load.\n\nWöhler worked mainly with metals, while modern submersibles may use layered composites, adhesives, and mixed-material joints. The materials differ, but the engineering discipline carries over: repeated pressure cycles are a life variable, not background scenery. A vessel validated for a limited test program cannot be assumed immortal because earlier dives succeeded. Every descent and ascent applies another severe reversal of stress. When cycle limits, inspections, or independent certification are missing, “it survived before” becomes evidence of exposure, not proof of safety.",
      "frame": "The clerk lays a dive ledger beside a railway-axle sketch. “Failures can be counted long before they are seen. Show me why the number of cycles belongs in a build file.”",
      "q": [
        {
          "q": "What did Wöhler’s repeated-load experiments establish?",
          "o": [
            {
              "t": "Parts can fail from many cycles at stresses below one-pull strength; in use.",
              "v": "expert",
              "fb": "Fatigue allows repeated subcritical loads to initiate and grow damage until fracture occurs."
            },
            {
              "t": "Parts fail mainly when one cycle exceeds the material’s measured tensile strength.",
              "v": "danger",
              "fb": "Fatigue failure can occur without any single cycle reaching the static breaking strength."
            },
            {
              "t": "Parts become stronger whenever the same moderate load is applied repeatedly.",
              "v": "wrong",
              "fb": "Repeated loading can accumulate damage rather than continually strengthening the part."
            },
            {
              "t": "Parts have identical service lives whenever their maximum loads are equal.",
              "v": "wrong",
              "fb": "Life also depends on cycle count, load range, defects, environment, and geometry."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "Wöhler’s repeated-load law shows why successful earlier dives can consume fatigue life while leaving the hull apparently intact."
          }
        },
        {
          "q": "What information does an S–N curve relate?",
          "o": [
            {
              "t": "Static pressure depth to the amount of buoyancy produced by a hull.",
              "v": "wrong",
              "fb": "Buoyancy and hydrostatic depth are not the variables represented by an S–N curve."
            },
            {
              "t": "Cyclic stress level to the number of cycles sustained before failure.",
              "v": "expert",
              "fb": "An S–N curve links stress amplitude or range with fatigue life measured in cycles."
            },
            {
              "t": "Crack width to the acoustic frequency recorded by nearly every nearby sensor.",
              "v": "partial",
              "fb": "Cracks can emit sound, but an S–N curve does not directly map width to frequency."
            },
            {
              "t": "Material density to the speed at which a support vessel reaches port.",
              "v": "wrong",
              "fb": "Transport speed and material density are unrelated to the fatigue-life graph."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The dive-cycle count and recovered interface damage meet in the materials lab, where cumulative history becomes measurable."
          }
        },
        {
          "q": "Why can earlier successful dives be misleading evidence of safety?",
          "o": [
            {
              "t": "Each dive removes all prior stresses once the vehicle returns to the surface.",
              "v": "danger",
              "fb": "Unloading removes current stress but does not erase cracks, delamination, or other permanent damage."
            },
            {
              "t": "Each dive suggests the hull has entered an unlimited endurance regime automatically.",
              "v": "wrong",
              "fb": "An endurance limit cannot be assumed, especially for composites and mixed structural systems."
            },
            {
              "t": "Each dive adds cycles, so prior survival may coexist with growing hidden damage.",
              "v": "expert",
              "fb": "Fatigue accumulates during successful service and may remain invisible until late in life."
            },
            {
              "t": "Each dive lowers seawater pressure during the next descent by a fixed amount.",
              "v": "wrong",
              "fb": "External pressure depends on depth, not on how many previous descents the vessel completed."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The founder-pilot approved dives beyond the internally recommended cycle review while the engineer’s caution remained in the file."
          }
        }
      ]
    },
    "sd_kaiser": {
      "whatHint": "Kaiser found that stressed metal talks before it breaks — micro-cracking a monitored hull records long before the end. Ask whether anything was listening across those dives.",
      "sci": "Josef Kaiser (1907-1992)",
      "topic": "Materials that crackle before they break",
      "lede": "Josef Kaiser learned that stressed materials remember earlier loads—and announce new damage with tiny bursts of sound.",
      "no": 3,
      "profile": "Josef Kaiser’s work in the middle of the twentieth century helped establish acoustic emission as a method for listening to materials under load. In tensile tests he detected brief elastic waves released when microscopic processes—slip, crack initiation, fibre breakage, or other internal changes—suddenly liberated stored strain energy. Sensors attached to a structure could convert those waves into electrical signals.\n\nThe behavior associated with his name is the Kaiser effect. In an idealized material that has previously been loaded to a certain maximum, little new acoustic emission appears during reloading until the earlier maximum stress is exceeded. The material seems to retain a memory of its load history. Engineers later developed related measures for imperfect and composite structures. When significant emissions resume below the previous maximum—a departure often discussed through the Felicity effect—it can indicate continuing damage or reduced structural integrity.\n\nAcoustic emission is not simply a loudness alarm. Analysts examine event counts, energy, location, timing, and how activity changes with load. A single click may be harmless friction or electronic noise. A growing pattern localized to a pressure hull during successive dives is more concerning, especially if it begins earlier in the loading cycle. Sensors require calibration and interpretation, and silence does not guarantee health; damaged regions may stop emitting after a major crack has already formed.\n\nFor composite pressure structures, the method is valuable because damage can be distributed and partly hidden. Matrix microcracks, fibre fractures, debonding, and delamination can occur inside layers that look intact from the surface. Repeated acoustic activity is evidence that the structure is changing, not proof that it is safely “settling.” Kaiser’s legacy is a disciplined way to treat crackling as data tied to load history. When warnings recur and the validated cycle life is uncertain, they demand investigation rather than normalization.",
      "frame": "The clerk slides over a waveform log marked with dive numbers. “The hull was not silent during loading. Tell me what a material’s acoustic memory can reveal.”",
      "q": [
        {
          "q": "What produces an acoustic-emission signal in a loaded material?",
          "o": [
            {
              "t": "A steady temperature reading is converted directly into an underwater echo.",
              "v": "wrong",
              "fb": "Temperature sensors and acoustic-emission sensors measure different physical quantities."
            },
            {
              "t": "External water pressure becomes audible without any change inside the material.",
              "v": "partial",
              "fb": "Load creates the conditions, but emissions arise from discrete internal changes or frictional events."
            },
            {
              "t": "A computer invents warning pulses whenever a scheduled inspection is overdue.",
              "v": "danger",
              "fb": "Instrumentation may produce noise, but genuine emissions must be distinguished through calibration and location."
            },
            {
              "t": "A sudden internal damage event releases strain energy as elastic waves.",
              "v": "expert",
              "fb": "Cracking, fibre breakage, slip, or debonding can emit transient elastic waves detected by sensors."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "Kaiser’s acoustic-emission records are preserved with the certification and fragment tests in the materials lab rather than at the wreck site."
          }
        },
        {
          "q": "What does the classic Kaiser effect describe?",
          "o": [
            {
              "t": "Emission stays low on reloading until the previous maximum stress is exceeded.",
              "v": "expert",
              "fb": "The effect reflects a material memory in which substantial new activity begins above the prior maximum."
            },
            {
              "t": "Emission doubles at nearly every cycle even when the structure carries no applied load.",
              "v": "wrong",
              "fb": "Acoustic emission depends on active internal processes and does not automatically double by cycle count."
            },
            {
              "t": "Emission suggests a structure is safe whenever it produces loud crackling sounds.",
              "v": "danger",
              "fb": "Crackling can indicate active damage and should never be treated as a certificate of safety."
            },
            {
              "t": "Emission occurs mainly after a component has separated into two visible pieces.",
              "v": "wrong",
              "fb": "Sensors can detect microscopic damage long before complete visible fracture."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "Recurring emission below prior maximum load was reported to the founder, who overrode the proposed stand-down for review."
          }
        },
        {
          "q": "Why is repeated early-cycle emission concerning in a composite?",
          "o": [
            {
              "t": "It suggests the fibres are becoming stronger through harmless pressure conditioning.",
              "v": "danger",
              "fb": "Repeated emissions are not evidence of beneficial strengthening and may mark progressive failure."
            },
            {
              "t": "It can indicate new damage developing below the structure’s former load level.",
              "v": "expert",
              "fb": "Activity below the prior maximum may show degraded integrity and continuing internal damage."
            },
            {
              "t": "It shows the hydrophones have mistaken nearly every hull sound for a seabed collision.",
              "v": "wrong",
              "fb": "Hull-mounted acoustic emission and remote hydrophone localization are separate measurements."
            },
            {
              "t": "It means the resin has converted all compressive stress into useful buoyancy.",
              "v": "wrong",
              "fb": "Resin cannot transform structural compression into buoyant lift through acoustic activity."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "Repeated early-cycle crackling signals accumulated damage and reject both a sudden collision and a life-support event preceding structural collapse."
          }
        }
      ]
    }
  },
  "story": [
    "<b>The Sirena’s final sound is one implosive pulse, but its structural story spans the entire dive ledger.</b>",
    "Salvage Lead Reyes has the field geometry. The Acoustics Analyst can place and classify the pulse. The Certification Clerk holds cycle counts, emissions, and approval records.",
    "A wreck collision, an internal casualty, and cumulative hull degradation each predict a different order of sound, deformation, and debris.",
    "The board must decide who accepted the structural uncertainty and where the repeated-load evidence becomes conclusive."
  ],
  "endings": {
    "overclaimWhat": "sd_strike",
    "dismissalWhat": "sd_life",
    "win": {
      "expertTitle": "The Dive Cycle That Was Spent",
      "expert": [
        "You connect Marcus Vane — the expedition founder-pilot, the Materials Lab & Recovered Fragments, and repeated pressure cycles degrading the hull until buckling during descent. The full clue chain links the initiating condition, the physical mechanism, and the decisive record without relying on candidate order.",
        "The two alternative explanations each fit part of the scene, but neither survives the combined timing, material, and documentary evidence."
      ],
      "soundTitle": "The Hull History Converges",
      "sound": [
        "Your accusation identifies Marcus Vane — the expedition founder-pilot, the Materials Lab & Recovered Fragments, and repeated pressure cycles degrading the hull until buckling during descent.",
        "A few missed clues leave gaps in the reconstruction, yet the evidence you recovered is sufficient to distinguish the true sequence from both traps."
      ],
      "namedTitle": "Correct Failure, Limited Certification Chain",
      "named": [
        "You reach the correct three-part verdict with a thin evidentiary file.",
        "The result is right, although the unrecovered clues would be needed to defend the causal chain under sustained challenge."
      ]
    },
    "overclaim": {
      "title": "The Wreck Was Never Reached",
      "body": [
        "The debris lies short of the wreck and lacks an outward local puncture or collision transient.",
        "Inward shell collapse and event location reject contact with the wreck as the initiating event."
      ]
    },
    "dismissal": {
      "title": "The Crew Casualty Did Not Precede Collapse",
      "body": [
        "No earlier fire, battery, or breathing-casualty signature precedes the broadband implosive pulse.",
        "A crew emergency cannot explain the recovered buckling morphology or repeated-cycle material emissions."
      ]
    },
    "wrongNames": {
      "title": "Right Mechanism, Wrong Attribution",
      "body": [
        "You recognize the governing mechanism but assign it to the wrong actor or move its decisive evidence away from the location where the records and physical traces converge."
      ]
    }
  }
}
};
