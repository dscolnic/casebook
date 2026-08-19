module.exports = { PACK: {
  "id": "f_privacy",
  "title": "The Beacon Consent Scandal",
  "discipline": "Data Privacy & Information Systems",
  "teaser": "A billion intimate records turned up for sale. A criminal data theft? All fair and anonymized? Or consent quietly stripped and the data sold?",
  "overclaimTag": "a criminal data theft",
  "truthTag": "anonymization defeated and data monetized",
  "venue": "the Beacon data-privacy inquiry",
  "agent": {
    "name": "Investigator Iris Kohl",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Data-Privacy Pioneers",
  "dossierName": "DATA-PRIVACY & DATABASE PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Beacon data-privacy inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The WHERE you test determines the dossier, and the conversation costs one day.",
  "overclaimTease": "A burglary makes clean headlines; follow the records before deciding how they left lawful custody.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "dataexec",
      "items": [
        {
          "id": "thieves",
          "label": "An outside data-theft ring"
        },
        {
          "id": "dataexec",
          "label": "Reed Calloway — the firm's data-product chief"
        },
        {
          "id": "processor",
          "label": "The third-party data processor"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "office",
      "items": [
        {
          "id": "warehouse",
          "label": "The Customer Data Warehouse"
        },
        {
          "id": "analytics",
          "label": "The Analytics & Re-identification Lab"
        },
        {
          "id": "office",
          "label": "The Data Chief's Office"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "monetized",
      "items": [
        {
          "id": "theft",
          "label": "Criminals stole the data in a break-in"
        },
        {
          "id": "anon",
          "label": "It was all anonymized and consented — nothing wrong"
        },
        {
          "id": "monetized",
          "label": "Consent and anonymization quietly defeated, the data sold"
        }
      ]
    }
  },
  "PLACES": {
    "warehouse": {
      "name": "The Customer Data Warehouse",
      "xy": [
        140,
        90
      ]
    },
    "analytics": {
      "name": "The Analytics & Re-identification Lab",
      "xy": [
        330,
        240
      ]
    },
    "office": {
      "name": "The Data Chief's Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "warehouse",
      "analytics"
    ],
    [
      "analytics",
      "office"
    ]
  ],
  "CHARACTERS": {
    "dataeng2": {
      "name": "The Data Engineer",
      "role": "Data-warehouse engineer",
      "face": "🗄",
      "badge": "D",
      "legend": "the data warehouse",
      "hint": "Built the pipelines; the 'anonymous' IDs could be traced straight back."
    },
    "analyst2": {
      "name": "The Analytics Lead",
      "role": "Analytics & re-identification lead",
      "face": "📈",
      "badge": "A",
      "legend": "the analytics lab",
      "hint": "Re-linked the records to real names — and was told to keep selling them."
    },
    "clerk": {
      "name": "The Clerk",
      "role": "Compliance records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Keeps the consent forms — and the deal that sold what they never agreed to."
    }
  },
  "TOPICMAP": {
    "warehouse": {
      "dataeng2": [
        "p_infoprivacy"
      ],
      "analyst2": [
        "p_diffpriv"
      ],
      "clerk": [
        "p_deanon"
      ]
    },
    "analytics": {
      "dataeng2": [
        "p_anonfail"
      ],
      "analyst2": [
        "p_tor"
      ],
      "clerk": [
        "p_econ"
      ]
    },
    "office": {
      "dataeng2": [
        "p_relational"
      ],
      "analyst2": [
        "p_ermodel"
      ],
      "clerk": [
        "p_transactions"
      ]
    }
  },
  "TOPICS": {
    "p_infoprivacy": {
      "sci": "Alan Westin (1929-2013)",
      "topic": "Informational privacy & self-determination",
      "lede": "Alan Westin showed that informational privacy and self-determination must be judged by possible inference, not by missing names.",
      "no": 1,
      "profile": "This morning’s information-governance note examines Alan Westin through informational privacy and self-determination. Alan Westin's 1967 book Privacy and Freedom framed privacy as a person's ability to decide when, how, and to what extent information about them is communicated. Data systems rarely hold one self-contained fact. They collect identifiers, behavior, location, transactions, relationships, and derived scores that become more revealing when combined. Westin’s work explains why privacy must be judged across the flow rather than by checking whether a name was removed.\n\nThe practical discipline is to identify who collected information, the purpose presented to the person, the permitted recipients, and the choices available after collection. A review should identify the people represented, the context of collection, every recipient, auxiliary datasets, retention period, inference capability, and the decision rights preserved for the subject. Technical masking and legal consent should be tested separately because neither automatically repairs the other.\n\nModern analytics makes data useful by linking records, but the same joins can defeat anonymity or extend information into a purpose never contemplated at collection. Risk also changes with time: public datasets accumulate, algorithms improve, and a harmless-looking release can become identifying years later. Privacy engineering therefore requires limits on access and use, not merely a one-time transformation.\n\nThe lasting principle is privacy cannot be reduced to secrecy because control and appropriate use still matter when data were willingly disclosed once. Responsible data practice follows people, purposes, and possible inferences through the complete lifecycle. Derived data deserve scrutiny because an inference may be more intimate than any single field supplied by the person.",
      "frame": "Opens a table with the names removed. \"At The Customer Data Warehouse, anonymity is a claim, not a blank column. Walk me through informational privacy and self-determination.\"",
      "q": [
        {
          "q": "Which privacy account best captures Alan Westin’s contribution to informational privacy and self-determination?",
          "o": [
            {
              "t": "Alan Westin's 1967 book Privacy and Freedom framed privacy as a person's ability to decide when, how, and to what extent information about them is communicated. The consent ledger keeps assumptions explicit in the case file.",
              "v": "expert",
              "fb": "Correct: privacy analysis follows information flows, linkability, purpose, and inference rather than names alone."
            },
            {
              "t": "Alan Westin is associated with informational privacy and self-determination, but the account removes names without testing linkage, purpose change, or future inference. Future inference remains open in the operational record.",
              "v": "partial",
              "fb": "Removing direct identifiers is useful, but auxiliary data and future joins can still expose people."
            },
            {
              "t": "Alan Westin is portrayed as treating a broad consent form as permanent permission for every database join and commercial transfer. The data relationship disproves it. The consent language is read as broadly as the product plan requires.",
              "v": "wrong",
              "fb": "Consent and anonymity are separate claims that require their own evidence and limits."
            },
            {
              "t": "Alan Westin is used to claim anonymity whenever a stranger does not identify someone by inspecting a single released row. Identifiability is tested too narrowly. Commercial value is treated as sufficient permission in the case file.",
              "v": "danger",
              "fb": "Row-by-row inspection misses identification created by combinations, patterns, and outside datasets."
            }
          ]
        },
        {
          "q": "How should the privacy method be used on a real data release?",
          "o": [
            {
              "t": "For the data flow, use this review: identify who collected information, the purpose presented to the person, the permitted recipients, and the choices available after collection.",
              "v": "expert",
              "fb": "Correct: privacy analysis follows information flows, linkability, purpose, and inference rather than names alone."
            },
            {
              "t": "Inspect the released table alone, ignoring auxiliary datasets, derived scores, recipients, retention, and later changes of purpose. The consent ledger leaves one test open.",
              "v": "partial",
              "fb": "Removing direct identifiers is useful, but auxiliary data and future joins can still expose people."
            },
            {
              "t": "Accept the anonymous label and signed form as proof, without checking whether the records can be linked or the use was disclosed. Under the consent ledger, direct comparison fails.",
              "v": "wrong",
              "fb": "Consent and anonymity are separate claims that require their own evidence and limits."
            },
            {
              "t": "Sell the transformed file first, then treat successful re-identification as misuse by outsiders rather than evidence about the release. Identifiability is tested too narrowly.",
              "v": "danger",
              "fb": "Row-by-row inspection misses identification created by combinations, patterns, and outside datasets."
            }
          ]
        },
        {
          "q": "Which privacy conclusion is best supported?",
          "o": [
            {
              "t": "The privacy conclusion is that privacy cannot be reduced to secrecy because control and appropriate use still matter when data were willingly disclosed once across the available record in the case file.",
              "v": "expert",
              "fb": "Correct: privacy analysis follows information flows, linkability, purpose, and inference rather than names alone."
            },
            {
              "t": "Direct identifiers deserve protection, but downstream inference and contextual use can remain matters for the buyer to manage. Future inference remains open across the available record in the case file.",
              "v": "partial",
              "fb": "Removing direct identifiers is useful, but auxiliary data and future joins can still expose people."
            },
            {
              "t": "Once data are collected lawfully, technical masking makes every subsequent recipient and analytical purpose equally appropriate. The consent language is read as broadly as the product plan requires.",
              "v": "wrong",
              "fb": "Consent and anonymity are separate claims that require their own evidence and limits."
            },
            {
              "t": "The records is treated as either stolen secrets or fully harmless statistics, leaving no category for authorized but abusive data use. Commercial value is treated as sufficient permission in the case file.",
              "v": "danger",
              "fb": "Row-by-row inspection misses identification created by combinations, patterns, and outside datasets."
            }
          ]
        }
      ]
    },
    "p_diffpriv": {
      "sci": "Cynthia Dwork (b. 1958)",
      "topic": "Differential privacy",
      "lede": "Cynthia Dwork turned differential privacy into a test of flows, context, and realistic outside knowledge.",
      "no": 2,
      "profile": "This morning’s information-governance note examines Cynthia Dwork through differential privacy. Cynthia Dwork and collaborators developed differential privacy, a mathematical guarantee limiting how much an analysis changes when one person's data are added or removed. Data systems rarely hold one self-contained fact. They collect identifiers, behavior, location, transactions, relationships, and derived scores that become more revealing when combined. Dwork’s work explains why privacy must be judged across the flow rather than by checking whether a name was removed.\n\nThe practical discipline is to bound sensitivity, add calibrated randomness, and track a privacy budget across repeated queries to control cumulative disclosure. A review should identify the people represented, the context of collection, every recipient, auxiliary datasets, retention period, inference capability, and the decision rights preserved for the subject. Technical masking and legal consent should be tested separately because neither automatically repairs the other.\n\nModern analytics makes data useful by linking records, but the same joins can defeat anonymity or extend information into a purpose never contemplated at collection. Risk also changes with time: public datasets accumulate, algorithms improve, and a harmless-looking release can become identifying years later. Privacy engineering therefore requires limits on access and use, not merely a one-time transformation.\n\nThe lasting principle is privacy protection should be measured against what an observer can infer, not against whether a table still contains obvious identifiers. Responsible data practice follows people, purposes, and possible inferences through the complete lifecycle. A consent box cannot authorize a purpose that was hidden, incomprehensible, or made unavoidable after the fact.",
      "frame": "Highlights three ordinary fields. \"Together they point to one person. Start with differential privacy.\"",
      "q": [
        {
          "q": "Which privacy account best captures Cynthia Dwork’s contribution to differential privacy?",
          "o": [
            {
              "t": "Cynthia Dwork and collaborators developed differential privacy, a mathematical guarantee limiting how much an analysis changes when one person's data are added or removed. The flow remains reviewable in the operational record in the case file.",
              "v": "expert",
              "fb": "Correct: privacy analysis follows information flows, linkability, purpose, and inference rather than names alone."
            },
            {
              "t": "Cynthia Dwork is associated with differential privacy, but the account removes names without testing linkage, purpose change, or future inference. Support across the consent ledger stays partial under the documented sequence in the case file.",
              "v": "partial",
              "fb": "Removing direct identifiers is useful, but auxiliary data and future joins can still expose people."
            },
            {
              "t": "Cynthia Dwork is portrayed as treating a broad consent form as permanent permission for every database join and commercial transfer. The data relationship disproves it. The consent language is read as broadly as the product plan requires.",
              "v": "wrong",
              "fb": "Consent and anonymity are separate claims that require their own evidence and limits."
            },
            {
              "t": "Cynthia Dwork is used to claim anonymity whenever a stranger does not identify someone by inspecting a single released row. Identifiability is tested too narrowly. Commercial value is treated as sufficient permission in the case file.",
              "v": "danger",
              "fb": "Row-by-row inspection misses identification created by combinations, patterns, and outside datasets."
            }
          ]
        },
        {
          "q": "How should the privacy method be used on a real data release?",
          "o": [
            {
              "t": "For the data flow, use this review: bound sensitivity, add calibrated randomness, and track a privacy budget across repeated queries to control cumulative disclosure in the case file.",
              "v": "expert",
              "fb": "Correct: privacy analysis follows information flows, linkability, purpose, and inference rather than names alone."
            },
            {
              "t": "Inspect the released table alone, ignoring auxiliary datasets, derived scores, recipients, retention, and later changes of purpose. The purpose boundary is unclear in the case file.",
              "v": "partial",
              "fb": "Removing direct identifiers is useful, but auxiliary data and future joins can still expose people."
            },
            {
              "t": "Accept the anonymous label and signed form as proof, without checking whether the records can be linked or the use was disclosed. The consent ledger defeats that inference in the case file.",
              "v": "wrong",
              "fb": "Consent and anonymity are separate claims that require their own evidence and limits."
            },
            {
              "t": "Sell the transformed file first, then treat successful re-identification as misuse by outsiders rather than evidence about the release. Commercial value is treated as sufficient permission.",
              "v": "danger",
              "fb": "Row-by-row inspection misses identification created by combinations, patterns, and outside datasets."
            }
          ]
        },
        {
          "q": "Which privacy conclusion is best supported?",
          "o": [
            {
              "t": "The privacy conclusion is that privacy protection should be measured against what an observer can infer, not against whether a table still contains obvious identifiers in the case file.",
              "v": "expert",
              "fb": "Correct: privacy analysis follows information flows, linkability, purpose, and inference rather than names alone."
            },
            {
              "t": "Direct identifiers deserve protection, but downstream inference and contextual use can remain matters for the buyer to manage. The consent ledger leaves one test open in the case file.",
              "v": "partial",
              "fb": "Removing direct identifiers is useful, but auxiliary data and future joins can still expose people."
            },
            {
              "t": "Once data are collected lawfully, technical masking makes every subsequent recipient and analytical purpose equally appropriate. The consent ledger defeats that inference in the case file.",
              "v": "wrong",
              "fb": "Consent and anonymity are separate claims that require their own evidence and limits."
            },
            {
              "t": "The records is treated as either stolen secrets or fully harmless statistics, leaving no category for authorized but abusive data use. Under the consent ledger, warning is postponed.",
              "v": "danger",
              "fb": "Row-by-row inspection misses identification created by combinations, patterns, and outside datasets."
            }
          ]
        }
      ]
    },
    "p_deanon": {
      "sci": "Arvind Narayanan (data-privacy researcher)",
      "topic": "De-anonymizing large datasets",
      "lede": "Data that look harmless become revealing in Arvind Narayanan’s account of de-anonymizing large datasets.",
      "no": 3,
      "profile": "This morning’s information-governance note examines Arvind Narayanan through de-anonymizing large datasets. Arvind Narayanan coauthored influential demonstrations that sparse ratings and public auxiliary data could re-identify users in the Netflix Prize dataset. Data systems rarely hold one self-contained fact. They collect identifiers, behavior, location, transactions, relationships, and derived scores that become more revealing when combined. Narayanan’s work explains why privacy must be judged across the flow rather than by checking whether a name was removed.\n\nThe practical discipline is to model distinctive behavioral patterns, compare them with outside datasets, and measure whether a small number of matches isolates an individual. A review should identify the people represented, the context of collection, every recipient, auxiliary datasets, retention period, inference capability, and the decision rights preserved for the subject. Technical masking and legal consent should be tested separately because neither automatically repairs the other.\n\nModern analytics makes data useful by linking records, but the same joins can defeat anonymity or extend information into a purpose never contemplated at collection. Risk also changes with time: public datasets accumulate, algorithms improve, and a harmless-looking release can become identifying years later. Privacy engineering therefore requires limits on access and use, not merely a one-time transformation.\n\nThe lasting principle is high-dimensional records often function like fingerprints because a few unusual choices can be more identifying than a name. Responsible data practice follows people, purposes, and possible inferences through the complete lifecycle. Deletion promises must account for backups, exports, model inputs, and copies held by commercial partners. A consent box cannot authorize a purpose that was hidden, incomprehensible, or made unavoidable after the fact.",
      "frame": "Places a consent form beside an analytics export. \"Same people, different promise. Show me what de-anonymizing large datasets requires.\"",
      "q": [
        {
          "q": "Which privacy account best captures Arvind Narayanan’s contribution to de-anonymizing large datasets?",
          "o": [
            {
              "t": "Arvind Narayanan coauthored influential demonstrations that sparse ratings and public auxiliary data could re-identify users in the Netflix Prize dataset. The consent ledger keeps assumptions explicit across the available record.",
              "v": "expert",
              "fb": "Correct: privacy analysis follows information flows, linkability, purpose, and inference rather than names alone."
            },
            {
              "t": "Arvind Narayanan is associated with de-anonymizing large datasets, but the account removes names without testing linkage, purpose change, or future inference. The purpose boundary is unclear under the documented sequence in the case file.",
              "v": "partial",
              "fb": "Removing direct identifiers is useful, but auxiliary data and future joins can still expose people."
            },
            {
              "t": "Arvind Narayanan is portrayed as treating a broad consent form as permanent permission for every database join and commercial transfer. The data relationship disproves it. The consent language is read as broadly as the product plan requires.",
              "v": "wrong",
              "fb": "Consent and anonymity are separate claims that require their own evidence and limits."
            },
            {
              "t": "Arvind Narayanan is used to claim anonymity whenever a stranger does not identify someone by inspecting a single released row. Identifiability is tested too narrowly. Commercial value is treated as sufficient permission in the case file.",
              "v": "danger",
              "fb": "Row-by-row inspection misses identification created by combinations, patterns, and outside datasets."
            }
          ]
        },
        {
          "q": "How should the privacy method be used on a real data release?",
          "o": [
            {
              "t": "For the data flow, use this review: model distinctive behavioral patterns, compare them with outside datasets, and measure whether a small number of matches isolates an individual. The flow remains reviewable in the case file.",
              "v": "expert",
              "fb": "Correct: privacy analysis follows information flows, linkability, purpose, and inference rather than names alone."
            },
            {
              "t": "Inspect the released table alone, ignoring auxiliary datasets, derived scores, recipients, retention, and later changes of purpose. The purpose boundary is unclear. The consent ledger leaves one test open in the case file.",
              "v": "partial",
              "fb": "Removing direct identifiers is useful, but auxiliary data and future joins can still expose people."
            },
            {
              "t": "Accept the anonymous label and signed form as proof, without checking whether the records can be linked or the use was disclosed. The data relationship disproves it. Within the consent ledger, no support appears in the case file.",
              "v": "wrong",
              "fb": "Consent and anonymity are separate claims that require their own evidence and limits."
            },
            {
              "t": "Sell the transformed file first, then treat successful re-identification as misuse by outsiders rather than evidence about the release. Identifiability is tested too narrowly. Commercial value is treated as sufficient permission.",
              "v": "danger",
              "fb": "Row-by-row inspection misses identification created by combinations, patterns, and outside datasets."
            }
          ]
        },
        {
          "q": "Which privacy conclusion is best supported?",
          "o": [
            {
              "t": "The privacy conclusion is that high-dimensional records often function like fingerprints because a few unusual choices can be more identifying than a name under the documented sequence in the case file.",
              "v": "expert",
              "fb": "Correct: privacy analysis follows information flows, linkability, purpose, and inference rather than names alone."
            },
            {
              "t": "Direct identifiers deserve protection, but downstream inference and contextual use can remain matters for the buyer to manage. Future inference remains open across the available record in the case file.",
              "v": "partial",
              "fb": "Removing direct identifiers is useful, but auxiliary data and future joins can still expose people."
            },
            {
              "t": "Once data are collected lawfully, technical masking makes every subsequent recipient and analytical purpose equally appropriate. The consent language is read as broadly as the product plan requires.",
              "v": "wrong",
              "fb": "Consent and anonymity are separate claims that require their own evidence and limits."
            },
            {
              "t": "The records is treated as either stolen secrets or fully harmless statistics, leaving no category for authorized but abusive data use. Commercial value is treated as sufficient permission in the case file.",
              "v": "danger",
              "fb": "Row-by-row inspection misses identification created by combinations, patterns, and outside datasets."
            }
          ]
        }
      ]
    },
    "p_anonfail": {
      "sci": "Paul Ohm (privacy-law scholar)",
      "topic": "The failure of anonymization",
      "lede": "Paul Ohm showed that the failure of anonymization must be judged by possible inference, not by missing names.",
      "no": 4,
      "profile": "This morning’s information-governance note examines Paul Ohm through the failure of anonymization. Paul Ohm argued that the legal distinction between identifiable and nonidentifiable data was becoming unstable as computing and auxiliary datasets improved re-identification. Data systems rarely hold one self-contained fact. They collect identifiers, behavior, location, transactions, relationships, and derived scores that become more revealing when combined. Ohm’s work explains why privacy must be judged across the flow rather than by checking whether a name was removed.\n\nThe practical discipline is to evaluate the availability of outside data, the longevity of a release, and the consequences if future techniques defeat today's masking. A review should identify the people represented, the context of collection, every recipient, auxiliary datasets, retention period, inference capability, and the decision rights preserved for the subject. Technical masking and legal consent should be tested separately because neither automatically repairs the other.\n\nModern analytics makes data useful by linking records, but the same joins can defeat anonymity or extend information into a purpose never contemplated at collection. Risk also changes with time: public datasets accumulate, algorithms improve, and a harmless-looking release can become identifying years later. Privacy engineering therefore requires limits on access and use, not merely a one-time transformation.\n\nThe lasting principle is a promise of anonymity can age badly because data persist while linkage methods and commercial incentives improve. Responsible data practice follows people, purposes, and possible inferences through the complete lifecycle. Derived data deserve scrutiny because an inference may be more intimate than any single field supplied by the person.",
      "frame": "Opens a table with the names removed. \"At The Analytics & Re-identification Lab, anonymity is a claim, not a blank column. Walk me through the failure of anonymization.\"",
      "q": [
        {
          "q": "Which privacy account best captures Paul Ohm’s contribution to the failure of anonymization?",
          "o": [
            {
              "t": "Paul Ohm argued that the legal distinction between identifiable and nonidentifiable data was becoming unstable as computing and auxiliary datasets improved re-identification. The flow remains reviewable in the case file in the case file.",
              "v": "expert",
              "fb": "Correct: privacy analysis follows information flows, linkability, purpose, and inference rather than names alone."
            },
            {
              "t": "Paul Ohm is associated with the failure of anonymization, but the account removes names without testing linkage, purpose change, or future inference. Support across the consent ledger stays partial in the dated record in the case file.",
              "v": "partial",
              "fb": "Removing direct identifiers is useful, but auxiliary data and future joins can still expose people."
            },
            {
              "t": "Paul Ohm is portrayed as treating a broad consent form as permanent permission for every database join and commercial transfer. The data relationship disproves it. The consent language is read as broadly as the product plan requires.",
              "v": "wrong",
              "fb": "Consent and anonymity are separate claims that require their own evidence and limits."
            },
            {
              "t": "Paul Ohm is used to claim anonymity whenever a stranger does not identify someone by inspecting a single released row. Identifiability is tested too narrowly. Commercial value is treated as sufficient permission in the case file.",
              "v": "danger",
              "fb": "Row-by-row inspection misses identification created by combinations, patterns, and outside datasets."
            }
          ]
        },
        {
          "q": "How should the privacy method be used on a real data release?",
          "o": [
            {
              "t": "For the data flow, use this review: evaluate the availability of outside data, the longevity of a release, and the consequences if future techniques defeat today's masking in the case file.",
              "v": "expert",
              "fb": "Correct: privacy analysis follows information flows, linkability, purpose, and inference rather than names alone."
            },
            {
              "t": "Inspect the released table alone, ignoring auxiliary datasets, derived scores, recipients, retention, and later changes of purpose. The consent ledger leaves one test open in the case file.",
              "v": "partial",
              "fb": "Removing direct identifiers is useful, but auxiliary data and future joins can still expose people."
            },
            {
              "t": "Accept the anonymous label and signed form as proof, without checking whether the records can be linked or the use was disclosed. The consent ledger points to another result in the case file.",
              "v": "wrong",
              "fb": "Consent and anonymity are separate claims that require their own evidence and limits."
            },
            {
              "t": "Sell the transformed file first, then treat successful re-identification as misuse by outsiders rather than evidence about the release. Commercial value is treated as sufficient permission.",
              "v": "danger",
              "fb": "Row-by-row inspection misses identification created by combinations, patterns, and outside datasets."
            }
          ]
        },
        {
          "q": "Which privacy conclusion is best supported?",
          "o": [
            {
              "t": "The privacy conclusion is that a promise of anonymity can age badly because data persist while linkage methods and commercial incentives improve. The flow remains reviewable in the case file.",
              "v": "expert",
              "fb": "Correct: privacy analysis follows information flows, linkability, purpose, and inference rather than names alone."
            },
            {
              "t": "Direct identifiers deserve protection, but downstream inference and contextual use can remain matters for the buyer to manage. The consent ledger leaves one test open in the case file.",
              "v": "partial",
              "fb": "Removing direct identifiers is useful, but auxiliary data and future joins can still expose people."
            },
            {
              "t": "Once data are collected lawfully, technical masking makes every subsequent recipient and analytical purpose equally appropriate. The consent ledger defeats that inference in the case file.",
              "v": "wrong",
              "fb": "Consent and anonymity are separate claims that require their own evidence and limits."
            },
            {
              "t": "The records is treated as either stolen secrets or fully harmless statistics, leaving no category for authorized but abusive data use. Under the consent ledger, warning is postponed.",
              "v": "danger",
              "fb": "Row-by-row inspection misses identification created by combinations, patterns, and outside datasets."
            }
          ]
        }
      ]
    },
    "p_tor": {
      "sci": "Roger Dingledine (anonymity-network pioneer)",
      "topic": "The Tor anonymity network",
      "lede": "Roger Dingledine turned the Tor anonymity network into a test of flows, context, and realistic outside knowledge.",
      "no": 5,
      "profile": "This morning’s information-governance note examines Roger Dingledine through the Tor anonymity network. Roger Dingledine co-founded the Tor Project, adapting onion routing into a widely deployed network that sends traffic through several relays under layered encryption. Data systems rarely hold one self-contained fact. They collect identifiers, behavior, location, transactions, relationships, and derived scores that become more revealing when combined. Dingledine’s work explains why privacy must be judged across the flow rather than by checking whether a name was removed.\n\nThe practical discipline is to select a circuit of relays, give each hop only the information it needs, and rotate circuits while monitoring anonymity and performance tradeoffs. A review should identify the people represented, the context of collection, every recipient, auxiliary datasets, retention period, inference capability, and the decision rights preserved for the subject. Technical masking and legal consent should be tested separately because neither automatically repairs the other.\n\nModern analytics makes data useful by linking records, but the same joins can defeat anonymity or extend information into a purpose never contemplated at collection. Risk also changes with time: public datasets accumulate, algorithms improve, and a harmless-looking release can become identifying years later. Privacy engineering therefore requires limits on access and use, not merely a one-time transformation.\n\nThe lasting principle is encryption of content and concealment of communication metadata solve different problems and require different system designs. Responsible data practice follows people, purposes, and possible inferences through the complete lifecycle. A consent box cannot authorize a purpose that was hidden, incomprehensible, or made unavoidable after the fact.",
      "frame": "Highlights three ordinary fields. \"Together they point to one person. Start with the Tor anonymity network.\"",
      "q": [
        {
          "q": "Which privacy account best captures Roger Dingledine’s contribution to the Tor anonymity network?",
          "o": [
            {
              "t": "Roger Dingledine co-founded the Tor Project, adapting onion routing into a widely deployed network that sends traffic through several relays under layered encryption across the available record.",
              "v": "expert",
              "fb": "Correct: privacy analysis follows information flows, linkability, purpose, and inference rather than names alone."
            },
            {
              "t": "Roger Dingledine is associated with the Tor anonymity network, but the account removes names without testing linkage, purpose change, or future inference under the documented sequence in the case file.",
              "v": "partial",
              "fb": "Removing direct identifiers is useful, but auxiliary data and future joins can still expose people."
            },
            {
              "t": "Roger Dingledine is portrayed as treating a broad consent form as permanent permission for every database join and commercial transfer. The consent language is read as broadly as the product plan requires.",
              "v": "wrong",
              "fb": "Consent and anonymity are separate claims that require their own evidence and limits."
            },
            {
              "t": "Roger Dingledine is used to claim anonymity whenever a stranger does not identify someone by inspecting a single released row. Commercial value is treated as sufficient permission in the case file.",
              "v": "danger",
              "fb": "Row-by-row inspection misses identification created by combinations, patterns, and outside datasets."
            }
          ]
        },
        {
          "q": "How should the privacy method be used on a real data release?",
          "o": [
            {
              "t": "For the data flow, use this review: select a circuit of relays, give each hop only the information it needs, and rotate circuits while monitoring anonymity and performance tradeoffs. The flow remains reviewable in the case file.",
              "v": "expert",
              "fb": "Correct: privacy analysis follows information flows, linkability, purpose, and inference rather than names alone."
            },
            {
              "t": "Inspect the released table alone, ignoring auxiliary datasets, derived scores, recipients, retention, and later changes of purpose. The purpose boundary is unclear. The consent ledger leaves one test open in the case file.",
              "v": "partial",
              "fb": "Removing direct identifiers is useful, but auxiliary data and future joins can still expose people."
            },
            {
              "t": "Accept the anonymous label and signed form as proof, without checking whether the records can be linked or the use was disclosed. The data relationship disproves it. Within the consent ledger, no support appears in the case file.",
              "v": "wrong",
              "fb": "Consent and anonymity are separate claims that require their own evidence and limits."
            },
            {
              "t": "Sell the transformed file first, then treat successful re-identification as misuse by outsiders rather than evidence about the release. Identifiability is tested too narrowly. Commercial value is treated as sufficient permission.",
              "v": "danger",
              "fb": "Row-by-row inspection misses identification created by combinations, patterns, and outside datasets."
            }
          ]
        },
        {
          "q": "Which privacy conclusion is best supported?",
          "o": [
            {
              "t": "The privacy conclusion is that encryption of content and concealment of communication metadata solve different problems and require different system designs across the available record in the case file.",
              "v": "expert",
              "fb": "Correct: privacy analysis follows information flows, linkability, purpose, and inference rather than names alone."
            },
            {
              "t": "Direct identifiers deserve protection, but downstream inference and contextual use can remain matters for the buyer to manage. Future inference remains open across the available record in the case file.",
              "v": "partial",
              "fb": "Removing direct identifiers is useful, but auxiliary data and future joins can still expose people."
            },
            {
              "t": "Once data are collected lawfully, technical masking makes every subsequent recipient and analytical purpose equally appropriate. The consent language is read as broadly as the product plan requires.",
              "v": "wrong",
              "fb": "Consent and anonymity are separate claims that require their own evidence and limits."
            },
            {
              "t": "The records is treated as either stolen secrets or fully harmless statistics, leaving no category for authorized but abusive data use. Commercial value is treated as sufficient permission in the case file.",
              "v": "danger",
              "fb": "Row-by-row inspection misses identification created by combinations, patterns, and outside datasets."
            }
          ]
        }
      ]
    },
    "p_econ": {
      "sci": "Ross Anderson (1956-2024)",
      "topic": "Security & privacy economics",
      "lede": "Data that look harmless become revealing in Ross Anderson’s account of security and privacy economics.",
      "no": 6,
      "profile": "This morning’s information-governance note examines Ross Anderson through security and privacy economics. Ross Anderson helped establish the economics of information security, showing how failures often follow misaligned incentives rather than a simple shortage of technical knowledge. Data systems rarely hold one self-contained fact. They collect identifiers, behavior, location, transactions, relationships, and derived scores that become more revealing when combined. Anderson’s work explains why privacy must be judged across the flow rather than by checking whether a name was removed.\n\nThe practical discipline is to map who chooses safeguards, who pays for them, who bears losses, and who controls the information needed to judge performance. A review should identify the people represented, the context of collection, every recipient, auxiliary datasets, retention period, inference capability, and the decision rights preserved for the subject. Technical masking and legal consent should be tested separately because neither automatically repairs the other.\n\nModern analytics makes data useful by linking records, but the same joins can defeat anonymity or extend information into a purpose never contemplated at collection. Risk also changes with time: public datasets accumulate, algorithms improve, and a harmless-looking release can become identifying years later. Privacy engineering therefore requires limits on access and use, not merely a one-time transformation.\n\nThe lasting principle is systems remain insecure when the party able to prevent harm can shift the cost to customers, partners, or the public. Responsible data practice follows people, purposes, and possible inferences through the complete lifecycle. Deletion promises must account for backups, exports, model inputs, and copies held by commercial partners.",
      "frame": "Places a consent form beside an analytics export. \"Same people, different promise. Show me what security and privacy economics requires.\"",
      "q": [
        {
          "q": "Which privacy account best captures Ross Anderson’s contribution to security and privacy economics?",
          "o": [
            {
              "t": "Ross Anderson helped establish the economics of information security, showing how failures often follow misaligned incentives rather than a simple shortage of technical knowledge. The flow remains reviewable in the case file in the case file.",
              "v": "expert",
              "fb": "Correct: privacy analysis follows information flows, linkability, purpose, and inference rather than names alone."
            },
            {
              "t": "Ross Anderson is associated with security and privacy economics, but the account removes names without testing linkage, purpose change, or future inference. The consent ledger leaves one test open across the available record in the case file.",
              "v": "partial",
              "fb": "Removing direct identifiers is useful, but auxiliary data and future joins can still expose people."
            },
            {
              "t": "Ross Anderson is portrayed as treating a broad consent form as permanent permission for every database join and commercial transfer. The data relationship disproves it. The consent language is read as broadly as the product plan requires.",
              "v": "wrong",
              "fb": "Consent and anonymity are separate claims that require their own evidence and limits."
            },
            {
              "t": "Ross Anderson is used to claim anonymity whenever a stranger does not identify someone by inspecting a single released row. Identifiability is tested too narrowly. Commercial value is treated as sufficient permission in the case file.",
              "v": "danger",
              "fb": "Row-by-row inspection misses identification created by combinations, patterns, and outside datasets."
            }
          ]
        },
        {
          "q": "How should the privacy method be used on a real data release?",
          "o": [
            {
              "t": "For the data flow, use this review: map who chooses safeguards, who pays for them, who bears losses, and who controls the information needed to judge performance in the case file.",
              "v": "expert",
              "fb": "Correct: privacy analysis follows information flows, linkability, purpose, and inference rather than names alone."
            },
            {
              "t": "Inspect the released table alone, ignoring auxiliary datasets, derived scores, recipients, retention, and later changes of purpose. The purpose boundary is unclear in the case file.",
              "v": "partial",
              "fb": "Removing direct identifiers is useful, but auxiliary data and future joins can still expose people."
            },
            {
              "t": "Accept the anonymous label and signed form as proof, without checking whether the records can be linked or the use was disclosed. The consent ledger defeats that inference in the case file.",
              "v": "wrong",
              "fb": "Consent and anonymity are separate claims that require their own evidence and limits."
            },
            {
              "t": "Sell the transformed file first, then treat successful re-identification as misuse by outsiders rather than evidence about the release. Commercial value is treated as sufficient permission.",
              "v": "danger",
              "fb": "Row-by-row inspection misses identification created by combinations, patterns, and outside datasets."
            }
          ]
        },
        {
          "q": "Which privacy conclusion is best supported?",
          "o": [
            {
              "t": "The privacy conclusion is that systems remain insecure when the party able to prevent harm can shift the cost to customers, partners, or the public. The flow remains reviewable in the case file.",
              "v": "expert",
              "fb": "Correct: privacy analysis follows information flows, linkability, purpose, and inference rather than names alone."
            },
            {
              "t": "Direct identifiers deserve protection, but downstream inference and contextual use can remain matters for the buyer to manage. Support across the consent ledger stays partial in the case file.",
              "v": "partial",
              "fb": "Removing direct identifiers is useful, but auxiliary data and future joins can still expose people."
            },
            {
              "t": "Once data are collected lawfully, technical masking makes every subsequent recipient and analytical purpose equally appropriate. The consent ledger points to another result in the case file.",
              "v": "wrong",
              "fb": "Consent and anonymity are separate claims that require their own evidence and limits."
            },
            {
              "t": "The records is treated as either stolen secrets or fully harmless statistics, leaving no category for authorized but abusive data use. Inside the consent ledger, drama displaces testing.",
              "v": "danger",
              "fb": "Row-by-row inspection misses identification created by combinations, patterns, and outside datasets."
            }
          ]
        }
      ]
    },
    "p_relational": {
      "sci": "Edgar F. Codd (1923-2003)",
      "topic": "The relational database",
      "lede": "Edgar F. Codd showed that the relational database must be judged by possible inference, not by missing names.",
      "no": 7,
      "profile": "This morning’s information-governance note examines Edgar F. Codd through the relational database. Edgar F. Codd proposed the relational model in 1970, representing data through relations and separating logical queries from physical storage details. Data systems rarely hold one self-contained fact. They collect identifiers, behavior, location, transactions, relationships, and derived scores that become more revealing when combined. Codd’s work explains why privacy must be judged across the flow rather than by checking whether a name was removed.\n\nThe practical discipline is to organize facts into tables linked by keys, use declarative operations to select and combine rows, and enforce constraints that preserve consistency. A review should identify the people represented, the context of collection, every recipient, auxiliary datasets, retention period, inference capability, and the decision rights preserved for the subject. Technical masking and legal consent should be tested separately because neither automatically repairs the other.\n\nModern analytics makes data useful by linking records, but the same joins can defeat anonymity or extend information into a purpose never contemplated at collection. Risk also changes with time: public datasets accumulate, algorithms improve, and a harmless-looking release can become identifying years later. Privacy engineering therefore requires limits on access and use, not merely a one-time transformation.\n\nThe lasting principle is data independence makes systems adaptable, but powerful joins also make separate collections easier to connect and re-identify. Responsible data practice follows people, purposes, and possible inferences through the complete lifecycle. Derived data deserve scrutiny because an inference may be more intimate than any single field supplied by the person.",
      "frame": "Opens a table with the names removed. \"At The Data Chief's Office, anonymity is a claim, not a blank column. Walk me through the relational database.\"",
      "q": [
        {
          "q": "Which privacy account best captures Edgar F. Codd’s contribution to the relational database?",
          "o": [
            {
              "t": "Edgar F. Codd proposed the relational model in 1970, representing data through relations and separating logical queries from physical storage details. The flow remains reviewable. Linkage risk stays explicit in the case file in the case file.",
              "v": "expert",
              "fb": "Correct: privacy analysis follows information flows, linkability, purpose, and inference rather than names alone."
            },
            {
              "t": "Edgar F. Codd is associated with the relational database, but the account removes names without testing linkage, purpose change, or future inference. Support across the consent ledger stays partial across the available record in the case file.",
              "v": "partial",
              "fb": "Removing direct identifiers is useful, but auxiliary data and future joins can still expose people."
            },
            {
              "t": "Edgar F. Codd is portrayed as treating a broad consent form as permanent permission for every database join and commercial transfer. The data relationship disproves it. The consent language is read as broadly as the product plan requires.",
              "v": "wrong",
              "fb": "Consent and anonymity are separate claims that require their own evidence and limits."
            },
            {
              "t": "Edgar F. Codd is used to claim anonymity whenever a stranger does not identify someone by inspecting a single released row. Identifiability is tested too narrowly. Commercial value is treated as sufficient permission in the case file.",
              "v": "danger",
              "fb": "Row-by-row inspection misses identification created by combinations, patterns, and outside datasets."
            }
          ]
        },
        {
          "q": "How should the privacy method be used on a real data release?",
          "o": [
            {
              "t": "For the data flow, use this review: organize facts into tables linked by keys, use declarative operations to select and combine rows, and enforce constraints that preserve consistency under the documented sequence in the case file.",
              "v": "expert",
              "fb": "Correct: privacy analysis follows information flows, linkability, purpose, and inference rather than names alone."
            },
            {
              "t": "Inspect the released table alone, ignoring auxiliary datasets, derived scores, recipients, retention, and later changes of purpose. The consent ledger leaves an assumption unresolved under the documented sequence in the case file.",
              "v": "partial",
              "fb": "Removing direct identifiers is useful, but auxiliary data and future joins can still expose people."
            },
            {
              "t": "Accept the anonymous label and signed form as proof, without checking whether the records can be linked or the use was disclosed. The data relationship disproves it. The consent language is read as broadly as the product plan requires.",
              "v": "wrong",
              "fb": "Consent and anonymity are separate claims that require their own evidence and limits."
            },
            {
              "t": "Sell the transformed file first, then treat successful re-identification as misuse by outsiders rather than evidence about the release. Under the consent ledger, warning is postponed under the documented sequence in the case file.",
              "v": "danger",
              "fb": "Row-by-row inspection misses identification created by combinations, patterns, and outside datasets."
            }
          ]
        },
        {
          "q": "Which privacy conclusion is best supported?",
          "o": [
            {
              "t": "The privacy conclusion is that data independence makes systems adaptable, but powerful joins also make separate collections easier to connect and re-identify across the available record in the case file.",
              "v": "expert",
              "fb": "Correct: privacy analysis follows information flows, linkability, purpose, and inference rather than names alone."
            },
            {
              "t": "Direct identifiers deserve protection, but downstream inference and contextual use can remain matters for the buyer to manage. Future inference remains open across the available record in the case file.",
              "v": "partial",
              "fb": "Removing direct identifiers is useful, but auxiliary data and future joins can still expose people."
            },
            {
              "t": "Once data are collected lawfully, technical masking makes every subsequent recipient and analytical purpose equally appropriate. The consent language is read as broadly as the product plan requires.",
              "v": "wrong",
              "fb": "Consent and anonymity are separate claims that require their own evidence and limits."
            },
            {
              "t": "The records is treated as either stolen secrets or fully harmless statistics, leaving no category for authorized but abusive data use. Commercial value is treated as sufficient permission in the case file.",
              "v": "danger",
              "fb": "Row-by-row inspection misses identification created by combinations, patterns, and outside datasets."
            }
          ]
        }
      ]
    },
    "p_ermodel": {
      "sci": "Peter Chen (b. 1947)",
      "topic": "The entity-relationship model",
      "lede": "Peter Chen turned the entity-relationship model into a test of flows, context, and realistic outside knowledge.",
      "no": 8,
      "profile": "This morning’s information-governance note examines Peter Chen through the entity-relationship model. Peter Chen introduced the entity–relationship model in 1976, giving designers a visual language for entities, attributes, and relationships before implementation. Data systems rarely hold one self-contained fact. They collect identifiers, behavior, location, transactions, relationships, and derived scores that become more revealing when combined. Chen’s work explains why privacy must be judged across the flow rather than by checking whether a name was removed.\n\nThe practical discipline is to identify real-world objects, state their properties and cardinalities, and translate the conceptual model into enforceable database structures. A review should identify the people represented, the context of collection, every recipient, auxiliary datasets, retention period, inference capability, and the decision rights preserved for the subject. Technical masking and legal consent should be tested separately because neither automatically repairs the other.\n\nModern analytics makes data useful by linking records, but the same joins can defeat anonymity or extend information into a purpose never contemplated at collection. Risk also changes with time: public datasets accumulate, algorithms improve, and a harmless-looking release can become identifying years later. Privacy engineering therefore requires limits on access and use, not merely a one-time transformation.\n\nThe lasting principle is privacy risks often begin in design diagrams because the relationships a system can express determine what it can later infer. Responsible data practice follows people, purposes, and possible inferences through the complete lifecycle. A consent box cannot authorize a purpose that was hidden, incomprehensible, or made unavoidable after the fact.",
      "frame": "Highlights three ordinary fields. \"Together they point to one person. Start with the entity-relationship model.\"",
      "q": [
        {
          "q": "Which privacy account best captures Peter Chen’s contribution to the entity-relationship model?",
          "o": [
            {
              "t": "Peter Chen introduced the entity–relationship model in 1976, giving designers a visual language for entities, attributes, and relationships before implementation in the operational record.",
              "v": "expert",
              "fb": "Correct: privacy analysis follows information flows, linkability, purpose, and inference rather than names alone."
            },
            {
              "t": "Peter Chen is associated with the entity-relationship model, but the account removes names without testing linkage, purpose change, or future inference under the documented sequence in the case file.",
              "v": "partial",
              "fb": "Removing direct identifiers is useful, but auxiliary data and future joins can still expose people."
            },
            {
              "t": "Peter Chen is portrayed as treating a broad consent form as permanent permission for every database join and commercial transfer. The consent language is read as broadly as the product plan requires.",
              "v": "wrong",
              "fb": "Consent and anonymity are separate claims that require their own evidence and limits."
            },
            {
              "t": "Peter Chen is used to claim anonymity whenever a stranger does not identify someone by inspecting a single released row. Identifiability is tested too narrowly across the available record.",
              "v": "danger",
              "fb": "Row-by-row inspection misses identification created by combinations, patterns, and outside datasets."
            }
          ]
        },
        {
          "q": "How should the privacy method be used on a real data release?",
          "o": [
            {
              "t": "For the data flow, use this review: identify real-world objects, state their properties and cardinalities, and translate the conceptual model into enforceable database structures.",
              "v": "expert",
              "fb": "Correct: privacy analysis follows information flows, linkability, purpose, and inference rather than names alone."
            },
            {
              "t": "Inspect the released table alone, ignoring auxiliary datasets, derived scores, recipients, retention, and later changes of purpose. The consent ledger leaves one test open.",
              "v": "partial",
              "fb": "Removing direct identifiers is useful, but auxiliary data and future joins can still expose people."
            },
            {
              "t": "Accept the anonymous label and signed form as proof, without checking whether the records can be linked or the use was disclosed. Under the consent ledger, direct comparison fails.",
              "v": "wrong",
              "fb": "Consent and anonymity are separate claims that require their own evidence and limits."
            },
            {
              "t": "Sell the transformed file first, then treat successful re-identification as misuse by outsiders rather than evidence about the release. Identifiability is tested too narrowly.",
              "v": "danger",
              "fb": "Row-by-row inspection misses identification created by combinations, patterns, and outside datasets."
            }
          ]
        },
        {
          "q": "Which privacy conclusion is best supported?",
          "o": [
            {
              "t": "The privacy conclusion is that privacy risks often begin in design diagrams because the relationships a system can express determine what it can later infer across the available record in the case file.",
              "v": "expert",
              "fb": "Correct: privacy analysis follows information flows, linkability, purpose, and inference rather than names alone."
            },
            {
              "t": "Direct identifiers deserve protection, but downstream inference and contextual use can remain matters for the buyer to manage. Future inference remains open across the available record in the case file.",
              "v": "partial",
              "fb": "Removing direct identifiers is useful, but auxiliary data and future joins can still expose people."
            },
            {
              "t": "Once data are collected lawfully, technical masking makes every subsequent recipient and analytical purpose equally appropriate. The consent language is read as broadly as the product plan requires.",
              "v": "wrong",
              "fb": "Consent and anonymity are separate claims that require their own evidence and limits."
            },
            {
              "t": "The records is treated as either stolen secrets or fully harmless statistics, leaving no category for authorized but abusive data use. Commercial value is treated as sufficient permission in the case file.",
              "v": "danger",
              "fb": "Row-by-row inspection misses identification created by combinations, patterns, and outside datasets."
            }
          ]
        }
      ]
    },
    "p_transactions": {
      "sci": "Jim Gray (b. 1944)",
      "topic": "Transactions & data at scale",
      "lede": "Data that look harmless become revealing in Jim Gray’s account of transactions and data at scale.",
      "no": 9,
      "profile": "This morning’s information-governance note examines Jim Gray through transactions and data at scale. Jim Gray shaped transaction processing and the engineering of reliable large databases, clarifying properties associated with atomicity, consistency, isolation, and durability. Data systems rarely hold one self-contained fact. They collect identifiers, behavior, location, transactions, relationships, and derived scores that become more revealing when combined. Gray’s work explains why privacy must be judged across the flow rather than by checking whether a name was removed.\n\nThe practical discipline is to group related updates into a transaction, log changes, coordinate concurrent access, and recover to a consistent state after interruption. A review should identify the people represented, the context of collection, every recipient, auxiliary datasets, retention period, inference capability, and the decision rights preserved for the subject. Technical masking and legal consent should be tested separately because neither automatically repairs the other.\n\nModern analytics makes data useful by linking records, but the same joins can defeat anonymity or extend information into a purpose never contemplated at collection. Risk also changes with time: public datasets accumulate, algorithms improve, and a harmless-looking release can become identifying years later. Privacy engineering therefore requires limits on access and use, not merely a one-time transformation.\n\nThe lasting principle is reliability means the system must preserve both completed work and declared constraints even when machines or processes fail mid-operation. Responsible data practice follows people, purposes, and possible inferences through the complete lifecycle. Deletion promises must account for backups, exports, model inputs, and copies held by commercial partners.",
      "frame": "Places a consent form beside an analytics export. \"Same people, different promise. Show me what transactions and data at scale requires.\"",
      "q": [
        {
          "q": "Which privacy account best captures Jim Gray’s contribution to transactions and data at scale?",
          "o": [
            {
              "t": "Jim Gray shaped transaction processing and the engineering of reliable large databases, clarifying properties associated with atomicity, consistency, isolation, and durability. The flow remains reviewable.",
              "v": "expert",
              "fb": "Correct: privacy analysis follows information flows, linkability, purpose, and inference rather than names alone."
            },
            {
              "t": "Jim Gray is associated with transactions and data at scale, but the account removes names without testing linkage, purpose change, or future inference. Support across the consent ledger stays partial.",
              "v": "partial",
              "fb": "Removing direct identifiers is useful, but auxiliary data and future joins can still expose people."
            },
            {
              "t": "Jim Gray is portrayed as treating a broad consent form as permanent permission for every database join and commercial transfer. The consent record says less. The consent ledger defeats that inference.",
              "v": "wrong",
              "fb": "Consent and anonymity are separate claims that require their own evidence and limits."
            },
            {
              "t": "Jim Gray is used to claim anonymity whenever a stranger does not identify someone by inspecting a single released row. Commercial use precedes permission. Under the consent ledger, warning is postponed.",
              "v": "danger",
              "fb": "Row-by-row inspection misses identification created by combinations, patterns, and outside datasets."
            }
          ]
        },
        {
          "q": "How should the privacy method be used on a real data release?",
          "o": [
            {
              "t": "For the data flow, use this review: group related updates into a transaction, log changes, coordinate concurrent access, and recover to a consistent state after interruption in the case file.",
              "v": "expert",
              "fb": "Correct: privacy analysis follows information flows, linkability, purpose, and inference rather than names alone."
            },
            {
              "t": "Inspect the released table alone, ignoring auxiliary datasets, derived scores, recipients, retention, and later changes of purpose. The consent ledger leaves one test open in the case file.",
              "v": "partial",
              "fb": "Removing direct identifiers is useful, but auxiliary data and future joins can still expose people."
            },
            {
              "t": "Accept the anonymous label and signed form as proof, without checking whether the records can be linked or the use was disclosed. Within the consent ledger, no support appears in the case file.",
              "v": "wrong",
              "fb": "Consent and anonymity are separate claims that require their own evidence and limits."
            },
            {
              "t": "Sell the transformed file first, then treat successful re-identification as misuse by outsiders rather than evidence about the release. Commercial value is treated as sufficient permission.",
              "v": "danger",
              "fb": "Row-by-row inspection misses identification created by combinations, patterns, and outside datasets."
            }
          ]
        },
        {
          "q": "Which privacy conclusion is best supported?",
          "o": [
            {
              "t": "The privacy conclusion is that reliability means the system must preserve both completed work and declared constraints even when machines or processes fail mid-operation in the case file.",
              "v": "expert",
              "fb": "Correct: privacy analysis follows information flows, linkability, purpose, and inference rather than names alone."
            },
            {
              "t": "Direct identifiers deserve protection, but downstream inference and contextual use can remain matters for the buyer to manage. The consent ledger leaves one test open in the case file.",
              "v": "partial",
              "fb": "Removing direct identifiers is useful, but auxiliary data and future joins can still expose people."
            },
            {
              "t": "Once data are collected lawfully, technical masking makes every subsequent recipient and analytical purpose equally appropriate. The consent ledger defeats that inference in the case file.",
              "v": "wrong",
              "fb": "Consent and anonymity are separate claims that require their own evidence and limits."
            },
            {
              "t": "The records is treated as either stolen secrets or fully harmless statistics, leaving no category for authorized but abusive data use. Under the consent ledger, warning is postponed.",
              "v": "danger",
              "fb": "Row-by-row inspection misses identification created by combinations, patterns, and outside datasets."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "dataeng2": {
      "warehouse": "The Data Engineer waits at the customer data warehouse with a consent form, an export manifest, and a table labeled anonymous. \"Built the pipelines; the 'anonymous' IDs could be traced straight back. The records changed names more easily than they changed owners.\"",
      "analytics": "The Data Engineer waits at the analytics & re-identification lab with a consent form, an export manifest, and a table labeled anonymous. \"Built the pipelines; the 'anonymous' IDs could be traced straight back. The records changed names more easily than they changed owners.\"",
      "office": "The Data Engineer waits at the data chief's office with a consent form, an export manifest, and a table labeled anonymous. \"Built the pipelines; the 'anonymous' IDs could be traced straight back. The records changed names more easily than they changed owners.\""
    },
    "analyst2": {
      "warehouse": "The Analytics Lead waits at the customer data warehouse with a consent form, an export manifest, and a table labeled anonymous. \"Re-linked the records to real names — and was told to keep selling them. The records changed names more easily than they changed owners.\"",
      "analytics": "The Analytics Lead waits at the analytics & re-identification lab with a consent form, an export manifest, and a table labeled anonymous. \"Re-linked the records to real names — and was told to keep selling them. The records changed names more easily than they changed owners.\"",
      "office": "The Analytics Lead waits at the data chief's office with a consent form, an export manifest, and a table labeled anonymous. \"Re-linked the records to real names — and was told to keep selling them. The records changed names more easily than they changed owners.\""
    },
    "clerk": {
      "warehouse": "The Clerk waits at the customer data warehouse with a consent form, an export manifest, and a table labeled anonymous. \"Keeps the consent forms — and the deal that sold what they never agreed to. The records changed names more easily than they changed owners.\"",
      "analytics": "The Clerk waits at the analytics & re-identification lab with a consent form, an export manifest, and a table labeled anonymous. \"Keeps the consent forms — and the deal that sold what they never agreed to. The records changed names more easily than they changed owners.\"",
      "office": "The Clerk waits at the data chief's office with a consent form, an export manifest, and a table labeled anonymous. \"Keeps the consent forms — and the deal that sold what they never agreed to. The records changed names more easily than they changed owners.\""
    }
  },
  "story": [
    "<b>The Beacon Consent Scandal</b> opens inside the Beacon data-privacy inquiry, where the public explanation has hardened faster than the evidence.",
    "<b>The Data Engineer</b>, <b>The Analytics Lead</b>, and <b>The Clerk</b> hold different parts of the record, and every conversation begins with one real figure whose work teaches you how to read it.",
    "The case keeps pulling investigators toward <b>Criminals stole the data in a break-in</b> or <b>It was all anonymized and consented — nothing wrong</b>. Both are plausible enough to survive a headline; neither should survive the full dossier untested.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide the <b>WHAT</b> for yourself."
  ],
  "endings": {
    "overclaimWhat": "theft",
    "dismissalWhat": "anon",
    "win": {
      "expertTitle": "The Anonymous Market Has Names",
      "expert": [
        "Your evidence places <b>Reed Calloway — the firm's data-product chief</b> behind <b>Consent and anonymization quietly defeated, the data sold</b>, with authorization documented in <b>The Data Chief's Office</b>. Not criminals stole the data in a break-in. Not it was all anonymized and consented — nothing wrong.",
        "The re-identification work showed that the masking could be reversed, while the contracts extended use beyond what customers were told. The records were not stolen; they were commercialized through permissions and anonymity claims that internal evidence had already defeated."
      ],
      "soundTitle": "Consent Reconnected to Use",
      "sound": [
        "Your finding correctly combines <b>Reed Calloway — the firm's data-product chief</b>, <b>The Data Chief's Office</b>, and <b>Consent and anonymization quietly defeated, the data sold</b>. The linkage tests and sale agreement support the conclusion.",
        "Your report leaves some downstream buyers to be identified, but it establishes that the core product depended on uses customers did not meaningfully authorize."
      ],
      "namedTitle": "The Data Deal Exposed",
      "named": [
        "You name the right answer: <b>Reed Calloway — the firm's data-product chief</b>, <b>The Data Chief's Office</b>, and <b>Consent and anonymization quietly defeated, the data sold</b>.",
        "The explanation needs fuller treatment of auxiliary data and contract language, yet it correctly directs regulators to the office that approved both."
      ]
    },
    "overclaim": {
      "title": "A Theft That Hid the Seller",
      "body": [
        "You declare <b>Criminals stole the data in a break-in</b>, treating every external copy as evidence of a criminal break-in.",
        "The access logs do not support the story, and the false accusation lets the authorized export program appear innocent. The provable privacy violation is buried under a hunt for thieves who were never required."
      ]
    },
    "dismissal": {
      "title": "Anonymous in Name Only",
      "body": [
        "You accept <b>It was all anonymized and consented — nothing wrong</b>, relying on removed names and a broad form while ignoring linkage tests and changed purposes.",
        "That decision converts technical and legal labels into permanent permission. Customers remain identifiable to buyers and unable to contest uses they were never shown."
      ]
    },
    "wrongNames": {
      "title": "Correct Abuse, Wrong Pipeline",
      "body": [
        "You recognize <b>Consent and anonymization quietly defeated, the data sold</b>, but blame the outside processor or locate the decisive authorization away from the data chief’s office. The contracts and internal direction lead instead to"
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"An anonymized database reconnected to a person\"><path d=\"M48 34 C48 18,212 18,212 34 L212 100 C212 116,48 116,48 100 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><ellipse cx=\"130\" cy=\"34\" rx=\"82\" ry=\"16\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M48 62 C48 78,212 78,212 62 M48 88 C48 104,212 104,212 88\" fill=\"none\" stroke=\"#e2e2d8\" stroke-width=\"1.2\"/><path d=\"M212 68 C292 68,330 70,388 70\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><circle cx=\"472\" cy=\"50\" r=\"20\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M432 108 Q472 72 512 108\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M388 70 L438 58\" stroke=\"#326891\" stroke-width=\"2\"/></svg>"
}};
