// Casebook V3 — three informants, three readings, one clue per correct answer.
module.exports = { PACK: {
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "t_pipeline",
  "title": "The Brant Hollow Pipeline",
  "discipline": "Pipeline Integrity & Fluid Mechanics",
  "venue": "the Brant Hollow pipeline inquiry",
  "agent": {
    "name": "Investigator Rhea Colton",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Fluid-Flow & Corrosion Pioneers",
  "dossierName": "FLUID-FLOW & CORROSION PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Brant Hollow pipeline inquiry",
  "DAYS_TOTAL": 3,
  "teaser": "A gas pipeline ruptures beneath a residential block. Was it struck from outside, split by a sudden ground movement, or did progressive wall loss escape the inspection program until normal pressure finished the job?",
  "overclaimTag": "external damage at the rupture site",
  "truthTag": "progressive corrosion missed after a cancelled inspection",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A buried gas pipeline with localized wall loss and a rupture\"><path d=\"M40 70 H620\" stroke=\"#121212\" stroke-width=\"12\" stroke-linecap=\"round\"/><path d=\"M40 70 H620\" stroke=\"#e2e2d8\" stroke-width=\"4\"/><path d=\"M350 52 l-12 18 12 18 12-18z\" fill=\"#B3261E\"/><path d=\"M330 42 q20 -18 40 0 M324 98 q26 18 52 0\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/><path d=\"M80 25 v25 M160 25 v25 M500 25 v25 M580 25 v25\" stroke=\"#121212\" stroke-width=\"2\"/></svg>",
  "overclaimTease": "A rupture can look like a single violent event. The harder question is whether the pipe had already lost the wall thickness that ordinary operating pressure required.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "operator",
      "items": [
        {
          "id": "operator",
          "label": "Hollis Trask — pipeline integrity operator"
        },
        {
          "id": "controller",
          "label": "The gas-control dispatcher"
        },
        {
          "id": "regulator",
          "label": "The pipeline-safety regulator"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "office",
      "items": [
        {
          "id": "rightofway",
          "label": "The Right-of-Way & Rupture Site"
        },
        {
          "id": "control",
          "label": "The Gas Control Center"
        },
        {
          "id": "office",
          "label": "The Operator’s Integrity Office"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "corrosion",
      "items": [
        {
          "id": "attack",
          "label": "External excavation damage opened the pipe at the rupture location"
        },
        {
          "id": "freak",
          "label": "Sudden ground movement split an otherwise sound buried pipeline"
        },
        {
          "id": "corrosion",
          "label": "Progressive wall loss passed a cancelled inspection window"
        }
      ]
    }
  },
  "READING_ORDER": [
    "patrol",
    "dispatch",
    "clerk"
  ],
  "CHARACTERS": {
    "patrol": {
      "name": "Line-Walker Dumas",
      "role": "Pipeline patroller",
      "face": "🚶",
      "badge": "P",
      "legend": "the right-of-way",
      "hint": "Bubbling soil and coating damage were reported where the pipe later failed.",
      "reading": "pp_wagner"
    },
    "dispatch": {
      "name": "The Dispatcher",
      "role": "Gas-control dispatcher",
      "face": "🖥️",
      "badge": "D",
      "legend": "the control center",
      "hint": "The pressure trace shows a growing leak and then rupture, not a preceding surge spike.",
      "reading": "pp_joukowsky"
    },
    "clerk": {
      "name": "The Integrity Records Clerk",
      "role": "Inspection records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the integrity office",
      "hint": "The inline inspection was cancelled after a budget decision and never restored to the schedule.",
      "reading": "pp_firestone"
    }
  },
  "TOPICS": {
    "pp_wagner": {
      "sci": "Carl Wagner (1901-1977)",
      "topic": "Oxidation & corrosion theory",
      "lede": "Carl Wagner explained corrosion as coupled movement of ions and electrons through growing films, turning rust into a transport process with a history.",
      "no": 1,
      "profile": "Carl Wagner was a German physical chemist whose theories reshaped the study of oxidation, solid-state reactions, and electrochemistry. Rather than treating an oxide scale as inert debris, he analyzed how charged species move through it. Metal ions, oxygen ions, electrons, and defects can migrate across a film, allowing oxidation to continue even after the fresh metal is no longer directly exposed to air. His work helped explain why many oxide layers grow with parabolic kinetics: as the film thickens, transport becomes slower, so growth continues but at a declining rate.\n\nPipeline corrosion is not identical to high-temperature oxidation, yet Wagner’s transport logic remains useful. Corrosion requires an electrochemical circuit: anodic regions dissolve metal, cathodic reactions consume electrons, and an electrolyte carries ionic current. Coatings and cathodic protection are intended to interrupt that circuit. A coating holiday, trapped moisture, disbondment, soil chemistry, or inadequate protection can localize attack. The outside surface may develop deep pits while most of the circumference looks sound.\n\nThat localization matters for evidence. A third-party strike tends to leave deformation, gouging, metal displacement, or fresh mechanical marks. Corrosion leaves wall-thickness loss, scale, rounded pits, and a history that can be compared with coating surveys and protection readings. Ground movement may bend or buckle a line, producing a different fracture geometry.\n\nAt Brant Hollow, patrol reports described wet, bubbling soil and damaged coating before the rupture. The fracture edge emerged from a deeply thinned region rather than a new dent. Wagner’s lesson is to reconstruct the electrochemical path and the time needed to remove metal. A pipe can fail suddenly after degrading slowly; the loud moment does not require a violent external cause.",
      "frame": "Places a section of pitted pipe beside an untouched coating coupon. “The break happened tonight. The missing steel did not. Tell me what process can remove a wall one electrochemical step at a time.”",
      "q": [
        {
          "q": "What is central to Wagner’s view of oxide growth?",
          "o": [
            {
              "t": "Ions and electrons move through a film, allowing reaction to continue beneath it.",
              "v": "expert",
              "fb": "Transport through the scale explains how oxidation can progress without bare metal remaining exposed."
            },
            {
              "t": "Rust forms mainly where a fresh mechanical strike exposes bright metal to air.",
              "v": "wrong",
              "fb": "Mechanical damage can initiate corrosion, but electrochemical transport can continue without a new strike."
            },
            {
              "t": "An oxide layer grows at one fixed rate regardless of thickness or environment.",
              "v": "partial",
              "fb": "Growth often slows as transport distance increases and conditions change."
            },
            {
              "t": "A skilled saboteur can imitate any corrosion pattern by applying acid after failure.",
              "v": "danger",
              "fb": "Speculation cannot replace pit geometry, scale history, and pre-event survey evidence."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "The rupture originated in rounded, scaled wall loss beneath damaged coating, not a fresh gouge or deformation expected from an external strike."
          }
        },
        {
          "q": "Why can localized pitting be dangerous even when most pipe looks sound?",
          "o": [
            {
              "t": "A deep pit can leave too little wall to contain normal internal pressure.",
              "v": "expert",
              "fb": "Pressure capacity depends on the minimum remaining wall, not the average appearance of the pipe."
            },
            {
              "t": "Pits matter after they cover more than half the pipe circumference.",
              "v": "wrong",
              "fb": "A single severe local flaw can govern failure before broad corrosion develops."
            },
            {
              "t": "Any visible rust means the pipeline is already leaking at that spot.",
              "v": "partial",
              "fb": "Rust warrants assessment, but leakage depends on remaining wall and crack formation."
            },
            {
              "t": "Localized corrosion indicates a chemical attacker chose the rupture point.",
              "v": "danger",
              "fb": "Electrochemical cells naturally localize attack without deliberate targeting."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "Patrol escalations and coating-survey anomalies were forwarded to the integrity program, placing the unaddressed condition under the operator who controlled inspection priorities."
          }
        },
        {
          "q": "Which location contains the strongest evidence of a long corrosion decision chain?",
          "o": [
            {
              "t": "The integrity file joining patrol reports, coating data, and inspection scheduling.",
              "v": "expert",
              "fb": "The rupture site shows damage, but the office record shows how warnings were handled over time."
            },
            {
              "t": "The dispatch console displaying pressure at the instant the rupture alarm arrived.",
              "v": "partial",
              "fb": "Control data captures the event sequence but not the earlier decision to postpone inspection."
            },
            {
              "t": "The nearest excavation where residents saw flames after the line opened.",
              "v": "wrong",
              "fb": "The visible emergency scene cannot preserve the preceding maintenance choices."
            },
            {
              "t": "A contractor yard containing equipment capable of striking buried pipe.",
              "v": "danger",
              "fb": "Capability elsewhere is not evidence that equipment contacted this line."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The right-of-way preserves the corrosion morphology; the integrity office preserves the warnings, scheduling choices, and accountability."
          }
        }
      ]
    },
    "pp_joukowsky": {
      "sci": "Nikolai Joukowsky (1847-1921)",
      "topic": "Water hammer & pressure surge",
      "lede": "Nikolai Joukowsky measured how a rapid change in flow launches a pressure wave through a pipe, giving investigators a signature for sudden hydraulic events.",
      "no": 2,
      "profile": "Nikolai Joukowsky, also transliterated Zhukovsky, was a Russian scientist whose work helped found modern aerodynamics and fluid mechanics. He studied the transient pressure waves produced when flowing liquid is stopped or redirected rapidly. The Joukowsky equation relates the pressure change to fluid density, wave speed, and the change in velocity. A fast valve closure can therefore create a sharp surge—water hammer—that travels through a pipeline and reflects from boundaries.\n\nGas pipelines are compressible systems and require models more elaborate than the classic liquid equation, but the investigative idea carries over. Sudden changes leave transient signatures. A control action, compressor trip, or rapid isolation produces a pressure wave with timing that can be followed across sensors. By contrast, a small leak may first cause a gradual imbalance between inlet and outlet flow, followed by a larger pressure collapse when the remaining wall tears open.\n\nA dispatcher’s screen can be misleading if viewed only at the moment of alarm. Historians reconstruct synchronized data from several stations, checking sensor clocks, valve positions, flow rates, and pressure derivatives. They also ask whether the transient occurred before the rupture and could have caused it, or after the rupture as a consequence. Sequence is more probative than peak magnitude alone.\n\nAt Brant Hollow, the trace showed no initiating surge. Flow imbalance grew, downstream pressure softened, and only then did pressure collapse and automatic isolation begin. That order weighs against a dispatcher-created hydraulic shock and against an instantaneous ground break in an otherwise sound line. Joukowsky’s contribution is a clock: if a pressure wave caused the failure, it must arrive before the pipe opens.",
      "frame": "Freezes the SCADA replay three minutes before rupture. “A pressure wave cannot cause an opening that appears earlier in the data. Put the events in causal order.”",
      "q": [
        {
          "q": "What does the classic Joukowsky relation connect?",
          "o": [
            {
              "t": "Pressure change to fluid density, wave speed, and change in velocity.",
              "v": "expert",
              "fb": "The relation quantifies the surge generated by a rapid flow change in a pipe."
            },
            {
              "t": "Corrosion depth to soil resistivity, coating age, and cathodic current.",
              "v": "partial",
              "fb": "Those variables belong to integrity assessment rather than transient hydraulics."
            },
            {
              "t": "Explosion force to pipe diameter, burial depth, and ignition temperature.",
              "v": "wrong",
              "fb": "Combustion effects are separate from the pressure-wave relation."
            },
            {
              "t": "Sabotage probability to the number of valves an intruder could reach.",
              "v": "danger",
              "fb": "Joukowsky’s equation diagnoses hydraulic transients, not malicious access."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "The first anomaly was a growing flow imbalance, followed later by collapse and valve action; the trace lacks a causal surge before the leak began."
          }
        },
        {
          "q": "Why must investigators compare event timing rather than only peak pressure?",
          "o": [
            {
              "t": "A surge can cause failure only if the pressure wave precedes the opening.",
              "v": "expert",
              "fb": "A peak recorded after rupture may be a consequence or reflection rather than the initiating cause."
            },
            {
              "t": "The largest pressure value identifies which employee made the mistake.",
              "v": "wrong",
              "fb": "Magnitude does not assign authority or even establish causal order."
            },
            {
              "t": "Any pressure oscillation indicates the dispatcher closed a valve too quickly.",
              "v": "danger",
              "fb": "Ruptures and automatic responses also generate transients; valve action must be timed."
            },
            {
              "t": "Timing matters mainly when sensors at each station use different units.",
              "v": "partial",
              "fb": "Clock alignment matters even with consistent units because causal ordering depends on seconds."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The control center reconstructs the rupture sequence, but the cancelled inspection that left the weak wall in service is not a dispatch decision."
          }
        },
        {
          "q": "Which data pattern best fits a leak progressing into rupture?",
          "o": [
            {
              "t": "Flow imbalance develops first, pressure eases, then a sharp collapse triggers isolation.",
              "v": "expert",
              "fb": "That sequence is consistent with an opening that grows before the final break."
            },
            {
              "t": "A large pressure spike arrives first, followed immediately by wall failure.",
              "v": "partial",
              "fb": "That pattern would support a surge hypothesis, but it is not the observed order here."
            },
            {
              "t": "All stations remain perfectly steady until flames are reported by residents.",
              "v": "wrong",
              "fb": "A major gas release should produce measurable hydraulic changes before external reports."
            },
            {
              "t": "The dispatcher’s login changes shortly before the rupture and therefore caused it.",
              "v": "danger",
              "fb": "A login event is not a hydraulic mechanism without corresponding control actions and pressure effects."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The dispatcher responded to the pressure loss; the unresolved wall-risk and inspection cancellation remained under the integrity operator’s authority."
          }
        }
      ]
    },
    "pp_firestone": {
      "sci": "Floyd Firestone (1898-1986)",
      "topic": "Ultrasonic flaw detection",
      "lede": "Floyd Firestone used reflected sound pulses to locate hidden cracks and voids, making internal damage visible without cutting a component apart.",
      "no": 3,
      "profile": "Floyd Alburn Firestone was an American physicist and engineer who developed an early practical pulse-echo method for ultrasonic nondestructive testing. In patents filed around 1940, he described sending short high-frequency sound pulses into a solid and receiving echoes from internal boundaries. A sound part produces an echo from its far surface. A crack, void, or inclusion reflects part of the pulse sooner. Measuring the travel time allows an inspector to estimate the flaw’s position.\n\nThe instrument became known as the supersonic reflectoscope. Its principle resembles sonar on a much smaller scale: transmit, listen, and convert time into distance using the material’s sound speed. Coupling between the probe and surface matters, as do calibration blocks, probe angle, component geometry, and interpretation. A weak or missed echo does not automatically mean no flaw; inspection coverage and procedure determine what could have been found.\n\nModern inline inspection tools use several technologies, including magnetic-flux leakage and ultrasonic methods, to estimate metal loss, cracks, and geometry while traveling through a pipeline. Their value is temporal. They can identify a flaw while the pipe still holds pressure, allowing repair or closer monitoring before the remaining wall reaches failure. Cancelling a run does not merely postpone data collection; it extends the interval during which an existing defect can grow unseen.\n\nAt Brant Hollow, the cancelled inline inspection covered the exact segment where patrol and coating data already indicated concern. The recovered pipe shows wall loss large enough that a validated tool should have flagged the region. Firestone’s lesson turns the missed inspection into a missed observation window. The decisive record is not who watched the rupture alarm, but who accepted continued operation without the examination designed to see inside the pipe.",
      "frame": "Sets an ultrasonic calibration block beside the cancelled inspection work order. “The flaw was hidden from the eye, not from the method. The question is why the method never reached this segment.”",
      "q": [
        {
          "q": "How does pulse-echo ultrasonic testing locate an internal flaw?",
          "o": [
            {
              "t": "It times an early reflected sound pulse from a boundary inside the material.",
              "v": "expert",
              "fb": "Travel time and sound speed place the reflector before the expected back-wall echo."
            },
            {
              "t": "It measures how quickly surface rust changes color under ultraviolet light.",
              "v": "wrong",
              "fb": "That may characterize surface conditions but cannot locate a hidden internal reflector."
            },
            {
              "t": "It raises pressure until the weakest wall section bursts during a controlled test.",
              "v": "danger",
              "fb": "Destructive proof defeats the purpose of nondestructive inspection and may create the failure."
            },
            {
              "t": "It compares the component’s total weight with its original manufacturing record.",
              "v": "partial",
              "fb": "Weight can reveal gross loss but lacks the location and resolution of ultrasonic echoes."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "The recovered wall-loss dimensions fall inside the detection capability of the planned inline inspection, showing a preventable missed observation rather than unknowable ground failure."
          }
        },
        {
          "q": "Why is inspection coverage part of interpreting a “clean” result?",
          "o": [
            {
              "t": "A tool excludes just the flaws its route, sensors, and procedure could examine.",
              "v": "expert",
              "fb": "Detection claims depend on validated capability and complete coverage of the relevant region."
            },
            {
              "t": "Any completed tool run assures the line has no defect anywhere in the pipeline.",
              "v": "danger",
              "fb": "No inspection method has unlimited sensitivity or coverage."
            },
            {
              "t": "Coverage matters after a pipe has already ruptured and been excavated.",
              "v": "wrong",
              "fb": "Coverage is essential before failure because it defines what the inspection could detect."
            },
            {
              "t": "A missed segment can be assumed identical to the nearest inspected segment.",
              "v": "partial",
              "fb": "Neighboring data may inform risk, but it cannot substitute for examining the uninspected location."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The planned tool, anomaly rules, cancellation, and rescheduling failure all converge in the operator’s integrity office rather than at the control console."
          }
        },
        {
          "q": "Which record most directly identifies responsibility for the missed detection window?",
          "o": [
            {
              "t": "The signed cancellation that removed the segment from the inline-inspection schedule.",
              "v": "expert",
              "fb": "The cancellation shows who accepted continued operation without the planned internal examination."
            },
            {
              "t": "The dispatcher log showing rapid valve closure after the rupture alarm.",
              "v": "partial",
              "fb": "That log evaluates emergency response, not the earlier loss of inspection coverage."
            },
            {
              "t": "The regulator’s later citation for failing to meet an integrity requirement.",
              "v": "wrong",
              "fb": "The citation confirms noncompliance but may not identify the original internal decision-maker."
            },
            {
              "t": "A rumor that excavation equipment had worked somewhere nearby months earlier.",
              "v": "danger",
              "fb": "Unverified proximity cannot outweigh morphology, hydraulic order, and the cancelled inspection record."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The operator who cancelled the run, accepted the patrol anomaly without substitute examination, and left the segment live owned the missed inspection."
          }
        }
      ]
    }
  },
  "story": [
    "<b>The Brant Hollow line failed at one point, but the missing wall had developed over time.</b> The emergency trace begins only after the pipe had already started to open.",
    "Line-Walker Dumas has the coating and soil observations. The Dispatcher has the synchronized pressure sequence. The Integrity Records Clerk has the cancelled inspection and anomaly file.",
    "External damage offers a single violent cause. Sudden ground movement offers an unavoidable one. The fracture surface, hydraulic clock, and inspection history decide whether either fits.",
    "Nine possible clues connect electrochemical wall loss to a missed detection window and the authority that accepted continued service."
  ],
  "endings": {
    "overclaimWhat": "attack",
    "dismissalWhat": "freak",
    "win": {
      "expertTitle": "The Missed Wall-Loss Window",
      "expert": [
        "You join localized corrosion morphology, a leak-before-collapse pressure sequence, and a cancelled inline inspection in the operator’s integrity office under Hollis Trask.",
        "The rupture was sudden, but the defect was progressive and detectable. Neither a fresh external strike nor an unforeseeable ground movement explains the pre-event condition and scheduling record."
      ],
      "soundTitle": "The Integrity Chain",
      "sound": [
        "Your accusation identifies the integrity operator, the office, and the progressive wall loss missed after inspection cancellation.",
        "Some details of corrosion growth or dispatch timing remain incomplete, but the core causal order is secure."
      ],
      "namedTitle": "Correct Segment, Thin File",
      "named": [
        "You name the right person, place, and mechanism.",
        "The conclusion holds, though missed clues leave the morphology, transient sequence, or inspection capability less fully demonstrated."
      ]
    },
    "overclaim": {
      "title": "No Fresh Strike in the Steel",
      "body": [
        "The fracture began in scaled, rounded wall loss without the deformation or fresh gouging expected from external damage.",
        "The attack theory also fails to explain patrol warnings and the cancelled internal inspection of the same segment."
      ]
    },
    "dismissal": {
      "title": "The Ground Did Not Erase the Inspection Window",
      "body": [
        "The hydraulic sequence begins with a leak, and the recovered pipe shows progressive metal loss rather than an otherwise sound line split by one movement.",
        "Calling the rupture unavoidable discards a defect that the scheduled tool was designed to detect."
      ]
    },
    "wrongNames": {
      "title": "The Failure, Filed Elsewhere",
      "body": [
        "You identify the corrosion and missed inspection but assign responsibility or culmination away from the integrity office that controlled the anomaly and the cancelled run."
      ]
    }
  }
}
};
