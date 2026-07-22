module.exports = { PACK: {
  "id": "bp_w_blood",
  "title": "Blood Donation and Transfusion",
  "casebookTitle": "The Crossmatch",
  "tag": "blood banking · volume · supply",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Whole-blood donation",
      "A standard collection of blood from one donor."
    ],
    [
      "Shelf life",
      "How long a blood product may be stored."
    ],
    [
      "Crossmatch",
      "Testing donor blood against recipient blood for compatibility."
    ],
    [
      "Blood volume",
      "Total circulating blood in the body."
    ]
  ],
  "eqs": [
    {
      "id": "donation_mass",
      "q": "Donation volume: estimate the result in grams using the real-world facts below.",
      "unit": "grams",
      "factors": [
        {
          "label": "Donation volume",
          "unit": "millilitres",
          "value": 470,
          "display": "470",
          "desc": "Approximate whole-blood donation volume.",
          "source": {
            "label": "American Red Cross — blood facts",
            "url": "https://www.redcrossblood.org/local-homepage/news/article/blood-facts-and-statistics.html",
            "accessed": "2026-07-18"
          },
          "id": "donation_mass_f0",
          "playDesc": "Approximate whole-blood donation volume."
        },
        {
          "label": "Blood density",
          "unit": "grams per millilitre",
          "value": 1.06,
          "display": "1.06",
          "desc": "Representative whole-blood density.",
          "source": {
            "label": "American Red Cross — blood facts",
            "url": "https://www.redcrossblood.org/local-homepage/news/article/blood-facts-and-statistics.html",
            "accessed": "2026-07-18"
          },
          "id": "donation_mass_f1",
          "playDesc": "Representative whole-blood density."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 498.20000000000005,
      "answerDisplay": "498.2",
      "explain": "Volume times density gives mass.",
      "revealQ": "About how many grams does a 470-millilitre whole-blood donation weigh at 1.06 grams per millilitre?",
      "sources": [
        {
          "label": "American Red Cross — blood facts",
          "url": "https://www.redcrossblood.org/local-homepage/news/article/blood-facts-and-statistics.html",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "shelf_hours",
      "q": "Storage period: estimate the result in hours using the real-world facts below.",
      "unit": "hours",
      "factors": [
        {
          "label": "Storage period",
          "unit": "days",
          "value": 35,
          "display": "35",
          "desc": "A common anticoagulant-preservative shelf-life scale.",
          "source": {
            "label": "American Red Cross — blood facts",
            "url": "https://www.redcrossblood.org/local-homepage/news/article/blood-facts-and-statistics.html",
            "accessed": "2026-07-18"
          },
          "id": "shelf_hours_f0",
          "playDesc": "A common anticoagulant-preservative shelf-life scale."
        },
        {
          "label": "Hours per day",
          "unit": "hours per day",
          "value": 24,
          "display": "24",
          "desc": "Defined time conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "shelf_hours_f1",
          "playDesc": "The number of hours corresponding to one day."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 840,
      "answerDisplay": "840",
      "explain": "Convert days to hours.",
      "revealQ": "How many hours are in a thirty-five-day red-cell storage period?",
      "sources": [
        {
          "label": "American Red Cross — blood facts",
          "url": "https://www.redcrossblood.org/local-homepage/news/article/blood-facts-and-statistics.html",
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
      "id": "annual_need",
      "q": "Days per year: estimate the result in needs per year using the real-world facts below.",
      "unit": "needs per year",
      "factors": [
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
          "id": "annual_need_f0",
          "playDesc": "The number of days corresponding to one year."
        },
        {
          "label": "Seconds per day",
          "unit": "seconds per day",
          "value": 86400,
          "display": "86,400",
          "desc": "Defined time conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "annual_need_f1",
          "playDesc": "The number of seconds corresponding to one day."
        },
        {
          "label": "Seconds per need",
          "unit": "seconds per need",
          "value": 2,
          "display": "2",
          "desc": "Red Cross public blood-need statistic.",
          "source": {
            "label": "American Red Cross — blood facts",
            "url": "https://www.redcrossblood.org/local-homepage/news/article/blood-facts-and-statistics.html",
            "accessed": "2026-07-18"
          },
          "id": "annual_need_f2",
          "playDesc": "Red Cross public blood-need statistic."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "answer": 15768000,
      "answerDisplay": "15,768,000",
      "explain": "Convert the year to seconds and divide by seconds per need.",
      "revealQ": "If someone in the United States needs blood every two seconds, how many transfusion needs occur in one year?",
      "sources": [
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        },
        {
          "label": "American Red Cross — blood facts",
          "url": "https://www.redcrossblood.org/local-homepage/news/article/blood-facts-and-statistics.html",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "adult_units",
      "q": "Typical adult blood volume: estimate the result in units using the real-world facts below.",
      "unit": "units",
      "factors": [
        {
          "label": "Typical adult blood volume",
          "unit": "litres",
          "value": 5,
          "display": "5",
          "desc": "Representative adult circulating volume.",
          "source": {
            "label": "American Red Cross — blood facts",
            "url": "https://www.redcrossblood.org/local-homepage/news/article/blood-facts-and-statistics.html",
            "accessed": "2026-07-18"
          },
          "id": "adult_units_f0",
          "playDesc": "Representative adult circulating volume."
        },
        {
          "label": "Millilitres per litre",
          "unit": "millilitres per litre",
          "value": 1000,
          "display": "1,000",
          "desc": "Defined volume conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "adult_units_f1",
          "playDesc": "The conversion factor from one litre to millilitres."
        },
        {
          "label": "Unit volume",
          "unit": "millilitres per unit",
          "value": 450,
          "display": "450",
          "desc": "Common packed-cell or whole-blood unit scale.",
          "source": {
            "label": "American Red Cross — blood facts",
            "url": "https://www.redcrossblood.org/local-homepage/news/article/blood-facts-and-statistics.html",
            "accessed": "2026-07-18"
          },
          "id": "adult_units_f2",
          "playDesc": "Common packed-cell or whole-blood unit scale."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "answer": 11.11111111111111,
      "answerDisplay": "11.11",
      "explain": "Convert litres to millilitres and divide by unit volume.",
      "revealQ": "How many 450-millilitre units equal five litres of adult blood?",
      "sources": [
        {
          "label": "American Red Cross — blood facts",
          "url": "https://www.redcrossblood.org/local-homepage/news/article/blood-facts-and-statistics.html",
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
