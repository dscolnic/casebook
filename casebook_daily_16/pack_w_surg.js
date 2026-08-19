module.exports = { PACK: {
  "id": "w_surg",
  "title": "The Wrong Side",
  "discipline": "Surgery & Patient Safety",
  "teaser": "A routine operation ended in catastrophic harm. Was an instrument retained, or was this a technical complication during the intended procedure? Identity and operative records must establish the event.",
  "overclaimTag": "a retained surgical instrument",
  "truthTag": "wrong-site surgery after identification failure",
  "venue": "the St. Auben Hospital inquiry",
  "agent": {
    "name": "Investigator Cole Ferris",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Surgery Pioneers",
  "dossierName": "SURGERY & SAFETY PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the St. Auben Hospital inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before your inquiry ends. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The place you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "A missing instrument and a difficult technical complication both fit parts of the record; patient identity and procedure sequence must decide.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "chief",
      "items": [
        {
          "id": "surgeon",
          "label": "Mr. Rasch — the operating surgeon"
        },
        {
          "id": "chief",
          "label": "Dr. Vane — the surgical chief of service"
        },
        {
          "id": "vendor",
          "label": "The theatre-supplies vendor"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "records",
      "items": [
        {
          "id": "theatre",
          "label": "The Operating Theatre"
        },
        {
          "id": "stores",
          "label": "The Sterile Stores & Instrument Count"
        },
        {
          "id": "records",
          "label": "The Surgical Office & Records"
        }
      ]
    },
    "what": {
      "title": "Which preventable event occurred?",
      "truth": "bypass",
      "items": [
        {
          "id": "incompetence",
          "label": "A retained instrument followed an unresolved count discrepancy."
        },
        {
          "id": "complication",
          "label": "A technical injury occurred despite the correct patient and procedure."
        },
        {
          "id": "bypass",
          "label": "Wrong-site surgery followed failed identification and no time-out."
        }
      ]
    }
  },
  "PLACES": {
    "theatre": {
      "name": "The Operating Theatre",
      "xy": [
        140,
        90
      ]
    },
    "stores": {
      "name": "The Sterile Stores & Instrument Count",
      "xy": [
        330,
        240
      ]
    },
    "records": {
      "name": "The Surgical Office & Records",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "theatre",
      "stores"
    ],
    [
      "stores",
      "records"
    ]
  ],
  "CHARACTERS": {
    "scrubnurse": {
      "name": "Scrub Nurse Adler",
      "role": "Scrub nurse",
      "face": "🧤",
      "badge": "S",
      "legend": "the theatre",
      "hint": "Knows theatre staffing and can identify who handled each stage of the operating list."
    },
    "orderly": {
      "name": "The Orderly",
      "role": "Theatre orderly",
      "face": "🧺",
      "badge": "O",
      "legend": "the stores",
      "hint": "Tracks patient and tray movement between locations and can place handoffs in time."
    },
    "clerk": {
      "name": "The Clerk",
      "role": "Surgical records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Holds schedules, authorizations, and administrative records for surgical services."
    }
  },
  "TOPICMAP": {
    "theatre": {
      "scrubnurse": [
        "ligature"
      ],
      "orderly": [
        "fastknife"
      ],
      "clerk": [
        "abdominal"
      ]
    },
    "stores": {
      "scrubnurse": [
        "thyroid"
      ],
      "orderly": [
        "operatingroom"
      ],
      "clerk": [
        "endresult"
      ]
    },
    "records": {
      "scrubnurse": [
        "quality"
      ],
      "orderly": [
        "icuchecklist"
      ],
      "clerk": [
        "neverevents"
      ]
    }
  },
  "TOPICS": {
    "ligature": {
      "sci": "Ambroise Paré (1510-1590)",
      "topic": "Battlefield surgery & the ligature",
      "lede": "Ambroise Paré brought battlefield surgery and the ligature into the disciplined teamwork surrounding an operation.",
      "no": 1,
      "profile": "The surgical-safety email today studies Ambroise Paré through battlefield surgery and the ligature. Ambroise Paré replaced cauterization of major vessels with ligatures in battlefield amputations and wrote candidly about surgical experience. His methods reduced some of the trauma caused by burning tissue, though infection remained a major threat. Operations depend on anatomy and skill, but also on identification, sterile flow, communication, counts, monitoring, and follow-up. Paré’s work made one of those supports visible and teachable.\n\nThe practical discipline is to control bleeding deliberately and document outcomes rather than preserving a painful custom. The team should preserve patient identity, site, procedure, equipment readiness, antibiotic timing, counts, unexpected findings, and sign-out as shared information rather than private assumptions.\n\nMany catastrophic surgical errors are rare precisely because several defenses normally overlap. A crowded list, hierarchy, missing supplies, and optional paperwork can align those holes. Blaming one pair of hands may leave the pathway intact for the next team.\n\nThe patient-safety lesson: technical tradition should yield when observed results support a safer method. High performance includes the pause, record, and challenge that prevent technical work from reaching the wrong person or place. A near miss belongs in the learning system because the absence of injury may reflect luck rather than a sound process. Instrument and sponge counts protect the patient only when discrepancies stop closure and trigger a search. Briefings work best when every team member can state a concern without waiting for permission from the most senior clinician. Sign-out should capture specimens, equipment problems, postoperative priorities, and any deviation requiring later review.",
      "frame": "Lays out the count sheet at The Operating Theatre. \"The incision is not the first step. Explain battlefield surgery and the ligature before I uncover the sign-out.\"",
      "q": [
        {
          "q": "Which surgical-safety account best captures Ambroise Paré’s work on battlefield surgery and the ligature?",
          "o": [
            {
              "t": "Ambroise Paré replaced cauterization of major vessels with ligatures in battlefield amputations and wrote candidly about surgical experience. The team shares the stopping rule.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Ambroise Paré's surgical work emphasizes operative technique and individual experience. The surgeon’s experience appears reassuring. Surgical practice makes the surgical view plausible.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Ambroise Paré's surgical work supports an experienced surgeon as able to replace formal site and instrument verification. The surgeon’s experience appears reassuring. Surgical fits.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Ambroise Paré's authority is invoked in surgical practice to justify skipping the team time-out when a crowded operating list makes delay seem more dangerous than verification.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        },
        {
          "q": "Which team practice most reliably prevents a wrong-site or retained-item event?",
          "o": [
            {
              "t": "Use this operative-safety practice: control bleeding deliberately and document outcomes rather than preserving a painful custom. The team shares the stopping rule. Surgical context matters. Surgical fits.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Confirm consent and procedure in the chart without requiring active team agreement, site marking, and count reconciliation. Surgical practice makes the surgical view plausible. The surgical record fits.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Rely on the surgeon’s memory and the schedule because the team has worked together without a prior major error. The case itself seems routine. Surgical records fit this surgical account. Surgical fits.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Proceed through a missing site mark or short count to protect throughput, classifying resulting harm as a surgical complication. Surgical records fit this surgical account. The surgical record fits.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        },
        {
          "q": "What patient-safety conclusion follows?",
          "o": [
            {
              "t": "The patient-safety lesson is that technical tradition should yield when observed results support a safer method. Surgical context matters.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Treat excellent individual technique as able to offset inconsistent checklists and counts in a routine operation. Surgical context matters.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Treat a rare site-selection or retained-item event as difficult to prevent because checklists can miss uncommon failure combinations.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Attribute the outcome mainly to an incompetent surgeon or unavoidable complication rather than a bypassed team safeguard. Surgical fits.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        }
      ]
    },
    "fastknife": {
      "sci": "Robert Liston (1794-1847)",
      "topic": "Surgery in the age before anesthesia",
      "lede": "Robert Liston used surgery in the age before anesthesia to turn a technical act into a safer clinical system.",
      "no": 2,
      "profile": "The surgical-safety email today studies Robert Liston through surgery in the age before anesthesia. Robert Liston was renowned for speed in the pre-anesthetic operating theater, where reducing time could reduce agony and shock. His reputation also illustrates how a valuable performance trait can become dangerous when treated as the sole measure of quality. Operations depend on anatomy and skill, but also on identification, sterile flow, communication, counts, monitoring, and follow-up. Liston’s work made one of those supports visible and teachable.\n\nThe practical discipline is to balance speed with identification, hemostasis, tissue protection, and team verification. The team should preserve patient identity, site, procedure, equipment readiness, antibiotic timing, counts, unexpected findings, and sign-out as shared information rather than private assumptions.\n\nMany catastrophic surgical errors are rare precisely because several defenses normally overlap. A crowded list, hierarchy, missing supplies, and optional paperwork can align those holes. Blaming one pair of hands may leave the pathway intact for the next team.\n\nThe patient-safety lesson: efficiency is not safety when it removes the pause that catches an error. High performance includes the pause, record, and challenge that prevent technical work from reaching the wrong person or place. A near miss belongs in the learning system because the absence of injury may reflect luck rather than a sound process. Instrument and sponge counts protect the patient only when discrepancies stop closure and trigger a search. Briefings work best when every team member can state a concern without waiting for permission from the most senior clinician.",
      "frame": "Closes the theatre ledger. \"Skill and system meet in the same patient. Start with surgery in the age before anesthesia.\"",
      "q": [
        {
          "q": "Which surgical-safety account best captures Robert Liston’s work on surgery in the age before anesthesia?",
          "o": [
            {
              "t": "Robert Liston was renowned for speed in the pre-anesthetic operating theater, where reducing time could reduce agony and shock. Count reconciliation stays visible before closure. Fits.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Robert Liston's surgical work emphasizes operative technique and individual experience. The surgeon’s experience appears reassuring. Surgical practice makes the surgical view plausible.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Robert Liston's surgical work is read within surgical practice as support for an experienced surgeon as able to replace formal site and instrument verification. The schedule supports the account.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Robert Liston's authority is invoked in surgical practice to justify skipping the team time-out when a crowded operating list makes delay seem more dangerous than verification. Context fits.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        },
        {
          "q": "Which team practice most reliably prevents a wrong-site or retained-item event?",
          "o": [
            {
              "t": "Use this operative-safety practice: balance speed with identification, hemostasis, tissue protection, and team verification. The team shares the stopping rule.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Confirm consent and procedure in the chart without requiring active team agreement, site marking, and count reconciliation. Surgical records fit this surgical account.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Rely on the surgeon’s memory and the schedule because the team has worked together without a prior major error. The surgeon’s experience appears reassuring.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Proceed through a missing site mark or short count to protect throughput, classifying resulting harm as a surgical complication. The case itself seems routine.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        },
        {
          "q": "What patient-safety conclusion follows?",
          "o": [
            {
              "t": "The patient-safety lesson is that efficiency is not safety when it removes the pause that catches an error. The operative record stays complete. Surgical fits.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Treat excellent individual technique as able to offset inconsistent checklists and counts in a routine operation. The case itself seems routine. Surgical fits.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Treat a rare site-selection or retained-item event as difficult to prevent because checklists can miss uncommon failure combinations. The surgical record fits.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Attribute the outcome mainly to an incompetent surgeon or unavoidable complication rather than a bypassed team safeguard. The case itself seems routine.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        }
      ]
    },
    "abdominal": {
      "sci": "Theodor Billroth (1829-1894)",
      "topic": "The birth of abdominal surgery",
      "lede": "Surgical success became measurable through Theodor Billroth’s work on the birth of abdominal surgery.",
      "no": 3,
      "profile": "The surgical-safety email today studies Theodor Billroth through the birth of abdominal surgery. Theodor Billroth pioneered major abdominal operations, including gastrectomy, while building a disciplined surgical clinic with pathology and follow-up. His work showed that complex procedures depend on anatomy, technique, and institutional learning. Operations depend on anatomy and skill, but also on identification, sterile flow, communication, counts, monitoring, and follow-up. Billroth’s work made one of those supports visible and teachable.\n\nThe practical discipline is to link operative findings, specimen pathology, complications, and long-term outcomes. The team should preserve patient identity, site, procedure, equipment readiness, antibiotic timing, counts, unexpected findings, and sign-out as shared information rather than private assumptions.\n\nMany catastrophic surgical errors are rare precisely because several defenses normally overlap. A crowded list, hierarchy, missing supplies, and optional paperwork can align those holes. Blaming one pair of hands may leave the pathway intact for the next team.\n\nThe patient-safety lesson: a successful operation is defined by the patient's result, not completion of the procedure. High performance includes the pause, record, and challenge that prevent technical work from reaching the wrong person or place. A near miss belongs in the learning system because the absence of injury may reflect luck rather than a sound process. Instrument and sponge counts protect the patient only when discrepancies stop closure and trigger a search. Briefings work best when every team member can state a concern without waiting for permission from the most senior clinician. Sign-out should capture specimens, equipment problems, postoperative priorities, and any deviation requiring later review.",
      "frame": "Pauses beside a marked limb. \"A crowded list makes the pause more valuable, not less. Show me the birth of abdominal surgery.\"",
      "q": [
        {
          "q": "Which surgical-safety account best captures Theodor Billroth’s work on the birth of abdominal surgery?",
          "o": [
            {
              "t": "Theodor Billroth pioneered major abdominal operations, including gastrectomy, while building a disciplined surgical clinic with pathology and follow-up. Count reconciliation stays visible before closure.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Theodor Billroth's surgical work emphasizes operative technique and individual experience. Prior team performance looks strong. Surgical context supports the view. Surgical timing supports this surgical claim.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Theodor Billroth's surgical work supports an experienced surgeon as able to replace formal site and instrument verification. Prior team performance looks strong. Surgical practice makes the surgical view plausible.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Theodor Billroth's surgical authority supports skipping the team time-out when a crowded operating list makes delay seem more dangerous than verification. The surgeon’s experience appears reassuring. Surgical fits.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        },
        {
          "q": "Which team practice most reliably prevents a wrong-site or retained-item event?",
          "o": [
            {
              "t": "Use this operative-safety practice: link operative findings, specimen pathology, complications, and long-term outcomes. The operative record stays complete. Team challenge authority survives schedule pressure. Surgical fits.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Confirm consent and procedure in the chart without requiring active team agreement, site marking, and count reconciliation. The surgeon’s experience appears reassuring. Surgical practice makes the surgical view plausible.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Rely on the surgeon’s memory and the schedule because the team has worked together without a prior major error. The case itself seems routine. Prior team performance looks strong. Surgical records fit this surgical account.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Proceed through a missing site mark or short count to protect throughput, classifying resulting harm as a surgical complication. The surgeon’s experience appears reassuring. Surgical records fit this surgical account.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        },
        {
          "q": "What patient-safety conclusion follows?",
          "o": [
            {
              "t": "The patient-safety lesson is that a successful operation is defined by the patient's result, not completion of the procedure. The operative record stays complete.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Treat excellent individual technique as able to offset inconsistent checklists and counts in a routine operation. The surgeon’s experience appears reassuring.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Treat a rare site-selection or retained-item event as difficult to prevent because checklists can miss uncommon failure combinations. The case itself seems routine.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Attribute the outcome mainly to an incompetent surgeon or unavoidable complication rather than a bypassed team safeguard. The surgeon’s experience appears reassuring.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        }
      ]
    },
    "thyroid": {
      "sci": "Theodor Kocher (1841-1917)",
      "topic": "Precision thyroid surgery",
      "lede": "Theodor Kocher brought precision thyroid surgery into the disciplined teamwork surrounding an operation.",
      "no": 4,
      "profile": "The surgical-safety email today studies Theodor Kocher through precision thyroid surgery. Theodor Kocher transformed thyroid surgery through meticulous dissection, hemostasis, and outcome study, greatly reducing mortality. He also recognized that removing too much thyroid caused serious physiological consequences. Operations depend on anatomy and skill, but also on identification, sterile flow, communication, counts, monitoring, and follow-up. Kocher’s work made one of those supports visible and teachable.\n\nThe practical discipline is to standardize technique and track both immediate complications and delayed functional outcomes. The team should preserve patient identity, site, procedure, equipment readiness, antibiotic timing, counts, unexpected findings, and sign-out as shared information rather than private assumptions.\n\nMany catastrophic surgical errors are rare precisely because several defenses normally overlap. A crowded list, hierarchy, missing supplies, and optional paperwork can align those holes. Blaming one pair of hands may leave the pathway intact for the next team.\n\nThe patient-safety lesson: precision includes preserving what the patient still needs. High performance includes the pause, record, and challenge that prevent technical work from reaching the wrong person or place. A near miss belongs in the learning system because the absence of injury may reflect luck rather than a sound process. Instrument and sponge counts protect the patient only when discrepancies stop closure and trigger a search. Briefings work best when every team member can state a concern without waiting for permission from the most senior clinician. Sign-out should capture specimens, equipment problems, postoperative priorities, and any deviation requiring later review. Outcome review must examine workflow and policy alongside individual performance to prevent recurrence.",
      "frame": "Lays out the count sheet at The Sterile Stores & Instrument Count. \"The incision is not the first step. Explain precision thyroid surgery before I uncover the sign-out.\"",
      "q": [
        {
          "q": "Which surgical-safety account best captures Theodor Kocher’s work on precision thyroid surgery?",
          "o": [
            {
              "t": "Theodor Kocher transformed thyroid surgery through meticulous dissection, hemostasis, and outcome study, greatly reducing mortality. The team shares the stopping rule.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Theodor Kocher's surgical work emphasizes operative technique and individual experience. Prior team performance looks strong. Surgical practice makes the surgical view plausible.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Theodor Kocher's surgical work supports an experienced surgeon as able to replace formal site and instrument verification. Surgical practice makes the surgical view plausible.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Theodor Kocher's surgical authority supports skipping the team time-out when a crowded operating list makes delay seem more dangerous than verification. The surgical record fits.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        },
        {
          "q": "Which team practice most reliably prevents a wrong-site or retained-item event?",
          "o": [
            {
              "t": "Use this operative-safety practice: standardize technique and track both immediate complications and delayed functional outcomes. The team shares the stopping rule. Surgical context matters.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Confirm consent and procedure in the chart without requiring active team agreement, site marking, and count reconciliation. Surgical practice makes the surgical view plausible. The surgical record fits.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Rely on the surgeon’s memory and the schedule because the team has worked together without a prior major error. The case itself seems routine. Surgical records fit this surgical account. Surgical fits.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Proceed through a missing site mark or short count to protect throughput, classifying resulting harm as a surgical complication. Surgical records fit this surgical account. The surgical record fits.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        },
        {
          "q": "What patient-safety conclusion follows?",
          "o": [
            {
              "t": "The patient-safety lesson is that precision includes preserving what the patient still needs. Team challenge authority survives schedule pressure. Surgical fits.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Treat excellent individual technique as able to offset inconsistent checklists and counts in a routine operation. The case itself seems routine. Surgical fits.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Treat a rare site-selection or retained-item event as difficult to prevent because checklists can miss uncommon failure combinations. The surgical record fits.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Attribute the outcome mainly to an incompetent surgeon or unavoidable complication rather than a bypassed team safeguard. The case itself seems routine.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        }
      ]
    },
    "operatingroom": {
      "sci": "Gustav Neuber (1850-1932)",
      "topic": "The aseptic operating room",
      "lede": "Gustav Neuber used the aseptic operating room to turn a technical act into a safer clinical system.",
      "no": 5,
      "profile": "The surgical-safety email today studies Gustav Neuber through the aseptic operating room. Gustav Neuber designed an early aseptic operating environment with separated rooms, washable surfaces, sterilized clothing, and controlled movement. He treated the room itself as part of infection prevention. Operations depend on anatomy and skill, but also on identification, sterile flow, communication, counts, monitoring, and follow-up. Neuber’s work made one of those supports visible and teachable.\n\nThe practical discipline is to design workflow so dirty and clean paths do not cross and unnecessary traffic is limited. The team should preserve patient identity, site, procedure, equipment readiness, antibiotic timing, counts, unexpected findings, and sign-out as shared information rather than private assumptions.\n\nMany catastrophic surgical errors are rare precisely because several defenses normally overlap. A crowded list, hierarchy, missing supplies, and optional paperwork can align those holes. Blaming one pair of hands may leave the pathway intact for the next team.\n\nThe patient-safety lesson: architecture can support or undermine safe behavior. High performance includes the pause, record, and challenge that prevent technical work from reaching the wrong person or place. A near miss belongs in the learning system because the absence of injury may reflect luck rather than a sound process. Instrument and sponge counts protect the patient only when discrepancies stop closure and trigger a search. Briefings work best when every team member can state a concern without waiting for permission from the most senior clinician. Sign-out should capture specimens, equipment problems, postoperative priorities, and any deviation requiring later review.",
      "frame": "Closes the theatre ledger. \"Skill and system meet in the same patient. Start with the aseptic operating room.\"",
      "q": [
        {
          "q": "Which surgical-safety account best captures Gustav Neuber’s work on the aseptic operating room?",
          "o": [
            {
              "t": "Gustav Neuber designed an early aseptic operating environment with separated rooms, washable surfaces, sterilized clothing, and controlled movement. Count reconciliation stays visible before closure. Surgical fits. Surgical fits.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Gustav Neuber's surgical work emphasizes operative technique and individual experience. Surgical records fit this surgical account. Surgical practice makes the surgical view plausible. Surgical timing supports this surgical claim.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Gustav Neuber's surgical work supports an experienced surgeon as able to replace formal site and instrument verification. Surgical practice makes the surgical view plausible. Surgical timing supports this surgical claim.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Gustav Neuber's surgical authority supports skipping the team time-out when a crowded operating list makes delay seem more dangerous than verification. The surgeon’s experience appears reassuring. Surgical fits. Surgical fits.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        },
        {
          "q": "Which team practice most reliably prevents a wrong-site or retained-item event?",
          "o": [
            {
              "t": "Use this operative-safety practice: design workflow so dirty and clean paths do not cross and unnecessary traffic is limited. The team shares the stopping rule.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Confirm consent and procedure in the chart without requiring active team agreement, site marking, and count reconciliation. The schedule supports the account.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Rely on the surgeon’s memory and the schedule because the team has worked together without a prior major error. The surgeon’s experience appears reassuring.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Proceed through a missing site mark or short count to protect throughput, classifying resulting harm as a surgical complication. The case itself seems routine.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        },
        {
          "q": "What patient-safety conclusion follows?",
          "o": [
            {
              "t": "The patient-safety lesson is that architecture can support or undermine safe behavior. The time-out remains connected to patient identification. Surgical fits.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Treat excellent individual technique as able to offset inconsistent checklists and counts in a routine operation. The case itself seems routine. Surgical fits.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Treat a rare site-selection or retained-item event as difficult to prevent because checklists can miss uncommon failure combinations. The surgical record fits.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Attribute the outcome mainly to an incompetent surgeon or unavoidable complication rather than a bypassed team safeguard. The case itself seems routine.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        }
      ]
    },
    "endresult": {
      "sci": "Ernest Codman (1869-1940)",
      "topic": "The 'end result' & surgical accountability",
      "lede": "Surgical success became measurable through Ernest Codman’s work on the ’end result’ and surgical accountability.",
      "no": 6,
      "profile": "The surgical-safety email today studies Ernest Codman through the ’end result’ and surgical accountability. Ernest Codman proposed the 'end result idea': hospitals should follow every patient to learn whether treatment achieved its goal and investigate failures. His insistence on transparent outcomes was resisted by institutions. Operations depend on anatomy and skill, but also on identification, sterile flow, communication, counts, monitoring, and follow-up. Codman’s work made one of those supports visible and teachable.\n\nThe practical discipline is to define expected outcomes, follow patients, classify errors, and feed findings back into practice. The team should preserve patient identity, site, procedure, equipment readiness, antibiotic timing, counts, unexpected findings, and sign-out as shared information rather than private assumptions.\n\nMany catastrophic surgical errors are rare precisely because several defenses normally overlap. A crowded list, hierarchy, missing supplies, and optional paperwork can align those holes. Blaming one pair of hands may leave the pathway intact for the next team.\n\nThe patient-safety lesson: quality improvement begins by counting failures honestly. High performance includes the pause, record, and challenge that prevent technical work from reaching the wrong person or place. A near miss belongs in the learning system because the absence of injury may reflect luck rather than a sound process. Instrument and sponge counts protect the patient only when discrepancies stop closure and trigger a search. Briefings work best when every team member can state a concern without waiting for permission from the most senior clinician. Sign-out should capture specimens, equipment problems, postoperative priorities, and any deviation requiring later review.",
      "frame": "Pauses beside a marked limb. \"A crowded list makes the pause more valuable, not less. Show me the ’end result’ and surgical accountability.\"",
      "q": [
        {
          "q": "Which surgical-safety account best captures Ernest Codman’s work on the ’end result’ and surgical accountability?",
          "o": [
            {
              "t": "Ernest Codman proposed the 'end result idea': hospitals should follow every patient to learn whether treatment achieved its goal and investigate failures. The time-out remains connected to patient identification.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Ernest Codman's surgical work emphasizes operative technique and individual experience. The surgeon’s experience appears reassuring. Prior team performance looks strong. Surgical practice makes the surgical view plausible.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Ernest Codman's surgical work supports an experienced surgeon as able to replace formal site and instrument verification. The surgeon’s experience appears reassuring. Surgical practice makes the surgical view plausible.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Ernest Codman's authority is invoked in surgical practice to justify skipping the team time-out when a crowded operating list makes delay seem more dangerous than verification. The case itself seems routine. Surgical fits.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        },
        {
          "q": "Which team practice most reliably prevents a wrong-site or retained-item event?",
          "o": [
            {
              "t": "Use this operative-safety practice: define expected outcomes, follow patients, classify errors, and feed findings back into practice. The team shares the stopping rule. Surgical fits.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Confirm consent and procedure in the chart without requiring active team agreement, site marking, and count reconciliation. The surgeon’s experience appears reassuring. Surgical fits.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Rely on the surgeon’s memory and the schedule because the team has worked together without a prior major error. The case itself seems routine. Surgical records fit this surgical account.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Proceed through a missing site mark or short count to protect throughput, classifying resulting harm as a surgical complication. Surgical practice makes the surgical view plausible.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        },
        {
          "q": "What patient-safety conclusion follows?",
          "o": [
            {
              "t": "The patient-safety lesson is that quality improvement begins by counting failures honestly. The time-out remains connected to patient identification.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Treat excellent individual technique as able to offset inconsistent checklists and counts in a routine operation. Surgical records fit this surgical account.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Treat a rare site-selection or retained-item event as difficult to prevent because checklists can miss uncommon failure combinations. The surgical record fits.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Attribute the outcome mainly to an incompetent surgeon or unavoidable complication rather than a bypassed team safeguard. The case itself seems routine.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        }
      ]
    },
    "quality": {
      "sci": "Avedis Donabedian (1919-2000)",
      "topic": "Measuring the quality of care",
      "lede": "Avedis Donabedian brought measuring the quality of care into the disciplined teamwork surrounding an operation.",
      "no": 7,
      "profile": "The surgical-safety email today studies Avedis Donabedian through measuring the quality of care. Avedis Donabedian described healthcare quality through structure, process, and outcome. Staffing and equipment are structures; checklists and counts are processes; complications and recovery are outcomes. Operations depend on anatomy and skill, but also on identification, sterile flow, communication, counts, monitoring, and follow-up. Donabedian’s work made one of those supports visible and teachable.\n\nThe practical discipline is to evaluate whether the care environment, performed steps, and patient results support one another. The team should preserve patient identity, site, procedure, equipment readiness, antibiotic timing, counts, unexpected findings, and sign-out as shared information rather than private assumptions.\n\nMany catastrophic surgical errors are rare precisely because several defenses normally overlap. A crowded list, hierarchy, missing supplies, and optional paperwork can align those holes. Blaming one pair of hands may leave the pathway intact for the next team.\n\nThe patient-safety lesson: a good outcome once does not prove a defective process is safe. High performance includes the pause, record, and challenge that prevent technical work from reaching the wrong person or place. A near miss belongs in the learning system because the absence of injury may reflect luck rather than a sound process. Instrument and sponge counts protect the patient only when discrepancies stop closure and trigger a search. Briefings work best when every team member can state a concern without waiting for permission from the most senior clinician. Sign-out should capture specimens, equipment problems, postoperative priorities, and any deviation requiring later review.\n\nDonabedian's structure-process-outcome framework preserves a place for genuine technical complications. A poor outcome does not prove the wrong patient or procedure if identification, consent, site marking, operative technique, and postoperative findings all align; some injuries occur despite sound process. Conversely, a process mismatch is not excused by calling it complication. Comparing the authorized operation with the operation actually performed distinguishes technical risk from a preventable identity failure.",
      "frame": "Lays out the count sheet at The Surgical Office & Records. \"The incision is not the first step. Explain measuring the quality of care before I uncover the sign-out.\"",
      "q": [
        {
          "q": "Which surgical-safety account best captures Avedis Donabedian’s work on measuring the quality of care?",
          "o": [
            {
              "t": "Avedis Donabedian described healthcare quality through structure, process, and outcome. The team shares the stopping rule. Team challenge authority survives schedule pressure.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Avedis Donabedian's surgical work emphasizes operative technique and individual experience. The surgeon’s experience appears reassuring. The schedule supports the account.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Avedis Donabedian's surgical work supports an experienced surgeon as able to replace formal site and instrument verification. The surgeon’s experience appears reassuring.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Avedis Donabedian's authority is invoked in surgical practice to justify skipping the team time-out when a crowded operating list makes delay seem more dangerous than verification.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        },
        {
          "q": "Which team practice most reliably prevents a wrong-site or retained-item event?",
          "o": [
            {
              "t": "Use this operative-safety practice: evaluate whether the care environment, performed steps, and patient results support one another. The team shares the stopping rule. Surgical fits.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Confirm consent and procedure in the chart without requiring active team agreement, site marking, and count reconciliation. The surgeon’s experience appears reassuring. Surgical fits.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Rely on the surgeon’s memory and the schedule because the team has worked together without a prior major error. The case itself seems routine. Surgical records fit this surgical account.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Proceed through a missing site mark or short count to protect throughput, classifying resulting harm as a surgical complication. Prior team performance looks strong. Surgical fits.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        },
        {
          "q": "What patient-safety conclusion follows?",
          "o": [
            {
              "t": "The patient-safety lesson is that a good outcome once does not prove a defective process is safe. Count reconciliation stays visible before closure.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Treat excellent individual technique as able to offset inconsistent checklists and counts in a routine operation. Surgical records fit this surgical account.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Treat a rare site-selection or retained-item event as difficult to prevent because checklists can miss uncommon failure combinations. The surgical record fits.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Attribute the outcome mainly to an incompetent surgeon or unavoidable complication rather than a bypassed team safeguard. The case itself seems routine.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        }
      ]
    },
    "icuchecklist": {
      "sci": "Peter Pronovost (b. 1964)",
      "topic": "The checklist in intensive care",
      "lede": "Peter Pronovost used the checklist in intensive care to turn a technical act into a safer clinical system.",
      "no": 8,
      "profile": "The surgical-safety email today studies Peter Pronovost through the checklist in intensive care. Peter Pronovost led a program using a short checklist and organizational support to reduce central-line bloodstream infections in intensive-care units. The intervention also required supplies, authority to stop unsafe insertion, measurement, and feedback. Operations depend on anatomy and skill, but also on identification, sterile flow, communication, counts, monitoring, and follow-up. Pronovost’s work made one of those supports visible and teachable.\n\nThe practical discipline is to pair a checklist with resources, team permission, surveillance, and leadership follow-through. The team should preserve patient identity, site, procedure, equipment readiness, antibiotic timing, counts, unexpected findings, and sign-out as shared information rather than private assumptions.\n\nMany catastrophic surgical errors are rare precisely because several defenses normally overlap. A crowded list, hierarchy, missing supplies, and optional paperwork can align those holes. Blaming one pair of hands may leave the pathway intact for the next team.\n\nThe patient-safety lesson: a checklist works through implementation, not through paper presence. High performance includes the pause, record, and challenge that prevent technical work from reaching the wrong person or place. A near miss belongs in the learning system because the absence of injury may reflect luck rather than a sound process. Instrument and sponge counts protect the patient only when discrepancies stop closure and trigger a search. Briefings work best when every team member can state a concern without waiting for permission from the most senior clinician. Sign-out should capture specimens, equipment problems, postoperative priorities, and any deviation requiring later review.",
      "frame": "Closes the theatre ledger. \"Skill and system meet in the same patient. Start with the checklist in intensive care.\"",
      "q": [
        {
          "q": "Which surgical-safety account best captures Peter Pronovost’s work on the checklist in intensive care?",
          "o": [
            {
              "t": "Peter Pronovost led a program using a short checklist and organizational support to reduce central-line bloodstream infections in intensive-care units. Count reconciliation stays visible before closure.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Peter Pronovost's surgical work emphasizes operative technique and individual experience. Prior team performance looks strong. Surgical context supports the view. Surgical timing supports this surgical claim.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Peter Pronovost's surgical work supports an experienced surgeon as able to replace formal site and instrument verification. Prior team performance looks strong. Surgical practice makes the surgical view plausible.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Peter Pronovost's surgical authority supports skipping the team time-out when a crowded operating list makes delay seem more dangerous than verification. The surgeon’s experience appears reassuring. Surgical fits.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        },
        {
          "q": "Which team practice most reliably prevents a wrong-site or retained-item event?",
          "o": [
            {
              "t": "Use this operative-safety practice: pair a checklist with resources, team permission, surveillance, and leadership follow-through. The team shares the stopping rule. Surgical context matters. Surgical fits.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Confirm consent and procedure in the chart without requiring active team agreement, site marking, and count reconciliation. Surgical practice makes the surgical view plausible. The surgical record fits.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Rely on the surgeon’s memory and the schedule because the team has worked together without a prior major error. The case itself seems routine. Surgical records fit this surgical account. Surgical fits.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Proceed through a missing site mark or short count to protect throughput, classifying resulting harm as a surgical complication. The schedule supports the account. The surgical record fits. Surgical fits.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        },
        {
          "q": "What patient-safety conclusion follows?",
          "o": [
            {
              "t": "The patient-safety lesson is that a checklist works through implementation, not through paper presence. The time-out remains connected to patient identification.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Treat excellent individual technique as able to offset inconsistent checklists and counts in a routine operation. The surgeon’s experience appears reassuring.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Treat a rare site-selection or retained-item event as difficult to prevent because checklists can miss uncommon failure combinations. The case itself seems routine.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Attribute the outcome mainly to an incompetent surgeon or unavoidable complication rather than a bypassed team safeguard. The surgeon’s experience appears reassuring.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        }
      ]
    },
    "neverevents": {
      "sci": "Martin Makary (surgeon & researcher)",
      "topic": "Wrong-site surgery & 'never events'",
      "lede": "Surgical success became measurable through Martin Makary’s work on wrong-site surgery and ’never events’.",
      "no": 9,
      "profile": "The surgical-safety email today studies Martin Makary through wrong-site surgery and ’never events’. Martin Makary has studied surgical safety, communication, wrong-site procedures, and other preventable harms sometimes called never events. Such events are rare but reveal failures in identification and team controls. Operations depend on anatomy and skill, but also on identification, sterile flow, communication, counts, monitoring, and follow-up. Makary’s work made one of those supports visible and teachable.\n\nThe practical discipline is to analyze near misses and never events for recurring process defects rather than treating each as unique. The team should preserve patient identity, site, procedure, equipment readiness, antibiotic timing, counts, unexpected findings, and sign-out as shared information rather than private assumptions.\n\nMany catastrophic surgical errors are rare precisely because several defenses normally overlap. A crowded list, hierarchy, missing supplies, and optional paperwork can align those holes. Blaming one pair of hands may leave the pathway intact for the next team.\n\nThe patient-safety lesson: rarity does not make a known, preventable pathway acceptable. High performance includes the pause, record, and challenge that prevent technical work from reaching the wrong person or place. A near miss belongs in the learning system because the absence of injury may reflect luck rather than a sound process. Instrument and sponge counts protect the patient only when discrepancies stop closure and trigger a search. Briefings work best when every team member can state a concern without waiting for permission from the most senior clinician. Sign-out should capture specimens, equipment problems, postoperative priorities, and any deviation requiring later review.",
      "frame": "Pauses beside a marked limb. \"A crowded list makes the pause more valuable, not less. Show me wrong-site surgery and ’never events’.\"",
      "q": [
        {
          "q": "Which surgical-safety account best captures Martin Makary’s work on wrong-site surgery and ’never events’?",
          "o": [
            {
              "t": "Martin Makary has studied surgical safety, communication, wrong-site procedures, and other preventable harms sometimes called never events. The team shares the stopping rule.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Martin Makary's surgical work emphasizes operative technique and individual experience. The surgeon’s experience appears reassuring. Surgical practice makes the surgical view plausible.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Martin Makary's surgical work supports an experienced surgeon as able to replace formal site and instrument verification. The surgeon’s experience appears reassuring. Surgical fits.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Martin Makary's authority is invoked in surgical practice to justify skipping the team time-out when a crowded operating list makes delay seem more dangerous than verification.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        },
        {
          "q": "Which team practice most reliably prevents a wrong-site or retained-item event?",
          "o": [
            {
              "t": "Use this operative-safety practice: analyze near misses and never events for recurring process defects rather than treating each as unique. Count reconciliation stays visible before closure. Surgical fits.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Confirm consent and procedure in the chart without requiring active team agreement, site marking, and count reconciliation. The case itself seems routine. Surgical records fit this surgical account.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Rely on the surgeon’s memory and the schedule because the team has worked together without a prior major error. The surgeon’s experience appears reassuring. Surgical practice makes the surgical view plausible.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Proceed through a missing site mark or short count to protect throughput, classifying resulting harm as a surgical complication. The case itself seems routine. Surgical records fit this surgical account.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        },
        {
          "q": "What patient-safety conclusion follows?",
          "o": [
            {
              "t": "The patient-safety lesson is that rarity does not make a known, preventable pathway acceptable. Team challenge authority survives schedule pressure.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Treat excellent individual technique as able to offset inconsistent checklists and counts in a routine operation. Surgical records fit this surgical account.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Treat a rare site-selection or retained-item event as difficult to prevent because checklists can miss uncommon failure combinations. The surgical record fits.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Attribute the outcome mainly to an incompetent surgeon or unavoidable complication rather than a bypassed team safeguard. The case itself seems routine.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "scrubnurse": {
      "theatre": "The anesthesia and operation records is waiting at The Operating Theatre when Scrub Nurse Adler arrives with the consent file. \"Surgical history is today's test; earn the theatre record by reading it closely.\"",
      "stores": "The tray and count documentation is waiting at The Sterile Stores & Instrument Count when Scrub Nurse Adler arrives with the consent file. \"Surgical history is today's test; earn the theatre record by reading it closely.\"",
      "records": "The consent and scheduling files is waiting at The Surgical Office & Records when Scrub Nurse Adler arrives with the consent file. \"Surgical history is today's test; earn the theatre record by reading it closely.\""
    },
    "orderly": {
      "theatre": "The anesthesia and operation records is waiting at The Operating Theatre when The Orderly arrives with the consent file. \"The movement log waits until you demonstrate command of the pioneer.\"",
      "stores": "The tray and count documentation is waiting at The Sterile Stores & Instrument Count when The Orderly arrives with the consent file. \"The movement log waits until you demonstrate command of the pioneer.\"",
      "records": "The consent and scheduling files is waiting at The Surgical Office & Records when The Orderly arrives with the consent file. \"The movement log waits until you demonstrate command of the pioneer.\""
    },
    "clerk": {
      "theatre": "The anesthesia and operation records is waiting at The Operating Theatre when The Clerk arrives with the consent file. \"Get the safety lesson right, and I will open the administrative file.\"",
      "stores": "The tray and count documentation is waiting at The Sterile Stores & Instrument Count when The Clerk arrives with the consent file. \"Get the safety lesson right, and I will open the administrative file.\"",
      "records": "The consent and scheduling files is waiting at The Surgical Office & Records when The Clerk arrives with the consent file. \"Get the safety lesson right, and I will open the administrative file.\""
    }
  },
  "story": [
    "<b>The Wrong Side</b> opens inside the St. Auben Hospital inquiry, where the visible damage is easier to describe than the chain that produced it.",
    "<b>Scrub Nurse Adler</b>, <b>The Orderly</b>, and <b>The Clerk</b> each control a different slice of the record, and each conversation turns one real pioneer into a way of reading the case.",
    "Some witnesses are drawn toward <b>A retained instrument followed an unresolved count discrepancy.</b>; others settle too quickly on <b>A technical injury occurred despite the correct patient and procedure.</b>. Your job is to separate those tempting stories from the harder explanation the evidence supports.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide what the case is really about."
  ],
  "endings": {
    "overclaimWhat": "incompetence",
    "dismissalWhat": "complication",
    "win": {
      "expertTitle": "The Operation Authorized for Someone Else's Side",
      "expert": [
        "Investigator Cole Ferris names Dr. Vane — the surgical chief of service, The Surgical Office & Records, and Wrong-site surgery followed failed identification and no time-out. Not A retained instrument followed an unresolved count discrepancy. Not A technical injury occurred despite the correct patient and procedure.",
        "The readings distinguish a retained item, an unavoidable technical injury, and wrong-site surgery through count reconciliation, imaging, consent, patient identity, site marking, and the pre-incision time-out."
      ],
      "soundTitle": "A Sound Never-Event Finding",
      "sound": [
        "Consent evidence fixes the trio: Dr. Vane — the surgical chief of service; The Surgical Office & Records; Wrong-site surgery followed failed identification and no time-out.",
        "The identity failure is proved; the managerial chain behind the workflow needs fuller support."
      ],
      "namedTitle": "Correct Event, Limited Chain",
      "named": [
        "Consent evidence points to Dr. Vane — the surgical chief of service, The Surgical Office & Records, and Wrong-site surgery followed failed identification and no time-out; consent support remains incomplete.",
        "The never-event category is correct, though the responsibility case remains underdeveloped."
      ]
    },
    "overclaim": {
      "title": "The Retained-Instrument Theory",
      "body": [
        "Investigator Cole Ferris calls the event A retained instrument followed an unresolved count discrepancy. Imaging and the reconciled count defeat that account.",
        "A retained instrument should leave an unresolved count and postoperative imaging showing a foreign object. The count closes and no item is present, so the discrepancy does not explain the harm."
      ]
    },
    "dismissal": {
      "title": "The Technical-Complication Theory",
      "body": [
        "Investigator Cole Ferris instead calls it A technical injury occurred despite the correct patient and procedure. The consent mismatch cannot be reduced to technical complication.",
        "A technical complication can occur during the intended operation despite appropriate preparation, but the records show the procedure was performed on a site not authorized by consent and marking."
      ]
    },
    "wrongNames": {
      "title": "Right Event, Wrong Names",
      "body": [
        "Wrong-site surgery is identified, but WHO or WHERE is mistaken. Restore the identity-record chain before the final finding."
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"An operating table and skipped checklist\"><rect x=\"112\" y=\"58\" width=\"162\" height=\"26\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M138 84 L126 108 M248 84 L260 108\" stroke=\"#121212\" stroke-width=\"1.5\"/><circle cx=\"98\" cy=\"72\" r=\"12\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><rect x=\"380\" y=\"32\" width=\"134\" height=\"80\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M398 52 L496 52 M398 70 L454 70 M398 88 L474 88\" stroke=\"#121212\" stroke-width=\"1.3\"/><path d=\"M476 60 l24 24 M500 60 l-24 24\" stroke=\"#B3261E\" stroke-width=\"2\"/><path d=\"M276 70 C312 50,334 50,370 70\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/></svg>"
}};
