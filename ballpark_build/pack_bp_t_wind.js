module.exports = { PACK: {
  "id": "bp_t_wind",
  "title": "The Haliade-X Offshore Wind Turbine",
  "casebookTitle": "The Fenmark Turbine Collapse",
  "tag": "wind power · rotor scale · fatigue",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Swept area",
      "Circular area covered by rotating blades."
    ],
    [
      "Capacity factor",
      "Average output divided by rated output."
    ],
    [
      "Tip path",
      "Distance traveled by a blade tip."
    ],
    [
      "Offshore turbine",
      "A wind turbine installed in ocean waters."
    ]
  ],
  "eqs": [
    {
      "id": "homes_per_turbine",
      "q": "Homes served: estimate the result in homes per turbine using the real-world facts below.",
      "unit": "homes per turbine",
      "factors": [
        {
          "label": "Homes served",
          "unit": "homes",
          "value": 38000,
          "display": "38,000",
          "desc": "GE’s published household-equivalent claim.",
          "source": {
            "label": "GE Vernova — Haliade-X facts",
            "url": "https://www.gevernova.com/wind-power/offshore-wind/haliade-x-offshore-turbine",
            "accessed": "2026-07-18"
          },
          "id": "homes_per_turbine_f0",
          "playDesc": "GE’s published household-equivalent claim."
        },
        {
          "label": "Equivalent turbines",
          "unit": "turbines",
          "value": 7.14,
          "display": "7.14",
          "desc": "Capacity-equivalent divisor for the comparison.",
          "source": {
            "label": "GE Vernova — Haliade-X facts",
            "url": "https://www.gevernova.com/wind-power/offshore-wind/haliade-x-offshore-turbine",
            "accessed": "2026-07-18"
          },
          "id": "homes_per_turbine_f1",
          "playDesc": "The number of Haliade-X-equivalent turbines represented in GE Vernova’s household-power comparison."
        }
      ],
      "ops": [
        "÷"
      ],
      "explain": "Divide homes by equivalent turbine count.",
      "answer": 5322.128851540617,
      "answerDisplay": "≈ 5,322.1",
      "sources": [
        {
          "label": "GE Vernova — Haliade-X facts",
          "url": "https://www.gevernova.com/wind-power/offshore-wind/haliade-x-offshore-turbine",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many U.S. homes correspond to one Haliade-X turbine if thirty-eight thousand homes are served by 7.14 turbines?"
    },
    {
      "id": "blade_feet",
      "q": "Blade length: estimate the result in feet using the real-world facts below.",
      "unit": "feet",
      "factors": [
        {
          "label": "Blade length",
          "unit": "metres",
          "value": 107,
          "display": "107",
          "desc": "Published blade length.",
          "source": {
            "label": "GE Vernova — Haliade-X facts",
            "url": "https://www.gevernova.com/wind-power/offshore-wind/haliade-x-offshore-turbine",
            "accessed": "2026-07-18"
          },
          "id": "blade_feet_f0",
          "playDesc": "Published blade length."
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
          "id": "blade_feet_f1",
          "playDesc": "The number of feet corresponding to one metre."
        }
      ],
      "ops": [
        "×"
      ],
      "explain": "Convert metres to feet.",
      "answer": 351.04988,
      "answerDisplay": "≈ 351",
      "sources": [
        {
          "label": "GE Vernova — Haliade-X facts",
          "url": "https://www.gevernova.com/wind-power/offshore-wind/haliade-x-offshore-turbine",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How long is a 107-metre Haliade-X blade in feet?"
    },
    {
      "id": "rotations_year",
      "q": "Rotor speed: estimate the result in rotations using the real-world facts below.",
      "unit": "rotations",
      "factors": [
        {
          "label": "Rotor speed",
          "unit": "revolutions per minute",
          "value": 8,
          "display": "8",
          "desc": "Representative slow offshore-turbine rotor speed.",
          "source": {
            "label": "GE Vernova — Haliade-X facts",
            "url": "https://www.gevernova.com/wind-power/offshore-wind/haliade-x-offshore-turbine",
            "accessed": "2026-07-18"
          },
          "id": "rotations_year_f0",
          "playDesc": "Representative slow offshore-turbine rotor speed."
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
          "id": "rotations_year_f1",
          "playDesc": "The number of minutes corresponding to one hour."
        },
        {
          "label": "Hours per year",
          "unit": "hours per year",
          "value": 8760,
          "display": "8,760",
          "desc": "Defined non-leap-year duration.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "rotations_year_f2",
          "playDesc": "The number of hours corresponding to one year."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "explain": "Multiply rotation rate by minutes per hour and hours per year.",
      "answer": 4204800,
      "answerDisplay": "≈ 4,204,800",
      "sources": [
        {
          "label": "GE Vernova — Haliade-X facts",
          "url": "https://www.gevernova.com/wind-power/offshore-wind/haliade-x-offshore-turbine",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many rotor rotations occur in a year at eight revolutions per minute?"
    },
    {
      "id": "power_density",
      "q": "Wind-farm rated power: estimate the result in watts per square metre using the real-world facts below.",
      "unit": "watts per square metre",
      "factors": [
        {
          "label": "Wind-farm rated power",
          "unit": "megawatts",
          "value": 74,
          "display": "74",
          "desc": "A real offshore-project power scale.",
          "source": {
            "label": "GE Vernova — Haliade-X facts",
            "url": "https://www.gevernova.com/wind-power/offshore-wind/haliade-x-offshore-turbine",
            "accessed": "2026-07-18"
          },
          "id": "power_density_f0",
          "playDesc": "A real offshore-project power scale."
        },
        {
          "label": "Watts per megawatt",
          "unit": "watts per megawatt",
          "value": 1000000,
          "display": "1,000,000",
          "desc": "Defined power conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "power_density_f1",
          "playDesc": "The number of watts corresponding to one megawatt."
        },
        {
          "label": "Rotor swept area",
          "unit": "square metres",
          "value": 10600,
          "display": "10,600",
          "desc": "Published rotor-area scale.",
          "source": {
            "label": "GE Vernova — Haliade-X facts",
            "url": "https://www.gevernova.com/wind-power/offshore-wind/haliade-x-offshore-turbine",
            "accessed": "2026-07-18"
          },
          "id": "power_density_f2",
          "playDesc": "Published rotor-area scale."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "explain": "Convert megawatts to watts and divide by swept area.",
      "answer": 6981.132075471698,
      "answerDisplay": "≈ 6,981.1",
      "sources": [
        {
          "label": "GE Vernova — Haliade-X facts",
          "url": "https://www.gevernova.com/wind-power/offshore-wind/haliade-x-offshore-turbine",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "What rated power density corresponds to seventy-four megawatts spread across 10,600 square metres?"
    }
  ],
  "sourceSummary": "Every playable value is linked to an official, institutional, scholarly, or defined-conversion source in the reveal."
} };
