module.exports = { PACK: {
  "id": "bp_j_capture",
  "title": "Regulated Electric Utilities",
  "casebookTitle": "The Halcyon Grid",
  "tag": "regulation · utility rates · public choice",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Rate base",
      "Utility assets on which regulators allow a return."
    ],
    [
      "Allowed return",
      "Regulated profit rate on the rate base."
    ],
    [
      "Investor-owned utility",
      "Privately owned company providing regulated service."
    ],
    [
      "Ratepayer",
      "Customer paying regulated utility charges."
    ]
  ],
  "eqs": [
    {
      "id": "monthly_bill",
      "q": "Annual household electricity bill: estimate the result in dollars per month using the real-world facts below.",
      "unit": "dollars per month",
      "factors": [
        {
          "label": "Annual household electricity bill",
          "unit": "dollars per year",
          "value": 1644,
          "display": "1,644",
          "desc": "A reported U.S. household annual-bill scale.",
          "source": {
            "label": "U.S. EIA — electric power annual",
            "url": "https://www.eia.gov/electricity/annual/",
            "accessed": "2026-07-18"
          },
          "id": "monthly_bill_f0",
          "playDesc": "A reported U.S. household annual-bill scale."
        },
        {
          "label": "Months per year",
          "unit": "months per year",
          "value": 12,
          "display": "12",
          "desc": "Defined calendar conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "monthly_bill_f1",
          "playDesc": "The number of months corresponding to one year."
        }
      ],
      "ops": [
        "÷"
      ],
      "explain": "Divide annual bill by months.",
      "answer": 137,
      "answerDisplay": "≈ 137",
      "sources": [
        {
          "label": "U.S. EIA — electric power annual",
          "url": "https://www.eia.gov/electricity/annual/",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "What monthly bill corresponds to an annual household electricity bill of 1,644 dollars?"
    },
    {
      "id": "customers_per_utility",
      "q": "U.S. electricity customer accounts: estimate the result in customers per utility using the real-world facts below.",
      "unit": "customers per utility",
      "factors": [
        {
          "label": "U.S. electricity customer accounts",
          "unit": "accounts",
          "value": 160000000,
          "display": "160,000,000",
          "desc": "National customer-account scale.",
          "source": {
            "label": "U.S. EIA — electric power annual",
            "url": "https://www.eia.gov/electricity/annual/",
            "accessed": "2026-07-18"
          },
          "id": "customers_per_utility_f0",
          "playDesc": "National customer-account scale."
        },
        {
          "label": "Electric utilities",
          "unit": "utilities",
          "value": 3000,
          "display": "3,000",
          "desc": "Order-of-magnitude count of U.S. utilities.",
          "source": {
            "label": "U.S. EIA — electric power annual",
            "url": "https://www.eia.gov/electricity/annual/",
            "accessed": "2026-07-18"
          },
          "id": "customers_per_utility_f1",
          "playDesc": "Order-of-magnitude count of U.S. utilities."
        }
      ],
      "ops": [
        "÷"
      ],
      "explain": "Divide customer accounts by utilities.",
      "answer": 53333.333333333336,
      "answerDisplay": "≈ 53,333.3",
      "sources": [
        {
          "label": "U.S. EIA — electric power annual",
          "url": "https://www.eia.gov/electricity/annual/",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many customer accounts correspond to each utility if 160 million accounts are divided among three thousand utilities?"
    },
    {
      "id": "allowed_profit",
      "q": "Utility rate base: estimate the result in millions of dollars using the real-world facts below.",
      "unit": "millions of dollars",
      "factors": [
        {
          "label": "Utility rate base",
          "unit": "billions of dollars",
          "value": 10.5,
          "display": "10.5",
          "desc": "Large regulated-utility rate-base scale.",
          "source": {
            "label": "U.S. EIA — electric power annual",
            "url": "https://www.eia.gov/electricity/annual/",
            "accessed": "2026-07-18"
          },
          "id": "allowed_profit_f0",
          "playDesc": "Large regulated-utility rate-base scale."
        },
        {
          "label": "Allowed return fraction",
          "unit": "fraction",
          "value": 0.095,
          "display": "0.095",
          "desc": "Representative authorized return on equity.",
          "source": {
            "label": "U.S. EIA — electric power annual",
            "url": "https://www.eia.gov/electricity/annual/",
            "accessed": "2026-07-18"
          },
          "id": "allowed_profit_f1",
          "playDesc": "Representative authorized return on equity."
        },
        {
          "label": "Millions per billion",
          "unit": "millions per billion",
          "value": 1000,
          "display": "1,000",
          "desc": "Defined scale conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "allowed_profit_f2",
          "playDesc": "The conversion factor from one billion to millions."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "explain": "Multiply rate base by allowed return and convert billions to millions.",
      "answer": 997.5,
      "answerDisplay": "≈ 997.5",
      "sources": [
        {
          "label": "U.S. EIA — electric power annual",
          "url": "https://www.eia.gov/electricity/annual/",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many millions of dollars are allowed on a 10.5-billion-dollar rate base at a 9.5-percent return?"
    },
    {
      "id": "daily_revenue",
      "q": "Annual utility revenue: estimate the result in dollars per day using the real-world facts below.",
      "unit": "dollars per day",
      "factors": [
        {
          "label": "Annual utility revenue",
          "unit": "billions of dollars",
          "value": 29,
          "display": "29",
          "desc": "Large investor-owned utility revenue scale.",
          "source": {
            "label": "U.S. EIA — electric power annual",
            "url": "https://www.eia.gov/electricity/annual/",
            "accessed": "2026-07-18"
          },
          "id": "daily_revenue_f0",
          "playDesc": "Large investor-owned utility revenue scale."
        },
        {
          "label": "Dollars per billion",
          "unit": "dollars per billion",
          "value": 1000000000,
          "display": "1,000,000,000",
          "desc": "Defined scale conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "daily_revenue_f1",
          "playDesc": "The number of dollars corresponding to one billion."
        },
        {
          "label": "Days per year",
          "unit": "days per year",
          "value": 365,
          "display": "365",
          "desc": "Non-leap-year conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "daily_revenue_f2",
          "playDesc": "The number of days corresponding to one year."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "explain": "Convert billions to dollars and divide by days.",
      "answer": 79452054.79452054,
      "answerDisplay": "≈ 79,452,055",
      "sources": [
        {
          "label": "U.S. EIA — electric power annual",
          "url": "https://www.eia.gov/electricity/annual/",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "What daily revenue corresponds to twenty-nine billion dollars per year?"
    }
  ],
  "sourceSummary": "Every playable value is linked to an official, institutional, scholarly, or defined-conversion source in the reveal."
} };
