module.exports = { PACK: {
  "id": "bp_j_vote",
  "title": "The Scale of a U.S. Presidential Election",
  "casebookTitle": "The Kessler County Count",
  "tag": "elections · turnout · administration",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Turnout",
      "Share of eligible citizens who vote."
    ],
    [
      "Electoral vote",
      "A vote cast by a member of the Electoral College."
    ],
    [
      "Election jurisdiction",
      "Local authority administering voting."
    ],
    [
      "Popular-vote margin",
      "Difference between candidates’ national vote totals."
    ]
  ],
  "eqs": [
    {
      "id": "votes_elector",
      "q": "2020 presidential votes: estimate the result in votes per electoral vote using the real-world facts below.",
      "unit": "votes per electoral vote",
      "factors": [
        {
          "label": "2020 presidential votes",
          "unit": "votes",
          "value": 158400000,
          "display": "158,400,000",
          "desc": "Rounded national vote total.",
          "source": {
            "label": "Federal Election Commission — 2020 election results",
            "url": "https://www.fec.gov/resources/cms-content/documents/federalelections2020.pdf",
            "accessed": "2026-07-18"
          },
          "id": "votes_elector_f0",
          "playDesc": "Rounded national vote total."
        },
        {
          "label": "Electoral votes",
          "unit": "electoral votes",
          "value": 538,
          "display": "538",
          "desc": "Electoral College total.",
          "source": {
            "label": "Federal Election Commission — 2020 election results",
            "url": "https://www.fec.gov/resources/cms-content/documents/federalelections2020.pdf",
            "accessed": "2026-07-18"
          },
          "id": "votes_elector_f1",
          "playDesc": "Electoral College total."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 294423.79182156135,
      "answerDisplay": "294,423.8",
      "explain": "Divide popular votes by electoral votes.",
      "revealQ": "How many popular votes per electoral vote were cast in the 2020 presidential election?",
      "sources": [
        {
          "label": "Federal Election Commission — 2020 election results",
          "url": "https://www.fec.gov/resources/cms-content/documents/federalelections2020.pdf",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "turnout_votes",
      "q": "Voting-eligible population: estimate the result in voters using the real-world facts below.",
      "unit": "voters",
      "factors": [
        {
          "label": "Voting-eligible population",
          "unit": "people",
          "value": 239000000,
          "display": "239,000,000",
          "desc": "2020 eligible-population scale.",
          "source": {
            "label": "Federal Election Commission — 2020 election results",
            "url": "https://www.fec.gov/resources/cms-content/documents/federalelections2020.pdf",
            "accessed": "2026-07-18"
          },
          "id": "turnout_votes_f0",
          "playDesc": "2020 eligible-population scale."
        },
        {
          "label": "Turnout fraction",
          "unit": "fraction",
          "value": 0.668,
          "display": "0.668",
          "desc": "2020 turnout scale.",
          "source": {
            "label": "Federal Election Commission — 2020 election results",
            "url": "https://www.fec.gov/resources/cms-content/documents/federalelections2020.pdf",
            "accessed": "2026-07-18"
          },
          "id": "turnout_votes_f1",
          "playDesc": "2020 turnout scale."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 159652000,
      "answerDisplay": "159,652,000",
      "explain": "Multiply eligible population by turnout.",
      "revealQ": "How many voters is sixty-six-point-eight percent of 239 million eligible citizens?",
      "sources": [
        {
          "label": "Federal Election Commission — 2020 election results",
          "url": "https://www.fec.gov/resources/cms-content/documents/federalelections2020.pdf",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "jurisdiction_hour",
      "q": "Ballots cast: estimate the result in ballots per jurisdiction-hour using the real-world facts below.",
      "unit": "ballots per jurisdiction-hour",
      "factors": [
        {
          "label": "Ballots cast",
          "unit": "ballots",
          "value": 155500000,
          "display": "155,500,000",
          "desc": "Election administration survey scale.",
          "source": {
            "label": "U.S. Election Assistance Commission — election administration",
            "url": "https://www.eac.gov/research-and-data/datasets-codebooks-and-surveys",
            "accessed": "2026-07-18"
          },
          "id": "jurisdiction_hour_f0",
          "playDesc": "Election administration survey scale."
        },
        {
          "label": "Election jurisdictions",
          "unit": "jurisdictions",
          "value": 10000,
          "display": "10,000",
          "desc": "Approximate U.S. local-election jurisdiction count.",
          "source": {
            "label": "U.S. Election Assistance Commission — election administration",
            "url": "https://www.eac.gov/research-and-data/datasets-codebooks-and-surveys",
            "accessed": "2026-07-18"
          },
          "id": "jurisdiction_hour_f1",
          "playDesc": "Approximate U.S. local-election jurisdiction count."
        },
        {
          "label": "Voting-day hours",
          "unit": "hours",
          "value": 16,
          "display": "16",
          "desc": "Long election-day operating window.",
          "source": {
            "label": "U.S. Election Assistance Commission — election administration",
            "url": "https://www.eac.gov/research-and-data/datasets-codebooks-and-surveys",
            "accessed": "2026-07-18"
          },
          "id": "jurisdiction_hour_f2",
          "playDesc": "Long election-day operating window."
        }
      ],
      "ops": [
        "÷",
        "÷"
      ],
      "answer": 971.875,
      "answerDisplay": "971.88",
      "explain": "Divide ballots by jurisdictions and operating hours.",
      "revealQ": "How many ballots per jurisdiction-hour is 155.5 million ballots across ten thousand jurisdictions and a sixteen-hour voting day?",
      "sources": [
        {
          "label": "U.S. Election Assistance Commission — election administration",
          "url": "https://www.eac.gov/research-and-data/datasets-codebooks-and-surveys",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "margin_percent",
      "q": "Popular-vote margin: estimate the result in percent using the real-world facts below.",
      "unit": "percent",
      "factors": [
        {
          "label": "Popular-vote margin",
          "unit": "votes",
          "value": 7060000,
          "display": "7,060,000",
          "desc": "2020 national popular-vote margin scale.",
          "source": {
            "label": "Federal Election Commission — 2020 election results",
            "url": "https://www.fec.gov/resources/cms-content/documents/federalelections2020.pdf",
            "accessed": "2026-07-18"
          },
          "id": "margin_percent_f0",
          "playDesc": "2020 national popular-vote margin scale."
        },
        {
          "label": "Percent multiplier",
          "unit": "percent per fraction",
          "value": 100,
          "display": "100",
          "desc": "Fraction-to-percent conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "margin_percent_f1",
          "playDesc": "The number of percentage points in one whole."
        },
        {
          "label": "Comparison vote total",
          "unit": "votes",
          "value": 154000000,
          "display": "154,000,000",
          "desc": "Rounded two-candidate vote scale.",
          "source": {
            "label": "Federal Election Commission — 2020 election results",
            "url": "https://www.fec.gov/resources/cms-content/documents/federalelections2020.pdf",
            "accessed": "2026-07-18"
          },
          "id": "margin_percent_f2",
          "playDesc": "Rounded two-candidate vote scale."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "answer": 4.584415584415584,
      "answerDisplay": "4.584",
      "explain": "Divide margin by the comparison vote total and express as percent.",
      "revealQ": "What percent is a 7.06-million-vote margin out of 154 million votes?",
      "sources": [
        {
          "label": "Federal Election Commission — 2020 election results",
          "url": "https://www.fec.gov/resources/cms-content/documents/federalelections2020.pdf",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ]
    }
  ],
  "sourceSummary": "Every playable value is linked to an official, institutional, scholarly, or defined-conversion source in the reveal."
} };
