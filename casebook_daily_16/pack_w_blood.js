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
  "boardNarr": "You have ${days} before your inquiry ends. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The place you test determines the dossier you receive, and the conversation costs one day.",
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
        "circulation"
      ],
      "labtech": [
        "earlytransfusion"
      ],
      "clerk": [
        "crossmatch"
      ]
    },
    "bloodbank": {
      "wardnurse": [
        "groups"
      ],
      "labtech": [
        "citrate"
      ],
      "clerk": [
        "preservation"
      ]
    },
    "records": {
      "wardnurse": [
        "bankterm"
      ],
      "labtech": [
        "banking"
      ],
      "clerk": [
        "hepb"
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
      "frame": "Places a wristband beside a unit label at The Transfusion Ward. \"Both look correct alone. Tell me what the circulation of the blood requires before they meet.\"",
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
    "earlytransfusion": {
      "sci": "Jean-Baptiste Denys (1643-1704)",
      "topic": "Early transfusion & its dangers",
      "lede": "Jean-Baptiste Denys used early transfusion and its dangers to expose the compatibility checks hidden behind a blood unit.",
      "no": 2,
      "profile": "Today’s transfusion-service dispatch traces Jean-Baptiste Denys through early transfusion and its dangers. Jean-Baptiste Denys transfused animal blood into humans in the 1660s, prompting controversy, severe reactions, and legal restrictions. The episodes illustrated the danger of intervention before compatibility mechanisms were known. Blood can be collected, stored, typed, divided, transported, and released only through a chain of linked controls. Denys’s work established one scientific or organizational link in that chain.\n\nThe safe procedure is to record dose, source, timing, symptoms, and alternative causes when an adverse reaction occurs. Identity must follow the patient, specimen, test, unit, issue record, bedside check, and reaction investigation without relying on memory or visual familiarity.\n\nCompatibility is biological and administrative at once. Correct reagents cannot rescue a mislabeled tube, and a correctly selected unit can still reach the wrong patient if bedside identification fails. Redundant checks are designed for exactly those ordinary human errors.\n\nThe blood-banking rule: an apparently rare reaction may reveal a fundamental mismatch. A transfusion is safe only when laboratory compatibility and patient identity remain joined until the unit enters the vein. Emergency release changes the approval path but should never erase traceability or the later compatibility review. A suspected reaction requires the bag, tubing, patient sample, and records to be preserved together. Duplicate identifiers should be resolved before testing rather than reconciled after a unit has already been issued. Temperature excursions and transport delays belong in the component history because storage affects quality independently of typing. Reaction reporting should feed back into donor records, antibody history, and future selection for the same patient.\n\nThe dangers exposed in Denys's era also clarify the limits of the febrile-reaction explanation. Febrile nonhemolytic reactions commonly cause temperature rise and chills through cytokines or recipient antibodies but do not destroy donor red cells. They usually improve when transfusion stops and supportive care begins. Immediate cardiovascular collapse accompanied by red plasma or urine requires investigation for hemolysis, not reassurance that fever alone explains the event.",
      "frame": "Opens the issue register. \"Every handoff must preserve identity. Begin with early transfusion and its dangers.\"",
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
    "crossmatch": {
      "sci": "Reuben Ottenberg (1882-1959)",
      "topic": "Compatibility testing & the crossmatch",
      "lede": "Transfusion moved from experiment toward system through Reuben Ottenberg’s work on compatibility testing and the crossmatch.",
      "no": 3,
      "profile": "Today’s transfusion-service dispatch traces Reuben Ottenberg through compatibility testing and the crossmatch. Reuben Ottenberg introduced routine pretransfusion compatibility testing by mixing donor red cells with recipient serum and observing agglutination or hemolysis. His work greatly reduced dangerous incompatible transfusions. Blood can be collected, stored, typed, divided, transported, and released only through a chain of linked controls. Ottenberg’s work established one scientific or organizational link in that chain.\n\nThe safe procedure is to test recipient plasma against donor cells and resolve any incompatibility before release. Identity must follow the patient, specimen, test, unit, issue record, bedside check, and reaction investigation without relying on memory or visual familiarity.\n\nCompatibility is biological and administrative at once. Correct reagents cannot rescue a mislabeled tube, and a correctly selected unit can still reach the wrong patient if bedside identification fails. Redundant checks are designed for exactly those ordinary human errors.\n\nThe blood-banking rule: the crossmatch is a barrier between a labeled unit and a biologically compatible unit. A transfusion is safe only when laboratory compatibility and patient identity remain joined until the unit enters the vein. Emergency release changes the approval path but should never erase traceability or the later compatibility review. A suspected reaction requires the bag, tubing, patient sample, and records to be preserved together. Duplicate identifiers should be resolved before testing rather than reconciled after a unit has already been issued. Temperature excursions and transport delays belong in the component history because storage affects quality independently of typing. Reaction reporting should feed back into donor records, antibody history, and future selection for the same patient.\n\nOttenberg's crossmatch addresses acute ABO hemolysis directly. Recipient antibodies can attack incompatible donor red cells within minutes, activating complement and causing fever, pain, hypotension, hemoglobinemia, hemoglobinuria, and potentially shock. Repeating ABO typing and serologic compatibility on the patient sample and unit is decisive. A major mismatch plus laboratory hemolysis identifies this mechanism rather than TRALI or an isolated febrile reaction.",
      "frame": "Holds a crossmatch card to the light. \"Compatibility is a reaction, not a guess. Explain compatibility testing and the crossmatch.\"",
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
    "groups": {
      "sci": "Jan Janský (1873-1921)",
      "topic": "The four blood groups",
      "lede": "Jan Janský made the four blood groups one link in the traceable chain from donor to patient.",
      "no": 4,
      "profile": "Today’s transfusion-service dispatch traces Jan Janský through the four blood groups. Jan Janský classified human blood into four groups after studying agglutination reactions. His numbering differed from today's ABO letters, but the four-group scheme helped clarify compatibility patterns. Blood can be collected, stored, typed, divided, transported, and released only through a chain of linked controls. Janský’s work established one scientific or organizational link in that chain.\n\nThe safe procedure is to interpret agglutination with known reagent cells and controls. Identity must follow the patient, specimen, test, unit, issue record, bedside check, and reaction investigation without relying on memory or visual familiarity.\n\nCompatibility is biological and administrative at once. Correct reagents cannot rescue a mislabeled tube, and a correctly selected unit can still reach the wrong patient if bedside identification fails. Redundant checks are designed for exactly those ordinary human errors.\n\nThe blood-banking rule: classification reduces risk only when naming systems are translated correctly. A transfusion is safe only when laboratory compatibility and patient identity remain joined until the unit enters the vein. Emergency release changes the approval path but should never erase traceability or the later compatibility review. A suspected reaction requires the bag, tubing, patient sample, and records to be preserved together. Duplicate identifiers should be resolved before testing rather than reconciled after a unit has already been issued. Temperature excursions and transport delays belong in the component history because storage affects quality independently of typing. Reaction reporting should feed back into donor records, antibody history, and future selection for the same patient.",
      "frame": "Places a wristband beside a unit label at The Blood Bank & Crossmatch Lab. \"Both look correct alone. Tell me what the four blood groups requires before they meet.\"",
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
    "citrate": {
      "sci": "Luis Agote (1868-1954)",
      "topic": "Citrate anticoagulation",
      "lede": "Luis Agote used citrate anticoagulation to expose the compatibility checks hidden behind a blood unit.",
      "no": 5,
      "profile": "Today’s transfusion-service dispatch traces Luis Agote through citrate anticoagulation. Luis Agote demonstrated in 1914 that sodium citrate could prevent donated blood from clotting at concentrations suitable for transfusion. Citrate anticoagulation made indirect transfusion and short-term storage practical. Blood can be collected, stored, typed, divided, transported, and released only through a chain of linked controls. Agote’s work established one scientific or organizational link in that chain.\n\nThe safe procedure is to control anticoagulant concentration, volume, storage time, and patient exposure. Identity must follow the patient, specimen, test, unit, issue record, bedside check, and reaction investigation without relying on memory or visual familiarity.\n\nCompatibility is biological and administrative at once. Correct reagents cannot rescue a mislabeled tube, and a correctly selected unit can still reach the wrong patient if bedside identification fails. Redundant checks are designed for exactly those ordinary human errors.\n\nThe blood-banking rule: a process additive enables safety only within validated limits. A transfusion is safe only when laboratory compatibility and patient identity remain joined until the unit enters the vein. Emergency release changes the approval path but should never erase traceability or the later compatibility review. A suspected reaction requires the bag, tubing, patient sample, and records to be preserved together. Duplicate identifiers should be resolved before testing rather than reconciled after a unit has already been issued. Temperature excursions and transport delays belong in the component history because storage affects quality independently of typing. Reaction reporting should feed back into donor records, antibody history, and future selection for the same patient.",
      "frame": "Opens the issue register. \"Every handoff must preserve identity. Begin with citrate anticoagulation.\"",
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
    "preservation": {
      "sci": "Peyton Rous (1879-1970)",
      "topic": "Blood preservation for storage",
      "lede": "Transfusion moved from experiment toward system through Peyton Rous’s work on blood preservation for storage.",
      "no": 6,
      "profile": "Today’s transfusion-service dispatch traces Peyton Rous through blood preservation for storage. Peyton Rous and J. R. Turner developed citrate-glucose solutions that extended red-cell survival in stored blood. Their work laid scientific foundations for blood banking during wartime. Blood can be collected, stored, typed, divided, transported, and released only through a chain of linked controls. Rous’s work established one scientific or organizational link in that chain.\n\nThe safe procedure is to measure cell viability and function across the intended storage period. Identity must follow the patient, specimen, test, unit, issue record, bedside check, and reaction investigation without relying on memory or visual familiarity.\n\nCompatibility is biological and administrative at once. Correct reagents cannot rescue a mislabeled tube, and a correctly selected unit can still reach the wrong patient if bedside identification fails. Redundant checks are designed for exactly those ordinary human errors.\n\nThe blood-banking rule: an unexpired label is not enough when handling or temperature has broken the validated chain. A transfusion is safe only when laboratory compatibility and patient identity remain joined until the unit enters the vein. Emergency release changes the approval path but should never erase traceability or the later compatibility review. A suspected reaction requires the bag, tubing, patient sample, and records to be preserved together. Duplicate identifiers should be resolved before testing rather than reconciled after a unit has already been issued. Temperature excursions and transport delays belong in the component history because storage affects quality independently of typing. Reaction reporting should feed back into donor records, antibody history, and future selection for the same patient.",
      "frame": "Holds a crossmatch card to the light. \"Compatibility is a reaction, not a guess. Explain blood preservation for storage.\"",
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
    "bankterm": {
      "sci": "Bernard Fantus (1874-1940)",
      "topic": "The 'blood bank'",
      "lede": "Bernard Fantus made the ’blood bank’ one link in the traceable chain from donor to patient.",
      "no": 7,
      "profile": "Today’s transfusion-service dispatch traces Bernard Fantus through the ’blood bank’. Bernard Fantus created a hospital service at Cook County Hospital in 1937 that stored donated blood and popularized the term blood bank. The model made typed blood available as an organized clinical resource. Blood can be collected, stored, typed, divided, transported, and released only through a chain of linked controls. Fantus’s work established one scientific or organizational link in that chain.\n\nThe safe procedure is to manage inventory by type, age, testing status, and traceable issue records. Identity must follow the patient, specimen, test, unit, issue record, bedside check, and reaction investigation without relying on memory or visual familiarity.\n\nCompatibility is biological and administrative at once. Correct reagents cannot rescue a mislabeled tube, and a correctly selected unit can still reach the wrong patient if bedside identification fails. Redundant checks are designed for exactly those ordinary human errors.\n\nThe blood-banking rule: availability must never be achieved by weakening identification or compatibility. A transfusion is safe only when laboratory compatibility and patient identity remain joined until the unit enters the vein. Emergency release changes the approval path but should never erase traceability or the later compatibility review. A suspected reaction requires the bag, tubing, patient sample, and records to be preserved together. Duplicate identifiers should be resolved before testing rather than reconciled after a unit has already been issued. Temperature excursions and transport delays belong in the component history because storage affects quality independently of typing. Reaction reporting should feed back into donor records, antibody history, and future selection for the same patient.",
      "frame": "Places a wristband beside a unit label at The Blood-Bank Office & Records. \"Both look correct alone. Tell me what the ’blood bank’ requires before they meet.\"",
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
    "banking": {
      "sci": "Charles Drew (1904-1950)",
      "topic": "Blood plasma & banking",
      "lede": "Charles Drew used blood plasma and banking to expose the compatibility checks hidden behind a blood unit.",
      "no": 8,
      "profile": "Today’s transfusion-service dispatch traces Charles Drew through blood plasma and banking. Charles Drew improved large-scale collection, processing, storage, and transport of blood plasma and directed major wartime programs. He emphasized standardized procedures, trained staff, and quality control. Blood can be collected, stored, typed, divided, transported, and released only through a chain of linked controls. Drew’s work established one scientific or organizational link in that chain.\n\nThe safe procedure is to standardize every step from donor collection to final distribution and preserve batch traceability. Identity must follow the patient, specimen, test, unit, issue record, bedside check, and reaction investigation without relying on memory or visual familiarity.\n\nCompatibility is biological and administrative at once. Correct reagents cannot rescue a mislabeled tube, and a correctly selected unit can still reach the wrong patient if bedside identification fails. Redundant checks are designed for exactly those ordinary human errors.\n\nThe blood-banking rule: scale magnifies both the benefit of good procedure and the reach of one labeling error. A transfusion is safe only when laboratory compatibility and patient identity remain joined until the unit enters the vein. Emergency release changes the approval path but should never erase traceability or the later compatibility review. A suspected reaction requires the bag, tubing, patient sample, and records to be preserved together. Duplicate identifiers should be resolved before testing rather than reconciled after a unit has already been issued. Temperature excursions and transport delays belong in the component history because storage affects quality independently of typing. Reaction reporting should feed back into donor records, antibody history, and future selection for the same patient.",
      "frame": "Opens the issue register. \"Every handoff must preserve identity. Begin with blood plasma and banking.\"",
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
    "hepb": {
      "sci": "Baruch Blumberg (1925-2011)",
      "topic": "Hepatitis B & blood screening",
      "lede": "Transfusion moved from experiment toward system through Baruch Blumberg’s work on hepatitis b and blood screening.",
      "no": 9,
      "profile": "Today’s transfusion-service dispatch traces Baruch Blumberg through hepatitis b and blood screening. Baruch Blumberg discovered the hepatitis B surface antigen and helped develop a vaccine. Detection of the antigen enabled blood services to screen donations and sharply reduce transfusion-transmitted hepatitis B. Blood can be collected, stored, typed, divided, transported, and released only through a chain of linked controls. Blumberg’s work established one scientific or organizational link in that chain.\n\nThe safe procedure is to screen donors with validated assays while recognizing window periods and residual risk. Identity must follow the patient, specimen, test, unit, issue record, bedside check, and reaction investigation without relying on memory or visual familiarity.\n\nCompatibility is biological and administrative at once. Correct reagents cannot rescue a mislabeled tube, and a correctly selected unit can still reach the wrong patient if bedside identification fails. Redundant checks are designed for exactly those ordinary human errors.\n\nThe blood-banking rule: blood safety improves through layers rather than a claim of zero risk. A transfusion is safe only when laboratory compatibility and patient identity remain joined until the unit enters the vein. Emergency release changes the approval path but should never erase traceability or the later compatibility review. A suspected reaction requires the bag, tubing, patient sample, and records to be preserved together. Duplicate identifiers should be resolved before testing rather than reconciled after a unit has already been issued. Temperature excursions and transport delays belong in the component history because storage affects quality independently of typing. Reaction reporting should feed back into donor records, antibody history, and future selection for the same patient.",
      "frame": "Holds a crossmatch card to the light. \"Compatibility is a reaction, not a guess. Explain hepatitis b and blood screening.\"",
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
    "<b>The Crossmatch</b> opens inside the Carraway Hospital blood-bank inquiry, where the visible damage is easier to describe than the chain that produced it.",
    "<b>Nurse Okafor</b>, <b>The Lab Tech</b>, and <b>The Clerk</b> each control a different slice of the record, and each conversation turns one real pioneer into a way of reading the case.",
    "Some witnesses are drawn toward <b>TRALI caused acute noncardiogenic pulmonary edema after plasma exposure.</b>; others settle too quickly on <b>A febrile nonhemolytic reaction caused fever without red-cell destruction.</b>. Your job is to separate those tempting stories from the harder explanation the evidence supports.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide what the case is really about."
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
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A blood bag and crossmatch tubes with a mismatch\"><path d=\"M120 28 L180 28 L188 52 L188 88 C188 104,174 112,150 112 C126 112,112 104,112 88 L112 52 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><line x1=\"150\" y1=\"16\" x2=\"150\" y2=\"28\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M138 66 L162 66\" stroke=\"#B3261E\" stroke-width=\"2.4\"/><path d=\"M312 42 L346 42 L346 100 L312 100 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M382 42 L416 42 L416 100 L382 100 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M312 72 L416 72\" stroke=\"#326891\" stroke-width=\"2\"/><path d=\"M346 42 L382 100\" stroke=\"#B3261E\" stroke-width=\"2\"/></svg>"
}};
