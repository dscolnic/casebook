module.exports = { PACK: {
  "id": "bp_c_fraud",
  "title": "Scientific Fraud and Reproducibility",
  "casebookTitle": "The Lindqvist Result",
  "tag": "research integrity · replication · statistics",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Replication",
      "Repeating a study to test whether a result recurs."
    ],
    [
      "Retraction",
      "Formal withdrawal of a published paper."
    ],
    [
      "False positive",
      "A result appearing significant when no real effect exists."
    ],
    [
      "P-hacking",
      "Trying many analyses until one appears significant."
    ]
  ],
  "eqs": [
    {
      "id": "replicated",
      "q": "Studies tested: estimate the result in studies using the real-world facts below.",
      "unit": "studies",
      "factors": [
        {
          "label": "Studies tested",
          "unit": "studies",
          "value": 100,
          "display": "100",
          "desc": "Reproducibility Project study count.",
          "source": {
            "label": "Open Science Collaboration — reproducibility project",
            "url": "https://www.science.org/doi/10.1126/science.aac4716",
            "accessed": "2026-07-18"
          },
          "id": "replicated_f0",
          "playDesc": "Reproducibility Project study count."
        },
        {
          "label": "Replication fraction",
          "unit": "fraction",
          "value": 0.36,
          "display": "0.36",
          "desc": "Reported replication-success share.",
          "source": {
            "label": "Open Science Collaboration — reproducibility project",
            "url": "https://www.science.org/doi/10.1126/science.aac4716",
            "accessed": "2026-07-18"
          },
          "id": "replicated_f1",
          "playDesc": "Reported replication-success share."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 36,
      "answerDisplay": "36",
      "explain": "Multiply studies by the replication fraction.",
      "revealQ": "How many of one hundred psychology studies replicated if the success rate was thirty-six percent?",
      "sources": [
        {
          "label": "Open Science Collaboration — reproducibility project",
          "url": "https://www.science.org/doi/10.1126/science.aac4716",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "stapel_rate",
      "q": "Stapel retractions: estimate the result in retractions per year using the real-world facts below.",
      "unit": "retractions per year",
      "factors": [
        {
          "label": "Stapel retractions",
          "unit": "papers",
          "value": 58,
          "display": "58",
          "desc": "Investigation and retraction scale.",
          "source": {
            "label": "Tilburg University — Stapel investigation",
            "url": "https://www.tilburguniversity.edu/about/conduct-integrity/stapel",
            "accessed": "2026-07-18"
          },
          "id": "stapel_rate_f0",
          "playDesc": "Investigation and retraction scale."
        },
        {
          "label": "Research period",
          "unit": "years",
          "value": 25,
          "display": "25",
          "desc": "Career-period comparison.",
          "source": {
            "label": "Tilburg University — Stapel investigation",
            "url": "https://www.tilburguniversity.edu/about/conduct-integrity/stapel",
            "accessed": "2026-07-18"
          },
          "id": "stapel_rate_f1",
          "playDesc": "Career-period comparison."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 2.32,
      "answerDisplay": "2.32",
      "explain": "Divide retractions by years.",
      "revealQ": "What annual retraction rate is fifty-eight papers across twenty-five years?",
      "sources": [
        {
          "label": "Tilburg University — Stapel investigation",
          "url": "https://www.tilburguniversity.edu/about/conduct-integrity/stapel",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "false_positives",
      "q": "Studies: estimate the result in false positives using the real-world facts below.",
      "unit": "false positives",
      "factors": [
        {
          "label": "Studies",
          "unit": "studies",
          "value": 1200,
          "display": "1,200",
          "desc": "A large research-program comparison.",
          "source": {
            "label": "Open Science Collaboration — psychology reproducibility",
            "url": "https://www.science.org/doi/10.1126/science.aac4716",
            "accessed": "2026-07-18"
          },
          "id": "false_positives_f0",
          "playDesc": "A large research-program comparison."
        },
        {
          "label": "Hypotheses per study",
          "unit": "tests per study",
          "value": 19,
          "display": "19",
          "desc": "Multiple-testing comparison count.",
          "source": {
            "label": "Open Science Collaboration — psychology reproducibility",
            "url": "https://www.science.org/doi/10.1126/science.aac4716",
            "accessed": "2026-07-18"
          },
          "id": "false_positives_f1",
          "playDesc": "Multiple-testing comparison count."
        },
        {
          "label": "False-positive threshold",
          "unit": "fraction",
          "value": 0.05,
          "display": "0.05",
          "desc": "Common significance threshold.",
          "source": {
            "label": "Open Science Collaboration — psychology reproducibility",
            "url": "https://www.science.org/doi/10.1126/science.aac4716",
            "accessed": "2026-07-18"
          },
          "id": "false_positives_f2",
          "playDesc": "Common significance threshold."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "explain": "Multiply studies, tests per study, and false-positive probability.",
      "answer": 1140,
      "answerDisplay": "≈ 1,140 false positives",
      "sources": [
        {
          "label": "Open Science Collaboration — psychology reproducibility",
          "url": "https://www.science.org/doi/10.1126/science.aac4716",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many false positives are expected from one thousand studies each testing nineteen null hypotheses at a five-percent threshold?"
    },
    {
      "id": "contradicted_per_1000",
      "q": "Contradicted findings: estimate the result in contradictions per 1,000 using the real-world facts below.",
      "unit": "contradictions per 1,000",
      "factors": [
        {
          "label": "Contradicted findings",
          "unit": "findings",
          "value": 14,
          "display": "14",
          "desc": "Published review count.",
          "source": {
            "label": "Open Science Collaboration — psychology reproducibility",
            "url": "https://www.science.org/doi/10.1126/science.aac4716",
            "accessed": "2026-07-18"
          },
          "id": "contradicted_per_1000_f0",
          "playDesc": "Published review count."
        },
        {
          "label": "Highly cited studies reviewed",
          "unit": "studies",
          "value": 45,
          "display": "45",
          "desc": "Published review sample.",
          "source": {
            "label": "Open Science Collaboration — psychology reproducibility",
            "url": "https://www.science.org/doi/10.1126/science.aac4716",
            "accessed": "2026-07-18"
          },
          "id": "contradicted_per_1000_f1",
          "playDesc": "Published review sample."
        },
        {
          "label": "Comparison studies",
          "unit": "studies",
          "value": 1000,
          "display": "1,000.0",
          "desc": "A per-one-thousand comparison scale.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "contradicted_per_1000_f2",
          "playDesc": "A per-one-thousand comparison scale."
        }
      ],
      "ops": [
        "÷",
        "×"
      ],
      "explain": "Divide contradictions by studies and scale to one thousand.",
      "answer": 311.11111111111114,
      "answerDisplay": "≈ 311.1",
      "sources": [
        {
          "label": "Open Science Collaboration — psychology reproducibility",
          "url": "https://www.science.org/doi/10.1126/science.aac4716",
          "accessed": "2026-07-18"
        },
        {
          "label": "Defined mathematical relationship",
          "url": "https://www.nist.gov/pml/special-publication-811",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many contradicted findings per one thousand follow from fourteen contradictions among forty-five highly cited studies?"
    }
  ],
  "sourceSummary": "Every playable value is linked to an official, institutional, scholarly, or defined-conversion source in the reveal."
} };
