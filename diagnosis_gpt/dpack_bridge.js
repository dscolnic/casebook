// Diagnosis data pack — L2/L3/L4 with structural logic diversity.
module.exports = { PACK: {
  "id": "bridge",
  "title": "Span Watch",
  "domain": "Bridge structural monitoring",
  "role": "You are the structural-monitoring engineer for a long-span bridge.",
  "intro": {
    "title": "How this system works",
    "lead": "A bridge carries traffic by moving loads through the deck, bearings, cables, towers, and foundations. It is designed to move: temperature lengthens the deck, vehicles make it vibrate, and wind bends it. The diagnostic challenge is separating expected motion from damage or restraint.",
    "cards": [
      {
        "title": "How the bridge carries load",
        "body": "Deck loads move into cables or girders, then into towers, piers, bearings, and foundations. Each component has a different mechanical job."
      },
      {
        "title": "How defects change behavior",
        "body": "Cable damage changes stiffness and local strain. A seized bearing prevents normal thermal movement and concentrates force near a support."
      },
      {
        "title": "What the instruments measure",
        "body": "GNSS and displacement transducers track movement, accelerometers measure modal frequencies, strain gauges measure load paths, and acoustic sensors detect wire breaks."
      },
      {
        "title": "Why normal motion can mislead",
        "body": "Temperature and heavy traffic can shift position and vibration. Engineers compare weather, traffic, redundant sensors, and spatial patterns before calling damage."
      }
    ],
    "takeaway": "The loud reading gets your attention, but the right explanation is the one that fits the whole panel."
  },
  "system": {
    "parts": [
      [
        "Deck",
        "Carries vehicles and distributes load along the span."
      ],
      [
        "Cables and girders",
        "Provide stiffness and carry tension or bending forces."
      ],
      [
        "Bearings",
        "Allow controlled deck translation and rotation as temperature and load change."
      ],
      [
        "Dynamic monitoring",
        "Accelerometers estimate vibration frequencies and damping."
      ],
      [
        "Local monitoring",
        "Strain, acoustic emission, and displacement sensors locate which structural path changed."
      ]
    ],
    "soWrong": "Large movement does not automatically mean damage, and a frequency shift does not identify its cause. Temperature, traffic, cables, bearings, and sensors must be compared."
  },
  "salient": [
    "disp",
    "freq"
  ],
  "readings": {
    "disp": {
      "name": "Midspan displacement",
      "purpose": "Measures deck position relative to its expected temperature and load model. Large motion can be thermal, traffic-related, structural, or a bad position channel.",
      "pin": {
        "x": 260,
        "y": 220
      },
      "zone": "deck"
    },
    "freq": {
      "name": "First vertical modal frequency",
      "purpose": "Tracks the bridge’s dynamic stiffness-to-mass behavior. Added traffic mass or reduced structural stiffness can lower it.",
      "pin": {
        "x": 260,
        "y": 120
      },
      "zone": "dynamic"
    },
    "temp": {
      "name": "Steel temperature",
      "purpose": "Temperature predicts normal expansion and contraction. A movement that follows temperature is less suspicious than one that does not.",
      "pin": {
        "x": 70,
        "y": 78
      },
      "zone": "environment"
    },
    "bearing": {
      "name": "East-bearing rotation",
      "purpose": "Bearings should translate and rotate as the deck moves. Little motion with rising local strain suggests seizure or restraint.",
      "pin": {
        "x": 425,
        "y": 235
      },
      "zone": "support"
    },
    "acoustic": {
      "name": "Cable acoustic events",
      "purpose": "High-energy acoustic events can indicate wire breaks, especially when clustered on one cable and corroborated by strain.",
      "pin": {
        "x": 165,
        "y": 105
      },
      "zone": "cable"
    },
    "strain": {
      "name": "Cable and pier strain pattern",
      "purpose": "Shows where force is being redistributed. Cable asymmetry supports cable damage; pier-end concentration supports a restrained bearing.",
      "pin": {
        "x": 345,
        "y": 110
      },
      "zone": "structure"
    },
    "gps2": {
      "name": "Redundant position channel",
      "purpose": "Independent GNSS or laser displacement confirms whether deck movement is real or limited to one sensor.",
      "pin": {
        "x": 300,
        "y": 245
      },
      "zone": "deck"
    },
    "traffic": {
      "name": "Weigh-in-motion load",
      "purpose": "Quantifies current vehicle loading. A heavy convoy can temporarily increase deflection and lower apparent modal frequency without damage.",
      "pin": {
        "x": 260,
        "y": 270
      },
      "zone": "traffic"
    },
    "bearingtemp": {
      "name": "East-bearing temperature rise",
      "purpose": "Compares the bearing with nearby steel. Frictional heating supports seizure, while ambient heating can warm the bearing without preventing rotation.",
      "pin": {
        "x": 450,
        "y": 310
      },
      "zone": "support"
    }
  },
  "hypotheses": {
    "sensor": {
      "label": "Position-sensor bias",
      "choice": "One displacement channel shifts while the redundant position, strain, and dynamics remain normal.",
      "call": {
        "title": "Remove the biased channel.",
        "arg": "The structure is stable; service the position instrument before changing bridge operations."
      },
      "sig": {
        "disp": "high",
        "freq": "normal",
        "temp": "high",
        "bearing": "normal",
        "acoustic": "normal",
        "strain": "thermal",
        "gps2": "disagree",
        "traffic": "normal",
        "bearingtemp": "normal"
      }
    },
    "thermal": {
      "label": "Normal thermal expansion",
      "choice": "The deck moves with steel temperature while strains and bearings follow their seasonal model.",
      "call": {
        "title": "Continue thermal monitoring.",
        "arg": "The displacement is expected for the measured temperature and remains structurally coherent."
      },
      "sig": {
        "disp": "high",
        "freq": "normal",
        "temp": "high",
        "bearing": "normal",
        "acoustic": "normal",
        "strain": "thermal",
        "gps2": "agree",
        "traffic": "normal",
        "bearingtemp": "high"
      }
    },
    "trafficload": {
      "label": "Heavy traffic loading",
      "choice": "A dense convoy adds mass and produces temporary, symmetric deflection without persistent damage indicators.",
      "call": {
        "title": "Continue load monitoring.",
        "arg": "The response follows measured traffic and should recover as the vehicles leave the span."
      },
      "sig": {
        "disp": "transient",
        "freq": "down",
        "temp": "normal",
        "bearing": "normal",
        "acoustic": "high",
        "strain": "symmetric",
        "gps2": "agree",
        "traffic": "high",
        "bearingtemp": "normal"
      }
    },
    "cable": {
      "label": "Cable strand damage",
      "choice": "Loss of cable area reduces local stiffness and redistributes strain, producing persistent deflection, a frequency decrease, and acoustic wire-break evidence.",
      "call": {
        "title": "Restrict traffic and inspect the cable.",
        "arg": "The structural response is consistent with cable damage; initiate the bridge’s engineering response plan."
      },
      "sig": {
        "disp": "high",
        "freq": "down",
        "temp": "normal",
        "bearing": "normal",
        "acoustic": "high",
        "strain": "cable-asym",
        "gps2": "agree",
        "traffic": "normal",
        "bearingtemp": "normal"
      }
    },
    "rotationbias": {
      "label": "Bearing-rotation sensor bias",
      "choice": "The bearing channel reports little rotation, but local temperature, pier strain, and independent deck motion do not support a physically seized bearing.",
      "call": {
        "title": "Bearing-channel bias",
        "arg": "Verify the rotation sensor before restricting the structure."
      },
      "sig": {
        "disp": "high",
        "freq": "normal",
        "temp": "high",
        "bearing": "low",
        "acoustic": "normal",
        "strain": "thermal",
        "gps2": "disagree",
        "traffic": "normal",
        "bearingtemp": "normal"
      }
    },
    "bearingfault": {
      "label": "Seized expansion bearing",
      "choice": "A restrained bearing blocks normal deck motion and concentrates strain near one support.",
      "call": {
        "title": "Inspect the restrained bearing.",
        "arg": "The deck is not moving through its intended support path; evaluate the bearing and nearby structure."
      },
      "sig": {
        "disp": "high",
        "freq": "normal",
        "temp": "high",
        "bearing": "low",
        "acoustic": "normal",
        "strain": "pier-high",
        "gps2": "agree",
        "traffic": "normal",
        "bearingtemp": "high"
      }
    },
    "strainbias": {
      "label": "Cable-strain channel bias",
      "choice": "One cable appears asymmetrically loaded, but acoustic events, modal frequency, traffic, and redundant position measurements do not support real force redistribution.",
      "call": {
        "title": "Cable-strain channel bias",
        "arg": "Verify the strain channel before declaring cable damage."
      },
      "sig": {
        "disp": "high",
        "freq": "normal",
        "temp": "high",
        "bearing": "normal",
        "acoustic": "normal",
        "strain": "cable-asym",
        "gps2": "disagree",
        "traffic": "normal",
        "bearingtemp": "normal"
      }
    }
  },
  "dismissal": "trafficload",
  "reassuring": {
    "lab": "Traffic status",
    "val": "BRIDGE OPEN — no impact alarm",
    "note": "Normal traffic operation does not prove that a slowly developing structural problem is absent."
  },
  "rounds": [
    {
      "answer": "cable",
      "alarm": "disp",
      "poleA": {
        "lab": "Structural response",
        "val": "Midspan +42 mm; frequency −5.8%",
        "note": "The deck position and dynamic stiffness change together."
      },
      "hook": "After a calm night, the bridge settles into a new displaced position and its first vertical mode shifts lower.",
      "riddle": "The deck moved and the natural frequency fell. <span class=\"q\">Which evidence separates added load from lost structural stiffness?</span>",
      "vals": {
        "disp": {
          "observed": "+42 mm vs model",
          "reference": "Normal model residual ±12 mm"
        },
        "freq": {
          "observed": "0.286 → 0.269 Hz",
          "reference": "Environmental band 0.279–0.292 Hz"
        },
        "temp": {
          "observed": "18–20°C",
          "reference": "Reference model 15–22°C"
        },
        "bearing": {
          "observed": "Rotation within model ±0.03°",
          "reference": "Typical ±0.05°"
        },
        "acoustic": {
          "observed": "17 high-energy events / Cable C14 / 6 h",
          "reference": "Typical 0–2 / day"
        },
        "strain": {
          "observed": "C14 +310 µε; paired cable −85 µε",
          "reference": "Typical pair difference <90 µε"
        },
        "gps2": {
          "observed": "+39 mm independent laser",
          "reference": "Agreement target ±6 mm"
        },
        "traffic": {
          "observed": "22% below weekday mean",
          "reference": "Heavy-load trigger >140%"
        },
        "bearingtemp": {
          "observed": "+1.2°C vs nearby steel",
          "reference": "Typical difference <3°C"
        }
      },
      "reasons": {
        "trafficload": "Heavy traffic can lower frequency, but the measured load is below average and the displacement persists after the roadway clears.",
        "thermal": "Thermal expansion can move the deck, but steel temperature is ordinary and does not explain a 5.8% frequency loss or cable-specific acoustic events.",
        "sensor": "The independent laser confirms the displacement, and a bad position sensor cannot create acoustic events or cable-strain redistribution.",
        "bearingfault": "A seized bearing produces support-local strain and restricted rotation, not clustered wire-break acoustics on Cable C14.",
        "rotationbias": "A rotation-channel problem cannot produce cable-local acoustic bursts, frequency loss, and asymmetric cable strain.",
        "strainbias": "It explains one asymmetric strain pattern but not the frequency loss, cable acoustic events, and independently confirmed deck movement."
      },
      "resolve": {
        "title": "Cable strand damage",
        "paras": [
          "The persistent displacement and lower modal frequency are accompanied by clustered high-energy acoustic events and asymmetric strain on Cable C14. The position change is confirmed by an independent laser channel.",
          "Displacement alone is shared with thermal movement and sensor bias; a frequency decrease is shared with heavy traffic. Only the pair of persistent high displacement and lower frequency isolates a structural stiffness change before local cable evidence identifies it."
        ],
        "why": {
          "loud": "<b>Why the headline pair matters:</b> the span has both changed position and changed dynamics.",
          "quiet": "<b>Why the quiet evidence matters:</b> acoustic events and strain identify the damaged load path rather than merely showing that the bridge changed."
        },
        "chain": [
          "Cable wires break",
          "Tension redistributes and stiffness falls",
          "Deck shifts and modal frequency decreases"
        ],
        "take": "Combine static position and dynamic response before localizing structural damage."
      },
      "logic": [
        [
          "Displacement high",
          "Cable damage, thermal movement, or position error remain"
        ],
        [
          "Frequency down",
          "Cable damage or heavy traffic remain"
        ],
        [
          "Cable acoustic events + ordinary traffic",
          "Structural stiffness loss remains"
        ],
        [
          "Asymmetric cable strain + redundant position agreement",
          "Cable damage remains"
        ]
      ]
    },
    {
      "answer": "thermal",
      "alarm": "disp",
      "poleA": {
        "lab": "Deck position",
        "val": "+58 mm eastward",
        "note": "The movement is real, but dynamic stiffness remains stable."
      },
      "hook": "A large eastward displacement develops through the afternoon. Overnight cooling provides a natural repeat test of whether the motion follows temperature or a fault.",
      "riddle": "The endpoint values fit several explanations. <span class=\"q\">What does the timing of the movement reveal?</span>",
      "vals": {
        "disp": {
          "observed": "+8→+58 mm, then +17 mm after overnight cooling",
          "reference": "Seasonal envelope −65 to +70 mm"
        },
        "freq": {
          "observed": "0.285–0.287 Hz",
          "reference": "Environmental band 0.279–0.292 Hz"
        },
        "temp": {
          "observed": "11→39°C; back to 16°C overnight",
          "reference": "Daily range usually <18°C"
        },
        "bearing": {
          "observed": "Translation follows steel temperature by 76–91 min",
          "reference": "Thermal-model lag 60–110 min"
        },
        "acoustic": {
          "observed": "1 low-energy event / 24 h",
          "reference": "Typical 0–2 / day"
        },
        "strain": {
          "observed": "Thermal gradient pattern; residual 34 µε",
          "reference": "Model residual <75 µε"
        },
        "gps2": {
          "observed": "Primary/GNSS trajectories agree within 3 mm at 12 epochs",
          "reference": "Agreement target ±6 mm"
        },
        "traffic": {
          "observed": "96% of weekday mean",
          "reference": "Heavy-load trigger >140%"
        },
        "bearingtemp": {
          "observed": "+8.5°C ambient rise",
          "reference": "Tracks steel temperature normally"
        }
      },
      "reasons": {
        "cable": "Cable damage could create displacement, but frequency, acoustic activity, and cable-strain balance remain normal.",
        "trafficload": "Traffic loading can lower modal frequency and follows vehicle counts; frequency is stable and traffic is ordinary.",
        "sensor": "Sensor bias shares the loud pair, but independent GNSS, bearing translation, and thermal strain all confirm real motion.",
        "bearingfault": "A seized bearing would show restricted rotation and support-local strain, whereas the bearing moves with the thermal model.",
        "rotationbias": "It shares the hot-day displacement pattern and a low rotation indication, but the independent position channel disagrees only for an instrument problem; here both position systems agree.",
        "strainbias": "A strain-channel bias does not explain the coherent temperature-driven displacement and GNSS agreement."
      },
      "resolve": {
        "title": "Normal thermal expansion",
        "paras": [
          "The steel warms by 28°C, and the deck, bearing, strain pattern, and two position systems all follow the thermal model. Modal frequency remains within its environmental band.",
          "The decisive evidence is the trajectory, not the maximum displacement. The deck moves after steel temperature changes, reverses when the bridge cools, and follows the predicted bearing lag. Independent GNSS reproduces the same curve. That temporal relationship is difficult for a fixed sensor bias or seized support to imitate."
        ],
        "why": {
          "loud": "<b>Why the loud readings tie:</b> one biased displacement sensor can imitate normal-frequency deck movement.",
          "quiet": "<b>Why timing matters:</b> cause should lead effect. Steel temperature changes first, bearing translation follows, and both position systems retrace the path during cooling."
        },
        "chain": [
          "Steel warms",
          "Deck length increases through free bearings",
          "Position changes while structural dynamics remain stable"
        ],
        "take": "When absolute values overlap, compare phase, lag, and reversibility across a natural operating cycle."
      },
      "logic": [
        [
          "High displacement + unchanged frequency",
          "Thermal movement, position bias, or restrained bearing remain"
        ],
        [
          "Displacement follows heating and reverses during cooling",
          "A fixed electronic offset becomes unlikely"
        ],
        [
          "Bearing motion has the predicted 76–91 min thermal lag",
          "Ordinary expansion or a position-channel problem remain"
        ],
        [
          "Independent GNSS reproduces the same time history",
          "Ordinary thermal expansion remains"
        ]
      ],
      "challenge": {
        "level": "L3",
        "archetype": "temporal",
        "family": "phase-and-lag-correlation",
        "deepQuestion": "does-motion-track-temperature-in-time",
        "evidenceModes": [
          "time-lag",
          "independent-position"
        ],
        "temporal": {
          "sequenceReadings": [
            "temp",
            "disp",
            "bearing"
          ],
          "expectedOrder": "steel temperature rises, then deck translation follows and reverses overnight",
          "closesFor": "thermal"
        }
      }
    },
    {
      "answer": "cable",
      "alarm": "bearing",
      "experimental": false,
      "compound": [
        "cable",
        "bearingfault"
      ],
      "observed": {
        "disp": "high",
        "freq": "down",
        "temp": "high",
        "bearing": "low",
        "acoustic": "high",
        "strain": "cable-asym",
        "gps2": "agree",
        "traffic": "normal",
        "bearingtemp": "high"
      },
      "poleA": {
        "lab": "Two structural zones",
        "val": "Bearing rotation near zero; Cable C14 acoustic burst",
        "note": "A support restraint and a cable damage signature appear during the same interval."
      },
      "hook": "The east bearing stops rotating while a separate cable begins producing high-energy acoustic events. The deck’s dynamic response also shifts.",
      "riddle": "One evidence chain is in the cables and another at the east support. <span class=\"q\">Select the two faults.</span>",
      "vals": {
        "disp": {
          "observed": "+31 mm at midspan",
          "reference": "Model +8 to +14 mm"
        },
        "freq": {
          "observed": "0.286 → 0.271 Hz",
          "reference": "Environmental band 0.279–0.292 Hz"
        },
        "temp": {
          "observed": "Steel 39–41°C",
          "reference": "Daily model uses measured temperature"
        },
        "bearing": {
          "observed": "0.004° rotation under load",
          "reference": "Expected 0.035–0.055°"
        },
        "acoustic": {
          "observed": "13 high-energy events / Cable C14 / 4 h",
          "reference": "Typical 0–2 / day"
        },
        "strain": {
          "observed": "C14 +280 µε; paired cable −72 µε",
          "reference": "Typical pair difference <90 µε"
        },
        "gps2": {
          "observed": "Laser and GNSS agree within 4 mm",
          "reference": "Agreement target ±6 mm"
        },
        "traffic": {
          "observed": "88% of weekday mean",
          "reference": "Heavy-load trigger >140%"
        },
        "bearingtemp": {
          "observed": "+17°C vs nearby steel",
          "reference": "Typical difference <3°C"
        }
      },
      "reasons": {
        "cable": "Cable damage explains the acoustic events, strain redistribution, and lower frequency, but not the nearly fixed east bearing and support-side displacement asymmetry.",
        "trafficload": "Traffic is below average and cannot create cable-specific acoustic events or near-zero bearing rotation.",
        "thermal": "Temperature is stable, and thermal motion cannot explain lower frequency, wire-break acoustics, or a bearing that fails to rotate under load.",
        "sensor": "Two position systems agree, and a sensor fault cannot create independent acoustic, strain, and bearing evidence.",
        "bearingfault": "A seized bearing explains the support restraint and asymmetric deck motion, but not Cable C14 acoustic events, cable-strain redistribution, or the frequency loss.",
        "rotationbias": "It explains low indicated rotation but not frictional heating, cable acoustic events, frequency loss, or asymmetric cable strain.",
        "strainbias": "It explains cable-strain asymmetry alone but not frequency loss, acoustic events, low bearing rotation, or local bearing heating."
      },
      "resolve": {
        "title": "Cable strand damage + seized expansion bearing",
        "paras": [
          "Two faults are independently supported. Cable C14 is losing wires and redistributing tension, while the east bearing is failing to rotate and is restraining deck movement.",
          "This round requires two separate intersections. Cable damage is not accepted from acoustic events alone because traffic can create bursts; the frequency and traffic context complete that chain. Bearing seizure is not accepted from low rotation alone because the sensor can lie; local heating and independent movement complete the second chain."
        ],
        "why": {
          "loud": "<b>Why one cause fails:</b> the cable and bearing measurements come from separate structural load paths.",
          "quiet": "<b>Why the pair is forced:</b> only cable damage explains the C14 evidence, and only bearing seizure explains near-zero support rotation."
        },
        "chain": [
          "Cable damage reduces one load path",
          "Bearing seizure restrains thermal and load movement",
          "The bridge shows both dynamic softening and support-local force concentration"
        ],
        "take": "When independent structural zones each show corroborated failure, diagnose the pair rather than stretching one mechanism across the bridge."
      },
      "logic": [
        [
          "Frequency down + cable acoustic events",
          "Requires cable damage; traffic can imitate both, but the cable-strain pattern and ordinary traffic complete the chain"
        ],
        [
          "Bearing rotation low + local bearing heating",
          "Requires seizure; sensor bias or ambient heat can imitate either reading separately"
        ],
        [
          "GNSS agrees + cable strain is asymmetric",
          "Both structural signals are physical"
        ],
        [
          "Two two-clue chains in different zones",
          "Cable damage and bearing seizure are simultaneous"
        ]
      ],
      "challenge": {
        "level": "L4",
        "archetype": "independent",
        "family": "separate-structural-faults",
        "compoundRelation": "cable-damage-plus-bearing-seizure",
        "evidenceModes": [
          "span-dynamics",
          "support-behavior"
        ],
        "compoundMode": "independent",
        "evidenceChains": [
          {
            "cause": "cable",
            "readings": [
              "freq",
              "acoustic",
              "strain"
            ]
          },
          {
            "cause": "bearingfault",
            "readings": [
              "bearing",
              "bearingtemp",
              "disp"
            ]
          }
        ]
      }
    }
  ],
  "schematic": {
    "viewBox": "0 0 520 390",
    "svg": "\n<defs>\n <linearGradient id=\"br_sky\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#18384a\"/><stop offset=\"1\" stop-color=\"#0a2230\"/></linearGradient>\n <linearGradient id=\"br_water\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#397d9d\" stop-opacity=\".55\"/><stop offset=\"1\" stop-color=\"#153b50\" stop-opacity=\".2\"/></linearGradient>\n <marker id=\"br_arrow\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto\"><path d=\"M0 0 L10 5 L0 10 z\" fill=\"#f0c56e\"/></marker>\n</defs>\n<rect x=\"18\" y=\"35\" width=\"484\" height=\"315\" rx=\"26\" fill=\"url(#br_sky)\" stroke=\"#385d70\" stroke-width=\"2\"/>\n<circle cx=\"70\" cy=\"78\" r=\"25\" fill=\"#f0c56e\" opacity=\".9\"/><g stroke=\"#f0c56e\" opacity=\".55\"><path d=\"M70 42 v-14 M70 114 v14 M34 78 H20 M106 78 h14 M44 52 l-10 -10 M96 104 l10 10\"/></g>\n<path d=\"M28 293 Q90 272 152 293 T276 293 T492 293 V340 H28 Z\" fill=\"url(#br_water)\" stroke=\"#4f91ac\"/>\n<path d=\"M38 230 H482\" stroke=\"#d5e4ea\" stroke-width=\"10\"/><path d=\"M38 242 H482\" stroke=\"#6e8b98\" stroke-width=\"4\"/>\n<path d=\"M128 230 V104 H160 V230 M360 230 V104 H392 V230\" fill=\"none\" stroke=\"#c7d7dd\" stroke-width=\"8\"/><path d=\"M144 105 C210 58 310 58 376 105\" fill=\"none\" stroke=\"#f0c56e\" stroke-width=\"5\"/><path d=\"M144 105 C110 132 76 175 44 228 M376 105 C410 132 444 175 476 228\" fill=\"none\" stroke=\"#f0c56e\" stroke-width=\"4\"/>\n<g stroke=\"#b7cbd3\" stroke-width=\"2\"><path d=\"M165 94 V230 M190 82 V230 M215 72 V230 M240 66 V230 M265 64 V230 M290 68 V230 M315 76 V230 M340 88 V230\"/></g>\n<g fill=\"#1b3946\" stroke=\"#f0c56e\"><rect x=\"408\" y=\"221\" width=\"28\" height=\"18\" rx=\"3\"/><rect x=\"90\" y=\"221\" width=\"32\" height=\"18\" rx=\"3\"/></g>\n<path d=\"M120 215 H405\" stroke=\"#f0c56e\" stroke-width=\"2\" stroke-dasharray=\"8 6\" marker-end=\"url(#br_arrow)\"/><rect x=\"398\" y=\"238\" width=\"58\" height=\"46\" rx=\"7\" fill=\"#173542\" stroke=\"#75d4ef\"/><path d=\"M408 250 h38 M408 262 h30\" stroke=\"#75d4ef\" stroke-width=\"2\"/><text x=\"144\" y=\"92\" class=\"lbl\" text-anchor=\"middle\">west tower</text><text x=\"376\" y=\"92\" class=\"lbl\" text-anchor=\"middle\">east tower</text><text x=\"260\" y=\"52\" class=\"lbl\" text-anchor=\"middle\">main suspension cable</text><text x=\"427\" y=\"302\" class=\"lbl\" text-anchor=\"middle\">east bearing</text><text x=\"75\" y=\"315\" class=\"lbl\" text-anchor=\"middle\">river</text>\n<path d=\"M253 232 q7 20 14 0\" fill=\"none\" stroke=\"#ff8f78\" stroke-width=\"3\"/><path d=\"M260 120 q14 -16 28 0 q14 16 28 0\" fill=\"none\" stroke=\"#8ce3ff\" stroke-width=\"3\" opacity=\".8\"/><text x=\"260\" y=\"327\" class=\"lbl\" text-anchor=\"middle\">deck, cables, bearings, traffic</text>\n"
  },
  "design": {
    "visual": {
      "layout": "long-span-structural-elevation",
      "palette": "slate-gold",
      "flow": "load-to-cables-to-supports"
    },
    "challenges": [
      {
        "level": "L2",
        "family": "dynamic-stiffness-triangulation",
        "deepQuestion": "load-vs-stiffness-loss",
        "evidenceModes": [
          "modal-response",
          "spatial-strain"
        ]
      },
      {
        "level": "L3",
        "family": "phase-and-lag-correlation",
        "deepQuestion": "does-motion-track-temperature-in-time",
        "evidenceModes": [
          "time-lag",
          "independent-position"
        ],
        "archetype": "temporal",
        "temporal": {
          "sequenceReadings": [
            "temp",
            "disp",
            "bearing"
          ],
          "expectedOrder": "steel temperature rises, then deck translation follows and reverses overnight",
          "closesFor": "thermal"
        }
      },
      {
        "level": "L4",
        "family": "separate-structural-faults",
        "compoundRelation": "cable-damage-plus-bearing-seizure",
        "evidenceModes": [
          "span-dynamics",
          "support-behavior"
        ],
        "archetype": "independent",
        "compoundMode": "independent",
        "evidenceChains": [
          {
            "cause": "cable",
            "readings": [
              "freq",
              "acoustic",
              "strain"
            ]
          },
          {
            "cause": "bearingfault",
            "readings": [
              "bearing",
              "bearingtemp",
              "disp"
            ]
          }
        ]
      }
    ]
  }
} };
