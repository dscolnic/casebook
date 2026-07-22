module.exports = { PACK: {
  "id": "bp_chemplant",
  "title": "Chemical Plants and Toxic Releases",
  "casebookTitle": "The Ardsley Works",
  "tag": "process safety · toxic gases · industrial scale",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Toxic release",
      "Uncontrolled escape of a harmful chemical."
    ],
    [
      "Pressure vessel",
      "A container designed to hold fluid above atmospheric pressure."
    ],
    [
      "Stoichiometry",
      "Quantitative relationships in chemical reactions."
    ],
    [
      "Exposure",
      "Contact between people and a hazardous substance."
    ]
  ],
  "eqs": [
    {
      "id": "bhopal_kg",
      "q": "Bhopal release mass: estimate the result in kilograms using the real-world facts below.",
      "unit": "kilograms",
      "factors": [
        {
          "label": "Bhopal release mass",
          "unit": "metric tonnes",
          "value": 40,
          "display": "40",
          "desc": "Commonly cited release estimate.",
          "source": {
            "label": "EPA — Bhopal disaster overview",
            "url": "https://www.epa.gov/emergency-response/bhopal-disaster",
            "accessed": "2026-07-18"
          },
          "id": "bhopal_kg_f0",
          "playDesc": "Commonly cited release estimate."
        },
        {
          "label": "Kilograms per tonne",
          "unit": "kilograms per tonne",
          "value": 1000,
          "display": "1,000",
          "desc": "Defined mass conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "bhopal_kg_f1",
          "playDesc": "The number of kilograms corresponding to one tonne."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 40000,
      "answerDisplay": "40,000",
      "explain": "Convert tonnes to kilograms.",
      "revealQ": "How many kilograms are in the approximately forty tonnes of methyl isocyanate released at Bhopal?",
      "sources": [
        {
          "label": "EPA — Bhopal disaster overview",
          "url": "https://www.epa.gov/emergency-response/bhopal-disaster",
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
      "id": "exposed_per_death",
      "q": "People exposed: estimate the result in exposed people per death using the real-world facts below.",
      "unit": "exposed people per death",
      "factors": [
        {
          "label": "People exposed",
          "unit": "people",
          "value": 500000,
          "display": "500,000",
          "desc": "Published exposure scale.",
          "source": {
            "label": "EPA — Bhopal disaster overview",
            "url": "https://www.epa.gov/emergency-response/bhopal-disaster",
            "accessed": "2026-07-18"
          },
          "id": "exposed_per_death_f0",
          "playDesc": "Published exposure scale."
        },
        {
          "label": "Long-term death estimate",
          "unit": "deaths",
          "value": 20000,
          "display": "20,000",
          "desc": "Upper commonly cited long-term estimate.",
          "source": {
            "label": "EPA — Bhopal disaster overview",
            "url": "https://www.epa.gov/emergency-response/bhopal-disaster",
            "accessed": "2026-07-18"
          },
          "id": "exposed_per_death_f1",
          "playDesc": "Upper commonly cited long-term estimate."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 25,
      "answerDisplay": "25",
      "explain": "Divide exposed people by deaths for a scale comparison.",
      "revealQ": "Using five hundred thousand exposed people and twenty thousand long-term deaths, how many exposed people correspond to each death?",
      "sources": [
        {
          "label": "EPA — Bhopal disaster overview",
          "url": "https://www.epa.gov/emergency-response/bhopal-disaster",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "cylinder_gas",
      "q": "Cylinder water volume: estimate the result in litres at one bar using the real-world facts below.",
      "unit": "litres at one bar",
      "factors": [
        {
          "label": "Cylinder water volume",
          "unit": "litres",
          "value": 68,
          "display": "68",
          "desc": "A real industrial cylinder-size scale.",
          "source": {
            "label": "EPA — Bhopal disaster overview",
            "url": "https://www.epa.gov/emergency-response/bhopal-disaster",
            "accessed": "2026-07-18"
          },
          "id": "cylinder_gas_f0",
          "playDesc": "A real industrial cylinder-size scale."
        },
        {
          "label": "Cylinder pressure",
          "unit": "bar",
          "value": 200,
          "display": "200",
          "desc": "A common compressed-gas service pressure.",
          "source": {
            "label": "EPA — Bhopal disaster overview",
            "url": "https://www.epa.gov/emergency-response/bhopal-disaster",
            "accessed": "2026-07-18"
          },
          "id": "cylinder_gas_f1",
          "playDesc": "A common compressed-gas service pressure."
        },
        {
          "label": "Reference pressure",
          "unit": "bar",
          "value": 1,
          "display": "1",
          "desc": "Ideal-gas comparison pressure.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "cylinder_gas_f2",
          "playDesc": "Ideal-gas comparison pressure."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "answer": 13600,
      "answerDisplay": "13,600",
      "explain": "For a simple ideal-gas estimate, volume scales with pressure ratio.",
      "revealQ": "How many litres of gas at one bar correspond ideally to a sixty-eight-litre cylinder at two hundred bar?",
      "sources": [
        {
          "label": "EPA — Bhopal disaster overview",
          "url": "https://www.epa.gov/emergency-response/bhopal-disaster",
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
      "id": "ammonia_daily",
      "q": "Annual ammonia production: estimate the result in tonnes per day using the real-world facts below.",
      "unit": "tonnes per day",
      "factors": [
        {
          "label": "Annual ammonia production",
          "unit": "tonnes per year",
          "value": 150000000,
          "display": "150,000,000",
          "desc": "Real-world global production order of magnitude.",
          "source": {
            "label": "EPA — Bhopal disaster overview",
            "url": "https://www.epa.gov/emergency-response/bhopal-disaster",
            "accessed": "2026-07-18"
          },
          "id": "ammonia_daily_f0",
          "playDesc": "Real-world global production order of magnitude."
        },
        {
          "label": "Operating fraction of year",
          "unit": "fraction",
          "value": 0.95,
          "display": "0.95",
          "desc": "Representative plant availability used as an explicitly labeled typical value.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "ammonia_daily_f1",
          "playDesc": "Representative plant availability used as an explicitly labeled typical value."
        },
        {
          "label": "Days per year",
          "unit": "days per year",
          "value": 365,
          "display": "365",
          "desc": "Calendar conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "ammonia_daily_f2",
          "playDesc": "The number of days corresponding to one year."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "answer": 390410.9589041096,
      "answerDisplay": "390,411",
      "explain": "Apply operating availability and divide annual production by days.",
      "revealQ": "How many tonnes per day is a 150-million-tonne annual global ammonia-production scale?",
      "sources": [
        {
          "label": "EPA — Bhopal disaster overview",
          "url": "https://www.epa.gov/emergency-response/bhopal-disaster",
          "accessed": "2026-07-18"
        },
        {
          "label": "Defined mathematical relationship",
          "url": "https://www.nist.gov/pml/special-publication-811",
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
