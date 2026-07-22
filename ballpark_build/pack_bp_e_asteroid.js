module.exports = { PACK: {
  "id": "bp_e_asteroid",
  "title": "Asteroids and Planetary Defense",
  "casebookTitle": "The Hollow Vale Impact",
  "tag": "asteroids · impacts · planetary defense",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Kilotonne of TNT",
      "An energy comparison unit used for explosions and impacts."
    ],
    [
      "Momentum",
      "Mass multiplied by velocity."
    ],
    [
      "Near-Earth asteroid",
      "An asteroid whose orbit brings it near Earth."
    ],
    [
      "Close approach",
      "The minimum distance between two passing objects."
    ]
  ],
  "eqs": [
    {
      "id": "chely_energy",
      "q": "Chelyabinsk energy: estimate the result in joules using the real-world facts below.",
      "unit": "joules",
      "factors": [
        {
          "label": "Chelyabinsk energy",
          "unit": "kilotonnes of TNT",
          "value": 440,
          "display": "440",
          "desc": "NASA/JPL’s approximate energy estimate for the 2013 fireball.",
          "source": {
            "label": "NASA/JPL — Chelyabinsk fireball facts",
            "url": "https://www.jpl.nasa.gov/news/additional-details-on-the-large-feb-15-fireball-over-russia/",
            "accessed": "2026-07-18"
          },
          "id": "chely_energy_f0",
          "playDesc": "NASA/JPL’s approximate energy estimate for the 2013 fireball."
        },
        {
          "label": "Joules per kilotonne of TNT",
          "unit": "joules per kilotonne",
          "value": 4184000000000,
          "display": "4,184,000,000,000",
          "desc": "Defined energy conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "chely_energy_f1",
          "playDesc": "The energy in joules equivalent to one kilotonne of tnt."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 1840960000000000,
      "answerDisplay": "1,840,960,000,000,000",
      "explain": "Convert NASA’s kilotonne estimate into joules.",
      "revealQ": "About how many joules of energy did the 2013 Chelyabinsk airburst release?",
      "sources": [
        {
          "label": "NASA/JPL — Chelyabinsk fireball facts",
          "url": "https://www.jpl.nasa.gov/news/additional-details-on-the-large-feb-15-fireball-over-russia/",
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
      "id": "apophis_circumference",
      "q": "Mean diameter of Apophis: estimate the result in metres using the real-world facts below.",
      "unit": "metres",
      "factors": [
        {
          "label": "Mean diameter of Apophis",
          "unit": "metres",
          "value": 340,
          "display": "340",
          "desc": "NASA’s reported mean diameter.",
          "source": {
            "label": "NASA — Apophis facts",
            "url": "https://science.nasa.gov/solar-system/asteroids/apophis-facts/",
            "accessed": "2026-07-18"
          },
          "id": "apophis_circumference_f0",
          "playDesc": "NASA’s reported mean diameter."
        },
        {
          "label": "Pi",
          "unit": "circumferences per diameter",
          "value": 3.141592653589793,
          "display": "3.1416",
          "desc": "The mathematical ratio of circumference to diameter.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "apophis_circumference_f1",
          "playDesc": "The mathematical ratio of circumference to diameter."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 1068.1415022205297,
      "answerDisplay": "1,068.1",
      "explain": "Circumference is diameter multiplied by pi.",
      "revealQ": "About how far is it around asteroid Apophis if it were treated as a circle with its mean diameter?",
      "sources": [
        {
          "label": "NASA — Apophis facts",
          "url": "https://science.nasa.gov/solar-system/asteroids/apophis-facts/",
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
      "id": "close_time",
      "q": "Apophis 2029 surface distance: estimate the result in minutes using the real-world facts below.",
      "unit": "minutes",
      "factors": [
        {
          "label": "Apophis 2029 surface distance",
          "unit": "kilometres",
          "value": 32000,
          "display": "32,000",
          "desc": "NASA’s approximate closest distance from Earth’s surface.",
          "source": {
            "label": "NASA — Apophis facts",
            "url": "https://science.nasa.gov/solar-system/asteroids/apophis-facts/",
            "accessed": "2026-07-18"
          },
          "id": "close_time_f0",
          "playDesc": "NASA’s approximate closest distance from Earth’s surface."
        },
        {
          "label": "Chelyabinsk entry speed",
          "unit": "kilometres per second",
          "value": 18.6,
          "display": "18.6",
          "desc": "NASA/JPL’s estimated atmospheric-entry speed.",
          "source": {
            "label": "NASA/JPL — Chelyabinsk fireball facts",
            "url": "https://www.jpl.nasa.gov/news/additional-details-on-the-large-feb-15-fireball-over-russia/",
            "accessed": "2026-07-18"
          },
          "id": "close_time_f1",
          "playDesc": "NASA/JPL’s estimated atmospheric-entry speed."
        },
        {
          "label": "Seconds per minute",
          "unit": "seconds per minute",
          "value": 60,
          "display": "60",
          "desc": "Defined time conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "close_time_f2",
          "playDesc": "The number of seconds corresponding to one minute."
        }
      ],
      "ops": [
        "÷",
        "÷"
      ],
      "answer": 28.673835125448026,
      "answerDisplay": "28.67",
      "explain": "Distance divided by speed gives seconds; divide again to express minutes.",
      "revealQ": "At Chelyabinsk’s entry speed, how many minutes would it take to cross Apophis’s 2029 closest-approach distance?",
      "sources": [
        {
          "label": "NASA — Apophis facts",
          "url": "https://science.nasa.gov/solar-system/asteroids/apophis-facts/",
          "accessed": "2026-07-18"
        },
        {
          "label": "NASA/JPL — Chelyabinsk fireball facts",
          "url": "https://www.jpl.nasa.gov/news/additional-details-on-the-large-feb-15-fireball-over-russia/",
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
      "id": "dart_momentum",
      "q": "DART spacecraft mass at impact: estimate the result in kilogram-metres per second using the real-world facts below.",
      "unit": "kilogram-metres per second",
      "factors": [
        {
          "label": "DART spacecraft mass at impact",
          "unit": "kilograms",
          "value": 610,
          "display": "610",
          "desc": "NASA’s approximate spacecraft mass at impact.",
          "source": {
            "label": "NASA — DART mission facts",
            "url": "https://science.nasa.gov/planetary-defense-dart/",
            "accessed": "2026-07-18"
          },
          "id": "dart_momentum_f0",
          "playDesc": "NASA’s approximate spacecraft mass at impact."
        },
        {
          "label": "DART impact speed",
          "unit": "kilometres per second",
          "value": 6.6,
          "display": "6.6",
          "desc": "NASA’s approximate impact speed.",
          "source": {
            "label": "NASA — DART mission facts",
            "url": "https://science.nasa.gov/planetary-defense-dart/",
            "accessed": "2026-07-18"
          },
          "id": "dart_momentum_f1",
          "playDesc": "NASA’s approximate impact speed."
        },
        {
          "label": "Metres per kilometre",
          "unit": "metres per kilometre",
          "value": 1000,
          "display": "1,000",
          "desc": "Defined length conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "dart_momentum_f2",
          "playDesc": "The number of metres corresponding to one kilometre."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "answer": 4026000,
      "answerDisplay": "4,026,000",
      "explain": "Momentum is mass times speed, after converting kilometres per second to metres per second.",
      "revealQ": "About how much momentum did the DART spacecraft carry at impact?",
      "sources": [
        {
          "label": "NASA — DART mission facts",
          "url": "https://science.nasa.gov/planetary-defense-dart/",
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
