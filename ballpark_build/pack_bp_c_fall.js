module.exports = { PACK: {
  "id": "bp_c_fall",
  "title": "The Roman Empire by the Numbers",
  "casebookTitle": "The Last Council of Vellano",
  "tag": "history · infrastructure · empire",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Legion",
      "Large Roman military formation."
    ],
    [
      "Grain dole",
      "State distribution of subsidized or free grain."
    ],
    [
      "Roman road",
      "Engineered route connecting the empire."
    ],
    [
      "Chronology",
      "Ordering events in time."
    ]
  ],
  "eqs": [
    {
      "id": "road_miles",
      "q": "Paved Roman roads: estimate the result in miles using the real-world facts below.",
      "unit": "miles",
      "factors": [
        {
          "label": "Paved Roman roads",
          "unit": "kilometres",
          "value": 80000,
          "display": "80,000",
          "desc": "Historical road-network scale.",
          "source": {
            "label": "University of Chicago — Roman roads reference",
            "url": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/secondary/SMIGRA*/Viae.html",
            "accessed": "2026-07-18"
          },
          "id": "road_miles_f0",
          "playDesc": "Historical road-network scale."
        },
        {
          "label": "Miles per kilometre",
          "unit": "miles per kilometre",
          "value": 0.621371,
          "display": "0.621371",
          "desc": "Defined length conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "road_miles_f1",
          "playDesc": "The number of miles corresponding to one kilometre."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 49709.68,
      "answerDisplay": "49,709.7",
      "explain": "Convert kilometres to miles.",
      "revealQ": "How many miles are in eighty thousand kilometres of paved Roman roads?",
      "sources": [
        {
          "label": "University of Chicago — Roman roads reference",
          "url": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/secondary/SMIGRA*/Viae.html",
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
      "id": "legion_army",
      "q": "Roman legions: estimate the result in soldiers using the real-world facts below.",
      "unit": "soldiers",
      "factors": [
        {
          "label": "Roman legions",
          "unit": "legions",
          "value": 28,
          "display": "28",
          "desc": "Early imperial legion count.",
          "source": {
            "label": "British Museum — Roman Empire",
            "url": "https://www.britishmuseum.org/collection/galleries/roman-empire",
            "accessed": "2026-07-18"
          },
          "id": "legion_army_f0",
          "playDesc": "Early imperial legion count."
        },
        {
          "label": "Soldiers per legion",
          "unit": "soldiers per legion",
          "value": 5000,
          "display": "5,000",
          "desc": "Representative legion strength.",
          "source": {
            "label": "British Museum — Roman Empire",
            "url": "https://www.britishmuseum.org/collection/galleries/roman-empire",
            "accessed": "2026-07-18"
          },
          "id": "legion_army_f1",
          "playDesc": "Representative legion strength."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 140000,
      "answerDisplay": "140,000",
      "explain": "Multiply legions by soldiers per legion.",
      "revealQ": "How many soldiers are in twenty-eight legions of five thousand each?",
      "sources": [
        {
          "label": "British Museum — Roman Empire",
          "url": "https://www.britishmuseum.org/collection/galleries/roman-empire",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "empire_hours",
      "q": "Historical interval: estimate the result in hours using the real-world facts below.",
      "unit": "hours",
      "factors": [
        {
          "label": "Historical interval",
          "unit": "years",
          "value": 503,
          "display": "503",
          "desc": "Approximate 27 BCE to 476 CE interval.",
          "source": {
            "label": "British Museum — Roman Empire",
            "url": "https://www.britishmuseum.org/collection/galleries/roman-empire",
            "accessed": "2026-07-18"
          },
          "id": "empire_hours_f0",
          "playDesc": "Approximate 27 BCE to 476 CE interval."
        },
        {
          "label": "Days per year",
          "unit": "days per year",
          "value": 365,
          "display": "365",
          "desc": "Calendar approximation.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "empire_hours_f1",
          "playDesc": "Calendar approximation."
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
          "id": "empire_hours_f2",
          "playDesc": "The number of hours corresponding to one day."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "answer": 4406280,
      "answerDisplay": "4,406,280",
      "explain": "Convert years to days and hours.",
      "revealQ": "How many hours span 503 years from Augustus to the western imperial deposition?",
      "sources": [
        {
          "label": "British Museum — Roman Empire",
          "url": "https://www.britishmuseum.org/collection/galleries/roman-empire",
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
      "id": "grain_person",
      "q": "Annual grain supply: estimate the result in kilograms per person using the real-world facts below.",
      "unit": "kilograms per person",
      "factors": [
        {
          "label": "Annual grain supply",
          "unit": "metric tonnes",
          "value": 150000,
          "display": "150,000",
          "desc": "Historical Rome grain-supply estimate.",
          "source": {
            "label": "Cambridge classical reference — Roman grain supply",
            "url": "https://www.cambridge.org/core/books/grain-market-in-the-roman-empire/",
            "accessed": "2026-07-18"
          },
          "id": "grain_person_f0",
          "playDesc": "Historical Rome grain-supply estimate."
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
          "id": "grain_person_f1",
          "playDesc": "The number of kilograms corresponding to one tonne."
        },
        {
          "label": "Population served",
          "unit": "people",
          "value": 1000000,
          "display": "1,000,000",
          "desc": "Peak-city population scale.",
          "source": {
            "label": "Cambridge classical reference — Roman grain supply",
            "url": "https://www.cambridge.org/core/books/grain-market-in-the-roman-empire/",
            "accessed": "2026-07-18"
          },
          "id": "grain_person_f2",
          "playDesc": "Peak-city population scale."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "answer": 150,
      "answerDisplay": "150",
      "explain": "Convert tonnes to kilograms and divide by population.",
      "revealQ": "How many kilograms per person is 150,000 tonnes of grain divided among one million people?",
      "sources": [
        {
          "label": "Cambridge classical reference — Roman grain supply",
          "url": "https://www.cambridge.org/core/books/grain-market-in-the-roman-empire/",
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
