// Casebook V3 — three informants, three readings, one clue per correct answer.
module.exports = { PACK: {
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "w_blood",
  "title": "The Crossmatch",
  "discipline": "Transfusion & Blood Banking",
  "venue": "the Carraway Hospital blood-bank inquiry",
  "agent": {
    "name": "Investigator June Halloway",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Transfusion Pioneers",
  "dossierName": "TRANSFUSION PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Carraway Hospital blood-bank inquiry",
  "teaser": "A patient develops catastrophic hemolysis minutes after transfusion. Did a nurse deliberately substitute an incompatible unit, did a rare antibody defeat correct testing, or did an ordinary identification safeguard fail somewhere between blood bank and bedside?",
  "overclaimTag": "a deliberate incompatible-unit substitution",
  "truthTag": "intentional tampering at the bedside",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A blood unit label and patient wristband deliberately mismatched\"><path d=\"M75 30 h145 v82 H75z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M98 52 h100 M98 72 h100 M98 92 h70\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><path d=\"M320 42 h190 v60 H320z\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/><path d=\"M345 64 h140 M345 84 h92\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><path d=\"M242 70 h70\" stroke=\"#B3261E\" stroke-width=\"3\"/><path d=\"M270 56 l16 14-16 14\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"3\"/><path d=\"M126 45 l42 52 M168 45 l-42 52\" stroke=\"#B3261E\" stroke-width=\"3\"/></svg>",
  "overclaimTease": "A deliberate substitution is an extraordinary conclusion, but it can be tested against immunology and custody: which unit was compatible, which reached the ward, and whose authenticated actions broke the chain.",
  "DAYS_TOTAL": 3,
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "nurse2",
      "items": [
        {
          "id": "manager",
          "label": "Alder — the blood-bank manager"
        },
        {
          "id": "assessor",
          "label": "The laboratory accreditation assessor"
        },
        {
          "id": "nurse2",
          "label": "Nurse Sel Kade — the transfusion nurse"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "ward",
      "items": [
        {
          "id": "ward",
          "label": "The Transfusion Ward & Bedside Scanner"
        },
        {
          "id": "records",
          "label": "The Blood-Bank Office & Records"
        },
        {
          "id": "bloodbank",
          "label": "The Blood Bank & Crossmatch Laboratory"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "murder",
      "items": [
        {
          "id": "murder",
          "label": "An incompatible unit was deliberately substituted at the bedside"
        },
        {
          "id": "rareReaction",
          "label": "A rare antibody caused hemolysis despite a correct compatible transfusion"
        },
        {
          "id": "mismatch",
          "label": "An accidental identification failure bypassed routine matching safeguards"
        }
      ]
    }
  },
  "READING_ORDER": [
    "wardnurse",
    "labtech",
    "clerk"
  ],
  "CHARACTERS": {
    "wardnurse": {
      "name": "Nurse Okafor",
      "role": "Ward nurse and response witness",
      "face": "🩸",
      "badge": "N",
      "legend": "the bedside",
      "hint": "The compatible issued unit remained sealed; a different bag appeared after the assigned nurse overrode the bedside scan.",
      "reading": "ottenberg"
    },
    "labtech": {
      "name": "The Lab Tech",
      "role": "Blood-bank technologist",
      "face": "🔬",
      "badge": "L",
      "legend": "the crossmatch bench",
      "hint": "Pretransfusion testing was internally consistent, while the post-reaction sample shows immediate ABO-incompatible hemolysis.",
      "reading": "levine"
    },
    "clerk": {
      "name": "The Blood Custody Clerk",
      "role": "Issue and traceability clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the issue archive",
      "hint": "Bag movement, scanner credentials, and discarded labels trace the substituted unit to one bedside access window.",
      "reading": "drew"
    }
  },
  "TOPICS": {
    "ottenberg": {
      "sci": "Reuben Ottenberg (1882-1959)",
      "topic": "Compatibility testing & the crossmatch",
      "lede": "Ottenberg made compatibility a testable relationship between one patient and one identified donor unit.",
      "no": 1,
      "profile": "Reuben Ottenberg was an American physician and hematologist who helped make blood transfusion safer in the early twentieth century. After Karl Landsteiner’s discovery of human blood groups, Ottenberg applied blood typing systematically and is credited with introducing compatibility testing before transfusion. His work helped move transfusion away from a desperate direct donor-to-patient procedure toward a controlled laboratory practice.\n\nA crossmatch asks whether the recipient’s plasma reacts with donor red cells. In a major crossmatch, those components are incubated and examined for agglutination or hemolysis. ABO typing is fundamental because naturally occurring antibodies can attack incompatible red cells rapidly. Crossmatching also helps detect clinically significant non-ABO antibodies, though modern practice includes antibody screens and other specialized tests.\n\nCompatibility testing creates a pair-specific record. It does not make every unit interchangeable, and it cannot protect a patient if the tested unit is not the unit actually transfused. Identity checks connect the laboratory result to the blood-bag number, patient wristband, order, and bedside scan. A correct crossmatch followed by the wrong bag is a chain-of-custody failure rather than a failure of immunohematology.\n\nAt Carraway, the laboratory crossmatch is negative for the unit issued to the patient. That sealed unit returns unused. The bag recovered from the bedside has a different number and an ABO group incompatible with the patient. Ottenberg’s method therefore does more than show “mismatch.” It establishes that the compatible pair existed and was replaced after testing, narrowing the decisive event to the ward. The paired identifiers make the substitution visible without inferring it from symptoms alone.",
      "frame": "Okafor sets the sealed issued bag beside the one recovered at bedside. “The crossmatch was right. The object changed. Follow which one entered the patient.”",
      "q": [
        {
          "q": "What does a major crossmatch test?",
          "o": [
            {
              "t": "Whether the donor’s blood pressure matches the patient’s current blood pressure.",
              "v": "partial",
              "fb": "Blood pressure compatibility is not part of immunohematologic matching."
            },
            {
              "t": "Whether nearly every possible future antibody can be predicted from the donor label alone.",
              "v": "wrong",
              "fb": "Testing reduces risk but cannot predict every future antibody from a label."
            },
            {
              "t": "Whether the recipient’s plasma reacts with red cells from the intended donor unit.",
              "v": "expert",
              "fb": "The major crossmatch directly tests recipient antibodies against donor red cells."
            },
            {
              "t": "Whether the bedside nurse agrees with the laboratory’s staffing schedule.",
              "v": "danger",
              "fb": "Staff schedules are unrelated to red-cell compatibility."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "Ottenberg’s pair-specific record shows the issued unit was compatible, while the transfused bag was a different incompatible unit—replacement, not failed testing."
          }
        },
        {
          "q": "Why must the unit number be checked at the bedside?",
          "o": [
            {
              "t": "All units of one broad blood type are identical for nearly every recipient at bedside.",
              "v": "partial",
              "fb": "Non-ABO antibodies and product details make units noninterchangeable."
            },
            {
              "t": "The number controls infusion speed but has no role in identity at bedside.",
              "v": "wrong",
              "fb": "The identifier supports traceability rather than pump speed."
            },
            {
              "t": "A unit becomes compatible once it reaches the correct hospital ward.",
              "v": "danger",
              "fb": "Location does not alter immunologic compatibility."
            },
            {
              "t": "The crossmatch protects the specific tested bag linked to the correct patient.",
              "v": "expert",
              "fb": "Identity links the laboratory result to the exact product entering the patient."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The chain breaks at the bedside scanner, after the compatible bag leaves the blood bank and before the incompatible unit is connected."
          }
        },
        {
          "q": "Which finding most strongly argues against an accidental laboratory mismatch?",
          "o": [
            {
              "t": "The correctly crossmatched unit returns sealed while another numbered bag is found at bedside.",
              "v": "expert",
              "fb": "The intact intended unit proves the tested product was not the product transfused."
            },
            {
              "t": "The patient develops fever and pain shortly after transfusion begins in serology in the workup.",
              "v": "partial",
              "fb": "Symptoms identify a reaction but not where the substitution occurred."
            },
            {
              "t": "The laboratory stores several blood groups in separate refrigerators in serology in the workup.",
              "v": "wrong",
              "fb": "Routine inventory diversity does not demonstrate an error."
            },
            {
              "t": "A staff member initially reports the reaction as unexpected in the workup in serology before transfusion.",
              "v": "danger",
              "fb": "Surprise is not evidence about laboratory custody."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "Because the blood-bank issue remains intact, responsibility moves to the person controlling the bedside bag and scanner override rather than the manager or assessor."
          }
        }
      ]
    },
    "levine": {
      "sci": "Philip Levine (1900-1987)",
      "topic": "The Rh factor & hemolytic reactions",
      "lede": "Levine showed that antibodies beyond ABO matter—and that different incompatibilities leave different serologic clocks.",
      "no": 2,
      "profile": "Philip Levine was an American immunohematologist whose investigations clarified the Rh blood-group system and hemolytic disease. In 1939 he and Rufus Stetson described a woman who developed an antibody after pregnancy and reacted severely to transfused blood from her husband, even though the ABO groups appeared compatible. Subsequent work connected such reactions to the factor later called Rh.\n\nLevine’s research showed that transfusion compatibility extends beyond ABO. People can form alloantibodies after exposure through pregnancy or transfusion. Some cause delayed destruction of red cells; others can produce serious reactions. Modern antibody screening, identification panels, antigen typing, and crossmatching are designed to recognize these risks. A rare antibody may be difficult to find, but it produces a serologic pattern that can be investigated.\n\nABO-incompatible transfusion has a different signature. Pre-existing anti-A or anti-B can activate complement rapidly, causing intravascular hemolysis, fever, pain, hypotension, hemoglobin in plasma or urine, and potentially kidney injury and shock. The timing and laboratory findings can therefore distinguish immediate ABO incompatibility from many delayed or less severe reactions.\n\nCarraway’s post-reaction sample shows rapid intravascular hemolysis, and the recovered donor cells carry the ABO antigen targeted by the patient’s known antibody. The pretransfusion antibody screen does not show a newly missed rare specificity. Levine’s serology rejects the claim that an unforeseeable antibody defeated correct testing. The biology points to a plainly incompatible unit, leaving custody and intent to explain how it reached the patient. The timing, antigen, and complement findings all point to ordinary ABO incompatibility rather than an exotic missed antibody.",
      "frame": "The technologist points to the post-reaction plasma and antibody panel. “Rare does not mean invisible. Tell me what kind of destruction this is.”",
      "q": [
        {
          "q": "What did Levine’s work help establish about transfusion compatibility?",
          "o": [
            {
              "t": "ABO typing detects nearly every antibody capable of damaging transfused red cells in serology.",
              "v": "partial",
              "fb": "Additional screening is needed because ABO does not cover every antigen."
            },
            {
              "t": "Clinically important antibodies exist beyond ABO and can follow pregnancy or transfusion.",
              "v": "expert",
              "fb": "Levine helped reveal alloimmune reactions not explained by ABO alone."
            },
            {
              "t": "Rh antibodies occur naturally in everyone before any exposure in serology in the workup.",
              "v": "wrong",
              "fb": "Rh antibodies usually arise after exposure rather than existing naturally in all people."
            },
            {
              "t": "A compatible crossmatch prevents all future antibody formation permanently in serology.",
              "v": "danger",
              "fb": "Compatibility for one transfusion does not prevent later immunization."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "Levine’s serology finds no missed rare antibody; the reaction pattern is immediate ABO incompatibility from the wrong unit."
          }
        },
        {
          "q": "Which pattern is most consistent with acute ABO-incompatible hemolysis?",
          "o": [
            {
              "t": "A mild delayed fall in haemoglobin weeks after transfusion with no acute signs in serology.",
              "v": "partial",
              "fb": "That timing better fits some delayed alloantibody reactions."
            },
            {
              "t": "No laboratory evidence of hemolysis despite transient anxiety at the bedside.",
              "v": "wrong",
              "fb": "Absence of hemolysis would weaken an acute incompatible-unit diagnosis."
            },
            {
              "t": "Rapid intravascular red-cell destruction with complement-related systemic symptoms.",
              "v": "expert",
              "fb": "ABO incompatibility can produce abrupt complement-mediated intravascular hemolysis."
            },
            {
              "t": "Mainly a local skin rash caused by adhesive on the blood-bag label in serology.",
              "v": "danger",
              "fb": "Contact irritation does not explain systemic red-cell destruction."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The immediate clinical and laboratory changes begin only after the substituted bag is connected on the ward, not during testing or storage."
          }
        },
        {
          "q": "What would support a rare-antibody explanation instead?",
          "o": [
            {
              "t": "A donor unit with a plainly incompatible ABO group and no additional antibody detected.",
              "v": "partial",
              "fb": "That evidence points to ordinary ABO incompatibility instead."
            },
            {
              "t": "A compatible unit that remains sealed in the blood-bank return bin in serology.",
              "v": "wrong",
              "fb": "The unused compatible unit shifts the question toward substitution."
            },
            {
              "t": "A scanner override linked to the nurse assigned at the bedside in the workup in serology.",
              "v": "danger",
              "fb": "Credential evidence addresses custody and intent rather than rare immunology."
            },
            {
              "t": "A reproducible antibody screen and identification pattern against an antigen on the donor cells.",
              "v": "expert",
              "fb": "Rare alloantibodies should leave a specific serologic pattern that can be reproduced."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The lab record eliminates the assessor’s missed-antibody scenario and leaves the bedside custodian of the incompatible bag as the active decision-maker."
          }
        }
      ]
    },
    "drew": {
      "sci": "Charles Drew (1904-1950)",
      "topic": "Blood banking, preservation & traceability",
      "lede": "Drew turned blood supply into a controlled chain in which every bag, handoff, and destination can be reconstructed.",
      "no": 3,
      "profile": "Charles Drew was an American physician and surgeon whose research and administration transformed blood storage and large-scale collection. His doctoral work examined the preservation of blood and plasma, and during the Second World War he directed major programs that standardized donor collection, processing, testing, storage, and shipment. He emphasized that a blood program is a chain of controlled steps rather than a refrigerator full of interchangeable bags.\n\nTraceability is central to that chain. A unique donation number follows the product through collection, component preparation, testing, issue, transfusion, return, or disposal. Records allow a hospital to investigate reactions, recall products, and determine who handled a unit. Temperature limits, seals, labels, and documented handoffs preserve both quality and identity.\n\nModern electronic systems add barcode scanning and authenticated users, but the logic remains Drew’s. Overrides may be necessary during emergencies, yet they should create an auditable event with a reason and user credential. Discarded labels, relabelled bags, missing seals, or impossible movement times can reveal intentional interference. Chain of custody does not by itself prove motive; it establishes opportunity and control.\n\nIn the Carraway timeline, the compatible unit is issued and placed in the ward refrigerator. The assigned nurse uses an emergency override to open the bedside transfusion workflow, although the patient is stable and another nurse is available. A different bag leaves a restricted return cart during the same minutes; its original label is recovered beneath the medication bin. Drew’s traceability framework connects product, place, and person. The deliberate sequence is too structured to be an ordinary identification slip.",
      "frame": "The clerk opens the barcode audit beside a recovered label. “A blood unit has a biography. This one was rewritten during eleven minutes on the ward.”",
      "q": [
        {
          "q": "Why does blood banking require a unique product identifier?",
          "o": [
            {
              "t": "It links collection, testing, issue, transfusion, return, and any later investigation.",
              "v": "expert",
              "fb": "The identifier preserves traceability across the product’s entire life cycle."
            },
            {
              "t": "It changes the blood group so the unit can be used for more recipients.",
              "v": "partial",
              "fb": "A label cannot alter biological blood-group antigens."
            },
            {
              "t": "It replaces the need to confirm patient identity at the bedside in custody logs.",
              "v": "wrong",
              "fb": "Product and patient identity must still be matched before transfusion."
            },
            {
              "t": "It indicates mainly the price paid for processing the donation in custody logs.",
              "v": "danger",
              "fb": "Identifiers serve clinical custody, not merely billing."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "Drew’s custody timeline converges at the ward refrigerator, restricted return cart, and bedside scanner during one short access window."
          }
        },
        {
          "q": "What is the evidentiary value of an authenticated override?",
          "o": [
            {
              "t": "It strongly suggests that nearly every override was medically necessary and correctly performed.",
              "v": "partial",
              "fb": "Necessity must be assessed from clinical context and policy."
            },
            {
              "t": "It records which user bypassed the normal check and when the bypass occurred before transfusion began.",
              "v": "expert",
              "fb": "The credential creates an auditable custody event requiring explanation."
            },
            {
              "t": "It erases earlier barcode events so the emergency workflow remains private before transfusion began.",
              "v": "wrong",
              "fb": "Audit systems preserve rather than erase override history."
            },
            {
              "t": "It changes an incompatible unit into a permissible emergency product before transfusion began.",
              "v": "danger",
              "fb": "Software permission cannot change immunologic compatibility."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The override, restricted-cart access, and label disposal all occur under Nurse Sel Kade’s credentials while no emergency justified bypassing the scan."
          }
        },
        {
          "q": "Which combination most strongly indicates deliberate substitution rather than a simple mix-up?",
          "o": [
            {
              "t": "Two similar patient surnames appearing on the ward census that morning in custody logs.",
              "v": "partial",
              "fb": "Similar names create risk but do not explain the unused unit and label disposal."
            },
            {
              "t": "One barcode scanner requiring a battery replacement later in the month in custody logs.",
              "v": "wrong",
              "fb": "Future battery maintenance does not account for authenticated override activity."
            },
            {
              "t": "A justified-compatible unit left unused, an override, a retrieved alternate bag, and discarded label.",
              "v": "expert",
              "fb": "The coordinated custody actions show selection and concealment rather than one accidental mismatch."
            },
            {
              "t": "A busy shift with several ordinary transfusions completed correctly in custody logs.",
              "v": "danger",
              "fb": "Workload provides context but not the structured substitution chain."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "The ordered custody actions—override, alternate-bag retrieval, label removal, and transfusion—support intentional substitution over accidental mismatch."
          }
        }
      ]
    }
  },
  "story": [
    "<b>Carraway’s reaction begins in the patient’s bloodstream, but the decisive choice may have occurred before the line was connected.</b>",
    "Nurse Okafor has the bedside sequence. The Lab Tech can distinguish a rare antibody from ordinary ABO incompatibility. The Blood Custody Clerk holds the product and credential trail.",
    "Intentional substitution, unforeseeable immunology, and accidental mismatch each predict different relationships among the tested unit, transfused bag, and electronic record.",
    "The accusation must earn an extraordinary conclusion by joining biology to custody rather than relying on the severity of the outcome."
  ],
  "endings": {
    "overclaimWhat": "mismatch",
    "dismissalWhat": "rareReaction",
    "win": {
      "expertTitle": "The Unit Was Switched",
      "expert": [
        "You connect Nurse Sel Kade — the transfusion nurse, the Transfusion Ward & Bedside Scanner, and a deliberate incompatible-unit substitution at the bedside. The full clue chain links the initiating condition, the physical mechanism, and the decisive record without relying on candidate order.",
        "The two alternative explanations each fit part of the scene, but neither survives the combined timing, material, and documentary evidence."
      ],
      "soundTitle": "The Bedside Custody Chain",
      "sound": [
        "Your accusation identifies Nurse Sel Kade — the transfusion nurse, the Transfusion Ward & Bedside Scanner, and a deliberate incompatible-unit substitution at the bedside.",
        "A few missed clues leave gaps in the reconstruction, yet the evidence you recovered is sufficient to distinguish the true sequence from both traps."
      ],
      "namedTitle": "Correct Act, Limited Motive",
      "named": [
        "You reach the correct three-part verdict with a thin evidentiary file.",
        "The result is right, although the unrecovered clues would be needed to defend the causal chain under sustained challenge."
      ]
    },
    "overclaim": {
      "title": "This Was Not a Simple Mix-Up",
      "body": [
        "An accidental mismatch does not explain the unused compatible unit, authenticated override, restricted-cart retrieval, and discarded original label.",
        "The sequence contains selection and concealment rather than one ordinary identification slip."
      ]
    },
    "dismissal": {
      "title": "The Antibody Was Not Unforeseeable",
      "body": [
        "The antibody studies show immediate ABO incompatibility and no reproducible rare specificity.",
        "A rare reaction cannot account for the different numbered bag replacing the correctly crossmatched product."
      ]
    },
    "wrongNames": {
      "title": "Right Mechanism, Wrong Attribution",
      "body": [
        "You recognize the governing mechanism but assign it to the wrong actor or move its decisive evidence away from the location where the records and physical traces converge."
      ]
    }
  }
}
};
