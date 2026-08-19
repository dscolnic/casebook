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
  "boardNarr": "You have ${days} before your inquiry ends. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The place you test determines the dossier you receive, and the conversation costs one day.",
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
        "rf_carnot"
      ],
      "boardop": [
        "rf_joule"
      ],
      "clerk": [
        "rf_clapeyron"
      ]
    },
    "control": {
      "unitop": [
        "rf_berthelot"
      ],
      "boardop": [
        "rf_davy"
      ],
      "clerk": [
        "rf_zeldovich"
      ]
    },
    "office": {
      "unitop": [
        "rf_pourbaix"
      ],
      "boardop": [
        "rf_shukhov"
      ],
      "clerk": [
        "rf_houdry"
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
      "frame": "Studies the process trend at The Process Units & Flare. \"Use Sadi Carnot to account for the heat, pressure, or chemistry before the release.\"",
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
    "rf_joule": {
      "sci": "James Prescott Joule (1818-1889)",
      "topic": "The mechanical equivalent of heat",
      "lede": "James Prescott Joule's work on the mechanical equivalent of heat made one process hazard calculable before an upset.",
      "no": 2,
      "profile": "Today's process-hazard cover note starts with James Prescott Joule and the mechanical equivalent of heat. James Prescott Joule measured the mechanical equivalent of heat, establishing that work and heat are forms of energy. His paddle-wheel experiments helped anchor the first law of thermodynamics. The contribution gave refinery engineers a way to account for heat, pressure, reaction, corrosion, or relief before a deviation escaped containment.\n\nAn energy balance must include mechanical work, heat transfer, reaction energy, and accumulation inside the process equipment. Disabling a relief path or deferring corrosion work changes the hazard even when daily production appears normal. Process safety focuses on low-frequency, high-consequence loss of containment rather than only personal injury rates. A process-safety explanation should trace mass and energy, define the operating window, identify containment limits, and name each independent protection layer.\n\nA refinery contains large inventories of hot, pressurized, flammable material whose chemistry changes with temperature, catalysts, residence time, and contamination. Stable production depends on keeping energy and mass balances inside equipment limits. Protection layers include sound metallurgy, corrosion monitoring, process control, alarms, trips, relief devices, flare capacity, isolation, procedures, and emergency response. Each layer addresses a different path from deviation to release. The unit chronology must keep process trends, overrides, relief status, corrosion readings, work orders, changes, and flare availability on the same timeline.\n\nCover competence means distinguishing an ignition source from the reason a flammable inventory escaped and accumulated. The first spark is rarely the whole causal chain. The thermodynamic lesson is to ask where heat, pressure, and reaction energy can go during an upset. If the designed path is unavailable, the vessel or pipe becomes the relief device. A complete process history joins thickness readings, chemistry, alarms, overrides, relief status, maintenance deferrals, operating windows, and management-of-change records. Fragmented files hide the interaction among them.",
      "frame": "Checks an override list at The Process Units & Flare. \"Start with James Prescott Joule; finish with the protection layer the physics requires.\"",
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
    "rf_clapeyron": {
      "sci": "Benoit Clapeyron (1799-1864)",
      "topic": "Vapor pressure & the Clausius-Clapeyron relation",
      "lede": "Through vapor pressure & the Clausius-Clapeyron relation, Benoit Clapeyron gave refinery engineers a firmer account of stored energy.",
      "no": 3,
      "profile": "Today's process-hazard cover note starts with Benoit Clapeyron and vapor pressure & the Clausius-Clapeyron relation. Benoît Clapeyron expressed Carnot's ideas mathematically and developed the relation later refined as the Clausius-Clapeyron equation. It links vapor pressure with temperature and latent heat. The contribution gave refinery engineers a way to account for heat, pressure, reaction, corrosion, or relief before a deviation escaped containment.\n\nHeating a volatile liquid can raise vapor pressure rapidly, increasing the load on containment and relief systems. Protection layers include sound metallurgy, corrosion monitoring, process control, alarms, trips, relief devices, flare capacity, isolation, procedures, and emergency response. Each layer addresses a different path from deviation to release. A process-safety explanation should trace mass and energy, define the operating window, identify containment limits, and name each independent protection layer.\n\nDisabling a relief path or deferring corrosion work changes the hazard even when daily production appears normal. Process safety focuses on low-frequency, high-consequence loss of containment rather than only personal injury rates. A refinery contains large inventories of hot, pressurized, flammable material whose chemistry changes with temperature, catalysts, residence time, and contamination. Stable production depends on keeping energy and mass balances inside equipment limits. The unit chronology must keep process trends, overrides, relief status, corrosion readings, work orders, changes, and flare availability on the same timeline.\n\nA complete process history joins thickness readings, chemistry, alarms, overrides, relief status, maintenance deferrals, operating windows, and management-of-change records. Fragmented files hide the interaction among them. Cover competence means distinguishing an ignition source from the reason a flammable inventory escaped and accumulated. The first spark is rarely the whole causal chain. The thermodynamic lesson is to ask where heat, pressure, and reaction energy can go during an upset. If the designed path is unavailable, the vessel or pipe becomes the relief device.",
      "frame": "Marks a relief line on the drawing at The Process Units & Flare. \"Explain vapor pressure & the Clausius-Clapeyron relation, then identify the boundary that must hold.\"",
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
    "rf_berthelot": {
      "sci": "Marcellin Berthelot (1827-1907)",
      "topic": "Thermochemistry & explosives",
      "lede": "Marcellin Berthelot connected thermochemistry & explosives with the heat, pressure, chemistry, or containment of process plants.",
      "no": 4,
      "profile": "Today's process-hazard cover note starts with Marcellin Berthelot and thermochemistry & explosives. Marcellin Berthelot measured heats of reaction and investigated explosives and combustion. He helped make thermochemistry a quantitative tool for comparing the energy released by chemical transformations. The contribution gave refinery engineers a way to account for heat, pressure, reaction, corrosion, or relief before a deviation escaped containment.\n\nEnergy content alone does not determine blast severity; release rate, confinement, mixing, and ignition location also control pressure. A refinery contains large inventories of hot, pressurized, flammable material whose chemistry changes with temperature, catalysts, residence time, and contamination. Stable production depends on keeping energy and mass balances inside equipment limits. A process-safety explanation should trace mass and energy, define the operating window, identify containment limits, and name each independent protection layer.\n\nProtection layers include sound metallurgy, corrosion monitoring, process control, alarms, trips, relief devices, flare capacity, isolation, procedures, and emergency response. Each layer addresses a different path from deviation to release. Disabling a relief path or deferring corrosion work changes the hazard even when daily production appears normal. Process safety focuses on low-frequency, high-consequence loss of containment rather than only personal injury rates. The unit chronology must keep process trends, overrides, relief status, corrosion readings, work orders, changes, and flare availability on the same timeline.\n\nThe thermodynamic lesson is to ask where heat, pressure, and reaction energy can go during an upset. If the designed path is unavailable, the vessel or pipe becomes the relief device. A complete process history joins thickness readings, chemistry, alarms, overrides, relief status, maintenance deferrals, operating windows, and management-of-change records. Fragmented files hide the interaction among them. Cover competence means distinguishing an ignition source from the reason a flammable inventory escaped and accumulated. The first spark is rarely the whole causal chain.",
      "frame": "Studies the process trend at The Control Room. \"Use Marcellin Berthelot to account for the heat, pressure, or chemistry before the release.\"",
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
    "rf_davy": {
      "sci": "Humphry Davy (1778-1829)",
      "topic": "The safety lamp & flame arrest",
      "lede": "Humphry Davy's work on the safety lamp & flame arrest made one process hazard calculable before an upset.",
      "no": 5,
      "profile": "Today's process-hazard cover note starts with Humphry Davy and the safety lamp & flame arrest. Humphry Davy designed a safety lamp whose metal gauze cooled flame fronts and prevented them from igniting surrounding firedamp under proper conditions. The lamp demonstrated practical flame arrest. The contribution gave refinery engineers a way to account for heat, pressure, reaction, corrosion, or relief before a deviation escaped containment.\n\nA flame arresting element works only within its tested geometry, gas group, temperature, cleanliness, and flow limits. Disabling a relief path or deferring corrosion work changes the hazard even when daily production appears normal. Process safety focuses on low-frequency, high-consequence loss of containment rather than only personal injury rates. A process-safety explanation should trace mass and energy, define the operating window, identify containment limits, and name each independent protection layer.\n\nA refinery contains large inventories of hot, pressurized, flammable material whose chemistry changes with temperature, catalysts, residence time, and contamination. Stable production depends on keeping energy and mass balances inside equipment limits. Protection layers include sound metallurgy, corrosion monitoring, process control, alarms, trips, relief devices, flare capacity, isolation, procedures, and emergency response. Each layer addresses a different path from deviation to release. The unit chronology must keep process trends, overrides, relief status, corrosion readings, work orders, changes, and flare availability on the same timeline.\n\nCover competence means distinguishing an ignition source from the reason a flammable inventory escaped and accumulated. The first spark is rarely the whole causal chain. The thermodynamic lesson is to ask where heat, pressure, and reaction energy can go during an upset. If the designed path is unavailable, the vessel or pipe becomes the relief device. A complete process history joins thickness readings, chemistry, alarms, overrides, relief status, maintenance deferrals, operating windows, and management-of-change records. Fragmented files hide the interaction among them.",
      "frame": "Checks an override list at The Control Room. \"Start with Humphry Davy; finish with the protection layer the physics requires.\"",
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
    "rf_zeldovich": {
      "sci": "Yakov Zeldovich (1914-1987)",
      "topic": "Detonation & flame theory",
      "lede": "Through detonation & flame theory, Yakov Zeldovich gave refinery engineers a firmer account of stored energy.",
      "no": 6,
      "profile": "Today's process-hazard cover note starts with Yakov Zeldovich and detonation & flame theory. Yakov Zeldovich developed influential theories of combustion, detonation, and high-temperature chemical kinetics. The Zeldovich-von Neumann-Döring model describes the shock and reaction structure of detonation. The contribution gave refinery engineers a way to account for heat, pressure, reaction, corrosion, or relief before a deviation escaped containment.\n\nFast chemistry coupled to compression can create self-sustaining detonation, a different regime from ordinary flame spread. Protection layers include sound metallurgy, corrosion monitoring, process control, alarms, trips, relief devices, flare capacity, isolation, procedures, and emergency response. Each layer addresses a different path from deviation to release. A process-safety explanation should trace mass and energy, define the operating window, identify containment limits, and name each independent protection layer.\n\nDisabling a relief path or deferring corrosion work changes the hazard even when daily production appears normal. Process safety focuses on low-frequency, high-consequence loss of containment rather than only personal injury rates. A refinery contains large inventories of hot, pressurized, flammable material whose chemistry changes with temperature, catalysts, residence time, and contamination. Stable production depends on keeping energy and mass balances inside equipment limits. The unit chronology must keep process trends, overrides, relief status, corrosion readings, work orders, changes, and flare availability on the same timeline.\n\nA complete process history joins thickness readings, chemistry, alarms, overrides, relief status, maintenance deferrals, operating windows, and management-of-change records. Fragmented files hide the interaction among them. Cover competence means distinguishing an ignition source from the reason a flammable inventory escaped and accumulated. The first spark is rarely the whole causal chain. The thermodynamic lesson is to ask where heat, pressure, and reaction energy can go during an upset. If the designed path is unavailable, the vessel or pipe becomes the relief device.",
      "frame": "Marks a relief line on the drawing at The Control Room. \"Explain detonation & flame theory, then identify the boundary that must hold.\"",
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
    "rf_pourbaix": {
      "sci": "Marcel Pourbaix (1904-1998)",
      "topic": "Corrosion & potential-pH diagrams",
      "lede": "Marcel Pourbaix connected corrosion & potential-pH diagrams with the heat, pressure, chemistry, or containment of process plants.",
      "no": 7,
      "profile": "Today's process-hazard cover note starts with Marcel Pourbaix and corrosion & potential-pH diagrams. Marcel Pourbaix developed potential-pH diagrams that map where a metal is immune, actively corroding, or passivated in aqueous environments. These diagrams organize thermodynamic possibilities for corrosion control. The contribution gave refinery engineers a way to account for heat, pressure, reaction, corrosion, or relief before a deviation escaped containment.\n\nA diagram identifies possible states, but actual corrosion rate still depends on kinetics, deposits, flow, temperature, and local chemistry. A refinery contains large inventories of hot, pressurized, flammable material whose chemistry changes with temperature, catalysts, residence time, and contamination. Stable production depends on keeping energy and mass balances inside equipment limits. A process-safety explanation should trace mass and energy, define the operating window, identify containment limits, and name each independent protection layer.\n\nProtection layers include sound metallurgy, corrosion monitoring, process control, alarms, trips, relief devices, flare capacity, isolation, procedures, and emergency response. Each layer addresses a different path from deviation to release. Disabling a relief path or deferring corrosion work changes the hazard even when daily production appears normal. Process safety focuses on low-frequency, high-consequence loss of containment rather than only personal injury rates. The unit chronology must keep process trends, overrides, relief status, corrosion readings, work orders, changes, and flare availability on the same timeline.\n\nThe thermodynamic lesson is to ask where heat, pressure, and reaction energy can go during an upset. If the designed path is unavailable, the vessel or pipe becomes the relief device. A complete process history joins thickness readings, chemistry, alarms, overrides, relief status, maintenance deferrals, operating windows, and management-of-change records. Fragmented files hide the interaction among them. Cover competence means distinguishing an ignition source from the reason a flammable inventory escaped and accumulated. The first spark is rarely the whole causal chain.",
      "frame": "Studies the process trend at The Operator's Corporate Office. \"Use Marcel Pourbaix to account for the heat, pressure, or chemistry before the release.\"",
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
    "rf_shukhov": {
      "sci": "Vladimir Shukhov (1853-1939)",
      "topic": "Oil refining & thermal cracking",
      "lede": "Vladimir Shukhov's work on oil refining & thermal cracking made one process hazard calculable before an upset.",
      "no": 8,
      "profile": "Today's process-hazard cover note starts with Vladimir Shukhov and oil refining & thermal cracking. Vladimir Shukhov developed early industrial thermal-cracking equipment for petroleum and designed efficient refinery hardware. His work showed how heat and pressure could convert heavy hydrocarbons into lighter products. The contribution gave refinery engineers a way to account for heat, pressure, reaction, corrosion, or relief before a deviation escaped containment.\n\nHigh-temperature conversion requires controlled residence time, pressure, heat flux, metallurgy, and relief capacity. Disabling a relief path or deferring corrosion work changes the hazard even when daily production appears normal. Process safety focuses on low-frequency, high-consequence loss of containment rather than only personal injury rates. A process-safety explanation should trace mass and energy, define the operating window, identify containment limits, and name each independent protection layer.\n\nA refinery contains large inventories of hot, pressurized, flammable material whose chemistry changes with temperature, catalysts, residence time, and contamination. Stable production depends on keeping energy and mass balances inside equipment limits. Protection layers include sound metallurgy, corrosion monitoring, process control, alarms, trips, relief devices, flare capacity, isolation, procedures, and emergency response. Each layer addresses a different path from deviation to release. The unit chronology must keep process trends, overrides, relief status, corrosion readings, work orders, changes, and flare availability on the same timeline.\n\nCover competence means distinguishing an ignition source from the reason a flammable inventory escaped and accumulated. The first spark is rarely the whole causal chain. The thermodynamic lesson is to ask where heat, pressure, and reaction energy can go during an upset. If the designed path is unavailable, the vessel or pipe becomes the relief device. A complete process history joins thickness readings, chemistry, alarms, overrides, relief status, maintenance deferrals, operating windows, and management-of-change records. Fragmented files hide the interaction among them.",
      "frame": "Checks an override list at The Operator's Corporate Office. \"Start with Vladimir Shukhov; finish with the protection layer the physics requires.\"",
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
    "rf_houdry": {
      "sci": "Eugene Houdry (1892-1962)",
      "topic": "Catalytic cracking",
      "lede": "Through catalytic cracking, Eugene Houdry gave refinery engineers a firmer account of stored energy.",
      "no": 9,
      "profile": "Today's process-hazard cover note starts with Eugene Houdry and catalytic cracking. Eugene Houdry developed catalytic cracking, using solid catalysts to produce higher-quality gasoline at lower severity than purely thermal methods. Continuous catalyst handling later made catalytic cracking a refinery mainstay. The contribution gave refinery engineers a way to account for heat, pressure, reaction, corrosion, or relief before a deviation escaped containment.\n\nCatalysts redirect chemistry but also introduce regeneration heat, coke combustion, circulation, and containment hazards. Protection layers include sound metallurgy, corrosion monitoring, process control, alarms, trips, relief devices, flare capacity, isolation, procedures, and emergency response. Each layer addresses a different path from deviation to release. A process-safety explanation should trace mass and energy, define the operating window, identify containment limits, and name each independent protection layer.\n\nDisabling a relief path or deferring corrosion work changes the hazard even when daily production appears normal. Process safety focuses on low-frequency, high-consequence loss of containment rather than only personal injury rates. A refinery contains large inventories of hot, pressurized, flammable material whose chemistry changes with temperature, catalysts, residence time, and contamination. Stable production depends on keeping energy and mass balances inside equipment limits. The unit chronology must keep process trends, overrides, relief status, corrosion readings, work orders, changes, and flare availability on the same timeline.\n\nA complete process history joins thickness readings, chemistry, alarms, overrides, relief status, maintenance deferrals, operating windows, and management-of-change records. Fragmented files hide the interaction among them. Cover competence means distinguishing an ignition source from the reason a flammable inventory escaped and accumulated. The first spark is rarely the whole causal chain. The thermodynamic lesson is to ask where heat, pressure, and reaction energy can go during an upset. If the designed path is unavailable, the vessel or pipe becomes the relief device.",
      "frame": "Marks a relief line on the drawing at The Operator's Corporate Office. \"Explain catalytic cracking, then identify the boundary that must hold.\"",
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
    "<b>The Halden Refinery Fire</b> opens inside the Halden refinery inquiry, where the visible damage is easier to describe than the chain that produced it.",
    "<b>Operator Delia Fenn</b>, <b>The Board Operator</b>, and <b>The Clerk</b> each control a different slice of the record, and each conversation turns one real pioneer into a way of reading the case.",
    "Some witnesses are drawn toward <b>A boiling-liquid vapor explosion ruptured a heated vessel.</b>; others settle too quickly on <b>A runaway reaction generated heat faster than it escaped.</b>. Your job is to separate those tempting stories from the harder explanation the evidence supports.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide what the case is really about."
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
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A refinery process train with a vapor cloud fire\"><path d=\"M64 112 L64 36 L106 36 L106 112\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M134 112 L134 24 L176 24 L176 112\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M216 72 L396 72 L396 112\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M106 54 L134 54 M176 48 L216 48 L216 72\" stroke=\"#121212\" stroke-width=\"1.5\" fill=\"none\"/><path d=\"M396 72 C422 52,454 52,480 72 C508 92,540 92,568 72\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2.4\"/><circle cx=\"478\" cy=\"72\" r=\"8\" fill=\"#B3261E\"/><path d=\"M422 34 C468 24,526 26,610 44\" fill=\"none\" stroke=\"#e2e2d8\" stroke-width=\"1\"/></svg>"
}};
