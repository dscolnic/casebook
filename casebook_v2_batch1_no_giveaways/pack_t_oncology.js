module.exports = { PACK: {
  "id": "t_oncology",
  "title": "The Meredith Clinic Overdose",
  "discipline": "Radiation Physics & Medical Dosimetry",
  "teaser": "Several patients received excessive radiation after machine service. Did planning calculate the wrong monitor units, or did setup shift tissue into the field? An independent dose chain must locate the error.",
  "overclaimTag": "a planning-system dose error",
  "truthTag": "uncalibrated machine output after service",
  "venue": "the Meredith clinic inquiry",
  "agent": {
    "name": "Inspector Tovah Riis",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Radiation & Dosimetry Pioneers",
  "dossierName": "RADIATION & DOSIMETRY PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Meredith clinic inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  "placeNarr": "You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
  "overclaimTease": "Planning and setup errors are familiar explanations for radiation injury; only an independent dose chain can locate the failure.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "clinic",
      "items": [
        {
          "id": "clinic",
          "label": "Dr. Halvard Bre — clinic director"
        },
        {
          "id": "physicist",
          "label": "The chief medical physicist"
        },
        {
          "id": "regulator",
          "label": "The radiation safety regulator"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "office",
      "items": [
        {
          "id": "vault",
          "label": "The Treatment Vault & Machine"
        },
        {
          "id": "planning",
          "label": "The Dosimetry & Planning Room"
        },
        {
          "id": "office",
          "label": "The Clinic Director's Office"
        }
      ]
    },
    "what": {
      "title": "Where did the dose error enter?",
      "truth": "qagap",
      "items": [
        {
          "id": "software",
          "label": "The planning system converted anatomy into the wrong monitor units."
        },
        {
          "id": "freak",
          "label": "Patient setup placed normal tissue inside the intended high-dose field."
        },
        {
          "id": "qagap",
          "label": "Machine output changed after service and was not recalibrated."
        }
      ]
    }
  },
  "PLACES": {
    "vault": {
      "name": "The Treatment Vault & Machine",
      "xy": [
        140,
        90
      ]
    },
    "planning": {
      "name": "The Dosimetry & Planning Room",
      "xy": [
        330,
        240
      ]
    },
    "office": {
      "name": "The Clinic Director's Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "vault",
      "planning"
    ],
    [
      "planning",
      "office"
    ]
  ],
  "CHARACTERS": {
    "therapist": {
      "name": "Therapist Iyla",
      "role": "Radiation therapist",
      "face": "☢",
      "badge": "T",
      "legend": "the treatment vault",
      "hint": "Knows the treatment schedule and can identify the staff and rooms involved with each exposure."
    },
    "dosimetrist": {
      "name": "The Dosimetrist",
      "role": "Clinical dosimetrist",
      "face": "📐",
      "badge": "D",
      "legend": "the planning room",
      "hint": "Maintains planning records and can trace who approved plans and where calculations were reviewed."
    },
    "clerk": {
      "name": "The Clerk",
      "role": "Records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Holds service dates, staffing assignments, and the administrative chain for quality records."
    }
  },
  "TOPICMAP": {
    "vault": {
      "therapist": [
        "rx_rontgen",
        "rx_becquerel"
      ],
      "dosimetrist": [
        "rx_whbragg",
        "rx_coolidge"
      ],
      "clerk": [
        "rx_wideroe",
        "rx_kerst"
      ]
    },
    "planning": {
      "therapist": [
        "rx_johns",
        "rx_rwilson"
      ],
      "dosimetrist": [
        "rx_gray",
        "rx_sievert"
      ],
      "clerk": [
        "rx_failla",
        "rx_quimby"
      ]
    },
    "office": {
      "therapist": [
        "rx_paterson",
        "rx_parker"
      ],
      "dosimetrist": [
        "rx_fricke",
        "rx_cameron"
      ],
      "clerk": [
        "rx_evans",
        "rx_cormack"
      ]
    }
  },
  "TOPICS": {
    "rx_rontgen": {
      "sci": "Wilhelm Rontgen (1845-1923)",
      "topic": "The discovery of X-rays",
      "lede": "Wilhelm Rontgen connected the discovery of X-rays with the quantitative chain between radiation source and tissue.",
      "no": 1,
      "profile": "Today's medical-physics cover note begins with Wilhelm Rontgen and the discovery of X-rays. Wilhelm Röntgen discovered X-rays in 1895 while experimenting with cathode-ray tubes, then produced the famous radiograph of his wife's hand. The invisible radiation passed through soft tissue more readily than bone and immediately suggested both diagnostic and therapeutic uses. The advance gave radiation workers a physical quantity, apparatus, or geometry that could be checked beyond the treatment console.\n\nIonizing radiation can reveal or damage tissue, so every clinical use requires control of energy, geometry, exposure, and dose. Radiation therapy is a measurement chain extending from prescription through imaging, planning, machine calibration, patient setup, delivery, and verification. An error at one link can be repeated accurately by every link that follows. A dosimetric account should specify radiation type, energy, calibration standard, geometry, detector response, and the conversion from reading to absorbed dose.\n\nDose is not the number typed into a console. It is energy deposited in mass, shaped by beam quality, geometry, tissue, time, and calibration factors whose traceability must survive service changes and software updates. Quality assurance uses independent methods because agreement between two calculations built on the same mistaken assumption is not independence. Phantoms, ion chambers, chemical dosimeters, imaging checks, and chart review test different failure paths. The radiation record must keep source or beam state, calibration coefficients, plan version, setup images, delivered fractions, and independent measurements linked.\n\nThe practical lesson is to distrust silent continuity after any source swap, repair, beam-model change, or unusual patient reaction. Recommissioning and trend review protect patients from an error that otherwise looks like normal operation. A strong treatment record links the prescribed target and constraints with measured output, plan version, setup images, delivered fractions, and any deviation. That continuity lets a physicist reconstruct dose rather than guess from symptoms. Cover competence here means separating biological variability from a systematic delivery error. Repeated patterns across patients, fields, machines, or dates are often more informative than the severity of one injury.",
      "frame": "Therapist Iyla aligns a phantom at The Treatment Vault & Machine. \"Give me Wilhelm Rontgen, the detector, and the quantity that reaches the patient.\"",
      "q": [
        {
          "q": "Which dosimetry account most accurately presents Wilhelm Rontgen's contribution to the discovery of X-rays?",
          "o": [
            {
              "t": "Wilhelm Röntgen discovered X-rays in 1895 while experimenting with cathode-ray tubes, then produced the famous radiograph of his wife's hand. Dose review links the plan history to patient geometry. Fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Wilhelm Rontgen's dose work emphasizes the treatment plan and console setting. The console values appear consistent. The plan calculation looks precise. Dose practice makes the dose view plausible. Fits.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Wilhelm Rontgen's dose work is read within dose practice as support for a console setting or reconstructed image as sufficient evidence of the dose delivered to tissue. Dose practice makes the dose view plausible.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Wilhelm Rontgen's authority is invoked in dose practice to justify continuing treatment after a source change without repeating an independent output measurement. Dose timing supports this dose claim. Fits.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        },
        {
          "q": "Which dosimetric rule follows directly from this contribution?",
          "o": [
            {
              "t": "Ionizing radiation can reveal or damage tissue, so every clinical use requires control of energy, geometry, exposure, and dose. The dosimetry ledger stores the dose record. Dose context matters.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Transfer the previous calibration and patient geometry into the new plan, then verify the calculated result without a fresh beam measurement. Dose records fit this dose account. The dose record fits.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Assume attenuation, detector response, and beam output remain stable across energy, field, material, and machine condition. Dose records fit this dose account. Dose timing supports this dose claim.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Let one calculation validate another calculation built from the same untested beam model. The console values appear consistent. The plan calculation looks precise. The dose practice fits.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        },
        {
          "q": "How should medical physicists translate this history into quality assurance?",
          "o": [
            {
              "t": "Cover competence here means separating biological variability from a systematic delivery error. Repeated patterns across patients, fields, machines, or dates are often more informative than the severity of one injury. Dose fits. Dose fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Reduce independent dosimetry and chart review after commissioning once the planning system appears stable. The console values appear consistent. The plan calculation looks precise. Dose practice makes the dose view plausible. Dose fits.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Attribute repeated injuries mainly to software behavior or unusual patient sensitivity rather than a systematic delivery error. Dose records fit this dose account. Dose context supports the view. Dose timing supports this dose claim.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Leave the beam in service and wait for another tissue reaction before repeating calibration. Dose records fit this dose account. Dose context supports the view. Dose practice makes the dose view plausible. Dose timing supports this dose claim.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        }
      ]
    },
    "rx_becquerel": {
      "sci": "Henri Becquerel (1852-1908)",
      "topic": "Natural radioactivity",
      "lede": "Through natural radioactivity, Henri Becquerel made invisible radiation more measurable, calculable, and clinically controllable.",
      "no": 2,
      "profile": "Today's medical-physics cover note begins with Henri Becquerel and natural radioactivity. Henri Becquerel found that uranium salts emitted penetrating radiation without sunlight, establishing natural radioactivity. His accidental skin injury from carrying a radioactive source also became an early warning that invisible radiation could produce biological harm. The advance gave radiation workers a physical quantity, apparatus, or geometry that could be checked beyond the treatment console.\n\nRadiation remains hazardous whether or not it is visible, hot, or sensed by the patient, which makes measurement indispensable. Dose is not the number typed into a console. It is energy deposited in mass, shaped by beam quality, geometry, tissue, time, and calibration factors whose traceability must survive service changes and software updates. A dosimetric account should specify radiation type, energy, calibration standard, geometry, detector response, and the conversion from reading to absorbed dose.\n\nQuality assurance uses independent methods because agreement between two calculations built on the same mistaken assumption is not independence. Phantoms, ion chambers, chemical dosimeters, imaging checks, and chart review test different failure paths. Radiation therapy is a measurement chain extending from prescription through imaging, planning, machine calibration, patient setup, delivery, and verification. An error at one link can be repeated accurately by every link that follows. The radiation record must keep source or beam state, calibration coefficients, plan version, setup images, delivered fractions, and independent measurements linked.\n\nA strong treatment record links the prescribed target and constraints with measured output, plan version, setup images, delivered fractions, and any deviation. That continuity lets a physicist reconstruct dose rather than guess from symptoms. Cover competence here means separating biological variability from a systematic delivery error. Repeated patterns across patients, fields, machines, or dates are often more informative than the severity of one injury. The practical lesson is to distrust silent continuity after any source swap, repair, beam-model change, or unusual patient reaction. Recommissioning and trend review protect patients from an error that otherwise looks like normal operation.",
      "frame": "Therapist Iyla opens a calibration sheet at The Treatment Vault & Machine. \"Trace natural radioactivity from source to measured dose before I release the next page.\"",
      "q": [
        {
          "q": "Which dosimetry account most accurately presents Henri Becquerel's contribution to natural radioactivity?",
          "o": [
            {
              "t": "Henri Becquerel found that uranium salts emitted penetrating radiation without sunlight, establishing natural radioactivity. The therapy chart carries the patient-linked plan history. Dose fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Henri Becquerel's dose work relies on the treatment plan and console setting. The plan calculation looks precise. Dose practice makes the dose view plausible. Dose timing supports this dose claim.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Henri Becquerel's dose work supports a console setting or reconstructed image as sufficient evidence of the dose delivered to tissue. The console values appear consistent. Dose fits. Dose fits.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Henri Becquerel's dose authority supports continuing treatment after a source change without repeating an independent output measurement. The console values appear consistent. Dose fits.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        },
        {
          "q": "Which dosimetric rule follows directly from this contribution?",
          "o": [
            {
              "t": "Radiation remains hazardous whether or not it is visible, hot, or sensed by the patient, which makes measurement indispensable. The dosimetry ledger stores the independent dose record. Dose fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Transfer the previous calibration and patient geometry into the new plan, then verify the calculated result without a fresh beam measurement. The machine history seems stable. The dose practice fits.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Assume attenuation, detector response, and beam output remain stable across energy, field, material, and machine condition. Dose practice makes the dose view plausible. Dose timing supports this dose claim.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Let one calculation validate another calculation built from the same untested beam model. Dose records fit this dose account. Dose context supports the view. Dose timing supports this dose claim.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        },
        {
          "q": "How should medical physicists translate this history into quality assurance?",
          "o": [
            {
              "t": "The practical lesson is to distrust silent continuity after any source swap, repair, beam-model change, or unusual patient reaction. Recommissioning and trend review protect patients from an error that otherwise looks like normal operation. Dose context matters. Dose fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Reduce independent dosimetry and chart review after commissioning once the planning system appears stable. The machine history seems stable. Dose context supports the view. Dose practice makes the dose view plausible. Dose timing supports this dose claim. The dose record fits.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Attribute repeated injuries mainly to software behavior or unusual patient sensitivity rather than a systematic delivery error. The console values appear consistent. The plan calculation looks precise. Dose practice makes the dose view plausible. The dose record fits.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Leave the beam in service and wait for another tissue reaction before repeating calibration. The chart supports the setting. Dose records fit this dose account. Dose context supports the view. Dose practice makes the dose view plausible. Dose timing supports this dose claim.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        }
      ]
    },
    "rx_whbragg": {
      "sci": "William Henry Bragg (1862-1942)",
      "topic": "Ionization & the Bragg peak",
      "lede": "William Henry Bragg's work on ionization & the Bragg peak sharpened the physics behind planned therapeutic dose.",
      "no": 3,
      "profile": "Today's medical-physics cover note begins with William Henry Bragg and ionization & the Bragg peak. William Henry Bragg studied how charged particles lose energy in matter and helped characterize the sharp rise in ionization near the end of their range. The Bragg curve later became central to understanding why protons can concentrate dose at depth. The advance gave radiation workers a physical quantity, apparatus, or geometry that could be checked beyond the treatment console.\n\nDepth-dose behavior depends on particle type and energy; treatment planning must match the physical curve to the intended target. Quality assurance uses independent methods because agreement between two calculations built on the same mistaken assumption is not independence. Phantoms, ion chambers, chemical dosimeters, imaging checks, and chart review test different failure paths. A dosimetric account should specify radiation type, energy, calibration standard, geometry, detector response, and the conversion from reading to absorbed dose.\n\nRadiation therapy is a measurement chain extending from prescription through imaging, planning, machine calibration, patient setup, delivery, and verification. An error at one link can be repeated accurately by every link that follows. Dose is not the number typed into a console. It is energy deposited in mass, shaped by beam quality, geometry, tissue, time, and calibration factors whose traceability must survive service changes and software updates. The radiation record must keep source or beam state, calibration coefficients, plan version, setup images, delivered fractions, and independent measurements linked.\n\nCover competence here means separating biological variability from a systematic delivery error. Repeated patterns across patients, fields, machines, or dates are often more informative than the severity of one injury. The practical lesson is to distrust silent continuity after any source swap, repair, beam-model change, or unusual patient reaction. Recommissioning and trend review protect patients from an error that otherwise looks like normal operation. A strong treatment record links the prescribed target and constraints with measured output, plan version, setup images, delivered fractions, and any deviation.",
      "frame": "The Dosimetrist marks a field edge at The Treatment Vault & Machine. \"Do not confuse the plan with delivery. Explain William Henry Bragg.\"",
      "q": [
        {
          "q": "Which dosimetry account most accurately presents William Henry Bragg's contribution to ionization & the Bragg peak?",
          "o": [
            {
              "t": "William Henry Bragg studied how charged particles lose energy in matter and helped characterize the sharp rise in ionization near the end of their range. The therapy chart carries the dose record. Dose context matters.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "William Henry Bragg's dose work emphasizes the treatment plan and console setting. The console values appear consistent. The plan calculation looks precise. Dose practice makes the dose view plausible. The dose record fits.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "William Henry Bragg's dose work is read within dose practice as support for a console setting or reconstructed image as sufficient evidence of the dose delivered to tissue. Dose records fit this dose account. The dose record fits.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "William Henry Bragg's authority is invoked in dose practice to justify continuing treatment after a source change without repeating an independent output measurement. The console values appear consistent. Dose fits. Fits.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        },
        {
          "q": "Which dosimetric rule follows directly from this contribution?",
          "o": [
            {
              "t": "Depth-dose behavior depends on particle type and energy; treatment planning must match the physical curve to the intended target. The therapy chart carries the dose record. Dose context matters.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Transfer the previous calibration and patient geometry into the new plan, then verify the calculated result without a fresh beam measurement. Dose records fit this dose account. The dose record fits.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Assume attenuation, detector response, and beam output remain stable across energy, field, material, and machine condition. Dose records fit this dose account. Dose timing supports this dose claim.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Let one calculation validate another calculation built from the same untested beam model. The console values appear consistent. The plan calculation looks precise. The dose practice fits.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        },
        {
          "q": "How should medical physicists translate this history into quality assurance?",
          "o": [
            {
              "t": "A strong treatment record links the prescribed target and constraints with measured output, plan version, setup images, delivered fractions, and any deviation. That continuity lets a physicist reconstruct dose rather than guess from symptoms. Dose fits. Dose fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Reduce independent dosimetry and chart review after commissioning once the planning system appears stable. The plan calculation looks precise. Dose context supports the view. Dose practice makes the dose view plausible. Dose timing supports this dose claim. Dose fits.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Attribute repeated injuries mainly to software behavior or unusual patient sensitivity rather than a systematic delivery error. The console values appear consistent. The plan calculation looks precise. Dose practice makes the dose view plausible. The dose record fits.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Leave the beam in service and wait for another tissue reaction before repeating calibration. The chart supports the setting. Dose records fit this dose account. Dose context supports the view. Dose practice makes the dose view plausible. Dose timing supports this dose claim.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        }
      ]
    },
    "rx_coolidge": {
      "sci": "William D. Coolidge (1873-1975)",
      "topic": "The X-ray tube",
      "lede": "William D. Coolidge connected the X-ray tube with the quantitative chain between radiation source and tissue.",
      "no": 4,
      "profile": "Today's medical-physics cover note begins with William D. Coolidge and the X-ray tube. William D. Coolidge developed the hot-cathode, high-vacuum X-ray tube, giving operators much steadier control over tube current and radiation output. The Coolidge tube replaced less predictable gas tubes and became a foundation of diagnostic and therapeutic X-ray equipment. The advance gave radiation workers a physical quantity, apparatus, or geometry that could be checked beyond the treatment console.\n\nStable hardware makes calibration possible, but output still has to be measured after installation, repair, or component change. Radiation therapy is a measurement chain extending from prescription through imaging, planning, machine calibration, patient setup, delivery, and verification. An error at one link can be repeated accurately by every link that follows. A dosimetric account should specify radiation type, energy, calibration standard, geometry, detector response, and the conversion from reading to absorbed dose.\n\nDose is not the number typed into a console. It is energy deposited in mass, shaped by beam quality, geometry, tissue, time, and calibration factors whose traceability must survive service changes and software updates. Quality assurance uses independent methods because agreement between two calculations built on the same mistaken assumption is not independence. Phantoms, ion chambers, chemical dosimeters, imaging checks, and chart review test different failure paths. The radiation record must keep source or beam state, calibration coefficients, plan version, setup images, delivered fractions, and independent measurements linked.\n\nThe practical lesson is to distrust silent continuity after any source swap, repair, beam-model change, or unusual patient reaction. Recommissioning and trend review protect patients from an error that otherwise looks like normal operation. A strong treatment record links the prescribed target and constraints with measured output, plan version, setup images, delivered fractions, and any deviation. That continuity lets a physicist reconstruct dose rather than guess from symptoms. Cover competence here means separating biological variability from a systematic delivery error. Repeated patterns across patients, fields, machines, or dates are often more informative than the severity of one injury.",
      "frame": "The Dosimetrist aligns a phantom at The Treatment Vault & Machine. \"Give me William D. Coolidge, the detector, and the quantity that reaches the patient.\"",
      "q": [
        {
          "q": "Which dosimetry account most accurately presents William D. Coolidge's contribution to the X-ray tube?",
          "o": [
            {
              "t": "William D. Radiation evidence keeps the dose record traceable to calibration. The therapy chart carries the dose record. Dose review links the machine-specific dose record to patient geometry. Dose fits. Dose fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "William D. Coolidge's dose work emphasizes the treatment plan and console setting. The console values appear consistent. The machine history seems stable. Dose practice makes the dose view plausible. Dose context matters.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "William D. Coolidge's dose work is read within dose practice as support for a console setting or reconstructed image as sufficient evidence of the dose delivered to tissue. The plan calculation looks precise. Dose fits.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "William D. Coolidge's authority is invoked in dose practice to justify continuing treatment after a source change without repeating an independent output measurement. The console values appear consistent. Dose fits.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        },
        {
          "q": "Which dosimetric rule follows directly from this contribution?",
          "o": [
            {
              "t": "Stable hardware makes calibration possible, but output still has to be measured after installation, repair, or component change. The therapy chart carries the plan history. Dose context matters.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Transfer the previous calibration and patient geometry into the new plan, then verify the calculated result without a fresh beam measurement. Dose records fit this dose account. The dose record fits.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Assume attenuation, detector response, and beam output remain stable across energy, field, material, and machine condition. Dose records fit this dose account. Dose timing supports this dose claim.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Let one calculation validate another calculation built from the same untested beam model. The console values appear consistent. The plan calculation looks precise. The dose practice fits.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        },
        {
          "q": "How should medical physicists translate this history into quality assurance?",
          "o": [
            {
              "t": "Cover competence here means separating biological variability from a systematic delivery error. Repeated patterns across patients, fields, machines, or dates are often more informative than the severity of one injury. Dose fits. Dose fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Reduce independent dosimetry and chart review after commissioning once the planning system appears stable. The console values appear consistent. The plan calculation looks precise. Dose practice makes the dose view plausible. Dose fits.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Attribute repeated injuries mainly to software behavior or unusual patient sensitivity rather than a systematic delivery error. Dose records fit this dose account. Dose context supports the view. Dose timing supports this dose claim.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Leave the beam in service and wait for another tissue reaction before repeating calibration. Dose records fit this dose account. Dose context supports the view. Dose practice makes the dose view plausible. Dose timing supports this dose claim.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        }
      ]
    },
    "rx_wideroe": {
      "sci": "Rolf Wideroe (1902-1996)",
      "topic": "The linear accelerator concept",
      "lede": "Through the linear accelerator concept, Rolf Wideroe made invisible radiation more measurable, calculable, and clinically controllable.",
      "no": 5,
      "profile": "Today's medical-physics cover note begins with Rolf Wideroe and the linear accelerator concept. Rolf Widerøe proposed a linear accelerator that used timed electric fields to accelerate charged particles through a sequence of drift tubes. His concept showed how high energies could be reached without relying on a single enormous voltage. The advance gave radiation workers a physical quantity, apparatus, or geometry that could be checked beyond the treatment console.\n\nAccelerator output is the product of synchronized subsystems, so timing, energy, steering, and dose monitoring must agree. Dose is not the number typed into a console. It is energy deposited in mass, shaped by beam quality, geometry, tissue, time, and calibration factors whose traceability must survive service changes and software updates. A dosimetric account should specify radiation type, energy, calibration standard, geometry, detector response, and the conversion from reading to absorbed dose.\n\nQuality assurance uses independent methods because agreement between two calculations built on the same mistaken assumption is not independence. Phantoms, ion chambers, chemical dosimeters, imaging checks, and chart review test different failure paths. Radiation therapy is a measurement chain extending from prescription through imaging, planning, machine calibration, patient setup, delivery, and verification. An error at one link can be repeated accurately by every link that follows. The radiation record must keep source or beam state, calibration coefficients, plan version, setup images, delivered fractions, and independent measurements linked.\n\nA strong treatment record links the prescribed target and constraints with measured output, plan version, setup images, delivered fractions, and any deviation. That continuity lets a physicist reconstruct dose rather than guess from symptoms. Cover competence here means separating biological variability from a systematic delivery error. Repeated patterns across patients, fields, machines, or dates are often more informative than the severity of one injury. The practical lesson is to distrust silent continuity after any source swap, repair, beam-model change, or unusual patient reaction. Recommissioning and trend review protect patients from an error that otherwise looks like normal operation.",
      "frame": "The Clerk opens a calibration sheet at The Treatment Vault & Machine. \"Trace the linear accelerator concept from source to measured dose before I release the next page.\"",
      "q": [
        {
          "q": "Which dosimetry account most accurately presents Rolf Wideroe's contribution to the linear accelerator concept?",
          "o": [
            {
              "t": "Rolf Widerøe proposed a linear accelerator that used timed electric fields to accelerate charged particles through a sequence of drift tubes. The therapy chart carries the beam measurement. Dose context matters.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Rolf Wideroe's dose work emphasizes the treatment plan and console setting. The console values appear consistent. The plan calculation looks precise. Dose practice makes the dose view plausible. The dose record fits.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Rolf Wideroe's dose work is read within dose practice as support for a console setting or reconstructed image as sufficient evidence of the dose delivered to tissue. Dose records fit this dose account. The dose record fits.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Rolf Wideroe's authority is invoked in dose practice to justify continuing treatment after a source change without repeating an independent output measurement. The console values appear consistent. Dose fits. Fits.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        },
        {
          "q": "Which dosimetric rule follows directly from this contribution?",
          "o": [
            {
              "t": "Accelerator output is the product of synchronized subsystems, so timing, energy, steering, and dose monitoring must agree. The dosimetry ledger stores the machine-specific dose record. Dose fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Transfer the previous calibration and patient geometry into the new plan, then verify the calculated result without a fresh beam measurement. The machine history seems stable. The dose practice fits.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Assume attenuation, detector response, and beam output remain stable across energy, field, material, and machine condition. Dose practice makes the dose view plausible. Dose timing supports this dose claim.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Let one calculation validate another calculation built from the same untested beam model. Dose records fit this dose account. Dose context supports the view. Dose timing supports this dose claim.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        },
        {
          "q": "How should medical physicists translate this history into quality assurance?",
          "o": [
            {
              "t": "The practical lesson is to distrust silent continuity after any source swap, repair, beam-model change, or unusual patient reaction. Recommissioning and trend review protect patients from an error that otherwise looks like normal operation. Dose context matters. Dose fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Reduce independent dosimetry and chart review after commissioning once the planning system appears stable. The machine history seems stable. Dose context supports the view. Dose practice makes the dose view plausible. Dose timing supports this dose claim. The dose record fits.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Attribute repeated injuries mainly to software behavior or unusual patient sensitivity rather than a systematic delivery error. The console values appear consistent. The plan calculation looks precise. Dose practice makes the dose view plausible. The dose record fits.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Leave the beam in service and wait for another tissue reaction before repeating calibration. The chart supports the setting. Dose records fit this dose account. Dose context supports the view. Dose practice makes the dose view plausible. Dose timing supports this dose claim.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        }
      ]
    },
    "rx_kerst": {
      "sci": "Donald Kerst (1911-1993)",
      "topic": "The betatron & medical radiation",
      "lede": "Donald Kerst's work on the betatron & medical radiation sharpened the physics behind planned therapeutic dose.",
      "no": 6,
      "profile": "Today's medical-physics cover note begins with Donald Kerst and the betatron & medical radiation. Donald Kerst built the first successful betatron in 1940, accelerating electrons in a circular path with a changing magnetic field. Betatrons produced energetic X-rays and electrons for research and cancer treatment before modern medical linear accelerators became dominant. The advance gave radiation workers a physical quantity, apparatus, or geometry that could be checked beyond the treatment console.\n\nBeam-producing machines require independent checks of energy, field shape, output, and interlocks rather than trust in the control setting. Quality assurance uses independent methods because agreement between two calculations built on the same mistaken assumption is not independence. Phantoms, ion chambers, chemical dosimeters, imaging checks, and chart review test different failure paths. A dosimetric account should specify radiation type, energy, calibration standard, geometry, detector response, and the conversion from reading to absorbed dose.\n\nRadiation therapy is a measurement chain extending from prescription through imaging, planning, machine calibration, patient setup, delivery, and verification. An error at one link can be repeated accurately by every link that follows. Dose is not the number typed into a console. It is energy deposited in mass, shaped by beam quality, geometry, tissue, time, and calibration factors whose traceability must survive service changes and software updates. The radiation record must keep source or beam state, calibration coefficients, plan version, setup images, delivered fractions, and independent measurements linked.\n\nCover competence here means separating biological variability from a systematic delivery error. Repeated patterns across patients, fields, machines, or dates are often more informative than the severity of one injury. The practical lesson is to distrust silent continuity after any source swap, repair, beam-model change, or unusual patient reaction. Recommissioning and trend review protect patients from an error that otherwise looks like normal operation. A strong treatment record links the prescribed target and constraints with measured output, plan version, setup images, delivered fractions, and any deviation. That continuity lets a physicist reconstruct dose rather than guess from symptoms.",
      "frame": "The Clerk marks a field edge at The Treatment Vault & Machine. \"Do not confuse the plan with delivery. Explain Donald Kerst.\"",
      "q": [
        {
          "q": "Which dosimetry account most accurately presents Donald Kerst's contribution to the betatron & medical radiation?",
          "o": [
            {
              "t": "Donald Kerst built the first successful betatron in 1940, accelerating electrons in a circular path with a changing magnetic field. Dose review links the beam measurement to patient geometry.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Donald Kerst's dose work emphasizes the treatment plan and console setting. The console values appear consistent. The plan calculation looks precise. Dose practice makes the dose view plausible.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Donald Kerst's dose work is read within dose practice as support for a console setting or reconstructed image as sufficient evidence of the dose delivered to tissue. Dose timing supports this dose claim.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Donald Kerst's authority is invoked in dose practice to justify continuing treatment after a source change without repeating an independent output measurement. Dose records fit this dose account.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        },
        {
          "q": "Which dosimetric rule follows directly from this contribution?",
          "o": [
            {
              "t": "Beam-producing machines require independent checks of energy, field shape, output, and interlocks rather than trust in the control setting. The therapy chart carries the dose record. Dose fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Transfer the previous calibration and patient geometry into the new plan, then verify the calculated result without a fresh beam measurement. Dose practice makes the dose view plausible.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Assume attenuation, detector response, and beam output remain stable across energy, field, material, and machine condition. Dose context supports the view. Dose timing supports this dose claim.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Let one calculation validate another calculation built from the same untested beam model. Dose records fit this dose account. Dose context supports the view. Dose timing supports this dose claim.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        },
        {
          "q": "How should medical physicists translate this history into quality assurance?",
          "o": [
            {
              "t": "A strong treatment record links the prescribed target and constraints with measured output, plan version, setup images, delivered fractions, and any deviation. That continuity lets a physicist reconstruct dose rather than guess from symptoms. Dose fits. Dose fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Reduce independent dosimetry and chart review after commissioning once the planning system appears stable. The plan calculation looks precise. Dose context supports the view. Dose practice makes the dose view plausible. Dose timing supports this dose claim. Dose fits.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Attribute repeated injuries mainly to software behavior or unusual patient sensitivity rather than a systematic delivery error. The console values appear consistent. The plan calculation looks precise. Dose practice makes the dose view plausible. The dose record fits.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Leave the beam in service and wait for another tissue reaction before repeating calibration. The chart supports the setting. Dose records fit this dose account. Dose context supports the view. Dose practice makes the dose view plausible. Dose timing supports this dose claim.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        }
      ]
    },
    "rx_johns": {
      "sci": "Harold E. Johns (1915-1998)",
      "topic": "Cobalt-60 radiotherapy & medical physics",
      "lede": "Harold E. Johns connected cobalt-60 radiotherapy & medical physics with the quantitative chain between radiation source and tissue.",
      "no": 7,
      "profile": "Today's medical-physics cover note begins with Harold E. Johns and cobalt-60 radiotherapy & medical physics. Harold E. Johns led the development and clinical introduction of cobalt-60 teletherapy in Canada. Its penetrating gamma rays allowed treatment of deeper tumors, while the decaying source demanded careful calibration and radiation protection. The advance gave radiation workers a physical quantity, apparatus, or geometry that could be checked beyond the treatment console.\n\nA source's strength changes with time, so prescribed dose depends on current measurement, not an old machine label. Radiation therapy is a measurement chain extending from prescription through imaging, planning, machine calibration, patient setup, delivery, and verification. An error at one link can be repeated accurately by every link that follows. A dosimetric account should specify radiation type, energy, calibration standard, geometry, detector response, and the conversion from reading to absorbed dose.\n\nDose is not the number typed into a console. It is energy deposited in mass, shaped by beam quality, geometry, tissue, time, and calibration factors whose traceability must survive service changes and software updates. Quality assurance uses independent methods because agreement between two calculations built on the same mistaken assumption is not independence. Phantoms, ion chambers, chemical dosimeters, imaging checks, and chart review test different failure paths. The radiation record must keep source or beam state, calibration coefficients, plan version, setup images, delivered fractions, and independent measurements linked.\n\nThe practical lesson is to distrust silent continuity after any source swap, repair, beam-model change, or unusual patient reaction. Recommissioning and trend review protect patients from an error that otherwise looks like normal operation. A strong treatment record links the prescribed target and constraints with measured output, plan version, setup images, delivered fractions, and any deviation. That continuity lets a physicist reconstruct dose rather than guess from symptoms. Cover competence here means separating biological variability from a systematic delivery error. Repeated patterns across patients, fields, machines, or dates are often more informative than the severity of one injury.",
      "frame": "Therapist Iyla aligns a phantom at The Dosimetry & Planning Room. \"Give me Harold E. Johns, the detector, and the quantity that reaches the patient.\"",
      "q": [
        {
          "q": "Which dosimetry account most accurately presents Harold E. Johns's contribution to cobalt-60 radiotherapy & medical physics?",
          "o": [
            {
              "t": "Harold E. Radiation evidence keeps the raw plan history traceable to calibration. The therapy chart carries the raw plan history. Radiation evidence keeps the machine-specific plan history traceable to calibration. Dose fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Harold E. Johns's dose work emphasizes the treatment plan and console setting. The machine history seems stable. Dose context supports the view. Dose practice makes the dose view plausible. Dose timing supports this dose claim.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Harold E. Johns's dose work supports a console setting or reconstructed image as sufficient evidence of the dose delivered to tissue. The console values appear consistent. The plan calculation looks precise. Dose fits.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Harold E. Johns's dose authority supports continuing treatment after a source change without repeating an independent output measurement. The console values appear consistent. Dose practice makes the dose view plausible.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        },
        {
          "q": "Which dosimetric rule follows directly from this contribution?",
          "o": [
            {
              "t": "A source's strength changes with time, so prescribed dose depends on current measurement, not an old machine label. The dosimetry ledger stores the independent dose record. Dose context matters.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Transfer the previous calibration and patient geometry into the new plan, then verify the calculated result without a fresh beam measurement. Dose records fit this dose account. The dose record fits.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Assume attenuation, detector response, and beam output remain stable across energy, field, material, and machine condition. Dose records fit this dose account. Dose timing supports this dose claim.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Let one calculation validate another calculation built from the same untested beam model. The console values appear consistent. The plan calculation looks precise. The dose practice fits.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        },
        {
          "q": "How should medical physicists translate this history into quality assurance?",
          "o": [
            {
              "t": "Cover competence here means separating biological variability from a systematic delivery error. Repeated patterns across patients, fields, machines, or dates are often more informative than the severity of one injury. Dose fits. Dose fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Reduce independent dosimetry and chart review after commissioning once the planning system appears stable. The console values appear consistent. The plan calculation looks precise. Dose practice makes the dose view plausible. Dose fits.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Attribute repeated injuries mainly to software behavior or unusual patient sensitivity rather than a systematic delivery error. Dose records fit this dose account. Dose context supports the view. Dose timing supports this dose claim.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Leave the beam in service and wait for another tissue reaction before repeating calibration. Dose records fit this dose account. Dose context supports the view. Dose practice makes the dose view plausible. Dose timing supports this dose claim.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        }
      ]
    },
    "rx_rwilson": {
      "sci": "Robert R. Wilson (1914-2000)",
      "topic": "Proton therapy & the Bragg peak",
      "lede": "Through proton therapy & the Bragg peak, Robert R. Wilson made invisible radiation more measurable, calculable, and clinically controllable.",
      "no": 8,
      "profile": "Today's medical-physics cover note begins with Robert R. Wilson and proton therapy & the Bragg peak. Robert R. Wilson proposed using protons for cancer therapy in 1946, emphasizing the Bragg peak's ability to deposit high dose near the end of the particle range. He connected accelerator physics with a clinical strategy for sparing tissue beyond the target. The advance gave radiation workers a physical quantity, apparatus, or geometry that could be checked beyond the treatment console.\n\nPrecision at depth requires accurate range calculation, imaging, patient setup, and verification because small errors can move the high-dose region. Dose is not the number typed into a console. It is energy deposited in mass, shaped by beam quality, geometry, tissue, time, and calibration factors whose traceability must survive service changes and software updates. A dosimetric account should specify radiation type, energy, calibration standard, geometry, detector response, and the conversion from reading to absorbed dose.\n\nQuality assurance uses independent methods because agreement between two calculations built on the same mistaken assumption is not independence. Phantoms, ion chambers, chemical dosimeters, imaging checks, and chart review test different failure paths. Radiation therapy is a measurement chain extending from prescription through imaging, planning, machine calibration, patient setup, delivery, and verification. An error at one link can be repeated accurately by every link that follows. The radiation record must keep source or beam state, calibration coefficients, plan version, setup images, delivered fractions, and independent measurements linked.\n\nA strong treatment record links the prescribed target and constraints with measured output, plan version, setup images, delivered fractions, and any deviation. That continuity lets a physicist reconstruct dose rather than guess from symptoms. Cover competence here means separating biological variability from a systematic delivery error. Repeated patterns across patients, fields, machines, or dates are often more informative than the severity of one injury. The practical lesson is to distrust silent continuity after any source swap, repair, beam-model change, or unusual patient reaction.",
      "frame": "Therapist Iyla opens a calibration sheet at The Dosimetry & Planning Room. \"Trace proton therapy & the Bragg peak from source to measured dose before I release the next page.\"",
      "q": [
        {
          "q": "Which dosimetry account most accurately presents Robert R. Wilson's contribution to proton therapy & the Bragg peak?",
          "o": [
            {
              "t": "Robert R. Medical physicists audit the dose record against treatment delivery. Radiation evidence keeps the dose record traceable to calibration. The dosimetry ledger stores the raw dose record.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Robert R. Wilson's dose work emphasizes the treatment plan and console setting. The console values appear consistent. The plan calculation looks precise. Dose practice makes the dose view plausible.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Robert R. Wilson's dose work is read within dose practice as support for a console setting or reconstructed image as sufficient evidence of the dose delivered to tissue. Dose records fit this dose account.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Robert R. Wilson's authority is invoked in dose practice to justify continuing treatment after a source change without repeating an independent output measurement. Dose records fit this dose account.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        },
        {
          "q": "Which dosimetric rule follows directly from this contribution?",
          "o": [
            {
              "t": "Precision at depth requires accurate range calculation, imaging, patient setup, and verification because small errors can move the high-dose region. The therapy chart carries the dose record. Dose fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Transfer the previous calibration and patient geometry into the new plan, then verify the calculated result without a fresh beam measurement. The console values appear consistent. The dose practice fits.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Assume attenuation, detector response, and beam output remain stable across energy, field, material, and machine condition. The console values appear consistent. Dose practice makes the dose view plausible.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Let one calculation validate another calculation built from the same untested beam model. The machine history seems stable. Dose practice makes the dose view plausible. Dose timing supports this dose claim.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        },
        {
          "q": "How should medical physicists translate this history into quality assurance?",
          "o": [
            {
              "t": "The practical lesson is to distrust silent continuity after any source swap, repair, beam-model change, or unusual patient reaction. Recommissioning and trend review protect patients from an error that otherwise looks like normal operation. Dose context matters. Dose fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Reduce independent dosimetry and chart review after commissioning once the planning system appears stable. The machine history seems stable. Dose context supports the view. Dose practice makes the dose view plausible. Dose timing supports this dose claim. The dose record fits.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Attribute repeated injuries mainly to software behavior or unusual patient sensitivity rather than a systematic delivery error. The console values appear consistent. The plan calculation looks precise. Dose practice makes the dose view plausible. The dose record fits.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Leave the beam in service and wait for another tissue reaction before repeating calibration. The chart supports the setting. Dose records fit this dose account. Dose context supports the view. Dose practice makes the dose view plausible. Dose timing supports this dose claim.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        }
      ]
    },
    "rx_gray": {
      "sci": "Louis Harold Gray (1905-1965)",
      "topic": "The gray & absorbed dose",
      "lede": "Louis Harold Gray's work on the gray & absorbed dose sharpened the physics behind planned therapeutic dose.",
      "no": 9,
      "profile": "Today's medical-physics cover note begins with Louis Harold Gray and the gray & absorbed dose. Louis Harold Gray investigated how radiation energy absorbed in tissue relates to biological effect. The SI unit of absorbed dose, the gray, equals one joule of ionizing-radiation energy deposited per kilogram of matter. The advance gave radiation workers a physical quantity, apparatus, or geometry that could be checked beyond the treatment console.\n\nAbsorbed dose is an energy-per-mass quantity, and a treatment prescription is meaningful only when the measurement chain is traceable. Quality assurance uses independent methods because agreement between two calculations built on the same mistaken assumption is not independence. Phantoms, ion chambers, chemical dosimeters, imaging checks, and chart review test different failure paths. A dosimetric account should specify radiation type, energy, calibration standard, geometry, detector response, and the conversion from reading to absorbed dose.\n\nRadiation therapy is a measurement chain extending from prescription through imaging, planning, machine calibration, patient setup, delivery, and verification. An error at one link can be repeated accurately by every link that follows. Dose is not the number typed into a console. It is energy deposited in mass, shaped by beam quality, geometry, tissue, time, and calibration factors whose traceability must survive service changes and software updates. The radiation record must keep source or beam state, calibration coefficients, plan version, setup images, delivered fractions, and independent measurements linked.\n\nCover competence here means separating biological variability from a systematic delivery error. Repeated patterns across patients, fields, machines, or dates are often more informative than the severity of one injury. The practical lesson is to distrust silent continuity after any source swap, repair, beam-model change, or unusual patient reaction. Recommissioning and trend review protect patients from an error that otherwise looks like normal operation. A strong treatment record links the prescribed target and constraints with measured output, plan version, setup images, delivered fractions, and any deviation. That continuity lets a physicist reconstruct dose rather than guess from symptoms.",
      "frame": "The Dosimetrist marks a field edge at The Dosimetry & Planning Room. \"Do not confuse the plan with delivery. Explain Louis Harold Gray.\"",
      "q": [
        {
          "q": "Which dosimetry account most accurately presents Louis Harold Gray's contribution to the gray & absorbed dose?",
          "o": [
            {
              "t": "Louis Harold Gray investigated how radiation energy absorbed in tissue relates to biological effect. Radiation evidence keeps the patient-linked calibration check traceable to calibration. Fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Louis Harold Gray's dose work emphasizes the treatment plan and console setting. The plan calculation looks precise. The machine history seems stable. Dose practice makes the dose view plausible.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Louis Harold Gray's dose work is read within dose practice as support for a console setting or reconstructed image as sufficient evidence of the dose delivered to tissue. The chart supports the setting.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Louis Harold Gray's dose authority supports continuing treatment after a source change without repeating an independent output measurement. The console values appear consistent. The dose record fits.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        },
        {
          "q": "Which dosimetric rule follows directly from this contribution?",
          "o": [
            {
              "t": "Absorbed dose is an energy-per-mass quantity, and a treatment prescription is meaningful only when the measurement chain is traceable. The therapy chart carries the dose record. Dose fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Transfer the previous calibration and patient geometry into the new plan, then verify the calculated result without a fresh beam measurement. Dose records fit this dose account. The dose record fits.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Assume attenuation, detector response, and beam output remain stable across energy, field, material, and machine condition. Dose records fit this dose account. Dose timing supports this dose claim.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Let one calculation validate another calculation built from the same untested beam model. Dose records fit this dose account. Dose context supports the view. Dose timing supports this dose claim.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        },
        {
          "q": "How should medical physicists translate this history into quality assurance?",
          "o": [
            {
              "t": "A strong treatment record links the prescribed target and constraints with measured output, plan version, setup images, delivered fractions, and any deviation. That continuity lets a physicist reconstruct dose rather than guess from symptoms. Dose fits. Dose fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Reduce independent dosimetry and chart review after commissioning once the planning system appears stable. The plan calculation looks precise. Dose context supports the view. Dose practice makes the dose view plausible. Dose timing supports this dose claim. Dose fits.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Attribute repeated injuries mainly to software behavior or unusual patient sensitivity rather than a systematic delivery error. The console values appear consistent. The plan calculation looks precise. Dose practice makes the dose view plausible. The dose record fits.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Leave the beam in service and wait for another tissue reaction before repeating calibration. The chart supports the setting. Dose records fit this dose account. Dose context supports the view. Dose practice makes the dose view plausible. Dose timing supports this dose claim.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        }
      ]
    },
    "rx_sievert": {
      "sci": "Rolf Sievert (1896-1966)",
      "topic": "Dose equivalent & radiation protection",
      "lede": "Rolf Sievert connected dose equivalent & radiation protection with the quantitative chain between radiation source and tissue.",
      "no": 10,
      "profile": "Today's medical-physics cover note begins with Rolf Sievert and dose equivalent & radiation protection. Rolf Sievert developed instruments and methods for measuring radiation exposure and helped build international standards for protection. The sievert, used for equivalent and effective dose, incorporates the differing biological significance of radiation type and tissue exposure. The advance gave radiation workers a physical quantity, apparatus, or geometry that could be checked beyond the treatment console.\n\nProtection quantities and treatment dose answer different questions, so units and weighting assumptions must never be interchanged casually. Radiation therapy is a measurement chain extending from prescription through imaging, planning, machine calibration, patient setup, delivery, and verification. An error at one link can be repeated accurately by every link that follows. A dosimetric account should specify radiation type, energy, calibration standard, geometry, detector response, and the conversion from reading to absorbed dose.\n\nDose is not the number typed into a console. It is energy deposited in mass, shaped by beam quality, geometry, tissue, time, and calibration factors whose traceability must survive service changes and software updates. Quality assurance uses independent methods because agreement between two calculations built on the same mistaken assumption is not independence. Phantoms, ion chambers, chemical dosimeters, imaging checks, and chart review test different failure paths. The radiation record must keep source or beam state, calibration coefficients, plan version, setup images, delivered fractions, and independent measurements linked.\n\nThe practical lesson is to distrust silent continuity after any source swap, repair, beam-model change, or unusual patient reaction. Recommissioning and trend review protect patients from an error that otherwise looks like normal operation. A strong treatment record links the prescribed target and constraints with measured output, plan version, setup images, delivered fractions, and any deviation. That continuity lets a physicist reconstruct dose rather than guess from symptoms. Cover competence here means separating biological variability from a systematic delivery error. Repeated patterns across patients, fields, machines, or dates are often more informative than the severity of one injury.",
      "frame": "The Dosimetrist aligns a phantom at The Dosimetry & Planning Room. \"Give me Rolf Sievert, the detector, and the quantity that reaches the patient.\"",
      "q": [
        {
          "q": "Which dosimetry account most accurately presents Rolf Sievert's contribution to dose equivalent & radiation protection?",
          "o": [
            {
              "t": "Rolf Sievert developed instruments and methods for measuring radiation exposure and helped build international standards for protection. The dosimetry ledger stores the geometrically verified beam measurement. Dose fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Rolf Sievert's dose work emphasizes the treatment plan and console setting. The machine history seems stable. Dose records fit this dose account. Dose practice makes the dose view plausible. Dose timing supports this dose claim.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Rolf Sievert's dose work supports a console setting or reconstructed image as sufficient evidence of the dose delivered to tissue. The console values appear consistent. The plan calculation looks precise. Dose fits. Dose fits.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Rolf Sievert's dose authority supports continuing treatment after a source change without repeating an independent output measurement. The plan calculation looks precise. Dose practice makes the dose view plausible. Dose fits.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        },
        {
          "q": "Which dosimetric rule follows directly from this contribution?",
          "o": [
            {
              "t": "Protection quantities and treatment dose answer different questions, so units and weighting assumptions must never be interchanged casually. The therapy chart carries the dose record.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Transfer the previous calibration and patient geometry into the new plan, then verify the calculated result without a fresh beam measurement. The machine history seems stable. Dose fits.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Assume attenuation, detector response, and beam output remain stable across energy, field, material, and machine condition. Dose context supports the view. Dose timing supports this dose claim.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Let one calculation validate another calculation built from the same untested beam model. Dose records fit this dose account. Dose context supports the view. Dose timing supports this dose claim.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        },
        {
          "q": "How should medical physicists translate this history into quality assurance?",
          "o": [
            {
              "t": "Cover competence here means separating biological variability from a systematic delivery error. Repeated patterns across patients, fields, machines, or dates are often more informative than the severity of one injury. Dose fits. Dose fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Reduce independent dosimetry and chart review after commissioning once the planning system appears stable. The console values appear consistent. The plan calculation looks precise. Dose practice makes the dose view plausible. Dose fits.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Attribute repeated injuries mainly to software behavior or unusual patient sensitivity rather than a systematic delivery error. Dose records fit this dose account. Dose context supports the view. Dose timing supports this dose claim.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Leave the beam in service and wait for another tissue reaction before repeating calibration. Dose records fit this dose account. Dose context supports the view. Dose practice makes the dose view plausible. Dose timing supports this dose claim.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        }
      ]
    },
    "rx_failla": {
      "sci": "Gioacchino Failla (1891-1961)",
      "topic": "Radiation dosimetry",
      "lede": "Through radiation dosimetry, Gioacchino Failla made invisible radiation more measurable, calculable, and clinically controllable.",
      "no": 11,
      "profile": "Today's medical-physics cover note begins with Gioacchino Failla and radiation dosimetry. Gioacchino Failla built a major program in radiation biophysics and dosimetry, improving ionization measurements and linking physical exposure to biological consequences. He helped establish medical physics as a discipline responsible for quantifying radiation used in medicine. The advance gave radiation workers a physical quantity, apparatus, or geometry that could be checked beyond the treatment console.\n\nClinical radiation needs physicists who independently measure the beam and translate instrument readings into patient dose. Dose is not the number typed into a console. It is energy deposited in mass, shaped by beam quality, geometry, tissue, time, and calibration factors whose traceability must survive service changes and software updates. A dosimetric account should specify radiation type, energy, calibration standard, geometry, detector response, and the conversion from reading to absorbed dose.\n\nQuality assurance uses independent methods because agreement between two calculations built on the same mistaken assumption is not independence. Phantoms, ion chambers, chemical dosimeters, imaging checks, and chart review test different failure paths. Radiation therapy is a measurement chain extending from prescription through imaging, planning, machine calibration, patient setup, delivery, and verification. An error at one link can be repeated accurately by every link that follows. The radiation record must keep source or beam state, calibration coefficients, plan version, setup images, delivered fractions, and independent measurements linked.\n\nFailla's dosimetry work makes independent output calibration the decisive test. An ionization chamber in a known phantom measures absorbed dose from the machine without relying on the treatment plan or patient setup. If output changes after service or a source adjustment, every correct monitor-unit command can deliver the wrong physical dose. A constant excess reproduced in phantom measurements, beginning on the service date, identifies calibration failure rather than planning mathematics or geometry.",
      "frame": "The Clerk opens a calibration sheet at The Dosimetry & Planning Room. \"Trace radiation dosimetry from source to measured dose before I release the next page.\"",
      "q": [
        {
          "q": "Which dosimetry account most accurately presents Gioacchino Failla's contribution to radiation dosimetry?",
          "o": [
            {
              "t": "Gioacchino Failla built a major program in radiation biophysics and dosimetry, improving ionization measurements and linking physical exposure to biological consequences. The therapy chart carries the plan history. Dose fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Gioacchino Failla's dose work emphasizes the treatment plan and console setting. The machine history seems stable. Dose records fit this dose account. Dose practice makes the dose view plausible. Dose timing supports this dose claim.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Gioacchino Failla's dose work supports a console setting or reconstructed image as sufficient evidence of the dose delivered to tissue. The console values appear consistent. The plan calculation looks precise. Dose fits. Dose fits.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Gioacchino Failla's dose authority supports continuing treatment after a source change without repeating an independent output measurement. The plan calculation looks precise. Dose practice makes the dose view plausible. Dose fits.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        },
        {
          "q": "Which dosimetric rule follows directly from this contribution?",
          "o": [
            {
              "t": "Clinical radiation needs physicists who independently measure the beam and translate instrument readings into patient dose. The therapy chart carries the machine-specific plan history. Dose fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Transfer the previous calibration and patient geometry into the new plan, then verify the calculated result without a fresh beam measurement. The machine history seems stable. The dose practice fits.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Assume attenuation, detector response, and beam output remain stable across energy, field, material, and machine condition. Dose practice makes the dose view plausible. Dose timing supports this dose claim.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Let one calculation validate another calculation built from the same untested beam model. Dose records fit this dose account. Dose context supports the view. Dose timing supports this dose claim.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        },
        {
          "q": "How should medical physicists translate this history into quality assurance?",
          "o": [
            {
              "t": "The practical lesson is to distrust silent continuity after any source swap, repair, beam-model change, or unusual patient reaction. Recommissioning and trend review protect patients from an error that otherwise looks like normal operation. Dose context matters. Dose fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Reduce independent dosimetry and chart review after commissioning once the planning system appears stable. The machine history seems stable. Dose context supports the view. Dose practice makes the dose view plausible. Dose timing supports this dose claim. The dose record fits.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Attribute repeated injuries mainly to software behavior or unusual patient sensitivity rather than a systematic delivery error. The console values appear consistent. The plan calculation looks precise. Dose practice makes the dose view plausible. The dose record fits.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Leave the beam in service and wait for another tissue reaction before repeating calibration. The chart supports the setting. Dose records fit this dose account. Dose context supports the view. Dose practice makes the dose view plausible. Dose timing supports this dose claim.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        }
      ]
    },
    "rx_quimby": {
      "sci": "Edith Quimby (1891-1982)",
      "topic": "Clinical radiation dosimetry",
      "lede": "Edith Quimby's work on clinical radiation dosimetry sharpened the physics behind planned therapeutic dose.",
      "no": 12,
      "profile": "Today's medical-physics cover note begins with Edith Quimby and clinical radiation dosimetry. Edith Quimby developed practical methods and tables for calculating doses from radium and X-ray therapy. Her teaching and measurements helped clinicians place sources more consistently and estimate how dose changed with distance and arrangement. The advance gave radiation workers a physical quantity, apparatus, or geometry that could be checked beyond the treatment console.\n\nA treatment geometry must be converted into a three-dimensional dose distribution, not judged by source strength alone. Quality assurance uses independent methods because agreement between two calculations built on the same mistaken assumption is not independence. Phantoms, ion chambers, chemical dosimeters, imaging checks, and chart review test different failure paths. A dosimetric account should specify radiation type, energy, calibration standard, geometry, detector response, and the conversion from reading to absorbed dose.\n\nRadiation therapy is a measurement chain extending from prescription through imaging, planning, machine calibration, patient setup, delivery, and verification. An error at one link can be repeated accurately by every link that follows. Dose is not the number typed into a console. It is energy deposited in mass, shaped by beam quality, geometry, tissue, time, and calibration factors whose traceability must survive service changes and software updates. The radiation record must keep source or beam state, calibration coefficients, plan version, setup images, delivered fractions, and independent measurements linked.\n\nQuimby's clinical dosimetry emphasizes geometry as well as quantity. A setup error moves the patient, field, or shielding relative to anatomy, so injury appears displaced and verification images, marks, or portal records reveal the mismatch. Such errors differ between patients and fractions. When high-dose regions align with intended fields but every treated patient receives a similar multiplicative excess, positioning is a poor explanation even though the harm appears on the body.",
      "frame": "The Clerk marks a field edge at The Dosimetry & Planning Room. \"Do not confuse the plan with delivery. Explain Edith Quimby.\"",
      "q": [
        {
          "q": "Which dosimetry account most accurately presents Edith Quimby's contribution to clinical radiation dosimetry?",
          "o": [
            {
              "t": "Edith Quimby developed practical methods and tables for calculating doses from radium and X-ray therapy. Medical physicists audit the raw traceable dose record against treatment delivery. Fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Edith Quimby's dose work emphasizes the treatment plan and console setting. The console values appear consistent. The plan calculation looks precise. Dose practice makes the dose view plausible.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Edith Quimby's dose work is read within dose practice as support for a console setting or reconstructed image as sufficient evidence of the dose delivered to tissue. Dose records fit this dose account.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Edith Quimby's authority is invoked in dose practice to justify continuing treatment after a source change without repeating an independent output measurement. The plan calculation looks precise.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        },
        {
          "q": "Which dosimetric rule follows directly from this contribution?",
          "o": [
            {
              "t": "A treatment geometry must be converted into a three-dimensional dose distribution, not judged by source strength alone. The therapy chart carries the traceable dose record. Dose context matters.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Transfer the previous calibration and patient geometry into the new plan, then verify the calculated result without a fresh beam measurement. Dose records fit this dose account. The dose record fits.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Assume attenuation, detector response, and beam output remain stable across energy, field, material, and machine condition. Dose records fit this dose account. Dose timing supports this dose claim.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Let one calculation validate another calculation built from the same untested beam model. The console values appear consistent. The plan calculation looks precise. The dose practice fits.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        },
        {
          "q": "How should medical physicists translate this history into quality assurance?",
          "o": [
            {
              "t": "A strong treatment record links the prescribed target and constraints with measured output, plan version, setup images, delivered fractions, and any deviation. That continuity lets a physicist reconstruct dose rather than guess from symptoms. Dose fits. Dose fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Reduce independent dosimetry and chart review after commissioning once the planning system appears stable. The plan calculation looks precise. Dose context supports the view. Dose practice makes the dose view plausible. Dose timing supports this dose claim. Dose fits.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Attribute repeated injuries mainly to software behavior or unusual patient sensitivity rather than a systematic delivery error. The console values appear consistent. The plan calculation looks precise. Dose practice makes the dose view plausible. The dose record fits.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Leave the beam in service and wait for another tissue reaction before repeating calibration. The chart supports the setting. Dose records fit this dose account. Dose context supports the view. Dose practice makes the dose view plausible. Dose timing supports this dose claim.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        }
      ]
    },
    "rx_paterson": {
      "sci": "Ralston Paterson (1897-1981)",
      "topic": "The Paterson-Parker dose system",
      "lede": "Ralston Paterson connected the Paterson-Parker dose system with the quantitative chain between radiation source and tissue.",
      "no": 13,
      "profile": "Today's medical-physics cover note begins with Ralston Paterson and the Paterson-Parker dose system. Ralston Paterson helped create the Paterson-Parker system for arranging radium sources so that a prescribed region received a relatively uniform dose. The method replaced ad hoc source placement with rules based on geometry and loading. The advance gave radiation workers a physical quantity, apparatus, or geometry that could be checked beyond the treatment console.\n\nStandardized patterns reduce variation, but each implant or field still requires verification against the actual anatomy and source positions. Radiation therapy is a measurement chain extending from prescription through imaging, planning, machine calibration, patient setup, delivery, and verification. An error at one link can be repeated accurately by every link that follows. A dosimetric account should specify radiation type, energy, calibration standard, geometry, detector response, and the conversion from reading to absorbed dose.\n\nDose is not the number typed into a console. It is energy deposited in mass, shaped by beam quality, geometry, tissue, time, and calibration factors whose traceability must survive service changes and software updates. Quality assurance uses independent methods because agreement between two calculations built on the same mistaken assumption is not independence. Phantoms, ion chambers, chemical dosimeters, imaging checks, and chart review test different failure paths. The radiation record must keep source or beam state, calibration coefficients, plan version, setup images, delivered fractions, and independent measurements linked.\n\nThe practical lesson is to distrust silent continuity after any source swap, repair, beam-model change, or unusual patient reaction. Recommissioning and trend review protect patients from an error that otherwise looks like normal operation. A strong treatment record links the prescribed target and constraints with measured output, plan version, setup images, delivered fractions, and any deviation. That continuity lets a physicist reconstruct dose rather than guess from symptoms. Cover competence here means separating biological variability from a systematic delivery error. Repeated patterns across patients, fields, machines, or dates are often more informative than the severity of one injury.",
      "frame": "Therapist Iyla aligns a phantom at The Clinic Director's Office. \"Give me Ralston Paterson, the detector, and the quantity that reaches the patient.\"",
      "q": [
        {
          "q": "Which dosimetry account most accurately presents Ralston Paterson's contribution to the Paterson-Parker dose system?",
          "o": [
            {
              "t": "Ralston Paterson helped create the Paterson-Parker system for arranging radium sources so that a prescribed region received a relatively uniform dose. Dose review links the plan history to patient geometry.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Ralston Paterson's dose work relies on the treatment plan and console setting. The chart supports the setting. Dose records fit this dose account. Dose context supports the view. Dose timing supports this dose claim.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Ralston Paterson's dose work supports a console setting or reconstructed image as sufficient evidence of the dose delivered to tissue. The machine history seems stable. Dose practice makes the dose view plausible.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Ralston Paterson's dose authority supports continuing treatment after a source change without repeating an independent output measurement. Dose context supports the view. Dose timing supports this dose claim.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        },
        {
          "q": "Which dosimetric rule follows directly from this contribution?",
          "o": [
            {
              "t": "Standardized patterns reduce variation, but each implant or field still requires verification against the actual anatomy and source positions. The therapy chart carries the dose record. Dose fits. Dose fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Transfer the previous calibration and patient geometry into the new plan, then verify the calculated result without a fresh beam measurement. The plan calculation looks precise. The dose practice fits. Dose fits.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Assume attenuation, detector response, and beam output remain stable across energy, field, material, and machine condition. Dose practice makes the dose view plausible. Dose timing supports this dose claim.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Let one calculation validate another calculation built from the same untested beam model. Dose records fit this dose account. Dose context supports the view. Dose timing supports this dose claim. Dose context matters.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        },
        {
          "q": "How should medical physicists translate this history into quality assurance?",
          "o": [
            {
              "t": "Cover competence here means separating biological variability from a systematic delivery error. Repeated patterns across patients, fields, machines, or dates are often more informative than the severity of one injury. Dose fits. Dose fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Reduce independent dosimetry and chart review after commissioning once the planning system appears stable. The console values appear consistent. The plan calculation looks precise. Dose practice makes the dose view plausible. Dose fits.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Attribute repeated injuries mainly to software behavior or unusual patient sensitivity rather than a systematic delivery error. Dose records fit this dose account. Dose context supports the view. Dose timing supports this dose claim.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Leave the beam in service and wait for another tissue reaction before repeating calibration. Dose records fit this dose account. Dose context supports the view. Dose practice makes the dose view plausible. Dose timing supports this dose claim.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        }
      ]
    },
    "rx_parker": {
      "sci": "Herbert M. Parker (1910-1984)",
      "topic": "Dosimetry & dose units",
      "lede": "Through dosimetry & dose units, Herbert M. Parker made invisible radiation more measurable, calculable, and clinically controllable.",
      "no": 14,
      "profile": "Today's medical-physics cover note begins with Herbert M. Parker and dosimetry & dose units. Herbert M. Parker worked on radiation dosimetry, protection, and the development of dose units. With Ralston Paterson, he helped formulate systematic radium treatment arrangements that connected source distribution with a planned dose. The advance gave radiation workers a physical quantity, apparatus, or geometry that could be checked beyond the treatment console.\n\nUnits, calibration factors, and geometry must remain consistent from written prescription to delivered treatment. Dose is not the number typed into a console. It is energy deposited in mass, shaped by beam quality, geometry, tissue, time, and calibration factors whose traceability must survive service changes and software updates. A dosimetric account should specify radiation type, energy, calibration standard, geometry, detector response, and the conversion from reading to absorbed dose.\n\nQuality assurance uses independent methods because agreement between two calculations built on the same mistaken assumption is not independence. Phantoms, ion chambers, chemical dosimeters, imaging checks, and chart review test different failure paths. Radiation therapy is a measurement chain extending from prescription through imaging, planning, machine calibration, patient setup, delivery, and verification. An error at one link can be repeated accurately by every link that follows. The radiation record must keep source or beam state, calibration coefficients, plan version, setup images, delivered fractions, and independent measurements linked.\n\nA strong treatment record links the prescribed target and constraints with measured output, plan version, setup images, delivered fractions, and any deviation. That continuity lets a physicist reconstruct dose rather than guess from symptoms. Cover competence here means separating biological variability from a systematic delivery error. Repeated patterns across patients, fields, machines, or dates are often more informative than the severity of one injury. The practical lesson is to distrust silent continuity after any source swap, repair, beam-model change, or unusual patient reaction. Recommissioning and trend review protect patients from an error that otherwise looks like normal operation.",
      "frame": "Therapist Iyla opens a calibration sheet at The Clinic Director's Office. \"Trace dosimetry & dose units from source to measured dose before I release the next page.\"",
      "q": [
        {
          "q": "Which dosimetry account most accurately presents Herbert M. Parker's contribution to dosimetry & dose units?",
          "o": [
            {
              "t": "Herbert M. The dosimetry ledger stores the beam measurement. Radiation evidence keeps the beam measurement traceable to calibration. The dosimetry ledger stores the raw beam measurement. Dose fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Herbert M. Parker's dose work emphasizes the treatment plan and console setting. The plan calculation looks precise. Dose practice makes the dose view plausible. Dose timing supports this dose claim.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Herbert M. Parker's dose work is read within dose practice as support for a console setting or reconstructed image as sufficient evidence of the dose delivered to tissue. The chart supports the setting.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Herbert M. Parker's dose authority supports continuing treatment after a source change without repeating an independent output measurement. The console values appear consistent. The dose record fits.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        },
        {
          "q": "Which dosimetric rule follows directly from this contribution?",
          "o": [
            {
              "t": "Units, calibration factors, and geometry must remain consistent from written prescription to delivered treatment. Dose review links the traceable calibration check to patient geometry. Dose fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Transfer the previous calibration and patient geometry into the new plan, then verify the calculated result without a fresh beam measurement. The machine history seems stable. The dose practice fits.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Assume attenuation, detector response, and beam output remain stable across energy, field, material, and machine condition. Dose practice makes the dose view plausible. Dose timing supports this dose claim.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Let one calculation validate another calculation built from the same untested beam model. Dose records fit this dose account. Dose context supports the view. Dose timing supports this dose claim.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        },
        {
          "q": "How should medical physicists translate this history into quality assurance?",
          "o": [
            {
              "t": "The practical lesson is to distrust silent continuity after any source swap, repair, beam-model change, or unusual patient reaction. Recommissioning and trend review protect patients from an error that otherwise looks like normal operation. Dose context matters. Dose fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Reduce independent dosimetry and chart review after commissioning once the planning system appears stable. The machine history seems stable. Dose context supports the view. Dose practice makes the dose view plausible. Dose timing supports this dose claim. The dose record fits.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Attribute repeated injuries mainly to software behavior or unusual patient sensitivity rather than a systematic delivery error. The console values appear consistent. The plan calculation looks precise. Dose practice makes the dose view plausible. The dose record fits.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Leave the beam in service and wait for another tissue reaction before repeating calibration. The chart supports the setting. Dose records fit this dose account. Dose context supports the view. Dose practice makes the dose view plausible. Dose timing supports this dose claim.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        }
      ]
    },
    "rx_fricke": {
      "sci": "Hugo Fricke (1892-1972)",
      "topic": "Chemical (Fricke) dosimetry",
      "lede": "Hugo Fricke's work on chemical (Fricke) dosimetry sharpened the physics behind planned therapeutic dose.",
      "no": 15,
      "profile": "Today's medical-physics cover note begins with Hugo Fricke and chemical (Fricke) dosimetry. Hugo Fricke developed a chemical dosimeter in which ionizing radiation oxidizes ferrous ions to ferric ions in solution. Measuring the chemical change provides an independent way to determine absorbed dose under controlled conditions. The advance gave radiation workers a physical quantity, apparatus, or geometry that could be checked beyond the treatment console.\n\nAn independent dosimeter can expose a machine or calculation error because it relies on a different physical measurement path. Quality assurance uses independent methods because agreement between two calculations built on the same mistaken assumption is not independence. Phantoms, ion chambers, chemical dosimeters, imaging checks, and chart review test different failure paths. A dosimetric account should specify radiation type, energy, calibration standard, geometry, detector response, and the conversion from reading to absorbed dose.\n\nRadiation therapy is a measurement chain extending from prescription through imaging, planning, machine calibration, patient setup, delivery, and verification. An error at one link can be repeated accurately by every link that follows. Dose is not the number typed into a console. It is energy deposited in mass, shaped by beam quality, geometry, tissue, time, and calibration factors whose traceability must survive service changes and software updates. The radiation record must keep source or beam state, calibration coefficients, plan version, setup images, delivered fractions, and independent measurements linked.\n\nCover competence here means separating biological variability from a systematic delivery error. Repeated patterns across patients, fields, machines, or dates are often more informative than the severity of one injury. The practical lesson is to distrust silent continuity after any source swap, repair, beam-model change, or unusual patient reaction. Recommissioning and trend review protect patients from an error that otherwise looks like normal operation. A strong treatment record links the prescribed target and constraints with measured output, plan version, setup images, delivered fractions, and any deviation. That continuity lets a physicist reconstruct dose rather than guess from symptoms.",
      "frame": "The Dosimetrist marks a field edge at The Clinic Director's Office. \"Do not confuse the plan with delivery. Explain Hugo Fricke.\"",
      "q": [
        {
          "q": "Which dosimetry account most accurately presents Hugo Fricke's contribution to chemical (Fricke) dosimetry?",
          "o": [
            {
              "t": "Hugo Fricke developed a chemical dosimeter in which ionizing radiation oxidizes ferrous ions to ferric ions in solution. The therapy chart carries the raw machine-specific plan history. Dose fits. Dose fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Hugo Fricke's dose work relies on the treatment plan and console setting. The console values appear consistent. The plan calculation looks precise. Dose practice makes the dose view plausible. Dose context matters.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Hugo Fricke's dose work is read within dose practice as support for a console setting or reconstructed image as sufficient evidence of the dose delivered to tissue. The console values appear consistent. Dose fits.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Hugo Fricke's authority is invoked in dose practice to justify continuing treatment after a source change without repeating an independent output measurement. The console values appear consistent. Dose fits.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        },
        {
          "q": "Which dosimetric rule follows directly from this contribution?",
          "o": [
            {
              "t": "An independent dosimeter can expose a machine or calculation error because it relies on a different physical measurement path. The dosimetry ledger stores the plan history. Dose context matters.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Transfer the previous calibration and patient geometry into the new plan, then verify the calculated result without a fresh beam measurement. Dose records fit this dose account. The dose record fits.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Assume attenuation, detector response, and beam output remain stable across energy, field, material, and machine condition. Dose records fit this dose account. Dose timing supports this dose claim.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Let one calculation validate another calculation built from the same untested beam model. The console values appear consistent. The plan calculation looks precise. The dose practice fits.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        },
        {
          "q": "How should medical physicists translate this history into quality assurance?",
          "o": [
            {
              "t": "A strong treatment record links the prescribed target and constraints with measured output, plan version, setup images, delivered fractions, and any deviation. That continuity lets a physicist reconstruct dose rather than guess from symptoms. Dose fits. Dose fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Reduce independent dosimetry and chart review after commissioning once the planning system appears stable. The plan calculation looks precise. Dose context supports the view. Dose practice makes the dose view plausible. Dose timing supports this dose claim. Dose fits.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Attribute repeated injuries mainly to software behavior or unusual patient sensitivity rather than a systematic delivery error. The console values appear consistent. The plan calculation looks precise. Dose practice makes the dose view plausible. The dose record fits.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Leave the beam in service and wait for another tissue reaction before repeating calibration. The chart supports the setting. Dose records fit this dose account. Dose context supports the view. Dose practice makes the dose view plausible. Dose timing supports this dose claim.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        }
      ]
    },
    "rx_cameron": {
      "sci": "John R. Cameron (1922-2005)",
      "topic": "Thermoluminescent dosimetry",
      "lede": "John R. Cameron connected thermoluminescent dosimetry with the quantitative chain between radiation source and tissue.",
      "no": 16,
      "profile": "Today's medical-physics cover note begins with John R. Cameron and thermoluminescent dosimetry. John R. Cameron advanced thermoluminescent dosimetry, using crystals that store energy from radiation and release light when heated. Small TLD chips made it practical to measure dose on patients, staff, or phantoms at specific locations. The advance gave radiation workers a physical quantity, apparatus, or geometry that could be checked beyond the treatment console.\n\nPoint measurements are valuable checks when their calibration, energy response, handling, and readout history are controlled. Radiation therapy is a measurement chain extending from prescription through imaging, planning, machine calibration, patient setup, delivery, and verification. An error at one link can be repeated accurately by every link that follows. A dosimetric account should specify radiation type, energy, calibration standard, geometry, detector response, and the conversion from reading to absorbed dose.\n\nDose is not the number typed into a console. It is energy deposited in mass, shaped by beam quality, geometry, tissue, time, and calibration factors whose traceability must survive service changes and software updates. Quality assurance uses independent methods because agreement between two calculations built on the same mistaken assumption is not independence. Phantoms, ion chambers, chemical dosimeters, imaging checks, and chart review test different failure paths. The radiation record must keep source or beam state, calibration coefficients, plan version, setup images, delivered fractions, and independent measurements linked.\n\nThe practical lesson is to distrust silent continuity after any source swap, repair, beam-model change, or unusual patient reaction. Recommissioning and trend review protect patients from an error that otherwise looks like normal operation. A strong treatment record links the prescribed target and constraints with measured output, plan version, setup images, delivered fractions, and any deviation. That continuity lets a physicist reconstruct dose rather than guess from symptoms. Cover competence here means separating biological variability from a systematic delivery error. Repeated patterns across patients, fields, machines, or dates are often more informative than the severity of one injury.",
      "frame": "The Dosimetrist aligns a phantom at The Clinic Director's Office. \"Give me John R. Cameron, the detector, and the quantity that reaches the patient.\"",
      "q": [
        {
          "q": "Which dosimetry account most accurately presents John R. Cameron's contribution to thermoluminescent dosimetry?",
          "o": [
            {
              "t": "John R. The therapy chart carries the dose record. The dosimetry ledger stores the dose record. The therapy chart carries the raw dose record. Dose review links the raw dose record to patient geometry.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "John R. Cameron's treatment of thermoluminescent dosimetry uses a dose simplification: the treatment plan and console setting, with independent calibration and patient geometry treated as later checks.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "John R. Cameron's dose work is read within dose practice as support for a console setting or reconstructed image as sufficient evidence of the dose delivered to tissue. The console values appear consistent.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "John R. Cameron's authority is invoked in dose practice to justify continuing treatment after a source change without repeating an independent output measurement. Dose practice makes the dose view plausible.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        },
        {
          "q": "Which dosimetric rule follows directly from this contribution?",
          "o": [
            {
              "t": "Point measurements are valuable checks when their calibration, energy response, handling, and readout history are controlled. The therapy chart carries the raw dose record. Dose context matters.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Transfer the previous calibration and patient geometry into the new plan, then verify the calculated result without a fresh beam measurement. Dose records fit this dose account. The dose record fits.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Assume attenuation, detector response, and beam output remain stable across energy, field, material, and machine condition. Dose records fit this dose account. Dose timing supports this dose claim.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Let one calculation validate another calculation built from the same untested beam model. The console values appear consistent. The plan calculation looks precise. The dose practice fits.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        },
        {
          "q": "How should medical physicists translate this history into quality assurance?",
          "o": [
            {
              "t": "Cover competence here means separating biological variability from a systematic delivery error. Repeated patterns across patients, fields, machines, or dates are often more informative than the severity of one injury. Dose fits. Dose fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Reduce independent dosimetry and chart review after commissioning once the planning system appears stable. The console values appear consistent. The plan calculation looks precise. Dose practice makes the dose view plausible. Dose fits.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Attribute repeated injuries mainly to software behavior or unusual patient sensitivity rather than a systematic delivery error. Dose records fit this dose account. Dose context supports the view. Dose timing supports this dose claim.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Leave the beam in service and wait for another tissue reaction before repeating calibration. Dose records fit this dose account. Dose context supports the view. Dose practice makes the dose view plausible. Dose timing supports this dose claim.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        }
      ]
    },
    "rx_evans": {
      "sci": "Robley D. Evans (1907-1995)",
      "topic": "Radiation measurement & dosimetry",
      "lede": "Through radiation measurement & dosimetry, Robley D. Evans made invisible radiation more measurable, calculable, and clinically controllable.",
      "no": 17,
      "profile": "Today's medical-physics cover note begins with Robley D. Evans and radiation measurement & dosimetry. Robley D. Evans developed sensitive methods for measuring radioactivity in the human body and studied the health effects of radium exposure. His work joined instrumentation, dose reconstruction, and long-term epidemiologic evidence. The advance gave radiation workers a physical quantity, apparatus, or geometry that could be checked beyond the treatment console.\n\nDose assessment often requires reconstructing what entered the body, where it went, and how long it remained there. Dose is not the number typed into a console. It is energy deposited in mass, shaped by beam quality, geometry, tissue, time, and calibration factors whose traceability must survive service changes and software updates. A dosimetric account should specify radiation type, energy, calibration standard, geometry, detector response, and the conversion from reading to absorbed dose.\n\nQuality assurance uses independent methods because agreement between two calculations built on the same mistaken assumption is not independence. Phantoms, ion chambers, chemical dosimeters, imaging checks, and chart review test different failure paths. Radiation therapy is a measurement chain extending from prescription through imaging, planning, machine calibration, patient setup, delivery, and verification. An error at one link can be repeated accurately by every link that follows. The radiation record must keep source or beam state, calibration coefficients, plan version, setup images, delivered fractions, and independent measurements linked.\n\nA strong treatment record links the prescribed target and constraints with measured output, plan version, setup images, delivered fractions, and any deviation. That continuity lets a physicist reconstruct dose rather than guess from symptoms. Cover competence here means separating biological variability from a systematic delivery error. Repeated patterns across patients, fields, machines, or dates are often more informative than the severity of one injury. The practical lesson is to distrust silent continuity after any source swap, repair, beam-model change, or unusual patient reaction. Recommissioning and trend review protect patients from an error that otherwise looks like normal operation.",
      "frame": "The Clerk opens a calibration sheet at The Clinic Director's Office. \"Trace radiation measurement & dosimetry from source to measured dose before I release the next page.\"",
      "q": [
        {
          "q": "Which dosimetry account most accurately presents Robley D. Evans's contribution to radiation measurement & dosimetry?",
          "o": [
            {
              "t": "Robley D. Dose review links the raw calibration check to patient geometry. The dosimetry ledger stores the raw calibration check. The therapy chart carries the machine-specific calibration check.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Robley D. Evans's dose work emphasizes the treatment plan and console setting. The console values appear consistent. The plan calculation looks precise. Dose practice makes the dose view plausible.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Robley D. Evans's dose work is read within dose practice as support for a console setting or reconstructed image as sufficient evidence of the dose delivered to tissue. Dose timing supports this dose claim.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Robley D. Evans's authority is invoked in dose practice to justify continuing treatment after a source change without repeating an independent output measurement. Dose records fit this dose account.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        },
        {
          "q": "Which dosimetric rule follows directly from this contribution?",
          "o": [
            {
              "t": "Dose assessment often requires reconstructing what entered the body, where it went, and how long it remained there. Medical physicists audit the dose record against treatment delivery. Dose fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Transfer the previous calibration and patient geometry into the new plan, then verify the calculated result without a fresh beam measurement. The machine history seems stable. The dose practice fits.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Assume attenuation, detector response, and beam output remain stable across energy, field, material, and machine condition. Dose practice makes the dose view plausible. Dose timing supports this dose claim.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Let one calculation validate another calculation built from the same untested beam model. Dose records fit this dose account. Dose context supports the view. Dose timing supports this dose claim.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        },
        {
          "q": "How should medical physicists translate this history into quality assurance?",
          "o": [
            {
              "t": "The practical lesson is to distrust silent continuity after any source swap, repair, beam-model change, or unusual patient reaction. Recommissioning and trend review protect patients from an error that otherwise looks like normal operation. Dose context matters. Dose fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Reduce independent dosimetry and chart review after commissioning once the planning system appears stable. The machine history seems stable. Dose context supports the view. Dose practice makes the dose view plausible. Dose timing supports this dose claim. The dose record fits.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Attribute repeated injuries mainly to software behavior or unusual patient sensitivity rather than a systematic delivery error. The console values appear consistent. The plan calculation looks precise. Dose practice makes the dose view plausible. The dose record fits.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Leave the beam in service and wait for another tissue reaction before repeating calibration. The chart supports the setting. Dose records fit this dose account. Dose context supports the view. Dose practice makes the dose view plausible. Dose timing supports this dose claim.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        }
      ]
    },
    "rx_cormack": {
      "sci": "Allan Cormack (1924-1998)",
      "topic": "CT imaging & dose computation",
      "lede": "Allan Cormack's work on cT imaging & dose computation sharpened the physics behind planned therapeutic dose.",
      "no": 18,
      "profile": "Today's medical-physics cover note begins with Allan Cormack and cT imaging & dose computation. Allan Cormack developed mathematical methods for reconstructing cross-sectional images from X-ray projections, work that helped make computed tomography possible. The same relationship between attenuation, geometry, and reconstruction informs treatment imaging and dose calculation. The advance gave radiation workers a physical quantity, apparatus, or geometry that could be checked beyond the treatment console.\n\nA computed image is an inference from measured projections, so calibration and reconstruction assumptions can affect every downstream plan. Quality assurance uses independent methods because agreement between two calculations built on the same mistaken assumption is not independence. Phantoms, ion chambers, chemical dosimeters, imaging checks, and chart review test different failure paths. A dosimetric account should specify radiation type, energy, calibration standard, geometry, detector response, and the conversion from reading to absorbed dose.\n\nRadiation therapy is a measurement chain extending from prescription through imaging, planning, machine calibration, patient setup, delivery, and verification. An error at one link can be repeated accurately by every link that follows. Dose is not the number typed into a console. It is energy deposited in mass, shaped by beam quality, geometry, tissue, time, and calibration factors whose traceability must survive service changes and software updates. The radiation record must keep source or beam state, calibration coefficients, plan version, setup images, delivered fractions, and independent measurements linked.\n\nCormack's reconstruction mathematics explains what a planning-system error would affect. CT numbers describe anatomy and attenuation; treatment software converts that representation, beam geometry, and prescription into monitor units. A faulty conversion leaves reproducible discrepancies when plans are recalculated independently and may vary with patient shape or field arrangement. If independent calculation agrees with the stored plans while physical measurements exceed them by the same factor, the error lies beyond image-based planning.",
      "frame": "The Clerk marks a field edge at The Clinic Director's Office. \"Do not confuse the plan with delivery. Explain Allan Cormack.\"",
      "q": [
        {
          "q": "Which dosimetry account most accurately presents Allan Cormack's contribution to cT imaging & dose computation?",
          "o": [
            {
              "t": "Allan Cormack developed mathematical methods for reconstructing cross-sectional images from X-ray projections, work that helped make computed tomography possible. The therapy chart carries the traceable beam measurement. Dose fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Allan Cormack's dose work emphasizes the treatment plan and console setting. The console values appear consistent. The plan calculation looks precise. Dose practice makes the dose view plausible. Dose timing supports this dose claim.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Allan Cormack's dose work is read within dose practice as support for a console setting or reconstructed image as sufficient evidence of the dose delivered to tissue. Dose records fit this dose account. Dose timing supports this dose claim.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Allan Cormack's dose authority supports continuing treatment after a source change without repeating an independent output measurement. The console values appear consistent. The plan calculation looks precise. Dose fits. Dose fits.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        },
        {
          "q": "Which dosimetric rule follows directly from this contribution?",
          "o": [
            {
              "t": "A computed image is an inference from measured projections, so calibration and reconstruction assumptions can affect every downstream plan. The therapy chart carries the dose record. Dose fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Transfer the previous calibration and patient geometry into the new plan, then verify the calculated result without a fresh beam measurement. Dose practice makes the dose view plausible.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Assume attenuation, detector response, and beam output remain stable across energy, field, material, and machine condition. Dose context supports the view. Dose timing supports this dose claim.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Let one calculation validate another calculation built from the same untested beam model. Dose records fit this dose account. Dose context supports the view. Dose timing supports this dose claim.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        },
        {
          "q": "How should medical physicists translate this history into quality assurance?",
          "o": [
            {
              "t": "A strong treatment record links the prescribed target and constraints with measured output, plan version, setup images, delivered fractions, and any deviation. That continuity lets a physicist reconstruct dose rather than guess from symptoms. Dose fits. Dose fits.",
              "v": "expert",
              "fb": "Correct: the answer preserves the chain from physical measurement to verified patient dose."
            },
            {
              "t": "Reduce independent dosimetry and chart review after commissioning once the planning system appears stable. The plan calculation looks precise. Dose context supports the view. Dose practice makes the dose view plausible. Dose timing supports this dose claim. Dose fits.",
              "v": "partial",
              "fb": "This is relevant to treatment, but it omits an independent calibration, geometry, or delivery check."
            },
            {
              "t": "Attribute repeated injuries mainly to software behavior or unusual patient sensitivity rather than a systematic delivery error. The console values appear consistent. The plan calculation looks precise. Dose practice makes the dose view plausible. The dose record fits.",
              "v": "wrong",
              "fb": "That explanation confuses a setting or image with proof of the absorbed dose actually delivered."
            },
            {
              "t": "Leave the beam in service and wait for another tissue reaction before repeating calibration. The chart supports the setting. Dose records fit this dose account. Dose context supports the view. Dose practice makes the dose view plausible. Dose timing supports this dose claim.",
              "v": "danger",
              "fb": "That practice lets one unverified assumption propagate through an entire course of treatment."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "therapist": {
      "vault": "A phantom sticker marks a phantom and ion chamber in The Treatment Vault & Machine; Therapist Iyla begins the interview there. \"Dosimetry tolerates no loose language; earn the treatment record through the day's profile.\"",
      "planning": "A phantom sticker marks the archived treatment plans in The Dosimetry & Planning Room; Therapist Iyla begins the interview there. \"Dosimetry tolerates no loose language; earn the treatment record through the day's profile.\"",
      "office": "A phantom sticker marks the quality-assurance calendar in The Clinic Director's Office; Therapist Iyla begins the interview there. \"Dosimetry tolerates no loose language; earn the treatment record through the day's profile.\""
    },
    "dosimetrist": {
      "vault": "A phantom sticker marks a phantom and ion chamber in The Treatment Vault & Machine; The Dosimetrist begins the interview there. \"Show me you followed the pioneer before I release any planning documentation.\"",
      "planning": "A phantom sticker marks the archived treatment plans in The Dosimetry & Planning Room; The Dosimetrist begins the interview there. \"Show me you followed the pioneer before I release any planning documentation.\"",
      "office": "A phantom sticker marks the quality-assurance calendar in The Clinic Director's Office; The Dosimetrist begins the interview there. \"Show me you followed the pioneer before I release any planning documentation.\""
    },
    "clerk": {
      "vault": "A phantom sticker marks a phantom and ion chamber in The Treatment Vault & Machine; The Clerk begins the interview there. \"The quality calendar comes after the reading test, not before it.\"",
      "planning": "A phantom sticker marks the archived treatment plans in The Dosimetry & Planning Room; The Clerk begins the interview there. \"The quality calendar comes after the reading test, not before it.\"",
      "office": "A phantom sticker marks the quality-assurance calendar in The Clinic Director's Office; The Clerk begins the interview there. \"The quality calendar comes after the reading test, not before it.\""
    }
  },
  "story": [
    "<b>The linear accelerator is locked out while treatment plans and service records are copied under seal.</b>",
    "<b>Therapist Iyla</b> saw treatments delivered; <b>The Dosimetrist</b> owns the dose calculations; the quality calendar belongs to <b>The Clerk</b>.",
    "Suspects Dr. Halvard Bre — clinic director, The chief medical physicist, and The radiation safety regulator are settled by clues; the dose chain readings must choose between <b>The planning system converted anatomy into the wrong monitor units</b> and <b>Patient setup placed normal tissue inside the intended high-dose field</b>.",
    "<b>The clinic must decide within eight days whether the machine can return to service or every patient must transfer.</b>"
  ],
  "endings": {
    "overclaimWhat": "software",
    "dismissalWhat": "freak",
    "win": {
      "expertTitle": "The Beam That Changed",
      "expert": [
        "Inspector Tovah Riis names Dr. Halvard Bre — clinic director, The Clinic Director's Office, and Machine output changed after service and was not recalibrated. Not The planning system converted anatomy into the wrong monitor units. Not Patient setup placed normal tissue inside the intended high-dose field.",
        "The readings distinguish a planning conversion error, a geometric setup error, and a systematic change in machine output by comparing plan records, injury location, and independent calibration measurements."
      ],
      "soundTitle": "A Defensible Dosimetry Finding",
      "sound": [
        "Phantom evidence fixes the trio: Dr. Halvard Bre — clinic director; The Clinic Director's Office; Machine output changed after service and was not recalibrated.",
        "The dose conclusion is stable, but a few independent checks are still absent from the clinic file."
      ],
      "namedTitle": "Correct Link, Limited Verification",
      "named": [
        "Phantom evidence points to Dr. Halvard Bre — clinic director, The Clinic Director's Office, and Machine output changed after service and was not recalibrated; phantom support remains incomplete.",
        "The beam error is named correctly, though the clinic record remains too thin for enforcement."
      ]
    },
    "overclaim": {
      "title": "The Planning-System Theory",
      "body": [
        "Inspector Tovah Riis blames The planning system converted anatomy into the wrong monitor units. Independent recalculation fails to reproduce that dose error.",
        "A monitor-unit calculation error would be encoded in the plans and should vary with field geometry or algorithm inputs. Recalculation reproduces the intended values, so planning did not create the common overdose factor."
      ]
    },
    "dismissal": {
      "title": "The Setup-Error Theory",
      "body": [
        "Inspector Tovah Riis instead identifies Patient setup placed normal tissue inside the intended high-dose field. Verification images do not show geometric displacement.",
        "Setup error shifts dose spatially and usually produces patient-specific misalignment visible on verification images. Similar excess dose across correctly positioned patients points to output rather than geometry."
      ]
    },
    "wrongNames": {
      "title": "Right Dose Failure, Wrong Names",
      "body": [
        "The output-calibration judgment is correct; the chosen actor or location is not. Finish the dose-chain clues before proceeding."
      ]
    }
  }
}
};
