module.exports = { PACK: {
  "id": "bp_rocket",
  "title": "Saturn V and Apollo 11",
  "casebookTitle": "Meridian-1",
  "tag": "rockets · thrust · lunar travel",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Thrust",
      "Force produced by expelling propellant."
    ],
    [
      "Stage",
      "A rocket section discarded after its fuel is used."
    ],
    [
      "Translunar trajectory",
      "A path from Earth toward the Moon."
    ],
    [
      "Propellant flow",
      "Mass of fuel and oxidizer consumed per unit time."
    ]
  ],
  "eqs": [
    {
      "id": "saturn_height",
      "q": "Saturn V height: estimate the result in metres using the real-world facts below.",
      "unit": "metres",
      "factors": [
        {
          "label": "Saturn V height",
          "unit": "feet",
          "value": 363,
          "display": "363",
          "desc": "NASA’s published rocket height.",
          "source": {
            "label": "NASA — Saturn V facts",
            "url": "https://www.nasa.gov/learning-resources/for-kids-and-students/what-was-the-saturn-v-grades-5-8/",
            "accessed": "2026-07-18"
          },
          "id": "saturn_height_f0",
          "playDesc": "NASA’s published rocket height."
        },
        {
          "label": "Metres per foot",
          "unit": "metres per foot",
          "value": 0.3048,
          "display": "0.3048",
          "desc": "Defined length conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "saturn_height_f1",
          "playDesc": "The number of metres corresponding to one foot."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 110.64240000000001,
      "answerDisplay": "110.64",
      "explain": "Convert feet to metres.",
      "revealQ": "How tall was the 363-foot Saturn V in metres?",
      "sources": [
        {
          "label": "NASA — Saturn V facts",
          "url": "https://www.nasa.gov/learning-resources/for-kids-and-students/what-was-the-saturn-v-grades-5-8/",
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
      "id": "saturn_thrust",
      "q": "Saturn V liftoff thrust: estimate the result in newtons using the real-world facts below.",
      "unit": "newtons",
      "factors": [
        {
          "label": "Saturn V liftoff thrust",
          "unit": "pounds-force",
          "value": 7700000,
          "display": "7,700,000",
          "desc": "NASA’s cited first-stage thrust.",
          "source": {
            "label": "NASA — Saturn V facts",
            "url": "https://www.nasa.gov/learning-resources/for-kids-and-students/what-was-the-saturn-v-grades-5-8/",
            "accessed": "2026-07-18"
          },
          "id": "saturn_thrust_f0",
          "playDesc": "NASA’s cited first-stage thrust."
        },
        {
          "label": "Newtons per pound-force",
          "unit": "newtons per pound-force",
          "value": 4.44822,
          "display": "4.44822",
          "desc": "Defined force conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "saturn_thrust_f1",
          "playDesc": "The conversion factor from one pound-force to newtons."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 34251294,
      "answerDisplay": "34,251,294",
      "explain": "Convert pounds-force to newtons.",
      "revealQ": "How many newtons correspond to 7.7 million pounds-force of liftoff thrust?",
      "sources": [
        {
          "label": "NASA — Saturn V facts",
          "url": "https://www.nasa.gov/learning-resources/for-kids-and-students/what-was-the-saturn-v-grades-5-8/",
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
      "id": "propellant_rate",
      "q": "First-stage propellant: estimate the result in tonnes per second using the real-world facts below.",
      "unit": "tonnes per second",
      "factors": [
        {
          "label": "First-stage propellant",
          "unit": "kilograms",
          "value": 2100000,
          "display": "2,100,000",
          "desc": "Approximate first-stage propellant mass.",
          "source": {
            "label": "NASA — Saturn V facts",
            "url": "https://www.nasa.gov/learning-resources/for-kids-and-students/what-was-the-saturn-v-grades-5-8/",
            "accessed": "2026-07-18"
          },
          "id": "propellant_rate_f0",
          "playDesc": "Approximate first-stage propellant mass."
        },
        {
          "label": "First-stage burn time",
          "unit": "seconds",
          "value": 150,
          "display": "150",
          "desc": "Approximate burn duration.",
          "source": {
            "label": "NASA — Saturn V facts",
            "url": "https://www.nasa.gov/learning-resources/for-kids-and-students/what-was-the-saturn-v-grades-5-8/",
            "accessed": "2026-07-18"
          },
          "id": "propellant_rate_f1",
          "playDesc": "Approximate burn duration."
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
          "id": "propellant_rate_f2",
          "playDesc": "The number of kilograms corresponding to one tonne."
        }
      ],
      "ops": [
        "÷",
        "÷"
      ],
      "answer": 14,
      "answerDisplay": "14",
      "explain": "Divide mass by burn time and convert kilograms to tonnes.",
      "revealQ": "If the first stage consumed 2.1 million kilograms in 150 seconds, how many tonnes per second is that?",
      "sources": [
        {
          "label": "NASA — Saturn V facts",
          "url": "https://www.nasa.gov/learning-resources/for-kids-and-students/what-was-the-saturn-v-grades-5-8/",
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
      "id": "moon_speed",
      "q": "Mean Earth–Moon distance: estimate the result in kilometres per hour using the real-world facts below.",
      "unit": "kilometres per hour",
      "factors": [
        {
          "label": "Mean Earth–Moon distance",
          "unit": "kilometres",
          "value": 384400,
          "display": "384,400",
          "desc": "Standard mean distance.",
          "source": {
            "label": "NASA — Apollo 11 mission overview",
            "url": "https://www.nasa.gov/history/apollo-11-mission-overview/",
            "accessed": "2026-07-18"
          },
          "id": "moon_speed_f0",
          "playDesc": "The mean earth–moon distance documented or defined by NASA — Apollo 11 mission overview."
        },
        {
          "label": "Travel time",
          "unit": "days",
          "value": 3,
          "display": "3",
          "desc": "Apollo-scale travel time.",
          "source": {
            "label": "NASA — Apollo 11 mission overview",
            "url": "https://www.nasa.gov/history/apollo-11-mission-overview/",
            "accessed": "2026-07-18"
          },
          "id": "moon_speed_f1",
          "playDesc": "Apollo-scale travel time."
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
          "id": "moon_speed_f2",
          "playDesc": "The number of hours corresponding to one day."
        }
      ],
      "ops": [
        "÷",
        "÷"
      ],
      "answer": 5338.888888888889,
      "answerDisplay": "5,338.9",
      "explain": "Divide distance by days and hours per day.",
      "revealQ": "What average speed corresponds to crossing the mean Earth–Moon distance in three days?",
      "sources": [
        {
          "label": "NASA — Apollo 11 mission overview",
          "url": "https://www.nasa.gov/history/apollo-11-mission-overview/",
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
