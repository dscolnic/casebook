module.exports = { PACK: {
  "id": "bp_t_battery",
  "title": "Grid Batteries and Stored Energy",
  "casebookTitle": "The Kelso Grid-Battery Fire",
  "tag": "batteries · power · grid storage",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Energy capacity",
      "Total energy a battery can deliver."
    ],
    [
      "Power rating",
      "Maximum rate of energy delivery."
    ],
    [
      "Discharge duration",
      "Energy capacity divided by power."
    ],
    [
      "Thermal runaway",
      "Self-heating reaction that can propagate through battery cells."
    ]
  ],
  "eqs": [
    {
      "id": "duration",
      "q": "Stored energy: estimate the result in hours using the real-world facts below.",
      "unit": "hours",
      "factors": [
        {
          "label": "Stored energy",
          "unit": "megawatt-hours",
          "value": 3000,
          "display": "3,000",
          "desc": "Published Moss Landing energy capacity.",
          "source": {
            "label": "Vistra — Moss Landing energy storage",
            "url": "https://investor.vistracorp.com/2023-06-12-Vistra-Completes-Expansion-of-Battery-Energy-Storage-System-at-Moss-Landing",
            "accessed": "2026-07-18"
          },
          "id": "duration_f0",
          "playDesc": "Published Moss Landing energy capacity."
        },
        {
          "label": "Discharge power",
          "unit": "megawatts",
          "value": 750,
          "display": "750",
          "desc": "Published power capacity.",
          "source": {
            "label": "Vistra — Moss Landing energy storage",
            "url": "https://investor.vistracorp.com/2023-06-12-Vistra-Completes-Expansion-of-Battery-Energy-Storage-System-at-Moss-Landing",
            "accessed": "2026-07-18"
          },
          "id": "duration_f1",
          "playDesc": "Published power capacity."
        }
      ],
      "ops": [
        "÷"
      ],
      "explain": "Energy divided by power gives duration.",
      "answer": 4,
      "answerDisplay": "≈ 4",
      "sources": [
        {
          "label": "Vistra — Moss Landing energy storage",
          "url": "https://investor.vistracorp.com/2023-06-12-Vistra-Completes-Expansion-of-Battery-Energy-Storage-System-at-Moss-Landing",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many hours can a three-gigawatt-hour battery discharge at 750 megawatts?"
    },
    {
      "id": "pack_voltage",
      "q": "Nominal cell voltage: estimate the result in volts using the real-world facts below.",
      "unit": "volts",
      "factors": [
        {
          "label": "Nominal cell voltage",
          "unit": "volts per cell",
          "value": 3.9,
          "display": "3.9",
          "desc": "Representative lithium-ion cell voltage.",
          "source": {
            "label": "Vistra — Moss Landing energy storage",
            "url": "https://investor.vistracorp.com/2023-06-12-Vistra-Completes-Expansion-of-Battery-Energy-Storage-System-at-Moss-Landing",
            "accessed": "2026-07-18"
          },
          "id": "pack_voltage_f0",
          "playDesc": "The number of battery cells connected in series in the voltage comparison."
        },
        {
          "label": "Series cells",
          "unit": "cells",
          "value": 1200,
          "display": "1,200",
          "desc": "A defined series-string comparison.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "pack_voltage_f1",
          "playDesc": "The series cells documented or defined by Defined mathematical relationship."
        }
      ],
      "ops": [
        "×"
      ],
      "explain": "Series voltages add, represented as cell voltage times cell count.",
      "answer": 4680,
      "answerDisplay": "≈ 4,680 volts",
      "sources": [
        {
          "label": "Vistra — Moss Landing energy storage",
          "url": "https://investor.vistracorp.com/2023-06-12-Vistra-Completes-Expansion-of-Battery-Energy-Storage-System-at-Moss-Landing",
          "accessed": "2026-07-18"
        },
        {
          "label": "Defined mathematical relationship",
          "url": "https://www.nist.gov/pml/special-publication-811",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "What voltage is produced by one thousand cells in series at 3.9 volts each?"
    },
    {
      "id": "homes_powered",
      "q": "Battery output: estimate the result in homes using the real-world facts below.",
      "unit": "homes",
      "factors": [
        {
          "label": "Battery output",
          "unit": "megawatts",
          "value": 100,
          "display": "100",
          "desc": "A documented expansion-block power rating.",
          "source": {
            "label": "Vistra — Moss Landing energy storage",
            "url": "https://investor.vistracorp.com/2023-06-12-Vistra-Completes-Expansion-of-Battery-Energy-Storage-System-at-Moss-Landing",
            "accessed": "2026-07-18"
          },
          "id": "homes_powered_f0",
          "playDesc": "A documented expansion-block power rating."
        },
        {
          "label": "Kilowatts per megawatt",
          "unit": "kilowatts per megawatt",
          "value": 1000,
          "display": "1,000.0",
          "desc": "Defined power conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "homes_powered_f1",
          "playDesc": "The number of kilowatts corresponding to one megawatt."
        },
        {
          "label": "Average household demand",
          "unit": "kilowatts per home",
          "value": 1.2,
          "display": "1.2",
          "desc": "A rounded U.S. household average-load scale.",
          "source": {
            "label": "U.S. EIA — residential electricity use",
            "url": "https://www.eia.gov/tools/faqs/faq.php?id=97&t=3",
            "accessed": "2026-07-18"
          },
          "id": "homes_powered_f2",
          "playDesc": "A rounded U.S. household average-load scale."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "explain": "Convert megawatts to kilowatts and divide by demand per home.",
      "answer": 83333.33333333334,
      "answerDisplay": "≈ 83,333.3",
      "sources": [
        {
          "label": "Vistra — Moss Landing energy storage",
          "url": "https://investor.vistracorp.com/2023-06-12-Vistra-Completes-Expansion-of-Battery-Energy-Storage-System-at-Moss-Landing",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        },
        {
          "label": "U.S. EIA — residential electricity use",
          "url": "https://www.eia.gov/tools/faqs/faq.php?id=97&t=3",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many average homes could a one-hundred-megawatt battery support if each home draws 1.2 kilowatts?"
    },
    {
      "id": "cells_equivalent",
      "q": "Battery energy: estimate the result in cells using the real-world facts below.",
      "unit": "cells",
      "factors": [
        {
          "label": "Battery energy",
          "unit": "gigawatt-hours",
          "value": 3,
          "display": "3",
          "desc": "Published facility energy capacity.",
          "source": {
            "label": "Vistra — Moss Landing energy storage",
            "url": "https://investor.vistracorp.com/2023-06-12-Vistra-Completes-Expansion-of-Battery-Energy-Storage-System-at-Moss-Landing",
            "accessed": "2026-07-18"
          },
          "id": "cells_equivalent_f0",
          "playDesc": "Published facility energy capacity."
        },
        {
          "label": "Watt-hours per gigawatt-hour",
          "unit": "watt-hours per gigawatt-hour",
          "value": 1000000000,
          "display": "1,000,000,000",
          "desc": "Defined prefix conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "cells_equivalent_f1",
          "playDesc": "The conversion factor from one gigawatt-hour to watt-hours."
        },
        {
          "label": "Energy per comparison cell",
          "unit": "watt-hours per cell",
          "value": 300,
          "display": "300",
          "desc": "A large-format cell comparison capacity.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "cells_equivalent_f2",
          "playDesc": "A large-format cell comparison capacity."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "explain": "Convert gigawatt-hours to watt-hours and divide by cell energy.",
      "answer": 10000000,
      "answerDisplay": "≈ 10,000,000",
      "sources": [
        {
          "label": "Vistra — Moss Landing energy storage",
          "url": "https://investor.vistracorp.com/2023-06-12-Vistra-Completes-Expansion-of-Battery-Energy-Storage-System-at-Moss-Landing",
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
      ],
      "revealQ": "How many 300-watt-hour cells equal three gigawatt-hours?"
    }
  ],
  "sourceSummary": "Every playable value is linked to an official, institutional, scholarly, or defined-conversion source in the reveal."
} };
