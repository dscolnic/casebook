module.exports = { PACK: {
  "id": "bp_w_trial",
  "title": "Clinical Trials by the Numbers",
  "casebookTitle": "The Trial Data",
  "tag": "clinical trials · efficacy · follow-up",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Randomized trial",
      "Study assigning participants to treatments by chance."
    ],
    [
      "Trial arm",
      "A participant group receiving one intervention."
    ],
    [
      "Vaccine efficacy",
      "Relative reduction in disease among vaccinated participants."
    ],
    [
      "Patient-year",
      "One participant followed for one year."
    ]
  ],
  "eqs": [
    {
      "id": "participants_site",
      "q": "Pfizer trial participants: estimate the result in participants per site using the real-world facts below.",
      "unit": "participants per site",
      "factors": [
        {
          "label": "Pfizer trial participants",
          "unit": "participants",
          "value": 43548,
          "display": "43,548",
          "desc": "FDA briefing participant count.",
          "source": {
            "label": "FDA — Pfizer-BioNTech vaccine briefing",
            "url": "https://www.fda.gov/media/144245/download",
            "accessed": "2026-07-18"
          },
          "id": "participants_site_f0",
          "playDesc": "FDA briefing participant count."
        },
        {
          "label": "Trial sites",
          "unit": "sites",
          "value": 152,
          "display": "152",
          "desc": "Reported international site count.",
          "source": {
            "label": "FDA — Pfizer-BioNTech vaccine briefing",
            "url": "https://www.fda.gov/media/144245/download",
            "accessed": "2026-07-18"
          },
          "id": "participants_site_f1",
          "playDesc": "Reported international site count."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 286.5,
      "answerDisplay": "286.5",
      "explain": "Divide participants by sites.",
      "revealQ": "How many participants per site were enrolled if 43,548 people joined across 152 sites?",
      "sources": [
        {
          "label": "FDA — Pfizer-BioNTech vaccine briefing",
          "url": "https://www.fda.gov/media/144245/download",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "severe_cases_per_10k",
      "q": "Severe placebo-group cases: estimate the result in cases per 10,000 participants using the real-world facts below.",
      "unit": "cases per 10,000 participants",
      "factors": [
        {
          "label": "Severe placebo-group cases",
          "unit": "cases",
          "value": 9,
          "display": "9",
          "desc": "FDA briefing case count.",
          "source": {
            "label": "FDA — Pfizer-BioNTech vaccine briefing",
            "url": "https://www.fda.gov/media/144245/download",
            "accessed": "2026-07-18"
          },
          "id": "severe_cases_per_10k_f0",
          "playDesc": "FDA briefing case count."
        },
        {
          "label": "Placebo participants",
          "unit": "participants",
          "value": 21728,
          "display": "21,728",
          "desc": "FDA trial-group population.",
          "source": {
            "label": "FDA — Pfizer-BioNTech vaccine briefing",
            "url": "https://www.fda.gov/media/144245/download",
            "accessed": "2026-07-18"
          },
          "id": "severe_cases_per_10k_f1",
          "playDesc": "FDA trial-group population."
        },
        {
          "label": "Comparison participants",
          "unit": "participants",
          "value": 10000,
          "display": "10,000",
          "desc": "A per-ten-thousand comparison scale.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "severe_cases_per_10k_f2",
          "playDesc": "A per-ten-thousand comparison scale."
        }
      ],
      "ops": [
        "÷",
        "×"
      ],
      "explain": "Divide severe cases by participants and scale to ten thousand.",
      "answer": 4.1421207658321055,
      "answerDisplay": "≈ 4.14",
      "sources": [
        {
          "label": "FDA — Pfizer-BioNTech vaccine briefing",
          "url": "https://www.fda.gov/media/144245/download",
          "accessed": "2026-07-18"
        },
        {
          "label": "Defined mathematical relationship",
          "url": "https://www.nist.gov/pml/special-publication-811",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many severe placebo-group cases occurred per ten thousand placebo participants?"
    },
    {
      "id": "efficacy_percent",
      "q": "Cases prevented relative to placebo: estimate the result in percent using the real-world facts below.",
      "unit": "percent",
      "factors": [
        {
          "label": "Cases prevented relative to placebo",
          "unit": "cases",
          "value": 162,
          "display": "162",
          "desc": "Difference between placebo and vaccine case counts.",
          "source": {
            "label": "FDA — Pfizer-BioNTech vaccine briefing",
            "url": "https://www.fda.gov/media/144245/download",
            "accessed": "2026-07-18"
          },
          "id": "efficacy_percent_f0",
          "playDesc": "Difference between placebo and vaccine case counts."
        },
        {
          "label": "Placebo-group cases",
          "unit": "cases",
          "value": 170,
          "display": "170",
          "desc": "FDA briefing symptomatic case count.",
          "source": {
            "label": "FDA — Pfizer-BioNTech vaccine briefing",
            "url": "https://www.fda.gov/media/144245/download",
            "accessed": "2026-07-18"
          },
          "id": "efficacy_percent_f1",
          "playDesc": "FDA briefing symptomatic case count."
        },
        {
          "label": "Percent scale",
          "unit": "percent",
          "value": 100,
          "display": "100",
          "desc": "Defined percent conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "efficacy_percent_f2",
          "playDesc": "The number of percentage points in one whole."
        }
      ],
      "ops": [
        "÷",
        "×"
      ],
      "explain": "Divide cases prevented by placebo cases and convert to percent.",
      "answer": 95.29411764705881,
      "answerDisplay": "≈ 95.3",
      "sources": [
        {
          "label": "FDA — Pfizer-BioNTech vaccine briefing",
          "url": "https://www.fda.gov/media/144245/download",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "What efficacy percentage follows from 162 fewer cases out of 170 placebo-group cases?"
    },
    {
      "id": "moderna_patient_years",
      "q": "Trial participants: estimate the result in patient-years using the real-world facts below.",
      "unit": "patient-years",
      "factors": [
        {
          "label": "Trial participants",
          "unit": "participants",
          "value": 30420,
          "display": "30,420",
          "desc": "Large phase-three trial scale.",
          "source": {
            "label": "FDA — Pfizer-BioNTech vaccine briefing",
            "url": "https://www.fda.gov/media/144245/download",
            "accessed": "2026-07-18"
          },
          "id": "moderna_patient_years_f0",
          "playDesc": "Large phase-three trial scale."
        },
        {
          "label": "Mean follow-up",
          "unit": "years per participant",
          "value": 0.16666666666666666,
          "display": "0.166667",
          "desc": "Two months expressed as a fraction of a year.",
          "source": {
            "label": "FDA — Pfizer-BioNTech vaccine briefing",
            "url": "https://www.fda.gov/media/144245/download",
            "accessed": "2026-07-18"
          },
          "id": "moderna_patient_years_f1",
          "playDesc": "Two months expressed as a fraction of a year."
        }
      ],
      "ops": [
        "×"
      ],
      "explain": "Multiply participants by mean follow-up.",
      "answer": 5070,
      "answerDisplay": "≈ 5,070",
      "sources": [
        {
          "label": "FDA — Pfizer-BioNTech vaccine briefing",
          "url": "https://www.fda.gov/media/144245/download",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many patient-years result from 30,420 participants followed for an average of one-sixth of a year?"
    }
  ],
  "sourceSummary": "Every playable value is linked to an official, institutional, scholarly, or defined-conversion source in the reveal."
} };
