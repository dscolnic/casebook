module.exports = { PACK: {
  "id": "bp_m_heli",
  "title": "UH-60 Black Hawk Flight Scale",
  "casebookTitle": "The Ridgeline Rotor",
  "tag": "rotorcraft · lift · range",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Gross weight",
      "The maximum allowed aircraft weight for a specified configuration."
    ],
    [
      "Combat radius",
      "Distance an aircraft can travel out and return while completing a mission."
    ],
    [
      "Rotor diameter",
      "Distance from one blade tip to the opposite tip."
    ],
    [
      "Jet-fuel density",
      "Mass per unit volume of aviation fuel."
    ]
  ],
  "eqs": [
    {
      "id": "hover_force",
      "q": "Maximum gross weight: estimate the result in newtons using the real-world facts below.",
      "unit": "newtons",
      "factors": [
        {
          "label": "Maximum gross weight",
          "unit": "pounds-force",
          "value": 22000,
          "display": "22,000",
          "desc": "U.S. Army UH-60A/L specification.",
          "source": {
            "label": "U.S. Army — UH-60 characteristics",
            "url": "https://rdl.train.army.mil/catalog-ws/view/100.ATSC/6896A0EF-5829-402C-A74D-4A2077812A09-1438345011901/fm3_04.pdf",
            "accessed": "2026-07-18"
          },
          "id": "hover_force_f0",
          "playDesc": "U.S. Army UH-60A/L specification."
        },
        {
          "label": "Newtons per pound-force",
          "unit": "newtons per pound-force",
          "value": 4.44822,
          "display": "4.44822",
          "desc": "Defined force conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "hover_force_f1",
          "playDesc": "The conversion factor from one pound-force to newtons."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 97860.84,
      "answerDisplay": "97,860.8",
      "explain": "In hover, rotor lift must approximately balance weight.",
      "revealQ": "Approximately how many newtons of lift are required to support a 22,000-pound Black Hawk at maximum gross weight?",
      "sources": [
        {
          "label": "U.S. Army — UH-60 characteristics",
          "url": "https://rdl.train.army.mil/catalog-ws/view/100.ATSC/6896A0EF-5829-402C-A74D-4A2077812A09-1438345011901/fm3_04.pdf",
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
      "id": "combat_miles",
      "q": "Combat radius: estimate the result in miles using the real-world facts below.",
      "unit": "miles",
      "factors": [
        {
          "label": "Combat radius",
          "unit": "kilometres",
          "value": 225,
          "display": "225",
          "desc": "U.S. Army aircraft characteristic.",
          "source": {
            "label": "U.S. Army — UH-60 characteristics",
            "url": "https://rdl.train.army.mil/catalog-ws/view/100.ATSC/6896A0EF-5829-402C-A74D-4A2077812A09-1438345011901/fm3_04.pdf",
            "accessed": "2026-07-18"
          },
          "id": "combat_miles_f0",
          "playDesc": "U.S. Army aircraft characteristic."
        },
        {
          "label": "Miles per kilometre",
          "unit": "miles per kilometre",
          "value": 0.621371,
          "display": "0.621371",
          "desc": "Defined length conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "combat_miles_f1",
          "playDesc": "The number of miles corresponding to one kilometre."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 139.80847500000002,
      "answerDisplay": "139.81",
      "explain": "Convert kilometres to miles.",
      "revealQ": "How many miles is the Black Hawk’s cited 225-kilometre combat radius?",
      "sources": [
        {
          "label": "U.S. Army — UH-60 characteristics",
          "url": "https://rdl.train.army.mil/catalog-ws/view/100.ATSC/6896A0EF-5829-402C-A74D-4A2077812A09-1438345011901/fm3_04.pdf",
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
      "id": "rotor_tip_path",
      "q": "Main-rotor diameter: estimate the result in metres using the real-world facts below.",
      "unit": "metres",
      "factors": [
        {
          "label": "Main-rotor diameter",
          "unit": "feet",
          "value": 53.667,
          "display": "53.667",
          "desc": "Fifty-three feet eight inches expressed in feet.",
          "source": {
            "label": "U.S. Army — UH-60 characteristics",
            "url": "https://rdl.train.army.mil/catalog-ws/view/100.ATSC/6896A0EF-5829-402C-A74D-4A2077812A09-1438345011901/fm3_04.pdf",
            "accessed": "2026-07-18"
          },
          "id": "rotor_tip_path_f0",
          "playDesc": "Fifty-three feet eight inches expressed in feet."
        },
        {
          "label": "Pi",
          "unit": "circumference per diameter",
          "value": 3.141592653589793,
          "display": "3.1416",
          "desc": "Circular geometry constant.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "rotor_tip_path_f1",
          "playDesc": "The ratio of a circle’s circumference to its diameter."
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
          "id": "rotor_tip_path_f2",
          "playDesc": "The number of metres corresponding to one foot."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "answer": 51.389235176174004,
      "answerDisplay": "51.39",
      "explain": "Rotor circumference is diameter times pi, converted to metres.",
      "revealQ": "How many metres does a main-rotor blade tip travel in one revolution?",
      "sources": [
        {
          "label": "U.S. Army — UH-60 characteristics",
          "url": "https://rdl.train.army.mil/catalog-ws/view/100.ATSC/6896A0EF-5829-402C-A74D-4A2077812A09-1438345011901/fm3_04.pdf",
          "accessed": "2026-07-18"
        },
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
      "id": "fuel_mass",
      "q": "Internal fuel capacity: estimate the result in kilograms using the real-world facts below.",
      "unit": "kilograms",
      "factors": [
        {
          "label": "Internal fuel capacity",
          "unit": "U.S. gallons",
          "value": 362,
          "display": "362",
          "desc": "U.S. Army cited internal capacity.",
          "source": {
            "label": "U.S. Army — UH-60 characteristics",
            "url": "https://rdl.train.army.mil/catalog-ws/view/100.ATSC/6896A0EF-5829-402C-A74D-4A2077812A09-1438345011901/fm3_04.pdf",
            "accessed": "2026-07-18"
          },
          "id": "fuel_mass_f0",
          "playDesc": "U.S. Army cited internal capacity."
        },
        {
          "label": "Litres per U.S. gallon",
          "unit": "litres per gallon",
          "value": 3.78541,
          "display": "3.78541",
          "desc": "Defined volume conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "fuel_mass_f1",
          "playDesc": "The number of litres corresponding to one u.s. gallon."
        },
        {
          "label": "Representative jet-fuel density",
          "unit": "kilograms per litre",
          "value": 0.8,
          "display": "0.8",
          "desc": "A standard rounded aviation-fuel density for estimation.",
          "source": {
            "label": "U.S. Army — UH-60 characteristics",
            "url": "https://rdl.train.army.mil/catalog-ws/view/100.ATSC/6896A0EF-5829-402C-A74D-4A2077812A09-1438345011901/fm3_04.pdf",
            "accessed": "2026-07-18"
          },
          "id": "fuel_mass_f2",
          "playDesc": "A standard rounded aviation-fuel density for estimation."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "answer": 1096.254736,
      "answerDisplay": "1,096.3",
      "explain": "Convert gallons to litres and multiply by fuel density.",
      "revealQ": "About how many kilograms of fuel fit in the Black Hawk’s cited internal tanks?",
      "sources": [
        {
          "label": "U.S. Army — UH-60 characteristics",
          "url": "https://rdl.train.army.mil/catalog-ws/view/100.ATSC/6896A0EF-5829-402C-A74D-4A2077812A09-1438345011901/fm3_04.pdf",
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
