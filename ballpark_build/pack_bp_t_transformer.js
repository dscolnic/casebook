module.exports = { PACK: {
  "id": "bp_t_transformer",
  "title": "Large Power Transformers",
  "casebookTitle": "The Aldergate Substation Fire",
  "tag": "transformers · voltage · efficiency",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Apparent power",
      "Electrical capacity measured in volt-amperes."
    ],
    [
      "Turns ratio",
      "Ratio setting a transformer’s voltage change."
    ],
    [
      "Power factor",
      "Ratio of real power to apparent power."
    ],
    [
      "Copper and core losses",
      "Energy converted to heat inside a transformer."
    ]
  ],
  "eqs": [
    {
      "id": "voltage_ratio",
      "q": "High-side voltage: estimate the result in ratio using the real-world facts below.",
      "unit": "ratio",
      "factors": [
        {
          "label": "High-side voltage",
          "unit": "kilovolts",
          "value": 765,
          "display": "765",
          "desc": "A standard U.S. extra-high-voltage level.",
          "source": {
            "label": "U.S. DOE — large power transformers",
            "url": "https://www.energy.gov/oe/articles/large-power-transformers-and-us-electric-grid",
            "accessed": "2026-07-18"
          },
          "id": "voltage_ratio_f0",
          "playDesc": "A standard U.S. extra-high-voltage level."
        },
        {
          "label": "Low-side voltage",
          "unit": "kilovolts",
          "value": 345,
          "display": "345",
          "desc": "A standard transmission voltage level.",
          "source": {
            "label": "U.S. DOE — large power transformers",
            "url": "https://www.energy.gov/oe/articles/large-power-transformers-and-us-electric-grid",
            "accessed": "2026-07-18"
          },
          "id": "voltage_ratio_f1",
          "playDesc": "A standard transmission voltage level."
        }
      ],
      "ops": [
        "÷"
      ],
      "explain": "Divide high-side voltage by low-side voltage.",
      "answer": 2.217391304347826,
      "answerDisplay": "≈ 2.22",
      "sources": [
        {
          "label": "U.S. DOE — large power transformers",
          "url": "https://www.energy.gov/oe/articles/large-power-transformers-and-us-electric-grid",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "What is the voltage ratio of a 765-kilovolt to 345-kilovolt transformer?"
    },
    {
      "id": "delivered_power",
      "q": "Input power: estimate the result in megawatts using the real-world facts below.",
      "unit": "megawatts",
      "factors": [
        {
          "label": "Input power",
          "unit": "megawatts",
          "value": 1000,
          "display": "1,000",
          "desc": "Round large-transformer power scale.",
          "source": {
            "label": "U.S. DOE — large power transformers",
            "url": "https://www.energy.gov/oe/articles/large-power-transformers-and-us-electric-grid",
            "accessed": "2026-07-18"
          },
          "id": "delivered_power_f0",
          "playDesc": "Round large-transformer power scale."
        },
        {
          "label": "Efficiency",
          "unit": "fraction",
          "value": 0.995,
          "display": "0.995",
          "desc": "Representative high transformer efficiency.",
          "source": {
            "label": "U.S. DOE — large power transformers",
            "url": "https://www.energy.gov/oe/articles/large-power-transformers-and-us-electric-grid",
            "accessed": "2026-07-18"
          },
          "id": "delivered_power_f1",
          "playDesc": "Representative high transformer efficiency."
        }
      ],
      "ops": [
        "×"
      ],
      "explain": "Multiply input power by efficiency.",
      "answer": 995,
      "answerDisplay": "≈ 995",
      "sources": [
        {
          "label": "U.S. DOE — large power transformers",
          "url": "https://www.energy.gov/oe/articles/large-power-transformers-and-us-electric-grid",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many megawatts does a one-thousand-megawatt transformer deliver at 99.5 percent efficiency?"
    },
    {
      "id": "line_current",
      "q": "Power: estimate the result in amperes using the real-world facts below.",
      "unit": "amperes",
      "factors": [
        {
          "label": "Power",
          "unit": "megawatts",
          "value": 500,
          "display": "500",
          "desc": "Large power-transfer scale.",
          "source": {
            "label": "U.S. DOE — large power transformers",
            "url": "https://www.energy.gov/oe/articles/large-power-transformers-and-us-electric-grid",
            "accessed": "2026-07-18"
          },
          "id": "line_current_f0",
          "playDesc": "Large power-transfer scale."
        },
        {
          "label": "Watts per megawatt",
          "unit": "watts per megawatt",
          "value": 1000000,
          "display": "1,000,000",
          "desc": "Defined power conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "line_current_f1",
          "playDesc": "The number of watts corresponding to one megawatt."
        },
        {
          "label": "Voltage",
          "unit": "volts",
          "value": 663000,
          "display": "663,000",
          "desc": "A high-voltage transmission scale.",
          "source": {
            "label": "U.S. DOE — large power transformers",
            "url": "https://www.energy.gov/oe/articles/large-power-transformers-and-us-electric-grid",
            "accessed": "2026-07-18"
          },
          "id": "line_current_f2",
          "playDesc": "A high-voltage transmission scale."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "explain": "Convert power to watts and divide by voltage.",
      "answer": 754.1478129713424,
      "answerDisplay": "≈ 754.1",
      "sources": [
        {
          "label": "U.S. DOE — large power transformers",
          "url": "https://www.energy.gov/oe/articles/large-power-transformers-and-us-electric-grid",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "What current corresponds to five hundred megawatts at 663 kilovolts in a simplified direct-current comparison?"
    },
    {
      "id": "daily_loss",
      "q": "Transferred power: estimate the result in megawatt-hours using the real-world facts below.",
      "unit": "megawatt-hours",
      "factors": [
        {
          "label": "Transferred power",
          "unit": "megawatts",
          "value": 750,
          "display": "750",
          "desc": "Large-transformer loading scale.",
          "source": {
            "label": "U.S. DOE — large power transformers",
            "url": "https://www.energy.gov/oe/articles/large-power-transformers-and-us-electric-grid",
            "accessed": "2026-07-18"
          },
          "id": "daily_loss_f0",
          "playDesc": "Large-transformer loading scale."
        },
        {
          "label": "Loss fraction",
          "unit": "fraction",
          "value": 0.005,
          "display": "0.005",
          "desc": "Half-percent loss.",
          "source": {
            "label": "U.S. DOE — large power transformers",
            "url": "https://www.energy.gov/oe/articles/large-power-transformers-and-us-electric-grid",
            "accessed": "2026-07-18"
          },
          "id": "daily_loss_f1",
          "playDesc": "Half-percent loss."
        },
        {
          "label": "Hours per day",
          "unit": "hours",
          "value": 24,
          "display": "24",
          "desc": "Defined daily duration.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "daily_loss_f2",
          "playDesc": "The number of hours corresponding to one day."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "explain": "Apply the loss fraction and multiply by hours.",
      "answer": 90,
      "answerDisplay": "≈ 90",
      "sources": [
        {
          "label": "U.S. DOE — large power transformers",
          "url": "https://www.energy.gov/oe/articles/large-power-transformers-and-us-electric-grid",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many megawatt-hours are lost in a day if a 750-megawatt transformer loses half a percent?"
    }
  ],
  "sourceSummary": "Every playable value is linked to an official, institutional, scholarly, or defined-conversion source in the reveal."
} };
