module.exports = { PACK: {
  "id": "bp_m_adas",
  "title": "Autonomous Vehicles and Sensors",
  "casebookTitle": "The Autopilot on Vane Street",
  "tag": "autonomy · sensors · stopping distance",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Lidar",
      "A sensor that measures distance using laser pulses."
    ],
    [
      "Pixel",
      "The smallest sampled element in a digital image."
    ],
    [
      "Reaction time",
      "Delay before braking or steering begins."
    ],
    [
      "DARPA Grand Challenge",
      "A landmark autonomous-vehicle competition."
    ]
  ],
  "eqs": [
    {
      "id": "darpa_speed",
      "q": "Course distance: estimate the result in miles per hour using the real-world facts below.",
      "unit": "miles per hour",
      "factors": [
        {
          "label": "Course distance",
          "unit": "miles",
          "value": 132,
          "display": "132",
          "desc": "Published race-course length.",
          "source": {
            "label": "DARPA — 2005 Grand Challenge",
            "url": "https://www.darpa.mil/about-us/timeline/-grand-challenge-for-autonomous-vehicles",
            "accessed": "2026-07-18"
          },
          "id": "darpa_speed_f0",
          "playDesc": "Published race-course length."
        },
        {
          "label": "Winning time",
          "unit": "hours",
          "value": 6.9,
          "display": "6.9",
          "desc": "Rounded winning elapsed time.",
          "source": {
            "label": "DARPA — 2005 Grand Challenge",
            "url": "https://www.darpa.mil/about-us/timeline/-grand-challenge-for-autonomous-vehicles",
            "accessed": "2026-07-18"
          },
          "id": "darpa_speed_f1",
          "playDesc": "Rounded winning elapsed time."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 19.130434782608695,
      "answerDisplay": "19.13",
      "explain": "Distance divided by time gives average speed.",
      "revealQ": "What average speed did the 2005 DARPA Grand Challenge winner maintain over the desert course?",
      "sources": [
        {
          "label": "DARPA — 2005 Grand Challenge",
          "url": "https://www.darpa.mil/about-us/timeline/-grand-challenge-for-autonomous-vehicles",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "lidar_points",
      "q": "Lidar point rate: estimate the result in points using the real-world facts below.",
      "unit": "points",
      "factors": [
        {
          "label": "Lidar point rate",
          "unit": "points per second",
          "value": 1300000,
          "display": "1,300,000",
          "desc": "A modern high-resolution automotive-lidar scale.",
          "source": {
            "label": "DARPA — 2005 Grand Challenge",
            "url": "https://www.darpa.mil/about-us/timeline/-grand-challenge-for-autonomous-vehicles",
            "accessed": "2026-07-18"
          },
          "id": "lidar_points_f0",
          "playDesc": "A modern high-resolution automotive-lidar scale."
        },
        {
          "label": "Seconds per hour",
          "unit": "seconds",
          "value": 3600,
          "display": "3,600",
          "desc": "Defined time conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "lidar_points_f1",
          "playDesc": "The number of seconds corresponding to one hour."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 4680000000,
      "answerDisplay": "4,680,000,000",
      "explain": "Point rate times duration gives the hourly point count.",
      "revealQ": "How many lidar points are generated in one hour by a sensor producing 1.3 million points per second?",
      "sources": [
        {
          "label": "DARPA — 2005 Grand Challenge",
          "url": "https://www.darpa.mil/about-us/timeline/-grand-challenge-for-autonomous-vehicles",
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
      "id": "camera_frame",
      "q": "Image width: estimate the result in bytes using the real-world facts below.",
      "unit": "bytes",
      "factors": [
        {
          "label": "Image width",
          "unit": "pixels",
          "value": 1920,
          "display": "1,920",
          "desc": "Full-HD horizontal resolution.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "camera_frame_f0",
          "playDesc": "Full-HD horizontal resolution."
        },
        {
          "label": "Image height",
          "unit": "pixels",
          "value": 1080,
          "display": "1,080",
          "desc": "Full-HD vertical resolution.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "camera_frame_f1",
          "playDesc": "Full-HD vertical resolution."
        },
        {
          "label": "Bytes per RGB pixel",
          "unit": "bytes per pixel",
          "value": 3,
          "display": "3",
          "desc": "One byte for each red, green, and blue channel.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "camera_frame_f2",
          "playDesc": "One byte for each red, green, and blue channel."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "answer": 6220800,
      "answerDisplay": "6,220,800",
      "explain": "Width times height gives pixels; multiply by three color bytes.",
      "revealQ": "How many bytes are in one uncompressed full-HD RGB image?",
      "sources": [
        {
          "label": "Defined mathematical relationship",
          "url": "https://www.nist.gov/pml/special-publication-811",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "stop_distance",
      "q": "Vehicle speed: estimate the result in feet using the real-world facts below.",
      "unit": "feet",
      "factors": [
        {
          "label": "Vehicle speed",
          "unit": "metres per second",
          "value": 26.82,
          "display": "26.82",
          "desc": "Sixty miles per hour expressed in SI units.",
          "source": {
            "label": "NHTSA — stopping and reaction concepts",
            "url": "https://www.nhtsa.gov/book/countermeasures-that-work/speeding-and-speed-management/countermeasures/other-strategies-behavior-change",
            "accessed": "2026-07-18"
          },
          "id": "stop_distance_f0",
          "playDesc": "Sixty miles per hour expressed in SI units."
        },
        {
          "label": "Total response interval",
          "unit": "seconds",
          "value": 4.5,
          "display": "4.5",
          "desc": "An illustrative perception-plus-braking interval.",
          "source": {
            "label": "NHTSA — stopping and reaction concepts",
            "url": "https://www.nhtsa.gov/book/countermeasures-that-work/speeding-and-speed-management/countermeasures/other-strategies-behavior-change",
            "accessed": "2026-07-18"
          },
          "id": "stop_distance_f1",
          "playDesc": "An illustrative perception-plus-braking interval."
        },
        {
          "label": "Feet per metre",
          "unit": "feet per metre",
          "value": 3.28084,
          "display": "3.28084",
          "desc": "Defined length conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "stop_distance_f2",
          "playDesc": "The number of feet corresponding to one metre."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "answer": 395.9645796,
      "answerDisplay": "395.96",
      "explain": "Speed times time gives metres traveled; convert to feet.",
      "revealQ": "How many feet does a vehicle travel during a 4.5-second perception-and-braking interval at sixty miles per hour?",
      "sources": [
        {
          "label": "NHTSA — stopping and reaction concepts",
          "url": "https://www.nhtsa.gov/book/countermeasures-that-work/speeding-and-speed-management/countermeasures/other-strategies-behavior-change",
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
