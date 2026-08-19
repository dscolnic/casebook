module.exports = { PACK: {
  "id": "t_refinery",
  "title": "The Halden Refinery Fire",
  "discipline": "Process Safety & Combustion Engineering",
  "teaser": "A refinery unit erupted after pressure rose and hydrocarbons escaped. Was it a vessel BLEVE or a self-accelerating reaction? The physical record must identify the actual event.",
  "overclaimTag": "a vessel BLEVE",
  "truthTag": "a confined vapor-cloud explosion",
  "venue": "the Halden refinery inquiry",
  "agent": {
    "name": "Investigator Cara Mendel",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Combustion & Corrosion Pioneers",
  "dossierName": "COMBUSTION & CORROSION PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Halden refinery inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  "placeNarr": "You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  "overclaimTease": "A ruptured vessel and a runaway reaction each make convincing fireball stories; phase history and damage geometry must choose.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "operator",
      "items": [
        {
          "id": "operator",
          "label": "Garon Voss — refinery operator"
        },
        {
          "id": "superintendent",
          "label": "The unit superintendent"
        },
        {
          "id": "inspector",
          "label": "The state safety inspector"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "office",
      "items": [
        {
          "id": "units",
          "label": "The Process Units & Flare"
        },
        {
          "id": "control",
          "label": "The Control Room"
        },
        {
          "id": "office",
          "label": "The Operator's Corporate Office"
        }
      ]
    },
    "what": {
      "title": "What physical event produced the fireball?",
      "truth": "neglect",
      "items": [
        {
          "id": "attack",
          "label": "A boiling-liquid vapor explosion ruptured a heated vessel."
        },
        {
          "id": "freak",
          "label": "A runaway reaction generated heat faster than it escaped."
        },
        {
          "id": "neglect",
          "label": "A released vapor cloud ignited among congested equipment."
        }
      ]
    }
  },
  "PLACES": {
    "units": {
      "name": "The Process Units & Flare",
      "xy": [
        140,
        90
      ]
    },
    "control": {
      "name": "The Control Room",
      "xy": [
        330,
        240
      ]
    },
    "office": {
      "name": "The Operator's Corporate Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "units",
      "control"
    ],
    [
      "control",
      "office"
    ]
  ],
  "CHARACTERS": {
    "unitop": {
      "name": "Operator Delia Fenn",
      "role": "Unit operator",
      "face": "🔥",
      "badge": "U",
      "legend": "the process units",
      "hint": "Ran the unit and can identify the operators, supervisors, and locations tied to the final shift."
    },
    "boardop": {
      "name": "The Board Operator",
      "role": "Control-room operator",
      "face": "🎛",
      "badge": "B",
      "legend": "the control room",
      "hint": "Preserves control-room trends and knows which alarms and permits were active before evacuation."
    },
    "clerk": {
      "name": "The Clerk",
      "role": "Records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Holds inspection reports, management approvals, and corporate correspondence for the damaged unit."
    }
  },
  "TOPICMAP": {
    "units": {
      "unitop": [
        "rf_carnot",
        "rf_clausius"
      ],
      "boardop": [
        "rf_joule",
        "rf_boltzmann"
      ],
      "clerk": [
        "rf_clapeyron",
        "rf_hess"
      ]
    },
    "control": {
      "unitop": [
        "rf_berthelot",
        "rf_bunsen"
      ],
      "boardop": [
        "rf_davy",
        "rf_lewis"
      ],
      "clerk": [
        "rf_zeldovich",
        "rf_fk"
      ]
    },
    "office": {
      "unitop": [
        "rf_pourbaix",
        "rf_uhlig"
      ],
      "boardop": [
        "rf_shukhov",
        "rf_burton"
      ],
      "clerk": [
        "rf_houdry",
        "rf_papin"
      ]
    }
  },
  "TOPICS": {
    "rf_carnot": {
      "sci": "Sadi Carnot (1796-1832)",
      "topic": "Heat engines & the second law",
      "lede": "Sadi Carnot connected heat engines & the second law with the heat, pressure, chemistry, or containment of process plants.",
      "no": 1,
      "profile": "Today's process-hazard cover note starts with Sadi Carnot and heat engines & the second law. Sadi Carnot analyzed the ideal heat engine and showed that efficiency is limited by the temperatures between which it operates. His work began the thermodynamic study of energy conversion rather than specific machine details. The contribution gave refinery engineers a way to account for heat, pressure, reaction, corrosion, or relief before a deviation escaped containment.\n\nProcess equipment cannot convert all heat into work; rejected heat, phase change, pressure, and material limits shape safe operation. A refinery contains large inventories of hot, pressurized, flammable material whose chemistry changes with temperature, catalysts, residence time, and contamination. Stable production depends on keeping energy and mass balances inside equipment limits. A process-safety explanation should trace mass and energy, define the operating window, identify containment limits, and name each independent protection layer.\n\nProtection layers include sound metallurgy, corrosion monitoring, process control, alarms, trips, relief devices, flare capacity, isolation, procedures, and emergency response. Each layer addresses a different path from deviation to release. Disabling a relief path or deferring corrosion work changes the hazard even when daily production appears normal. Process safety focuses on low-frequency, high-consequence loss of containment rather than only personal injury rates. The unit chronology must keep process trends, overrides, relief status, corrosion readings, work orders, changes, and flare availability on the same timeline.\n\nThe thermodynamic lesson is to ask where heat, pressure, and reaction energy can go during an upset. If the designed path is unavailable, the vessel or pipe becomes the relief device. A complete process history joins thickness readings, chemistry, alarms, overrides, relief status, maintenance deferrals, operating windows, and management-of-change records. Fragmented files hide the interaction among them. Cover competence means distinguishing an ignition source from the reason a flammable inventory escaped and accumulated. The first spark is rarely the whole causal chain.",
      "frame": "Operator Delia Fenn studies the process trend at The Process Units & Flare. \"Use Sadi Carnot to account for the heat, pressure, or chemistry before the release.\"",
      "q": [
        {
          "q": "Which refinery-safety account most accurately states Sadi Carnot's contribution to heat engines & the second law?",
          "o": [
            {
              "t": "Sadi Carnot analyzed the ideal heat engine and showed that efficiency is limited by the temperatures between which it operates. Refinery specialists compare the raw unit-specific override log with inventory state. Refinery fits. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Sadi Carnot's refinery work emphasizes one stable temperature or pressure. The unit had run normally. Refinery records fit this refinery account. Refinery practice makes the refinery view plausible. Refinery timing supports this refinery claim.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Sadi Carnot's refinery work supports steady production as sufficient evidence that containment and relief equipment are ready for an upset. Refinery records fit this refinery account. Refinery timing supports this refinery claim. Refinery fits.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Sadi Carnot's refinery authority supports keeping a disabled relief path out of service while daily operation still appears controlled. Refinery practice makes the refinery view plausible. Refinery timing supports this refinery claim.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        },
        {
          "q": "What process-safety rule follows from this contribution?",
          "o": [
            {
              "t": "Process equipment cannot convert all heat into work; rejected heat, phase change, pressure, and material limits shape safe operation. The operating dossier carries the override log. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Use one stable temperature or pressure as the principal indicator of inventory, reaction, and protection status. The unit had run normally. Refinery practice makes the refinery view plausible.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Assume heat release, vapor pressure, corrosion, and flame behavior remain stable across composition and operating severity. The unit had run normally. Refinery timing supports this refinery claim.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Continue operation without the final protective barrier while stored energy remains inside the unit. Recent production supports the view. Refinery practice makes the refinery view plausible.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        },
        {
          "q": "How should a refinery translate this history into barrier management?",
          "o": [
            {
              "t": "Cover competence means distinguishing an ignition source from the reason a flammable inventory escaped and accumulated. The first spark is rarely the whole causal chain. The operating dossier carries the override log. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Separate override and corrosion findings from the process trend after the unit has restarted successfully. Recent production supports the view. Refinery context supports the view. Refinery timing supports this refinery claim. Refinery fits.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Attribute the fire mainly to an attack or chance ignition rather than asking why flammable inventory escaped containment. The unit had run normally. Refinery records fit this refinery account. Refinery timing supports this refinery claim.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Repair visible fire damage, restore throughput, and leave the disabled-protection decision outside the restart review. Recent production supports the view. The unit had run normally. Refinery practice makes the refinery view plausible.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        }
      ]
    },
    "rf_clausius": {
      "sci": "Rudolf Clausius (1822-1888)",
      "topic": "Entropy & the second law",
      "lede": "Through entropy & the second law, Rudolf Clausius gave refinery engineers a firmer account of stored energy.",
      "no": 2,
      "profile": "Today's process-hazard cover note starts with Rudolf Clausius and entropy & the second law. Rudolf Clausius formulated the second law of thermodynamics and introduced entropy as a state function. He showed why heat flows spontaneously from hotter to colder bodies and why real processes generate irreversibility. The contribution gave refinery engineers a way to account for heat, pressure, reaction, corrosion, or relief before a deviation escaped containment.\n\nRising entropy often appears operationally as lost work, mixing, pressure drop, and heat that must be removed safely. Protection layers include sound metallurgy, corrosion monitoring, process control, alarms, trips, relief devices, flare capacity, isolation, procedures, and emergency response. Each layer addresses a different path from deviation to release. A process-safety explanation should trace mass and energy, define the operating window, identify containment limits, and name each independent protection layer.\n\nDisabling a relief path or deferring corrosion work changes the hazard even when daily production appears normal. Process safety focuses on low-frequency, high-consequence loss of containment rather than only personal injury rates. A refinery contains large inventories of hot, pressurized, flammable material whose chemistry changes with temperature, catalysts, residence time, and contamination. Stable production depends on keeping energy and mass balances inside equipment limits. The unit chronology must keep process trends, overrides, relief status, corrosion readings, work orders, changes, and flare availability on the same timeline.\n\nA complete process history joins thickness readings, chemistry, alarms, overrides, relief status, maintenance deferrals, operating windows, and management-of-change records. Fragmented files hide the interaction among them. Cover competence means distinguishing an ignition source from the reason a flammable inventory escaped and accumulated. The first spark is rarely the whole causal chain. The thermodynamic lesson is to ask where heat, pressure, and reaction energy can go during an upset. If the designed path is unavailable, the vessel or pipe becomes the relief device.",
      "frame": "Operator Delia Fenn marks a relief line on the drawing at The Process Units & Flare. \"Explain entropy & the second law, then identify the boundary that must hold.\"",
      "q": [
        {
          "q": "Which refinery-safety account most accurately states Rudolf Clausius's contribution to entropy & the second law?",
          "o": [
            {
              "t": "Rudolf Clausius formulated the second law of thermodynamics and introduced entropy as a state function. Process review keeps the unit-specific pressure-linked corrosion history available for analysis.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Rudolf Clausius's treatment of entropy & the second law uses a refinery simplification: one stable temperature or pressure, with inventory, reaction, and protection layers treated as secondary. Refinery fits.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Rudolf Clausius's refinery work is read within refinery practice as support for steady production as sufficient evidence that containment and relief equipment are ready for an upset. The unit had run normally.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Rudolf Clausius's authority is invoked in refinery practice to justify keeping a disabled relief path out of service while daily operation still appears controlled. Refinery records fit this refinery account.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        },
        {
          "q": "What process-safety rule follows from this contribution?",
          "o": [
            {
              "t": "Rising entropy often appears operationally as lost work, mixing, pressure drop, and heat that must be removed safely. Refinery specialists compare the override log with inventory state. Refinery fits. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Use one stable temperature or pressure as the principal indicator of inventory, reaction, and protection status. Recent production supports the view. Refinery records fit this refinery account. Refinery fits.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Assume heat release, vapor pressure, corrosion, and flame behavior remain stable across composition and operating severity. The unit had run normally. Refinery practice makes the refinery view plausible. Refinery fits.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Continue operation without the final protective barrier while stored energy remains inside the unit. Recent production supports the view. Refinery practice makes the refinery view plausible. The refinery record fits.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        },
        {
          "q": "How should a refinery translate this history into barrier management?",
          "o": [
            {
              "t": "The thermodynamic lesson is to ask where heat, pressure, and reaction energy can go during an upset. If the designed path is unavailable, the vessel or pipe becomes the relief device. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Separate override and corrosion findings from the process trend after the unit has restarted successfully. Recent production supports the view. Refinery practice makes the refinery view plausible.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Attribute the fire mainly to an attack or chance ignition rather than asking why flammable inventory escaped containment. The unit had run normally. Refinery records fit this refinery account. Refinery fits.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Repair visible fire damage, restore throughput, and leave the disabled-protection decision outside the restart review. Refinery records fit this refinery account. Refinery timing supports this refinery claim.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        }
      ]
    },
    "rf_joule": {
      "sci": "James Prescott Joule (1818-1889)",
      "topic": "The mechanical equivalent of heat",
      "lede": "James Prescott Joule's work on the mechanical equivalent of heat made one process hazard calculable before an upset.",
      "no": 3,
      "profile": "Today's process-hazard cover note starts with James Prescott Joule and the mechanical equivalent of heat. James Prescott Joule measured the mechanical equivalent of heat, establishing that work and heat are forms of energy. His paddle-wheel experiments helped anchor the first law of thermodynamics. The contribution gave refinery engineers a way to account for heat, pressure, reaction, corrosion, or relief before a deviation escaped containment.\n\nAn energy balance must include mechanical work, heat transfer, reaction energy, and accumulation inside the process equipment. Disabling a relief path or deferring corrosion work changes the hazard even when daily production appears normal. Process safety focuses on low-frequency, high-consequence loss of containment rather than only personal injury rates. A process-safety explanation should trace mass and energy, define the operating window, identify containment limits, and name each independent protection layer.\n\nA refinery contains large inventories of hot, pressurized, flammable material whose chemistry changes with temperature, catalysts, residence time, and contamination. Stable production depends on keeping energy and mass balances inside equipment limits. Protection layers include sound metallurgy, corrosion monitoring, process control, alarms, trips, relief devices, flare capacity, isolation, procedures, and emergency response. Each layer addresses a different path from deviation to release. The unit chronology must keep process trends, overrides, relief status, corrosion readings, work orders, changes, and flare availability on the same timeline.\n\nCover competence means distinguishing an ignition source from the reason a flammable inventory escaped and accumulated. The first spark is rarely the whole causal chain. The thermodynamic lesson is to ask where heat, pressure, and reaction energy can go during an upset. If the designed path is unavailable, the vessel or pipe becomes the relief device. A complete process history joins thickness readings, chemistry, alarms, overrides, relief status, maintenance deferrals, operating windows, and management-of-change records. Fragmented files hide the interaction among them.",
      "frame": "The Board Operator checks an override list at The Process Units & Flare. \"Start with James Prescott Joule; finish with the protection layer the physics requires.\"",
      "q": [
        {
          "q": "Which refinery-safety account most accurately states James Prescott Joule's contribution to the mechanical equivalent of heat?",
          "o": [
            {
              "t": "James Prescott Joule measured the mechanical equivalent of heat, establishing that work and heat are forms of energy. The process-unit archive stores the raw dated process trend.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "James Prescott Joule's refinery work relies on one stable temperature or pressure. The unit had run normally. Refinery records fit this refinery account. Steady operation appears persuasive.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "James Prescott Joule's refinery work is read within refinery practice as support for steady production as sufficient evidence that containment and relief equipment are ready for an upset.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "James Prescott Joule's refinery authority supports keeping a disabled relief path out of service while daily operation still appears controlled. The unit had run normally. Refinery fits.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        },
        {
          "q": "What process-safety rule follows from this contribution?",
          "o": [
            {
              "t": "An energy balance must include mechanical work, heat transfer, reaction energy, and accumulation inside the process equipment. The operating dossier carries the override log. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Use one stable temperature or pressure as the principal indicator of inventory, reaction, and protection status. The unit had run normally. Refinery records fit this refinery account.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Assume heat release, vapor pressure, corrosion, and flame behavior remain stable across composition and operating severity. The unit had run normally. Refinery records fit this refinery account.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Continue operation without the final protective barrier while stored energy remains inside the unit. Refinery context supports the view. Refinery timing supports this refinery claim.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        },
        {
          "q": "How should a refinery translate this history into barrier management?",
          "o": [
            {
              "t": "A complete process history joins thickness readings, chemistry, alarms, overrides, relief status, maintenance deferrals, operating windows, and management-of-change records. Fragmented files hide the interaction among them. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Separate override and corrosion findings from the process trend after the unit has restarted successfully. Steady operation appears persuasive. Recent production supports the view. Refinery practice makes the refinery view plausible.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Attribute the fire mainly to an attack or chance ignition rather than asking why flammable inventory escaped containment. Recent production supports the view. The unit had run normally. Refinery timing supports this refinery claim.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Repair visible fire damage, restore throughput, and leave the disabled-protection decision outside the restart review. Recent production supports the view. Refinery context supports the view. Refinery timing supports this refinery claim.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        }
      ]
    },
    "rf_boltzmann": {
      "sci": "Ludwig Boltzmann (1844-1906)",
      "topic": "Statistical thermodynamics & heat",
      "lede": "Ludwig Boltzmann connected statistical thermodynamics & heat with the heat, pressure, chemistry, or containment of process plants.",
      "no": 4,
      "profile": "Today's process-hazard cover note starts with Ludwig Boltzmann and statistical thermodynamics & heat. Ludwig Boltzmann connected thermodynamic quantities with the statistics of molecular motion. His relation between entropy and the number of microscopic states gave physical meaning to macroscopic heat behavior. The contribution gave refinery engineers a way to account for heat, pressure, reaction, corrosion, or relief before a deviation escaped containment.\n\nTemperature and pressure summarize enormous molecular populations, but tails and fluctuations matter when reactions accelerate sharply. A refinery contains large inventories of hot, pressurized, flammable material whose chemistry changes with temperature, catalysts, residence time, and contamination. Stable production depends on keeping energy and mass balances inside equipment limits. A process-safety explanation should trace mass and energy, define the operating window, identify containment limits, and name each independent protection layer.\n\nProtection layers include sound metallurgy, corrosion monitoring, process control, alarms, trips, relief devices, flare capacity, isolation, procedures, and emergency response. Each layer addresses a different path from deviation to release. Disabling a relief path or deferring corrosion work changes the hazard even when daily production appears normal. Process safety focuses on low-frequency, high-consequence loss of containment rather than only personal injury rates. The unit chronology must keep process trends, overrides, relief status, corrosion readings, work orders, changes, and flare availability on the same timeline.\n\nThe thermodynamic lesson is to ask where heat, pressure, and reaction energy can go during an upset. If the designed path is unavailable, the vessel or pipe becomes the relief device. A complete process history joins thickness readings, chemistry, alarms, overrides, relief status, maintenance deferrals, operating windows, and management-of-change records. Fragmented files hide the interaction among them. Cover competence means distinguishing an ignition source from the reason a flammable inventory escaped and accumulated. The first spark is rarely the whole causal chain.",
      "frame": "The Board Operator studies the process trend at The Process Units & Flare. \"Use Ludwig Boltzmann to account for the heat, pressure, or chemistry before the release.\"",
      "q": [
        {
          "q": "Which refinery-safety account most accurately states Ludwig Boltzmann's contribution to statistical thermodynamics & heat?",
          "o": [
            {
              "t": "Ludwig Boltzmann connected thermodynamic quantities with the statistics of molecular motion. Process review keeps the pressure-linked process-audited override log available for analysis.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Ludwig Boltzmann's refinery work emphasizes one stable temperature or pressure. Recent production supports the view. The unit had run normally. Refinery practice makes the refinery view plausible.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Ludwig Boltzmann's refinery work supports steady production as sufficient evidence that containment and relief equipment are ready for an upset. Refinery practice makes the refinery view plausible.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Ludwig Boltzmann's refinery authority supports keeping a disabled relief path out of service while daily operation still appears controlled. Refinery practice makes the refinery view plausible.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        },
        {
          "q": "What process-safety rule follows from this contribution?",
          "o": [
            {
              "t": "Temperature and pressure summarize enormous molecular populations, but tails and fluctuations matter when reactions accelerate sharply. The operating dossier carries the override log. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Use one stable temperature or pressure as the principal indicator of inventory, reaction, and protection status. Refinery records fit this refinery account. Refinery timing supports this refinery claim.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Assume heat release, vapor pressure, corrosion, and flame behavior remain stable across composition and operating severity. Recent production supports the view. The unit had run normally. Refinery fits.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Continue operation without the final protective barrier while stored energy remains inside the unit. Recent production supports the view. Refinery practice makes the refinery view plausible.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        },
        {
          "q": "How should a refinery translate this history into barrier management?",
          "o": [
            {
              "t": "Cover competence means distinguishing an ignition source from the reason a flammable inventory escaped and accumulated. The first spark is rarely the whole causal chain. The operating dossier carries the override log. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Separate override and corrosion findings from the process trend after the unit has restarted successfully. Recent production supports the view. Refinery context supports the view. Refinery timing supports this refinery claim. Refinery fits.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Attribute the fire mainly to an attack or chance ignition rather than asking why flammable inventory escaped containment. The unit had run normally. Refinery records fit this refinery account. Refinery timing supports this refinery claim.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Repair visible fire damage, restore throughput, and leave the disabled-protection decision outside the restart review. Recent production supports the view. The unit had run normally. Refinery practice makes the refinery view plausible.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        }
      ]
    },
    "rf_clapeyron": {
      "sci": "Benoit Clapeyron (1799-1864)",
      "topic": "Vapor pressure & the Clausius-Clapeyron relation",
      "lede": "Through vapor pressure & the Clausius-Clapeyron relation, Benoit Clapeyron gave refinery engineers a firmer account of stored energy.",
      "no": 5,
      "profile": "Today's process-hazard cover note starts with Benoit Clapeyron and vapor pressure & the Clausius-Clapeyron relation. Benoît Clapeyron expressed Carnot's ideas mathematically and developed the relation later refined as the Clausius-Clapeyron equation. It links vapor pressure with temperature and latent heat. The contribution gave refinery engineers a way to account for heat, pressure, reaction, corrosion, or relief before a deviation escaped containment.\n\nHeating a volatile liquid can raise vapor pressure rapidly, increasing the load on containment and relief systems. Protection layers include sound metallurgy, corrosion monitoring, process control, alarms, trips, relief devices, flare capacity, isolation, procedures, and emergency response. Each layer addresses a different path from deviation to release. A process-safety explanation should trace mass and energy, define the operating window, identify containment limits, and name each independent protection layer.\n\nDisabling a relief path or deferring corrosion work changes the hazard even when daily production appears normal. Process safety focuses on low-frequency, high-consequence loss of containment rather than only personal injury rates. A refinery contains large inventories of hot, pressurized, flammable material whose chemistry changes with temperature, catalysts, residence time, and contamination. Stable production depends on keeping energy and mass balances inside equipment limits. The unit chronology must keep process trends, overrides, relief status, corrosion readings, work orders, changes, and flare availability on the same timeline.\n\nA complete process history joins thickness readings, chemistry, alarms, overrides, relief status, maintenance deferrals, operating windows, and management-of-change records. Fragmented files hide the interaction among them. Cover competence means distinguishing an ignition source from the reason a flammable inventory escaped and accumulated. The first spark is rarely the whole causal chain. The thermodynamic lesson is to ask where heat, pressure, and reaction energy can go during an upset. If the designed path is unavailable, the vessel or pipe becomes the relief device.",
      "frame": "The Clerk marks a relief line on the drawing at The Process Units & Flare. \"Explain vapor pressure & the Clausius-Clapeyron relation, then identify the boundary that must hold.\"",
      "q": [
        {
          "q": "Which refinery-safety account most accurately states Benoit Clapeyron's contribution to vapor pressure & the Clausius-Clapeyron relation?",
          "o": [
            {
              "t": "Benoît Clapeyron expressed Carnot's ideas mathematically and developed the relation later refined as the Clausius-Clapeyron equation. The process-unit archive stores the dated override log. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Benoit Clapeyron's refinery work emphasizes one stable temperature or pressure. Refinery records fit this refinery account. Refinery context supports the view. Refinery timing supports this refinery claim.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Benoit Clapeyron's refinery work supports steady production as sufficient evidence that containment and relief equipment are ready for an upset. Refinery practice makes the refinery view plausible.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Benoit Clapeyron's refinery authority supports keeping a disabled relief path out of service while daily operation still appears controlled. Refinery practice makes the refinery view plausible.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        },
        {
          "q": "What process-safety rule follows from this contribution?",
          "o": [
            {
              "t": "Heating a volatile liquid can raise vapor pressure rapidly, increasing the load on containment and relief systems. Barrier evidence ties the raw process trend to containment protection. Refinery fits. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Use one stable temperature or pressure as the principal indicator of inventory, reaction, and protection status. Recent production supports the view. Refinery records fit this refinery account. Refinery fits.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Assume heat release, vapor pressure, corrosion, and flame behavior remain stable across composition and operating severity. The unit had run normally. Refinery practice makes the refinery view plausible. Refinery fits.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Continue operation without the final protective barrier while stored energy remains inside the unit. Recent production supports the view. Refinery practice makes the refinery view plausible. The refinery record fits.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        },
        {
          "q": "How should a refinery translate this history into barrier management?",
          "o": [
            {
              "t": "The thermodynamic lesson is to ask where heat, pressure, and reaction energy can go during an upset. If the designed path is unavailable, the vessel or pipe becomes the relief device. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Separate override and corrosion findings from the process trend after the unit has restarted successfully. Recent production supports the view. Refinery practice makes the refinery view plausible.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Attribute the fire mainly to an attack or chance ignition rather than asking why flammable inventory escaped containment. The unit had run normally. Refinery records fit this refinery account. Refinery fits.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Repair visible fire damage, restore throughput, and leave the disabled-protection decision outside the restart review. Refinery records fit this refinery account. Refinery timing supports this refinery claim.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        }
      ]
    },
    "rf_hess": {
      "sci": "Germain Hess (1802-1850)",
      "topic": "Thermochemistry & heats of reaction",
      "lede": "Germain Hess's work on thermochemistry & heats of reaction made one process hazard calculable before an upset.",
      "no": 6,
      "profile": "Today's process-hazard cover note starts with Germain Hess and thermochemistry & heats of reaction. Germain Hess showed that the total heat of a chemical reaction depends only on initial and final states, not on the sequence of steps. Hess's law lets engineers combine measured reactions to estimate heat release. The contribution gave refinery engineers a way to account for heat, pressure, reaction, corrosion, or relief before a deviation escaped containment.\n\nReaction heat belongs in the hazard analysis even when chemistry proceeds through several intermediate stages. Disabling a relief path or deferring corrosion work changes the hazard even when daily production appears normal. Process safety focuses on low-frequency, high-consequence loss of containment rather than only personal injury rates. A process-safety explanation should trace mass and energy, define the operating window, identify containment limits, and name each independent protection layer.\n\nA refinery contains large inventories of hot, pressurized, flammable material whose chemistry changes with temperature, catalysts, residence time, and contamination. Stable production depends on keeping energy and mass balances inside equipment limits. Protection layers include sound metallurgy, corrosion monitoring, process control, alarms, trips, relief devices, flare capacity, isolation, procedures, and emergency response. Each layer addresses a different path from deviation to release. The unit chronology must keep process trends, overrides, relief status, corrosion readings, work orders, changes, and flare availability on the same timeline.\n\nCover competence means distinguishing an ignition source from the reason a flammable inventory escaped and accumulated. The first spark is rarely the whole causal chain. The thermodynamic lesson is to ask where heat, pressure, and reaction energy can go during an upset. If the designed path is unavailable, the vessel or pipe becomes the relief device. A complete process history joins thickness readings, chemistry, alarms, overrides, relief status, maintenance deferrals, operating windows, and management-of-change records. Fragmented files hide the interaction among them.",
      "frame": "The Clerk checks an override list at The Process Units & Flare. \"Start with Germain Hess; finish with the protection layer the physics requires.\"",
      "q": [
        {
          "q": "Which refinery-safety account most accurately states Germain Hess's contribution to thermochemistry & heats of reaction?",
          "o": [
            {
              "t": "Germain Hess showed that the total heat of a chemical reaction depends only on initial and final states, not on the sequence of steps. The operating dossier carries the override log.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Germain Hess's refinery work emphasizes one stable temperature or pressure. Recent production supports the view. The unit had run normally. Refinery practice makes the refinery view plausible.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Germain Hess's refinery work supports steady production as sufficient evidence that containment and relief equipment are ready for an upset. Refinery practice makes the refinery view plausible.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Germain Hess's refinery authority supports keeping a disabled relief path out of service while daily operation still appears controlled. Refinery practice makes the refinery view plausible.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        },
        {
          "q": "What process-safety rule follows from this contribution?",
          "o": [
            {
              "t": "Reaction heat belongs in the hazard analysis even when chemistry proceeds through several intermediate stages. Process review keeps the relief record available for analysis. Refinery fits. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Use one stable temperature or pressure as the principal indicator of inventory, reaction, and protection status. The unit had run normally. Refinery records fit this refinery account. Refinery fits.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Assume heat release, vapor pressure, corrosion, and flame behavior remain stable across composition and operating severity. The unit had run normally. Refinery records fit this refinery account. Refinery fits.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Continue operation without the final protective barrier while stored energy remains inside the unit. Recent production supports the view. Refinery records fit this refinery account. Refinery context matters.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        },
        {
          "q": "How should a refinery translate this history into barrier management?",
          "o": [
            {
              "t": "A complete process history joins thickness readings, chemistry, alarms, overrides, relief status, maintenance deferrals, operating windows, and management-of-change records. Fragmented files hide the interaction among them. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Separate override and corrosion findings from the process trend after the unit has restarted successfully. Steady operation appears persuasive. Recent production supports the view. Refinery practice makes the refinery view plausible.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Attribute the fire mainly to an attack or chance ignition rather than asking why flammable inventory escaped containment. Recent production supports the view. The unit had run normally. Refinery timing supports this refinery claim.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Repair visible fire damage, restore throughput, and leave the disabled-protection decision outside the restart review. Recent production supports the view. Refinery context supports the view. Refinery timing supports this refinery claim.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        }
      ]
    },
    "rf_berthelot": {
      "sci": "Marcellin Berthelot (1827-1907)",
      "topic": "Thermochemistry & explosives",
      "lede": "Marcellin Berthelot connected thermochemistry & explosives with the heat, pressure, chemistry, or containment of process plants.",
      "no": 7,
      "profile": "Today's process-hazard cover note starts with Marcellin Berthelot and thermochemistry & explosives. Marcellin Berthelot measured heats of reaction and investigated explosives and combustion. He helped make thermochemistry a quantitative tool for comparing the energy released by chemical transformations. The contribution gave refinery engineers a way to account for heat, pressure, reaction, corrosion, or relief before a deviation escaped containment.\n\nEnergy content alone does not determine blast severity; release rate, confinement, mixing, and ignition location also control pressure. A refinery contains large inventories of hot, pressurized, flammable material whose chemistry changes with temperature, catalysts, residence time, and contamination. Stable production depends on keeping energy and mass balances inside equipment limits. A process-safety explanation should trace mass and energy, define the operating window, identify containment limits, and name each independent protection layer.\n\nProtection layers include sound metallurgy, corrosion monitoring, process control, alarms, trips, relief devices, flare capacity, isolation, procedures, and emergency response. Each layer addresses a different path from deviation to release. Disabling a relief path or deferring corrosion work changes the hazard even when daily production appears normal. Process safety focuses on low-frequency, high-consequence loss of containment rather than only personal injury rates. The unit chronology must keep process trends, overrides, relief status, corrosion readings, work orders, changes, and flare availability on the same timeline.\n\nThe thermodynamic lesson is to ask where heat, pressure, and reaction energy can go during an upset. If the designed path is unavailable, the vessel or pipe becomes the relief device. A complete process history joins thickness readings, chemistry, alarms, overrides, relief status, maintenance deferrals, operating windows, and management-of-change records. Fragmented files hide the interaction among them. Cover competence means distinguishing an ignition source from the reason a flammable inventory escaped and accumulated. The first spark is rarely the whole causal chain.",
      "frame": "Operator Delia Fenn studies the process trend at The Control Room. \"Use Marcellin Berthelot to account for the heat, pressure, or chemistry before the release.\"",
      "q": [
        {
          "q": "Which refinery-safety account most accurately states Marcellin Berthelot's contribution to thermochemistry & explosives?",
          "o": [
            {
              "t": "Marcellin Berthelot measured heats of reaction and investigated explosives and combustion. Process review keeps the override log available for analysis. Refinery specialists compare the override log with inventory state. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Marcellin Berthelot's refinery work emphasizes one stable temperature or pressure. Recent production supports the view. The unit had run normally. Refinery records fit this refinery account. Refinery timing supports this refinery claim.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Marcellin Berthelot's refinery work supports steady production as sufficient evidence that containment and relief equipment are ready for an upset. Refinery records fit this refinery account. Refinery timing supports this refinery claim.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Marcellin Berthelot's refinery authority supports keeping a disabled relief path out of service while daily operation still appears controlled. Recent production supports the view. Refinery timing supports this refinery claim.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        },
        {
          "q": "What process-safety rule follows from this contribution?",
          "o": [
            {
              "t": "Energy content alone does not determine blast severity; release rate, confinement, mixing, and ignition location also control pressure. The operating dossier carries the override log. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Use one stable temperature or pressure as the principal indicator of inventory, reaction, and protection status. Refinery records fit this refinery account. Refinery timing supports this refinery claim.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Assume heat release, vapor pressure, corrosion, and flame behavior remain stable across composition and operating severity. Recent production supports the view. The unit had run normally. Refinery fits.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Continue operation without the final protective barrier while stored energy remains inside the unit. Recent production supports the view. Refinery practice makes the refinery view plausible.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        },
        {
          "q": "How should a refinery translate this history into barrier management?",
          "o": [
            {
              "t": "Cover competence means distinguishing an ignition source from the reason a flammable inventory escaped and accumulated. The first spark is rarely the whole causal chain. The operating dossier carries the override log. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Separate override and corrosion findings from the process trend after the unit has restarted successfully. Recent production supports the view. Refinery context supports the view. Refinery timing supports this refinery claim. Refinery fits.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Attribute the fire mainly to an attack or chance ignition rather than asking why flammable inventory escaped containment. The unit had run normally. Refinery records fit this refinery account. Refinery timing supports this refinery claim.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Repair visible fire damage, restore throughput, and leave the disabled-protection decision outside the restart review. Recent production supports the view. The unit had run normally. Refinery practice makes the refinery view plausible.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        }
      ]
    },
    "rf_bunsen": {
      "sci": "Robert Bunsen (1811-1899)",
      "topic": "The burner & flame chemistry",
      "lede": "Through the burner & flame chemistry, Robert Bunsen gave refinery engineers a firmer account of stored energy.",
      "no": 8,
      "profile": "Today's process-hazard cover note starts with Robert Bunsen and the burner & flame chemistry. Robert Bunsen developed the burner that mixes fuel with air before combustion, producing a controllable, relatively clean flame. He also studied gas analysis and flame chemistry. The contribution gave refinery engineers a way to account for heat, pressure, reaction, corrosion, or relief before a deviation escaped containment.\n\nPremixing can improve combustion, but it creates a flammable mixture upstream of the flame that must be kept from flashing back. Protection layers include sound metallurgy, corrosion monitoring, process control, alarms, trips, relief devices, flare capacity, isolation, procedures, and emergency response. Each layer addresses a different path from deviation to release. A process-safety explanation should trace mass and energy, define the operating window, identify containment limits, and name each independent protection layer.\n\nDisabling a relief path or deferring corrosion work changes the hazard even when daily production appears normal. Process safety focuses on low-frequency, high-consequence loss of containment rather than only personal injury rates. A refinery contains large inventories of hot, pressurized, flammable material whose chemistry changes with temperature, catalysts, residence time, and contamination. Stable production depends on keeping energy and mass balances inside equipment limits. The unit chronology must keep process trends, overrides, relief status, corrosion readings, work orders, changes, and flare availability on the same timeline.\n\nA complete process history joins thickness readings, chemistry, alarms, overrides, relief status, maintenance deferrals, operating windows, and management-of-change records. Fragmented files hide the interaction among them. Cover competence means distinguishing an ignition source from the reason a flammable inventory escaped and accumulated. The first spark is rarely the whole causal chain. The thermodynamic lesson is to ask where heat, pressure, and reaction energy can go during an upset. If the designed path is unavailable, the vessel or pipe becomes the relief device.",
      "frame": "Operator Delia Fenn marks a relief line on the drawing at The Control Room. \"Explain the burner & flame chemistry, then identify the boundary that must hold.\"",
      "q": [
        {
          "q": "Which refinery-safety account most accurately states Robert Bunsen's contribution to the burner & flame chemistry?",
          "o": [
            {
              "t": "Robert Bunsen developed the burner that mixes fuel with air before combustion, producing a controllable, relatively clean flame. Refinery specialists compare the dated override log with inventory state. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Robert Bunsen's treatment of the burner & flame chemistry uses a refinery simplification: one stable temperature or pressure, with inventory, reaction, and protection layers treated as secondary. Refinery fits. Fits.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Robert Bunsen's refinery work is read within refinery practice as support for steady production as sufficient evidence that containment and relief equipment are ready for an upset. Refinery records fit this refinery account.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Robert Bunsen's authority is invoked in refinery practice to justify keeping a disabled relief path out of service while daily operation still appears controlled. Refinery timing supports this refinery claim. Fits.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        },
        {
          "q": "What process-safety rule follows from this contribution?",
          "o": [
            {
              "t": "Premixing can improve combustion, but it creates a flammable mixture upstream of the flame that must be kept from flashing back. The process-unit archive stores the dated process trend. Refinery fits. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Use one stable temperature or pressure as the principal indicator of inventory, reaction, and protection status. Recent production supports the view. Refinery records fit this refinery account. Refinery fits.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Assume heat release, vapor pressure, corrosion, and flame behavior remain stable across composition and operating severity. The unit had run normally. Refinery practice makes the refinery view plausible. Refinery fits.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Continue operation without the final protective barrier while stored energy remains inside the unit. Recent production supports the view. Refinery practice makes the refinery view plausible. The refinery record fits.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        },
        {
          "q": "How should a refinery translate this history into barrier management?",
          "o": [
            {
              "t": "The thermodynamic lesson is to ask where heat, pressure, and reaction energy can go during an upset. If the designed path is unavailable, the vessel or pipe becomes the relief device. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Separate override and corrosion findings from the process trend after the unit has restarted successfully. Recent production supports the view. Refinery practice makes the refinery view plausible.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Attribute the fire mainly to an attack or chance ignition rather than asking why flammable inventory escaped containment. The unit had run normally. Refinery records fit this refinery account. Refinery fits.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Repair visible fire damage, restore throughput, and leave the disabled-protection decision outside the restart review. Refinery records fit this refinery account. Refinery timing supports this refinery claim.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        }
      ]
    },
    "rf_davy": {
      "sci": "Humphry Davy (1778-1829)",
      "topic": "The safety lamp & flame arrest",
      "lede": "Humphry Davy's work on the safety lamp & flame arrest made one process hazard calculable before an upset.",
      "no": 9,
      "profile": "Today's process-hazard cover note starts with Humphry Davy and the safety lamp & flame arrest. Humphry Davy designed a safety lamp whose metal gauze cooled flame fronts and prevented them from igniting surrounding firedamp under proper conditions. The lamp demonstrated practical flame arrest. The contribution gave refinery engineers a way to account for heat, pressure, reaction, corrosion, or relief before a deviation escaped containment.\n\nA flame arresting element works only within its tested geometry, gas group, temperature, cleanliness, and flow limits. Disabling a relief path or deferring corrosion work changes the hazard even when daily production appears normal. Process safety focuses on low-frequency, high-consequence loss of containment rather than only personal injury rates. A process-safety explanation should trace mass and energy, define the operating window, identify containment limits, and name each independent protection layer.\n\nA refinery contains large inventories of hot, pressurized, flammable material whose chemistry changes with temperature, catalysts, residence time, and contamination. Stable production depends on keeping energy and mass balances inside equipment limits. Protection layers include sound metallurgy, corrosion monitoring, process control, alarms, trips, relief devices, flare capacity, isolation, procedures, and emergency response. Each layer addresses a different path from deviation to release. The unit chronology must keep process trends, overrides, relief status, corrosion readings, work orders, changes, and flare availability on the same timeline.\n\nCover competence means distinguishing an ignition source from the reason a flammable inventory escaped and accumulated. The first spark is rarely the whole causal chain. The thermodynamic lesson is to ask where heat, pressure, and reaction energy can go during an upset. If the designed path is unavailable, the vessel or pipe becomes the relief device. A complete process history joins thickness readings, chemistry, alarms, overrides, relief status, maintenance deferrals, operating windows, and management-of-change records. Fragmented files hide the interaction among them.",
      "frame": "The Board Operator checks an override list at The Control Room. \"Start with Humphry Davy; finish with the protection layer the physics requires.\"",
      "q": [
        {
          "q": "Which refinery-safety account most accurately states Humphry Davy's contribution to the safety lamp & flame arrest?",
          "o": [
            {
              "t": "Humphry Davy designed a safety lamp whose metal gauze cooled flame fronts and prevented them from igniting surrounding firedamp under proper conditions. The process-unit archive stores the relief record. Context fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Humphry Davy's treatment of the safety lamp & flame arrest uses a refinery simplification: one stable temperature or pressure, with inventory, reaction, and protection layers treated as secondary. Refinery fits.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Humphry Davy's refinery work is read within refinery practice as support for steady production as sufficient evidence that containment and relief equipment are ready for an upset. Refinery records fit this refinery account.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Humphry Davy's authority is invoked in refinery practice to justify keeping a disabled relief path out of service while daily operation still appears controlled. Refinery practice makes the refinery view plausible.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        },
        {
          "q": "What process-safety rule follows from this contribution?",
          "o": [
            {
              "t": "A flame arresting element works only within its tested geometry, gas group, temperature, cleanliness, and flow limits. The process-unit archive stores the raw process trend. Refinery fits. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Use one stable temperature or pressure as the principal indicator of inventory, reaction, and protection status. The unit had run normally. Refinery records fit this refinery account. Refinery fits.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Assume heat release, vapor pressure, corrosion, and flame behavior remain stable across composition and operating severity. The unit had run normally. Refinery records fit this refinery account. Refinery fits.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Continue operation without the final protective barrier while stored energy remains inside the unit. Recent production supports the view. Refinery records fit this refinery account. Refinery context matters.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        },
        {
          "q": "How should a refinery translate this history into barrier management?",
          "o": [
            {
              "t": "A complete process history joins thickness readings, chemistry, alarms, overrides, relief status, maintenance deferrals, operating windows, and management-of-change records. Fragmented files hide the interaction among them. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Separate override and corrosion findings from the process trend after the unit has restarted successfully. Steady operation appears persuasive. Recent production supports the view. Refinery practice makes the refinery view plausible.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Attribute the fire mainly to an attack or chance ignition rather than asking why flammable inventory escaped containment. Recent production supports the view. The unit had run normally. Refinery timing supports this refinery claim.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Repair visible fire damage, restore throughput, and leave the disabled-protection decision outside the restart review. Recent production supports the view. Refinery context supports the view. Refinery timing supports this refinery claim.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        }
      ]
    },
    "rf_lewis": {
      "sci": "Bernard Lewis (1899-1993)",
      "topic": "Combustion, flames & explosions",
      "lede": "Bernard Lewis connected combustion, flames & explosions with the heat, pressure, chemistry, or containment of process plants.",
      "no": 10,
      "profile": "Today's process-hazard cover note starts with Bernard Lewis and combustion, flames & explosions. Bernard Lewis conducted broad research on flames, ignition, combustion kinetics, and explosions. His work with Guenther von Elbe became a standard reference for understanding flammability and flame propagation. The contribution gave refinery engineers a way to account for heat, pressure, reaction, corrosion, or relief before a deviation escaped containment.\n\nSafe limits require measured flammability data and attention to pressure, temperature, turbulence, and mixture composition. A refinery contains large inventories of hot, pressurized, flammable material whose chemistry changes with temperature, catalysts, residence time, and contamination. Stable production depends on keeping energy and mass balances inside equipment limits. A process-safety explanation should trace mass and energy, define the operating window, identify containment limits, and name each independent protection layer.\n\nProtection layers include sound metallurgy, corrosion monitoring, process control, alarms, trips, relief devices, flare capacity, isolation, procedures, and emergency response. Each layer addresses a different path from deviation to release. Disabling a relief path or deferring corrosion work changes the hazard even when daily production appears normal. Process safety focuses on low-frequency, high-consequence loss of containment rather than only personal injury rates. The unit chronology must keep process trends, overrides, relief status, corrosion readings, work orders, changes, and flare availability on the same timeline.\n\nLewis's combustion research helps identify a vapor-cloud explosion. A flammable release can disperse before ignition, then accelerate through congested equipment as a deflagration; damage may extend well beyond the leaking item and need not include a shattered pressure vessel. Investigators compare gas-dispersion time, ignition delay, flame travel, and pressure deformation across the unit. That distributed pattern distinguishes an ignited vapor cloud from a BLEVE or an internally accelerating reaction.",
      "frame": "The Board Operator studies the process trend at The Control Room. \"Use Bernard Lewis to account for the heat, pressure, or chemistry before the release.\"",
      "q": [
        {
          "q": "Which refinery-safety account most accurately states Bernard Lewis's contribution to combustion, flames & explosions?",
          "o": [
            {
              "t": "Bernard Lewis conducted broad research on flames, ignition, combustion kinetics, and explosions. Refinery specialists compare the pressure-linked process-audited barrier-focused corrosion history with inventory state. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Bernard Lewis's refinery work emphasizes one stable temperature or pressure. The unit had run normally. Refinery context supports the view. Refinery practice makes the refinery view plausible. Refinery timing supports this refinery claim.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Bernard Lewis's refinery work supports steady production as sufficient evidence that containment and relief equipment are ready for an upset. Refinery context supports the view. Refinery timing supports this refinery claim. Refinery fits.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Bernard Lewis's refinery authority supports keeping a disabled relief path out of service while daily operation still appears controlled. Recent production supports the view. Refinery practice makes the refinery view plausible.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        },
        {
          "q": "What process-safety rule follows from this contribution?",
          "o": [
            {
              "t": "Safe limits require measured flammability data and attention to pressure, temperature, turbulence, and mixture composition. The process-unit archive stores the override log. Refinery fits. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Use one stable temperature or pressure as the principal indicator of inventory, reaction, and protection status. The unit had run normally. Refinery records fit this refinery account. Refinery fits.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Assume heat release, vapor pressure, corrosion, and flame behavior remain stable across composition and operating severity. The unit had run normally. Refinery records fit this refinery account. Refinery fits.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Continue operation without the final protective barrier while stored energy remains inside the unit. Recent production supports the view. Refinery records fit this refinery account. Refinery context matters.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        },
        {
          "q": "How should a refinery translate this history into barrier management?",
          "o": [
            {
              "t": "Cover competence means distinguishing an ignition source from the reason a flammable inventory escaped and accumulated. The first spark is rarely the whole causal chain. The operating dossier carries the override log. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Separate override and corrosion findings from the process trend after the unit has restarted successfully. Recent production supports the view. Refinery context supports the view. Refinery timing supports this refinery claim. Refinery fits.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Attribute the fire mainly to an attack or chance ignition rather than asking why flammable inventory escaped containment. The unit had run normally. Refinery records fit this refinery account. Refinery timing supports this refinery claim.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Repair visible fire damage, restore throughput, and leave the disabled-protection decision outside the restart review. Recent production supports the view. The unit had run normally. Refinery practice makes the refinery view plausible.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        }
      ]
    },
    "rf_zeldovich": {
      "sci": "Yakov Zeldovich (1914-1987)",
      "topic": "Detonation & flame theory",
      "lede": "Through detonation & flame theory, Yakov Zeldovich gave refinery engineers a firmer account of stored energy.",
      "no": 11,
      "profile": "Today's process-hazard cover note starts with Yakov Zeldovich and detonation & flame theory. Yakov Zeldovich developed influential theories of combustion, detonation, and high-temperature chemical kinetics. The Zeldovich-von Neumann-Döring model describes the shock and reaction structure of detonation. The contribution gave refinery engineers a way to account for heat, pressure, reaction, corrosion, or relief before a deviation escaped containment.\n\nFast chemistry coupled to compression can create self-sustaining detonation, a different regime from ordinary flame spread. Protection layers include sound metallurgy, corrosion monitoring, process control, alarms, trips, relief devices, flare capacity, isolation, procedures, and emergency response. Each layer addresses a different path from deviation to release. A process-safety explanation should trace mass and energy, define the operating window, identify containment limits, and name each independent protection layer.\n\nDisabling a relief path or deferring corrosion work changes the hazard even when daily production appears normal. Process safety focuses on low-frequency, high-consequence loss of containment rather than only personal injury rates. A refinery contains large inventories of hot, pressurized, flammable material whose chemistry changes with temperature, catalysts, residence time, and contamination. Stable production depends on keeping energy and mass balances inside equipment limits. The unit chronology must keep process trends, overrides, relief status, corrosion readings, work orders, changes, and flare availability on the same timeline.\n\nA complete process history joins thickness readings, chemistry, alarms, overrides, relief status, maintenance deferrals, operating windows, and management-of-change records. Fragmented files hide the interaction among them. Cover competence means distinguishing an ignition source from the reason a flammable inventory escaped and accumulated. The first spark is rarely the whole causal chain. The thermodynamic lesson is to ask where heat, pressure, and reaction energy can go during an upset. If the designed path is unavailable, the vessel or pipe becomes the relief device.",
      "frame": "The Clerk marks a relief line on the drawing at The Control Room. \"Explain detonation & flame theory, then identify the boundary that must hold.\"",
      "q": [
        {
          "q": "Which refinery-safety account most accurately states Yakov Zeldovich's contribution to detonation & flame theory?",
          "o": [
            {
              "t": "Yakov Zeldovich developed influential theories of combustion, detonation, and high-temperature chemical kinetics. Refinery specialists compare the raw pressure-linked override log with inventory state.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Yakov Zeldovich's treatment of detonation & flame theory uses a refinery simplification: one stable temperature or pressure, with inventory, reaction, and protection layers treated as secondary. Refinery fits.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Yakov Zeldovich's refinery work is read within refinery practice as support for steady production as sufficient evidence that containment and relief equipment are ready for an upset. The unit had run normally.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Yakov Zeldovich's authority is invoked in refinery practice to justify keeping a disabled relief path out of service while daily operation still appears controlled. Refinery records fit this refinery account.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        },
        {
          "q": "What process-safety rule follows from this contribution?",
          "o": [
            {
              "t": "Fast chemistry coupled to compression can create self-sustaining detonation, a different regime from ordinary flame spread. Process review keeps the override log available for analysis. Refinery fits. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Use one stable temperature or pressure as the principal indicator of inventory, reaction, and protection status. Recent production supports the view. Refinery records fit this refinery account. Refinery fits.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Assume heat release, vapor pressure, corrosion, and flame behavior remain stable across composition and operating severity. The unit had run normally. Refinery practice makes the refinery view plausible. Refinery fits.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Continue operation without the final protective barrier while stored energy remains inside the unit. Recent production supports the view. Refinery practice makes the refinery view plausible. The refinery record fits.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        },
        {
          "q": "How should a refinery translate this history into barrier management?",
          "o": [
            {
              "t": "The thermodynamic lesson is to ask where heat, pressure, and reaction energy can go during an upset. If the designed path is unavailable, the vessel or pipe becomes the relief device. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Separate override and corrosion findings from the process trend after the unit has restarted successfully. Recent production supports the view. Refinery practice makes the refinery view plausible.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Attribute the fire mainly to an attack or chance ignition rather than asking why flammable inventory escaped containment. The unit had run normally. Refinery records fit this refinery account. Refinery fits.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Repair visible fire damage, restore throughput, and leave the disabled-protection decision outside the restart review. Refinery records fit this refinery account. Refinery timing supports this refinery claim.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        }
      ]
    },
    "rf_fk": {
      "sci": "David Frank-Kamenetskii (1910-1970)",
      "topic": "Thermal explosion theory",
      "lede": "David Frank-Kamenetskii's work on thermal explosion theory made one process hazard calculable before an upset.",
      "no": 12,
      "profile": "Today's process-hazard cover note starts with David Frank-Kamenetskii and thermal explosion theory. David Frank-Kamenetskii analyzed thermal explosion by balancing heat generated by temperature-sensitive reactions against heat lost to surroundings. His dimensionless treatment predicts when a vessel may run away. The contribution gave refinery engineers a way to account for heat, pressure, reaction, corrosion, or relief before a deviation escaped containment.\n\nA stable process can cross into runaway when heat generation rises faster with temperature than cooling can respond. Disabling a relief path or deferring corrosion work changes the hazard even when daily production appears normal. Process safety focuses on low-frequency, high-consequence loss of containment rather than only personal injury rates. A process-safety explanation should trace mass and energy, define the operating window, identify containment limits, and name each independent protection layer.\n\nA refinery contains large inventories of hot, pressurized, flammable material whose chemistry changes with temperature, catalysts, residence time, and contamination. Stable production depends on keeping energy and mass balances inside equipment limits. Protection layers include sound metallurgy, corrosion monitoring, process control, alarms, trips, relief devices, flare capacity, isolation, procedures, and emergency response. Each layer addresses a different path from deviation to release. The unit chronology must keep process trends, overrides, relief status, corrosion readings, work orders, changes, and flare availability on the same timeline.\n\nFrank-Kamenetskii's thermal-explosion theory describes a different path. Reaction rate rises with temperature; if heat generation outpaces conduction and cooling, self-heating accelerates into runaway. The discriminator is a pre-rupture thermal history inside a reacting mass—rising temperature, changing composition, and pressure generated by the reaction itself. A stable process temperature followed by an external release and delayed ignition points away from runaway kinetics.",
      "frame": "The Clerk checks an override list at The Control Room. \"Start with David Frank-Kamenetskii; finish with the protection layer the physics requires.\"",
      "q": [
        {
          "q": "Which refinery-safety account most accurately states David Frank-Kamenetskii's contribution to thermal explosion theory?",
          "o": [
            {
              "t": "David Frank-Kamenetskii analyzed thermal explosion by balancing heat generated by temperature-sensitive reactions against heat lost to surroundings. The process-unit archive stores the raw dated override log.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "David Frank-Kamenetskii's treatment of thermal explosion theory uses a refinery simplification: one stable temperature or pressure, with inventory, reaction, and protection layers treated as secondary. Refinery fits.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "David Frank-Kamenetskii's refinery work is read within refinery practice as support for steady production as sufficient evidence that containment and relief equipment are ready for an upset. The unit had run normally.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "David Frank-Kamenetskii's authority is invoked in refinery practice to justify keeping a disabled relief path out of service while daily operation still appears controlled. Refinery records fit this refinery account.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        },
        {
          "q": "What process-safety rule follows from this contribution?",
          "o": [
            {
              "t": "A stable process can cross into runaway when heat generation rises faster with temperature than cooling can respond. The process-unit archive stores the dated process trend. Refinery fits. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Use one stable temperature or pressure as the principal indicator of inventory, reaction, and protection status. The unit had run normally. Refinery records fit this refinery account. Refinery fits.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Assume heat release, vapor pressure, corrosion, and flame behavior remain stable across composition and operating severity. The unit had run normally. Refinery records fit this refinery account. Refinery fits.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Continue operation without the final protective barrier while stored energy remains inside the unit. Recent production supports the view. Refinery records fit this refinery account. Refinery context matters.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        },
        {
          "q": "How should a refinery translate this history into barrier management?",
          "o": [
            {
              "t": "A complete process history joins thickness readings, chemistry, alarms, overrides, relief status, maintenance deferrals, operating windows, and management-of-change records. Fragmented files hide the interaction among them. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Separate override and corrosion findings from the process trend after the unit has restarted successfully. Steady operation appears persuasive. Recent production supports the view. Refinery practice makes the refinery view plausible.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Attribute the fire mainly to an attack or chance ignition rather than asking why flammable inventory escaped containment. Recent production supports the view. The unit had run normally. Refinery timing supports this refinery claim.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Repair visible fire damage, restore throughput, and leave the disabled-protection decision outside the restart review. Recent production supports the view. Refinery context supports the view. Refinery timing supports this refinery claim.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        }
      ]
    },
    "rf_pourbaix": {
      "sci": "Marcel Pourbaix (1904-1998)",
      "topic": "Corrosion & potential-pH diagrams",
      "lede": "Marcel Pourbaix connected corrosion & potential-pH diagrams with the heat, pressure, chemistry, or containment of process plants.",
      "no": 13,
      "profile": "Today's process-hazard cover note starts with Marcel Pourbaix and corrosion & potential-pH diagrams. Marcel Pourbaix developed potential-pH diagrams that map where a metal is immune, actively corroding, or passivated in aqueous environments. These diagrams organize thermodynamic possibilities for corrosion control. The contribution gave refinery engineers a way to account for heat, pressure, reaction, corrosion, or relief before a deviation escaped containment.\n\nA diagram identifies possible states, but actual corrosion rate still depends on kinetics, deposits, flow, temperature, and local chemistry. A refinery contains large inventories of hot, pressurized, flammable material whose chemistry changes with temperature, catalysts, residence time, and contamination. Stable production depends on keeping energy and mass balances inside equipment limits. A process-safety explanation should trace mass and energy, define the operating window, identify containment limits, and name each independent protection layer.\n\nProtection layers include sound metallurgy, corrosion monitoring, process control, alarms, trips, relief devices, flare capacity, isolation, procedures, and emergency response. Each layer addresses a different path from deviation to release. Disabling a relief path or deferring corrosion work changes the hazard even when daily production appears normal. Process safety focuses on low-frequency, high-consequence loss of containment rather than only personal injury rates. The unit chronology must keep process trends, overrides, relief status, corrosion readings, work orders, changes, and flare availability on the same timeline.\n\nThe thermodynamic lesson is to ask where heat, pressure, and reaction energy can go during an upset. If the designed path is unavailable, the vessel or pipe becomes the relief device. A complete process history joins thickness readings, chemistry, alarms, overrides, relief status, maintenance deferrals, operating windows, and management-of-change records. Fragmented files hide the interaction among them. Cover competence means distinguishing an ignition source from the reason a flammable inventory escaped and accumulated. The first spark is rarely the whole causal chain.",
      "frame": "Operator Delia Fenn studies the process trend at The Operator's Corporate Office. \"Use Marcel Pourbaix to account for the heat, pressure, or chemistry before the release.\"",
      "q": [
        {
          "q": "Which refinery-safety account most accurately states Marcel Pourbaix's contribution to corrosion & potential-pH diagrams?",
          "o": [
            {
              "t": "Marcel Pourbaix developed potential-pH diagrams that map where a metal is immune, actively corroding, or passivated in aqueous environments. Barrier evidence ties the unit-specific relief record to containment protection. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Marcel Pourbaix's refinery work emphasizes one stable temperature or pressure. Steady operation appears persuasive. Recent production supports the view. The unit had run normally. Refinery practice makes the refinery view plausible.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Marcel Pourbaix's refinery work supports steady production as sufficient evidence that containment and relief equipment are ready for an upset. Refinery practice makes the refinery view plausible. Refinery timing supports this refinery claim.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Marcel Pourbaix's refinery authority supports keeping a disabled relief path out of service while daily operation still appears controlled. Recent production supports the view. Refinery practice makes the refinery view plausible. Refinery fits.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        },
        {
          "q": "What process-safety rule follows from this contribution?",
          "o": [
            {
              "t": "A diagram identifies possible states, but actual corrosion rate still depends on kinetics, deposits, flow, temperature, and local chemistry. The operating dossier carries the override log. Refinery fits. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Use one stable temperature or pressure as the principal indicator of inventory, reaction, and protection status. Refinery practice makes the refinery view plausible. Refinery timing supports this refinery claim.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Assume heat release, vapor pressure, corrosion, and flame behavior remain stable across composition and operating severity. Refinery records fit this refinery account. Refinery timing supports this refinery claim.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Continue operation without the final protective barrier while stored energy remains inside the unit. The unit had run normally. Refinery records fit this refinery account. Refinery timing supports this refinery claim.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        },
        {
          "q": "How should a refinery translate this history into barrier management?",
          "o": [
            {
              "t": "Cover competence means distinguishing an ignition source from the reason a flammable inventory escaped and accumulated. The first spark is rarely the whole causal chain. The operating dossier carries the override log. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Separate override and corrosion findings from the process trend after the unit has restarted successfully. Recent production supports the view. Refinery context supports the view. Refinery timing supports this refinery claim. Refinery fits.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Attribute the fire mainly to an attack or chance ignition rather than asking why flammable inventory escaped containment. The unit had run normally. Refinery records fit this refinery account. Refinery timing supports this refinery claim.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Repair visible fire damage, restore throughput, and leave the disabled-protection decision outside the restart review. Recent production supports the view. The unit had run normally. Refinery practice makes the refinery view plausible.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        }
      ]
    },
    "rf_uhlig": {
      "sci": "Herbert H. Uhlig (1907-1993)",
      "topic": "Corrosion engineering",
      "lede": "Through corrosion engineering, Herbert H. Uhlig gave refinery engineers a firmer account of stored energy.",
      "no": 14,
      "profile": "Today's process-hazard cover note starts with Herbert H. Uhlig and corrosion engineering. Herbert H. Uhlig advanced corrosion science and engineering by connecting electrochemistry, materials, environment, and industrial control methods. His texts helped train generations to treat corrosion as preventable degradation. The contribution gave refinery engineers a way to account for heat, pressure, reaction, corrosion, or relief before a deviation escaped containment.\n\nInspection and mitigation must target the actual mechanism, whether uniform attack, pitting, sulfidation, cracking, or erosion-corrosion. Protection layers include sound metallurgy, corrosion monitoring, process control, alarms, trips, relief devices, flare capacity, isolation, procedures, and emergency response. Each layer addresses a different path from deviation to release. A process-safety explanation should trace mass and energy, define the operating window, identify containment limits, and name each independent protection layer.\n\nDisabling a relief path or deferring corrosion work changes the hazard even when daily production appears normal. Process safety focuses on low-frequency, high-consequence loss of containment rather than only personal injury rates. A refinery contains large inventories of hot, pressurized, flammable material whose chemistry changes with temperature, catalysts, residence time, and contamination. Stable production depends on keeping energy and mass balances inside equipment limits. The unit chronology must keep process trends, overrides, relief status, corrosion readings, work orders, changes, and flare availability on the same timeline.\n\nA complete process history joins thickness readings, chemistry, alarms, overrides, relief status, maintenance deferrals, operating windows, and management-of-change records. Fragmented files hide the interaction among them. Cover competence means distinguishing an ignition source from the reason a flammable inventory escaped and accumulated. The first spark is rarely the whole causal chain. The thermodynamic lesson is to ask where heat, pressure, and reaction energy can go during an upset. If the designed path is unavailable, the vessel or pipe becomes the relief device.",
      "frame": "Operator Delia Fenn marks a relief line on the drawing at The Operator's Corporate Office. \"Explain corrosion engineering, then identify the boundary that must hold.\"",
      "q": [
        {
          "q": "Which refinery-safety account most accurately states Herbert H. Uhlig's contribution to corrosion engineering?",
          "o": [
            {
              "t": "Herbert H. Refinery specialists compare the raw pressure-linked corrosion history with inventory state. Refinery specialists compare the dated pressure-linked corrosion history with inventory state.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Herbert H. Uhlig's treatment of corrosion engineering uses a refinery simplification: one stable temperature or pressure, with inventory, reaction, and protection layers treated as secondary. Context fits.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Herbert H. Uhlig's refinery work is read within refinery practice as support for steady production as sufficient evidence that containment and relief equipment are ready for an upset. The unit had run normally.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Herbert H. Uhlig's authority is invoked in refinery practice to justify keeping a disabled relief path out of service while daily operation still appears controlled. The unit had run normally. Fits.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        },
        {
          "q": "What process-safety rule follows from this contribution?",
          "o": [
            {
              "t": "Inspection and mitigation must target the actual mechanism, whether uniform attack, pitting, sulfidation, cracking, or erosion-corrosion. The operating dossier carries the override log. Refinery fits. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Use one stable temperature or pressure as the principal indicator of inventory, reaction, and protection status. Recent production supports the view. Refinery records fit this refinery account. Refinery fits.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Assume heat release, vapor pressure, corrosion, and flame behavior remain stable across composition and operating severity. The unit had run normally. Refinery practice makes the refinery view plausible. Refinery fits.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Continue operation without the final protective barrier while stored energy remains inside the unit. Recent production supports the view. Refinery practice makes the refinery view plausible. The refinery record fits.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        },
        {
          "q": "How should a refinery translate this history into barrier management?",
          "o": [
            {
              "t": "The thermodynamic lesson is to ask where heat, pressure, and reaction energy can go during an upset. If the designed path is unavailable, the vessel or pipe becomes the relief device. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Separate override and corrosion findings from the process trend after the unit has restarted successfully. Recent production supports the view. Refinery practice makes the refinery view plausible.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Attribute the fire mainly to an attack or chance ignition rather than asking why flammable inventory escaped containment. The unit had run normally. Refinery records fit this refinery account. Refinery fits.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Repair visible fire damage, restore throughput, and leave the disabled-protection decision outside the restart review. Refinery records fit this refinery account. Refinery timing supports this refinery claim.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        }
      ]
    },
    "rf_shukhov": {
      "sci": "Vladimir Shukhov (1853-1939)",
      "topic": "Oil refining & thermal cracking",
      "lede": "Vladimir Shukhov's work on oil refining & thermal cracking made one process hazard calculable before an upset.",
      "no": 15,
      "profile": "Today's process-hazard cover note starts with Vladimir Shukhov and oil refining & thermal cracking. Vladimir Shukhov developed early industrial thermal-cracking equipment for petroleum and designed efficient refinery hardware. His work showed how heat and pressure could convert heavy hydrocarbons into lighter products. The contribution gave refinery engineers a way to account for heat, pressure, reaction, corrosion, or relief before a deviation escaped containment.\n\nHigh-temperature conversion requires controlled residence time, pressure, heat flux, metallurgy, and relief capacity. Disabling a relief path or deferring corrosion work changes the hazard even when daily production appears normal. Process safety focuses on low-frequency, high-consequence loss of containment rather than only personal injury rates. A process-safety explanation should trace mass and energy, define the operating window, identify containment limits, and name each independent protection layer.\n\nA refinery contains large inventories of hot, pressurized, flammable material whose chemistry changes with temperature, catalysts, residence time, and contamination. Stable production depends on keeping energy and mass balances inside equipment limits. Protection layers include sound metallurgy, corrosion monitoring, process control, alarms, trips, relief devices, flare capacity, isolation, procedures, and emergency response. Each layer addresses a different path from deviation to release. The unit chronology must keep process trends, overrides, relief status, corrosion readings, work orders, changes, and flare availability on the same timeline.\n\nCover competence means distinguishing an ignition source from the reason a flammable inventory escaped and accumulated. The first spark is rarely the whole causal chain. The thermodynamic lesson is to ask where heat, pressure, and reaction energy can go during an upset. If the designed path is unavailable, the vessel or pipe becomes the relief device. A complete process history joins thickness readings, chemistry, alarms, overrides, relief status, maintenance deferrals, operating windows, and management-of-change records. Fragmented files hide the interaction among them.",
      "frame": "The Board Operator checks an override list at The Operator's Corporate Office. \"Start with Vladimir Shukhov; finish with the protection layer the physics requires.\"",
      "q": [
        {
          "q": "Which refinery-safety account most accurately states Vladimir Shukhov's contribution to oil refining & thermal cracking?",
          "o": [
            {
              "t": "Vladimir Shukhov developed early industrial thermal-cracking equipment for petroleum and designed efficient refinery hardware. Refinery specialists compare the unit-specific override log with inventory state. Context fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Vladimir Shukhov's treatment of oil refining & thermal cracking uses a refinery simplification: one stable temperature or pressure, with inventory, reaction, and protection layers treated as secondary. Refinery fits.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Vladimir Shukhov's refinery work is read within refinery practice as support for steady production as sufficient evidence that containment and relief equipment are ready for an upset. Refinery records fit this refinery account.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Vladimir Shukhov's refinery authority supports keeping a disabled relief path out of service while daily operation still appears controlled. Recent production supports the view. The unit had run normally. Refinery fits.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        },
        {
          "q": "What process-safety rule follows from this contribution?",
          "o": [
            {
              "t": "High-temperature conversion requires controlled residence time, pressure, heat flux, metallurgy, and relief capacity. The process-unit archive stores the dated override log. Refinery fits. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Use one stable temperature or pressure as the principal indicator of inventory, reaction, and protection status. The unit had run normally. Refinery records fit this refinery account. Refinery fits.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Assume heat release, vapor pressure, corrosion, and flame behavior remain stable across composition and operating severity. The unit had run normally. Refinery records fit this refinery account. Refinery fits.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Continue operation without the final protective barrier while stored energy remains inside the unit. Recent production supports the view. Refinery records fit this refinery account. Refinery context matters.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        },
        {
          "q": "How should a refinery translate this history into barrier management?",
          "o": [
            {
              "t": "A complete process history joins thickness readings, chemistry, alarms, overrides, relief status, maintenance deferrals, operating windows, and management-of-change records. Fragmented files hide the interaction among them. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Separate override and corrosion findings from the process trend after the unit has restarted successfully. Steady operation appears persuasive. Recent production supports the view. Refinery practice makes the refinery view plausible.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Attribute the fire mainly to an attack or chance ignition rather than asking why flammable inventory escaped containment. Recent production supports the view. The unit had run normally. Refinery timing supports this refinery claim.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Repair visible fire damage, restore throughput, and leave the disabled-protection decision outside the restart review. Recent production supports the view. Refinery context supports the view. Refinery timing supports this refinery claim.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        }
      ]
    },
    "rf_burton": {
      "sci": "William M. Burton (1865-1954)",
      "topic": "Thermal cracking of petroleum",
      "lede": "William M. Burton connected thermal cracking of petroleum with the heat, pressure, chemistry, or containment of process plants.",
      "no": 16,
      "profile": "Today's process-hazard cover note starts with William M. Burton and thermal cracking of petroleum. William M. Burton developed a commercially successful thermal-cracking process that increased gasoline yield from heavier petroleum fractions. The process operated at elevated temperature and pressure, demanding strong vessels and disciplined control. The contribution gave refinery engineers a way to account for heat, pressure, reaction, corrosion, or relief before a deviation escaped containment.\n\nProfitable severity increases reaction rate and yield, but it also raises coking, pressure, corrosion, and runaway risks. A refinery contains large inventories of hot, pressurized, flammable material whose chemistry changes with temperature, catalysts, residence time, and contamination. Stable production depends on keeping energy and mass balances inside equipment limits. A process-safety explanation should trace mass and energy, define the operating window, identify containment limits, and name each independent protection layer.\n\nProtection layers include sound metallurgy, corrosion monitoring, process control, alarms, trips, relief devices, flare capacity, isolation, procedures, and emergency response. Each layer addresses a different path from deviation to release. Disabling a relief path or deferring corrosion work changes the hazard even when daily production appears normal. Process safety focuses on low-frequency, high-consequence loss of containment rather than only personal injury rates. The unit chronology must keep process trends, overrides, relief status, corrosion readings, work orders, changes, and flare availability on the same timeline.\n\nThe thermodynamic lesson is to ask where heat, pressure, and reaction energy can go during an upset. If the designed path is unavailable, the vessel or pipe becomes the relief device. A complete process history joins thickness readings, chemistry, alarms, overrides, relief status, maintenance deferrals, operating windows, and management-of-change records. Fragmented files hide the interaction among them. Cover competence means distinguishing an ignition source from the reason a flammable inventory escaped and accumulated. The first spark is rarely the whole causal chain.",
      "frame": "The Board Operator studies the process trend at The Operator's Corporate Office. \"Use William M. Burton to account for the heat, pressure, or chemistry before the release.\"",
      "q": [
        {
          "q": "Which refinery-safety account most accurately states William M. Burton's contribution to thermal cracking of petroleum?",
          "o": [
            {
              "t": "William M. Refinery specialists compare the process trend with inventory state. Barrier evidence ties the process trend to containment protection. Refinery specialists compare the raw process trend with inventory state. Refinery fits. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "William M. Burton's refinery work emphasizes one stable temperature or pressure. The unit had run normally. Refinery records fit this refinery account. Refinery practice makes the refinery view plausible. Refinery timing supports this refinery claim.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "William M. Burton's refinery work supports steady production as sufficient evidence that containment and relief equipment are ready for an upset. Refinery records fit this refinery account. Refinery timing supports this refinery claim. Refinery fits.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "William M. Burton's refinery authority supports keeping a disabled relief path out of service while daily operation still appears controlled. Refinery practice makes the refinery view plausible. Refinery timing supports this refinery claim.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        },
        {
          "q": "What process-safety rule follows from this contribution?",
          "o": [
            {
              "t": "Profitable severity increases reaction rate and yield, but it also raises coking, pressure, corrosion, and runaway risks. The operating dossier carries the raw override log. Refinery fits. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Use one stable temperature or pressure as the principal indicator of inventory, reaction, and protection status. The unit had run normally. Refinery records fit this refinery account. Refinery fits.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Assume heat release, vapor pressure, corrosion, and flame behavior remain stable across composition and operating severity. The unit had run normally. Refinery records fit this refinery account. Refinery fits.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Continue operation without the final protective barrier while stored energy remains inside the unit. Recent production supports the view. Refinery records fit this refinery account. Refinery context matters.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        },
        {
          "q": "How should a refinery translate this history into barrier management?",
          "o": [
            {
              "t": "Cover competence means distinguishing an ignition source from the reason a flammable inventory escaped and accumulated. The first spark is rarely the whole causal chain. The operating dossier carries the override log. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Separate override and corrosion findings from the process trend after the unit has restarted successfully. Recent production supports the view. Refinery context supports the view. Refinery timing supports this refinery claim. Refinery fits.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Attribute the fire mainly to an attack or chance ignition rather than asking why flammable inventory escaped containment. The unit had run normally. Refinery records fit this refinery account. Refinery timing supports this refinery claim.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Repair visible fire damage, restore throughput, and leave the disabled-protection decision outside the restart review. Recent production supports the view. The unit had run normally. Refinery practice makes the refinery view plausible.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        }
      ]
    },
    "rf_houdry": {
      "sci": "Eugene Houdry (1892-1962)",
      "topic": "Catalytic cracking",
      "lede": "Through catalytic cracking, Eugene Houdry gave refinery engineers a firmer account of stored energy.",
      "no": 17,
      "profile": "Today's process-hazard cover note starts with Eugene Houdry and catalytic cracking. Eugene Houdry developed catalytic cracking, using solid catalysts to produce higher-quality gasoline at lower severity than purely thermal methods. Continuous catalyst handling later made catalytic cracking a refinery mainstay. The contribution gave refinery engineers a way to account for heat, pressure, reaction, corrosion, or relief before a deviation escaped containment.\n\nCatalysts redirect chemistry but also introduce regeneration heat, coke combustion, circulation, and containment hazards. Protection layers include sound metallurgy, corrosion monitoring, process control, alarms, trips, relief devices, flare capacity, isolation, procedures, and emergency response. Each layer addresses a different path from deviation to release. A process-safety explanation should trace mass and energy, define the operating window, identify containment limits, and name each independent protection layer.\n\nDisabling a relief path or deferring corrosion work changes the hazard even when daily production appears normal. Process safety focuses on low-frequency, high-consequence loss of containment rather than only personal injury rates. A refinery contains large inventories of hot, pressurized, flammable material whose chemistry changes with temperature, catalysts, residence time, and contamination. Stable production depends on keeping energy and mass balances inside equipment limits. The unit chronology must keep process trends, overrides, relief status, corrosion readings, work orders, changes, and flare availability on the same timeline.\n\nA complete process history joins thickness readings, chemistry, alarms, overrides, relief status, maintenance deferrals, operating windows, and management-of-change records. Fragmented files hide the interaction among them. Cover competence means distinguishing an ignition source from the reason a flammable inventory escaped and accumulated. The first spark is rarely the whole causal chain. The thermodynamic lesson is to ask where heat, pressure, and reaction energy can go during an upset. If the designed path is unavailable, the vessel or pipe becomes the relief device.",
      "frame": "The Clerk marks a relief line on the drawing at The Operator's Corporate Office. \"Explain catalytic cracking, then identify the boundary that must hold.\"",
      "q": [
        {
          "q": "Which refinery-safety account most accurately states Eugene Houdry's contribution to catalytic cracking?",
          "o": [
            {
              "t": "Eugene Houdry developed catalytic cracking, using solid catalysts to produce higher-quality gasoline at lower severity than purely thermal methods. The operating dossier carries the override log.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Eugene Houdry's refinery work emphasizes one stable temperature or pressure. Steady operation appears persuasive. Recent production supports the view. Refinery practice makes the refinery view plausible.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Eugene Houdry's refinery work is read within refinery practice as support for steady production as sufficient evidence that containment and relief equipment are ready for an upset. The unit had run normally.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Eugene Houdry's authority is invoked in refinery practice to justify keeping a disabled relief path out of service while daily operation still appears controlled. The unit had run normally. Refinery fits.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        },
        {
          "q": "What process-safety rule follows from this contribution?",
          "o": [
            {
              "t": "Catalysts redirect chemistry but also introduce regeneration heat, coke combustion, circulation, and containment hazards. The process-unit archive stores the unit-specific override log. Refinery fits. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Use one stable temperature or pressure as the principal indicator of inventory, reaction, and protection status. Recent production supports the view. Refinery records fit this refinery account. Refinery fits.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Assume heat release, vapor pressure, corrosion, and flame behavior remain stable across composition and operating severity. The unit had run normally. Refinery practice makes the refinery view plausible. Refinery fits.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Continue operation without the final protective barrier while stored energy remains inside the unit. Recent production supports the view. Refinery practice makes the refinery view plausible. The refinery record fits.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        },
        {
          "q": "How should a refinery translate this history into barrier management?",
          "o": [
            {
              "t": "The thermodynamic lesson is to ask where heat, pressure, and reaction energy can go during an upset. If the designed path is unavailable, the vessel or pipe becomes the relief device. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Separate override and corrosion findings from the process trend after the unit has restarted successfully. Recent production supports the view. Refinery practice makes the refinery view plausible.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Attribute the fire mainly to an attack or chance ignition rather than asking why flammable inventory escaped containment. The unit had run normally. Refinery records fit this refinery account. Refinery fits.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Repair visible fire damage, restore throughput, and leave the disabled-protection decision outside the restart review. Refinery records fit this refinery account. Refinery timing supports this refinery claim.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        }
      ]
    },
    "rf_papin": {
      "sci": "Denis Papin (1647-1713)",
      "topic": "The pressure vessel & the safety valve",
      "lede": "Denis Papin's work on the pressure vessel & the safety valve made one process hazard calculable before an upset.",
      "no": 18,
      "profile": "Today's process-hazard cover note starts with Denis Papin and the pressure vessel & the safety valve. Denis Papin built a pressure digester and added a weight-loaded safety valve to prevent dangerous overpressure. His device was an early demonstration that pressure vessels need an independent path to relieve excess energy. The contribution gave refinery engineers a way to account for heat, pressure, reaction, corrosion, or relief before a deviation escaped containment.\n\nA relief valve is a last barrier, not spare capacity to be isolated for convenience while the process continues. Disabling a relief path or deferring corrosion work changes the hazard even when daily production appears normal. Process safety focuses on low-frequency, high-consequence loss of containment rather than only personal injury rates. A process-safety explanation should trace mass and energy, define the operating window, identify containment limits, and name each independent protection layer.\n\nA refinery contains large inventories of hot, pressurized, flammable material whose chemistry changes with temperature, catalysts, residence time, and contamination. Stable production depends on keeping energy and mass balances inside equipment limits. Protection layers include sound metallurgy, corrosion monitoring, process control, alarms, trips, relief devices, flare capacity, isolation, procedures, and emergency response. Each layer addresses a different path from deviation to release. The unit chronology must keep process trends, overrides, relief status, corrosion readings, work orders, changes, and flare availability on the same timeline.\n\nPapin's pressure-vessel work defines the evidence expected from a boiling-liquid expanding-vapor explosion. A BLEVE requires a vessel containing liquid above its atmospheric boiling point, sudden loss of containment, rapid flashing, and often large fragments thrown from a recognizable rupture. Fire may follow, but vessel failure is the initiating physical event. If the main vessel remains substantially intact while burning extends through congested pipework, the BLEVE hypothesis loses force.",
      "frame": "The Clerk checks an override list at The Operator's Corporate Office. \"Start with Denis Papin; finish with the protection layer the physics requires.\"",
      "q": [
        {
          "q": "Which refinery-safety account most accurately states Denis Papin's contribution to the pressure vessel & the safety valve?",
          "o": [
            {
              "t": "Denis Papin built a pressure digester and added a weight-loaded safety valve to prevent dangerous overpressure. The operating dossier carries the raw dated corrosion history. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Denis Papin's refinery work relies on one stable temperature or pressure. The unit had run normally. Refinery records fit this refinery account. Refinery timing supports this refinery claim.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Denis Papin's refinery work supports steady production as sufficient evidence that containment and relief equipment are ready for an upset. Refinery records fit this refinery account.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Denis Papin's refinery authority supports keeping a disabled relief path out of service while daily operation still appears controlled. Refinery timing supports this refinery claim.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        },
        {
          "q": "What process-safety rule follows from this contribution?",
          "o": [
            {
              "t": "A relief valve is a last barrier, not spare capacity to be isolated for convenience while the process continues. The process-unit archive stores the raw dated relief record. Refinery fits. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Use one stable temperature or pressure as the principal indicator of inventory, reaction, and protection status. The unit had run normally. Refinery records fit this refinery account. Refinery fits.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Assume heat release, vapor pressure, corrosion, and flame behavior remain stable across composition and operating severity. The unit had run normally. Refinery records fit this refinery account. Refinery fits.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Continue operation without the final protective barrier while stored energy remains inside the unit. Recent production supports the view. Refinery records fit this refinery account. Refinery context matters.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        },
        {
          "q": "How should a refinery translate this history into barrier management?",
          "o": [
            {
              "t": "A complete process history joins thickness readings, chemistry, alarms, overrides, relief status, maintenance deferrals, operating windows, and management-of-change records. Fragmented files hide the interaction among them. Refinery fits.",
              "v": "expert",
              "fb": "Correct: the answer links thermodynamics or chemistry with containment, relief, and verified protection layers."
            },
            {
              "t": "Separate override and corrosion findings from the process trend after the unit has restarted successfully. Steady operation appears persuasive. Recent production supports the view. Refinery practice makes the refinery view plausible.",
              "v": "partial",
              "fb": "This explains one process variable but leaves containment or escalation control incomplete."
            },
            {
              "t": "Attribute the fire mainly to an attack or chance ignition rather than asking why flammable inventory escaped containment. Recent production supports the view. The unit had run normally. Refinery timing supports this refinery claim.",
              "v": "wrong",
              "fb": "That account uses the wrong thermodynamic mechanism or assumes normal production proves safe condition."
            },
            {
              "t": "Repair visible fire damage, restore throughput, and leave the disabled-protection decision outside the restart review. Recent production supports the view. Refinery context supports the view. Refinery timing supports this refinery claim.",
              "v": "danger",
              "fb": "That shortcut removes a protection layer while stored energy and flammable inventory remain unchanged."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "unitop": {
      "units": "Inside The Process Units & Flare, Operator Delia Fenn has set a numbered field sketch under a hydrocarbon marker. \"Thermodynamics first; show me the reading held together before I open the shift record.\"",
      "control": "Inside The Control Room, Operator Delia Fenn has set the archived trend display under a hydrocarbon marker. \"Thermodynamics first; show me the reading held together before I open the shift record.\"",
      "office": "Inside The Operator's Corporate Office, Operator Delia Fenn has set a sealed inspection binder under a hydrocarbon marker. \"Thermodynamics first; show me the reading held together before I open the shift record.\""
    },
    "boardop": {
      "units": "Inside The Process Units & Flare, The Board Operator has set a numbered field sketch under a hydrocarbon marker. \"The trend archive is earned by precision, not by the most dramatic refinery story.\"",
      "control": "Inside The Control Room, The Board Operator has set the archived trend display under a hydrocarbon marker. \"The trend archive is earned by precision, not by the most dramatic refinery story.\"",
      "office": "Inside The Operator's Corporate Office, The Board Operator has set a sealed inspection binder under a hydrocarbon marker. \"The trend archive is earned by precision, not by the most dramatic refinery story.\""
    },
    "clerk": {
      "units": "Inside The Process Units & Flare, The Clerk has set a numbered field sketch under a hydrocarbon marker. \"Handle today's combustion scholar correctly and the inspection correspondence comes next.\"",
      "control": "Inside The Control Room, The Clerk has set the archived trend display under a hydrocarbon marker. \"Handle today's combustion scholar correctly and the inspection correspondence comes next.\"",
      "office": "Inside The Operator's Corporate Office, The Clerk has set a sealed inspection binder under a hydrocarbon marker. \"Handle today's combustion scholar correctly and the inspection correspondence comes next.\""
    }
  },
  "story": [
    "<b>The process unit is cold now, but soot shadows trace where flame moved around pipe racks.</b>",
    "<b>Operator Delia Fenn</b> knows the physical unit; <b>The Board Operator</b> holds the process chronology trends; <b>The Clerk</b> can follow the approval trail.",
    "Your names are Garon Voss — refinery operator, The unit superintendent, and The state safety inspector; your reading problem pits <b>A boiling-liquid vapor explosion ruptured a heated vessel</b> against <b>A runaway reaction generated heat faster than it escaped</b> in the process chronology evidence.",
    "<b>Salvage crews enter in eight days, and vessel positions and fragment locations must be recorded first.</b>"
  ],
  "endings": {
    "overclaimWhat": "attack",
    "dismissalWhat": "freak",
    "win": {
      "expertTitle": "The Cloud Before the Flame",
      "expert": [
        "Investigator Cara Mendel names Garon Voss — refinery operator, The Operator's Corporate Office, and A released vapor cloud ignited among congested equipment. Not A boiling-liquid vapor explosion ruptured a heated vessel. Not A runaway reaction generated heat faster than it escaped.",
        "The readings show that vessel rupture, thermal runaway, and delayed vapor ignition leave different signatures in pressure history, fragments, temperature evolution, and the spatial reach of flame."
      ],
      "soundTitle": "A Defensible Process Reconstruction",
      "sound": [
        "Hydrocarbon evidence fixes the trio: Garon Voss — refinery operator; The Operator's Corporate Office; A released vapor cloud ignited among congested equipment.",
        "The process reconstruction holds, but absent inspection papers leave one management link exposed."
      ],
      "namedTitle": "Correct Event, Incomplete Proof",
      "named": [
        "Hydrocarbon evidence points to Garon Voss — refinery operator, The Operator's Corporate Office, and A released vapor cloud ignited among congested equipment; hydrocarbon support remains incomplete.",
        "Correct process physics cannot substitute for the absent papers needed to sustain a formal refinery finding."
      ]
    },
    "overclaim": {
      "title": "The BLEVE Explanation",
      "body": [
        "Investigator Cara Mendel reports A boiling-liquid vapor explosion ruptured a heated vessel. Vessel evidence fails the specific BLEVE test.",
        "A BLEVE begins with catastrophic failure of a vessel holding superheated liquid and normally leaves a clear rupture origin, vessel fragments, and rapid flashing from that inventory. Those markers do not fit a cloud dispersed beyond intact equipment."
      ]
    },
    "dismissal": {
      "title": "The Runaway-Reaction Explanation",
      "body": [
        "Investigator Cara Mendel instead reports A runaway reaction generated heat faster than it escaped. Temperature history does not show self-accelerating chemistry.",
        "A runaway reaction accelerates within reactive material as heat generation outruns removal; the temperature curve rises before containment fails. Here the critical sequence is loss of containment, dispersion, and delayed ignition rather than self-heating chemistry."
      ]
    },
    "wrongNames": {
      "title": "Right Event, Wrong Names",
      "body": [
        "The vapor-cloud interpretation survives, but the selected actor or office does not. The process evidence must be joined to the correct names."
      ]
    }
  }
}
};
