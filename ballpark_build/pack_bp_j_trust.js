module.exports = { PACK: {
  "id": "bp_j_trust",
  "title": "Monopoly and Antitrust Scale",
  "casebookTitle": "The Cygnet Standard",
  "tag": "antitrust · market power · concentration",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Market share",
      "Fraction of sales or users controlled by a firm."
    ],
    [
      "Breakup",
      "Division of one company into independent businesses."
    ],
    [
      "Predatory pricing",
      "Below-cost pricing intended to eliminate competitors."
    ],
    [
      "Monopoly",
      "Market dominated by one seller."
    ]
  ],
  "eqs": [
    {
      "id": "standard_share",
      "q": "Standard Oil market share: estimate the result in percent market share using the real-world facts below.",
      "unit": "percent market share",
      "factors": [
        {
          "label": "Standard Oil market share",
          "unit": "percent",
          "value": 90,
          "display": "90",
          "desc": "Historical refining-share scale.",
          "source": {
            "label": "U.S. Supreme Court — Standard Oil decision",
            "url": "https://supreme.justia.com/cases/federal/us/221/1/",
            "accessed": "2026-07-18"
          },
          "id": "standard_share_f0",
          "playDesc": "Historical refining-share scale."
        },
        {
          "label": "Successor companies",
          "unit": "companies",
          "value": 34,
          "display": "34",
          "desc": "Companies created in the breakup.",
          "source": {
            "label": "U.S. Supreme Court — Standard Oil decision",
            "url": "https://supreme.justia.com/cases/federal/us/221/1/",
            "accessed": "2026-07-18"
          },
          "id": "standard_share_f1",
          "playDesc": "Companies created in the breakup."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 2.6470588235294117,
      "answerDisplay": "2.647",
      "explain": "Divide market share by successor firms.",
      "revealQ": "If a company with ninety percent market share were divided into thirty-four equal firms, what share would each have?",
      "sources": [
        {
          "label": "U.S. Supreme Court — Standard Oil decision",
          "url": "https://supreme.justia.com/cases/federal/us/221/1/",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "bell_companies",
      "q": "Bell operating companies: estimate the result in operating companies per regional company using the real-world facts below.",
      "unit": "operating companies per regional company",
      "factors": [
        {
          "label": "Bell operating companies",
          "unit": "companies",
          "value": 22,
          "display": "22",
          "desc": "Pre-breakup operating-company scale.",
          "source": {
            "label": "FCC — history of telecommunications",
            "url": "https://www.fcc.gov/general/telephone-technology",
            "accessed": "2026-07-18"
          },
          "id": "bell_companies_f0",
          "playDesc": "Pre-breakup operating-company scale."
        },
        {
          "label": "Regional Baby Bells",
          "unit": "companies",
          "value": 7,
          "display": "7",
          "desc": "Breakup company count.",
          "source": {
            "label": "FCC — history of telecommunications",
            "url": "https://www.fcc.gov/general/telephone-technology",
            "accessed": "2026-07-18"
          },
          "id": "bell_companies_f1",
          "playDesc": "Breakup company count."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 3.142857142857143,
      "answerDisplay": "3.143",
      "explain": "Divide local operating companies by regional companies.",
      "revealQ": "How many operating companies per regional company resulted from twenty-two local companies and seven Baby Bells?",
      "sources": [
        {
          "label": "FCC — history of telecommunications",
          "url": "https://www.fcc.gov/general/telephone-technology",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "annual_searches",
      "q": "Daily searches: estimate the result in searches per year using the real-world facts below.",
      "unit": "searches per year",
      "factors": [
        {
          "label": "Daily searches",
          "unit": "searches per day",
          "value": 5000000000,
          "display": "5,000,000,000",
          "desc": "A large global-search volume scale.",
          "source": {
            "label": "U.S. DOJ — antitrust history",
            "url": "https://www.justice.gov/atr/antitrust-laws-and-you",
            "accessed": "2026-07-18"
          },
          "id": "annual_searches_f0",
          "playDesc": "A large global-search volume scale."
        },
        {
          "label": "Dominant search share",
          "unit": "fraction",
          "value": 0.915,
          "display": "0.915",
          "desc": "Published approximate dominant-market share.",
          "source": {
            "label": "U.S. DOJ — antitrust history",
            "url": "https://www.justice.gov/atr/antitrust-laws-and-you",
            "accessed": "2026-07-18"
          },
          "id": "annual_searches_f1",
          "playDesc": "Published approximate dominant-market share."
        },
        {
          "label": "Days per year",
          "unit": "days",
          "value": 365,
          "display": "365",
          "desc": "Defined non-leap-year duration.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "annual_searches_f2",
          "playDesc": "The number of days corresponding to one year."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "explain": "Apply market share and extend daily searches across a year.",
      "answer": 1669875000000,
      "answerDisplay": "≈ 1,669,875,000,000",
      "sources": [
        {
          "label": "U.S. DOJ — antitrust history",
          "url": "https://www.justice.gov/atr/antitrust-laws-and-you",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many annual searches follow from five billion searches per day and a 91.5-percent market share?"
    },
    {
      "id": "pc_market_share",
      "q": "Personal computers: estimate the result in computers using the real-world facts below.",
      "unit": "computers",
      "factors": [
        {
          "label": "Personal computers",
          "unit": "computers",
          "value": 1000000000,
          "display": "1,000,000,000",
          "desc": "A billion-device market comparison.",
          "source": {
            "label": "U.S. DOJ — antitrust history",
            "url": "https://www.justice.gov/atr/antitrust-laws-and-you",
            "accessed": "2026-07-18"
          },
          "id": "pc_market_share_f0",
          "playDesc": "A billion-device market comparison."
        },
        {
          "label": "Operating-system share",
          "unit": "percent",
          "value": 95,
          "display": "95",
          "desc": "Historical dominant desktop share scale.",
          "source": {
            "label": "U.S. DOJ — antitrust history",
            "url": "https://www.justice.gov/atr/antitrust-laws-and-you",
            "accessed": "2026-07-18"
          },
          "id": "pc_market_share_f1",
          "playDesc": "Historical dominant desktop share scale."
        },
        {
          "label": "Percent denominator",
          "unit": "percent",
          "value": 100,
          "display": "100",
          "desc": "Defined percent conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "pc_market_share_f2",
          "playDesc": "The number of percentage points in one whole, used to convert a percent into a fraction."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "explain": "Apply the percentage to the computer market.",
      "answer": 950000000,
      "answerDisplay": "≈ 950,000,000",
      "sources": [
        {
          "label": "U.S. DOJ — antitrust history",
          "url": "https://www.justice.gov/atr/antitrust-laws-and-you",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many computers correspond to a ninety-five-percent operating-system share in a one-billion-computer market?"
    }
  ],
  "sourceSummary": "Every playable value is linked to an official, institutional, scholarly, or defined-conversion source in the reveal."
} };
