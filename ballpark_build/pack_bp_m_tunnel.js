module.exports = { PACK: {
  "id": "bp_m_tunnel",
  "title": "The Channel Tunnel by the Numbers",
  "casebookTitle": "The Kingsgate Bore",
  "tag": "tunnels · excavation · rail",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Bore",
      "A tunnel passage excavated through ground or rock."
    ],
    [
      "Service tunnel",
      "A smaller parallel tunnel used for maintenance and emergencies."
    ],
    [
      "Tunnel-boring machine",
      "A machine that excavates a circular tunnel face."
    ],
    [
      "Spoil",
      "Rock and soil removed during excavation."
    ]
  ],
  "eqs": [
    {
      "id": "undersea_miles",
      "q": "Undersea length: estimate the result in miles using the real-world facts below.",
      "unit": "miles",
      "factors": [
        {
          "label": "Undersea length",
          "unit": "kilometres",
          "value": 37.9,
          "display": "37.9",
          "desc": "Published undersea section length.",
          "source": {
            "label": "Getlink — Channel Tunnel key figures",
            "url": "https://www.getlinkgroup.com/uk/the-channel-tunnel/key-figures/",
            "accessed": "2026-07-18"
          },
          "id": "undersea_miles_f0",
          "playDesc": "Published undersea section length."
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
          "id": "undersea_miles_f1",
          "playDesc": "The number of miles corresponding to one kilometre."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 23.5499609,
      "answerDisplay": "23.55",
      "explain": "Convert kilometres to miles.",
      "revealQ": "How many miles of the Channel Tunnel lie under the sea?",
      "sources": [
        {
          "label": "Getlink — Channel Tunnel key figures",
          "url": "https://www.getlinkgroup.com/uk/the-channel-tunnel/key-figures/",
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
      "id": "workers_per_bore",
      "q": "Peak project workforce: estimate the result in workers per bore using the real-world facts below.",
      "unit": "workers per bore",
      "factors": [
        {
          "label": "Peak project workforce",
          "unit": "workers",
          "value": 13000,
          "display": "13,000",
          "desc": "Published peak employment scale.",
          "source": {
            "label": "Getlink — Channel Tunnel key figures",
            "url": "https://www.getlinkgroup.com/uk/the-channel-tunnel/key-figures/",
            "accessed": "2026-07-18"
          },
          "id": "workers_per_bore_f0",
          "playDesc": "Published peak employment scale."
        },
        {
          "label": "Parallel tunnels",
          "unit": "tunnels",
          "value": 3,
          "display": "3",
          "desc": "Two rail tunnels and one service tunnel.",
          "source": {
            "label": "Getlink — Channel Tunnel key figures",
            "url": "https://www.getlinkgroup.com/uk/the-channel-tunnel/key-figures/",
            "accessed": "2026-07-18"
          },
          "id": "workers_per_bore_f1",
          "playDesc": "Two rail tunnels and one service tunnel."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 4333.333333333333,
      "answerDisplay": "4,333.3",
      "explain": "Divide the workforce by the three parallel bores.",
      "revealQ": "If the project’s peak workforce were divided among three parallel tunnels, how many workers would that be per bore?",
      "sources": [
        {
          "label": "Getlink — Channel Tunnel key figures",
          "url": "https://www.getlinkgroup.com/uk/the-channel-tunnel/key-figures/",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "crossing_time",
      "q": "Total tunnel length: estimate the result in minutes using the real-world facts below.",
      "unit": "minutes",
      "factors": [
        {
          "label": "Total tunnel length",
          "unit": "kilometres",
          "value": 50.45,
          "display": "50.45",
          "desc": "Published total length.",
          "source": {
            "label": "Getlink — Channel Tunnel key figures",
            "url": "https://www.getlinkgroup.com/uk/the-channel-tunnel/key-figures/",
            "accessed": "2026-07-18"
          },
          "id": "crossing_time_f0",
          "playDesc": "Published total length."
        },
        {
          "label": "Train speed",
          "unit": "kilometres per hour",
          "value": 160,
          "display": "160",
          "desc": "Representative tunnel operating speed.",
          "source": {
            "label": "Getlink — Channel Tunnel key figures",
            "url": "https://www.getlinkgroup.com/uk/the-channel-tunnel/key-figures/",
            "accessed": "2026-07-18"
          },
          "id": "crossing_time_f1",
          "playDesc": "Representative tunnel operating speed."
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
          "id": "crossing_time_f2",
          "playDesc": "The number of minutes corresponding to one hour."
        }
      ],
      "ops": [
        "÷",
        "×"
      ],
      "answer": 18.91875,
      "answerDisplay": "18.92",
      "explain": "Distance divided by speed gives hours; convert to minutes.",
      "revealQ": "How many minutes would a train take to cover the entire tunnel at 160 kilometres per hour?",
      "sources": [
        {
          "label": "Getlink — Channel Tunnel key figures",
          "url": "https://www.getlinkgroup.com/uk/the-channel-tunnel/key-figures/",
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
      "id": "spoil_per_day",
      "q": "Excavated spoil: estimate the result in cubic metres per day using the real-world facts below.",
      "unit": "cubic metres per day",
      "factors": [
        {
          "label": "Excavated spoil",
          "unit": "cubic metres",
          "value": 8000000,
          "display": "8,000,000",
          "desc": "Published project excavation scale.",
          "source": {
            "label": "Getlink — Channel Tunnel key figures",
            "url": "https://www.getlinkgroup.com/uk/the-channel-tunnel/key-figures/",
            "accessed": "2026-07-18"
          },
          "id": "spoil_per_day_f0",
          "playDesc": "Published project excavation scale."
        },
        {
          "label": "Construction duration",
          "unit": "years",
          "value": 7,
          "display": "7",
          "desc": "Approximate main construction period.",
          "source": {
            "label": "Getlink — Channel Tunnel key figures",
            "url": "https://www.getlinkgroup.com/uk/the-channel-tunnel/key-figures/",
            "accessed": "2026-07-18"
          },
          "id": "spoil_per_day_f1",
          "playDesc": "Approximate main construction period."
        },
        {
          "label": "Days per year",
          "unit": "days per year",
          "value": 365,
          "display": "365",
          "desc": "Calendar conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "spoil_per_day_f2",
          "playDesc": "The number of days corresponding to one year."
        }
      ],
      "ops": [
        "÷",
        "÷"
      ],
      "answer": 3131.1154598825833,
      "answerDisplay": "3,131.1",
      "explain": "Divide total spoil by years and days.",
      "revealQ": "What average daily excavation corresponds to eight million cubic metres over seven years?",
      "sources": [
        {
          "label": "Getlink — Channel Tunnel key figures",
          "url": "https://www.getlinkgroup.com/uk/the-channel-tunnel/key-figures/",
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
