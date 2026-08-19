module.exports = { PACK: {
  "id": "w_compound",
  "title": "The Compounding Room",
  "discipline": "Pharmacy & Sterile Compounding",
  "teaser": "Patients in several states fell ill after injections from one pharmacy. Did a chemical impurity enter the formula, or did Gram-negative bacteria contaminate it? Cultures must identify the source.",
  "overclaimTag": "a chemical compounding impurity",
  "truthTag": "fungal contamination from the clean-room environment",
  "venue": "the Meridian Compounding inquiry",
  "agent": {
    "name": "Investigator Del Marsh",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Pharmacy Pioneers",
  "dossierName": "PHARMACY & STERILITY PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Meridian Compounding inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before your inquiry ends. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The place you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "Chemical impurity and bacterial endotoxin can both produce sudden clusters; culture identity and batch pattern must decide.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "owner",
      "items": [
        {
          "id": "pharmacist",
          "label": "The compounding pharmacist"
        },
        {
          "id": "owner",
          "label": "Guillory — the pharmacy's owner"
        },
        {
          "id": "inspector",
          "label": "The state pharmacy inspector"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "office",
      "items": [
        {
          "id": "cleanroom",
          "label": "The Clean Room & Autoclave"
        },
        {
          "id": "culture",
          "label": "The Environmental-Monitoring Lab"
        },
        {
          "id": "office",
          "label": "The Owner's Business Office"
        }
      ]
    },
    "what": {
      "title": "What contaminated the injections?",
      "truth": "sterility",
      "items": [
        {
          "id": "poison",
          "label": "A chemical impurity entered during inaccurate ingredient compounding."
        },
        {
          "id": "coincidence",
          "label": "Gram-negative bacteria produced an endotoxin-rich bloodstream outbreak."
        },
        {
          "id": "sterility",
          "label": "Environmental mold caused fungal contamination across batches."
        }
      ]
    }
  },
  "PLACES": {
    "cleanroom": {
      "name": "The Clean Room & Autoclave",
      "xy": [
        140,
        90
      ]
    },
    "culture": {
      "name": "The Environmental-Monitoring Lab",
      "xy": [
        330,
        240
      ]
    },
    "office": {
      "name": "The Owner's Business Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "cleanroom",
      "culture"
    ],
    [
      "culture",
      "office"
    ]
  ],
  "CHARACTERS": {
    "tech": {
      "name": "Pharmacy Tech Ruiz",
      "role": "Compounding technician",
      "face": "⚗",
      "badge": "T",
      "legend": "the clean room",
      "hint": "Knows batch flow and can identify who worked in each room and where materials moved."
    },
    "micro": {
      "name": "The Micro Analyst",
      "role": "Environmental-monitoring analyst",
      "face": "🧫",
      "badge": "M",
      "legend": "the lab",
      "hint": "Maintains environmental samples and can trace analysts, plates, and laboratory locations."
    },
    "clerk": {
      "name": "The Clerk",
      "role": "Records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Holds production schedules, ownership decisions, and regulatory correspondence for the pharmacy."
    }
  },
  "TOPICMAP": {
    "cleanroom": {
      "tech": [
        "materiamedica"
      ],
      "micro": [
        "dose"
      ],
      "clerk": [
        "pharmacy"
      ]
    },
    "culture": {
      "tech": [
        "germtheory"
      ],
      "micro": [
        "spores"
      ],
      "clerk": [
        "mycology"
      ]
    },
    "office": {
      "tech": [
        "magicbullet"
      ],
      "micro": [
        "standardization"
      ],
      "clerk": [
        "mycoses"
      ]
    }
  },
  "TOPICS": {
    "materiamedica": {
      "sci": "Galen (c.129-216)",
      "topic": "Materia medica & compounding",
      "lede": "Galen made materia medica and compounding part of the controlled path from ingredients to sterile medicine.",
      "no": 1,
      "profile": "Today’s pharmacy memorandum follows Galen into materia medica and compounding. Galen systematized ancient materia medica and prepared complex remedies by mixing plant, mineral, and animal ingredients. The tradition of 'galenical' pharmacy preserved methods of extraction and compounding for centuries, though many theories behind the remedies were incorrect. Sterile compounding combines drug identity, dose, environment, technique, equipment, and release testing. Galen’s contribution illuminates one control that separates a prepared medicine from a reliably prepared medicine.\n\nThe production discipline is to record ingredients, preparation, dose, and intended use so a compound can be reproduced and evaluated. Batch records, cleaning, personnel qualification, air control, sterilizer cycles, environmental cultures, hold times, and deviations must be reviewed before distribution.\n\nMicrobial contamination is often sparse and uneven, so a few passing samples cannot prove every vial sterile. Process validation supplies the assurance that end-product testing cannot. Shortened cycles or ignored plates weaken that assurance even if many patients remain well.\n\nThe compounding principle: compounding skill does not guarantee purity, sterility, or therapeutic value. Sterility is the demonstrated result of a controlled process, never an assumption attached to a clear solution. A deviation record should identify affected lots, investigation results, corrective action, and the authority for release. Production volume is not evidence that the clean room remains in control. Personnel monitoring and media-fill simulations test whether routine manipulations preserve asepsis under realistic conditions. A positive environmental result requires organism identification, spatial review, product impact assessment, and documented closure. Beyond-use dates depend on formulation, container, storage, and validated process rather than business demand.",
      "frame": "Checks a settle plate at The Clean Room & Autoclave. \"One colony can be a warning, not a rounding error. Explain materia medica and compounding.\"",
      "q": [
        {
          "q": "Which pharmacy-science explanation best captures Galen’s work on materia medica and compounding?",
          "o": [
            {
              "t": "Galen systematized ancient materia medica and prepared complex remedies by mixing plant, mineral, and animal ingredients. Sterility assurance stays process-based. Compounding fits.",
              "v": "expert",
              "fb": "Correct: the response relies on validated process control, traceable records, and meaningful monitoring."
            },
            {
              "t": "Galen's compounding work emphasizes the formula. The formula appears correct. Production urgency supports the choice. Compounding practice makes the compounding view plausible.",
              "v": "partial",
              "fb": "This check contributes evidence but cannot compensate for an unvalidated or deviating process."
            },
            {
              "t": "Galen's compounding work supports a clear particle-free injection as strong evidence that the batch is sterile. Compounding practice makes the compounding view plausible.",
              "v": "wrong",
              "fb": "That statement misinterprets drug purity, microbial control, or what one sample can prove."
            },
            {
              "t": "Galen's compounding authority supports releasing product after failed monitoring because contamination may affect a limited portion of the batch. The compounding record fits.",
              "v": "danger",
              "fb": "That shortcut allows output targets to override sterility evidence and patient protection."
            }
          ]
        },
        {
          "q": "Which control best supports release of a sterile compounded product?",
          "o": [
            {
              "t": "Use this sterile-production control: record ingredients, preparation, dose, and intended use so a compound can be reproduced and evaluated. The batch remains reconstructable. Compounding fits.",
              "v": "expert",
              "fb": "Correct: the response relies on validated process control, traceable records, and meaningful monitoring."
            },
            {
              "t": "Test several finished vials and review the formula while treating shortened cycles and positive environmental plates as separate deviations. The formula appears correct. Compounding fits.",
              "v": "partial",
              "fb": "This check contributes evidence but cannot compensate for an unvalidated or deviating process."
            },
            {
              "t": "Treat a passing sterility sample as representative of an unevenly contaminated production batch. Production urgency supports the choice. Compounding practice makes the compounding view plausible.",
              "v": "wrong",
              "fb": "That statement misinterprets drug purity, microbial control, or what one sample can prove."
            },
            {
              "t": "Increase output by shortening validated steps, waive the deviation, and investigate after patients become ill. Sampled vials remain clear. End testing offers direct evidence. Compounding fits.",
              "v": "danger",
              "fb": "That shortcut allows output targets to override sterility evidence and patient protection."
            }
          ]
        },
        {
          "q": "What rule should govern sterile compounding?",
          "o": [
            {
              "t": "The pharmacy lesson is that compounding skill does not guarantee purity, sterility, or therapeutic value. Sterility assurance stays process-based. Compounding fits.",
              "v": "expert",
              "fb": "Correct: the response relies on validated process control, traceable records, and meaningful monitoring."
            },
            {
              "t": "Use end-product testing to compensate for occasional environmental and process-control failures during urgent production. Sampled vials remain clear. Compounding fits.",
              "v": "partial",
              "fb": "This check contributes evidence but cannot compensate for an unvalidated or deviating process."
            },
            {
              "t": "Treat correct potency and labeling as sufficient evidence that an injectable product is also microbiologically safe. Sampled vials remain clear. Compounding fits.",
              "v": "wrong",
              "fb": "That statement misinterprets drug purity, microbial control, or what one sample can prove."
            },
            {
              "t": "Attribute the illnesses mainly to deliberate poisoning or coincidence rather than a production-control failure. Compounding timing supports this compounding claim.",
              "v": "danger",
              "fb": "That shortcut allows output targets to override sterility evidence and patient protection."
            }
          ]
        }
      ]
    },
    "dose": {
      "sci": "William Withering (1741-1799)",
      "topic": "Dosage & the therapeutic dose",
      "lede": "William Withering used dosage and the therapeutic dose to separate a prepared drug from a validated product.",
      "no": 2,
      "profile": "Today’s pharmacy memorandum follows William Withering into dosage and the therapeutic dose. William Withering studied foxglove as a treatment for dropsy and carefully described preparation, dosing, benefits, and toxic effects. He recognized that the therapeutic effect depended on finding a narrow range between too little and too much. Sterile compounding combines drug identity, dose, environment, technique, equipment, and release testing. Withering’s contribution illuminates one control that separates a prepared medicine from a reliably prepared medicine.\n\nThe production discipline is to titrate dose against response and stop or adjust when characteristic toxicity appears. Batch records, cleaning, personnel qualification, air control, sterilizer cycles, environmental cultures, hold times, and deviations must be reviewed before distribution.\n\nMicrobial contamination is often sparse and uneven, so a few passing samples cannot prove every vial sterile. Process validation supplies the assurance that end-product testing cannot. Shortened cycles or ignored plates weaken that assurance even if many patients remain well.\n\nThe compounding principle: the same substance can be medicine or poison according to dose and control. Sterility is the demonstrated result of a controlled process, never an assumption attached to a clear solution. A deviation record should identify affected lots, investigation results, corrective action, and the authority for release. Production volume is not evidence that the clean room remains in control. Personnel monitoring and media-fill simulations test whether routine manipulations preserve asepsis under realistic conditions. A positive environmental result requires organism identification, spatial review, product impact assessment, and documented closure. Beyond-use dates depend on formulation, container, storage, and validated process rather than business demand.",
      "frame": "Holds a released batch record. \"Clear liquid hides its process. Begin with dosage and the therapeutic dose.\"",
      "q": [
        {
          "q": "Which pharmacy-science explanation best captures William Withering’s work on dosage and the therapeutic dose?",
          "o": [
            {
              "t": "William Withering studied foxglove as a treatment for dropsy and carefully described preparation, dosing, benefits, and toxic effects. Sterility assurance stays process-based. Compounding fits.",
              "v": "expert",
              "fb": "Correct: the response relies on validated process control, traceable records, and meaningful monitoring."
            },
            {
              "t": "William Withering's compounding work relies on the formula. End testing offers direct evidence. Compounding records fit this compounding account. Compounding timing supports this compounding claim.",
              "v": "partial",
              "fb": "This check contributes evidence but cannot compensate for an unvalidated or deviating process."
            },
            {
              "t": "William Withering's compounding work supports a clear particle-free injection as strong evidence that the batch is sterile. Compounding practice makes the compounding view plausible. Compounding fits.",
              "v": "wrong",
              "fb": "That statement misinterprets drug purity, microbial control, or what one sample can prove."
            },
            {
              "t": "William Withering's compounding authority supports releasing product after failed monitoring because contamination may affect a limited portion of the batch. The compounding record fits. Compounding fits.",
              "v": "danger",
              "fb": "That shortcut allows output targets to override sterility evidence and patient protection."
            }
          ]
        },
        {
          "q": "Which control best supports release of a sterile compounded product?",
          "o": [
            {
              "t": "Use this sterile-production control: titrate dose against response and stop or adjust when characteristic toxicity appears. The batch remains reconstructable. Compounding fits. Compounding fits.",
              "v": "expert",
              "fb": "Correct: the response relies on validated process control, traceable records, and meaningful monitoring."
            },
            {
              "t": "Test several finished vials and review the formula while treating shortened cycles and positive environmental plates as separate deviations. Sampled vials remain clear. Compounding fits.",
              "v": "partial",
              "fb": "This check contributes evidence but cannot compensate for an unvalidated or deviating process."
            },
            {
              "t": "Treat a passing sterility sample as representative of an unevenly contaminated production batch. The formula appears correct. Compounding records fit this compounding account. Compounding fits.",
              "v": "wrong",
              "fb": "That statement misinterprets drug purity, microbial control, or what one sample can prove."
            },
            {
              "t": "Increase output by shortening validated steps, waive the deviation, and investigate after patients become ill. Compounding practice makes the compounding view plausible. The compounding record fits.",
              "v": "danger",
              "fb": "That shortcut allows output targets to override sterility evidence and patient protection."
            }
          ]
        },
        {
          "q": "What rule should govern sterile compounding?",
          "o": [
            {
              "t": "The pharmacy lesson is that the same substance can be medicine or poison according to dose and control. Sterility assurance stays process-based. Compounding fits.",
              "v": "expert",
              "fb": "Correct: the response relies on validated process control, traceable records, and meaningful monitoring."
            },
            {
              "t": "Use end-product testing to compensate for occasional environmental and process-control failures during urgent production. Sampled vials remain clear. Compounding fits.",
              "v": "partial",
              "fb": "This check contributes evidence but cannot compensate for an unvalidated or deviating process."
            },
            {
              "t": "Treat correct potency and labeling as sufficient evidence that an injectable product is also microbiologically safe. Sampled vials remain clear. Compounding fits.",
              "v": "wrong",
              "fb": "That statement misinterprets drug purity, microbial control, or what one sample can prove."
            },
            {
              "t": "Attribute the illnesses mainly to deliberate poisoning or coincidence rather than a production-control failure. Compounding records fit this compounding account.",
              "v": "danger",
              "fb": "That shortcut allows output targets to override sterility evidence and patient protection."
            }
          ]
        }
      ]
    },
    "pharmacy": {
      "sci": "William Procter Jr. (1817-1874)",
      "topic": "The founding of pharmacy practice",
      "lede": "The compounding bench became more accountable through William Procter Jr.’s work on the founding of pharmacy practice.",
      "no": 3,
      "profile": "Today’s pharmacy memorandum follows William Procter Jr. into the founding of pharmacy practice. William Procter Jr. helped professionalize pharmacy in the United States through education, writing, and the American Pharmaceutical Association. He promoted scientific preparation, standards, and a distinct professional responsibility for medicines. Sterile compounding combines drug identity, dose, environment, technique, equipment, and release testing. Jr’s contribution illuminates one control that separates a prepared medicine from a reliably prepared medicine.\n\nThe production discipline is to use written formulas, trained personnel, and independent checks for preparation and release. Batch records, cleaning, personnel qualification, air control, sterilizer cycles, environmental cultures, hold times, and deviations must be reviewed before distribution.\n\nMicrobial contamination is often sparse and uneven, so a few passing samples cannot prove every vial sterile. Process validation supplies the assurance that end-product testing cannot. Shortened cycles or ignored plates weaken that assurance even if many patients remain well.\n\nThe compounding principle: pharmacy practice is a system of accountability, not merely a craft at the bench. Sterility is the demonstrated result of a controlled process, never an assumption attached to a clear solution. A deviation record should identify affected lots, investigation results, corrective action, and the authority for release. Production volume is not evidence that the clean room remains in control. Personnel monitoring and media-fill simulations test whether routine manipulations preserve asepsis under realistic conditions. A positive environmental result requires organism identification, spatial review, product impact assessment, and documented closure. Beyond-use dates depend on formulation, container, storage, and validated process rather than business demand.",
      "frame": "Opens an autoclave printout. \"The cycle ended; validation is another question. Show me the founding of pharmacy practice.\"",
      "q": [
        {
          "q": "Which pharmacy-science explanation best captures William Procter Jr.’s work on the founding of pharmacy practice?",
          "o": [
            {
              "t": "William Procter Jr. Sterility assurance stays process-based. Sterilizer validation stays linked to each load pattern. Deviation authority can be reconstructed from the record. Compounding fits. Compounding fits.",
              "v": "expert",
              "fb": "Correct: the response relies on validated process control, traceable records, and meaningful monitoring."
            },
            {
              "t": "William Procter Jr.'s compounding work emphasizes the formula. The formula appears correct. Compounding practice makes the compounding view plausible. Compounding timing supports this compounding claim.",
              "v": "partial",
              "fb": "This check contributes evidence but cannot compensate for an unvalidated or deviating process."
            },
            {
              "t": "William Procter Jr.'s compounding work supports a clear particle-free injection as strong evidence that the batch is sterile. Compounding practice makes the compounding view plausible. Compounding fits.",
              "v": "wrong",
              "fb": "That statement misinterprets drug purity, microbial control, or what one sample can prove."
            },
            {
              "t": "William Procter Jr.'s compounding authority supports releasing product after failed monitoring because contamination may affect a limited portion of the batch. The compounding record fits. Compounding fits.",
              "v": "danger",
              "fb": "That shortcut allows output targets to override sterility evidence and patient protection."
            }
          ]
        },
        {
          "q": "Which control best supports release of a sterile compounded product?",
          "o": [
            {
              "t": "Use this sterile-production control: use written formulas, trained personnel, and independent checks for preparation and release. Sterility assurance stays process-based. Compounding fits.",
              "v": "expert",
              "fb": "Correct: the response relies on validated process control, traceable records, and meaningful monitoring."
            },
            {
              "t": "Test several finished vials and review the formula while treating shortened cycles and positive environmental plates as separate deviations. Sampled vials remain clear. Compounding fits.",
              "v": "partial",
              "fb": "This check contributes evidence but cannot compensate for an unvalidated or deviating process."
            },
            {
              "t": "Treat a passing sterility sample as representative of an unevenly contaminated production batch. Compounding context supports the view. Compounding timing supports this compounding claim.",
              "v": "wrong",
              "fb": "That statement misinterprets drug purity, microbial control, or what one sample can prove."
            },
            {
              "t": "Increase output by shortening validated steps, waive the deviation, and investigate after patients become ill. Sampled vials remain clear. The formula appears correct. Compounding fits.",
              "v": "danger",
              "fb": "That shortcut allows output targets to override sterility evidence and patient protection."
            }
          ]
        },
        {
          "q": "What rule should govern sterile compounding?",
          "o": [
            {
              "t": "The pharmacy lesson is that pharmacy practice is a system of accountability, not merely a craft at the bench.",
              "v": "expert",
              "fb": "Correct: the response relies on validated process control, traceable records, and meaningful monitoring."
            },
            {
              "t": "Use end-product testing to compensate for occasional environmental and process-control failures during urgent production.",
              "v": "partial",
              "fb": "This check contributes evidence but cannot compensate for an unvalidated or deviating process."
            },
            {
              "t": "Treat correct potency and labeling as sufficient evidence that an injectable product is also microbiologically safe.",
              "v": "wrong",
              "fb": "That statement misinterprets drug purity, microbial control, or what one sample can prove."
            },
            {
              "t": "Attribute the illnesses mainly to deliberate poisoning or coincidence rather than a production-control failure.",
              "v": "danger",
              "fb": "That shortcut allows output targets to override sterility evidence and patient protection."
            }
          ]
        }
      ]
    },
    "germtheory": {
      "sci": "Louis Pasteur (1822-1895)",
      "topic": "Germ theory & sterilization",
      "lede": "Louis Pasteur made germ theory and sterilization part of the controlled path from ingredients to sterile medicine.",
      "no": 4,
      "profile": "Today’s pharmacy memorandum follows Louis Pasteur into germ theory and sterilization. Louis Pasteur demonstrated that microorganisms drive fermentation and spoilage and showed that contamination came from the environment rather than spontaneous generation. Heat treatment and exclusion of microbes became rational tools for prevention. Sterile compounding combines drug identity, dose, environment, technique, equipment, and release testing. Pasteur’s contribution illuminates one control that separates a prepared medicine from a reliably prepared medicine.\n\nThe production discipline is to control exposure, compare sterilized and unsterilized material, and trace growth to contamination. Batch records, cleaning, personnel qualification, air control, sterilizer cycles, environmental cultures, hold times, and deviations must be reviewed before distribution.\n\nMicrobial contamination is often sparse and uneven, so a few passing samples cannot prove every vial sterile. Process validation supplies the assurance that end-product testing cannot. Shortened cycles or ignored plates weaken that assurance even if many patients remain well.\n\nThe compounding principle: sterility requires preventing entry as well as killing organisms already present. Sterility is the demonstrated result of a controlled process, never an assumption attached to a clear solution. A deviation record should identify affected lots, investigation results, corrective action, and the authority for release. Production volume is not evidence that the clean room remains in control. Personnel monitoring and media-fill simulations test whether routine manipulations preserve asepsis under realistic conditions. A positive environmental result requires organism identification, spatial review, product impact assessment, and documented closure. Beyond-use dates depend on formulation, container, storage, and validated process rather than business demand. A deviation record should identify affected lots, investigation results, corrective action, and the authority for release.",
      "frame": "Checks a settle plate at The Environmental-Monitoring Lab. \"One colony can be a warning, not a rounding error. Explain germ theory and sterilization.\"",
      "q": [
        {
          "q": "Which pharmacy-science explanation best captures Louis Pasteur’s work on germ theory and sterilization?",
          "o": [
            {
              "t": "Louis Pasteur demonstrated that microorganisms drive fermentation and spoilage and showed that contamination came from the environment rather than spontaneous generation. Compounding fits.",
              "v": "expert",
              "fb": "Correct: the response relies on validated process control, traceable records, and meaningful monitoring."
            },
            {
              "t": "Louis Pasteur's compounding work emphasizes the formula. The formula appears correct. Production urgency supports the choice. Compounding practice makes the compounding view plausible.",
              "v": "partial",
              "fb": "This check contributes evidence but cannot compensate for an unvalidated or deviating process."
            },
            {
              "t": "Louis Pasteur's compounding work supports a clear particle-free injection as strong evidence that the batch is sterile. Compounding practice makes the compounding view plausible.",
              "v": "wrong",
              "fb": "That statement misinterprets drug purity, microbial control, or what one sample can prove."
            },
            {
              "t": "Louis Pasteur's compounding authority supports releasing product after failed monitoring because contamination may affect a limited portion of the batch. The compounding record fits.",
              "v": "danger",
              "fb": "That shortcut allows output targets to override sterility evidence and patient protection."
            }
          ]
        },
        {
          "q": "Which control best supports release of a sterile compounded product?",
          "o": [
            {
              "t": "Use this sterile-production control: control exposure, compare sterilized and unsterilized material, and trace growth to contamination. The batch remains reconstructable. Compounding fits.",
              "v": "expert",
              "fb": "Correct: the response relies on validated process control, traceable records, and meaningful monitoring."
            },
            {
              "t": "Test several finished vials and review the formula while treating shortened cycles and positive environmental plates as separate deviations. Sampled vials remain clear. Compounding fits.",
              "v": "partial",
              "fb": "This check contributes evidence but cannot compensate for an unvalidated or deviating process."
            },
            {
              "t": "Treat a passing sterility sample as representative of an unevenly contaminated production batch. Compounding context supports the view. Compounding timing supports this compounding claim.",
              "v": "wrong",
              "fb": "That statement misinterprets drug purity, microbial control, or what one sample can prove."
            },
            {
              "t": "Increase output by shortening validated steps, waive the deviation, and investigate after patients become ill. Sampled vials remain clear. The formula appears correct. Compounding fits.",
              "v": "danger",
              "fb": "That shortcut allows output targets to override sterility evidence and patient protection."
            }
          ]
        },
        {
          "q": "What rule should govern sterile compounding?",
          "o": [
            {
              "t": "The pharmacy lesson is that sterility requires preventing entry as well as killing organisms already present.",
              "v": "expert",
              "fb": "Correct: the response relies on validated process control, traceable records, and meaningful monitoring."
            },
            {
              "t": "Use end-product testing to compensate for occasional environmental and process-control failures during urgent production.",
              "v": "partial",
              "fb": "This check contributes evidence but cannot compensate for an unvalidated or deviating process."
            },
            {
              "t": "Treat correct potency and labeling as sufficient evidence that an injectable product is also microbiologically safe.",
              "v": "wrong",
              "fb": "That statement misinterprets drug purity, microbial control, or what one sample can prove."
            },
            {
              "t": "Attribute the illnesses mainly to deliberate poisoning or coincidence rather than a production-control failure.",
              "v": "danger",
              "fb": "That shortcut allows output targets to override sterility evidence and patient protection."
            }
          ]
        }
      ]
    },
    "spores": {
      "sci": "Ferdinand Cohn (1828-1898)",
      "topic": "Bacterial spores",
      "lede": "Ferdinand Cohn used bacterial spores to separate a prepared drug from a validated product.",
      "no": 5,
      "profile": "Today’s pharmacy memorandum follows Ferdinand Cohn into bacterial spores. Ferdinand Cohn classified bacteria and demonstrated the existence of heat-resistant endospores. His work explained why boiled infusions could later show growth without spontaneous generation. Sterile compounding combines drug identity, dose, environment, technique, equipment, and release testing. Cohn’s contribution illuminates one control that separates a prepared medicine from a reliably prepared medicine.\n\nThe production discipline is to use spore-forming organisms or biological indicators to challenge a sterilization process. Batch records, cleaning, personnel qualification, air control, sterilizer cycles, environmental cultures, hold times, and deviations must be reviewed before distribution.\n\nMicrobial contamination is often sparse and uneven, so a few passing samples cannot prove every vial sterile. Process validation supplies the assurance that end-product testing cannot. Shortened cycles or ignored plates weaken that assurance even if many patients remain well.\n\nThe compounding principle: the hardest-to-kill form sets the safety requirement. Sterility is the demonstrated result of a controlled process, never an assumption attached to a clear solution. A deviation record should identify affected lots, investigation results, corrective action, and the authority for release. Production volume is not evidence that the clean room remains in control. Personnel monitoring and media-fill simulations test whether routine manipulations preserve asepsis under realistic conditions. A positive environmental result requires organism identification, spatial review, product impact assessment, and documented closure. Beyond-use dates depend on formulation, container, storage, and validated process rather than business demand. A deviation record should identify affected lots, investigation results, corrective action, and the authority for release.\n\nCohn's study of bacterial spores helps distinguish bacterial contamination from fungal growth. Bacteria reproduce with characteristic cell shapes and culture speeds; Gram-negative organisms can release endotoxin measurable even when cells are damaged. A bacterial outbreak should yield bacterial microscopy, rapid colony formation, and often elevated endotoxin. Slow filamentous growth with hyphae and spore-bearing structures is not a Gram-negative signature.",
      "frame": "Holds a released batch record. \"Clear liquid hides its process. Begin with bacterial spores.\"",
      "q": [
        {
          "q": "Which pharmacy-science explanation best captures Ferdinand Cohn’s work on bacterial spores?",
          "o": [
            {
              "t": "Ferdinand Cohn classified bacteria and demonstrated the existence of heat-resistant endospores. The batch remains reconstructable. Sterilizer validation stays linked to each load pattern. Compounding fits.",
              "v": "expert",
              "fb": "Correct: the response relies on validated process control, traceable records, and meaningful monitoring."
            },
            {
              "t": "Ferdinand Cohn's compounding work relies on the formula. Sampled vials remain clear. The formula appears correct. End testing offers direct evidence. Compounding records fit this compounding account. Fits.",
              "v": "partial",
              "fb": "This check contributes evidence but cannot compensate for an unvalidated or deviating process."
            },
            {
              "t": "Ferdinand Cohn's compounding work is read within compounding practice as support for a clear particle-free injection as strong evidence that the batch is sterile. Compounding records fit this compounding account.",
              "v": "wrong",
              "fb": "That statement misinterprets drug purity, microbial control, or what one sample can prove."
            },
            {
              "t": "Ferdinand Cohn's authority is invoked in compounding practice to justify releasing product after failed monitoring because contamination may affect a limited portion of the batch. Compounding fits. Fits.",
              "v": "danger",
              "fb": "That shortcut allows output targets to override sterility evidence and patient protection."
            }
          ]
        },
        {
          "q": "Which control best supports release of a sterile compounded product?",
          "o": [
            {
              "t": "Use this sterile-production control: use spore-forming organisms or biological indicators to challenge a sterilization process. Environmental results remain tied to batch release.",
              "v": "expert",
              "fb": "Correct: the response relies on validated process control, traceable records, and meaningful monitoring."
            },
            {
              "t": "Test several finished vials and review the formula while treating shortened cycles and positive environmental plates as separate deviations. Compounding records fit this compounding account.",
              "v": "partial",
              "fb": "This check contributes evidence but cannot compensate for an unvalidated or deviating process."
            },
            {
              "t": "Treat a passing sterility sample as representative of an unevenly contaminated production batch. Sampled vials remain clear. The formula appears correct. End testing offers direct evidence.",
              "v": "wrong",
              "fb": "That statement misinterprets drug purity, microbial control, or what one sample can prove."
            },
            {
              "t": "Increase output by shortening validated steps, waive the deviation, and investigate after patients become ill. Sampled vials remain clear. Compounding timing supports this compounding claim.",
              "v": "danger",
              "fb": "That shortcut allows output targets to override sterility evidence and patient protection."
            }
          ]
        },
        {
          "q": "What rule should govern sterile compounding?",
          "o": [
            {
              "t": "The pharmacy lesson is that the hardest-to-kill form sets the safety requirement. The batch remains reconstructable.",
              "v": "expert",
              "fb": "Correct: the response relies on validated process control, traceable records, and meaningful monitoring."
            },
            {
              "t": "Use end-product testing to compensate for occasional environmental and process-control failures during urgent production.",
              "v": "partial",
              "fb": "This check contributes evidence but cannot compensate for an unvalidated or deviating process."
            },
            {
              "t": "Treat correct potency and labeling as sufficient evidence that an injectable product is also microbiologically safe.",
              "v": "wrong",
              "fb": "That statement misinterprets drug purity, microbial control, or what one sample can prove."
            },
            {
              "t": "Attribute the illnesses mainly to deliberate poisoning or coincidence rather than a production-control failure.",
              "v": "danger",
              "fb": "That shortcut allows output targets to override sterility evidence and patient protection."
            }
          ]
        }
      ]
    },
    "mycology": {
      "sci": "David Gruby (1810-1898)",
      "topic": "The founding of medical mycology",
      "lede": "The compounding bench became more accountable through David Gruby’s work on the founding of medical mycology.",
      "no": 6,
      "profile": "Today’s pharmacy memorandum follows David Gruby into the founding of medical mycology. David Gruby described several fungi that cause human skin and scalp disease and helped establish medical mycology. His microscopy and experimental inoculation connected specific fungi with recognizable infections. Sterile compounding combines drug identity, dose, environment, technique, equipment, and release testing. Gruby’s contribution illuminates one control that separates a prepared medicine from a reliably prepared medicine.\n\nThe production discipline is to identify fungal morphology from properly collected specimens and suitable culture conditions. Batch records, cleaning, personnel qualification, air control, sterilizer cycles, environmental cultures, hold times, and deviations must be reviewed before distribution.\n\nMicrobial contamination is often sparse and uneven, so a few passing samples cannot prove every vial sterile. Process validation supplies the assurance that end-product testing cannot. Shortened cycles or ignored plates weaken that assurance even if many patients remain well.\n\nThe compounding principle: mold in a clinical product should be treated as evidence, not dismissed as harmless background. Sterility is the demonstrated result of a controlled process, never an assumption attached to a clear solution. A deviation record should identify affected lots, investigation results, corrective action, and the authority for release. Production volume is not evidence that the clean room remains in control. Personnel monitoring and media-fill simulations test whether routine manipulations preserve asepsis under realistic conditions. A positive environmental result requires organism identification, spatial review, product impact assessment, and documented closure. Beyond-use dates depend on formulation, container, storage, and validated process rather than business demand. A deviation record should identify affected lots, investigation results, corrective action, and the authority for release.",
      "frame": "Opens an autoclave printout. \"The cycle ended; validation is another question. Show me the founding of medical mycology.\"",
      "q": [
        {
          "q": "Which pharmacy-science explanation best captures David Gruby’s work on the founding of medical mycology?",
          "o": [
            {
              "t": "David Gruby described several fungi that cause human skin and scalp disease and helped establish medical mycology. Sterilizer validation stays linked to each load pattern. Fits.",
              "v": "expert",
              "fb": "Correct: the response relies on validated process control, traceable records, and meaningful monitoring."
            },
            {
              "t": "David Gruby's compounding work emphasizes the formula. End testing offers direct evidence. Production urgency supports the choice. Compounding records fit this compounding account.",
              "v": "partial",
              "fb": "This check contributes evidence but cannot compensate for an unvalidated or deviating process."
            },
            {
              "t": "David Gruby's compounding work is read within compounding practice as support for a clear particle-free injection as strong evidence that the batch is sterile. Sampled vials remain clear.",
              "v": "wrong",
              "fb": "That statement misinterprets drug purity, microbial control, or what one sample can prove."
            },
            {
              "t": "David Gruby's authority is invoked in compounding practice to justify releasing product after failed monitoring because contamination may affect a limited portion of the batch.",
              "v": "danger",
              "fb": "That shortcut allows output targets to override sterility evidence and patient protection."
            }
          ]
        },
        {
          "q": "Which control best supports release of a sterile compounded product?",
          "o": [
            {
              "t": "Use this sterile-production control: identify fungal morphology from properly collected specimens and suitable culture conditions. Sterility assurance stays process-based. Compounding fits.",
              "v": "expert",
              "fb": "Correct: the response relies on validated process control, traceable records, and meaningful monitoring."
            },
            {
              "t": "Test several finished vials and review the formula while treating shortened cycles and positive environmental plates as separate deviations. The formula appears correct. Compounding fits.",
              "v": "partial",
              "fb": "This check contributes evidence but cannot compensate for an unvalidated or deviating process."
            },
            {
              "t": "Treat a passing sterility sample as representative of an unevenly contaminated production batch. Production urgency supports the choice. Compounding timing supports this compounding claim.",
              "v": "wrong",
              "fb": "That statement misinterprets drug purity, microbial control, or what one sample can prove."
            },
            {
              "t": "Increase output by shortening validated steps, waive the deviation, and investigate after patients become ill. Sampled vials remain clear. The formula appears correct. Compounding fits.",
              "v": "danger",
              "fb": "That shortcut allows output targets to override sterility evidence and patient protection."
            }
          ]
        },
        {
          "q": "What rule should govern sterile compounding?",
          "o": [
            {
              "t": "The pharmacy lesson is that mold in a clinical product should be treated as evidence, not dismissed as harmless background. Sterility assurance stays process-based. Compounding fits.",
              "v": "expert",
              "fb": "Correct: the response relies on validated process control, traceable records, and meaningful monitoring."
            },
            {
              "t": "Use end-product testing to compensate for occasional environmental and process-control failures during urgent production. Compounding practice makes the compounding view plausible.",
              "v": "partial",
              "fb": "This check contributes evidence but cannot compensate for an unvalidated or deviating process."
            },
            {
              "t": "Treat correct potency and labeling as sufficient evidence that an injectable product is also microbiologically safe. Compounding practice makes the compounding view plausible.",
              "v": "wrong",
              "fb": "That statement misinterprets drug purity, microbial control, or what one sample can prove."
            },
            {
              "t": "Attribute the illnesses mainly to deliberate poisoning or coincidence rather than a production-control failure. Sampled vials remain clear. The formula appears correct. Compounding fits.",
              "v": "danger",
              "fb": "That shortcut allows output targets to override sterility evidence and patient protection."
            }
          ]
        }
      ]
    },
    "magicbullet": {
      "sci": "Paul Ehrlich (1854-1915)",
      "topic": "Chemotherapy & the 'magic bullet'",
      "lede": "Paul Ehrlich made chemotherapy and the ’magic bullet’ part of the controlled path from ingredients to sterile medicine.",
      "no": 7,
      "profile": "Today’s pharmacy memorandum follows Paul Ehrlich into chemotherapy and the ’magic bullet’. Paul Ehrlich sought 'magic bullets' that would selectively attack pathogens and developed arsphenamine for syphilis after systematic testing of many compounds. His work helped found chemotherapy and standardized biological assays. Sterile compounding combines drug identity, dose, environment, technique, equipment, and release testing. Ehrlich’s contribution illuminates one control that separates a prepared medicine from a reliably prepared medicine.\n\nThe production discipline is to screen compounds systematically and compare antimicrobial effect with host toxicity. Batch records, cleaning, personnel qualification, air control, sterilizer cycles, environmental cultures, hold times, and deviations must be reviewed before distribution.\n\nMicrobial contamination is often sparse and uneven, so a few passing samples cannot prove every vial sterile. Process validation supplies the assurance that end-product testing cannot. Shortened cycles or ignored plates weaken that assurance even if many patients remain well.\n\nThe compounding principle: selectivity is measured, not guaranteed by the intention to treat. Sterility is the demonstrated result of a controlled process, never an assumption attached to a clear solution. A deviation record should identify affected lots, investigation results, corrective action, and the authority for release. Production volume is not evidence that the clean room remains in control. Personnel monitoring and media-fill simulations test whether routine manipulations preserve asepsis under realistic conditions. A positive environmental result requires organism identification, spatial review, product impact assessment, and documented closure. Beyond-use dates depend on formulation, container, storage, and validated process rather than business demand. A deviation record should identify affected lots, investigation results, corrective action, and the authority for release.",
      "frame": "Checks a settle plate at The Owner's Business Office. \"One colony can be a warning, not a rounding error. Explain chemotherapy and the ’magic bullet’.\"",
      "q": [
        {
          "q": "Which pharmacy-science explanation best captures Paul Ehrlich’s work on chemotherapy and the ’magic bullet’?",
          "o": [
            {
              "t": "Paul Ehrlich sought 'magic bullets' that would selectively attack pathogens and developed arsphenamine for syphilis after systematic testing of many compounds. Sterility assurance stays process-based. Compounding fits.",
              "v": "expert",
              "fb": "Correct: the response relies on validated process control, traceable records, and meaningful monitoring."
            },
            {
              "t": "Paul Ehrlich's compounding work emphasizes the formula. The formula appears correct. End testing offers direct evidence. Compounding records fit this compounding account. Compounding timing supports this compounding claim.",
              "v": "partial",
              "fb": "This check contributes evidence but cannot compensate for an unvalidated or deviating process."
            },
            {
              "t": "Paul Ehrlich's compounding work supports a clear particle-free injection as strong evidence that the batch is sterile. Compounding context supports the view. Compounding timing supports this compounding claim. Compounding fits.",
              "v": "wrong",
              "fb": "That statement misinterprets drug purity, microbial control, or what one sample can prove."
            },
            {
              "t": "Paul Ehrlich's compounding authority supports releasing product after failed monitoring because contamination may affect a limited portion of the batch. Compounding practice makes the compounding view plausible. Compounding fits.",
              "v": "danger",
              "fb": "That shortcut allows output targets to override sterility evidence and patient protection."
            }
          ]
        },
        {
          "q": "Which control best supports release of a sterile compounded product?",
          "o": [
            {
              "t": "Use this sterile-production control: screen compounds systematically and compare antimicrobial effect with host toxicity. The batch remains reconstructable. Compounding fits. Compounding fits.",
              "v": "expert",
              "fb": "Correct: the response relies on validated process control, traceable records, and meaningful monitoring."
            },
            {
              "t": "Test several finished vials and review the formula while treating shortened cycles and positive environmental plates as separate deviations. Sampled vials remain clear. Compounding fits.",
              "v": "partial",
              "fb": "This check contributes evidence but cannot compensate for an unvalidated or deviating process."
            },
            {
              "t": "Treat a passing sterility sample as representative of an unevenly contaminated production batch. Sampled vials remain clear. End testing offers direct evidence. Compounding fits. Compounding fits.",
              "v": "wrong",
              "fb": "That statement misinterprets drug purity, microbial control, or what one sample can prove."
            },
            {
              "t": "Increase output by shortening validated steps, waive the deviation, and investigate after patients become ill. Compounding practice makes the compounding view plausible. The compounding record fits.",
              "v": "danger",
              "fb": "That shortcut allows output targets to override sterility evidence and patient protection."
            }
          ]
        },
        {
          "q": "What rule should govern sterile compounding?",
          "o": [
            {
              "t": "The pharmacy lesson is that selectivity is measured, not guaranteed by the intention to treat. Environmental results remain tied to batch release. Compounding fits.",
              "v": "expert",
              "fb": "Correct: the response relies on validated process control, traceable records, and meaningful monitoring."
            },
            {
              "t": "Use end-product testing to compensate for occasional environmental and process-control failures during urgent production. Sampled vials remain clear. Compounding fits.",
              "v": "partial",
              "fb": "This check contributes evidence but cannot compensate for an unvalidated or deviating process."
            },
            {
              "t": "Treat correct potency and labeling as sufficient evidence that an injectable product is also microbiologically safe. Sampled vials remain clear. Compounding fits.",
              "v": "wrong",
              "fb": "That statement misinterprets drug purity, microbial control, or what one sample can prove."
            },
            {
              "t": "Attribute the illnesses mainly to deliberate poisoning or coincidence rather than a production-control failure. Compounding timing supports this compounding claim.",
              "v": "danger",
              "fb": "That shortcut allows output targets to override sterility evidence and patient protection."
            }
          ]
        }
      ]
    },
    "standardization": {
      "sci": "Torald Sollmann (1874-1965)",
      "topic": "Pharmacology & drug standardization",
      "lede": "Torald Sollmann used pharmacology and drug standardization to separate a prepared drug from a validated product.",
      "no": 8,
      "profile": "Today’s pharmacy memorandum follows Torald Sollmann into pharmacology and drug standardization. Torald Sollmann wrote a major pharmacology text and worked on standards for drug action, dosage, and safety. His career helped connect experimental pharmacology with practical regulation and prescribing. Sterile compounding combines drug identity, dose, environment, technique, equipment, and release testing. Sollmann’s contribution illuminates one control that separates a prepared medicine from a reliably prepared medicine.\n\nThe production discipline is to define potency with a validated assay and keep batch-to-batch variation within stated limits. Batch records, cleaning, personnel qualification, air control, sterilizer cycles, environmental cultures, hold times, and deviations must be reviewed before distribution.\n\nMicrobial contamination is often sparse and uneven, so a few passing samples cannot prove every vial sterile. Process validation supplies the assurance that end-product testing cannot. Shortened cycles or ignored plates weaken that assurance even if many patients remain well.\n\nThe compounding principle: a routine medicine still requires measurable consistency. Sterility is the demonstrated result of a controlled process, never an assumption attached to a clear solution. A deviation record should identify affected lots, investigation results, corrective action, and the authority for release. Production volume is not evidence that the clean room remains in control. Personnel monitoring and media-fill simulations test whether routine manipulations preserve asepsis under realistic conditions. A positive environmental result requires organism identification, spatial review, product impact assessment, and documented closure. Beyond-use dates depend on formulation, container, storage, and validated process rather than business demand. A deviation record should identify affected lots, investigation results, corrective action, and the authority for release.",
      "frame": "Holds a released batch record. \"Clear liquid hides its process. Begin with pharmacology and drug standardization.\"",
      "q": [
        {
          "q": "Which pharmacy-science explanation best captures Torald Sollmann’s work on pharmacology and drug standardization?",
          "o": [
            {
              "t": "Torald Sollmann wrote a major pharmacology text and worked on standards for drug action, dosage, and safety. Sterility assurance stays process-based. Sterilizer validation stays linked to each load pattern. Compounding fits.",
              "v": "expert",
              "fb": "Correct: the response relies on validated process control, traceable records, and meaningful monitoring."
            },
            {
              "t": "Torald Sollmann's compounding work emphasizes the formula. The formula appears correct. Compounding records fit this compounding account. Compounding context supports the view. Compounding timing supports this compounding claim.",
              "v": "partial",
              "fb": "This check contributes evidence but cannot compensate for an unvalidated or deviating process."
            },
            {
              "t": "Torald Sollmann's compounding work supports a clear particle-free injection as strong evidence that the batch is sterile. Production urgency supports the choice. Compounding practice makes the compounding view plausible.",
              "v": "wrong",
              "fb": "That statement misinterprets drug purity, microbial control, or what one sample can prove."
            },
            {
              "t": "Torald Sollmann's compounding authority supports releasing product after failed monitoring because contamination may affect a limited portion of the batch. Compounding practice makes the compounding view plausible. Compounding fits.",
              "v": "danger",
              "fb": "That shortcut allows output targets to override sterility evidence and patient protection."
            }
          ]
        },
        {
          "q": "Which control best supports release of a sterile compounded product?",
          "o": [
            {
              "t": "Use this sterile-production control: define potency with a validated assay and keep batch-to-batch variation within stated limits. Sterility assurance stays process-based. Compounding fits.",
              "v": "expert",
              "fb": "Correct: the response relies on validated process control, traceable records, and meaningful monitoring."
            },
            {
              "t": "Test several finished vials and review the formula while treating shortened cycles and positive environmental plates as separate deviations. The formula appears correct. Compounding fits.",
              "v": "partial",
              "fb": "This check contributes evidence but cannot compensate for an unvalidated or deviating process."
            },
            {
              "t": "Treat a passing sterility sample as representative of an unevenly contaminated production batch. Production urgency supports the choice. Compounding timing supports this compounding claim.",
              "v": "wrong",
              "fb": "That statement misinterprets drug purity, microbial control, or what one sample can prove."
            },
            {
              "t": "Increase output by shortening validated steps, waive the deviation, and investigate after patients become ill. Sampled vials remain clear. The formula appears correct. Compounding fits.",
              "v": "danger",
              "fb": "That shortcut allows output targets to override sterility evidence and patient protection."
            }
          ]
        },
        {
          "q": "What rule should govern sterile compounding?",
          "o": [
            {
              "t": "The pharmacy lesson is that a routine medicine still requires measurable consistency. Deviation authority can be reconstructed from the record.",
              "v": "expert",
              "fb": "Correct: the response relies on validated process control, traceable records, and meaningful monitoring."
            },
            {
              "t": "Use end-product testing to compensate for occasional environmental and process-control failures during urgent production. Sampled vials remain clear.",
              "v": "partial",
              "fb": "This check contributes evidence but cannot compensate for an unvalidated or deviating process."
            },
            {
              "t": "Treat correct potency and labeling as sufficient evidence that an injectable product is also microbiologically safe. Sampled vials remain clear.",
              "v": "wrong",
              "fb": "That statement misinterprets drug purity, microbial control, or what one sample can prove."
            },
            {
              "t": "Attribute the illnesses mainly to deliberate poisoning or coincidence rather than a production-control failure. End testing offers direct evidence.",
              "v": "danger",
              "fb": "That shortcut allows output targets to override sterility evidence and patient protection."
            }
          ]
        }
      ]
    },
    "mycoses": {
      "sci": "Chester Emmons (1900-1985)",
      "topic": "Fungal taxonomy & the mycoses",
      "lede": "The compounding bench became more accountable through Chester Emmons’s work on fungal taxonomy and the mycoses.",
      "no": 9,
      "profile": "Today’s pharmacy memorandum follows Chester Emmons into fungal taxonomy and the mycoses. Chester Emmons studied environmental fungi and the ecology and taxonomy of systemic mycoses. He helped show that pathogens causing severe disease may inhabit soil or animal-associated environments before entering patients. Sterile compounding combines drug identity, dose, environment, technique, equipment, and release testing. Emmons’s contribution illuminates one control that separates a prepared medicine from a reliably prepared medicine.\n\nThe production discipline is to compare patient isolates with environmental samples using discriminatory typing. Batch records, cleaning, personnel qualification, air control, sterilizer cycles, environmental cultures, hold times, and deviations must be reviewed before distribution.\n\nMicrobial contamination is often sparse and uneven, so a few passing samples cannot prove every vial sterile. Process validation supplies the assurance that end-product testing cannot. Shortened cycles or ignored plates weaken that assurance even if many patients remain well.\n\nThe compounding principle: an outbreak investigation must look beyond the patient to the production environment. Sterility is the demonstrated result of a controlled process, never an assumption attached to a clear solution. A deviation record should identify affected lots, investigation results, corrective action, and the authority for release. Production volume is not evidence that the clean room remains in control. Personnel monitoring and media-fill simulations test whether routine manipulations preserve asepsis under realistic conditions. A positive environmental result requires organism identification, spatial review, product impact assessment, and documented closure. Beyond-use dates depend on formulation, container, storage, and validated process rather than business demand. A deviation record should identify affected lots, investigation results, corrective action, and the authority for release.",
      "frame": "Opens an autoclave printout. \"The cycle ended; validation is another question. Show me fungal taxonomy and the mycoses.\"",
      "q": [
        {
          "q": "Which pharmacy-science explanation best captures Chester Emmons’s work on fungal taxonomy and the mycoses?",
          "o": [
            {
              "t": "Chester Emmons studied environmental fungi and the ecology and taxonomy of systemic mycoses. The batch remains reconstructable. Sterility assurance stays process-based. Compounding fits.",
              "v": "expert",
              "fb": "Correct: the response relies on validated process control, traceable records, and meaningful monitoring."
            },
            {
              "t": "Chester Emmons's compounding work emphasizes the formula. The formula appears correct. Compounding context supports the view. Compounding timing supports this compounding claim.",
              "v": "partial",
              "fb": "This check contributes evidence but cannot compensate for an unvalidated or deviating process."
            },
            {
              "t": "Chester Emmons's compounding work supports a clear particle-free injection as strong evidence that the batch is sterile. Compounding practice makes the compounding view plausible.",
              "v": "wrong",
              "fb": "That statement misinterprets drug purity, microbial control, or what one sample can prove."
            },
            {
              "t": "Chester Emmons's compounding authority supports releasing product after failed monitoring because contamination may affect a limited portion of the batch. The compounding record fits.",
              "v": "danger",
              "fb": "That shortcut allows output targets to override sterility evidence and patient protection."
            }
          ]
        },
        {
          "q": "Which control best supports release of a sterile compounded product?",
          "o": [
            {
              "t": "Use this sterile-production control: compare patient isolates with environmental samples using discriminatory typing. The batch remains reconstructable. Compounding fits.",
              "v": "expert",
              "fb": "Correct: the response relies on validated process control, traceable records, and meaningful monitoring."
            },
            {
              "t": "Test several finished vials and review the formula while treating shortened cycles and positive environmental plates as separate deviations. The compounding record fits.",
              "v": "partial",
              "fb": "This check contributes evidence but cannot compensate for an unvalidated or deviating process."
            },
            {
              "t": "Treat a passing sterility sample as representative of an unevenly contaminated production batch. Sampled vials remain clear. The formula appears correct. Compounding fits.",
              "v": "wrong",
              "fb": "That statement misinterprets drug purity, microbial control, or what one sample can prove."
            },
            {
              "t": "Increase output by shortening validated steps, waive the deviation, and investigate after patients become ill. Production urgency supports the choice. Compounding fits.",
              "v": "danger",
              "fb": "That shortcut allows output targets to override sterility evidence and patient protection."
            }
          ]
        },
        {
          "q": "What rule should govern sterile compounding?",
          "o": [
            {
              "t": "The pharmacy lesson is that an outbreak investigation must look beyond the patient to the production environment.",
              "v": "expert",
              "fb": "Correct: the response relies on validated process control, traceable records, and meaningful monitoring."
            },
            {
              "t": "Use end-product testing to compensate for occasional environmental and process-control failures during urgent production.",
              "v": "partial",
              "fb": "This check contributes evidence but cannot compensate for an unvalidated or deviating process."
            },
            {
              "t": "Treat correct potency and labeling as sufficient evidence that an injectable product is also microbiologically safe.",
              "v": "wrong",
              "fb": "That statement misinterprets drug purity, microbial control, or what one sample can prove."
            },
            {
              "t": "Attribute the illnesses mainly to deliberate poisoning or coincidence rather than a production-control failure.",
              "v": "danger",
              "fb": "That shortcut allows output targets to override sterility evidence and patient protection."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "tech": {
      "cleanroom": "Pharmacy Tech Ruiz brings the retained batch vials into The Clean Room & Autoclave beneath a hypha-marked evidence slip. \"Pharmacy practice is exact work; earn the batch sheet through the day's reading.\"",
      "culture": "Pharmacy Tech Ruiz brings the incubated culture plates into The Environmental-Monitoring Lab beneath a hypha-marked evidence slip. \"Pharmacy practice is exact work; earn the batch sheet through the day's reading.\"",
      "office": "Pharmacy Tech Ruiz brings the release and distribution records into The Owner's Business Office beneath a hypha-marked evidence slip. \"Pharmacy practice is exact work; earn the batch sheet through the day's reading.\""
    },
    "micro": {
      "cleanroom": "The Micro Analyst brings the retained batch vials into The Clean Room & Autoclave beneath a hypha-marked evidence slip. \"The culture file stays with me until your answers show genuine microbiology.\"",
      "culture": "The Micro Analyst brings the incubated culture plates into The Environmental-Monitoring Lab beneath a hypha-marked evidence slip. \"The culture file stays with me until your answers show genuine microbiology.\"",
      "office": "The Micro Analyst brings the release and distribution records into The Owner's Business Office beneath a hypha-marked evidence slip. \"The culture file stays with me until your answers show genuine microbiology.\""
    },
    "clerk": {
      "cleanroom": "The Clerk brings the retained batch vials into The Clean Room & Autoclave beneath a hypha-marked evidence slip. \"Handle the pioneer correctly, and I will release the production correspondence.\"",
      "culture": "The Clerk brings the incubated culture plates into The Environmental-Monitoring Lab beneath a hypha-marked evidence slip. \"Handle the pioneer correctly, and I will release the production correspondence.\"",
      "office": "The Clerk brings the release and distribution records into The Owner's Business Office beneath a hypha-marked evidence slip. \"Handle the pioneer correctly, and I will release the production correspondence.\""
    }
  },
  "story": [
    "<b>The Compounding Room</b> opens inside the Meridian Compounding inquiry, where the visible damage is easier to describe than the chain that produced it.",
    "<b>Pharmacy Tech Ruiz</b>, <b>The Micro Analyst</b>, and <b>The Clerk</b> each control a different slice of the record, and each conversation turns one real pioneer into a way of reading the case.",
    "Some witnesses are drawn toward <b>A chemical impurity entered during inaccurate ingredient compounding.</b>; others settle too quickly on <b>Gram-negative bacteria produced an endotoxin-rich bloodstream outbreak.</b>. Your job is to separate those tempting stories from the harder explanation the evidence supports.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide what the case is really about."
  ],
  "endings": {
    "overclaimWhat": "poison",
    "dismissalWhat": "coincidence",
    "win": {
      "expertTitle": "Mold Across the Batch Line",
      "expert": [
        "Investigator Del Marsh names Guillory — the pharmacy's owner, The Owner's Business Office, and Environmental mold caused fungal contamination across batches. Not A chemical impurity entered during inaccurate ingredient compounding. Not Gram-negative bacteria produced an endotoxin-rich bloodstream outbreak.",
        "The readings distinguish chemical impurity, Gram-negative bacterial contamination, and environmental fungal contamination through potency assays, endotoxin tests, culture speed, microscopy, colony form, and lot distribution."
      ],
      "soundTitle": "A Sound Contamination Finding",
      "sound": [
        "Hypha evidence fixes the trio: Guillory — the pharmacy's owner; The Owner's Business Office; Environmental mold caused fungal contamination across batches.",
        "Culture results identify the contaminant; production responsibility remains less fully documented."
      ],
      "namedTitle": "Correct Contaminant, Limited Chain",
      "named": [
        "Hypha evidence points to Guillory — the pharmacy's owner, The Owner's Business Office, and Environmental mold caused fungal contamination across batches; hypha support remains incomplete.",
        "The fungal finding is correct, but the batch investigation has not gathered enough corroboration."
      ]
    },
    "overclaim": {
      "title": "The Chemical-Impurity Theory",
      "body": [
        "Investigator Del Marsh reports A chemical impurity entered during inaccurate ingredient compounding. Living colonies contradict a purely chemical defect.",
        "A chemical impurity should appear in analytical chemistry or potency testing and need not reproduce in culture. The retained vials instead yield a living organism with matching environmental isolates."
      ]
    },
    "dismissal": {
      "title": "The Gram-Negative Theory",
      "body": [
        "Investigator Del Marsh instead reports Gram-negative bacteria produced an endotoxin-rich bloodstream outbreak. Microscopy and endotoxin results do not fit Gram-negative growth.",
        "Gram-negative contamination often grows rapidly and may produce high endotoxin levels with bacterial morphology. The slow filamentous colonies and low endotoxin pattern point elsewhere."
      ]
    },
    "wrongNames": {
      "title": "Right Contaminant, Wrong Names",
      "body": [
        "Fungal contamination is correctly judged; the wrong actor or office has been selected. Rebuild the batch-release clues."
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A sterile hood and contaminated vials\"><rect x=\"54\" y=\"28\" width=\"250\" height=\"80\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><line x1=\"84\" y1=\"28\" x2=\"84\" y2=\"108\" stroke=\"#e2e2d8\" stroke-width=\"1\"/><line x1=\"114\" y1=\"28\" x2=\"114\" y2=\"108\" stroke=\"#e2e2d8\" stroke-width=\"1\"/><path d=\"M168 44 L192 44 L198 90 L162 90 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M236 44 L260 44 L266 90 L230 90 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><circle cx=\"176\" cy=\"66\" r=\"3\" fill=\"#B3261E\"/><circle cx=\"248\" cy=\"72\" r=\"3\" fill=\"#B3261E\"/><circle cx=\"210\" cy=\"56\" r=\"3\" fill=\"#B3261E\"/><path d=\"M376 32 L566 32 L566 106 L376 106 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.4\"/><path d=\"M398 52 C432 40,476 40,540 54\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/></svg>"
}};
