module.exports = { PACK: {
  "id": "bp_e_avalanche",
  "title": "Avalanches: Speed, Rescue, and Scale",
  "casebookTitle": "The Whitewall Slide",
  "tag": "snow · avalanches · rescue",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Slab avalanche",
      "A cohesive layer of snow that breaks loose above a weaker layer."
    ],
    [
      "Transceiver",
      "A rescue beacon carried by backcountry travelers."
    ],
    [
      "Burial time",
      "Time spent trapped beneath avalanche debris."
    ],
    [
      "Short ton",
      "A U.S. mass unit equal to 2,000 pounds."
    ]
  ],
  "eqs": [
    {
      "id": "max_mass",
      "q": "Large-avalanche mass: estimate the result in kilograms using the real-world facts below.",
      "unit": "kilograms",
      "factors": [
        {
          "label": "Large-avalanche mass",
          "unit": "short tons",
          "value": 1000000,
          "display": "1,000,000",
          "desc": "The National Weather Service notes that an avalanche may reach this mass.",
          "source": {
            "label": "National Weather Service — avalanche facts",
            "url": "https://www.weather.gov/safety/winter-snow",
            "accessed": "2026-07-18"
          },
          "id": "max_mass_f0",
          "playDesc": "The National Weather Service notes that an avalanche may reach this mass."
        },
        {
          "label": "Kilograms per short ton",
          "unit": "kilograms per short ton",
          "value": 907.185,
          "display": "907.185",
          "desc": "Defined mass conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "max_mass_f1",
          "playDesc": "The number of kilograms corresponding to one short ton."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 907185000,
      "answerDisplay": "907,185,000",
      "explain": "Convert the cited short-ton scale into kilograms.",
      "revealQ": "How many kilograms is the million-ton avalanche scale cited by the National Weather Service?",
      "sources": [
        {
          "label": "National Weather Service — avalanche facts",
          "url": "https://www.weather.gov/safety/winter-snow",
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
      "id": "party_triggered",
      "q": "Average avalanche deaths per season: estimate the result in people using the real-world facts below.",
      "unit": "people",
      "factors": [
        {
          "label": "Average avalanche deaths per season",
          "unit": "people",
          "value": 30,
          "display": "30",
          "desc": "National Weather Service average for North America.",
          "source": {
            "label": "National Weather Service — avalanche safety",
            "url": "https://www.weather.gov/wrn/avalanche-infographics",
            "accessed": "2026-07-18"
          },
          "id": "party_triggered_f0",
          "playDesc": "National Weather Service average for North America."
        },
        {
          "label": "Share triggered by the victim’s party",
          "unit": "fraction",
          "value": 0.9,
          "display": "0.9",
          "desc": "National Weather Service estimate for fatal avalanches.",
          "source": {
            "label": "National Weather Service — avalanche safety",
            "url": "https://www.weather.gov/wrn/avalanche-infographics",
            "accessed": "2026-07-18"
          },
          "id": "party_triggered_f1",
          "playDesc": "National Weather Service estimate for fatal avalanches."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 27,
      "answerDisplay": "27",
      "explain": "Multiply the annual fatality count by the documented share triggered by the party.",
      "revealQ": "Out of an average North American season’s avalanche fatalities, about how many involve a slide triggered by the victim’s party?",
      "sources": [
        {
          "label": "National Weather Service — avalanche safety",
          "url": "https://www.weather.gov/wrn/avalanche-infographics",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "one_mile_time",
      "q": "Distance: estimate the result in seconds using the real-world facts below.",
      "unit": "seconds",
      "factors": [
        {
          "label": "Distance",
          "unit": "miles",
          "value": 1,
          "display": "1",
          "desc": "The comparison distance.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "one_mile_time_f0",
          "playDesc": "The one-mile distance used to compare travel time at the cited maximum avalanche speed."
        },
        {
          "label": "Maximum cited avalanche speed",
          "unit": "miles per hour",
          "value": 200,
          "display": "200",
          "desc": "The upper speed cited by the National Weather Service.",
          "source": {
            "label": "National Weather Service — avalanche facts",
            "url": "https://www.weather.gov/safety/winter-snow",
            "accessed": "2026-07-18"
          },
          "id": "one_mile_time_f1",
          "playDesc": "The upper speed cited by the National Weather Service."
        },
        {
          "label": "Seconds per hour",
          "unit": "seconds per hour",
          "value": 3600,
          "display": "3,600",
          "desc": "Defined time conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "one_mile_time_f2",
          "playDesc": "The number of seconds corresponding to one hour."
        }
      ],
      "ops": [
        "÷",
        "×"
      ],
      "answer": 18,
      "answerDisplay": "18",
      "explain": "Distance divided by miles per hour gives hours; convert hours to seconds.",
      "revealQ": "How many seconds would an avalanche moving at the National Weather Service’s maximum cited speed take to travel one mile?",
      "sources": [
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        },
        {
          "label": "National Weather Service — avalanche facts",
          "url": "https://www.weather.gov/safety/winter-snow",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "beacon_cycles",
      "q": "Avalanche beacon frequency: estimate the result in cycles using the real-world facts below.",
      "unit": "cycles",
      "factors": [
        {
          "label": "Avalanche beacon frequency",
          "unit": "cycles per second",
          "value": 457000,
          "display": "457,000",
          "desc": "The standardized transceiver frequency used for rescue.",
          "source": {
            "label": "Avalanche.org — companion rescue",
            "url": "https://avalanche.org/avalanche-encyclopedia/human/companion-rescue/",
            "accessed": "2026-07-18"
          },
          "id": "beacon_cycles_f0",
          "playDesc": "The standardized transceiver frequency used for rescue."
        },
        {
          "label": "Critical rescue window",
          "unit": "minutes",
          "value": 15,
          "display": "15",
          "desc": "Avalanche.org emphasizes that most buried victims have less than this time before asphyxiation.",
          "source": {
            "label": "Avalanche.org — companion rescue",
            "url": "https://avalanche.org/avalanche-encyclopedia/human/companion-rescue/",
            "accessed": "2026-07-18"
          },
          "id": "beacon_cycles_f1",
          "playDesc": "Avalanche.org emphasizes that most buried victims have less than this time before asphyxiation."
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
          "id": "beacon_cycles_f2",
          "playDesc": "The number of seconds corresponding to one minute."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "answer": 411300000,
      "answerDisplay": "411,300,000",
      "explain": "Frequency times seconds gives the number of transmitted cycles.",
      "revealQ": "How many radio cycles occur during the critical companion-rescue window at the international avalanche-beacon frequency?",
      "sources": [
        {
          "label": "Avalanche.org — companion rescue",
          "url": "https://avalanche.org/avalanche-encyclopedia/human/companion-rescue/",
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
