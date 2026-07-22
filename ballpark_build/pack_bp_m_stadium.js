module.exports = { PACK: {
  "id": "bp_m_stadium",
  "title": "Wembley Stadium: Structure and Crowds",
  "casebookTitle": "The Coronet Arena Roof",
  "tag": "stadiums · crowds · long-span roofs",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Capacity",
      "Maximum number of spectators."
    ],
    [
      "Arch",
      "A curved structural element carrying loads mainly through compression."
    ],
    [
      "Tier",
      "A stacked level of seating."
    ],
    [
      "Crowd service ratio",
      "Facilities available per group of spectators."
    ]
  ],
  "eqs": [
    {
      "id": "pitch_area",
      "q": "Pitch length: estimate the result in square metres using the real-world facts below.",
      "unit": "square metres",
      "factors": [
        {
          "label": "Pitch length",
          "unit": "metres",
          "value": 105,
          "display": "105",
          "desc": "Published standard pitch length.",
          "source": {
            "label": "Wembley Stadium — stadium facts",
            "url": "https://www.wembleystadium.com/about",
            "accessed": "2026-07-18"
          },
          "id": "pitch_area_f0",
          "playDesc": "The pitch length documented or defined by Wembley Stadium — stadium facts."
        },
        {
          "label": "Pitch width",
          "unit": "metres",
          "value": 68,
          "display": "68",
          "desc": "Published standard pitch width.",
          "source": {
            "label": "Wembley Stadium — stadium facts",
            "url": "https://www.wembleystadium.com/about",
            "accessed": "2026-07-18"
          },
          "id": "pitch_area_f1",
          "playDesc": "The pitch width documented or defined by Wembley Stadium — stadium facts."
        }
      ],
      "ops": [
        "×"
      ],
      "explain": "Length times width gives area.",
      "answer": 7140,
      "answerDisplay": "≈ 7,140",
      "sources": [
        {
          "label": "Wembley Stadium — stadium facts",
          "url": "https://www.wembleystadium.com/about",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "What is the playing area of Wembley Stadium’s standard football pitch?"
    },
    {
      "id": "arch_height_feet",
      "q": "Wembley arch height: estimate the result in feet using the real-world facts below.",
      "unit": "feet",
      "factors": [
        {
          "label": "Wembley arch height",
          "unit": "metres",
          "value": 133,
          "display": "133",
          "desc": "Published arch height.",
          "source": {
            "label": "Wembley Stadium — stadium facts",
            "url": "https://www.wembleystadium.com/about",
            "accessed": "2026-07-18"
          },
          "id": "arch_height_feet_f0",
          "playDesc": "Published arch height."
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
          "id": "arch_height_feet_f1",
          "playDesc": "The number of feet corresponding to one metre."
        }
      ],
      "ops": [
        "×"
      ],
      "explain": "Convert metres to feet.",
      "answer": 436.35172,
      "answerDisplay": "≈ 436.4",
      "sources": [
        {
          "label": "Wembley Stadium — stadium facts",
          "url": "https://www.wembleystadium.com/about",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How high is Wembley’s 133-metre arch in feet?"
    },
    {
      "id": "toilets_per_10k",
      "q": "Toilets in Wembley Stadium: estimate the result in toilets per 10,000 seats using the real-world facts below.",
      "unit": "toilets per 10,000 seats",
      "factors": [
        {
          "label": "Toilets in Wembley Stadium",
          "unit": "toilets",
          "value": 2618,
          "display": "2,618",
          "desc": "Published facility count.",
          "source": {
            "label": "Wembley Stadium — stadium facts",
            "url": "https://www.wembleystadium.com/about",
            "accessed": "2026-07-18"
          },
          "id": "toilets_per_10k_f0",
          "playDesc": "Published facility count."
        },
        {
          "label": "Stadium seats",
          "unit": "seats",
          "value": 90000,
          "display": "90,000",
          "desc": "Published seating capacity.",
          "source": {
            "label": "Wembley Stadium — stadium facts",
            "url": "https://www.wembleystadium.com/about",
            "accessed": "2026-07-18"
          },
          "id": "toilets_per_10k_f1",
          "playDesc": "The block of ten thousand stadium seats used to express the restroom requirement."
        },
        {
          "label": "Comparison seats",
          "unit": "seats",
          "value": 10000,
          "display": "10,000",
          "desc": "A defined comparison block of ten thousand seats.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "toilets_per_10k_f2",
          "playDesc": "The comparison seats documented or defined by Defined mathematical relationship."
        }
      ],
      "ops": [
        "÷",
        "×"
      ],
      "explain": "Divide toilets by seats and scale to ten thousand seats.",
      "answer": 290.8888888888889,
      "answerDisplay": "≈ 290.9",
      "sources": [
        {
          "label": "Wembley Stadium — stadium facts",
          "url": "https://www.wembleystadium.com/about",
          "accessed": "2026-07-18"
        },
        {
          "label": "Defined mathematical relationship",
          "url": "https://www.nist.gov/pml/special-publication-811",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many toilets does Wembley provide per ten thousand seats?"
    },
    {
      "id": "arch_mass_per_metre",
      "q": "Arch steel mass: estimate the result in kilograms per metre using the real-world facts below.",
      "unit": "kilograms per metre",
      "factors": [
        {
          "label": "Arch steel mass",
          "unit": "tonnes",
          "value": 1700,
          "display": "1,700",
          "desc": "Published arch mass.",
          "source": {
            "label": "Wembley Stadium — stadium facts",
            "url": "https://www.wembleystadium.com/about",
            "accessed": "2026-07-18"
          },
          "id": "arch_mass_per_metre_f0",
          "playDesc": "Published arch mass."
        },
        {
          "label": "Kilograms per tonne",
          "unit": "kilograms per tonne",
          "value": 1000,
          "display": "1,000",
          "desc": "Defined mass conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "arch_mass_per_metre_f1",
          "playDesc": "The number of kilograms corresponding to one tonne."
        },
        {
          "label": "Arch span",
          "unit": "metres",
          "value": 315,
          "display": "315",
          "desc": "Published arch span.",
          "source": {
            "label": "Wembley Stadium — stadium facts",
            "url": "https://www.wembleystadium.com/about",
            "accessed": "2026-07-18"
          },
          "id": "arch_mass_per_metre_f2",
          "playDesc": "Published arch span."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "explain": "Convert tonnes to kilograms and divide by span.",
      "answer": 5396.825396825397,
      "answerDisplay": "≈ 5,396.8",
      "sources": [
        {
          "label": "Wembley Stadium — stadium facts",
          "url": "https://www.wembleystadium.com/about",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "About how many kilograms of steel correspond to each metre of Wembley’s arch?"
    }
  ],
  "sourceSummary": "Every playable value is linked to an official, institutional, scholarly, or defined-conversion source in the reveal."
} };
