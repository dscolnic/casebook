module.exports = { PACK: {
  "id": "bp_gmtroy",
  "title": "Troy, Homer, and the Bronze Age",
  "casebookTitle": "The Fall of Ilios",
  "tag": "Troy · Homer · archaeology",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Epic",
      "Long narrative poem about heroic events."
    ],
    [
      "Book",
      "Major division of an ancient epic."
    ],
    [
      "Catalogue of Ships",
      "Iliad passage listing Greek contingents."
    ],
    [
      "Troy VI",
      "Major Late Bronze Age settlement layer at Hisarlık."
    ]
  ],
  "eqs": [
    {
      "id": "iliad_book",
      "q": "Iliad lines: estimate the result in lines per book using the real-world facts below.",
      "unit": "lines per book",
      "factors": [
        {
          "label": "Iliad lines",
          "unit": "lines",
          "value": 15693,
          "display": "15,693",
          "desc": "Traditional Greek text line count.",
          "source": {
            "label": "Perseus Digital Library — Iliad",
            "url": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0133",
            "accessed": "2026-07-18"
          },
          "id": "iliad_book_f0",
          "playDesc": "Traditional Greek text line count."
        },
        {
          "label": "Iliad books",
          "unit": "books",
          "value": 24,
          "display": "24",
          "desc": "Canonical division count.",
          "source": {
            "label": "Perseus Digital Library — Iliad",
            "url": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0133",
            "accessed": "2026-07-18"
          },
          "id": "iliad_book_f1",
          "playDesc": "Canonical division count."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 653.875,
      "answerDisplay": "653.88",
      "explain": "Divide total lines by books.",
      "revealQ": "How many lines per book are in a 15,693-line Iliad divided into twenty-four books?",
      "sources": [
        {
          "label": "Perseus Digital Library — Iliad",
          "url": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0133",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "war_months",
      "q": "Traditional war duration: estimate the result in months using the real-world facts below.",
      "unit": "months",
      "factors": [
        {
          "label": "Traditional war duration",
          "unit": "years",
          "value": 10,
          "display": "10",
          "desc": "Epic tradition.",
          "source": {
            "label": "Perseus Digital Library — Iliad",
            "url": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0133",
            "accessed": "2026-07-18"
          },
          "id": "war_months_f0",
          "playDesc": "Epic tradition."
        },
        {
          "label": "Months per year",
          "unit": "months per year",
          "value": 12,
          "display": "12",
          "desc": "Defined calendar conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "war_months_f1",
          "playDesc": "The number of months corresponding to one year."
        }
      ],
      "ops": [
        "×"
      ],
      "explain": "Convert years to months.",
      "answer": 120,
      "answerDisplay": "≈ 120",
      "sources": [
        {
          "label": "Perseus Digital Library — Iliad",
          "url": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0133",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many months are in the traditional ten-year Trojan War?"
    },
    {
      "id": "ship_person_years",
      "q": "Achaean ships: estimate the result in warrior-years using the real-world facts below.",
      "unit": "warrior-years",
      "factors": [
        {
          "label": "Achaean ships",
          "unit": "ships",
          "value": 1186,
          "display": "1,186",
          "desc": "Catalogue of Ships traditional total.",
          "source": {
            "label": "Perseus Digital Library — Iliad",
            "url": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0133",
            "accessed": "2026-07-18"
          },
          "id": "ship_person_years_f0",
          "playDesc": "Catalogue of Ships traditional total."
        },
        {
          "label": "Warriors per ship",
          "unit": "warriors per ship",
          "value": 50,
          "display": "50",
          "desc": "Common literary scale for crew and fighters.",
          "source": {
            "label": "Perseus Digital Library — Iliad",
            "url": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0133",
            "accessed": "2026-07-18"
          },
          "id": "ship_person_years_f1",
          "playDesc": "Common literary scale for crew and fighters."
        },
        {
          "label": "Completed campaign years",
          "unit": "years",
          "value": 9,
          "display": "9",
          "desc": "The Iliad is traditionally set in the war’s tenth year.",
          "source": {
            "label": "Perseus Digital Library — Iliad",
            "url": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0133",
            "accessed": "2026-07-18"
          },
          "id": "ship_person_years_f2",
          "playDesc": "The Iliad is traditionally set in the war’s tenth year."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "explain": "Multiply ships, warriors per ship, and completed campaign years.",
      "answer": 533700,
      "answerDisplay": "≈ 533,700",
      "sources": [
        {
          "label": "Perseus Digital Library — Iliad",
          "url": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0133",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many warrior-years are represented by 1,186 ships, fifty warriors per ship, and nine completed campaign years?"
    },
    {
      "id": "wall_volume",
      "q": "Troy VI wall circuit segment: estimate the result in cubic metres using the real-world facts below.",
      "unit": "cubic metres",
      "factors": [
        {
          "label": "Troy VI wall circuit segment",
          "unit": "metres",
          "value": 550,
          "display": "550",
          "desc": "Archaeological wall-circuit scale.",
          "source": {
            "label": "UNESCO — Archaeological Site of Troy",
            "url": "https://whc.unesco.org/en/list/849/",
            "accessed": "2026-07-18"
          },
          "id": "wall_volume_f0",
          "playDesc": "Archaeological wall-circuit scale."
        },
        {
          "label": "Wall height",
          "unit": "metres",
          "value": 8,
          "display": "8",
          "desc": "Reconstructed fortification height scale.",
          "source": {
            "label": "UNESCO — Archaeological Site of Troy",
            "url": "https://whc.unesco.org/en/list/849/",
            "accessed": "2026-07-18"
          },
          "id": "wall_volume_f1",
          "playDesc": "Reconstructed fortification height scale."
        },
        {
          "label": "Wall thickness",
          "unit": "metres",
          "value": 5,
          "display": "5",
          "desc": "Fortification thickness scale.",
          "source": {
            "label": "UNESCO — Archaeological Site of Troy",
            "url": "https://whc.unesco.org/en/list/849/",
            "accessed": "2026-07-18"
          },
          "id": "wall_volume_f2",
          "playDesc": "Fortification thickness scale."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "answer": 22000,
      "answerDisplay": "22,000",
      "explain": "Length times height times thickness gives masonry volume.",
      "revealQ": "What wall volume follows from 550 metres of wall, eight metres high, and five metres thick?",
      "sources": [
        {
          "label": "UNESCO — Archaeological Site of Troy",
          "url": "https://whc.unesco.org/en/list/849/",
          "accessed": "2026-07-18"
        }
      ]
    }
  ],
  "sourceSummary": "Every playable value is linked to an official, institutional, scholarly, or defined-conversion source in the reveal."
} };
