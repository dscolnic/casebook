module.exports = { PACK: {
  "id": "bp_w_anes",
  "title": "Anesthesia: Drugs, Oxygen, and Monitoring",
  "casebookTitle": "The Silent Theatre",
  "tag": "anesthesia · physiology · monitoring",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Induction",
      "Beginning of general anesthesia."
    ],
    [
      "Fresh-gas flow",
      "Gas delivered from an anesthesia machine per unit time."
    ],
    [
      "Dose per kilogram",
      "Drug amount scaled to patient body mass."
    ],
    [
      "Physiologic parameter",
      "A measured signal such as oxygen saturation or blood pressure."
    ]
  ],
  "eqs": [
    {
      "id": "propofol_dose",
      "q": "Propofol induction dose: estimate the result in milligrams using the real-world facts below.",
      "unit": "milligrams",
      "factors": [
        {
          "label": "Propofol induction dose",
          "unit": "milligrams per kilogram",
          "value": 2,
          "display": "2",
          "desc": "Common adult induction-dose scale.",
          "source": {
            "label": "NIH/NCBI — anesthesia pharmacology",
            "url": "https://www.ncbi.nlm.nih.gov/books/NBK430884/",
            "accessed": "2026-07-18"
          },
          "id": "propofol_dose_f0",
          "playDesc": "Common adult induction-dose scale."
        },
        {
          "label": "Patient mass",
          "unit": "kilograms",
          "value": 70,
          "display": "70",
          "desc": "Representative adult mass.",
          "source": {
            "label": "NIH/NCBI — anesthesia pharmacology",
            "url": "https://www.ncbi.nlm.nih.gov/books/NBK430884/",
            "accessed": "2026-07-18"
          },
          "id": "propofol_dose_f1",
          "playDesc": "Representative adult mass."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 140,
      "answerDisplay": "140",
      "explain": "Dose per kilogram times body mass gives total dose.",
      "revealQ": "What propofol dose corresponds to two milligrams per kilogram for a seventy-kilogram adult?",
      "sources": [
        {
          "label": "NIH/NCBI — anesthesia pharmacology",
          "url": "https://www.ncbi.nlm.nih.gov/books/NBK430884/",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "oxygen_hour",
      "q": "Resting oxygen consumption: estimate the result in litres using the real-world facts below.",
      "unit": "litres",
      "factors": [
        {
          "label": "Resting oxygen consumption",
          "unit": "millilitres per minute",
          "value": 250,
          "display": "250",
          "desc": "Typical adult resting oxygen-use scale.",
          "source": {
            "label": "NIH/NCBI — anesthesia pharmacology",
            "url": "https://www.ncbi.nlm.nih.gov/books/NBK430884/",
            "accessed": "2026-07-18"
          },
          "id": "oxygen_hour_f0",
          "playDesc": "Typical adult resting oxygen-use scale."
        },
        {
          "label": "Minutes per litre-hour conversion",
          "unit": "litre-minutes per millilitre-hour",
          "value": 0.06,
          "display": "0.06",
          "desc": "Sixty minutes divided by one thousand millilitres.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "oxygen_hour_f1",
          "playDesc": "Sixty minutes divided by one thousand millilitres."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 15,
      "answerDisplay": "15",
      "explain": "Convert the per-minute millilitre rate to litres per hour.",
      "revealQ": "How many litres of oxygen does a resting adult consume in one hour at 250 millilitres per minute?",
      "sources": [
        {
          "label": "NIH/NCBI — anesthesia pharmacology",
          "url": "https://www.ncbi.nlm.nih.gov/books/NBK430884/",
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
      "id": "fresh_gas",
      "q": "Fresh-gas flow: estimate the result in cubic metres using the real-world facts below.",
      "unit": "cubic metres",
      "factors": [
        {
          "label": "Fresh-gas flow",
          "unit": "litres per minute",
          "value": 2.1,
          "display": "2.1",
          "desc": "Representative low-flow anesthesia setting.",
          "source": {
            "label": "NIH/NCBI — anesthesia pharmacology",
            "url": "https://www.ncbi.nlm.nih.gov/books/NBK430884/",
            "accessed": "2026-07-18"
          },
          "id": "fresh_gas_f0",
          "playDesc": "Representative low-flow anesthesia setting."
        },
        {
          "label": "Case duration",
          "unit": "minutes",
          "value": 120,
          "display": "120",
          "desc": "Two-hour procedure expressed in minutes.",
          "source": {
            "label": "NIH/NCBI — anesthesia pharmacology",
            "url": "https://www.ncbi.nlm.nih.gov/books/NBK430884/",
            "accessed": "2026-07-18"
          },
          "id": "fresh_gas_f1",
          "playDesc": "Two-hour procedure expressed in minutes."
        },
        {
          "label": "Litres per cubic metre",
          "unit": "litres per cubic metre",
          "value": 1000,
          "display": "1,000",
          "desc": "Defined volume conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "fresh_gas_f2",
          "playDesc": "The number of litres corresponding to one cubic metre."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "answer": 0.252,
      "answerDisplay": "0.252",
      "explain": "Flow times duration gives litres; convert to cubic metres.",
      "revealQ": "How many cubic metres of fresh gas flow during a two-hour case at two litres per minute?",
      "sources": [
        {
          "label": "NIH/NCBI — anesthesia pharmacology",
          "url": "https://www.ncbi.nlm.nih.gov/books/NBK430884/",
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
      "id": "monitor_readings",
      "q": "Monitored parameters: estimate the result in readings using the real-world facts below.",
      "unit": "readings",
      "factors": [
        {
          "label": "Monitored parameters",
          "unit": "parameters",
          "value": 8,
          "display": "8",
          "desc": "Representative set of core monitored signals.",
          "source": {
            "label": "NIH/NCBI — anesthesia pharmacology",
            "url": "https://www.ncbi.nlm.nih.gov/books/NBK430884/",
            "accessed": "2026-07-18"
          },
          "id": "monitor_readings_f0",
          "playDesc": "Representative set of core monitored signals."
        },
        {
          "label": "Readings per parameter-minute",
          "unit": "readings per minute",
          "value": 1,
          "display": "1",
          "desc": "One stored summary per minute.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "monitor_readings_f1",
          "playDesc": "One stored summary per minute."
        },
        {
          "label": "Monitoring duration",
          "unit": "minutes",
          "value": 90,
          "display": "90",
          "desc": "Procedure duration.",
          "source": {
            "label": "NIH/NCBI — anesthesia pharmacology",
            "url": "https://www.ncbi.nlm.nih.gov/books/NBK430884/",
            "accessed": "2026-07-18"
          },
          "id": "monitor_readings_f2",
          "playDesc": "Procedure duration."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "answer": 720,
      "answerDisplay": "720",
      "explain": "Multiply parameters by readings per minute and duration.",
      "revealQ": "How many readings result from eight parameters sampled once per minute during a ninety-minute case?",
      "sources": [
        {
          "label": "NIH/NCBI — anesthesia pharmacology",
          "url": "https://www.ncbi.nlm.nih.gov/books/NBK430884/",
          "accessed": "2026-07-18"
        },
        {
          "label": "Defined mathematical relationship",
          "url": "https://www.nist.gov/pml/special-publication-811",
          "accessed": "2026-07-18"
        }
      ]
    }
  ],
  "sourceSummary": "Every playable value is linked to an official, institutional, scholarly, or defined-conversion source in the reveal."
} };
