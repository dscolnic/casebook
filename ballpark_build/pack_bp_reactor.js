module.exports = { PACK: {
  "id": "bp_reactor",
  "title": "Nuclear Reactor Power and Decay Heat",
  "casebookTitle": "The Thornbury Reactor",
  "tag": "nuclear power · fission · decay heat",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Thermal power",
      "Rate at which a reactor produces heat."
    ],
    [
      "Electrical efficiency",
      "Fraction of thermal energy converted to electricity."
    ],
    [
      "Decay heat",
      "Heat from radioactive decay after fission stops."
    ],
    [
      "Avogadro constant",
      "Number of particles in one mole."
    ]
  ],
  "eqs": [
    {
      "id": "thermal_efficiency",
      "q": "Electrical power: estimate the result in fraction using the real-world facts below.",
      "unit": "fraction",
      "factors": [
        {
          "label": "Electrical power",
          "unit": "megawatts",
          "value": 1100,
          "display": "1,100",
          "desc": "Common large-reactor electric output scale.",
          "source": {
            "label": "U.S. NRC — reactor concepts",
            "url": "https://www.nrc.gov/reading-rm/basic-ref/students/for-educators/01.pdf",
            "accessed": "2026-07-18"
          },
          "id": "thermal_efficiency_f0",
          "playDesc": "Common large-reactor electric output scale."
        },
        {
          "label": "Thermal power",
          "unit": "megawatts thermal",
          "value": 3200,
          "display": "3,200",
          "desc": "Representative reactor thermal output.",
          "source": {
            "label": "U.S. NRC — reactor concepts",
            "url": "https://www.nrc.gov/reading-rm/basic-ref/students/for-educators/01.pdf",
            "accessed": "2026-07-18"
          },
          "id": "thermal_efficiency_f1",
          "playDesc": "Representative reactor thermal output."
        }
      ],
      "ops": [
        "÷"
      ],
      "explain": "Divide electric output by thermal input.",
      "answer": 0.34375,
      "answerDisplay": "≈ 0.344 fraction",
      "sources": [
        {
          "label": "U.S. NRC — reactor concepts",
          "url": "https://www.nrc.gov/reading-rm/basic-ref/students/for-educators/01.pdf",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "What fraction of thermal power becomes electricity in a one-gigawatt-electric, 3.2-gigawatt-thermal reactor?"
    },
    {
      "id": "fuel_mass_pounds",
      "q": "Reactor fuel mass: estimate the result in pounds using the real-world facts below.",
      "unit": "pounds",
      "factors": [
        {
          "label": "Reactor fuel mass",
          "unit": "metric tonnes",
          "value": 190,
          "display": "190",
          "desc": "Representative large-reactor fuel inventory.",
          "source": {
            "label": "U.S. NRC — reactor concepts",
            "url": "https://www.nrc.gov/reading-rm/basic-ref/students/for-educators/01.pdf",
            "accessed": "2026-07-18"
          },
          "id": "fuel_mass_pounds_f0",
          "playDesc": "Representative large-reactor fuel inventory."
        },
        {
          "label": "Pounds per metric tonne",
          "unit": "pounds per tonne",
          "value": 2204.62,
          "display": "2204.62",
          "desc": "Defined mass conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "fuel_mass_pounds_f1",
          "playDesc": "The conversion factor from one metric tonne to pounds."
        }
      ],
      "ops": [
        "×"
      ],
      "explain": "Convert metric tonnes to pounds.",
      "answer": 418877.8,
      "answerDisplay": "≈ 418,877.8",
      "sources": [
        {
          "label": "U.S. NRC — reactor concepts",
          "url": "https://www.nrc.gov/reading-rm/basic-ref/students/for-educators/01.pdf",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many pounds are in 190 metric tonnes of reactor fuel?"
    },
    {
      "id": "decay_heat",
      "q": "Operating thermal power: estimate the result in watts using the real-world facts below.",
      "unit": "watts",
      "factors": [
        {
          "label": "Operating thermal power",
          "unit": "megawatts",
          "value": 3000,
          "display": "3,000",
          "desc": "Representative full-power thermal output.",
          "source": {
            "label": "U.S. NRC — reactor concepts",
            "url": "https://www.nrc.gov/reading-rm/basic-ref/students/for-educators/01.pdf",
            "accessed": "2026-07-18"
          },
          "id": "decay_heat_f0",
          "playDesc": "Representative full-power thermal output."
        },
        {
          "label": "Initial decay-heat fraction",
          "unit": "fraction",
          "value": 0.06,
          "display": "0.06",
          "desc": "Approximate immediate post-shutdown fraction.",
          "source": {
            "label": "U.S. NRC — reactor concepts",
            "url": "https://www.nrc.gov/reading-rm/basic-ref/students/for-educators/01.pdf",
            "accessed": "2026-07-18"
          },
          "id": "decay_heat_f1",
          "playDesc": "Approximate immediate post-shutdown fraction."
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
          "id": "decay_heat_f2",
          "playDesc": "The number of watts corresponding to one megawatt."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "explain": "Apply the decay-heat fraction and convert megawatts to watts.",
      "answer": 180000000,
      "answerDisplay": "≈ 180,000,000",
      "sources": [
        {
          "label": "U.S. NRC — reactor concepts",
          "url": "https://www.nrc.gov/reading-rm/basic-ref/students/for-educators/01.pdf",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How much decay heat is six percent of a three-thousand-megawatt reactor immediately after shutdown?"
    },
    {
      "id": "uranium_atoms",
      "q": "Uranium mass: estimate the result in atoms using the real-world facts below.",
      "unit": "atoms",
      "factors": [
        {
          "label": "Uranium mass",
          "unit": "grams",
          "value": 1000,
          "display": "1,000.0",
          "desc": "One kilogram expressed in grams.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "uranium_atoms_f0",
          "playDesc": "One kilogram expressed in grams."
        },
        {
          "label": "Molar mass of uranium-235",
          "unit": "grams per mole",
          "value": 235,
          "display": "235",
          "desc": "Isotope molar mass.",
          "source": {
            "label": "U.S. NRC — reactor concepts",
            "url": "https://www.nrc.gov/reading-rm/basic-ref/students/for-educators/01.pdf",
            "accessed": "2026-07-18"
          },
          "id": "uranium_atoms_f1",
          "playDesc": "Isotope molar mass."
        },
        {
          "label": "Avogadro constant",
          "unit": "atoms per mole",
          "value": 6.02214076e+23,
          "display": "602,214,075,999,999,987,023,872",
          "desc": "Defined SI constant.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "uranium_atoms_f2",
          "playDesc": "The number of atoms or molecules in one mole."
        }
      ],
      "ops": [
        "÷",
        "×"
      ],
      "explain": "Convert grams to moles and multiply by Avogadro’s constant.",
      "answer": 2.562613089361702e+24,
      "answerDisplay": "≈ 2,562,613,089,361,701,866,831,872",
      "sources": [
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        },
        {
          "label": "U.S. NRC — reactor concepts",
          "url": "https://www.nrc.gov/reading-rm/basic-ref/students/for-educators/01.pdf",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "Approximately how many uranium-235 atoms are in one kilogram?"
    }
  ],
  "sourceSummary": "Every playable value is linked to an official, institutional, scholarly, or defined-conversion source in the reveal."
} };
