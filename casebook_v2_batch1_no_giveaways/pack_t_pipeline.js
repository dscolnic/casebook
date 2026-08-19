module.exports = { PACK: {
  "id": "t_pipeline",
  "title": "The Brant Hollow Pipeline",
  "discipline": "Pipeline Integrity & Fluid Mechanics",
  "teaser": "The Brant Hollow pipe opened through a wall defect. Did microbes attack it internally, or did stress-corrosion cracks link under tension? The recovered metal must settle the mechanism.",
  "overclaimTag": "microbial internal corrosion",
  "truthTag": "external corrosion beneath failed coating",
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
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  "placeNarr": "You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  "overclaimTease": "Internal microbes and stress-corrosion cracking are credible pipeline failures; defect shape and surface chemistry must decide.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "operator",
      "items": [
        {
          "id": "operator",
          "label": "Hollis Trask — pipeline operator"
        },
        {
          "id": "controller",
          "label": "The gas control dispatcher"
        },
        {
          "id": "regulator",
          "label": "The pipeline safety regulator"
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
          "label": "The Operator's Integrity Office"
        }
      ]
    },
    "what": {
      "title": "Which damage mechanism opened the pipe?",
      "truth": "corrosion",
      "items": [
        {
          "id": "attack",
          "label": "Internal microbial corrosion pitted the pipe from the gas side."
        },
        {
          "id": "freak",
          "label": "Stress-corrosion cracking linked fine cracks under steady tension."
        },
        {
          "id": "corrosion",
          "label": "External corrosion under failed coating thinned the wall locally."
        }
      ]
    }
  },
  "PLACES": {
    "rightofway": {
      "name": "The Right-of-Way & Rupture Site",
      "xy": [
        140,
        90
      ]
    },
    "control": {
      "name": "The Gas Control Center",
      "xy": [
        330,
        240
      ]
    },
    "office": {
      "name": "The Operator's Integrity Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "rightofway",
      "control"
    ],
    [
      "control",
      "office"
    ]
  ],
  "CHARACTERS": {
    "patrol": {
      "name": "Line-Walker Dumas",
      "role": "Pipeline patroller",
      "face": "🚶",
      "badge": "P",
      "legend": "the right-of-way",
      "hint": "Knows the right-of-way, excavation history, and the people responsible for field observations."
    },
    "dispatch": {
      "name": "The Dispatcher",
      "role": "Gas-control dispatcher",
      "face": "🖥",
      "badge": "D",
      "legend": "the control center",
      "hint": "Holds the pressure timeline and can identify which control staff responded from the gas center."
    },
    "clerk": {
      "name": "The Clerk",
      "role": "Integrity-records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Maintains inspection schedules, integrity assignments, and management authorizations for the line."
    }
  },
  "TOPICMAP": {
    "rightofway": {
      "patrol": [
        "pp_bernoulli",
        "pp_hagen"
      ],
      "dispatch": [
        "pp_poiseuille",
        "pp_weisbach"
      ],
      "clerk": [
        "pp_moody",
        "pp_colebrook"
      ]
    },
    "control": {
      "patrol": [
        "pp_joukowsky",
        "pp_vdwaals"
      ],
      "dispatch": [
        "pp_graham",
        "pp_wagner"
      ],
      "clerk": [
        "pp_fontana",
        "pp_hackerman"
      ]
    },
    "office": {
      "patrol": [
        "pp_kuhn",
        "pp_inglis"
      ],
      "dispatch": [
        "pp_griffith",
        "pp_irwin"
      ],
      "clerk": [
        "pp_firestone",
        "pp_venturi"
      ]
    }
  },
  "TOPICS": {
    "pp_bernoulli": {
      "sci": "Daniel Bernoulli (1700-1782)",
      "topic": "Flow, pressure & Bernoulli's principle",
      "lede": "Daniel Bernoulli made flow, pressure & Bernoulli's principle useful for reading pressure, flow, or damage along a pipeline.",
      "no": 1,
      "profile": "Today's pipeline-systems cover note examines Daniel Bernoulli through flow, pressure & Bernoulli's principle. Daniel Bernoulli related pressure, velocity, and elevation in flowing fluids through an energy balance. Bernoulli's principle remains a starting point for understanding how gas pressure changes as flow accelerates or moves through a system. The result translated flow, corrosion, or fracture into evidence that could be compared with pressure data and the actual pipe wall.\n\nFlow equations are useful only when losses, compressibility, elevation, and transient behavior are included where they matter. A transmission pipeline is a pressure boundary embedded in soil, weather, crossings, coatings, welds, and operating transients. Flow calculations explain service, while integrity engineering asks how the wall changes with time. A pipeline explanation should identify fluid state, pressure history, wall geometry, material behavior, environment, and the inspection method's detection limit.\n\nCorrosion control combines coatings, cathodic protection, chemistry, drainage, patrols, and inspection. Inline tools, ultrasonic methods, pressure tests, and direct examination have different detection limits and should be chosen for expected threats. Control-room data can show pressure loss or rupture, but it does not replace physical knowledge of wall thickness and flaws. A cancelled inspection creates uncertainty that grows as exposure continues. The integrity file must connect patrol observations, cathodic surveys, inline calls, dig measurements, pressure cycles, repairs, and cancelled inspections.\n\nThe integrity lesson is to connect defect geometry with pressure, material toughness, and growth rate. An average corrosion number cannot defend a deep pit or an interacting cluster. A defensible record preserves anomaly calls, dig findings, coating surveys, cathodic readings, pressure cycles, leaks, repairs, and schedule decisions. Trend continuity matters more than any polished annual summary. Cover competence means separating an external strike from progressive metal loss. Fractography, coating condition, corrosion products, SCADA chronology, and inspection history answer that question together.",
      "frame": "Line-Walker Dumas taps the exposed pipe at The Right-of-Way & Rupture Site. \"Use Daniel Bernoulli to connect the pressure record with the metal in front of us.\"",
      "q": [
        {
          "q": "Which pipeline-integrity account best captures Daniel Bernoulli's contribution to flow, pressure & Bernoulli's principle?",
          "o": [
            {
              "t": "Daniel Bernoulli related pressure, velocity, and elevation in flowing fluids through an energy balance. Pressure-boundary evidence ties the dated field-verified inspection record to service history. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Daniel Bernoulli's pipeline work relies on average operating pressure and a regional corrosion rate. The control trend looks stable. Pipeline records fit this pipeline account. Normal pressure appears reassuring.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Daniel Bernoulli's pipeline work is read within pipeline practice as support for ordinary operating pressure as sufficient evidence that an uninspected pipe wall remains sound. The control trend looks stable. Pipeline fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Daniel Bernoulli's pipeline authority supports postponing an inline inspection until the control room shows a clear leak signal. The control trend looks stable. Pipeline records fit this pipeline account. Context fits.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        },
        {
          "q": "Which integrity rule is supported by this pipeline contribution?",
          "o": [
            {
              "t": "Flow equations are useful only when losses, compressibility, elevation, and transient behavior are included where they matter. The segment dossier carries the pressure trace. Pipeline context matters.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Use average pressure and corrosion rate while treating local flaw size, toughness, and transients as later refinements. The control trend looks stable. Pipeline records fit this pipeline account. Pipeline fits.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Assume friction, corrosion rate, and crack resistance remain stable across chemistry, roughness, temperature, and loading history. Pipeline practice makes the pipeline view plausible. The pipeline record fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Continue pressure service while postponing direct knowledge of the pipe wall and its growing anomalies. The control trend looks stable. Regional corrosion rates support it. The pipeline record fits.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        },
        {
          "q": "What should a pipeline operator learn from this history?",
          "o": [
            {
              "t": "Cover competence means separating an external strike from progressive metal loss. Fractography, coating condition, corrosion products, SCADA chronology, and inspection history answer that question together. Pipeline context matters. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Treat inspection uncertainty as secondary after the line returns to normal flow and pressure. Regional corrosion rates support it. Pipeline practice makes the pipeline view plausible. Pipeline timing supports this pipeline claim. Pipeline context matters.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Attribute the rupture mainly to a third-party strike or ground movement rather than progressive metal loss. The control trend looks stable. Pipeline records fit this pipeline account. Pipeline timing supports this pipeline claim. Pipeline fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Restore full pressure, postpone the inline inspection again, and treat the absence of another rupture as reassurance. The control trend looks stable. Pipeline records fit this pipeline account. Pipeline timing supports this pipeline claim. Pipeline fits.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        }
      ]
    },
    "pp_hagen": {
      "sci": "Gotthilf Hagen (1797-1884)",
      "topic": "Laminar flow in pipes",
      "lede": "Through laminar flow in pipes, Gotthilf Hagen connected fluid service with the condition of the pipe wall.",
      "no": 2,
      "profile": "Today's pipeline-systems cover note examines Gotthilf Hagen through laminar flow in pipes. Gotthilf Hagen measured the flow of water through narrow tubes and helped establish the relation later known as Hagen-Poiseuille flow. In laminar motion, viscous resistance depends strongly on pipe radius. The result translated flow, corrosion, or fracture into evidence that could be compared with pressure data and the actual pipe wall.\n\nA modest change in internal diameter from deposits or deformation can greatly alter flow and pressure loss. Corrosion control combines coatings, cathodic protection, chemistry, drainage, patrols, and inspection. Inline tools, ultrasonic methods, pressure tests, and direct examination have different detection limits and should be chosen for expected threats. A pipeline explanation should identify fluid state, pressure history, wall geometry, material behavior, environment, and the inspection method's detection limit.\n\nControl-room data can show pressure loss or rupture, but it does not replace physical knowledge of wall thickness and flaws. A cancelled inspection creates uncertainty that grows as exposure continues. A transmission pipeline is a pressure boundary embedded in soil, weather, crossings, coatings, welds, and operating transients. Flow calculations explain service, while integrity engineering asks how the wall changes with time. The integrity file must connect patrol observations, cathodic surveys, inline calls, dig measurements, pressure cycles, repairs, and cancelled inspections.\n\nA defensible record preserves anomaly calls, dig findings, coating surveys, cathodic readings, pressure cycles, leaks, repairs, and schedule decisions. Trend continuity matters more than any polished annual summary. Cover competence means separating an external strike from progressive metal loss. Fractography, coating condition, corrosion products, SCADA chronology, and inspection history answer that question together. The integrity lesson is to connect defect geometry with pressure, material toughness, and growth rate. An average corrosion number cannot defend a deep pit or an interacting cluster.",
      "frame": "Line-Walker Dumas opens an anomaly sheet at The Right-of-Way & Rupture Site. \"Explain laminar flow in pipes, including what the inspection can miss.\"",
      "q": [
        {
          "q": "Which pipeline-integrity account best captures Gotthilf Hagen's contribution to laminar flow in pipes?",
          "o": [
            {
              "t": "Gotthilf Hagen measured the flow of water through narrow tubes and helped establish the relation later known as Hagen-Poiseuille flow. Pipeline specialists compare the coating survey with wall condition. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Gotthilf Hagen's pipeline work relies on average operating pressure and a regional corrosion rate. The control trend looks stable. Pipeline records fit this pipeline account. Pipeline timing supports this pipeline claim.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Gotthilf Hagen's pipeline work is read within pipeline practice as support for ordinary operating pressure as sufficient evidence that an uninspected pipe wall remains sound. Pipeline practice makes the pipeline view plausible.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Gotthilf Hagen's pipeline authority supports postponing an inline inspection until the control room shows a clear leak signal. Regional corrosion rates support it. Pipeline timing supports this pipeline claim. Fits.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        },
        {
          "q": "Which integrity rule is supported by this pipeline contribution?",
          "o": [
            {
              "t": "A modest change in internal diameter from deposits or deformation can greatly alter flow and pressure loss. Pressure-boundary evidence ties the raw inspection record to service history. Pipeline fits. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Use average pressure and corrosion rate while treating local flaw size, toughness, and transients as later refinements. The control trend looks stable. Pipeline records fit this pipeline account. Pipeline fits.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Assume friction, corrosion rate, and crack resistance remain stable across chemistry, roughness, temperature, and loading history. The control trend looks stable. Pipeline records fit this pipeline account. Pipeline fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Continue pressure service while postponing direct knowledge of the pipe wall and its growing anomalies. Regional corrosion rates support it. Pipeline practice makes the pipeline view plausible. The pipeline record fits.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        },
        {
          "q": "What should a pipeline operator learn from this history?",
          "o": [
            {
              "t": "The integrity lesson is to connect defect geometry with pressure, material toughness, and growth rate. An average corrosion number cannot defend a deep pit or an interacting cluster. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Treat inspection uncertainty as secondary after the line returns to normal flow and pressure. Regional corrosion rates support it. Pipeline practice makes the pipeline view plausible. The pipeline record fits.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Attribute the rupture mainly to a third-party strike or ground movement rather than progressive metal loss. Regional corrosion rates support it. Pipeline timing supports this pipeline claim. Pipeline fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Restore full pressure, postpone the inline inspection again, and treat the absence of another rupture as reassurance. The control trend looks stable. Regional corrosion rates support it. Pipeline fits.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        }
      ]
    },
    "pp_poiseuille": {
      "sci": "Jean Poiseuille (1797-1869)",
      "topic": "Viscous flow in pipes",
      "lede": "Jean Poiseuille's work on viscous flow in pipes gave integrity engineers a measurable relation instead of guesswork.",
      "no": 3,
      "profile": "Today's pipeline-systems cover note examines Jean Poiseuille through viscous flow in pipes. Jean Poiseuille experimentally quantified steady laminar flow through capillary tubes. The resulting law links flow rate with pressure difference, viscosity, tube length, and the fourth power of radius. The result translated flow, corrosion, or fracture into evidence that could be compared with pressure data and the actual pipe wall.\n\nViscosity and diameter dominate laminar resistance, but transmission pipelines often require turbulent and compressible-flow models instead. Control-room data can show pressure loss or rupture, but it does not replace physical knowledge of wall thickness and flaws. A cancelled inspection creates uncertainty that grows as exposure continues. A pipeline explanation should identify fluid state, pressure history, wall geometry, material behavior, environment, and the inspection method's detection limit.\n\nA transmission pipeline is a pressure boundary embedded in soil, weather, crossings, coatings, welds, and operating transients. Flow calculations explain service, while integrity engineering asks how the wall changes with time. Corrosion control combines coatings, cathodic protection, chemistry, drainage, patrols, and inspection. Inline tools, ultrasonic methods, pressure tests, and direct examination have different detection limits and should be chosen for expected threats. The integrity file must connect patrol observations, cathodic surveys, inline calls, dig measurements, pressure cycles, repairs, and cancelled inspections.\n\nCover competence means separating an external strike from progressive metal loss. Fractography, coating condition, corrosion products, SCADA chronology, and inspection history answer that question together. The integrity lesson is to connect defect geometry with pressure, material toughness, and growth rate. An average corrosion number cannot defend a deep pit or an interacting cluster. A defensible record preserves anomaly calls, dig findings, coating surveys, cathodic readings, pressure cycles, leaks, repairs, and schedule decisions. Trend continuity matters more than any polished annual summary.",
      "frame": "The Dispatcher follows the line on a map at The Right-of-Way & Rupture Site. \"Give me Jean Poiseuille, the governing relation, and the field check.\"",
      "q": [
        {
          "q": "Which pipeline-integrity account best captures Jean Poiseuille's contribution to viscous flow in pipes?",
          "o": [
            {
              "t": "Jean Poiseuille experimentally quantified steady laminar flow through capillary tubes. Flaw review keeps the integrity-audited anomaly history available for assessment.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Jean Poiseuille's pipeline work relies on average operating pressure and a regional corrosion rate. The control trend looks stable. Pipeline records fit this pipeline account.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Jean Poiseuille's pipeline work is read within pipeline practice as support for ordinary operating pressure as sufficient evidence that an uninspected pipe wall remains sound.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Jean Poiseuille's pipeline authority supports postponing an inline inspection until the control room shows a clear leak signal. Regional corrosion rates support it.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        },
        {
          "q": "Which integrity rule is supported by this pipeline contribution?",
          "o": [
            {
              "t": "Viscosity and diameter dominate laminar resistance, but transmission pipelines often require turbulent and compressible-flow models instead. The segment dossier carries the coating survey. Pipeline fits. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Use average pressure and corrosion rate while treating local flaw size, toughness, and transients as later refinements. The control trend looks stable. Pipeline timing supports this pipeline claim. Pipeline fits.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Assume friction, corrosion rate, and crack resistance remain stable across chemistry, roughness, temperature, and loading history. The control trend looks stable. Pipeline records fit this pipeline account. Pipeline fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Continue pressure service while postponing direct knowledge of the pipe wall and its growing anomalies. Regional corrosion rates support it. Pipeline practice makes the pipeline view plausible. The pipeline record fits.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        },
        {
          "q": "What should a pipeline operator learn from this history?",
          "o": [
            {
              "t": "A defensible record preserves anomaly calls, dig findings, coating surveys, cathodic readings, pressure cycles, leaks, repairs, and schedule decisions. Trend continuity matters more than any polished annual summary. Pipeline fits. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Treat inspection uncertainty as secondary after the line returns to normal flow and pressure. The line carried service beforehand. Regional corrosion rates support it. Pipeline practice makes the pipeline view plausible. The pipeline record fits.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Attribute the rupture mainly to a third-party strike or ground movement rather than progressive metal loss. Pipeline records fit this pipeline account. Pipeline context supports the view. Pipeline timing supports this pipeline claim. Pipeline fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Restore full pressure, postpone the inline inspection again, and treat the absence of another rupture as reassurance. The control trend looks stable. Pipeline records fit this pipeline account. Pipeline timing supports this pipeline claim.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        }
      ]
    },
    "pp_weisbach": {
      "sci": "Julius Weisbach (1806-1871)",
      "topic": "Pipe friction & head loss",
      "lede": "Julius Weisbach made pipe friction & head loss useful for reading pressure, flow, or damage along a pipeline.",
      "no": 4,
      "profile": "Today's pipeline-systems cover note examines Julius Weisbach through pipe friction & head loss. Julius Weisbach developed a general relation for head loss caused by friction in pipes and fittings. The Darcy-Weisbach equation separates geometry, velocity, length, diameter, and a friction factor. The result translated flow, corrosion, or fracture into evidence that could be compared with pressure data and the actual pipe wall.\n\nPressure loss is measurable evidence about the flow path, but interpreting it requires the correct friction factor and operating state. A transmission pipeline is a pressure boundary embedded in soil, weather, crossings, coatings, welds, and operating transients. Flow calculations explain service, while integrity engineering asks how the wall changes with time. A pipeline explanation should identify fluid state, pressure history, wall geometry, material behavior, environment, and the inspection method's detection limit.\n\nCorrosion control combines coatings, cathodic protection, chemistry, drainage, patrols, and inspection. Inline tools, ultrasonic methods, pressure tests, and direct examination have different detection limits and should be chosen for expected threats. Control-room data can show pressure loss or rupture, but it does not replace physical knowledge of wall thickness and flaws. A cancelled inspection creates uncertainty that grows as exposure continues. The integrity file must connect patrol observations, cathodic surveys, inline calls, dig measurements, pressure cycles, repairs, and cancelled inspections.\n\nThe integrity lesson is to connect defect geometry with pressure, material toughness, and growth rate. An average corrosion number cannot defend a deep pit or an interacting cluster. A defensible record preserves anomaly calls, dig findings, coating surveys, cathodic readings, pressure cycles, leaks, repairs, and schedule decisions. Trend continuity matters more than any polished annual summary. Cover competence means separating an external strike from progressive metal loss. Fractography, coating condition, corrosion products, SCADA chronology, and inspection history answer that question together.",
      "frame": "The Dispatcher taps the exposed pipe at The Right-of-Way & Rupture Site. \"Use Julius Weisbach to connect the pressure record with the metal in front of us.\"",
      "q": [
        {
          "q": "Which pipeline-integrity account best captures Julius Weisbach's contribution to pipe friction & head loss?",
          "o": [
            {
              "t": "Julius Weisbach developed a general relation for head loss caused by friction in pipes and fittings. Pipeline specialists compare the field-verified pressure trace with wall condition. Pipeline fits. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Julius Weisbach's pipeline work emphasizes average operating pressure and a regional corrosion rate. Regional corrosion rates support it. Pipeline practice makes the pipeline view plausible. The pipeline record fits.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Julius Weisbach's pipeline work supports ordinary operating pressure as sufficient evidence that an uninspected pipe wall remains sound. Pipeline practice makes the pipeline view plausible. The pipeline record fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Julius Weisbach's authority is invoked in pipeline practice to justify postponing an inline inspection until the control room shows a clear leak signal. Normal pressure appears reassuring. Pipeline fits. Pipeline fits.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        },
        {
          "q": "Which integrity rule is supported by this pipeline contribution?",
          "o": [
            {
              "t": "Pressure loss is measurable evidence about the flow path, but interpreting it requires the correct friction factor and operating state. The segment dossier carries the pressure trace. Pipeline context matters.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Use average pressure and corrosion rate while treating local flaw size, toughness, and transients as later refinements. The control trend looks stable. Pipeline records fit this pipeline account. Pipeline context matters.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Assume friction, corrosion rate, and crack resistance remain stable across chemistry, roughness, temperature, and loading history. The control trend looks stable. The pipeline practice fits. The pipeline record fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Continue pressure service while postponing direct knowledge of the pipe wall and its growing anomalies. Regional corrosion rates support it. Pipeline practice makes the pipeline view plausible. The pipeline record fits.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        },
        {
          "q": "What should a pipeline operator learn from this history?",
          "o": [
            {
              "t": "Cover competence means separating an external strike from progressive metal loss. Fractography, coating condition, corrosion products, SCADA chronology, and inspection history answer that question together. Pipeline context matters. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Treat inspection uncertainty as secondary after the line returns to normal flow and pressure. Regional corrosion rates support it. Pipeline practice makes the pipeline view plausible. Pipeline timing supports this pipeline claim. Pipeline context matters.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Attribute the rupture mainly to a third-party strike or ground movement rather than progressive metal loss. The control trend looks stable. Pipeline records fit this pipeline account. Pipeline timing supports this pipeline claim. Pipeline fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Restore full pressure, postpone the inline inspection again, and treat the absence of another rupture as reassurance. The control trend looks stable. Pipeline records fit this pipeline account. Pipeline timing supports this pipeline claim. Pipeline fits.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        }
      ]
    },
    "pp_moody": {
      "sci": "Lewis Ferry Moody (1880-1953)",
      "topic": "The Moody friction chart",
      "lede": "Through the Moody friction chart, Lewis Ferry Moody connected fluid service with the condition of the pipe wall.",
      "no": 5,
      "profile": "Today's pipeline-systems cover note examines Lewis Ferry Moody through the Moody friction chart. Lewis Ferry Moody assembled the famous chart relating friction factor to Reynolds number and relative roughness. It gave engineers a practical bridge between smooth, transitional, and fully rough turbulent pipe flow. The result translated flow, corrosion, or fracture into evidence that could be compared with pressure data and the actual pipe wall.\n\nRoughness changes both hydraulic performance and the clues available from operating data, so assumptions should be checked against pipe condition. Corrosion control combines coatings, cathodic protection, chemistry, drainage, patrols, and inspection. Inline tools, ultrasonic methods, pressure tests, and direct examination have different detection limits and should be chosen for expected threats. A pipeline explanation should identify fluid state, pressure history, wall geometry, material behavior, environment, and the inspection method's detection limit.\n\nControl-room data can show pressure loss or rupture, but it does not replace physical knowledge of wall thickness and flaws. A cancelled inspection creates uncertainty that grows as exposure continues. A transmission pipeline is a pressure boundary embedded in soil, weather, crossings, coatings, welds, and operating transients. Flow calculations explain service, while integrity engineering asks how the wall changes with time. The integrity file must connect patrol observations, cathodic surveys, inline calls, dig measurements, pressure cycles, repairs, and cancelled inspections.\n\nA defensible record preserves anomaly calls, dig findings, coating surveys, cathodic readings, pressure cycles, leaks, repairs, and schedule decisions. Trend continuity matters more than any polished annual summary. Cover competence means separating an external strike from progressive metal loss. Fractography, coating condition, corrosion products, SCADA chronology, and inspection history answer that question together. The integrity lesson is to connect defect geometry with pressure, material toughness, and growth rate. An average corrosion number cannot defend a deep pit or an interacting cluster.",
      "frame": "The Clerk opens an anomaly sheet at The Right-of-Way & Rupture Site. \"Explain the Moody friction chart, including what the inspection can miss.\"",
      "q": [
        {
          "q": "Which pipeline-integrity account best captures Lewis Ferry Moody's contribution to the Moody friction chart?",
          "o": [
            {
              "t": "Lewis Ferry Moody assembled the famous chart relating friction factor to Reynolds number and relative roughness. The line-integrity archive stores the raw inspection record.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Lewis Ferry Moody's pipeline work relies on average operating pressure and a regional corrosion rate. The control trend looks stable. Pipeline timing supports this pipeline claim.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Lewis Ferry Moody's pipeline work supports ordinary operating pressure as sufficient evidence that an uninspected pipe wall remains sound. The control trend looks stable.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Lewis Ferry Moody's pipeline authority supports postponing an inline inspection until the control room shows a clear leak signal. Pipeline practice makes the pipeline view plausible.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        },
        {
          "q": "Which integrity rule is supported by this pipeline contribution?",
          "o": [
            {
              "t": "Roughness changes both hydraulic performance and the clues available from operating data, so assumptions should be checked against pipe condition. The segment dossier carries the pressure trace. Pipeline fits. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Use average pressure and corrosion rate while treating local flaw size, toughness, and transients as later refinements. Regional corrosion rates support it. Pipeline timing supports this pipeline claim. Pipeline context matters.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Assume friction, corrosion rate, and crack resistance remain stable across chemistry, roughness, temperature, and loading history. The control trend looks stable. Pipeline timing supports this pipeline claim. Pipeline fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Continue pressure service while postponing direct knowledge of the pipe wall and its growing anomalies. The control trend looks stable. Pipeline records fit this pipeline account. Pipeline timing supports this pipeline claim.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        },
        {
          "q": "What should a pipeline operator learn from this history?",
          "o": [
            {
              "t": "The integrity lesson is to connect defect geometry with pressure, material toughness, and growth rate. An average corrosion number cannot defend a deep pit or an interacting cluster. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Treat inspection uncertainty as secondary after the line returns to normal flow and pressure. Regional corrosion rates support it. Pipeline practice makes the pipeline view plausible. The pipeline record fits.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Attribute the rupture mainly to a third-party strike or ground movement rather than progressive metal loss. Regional corrosion rates support it. Pipeline timing supports this pipeline claim. Pipeline fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Restore full pressure, postpone the inline inspection again, and treat the absence of another rupture as reassurance. The control trend looks stable. Regional corrosion rates support it. Pipeline fits.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        }
      ]
    },
    "pp_colebrook": {
      "sci": "Cyril F. Colebrook (pipe-flow engineer)",
      "topic": "Pipe roughness & friction",
      "lede": "Cyril F. Colebrook's work on pipe roughness & friction gave integrity engineers a measurable relation instead of guesswork.",
      "no": 6,
      "profile": "Today's pipeline-systems cover note examines Cyril F. Colebrook through pipe roughness & friction. Cyril Colebrook developed an implicit relation for turbulent pipe friction that combines Reynolds-number and roughness effects. The Colebrook-White equation underlies much of the Moody chart. The result translated flow, corrosion, or fracture into evidence that could be compared with pressure data and the actual pipe wall.\n\nA friction model should be solved with realistic roughness and fluid properties rather than treated as a universal constant. Control-room data can show pressure loss or rupture, but it does not replace physical knowledge of wall thickness and flaws. A cancelled inspection creates uncertainty that grows as exposure continues. A pipeline explanation should identify fluid state, pressure history, wall geometry, material behavior, environment, and the inspection method's detection limit.\n\nA transmission pipeline is a pressure boundary embedded in soil, weather, crossings, coatings, welds, and operating transients. Flow calculations explain service, while integrity engineering asks how the wall changes with time. Corrosion control combines coatings, cathodic protection, chemistry, drainage, patrols, and inspection. Inline tools, ultrasonic methods, pressure tests, and direct examination have different detection limits and should be chosen for expected threats. The integrity file must connect patrol observations, cathodic surveys, inline calls, dig measurements, pressure cycles, repairs, and cancelled inspections.\n\nCover competence means separating an external strike from progressive metal loss. Fractography, coating condition, corrosion products, SCADA chronology, and inspection history answer that question together. The integrity lesson is to connect defect geometry with pressure, material toughness, and growth rate. An average corrosion number cannot defend a deep pit or an interacting cluster. A defensible record preserves anomaly calls, dig findings, coating surveys, cathodic readings, pressure cycles, leaks, repairs, and schedule decisions. Trend continuity matters more than any polished annual summary.",
      "frame": "The Clerk follows the line on a map at The Right-of-Way & Rupture Site. \"Give me Cyril F. Colebrook, the governing relation, and the field check.\"",
      "q": [
        {
          "q": "Which pipeline-integrity account best captures Cyril F. Colebrook's contribution to pipe roughness & friction?",
          "o": [
            {
              "t": "Cyril Colebrook developed an implicit relation for turbulent pipe friction that combines Reynolds-number and roughness effects. The segment dossier carries the coating survey.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Cyril F. Colebrook's pipeline work emphasizes average operating pressure and a regional corrosion rate. The control trend looks stable. Pipeline timing supports this pipeline claim.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Cyril F. Colebrook's pipeline work supports ordinary operating pressure as sufficient evidence that an uninspected pipe wall remains sound. The control trend looks stable.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Cyril F. Colebrook's pipeline authority supports postponing an inline inspection until the control room shows a clear leak signal. Pipeline practice makes the pipeline view plausible.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        },
        {
          "q": "Which integrity rule is supported by this pipeline contribution?",
          "o": [
            {
              "t": "A friction model should be solved with realistic roughness and fluid properties rather than treated as a universal constant. The segment dossier carries the anomaly history. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Use average pressure and corrosion rate while treating local flaw size, toughness, and transients as later refinements. Pipeline practice makes the pipeline view plausible. The pipeline record fits.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Assume friction, corrosion rate, and crack resistance remain stable across chemistry, roughness, temperature, and loading history. Pipeline practice makes the pipeline view plausible. Pipeline fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Continue pressure service while postponing direct knowledge of the pipe wall and its growing anomalies. The control trend looks stable. Pipeline timing supports this pipeline claim. Pipeline fits.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        },
        {
          "q": "What should a pipeline operator learn from this history?",
          "o": [
            {
              "t": "A defensible record preserves anomaly calls, dig findings, coating surveys, cathodic readings, pressure cycles, leaks, repairs, and schedule decisions. Trend continuity matters more than any polished annual summary. Pipeline fits. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Treat inspection uncertainty as secondary after the line returns to normal flow and pressure. The line carried service beforehand. Regional corrosion rates support it. Pipeline practice makes the pipeline view plausible. The pipeline record fits.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Attribute the rupture mainly to a third-party strike or ground movement rather than progressive metal loss. Pipeline records fit this pipeline account. Pipeline context supports the view. Pipeline timing supports this pipeline claim. Pipeline fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Restore full pressure, postpone the inline inspection again, and treat the absence of another rupture as reassurance. The control trend looks stable. Pipeline records fit this pipeline account. Pipeline timing supports this pipeline claim.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        }
      ]
    },
    "pp_joukowsky": {
      "sci": "Nikolai Joukowsky (1847-1921)",
      "topic": "Water hammer & pressure surge",
      "lede": "Nikolai Joukowsky made water hammer & pressure surge useful for reading pressure, flow, or damage along a pipeline.",
      "no": 7,
      "profile": "Today's pipeline-systems cover note examines Nikolai Joukowsky through water hammer & pressure surge. Nikolai Joukowsky derived the relation between a sudden velocity change and the pressure surge known as water hammer. Rapid valve movement or pump trips can send a pressure wave through a pipeline. The result translated flow, corrosion, or fracture into evidence that could be compared with pressure data and the actual pipe wall.\n\nTransient pressure can exceed normal operating pressure even when the steady-state system appears safe. A transmission pipeline is a pressure boundary embedded in soil, weather, crossings, coatings, welds, and operating transients. Flow calculations explain service, while integrity engineering asks how the wall changes with time. A pipeline explanation should identify fluid state, pressure history, wall geometry, material behavior, environment, and the inspection method's detection limit.\n\nCorrosion control combines coatings, cathodic protection, chemistry, drainage, patrols, and inspection. Inline tools, ultrasonic methods, pressure tests, and direct examination have different detection limits and should be chosen for expected threats. Control-room data can show pressure loss or rupture, but it does not replace physical knowledge of wall thickness and flaws. A cancelled inspection creates uncertainty that grows as exposure continues. The integrity file must connect patrol observations, cathodic surveys, inline calls, dig measurements, pressure cycles, repairs, and cancelled inspections.\n\nThe integrity lesson is to connect defect geometry with pressure, material toughness, and growth rate. An average corrosion number cannot defend a deep pit or an interacting cluster. A defensible record preserves anomaly calls, dig findings, coating surveys, cathodic readings, pressure cycles, leaks, repairs, and schedule decisions. Trend continuity matters more than any polished annual summary. Cover competence means separating an external strike from progressive metal loss. Fractography, coating condition, corrosion products, SCADA chronology, and inspection history answer that question together.",
      "frame": "Line-Walker Dumas taps the exposed pipe at The Gas Control Center. \"Use Nikolai Joukowsky to connect the pressure record with the metal in front of us.\"",
      "q": [
        {
          "q": "Which pipeline-integrity account best captures Nikolai Joukowsky's contribution to water hammer & pressure surge?",
          "o": [
            {
              "t": "Nikolai Joukowsky derived the relation between a sudden velocity change and the pressure surge known as water hammer. The line-integrity archive stores the integrity-audited anomaly history. Pipeline fits. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Nikolai Joukowsky's pipeline work emphasizes average operating pressure and a regional corrosion rate. Regional corrosion rates support it. Pipeline practice makes the pipeline view plausible. The pipeline record fits.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Nikolai Joukowsky's pipeline work is read within pipeline practice as support for ordinary operating pressure as sufficient evidence that an uninspected pipe wall remains sound. The control trend looks stable. Pipeline fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Nikolai Joukowsky's authority is invoked in pipeline practice to justify postponing an inline inspection until the control room shows a clear leak signal. The control trend looks stable. Pipeline fits. Pipeline fits.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        },
        {
          "q": "Which integrity rule is supported by this pipeline contribution?",
          "o": [
            {
              "t": "Transient pressure can exceed normal operating pressure even when the steady-state system appears safe. The line-integrity archive stores the growth-adjusted coating survey. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Use average pressure and corrosion rate while treating local flaw size, toughness, and transients as later refinements. Pipeline practice makes the pipeline view plausible. The pipeline record fits.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Assume friction, corrosion rate, and crack resistance remain stable across chemistry, roughness, temperature, and loading history. Pipeline practice makes the pipeline view plausible. Pipeline fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Continue pressure service while postponing direct knowledge of the pipe wall and its growing anomalies. The control trend looks stable. Pipeline timing supports this pipeline claim. Pipeline fits.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        },
        {
          "q": "What should a pipeline operator learn from this history?",
          "o": [
            {
              "t": "Cover competence means separating an external strike from progressive metal loss. Fractography, coating condition, corrosion products, SCADA chronology, and inspection history answer that question together. Pipeline context matters. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Treat inspection uncertainty as secondary after the line returns to normal flow and pressure. Regional corrosion rates support it. Pipeline practice makes the pipeline view plausible. Pipeline timing supports this pipeline claim. Pipeline context matters.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Attribute the rupture mainly to a third-party strike or ground movement rather than progressive metal loss. The control trend looks stable. Pipeline records fit this pipeline account. Pipeline timing supports this pipeline claim. Pipeline fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Restore full pressure, postpone the inline inspection again, and treat the absence of another rupture as reassurance. The control trend looks stable. Pipeline records fit this pipeline account. Pipeline timing supports this pipeline claim. Pipeline fits.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        }
      ]
    },
    "pp_vdwaals": {
      "sci": "Johannes van der Waals (1837-1923)",
      "topic": "Real gases at high pressure",
      "lede": "Through real gases at high pressure, Johannes van der Waals connected fluid service with the condition of the pipe wall.",
      "no": 8,
      "profile": "Today's pipeline-systems cover note examines Johannes van der Waals through real gases at high pressure. Johannes van der Waals introduced an equation of state that accounts for molecular size and attraction, improving on the ideal-gas law. High-pressure gases can deviate significantly from ideal behavior. The result translated flow, corrosion, or fracture into evidence that could be compared with pressure data and the actual pipe wall.\n\nInventory and pressure calculations require a real-gas model when compression makes ideal assumptions inaccurate. Corrosion control combines coatings, cathodic protection, chemistry, drainage, patrols, and inspection. Inline tools, ultrasonic methods, pressure tests, and direct examination have different detection limits and should be chosen for expected threats. A pipeline explanation should identify fluid state, pressure history, wall geometry, material behavior, environment, and the inspection method's detection limit.\n\nControl-room data can show pressure loss or rupture, but it does not replace physical knowledge of wall thickness and flaws. A cancelled inspection creates uncertainty that grows as exposure continues. A transmission pipeline is a pressure boundary embedded in soil, weather, crossings, coatings, welds, and operating transients. Flow calculations explain service, while integrity engineering asks how the wall changes with time. The integrity file must connect patrol observations, cathodic surveys, inline calls, dig measurements, pressure cycles, repairs, and cancelled inspections.\n\nA defensible record preserves anomaly calls, dig findings, coating surveys, cathodic readings, pressure cycles, leaks, repairs, and schedule decisions. Trend continuity matters more than any polished annual summary. Cover competence means separating an external strike from progressive metal loss. Fractography, coating condition, corrosion products, SCADA chronology, and inspection history answer that question together. The integrity lesson is to connect defect geometry with pressure, material toughness, and growth rate. An average corrosion number cannot defend a deep pit or an interacting cluster.",
      "frame": "Line-Walker Dumas opens an anomaly sheet at The Gas Control Center. \"Explain real gases at high pressure, including what the inspection can miss.\"",
      "q": [
        {
          "q": "Which pipeline-integrity account best captures Johannes van der Waals's contribution to real gases at high pressure?",
          "o": [
            {
              "t": "Johannes van der Waals introduced an equation of state that accounts for molecular size and attraction, improving on the ideal-gas law. The segment dossier carries the pressure trace.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Johannes van der Waals's pipeline work emphasizes average operating pressure and a regional corrosion rate. Pipeline context supports the view. Pipeline timing supports this pipeline claim.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Johannes van der Waals's pipeline work supports ordinary operating pressure as sufficient evidence that an uninspected pipe wall remains sound. Pipeline timing supports this pipeline claim.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Johannes van der Waals's pipeline authority supports postponing an inline inspection until the control room shows a clear leak signal. Pipeline practice makes the pipeline view plausible.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        },
        {
          "q": "Which integrity rule is supported by this pipeline contribution?",
          "o": [
            {
              "t": "Inventory and pressure calculations require a real-gas model when compression makes ideal assumptions inaccurate. Pressure-boundary evidence ties the anomaly history to service history. Pipeline fits. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Use average pressure and corrosion rate while treating local flaw size, toughness, and transients as later refinements. The control trend looks stable. Pipeline records fit this pipeline account. Pipeline fits.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Assume friction, corrosion rate, and crack resistance remain stable across chemistry, roughness, temperature, and loading history. The control trend looks stable. Pipeline records fit this pipeline account. Pipeline fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Continue pressure service while postponing direct knowledge of the pipe wall and its growing anomalies. Regional corrosion rates support it. Pipeline practice makes the pipeline view plausible. The pipeline record fits.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        },
        {
          "q": "What should a pipeline operator learn from this history?",
          "o": [
            {
              "t": "The integrity lesson is to connect defect geometry with pressure, material toughness, and growth rate. An average corrosion number cannot defend a deep pit or an interacting cluster. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Treat inspection uncertainty as secondary after the line returns to normal flow and pressure. Regional corrosion rates support it. Pipeline practice makes the pipeline view plausible. The pipeline record fits.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Attribute the rupture mainly to a third-party strike or ground movement rather than progressive metal loss. Regional corrosion rates support it. Pipeline timing supports this pipeline claim. Pipeline fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Restore full pressure, postpone the inline inspection again, and treat the absence of another rupture as reassurance. The control trend looks stable. Regional corrosion rates support it. Pipeline fits.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        }
      ]
    },
    "pp_graham": {
      "sci": "Thomas Graham (1805-1869)",
      "topic": "Gas diffusion & leakage",
      "lede": "Thomas Graham's work on gas diffusion & leakage gave integrity engineers a measurable relation instead of guesswork.",
      "no": 9,
      "profile": "Today's pipeline-systems cover note examines Thomas Graham through gas diffusion & leakage. Thomas Graham measured the diffusion and effusion of gases, finding rates inversely related to the square root of molecular mass. His work clarified how gases spread through openings and mix. The result translated flow, corrosion, or fracture into evidence that could be compared with pressure data and the actual pipe wall.\n\nA small leak can migrate away from the pipe, so detection depends on soil, wind, gas properties, pressure, and sensor placement. Control-room data can show pressure loss or rupture, but it does not replace physical knowledge of wall thickness and flaws. A cancelled inspection creates uncertainty that grows as exposure continues. A pipeline explanation should identify fluid state, pressure history, wall geometry, material behavior, environment, and the inspection method's detection limit.\n\nA transmission pipeline is a pressure boundary embedded in soil, weather, crossings, coatings, welds, and operating transients. Flow calculations explain service, while integrity engineering asks how the wall changes with time. Corrosion control combines coatings, cathodic protection, chemistry, drainage, patrols, and inspection. Inline tools, ultrasonic methods, pressure tests, and direct examination have different detection limits and should be chosen for expected threats. The integrity file must connect patrol observations, cathodic surveys, inline calls, dig measurements, pressure cycles, repairs, and cancelled inspections.\n\nCover competence means separating an external strike from progressive metal loss. Fractography, coating condition, corrosion products, SCADA chronology, and inspection history answer that question together. The integrity lesson is to connect defect geometry with pressure, material toughness, and growth rate. An average corrosion number cannot defend a deep pit or an interacting cluster. A defensible record preserves anomaly calls, dig findings, coating surveys, cathodic readings, pressure cycles, leaks, repairs, and schedule decisions. Trend continuity matters more than any polished annual summary.",
      "frame": "The Dispatcher follows the line on a map at The Gas Control Center. \"Give me Thomas Graham, the governing relation, and the field check.\"",
      "q": [
        {
          "q": "Which pipeline-integrity account best captures Thomas Graham's contribution to gas diffusion & leakage?",
          "o": [
            {
              "t": "Thomas Graham measured the diffusion and effusion of gases, finding rates inversely related to the square root of molecular mass. The segment dossier carries the coating survey.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Thomas Graham's pipeline work emphasizes average operating pressure and a regional corrosion rate. Regional corrosion rates support it. Pipeline practice makes the pipeline view plausible.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Thomas Graham's pipeline work supports ordinary operating pressure as sufficient evidence that an uninspected pipe wall remains sound. Pipeline practice makes the pipeline view plausible.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Thomas Graham's authority is invoked in pipeline practice to justify postponing an inline inspection until the control room shows a clear leak signal. The control trend looks stable.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        },
        {
          "q": "Which integrity rule is supported by this pipeline contribution?",
          "o": [
            {
              "t": "A small leak can migrate away from the pipe, so detection depends on soil, wind, gas properties, pressure, and sensor placement. The segment dossier carries the pressure trace. Pipeline fits. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Use average pressure and corrosion rate while treating local flaw size, toughness, and transients as later refinements. The control trend looks stable. Pipeline records fit this pipeline account. Pipeline fits.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Assume friction, corrosion rate, and crack resistance remain stable across chemistry, roughness, temperature, and loading history. Pipeline practice makes the pipeline view plausible. The pipeline record fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Continue pressure service while postponing direct knowledge of the pipe wall and its growing anomalies. Regional corrosion rates support it. Pipeline records fit this pipeline account. Pipeline fits.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        },
        {
          "q": "What should a pipeline operator learn from this history?",
          "o": [
            {
              "t": "A defensible record preserves anomaly calls, dig findings, coating surveys, cathodic readings, pressure cycles, leaks, repairs, and schedule decisions. Trend continuity matters more than any polished annual summary. Pipeline fits. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Treat inspection uncertainty as secondary after the line returns to normal flow and pressure. The line carried service beforehand. Regional corrosion rates support it. Pipeline practice makes the pipeline view plausible. The pipeline record fits.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Attribute the rupture mainly to a third-party strike or ground movement rather than progressive metal loss. Pipeline records fit this pipeline account. Pipeline context supports the view. Pipeline timing supports this pipeline claim. Pipeline fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Restore full pressure, postpone the inline inspection again, and treat the absence of another rupture as reassurance. The control trend looks stable. Pipeline records fit this pipeline account. Pipeline timing supports this pipeline claim.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        }
      ]
    },
    "pp_wagner": {
      "sci": "Carl Wagner (1901-1977)",
      "topic": "Oxidation & corrosion theory",
      "lede": "Carl Wagner made oxidation & corrosion theory useful for reading pressure, flow, or damage along a pipeline.",
      "no": 10,
      "profile": "Today's pipeline-systems cover note examines Carl Wagner through oxidation & corrosion theory. Carl Wagner developed electrochemical theories of oxidation and corrosion, explaining how ions and electrons move through growing films. His work connected reaction kinetics with protective or nonprotective scales. The result translated flow, corrosion, or fracture into evidence that could be compared with pressure data and the actual pipe wall.\n\nCorrosion rate depends on the electrochemical path, environment, coating condition, and whether deposits form a barrier or a trap. A transmission pipeline is a pressure boundary embedded in soil, weather, crossings, coatings, welds, and operating transients. Flow calculations explain service, while integrity engineering asks how the wall changes with time. A pipeline explanation should identify fluid state, pressure history, wall geometry, material behavior, environment, and the inspection method's detection limit.\n\nCorrosion control combines coatings, cathodic protection, chemistry, drainage, patrols, and inspection. Inline tools, ultrasonic methods, pressure tests, and direct examination have different detection limits and should be chosen for expected threats. Control-room data can show pressure loss or rupture, but it does not replace physical knowledge of wall thickness and flaws. A cancelled inspection creates uncertainty that grows as exposure continues. The integrity file must connect patrol observations, cathodic surveys, inline calls, dig measurements, pressure cycles, repairs, and cancelled inspections.\n\nThe integrity lesson is to connect defect geometry with pressure, material toughness, and growth rate. An average corrosion number cannot defend a deep pit or an interacting cluster. A defensible record preserves anomaly calls, dig findings, coating surveys, cathodic readings, pressure cycles, leaks, repairs, and schedule decisions. Trend continuity matters more than any polished annual summary. Cover competence means separating an external strike from progressive metal loss. Fractography, coating condition, corrosion products, SCADA chronology, and inspection history answer that question together.",
      "frame": "The Dispatcher taps the exposed pipe at The Gas Control Center. \"Use Carl Wagner to connect the pressure record with the metal in front of us.\"",
      "q": [
        {
          "q": "Which pipeline-integrity account best captures Carl Wagner's contribution to oxidation & corrosion theory?",
          "o": [
            {
              "t": "Carl Wagner developed electrochemical theories of oxidation and corrosion, explaining how ions and electrons move through growing films. Pipeline specialists compare the line-specific coating survey with wall condition.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Carl Wagner's treatment of oxidation & corrosion theory uses a pipeline simplification: average operating pressure and a regional corrosion rate, with local flaw geometry and toughness treated as later detail. Pipeline fits.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Carl Wagner's pipeline work supports ordinary operating pressure as sufficient evidence that an uninspected pipe wall remains sound. Regional corrosion rates support it. Pipeline practice makes the pipeline view plausible.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Carl Wagner's authority is invoked in pipeline practice to justify postponing an inline inspection until the control room shows a clear leak signal. The control trend looks stable. Pipeline timing supports this pipeline claim.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        },
        {
          "q": "Which integrity rule is supported by this pipeline contribution?",
          "o": [
            {
              "t": "Corrosion rate depends on the electrochemical path, environment, coating condition, and whether deposits form a barrier or a trap. The segment dossier carries the coating survey. Pipeline fits. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Use average pressure and corrosion rate while treating local flaw size, toughness, and transients as later refinements. The control trend looks stable. Pipeline records fit this pipeline account. Pipeline fits.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Assume friction, corrosion rate, and crack resistance remain stable across chemistry, roughness, temperature, and loading history. Pipeline practice makes the pipeline view plausible. The pipeline record fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Continue pressure service while postponing direct knowledge of the pipe wall and its growing anomalies. Regional corrosion rates support it. Pipeline timing supports this pipeline claim. Pipeline fits.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        },
        {
          "q": "What should a pipeline operator learn from this history?",
          "o": [
            {
              "t": "Cover competence means separating an external strike from progressive metal loss. Fractography, coating condition, corrosion products, SCADA chronology, and inspection history answer that question together. Pipeline context matters. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Treat inspection uncertainty as secondary after the line returns to normal flow and pressure. Regional corrosion rates support it. Pipeline practice makes the pipeline view plausible. Pipeline timing supports this pipeline claim. Pipeline context matters.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Attribute the rupture mainly to a third-party strike or ground movement rather than progressive metal loss. The control trend looks stable. Pipeline records fit this pipeline account. Pipeline timing supports this pipeline claim. Pipeline fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Restore full pressure, postpone the inline inspection again, and treat the absence of another rupture as reassurance. The control trend looks stable. Pipeline records fit this pipeline account. Pipeline timing supports this pipeline claim. Pipeline fits.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        }
      ]
    },
    "pp_fontana": {
      "sci": "Mars G. Fontana (1910-1988)",
      "topic": "Corrosion engineering",
      "lede": "Through corrosion engineering, Mars G. Fontana connected fluid service with the condition of the pipe wall.",
      "no": 11,
      "profile": "Today's pipeline-systems cover note examines Mars G. Fontana through corrosion engineering. Mars G. Fontana helped establish corrosion engineering as a practical discipline and catalogued mechanisms such as galvanic attack, pitting, stress-corrosion cracking, and erosion-corrosion. He emphasized identifying the form of attack before selecting control. The result translated flow, corrosion, or fracture into evidence that could be compared with pressure data and the actual pipe wall.\n\nAverage wall loss can miss a deep local pit, so inspection must match the expected damage mechanism. Corrosion control combines coatings, cathodic protection, chemistry, drainage, patrols, and inspection. Inline tools, ultrasonic methods, pressure tests, and direct examination have different detection limits and should be chosen for expected threats. A pipeline explanation should identify fluid state, pressure history, wall geometry, material behavior, environment, and the inspection method's detection limit.\n\nControl-room data can show pressure loss or rupture, but it does not replace physical knowledge of wall thickness and flaws. A cancelled inspection creates uncertainty that grows as exposure continues. A transmission pipeline is a pressure boundary embedded in soil, weather, crossings, coatings, welds, and operating transients. Flow calculations explain service, while integrity engineering asks how the wall changes with time. The integrity file must connect patrol observations, cathodic surveys, inline calls, dig measurements, pressure cycles, repairs, and cancelled inspections.\n\nFontana's corrosion taxonomy teaches investigators to separate location, morphology, and environment. Microbiologically influenced corrosion generally develops on a wetted internal surface where biofilms, deposits, and local chemistry sustain pits; cultures and corrosion products can support that diagnosis. Broad loss beginning on the outside, aligned with a coating defect, is a different mechanism. Calling every pit “microbial” ignores the side of origin and the electrochemical conditions that shaped it.",
      "frame": "The Clerk opens an anomaly sheet at The Gas Control Center. \"Explain corrosion engineering, including what the inspection can miss.\"",
      "q": [
        {
          "q": "Which pipeline-integrity account best captures Mars G. Fontana's contribution to corrosion engineering?",
          "o": [
            {
              "t": "Mars G. The segment dossier carries the anomaly history. The segment dossier carries the raw anomaly history. The line-integrity archive stores the raw anomaly history.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Mars G. Fontana's pipeline work relies on average operating pressure and a regional corrosion rate. The control trend looks stable. Pipeline records fit this pipeline account.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Mars G. Fontana's pipeline work is read within pipeline practice as support for ordinary operating pressure as sufficient evidence that an uninspected pipe wall remains sound.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Mars G. Fontana's pipeline authority supports postponing an inline inspection until the control room shows a clear leak signal. Regional corrosion rates support it.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        },
        {
          "q": "Which integrity rule is supported by this pipeline contribution?",
          "o": [
            {
              "t": "Average wall loss can miss a deep local pit, so inspection must match the expected damage mechanism. Pressure-boundary evidence ties the line-specific coating survey to service history. Pipeline fits. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Use average pressure and corrosion rate while treating local flaw size, toughness, and transients as later refinements. The control trend looks stable. Pipeline records fit this pipeline account. Pipeline fits.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Assume friction, corrosion rate, and crack resistance remain stable across chemistry, roughness, temperature, and loading history. The control trend looks stable. Pipeline records fit this pipeline account. Pipeline fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Continue pressure service while postponing direct knowledge of the pipe wall and its growing anomalies. Regional corrosion rates support it. Pipeline practice makes the pipeline view plausible. The pipeline record fits.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        },
        {
          "q": "What should a pipeline operator learn from this history?",
          "o": [
            {
              "t": "The integrity lesson is to connect defect geometry with pressure, material toughness, and growth rate. An average corrosion number cannot defend a deep pit or an interacting cluster. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Treat inspection uncertainty as secondary after the line returns to normal flow and pressure. Regional corrosion rates support it. Pipeline practice makes the pipeline view plausible. The pipeline record fits.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Attribute the rupture mainly to a third-party strike or ground movement rather than progressive metal loss. Regional corrosion rates support it. Pipeline timing supports this pipeline claim. Pipeline fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Restore full pressure, postpone the inline inspection again, and treat the absence of another rupture as reassurance. The control trend looks stable. Regional corrosion rates support it. Pipeline fits.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        }
      ]
    },
    "pp_hackerman": {
      "sci": "Norman Hackerman (1912-2007)",
      "topic": "Corrosion inhibition & surfaces",
      "lede": "Norman Hackerman's work on corrosion inhibition & surfaces gave integrity engineers a measurable relation instead of guesswork.",
      "no": 12,
      "profile": "Today's pipeline-systems cover note examines Norman Hackerman through corrosion inhibition & surfaces. Norman Hackerman studied metal surfaces, adsorption, and corrosion inhibitors. His work showed that small amounts of a chemical can reduce corrosion by changing reactions at the metal-electrolyte interface. The result translated flow, corrosion, or fracture into evidence that could be compared with pressure data and the actual pipe wall.\n\nAn inhibitor program works only when concentration, flow, water chemistry, coverage, and verification remain controlled. Control-room data can show pressure loss or rupture, but it does not replace physical knowledge of wall thickness and flaws. A cancelled inspection creates uncertainty that grows as exposure continues. A pipeline explanation should identify fluid state, pressure history, wall geometry, material behavior, environment, and the inspection method's detection limit.\n\nA transmission pipeline is a pressure boundary embedded in soil, weather, crossings, coatings, welds, and operating transients. Flow calculations explain service, while integrity engineering asks how the wall changes with time. Corrosion control combines coatings, cathodic protection, chemistry, drainage, patrols, and inspection. Inline tools, ultrasonic methods, pressure tests, and direct examination have different detection limits and should be chosen for expected threats. The integrity file must connect patrol observations, cathodic surveys, inline calls, dig measurements, pressure cycles, repairs, and cancelled inspections.\n\nCover competence means separating an external strike from progressive metal loss. Fractography, coating condition, corrosion products, SCADA chronology, and inspection history answer that question together. The integrity lesson is to connect defect geometry with pressure, material toughness, and growth rate. An average corrosion number cannot defend a deep pit or an interacting cluster. A defensible record preserves anomaly calls, dig findings, coating surveys, cathodic readings, pressure cycles, leaks, repairs, and schedule decisions. Trend continuity matters more than any polished annual summary.",
      "frame": "The Clerk follows the line on a map at The Gas Control Center. \"Give me Norman Hackerman, the governing relation, and the field check.\"",
      "q": [
        {
          "q": "Which pipeline-integrity account best captures Norman Hackerman's contribution to corrosion inhibition & surfaces?",
          "o": [
            {
              "t": "Norman Hackerman studied metal surfaces, adsorption, and corrosion inhibitors. Pressure-boundary evidence ties the line-specific growth-adjusted pressure trace to service history. Pipeline fits. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Norman Hackerman's pipeline work emphasizes average operating pressure and a regional corrosion rate. Pipeline practice makes the pipeline view plausible. Pipeline timing supports this pipeline claim.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Norman Hackerman's pipeline work supports ordinary operating pressure as sufficient evidence that an uninspected pipe wall remains sound. Pipeline practice makes the pipeline view plausible. Pipeline fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Norman Hackerman's pipeline authority supports postponing an inline inspection until the control room shows a clear leak signal. Pipeline practice makes the pipeline view plausible. The pipeline record fits.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        },
        {
          "q": "Which integrity rule is supported by this pipeline contribution?",
          "o": [
            {
              "t": "An inhibitor program works only when concentration, flow, water chemistry, coverage, and verification remain controlled. The segment dossier carries the raw anomaly history. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Use average pressure and corrosion rate while treating local flaw size, toughness, and transients as later refinements. Pipeline practice makes the pipeline view plausible. The pipeline record fits.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Assume friction, corrosion rate, and crack resistance remain stable across chemistry, roughness, temperature, and loading history. Pipeline practice makes the pipeline view plausible. Pipeline fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Continue pressure service while postponing direct knowledge of the pipe wall and its growing anomalies. The control trend looks stable. Pipeline timing supports this pipeline claim. Pipeline fits.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        },
        {
          "q": "What should a pipeline operator learn from this history?",
          "o": [
            {
              "t": "A defensible record preserves anomaly calls, dig findings, coating surveys, cathodic readings, pressure cycles, leaks, repairs, and schedule decisions. Trend continuity matters more than any polished annual summary. Pipeline fits. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Treat inspection uncertainty as secondary after the line returns to normal flow and pressure. The line carried service beforehand. Regional corrosion rates support it. Pipeline practice makes the pipeline view plausible. The pipeline record fits.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Attribute the rupture mainly to a third-party strike or ground movement rather than progressive metal loss. Pipeline records fit this pipeline account. Pipeline context supports the view. Pipeline timing supports this pipeline claim. Pipeline fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Restore full pressure, postpone the inline inspection again, and treat the absence of another rupture as reassurance. The control trend looks stable. Pipeline records fit this pipeline account. Pipeline timing supports this pipeline claim.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        }
      ]
    },
    "pp_kuhn": {
      "sci": "Robert J. Kuhn (cathodic-protection engineer)",
      "topic": "Pipeline cathodic protection",
      "lede": "Robert J. Kuhn made pipeline cathodic protection useful for reading pressure, flow, or damage along a pipeline.",
      "no": 13,
      "profile": "Today's pipeline-systems cover note examines Robert J. Kuhn through pipeline cathodic protection. Robert J. Kuhn pioneered practical cathodic protection for buried pipelines, demonstrating that impressed current could shift steel to a potential where corrosion is suppressed. The method became a standard defense for coated pipe. The result translated flow, corrosion, or fracture into evidence that could be compared with pressure data and the actual pipe wall.\n\nCathodic protection must be surveyed because shielding, coating damage, electrical interference, or poor continuity can leave local steel unprotected. A transmission pipeline is a pressure boundary embedded in soil, weather, crossings, coatings, welds, and operating transients. Flow calculations explain service, while integrity engineering asks how the wall changes with time. A pipeline explanation should identify fluid state, pressure history, wall geometry, material behavior, environment, and the inspection method's detection limit.\n\nCorrosion control combines coatings, cathodic protection, chemistry, drainage, patrols, and inspection. Inline tools, ultrasonic methods, pressure tests, and direct examination have different detection limits and should be chosen for expected threats. Control-room data can show pressure loss or rupture, but it does not replace physical knowledge of wall thickness and flaws. A cancelled inspection creates uncertainty that grows as exposure continues. The integrity file must connect patrol observations, cathodic surveys, inline calls, dig measurements, pressure cycles, repairs, and cancelled inspections.\n\nKuhn's cathodic-protection work supplies the external-corrosion discriminator. Buried steel is protected by coating plus controlled electrical potential; a coating holiday exposes a small area, and inadequate protection allows current to leave the metal and wall loss to concentrate there. Close-interval potential surveys, coating inspection, and external pit geometry can connect the defect to that path. Internal deposits or pressure surges do not substitute for this electrochemical evidence.",
      "frame": "Line-Walker Dumas taps the exposed pipe at The Operator's Integrity Office. \"Use Robert J. Kuhn to connect the pressure record with the metal in front of us.\"",
      "q": [
        {
          "q": "Which pipeline-integrity account best captures Robert J. Kuhn's contribution to pipeline cathodic protection?",
          "o": [
            {
              "t": "Robert J. The line-integrity archive stores the inspection record. The segment dossier carries the raw inspection record. The segment dossier carries the line-specific inspection record. Pipeline fits. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Robert J. Kuhn's pipeline work emphasizes average operating pressure and a regional corrosion rate. Regional corrosion rates support it. Pipeline practice makes the pipeline view plausible. The pipeline record fits.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Robert J. Kuhn's pipeline work supports ordinary operating pressure as sufficient evidence that an uninspected pipe wall remains sound. Pipeline practice makes the pipeline view plausible. The pipeline record fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Robert J. Kuhn's authority is invoked in pipeline practice to justify postponing an inline inspection until the control room shows a clear leak signal. The control trend looks stable. Pipeline fits. Pipeline fits.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        },
        {
          "q": "Which integrity rule is supported by this pipeline contribution?",
          "o": [
            {
              "t": "Cathodic protection must be surveyed because shielding, coating damage, electrical interference, or poor continuity can leave local steel unprotected. The segment dossier carries the pressure trace. Pipeline fits. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Use average pressure and corrosion rate while treating local flaw size, toughness, and transients as later refinements. Regional corrosion rates support it. Pipeline practice makes the pipeline view plausible. Pipeline fits.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Assume friction, corrosion rate, and crack resistance remain stable across chemistry, roughness, temperature, and loading history. Pipeline context supports the view. Pipeline timing supports this pipeline claim. Pipeline fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Continue pressure service while postponing direct knowledge of the pipe wall and its growing anomalies. The control trend looks stable. Pipeline records fit this pipeline account. Pipeline timing supports this pipeline claim.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        },
        {
          "q": "What should a pipeline operator learn from this history?",
          "o": [
            {
              "t": "Cover competence means separating an external strike from progressive metal loss. Fractography, coating condition, corrosion products, SCADA chronology, and inspection history answer that question together. Pipeline context matters. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Treat inspection uncertainty as secondary after the line returns to normal flow and pressure. Regional corrosion rates support it. Pipeline practice makes the pipeline view plausible. Pipeline timing supports this pipeline claim. Pipeline context matters.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Attribute the rupture mainly to a third-party strike or ground movement rather than progressive metal loss. The control trend looks stable. Pipeline records fit this pipeline account. Pipeline timing supports this pipeline claim. Pipeline fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Restore full pressure, postpone the inline inspection again, and treat the absence of another rupture as reassurance. The control trend looks stable. Pipeline records fit this pipeline account. Pipeline timing supports this pipeline claim. Pipeline fits.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        }
      ]
    },
    "pp_inglis": {
      "sci": "Charles Inglis (1875-1952)",
      "topic": "Stress concentration at flaws",
      "lede": "Through stress concentration at flaws, Charles Inglis connected fluid service with the condition of the pipe wall.",
      "no": 14,
      "profile": "Today's pipeline-systems cover note examines Charles Inglis through stress concentration at flaws. Charles Inglis calculated how an elliptical hole or crack concentrates stress, showing that sharp flaws can amplify local stress far above the nominal value. His result explained why seemingly modest pressure can threaten damaged pipe. The result translated flow, corrosion, or fracture into evidence that could be compared with pressure data and the actual pipe wall.\n\nGeometry controls local stress; depth, length, tip sharpness, and orientation matter more than average wall thickness alone. Corrosion control combines coatings, cathodic protection, chemistry, drainage, patrols, and inspection. Inline tools, ultrasonic methods, pressure tests, and direct examination have different detection limits and should be chosen for expected threats. A pipeline explanation should identify fluid state, pressure history, wall geometry, material behavior, environment, and the inspection method's detection limit.\n\nControl-room data can show pressure loss or rupture, but it does not replace physical knowledge of wall thickness and flaws. A cancelled inspection creates uncertainty that grows as exposure continues. A transmission pipeline is a pressure boundary embedded in soil, weather, crossings, coatings, welds, and operating transients. Flow calculations explain service, while integrity engineering asks how the wall changes with time. The integrity file must connect patrol observations, cathodic surveys, inline calls, dig measurements, pressure cycles, repairs, and cancelled inspections.\n\nInglis showed why a sharp flaw concentrates stress, a foundation for understanding stress-corrosion cracking. SCC is identified not by broad rusting but by colonies of fine cracks that grow under tensile stress in a susceptible material and environment; fracture surfaces reveal branching and linked crack fronts. If sectioning finds substantial wall thinning without such a crack colony, SCC is an attractive but poorly matched explanation.",
      "frame": "Line-Walker Dumas opens an anomaly sheet at The Operator's Integrity Office. \"Explain stress concentration at flaws, including what the inspection can miss.\"",
      "q": [
        {
          "q": "Which pipeline-integrity account best captures Charles Inglis's contribution to stress concentration at flaws?",
          "o": [
            {
              "t": "Charles Inglis calculated how an elliptical hole or crack concentrates stress, showing that sharp flaws can amplify local stress far above the nominal value. The line-integrity archive stores the coating survey. Pipeline fits. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Charles Inglis's pipeline work emphasizes average operating pressure and a regional corrosion rate. Pipeline records fit this pipeline account. Pipeline practice makes the pipeline view plausible. Pipeline timing supports this pipeline claim.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Charles Inglis's pipeline work supports ordinary operating pressure as sufficient evidence that an uninspected pipe wall remains sound. Pipeline context supports the view. Pipeline timing supports this pipeline claim. Pipeline fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Charles Inglis's pipeline authority supports postponing an inline inspection until the control room shows a clear leak signal. Regional corrosion rates support it. Pipeline practice makes the pipeline view plausible. Pipeline fits.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        },
        {
          "q": "Which integrity rule is supported by this pipeline contribution?",
          "o": [
            {
              "t": "Geometry controls local stress; depth, length, tip sharpness, and orientation matter more than average wall thickness alone. The line-integrity archive stores the raw inspection record. Pipeline fits. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Use average pressure and corrosion rate while treating local flaw size, toughness, and transients as later refinements. The control trend looks stable. Pipeline records fit this pipeline account. Pipeline fits.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Assume friction, corrosion rate, and crack resistance remain stable across chemistry, roughness, temperature, and loading history. The control trend looks stable. Pipeline records fit this pipeline account. Pipeline fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Continue pressure service while postponing direct knowledge of the pipe wall and its growing anomalies. Regional corrosion rates support it. Pipeline practice makes the pipeline view plausible. The pipeline record fits.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        },
        {
          "q": "What should a pipeline operator learn from this history?",
          "o": [
            {
              "t": "The integrity lesson is to connect defect geometry with pressure, material toughness, and growth rate. An average corrosion number cannot defend a deep pit or an interacting cluster. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Treat inspection uncertainty as secondary after the line returns to normal flow and pressure. Regional corrosion rates support it. Pipeline practice makes the pipeline view plausible. The pipeline record fits.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Attribute the rupture mainly to a third-party strike or ground movement rather than progressive metal loss. Regional corrosion rates support it. Pipeline timing supports this pipeline claim. Pipeline fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Restore full pressure, postpone the inline inspection again, and treat the absence of another rupture as reassurance. The control trend looks stable. Regional corrosion rates support it. Pipeline fits.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        }
      ]
    },
    "pp_griffith": {
      "sci": "A. A. Griffith (1893-1963)",
      "topic": "Brittle fracture & crack growth",
      "lede": "A. A. Griffith's work on brittle fracture & crack growth gave integrity engineers a measurable relation instead of guesswork.",
      "no": 15,
      "profile": "Today's pipeline-systems cover note examines A. A. Griffith through brittle fracture & crack growth. A. A. Griffith explained brittle fracture through an energy balance between elastic strain energy and the energy needed to create new crack surfaces. His theory showed why microscopic flaws can govern strength. The result translated flow, corrosion, or fracture into evidence that could be compared with pressure data and the actual pipe wall.\n\nA pressurized structure can fail suddenly when crack driving force exceeds material resistance, even below yield stress. Control-room data can show pressure loss or rupture, but it does not replace physical knowledge of wall thickness and flaws. A cancelled inspection creates uncertainty that grows as exposure continues. A pipeline explanation should identify fluid state, pressure history, wall geometry, material behavior, environment, and the inspection method's detection limit.\n\nA transmission pipeline is a pressure boundary embedded in soil, weather, crossings, coatings, welds, and operating transients. Flow calculations explain service, while integrity engineering asks how the wall changes with time. Corrosion control combines coatings, cathodic protection, chemistry, drainage, patrols, and inspection. Inline tools, ultrasonic methods, pressure tests, and direct examination have different detection limits and should be chosen for expected threats. The integrity file must connect patrol observations, cathodic surveys, inline calls, dig measurements, pressure cycles, repairs, and cancelled inspections.\n\nCover competence means separating an external strike from progressive metal loss. Fractography, coating condition, corrosion products, SCADA chronology, and inspection history answer that question together. The integrity lesson is to connect defect geometry with pressure, material toughness, and growth rate. An average corrosion number cannot defend a deep pit or an interacting cluster. A defensible record preserves anomaly calls, dig findings, coating surveys, cathodic readings, pressure cycles, leaks, repairs, and schedule decisions. Trend continuity matters more than any polished annual summary.",
      "frame": "The Dispatcher follows the line on a map at The Operator's Integrity Office. \"Give me A. A. Griffith, the governing relation, and the field check.\"",
      "q": [
        {
          "q": "Which pipeline-integrity account best captures A. A. Griffith's contribution to brittle fracture & crack growth?",
          "o": [
            {
              "t": "A. The line-integrity archive stores the anomaly history. The line-integrity archive stores the raw anomaly history. The line-integrity archive stores the dated anomaly history. Pipeline fits. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "A. A. Griffith's pipeline work emphasizes average operating pressure and a regional corrosion rate. Pipeline practice makes the pipeline view plausible. Pipeline timing supports this pipeline claim.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "A. A. Griffith's pipeline work supports ordinary operating pressure as sufficient evidence that an uninspected pipe wall remains sound. Pipeline practice makes the pipeline view plausible. Pipeline fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "A. A. Griffith's pipeline authority supports postponing an inline inspection until the control room shows a clear leak signal. Pipeline practice makes the pipeline view plausible. The pipeline record fits.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        },
        {
          "q": "Which integrity rule is supported by this pipeline contribution?",
          "o": [
            {
              "t": "A pressurized structure can fail suddenly when crack driving force exceeds material resistance, even below yield stress. The segment dossier carries the raw anomaly history. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Use average pressure and corrosion rate while treating local flaw size, toughness, and transients as later refinements. Pipeline practice makes the pipeline view plausible. The pipeline record fits.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Assume friction, corrosion rate, and crack resistance remain stable across chemistry, roughness, temperature, and loading history. Pipeline practice makes the pipeline view plausible. Pipeline fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Continue pressure service while postponing direct knowledge of the pipe wall and its growing anomalies. The control trend looks stable. Pipeline timing supports this pipeline claim. Pipeline fits.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        },
        {
          "q": "What should a pipeline operator learn from this history?",
          "o": [
            {
              "t": "A defensible record preserves anomaly calls, dig findings, coating surveys, cathodic readings, pressure cycles, leaks, repairs, and schedule decisions. Trend continuity matters more than any polished annual summary. Pipeline fits. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Treat inspection uncertainty as secondary after the line returns to normal flow and pressure. The line carried service beforehand. Regional corrosion rates support it. Pipeline practice makes the pipeline view plausible. The pipeline record fits.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Attribute the rupture mainly to a third-party strike or ground movement rather than progressive metal loss. Pipeline records fit this pipeline account. Pipeline context supports the view. Pipeline timing supports this pipeline claim. Pipeline fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Restore full pressure, postpone the inline inspection again, and treat the absence of another rupture as reassurance. The control trend looks stable. Pipeline records fit this pipeline account. Pipeline timing supports this pipeline claim.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        }
      ]
    },
    "pp_irwin": {
      "sci": "George R. Irwin (1907-1998)",
      "topic": "Fracture mechanics & stress intensity",
      "lede": "George R. Irwin made fracture mechanics & stress intensity useful for reading pressure, flow, or damage along a pipeline.",
      "no": 16,
      "profile": "Today's pipeline-systems cover note examines George R. Irwin through fracture mechanics & stress intensity. George R. Irwin developed modern fracture mechanics and the stress-intensity factor used to describe the field near a crack tip. He connected laboratory toughness with structural flaw assessment. The result translated flow, corrosion, or fracture into evidence that could be compared with pressure data and the actual pipe wall.\n\nFitness-for-service decisions require crack size, stress intensity, toughness, temperature, and growth rate together. A transmission pipeline is a pressure boundary embedded in soil, weather, crossings, coatings, welds, and operating transients. Flow calculations explain service, while integrity engineering asks how the wall changes with time. A pipeline explanation should identify fluid state, pressure history, wall geometry, material behavior, environment, and the inspection method's detection limit.\n\nCorrosion control combines coatings, cathodic protection, chemistry, drainage, patrols, and inspection. Inline tools, ultrasonic methods, pressure tests, and direct examination have different detection limits and should be chosen for expected threats. Control-room data can show pressure loss or rupture, but it does not replace physical knowledge of wall thickness and flaws. A cancelled inspection creates uncertainty that grows as exposure continues. The integrity file must connect patrol observations, cathodic surveys, inline calls, dig measurements, pressure cycles, repairs, and cancelled inspections.\n\nThe integrity lesson is to connect defect geometry with pressure, material toughness, and growth rate. An average corrosion number cannot defend a deep pit or an interacting cluster. A defensible record preserves anomaly calls, dig findings, coating surveys, cathodic readings, pressure cycles, leaks, repairs, and schedule decisions. Trend continuity matters more than any polished annual summary. Cover competence means separating an external strike from progressive metal loss. Fractography, coating condition, corrosion products, SCADA chronology, and inspection history answer that question together.",
      "frame": "The Dispatcher taps the exposed pipe at The Operator's Integrity Office. \"Use George R. Irwin to connect the pressure record with the metal in front of us.\"",
      "q": [
        {
          "q": "Which pipeline-integrity account best captures George R. Irwin's contribution to fracture mechanics & stress intensity?",
          "o": [
            {
              "t": "George R. The line-integrity archive stores the pressure trace. Pressure-boundary evidence ties the raw pressure trace to service history. The line-integrity archive stores the raw pressure trace. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "George R. Irwin's pipeline work relies on average operating pressure and a regional corrosion rate. The control trend looks stable. Pipeline records fit this pipeline account. Normal pressure appears reassuring.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "George R. Irwin's pipeline work is read within pipeline practice as support for ordinary operating pressure as sufficient evidence that an uninspected pipe wall remains sound. The control trend looks stable. Pipeline fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "George R. Irwin's pipeline authority supports postponing an inline inspection until the control room shows a clear leak signal. The control trend looks stable. Pipeline records fit this pipeline account. Context fits.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        },
        {
          "q": "Which integrity rule is supported by this pipeline contribution?",
          "o": [
            {
              "t": "Fitness-for-service decisions require crack size, stress intensity, toughness, temperature, and growth rate together. The line-integrity archive stores the inspection record. Pipeline context matters.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Use average pressure and corrosion rate while treating local flaw size, toughness, and transients as later refinements. The control trend looks stable. Pipeline records fit this pipeline account. Pipeline fits.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Assume friction, corrosion rate, and crack resistance remain stable across chemistry, roughness, temperature, and loading history. Pipeline practice makes the pipeline view plausible. The pipeline record fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Continue pressure service while postponing direct knowledge of the pipe wall and its growing anomalies. The control trend looks stable. Regional corrosion rates support it. The pipeline record fits.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        },
        {
          "q": "What should a pipeline operator learn from this history?",
          "o": [
            {
              "t": "Cover competence means separating an external strike from progressive metal loss. Fractography, coating condition, corrosion products, SCADA chronology, and inspection history answer that question together. Pipeline context matters. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Treat inspection uncertainty as secondary after the line returns to normal flow and pressure. Regional corrosion rates support it. Pipeline practice makes the pipeline view plausible. Pipeline timing supports this pipeline claim. Pipeline context matters.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Attribute the rupture mainly to a third-party strike or ground movement rather than progressive metal loss. The control trend looks stable. Pipeline records fit this pipeline account. Pipeline timing supports this pipeline claim. Pipeline fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Restore full pressure, postpone the inline inspection again, and treat the absence of another rupture as reassurance. The control trend looks stable. Pipeline records fit this pipeline account. Pipeline timing supports this pipeline claim. Pipeline fits.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        }
      ]
    },
    "pp_firestone": {
      "sci": "Floyd Firestone (1898-1986)",
      "topic": "Ultrasonic flaw detection",
      "lede": "Through ultrasonic flaw detection, Floyd Firestone connected fluid service with the condition of the pipe wall.",
      "no": 17,
      "profile": "Today's pipeline-systems cover note examines Floyd Firestone through ultrasonic flaw detection. Floyd Firestone patented the ultrasonic reflectoscope, using echoes of high-frequency sound to locate internal flaws. Ultrasonic testing became a major nondestructive method for welds, plate, and pipe. The result translated flow, corrosion, or fracture into evidence that could be compared with pressure data and the actual pipe wall.\n\nA flaw detector needs calibration, suitable coverage, qualified interpretation, and knowledge of which orientations may remain invisible. Corrosion control combines coatings, cathodic protection, chemistry, drainage, patrols, and inspection. Inline tools, ultrasonic methods, pressure tests, and direct examination have different detection limits and should be chosen for expected threats. A pipeline explanation should identify fluid state, pressure history, wall geometry, material behavior, environment, and the inspection method's detection limit.\n\nControl-room data can show pressure loss or rupture, but it does not replace physical knowledge of wall thickness and flaws. A cancelled inspection creates uncertainty that grows as exposure continues. A transmission pipeline is a pressure boundary embedded in soil, weather, crossings, coatings, welds, and operating transients. Flow calculations explain service, while integrity engineering asks how the wall changes with time. The integrity file must connect patrol observations, cathodic surveys, inline calls, dig measurements, pressure cycles, repairs, and cancelled inspections.\n\nA defensible record preserves anomaly calls, dig findings, coating surveys, cathodic readings, pressure cycles, leaks, repairs, and schedule decisions. Trend continuity matters more than any polished annual summary. Cover competence means separating an external strike from progressive metal loss. Fractography, coating condition, corrosion products, SCADA chronology, and inspection history answer that question together. The integrity lesson is to connect defect geometry with pressure, material toughness, and growth rate. An average corrosion number cannot defend a deep pit or an interacting cluster.",
      "frame": "The Clerk opens an anomaly sheet at The Operator's Integrity Office. \"Explain ultrasonic flaw detection, including what the inspection can miss.\"",
      "q": [
        {
          "q": "Which pipeline-integrity account best captures Floyd Firestone's contribution to ultrasonic flaw detection?",
          "o": [
            {
              "t": "Floyd Firestone patented the ultrasonic reflectoscope, using echoes of high-frequency sound to locate internal flaws. The segment dossier carries the raw inspection record.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Floyd Firestone's pipeline work emphasizes average operating pressure and a regional corrosion rate. The control trend looks stable. Pipeline timing supports this pipeline claim.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Floyd Firestone's pipeline work supports ordinary operating pressure as sufficient evidence that an uninspected pipe wall remains sound. The control trend looks stable.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Floyd Firestone's pipeline authority supports postponing an inline inspection until the control room shows a clear leak signal. Pipeline practice makes the pipeline view plausible.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        },
        {
          "q": "Which integrity rule is supported by this pipeline contribution?",
          "o": [
            {
              "t": "A flaw detector needs calibration, suitable coverage, qualified interpretation, and knowledge of which orientations may remain invisible. The segment dossier carries the pressure trace. Pipeline fits. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Use average pressure and corrosion rate while treating local flaw size, toughness, and transients as later refinements. The control trend looks stable. Pipeline records fit this pipeline account. Pipeline fits.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Assume friction, corrosion rate, and crack resistance remain stable across chemistry, roughness, temperature, and loading history. The control trend looks stable. Pipeline records fit this pipeline account. Pipeline fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Continue pressure service while postponing direct knowledge of the pipe wall and its growing anomalies. Regional corrosion rates support it. Pipeline practice makes the pipeline view plausible. The pipeline record fits.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        },
        {
          "q": "What should a pipeline operator learn from this history?",
          "o": [
            {
              "t": "The integrity lesson is to connect defect geometry with pressure, material toughness, and growth rate. An average corrosion number cannot defend a deep pit or an interacting cluster. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Treat inspection uncertainty as secondary after the line returns to normal flow and pressure. Regional corrosion rates support it. Pipeline practice makes the pipeline view plausible. The pipeline record fits.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Attribute the rupture mainly to a third-party strike or ground movement rather than progressive metal loss. Regional corrosion rates support it. Pipeline timing supports this pipeline claim. Pipeline fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Restore full pressure, postpone the inline inspection again, and treat the absence of another rupture as reassurance. The control trend looks stable. Regional corrosion rates support it. Pipeline fits.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        }
      ]
    },
    "pp_venturi": {
      "sci": "Giovanni Battista Venturi (1746-1822)",
      "topic": "The Venturi effect & flow metering",
      "lede": "Giovanni Battista Venturi's work on the Venturi effect & flow metering gave integrity engineers a measurable relation instead of guesswork.",
      "no": 18,
      "profile": "Today's pipeline-systems cover note examines Giovanni Battista Venturi through the Venturi effect & flow metering. Giovanni Battista Venturi studied pressure changes in constricted flow. A Venturi meter infers flow rate from the pressure difference between a wider section and a throat. The result translated flow, corrosion, or fracture into evidence that could be compared with pressure data and the actual pipe wall.\n\nFlow measurement depends on geometry, pressure taps, fluid properties, and calibration; a plausible reading is not proof of accuracy. Control-room data can show pressure loss or rupture, but it does not replace physical knowledge of wall thickness and flaws. A cancelled inspection creates uncertainty that grows as exposure continues. A pipeline explanation should identify fluid state, pressure history, wall geometry, material behavior, environment, and the inspection method's detection limit.\n\nA transmission pipeline is a pressure boundary embedded in soil, weather, crossings, coatings, welds, and operating transients. Flow calculations explain service, while integrity engineering asks how the wall changes with time. Corrosion control combines coatings, cathodic protection, chemistry, drainage, patrols, and inspection. Inline tools, ultrasonic methods, pressure tests, and direct examination have different detection limits and should be chosen for expected threats. The integrity file must connect patrol observations, cathodic surveys, inline calls, dig measurements, pressure cycles, repairs, and cancelled inspections.\n\nCover competence means separating an external strike from progressive metal loss. Fractography, coating condition, corrosion products, SCADA chronology, and inspection history answer that question together. The integrity lesson is to connect defect geometry with pressure, material toughness, and growth rate. An average corrosion number cannot defend a deep pit or an interacting cluster. A defensible record preserves anomaly calls, dig findings, coating surveys, cathodic readings, pressure cycles, leaks, repairs, and schedule decisions. Trend continuity matters more than any polished annual summary.",
      "frame": "The Clerk follows the line on a map at The Operator's Integrity Office. \"Give me Giovanni Battista Venturi, the governing relation, and the field check.\"",
      "q": [
        {
          "q": "Which pipeline-integrity account best captures Giovanni Battista Venturi's contribution to the Venturi effect & flow metering?",
          "o": [
            {
              "t": "Giovanni Battista Venturi studied pressure changes in constricted flow. The line-integrity archive stores the raw coating survey. The segment dossier carries the line-specific coating survey. Pipeline fits. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Giovanni Battista Venturi's pipeline work emphasizes average operating pressure and a regional corrosion rate. Regional corrosion rates support it. Pipeline practice makes the pipeline view plausible. The pipeline record fits.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Giovanni Battista Venturi's pipeline work supports ordinary operating pressure as sufficient evidence that an uninspected pipe wall remains sound. Pipeline practice makes the pipeline view plausible. The pipeline record fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Giovanni Battista Venturi's authority is invoked in pipeline practice to justify postponing an inline inspection until the control room shows a clear leak signal. Normal pressure appears reassuring. Pipeline fits. Pipeline fits.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        },
        {
          "q": "Which integrity rule is supported by this pipeline contribution?",
          "o": [
            {
              "t": "Flow measurement depends on geometry, pressure taps, fluid properties, and calibration; a plausible reading is not proof of accuracy. The segment dossier carries the coating survey. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Use average pressure and corrosion rate while treating local flaw size, toughness, and transients as later refinements. The control trend looks stable. Pipeline records fit this pipeline account.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Assume friction, corrosion rate, and crack resistance remain stable across chemistry, roughness, temperature, and loading history. The control trend looks stable. The pipeline practice fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Continue pressure service while postponing direct knowledge of the pipe wall and its growing anomalies. Regional corrosion rates support it. Pipeline practice makes the pipeline view plausible.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        },
        {
          "q": "What should a pipeline operator learn from this history?",
          "o": [
            {
              "t": "A defensible record preserves anomaly calls, dig findings, coating surveys, cathodic readings, pressure cycles, leaks, repairs, and schedule decisions. Trend continuity matters more than any polished annual summary. Pipeline fits. Pipeline fits.",
              "v": "expert",
              "fb": "Correct: the answer connects flow or material behavior with inspection evidence and pressure-boundary safety."
            },
            {
              "t": "Treat inspection uncertainty as secondary after the line returns to normal flow and pressure. The line carried service beforehand. Regional corrosion rates support it. Pipeline practice makes the pipeline view plausible. The pipeline record fits.",
              "v": "partial",
              "fb": "This describes one pipeline mechanism but leaves flaw size, growth, or verification incomplete."
            },
            {
              "t": "Attribute the rupture mainly to a third-party strike or ground movement rather than progressive metal loss. Pipeline records fit this pipeline account. Pipeline context supports the view. Pipeline timing supports this pipeline claim. Pipeline fits.",
              "v": "wrong",
              "fb": "That claim uses the wrong physical model or treats normal pressure as proof of sound pipe."
            },
            {
              "t": "Restore full pressure, postpone the inline inspection again, and treat the absence of another rupture as reassurance. The control trend looks stable. Pipeline records fit this pipeline account. Pipeline timing supports this pipeline claim.",
              "v": "danger",
              "fb": "That shortcut postpones knowledge of the wall condition while the defect remains exposed to pressure cycles."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "patrol": {
      "rightofway": "The excavated pipe segment anchors the meeting at The Right-of-Way & Rupture Site, where Line-Walker Dumas carries a coating file. \"Pipe integrity begins with exact terms; pass the reading before I open the field notes.\"",
      "control": "A pressure-trend strip anchors the meeting at The Gas Control Center, where Line-Walker Dumas carries a coating file. \"Pipe integrity begins with exact terms; pass the reading before I open the field notes.\"",
      "office": "The integrity-management ledger anchors the meeting at The Operator's Integrity Office, where Line-Walker Dumas carries a coating file. \"Pipe integrity begins with exact terms; pass the reading before I open the field notes.\""
    },
    "dispatch": {
      "rightofway": "The excavated pipe segment anchors the meeting at The Right-of-Way & Rupture Site, where The Dispatcher carries a coating file. \"Pressure data are not for guesswork—show me you understood today's flow scientist.\"",
      "control": "A pressure-trend strip anchors the meeting at The Gas Control Center, where The Dispatcher carries a coating file. \"Pressure data are not for guesswork—show me you understood today's flow scientist.\"",
      "office": "The integrity-management ledger anchors the meeting at The Operator's Integrity Office, where The Dispatcher carries a coating file. \"Pressure data are not for guesswork—show me you understood today's flow scientist.\""
    },
    "clerk": {
      "rightofway": "The excavated pipe segment anchors the meeting at The Right-of-Way & Rupture Site, where The Clerk carries a coating file. \"Earn the integrity ledger by answering from the dossier rather than the crater.\"",
      "control": "A pressure-trend strip anchors the meeting at The Gas Control Center, where The Clerk carries a coating file. \"Earn the integrity ledger by answering from the dossier rather than the crater.\"",
      "office": "The integrity-management ledger anchors the meeting at The Operator's Integrity Office, where The Clerk carries a coating file. \"Earn the integrity ledger by answering from the dossier rather than the crater.\""
    }
  },
  "story": [
    "<b>A section of ruptured pipe rests on cribbing, its inner and outer surfaces separately protected.</b>",
    "<b>Line-Walker Dumas</b> brings field observations, <b>The Dispatcher</b> guards the wall morphology timeline, and <b>The Clerk</b> maps decisions to offices.",
    "The clue column circles Hollis Trask — pipeline operator, The gas control dispatcher, and The pipeline safety regulator. The harder wall morphology judgment weighs <b>Internal microbial corrosion pitted the pipe from the gas side</b> against <b>Stress-corrosion cracking linked fine cracks under steady tension</b>.",
    "<b>Metallurgical cutting begins in eight days, so coating, deposits, and crack morphology must be documented intact.</b>"
  ],
  "endings": {
    "overclaimWhat": "attack",
    "dismissalWhat": "freak",
    "win": {
      "expertTitle": "Corrosion From the Outside In",
      "expert": [
        "Investigator Rhea Colton names Hollis Trask — pipeline operator, The Operator's Integrity Office, and External corrosion under failed coating thinned the wall locally. Not Internal microbial corrosion pitted the pipe from the gas side. Not Stress-corrosion cracking linked fine cracks under steady tension.",
        "The readings distinguish internal microbial pits, branched stress-corrosion cracks, and broad external wall loss associated with coating failure and inadequate cathodic protection."
      ],
      "soundTitle": "A Credible Integrity Finding",
      "sound": [
        "Coating evidence fixes the trio: Hollis Trask — pipeline operator; The Operator's Integrity Office; External corrosion under failed coating thinned the wall locally.",
        "The wall evidence is persuasive; a fuller integrity chronology would make responsibility harder to dispute."
      ],
      "namedTitle": "Correct Mechanism, Thin Chain",
      "named": [
        "Coating evidence points to Hollis Trask — pipeline operator, The Operator's Integrity Office, and External corrosion under failed coating thinned the wall locally; coating support remains incomplete.",
        "Right wall morphology, wrong evidentiary weight: the file is not ready for an integrity order."
      ]
    },
    "overclaim": {
      "title": "The Microbial-Corrosion Theory",
      "body": [
        "Investigator Rhea Colton selects Internal microbial corrosion pitted the pipe from the gas side. The pipe surface contradicts the proposed side of attack.",
        "Microbiologically influenced corrosion normally begins where water, biofilms, and microbial products contact the internal surface. Its deposits and pit chemistry differ from damage that tracks an external coating holiday."
      ]
    },
    "dismissal": {
      "title": "The Stress-Corrosion Theory",
      "body": [
        "Investigator Rhea Colton instead favors Stress-corrosion cracking linked fine cracks under steady tension. Sectioning reveals thinning rather than a branched crack colony.",
        "Stress-corrosion cracking produces colonies of narrow, often branched cracks under tensile stress, sometimes with little general thinning. The recovered wall instead shows broad external metal loss rather than a linked crack field."
      ]
    },
    "wrongNames": {
      "title": "Right Defect, Wrong Responsibility",
      "body": [
        "External wall loss is correctly identified, while WHO or WHERE remains wrong. Complete the integrity chain before the order is filed."
      ]
    }
  }
}
};
