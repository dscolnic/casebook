module.exports = { PACK: {
  "id": "t_battery",
  "title": "The Kelso Grid-Battery Fire",
  "discipline": "Electrochemistry & Battery Safety",
  "teaser": "One rack ignited before fire spread through the storage yard. Did lithium dendrites pierce a separator, or did the control system overcharge the modules? The origin cell must decide.",
  "overclaimTag": "a lithium-dendrite short",
  "truthTag": "a separator defect followed by thermal propagation",
  "venue": "the Kelso battery-fire inquiry",
  "agent": {
    "name": "Investigator Pier Solano",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Battery & Electrochemistry Pioneers",
  "dossierName": "BATTERY & ELECTROCHEMISTRY PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Kelso battery-fire inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before your inquiry ends. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The place you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "Dendrites and overcharge are familiar explanations for a battery fire; cell-by-cell onset and voltage history must do the choosing.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "maker",
      "items": [
        {
          "id": "maker",
          "label": "Elena Corso — battery manufacturer"
        },
        {
          "id": "operator",
          "label": "The storage-site operator"
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
          "label": "The Battery Yard & Racks"
        },
        {
          "id": "bms",
          "label": "The Control & BMS Room"
        },
        {
          "id": "office",
          "label": "The Manufacturer's Design Office"
        }
      ]
    },
    "what": {
      "title": "What initiated the battery fire?",
      "truth": "defect",
      "items": [
        {
          "id": "attack",
          "label": "Lithium plating grew dendrites that pierced the cell separator."
        },
        {
          "id": "freak",
          "label": "BMS overcharge pushed every module beyond its safe voltage limit."
        },
        {
          "id": "defect",
          "label": "Separator failure began runaway that cooling could not arrest."
        }
      ]
    }
  },
  "PLACES": {
    "yard": {
      "name": "The Battery Yard & Racks",
      "xy": [
        140,
        90
      ]
    },
    "bms": {
      "name": "The Control & BMS Room",
      "xy": [
        330,
        240
      ]
    },
    "office": {
      "name": "The Manufacturer's Design Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "yard",
      "bms"
    ],
    [
      "bms",
      "office"
    ]
  ],
  "CHARACTERS": {
    "tech": {
      "name": "Technician Oyaro",
      "role": "Battery technician",
      "face": "🔋",
      "badge": "T",
      "legend": "the battery yard",
      "hint": "Handled the affected modules and can identify their lot, rack position, and chain of custody."
    },
    "bmseng": {
      "name": "The BMS Engineer",
      "role": "Battery-management engineer",
      "face": "🖥",
      "badge": "M",
      "legend": "the control room",
      "hint": "Maintains the control archive and can explain who changed settings and where those changes were approved."
    },
    "clerk": {
      "name": "The Clerk",
      "role": "Records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Keeps design revisions, supplier records, and the correspondence connecting the manufacturer to the site."
    }
  },
  "TOPICMAP": {
    "yard": {
      "tech": [
        "bt_galvani"
      ],
      "bmseng": [
        "bt_grove"
      ],
      "clerk": [
        "bt_leclanche"
      ]
    },
    "bms": {
      "tech": [
        "bt_edison"
      ],
      "bmseng": [
        "bt_tafel"
      ],
      "clerk": [
        "bt_whittingham"
      ]
    },
    "office": {
      "tech": [
        "bt_yoshino"
      ],
      "bmseng": [
        "bt_armand"
      ],
      "clerk": [
        "bt_newman"
      ]
    }
  },
  "TOPICS": {
    "bt_galvani": {
      "whatHint": "Galvani's cell fails from within its own chemistry. Ask whether the fault began inside one cell or was forced on the whole pack.",
      "sci": "Luigi Galvani (1737-1798)",
      "topic": "Galvanic action & the cell",
      "lede": "Luigi Galvani used galvanic action & the cell to reveal how materials store, move, and release electrochemical energy.",
      "no": 1,
      "profile": "The electrochemical-storage note today follows Luigi Galvani into galvanic action & the cell. Luigi Galvani observed frog muscles contracting when connected through metals and interpreted the effect as animal electricity. The experiments provoked a debate that led Alessandro Volta to distinguish biological response from electricity generated by dissimilar materials. That contribution linked materials and reactions to a cell behavior that designers could measure through voltage, current, heat, or cycling.\n\nElectrochemical voltage arises from coupled reactions and materials, not from a mysterious store of charge inside one electrode. A battery cell couples thermodynamics, reaction kinetics, ion transport, electronic conduction, mechanical change, and heat. A pack multiplies those interactions across many cells connected to cooling, sensing, switching, and control software. A battery explanation should distinguish thermodynamic voltage, kinetic loss, transport, local temperature, mechanical change, and the protection logic wrapped around the cell.\n\nBattery management estimates quantities that are not directly visible, including state of charge, internal resistance, and remaining margin. Voltage, current, and temperature must be interpreted with chemistry, history, and sensor placement. Thermal runaway is an escalation process. Internal shorting or side reactions generate heat, which accelerates further reactions; propagation barriers, cooling, isolation, venting, and emergency planning determine whether one cell becomes a site-wide event. The pack record should retain cell-resolved traces, lot genealogy, balancing, impedance, cooling state, cutoff commands, alarms, and teardown evidence.\n\nThe materials lesson is that energy density and safety cannot be separated after design. Electrode choice, separator quality, electrolyte stability, manufacturing control, and protective electronics define the same product. A useful cell history retains formation data, lot genealogy, impedance, temperature excursions, balancing behavior, alarms, and teardown findings. Aggregated pack averages can conceal the one cell approaching failure. Cover fluency means rejecting both magical sabotage and meaningless bad luck until the electrochemical and thermal sequence is reconstructed. Defect evidence and disabled protection have distinct signatures.",
      "frame": "Isolates a module at The Battery Yard & Racks. \"Use Luigi Galvani to separate cell chemistry from the pack controls around it.\"",
      "q": [
        {
          "q": "Which battery-science account best describes Luigi Galvani's contribution to galvanic action & the cell?",
          "o": [
            {
              "t": "Luigi Galvani observed frog muscles contracting when connected through metals and interpreted the effect as animal electricity. The pack dossier carries the raw time-stamped lot record. Battery fits.",
              "v": "expert",
              "fb": "Correct: the answer links cell chemistry with heat, sensing, and layered pack protection."
            },
            {
              "t": "Luigi Galvani's battery work emphasizes pack averages and nominal ratings. Battery context supports the view. Battery practice makes the battery view plausible. Battery timing supports this battery claim.",
              "v": "partial",
              "fb": "This captures one electrochemical feature but leaves thermal or control-system behavior unresolved."
            },
            {
              "t": "Luigi Galvani's battery work is read within battery practice as support for nominal voltage and normal output as sufficient evidence that the cells remain safe. Battery records fit this battery account.",
              "v": "wrong",
              "fb": "That explanation assigns the wrong reaction or treats nominal voltage as proof of cell health."
            },
            {
              "t": "Luigi Galvani's authority is invoked in battery practice to justify disabling a thermal cutoff when repeated protective trips interrupt useful output. Pack averages look reassuring. Battery fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices the protective action designed to stop one abnormal cell from propagating."
            }
          ]
        },
        {
          "q": "What electrochemical safety principle follows here?",
          "o": [
            {
              "t": "Electrochemical voltage arises from coupled reactions and materials, not from a mysterious store of charge inside one electrode. The pack dossier carries the cell trace. Battery fits.",
              "v": "expert",
              "fb": "Correct: the answer links cell chemistry with heat, sensing, and layered pack protection."
            },
            {
              "t": "Use the pack average for temperature and voltage, treating cell-level resistance and side reactions as later refinements. The protection trip seems conservative. The battery record fits.",
              "v": "partial",
              "fb": "This captures one electrochemical feature but leaves thermal or control-system behavior unresolved."
            },
            {
              "t": "Assume electrode potential and reaction rate remain stable across state of charge, aging, current, and temperature. Pack averages look reassuring. Battery records fit this battery account.",
              "v": "wrong",
              "fb": "That explanation assigns the wrong reaction or treats nominal voltage as proof of cell health."
            },
            {
              "t": "Keep the abnormal module connected while protective isolation is suppressed and the pack continues meeting demand. Pack averages look reassuring. Battery records fit this battery account.",
              "v": "danger",
              "fb": "That shortcut sacrifices the protective action designed to stop one abnormal cell from propagating."
            }
          ]
        },
        {
          "q": "How should a battery designer act on this history?",
          "o": [
            {
              "t": "Cover fluency means rejecting both magical sabotage and meaningless bad luck until the electrochemical and thermal sequence is reconstructed. Defect evidence and disabled protection have distinct signatures. Battery fits.",
              "v": "expert",
              "fb": "Correct: the answer links cell chemistry with heat, sensing, and layered pack protection."
            },
            {
              "t": "Drop manufacturing genealogy and protection settings from routine review after the battery is installed. The module still delivers power. Battery records fit this battery account. Battery timing supports this battery claim.",
              "v": "partial",
              "fb": "This captures one electrochemical feature but leaves thermal or control-system behavior unresolved."
            },
            {
              "t": "Attribute the fire mainly to arson or random cell bad luck rather than a defect-propagation sequence. Pack averages look reassuring. The protection trip seems conservative. Battery records fit this battery account. Battery fits.",
              "v": "wrong",
              "fb": "That explanation assigns the wrong reaction or treats nominal voltage as proof of cell health."
            },
            {
              "t": "Reset the pack, restore output, and wait for visible smoke before escalating the thermal trend. The protection trip seems conservative. Battery practice makes the battery view plausible. Battery timing supports this battery claim.",
              "v": "danger",
              "fb": "That shortcut sacrifices the protective action designed to stop one abnormal cell from propagating."
            }
          ]
        }
      ]
    },
    "bt_grove": {
      "whatHint": "Grove showed a cell's behaviour is written in its voltage. Ask what the origin cell's voltage did just before onset — and whether its neighbours did the same.",
      "sci": "William Robert Grove (1811-1896)",
      "topic": "The fuel cell",
      "lede": "William Robert Grove's work on the fuel cell helped turn reactive materials into engineered energy storage.",
      "no": 2,
      "profile": "The electrochemical-storage note today follows William Robert Grove into the fuel cell. William Robert Grove demonstrated a gas battery in which hydrogen and oxygen combined electrochemically to produce electricity and water. It was an early fuel cell and also illustrated the reversibility between electrolysis and power generation. That contribution linked materials and reactions to a cell behavior that designers could measure through voltage, current, heat, or cycling.\n\nA fuel cell converts chemical free energy directly, but safe operation depends on gas purity, separation, catalysts, water, and heat management. Thermal runaway is an escalation process. Internal shorting or side reactions generate heat, which accelerates further reactions; propagation barriers, cooling, isolation, venting, and emergency planning determine whether one cell becomes a site-wide event. A battery explanation should distinguish thermodynamic voltage, kinetic loss, transport, local temperature, mechanical change, and the protection logic wrapped around the cell.\n\nA battery cell couples thermodynamics, reaction kinetics, ion transport, electronic conduction, mechanical change, and heat. A pack multiplies those interactions across many cells connected to cooling, sensing, switching, and control software. Battery management estimates quantities that are not directly visible, including state of charge, internal resistance, and remaining margin. Voltage, current, and temperature must be interpreted with chemistry, history, and sensor placement. The pack record should retain cell-resolved traces, lot genealogy, balancing, impedance, cooling state, cutoff commands, alarms, and teardown evidence.\n\nCover fluency means rejecting both magical sabotage and meaningless bad luck until the electrochemical and thermal sequence is reconstructed. Defect evidence and disabled protection have distinct signatures. The materials lesson is that energy density and safety cannot be separated after design. Electrode choice, separator quality, electrolyte stability, manufacturing control, and protective electronics define the same product. A useful cell history retains formation data, lot genealogy, impedance, temperature excursions, balancing behavior, alarms, and teardown findings. Aggregated pack averages can conceal the one cell approaching failure.",
      "frame": "Places a swollen cell on the bench at The Battery Yard & Racks. \"Start with William Robert Grove; do not stop at nominal voltage.\"",
      "q": [
        {
          "q": "Which battery-science account best describes William Robert Grove's contribution to the fuel cell?",
          "o": [
            {
              "t": "William Robert Grove demonstrated a gas battery in which hydrogen and oxygen combined electrochemically to produce electricity and water. The pack dossier carries the cell-resolved protection log. Battery fits.",
              "v": "expert",
              "fb": "Correct: the answer links cell chemistry with heat, sensing, and layered pack protection."
            },
            {
              "t": "William Robert Grove's battery work relies on pack averages and nominal ratings. The protection trip seems conservative. Battery practice makes the battery view plausible. Battery timing supports this battery claim.",
              "v": "partial",
              "fb": "This captures one electrochemical feature but leaves thermal or control-system behavior unresolved."
            },
            {
              "t": "William Robert Grove's battery work is read within battery practice as support for nominal voltage and normal output as sufficient evidence that the cells remain safe. Battery practice makes the battery view plausible.",
              "v": "wrong",
              "fb": "That explanation assigns the wrong reaction or treats nominal voltage as proof of cell health."
            },
            {
              "t": "William Robert Grove's authority is invoked in battery practice to justify disabling a thermal cutoff when repeated protective trips interrupt useful output. Battery timing supports this battery claim. Battery fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices the protective action designed to stop one abnormal cell from propagating."
            }
          ]
        },
        {
          "q": "What electrochemical safety principle follows here?",
          "o": [
            {
              "t": "A fuel cell converts chemical free energy directly, but safe operation depends on gas purity, separation, catalysts, water, and heat management. The pack dossier carries the lot record. Battery fits.",
              "v": "expert",
              "fb": "Correct: the answer links cell chemistry with heat, sensing, and layered pack protection."
            },
            {
              "t": "Use the pack average for temperature and voltage, treating cell-level resistance and side reactions as later refinements. Pack averages look reassuring. Battery records fit this battery account.",
              "v": "partial",
              "fb": "This captures one electrochemical feature but leaves thermal or control-system behavior unresolved."
            },
            {
              "t": "Assume electrode potential and reaction rate remain stable across state of charge, aging, current, and temperature. The protection trip seems conservative. Battery timing supports this battery claim.",
              "v": "wrong",
              "fb": "That explanation assigns the wrong reaction or treats nominal voltage as proof of cell health."
            },
            {
              "t": "Keep the abnormal module connected while protective isolation is suppressed and the pack continues meeting demand. Battery context supports the view. Battery timing supports this battery claim.",
              "v": "danger",
              "fb": "That shortcut sacrifices the protective action designed to stop one abnormal cell from propagating."
            }
          ]
        },
        {
          "q": "How should a battery designer act on this history?",
          "o": [
            {
              "t": "A useful cell history retains formation data, lot genealogy, impedance, temperature excursions, balancing behavior, alarms, and teardown findings. Aggregated pack averages can conceal the one cell approaching failure. Battery context matters. Battery fits.",
              "v": "expert",
              "fb": "Correct: the answer links cell chemistry with heat, sensing, and layered pack protection."
            },
            {
              "t": "Drop manufacturing genealogy and protection settings from routine review after the battery is installed. The protection trip seems conservative. Battery practice makes the battery view plausible. Battery timing supports this battery claim. The battery record fits.",
              "v": "partial",
              "fb": "This captures one electrochemical feature but leaves thermal or control-system behavior unresolved."
            },
            {
              "t": "Attribute the fire mainly to arson or random cell bad luck rather than a defect-propagation sequence. The protection trip seems conservative. Battery practice makes the battery view plausible. Battery timing supports this battery claim. The battery record fits.",
              "v": "wrong",
              "fb": "That explanation assigns the wrong reaction or treats nominal voltage as proof of cell health."
            },
            {
              "t": "Reset the pack, restore output, and wait for visible smoke before escalating the thermal trend. Pack averages look reassuring. The module still delivers power. Battery records fit this battery account. Battery timing supports this battery claim. Battery fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices the protective action designed to stop one abnormal cell from propagating."
            }
          ]
        }
      ]
    },
    "bt_leclanche": {
      "whatHint": "Leclanché's cell depends on a clean separation of its parts. Ask whether an internal separation failed in one cell rather than a command reaching many.",
      "sci": "Georges Leclanche (1839-1882)",
      "topic": "The dry cell",
      "lede": "Through the dry cell, Georges Leclanche connected cell chemistry with voltage, current, heat, or durability.",
      "no": 3,
      "profile": "The electrochemical-storage note today follows Georges Leclanche into the dry cell. Georges Leclanché developed a zinc-manganese dioxide cell with an ammonium chloride electrolyte. Later sealed and paste-electrolyte versions became the familiar dry cell used in portable devices. That contribution linked materials and reactions to a cell behavior that designers could measure through voltage, current, heat, or cycling.\n\nConvenient packaging does not remove internal resistance, leakage, polarization, or the limits of the chemistry under high drain. Battery management estimates quantities that are not directly visible, including state of charge, internal resistance, and remaining margin. Voltage, current, and temperature must be interpreted with chemistry, history, and sensor placement. A battery explanation should distinguish thermodynamic voltage, kinetic loss, transport, local temperature, mechanical change, and the protection logic wrapped around the cell.\n\nThermal runaway is an escalation process. Internal shorting or side reactions generate heat, which accelerates further reactions; propagation barriers, cooling, isolation, venting, and emergency planning determine whether one cell becomes a site-wide event. A battery cell couples thermodynamics, reaction kinetics, ion transport, electronic conduction, mechanical change, and heat. A pack multiplies those interactions across many cells connected to cooling, sensing, switching, and control software. The pack record should retain cell-resolved traces, lot genealogy, balancing, impedance, cooling state, cutoff commands, alarms, and teardown evidence.\n\nA useful cell history retains formation data, lot genealogy, impedance, temperature excursions, balancing behavior, alarms, and teardown findings. Aggregated pack averages can conceal the one cell approaching failure. Cover fluency means rejecting both magical sabotage and meaningless bad luck until the electrochemical and thermal sequence is reconstructed. Defect evidence and disabled protection have distinct signatures. The materials lesson is that energy density and safety cannot be separated after design. Electrode choice, separator quality, electrolyte stability, manufacturing control, and protective electronics define the same product.",
      "frame": "Enlarges a temperature trace at The Battery Yard & Racks. \"Explain the dry cell, then tell me where heat enters the answer.\"",
      "q": [
        {
          "q": "Which battery-science account best describes Georges Leclanche's contribution to the dry cell?",
          "o": [
            {
              "t": "Georges Leclanché developed a zinc-manganese dioxide cell with an ammonium chloride electrolyte. The pack dossier carries the thermal history. The pack dossier carries the raw thermal history. Fits.",
              "v": "expert",
              "fb": "Correct: the answer links cell chemistry with heat, sensing, and layered pack protection."
            },
            {
              "t": "Georges Leclanche's battery work emphasizes pack averages and nominal ratings. The protection trip seems conservative. Battery context supports the view. Battery timing supports this battery claim.",
              "v": "partial",
              "fb": "This captures one electrochemical feature but leaves thermal or control-system behavior unresolved."
            },
            {
              "t": "Georges Leclanche's battery work is read within battery practice as support for nominal voltage and normal output as sufficient evidence that the cells remain safe. Battery timing supports this battery claim.",
              "v": "wrong",
              "fb": "That explanation assigns the wrong reaction or treats nominal voltage as proof of cell health."
            },
            {
              "t": "Georges Leclanche's authority is invoked in battery practice to justify disabling a thermal cutoff when repeated protective trips interrupt useful output. Battery timing supports this battery claim.",
              "v": "danger",
              "fb": "That shortcut sacrifices the protective action designed to stop one abnormal cell from propagating."
            }
          ]
        },
        {
          "q": "What electrochemical safety principle follows here?",
          "o": [
            {
              "t": "Convenient packaging does not remove internal resistance, leakage, polarization, or the limits of the chemistry under high drain. The pack dossier carries the raw thermal history. Battery fits.",
              "v": "expert",
              "fb": "Correct: the answer links cell chemistry with heat, sensing, and layered pack protection."
            },
            {
              "t": "Use the pack average for temperature and voltage, treating cell-level resistance and side reactions as later refinements. Pack averages look reassuring. Battery records fit this battery account.",
              "v": "partial",
              "fb": "This captures one electrochemical feature but leaves thermal or control-system behavior unresolved."
            },
            {
              "t": "Assume electrode potential and reaction rate remain stable across state of charge, aging, current, and temperature. Battery records fit this battery account. Battery timing supports this battery claim.",
              "v": "wrong",
              "fb": "That explanation assigns the wrong reaction or treats nominal voltage as proof of cell health."
            },
            {
              "t": "Keep the abnormal module connected while protective isolation is suppressed and the pack continues meeting demand. Pack averages look reassuring. Battery records fit this battery account. Battery fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices the protective action designed to stop one abnormal cell from propagating."
            }
          ]
        },
        {
          "q": "How should a battery designer act on this history?",
          "o": [
            {
              "t": "The materials lesson is that energy density and safety cannot be separated after design. Electrode choice, separator quality, electrolyte stability, manufacturing control, and protective electronics define the same product. Battery fits. Battery fits. Battery fits.",
              "v": "expert",
              "fb": "Correct: the answer links cell chemistry with heat, sensing, and layered pack protection."
            },
            {
              "t": "Drop manufacturing genealogy and protection settings from routine review after the battery is installed. The protection trip seems conservative. Battery practice makes the battery view plausible. Battery timing supports this battery claim. The battery record fits.",
              "v": "partial",
              "fb": "This captures one electrochemical feature but leaves thermal or control-system behavior unresolved."
            },
            {
              "t": "Attribute the fire mainly to arson or random cell bad luck rather than a defect-propagation sequence. The protection trip seems conservative. Battery practice makes the battery view plausible. Battery timing supports this battery claim. The battery record fits.",
              "v": "wrong",
              "fb": "That explanation assigns the wrong reaction or treats nominal voltage as proof of cell health."
            },
            {
              "t": "Reset the pack, restore output, and wait for visible smoke before escalating the thermal trend. Pack averages look reassuring. The module still delivers power. Battery records fit this battery account. Battery timing supports this battery claim. Battery fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices the protective action designed to stop one abnormal cell from propagating."
            }
          ]
        }
      ]
    },
    "bt_edison": {
      "whatHint": "Edison prized rugged cells that tolerate abuse. Ask whether this cell's history shows the aggressive charging a dendrite needs — or ordinary use gone wrong inside.",
      "sci": "Thomas Edison (1847-1931)",
      "topic": "The nickel-iron battery",
      "lede": "Thomas Edison used the nickel-iron battery to reveal how materials store, move, and release electrochemical energy.",
      "no": 4,
      "profile": "The electrochemical-storage note today follows Thomas Edison into the nickel-iron battery. Thomas Edison developed a nickel-iron alkaline battery intended for traction and industrial use. It was durable and tolerant of abuse, but had lower efficiency, significant gas evolution, and high self-discharge. That contribution linked materials and reactions to a cell behavior that designers could measure through voltage, current, heat, or cycling.\n\nChoosing a battery means accepting a particular combination of energy density, efficiency, maintenance, lifetime, and abuse response. A battery cell couples thermodynamics, reaction kinetics, ion transport, electronic conduction, mechanical change, and heat. A pack multiplies those interactions across many cells connected to cooling, sensing, switching, and control software. A battery explanation should distinguish thermodynamic voltage, kinetic loss, transport, local temperature, mechanical change, and the protection logic wrapped around the cell.\n\nBattery management estimates quantities that are not directly visible, including state of charge, internal resistance, and remaining margin. Voltage, current, and temperature must be interpreted with chemistry, history, and sensor placement. Thermal runaway is an escalation process. Internal shorting or side reactions generate heat, which accelerates further reactions; propagation barriers, cooling, isolation, venting, and emergency planning determine whether one cell becomes a site-wide event. The pack record should retain cell-resolved traces, lot genealogy, balancing, impedance, cooling state, cutoff commands, alarms, and teardown evidence.\n\nThe materials lesson is that energy density and safety cannot be separated after design. Electrode choice, separator quality, electrolyte stability, manufacturing control, and protective electronics define the same product. A useful cell history retains formation data, lot genealogy, impedance, temperature excursions, balancing behavior, alarms, and teardown findings. Aggregated pack averages can conceal the one cell approaching failure. Cover fluency means rejecting both magical sabotage and meaningless bad luck until the electrochemical and thermal sequence is reconstructed. Defect evidence and disabled protection have distinct signatures.",
      "frame": "Isolates a module at The Control & BMS Room. \"Use Thomas Edison to separate cell chemistry from the pack controls around it.\"",
      "q": [
        {
          "q": "Which battery-science account best describes Thomas Edison's contribution to the nickel-iron battery?",
          "o": [
            {
              "t": "Thomas Edison developed a nickel-iron alkaline battery intended for traction and industrial use. Propagation review keeps the cell-lab verified protection log available for analysis.",
              "v": "expert",
              "fb": "Correct: the answer links cell chemistry with heat, sensing, and layered pack protection."
            },
            {
              "t": "Thomas Edison's battery work emphasizes pack averages and nominal ratings. Pack averages look reassuring. The protection trip seems conservative. Battery records fit this battery account.",
              "v": "partial",
              "fb": "This captures one electrochemical feature but leaves thermal or control-system behavior unresolved."
            },
            {
              "t": "Thomas Edison's battery work is read within battery practice as support for nominal voltage and normal output as sufficient evidence that the cells remain safe. Pack averages look reassuring.",
              "v": "wrong",
              "fb": "That explanation assigns the wrong reaction or treats nominal voltage as proof of cell health."
            },
            {
              "t": "Thomas Edison's authority is invoked in battery practice to justify disabling a thermal cutoff when repeated protective trips interrupt useful output. Pack averages look reassuring.",
              "v": "danger",
              "fb": "That shortcut sacrifices the protective action designed to stop one abnormal cell from propagating."
            }
          ]
        },
        {
          "q": "What electrochemical safety principle follows here?",
          "o": [
            {
              "t": "Choosing a battery means accepting a particular combination of energy density, efficiency, maintenance, lifetime, and abuse response. The pack dossier carries the lot record. Battery fits.",
              "v": "expert",
              "fb": "Correct: the answer links cell chemistry with heat, sensing, and layered pack protection."
            },
            {
              "t": "Use the pack average for temperature and voltage, treating cell-level resistance and side reactions as later refinements. The protection trip seems conservative. The battery record fits.",
              "v": "partial",
              "fb": "This captures one electrochemical feature but leaves thermal or control-system behavior unresolved."
            },
            {
              "t": "Assume electrode potential and reaction rate remain stable across state of charge, aging, current, and temperature. Pack averages look reassuring. Battery records fit this battery account.",
              "v": "wrong",
              "fb": "That explanation assigns the wrong reaction or treats nominal voltage as proof of cell health."
            },
            {
              "t": "Keep the abnormal module connected while protective isolation is suppressed and the pack continues meeting demand. Pack averages look reassuring. Battery records fit this battery account.",
              "v": "danger",
              "fb": "That shortcut sacrifices the protective action designed to stop one abnormal cell from propagating."
            }
          ]
        },
        {
          "q": "How should a battery designer act on this history?",
          "o": [
            {
              "t": "Cover fluency means rejecting both magical sabotage and meaningless bad luck until the electrochemical and thermal sequence is reconstructed. Defect evidence and disabled protection have distinct signatures. Battery fits.",
              "v": "expert",
              "fb": "Correct: the answer links cell chemistry with heat, sensing, and layered pack protection."
            },
            {
              "t": "Drop manufacturing genealogy and protection settings from routine review after the battery is installed. The module still delivers power. Battery records fit this battery account. Battery timing supports this battery claim.",
              "v": "partial",
              "fb": "This captures one electrochemical feature but leaves thermal or control-system behavior unresolved."
            },
            {
              "t": "Attribute the fire mainly to arson or random cell bad luck rather than a defect-propagation sequence. Pack averages look reassuring. The protection trip seems conservative. Battery records fit this battery account. Battery fits.",
              "v": "wrong",
              "fb": "That explanation assigns the wrong reaction or treats nominal voltage as proof of cell health."
            },
            {
              "t": "Reset the pack, restore output, and wait for visible smoke before escalating the thermal trend. The protection trip seems conservative. Battery practice makes the battery view plausible. Battery timing supports this battery claim.",
              "v": "danger",
              "fb": "That shortcut sacrifices the protective action designed to stop one abnormal cell from propagating."
            }
          ]
        }
      ]
    },
    "bt_tafel": {
      "whatHint": "Tafel tied plating to charging conditions. Lithium dendrites want cold, fast, or over-charging; ask whether the cell's record shows any of that.",
      "sci": "Julius Tafel (1862-1918)",
      "topic": "Electrode kinetics & the Tafel equation",
      "lede": "Julius Tafel's work on electrode kinetics & the Tafel equation helped turn reactive materials into engineered energy storage.",
      "no": 5,
      "profile": "The electrochemical-storage note today follows Julius Tafel into electrode kinetics & the Tafel equation. Julius Tafel found a logarithmic relation between electrode overpotential and reaction current in many electrochemical systems. The Tafel equation helps describe activation losses and reaction kinetics. That contribution linked materials and reactions to a cell behavior that designers could measure through voltage, current, heat, or cycling.\n\nHigh current requires extra driving voltage, producing heat and changing which reactions dominate at an electrode surface. Thermal runaway is an escalation process. Internal shorting or side reactions generate heat, which accelerates further reactions; propagation barriers, cooling, isolation, venting, and emergency planning determine whether one cell becomes a site-wide event. A battery explanation should distinguish thermodynamic voltage, kinetic loss, transport, local temperature, mechanical change, and the protection logic wrapped around the cell.\n\nA battery cell couples thermodynamics, reaction kinetics, ion transport, electronic conduction, mechanical change, and heat. A pack multiplies those interactions across many cells connected to cooling, sensing, switching, and control software. Battery management estimates quantities that are not directly visible, including state of charge, internal resistance, and remaining margin. Voltage, current, and temperature must be interpreted with chemistry, history, and sensor placement. The pack record should retain cell-resolved traces, lot genealogy, balancing, impedance, cooling state, cutoff commands, alarms, and teardown evidence.\n\nCover fluency means rejecting both magical sabotage and meaningless bad luck until the electrochemical and thermal sequence is reconstructed. Defect evidence and disabled protection have distinct signatures. The materials lesson is that energy density and safety cannot be separated after design. Electrode choice, separator quality, electrolyte stability, manufacturing control, and protective electronics define the same product. A useful cell history retains formation data, lot genealogy, impedance, temperature excursions, balancing behavior, alarms, and teardown findings. Aggregated pack averages can conceal the one cell approaching failure.",
      "frame": "Places a swollen cell on the bench at The Control & BMS Room. \"Start with Julius Tafel; do not stop at nominal voltage.\"",
      "q": [
        {
          "q": "Which battery-science account best describes Julius Tafel's contribution to electrode kinetics & the Tafel equation?",
          "o": [
            {
              "t": "Julius Tafel found a logarithmic relation between electrode overpotential and reaction current in many electrochemical systems. The pack dossier carries the raw time-stamped lot record. Battery fits.",
              "v": "expert",
              "fb": "Correct: the answer links cell chemistry with heat, sensing, and layered pack protection."
            },
            {
              "t": "Julius Tafel's battery work emphasizes pack averages and nominal ratings. The protection trip seems conservative. Battery records fit this battery account. Battery timing supports this battery claim.",
              "v": "partial",
              "fb": "This captures one electrochemical feature but leaves thermal or control-system behavior unresolved."
            },
            {
              "t": "Julius Tafel's battery work is read within battery practice as support for nominal voltage and normal output as sufficient evidence that the cells remain safe. Battery timing supports this battery claim.",
              "v": "wrong",
              "fb": "That explanation assigns the wrong reaction or treats nominal voltage as proof of cell health."
            },
            {
              "t": "Julius Tafel's authority is invoked in battery practice to justify disabling a thermal cutoff when repeated protective trips interrupt useful output. Battery records fit this battery account.",
              "v": "danger",
              "fb": "That shortcut sacrifices the protective action designed to stop one abnormal cell from propagating."
            }
          ]
        },
        {
          "q": "What electrochemical safety principle follows here?",
          "o": [
            {
              "t": "High current requires extra driving voltage, producing heat and changing which reactions dominate at an electrode surface. The pack dossier carries the raw cell trace. Battery fits.",
              "v": "expert",
              "fb": "Correct: the answer links cell chemistry with heat, sensing, and layered pack protection."
            },
            {
              "t": "Use the pack average for temperature and voltage, treating cell-level resistance and side reactions as later refinements. The protection trip seems conservative. The battery record fits.",
              "v": "partial",
              "fb": "This captures one electrochemical feature but leaves thermal or control-system behavior unresolved."
            },
            {
              "t": "Assume electrode potential and reaction rate remain stable across state of charge, aging, current, and temperature. Pack averages look reassuring. Battery records fit this battery account.",
              "v": "wrong",
              "fb": "That explanation assigns the wrong reaction or treats nominal voltage as proof of cell health."
            },
            {
              "t": "Keep the abnormal module connected while protective isolation is suppressed and the pack continues meeting demand. The protection trip seems conservative. The battery practice fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices the protective action designed to stop one abnormal cell from propagating."
            }
          ]
        },
        {
          "q": "How should a battery designer act on this history?",
          "o": [
            {
              "t": "A useful cell history retains formation data, lot genealogy, impedance, temperature excursions, balancing behavior, alarms, and teardown findings. Aggregated pack averages can conceal the one cell approaching failure. Battery context matters. Battery fits.",
              "v": "expert",
              "fb": "Correct: the answer links cell chemistry with heat, sensing, and layered pack protection."
            },
            {
              "t": "Drop manufacturing genealogy and protection settings from routine review after the battery is installed. The protection trip seems conservative. Battery practice makes the battery view plausible. Battery timing supports this battery claim. The battery record fits.",
              "v": "partial",
              "fb": "This captures one electrochemical feature but leaves thermal or control-system behavior unresolved."
            },
            {
              "t": "Attribute the fire mainly to arson or random cell bad luck rather than a defect-propagation sequence. The protection trip seems conservative. Battery practice makes the battery view plausible. Battery timing supports this battery claim. The battery record fits.",
              "v": "wrong",
              "fb": "That explanation assigns the wrong reaction or treats nominal voltage as proof of cell health."
            },
            {
              "t": "Reset the pack, restore output, and wait for visible smoke before escalating the thermal trend. Pack averages look reassuring. The module still delivers power. Battery records fit this battery account. Battery timing supports this battery claim. Battery fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices the protective action designed to stop one abnormal cell from propagating."
            }
          ]
        }
      ]
    },
    "bt_whittingham": {
      "whatHint": "Whittingham's chemistry works only while the separator keeps the electrodes apart. Ask whether that barrier failed in the origin cell.",
      "sci": "M. Stanley Whittingham (b. 1941)",
      "topic": "Intercalation & the lithium battery",
      "lede": "Through intercalation & the lithium battery, M. Stanley Whittingham connected cell chemistry with voltage, current, heat, or durability.",
      "no": 6,
      "profile": "The electrochemical-storage note today follows M. Stanley Whittingham into intercalation & the lithium battery. M. Stanley Whittingham developed an early rechargeable lithium battery using intercalation, inserting lithium ions reversibly into a layered titanium disulfide cathode. Metallic lithium made the design energetic but raised dendrite and safety problems. That contribution linked materials and reactions to a cell behavior that designers could measure through voltage, current, heat, or cycling.\n\nHigh energy requires stable hosts, controlled interfaces, and protection against internal short circuits during repeated cycling. Battery management estimates quantities that are not directly visible, including state of charge, internal resistance, and remaining margin. Voltage, current, and temperature must be interpreted with chemistry, history, and sensor placement. A battery explanation should distinguish thermodynamic voltage, kinetic loss, transport, local temperature, mechanical change, and the protection logic wrapped around the cell.\n\nThermal runaway is an escalation process. Internal shorting or side reactions generate heat, which accelerates further reactions; propagation barriers, cooling, isolation, venting, and emergency planning determine whether one cell becomes a site-wide event. A battery cell couples thermodynamics, reaction kinetics, ion transport, electronic conduction, mechanical change, and heat. A pack multiplies those interactions across many cells connected to cooling, sensing, switching, and control software. The pack record should retain cell-resolved traces, lot genealogy, balancing, impedance, cooling state, cutoff commands, alarms, and teardown evidence.\n\nA useful cell history retains formation data, lot genealogy, impedance, temperature excursions, balancing behavior, alarms, and teardown findings. Aggregated pack averages can conceal the one cell approaching failure. Cover fluency means rejecting both magical sabotage and meaningless bad luck until the electrochemical and thermal sequence is reconstructed. Defect evidence and disabled protection have distinct signatures. The materials lesson is that energy density and safety cannot be separated after design. Electrode choice, separator quality, electrolyte stability, manufacturing control, and protective electronics define the same product.",
      "frame": "Enlarges a temperature trace at The Control & BMS Room. \"Explain intercalation & the lithium battery, then tell me where heat enters the answer.\"",
      "q": [
        {
          "q": "Which battery-science account best describes M. Stanley Whittingham's contribution to intercalation & the lithium battery?",
          "o": [
            {
              "t": "M. Propagation review keeps the protection log available for analysis. The cell-genealogy file stores the protection log. Battery analysts compare the raw protection log with module behavior.",
              "v": "expert",
              "fb": "Correct: the answer links cell chemistry with heat, sensing, and layered pack protection."
            },
            {
              "t": "M. Stanley Whittingham's battery work emphasizes pack averages and nominal ratings. Pack averages look reassuring. The protection trip seems conservative. Battery records fit this battery account.",
              "v": "partial",
              "fb": "This captures one electrochemical feature but leaves thermal or control-system behavior unresolved."
            },
            {
              "t": "M. Stanley Whittingham's battery work is read within battery practice as support for nominal voltage and normal output as sufficient evidence that the cells remain safe. Pack averages look reassuring.",
              "v": "wrong",
              "fb": "That explanation assigns the wrong reaction or treats nominal voltage as proof of cell health."
            },
            {
              "t": "M. Stanley Whittingham's authority is invoked in battery practice to justify disabling a thermal cutoff when repeated protective trips interrupt useful output. Pack averages look reassuring.",
              "v": "danger",
              "fb": "That shortcut sacrifices the protective action designed to stop one abnormal cell from propagating."
            }
          ]
        },
        {
          "q": "What electrochemical safety principle follows here?",
          "o": [
            {
              "t": "High energy requires stable hosts, controlled interfaces, and protection against internal short circuits during repeated cycling. The pack dossier carries the raw thermal history. Battery fits.",
              "v": "expert",
              "fb": "Correct: the answer links cell chemistry with heat, sensing, and layered pack protection."
            },
            {
              "t": "Use the pack average for temperature and voltage, treating cell-level resistance and side reactions as later refinements. Pack averages look reassuring. Battery records fit this battery account.",
              "v": "partial",
              "fb": "This captures one electrochemical feature but leaves thermal or control-system behavior unresolved."
            },
            {
              "t": "Assume electrode potential and reaction rate remain stable across state of charge, aging, current, and temperature. Battery records fit this battery account. Battery timing supports this battery claim.",
              "v": "wrong",
              "fb": "That explanation assigns the wrong reaction or treats nominal voltage as proof of cell health."
            },
            {
              "t": "Keep the abnormal module connected while protective isolation is suppressed and the pack continues meeting demand. Pack averages look reassuring. Battery records fit this battery account. Battery fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices the protective action designed to stop one abnormal cell from propagating."
            }
          ]
        },
        {
          "q": "How should a battery designer act on this history?",
          "o": [
            {
              "t": "The materials lesson is that energy density and safety cannot be separated after design. Electrode choice, separator quality, electrolyte stability, manufacturing control, and protective electronics define the same product. Battery fits. Battery fits. Battery fits.",
              "v": "expert",
              "fb": "Correct: the answer links cell chemistry with heat, sensing, and layered pack protection."
            },
            {
              "t": "Drop manufacturing genealogy and protection settings from routine review after the battery is installed. The protection trip seems conservative. Battery practice makes the battery view plausible. Battery timing supports this battery claim. The battery record fits.",
              "v": "partial",
              "fb": "This captures one electrochemical feature but leaves thermal or control-system behavior unresolved."
            },
            {
              "t": "Attribute the fire mainly to arson or random cell bad luck rather than a defect-propagation sequence. The protection trip seems conservative. Battery practice makes the battery view plausible. Battery timing supports this battery claim. The battery record fits.",
              "v": "wrong",
              "fb": "That explanation assigns the wrong reaction or treats nominal voltage as proof of cell health."
            },
            {
              "t": "Reset the pack, restore output, and wait for visible smoke before escalating the thermal trend. Pack averages look reassuring. The module still delivers power. Battery records fit this battery account. Battery timing supports this battery claim. Battery fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices the protective action designed to stop one abnormal cell from propagating."
            }
          ]
        }
      ]
    },
    "bt_yoshino": {
      "whatHint": "Yoshino's design leans on the separator as the last guard. A pack-wide overcharge marks many cells; ask whether the archive shows one cell starting, or all of them.",
      "sci": "Akira Yoshino (b. 1948)",
      "topic": "The lithium-ion battery",
      "lede": "Akira Yoshino used the lithium-ion battery to reveal how materials store, move, and release electrochemical energy.",
      "no": 7,
      "profile": "The electrochemical-storage note today follows Akira Yoshino into the lithium-ion battery. Akira Yoshino built a practical rechargeable lithium-ion cell using a carbonaceous anode instead of reactive metallic lithium. The design improved safety and cycle life while preserving high energy density. That contribution linked materials and reactions to a cell behavior that designers could measure through voltage, current, heat, or cycling.\n\nReplacing metallic lithium reduces one hazard, yet separators, electrolyte, manufacturing defects, overcharge, and heat still demand layered protection. A battery cell couples thermodynamics, reaction kinetics, ion transport, electronic conduction, mechanical change, and heat. A pack multiplies those interactions across many cells connected to cooling, sensing, switching, and control software. A battery explanation should distinguish thermodynamic voltage, kinetic loss, transport, local temperature, mechanical change, and the protection logic wrapped around the cell.\n\nBattery management estimates quantities that are not directly visible, including state of charge, internal resistance, and remaining margin. Voltage, current, and temperature must be interpreted with chemistry, history, and sensor placement. Thermal runaway is an escalation process. Internal shorting or side reactions generate heat, which accelerates further reactions; propagation barriers, cooling, isolation, venting, and emergency planning determine whether one cell becomes a site-wide event. The pack record should retain cell-resolved traces, lot genealogy, balancing, impedance, cooling state, cutoff commands, alarms, and teardown evidence.\n\nThe materials lesson is that energy density and safety cannot be separated after design. Electrode choice, separator quality, electrolyte stability, manufacturing control, and protective electronics define the same product. A useful cell history retains formation data, lot genealogy, impedance, temperature excursions, balancing behavior, alarms, and teardown findings. Aggregated pack averages can conceal the one cell approaching failure. Cover fluency means rejecting both magical sabotage and meaningless bad luck until the electrochemical and thermal sequence is reconstructed. Defect evidence and disabled protection have distinct signatures.",
      "frame": "Isolates a module at The Manufacturer's Design Office. \"Use Akira Yoshino to separate cell chemistry from the pack controls around it.\"",
      "q": [
        {
          "q": "Which battery-science account best describes Akira Yoshino's contribution to the lithium-ion battery?",
          "o": [
            {
              "t": "Akira Yoshino built a practical rechargeable lithium-ion cell using a carbonaceous anode instead of reactive metallic lithium. The cell-genealogy file stores the raw thermal history.",
              "v": "expert",
              "fb": "Correct: the answer links cell chemistry with heat, sensing, and layered pack protection."
            },
            {
              "t": "Akira Yoshino's battery work emphasizes pack averages and nominal ratings. Pack averages look reassuring. The protection trip seems conservative. Battery records fit this battery account.",
              "v": "partial",
              "fb": "This captures one electrochemical feature but leaves thermal or control-system behavior unresolved."
            },
            {
              "t": "Akira Yoshino's battery work is read within battery practice as support for nominal voltage and normal output as sufficient evidence that the cells remain safe. Pack averages look reassuring.",
              "v": "wrong",
              "fb": "That explanation assigns the wrong reaction or treats nominal voltage as proof of cell health."
            },
            {
              "t": "Akira Yoshino's authority is invoked in battery practice to justify disabling a thermal cutoff when repeated protective trips interrupt useful output. Pack averages look reassuring.",
              "v": "danger",
              "fb": "That shortcut sacrifices the protective action designed to stop one abnormal cell from propagating."
            }
          ]
        },
        {
          "q": "What electrochemical safety principle follows here?",
          "o": [
            {
              "t": "Replacing metallic lithium reduces one hazard, yet separators, electrolyte, manufacturing defects, overcharge, and heat still demand layered protection. The pack dossier carries the cell trace. Battery fits.",
              "v": "expert",
              "fb": "Correct: the answer links cell chemistry with heat, sensing, and layered pack protection."
            },
            {
              "t": "Use the pack average for temperature and voltage, treating cell-level resistance and side reactions as later refinements. Battery context supports the view. Battery timing supports this battery claim.",
              "v": "partial",
              "fb": "This captures one electrochemical feature but leaves thermal or control-system behavior unresolved."
            },
            {
              "t": "Assume electrode potential and reaction rate remain stable across state of charge, aging, current, and temperature. The protection trip seems conservative. Battery practice makes the battery view plausible.",
              "v": "wrong",
              "fb": "That explanation assigns the wrong reaction or treats nominal voltage as proof of cell health."
            },
            {
              "t": "Keep the abnormal module connected while protective isolation is suppressed and the pack continues meeting demand. The protection trip seems conservative. Battery practice makes the battery view plausible.",
              "v": "danger",
              "fb": "That shortcut sacrifices the protective action designed to stop one abnormal cell from propagating."
            }
          ]
        },
        {
          "q": "How should a battery designer act on this history?",
          "o": [
            {
              "t": "Cover fluency means rejecting both magical sabotage and meaningless bad luck until the electrochemical and thermal sequence is reconstructed. Defect evidence and disabled protection have distinct signatures. Battery fits.",
              "v": "expert",
              "fb": "Correct: the answer links cell chemistry with heat, sensing, and layered pack protection."
            },
            {
              "t": "Drop manufacturing genealogy and protection settings from routine review after the battery is installed. The module still delivers power. Battery records fit this battery account. Battery timing supports this battery claim.",
              "v": "partial",
              "fb": "This captures one electrochemical feature but leaves thermal or control-system behavior unresolved."
            },
            {
              "t": "Attribute the fire mainly to arson or random cell bad luck rather than a defect-propagation sequence. Pack averages look reassuring. The protection trip seems conservative. Battery records fit this battery account. Battery fits.",
              "v": "wrong",
              "fb": "That explanation assigns the wrong reaction or treats nominal voltage as proof of cell health."
            },
            {
              "t": "Reset the pack, restore output, and wait for visible smoke before escalating the thermal trend. The protection trip seems conservative. Battery practice makes the battery view plausible. Battery timing supports this battery claim.",
              "v": "danger",
              "fb": "That shortcut sacrifices the protective action designed to stop one abnormal cell from propagating."
            }
          ]
        }
      ]
    },
    "bt_armand": {
      "whatHint": "Armand studied what makes an electrolyte and separator stable. Ask whether the post-fire cell shows metallic plating from dendrites — or a material defect in the barrier itself.",
      "sci": "Michel Armand (b. 1946)",
      "topic": "Electrolytes & battery materials",
      "lede": "Michel Armand's work on electrolytes & battery materials helped turn reactive materials into engineered energy storage.",
      "no": 8,
      "profile": "The electrochemical-storage note today follows Michel Armand into electrolytes & battery materials. Michel Armand developed major ideas in intercalation electrodes, polymer electrolytes, and lithium battery materials. He emphasized the coordinated design of electrodes, electrolyte, salts, and interfaces rather than treating each component in isolation. That contribution linked materials and reactions to a cell behavior that designers could measure through voltage, current, heat, or cycling.\n\nCell safety is an interacting materials problem: changing one component can alter voltage stability, heat generation, transport, and aging elsewhere. Thermal runaway is an escalation process. Internal shorting or side reactions generate heat, which accelerates further reactions; propagation barriers, cooling, isolation, venting, and emergency planning determine whether one cell becomes a site-wide event. A battery explanation should distinguish thermodynamic voltage, kinetic loss, transport, local temperature, mechanical change, and the protection logic wrapped around the cell.\n\nA battery cell couples thermodynamics, reaction kinetics, ion transport, electronic conduction, mechanical change, and heat. A pack multiplies those interactions across many cells connected to cooling, sensing, switching, and control software. Battery management estimates quantities that are not directly visible, including state of charge, internal resistance, and remaining margin. Voltage, current, and temperature must be interpreted with chemistry, history, and sensor placement. The pack record should retain cell-resolved traces, lot genealogy, balancing, impedance, cooling state, cutoff commands, alarms, and teardown evidence.\n\nCover fluency means rejecting both magical sabotage and meaningless bad luck until the electrochemical and thermal sequence is reconstructed. Defect evidence and disabled protection have distinct signatures. The materials lesson is that energy density and safety cannot be separated after design. Electrode choice, separator quality, electrolyte stability, manufacturing control, and protective electronics define the same product. A useful cell history retains formation data, lot genealogy, impedance, temperature excursions, balancing behavior, alarms, and teardown findings. Aggregated pack averages can conceal the one cell approaching failure.",
      "frame": "Places a swollen cell on the bench at The Manufacturer's Design Office. \"Start with Michel Armand; do not stop at nominal voltage.\"",
      "q": [
        {
          "q": "Which battery-science account best describes Michel Armand's contribution to electrolytes & battery materials?",
          "o": [
            {
              "t": "Michel Armand developed major ideas in intercalation electrodes, polymer electrolytes, and lithium battery materials. The pack dossier carries the raw time-stamped protection log. Battery fits.",
              "v": "expert",
              "fb": "Correct: the answer links cell chemistry with heat, sensing, and layered pack protection."
            },
            {
              "t": "Michel Armand's battery work emphasizes pack averages and nominal ratings. The module still delivers power. Battery records fit this battery account. Battery timing supports this battery claim.",
              "v": "partial",
              "fb": "This captures one electrochemical feature but leaves thermal or control-system behavior unresolved."
            },
            {
              "t": "Michel Armand's battery work is read within battery practice as support for nominal voltage and normal output as sufficient evidence that the cells remain safe. Pack averages look reassuring.",
              "v": "wrong",
              "fb": "That explanation assigns the wrong reaction or treats nominal voltage as proof of cell health."
            },
            {
              "t": "Michel Armand's authority is invoked in battery practice to justify disabling a thermal cutoff when repeated protective trips interrupt useful output. Pack averages look reassuring.",
              "v": "danger",
              "fb": "That shortcut sacrifices the protective action designed to stop one abnormal cell from propagating."
            }
          ]
        },
        {
          "q": "What electrochemical safety principle follows here?",
          "o": [
            {
              "t": "Cell safety is an interacting materials problem: changing one component can alter voltage stability, heat generation, transport, and aging elsewhere. The pack dossier carries the lot record. Battery fits.",
              "v": "expert",
              "fb": "Correct: the answer links cell chemistry with heat, sensing, and layered pack protection."
            },
            {
              "t": "Use the pack average for temperature and voltage, treating cell-level resistance and side reactions as later refinements. Battery records fit this battery account. Battery timing supports this battery claim.",
              "v": "partial",
              "fb": "This captures one electrochemical feature but leaves thermal or control-system behavior unresolved."
            },
            {
              "t": "Assume electrode potential and reaction rate remain stable across state of charge, aging, current, and temperature. The protection trip seems conservative. Battery practice makes the battery view plausible.",
              "v": "wrong",
              "fb": "That explanation assigns the wrong reaction or treats nominal voltage as proof of cell health."
            },
            {
              "t": "Keep the abnormal module connected while protective isolation is suppressed and the pack continues meeting demand. The protection trip seems conservative. Battery timing supports this battery claim.",
              "v": "danger",
              "fb": "That shortcut sacrifices the protective action designed to stop one abnormal cell from propagating."
            }
          ]
        },
        {
          "q": "How should a battery designer act on this history?",
          "o": [
            {
              "t": "A useful cell history retains formation data, lot genealogy, impedance, temperature excursions, balancing behavior, alarms, and teardown findings. Aggregated pack averages can conceal the one cell approaching failure. Battery context matters. Battery fits.",
              "v": "expert",
              "fb": "Correct: the answer links cell chemistry with heat, sensing, and layered pack protection."
            },
            {
              "t": "Drop manufacturing genealogy and protection settings from routine review after the battery is installed. The protection trip seems conservative. Battery practice makes the battery view plausible. Battery timing supports this battery claim. The battery record fits.",
              "v": "partial",
              "fb": "This captures one electrochemical feature but leaves thermal or control-system behavior unresolved."
            },
            {
              "t": "Attribute the fire mainly to arson or random cell bad luck rather than a defect-propagation sequence. The protection trip seems conservative. Battery practice makes the battery view plausible. Battery timing supports this battery claim. The battery record fits.",
              "v": "wrong",
              "fb": "That explanation assigns the wrong reaction or treats nominal voltage as proof of cell health."
            },
            {
              "t": "Reset the pack, restore output, and wait for visible smoke before escalating the thermal trend. Pack averages look reassuring. The module still delivers power. Battery records fit this battery account. Battery timing supports this battery claim. Battery fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices the protective action designed to stop one abnormal cell from propagating."
            }
          ]
        }
      ]
    },
    "bt_newman": {
      "whatHint": "Newman's models show what a system-wide overcharge looks like: many cells at their limit at once. A lone cell heating amid ordinary neighbours argues otherwise.",
      "sci": "John Newman (electrochemical engineer)",
      "topic": "Battery modeling & thermal runaway",
      "lede": "Through battery modeling & thermal runaway, John Newman connected cell chemistry with voltage, current, heat, or durability.",
      "no": 9,
      "profile": "The electrochemical-storage note today follows John Newman into battery modeling & thermal runaway. John Newman developed rigorous porous-electrode and transport models for batteries, linking electrochemical kinetics, ion movement, heat, and geometry. Such models predict how conditions vary inside a cell rather than assuming uniform behavior. That contribution linked materials and reactions to a cell behavior that designers could measure through voltage, current, heat, or cycling.\n\nThermal runaway often begins locally, so pack safety needs cell-resolved sensing, propagation barriers, cooling, and validated models. Battery management estimates quantities that are not directly visible, including state of charge, internal resistance, and remaining margin. Voltage, current, and temperature must be interpreted with chemistry, history, and sensor placement. A battery explanation should distinguish thermodynamic voltage, kinetic loss, transport, local temperature, mechanical change, and the protection logic wrapped around the cell.\n\nThermal runaway is an escalation process. Internal shorting or side reactions generate heat, which accelerates further reactions; propagation barriers, cooling, isolation, venting, and emergency planning determine whether one cell becomes a site-wide event. A battery cell couples thermodynamics, reaction kinetics, ion transport, electronic conduction, mechanical change, and heat. A pack multiplies those interactions across many cells connected to cooling, sensing, switching, and control software. The pack record should retain cell-resolved traces, lot genealogy, balancing, impedance, cooling state, cutoff commands, alarms, and teardown evidence.\n\nNewman's battery models show what system-wide overcharge should look like. Voltage, current, heat generation, state of charge, and cooling interact across cells and modules; a faulty BMS command normally leaves correlated high-voltage excursions or balancing anomalies in many channels. A control archive showing ordinary limits everywhere except one abruptly heating cell argues against overcharge. Models are useful here because they turn a broad accusation about software into a testable spatial and temporal pattern.",
      "frame": "Enlarges a temperature trace at The Manufacturer's Design Office. \"Explain battery modeling & thermal runaway, then tell me where heat enters the answer.\"",
      "q": [
        {
          "q": "Which battery-science account best describes John Newman's contribution to battery modeling & thermal runaway?",
          "o": [
            {
              "t": "John Newman developed rigorous porous-electrode and transport models for batteries, linking electrochemical kinetics, ion movement, heat, and geometry. The pack dossier carries the raw time-stamped lot record. Battery fits.",
              "v": "expert",
              "fb": "Correct: the answer links cell chemistry with heat, sensing, and layered pack protection."
            },
            {
              "t": "John Newman's battery work relies on pack averages and nominal ratings. Pack averages look reassuring. Battery records fit this battery account. Battery context supports the view. Battery timing supports this battery claim.",
              "v": "partial",
              "fb": "This captures one electrochemical feature but leaves thermal or control-system behavior unresolved."
            },
            {
              "t": "John Newman's battery work is read within battery practice as support for nominal voltage and normal output as sufficient evidence that the cells remain safe. Pack averages look reassuring. Pack averages look reassuring.",
              "v": "wrong",
              "fb": "That explanation assigns the wrong reaction or treats nominal voltage as proof of cell health."
            },
            {
              "t": "John Newman's battery authority supports disabling a thermal cutoff when repeated protective trips interrupt useful output. The protection trip seems conservative. Battery practice makes the battery view plausible.",
              "v": "danger",
              "fb": "That shortcut sacrifices the protective action designed to stop one abnormal cell from propagating."
            }
          ]
        },
        {
          "q": "What electrochemical safety principle follows here?",
          "o": [
            {
              "t": "Thermal runaway often begins locally, so pack safety needs cell-resolved sensing, propagation barriers, cooling, and validated models. The pack dossier carries the raw cell trace. Battery fits.",
              "v": "expert",
              "fb": "Correct: the answer links cell chemistry with heat, sensing, and layered pack protection."
            },
            {
              "t": "Use the pack average for temperature and voltage, treating cell-level resistance and side reactions as later refinements. Pack averages look reassuring. Battery records fit this battery account.",
              "v": "partial",
              "fb": "This captures one electrochemical feature but leaves thermal or control-system behavior unresolved."
            },
            {
              "t": "Assume electrode potential and reaction rate remain stable across state of charge, aging, current, and temperature. Battery records fit this battery account. Battery timing supports this battery claim.",
              "v": "wrong",
              "fb": "That explanation assigns the wrong reaction or treats nominal voltage as proof of cell health."
            },
            {
              "t": "Keep the abnormal module connected while protective isolation is suppressed and the pack continues meeting demand. Pack averages look reassuring. Battery records fit this battery account. Battery fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices the protective action designed to stop one abnormal cell from propagating."
            }
          ]
        },
        {
          "q": "How should a battery designer act on this history?",
          "o": [
            {
              "t": "The materials lesson is that energy density and safety cannot be separated after design. Electrode choice, separator quality, electrolyte stability, manufacturing control, and protective electronics define the same product. Battery fits. Battery fits. Battery fits.",
              "v": "expert",
              "fb": "Correct: the answer links cell chemistry with heat, sensing, and layered pack protection."
            },
            {
              "t": "Drop manufacturing genealogy and protection settings from routine review after the battery is installed. The protection trip seems conservative. Battery practice makes the battery view plausible. Battery timing supports this battery claim. The battery record fits.",
              "v": "partial",
              "fb": "This captures one electrochemical feature but leaves thermal or control-system behavior unresolved."
            },
            {
              "t": "Attribute the fire mainly to arson or random cell bad luck rather than a defect-propagation sequence. The protection trip seems conservative. Battery practice makes the battery view plausible. Battery timing supports this battery claim. The battery record fits.",
              "v": "wrong",
              "fb": "That explanation assigns the wrong reaction or treats nominal voltage as proof of cell health."
            },
            {
              "t": "Reset the pack, restore output, and wait for visible smoke before escalating the thermal trend. Pack averages look reassuring. The module still delivers power. Battery records fit this battery account. Battery timing supports this battery claim. Battery fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices the protective action designed to stop one abnormal cell from propagating."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "tech": {
      "yard": "At The Battery Yard & Racks, Technician Oyaro places a separator label across a thermal map of the racks. \"Cell history has a language; demonstrate that you learned it before touching my lot records.\"",
      "bms": "At The Control & BMS Room, Technician Oyaro places a separator label across the cell-voltage archive. \"Cell history has a language; demonstrate that you learned it before touching my lot records.\"",
      "office": "At The Manufacturer's Design Office, Technician Oyaro places a separator label across a sealed design-change file. \"Cell history has a language; demonstrate that you learned it before touching my lot records.\""
    },
    "bmseng": {
      "yard": "At The Battery Yard & Racks, The BMS Engineer places a separator label across a thermal map of the racks. \"The control archive waits until you can explain the pioneer in today's dossier.\"",
      "bms": "At The Control & BMS Room, The BMS Engineer places a separator label across the cell-voltage archive. \"The control archive waits until you can explain the pioneer in today's dossier.\"",
      "office": "At The Manufacturer's Design Office, The BMS Engineer places a separator label across a sealed design-change file. \"The control archive waits until you can explain the pioneer in today's dossier.\""
    },
    "clerk": {
      "yard": "At The Battery Yard & Racks, The Clerk places a separator label across a thermal map of the racks. \"Get the electrochemistry right, and I will show you the design correspondence.\"",
      "bms": "At The Control & BMS Room, The Clerk places a separator label across the cell-voltage archive. \"Get the electrochemistry right, and I will show you the design correspondence.\"",
      "office": "At The Manufacturer's Design Office, The Clerk places a separator label across a sealed design-change file. \"Get the electrochemistry right, and I will show you the design correspondence.\""
    }
  },
  "story": [
    "<b>The Kelso Grid-Battery Fire</b> opens inside the Kelso battery-fire inquiry, where the visible damage is easier to describe than the chain that produced it.",
    "<b>Technician Oyaro</b>, <b>The BMS Engineer</b>, and <b>The Clerk</b> each control a different slice of the record, and each conversation turns one real pioneer into a way of reading the case.",
    "Some witnesses are drawn toward <b>Lithium plating grew dendrites that pierced the cell separator.</b>; others settle too quickly on <b>BMS overcharge pushed every module beyond its safe voltage limit.</b>. Your job is to separate those tempting stories from the harder explanation the evidence supports.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide what the case is really about."
  ],
  "endings": {
    "overclaimWhat": "attack",
    "dismissalWhat": "freak",
    "win": {
      "expertTitle": "The First Cell in the Chain",
      "expert": [
        "Investigator Pier Solano names Elena Corso — battery manufacturer, The Manufacturer's Design Office, and Separator failure began runaway that cooling could not arrest. Not Lithium plating grew dendrites that pierced the cell separator. Not BMS overcharge pushed every module beyond its safe voltage limit.",
        "The readings teach how dendrite growth, system-wide overcharge, and an internal separator defect produce different voltage histories, spatial onset patterns, and post-event cell evidence."
      ],
      "soundTitle": "A Sound Thermal-Runaway Finding",
      "sound": [
        "Separator evidence fixes the trio: Elena Corso — battery manufacturer; The Manufacturer's Design Office; Separator failure began runaway that cooling could not arrest.",
        "Cell-level evidence supports the conclusion while incomplete supplier correspondence limits its reach."
      ],
      "namedTitle": "Correct Origin, Limited Support",
      "named": [
        "Separator evidence points to Elena Corso — battery manufacturer, The Manufacturer's Design Office, and Separator failure began runaway that cooling could not arrest; separator support remains incomplete.",
        "The cell mechanism is identified, but too little lot evidence has been gathered to withstand challenge."
      ]
    },
    "overclaim": {
      "title": "The Dendrite Hypothesis",
      "body": [
        "Investigator Pier Solano settles on Lithium plating grew dendrites that pierced the cell separator. Cell history does not show the charging signature that theory requires.",
        "Lithium plating is favored by aggressive charging, low temperature, or anode limitations and can grow dendrites through a separator. It should leave charging conditions and metallic deposits consistent with that path, which the origin cell does not show."
      ]
    },
    "dismissal": {
      "title": "The Overcharge Hypothesis",
      "body": [
        "Investigator Pier Solano instead selects BMS overcharge pushed every module beyond its safe voltage limit. Pack-wide voltage behavior is absent from the archive.",
        "A BMS-driven overcharge would push many cells or modules above voltage limits and appear across the control archive. A single-cell onset with ordinary neighboring voltages is inconsistent with a fleet-wide command error."
      ]
    },
    "wrongNames": {
      "title": "Right Failure, Wrong Attribution",
      "body": [
        "The separator-origin judgment is sound; the accused party or location is not. Restore the cell genealogy before naming the responsible trio."
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A grid battery rack with one cell in thermal runaway\"><rect x=\"70\" y=\"28\" width=\"280\" height=\"84\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><line x1=\"140\" y1=\"28\" x2=\"140\" y2=\"112\" stroke=\"#121212\" stroke-width=\"1.2\"/><line x1=\"210\" y1=\"28\" x2=\"210\" y2=\"112\" stroke=\"#121212\" stroke-width=\"1.2\"/><line x1=\"280\" y1=\"28\" x2=\"280\" y2=\"112\" stroke=\"#121212\" stroke-width=\"1.2\"/><line x1=\"70\" y1=\"56\" x2=\"350\" y2=\"56\" stroke=\"#121212\" stroke-width=\"1.2\"/><line x1=\"70\" y1=\"84\" x2=\"350\" y2=\"84\" stroke=\"#121212\" stroke-width=\"1.2\"/><rect x=\"214\" y=\"60\" width=\"62\" height=\"20\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2\"/><path d=\"M246 44 C236 30,242 24,250 16 C252 24,260 30,254 44\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"1.8\"/><path d=\"M410 36 L590 36 L590 104 L410 104 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M420 74 L580 74\" stroke=\"#326891\" stroke-width=\"2\"/><path d=\"M500 36 L500 104\" stroke=\"#e2e2d8\" stroke-width=\"1\"/></svg>"
}};
