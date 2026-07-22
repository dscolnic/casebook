module.exports = { PACK: {
  "id": "bp_c_psych",
  "title": "Classic Psychology Experiments by the Numbers",
  "casebookTitle": "The Mimicry Effect",
  "tag": "psychology · conformity · replication",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Conformity",
      "Changing behavior or judgment to match a group."
    ],
    [
      "Obedience",
      "Following an authority’s instruction."
    ],
    [
      "Critical trial",
      "Trial designed to test the experimental effect."
    ],
    [
      "Replication rate",
      "Share of repeated studies producing comparable evidence."
    ]
  ],
  "eqs": [
    {
      "id": "milgram_share",
      "q": "Maximum-setting participants: estimate the result in fraction using the real-world facts below.",
      "unit": "fraction",
      "factors": [
        {
          "label": "Maximum-setting participants",
          "unit": "people",
          "value": 26,
          "display": "26",
          "desc": "Milgram experiment count.",
          "source": {
            "label": "APA — Milgram experiment overview",
            "url": "https://www.apa.org/monitor/2009/01/milgram",
            "accessed": "2026-07-18"
          },
          "id": "milgram_share_f0",
          "playDesc": "Milgram experiment count."
        },
        {
          "label": "Total participants",
          "unit": "people",
          "value": 40,
          "display": "40",
          "desc": "Milgram sample size.",
          "source": {
            "label": "APA — Milgram experiment overview",
            "url": "https://www.apa.org/monitor/2009/01/milgram",
            "accessed": "2026-07-18"
          },
          "id": "milgram_share_f1",
          "playDesc": "Milgram sample size."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 0.65,
      "answerDisplay": "0.65",
      "explain": "Divide maximum-setting participants by total participants.",
      "revealQ": "What fraction of Milgram participants reached the maximum setting if twenty-six of forty did so?",
      "sources": [
        {
          "label": "APA — Milgram experiment overview",
          "url": "https://www.apa.org/monitor/2009/01/milgram",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "asch_share",
      "q": "Participants conforming at least once: estimate the result in fraction using the real-world facts below.",
      "unit": "fraction",
      "factors": [
        {
          "label": "Participants conforming at least once",
          "unit": "people",
          "value": 93,
          "display": "93",
          "desc": "Approximate Asch result count.",
          "source": {
            "label": "APA — Milgram experiment overview",
            "url": "https://www.apa.org/monitor/2009/01/milgram",
            "accessed": "2026-07-18"
          },
          "id": "asch_share_f0",
          "playDesc": "Approximate Asch result count."
        },
        {
          "label": "Total Asch participants",
          "unit": "people",
          "value": 123,
          "display": "123",
          "desc": "Classic experiment sample size.",
          "source": {
            "label": "APA — Milgram experiment overview",
            "url": "https://www.apa.org/monitor/2009/01/milgram",
            "accessed": "2026-07-18"
          },
          "id": "asch_share_f1",
          "playDesc": "Classic experiment sample size."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 0.7560975609756098,
      "answerDisplay": "0.7561",
      "explain": "Divide conforming participants by the sample.",
      "revealQ": "What fraction is ninety-three people out of 123 in an Asch-style conformity sample?",
      "sources": [
        {
          "label": "APA — Milgram experiment overview",
          "url": "https://www.apa.org/monitor/2009/01/milgram",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "shock_positions",
      "q": "Maximum voltage: estimate the result in positions using the real-world facts below.",
      "unit": "positions",
      "factors": [
        {
          "label": "Maximum voltage",
          "unit": "volts",
          "value": 450,
          "display": "450",
          "desc": "Milgram generator maximum.",
          "source": {
            "label": "APA — Milgram experiment overview",
            "url": "https://www.apa.org/monitor/2009/01/milgram",
            "accessed": "2026-07-18"
          },
          "id": "shock_positions_f0",
          "playDesc": "Milgram generator maximum."
        },
        {
          "label": "Voltage step",
          "unit": "volts per step",
          "value": 15,
          "display": "15",
          "desc": "Generator increment.",
          "source": {
            "label": "APA — Milgram experiment overview",
            "url": "https://www.apa.org/monitor/2009/01/milgram",
            "accessed": "2026-07-18"
          },
          "id": "shock_positions_f1",
          "playDesc": "Generator increment."
        },
        {
          "label": "Starting position",
          "unit": "positions",
          "value": 1,
          "display": "1",
          "desc": "Includes the zero setting.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "shock_positions_f2",
          "playDesc": "Includes the zero setting."
        }
      ],
      "ops": [
        "÷",
        "+"
      ],
      "answer": 31,
      "answerDisplay": "31",
      "explain": "Divide range by step size and include the starting position.",
      "revealQ": "How many switch positions are there from zero to 450 volts in fifteen-volt steps, including zero?",
      "sources": [
        {
          "label": "APA — Milgram experiment overview",
          "url": "https://www.apa.org/monitor/2009/01/milgram",
          "accessed": "2026-07-18"
        },
        {
          "label": "Defined mathematical relationship",
          "url": "https://www.nist.gov/pml/special-publication-811",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "failure_success_ratio",
      "q": "Failed replications: estimate the result in failed per 100 successful using the real-world facts below.",
      "unit": "failed per 100 successful",
      "factors": [
        {
          "label": "Failed replications",
          "unit": "studies",
          "value": 64,
          "display": "64",
          "desc": "Reproducibility Project failure count implied by reported outcomes.",
          "source": {
            "label": "Open Science Collaboration — psychology reproducibility",
            "url": "https://www.science.org/doi/10.1126/science.aac4716",
            "accessed": "2026-07-18"
          },
          "id": "failure_success_ratio_f0",
          "playDesc": "Reproducibility Project failure count implied by reported outcomes."
        },
        {
          "label": "Successful replications",
          "unit": "studies",
          "value": 36,
          "display": "36",
          "desc": "Reproducibility Project success count.",
          "source": {
            "label": "Open Science Collaboration — psychology reproducibility",
            "url": "https://www.science.org/doi/10.1126/science.aac4716",
            "accessed": "2026-07-18"
          },
          "id": "failure_success_ratio_f1",
          "playDesc": "Reproducibility Project success count."
        },
        {
          "label": "Comparison successful studies",
          "unit": "studies",
          "value": 100,
          "display": "100",
          "desc": "A one-hundred-success comparison scale.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "failure_success_ratio_f2",
          "playDesc": "A one-hundred-success comparison scale."
        }
      ],
      "ops": [
        "÷",
        "×"
      ],
      "explain": "Divide failures by successes and scale to one hundred successes.",
      "answer": 177.77777777777777,
      "answerDisplay": "≈ 177.8",
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
      "revealQ": "What is the number of failed replications per one hundred successful replications if sixty-four failed and thirty-six succeeded?"
    }
  ],
  "sourceSummary": "Every playable value is linked to an official, institutional, scholarly, or defined-conversion source in the reveal."
} };
