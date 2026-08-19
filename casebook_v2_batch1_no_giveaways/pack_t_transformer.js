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
  "boardNarr": "You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  "placeNarr": "You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
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
        "tx_hopkinson",
        "tx_blathy"
      ],
      "oiltech": [
        "tx_zipernowsky",
        "tx_gaulard"
      ],
      "clerk": [
        "tx_deri",
        "tx_ferraris"
      ]
    },
    "relay": {
      "subop": [
        "tx_ferranti",
        "tx_weiss"
      ],
      "oiltech": [
        "tx_barkhausen",
        "tx_debye"
      ],
      "clerk": [
        "tx_mossotti",
        "tx_paschen"
      ]
    },
    "office": {
      "subop": [
        "tx_townsend",
        "tx_peek"
      ],
      "oiltech": [
        "tx_rogowski",
        "tx_stefan"
      ],
      "clerk": [
        "tx_schmidt",
        "tx_seebeck"
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
      "frame": "Operator Nkemi watches the temperature panel at The Substation Yard & Transformer. \"Put John Hopkinson into flux, heat, or insulation terms I can compare with this unit.\"",
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
    "tx_blathy": {
      "sci": "Otto Blathy (1860-1939)",
      "topic": "The ZBD transformer",
      "lede": "Through the ZBD transformer, Otto Blathy gave power engineers a calculable limit for high-voltage equipment.",
      "no": 2,
      "profile": "The grid-equipment note for this shift studies Otto Blathy through the ZBD transformer. Ottó Bláthy was one of the three engineers behind the ZBD transformer system developed at Ganz in the 1880s. He contributed closed-core transformer design and practical calculations that made parallel AC distribution efficient. That work placed a hidden electrical, magnetic, dielectric, or thermal process inside calculations that asset engineers could compare with service evidence.\n\nA transformer should deliver voltage through a well-coupled magnetic path while losses and temperature remain within the insulation system's limits. Condition monitoring looks for trends rather than one dramatic threshold. Winding and oil temperature, dissolved gases, moisture, partial discharge, load history, and relay operations can reveal different stages of deterioration. A transformer explanation should connect current, flux, voltage stress, temperature, insulation condition, and cooling rather than isolating a single nameplate number.\n\nProtective relays and maintenance tests are barriers against escalation. Deferring a sample or normalizing a hot-running unit does not make the underlying chemistry stop; it merely removes the evidence from routine view. A power transformer is simultaneously an electromagnetic device, a thermal system, a pressure vessel, and an insulation system. Load current, magnetic flux, oil condition, paper aging, cooling, moisture, and electric-field stress interact over years. The asset chronology needs load curves, oil chemistry, temperatures, relay targets, cooling status, inspections, and deferred work on one dated line.\n\nA useful asset record joins load curves, alarms, inspections, oil analyses, repairs, and abnormal events. Separated records can make a long deterioration history look like unrelated minor observations. Cover fluency means distinguishing an external surge from an internal fault that developed over months. Relay traces, gas signatures, thermal evidence, and maintenance chronology provide that distinction. The engineering lesson is that rating plates describe tested boundaries, not permission to operate indefinitely at every edge. Ambient temperature, harmonics, cooling availability, and prior aging change the margin.",
      "frame": "Operator Nkemi rolls an oil report across the desk at The Substation Yard & Transformer. \"Use the ZBD transformer to tell me what the transformer is doing inside.\"",
      "q": [
        {
          "q": "Which transformer-engineering account best states Otto Blathy's role in the ZBD transformer?",
          "o": [
            {
              "t": "Ottó Bláthy was one of the three engineers behind the ZBD transformer system developed at Ganz in the 1880s. The substation archive stores the raw condition-based winding thermal record.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Otto Blathy's transformer work emphasizes electrical output and relay status. Relay status appears reassuring. Nameplate limits support the view. Transformer records fit this transformer account.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Otto Blathy's transformer work supports the rating plate as sufficient evidence of healthy insulation across the expected operating range. Transformer practice makes the transformer view plausible.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "Otto Blathy's transformer authority supports postponing oil sampling while the energized transformer continues carrying load without a relay trip. Transformer records fit this transformer account.",
              "v": "danger",
              "fb": "That shortcut hides developing insulation damage while continued loading accelerates the failure process."
            }
          ]
        },
        {
          "q": "How should a transformer engineer apply this contribution?",
          "o": [
            {
              "t": "A transformer should deliver voltage through a well-coupled magnetic path while losses and temperature remain within the insulation system's limits. The substation archive stores the oil-gas trend. Transformer fits. Transformer fits.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Use one electrical reading as the main indicator while treating cooling, moisture, and insulation aging as later tests. Transformer records fit this transformer account. Transformer timing supports this transformer claim.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Assume magnetic response and dielectric strength remain stable across moisture, temperature, surface condition, and frequency. Transformer records fit this transformer account. Transformer timing supports this transformer claim.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "Keep the overloaded unit online while oil and insulation condition tests remain deferred. Nameplate limits support the view. Electrical output looks normal. Transformer timing supports this transformer claim. Transformer fits.",
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
    "tx_zipernowsky": {
      "sci": "Karoly Zipernowsky (1853-1942)",
      "topic": "AC distribution & the transformer",
      "lede": "Karoly Zipernowsky's work on aC distribution & the transformer linked transformer design with measurable service condition.",
      "no": 3,
      "profile": "The grid-equipment note for this shift studies Karoly Zipernowsky through aC distribution & the transformer. Károly Zipernowsky led the Ganz electrical department and, with Bláthy and Déri, developed a transformer-based AC distribution system using parallel-connected loads. That architecture allowed consumers to receive nearly constant voltage at different locations. That work placed a hidden electrical, magnetic, dielectric, or thermal process inside calculations that asset engineers could compare with service evidence.\n\nDistribution architecture matters: parallel service and suitable transformation prevent one load from dictating the condition of every other load. Protective relays and maintenance tests are barriers against escalation. Deferring a sample or normalizing a hot-running unit does not make the underlying chemistry stop; it merely removes the evidence from routine view. A transformer explanation should connect current, flux, voltage stress, temperature, insulation condition, and cooling rather than isolating a single nameplate number.\n\nA power transformer is simultaneously an electromagnetic device, a thermal system, a pressure vessel, and an insulation system. Load current, magnetic flux, oil condition, paper aging, cooling, moisture, and electric-field stress interact over years. Condition monitoring looks for trends rather than one dramatic threshold. Winding and oil temperature, dissolved gases, moisture, partial discharge, load history, and relay operations can reveal different stages of deterioration. The asset chronology needs load curves, oil chemistry, temperatures, relay targets, cooling status, inspections, and deferred work on one dated line.\n\nCover fluency means distinguishing an external surge from an internal fault that developed over months. Relay traces, gas signatures, thermal evidence, and maintenance chronology provide that distinction. The engineering lesson is that rating plates describe tested boundaries, not permission to operate indefinitely at every edge. Ambient temperature, harmonics, cooling availability, and prior aging change the margin. A useful asset record joins load curves, alarms, inspections, oil analyses, repairs, and abnormal events. Separated records can make a long deterioration history look like unrelated minor observations.",
      "frame": "The Oil Technician indicates a relay target at The Substation Yard & Transformer. \"A label is not a diagnosis. Explain Karoly Zipernowsky and the measurable limit.\"",
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
    "tx_gaulard": {
      "sci": "Lucien Gaulard (1850-1888)",
      "topic": "The early AC transformer",
      "lede": "Lucien Gaulard exposed the electromagnetic or thermal behavior hidden inside the early AC transformer.",
      "no": 4,
      "profile": "The grid-equipment note for this shift studies Lucien Gaulard through the early AC transformer. Lucien Gaulard and John Dixon Gibbs demonstrated early secondary generators for AC lighting in the 1880s. Their series-connected system showed the promise of voltage transformation, though regulation and efficiency limitations encouraged later parallel designs. That work placed a hidden electrical, magnetic, dielectric, or thermal process inside calculations that asset engineers could compare with service evidence.\n\nA promising prototype still needs system-level testing for voltage regulation, loss, heating, and behavior under changing load. A power transformer is simultaneously an electromagnetic device, a thermal system, a pressure vessel, and an insulation system. Load current, magnetic flux, oil condition, paper aging, cooling, moisture, and electric-field stress interact over years. A transformer explanation should connect current, flux, voltage stress, temperature, insulation condition, and cooling rather than isolating a single nameplate number.\n\nCondition monitoring looks for trends rather than one dramatic threshold. Winding and oil temperature, dissolved gases, moisture, partial discharge, load history, and relay operations can reveal different stages of deterioration. Protective relays and maintenance tests are barriers against escalation. Deferring a sample or normalizing a hot-running unit does not make the underlying chemistry stop; it merely removes the evidence from routine view. The asset chronology needs load curves, oil chemistry, temperatures, relay targets, cooling status, inspections, and deferred work on one dated line.\n\nThe engineering lesson is that rating plates describe tested boundaries, not permission to operate indefinitely at every edge. Ambient temperature, harmonics, cooling availability, and prior aging change the margin. A useful asset record joins load curves, alarms, inspections, oil analyses, repairs, and abnormal events. Separated records can make a long deterioration history look like unrelated minor observations. Cover fluency means distinguishing an external surge from an internal fault that developed over months. Relay traces, gas signatures, thermal evidence, and maintenance chronology provide that distinction.",
      "frame": "The Oil Technician watches the temperature panel at The Substation Yard & Transformer. \"Put Lucien Gaulard into flux, heat, or insulation terms I can compare with this unit.\"",
      "q": [
        {
          "q": "Which transformer-engineering account best states Lucien Gaulard's role in the early AC transformer?",
          "o": [
            {
              "t": "Lucien Gaulard and John Dixon Gibbs demonstrated early secondary generators for AC lighting in the 1880s. Asset specialists compare the asset-specific condition-based oil-gas trend with transformer loading.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Lucien Gaulard's treatment of the early ac transformer uses a transformer simplification: electrical output and relay status, with insulation aging and oil chemistry treated as later condition evidence. Fits.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Lucien Gaulard's transformer work is read within transformer practice as support for the rating plate as sufficient evidence of healthy insulation across the expected operating range. Nameplate limits support the view.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "Lucien Gaulard's authority is invoked in transformer practice to justify postponing oil sampling while the energized transformer continues carrying load without a relay trip. The unit still carries load. Fits.",
              "v": "danger",
              "fb": "That shortcut hides developing insulation damage while continued loading accelerates the failure process."
            }
          ]
        },
        {
          "q": "How should a transformer engineer apply this contribution?",
          "o": [
            {
              "t": "A promising prototype still needs system-level testing for voltage regulation, loss, heating, and behavior under changing load. The substation archive stores the oil-gas trend. Transformer fits. Transformer fits. Fits.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Use one electrical reading as the main indicator while treating cooling, moisture, and insulation aging as later tests. The unit still carries load. Electrical output looks normal. Transformer fits. Transformer fits. Fits.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Assume magnetic response and dielectric strength remain stable across moisture, temperature, surface condition, and frequency. The unit still carries load. Electrical output looks normal. Transformer fits. Transformer fits.",
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
    "tx_deri": {
      "sci": "Miksa Deri (1854-1938)",
      "topic": "The ZBD transformer & AC",
      "lede": "Through the ZBD transformer & AC, Miksa Deri gave power engineers a calculable limit for high-voltage equipment.",
      "no": 5,
      "profile": "The grid-equipment note for this shift studies Miksa Deri through the ZBD transformer & AC. Miksa Déri joined Zipernowsky and Bláthy in developing the ZBD transformer and practical AC distribution. His work helped replace series arrangements with parallel networks that were better suited to stable public electricity supply. That work placed a hidden electrical, magnetic, dielectric, or thermal process inside calculations that asset engineers could compare with service evidence.\n\nReliable transformation depends on both the device and the network configuration in which it operates. Condition monitoring looks for trends rather than one dramatic threshold. Winding and oil temperature, dissolved gases, moisture, partial discharge, load history, and relay operations can reveal different stages of deterioration. A transformer explanation should connect current, flux, voltage stress, temperature, insulation condition, and cooling rather than isolating a single nameplate number.\n\nProtective relays and maintenance tests are barriers against escalation. Deferring a sample or normalizing a hot-running unit does not make the underlying chemistry stop; it merely removes the evidence from routine view. A power transformer is simultaneously an electromagnetic device, a thermal system, a pressure vessel, and an insulation system. Load current, magnetic flux, oil condition, paper aging, cooling, moisture, and electric-field stress interact over years. The asset chronology needs load curves, oil chemistry, temperatures, relay targets, cooling status, inspections, and deferred work on one dated line.\n\nA useful asset record joins load curves, alarms, inspections, oil analyses, repairs, and abnormal events. Separated records can make a long deterioration history look like unrelated minor observations. Cover fluency means distinguishing an external surge from an internal fault that developed over months. Relay traces, gas signatures, thermal evidence, and maintenance chronology provide that distinction. The engineering lesson is that rating plates describe tested boundaries, not permission to operate indefinitely at every edge. Ambient temperature, harmonics, cooling availability, and prior aging change the margin.",
      "frame": "The Clerk rolls an oil report across the desk at The Substation Yard & Transformer. \"Use the ZBD transformer & AC to tell me what the transformer is doing inside.\"",
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
    "tx_ferraris": {
      "sci": "Galileo Ferraris (1847-1897)",
      "topic": "AC theory & the rotating field",
      "lede": "Galileo Ferraris's work on aC theory & the rotating field linked transformer design with measurable service condition.",
      "no": 6,
      "profile": "The grid-equipment note for this shift studies Galileo Ferraris through aC theory & the rotating field. Galileo Ferraris demonstrated that two alternating currents out of phase could create a rotating magnetic field. That principle became fundamental to induction motors and clarified how alternating fields transfer energy through magnetic coupling. That work placed a hidden electrical, magnetic, dielectric, or thermal process inside calculations that asset engineers could compare with service evidence.\n\nPhase relationships control magnetic motion and power flow, so abnormal current or flux patterns can be evidence of developing trouble. Protective relays and maintenance tests are barriers against escalation. Deferring a sample or normalizing a hot-running unit does not make the underlying chemistry stop; it merely removes the evidence from routine view. A transformer explanation should connect current, flux, voltage stress, temperature, insulation condition, and cooling rather than isolating a single nameplate number.\n\nA power transformer is simultaneously an electromagnetic device, a thermal system, a pressure vessel, and an insulation system. Load current, magnetic flux, oil condition, paper aging, cooling, moisture, and electric-field stress interact over years. Condition monitoring looks for trends rather than one dramatic threshold. Winding and oil temperature, dissolved gases, moisture, partial discharge, load history, and relay operations can reveal different stages of deterioration. The asset chronology needs load curves, oil chemistry, temperatures, relay targets, cooling status, inspections, and deferred work on one dated line.\n\nCover fluency means distinguishing an external surge from an internal fault that developed over months. Relay traces, gas signatures, thermal evidence, and maintenance chronology provide that distinction. The engineering lesson is that rating plates describe tested boundaries, not permission to operate indefinitely at every edge. Ambient temperature, harmonics, cooling availability, and prior aging change the margin. A useful asset record joins load curves, alarms, inspections, oil analyses, repairs, and abnormal events. Separated records can make a long deterioration history look like unrelated minor observations.",
      "frame": "The Clerk indicates a relay target at The Substation Yard & Transformer. \"A label is not a diagnosis. Explain Galileo Ferraris and the measurable limit.\"",
      "q": [
        {
          "q": "Which transformer-engineering account best states Galileo Ferraris's role in aC theory & the rotating field?",
          "o": [
            {
              "t": "Galileo Ferraris demonstrated that two alternating currents out of phase could create a rotating magnetic field. Grid review keeps the raw condition-based winding thermal record available for diagnosis. Transformer fits. Transformer fits.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Galileo Ferraris's transformer work relies on electrical output and relay status. Transformer records fit this transformer account. Transformer practice makes the transformer view plausible. Transformer timing supports this transformer claim.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Galileo Ferraris's transformer work is read within transformer practice as support for the rating plate as sufficient evidence of healthy insulation across the expected operating range. The unit still carries load. Transformer fits. Transformer fits.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "Galileo Ferraris's transformer authority supports postponing oil sampling while the energized transformer continues carrying load without a relay trip. Transformer practice makes the transformer view plausible. Transformer fits. Transformer fits.",
              "v": "danger",
              "fb": "That shortcut hides developing insulation damage while continued loading accelerates the failure process."
            }
          ]
        },
        {
          "q": "How should a transformer engineer apply this contribution?",
          "o": [
            {
              "t": "Phase relationships control magnetic motion and power flow, so abnormal current or flux patterns can be evidence of developing trouble. The substation archive stores the oil-gas trend.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Use one electrical reading as the main indicator while treating cooling, moisture, and insulation aging as later tests. The unit still carries load. Nameplate limits support the view.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Assume magnetic response and dielectric strength remain stable across moisture, temperature, surface condition, and frequency. The unit still carries load. Relay status appears reassuring.",
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
    "tx_ferranti": {
      "sci": "Sebastian Ziani de Ferranti (1864-1930)",
      "topic": "High-voltage AC & the Ferranti effect",
      "lede": "Sebastian Ziani de Ferranti exposed the electromagnetic or thermal behavior hidden inside high-voltage AC & the Ferranti effect.",
      "no": 7,
      "profile": "The grid-equipment note for this shift studies Sebastian Ziani de Ferranti through high-voltage AC & the Ferranti effect. Sebastian Ziani de Ferranti designed high-voltage AC generating and distribution systems, including the pioneering Deptford station. The Ferranti effect describes how a lightly loaded long AC line can have a receiving-end voltage higher than the sending-end voltage. That work placed a hidden electrical, magnetic, dielectric, or thermal process inside calculations that asset engineers could compare with service evidence.\n\nVoltage can rise as well as fall under abnormal network conditions, making load state and reactive behavior essential to insulation protection. A power transformer is simultaneously an electromagnetic device, a thermal system, a pressure vessel, and an insulation system. Load current, magnetic flux, oil condition, paper aging, cooling, moisture, and electric-field stress interact over years. A transformer explanation should connect current, flux, voltage stress, temperature, insulation condition, and cooling rather than isolating a single nameplate number.\n\nCondition monitoring looks for trends rather than one dramatic threshold. Winding and oil temperature, dissolved gases, moisture, partial discharge, load history, and relay operations can reveal different stages of deterioration. Protective relays and maintenance tests are barriers against escalation. Deferring a sample or normalizing a hot-running unit does not make the underlying chemistry stop; it merely removes the evidence from routine view. The asset chronology needs load curves, oil chemistry, temperatures, relay targets, cooling status, inspections, and deferred work on one dated line.\n\nFerranti's high-voltage work helps define the lightning-impulse hypothesis. A fast surge places steep voltage stress across winding and bushing insulation, often coinciding with a recorded lightning or switching event and leaving a localized puncture path. Surge arresters and relay records provide independent timing. Slow temperature rise, cellulose degradation, and fault gases accumulating before the fire do not fit a single external impulse, however dramatic the final flashover appears.",
      "frame": "Operator Nkemi watches the temperature panel at The Relay & Control House. \"Put Sebastian Ziani de Ferranti into flux, heat, or insulation terms I can compare with this unit.\"",
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
    "tx_weiss": {
      "sci": "Pierre Weiss (1865-1940)",
      "topic": "Ferromagnetism & magnetic domains",
      "lede": "Through ferromagnetism & magnetic domains, Pierre Weiss gave power engineers a calculable limit for high-voltage equipment.",
      "no": 8,
      "profile": "The grid-equipment note for this shift studies Pierre Weiss through ferromagnetism & magnetic domains. Pierre Weiss proposed that ferromagnetic materials contain interacting regions that align, an idea that developed into magnetic-domain theory. He also introduced the molecular-field concept to explain collective magnetization. That work placed a hidden electrical, magnetic, dielectric, or thermal process inside calculations that asset engineers could compare with service evidence.\n\nCore materials respond nonlinearly and retain magnetic history, so flux density, losses, and temperature cannot be inferred from current alone. Condition monitoring looks for trends rather than one dramatic threshold. Winding and oil temperature, dissolved gases, moisture, partial discharge, load history, and relay operations can reveal different stages of deterioration. A transformer explanation should connect current, flux, voltage stress, temperature, insulation condition, and cooling rather than isolating a single nameplate number.\n\nProtective relays and maintenance tests are barriers against escalation. Deferring a sample or normalizing a hot-running unit does not make the underlying chemistry stop; it merely removes the evidence from routine view. A power transformer is simultaneously an electromagnetic device, a thermal system, a pressure vessel, and an insulation system. Load current, magnetic flux, oil condition, paper aging, cooling, moisture, and electric-field stress interact over years. The asset chronology needs load curves, oil chemistry, temperatures, relay targets, cooling status, inspections, and deferred work on one dated line.\n\nA useful asset record joins load curves, alarms, inspections, oil analyses, repairs, and abnormal events. Separated records can make a long deterioration history look like unrelated minor observations. Cover fluency means distinguishing an external surge from an internal fault that developed over months. Relay traces, gas signatures, thermal evidence, and maintenance chronology provide that distinction. The engineering lesson is that rating plates describe tested boundaries, not permission to operate indefinitely at every edge. Ambient temperature, harmonics, cooling availability, and prior aging change the margin.",
      "frame": "Operator Nkemi rolls an oil report across the desk at The Relay & Control House. \"Use ferromagnetism & magnetic domains to tell me what the transformer is doing inside.\"",
      "q": [
        {
          "q": "Which transformer-engineering account best states Pierre Weiss's role in ferromagnetism & magnetic domains?",
          "o": [
            {
              "t": "Pierre Weiss proposed that ferromagnetic materials contain interacting regions that align, an idea that developed into magnetic-domain theory. The substation archive stores the raw dated oil-gas trend. Transformer fits.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Pierre Weiss's transformer work emphasizes electrical output and relay status. Transformer context supports the view. Transformer practice makes the transformer view plausible. Transformer timing supports this transformer claim.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Pierre Weiss's transformer work is read within transformer practice as support for the rating plate as sufficient evidence of healthy insulation across the expected operating range. Electrical output looks normal. Transformer fits.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "Pierre Weiss's authority is invoked in transformer practice to justify postponing oil sampling while the energized transformer continues carrying load without a relay trip. The unit still carries load. Transformer fits.",
              "v": "danger",
              "fb": "That shortcut hides developing insulation damage while continued loading accelerates the failure process."
            }
          ]
        },
        {
          "q": "How should a transformer engineer apply this contribution?",
          "o": [
            {
              "t": "Core materials respond nonlinearly and retain magnetic history, so flux density, losses, and temperature cannot be inferred from current alone. The substation archive stores the oil-gas trend. Transformer fits.",
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
    "tx_barkhausen": {
      "sci": "Heinrich Barkhausen (1881-1956)",
      "topic": "Magnetization & core losses",
      "lede": "Heinrich Barkhausen's work on magnetization & core losses linked transformer design with measurable service condition.",
      "no": 9,
      "profile": "The grid-equipment note for this shift studies Heinrich Barkhausen through magnetization & core losses. Heinrich Barkhausen detected small jumps in magnetization as magnetic domains moved, producing the Barkhausen effect. The observation showed that magnetization changes through discrete microscopic events rather than a perfectly smooth process. That work placed a hidden electrical, magnetic, dielectric, or thermal process inside calculations that asset engineers could compare with service evidence.\n\nChanging magnetic domains dissipate energy and can reveal material stress or degradation when measured with suitable methods. Protective relays and maintenance tests are barriers against escalation. Deferring a sample or normalizing a hot-running unit does not make the underlying chemistry stop; it merely removes the evidence from routine view. A transformer explanation should connect current, flux, voltage stress, temperature, insulation condition, and cooling rather than isolating a single nameplate number.\n\nA power transformer is simultaneously an electromagnetic device, a thermal system, a pressure vessel, and an insulation system. Load current, magnetic flux, oil condition, paper aging, cooling, moisture, and electric-field stress interact over years. Condition monitoring looks for trends rather than one dramatic threshold. Winding and oil temperature, dissolved gases, moisture, partial discharge, load history, and relay operations can reveal different stages of deterioration. The asset chronology needs load curves, oil chemistry, temperatures, relay targets, cooling status, inspections, and deferred work on one dated line.\n\nCover fluency means distinguishing an external surge from an internal fault that developed over months. Relay traces, gas signatures, thermal evidence, and maintenance chronology provide that distinction. The engineering lesson is that rating plates describe tested boundaries, not permission to operate indefinitely at every edge. Ambient temperature, harmonics, cooling availability, and prior aging change the margin. A useful asset record joins load curves, alarms, inspections, oil analyses, repairs, and abnormal events. Separated records can make a long deterioration history look like unrelated minor observations.",
      "frame": "The Oil Technician indicates a relay target at The Relay & Control House. \"A label is not a diagnosis. Explain Heinrich Barkhausen and the measurable limit.\"",
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
    "tx_debye": {
      "sci": "Peter Debye (1884-1966)",
      "topic": "Dielectrics & polarization",
      "lede": "Peter Debye exposed the electromagnetic or thermal behavior hidden inside dielectrics & polarization.",
      "no": 10,
      "profile": "The grid-equipment note for this shift studies Peter Debye through dielectrics & polarization. Peter Debye developed a molecular account of dielectric polarization and relaxation. His model explains why dipoles do not follow a changing electric field instantly and why dielectric loss depends on frequency and temperature. That work placed a hidden electrical, magnetic, dielectric, or thermal process inside calculations that asset engineers could compare with service evidence.\n\nInsulating materials can heat through dielectric loss, especially when moisture, temperature, or electric stress changes their response. A power transformer is simultaneously an electromagnetic device, a thermal system, a pressure vessel, and an insulation system. Load current, magnetic flux, oil condition, paper aging, cooling, moisture, and electric-field stress interact over years. A transformer explanation should connect current, flux, voltage stress, temperature, insulation condition, and cooling rather than isolating a single nameplate number.\n\nCondition monitoring looks for trends rather than one dramatic threshold. Winding and oil temperature, dissolved gases, moisture, partial discharge, load history, and relay operations can reveal different stages of deterioration. Protective relays and maintenance tests are barriers against escalation. Deferring a sample or normalizing a hot-running unit does not make the underlying chemistry stop; it merely removes the evidence from routine view. The asset chronology needs load curves, oil chemistry, temperatures, relay targets, cooling status, inspections, and deferred work on one dated line.\n\nThe engineering lesson is that rating plates describe tested boundaries, not permission to operate indefinitely at every edge. Ambient temperature, harmonics, cooling availability, and prior aging change the margin. A useful asset record joins load curves, alarms, inspections, oil analyses, repairs, and abnormal events. Separated records can make a long deterioration history look like unrelated minor observations. Cover fluency means distinguishing an external surge from an internal fault that developed over months. Relay traces, gas signatures, thermal evidence, and maintenance chronology provide that distinction.",
      "frame": "The Oil Technician watches the temperature panel at The Relay & Control House. \"Put Peter Debye into flux, heat, or insulation terms I can compare with this unit.\"",
      "q": [
        {
          "q": "Which transformer-engineering account best states Peter Debye's role in dielectrics & polarization?",
          "o": [
            {
              "t": "Peter Debye developed a molecular account of dielectric polarization and relaxation. Asset specialists compare the dated temperature-linked oil-lab verified winding thermal record with transformer loading. Transformer fits.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Peter Debye's treatment of dielectrics & polarization uses a transformer simplification: electrical output and relay status, with insulation aging and oil chemistry treated as later condition evidence. Transformer fits.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Peter Debye's transformer work is read within transformer practice as support for the rating plate as sufficient evidence of healthy insulation across the expected operating range. Transformer records fit this transformer account.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "Peter Debye's authority is invoked in transformer practice to justify postponing oil sampling while the energized transformer continues carrying load without a relay trip. The unit still carries load. Transformer fits.",
              "v": "danger",
              "fb": "That shortcut hides developing insulation damage while continued loading accelerates the failure process."
            }
          ]
        },
        {
          "q": "How should a transformer engineer apply this contribution?",
          "o": [
            {
              "t": "Insulating materials can heat through dielectric loss, especially when moisture, temperature, or electric stress changes their response. The substation archive stores the oil-gas trend.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Use one electrical reading as the main indicator while treating cooling, moisture, and insulation aging as later tests. The unit still carries load. Nameplate limits support the view.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Assume magnetic response and dielectric strength remain stable across moisture, temperature, surface condition, and frequency. The unit still carries load. Nameplate limits support the view.",
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
    "tx_mossotti": {
      "sci": "Ottaviano Mossotti (1791-1863)",
      "topic": "Dielectric polarization",
      "lede": "Through dielectric polarization, Ottaviano Mossotti gave power engineers a calculable limit for high-voltage equipment.",
      "no": 11,
      "profile": "The grid-equipment note for this shift studies Ottaviano Mossotti through dielectric polarization. Ottaviano Mossotti related the microscopic polarizability of matter to its macroscopic dielectric behavior, an approach later associated with the Clausius-Mossotti relation. It linked molecular response with measurable permittivity. That work placed a hidden electrical, magnetic, dielectric, or thermal process inside calculations that asset engineers could compare with service evidence.\n\nPermittivity is not merely a catalog number; it reflects material condition and influences electric-field distribution inside insulation. Condition monitoring looks for trends rather than one dramatic threshold. Winding and oil temperature, dissolved gases, moisture, partial discharge, load history, and relay operations can reveal different stages of deterioration. A transformer explanation should connect current, flux, voltage stress, temperature, insulation condition, and cooling rather than isolating a single nameplate number.\n\nProtective relays and maintenance tests are barriers against escalation. Deferring a sample or normalizing a hot-running unit does not make the underlying chemistry stop; it merely removes the evidence from routine view. A power transformer is simultaneously an electromagnetic device, a thermal system, a pressure vessel, and an insulation system. Load current, magnetic flux, oil condition, paper aging, cooling, moisture, and electric-field stress interact over years. The asset chronology needs load curves, oil chemistry, temperatures, relay targets, cooling status, inspections, and deferred work on one dated line.\n\nA useful asset record joins load curves, alarms, inspections, oil analyses, repairs, and abnormal events. Separated records can make a long deterioration history look like unrelated minor observations. Cover fluency means distinguishing an external surge from an internal fault that developed over months. Relay traces, gas signatures, thermal evidence, and maintenance chronology provide that distinction. The engineering lesson is that rating plates describe tested boundaries, not permission to operate indefinitely at every edge. Ambient temperature, harmonics, cooling availability, and prior aging change the margin.",
      "frame": "The Clerk rolls an oil report across the desk at The Relay & Control House. \"Use dielectric polarization to tell me what the transformer is doing inside.\"",
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
    "tx_paschen": {
      "sci": "Friedrich Paschen (1865-1947)",
      "topic": "Gas breakdown & Paschen's law",
      "lede": "Friedrich Paschen's work on gas breakdown & Paschen's law linked transformer design with measurable service condition.",
      "no": 12,
      "profile": "The grid-equipment note for this shift studies Friedrich Paschen through gas breakdown & Paschen's law. Friedrich Paschen measured electrical breakdown in gases and found that breakdown voltage depends mainly on the product of gas pressure and gap distance. Paschen's law explains why neither a very small gap nor low pressure automatically guarantees safety. That work placed a hidden electrical, magnetic, dielectric, or thermal process inside calculations that asset engineers could compare with service evidence.\n\nClearance, pressure, gas composition, and field shape jointly determine whether an arc can start. Protective relays and maintenance tests are barriers against escalation. Deferring a sample or normalizing a hot-running unit does not make the underlying chemistry stop; it merely removes the evidence from routine view. A transformer explanation should connect current, flux, voltage stress, temperature, insulation condition, and cooling rather than isolating a single nameplate number.\n\nA power transformer is simultaneously an electromagnetic device, a thermal system, a pressure vessel, and an insulation system. Load current, magnetic flux, oil condition, paper aging, cooling, moisture, and electric-field stress interact over years. Condition monitoring looks for trends rather than one dramatic threshold. Winding and oil temperature, dissolved gases, moisture, partial discharge, load history, and relay operations can reveal different stages of deterioration. The asset chronology needs load curves, oil chemistry, temperatures, relay targets, cooling status, inspections, and deferred work on one dated line.\n\nCover fluency means distinguishing an external surge from an internal fault that developed over months. Relay traces, gas signatures, thermal evidence, and maintenance chronology provide that distinction. The engineering lesson is that rating plates describe tested boundaries, not permission to operate indefinitely at every edge. Ambient temperature, harmonics, cooling availability, and prior aging change the margin. A useful asset record joins load curves, alarms, inspections, oil analyses, repairs, and abnormal events. Separated records can make a long deterioration history look like unrelated minor observations.",
      "frame": "The Clerk indicates a relay target at The Relay & Control House. \"A label is not a diagnosis. Explain Friedrich Paschen and the measurable limit.\"",
      "q": [
        {
          "q": "Which transformer-engineering account best states Friedrich Paschen's role in gas breakdown & Paschen's law?",
          "o": [
            {
              "t": "Friedrich Paschen measured electrical breakdown in gases and found that breakdown voltage depends mainly on the product of gas pressure and gap distance. The substation archive stores the oil-gas trend. Transformer fits. Fits.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Friedrich Paschen's transformer work emphasizes electrical output and relay status. Transformer records fit this transformer account. Transformer context supports the view. Transformer timing supports this transformer claim.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Friedrich Paschen's transformer work is read within transformer practice as support for the rating plate as sufficient evidence of healthy insulation across the expected operating range. The unit still carries load. Transformer fits.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "Friedrich Paschen's transformer authority supports postponing oil sampling while the energized transformer continues carrying load without a relay trip. Transformer practice makes the transformer view plausible. Transformer fits.",
              "v": "danger",
              "fb": "That shortcut hides developing insulation damage while continued loading accelerates the failure process."
            }
          ]
        },
        {
          "q": "How should a transformer engineer apply this contribution?",
          "o": [
            {
              "t": "Clearance, pressure, gas composition, and field shape jointly determine whether an arc can start. Dielectric evidence ties the raw oil-gas trend to insulation condition. Transformer fits.",
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
    "tx_townsend": {
      "sci": "John Sealy Townsend (1868-1957)",
      "topic": "Gas discharge & avalanche breakdown",
      "lede": "John Sealy Townsend exposed the electromagnetic or thermal behavior hidden inside gas discharge & avalanche breakdown.",
      "no": 13,
      "profile": "The grid-equipment note for this shift studies John Sealy Townsend through gas discharge & avalanche breakdown. John Sealy Townsend explained how electrons accelerated by an electric field can ionize gas molecules and create an avalanche. Secondary processes can sustain the discharge and turn a small initiating event into breakdown. That work placed a hidden electrical, magnetic, dielectric, or thermal process inside calculations that asset engineers could compare with service evidence.\n\nA local defect becomes dangerous when the field allows ionization to multiply faster than charge can dissipate. A power transformer is simultaneously an electromagnetic device, a thermal system, a pressure vessel, and an insulation system. Load current, magnetic flux, oil condition, paper aging, cooling, moisture, and electric-field stress interact over years. A transformer explanation should connect current, flux, voltage stress, temperature, insulation condition, and cooling rather than isolating a single nameplate number.\n\nCondition monitoring looks for trends rather than one dramatic threshold. Winding and oil temperature, dissolved gases, moisture, partial discharge, load history, and relay operations can reveal different stages of deterioration. Protective relays and maintenance tests are barriers against escalation. Deferring a sample or normalizing a hot-running unit does not make the underlying chemistry stop; it merely removes the evidence from routine view. The asset chronology needs load curves, oil chemistry, temperatures, relay targets, cooling status, inspections, and deferred work on one dated line.\n\nThe engineering lesson is that rating plates describe tested boundaries, not permission to operate indefinitely at every edge. Ambient temperature, harmonics, cooling availability, and prior aging change the margin. A useful asset record joins load curves, alarms, inspections, oil analyses, repairs, and abnormal events. Separated records can make a long deterioration history look like unrelated minor observations. Cover fluency means distinguishing an external surge from an internal fault that developed over months. Relay traces, gas signatures, thermal evidence, and maintenance chronology provide that distinction.",
      "frame": "Operator Nkemi watches the temperature panel at The Utility's Asset Office. \"Put John Sealy Townsend into flux, heat, or insulation terms I can compare with this unit.\"",
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
    "tx_peek": {
      "sci": "Frank W. Peek (1881-1933)",
      "topic": "Corona & dielectric breakdown",
      "lede": "Through corona & dielectric breakdown, Frank W. Peek gave power engineers a calculable limit for high-voltage equipment.",
      "no": 14,
      "profile": "The grid-equipment note for this shift studies Frank W. Peek through corona & dielectric breakdown. Frank W. Peek studied corona, insulation, and high-voltage breakdown on transmission equipment. Peek's empirical work connected conductor size, surface condition, air density, and electric stress with the onset of visible corona. That work placed a hidden electrical, magnetic, dielectric, or thermal process inside calculations that asset engineers could compare with service evidence.\n\nSharp points, contamination, and rough surfaces intensify fields, making localized discharge an early warning rather than harmless light. Condition monitoring looks for trends rather than one dramatic threshold. Winding and oil temperature, dissolved gases, moisture, partial discharge, load history, and relay operations can reveal different stages of deterioration. A transformer explanation should connect current, flux, voltage stress, temperature, insulation condition, and cooling rather than isolating a single nameplate number.\n\nProtective relays and maintenance tests are barriers against escalation. Deferring a sample or normalizing a hot-running unit does not make the underlying chemistry stop; it merely removes the evidence from routine view. A power transformer is simultaneously an electromagnetic device, a thermal system, a pressure vessel, and an insulation system. Load current, magnetic flux, oil condition, paper aging, cooling, moisture, and electric-field stress interact over years. The asset chronology needs load curves, oil chemistry, temperatures, relay targets, cooling status, inspections, and deferred work on one dated line.\n\nPeek's corona studies identify the external-flashover alternative. Strong electric fields ionize air around conductors and bushings, producing corona, audible or ultraviolet activity, erosion, and eventually a carbonized tracking path across contaminated insulation. The evidence should begin on the bushing surface and follow the field geometry. Soot deposited after a tank fire can resemble tracking, so microscopy and pre-event inspection records must show that the surface path preceded the internal fault.",
      "frame": "Operator Nkemi rolls an oil report across the desk at The Utility's Asset Office. \"Use corona & dielectric breakdown to tell me what the transformer is doing inside.\"",
      "q": [
        {
          "q": "Which transformer-engineering account best states Frank W. Peek's role in corona & dielectric breakdown?",
          "o": [
            {
              "t": "Frank W. Grid review keeps the winding thermal record available for diagnosis. The substation archive stores the winding thermal record. The substation archive stores the raw winding thermal record. Transformer fits. Fits.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Frank W. Peek's transformer work emphasizes electrical output and relay status. Transformer records fit this transformer account. Transformer context supports the view. Transformer timing supports this transformer claim.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Frank W. Peek's transformer work is read within transformer practice as support for the rating plate as sufficient evidence of healthy insulation across the expected operating range. The unit still carries load. Transformer fits.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "Frank W. Peek's transformer authority supports postponing oil sampling while the energized transformer continues carrying load without a relay trip. Transformer practice makes the transformer view plausible. Transformer fits.",
              "v": "danger",
              "fb": "That shortcut hides developing insulation damage while continued loading accelerates the failure process."
            }
          ]
        },
        {
          "q": "How should a transformer engineer apply this contribution?",
          "o": [
            {
              "t": "Sharp points, contamination, and rough surfaces intensify fields, making localized discharge an early warning rather than harmless light. The substation archive stores the oil-gas trend.",
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
    "tx_rogowski": {
      "sci": "Walther Rogowski (1881-1947)",
      "topic": "Dielectric field control",
      "lede": "Walther Rogowski's work on dielectric field control linked transformer design with measurable service condition.",
      "no": 15,
      "profile": "The grid-equipment note for this shift studies Walther Rogowski through dielectric field control. Walther Rogowski developed methods and electrode shapes for controlling electric fields in high-voltage apparatus. Rogowski profiles reduce field concentration at edges, helping test insulation without premature flashover caused by the fixture itself. That work placed a hidden electrical, magnetic, dielectric, or thermal process inside calculations that asset engineers could compare with service evidence.\n\nGood geometry spreads electric stress; poor geometry can create a hot spot that defeats otherwise adequate insulation. Protective relays and maintenance tests are barriers against escalation. Deferring a sample or normalizing a hot-running unit does not make the underlying chemistry stop; it merely removes the evidence from routine view. A transformer explanation should connect current, flux, voltage stress, temperature, insulation condition, and cooling rather than isolating a single nameplate number.\n\nA power transformer is simultaneously an electromagnetic device, a thermal system, a pressure vessel, and an insulation system. Load current, magnetic flux, oil condition, paper aging, cooling, moisture, and electric-field stress interact over years. Condition monitoring looks for trends rather than one dramatic threshold. Winding and oil temperature, dissolved gases, moisture, partial discharge, load history, and relay operations can reveal different stages of deterioration. The asset chronology needs load curves, oil chemistry, temperatures, relay targets, cooling status, inspections, and deferred work on one dated line.\n\nCover fluency means distinguishing an external surge from an internal fault that developed over months. Relay traces, gas signatures, thermal evidence, and maintenance chronology provide that distinction. The engineering lesson is that rating plates describe tested boundaries, not permission to operate indefinitely at every edge. Ambient temperature, harmonics, cooling availability, and prior aging change the margin. A useful asset record joins load curves, alarms, inspections, oil analyses, repairs, and abnormal events. Separated records can make a long deterioration history look like unrelated minor observations.",
      "frame": "The Oil Technician indicates a relay target at The Utility's Asset Office. \"A label is not a diagnosis. Explain Walther Rogowski and the measurable limit.\"",
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
    "tx_stefan": {
      "sci": "Josef Stefan (1835-1893)",
      "topic": "Thermal radiation & heat loss",
      "lede": "Josef Stefan exposed the electromagnetic or thermal behavior hidden inside thermal radiation & heat loss.",
      "no": 16,
      "profile": "The grid-equipment note for this shift studies Josef Stefan through thermal radiation & heat loss. Josef Stefan established the relation between thermal radiation and the fourth power of absolute temperature, later given a theoretical foundation by Boltzmann. The Stefan-Boltzmann law quantifies how hot surfaces radiate energy. That work placed a hidden electrical, magnetic, dielectric, or thermal process inside calculations that asset engineers could compare with service evidence.\n\nTemperature rise changes heat rejection strongly, but a sealed transformer also depends on conduction, convection, oil flow, and ambient conditions. A power transformer is simultaneously an electromagnetic device, a thermal system, a pressure vessel, and an insulation system. Load current, magnetic flux, oil condition, paper aging, cooling, moisture, and electric-field stress interact over years. A transformer explanation should connect current, flux, voltage stress, temperature, insulation condition, and cooling rather than isolating a single nameplate number.\n\nCondition monitoring looks for trends rather than one dramatic threshold. Winding and oil temperature, dissolved gases, moisture, partial discharge, load history, and relay operations can reveal different stages of deterioration. Protective relays and maintenance tests are barriers against escalation. Deferring a sample or normalizing a hot-running unit does not make the underlying chemistry stop; it merely removes the evidence from routine view. The asset chronology needs load curves, oil chemistry, temperatures, relay targets, cooling status, inspections, and deferred work on one dated line.\n\nThe engineering lesson is that rating plates describe tested boundaries, not permission to operate indefinitely at every edge. Ambient temperature, harmonics, cooling availability, and prior aging change the margin. A useful asset record joins load curves, alarms, inspections, oil analyses, repairs, and abnormal events. Separated records can make a long deterioration history look like unrelated minor observations. Cover fluency means distinguishing an external surge from an internal fault that developed over months. Relay traces, gas signatures, thermal evidence, and maintenance chronology provide that distinction.",
      "frame": "The Oil Technician watches the temperature panel at The Utility's Asset Office. \"Put Josef Stefan into flux, heat, or insulation terms I can compare with this unit.\"",
      "q": [
        {
          "q": "Which transformer-engineering account best states Josef Stefan's role in thermal radiation & heat loss?",
          "o": [
            {
              "t": "Josef Stefan established the relation between thermal radiation and the fourth power of absolute temperature, later given a theoretical foundation by Boltzmann. The substation archive stores the oil-gas trend. Transformer fits.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Josef Stefan's treatment of thermal radiation & heat loss uses a transformer simplification: electrical output and relay status, with insulation aging and oil chemistry treated as later condition evidence. Transformer fits.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Josef Stefan's transformer work supports the rating plate as sufficient evidence of healthy insulation across the expected operating range. The unit still carries load. Transformer records fit this transformer account.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "Josef Stefan's authority is invoked in transformer practice to justify postponing oil sampling while the energized transformer continues carrying load without a relay trip. Relay status appears reassuring. Transformer fits.",
              "v": "danger",
              "fb": "That shortcut hides developing insulation damage while continued loading accelerates the failure process."
            }
          ]
        },
        {
          "q": "How should a transformer engineer apply this contribution?",
          "o": [
            {
              "t": "Temperature rise changes heat rejection strongly, but a sealed transformer also depends on conduction, convection, oil flow, and ambient conditions. The substation archive stores the oil-gas trend. Transformer fits. Transformer fits.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Use one electrical reading as the main indicator while treating cooling, moisture, and insulation aging as later tests. Transformer records fit this transformer account. Transformer timing supports this transformer claim.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Assume magnetic response and dielectric strength remain stable across moisture, temperature, surface condition, and frequency. Transformer records fit this transformer account. Transformer timing supports this transformer claim.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "Keep the overloaded unit online while oil and insulation condition tests remain deferred. Nameplate limits support the view. Electrical output looks normal. Transformer timing supports this transformer claim. Transformer fits.",
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
    "tx_schmidt": {
      "sci": "Ernst Schmidt (1892-1975)",
      "topic": "Heat transfer & thermal analysis",
      "lede": "Through heat transfer & thermal analysis, Ernst Schmidt gave power engineers a calculable limit for high-voltage equipment.",
      "no": 17,
      "profile": "The grid-equipment note for this shift studies Ernst Schmidt through heat transfer & thermal analysis. Ernst Schmidt made major contributions to heat-transfer analysis and dimensionless methods used in convection. Schmidt's work helped engineers compare thermal systems by their governing ratios rather than by size alone. That work placed a hidden electrical, magnetic, dielectric, or thermal process inside calculations that asset engineers could compare with service evidence.\n\nThermal models must be checked against actual loading, cooling paths, sensor locations, and environmental conditions. Condition monitoring looks for trends rather than one dramatic threshold. Winding and oil temperature, dissolved gases, moisture, partial discharge, load history, and relay operations can reveal different stages of deterioration. A transformer explanation should connect current, flux, voltage stress, temperature, insulation condition, and cooling rather than isolating a single nameplate number.\n\nProtective relays and maintenance tests are barriers against escalation. Deferring a sample or normalizing a hot-running unit does not make the underlying chemistry stop; it merely removes the evidence from routine view. A power transformer is simultaneously an electromagnetic device, a thermal system, a pressure vessel, and an insulation system. Load current, magnetic flux, oil condition, paper aging, cooling, moisture, and electric-field stress interact over years. The asset chronology needs load curves, oil chemistry, temperatures, relay targets, cooling status, inspections, and deferred work on one dated line.\n\nSchmidt's heat-transfer analysis explains chronic internal aging. Sustained overload or impaired cooling creates winding hot spots; elevated temperature accelerates deterioration of cellulose paper, weakens dielectric strength, and generates characteristic dissolved gases and furan compounds in oil. Trends can develop long before protection trips. A history of rising hot-spot estimates and aging products, followed by an internal fault, distinguishes thermal insulation failure from a one-time lightning impulse or an external bushing track.",
      "frame": "The Clerk rolls an oil report across the desk at The Utility's Asset Office. \"Use heat transfer & thermal analysis to tell me what the transformer is doing inside.\"",
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
    },
    "tx_seebeck": {
      "sci": "Thomas Johann Seebeck (1770-1831)",
      "topic": "Thermoelectric hot-spot sensing",
      "lede": "Thomas Johann Seebeck's work on thermoelectric hot-spot sensing linked transformer design with measurable service condition.",
      "no": 18,
      "profile": "The grid-equipment note for this shift studies Thomas Johann Seebeck through thermoelectric hot-spot sensing. Thomas Johann Seebeck discovered that a circuit made from dissimilar conductors produces a voltage when its junctions are at different temperatures. The Seebeck effect is the basis of thermocouples used to sense equipment hot spots. That work placed a hidden electrical, magnetic, dielectric, or thermal process inside calculations that asset engineers could compare with service evidence.\n\nA temperature sensor is trustworthy only when its junction, wiring, reference, placement, and calibration are intact. Protective relays and maintenance tests are barriers against escalation. Deferring a sample or normalizing a hot-running unit does not make the underlying chemistry stop; it merely removes the evidence from routine view. A transformer explanation should connect current, flux, voltage stress, temperature, insulation condition, and cooling rather than isolating a single nameplate number.\n\nA power transformer is simultaneously an electromagnetic device, a thermal system, a pressure vessel, and an insulation system. Load current, magnetic flux, oil condition, paper aging, cooling, moisture, and electric-field stress interact over years. Condition monitoring looks for trends rather than one dramatic threshold. Winding and oil temperature, dissolved gases, moisture, partial discharge, load history, and relay operations can reveal different stages of deterioration. The asset chronology needs load curves, oil chemistry, temperatures, relay targets, cooling status, inspections, and deferred work on one dated line.\n\nCover fluency means distinguishing an external surge from an internal fault that developed over months. Relay traces, gas signatures, thermal evidence, and maintenance chronology provide that distinction. The engineering lesson is that rating plates describe tested boundaries, not permission to operate indefinitely at every edge. Ambient temperature, harmonics, cooling availability, and prior aging change the margin. A useful asset record joins load curves, alarms, inspections, oil analyses, repairs, and abnormal events. Separated records can make a long deterioration history look like unrelated minor observations.",
      "frame": "The Clerk indicates a relay target at The Utility's Asset Office. \"A label is not a diagnosis. Explain Thomas Johann Seebeck and the measurable limit.\"",
      "q": [
        {
          "q": "Which transformer-engineering account best states Thomas Johann Seebeck's role in thermoelectric hot-spot sensing?",
          "o": [
            {
              "t": "Thomas Johann Seebeck discovered that a circuit made from dissimilar conductors produces a voltage when its junctions are at different temperatures. The transformer dossier carries the winding thermal record. Transformer fits. Transformer fits.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Thomas Johann Seebeck's transformer work emphasizes electrical output and relay status. Transformer records fit this transformer account. Transformer practice makes the transformer view plausible. Transformer timing supports this transformer claim.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Thomas Johann Seebeck's transformer work is read within transformer practice as support for the rating plate as sufficient evidence of healthy insulation across the expected operating range. The unit still carries load. Transformer fits. Transformer fits.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "Thomas Johann Seebeck's transformer authority supports postponing oil sampling while the energized transformer continues carrying load without a relay trip. Transformer practice makes the transformer view plausible. Transformer fits. Transformer fits.",
              "v": "danger",
              "fb": "That shortcut hides developing insulation damage while continued loading accelerates the failure process."
            }
          ]
        },
        {
          "q": "How should a transformer engineer apply this contribution?",
          "o": [
            {
              "t": "A temperature sensor is trustworthy only when its junction, wiring, reference, placement, and calibration are intact. The substation archive stores the raw oil-gas trend. Transformer fits. Transformer fits.",
              "v": "expert",
              "fb": "Correct: the answer connects electromagnetic behavior with insulation, heat, and condition evidence."
            },
            {
              "t": "Use one electrical reading as the main indicator while treating cooling, moisture, and insulation aging as later tests. Transformer practice makes the transformer view plausible. Transformer fits.",
              "v": "partial",
              "fb": "This addresses one transformer quantity but leaves the coupled thermal or dielectric limit untested."
            },
            {
              "t": "Assume magnetic response and dielectric strength remain stable across moisture, temperature, surface condition, and frequency. Transformer practice makes the transformer view plausible. Transformer fits.",
              "v": "wrong",
              "fb": "That account applies the wrong physical relation or assumes a nameplate value proves present condition."
            },
            {
              "t": "Keep the overloaded unit online while oil and insulation condition tests remain deferred. Transformer practice makes the transformer view plausible. Transformer timing supports this transformer claim.",
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
    "<b>The transformer tank has cooled, but sealed oil samples and relay targets remain under guard.</b>",
    "Switching history comes from <b>Operator Nkemi</b>; laboratory samples come from <b>The Oil Technician</b>; asset decisions sit in <b>The Clerk</b>'s files.",
    "Follow responsibility among Bram Odell — utility operator, The substation engineer, and The grid safety regulator. Meanwhile, oil chemistry evidence tests <b>A lightning impulse punctured insulation in one external surge</b> against <b>Corona discharge tracked across bushings before flashing over</b>.",
    "<b>Internal inspection begins in eight days, when draining and dismantling will alter gases and insulation evidence.</b>"
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
  }
}
};
