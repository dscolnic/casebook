module.exports = { PACK: {
  "id": "t_transformer",
  "title": "The Aldergate Substation Fire",
  "discipline": "Power Engineering & Dielectrics",
  "teaser": "The Aldergate transformer burned after alarms and a citywide outage. Did a lightning impulse puncture insulation, or did corona track across a bushing? Oil and paper preserve another test.",
  "overclaimTag": "a lightning-impulse puncture",
  "truthTag": "thermal aging of internal paper insulation",
  "venue": "the Aldergate substation inquiry",
  "agent": {
    "name": "Investigator Emun Halle",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Power & Dielectric Pioneers",
  "dossierName": "POWER & DIELECTRIC PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Aldergate substation inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before your inquiry ends. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The place you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "Lightning and bushing flashover leave spectacular marks; the transformer oil and thermal history may tell a less visible story.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "operator",
      "items": [
        {
          "id": "operator",
          "label": "Bram Odell — utility operator"
        },
        {
          "id": "engineer",
          "label": "The substation engineer"
        },
        {
          "id": "regulator",
          "label": "The grid safety regulator"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "office",
      "items": [
        {
          "id": "yard",
          "label": "The Substation Yard & Transformer"
        },
        {
          "id": "relay",
          "label": "The Relay & Control House"
        },
        {
          "id": "office",
          "label": "The Utility's Asset Office"
        }
      ]
    },
    "what": {
      "title": "Which failure mode began inside the transformer?",
      "truth": "overload",
      "items": [
        {
          "id": "attack",
          "label": "A lightning impulse punctured insulation in one external surge."
        },
        {
          "id": "freak",
          "label": "Corona discharge tracked across bushings before flashing over."
        },
        {
          "id": "overload",
          "label": "Long overheating aged paper insulation and formed fault gases."
        }
      ]
    }
  },
  "PLACES": {
    "yard": {
      "name": "The Substation Yard & Transformer",
      "xy": [
        140,
        90
      ]
    },
    "relay": {
      "name": "The Relay & Control House",
      "xy": [
        330,
        240
      ]
    },
    "office": {
      "name": "The Utility's Asset Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "yard",
      "relay"
    ],
    [
      "relay",
      "office"
    ]
  ],
  "CHARACTERS": {
    "subop": {
      "name": "Operator Nkemi",
      "role": "Substation operator",
      "face": "⚡",
      "badge": "N",
      "legend": "the substation yard",
      "hint": "Knows switching history and can identify the operators and offices responsible for the asset."
    },
    "oiltech": {
      "name": "The Oil Technician",
      "role": "Insulating-oil technician",
      "face": "🧪",
      "badge": "O",
      "legend": "the control house",
      "hint": "Maintains sample custody and can place each laboratory result in the maintenance calendar."
    },
    "clerk": {
      "name": "The Clerk",
      "role": "Asset-records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Holds loading records, work orders, and the management chain behind testing decisions."
    }
  },
  "TOPICMAP": {
    "yard": {
      "subop": [
        "tx_hopkinson"
      ],
      "oiltech": [
        "tx_zipernowsky"
      ],
      "clerk": [
        "tx_deri"
      ]
    },
    "relay": {
      "subop": [
        "tx_ferranti"
      ],
      "oiltech": [
        "tx_barkhausen"
      ],
      "clerk": [
        "tx_mossotti"
      ]
    },
    "office": {
      "subop": [
        "tx_townsend"
      ],
      "oiltech": [
        "tx_rogowski"
      ],
      "clerk": [
        "tx_schmidt"
      ]
    }
  },
  "TOPICS": {
    "tx_hopkinson": {
      "sci": "John Hopkinson (1849-1898)",
      "topic": "Magnetic circuits & transformer theory",
      "lede": "John Hopkinson exposed the electromagnetic or thermal behavior hidden inside magnetic circuits & transformer theory.",
      "no": 1,
      "profile": "The grid-equipment note for this shift studies John Hopkinson through magnetic circuits & transformer theory. John Hopkinson applied magnetic-circuit ideas to electrical machines and transformers, relating magnetomotive force, flux, and reluctance in a form analogous to electric circuits. His work helped engineers calculate core behavior instead of relying only on trial construction. That work placed a hidden electrical, magnetic, dielectric, or thermal process inside calculations that asset engineers could compare with service evidence.\n\nTransformer loading is limited by magnetic flux, copper current, insulation temperature, and cooling, all of which must be measured together. A power transformer is simultaneously an electromagnetic device, a thermal system, a pressure vessel, and an insulation system. Load current, magnetic flux, oil condition, paper aging, cooling, moisture, and electric-field stress interact over years. A transformer explanation should connect current, flux, voltage stress, temperature, insulation condition, and cooling rather than isolating a single nameplate number.\n\nCondition monitoring looks for trends rather than one dramatic threshold. Winding and oil temperature, dissolved gases, moisture, partial discharge, load history, and relay operations can reveal different stages of deterioration. Protective relays and maintenance tests are barriers against escalation. Deferring a sample or normalizing a hot-running unit does not make the underlying chemistry stop; it merely removes the evidence from routine view. The asset chronology needs load curves, oil chemistry, temperatures, relay targets, cooling status, inspections, and deferred work on one dated line.\n\nThe engineering lesson is that rating plates describe tested boundaries, not permission to operate indefinitely at every edge. Ambient temperature, harmonics, cooling availability, and prior aging change the margin. A useful asset record joins load curves, alarms, inspections, oil analyses, repairs, and abnormal events. Separated records can make a long deterioration history look like unrelated minor observations. Cover fluency means distinguishing an external surge from an internal fault that developed over months. Relay traces, gas signatures, thermal evidence, and maintenance chronology provide that distinction.",
      "frame": "Watches the temperature panel at The Substation Yard & Transformer. \"Put John Hopkinson into flux, heat, or insulation terms I can compare with this unit.\"",
      "q": [
        {
          "q": "Which transformer-engineering account best states John Hopkinson's role in magnetic circuits & transformer theory?",
          "o": [
            {
              "t": "John Hopkinson applied magnetic-circuit ideas to electrical machines and transformers, relating magnetomotive force, flux, and reluctance in a form analogous to electric circuits. The substation archive stores the oil-gas trend. Transformer fits.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "John Hopkinson's transformer work emphasizes electrical output and relay status. Relay status appears reassuring. Nameplate limits support the view. Transformer records fit this transformer account. Transformer timing supports this transformer claim.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "John Hopkinson's transformer work supports the rating plate as sufficient evidence of healthy insulation across the expected operating range. Transformer practice makes the transformer view plausible. Transformer timing supports this transformer claim.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "John Hopkinson's transformer authority supports postponing oil sampling while the energized transformer continues carrying load without a relay trip. Transformer records fit this transformer account. Transformer timing supports this transformer claim.",
              "v": "danger",
              "fb": "That shortcut hides developing insulation damage while continued loading accelerates the failure process."
            }
          ]
        },
        {
          "q": "How should a transformer engineer apply this contribution?",
          "o": [
            {
              "t": "Transformer loading is limited by magnetic flux, copper current, insulation temperature, and cooling, all of which must be measured together. The substation archive stores the oil-gas trend.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Use one electrical reading as the main indicator while treating cooling, moisture, and insulation aging as later tests. Electrical output looks normal. Transformer records fit this transformer account.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Assume magnetic response and dielectric strength remain stable across moisture, temperature, surface condition, and frequency. Relay status appears reassuring. Nameplate limits support the view.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "Keep the overloaded unit online while oil and insulation condition tests remain deferred. The unit still carries load. Relay status appears reassuring. Transformer records fit this transformer account.",
              "v": "danger",
              "fb": "That shortcut hides developing insulation damage while continued loading accelerates the failure process."
            }
          ]
        },
        {
          "q": "What does this history require from transformer asset management?",
          "o": [
            {
              "t": "Cover fluency means distinguishing an external surge from an internal fault that developed over months. Relay traces, gas signatures, thermal evidence, and maintenance chronology provide that distinction. Transformer fits.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Review load history and oil trends separately once the transformer has returned to service. Nameplate limits support the view. Transformer records fit this transformer account. Transformer timing supports this transformer claim.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Attribute the fire mainly to attack or lightning rather than a long internal deterioration process. The unit still carries load. Nameplate limits support the view. Transformer timing supports this transformer claim. Transformer fits.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "Restore load, postpone oil sampling, and treat a cleared alarm as evidence of recovered insulation. Relay status appears reassuring. Transformer records fit this transformer account. Transformer timing supports this transformer claim.",
              "v": "danger",
              "fb": "That shortcut hides developing insulation damage while continued loading accelerates the failure process."
            }
          ]
        }
      ]
    },
    "tx_zipernowsky": {
      "sci": "Karoly Zipernowsky (1853-1942)",
      "topic": "AC distribution & the transformer",
      "lede": "Karoly Zipernowsky's work on aC distribution & the transformer linked transformer design with measurable service condition.",
      "no": 2,
      "profile": "The grid-equipment note for this shift studies Karoly Zipernowsky through aC distribution & the transformer. Károly Zipernowsky led the Ganz electrical department and, with Bláthy and Déri, developed a transformer-based AC distribution system using parallel-connected loads. That architecture allowed consumers to receive nearly constant voltage at different locations. That work placed a hidden electrical, magnetic, dielectric, or thermal process inside calculations that asset engineers could compare with service evidence.\n\nDistribution architecture matters: parallel service and suitable transformation prevent one load from dictating the condition of every other load. Protective relays and maintenance tests are barriers against escalation. Deferring a sample or normalizing a hot-running unit does not make the underlying chemistry stop; it merely removes the evidence from routine view. A transformer explanation should connect current, flux, voltage stress, temperature, insulation condition, and cooling rather than isolating a single nameplate number.\n\nA power transformer is simultaneously an electromagnetic device, a thermal system, a pressure vessel, and an insulation system. Load current, magnetic flux, oil condition, paper aging, cooling, moisture, and electric-field stress interact over years. Condition monitoring looks for trends rather than one dramatic threshold. Winding and oil temperature, dissolved gases, moisture, partial discharge, load history, and relay operations can reveal different stages of deterioration. The asset chronology needs load curves, oil chemistry, temperatures, relay targets, cooling status, inspections, and deferred work on one dated line.\n\nCover fluency means distinguishing an external surge from an internal fault that developed over months. Relay traces, gas signatures, thermal evidence, and maintenance chronology provide that distinction. The engineering lesson is that rating plates describe tested boundaries, not permission to operate indefinitely at every edge. Ambient temperature, harmonics, cooling availability, and prior aging change the margin. A useful asset record joins load curves, alarms, inspections, oil analyses, repairs, and abnormal events. Separated records can make a long deterioration history look like unrelated minor observations.",
      "frame": "Indicates a relay target at The Substation Yard & Transformer. \"A label is not a diagnosis. Explain Karoly Zipernowsky and the measurable limit.\"",
      "q": [
        {
          "q": "Which transformer-engineering account best states Karoly Zipernowsky's role in aC distribution & the transformer?",
          "o": [
            {
              "t": "Károly Zipernowsky led the Ganz electrical department and, with Bláthy and Déri, developed a transformer-based AC distribution system using parallel-connected loads. The substation archive stores the oil-gas trend. Transformer fits.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Karoly Zipernowsky's transformer work relies on electrical output and relay status. The unit still carries load. Relay status appears reassuring. Nameplate limits support the view. Electrical output looks normal. Transformer fits.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Karoly Zipernowsky's transformer work is read within transformer practice as support for the rating plate as sufficient evidence of healthy insulation across the expected operating range. Transformer timing supports this transformer claim.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "Karoly Zipernowsky's authority is invoked in transformer practice to justify postponing oil sampling while the energized transformer continues carrying load without a relay trip. Electrical output looks normal. Transformer fits.",
              "v": "danger",
              "fb": "That shortcut hides developing insulation damage while continued loading accelerates the failure process."
            }
          ]
        },
        {
          "q": "How should a transformer engineer apply this contribution?",
          "o": [
            {
              "t": "Distribution architecture matters: parallel service and suitable transformation prevent one load from dictating the condition of every other load. The substation archive stores the oil-gas trend. Transformer fits.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Use one electrical reading as the main indicator while treating cooling, moisture, and insulation aging as later tests. Nameplate limits support the view. Transformer timing supports this transformer claim.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Assume magnetic response and dielectric strength remain stable across moisture, temperature, surface condition, and frequency. Electrical output looks normal. Transformer practice makes the transformer view plausible.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "Keep the overloaded unit online while oil and insulation condition tests remain deferred. Nameplate limits support the view. Electrical output looks normal. Transformer records fit this transformer account.",
              "v": "danger",
              "fb": "That shortcut hides developing insulation damage while continued loading accelerates the failure process."
            }
          ]
        },
        {
          "q": "What does this history require from transformer asset management?",
          "o": [
            {
              "t": "A useful asset record joins load curves, alarms, inspections, oil analyses, repairs, and abnormal events. Separated records can make a long deterioration history look like unrelated minor observations. Transformer fits.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Review load history and oil trends separately once the transformer has returned to service. Electrical output looks normal. Transformer records fit this transformer account. Transformer timing supports this transformer claim.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Attribute the fire mainly to attack or lightning rather than a long internal deterioration process. Relay status appears reassuring. Nameplate limits support the view. Electrical output looks normal. Transformer fits.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "Restore load, postpone oil sampling, and treat a cleared alarm as evidence of recovered insulation. Nameplate limits support the view. Electrical output looks normal. Transformer timing supports this transformer claim.",
              "v": "danger",
              "fb": "That shortcut hides developing insulation damage while continued loading accelerates the failure process."
            }
          ]
        }
      ]
    },
    "tx_deri": {
      "sci": "Miksa Deri (1854-1938)",
      "topic": "The ZBD transformer & AC",
      "lede": "Through the ZBD transformer & AC, Miksa Deri gave power engineers a calculable limit for high-voltage equipment.",
      "no": 3,
      "profile": "The grid-equipment note for this shift studies Miksa Deri through the ZBD transformer & AC. Miksa Déri joined Zipernowsky and Bláthy in developing the ZBD transformer and practical AC distribution. His work helped replace series arrangements with parallel networks that were better suited to stable public electricity supply. That work placed a hidden electrical, magnetic, dielectric, or thermal process inside calculations that asset engineers could compare with service evidence.\n\nReliable transformation depends on both the device and the network configuration in which it operates. Condition monitoring looks for trends rather than one dramatic threshold. Winding and oil temperature, dissolved gases, moisture, partial discharge, load history, and relay operations can reveal different stages of deterioration. A transformer explanation should connect current, flux, voltage stress, temperature, insulation condition, and cooling rather than isolating a single nameplate number.\n\nProtective relays and maintenance tests are barriers against escalation. Deferring a sample or normalizing a hot-running unit does not make the underlying chemistry stop; it merely removes the evidence from routine view. A power transformer is simultaneously an electromagnetic device, a thermal system, a pressure vessel, and an insulation system. Load current, magnetic flux, oil condition, paper aging, cooling, moisture, and electric-field stress interact over years. The asset chronology needs load curves, oil chemistry, temperatures, relay targets, cooling status, inspections, and deferred work on one dated line.\n\nA useful asset record joins load curves, alarms, inspections, oil analyses, repairs, and abnormal events. Separated records can make a long deterioration history look like unrelated minor observations. Cover fluency means distinguishing an external surge from an internal fault that developed over months. Relay traces, gas signatures, thermal evidence, and maintenance chronology provide that distinction. The engineering lesson is that rating plates describe tested boundaries, not permission to operate indefinitely at every edge. Ambient temperature, harmonics, cooling availability, and prior aging change the margin.",
      "frame": "Rolls an oil report across the desk at The Substation Yard & Transformer. \"Use the ZBD transformer & AC to tell me what the transformer is doing inside.\"",
      "q": [
        {
          "q": "Which transformer-engineering account best states Miksa Deri's role in the ZBD transformer & AC?",
          "o": [
            {
              "t": "Miksa Déri joined Zipernowsky and Bláthy in developing the ZBD transformer and practical AC distribution. Grid review keeps the temperature-linked relay target trace available for diagnosis. Transformer fits.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Miksa Deri's transformer work emphasizes electrical output and relay status. Electrical output looks normal. Transformer context supports the view. Transformer timing supports this transformer claim.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Miksa Deri's transformer work is read within transformer practice as support for the rating plate as sufficient evidence of healthy insulation across the expected operating range. The unit still carries load.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "Miksa Deri's transformer authority supports postponing oil sampling while the energized transformer continues carrying load without a relay trip. Transformer practice makes the transformer view plausible.",
              "v": "danger",
              "fb": "That shortcut hides developing insulation damage while continued loading accelerates the failure process."
            }
          ]
        },
        {
          "q": "How should a transformer engineer apply this contribution?",
          "o": [
            {
              "t": "Reliable transformation depends on both the device and the network configuration in which it operates. Asset specialists compare the raw relay target trace with transformer loading.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Use one electrical reading as the main indicator while treating cooling, moisture, and insulation aging as later tests. The unit still carries load. Electrical output looks normal.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Assume magnetic response and dielectric strength remain stable across moisture, temperature, surface condition, and frequency. The unit still carries load. Electrical output looks normal.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "Keep the overloaded unit online while oil and insulation condition tests remain deferred. The unit still carries load. Relay status appears reassuring. Electrical output looks normal.",
              "v": "danger",
              "fb": "That shortcut hides developing insulation damage while continued loading accelerates the failure process."
            }
          ]
        },
        {
          "q": "What does this history require from transformer asset management?",
          "o": [
            {
              "t": "The engineering lesson is that rating plates describe tested boundaries, not permission to operate indefinitely at every edge. Ambient temperature, harmonics, cooling availability, and prior aging change the margin. Transformer fits. Transformer fits.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Review load history and oil trends separately once the transformer has returned to service. Transformer context supports the view. Transformer practice makes the transformer view plausible. Transformer timing supports this transformer claim.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Attribute the fire mainly to attack or lightning rather than a long internal deterioration process. Transformer records fit this transformer account. Transformer context supports the view. Transformer timing supports this transformer claim.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "Restore load, postpone oil sampling, and treat a cleared alarm as evidence of recovered insulation. Transformer context supports the view. Transformer practice makes the transformer view plausible. Transformer timing supports this transformer claim.",
              "v": "danger",
              "fb": "That shortcut hides developing insulation damage while continued loading accelerates the failure process."
            }
          ]
        }
      ]
    },
    "tx_ferranti": {
      "sci": "Sebastian Ziani de Ferranti (1864-1930)",
      "topic": "High-voltage AC & the Ferranti effect",
      "lede": "Sebastian Ziani de Ferranti exposed the electromagnetic or thermal behavior hidden inside high-voltage AC & the Ferranti effect.",
      "no": 4,
      "profile": "The grid-equipment note for this shift studies Sebastian Ziani de Ferranti through high-voltage AC & the Ferranti effect. Sebastian Ziani de Ferranti designed high-voltage AC generating and distribution systems, including the pioneering Deptford station. The Ferranti effect describes how a lightly loaded long AC line can have a receiving-end voltage higher than the sending-end voltage. That work placed a hidden electrical, magnetic, dielectric, or thermal process inside calculations that asset engineers could compare with service evidence.\n\nVoltage can rise as well as fall under abnormal network conditions, making load state and reactive behavior essential to insulation protection. A power transformer is simultaneously an electromagnetic device, a thermal system, a pressure vessel, and an insulation system. Load current, magnetic flux, oil condition, paper aging, cooling, moisture, and electric-field stress interact over years. A transformer explanation should connect current, flux, voltage stress, temperature, insulation condition, and cooling rather than isolating a single nameplate number.\n\nCondition monitoring looks for trends rather than one dramatic threshold. Winding and oil temperature, dissolved gases, moisture, partial discharge, load history, and relay operations can reveal different stages of deterioration. Protective relays and maintenance tests are barriers against escalation. Deferring a sample or normalizing a hot-running unit does not make the underlying chemistry stop; it merely removes the evidence from routine view. The asset chronology needs load curves, oil chemistry, temperatures, relay targets, cooling status, inspections, and deferred work on one dated line.\n\nFerranti's high-voltage work helps define the lightning-impulse hypothesis. A fast surge places steep voltage stress across winding and bushing insulation, often coinciding with a recorded lightning or switching event and leaving a localized puncture path. Surge arresters and relay records provide independent timing. Slow temperature rise, cellulose degradation, and fault gases accumulating before the fire do not fit a single external impulse, however dramatic the final flashover appears.",
      "frame": "Watches the temperature panel at The Relay & Control House. \"Put Sebastian Ziani de Ferranti into flux, heat, or insulation terms I can compare with this unit.\"",
      "q": [
        {
          "q": "Which transformer-engineering account best states Sebastian Ziani de Ferranti's role in high-voltage AC & the Ferranti effect?",
          "o": [
            {
              "t": "Sebastian Ziani de Ferranti designed high-voltage AC generating and distribution systems, including the pioneering Deptford station. Asset specialists compare the condition-based transformer loading archive with transformer loading. Transformer fits.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Sebastian Ziani de Ferranti's treatment of high-voltage ac & the ferranti effect uses a transformer simplification: electrical output and relay status, with insulation aging and oil chemistry treated as later condition evidence. Transformer fits.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Sebastian Ziani de Ferranti's transformer work supports the rating plate as sufficient evidence of healthy insulation across the expected operating range. Nameplate limits support the view. Transformer timing supports this transformer claim.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "Sebastian Ziani de Ferranti's authority is invoked in transformer practice to justify postponing oil sampling while the energized transformer continues carrying load without a relay trip. Transformer practice makes the transformer view plausible.",
              "v": "danger",
              "fb": "That shortcut hides developing insulation damage while continued loading accelerates the failure process."
            }
          ]
        },
        {
          "q": "How should a transformer engineer apply this contribution?",
          "o": [
            {
              "t": "Voltage can rise as well as fall under abnormal network conditions, making load state and reactive behavior essential to insulation protection. The substation archive stores the oil-gas trend. Transformer fits.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Use one electrical reading as the main indicator while treating cooling, moisture, and insulation aging as later tests. Electrical output looks normal. Transformer timing supports this transformer claim.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Assume magnetic response and dielectric strength remain stable across moisture, temperature, surface condition, and frequency. Relay status appears reassuring. Transformer records fit this transformer account.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "Keep the overloaded unit online while oil and insulation condition tests remain deferred. The unit still carries load. Nameplate limits support the view. Transformer records fit this transformer account.",
              "v": "danger",
              "fb": "That shortcut hides developing insulation damage while continued loading accelerates the failure process."
            }
          ]
        },
        {
          "q": "What does this history require from transformer asset management?",
          "o": [
            {
              "t": "Cover fluency means distinguishing an external surge from an internal fault that developed over months. Relay traces, gas signatures, thermal evidence, and maintenance chronology provide that distinction. Transformer fits.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Review load history and oil trends separately once the transformer has returned to service. Nameplate limits support the view. Transformer records fit this transformer account. Transformer timing supports this transformer claim.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Attribute the fire mainly to attack or lightning rather than a long internal deterioration process. The unit still carries load. Nameplate limits support the view. Transformer timing supports this transformer claim. Transformer fits.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "Restore load, postpone oil sampling, and treat a cleared alarm as evidence of recovered insulation. Relay status appears reassuring. Transformer records fit this transformer account. Transformer timing supports this transformer claim.",
              "v": "danger",
              "fb": "That shortcut hides developing insulation damage while continued loading accelerates the failure process."
            }
          ]
        }
      ]
    },
    "tx_barkhausen": {
      "sci": "Heinrich Barkhausen (1881-1956)",
      "topic": "Magnetization & core losses",
      "lede": "Heinrich Barkhausen's work on magnetization & core losses linked transformer design with measurable service condition.",
      "no": 5,
      "profile": "The grid-equipment note for this shift studies Heinrich Barkhausen through magnetization & core losses. Heinrich Barkhausen detected small jumps in magnetization as magnetic domains moved, producing the Barkhausen effect. The observation showed that magnetization changes through discrete microscopic events rather than a perfectly smooth process. That work placed a hidden electrical, magnetic, dielectric, or thermal process inside calculations that asset engineers could compare with service evidence.\n\nChanging magnetic domains dissipate energy and can reveal material stress or degradation when measured with suitable methods. Protective relays and maintenance tests are barriers against escalation. Deferring a sample or normalizing a hot-running unit does not make the underlying chemistry stop; it merely removes the evidence from routine view. A transformer explanation should connect current, flux, voltage stress, temperature, insulation condition, and cooling rather than isolating a single nameplate number.\n\nA power transformer is simultaneously an electromagnetic device, a thermal system, a pressure vessel, and an insulation system. Load current, magnetic flux, oil condition, paper aging, cooling, moisture, and electric-field stress interact over years. Condition monitoring looks for trends rather than one dramatic threshold. Winding and oil temperature, dissolved gases, moisture, partial discharge, load history, and relay operations can reveal different stages of deterioration. The asset chronology needs load curves, oil chemistry, temperatures, relay targets, cooling status, inspections, and deferred work on one dated line.\n\nCover fluency means distinguishing an external surge from an internal fault that developed over months. Relay traces, gas signatures, thermal evidence, and maintenance chronology provide that distinction. The engineering lesson is that rating plates describe tested boundaries, not permission to operate indefinitely at every edge. Ambient temperature, harmonics, cooling availability, and prior aging change the margin. A useful asset record joins load curves, alarms, inspections, oil analyses, repairs, and abnormal events. Separated records can make a long deterioration history look like unrelated minor observations.",
      "frame": "Indicates a relay target at The Relay & Control House. \"A label is not a diagnosis. Explain Heinrich Barkhausen and the measurable limit.\"",
      "q": [
        {
          "q": "Which transformer-engineering account best states Heinrich Barkhausen's role in magnetization & core losses?",
          "o": [
            {
              "t": "Heinrich Barkhausen detected small jumps in magnetization as magnetic domains moved, producing the Barkhausen effect. Grid review keeps the temperature-linked relay target trace available for diagnosis. Fits.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Heinrich Barkhausen's transformer work emphasizes electrical output and relay status. Nameplate limits support the view. Transformer context supports the view. Transformer timing supports this transformer claim.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Heinrich Barkhausen's transformer work is read within transformer practice as support for the rating plate as sufficient evidence of healthy insulation across the expected operating range. The unit still carries load.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "Heinrich Barkhausen's transformer authority supports postponing oil sampling while the energized transformer continues carrying load without a relay trip. Transformer practice makes the transformer view plausible.",
              "v": "danger",
              "fb": "That shortcut hides developing insulation damage while continued loading accelerates the failure process."
            }
          ]
        },
        {
          "q": "How should a transformer engineer apply this contribution?",
          "o": [
            {
              "t": "Changing magnetic domains dissipate energy and can reveal material stress or degradation when measured with suitable methods. The substation archive stores the oil-gas trend. Transformer fits. Transformer fits. Context fits.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Use one electrical reading as the main indicator while treating cooling, moisture, and insulation aging as later tests. The unit still carries load. Electrical output looks normal. Transformer fits. Transformer fits. Fits.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Assume magnetic response and dielectric strength remain stable across moisture, temperature, surface condition, and frequency. The unit still carries load. The transformer practice fits. Transformer fits. Transformer fits.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "Keep the overloaded unit online while oil and insulation condition tests remain deferred. Transformer practice makes the transformer view plausible. Transformer timing supports this transformer claim. The transformer record fits.",
              "v": "danger",
              "fb": "That shortcut hides developing insulation damage while continued loading accelerates the failure process."
            }
          ]
        },
        {
          "q": "What does this history require from transformer asset management?",
          "o": [
            {
              "t": "A useful asset record joins load curves, alarms, inspections, oil analyses, repairs, and abnormal events. Separated records can make a long deterioration history look like unrelated minor observations. Transformer fits.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Review load history and oil trends separately once the transformer has returned to service. Electrical output looks normal. Transformer records fit this transformer account. Transformer timing supports this transformer claim.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Attribute the fire mainly to attack or lightning rather than a long internal deterioration process. Relay status appears reassuring. Nameplate limits support the view. Electrical output looks normal. Transformer fits.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "Restore load, postpone oil sampling, and treat a cleared alarm as evidence of recovered insulation. Nameplate limits support the view. Electrical output looks normal. Transformer timing supports this transformer claim.",
              "v": "danger",
              "fb": "That shortcut hides developing insulation damage while continued loading accelerates the failure process."
            }
          ]
        }
      ]
    },
    "tx_mossotti": {
      "sci": "Ottaviano Mossotti (1791-1863)",
      "topic": "Dielectric polarization",
      "lede": "Through dielectric polarization, Ottaviano Mossotti gave power engineers a calculable limit for high-voltage equipment.",
      "no": 6,
      "profile": "The grid-equipment note for this shift studies Ottaviano Mossotti through dielectric polarization. Ottaviano Mossotti related the microscopic polarizability of matter to its macroscopic dielectric behavior, an approach later associated with the Clausius-Mossotti relation. It linked molecular response with measurable permittivity. That work placed a hidden electrical, magnetic, dielectric, or thermal process inside calculations that asset engineers could compare with service evidence.\n\nPermittivity is not merely a catalog number; it reflects material condition and influences electric-field distribution inside insulation. Condition monitoring looks for trends rather than one dramatic threshold. Winding and oil temperature, dissolved gases, moisture, partial discharge, load history, and relay operations can reveal different stages of deterioration. A transformer explanation should connect current, flux, voltage stress, temperature, insulation condition, and cooling rather than isolating a single nameplate number.\n\nProtective relays and maintenance tests are barriers against escalation. Deferring a sample or normalizing a hot-running unit does not make the underlying chemistry stop; it merely removes the evidence from routine view. A power transformer is simultaneously an electromagnetic device, a thermal system, a pressure vessel, and an insulation system. Load current, magnetic flux, oil condition, paper aging, cooling, moisture, and electric-field stress interact over years. The asset chronology needs load curves, oil chemistry, temperatures, relay targets, cooling status, inspections, and deferred work on one dated line.\n\nA useful asset record joins load curves, alarms, inspections, oil analyses, repairs, and abnormal events. Separated records can make a long deterioration history look like unrelated minor observations. Cover fluency means distinguishing an external surge from an internal fault that developed over months. Relay traces, gas signatures, thermal evidence, and maintenance chronology provide that distinction. The engineering lesson is that rating plates describe tested boundaries, not permission to operate indefinitely at every edge. Ambient temperature, harmonics, cooling availability, and prior aging change the margin.",
      "frame": "Rolls an oil report across the desk at The Relay & Control House. \"Use dielectric polarization to tell me what the transformer is doing inside.\"",
      "q": [
        {
          "q": "Which transformer-engineering account best states Ottaviano Mossotti's role in dielectric polarization?",
          "o": [
            {
              "t": "Ottaviano Mossotti related the microscopic polarizability of matter to its macroscopic dielectric behavior, an approach later associated with the Clausius-Mossotti relation. The substation archive stores the oil-gas trend. Transformer fits.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Ottaviano Mossotti's transformer work emphasizes electrical output and relay status. The unit still carries load. Relay status appears reassuring. Nameplate limits support the view. Transformer records fit this transformer account.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Ottaviano Mossotti's transformer work supports the rating plate as sufficient evidence of healthy insulation across the expected operating range. Electrical output looks normal. Transformer practice makes the transformer view plausible.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "Ottaviano Mossotti's transformer authority supports postponing oil sampling while the energized transformer continues carrying load without a relay trip. Relay status appears reassuring. Electrical output looks normal. Transformer fits.",
              "v": "danger",
              "fb": "That shortcut hides developing insulation damage while continued loading accelerates the failure process."
            }
          ]
        },
        {
          "q": "How should a transformer engineer apply this contribution?",
          "o": [
            {
              "t": "Permittivity is not merely a catalog number; it reflects material condition and influences electric-field distribution inside insulation. The substation archive stores the oil-gas trend.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Use one electrical reading as the main indicator while treating cooling, moisture, and insulation aging as later tests. Relay status appears reassuring. Electrical output looks normal.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Assume magnetic response and dielectric strength remain stable across moisture, temperature, surface condition, and frequency. The unit still carries load. Nameplate limits support the view.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "Keep the overloaded unit online while oil and insulation condition tests remain deferred. The unit still carries load. Nameplate limits support the view. Electrical output looks normal.",
              "v": "danger",
              "fb": "That shortcut hides developing insulation damage while continued loading accelerates the failure process."
            }
          ]
        },
        {
          "q": "What does this history require from transformer asset management?",
          "o": [
            {
              "t": "The engineering lesson is that rating plates describe tested boundaries, not permission to operate indefinitely at every edge. Ambient temperature, harmonics, cooling availability, and prior aging change the margin. Transformer fits. Transformer fits.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Review load history and oil trends separately once the transformer has returned to service. Transformer context supports the view. Transformer practice makes the transformer view plausible. Transformer timing supports this transformer claim.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Attribute the fire mainly to attack or lightning rather than a long internal deterioration process. Transformer records fit this transformer account. Transformer context supports the view. Transformer timing supports this transformer claim.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "Restore load, postpone oil sampling, and treat a cleared alarm as evidence of recovered insulation. Transformer context supports the view. Transformer practice makes the transformer view plausible. Transformer timing supports this transformer claim.",
              "v": "danger",
              "fb": "That shortcut hides developing insulation damage while continued loading accelerates the failure process."
            }
          ]
        }
      ]
    },
    "tx_townsend": {
      "sci": "John Sealy Townsend (1868-1957)",
      "topic": "Gas discharge & avalanche breakdown",
      "lede": "John Sealy Townsend exposed the electromagnetic or thermal behavior hidden inside gas discharge & avalanche breakdown.",
      "no": 7,
      "profile": "The grid-equipment note for this shift studies John Sealy Townsend through gas discharge & avalanche breakdown. John Sealy Townsend explained how electrons accelerated by an electric field can ionize gas molecules and create an avalanche. Secondary processes can sustain the discharge and turn a small initiating event into breakdown. That work placed a hidden electrical, magnetic, dielectric, or thermal process inside calculations that asset engineers could compare with service evidence.\n\nA local defect becomes dangerous when the field allows ionization to multiply faster than charge can dissipate. A power transformer is simultaneously an electromagnetic device, a thermal system, a pressure vessel, and an insulation system. Load current, magnetic flux, oil condition, paper aging, cooling, moisture, and electric-field stress interact over years. A transformer explanation should connect current, flux, voltage stress, temperature, insulation condition, and cooling rather than isolating a single nameplate number.\n\nCondition monitoring looks for trends rather than one dramatic threshold. Winding and oil temperature, dissolved gases, moisture, partial discharge, load history, and relay operations can reveal different stages of deterioration. Protective relays and maintenance tests are barriers against escalation. Deferring a sample or normalizing a hot-running unit does not make the underlying chemistry stop; it merely removes the evidence from routine view. The asset chronology needs load curves, oil chemistry, temperatures, relay targets, cooling status, inspections, and deferred work on one dated line.\n\nThe engineering lesson is that rating plates describe tested boundaries, not permission to operate indefinitely at every edge. Ambient temperature, harmonics, cooling availability, and prior aging change the margin. A useful asset record joins load curves, alarms, inspections, oil analyses, repairs, and abnormal events. Separated records can make a long deterioration history look like unrelated minor observations. Cover fluency means distinguishing an external surge from an internal fault that developed over months. Relay traces, gas signatures, thermal evidence, and maintenance chronology provide that distinction.",
      "frame": "Watches the temperature panel at The Utility's Asset Office. \"Put John Sealy Townsend into flux, heat, or insulation terms I can compare with this unit.\"",
      "q": [
        {
          "q": "Which transformer-engineering account best states John Sealy Townsend's role in gas discharge & avalanche breakdown?",
          "o": [
            {
              "t": "John Sealy Townsend explained how electrons accelerated by an electric field can ionize gas molecules and create an avalanche. Dielectric evidence ties the raw temperature-linked relay target trace to insulation condition. Transformer fits.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "John Sealy Townsend's treatment of gas discharge & avalanche breakdown uses a transformer simplification: electrical output and relay status, with insulation aging and oil chemistry treated as later condition evidence. Transformer fits.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "John Sealy Townsend's transformer work supports the rating plate as sufficient evidence of healthy insulation across the expected operating range. Nameplate limits support the view. Transformer records fit this transformer account.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "John Sealy Townsend's authority is invoked in transformer practice to justify postponing oil sampling while the energized transformer continues carrying load without a relay trip. Transformer timing supports this transformer claim.",
              "v": "danger",
              "fb": "That shortcut hides developing insulation damage while continued loading accelerates the failure process."
            }
          ]
        },
        {
          "q": "How should a transformer engineer apply this contribution?",
          "o": [
            {
              "t": "A local defect becomes dangerous when the field allows ionization to multiply faster than charge can dissipate. The substation archive stores the raw relay target trace. Transformer fits.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Use one electrical reading as the main indicator while treating cooling, moisture, and insulation aging as later tests. Transformer practice makes the transformer view plausible.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Assume magnetic response and dielectric strength remain stable across moisture, temperature, surface condition, and frequency. Transformer practice makes the transformer view plausible.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "Keep the overloaded unit online while oil and insulation condition tests remain deferred. Transformer context supports the view. Transformer timing supports this transformer claim.",
              "v": "danger",
              "fb": "That shortcut hides developing insulation damage while continued loading accelerates the failure process."
            }
          ]
        },
        {
          "q": "What does this history require from transformer asset management?",
          "o": [
            {
              "t": "Cover fluency means distinguishing an external surge from an internal fault that developed over months. Relay traces, gas signatures, thermal evidence, and maintenance chronology provide that distinction. Transformer fits.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Review load history and oil trends separately once the transformer has returned to service. Nameplate limits support the view. Transformer records fit this transformer account. Transformer timing supports this transformer claim.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Attribute the fire mainly to attack or lightning rather than a long internal deterioration process. The unit still carries load. Nameplate limits support the view. Transformer timing supports this transformer claim. Transformer fits.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "Restore load, postpone oil sampling, and treat a cleared alarm as evidence of recovered insulation. Relay status appears reassuring. Transformer records fit this transformer account. Transformer timing supports this transformer claim.",
              "v": "danger",
              "fb": "That shortcut hides developing insulation damage while continued loading accelerates the failure process."
            }
          ]
        }
      ]
    },
    "tx_rogowski": {
      "sci": "Walther Rogowski (1881-1947)",
      "topic": "Dielectric field control",
      "lede": "Walther Rogowski's work on dielectric field control linked transformer design with measurable service condition.",
      "no": 8,
      "profile": "The grid-equipment note for this shift studies Walther Rogowski through dielectric field control. Walther Rogowski developed methods and electrode shapes for controlling electric fields in high-voltage apparatus. Rogowski profiles reduce field concentration at edges, helping test insulation without premature flashover caused by the fixture itself. That work placed a hidden electrical, magnetic, dielectric, or thermal process inside calculations that asset engineers could compare with service evidence.\n\nGood geometry spreads electric stress; poor geometry can create a hot spot that defeats otherwise adequate insulation. Protective relays and maintenance tests are barriers against escalation. Deferring a sample or normalizing a hot-running unit does not make the underlying chemistry stop; it merely removes the evidence from routine view. A transformer explanation should connect current, flux, voltage stress, temperature, insulation condition, and cooling rather than isolating a single nameplate number.\n\nA power transformer is simultaneously an electromagnetic device, a thermal system, a pressure vessel, and an insulation system. Load current, magnetic flux, oil condition, paper aging, cooling, moisture, and electric-field stress interact over years. Condition monitoring looks for trends rather than one dramatic threshold. Winding and oil temperature, dissolved gases, moisture, partial discharge, load history, and relay operations can reveal different stages of deterioration. The asset chronology needs load curves, oil chemistry, temperatures, relay targets, cooling status, inspections, and deferred work on one dated line.\n\nCover fluency means distinguishing an external surge from an internal fault that developed over months. Relay traces, gas signatures, thermal evidence, and maintenance chronology provide that distinction. The engineering lesson is that rating plates describe tested boundaries, not permission to operate indefinitely at every edge. Ambient temperature, harmonics, cooling availability, and prior aging change the margin. A useful asset record joins load curves, alarms, inspections, oil analyses, repairs, and abnormal events. Separated records can make a long deterioration history look like unrelated minor observations.",
      "frame": "Indicates a relay target at The Utility's Asset Office. \"A label is not a diagnosis. Explain Walther Rogowski and the measurable limit.\"",
      "q": [
        {
          "q": "Which transformer-engineering account best states Walther Rogowski's role in dielectric field control?",
          "o": [
            {
              "t": "Walther Rogowski developed methods and electrode shapes for controlling electric fields in high-voltage apparatus. Dielectric evidence ties the transformer loading archive to insulation condition. Transformer fits.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Walther Rogowski's transformer work emphasizes electrical output and relay status. Electrical output looks normal. Transformer context supports the view. Transformer timing supports this transformer claim.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Walther Rogowski's transformer work is read within transformer practice as support for the rating plate as sufficient evidence of healthy insulation across the expected operating range. The unit still carries load.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "Walther Rogowski's transformer authority supports postponing oil sampling while the energized transformer continues carrying load without a relay trip. Transformer practice makes the transformer view plausible.",
              "v": "danger",
              "fb": "That shortcut hides developing insulation damage while continued loading accelerates the failure process."
            }
          ]
        },
        {
          "q": "How should a transformer engineer apply this contribution?",
          "o": [
            {
              "t": "Good geometry spreads electric stress; poor geometry can create a hot spot that defeats otherwise adequate insulation. The transformer dossier carries the oil-gas trend. Transformer fits.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Use one electrical reading as the main indicator while treating cooling, moisture, and insulation aging as later tests. Transformer practice makes the transformer view plausible.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Assume magnetic response and dielectric strength remain stable across moisture, temperature, surface condition, and frequency. Transformer practice makes the transformer view plausible.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "Keep the overloaded unit online while oil and insulation condition tests remain deferred. Transformer context supports the view. Transformer timing supports this transformer claim.",
              "v": "danger",
              "fb": "That shortcut hides developing insulation damage while continued loading accelerates the failure process."
            }
          ]
        },
        {
          "q": "What does this history require from transformer asset management?",
          "o": [
            {
              "t": "A useful asset record joins load curves, alarms, inspections, oil analyses, repairs, and abnormal events. Separated records can make a long deterioration history look like unrelated minor observations. Transformer fits.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Review load history and oil trends separately once the transformer has returned to service. Electrical output looks normal. Transformer records fit this transformer account. Transformer timing supports this transformer claim.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Attribute the fire mainly to attack or lightning rather than a long internal deterioration process. Relay status appears reassuring. Nameplate limits support the view. Electrical output looks normal. Transformer fits.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "Restore load, postpone oil sampling, and treat a cleared alarm as evidence of recovered insulation. Nameplate limits support the view. Electrical output looks normal. Transformer timing supports this transformer claim.",
              "v": "danger",
              "fb": "That shortcut hides developing insulation damage while continued loading accelerates the failure process."
            }
          ]
        }
      ]
    },
    "tx_schmidt": {
      "sci": "Ernst Schmidt (1892-1975)",
      "topic": "Heat transfer & thermal analysis",
      "lede": "Through heat transfer & thermal analysis, Ernst Schmidt gave power engineers a calculable limit for high-voltage equipment.",
      "no": 9,
      "profile": "The grid-equipment note for this shift studies Ernst Schmidt through heat transfer & thermal analysis. Ernst Schmidt made major contributions to heat-transfer analysis and dimensionless methods used in convection. Schmidt's work helped engineers compare thermal systems by their governing ratios rather than by size alone. That work placed a hidden electrical, magnetic, dielectric, or thermal process inside calculations that asset engineers could compare with service evidence.\n\nThermal models must be checked against actual loading, cooling paths, sensor locations, and environmental conditions. Condition monitoring looks for trends rather than one dramatic threshold. Winding and oil temperature, dissolved gases, moisture, partial discharge, load history, and relay operations can reveal different stages of deterioration. A transformer explanation should connect current, flux, voltage stress, temperature, insulation condition, and cooling rather than isolating a single nameplate number.\n\nProtective relays and maintenance tests are barriers against escalation. Deferring a sample or normalizing a hot-running unit does not make the underlying chemistry stop; it merely removes the evidence from routine view. A power transformer is simultaneously an electromagnetic device, a thermal system, a pressure vessel, and an insulation system. Load current, magnetic flux, oil condition, paper aging, cooling, moisture, and electric-field stress interact over years. The asset chronology needs load curves, oil chemistry, temperatures, relay targets, cooling status, inspections, and deferred work on one dated line.\n\nSchmidt's heat-transfer analysis explains chronic internal aging. Sustained overload or impaired cooling creates winding hot spots; elevated temperature accelerates deterioration of cellulose paper, weakens dielectric strength, and generates characteristic dissolved gases and furan compounds in oil. Trends can develop long before protection trips. A history of rising hot-spot estimates and aging products, followed by an internal fault, distinguishes thermal insulation failure from a one-time lightning impulse or an external bushing track.",
      "frame": "Rolls an oil report across the desk at The Utility's Asset Office. \"Use heat transfer & thermal analysis to tell me what the transformer is doing inside.\"",
      "q": [
        {
          "q": "Which transformer-engineering account best states Ernst Schmidt's role in heat transfer & thermal analysis?",
          "o": [
            {
              "t": "Ernst Schmidt made major contributions to heat-transfer analysis and dimensionless methods used in convection. Asset specialists compare the condition-based relay target trace with transformer loading. Transformer fits. Fits.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Ernst Schmidt's transformer work relies on electrical output and relay status. Transformer context supports the view. Transformer practice makes the transformer view plausible. Transformer timing supports this transformer claim.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Ernst Schmidt's transformer work is read within transformer practice as support for the rating plate as sufficient evidence of healthy insulation across the expected operating range. Electrical output looks normal. Transformer fits.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "Ernst Schmidt's authority is invoked in transformer practice to justify postponing oil sampling while the energized transformer continues carrying load without a relay trip. The unit still carries load. Transformer fits.",
              "v": "danger",
              "fb": "That shortcut hides developing insulation damage while continued loading accelerates the failure process."
            }
          ]
        },
        {
          "q": "How should a transformer engineer apply this contribution?",
          "o": [
            {
              "t": "Thermal models must be checked against actual loading, cooling paths, sensor locations, and environmental conditions. The substation archive stores the asset-specific oil-gas trend.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Use one electrical reading as the main indicator while treating cooling, moisture, and insulation aging as later tests. The unit still carries load. Electrical output looks normal.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Assume magnetic response and dielectric strength remain stable across moisture, temperature, surface condition, and frequency. The unit still carries load. Electrical output looks normal.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "Keep the overloaded unit online while oil and insulation condition tests remain deferred. The unit still carries load. Relay status appears reassuring. Electrical output looks normal.",
              "v": "danger",
              "fb": "That shortcut hides developing insulation damage while continued loading accelerates the failure process."
            }
          ]
        },
        {
          "q": "What does this history require from transformer asset management?",
          "o": [
            {
              "t": "The engineering lesson is that rating plates describe tested boundaries, not permission to operate indefinitely at every edge. Ambient temperature, harmonics, cooling availability, and prior aging change the margin. Transformer fits. Transformer fits.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Review load history and oil trends separately once the transformer has returned to service. Transformer context supports the view. Transformer practice makes the transformer view plausible. Transformer timing supports this transformer claim.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Attribute the fire mainly to attack or lightning rather than a long internal deterioration process. Transformer records fit this transformer account. Transformer context supports the view. Transformer timing supports this transformer claim.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "Restore load, postpone oil sampling, and treat a cleared alarm as evidence of recovered insulation. Transformer context supports the view. Transformer practice makes the transformer view plausible. Transformer timing supports this transformer claim.",
              "v": "danger",
              "fb": "That shortcut hides developing insulation damage while continued loading accelerates the failure process."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "subop": {
      "yard": "Operator Nkemi meets you inside The Substation Yard & Transformer, with the scorched transformer bushings filed under cellulose evidence. \"Power equipment has a long memory; demonstrate the dossier before I discuss switching records.\"",
      "relay": "Operator Nkemi meets you inside The Relay & Control House, with the relay target sheet filed under cellulose evidence. \"Power equipment has a long memory; demonstrate the dossier before I discuss switching records.\"",
      "office": "Operator Nkemi meets you inside The Utility's Asset Office, with the load-and-maintenance archive filed under cellulose evidence. \"Power equipment has a long memory; demonstrate the dossier before I discuss switching records.\""
    },
    "oiltech": {
      "yard": "The Oil Technician meets you inside The Substation Yard & Transformer, with the scorched transformer bushings filed under cellulose evidence. \"The laboratory file stays sealed until today's dielectric lesson is clear.\"",
      "relay": "The Oil Technician meets you inside The Relay & Control House, with the relay target sheet filed under cellulose evidence. \"The laboratory file stays sealed until today's dielectric lesson is clear.\"",
      "office": "The Oil Technician meets you inside The Utility's Asset Office, with the load-and-maintenance archive filed under cellulose evidence. \"The laboratory file stays sealed until today's dielectric lesson is clear.\""
    },
    "clerk": {
      "yard": "The Clerk meets you inside The Substation Yard & Transformer, with the scorched transformer bushings filed under cellulose evidence. \"Answer from the pioneer, and the asset decisions become available for inspection.\"",
      "relay": "The Clerk meets you inside The Relay & Control House, with the relay target sheet filed under cellulose evidence. \"Answer from the pioneer, and the asset decisions become available for inspection.\"",
      "office": "The Clerk meets you inside The Utility's Asset Office, with the load-and-maintenance archive filed under cellulose evidence. \"Answer from the pioneer, and the asset decisions become available for inspection.\""
    }
  },
  "story": [
    "<b>The Aldergate Substation Fire</b> opens inside the Aldergate substation inquiry, where the visible damage is easier to describe than the chain that produced it.",
    "<b>Operator Nkemi</b>, <b>The Oil Technician</b>, and <b>The Clerk</b> each control a different slice of the record, and each conversation turns one real pioneer into a way of reading the case.",
    "Some witnesses are drawn toward <b>A lightning impulse punctured insulation in one external surge.</b>; others settle too quickly on <b>Corona discharge tracked across bushings before flashing over.</b>. Your job is to separate those tempting stories from the harder explanation the evidence supports.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide what the case is really about."
  ],
  "endings": {
    "overclaimWhat": "attack",
    "dismissalWhat": "freak",
    "win": {
      "expertTitle": "Heat Written Into Paper and Oil",
      "expert": [
        "Investigator Emun Halle names Bram Odell — utility operator, The Utility's Asset Office, and Long overheating aged paper insulation and formed fault gases. Not A lightning impulse punctured insulation in one external surge. Not Corona discharge tracked across bushings before flashing over.",
        "The readings distinguish a fast lightning impulse, external corona tracking, and chronic internal overheating through event timing, surface damage, dissolved gases, and cellulose-aging products."
      ],
      "soundTitle": "A Sound Transformer Diagnosis",
      "sound": [
        "Cellulose evidence fixes the trio: Bram Odell — utility operator; The Utility's Asset Office; Long overheating aged paper insulation and formed fault gases.",
        "Oil chemistry supports the mode; ownership of the deferral requires stronger documentary proof."
      ],
      "namedTitle": "Correct Mode, Incomplete Chain",
      "named": [
        "Cellulose evidence points to Bram Odell — utility operator, The Utility's Asset Office, and Long overheating aged paper insulation and formed fault gases; cellulose support remains incomplete.",
        "Thermal aging fits, but the oil-and-load file has not been developed far enough."
      ]
    },
    "overclaim": {
      "title": "The Lightning-Impulse Theory",
      "body": [
        "Investigator Emun Halle names A lightning impulse punctured insulation in one external surge. The surge record does not support a one-event puncture.",
        "A lightning impulse is a brief high-voltage event tied to storm or switching records and usually leaves puncture evidence along an impulse path. No corresponding surge appears in the network record."
      ]
    },
    "dismissal": {
      "title": "The Bushing-Corona Theory",
      "body": [
        "Investigator Emun Halle instead settles on Corona discharge tracked across bushings before flashing over. Bushing microscopy finds no initiating track.",
        "Corona and tracking develop on external insulation where electric fields concentrate, leaving erosion and carbonized surface paths. The bushings show fire exposure but no initiating track."
      ]
    },
    "wrongNames": {
      "title": "Right Failure, Wrong Responsibility",
      "body": [
        "Thermal insulation aging is right, but responsibility has been placed incorrectly. Reconnect oil evidence to the proper office."
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A transformer with an internal fault and bushings\"><rect x=\"170\" y=\"38\" width=\"180\" height=\"70\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><line x1=\"216\" y1=\"26\" x2=\"216\" y2=\"38\" stroke=\"#121212\" stroke-width=\"1.6\"/><line x1=\"260\" y1=\"18\" x2=\"260\" y2=\"38\" stroke=\"#121212\" stroke-width=\"1.6\"/><line x1=\"304\" y1=\"26\" x2=\"304\" y2=\"38\" stroke=\"#121212\" stroke-width=\"1.6\"/><path d=\"M242 62 l36 22 M278 62 l-36 22\" stroke=\"#B3261E\" stroke-width=\"2.2\"/><circle cx=\"260\" cy=\"74\" r=\"7\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2\"/><path d=\"M388 42 L548 42 L548 98 L388 98 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.4\"/><path d=\"M404 70 L530 70\" stroke=\"#326891\" stroke-width=\"2\"/><path d=\"M44 102 L616 102\" stroke=\"#e2e2d8\" stroke-width=\"1\"/></svg>"
}};
