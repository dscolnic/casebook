// Casebook V3 — three informants, three readings, one clue per correct answer.
module.exports = { PACK: {
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "m_railx",
  "title": "The Marsh Lane Crossing",
  "discipline": "Railway Signalling & Interlocking",
  "venue": "the Marsh Lane crossing inquiry",
  "agent": {
    "name": "Investigator Glen Ashby",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Railway-Signalling Pioneers",
  "dossierName": "RAILWAY-SIGNALLING PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Marsh Lane crossing inquiry",
  "DAYS_TOTAL": 3,
  "teaser": "An express struck a stopped train at a level crossing while the home signal displayed green. Was the line obstructed, did the driver pass a stop aspect, or did the signalling logic receive a false clear from inside its own maintenance chain?",
  "overclaimTag": "sabotage on the railway",
  "truthTag": "a maintenance bypass that produced a false clear",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A level crossing, occupied track circuit, and cleared signal\"><path d=\"M30 96 H630\" stroke=\"#121212\" stroke-width=\"5\"/><path d=\"M30 110 H630\" stroke=\"#121212\" stroke-width=\"5\"/><path d=\"M115 82 v42 M145 82 v42 M175 82 v42 M205 82 v42 M455 82 v42 M485 82 v42 M515 82 v42 M545 82 v42\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><rect x=\"280\" y=\"75\" width=\"105\" height=\"41\" rx=\"5\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/><circle cx=\"560\" cy=\"45\" r=\"18\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><circle cx=\"560\" cy=\"45\" r=\"7\" fill=\"#B3261E\"/><path d=\"M250 34 h75 v28 h-75z M335 34 h75 v28 h-75z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M325 48 h10\" stroke=\"#B3261E\" stroke-width=\"4\"/></svg>",
  "overclaimTease": "A green aspect is an output, not an explanation. Trace the occupied state from the rails through every relay that converted evidence into permission.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "rx_infra",
      "items": [
        {
          "id": "rx_infra",
          "label": "Mara Doss — the signalling maintenance technician"
        },
        {
          "id": "rx_driver",
          "label": "The express driver"
        },
        {
          "id": "rx_regulator",
          "label": "The rail-safety inspector"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "rx_signalbox",
      "items": [
        {
          "id": "rx_crossing",
          "label": "The Crossing & Track Circuit"
        },
        {
          "id": "rx_signalbox",
          "label": "The Signal-Box Relay & Event Recorder"
        },
        {
          "id": "rx_office",
          "label": "The Infrastructure Head Office"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "rx_interlock",
      "items": [
        {
          "id": "rx_sabotage",
          "label": "An object or explosive device obstructed the railway"
        },
        {
          "id": "rx_driver",
          "label": "The express driver passed a correctly displayed stop signal"
        },
        {
          "id": "rx_interlock",
          "label": "A maintenance bypass falsely cleared an occupied crossing"
        }
      ]
    }
  },
  "READING_ORDER": [
    "rx_technician",
    "rx_signaller",
    "rx_clerk"
  ],
  "CHARACTERS": {
    "rx_technician": {
      "name": "S&T Tech Mara Doss",
      "role": "Signal and telegraph technician",
      "face": "🔧",
      "badge": "M",
      "legend": "the relay cabinet",
      "hint": "A temporary strap held the occupied input in its clear state after the maintenance window.",
      "reading": "rx_sykes"
    },
    "rx_signaller": {
      "name": "The Signaller",
      "role": "Signalling-centre operator",
      "face": "🚦",
      "badge": "S",
      "legend": "the control panel",
      "hint": "The panel showed a valid green route even while field equipment reported a train on the crossing.",
      "reading": "rx_robinson"
    },
    "rx_clerk": {
      "name": "The Infrastructure Records Clerk",
      "role": "Maintenance and event-records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the event archive",
      "hint": "Cabinet access, work-order closeout, and signal transitions all point to one unfinished intervention.",
      "reading": "rx_hall"
    }
  },
  "TOPICS": {
    "rx_sykes": {
      "sci": "William Robert Sykes (1840-1917)",
      "topic": "Lock-and-block interlocking",
      "lede": "William Robert Sykes made a signal refuse to clear unless the track and the route agreed that movement was safe.",
      "no": 1,
      "profile": "William Robert Sykes was a British railway signal engineer who helped turn the late Victorian signal box from a place of disciplined judgment into a machine that physically constrained unsafe choices. Early railways relied on telegraph messages, timetables, and the vigilance of signallers. Those practices improved safety, but a tired or hurried operator could still accept a train into an occupied block or set conflicting routes. Sykes developed lock-and-block equipment that linked the block instruments, signals, and route controls so the railway itself enforced the sequence.\n\nThe key idea is interlocking. A signal lever cannot be moved to clear unless points are correctly set, conflicting signals remain at danger, and the next block is available. Once a train is accepted, the mechanism locks out incompatible movements until the train has passed and the track condition resets. The protection is not a warning that an operator may ignore; it is a constraint built into the control path. Later electrical and electronic systems changed the hardware, but retained the same principle: unsafe combinations should be impossible by design.\n\nInterlocks sometimes need maintenance, and railways provide controlled procedures for failures. A temporary release may be used under written authority, with reduced speed, direct confirmation, and prominent records. A hidden jumper is different. It substitutes a permanent clear condition for the evidence the interlock was designed to demand.\n\nAt Marsh Lane, the question is not whether the express driver saw a green aspect; the recorder shows that he did. Sykes directs attention behind the aspect. If an occupied crossing could coexist with a cleared route only because a relay input had been strapped, the final signal was truthful about the circuit it received but false about the railway outside. The person who installed that bridge converted a fail-safe system into a permissive one.",
      "frame": "Opens the relay cabinet and points to a short copper strap across two terminals. “Sykes built locks so one unsafe condition could not simply be wished away. Tell me what this wire defeated.”",
      "q": [
        {
          "q": "What distinguishes an interlock from an ordinary warning?",
          "o": [
            {
              "t": "It physically prevents conflicting movements until required conditions are met.",
              "v": "expert",
              "fb": "An interlock constrains the control sequence instead of merely advising the operator."
            },
            {
              "t": "It displays several warnings so an operator can compare them before authorizing movement.",
              "v": "partial",
              "fb": "Warnings support judgment, but they do not make an unsafe lever movement impossible."
            },
            {
              "t": "It records train movements after the event but does not affect signal controls.",
              "v": "wrong",
              "fb": "Event recording preserves evidence; it is not the protective lock itself."
            },
            {
              "t": "It assumes a clear route whenever traffic pressure makes delay inconvenient to dispatchers.",
              "v": "danger",
              "fb": "Treating delay as proof of safety reverses the purpose of railway interlocking."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — lead",
            "text": "The route cleared because a temporary copper strap made the interlock read “safe” without proving the crossing was empty."
          }
        },
        {
          "q": "Under what condition may a failed interlock be temporarily released safely?",
          "o": [
            {
              "t": "Whenever a signaller verbally confirms that no train appears on the panel.",
              "v": "partial",
              "fb": "Panel observation alone may repeat the same failed indication and needs independent confirmation."
            },
            {
              "t": "Only under a controlled procedure with authority, alternate checks, and limits.",
              "v": "expert",
              "fb": "A sanctioned release replaces one barrier with documented compensating protections."
            },
            {
              "t": "After the first delayed service has passed through without an incident.",
              "v": "wrong",
              "fb": "A successful movement does not validate a bypass or prove the route was safe."
            },
            {
              "t": "Whenever the failed device is believed more troublesome than the traffic risk.",
              "v": "danger",
              "fb": "Operational inconvenience cannot substitute for a safety assessment and authority."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — lead",
            "text": "The bypass was fitted during a maintenance call by the technician assigned to the crossing relay, not by the driver or inspector."
          }
        },
        {
          "q": "What does Sykes’s principle imply when a green signal coexists with an occupied crossing?",
          "o": [
            {
              "t": "Investigators should begin by testing whether the driver reacted quickly enough.",
              "v": "partial",
              "fb": "Driver response matters, but it cannot explain why an unsafe route was authorized."
            },
            {
              "t": "Investigators should assume the signal lamp changed color after the collision.",
              "v": "wrong",
              "fb": "Lamp damage after impact cannot account for the recorded pre-collision command state."
            },
            {
              "t": "Investigators should trace which locked condition was falsely satisfied upstream.",
              "v": "expert",
              "fb": "A cleared aspect is the end of a logic chain; the false premise must be located inside it."
            },
            {
              "t": "Investigators should treat the green aspect as proof the crossing was empty.",
              "v": "danger",
              "fb": "Trusting the output without testing its inputs is exactly how a defeated interlock escapes notice."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — lead",
            "text": "The contradictory safe indication was generated inside the signal-box relay chain, where the occupied input had been bridged."
          }
        }
      ]
    },
    "rx_robinson": {
      "sci": "William Robinson (1840-1921)",
      "topic": "The closed track circuit",
      "lede": "William Robinson made a train announce its own presence by using its wheels and axles to complete an electrical circuit.",
      "no": 2,
      "profile": "William Robinson was an American inventor whose track circuit became one of railway signalling’s foundational safety devices. Before reliable train detection, a signalman learned that a block was clear through messages and observation. A forgotten wagon, a separated train, or poor visibility could defeat that human chain. Robinson patented practical electrical track circuits in the 1870s, using the rails as conductors and the train’s metal wheels and axles as the detecting element.\n\nIn a common arrangement, a relay is energized when the track is unoccupied. When a train enters, its wheelsets shunt current between the rails, causing the relay to drop and the signal system to display occupation. This “normally energized” design is fail-safe in an important sense: a broken wire, loss of power, or failed relay tends to mimic an occupied track and hold signals at danger. Safety comes from requiring healthy current for permission, not from requiring a special current to announce danger.\n\nTrack circuits are imperfect. Rust, contamination, insulated joints, wiring faults, or light vehicles can interfere with shunting. That is why technicians test relay currents, bonding, insulation, and correspondence between field occupation and panel indication. A bypass that holds the relay energized is especially serious because it changes a cautious failure into a false-clear condition.\n\nThe Marsh Lane event left a clean sequence. The stopped train’s axles occupied the crossing and the field circuit dropped as designed. Yet the control system continued to receive an energized input beyond a maintenance terminal. Robinson’s circuit therefore did not fail to see the train; its honest occupied state was intercepted. The distinction narrows both mechanism and location. A bomb on the line would not create a stable false-clear before impact, and a driver cannot alter a relay cabinet miles ahead. The evidence belongs in the signal chain between the rails and the panel.",
      "frame": "Clips a meter across the rails, then compares it with the relay-room trace. “The train shunted the track exactly as Robinson intended. Something farther along refused to listen.”",
      "q": [
        {
          "q": "Why are many track circuits designed with an energized relay for a clear track?",
          "o": [
            {
              "t": "The relay supplies traction current directly to locomotives inside the section.",
              "v": "wrong",
              "fb": "Track detection and traction power are separate railway systems."
            },
            {
              "t": "A clear state remains latched even when electrical evidence disappears unexpectedly.",
              "v": "danger",
              "fb": "Latching clear after evidence vanishes defeats the fail-safe direction of the design."
            },
            {
              "t": "The energized relay makes trains move faster through blocks with heavy traffic.",
              "v": "partial",
              "fb": "Traffic capacity is not the reason the detection relay is normally energized."
            },
            {
              "t": "Loss of power or a broken wire then tends to produce the safer occupied state.",
              "v": "expert",
              "fb": "Requiring healthy energy for permission makes common electrical failures restrictive."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — corroboration",
            "text": "Field current dropped under the stopped train, but a downstream bridge continued presenting an energized clear input."
          }
        },
        {
          "q": "Which test best separates a failed track circuit from a bypassed indication?",
          "o": [
            {
              "t": "Compare field relay state with the corresponding input at each downstream stage.",
              "v": "expert",
              "fb": "Stage-by-stage correspondence testing identifies where a truthful state becomes falsified."
            },
            {
              "t": "Accept the control panel as the authoritative state and disregard field readings.",
              "v": "danger",
              "fb": "The panel is one endpoint of the system and may display the very error under investigation."
            },
            {
              "t": "Inspect the locomotive brakes and estimate whether it could have stopped sooner.",
              "v": "partial",
              "fb": "Braking analysis addresses collision severity, not the origin of a false-clear indication."
            },
            {
              "t": "Count passengers on the stopped train to confirm the crossing was occupied.",
              "v": "wrong",
              "fb": "Passenger count cannot locate an electrical contradiction in the signalling chain."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — corroboration",
            "text": "Measurements agree that occupation was detected at the rails and contradicted only after the signal-box maintenance terminals."
          }
        },
        {
          "q": "What evidence most directly rules out the express driver as the source of the false clear?",
          "o": [
            {
              "t": "A professional driver is unlikely to err while the signal system is operating.",
              "v": "danger",
              "fb": "Professional experience does not make human error impossible; the electronic evidence does the separating here."
            },
            {
              "t": "Fixed signalling issued the green command before the express reached the approach.",
              "v": "expert",
              "fb": "Timing and command provenance separate the driver’s response from the system’s authorization."
            },
            {
              "t": "The driver had a long service record without a previous signal overrun.",
              "v": "partial",
              "fb": "Prior performance affects context but cannot establish the cause of this command."
            },
            {
              "t": "The locomotive horn sounded normally as it approached the crossing.",
              "v": "wrong",
              "fb": "Horn use has no bearing on how the signal aspect was created."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — corroboration",
            "text": "The signal command was generated before the express arrived, while the relay-cabinet access log records a maintenance intervention."
          }
        }
      ]
    },
    "rx_hall": {
      "sci": "Thomas S. Hall (1827-1880)",
      "topic": "Automatic railway signalling",
      "lede": "Thomas Hall helped make signals respond automatically to track conditions instead of waiting for every human message.",
      "no": 3,
      "profile": "Thomas Seavey Hall was an American inventor associated with early automatic railway signalling in the nineteenth century. Railways were expanding faster than operators could safely manage by timetable and hand signals alone. Hall developed electrical systems in which a train’s presence influenced signals automatically, helping establish the idea that the track should communicate its condition directly to following traffic.\n\nAutomatic signalling does not remove people from responsibility. It changes where responsibility lies. Engineers define the logic, technicians maintain correspondence between field devices and indications, and operators respond to the aspects presented. The system is valuable because it closes the time gap between a train entering a block and a warning being issued. It also creates records: relay transitions, aspect commands, acknowledgments, and maintenance actions can be aligned into a timeline.\n\nA useful safety principle is independence. The device detecting occupation should not be casually overridden by the same pressure that wants a route cleared. When a fault must be worked around, a second check—direct communication, physical protection, reduced speed, or possession of the track—must replace the lost automatic barrier. Otherwise automation becomes theatre: the panel looks orderly while the evidence it displays has been manufactured.\n\nHall’s lesson completes the Marsh Lane chain. The crossing circuit changed to occupied, the signal logic should have held the express, and the driver obeyed the aspect actually shown. The decisive records are not dramatic. They are a maintenance login, a jumper noted as temporary, repeated false-clear tests, and no compensating operating restriction. Together they point to the technician who left the bridge in place after the repair window. The crash occurred at the crossing, but the unsafe permission culminated in the signalling centre’s relay and event record, where automatic protection had been converted into an automatic lie.",
      "frame": "Aligns relay transitions, panel commands, and maintenance logins on one timeline. “Automatic does not mean ownerless. Someone changed what the machine was allowed to believe.”",
      "q": [
        {
          "q": "What is the main safety advantage of automatic block signalling?",
          "o": [
            {
              "t": "The system may continue showing clear until a human confirms every equipment failure.",
              "v": "danger",
              "fb": "Waiting for confirmation while retaining clear is the unsafe direction for a protection system."
            },
            {
              "t": "Signals can be cleared more quickly whenever the timetable begins running late.",
              "v": "partial",
              "fb": "Capacity can improve, but safety depends on accurate restrictive response rather than speed."
            },
            {
              "t": "Track conditions can restrict following movements without waiting for manual reports.",
              "v": "expert",
              "fb": "Automatic restriction shortens the delay between occupation and protection."
            },
            {
              "t": "Locomotives receive mechanical steering commands directly from signal lamps.",
              "v": "wrong",
              "fb": "Rail signals authorize movement; they do not steer trains mechanically."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — decisive",
            "text": "The event recorder in the signalling centre preserves occupation, bypass, and clear-command transitions in one synchronized chain."
          }
        },
        {
          "q": "What compensating measure is required when automatic train detection is deliberately unavailable?",
          "o": [
            {
              "t": "A note should be left for the next maintenance shift to inspect the device.",
              "v": "partial",
              "fb": "A future note does not protect trains moving through the present failure."
            },
            {
              "t": "The timetable should be revised so trains arrive at wider scheduled intervals.",
              "v": "wrong",
              "fb": "Timetable spacing cannot guarantee that a crossing or block is physically clear."
            },
            {
              "t": "Normal running may continue if staff believe the failed indication is usually correct.",
              "v": "danger",
              "fb": "Belief in an unreliable indication is not a compensating control."
            },
            {
              "t": "An independent check and operating restriction must replace the lost barrier.",
              "v": "expert",
              "fb": "Removing a safety layer requires a real substitute that controls movement during the outage."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — decisive",
            "text": "No reduced speed, direct crossing confirmation, or track possession replaced the strapped-out interlock."
          }
        },
        {
          "q": "Which record most directly identifies responsibility for leaving the unsafe state in service?",
          "o": [
            {
              "t": "The access log, work order, and closeout entry converge on one maintainer.",
              "v": "expert",
              "fb": "Converging maintenance records tie the physical alteration and its unresolved closeout to the actor."
            },
            {
              "t": "The driver’s route card lists the express schedule and assigned locomotive.",
              "v": "wrong",
              "fb": "A route card provides operating context but no evidence of relay modification."
            },
            {
              "t": "The infrastructure manager is responsible because the system belongs to that office.",
              "v": "danger",
              "fb": "Organizational authority alone should not replace evidence about the specific intervention."
            },
            {
              "t": "The signaller’s shift roster shows who watched the panel during the collision.",
              "v": "partial",
              "fb": "Panel duty explains who saw the result, not who created the false input."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — decisive",
            "text": "The same technician’s credential opened the cabinet, recorded the temporary strap, and closed the job without removing it."
          }
        }
      ]
    }
  },
  "story": [
    "<b>An express entered Marsh Lane on a green signal while another train still occupied the crossing.</b>",
    "S&T Tech Mara Doss knows the relay cabinet. The Signaller holds the panel timeline. The records clerk can join access, work orders, and aspect commands.",
    "The possibilities are a planted obstruction, a driver who ignored a stop signal, or an automatic protection system made to report a condition that was not true.",
    "Nine clues reconstruct how an occupied rail became a cleared route and who left that contradiction in service."
  ],
  "endings": {
    "overclaimWhat": "rx_sabotage",
    "dismissalWhat": "rx_driver",
    "win": {
      "expertTitle": "The False Clear",
      "expert": [
        "You connect Mara Doss, the Signal-Box Relay & Event Recorder, and a maintenance bypass that falsely cleared an occupied crossing. Field detection worked; the bridge defeated the correspondence before the green command was issued.",
        "No obstruction was planted on the line, and the driver did not pass a red aspect. The unsafe act was the temporary interlock strap left in service without any compensating restriction."
      ],
      "soundTitle": "The Bypassed Interlock",
      "sound": [
        "Your accusation identifies the technician, the relay chain, and the false-clear mechanism.",
        "Some maintenance details remain incomplete, but the field-to-panel contradiction supports the verdict."
      ],
      "namedTitle": "Correct Route, Limited Record",
      "named": [
        "You select the correct WHO, WHERE, and WHAT.",
        "The conclusion is sound, although missed clues leave parts of the access or closeout timeline unproved."
      ]
    },
    "overclaim": {
      "title": "No Obstruction Created the Green Signal",
      "body": [
        "The crossing circuit registered the stopped train before impact, and no explosive or placed object explains the stable false-clear command.",
        "The evidence follows a bridged relay input inside the signalling chain rather than sabotage on the railway."
      ]
    },
    "dismissal": {
      "title": "The Driver Followed the Displayed Aspect",
      "body": [
        "The event recorder shows a green command before the express entered the approach, and cab evidence matches that display.",
        "Driver error cannot explain why occupied track was represented as clear."
      ]
    },
    "wrongNames": {
      "title": "The Mechanism, Misassigned",
      "body": [
        "You recognize a defeated interlock but place responsibility or culmination away from the maintenance intervention and relay record that created the false permission."
      ]
    }
  }
}
};
