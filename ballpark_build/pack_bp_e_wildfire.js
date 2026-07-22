module.exports = { PACK: {
  "id": "bp_e_wildfire",
  "title": "Wildfire Scale and Firefighting",
  "casebookTitle": "The Pinehaven Fire",
  "tag": "wildfire · fuel energy · aviation",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Acre",
      "A land-area unit commonly used in U.S. wildfire reports."
    ],
    [
      "Airtanker",
      "An aircraft that drops water or retardant."
    ],
    [
      "Fuel energy",
      "Chemical energy released when vegetation burns."
    ],
    [
      "Fire season",
      "A period when wildland fires are most active."
    ]
  ],
  "eqs": [
    {
      "id": "canada_hectares",
      "q": "Area burned in Canada in 2023: estimate the result in hectares using the real-world facts below.",
      "unit": "hectares",
      "factors": [
        {
          "label": "Area burned in Canada in 2023",
          "unit": "acres",
          "value": 45000000,
          "display": "45,000,000",
          "desc": "NIFC’s reported burned-area scale.",
          "source": {
            "label": "NIFC — 2023 Canadian wildfire season",
            "url": "https://www.nifc.gov/fire-information/international-support",
            "accessed": "2026-07-18"
          },
          "id": "canada_hectares_f0",
          "playDesc": "NIFC’s reported burned-area scale."
        },
        {
          "label": "Hectares per acre",
          "unit": "hectares per acre",
          "value": 0.404686,
          "display": "0.404686",
          "desc": "Defined area conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "canada_hectares_f1",
          "playDesc": "The number of hectares corresponding to one acre."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 18210870,
      "answerDisplay": "18,210,870",
      "explain": "Convert the reported acres to hectares.",
      "revealQ": "About how many hectares burned in Canada’s 2023 wildfire season?",
      "sources": [
        {
          "label": "NIFC — 2023 Canadian wildfire season",
          "url": "https://www.nifc.gov/fire-information/international-support",
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
      "id": "maffs_litres",
      "q": "MAFFS retardant load: estimate the result in litres using the real-world facts below.",
      "unit": "litres",
      "factors": [
        {
          "label": "MAFFS retardant load",
          "unit": "U.S. gallons",
          "value": 3000,
          "display": "3,000",
          "desc": "NIFC’s cited MAFFS load.",
          "source": {
            "label": "NIFC — firefighting aircraft",
            "url": "https://www.nifc.gov/resources/aircraft",
            "accessed": "2026-07-18"
          },
          "id": "maffs_litres_f0",
          "playDesc": "NIFC’s cited MAFFS load."
        },
        {
          "label": "Litres per U.S. gallon",
          "unit": "litres per gallon",
          "value": 3.78541,
          "display": "3.78541",
          "desc": "Defined volume conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "maffs_litres_f1",
          "playDesc": "The number of litres corresponding to one u.s. gallon."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 11356.230000000001,
      "answerDisplay": "11,356.2",
      "explain": "Convert the aircraft load from gallons to litres.",
      "revealQ": "How many litres can a 3,000-gallon MAFFS airtanker drop?",
      "sources": [
        {
          "label": "NIFC — firefighting aircraft",
          "url": "https://www.nifc.gov/resources/aircraft",
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
      "id": "scooper_hour",
      "q": "Seconds per hour: estimate the result in gallons using the real-world facts below.",
      "unit": "gallons",
      "factors": [
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
          "id": "scooper_hour_f0",
          "playDesc": "The number of seconds corresponding to one hour."
        },
        {
          "label": "Seconds per refill",
          "unit": "seconds per refill",
          "value": 12,
          "display": "12",
          "desc": "NIFC’s fastest cited refill time.",
          "source": {
            "label": "NIFC — firefighting aircraft",
            "url": "https://www.nifc.gov/resources/aircraft",
            "accessed": "2026-07-18"
          },
          "id": "scooper_hour_f1",
          "playDesc": "NIFC’s fastest cited refill time."
        },
        {
          "label": "Water per refill",
          "unit": "gallons per refill",
          "value": 800,
          "display": "800",
          "desc": "NIFC’s cited single-engine airtanker scale.",
          "source": {
            "label": "NIFC — firefighting aircraft",
            "url": "https://www.nifc.gov/resources/aircraft",
            "accessed": "2026-07-18"
          },
          "id": "scooper_hour_f2",
          "playDesc": "NIFC’s cited single-engine airtanker scale."
        }
      ],
      "ops": [
        "÷",
        "×"
      ],
      "answer": 240000,
      "answerDisplay": "240,000",
      "explain": "Divide the hour by refill time, then multiply by water per load.",
      "revealQ": "At the cited twelve-second refill time, how many gallons could an 800-gallon water scooper load in one hour if refilling continuously?",
      "sources": [
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIFC — firefighting aircraft",
          "url": "https://www.nifc.gov/resources/aircraft",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "wood_energy",
      "q": "Typical dry-wood heating value: estimate the result in joules using the real-world facts below.",
      "unit": "joules",
      "factors": [
        {
          "label": "Typical dry-wood heating value",
          "unit": "megajoules per kilogram",
          "value": 18,
          "display": "18",
          "desc": "A representative biomass-energy scale used for estimation.",
          "source": {
            "label": "NIFC — 2023 Canadian wildfire season",
            "url": "https://www.nifc.gov/fire-information/international-support",
            "accessed": "2026-07-18"
          },
          "id": "wood_energy_f0",
          "playDesc": "A representative biomass-energy scale used for estimation."
        },
        {
          "label": "Kilograms per metric tonne",
          "unit": "kilograms per tonne",
          "value": 1000,
          "display": "1,000",
          "desc": "Defined mass conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "wood_energy_f1",
          "playDesc": "The number of kilograms corresponding to one metric tonne."
        },
        {
          "label": "Joules per megajoule",
          "unit": "joules per megajoule",
          "value": 1000000,
          "display": "1,000,000",
          "desc": "Defined energy conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "wood_energy_f2",
          "playDesc": "The number of joules corresponding to one megajoule."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "answer": 18000000000,
      "answerDisplay": "18,000,000,000",
      "explain": "Specific energy times mass gives megajoules; convert to joules.",
      "revealQ": "About how many joules of chemical energy are in one metric tonne of dry wood at a typical eighteen-megajoule-per-kilogram heating value?",
      "sources": [
        {
          "label": "NIFC — 2023 Canadian wildfire season",
          "url": "https://www.nifc.gov/fire-information/international-support",
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
