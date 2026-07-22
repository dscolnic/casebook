module.exports = { PACK: {
  "id": "bp_j_fraud",
  "title": "Corporate Accounting Fraud by the Numbers",
  "casebookTitle": "The Amberline Collapse",
  "tag": "accounting · market value · fraud",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Market capitalization",
      "Share price multiplied by shares outstanding."
    ],
    [
      "Special-purpose entity",
      "Separate legal entity sometimes used to move risk or debt."
    ],
    [
      "Restatement",
      "Correction of previously reported financial statements."
    ],
    [
      "Going concern",
      "Assumption that a business will continue operating."
    ]
  ],
  "eqs": [
    {
      "id": "enron_employee",
      "q": "Peak market value: estimate the result in dollars per employee using the real-world facts below.",
      "unit": "dollars per employee",
      "factors": [
        {
          "label": "Peak market value",
          "unit": "dollars",
          "value": 70000000000,
          "display": "70,000,000,000",
          "desc": "Widely reported Enron market-cap scale.",
          "source": {
            "label": "SEC — Enron litigation release",
            "url": "https://www.sec.gov/news/press/2002-144.htm",
            "accessed": "2026-07-18"
          },
          "id": "enron_employee_f0",
          "playDesc": "Widely reported Enron market-cap scale."
        },
        {
          "label": "Employees",
          "unit": "employees",
          "value": 20000,
          "display": "20,000",
          "desc": "Workforce scale before collapse.",
          "source": {
            "label": "SEC — Enron litigation release",
            "url": "https://www.sec.gov/news/press/2002-144.htm",
            "accessed": "2026-07-18"
          },
          "id": "enron_employee_f1",
          "playDesc": "Workforce scale before collapse."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 3500000,
      "answerDisplay": "3,500,000",
      "explain": "Divide market value by employees.",
      "revealQ": "How many dollars of peak market value corresponded to each of Enron’s twenty thousand employees?",
      "sources": [
        {
          "label": "SEC — Enron litigation release",
          "url": "https://www.sec.gov/news/press/2002-144.htm",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "stock_ratio",
      "q": "Peak share price: estimate the result in times using the real-world facts below.",
      "unit": "times",
      "factors": [
        {
          "label": "Peak share price",
          "unit": "dollars",
          "value": 90.75,
          "display": "90.75",
          "desc": "Historical Enron peak.",
          "source": {
            "label": "SEC — Enron litigation release",
            "url": "https://www.sec.gov/news/press/2002-144.htm",
            "accessed": "2026-07-18"
          },
          "id": "stock_ratio_f0",
          "playDesc": "Historical Enron peak."
        },
        {
          "label": "Collapsed share price",
          "unit": "dollars",
          "value": 0.26,
          "display": "0.26",
          "desc": "Late-collapse price scale.",
          "source": {
            "label": "SEC — Enron litigation release",
            "url": "https://www.sec.gov/news/press/2002-144.htm",
            "accessed": "2026-07-18"
          },
          "id": "stock_ratio_f1",
          "playDesc": "Late-collapse price scale."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 349.03846153846155,
      "answerDisplay": "349.04",
      "explain": "Divide peak price by collapsed price.",
      "revealQ": "How many times higher was a 90.75-dollar share price than twenty-six cents?",
      "sources": [
        {
          "label": "SEC — Enron litigation release",
          "url": "https://www.sec.gov/news/press/2002-144.htm",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "shareholder_loss",
      "q": "Shares outstanding: estimate the result in dollars using the real-world facts below.",
      "unit": "dollars",
      "factors": [
        {
          "label": "Shares outstanding",
          "unit": "shares",
          "value": 752000000,
          "display": "752,000,000",
          "desc": "Historical share-count scale.",
          "source": {
            "label": "SEC — Enron litigation release",
            "url": "https://www.sec.gov/news/press/2002-144.htm",
            "accessed": "2026-07-18"
          },
          "id": "shareholder_loss_f0",
          "playDesc": "Historical share-count scale."
        },
        {
          "label": "Pre-collapse share value",
          "unit": "dollars per share",
          "value": 83.13,
          "display": "83.13",
          "desc": "Historical price scale.",
          "source": {
            "label": "SEC — Enron litigation release",
            "url": "https://www.sec.gov/news/press/2002-144.htm",
            "accessed": "2026-07-18"
          },
          "id": "shareholder_loss_f1",
          "playDesc": "Historical price scale."
        },
        {
          "label": "Fraction lost",
          "unit": "fraction",
          "value": 0.997,
          "display": "0.997",
          "desc": "Near-total loss fraction.",
          "source": {
            "label": "SEC — Enron litigation release",
            "url": "https://www.sec.gov/news/press/2002-144.htm",
            "accessed": "2026-07-18"
          },
          "id": "shareholder_loss_f2",
          "playDesc": "Near-total loss fraction."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "answer": 62326218720,
      "answerDisplay": "62,326,218,720",
      "explain": "Shares times price gives market value; multiply by fraction lost.",
      "revealQ": "What value is lost when 752 million shares at 83.13 dollars lose 99.7 percent?",
      "sources": [
        {
          "label": "SEC — Enron litigation release",
          "url": "https://www.sec.gov/news/press/2002-144.htm",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "worldcom_employee_year",
      "q": "WorldCom fraud: estimate the result in dollars per employee-year using the real-world facts below.",
      "unit": "dollars per employee-year",
      "factors": [
        {
          "label": "WorldCom fraud",
          "unit": "dollars",
          "value": 11000000000,
          "display": "11,000,000,000",
          "desc": "Documented accounting-fraud scale.",
          "source": {
            "label": "SEC — Enron litigation release",
            "url": "https://www.sec.gov/news/press/2002-144.htm",
            "accessed": "2026-07-18"
          },
          "id": "worldcom_employee_year_f0",
          "playDesc": "Documented accounting-fraud scale."
        },
        {
          "label": "Employees",
          "unit": "employees",
          "value": 85000,
          "display": "85,000",
          "desc": "Company workforce scale.",
          "source": {
            "label": "SEC — Enron litigation release",
            "url": "https://www.sec.gov/news/press/2002-144.htm",
            "accessed": "2026-07-18"
          },
          "id": "worldcom_employee_year_f1",
          "playDesc": "Company workforce scale."
        },
        {
          "label": "Fraud period",
          "unit": "years",
          "value": 5,
          "display": "5",
          "desc": "Approximate concealment period.",
          "source": {
            "label": "SEC — Enron litigation release",
            "url": "https://www.sec.gov/news/press/2002-144.htm",
            "accessed": "2026-07-18"
          },
          "id": "worldcom_employee_year_f2",
          "playDesc": "Approximate concealment period."
        }
      ],
      "ops": [
        "÷",
        "÷"
      ],
      "answer": 25882.35294117647,
      "answerDisplay": "25,882.4",
      "explain": "Divide fraud amount by employees and years.",
      "revealQ": "How many dollars of accounting fraud per employee-year is eleven billion dollars across 85,000 employees over five years?",
      "sources": [
        {
          "label": "SEC — Enron litigation release",
          "url": "https://www.sec.gov/news/press/2002-144.htm",
          "accessed": "2026-07-18"
        }
      ]
    }
  ],
  "sourceSummary": "Every playable value is linked to an official, institutional, scholarly, or defined-conversion source in the reveal."
} };
