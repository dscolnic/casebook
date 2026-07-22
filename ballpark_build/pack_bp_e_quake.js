module.exports = { PACK: {
  "id": "bp_e_quake",
  "title": "Earthquakes: Rupture, Energy, and Signals",
  "casebookTitle": "Nine Seconds to Cordera",
  "tag": "seismology · rupture · wave travel",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Rupture area",
      "The part of a fault that slips during an earthquake."
    ],
    [
      "Seismic wave",
      "Energy traveling through Earth as vibrations."
    ],
    [
      "Megaton of TNT",
      "An energy comparison equal to one million tonnes of TNT."
    ],
    [
      "Three-component seismometer",
      "An instrument recording motion in three perpendicular directions."
    ]
  ],
  "eqs": [
    {
      "id": "tohoku_area",
      "q": "Rupture length: estimate the result in square kilometres using the real-world facts below.",
      "unit": "square kilometres",
      "factors": [
        {
          "label": "Rupture length",
          "unit": "kilometres",
          "value": 400,
          "display": "400",
          "desc": "USGS modeled along-strike length.",
          "source": {
            "label": "USGS — 2011 Tohoku earthquake",
            "url": "https://earthquake.usgs.gov/earthquakes/eventpage/official20110311054624120_30/executive",
            "accessed": "2026-07-18"
          },
          "id": "tohoku_area_f0",
          "playDesc": "USGS modeled along-strike length."
        },
        {
          "label": "Rupture width",
          "unit": "kilometres",
          "value": 150,
          "display": "150",
          "desc": "USGS modeled down-dip width.",
          "source": {
            "label": "USGS — 2011 Tohoku earthquake",
            "url": "https://earthquake.usgs.gov/earthquakes/eventpage/official20110311054624120_30/executive",
            "accessed": "2026-07-18"
          },
          "id": "tohoku_area_f1",
          "playDesc": "USGS modeled down-dip width."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 60000,
      "answerDisplay": "60,000",
      "explain": "Length multiplied by width gives an approximate rupture area.",
      "revealQ": "About how large was the fault area that ruptured in the 2011 Tohoku earthquake?",
      "sources": [
        {
          "label": "USGS — 2011 Tohoku earthquake",
          "url": "https://earthquake.usgs.gov/earthquakes/eventpage/official20110311054624120_30/executive",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "wave_arrival",
      "q": "Approximate city-to-city distance: estimate the result in seconds using the real-world facts below.",
      "unit": "seconds",
      "factors": [
        {
          "label": "Approximate city-to-city distance",
          "unit": "kilometres",
          "value": 373,
          "display": "373",
          "desc": "A rounded geographic comparison distance.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "wave_arrival_f0",
          "playDesc": "A rounded geographic comparison distance."
        },
        {
          "label": "Representative crustal P-wave speed",
          "unit": "kilometres per second",
          "value": 6,
          "display": "6",
          "desc": "A representative fast seismic-wave speed in crustal rock.",
          "source": {
            "label": "USGS — earthquake magnitude and energy",
            "url": "https://www.usgs.gov/programs/earthquake-hazards/earthquake-magnitude-energy-release-and-shaking-intensity",
            "accessed": "2026-07-18"
          },
          "id": "wave_arrival_f1",
          "playDesc": "A representative fast seismic-wave speed in crustal rock."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 62.166666666666664,
      "answerDisplay": "62.17",
      "explain": "Distance divided by wave speed gives travel time.",
      "revealQ": "How long would a seismic wave traveling at six kilometres per second take to cross the distance from Washington, D.C., to New York City?",
      "sources": [
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        },
        {
          "label": "USGS — earthquake magnitude and energy",
          "url": "https://www.usgs.gov/programs/earthquake-hazards/earthquake-magnitude-energy-release-and-shaking-intensity",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "tohoku_tnt",
      "q": "Earthquake energy scale: estimate the result in megatons of TNT using the real-world facts below.",
      "unit": "megatons of TNT",
      "factors": [
        {
          "label": "Earthquake energy scale",
          "unit": "joules",
          "value": 2000000000000000000,
          "display": "2,000,000,000,000,000,000",
          "desc": "An order-of-magnitude energy scale for a magnitude-nine earthquake.",
          "source": {
            "label": "USGS — earthquake magnitude and energy",
            "url": "https://www.usgs.gov/programs/earthquake-hazards/earthquake-magnitude-energy-release-and-shaking-intensity",
            "accessed": "2026-07-18"
          },
          "id": "tohoku_tnt_f0",
          "playDesc": "An order-of-magnitude energy scale for a magnitude-nine earthquake."
        },
        {
          "label": "Joules per kilotonne TNT",
          "unit": "joules per kilotonne",
          "value": 4184000000000,
          "display": "4,184,000,000,000",
          "desc": "Defined energy conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "tohoku_tnt_f1",
          "playDesc": "The energy in joules equivalent to one kilotonne tnt."
        },
        {
          "label": "Kilotonnes per megaton",
          "unit": "kilotonnes per megaton",
          "value": 1000,
          "display": "1,000",
          "desc": "Defined prefix conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "tohoku_tnt_f2",
          "playDesc": "The conversion factor from one megaton to kilotonnes."
        }
      ],
      "ops": [
        "÷",
        "÷"
      ],
      "answer": 478.0114722753346,
      "answerDisplay": "478.01",
      "explain": "Convert joules to kilotonnes and then to megatons.",
      "revealQ": "About how many megatons of TNT correspond to a two-exajoule earthquake-energy scale?",
      "sources": [
        {
          "label": "USGS — earthquake magnitude and energy",
          "url": "https://www.usgs.gov/programs/earthquake-hazards/earthquake-magnitude-energy-release-and-shaking-intensity",
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
      "id": "seismogram_samples",
      "q": "Samples per second per component: estimate the result in samples using the real-world facts below.",
      "unit": "samples",
      "factors": [
        {
          "label": "Samples per second per component",
          "unit": "samples per second",
          "value": 100,
          "display": "100",
          "desc": "A common high-rate strong-motion sampling scale.",
          "source": {
            "label": "USGS — earthquake magnitude and energy",
            "url": "https://www.usgs.gov/programs/earthquake-hazards/earthquake-magnitude-energy-release-and-shaking-intensity",
            "accessed": "2026-07-18"
          },
          "id": "seismogram_samples_f0",
          "playDesc": "A common high-rate strong-motion sampling scale."
        },
        {
          "label": "Recording duration",
          "unit": "seconds",
          "value": 300,
          "display": "300",
          "desc": "Five minutes expressed in seconds.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "seismogram_samples_f1",
          "playDesc": "Five minutes expressed in seconds."
        },
        {
          "label": "Motion components",
          "unit": "components",
          "value": 3,
          "display": "3",
          "desc": "North–south, east–west, and vertical channels.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "seismogram_samples_f2",
          "playDesc": "North–south, east–west, and vertical channels."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "answer": 90000,
      "answerDisplay": "90,000",
      "explain": "Sample rate times duration times channel count gives the data values recorded.",
      "revealQ": "How many numbers are recorded in five minutes by a three-component seismometer sampling one hundred times per second?",
      "sources": [
        {
          "label": "USGS — earthquake magnitude and energy",
          "url": "https://www.usgs.gov/programs/earthquake-hazards/earthquake-magnitude-energy-release-and-shaking-intensity",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        },
        {
          "label": "Defined mathematical relationship",
          "url": "https://www.nist.gov/pml/special-publication-811",
          "accessed": "2026-07-18"
        }
      ]
    }
  ],
  "sourceSummary": "Every playable value is linked to an official, institutional, scholarly, or defined-conversion source in the reveal."
} };
