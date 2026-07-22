module.exports = { PACK: {
  "id": "bp_j_press",
  "title": "News Organizations and Verification Scale",
  "casebookTitle": "The Ashford Dispatch",
  "tag": "journalism · verification · global news",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "News bureau",
      "Office from which journalists cover a location."
    ],
    [
      "Wire service",
      "Organization distributing reports to many news outlets."
    ],
    [
      "Subscriber",
      "Paying reader or account."
    ],
    [
      "Verification",
      "Checking claims against evidence and independent sources."
    ]
  ],
  "eqs": [
    {
      "id": "journalists_location",
      "q": "Reuters journalists: estimate the result in journalists per location using the real-world facts below.",
      "unit": "journalists per location",
      "factors": [
        {
          "label": "Reuters journalists",
          "unit": "journalists",
          "value": 2500,
          "display": "2,500",
          "desc": "Reuters workforce scale.",
          "source": {
            "label": "Reuters — company facts",
            "url": "https://www.reutersagency.com/en/about/about-us/",
            "accessed": "2026-07-18"
          },
          "id": "journalists_location_f0",
          "playDesc": "Reuters workforce scale."
        },
        {
          "label": "Reuters locations",
          "unit": "locations",
          "value": 200,
          "display": "200",
          "desc": "Global office-location scale.",
          "source": {
            "label": "Reuters — company facts",
            "url": "https://www.reutersagency.com/en/about/about-us/",
            "accessed": "2026-07-18"
          },
          "id": "journalists_location_f1",
          "playDesc": "Global office-location scale."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 12.5,
      "answerDisplay": "12.5",
      "explain": "Divide journalists by locations.",
      "revealQ": "How many journalists per location is 2,500 journalists across two hundred Reuters locations?",
      "sources": [
        {
          "label": "Reuters — company facts",
          "url": "https://www.reutersagency.com/en/about/about-us/",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "language_hours",
      "q": "News languages: estimate the result in language-hours per day using the real-world facts below.",
      "unit": "language-hours per day",
      "factors": [
        {
          "label": "News languages",
          "unit": "languages",
          "value": 16,
          "display": "16",
          "desc": "Reuters language scale.",
          "source": {
            "label": "Reuters — company facts",
            "url": "https://www.reutersagency.com/en/about/about-us/",
            "accessed": "2026-07-18"
          },
          "id": "language_hours_f0",
          "playDesc": "Reuters language scale."
        },
        {
          "label": "Hours per day",
          "unit": "hours",
          "value": 24,
          "display": "24",
          "desc": "Defined time conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "language_hours_f1",
          "playDesc": "The number of hours corresponding to one day."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 384,
      "answerDisplay": "384",
      "explain": "Multiply languages by hours.",
      "revealQ": "How many language-hours are represented by sixteen languages covered around the clock?",
      "sources": [
        {
          "label": "Reuters — company facts",
          "url": "https://www.reutersagency.com/en/about/about-us/",
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
      "id": "stories_journalist_day",
      "q": "Annual reports: estimate the result in reports per journalist-day using the real-world facts below.",
      "unit": "reports per journalist-day",
      "factors": [
        {
          "label": "Annual reports",
          "unit": "reports",
          "value": 2000000,
          "display": "2,000,000",
          "desc": "Wire-service output scale.",
          "source": {
            "label": "Reuters — company facts",
            "url": "https://www.reutersagency.com/en/about/about-us/",
            "accessed": "2026-07-18"
          },
          "id": "stories_journalist_day_f0",
          "playDesc": "Wire-service output scale."
        },
        {
          "label": "Journalists",
          "unit": "journalists",
          "value": 2400,
          "display": "2,400",
          "desc": "Newsroom workforce scale.",
          "source": {
            "label": "Reuters — company facts",
            "url": "https://www.reutersagency.com/en/about/about-us/",
            "accessed": "2026-07-18"
          },
          "id": "stories_journalist_day_f1",
          "playDesc": "Newsroom workforce scale."
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
          "id": "stories_journalist_day_f2",
          "playDesc": "The number of days corresponding to one year."
        }
      ],
      "ops": [
        "÷",
        "÷"
      ],
      "answer": 2.2831050228310503,
      "answerDisplay": "2.283",
      "explain": "Divide annual reports by journalists and days.",
      "revealQ": "If a wire service produces two million reports per year, how many is that per journalist per day for 2,400 journalists?",
      "sources": [
        {
          "label": "Reuters — company facts",
          "url": "https://www.reutersagency.com/en/about/about-us/",
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
      "id": "subscriber_revenue",
      "q": "Annual subscription revenue: estimate the result in dollars per subscriber-month using the real-world facts below.",
      "unit": "dollars per subscriber-month",
      "factors": [
        {
          "label": "Annual subscription revenue",
          "unit": "dollars",
          "value": 1700000000,
          "display": "1,700,000,000",
          "desc": "Company annual-report scale.",
          "source": {
            "label": "The New York Times Company — annual report",
            "url": "https://www.nytco.com/investors/annual-reports/",
            "accessed": "2026-07-18"
          },
          "id": "subscriber_revenue_f0",
          "playDesc": "Company annual-report scale."
        },
        {
          "label": "Digital subscribers",
          "unit": "subscribers",
          "value": 10800000,
          "display": "10,800,000",
          "desc": "Company subscriber scale.",
          "source": {
            "label": "The New York Times Company — annual report",
            "url": "https://www.nytco.com/investors/annual-reports/",
            "accessed": "2026-07-18"
          },
          "id": "subscriber_revenue_f1",
          "playDesc": "Company subscriber scale."
        },
        {
          "label": "Months per year",
          "unit": "months",
          "value": 12,
          "display": "12",
          "desc": "Calendar conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "subscriber_revenue_f2",
          "playDesc": "The number of months corresponding to one year."
        }
      ],
      "ops": [
        "÷",
        "÷"
      ],
      "answer": 13.117283950617285,
      "answerDisplay": "13.12",
      "explain": "Divide revenue by subscribers and months.",
      "revealQ": "What monthly subscription revenue per digital subscriber follows from 1.7 billion dollars and 10.8 million subscribers?",
      "sources": [
        {
          "label": "The New York Times Company — annual report",
          "url": "https://www.nytco.com/investors/annual-reports/",
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
