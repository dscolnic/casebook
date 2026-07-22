module.exports = { PACK: {
  "id": "bp_software",
  "title": "Software Failures and Computer Limits",
  "casebookTitle": "Fatal Exception",
  "tag": "software safety · overflow · timing",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Integer overflow",
      "A calculation exceeding the range a number type can store."
    ],
    [
      "Race condition",
      "A result depending on the timing of concurrent actions."
    ],
    [
      "Exception",
      "A software-detected error condition."
    ],
    [
      "Safety-critical software",
      "Software whose failure can harm people or equipment."
    ]
  ],
  "eqs": [
    {
      "id": "ariane_cost",
      "q": "Estimated mission loss: estimate the result in dollars per second using the real-world facts below.",
      "unit": "dollars per second",
      "factors": [
        {
          "label": "Estimated mission loss",
          "unit": "dollars",
          "value": 370000000,
          "display": "370,000,000",
          "desc": "Widely reported vehicle and payload value.",
          "source": {
            "label": "ESA — Ariane 5 Flight 501 failure report",
            "url": "https://www.esa.int/Newsroom/Press_Releases/Ariane_501_-_Presentation_of_Inquiry_Board_report",
            "accessed": "2026-07-18"
          },
          "id": "ariane_cost_f0",
          "playDesc": "Widely reported vehicle and payload value."
        },
        {
          "label": "Time to failure",
          "unit": "seconds",
          "value": 37,
          "display": "37",
          "desc": "Inquiry-board timeline.",
          "source": {
            "label": "ESA — Ariane 5 Flight 501 failure report",
            "url": "https://www.esa.int/Newsroom/Press_Releases/Ariane_501_-_Presentation_of_Inquiry_Board_report",
            "accessed": "2026-07-18"
          },
          "id": "ariane_cost_f1",
          "playDesc": "Inquiry-board timeline."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 10000000,
      "answerDisplay": "10,000,000",
      "explain": "Divide estimated loss by time to failure.",
      "revealQ": "What was the approximate loss per second before Ariane 5 Flight 501 failed thirty-seven seconds after launch?",
      "sources": [
        {
          "label": "ESA — Ariane 5 Flight 501 failure report",
          "url": "https://www.esa.int/Newsroom/Press_Releases/Ariane_501_-_Presentation_of_Inquiry_Board_report",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "integer_ratio",
      "q": "Maximum signed 64-bit integer: estimate the result in times using the real-world facts below.",
      "unit": "times",
      "factors": [
        {
          "label": "Maximum signed 64-bit integer",
          "unit": "integer",
          "value": 9223372036854776000,
          "display": "9.223×10¹⁸",
          "desc": "Two to the 63rd minus one.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "integer_ratio_f0",
          "playDesc": "Two to the 63rd minus one."
        },
        {
          "label": "Maximum signed 16-bit integer",
          "unit": "integer",
          "value": 32767,
          "display": "32,767",
          "desc": "Two to the 15th minus one.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "integer_ratio_f1",
          "playDesc": "Two to the 15th minus one."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 281483566907400,
      "answerDisplay": "281,483,566,907,400",
      "explain": "Divide the two representable maxima.",
      "revealQ": "How many times larger is the maximum signed 64-bit integer than the maximum signed 16-bit integer?",
      "sources": [
        {
          "label": "Defined mathematical relationship",
          "url": "https://www.nist.gov/pml/special-publication-811",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "therac_energy",
      "q": "Intended dose: estimate the result in joules using the real-world facts below.",
      "unit": "joules",
      "factors": [
        {
          "label": "Intended dose",
          "unit": "gray",
          "value": 2,
          "display": "2",
          "desc": "Representative therapeutic dose.",
          "source": {
            "label": "FDA — software and medical device safety",
            "url": "https://www.fda.gov/medical-devices/digital-health-center-excellence/software-medical-device-samd",
            "accessed": "2026-07-18"
          },
          "id": "therac_energy_f0",
          "playDesc": "Representative therapeutic dose."
        },
        {
          "label": "Overdose multiplier",
          "unit": "times",
          "value": 100,
          "display": "100",
          "desc": "Therac-25 accident scale.",
          "source": {
            "label": "FDA — software and medical device safety",
            "url": "https://www.fda.gov/medical-devices/digital-health-center-excellence/software-medical-device-samd",
            "accessed": "2026-07-18"
          },
          "id": "therac_energy_f1",
          "playDesc": "Therac-25 accident scale."
        },
        {
          "label": "Irradiated mass",
          "unit": "kilograms",
          "value": 1,
          "display": "1",
          "desc": "Comparison tissue mass.",
          "source": {
            "label": "IAEA — radiation dose units",
            "url": "https://www.iaea.org/resources/rpop/health-professionals/radiotherapy",
            "accessed": "2026-07-18"
          },
          "id": "therac_energy_f2",
          "playDesc": "Comparison tissue mass."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "answer": 200,
      "answerDisplay": "200",
      "explain": "Gray is joules per kilogram; multiply dose, overdose factor, and mass.",
      "revealQ": "How many joules are deposited in one kilogram by a hundredfold overdose of a two-gray prescription?",
      "sources": [
        {
          "label": "FDA — software and medical device safety",
          "url": "https://www.fda.gov/medical-devices/digital-health-center-excellence/software-medical-device-samd",
          "accessed": "2026-07-18"
        },
        {
          "label": "IAEA — radiation dose units",
          "url": "https://www.iaea.org/resources/rpop/health-professionals/radiotherapy",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "apollo_work",
      "q": "Instruction rate: estimate the result in instructions using the real-world facts below.",
      "unit": "instructions",
      "factors": [
        {
          "label": "Instruction rate",
          "unit": "instructions per second",
          "value": 85000,
          "display": "85,000",
          "desc": "Apollo computer performance scale.",
          "source": {
            "label": "NASA — Apollo Guidance Computer",
            "url": "https://www.nasa.gov/history/alsj/a11/a11computers.html",
            "accessed": "2026-07-18"
          },
          "id": "apollo_work_f0",
          "playDesc": "Apollo computer performance scale."
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
          "id": "apollo_work_f1",
          "playDesc": "The number of seconds corresponding to one minute."
        },
        {
          "label": "Processing interval",
          "unit": "minutes",
          "value": 10,
          "display": "10",
          "desc": "Comparison interval.",
          "source": {
            "label": "NASA — Apollo Guidance Computer",
            "url": "https://www.nasa.gov/history/alsj/a11/a11computers.html",
            "accessed": "2026-07-18"
          },
          "id": "apollo_work_f2",
          "playDesc": "Comparison interval."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "answer": 51000000,
      "answerDisplay": "51,000,000",
      "explain": "Multiply instruction rate by the number of seconds.",
      "revealQ": "How many instructions does an 85,000-instruction-per-second computer execute in ten minutes?",
      "sources": [
        {
          "label": "NASA — Apollo Guidance Computer",
          "url": "https://www.nasa.gov/history/alsj/a11/a11computers.html",
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
