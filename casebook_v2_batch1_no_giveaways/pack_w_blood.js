module.exports = { PACK: {
  "id": "w_blood",
  "title": "The Crossmatch",
  "discipline": "Transfusion & Blood Banking",
  "teaser": "The patient collapsed minutes after transfusion began. Was it transfusion-related acute lung injury, or a severe febrile reaction? Component type and laboratory findings must identify the event.",
  "overclaimTag": "transfusion-related acute lung injury",
  "truthTag": "acute ABO hemolysis from incompatible blood",
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
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  "placeNarr": "You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  "overclaimTease": "TRALI and febrile reactions are legitimate immediate concerns; symptoms, component type, and compatibility testing must choose.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "manager",
      "items": [
        {
          "id": "nurse2",
          "label": "The transfusion nurse"
        },
        {
          "id": "manager",
          "label": "Alder — the blood-bank manager"
        },
        {
          "id": "assessor",
          "label": "The lab accreditation assessor"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "records",
      "items": [
        {
          "id": "ward",
          "label": "The Transfusion Ward"
        },
        {
          "id": "bloodbank",
          "label": "The Blood Bank & Crossmatch Lab"
        },
        {
          "id": "records",
          "label": "The Blood-Bank Office & Records"
        }
      ]
    },
    "what": {
      "title": "Which transfusion reaction killed the patient?",
      "truth": "mismatch",
      "items": [
        {
          "id": "murder",
          "label": "TRALI caused acute noncardiogenic pulmonary edema after plasma exposure."
        },
        {
          "id": "rareReaction",
          "label": "A febrile nonhemolytic reaction caused fever without red-cell destruction."
        },
        {
          "id": "mismatch",
          "label": "Acute ABO hemolysis followed incompatible red-cell transfusion."
        }
      ]
    }
  },
  "PLACES": {
    "ward": {
      "name": "The Transfusion Ward",
      "xy": [
        140,
        90
      ]
    },
    "bloodbank": {
      "name": "The Blood Bank & Crossmatch Lab",
      "xy": [
        330,
        240
      ]
    },
    "records": {
      "name": "The Blood-Bank Office & Records",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "ward",
      "bloodbank"
    ],
    [
      "bloodbank",
      "records"
    ]
  ],
  "CHARACTERS": {
    "wardnurse": {
      "name": "Nurse Okafor",
      "role": "Ward nurse",
      "face": "🩸",
      "badge": "N",
      "legend": "the ward",
      "hint": "Knows the ward timeline and can identify who handled the patient and where each handoff occurred."
    },
    "labtech": {
      "name": "The Lab Tech",
      "role": "Blood-bank technologist",
      "face": "🔬",
      "badge": "L",
      "legend": "the blood bank",
      "hint": "Maintains laboratory custody and can trace staff, samples, and work areas through the blood bank."
    },
    "clerk": {
      "name": "The Clerk",
      "role": "Blood-bank records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Holds accreditation, scheduling, and management records for the transfusion service."
    }
  },
  "TOPICMAP": {
    "ward": {
      "wardnurse": [
        "circulation",
        "firsttransfusion"
      ],
      "labtech": [
        "earlytransfusion",
        "humantransfusion"
      ],
      "clerk": [
        "crossmatch",
        "typingfirst"
      ]
    },
    "bloodbank": {
      "wardnurse": [
        "groups",
        "classification"
      ],
      "labtech": [
        "citrate",
        "storedblood"
      ],
      "clerk": [
        "preservation",
        "depot"
      ]
    },
    "records": {
      "wardnurse": [
        "bankterm",
        "plasma"
      ],
      "labtech": [
        "banking",
        "rhfactor"
      ],
      "clerk": [
        "hepb",
        "hepc"
      ]
    }
  },
  "TOPICS": {
    "circulation": {
      "sci": "William Harvey (1578-1657)",
      "topic": "The circulation of the blood",
      "lede": "William Harvey made the circulation of the blood one link in the traceable chain from donor to patient.",
      "no": 1,
      "profile": "Today’s transfusion-service dispatch traces William Harvey through the circulation of the blood. William Harvey demonstrated that the heart pumps blood in a closed circulation through arteries and veins. Quantitative estimates showed that the liver could not continually manufacture the enormous volume required by older theories. Blood can be collected, stored, typed, divided, transported, and released only through a chain of linked controls. Harvey’s work established one scientific or organizational link in that chain.\n\nThe safe procedure is to use anatomy, observation, and quantitative flow reasoning to test a physiological model. Identity must follow the patient, specimen, test, unit, issue record, bedside check, and reaction investigation without relying on memory or visual familiarity.\n\nCompatibility is biological and administrative at once. Correct reagents cannot rescue a mislabeled tube, and a correctly selected unit can still reach the wrong patient if bedside identification fails. Redundant checks are designed for exactly those ordinary human errors.\n\nThe blood-banking rule: safe transfusion begins with understanding where blood goes and how rapidly it reaches the body. A transfusion is safe only when laboratory compatibility and patient identity remain joined until the unit enters the vein. Emergency release changes the approval path but should never erase traceability or the later compatibility review. A suspected reaction requires the bag, tubing, patient sample, and records to be preserved together. Duplicate identifiers should be resolved before testing rather than reconciled after a unit has already been issued. Temperature excursions and transport delays belong in the component history because storage affects quality independently of typing.",
      "frame": "Nurse Okafor places a wristband beside a unit label at The Transfusion Ward. \"Both look correct alone. Tell me what the circulation of the blood requires before they meet.\"",
      "q": [
        {
          "q": "Which account most accurately describes William Harvey in relation to the circulation of the blood?",
          "o": [
            {
              "t": "William Harvey demonstrated that the heart pumps blood in a closed circulation through arteries and veins. Specimen identity remains joined to unit selection. Antibody history follows the patient across encounters. Transfusion fits. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "William Harvey's transfusion work relies on blood type and the unit label. Urgent demand favors rapid release. The unit label looks correct. Automation offers a coherent answer. The electronic record appears consistent. Transfusion fits. Transfusion fits.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "William Harvey's transfusion work supports ABO-compatible blood as making a clinically important immune reaction unlikely. The electronic record appears consistent. Transfusion practice makes the transfusion view plausible. The transfusion record fits.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "William Harvey's authority is invoked in transfusion practice to justify using rapid electronic release after a questionable sample because the backlog is clinically urgent. Transfusion records fit this transfusion account. Transfusion fits. Transfusion fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        },
        {
          "q": "Which procedure best preserves compatibility and identity?",
          "o": [
            {
              "t": "Perform this transfusion procedure: use anatomy, observation, and quantitative flow reasoning to test a physiological model. The issue trail remains complete. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Confirm unit type and expiration, then rely on one patient identifier instead of the final bag-to-wristband comparison. Transfusion records fit this transfusion account.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Accept a computer-selected unit despite conflicts in the specimen label, antibody screen, or patient history. The electronic record appears consistent. Transfusion fits.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Clear the queue by bypassing the serologic or bedside check and treating a reaction as an unusual biological event. Transfusion practice makes the transfusion view plausible.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        },
        {
          "q": "What transfusion-safety lesson follows?",
          "o": [
            {
              "t": "The transfusion lesson is that safe transfusion begins with understanding where blood goes and how rapidly it reaches the body. The issue trail remains complete.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Let laboratory automation replace independent identity checks when the database has a clean recent software history. The electronic record appears consistent.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Treat a rare reaction as evidence that the unit was correctly matched because a mismatch would usually declare itself early. Urgent demand favors rapid release.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Attribute the death mainly to a malicious nurse or unusual biology rather than a routine safeguard defeated under pressure. The electronic record appears consistent.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        }
      ]
    },
    "firsttransfusion": {
      "sci": "Richard Lower (1631-1691)",
      "topic": "The first transfusion experiments",
      "lede": "Transfusion moved from experiment toward system through Richard Lower’s work on the first transfusion experiments.",
      "no": 2,
      "profile": "Today’s transfusion-service dispatch traces Richard Lower through the first transfusion experiments. Richard Lower performed early animal transfusion experiments, connecting the vessels of donor and recipient animals. The work showed that blood could sustain circulation across individuals but occurred before blood groups or immune compatibility were understood. Blood can be collected, stored, typed, divided, transported, and released only through a chain of linked controls. Lower’s work established one scientific or organizational link in that chain.\n\nThe safe procedure is to separate proof that transfer is possible from proof that it is safe for humans. Identity must follow the patient, specimen, test, unit, issue record, bedside check, and reaction investigation without relying on memory or visual familiarity.\n\nCompatibility is biological and administrative at once. Correct reagents cannot rescue a mislabeled tube, and a correctly selected unit can still reach the wrong patient if bedside identification fails. Redundant checks are designed for exactly those ordinary human errors.\n\nThe blood-banking rule: technical success can conceal biological incompatibility. A transfusion is safe only when laboratory compatibility and patient identity remain joined until the unit enters the vein. Emergency release changes the approval path but should never erase traceability or the later compatibility review. A suspected reaction requires the bag, tubing, patient sample, and records to be preserved together. Duplicate identifiers should be resolved before testing rather than reconciled after a unit has already been issued. Temperature excursions and transport delays belong in the component history because storage affects quality independently of typing. Reaction reporting should feed back into donor records, antibody history, and future selection for the same patient.",
      "frame": "Nurse Okafor holds a crossmatch card to the light. \"Compatibility is a reaction, not a guess. Explain the first transfusion experiments.\"",
      "q": [
        {
          "q": "Which account most accurately describes Richard Lower in relation to the first transfusion experiments?",
          "o": [
            {
              "t": "Richard Lower performed early animal transfusion experiments, connecting the vessels of donor and recipient animals. The issue trail remains complete. Antibody history follows the patient across encounters. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Richard Lower's transfusion work emphasizes blood type and the unit label. The electronic record appears consistent. Transfusion practice makes the transfusion view plausible. Transfusion timing supports this transfusion claim.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Richard Lower's transfusion work supports ABO-compatible blood as making a clinically important immune reaction unlikely. The electronic record appears consistent. Transfusion timing supports this transfusion claim.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Richard Lower's authority is invoked in transfusion practice to justify using rapid electronic release after a questionable sample because the backlog is clinically urgent. The unit label looks correct. Transfusion fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        },
        {
          "q": "Which procedure best preserves compatibility and identity?",
          "o": [
            {
              "t": "Perform this transfusion procedure: separate proof that transfer is possible from proof that it is safe for humans. Specimen identity remains joined to unit selection. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Confirm unit type and expiration, then rely on one patient identifier instead of the final bag-to-wristband comparison. The electronic record appears consistent. The transfusion record fits.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Accept a computer-selected unit despite conflicts in the specimen label, antibody screen, or patient history. Urgent demand favors rapid release. The unit label looks correct. Transfusion fits.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Clear the queue by bypassing the serologic or bedside check and treating a reaction as an unusual biological event. The electronic record appears consistent. The transfusion record fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        },
        {
          "q": "What transfusion-safety lesson follows?",
          "o": [
            {
              "t": "The transfusion lesson is that technical success can conceal biological incompatibility. Identity stays joined to compatibility. The issue trail remains complete.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Let laboratory automation replace independent identity checks when the database has a clean recent software history. The electronic record appears consistent.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Treat a rare reaction as evidence that the unit was correctly matched because a mismatch would usually declare itself early. Urgent demand favors rapid release.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Attribute the death mainly to a malicious nurse or unusual biology rather than a routine safeguard defeated under pressure. The electronic record appears consistent.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        }
      ]
    },
    "earlytransfusion": {
      "sci": "Jean-Baptiste Denys (1643-1704)",
      "topic": "Early transfusion & its dangers",
      "lede": "Jean-Baptiste Denys used early transfusion and its dangers to expose the compatibility checks hidden behind a blood unit.",
      "no": 3,
      "profile": "Today’s transfusion-service dispatch traces Jean-Baptiste Denys through early transfusion and its dangers. Jean-Baptiste Denys transfused animal blood into humans in the 1660s, prompting controversy, severe reactions, and legal restrictions. The episodes illustrated the danger of intervention before compatibility mechanisms were known. Blood can be collected, stored, typed, divided, transported, and released only through a chain of linked controls. Denys’s work established one scientific or organizational link in that chain.\n\nThe safe procedure is to record dose, source, timing, symptoms, and alternative causes when an adverse reaction occurs. Identity must follow the patient, specimen, test, unit, issue record, bedside check, and reaction investigation without relying on memory or visual familiarity.\n\nCompatibility is biological and administrative at once. Correct reagents cannot rescue a mislabeled tube, and a correctly selected unit can still reach the wrong patient if bedside identification fails. Redundant checks are designed for exactly those ordinary human errors.\n\nThe blood-banking rule: an apparently rare reaction may reveal a fundamental mismatch. A transfusion is safe only when laboratory compatibility and patient identity remain joined until the unit enters the vein. Emergency release changes the approval path but should never erase traceability or the later compatibility review. A suspected reaction requires the bag, tubing, patient sample, and records to be preserved together. Duplicate identifiers should be resolved before testing rather than reconciled after a unit has already been issued. Temperature excursions and transport delays belong in the component history because storage affects quality independently of typing. Reaction reporting should feed back into donor records, antibody history, and future selection for the same patient.\n\nThe dangers exposed in Denys's era also clarify the limits of the febrile-reaction explanation. Febrile nonhemolytic reactions commonly cause temperature rise and chills through cytokines or recipient antibodies but do not destroy donor red cells. They usually improve when transfusion stops and supportive care begins. Immediate cardiovascular collapse accompanied by red plasma or urine requires investigation for hemolysis, not reassurance that fever alone explains the event.",
      "frame": "The Lab Tech opens the issue register. \"Every handoff must preserve identity. Begin with early transfusion and its dangers.\"",
      "q": [
        {
          "q": "Which account most accurately describes Jean-Baptiste Denys in relation to early transfusion and its dangers?",
          "o": [
            {
              "t": "Jean-Baptiste Denys transfused animal blood into humans in the 1660s, prompting controversy, severe reactions, and legal restrictions. Specimen identity remains joined to unit selection. Fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Jean-Baptiste Denys's transfusion work relies on blood type and the unit label. Urgent demand favors rapid release. The unit label looks correct. Transfusion records fit this transfusion account.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Jean-Baptiste Denys's transfusion work is read within transfusion practice as support for ABO-compatible blood as making a clinically important immune reaction unlikely. The unit label looks correct.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Jean-Baptiste Denys's transfusion authority supports using rapid electronic release after a questionable sample because the backlog is clinically urgent. The unit label looks correct. Fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        },
        {
          "q": "Which procedure best preserves compatibility and identity?",
          "o": [
            {
              "t": "Perform this transfusion procedure: record dose, source, timing, symptoms, and alternative causes when an adverse reaction occurs. The issue trail remains complete. Transfusion context matters.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Confirm unit type and expiration, then rely on one patient identifier instead of the final bag-to-wristband comparison. The electronic record appears consistent. The transfusion record fits.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Accept a computer-selected unit despite conflicts in the specimen label, antibody screen, or patient history. Urgent demand favors rapid release. The unit label looks correct. Transfusion fits.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Clear the queue by bypassing the serologic or bedside check and treating a reaction as an unusual biological event. The electronic record appears consistent. The transfusion record fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        },
        {
          "q": "What transfusion-safety lesson follows?",
          "o": [
            {
              "t": "The transfusion lesson is that an apparently rare reaction may reveal a fundamental mismatch. Identity stays joined to compatibility. The issue trail remains complete. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Let laboratory automation replace independent identity checks when the database has a clean recent software history. The electronic record appears consistent. Transfusion fits.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Treat a rare reaction as evidence that the unit was correctly matched because a mismatch would usually declare itself early. Transfusion practice makes the transfusion view plausible.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Attribute the death mainly to a malicious nurse or unusual biology rather than a routine safeguard defeated under pressure. The electronic record appears consistent. Transfusion fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        }
      ]
    },
    "humantransfusion": {
      "sci": "James Blundell (1791-1878)",
      "topic": "Human blood transfusion",
      "lede": "James Blundell made human blood transfusion one link in the traceable chain from donor to patient.",
      "no": 4,
      "profile": "Today’s transfusion-service dispatch traces James Blundell through human blood transfusion. James Blundell used human-to-human transfusion to treat severe postpartum hemorrhage in the early nineteenth century. He designed transfusion apparatus and insisted on human donors, though outcomes remained uncertain before blood typing. Blood can be collected, stored, typed, divided, transported, and released only through a chain of linked controls. Blundell’s work established one scientific or organizational link in that chain.\n\nThe safe procedure is to match the intervention to a life-threatening indication and monitor immediate response closely. Identity must follow the patient, specimen, test, unit, issue record, bedside check, and reaction investigation without relying on memory or visual familiarity.\n\nCompatibility is biological and administrative at once. Correct reagents cannot rescue a mislabeled tube, and a correctly selected unit can still reach the wrong patient if bedside identification fails. Redundant checks are designed for exactly those ordinary human errors.\n\nThe blood-banking rule: urgency does not eliminate the need for compatibility safeguards. A transfusion is safe only when laboratory compatibility and patient identity remain joined until the unit enters the vein. Emergency release changes the approval path but should never erase traceability or the later compatibility review. A suspected reaction requires the bag, tubing, patient sample, and records to be preserved together. Duplicate identifiers should be resolved before testing rather than reconciled after a unit has already been issued. Temperature excursions and transport delays belong in the component history because storage affects quality independently of typing. Reaction reporting should feed back into donor records, antibody history, and future selection for the same patient.",
      "frame": "The Lab Tech places a wristband beside a unit label at The Transfusion Ward. \"Both look correct alone. Tell me what human blood transfusion requires before they meet.\"",
      "q": [
        {
          "q": "Which account most accurately describes James Blundell in relation to human blood transfusion?",
          "o": [
            {
              "t": "James Blundell used human-to-human transfusion to treat severe postpartum hemorrhage in the early nineteenth century. Specimen identity remains joined to unit selection. Transfusion fits. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "James Blundell's transfusion work emphasizes blood type and the unit label. The electronic record appears consistent. Transfusion practice makes the transfusion view plausible. The transfusion record fits.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "James Blundell's transfusion work supports ABO-compatible blood as making a clinically important immune reaction unlikely. The electronic record appears consistent. Transfusion fits. Transfusion fits.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "James Blundell's authority is invoked in transfusion practice to justify using rapid electronic release after a questionable sample because the backlog is clinically urgent. Transfusion fits. Transfusion fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        },
        {
          "q": "Which procedure best preserves compatibility and identity?",
          "o": [
            {
              "t": "Perform this transfusion procedure: match the intervention to a life-threatening indication and monitor immediate response closely. The issue trail remains complete. Transfusion context matters.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Confirm unit type and expiration, then rely on one patient identifier instead of the final bag-to-wristband comparison. The electronic record appears consistent. The transfusion record fits.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Accept a computer-selected unit despite conflicts in the specimen label, antibody screen, or patient history. Urgent demand favors rapid release. The unit label looks correct. Transfusion fits.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Clear the queue by bypassing the serologic or bedside check and treating a reaction as an unusual biological event. The electronic record appears consistent. The transfusion record fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        },
        {
          "q": "What transfusion-safety lesson follows?",
          "o": [
            {
              "t": "The transfusion lesson is that urgency does not eliminate the need for compatibility safeguards. Identity stays joined to compatibility. The issue trail remains complete.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Let laboratory automation replace independent identity checks when the database has a clean recent software history. The electronic record appears consistent.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Treat a rare reaction as evidence that the unit was correctly matched because a mismatch would usually declare itself early. The electronic record appears consistent.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Attribute the death mainly to a malicious nurse or unusual biology rather than a routine safeguard defeated under pressure. The electronic record appears consistent.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        }
      ]
    },
    "crossmatch": {
      "sci": "Reuben Ottenberg (1882-1959)",
      "topic": "Compatibility testing & the crossmatch",
      "lede": "Transfusion moved from experiment toward system through Reuben Ottenberg’s work on compatibility testing and the crossmatch.",
      "no": 5,
      "profile": "Today’s transfusion-service dispatch traces Reuben Ottenberg through compatibility testing and the crossmatch. Reuben Ottenberg introduced routine pretransfusion compatibility testing by mixing donor red cells with recipient serum and observing agglutination or hemolysis. His work greatly reduced dangerous incompatible transfusions. Blood can be collected, stored, typed, divided, transported, and released only through a chain of linked controls. Ottenberg’s work established one scientific or organizational link in that chain.\n\nThe safe procedure is to test recipient plasma against donor cells and resolve any incompatibility before release. Identity must follow the patient, specimen, test, unit, issue record, bedside check, and reaction investigation without relying on memory or visual familiarity.\n\nCompatibility is biological and administrative at once. Correct reagents cannot rescue a mislabeled tube, and a correctly selected unit can still reach the wrong patient if bedside identification fails. Redundant checks are designed for exactly those ordinary human errors.\n\nThe blood-banking rule: the crossmatch is a barrier between a labeled unit and a biologically compatible unit. A transfusion is safe only when laboratory compatibility and patient identity remain joined until the unit enters the vein. Emergency release changes the approval path but should never erase traceability or the later compatibility review. A suspected reaction requires the bag, tubing, patient sample, and records to be preserved together. Duplicate identifiers should be resolved before testing rather than reconciled after a unit has already been issued. Temperature excursions and transport delays belong in the component history because storage affects quality independently of typing. Reaction reporting should feed back into donor records, antibody history, and future selection for the same patient.\n\nOttenberg's crossmatch addresses acute ABO hemolysis directly. Recipient antibodies can attack incompatible donor red cells within minutes, activating complement and causing fever, pain, hypotension, hemoglobinemia, hemoglobinuria, and potentially shock. Repeating ABO typing and serologic compatibility on the patient sample and unit is decisive. A major mismatch plus laboratory hemolysis identifies this mechanism rather than TRALI or an isolated febrile reaction.",
      "frame": "The Clerk holds a crossmatch card to the light. \"Compatibility is a reaction, not a guess. Explain compatibility testing and the crossmatch.\"",
      "q": [
        {
          "q": "Which account most accurately describes Reuben Ottenberg in relation to compatibility testing and the crossmatch?",
          "o": [
            {
              "t": "Reuben Ottenberg introduced routine pretransfusion compatibility testing by mixing donor red cells with recipient serum and observing agglutination or hemolysis. Antibody history follows the patient across encounters. Fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Reuben Ottenberg's transfusion work relies on blood type and the unit label. Urgent demand favors rapid release. The unit label looks correct. Automation offers a coherent answer. Transfusion records fit this transfusion account.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Reuben Ottenberg's transfusion work is read within transfusion practice as support for ABO-compatible blood as making a clinically important immune reaction unlikely. Urgent demand favors rapid release. The unit label looks correct.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Reuben Ottenberg's authority is invoked in transfusion practice to justify using rapid electronic release after a questionable sample because the backlog is clinically urgent. Transfusion timing supports this transfusion claim.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        },
        {
          "q": "Which procedure best preserves compatibility and identity?",
          "o": [
            {
              "t": "Perform this transfusion procedure: test recipient plasma against donor cells and resolve any incompatibility before release. The issue trail remains complete. Transfusion context matters. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Confirm unit type and expiration, then rely on one patient identifier instead of the final bag-to-wristband comparison. Transfusion timing supports this transfusion claim. The transfusion record fits.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Accept a computer-selected unit despite conflicts in the specimen label, antibody screen, or patient history. Urgent demand favors rapid release. The unit label looks correct. Transfusion fits. Transfusion fits.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Clear the queue by bypassing the serologic or bedside check and treating a reaction as an unusual biological event. The electronic record appears consistent. The transfusion record fits. Transfusion fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        },
        {
          "q": "What transfusion-safety lesson follows?",
          "o": [
            {
              "t": "The transfusion lesson is that the crossmatch is a barrier between a labeled unit and a biologically compatible unit. Identity stays joined to compatibility. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Let laboratory automation replace independent identity checks when the database has a clean recent software history. Transfusion timing supports this transfusion claim.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Treat a rare reaction as evidence that the unit was correctly matched because a mismatch would usually declare itself early. The unit label looks correct. Transfusion fits.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Attribute the death mainly to a malicious nurse or unusual biology rather than a routine safeguard defeated under pressure. Transfusion timing supports this transfusion claim.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        }
      ]
    },
    "typingfirst": {
      "sci": "Ludvig Hektoen (1863-1951)",
      "topic": "Typing before transfusion",
      "lede": "Ludvig Hektoen used typing before transfusion to expose the compatibility checks hidden behind a blood unit.",
      "no": 6,
      "profile": "Today’s transfusion-service dispatch traces Ludvig Hektoen through typing before transfusion. Ludvig Hektoen advocated determining blood groups before transfusion and recognized the importance of immune compatibility. His work helped move transfusion from emergency experiment toward laboratory-controlled practice. Blood can be collected, stored, typed, divided, transported, and released only through a chain of linked controls. Hektoen’s work established one scientific or organizational link in that chain.\n\nThe safe procedure is to identify patient and donor type on independently labeled specimens before selection. Identity must follow the patient, specimen, test, unit, issue record, bedside check, and reaction investigation without relying on memory or visual familiarity.\n\nCompatibility is biological and administrative at once. Correct reagents cannot rescue a mislabeled tube, and a correctly selected unit can still reach the wrong patient if bedside identification fails. Redundant checks are designed for exactly those ordinary human errors.\n\nThe blood-banking rule: correct typing is useless if the sample belongs to the wrong patient. A transfusion is safe only when laboratory compatibility and patient identity remain joined until the unit enters the vein. Emergency release changes the approval path but should never erase traceability or the later compatibility review. A suspected reaction requires the bag, tubing, patient sample, and records to be preserved together. Duplicate identifiers should be resolved before testing rather than reconciled after a unit has already been issued. Temperature excursions and transport delays belong in the component history because storage affects quality independently of typing. Reaction reporting should feed back into donor records, antibody history, and future selection for the same patient.",
      "frame": "The Clerk opens the issue register. \"Every handoff must preserve identity. Begin with typing before transfusion.\"",
      "q": [
        {
          "q": "Which account most accurately describes Ludvig Hektoen in relation to typing before transfusion?",
          "o": [
            {
              "t": "Ludvig Hektoen advocated determining blood groups before transfusion and recognized the importance of immune compatibility. Identity stays joined to compatibility. The issue trail remains complete. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Ludvig Hektoen's transfusion work emphasizes blood type and the unit label. The electronic record appears consistent. Transfusion records fit this transfusion account. Transfusion timing supports this transfusion claim.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Ludvig Hektoen's transfusion work supports ABO-compatible blood as making a clinically important immune reaction unlikely. The unit label looks correct. Transfusion practice makes the transfusion view plausible.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Ludvig Hektoen's transfusion authority supports using rapid electronic release after a questionable sample because the backlog is clinically urgent. The electronic record appears consistent. Transfusion fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        },
        {
          "q": "Which procedure best preserves compatibility and identity?",
          "o": [
            {
              "t": "Perform this transfusion procedure: identify patient and donor type on independently labeled specimens before selection. Identity stays joined to compatibility. Transfusion context matters. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Confirm unit type and expiration, then rely on one patient identifier instead of the final bag-to-wristband comparison. Transfusion timing supports this transfusion claim. The transfusion record fits.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Accept a computer-selected unit despite conflicts in the specimen label, antibody screen, or patient history. Urgent demand favors rapid release. The unit label looks correct. Transfusion fits. Transfusion fits.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Clear the queue by bypassing the serologic or bedside check and treating a reaction as an unusual biological event. The electronic record appears consistent. The transfusion record fits. Transfusion fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        },
        {
          "q": "What transfusion-safety lesson follows?",
          "o": [
            {
              "t": "The transfusion lesson is that correct typing is useless if the sample belongs to the wrong patient. Antibody history follows the patient across encounters. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Let laboratory automation replace independent identity checks when the database has a clean recent software history. Transfusion timing supports this transfusion claim.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Treat a rare reaction as evidence that the unit was correctly matched because a mismatch would usually declare itself early. The unit label looks correct. Transfusion fits.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Attribute the death mainly to a malicious nurse or unusual biology rather than a routine safeguard defeated under pressure. Transfusion records fit this transfusion account.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        }
      ]
    },
    "groups": {
      "sci": "Jan Janský (1873-1921)",
      "topic": "The four blood groups",
      "lede": "Jan Janský made the four blood groups one link in the traceable chain from donor to patient.",
      "no": 7,
      "profile": "Today’s transfusion-service dispatch traces Jan Janský through the four blood groups. Jan Janský classified human blood into four groups after studying agglutination reactions. His numbering differed from today's ABO letters, but the four-group scheme helped clarify compatibility patterns. Blood can be collected, stored, typed, divided, transported, and released only through a chain of linked controls. Janský’s work established one scientific or organizational link in that chain.\n\nThe safe procedure is to interpret agglutination with known reagent cells and controls. Identity must follow the patient, specimen, test, unit, issue record, bedside check, and reaction investigation without relying on memory or visual familiarity.\n\nCompatibility is biological and administrative at once. Correct reagents cannot rescue a mislabeled tube, and a correctly selected unit can still reach the wrong patient if bedside identification fails. Redundant checks are designed for exactly those ordinary human errors.\n\nThe blood-banking rule: classification reduces risk only when naming systems are translated correctly. A transfusion is safe only when laboratory compatibility and patient identity remain joined until the unit enters the vein. Emergency release changes the approval path but should never erase traceability or the later compatibility review. A suspected reaction requires the bag, tubing, patient sample, and records to be preserved together. Duplicate identifiers should be resolved before testing rather than reconciled after a unit has already been issued. Temperature excursions and transport delays belong in the component history because storage affects quality independently of typing. Reaction reporting should feed back into donor records, antibody history, and future selection for the same patient.",
      "frame": "Nurse Okafor places a wristband beside a unit label at The Blood Bank & Crossmatch Lab. \"Both look correct alone. Tell me what the four blood groups requires before they meet.\"",
      "q": [
        {
          "q": "Which account most accurately describes Jan Janský in relation to the four blood groups?",
          "o": [
            {
              "t": "Jan Janský classified human blood into four groups after studying agglutination reactions. Identity stays joined to compatibility. The issue trail remains complete. Transfusion fits. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Jan Janský's transfusion work emphasizes blood type and the unit label. The electronic record appears consistent. Transfusion practice makes the transfusion view plausible. The transfusion record fits.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Jan Janský's transfusion work supports ABO-compatible blood as making a clinically important immune reaction unlikely. The electronic record appears consistent. Transfusion fits. Transfusion fits.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Jan Janský's authority is invoked in transfusion practice to justify using rapid electronic release after a questionable sample because the backlog is clinically urgent. Transfusion fits. Transfusion fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        },
        {
          "q": "Which procedure best preserves compatibility and identity?",
          "o": [
            {
              "t": "Perform this transfusion procedure: interpret agglutination with known reagent cells and controls. Identity stays joined to compatibility. The issue trail remains complete. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Confirm unit type and expiration, then rely on one patient identifier instead of the final bag-to-wristband comparison. The electronic record appears consistent. The transfusion record fits.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Accept a computer-selected unit despite conflicts in the specimen label, antibody screen, or patient history. The unit label looks correct. Transfusion records fit this transfusion account.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Clear the queue by bypassing the serologic or bedside check and treating a reaction as an unusual biological event. Urgent demand favors rapid release. The unit label looks correct.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        },
        {
          "q": "What transfusion-safety lesson follows?",
          "o": [
            {
              "t": "The transfusion lesson is that classification reduces risk only when naming systems are translated correctly. Specimen identity remains joined to unit selection.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Let laboratory automation replace independent identity checks when the database has a clean recent software history. The electronic record appears consistent.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Treat a rare reaction as evidence that the unit was correctly matched because a mismatch would usually declare itself early. Urgent demand favors rapid release.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Attribute the death mainly to a malicious nurse or unusual biology rather than a routine safeguard defeated under pressure. The electronic record appears consistent.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        }
      ]
    },
    "classification": {
      "sci": "William L. Moss (1876-1957)",
      "topic": "Blood-group classification",
      "lede": "Transfusion moved from experiment toward system through William L. Moss’s work on blood-group classification.",
      "no": 8,
      "profile": "Today’s transfusion-service dispatch traces William L. Moss through blood-group classification. William Moss developed another four-group blood classification and published compatibility guidance. Differences between Moss and Janský numbering later created potential confusion until international ABO terminology prevailed. Blood can be collected, stored, typed, divided, transported, and released only through a chain of linked controls. Moss’s work established one scientific or organizational link in that chain.\n\nThe safe procedure is to use a standardized nomenclature and verify historical or external labels before transfusion. Identity must follow the patient, specimen, test, unit, issue record, bedside check, and reaction investigation without relying on memory or visual familiarity.\n\nCompatibility is biological and administrative at once. Correct reagents cannot rescue a mislabeled tube, and a correctly selected unit can still reach the wrong patient if bedside identification fails. Redundant checks are designed for exactly those ordinary human errors.\n\nThe blood-banking rule: communication errors can defeat correct laboratory science. A transfusion is safe only when laboratory compatibility and patient identity remain joined until the unit enters the vein. Emergency release changes the approval path but should never erase traceability or the later compatibility review. A suspected reaction requires the bag, tubing, patient sample, and records to be preserved together. Duplicate identifiers should be resolved before testing rather than reconciled after a unit has already been issued. Temperature excursions and transport delays belong in the component history because storage affects quality independently of typing. Reaction reporting should feed back into donor records, antibody history, and future selection for the same patient.",
      "frame": "Nurse Okafor holds a crossmatch card to the light. \"Compatibility is a reaction, not a guess. Explain blood-group classification.\"",
      "q": [
        {
          "q": "Which account most accurately describes William L. Moss in relation to blood-group classification?",
          "o": [
            {
              "t": "William Moss developed another four-group blood classification and published compatibility guidance. Specimen identity remains joined to unit selection. Antibody history follows the patient across encounters. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "William L. Moss's transfusion work emphasizes blood type and the unit label. The electronic record appears consistent. Transfusion practice makes the transfusion view plausible. Transfusion timing supports this transfusion claim.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "William L. Moss's transfusion work supports ABO-compatible blood as making a clinically important immune reaction unlikely. The electronic record appears consistent. Transfusion timing supports this transfusion claim.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "William L. Moss's authority is invoked in transfusion practice to justify using rapid electronic release after a questionable sample because the backlog is clinically urgent. The unit label looks correct. Transfusion fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        },
        {
          "q": "Which procedure best preserves compatibility and identity?",
          "o": [
            {
              "t": "Perform this transfusion procedure: use a standardized nomenclature and verify historical or external labels before transfusion. The issue trail remains complete. Transfusion context matters. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Confirm unit type and expiration, then rely on one patient identifier instead of the final bag-to-wristband comparison. Transfusion practice makes the transfusion view plausible. The transfusion record fits.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Accept a computer-selected unit despite conflicts in the specimen label, antibody screen, or patient history. Urgent demand favors rapid release. The unit label looks correct. Transfusion fits. Transfusion fits.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Clear the queue by bypassing the serologic or bedside check and treating a reaction as an unusual biological event. The electronic record appears consistent. The transfusion record fits. Transfusion fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        },
        {
          "q": "What transfusion-safety lesson follows?",
          "o": [
            {
              "t": "The transfusion lesson is that communication errors can defeat correct laboratory science. Identity stays joined to compatibility. The issue trail remains complete.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Let laboratory automation replace independent identity checks when the database has a clean recent software history. The electronic record appears consistent. Transfusion fits.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Treat a rare reaction as evidence that the unit was correctly matched because a mismatch would usually declare itself early. Transfusion timing supports this transfusion claim.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Attribute the death mainly to a malicious nurse or unusual biology rather than a routine safeguard defeated under pressure. The electronic record appears consistent.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        }
      ]
    },
    "citrate": {
      "sci": "Luis Agote (1868-1954)",
      "topic": "Citrate anticoagulation",
      "lede": "Luis Agote used citrate anticoagulation to expose the compatibility checks hidden behind a blood unit.",
      "no": 9,
      "profile": "Today’s transfusion-service dispatch traces Luis Agote through citrate anticoagulation. Luis Agote demonstrated in 1914 that sodium citrate could prevent donated blood from clotting at concentrations suitable for transfusion. Citrate anticoagulation made indirect transfusion and short-term storage practical. Blood can be collected, stored, typed, divided, transported, and released only through a chain of linked controls. Agote’s work established one scientific or organizational link in that chain.\n\nThe safe procedure is to control anticoagulant concentration, volume, storage time, and patient exposure. Identity must follow the patient, specimen, test, unit, issue record, bedside check, and reaction investigation without relying on memory or visual familiarity.\n\nCompatibility is biological and administrative at once. Correct reagents cannot rescue a mislabeled tube, and a correctly selected unit can still reach the wrong patient if bedside identification fails. Redundant checks are designed for exactly those ordinary human errors.\n\nThe blood-banking rule: a process additive enables safety only within validated limits. A transfusion is safe only when laboratory compatibility and patient identity remain joined until the unit enters the vein. Emergency release changes the approval path but should never erase traceability or the later compatibility review. A suspected reaction requires the bag, tubing, patient sample, and records to be preserved together. Duplicate identifiers should be resolved before testing rather than reconciled after a unit has already been issued. Temperature excursions and transport delays belong in the component history because storage affects quality independently of typing. Reaction reporting should feed back into donor records, antibody history, and future selection for the same patient.",
      "frame": "The Lab Tech opens the issue register. \"Every handoff must preserve identity. Begin with citrate anticoagulation.\"",
      "q": [
        {
          "q": "Which account most accurately describes Luis Agote in relation to citrate anticoagulation?",
          "o": [
            {
              "t": "Luis Agote demonstrated in 1914 that sodium citrate could prevent donated blood from clotting at concentrations suitable for transfusion. Antibody history follows the patient across encounters. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Luis Agote's transfusion work emphasizes blood type and the unit label. The electronic record appears consistent. Transfusion records fit this transfusion account. Transfusion timing supports this transfusion claim.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Luis Agote's transfusion work supports ABO-compatible blood as making a clinically important immune reaction unlikely. The unit label looks correct. Transfusion practice makes the transfusion view plausible.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Luis Agote's transfusion authority supports using rapid electronic release after a questionable sample because the backlog is clinically urgent. The electronic record appears consistent. Transfusion fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        },
        {
          "q": "Which procedure best preserves compatibility and identity?",
          "o": [
            {
              "t": "Perform this transfusion procedure: control anticoagulant concentration, volume, storage time, and patient exposure. Specimen identity remains joined to unit selection. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Confirm unit type and expiration, then rely on one patient identifier instead of the final bag-to-wristband comparison. The electronic record appears consistent. The transfusion record fits.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Accept a computer-selected unit despite conflicts in the specimen label, antibody screen, or patient history. Urgent demand favors rapid release. The unit label looks correct. Transfusion fits.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Clear the queue by bypassing the serologic or bedside check and treating a reaction as an unusual biological event. The electronic record appears consistent. The transfusion record fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        },
        {
          "q": "What transfusion-safety lesson follows?",
          "o": [
            {
              "t": "The transfusion lesson is that a process additive enables safety only within validated limits. Identity stays joined to compatibility. The issue trail remains complete.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Let laboratory automation replace independent identity checks when the database has a clean recent software history. The electronic record appears consistent.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Treat a rare reaction as evidence that the unit was correctly matched because a mismatch would usually declare itself early. The electronic record appears consistent.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Attribute the death mainly to a malicious nurse or unusual biology rather than a routine safeguard defeated under pressure. The electronic record appears consistent.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        }
      ]
    },
    "storedblood": {
      "sci": "Albert Hustin (1882-1967)",
      "topic": "Anticoagulated stored blood",
      "lede": "Albert Hustin made anticoagulated stored blood one link in the traceable chain from donor to patient.",
      "no": 10,
      "profile": "Today’s transfusion-service dispatch traces Albert Hustin through anticoagulated stored blood. Albert Hustin independently used citrate with glucose to preserve donated blood outside the body. His experiments contributed to the transition from direct donor-to-patient transfusion to stored blood. Blood can be collected, stored, typed, divided, transported, and released only through a chain of linked controls. Hustin’s work established one scientific or organizational link in that chain.\n\nThe safe procedure is to validate anticoagulation and storage conditions before treating an older unit as equivalent to fresh blood. Identity must follow the patient, specimen, test, unit, issue record, bedside check, and reaction investigation without relying on memory or visual familiarity.\n\nCompatibility is biological and administrative at once. Correct reagents cannot rescue a mislabeled tube, and a correctly selected unit can still reach the wrong patient if bedside identification fails. Redundant checks are designed for exactly those ordinary human errors.\n\nThe blood-banking rule: storage solves logistics while creating new quality-control requirements. A transfusion is safe only when laboratory compatibility and patient identity remain joined until the unit enters the vein. Emergency release changes the approval path but should never erase traceability or the later compatibility review. A suspected reaction requires the bag, tubing, patient sample, and records to be preserved together. Duplicate identifiers should be resolved before testing rather than reconciled after a unit has already been issued. Temperature excursions and transport delays belong in the component history because storage affects quality independently of typing. Reaction reporting should feed back into donor records, antibody history, and future selection for the same patient.",
      "frame": "The Lab Tech places a wristband beside a unit label at The Blood Bank & Crossmatch Lab. \"Both look correct alone. Tell me what anticoagulated stored blood requires before they meet.\"",
      "q": [
        {
          "q": "Which account most accurately describes Albert Hustin in relation to anticoagulated stored blood?",
          "o": [
            {
              "t": "Albert Hustin independently used citrate with glucose to preserve donated blood outside the body. Specimen identity remains joined to unit selection. The bedside check stays connected to laboratory release. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Albert Hustin's transfusion work emphasizes blood type and the unit label. The electronic record appears consistent. Transfusion practice makes the transfusion view plausible. Transfusion timing supports this transfusion claim.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Albert Hustin's transfusion work supports ABO-compatible blood as making a clinically important immune reaction unlikely. The electronic record appears consistent. Transfusion timing supports this transfusion claim.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Albert Hustin's authority is invoked in transfusion practice to justify using rapid electronic release after a questionable sample because the backlog is clinically urgent. The unit label looks correct. Transfusion fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        },
        {
          "q": "Which procedure best preserves compatibility and identity?",
          "o": [
            {
              "t": "Perform this transfusion procedure: validate anticoagulation and storage conditions before treating an older unit as equivalent to fresh blood. Specimen identity remains joined to unit selection. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Confirm unit type and expiration, then rely on one patient identifier instead of the final bag-to-wristband comparison. Automation offers a coherent answer. Transfusion records fit this transfusion account.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Accept a computer-selected unit despite conflicts in the specimen label, antibody screen, or patient history. The electronic record appears consistent. Transfusion practice makes the transfusion view plausible.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Clear the queue by bypassing the serologic or bedside check and treating a reaction as an unusual biological event. Transfusion context supports the view. Transfusion timing supports this transfusion claim.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        },
        {
          "q": "What transfusion-safety lesson follows?",
          "o": [
            {
              "t": "The transfusion lesson is that storage solves logistics while creating new quality-control requirements. Specimen identity remains joined to unit selection. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Let laboratory automation replace independent identity checks when the database has a clean recent software history. Transfusion timing supports this transfusion claim.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Treat a rare reaction as evidence that the unit was correctly matched because a mismatch would usually declare itself early. The unit label looks correct. Transfusion fits.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Attribute the death mainly to a malicious nurse or unusual biology rather than a routine safeguard defeated under pressure. Transfusion records fit this transfusion account.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        }
      ]
    },
    "preservation": {
      "sci": "Peyton Rous (1879-1970)",
      "topic": "Blood preservation for storage",
      "lede": "Transfusion moved from experiment toward system through Peyton Rous’s work on blood preservation for storage.",
      "no": 11,
      "profile": "Today’s transfusion-service dispatch traces Peyton Rous through blood preservation for storage. Peyton Rous and J. R. Turner developed citrate-glucose solutions that extended red-cell survival in stored blood. Their work laid scientific foundations for blood banking during wartime. Blood can be collected, stored, typed, divided, transported, and released only through a chain of linked controls. Rous’s work established one scientific or organizational link in that chain.\n\nThe safe procedure is to measure cell viability and function across the intended storage period. Identity must follow the patient, specimen, test, unit, issue record, bedside check, and reaction investigation without relying on memory or visual familiarity.\n\nCompatibility is biological and administrative at once. Correct reagents cannot rescue a mislabeled tube, and a correctly selected unit can still reach the wrong patient if bedside identification fails. Redundant checks are designed for exactly those ordinary human errors.\n\nThe blood-banking rule: an unexpired label is not enough when handling or temperature has broken the validated chain. A transfusion is safe only when laboratory compatibility and patient identity remain joined until the unit enters the vein. Emergency release changes the approval path but should never erase traceability or the later compatibility review. A suspected reaction requires the bag, tubing, patient sample, and records to be preserved together. Duplicate identifiers should be resolved before testing rather than reconciled after a unit has already been issued. Temperature excursions and transport delays belong in the component history because storage affects quality independently of typing. Reaction reporting should feed back into donor records, antibody history, and future selection for the same patient.",
      "frame": "The Clerk holds a crossmatch card to the light. \"Compatibility is a reaction, not a guess. Explain blood preservation for storage.\"",
      "q": [
        {
          "q": "Which account most accurately describes Peyton Rous in relation to blood preservation for storage?",
          "o": [
            {
              "t": "Peyton Rous and J. Identity stays joined to compatibility. Specimen identity remains joined to unit selection. Antibody history follows the patient across encounters. Transfusion fits. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Peyton Rous's transfusion work emphasizes blood type and the unit label. The electronic record appears consistent. Transfusion practice makes the transfusion view plausible. The transfusion record fits.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Peyton Rous's transfusion work supports ABO-compatible blood as making a clinically important immune reaction unlikely. The electronic record appears consistent. Transfusion fits. Transfusion fits.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Peyton Rous's authority is invoked in transfusion practice to justify using rapid electronic release after a questionable sample because the backlog is clinically urgent. Transfusion fits. Transfusion fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        },
        {
          "q": "Which procedure best preserves compatibility and identity?",
          "o": [
            {
              "t": "Perform this transfusion procedure: measure cell viability and function across the intended storage period. Specimen identity remains joined to unit selection. Transfusion context matters. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Confirm unit type and expiration, then rely on one patient identifier instead of the final bag-to-wristband comparison. Transfusion timing supports this transfusion claim. The transfusion record fits.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Accept a computer-selected unit despite conflicts in the specimen label, antibody screen, or patient history. Urgent demand favors rapid release. The unit label looks correct. Transfusion fits. Transfusion fits.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Clear the queue by bypassing the serologic or bedside check and treating a reaction as an unusual biological event. The electronic record appears consistent. The transfusion record fits. Transfusion fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        },
        {
          "q": "What transfusion-safety lesson follows?",
          "o": [
            {
              "t": "The transfusion lesson is that an unexpired label is not enough when handling or temperature has broken the validated chain. The issue trail remains complete. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Let laboratory automation replace independent identity checks when the database has a clean recent software history. Transfusion timing supports this transfusion claim.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Treat a rare reaction as evidence that the unit was correctly matched because a mismatch would usually declare itself early. The unit label looks correct. Transfusion fits.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Attribute the death mainly to a malicious nurse or unusual biology rather than a routine safeguard defeated under pressure. Transfusion timing supports this transfusion claim.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        }
      ]
    },
    "depot": {
      "sci": "Oswald Robertson (1886-1966)",
      "topic": "The first blood depot",
      "lede": "Oswald Robertson used the first blood depot to expose the compatibility checks hidden behind a blood unit.",
      "no": 12,
      "profile": "Today’s transfusion-service dispatch traces Oswald Robertson through the first blood depot. Oswald Robertson established blood depots during the First World War using collected, citrated blood stored near casualty-clearing stations. Organized inventory made transfusion available without waiting for a bedside donor. Blood can be collected, stored, typed, divided, transported, and released only through a chain of linked controls. Robertson’s work established one scientific or organizational link in that chain.\n\nThe safe procedure is to link collection, testing, refrigeration, transport, and patient identification in one traceable system. Identity must follow the patient, specimen, test, unit, issue record, bedside check, and reaction investigation without relying on memory or visual familiarity.\n\nCompatibility is biological and administrative at once. Correct reagents cannot rescue a mislabeled tube, and a correctly selected unit can still reach the wrong patient if bedside identification fails. Redundant checks are designed for exactly those ordinary human errors.\n\nThe blood-banking rule: blood banking is a chain whose weakest handoff can reach the patient. A transfusion is safe only when laboratory compatibility and patient identity remain joined until the unit enters the vein. Emergency release changes the approval path but should never erase traceability or the later compatibility review. A suspected reaction requires the bag, tubing, patient sample, and records to be preserved together. Duplicate identifiers should be resolved before testing rather than reconciled after a unit has already been issued. Temperature excursions and transport delays belong in the component history because storage affects quality independently of typing. Reaction reporting should feed back into donor records, antibody history, and future selection for the same patient.",
      "frame": "The Clerk opens the issue register. \"Every handoff must preserve identity. Begin with the first blood depot.\"",
      "q": [
        {
          "q": "Which account most accurately describes Oswald Robertson in relation to the first blood depot?",
          "o": [
            {
              "t": "Oswald Robertson established blood depots during the First World War using collected, citrated blood stored near casualty-clearing stations. Antibody history follows the patient across encounters. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Oswald Robertson's transfusion work emphasizes blood type and the unit label. Transfusion records fit this transfusion account. Transfusion context supports the view. Transfusion timing supports this transfusion claim.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Oswald Robertson's transfusion work is read within transfusion practice as support for ABO-compatible blood as making a clinically important immune reaction unlikely. The electronic record appears consistent. Transfusion fits.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Oswald Robertson's transfusion authority supports using rapid electronic release after a questionable sample because the backlog is clinically urgent. The electronic record appears consistent. Transfusion fits. Fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        },
        {
          "q": "Which procedure best preserves compatibility and identity?",
          "o": [
            {
              "t": "Perform this transfusion procedure: link collection, testing, refrigeration, transport, and patient identification in one traceable system. Specimen identity remains joined to unit selection. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Confirm unit type and expiration, then rely on one patient identifier instead of the final bag-to-wristband comparison. The unit label looks correct. Transfusion timing supports this transfusion claim.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Accept a computer-selected unit despite conflicts in the specimen label, antibody screen, or patient history. The electronic record appears consistent. Transfusion practice makes the transfusion view plausible.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Clear the queue by bypassing the serologic or bedside check and treating a reaction as an unusual biological event. Automation offers a coherent answer. Transfusion records fit this transfusion account.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        },
        {
          "q": "What transfusion-safety lesson follows?",
          "o": [
            {
              "t": "The transfusion lesson is that blood banking is a chain whose weakest handoff can reach the patient. Antibody history follows the patient across encounters. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Let laboratory automation replace independent identity checks when the database has a clean recent software history. Transfusion timing supports this transfusion claim.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Treat a rare reaction as evidence that the unit was correctly matched because a mismatch would usually declare itself early. The unit label looks correct. Transfusion fits.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Attribute the death mainly to a malicious nurse or unusual biology rather than a routine safeguard defeated under pressure. Transfusion records fit this transfusion account.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        }
      ]
    },
    "bankterm": {
      "sci": "Bernard Fantus (1874-1940)",
      "topic": "The 'blood bank'",
      "lede": "Bernard Fantus made the ’blood bank’ one link in the traceable chain from donor to patient.",
      "no": 13,
      "profile": "Today’s transfusion-service dispatch traces Bernard Fantus through the ’blood bank’. Bernard Fantus created a hospital service at Cook County Hospital in 1937 that stored donated blood and popularized the term blood bank. The model made typed blood available as an organized clinical resource. Blood can be collected, stored, typed, divided, transported, and released only through a chain of linked controls. Fantus’s work established one scientific or organizational link in that chain.\n\nThe safe procedure is to manage inventory by type, age, testing status, and traceable issue records. Identity must follow the patient, specimen, test, unit, issue record, bedside check, and reaction investigation without relying on memory or visual familiarity.\n\nCompatibility is biological and administrative at once. Correct reagents cannot rescue a mislabeled tube, and a correctly selected unit can still reach the wrong patient if bedside identification fails. Redundant checks are designed for exactly those ordinary human errors.\n\nThe blood-banking rule: availability must never be achieved by weakening identification or compatibility. A transfusion is safe only when laboratory compatibility and patient identity remain joined until the unit enters the vein. Emergency release changes the approval path but should never erase traceability or the later compatibility review. A suspected reaction requires the bag, tubing, patient sample, and records to be preserved together. Duplicate identifiers should be resolved before testing rather than reconciled after a unit has already been issued. Temperature excursions and transport delays belong in the component history because storage affects quality independently of typing. Reaction reporting should feed back into donor records, antibody history, and future selection for the same patient.",
      "frame": "Nurse Okafor places a wristband beside a unit label at The Blood-Bank Office & Records. \"Both look correct alone. Tell me what the ’blood bank’ requires before they meet.\"",
      "q": [
        {
          "q": "Which account most accurately describes Bernard Fantus in relation to the ’blood bank’?",
          "o": [
            {
              "t": "Bernard Fantus created a hospital service at Cook County Hospital in 1937 that stored donated blood and popularized the term blood bank. Specimen identity remains joined to unit selection. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Bernard Fantus's transfusion work emphasizes blood type and the unit label. The electronic record appears consistent. The unit label looks correct. Transfusion records fit this transfusion account. Context fits.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Bernard Fantus's transfusion work is read within transfusion practice as support for ABO-compatible blood as making a clinically important immune reaction unlikely. Urgent demand favors rapid release. Transfusion fits.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Bernard Fantus's transfusion authority supports using rapid electronic release after a questionable sample because the backlog is clinically urgent. Urgent demand favors rapid release. Transfusion fits. Fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        },
        {
          "q": "Which procedure best preserves compatibility and identity?",
          "o": [
            {
              "t": "Perform this transfusion procedure: manage inventory by type, age, testing status, and traceable issue records. Specimen identity remains joined to unit selection. Transfusion context matters.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Confirm unit type and expiration, then rely on one patient identifier instead of the final bag-to-wristband comparison. The electronic record appears consistent. The transfusion record fits.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Accept a computer-selected unit despite conflicts in the specimen label, antibody screen, or patient history. Urgent demand favors rapid release. The unit label looks correct. Transfusion fits.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Clear the queue by bypassing the serologic or bedside check and treating a reaction as an unusual biological event. The electronic record appears consistent. The transfusion record fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        },
        {
          "q": "What transfusion-safety lesson follows?",
          "o": [
            {
              "t": "The transfusion lesson is that availability must never be achieved by weakening identification or compatibility. Specimen identity remains joined to unit selection.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Let laboratory automation replace independent identity checks when the database has a clean recent software history. The electronic record appears consistent. Transfusion fits.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Treat a rare reaction as evidence that the unit was correctly matched because a mismatch would usually declare itself early. Transfusion timing supports this transfusion claim.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Attribute the death mainly to a malicious nurse or unusual biology rather than a routine safeguard defeated under pressure. The electronic record appears consistent.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        }
      ]
    },
    "plasma": {
      "sci": "Edwin Cohn (1892-1953)",
      "topic": "Plasma fractionation",
      "lede": "Transfusion moved from experiment toward system through Edwin Cohn’s work on plasma fractionation.",
      "no": 14,
      "profile": "Today’s transfusion-service dispatch traces Edwin Cohn through plasma fractionation. Edwin Cohn developed methods for fractionating plasma proteins using controlled changes in ethanol, temperature, pH, and ionic strength. The Cohn process enabled production of albumin and other therapeutic components at scale. Blood can be collected, stored, typed, divided, transported, and released only through a chain of linked controls. Cohn’s work established one scientific or organizational link in that chain.\n\nThe safe procedure is to control fractionation conditions and test identity, purity, potency, and contamination in each lot. Identity must follow the patient, specimen, test, unit, issue record, bedside check, and reaction investigation without relying on memory or visual familiarity.\n\nCompatibility is biological and administrative at once. Correct reagents cannot rescue a mislabeled tube, and a correctly selected unit can still reach the wrong patient if bedside identification fails. Redundant checks are designed for exactly those ordinary human errors.\n\nThe blood-banking rule: blood components require manufacturing discipline as well as donor testing. A transfusion is safe only when laboratory compatibility and patient identity remain joined until the unit enters the vein. Emergency release changes the approval path but should never erase traceability or the later compatibility review. A suspected reaction requires the bag, tubing, patient sample, and records to be preserved together. Duplicate identifiers should be resolved before testing rather than reconciled after a unit has already been issued. Temperature excursions and transport delays belong in the component history because storage affects quality independently of typing. Reaction reporting should feed back into donor records, antibody history, and future selection for the same patient.\n\nCohn's plasma-fractionation legacy helps explain TRALI as a plasma-mediated reaction rather than a red-cell mismatch. Donor antibodies or biologically active substances can trigger acute lung injury, with hypoxemia and bilateral noncardiogenic pulmonary edema during or within hours of transfusion. Hemoglobin does not spill into plasma or urine simply from TRALI. A plasma-rich component and lung-dominant findings support it; incompatible crossmatch and intravascular hemolysis do not.",
      "frame": "Nurse Okafor holds a crossmatch card to the light. \"Compatibility is a reaction, not a guess. Explain plasma fractionation.\"",
      "q": [
        {
          "q": "Which account most accurately describes Edwin Cohn in relation to plasma fractionation?",
          "o": [
            {
              "t": "Edwin Cohn developed methods for fractionating plasma proteins using controlled changes in ethanol, temperature, pH, and ionic strength. Specimen identity remains joined to unit selection. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Edwin Cohn's transfusion work emphasizes blood type and the unit label. Automation offers a coherent answer. Transfusion records fit this transfusion account. Transfusion timing supports this transfusion claim.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Edwin Cohn's transfusion work supports ABO-compatible blood as making a clinically important immune reaction unlikely. Urgent demand favors rapid release. The unit label looks correct. Transfusion fits.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Edwin Cohn's transfusion authority supports using rapid electronic release after a questionable sample because the backlog is clinically urgent. Transfusion timing supports this transfusion claim. Transfusion fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        },
        {
          "q": "Which procedure best preserves compatibility and identity?",
          "o": [
            {
              "t": "Perform this transfusion procedure: control fractionation conditions and test identity, purity, potency, and contamination in each lot. The issue trail remains complete. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Confirm unit type and expiration, then rely on one patient identifier instead of the final bag-to-wristband comparison. The electronic record appears consistent. The transfusion record fits.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Accept a computer-selected unit despite conflicts in the specimen label, antibody screen, or patient history. Urgent demand favors rapid release. The unit label looks correct. Transfusion fits.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Clear the queue by bypassing the serologic or bedside check and treating a reaction as an unusual biological event. The electronic record appears consistent. The transfusion record fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        },
        {
          "q": "What transfusion-safety lesson follows?",
          "o": [
            {
              "t": "The transfusion lesson is that blood components require manufacturing discipline as well as donor testing. Specimen identity remains joined to unit selection. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Let laboratory automation replace independent identity checks when the database has a clean recent software history. Transfusion timing supports this transfusion claim.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Treat a rare reaction as evidence that the unit was correctly matched because a mismatch would usually declare itself early. The unit label looks correct. Transfusion fits.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Attribute the death mainly to a malicious nurse or unusual biology rather than a routine safeguard defeated under pressure. Transfusion timing supports this transfusion claim.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        }
      ]
    },
    "banking": {
      "sci": "Charles Drew (1904-1950)",
      "topic": "Blood plasma & banking",
      "lede": "Charles Drew used blood plasma and banking to expose the compatibility checks hidden behind a blood unit.",
      "no": 15,
      "profile": "Today’s transfusion-service dispatch traces Charles Drew through blood plasma and banking. Charles Drew improved large-scale collection, processing, storage, and transport of blood plasma and directed major wartime programs. He emphasized standardized procedures, trained staff, and quality control. Blood can be collected, stored, typed, divided, transported, and released only through a chain of linked controls. Drew’s work established one scientific or organizational link in that chain.\n\nThe safe procedure is to standardize every step from donor collection to final distribution and preserve batch traceability. Identity must follow the patient, specimen, test, unit, issue record, bedside check, and reaction investigation without relying on memory or visual familiarity.\n\nCompatibility is biological and administrative at once. Correct reagents cannot rescue a mislabeled tube, and a correctly selected unit can still reach the wrong patient if bedside identification fails. Redundant checks are designed for exactly those ordinary human errors.\n\nThe blood-banking rule: scale magnifies both the benefit of good procedure and the reach of one labeling error. A transfusion is safe only when laboratory compatibility and patient identity remain joined until the unit enters the vein. Emergency release changes the approval path but should never erase traceability or the later compatibility review. A suspected reaction requires the bag, tubing, patient sample, and records to be preserved together. Duplicate identifiers should be resolved before testing rather than reconciled after a unit has already been issued. Temperature excursions and transport delays belong in the component history because storage affects quality independently of typing. Reaction reporting should feed back into donor records, antibody history, and future selection for the same patient.",
      "frame": "The Lab Tech opens the issue register. \"Every handoff must preserve identity. Begin with blood plasma and banking.\"",
      "q": [
        {
          "q": "Which account most accurately describes Charles Drew in relation to blood plasma and banking?",
          "o": [
            {
              "t": "Charles Drew improved large-scale collection, processing, storage, and transport of blood plasma and directed major wartime programs. The issue trail remains complete. Transfusion fits. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Charles Drew's transfusion work emphasizes blood type and the unit label. The electronic record appears consistent. Transfusion practice makes the transfusion view plausible. The transfusion record fits.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Charles Drew's transfusion work supports ABO-compatible blood as making a clinically important immune reaction unlikely. The electronic record appears consistent. Transfusion fits. Transfusion fits.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Charles Drew's authority is invoked in transfusion practice to justify using rapid electronic release after a questionable sample because the backlog is clinically urgent. Transfusion fits. Transfusion fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        },
        {
          "q": "Which procedure best preserves compatibility and identity?",
          "o": [
            {
              "t": "Perform this transfusion procedure: standardize every step from donor collection to final distribution and preserve batch traceability. The issue trail remains complete. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Confirm unit type and expiration, then rely on one patient identifier instead of the final bag-to-wristband comparison. The electronic record appears consistent. The transfusion record fits.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Accept a computer-selected unit despite conflicts in the specimen label, antibody screen, or patient history. Urgent demand favors rapid release. The unit label looks correct. Transfusion fits.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Clear the queue by bypassing the serologic or bedside check and treating a reaction as an unusual biological event. The electronic record appears consistent. The transfusion record fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        },
        {
          "q": "What transfusion-safety lesson follows?",
          "o": [
            {
              "t": "The transfusion lesson is that scale magnifies both the benefit of good procedure and the reach of one labeling error. Identity stays joined to compatibility. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Let laboratory automation replace independent identity checks when the database has a clean recent software history. Transfusion timing supports this transfusion claim.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Treat a rare reaction as evidence that the unit was correctly matched because a mismatch would usually declare itself early. The unit label looks correct. Transfusion fits.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Attribute the death mainly to a malicious nurse or unusual biology rather than a routine safeguard defeated under pressure. Transfusion timing supports this transfusion claim.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        }
      ]
    },
    "rhfactor": {
      "sci": "Philip Levine (1900-1987)",
      "topic": "The Rh factor & hemolytic disease",
      "lede": "Philip Levine made the rh factor and hemolytic disease one link in the traceable chain from donor to patient.",
      "no": 16,
      "profile": "Today’s transfusion-service dispatch traces Philip Levine through the rh factor and hemolytic disease. Philip Levine helped identify Rh incompatibility as a cause of hemolytic disease of the newborn and transfusion reactions. Antibodies formed against red-cell antigens explained dangerous reactions beyond the ABO system. Blood can be collected, stored, typed, divided, transported, and released only through a chain of linked controls. Levine’s work established one scientific or organizational link in that chain.\n\nThe safe procedure is to screen for clinically significant antibodies and select antigen-compatible units. Identity must follow the patient, specimen, test, unit, issue record, bedside check, and reaction investigation without relying on memory or visual familiarity.\n\nCompatibility is biological and administrative at once. Correct reagents cannot rescue a mislabeled tube, and a correctly selected unit can still reach the wrong patient if bedside identification fails. Redundant checks are designed for exactly those ordinary human errors.\n\nThe blood-banking rule: ABO matching alone does not establish complete compatibility. A transfusion is safe only when laboratory compatibility and patient identity remain joined until the unit enters the vein. Emergency release changes the approval path but should never erase traceability or the later compatibility review. A suspected reaction requires the bag, tubing, patient sample, and records to be preserved together. Duplicate identifiers should be resolved before testing rather than reconciled after a unit has already been issued. Temperature excursions and transport delays belong in the component history because storage affects quality independently of typing. Reaction reporting should feed back into donor records, antibody history, and future selection for the same patient.",
      "frame": "The Lab Tech places a wristband beside a unit label at The Blood-Bank Office & Records. \"Both look correct alone. Tell me what the rh factor and hemolytic disease requires before they meet.\"",
      "q": [
        {
          "q": "Which account most accurately describes Philip Levine in relation to the rh factor and hemolytic disease?",
          "o": [
            {
              "t": "Philip Levine helped identify Rh incompatibility as a cause of hemolytic disease of the newborn and transfusion reactions. Antibody history follows the patient across encounters. Fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Philip Levine's transfusion work relies on blood type and the unit label. Urgent demand favors rapid release. The unit label looks correct. Transfusion records fit this transfusion account.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Philip Levine's transfusion work is read within transfusion practice as support for ABO-compatible blood as making a clinically important immune reaction unlikely. The unit label looks correct.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Philip Levine's authority is invoked in transfusion practice to justify using rapid electronic release after a questionable sample because the backlog is clinically urgent. Transfusion fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        },
        {
          "q": "Which procedure best preserves compatibility and identity?",
          "o": [
            {
              "t": "Perform this transfusion procedure: screen for clinically significant antibodies and select antigen-compatible units. Specimen identity remains joined to unit selection. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Confirm unit type and expiration, then rely on one patient identifier instead of the final bag-to-wristband comparison. The electronic record appears consistent. The transfusion record fits.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Accept a computer-selected unit despite conflicts in the specimen label, antibody screen, or patient history. Urgent demand favors rapid release. The unit label looks correct. Transfusion fits.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Clear the queue by bypassing the serologic or bedside check and treating a reaction as an unusual biological event. The electronic record appears consistent. The transfusion record fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        },
        {
          "q": "What transfusion-safety lesson follows?",
          "o": [
            {
              "t": "The transfusion lesson is that ABO matching alone does not establish complete compatibility. Identity stays joined to compatibility. The issue trail remains complete.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Let laboratory automation replace independent identity checks when the database has a clean recent software history. The electronic record appears consistent. Transfusion fits.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Treat a rare reaction as evidence that the unit was correctly matched because a mismatch would usually declare itself early. Transfusion timing supports this transfusion claim.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Attribute the death mainly to a malicious nurse or unusual biology rather than a routine safeguard defeated under pressure. The electronic record appears consistent.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        }
      ]
    },
    "hepb": {
      "sci": "Baruch Blumberg (1925-2011)",
      "topic": "Hepatitis B & blood screening",
      "lede": "Transfusion moved from experiment toward system through Baruch Blumberg’s work on hepatitis b and blood screening.",
      "no": 17,
      "profile": "Today’s transfusion-service dispatch traces Baruch Blumberg through hepatitis b and blood screening. Baruch Blumberg discovered the hepatitis B surface antigen and helped develop a vaccine. Detection of the antigen enabled blood services to screen donations and sharply reduce transfusion-transmitted hepatitis B. Blood can be collected, stored, typed, divided, transported, and released only through a chain of linked controls. Blumberg’s work established one scientific or organizational link in that chain.\n\nThe safe procedure is to screen donors with validated assays while recognizing window periods and residual risk. Identity must follow the patient, specimen, test, unit, issue record, bedside check, and reaction investigation without relying on memory or visual familiarity.\n\nCompatibility is biological and administrative at once. Correct reagents cannot rescue a mislabeled tube, and a correctly selected unit can still reach the wrong patient if bedside identification fails. Redundant checks are designed for exactly those ordinary human errors.\n\nThe blood-banking rule: blood safety improves through layers rather than a claim of zero risk. A transfusion is safe only when laboratory compatibility and patient identity remain joined until the unit enters the vein. Emergency release changes the approval path but should never erase traceability or the later compatibility review. A suspected reaction requires the bag, tubing, patient sample, and records to be preserved together. Duplicate identifiers should be resolved before testing rather than reconciled after a unit has already been issued. Temperature excursions and transport delays belong in the component history because storage affects quality independently of typing. Reaction reporting should feed back into donor records, antibody history, and future selection for the same patient.",
      "frame": "The Clerk holds a crossmatch card to the light. \"Compatibility is a reaction, not a guess. Explain hepatitis b and blood screening.\"",
      "q": [
        {
          "q": "Which account most accurately describes Baruch Blumberg in relation to hepatitis b and blood screening?",
          "o": [
            {
              "t": "Baruch Blumberg discovered the hepatitis B surface antigen and helped develop a vaccine. Identity stays joined to compatibility. Specimen identity remains joined to unit selection. Fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Baruch Blumberg's transfusion work relies on blood type and the unit label. Urgent demand favors rapid release. The unit label looks correct. Transfusion records fit this transfusion account.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Baruch Blumberg's transfusion work is read within transfusion practice as support for ABO-compatible blood as making a clinically important immune reaction unlikely. The unit label looks correct.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Baruch Blumberg's authority is invoked in transfusion practice to justify using rapid electronic release after a questionable sample because the backlog is clinically urgent. Transfusion fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        },
        {
          "q": "Which procedure best preserves compatibility and identity?",
          "o": [
            {
              "t": "Perform this transfusion procedure: screen donors with validated assays while recognizing window periods and residual risk. Identity stays joined to compatibility. Transfusion context matters.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Confirm unit type and expiration, then rely on one patient identifier instead of the final bag-to-wristband comparison. The electronic record appears consistent. The transfusion record fits.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Accept a computer-selected unit despite conflicts in the specimen label, antibody screen, or patient history. Urgent demand favors rapid release. The unit label looks correct. Transfusion fits.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Clear the queue by bypassing the serologic or bedside check and treating a reaction as an unusual biological event. The electronic record appears consistent. The transfusion record fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        },
        {
          "q": "What transfusion-safety lesson follows?",
          "o": [
            {
              "t": "The transfusion lesson is that blood safety improves through layers rather than a claim of zero risk. Antibody history follows the patient across encounters. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Let laboratory automation replace independent identity checks when the database has a clean recent software history. Transfusion timing supports this transfusion claim.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Treat a rare reaction as evidence that the unit was correctly matched because a mismatch would usually declare itself early. The unit label looks correct. Transfusion fits.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Attribute the death mainly to a malicious nurse or unusual biology rather than a routine safeguard defeated under pressure. Transfusion timing supports this transfusion claim.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        }
      ]
    },
    "hepc": {
      "sci": "Harvey Alter (b. 1935)",
      "topic": "Hepatitis C & transfusion safety",
      "lede": "Harvey Alter used hepatitis c and transfusion safety to expose the compatibility checks hidden behind a blood unit.",
      "no": 18,
      "profile": "Today’s transfusion-service dispatch traces Harvey Alter through hepatitis c and transfusion safety. Harvey Alter's studies of post-transfusion hepatitis showed that many cases were neither hepatitis A nor B and helped establish the existence of hepatitis C before the virus was identified. Subsequent screening greatly reduced transmission. Blood can be collected, stored, typed, divided, transported, and released only through a chain of linked controls. Alter’s work established one scientific or organizational link in that chain.\n\nThe safe procedure is to use recipient follow-up and donor linkage to detect infections missed by existing tests. Identity must follow the patient, specimen, test, unit, issue record, bedside check, and reaction investigation without relying on memory or visual familiarity.\n\nCompatibility is biological and administrative at once. Correct reagents cannot rescue a mislabeled tube, and a correctly selected unit can still reach the wrong patient if bedside identification fails. Redundant checks are designed for exactly those ordinary human errors.\n\nThe blood-banking rule: surveillance after transfusion can reveal hazards that routine screening does not yet name. A transfusion is safe only when laboratory compatibility and patient identity remain joined until the unit enters the vein. Emergency release changes the approval path but should never erase traceability or the later compatibility review. A suspected reaction requires the bag, tubing, patient sample, and records to be preserved together. Duplicate identifiers should be resolved before testing rather than reconciled after a unit has already been issued. Temperature excursions and transport delays belong in the component history because storage affects quality independently of typing.",
      "frame": "The Clerk opens the issue register. \"Every handoff must preserve identity. Begin with hepatitis c and transfusion safety.\"",
      "q": [
        {
          "q": "Which account most accurately describes Harvey Alter in relation to hepatitis c and transfusion safety?",
          "o": [
            {
              "t": "Harvey Alter's studies of post-transfusion hepatitis showed that many cases were neither hepatitis A nor B and helped establish the existence of hepatitis C before the virus was identified. Specimen identity remains joined to unit selection. Transfusion fits. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Harvey Alter's transfusion work emphasizes blood type and the unit label. The electronic record appears consistent. Transfusion context supports the view. Transfusion practice makes the transfusion view plausible. Transfusion timing supports this transfusion claim. Transfusion fits.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Harvey Alter's transfusion work supports ABO-compatible blood as making a clinically important immune reaction unlikely. Transfusion records fit this transfusion account. Transfusion practice makes the transfusion view plausible. Transfusion timing supports this transfusion claim.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Harvey Alter's authority is invoked in transfusion practice to justify using rapid electronic release after a questionable sample because the backlog is clinically urgent. Urgent demand favors rapid release. The unit label looks correct. Transfusion fits. Transfusion fits.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        },
        {
          "q": "Which procedure best preserves compatibility and identity?",
          "o": [
            {
              "t": "Perform this transfusion procedure: use recipient follow-up and donor linkage to detect infections missed by existing tests. The issue trail remains complete. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Confirm unit type and expiration, then rely on one patient identifier instead of the final bag-to-wristband comparison. Transfusion records fit this transfusion account.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Accept a computer-selected unit despite conflicts in the specimen label, antibody screen, or patient history. The electronic record appears consistent. Transfusion fits.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Clear the queue by bypassing the serologic or bedside check and treating a reaction as an unusual biological event. Transfusion practice makes the transfusion view plausible.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        },
        {
          "q": "What transfusion-safety lesson follows?",
          "o": [
            {
              "t": "The transfusion lesson is that surveillance after transfusion can reveal hazards that routine screening does not yet name. The issue trail remains complete. Transfusion fits.",
              "v": "expert",
              "fb": "Correct: the response keeps patient identity and biological compatibility linked across the chain."
            },
            {
              "t": "Let laboratory automation replace independent identity checks when the database has a clean recent software history. Transfusion timing supports this transfusion claim.",
              "v": "partial",
              "fb": "This is one necessary check, but another handoff can still place the correct unit with the wrong patient."
            },
            {
              "t": "Treat a rare reaction as evidence that the unit was correctly matched because a mismatch would usually declare itself early. The unit label looks correct. Transfusion fits.",
              "v": "wrong",
              "fb": "That claim ignores the immunology or the identification requirements of safe transfusion."
            },
            {
              "t": "Attribute the death mainly to a malicious nurse or unusual biology rather than a routine safeguard defeated under pressure. Transfusion records fit this transfusion account.",
              "v": "danger",
              "fb": "That shortcut sacrifices an independent safeguard to speed and backlog pressure."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "wardnurse": {
      "ward": "An antibody chain-of-custody label covers the bedside transfusion record as Nurse Okafor joins you at The Transfusion Ward. \"Transfusion history comes first; answer well before I open the bedside chart.\"",
      "bloodbank": "An antibody chain-of-custody label covers the compatibility worksheet as Nurse Okafor joins you at The Blood Bank & Crossmatch Lab. \"Transfusion history comes first; answer well before I open the bedside chart.\"",
      "records": "An antibody chain-of-custody label covers the sample and release logs as Nurse Okafor joins you at The Blood-Bank Office & Records. \"Transfusion history comes first; answer well before I open the bedside chart.\""
    },
    "labtech": {
      "ward": "An antibody chain-of-custody label covers the bedside transfusion record as The Lab Tech joins you at The Transfusion Ward. \"The compatibility file is released only to someone who understood today's pioneer.\"",
      "bloodbank": "An antibody chain-of-custody label covers the compatibility worksheet as The Lab Tech joins you at The Blood Bank & Crossmatch Lab. \"The compatibility file is released only to someone who understood today's pioneer.\"",
      "records": "An antibody chain-of-custody label covers the sample and release logs as The Lab Tech joins you at The Blood-Bank Office & Records. \"The compatibility file is released only to someone who understood today's pioneer.\""
    },
    "clerk": {
      "ward": "An antibody chain-of-custody label covers the bedside transfusion record as The Clerk joins you at The Transfusion Ward. \"Prove the dossier was read, and the blood-bank records follow.\"",
      "bloodbank": "An antibody chain-of-custody label covers the compatibility worksheet as The Clerk joins you at The Blood Bank & Crossmatch Lab. \"Prove the dossier was read, and the blood-bank records follow.\"",
      "records": "An antibody chain-of-custody label covers the sample and release logs as The Clerk joins you at The Blood-Bank Office & Records. \"Prove the dossier was read, and the blood-bank records follow.\""
    }
  },
  "story": [
    "<b>The stopped blood unit, patient samples, and transfusion chart sit together under chain-of-custody seals.</b>",
    "<b>Nurse Okafor</b> knows the bedside sequence; <b>The Lab Tech</b> reads the serologic pattern laboratory work; <b>The Clerk</b> follows the unit through records.",
    "Possible responsibility rests with The transfusion nurse, Alder — the blood-bank manager, or The lab accreditation assessor. The serologic pattern controversy sets <b>TRALI caused acute noncardiogenic pulmonary edema after plasma exposure</b> beside <b>A febrile nonhemolytic reaction caused fever without red-cell destruction</b>.",
    "<b>The review board meets in eight days, before routine inventory movement complicates reconstruction of the unit's path.</b>"
  ],
  "endings": {
    "overclaimWhat": "murder",
    "dismissalWhat": "rareReaction",
    "win": {
      "expertTitle": "Incompatible Red Cells in the Circulation",
      "expert": [
        "Investigator June Halloway names Alder — the blood-bank manager, The Blood-Bank Office & Records, and Acute ABO hemolysis followed incompatible red-cell transfusion. Not TRALI caused acute noncardiogenic pulmonary edema after plasma exposure. Not A febrile nonhemolytic reaction caused fever without red-cell destruction.",
        "The readings distinguish TRALI, febrile nonhemolytic reaction, and acute ABO hemolysis by component exposure, pulmonary findings, hemoglobin destruction, urine changes, compatibility testing, and onset."
      ],
      "soundTitle": "A Sound Reaction Diagnosis",
      "sound": [
        "Antibody evidence fixes the trio: Alder — the blood-bank manager; The Blood-Bank Office & Records; Acute ABO hemolysis followed incompatible red-cell transfusion.",
        "Serology establishes the reaction, but the release chain would benefit from one more verified handoff."
      ],
      "namedTitle": "Correct Reaction, Incomplete Chain",
      "named": [
        "Antibody evidence points to Alder — the blood-bank manager, The Blood-Bank Office & Records, and Acute ABO hemolysis followed incompatible red-cell transfusion; antibody support remains incomplete.",
        "The reaction diagnosis is accurate, yet the blood-bank chain remains inadequately proved."
      ]
    },
    "overclaim": {
      "title": "The TRALI Diagnosis",
      "body": [
        "Investigator June Halloway diagnoses TRALI caused acute noncardiogenic pulmonary edema after plasma exposure. The laboratory pattern is not lung-dominant.",
        "TRALI causes acute hypoxemia and noncardiogenic pulmonary edema, often after plasma-rich components, without the biochemical pattern of intravascular red-cell destruction."
      ]
    },
    "dismissal": {
      "title": "The Febrile-Reaction Diagnosis",
      "body": [
        "Investigator June Halloway instead chooses A febrile nonhemolytic reaction caused fever without red-cell destruction. Fever alone does not explain immediate hemolytic shock.",
        "A febrile nonhemolytic reaction produces fever and chills without major hemolysis and is rarely responsible for immediate shock with hemoglobinuria."
      ]
    },
    "wrongNames": {
      "title": "Right Reaction, Wrong Names",
      "body": [
        "Acute ABO hemolysis is right, but the named person or location is not. Repair the transfusion chain before filing."
      ]
    }
  }
}
};
