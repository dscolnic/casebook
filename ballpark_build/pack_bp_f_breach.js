module.exports = { PACK: {
  "id": "bp_f_breach",
  "title": "Major Data Breaches by the Numbers",
  "casebookTitle": "The Halcyon Data Breach",
  "tag": "cybersecurity · records · exposure",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Personal record",
      "Stored information associated with a person or account."
    ],
    [
      "Exfiltration",
      "Unauthorized transfer of data out of a system."
    ],
    [
      "Payment-card data",
      "Information used to process card transactions."
    ],
    [
      "Breach window",
      "Time between initial intrusion and containment."
    ]
  ],
  "eqs": [
    {
      "id": "settlement_per_million",
      "q": "Equifax settlement ceiling: estimate the result in dollars per million people using the real-world facts below.",
      "unit": "dollars per million people",
      "factors": [
        {
          "label": "Equifax settlement ceiling",
          "unit": "dollars",
          "value": 700000000,
          "display": "700,000,000",
          "desc": "FTC settlement ceiling.",
          "source": {
            "label": "FTC — Equifax data breach",
            "url": "https://www.ftc.gov/enforcement/refunds/equifax-data-breach-settlement",
            "accessed": "2026-07-18"
          },
          "id": "settlement_per_million_f0",
          "playDesc": "FTC settlement ceiling."
        },
        {
          "label": "People affected",
          "unit": "people",
          "value": 147000000,
          "display": "147,000,000",
          "desc": "FTC affected-population count.",
          "source": {
            "label": "FTC — Equifax data breach",
            "url": "https://www.ftc.gov/enforcement/refunds/equifax-data-breach-settlement",
            "accessed": "2026-07-18"
          },
          "id": "settlement_per_million_f1",
          "playDesc": "FTC affected-population count."
        },
        {
          "label": "Comparison people",
          "unit": "people",
          "value": 1000000,
          "display": "1,000,000",
          "desc": "One million people.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "settlement_per_million_f2",
          "playDesc": "One million people."
        }
      ],
      "ops": [
        "÷",
        "×"
      ],
      "explain": "Divide settlement by affected people and scale to one million.",
      "answer": 4761904.761904762,
      "answerDisplay": "≈ 4,761,905",
      "sources": [
        {
          "label": "FTC — Equifax data breach",
          "url": "https://www.ftc.gov/enforcement/refunds/equifax-data-breach-settlement",
          "accessed": "2026-07-18"
        },
        {
          "label": "Defined mathematical relationship",
          "url": "https://www.nist.gov/pml/special-publication-811",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many settlement dollars correspond to each million people affected in the Equifax breach?"
    },
    {
      "id": "card_fraction",
      "q": "Payment-card numbers exposed: estimate the result in fraction using the real-world facts below.",
      "unit": "fraction",
      "factors": [
        {
          "label": "Payment-card numbers exposed",
          "unit": "records",
          "value": 209000,
          "display": "209,000",
          "desc": "FTC breach detail.",
          "source": {
            "label": "FTC — Equifax data breach",
            "url": "https://www.ftc.gov/enforcement/refunds/equifax-data-breach-settlement",
            "accessed": "2026-07-18"
          },
          "id": "card_fraction_f0",
          "playDesc": "FTC breach detail."
        },
        {
          "label": "Social Security numbers exposed",
          "unit": "records",
          "value": 145500000,
          "display": "145,500,000",
          "desc": "FTC breach detail.",
          "source": {
            "label": "FTC — Equifax data breach",
            "url": "https://www.ftc.gov/enforcement/refunds/equifax-data-breach-settlement",
            "accessed": "2026-07-18"
          },
          "id": "card_fraction_f1",
          "playDesc": "FTC breach detail."
        }
      ],
      "ops": [
        "÷"
      ],
      "explain": "Divide exposed card numbers by exposed Social Security numbers.",
      "answer": 0.0014364261168384879,
      "answerDisplay": "≈ 0.00144",
      "sources": [
        {
          "label": "FTC — Equifax data breach",
          "url": "https://www.ftc.gov/enforcement/refunds/equifax-data-breach-settlement",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "What fraction of exposed Social Security numbers is represented by 209,000 exposed payment-card numbers?"
    },
    {
      "id": "record_storage",
      "q": "Records: estimate the result in gigabytes using the real-world facts below.",
      "unit": "gigabytes",
      "factors": [
        {
          "label": "Records",
          "unit": "records",
          "value": 148000000,
          "display": "148,000,000",
          "desc": "Breach-scale record count.",
          "source": {
            "label": "FTC — Equifax data breach",
            "url": "https://www.ftc.gov/enforcement/refunds/equifax-data-breach-settlement",
            "accessed": "2026-07-18"
          },
          "id": "record_storage_f0",
          "playDesc": "Breach-scale record count."
        },
        {
          "label": "Bytes per record",
          "unit": "bytes per record",
          "value": 1024,
          "display": "1,024",
          "desc": "One kibibyte per record.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "record_storage_f1",
          "playDesc": "One kibibyte per record."
        },
        {
          "label": "Bytes per gigabyte",
          "unit": "bytes per gigabyte",
          "value": 1000000000,
          "display": "1,000,000,000",
          "desc": "Defined decimal storage conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "record_storage_f2",
          "playDesc": "The number of bytes corresponding to one gigabyte."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "answer": 151.552,
      "answerDisplay": "151.55",
      "explain": "Multiply records by bytes per record and convert to gigabytes.",
      "revealQ": "How many gigabytes would 148 million one-kilobyte records occupy?",
      "sources": [
        {
          "label": "FTC — Equifax data breach",
          "url": "https://www.ftc.gov/enforcement/refunds/equifax-data-breach-settlement",
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
      "id": "breach_seconds",
      "q": "Intrusion window: estimate the result in seconds using the real-world facts below.",
      "unit": "seconds",
      "factors": [
        {
          "label": "Intrusion window",
          "unit": "days",
          "value": 77,
          "display": "77",
          "desc": "Approximate May-to-July exposure interval.",
          "source": {
            "label": "FTC — Equifax data breach",
            "url": "https://www.ftc.gov/enforcement/refunds/equifax-data-breach-settlement",
            "accessed": "2026-07-18"
          },
          "id": "breach_seconds_f0",
          "playDesc": "Approximate May-to-July exposure interval."
        },
        {
          "label": "Seconds per day",
          "unit": "seconds per day",
          "value": 86400,
          "display": "86,400",
          "desc": "Defined time conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "breach_seconds_f1",
          "playDesc": "The number of seconds corresponding to one day."
        }
      ],
      "ops": [
        "×"
      ],
      "explain": "Convert days to seconds.",
      "answer": 6652800,
      "answerDisplay": "≈ 6,652,800",
      "sources": [
        {
          "label": "FTC — Equifax data breach",
          "url": "https://www.ftc.gov/enforcement/refunds/equifax-data-breach-settlement",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many seconds are in the seventy-seven-day Equifax intrusion window?"
    }
  ],
  "sourceSummary": "Every playable value is linked to an official, institutional, scholarly, or defined-conversion source in the reveal."
} };
