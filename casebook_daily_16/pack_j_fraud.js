module.exports = { PACK: {
  "id": "j_fraud",
  "title": "The Amberline Collapse",
  "discipline": "Accounting & Corporate Finance",
  "teaser": "A high-flying energy trader went from market darling to dust in a month. A raid by short-sellers? Just the market turning? Or billions parked where no auditor would look?",
  "overclaimTag": "a short-seller raid",
  "truthTag": "losses hidden off the books",
  "venue": "the Amberline bankruptcy examination",
  "agent": {
    "name": "Examiner Dana Roth",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Examiner credibility",
  "readingShort": "Reckoners",
  "readingLabel": "Masters of the Ledger",
  "dossierName": "MASTERS OF THE LEDGER",
  "enterLabel": "Open the examination",
  "subt": "A deduction game inside the Amberline bankruptcy examination",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The WHERE you test determines the dossier, and the conversation costs one day.",
  "overclaimTease": "Short-sellers can expose weakness or exploit it, but neither possibility reconciles the missing billions.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "cfo",
      "items": [
        {
          "id": "ceo",
          "label": "The chief executive"
        },
        {
          "id": "cfo",
          "label": "Julian Frael — the chief financial officer"
        },
        {
          "id": "auditor",
          "label": "The outside auditor"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "spes",
      "items": [
        {
          "id": "trading",
          "label": "The Trading Floor"
        },
        {
          "id": "auditroom",
          "label": "The Auditor's Workroom"
        },
        {
          "id": "spes",
          "label": "The Off-Books Partnership Files"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "offbooks",
      "items": [
        {
          "id": "raid",
          "label": "A short-seller raid sank a sound company"
        },
        {
          "id": "cycle",
          "label": "Nothing wrong — just the market turning"
        },
        {
          "id": "offbooks",
          "label": "Losses hidden in off-books entities"
        }
      ]
    }
  },
  "PLACES": {
    "trading": {
      "name": "The Trading Floor",
      "xy": [
        140,
        90
      ]
    },
    "auditroom": {
      "name": "The Auditor's Workroom",
      "xy": [
        330,
        240
      ]
    },
    "spes": {
      "name": "The Off-Books Partnership Files",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "trading",
      "auditroom"
    ],
    [
      "auditroom",
      "spes"
    ]
  ],
  "CHARACTERS": {
    "controller": {
      "name": "Assistant Controller Pia Voss",
      "role": "Assistant controller",
      "face": "🧮",
      "badge": "V",
      "legend": "the finance floor",
      "hint": "Booked the entries; the same losses kept moving to partnerships she couldn't see."
    },
    "junioraudit": {
      "name": "The Junior Auditor",
      "role": "Audit-team junior",
      "face": "🗂",
      "badge": "A",
      "legend": "the auditor's room",
      "hint": "Ticked the confirmations; the partnership balances never confirmed back."
    },
    "trader": {
      "name": "Desk Trader Okonkwo",
      "role": "Energy-desk trader",
      "face": "📈",
      "badge": "O",
      "legend": "the trading floor",
      "hint": "Marked the book to models no one outside could check."
    }
  },
  "TOPICMAP": {
    "trading": {
      "controller": [
        "doubleentry"
      ],
      "junioraudit": [
        "auditduty"
      ],
      "trader": [
        "goingconcern"
      ]
    },
    "auditroom": {
      "controller": [
        "statements"
      ],
      "junioraudit": [
        "bezzle"
      ],
      "trader": [
        "creative"
      ]
    },
    "spes": {
      "controller": [
        "asymmetry"
      ],
      "junioraudit": [
        "shenanigans"
      ],
      "trader": [
        "internalaudit"
      ]
    }
  },
  "TOPICS": {
    "doubleentry": {
      "sci": "Luca Pacioli (c. 1447-1517)",
      "topic": "Double-entry bookkeeping",
      "lede": "Luca Pacioli followed double-entry bookkeeping from reported figures to cash, control, and the counterparties behind them.",
      "no": 1,
      "profile": "Today’s ledger briefing introduces Luca Pacioli through the accounting problem of double-entry bookkeeping. Luca Pacioli's 1494 mathematical compendium described the Venetian method of double-entry bookkeeping, in which each transaction is recorded through corresponding debits and credits. Corporate reports translate thousands of transactions into a compact picture of performance and condition. That compression creates value, but it also creates places where classification, timing, estimates, and related entities can conceal economic reality.\n\nThe necessary discipline is to keep a balanced journal and ledger so changes in assets, liabilities, equity, income, and expense can be traced. Earnings should be reconciled with cash, journal entries with source documents, balances with independent counterparties, and control claims with actual access. Transactions that remove an item from one statement may leave guarantees, ownership, or risk elsewhere in the enterprise.\n\nFraud rarely announces itself as an unbalanced ledger. It often uses balanced entries, approved forms, and sophisticated structures whose assumptions are distributed across footnotes and entities. The decisive question is whether the reported accounting follows the substance of who controls assets, bears losses, and receives benefits.\n\nThe financial lesson is balanced entries improve control, but fabricated counterparts can still make a dishonest ledger balance. Numbers become trustworthy when their economic counterparts can be located outside management’s narrative. A confirmation that never returns is evidence requiring escalation, not an administrative inconvenience. Targets and compensation should be treated as part of the control environment because they shape reporting pressure. A confirmation that never returns is evidence requiring escalation, not an administrative inconvenience.",
      "frame": "Places a journal entry beside an unanswered confirmation. \"At The Trading Floor, both columns balance. Tell me what double-entry bookkeeping still requires.\"",
      "q": [
        {
          "q": "Which accounting statement best describes Luca Pacioli’s contribution to double-entry bookkeeping?",
          "o": [
            {
              "t": "Luca Pacioli made double-entry bookkeeping depend on reconciliation with cash, control, obligations, and independent counterparties. It remains checkable in the case file in the case file.",
              "v": "expert",
              "fb": "Correct: reliable accounting connects entries with assets, cash, control, and independent evidence."
            },
            {
              "t": "Luca Pacioli treated double-entry bookkeeping as reliable whenever the ledger balanced and management approved the entries. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Double entry can balance perfectly even when both sides describe an invented transaction."
            },
            {
              "t": "Luca Pacioli let an audit signature settle double-entry bookkeeping without locating the claimed economic transaction. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "An audit opinion does not transfer management’s assertions into independently verified facts."
            },
            {
              "t": "Luca Pacioli used hostile market commentary about double-entry bookkeeping as the complete explanation for missing value. The conclusion shapes which records receive attention.",
              "v": "danger",
              "fb": "Market pressure can reveal a weakness, but it cannot explain missing economic resources by itself."
            }
          ]
        },
        {
          "q": "Which examination step best applies the method taught in the profile?",
          "o": [
            {
              "t": "Trace unusual balances through journals, contracts, confirmations, cash movement, ownership, and guarantees. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Yes: forensic work follows a number outward until the claimed economic event can be located."
            },
            {
              "t": "Recalculate the reported totals accurately, but accept management's labels for every related entity. The missing record is treated as a minor limitation.",
              "v": "partial",
              "fb": "Arithmetic accuracy does not establish the substance or ownership of the transaction."
            },
            {
              "t": "Confirm disputed balances mainly with company employees because outsiders may misunderstand the structure. The account leans heavily on prior reputation.",
              "v": "wrong",
              "fb": "Independent confirmation matters precisely because internal records may repeat the same assertion."
            },
            {
              "t": "Investigate short-seller motives first, while postponing tests of transactions lacking independent cash. The preferred narrative sets the order of review.",
              "v": "danger",
              "fb": "The critic’s incentives do not remove the need to reconcile the questioned balance."
            }
          ]
        },
        {
          "q": "Which financial-reporting principle follows from double-entry bookkeeping?",
          "o": [
            {
              "t": "Financial form should never conceal who controls an asset, receives its benefit, or bears its loss. Others can retrace it under the documented sequence in the case file.",
              "v": "expert",
              "fb": "Exactly: economic substance connects the ledger to control, obligation, and cash."
            },
            {
              "t": "Detailed footnotes should cure misleading statements even when readers does not connect the related entities. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Disclosure helps only when it permits users to understand the effect on the primary statements."
            },
            {
              "t": "Consistent earnings growth should outweigh cash flow because markets mainly value future performance. The explanation treats the conflicting record as secondary in the case file.",
              "v": "wrong",
              "fb": "Earnings can be estimated or shifted; cash and obligations provide independent constraints."
            },
            {
              "t": "The company is treated as fundamentally sound or destroyed largely by hostile traders and publicity. The critic replaces the ledger test in the dated record in the case file.",
              "v": "danger",
              "fb": "A narrower accounting mechanism can explain collapse without accepting either extreme story."
            }
          ]
        }
      ]
    },
    "auditduty": {
      "sci": "Robert H. Montgomery (1872-1953)",
      "topic": "The auditor's duty",
      "lede": "Robert H. Montgomery treated the auditor’s duty as a reconciliation problem no polished earnings story could settle.",
      "no": 2,
      "profile": "Today’s ledger briefing introduces Robert H. Montgomery through the accounting problem of the auditor’s duty. Robert H. Montgomery helped professionalize American auditing and wrote influential texts on audit practice, evidence, and the accountant's responsibilities. Corporate reports translate thousands of transactions into a compact picture of performance and condition. That compression creates value, but it also creates places where classification, timing, estimates, and related entities can conceal economic reality.\n\nThe necessary discipline is to obtain sufficient independent evidence, understand controls, test records, and report material problems rather than merely checking arithmetic. Earnings should be reconciled with cash, journal entries with source documents, balances with independent counterparties, and control claims with actual access. Transactions that remove an item from one statement may leave guarantees, ownership, or risk elsewhere in the enterprise.\n\nFraud rarely announces itself as an unbalanced ledger. It often uses balanced entries, approved forms, and sophisticated structures whose assumptions are distributed across footnotes and entities. The decisive question is whether the reported accounting follows the substance of who controls assets, bears losses, and receives benefits.\n\nThe financial lesson is an audit is an evidentiary examination, not a ceremonial endorsement of management's numbers. Numbers become trustworthy when their economic counterparts can be located outside management’s narrative. A confirmation that never returns is evidence requiring escalation, not an administrative inconvenience. Targets and compensation should be treated as part of the control environment because they shape reporting pressure. A confirmation that never returns is evidence requiring escalation, not an administrative inconvenience. Targets and compensation should be treated as part of the control environment because they shape reporting pressure.",
      "frame": "Locks the partnership binder. \"Follow the number outside the ledger. Begin with the auditor’s duty.\"",
      "q": [
        {
          "q": "Which accounting statement best describes Robert H. Montgomery’s contribution to the auditor’s duty?",
          "o": [
            {
              "t": "Robert H. Montgomery made the auditor’s duty depend on reconciliation with cash, control, obligations, and independent counterparties. It remains checkable in the case file in the case file.",
              "v": "expert",
              "fb": "Correct: reliable accounting connects entries with assets, cash, control, and independent evidence."
            },
            {
              "t": "Robert H. Montgomery treated the auditor’s duty as reliable whenever the ledger balanced and management approved the entries. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Double entry can balance perfectly even when both sides describe an invented transaction."
            },
            {
              "t": "Robert H. Montgomery let an audit signature settle the auditor’s duty without locating the claimed economic transaction. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "An audit opinion does not transfer management’s assertions into independently verified facts."
            },
            {
              "t": "Robert H. Montgomery used hostile market commentary about the auditor’s duty as the complete explanation for missing value. The conclusion shapes which records receive attention.",
              "v": "danger",
              "fb": "Market pressure can reveal a weakness, but it cannot explain missing economic resources by itself."
            }
          ]
        },
        {
          "q": "Which examination step best applies the method taught in the profile?",
          "o": [
            {
              "t": "Trace unusual balances through journals, contracts, confirmations, cash movement, ownership, and guarantees. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Yes: forensic work follows a number outward until the claimed economic event can be located."
            },
            {
              "t": "Recalculate the reported totals accurately, but accept management's labels for every related entity. The missing record is treated as a minor limitation.",
              "v": "partial",
              "fb": "Arithmetic accuracy does not establish the substance or ownership of the transaction."
            },
            {
              "t": "Confirm disputed balances mainly with company employees because outsiders may misunderstand the structure. The account leans heavily on prior reputation.",
              "v": "wrong",
              "fb": "Independent confirmation matters precisely because internal records may repeat the same assertion."
            },
            {
              "t": "Investigate short-seller motives first, while postponing tests of transactions lacking independent cash. The preferred narrative sets the order of review.",
              "v": "danger",
              "fb": "The critic’s incentives do not remove the need to reconcile the questioned balance."
            }
          ]
        },
        {
          "q": "Which financial-reporting principle follows from the auditor’s duty?",
          "o": [
            {
              "t": "Financial form should never conceal who controls an asset, receives its benefit, or bears its loss. Others can retrace it under the documented sequence in the case file.",
              "v": "expert",
              "fb": "Exactly: economic substance connects the ledger to control, obligation, and cash."
            },
            {
              "t": "Detailed footnotes should cure misleading statements even when readers does not connect the related entities. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Disclosure helps only when it permits users to understand the effect on the primary statements."
            },
            {
              "t": "Consistent earnings growth should outweigh cash flow because markets mainly value future performance. The explanation treats the conflicting record as secondary in the case file.",
              "v": "wrong",
              "fb": "Earnings can be estimated or shifted; cash and obligations provide independent constraints."
            },
            {
              "t": "The company is treated as fundamentally sound or destroyed largely by hostile traders and publicity. The critic replaces the ledger test in the dated record in the case file.",
              "v": "danger",
              "fb": "A narrower accounting mechanism can explain collapse without accepting either extreme story."
            }
          ]
        }
      ]
    },
    "goingconcern": {
      "sci": "William A. Paton (1889-1991)",
      "topic": "Accounting theory & the going concern",
      "lede": "The ledger had to meet economic reality in William A. Paton's work on accounting theory and the going concern.",
      "no": 3,
      "profile": "Today’s ledger briefing introduces William A. Paton through the accounting problem of accounting theory and the going concern. William A. Paton developed accounting theory around the business entity, income measurement, and the going-concern assumption that an enterprise will continue operating. Corporate reports translate thousands of transactions into a compact picture of performance and condition. That compression creates value, but it also creates places where classification, timing, estimates, and related entities can conceal economic reality.\n\nThe necessary discipline is to identify which valuations and classifications depend on continued operation and reassess them when survival becomes doubtful. Earnings should be reconciled with cash, journal entries with source documents, balances with independent counterparties, and control claims with actual access. Transactions that remove an item from one statement may leave guarantees, ownership, or risk elsewhere in the enterprise.\n\nFraud rarely announces itself as an unbalanced ledger. It often uses balanced entries, approved forms, and sophisticated structures whose assumptions are distributed across footnotes and entities. The decisive question is whether the reported accounting follows the substance of who controls assets, bears losses, and receives benefits.\n\nThe financial lesson is an assumption useful in ordinary reporting becomes dangerous when evidence of failure is suppressed. Numbers become trustworthy when their economic counterparts can be located outside management’s narrative. A confirmation that never returns is evidence requiring escalation, not an administrative inconvenience. Targets and compensation should be treated as part of the control environment because they shape reporting pressure. A confirmation that never returns is evidence requiring escalation, not an administrative inconvenience.",
      "frame": "Turns to the footnotes. \"The loss moved; it did not vanish. Show me you understand accounting theory and the going concern.\"",
      "q": [
        {
          "q": "Which accounting statement best describes William A. Paton’s contribution to accounting theory and the going concern?",
          "o": [
            {
              "t": "William A. Paton made accounting theory and the going concern depend on reconciliation with cash, control, obligations, and independent counterparties. It remains checkable in the case file in the case file.",
              "v": "expert",
              "fb": "Correct: reliable accounting connects entries with assets, cash, control, and independent evidence."
            },
            {
              "t": "William A. Paton treated accounting theory and the going concern as reliable whenever the ledger balanced and management approved the entries. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Double entry can balance perfectly even when both sides describe an invented transaction."
            },
            {
              "t": "William A. Paton let an audit signature settle accounting theory and the going concern without locating the claimed economic transaction. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "An audit opinion does not transfer management’s assertions into independently verified facts."
            },
            {
              "t": "William A. Paton used hostile market commentary about accounting theory and the going concern as the complete explanation for missing value. The conclusion shapes which records receive attention.",
              "v": "danger",
              "fb": "Market pressure can reveal a weakness, but it cannot explain missing economic resources by itself."
            }
          ]
        },
        {
          "q": "Which examination step best applies the method taught in the profile?",
          "o": [
            {
              "t": "Trace unusual balances through journals, contracts, confirmations, cash movement, ownership, and guarantees. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Yes: forensic work follows a number outward until the claimed economic event can be located."
            },
            {
              "t": "Recalculate the reported totals accurately, but accept management's labels for every related entity. The missing record is treated as a minor limitation.",
              "v": "partial",
              "fb": "Arithmetic accuracy does not establish the substance or ownership of the transaction."
            },
            {
              "t": "Confirm disputed balances mainly with company employees because outsiders may misunderstand the structure. The account leans heavily on prior reputation.",
              "v": "wrong",
              "fb": "Independent confirmation matters precisely because internal records may repeat the same assertion."
            },
            {
              "t": "Investigate short-seller motives first, while postponing tests of transactions lacking independent cash. The preferred narrative sets the order of review.",
              "v": "danger",
              "fb": "The critic’s incentives do not remove the need to reconcile the questioned balance."
            }
          ]
        },
        {
          "q": "Which financial-reporting principle follows from accounting theory and the going concern?",
          "o": [
            {
              "t": "Financial form should never conceal who controls an asset, receives its benefit, or bears its loss. Others can retrace it under the documented sequence in the case file.",
              "v": "expert",
              "fb": "Exactly: economic substance connects the ledger to control, obligation, and cash."
            },
            {
              "t": "Detailed footnotes should cure misleading statements even when readers does not connect the related entities. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Disclosure helps only when it permits users to understand the effect on the primary statements."
            },
            {
              "t": "Consistent earnings growth should outweigh cash flow because markets mainly value future performance. The explanation treats the conflicting record as secondary in the case file.",
              "v": "wrong",
              "fb": "Earnings can be estimated or shifted; cash and obligations provide independent constraints."
            },
            {
              "t": "The company is treated as fundamentally sound or destroyed largely by hostile traders and publicity. The critic replaces the ledger test in the dated record in the case file.",
              "v": "danger",
              "fb": "A narrower accounting mechanism can explain collapse without accepting either extreme story."
            }
          ]
        }
      ]
    },
    "statements": {
      "sci": "Benjamin Graham (1894-1976)",
      "topic": "Reading the financial statements",
      "lede": "Benjamin Graham followed reading the financial statements from reported figures to cash, control, and the counterparties behind them.",
      "no": 4,
      "profile": "Today’s ledger briefing introduces Benjamin Graham through the accounting problem of reading the financial statements. Benjamin Graham taught investors to read balance sheets, income statements, and asset values skeptically, looking for margins of safety rather than promotional narratives. Corporate reports translate thousands of transactions into a compact picture of performance and condition. That compression creates value, but it also creates places where classification, timing, estimates, and related entities can conceal economic reality.\n\nThe necessary discipline is to reconcile earnings with cash, assets, liabilities, capitalization, and conservative valuation across several periods. Earnings should be reconciled with cash, journal entries with source documents, balances with independent counterparties, and control claims with actual access. Transactions that remove an item from one statement may leave guarantees, ownership, or risk elsewhere in the enterprise.\n\nFraud rarely announces itself as an unbalanced ledger. It often uses balanced entries, approved forms, and sophisticated structures whose assumptions are distributed across footnotes and entities. The decisive question is whether the reported accounting follows the substance of who controls assets, bears losses, and receives benefits.\n\nThe financial lesson is reported profit is informative only when the underlying balance sheet and cash generation support it. Numbers become trustworthy when their economic counterparts can be located outside management’s narrative. A confirmation that never returns is evidence requiring escalation, not an administrative inconvenience. Targets and compensation should be treated as part of the control environment because they shape reporting pressure. A confirmation that never returns is evidence requiring escalation, not an administrative inconvenience.",
      "frame": "Places a journal entry beside an unanswered confirmation. \"At The Auditor's Workroom, both columns balance. Tell me what reading the financial statements still requires.\"",
      "q": [
        {
          "q": "Which accounting statement best describes Benjamin Graham’s contribution to reading the financial statements?",
          "o": [
            {
              "t": "Benjamin Graham made reading the financial statements depend on reconciliation with cash, control, obligations, and independent counterparties. It remains checkable in the case file in the case file.",
              "v": "expert",
              "fb": "Correct: reliable accounting connects entries with assets, cash, control, and independent evidence."
            },
            {
              "t": "Benjamin Graham treated reading the financial statements as reliable whenever the ledger balanced and management approved the entries. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Double entry can balance perfectly even when both sides describe an invented transaction."
            },
            {
              "t": "Benjamin Graham let an audit signature settle reading the financial statements without locating the claimed economic transaction. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "An audit opinion does not transfer management’s assertions into independently verified facts."
            },
            {
              "t": "Benjamin Graham used hostile market commentary about reading the financial statements as the complete explanation for missing value. The conclusion shapes which records receive attention.",
              "v": "danger",
              "fb": "Market pressure can reveal a weakness, but it cannot explain missing economic resources by itself."
            }
          ]
        },
        {
          "q": "Which examination step best applies the method taught in the profile?",
          "o": [
            {
              "t": "Trace unusual balances through journals, contracts, confirmations, cash movement, ownership, and guarantees. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Yes: forensic work follows a number outward until the claimed economic event can be located."
            },
            {
              "t": "Recalculate the reported totals accurately, but accept management's labels for every related entity. The missing record is treated as a minor limitation.",
              "v": "partial",
              "fb": "Arithmetic accuracy does not establish the substance or ownership of the transaction."
            },
            {
              "t": "Confirm disputed balances mainly with company employees because outsiders may misunderstand the structure. The account leans heavily on prior reputation.",
              "v": "wrong",
              "fb": "Independent confirmation matters precisely because internal records may repeat the same assertion."
            },
            {
              "t": "Investigate short-seller motives first, while postponing tests of transactions lacking independent cash. The preferred narrative sets the order of review.",
              "v": "danger",
              "fb": "The critic’s incentives do not remove the need to reconcile the questioned balance."
            }
          ]
        },
        {
          "q": "Which financial-reporting principle follows from reading the financial statements?",
          "o": [
            {
              "t": "Financial form should never conceal who controls an asset, receives its benefit, or bears its loss. Others can retrace it under the documented sequence in the case file.",
              "v": "expert",
              "fb": "Exactly: economic substance connects the ledger to control, obligation, and cash."
            },
            {
              "t": "Detailed footnotes should cure misleading statements even when readers does not connect the related entities. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Disclosure helps only when it permits users to understand the effect on the primary statements."
            },
            {
              "t": "Consistent earnings growth should outweigh cash flow because markets mainly value future performance. The explanation treats the conflicting record as secondary in the case file.",
              "v": "wrong",
              "fb": "Earnings can be estimated or shifted; cash and obligations provide independent constraints."
            },
            {
              "t": "The company is treated as fundamentally sound or destroyed largely by hostile traders and publicity. The critic replaces the ledger test in the dated record in the case file.",
              "v": "danger",
              "fb": "A narrower accounting mechanism can explain collapse without accepting either extreme story."
            }
          ]
        }
      ]
    },
    "bezzle": {
      "sci": "John Kenneth Galbraith (1908-2006)",
      "topic": "The crash & 'the bezzle'",
      "lede": "John Kenneth Galbraith treated the crash and ’the bezzle’ as a reconciliation problem no polished earnings story could settle.",
      "no": 5,
      "profile": "Today’s ledger briefing introduces John Kenneth Galbraith through the accounting problem of the crash and ’the bezzle’. John Kenneth Galbraith called the period when embezzlement remains undiscovered 'the bezzle,' a temporary psychic wealth enjoyed by both thief and victim. Corporate reports translate thousands of transactions into a compact picture of performance and condition. That compression creates value, but it also creates places where classification, timing, estimates, and related entities can conceal economic reality.\n\nThe necessary discipline is to look for gaps between reported assets and independently verifiable control before losses force recognition. Earnings should be reconciled with cash, journal entries with source documents, balances with independent counterparties, and control claims with actual access. Transactions that remove an item from one statement may leave guarantees, ownership, or risk elsewhere in the enterprise.\n\nFraud rarely announces itself as an unbalanced ledger. It often uses balanced entries, approved forms, and sophisticated structures whose assumptions are distributed across footnotes and entities. The decisive question is whether the reported accounting follows the substance of who controls assets, bears losses, and receives benefits.\n\nThe financial lesson is fraud can appear to create wealth while discovery is delayed, making prosperous periods especially deceptive. Numbers become trustworthy when their economic counterparts can be located outside management’s narrative. A confirmation that never returns is evidence requiring escalation, not an administrative inconvenience. Targets and compensation should be treated as part of the control environment because they shape reporting pressure. A confirmation that never returns is evidence requiring escalation, not an administrative inconvenience.",
      "frame": "Locks the partnership binder. \"Follow the number outside the ledger. Begin with the crash and ’the bezzle’.\"",
      "q": [
        {
          "q": "Which accounting statement best describes John Kenneth Galbraith’s contribution to the crash and ’the bezzle’?",
          "o": [
            {
              "t": "John Kenneth Galbraith made the crash and ’the bezzle’ depend on reconciliation with cash, control, obligations, and independent counterparties. It remains checkable in the case file in the case file.",
              "v": "expert",
              "fb": "Correct: reliable accounting connects entries with assets, cash, control, and independent evidence."
            },
            {
              "t": "John Kenneth Galbraith treated the crash and ’the bezzle’ as reliable whenever the ledger balanced and management approved the entries. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Double entry can balance perfectly even when both sides describe an invented transaction."
            },
            {
              "t": "John Kenneth Galbraith let an audit signature settle the crash and ’the bezzle’ without locating the claimed economic transaction. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "An audit opinion does not transfer management’s assertions into independently verified facts."
            },
            {
              "t": "John Kenneth Galbraith used hostile market commentary about the crash and ’the bezzle’ as the complete explanation for missing value. The conclusion shapes which records receive attention.",
              "v": "danger",
              "fb": "Market pressure can reveal a weakness, but it cannot explain missing economic resources by itself."
            }
          ]
        },
        {
          "q": "Which examination step best applies the method taught in the profile?",
          "o": [
            {
              "t": "Trace unusual balances through journals, contracts, confirmations, cash movement, ownership, and guarantees. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Yes: forensic work follows a number outward until the claimed economic event can be located."
            },
            {
              "t": "Recalculate the reported totals accurately, but accept management's labels for every related entity. The missing record is treated as a minor limitation.",
              "v": "partial",
              "fb": "Arithmetic accuracy does not establish the substance or ownership of the transaction."
            },
            {
              "t": "Confirm disputed balances mainly with company employees because outsiders may misunderstand the structure. The account leans heavily on prior reputation.",
              "v": "wrong",
              "fb": "Independent confirmation matters precisely because internal records may repeat the same assertion."
            },
            {
              "t": "Investigate short-seller motives first, while postponing tests of transactions lacking independent cash. The preferred narrative sets the order of review.",
              "v": "danger",
              "fb": "The critic’s incentives do not remove the need to reconcile the questioned balance."
            }
          ]
        },
        {
          "q": "Which financial-reporting principle follows from the crash and ’the bezzle’?",
          "o": [
            {
              "t": "Financial form should never conceal who controls an asset, receives its benefit, or bears its loss. Others can retrace it under the documented sequence in the case file.",
              "v": "expert",
              "fb": "Exactly: economic substance connects the ledger to control, obligation, and cash."
            },
            {
              "t": "Detailed footnotes should cure misleading statements even when readers does not connect the related entities. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Disclosure helps only when it permits users to understand the effect on the primary statements."
            },
            {
              "t": "Consistent earnings growth should outweigh cash flow because markets mainly value future performance. The explanation treats the conflicting record as secondary in the case file.",
              "v": "wrong",
              "fb": "Earnings can be estimated or shifted; cash and obligations provide independent constraints."
            },
            {
              "t": "The company is treated as fundamentally sound or destroyed largely by hostile traders and publicity. The critic replaces the ledger test in the dated record in the case file.",
              "v": "danger",
              "fb": "A narrower accounting mechanism can explain collapse without accepting either extreme story."
            }
          ]
        }
      ]
    },
    "creative": {
      "sci": "Abraham Briloff (1917-2013)",
      "topic": "Unaccountable, creative accounting",
      "lede": "The ledger had to meet economic reality in Abraham Briloff's work on unaccountable, creative accounting.",
      "no": 6,
      "profile": "Today’s ledger briefing introduces Abraham Briloff through the accounting problem of unaccountable, creative accounting. Abraham Briloff publicly challenged misleading accounting and audit practices, using detailed company reports to expose how formal rules could disguise economic reality. Corporate reports translate thousands of transactions into a compact picture of performance and condition. That compression creates value, but it also creates places where classification, timing, estimates, and related entities can conceal economic reality.\n\nThe necessary discipline is to read footnotes, related transactions, changes in policy, and auditor relationships with adversarial attention. Earnings should be reconciled with cash, journal entries with source documents, balances with independent counterparties, and control claims with actual access. Transactions that remove an item from one statement may leave guarantees, ownership, or risk elsewhere in the enterprise.\n\nFraud rarely announces itself as an unbalanced ledger. It often uses balanced entries, approved forms, and sophisticated structures whose assumptions are distributed across footnotes and entities. The decisive question is whether the reported accounting follows the substance of who controls assets, bears losses, and receives benefits.\n\nThe financial lesson is creative accounting succeeds when users stop at compliant form and never test economic substance. Numbers become trustworthy when their economic counterparts can be located outside management’s narrative. A confirmation that never returns is evidence requiring escalation, not an administrative inconvenience. Targets and compensation should be treated as part of the control environment because they shape reporting pressure. A confirmation that never returns is evidence requiring escalation, not an administrative inconvenience. Targets and compensation should be treated as part of the control environment because they shape reporting pressure.",
      "frame": "Turns to the footnotes. \"The loss moved; it did not vanish. Show me you understand unaccountable, creative accounting.\"",
      "q": [
        {
          "q": "Which accounting statement best describes Abraham Briloff’s contribution to unaccountable, creative accounting?",
          "o": [
            {
              "t": "Abraham Briloff made unaccountable, creative accounting depend on reconciliation with cash, control, obligations, and independent counterparties. It remains checkable in the case file in the case file.",
              "v": "expert",
              "fb": "Correct: reliable accounting connects entries with assets, cash, control, and independent evidence."
            },
            {
              "t": "Abraham Briloff treated unaccountable, creative accounting as reliable whenever the ledger balanced and management approved the entries. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Double entry can balance perfectly even when both sides describe an invented transaction."
            },
            {
              "t": "Abraham Briloff let an audit signature settle unaccountable, creative accounting without locating the claimed economic transaction. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "An audit opinion does not transfer management’s assertions into independently verified facts."
            },
            {
              "t": "Abraham Briloff used hostile market commentary about unaccountable, creative accounting as the complete explanation for missing value. The conclusion shapes which records receive attention.",
              "v": "danger",
              "fb": "Market pressure can reveal a weakness, but it cannot explain missing economic resources by itself."
            }
          ]
        },
        {
          "q": "Which examination step best applies the method taught in the profile?",
          "o": [
            {
              "t": "Trace unusual balances through journals, contracts, confirmations, cash movement, ownership, and guarantees. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Yes: forensic work follows a number outward until the claimed economic event can be located."
            },
            {
              "t": "Recalculate the reported totals accurately, but accept management's labels for every related entity. The missing record is treated as a minor limitation.",
              "v": "partial",
              "fb": "Arithmetic accuracy does not establish the substance or ownership of the transaction."
            },
            {
              "t": "Confirm disputed balances mainly with company employees because outsiders may misunderstand the structure. The account leans heavily on prior reputation.",
              "v": "wrong",
              "fb": "Independent confirmation matters precisely because internal records may repeat the same assertion."
            },
            {
              "t": "Investigate short-seller motives first, while postponing tests of transactions lacking independent cash. The preferred narrative sets the order of review.",
              "v": "danger",
              "fb": "The critic’s incentives do not remove the need to reconcile the questioned balance."
            }
          ]
        },
        {
          "q": "Which financial-reporting principle follows from unaccountable, creative accounting?",
          "o": [
            {
              "t": "Financial form should never conceal who controls an asset, receives its benefit, or bears its loss. Others can retrace it under the documented sequence in the case file.",
              "v": "expert",
              "fb": "Exactly: economic substance connects the ledger to control, obligation, and cash."
            },
            {
              "t": "Detailed footnotes should cure misleading statements even when readers does not connect the related entities. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Disclosure helps only when it permits users to understand the effect on the primary statements."
            },
            {
              "t": "Consistent earnings growth should outweigh cash flow because markets mainly value future performance. The explanation treats the conflicting record as secondary in the case file.",
              "v": "wrong",
              "fb": "Earnings can be estimated or shifted; cash and obligations provide independent constraints."
            },
            {
              "t": "The company is treated as fundamentally sound or destroyed largely by hostile traders and publicity. The critic replaces the ledger test in the dated record in the case file.",
              "v": "danger",
              "fb": "A narrower accounting mechanism can explain collapse without accepting either extreme story."
            }
          ]
        }
      ]
    },
    "asymmetry": {
      "sci": "George Akerlof (b. 1940)",
      "topic": "Asymmetric information & 'lemons'",
      "lede": "George Akerlof followed asymmetric information and ’lemons’ from reported figures to cash, control, and the counterparties behind them.",
      "no": 7,
      "profile": "Today’s ledger briefing introduces George Akerlof through the accounting problem of asymmetric information and ’lemons’. George Akerlof's market for 'lemons' showed how sellers' superior information about quality can drive good products from a market. Corporate reports translate thousands of transactions into a compact picture of performance and condition. That compression creates value, but it also creates places where classification, timing, estimates, and related entities can conceal economic reality.\n\nThe necessary discipline is to identify who knows asset quality, what signals can be verified, and how distrust changes price and participation. Earnings should be reconciled with cash, journal entries with source documents, balances with independent counterparties, and control claims with actual access. Transactions that remove an item from one statement may leave guarantees, ownership, or risk elsewhere in the enterprise.\n\nFraud rarely announces itself as an unbalanced ledger. It often uses balanced entries, approved forms, and sophisticated structures whose assumptions are distributed across footnotes and entities. The decisive question is whether the reported accounting follows the substance of who controls assets, bears losses, and receives benefits.\n\nThe financial lesson is information gaps can damage an entire market even when only some sellers conceal poor quality. Numbers become trustworthy when their economic counterparts can be located outside management’s narrative. A confirmation that never returns is evidence requiring escalation, not an administrative inconvenience. Targets and compensation should be treated as part of the control environment because they shape reporting pressure. A confirmation that never returns is evidence requiring escalation, not an administrative inconvenience.",
      "frame": "Places a journal entry beside an unanswered confirmation. \"At The Off-Books Partnership Files, both columns balance. Tell me what asymmetric information and ’lemons’ still requires.\"",
      "q": [
        {
          "q": "Which accounting statement best describes George Akerlof’s contribution to asymmetric information and ’lemons’?",
          "o": [
            {
              "t": "George Akerlof made asymmetric information and ’lemons’ depend on reconciliation with cash, control, obligations, and independent counterparties. It remains checkable in the case file in the case file.",
              "v": "expert",
              "fb": "Correct: reliable accounting connects entries with assets, cash, control, and independent evidence."
            },
            {
              "t": "George Akerlof treated asymmetric information and ’lemons’ as reliable whenever the ledger balanced and management approved the entries. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Double entry can balance perfectly even when both sides describe an invented transaction."
            },
            {
              "t": "George Akerlof let an audit signature settle asymmetric information and ’lemons’ without locating the claimed economic transaction. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "An audit opinion does not transfer management’s assertions into independently verified facts."
            },
            {
              "t": "George Akerlof used hostile market commentary about asymmetric information and ’lemons’ as the complete explanation for missing value. The conclusion shapes which records receive attention.",
              "v": "danger",
              "fb": "Market pressure can reveal a weakness, but it cannot explain missing economic resources by itself."
            }
          ]
        },
        {
          "q": "Which examination step best applies the method taught in the profile?",
          "o": [
            {
              "t": "Trace unusual balances through journals, contracts, confirmations, cash movement, ownership, and guarantees. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Yes: forensic work follows a number outward until the claimed economic event can be located."
            },
            {
              "t": "Recalculate the reported totals accurately, but accept management's labels for every related entity. The missing record is treated as a minor limitation.",
              "v": "partial",
              "fb": "Arithmetic accuracy does not establish the substance or ownership of the transaction."
            },
            {
              "t": "Confirm disputed balances mainly with company employees because outsiders may misunderstand the structure. The account leans heavily on prior reputation.",
              "v": "wrong",
              "fb": "Independent confirmation matters precisely because internal records may repeat the same assertion."
            },
            {
              "t": "Investigate short-seller motives first, while postponing tests of transactions lacking independent cash. The preferred narrative sets the order of review.",
              "v": "danger",
              "fb": "The critic’s incentives do not remove the need to reconcile the questioned balance."
            }
          ]
        },
        {
          "q": "Which financial-reporting principle follows from asymmetric information and ’lemons’?",
          "o": [
            {
              "t": "Financial form should never conceal who controls an asset, receives its benefit, or bears its loss. Others can retrace it under the documented sequence in the case file.",
              "v": "expert",
              "fb": "Exactly: economic substance connects the ledger to control, obligation, and cash."
            },
            {
              "t": "Detailed footnotes should cure misleading statements even when readers does not connect the related entities. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Disclosure helps only when it permits users to understand the effect on the primary statements."
            },
            {
              "t": "Consistent earnings growth should outweigh cash flow because markets mainly value future performance. The explanation treats the conflicting record as secondary in the case file.",
              "v": "wrong",
              "fb": "Earnings can be estimated or shifted; cash and obligations provide independent constraints."
            },
            {
              "t": "The company is treated as fundamentally sound or destroyed largely by hostile traders and publicity. The critic replaces the ledger test in the dated record in the case file.",
              "v": "danger",
              "fb": "A narrower accounting mechanism can explain collapse without accepting either extreme story."
            }
          ]
        }
      ]
    },
    "shenanigans": {
      "sci": "Howard Schilit (forensic-accounting author)",
      "topic": "Financial shenanigans",
      "lede": "Howard Schilit treated financial shenanigans as a reconciliation problem no polished earnings story could settle.",
      "no": 8,
      "profile": "Today’s ledger briefing introduces Howard Schilit through the accounting problem of financial shenanigans. Howard Schilit systematized warning signs of financial manipulation, including premature revenue, shifted expenses, nonrecurring gains, and misleading cash-flow presentation. Corporate reports translate thousands of transactions into a compact picture of performance and condition. That compression creates value, but it also creates places where classification, timing, estimates, and related entities can conceal economic reality.\n\nThe necessary discipline is to compare statements across periods, follow classification changes, and reconcile management metrics with standardized accounts. Earnings should be reconciled with cash, journal entries with source documents, balances with independent counterparties, and control claims with actual access. Transactions that remove an item from one statement may leave guarantees, ownership, or risk elsewhere in the enterprise.\n\nFraud rarely announces itself as an unbalanced ledger. It often uses balanced entries, approved forms, and sophisticated structures whose assumptions are distributed across footnotes and entities. The decisive question is whether the reported accounting follows the substance of who controls assets, bears losses, and receives benefits.\n\nThe financial lesson is fraud detection improves when recurring patterns are translated into specific tests rather than vague suspicion. Numbers become trustworthy when their economic counterparts can be located outside management’s narrative. A confirmation that never returns is evidence requiring escalation, not an administrative inconvenience. Targets and compensation should be treated as part of the control environment because they shape reporting pressure. A confirmation that never returns is evidence requiring escalation, not an administrative inconvenience. Targets and compensation should be treated as part of the control environment because they shape reporting pressure.",
      "frame": "Locks the partnership binder. \"Follow the number outside the ledger. Begin with financial shenanigans.\"",
      "q": [
        {
          "q": "Which accounting statement best describes Howard Schilit’s contribution to financial shenanigans?",
          "o": [
            {
              "t": "Howard Schilit made financial shenanigans depend on reconciliation with cash, control, obligations, and independent counterparties. It remains checkable in the case file in the case file.",
              "v": "expert",
              "fb": "Correct: reliable accounting connects entries with assets, cash, control, and independent evidence."
            },
            {
              "t": "Howard Schilit treated financial shenanigans as reliable whenever the ledger balanced and management approved the entries. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Double entry can balance perfectly even when both sides describe an invented transaction."
            },
            {
              "t": "Howard Schilit let an audit signature settle financial shenanigans without locating the claimed economic transaction. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "An audit opinion does not transfer management’s assertions into independently verified facts."
            },
            {
              "t": "Howard Schilit used hostile market commentary about financial shenanigans as the complete explanation for missing value. The conclusion shapes which records receive attention.",
              "v": "danger",
              "fb": "Market pressure can reveal a weakness, but it cannot explain missing economic resources by itself."
            }
          ]
        },
        {
          "q": "Which examination step best applies the method taught in the profile?",
          "o": [
            {
              "t": "Trace unusual balances through journals, contracts, confirmations, cash movement, ownership, and guarantees. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Yes: forensic work follows a number outward until the claimed economic event can be located."
            },
            {
              "t": "Recalculate the reported totals accurately, but accept management's labels for every related entity. The missing record is treated as a minor limitation.",
              "v": "partial",
              "fb": "Arithmetic accuracy does not establish the substance or ownership of the transaction."
            },
            {
              "t": "Confirm disputed balances mainly with company employees because outsiders may misunderstand the structure. The account leans heavily on prior reputation.",
              "v": "wrong",
              "fb": "Independent confirmation matters precisely because internal records may repeat the same assertion."
            },
            {
              "t": "Investigate short-seller motives first, while postponing tests of transactions lacking independent cash. The preferred narrative sets the order of review.",
              "v": "danger",
              "fb": "The critic’s incentives do not remove the need to reconcile the questioned balance."
            }
          ]
        },
        {
          "q": "Which financial-reporting principle follows from financial shenanigans?",
          "o": [
            {
              "t": "Financial form should never conceal who controls an asset, receives its benefit, or bears its loss. Others can retrace it under the documented sequence in the case file.",
              "v": "expert",
              "fb": "Exactly: economic substance connects the ledger to control, obligation, and cash."
            },
            {
              "t": "Detailed footnotes should cure misleading statements even when readers does not connect the related entities. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Disclosure helps only when it permits users to understand the effect on the primary statements."
            },
            {
              "t": "Consistent earnings growth should outweigh cash flow because markets mainly value future performance. The explanation treats the conflicting record as secondary in the case file.",
              "v": "wrong",
              "fb": "Earnings can be estimated or shifted; cash and obligations provide independent constraints."
            },
            {
              "t": "The company is treated as fundamentally sound or destroyed largely by hostile traders and publicity. The critic replaces the ledger test in the dated record in the case file.",
              "v": "danger",
              "fb": "A narrower accounting mechanism can explain collapse without accepting either extreme story."
            }
          ]
        }
      ]
    },
    "internalaudit": {
      "sci": "Cynthia Cooper (WorldCom internal auditor)",
      "topic": "The internal auditor's discovery",
      "lede": "The ledger had to meet economic reality in Cynthia Cooper's work on the internal auditor’s discovery.",
      "no": 9,
      "profile": "Today’s ledger briefing introduces Cynthia Cooper through the accounting problem of the internal auditor’s discovery. Cynthia Cooper and her WorldCom internal-audit team uncovered billions in improper capitalization of ordinary line costs despite management resistance. Corporate reports translate thousands of transactions into a compact picture of performance and condition. That compression creates value, but it also creates places where classification, timing, estimates, and related entities can conceal economic reality.\n\nThe necessary discipline is to test journal entries, trace expenses to invoices and accounts, work independently of management pressure, and preserve findings. Earnings should be reconciled with cash, journal entries with source documents, balances with independent counterparties, and control claims with actual access. Transactions that remove an item from one statement may leave guarantees, ownership, or risk elsewhere in the enterprise.\n\nFraud rarely announces itself as an unbalanced ledger. It often uses balanced entries, approved forms, and sophisticated structures whose assumptions are distributed across footnotes and entities. The decisive question is whether the reported accounting follows the substance of who controls assets, bears losses, and receives benefits.\n\nThe financial lesson is internal audit can expose senior misconduct when access, persistence, and professional independence survive intimidation. Numbers become trustworthy when their economic counterparts can be located outside management’s narrative. A confirmation that never returns is evidence requiring escalation, not an administrative inconvenience. Targets and compensation should be treated as part of the control environment because they shape reporting pressure. A confirmation that never returns is evidence requiring escalation, not an administrative inconvenience. Targets and compensation should be treated as part of the control environment because they shape reporting pressure.",
      "frame": "Turns to the footnotes. \"The loss moved; it did not vanish. Show me you understand the internal auditor’s discovery.\"",
      "q": [
        {
          "q": "Which accounting statement best describes Cynthia Cooper’s contribution to the internal auditor’s discovery?",
          "o": [
            {
              "t": "Cynthia Cooper made the internal auditor’s discovery depend on reconciliation with cash, control, obligations, and independent counterparties. It remains checkable in the case file in the case file.",
              "v": "expert",
              "fb": "Correct: reliable accounting connects entries with assets, cash, control, and independent evidence."
            },
            {
              "t": "Cynthia Cooper treated the internal auditor’s discovery as reliable whenever the ledger balanced and management approved the entries. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Double entry can balance perfectly even when both sides describe an invented transaction."
            },
            {
              "t": "Cynthia Cooper let an audit signature settle the internal auditor’s discovery without locating the claimed economic transaction. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "An audit opinion does not transfer management’s assertions into independently verified facts."
            },
            {
              "t": "Cynthia Cooper used hostile market commentary about the internal auditor’s discovery as the complete explanation for missing value. The conclusion shapes which records receive attention.",
              "v": "danger",
              "fb": "Market pressure can reveal a weakness, but it cannot explain missing economic resources by itself."
            }
          ]
        },
        {
          "q": "Which examination step best applies the method taught in the profile?",
          "o": [
            {
              "t": "Trace unusual balances through journals, contracts, confirmations, cash movement, ownership, and guarantees. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Yes: forensic work follows a number outward until the claimed economic event can be located."
            },
            {
              "t": "Recalculate the reported totals accurately, but accept management's labels for every related entity. The missing record is treated as a minor limitation.",
              "v": "partial",
              "fb": "Arithmetic accuracy does not establish the substance or ownership of the transaction."
            },
            {
              "t": "Confirm disputed balances mainly with company employees because outsiders may misunderstand the structure. The account leans heavily on prior reputation.",
              "v": "wrong",
              "fb": "Independent confirmation matters precisely because internal records may repeat the same assertion."
            },
            {
              "t": "Investigate short-seller motives first, while postponing tests of transactions lacking independent cash. The preferred narrative sets the order of review.",
              "v": "danger",
              "fb": "The critic’s incentives do not remove the need to reconcile the questioned balance."
            }
          ]
        },
        {
          "q": "Which financial-reporting principle follows from the internal auditor’s discovery?",
          "o": [
            {
              "t": "Financial form should never conceal who controls an asset, receives its benefit, or bears its loss. Others can retrace it under the documented sequence in the case file.",
              "v": "expert",
              "fb": "Exactly: economic substance connects the ledger to control, obligation, and cash."
            },
            {
              "t": "Detailed footnotes should cure misleading statements even when readers does not connect the related entities. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Disclosure helps only when it permits users to understand the effect on the primary statements."
            },
            {
              "t": "Consistent earnings growth should outweigh cash flow because markets mainly value future performance. The explanation treats the conflicting record as secondary in the case file.",
              "v": "wrong",
              "fb": "Earnings can be estimated or shifted; cash and obligations provide independent constraints."
            },
            {
              "t": "The company is treated as fundamentally sound or destroyed largely by hostile traders and publicity. The critic replaces the ledger test in the dated record in the case file.",
              "v": "danger",
              "fb": "A narrower accounting mechanism can explain collapse without accepting either extreme story."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "controller": {
      "trading": "Assistant Controller Pia Voss meets you at the trading floor beside a ledger entry that balances against an entity no one can independently reach. \"Booked the entries; the same losses kept moving to partnerships she couldn't see. The accounting moved the loss; the economics kept it.\"",
      "auditroom": "Assistant Controller Pia Voss meets you at the auditor's workroom beside a ledger entry that balances against an entity no one can independently reach. \"Booked the entries; the same losses kept moving to partnerships she couldn't see. The accounting moved the loss; the economics kept it.\"",
      "spes": "Assistant Controller Pia Voss meets you at the off-books partnership files beside a ledger entry that balances against an entity no one can independently reach. \"Booked the entries; the same losses kept moving to partnerships she couldn't see. The accounting moved the loss; the economics kept it.\""
    },
    "junioraudit": {
      "trading": "The Junior Auditor meets you at the trading floor beside a ledger entry that balances against an entity no one can independently reach. \"Ticked the confirmations; the partnership balances never confirmed back. The accounting moved the loss; the economics kept it.\"",
      "auditroom": "The Junior Auditor meets you at the auditor's workroom beside a ledger entry that balances against an entity no one can independently reach. \"Ticked the confirmations; the partnership balances never confirmed back. The accounting moved the loss; the economics kept it.\"",
      "spes": "The Junior Auditor meets you at the off-books partnership files beside a ledger entry that balances against an entity no one can independently reach. \"Ticked the confirmations; the partnership balances never confirmed back. The accounting moved the loss; the economics kept it.\""
    },
    "trader": {
      "trading": "Desk Trader Okonkwo meets you at the trading floor beside a ledger entry that balances against an entity no one can independently reach. \"Marked the book to models no one outside could check. The accounting moved the loss; the economics kept it.\"",
      "auditroom": "Desk Trader Okonkwo meets you at the auditor's workroom beside a ledger entry that balances against an entity no one can independently reach. \"Marked the book to models no one outside could check. The accounting moved the loss; the economics kept it.\"",
      "spes": "Desk Trader Okonkwo meets you at the off-books partnership files beside a ledger entry that balances against an entity no one can independently reach. \"Marked the book to models no one outside could check. The accounting moved the loss; the economics kept it.\""
    }
  },
  "story": [
    "<b>The Amberline Collapse</b> opens inside the Amberline bankruptcy examination, where the public explanation has hardened faster than the evidence.",
    "<b>Assistant Controller Pia Voss</b>, <b>The Junior Auditor</b>, and <b>Desk Trader Okonkwo</b> hold different parts of the record, and every conversation begins with one real figure whose work teaches you how to read it.",
    "The case keeps pulling investigators toward <b>A short-seller raid sank a sound company</b> or <b>Nothing wrong — just the market turning</b>. Both are plausible enough to survive a headline; neither should survive the full dossier untested.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide the <b>WHAT</b> for yourself."
  ],
  "endings": {
    "overclaimWhat": "raid",
    "dismissalWhat": "cycle",
    "win": {
      "expertTitle": "The Losses Never Left the Company",
      "expert": [
        "You identify <b>Julian Frael — the chief financial officer</b>, locate the controlling records in <b>The Off-Books Partnership Files</b>, and prove <b>Losses hidden in off-books entities</b>. Not a short-seller raid sank a sound company. Not nothing wrong — just the market turning.",
        "The partnerships carried losses in form while Amberline retained guarantees, influence, and economic exposure. The CFO used related entities to manufacture reported health until cash and creditors forced recognition."
      ],
      "soundTitle": "The Off-Books Structure Is Rejoined",
      "sound": [
        "You correctly connect <b>Julian Frael — the chief financial officer</b>, <b>The Off-Books Partnership Files</b>, and <b>Losses hidden in off-books entities</b>. Partnership files and failed confirmations support the finding.",
        "Your report does not value every transferred position, but it shows that the company’s public statements omitted risks it continued to bear."
      ],
      "namedTitle": "The Missing Side of the Ledger",
      "named": [
        "You select the correct answer: <b>Julian Frael — the chief financial officer</b>, <b>The Off-Books Partnership Files</b>, and <b>Losses hidden in off-books entities</b>.",
        "The accounting explanation is compressed, yet it points directly to the guarantees, ownership links, and journal entries needed for a complete restatement."
      ]
    },
    "overclaim": {
      "title": "The Short Seller as Alibi",
      "body": [
        "You choose <b>A short-seller raid sank a sound company</b>, explaining collapse through hostile traders while leaving related-party balances unreconciled.",
        "A falling share price revealed urgency but did not create the hidden obligations. Your accusation converts the market critic into an excuse for the executive who structured the entities."
      ]
    },
    "dismissal": {
      "title": "A Cycle Cannot Sign a Guarantee",
      "body": [
        "Your finding adopts <b>Nothing wrong — just the market turning</b>, as though ordinary market decline explains why losses were transferred to partnerships under continuing company support.",
        "That answer erases deliberate accounting choices and leaves auditors and boards unable to distinguish cyclical weakness from concealed exposure next time."
      ]
    },
    "wrongNames": {
      "title": "The Structure Found, the CFO Missed",
      "body": [
        "You recognize <b>Losses hidden in off-books entities</b>, but accuse the wrong corporate officer or place the decisive evidence in the audit room rather than the partnership files. The control chain leads instead to"
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A ledger connected to hidden off-book entities\"><path d=\"M48 28 L272 28 L272 112 L48 112 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M72 48 L248 48 M72 66 L248 66 M72 84 L248 84\" stroke=\"#e2e2d8\" stroke-width=\"1.2\"/><path d=\"M114 28 L114 112\" stroke=\"#121212\" stroke-width=\"1.2\"/><path d=\"M272 70 L366 70\" stroke=\"#326891\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><circle cx=\"414\" cy=\"44\" r=\"22\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><circle cx=\"500\" cy=\"70\" r=\"22\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><circle cx=\"414\" cy=\"98\" r=\"22\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M436 50 L478 64 M436 92 L478 76\" stroke=\"#B3261E\" stroke-width=\"2\"/></svg>"
}};
