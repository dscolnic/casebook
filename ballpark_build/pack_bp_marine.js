module.exports = { PACK: {
  "id": "bp_marine",
  "title": "RMS Titanic: Ship Scale and Buoyancy",
  "casebookTitle": "The Kestrel’s Roll",
  "tag": "ships · displacement · capacity",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Displacement",
      "The mass of water displaced by a floating ship."
    ],
    [
      "Knot",
      "One nautical mile per hour."
    ],
    [
      "Lifeboat capacity",
      "Number of people boats are rated to carry."
    ],
    [
      "Buoyant force",
      "Upward force equal to the weight of displaced water."
    ]
  ],
  "eqs": [
    {
      "id": "propeller_circle",
      "q": "Propeller diameter: estimate the result in metres using the real-world facts below.",
      "unit": "metres",
      "factors": [
        {
          "label": "Propeller diameter",
          "unit": "metres",
          "value": 7.2,
          "display": "7.2",
          "desc": "Published outer-propeller diameter.",
          "source": {
            "label": "Titanic Belfast — Titanic facts",
            "url": "https://www.titanicbelfast.com/history-of-titanic/titanic-stories/titanic-facts/",
            "accessed": "2026-07-18"
          },
          "id": "propeller_circle_f0",
          "playDesc": "Published outer-propeller diameter."
        },
        {
          "label": "Pi",
          "unit": "circumference per diameter",
          "value": 3.141592653589793,
          "display": "3.14159",
          "desc": "Circular geometry constant.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "propeller_circle_f1",
          "playDesc": "The ratio of a circle’s circumference to its diameter."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 22.61946710584651,
      "answerDisplay": "22.62",
      "explain": "Circumference is diameter times pi.",
      "revealQ": "How far around was a 7.2-metre Titanic propeller?",
      "sources": [
        {
          "label": "Titanic Belfast — Titanic facts",
          "url": "https://www.titanicbelfast.com/history-of-titanic/titanic-stories/titanic-facts/",
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
      "id": "lifeboat_ratio",
      "q": "People aboard: estimate the result in times using the real-world facts below.",
      "unit": "times",
      "factors": [
        {
          "label": "People aboard",
          "unit": "people",
          "value": 2208,
          "display": "2,208",
          "desc": "Recorded passengers and crew.",
          "source": {
            "label": "Titanic Belfast — Titanic facts",
            "url": "https://www.titanicbelfast.com/history-of-titanic/titanic-stories/titanic-facts/",
            "accessed": "2026-07-18"
          },
          "id": "lifeboat_ratio_f0",
          "playDesc": "Recorded passengers and crew."
        },
        {
          "label": "Lifeboat capacity",
          "unit": "people",
          "value": 1178,
          "display": "1,178",
          "desc": "Rated total lifeboat seating.",
          "source": {
            "label": "Titanic Belfast — Titanic facts",
            "url": "https://www.titanicbelfast.com/history-of-titanic/titanic-stories/titanic-facts/",
            "accessed": "2026-07-18"
          },
          "id": "lifeboat_ratio_f1",
          "playDesc": "Rated total lifeboat seating."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 1.8743633276740237,
      "answerDisplay": "1.874",
      "explain": "Divide people aboard by available lifeboat seats.",
      "revealQ": "How many times larger was the people-aboard count than the lifeboat seating capacity?",
      "sources": [
        {
          "label": "Titanic Belfast — Titanic facts",
          "url": "https://www.titanicbelfast.com/history-of-titanic/titanic-stories/titanic-facts/",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "crossing_days",
      "q": "Atlantic route distance: estimate the result in days using the real-world facts below.",
      "unit": "days",
      "factors": [
        {
          "label": "Atlantic route distance",
          "unit": "kilometres",
          "value": 5500,
          "display": "5,500",
          "desc": "Rounded Southampton-to-New-York route scale.",
          "source": {
            "label": "Titanic Belfast — Titanic facts",
            "url": "https://www.titanicbelfast.com/history-of-titanic/titanic-stories/titanic-facts/",
            "accessed": "2026-07-18"
          },
          "id": "crossing_days_f0",
          "playDesc": "Rounded Southampton-to-New-York route scale."
        },
        {
          "label": "Service speed",
          "unit": "kilometres per hour",
          "value": 42.6,
          "display": "42.6",
          "desc": "Twenty-three knots converted to kilometres per hour.",
          "source": {
            "label": "Titanic Belfast — Titanic facts",
            "url": "https://www.titanicbelfast.com/history-of-titanic/titanic-stories/titanic-facts/",
            "accessed": "2026-07-18"
          },
          "id": "crossing_days_f1",
          "playDesc": "Twenty-three knots converted to kilometres per hour."
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
          "id": "crossing_days_f2",
          "playDesc": "The number of hours corresponding to one day."
        }
      ],
      "ops": [
        "÷",
        "÷"
      ],
      "answer": 5.379499217527386,
      "answerDisplay": "5.379",
      "explain": "Distance divided by speed gives hours; divide by hours per day.",
      "revealQ": "At Titanic’s service speed, about how many days would a 5,500-kilometre Atlantic crossing take?",
      "sources": [
        {
          "label": "Titanic Belfast — Titanic facts",
          "url": "https://www.titanicbelfast.com/history-of-titanic/titanic-stories/titanic-facts/",
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
      "id": "buoyant_force",
      "q": "Displacement: estimate the result in newtons using the real-world facts below.",
      "unit": "newtons",
      "factors": [
        {
          "label": "Displacement",
          "unit": "metric tonnes",
          "value": 52310,
          "display": "52,310",
          "desc": "Published fully loaded displacement scale.",
          "source": {
            "label": "Titanic Belfast — Titanic facts",
            "url": "https://www.titanicbelfast.com/history-of-titanic/titanic-stories/titanic-facts/",
            "accessed": "2026-07-18"
          },
          "id": "buoyant_force_f0",
          "playDesc": "Published fully loaded displacement scale."
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
          "id": "buoyant_force_f1",
          "playDesc": "The number of kilograms corresponding to one tonne."
        },
        {
          "label": "Gravitational acceleration",
          "unit": "newtons per kilogram",
          "value": 9.80665,
          "display": "9.80665",
          "desc": "Standard gravity.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "buoyant_force_f2",
          "playDesc": "Standard gravity."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "answer": 512985861.49999994,
      "answerDisplay": "512,985,861",
      "explain": "Convert tonnes to kilograms and multiply by standard gravity.",
      "revealQ": "What buoyant force corresponds to Titanic’s 52,310-tonne displacement?",
      "sources": [
        {
          "label": "Titanic Belfast — Titanic facts",
          "url": "https://www.titanicbelfast.com/history-of-titanic/titanic-stories/titanic-facts/",
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
