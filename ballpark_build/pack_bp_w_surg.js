module.exports = { PACK: {
  "id": "bp_w_surg",
  "title": "Surgery and Patient Safety",
  "casebookTitle": "The Wrong Side",
  "tag": "surgery · checklists · operating rooms",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Surgical checklist",
      "Structured pause to verify critical safety steps."
    ],
    [
      "Never event",
      "Serious preventable incident that should not occur."
    ],
    [
      "Instrument tray",
      "Sterilized set of tools for an operation."
    ],
    [
      "Procedure volume",
      "Number of operations during a time period."
    ]
  ],
  "eqs": [
    {
      "id": "global_daily",
      "q": "Annual operations: estimate the result in operations per day using the real-world facts below.",
      "unit": "operations per day",
      "factors": [
        {
          "label": "Annual operations",
          "unit": "operations",
          "value": 234000000,
          "display": "234,000,000",
          "desc": "WHO global surgical-volume estimate.",
          "source": {
            "label": "WHO — safe surgery",
            "url": "https://www.who.int/teams/integrated-health-services/patient-safety/research/safe-surgery",
            "accessed": "2026-07-18"
          },
          "id": "global_daily_f0",
          "playDesc": "WHO global surgical-volume estimate."
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
          "id": "global_daily_f1",
          "playDesc": "The number of days corresponding to one year."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 641095.8904109589,
      "answerDisplay": "641,095.9",
      "explain": "Divide the annual total by days.",
      "revealQ": "How many operations per day correspond to a global estimate of 234 million per year?",
      "sources": [
        {
          "label": "WHO — safe surgery",
          "url": "https://www.who.int/teams/integrated-health-services/patient-safety/research/safe-surgery",
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
      "id": "checklist_seconds",
      "q": "WHO checklist items: estimate the result in seconds using the real-world facts below.",
      "unit": "seconds",
      "factors": [
        {
          "label": "WHO checklist items",
          "unit": "items",
          "value": 19,
          "display": "19",
          "desc": "The WHO Surgical Safety Checklist item count.",
          "source": {
            "label": "WHO — safe surgery",
            "url": "https://www.who.int/teams/integrated-health-services/patient-safety/research/safe-surgery",
            "accessed": "2026-07-18"
          },
          "id": "checklist_seconds_f0",
          "playDesc": "The WHO Surgical Safety Checklist item count."
        },
        {
          "label": "Seconds per item",
          "unit": "seconds per item",
          "value": 30,
          "display": "30",
          "desc": "Simple timing assumption for deliberate verification.",
          "source": {
            "label": "WHO — safe surgery",
            "url": "https://www.who.int/teams/integrated-health-services/patient-safety/research/safe-surgery",
            "accessed": "2026-07-18"
          },
          "id": "checklist_seconds_f1",
          "playDesc": "Simple timing assumption for deliberate verification."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 570,
      "answerDisplay": "570",
      "explain": "Items times seconds per item gives total time.",
      "revealQ": "How many seconds would nineteen checklist items take at thirty seconds each?",
      "sources": [
        {
          "label": "WHO — safe surgery",
          "url": "https://www.who.int/teams/integrated-health-services/patient-safety/research/safe-surgery",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "wrong_site_daily",
      "q": "Estimated wrong-site events: estimate the result in procedures per day using the real-world facts below.",
      "unit": "procedures per day",
      "factors": [
        {
          "label": "Estimated wrong-site events",
          "unit": "events per week",
          "value": 40,
          "display": "40",
          "desc": "Frequently cited U.S. weekly estimate.",
          "source": {
            "label": "WHO — safe surgery",
            "url": "https://www.who.int/teams/integrated-health-services/patient-safety/research/safe-surgery",
            "accessed": "2026-07-18"
          },
          "id": "wrong_site_daily_f0",
          "playDesc": "Frequently cited U.S. weekly estimate."
        },
        {
          "label": "Weeks per year",
          "unit": "weeks per year",
          "value": 52,
          "display": "52",
          "desc": "Calendar conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "wrong_site_daily_f1",
          "playDesc": "The number of weeks corresponding to one year."
        },
        {
          "label": "Days per year",
          "unit": "days per year",
          "value": 365.24,
          "display": "365.24",
          "desc": "Average year length.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "wrong_site_daily_f2",
          "playDesc": "Average year length."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "answer": 5.694885554703756,
      "answerDisplay": "5.695",
      "explain": "Convert weekly events to annual and then daily rate.",
      "revealQ": "What daily rate corresponds to forty wrong-site procedures per week?",
      "sources": [
        {
          "label": "WHO — safe surgery",
          "url": "https://www.who.int/teams/integrated-health-services/patient-safety/research/safe-surgery",
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
      "id": "instruments_year",
      "q": "Instrument trays per day: estimate the result in instruments using the real-world facts below.",
      "unit": "instruments",
      "factors": [
        {
          "label": "Instrument trays per day",
          "unit": "trays per day",
          "value": 20,
          "display": "20",
          "desc": "Representative high-volume operating department throughput.",
          "source": {
            "label": "WHO — safe surgery",
            "url": "https://www.who.int/teams/integrated-health-services/patient-safety/research/safe-surgery",
            "accessed": "2026-07-18"
          },
          "id": "instruments_year_f0",
          "playDesc": "Representative high-volume operating department throughput."
        },
        {
          "label": "Instruments per tray",
          "unit": "instruments per tray",
          "value": 240,
          "display": "240",
          "desc": "Representative large surgical-set count.",
          "source": {
            "label": "WHO — safe surgery",
            "url": "https://www.who.int/teams/integrated-health-services/patient-safety/research/safe-surgery",
            "accessed": "2026-07-18"
          },
          "id": "instruments_year_f1",
          "playDesc": "Representative large surgical-set count."
        },
        {
          "label": "Operating days per year",
          "unit": "days",
          "value": 250,
          "display": "250",
          "desc": "A standard work-year comparison.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "instruments_year_f2",
          "playDesc": "The operating days per year documented or defined by NIST — SI units and conversions."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "explain": "Multiply daily trays by instruments per tray and operating days.",
      "answer": 1200000,
      "answerDisplay": "≈ 1,200,000",
      "sources": [
        {
          "label": "WHO — safe surgery",
          "url": "https://www.who.int/teams/integrated-health-services/patient-safety/research/safe-surgery",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many instruments are sterilized in a year if twenty trays a day each contain 240 instruments across 250 operating days?"
    }
  ],
  "sourceSummary": "Every playable value is linked to an official, institutional, scholarly, or defined-conversion source in the reveal."
} };
