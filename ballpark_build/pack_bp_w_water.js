module.exports = { PACK: {
  "id": "bp_w_water",
  "title": "Drinking Water: Supply and Lead",
  "casebookTitle": "The Tap",
  "tag": "water systems · treatment · public health",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Action level",
      "Regulatory concentration that triggers required action."
    ],
    [
      "Parts per billion",
      "Approximately micrograms per litre in water."
    ],
    [
      "Per-capita use",
      "Water delivered per person."
    ],
    [
      "Corrosion control",
      "Treatment reducing metals released from pipes."
    ]
  ],
  "eqs": [
    {
      "id": "nyc_per_capita",
      "q": "NYC daily water delivery: estimate the result in gallons per person-day using the real-world facts below.",
      "unit": "gallons per person-day",
      "factors": [
        {
          "label": "NYC daily water delivery",
          "unit": "gallons per day",
          "value": 1000000000,
          "display": "1,000,000,000",
          "desc": "NYC DEP typical daily supply scale.",
          "source": {
            "label": "NYC DEP — water supply facts",
            "url": "https://www.nyc.gov/site/dep/water/water-supply.page",
            "accessed": "2026-07-18"
          },
          "id": "nyc_per_capita_f0",
          "playDesc": "NYC DEP typical daily supply scale."
        },
        {
          "label": "NYC population scale",
          "unit": "people",
          "value": 8300000,
          "display": "8,300,000",
          "desc": "Rounded population served.",
          "source": {
            "label": "NYC DEP — water supply facts",
            "url": "https://www.nyc.gov/site/dep/water/water-supply.page",
            "accessed": "2026-07-18"
          },
          "id": "nyc_per_capita_f1",
          "playDesc": "Rounded population served."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 120.48192771084338,
      "answerDisplay": "120.48",
      "explain": "Divide delivered water by population.",
      "revealQ": "How many gallons per person per day is one billion gallons divided among 8.3 million people?",
      "sources": [
        {
          "label": "NYC DEP — water supply facts",
          "url": "https://www.nyc.gov/site/dep/water/water-supply.page",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "lead_intake",
      "q": "Lead action level: estimate the result in micrograms using the real-world facts below.",
      "unit": "micrograms",
      "factors": [
        {
          "label": "Lead action level",
          "unit": "micrograms per litre",
          "value": 15,
          "display": "15",
          "desc": "EPA lead action level.",
          "source": {
            "label": "EPA — lead and copper rule",
            "url": "https://www.epa.gov/ground-water-and-drinking-water/basic-information-about-lead-drinking-water",
            "accessed": "2026-07-18"
          },
          "id": "lead_intake_f0",
          "playDesc": "EPA lead action level."
        },
        {
          "label": "Daily water consumed",
          "unit": "litres",
          "value": 2,
          "display": "2",
          "desc": "Common adult drinking-water comparison.",
          "source": {
            "label": "EPA — lead and copper rule",
            "url": "https://www.epa.gov/ground-water-and-drinking-water/basic-information-about-lead-drinking-water",
            "accessed": "2026-07-18"
          },
          "id": "lead_intake_f1",
          "playDesc": "Common adult drinking-water comparison."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 30,
      "answerDisplay": "30",
      "explain": "Concentration times volume gives mass.",
      "revealQ": "How many micrograms of lead are present in two litres at the EPA action level?",
      "sources": [
        {
          "label": "EPA — lead and copper rule",
          "url": "https://www.epa.gov/ground-water-and-drinking-water/basic-information-about-lead-drinking-water",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "nyc_billion_litres",
      "q": "Water volume: estimate the result in billion litres using the real-world facts below.",
      "unit": "billion litres",
      "factors": [
        {
          "label": "Water volume",
          "unit": "billion gallons",
          "value": 1.1,
          "display": "1.1",
          "desc": "High-demand NYC daily scale.",
          "source": {
            "label": "NYC DEP — water supply facts",
            "url": "https://www.nyc.gov/site/dep/water/water-supply.page",
            "accessed": "2026-07-18"
          },
          "id": "nyc_billion_litres_f0",
          "playDesc": "High-demand NYC daily scale."
        },
        {
          "label": "Litres per gallon",
          "unit": "litres per gallon",
          "value": 3.78541,
          "display": "3.78541",
          "desc": "Defined volume conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "nyc_billion_litres_f1",
          "playDesc": "The number of litres corresponding to one gallon."
        },
        {
          "label": "Billion-unit scaling",
          "unit": "billion litres per billion litres",
          "value": 1,
          "display": "1",
          "desc": "Preserves the billion prefix.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "nyc_billion_litres_f2",
          "playDesc": "Preserves the billion prefix."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "answer": 4.163951000000001,
      "answerDisplay": "4.164",
      "explain": "Convert gallons to litres while retaining billion units.",
      "revealQ": "How many billion litres are in 1.1 billion U.S. gallons?",
      "sources": [
        {
          "label": "NYC DEP — water supply facts",
          "url": "https://www.nyc.gov/site/dep/water/water-supply.page",
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
      "id": "chemical_tonnes",
      "q": "Daily treated water: estimate the result in tonnes per day using the real-world facts below.",
      "unit": "tonnes per day",
      "factors": [
        {
          "label": "Daily treated water",
          "unit": "cubic metres",
          "value": 3800000,
          "display": "3,800,000",
          "desc": "Large-city daily treatment volume.",
          "source": {
            "label": "NYC DEP — water supply facts",
            "url": "https://www.nyc.gov/site/dep/water/water-supply.page",
            "accessed": "2026-07-18"
          },
          "id": "chemical_tonnes_f0",
          "playDesc": "Large-city daily treatment volume."
        },
        {
          "label": "Treatment dose",
          "unit": "kilograms per cubic metre",
          "value": 0.001,
          "display": "0.001",
          "desc": "One gram per cubic metre expressed in kilograms.",
          "source": {
            "label": "EPA — lead and copper rule",
            "url": "https://www.epa.gov/ground-water-and-drinking-water/basic-information-about-lead-drinking-water",
            "accessed": "2026-07-18"
          },
          "id": "chemical_tonnes_f1",
          "playDesc": "One gram per cubic metre expressed in kilograms."
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
          "id": "chemical_tonnes_f2",
          "playDesc": "The number of kilograms corresponding to one tonne."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "answer": 3.8,
      "answerDisplay": "3.8",
      "explain": "Volume times dose gives kilograms; convert to tonnes.",
      "revealQ": "How many tonnes per day is a one-gram-per-cubic-metre treatment dose applied to 3.8 million cubic metres?",
      "sources": [
        {
          "label": "NYC DEP — water supply facts",
          "url": "https://www.nyc.gov/site/dep/water/water-supply.page",
          "accessed": "2026-07-18"
        },
        {
          "label": "EPA — lead and copper rule",
          "url": "https://www.epa.gov/ground-water-and-drinking-water/basic-information-about-lead-drinking-water",
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
