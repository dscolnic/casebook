module.exports = { PACK: {
  "id": "bp_dam",
  "title": "Hoover Dam and Lake Mead",
  "casebookTitle": "The Marrow Valley Dam",
  "tag": "dams · reservoirs · hydropower",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Acre-foot",
      "The volume covering one acre to a depth of one foot."
    ],
    [
      "Nameplate capacity",
      "Maximum rated electrical output."
    ],
    [
      "Spillway",
      "A structure that safely releases excess reservoir water."
    ],
    [
      "Hydraulic head",
      "The vertical water height available to create pressure or power."
    ]
  ],
  "eqs": [
    {
      "id": "lake_mead_volume",
      "q": "Lake Mead maximum capacity: estimate the result in cubic metres using the real-world facts below.",
      "unit": "cubic metres",
      "factors": [
        {
          "label": "Lake Mead maximum capacity",
          "unit": "acre-feet",
          "value": 32000000,
          "display": "32,000,000",
          "desc": "Bureau of Reclamation historic capacity figure.",
          "source": {
            "label": "U.S. Bureau of Reclamation — Hoover Dam facts",
            "url": "https://www.usbr.gov/lc/hooverdam/faqs/damfaqs.html",
            "accessed": "2026-07-18"
          },
          "id": "lake_mead_volume_f0",
          "playDesc": "Bureau of Reclamation historic capacity figure."
        },
        {
          "label": "Cubic metres per acre-foot",
          "unit": "cubic metres per acre-foot",
          "value": 1233.48,
          "display": "1233.48",
          "desc": "Defined volume conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "lake_mead_volume_f1",
          "playDesc": "The number of cubic metres corresponding to one acre-foot."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 39471360000,
      "answerDisplay": "39,471,360,000",
      "explain": "Convert acre-feet to cubic metres.",
      "revealQ": "How many cubic metres correspond to Lake Mead’s historic maximum storage capacity?",
      "sources": [
        {
          "label": "U.S. Bureau of Reclamation — Hoover Dam facts",
          "url": "https://www.usbr.gov/lc/hooverdam/faqs/damfaqs.html",
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
      "id": "hoover_concrete",
      "q": "Concrete volume: estimate the result in cubic metres using the real-world facts below.",
      "unit": "cubic metres",
      "factors": [
        {
          "label": "Concrete volume",
          "unit": "cubic yards",
          "value": 4360000,
          "display": "4,360,000",
          "desc": "Bureau of Reclamation figure for dam, plant, and appurtenant works.",
          "source": {
            "label": "U.S. Bureau of Reclamation — Hoover Dam facts",
            "url": "https://www.usbr.gov/lc/hooverdam/faqs/damfaqs.html",
            "accessed": "2026-07-18"
          },
          "id": "hoover_concrete_f0",
          "playDesc": "Bureau of Reclamation figure for dam, plant, and appurtenant works."
        },
        {
          "label": "Cubic metres per cubic yard",
          "unit": "cubic metres per cubic yard",
          "value": 0.764555,
          "display": "0.764555",
          "desc": "Defined volume conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "hoover_concrete_f1",
          "playDesc": "The number of cubic metres corresponding to one cubic yard."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 3333459.8,
      "answerDisplay": "3,333,460",
      "explain": "Convert cubic yards to cubic metres.",
      "revealQ": "How many cubic metres of concrete are represented by Hoover Dam’s total 4.36 million cubic yards?",
      "sources": [
        {
          "label": "U.S. Bureau of Reclamation — Hoover Dam facts",
          "url": "https://www.usbr.gov/lc/hooverdam/faqs/damfaqs.html",
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
      "id": "daily_power",
      "q": "Nameplate power: estimate the result in kilowatt-hours using the real-world facts below.",
      "unit": "kilowatt-hours",
      "factors": [
        {
          "label": "Nameplate power",
          "unit": "megawatts",
          "value": 2080,
          "display": "2,080",
          "desc": "Bureau of Reclamation nameplate capacity.",
          "source": {
            "label": "U.S. Bureau of Reclamation — Hoover powerplant",
            "url": "https://www.usbr.gov/lc/hooverdam/faqs/powerfaq.html",
            "accessed": "2026-07-18"
          },
          "id": "daily_power_f0",
          "playDesc": "Bureau of Reclamation nameplate capacity."
        },
        {
          "label": "Hours per day",
          "unit": "hours",
          "value": 24,
          "display": "24",
          "desc": "Defined time conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "daily_power_f1",
          "playDesc": "The number of hours corresponding to one day."
        },
        {
          "label": "Kilowatts per megawatt",
          "unit": "kilowatts per megawatt",
          "value": 1000,
          "display": "1,000",
          "desc": "Defined power conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "daily_power_f2",
          "playDesc": "The number of kilowatts corresponding to one megawatt."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "answer": 49920000,
      "answerDisplay": "49,920,000",
      "explain": "Power multiplied by time gives energy; convert megawatts to kilowatts.",
      "revealQ": "How many kilowatt-hours could Hoover Powerplant produce in one day at full nameplate output?",
      "sources": [
        {
          "label": "U.S. Bureau of Reclamation — Hoover powerplant",
          "url": "https://www.usbr.gov/lc/hooverdam/faqs/powerfaq.html",
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
      "id": "dam_height",
      "q": "Hoover Dam height: estimate the result in centimetres using the real-world facts below.",
      "unit": "centimetres",
      "factors": [
        {
          "label": "Hoover Dam height",
          "unit": "feet",
          "value": 726,
          "display": "726",
          "desc": "Published dam height.",
          "source": {
            "label": "U.S. Bureau of Reclamation — Hoover Dam facts",
            "url": "https://www.usbr.gov/lc/hooverdam/faqs/damfaqs.html",
            "accessed": "2026-07-18"
          },
          "id": "dam_height_f0",
          "playDesc": "Published dam height."
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
          "id": "dam_height_f1",
          "playDesc": "The number of metres corresponding to one foot."
        },
        {
          "label": "Centimetres per metre",
          "unit": "centimetres per metre",
          "value": 100,
          "display": "100",
          "desc": "Defined metric conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "dam_height_f2",
          "playDesc": "The conversion factor from one metre to centimetres."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "answer": 22128.480000000003,
      "answerDisplay": "22,128.5",
      "explain": "Convert feet to metres and then centimetres.",
      "revealQ": "How many centimetres tall is Hoover Dam’s 726-foot structural height?",
      "sources": [
        {
          "label": "U.S. Bureau of Reclamation — Hoover Dam facts",
          "url": "https://www.usbr.gov/lc/hooverdam/faqs/damfaqs.html",
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
