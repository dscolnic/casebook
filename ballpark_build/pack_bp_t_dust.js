module.exports = { PACK: {
  "id": "bp_t_dust",
  "title": "Combustible Dust: Thin Layers, Large Hazards",
  "casebookTitle": "The Corriston Mill Blast",
  "tag": "dust explosions · combustion · standards",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Combustible dust",
      "Fine particles that can burn rapidly when suspended in air."
    ],
    [
      "Deflagration",
      "Flame moving slower than the speed of sound."
    ],
    [
      "Dust layer",
      "Settled particles that can become airborne in a secondary explosion."
    ],
    [
      "Particle concentration",
      "Mass of dust per volume of air."
    ]
  ],
  "eqs": [
    {
      "id": "layer_mm",
      "q": "Hazardous dust-layer thickness: estimate the result in millimetres using the real-world facts below.",
      "unit": "millimetres",
      "factors": [
        {
          "label": "Hazardous dust-layer thickness",
          "unit": "inches",
          "value": 0.03125,
          "display": "0.03125",
          "desc": "OSHA’s often-cited one-thirty-second-inch rule-of-thumb scale.",
          "source": {
            "label": "OSHA — combustible dust",
            "url": "https://www.osha.gov/combustible-dust",
            "accessed": "2026-07-18"
          },
          "id": "layer_mm_f0",
          "playDesc": "OSHA’s often-cited one-thirty-second-inch rule-of-thumb scale."
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
          "id": "layer_mm_f1",
          "playDesc": "The conversion factor from one inch to millimetres."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 0.79375,
      "answerDisplay": "0.7937",
      "explain": "Convert inches to millimetres.",
      "revealQ": "How many millimetres is a one-thirty-second-inch dust layer?",
      "sources": [
        {
          "label": "OSHA — combustible dust",
          "url": "https://www.osha.gov/combustible-dust",
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
      "id": "court_area",
      "q": "Basketball-court area: estimate the result in square feet using the real-world facts below.",
      "unit": "square feet",
      "factors": [
        {
          "label": "Basketball-court area",
          "unit": "square feet",
          "value": 4700,
          "display": "4,700",
          "desc": "Real court-area comparison scale.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "court_area_f0",
          "playDesc": "Real court-area comparison scale."
        },
        {
          "label": "Area fraction",
          "unit": "fraction",
          "value": 0.05,
          "display": "0.05",
          "desc": "The cited coverage fraction in common dust guidance.",
          "source": {
            "label": "OSHA — combustible dust",
            "url": "https://www.osha.gov/combustible-dust",
            "accessed": "2026-07-18"
          },
          "id": "court_area_f1",
          "playDesc": "The cited coverage fraction in common dust guidance."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 235,
      "answerDisplay": "235",
      "explain": "Multiply floor area by the fraction covered.",
      "revealQ": "How many square feet is five percent of a 4,700-square-foot basketball court?",
      "sources": [
        {
          "label": "Defined mathematical relationship",
          "url": "https://www.nist.gov/pml/special-publication-811",
          "accessed": "2026-07-18"
        },
        {
          "label": "OSHA — combustible dust",
          "url": "https://www.osha.gov/combustible-dust",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "field_dust_volume",
      "q": "Football-field area: estimate the result in litres using the real-world facts below.",
      "unit": "litres",
      "factors": [
        {
          "label": "Football-field area",
          "unit": "square feet",
          "value": 57600,
          "display": "57,600",
          "desc": "Full field including end zones.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "field_dust_volume_f0",
          "playDesc": "Full field including end zones."
        },
        {
          "label": "Layer depth",
          "unit": "feet",
          "value": 0.0026041666666666665,
          "display": "1/384",
          "desc": "One thirty-second inch expressed in feet.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "field_dust_volume_f1",
          "playDesc": "One thirty-second inch expressed in feet."
        },
        {
          "label": "Litres per cubic foot",
          "unit": "litres per cubic foot",
          "value": 28.3168,
          "display": "28.3168",
          "desc": "Defined volume conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "field_dust_volume_f2",
          "playDesc": "The number of litres corresponding to one cubic foot."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "answer": 4247.52,
      "answerDisplay": "4,247.5",
      "explain": "Area times depth gives cubic feet; convert to litres.",
      "revealQ": "How many litres are in a one-thirty-second-inch layer across a 57,600-square-foot football field?",
      "sources": [
        {
          "label": "Defined mathematical relationship",
          "url": "https://www.nist.gov/pml/special-publication-811",
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
      "id": "warehouse_mass",
      "q": "Warehouse floor area: estimate the result in kilograms using the real-world facts below.",
      "unit": "kilograms",
      "factors": [
        {
          "label": "Warehouse floor area",
          "unit": "square metres",
          "value": 1000,
          "display": "1,000",
          "desc": "A real industrial-space comparison area.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "warehouse_mass_f0",
          "playDesc": "A real industrial-space comparison area."
        },
        {
          "label": "Dust-layer depth",
          "unit": "metres",
          "value": 0.0008,
          "display": "0.0008",
          "desc": "A sub-millimetre layer expressed in metres.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "warehouse_mass_f1",
          "playDesc": "A sub-millimetre layer expressed in metres."
        },
        {
          "label": "Settled-dust density",
          "unit": "kilograms per cubic metre",
          "value": 600,
          "display": "600",
          "desc": "Representative bulk density for an order-of-magnitude calculation.",
          "source": {
            "label": "OSHA — combustible dust",
            "url": "https://www.osha.gov/combustible-dust",
            "accessed": "2026-07-18"
          },
          "id": "warehouse_mass_f2",
          "playDesc": "Representative bulk density for an order-of-magnitude calculation."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "answer": 480,
      "answerDisplay": "480",
      "explain": "Area times depth gives volume; multiply by bulk density.",
      "revealQ": "What mass is a 0.8-millimetre layer over 1,000 square metres at 600 kilograms per cubic metre?",
      "sources": [
        {
          "label": "Defined mathematical relationship",
          "url": "https://www.nist.gov/pml/special-publication-811",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        },
        {
          "label": "OSHA — combustible dust",
          "url": "https://www.osha.gov/combustible-dust",
          "accessed": "2026-07-18"
        }
      ]
    }
  ],
  "sourceSummary": "Every playable value is linked to an official, institutional, scholarly, or defined-conversion source in the reveal."
} };
