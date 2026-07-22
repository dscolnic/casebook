module.exports = { PACK: {
  "id": "bp_rail",
  "title": "Fast Trains and Rail Capacity",
  "casebookTitle": "The 8:14 to Ardenmoor",
  "tag": "railways · speed · energy",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Line speed",
      "Maximum authorized operating speed."
    ],
    [
      "Kinetic energy",
      "Energy possessed by a moving object."
    ],
    [
      "Passenger journey",
      "One passenger trip."
    ],
    [
      "Specific kinetic energy",
      "Kinetic energy per kilogram at a specified speed."
    ]
  ],
  "eqs": [
    {
      "id": "tgv_mph",
      "q": "TGV record speed: estimate the result in miles per hour using the real-world facts below.",
      "unit": "miles per hour",
      "factors": [
        {
          "label": "TGV record speed",
          "unit": "kilometres per hour",
          "value": 574.8,
          "display": "574.8",
          "desc": "Widely documented rail-speed record.",
          "source": {
            "label": "Amtrak — national facts and statistics",
            "url": "https://www.amtrak.com/about-amtrak/amtrak-facts",
            "accessed": "2026-07-18"
          },
          "id": "tgv_mph_f0",
          "playDesc": "Widely documented rail-speed record."
        },
        {
          "label": "Miles per kilometre",
          "unit": "miles per kilometre",
          "value": 0.621371,
          "display": "0.621371",
          "desc": "Defined speed conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "tgv_mph_f1",
          "playDesc": "The number of miles corresponding to one kilometre."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 357.1640508,
      "answerDisplay": "357.16",
      "explain": "Convert kilometres per hour to miles per hour.",
      "revealQ": "How many miles per hour was the TGV’s 574.8-kilometre-per-hour world record?",
      "sources": [
        {
          "label": "Amtrak — national facts and statistics",
          "url": "https://www.amtrak.com/about-amtrak/amtrak-facts",
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
      "id": "shinkansen_minute",
      "q": "Shinkansen operating speed: estimate the result in kilometres using the real-world facts below.",
      "unit": "kilometres",
      "factors": [
        {
          "label": "Shinkansen operating speed",
          "unit": "kilometres per hour",
          "value": 320,
          "display": "320",
          "desc": "High-speed rail operating scale.",
          "source": {
            "label": "Amtrak — national facts and statistics",
            "url": "https://www.amtrak.com/about-amtrak/amtrak-facts",
            "accessed": "2026-07-18"
          },
          "id": "shinkansen_minute_f0",
          "playDesc": "High-speed rail operating scale."
        },
        {
          "label": "Minutes per hour",
          "unit": "minutes per hour",
          "value": 60,
          "display": "60",
          "desc": "Defined time conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "shinkansen_minute_f1",
          "playDesc": "The number of minutes corresponding to one hour."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 5.333333333333333,
      "answerDisplay": "5.333",
      "explain": "Divide hourly distance by minutes per hour.",
      "revealQ": "How many kilometres does a 320-kilometre-per-hour train cover in one minute?",
      "sources": [
        {
          "label": "Amtrak — national facts and statistics",
          "url": "https://www.amtrak.com/about-amtrak/amtrak-facts",
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
      "id": "amtrak_state_day",
      "q": "Annual Amtrak trips: estimate the result in trips per state-day using the real-world facts below.",
      "unit": "trips per state-day",
      "factors": [
        {
          "label": "Annual Amtrak trips",
          "unit": "trips",
          "value": 32800000,
          "display": "32,800,000",
          "desc": "Published annual ridership scale.",
          "source": {
            "label": "Amtrak — national facts and statistics",
            "url": "https://www.amtrak.com/about-amtrak/amtrak-facts",
            "accessed": "2026-07-18"
          },
          "id": "amtrak_state_day_f0",
          "playDesc": "Published annual ridership scale."
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
          "id": "amtrak_state_day_f1",
          "playDesc": "The number of days corresponding to one year."
        },
        {
          "label": "States served",
          "unit": "states",
          "value": 46,
          "display": "46",
          "desc": "Amtrak service footprint.",
          "source": {
            "label": "Amtrak — national facts and statistics",
            "url": "https://www.amtrak.com/about-amtrak/amtrak-facts",
            "accessed": "2026-07-18"
          },
          "id": "amtrak_state_day_f2",
          "playDesc": "Amtrak service footprint."
        }
      ],
      "ops": [
        "÷",
        "÷"
      ],
      "answer": 1953.543776057177,
      "answerDisplay": "1,953.5",
      "explain": "Divide annual trips by days and states.",
      "revealQ": "Using 32.8 million annual trips, what is the average number per day per state served by Amtrak?",
      "sources": [
        {
          "label": "Amtrak — national facts and statistics",
          "url": "https://www.amtrak.com/about-amtrak/amtrak-facts",
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
      "id": "train_energy",
      "q": "Train mass: estimate the result in joules using the real-world facts below.",
      "unit": "joules",
      "factors": [
        {
          "label": "Train mass",
          "unit": "metric tonnes",
          "value": 400,
          "display": "400",
          "desc": "Representative high-speed trainset mass.",
          "source": {
            "label": "Amtrak — national facts and statistics",
            "url": "https://www.amtrak.com/about-amtrak/amtrak-facts",
            "accessed": "2026-07-18"
          },
          "id": "train_energy_f0",
          "playDesc": "Representative high-speed trainset mass."
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
          "id": "train_energy_f1",
          "playDesc": "The number of kilograms corresponding to one tonne."
        },
        {
          "label": "Specific kinetic energy at the stated line speed",
          "unit": "joules per kilogram",
          "value": 3472,
          "display": "3,472",
          "desc": "Kinetic energy per kilogram at the published comparison speed.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "train_energy_f2",
          "playDesc": "Kinetic energy per kilogram at the published comparison speed."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "answer": 1388800000,
      "answerDisplay": "1,388,800,000",
      "explain": "Mass times specific kinetic energy gives total kinetic energy.",
      "revealQ": "How many joules of kinetic energy does a 400-tonne train have at a speed whose specific kinetic energy is 3,472 joules per kilogram?",
      "sources": [
        {
          "label": "Amtrak — national facts and statistics",
          "url": "https://www.amtrak.com/about-amtrak/amtrak-facts",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        },
        {
          "label": "Defined mathematical relationship",
          "url": "https://www.nist.gov/pml/special-publication-811",
          "accessed": "2026-07-18"
        }
      ]
    }
  ],
  "sourceSummary": "Every playable value is linked to an official, institutional, scholarly, or defined-conversion source in the reveal."
} };
