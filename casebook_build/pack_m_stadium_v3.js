// Casebook V3 — three informants, three readings, one clue per correct answer.
module.exports = { PACK: {
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "m_stadium",
  "title": "The Coronet Arena Roof",
  "discipline": "Structures & Crowd Dynamics",
  "venue": "the Coronet Arena inquiry",
  "agent": {
    "name": "Investigator Priya Lund",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Structures & Crowd Pioneers",
  "dossierName": "STRUCTURES & CROWD-DYNAMICS PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Coronet Arena inquiry",
  "DAYS_TOTAL": 3,
  "teaser": "An arena roof folds during a sold-out winter event. Did an explosion cut the load path, did an unauthorized connection remove the design margin, or did an extraordinary snow drift exceed what a compliant roof was required to carry?",
  "overclaimTag": "an explosive break in the roof structure",
  "truthTag": "a rare snow drift beyond the approved design basis",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A long-span arena roof with a failed central connection above a loaded stand\"><path d=\"M70 92 Q330 18 590 92\" fill=\"none\" stroke=\"#121212\" stroke-width=\"4\"/><path d=\"M100 92 Q330 42 560 92\" fill=\"none\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><path d=\"M130 92 v22 M200 72 v42 M330 54 v60 M460 72 v42 M530 92 v22\" stroke=\"#121212\" stroke-width=\"2\"/><circle cx=\"330\" cy=\"54\" r=\"8\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"3\"/><path d=\"M320 44 l20 20 M340 44 l-20 20\" stroke=\"#B3261E\" stroke-width=\"2\"/><path d=\"M180 112 h300\" stroke=\"#326891\" stroke-width=\"3\"/></svg>",
  "overclaimTease": "A spectacular collapse does not guarantee misconduct. Compare the installed node with the drawings, the crowd with its operating envelope, and the measured drift with the design return period.",
  "CATS": {
    "who": {
      "title": "Who bears responsibility",
      "truth": "st_storm",
      "items": [
        {
          "id": "st_storm",
          "label": "An act of nature — a record storm, not a person"
        },
        {
          "id": "st_developer",
          "label": "Vaughn Kroll — arena developer"
        },
        {
          "id": "st_engineer",
          "label": "The structural engineer of record"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "st_roof",
      "items": [
        {
          "id": "st_stand",
          "label": "The Stand & Concourse"
        },
        {
          "id": "st_roof",
          "label": "The Roof Trusses & Snow-Drift Zone"
        },
        {
          "id": "st_office",
          "label": "The Developer’s Project Office"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "st_snow",
      "items": [
        {
          "id": "st_bomb",
          "label": "An explosive event severed the roof’s primary load path"
        },
        {
          "id": "st_connection",
          "label": "An unauthorized weaker node failed under ordinary service loads"
        },
        {
          "id": "st_snow",
          "label": "A code-exceeding snow drift overloaded a compliant roof zone"
        }
      ]
    }
  },
  "READING_ORDER": [
    "st_erector",
    "st_steward",
    "st_clerk"
  ],
  "CHARACTERS": {
    "st_erector": {
      "name": "Steelworker Bo Renn",
      "role": "Roof steel erector",
      "face": "🔧",
      "badge": "B",
      "legend": "the roof truss",
      "hint": "The failed node matches the issued detail in plate thickness, bolt count, and installation records.",
      "reading": "st_shukhov"
    },
    "st_steward": {
      "name": "The Head Steward",
      "role": "Crowd-safety steward",
      "face": "📣",
      "badge": "S",
      "legend": "the loaded stand",
      "hint": "Crowd density and synchronized motion stayed within the event envelope used for the approved design.",
      "reading": "st_fruin"
    },
    "st_clerk": {
      "name": "The Project Records Clerk",
      "role": "Design-change records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the developer’s office",
      "hint": "Independent review finds no hidden substitution; the localized snow drift exceeded the code basis and original reliability target.",
      "reading": "st_cornell"
    }
  },
  "TOPICS": {
    "st_shukhov": {
      "sci": "Vladimir Shukhov (1853-1939)",
      "topic": "Steel lattice shells & tension roofs",
      "lede": "The Moscow engineer who roofed vast halls with a net of steel decades before anyone had a name for what he was doing.",
      "no": 1,
      "profile": "Vladimir Shukhov was a Russian engineer of extraordinary range — oil pipelines, refineries, bridges, and, above all, some of the lightest long-span roofs ever built. Working in Moscow from the 1880s, he invented the steel lattice gridshell and the hanging steel roof decades before either had a name. For the 1896 All-Russian exhibition at Nizhny Novgorod he roofed enormous halls with thin steel membranes and curved lattices that weighed a fraction of anything comparable, hanging some roofs from a mesh of steel like an upturned tent.\n\nShukhov's insight was that form does the work. A curved lattice of slender bars, or a surface held in pure tension, can span an enormous distance on very little metal — if every member and every joint carries exactly the force the geometry demands. He calculated those forces meticulously and raised the famous hyperboloid Shukhov Tower from straight steel members arranged on a curved surface, proving that honest geometry could replace sheer mass.\n\nBut such structures are only as strong as their nodes. In a lattice shell or a tension roof the loads funnel through connections where many members meet, and each joint must be built to the design or the surface loses the path its force was meant to follow. Shukhov detailed his connections as carefully as his curves.\n\nShukhov’s work makes connections the first place to look, but it also gives investigators a way to clear them. At Coronet, bolt count, plate thickness, welds, and geometry match the issued detail, while fracture starts only after the roof zone carries an extreme asymmetric drift. A light lattice is not invulnerable; it is efficient within the loads for which its path was proportioned. The absence of an altered node matters as much as finding one would have mattered.",
      "frame": "Checks bolt count, plate thickness, and weld geometry against the issued node detail. “A connection can be cleared as carefully as it can be condemned. Start with what was actually built.”",
      "q": [
        {
          "q": "What allowed Shukhov’s long-span roofs to use so little material?",
          "o": [
            {
              "t": "Heavy roof decking spread every load evenly without relying on joints.",
              "v": "wrong",
              "fb": "His light systems depended strongly on lattice geometry and connection behavior."
            },
            {
              "t": "Geometry directed forces through efficient lattice and tension load paths.",
              "v": "expert",
              "fb": "Shukhov used structural form to carry load with slender members rather than relying on mass."
            },
            {
              "t": "Thin steel stayed safe because weather loads barely affect flexible roof structures.",
              "v": "danger",
              "fb": "Lightweight structures still require designed paths for wind, snow, and service loads."
            },
            {
              "t": "Large masonry walls carried most loads while the roof served as decoration.",
              "v": "partial",
              "fb": "Supports receive forces, but the roof system actively spans and distributes them."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — lead",
            "text": "No blast residue or cut load path appears, and the node dimensions match the approved design."
          }
        },
        {
          "q": "Why are nodes critical in a lattice roof?",
          "o": [
            {
              "t": "They transfer forces among members and preserve the intended load path.",
              "v": "expert",
              "fb": "A weak or altered node can interrupt force distribution across the entire structural form."
            },
            {
              "t": "They matter mainly for appearance because forces remain inside each member.",
              "v": "wrong",
              "fb": "Members must exchange tension and compression through connections."
            },
            {
              "t": "Any node failure indicates an explosive force acted at the connection.",
              "v": "danger",
              "fb": "Connections can fail from inadequate capacity under ordinary structural demand."
            },
            {
              "t": "Nodes carry dead weight rather than changing event or weather loads.",
              "v": "partial",
              "fb": "Connections transmit the full combination of loads assigned by the structural system."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — lead",
            "text": "Field measurements show the critical node matches the engineer’s issued dimensions and the erector’s installation record."
          }
        },
        {
          "q": "Which finding would clear the node substitution theory?",
          "o": [
            {
              "t": "A witness recalls a sharp sound as the roof began to move.",
              "v": "partial",
              "fb": "A sound is compatible with many failure mechanisms and proves no substitution."
            },
            {
              "t": "The developer once requested cost reductions on another arena package.",
              "v": "wrong",
              "fb": "Other cost requests do not establish a change at this connection."
            },
            {
              "t": "The failed joint looks small compared with the size of the roof span.",
              "v": "danger",
              "fb": "Efficient joints can look small while still matching their calculated demand."
            },
            {
              "t": "Installed plates, bolts, welds, and geometry all match the issued detail.",
              "v": "expert",
              "fb": "A complete dimensional match removes the alleged unauthorized weakening."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — lead",
            "text": "Failure begins beneath a sharply localized roof drift rather than at the concourse, office, or a blast point."
          }
        }
      ]
    },
    "st_fruin": {
      "sci": "John J. Fruin (pedestrian-dynamics researcher)",
      "topic": "Pedestrian level of service & crowd density",
      "lede": "The traffic engineer who counted people the way others count cars, and turned a packed stand into a number you can weigh.",
      "no": 2,
      "profile": "John J. Fruin was an American traffic engineer who did for crowds what highway engineers had done for cars: he measured them. His 1971 book 'Pedestrian Planning and Design' introduced the pedestrian 'Level of Service,' a scale from A to F describing how freely people can move as a space fills, keyed to a hard number — density in persons per square metre. At low density people walk unimpeded; as density climbs past roughly four or five people per square metre, movement seizes up and the crowd begins to behave like a fluid, transmitting dangerous forces body to body.\n\nFruin later wrote directly about 'The Causes and Prevention of Crowd Disasters,' documenting how overcrowding kills — not by panic, as the myth goes, but by sheer density, where the pressure of packed bodies can bend steel railings and stop breathing. His work underpins modern venue capacity limits, egress calculations, and the posted counts that a steward is supposed to enforce.\n\nFor a structural inquiry, Fruin adds a second meaning to a crowd's density: it is also a load. Building codes assign a stand a live load per square metre based on an assumed, limited occupancy. Pack that stand far past its posted count — standing spectators crammed where seated numbers were assumed — and the weight bearing on the structure climbs well above what the design may have quietly counted on, especially if the design already trimmed its margins.\n\nFruin’s methods keep the crowd from becoming an easy scapegoat. Turnstile counts, video density, movement frequency, and concourse flow all remained within the event envelope used in the arena’s approved analysis. The spectators contributed real live and dynamic load, but not an unprecedented one. The unusual demand came from the roof itself, where wind deposited a deep drift over one structural bay while leaving nearby areas comparatively light.",
      "frame": "Reconstructs density and movement spectra from turnstiles and video. “A crowd is measurable load, not an adjective. Put its demand inside or outside the approved envelope.”",
      "q": [
        {
          "q": "What did Fruin’s pedestrian level-of-service work quantify?",
          "o": [
            {
              "t": "How roof snow depth changes the tensile strength and stiffness of structural steel.",
              "v": "wrong",
              "fb": "That belongs to structural and material analysis rather than pedestrian dynamics."
            },
            {
              "t": "How loud crowd noise needs to be before it creates a damaging pressure wave.",
              "v": "danger",
              "fb": "Acoustic excitement does not function like an explosion in the roof structure."
            },
            {
              "t": "How density and available space affect walking speed, comfort, and flow.",
              "v": "expert",
              "fb": "Fruin translated crowd conditions into measurable relationships rather than impressionistic descriptions."
            },
            {
              "t": "How many seats a venue can sell without considering circulation or density.",
              "v": "partial",
              "fb": "Capacity is not only seat count; movement and local crowding matter."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — corroboration",
            "text": "The crowd remained within its operating envelope while the roof drift exceeded the snow distribution used in design."
          }
        },
        {
          "q": "Why are synchronized crowd movements different from static headcount?",
          "o": [
            {
              "t": "Synchronization removes weight because participants are briefly airborne.",
              "v": "wrong",
              "fb": "Average weight remains and repeated impacts can add dynamic demand."
            },
            {
              "t": "Rhythmic motion can create dynamic forces that vary in time and frequency.",
              "v": "expert",
              "fb": "People moving together can amplify structural response compared with the same mass standing still."
            },
            {
              "t": "Any rhythmic crowd indicates the roof failed chiefly from spectator behavior.",
              "v": "danger",
              "fb": "Dynamic loading must be compared with structural capacity and the approved design case."
            },
            {
              "t": "Crowd density dominates, so timing and movement can be ignored.",
              "v": "partial",
              "fb": "Density affects flow and load, while motion affects dynamic response."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — corroboration",
            "text": "Snow mapping places the peak load over one truss bay while neighboring roof areas carried far less accumulation."
          }
        },
        {
          "q": "What evidence would show that the crowd was not the exceptional load?",
          "o": [
            {
              "t": "Counts and movement spectra remain within the approved event envelope.",
              "v": "expert",
              "fb": "Measured demand within the design envelope rules out an unprecedented crowd case."
            },
            {
              "t": "The crowd was loud enough to be heard outside the arena walls.",
              "v": "partial",
              "fb": "Noise level does not measure structural force or occupancy demand."
            },
            {
              "t": "Several spectators jumped at the same moment during the performance.",
              "v": "wrong",
              "fb": "Synchronized movement matters only after its frequency and magnitude are quantified."
            },
            {
              "t": "The final roof shape appears to lean toward the occupied stand.",
              "v": "danger",
              "fb": "Collapse geometry cannot reconstruct crowd loading by itself."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — corroboration",
            "text": "Crowd operations stayed inside approved limits, and inspection files show no unreviewed construction change or missed defect."
          }
        }
      ]
    },
    "st_cornell": {
      "sci": "C. Allin Cornell (1938-2007)",
      "topic": "Structural reliability & load factors",
      "lede": "The engineer who put a number on safety itself, and showed that the margin in a roof is exactly what a cut corner spends.",
      "no": 3,
      "profile": "An American civil engineer, C. Allin Cornell helped turn structural safety from a matter of tradition into a matter of probability. Working from the 1960s onward, he was a founder of structural reliability theory and, with colleagues, of probabilistic seismic hazard analysis — the framework now used worldwide to reckon the earthquake, wind, and snow demands a structure must survive. He gave engineers the 'reliability index,' a way to measure how far a design sits from failure in the face of uncertainty.\n\nCornell's insight was that both the loads on a structure and its strength are uncertain, scattered quantities, not single fixed values. The snow that falls, the crowd that packs a stand, the true strength of a welded joint — all vary. Safety therefore cannot be a single lucky guess; it must be a deliberate margin sized so that the chance of the load exceeding the strength is acceptably small. This thinking became load-and-resistance-factor design, in which loads are multiplied up and strengths factored down, precisely so that a rare combination — a full house on the day of a heavy snow — is still carried with room to spare.\n\nThat margin is the whole point, and it is exactly what a quiet substitution consumes. When a connection is downgraded below its specified capacity, the reliability index drops; the roof may still stand on an ordinary day, but the buffer meant to absorb the rare combined load is gone. The structure has been silently moved closer to the edge without anyone feeling it move.\n\nCornell’s reliability framework explains why a compliant structure can still fail without fraud or sabotage. Codes select load combinations and return periods; they reduce risk rather than abolish it. Coronet’s records show the installed roof matched the reviewed design, while post-event measurement places the localized snow load beyond the design basis. That combination supports a low-probability exceedance—not because weather excuses every failure, but because the measured resistance and load distributions leave no hidden human reduction to explain.",
      "frame": "Places the verified resistance beside a mapped asymmetric snow drift. “Reliability reduces risk; it does not abolish events beyond the selected basis. Compare the distributions.”",
      "q": [
        {
          "q": "What did Cornell’s structural reliability work add to design?",
          "o": [
            {
              "t": "An assurance that a code-compliant structure will not fail in service.",
              "v": "danger",
              "fb": "Codes reduce risk but cannot provide absolute certainty, especially after unreviewed changes."
            },
            {
              "t": "A method for replacing engineering calculations with expert intuition.",
              "v": "wrong",
              "fb": "Reliability analysis formalizes uncertainty rather than avoiding calculation."
            },
            {
              "t": "A rule applying the largest imaginable load without considering probability.",
              "v": "partial",
              "fb": "Design considers extreme loads, but reliability combines their likelihood with resistance uncertainty."
            },
            {
              "t": "A probabilistic way to compare uncertain loads, resistance, and failure risk.",
              "v": "expert",
              "fb": "Reliability methods recognize variation and calibrate safety margins against target risk."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — decisive",
            "text": "A rare asymmetric snow load surpassed the verified resistance of a compliant roof zone; neither sabotage nor a hidden substitution is required."
          }
        },
        {
          "q": "Why must a value-engineering change be checked against combined loads?",
          "o": [
            {
              "t": "Cheaper materials retain identical strength when their dimensions look similar.",
              "v": "wrong",
              "fb": "Material, geometry, fasteners, and detailing determine resistance."
            },
            {
              "t": "The original engineer’s calculation remains valid regardless of what is installed.",
              "v": "danger",
              "fb": "A changed component requires updated analysis because resistance and load distribution may change."
            },
            {
              "t": "Reducing resistance can erase margin needed when ordinary load cases occur together.",
              "v": "expert",
              "fb": "A connection acceptable for one load alone may fail under the combination the system must carry."
            },
            {
              "t": "Rare snow dominates because crowd loads disappear once people are seated.",
              "v": "partial",
              "fb": "Seated crowds still impose gravity load, and movement can add dynamic demand."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — decisive",
            "text": "Measured drift depth, member demand, and the first structural motion all converge in the Roof Trusses & Snow-Drift Zone."
          }
        },
        {
          "q": "When can a code-compliant roof still fail without hidden misconduct?",
          "o": [
            {
              "t": "Whenever the owner can show that an occupancy certificate was issued.",
              "v": "partial",
              "fb": "A certificate supports compliance but does not prove the event exceeded the basis."
            },
            {
              "t": "When a measured load exceeds the code basis and the verified resistance.",
              "v": "expert",
              "fb": "Reliability design accepts a small residual probability beyond selected load levels."
            },
            {
              "t": "Only when an explosion destroys enough evidence to prevent reconstruction.",
              "v": "wrong",
              "fb": "Missing evidence is not the same as evidence for an unavoidable exceedance."
            },
            {
              "t": "When ordinary snow combines with a deliberately weakened connection.",
              "v": "danger",
              "fb": "That combination describes a design-change case, not a compliant rare event."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — decisive",
            "text": "Independent resistance checks and complete records leave no candidate human action below standard; the remaining cause is the measured load exceedance."
          }
        }
      ]
    }
  },
  "story": [
    "<b>The Coronet roof collapsed during a storm severe enough to make every explanation feel convenient.</b>",
    "Steelworker Bo Renn can compare the node with the drawings. The Head Steward has the crowd measurements. The Project Records Clerk can reconstruct design resistance and the weather basis.",
    "An explosion, a secretly weakened connection, and a genuine code-exceeding drift all remain possible until load and resistance are placed on the same scale.",
    "The case asks whether someone failed—or whether a low-probability event crossed the limit that sound design can reduce but never erase."
  ],
  "endings": {
    "overclaimWhat": "st_bomb",
    "dismissalWhat": "st_connection",
    "win": {
      "expertTitle": "Beyond the Design Snow",
      "expert": [
        "You identify no culpable human actor, the Roof Trusses & Snow-Drift Zone, and a code-exceeding asymmetric snow load. The node matches the drawings, the crowd stayed within limits, and the measured drift surpassed verified resistance.",
        "The blast theory lacks physical residue, while the hidden-substitution theory collapses under dimensional and record checks. This case is the rare one in which the apparent act-of-nature explanation survives technical scrutiny."
      ],
      "soundTitle": "The Load Exceeded the Basis",
      "sound": [
        "Your verdict places the failure in the roof drift zone and recognizes a genuine design-basis exceedance without a culpable actor.",
        "Some reliability or weather details remain incomplete, but the verified construction and measured load support the result."
      ],
      "namedTitle": "Right Storm, Limited Margin Analysis",
      "named": [
        "You choose the correct responsibility finding, place, and mechanism.",
        "The conclusion is right, although missed clues leave the exact drift or resistance comparison less fully established."
      ]
    },
    "overclaim": {
      "title": "No Explosive Load Path",
      "body": [
        "Investigators find no residue, cutting, blast deformation, or outward pressure pattern.",
        "The dramatic visual collapse came from gravity loading, not an explosive event."
      ]
    },
    "dismissal": {
      "title": "The Hidden-Connection Story Was the False Systemic Answer",
      "body": [
        "The critical node matches the issued design and verified capacity; no unauthorized substitution appears in steel or records.",
        "Assuming management neglect simply because it is common in other cases would ignore the measured code-exceeding drift."
      ]
    },
    "wrongNames": {
      "title": "The Rare Event, Put in the Wrong Place",
      "body": [
        "You recognize the snow exceedance but assign human blame or move the initiating load away from the roof drift zone."
      ]
    }
  }
}
};
