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
  "boardNarr": "You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  "placeNarr": "You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
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
        "ligature",
        "ovariotomy"
      ],
      "orderly": [
        "fastknife",
        "antiseptic"
      ],
      "clerk": [
        "abdominal",
        "steam"
      ]
    },
    "stores": {
      "scrubnurse": [
        "thyroid",
        "asepsis"
      ],
      "orderly": [
        "operatingroom",
        "neurosurg"
      ],
      "clerk": [
        "endresult",
        "vascular"
      ]
    },
    "records": {
      "scrubnurse": [
        "quality",
        "error"
      ],
      "orderly": [
        "icuchecklist",
        "surgchecklist"
      ],
      "clerk": [
        "neverevents",
        "improvement"
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
      "frame": "Scrub Nurse Adler lays out the count sheet at The Operating Theatre. \"The incision is not the first step. Explain battlefield surgery and the ligature before I uncover the sign-out.\"",
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
    "ovariotomy": {
      "sci": "Ephraim McDowell (1771-1830)",
      "topic": "Early abdominal surgery",
      "lede": "Surgical success became measurable through Ephraim McDowell’s work on early abdominal surgery.",
      "no": 2,
      "profile": "The surgical-safety email today studies Ephraim McDowell through early abdominal surgery. Ephraim McDowell performed an early successful removal of an ovarian tumor in 1809, before anesthesia and antisepsis. The operation was extraordinary but occurred in an era when selection, cleanliness, and postoperative risk were poorly controlled. Operations depend on anatomy and skill, but also on identification, sterile flow, communication, counts, monitoring, and follow-up. McDowell’s work made one of those supports visible and teachable.\n\nThe practical discipline is to distinguish an exceptional successful case from evidence that a procedure is broadly safe. The team should preserve patient identity, site, procedure, equipment readiness, antibiotic timing, counts, unexpected findings, and sign-out as shared information rather than private assumptions.\n\nMany catastrophic surgical errors are rare precisely because several defenses normally overlap. A crowded list, hierarchy, missing supplies, and optional paperwork can align those holes. Blaming one pair of hands may leave the pathway intact for the next team.\n\nThe patient-safety lesson: innovation requires outcome tracking beyond the celebrated first patient. High performance includes the pause, record, and challenge that prevent technical work from reaching the wrong person or place. A near miss belongs in the learning system because the absence of injury may reflect luck rather than a sound process. Instrument and sponge counts protect the patient only when discrepancies stop closure and trigger a search. Briefings work best when every team member can state a concern without waiting for permission from the most senior clinician. Sign-out should capture specimens, equipment problems, postoperative priorities, and any deviation requiring later review.",
      "frame": "Scrub Nurse Adler pauses beside a marked limb. \"A crowded list makes the pause more valuable, not less. Show me early abdominal surgery.\"",
      "q": [
        {
          "q": "Which surgical-safety account best captures Ephraim McDowell’s work on early abdominal surgery?",
          "o": [
            {
              "t": "Ephraim McDowell performed an early successful removal of an ovarian tumor in 1809, before anesthesia and antisepsis. Count reconciliation stays visible before closure. Surgical fits.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Ephraim McDowell's surgical work emphasizes operative technique and individual experience. Surgical practice makes the surgical view plausible. Surgical timing supports this surgical claim.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Ephraim McDowell's surgical work supports an experienced surgeon as able to replace formal site and instrument verification. Surgical practice makes the surgical view plausible.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Ephraim McDowell's surgical authority supports skipping the team time-out when a crowded operating list makes delay seem more dangerous than verification. The surgical record fits.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        },
        {
          "q": "Which team practice most reliably prevents a wrong-site or retained-item event?",
          "o": [
            {
              "t": "Use this operative-safety practice: distinguish an exceptional successful case from evidence that a procedure is broadly safe. The team shares the stopping rule.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Confirm consent and procedure in the chart without requiring active team agreement, site marking, and count reconciliation. Surgical timing supports this surgical claim.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Rely on the surgeon’s memory and the schedule because the team has worked together without a prior major error. The surgeon’s experience appears reassuring. Surgical fits.",
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
              "t": "The patient-safety lesson is that innovation requires outcome tracking beyond the celebrated first patient. The operative record stays complete. Surgical fits.",
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
    "fastknife": {
      "sci": "Robert Liston (1794-1847)",
      "topic": "Surgery in the age before anesthesia",
      "lede": "Robert Liston used surgery in the age before anesthesia to turn a technical act into a safer clinical system.",
      "no": 3,
      "profile": "The surgical-safety email today studies Robert Liston through surgery in the age before anesthesia. Robert Liston was renowned for speed in the pre-anesthetic operating theater, where reducing time could reduce agony and shock. His reputation also illustrates how a valuable performance trait can become dangerous when treated as the sole measure of quality. Operations depend on anatomy and skill, but also on identification, sterile flow, communication, counts, monitoring, and follow-up. Liston’s work made one of those supports visible and teachable.\n\nThe practical discipline is to balance speed with identification, hemostasis, tissue protection, and team verification. The team should preserve patient identity, site, procedure, equipment readiness, antibiotic timing, counts, unexpected findings, and sign-out as shared information rather than private assumptions.\n\nMany catastrophic surgical errors are rare precisely because several defenses normally overlap. A crowded list, hierarchy, missing supplies, and optional paperwork can align those holes. Blaming one pair of hands may leave the pathway intact for the next team.\n\nThe patient-safety lesson: efficiency is not safety when it removes the pause that catches an error. High performance includes the pause, record, and challenge that prevent technical work from reaching the wrong person or place. A near miss belongs in the learning system because the absence of injury may reflect luck rather than a sound process. Instrument and sponge counts protect the patient only when discrepancies stop closure and trigger a search. Briefings work best when every team member can state a concern without waiting for permission from the most senior clinician.",
      "frame": "The Orderly closes the theatre ledger. \"Skill and system meet in the same patient. Start with surgery in the age before anesthesia.\"",
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
    "antiseptic": {
      "sci": "Joseph Lister (1827-1912)",
      "topic": "Antiseptic surgery",
      "lede": "Joseph Lister brought antiseptic surgery into the disciplined teamwork surrounding an operation.",
      "no": 4,
      "profile": "The surgical-safety email today studies Joseph Lister through antiseptic surgery. Joseph Lister applied germ theory to surgery using carbolic acid, clean dressings, and changes in operative practice. Falling infection rates helped establish that postoperative sepsis was preventable rather than an inevitable consequence of surgery. Operations depend on anatomy and skill, but also on identification, sterile flow, communication, counts, monitoring, and follow-up. Lister’s work made one of those supports visible and teachable.\n\nThe practical discipline is to control contamination before, during, and after an operation and compare infection outcomes. The team should preserve patient identity, site, procedure, equipment readiness, antibiotic timing, counts, unexpected findings, and sign-out as shared information rather than private assumptions.\n\nMany catastrophic surgical errors are rare precisely because several defenses normally overlap. A crowded list, hierarchy, missing supplies, and optional paperwork can align those holes. Blaming one pair of hands may leave the pathway intact for the next team.\n\nThe patient-safety lesson: a safety protocol earns authority through consistent results and consistent use. High performance includes the pause, record, and challenge that prevent technical work from reaching the wrong person or place. A near miss belongs in the learning system because the absence of injury may reflect luck rather than a sound process. Instrument and sponge counts protect the patient only when discrepancies stop closure and trigger a search. Briefings work best when every team member can state a concern without waiting for permission from the most senior clinician. Sign-out should capture specimens, equipment problems, postoperative priorities, and any deviation requiring later review.",
      "frame": "The Orderly lays out the count sheet at The Operating Theatre. \"The incision is not the first step. Explain antiseptic surgery before I uncover the sign-out.\"",
      "q": [
        {
          "q": "Which surgical-safety account best captures Joseph Lister’s work on antiseptic surgery?",
          "o": [
            {
              "t": "Joseph Lister applied germ theory to surgery using carbolic acid, clean dressings, and changes in operative practice. The operative record stays complete.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Joseph Lister's surgical work relies on operative technique and individual experience. The case itself seems routine. Surgical records fit this surgical account.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Joseph Lister's surgical work supports an experienced surgeon as able to replace formal site and instrument verification. The case itself seems routine.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Joseph Lister's surgical authority supports skipping the team time-out when a crowded operating list makes delay seem more dangerous than verification.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        },
        {
          "q": "Which team practice most reliably prevents a wrong-site or retained-item event?",
          "o": [
            {
              "t": "Use this operative-safety practice: control contamination before, during, and after an operation and compare infection outcomes. The team shares the stopping rule. Surgical context matters. Surgical fits.",
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
              "t": "The patient-safety lesson is that a safety protocol earns authority through consistent results and consistent use. Surgical context matters.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Treat excellent individual technique as able to offset inconsistent checklists and counts in a routine operation. The surgical record fits.",
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
    "abdominal": {
      "sci": "Theodor Billroth (1829-1894)",
      "topic": "The birth of abdominal surgery",
      "lede": "Surgical success became measurable through Theodor Billroth’s work on the birth of abdominal surgery.",
      "no": 5,
      "profile": "The surgical-safety email today studies Theodor Billroth through the birth of abdominal surgery. Theodor Billroth pioneered major abdominal operations, including gastrectomy, while building a disciplined surgical clinic with pathology and follow-up. His work showed that complex procedures depend on anatomy, technique, and institutional learning. Operations depend on anatomy and skill, but also on identification, sterile flow, communication, counts, monitoring, and follow-up. Billroth’s work made one of those supports visible and teachable.\n\nThe practical discipline is to link operative findings, specimen pathology, complications, and long-term outcomes. The team should preserve patient identity, site, procedure, equipment readiness, antibiotic timing, counts, unexpected findings, and sign-out as shared information rather than private assumptions.\n\nMany catastrophic surgical errors are rare precisely because several defenses normally overlap. A crowded list, hierarchy, missing supplies, and optional paperwork can align those holes. Blaming one pair of hands may leave the pathway intact for the next team.\n\nThe patient-safety lesson: a successful operation is defined by the patient's result, not completion of the procedure. High performance includes the pause, record, and challenge that prevent technical work from reaching the wrong person or place. A near miss belongs in the learning system because the absence of injury may reflect luck rather than a sound process. Instrument and sponge counts protect the patient only when discrepancies stop closure and trigger a search. Briefings work best when every team member can state a concern without waiting for permission from the most senior clinician. Sign-out should capture specimens, equipment problems, postoperative priorities, and any deviation requiring later review.",
      "frame": "The Clerk pauses beside a marked limb. \"A crowded list makes the pause more valuable, not less. Show me the birth of abdominal surgery.\"",
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
    "steam": {
      "sci": "Ernst von Bergmann (1836-1907)",
      "topic": "Steam sterilization of instruments",
      "lede": "Ernst von Bergmann used steam sterilization of instruments to turn a technical act into a safer clinical system.",
      "no": 6,
      "profile": "The surgical-safety email today studies Ernst von Bergmann through steam sterilization of instruments. Ernst von Bergmann introduced steam sterilization of surgical instruments into clinical practice. Pressurized steam provided a more reliable method than surface washing for destroying microbes on reusable tools. Operations depend on anatomy and skill, but also on identification, sterile flow, communication, counts, monitoring, and follow-up. Bergmann’s work made one of those supports visible and teachable.\n\nThe practical discipline is to validate sterilizer temperature, exposure, penetration, packaging, and load records. The team should preserve patient identity, site, procedure, equipment readiness, antibiotic timing, counts, unexpected findings, and sign-out as shared information rather than private assumptions.\n\nMany catastrophic surgical errors are rare precisely because several defenses normally overlap. A crowded list, hierarchy, missing supplies, and optional paperwork can align those holes. Blaming one pair of hands may leave the pathway intact for the next team.\n\nThe patient-safety lesson: sterile appearance cannot substitute for a verified process. High performance includes the pause, record, and challenge that prevent technical work from reaching the wrong person or place. A near miss belongs in the learning system because the absence of injury may reflect luck rather than a sound process. Instrument and sponge counts protect the patient only when discrepancies stop closure and trigger a search. Briefings work best when every team member can state a concern without waiting for permission from the most senior clinician. Sign-out should capture specimens, equipment problems, postoperative priorities, and any deviation requiring later review. Outcome review must examine workflow and policy alongside individual performance to prevent recurrence.",
      "frame": "The Clerk closes the theatre ledger. \"Skill and system meet in the same patient. Start with steam sterilization of instruments.\"",
      "q": [
        {
          "q": "Which surgical-safety account best captures Ernst von Bergmann’s work on steam sterilization of instruments?",
          "o": [
            {
              "t": "Ernst von Bergmann introduced steam sterilization of surgical instruments into clinical practice. The team shares the stopping rule. Count reconciliation stays visible before closure. Fits.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Ernst von Bergmann's surgical work emphasizes operative technique and individual experience. The surgeon’s experience appears reassuring. Surgical practice makes the surgical view plausible.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Ernst von Bergmann's surgical work is read within surgical practice as support for an experienced surgeon as able to replace formal site and instrument verification. The schedule supports the account.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Ernst von Bergmann's authority is invoked in surgical practice to justify skipping the team time-out when a crowded operating list makes delay seem more dangerous than verification. Context fits.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        },
        {
          "q": "Which team practice most reliably prevents a wrong-site or retained-item event?",
          "o": [
            {
              "t": "Use this operative-safety practice: validate sterilizer temperature, exposure, penetration, packaging, and load records. The operative record stays complete. Team challenge authority survives schedule pressure. Surgical fits.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Confirm consent and procedure in the chart without requiring active team agreement, site marking, and count reconciliation. The surgeon’s experience appears reassuring. Surgical practice makes the surgical view plausible.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Rely on the surgeon’s memory and the schedule because the team has worked together without a prior major error. The case itself seems routine. Surgical context supports the view. Surgical timing supports this surgical claim.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Proceed through a missing site mark or short count to protect throughput, classifying resulting harm as a surgical complication. The surgeon’s experience appears reassuring. The schedule supports the account. Surgical fits.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        },
        {
          "q": "What patient-safety conclusion follows?",
          "o": [
            {
              "t": "The patient-safety lesson is that sterile appearance cannot substitute for a verified process. Team challenge authority survives schedule pressure.",
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
    "thyroid": {
      "sci": "Theodor Kocher (1841-1917)",
      "topic": "Precision thyroid surgery",
      "lede": "Theodor Kocher brought precision thyroid surgery into the disciplined teamwork surrounding an operation.",
      "no": 7,
      "profile": "The surgical-safety email today studies Theodor Kocher through precision thyroid surgery. Theodor Kocher transformed thyroid surgery through meticulous dissection, hemostasis, and outcome study, greatly reducing mortality. He also recognized that removing too much thyroid caused serious physiological consequences. Operations depend on anatomy and skill, but also on identification, sterile flow, communication, counts, monitoring, and follow-up. Kocher’s work made one of those supports visible and teachable.\n\nThe practical discipline is to standardize technique and track both immediate complications and delayed functional outcomes. The team should preserve patient identity, site, procedure, equipment readiness, antibiotic timing, counts, unexpected findings, and sign-out as shared information rather than private assumptions.\n\nMany catastrophic surgical errors are rare precisely because several defenses normally overlap. A crowded list, hierarchy, missing supplies, and optional paperwork can align those holes. Blaming one pair of hands may leave the pathway intact for the next team.\n\nThe patient-safety lesson: precision includes preserving what the patient still needs. High performance includes the pause, record, and challenge that prevent technical work from reaching the wrong person or place. A near miss belongs in the learning system because the absence of injury may reflect luck rather than a sound process. Instrument and sponge counts protect the patient only when discrepancies stop closure and trigger a search. Briefings work best when every team member can state a concern without waiting for permission from the most senior clinician. Sign-out should capture specimens, equipment problems, postoperative priorities, and any deviation requiring later review. Outcome review must examine workflow and policy alongside individual performance to prevent recurrence.",
      "frame": "Scrub Nurse Adler lays out the count sheet at The Sterile Stores & Instrument Count. \"The incision is not the first step. Explain precision thyroid surgery before I uncover the sign-out.\"",
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
    "asepsis": {
      "sci": "William Halsted (1852-1922)",
      "topic": "Aseptic technique & surgical gloves",
      "lede": "Surgical success became measurable through William Halsted’s work on aseptic technique and surgical gloves.",
      "no": 8,
      "profile": "The surgical-safety email today studies William Halsted through aseptic technique and surgical gloves. William Halsted promoted meticulous aseptic surgery and introduced rubber gloves after antiseptic chemicals damaged a nurse's hands. His training system emphasized careful tissue handling, hemostasis, and disciplined technique. Operations depend on anatomy and skill, but also on identification, sterile flow, communication, counts, monitoring, and follow-up. Halsted’s work made one of those supports visible and teachable.\n\nThe practical discipline is to create a sterile field and maintain it through every handoff, glove, instrument, and break in procedure. The team should preserve patient identity, site, procedure, equipment readiness, antibiotic timing, counts, unexpected findings, and sign-out as shared information rather than private assumptions.\n\nMany catastrophic surgical errors are rare precisely because several defenses normally overlap. A crowded list, hierarchy, missing supplies, and optional paperwork can align those holes. Blaming one pair of hands may leave the pathway intact for the next team.\n\nThe patient-safety lesson: asepsis is a team behavior, not a property of one surgeon. High performance includes the pause, record, and challenge that prevent technical work from reaching the wrong person or place. A near miss belongs in the learning system because the absence of injury may reflect luck rather than a sound process. Instrument and sponge counts protect the patient only when discrepancies stop closure and trigger a search. Briefings work best when every team member can state a concern without waiting for permission from the most senior clinician. Sign-out should capture specimens, equipment problems, postoperative priorities, and any deviation requiring later review.",
      "frame": "Scrub Nurse Adler pauses beside a marked limb. \"A crowded list makes the pause more valuable, not less. Show me aseptic technique and surgical gloves.\"",
      "q": [
        {
          "q": "Which surgical-safety account best captures William Halsted’s work on aseptic technique and surgical gloves?",
          "o": [
            {
              "t": "William Halsted promoted meticulous aseptic surgery and introduced rubber gloves after antiseptic chemicals damaged a nurse's hands. Count reconciliation stays visible before closure.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "William Halsted's surgical work emphasizes operative technique and individual experience. The surgeon’s experience appears reassuring. Surgical practice makes the surgical view plausible.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "William Halsted's surgical work is read within surgical practice as support for an experienced surgeon as able to replace formal site and instrument verification. The case itself seems routine.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "William Halsted's authority is invoked in surgical practice to justify skipping the team time-out when a crowded operating list makes delay seem more dangerous than verification. Fits.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        },
        {
          "q": "Which team practice most reliably prevents a wrong-site or retained-item event?",
          "o": [
            {
              "t": "Use this operative-safety practice: create a sterile field and maintain it through every handoff, glove, instrument, and break in procedure. The team shares the stopping rule. The operative record stays complete. Surgical fits. Surgical fits.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Confirm consent and procedure in the chart without requiring active team agreement, site marking, and count reconciliation. The surgeon’s experience appears reassuring. Surgical practice makes the surgical view plausible. Surgical fits.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Rely on the surgeon’s memory and the schedule because the team has worked together without a prior major error. The case itself seems routine. Surgical practice makes the surgical view plausible. Surgical timing supports this surgical claim.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Proceed through a missing site mark or short count to protect throughput, classifying resulting harm as a surgical complication. The surgeon’s experience appears reassuring. Prior team performance looks strong. Surgical fits. Surgical fits.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        },
        {
          "q": "What patient-safety conclusion follows?",
          "o": [
            {
              "t": "The patient-safety lesson is that asepsis is a team behavior, not a property of one surgeon. The time-out remains connected to patient identification. Surgical fits.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Treat excellent individual technique as able to offset inconsistent checklists and counts in a routine operation. The schedule supports the account. Surgical fits.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Treat a rare site-selection or retained-item event as difficult to prevent because checklists can miss uncommon failure combinations. The context fits. Surgical fits.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Attribute the outcome mainly to an incompetent surgeon or unavoidable complication rather than a bypassed team safeguard. Surgical records fit this surgical account.",
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
      "no": 9,
      "profile": "The surgical-safety email today studies Gustav Neuber through the aseptic operating room. Gustav Neuber designed an early aseptic operating environment with separated rooms, washable surfaces, sterilized clothing, and controlled movement. He treated the room itself as part of infection prevention. Operations depend on anatomy and skill, but also on identification, sterile flow, communication, counts, monitoring, and follow-up. Neuber’s work made one of those supports visible and teachable.\n\nThe practical discipline is to design workflow so dirty and clean paths do not cross and unnecessary traffic is limited. The team should preserve patient identity, site, procedure, equipment readiness, antibiotic timing, counts, unexpected findings, and sign-out as shared information rather than private assumptions.\n\nMany catastrophic surgical errors are rare precisely because several defenses normally overlap. A crowded list, hierarchy, missing supplies, and optional paperwork can align those holes. Blaming one pair of hands may leave the pathway intact for the next team.\n\nThe patient-safety lesson: architecture can support or undermine safe behavior. High performance includes the pause, record, and challenge that prevent technical work from reaching the wrong person or place. A near miss belongs in the learning system because the absence of injury may reflect luck rather than a sound process. Instrument and sponge counts protect the patient only when discrepancies stop closure and trigger a search. Briefings work best when every team member can state a concern without waiting for permission from the most senior clinician. Sign-out should capture specimens, equipment problems, postoperative priorities, and any deviation requiring later review.",
      "frame": "The Orderly closes the theatre ledger. \"Skill and system meet in the same patient. Start with the aseptic operating room.\"",
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
    "neurosurg": {
      "sci": "Harvey Cushing (1869-1939)",
      "topic": "Neurosurgery & the anesthesia record",
      "lede": "Harvey Cushing brought neurosurgery and the anesthesia record into the disciplined teamwork surrounding an operation.",
      "no": 10,
      "profile": "The surgical-safety email today studies Harvey Cushing through neurosurgery and the anesthesia record. Harvey Cushing advanced neurosurgery through careful technique, physiological monitoring, and detailed anesthesia records. The 'Cushing chart' tracked pulse, respiration, and other data through an operation. Operations depend on anatomy and skill, but also on identification, sterile flow, communication, counts, monitoring, and follow-up. Cushing’s work made one of those supports visible and teachable.\n\nThe practical discipline is to record the patient's condition continuously and respond to trends rather than isolated values. The team should preserve patient identity, site, procedure, equipment readiness, antibiotic timing, counts, unexpected findings, and sign-out as shared information rather than private assumptions.\n\nMany catastrophic surgical errors are rare precisely because several defenses normally overlap. A crowded list, hierarchy, missing supplies, and optional paperwork can align those holes. Blaming one pair of hands may leave the pathway intact for the next team.\n\nThe patient-safety lesson: a complete operative record makes deterioration and decision timing reviewable. High performance includes the pause, record, and challenge that prevent technical work from reaching the wrong person or place. A near miss belongs in the learning system because the absence of injury may reflect luck rather than a sound process. Instrument and sponge counts protect the patient only when discrepancies stop closure and trigger a search. Briefings work best when every team member can state a concern without waiting for permission from the most senior clinician. Sign-out should capture specimens, equipment problems, postoperative priorities, and any deviation requiring later review. Outcome review must examine workflow and policy alongside individual performance to prevent recurrence.",
      "frame": "The Orderly lays out the count sheet at The Sterile Stores & Instrument Count. \"The incision is not the first step. Explain neurosurgery and the anesthesia record before I uncover the sign-out.\"",
      "q": [
        {
          "q": "Which surgical-safety account best captures Harvey Cushing’s work on neurosurgery and the anesthesia record?",
          "o": [
            {
              "t": "Harvey Cushing advanced neurosurgery through careful technique, physiological monitoring, and detailed anesthesia records. Count reconciliation stays visible before closure.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Harvey Cushing's surgical work emphasizes operative technique and individual experience. The surgeon’s experience appears reassuring. Surgical timing supports this surgical claim.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Harvey Cushing's surgical work supports an experienced surgeon as able to replace formal site and instrument verification. The surgeon’s experience appears reassuring.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Harvey Cushing's authority is invoked in surgical practice to justify skipping the team time-out when a crowded operating list makes delay seem more dangerous than verification.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        },
        {
          "q": "Which team practice most reliably prevents a wrong-site or retained-item event?",
          "o": [
            {
              "t": "Use this operative-safety practice: record the patient's condition continuously and respond to trends rather than isolated values. The team shares the stopping rule. Surgical context matters. Surgical fits.",
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
              "t": "The patient-safety lesson is that a complete operative record makes deterioration and decision timing reviewable. Surgical context matters.",
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
    "endresult": {
      "sci": "Ernest Codman (1869-1940)",
      "topic": "The 'end result' & surgical accountability",
      "lede": "Surgical success became measurable through Ernest Codman’s work on the ’end result’ and surgical accountability.",
      "no": 11,
      "profile": "The surgical-safety email today studies Ernest Codman through the ’end result’ and surgical accountability. Ernest Codman proposed the 'end result idea': hospitals should follow every patient to learn whether treatment achieved its goal and investigate failures. His insistence on transparent outcomes was resisted by institutions. Operations depend on anatomy and skill, but also on identification, sterile flow, communication, counts, monitoring, and follow-up. Codman’s work made one of those supports visible and teachable.\n\nThe practical discipline is to define expected outcomes, follow patients, classify errors, and feed findings back into practice. The team should preserve patient identity, site, procedure, equipment readiness, antibiotic timing, counts, unexpected findings, and sign-out as shared information rather than private assumptions.\n\nMany catastrophic surgical errors are rare precisely because several defenses normally overlap. A crowded list, hierarchy, missing supplies, and optional paperwork can align those holes. Blaming one pair of hands may leave the pathway intact for the next team.\n\nThe patient-safety lesson: quality improvement begins by counting failures honestly. High performance includes the pause, record, and challenge that prevent technical work from reaching the wrong person or place. A near miss belongs in the learning system because the absence of injury may reflect luck rather than a sound process. Instrument and sponge counts protect the patient only when discrepancies stop closure and trigger a search. Briefings work best when every team member can state a concern without waiting for permission from the most senior clinician. Sign-out should capture specimens, equipment problems, postoperative priorities, and any deviation requiring later review.",
      "frame": "The Clerk pauses beside a marked limb. \"A crowded list makes the pause more valuable, not less. Show me the ’end result’ and surgical accountability.\"",
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
    "vascular": {
      "sci": "Alexis Carrel (1873-1944)",
      "topic": "Vascular suture technique",
      "lede": "Alexis Carrel used vascular suture technique to turn a technical act into a safer clinical system.",
      "no": 12,
      "profile": "The surgical-safety email today studies Alexis Carrel through vascular suture technique. Alexis Carrel developed precise vascular-suture techniques that enabled reliable joining of blood vessels and supported later transplantation and vascular surgery. His triangulation method improved alignment and reduced narrowing. Operations depend on anatomy and skill, but also on identification, sterile flow, communication, counts, monitoring, and follow-up. Carrel’s work made one of those supports visible and teachable.\n\nThe practical discipline is to standardize fine technique and test patency, leakage, and tissue injury. The team should preserve patient identity, site, procedure, equipment readiness, antibiotic timing, counts, unexpected findings, and sign-out as shared information rather than private assumptions.\n\nMany catastrophic surgical errors are rare precisely because several defenses normally overlap. A crowded list, hierarchy, missing supplies, and optional paperwork can align those holes. Blaming one pair of hands may leave the pathway intact for the next team.\n\nThe patient-safety lesson: small technical deviations can produce large downstream harm. High performance includes the pause, record, and challenge that prevent technical work from reaching the wrong person or place. A near miss belongs in the learning system because the absence of injury may reflect luck rather than a sound process. Instrument and sponge counts protect the patient only when discrepancies stop closure and trigger a search. Briefings work best when every team member can state a concern without waiting for permission from the most senior clinician. Sign-out should capture specimens, equipment problems, postoperative priorities, and any deviation requiring later review. Outcome review must examine workflow and policy alongside individual performance to prevent recurrence.",
      "frame": "The Clerk closes the theatre ledger. \"Skill and system meet in the same patient. Start with vascular suture technique.\"",
      "q": [
        {
          "q": "Which surgical-safety account best captures Alexis Carrel’s work on vascular suture technique?",
          "o": [
            {
              "t": "Alexis Carrel developed precise vascular-suture techniques that enabled reliable joining of blood vessels and supported later transplantation and vascular surgery.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Alexis Carrel's surgical work emphasizes operative technique and individual experience. Surgical context supports the view. Surgical timing supports this surgical claim.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Alexis Carrel's surgical work supports an experienced surgeon as able to replace formal site and instrument verification. Surgical practice makes the surgical view plausible.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Alexis Carrel's surgical authority supports skipping the team time-out when a crowded operating list makes delay seem more dangerous than verification. Surgical fits.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        },
        {
          "q": "Which team practice most reliably prevents a wrong-site or retained-item event?",
          "o": [
            {
              "t": "Use this operative-safety practice: standardize fine technique and test patency, leakage, and tissue injury. Count reconciliation stays visible before closure.",
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
              "t": "The patient-safety lesson is that small technical deviations can produce large downstream harm. Team challenge authority survives schedule pressure.",
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
      "no": 13,
      "profile": "The surgical-safety email today studies Avedis Donabedian through measuring the quality of care. Avedis Donabedian described healthcare quality through structure, process, and outcome. Staffing and equipment are structures; checklists and counts are processes; complications and recovery are outcomes. Operations depend on anatomy and skill, but also on identification, sterile flow, communication, counts, monitoring, and follow-up. Donabedian’s work made one of those supports visible and teachable.\n\nThe practical discipline is to evaluate whether the care environment, performed steps, and patient results support one another. The team should preserve patient identity, site, procedure, equipment readiness, antibiotic timing, counts, unexpected findings, and sign-out as shared information rather than private assumptions.\n\nMany catastrophic surgical errors are rare precisely because several defenses normally overlap. A crowded list, hierarchy, missing supplies, and optional paperwork can align those holes. Blaming one pair of hands may leave the pathway intact for the next team.\n\nThe patient-safety lesson: a good outcome once does not prove a defective process is safe. High performance includes the pause, record, and challenge that prevent technical work from reaching the wrong person or place. A near miss belongs in the learning system because the absence of injury may reflect luck rather than a sound process. Instrument and sponge counts protect the patient only when discrepancies stop closure and trigger a search. Briefings work best when every team member can state a concern without waiting for permission from the most senior clinician. Sign-out should capture specimens, equipment problems, postoperative priorities, and any deviation requiring later review.\n\nDonabedian's structure-process-outcome framework preserves a place for genuine technical complications. A poor outcome does not prove the wrong patient or procedure if identification, consent, site marking, operative technique, and postoperative findings all align; some injuries occur despite sound process. Conversely, a process mismatch is not excused by calling it complication. Comparing the authorized operation with the operation actually performed distinguishes technical risk from a preventable identity failure.",
      "frame": "Scrub Nurse Adler lays out the count sheet at The Surgical Office & Records. \"The incision is not the first step. Explain measuring the quality of care before I uncover the sign-out.\"",
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
    "error": {
      "sci": "Lucian Leape (patient-safety researcher, b. 1930)",
      "topic": "Medical error & preventable harm",
      "lede": "Surgical success became measurable through Lucian Leape’s work on medical error and preventable harm.",
      "no": 14,
      "profile": "The surgical-safety email today studies Lucian Leape through medical error and preventable harm. Lucian Leape helped establish medical error as a systems problem rather than a collection of bad individuals. He argued that healthcare should learn from human-factors engineering and design barriers around predictable mistakes. Operations depend on anatomy and skill, but also on identification, sterile flow, communication, counts, monitoring, and follow-up. Leape’s work made one of those supports visible and teachable.\n\nThe practical discipline is to trace how workload, communication, design, supervision, and defenses combined in an error. The team should preserve patient identity, site, procedure, equipment readiness, antibiotic timing, counts, unexpected findings, and sign-out as shared information rather than private assumptions.\n\nMany catastrophic surgical errors are rare precisely because several defenses normally overlap. A crowded list, hierarchy, missing supplies, and optional paperwork can align those holes. Blaming one pair of hands may leave the pathway intact for the next team.\n\nThe patient-safety lesson: accountability and system redesign are compatible rather than competing explanations. High performance includes the pause, record, and challenge that prevent technical work from reaching the wrong person or place. A near miss belongs in the learning system because the absence of injury may reflect luck rather than a sound process. Instrument and sponge counts protect the patient only when discrepancies stop closure and trigger a search. Briefings work best when every team member can state a concern without waiting for permission from the most senior clinician. Sign-out should capture specimens, equipment problems, postoperative priorities, and any deviation requiring later review.\n\nLeape's analysis of medical error helps separate a retained item from other surgical harm. A count discrepancy is an explicit warning that must be reconciled before closure; if ignored, imaging or reoperation may reveal a sponge or instrument. The mechanism leaves a physical object and a broken count trail. When the final count reconciles and imaging shows no retained material, the count theory should not be used merely because the operation went badly.",
      "frame": "Scrub Nurse Adler pauses beside a marked limb. \"A crowded list makes the pause more valuable, not less. Show me medical error and preventable harm.\"",
      "q": [
        {
          "q": "Which surgical-safety account best captures Lucian Leape’s work on medical error and preventable harm?",
          "o": [
            {
              "t": "Lucian Leape helped establish medical error as a systems problem rather than a collection of bad individuals. The time-out remains connected to patient identification. Surgical context matters.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Lucian Leape's surgical work emphasizes operative technique and individual experience. The surgeon’s experience appears reassuring. The case itself seems routine. The surgical record fits.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Lucian Leape's surgical work supports an experienced surgeon as able to replace formal site and instrument verification. The surgeon’s experience appears reassuring. The surgical record fits.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Lucian Leape's authority is invoked in surgical practice to justify skipping the team time-out when a crowded operating list makes delay seem more dangerous than verification. Surgical fits.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        },
        {
          "q": "Which team practice most reliably prevents a wrong-site or retained-item event?",
          "o": [
            {
              "t": "Use this operative-safety practice: trace how workload, communication, design, supervision, and defenses combined in an error. The team shares the stopping rule.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Confirm consent and procedure in the chart without requiring active team agreement, site marking, and count reconciliation. Surgical timing supports this surgical claim.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Rely on the surgeon’s memory and the schedule because the team has worked together without a prior major error. The surgeon’s experience appears reassuring. Surgical fits.",
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
              "t": "The patient-safety lesson is that accountability and system redesign are compatible rather than competing explanations. Surgical context matters.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Treat excellent individual technique as able to offset inconsistent checklists and counts in a routine operation. The surgical record fits.",
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
    "icuchecklist": {
      "sci": "Peter Pronovost (b. 1964)",
      "topic": "The checklist in intensive care",
      "lede": "Peter Pronovost used the checklist in intensive care to turn a technical act into a safer clinical system.",
      "no": 15,
      "profile": "The surgical-safety email today studies Peter Pronovost through the checklist in intensive care. Peter Pronovost led a program using a short checklist and organizational support to reduce central-line bloodstream infections in intensive-care units. The intervention also required supplies, authority to stop unsafe insertion, measurement, and feedback. Operations depend on anatomy and skill, but also on identification, sterile flow, communication, counts, monitoring, and follow-up. Pronovost’s work made one of those supports visible and teachable.\n\nThe practical discipline is to pair a checklist with resources, team permission, surveillance, and leadership follow-through. The team should preserve patient identity, site, procedure, equipment readiness, antibiotic timing, counts, unexpected findings, and sign-out as shared information rather than private assumptions.\n\nMany catastrophic surgical errors are rare precisely because several defenses normally overlap. A crowded list, hierarchy, missing supplies, and optional paperwork can align those holes. Blaming one pair of hands may leave the pathway intact for the next team.\n\nThe patient-safety lesson: a checklist works through implementation, not through paper presence. High performance includes the pause, record, and challenge that prevent technical work from reaching the wrong person or place. A near miss belongs in the learning system because the absence of injury may reflect luck rather than a sound process. Instrument and sponge counts protect the patient only when discrepancies stop closure and trigger a search. Briefings work best when every team member can state a concern without waiting for permission from the most senior clinician. Sign-out should capture specimens, equipment problems, postoperative priorities, and any deviation requiring later review.",
      "frame": "The Orderly closes the theatre ledger. \"Skill and system meet in the same patient. Start with the checklist in intensive care.\"",
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
    "surgchecklist": {
      "sci": "Atul Gawande (b. 1965)",
      "topic": "The surgical safety checklist",
      "lede": "Atul Gawande brought the surgical safety checklist into the disciplined teamwork surrounding an operation.",
      "no": 16,
      "profile": "The surgical-safety email today studies Atul Gawande through the surgical safety checklist. Atul Gawande helped lead the World Health Organization surgical-safety checklist study. The checklist prompts identity, site, procedure, antibiotic, equipment, anticipated difficulties, and counts at key moments. Operations depend on anatomy and skill, but also on identification, sterile flow, communication, counts, monitoring, and follow-up. Gawande’s work made one of those supports visible and teachable.\n\nThe practical discipline is to conduct the time-out and sign-out with the full team before proceeding or closing. The team should preserve patient identity, site, procedure, equipment readiness, antibiotic timing, counts, unexpected findings, and sign-out as shared information rather than private assumptions.\n\nMany catastrophic surgical errors are rare precisely because several defenses normally overlap. A crowded list, hierarchy, missing supplies, and optional paperwork can align those holes. Blaming one pair of hands may leave the pathway intact for the next team.\n\nThe patient-safety lesson: a deliberate pause can protect patients when hierarchy and speed would otherwise suppress doubt. High performance includes the pause, record, and challenge that prevent technical work from reaching the wrong person or place. A near miss belongs in the learning system because the absence of injury may reflect luck rather than a sound process. Instrument and sponge counts protect the patient only when discrepancies stop closure and trigger a search. Briefings work best when every team member can state a concern without waiting for permission from the most senior clinician. Sign-out should capture specimens, equipment problems, postoperative priorities, and any deviation requiring later review.\n\nGawande's surgical checklist makes wrong-site prevention observable. Before incision, the team should confirm patient identity, procedure, site, consent, and site mark aloud; disagreement stops the case. If the consent names one side, the schedule or mark names another, and no documented time-out resolves the conflict, the event is wrong-site surgery. That chain differs from a retained item after closure or an injury during the correct operation.",
      "frame": "The Orderly lays out the count sheet at The Surgical Office & Records. \"The incision is not the first step. Explain the surgical safety checklist before I uncover the sign-out.\"",
      "q": [
        {
          "q": "Which surgical-safety account best captures Atul Gawande’s work on the surgical safety checklist?",
          "o": [
            {
              "t": "Atul Gawande helped lead the World Health Organization surgical-safety checklist study. The team shares the stopping rule. Count reconciliation stays visible before closure.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Atul Gawande's surgical work emphasizes operative technique and individual experience. The surgeon’s experience appears reassuring. Surgical practice makes the surgical view plausible.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Atul Gawande's surgical work supports an experienced surgeon as able to replace formal site and instrument verification. The surgeon’s experience appears reassuring. Surgical fits.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Atul Gawande's authority is invoked in surgical practice to justify skipping the team time-out when a crowded operating list makes delay seem more dangerous than verification.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        },
        {
          "q": "Which team practice most reliably prevents a wrong-site or retained-item event?",
          "o": [
            {
              "t": "Use this operative-safety practice: conduct the time-out and sign-out with the full team before proceeding or closing. Count reconciliation stays visible before closure. Surgical fits.",
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
              "t": "The patient-safety lesson is that a deliberate pause can protect patients when hierarchy and speed would otherwise suppress doubt. The team shares the stopping rule.",
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
      "no": 17,
      "profile": "The surgical-safety email today studies Martin Makary through wrong-site surgery and ’never events’. Martin Makary has studied surgical safety, communication, wrong-site procedures, and other preventable harms sometimes called never events. Such events are rare but reveal failures in identification and team controls. Operations depend on anatomy and skill, but also on identification, sterile flow, communication, counts, monitoring, and follow-up. Makary’s work made one of those supports visible and teachable.\n\nThe practical discipline is to analyze near misses and never events for recurring process defects rather than treating each as unique. The team should preserve patient identity, site, procedure, equipment readiness, antibiotic timing, counts, unexpected findings, and sign-out as shared information rather than private assumptions.\n\nMany catastrophic surgical errors are rare precisely because several defenses normally overlap. A crowded list, hierarchy, missing supplies, and optional paperwork can align those holes. Blaming one pair of hands may leave the pathway intact for the next team.\n\nThe patient-safety lesson: rarity does not make a known, preventable pathway acceptable. High performance includes the pause, record, and challenge that prevent technical work from reaching the wrong person or place. A near miss belongs in the learning system because the absence of injury may reflect luck rather than a sound process. Instrument and sponge counts protect the patient only when discrepancies stop closure and trigger a search. Briefings work best when every team member can state a concern without waiting for permission from the most senior clinician. Sign-out should capture specimens, equipment problems, postoperative priorities, and any deviation requiring later review.",
      "frame": "The Clerk pauses beside a marked limb. \"A crowded list makes the pause more valuable, not less. Show me wrong-site surgery and ’never events’.\"",
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
    },
    "improvement": {
      "sci": "Donald Berwick (b. 1946)",
      "topic": "Quality improvement & reducing harm",
      "lede": "Donald Berwick used quality improvement and reducing harm to turn a technical act into a safer clinical system.",
      "no": 18,
      "profile": "The surgical-safety email today studies Donald Berwick through quality improvement and reducing harm. Donald Berwick founded the Institute for Healthcare Improvement and promoted continuous quality improvement, measurement over time, and learning systems. He emphasized redesigning care processes rather than relying on inspection after harm. Operations depend on anatomy and skill, but also on identification, sterile flow, communication, counts, monitoring, and follow-up. Berwick’s work made one of those supports visible and teachable.\n\nThe practical discipline is to test changes in small cycles, measure results, and standardize improvements that work. The team should preserve patient identity, site, procedure, equipment readiness, antibiotic timing, counts, unexpected findings, and sign-out as shared information rather than private assumptions.\n\nMany catastrophic surgical errors are rare precisely because several defenses normally overlap. A crowded list, hierarchy, missing supplies, and optional paperwork can align those holes. Blaming one pair of hands may leave the pathway intact for the next team.\n\nThe patient-safety lesson: safety improves when organizations learn before the same failure reaches another patient. High performance includes the pause, record, and challenge that prevent technical work from reaching the wrong person or place. A near miss belongs in the learning system because the absence of injury may reflect luck rather than a sound process. Instrument and sponge counts protect the patient only when discrepancies stop closure and trigger a search. Briefings work best when every team member can state a concern without waiting for permission from the most senior clinician. Sign-out should capture specimens, equipment problems, postoperative priorities, and any deviation requiring later review.",
      "frame": "The Clerk closes the theatre ledger. \"Skill and system meet in the same patient. Start with quality improvement and reducing harm.\"",
      "q": [
        {
          "q": "Which surgical-safety account best captures Donald Berwick’s work on quality improvement and reducing harm?",
          "o": [
            {
              "t": "Donald Berwick founded the Institute for Healthcare Improvement and promoted continuous quality improvement, measurement over time, and learning systems. Count reconciliation stays visible before closure.",
              "v": "expert",
              "fb": "Correct: the answer integrates technical skill with identification, teamwork, documentation, and stopping rules."
            },
            {
              "t": "Donald Berwick's surgical work emphasizes operative technique and individual experience. The surgeon’s experience appears reassuring. The case itself seems routine. Surgical timing supports this surgical claim.",
              "v": "partial",
              "fb": "This improves care but leaves a known handoff or verification gap in the operative pathway."
            },
            {
              "t": "Donald Berwick's surgical work supports an experienced surgeon as able to replace formal site and instrument verification. The surgeon’s experience appears reassuring. Surgical records fit this surgical account.",
              "v": "wrong",
              "fb": "That inference confuses a successful technical act with a safe and complete surgical process."
            },
            {
              "t": "Donald Berwick's surgical authority supports skipping the team time-out when a crowded operating list makes delay seem more dangerous than verification. The surgeon’s experience appears reassuring. Surgical fits.",
              "v": "danger",
              "fb": "That choice removes the pause or challenge precisely when workload makes error more likely."
            }
          ]
        },
        {
          "q": "Which team practice most reliably prevents a wrong-site or retained-item event?",
          "o": [
            {
              "t": "Use this operative-safety practice: test changes in small cycles, measure results, and standardize improvements that work. The operative record stays complete.",
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
              "t": "The patient-safety lesson is that safety improves when organizations learn before the same failure reaches another patient. The operative record stays complete.",
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
    "<b>The theatre schedule, consent form, count sheet, and postoperative images lie side by side.</b>",
    "<b>Scrub Nurse Adler</b> remembers the operation; <b>The Orderly</b> follows transfers; <b>The Clerk</b> keeps the consent records.",
    "The office chain includes Mr. Rasch — the operating surgeon, Dr. Vane — the surgical chief of service, and The theatre-supplies vendor; the identity record judgment must distinguish <b>A retained instrument followed an unresolved count discrepancy</b> from <b>A technical injury occurred despite the correct patient and procedure</b>.",
    "<b>The hospital board convenes in eight days, before revised procedures overwrite the exact workflow used that morning.</b>"
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
  }
}
};
