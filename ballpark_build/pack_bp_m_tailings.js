module.exports = { PACK: {
  "id": "bp_m_tailings",
  "title": "The Brumadinho Tailings Disaster",
  "casebookTitle": "The Serra Verde Tailings Dam",
  "tag": "tailings · liquefaction · runout",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Tailings",
      "Fine waste left after minerals are separated from ore."
    ],
    [
      "Mobilized volume",
      "Material that actually moved after failure."
    ],
    [
      "Runout",
      "Distance traveled by a landslide or debris flow."
    ],
    [
      "Hectare",
      "A land area of ten thousand square metres."
    ]
  ],
  "eqs": [
    {
      "id": "mobilized_volume",
      "q": "Stored tailings volume: estimate the result in cubic metres using the real-world facts below.",
      "unit": "cubic metres",
      "factors": [
        {
          "label": "Stored tailings volume",
          "unit": "cubic metres",
          "value": 12000000,
          "display": "12,000,000",
          "desc": "Reported inventory scale.",
          "source": {
            "label": "Government of Minas Gerais — Brumadinho facts",
            "url": "https://www.mg.gov.br/pro-brumadinho/pagina/historico-do-rompimento-das-barragens-da-vale-na-mina-corrego-do-feijao",
            "accessed": "2026-07-18"
          },
          "id": "mobilized_volume_f0",
          "playDesc": "Reported inventory scale."
        },
        {
          "label": "Mobilized fraction",
          "unit": "fraction",
          "value": 0.8,
          "display": "0.8",
          "desc": "Reported fraction mobilized.",
          "source": {
            "label": "Government of Minas Gerais — Brumadinho facts",
            "url": "https://www.mg.gov.br/pro-brumadinho/pagina/historico-do-rompimento-das-barragens-da-vale-na-mina-corrego-do-feijao",
            "accessed": "2026-07-18"
          },
          "id": "mobilized_volume_f1",
          "playDesc": "Reported fraction mobilized."
        }
      ],
      "ops": [
        "×"
      ],
      "explain": "Multiply inventory by mobilized fraction.",
      "answer": 9600000,
      "answerDisplay": "≈ 9,600,000",
      "sources": [
        {
          "label": "Government of Minas Gerais — Brumadinho facts",
          "url": "https://www.mg.gov.br/pro-brumadinho/pagina/historico-do-rompimento-das-barragens-da-vale-na-mina-corrego-do-feijao",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How much of a twelve-million-cubic-metre tailings inventory was mobilized if eighty percent escaped?"
    },
    {
      "id": "deposit_area",
      "q": "Affected area: estimate the result in square metres using the real-world facts below.",
      "unit": "square metres",
      "factors": [
        {
          "label": "Affected area",
          "unit": "hectares",
          "value": 290,
          "display": "290",
          "desc": "Reported affected area.",
          "source": {
            "label": "Government of Minas Gerais — Brumadinho facts",
            "url": "https://www.mg.gov.br/pro-brumadinho/pagina/historico-do-rompimento-das-barragens-da-vale-na-mina-corrego-do-feijao",
            "accessed": "2026-07-18"
          },
          "id": "deposit_area_f0",
          "playDesc": "Reported affected area."
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
          "id": "deposit_area_f1",
          "playDesc": "The number of square metres corresponding to one hectare."
        }
      ],
      "ops": [
        "×"
      ],
      "explain": "Convert hectares to square metres.",
      "answer": 2900000,
      "answerDisplay": "≈ 2,900,000",
      "sources": [
        {
          "label": "Government of Minas Gerais — Brumadinho facts",
          "url": "https://www.mg.gov.br/pro-brumadinho/pagina/historico-do-rompimento-das-barragens-da-vale-na-mina-corrego-do-feijao",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many square metres are in a 290-hectare affected area?"
    },
    {
      "id": "tanker_loads",
      "q": "Tailings volume: estimate the result in tanker loads using the real-world facts below.",
      "unit": "tanker loads",
      "factors": [
        {
          "label": "Tailings volume",
          "unit": "cubic metres",
          "value": 12200000,
          "display": "12,200,000",
          "desc": "Reported released-volume scale.",
          "source": {
            "label": "Government of Minas Gerais — Brumadinho facts",
            "url": "https://www.mg.gov.br/pro-brumadinho/pagina/historico-do-rompimento-das-barragens-da-vale-na-mina-corrego-do-feijao",
            "accessed": "2026-07-18"
          },
          "id": "tanker_loads_f0",
          "playDesc": "Reported released-volume scale."
        },
        {
          "label": "U.S. gallons per cubic metre",
          "unit": "gallons per cubic metre",
          "value": 264.172,
          "display": "264.172",
          "desc": "Defined volume conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "tanker_loads_f1",
          "playDesc": "The conversion factor from one cubic metre to u.s. gallons."
        },
        {
          "label": "Tanker capacity",
          "unit": "gallons per tanker",
          "value": 8000,
          "display": "8,000",
          "desc": "A standard large tanker comparison capacity.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "tanker_loads_f2",
          "playDesc": "A standard large tanker comparison capacity."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "explain": "Convert volume to gallons and divide by tanker capacity.",
      "answer": 402862.30000000005,
      "answerDisplay": "≈ 402,862.3",
      "sources": [
        {
          "label": "Government of Minas Gerais — Brumadinho facts",
          "url": "https://www.mg.gov.br/pro-brumadinho/pagina/historico-do-rompimento-das-barragens-da-vale-na-mina-corrego-do-feijao",
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
      "revealQ": "How many eight-thousand-gallon tanker loads equal 12.2 million cubic metres?"
    },
    {
      "id": "runout_speed",
      "q": "Runout distance: estimate the result in metres per second using the real-world facts below.",
      "unit": "metres per second",
      "factors": [
        {
          "label": "Runout distance",
          "unit": "kilometres",
          "value": 7,
          "display": "7",
          "desc": "Documented runout scale.",
          "source": {
            "label": "Government of Minas Gerais — Brumadinho facts",
            "url": "https://www.mg.gov.br/pro-brumadinho/pagina/historico-do-rompimento-das-barragens-da-vale-na-mina-corrego-do-feijao",
            "accessed": "2026-07-18"
          },
          "id": "runout_speed_f0",
          "playDesc": "Documented runout scale."
        },
        {
          "label": "Metres per kilometre",
          "unit": "metres per kilometre",
          "value": 1000,
          "display": "1,000",
          "desc": "Defined metric conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "runout_speed_f1",
          "playDesc": "The number of metres corresponding to one kilometre."
        },
        {
          "label": "Travel time",
          "unit": "seconds",
          "value": 300,
          "display": "300",
          "desc": "Five minutes expressed in seconds.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "runout_speed_f2",
          "playDesc": "Five minutes expressed in seconds."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "explain": "Convert kilometres to metres and divide by seconds.",
      "answer": 23.333333333333332,
      "answerDisplay": "≈ 23.3",
      "sources": [
        {
          "label": "Government of Minas Gerais — Brumadinho facts",
          "url": "https://www.mg.gov.br/pro-brumadinho/pagina/historico-do-rompimento-das-barragens-da-vale-na-mina-corrego-do-feijao",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "What average speed corresponds to a seven-kilometre runout completed in five minutes?"
    }
  ],
  "sourceSummary": "Every playable value is linked to an official, institutional, scholarly, or defined-conversion source in the reveal."
} };
