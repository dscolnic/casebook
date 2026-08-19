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
  "teaser": "A gas pipeline ruptures beneath a residential block. Did a contractor strike the line, did corrosion escape the integrity program, or did the ground itself split an otherwise sound pipe?",
  "overclaimTag": "external excavation damage at the rupture site",
  "truthTag": "a third-party excavator struck a sound pipeline",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A buried gas pipeline with localized wall loss and a rupture\"><path d=\"M40 70 H620\" stroke=\"#121212\" stroke-width=\"12\" stroke-linecap=\"round\"/><path d=\"M40 70 H620\" stroke=\"#e2e2d8\" stroke-width=\"4\"/><path d=\"M350 52 l-12 18 12 18 12-18z\" fill=\"#B3261E\"/><path d=\"M330 42 q20 -18 40 0 M324 98 q26 18 52 0\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/><path d=\"M80 25 v25 M160 25 v25 M500 25 v25 M580 25 v25\" stroke=\"#121212\" stroke-width=\"2\"/></svg>",
  "overclaimTease": "The vivid external-damage theory is not automatically an overreaction. Let wall morphology, pressure timing, prior inspection coverage, and excavation records decide whether the dramatic answer is the correct one.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "excavator",
      "items": [
        {
          "id": "controller",
          "label": "The gas-control dispatcher"
        },
        {
          "id": "excavator",
          "label": "Morrow Excavation — the third-party contractor"
        },
        {
          "id": "operator",
          "label": "Hollis Trask — pipeline integrity operator"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "rightofway",
      "items": [
        {
          "id": "control",
          "label": "The Gas Control Center"
        },
        {
          "id": "office",
          "label": "The Operator’s Integrity Office"
        },
        {
          "id": "rightofway",
          "label": "The Right-of-Way & Excavation Site"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "thirdparty",
      "items": [
        {
          "id": "thirdparty",
          "label": "Third-party excavation damage opened the pipeline wall"
        },
        {
          "id": "corrosion",
          "label": "Progressive wall loss passed a cancelled inspection window"
        },
        {
          "id": "freak",
          "label": "Sudden ground movement split an otherwise sound pipeline"
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
      "hint": "The excavated pipe carries a fresh tooth gouge and local dent without old scale at the opening.",
      "reading": "pp_wagner"
    },
    "dispatch": {
      "name": "The Dispatcher",
      "role": "Gas-control dispatcher",
      "face": "🖥️",
      "badge": "D",
      "legend": "the control center",
      "hint": "The pressure trace shows an abrupt opening first and system response afterward, not a leak growing from internal weakness.",
      "reading": "pp_joukowsky"
    },
    "clerk": {
      "name": "The Right-of-Way Records Clerk",
      "role": "Excavation and integrity records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the permit desk",
      "hint": "Locate tickets, equipment GPS, and supervisor messages place one contractor over the line after marks were visible.",
      "reading": "pp_firestone"
    }
  },
  "TOPICS": {
    "pp_wagner": {
      "sci": "Carl Wagner (1901-1977)",
      "topic": "Oxidation & corrosion theory",
      "lede": "Carl Wagner explained corrosion as coupled movement of ions and electrons through growing films, turning rust into a transport process with a history.",
      "no": 1,
      "profile": "Carl Wagner was a German physical chemist whose theories reshaped the study of oxidation, solid-state reactions, and electrochemistry. Rather than treating an oxide scale as inert debris, he analyzed how charged species move through it. Metal ions, oxygen ions, electrons, and defects can migrate across a film, allowing oxidation to continue even after the fresh metal is no longer directly exposed to air. His work helped explain why many oxide layers grow with parabolic kinetics: as the film thickens, transport becomes slower, so growth continues but at a declining rate.\n\nPipeline corrosion is not identical to high-temperature oxidation, yet Wagner’s transport logic remains useful. Corrosion requires an electrochemical circuit: anodic regions dissolve metal, cathodic reactions consume electrons, and an electrolyte carries ionic current. Coatings and cathodic protection are intended to interrupt that circuit. A coating holiday, trapped moisture, disbondment, soil chemistry, or inadequate protection can localize attack. The outside surface may develop deep pits while most of the circumference looks sound.\n\nThat localization matters for evidence. A third-party strike tends to leave deformation, gouging, metal displacement, or fresh mechanical marks. Corrosion leaves wall-thickness loss, scale, rounded pits, and a history that can be compared with coating surveys and protection readings. Ground movement may bend or buckle a line, producing a different fracture geometry.\n\nWagner’s corrosion theory gives investigators a morphology to seek: scale, rounded pits, coating disbondment, and wall loss with electrochemical history. Brant Hollow shows something else at the opening—a fresh linear gouge, displaced metal, tooth spacing, and a dent matching excavation equipment. Nearby pipe retains adequate wall thickness and protective coating. Corrosion remains a plausible institutional story in many ruptures, but its expected material record is absent at this origin.",
      "frame": "Sets a fresh tooth-gouged pipe section beside a scaled corrosion coupon. “Both remove metal, but only one bends and transfers it in an instant. Tell me which surface you see.”",
      "q": [
        {
          "q": "What is central to Wagner’s view of oxide growth?",
          "o": [
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
            },
            {
              "t": "Ions and electrons move through a film, allowing reaction to continue beneath it.",
              "v": "expert",
              "fb": "Transport through the scale explains how oxidation can progress without bare metal remaining exposed."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — lead",
            "text": "The opening has a sharp fresh tooth gouge rather than scaled pits or broad wall thinning."
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
            "label": "WHO — lead",
            "text": "The gouge spacing matches equipment assigned to one third-party contractor working inside the marked corridor."
          }
        },
        {
          "q": "Which pipe feature most favors fresh excavation damage over corrosion?",
          "o": [
            {
              "t": "Rounded pits beneath scale and a broad region of reduced wall thickness.",
              "v": "partial",
              "fb": "Pits and scale would instead indicate an electrochemical history."
            },
            {
              "t": "A coating holiday beside wet soil and low cathodic-protection readings.",
              "v": "wrong",
              "fb": "Those conditions support corrosion risk rather than a new strike."
            },
            {
              "t": "A sharp tooth gouge with displaced bright metal and matching local dent.",
              "v": "expert",
              "fb": "Fresh deformation and tooth geometry are direct mechanical-contact signatures."
            },
            {
              "t": "Uniform thinning around the pipe circumference over a long distance.",
              "v": "danger",
              "fb": "Long uniform loss does not match a localized excavator contact."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — lead",
            "text": "Fresh deformation, displaced metal, and equipment tracks begin at the active excavation cut on the right-of-way."
          }
        }
      ]
    },
    "pp_joukowsky": {
      "sci": "Nikolai Joukowsky (1847-1921)",
      "topic": "Water hammer & pressure surge",
      "lede": "Nikolai Joukowsky measured how a rapid change in flow launches a pressure wave through a pipe, giving investigators a signature for sudden hydraulic events.",
      "no": 2,
      "profile": "Nikolai Joukowsky, also transliterated Zhukovsky, was a Russian scientist whose work helped found modern aerodynamics and fluid mechanics. He studied the transient pressure waves produced when flowing liquid is stopped or redirected rapidly. The Joukowsky equation relates the pressure change to fluid density, wave speed, and the change in velocity. A fast valve closure can therefore create a sharp surge—water hammer—that travels through a pipeline and reflects from boundaries.\n\nGas pipelines are compressible systems and require models more elaborate than the classic liquid equation, but the investigative idea carries over. Sudden changes leave transient signatures. A control action, compressor trip, or rapid isolation produces a pressure wave with timing that can be followed across sensors. By contrast, a small leak may first cause a gradual imbalance between inlet and outlet flow, followed by a larger pressure collapse when the remaining wall tears open.\n\nA dispatcher’s screen can be misleading if viewed only at the moment of alarm. Historians reconstruct synchronized data from several stations, checking sensor clocks, valve positions, flow rates, and pressure derivatives. They also ask whether the transient occurred before the rupture and could have caused it, or after the rupture as a consequence. Sequence is more probative than peak magnitude alone.\n\nJoukowsky’s timing separates cause from response. At Brant Hollow, a sharp flow imbalance and pressure collapse begin at the moment excavation telemetry places the machine over the line; valve movement and later oscillations follow. There is no preceding pressure surge capable of opening the wall and no gradual leak signature. The control center records the hydraulic consequence, while the right-of-way supplies the initiating contact.",
      "frame": "Freezes the SCADA replay at the first abrupt imbalance. “The opening must come before the system response if a machine struck the line. Put every signal in order.”",
      "q": [
        {
          "q": "What does the classic Joukowsky relation connect?",
          "o": [
            {
              "t": "Corrosion depth to soil resistivity, coating age, and cathodic current.",
              "v": "partial",
              "fb": "Those variables belong to integrity assessment rather than transient hydraulics."
            },
            {
              "t": "Pressure change to fluid density, wave speed, and change in velocity.",
              "v": "expert",
              "fb": "The relation quantifies the surge generated by a rapid flow change in a pipe."
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
            "label": "WHAT — corroboration",
            "text": "Pressure containment fails abruptly before valve action, with no prior leak trend or initiating surge."
          }
        },
        {
          "q": "Why must investigators compare event timing rather than only peak pressure?",
          "o": [
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
            },
            {
              "t": "A surge can cause failure only if the pressure wave precedes the opening.",
              "v": "expert",
              "fb": "A peak recorded after rupture may be a consequence or reflection rather than the initiating cause."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — corroboration",
            "text": "The control trace locates the opening to the same segment where the contractor’s machine stopped and reversed."
          }
        },
        {
          "q": "Which pressure sequence best fits a machine opening the pipe?",
          "o": [
            {
              "t": "An abrupt local flow imbalance and collapse, with valve response afterward.",
              "v": "expert",
              "fb": "The sudden opening must precede the protective system’s hydraulic response."
            },
            {
              "t": "A long slow leak trend that accelerates over several monitoring periods.",
              "v": "partial",
              "fb": "A long trend would better fit progressive wall deterioration."
            },
            {
              "t": "A large pressure wave arriving before any loss of line containment.",
              "v": "wrong",
              "fb": "A preceding wave would make surge the initiating mechanism."
            },
            {
              "t": "Stable measurements until ground movement bends several stations at once.",
              "v": "danger",
              "fb": "Broad simultaneous bending would support ground movement rather than contact."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — corroboration",
            "text": "Machine GPS and a one-call ticket place that contractor directly over the pipeline when containment is first lost."
          }
        }
      ]
    },
    "pp_firestone": {
      "sci": "Floyd Firestone (1898-1986)",
      "topic": "Ultrasonic flaw detection",
      "lede": "Floyd Firestone used reflected sound pulses to locate hidden cracks and voids, making internal damage visible without cutting a component apart.",
      "no": 3,
      "profile": "Floyd Alburn Firestone was an American physicist and engineer who developed an early practical pulse-echo method for ultrasonic nondestructive testing. In patents filed around 1940, he described sending short high-frequency sound pulses into a solid and receiving echoes from internal boundaries. A sound part produces an echo from its far surface. A crack, void, or inclusion reflects part of the pulse sooner. Measuring the travel time allows an inspector to estimate the flaw’s position.\n\nThe instrument became known as the supersonic reflectoscope. Its principle resembles sonar on a much smaller scale: transmit, listen, and convert time into distance using the material’s sound speed. Coupling between the probe and surface matters, as do calibration blocks, probe angle, component geometry, and interpretation. A weak or missed echo does not automatically mean no flaw; inspection coverage and procedure determine what could have been found.\n\nModern inline inspection tools use several technologies, including magnetic-flux leakage and ultrasonic methods, to estimate metal loss, cracks, and geometry while traveling through a pipeline. Their value is temporal. They can identify a flaw while the pipe still holds pressure, allowing repair or closer monitoring before the remaining wall reaches failure. Cancelling a run does not merely postpone data collection; it extends the interval during which an existing defect can grow unseen.\n\nFirestone’s inspection logic can also clear a system when coverage is complete. The latest inline run examined the eventual site, reported adequate wall, and its raw data remain consistent with the recovered segment. The new gouge was created after that examination. Locate markings, permit boundaries, equipment GPS, and supervisor messages then identify a third-party contractor that continued digging across the marked corridor. Here the external strike is not a convenient rumor; it is the only hypothesis that joins fresh metal, timing, and access.",
      "frame": "Overlays a complete prior inspection pass with equipment GPS and locate marks. “A clean covered segment can still be damaged tomorrow. Separate missed detection from new contact.”",
      "q": [
        {
          "q": "How does pulse-echo ultrasonic testing locate an internal flaw?",
          "o": [
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
              "t": "It times an early reflected sound pulse from a boundary inside the material.",
              "v": "expert",
              "fb": "Travel time and sound speed place the reflector before the expected back-wall echo."
            },
            {
              "t": "It compares the component’s total weight with its original manufacturing record.",
              "v": "partial",
              "fb": "Weight can reveal gross loss but lacks the location and resolution of ultrasonic echoes."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — decisive",
            "text": "A fully covered earlier inspection found adequate wall; the new mechanical contact occurred afterward and opened the line."
          }
        },
        {
          "q": "Why is inspection coverage part of interpreting a “clean” result?",
          "o": [
            {
              "t": "Any completed tool run assures the line has no defect anywhere in the pipeline.",
              "v": "danger",
              "fb": "No inspection method has unlimited sensitivity or coverage."
            },
            {
              "t": "A tool excludes just the flaws its route, sensors, and procedure could examine.",
              "v": "expert",
              "fb": "Detection claims depend on validated capability and complete coverage of the relevant region."
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
            "label": "WHERE — decisive",
            "text": "Locate marks, machine position, gouge geometry, and rupture origin converge at the Right-of-Way & Excavation Site."
          }
        },
        {
          "q": "Which joined record most directly identifies the outside actor?",
          "o": [
            {
              "t": "The operator’s inspection schedule and cathodic-protection review history.",
              "v": "partial",
              "fb": "Integrity records test corrosion but do not identify the fresh contact."
            },
            {
              "t": "The dispatcher’s valve commands after the first rupture alarm arrived.",
              "v": "wrong",
              "fb": "Response commands follow the opening and do not create the gouge."
            },
            {
              "t": "The regulator’s later enforcement notice issued after the neighborhood fire.",
              "v": "danger",
              "fb": "Post-event enforcement documents consequences rather than the initiating actor."
            },
            {
              "t": "Locate marks, equipment GPS, gouge geometry, and the supervisor’s dig order.",
              "v": "expert",
              "fb": "Access, machine position, physical match, and instruction converge on the contractor."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — decisive",
            "text": "A supervisor message orders digging to continue across visible locate marks, and the same crew’s bucket carries matching metal transfer."
          }
        }
      ]
    }
  },
  "story": [
    "<b>Brant Hollow’s rupture looked like the end of a long integrity failure—and like the result of one excavator’s mistake.</b>",
    "Line-Walker Dumas can read the recovered wall. The Dispatcher holds the millisecond pressure sequence. The Right-of-Way Records Clerk can join permits, locate marks, and equipment movement.",
    "Corrosion, ground movement, and fresh third-party damage each leave different metal and timing.",
    "The nine clues must determine whether the external-strike theory is a convenient accusation or the event the evidence actually records."
  ],
  "endings": {
    "overclaimWhat": "corrosion",
    "dismissalWhat": "freak",
    "win": {
      "expertTitle": "The Bucket Tooth at Brant Hollow",
      "expert": [
        "You connect Morrow Excavation, the Right-of-Way & Excavation Site, and a third-party strike that opened a sound pipeline. Fresh gouging, machine GPS, locate marks, and pressure timing form one sequence.",
        "The corrosion theory is the tempting systemic allegation, but prior coverage and recovered wall reject it. Ground movement cannot reproduce the tooth geometry or contractor access trail."
      ],
      "soundTitle": "The Excavation Strike",
      "sound": [
        "Your accusation identifies the contractor, the right-of-way, and fresh mechanical damage.",
        "Some equipment or inspection details remain incomplete, but the joined physical and timing evidence supports the verdict."
      ],
      "namedTitle": "Right Strike, Thin Access Record",
      "named": [
        "You choose the correct actor, location, and mechanism.",
        "The conclusion is right, though missed clues leave portions of the GPS, locate, or morphology chain incomplete."
      ]
    },
    "overclaim": {
      "title": "The Systemic Corrosion Story Was Wrong Here",
      "body": [
        "The prior inline examination covered the site, and the recovered wall outside the gouge retains adequate thickness.",
        "A familiar management-failure pattern should not override fresh mechanical evidence."
      ]
    },
    "dismissal": {
      "title": "The Ground Did Not Shape a Bucket Tooth",
      "body": [
        "Localized denting, metal transfer, and machine tracking cannot be explained by a broad natural ground shift.",
        "The rupture was sudden but directly traceable to human excavation."
      ]
    },
    "wrongNames": {
      "title": "The Strike, Assigned Elsewhere",
      "body": [
        "You recognize external damage but misidentify the contractor or move the initiating contact away from the active excavation site."
      ]
    }
  }
}
};
