module.exports = { PACK: {
  "id": "bp_m_railx",
  "title": "High-Capacity Railway Signalling",
  "casebookTitle": "The Marsh Lane Crossing",
  "tag": "rail signalling · headways · capacity",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Headway",
      "Time between successive trains."
    ],
    [
      "Train path",
      "A scheduled slot for one train through the railway."
    ],
    [
      "Interlocking",
      "A system preventing conflicting train movements."
    ],
    [
      "Throughput",
      "The number of trains or passengers handled per unit time."
    ]
  ],
  "eqs": [
    {
      "id": "trains_per_day",
      "q": "Peak trains per hour: estimate the result in trains using the real-world facts below.",
      "unit": "trains",
      "factors": [
        {
          "label": "Peak trains per hour",
          "unit": "trains per hour",
          "value": 24,
          "display": "24",
          "desc": "Published central-section peak service frequency.",
          "source": {
            "label": "Crossrail Learning Legacy — Elizabeth line facts",
            "url": "https://learninglegacy.crossrail.co.uk/documents/making-innovation-happen-megaproject-londons-crossrail-suburban-railway-system/",
            "accessed": "2026-07-18"
          },
          "id": "trains_per_day_f0",
          "playDesc": "Published central-section peak service frequency."
        },
        {
          "label": "Daily operating span",
          "unit": "hours",
          "value": 18.5,
          "display": "18.5",
          "desc": "Approximate first-to-last-train service span.",
          "source": {
            "label": "Crossrail Learning Legacy — Elizabeth line facts",
            "url": "https://learninglegacy.crossrail.co.uk/documents/making-innovation-happen-megaproject-londons-crossrail-suburban-railway-system/",
            "accessed": "2026-07-18"
          },
          "id": "trains_per_day_f1",
          "playDesc": "Approximate first-to-last-train service span."
        }
      ],
      "ops": [
        "×"
      ],
      "explain": "Multiply trains per hour by the operating span.",
      "answer": 444,
      "answerDisplay": "≈ 444",
      "sources": [
        {
          "label": "Crossrail Learning Legacy — Elizabeth line facts",
          "url": "https://learninglegacy.crossrail.co.uk/documents/making-innovation-happen-megaproject-londons-crossrail-suburban-railway-system/",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many trains could pass one direction in a long operating day at the Elizabeth line’s central-section peak frequency?"
    },
    {
      "id": "passengers_per_car",
      "q": "Passengers per train: estimate the result in passengers per car using the real-world facts below.",
      "unit": "passengers per car",
      "factors": [
        {
          "label": "Passengers per train",
          "unit": "passengers per train",
          "value": 1500,
          "display": "1,500",
          "desc": "Published design capacity for a full train.",
          "source": {
            "label": "Crossrail Learning Legacy — Elizabeth line facts",
            "url": "https://learninglegacy.crossrail.co.uk/documents/making-innovation-happen-megaproject-londons-crossrail-suburban-railway-system/",
            "accessed": "2026-07-18"
          },
          "id": "passengers_per_car_f0",
          "playDesc": "Published design capacity for a full train."
        },
        {
          "label": "Cars per train",
          "unit": "cars",
          "value": 9,
          "display": "9",
          "desc": "The Elizabeth line train formation.",
          "source": {
            "label": "Crossrail Learning Legacy — Elizabeth line facts",
            "url": "https://learninglegacy.crossrail.co.uk/documents/making-innovation-happen-megaproject-londons-crossrail-suburban-railway-system/",
            "accessed": "2026-07-18"
          },
          "id": "passengers_per_car_f1",
          "playDesc": "The Elizabeth line train formation."
        }
      ],
      "ops": [
        "÷"
      ],
      "explain": "Divide train capacity by the number of cars.",
      "answer": 166.66666666666666,
      "answerDisplay": "≈ 166.7",
      "sources": [
        {
          "label": "Crossrail Learning Legacy — Elizabeth line facts",
          "url": "https://learninglegacy.crossrail.co.uk/documents/making-innovation-happen-megaproject-londons-crossrail-suburban-railway-system/",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "About how many passengers correspond to each car in a nine-car Elizabeth line train at design capacity?"
    },
    {
      "id": "average_station_spacing",
      "q": "Elizabeth line route length: estimate the result in metres per station using the real-world facts below.",
      "unit": "metres per station",
      "factors": [
        {
          "label": "Elizabeth line route length",
          "unit": "kilometres",
          "value": 118,
          "display": "118",
          "desc": "Published route length.",
          "source": {
            "label": "Crossrail Learning Legacy — Elizabeth line facts",
            "url": "https://learninglegacy.crossrail.co.uk/documents/making-innovation-happen-megaproject-londons-crossrail-suburban-railway-system/",
            "accessed": "2026-07-18"
          },
          "id": "average_station_spacing_f0",
          "playDesc": "Published route length."
        },
        {
          "label": "Metres per kilometre",
          "unit": "metres per kilometre",
          "value": 1000,
          "display": "1,000",
          "desc": "Defined metric conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "average_station_spacing_f1",
          "playDesc": "The number of metres corresponding to one kilometre."
        },
        {
          "label": "Stations served",
          "unit": "stations",
          "value": 40,
          "display": "40",
          "desc": "Published station count.",
          "source": {
            "label": "Crossrail Learning Legacy — Elizabeth line facts",
            "url": "https://learninglegacy.crossrail.co.uk/documents/making-innovation-happen-megaproject-londons-crossrail-suburban-railway-system/",
            "accessed": "2026-07-18"
          },
          "id": "average_station_spacing_f2",
          "playDesc": "Published station count."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "explain": "Convert the route length to metres and divide by the station count.",
      "answer": 2950,
      "answerDisplay": "≈ 2,950",
      "sources": [
        {
          "label": "Crossrail Learning Legacy — Elizabeth line facts",
          "url": "https://learninglegacy.crossrail.co.uk/documents/making-innovation-happen-megaproject-londons-crossrail-suburban-railway-system/",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "What is the average spacing in metres across a 118-kilometre railway serving forty stations?"
    },
    {
      "id": "central_headway",
      "q": "Seconds per hour: estimate the result in minutes between trains using the real-world facts below.",
      "unit": "minutes between trains",
      "factors": [
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
          "id": "central_headway_f0",
          "playDesc": "The number of seconds corresponding to one hour."
        },
        {
          "label": "Maximum trains per hour",
          "unit": "trains per hour",
          "value": 32,
          "display": "32",
          "desc": "Design capability cited for future central-section service.",
          "source": {
            "label": "Crossrail Learning Legacy — Elizabeth line facts",
            "url": "https://learninglegacy.crossrail.co.uk/documents/making-innovation-happen-megaproject-londons-crossrail-suburban-railway-system/",
            "accessed": "2026-07-18"
          },
          "id": "central_headway_f1",
          "playDesc": "Design capability cited for future central-section service."
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
          "id": "central_headway_f2",
          "playDesc": "The number of seconds corresponding to one minute."
        }
      ],
      "ops": [
        "÷",
        "÷"
      ],
      "explain": "Divide an hour by trains per hour, then convert seconds to minutes.",
      "answer": 1.875,
      "answerDisplay": "≈ 1.88",
      "sources": [
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        },
        {
          "label": "Crossrail Learning Legacy — Elizabeth line facts",
          "url": "https://learninglegacy.crossrail.co.uk/documents/making-innovation-happen-megaproject-londons-crossrail-suburban-railway-system/",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "What is the headway in minutes at thirty-two trains per hour?"
    }
  ],
  "sourceSummary": "Every playable value is linked to an official, institutional, scholarly, or defined-conversion source in the reveal."
} };
