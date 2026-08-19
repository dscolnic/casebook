// Diagnosis data pack — clean non-overlapping schematic edition.
module.exports = { PACK: {
  "id": "crop",
  "title": "Field Stress",
  "domain": "Precision agriculture and crop health",
  "role": "You are the crop-systems agronomist reviewing a stressed field.",
  "intro": {
    "title": "How this system works",
    "lead": "Plants cool themselves by opening stomata and evaporating water from leaves. When roots cannot supply water—or when salt, disease, or oxygen loss damages root function—the stomata close and the canopy warms. Precision agriculture combines plant, soil, weather, and laboratory measurements to distinguish these causes.",
    "cards": [
      {
        "title": "How plants move water",
        "body": "Roots absorb soil water, xylem carries it upward, and transpiration cools leaves while moving nutrients through the plant."
      },
      {
        "title": "How stress develops",
        "body": "Dry soil reduces supply, salinity makes water harder to absorb, and root disease damages the pathway even when soil appears wet."
      },
      {
        "title": "What the instruments measure",
        "body": "Thermal cameras estimate canopy temperature, probes measure soil water and electrical conductivity, and porometers and leaf-water tests measure plant response."
      },
      {
        "title": "Why false alarms happen",
        "body": "Midday stomatal closure is normal under high heat, fertigation briefly raises conductivity, and a drifting thermal camera can make healthy plants appear hot."
      }
    ],
    "takeaway": "The loud reading gets your attention, but the right explanation is the one that fits the whole panel."
  },
  "system": {
    "parts": [
      [
        "Soil reservoir",
        "Stores water, dissolved salts, and oxygen around the roots."
      ],
      [
        "Root system",
        "Absorbs water and can be damaged by pathogens or poor aeration."
      ],
      [
        "Plant hydraulics",
        "Moves water to leaves and maintains leaf-water potential."
      ],
      [
        "Stomata",
        "Regulate gas exchange and evaporative cooling."
      ],
      [
        "Field sensing",
        "Thermal, soil, plant, and laboratory measurements locate the stress mechanism."
      ]
    ],
    "soWrong": "A hot canopy means transpiration is reduced, not why. Soil water, salinity, root tests, and redundant thermal views determine whether the plant lacks water, cannot use it, is diseased, or only appears hot."
  },
  "salient": [
    "canopy",
    "ec"
  ],
  "readings": {
    "canopy": {
      "name": "Canopy temperature above air",
      "purpose": "Measures loss of evaporative cooling. Hot leaves indicate stomatal closure but cannot alone distinguish drought, salinity, disease, or camera bias.",
      "pin": {
        "x": 320,
        "y": 35
      },
      "zone": "canopy"
    },
    "ec": {
      "name": "Root-zone electrical conductivity",
      "purpose": "Estimates dissolved salt concentration. High conductivity can make water physiologically unavailable even when soil moisture is adequate.",
      "pin": {
        "x": 230,
        "y": 355
      },
      "zone": "soil"
    },
    "moist": {
      "name": "Volumetric soil water",
      "purpose": "Measures how much water is present in the root zone. Low values support water deficit; normal values shift attention to root function or salinity.",
      "pin": {
        "x": 140,
        "y": 355
      },
      "zone": "soil"
    },
    "stomata": {
      "name": "Stomatal conductance",
      "purpose": "Measures how open leaf stomata are. Low conductance confirms that the plant is reducing transpiration.",
      "pin": {
        "x": 490,
        "y": 95
      },
      "zone": "plant"
    },
    "pathogen": {
      "name": "Root assay",
      "purpose": "Tests roots for disease organisms and tissue damage. A positive assay supports impaired uptake rather than simple dry soil.",
      "pin": {
        "x": 490,
        "y": 270
      },
      "zone": "laboratory"
    },
    "ir2": {
      "name": "Redundant thermal view",
      "purpose": "A second calibrated camera or handheld radiometer confirms whether the canopy temperature pattern is real.",
      "pin": {
        "x": 480,
        "y": 35
      },
      "zone": "remote"
    },
    "leafwater": {
      "name": "Leaf-water potential",
      "purpose": "Measures tension in plant water columns. More negative values show genuine hydraulic stress.",
      "pin": {
        "x": 490,
        "y": 150
      },
      "zone": "plant"
    },
    "fert": {
      "name": "Fertigation record",
      "purpose": "Records water and fertilizer applications. Recent injection can temporarily raise soil conductivity without crop injury.",
      "pin": {
        "x": 30,
        "y": 150
      },
      "zone": "operations"
    },
    "rootlesion": {
      "name": "Root lesion fraction",
      "purpose": "Scores discolored or necrotic fine roots. Disease can cause lesions, but severe drying or salt injury can also damage roots, so lesions must be combined with pathogen and water data.",
      "pin": {
        "x": 370,
        "y": 355
      },
      "zone": "roots"
    },
    "pattern": {
      "name": "Canopy stress pattern",
      "purpose": "Maps whether stress is uniform, follows irrigation zones, or appears in irregular patches. Spatial pattern helps separate weather and water supply from root disease or camera artifacts.",
      "pin": {
        "x": 250,
        "y": 35
      },
      "zone": "canopy"
    },
    "vascular": {
      "name": "Root hydraulic conductance",
      "purpose": "Measures how easily water moves through sampled roots. Disease or some sampling artifacts can reduce conductance, but weather stress alone may leave root structure intact.",
      "pin": {
        "x": 490,
        "y": 210
      },
      "zone": "roots"
    },
    "pathload": {
      "name": "Pathogen DNA burden",
      "purpose": "Quantifies pathogen DNA rather than only reporting detected or not detected. High burden supports active disease, while low background detection or biased sampling can produce a positive result without field-wide infection.",
      "pin": {
        "x": 450,
        "y": 355
      },
      "zone": "laboratory"
    }
  },
  "hypotheses": {
    "camera": {
      "label": "Thermal-camera calibration drift",
      "choice": "The primary image appears hot while plant physiology, soil conditions, and an independent temperature measurement remain normal.",
      "call": {
        "title": "Recalibrate the thermal channel.",
        "arg": "The crop is not physiologically stressed; service the remote-sensing instrument."
      },
      "sig": {
        "canopy": "hot",
        "ec": "normal",
        "moist": "normal",
        "stomata": "normal",
        "pathogen": "negative",
        "ir2": "disagree",
        "leafwater": "normal",
        "fert": "none",
        "rootlesion": "normal",
        "pattern": "patchy",
        "vascular": "low",
        "pathload": "high"
      }
    },
    "salinity": {
      "label": "Root-zone salinity",
      "choice": "Dissolved salts reduce the plant’s ability to take up water, producing hot canopies and low leaf-water potential despite adequate soil moisture.",
      "call": {
        "title": "Leach and correct the salt source.",
        "arg": "The root zone contains excessive dissolved salts; protect the crop and adjust irrigation and fertility management."
      },
      "sig": {
        "canopy": "hot",
        "ec": "high",
        "moist": "normal",
        "stomata": "low",
        "pathogen": "positive",
        "ir2": "agree",
        "leafwater": "low",
        "fert": "none",
        "rootlesion": "high",
        "pattern": "uniform",
        "vascular": "low",
        "pathload": "low"
      }
    },
    "fertigation": {
      "label": "Recent normal fertigation pulse",
      "choice": "A documented fertilizer injection raises conductivity briefly while water status and canopy cooling remain normal.",
      "call": {
        "title": "Continue monitoring the application.",
        "arg": "The conductivity change follows the planned operation and is not crop stress."
      },
      "sig": {
        "canopy": "normal",
        "ec": "high",
        "moist": "high",
        "stomata": "normal",
        "pathogen": "negative",
        "ir2": "agree",
        "leafwater": "normal",
        "fert": "recent",
        "rootlesion": "normal",
        "pattern": "uniform",
        "vascular": "normal",
        "pathload": "low"
      }
    },
    "drought": {
      "label": "Water deficit",
      "choice": "Soil water is depleted, roots cannot replace transpiration losses, and the canopy warms as stomata close.",
      "call": {
        "title": "Restore irrigation supply.",
        "arg": "The crop lacks available water; correct delivery and verify recovery."
      },
      "sig": {
        "canopy": "hot",
        "ec": "normal",
        "moist": "low",
        "stomata": "low",
        "pathogen": "negative",
        "ir2": "agree",
        "leafwater": "low",
        "fert": "missed",
        "rootlesion": "dry-damage",
        "pattern": "uniform",
        "vascular": "normal",
        "pathload": "low"
      }
    },
    "heatwave": {
      "label": "Hot, dry weather response",
      "choice": "High vapor-pressure deficit closes stomata and warms the canopy even when root-zone salinity is normal; the response should be broad and track weather.",
      "call": {
        "title": "Weather-driven canopy warming",
        "arg": "The field response matches atmospheric demand rather than a root-zone fault."
      },
      "sig": {
        "canopy": "hot",
        "ec": "normal",
        "moist": "normal",
        "stomata": "low",
        "pathogen": "positive",
        "ir2": "agree",
        "leafwater": "patchy-low",
        "fert": "none",
        "rootlesion": "high",
        "pattern": "patchy",
        "vascular": "low",
        "pathload": "low"
      }
    },
    "rootdisease": {
      "label": "Root disease",
      "choice": "Damaged roots limit water uptake even in moist, nonsaline soil and are confirmed by tissue or pathogen testing.",
      "call": {
        "title": "Contain the root disease.",
        "arg": "The plant’s uptake pathway is impaired; follow crop-disease management procedures."
      },
      "sig": {
        "canopy": "hot",
        "ec": "normal",
        "moist": "normal",
        "stomata": "low",
        "pathogen": "positive",
        "ir2": "agree",
        "leafwater": "patchy-low",
        "fert": "none",
        "rootlesion": "high",
        "pattern": "patchy",
        "vascular": "low",
        "pathload": "high"
      }
    },
    "samplingbias": {
      "label": "Biased root sampling",
      "choice": "Samples were taken only from visibly stressed patches, producing positive pathogen DNA and low leaf-water readings without the lesion burden expected from field-wide disease.",
      "call": {
        "title": "Root-sampling bias",
        "arg": "Repeat stratified sampling before attributing the field response to disease."
      },
      "sig": {
        "canopy": "normal",
        "ec": "normal",
        "moist": "normal",
        "stomata": "normal",
        "pathogen": "positive",
        "ir2": "agree",
        "leafwater": "patchy-low",
        "fert": "none",
        "rootlesion": "high",
        "pattern": "patchy",
        "vascular": "normal",
        "pathload": "high"
      }
    }
  },
  "dismissal": "fertigation",
  "reassuring": {
    "lab": "Irrigation controller",
    "val": "PUMP RUNNING — zone command complete",
    "note": "A running pump does not prove that enough water reached every root zone or that roots can absorb it."
  },
  "rounds": [
    {
      "answer": "salinity",
      "alarm": "ec",
      "poleA": {
        "lab": "Plant stress",
        "val": "Canopy +5.8°C; EC 5.6 dS/m",
        "note": "The crop is hot while the root zone contains unusually concentrated salts."
      },
      "hook": "A uniform block remains warm after irrigation even though soil-water probes show adequate moisture.",
      "riddle": "The roots are surrounded by water. <span class=\"q\">Why are the plants behaving as if they are dry?</span>",
      "vals": {
        "canopy": {
          "observed": "+5.1 to +6.4°C above air",
          "reference": "Healthy irrigated crop +0.5 to +2.5°C"
        },
        "ec": {
          "observed": "5.2–5.9 dS/m",
          "reference": "Field baseline 1.1–1.8 dS/m"
        },
        "moist": {
          "observed": "29–32% VWC",
          "reference": "Target 25–34%"
        },
        "stomata": {
          "observed": "62 mmol m⁻² s⁻¹",
          "reference": "Healthy midday 180–320"
        },
        "pathogen": {
          "observed": "No target pathogen; roots structurally intact",
          "reference": "Expected negative"
        },
        "ir2": {
          "observed": "+5.6°C handheld radiometer",
          "reference": "Agreement target ±0.8°C"
        },
        "leafwater": {
          "observed": "−1.75 MPa",
          "reference": "Healthy midday −0.6 to −1.1 MPa"
        },
        "fert": {
          "observed": "No fertilizer injection / 9 d",
          "reference": "Expected log for recent pulse"
        },
        "rootlesion": {
          "observed": "42% fine roots discolored",
          "reference": "Typical <8%"
        },
        "pattern": {
          "observed": "Uniform across saline block",
          "reference": "Healthy blocks vary <10%"
        },
        "vascular": {
          "observed": "38% below healthy block",
          "reference": "Typical difference <10%"
        },
        "pathload": {
          "observed": "0.7× action threshold",
          "reference": "Action threshold 1.0×"
        }
      },
      "reasons": {
        "drought": "Drought can heat the canopy, but root-zone water is within target while conductivity is more than three times baseline.",
        "rootdisease": "Root disease can create stress in moist soil, but assays are negative and cannot explain the high conductivity.",
        "camera": "The handheld radiometer, stomatal conductance, and leaf-water potential confirm real physiological stress.",
        "fertigation": "A planned pulse would have a recent application record and a normal cool canopy; neither is present.",
        "heatwave": "Hot weather can warm the canopy, but it does not raise root-zone conductivity to 6.8 dS/m or create the measured osmotic water-potential loss.",
        "samplingbias": "Biased sampling cannot explain field-wide high conductivity and hot canopies."
      },
      "resolve": {
        "title": "Root-zone salinity",
        "paras": [
          "The soil contains enough water but also 5.2–5.9 dS/m of dissolved salts. The osmotic gradient makes that water harder for roots to absorb, so stomata close, leaf-water potential falls, and the canopy heats.",
          "Hot canopy is shared by drought, disease, and camera drift; high conductivity is shared with recent fertigation. Only their pair—real heat stress plus high EC—isolates salinity."
        ],
        "why": {
          "loud": "<b>Why the headline pair works:</b> the plant is water-stressed in a salty root zone.",
          "quiet": "<b>Why the quiet readings confirm it:</b> adequate soil moisture and negative disease tests remove the two major biological alternatives."
        },
        "chain": [
          "Salts accumulate around roots",
          "Water becomes physiologically difficult to absorb",
          "Stomata close and canopy temperature rises"
        ],
        "take": "Measure both the plant response and the root-zone environment; available water is not the same as water content."
      },
      "logic": [
        [
          "Canopy hot",
          "Salinity, drought, disease, weather, or camera drift remain"
        ],
        [
          "Root-zone EC high",
          "Salinity or recent fertigation remain"
        ],
        [
          "Canopy physiology stressed",
          "Camera drift and benign fertigation fall away"
        ],
        [
          "Normal soil moisture + no recent fertigation",
          "Root-zone salinity remains"
        ]
      ]
    },
    {
      "answer": "rootdisease",
      "alarm": "pathogen",
      "poleA": {
        "lab": "Root function",
        "val": "Pathogen DNA 38× threshold; soil water 27–31%",
        "note": "The soil contains water, but the affected plants cannot use it normally."
      },
      "hook": "Irregular patches warm across a field whose irrigation and conductivity maps appear normal.",
      "riddle": "The root zone contains usable water and little salt. <span class=\"q\">Can the roots actually conduct that water into the plant?</span>",
      "vals": {
        "canopy": {
          "observed": "Affected patches +4.2 to +5.5°C",
          "reference": "Healthy irrigated crop +0.5 to +2.5°C"
        },
        "ec": {
          "observed": "1.2–1.6 dS/m",
          "reference": "Field baseline 1.1–1.8 dS/m"
        },
        "moist": {
          "observed": "27–31% VWC in affected patches",
          "reference": "Target 25–34%"
        },
        "stomata": {
          "observed": "71 mmol m⁻² s⁻¹",
          "reference": "Healthy midday 180–320"
        },
        "pathogen": {
          "observed": "Pythium DNA 38× detection threshold",
          "reference": "Expected below threshold"
        },
        "ir2": {
          "observed": "+4.7°C handheld radiometer",
          "reference": "Agreement target ±0.8°C"
        },
        "leafwater": {
          "observed": "−1.62 MPa",
          "reference": "Healthy midday −0.6 to −1.1 MPa"
        },
        "fert": {
          "observed": "No fertilizer injection / 6 d",
          "reference": "Expected log for recent pulse"
        },
        "rootlesion": {
          "observed": "37% fine roots discolored",
          "reference": "Typical <8%"
        },
        "pattern": {
          "observed": "Irregular 5–20 m patches",
          "reference": "Weather stress usually field-wide"
        },
        "vascular": {
          "observed": "46% below healthy block",
          "reference": "Typical difference <10%"
        },
        "pathload": {
          "observed": "18× action threshold",
          "reference": "Action threshold 1.0×"
        }
      },
      "reasons": {
        "salinity": "Salinity shares the hot canopy but conductivity is within the field baseline.",
        "drought": "Drought shares the hot/normal-EC pair, but soil moisture is adequate in the affected patches.",
        "camera": "Camera drift shares the loud pair, but an independent radiometer and direct plant physiology confirm real stress.",
        "fertigation": "No recent injection exists, conductivity is normal, and the plants are physiologically stressed.",
        "heatwave": "Weather can create hot canopies, low stomatal conductance, and even background pathogen detection. It does not produce the irregular lesion pattern and patch geometry together.",
        "samplingbias": "Sampling bias can reproduce positive DNA and low leaf-water values in selected patches, but the high lesion fraction provides independent root evidence. Its normal hydraulic conductance also conflicts with the root-level loss."
      },
      "resolve": {
        "title": "Root disease",
        "paras": [
          "The root zone is moist and nonsaline, yet stomata close and leaf-water potential falls. The root assay detects Pythium far above threshold, showing that diseased roots cannot supply the canopy.",
          "The molecular result is not accepted alone because background DNA can be detected in an otherwise weather-stressed field. Root lesions are not accepted alone because drought can damage fine roots. The two measurements, combined with the patch pattern and adequate soil water, force root disease."
        ],
        "why": {
          "loud": "<b>Why the loud readings tie:</b> several mechanisms can produce a hot canopy in nonsaline soil.",
          "quiet": "<b>Why the tie breaks:</b> adequate water, independent heat confirmation, and a positive root assay uniquely identify disease."
        },
        "chain": [
          "Root pathogen damages absorbing tissue",
          "Water uptake falls despite moist soil",
          "Plant hydraulics decline and canopy warms"
        ],
        "take": "When the environment looks adequate but the organism remains stressed, test the biological pathway that connects them."
      },
      "logic": [
        [
          "Hot canopy + normal EC",
          "Drought, root disease, camera drift, or hot weather remain"
        ],
        [
          "Pathogen detected + high DNA burden",
          "Root disease, camera/sampling bias, or background stress remain"
        ],
        [
          "Root lesions + low conductance",
          "Root disease or drought/heat injury remain"
        ],
        [
          "Molecular burden + structural root damage",
          "Root disease remains"
        ]
      ]
    },
    {
      "answer": "drought",
      "alarm": "moist",
      "experimental": false,
      "compound": [
        "drought",
        "rootdisease"
      ],
      "observed": {
        "canopy": "hot",
        "ec": "normal",
        "moist": "low",
        "stomata": "low",
        "pathogen": "positive",
        "ir2": "agree",
        "leafwater": "patchy-low",
        "fert": "missed",
        "rootlesion": "high",
        "pattern": "patchy",
        "vascular": "low",
        "pathload": "high"
      },
      "poleA": {
        "lab": "Two limits on water supply",
        "val": "Soil 13% VWC; pathogen 24× threshold",
        "note": "The field lacks water and the surviving roots are independently diseased."
      },
      "hook": "A failed irrigation valve dries the west block. Root samples from the same block also reveal an established pathogen.",
      "riddle": "One cause explains the soil and another explains why plants are worse than dryness alone predicts. <span class=\"q\">Which two causes are active?</span>",
      "vals": {
        "canopy": {
          "observed": "+7.0 to +8.3°C above air",
          "reference": "Healthy irrigated crop +0.5 to +2.5°C"
        },
        "ec": {
          "observed": "1.3–1.7 dS/m",
          "reference": "Field baseline 1.1–1.8 dS/m"
        },
        "moist": {
          "observed": "11–15% VWC",
          "reference": "Target 25–34%"
        },
        "stomata": {
          "observed": "41 mmol m⁻² s⁻¹",
          "reference": "Healthy midday 180–320"
        },
        "pathogen": {
          "observed": "Pythium DNA 24× detection threshold",
          "reference": "Expected below threshold"
        },
        "ir2": {
          "observed": "+7.5°C handheld radiometer",
          "reference": "Agreement target ±0.8°C"
        },
        "leafwater": {
          "observed": "−2.15 MPa",
          "reference": "Healthy midday −0.6 to −1.1 MPa"
        },
        "fert": {
          "observed": "Irrigation cycle missed twice",
          "reference": "Normal every 48 h"
        },
        "rootlesion": {
          "observed": "44% fine roots discolored",
          "reference": "Typical <8%"
        },
        "pattern": {
          "observed": "Patches within a field-wide dry background",
          "reference": "Single causes usually show one dominant pattern"
        },
        "vascular": {
          "observed": "49% below healthy block",
          "reference": "Typical difference <10%"
        },
        "pathload": {
          "observed": "21× action threshold",
          "reference": "Action threshold 1.0×"
        }
      },
      "reasons": {
        "salinity": "Conductivity is normal and cannot explain the dry soil or positive root-pathogen assay.",
        "drought": "Drought explains the 11–15% soil water and severe hydraulic stress, but not the positive pathogen assay and damaged roots.",
        "rootdisease": "Root disease explains impaired uptake and the assay, but not the independently measured irrigation-zone dryness.",
        "camera": "Two temperature methods agree and direct physiological measurements show severe real stress.",
        "fertigation": "There is no recent application, conductivity is normal, and the field is dry rather than newly irrigated.",
        "heatwave": "It explains hot canopies and low stomatal conductance, but not missed irrigation, low soil water, heavy root lesions, or irregular disease patches.",
        "samplingbias": "It explains selected pathogen and leaf-water samples but not the lesion fraction, low field moisture, or missed irrigation."
      },
      "resolve": {
        "title": "Water deficit + root disease",
        "paras": [
          "The failed irrigation valve leaves the soil far below target, while Pythium has independently damaged the roots that remain. Both mechanisms reduce water delivery to the canopy.",
          "The pair is harder because each half requires two clues. Drought needs both depleted soil water and missed irrigation; root disease needs both pathogen evidence and irregular lesions. Individual clues have realistic mimics, but the four-clue combination has only one closing pair."
        ],
        "why": {
          "loud": "<b>Why one cause fails:</b> soil-water content and root biological condition are independent constraints.",
          "quiet": "<b>Why the pair is forced:</b> only drought supplies the low VWC, and only root disease supplies the positive assay."
        },
        "chain": [
          "Irrigation failure depletes soil water",
          "Root disease reduces remaining uptake capacity",
          "Combined hydraulic limits produce extreme canopy heating"
        ],
        "take": "Two failures in series can produce stress far beyond either one; test both resource availability and the organism’s ability to use it."
      },
      "logic": [
        [
          "Low soil water + missed irrigation",
          "Requires genuine water deficit"
        ],
        [
          "High pathogen burden + root lesions",
          "Requires active root disease"
        ],
        [
          "Low conductance + patch geometry",
          "Corroborates damage across independent methods"
        ],
        [
          "Four-plus clues across soil, roots, and lab",
          "Drought and root disease are simultaneous"
        ]
      ]
    }
  ],
  "schematic": {
    "viewBox": "0 0 520 390",
    "svg": "<defs><linearGradient id=\"cleanBg\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#17341f\"/><stop offset=\"1\" stop-color=\"#091b11\"/></linearGradient><marker id=\"cleanArrow\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto\"><path d=\"M0 0 L10 5 L0 10 z\" fill=\"#69c9ef\"/></marker><style>.clean-border{fill:url(#cleanBg);stroke:#426273;stroke-width:2}.component{fill:#1b3a4d;stroke:#90b3c4;stroke-width:1.7}.component2{fill:#244c61;stroke:#90b3c4;stroke-width:1.7}.flow{fill:none;stroke:#69c9ef;stroke-width:3;marker-end:url(#cleanArrow)}.flow2{fill:none;stroke:#e0b85f;stroke-width:3;marker-end:url(#cleanArrow)}.leader{fill:none;stroke:#7f9bab;stroke-width:1.25;stroke-linecap:round;stroke-linejoin:round;opacity:.78}.anchor{fill:#9ab8c8}.slabel{fill:#eaf6fb;font:700 10.5px Inter,system-ui,sans-serif}.labelbg{fill:#081923;stroke:#355769;stroke-width:1;opacity:.94}</style></defs><rect x=\"12\" y=\"12\" width=\"496\" height=\"366\" rx=\"24\" class=\"clean-border\"/><path d=\"M 30 150 L 58 150 L 58 165 L 82 165\" class=\"leader\"/><circle cx=\"82\" cy=\"165\" r=\"2.4\" class=\"anchor\"/><path d=\"M 450 35 L 450 68 L 430 68 L 430 85\" class=\"leader\"/><circle cx=\"430\" cy=\"85\" r=\"2.4\" class=\"anchor\"/><path d=\"M 250 35 L 250 68 L 250 68 L 250 105\" class=\"leader\"/><circle cx=\"250\" cy=\"105\" r=\"2.4\" class=\"anchor\"/><path d=\"M 320 35 L 320 68 L 300 68 L 300 130\" class=\"leader\"/><circle cx=\"300\" cy=\"130\" r=\"2.4\" class=\"anchor\"/><path d=\"M 490 95 L 462 95 L 462 145 L 350 145\" class=\"leader\"/><circle cx=\"350\" cy=\"145\" r=\"2.4\" class=\"anchor\"/><path d=\"M 490 150 L 462 150 L 462 195 L 350 195\" class=\"leader\"/><circle cx=\"350\" cy=\"195\" r=\"2.4\" class=\"anchor\"/><path d=\"M 490 210 L 462 210 L 462 250 L 385 250\" class=\"leader\"/><circle cx=\"385\" cy=\"250\" r=\"2.4\" class=\"anchor\"/><path d=\"M 490 270 L 462 270 L 462 280 L 420 280\" class=\"leader\"/><circle cx=\"420\" cy=\"280\" r=\"2.4\" class=\"anchor\"/><path d=\"M 450 355 L 450 327 L 430 327 L 430 310\" class=\"leader\"/><circle cx=\"430\" cy=\"310\" r=\"2.4\" class=\"anchor\"/><path d=\"M 370 355 L 370 327 L 390 327 L 390 300\" class=\"leader\"/><circle cx=\"390\" cy=\"300\" r=\"2.4\" class=\"anchor\"/><path d=\"M 230 355 L 230 327 L 230 327 L 230 280\" class=\"leader\"/><circle cx=\"230\" cy=\"280\" r=\"2.4\" class=\"anchor\"/><path d=\"M 140 355 L 140 327 L 150 327 L 150 280\" class=\"leader\"/><circle cx=\"150\" cy=\"280\" r=\"2.4\" class=\"anchor\"/><path d=\"M38 165 C115 142 182 178 260 158 S410 145 482 165\" fill=\"#4f7c42\" stroke=\"#9ac58a\" stroke-width=\"2\"/><rect x=\"38\" y=\"165\" width=\"444\" height=\"150\" fill=\"#735535\" opacity=\".88\"/><path d=\"M280 126 V174 M258 149 H302\" stroke=\"#9ac58a\" stroke-width=\"4\"/><path d=\"M275 174 C260 205 252 245 230 282 M285 174 C300 205 322 236 382 277 M280 174 C280 220 282 255 282 298\" fill=\"none\" stroke=\"#dfc095\" stroke-width=\"3\"/><circle cx=\"430\" cy=\"85\" r=\"21\" class=\"component\"/><rect x=\"58\" y=\"145\" width=\"48\" height=\"38\" rx=\"8\" class=\"component\"/><rect x=\"382\" y=\"245\" width=\"82\" height=\"72\" rx=\"11\" class=\"component\"/><g><rect x=\"244.0\" y=\"100.5\" width=\"72\" height=\"23\" rx=\"11.5\" class=\"labelbg\"/><text x=\"280\" y=\"115.7\" text-anchor=\"middle\" class=\"slabel\">canopy</text></g><g><rect x=\"239.0\" y=\"317.5\" width=\"82\" height=\"23\" rx=\"11.5\" class=\"labelbg\"/><text x=\"280\" y=\"332.7\" text-anchor=\"middle\" class=\"slabel\">root zone</text></g><g><rect x=\"389.0\" y=\"210.5\" width=\"82\" height=\"23\" rx=\"11.5\" class=\"labelbg\"/><text x=\"430\" y=\"225.7\" text-anchor=\"middle\" class=\"slabel\">root + lab</text></g><g><rect x=\"44.0\" y=\"185.5\" width=\"76\" height=\"23\" rx=\"11.5\" class=\"labelbg\"/><text x=\"82\" y=\"200.7\" text-anchor=\"middle\" class=\"slabel\">fertigation</text></g><g><rect x=\"401.0\" y=\"43.5\" width=\"58\" height=\"23\" rx=\"11.5\" class=\"labelbg\"/><text x=\"430\" y=\"58.7\" text-anchor=\"middle\" class=\"slabel\">IR view</text></g>"
  }
} };
