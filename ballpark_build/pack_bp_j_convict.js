module.exports = { PACK: {
  "id": "bp_j_convict",
  "title": "Wrongful Convictions and Exoneration",
  "casebookTitle": "The Vale Conviction",
  "tag": "criminal evidence · exoneration · due process",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Exoneration",
      "Official clearing of a person previously convicted."
    ],
    [
      "DNA evidence",
      "Genetic material used to identify or exclude people."
    ],
    [
      "Eyewitness misidentification",
      "Incorrect identification of a suspect by a witness."
    ],
    [
      "Compensation statute",
      "Law paying eligible wrongfully imprisoned people."
    ]
  ],
  "eqs": [
    {
      "id": "years_lost",
      "q": "DNA exonerations: estimate the result in years using the real-world facts below.",
      "unit": "years",
      "factors": [
        {
          "label": "DNA exonerations",
          "unit": "people",
          "value": 375,
          "display": "375",
          "desc": "Innocence Project historical count.",
          "source": {
            "label": "Innocence Project — DNA exoneration facts",
            "url": "https://innocenceproject.org/dna-exonerations-in-the-united-states/",
            "accessed": "2026-07-18"
          },
          "id": "years_lost_f0",
          "playDesc": "Innocence Project historical count."
        },
        {
          "label": "Average years served",
          "unit": "years per person",
          "value": 21,
          "display": "21",
          "desc": "Reported average time lost.",
          "source": {
            "label": "Innocence Project — DNA exoneration facts",
            "url": "https://innocenceproject.org/dna-exonerations-in-the-united-states/",
            "accessed": "2026-07-18"
          },
          "id": "years_lost_f1",
          "playDesc": "Reported average time lost."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 7875,
      "answerDisplay": "7,875",
      "explain": "Multiply people by average years.",
      "revealQ": "How many total years are represented by 375 DNA exonerations averaging twenty-one years lost?",
      "sources": [
        {
          "label": "Innocence Project — DNA exoneration facts",
          "url": "https://innocenceproject.org/dna-exonerations-in-the-united-states/",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "per_state",
      "q": "Exoneration count: estimate the result in exonerations per state using the real-world facts below.",
      "unit": "exonerations per state",
      "factors": [
        {
          "label": "Exoneration count",
          "unit": "exonerations",
          "value": 380,
          "display": "380",
          "desc": "Updated approximate national count.",
          "source": {
            "label": "Innocence Project — DNA exoneration facts",
            "url": "https://innocenceproject.org/dna-exonerations-in-the-united-states/",
            "accessed": "2026-07-18"
          },
          "id": "per_state_f0",
          "playDesc": "Updated approximate national count."
        },
        {
          "label": "States",
          "unit": "states",
          "value": 50,
          "display": "50",
          "desc": "U.S. state count.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "per_state_f1",
          "playDesc": "U.S. state count."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 7.6,
      "answerDisplay": "7.6",
      "explain": "Divide the count by states for a scale comparison.",
      "revealQ": "How many DNA exonerations per state is 380 divided among fifty states?",
      "sources": [
        {
          "label": "Innocence Project — DNA exoneration facts",
          "url": "https://innocenceproject.org/dna-exonerations-in-the-united-states/",
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
      "id": "misidentifications",
      "q": "Exonerations in analysis: estimate the result in cases using the real-world facts below.",
      "unit": "cases",
      "factors": [
        {
          "label": "Exonerations in analysis",
          "unit": "cases",
          "value": 367,
          "display": "367",
          "desc": "Historical analysis count.",
          "source": {
            "label": "Innocence Project — DNA exoneration facts",
            "url": "https://innocenceproject.org/dna-exonerations-in-the-united-states/",
            "accessed": "2026-07-18"
          },
          "id": "misidentifications_f0",
          "playDesc": "Historical analysis count."
        },
        {
          "label": "Eyewitness share",
          "unit": "percent",
          "value": 69,
          "display": "69",
          "desc": "Share involving eyewitness misidentification.",
          "source": {
            "label": "Innocence Project — DNA exoneration facts",
            "url": "https://innocenceproject.org/dna-exonerations-in-the-united-states/",
            "accessed": "2026-07-18"
          },
          "id": "misidentifications_f1",
          "playDesc": "Share involving eyewitness misidentification."
        },
        {
          "label": "Percent denominator",
          "unit": "percent",
          "value": 100,
          "display": "100",
          "desc": "Percent conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "misidentifications_f2",
          "playDesc": "The number of percentage points in one whole, used to convert a percent into a fraction."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "answer": 253.23,
      "answerDisplay": "253.23",
      "explain": "Multiply cases by the percentage and divide by one hundred.",
      "revealQ": "How many cases is sixty-nine percent of 367 DNA exonerations?",
      "sources": [
        {
          "label": "Innocence Project — DNA exoneration facts",
          "url": "https://innocenceproject.org/dna-exonerations-in-the-united-states/",
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
      "id": "compensation",
      "q": "Compensated exonerees: estimate the result in dollars using the real-world facts below.",
      "unit": "dollars",
      "factors": [
        {
          "label": "Compensated exonerees",
          "unit": "people",
          "value": 125,
          "display": "125",
          "desc": "A real-world comparison cohort.",
          "source": {
            "label": "Innocence Project — DNA exoneration facts",
            "url": "https://innocenceproject.org/dna-exonerations-in-the-united-states/",
            "accessed": "2026-07-18"
          },
          "id": "compensation_f0",
          "playDesc": "A real-world comparison cohort."
        },
        {
          "label": "Compensation per year",
          "unit": "dollars per person-year",
          "value": 50000,
          "display": "50,000",
          "desc": "Statutory-compensation scale used in some jurisdictions.",
          "source": {
            "label": "Innocence Project — DNA exoneration facts",
            "url": "https://innocenceproject.org/dna-exonerations-in-the-united-states/",
            "accessed": "2026-07-18"
          },
          "id": "compensation_f1",
          "playDesc": "Statutory-compensation scale used in some jurisdictions."
        },
        {
          "label": "Years compensated",
          "unit": "years",
          "value": 20,
          "display": "20",
          "desc": "Sentence-length comparison.",
          "source": {
            "label": "Innocence Project — DNA exoneration facts",
            "url": "https://innocenceproject.org/dna-exonerations-in-the-united-states/",
            "accessed": "2026-07-18"
          },
          "id": "compensation_f2",
          "playDesc": "Sentence-length comparison."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "explain": "Multiply people, annual compensation, and years.",
      "answer": 125000000,
      "answerDisplay": "≈ 125,000,000",
      "sources": [
        {
          "label": "Innocence Project — DNA exoneration facts",
          "url": "https://innocenceproject.org/dna-exonerations-in-the-united-states/",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "What compensation total follows from 125 exonerees receiving fifty thousand dollars per year for twenty years?"
    }
  ],
  "sourceSummary": "Every playable value is linked to an official, institutional, scholarly, or defined-conversion source in the reveal."
} };
