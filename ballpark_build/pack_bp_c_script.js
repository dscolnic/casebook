module.exports = { PACK: {
  "id": "bp_c_script",
  "title": "Deciphering Ancient Scripts",
  "casebookTitle": "The Karnos Tablets",
  "tag": "linguistics · inscriptions · decipherment",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Bilingual inscription",
      "Text presenting the same message in more than one language."
    ],
    [
      "Hieroglyph",
      "Pictorial sign in ancient Egyptian writing."
    ],
    [
      "Linear B",
      "Syllabic script used for Mycenaean Greek."
    ],
    [
      "Corpus",
      "Collection of texts studied together."
    ]
  ],
  "eqs": [
    {
      "id": "tablets_per_sign",
      "q": "Linear B tablets: estimate the result in tablets per sign using the real-world facts below.",
      "unit": "tablets per sign",
      "factors": [
        {
          "label": "Linear B tablets",
          "unit": "tablets",
          "value": 3000,
          "display": "3,000",
          "desc": "Corpus scale.",
          "source": {
            "label": "University of Cambridge — Linear B",
            "url": "https://www.classics.cam.ac.uk/research/projects/mycenaean-epigraphy-group",
            "accessed": "2026-07-18"
          },
          "id": "tablets_per_sign_f0",
          "playDesc": "Corpus scale."
        },
        {
          "label": "Common syllabic signs",
          "unit": "signs",
          "value": 90,
          "display": "90",
          "desc": "Approximate core sign inventory.",
          "source": {
            "label": "University of Cambridge — Linear B",
            "url": "https://www.classics.cam.ac.uk/research/projects/mycenaean-epigraphy-group",
            "accessed": "2026-07-18"
          },
          "id": "tablets_per_sign_f1",
          "playDesc": "Approximate core sign inventory."
        }
      ],
      "ops": [
        "÷"
      ],
      "explain": "Divide tablet count by sign count.",
      "answer": 33.333333333333336,
      "answerDisplay": "≈ 33.3",
      "sources": [
        {
          "label": "University of Cambridge — Linear B",
          "url": "https://www.classics.cam.ac.uk/research/projects/mycenaean-epigraphy-group",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many Linear B tablets correspond to each of ninety commonly used syllabic signs in a three-thousand-tablet corpus?"
    },
    {
      "id": "weight_per_script",
      "q": "Rosetta Stone mass: estimate the result in kilograms per script using the real-world facts below.",
      "unit": "kilograms per script",
      "factors": [
        {
          "label": "Rosetta Stone mass",
          "unit": "kilograms",
          "value": 760,
          "display": "760",
          "desc": "British Museum catalog mass.",
          "source": {
            "label": "British Museum — Rosetta Stone",
            "url": "https://www.britishmuseum.org/collection/object/Y_EA24",
            "accessed": "2026-07-18"
          },
          "id": "weight_per_script_f0",
          "playDesc": "British Museum catalog mass."
        },
        {
          "label": "Scripts on the stone",
          "unit": "scripts",
          "value": 3,
          "display": "3",
          "desc": "Hieroglyphic, Demotic, and Greek.",
          "source": {
            "label": "British Museum — Rosetta Stone",
            "url": "https://www.britishmuseum.org/collection/object/Y_EA24",
            "accessed": "2026-07-18"
          },
          "id": "weight_per_script_f1",
          "playDesc": "Hieroglyphic, Demotic, and Greek."
        }
      ],
      "ops": [
        "÷"
      ],
      "explain": "Divide the stone’s mass by its three scripts as a scale comparison.",
      "answer": 253.33333333333334,
      "answerDisplay": "≈ 253.3",
      "sources": [
        {
          "label": "British Museum — Rosetta Stone",
          "url": "https://www.britishmuseum.org/collection/object/Y_EA24",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many kilograms of Rosetta Stone mass correspond to each of its three scripts?"
    },
    {
      "id": "rosetta_lines",
      "q": "Hieroglyphic lines: estimate the result in lines using the real-world facts below.",
      "unit": "lines",
      "factors": [
        {
          "label": "Hieroglyphic lines",
          "unit": "lines",
          "value": 14,
          "display": "14",
          "desc": "Preserved line count.",
          "source": {
            "label": "British Museum — Rosetta Stone",
            "url": "https://www.britishmuseum.org/collection/object/Y_EA24",
            "accessed": "2026-07-18"
          },
          "id": "rosetta_lines_f0",
          "playDesc": "The hieroglyphic lines documented or defined by British Museum — Rosetta Stone."
        },
        {
          "label": "Demotic lines",
          "unit": "lines",
          "value": 32,
          "display": "32",
          "desc": "Preserved line count.",
          "source": {
            "label": "British Museum — Rosetta Stone",
            "url": "https://www.britishmuseum.org/collection/object/Y_EA24",
            "accessed": "2026-07-18"
          },
          "id": "rosetta_lines_f1",
          "playDesc": "The demotic lines documented or defined by British Museum — Rosetta Stone."
        },
        {
          "label": "Greek lines",
          "unit": "lines",
          "value": 54,
          "display": "54",
          "desc": "Preserved line count.",
          "source": {
            "label": "British Museum — Rosetta Stone",
            "url": "https://www.britishmuseum.org/collection/object/Y_EA24",
            "accessed": "2026-07-18"
          },
          "id": "rosetta_lines_f2",
          "playDesc": "The greek lines documented or defined by British Museum — Rosetta Stone."
        }
      ],
      "ops": [
        "+",
        "+"
      ],
      "explain": "Add the line counts from the three scripts.",
      "answer": 100,
      "answerDisplay": "≈ 100",
      "sources": [
        {
          "label": "British Museum — Rosetta Stone",
          "url": "https://www.britishmuseum.org/collection/object/Y_EA24",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many total lines are in sections containing fourteen hieroglyphic, thirty-two Demotic, and fifty-four Greek lines?"
    },
    {
      "id": "stone_area",
      "q": "Stone height: estimate the result in square metres using the real-world facts below.",
      "unit": "square metres",
      "factors": [
        {
          "label": "Stone height",
          "unit": "centimetres",
          "value": 112.3,
          "display": "112.3",
          "desc": "British Museum dimension.",
          "source": {
            "label": "British Museum — Rosetta Stone",
            "url": "https://www.britishmuseum.org/collection/object/Y_EA24",
            "accessed": "2026-07-18"
          },
          "id": "stone_area_f0",
          "playDesc": "British Museum dimension."
        },
        {
          "label": "Stone width",
          "unit": "centimetres",
          "value": 75.7,
          "display": "75.7",
          "desc": "British Museum dimension.",
          "source": {
            "label": "British Museum — Rosetta Stone",
            "url": "https://www.britishmuseum.org/collection/object/Y_EA24",
            "accessed": "2026-07-18"
          },
          "id": "stone_area_f1",
          "playDesc": "British Museum dimension."
        },
        {
          "label": "Square centimetres per square metre",
          "unit": "square centimetres per square metre",
          "value": 10000,
          "display": "10,000",
          "desc": "Defined area conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "stone_area_f2",
          "playDesc": "The number of square centimetres corresponding to one square metre."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "explain": "Multiply dimensions and convert square centimetres to square metres.",
      "answer": 0.8501110000000001,
      "answerDisplay": "≈ 0.85",
      "sources": [
        {
          "label": "British Museum — Rosetta Stone",
          "url": "https://www.britishmuseum.org/collection/object/Y_EA24",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "What is the rectangular face area of a 112.3-by-75.7-centimetre Rosetta Stone, in square metres?"
    }
  ],
  "sourceSummary": "Every playable value is linked to an official, institutional, scholarly, or defined-conversion source in the reveal."
} };
