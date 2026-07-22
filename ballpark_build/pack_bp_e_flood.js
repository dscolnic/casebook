module.exports = { PACK: {
  "id": "bp_e_flood",
  "title": "Floods and Moving Water",
  "casebookTitle": "The Rossmere Flood",
  "tag": "rivers · rainfall · flood probability",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Discharge",
      "The volume of water passing a point per unit time."
    ],
    [
      "Rainfall depth",
      "How deep the rain would be if it stayed where it fell."
    ],
    [
      "Annual exceedance probability",
      "The chance that a specified flood level is exceeded in one year."
    ],
    [
      "Cubic kilometre",
      "A billion cubic metres of volume."
    ]
  ],
  "eqs": [
    {
      "id": "mississippi_daily",
      "q": "Average annual Mississippi discharge: estimate the result in cubic kilometres per day using the real-world facts below.",
      "unit": "cubic kilometres per day",
      "factors": [
        {
          "label": "Average annual Mississippi discharge",
          "unit": "cubic kilometres per year",
          "value": 580,
          "display": "580",
          "desc": "USGS estimate for combined freshwater discharge to the Gulf.",
          "source": {
            "label": "USGS — Mississippi River discharge",
            "url": "https://pubs.usgs.gov/circ/circ1133/geosetting.html",
            "accessed": "2026-07-18"
          },
          "id": "mississippi_daily_f0",
          "playDesc": "USGS estimate for combined freshwater discharge to the Gulf."
        },
        {
          "label": "Days per year",
          "unit": "days per year",
          "value": 365,
          "display": "365",
          "desc": "Calendar conversion used for a daily average.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "mississippi_daily_f1",
          "playDesc": "The number of days corresponding to one year."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 1.5890410958904109,
      "answerDisplay": "1.589",
      "explain": "Divide the annual volume by days per year.",
      "revealQ": "About how many cubic kilometres of freshwater does the Mississippi River deliver to the Gulf on an average day?",
      "sources": [
        {
          "label": "USGS — Mississippi River discharge",
          "url": "https://pubs.usgs.gov/circ/circ1133/geosetting.html",
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
      "id": "harvey_depth",
      "q": "Harvey storm-total rainfall: estimate the result in millimetres using the real-world facts below.",
      "unit": "millimetres",
      "factors": [
        {
          "label": "Harvey storm-total rainfall",
          "unit": "inches",
          "value": 60.58,
          "display": "60.58",
          "desc": "NOAA’s highest reported storm-total rainfall.",
          "source": {
            "label": "NOAA — Hurricane Harvey rainfall",
            "url": "https://www.coast.noaa.gov/states/fast-facts/hurricane-costs.html",
            "accessed": "2026-07-18"
          },
          "id": "harvey_depth_f0",
          "playDesc": "NOAA’s highest reported storm-total rainfall."
        },
        {
          "label": "Millimetres per inch",
          "unit": "millimetres per inch",
          "value": 25.4,
          "display": "25.4",
          "desc": "Defined length conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "harvey_depth_f1",
          "playDesc": "The conversion factor from one inch to millimetres."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 1538.732,
      "answerDisplay": "1,538.7",
      "explain": "Convert the NOAA rainfall record from inches to millimetres.",
      "revealQ": "How many millimetres of rain fell at the wettest gauge during Hurricane Harvey?",
      "sources": [
        {
          "label": "NOAA — Hurricane Harvey rainfall",
          "url": "https://www.coast.noaa.gov/states/fast-facts/hurricane-costs.html",
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
      "id": "niagara_daily",
      "q": "Record Niagara daily discharge: estimate the result in cubic metres using the real-world facts below.",
      "unit": "cubic metres",
      "factors": [
        {
          "label": "Record Niagara daily discharge",
          "unit": "cubic feet per second",
          "value": 347000,
          "display": "347,000",
          "desc": "USGS water records report this maximum daily discharge at the Niagara River head.",
          "source": {
            "label": "USGS — Mississippi River discharge",
            "url": "https://pubs.usgs.gov/circ/circ1133/geosetting.html",
            "accessed": "2026-07-18"
          },
          "id": "niagara_daily_f0",
          "playDesc": "USGS water records report this maximum daily discharge at the Niagara River head."
        },
        {
          "label": "Cubic metres per cubic foot",
          "unit": "cubic metres per cubic foot",
          "value": 0.0283168,
          "display": "0.0283168",
          "desc": "Defined volume conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "niagara_daily_f1",
          "playDesc": "The number of cubic metres corresponding to one cubic foot."
        },
        {
          "label": "Seconds per day",
          "unit": "seconds per day",
          "value": 86400,
          "display": "86,400",
          "desc": "Defined time conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "niagara_daily_f2",
          "playDesc": "The number of seconds corresponding to one day."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "answer": 848960317.4399999,
      "answerDisplay": "848,960,317",
      "explain": "Convert the flow rate to cubic metres per second and extend it across one day.",
      "revealQ": "How many cubic metres would pass Niagara in one day at the USGS record maximum daily discharge?",
      "sources": [
        {
          "label": "USGS — Mississippi River discharge",
          "url": "https://pubs.usgs.gov/circ/circ1133/geosetting.html",
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
      "id": "mortgage_exposure",
      "q": "One exceedance in the return period: estimate the result in expected exceedances using the real-world facts below.",
      "unit": "expected exceedances",
      "factors": [
        {
          "label": "One exceedance in the return period",
          "unit": "events",
          "value": 1,
          "display": "1",
          "desc": "The numerator in the annual-frequency description.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "mortgage_exposure_f0",
          "playDesc": "The numerator in the annual-frequency description."
        },
        {
          "label": "Return period",
          "unit": "years per event",
          "value": 100,
          "display": "100",
          "desc": "A 100-year flood corresponds to a one-percent annual exceedance probability.",
          "source": {
            "label": "USGS — earthquake magnitude and energy",
            "url": "https://www.usgs.gov/programs/earthquake-hazards/earthquake-magnitude-energy-release-and-shaking-intensity",
            "accessed": "2026-07-18"
          },
          "id": "mortgage_exposure_f1",
          "playDesc": "A 100-year flood corresponds to a one-percent annual exceedance probability."
        },
        {
          "label": "Mortgage duration",
          "unit": "years",
          "value": 30,
          "display": "30",
          "desc": "A common comparison period for long-term exposure.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "mortgage_exposure_f2",
          "playDesc": "A common comparison period for long-term exposure."
        }
      ],
      "ops": [
        "÷",
        "×"
      ],
      "answer": 0.3,
      "answerDisplay": "0.3",
      "explain": "Annual frequency multiplied by years gives the expected count; it is not a guarantee that a flood occurs only once per century.",
      "revealQ": "What is the expected number of “100-year flood” exceedances during a thirty-year mortgage?",
      "sources": [
        {
          "label": "Defined mathematical relationship",
          "url": "https://www.nist.gov/pml/special-publication-811",
          "accessed": "2026-07-18"
        },
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
    }
  ],
  "sourceSummary": "Every playable value is linked to an official, institutional, scholarly, or defined-conversion source in the reveal."
} };
