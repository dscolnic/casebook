module.exports = { PACK: {
  "id": "bp_blackout",
  "title": "The 2003 Northeast Blackout",
  "casebookTitle": "The Cascade",
  "tag": "electric grid · cascading failure · restoration",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Cascading failure",
      "A disturbance that triggers additional failures across a connected system."
    ],
    [
      "Load lost",
      "Electrical demand suddenly disconnected from supply."
    ],
    [
      "Generating unit",
      "One electricity-producing machine."
    ],
    [
      "Restoration",
      "Process of safely returning customers and equipment to service."
    ]
  ],
  "eqs": [
    {
      "id": "people_per_state",
      "q": "People affected: estimate the result in people per state using the real-world facts below.",
      "unit": "people per state",
      "factors": [
        {
          "label": "People affected",
          "unit": "people",
          "value": 50000000,
          "display": "50,000,000",
          "desc": "Widely reported U.S.-Canada affected population scale.",
          "source": {
            "label": "U.S. DOE — 2003 blackout report",
            "url": "https://www.energy.gov/oe/articles/blackout-2003-final-report",
            "accessed": "2026-07-18"
          },
          "id": "people_per_state_f0",
          "playDesc": "Widely reported U.S.-Canada affected population scale."
        },
        {
          "label": "U.S. states affected",
          "unit": "states",
          "value": 8,
          "display": "8",
          "desc": "Number of U.S. states in the principal affected region.",
          "source": {
            "label": "U.S. DOE — 2003 blackout report",
            "url": "https://www.energy.gov/oe/articles/blackout-2003-final-report",
            "accessed": "2026-07-18"
          },
          "id": "people_per_state_f1",
          "playDesc": "Number of U.S. states in the principal affected region."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 6250000,
      "answerDisplay": "6,250,000",
      "explain": "Divide affected people by U.S. states.",
      "revealQ": "If fifty million people were affected across eight U.S. states, what was the average per state?",
      "sources": [
        {
          "label": "U.S. DOE — 2003 blackout report",
          "url": "https://www.energy.gov/oe/articles/blackout-2003-final-report",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "units_per_plant",
      "q": "Generating units affected: estimate the result in units per plant using the real-world facts below.",
      "unit": "units per plant",
      "factors": [
        {
          "label": "Generating units affected",
          "unit": "units",
          "value": 508,
          "display": "508",
          "desc": "Final investigation count.",
          "source": {
            "label": "U.S. DOE — 2003 blackout report",
            "url": "https://www.energy.gov/oe/articles/blackout-2003-final-report",
            "accessed": "2026-07-18"
          },
          "id": "units_per_plant_f0",
          "playDesc": "The generating units affected documented or defined by U.S. DOE — 2003 blackout report."
        },
        {
          "label": "Power plants affected",
          "unit": "plants",
          "value": 265,
          "display": "265",
          "desc": "Final investigation count.",
          "source": {
            "label": "U.S. DOE — 2003 blackout report",
            "url": "https://www.energy.gov/oe/articles/blackout-2003-final-report",
            "accessed": "2026-07-18"
          },
          "id": "units_per_plant_f1",
          "playDesc": "The power plants affected documented or defined by U.S. DOE — 2003 blackout report."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 1.9169811320754717,
      "answerDisplay": "1.917",
      "explain": "Divide generating units by plants.",
      "revealQ": "How many generating units were affected per power plant on average?",
      "sources": [
        {
          "label": "U.S. DOE — 2003 blackout report",
          "url": "https://www.energy.gov/oe/articles/blackout-2003-final-report",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "outage_seconds",
      "q": "Restoration period: estimate the result in seconds using the real-world facts below.",
      "unit": "seconds",
      "factors": [
        {
          "label": "Restoration period",
          "unit": "days",
          "value": 4,
          "display": "4",
          "desc": "Upper-scale time before broad restoration.",
          "source": {
            "label": "U.S. DOE — 2003 blackout report",
            "url": "https://www.energy.gov/oe/articles/blackout-2003-final-report",
            "accessed": "2026-07-18"
          },
          "id": "outage_seconds_f0",
          "playDesc": "Upper-scale time before broad restoration."
        },
        {
          "label": "Hours per day",
          "unit": "hours per day",
          "value": 24,
          "display": "24",
          "desc": "Defined time conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "outage_seconds_f1",
          "playDesc": "The number of hours corresponding to one day."
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
          "id": "outage_seconds_f2",
          "playDesc": "The number of seconds corresponding to one hour."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "answer": 345600,
      "answerDisplay": "345,600",
      "explain": "Convert days to hours and then seconds.",
      "revealQ": "How many seconds are in a four-day restoration period?",
      "sources": [
        {
          "label": "U.S. DOE — 2003 blackout report",
          "url": "https://www.energy.gov/oe/articles/blackout-2003-final-report",
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
      "id": "watts_per_customer",
      "q": "Load lost: estimate the result in watts per customer using the real-world facts below.",
      "unit": "watts per customer",
      "factors": [
        {
          "label": "Load lost",
          "unit": "gigawatts",
          "value": 61.8,
          "display": "61.8",
          "desc": "Reported peak lost-load scale.",
          "source": {
            "label": "U.S. DOE — 2003 blackout report",
            "url": "https://www.energy.gov/oe/articles/blackout-2003-final-report",
            "accessed": "2026-07-18"
          },
          "id": "watts_per_customer_f0",
          "playDesc": "Reported peak lost-load scale."
        },
        {
          "label": "Watts per gigawatt",
          "unit": "watts per gigawatt",
          "value": 1000000000,
          "display": "1,000,000,000",
          "desc": "Defined power conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "watts_per_customer_f1",
          "playDesc": "The number of watts corresponding to one gigawatt."
        },
        {
          "label": "Affected customers",
          "unit": "customers",
          "value": 10000000,
          "display": "10,000,000",
          "desc": "Rounded customer-account scale.",
          "source": {
            "label": "U.S. DOE — 2003 blackout report",
            "url": "https://www.energy.gov/oe/articles/blackout-2003-final-report",
            "accessed": "2026-07-18"
          },
          "id": "watts_per_customer_f2",
          "playDesc": "Rounded customer-account scale."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "answer": 6180,
      "answerDisplay": "6,180",
      "explain": "Convert gigawatts to watts and divide by customers.",
      "revealQ": "How many watts of lost load correspond to each of ten million affected customers?",
      "sources": [
        {
          "label": "U.S. DOE — 2003 blackout report",
          "url": "https://www.energy.gov/oe/articles/blackout-2003-final-report",
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
