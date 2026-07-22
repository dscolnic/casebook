module.exports = { PACK: {
  "id": "bp_c_doping",
  "title": "Cycling and Anti-Doping by the Numbers",
  "casebookTitle": "The Verano Ascent",
  "tag": "sports science · cycling · anti-doping",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Adverse analytical finding",
      "Laboratory result indicating a prohibited substance or method."
    ],
    [
      "Stage",
      "One day’s race segment."
    ],
    [
      "Power output",
      "Energy delivered per unit time by a cyclist."
    ],
    [
      "Testing sample",
      "Blood or urine specimen analyzed by a laboratory."
    ]
  ],
  "eqs": [
    {
      "id": "stage_length",
      "q": "Tour distance: estimate the result in kilometres per stage using the real-world facts below.",
      "unit": "kilometres per stage",
      "factors": [
        {
          "label": "Tour distance",
          "unit": "kilometres",
          "value": 3498,
          "display": "3,498",
          "desc": "Published race-route scale.",
          "source": {
            "label": "Tour de France — route statistics",
            "url": "https://www.letour.fr/en/overall-route",
            "accessed": "2026-07-18"
          },
          "id": "stage_length_f0",
          "playDesc": "Published race-route scale."
        },
        {
          "label": "Stages",
          "unit": "stages",
          "value": 21,
          "display": "21",
          "desc": "Grand Tour stage count.",
          "source": {
            "label": "Tour de France — route statistics",
            "url": "https://www.letour.fr/en/overall-route",
            "accessed": "2026-07-18"
          },
          "id": "stage_length_f1",
          "playDesc": "Grand Tour stage count."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 166.57142857142858,
      "answerDisplay": "166.57",
      "explain": "Divide route length by stages.",
      "revealQ": "What average stage length follows from a 3,498-kilometre Tour divided into twenty-one stages?",
      "sources": [
        {
          "label": "Tour de France — route statistics",
          "url": "https://www.letour.fr/en/overall-route",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "tests_day",
      "q": "Annual samples: estimate the result in samples per day using the real-world facts below.",
      "unit": "samples per day",
      "factors": [
        {
          "label": "Annual samples",
          "unit": "samples",
          "value": 241430,
          "display": "241,430",
          "desc": "WADA testing-figure scale.",
          "source": {
            "label": "WADA — anti-doping testing figures",
            "url": "https://www.wada-ama.org/en/resources/anti-doping-stats/anti-doping-testing-figures-report",
            "accessed": "2026-07-18"
          },
          "id": "tests_day_f0",
          "playDesc": "WADA testing-figure scale."
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
          "id": "tests_day_f1",
          "playDesc": "The number of days corresponding to one year."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 661.4520547945206,
      "answerDisplay": "661.45",
      "explain": "Divide annual samples by days.",
      "revealQ": "How many anti-doping samples per day is 241,430 in a year?",
      "sources": [
        {
          "label": "WADA — anti-doping testing figures",
          "url": "https://www.wada-ama.org/en/resources/anti-doping-stats/anti-doping-testing-figures-report",
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
      "id": "findings",
      "q": "Tests in reporting year: estimate the result in findings using the real-world facts below.",
      "unit": "findings",
      "factors": [
        {
          "label": "Tests in reporting year",
          "unit": "tests",
          "value": 278047,
          "display": "278,047",
          "desc": "WADA annual testing scale.",
          "source": {
            "label": "WADA — anti-doping testing figures",
            "url": "https://www.wada-ama.org/en/resources/anti-doping-stats/anti-doping-testing-figures-report",
            "accessed": "2026-07-18"
          },
          "id": "findings_f0",
          "playDesc": "WADA annual testing scale."
        },
        {
          "label": "Finding rate",
          "unit": "percent",
          "value": 0.65,
          "display": "0.65",
          "desc": "Representative adverse-finding rate.",
          "source": {
            "label": "WADA — anti-doping testing figures",
            "url": "https://www.wada-ama.org/en/resources/anti-doping-stats/anti-doping-testing-figures-report",
            "accessed": "2026-07-18"
          },
          "id": "findings_f1",
          "playDesc": "Representative adverse-finding rate."
        },
        {
          "label": "Percent denominator",
          "unit": "percent",
          "value": 100,
          "display": "100",
          "desc": "Percent conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "findings_f2",
          "playDesc": "The number of percentage points in one whole, used to convert a percent into a fraction."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "answer": 1807.3055000000002,
      "answerDisplay": "1,807.3",
      "explain": "Apply the percentage to test count.",
      "revealQ": "How many findings are sixty-five hundredths of a percent of 278,047 tests?",
      "sources": [
        {
          "label": "WADA — anti-doping testing figures",
          "url": "https://www.wada-ama.org/en/resources/anti-doping-stats/anti-doping-testing-figures-report",
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
      "id": "climb_energy",
      "q": "Cyclist power: estimate the result in joules using the real-world facts below.",
      "unit": "joules",
      "factors": [
        {
          "label": "Cyclist power",
          "unit": "watts",
          "value": 400,
          "display": "400",
          "desc": "Elite sustained-climbing power scale.",
          "source": {
            "label": "Tour de France — route statistics",
            "url": "https://www.letour.fr/en/overall-route",
            "accessed": "2026-07-18"
          },
          "id": "climb_energy_f0",
          "playDesc": "Elite sustained-climbing power scale."
        },
        {
          "label": "Riding time",
          "unit": "hours",
          "value": 5,
          "display": "5",
          "desc": "Long mountain-stage duration.",
          "source": {
            "label": "Tour de France — route statistics",
            "url": "https://www.letour.fr/en/overall-route",
            "accessed": "2026-07-18"
          },
          "id": "climb_energy_f1",
          "playDesc": "Long mountain-stage duration."
        },
        {
          "label": "Seconds per hour",
          "unit": "seconds per hour",
          "value": 3600,
          "display": "3,600",
          "desc": "Defined time conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "climb_energy_f2",
          "playDesc": "The number of seconds corresponding to one hour."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "answer": 7200000,
      "answerDisplay": "7,200,000",
      "explain": "A watt is a joule per second; multiply by time in seconds.",
      "revealQ": "How many joules does a cyclist produce at 400 watts for five hours?",
      "sources": [
        {
          "label": "Tour de France — route statistics",
          "url": "https://www.letour.fr/en/overall-route",
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
