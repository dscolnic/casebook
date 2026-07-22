module.exports = { PACK: {
  "id": "bp_w_hai",
  "title": "Healthcare-Associated Infections",
  "casebookTitle": "The Ward Cluster",
  "tag": "infection control · hospitals · rates",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Patient-day",
      "One patient occupying a bed for one day."
    ],
    [
      "Healthcare-associated infection",
      "An infection acquired while receiving medical care."
    ],
    [
      "Occupancy",
      "Fraction of staffed beds in use."
    ],
    [
      "Antimicrobial resistance",
      "Ability of microbes to survive drugs intended to kill them."
    ]
  ],
  "eqs": [
    {
      "id": "hai_percent",
      "q": "Patients with an HAI: estimate the result in percent using the real-world facts below.",
      "unit": "percent",
      "factors": [
        {
          "label": "Patients with an HAI",
          "unit": "patients",
          "value": 1,
          "display": "1",
          "desc": "CDC point-prevalence phrasing.",
          "source": {
            "label": "CDC — healthcare-associated infections",
            "url": "https://www.cdc.gov/healthcare-associated-infections/about/index.html",
            "accessed": "2026-07-18"
          },
          "id": "hai_percent_f0",
          "playDesc": "CDC point-prevalence phrasing."
        },
        {
          "label": "Hospital patients",
          "unit": "patients",
          "value": 31,
          "display": "31",
          "desc": "CDC denominator.",
          "source": {
            "label": "CDC — healthcare-associated infections",
            "url": "https://www.cdc.gov/healthcare-associated-infections/about/index.html",
            "accessed": "2026-07-18"
          },
          "id": "hai_percent_f1",
          "playDesc": "CDC denominator."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 0.03225806451612903,
      "answerDisplay": "0.03226",
      "explain": "One divided by thirty-one gives the fraction; the interface reports the decimal scale.",
      "revealQ": "What percentage is one hospital patient out of thirty-one?",
      "sources": [
        {
          "label": "CDC — healthcare-associated infections",
          "url": "https://www.cdc.gov/healthcare-associated-infections/about/index.html",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "infections_day",
      "q": "Annual HAIs: estimate the result in infections per day using the real-world facts below.",
      "unit": "infections per day",
      "factors": [
        {
          "label": "Annual HAIs",
          "unit": "infections",
          "value": 687000,
          "display": "687,000",
          "desc": "CDC 2015 national burden estimate.",
          "source": {
            "label": "CDC — healthcare-associated infections",
            "url": "https://www.cdc.gov/healthcare-associated-infections/about/index.html",
            "accessed": "2026-07-18"
          },
          "id": "infections_day_f0",
          "playDesc": "CDC 2015 national burden estimate."
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
          "id": "infections_day_f1",
          "playDesc": "The number of days corresponding to one year."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 1882.1917808219177,
      "answerDisplay": "1,882.2",
      "explain": "Divide annual infections by days.",
      "revealQ": "How many infections per day correspond to 687,000 in one year?",
      "sources": [
        {
          "label": "CDC — healthcare-associated infections",
          "url": "https://www.cdc.gov/healthcare-associated-infections/about/index.html",
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
      "id": "death_hospital_day",
      "q": "HAI-associated deaths: estimate the result in deaths per hospital-day using the real-world facts below.",
      "unit": "deaths per hospital-day",
      "factors": [
        {
          "label": "HAI-associated deaths",
          "unit": "deaths",
          "value": 72000,
          "display": "72,000",
          "desc": "CDC national estimate.",
          "source": {
            "label": "CDC — healthcare-associated infections",
            "url": "https://www.cdc.gov/healthcare-associated-infections/about/index.html",
            "accessed": "2026-07-18"
          },
          "id": "death_hospital_day_f0",
          "playDesc": "CDC national estimate."
        },
        {
          "label": "U.S. hospitals",
          "unit": "hospitals",
          "value": 6093,
          "display": "6,093",
          "desc": "National hospital-count scale.",
          "source": {
            "label": "CDC — healthcare-associated infections",
            "url": "https://www.cdc.gov/healthcare-associated-infections/about/index.html",
            "accessed": "2026-07-18"
          },
          "id": "death_hospital_day_f1",
          "playDesc": "National hospital-count scale."
        },
        {
          "label": "Days per year",
          "unit": "days",
          "value": 365.25,
          "display": "365.25",
          "desc": "Average Gregorian year length.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "death_hospital_day_f2",
          "playDesc": "Average Gregorian year length."
        }
      ],
      "ops": [
        "÷",
        "÷"
      ],
      "answer": 0.032352741945431036,
      "answerDisplay": "0.03235",
      "explain": "Divide deaths by hospitals and days.",
      "revealQ": "How many HAI deaths per hospital-day correspond to 72,000 deaths across 6,093 hospitals?",
      "sources": [
        {
          "label": "CDC — healthcare-associated infections",
          "url": "https://www.cdc.gov/healthcare-associated-infections/about/index.html",
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
      "id": "patient_days",
      "q": "Staffed hospital beds: estimate the result in patient-days using the real-world facts below.",
      "unit": "patient-days",
      "factors": [
        {
          "label": "Staffed hospital beds",
          "unit": "beds",
          "value": 920000,
          "display": "920,000",
          "desc": "U.S. staffed-bed scale.",
          "source": {
            "label": "CDC — healthcare-associated infections",
            "url": "https://www.cdc.gov/healthcare-associated-infections/about/index.html",
            "accessed": "2026-07-18"
          },
          "id": "patient_days_f0",
          "playDesc": "U.S. staffed-bed scale."
        },
        {
          "label": "Occupancy fraction",
          "unit": "fraction",
          "value": 0.65,
          "display": "0.65",
          "desc": "Representative national occupancy.",
          "source": {
            "label": "CDC — healthcare-associated infections",
            "url": "https://www.cdc.gov/healthcare-associated-infections/about/index.html",
            "accessed": "2026-07-18"
          },
          "id": "patient_days_f1",
          "playDesc": "Representative national occupancy."
        },
        {
          "label": "Calendar days",
          "unit": "days",
          "value": 366,
          "display": "366",
          "desc": "Leap-year comparison interval.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "patient_days_f2",
          "playDesc": "Leap-year comparison interval."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "answer": 218868000,
      "answerDisplay": "218,868,000",
      "explain": "Beds times occupancy and days gives occupied patient-days.",
      "revealQ": "How many occupied patient-days result from 920,000 beds at sixty-five percent occupancy in a year?",
      "sources": [
        {
          "label": "CDC — healthcare-associated infections",
          "url": "https://www.cdc.gov/healthcare-associated-infections/about/index.html",
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
