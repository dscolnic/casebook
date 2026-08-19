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
  "teaser": "A patient is prepared for the correct procedure but operated on the wrong side. Was it one surgeon’s reckless choice, an anatomical complication, or a verification system the service had stopped using?",
  "overclaimTag": "a rogue surgeon chose the wrong side",
  "truthTag": "a service-wide verification pause was waived",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"An operating table with a crossed site mark beside a checklist record\"><rect x=\"88\" y=\"34\" width=\"210\" height=\"70\" rx=\"8\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><line x1=\"193\" y1=\"34\" x2=\"193\" y2=\"104\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><path d=\"M410 42 h120 v62 H410z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M435 62 h70 M435 78 h70 M435 94 h42\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><path d=\"M150 56 l25 25 M175 56 l-25 25\" stroke=\"#B3261E\" stroke-width=\"3\"/><circle cx=\"236\" cy=\"69\" r=\"12\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/></svg>",
  "overclaimTease": "The surgeon’s hands completed the error, but a wrong-side event is rarely explained by skill alone; follow the pauses, permissions, and records that were supposed to stop it.",
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
          "label": "The Patient-Transfer & Sterile Stores Area"
        },
        {
          "id": "records",
          "label": "The Surgical Office & Records"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "bypass",
      "items": [
        {
          "id": "incompetence",
          "label": "The surgeon knowingly selected the wrong operative side"
        },
        {
          "id": "complication",
          "label": "Correct-site surgery caused an unforeseeable anatomical injury"
        },
        {
          "id": "bypass",
          "label": "The service had waived the site-verification pause for speed"
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
      "hint": "The consent, schedule, and skin mark did not agree, but no formal time-out was called.",
      "reading": "surgchecklist"
    },
    "orderly": {
      "name": "The Orderly",
      "role": "Patient-transfer orderly",
      "face": "🛏️",
      "badge": "O",
      "legend": "the transfer corridor",
      "hint": "Two similar patients changed sequence during a compressed list, and wristband checks became verbal.",
      "reading": "quality"
    },
    "clerk": {
      "name": "The Surgical Records Clerk",
      "role": "Quality and records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the surgical office",
      "hint": "The service chief’s memo recast the mandatory verification pause as optional when the list ran late.",
      "reading": "endresult"
    }
  },
  "TOPICS": {
    "surgchecklist": {
      "sci": "Atul Gawande (b. 1965)",
      "topic": "The surgical safety checklist",
      "lede": "Atul Gawande helped turn a brief spoken pause into a global defense against errors no single expert can reliably remember alone.",
      "no": 1,
      "profile": "Atul Gawande is a surgeon, writer, and public-health researcher whose work has examined why modern medicine can possess extraordinary technical skill and still fail at basic coordination. As surgery became more complex, the operating room accumulated specialists, devices, medications, and handoffs. The problem was no longer simply whether a surgeon knew how to operate. It was whether a team could reliably perform a small set of critical steps every time.\n\nUnder Gawande’s leadership, the World Health Organization developed the Surgical Safety Checklist for use before anesthesia, before incision, and before the patient leaves the operating room. Its items include confirming identity, procedure, and site; anticipating blood loss and airway difficulty; introducing team members; reviewing critical concerns; and accounting for specimens and instruments. The checklist is not meant to replace judgment. It creates scheduled moments when anyone can surface a mismatch before momentum carries the team forward.\n\nThe checklist was tested in hospitals across varied countries and resource levels. The early multicenter study reported reductions in complications and deaths after implementation. Later experience also showed that a form alone is insufficient: teams must actually stop, exchange information, and empower members to challenge discrepancies. A box checked after incision is documentation, not a safety barrier.\n\nFor the St. Auben inquiry, Gawande’s distinction is decisive. A wrong-side operation can end with one surgeon making the incision, yet begin earlier with mismatched documents, a reordered list, and a time-out omitted by policy. If the team had the right information but no protected pause to reconcile it, the event is neither a mysterious anatomical complication nor adequately explained by labeling one pair of hands incompetent. The investigator should ask who made the pause expendable.",
      "frame": "Places the consent form, theatre list, and site mark photograph in three separate trays. “A time-out exists so disagreement becomes visible before the first cut. Tell me what the pause must accomplish.”",
      "q": [
        {
          "q": "What is the central purpose of the surgical time-out?",
          "o": [
            {
              "t": "To make the team confirm identity, procedure, and site before incision.",
              "v": "expert",
              "fb": "The pause forces shared verification while the error is still preventable."
            },
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
              "t": "To transfer final responsibility from the hospital to the operating surgeon.",
              "v": "danger",
              "fb": "Safety pauses distribute information and challenge authority; they are not liability waivers."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "The consent, theatre list, and skin mark conflicted, yet the formal time-out was omitted—the signature of a missing team barrier rather than an anatomical surprise."
          }
        },
        {
          "q": "Why is a completed checklist form not enough to prove the safeguard worked?",
          "o": [
            {
              "t": "The team must actually pause, exchange information, and resolve discrepancies.",
              "v": "expert",
              "fb": "A retrospective tick cannot perform the prospective conversation that prevents an error."
            },
            {
              "t": "The checklist works when the most senior surgeon reads each item aloud alone.",
              "v": "partial",
              "fb": "A leader may guide it, but the purpose is shared participation and challenge across roles."
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
            "label": "WHO clue",
            "text": "The theatre team had raised earlier mismatches, but the standing instruction to omit the pause on delayed lists came from service leadership rather than the operating surgeon."
          }
        },
        {
          "q": "Which record best shows whether the time-out was a real barrier or a ritual?",
          "o": [
            {
              "t": "Team notes showing when the pause occurred and which mismatch was resolved.",
              "v": "expert",
              "fb": "A real time-out leaves evidence of a discussion and action, not merely a preprinted checkmark."
            },
            {
              "t": "The surgeon’s later statement that safety and verification were consistently prioritized.",
              "v": "partial",
              "fb": "A statement may add context, but it cannot replace records from the moment of verification."
            },
            {
              "t": "The supplies invoice proving the hospital purchased approved checklist forms.",
              "v": "wrong",
              "fb": "Buying forms says nothing about whether teams used them as intended."
            },
            {
              "t": "A blank checklist signed later by everyone who entered the operating theatre.",
              "v": "danger",
              "fb": "Backfilled signatures conceal whether the safeguard operated before incision."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The physical mistake occurred in theatre, but the recurring waiver is documented in the surgical office policy file where the safeguard was downgraded."
          }
        }
      ]
    },
    "quality": {
      "sci": "Avedis Donabedian (1919-2000)",
      "topic": "Measuring quality through structure, process & outcome",
      "lede": "Avedis Donabedian gave hospitals a way to separate what they possessed, what teams actually did, and what happened to patients.",
      "no": 2,
      "profile": "Avedis Donabedian was born into an Armenian family in Beirut, trained as a physician, and later became a foundational scholar of health-care quality at the University of Michigan. His most influential contribution was a deceptively simple framework for evaluating care: structure, process, and outcome. Structure describes the setting and capacity for care—staffing, equipment, policies, training, and organization. Process describes what clinicians and institutions actually do. Outcome describes what happens to the patient.\n\nThe three parts are related but not interchangeable. A hospital may own excellent equipment and publish a strong policy while teams routinely bypass it. A poor outcome may occur despite sound care because medicine cannot eliminate every risk. Conversely, a patient may escape harm even after a dangerous process failure. Quality assessment therefore cannot rely on one favorable outcome, one framed policy, or one expert’s reputation. Investigators must trace the link from available safeguards through actual practice to patient results.\n\nDonabedian also emphasized that measurement should improve care rather than merely rank or punish. Useful measures need a plausible relationship: the structure must support a process known to improve outcomes, and the process must be observable. In safety work, repeated near misses can reveal process defects before a catastrophic outcome makes them undeniable.\n\nAt St. Auben, the structure existed: consent forms, wristbands, site marks, and a written time-out. The process had changed: on crowded lists, staff relied on verbal shortcuts and skipped the pause. The outcome was a wrong-side operation. Donabedian’s framework prevents the hospital from pointing to its checklist policy as proof of safety or treating the injury as random. The key question is who controlled the process by which a mandatory structure became optional practice.",
      "frame": "Draws three columns—structure, process, outcome—then slides the hospital policy into the first and the theatre log into the second. “A safeguard on paper is not the same as a safeguard in use.”",
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
            "label": "WHERE clue",
            "text": "The hospital possessed the checklist in theatre, but the process exception was created and tracked in the surgical service’s administrative records."
          }
        },
        {
          "q": "What pattern most strongly indicates a process problem rather than one bad outcome?",
          "o": [
            {
              "t": "Repeated skipped verifications and near misses across several operating lists.",
              "v": "expert",
              "fb": "Recurrence across teams shows how work was organized, not merely what happened in one case."
            },
            {
              "t": "One severe injury during an otherwise undocumented year of surgical activity.",
              "v": "partial",
              "fb": "A single outcome warrants review, but it cannot alone reveal whether the process was routinely defective."
            },
            {
              "t": "The surgeon’s technical credentials and a low historical complication rate.",
              "v": "wrong",
              "fb": "Skill and prior outcomes do not show that site verification occurred in this operation."
            },
            {
              "t": "A policy requiring staff to report that all mandatory checks were completed.",
              "v": "danger",
              "fb": "Self-certification without observation can hide the very departures under investigation."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "Transfer logs show wristband and site checks were repeatedly shortened whenever lists fell behind; the failure pattern follows a waived process, not chance anatomy."
          }
        },
        {
          "q": "Which evidence best identifies who shaped the unsafe process?",
          "o": [
            {
              "t": "A recurring exception approved by the official controlling staffing and list targets.",
              "v": "expert",
              "fb": "Process design is assigned by the authority who made the shortcut normal across teams."
            },
            {
              "t": "The name of the surgeon who performed the final irreversible operative step.",
              "v": "partial",
              "fb": "The surgeon’s action matters, but it may not identify who instituted the recurring system exception."
            },
            {
              "t": "The vendor that supplied the marker used to label the planned operative site.",
              "v": "wrong",
              "fb": "A functioning marker cannot explain why the team omitted verification."
            },
            {
              "t": "The patient whose schedule change caused the operating list to run behind time.",
              "v": "danger",
              "fb": "Operational pressure does not transfer responsibility to the patient affected by it."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The shortcut appeared across surgeons and rooms whenever the service missed its throughput target, pointing to the official who set that rule rather than one operator."
          }
        }
      ]
    },
    "endresult": {
      "sci": "Ernest Codman (1869-1940)",
      "topic": "The “end result” & surgical accountability",
      "lede": "Ernest Codman insisted that hospitals follow every patient, record every error, and learn who could have prevented it.",
      "no": 3,
      "profile": "Ernest Amory Codman was a Boston surgeon who became one of medicine’s earliest and most difficult advocates for transparent outcomes. Trained at Harvard and Massachusetts General Hospital, he argued that a hospital should follow each patient long enough to determine the “end result” of treatment. When the result was poor, the institution should classify the reason, identify whether the error was preventable, and use the finding to improve future care.\n\nCodman kept detailed cards on his patients and publicly challenged hospitals that celebrated prestige without measuring results. His blunt methods cost him status and appointments. He opened his own small hospital to put the End Result Idea into practice and helped establish a registry for bone sarcoma, believing that reliable records were necessary for both science and accountability. He also participated in the early hospital standardization movement associated with the American College of Surgeons.\n\nThe radical part of Codman’s idea was not merely counting deaths or complications. It was joining outcome to the decisions that preceded it. A record should distinguish an unavoidable disease course from an error in diagnosis, judgment, technique, equipment, or organization. That makes retrospective review useful: the purpose is not to invent a villain after harm, but to locate the preventable step and change it.\n\nFor St. Auben, Codman would reject both the lone-monster story and the bad-luck story if the records show a recurring policy. The surgeon’s incision is part of the chain, but the end-result file should also contain schedule changes, missing pauses, prior near misses, and the memo that made verification optional. When the same authority controls the throughput rule and the quality response, the surgical office becomes the point where the event’s cause and concealment meet.",
      "frame": "Unlocks a cabinet of near-miss cards and lays the chief’s throughput memo across them. “The end result is not just the injury. It is the record of every preventable step that led there.”",
      "q": [
        {
          "q": "What did Codman mean by following the “end result” of care?",
          "o": [
            {
              "t": "Track the patient’s outcome and classify why treatment succeeded or failed.",
              "v": "expert",
              "fb": "Codman wanted hospitals to connect results to specific preventable or unavoidable causes."
            },
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
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The end-result cards link multiple near misses to the same chief-approved throughput exception, making the responsible authority unmistakable without relying on one surgeon’s account."
          }
        },
        {
          "q": "Why are near-miss records important in this case?",
          "o": [
            {
              "t": "They reveal the same unsafe process before the wrong-side outcome finally occurred.",
              "v": "expert",
              "fb": "Repeated recoveries from a mismatch show the latent failure was already present."
            },
            {
              "t": "They prove the eventual patient injury was unavoidable because earlier patients survived.",
              "v": "danger",
              "fb": "Earlier escapes show opportunity for prevention, not inevitability."
            },
            {
              "t": "They replace the need to review the operation in which actual harm occurred.",
              "v": "wrong",
              "fb": "Near misses provide context, but the harmed patient’s complete chain still requires examination."
            },
            {
              "t": "They show which employees were anxious, regardless of whether checks were skipped.",
              "v": "partial",
              "fb": "Staff concern matters only when tied to concrete discrepancies and process departures."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "Three prior wrong-side mismatches were caught only when staff improvised a pause; the injury occurred after the service formally removed that last chance to reconcile records."
          }
        },
        {
          "q": "Where does Codman’s method place the decisive evidence?",
          "o": [
            {
              "t": "In the joined outcome, near-miss, policy, and authorization record.",
              "v": "expert",
              "fb": "The record system reveals how a recurring policy produced the final event."
            },
            {
              "t": "At the operating table, because physical actions are treated as the main causes.",
              "v": "partial",
              "fb": "The incision is essential evidence, but administrative decisions can structure the actions that precede it."
            },
            {
              "t": "In the supply warehouse, where the hospital purchased its site markers.",
              "v": "wrong",
              "fb": "The markers were available; the case turns on verification and authority rather than supply."
            },
            {
              "t": "In a confidential personnel file used to label the surgeon incompetent.",
              "v": "danger",
              "fb": "A blame file would narrow the inquiry and obscure the repeated policy visible across cases."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The surgical office contains the joined end-result register, prior near misses, and the memo that converted mandatory verification into an optional delay."
          }
        }
      ]
    }
  },
  "story": [
    "<b>The patient entered St. Auben for the correct operation and left with the wrong side opened.</b> The documents had disagreed before incision.",
    "Scrub Nurse Adler saw the unresolved mismatch in theatre. The Orderly watched patient checks compress as the list slipped. The Surgical Records Clerk keeps the near misses and service memos.",
    "One explanation isolates a reckless surgeon. Another calls the injury an unforeseeable complication. Neither is enough unless it accounts for the vanished verification pause.",
    "The notebook can recover nine clues from three readings. A complete verdict should distinguish the person who cut from the authority that redesigned how the whole service worked."
  ],
  "endings": {
    "overclaimWhat": "incompetence",
    "dismissalWhat": "complication",
    "win": {
      "expertTitle": "The Waived Pause",
      "expert": [
        "You reconstruct a service-wide failure: identity and site records conflicted, the protected time-out had been waived for delayed lists, and the policy converged in the surgical office under the chief of service.",
        "The surgeon performed the irreversible act, but the repeated exception explains why multiple teams reached incision without reconciliation. The outcome was not a mysterious anatomical complication and not adequately described as one rogue operator."
      ],
      "soundTitle": "The Process Behind the Cut",
      "sound": [
        "Your accusation identifies the governing authority, the surgical office, and the waived verification process.",
        "The available clues show recurrence across lists and records, even though some details of the patient-transfer sequence remain incomplete."
      ],
      "namedTitle": "Right Verdict, Sparse Record",
      "named": [
        "You name the correct person, place, and mechanism.",
        "Missed clues leave the prior near misses and exact waiver sequence less fully supported, but the core accusation holds."
      ]
    },
    "overclaim": {
      "title": "One Pair of Hands Is Not the Whole System",
      "body": [
        "The surgeon should have stopped, but the evidence shows the same verification shortcut across rooms, lists, and operators.",
        "Calling the event only incompetence leaves the chief-approved waiver in place and misreads a recurring process as an isolated personality."
      ]
    },
    "dismissal": {
      "title": "Anatomy Did Not Switch the Side",
      "body": [
        "The consent, schedule, site mark, and patient sequence were reconcilable before incision. The complication account cannot explain why the formal pause was omitted.",
        "A preventable process failure becomes “bad luck” only when the records before the cut are ignored."
      ]
    },
    "wrongNames": {
      "title": "The Failure, Misassigned",
      "body": [
        "You recognize the waived verification barrier but place responsibility or culmination away from the office record that made the shortcut recurring across the service."
      ]
    }
  }
}
};
