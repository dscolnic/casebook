module.exports = { PACK: {
  "id": "bp_j_bank",
  "title": "Silicon Valley Bank and Bank Runs",
  "casebookTitle": "The Sterling Trust Collapse",
  "tag": "banking · deposits · liquidity",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Deposit",
      "Money held by a bank for customers."
    ],
    [
      "Uninsured deposit",
      "Deposit balance above insurance protection."
    ],
    [
      "Bank run",
      "Rapid withdrawal of deposits by many customers."
    ],
    [
      "Leverage",
      "Assets supported by a smaller amount of equity."
    ]
  ],
  "eqs": [
    {
      "id": "asset_deposit_ratio",
      "q": "SVB assets: estimate the result in asset-to-deposit ratio using the real-world facts below.",
      "unit": "asset-to-deposit ratio",
      "factors": [
        {
          "label": "SVB assets",
          "unit": "billions of dollars",
          "value": 209,
          "display": "209",
          "desc": "FDIC reported asset scale.",
          "source": {
            "label": "FDIC — Silicon Valley Bank report",
            "url": "https://www.fdic.gov/news/press-releases/2023/pr23033a.pdf",
            "accessed": "2026-07-18"
          },
          "id": "asset_deposit_ratio_f0",
          "playDesc": "FDIC reported asset scale."
        },
        {
          "label": "SVB deposits",
          "unit": "billions of dollars",
          "value": 175,
          "display": "175",
          "desc": "FDIC reported deposit scale.",
          "source": {
            "label": "FDIC — Silicon Valley Bank report",
            "url": "https://www.fdic.gov/news/press-releases/2023/pr23033a.pdf",
            "accessed": "2026-07-18"
          },
          "id": "asset_deposit_ratio_f1",
          "playDesc": "FDIC reported deposit scale."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 1.1942857142857144,
      "answerDisplay": "1.194",
      "explain": "Divide assets by deposits.",
      "revealQ": "What asset-to-deposit ratio follows from 209 billion dollars of assets and 175 billion of deposits?",
      "sources": [
        {
          "label": "FDIC — Silicon Valley Bank report",
          "url": "https://www.fdic.gov/news/press-releases/2023/pr23033a.pdf",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "run_hour",
      "q": "Withdrawal requests: estimate the result in billions of dollars per hour using the real-world facts below.",
      "unit": "billions of dollars per hour",
      "factors": [
        {
          "label": "Withdrawal requests",
          "unit": "billions of dollars",
          "value": 42,
          "display": "42",
          "desc": "Documented one-day run request scale.",
          "source": {
            "label": "FDIC — Silicon Valley Bank report",
            "url": "https://www.fdic.gov/news/press-releases/2023/pr23033a.pdf",
            "accessed": "2026-07-18"
          },
          "id": "run_hour_f0",
          "playDesc": "Documented one-day run request scale."
        },
        {
          "label": "Run interval",
          "unit": "hours",
          "value": 10,
          "display": "10",
          "desc": "Trading-day comparison interval.",
          "source": {
            "label": "FDIC — Silicon Valley Bank report",
            "url": "https://www.fdic.gov/news/press-releases/2023/pr23033a.pdf",
            "accessed": "2026-07-18"
          },
          "id": "run_hour_f1",
          "playDesc": "Trading-day comparison interval."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 4.2,
      "answerDisplay": "4.2",
      "explain": "Divide requested withdrawals by hours.",
      "revealQ": "How many billions of dollars per hour is a forty-two-billion-dollar withdrawal over ten hours?",
      "sources": [
        {
          "label": "FDIC — Silicon Valley Bank report",
          "url": "https://www.fdic.gov/news/press-releases/2023/pr23033a.pdf",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "insurance_units",
      "q": "Uninsured deposits: estimate the result in insurance-limit units using the real-world facts below.",
      "unit": "insurance-limit units",
      "factors": [
        {
          "label": "Uninsured deposits",
          "unit": "billions of dollars",
          "value": 151.5,
          "display": "151.5",
          "desc": "FDIC uninsured-deposit estimate.",
          "source": {
            "label": "FDIC — Silicon Valley Bank report",
            "url": "https://www.fdic.gov/news/press-releases/2023/pr23033a.pdf",
            "accessed": "2026-07-18"
          },
          "id": "insurance_units_f0",
          "playDesc": "FDIC uninsured-deposit estimate."
        },
        {
          "label": "Dollars per billion",
          "unit": "dollars per billion",
          "value": 1000000000,
          "display": "1,000,000,000",
          "desc": "Number-scale conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "insurance_units_f1",
          "playDesc": "The number of dollars corresponding to one billion."
        },
        {
          "label": "FDIC insurance limit",
          "unit": "dollars",
          "value": 250000,
          "display": "250,000",
          "desc": "Standard per-depositor insurance limit.",
          "source": {
            "label": "FDIC — Silicon Valley Bank report",
            "url": "https://www.fdic.gov/news/press-releases/2023/pr23033a.pdf",
            "accessed": "2026-07-18"
          },
          "id": "insurance_units_f2",
          "playDesc": "The fdic insurance limit documented or defined by FDIC — Silicon Valley Bank report."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "answer": 606000,
      "answerDisplay": "606,000",
      "explain": "Convert billions to dollars and divide by the insurance limit.",
      "revealQ": "How many federal insurance-limit units fit into 151.5 billion dollars of uninsured deposits?",
      "sources": [
        {
          "label": "FDIC — Silicon Valley Bank report",
          "url": "https://www.fdic.gov/news/press-releases/2023/pr23033a.pdf",
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
      "id": "jpm_assets_employee",
      "q": "Bank assets: estimate the result in dollars per employee using the real-world facts below.",
      "unit": "dollars per employee",
      "factors": [
        {
          "label": "Bank assets",
          "unit": "trillions of dollars",
          "value": 3.7,
          "display": "3.7",
          "desc": "Large-bank asset scale.",
          "source": {
            "label": "JPMorgan Chase — annual report",
            "url": "https://www.jpmorganchase.com/ir/annual-report",
            "accessed": "2026-07-18"
          },
          "id": "jpm_assets_employee_f0",
          "playDesc": "Large-bank asset scale."
        },
        {
          "label": "Dollars per trillion",
          "unit": "dollars per trillion",
          "value": 1000000000000,
          "display": "1,000,000,000,000",
          "desc": "Number-scale conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "jpm_assets_employee_f1",
          "playDesc": "The number of dollars corresponding to one trillion."
        },
        {
          "label": "Employees",
          "unit": "employees",
          "value": 300000,
          "display": "300,000",
          "desc": "Large-bank workforce scale.",
          "source": {
            "label": "JPMorgan Chase — annual report",
            "url": "https://www.jpmorganchase.com/ir/annual-report",
            "accessed": "2026-07-18"
          },
          "id": "jpm_assets_employee_f2",
          "playDesc": "Large-bank workforce scale."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "answer": 12333333.333333334,
      "answerDisplay": "12,333,333",
      "explain": "Convert trillions to dollars and divide by employees.",
      "revealQ": "How many dollars of assets correspond to each employee at a 3.7-trillion-dollar bank with 300,000 employees?",
      "sources": [
        {
          "label": "JPMorgan Chase — annual report",
          "url": "https://www.jpmorganchase.com/ir/annual-report",
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
