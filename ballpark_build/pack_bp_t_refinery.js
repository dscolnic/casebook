module.exports = { PACK: {
  "id": "bp_t_refinery",
  "title": "Oil Refineries and Daily Throughput",
  "casebookTitle": "The Halden Refinery Fire",
  "tag": "refining · fuels · process scale",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Refinery capacity",
      "Maximum crude-oil processing rate."
    ],
    [
      "Petroleum barrel",
      "Forty-two U.S. gallons, about 159 litres."
    ],
    [
      "Utilization",
      "Fraction of nameplate capacity actually used."
    ],
    [
      "Tanker truck",
      "Road vehicle carrying liquid fuel."
    ]
  ],
  "eqs": [
    {
      "id": "daily_litres",
      "q": "Refinery capacity: estimate the result in litres per day using the real-world facts below.",
      "unit": "litres per day",
      "factors": [
        {
          "label": "Refinery capacity",
          "unit": "barrels per day",
          "value": 640000,
          "display": "640,000",
          "desc": "Large U.S. refinery capacity scale.",
          "source": {
            "label": "U.S. EIA — refinery capacity",
            "url": "https://www.eia.gov/dnav/pet/pet_pnp_cap1_dcu_nus_a.htm",
            "accessed": "2026-07-18"
          },
          "id": "daily_litres_f0",
          "playDesc": "Large U.S. refinery capacity scale."
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
          "id": "daily_litres_f1",
          "playDesc": "The number of litres corresponding to one barrel."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 101760000,
      "answerDisplay": "101,760,000",
      "explain": "Convert barrels to litres.",
      "revealQ": "How many litres per day is a 640,000-barrel-per-day refinery?",
      "sources": [
        {
          "label": "U.S. EIA — refinery capacity",
          "url": "https://www.eia.gov/dnav/pet/pet_pnp_cap1_dcu_nus_a.htm",
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
      "id": "gasoline_per_barrel",
      "q": "Gallons per barrel: estimate the result in gallons using the real-world facts below.",
      "unit": "gallons",
      "factors": [
        {
          "label": "Gallons per barrel",
          "unit": "gallons per barrel",
          "value": 42,
          "display": "42",
          "desc": "Defined petroleum-barrel conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "gasoline_per_barrel_f0",
          "playDesc": "The number of gallons corresponding to one barrel."
        },
        {
          "label": "Gasoline yield fraction",
          "unit": "fraction",
          "value": 0.45,
          "display": "0.45",
          "desc": "Representative U.S. refinery yield share.",
          "source": {
            "label": "U.S. EIA — refinery capacity",
            "url": "https://www.eia.gov/dnav/pet/pet_pnp_cap1_dcu_nus_a.htm",
            "accessed": "2026-07-18"
          },
          "id": "gasoline_per_barrel_f1",
          "playDesc": "Representative U.S. refinery yield share."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 18.900000000000002,
      "answerDisplay": "18.9",
      "explain": "Multiply barrel volume by gasoline yield.",
      "revealQ": "If forty-five percent of a barrel becomes gasoline, how many gallons of gasoline is that?",
      "sources": [
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        },
        {
          "label": "U.S. EIA — refinery capacity",
          "url": "https://www.eia.gov/dnav/pet/pet_pnp_cap1_dcu_nus_a.htm",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "truckloads",
      "q": "Crude throughput: estimate the result in tanker loads using the real-world facts below.",
      "unit": "tanker loads",
      "factors": [
        {
          "label": "Crude throughput",
          "unit": "barrels",
          "value": 620000,
          "display": "620,000",
          "desc": "Large refinery daily crude-input scale.",
          "source": {
            "label": "U.S. EIA — refinery capacity",
            "url": "https://www.eia.gov/dnav/pet/pet_pnp_cap1_dcu_nus_a.htm",
            "accessed": "2026-07-18"
          },
          "id": "truckloads_f0",
          "playDesc": "Large refinery daily crude-input scale."
        },
        {
          "label": "Litres per petroleum barrel",
          "unit": "litres per barrel",
          "value": 158.987,
          "display": "158.987",
          "desc": "Precise barrel conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "truckloads_f1",
          "playDesc": "The number of litres corresponding to one petroleum barrel."
        },
        {
          "label": "Tanker capacity",
          "unit": "litres per truck",
          "value": 36000,
          "display": "36,000",
          "desc": "Representative road-tanker capacity.",
          "source": {
            "label": "U.S. EIA — refinery capacity",
            "url": "https://www.eia.gov/dnav/pet/pet_pnp_cap1_dcu_nus_a.htm",
            "accessed": "2026-07-18"
          },
          "id": "truckloads_f2",
          "playDesc": "Representative road-tanker capacity."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "answer": 2738.1094444444443,
      "answerDisplay": "2,738.1",
      "explain": "Convert barrels to litres and divide by truck capacity.",
      "revealQ": "How many 36,000-litre tanker loads equal 620,000 barrels of crude?",
      "sources": [
        {
          "label": "U.S. EIA — refinery capacity",
          "url": "https://www.eia.gov/dnav/pet/pet_pnp_cap1_dcu_nus_a.htm",
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
      "id": "annual_crude",
      "q": "U.S. refining capacity: estimate the result in barrels per year using the real-world facts below.",
      "unit": "barrels per year",
      "factors": [
        {
          "label": "U.S. refining capacity",
          "unit": "barrels per day",
          "value": 18400000,
          "display": "18,400,000",
          "desc": "National atmospheric crude-distillation capacity scale.",
          "source": {
            "label": "U.S. EIA — refinery capacity",
            "url": "https://www.eia.gov/dnav/pet/pet_pnp_cap1_dcu_nus_a.htm",
            "accessed": "2026-07-18"
          },
          "id": "annual_crude_f0",
          "playDesc": "National atmospheric crude-distillation capacity scale."
        },
        {
          "label": "Utilization fraction",
          "unit": "fraction",
          "value": 0.9,
          "display": "0.9",
          "desc": "Representative operating utilization.",
          "source": {
            "label": "U.S. EIA — refinery capacity",
            "url": "https://www.eia.gov/dnav/pet/pet_pnp_cap1_dcu_nus_a.htm",
            "accessed": "2026-07-18"
          },
          "id": "annual_crude_f1",
          "playDesc": "Representative operating utilization."
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
          "id": "annual_crude_f2",
          "playDesc": "The number of days corresponding to one year."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "answer": 6044400000,
      "answerDisplay": "6,044,400,000",
      "explain": "Capacity times utilization and days gives annual crude input.",
      "revealQ": "How many barrels per year does an 18.4-million-barrel-per-day national system process at ninety percent utilization?",
      "sources": [
        {
          "label": "U.S. EIA — refinery capacity",
          "url": "https://www.eia.gov/dnav/pet/pet_pnp_cap1_dcu_nus_a.htm",
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
