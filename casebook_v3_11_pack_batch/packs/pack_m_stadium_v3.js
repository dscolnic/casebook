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
  "teaser": "An arena roof folds during a sold-out winter event. Was the load path severed by an explosion, did exceptional snow overwhelm a compliant structure, or did a substituted node consume the margin needed for combined crowd and weather loads?",
  "overclaimTag": "an explosive break in the roof structure",
  "truthTag": "a substituted connection that spent the design margin",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A long-span arena roof with a failed central connection above a loaded stand\"><path d=\"M70 92 Q330 18 590 92\" fill=\"none\" stroke=\"#121212\" stroke-width=\"4\"/><path d=\"M100 92 Q330 42 560 92\" fill=\"none\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><path d=\"M130 92 v22 M200 72 v42 M330 54 v60 M460 72 v42 M530 92 v22\" stroke=\"#121212\" stroke-width=\"2\"/><circle cx=\"330\" cy=\"54\" r=\"8\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"3\"/><path d=\"M320 44 l20 20 M340 44 l-20 20\" stroke=\"#B3261E\" stroke-width=\"2\"/><path d=\"M180 112 h300\" stroke=\"#326891\" stroke-width=\"3\"/></svg>",
  "overclaimTease": "A light roof can fail dramatically without an explosion or unprecedented storm. Trace the load path, the occupancy demand, and the connection that was actually built.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "st_developer",
      "items": [
        {
          "id": "st_developer",
          "label": "Vaughn Kroll — arena developer"
        },
        {
          "id": "st_engineer",
          "label": "The structural engineer of record"
        },
        {
          "id": "st_inspector",
          "label": "The building-control inspector"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "st_office",
      "items": [
        {
          "id": "st_roof",
          "label": "The Roof Trusses & Node Connections"
        },
        {
          "id": "st_stand",
          "label": "The Stand & Concourse"
        },
        {
          "id": "st_office",
          "label": "The Developer’s Project Office"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "st_connection",
      "items": [
        {
          "id": "st_bomb",
          "label": "An explosive event severed the roof’s primary load path"
        },
        {
          "id": "st_snow",
          "label": "Exceptional snow overwhelmed a roof built to its approved design"
        },
        {
          "id": "st_connection",
          "label": "A substituted node failed under combined service loads"
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
      "hint": "The installed node used a thinner splice and fewer bolts than the issued structural detail.",
      "reading": "st_shukhov"
    },
    "st_steward": {
      "name": "The Head Steward",
      "role": "Crowd-safety steward",
      "face": "📣",
      "badge": "S",
      "legend": "the loaded stand",
      "hint": "Turnstile and video counts show a dense, synchronized crowd but still within the event’s approved operating envelope.",
      "reading": "st_fruin"
    },
    "st_clerk": {
      "name": "The Project Records Clerk",
      "role": "Design-change records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the developer’s office",
      "hint": "The developer approved the cheaper node without rerunning the combined-load reliability check.",
      "reading": "st_cornell"
    }
  },
  "TOPICS": {
    "st_shukhov": {
      "sci": "Vladimir Shukhov (1853-1939)",
      "topic": "Steel lattice shells & tension roofs",
      "lede": "The Moscow engineer who roofed vast halls with a net of steel decades before anyone had a name for what he was doing.",
      "no": 1,
      "profile": "Vladimir Shukhov was a Russian engineer of extraordinary range — oil pipelines, refineries, bridges, and, above all, some of the lightest long-span roofs ever built. Working in Moscow from the 1880s, he invented the steel lattice gridshell and the hanging steel roof decades before either had a name. For the 1896 All-Russian exhibition at Nizhny Novgorod he roofed enormous halls with thin steel membranes and curved lattices that weighed a fraction of anything comparable, hanging some roofs from a mesh of steel like an upturned tent.\n\nShukhov's insight was that form does the work. A curved lattice of slender bars, or a surface held in pure tension, can span an enormous distance on very little metal — if every member and every joint carries exactly the force the geometry demands. He calculated those forces meticulously and raised the famous hyperboloid Shukhov Tower from straight steel members arranged on a curved surface, proving that honest geometry could replace sheer mass.\n\nBut such structures are only as strong as their nodes. In a lattice shell or a tension roof the loads funnel through connections where many members meet, and each joint must be built to the design or the surface loses the path its force was meant to follow. Shukhov detailed his connections as carefully as his curves.\n\nSo Shukhov stands here as the warning against two easy stories. A light, efficient roof that folds did not necessarily 'explode,' and it was not simply overwhelmed by an unforeseeable act of nature. More often someone changed a member or a joint — swapped a cheaper connection for the one the geometry required — and the force found no honest path. Before you reach for a bomb or a freak storm, ask what was built where Shukhov would have demanded a designed node.",
      "frame": "Scrapes fire-blackened paint from the failed node and holds the shop detail beside it. “The roof’s shape sends force to this point. Tell me what happens when the point is not the one designed.”",
      "q": [
        {
          "q": "What allowed Shukhov’s long-span roofs to use so little material?",
          "o": [
            {
              "t": "Geometry directed forces through efficient lattice and tension load paths.",
              "v": "expert",
              "fb": "Shukhov used structural form to carry load with slender members rather than relying on mass."
            },
            {
              "t": "Heavy roof decking spread every load evenly without relying on joints.",
              "v": "wrong",
              "fb": "His light systems depended strongly on lattice geometry and connection behavior."
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
            "label": "WHAT clue",
            "text": "The collapse initiated at a node whose installed splice had less area and fewer bolts than the load-path detail, not at a blast crater or overloaded snow bay."
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
            "label": "WHO clue",
            "text": "Erectors queried the mismatch, but the substitution arrived as an approved developer value-engineering instruction rather than a field improvisation."
          }
        },
        {
          "q": "Where should investigators confirm whether the altered node was authorized?",
          "o": [
            {
              "t": "The project change file joining the issued detail, substitution, review, and approval.",
              "v": "expert",
              "fb": "The roof shows what was installed; the project office record shows how the change entered the work."
            },
            {
              "t": "The concourse and witness logs recording a sharp sound just before collapse.",
              "v": "partial",
              "fb": "Witness timing helps sequence events but cannot establish design authorization."
            },
            {
              "t": "The snow-removal yard because the collapse occurred during a winter event.",
              "v": "wrong",
              "fb": "Operational context does not document the structural detail change."
            },
            {
              "t": "A camera blind spot that might have concealed an explosive device near the node.",
              "v": "danger",
              "fb": "A hypothetical blind spot cannot outweigh connection geometry and approved change records."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The failed node preserves the physical substitution; the developer’s project office preserves the value-engineering authorization."
          }
        }
      ]
    },
    "st_fruin": {
      "sci": "John J. Fruin (pedestrian-dynamics researcher)",
      "topic": "Pedestrian level of service & crowd density",
      "lede": "The traffic engineer who counted people the way others count cars, and turned a packed stand into a number you can weigh.",
      "no": 2,
      "profile": "John J. Fruin was an American traffic engineer who did for crowds what highway engineers had done for cars: he measured them. His 1971 book 'Pedestrian Planning and Design' introduced the pedestrian 'Level of Service,' a scale from A to F describing how freely people can move as a space fills, keyed to a hard number — density in persons per square metre. At low density people walk unimpeded; as density climbs past roughly four or five people per square metre, movement seizes up and the crowd begins to behave like a fluid, transmitting dangerous forces body to body.\n\nFruin later wrote directly about 'The Causes and Prevention of Crowd Disasters,' documenting how overcrowding kills — not by panic, as the myth goes, but by sheer density, where the pressure of packed bodies can bend steel railings and stop breathing. His work underpins modern venue capacity limits, egress calculations, and the posted counts that a steward is supposed to enforce.\n\nFor a structural inquiry, Fruin adds a second meaning to a crowd's density: it is also a load. Building codes assign a stand a live load per square metre based on an assumed, limited occupancy. Pack that stand far past its posted count — standing spectators crammed where seated numbers were assumed — and the weight bearing on the structure climbs well above what the design may have quietly counted on, especially if the design already trimmed its margins.\n\nFruin joins the crowd to the collapse itself. An overfilled section is not just a safety-of-egress problem; it is extra tonnes of live load pressing on a roof and stand that someone may have value-engineered for less. The 'freak snow' story ignores the people; Fruin insists you count them. The real load was crowd plus snow together — and both were foreseeable.",
      "frame": "Reconstructs the stand occupancy from turnstiles and video rather than estimates from television images. “A crowd is a load and a flow. Measure it before calling it unprecedented.”",
      "q": [
        {
          "q": "What did Fruin’s pedestrian level-of-service work quantify?",
          "o": [
            {
              "t": "How density and available space affect walking speed, comfort, and flow.",
              "v": "expert",
              "fb": "Fruin translated crowd conditions into measurable relationships rather than impressionistic descriptions."
            },
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
              "t": "How many seats a venue can sell without considering circulation or density.",
              "v": "partial",
              "fb": "Capacity is not only seat count; movement and local crowding matter."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "Turnstiles and video show a dense, rhythmic crowd that increased service demand but remained within the approved event envelope used in the original design."
          }
        },
        {
          "q": "Why are synchronized crowd movements different from static headcount?",
          "o": [
            {
              "t": "Rhythmic motion can create dynamic forces that vary in time and frequency.",
              "v": "expert",
              "fb": "People moving together can amplify structural response compared with the same mass standing still."
            },
            {
              "t": "Synchronization removes weight because participants are briefly airborne.",
              "v": "wrong",
              "fb": "Average weight remains and repeated impacts can add dynamic demand."
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
            "label": "WHERE clue",
            "text": "The stand supplies the measured occupancy demand, but the accepted combined-load capacity and change decision remain in the project office."
          }
        },
        {
          "q": "Which evidence best tests the “unprecedented crowd load” explanation?",
          "o": [
            {
              "t": "Turnstile counts, video density, movement timing, and the approved load envelope.",
              "v": "expert",
              "fb": "Measured demand must be compared with what the structure was designed and authorized to carry."
            },
            {
              "t": "Television commentary describing the audience as the loudest in arena history.",
              "v": "danger",
              "fb": "Rhetoric cannot quantify mass, density, or dynamic loading."
            },
            {
              "t": "The final collapse shape because it can supposedly reveal crowd occupancy directly.",
              "v": "partial",
              "fb": "Ticket inventory is an upper bound, not a complete occupancy and behavior record."
            },
            {
              "t": "The final collapse shape because it directly counts how many people were present.",
              "v": "wrong",
              "fb": "Failure geometry does not reconstruct crowd occupancy by itself."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The crowd data had been included in the original design check; only the developer-approved weaker node removed the margin against the measured combined demand."
          }
        }
      ]
    },
    "st_cornell": {
      "sci": "C. Allin Cornell (1938-2007)",
      "topic": "Structural reliability & load factors",
      "lede": "The engineer who put a number on safety itself, and showed that the margin in a roof is exactly what a cut corner spends.",
      "no": 3,
      "profile": "An American civil engineer, C. Allin Cornell helped turn structural safety from a matter of tradition into a matter of probability. Working from the 1960s onward, he was a founder of structural reliability theory and, with colleagues, of probabilistic seismic hazard analysis — the framework now used worldwide to reckon the earthquake, wind, and snow demands a structure must survive. He gave engineers the 'reliability index,' a way to measure how far a design sits from failure in the face of uncertainty.\n\nCornell's insight was that both the loads on a structure and its strength are uncertain, scattered quantities, not single fixed values. The snow that falls, the crowd that packs a stand, the true strength of a welded joint — all vary. Safety therefore cannot be a single lucky guess; it must be a deliberate margin sized so that the chance of the load exceeding the strength is acceptably small. This thinking became load-and-resistance-factor design, in which loads are multiplied up and strengths factored down, precisely so that a rare combination — a full house on the day of a heavy snow — is still carried with room to spare.\n\nThat margin is the whole point, and it is exactly what a quiet substitution consumes. When a connection is downgraded below its specified capacity, the reliability index drops; the roof may still stand on an ordinary day, but the buffer meant to absorb the rare combined load is gone. The structure has been silently moved closer to the edge without anyone feeling it move.\n\nCornell reframes the 'act of God' entirely. A heavy snow with a packed crowd is not an unforeseeable freak; it is the designed-for combination the load factors exist to cover. If the roof failed, its margin had already been spent — by a cheapened joint that ate the safety the numbers had set aside.",
      "frame": "Lays the original reliability calculation beside the value-engineering sheet and recomputes the capacity with the installed node. “A safety margin is not spare money. A change spends it.”",
      "q": [
        {
          "q": "What did Cornell’s structural reliability work add to design?",
          "o": [
            {
              "t": "A probabilistic way to compare uncertain loads, resistance, and failure risk.",
              "v": "expert",
              "fb": "Reliability methods recognize variation and calibrate safety margins against target risk."
            },
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
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "Recalculation with the installed node shows failure under the measured crowd-and-snow combination even though that combination remained inside the approved design envelope."
          }
        },
        {
          "q": "Why must a value-engineering change be checked against combined loads?",
          "o": [
            {
              "t": "Reducing resistance can erase margin needed when ordinary load cases occur together.",
              "v": "expert",
              "fb": "A connection acceptable for one load alone may fail under the combination the system must carry."
            },
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
              "t": "Rare snow dominates because crowd loads disappear once people are seated.",
              "v": "partial",
              "fb": "Seated crowds still impose gravity load, and movement can add dynamic demand."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The reliability gap appears only when the original calculation, substituted detail, and approval are joined in the developer’s project office."
          }
        },
        {
          "q": "Which document ties the weaker roof node to the person who authorized it?",
          "o": [
            {
              "t": "The signed substitution approval issued without the required combined-load reanalysis.",
              "v": "expert",
              "fb": "The approval shows who accepted reduced resistance without verifying the governing load case."
            },
            {
              "t": "The structural engineer’s original detail and the stronger capacity calculation behind it.",
              "v": "partial",
              "fb": "The original design establishes intended capacity but not who authorized departure from it."
            },
            {
              "t": "The inspector’s final occupancy certificate issued before the changed shop detail arrived.",
              "v": "wrong",
              "fb": "A certificate based on earlier information does not authorize a later unreviewed substitution."
            },
            {
              "t": "An anonymous claim that explosives were stored somewhere near the arena complex.",
              "v": "danger",
              "fb": "Unverified proximity cannot explain the installed connection and reliability calculation."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The developer who approved the weaker splice, rejected reanalysis delay, and retained the savings is the only candidate joining authority and benefit."
          }
        }
      ]
    }
  },
  "story": [
    "<b>The Coronet roof folded during a sold-out winter event.</b> The crowd and snow were real; the question is whether they exceeded the approved design or exposed a connection that no longer matched it.",
    "Steelworker Bo Renn has the installed node and shop detail. The Head Steward can reconstruct occupancy and rhythmic movement. The Project Records Clerk holds the value-engineering approval and reliability calculation.",
    "An explosion would sever the load path by an external event. Exceptional snow would overwhelm a compliant roof. The physical node and combined-load margin distinguish both from a changed structure.",
    "Nine clues can trace force from stand and roof through the substituted connection to the office that accepted the reduced capacity."
  ],
  "endings": {
    "overclaimWhat": "st_bomb",
    "dismissalWhat": "st_snow",
    "win": {
      "expertTitle": "The Margin Spent at One Node",
      "expert": [
        "You join the underbuilt connection, measured crowd-and-snow demand, and missing combined-load reanalysis to Vaughn Kroll and the Developer’s Project Office.",
        "No explosive event is needed, and the loads were not outside the approved design envelope. The roof failed because the built node no longer had the capacity of the reviewed design."
      ],
      "soundTitle": "The Broken Load Path",
      "sound": [
        "Your accusation identifies the developer, the project office, and the substituted node under combined service loads.",
        "Some occupancy or reliability details remain incomplete, but physical and documentary evidence reject both traps."
      ],
      "namedTitle": "Correct Node, Thin Calculation",
      "named": [
        "You choose the right person, place, and mechanism.",
        "The verdict holds, though missed clues leave the crowd reconstruction or reliability margin less fully established."
      ]
    },
    "overclaim": {
      "title": "No Blast Signature at the Origin",
      "body": [
        "The collapse began at a mechanically under-capacity splice with no explosive residue or blast deformation.",
        "The bomb theory adds an external event where the installed geometry and load calculation already explain the failure."
      ]
    },
    "dismissal": {
      "title": "The Loads Were Inside the Original Envelope",
      "body": [
        "Snow and crowd demand were significant but within the combination used for the approved design.",
        "Calling the storm unprecedented protects the substitution from scrutiny and confuses reduced capacity with excessive load."
      ]
    },
    "wrongNames": {
      "title": "The Connection, Assigned Elsewhere",
      "body": [
        "You identify the substituted-node failure but place responsibility or culmination away from the project file that authorized reduced resistance without reanalysis."
      ]
    }
  }
}
};
