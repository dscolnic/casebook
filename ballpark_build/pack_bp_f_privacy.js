module.exports = { PACK: {
  "id": "bp_f_privacy",
  "title": "Privacy Lessons from Real Data Sets",
  "casebookTitle": "The Beacon Consent Scandal",
  "tag": "privacy · re-identification · data scale",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Anonymization",
      "Removing obvious identifiers from data."
    ],
    [
      "Re-identification",
      "Linking anonymous records back to people."
    ],
    [
      "Mobility trace",
      "A sequence of location and time records."
    ],
    [
      "Rating record",
      "A user’s score for an item such as a film."
    ]
  ],
  "eqs": [
    {
      "id": "users_per_movie",
      "q": "Netflix Prize users: estimate the result in users per movie using the real-world facts below.",
      "unit": "users per movie",
      "factors": [
        {
          "label": "Netflix Prize users",
          "unit": "users",
          "value": 480000,
          "display": "480,000",
          "desc": "Published approximate user count.",
          "source": {
            "label": "Netflix Prize dataset",
            "url": "https://www.cs.uic.edu/~liub/KDD-cup-2007/NetflixPrize-description.pdf",
            "accessed": "2026-07-18"
          },
          "id": "users_per_movie_f0",
          "playDesc": "Published approximate user count."
        },
        {
          "label": "Movies rated",
          "unit": "movies",
          "value": 17770,
          "display": "17,770",
          "desc": "Published movie count.",
          "source": {
            "label": "Netflix Prize dataset",
            "url": "https://www.cs.uic.edu/~liub/KDD-cup-2007/NetflixPrize-description.pdf",
            "accessed": "2026-07-18"
          },
          "id": "users_per_movie_f1",
          "playDesc": "Published movie count."
        }
      ],
      "ops": [
        "÷"
      ],
      "explain": "Divide users by movies as a dataset-density comparison.",
      "answer": 27.011817670230727,
      "answerDisplay": "≈ 27",
      "sources": [
        {
          "label": "Netflix Prize dataset",
          "url": "https://www.cs.uic.edu/~liub/KDD-cup-2007/NetflixPrize-description.pdf",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many users correspond to each movie in the Netflix Prize dataset?"
    },
    {
      "id": "netflix_storage",
      "q": "Netflix Prize ratings: estimate the result in gigabytes using the real-world facts below.",
      "unit": "gigabytes",
      "factors": [
        {
          "label": "Netflix Prize ratings",
          "unit": "ratings",
          "value": 100000000,
          "display": "100,000,000",
          "desc": "Published dataset size.",
          "source": {
            "label": "Netflix Prize dataset",
            "url": "https://www.cs.uic.edu/~liub/KDD-cup-2007/NetflixPrize-description.pdf",
            "accessed": "2026-07-18"
          },
          "id": "netflix_storage_f0",
          "playDesc": "Published dataset size."
        },
        {
          "label": "Bytes per stored rating",
          "unit": "bytes per rating",
          "value": 16,
          "display": "16",
          "desc": "A transparent record-size comparison.",
          "source": {
            "label": "Netflix Prize dataset",
            "url": "https://www.cs.uic.edu/~liub/KDD-cup-2007/NetflixPrize-description.pdf",
            "accessed": "2026-07-18"
          },
          "id": "netflix_storage_f1",
          "playDesc": "A transparent record-size comparison."
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
          "id": "netflix_storage_f2",
          "playDesc": "The number of bytes corresponding to one gigabyte."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "explain": "Multiply records by bytes per record and convert bytes to gigabytes.",
      "answer": 1.6,
      "answerDisplay": "≈ 1.6",
      "sources": [
        {
          "label": "Netflix Prize dataset",
          "url": "https://www.cs.uic.edu/~liub/KDD-cup-2007/NetflixPrize-description.pdf",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many decimal gigabytes are needed for one hundred million ratings stored at sixteen bytes each?"
    },
    {
      "id": "mobility_record_bytes",
      "q": "People in mobility dataset: estimate the result in bytes using the real-world facts below.",
      "unit": "bytes",
      "factors": [
        {
          "label": "People in mobility dataset",
          "unit": "people",
          "value": 1500000,
          "display": "1,500,000",
          "desc": "Large published mobility-data study scale.",
          "source": {
            "label": "FTC — data brokers report",
            "url": "https://www.ftc.gov/reports/data-brokers-call-transparency-accountability-report-federal-trade-commission-may-2014",
            "accessed": "2026-07-18"
          },
          "id": "mobility_record_bytes_f0",
          "playDesc": "Large published mobility-data study scale."
        },
        {
          "label": "Location points per person",
          "unit": "points per person",
          "value": 4,
          "display": "4",
          "desc": "Four points were enough for high re-identification in a landmark study.",
          "source": {
            "label": "FTC — data brokers report",
            "url": "https://www.ftc.gov/reports/data-brokers-call-transparency-accountability-report-federal-trade-commission-may-2014",
            "accessed": "2026-07-18"
          },
          "id": "mobility_record_bytes_f1",
          "playDesc": "Four points were enough for high re-identification in a landmark study."
        },
        {
          "label": "Bytes per location point",
          "unit": "bytes per point",
          "value": 24,
          "display": "24",
          "desc": "A compact latitude-longitude-time record scale.",
          "source": {
            "label": "FTC — data brokers report",
            "url": "https://www.ftc.gov/reports/data-brokers-call-transparency-accountability-report-federal-trade-commission-may-2014",
            "accessed": "2026-07-18"
          },
          "id": "mobility_record_bytes_f2",
          "playDesc": "A compact latitude-longitude-time record scale."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "explain": "Multiply people, points per person, and bytes per point.",
      "answer": 144000000,
      "answerDisplay": "≈ 144,000,000",
      "sources": [
        {
          "label": "FTC — data brokers report",
          "url": "https://www.ftc.gov/reports/data-brokers-call-transparency-accountability-report-federal-trade-commission-may-2014",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many bytes are needed to store four twenty-four-byte location points for 1.5 million people?"
    },
    {
      "id": "reidentified_people",
      "q": "People in comparison sample: estimate the result in people using the real-world facts below.",
      "unit": "people",
      "factors": [
        {
          "label": "People in comparison sample",
          "unit": "people",
          "value": 10000,
          "display": "10,000",
          "desc": "A ten-thousand-person comparison group.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "reidentified_people_f0",
          "playDesc": "A ten-thousand-person comparison group."
        },
        {
          "label": "Re-identifiable share",
          "unit": "fraction",
          "value": 0.95,
          "display": "0.95",
          "desc": "Published uniqueness result using four spatiotemporal points.",
          "source": {
            "label": "FTC — data brokers report",
            "url": "https://www.ftc.gov/reports/data-brokers-call-transparency-accountability-report-federal-trade-commission-may-2014",
            "accessed": "2026-07-18"
          },
          "id": "reidentified_people_f1",
          "playDesc": "Published uniqueness result using four spatiotemporal points."
        }
      ],
      "ops": [
        "×"
      ],
      "explain": "Multiply sample size by the re-identifiable fraction.",
      "answer": 9500,
      "answerDisplay": "≈ 9,500",
      "sources": [
        {
          "label": "Defined mathematical relationship",
          "url": "https://www.nist.gov/pml/special-publication-811",
          "accessed": "2026-07-18"
        },
        {
          "label": "FTC — data brokers report",
          "url": "https://www.ftc.gov/reports/data-brokers-call-transparency-accountability-report-federal-trade-commission-may-2014",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many people in a ten-thousand-person sample correspond to a ninety-five-percent re-identification rate?"
    }
  ],
  "sourceSummary": "Every playable value is linked to an official, institutional, scholarly, or defined-conversion source in the reveal."
} };
