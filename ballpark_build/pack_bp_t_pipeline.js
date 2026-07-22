module.exports = { PACK: {
  "id": "bp_t_pipeline",
  "title": "The Keystone Pipeline by the Numbers",
  "casebookTitle": "The Brant Hollow Pipeline",
  "tag": "pipelines · flow · pressure waves",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Throughput",
      "Volume transported per unit time."
    ],
    [
      "Internal diameter",
      "Open width through which product flows."
    ],
    [
      "Pressure wave",
      "A rapid pressure disturbance traveling through a pipe."
    ],
    [
      "Petroleum barrel",
      "A volume of forty-two U.S. gallons."
    ]
  ],
  "eqs": [
    {
      "id": "length_miles",
      "q": "Pipeline length: estimate the result in miles using the real-world facts below.",
      "unit": "miles",
      "factors": [
        {
          "label": "Pipeline length",
          "unit": "kilometres",
          "value": 4324,
          "display": "4,324",
          "desc": "Published system length.",
          "source": {
            "label": "Government of Canada — Keystone pipeline facts",
            "url": "https://www.cer-rec.gc.ca/en/data-analysis/facilities-we-regulate/canadas-pipeline-system/2021/keystone-pipeline.html",
            "accessed": "2026-07-18"
          },
          "id": "length_miles_f0",
          "playDesc": "Published system length."
        },
        {
          "label": "Miles per kilometre",
          "unit": "miles per kilometre",
          "value": 0.621371,
          "display": "0.621371",
          "desc": "Defined length conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "length_miles_f1",
          "playDesc": "The number of miles corresponding to one kilometre."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 2686.808204,
      "answerDisplay": "2,686.8",
      "explain": "Convert kilometres to miles.",
      "revealQ": "How many miles long is the 4,324-kilometre Keystone system?",
      "sources": [
        {
          "label": "Government of Canada — Keystone pipeline facts",
          "url": "https://www.cer-rec.gc.ca/en/data-analysis/facilities-we-regulate/canadas-pipeline-system/2021/keystone-pipeline.html",
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
      "id": "diameter_metres",
      "q": "Pipe diameter: estimate the result in metres using the real-world facts below.",
      "unit": "metres",
      "factors": [
        {
          "label": "Pipe diameter",
          "unit": "inches",
          "value": 36,
          "display": "36",
          "desc": "Published mainline diameter.",
          "source": {
            "label": "Government of Canada — Keystone pipeline facts",
            "url": "https://www.cer-rec.gc.ca/en/data-analysis/facilities-we-regulate/canadas-pipeline-system/2021/keystone-pipeline.html",
            "accessed": "2026-07-18"
          },
          "id": "diameter_metres_f0",
          "playDesc": "Published mainline diameter."
        },
        {
          "label": "Metres per inch",
          "unit": "metres per inch",
          "value": 0.0254,
          "display": "0.0254",
          "desc": "Defined length conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "diameter_metres_f1",
          "playDesc": "The number of metres corresponding to one inch."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 0.9144,
      "answerDisplay": "0.9144",
      "explain": "Convert inches to metres.",
      "revealQ": "How many metres is a thirty-six-inch pipe diameter?",
      "sources": [
        {
          "label": "Government of Canada — Keystone pipeline facts",
          "url": "https://www.cer-rec.gc.ca/en/data-analysis/facilities-we-regulate/canadas-pipeline-system/2021/keystone-pipeline.html",
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
      "id": "daily_pools",
      "q": "Pipeline capacity: estimate the result in pools per day using the real-world facts below.",
      "unit": "pools per day",
      "factors": [
        {
          "label": "Pipeline capacity",
          "unit": "barrels per day",
          "value": 830000,
          "display": "830,000",
          "desc": "Published capacity.",
          "source": {
            "label": "Government of Canada — Keystone pipeline facts",
            "url": "https://www.cer-rec.gc.ca/en/data-analysis/facilities-we-regulate/canadas-pipeline-system/2021/keystone-pipeline.html",
            "accessed": "2026-07-18"
          },
          "id": "daily_pools_f0",
          "playDesc": "Published capacity."
        },
        {
          "label": "Litres per barrel",
          "unit": "litres per barrel",
          "value": 159,
          "display": "159",
          "desc": "Standard petroleum-barrel conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "daily_pools_f1",
          "playDesc": "The number of litres corresponding to one barrel."
        },
        {
          "label": "Litres per Olympic pool",
          "unit": "litres per pool",
          "value": 2500000,
          "display": "2,500,000",
          "desc": "Common pool comparison volume.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "daily_pools_f2",
          "playDesc": "Common pool comparison volume."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "answer": 52.788,
      "answerDisplay": "52.79",
      "explain": "Convert barrels to litres and divide by pool volume.",
      "revealQ": "How many Olympic pools equal 830,000 barrels per day?",
      "sources": [
        {
          "label": "Government of Canada — Keystone pipeline facts",
          "url": "https://www.cer-rec.gc.ca/en/data-analysis/facilities-we-regulate/canadas-pipeline-system/2021/keystone-pipeline.html",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
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
      "id": "pressure_travel",
      "q": "Pipeline distance: estimate the result in days using the real-world facts below.",
      "unit": "days",
      "factors": [
        {
          "label": "Pipeline distance",
          "unit": "metres",
          "value": 4324000,
          "display": "4,324,000",
          "desc": "Published length expressed directly in metres.",
          "source": {
            "label": "Government of Canada — Keystone pipeline facts",
            "url": "https://www.cer-rec.gc.ca/en/data-analysis/facilities-we-regulate/canadas-pipeline-system/2021/keystone-pipeline.html",
            "accessed": "2026-07-18"
          },
          "id": "pressure_travel_f0",
          "playDesc": "Published length expressed directly in metres."
        },
        {
          "label": "Pressure-wave speed",
          "unit": "metres per second",
          "value": 1.5,
          "display": "1.5",
          "desc": "Illustrative slow transient-propagation scale.",
          "source": {
            "label": "Government of Canada — Keystone pipeline facts",
            "url": "https://www.cer-rec.gc.ca/en/data-analysis/facilities-we-regulate/canadas-pipeline-system/2021/keystone-pipeline.html",
            "accessed": "2026-07-18"
          },
          "id": "pressure_travel_f1",
          "playDesc": "Illustrative slow transient-propagation scale."
        },
        {
          "label": "Seconds per day",
          "unit": "seconds per day",
          "value": 86400,
          "display": "86,400",
          "desc": "Defined time conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "pressure_travel_f2",
          "playDesc": "The number of seconds corresponding to one day."
        }
      ],
      "ops": [
        "÷",
        "÷"
      ],
      "answer": 33.364197530864196,
      "answerDisplay": "33.36",
      "explain": "Distance divided by speed gives seconds; convert to days.",
      "revealQ": "How many days would a pressure disturbance moving at 1.5 metres per second take to traverse 4,324,000 metres?",
      "sources": [
        {
          "label": "Government of Canada — Keystone pipeline facts",
          "url": "https://www.cer-rec.gc.ca/en/data-analysis/facilities-we-regulate/canadas-pipeline-system/2021/keystone-pipeline.html",
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
