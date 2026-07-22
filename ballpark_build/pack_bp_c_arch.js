module.exports = { PACK: {
  "id": "bp_c_arch",
  "title": "Archaeology and Scientific Dating",
  "casebookTitle": "The Cranmoor Skull",
  "tag": "archaeology · radiocarbon · excavation",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Half-life",
      "Time required for half of a radioactive isotope to decay."
    ],
    [
      "Stratigraphy",
      "Study of layered deposits and their sequence."
    ],
    [
      "Context",
      "An artifact’s position and relationship to surrounding material."
    ],
    [
      "Hectare",
      "Ten thousand square metres."
    ]
  ],
  "eqs": [
    {
      "id": "otzi_halflives",
      "q": "Ötzi age: estimate the result in half-lives using the real-world facts below.",
      "unit": "half-lives",
      "factors": [
        {
          "label": "Ötzi age",
          "unit": "years",
          "value": 5300,
          "display": "5,300",
          "desc": "Approximate archaeological age.",
          "source": {
            "label": "Oxford Radiocarbon Accelerator Unit — radiocarbon dating",
            "url": "https://www.arch.ox.ac.uk/radiocarbon-dating",
            "accessed": "2026-07-18"
          },
          "id": "otzi_halflives_f0",
          "playDesc": "Approximate archaeological age."
        },
        {
          "label": "Carbon-14 half-life",
          "unit": "years per half-life",
          "value": 5730,
          "display": "5,730",
          "desc": "Accepted radiocarbon half-life scale.",
          "source": {
            "label": "Oxford Radiocarbon Accelerator Unit — radiocarbon dating",
            "url": "https://www.arch.ox.ac.uk/radiocarbon-dating",
            "accessed": "2026-07-18"
          },
          "id": "otzi_halflives_f1",
          "playDesc": "Accepted radiocarbon half-life scale."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 0.924956369982548,
      "answerDisplay": "0.925",
      "explain": "Divide age by half-life.",
      "revealQ": "How many carbon-14 half-lives old is a 5,300-year-old mummy?",
      "sources": [
        {
          "label": "Oxford Radiocarbon Accelerator Unit — radiocarbon dating",
          "url": "https://www.arch.ox.ac.uk/radiocarbon-dating",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "pompeii_area",
      "q": "Pompeii archaeological area: estimate the result in square metres using the real-world facts below.",
      "unit": "square metres",
      "factors": [
        {
          "label": "Pompeii archaeological area",
          "unit": "hectares",
          "value": 66,
          "display": "66",
          "desc": "Published site area.",
          "source": {
            "label": "Pompeii Archaeological Park — site facts",
            "url": "https://pompeiisites.org/en/archaeological-site/",
            "accessed": "2026-07-18"
          },
          "id": "pompeii_area_f0",
          "playDesc": "Published site area."
        },
        {
          "label": "Square metres per hectare",
          "unit": "square metres per hectare",
          "value": 10000,
          "display": "10,000",
          "desc": "Defined area conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "pompeii_area_f1",
          "playDesc": "The number of square metres corresponding to one hectare."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 660000,
      "answerDisplay": "660,000",
      "explain": "Convert hectares to square metres.",
      "revealQ": "How many square metres are in Pompeii’s sixty-six hectares?",
      "sources": [
        {
          "label": "Pompeii Archaeological Park — site facts",
          "url": "https://pompeiisites.org/en/archaeological-site/",
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
      "id": "tut_objects",
      "q": "Tutankhamun objects: estimate the result in objects per day using the real-world facts below.",
      "unit": "objects per day",
      "factors": [
        {
          "label": "Tutankhamun objects",
          "unit": "objects",
          "value": 5398,
          "display": "5,398",
          "desc": "Published catalogued-object scale.",
          "source": {
            "label": "British Museum — Rosetta Stone",
            "url": "https://www.britishmuseum.org/collection/object/Y_EA24",
            "accessed": "2026-07-18"
          },
          "id": "tut_objects_f0",
          "playDesc": "Published catalogued-object scale."
        },
        {
          "label": "Cataloguing period",
          "unit": "years",
          "value": 10,
          "display": "10",
          "desc": "Comparison work period.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "tut_objects_f1",
          "playDesc": "Comparison work period."
        },
        {
          "label": "Days per year",
          "unit": "days",
          "value": 365,
          "display": "365",
          "desc": "Calendar conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "tut_objects_f2",
          "playDesc": "The number of days corresponding to one year."
        }
      ],
      "ops": [
        "÷",
        "÷"
      ],
      "answer": 1.478904109589041,
      "answerDisplay": "1.479",
      "explain": "Divide objects by years and days.",
      "revealQ": "If 5,398 catalogued objects were processed over ten years, what was the daily average?",
      "sources": [
        {
          "label": "British Museum — Rosetta Stone",
          "url": "https://www.britishmuseum.org/collection/object/Y_EA24",
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
      "id": "carbon_remaining",
      "q": "Starting carbon-14 atoms: estimate the result in atoms using the real-world facts below.",
      "unit": "atoms",
      "factors": [
        {
          "label": "Starting carbon-14 atoms",
          "unit": "atoms",
          "value": 1000000,
          "display": "1,000,000",
          "desc": "A defined starting sample for the comparison.",
          "source": {
            "label": "Oxford Radiocarbon Accelerator Unit — radiocarbon dating",
            "url": "https://www.arch.ox.ac.uk/radiocarbon-dating",
            "accessed": "2026-07-18"
          },
          "id": "carbon_remaining_f0",
          "playDesc": "The starting number of carbon-14 atoms in the decay comparison."
        },
        {
          "label": "Percentage remaining after two half-lives",
          "unit": "percent",
          "value": 25,
          "display": "25",
          "desc": "One quarter remains after two half-lives.",
          "source": {
            "label": "Oxford Radiocarbon Accelerator Unit — radiocarbon dating",
            "url": "https://www.arch.ox.ac.uk/radiocarbon-dating",
            "accessed": "2026-07-18"
          },
          "id": "carbon_remaining_f1",
          "playDesc": "One quarter remains after two half-lives."
        },
        {
          "label": "Percent denominator",
          "unit": "percent",
          "value": 100,
          "display": "100",
          "desc": "Defined percent conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "carbon_remaining_f2",
          "playDesc": "The number of percentage points in one whole, used to convert a percent into a fraction."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "explain": "Apply the remaining percentage to the starting atoms.",
      "answer": 250000,
      "answerDisplay": "≈ 250,000",
      "sources": [
        {
          "label": "Oxford Radiocarbon Accelerator Unit — radiocarbon dating",
          "url": "https://www.arch.ox.ac.uk/radiocarbon-dating",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many carbon-14 atoms remain from one million after two half-lives?"
    }
  ],
  "sourceSummary": "Every playable value is linked to an official, institutional, scholarly, or defined-conversion source in the reveal."
} };
