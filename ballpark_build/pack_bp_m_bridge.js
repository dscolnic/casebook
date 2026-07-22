module.exports = { PACK: {
  "id": "bp_m_bridge",
  "title": "Golden Gate Bridge by the Numbers",
  "casebookTitle": "The Halloway Span",
  "tag": "bridges · cables · traffic",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Main span",
      "The distance between a bridge’s principal towers."
    ],
    [
      "Main cable",
      "A large cable carrying the suspended roadway load."
    ],
    [
      "Suspender rope",
      "A vertical cable connecting the deck to a main cable."
    ],
    [
      "Traffic volume",
      "The number of vehicles crossing during a time period."
    ]
  ],
  "eqs": [
    {
      "id": "span_fields",
      "q": "Main span length: estimate the result in football fields using the real-world facts below.",
      "unit": "football fields",
      "factors": [
        {
          "label": "Main span length",
          "unit": "feet",
          "value": 4200,
          "display": "4,200",
          "desc": "Golden Gate Bridge District main-span length.",
          "source": {
            "label": "Golden Gate Bridge District — facts and figures",
            "url": "https://www.goldengate.org/exhibits/facts-and-figures-about-the-bridge/",
            "accessed": "2026-07-18"
          },
          "id": "span_fields_f0",
          "playDesc": "Golden Gate Bridge District main-span length."
        },
        {
          "label": "Feet per full football field",
          "unit": "feet per field",
          "value": 360,
          "display": "360",
          "desc": "A 120-yard field including end zones.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "span_fields_f1",
          "playDesc": "A 120-yard field including end zones."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 11.666666666666666,
      "answerDisplay": "11.67",
      "explain": "Divide span length by full field length.",
      "revealQ": "How many 120-yard football fields fit end to end across the Golden Gate Bridge’s main span?",
      "sources": [
        {
          "label": "Golden Gate Bridge District — facts and figures",
          "url": "https://www.goldengate.org/exhibits/facts-and-figures-about-the-bridge/",
          "accessed": "2026-07-18"
        },
        {
          "label": "Defined mathematical relationship",
          "url": "https://www.nist.gov/pml/special-publication-811",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "wire_earths",
      "q": "Main-cable wire length: estimate the result in Earth circumferences using the real-world facts below.",
      "unit": "Earth circumferences",
      "factors": [
        {
          "label": "Main-cable wire length",
          "unit": "miles",
          "value": 80000,
          "display": "80,000",
          "desc": "Published length of galvanized wire in both cables.",
          "source": {
            "label": "Golden Gate Bridge District — cable statistics",
            "url": "https://www.goldengate.org/bridge/history-research/statistics-data/design-construction-stats/",
            "accessed": "2026-07-18"
          },
          "id": "wire_earths_f0",
          "playDesc": "Published length of galvanized wire in both cables."
        },
        {
          "label": "Earth equatorial circumference",
          "unit": "miles",
          "value": 24901,
          "display": "24,901",
          "desc": "Standard Earth circumference comparison.",
          "source": {
            "label": "NASA — Apophis facts",
            "url": "https://science.nasa.gov/solar-system/asteroids/apophis-facts/",
            "accessed": "2026-07-18"
          },
          "id": "wire_earths_f1",
          "playDesc": "The earth equatorial circumference documented or defined by NASA — Apophis facts."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 3.212722380627284,
      "answerDisplay": "3.213",
      "explain": "Divide wire length by Earth’s circumference.",
      "revealQ": "How many times could the wire in the two main cables circle Earth?",
      "sources": [
        {
          "label": "Golden Gate Bridge District — cable statistics",
          "url": "https://www.goldengate.org/bridge/history-research/statistics-data/design-construction-stats/",
          "accessed": "2026-07-18"
        },
        {
          "label": "NASA — Apophis facts",
          "url": "https://science.nasa.gov/solar-system/asteroids/apophis-facts/",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "annual_traffic",
      "q": "Vehicles per day: estimate the result in million vehicles using the real-world facts below.",
      "unit": "million vehicles",
      "factors": [
        {
          "label": "Vehicles per day",
          "unit": "vehicles per day",
          "value": 112000,
          "display": "112,000",
          "desc": "Bridge District operating figure.",
          "source": {
            "label": "Golden Gate Bridge District — bridge operations",
            "url": "https://www.goldengate.org/bridge/bridge-operations/",
            "accessed": "2026-07-18"
          },
          "id": "annual_traffic_f0",
          "playDesc": "Bridge District operating figure."
        },
        {
          "label": "Days per year",
          "unit": "days",
          "value": 365,
          "display": "365",
          "desc": "Calendar conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "annual_traffic_f1",
          "playDesc": "The number of days corresponding to one year."
        },
        {
          "label": "Vehicles per million",
          "unit": "vehicles per million",
          "value": 1000000,
          "display": "1,000,000",
          "desc": "Number-scale conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "annual_traffic_f2",
          "playDesc": "The number of vehicles corresponding to one million."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "answer": 40.88,
      "answerDisplay": "40.88",
      "explain": "Multiply daily traffic by days, then express the result in millions.",
      "revealQ": "About how many million vehicle crossings occur in one year at the cited daily traffic level?",
      "sources": [
        {
          "label": "Golden Gate Bridge District — bridge operations",
          "url": "https://www.goldengate.org/bridge/bridge-operations/",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "weight_per_foot",
      "q": "Bridge weight: estimate the result in short tons per foot using the real-world facts below.",
      "unit": "short tons per foot",
      "factors": [
        {
          "label": "Bridge weight",
          "unit": "pounds",
          "value": 840000000,
          "display": "840,000,000",
          "desc": "Published bridge weight excluding concrete anchorages.",
          "source": {
            "label": "Golden Gate Bridge District — facts and figures",
            "url": "https://www.goldengate.org/exhibits/facts-and-figures-about-the-bridge/",
            "accessed": "2026-07-18"
          },
          "id": "weight_per_foot_f0",
          "playDesc": "Published bridge weight excluding concrete anchorages."
        },
        {
          "label": "Total bridge length",
          "unit": "feet",
          "value": 8981,
          "display": "8,981",
          "desc": "Length including approaches between abutments.",
          "source": {
            "label": "Golden Gate Bridge District — facts and figures",
            "url": "https://www.goldengate.org/exhibits/facts-and-figures-about-the-bridge/",
            "accessed": "2026-07-18"
          },
          "id": "weight_per_foot_f1",
          "playDesc": "Length including approaches between abutments."
        },
        {
          "label": "Pounds per short ton",
          "unit": "pounds per ton",
          "value": 2000,
          "display": "2,000",
          "desc": "Defined U.S. mass conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "weight_per_foot_f2",
          "playDesc": "The conversion factor from one short ton to pounds."
        }
      ],
      "ops": [
        "÷",
        "÷"
      ],
      "answer": 46.76539360872954,
      "answerDisplay": "46.77",
      "explain": "Divide total weight by length, then convert pounds to short tons.",
      "revealQ": "How many short tons of bridge structure correspond to each foot of total bridge length?",
      "sources": [
        {
          "label": "Golden Gate Bridge District — facts and figures",
          "url": "https://www.goldengate.org/exhibits/facts-and-figures-about-the-bridge/",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ]
    }
  ],
  "sourceSummary": "Every playable value is linked to an official, institutional, scholarly, or defined-conversion source in the reveal."
} };
