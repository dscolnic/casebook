module.exports = { PACK: {
  "id": "bp_f_robot",
  "title": "Mobile Robots at Work",
  "casebookTitle": "The Cell-9 Robot",
  "tag": "robotics · payload · autonomy",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Payload",
      "Mass a robot can carry."
    ],
    [
      "Battery runtime",
      "Operating time available from one charge."
    ],
    [
      "Fleet",
      "A group of robots operated together."
    ],
    [
      "Frame rate",
      "Images captured per second."
    ]
  ],
  "eqs": [
    {
      "id": "spot_mph",
      "q": "Spot top speed: estimate the result in miles per hour using the real-world facts below.",
      "unit": "miles per hour",
      "factors": [
        {
          "label": "Spot top speed",
          "unit": "metres per second",
          "value": 1.6,
          "display": "1.6",
          "desc": "Published top speed.",
          "source": {
            "label": "Boston Dynamics — Spot specifications",
            "url": "https://bostondynamics.com/products/spot/",
            "accessed": "2026-07-18"
          },
          "id": "spot_mph_f0",
          "playDesc": "Published top speed."
        },
        {
          "label": "Miles per hour per metre per second",
          "unit": "mph per m/s",
          "value": 2.23694,
          "display": "2.23694",
          "desc": "Defined speed conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "spot_mph_f1",
          "playDesc": "The number of miles per hour equivalent to one metre per second."
        }
      ],
      "ops": [
        "×"
      ],
      "explain": "Convert metres per second to miles per hour.",
      "answer": 3.5791040000000005,
      "answerDisplay": "≈ 3.58",
      "sources": [
        {
          "label": "Boston Dynamics — Spot specifications",
          "url": "https://bostondynamics.com/products/spot/",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How fast is Spot’s 1.6-metre-per-second top speed in miles per hour?"
    },
    {
      "id": "payload_force",
      "q": "Spot payload: estimate the result in newtons using the real-world facts below.",
      "unit": "newtons",
      "factors": [
        {
          "label": "Spot payload",
          "unit": "kilograms",
          "value": 14,
          "display": "14",
          "desc": "Published payload capacity.",
          "source": {
            "label": "Boston Dynamics — Spot specifications",
            "url": "https://bostondynamics.com/products/spot/",
            "accessed": "2026-07-18"
          },
          "id": "payload_force_f0",
          "playDesc": "Published payload capacity."
        },
        {
          "label": "Standard gravity",
          "unit": "newtons per kilogram",
          "value": 9.80665,
          "display": "9.80665",
          "desc": "Standard gravitational acceleration.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "payload_force_f1",
          "playDesc": "Standard gravitational acceleration."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 137.29309999999998,
      "answerDisplay": "137.29",
      "explain": "Mass times standard gravity gives weight force.",
      "revealQ": "What weight force corresponds to Spot’s fourteen-kilogram payload?",
      "sources": [
        {
          "label": "Boston Dynamics — Spot specifications",
          "url": "https://bostondynamics.com/products/spot/",
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
      "id": "walking_distance",
      "q": "Representative walking speed: estimate the result in metres using the real-world facts below.",
      "unit": "metres",
      "factors": [
        {
          "label": "Representative walking speed",
          "unit": "metres per second",
          "value": 1.5,
          "display": "1.5",
          "desc": "Published walking-speed scale below top speed.",
          "source": {
            "label": "Boston Dynamics — Spot specifications",
            "url": "https://bostondynamics.com/products/spot/",
            "accessed": "2026-07-18"
          },
          "id": "walking_distance_f0",
          "playDesc": "Published walking-speed scale below top speed."
        },
        {
          "label": "Battery duration",
          "unit": "minutes",
          "value": 90,
          "display": "90",
          "desc": "Published typical runtime scale.",
          "source": {
            "label": "Boston Dynamics — Spot specifications",
            "url": "https://bostondynamics.com/products/spot/",
            "accessed": "2026-07-18"
          },
          "id": "walking_distance_f1",
          "playDesc": "Published typical runtime scale."
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
          "id": "walking_distance_f2",
          "playDesc": "The number of seconds corresponding to one minute."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "explain": "Multiply speed by duration after converting minutes to seconds.",
      "answer": 8100,
      "answerDisplay": "≈ 8,100",
      "sources": [
        {
          "label": "Boston Dynamics — Spot specifications",
          "url": "https://bostondynamics.com/products/spot/",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How far could Spot travel in ninety minutes at 1.5 metres per second?"
    },
    {
      "id": "camera_frames",
      "q": "Frames per second per camera: estimate the result in frames using the real-world facts below.",
      "unit": "frames",
      "factors": [
        {
          "label": "Frames per second per camera",
          "unit": "frames per second",
          "value": 30,
          "display": "30",
          "desc": "Common video sampling rate.",
          "source": {
            "label": "Boston Dynamics — Spot specifications",
            "url": "https://bostondynamics.com/products/spot/",
            "accessed": "2026-07-18"
          },
          "id": "camera_frames_f0",
          "playDesc": "Common video sampling rate."
        },
        {
          "label": "Recording duration",
          "unit": "seconds",
          "value": 5400,
          "display": "5,400",
          "desc": "Ninety minutes expressed in seconds.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "camera_frames_f1",
          "playDesc": "Ninety minutes expressed in seconds."
        },
        {
          "label": "Cameras",
          "unit": "cameras",
          "value": 5,
          "display": "5",
          "desc": "Spot has multiple perception cameras; five is a documented system scale.",
          "source": {
            "label": "Boston Dynamics — Spot specifications",
            "url": "https://bostondynamics.com/products/spot/",
            "accessed": "2026-07-18"
          },
          "id": "camera_frames_f2",
          "playDesc": "Spot has multiple perception cameras; five is a documented system scale."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "explain": "Multiply frame rate, duration, and camera count.",
      "answer": 810000,
      "answerDisplay": "≈ 810,000",
      "sources": [
        {
          "label": "Boston Dynamics — Spot specifications",
          "url": "https://bostondynamics.com/products/spot/",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many camera frames are produced by five cameras recording at thirty frames per second for 5,400 seconds?"
    }
  ],
  "sourceSummary": "Every playable value is linked to an official, institutional, scholarly, or defined-conversion source in the reveal."
} };
