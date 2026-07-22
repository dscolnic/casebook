module.exports = { PACK: {
  "id": "bp_m_rig",
  "title": "Deepwater Drilling and the Gulf Spill",
  "casebookTitle": "The Deepwater Meridian",
  "tag": "offshore drilling · pressure · spill scale",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Blowout",
      "Uncontrolled release of oil or gas from a well."
    ],
    [
      "Water depth",
      "Vertical distance from sea surface to seabed."
    ],
    [
      "Barrel",
      "A petroleum volume unit equal to about 159 litres."
    ],
    [
      "Hydrostatic pressure",
      "Pressure created by the weight of a fluid column."
    ]
  ],
  "eqs": [
    {
      "id": "water_depth",
      "q": "Water depth: estimate the result in miles using the real-world facts below.",
      "unit": "miles",
      "factors": [
        {
          "label": "Water depth",
          "unit": "feet",
          "value": 5000,
          "display": "5,000",
          "desc": "NOAA’s rounded water-depth figure.",
          "source": {
            "label": "NOAA — Deepwater Horizon spill",
            "url": "https://response.restoration.noaa.gov/oil-and-chemical-spills/significant-incidents/deepwater-horizon-oil-spill",
            "accessed": "2026-07-18"
          },
          "id": "water_depth_f0",
          "playDesc": "NOAA’s rounded water-depth figure."
        },
        {
          "label": "Feet per mile",
          "unit": "feet per mile",
          "value": 5280,
          "display": "5,280",
          "desc": "Defined length conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "water_depth_f1",
          "playDesc": "The number of feet corresponding to one mile."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 0.946969696969697,
      "answerDisplay": "0.947",
      "explain": "Convert feet to miles.",
      "revealQ": "How many miles deep was the water at the Deepwater Horizon well?",
      "sources": [
        {
          "label": "NOAA — Deepwater Horizon spill",
          "url": "https://response.restoration.noaa.gov/oil-and-chemical-spills/significant-incidents/deepwater-horizon-oil-spill",
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
      "id": "well_depth",
      "q": "Total well depth: estimate the result in kilometres using the real-world facts below.",
      "unit": "kilometres",
      "factors": [
        {
          "label": "Total well depth",
          "unit": "feet",
          "value": 18360,
          "display": "18,360",
          "desc": "Documented approximate measured depth.",
          "source": {
            "label": "NOAA — Deepwater Horizon spill",
            "url": "https://response.restoration.noaa.gov/oil-and-chemical-spills/significant-incidents/deepwater-horizon-oil-spill",
            "accessed": "2026-07-18"
          },
          "id": "well_depth_f0",
          "playDesc": "Documented approximate measured depth."
        },
        {
          "label": "Kilometres per foot",
          "unit": "kilometres per foot",
          "value": 0.0003048,
          "display": "0.0003048",
          "desc": "Defined length conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "well_depth_f1",
          "playDesc": "The conversion factor from one foot to kilometres."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 5.596127999999999,
      "answerDisplay": "5.596",
      "explain": "Convert feet to kilometres.",
      "revealQ": "How many kilometres was the approximately 18,360-foot well depth?",
      "sources": [
        {
          "label": "NOAA — Deepwater Horizon spill",
          "url": "https://response.restoration.noaa.gov/oil-and-chemical-spills/significant-incidents/deepwater-horizon-oil-spill",
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
      "id": "spill_pools",
      "q": "Estimated oil released: estimate the result in Olympic pools using the real-world facts below.",
      "unit": "Olympic pools",
      "factors": [
        {
          "label": "Estimated oil released",
          "unit": "barrels",
          "value": 4900000,
          "display": "4,900,000",
          "desc": "Federal estimate of total released oil.",
          "source": {
            "label": "NOAA — Deepwater Horizon spill",
            "url": "https://response.restoration.noaa.gov/oil-and-chemical-spills/significant-incidents/deepwater-horizon-oil-spill",
            "accessed": "2026-07-18"
          },
          "id": "spill_pools_f0",
          "playDesc": "Federal estimate of total released oil."
        },
        {
          "label": "Litres per petroleum barrel",
          "unit": "litres per barrel",
          "value": 159,
          "display": "159",
          "desc": "Standard barrel conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "spill_pools_f1",
          "playDesc": "The number of litres corresponding to one petroleum barrel."
        },
        {
          "label": "Litres in an Olympic pool",
          "unit": "litres per pool",
          "value": 2500000,
          "display": "2,500,000",
          "desc": "Common comparison for a 50 m × 25 m × 2 m pool.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "spill_pools_f2",
          "playDesc": "Common comparison for a 50 m × 25 m × 2 m pool."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "answer": 311.64,
      "answerDisplay": "311.64",
      "explain": "Convert barrels to litres and divide by pool volume.",
      "revealQ": "How many Olympic swimming pools equal 4.9 million barrels of oil?",
      "sources": [
        {
          "label": "NOAA — Deepwater Horizon spill",
          "url": "https://response.restoration.noaa.gov/oil-and-chemical-spills/significant-incidents/deepwater-horizon-oil-spill",
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
    },
    {
      "id": "spill_seconds",
      "q": "Spill duration: estimate the result in seconds using the real-world facts below.",
      "unit": "seconds",
      "factors": [
        {
          "label": "Spill duration",
          "unit": "days",
          "value": 87,
          "display": "87",
          "desc": "Documented duration before the well was capped.",
          "source": {
            "label": "NOAA — Deepwater Horizon spill",
            "url": "https://response.restoration.noaa.gov/oil-and-chemical-spills/significant-incidents/deepwater-horizon-oil-spill",
            "accessed": "2026-07-18"
          },
          "id": "spill_seconds_f0",
          "playDesc": "Documented duration before the well was capped."
        },
        {
          "label": "Hours per day",
          "unit": "hours per day",
          "value": 24,
          "display": "24",
          "desc": "Defined time conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "spill_seconds_f1",
          "playDesc": "The number of hours corresponding to one day."
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
          "id": "spill_seconds_f2",
          "playDesc": "The number of seconds corresponding to one hour."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "answer": 7516800,
      "answerDisplay": "7,516,800",
      "explain": "Convert days to hours and then seconds.",
      "revealQ": "How many seconds did the eighty-seven-day spill last?",
      "sources": [
        {
          "label": "NOAA — Deepwater Horizon spill",
          "url": "https://response.restoration.noaa.gov/oil-and-chemical-spills/significant-incidents/deepwater-horizon-oil-spill",
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
