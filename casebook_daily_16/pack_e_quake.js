module.exports = { PACK: {
  "id": "e_quake",
  "title": "Nine Seconds to Cordera",
  "discipline": "Seismology & Earthquake Science",
  "teaser": "Cordera's shaking began with an unusual compact source. Was it an underground explosion, or did fluid injection trigger fault slip? The wavefield must identify the source physics.",
  "overclaimTag": "an underground explosion",
  "truthTag": "tectonic double-couple fault rupture",
  "venue": "the Cordera earthquake inquiry",
  "agent": {
    "name": "Investigator Mara Solveig",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Seismology Pioneers",
  "dossierName": "SEISMOLOGY PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Cordera earthquake inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before your inquiry ends. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The place you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "Explosion and induced-seismicity hypotheses are both testable; wave radiation, depth, and timing must decide.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "director",
      "items": [
        {
          "id": "director",
          "label": "Roan Vesk — seismic-network director"
        },
        {
          "id": "seismologist",
          "label": "The state seismologist"
        },
        {
          "id": "engineer",
          "label": "The building-code engineer"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "office",
      "items": [
        {
          "id": "fault",
          "label": "The Fault Line & Sensor Sites"
        },
        {
          "id": "warncenter",
          "label": "The Alert Operations Centre"
        },
        {
          "id": "office",
          "label": "The Network's Budget Office"
        }
      ]
    },
    "what": {
      "title": "What source generated the seismic waves?",
      "truth": "silenced",
      "items": [
        {
          "id": "blast",
          "label": "An underground explosion produced a compact pressure-dominated source."
        },
        {
          "id": "freak",
          "label": "Fluid injection triggered slip on a previously stressed fault."
        },
        {
          "id": "silenced",
          "label": "Tectonic shear rupture produced a double-couple radiation pattern."
        }
      ]
    }
  },
  "PLACES": {
    "fault": {
      "name": "The Fault Line & Sensor Sites",
      "xy": [
        140,
        90
      ]
    },
    "warncenter": {
      "name": "The Alert Operations Centre",
      "xy": [
        330,
        240
      ]
    },
    "office": {
      "name": "The Network's Budget Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "fault",
      "warncenter"
    ],
    [
      "warncenter",
      "office"
    ]
  ],
  "CHARACTERS": {
    "fieldtech": {
      "name": "Field Tech Odile",
      "role": "Seismic field technician",
      "face": "📡",
      "badge": "O",
      "legend": "the fault sites",
      "hint": "Maintains station custody and can identify which offices controlled repairs and field access."
    },
    "dutyofficer": {
      "name": "The Duty Officer",
      "role": "Alert-centre duty officer",
      "face": "🚨",
      "badge": "D",
      "legend": "the alert centre",
      "hint": "Preserves alert-center staffing and the locations from which operational decisions were made."
    },
    "clerk": {
      "name": "The Clerk",
      "role": "Budget-office clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Holds network budgets, risk studies, and the authorization chain for monitoring work."
    }
  },
  "TOPICMAP": {
    "fault": {
      "fieldtech": [
        "mallet"
      ],
      "dutyofficer": [
        "wiechert"
      ],
      "clerk": [
        "reid"
      ]
    },
    "warncenter": {
      "fieldtech": [
        "gutenberg"
      ],
      "dutyofficer": [
        "bullen"
      ],
      "clerk": [
        "byerly"
      ]
    },
    "office": {
      "fieldtech": [
        "kanamori"
      ],
      "dutyofficer": [
        "hanks"
      ],
      "clerk": [
        "cornell"
      ]
    }
  },
  "TOPICS": {
    "mallet": {
      "whatHint": "Mallet taught that the ground itself stores and unleashes the shock. Before reaching for a planted charge, ask whether the earth alone can account for what the traces show.",
      "sci": "Robert Mallet (1810-1881)",
      "topic": "The founding of seismology",
      "lede": "Robert Mallet read the founding of seismology from the timing and shape of waves moving through Earth.",
      "no": 1,
      "profile": "The seismology briefing today begins with Robert Mallet and the founding of seismology. Robert Mallet studied earthquake waves, coined much of the early vocabulary of seismology, and surveyed the 1857 Basilicata earthquake in Italy. He used damage direction and intensity observations to infer the source region. Earthquake records mix the rupture, the path through Earth, the local ground, and the instrument. Mallet’s work helped separate those layers so a trace could become physical evidence.\n\nThe analytical step is to map effects systematically and distinguish source, path, and local-site contributions. Timing, calibration, station geometry, waveform type, site condition, and uncertainty must be preserved before a source or hazard conclusion is drawn.\n\nEarly warning does not predict an earthquake days ahead. It detects the fast P waves after rupture begins and sends notice before stronger shaking reaches more distant sites. Seconds depend on dense sensors, rapid telemetry, tested algorithms, and institutions willing to transmit the alert.\n\nThe seismic lesson: earthquakes leave measurable patterns that are more informative than rumor. Networks protect people only when instruments, models, budgets, and message delivery remain parts of the same engineered system. A sensor outage can erase warning time even when later instruments record the earthquake perfectly. Hazard maps summarize probability and ground motion; they do not claim to schedule the next rupture. Automatic alerts require drills with transit, hospitals, utilities, and schools so recipients know what useful seconds permit. Station maintenance records are scientific metadata because outages alter location, magnitude, and warning performance. Building resilience depends on codes and retrofit decisions that remain valuable even when no short-term precursor appears.",
      "frame": "Aligns three seismograms at The Fault Line & Sensor Sites. \"The first arrival bought seconds. Tell me what the founding of seismology reveals.\"",
      "q": [
        {
          "q": "Which seismological description best captures Robert Mallet’s work on the founding of seismology?",
          "o": [
            {
              "t": "Robert Mallet studied earthquake waves, coined much of the early vocabulary of seismology, and surveyed the 1857 Basilicata earthquake in Italy. Alert latency stays tied to the waveform chronology. Fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Robert Mallet's seismic work emphasizes the nearest stations and reported damage. The first arrival looks persuasive. The initial waveform fits the claim. Seismic practice makes the seismic view plausible.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Robert Mallet's seismic work is read within seismic practice as support for an unusual first arrival as evidence of a separate underground explosion before the full network solution. Analyst review appears prudent.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Robert Mallet's seismic authority supports holding the automatic alert until analysts confirm both magnitude and event type. Sparse stations can support it. Seismic practice makes the seismic view plausible.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        },
        {
          "q": "Which analysis or warning practice is most defensible?",
          "o": [
            {
              "t": "Carry out this seismic practice: map effects systematically and distinguish source, path, and local-site contributions. Network timing remains preserved. Seismic fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Locate the event from the nearest stations, then refine the source after additional telemetry and site corrections arrive. Sparse stations can support it. Seismic fits.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Use the largest recorded acceleration as the main measure of source size and expected damage across the city. Seismic practice makes the seismic view plausible.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Delay the public alert until an analyst settles the final magnitude, reducing the chance of a disruptive unnecessary alarm. Seismic timing supports this seismic claim.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        },
        {
          "q": "Which principle best follows from the seismic evidence?",
          "o": [
            {
              "t": "The seismological lesson is that earthquakes leave measurable patterns that are more informative than rumor. Alert latency stays tied to the waveform chronology. Seismic fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Rely on the regional hazard map for preparedness even while the real-time sensor network remains thin. Analyst review appears prudent. Sparse stations can support it.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Treat uncertain day-ahead prediction as evidence that rapid earthquake warnings are too unreliable for public action. Seismic practice makes the seismic view plausible.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Attribute the shaking to a concealed blast or an exceptional source before comparing the full waveform with the known fault. Seismic practice makes the seismic view plausible.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        }
      ]
    },
    "wiechert": {
      "whatHint": "Wiechert trusted the whole instrument record over any one dramatic arrival. A single odd first pulse is not a bomb — let the network, not one trace, say what broke.",
      "sci": "Emil Wiechert (1861-1928)",
      "topic": "The seismograph & Earth's interior",
      "lede": "Emil Wiechert made the seismograph and earth’s interior part of the network that turns ground motion into warning.",
      "no": 2,
      "profile": "The seismology briefing today begins with Emil Wiechert and the seismograph and earth’s interior. Emil Wiechert designed high-mass seismographs and used earthquake waves to investigate Earth's interior. He was an early proponent of a dense metallic core inside a lighter mantle. Earthquake records mix the rupture, the path through Earth, the local ground, and the instrument. Wiechert’s work helped separate those layers so a trace could become physical evidence.\n\nThe analytical step is to use calibrated instruments and travel times to infer hidden layers. Timing, calibration, station geometry, waveform type, site condition, and uncertainty must be preserved before a source or hazard conclusion is drawn.\n\nEarly warning does not predict an earthquake days ahead. It detects the fast P waves after rupture begins and sends notice before stronger shaking reaches more distant sites. Seconds depend on dense sensors, rapid telemetry, tested algorithms, and institutions willing to transmit the alert.\n\nThe seismic lesson: the instrument response must be known before the ground motion can be interpreted. Networks protect people only when instruments, models, budgets, and message delivery remain parts of the same engineered system. A sensor outage can erase warning time even when later instruments record the earthquake perfectly. Hazard maps summarize probability and ground motion; they do not claim to schedule the next rupture. Automatic alerts require drills with transit, hospitals, utilities, and schools so recipients know what useful seconds permit. Station maintenance records are scientific metadata because outages alter location, magnitude, and warning performance. Building resilience depends on codes and retrofit decisions that remain valuable even when no short-term precursor appears.",
      "frame": "Traces a fault beneath the city map. \"Do not call it unforeseeable until you understand the seismograph and earth’s interior.\"",
      "q": [
        {
          "q": "Which seismological description best captures Emil Wiechert’s work on the seismograph and earth’s interior?",
          "o": [
            {
              "t": "Emil Wiechert designed high-mass seismographs and used earthquake waves to investigate Earth's interior. Network timing remains preserved. Site response stays explicit. Seismic fits. Fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Emil Wiechert's seismic work emphasizes the nearest stations and reported damage. The initial waveform fits the claim. Seismic practice makes the seismic view plausible. The seismic record fits.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Emil Wiechert's seismic work is read within seismic practice as support for an unusual first arrival as evidence of a separate underground explosion before the full network solution. Seismic fits.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Emil Wiechert's seismic authority supports holding the automatic alert until analysts confirm both magnitude and event type. Seismic practice makes the seismic view plausible. Seismic fits.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        },
        {
          "q": "Which analysis or warning practice is most defensible?",
          "o": [
            {
              "t": "Carry out this seismic practice: use calibrated instruments and travel times to infer hidden layers. Site response stays explicit. Seismic fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Locate the event from the nearest stations, then refine the source after additional telemetry and site corrections arrive. The seismic record fits.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Use the largest recorded acceleration as the main measure of source size and expected damage across the city. Sparse stations can support it.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Delay the public alert until an analyst settles the final magnitude, reducing the chance of a disruptive unnecessary alarm. The seismic practice fits.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        },
        {
          "q": "Which principle best follows from the seismic evidence?",
          "o": [
            {
              "t": "The seismological lesson is that the instrument response must be known before the ground motion can be interpreted. Station geometry remains part of the source estimate. Seismic fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Rely on the regional hazard map for preparedness even while the real-time sensor network remains thin. Sparse stations can support it. Seismic records fit this seismic account. Seismic fits.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Treat uncertain day-ahead prediction as evidence that rapid earthquake warnings are too unreliable for public action. Seismic practice makes the seismic view plausible. The seismic record fits.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Attribute the shaking to a concealed blast or an exceptional source before comparing the full waveform with the known fault. Seismic practice makes the seismic view plausible. Seismic fits.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        }
      ]
    },
    "reid": {
      "whatHint": "Reid reads a quake as strain stored along a fault over years and finally let go — a rupture long in coming, not something freshly pumped in or set off.",
      "sci": "Harry Fielding Reid (1859-1944)",
      "topic": "Elastic rebound & fault rupture",
      "lede": "The hidden earthquake source became measurable through Harry Fielding Reid’s work on elastic rebound and fault rupture.",
      "no": 3,
      "profile": "The seismology briefing today begins with Harry Fielding Reid and elastic rebound and fault rupture. Harry Fielding Reid developed elastic-rebound theory after studying the 1906 San Francisco earthquake. Survey measurements showed crustal strain accumulating across the fault and being released when the fault slipped. Earthquake records mix the rupture, the path through Earth, the local ground, and the instrument. Reid’s work helped separate those layers so a trace could become physical evidence.\n\nThe analytical step is to compare pre- and post-earthquake deformation to reconstruct fault motion. Timing, calibration, station geometry, waveform type, site condition, and uncertainty must be preserved before a source or hazard conclusion is drawn.\n\nEarly warning does not predict an earthquake days ahead. It detects the fast P waves after rupture begins and sends notice before stronger shaking reaches more distant sites. Seconds depend on dense sensors, rapid telemetry, tested algorithms, and institutions willing to transmit the alert.\n\nThe seismic lesson: earthquakes release stored strain rather than appearing without a physical history. Networks protect people only when instruments, models, budgets, and message delivery remain parts of the same engineered system. A sensor outage can erase warning time even when later instruments record the earthquake perfectly. Hazard maps summarize probability and ground motion; they do not claim to schedule the next rupture. Automatic alerts require drills with transit, hospitals, utilities, and schools so recipients know what useful seconds permit. Station maintenance records are scientific metadata because outages alter location, magnitude, and warning performance. Building resilience depends on codes and retrofit decisions that remain valuable even when no short-term precursor appears.",
      "frame": "Opens a sensor maintenance sheet. \"A dark station records nothing, including its own absence. Explain elastic rebound and fault rupture.\"",
      "q": [
        {
          "q": "Which seismological description best captures Harry Fielding Reid’s work on elastic rebound and fault rupture?",
          "o": [
            {
              "t": "Harry Fielding Reid developed elastic-rebound theory after studying the 1906 San Francisco earthquake. Station geometry remains part of the source estimate. Alert latency stays tied to the waveform chronology.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Harry Fielding Reid's treatment of elastic rebound & fault rupture uses a seismic simplification: the nearest stations and reported damage, with site response and network geometry treated as later refinements.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Harry Fielding Reid's seismic work is read within seismic practice as support for an unusual first arrival as evidence of a separate underground explosion before the full network solution. Sparse stations can support it.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Harry Fielding Reid's seismic authority supports holding the automatic alert until analysts confirm both magnitude and event type. The initial waveform fits the claim. Seismic practice makes the seismic view plausible.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        },
        {
          "q": "Which analysis or warning practice is most defensible?",
          "o": [
            {
              "t": "Carry out this seismic practice: compare pre- and post-earthquake deformation to reconstruct fault motion. Site response stays explicit. Seismic fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Locate the event from the nearest stations, then refine the source after additional telemetry and site corrections arrive. The seismic record fits.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Use the largest recorded acceleration as the main measure of source size and expected damage across the city. Sparse stations can support it.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Delay the public alert until an analyst settles the final magnitude, reducing the chance of a disruptive unnecessary alarm. The seismic practice fits.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        },
        {
          "q": "Which principle best follows from the seismic evidence?",
          "o": [
            {
              "t": "The seismological lesson is that earthquakes release stored strain rather than appearing without a physical history. Alert latency stays tied to the waveform chronology. Seismic fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Rely on the regional hazard map for preparedness even while the real-time sensor network remains thin. Sparse stations can support it. Seismic records fit this seismic account. Seismic fits.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Treat uncertain day-ahead prediction as evidence that rapid earthquake warnings are too unreliable for public action. Seismic practice makes the seismic view plausible. The seismic record fits.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Attribute the shaking to a concealed blast or an exceptional source before comparing the full waveform with the known fault. Seismic practice makes the seismic view plausible. Seismic fits.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        }
      ]
    },
    "gutenberg": {
      "whatHint": "Gutenberg's travel-times pin the source depth. A source seated in ordinary crust — not shallow and man-made — weighs against a set charge.",
      "sci": "Beno Gutenberg (1889-1960)",
      "topic": "Earth's core & the magnitude scale",
      "lede": "Beno Gutenberg read earth’s core and the magnitude scale from the timing and shape of waves moving through Earth.",
      "no": 4,
      "profile": "The seismology briefing today begins with Beno Gutenberg and earth’s core and the magnitude scale. Beno Gutenberg used seismic travel times to determine the depth of the core-mantle boundary and, with Charles Richter, developed earthquake magnitude relations. His work connected global seismograms with source size and Earth structure. Earthquake records mix the rupture, the path through Earth, the local ground, and the instrument. Gutenberg’s work helped separate those layers so a trace could become physical evidence.\n\nThe analytical step is to separate magnitude, intensity, distance, and instrument response. Timing, calibration, station geometry, waveform type, site condition, and uncertainty must be preserved before a source or hazard conclusion is drawn.\n\nEarly warning does not predict an earthquake days ahead. It detects the fast P waves after rupture begins and sends notice before stronger shaking reaches more distant sites. Seconds depend on dense sensors, rapid telemetry, tested algorithms, and institutions willing to transmit the alert.\n\nThe seismic lesson: one numerical magnitude does not describe every local consequence. Networks protect people only when instruments, models, budgets, and message delivery remain parts of the same engineered system. A sensor outage can erase warning time even when later instruments record the earthquake perfectly. Hazard maps summarize probability and ground motion; they do not claim to schedule the next rupture. Automatic alerts require drills with transit, hospitals, utilities, and schools so recipients know what useful seconds permit. Station maintenance records are scientific metadata because outages alter location, magnitude, and warning performance. Building resilience depends on codes and retrofit decisions that remain valuable even when no short-term precursor appears.",
      "frame": "Aligns three seismograms at The Alert Operations Centre. \"The first arrival bought seconds. Tell me what earth’s core and the magnitude scale reveals.\"",
      "q": [
        {
          "q": "Which seismological description best captures Beno Gutenberg’s work on earth’s core and the magnitude scale?",
          "o": [
            {
              "t": "Beno Gutenberg used seismic travel times to determine the depth of the core-mantle boundary and, with Charles Richter, developed earthquake magnitude relations. Ground-response assumptions remain available for review. Seismic fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Beno Gutenberg's seismic work relies on the nearest stations and reported damage. Analyst review appears prudent. Sparse stations can support it. Seismic records fit this seismic account. Seismic timing supports this seismic claim.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Beno Gutenberg's seismic work supports an unusual first arrival as evidence of a separate underground explosion before the full network solution. Seismic records fit this seismic account. Seismic timing supports this seismic claim.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Beno Gutenberg's authority is invoked in seismic practice to justify holding the automatic alert until analysts confirm both magnitude and event type. Analyst review appears prudent. Sparse stations can support it. Seismic fits.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        },
        {
          "q": "Which analysis or warning practice is most defensible?",
          "o": [
            {
              "t": "Carry out this seismic practice: separate magnitude, intensity, distance, and instrument response. Site response stays explicit. Seismic fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Locate the event from the nearest stations, then refine the source after additional telemetry and site corrections arrive. The seismic record fits.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Use the largest recorded acceleration as the main measure of source size and expected damage across the city. The seismic practice fits.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Delay the public alert until an analyst settles the final magnitude, reducing the chance of a disruptive unnecessary alarm. The seismic record fits.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        },
        {
          "q": "Which principle best follows from the seismic evidence?",
          "o": [
            {
              "t": "The seismological lesson is that one numerical magnitude does not describe every local consequence. Station geometry remains part of the source estimate. Seismic fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Rely on the regional hazard map for preparedness even while the real-time sensor network remains thin. Seismic practice makes the seismic view plausible. The seismic record fits.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Treat uncertain day-ahead prediction as evidence that rapid earthquake warnings are too unreliable for public action. Seismic timing supports this seismic claim. Seismic fits.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Attribute the shaking to a concealed blast or an exceptional source before comparing the full waveform with the known fault. Seismic records fit this seismic account.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        }
      ]
    },
    "bullen": {
      "whatHint": "Bullen would correct for the Earth's layers before calling any pattern 'unusual.' Structure distorts the wavefield; what looks exotic is often ordinary faulting seen through rock.",
      "sci": "Keith Bullen (1906-1976)",
      "topic": "The layered model of the Earth",
      "lede": "Keith Bullen made the layered model of the earth part of the network that turns ground motion into warning.",
      "no": 5,
      "profile": "The seismology briefing today begins with Keith Bullen and the layered model of the earth. Keith Bullen developed density and velocity models for Earth's layered interior using seismological observations and physical constraints. His classifications helped organize mantle and core regions. Earthquake records mix the rupture, the path through Earth, the local ground, and the instrument. Bullen’s work helped separate those layers so a trace could become physical evidence.\n\nThe analytical step is to combine travel times, density, gravity, and elastic properties in a consistent Earth model. Timing, calibration, station geometry, waveform type, site condition, and uncertainty must be preserved before a source or hazard conclusion is drawn.\n\nEarly warning does not predict an earthquake days ahead. It detects the fast P waves after rupture begins and sends notice before stronger shaking reaches more distant sites. Seconds depend on dense sensors, rapid telemetry, tested algorithms, and institutions willing to transmit the alert.\n\nThe seismic lesson: hidden structure is inferred from multiple constraints, not one unusual trace. Networks protect people only when instruments, models, budgets, and message delivery remain parts of the same engineered system. A sensor outage can erase warning time even when later instruments record the earthquake perfectly. Hazard maps summarize probability and ground motion; they do not claim to schedule the next rupture. Automatic alerts require drills with transit, hospitals, utilities, and schools so recipients know what useful seconds permit. Station maintenance records are scientific metadata because outages alter location, magnitude, and warning performance. Building resilience depends on codes and retrofit decisions that remain valuable even when no short-term precursor appears.",
      "frame": "Traces a fault beneath the city map. \"Do not call it unforeseeable until you understand the layered model of the earth.\"",
      "q": [
        {
          "q": "Which seismological description best captures Keith Bullen’s work on the layered model of the earth?",
          "o": [
            {
              "t": "Keith Bullen developed density and velocity models for Earth's layered interior using seismological observations and physical constraints. Ground-response assumptions remain available for review. Seismic fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Keith Bullen's seismic work emphasizes the nearest stations and reported damage. The first arrival looks persuasive. The initial waveform fits the claim. Seismic practice makes the seismic view plausible.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Keith Bullen's seismic work is read within seismic practice as support for an unusual first arrival as evidence of a separate underground explosion before the full network solution. Analyst review appears prudent.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Keith Bullen's seismic authority supports holding the automatic alert until analysts confirm both magnitude and event type. Seismic records fit this seismic account. Seismic timing supports this seismic claim.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        },
        {
          "q": "Which analysis or warning practice is most defensible?",
          "o": [
            {
              "t": "Carry out this seismic practice: combine travel times, density, gravity, and elastic properties in a consistent Earth model. Network timing remains preserved. Seismic context matters. Seismic fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Locate the event from the nearest stations, then refine the source after additional telemetry and site corrections arrive. Seismic timing supports this seismic claim. Seismic context matters.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Use the largest recorded acceleration as the main measure of source size and expected damage across the city. Analyst review appears prudent. Sparse stations can support it. Seismic fits.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Delay the public alert until an analyst settles the final magnitude, reducing the chance of a disruptive unnecessary alarm. Seismic practice makes the seismic view plausible. Seismic context matters.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        },
        {
          "q": "Which principle best follows from the seismic evidence?",
          "o": [
            {
              "t": "The seismological lesson is that hidden structure is inferred from multiple constraints, not one unusual trace. Alert latency stays tied to the waveform chronology.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Rely on the regional hazard map for preparedness even while the real-time sensor network remains thin. Analyst review appears prudent. Sparse stations can support it.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Treat uncertain day-ahead prediction as evidence that rapid earthquake warnings are too unreliable for public action. Seismic practice makes the seismic view plausible.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Attribute the shaking to a concealed blast or an exceptional source before comparing the full waveform with the known fault. Seismic practice makes the seismic view plausible.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        }
      ]
    },
    "byerly": {
      "whatHint": "Byerly's first motions are the clean test: a pressure source pushes outward all around, while a slipping fault throws compression and dilation into opposing quadrants. Plot the polarities before deciding.",
      "sci": "Perry Byerly (1897-1978)",
      "topic": "First motions & fault planes",
      "lede": "The hidden earthquake source became measurable through Perry Byerly’s work on first motions and fault planes.",
      "no": 6,
      "profile": "The seismology briefing today begins with Perry Byerly and first motions and fault planes. Perry Byerly developed methods using the first motion of seismic waves to determine fault-plane solutions. The pattern of initial compressions and dilatations constrains the orientation and style of faulting. Earthquake records mix the rupture, the path through Earth, the local ground, and the instrument. Byerly’s work helped separate those layers so a trace could become physical evidence.\n\nThe analytical step is to combine first-motion polarities from many stations before selecting a focal mechanism. Timing, calibration, station geometry, waveform type, site condition, and uncertainty must be preserved before a source or hazard conclusion is drawn.\n\nEarly warning does not predict an earthquake days ahead. It detects the fast P waves after rupture begins and sends notice before stronger shaking reaches more distant sites. Seconds depend on dense sensors, rapid telemetry, tested algorithms, and institutions willing to transmit the alert.\n\nThe seismic lesson: one seismogram cannot uniquely establish how a fault moved. Networks protect people only when instruments, models, budgets, and message delivery remain parts of the same engineered system. A sensor outage can erase warning time even when later instruments record the earthquake perfectly. Hazard maps summarize probability and ground motion; they do not claim to schedule the next rupture. Automatic alerts require drills with transit, hospitals, utilities, and schools so recipients know what useful seconds permit. Station maintenance records are scientific metadata because outages alter location, magnitude, and warning performance.\n\nByerly's first-motion method is a direct test of the explosion hypothesis. A tectonic shear fault produces quadrants of compression and dilation around the source; an ideal explosion is much more isotropic, with predominantly outward compressional first arrivals and relatively weak shear radiation. Plotting polarities across a network can therefore reject a pressure source even when the epicenter is compact. One station cannot show the pattern; the geometry emerges only from many azimuths.",
      "frame": "Opens a sensor maintenance sheet. \"A dark station records nothing, including its own absence. Explain first motions and fault planes.\"",
      "q": [
        {
          "q": "Which seismological description best captures Perry Byerly’s work on first motions and fault planes?",
          "o": [
            {
              "t": "Perry Byerly developed methods using the first motion of seismic waves to determine fault-plane solutions. Network timing remains preserved. Station geometry remains part of the source estimate. Seismic fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Perry Byerly's seismic work emphasizes the nearest stations and reported damage. The first arrival looks persuasive. The initial waveform fits the claim. Seismic practice makes the seismic view plausible. Seismic fits.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Perry Byerly's seismic work supports an unusual first arrival as evidence of a separate underground explosion before the full network solution. Seismic practice makes the seismic view plausible. The seismic record fits.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Perry Byerly's seismic authority supports holding the automatic alert until analysts confirm both magnitude and event type. Sparse stations can support it. Seismic timing supports this seismic claim. Seismic fits.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        },
        {
          "q": "Which analysis or warning practice is most defensible?",
          "o": [
            {
              "t": "Carry out this seismic practice: combine first-motion polarities from many stations before selecting a focal mechanism. Network timing remains preserved. Seismic fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Locate the event from the nearest stations, then refine the source after additional telemetry and site corrections arrive. Sparse stations can support it. Seismic fits.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Use the largest recorded acceleration as the main measure of source size and expected damage across the city. Seismic practice makes the seismic view plausible.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Delay the public alert until an analyst settles the final magnitude, reducing the chance of a disruptive unnecessary alarm. Seismic timing supports this seismic claim.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        },
        {
          "q": "Which principle best follows from the seismic evidence?",
          "o": [
            {
              "t": "The seismological lesson is that one seismogram cannot uniquely establish how a fault moved. Network timing remains preserved. Site response stays explicit.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Rely on the regional hazard map for preparedness even while the real-time sensor network remains thin. Analyst review appears prudent. Sparse stations can support it.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Treat uncertain day-ahead prediction as evidence that rapid earthquake warnings are too unreliable for public action. Seismic practice makes the seismic view plausible.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Attribute the shaking to a concealed blast or an exceptional source before comparing the full waveform with the known fault. The first arrival looks persuasive.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        }
      ]
    },
    "kanamori": {
      "whatHint": "Kanamori weighs the whole rupture. A generous share of shear (S) energy beside the P energy is the fingerprint of slip on a plane, not a single pressure pulse.",
      "sci": "Hiroo Kanamori (b. 1936)",
      "topic": "The moment magnitude scale",
      "lede": "Hiroo Kanamori read the moment magnitude scale from the timing and shape of waves moving through Earth.",
      "no": 7,
      "profile": "The seismology briefing today begins with Hiroo Kanamori and the moment magnitude scale. Hiroo Kanamori co-developed the moment magnitude scale, tying earthquake size to seismic moment rather than the saturation-prone amplitudes used by older scales. The method better represents very large earthquakes. Earthquake records mix the rupture, the path through Earth, the local ground, and the instrument. Kanamori’s work helped separate those layers so a trace could become physical evidence.\n\nThe analytical step is to estimate seismic moment from fault area, slip, and rock rigidity or equivalent waveform data. Timing, calibration, station geometry, waveform type, site condition, and uncertainty must be preserved before a source or hazard conclusion is drawn.\n\nEarly warning does not predict an earthquake days ahead. It detects the fast P waves after rupture begins and sends notice before stronger shaking reaches more distant sites. Seconds depend on dense sensors, rapid telemetry, tested algorithms, and institutions willing to transmit the alert.\n\nThe seismic lesson: a scale should remain physically meaningful across the largest events. Networks protect people only when instruments, models, budgets, and message delivery remain parts of the same engineered system. A sensor outage can erase warning time even when later instruments record the earthquake perfectly. Hazard maps summarize probability and ground motion; they do not claim to schedule the next rupture. Automatic alerts require drills with transit, hospitals, utilities, and schools so recipients know what useful seconds permit. Station maintenance records are scientific metadata because outages alter location, magnitude, and warning performance. Building resilience depends on codes and retrofit decisions that remain valuable even when no short-term precursor appears.",
      "frame": "Aligns three seismograms at The Network's Budget Office. \"The first arrival bought seconds. Tell me what the moment magnitude scale reveals.\"",
      "q": [
        {
          "q": "Which seismological description best captures Hiroo Kanamori’s work on the moment magnitude scale?",
          "o": [
            {
              "t": "Hiroo Kanamori co-developed the moment magnitude scale, tying earthquake size to seismic moment rather than the saturation-prone amplitudes used by older scales. Network timing remains preserved. Seismic fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Hiroo Kanamori's seismic work emphasizes the nearest stations and reported damage. The initial waveform fits the claim. Seismic practice makes the seismic view plausible. Seismic timing supports this seismic claim.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Hiroo Kanamori's seismic work supports an unusual first arrival as evidence of a separate underground explosion before the full network solution. Seismic practice makes the seismic view plausible. The seismic record fits.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Hiroo Kanamori's seismic authority supports holding the automatic alert until analysts confirm both magnitude and event type. Sparse stations can support it. Seismic timing supports this seismic claim. Seismic fits.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        },
        {
          "q": "Which analysis or warning practice is most defensible?",
          "o": [
            {
              "t": "Carry out this seismic practice: estimate seismic moment from fault area, slip, and rock rigidity or equivalent waveform data. Site response stays explicit. Seismic fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Locate the event from the nearest stations, then refine the source after additional telemetry and site corrections arrive. Sparse stations can support it. Seismic fits.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Use the largest recorded acceleration as the main measure of source size and expected damage across the city. Analyst review appears prudent. The seismic practice fits.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Delay the public alert until an analyst settles the final magnitude, reducing the chance of a disruptive unnecessary alarm. Seismic practice makes the seismic view plausible.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        },
        {
          "q": "Which principle best follows from the seismic evidence?",
          "o": [
            {
              "t": "The seismological lesson is that a scale should remain physically meaningful across the largest events. Alert latency stays tied to the waveform chronology.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Rely on the regional hazard map for preparedness even while the real-time sensor network remains thin. Analyst review appears prudent. Sparse stations can support it.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Treat uncertain day-ahead prediction as evidence that rapid earthquake warnings are too unreliable for public action. Seismic practice makes the seismic view plausible.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Attribute the shaking to a concealed blast or an exceptional source before comparing the full waveform with the known fault. The first arrival looks persuasive.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        }
      ]
    },
    "hanks": {
      "whatHint": "Hanks ties the shaking to stress dropping on a fault. Strong motion that fits frictional slip releasing built-up tectonic stress argues against any one-off release.",
      "sci": "Thomas C. Hanks (b. 1944)",
      "topic": "Strong ground motion & stress drop",
      "lede": "Thomas C. Hanks made strong ground motion and stress drop part of the network that turns ground motion into warning.",
      "no": 8,
      "profile": "The seismology briefing today begins with Thomas C. Hanks and strong ground motion and stress drop. Thomas Hanks studied strong ground motion, stress drop, and earthquake scaling and co-developed moment magnitude with Kanamori. His work linked recorded shaking to engineering and source parameters. Earthquake records mix the rupture, the path through Earth, the local ground, and the instrument. Hanks’s work helped separate those layers so a trace could become physical evidence.\n\nThe analytical step is to compare amplitude, frequency content, duration, and site condition when assessing strong motion. Timing, calibration, station geometry, waveform type, site condition, and uncertainty must be preserved before a source or hazard conclusion is drawn.\n\nEarly warning does not predict an earthquake days ahead. It detects the fast P waves after rupture begins and sends notice before stronger shaking reaches more distant sites. Seconds depend on dense sensors, rapid telemetry, tested algorithms, and institutions willing to transmit the alert.\n\nThe seismic lesson: equal magnitudes can produce very different damaging motions. Networks protect people only when instruments, models, budgets, and message delivery remain parts of the same engineered system. A sensor outage can erase warning time even when later instruments record the earthquake perfectly. Hazard maps summarize probability and ground motion; they do not claim to schedule the next rupture. Automatic alerts require drills with transit, hospitals, utilities, and schools so recipients know what useful seconds permit. Station maintenance records are scientific metadata because outages alter location, magnitude, and warning performance. Building resilience depends on codes and retrofit decisions that remain valuable even when no short-term precursor appears.",
      "frame": "Traces a fault beneath the city map. \"Do not call it unforeseeable until you understand strong ground motion and stress drop.\"",
      "q": [
        {
          "q": "Which seismological description best captures Thomas C. Hanks’s work on strong ground motion and stress drop?",
          "o": [
            {
              "t": "Thomas Hanks studied strong ground motion, stress drop, and earthquake scaling and co-developed moment magnitude with Kanamori. Site response stays explicit. Alert latency stays tied to the waveform chronology. Fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Thomas C. Hanks's treatment of strong ground motion & stress drop uses a seismic simplification: the nearest stations and reported damage, with site response and network geometry treated as later refinements. Context fits.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Thomas C. Hanks's seismic work is read within seismic practice as support for an unusual first arrival as evidence of a separate underground explosion before the full network solution. Seismic timing supports this seismic claim.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Thomas C. Hanks's seismic authority supports holding the automatic alert until analysts confirm both magnitude and event type. The initial waveform fits the claim. Seismic practice makes the seismic view plausible. Fits.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        },
        {
          "q": "Which analysis or warning practice is most defensible?",
          "o": [
            {
              "t": "Carry out this seismic practice: compare amplitude, frequency content, duration, and site condition when assessing strong motion. Seismic fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Locate the event from the nearest stations, then refine the source after additional telemetry and site corrections arrive. The seismic record fits.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Use the largest recorded acceleration as the main measure of source size and expected damage across the city. Sparse stations can support it.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Delay the public alert until an analyst settles the final magnitude, reducing the chance of a disruptive unnecessary alarm. The seismic record fits.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        },
        {
          "q": "Which principle best follows from the seismic evidence?",
          "o": [
            {
              "t": "The seismological lesson is that equal magnitudes can produce very different damaging motions. Network timing remains preserved. Site response stays explicit. Seismic fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Rely on the regional hazard map for preparedness even while the real-time sensor network remains thin. Analyst review appears prudent. Sparse stations can support it.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Treat uncertain day-ahead prediction as evidence that rapid earthquake warnings are too unreliable for public action. Seismic practice makes the seismic view plausible.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Attribute the shaking to a concealed blast or an exceptional source before comparing the full waveform with the known fault. Seismic practice makes the seismic view plausible.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        }
      ]
    },
    "cornell": {
      "whatHint": "Cornell's maps ask where the faults are, not where the wells are. Check whether the source sits on a mapped fault — or suspiciously beside an injection site.",
      "sci": "C. Allin Cornell (1938-2007)",
      "topic": "Probabilistic seismic hazard",
      "lede": "The hidden earthquake source became measurable through C. Allin Cornell’s work on probabilistic seismic hazard.",
      "no": 9,
      "profile": "The seismology briefing today begins with C. Allin Cornell and probabilistic seismic hazard. C. Allin Cornell created the modern framework for probabilistic seismic hazard analysis. It combines possible sources, recurrence, ground-motion models, and uncertainty to estimate the annual probability of exceeding shaking levels. Earthquake records mix the rupture, the path through Earth, the local ground, and the instrument. Cornell’s work helped separate those layers so a trace could become physical evidence.\n\nThe analytical step is to integrate source recurrence and ground-motion uncertainty instead of selecting one scenario. Timing, calibration, station geometry, waveform type, site condition, and uncertainty must be preserved before a source or hazard conclusion is drawn.\n\nEarly warning does not predict an earthquake days ahead. It detects the fast P waves after rupture begins and sends notice before stronger shaking reaches more distant sites. Seconds depend on dense sensors, rapid telemetry, tested algorithms, and institutions willing to transmit the alert.\n\nThe seismic lesson: low annual probability can still justify preparation when consequences are high. Networks protect people only when instruments, models, budgets, and message delivery remain parts of the same engineered system. A sensor outage can erase warning time even when later instruments record the earthquake perfectly. Hazard maps summarize probability and ground motion; they do not claim to schedule the next rupture. Automatic alerts require drills with transit, hospitals, utilities, and schools so recipients know what useful seconds permit. Station maintenance records are scientific metadata because outages alter location, magnitude, and warning performance. Building resilience depends on codes and retrofit decisions that remain valuable even when no short-term precursor appears.",
      "frame": "Opens a sensor maintenance sheet. \"A dark station records nothing, including its own absence. Explain probabilistic seismic hazard.\"",
      "q": [
        {
          "q": "Which seismological description best captures C. Allin Cornell’s work on probabilistic seismic hazard?",
          "o": [
            {
              "t": "C. Network timing remains preserved. Station geometry remains part of the source estimate. Alert latency stays tied to the waveform chronology. Ground-response assumptions remain available for review. Fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "C. Allin Cornell's seismic work emphasizes the nearest stations and reported damage. The first arrival looks persuasive. The initial waveform fits the claim. Seismic practice makes the seismic view plausible.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "C. Allin Cornell's seismic work is read within seismic practice as support for an unusual first arrival as evidence of a separate underground explosion before the full network solution. Analyst review appears prudent.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "C. Allin Cornell's seismic authority supports holding the automatic alert until analysts confirm both magnitude and event type. Sparse stations can support it. Seismic practice makes the seismic view plausible.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        },
        {
          "q": "Which analysis or warning practice is most defensible?",
          "o": [
            {
              "t": "Carry out this seismic practice: integrate source recurrence and ground-motion uncertainty instead of selecting one scenario. Site response stays explicit. Seismic fits. Seismic fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Locate the event from the nearest stations, then refine the source after additional telemetry and site corrections arrive. Sparse stations can support it. Seismic fits. Seismic fits.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Use the largest recorded acceleration as the main measure of source size and expected damage across the city. Seismic practice makes the seismic view plausible. The seismic record fits.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Delay the public alert until an analyst settles the final magnitude, reducing the chance of a disruptive unnecessary alarm. The first arrival looks persuasive. Seismic fits.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        },
        {
          "q": "Which principle best follows from the seismic evidence?",
          "o": [
            {
              "t": "The seismological lesson is that low annual probability can still justify preparation when consequences are high. Ground-response assumptions remain available for review. Seismic fits. Seismic fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Rely on the regional hazard map for preparedness even while the real-time sensor network remains thin. Sparse stations can support it. Seismic timing supports this seismic claim. Seismic fits.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Treat uncertain day-ahead prediction as evidence that rapid earthquake warnings are too unreliable for public action. Analyst review appears prudent. Sparse stations can support it. Seismic fits.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Attribute the shaking to a concealed blast or an exceptional source before comparing the full waveform with the known fault. Seismic practice makes the seismic view plausible. The seismic record fits.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "fieldtech": {
      "fault": "At The Fault Line & Sensor Sites, a moment-source card points Field Tech Odile toward a map of temporary seismometers. \"Seismology rewards exact reading; pass the profile before I release field logs.\"",
      "warncenter": "At The Alert Operations Centre, a moment-source card points Field Tech Odile toward the first-motion display. \"Seismology rewards exact reading; pass the profile before I release field logs.\"",
      "office": "At The Network's Budget Office, a moment-source card points Field Tech Odile toward the network funding archive. \"Seismology rewards exact reading; pass the profile before I release field logs.\""
    },
    "dutyofficer": {
      "fault": "At The Fault Line & Sensor Sites, a moment-source card points The Duty Officer toward a map of temporary seismometers. \"The alert archive remains closed until the source-science lesson is understood.\"",
      "warncenter": "At The Alert Operations Centre, a moment-source card points The Duty Officer toward the first-motion display. \"The alert archive remains closed until the source-science lesson is understood.\"",
      "office": "At The Network's Budget Office, a moment-source card points The Duty Officer toward the network funding archive. \"The alert archive remains closed until the source-science lesson is understood.\""
    },
    "clerk": {
      "fault": "At The Fault Line & Sensor Sites, a moment-source card points The Clerk toward a map of temporary seismometers. \"Master today's seismologist, and the budget record becomes available.\"",
      "warncenter": "At The Alert Operations Centre, a moment-source card points The Clerk toward the first-motion display. \"Master today's seismologist, and the budget record becomes available.\"",
      "office": "At The Network's Budget Office, a moment-source card points The Clerk toward the network funding archive. \"Master today's seismologist, and the budget record becomes available.\""
    }
  },
  "story": [
    "<b>Nine Seconds to Cordera</b> opens inside the Cordera earthquake inquiry, where the visible damage is easier to describe than the chain that produced it.",
    "<b>Field Tech Odile</b>, <b>The Duty Officer</b>, and <b>The Clerk</b> each control a different slice of the record, and each conversation turns one real pioneer into a way of reading the case.",
    "Some witnesses are drawn toward <b>An underground explosion produced a compact pressure-dominated source.</b>; others settle too quickly on <b>Fluid injection triggered slip on a previously stressed fault.</b>. Your job is to separate those tempting stories from the harder explanation the evidence supports.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide what the case is really about."
  ],
  "endings": {
    "overclaimWhat": "blast",
    "dismissalWhat": "freak",
    "win": {
      "expertTitle": "A Shear Fault, Not a Pressure Source",
      "expert": [
        "Investigator Mara Solveig names Roan Vesk — seismic-network director, The Network's Budget Office, and Tectonic shear rupture produced a double-couple radiation pattern. Not An underground explosion produced a compact pressure-dominated source. Not Fluid injection triggered slip on a previously stressed fault.",
        "The readings distinguish an isotropic explosion, injection-triggered slip, and tectonic double-couple rupture using first-motion polarity, P-to-S energy, source depth, spatial association, and aftershock geometry."
      ],
      "soundTitle": "A Sound Source-Mechanism Finding",
      "sound": [
        "Moment evidence fixes the trio: Roan Vesk — seismic-network director; The Network's Budget Office; Tectonic shear rupture produced a double-couple radiation pattern.",
        "Waveform interpretation is sound, even though the budget chronology has not been completely assembled."
      ],
      "namedTitle": "Correct Physics, Sparse Chain",
      "named": [
        "Moment evidence points to Roan Vesk — seismic-network director, The Network's Budget Office, and Tectonic shear rupture produced a double-couple radiation pattern; moment support remains incomplete.",
        "The source mechanism is correct, but an accusation this lightly supported cannot anchor the bulletin."
      ]
    },
    "overclaim": {
      "title": "The Explosion Hypothesis",
      "body": [
        "Investigator Mara Solveig identifies An underground explosion produced a compact pressure-dominated source. First-motion polarity rejects an isotropic pressure source.",
        "An explosion radiates predominantly compressional energy from a compact pressure source and tends to show outward first motions. The observed mixed polarities and strong shear radiation fit fault slip instead."
      ]
    },
    "dismissal": {
      "title": "The Injection-Triggered Hypothesis",
      "body": [
        "Investigator Mara Solveig instead argues Fluid injection triggered slip on a previously stressed fault. No injection source or migrating sequence matches the hypocenter.",
        "Induced seismicity requires a plausible injection history and a spatial-temporal migration from wells or reservoirs. No such pressure source or migration aligns with the rupture."
      ]
    },
    "wrongNames": {
      "title": "Right Source, Wrong Names",
      "body": [
        "Tectonic rupture is identified correctly, but the responsible person or location is wrong. Reassemble the network clue chain."
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A fault scarp and seismic trace\"><path d=\"M0 86 L200 86 L258 48 L350 118 L470 76 L660 76\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.6\"/><path d=\"M258 48 L258 126\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2.2\" stroke-dasharray=\"4 4\"/><path d=\"M24 30 L180 30\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.3\"/><path d=\"M24 30 C46 30,52 18,70 18 C88 18,96 42,120 42 C138 42,146 24,168 24 C186 24,194 34,212 34 C228 34,238 10,262 10 C282 10,292 48,320 48 C336 48,350 30,374 30 C394 30,404 22,424 22 C450 22,458 46,482 46 C504 46,512 18,534 18 C558 18,568 36,588 36 C610 36,616 26,636 26\" fill=\"none\" stroke=\"#326891\" stroke-width=\"1.8\"/><circle cx=\"258\" cy=\"48\" r=\"5\" fill=\"#B3261E\"/><path d=\"M370 92 C420 58,500 60,548 92\" fill=\"none\" stroke=\"#e2e2d8\" stroke-width=\"1\"/><path d=\"M390 102 C430 78,490 78,530 102\" fill=\"none\" stroke=\"#e2e2d8\" stroke-width=\"1\"/></svg>"
}};
