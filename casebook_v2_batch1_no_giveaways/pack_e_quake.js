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
  "boardNarr": "You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  "placeNarr": "You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
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
        "mallet",
        "milne"
      ],
      "dutyofficer": [
        "wiechert",
        "omori"
      ],
      "clerk": [
        "reid",
        "moho"
      ]
    },
    "warncenter": {
      "fieldtech": [
        "gutenberg",
        "jeffreys"
      ],
      "dutyofficer": [
        "bullen",
        "wadati"
      ],
      "clerk": [
        "byerly",
        "press"
      ]
    },
    "office": {
      "fieldtech": [
        "kanamori",
        "aki"
      ],
      "dutyofficer": [
        "hanks",
        "housner"
      ],
      "clerk": [
        "cornell",
        "mogi"
      ]
    }
  },
  "TOPICS": {
    "mallet": {
      "sci": "Robert Mallet (1810-1881)",
      "topic": "The founding of seismology",
      "lede": "Robert Mallet read the founding of seismology from the timing and shape of waves moving through Earth.",
      "no": 1,
      "profile": "The seismology briefing today begins with Robert Mallet and the founding of seismology. Robert Mallet studied earthquake waves, coined much of the early vocabulary of seismology, and surveyed the 1857 Basilicata earthquake in Italy. He used damage direction and intensity observations to infer the source region. Earthquake records mix the rupture, the path through Earth, the local ground, and the instrument. Mallet’s work helped separate those layers so a trace could become physical evidence.\n\nThe analytical step is to map effects systematically and distinguish source, path, and local-site contributions. Timing, calibration, station geometry, waveform type, site condition, and uncertainty must be preserved before a source or hazard conclusion is drawn.\n\nEarly warning does not predict an earthquake days ahead. It detects the fast P waves after rupture begins and sends notice before stronger shaking reaches more distant sites. Seconds depend on dense sensors, rapid telemetry, tested algorithms, and institutions willing to transmit the alert.\n\nThe seismic lesson: earthquakes leave measurable patterns that are more informative than rumor. Networks protect people only when instruments, models, budgets, and message delivery remain parts of the same engineered system. A sensor outage can erase warning time even when later instruments record the earthquake perfectly. Hazard maps summarize probability and ground motion; they do not claim to schedule the next rupture. Automatic alerts require drills with transit, hospitals, utilities, and schools so recipients know what useful seconds permit. Station maintenance records are scientific metadata because outages alter location, magnitude, and warning performance. Building resilience depends on codes and retrofit decisions that remain valuable even when no short-term precursor appears.",
      "frame": "Field Tech Odile aligns three seismograms at The Fault Line & Sensor Sites. \"The first arrival bought seconds. Tell me what the founding of seismology reveals.\"",
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
    "milne": {
      "sci": "John Milne (1850-1913)",
      "topic": "The modern seismograph",
      "lede": "The hidden earthquake source became measurable through John Milne’s work on the modern seismograph.",
      "no": 2,
      "profile": "The seismology briefing today begins with John Milne and the modern seismograph. John Milne helped develop practical seismographs in Japan and organized an international network of instruments. His horizontal-pendulum designs recorded distant earthquakes and supported global comparison of arrival times. Earthquake records mix the rupture, the path through Earth, the local ground, and the instrument. Milne’s work helped separate those layers so a trace could become physical evidence.\n\nThe analytical step is to maintain synchronized stations and compare wave arrivals across distance. Timing, calibration, station geometry, waveform type, site condition, and uncertainty must be preserved before a source or hazard conclusion is drawn.\n\nEarly warning does not predict an earthquake days ahead. It detects the fast P waves after rupture begins and sends notice before stronger shaking reaches more distant sites. Seconds depend on dense sensors, rapid telemetry, tested algorithms, and institutions willing to transmit the alert.\n\nThe seismic lesson: a network provides information no isolated sensor can supply. Networks protect people only when instruments, models, budgets, and message delivery remain parts of the same engineered system. A sensor outage can erase warning time even when later instruments record the earthquake perfectly. Hazard maps summarize probability and ground motion; they do not claim to schedule the next rupture. Automatic alerts require drills with transit, hospitals, utilities, and schools so recipients know what useful seconds permit. Station maintenance records are scientific metadata because outages alter location, magnitude, and warning performance. Building resilience depends on codes and retrofit decisions that remain valuable even when no short-term precursor appears.",
      "frame": "Field Tech Odile opens a sensor maintenance sheet. \"A dark station records nothing, including its own absence. Explain the modern seismograph.\"",
      "q": [
        {
          "q": "Which seismological description best captures John Milne’s work on the modern seismograph?",
          "o": [
            {
              "t": "John Milne helped develop practical seismographs in Japan and organized an international network of instruments. Network timing remains preserved.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "John Milne's seismic work emphasizes the nearest stations and reported damage. Analyst review appears prudent. Sparse stations can support it.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "John Milne's seismic work supports an unusual first arrival as evidence of a separate underground explosion before the full network solution.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "John Milne's authority is invoked in seismic practice to justify holding the automatic alert until analysts confirm both magnitude and event type.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        },
        {
          "q": "Which analysis or warning practice is most defensible?",
          "o": [
            {
              "t": "Carry out this seismic practice: maintain synchronized stations and compare wave arrivals across distance. Site response stays explicit. Seismic fits.",
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
              "t": "The seismological lesson is that a network provides information no isolated sensor can supply. Network timing remains preserved. Site response stays explicit. Seismic fits.",
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
      "sci": "Emil Wiechert (1861-1928)",
      "topic": "The seismograph & Earth's interior",
      "lede": "Emil Wiechert made the seismograph and earth’s interior part of the network that turns ground motion into warning.",
      "no": 3,
      "profile": "The seismology briefing today begins with Emil Wiechert and the seismograph and earth’s interior. Emil Wiechert designed high-mass seismographs and used earthquake waves to investigate Earth's interior. He was an early proponent of a dense metallic core inside a lighter mantle. Earthquake records mix the rupture, the path through Earth, the local ground, and the instrument. Wiechert’s work helped separate those layers so a trace could become physical evidence.\n\nThe analytical step is to use calibrated instruments and travel times to infer hidden layers. Timing, calibration, station geometry, waveform type, site condition, and uncertainty must be preserved before a source or hazard conclusion is drawn.\n\nEarly warning does not predict an earthquake days ahead. It detects the fast P waves after rupture begins and sends notice before stronger shaking reaches more distant sites. Seconds depend on dense sensors, rapid telemetry, tested algorithms, and institutions willing to transmit the alert.\n\nThe seismic lesson: the instrument response must be known before the ground motion can be interpreted. Networks protect people only when instruments, models, budgets, and message delivery remain parts of the same engineered system. A sensor outage can erase warning time even when later instruments record the earthquake perfectly. Hazard maps summarize probability and ground motion; they do not claim to schedule the next rupture. Automatic alerts require drills with transit, hospitals, utilities, and schools so recipients know what useful seconds permit. Station maintenance records are scientific metadata because outages alter location, magnitude, and warning performance. Building resilience depends on codes and retrofit decisions that remain valuable even when no short-term precursor appears.",
      "frame": "The Duty Officer traces a fault beneath the city map. \"Do not call it unforeseeable until you understand the seismograph and earth’s interior.\"",
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
    "omori": {
      "sci": "Fusakichi Omori (1868-1923)",
      "topic": "Omori's law of aftershocks",
      "lede": "Fusakichi Omori read omori’s law of aftershocks from the timing and shape of waves moving through Earth.",
      "no": 4,
      "profile": "The seismology briefing today begins with Fusakichi Omori and omori’s law of aftershocks. Fusakichi Omori found that aftershock frequency generally decays with time after a mainshock, a relation now called Omori's law. He also studied earthquake damage and helped build Japanese seismology. Earthquake records mix the rupture, the path through Earth, the local ground, and the instrument. Omori’s work helped separate those layers so a trace could become physical evidence.\n\nThe analytical step is to model aftershock rate as a decaying process while updating it with observations. Timing, calibration, station geometry, waveform type, site condition, and uncertainty must be preserved before a source or hazard conclusion is drawn.\n\nEarly warning does not predict an earthquake days ahead. It detects the fast P waves after rupture begins and sends notice before stronger shaking reaches more distant sites. Seconds depend on dense sensors, rapid telemetry, tested algorithms, and institutions willing to transmit the alert.\n\nThe seismic lesson: risk remains elevated after the main shock even though activity usually declines. Networks protect people only when instruments, models, budgets, and message delivery remain parts of the same engineered system. A sensor outage can erase warning time even when later instruments record the earthquake perfectly. Hazard maps summarize probability and ground motion; they do not claim to schedule the next rupture. Automatic alerts require drills with transit, hospitals, utilities, and schools so recipients know what useful seconds permit. Station maintenance records are scientific metadata because outages alter location, magnitude, and warning performance. Building resilience depends on codes and retrofit decisions that remain valuable even when no short-term precursor appears.",
      "frame": "The Duty Officer aligns three seismograms at The Fault Line & Sensor Sites. \"The first arrival bought seconds. Tell me what omori’s law of aftershocks reveals.\"",
      "q": [
        {
          "q": "Which seismological description best captures Fusakichi Omori’s work on omori’s law of aftershocks?",
          "o": [
            {
              "t": "Fusakichi Omori found that aftershock frequency generally decays with time after a mainshock, a relation now called Omori's law. Ground-response assumptions remain available for review.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Fusakichi Omori's seismic work relies on the nearest stations and reported damage. Analyst review appears prudent. Sparse stations can support it. Seismic timing supports this seismic claim.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Fusakichi Omori's seismic work supports an unusual first arrival as evidence of a separate underground explosion before the full network solution. Seismic timing supports this seismic claim.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Fusakichi Omori's authority is invoked in seismic practice to justify holding the automatic alert until analysts confirm both magnitude and event type. Sparse stations can support it.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        },
        {
          "q": "Which analysis or warning practice is most defensible?",
          "o": [
            {
              "t": "Carry out this seismic practice: model aftershock rate as a decaying process while updating it with observations. Alert latency stays tied to the waveform chronology. Seismic fits. Seismic fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Locate the event from the nearest stations, then refine the source after additional telemetry and site corrections arrive. Seismic practice makes the seismic view plausible. The seismic record fits.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Use the largest recorded acceleration as the main measure of source size and expected damage across the city. Analyst review appears prudent. Sparse stations can support it. Seismic fits.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Delay the public alert until an analyst settles the final magnitude, reducing the chance of a disruptive unnecessary alarm. Seismic practice makes the seismic view plausible. The seismic record fits.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        },
        {
          "q": "Which principle best follows from the seismic evidence?",
          "o": [
            {
              "t": "The seismological lesson is that risk remains elevated after the main shock even though activity usually declines. Station geometry remains part of the source estimate. Seismic fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Rely on the regional hazard map for preparedness even while the real-time sensor network remains thin. Analyst review appears prudent. Sparse stations can support it. Seismic fits. Seismic fits.",
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
      "sci": "Harry Fielding Reid (1859-1944)",
      "topic": "Elastic rebound & fault rupture",
      "lede": "The hidden earthquake source became measurable through Harry Fielding Reid’s work on elastic rebound and fault rupture.",
      "no": 5,
      "profile": "The seismology briefing today begins with Harry Fielding Reid and elastic rebound and fault rupture. Harry Fielding Reid developed elastic-rebound theory after studying the 1906 San Francisco earthquake. Survey measurements showed crustal strain accumulating across the fault and being released when the fault slipped. Earthquake records mix the rupture, the path through Earth, the local ground, and the instrument. Reid’s work helped separate those layers so a trace could become physical evidence.\n\nThe analytical step is to compare pre- and post-earthquake deformation to reconstruct fault motion. Timing, calibration, station geometry, waveform type, site condition, and uncertainty must be preserved before a source or hazard conclusion is drawn.\n\nEarly warning does not predict an earthquake days ahead. It detects the fast P waves after rupture begins and sends notice before stronger shaking reaches more distant sites. Seconds depend on dense sensors, rapid telemetry, tested algorithms, and institutions willing to transmit the alert.\n\nThe seismic lesson: earthquakes release stored strain rather than appearing without a physical history. Networks protect people only when instruments, models, budgets, and message delivery remain parts of the same engineered system. A sensor outage can erase warning time even when later instruments record the earthquake perfectly. Hazard maps summarize probability and ground motion; they do not claim to schedule the next rupture. Automatic alerts require drills with transit, hospitals, utilities, and schools so recipients know what useful seconds permit. Station maintenance records are scientific metadata because outages alter location, magnitude, and warning performance. Building resilience depends on codes and retrofit decisions that remain valuable even when no short-term precursor appears.",
      "frame": "The Clerk opens a sensor maintenance sheet. \"A dark station records nothing, including its own absence. Explain elastic rebound and fault rupture.\"",
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
    "moho": {
      "sci": "Andrija Mohorovičić (1857-1936)",
      "topic": "The crust-mantle boundary",
      "lede": "Andrija Mohorovičić made the crust-mantle boundary part of the network that turns ground motion into warning.",
      "no": 6,
      "profile": "The seismology briefing today begins with Andrija Mohorovičić and the crust-mantle boundary. Andrija Mohorovičić recognized that earthquake waves arriving at different times could be explained by refraction at a boundary between crust and faster mantle. The Mohorovičić discontinuity, or Moho, became a basic feature of Earth structure. Earthquake records mix the rupture, the path through Earth, the local ground, and the instrument. Mohorovičić’s work helped separate those layers so a trace could become physical evidence.\n\nThe analytical step is to plot travel time against distance and identify changes in wave speed and path. Timing, calibration, station geometry, waveform type, site condition, and uncertainty must be preserved before a source or hazard conclusion is drawn.\n\nEarly warning does not predict an earthquake days ahead. It detects the fast P waves after rupture begins and sends notice before stronger shaking reaches more distant sites. Seconds depend on dense sensors, rapid telemetry, tested algorithms, and institutions willing to transmit the alert.\n\nThe seismic lesson: apparent extra arrivals can reveal structure rather than separate explosions. Networks protect people only when instruments, models, budgets, and message delivery remain parts of the same engineered system. A sensor outage can erase warning time even when later instruments record the earthquake perfectly. Hazard maps summarize probability and ground motion; they do not claim to schedule the next rupture. Automatic alerts require drills with transit, hospitals, utilities, and schools so recipients know what useful seconds permit. Station maintenance records are scientific metadata because outages alter location, magnitude, and warning performance.",
      "frame": "The Clerk traces a fault beneath the city map. \"Do not call it unforeseeable until you understand the crust-mantle boundary.\"",
      "q": [
        {
          "q": "Which seismological description best captures Andrija Mohorovičić’s work on the crust-mantle boundary?",
          "o": [
            {
              "t": "Andrija Mohorovičić recognized that earthquake waves arriving at different times could be explained by refraction at a boundary between crust and faster mantle.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Andrija Mohorovičić's seismic work emphasizes the nearest stations and reported damage. Sparse stations can support it. Seismic practice makes the seismic view plausible.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Andrija Mohorovičić's seismic work supports an unusual first arrival as evidence of a separate underground explosion before the full network solution. Seismic fits.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Andrija Mohorovičić's authority is invoked in seismic practice to justify holding the automatic alert until analysts confirm both magnitude and event type. Seismic fits.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        },
        {
          "q": "Which analysis or warning practice is most defensible?",
          "o": [
            {
              "t": "Carry out this seismic practice: plot travel time against distance and identify changes in wave speed and path. Alert latency stays tied to the waveform chronology. Seismic context matters.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Locate the event from the nearest stations, then refine the source after additional telemetry and site corrections arrive. Seismic practice makes the seismic view plausible. The seismic record fits.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Use the largest recorded acceleration as the main measure of source size and expected damage across the city. Analyst review appears prudent. Sparse stations can support it. Seismic fits.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Delay the public alert until an analyst settles the final magnitude, reducing the chance of a disruptive unnecessary alarm. Seismic practice makes the seismic view plausible. The seismic record fits.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        },
        {
          "q": "Which principle best follows from the seismic evidence?",
          "o": [
            {
              "t": "The seismological lesson is that apparent extra arrivals can reveal structure rather than separate explosions. Alert latency stays tied to the waveform chronology.",
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
    "gutenberg": {
      "sci": "Beno Gutenberg (1889-1960)",
      "topic": "Earth's core & the magnitude scale",
      "lede": "Beno Gutenberg read earth’s core and the magnitude scale from the timing and shape of waves moving through Earth.",
      "no": 7,
      "profile": "The seismology briefing today begins with Beno Gutenberg and earth’s core and the magnitude scale. Beno Gutenberg used seismic travel times to determine the depth of the core-mantle boundary and, with Charles Richter, developed earthquake magnitude relations. His work connected global seismograms with source size and Earth structure. Earthquake records mix the rupture, the path through Earth, the local ground, and the instrument. Gutenberg’s work helped separate those layers so a trace could become physical evidence.\n\nThe analytical step is to separate magnitude, intensity, distance, and instrument response. Timing, calibration, station geometry, waveform type, site condition, and uncertainty must be preserved before a source or hazard conclusion is drawn.\n\nEarly warning does not predict an earthquake days ahead. It detects the fast P waves after rupture begins and sends notice before stronger shaking reaches more distant sites. Seconds depend on dense sensors, rapid telemetry, tested algorithms, and institutions willing to transmit the alert.\n\nThe seismic lesson: one numerical magnitude does not describe every local consequence. Networks protect people only when instruments, models, budgets, and message delivery remain parts of the same engineered system. A sensor outage can erase warning time even when later instruments record the earthquake perfectly. Hazard maps summarize probability and ground motion; they do not claim to schedule the next rupture. Automatic alerts require drills with transit, hospitals, utilities, and schools so recipients know what useful seconds permit. Station maintenance records are scientific metadata because outages alter location, magnitude, and warning performance. Building resilience depends on codes and retrofit decisions that remain valuable even when no short-term precursor appears.",
      "frame": "Field Tech Odile aligns three seismograms at The Alert Operations Centre. \"The first arrival bought seconds. Tell me what earth’s core and the magnitude scale reveals.\"",
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
    "jeffreys": {
      "sci": "Harold Jeffreys (1891-1989)",
      "topic": "Travel times & the liquid core",
      "lede": "The hidden earthquake source became measurable through Harold Jeffreys’s work on travel times and the liquid core.",
      "no": 8,
      "profile": "The seismology briefing today begins with Harold Jeffreys and travel times and the liquid core. Harold Jeffreys analyzed seismic travel times and argued convincingly that Earth's outer core is liquid because shear waves do not pass through it. His tables became standard tools for locating earthquakes and studying the planet. Earthquake records mix the rupture, the path through Earth, the local ground, and the instrument. Jeffreys’s work helped separate those layers so a trace could become physical evidence.\n\nThe analytical step is to compare predicted and observed P- and S-wave arrivals across a global network. Timing, calibration, station geometry, waveform type, site condition, and uncertainty must be preserved before a source or hazard conclusion is drawn.\n\nEarly warning does not predict an earthquake days ahead. It detects the fast P waves after rupture begins and sends notice before stronger shaking reaches more distant sites. Seconds depend on dense sensors, rapid telemetry, tested algorithms, and institutions willing to transmit the alert.\n\nThe seismic lesson: missing wave phases can be positive evidence about material properties. Networks protect people only when instruments, models, budgets, and message delivery remain parts of the same engineered system. A sensor outage can erase warning time even when later instruments record the earthquake perfectly. Hazard maps summarize probability and ground motion; they do not claim to schedule the next rupture. Automatic alerts require drills with transit, hospitals, utilities, and schools so recipients know what useful seconds permit. Station maintenance records are scientific metadata because outages alter location, magnitude, and warning performance.",
      "frame": "Field Tech Odile opens a sensor maintenance sheet. \"A dark station records nothing, including its own absence. Explain travel times and the liquid core.\"",
      "q": [
        {
          "q": "Which seismological description best captures Harold Jeffreys’s work on travel times and the liquid core?",
          "o": [
            {
              "t": "Harold Jeffreys analyzed seismic travel times and argued convincingly that Earth's outer core is liquid because shear waves do not pass through it. Alert latency stays tied to the waveform chronology. Seismic context matters.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Harold Jeffreys's seismic work emphasizes the nearest stations and reported damage. The first arrival looks persuasive. The initial waveform fits the claim. Seismic practice makes the seismic view plausible. The seismic record fits.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Harold Jeffreys's seismic work is read within seismic practice as support for an unusual first arrival as evidence of a separate underground explosion before the full network solution. The first arrival looks persuasive. Seismic fits.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Harold Jeffreys's seismic authority supports holding the automatic alert until analysts confirm both magnitude and event type. Seismic context supports the view. Seismic timing supports this seismic claim. The seismic record fits.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        },
        {
          "q": "Which analysis or warning practice is most defensible?",
          "o": [
            {
              "t": "Carry out this seismic practice: compare predicted and observed P- and S-wave arrivals across a global network. Alert latency stays tied to the waveform chronology. Seismic context matters.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Locate the event from the nearest stations, then refine the source after additional telemetry and site corrections arrive. Seismic practice makes the seismic view plausible. The seismic record fits.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Use the largest recorded acceleration as the main measure of source size and expected damage across the city. Analyst review appears prudent. Sparse stations can support it. Seismic fits.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Delay the public alert until an analyst settles the final magnitude, reducing the chance of a disruptive unnecessary alarm. Seismic practice makes the seismic view plausible. The seismic record fits.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        },
        {
          "q": "Which principle best follows from the seismic evidence?",
          "o": [
            {
              "t": "The seismological lesson is that missing wave phases can be positive evidence about material properties. Alert latency stays tied to the waveform chronology. Seismic fits.",
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
    "bullen": {
      "sci": "Keith Bullen (1906-1976)",
      "topic": "The layered model of the Earth",
      "lede": "Keith Bullen made the layered model of the earth part of the network that turns ground motion into warning.",
      "no": 9,
      "profile": "The seismology briefing today begins with Keith Bullen and the layered model of the earth. Keith Bullen developed density and velocity models for Earth's layered interior using seismological observations and physical constraints. His classifications helped organize mantle and core regions. Earthquake records mix the rupture, the path through Earth, the local ground, and the instrument. Bullen’s work helped separate those layers so a trace could become physical evidence.\n\nThe analytical step is to combine travel times, density, gravity, and elastic properties in a consistent Earth model. Timing, calibration, station geometry, waveform type, site condition, and uncertainty must be preserved before a source or hazard conclusion is drawn.\n\nEarly warning does not predict an earthquake days ahead. It detects the fast P waves after rupture begins and sends notice before stronger shaking reaches more distant sites. Seconds depend on dense sensors, rapid telemetry, tested algorithms, and institutions willing to transmit the alert.\n\nThe seismic lesson: hidden structure is inferred from multiple constraints, not one unusual trace. Networks protect people only when instruments, models, budgets, and message delivery remain parts of the same engineered system. A sensor outage can erase warning time even when later instruments record the earthquake perfectly. Hazard maps summarize probability and ground motion; they do not claim to schedule the next rupture. Automatic alerts require drills with transit, hospitals, utilities, and schools so recipients know what useful seconds permit. Station maintenance records are scientific metadata because outages alter location, magnitude, and warning performance. Building resilience depends on codes and retrofit decisions that remain valuable even when no short-term precursor appears.",
      "frame": "The Duty Officer traces a fault beneath the city map. \"Do not call it unforeseeable until you understand the layered model of the earth.\"",
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
    "wadati": {
      "sci": "Kiyoo Wadati (1902-1995)",
      "topic": "Deep earthquakes & the dipping zone",
      "lede": "Kiyoo Wadati read deep earthquakes and the dipping zone from the timing and shape of waves moving through Earth.",
      "no": 10,
      "profile": "The seismology briefing today begins with Kiyoo Wadati and deep earthquakes and the dipping zone. Kiyoo Wadati documented deep earthquakes beneath Japan and identified the dipping seismic zone later associated with subduction. His work anticipated the Wadati-Benioff zone central to plate tectonics. Earthquake records mix the rupture, the path through Earth, the local ground, and the instrument. Wadati’s work helped separate those layers so a trace could become physical evidence.\n\nThe analytical step is to plot earthquake depth and location in cross-section to reveal a coherent dipping zone. Timing, calibration, station geometry, waveform type, site condition, and uncertainty must be preserved before a source or hazard conclusion is drawn.\n\nEarly warning does not predict an earthquake days ahead. It detects the fast P waves after rupture begins and sends notice before stronger shaking reaches more distant sites. Seconds depend on dense sensors, rapid telemetry, tested algorithms, and institutions willing to transmit the alert.\n\nThe seismic lesson: earthquake distribution maps active structures below the surface. Networks protect people only when instruments, models, budgets, and message delivery remain parts of the same engineered system. A sensor outage can erase warning time even when later instruments record the earthquake perfectly. Hazard maps summarize probability and ground motion; they do not claim to schedule the next rupture. Automatic alerts require drills with transit, hospitals, utilities, and schools so recipients know what useful seconds permit. Station maintenance records are scientific metadata because outages alter location, magnitude, and warning performance. Building resilience depends on codes and retrofit decisions that remain valuable even when no short-term precursor appears.",
      "frame": "The Duty Officer aligns three seismograms at The Alert Operations Centre. \"The first arrival bought seconds. Tell me what deep earthquakes and the dipping zone reveals.\"",
      "q": [
        {
          "q": "Which seismological description best captures Kiyoo Wadati’s work on deep earthquakes and the dipping zone?",
          "o": [
            {
              "t": "Kiyoo Wadati documented deep earthquakes beneath Japan and identified the dipping seismic zone later associated with subduction. Network timing remains preserved. Alert latency stays tied to the waveform chronology. Seismic fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Kiyoo Wadati's seismic work relies on the nearest stations and reported damage. Analyst review appears prudent. Sparse stations can support it. Seismic records fit this seismic account. Seismic timing supports this seismic claim.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Kiyoo Wadati's seismic work supports an unusual first arrival as evidence of a separate underground explosion before the full network solution. Seismic records fit this seismic account. Seismic timing supports this seismic claim.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Kiyoo Wadati's authority is invoked in seismic practice to justify holding the automatic alert until analysts confirm both magnitude and event type. Analyst review appears prudent. Sparse stations can support it. Seismic fits.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        },
        {
          "q": "Which analysis or warning practice is most defensible?",
          "o": [
            {
              "t": "Carry out this seismic practice: plot earthquake depth and location in cross-section to reveal a coherent dipping zone. Network timing remains preserved. Seismic fits.",
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
              "t": "The seismological lesson is that earthquake distribution maps active structures below the surface. Ground-response assumptions remain available for review. Seismic fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Rely on the regional hazard map for preparedness even while the real-time sensor network remains thin. Analyst review appears prudent. Sparse stations can support it.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Treat uncertain day-ahead prediction as evidence that rapid earthquake warnings are too unreliable for public action. The first arrival looks persuasive. Seismic context matters.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Attribute the shaking to a concealed blast or an exceptional source before comparing the full waveform with the known fault. Seismic timing supports this seismic claim.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        }
      ]
    },
    "byerly": {
      "sci": "Perry Byerly (1897-1978)",
      "topic": "First motions & fault planes",
      "lede": "The hidden earthquake source became measurable through Perry Byerly’s work on first motions and fault planes.",
      "no": 11,
      "profile": "The seismology briefing today begins with Perry Byerly and first motions and fault planes. Perry Byerly developed methods using the first motion of seismic waves to determine fault-plane solutions. The pattern of initial compressions and dilatations constrains the orientation and style of faulting. Earthquake records mix the rupture, the path through Earth, the local ground, and the instrument. Byerly’s work helped separate those layers so a trace could become physical evidence.\n\nThe analytical step is to combine first-motion polarities from many stations before selecting a focal mechanism. Timing, calibration, station geometry, waveform type, site condition, and uncertainty must be preserved before a source or hazard conclusion is drawn.\n\nEarly warning does not predict an earthquake days ahead. It detects the fast P waves after rupture begins and sends notice before stronger shaking reaches more distant sites. Seconds depend on dense sensors, rapid telemetry, tested algorithms, and institutions willing to transmit the alert.\n\nThe seismic lesson: one seismogram cannot uniquely establish how a fault moved. Networks protect people only when instruments, models, budgets, and message delivery remain parts of the same engineered system. A sensor outage can erase warning time even when later instruments record the earthquake perfectly. Hazard maps summarize probability and ground motion; they do not claim to schedule the next rupture. Automatic alerts require drills with transit, hospitals, utilities, and schools so recipients know what useful seconds permit. Station maintenance records are scientific metadata because outages alter location, magnitude, and warning performance.\n\nByerly's first-motion method is a direct test of the explosion hypothesis. A tectonic shear fault produces quadrants of compression and dilation around the source; an ideal explosion is much more isotropic, with predominantly outward compressional first arrivals and relatively weak shear radiation. Plotting polarities across a network can therefore reject a pressure source even when the epicenter is compact. One station cannot show the pattern; the geometry emerges only from many azimuths.",
      "frame": "The Clerk opens a sensor maintenance sheet. \"A dark station records nothing, including its own absence. Explain first motions and fault planes.\"",
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
    "press": {
      "sci": "Frank Press (1924-2020)",
      "topic": "Surface waves & the deep Earth",
      "lede": "Frank Press made surface waves and the deep earth part of the network that turns ground motion into warning.",
      "no": 12,
      "profile": "The seismology briefing today begins with Frank Press and surface waves and the deep earth. Frank Press advanced studies of surface waves, Earth structure, and seismic instrumentation and helped establish global monitoring networks. Surface-wave dispersion provided information about crust and upper-mantle structure. Earthquake records mix the rupture, the path through Earth, the local ground, and the instrument. Press’s work helped separate those layers so a trace could become physical evidence.\n\nThe analytical step is to measure how wave speed varies with period to infer depth-dependent structure. Timing, calibration, station geometry, waveform type, site condition, and uncertainty must be preserved before a source or hazard conclusion is drawn.\n\nEarly warning does not predict an earthquake days ahead. It detects the fast P waves after rupture begins and sends notice before stronger shaking reaches more distant sites. Seconds depend on dense sensors, rapid telemetry, tested algorithms, and institutions willing to transmit the alert.\n\nThe seismic lesson: different portions of a seismogram carry different kinds of information. Networks protect people only when instruments, models, budgets, and message delivery remain parts of the same engineered system. A sensor outage can erase warning time even when later instruments record the earthquake perfectly. Hazard maps summarize probability and ground motion; they do not claim to schedule the next rupture. Automatic alerts require drills with transit, hospitals, utilities, and schools so recipients know what useful seconds permit. Station maintenance records are scientific metadata because outages alter location, magnitude, and warning performance. Building resilience depends on codes and retrofit decisions that remain valuable even when no short-term precursor appears.",
      "frame": "The Clerk traces a fault beneath the city map. \"Do not call it unforeseeable until you understand surface waves and the deep earth.\"",
      "q": [
        {
          "q": "Which seismological description best captures Frank Press’s work on surface waves and the deep earth?",
          "o": [
            {
              "t": "Frank Press advanced studies of surface waves, Earth structure, and seismic instrumentation and helped establish global monitoring networks. Alert latency stays tied to the waveform chronology. Seismic fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Frank Press's seismic work emphasizes the nearest stations and reported damage. The first arrival looks persuasive. The initial waveform fits the claim. Seismic practice makes the seismic view plausible. Seismic fits.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Frank Press's seismic work supports an unusual first arrival as evidence of a separate underground explosion before the full network solution. Seismic practice makes the seismic view plausible. The seismic record fits.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Frank Press's seismic authority supports holding the automatic alert until analysts confirm both magnitude and event type. Sparse stations can support it. Seismic timing supports this seismic claim. Seismic fits.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        },
        {
          "q": "Which analysis or warning practice is most defensible?",
          "o": [
            {
              "t": "Carry out this seismic practice: measure how wave speed varies with period to infer depth-dependent structure. Site response stays explicit. Seismic fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Locate the event from the nearest stations, then refine the source after additional telemetry and site corrections arrive. The context fits. Seismic fits.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Use the largest recorded acceleration as the main measure of source size and expected damage across the city. Seismic timing supports this seismic claim.",
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
              "t": "The seismological lesson is that different portions of a seismogram carry different kinds of information. Alert latency stays tied to the waveform chronology. Seismic fits.",
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
    "kanamori": {
      "sci": "Hiroo Kanamori (b. 1936)",
      "topic": "The moment magnitude scale",
      "lede": "Hiroo Kanamori read the moment magnitude scale from the timing and shape of waves moving through Earth.",
      "no": 13,
      "profile": "The seismology briefing today begins with Hiroo Kanamori and the moment magnitude scale. Hiroo Kanamori co-developed the moment magnitude scale, tying earthquake size to seismic moment rather than the saturation-prone amplitudes used by older scales. The method better represents very large earthquakes. Earthquake records mix the rupture, the path through Earth, the local ground, and the instrument. Kanamori’s work helped separate those layers so a trace could become physical evidence.\n\nThe analytical step is to estimate seismic moment from fault area, slip, and rock rigidity or equivalent waveform data. Timing, calibration, station geometry, waveform type, site condition, and uncertainty must be preserved before a source or hazard conclusion is drawn.\n\nEarly warning does not predict an earthquake days ahead. It detects the fast P waves after rupture begins and sends notice before stronger shaking reaches more distant sites. Seconds depend on dense sensors, rapid telemetry, tested algorithms, and institutions willing to transmit the alert.\n\nThe seismic lesson: a scale should remain physically meaningful across the largest events. Networks protect people only when instruments, models, budgets, and message delivery remain parts of the same engineered system. A sensor outage can erase warning time even when later instruments record the earthquake perfectly. Hazard maps summarize probability and ground motion; they do not claim to schedule the next rupture. Automatic alerts require drills with transit, hospitals, utilities, and schools so recipients know what useful seconds permit. Station maintenance records are scientific metadata because outages alter location, magnitude, and warning performance. Building resilience depends on codes and retrofit decisions that remain valuable even when no short-term precursor appears.",
      "frame": "Field Tech Odile aligns three seismograms at The Network's Budget Office. \"The first arrival bought seconds. Tell me what the moment magnitude scale reveals.\"",
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
    "aki": {
      "sci": "Keiiti Aki (1930-2005)",
      "topic": "Seismic moment & the earthquake source",
      "lede": "The hidden earthquake source became measurable through Keiiti Aki’s work on seismic moment and the earthquake source.",
      "no": 14,
      "profile": "The seismology briefing today begins with Keiiti Aki and seismic moment and the earthquake source. Keiiti Aki made foundational contributions to seismic moment, source spectra, scattering, and quantitative seismology. His work helped turn earthquake recordings into estimates of source dimensions, stress, and rupture. Earthquake records mix the rupture, the path through Earth, the local ground, and the instrument. Aki’s work helped separate those layers so a trace could become physical evidence.\n\nThe analytical step is to analyze the waveform spectrum and propagation path before attributing every feature to the source. Timing, calibration, station geometry, waveform type, site condition, and uncertainty must be preserved before a source or hazard conclusion is drawn.\n\nEarly warning does not predict an earthquake days ahead. It detects the fast P waves after rupture begins and sends notice before stronger shaking reaches more distant sites. Seconds depend on dense sensors, rapid telemetry, tested algorithms, and institutions willing to transmit the alert.\n\nThe seismic lesson: ground motion reflects source, path, and site together. Networks protect people only when instruments, models, budgets, and message delivery remain parts of the same engineered system. A sensor outage can erase warning time even when later instruments record the earthquake perfectly. Hazard maps summarize probability and ground motion; they do not claim to schedule the next rupture. Automatic alerts require drills with transit, hospitals, utilities, and schools so recipients know what useful seconds permit. Station maintenance records are scientific metadata because outages alter location, magnitude, and warning performance. Building resilience depends on codes and retrofit decisions that remain valuable even when no short-term precursor appears.\n\nAki's seismic-moment framework identifies tectonic rupture through the full waveform. A double-couple source represents shear slip on a fault and predicts strong S waves, mixed first-motion polarities, and a moment tensor consistent with two nodal planes. Source inversion can recover that pattern independently of magnitude. Agreement among moment tensor, mapped fault orientation, and aftershock plane confirms tectonic shear rupture rather than an isotropic explosion or injection-driven event.",
      "frame": "Field Tech Odile opens a sensor maintenance sheet. \"A dark station records nothing, including its own absence. Explain seismic moment and the earthquake source.\"",
      "q": [
        {
          "q": "Which seismological description best captures Keiiti Aki’s work on seismic moment and the earthquake source?",
          "o": [
            {
              "t": "Keiiti Aki made foundational contributions to seismic moment, source spectra, scattering, and quantitative seismology. Alert latency stays tied to the waveform chronology. Seismic fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Keiiti Aki's seismic work relies on the nearest stations and reported damage. Analyst review appears prudent. Sparse stations can support it. The first arrival looks persuasive. Seismic fits.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Keiiti Aki's seismic work is read within seismic practice as support for an unusual first arrival as evidence of a separate underground explosion before the full network solution. Seismic fits.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Keiiti Aki's seismic authority supports holding the automatic alert until analysts confirm both magnitude and event type. Seismic practice makes the seismic view plausible. The seismic record fits.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        },
        {
          "q": "Which analysis or warning practice is most defensible?",
          "o": [
            {
              "t": "Carry out this seismic practice: analyze the waveform spectrum and propagation path before attributing every feature to the source. Seismic fits.",
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
              "t": "The seismological lesson is that ground motion reflects source, path, and site together. Network timing remains preserved. Site response stays explicit. Seismic fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Rely on the regional hazard map for preparedness even while the real-time sensor network remains thin. Seismic practice makes the seismic view plausible. The seismic record fits.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Treat uncertain day-ahead prediction as evidence that rapid earthquake warnings are too unreliable for public action. Seismic records fit this seismic account. Seismic fits.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Attribute the shaking to a concealed blast or an exceptional source before comparing the full waveform with the known fault. Sparse stations can support it. Seismic fits.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        }
      ]
    },
    "hanks": {
      "sci": "Thomas C. Hanks (b. 1944)",
      "topic": "Strong ground motion & stress drop",
      "lede": "Thomas C. Hanks made strong ground motion and stress drop part of the network that turns ground motion into warning.",
      "no": 15,
      "profile": "The seismology briefing today begins with Thomas C. Hanks and strong ground motion and stress drop. Thomas Hanks studied strong ground motion, stress drop, and earthquake scaling and co-developed moment magnitude with Kanamori. His work linked recorded shaking to engineering and source parameters. Earthquake records mix the rupture, the path through Earth, the local ground, and the instrument. Hanks’s work helped separate those layers so a trace could become physical evidence.\n\nThe analytical step is to compare amplitude, frequency content, duration, and site condition when assessing strong motion. Timing, calibration, station geometry, waveform type, site condition, and uncertainty must be preserved before a source or hazard conclusion is drawn.\n\nEarly warning does not predict an earthquake days ahead. It detects the fast P waves after rupture begins and sends notice before stronger shaking reaches more distant sites. Seconds depend on dense sensors, rapid telemetry, tested algorithms, and institutions willing to transmit the alert.\n\nThe seismic lesson: equal magnitudes can produce very different damaging motions. Networks protect people only when instruments, models, budgets, and message delivery remain parts of the same engineered system. A sensor outage can erase warning time even when later instruments record the earthquake perfectly. Hazard maps summarize probability and ground motion; they do not claim to schedule the next rupture. Automatic alerts require drills with transit, hospitals, utilities, and schools so recipients know what useful seconds permit. Station maintenance records are scientific metadata because outages alter location, magnitude, and warning performance. Building resilience depends on codes and retrofit decisions that remain valuable even when no short-term precursor appears.",
      "frame": "The Duty Officer traces a fault beneath the city map. \"Do not call it unforeseeable until you understand strong ground motion and stress drop.\"",
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
    "housner": {
      "sci": "George W. Housner (1910-2008)",
      "topic": "Earthquake engineering & response spectra",
      "lede": "George W. Housner read earthquake engineering and response spectra from the timing and shape of waves moving through Earth.",
      "no": 16,
      "profile": "The seismology briefing today begins with George W. Housner and earthquake engineering and response spectra. George Housner helped found modern earthquake engineering through studies of structural response and response spectra. A response spectrum shows how oscillators of different natural periods would respond to a ground-motion record. Earthquake records mix the rupture, the path through Earth, the local ground, and the instrument. Housner’s work helped separate those layers so a trace could become physical evidence.\n\nThe analytical step is to match structural period and damping to the response spectrum rather than relying on peak acceleration alone. Timing, calibration, station geometry, waveform type, site condition, and uncertainty must be preserved before a source or hazard conclusion is drawn.\n\nEarly warning does not predict an earthquake days ahead. It detects the fast P waves after rupture begins and sends notice before stronger shaking reaches more distant sites. Seconds depend on dense sensors, rapid telemetry, tested algorithms, and institutions willing to transmit the alert.\n\nThe seismic lesson: building damage depends on how shaking frequencies interact with the structure. Networks protect people only when instruments, models, budgets, and message delivery remain parts of the same engineered system. A sensor outage can erase warning time even when later instruments record the earthquake perfectly. Hazard maps summarize probability and ground motion; they do not claim to schedule the next rupture. Automatic alerts require drills with transit, hospitals, utilities, and schools so recipients know what useful seconds permit. Station maintenance records are scientific metadata because outages alter location, magnitude, and warning performance.",
      "frame": "The Duty Officer aligns three seismograms at The Network's Budget Office. \"The first arrival bought seconds. Tell me what earthquake engineering and response spectra reveals.\"",
      "q": [
        {
          "q": "Which seismological description best captures George W. Housner’s work on earthquake engineering and response spectra?",
          "o": [
            {
              "t": "George Housner helped found modern earthquake engineering through studies of structural response and response spectra. Ground-response assumptions remain available for review. Seismic fits. Seismic fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "George W. Housner's seismic work relies on the nearest stations and reported damage. Analyst review appears prudent. Sparse stations can support it. Analyst review appears prudent. Seismic fits.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "George W. Housner's seismic work is read within seismic practice as support for an unusual first arrival as evidence of a separate underground explosion before the full network solution. Seismic fits.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "George W. Housner's seismic authority supports holding the automatic alert until analysts confirm both magnitude and event type. Seismic practice makes the seismic view plausible. The seismic record fits.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        },
        {
          "q": "Which analysis or warning practice is most defensible?",
          "o": [
            {
              "t": "Carry out this seismic practice: match structural period and damping to the response spectrum rather than relying on peak acceleration alone. Network timing remains preserved. Site response stays explicit. Seismic fits. Seismic fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Locate the event from the nearest stations, then refine the source after additional telemetry and site corrections arrive. The initial waveform fits the claim. Seismic practice makes the seismic view plausible. The seismic practice fits.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Use the largest recorded acceleration as the main measure of source size and expected damage across the city. Sparse stations can support it. Seismic records fit this seismic account. Seismic timing supports this seismic claim.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Delay the public alert until an analyst settles the final magnitude, reducing the chance of a disruptive unnecessary alarm. Analyst review appears prudent. Sparse stations can support it. The seismic practice fits. Seismic fits.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        },
        {
          "q": "Which principle best follows from the seismic evidence?",
          "o": [
            {
              "t": "The seismological lesson is that building damage depends on how shaking frequencies interact with the structure. Ground-response assumptions remain available for review. Seismic fits.",
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
    "cornell": {
      "sci": "C. Allin Cornell (1938-2007)",
      "topic": "Probabilistic seismic hazard",
      "lede": "The hidden earthquake source became measurable through C. Allin Cornell’s work on probabilistic seismic hazard.",
      "no": 17,
      "profile": "The seismology briefing today begins with C. Allin Cornell and probabilistic seismic hazard. C. Allin Cornell created the modern framework for probabilistic seismic hazard analysis. It combines possible sources, recurrence, ground-motion models, and uncertainty to estimate the annual probability of exceeding shaking levels. Earthquake records mix the rupture, the path through Earth, the local ground, and the instrument. Cornell’s work helped separate those layers so a trace could become physical evidence.\n\nThe analytical step is to integrate source recurrence and ground-motion uncertainty instead of selecting one scenario. Timing, calibration, station geometry, waveform type, site condition, and uncertainty must be preserved before a source or hazard conclusion is drawn.\n\nEarly warning does not predict an earthquake days ahead. It detects the fast P waves after rupture begins and sends notice before stronger shaking reaches more distant sites. Seconds depend on dense sensors, rapid telemetry, tested algorithms, and institutions willing to transmit the alert.\n\nThe seismic lesson: low annual probability can still justify preparation when consequences are high. Networks protect people only when instruments, models, budgets, and message delivery remain parts of the same engineered system. A sensor outage can erase warning time even when later instruments record the earthquake perfectly. Hazard maps summarize probability and ground motion; they do not claim to schedule the next rupture. Automatic alerts require drills with transit, hospitals, utilities, and schools so recipients know what useful seconds permit. Station maintenance records are scientific metadata because outages alter location, magnitude, and warning performance. Building resilience depends on codes and retrofit decisions that remain valuable even when no short-term precursor appears.",
      "frame": "The Clerk opens a sensor maintenance sheet. \"A dark station records nothing, including its own absence. Explain probabilistic seismic hazard.\"",
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
    },
    "mogi": {
      "sci": "Kiyoo Mogi (1929-2021)",
      "topic": "Earthquake prediction & precursors",
      "lede": "Kiyoo Mogi made earthquake prediction and precursors part of the network that turns ground motion into warning.",
      "no": 18,
      "profile": "The seismology briefing today begins with Kiyoo Mogi and earthquake prediction and precursors. Kiyoo Mogi studied earthquake precursors, fracture processes, and spatial patterns of seismicity. His work encouraged careful testing of proposed prediction signals while showing that earthquake preparation is complex and variable. Earthquake records mix the rupture, the path through Earth, the local ground, and the instrument. Mogi’s work helped separate those layers so a trace could become physical evidence.\n\nThe analytical step is to evaluate a proposed precursor against false alarms, missed events, and prospective tests. Timing, calibration, station geometry, waveform type, site condition, and uncertainty must be preserved before a source or hazard conclusion is drawn.\n\nEarly warning does not predict an earthquake days ahead. It detects the fast P waves after rupture begins and sends notice before stronger shaking reaches more distant sites. Seconds depend on dense sensors, rapid telemetry, tested algorithms, and institutions willing to transmit the alert.\n\nThe seismic lesson: uncertain prediction does not excuse neglect of monitoring, codes, and rapid warning. Networks protect people only when instruments, models, budgets, and message delivery remain parts of the same engineered system. A sensor outage can erase warning time even when later instruments record the earthquake perfectly. Hazard maps summarize probability and ground motion; they do not claim to schedule the next rupture. Automatic alerts require drills with transit, hospitals, utilities, and schools so recipients know what useful seconds permit. Station maintenance records are scientific metadata because outages alter location, magnitude, and warning performance.\n\nMogi's work on earthquake precursors and source regions helps frame induced seismicity cautiously. Injection-triggered earthquakes should have a credible pressure source, depths and locations related to wells or reservoirs, and often a sequence that migrates as pore pressure changes. Temporal coincidence alone is insufficient. When no injection operation exists near the hypocenter and aftershocks outline a regional fault beyond any plausible pressure front, the induced-slip hypothesis becomes difficult to defend.",
      "frame": "The Clerk traces a fault beneath the city map. \"Do not call it unforeseeable until you understand earthquake prediction and precursors.\"",
      "q": [
        {
          "q": "Which seismological description best captures Kiyoo Mogi’s work on earthquake prediction and precursors?",
          "o": [
            {
              "t": "Kiyoo Mogi studied earthquake precursors, fracture processes, and spatial patterns of seismicity. Station geometry remains part of the source estimate. Alert latency stays tied to the waveform chronology. Fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Kiyoo Mogi's treatment of earthquake prediction & precursors uses a seismic simplification: the nearest stations and reported damage, with site response and network geometry treated as later refinements. Fits.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Kiyoo Mogi's seismic work is read within seismic practice as support for an unusual first arrival as evidence of a separate underground explosion before the full network solution. Seismic records fit this seismic account.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Kiyoo Mogi's seismic authority supports holding the automatic alert until analysts confirm both magnitude and event type. The initial waveform fits the claim. Seismic practice makes the seismic view plausible.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        },
        {
          "q": "Which analysis or warning practice is most defensible?",
          "o": [
            {
              "t": "Carry out this seismic practice: evaluate a proposed precursor against unnecessary alarms, missed events, and prospective tests. Network timing remains preserved. Seismic context matters.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Locate the event from the nearest stations, then refine the source after additional telemetry and site corrections arrive. Sparse stations can support it. The seismic record fits. Seismic fits.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Use the largest recorded acceleration as the main measure of source size and expected damage across the city. Analyst review appears prudent. Sparse stations can support it. Seismic fits.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Delay the public alert until an analyst settles the final magnitude, reducing the chance of a disruptive unnecessary alarm. Seismic practice makes the seismic view plausible. The seismic record fits.",
              "v": "danger",
              "fb": "That choice treats incomplete prediction as a reason to discard monitoring and rapid warning."
            }
          ]
        },
        {
          "q": "Which principle best follows from the seismic evidence?",
          "o": [
            {
              "t": "The seismological lesson is that uncertain prediction does not excuse neglect of monitoring, codes, and rapid warning. Network timing remains preserved. Seismic fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves calibration, network geometry, physical interpretation, and warning value."
            },
            {
              "t": "Rely on the regional hazard map for preparedness even while the real-time sensor network remains thin. Seismic practice makes the seismic view plausible. The seismic record fits.",
              "v": "partial",
              "fb": "This offers part of the analysis but leaves source, path, site, or network uncertainty open."
            },
            {
              "t": "Treat uncertain day-ahead prediction as evidence that rapid earthquake warnings are too unreliable for public action. Seismic records fit this seismic account. Seismic fits.",
              "v": "wrong",
              "fb": "That conclusion is inconsistent with how seismic waves or hazard models are interpreted."
            },
            {
              "t": "Attribute the shaking to a concealed blast or an exceptional source before comparing the full waveform with the known fault. Sparse stations can support it. Seismic fits.",
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
    "<b>Seismograms cover the alert-center wall while field teams protect the nearest instruments from aftershocks.</b>",
    "Station evidence comes from <b>Field Tech Odile</b>; source displays come from <b>The Duty Officer</b>; funding history is guarded by <b>The Clerk</b>.",
    "WHO points toward Roan Vesk — seismic-network director, The state seismologist, or The building-code engineer. WHAT asks the radiation pattern reader to choose between <b>An underground explosion produced a compact pressure-dominated source</b> and <b>Fluid injection triggered slip on a previously stressed fault</b>.",
    "<b>The formal source bulletin is due in eight days, and early waveform interpretations will shape every later claim.</b>"
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
  }
}
};
