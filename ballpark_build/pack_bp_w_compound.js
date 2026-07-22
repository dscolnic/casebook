module.exports = { PACK: {
  "id": "bp_w_compound",
  "title": "Sterile Compounding and Clean Rooms",
  "casebookTitle": "The Compounding Room",
  "tag": "pharmacy · sterile processing · clean rooms",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "ISO Class 5",
      "A very clean air classification used for critical sterile work."
    ],
    [
      "Air change",
      "Replacement of a room’s air volume."
    ],
    [
      "Autoclave",
      "A device sterilizing with pressurized steam."
    ],
    [
      "Beyond-use date",
      "Time after which a compounded preparation should not be used."
    ]
  ],
  "eqs": [
    {
      "id": "particle_count",
      "q": "Particle limit: estimate the result in particles using the real-world facts below.",
      "unit": "particles",
      "factors": [
        {
          "label": "Particle limit",
          "unit": "particles per cubic metre",
          "value": 3520,
          "display": "3,520",
          "desc": "ISO Class 5 particle concentration scale.",
          "source": {
            "label": "FDA — sterile drug compounding",
            "url": "https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers",
            "accessed": "2026-07-18"
          },
          "id": "particle_count_f0",
          "playDesc": "ISO Class 5 particle concentration scale."
        },
        {
          "label": "Room volume",
          "unit": "cubic metres",
          "value": 30,
          "display": "30",
          "desc": "Realistic clean-room volume used for comparison.",
          "source": {
            "label": "FDA — sterile drug compounding",
            "url": "https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers",
            "accessed": "2026-07-18"
          },
          "id": "particle_count_f1",
          "playDesc": "Realistic clean-room volume used for comparison."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 105600,
      "answerDisplay": "105,600",
      "explain": "Concentration times room volume gives particle count.",
      "revealQ": "At 3,520 particles per cubic metre, how many particles are allowed in a thirty-cubic-metre ISO Class 5 space?",
      "sources": [
        {
          "label": "FDA — sterile drug compounding",
          "url": "https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "vial_doses",
      "q": "Prepared solution: estimate the result in doses using the real-world facts below.",
      "unit": "doses",
      "factors": [
        {
          "label": "Prepared solution",
          "unit": "millilitres",
          "value": 1000,
          "display": "1,000",
          "desc": "One litre expressed in millilitres.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "vial_doses_f0",
          "playDesc": "One litre expressed in millilitres."
        },
        {
          "label": "Dose volume",
          "unit": "millilitres per dose",
          "value": 5,
          "display": "5",
          "desc": "Small injectable dose-volume scale.",
          "source": {
            "label": "FDA — sterile drug compounding",
            "url": "https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers",
            "accessed": "2026-07-18"
          },
          "id": "vial_doses_f1",
          "playDesc": "Small injectable dose-volume scale."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 200,
      "answerDisplay": "200",
      "explain": "Divide total solution by dose volume.",
      "revealQ": "How many five-millilitre doses can be filled from one litre?",
      "sources": [
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        },
        {
          "label": "FDA — sterile drug compounding",
          "url": "https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "autoclave_f",
      "q": "Sterilization temperature: estimate the result in degrees Fahrenheit using the real-world facts below.",
      "unit": "degrees Fahrenheit",
      "factors": [
        {
          "label": "Sterilization temperature",
          "unit": "degrees Celsius",
          "value": 121,
          "display": "121",
          "desc": "Common steam-sterilization temperature.",
          "source": {
            "label": "FDA — sterile drug compounding",
            "url": "https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers",
            "accessed": "2026-07-18"
          },
          "id": "autoclave_f_f0",
          "playDesc": "Common steam-sterilization temperature."
        },
        {
          "label": "Fahrenheit scale multiplier",
          "unit": "degrees F per degree C",
          "value": 1.8,
          "display": "1.8",
          "desc": "Temperature conversion multiplier.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "autoclave_f_f1",
          "playDesc": "The multiplier applied to a Celsius temperature before adding the Fahrenheit offset."
        },
        {
          "label": "Fahrenheit offset",
          "unit": "degrees Fahrenheit",
          "value": 32,
          "display": "32",
          "desc": "Temperature conversion offset.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "autoclave_f_f2",
          "playDesc": "The number added after scaling Celsius to place the result on the Fahrenheit scale."
        }
      ],
      "ops": [
        "×",
        "+"
      ],
      "answer": 249.8,
      "answerDisplay": "249.8",
      "explain": "Multiply by nine-fifths and add thirty-two.",
      "revealQ": "What is 121 degrees Celsius in degrees Fahrenheit?",
      "sources": [
        {
          "label": "FDA — sterile drug compounding",
          "url": "https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers",
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
      "id": "air_volume",
      "q": "Clean-room volume: estimate the result in cubic metres per day using the real-world facts below.",
      "unit": "cubic metres per day",
      "factors": [
        {
          "label": "Clean-room volume",
          "unit": "cubic metres",
          "value": 31,
          "display": "31",
          "desc": "Room volume represented independently.",
          "source": {
            "label": "FDA — sterile drug compounding",
            "url": "https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers",
            "accessed": "2026-07-18"
          },
          "id": "air_volume_f0",
          "playDesc": "Room volume represented independently."
        },
        {
          "label": "Air changes per hour",
          "unit": "changes per hour",
          "value": 60,
          "display": "60",
          "desc": "High-cleanliness ventilation rate.",
          "source": {
            "label": "FDA — sterile drug compounding",
            "url": "https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers",
            "accessed": "2026-07-18"
          },
          "id": "air_volume_f1",
          "playDesc": "High-cleanliness ventilation rate."
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
          "id": "air_volume_f2",
          "playDesc": "The number of hours corresponding to one day."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "answer": 44640,
      "answerDisplay": "44,640",
      "explain": "Room volume times air changes and hours gives daily processed air.",
      "revealQ": "How much air passes through a thirty-one-cubic-metre room in one day at sixty air changes per hour?",
      "sources": [
        {
          "label": "FDA — sterile drug compounding",
          "url": "https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers",
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
