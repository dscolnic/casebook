module.exports = { PACK: {
  "id": "t_wind",
  "title": "The Fenmark Turbine Collapse",
  "discipline": "Wind Energy & Fatigue Engineering",
  "teaser": "The Fenmark rotor separated during high wind. Did a blade-root crack grow through repeated bending, or did tower resonance amplify motion? Fracture evidence must identify the initiating failure.",
  "overclaimTag": "a blade-root fatigue crack",
  "truthTag": "hub-bolt fatigue after preload loss",
  "venue": "the Fenmark turbine inquiry",
  "agent": {
    "name": "Inspector Yara Doss",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Wind & Fatigue Pioneers",
  "dossierName": "WIND & FATIGUE PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Fenmark turbine inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before your inquiry ends. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The place you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "Blade cracking and tower resonance are both visually persuasive; fracture surfaces and vibration modes must decide.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "operator",
      "items": [
        {
          "id": "operator",
          "label": "Sylvie Renn — wind-farm operator"
        },
        {
          "id": "technician",
          "label": "The turbine service lead"
        },
        {
          "id": "regulator",
          "label": "The turbine safety regulator"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "office",
      "items": [
        {
          "id": "nacelle",
          "label": "The Nacelle & Rotor"
        },
        {
          "id": "scada",
          "label": "The SCADA Control Hut"
        },
        {
          "id": "office",
          "label": "The Operator's Asset Office"
        }
      ]
    },
    "what": {
      "title": "Which failure released the rotor?",
      "truth": "fatigue",
      "items": [
        {
          "id": "attack",
          "label": "A blade-root fatigue crack grew through repeated bending cycles."
        },
        {
          "id": "freak",
          "label": "Tower resonance amplified vibration until the support buckled."
        },
        {
          "id": "fatigue",
          "label": "Lost hub-bolt preload caused fatigue and joint separation."
        }
      ]
    }
  },
  "PLACES": {
    "nacelle": {
      "name": "The Nacelle & Rotor",
      "xy": [
        140,
        90
      ]
    },
    "scada": {
      "name": "The SCADA Control Hut",
      "xy": [
        330,
        240
      ]
    },
    "office": {
      "name": "The Operator's Asset Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "nacelle",
      "scada"
    ],
    [
      "scada",
      "office"
    ]
  ],
  "CHARACTERS": {
    "climber": {
      "name": "Blade Tech Aro",
      "role": "Rope-access technician",
      "face": "🧗",
      "badge": "A",
      "legend": "the nacelle",
      "hint": "Documented component condition and knows the inspection and repair authorization trail."
    },
    "scadaop": {
      "name": "The SCADA Operator",
      "role": "Control-hut operator",
      "face": "🖥",
      "badge": "S",
      "legend": "the control hut",
      "hint": "Preserves operating data and knows which staff and offices received vibration notifications."
    },
    "clerk": {
      "name": "The Clerk",
      "role": "Asset-records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Keeps maintenance contracts, asset decisions, and the approval chain for deferred work."
    }
  },
  "TOPICMAP": {
    "nacelle": {
      "climber": [
        "wd_betz"
      ],
      "scadaop": [
        "wd_brush"
      ],
      "clerk": [
        "wd_hutter"
      ]
    },
    "scada": {
      "climber": [
        "wd_savonius"
      ],
      "scadaop": [
        "wd_kutta"
      ],
      "clerk": [
        "wd_stodola"
      ]
    },
    "office": {
      "climber": [
        "wd_ewing"
      ],
      "scadaop": [
        "wd_palmgren"
      ],
      "clerk": [
        "wd_paris"
      ]
    }
  },
  "TOPICS": {
    "wd_betz": {
      "sci": "Albert Betz (1885-1968)",
      "topic": "The Betz limit & wind-turbine theory",
      "lede": "Albert Betz tied the Betz limit & wind-turbine theory to the repeated loads carried by real wind machines.",
      "no": 1,
      "profile": "This rotating-machinery cover note tracks Albert Betz through the Betz limit & wind-turbine theory. Albert Betz showed that an ideal wind turbine cannot extract all the kinetic energy from moving air because the air must continue downstream. The Betz limit places the maximum power coefficient at 16/27, about 59.3 percent. The contribution joined wind, motion, stress, or wear to a calculation that could be tested against a machine's repeated service cycles.\n\nEnergy capture is bounded by aerodynamics; forcing higher loads onto a rotor cannot defeat the flow physics and may increase structural demand. A wind turbine lives under millions of variable-amplitude cycles. Wind shear, turbulence, yaw error, gravity, pitching, braking, and grid events repeatedly load blades, hub bolts, bearings, shafts, and tower joints. A wind-engineering explanation should state the aerodynamic input, structural response, cycle count, material limit, and observation used to judge remaining life.\n\nFatigue is cumulative and often invisible until a crack becomes large. SCADA trends, vibration spectra, oil debris, bolt checks, blade imaging, acoustic methods, and load history each see a different part of the deterioration. Control systems can reduce loads, yet muted alarms and extended operation alter the damage calculation. A turbine that continues producing power may be consuming structural life much faster than the revenue display suggests. The turbine history should unite wind events, vibration, controller actions, blade images, bolt torque, bearing findings, and every maintenance deferral.\n\nThe design lesson is to connect aerodynamic performance with structural endurance. The most efficient rotor is not a safe machine unless its real load spectrum remains inside inspected and maintainable limits. An asset history should preserve storms, shutdowns, vibration excursions, repairs, torque records, blade findings, and deferred work. Fatigue assessment becomes weak when these are scattered across contractors and software systems. Cover expertise here is the ability to read a fracture surface and an alarm trend as parts of the same timeline. Sabotage and gust stories should not outrun evidence of progressive cracking.",
      "frame": "Steadies a blade photograph at The Nacelle & Rotor. \"Use Albert Betz to connect wind loading with the cycles this rotor carried.\"",
      "q": [
        {
          "q": "Which wind-and-fatigue account best represents Albert Betz's work on the Betz limit & wind-turbine theory?",
          "o": [
            {
              "t": "Albert Betz showed that an ideal wind turbine cannot extract all the kinetic energy from moving air because the air must continue downstream. The turbine dossier carries the dated blade-root finding.",
              "v": "expert",
              "fb": "Correct: the answer links aerodynamic loading with cumulative damage, inspection, and control response."
            },
            {
              "t": "Albert Betz's wind work emphasizes average load and current power output. The rotor still meets demand. A single gust fits the event. Wind records fit this wind account. Wind timing supports this wind claim.",
              "v": "partial",
              "fb": "This recognizes one load or component but omits the repeated-cycle or monitoring evidence."
            },
            {
              "t": "Albert Betz's wind work is read within wind practice as support for normal power production as sufficient evidence that blades, bolts, bearings, and tower joints remain sound. Wind records fit this wind account.",
              "v": "wrong",
              "fb": "That explanation mistakes a power or wind value for a complete structural assessment."
            },
            {
              "t": "Albert Betz's wind authority supports muting vibration alarms when shutdown would sacrifice a productive wind period. The latest inspection looks acceptable. Wind practice makes the wind view plausible.",
              "v": "danger",
              "fb": "That choice keeps production visible while silencing the signals that structural life is being consumed."
            }
          ]
        },
        {
          "q": "What rotor-and-fatigue rule emerges from this work?",
          "o": [
            {
              "t": "Energy capture is bounded by aerodynamics; forcing higher loads onto a rotor cannot defeat the flow physics and may increase structural demand. The turbine dossier carries the cycle spectrum. Wind fits.",
              "v": "expert",
              "fb": "Correct: the answer links aerodynamic loading with cumulative damage, inspection, and control response."
            },
            {
              "t": "Use one gust or average load while treating the variable-amplitude cycle history as a later engineering refinement. The latest inspection looks acceptable. Wind practice makes the wind view plausible.",
              "v": "partial",
              "fb": "This recognizes one load or component but omits the repeated-cycle or monitoring evidence."
            },
            {
              "t": "Assume lift, resonance, and fatigue resistance remain stable across yaw, turbulence, surface damage, and operating speed. The latest inspection looks acceptable. Wind practice makes the wind view plausible.",
              "v": "wrong",
              "fb": "That explanation mistakes a power or wind value for a complete structural assessment."
            },
            {
              "t": "Consume additional structural life because the turbine continues generating and has not reached an automatic trip. The latest inspection looks acceptable. Wind practice makes the wind view plausible.",
              "v": "danger",
              "fb": "That choice keeps production visible while silencing the signals that structural life is being consumed."
            }
          ]
        },
        {
          "q": "How should turbine owners use this history in fatigue management?",
          "o": [
            {
              "t": "Cover expertise here is the ability to read a fracture surface and an alarm trend as parts of the same timeline. Sabotage and gust stories should not outrun evidence of progressive cracking.",
              "v": "expert",
              "fb": "Correct: the answer links aerodynamic loading with cumulative damage, inspection, and control response."
            },
            {
              "t": "Review inspection findings and controller alarms separately from the turbine fatigue assessment. A single gust fits the event. Wind records fit this wind account. Wind timing supports this wind claim.",
              "v": "partial",
              "fb": "This recognizes one load or component but omits the repeated-cycle or monitoring evidence."
            },
            {
              "t": "Attribute the collapse mainly to sabotage or a freak gust rather than progressive crack growth. Power output appears reassuring. A single gust fits the event. Wind records fit this wind account.",
              "v": "wrong",
              "fb": "That explanation mistakes a power or wind value for a complete structural assessment."
            },
            {
              "t": "Return the rotor to service, suppress repeated alarms, and wait for visible separation before a structural shutdown. The latest inspection looks acceptable. Wind practice makes the wind view plausible.",
              "v": "danger",
              "fb": "That choice keeps production visible while silencing the signals that structural life is being consumed."
            }
          ]
        }
      ]
    },
    "wd_brush": {
      "sci": "Charles F. Brush (1849-1929)",
      "topic": "The first automatic wind generator",
      "lede": "Charles F. Brush's work on the first automatic wind generator made wind, vibration, or fatigue an engineering quantity.",
      "no": 2,
      "profile": "This rotating-machinery cover note tracks Charles F. Brush through the first automatic wind generator. Charles F. Brush built a large automatically operated wind generator at his Cleveland home in the late 1880s. The machine charged batteries and used automatic controls to manage operation over changing winds. The contribution joined wind, motion, stress, or wear to a calculation that could be tested against a machine's repeated service cycles.\n\nAutomation should protect the machine when wind, speed, vibration, or electrical conditions leave the safe operating envelope. Control systems can reduce loads, yet muted alarms and extended operation alter the damage calculation. A turbine that continues producing power may be consuming structural life much faster than the revenue display suggests. A wind-engineering explanation should state the aerodynamic input, structural response, cycle count, material limit, and observation used to judge remaining life.\n\nA wind turbine lives under millions of variable-amplitude cycles. Wind shear, turbulence, yaw error, gravity, pitching, braking, and grid events repeatedly load blades, hub bolts, bearings, shafts, and tower joints. Fatigue is cumulative and often invisible until a crack becomes large. SCADA trends, vibration spectra, oil debris, bolt checks, blade imaging, acoustic methods, and load history each see a different part of the deterioration. The turbine history should unite wind events, vibration, controller actions, blade images, bolt torque, bearing findings, and every maintenance deferral.\n\nCover expertise here is the ability to read a fracture surface and an alarm trend as parts of the same timeline. Sabotage and gust stories should not outrun evidence of progressive cracking. The design lesson is to connect aerodynamic performance with structural endurance. The most efficient rotor is not a safe machine unless its real load spectrum remains inside inspected and maintainable limits. An asset history should preserve storms, shutdowns, vibration excursions, repairs, torque records, blade findings, and deferred work. Fatigue assessment becomes weak when these are scattered across contractors and software systems.",
      "frame": "Sets a cracked fastener on the table at The Nacelle & Rotor. \"Start with Charles F. Brush; end with what should have been measured.\"",
      "q": [
        {
          "q": "Which wind-and-fatigue account best represents Charles F. Brush's work on the first automatic wind generator?",
          "o": [
            {
              "t": "Charles F. The turbine dossier carries the turbine service record. The wind-farm archive stores the raw turbine service record. The wind-farm archive stores the dated turbine service record.",
              "v": "expert",
              "fb": "Correct: the answer links aerodynamic loading with cumulative damage, inspection, and control response."
            },
            {
              "t": "Charles F. Brush's wind work emphasizes average load and current power output. Power output appears reassuring. The latest inspection looks acceptable. Wind practice makes the wind view plausible.",
              "v": "partial",
              "fb": "This recognizes one load or component but omits the repeated-cycle or monitoring evidence."
            },
            {
              "t": "Charles F. Brush's wind work supports normal power production as sufficient evidence that blades, bolts, bearings, and tower joints remain sound. The latest inspection looks acceptable.",
              "v": "wrong",
              "fb": "That explanation mistakes a power or wind value for a complete structural assessment."
            },
            {
              "t": "Charles F. Brush's wind authority supports muting vibration alarms when shutdown would sacrifice a productive wind period. Wind context supports the view. Wind timing supports this wind claim.",
              "v": "danger",
              "fb": "That choice keeps production visible while silencing the signals that structural life is being consumed."
            }
          ]
        },
        {
          "q": "What rotor-and-fatigue rule emerges from this work?",
          "o": [
            {
              "t": "Automation should protect the machine when wind, speed, vibration, or electrical conditions leave the safe operating envelope. The turbine dossier carries the cycle spectrum. Wind fits.",
              "v": "expert",
              "fb": "Correct: the answer links aerodynamic loading with cumulative damage, inspection, and control response."
            },
            {
              "t": "Use one gust or average load while treating the variable-amplitude cycle history as a later engineering refinement. A single gust fits the event. Wind records fit this wind account.",
              "v": "partial",
              "fb": "This recognizes one load or component but omits the repeated-cycle or monitoring evidence."
            },
            {
              "t": "Assume lift, resonance, and fatigue resistance remain stable across yaw, turbulence, surface damage, and operating speed. A single gust fits the event. Wind records fit this wind account.",
              "v": "wrong",
              "fb": "That explanation mistakes a power or wind value for a complete structural assessment."
            },
            {
              "t": "Consume additional structural life because the turbine continues generating and has not reached an automatic trip. A single gust fits the event. Wind records fit this wind account.",
              "v": "danger",
              "fb": "That choice keeps production visible while silencing the signals that structural life is being consumed."
            }
          ]
        },
        {
          "q": "How should turbine owners use this history in fatigue management?",
          "o": [
            {
              "t": "An asset history should preserve storms, shutdowns, vibration excursions, repairs, torque records, blade findings, and deferred work. Fatigue assessment becomes weak when these are scattered across contractors and software systems. Wind fits.",
              "v": "expert",
              "fb": "Correct: the answer links aerodynamic loading with cumulative damage, inspection, and control response."
            },
            {
              "t": "Review inspection findings and controller alarms separately from the turbine fatigue assessment. Power output appears reassuring. The latest inspection looks acceptable. A single gust fits the event. Wind records fit this wind account. Wind fits.",
              "v": "partial",
              "fb": "This recognizes one load or component but omits the repeated-cycle or monitoring evidence."
            },
            {
              "t": "Attribute the collapse mainly to sabotage or a freak gust rather than progressive crack growth. The latest inspection looks acceptable. Wind records fit this wind account. Wind context supports the view. Wind timing supports this wind claim.",
              "v": "wrong",
              "fb": "That explanation mistakes a power or wind value for a complete structural assessment."
            },
            {
              "t": "Return the rotor to service, suppress repeated alarms, and wait for visible separation before a structural shutdown. The rotor still meets demand. A single gust fits the event. Wind records fit this wind account. Wind timing supports this wind claim.",
              "v": "danger",
              "fb": "That choice keeps production visible while silencing the signals that structural life is being consumed."
            }
          ]
        }
      ]
    },
    "wd_hutter": {
      "sci": "Ulrich Hutter (1910-1990)",
      "topic": "Modern wind-turbine blade design",
      "lede": "Through modern wind-turbine blade design, Ulrich Hutter connected useful rotor motion with structural endurance.",
      "no": 3,
      "profile": "This rotating-machinery cover note tracks Ulrich Hutter through modern wind-turbine blade design. Ulrich Hütter advanced lightweight, high-speed wind-turbine design using aerodynamic blades and engineering methods derived partly from glider construction. His work helped establish the modern emphasis on slender rotors and controlled tip-speed ratio. The contribution joined wind, motion, stress, or wear to a calculation that could be tested against a machine's repeated service cycles.\n\nLight structures save material but demand accurate load spectra, fatigue design, inspection, and damage-tolerant details. Fatigue is cumulative and often invisible until a crack becomes large. SCADA trends, vibration spectra, oil debris, bolt checks, blade imaging, acoustic methods, and load history each see a different part of the deterioration. A wind-engineering explanation should state the aerodynamic input, structural response, cycle count, material limit, and observation used to judge remaining life.\n\nControl systems can reduce loads, yet muted alarms and extended operation alter the damage calculation. A turbine that continues producing power may be consuming structural life much faster than the revenue display suggests. A wind turbine lives under millions of variable-amplitude cycles. Wind shear, turbulence, yaw error, gravity, pitching, braking, and grid events repeatedly load blades, hub bolts, bearings, shafts, and tower joints. The turbine history should unite wind events, vibration, controller actions, blade images, bolt torque, bearing findings, and every maintenance deferral.\n\nAn asset history should preserve storms, shutdowns, vibration excursions, repairs, torque records, blade findings, and deferred work. Fatigue assessment becomes weak when these are scattered across contractors and software systems. Cover expertise here is the ability to read a fracture surface and an alarm trend as parts of the same timeline. Sabotage and gust stories should not outrun evidence of progressive cracking. The design lesson is to connect aerodynamic performance with structural endurance. The most efficient rotor is not a safe machine unless its real load spectrum remains inside inspected and maintainable limits.",
      "frame": "Freezes a vibration trace at The Nacelle & Rotor. \"Explain modern wind-turbine blade design without pretending one gust tells the whole fatigue history.\"",
      "q": [
        {
          "q": "Which wind-and-fatigue account best represents Ulrich Hutter's work on modern wind-turbine blade design?",
          "o": [
            {
              "t": "Ulrich Hütter advanced lightweight, high-speed wind-turbine design using aerodynamic blades and engineering methods derived partly from glider construction. The turbine dossier carries the turbine-specific cycle spectrum.",
              "v": "expert",
              "fb": "Correct: the answer links aerodynamic loading with cumulative damage, inspection, and control response."
            },
            {
              "t": "Ulrich Hutter's wind work emphasizes average load and current power output. Power output appears reassuring. The latest inspection looks acceptable. Wind practice makes the wind view plausible. Wind timing supports this wind claim.",
              "v": "partial",
              "fb": "This recognizes one load or component but omits the repeated-cycle or monitoring evidence."
            },
            {
              "t": "Ulrich Hutter's wind work supports normal power production as sufficient evidence that blades, bolts, bearings, and tower joints remain sound. The latest inspection looks acceptable. Wind practice makes the wind view plausible.",
              "v": "wrong",
              "fb": "That explanation mistakes a power or wind value for a complete structural assessment."
            },
            {
              "t": "Ulrich Hutter's authority is invoked in wind practice to justify muting vibration alarms when shutdown would sacrifice a productive wind period. Power output appears reassuring. The latest inspection looks acceptable. Wind fits.",
              "v": "danger",
              "fb": "That choice keeps production visible while silencing the signals that structural life is being consumed."
            }
          ]
        },
        {
          "q": "What rotor-and-fatigue rule emerges from this work?",
          "o": [
            {
              "t": "Light structures save material but demand accurate load spectra, fatigue design, inspection, and damage-tolerant details. The wind-farm archive stores the raw dated blade-root finding. Wind fits.",
              "v": "expert",
              "fb": "Correct: the answer links aerodynamic loading with cumulative damage, inspection, and control response."
            },
            {
              "t": "Use one gust or average load while treating the variable-amplitude cycle history as a later engineering refinement. Power output appears reassuring. Wind practice makes the wind view plausible.",
              "v": "partial",
              "fb": "This recognizes one load or component but omits the repeated-cycle or monitoring evidence."
            },
            {
              "t": "Assume lift, resonance, and fatigue resistance remain stable across yaw, turbulence, surface damage, and operating speed. Power output appears reassuring. Wind practice makes the wind view plausible.",
              "v": "wrong",
              "fb": "That explanation mistakes a power or wind value for a complete structural assessment."
            },
            {
              "t": "Consume additional structural life because the turbine continues generating and has not reached an automatic trip. Power output appears reassuring. Wind practice makes the wind view plausible.",
              "v": "danger",
              "fb": "That choice keeps production visible while silencing the signals that structural life is being consumed."
            }
          ]
        },
        {
          "q": "How should turbine owners use this history in fatigue management?",
          "o": [
            {
              "t": "The design lesson is to connect aerodynamic performance with structural endurance. The most efficient rotor is not a safe machine unless its real load spectrum remains inside inspected and maintainable limits.",
              "v": "expert",
              "fb": "Correct: the answer links aerodynamic loading with cumulative damage, inspection, and control response."
            },
            {
              "t": "Review inspection findings and controller alarms separately from the turbine fatigue assessment. Power output appears reassuring. The latest inspection looks acceptable. Wind practice makes the wind view plausible.",
              "v": "partial",
              "fb": "This recognizes one load or component but omits the repeated-cycle or monitoring evidence."
            },
            {
              "t": "Attribute the collapse mainly to sabotage or a freak gust rather than progressive crack growth. Power output appears reassuring. The latest inspection looks acceptable. Wind practice makes the wind view plausible.",
              "v": "wrong",
              "fb": "That explanation mistakes a power or wind value for a complete structural assessment."
            },
            {
              "t": "Return the rotor to service, suppress repeated alarms, and wait for visible separation before a structural shutdown. Power output appears reassuring. Wind context supports the view. Wind timing supports this wind claim.",
              "v": "danger",
              "fb": "That choice keeps production visible while silencing the signals that structural life is being consumed."
            }
          ]
        }
      ]
    },
    "wd_savonius": {
      "sci": "Sigurd Savonius (1884-1931)",
      "topic": "The Savonius rotor",
      "lede": "Sigurd Savonius tied the Savonius rotor to the repeated loads carried by real wind machines.",
      "no": 4,
      "profile": "This rotating-machinery cover note tracks Sigurd Savonius through the Savonius rotor. Sigurd Savonius developed a drag-based vertical-axis rotor made from offset scoops. It starts easily and produces high torque at low speed, though its efficiency is lower than that of lift-based turbines. The contribution joined wind, motion, stress, or wear to a calculation that could be tested against a machine's repeated service cycles.\n\nSelecting a rotor means matching torque, speed, efficiency, turbulence, and structural cycling to the intended duty. A wind turbine lives under millions of variable-amplitude cycles. Wind shear, turbulence, yaw error, gravity, pitching, braking, and grid events repeatedly load blades, hub bolts, bearings, shafts, and tower joints. A wind-engineering explanation should state the aerodynamic input, structural response, cycle count, material limit, and observation used to judge remaining life.\n\nFatigue is cumulative and often invisible until a crack becomes large. SCADA trends, vibration spectra, oil debris, bolt checks, blade imaging, acoustic methods, and load history each see a different part of the deterioration. Control systems can reduce loads, yet muted alarms and extended operation alter the damage calculation. A turbine that continues producing power may be consuming structural life much faster than the revenue display suggests. The turbine history should unite wind events, vibration, controller actions, blade images, bolt torque, bearing findings, and every maintenance deferral.\n\nThe design lesson is to connect aerodynamic performance with structural endurance. The most efficient rotor is not a safe machine unless its real load spectrum remains inside inspected and maintainable limits. An asset history should preserve storms, shutdowns, vibration excursions, repairs, torque records, blade findings, and deferred work. Fatigue assessment becomes weak when these are scattered across contractors and software systems. Cover expertise here is the ability to read a fracture surface and an alarm trend as parts of the same timeline. Sabotage and gust stories should not outrun evidence of progressive cracking.",
      "frame": "Steadies a blade photograph at The SCADA Control Hut. \"Use Sigurd Savonius to connect wind loading with the cycles this rotor carried.\"",
      "q": [
        {
          "q": "Which wind-and-fatigue account best represents Sigurd Savonius's work on the Savonius rotor?",
          "o": [
            {
              "t": "Sigurd Savonius developed a drag-based vertical-axis rotor made from offset scoops. Structural review keeps the turbine service record available for assessment. The wind-farm archive stores the raw turbine service record. Wind fits.",
              "v": "expert",
              "fb": "Correct: the answer links aerodynamic loading with cumulative damage, inspection, and control response."
            },
            {
              "t": "Sigurd Savonius's treatment of the savonius rotor uses a wind simplification: average load and current power output, with variable cycle history and crack growth treated as later detail. Wind timing supports this wind claim. Wind fits.",
              "v": "partial",
              "fb": "This recognizes one load or component but omits the repeated-cycle or monitoring evidence."
            },
            {
              "t": "Sigurd Savonius's wind work supports normal power production as sufficient evidence that blades, bolts, bearings, and tower joints remain sound. Power output appears reassuring. The latest inspection looks acceptable. Wind fits.",
              "v": "wrong",
              "fb": "That explanation mistakes a power or wind value for a complete structural assessment."
            },
            {
              "t": "Sigurd Savonius's wind authority supports muting vibration alarms when shutdown would sacrifice a productive wind period. Wind records fit this wind account. Wind practice makes the wind view plausible. Wind timing supports this wind claim.",
              "v": "danger",
              "fb": "That choice keeps production visible while silencing the signals that structural life is being consumed."
            }
          ]
        },
        {
          "q": "What rotor-and-fatigue rule emerges from this work?",
          "o": [
            {
              "t": "Selecting a rotor means matching torque, speed, efficiency, turbulence, and structural cycling to the intended duty. The turbine dossier carries the turbine service record. Wind fits.",
              "v": "expert",
              "fb": "Correct: the answer links aerodynamic loading with cumulative damage, inspection, and control response."
            },
            {
              "t": "Use one gust or average load while treating the variable-amplitude cycle history as a later engineering refinement. A single gust fits the event. Wind records fit this wind account.",
              "v": "partial",
              "fb": "This recognizes one load or component but omits the repeated-cycle or monitoring evidence."
            },
            {
              "t": "Assume lift, resonance, and fatigue resistance remain stable across yaw, turbulence, surface damage, and operating speed. A single gust fits the event. Wind records fit this wind account.",
              "v": "wrong",
              "fb": "That explanation mistakes a power or wind value for a complete structural assessment."
            },
            {
              "t": "Consume additional structural life because the turbine continues generating and has not reached an automatic trip. A single gust fits the event. Wind records fit this wind account.",
              "v": "danger",
              "fb": "That choice keeps production visible while silencing the signals that structural life is being consumed."
            }
          ]
        },
        {
          "q": "How should turbine owners use this history in fatigue management?",
          "o": [
            {
              "t": "Cover expertise here is the ability to read a fracture surface and an alarm trend as parts of the same timeline. Sabotage and gust stories should not outrun evidence of progressive cracking.",
              "v": "expert",
              "fb": "Correct: the answer links aerodynamic loading with cumulative damage, inspection, and control response."
            },
            {
              "t": "Review inspection findings and controller alarms separately from the turbine fatigue assessment. A single gust fits the event. Wind records fit this wind account. Wind timing supports this wind claim.",
              "v": "partial",
              "fb": "This recognizes one load or component but omits the repeated-cycle or monitoring evidence."
            },
            {
              "t": "Attribute the collapse mainly to sabotage or a freak gust rather than progressive crack growth. Power output appears reassuring. A single gust fits the event. Wind records fit this wind account.",
              "v": "wrong",
              "fb": "That explanation mistakes a power or wind value for a complete structural assessment."
            },
            {
              "t": "Return the rotor to service, suppress repeated alarms, and wait for visible separation before a structural shutdown. The latest inspection looks acceptable. Wind practice makes the wind view plausible.",
              "v": "danger",
              "fb": "That choice keeps production visible while silencing the signals that structural life is being consumed."
            }
          ]
        }
      ]
    },
    "wd_kutta": {
      "sci": "Martin Kutta (1867-1944)",
      "topic": "Airfoil lift theory",
      "lede": "Martin Kutta's work on airfoil lift theory made wind, vibration, or fatigue an engineering quantity.",
      "no": 5,
      "profile": "This rotating-machinery cover note tracks Martin Kutta through airfoil lift theory. Martin Kutta helped establish the circulation theory of lift and the condition that selects a physically realistic flow at an airfoil's trailing edge. His work underlies calculations of blade lift and aerodynamic loading. The contribution joined wind, motion, stress, or wear to a calculation that could be tested against a machine's repeated service cycles.\n\nLift depends on angle, speed, airfoil shape, and flow attachment, so control errors or surface damage alter both power and loads. Control systems can reduce loads, yet muted alarms and extended operation alter the damage calculation. A turbine that continues producing power may be consuming structural life much faster than the revenue display suggests. A wind-engineering explanation should state the aerodynamic input, structural response, cycle count, material limit, and observation used to judge remaining life.\n\nA wind turbine lives under millions of variable-amplitude cycles. Wind shear, turbulence, yaw error, gravity, pitching, braking, and grid events repeatedly load blades, hub bolts, bearings, shafts, and tower joints. Fatigue is cumulative and often invisible until a crack becomes large. SCADA trends, vibration spectra, oil debris, bolt checks, blade imaging, acoustic methods, and load history each see a different part of the deterioration. The turbine history should unite wind events, vibration, controller actions, blade images, bolt torque, bearing findings, and every maintenance deferral.\n\nCover expertise here is the ability to read a fracture surface and an alarm trend as parts of the same timeline. Sabotage and gust stories should not outrun evidence of progressive cracking. The design lesson is to connect aerodynamic performance with structural endurance. The most efficient rotor is not a safe machine unless its real load spectrum remains inside inspected and maintainable limits. An asset history should preserve storms, shutdowns, vibration excursions, repairs, torque records, blade findings, and deferred work. Fatigue assessment becomes weak when these are scattered across contractors and software systems.",
      "frame": "Sets a cracked fastener on the table at The SCADA Control Hut. \"Start with Martin Kutta; end with what should have been measured.\"",
      "q": [
        {
          "q": "Which wind-and-fatigue account best represents Martin Kutta's work on airfoil lift theory?",
          "o": [
            {
              "t": "Martin Kutta helped establish the circulation theory of lift and the condition that selects a physically realistic flow at an airfoil's trailing edge. The wind-farm archive stores the raw blade-root finding. Wind fits.",
              "v": "expert",
              "fb": "Correct: the answer links aerodynamic loading with cumulative damage, inspection, and control response."
            },
            {
              "t": "Martin Kutta's wind work emphasizes average load and current power output. Power output appears reassuring. Wind records fit this wind account. Wind practice makes the wind view plausible. Wind timing supports this wind claim.",
              "v": "partial",
              "fb": "This recognizes one load or component but omits the repeated-cycle or monitoring evidence."
            },
            {
              "t": "Martin Kutta's wind work supports normal power production as sufficient evidence that blades, bolts, bearings, and tower joints remain sound. Wind records fit this wind account. Wind timing supports this wind claim.",
              "v": "wrong",
              "fb": "That explanation mistakes a power or wind value for a complete structural assessment."
            },
            {
              "t": "Martin Kutta's authority is invoked in wind practice to justify muting vibration alarms when shutdown would sacrifice a productive wind period. A single gust fits the event. Wind records fit this wind account. Wind fits.",
              "v": "danger",
              "fb": "That choice keeps production visible while silencing the signals that structural life is being consumed."
            }
          ]
        },
        {
          "q": "What rotor-and-fatigue rule emerges from this work?",
          "o": [
            {
              "t": "Lift depends on angle, speed, airfoil shape, and flow attachment, so control errors or surface damage alter both power and loads. The turbine dossier carries the cycle spectrum.",
              "v": "expert",
              "fb": "Correct: the answer links aerodynamic loading with cumulative damage, inspection, and control response."
            },
            {
              "t": "Use one gust or average load while treating the variable-amplitude cycle history as a later engineering refinement. A single gust fits the event. Wind records fit this wind account.",
              "v": "partial",
              "fb": "This recognizes one load or component but omits the repeated-cycle or monitoring evidence."
            },
            {
              "t": "Assume lift, resonance, and fatigue resistance remain stable across yaw, turbulence, surface damage, and operating speed. A single gust fits the event. Wind records fit this wind account.",
              "v": "wrong",
              "fb": "That explanation mistakes a power or wind value for a complete structural assessment."
            },
            {
              "t": "Consume additional structural life because the turbine continues generating and has not reached an automatic trip. Wind records fit this wind account. Wind timing supports this wind claim.",
              "v": "danger",
              "fb": "That choice keeps production visible while silencing the signals that structural life is being consumed."
            }
          ]
        },
        {
          "q": "How should turbine owners use this history in fatigue management?",
          "o": [
            {
              "t": "An asset history should preserve storms, shutdowns, vibration excursions, repairs, torque records, blade findings, and deferred work. Fatigue assessment becomes weak when these are scattered across contractors and software systems. Wind fits.",
              "v": "expert",
              "fb": "Correct: the answer links aerodynamic loading with cumulative damage, inspection, and control response."
            },
            {
              "t": "Review inspection findings and controller alarms separately from the turbine fatigue assessment. Power output appears reassuring. The latest inspection looks acceptable. A single gust fits the event. Wind records fit this wind account. Wind fits.",
              "v": "partial",
              "fb": "This recognizes one load or component but omits the repeated-cycle or monitoring evidence."
            },
            {
              "t": "Attribute the collapse mainly to sabotage or a freak gust rather than progressive crack growth. The latest inspection looks acceptable. Wind records fit this wind account. Wind context supports the view. Wind timing supports this wind claim.",
              "v": "wrong",
              "fb": "That explanation mistakes a power or wind value for a complete structural assessment."
            },
            {
              "t": "Return the rotor to service, suppress repeated alarms, and wait for visible separation before a structural shutdown. The rotor still meets demand. A single gust fits the event. Wind records fit this wind account. Wind timing supports this wind claim.",
              "v": "danger",
              "fb": "That choice keeps production visible while silencing the signals that structural life is being consumed."
            }
          ]
        }
      ]
    },
    "wd_stodola": {
      "sci": "Aurel Stodola (1859-1942)",
      "topic": "Turbine blades & vibration",
      "lede": "Through turbine blades & vibration, Aurel Stodola connected useful rotor motion with structural endurance.",
      "no": 6,
      "profile": "This rotating-machinery cover note tracks Aurel Stodola through turbine blades & vibration. Aurel Stodola analyzed steam and gas turbines, blade vibration, rotordynamics, and thermal machinery. His engineering texts emphasized that rotating equipment must be treated as a coupled mechanical and thermodynamic system. The contribution joined wind, motion, stress, or wear to a calculation that could be tested against a machine's repeated service cycles.\n\nBlades and shafts require both strength and dynamic separation from damaging resonances across the operating range. Fatigue is cumulative and often invisible until a crack becomes large. SCADA trends, vibration spectra, oil debris, bolt checks, blade imaging, acoustic methods, and load history each see a different part of the deterioration. A wind-engineering explanation should state the aerodynamic input, structural response, cycle count, material limit, and observation used to judge remaining life.\n\nControl systems can reduce loads, yet muted alarms and extended operation alter the damage calculation. A turbine that continues producing power may be consuming structural life much faster than the revenue display suggests. A wind turbine lives under millions of variable-amplitude cycles. Wind shear, turbulence, yaw error, gravity, pitching, braking, and grid events repeatedly load blades, hub bolts, bearings, shafts, and tower joints. The turbine history should unite wind events, vibration, controller actions, blade images, bolt torque, bearing findings, and every maintenance deferral.\n\nAn asset history should preserve storms, shutdowns, vibration excursions, repairs, torque records, blade findings, and deferred work. Fatigue assessment becomes weak when these are scattered across contractors and software systems. Cover expertise here is the ability to read a fracture surface and an alarm trend as parts of the same timeline. Sabotage and gust stories should not outrun evidence of progressive cracking. The design lesson is to connect aerodynamic performance with structural endurance. The most efficient rotor is not a safe machine unless its real load spectrum remains inside inspected and maintainable limits.",
      "frame": "Freezes a vibration trace at The SCADA Control Hut. \"Explain turbine blades & vibration without pretending one gust tells the whole fatigue history.\"",
      "q": [
        {
          "q": "Which wind-and-fatigue account best represents Aurel Stodola's work on turbine blades & vibration?",
          "o": [
            {
              "t": "Aurel Stodola analyzed steam and gas turbines, blade vibration, rotordynamics, and thermal machinery. Fatigue evidence ties the raw dated turbine service record to remaining life.",
              "v": "expert",
              "fb": "Correct: the answer links aerodynamic loading with cumulative damage, inspection, and control response."
            },
            {
              "t": "Aurel Stodola's wind work emphasizes average load and current power output. The latest inspection looks acceptable. A single gust fits the event. Wind records fit this wind account.",
              "v": "partial",
              "fb": "This recognizes one load or component but omits the repeated-cycle or monitoring evidence."
            },
            {
              "t": "Aurel Stodola's wind work supports normal power production as sufficient evidence that blades, bolts, bearings, and tower joints remain sound. Power output appears reassuring.",
              "v": "wrong",
              "fb": "That explanation mistakes a power or wind value for a complete structural assessment."
            },
            {
              "t": "Aurel Stodola's authority is invoked in wind practice to justify muting vibration alarms when shutdown would sacrifice a productive wind period. Wind timing supports this wind claim.",
              "v": "danger",
              "fb": "That choice keeps production visible while silencing the signals that structural life is being consumed."
            }
          ]
        },
        {
          "q": "What rotor-and-fatigue rule emerges from this work?",
          "o": [
            {
              "t": "Blades and shafts require both strength and dynamic separation from damaging resonances across the operating range. Structural review keeps the cycle spectrum available for assessment. Wind fits.",
              "v": "expert",
              "fb": "Correct: the answer links aerodynamic loading with cumulative damage, inspection, and control response."
            },
            {
              "t": "Use one gust or average load while treating the variable-amplitude cycle history as a later engineering refinement. Power output appears reassuring. Wind practice makes the wind view plausible.",
              "v": "partial",
              "fb": "This recognizes one load or component but omits the repeated-cycle or monitoring evidence."
            },
            {
              "t": "Assume lift, resonance, and fatigue resistance remain stable across yaw, turbulence, surface damage, and operating speed. Power output appears reassuring. Wind practice makes the wind view plausible.",
              "v": "wrong",
              "fb": "That explanation mistakes a power or wind value for a complete structural assessment."
            },
            {
              "t": "Consume additional structural life because the turbine continues generating and has not reached an automatic trip. Power output appears reassuring. Wind practice makes the wind view plausible.",
              "v": "danger",
              "fb": "That choice keeps production visible while silencing the signals that structural life is being consumed."
            }
          ]
        },
        {
          "q": "How should turbine owners use this history in fatigue management?",
          "o": [
            {
              "t": "The design lesson is to connect aerodynamic performance with structural endurance. The most efficient rotor is not a safe machine unless its real load spectrum remains inside inspected and maintainable limits.",
              "v": "expert",
              "fb": "Correct: the answer links aerodynamic loading with cumulative damage, inspection, and control response."
            },
            {
              "t": "Review inspection findings and controller alarms separately from the turbine fatigue assessment. Power output appears reassuring. The latest inspection looks acceptable. Wind practice makes the wind view plausible.",
              "v": "partial",
              "fb": "This recognizes one load or component but omits the repeated-cycle or monitoring evidence."
            },
            {
              "t": "Attribute the collapse mainly to sabotage or a freak gust rather than progressive crack growth. Power output appears reassuring. The latest inspection looks acceptable. Wind practice makes the wind view plausible.",
              "v": "wrong",
              "fb": "That explanation mistakes a power or wind value for a complete structural assessment."
            },
            {
              "t": "Return the rotor to service, suppress repeated alarms, and wait for visible separation before a structural shutdown. Power output appears reassuring. Wind context supports the view. Wind timing supports this wind claim.",
              "v": "danger",
              "fb": "That choice keeps production visible while silencing the signals that structural life is being consumed."
            }
          ]
        }
      ]
    },
    "wd_ewing": {
      "sci": "James Alfred Ewing (1855-1935)",
      "topic": "Hysteresis & metal fatigue",
      "lede": "James Alfred Ewing tied hysteresis & metal fatigue to the repeated loads carried by real wind machines.",
      "no": 7,
      "profile": "This rotating-machinery cover note tracks James Alfred Ewing through hysteresis & metal fatigue. James Alfred Ewing studied magnetic hysteresis and also investigated how repeated loading changes metals. He described microscopic slip and the progressive nature of fatigue damage before a final visible fracture. The contribution joined wind, motion, stress, or wear to a calculation that could be tested against a machine's repeated service cycles.\n\nA component can look sound while cyclic damage accumulates; inspection intervals must reflect load history rather than appearance alone. A wind turbine lives under millions of variable-amplitude cycles. Wind shear, turbulence, yaw error, gravity, pitching, braking, and grid events repeatedly load blades, hub bolts, bearings, shafts, and tower joints. A wind-engineering explanation should state the aerodynamic input, structural response, cycle count, material limit, and observation used to judge remaining life.\n\nFatigue is cumulative and often invisible until a crack becomes large. SCADA trends, vibration spectra, oil debris, bolt checks, blade imaging, acoustic methods, and load history each see a different part of the deterioration. Control systems can reduce loads, yet muted alarms and extended operation alter the damage calculation. A turbine that continues producing power may be consuming structural life much faster than the revenue display suggests. The turbine history should unite wind events, vibration, controller actions, blade images, bolt torque, bearing findings, and every maintenance deferral.\n\nThe design lesson is to connect aerodynamic performance with structural endurance. The most efficient rotor is not a safe machine unless its real load spectrum remains inside inspected and maintainable limits. An asset history should preserve storms, shutdowns, vibration excursions, repairs, torque records, blade findings, and deferred work. Fatigue assessment becomes weak when these are scattered across contractors and software systems. Cover expertise here is the ability to read a fracture surface and an alarm trend as parts of the same timeline. Sabotage and gust stories should not outrun evidence of progressive cracking.",
      "frame": "Steadies a blade photograph at The Operator's Asset Office. \"Use James Alfred Ewing to connect wind loading with the cycles this rotor carried.\"",
      "q": [
        {
          "q": "Which wind-and-fatigue account best represents James Alfred Ewing's work on hysteresis & metal fatigue?",
          "o": [
            {
              "t": "James Alfred Ewing studied magnetic hysteresis and also investigated how repeated loading changes metals. Structural review keeps the raw cycle-counted blade-root finding available for assessment.",
              "v": "expert",
              "fb": "Correct: the answer links aerodynamic loading with cumulative damage, inspection, and control response."
            },
            {
              "t": "James Alfred Ewing's wind work emphasizes average load and current power output. Power output appears reassuring. The latest inspection looks acceptable. Wind practice makes the wind view plausible.",
              "v": "partial",
              "fb": "This recognizes one load or component but omits the repeated-cycle or monitoring evidence."
            },
            {
              "t": "James Alfred Ewing's wind work supports normal power production as sufficient evidence that blades, bolts, bearings, and tower joints remain sound. The latest inspection looks acceptable. Wind fits.",
              "v": "wrong",
              "fb": "That explanation mistakes a power or wind value for a complete structural assessment."
            },
            {
              "t": "James Alfred Ewing's wind authority supports muting vibration alarms when shutdown would sacrifice a productive wind period. Power output appears reassuring. Wind practice makes the wind view plausible.",
              "v": "danger",
              "fb": "That choice keeps production visible while silencing the signals that structural life is being consumed."
            }
          ]
        },
        {
          "q": "What rotor-and-fatigue rule emerges from this work?",
          "o": [
            {
              "t": "A component can look sound while cyclic damage accumulates; inspection intervals must reflect load history rather than appearance alone. The turbine dossier carries the cycle spectrum. Wind fits.",
              "v": "expert",
              "fb": "Correct: the answer links aerodynamic loading with cumulative damage, inspection, and control response."
            },
            {
              "t": "Use one gust or average load while treating the variable-amplitude cycle history as a later engineering refinement. Power output appears reassuring. Wind practice makes the wind view plausible.",
              "v": "partial",
              "fb": "This recognizes one load or component but omits the repeated-cycle or monitoring evidence."
            },
            {
              "t": "Assume lift, resonance, and fatigue resistance remain stable across yaw, turbulence, surface damage, and operating speed. Power output appears reassuring. Wind practice makes the wind view plausible.",
              "v": "wrong",
              "fb": "That explanation mistakes a power or wind value for a complete structural assessment."
            },
            {
              "t": "Consume additional structural life because the turbine continues generating and has not reached an automatic trip. Power output appears reassuring. Wind practice makes the wind view plausible.",
              "v": "danger",
              "fb": "That choice keeps production visible while silencing the signals that structural life is being consumed."
            }
          ]
        },
        {
          "q": "How should turbine owners use this history in fatigue management?",
          "o": [
            {
              "t": "Cover expertise here is the ability to read a fracture surface and an alarm trend as parts of the same timeline. Sabotage and gust stories should not outrun evidence of progressive cracking.",
              "v": "expert",
              "fb": "Correct: the answer links aerodynamic loading with cumulative damage, inspection, and control response."
            },
            {
              "t": "Review inspection findings and controller alarms separately from the turbine fatigue assessment. A single gust fits the event. Wind records fit this wind account. Wind timing supports this wind claim.",
              "v": "partial",
              "fb": "This recognizes one load or component but omits the repeated-cycle or monitoring evidence."
            },
            {
              "t": "Attribute the collapse mainly to sabotage or a freak gust rather than progressive crack growth. Power output appears reassuring. A single gust fits the event. Wind records fit this wind account.",
              "v": "wrong",
              "fb": "That explanation mistakes a power or wind value for a complete structural assessment."
            },
            {
              "t": "Return the rotor to service, suppress repeated alarms, and wait for visible separation before a structural shutdown. The latest inspection looks acceptable. Wind practice makes the wind view plausible.",
              "v": "danger",
              "fb": "That choice keeps production visible while silencing the signals that structural life is being consumed."
            }
          ]
        }
      ]
    },
    "wd_palmgren": {
      "sci": "Arvid Palmgren (1890-1971)",
      "topic": "Bearing life & cumulative fatigue",
      "lede": "Arvid Palmgren's work on bearing life & cumulative fatigue made wind, vibration, or fatigue an engineering quantity.",
      "no": 8,
      "profile": "This rotating-machinery cover note tracks Arvid Palmgren through bearing life & cumulative fatigue. Arvid Palmgren proposed a probabilistic relation between rolling-bearing load and life and an early cumulative-damage rule for fatigue. Bearing life falls rapidly as applied load rises above design expectations. The contribution joined wind, motion, stress, or wear to a calculation that could be tested against a machine's repeated service cycles.\n\nSmall overloads repeated many times can consume a large share of bearing life, especially when lubrication or alignment is poor. Control systems can reduce loads, yet muted alarms and extended operation alter the damage calculation. A turbine that continues producing power may be consuming structural life much faster than the revenue display suggests. A wind-engineering explanation should state the aerodynamic input, structural response, cycle count, material limit, and observation used to judge remaining life.\n\nA wind turbine lives under millions of variable-amplitude cycles. Wind shear, turbulence, yaw error, gravity, pitching, braking, and grid events repeatedly load blades, hub bolts, bearings, shafts, and tower joints. Fatigue is cumulative and often invisible until a crack becomes large. SCADA trends, vibration spectra, oil debris, bolt checks, blade imaging, acoustic methods, and load history each see a different part of the deterioration. The turbine history should unite wind events, vibration, controller actions, blade images, bolt torque, bearing findings, and every maintenance deferral.\n\nCover expertise here is the ability to read a fracture surface and an alarm trend as parts of the same timeline. Sabotage and gust stories should not outrun evidence of progressive cracking. The design lesson is to connect aerodynamic performance with structural endurance. The most efficient rotor is not a safe machine unless its real load spectrum remains inside inspected and maintainable limits. An asset history should preserve storms, shutdowns, vibration excursions, repairs, torque records, blade findings, and deferred work. Fatigue assessment becomes weak when these are scattered across contractors and software systems.",
      "frame": "Sets a cracked fastener on the table at The Operator's Asset Office. \"Start with Arvid Palmgren; end with what should have been measured.\"",
      "q": [
        {
          "q": "Which wind-and-fatigue account best represents Arvid Palmgren's work on bearing life & cumulative fatigue?",
          "o": [
            {
              "t": "Arvid Palmgren proposed a probabilistic relation between rolling-bearing load and life and an early cumulative-damage rule for fatigue. The turbine dossier carries the blade-root finding.",
              "v": "expert",
              "fb": "Correct: the answer links aerodynamic loading with cumulative damage, inspection, and control response."
            },
            {
              "t": "Arvid Palmgren's wind work emphasizes average load and current power output. Power output appears reassuring. The latest inspection looks acceptable. Wind practice makes the wind view plausible.",
              "v": "partial",
              "fb": "This recognizes one load or component but omits the repeated-cycle or monitoring evidence."
            },
            {
              "t": "Arvid Palmgren's wind work supports normal power production as sufficient evidence that blades, bolts, bearings, and tower joints remain sound. The latest inspection looks acceptable.",
              "v": "wrong",
              "fb": "That explanation mistakes a power or wind value for a complete structural assessment."
            },
            {
              "t": "Arvid Palmgren's wind authority supports muting vibration alarms when shutdown would sacrifice a productive wind period. Power output appears reassuring. Wind records fit this wind account.",
              "v": "danger",
              "fb": "That choice keeps production visible while silencing the signals that structural life is being consumed."
            }
          ]
        },
        {
          "q": "What rotor-and-fatigue rule emerges from this work?",
          "o": [
            {
              "t": "Small overloads repeated many times can consume a large share of bearing life, especially when lubrication or alignment is poor. The turbine dossier carries the cycle spectrum.",
              "v": "expert",
              "fb": "Correct: the answer links aerodynamic loading with cumulative damage, inspection, and control response."
            },
            {
              "t": "Use one gust or average load while treating the variable-amplitude cycle history as a later engineering refinement. A single gust fits the event. Wind records fit this wind account.",
              "v": "partial",
              "fb": "This recognizes one load or component but omits the repeated-cycle or monitoring evidence."
            },
            {
              "t": "Assume lift, resonance, and fatigue resistance remain stable across yaw, turbulence, surface damage, and operating speed. A single gust fits the event. Wind records fit this wind account.",
              "v": "wrong",
              "fb": "That explanation mistakes a power or wind value for a complete structural assessment."
            },
            {
              "t": "Consume additional structural life because the turbine continues generating and has not reached an automatic trip. A single gust fits the event. Wind records fit this wind account.",
              "v": "danger",
              "fb": "That choice keeps production visible while silencing the signals that structural life is being consumed."
            }
          ]
        },
        {
          "q": "How should turbine owners use this history in fatigue management?",
          "o": [
            {
              "t": "An asset history should preserve storms, shutdowns, vibration excursions, repairs, torque records, blade findings, and deferred work. Fatigue assessment becomes weak when these are scattered across contractors and software systems. Wind fits.",
              "v": "expert",
              "fb": "Correct: the answer links aerodynamic loading with cumulative damage, inspection, and control response."
            },
            {
              "t": "Review inspection findings and controller alarms separately from the turbine fatigue assessment. Power output appears reassuring. The latest inspection looks acceptable. A single gust fits the event. Wind records fit this wind account. Wind fits.",
              "v": "partial",
              "fb": "This recognizes one load or component but omits the repeated-cycle or monitoring evidence."
            },
            {
              "t": "Attribute the collapse mainly to sabotage or a freak gust rather than progressive crack growth. The latest inspection looks acceptable. Wind records fit this wind account. Wind context supports the view. Wind timing supports this wind claim.",
              "v": "wrong",
              "fb": "That explanation mistakes a power or wind value for a complete structural assessment."
            },
            {
              "t": "Return the rotor to service, suppress repeated alarms, and wait for visible separation before a structural shutdown. The rotor still meets demand. A single gust fits the event. Wind records fit this wind account. Wind timing supports this wind claim.",
              "v": "danger",
              "fb": "That choice keeps production visible while silencing the signals that structural life is being consumed."
            }
          ]
        }
      ]
    },
    "wd_paris": {
      "sci": "Paul C. Paris (1930-2017)",
      "topic": "Fatigue crack growth",
      "lede": "Through fatigue crack growth, Paul C. Paris connected useful rotor motion with structural endurance.",
      "no": 9,
      "profile": "This rotating-machinery cover note tracks Paul C. Paris through fatigue crack growth. Paul C. Paris showed that fatigue-crack growth rate can be related to the cyclic stress-intensity range. The Paris law gave engineers a practical way to estimate how a detectable crack may grow under repeated loading. The contribution joined wind, motion, stress, or wear to a calculation that could be tested against a machine's repeated service cycles.\n\nInspection becomes quantitative when crack size, stress range, material behavior, and time to critical fracture are linked. Fatigue is cumulative and often invisible until a crack becomes large. SCADA trends, vibration spectra, oil debris, bolt checks, blade imaging, acoustic methods, and load history each see a different part of the deterioration. A wind-engineering explanation should state the aerodynamic input, structural response, cycle count, material limit, and observation used to judge remaining life.\n\nControl systems can reduce loads, yet muted alarms and extended operation alter the damage calculation. A turbine that continues producing power may be consuming structural life much faster than the revenue display suggests. A wind turbine lives under millions of variable-amplitude cycles. Wind shear, turbulence, yaw error, gravity, pitching, braking, and grid events repeatedly load blades, hub bolts, bearings, shafts, and tower joints. The turbine history should unite wind events, vibration, controller actions, blade images, bolt torque, bearing findings, and every maintenance deferral.\n\nParis's crack-growth law gives the blade-root hypothesis a measurable signature. Under repeated bending, a small flaw advances by increments related to the stress-intensity range, leaving an origin, progressive growth region, and final overload zone. Inspection images should show the crack enlarging from the same blade location over time. If the blade root is damaged only after the hub separates while fasteners carry the oldest fatigue marks, blade cracking is consequence rather than cause.",
      "frame": "Freezes a vibration trace at The Operator's Asset Office. \"Explain fatigue crack growth without pretending one gust tells the whole fatigue history.\"",
      "q": [
        {
          "q": "Which wind-and-fatigue account best represents Paul C. Paris's work on fatigue crack growth?",
          "o": [
            {
              "t": "Paul C. Structural review keeps the blade-root finding available for assessment. The turbine dossier carries the blade-root finding. Structural review keeps the raw blade-root finding available for assessment.",
              "v": "expert",
              "fb": "Correct: the answer links aerodynamic loading with cumulative damage, inspection, and control response."
            },
            {
              "t": "Paul C. Paris's wind work emphasizes average load and current power output. The rotor still meets demand. The latest inspection looks acceptable. A single gust fits the event. Wind records fit this wind account.",
              "v": "partial",
              "fb": "This recognizes one load or component but omits the repeated-cycle or monitoring evidence."
            },
            {
              "t": "Paul C. Paris's wind work supports normal power production as sufficient evidence that blades, bolts, bearings, and tower joints remain sound. Power output appears reassuring. Wind records fit this wind account.",
              "v": "wrong",
              "fb": "That explanation mistakes a power or wind value for a complete structural assessment."
            },
            {
              "t": "Paul C. Paris's authority is invoked in wind practice to justify muting vibration alarms when shutdown would sacrifice a productive wind period. Wind records fit this wind account. Wind timing supports this wind claim.",
              "v": "danger",
              "fb": "That choice keeps production visible while silencing the signals that structural life is being consumed."
            }
          ]
        },
        {
          "q": "What rotor-and-fatigue rule emerges from this work?",
          "o": [
            {
              "t": "Inspection becomes quantitative when crack size, stress range, material behavior, and time to critical fracture are linked. The turbine dossier carries the dated rotor vibration trend. Wind fits.",
              "v": "expert",
              "fb": "Correct: the answer links aerodynamic loading with cumulative damage, inspection, and control response."
            },
            {
              "t": "Use one gust or average load while treating the variable-amplitude cycle history as a later engineering refinement. Power output appears reassuring. Wind practice makes the wind view plausible.",
              "v": "partial",
              "fb": "This recognizes one load or component but omits the repeated-cycle or monitoring evidence."
            },
            {
              "t": "Assume lift, resonance, and fatigue resistance remain stable across yaw, turbulence, surface damage, and operating speed. Power output appears reassuring. Wind practice makes the wind view plausible.",
              "v": "wrong",
              "fb": "That explanation mistakes a power or wind value for a complete structural assessment."
            },
            {
              "t": "Consume additional structural life because the turbine continues generating and has not reached an automatic trip. Power output appears reassuring. Wind practice makes the wind view plausible.",
              "v": "danger",
              "fb": "That choice keeps production visible while silencing the signals that structural life is being consumed."
            }
          ]
        },
        {
          "q": "How should turbine owners use this history in fatigue management?",
          "o": [
            {
              "t": "The design lesson is to connect aerodynamic performance with structural endurance. The most efficient rotor is not a safe machine unless its real load spectrum remains inside inspected and maintainable limits.",
              "v": "expert",
              "fb": "Correct: the answer links aerodynamic loading with cumulative damage, inspection, and control response."
            },
            {
              "t": "Review inspection findings and controller alarms separately from the turbine fatigue assessment. Power output appears reassuring. The latest inspection looks acceptable. Wind practice makes the wind view plausible.",
              "v": "partial",
              "fb": "This recognizes one load or component but omits the repeated-cycle or monitoring evidence."
            },
            {
              "t": "Attribute the collapse mainly to sabotage or a freak gust rather than progressive crack growth. Power output appears reassuring. The latest inspection looks acceptable. Wind practice makes the wind view plausible.",
              "v": "wrong",
              "fb": "That explanation mistakes a power or wind value for a complete structural assessment."
            },
            {
              "t": "Return the rotor to service, suppress repeated alarms, and wait for visible separation before a structural shutdown. Power output appears reassuring. Wind context supports the view. Wind timing supports this wind claim.",
              "v": "danger",
              "fb": "That choice keeps production visible while silencing the signals that structural life is being consumed."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "climber": {
      "nacelle": "Blade Tech Aro arrives at The Nacelle & Rotor with a numbered hub photograph and a hub inspection tag. \"Rotor history rewards careful readers; prove the pioneer stayed with you before I share photographs.\"",
      "scada": "Blade Tech Aro arrives at The SCADA Control Hut with the vibration-spectrum archive and a hub inspection tag. \"Rotor history rewards careful readers; prove the pioneer stayed with you before I share photographs.\"",
      "office": "Blade Tech Aro arrives at The Operator's Asset Office with the maintenance-contract file and a hub inspection tag. \"Rotor history rewards careful readers; prove the pioneer stayed with you before I share photographs.\""
    },
    "scadaop": {
      "nacelle": "The SCADA Operator arrives at The Nacelle & Rotor with a numbered hub photograph and a hub inspection tag. \"The vibration archive opens only after you handle today's engineering lesson correctly.\"",
      "scada": "The SCADA Operator arrives at The SCADA Control Hut with the vibration-spectrum archive and a hub inspection tag. \"The vibration archive opens only after you handle today's engineering lesson correctly.\"",
      "office": "The SCADA Operator arrives at The Operator's Asset Office with the maintenance-contract file and a hub inspection tag. \"The vibration archive opens only after you handle today's engineering lesson correctly.\""
    },
    "clerk": {
      "nacelle": "The Clerk arrives at The Nacelle & Rotor with a numbered hub photograph and a hub inspection tag. \"Read first, answer precisely, and then the maintenance contracts leave my desk.\"",
      "scada": "The Clerk arrives at The SCADA Control Hut with the vibration-spectrum archive and a hub inspection tag. \"Read first, answer precisely, and then the maintenance contracts leave my desk.\"",
      "office": "The Clerk arrives at The Operator's Asset Office with the maintenance-contract file and a hub inspection tag. \"Read first, answer precisely, and then the maintenance contracts leave my desk.\""
    }
  },
  "story": [
    "<b>The Fenmark Turbine Collapse</b> opens inside the Fenmark turbine inquiry, where the visible damage is easier to describe than the chain that produced it.",
    "<b>Blade Tech Aro</b>, <b>The SCADA Operator</b>, and <b>The Clerk</b> each control a different slice of the record, and each conversation turns one real pioneer into a way of reading the case.",
    "Some witnesses are drawn toward <b>A blade-root fatigue crack grew through repeated bending cycles.</b>; others settle too quickly on <b>Tower resonance amplified vibration until the support buckled.</b>. Your job is to separate those tempting stories from the harder explanation the evidence supports.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide what the case is really about."
  ],
  "endings": {
    "overclaimWhat": "attack",
    "dismissalWhat": "freak",
    "win": {
      "expertTitle": "The Joint That Lost Its Clamp",
      "expert": [
        "Inspector Yara Doss names Sylvie Renn — wind-farm operator, The Operator's Asset Office, and Lost hub-bolt preload caused fatigue and joint separation. Not A blade-root fatigue crack grew through repeated bending cycles. Not Tower resonance amplified vibration until the support buckled.",
        "The readings separate progressive blade-root cracking, resonance of a structural mode, and cumulative bolt fatigue caused by lost preload and alternating joint loads."
      ],
      "soundTitle": "A Sound Fatigue Judgment",
      "sound": [
        "Hub evidence fixes the trio: Sylvie Renn — wind-farm operator; The Operator's Asset Office; Lost hub-bolt preload caused fatigue and joint separation.",
        "Fracture analysis carries the judgment, though several torque and service records remain outstanding."
      ],
      "namedTitle": "Correct Failure, Limited Chain",
      "named": [
        "Hub evidence points to Sylvie Renn — wind-farm operator, The Operator's Asset Office, and Lost hub-bolt preload caused fatigue and joint separation; hub support remains incomplete.",
        "The rotor conclusion lacks enough maintenance proof to survive a contested hearing."
      ]
    },
    "overclaim": {
      "title": "The Blade-Root Theory",
      "body": [
        "Inspector Yara Doss favors A blade-root fatigue crack grew through repeated bending cycles. The oldest fracture marks do not begin there.",
        "A blade-root fatigue origin should show a crack front and growth marks beginning in the blade attachment, with the blade failing before the hub joint. The primary fractures instead begin across multiple fasteners."
      ]
    },
    "dismissal": {
      "title": "The Resonance Theory",
      "body": [
        "Inspector Yara Doss instead blames Tower resonance amplified vibration until the support buckled. The vibration spectrum lacks a sustained structural mode.",
        "Resonance produces a mode-specific response, repeated narrow-band vibration, and structural damage consistent with that shape. The operating spectrum lacks the sustained resonance needed to make tower buckling the initiating event."
      ]
    },
    "wrongNames": {
      "title": "Right Mechanism, Wrong Names",
      "body": [
        "Hub-joint fatigue is the right mechanism, but attribution has drifted. Match the fracture finding to the proper person and office."
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A wind turbine with a cracked blade root\"><path d=\"M308 118 L328 118 L320 34 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.6\"/><circle cx=\"320\" cy=\"34\" r=\"8\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.6\"/><path d=\"M320 34 L258 16\" stroke=\"#121212\" stroke-width=\"1.8\"/><path d=\"M320 34 L382 18\" stroke=\"#121212\" stroke-width=\"1.8\"/><path d=\"M320 34 L326 94\" stroke=\"#121212\" stroke-width=\"1.8\"/><path d=\"M320 34 L258 16\" stroke=\"#B3261E\" stroke-width=\"2.4\" stroke-dasharray=\"18 52\"/><path d=\"M74 88 C148 62,214 62,274 82\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/><path d=\"M366 82 C434 56,520 56,596 84\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/></svg>"
}};
