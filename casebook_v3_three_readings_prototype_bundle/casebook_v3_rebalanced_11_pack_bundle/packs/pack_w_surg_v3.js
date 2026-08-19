// Casebook V3 — three informants, three readings, one clue per correct answer.
module.exports = { PACK: {
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "w_surg",
  "title": "The Wrong Side",
  "discipline": "Surgery & Patient Safety",
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
  "DAYS_TOTAL": 3,
  "teaser": "A patient is prepared for the correct procedure but operated on the wrong side. Did one surgeon override an intact verification pause, had the service broadly abandoned the pause, or did correct-site surgery produce a confusing anatomical complication?",
  "overclaimTag": "an individual surgeon ignored the correct side",
  "truthTag": "a surgeon deliberately overrode an intact verification barrier",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"An operating table with a crossed site mark beside a checklist record\"><rect x=\"88\" y=\"34\" width=\"210\" height=\"70\" rx=\"8\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><line x1=\"193\" y1=\"34\" x2=\"193\" y2=\"104\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><path d=\"M410 42 h120 v62 H410z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M435 62 h70 M435 78 h70 M435 94 h42\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><path d=\"M150 56 l25 25 M175 56 l-25 25\" stroke=\"#B3261E\" stroke-width=\"3\"/><circle cx=\"236\" cy=\"69\" r=\"12\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/></svg>",
  "overclaimTease": "System failures are common, but they are not automatic. Determine whether the barrier was absent across the service or whether it worked, raised the mismatch, and was consciously overridden in this theatre.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "surgeon",
      "items": [
        {
          "id": "surgeon",
          "label": "Mr. Rasch — the operating surgeon"
        },
        {
          "id": "vendor",
          "label": "The theatre-supplies vendor"
        },
        {
          "id": "chief",
          "label": "Dr. Vane — the surgical chief of service"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "theatre",
      "items": [
        {
          "id": "stores",
          "label": "The Patient-Transfer & Sterile Stores Area"
        },
        {
          "id": "records",
          "label": "The Surgical Office & Records"
        },
        {
          "id": "theatre",
          "label": "The Operating Theatre"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "incompetence",
      "items": [
        {
          "id": "incompetence",
          "label": "The surgeon overrode side verification and incised the wrong limb"
        },
        {
          "id": "bypass",
          "label": "The service had broadly waived site verification for speed"
        },
        {
          "id": "complication",
          "label": "Correct-site surgery produced an unforeseeable anatomical injury"
        }
      ]
    }
  },
  "READING_ORDER": [
    "scrubnurse",
    "orderly",
    "clerk"
  ],
  "CHARACTERS": {
    "scrubnurse": {
      "name": "Scrub Nurse Adler",
      "role": "Scrub nurse",
      "face": "🧤",
      "badge": "S",
      "legend": "the operating theatre",
      "hint": "The team stopped, named the side mismatch, and asked for resolution before the surgeon ordered incision anyway.",
      "reading": "surgchecklist"
    },
    "orderly": {
      "name": "The Orderly",
      "role": "Patient-transfer orderly",
      "face": "🛏️",
      "badge": "O",
      "legend": "the transfer corridor",
      "hint": "Wristband, consent, schedule, and transfer checks all identified the correct patient and side before theatre entry.",
      "reading": "quality"
    },
    "clerk": {
      "name": "The Surgical Records Clerk",
      "role": "Quality and records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the surgical office",
      "hint": "Other lists used the required pause; audio and contemporaneous notes isolate the override to one surgeon in one operation.",
      "reading": "endresult"
    }
  },
  "TOPICS": {
    "surgchecklist": {
      "sci": "Atul Gawande (b. 1965)",
      "topic": "The surgical safety checklist",
      "lede": "Atul Gawande helped turn a brief spoken pause into a global defense against errors no single expert can reliably remember alone.",
      "no": 1,
      "profile": "Atul Gawande is a surgeon, writer, and public-health researcher whose work has examined why modern medicine can possess extraordinary technical skill and still fail at basic coordination. As surgery became more complex, the operating room accumulated specialists, devices, medications, and handoffs. The problem was no longer simply whether a surgeon knew how to operate. It was whether a team could reliably perform a small set of critical steps every time.\n\nUnder Gawande’s leadership, the World Health Organization developed the Surgical Safety Checklist for use before anesthesia, before incision, and before the patient leaves the operating room. Its items include confirming identity, procedure, and site; anticipating blood loss and airway difficulty; introducing team members; reviewing critical concerns; and accounting for specimens and instruments. The checklist is not meant to replace judgment. It creates scheduled moments when anyone can surface a mismatch before momentum carries the team forward.\n\nThe checklist was tested in hospitals across varied countries and resource levels. The early multicenter study reported reductions in complications and deaths after implementation. Later experience also showed that a form alone is insufficient: teams must actually stop, exchange information, and empower members to challenge discrepancies. A box checked after incision is documentation, not a safety barrier.\n\nAt St. Auben, the checklist was not absent or silently waived. The team paused, compared consent, schedule, wristband, and skin mark, and voiced the side mismatch before incision. The surgeon rejected the challenge and ordered the case forward from memory. Gawande’s lesson is therefore sharper than a generic systems diagnosis: a safety barrier can function, expose the error, and still be defeated by the individual with authority at the table.",
      "frame": "Queues the time-out audio at the spoken side mismatch. “A barrier can work and still be overruled. Listen for the moment information becomes a command.”",
      "q": [
        {
          "q": "What is the central purpose of the surgical time-out?",
          "o": [
            {
              "t": "To let the surgeon privately rehearse the difficult steps of the operation.",
              "v": "partial",
              "fb": "Planning matters, but the time-out is a team verification rather than silent rehearsal."
            },
            {
              "t": "To document that the operation began on schedule for administrative reporting.",
              "v": "wrong",
              "fb": "Timing records do not substitute for confirming the patient, procedure, and site."
            },
            {
              "t": "To make the team confirm identity, procedure, and site before incision.",
              "v": "expert",
              "fb": "The pause forces shared verification while the error is still preventable."
            },
            {
              "t": "To transfer final responsibility from the hospital to the operating surgeon.",
              "v": "danger",
              "fb": "Safety pauses distribute information and challenge authority; they are not liability waivers."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — lead",
            "text": "The service possessed and routinely used a real verification pause; this operation did not lack the safeguard."
          }
        },
        {
          "q": "Why is a completed checklist form not enough to prove the safeguard worked?",
          "o": [
            {
              "t": "The checklist works when the most senior surgeon reads each item aloud alone.",
              "v": "partial",
              "fb": "A leader may guide it, but the purpose is shared participation and challenge across roles."
            },
            {
              "t": "The team must actually pause, exchange information, and resolve discrepancies.",
              "v": "expert",
              "fb": "A retrospective tick cannot perform the prospective conversation that prevents an error."
            },
            {
              "t": "The form becomes valid automatically once the patient reaches the operating room.",
              "v": "wrong",
              "fb": "Location does not demonstrate that any verification occurred."
            },
            {
              "t": "The form mainly protects staff if the patient later alleges an unexpected injury.",
              "v": "danger",
              "fb": "Using documentation as legal cover empties the checklist of its preventive function."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — lead",
            "text": "The surgeon—not the nurse, orderly, or vendor—held authority when the team raised the unresolved side mismatch."
          }
        },
        {
          "q": "Which record would show that the time-out worked but was overridden?",
          "o": [
            {
              "t": "A blank checklist signed after the operation by everyone in the theatre.",
              "v": "partial",
              "fb": "A retrospective signature cannot establish what the team actually did."
            },
            {
              "t": "A policy memo requiring teams to confirm the site before incision.",
              "v": "wrong",
              "fb": "Policy establishes structure but not the conduct of this operation."
            },
            {
              "t": "The surgeon’s later statement that no one expressed uncertainty at the table.",
              "v": "danger",
              "fb": "A self-serving later statement is weaker than contemporaneous team evidence."
            },
            {
              "t": "Contemporaneous notes and audio of the mismatch, challenge, and order to proceed.",
              "v": "expert",
              "fb": "A recorded challenge followed by a contrary command proves barrier and override."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — lead",
            "text": "Consent, wristband, schedule, and transfer records agree before the patient enters theatre; the conflict becomes harmful only at the table."
          }
        }
      ]
    },
    "quality": {
      "sci": "Avedis Donabedian (1919-2000)",
      "topic": "Measuring quality through structure, process & outcome",
      "lede": "Avedis Donabedian gave hospitals a way to separate what they possessed, what teams actually did, and what happened to patients.",
      "no": 2,
      "profile": "Avedis Donabedian was born into an Armenian family in Beirut, trained as a physician, and later became a foundational scholar of health-care quality at the University of Michigan. His most influential contribution was a deceptively simple framework for evaluating care: structure, process, and outcome. Structure describes the setting and capacity for care—staffing, equipment, policies, training, and organization. Process describes what clinicians and institutions actually do. Outcome describes what happens to the patient.\n\nThe three parts are related but not interchangeable. A hospital may own excellent equipment and publish a strong policy while teams routinely bypass it. A poor outcome may occur despite sound care because medicine cannot eliminate every risk. Conversely, a patient may escape harm even after a dangerous process failure. Quality assessment therefore cannot rely on one favorable outcome, one framed policy, or one expert’s reputation. Investigators must trace the link from available safeguards through actual practice to patient results.\n\nDonabedian also emphasized that measurement should improve care rather than merely rank or punish. Useful measures need a plausible relationship: the structure must support a process known to improve outcomes, and the process must be observable. In safety work, repeated near misses can reveal process defects before a catastrophic outcome makes them undeniable.\n\nDonabedian’s structure–process–outcome framework distinguishes an isolated override from a service-wide failure. The hospital had the required policy, trained teams, marked sites, and documented pauses on surrounding lists. The patient-transfer process also delivered the correct person with matching records. The abnormal process is concentrated in one operation after the mismatch reached the theatre, not spread across staffing, supply, or scheduling systems. That pattern makes the individual act, not the institutional middle explanation, the decisive cause.",
      "frame": "Compares this list with surrounding operations that completed the pause. “One deviation and a broken service are different patterns. Donabedian makes you prove which one you have.”",
      "q": [
        {
          "q": "In Donabedian’s framework, where does an unused time-out policy belong?",
          "o": [
            {
              "t": "Structure, because it exists as organizational capacity but not actual practice.",
              "v": "expert",
              "fb": "A policy is part of the setting for care; process asks whether the team followed it."
            },
            {
              "t": "Process, because a written policy demonstrates the required action occurred.",
              "v": "danger",
              "fb": "Documentation of a rule cannot establish that staff performed the rule."
            },
            {
              "t": "Outcome, because the policy should be judged by whether one patient was harmed.",
              "v": "wrong",
              "fb": "Outcome is the patient result, while the policy itself remains a structural feature."
            },
            {
              "t": "Outside the model, because checklists are administrative rather than clinical.",
              "v": "partial",
              "fb": "Administrative design can shape clinical process and therefore belongs within quality assessment."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — corroboration",
            "text": "The formal pause is called in the Operating Theatre, and the unresolved mismatch is spoken before incision."
          }
        },
        {
          "q": "What pattern would argue against a service-wide verification failure?",
          "o": [
            {
              "t": "Several departments report recurring skipped checks and unresolved near misses.",
              "v": "partial",
              "fb": "Repeated cross-service failures would support the systemic explanation."
            },
            {
              "t": "The chief issues a written exception whenever an operating list runs behind.",
              "v": "wrong",
              "fb": "A standing exception would make the unsafe process organizational."
            },
            {
              "t": "Other teams consistently complete the pause while one surgeon alone overrides it.",
              "v": "expert",
              "fb": "A concentrated exception points to individual conduct rather than a broad process defect."
            },
            {
              "t": "Transfer staff routinely rely on verbal identity instead of wristband matching.",
              "v": "danger",
              "fb": "Routine verbal substitution would show a widespread process problem."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — corroboration",
            "text": "The patient and planned side were unambiguous, ruling out an unforeseeable anatomical complication."
          }
        },
        {
          "q": "Which evidence most directly identifies who converted the mismatch into harm?",
          "o": [
            {
              "t": "The orderly who transported the correct patient according to the schedule.",
              "v": "partial",
              "fb": "Correct transport did not create the wrong-side decision."
            },
            {
              "t": "The person who heard the challenge and explicitly ordered incision on that side.",
              "v": "expert",
              "fb": "The decisive actor is the one who overrode verified information at the irreversible step."
            },
            {
              "t": "The chief whose service policy required a formal verification pause.",
              "v": "wrong",
              "fb": "A functioning policy does not assign the individual override to its author."
            },
            {
              "t": "The vendor that supplied the approved skin marker and checklist forms.",
              "v": "danger",
              "fb": "Proper supplies cannot explain a command that rejected the mismatch."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — corroboration",
            "text": "Contemporaneous notes record the surgeon rejecting the challenge and instructing staff to proceed from memory."
          }
        }
      ]
    },
    "endresult": {
      "sci": "Ernest Codman (1869-1940)",
      "topic": "The “end result” & surgical accountability",
      "lede": "Ernest Codman insisted that hospitals follow every patient, record every error, and learn who could have prevented it.",
      "no": 3,
      "profile": "Ernest Amory Codman was a Boston surgeon who became one of medicine’s earliest and most difficult advocates for transparent outcomes. Trained at Harvard and Massachusetts General Hospital, he argued that a hospital should follow each patient long enough to determine the “end result” of treatment. When the result was poor, the institution should classify the reason, identify whether the error was preventable, and use the finding to improve future care.\n\nCodman kept detailed cards on his patients and publicly challenged hospitals that celebrated prestige without measuring results. His blunt methods cost him status and appointments. He opened his own small hospital to put the End Result Idea into practice and helped establish a registry for bone sarcoma, believing that reliable records were necessary for both science and accountability. He also participated in the early hospital standardization movement associated with the American College of Surgeons.\n\nThe radical part of Codman’s idea was not merely counting deaths or complications. It was joining outcome to the decisions that preceded it. A record should distinguish an unavoidable disease course from an error in diagnosis, judgment, technique, equipment, or organization. That makes retrospective review useful: the purpose is not to invent a villain after harm, but to locate the preventable step and change it.\n\nCodman would still demand outcome review and near-miss comparison, but those records do not show a recurring waived-checklist policy. Other teams stopped and resolved similar discrepancies; this case alone contains an explicit instruction to proceed despite unresolved side information. The contemporaneous audio, nurse note, and incision record all converge in the Operating Theatre. The systemic story is tempting because wrong-site surgery often reflects multiple barriers, yet here the final and avoidable breach was one surgeon’s deliberate override.",
      "frame": "Places the nurse note, audio timestamp, and incision record on one line. “Codman followed outcomes back to decisions. Here the trail ends at an order given in the theatre.”",
      "q": [
        {
          "q": "What did Codman mean by following the “end result” of care?",
          "o": [
            {
              "t": "Judge quality from the surgeon’s reputation and the difficulty of the operation.",
              "v": "wrong",
              "fb": "Prestige and case difficulty cannot replace measured outcomes and causal review."
            },
            {
              "t": "Publish the most serious errors so minor near misses do not confuse the public.",
              "v": "danger",
              "fb": "Near misses can reveal recurring hazards before another patient is injured."
            },
            {
              "t": "Count complications without examining the decisions that preceded them.",
              "v": "partial",
              "fb": "Counting is useful, but Codman’s method required attribution and learning from causes."
            },
            {
              "t": "Track the patient’s outcome and classify why treatment succeeded or failed.",
              "v": "expert",
              "fb": "Codman wanted hospitals to connect results to specific preventable or unavoidable causes."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — decisive",
            "text": "Audio, incision timing, and the operative note converge on one surgeon’s explicit order after correct-site evidence was presented."
          }
        },
        {
          "q": "How can near-miss records distinguish one rogue act from a broken service?",
          "o": [
            {
              "t": "They show whether similar mismatches were usually stopped or routinely ignored.",
              "v": "expert",
              "fb": "Comparison reveals whether the unsafe behavior is isolated or systemic."
            },
            {
              "t": "They prove any later wrong-side operation was unavoidable once a near miss occurred.",
              "v": "partial",
              "fb": "Earlier survival does not make the later event unavoidable."
            },
            {
              "t": "They allow the final harmful operation to be omitted from the quality review.",
              "v": "wrong",
              "fb": "The harmful outcome remains essential to the causal review."
            },
            {
              "t": "They identify which employee felt most anxious during each operating list.",
              "v": "danger",
              "fb": "Emotion is not the process measure needed for this distinction."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — decisive",
            "text": "The barrier identified the correct side, but the operating surgeon consciously overrode it and incised the opposite limb."
          }
        },
        {
          "q": "Where does the decisive override occur in this case?",
          "o": [
            {
              "t": "In sterile stores, when the approved marker is placed on the instrument tray.",
              "v": "partial",
              "fb": "Supplies were present and do not determine the operative side."
            },
            {
              "t": "In the surgical office, when the general time-out policy is filed and reviewed.",
              "v": "wrong",
              "fb": "The office establishes policy, not the command that defeated it."
            },
            {
              "t": "In the operating theatre, after the team voices the unresolved side mismatch.",
              "v": "expert",
              "fb": "The irreversible decision follows the warning at the operating table."
            },
            {
              "t": "In the transfer corridor, when the correct patient is moved toward theatre.",
              "v": "danger",
              "fb": "Correct transfer delivers the case but does not create the override."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — decisive",
            "text": "Challenge, override, site preparation, and the irreversible incision all converge in the Operating Theatre."
          }
        }
      ]
    }
  },
  "story": [
    "<b>St. Auben’s records agree on the patient and planned side; the incision does not.</b>",
    "Scrub Nurse Adler heard the time-out. The Orderly can reconstruct transfer and identity checks. The Surgical Records Clerk can compare this operation with the service’s normal practice.",
    "One surgeon’s override, a service-wide abandoned safeguard, and an anatomical complication all predict different evidence before the first cut.",
    "The case asks whether the system failed silently—or whether it spoke clearly and one person chose not to listen."
  ],
  "endings": {
    "overclaimWhat": "bypass",
    "dismissalWhat": "complication",
    "win": {
      "expertTitle": "The Warning That Was Overridden",
      "expert": [
        "You connect Mr. Rasch, the Operating Theatre, and the deliberate override of side verification. The team paused, stated the mismatch, and received an explicit order to proceed.",
        "The service-wide bypass theory is the tempting systemic accusation, but surrounding records show the barrier normally functioned. The complication theory fails because identity, procedure, anatomy, and intended side were clear before incision."
      ],
      "soundTitle": "The Individual Override",
      "sound": [
        "Your accusation identifies the surgeon, the theatre, and the conscious rejection of the correct-site warning.",
        "Some comparative or audio details remain incomplete, but the contemporaneous challenge and order support the verdict."
      ],
      "namedTitle": "Right Surgeon, Thin Process Record",
      "named": [
        "You choose the correct person, location, and mechanism.",
        "The conclusion is right, although missed clues leave the contrast with ordinary service practice less complete."
      ]
    },
    "overclaim": {
      "title": "The System Was Not Broadly Waived",
      "body": [
        "Other lists completed the required pause, and this team actually raised the mismatch before incision.",
        "Blaming an abandoned service process would dilute the evidence of the individual who defeated a functioning barrier."
      ]
    },
    "dismissal": {
      "title": "No Anatomical Ambiguity Explains the Side",
      "body": [
        "Consent, schedule, wristband, imaging, and spoken confirmation all identified the planned side.",
        "The harm followed a wrong-side command, not an unforeseeable complication of correct-site surgery."
      ]
    },
    "wrongNames": {
      "title": "The Override, Assigned Elsewhere",
      "body": [
        "You recognize the deliberate wrong-side act but misidentify the surgeon or move the decisive command away from the operating theatre."
      ]
    }
  }
}
};
