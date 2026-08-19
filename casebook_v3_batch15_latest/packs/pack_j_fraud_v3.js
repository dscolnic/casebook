// Casebook V3 — three informants, three readings, one clue per correct answer.
module.exports = { PACK: {
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "j_fraud",
  "title": "The Amberline Collapse",
  "discipline": "Accounting & Corporate Finance",
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
  "teaser": "Amberline falls from market darling to insolvency after analysts question opaque partnerships. Did short sellers destroy a sound company, did a normal commodity reversal expose ordinary risk, or did the chief financial officer move losses into entities kept beyond meaningful audit?",
  "overclaimTag": "a coordinated short-selling attack",
  "truthTag": "losses concealed through controlled off-books entities",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A balanced ledger feeding losses into hidden partnership files\"><path d=\"M60 28 h210 v84 H60z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M85 50 h160 M85 70 h160 M85 90 h160\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><path d=\"M270 70 h105\" stroke=\"#B3261E\" stroke-width=\"3\"/><path d=\"M350 58 l14 12-14 12\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"3\"/><path d=\"M405 34 h145 l25 24 v54 H405z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M550 34 v26 h25\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/></svg>",
  "overclaimTease": "A market attack can lower a price, but it cannot manufacture journal entries, side letters, and unconsolidated obligations. Reconcile the ledgers before blaming the messenger or the cycle.",
  "DAYS_TOTAL": 3,
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "cfo",
      "items": [
        {
          "id": "cfo",
          "label": "Julian Frael — the chief financial officer"
        },
        {
          "id": "auditor",
          "label": "The outside audit partner"
        },
        {
          "id": "ceo",
          "label": "The chief executive"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "auditroom",
      "items": [
        {
          "id": "trading",
          "label": "The Energy Trading Floor"
        },
        {
          "id": "auditroom",
          "label": "The Auditor’s Confirmation Workroom"
        },
        {
          "id": "spes",
          "label": "The Partnership & Side-Letter Files"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "offbooks",
      "items": [
        {
          "id": "cycle",
          "label": "A normal commodity reversal exposed disclosed trading risk"
        },
        {
          "id": "offbooks",
          "label": "Controlled partnerships carried losses omitted from the group accounts"
        },
        {
          "id": "raid",
          "label": "A coordinated short-selling campaign destroyed a solvent company"
        }
      ]
    }
  },
  "READING_ORDER": [
    "controller",
    "junioraudit",
    "trader"
  ],
  "CHARACTERS": {
    "controller": {
      "name": "Assistant Controller Pia Voss",
      "role": "Assistant controller",
      "face": "🧮",
      "badge": "V",
      "legend": "the consolidation desk",
      "hint": "Losses leave the trading book through entries that only the chief financial officer can approve.",
      "reading": "pacioli"
    },
    "junioraudit": {
      "name": "The Junior Auditor",
      "role": "Audit-team junior",
      "face": "🗂",
      "badge": "A",
      "legend": "the confirmation room",
      "hint": "Partnership balances do not confirm independently, and side letters return to one executive mailbox.",
      "reading": "montgomery"
    },
    "trader": {
      "name": "Desk Trader Okonkwo",
      "role": "Energy-desk trader",
      "face": "📈",
      "badge": "O",
      "legend": "the valuation screen",
      "hint": "Market prices explain some losses, but the public accounts omit the entities holding the largest positions.",
      "reading": "watkins"
    }
  },
  "TOPICS": {
    "pacioli": {
      "sci": "Luca Pacioli (c. 1447-1517)",
      "topic": "Double-entry bookkeeping",
      "lede": "Pacioli showed how every transaction leaves a paired trail, even when a balanced ledger is used to conceal economic truth.",
      "no": 1,
      "profile": "Luca Pacioli was a Franciscan friar, mathematician, teacher, and prolific compiler of practical knowledge in Renaissance Italy. His 1494 book Summa de arithmetica included the first printed description of the Venetian method of double-entry bookkeeping. Merchants had used related methods earlier, but Pacioli organized the practice into a teachable system of journals, ledgers, debits, credits, inventories, and periodic balancing.\n\nDouble entry records each transaction in at least two places so that resources and claims remain connected. Buying goods for cash increases inventory while reducing cash; borrowing increases cash and a liability. The equality of debits and credits does not guarantee honesty. A false transaction can balance perfectly. The strength of the system is traceability: entries should correspond to real counterparties, assets, obligations, and documents.\n\nConsolidated reporting extends that logic across a group. If one company controls another entity or bears its risks, moving a loss into the affiliate does not make the economic loss disappear. Investigators follow reciprocal entries, guarantees, related-party balances, and cash flows to determine whether the boundary of the reported company reflects reality.\n\nAmberline’s ledgers balance because each trading loss is matched by a receivable from a partnership. The receivable is weak because the partnership is financed, guaranteed, and directed by Amberline itself. Pacioli’s method exposes the circularity: value leaves one account and returns as a claim on an entity with no independent means to pay. Short sellers may notice the contradiction, but they did not write it into the books. That circular claim is the accounting footprint the later confirmations must test.",
      "frame": "Pia Voss turns the ledger sideways and follows one loss into a receivable. “The books balance. That is not the same as the story being true.”",
      "q": [
        {
          "q": "What does double-entry bookkeeping require for a transaction?",
          "o": [
            {
              "t": "One cash entry mainly, because noncash obligations are recorded separately.",
              "v": "partial",
              "fb": "Double entry includes noncash assets, liabilities, income, and expenses."
            },
            {
              "t": "A market price increase before any asset may appear on the balance sheet.",
              "v": "wrong",
              "fb": "Recognition rules do not require the asset’s market price to rise first."
            },
            {
              "t": "Related debits and credits that preserve the ledger’s accounting balance.",
              "v": "expert",
              "fb": "Each transaction is reflected through linked accounts whose totals remain balanced."
            },
            {
              "t": "Independent auditor approval before a journal entry can be posted.",
              "v": "danger",
              "fb": "Management posts entries; auditors later examine them."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "Pacioli’s reciprocal entries show losses replaced by receivables from partnerships that lack independent value, revealing concealment rather than a market-only decline."
          }
        },
        {
          "q": "Why can a fraudulent ledger still balance?",
          "o": [
            {
              "t": "Fraud occurs mainly when the arithmetic difference between debits and credits is nonzero.",
              "v": "partial",
              "fb": "Many accounting frauds preserve equality while falsifying classification or existence."
            },
            {
              "t": "A balanced ledger strongly suggests nearly every counterparty and asset exists outside the company.",
              "v": "wrong",
              "fb": "Existence and valuation require external evidence beyond ledger balance."
            },
            {
              "t": "Computerized accounting automatically rejects any entry intended to mislead investors.",
              "v": "danger",
              "fb": "Software enforces rules but cannot infer every deceptive purpose."
            },
            {
              "t": "Invented or misclassified transactions can carry matching debits and credits in the ledger.",
              "v": "expert",
              "fb": "Balance tests arithmetic structure, not the truth of the underlying transaction."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The suspicious entries become decisive in the confirmation workroom, where supposed partnership receivables fail to match independent replies."
          }
        },
        {
          "q": "Which feature most strongly suggests that an affiliate belongs in consolidated accounts?",
          "o": [
            {
              "t": "The company controls its decisions and bears its economic risks despite separate paperwork in the audit evidence.",
              "v": "expert",
              "fb": "Control and risk, not the label on the entity, drive the economic reporting boundary."
            },
            {
              "t": "The affiliate has a different legal name and mailing address from the parent across the accounting trail.",
              "v": "partial",
              "fb": "Separate incorporation does not by itself establish independence."
            },
            {
              "t": "The affiliate’s transactions are profitable during one reporting quarter in the audit evidence across the accounting trail.",
              "v": "wrong",
              "fb": "Short-term profit does not decide whether an entity is controlled."
            },
            {
              "t": "A trader says the affiliate operates in the same commodity market in the audit evidence across the accounting trail.",
              "v": "danger",
              "fb": "Industry similarity alone is weaker than governance and guarantees."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "Approval controls show only the chief financial officer could create the consolidation exemptions and reciprocal receivables used across the partnerships."
          }
        }
      ]
    },
    "montgomery": {
      "sci": "Robert H. Montgomery (1872-1953)",
      "topic": "The auditor’s duty & external confirmation",
      "lede": "Montgomery insisted that auditors cross the client’s boundary and obtain evidence from the people supposedly on the other side.",
      "no": 2,
      "profile": "Robert H. Montgomery was an American accountant, lawyer, educator, and co-founder of the firm that became PricewaterhouseCoopers. His influential text Auditing: Theory and Practice helped define the professional audit in the early twentieth century. He emphasized that an auditor should obtain evidence rather than merely check arithmetic prepared by management.\n\nExternal confirmation became one of the clearest examples. Instead of accepting a client’s list of bank balances, receivables, or obligations, the auditor asks the independent counterparty to respond directly. The process must remain under auditor control: addresses are verified, requests are sent independently, replies return to the audit team, and exceptions are investigated. A confirmation routed through management can be intercepted or fabricated.\n\nMontgomery’s era did not settle every modern question of auditor independence, sampling, or fraud detection, but the evidentiary principle remains. Documents created within one controlled circle are weaker than records crossing an independent boundary. Side agreements also matter because the formal contract may not contain guarantees, repurchase promises, or conditions that transfer risk back to the reporting company.\n\nAmberline’s partnerships supplied copied statements through the chief financial officer’s office, yet direct requests to banks and nominal partners returned different balances or no relationship at all. A separate set of side letters guarantees partnership debt and gives Amberline control over asset sales. Montgomery’s method places the decisive scene in the audit workroom: the moment the confirmations fail, the partnerships stop looking independent. The audit partner’s earlier acceptance is troubling, but the design and custody of the concealed obligations still point inward to the executive who issued the letters.",
      "frame": "The junior auditor opens three returned envelopes beside one management schedule. “Independence begins with who controls the reply. Read these exceptions.”",
      "q": [
        {
          "q": "Why is an external confirmation stronger than a client-produced schedule?",
          "o": [
            {
              "t": "The confirmation generally agrees with the client and therefore saves investigation time in audit files.",
              "v": "partial",
              "fb": "Differences are common and must be resolved rather than assumed away."
            },
            {
              "t": "An independent counterparty responds directly through a process controlled by the auditor.",
              "v": "expert",
              "fb": "Independent transmission reduces the chance that management creates both sides of the evidence."
            },
            {
              "t": "A third party is legally incapable of making an accounting error or false statement in audit files.",
              "v": "wrong",
              "fb": "Third parties can err, so corroboration and follow-up still matter."
            },
            {
              "t": "Management does not know which balances the auditor chooses to confirm in audit files.",
              "v": "danger",
              "fb": "Management may know the sample; auditor control of addresses and replies remains essential."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "Montgomery’s confirmation process breaks in the auditor’s workroom, where replies contradict the partnership schedules supplied by management."
          }
        },
        {
          "q": "What danger arises when confirmation replies pass through management?",
          "o": [
            {
              "t": "The auditor receives too many independent documents to compare efficiently.",
              "v": "partial",
              "fb": "Volume is manageable; authenticity and independence are the main concerns."
            },
            {
              "t": "The counterparties become automatically responsible for the client’s financial statements.",
              "v": "wrong",
              "fb": "Management retains responsibility for its statements."
            },
            {
              "t": "The same people whose balances are tested can intercept, redirect, or fabricate evidence.",
              "v": "expert",
              "fb": "Auditor control is designed to prevent management from manufacturing the confirming record."
            },
            {
              "t": "The audit converts from a financial examination into a market-price forecast.",
              "v": "danger",
              "fb": "Confirmation tests existence and terms, not future market direction."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "Reply metadata and side-letter routing return repeatedly to the chief financial officer’s mailbox, while the nominal partners lack the authority attributed to them."
          }
        },
        {
          "q": "Why can a side letter change the accounting substance of a partnership?",
          "o": [
            {
              "t": "Any side letter automatically converts a partnership into a public corporation.",
              "v": "partial",
              "fb": "Corporate form is not created merely by an additional agreement."
            },
            {
              "t": "A side letter matters mainly if it changes the spelling of the entity’s legal name.",
              "v": "wrong",
              "fb": "Substance depends on rights and risks, not naming details."
            },
            {
              "t": "Private agreements does not affect financial statements once the main contract is signed.",
              "v": "danger",
              "fb": "Accounting follows the complete arrangement, including enforceable side terms."
            },
            {
              "t": "It may return control, financial backing, or losses to the company despite the formal contract.",
              "v": "expert",
              "fb": "Hidden guarantees or control provisions can overturn the appearance of independence."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "The side letters return partnership debt and downside risk to Amberline, proving the off-books entities were carrying losses for the group rather than operating independently."
          }
        }
      ]
    },
    "watkins": {
      "sci": "Sherron Watkins (b. 1959)",
      "topic": "The Enron off-books warning",
      "lede": "Watkins recognized that partnerships appearing to transfer risk could instead hide obligations guaranteed by the sponsor itself.",
      "no": 3,
      "profile": "Sherron Watkins was a vice president at Enron when she wrote an internal memorandum in 2001 warning that the company could “implode in a wave of accounting scandals.” Her concern centred on partnerships and hedging arrangements that depended on Enron’s own stock and obscured losses. She did not discover every element of the fraud, but her warning became an important record of what insiders could see before the collapse.\n\nThe Enron case illustrated how special-purpose entities can be legitimate tools or vehicles for distortion. An entity may finance a project, isolate a risk, or hold assets for investors. Trouble begins when purportedly independent capital is not truly at risk, when the sponsor controls decisions, or when guarantees and related-party transactions return losses to the sponsor while keeping liabilities outside its reported balance sheet.\n\nWatkins’s memorandum also shows the role of incentives and internal escalation. Employees may observe fragments: a valuation that depends on the company’s own shares, cash moving in circles, or disclosures that do not explain the economics. A useful warning connects those fragments and asks what happens if the supporting assumptions fail.\n\nAmberline’s trading losses are real and worsened by the commodity reversal, but the company’s sudden collapse occurs because partnership guarantees bring hidden debt back onto the balance sheet. Short sellers accelerate public recognition; they do not create the obligations. Watkins’s lens distinguishes catalyst from cause. The chief financial officer designed the entities, approved their valuations, and signed the side agreements that converted temporary concealment into insolvency.",
      "frame": "Okonkwo overlays the partnership guarantees on the trading losses. “The market moved. The debt was already here. Decide which one sank us.”",
      "q": [
        {
          "q": "When is a special-purpose entity most likely to be misleading?",
          "o": [
            {
              "t": "When the sponsor controls it or bears losses that the separate form claims to remove.",
              "v": "expert",
              "fb": "Control and retained risk can make off-balance-sheet presentation economically false."
            },
            {
              "t": "Whenever the entity finances one project rather than the whole corporation.",
              "v": "partial",
              "fb": "Project finance can be legitimate when risk and control are genuinely separated."
            },
            {
              "t": "When outside investors receive detailed disclosures about its capital and risks.",
              "v": "wrong",
              "fb": "Transparent independent investment generally strengthens rather than weakens the structure."
            },
            {
              "t": "Whenever its legal documents use a partnership instead of a corporate structure.",
              "v": "danger",
              "fb": "Legal form alone does not determine accounting substance."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "Watkins’s test shows the partnerships depended on Amberline guarantees and stock, so the hidden obligations—not the short sellers—made the company insolvent."
          }
        },
        {
          "q": "What is the difference between a catalyst and a cause in a financial collapse?",
          "o": [
            {
              "t": "A catalyst is generally illegal, while a cause is an ordinary market event.",
              "v": "partial",
              "fb": "Legality does not define the causal distinction."
            },
            {
              "t": "A catalyst reveals or accelerates losses, while the cause created the underlying obligations.",
              "v": "expert",
              "fb": "Public scrutiny can expose a balance-sheet problem without creating it."
            },
            {
              "t": "The cause is whichever event receives the most press coverage after bankruptcy.",
              "v": "wrong",
              "fb": "Coverage measures attention, not economic origin."
            },
            {
              "t": "There is no meaningful distinction once a company’s share price begins falling.",
              "v": "danger",
              "fb": "The distinction is essential for attributing hidden debt and market reaction."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The collapse becomes explainable when the side letters are matched to failed confirmations in the audit workroom, not by watching price movement on the trading floor."
          }
        },
        {
          "q": "Which record most directly attributes the concealment to the chief financial officer?",
          "o": [
            {
              "t": "A public speech in which the chief executive praises the company’s growth.",
              "v": "partial",
              "fb": "Optimistic speech may mislead but does not establish authorship of the entities."
            },
            {
              "t": "A junior auditor’s note that one confirmation response arrived late in the audit evidence.",
              "v": "wrong",
              "fb": "A late reply is a warning sign, not proof of who designed the concealment."
            },
            {
              "t": "Signed exemptions, valuation approvals, and debt backstops issued from his controlled files.",
              "v": "expert",
              "fb": "The documents show operational control over the structures that hid the obligations."
            },
            {
              "t": "A short seller’s report questioning unusually high reported margins in the audit evidence.",
              "v": "danger",
              "fb": "External analysis can reveal anomalies without creating or controlling them."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The chief financial officer alone signs the entity exemptions, valuation overrides, and loss guarantees that recur across the hidden partnerships."
          }
        }
      ]
    }
  },
  "story": [
    "<b>Amberline’s share price collapses in public, but the obligations that destroy it were assembled in private.</b>",
    "Assistant Controller Pia Voss can trace the paired entries. The Junior Auditor has the failed confirmations. Desk Trader Okonkwo can separate market losses from the debt hidden around them.",
    "A short-selling raid, a normal market cycle, and off-books concealment each explain the timing differently.",
    "The examiner must decide who controlled the entities, where the evidence became independent, and whether the market exposed the insolvency or created it."
  ],
  "endings": {
    "overclaimWhat": "raid",
    "dismissalWhat": "cycle",
    "win": {
      "expertTitle": "The Partnerships Return to the Balance Sheet",
      "expert": [
        "You connect Julian Frael — the chief financial officer, the Auditor’s Confirmation Workroom, and controlled partnerships carrying losses omitted from the group accounts. The full clue chain links the initiating condition, the physical mechanism, and the decisive record without relying on candidate order.",
        "The two alternative explanations each fit part of the scene, but neither survives the combined timing, material, and documentary evidence."
      ],
      "soundTitle": "The Confirmation Failure",
      "sound": [
        "Your accusation identifies Julian Frael — the chief financial officer, the Auditor’s Confirmation Workroom, and controlled partnerships carrying losses omitted from the group accounts.",
        "A few missed clues leave gaps in the reconstruction, yet the evidence you recovered is sufficient to distinguish the true sequence from both traps."
      ],
      "namedTitle": "Correct Fraud, Thin Ledger",
      "named": [
        "You reach the correct three-part verdict with a thin evidentiary file.",
        "The result is right, although the unrecovered clues would be needed to defend the causal chain under sustained challenge."
      ]
    },
    "overclaim": {
      "title": "The Messengers Did Not Write the Debt",
      "body": [
        "Short sellers accelerated public recognition but did not create the journal entries, guarantees, or hidden debt.",
        "The company’s insolvency is present in the partnership documents before the critical reports appear."
      ]
    },
    "dismissal": {
      "title": "The Cycle Did Not Create the Guarantees",
      "body": [
        "Commodity losses were real and disclosed in part, but they do not explain the excluded guarantees and failed confirmations.",
        "A normal cycle becomes catastrophic here because debt was concealed rather than because markets simply turned."
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
