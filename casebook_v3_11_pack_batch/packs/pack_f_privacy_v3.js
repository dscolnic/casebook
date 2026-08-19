// Casebook V3 — three informants, three readings, one clue per correct answer.
module.exports = { PACK: {
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "f_privacy",
  "title": "The Beacon Consent Scandal",
  "discipline": "Data Privacy & Information Systems",
  "venue": "the Beacon data-privacy inquiry",
  "agent": {
    "name": "Investigator Iris Kohl",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Data-Privacy Pioneers",
  "dossierName": "DATA-PRIVACY & DATABASE PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Beacon data-privacy inquiry",
  "DAYS_TOTAL": 3,
  "teaser": "Detailed customer records appear for sale under real identities. Did criminals steal them, were authorized analytics safely anonymous, or did an internal product deliberately restore identity and move the data into a new commercial context?",
  "overclaimTag": "a criminal breach of the data warehouse",
  "truthTag": "internal re-identification followed by commercial sale",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A data table linked to a re-identified person and transferred to a commercial file\"><rect x=\"70\" y=\"28\" width=\"210\" height=\"84\" rx=\"6\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M92 50 h166 M92 68 h166 M92 86 h166\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><circle cx=\"400\" cy=\"70\" r=\"30\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/><path d=\"M400 40 v60 M370 70 h60\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><path d=\"M500 48 h80 v44 h-80z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M475 70 h25\" stroke=\"#B3261E\" stroke-width=\"3\"/><circle cx=\"475\" cy=\"70\" r=\"5\" fill=\"#B3261E\"/></svg>",
  "overclaimTease": "A breach is only one route out of a database. Test whether the supposedly anonymous records could be linked from inside—and whether their new use matched the context in which people supplied them.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "dataexec",
      "items": [
        {
          "id": "thieves",
          "label": "An outside criminal data-theft group"
        },
        {
          "id": "dataexec",
          "label": "Reed Calloway — the data-product chief"
        },
        {
          "id": "processor",
          "label": "The contracted third-party processor"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "office",
      "items": [
        {
          "id": "warehouse",
          "label": "The Customer Data Warehouse"
        },
        {
          "id": "analytics",
          "label": "The Analytics & Re-identification Laboratory"
        },
        {
          "id": "office",
          "label": "The Data-Product Chief’s Office"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "monetized",
      "items": [
        {
          "id": "theft",
          "label": "Criminal access exported identified customer records outside the company"
        },
        {
          "id": "anon",
          "label": "Authorized analytics used data that remained effectively anonymous"
        },
        {
          "id": "monetized",
          "label": "Internal linkage restored identities for a commercial data sale"
        }
      ]
    }
  },
  "READING_ORDER": [
    "dataeng2",
    "analyst2",
    "clerk"
  ],
  "CHARACTERS": {
    "dataeng2": {
      "name": "The Data Engineer",
      "role": "Data-warehouse engineer",
      "face": "🗄️",
      "badge": "D",
      "legend": "the warehouse",
      "hint": "Persistent internal keys connected the released rows back to customer accounts.",
      "reading": "p_reident"
    },
    "analyst2": {
      "name": "The Analytics Lead",
      "role": "Re-identification analyst",
      "face": "📈",
      "badge": "A",
      "legend": "the analytics lab",
      "hint": "The product generated exact row-level matches rather than privacy-bounded aggregate statistics.",
      "reading": "p_diffpriv"
    },
    "clerk": {
      "name": "The Compliance Clerk",
      "role": "Consent and contract clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the data office",
      "hint": "Customer permission covered service delivery, while the sales contract authorized a different recipient and purpose.",
      "reading": "p_context"
    }
  },
  "TOPICS": {
    "p_reident": {
      "sci": "Latanya Sweeney (b. 1968)",
      "topic": "Re-identification & k-anonymity",
      "lede": "Latanya Sweeney showed that removing names does not make records anonymous when ordinary details can be linked to another dataset.",
      "no": 1,
      "profile": "Latanya Sweeney is a computer scientist whose work transformed public understanding of data anonymity. In the 1990s she demonstrated how records stripped of obvious identifiers could be re-identified by linking fields such as date of birth, sex, and ZIP code with publicly available voter information. Her best-known demonstration matched de-identified medical records to the voter roll and identified the record of the governor of Massachusetts. The lesson was not that every dataset is equally vulnerable, but that combinations of common attributes can be highly distinctive.\n\nSweeney developed the concept of k-anonymity, which requires each released record to be indistinguishable from at least k minus one others with respect to selected quasi-identifiers. Generalizing dates, suppressing rare categories, and broadening geography can reduce uniqueness. But k-anonymity has limits: it does not automatically prevent inference from sensitive values within a group, protect against outside knowledge, or cover new linkage sources that appear later.\n\nRe-identification is therefore a systems property. Investigators ask what fields were released, what auxiliary datasets were available, whether stable pseudonyms persisted across tables, and whether an internal mapping key remained accessible. A dataset can look anonymous on its face while preserving a direct route back to customer accounts.\n\nAt Beacon, the exported rows carried pseudonymous IDs, detailed timestamps, location histories, and uncommon event combinations. An internal lookup table connected those IDs to customer accounts. That is not the pattern of a thief defeating the perimeter; it is a linkage path built into the product. Sweeney’s method tells the inquiry to reproduce the match and identify who authorized access to the linking data.",
      "frame": "Joins three “anonymous” attributes to a customer table and highlights one exact match. “A missing name is not anonymity if the rest of the row points back to one person.”",
      "q": [
        {
          "q": "What is a quasi-identifier in re-identification research?",
          "o": [
            {
              "t": "A non-name field that can identify someone when combined with outside data.",
              "v": "expert",
              "fb": "Birth date, geography, sex, and similar attributes can become identifying through linkage."
            },
            {
              "t": "A secret database key used to map a coded record directly to one account.",
              "v": "partial",
              "fb": "A key can enable direct mapping, but quasi-identifiers are ordinary descriptive fields used in combination."
            },
            {
              "t": "A fabricated identity inserted by criminals to conceal a data breach.",
              "v": "wrong",
              "fb": "Quasi-identifiers are real record attributes, not attacker aliases."
            },
            {
              "t": "Any field the company labels anonymous, regardless of its linkage potential.",
              "v": "danger",
              "fb": "A label does not determine whether outside data can make the field identifying."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "The released rows combine persistent IDs, fine-grained times, and locations that reproduce exact customer matches; anonymity fails through linkage rather than theft."
          }
        },
        {
          "q": "What does k-anonymity attempt to achieve?",
          "o": [
            {
              "t": "Each record shares its quasi-identifier pattern with at least k records.",
              "v": "expert",
              "fb": "The method reduces uniqueness by making selected identifying combinations less specific."
            },
            {
              "t": "Every sensitive value is encrypted with a different one-time key.",
              "v": "wrong",
              "fb": "Encryption and k-anonymity address different threats and use different mechanisms."
            },
            {
              "t": "No analyst can learn anything useful from the released dataset.",
              "v": "partial",
              "fb": "The goal is to retain utility while reducing identity risk, not eliminate all information."
            },
            {
              "t": "The company may sell data freely once direct names are removed.",
              "v": "danger",
              "fb": "De-identification does not by itself establish consent or appropriate use."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The warehouse contains the raw rows, but the decisive lookup table and product mapping were controlled through the data-product office."
          }
        },
        {
          "q": "Which fact most strongly distinguishes internal linkage from an outside breach?",
          "o": [
            {
              "t": "The sale used an internal lookup service available only to product accounts.",
              "v": "expert",
              "fb": "Use of an internal mapping service points to approved access rather than perimeter compromise."
            },
            {
              "t": "The buyer received files through an encrypted, company-approved transfer channel.",
              "v": "partial",
              "fb": "Encryption protects transport but does not determine whether the transfer was legitimate or privacy-preserving."
            },
            {
              "t": "No customer password appeared in the released records or transfer package.",
              "v": "wrong",
              "fb": "A breach or misuse can expose identity without including passwords."
            },
            {
              "t": "A criminal group later claimed responsibility without providing technical evidence.",
              "v": "danger",
              "fb": "An unsupported claim cannot outweigh access logs and reproducible internal linkage."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The mapping calls used the service account owned by the data-product chief’s team, not a stolen customer credential or processor login."
          }
        }
      ]
    },
    "p_diffpriv": {
      "sci": "Cynthia Dwork (b. 1958)",
      "topic": "Differential privacy",
      "lede": "Cynthia Dwork helped define privacy as a measurable limit on what an analysis can reveal about any one person’s participation.",
      "no": 2,
      "profile": "Cynthia Dwork is a theoretical computer scientist whose research spans cryptography, distributed systems, fairness, and privacy. In the mid-2000s, with collaborators, she introduced differential privacy as a rigorous answer to a recurring database problem: even aggregate statistics can leak information when many queries are combined or compared with outside knowledge. Removing names is not enough if the outputs change noticeably when one person’s data is present.\n\nA randomized algorithm is differentially private when its output distribution is nearly the same whether any one individual’s record is included or removed. The parameter epsilon describes the privacy loss bound; smaller values generally provide stronger privacy, though accuracy and cumulative use must be managed. Noise can be calibrated to query sensitivity, and a privacy budget tracks the effect of repeated analyses. The guarantee concerns what an observer can infer from outputs, not merely how the source table is labeled.\n\nDifferential privacy is designed primarily for statistics and models, not for publishing detailed row-level histories that remain useful for individual targeting. Exact matches, persistent identifiers, and unrestricted repeated queries are warning signs. A system may use encryption and access controls yet still violate privacy if authorized analysts can reconstruct individuals from precise outputs.\n\nAt Beacon, the commercial product did not return noisy aggregates. It produced named, row-level profiles with exact locations and events after querying an internal linkage service. No privacy budget limited repeated extraction. Dwork’s framework therefore rejects the claim that the sale remained meaningfully anonymous. It also directs attention away from a spectacular break-in: the damaging operation was an authorized analytical function whose design made individual reconstruction the product rather than an accidental leak.",
      "frame": "Compares a noisy population chart with an exact customer dossier. “Privacy is not the word on the input table. It is the bound on what the output lets someone infer about one person.”",
      "q": [
        {
          "q": "What does differential privacy bound?",
          "o": [
            {
              "t": "How much outputs change when one person’s record is added or removed.",
              "v": "expert",
              "fb": "The guarantee limits the influence of any individual’s participation on released results."
            },
            {
              "t": "How many employees may open an encrypted database during one workday.",
              "v": "partial",
              "fb": "Access control matters, but it is not the mathematical guarantee differential privacy provides."
            },
            {
              "t": "Whether a dataset contains direct names before analysis begins.",
              "v": "wrong",
              "fb": "The framework protects outputs even when identification risks arise from inference rather than explicit names."
            },
            {
              "t": "Whether a company has permission to use data for any profitable purpose.",
              "v": "danger",
              "fb": "A mathematical privacy guarantee cannot substitute for consent and contextual limits."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "The product returned exact individual dossiers with persistent identifiers and no privacy budget; it was designed for reconstruction, not privacy-bounded analysis."
          }
        },
        {
          "q": "Why is repeated querying important in privacy analysis?",
          "o": [
            {
              "t": "Many outputs can accumulate privacy loss and expose new individual details.",
              "v": "expert",
              "fb": "Composition is central because individually modest disclosures can combine into strong inference."
            },
            {
              "t": "Repeated queries automatically encrypt the original records more securely.",
              "v": "wrong",
              "fb": "Query volume does not strengthen encryption and can instead increase information leakage."
            },
            {
              "t": "A repeated identical query confirms repeatability while leaving anonymity untested.",
              "v": "partial",
              "fb": "Repetition may test stability, but it does not establish a privacy guarantee."
            },
            {
              "t": "Analysts may repeat queries without limit once direct identifiers are removed.",
              "v": "danger",
              "fb": "Unlimited precise queries can defeat superficial de-identification."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The privacy review recommended aggregate outputs, but the data-product chief approved exact row export because individual targeting increased the product’s value."
          }
        },
        {
          "q": "Where is the decisive difference between safe analysis and this product recorded?",
          "o": [
            {
              "t": "In the product specification for outputs, linkage access, and privacy limits.",
              "v": "expert",
              "fb": "The design record shows whether the system was built for bounded statistics or person-level extraction."
            },
            {
              "t": "In the data-center rack and access console that hosted the database servers.",
              "v": "wrong",
              "fb": "Hardware location does not explain the analytic behavior or authorization."
            },
            {
              "t": "In the processor’s security certificate and annual compliance assessment.",
              "v": "partial",
              "fb": "Security certification may address controls but not the internal output design or consent purpose."
            },
            {
              "t": "In a press statement calling the dataset industry-standard anonymous.",
              "v": "danger",
              "fb": "Marketing language cannot override the system’s actual inference capability."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The analytics laboratory performed the linkage, but the specification and approval that made person-level output the product sit in the chief’s office."
          }
        }
      ]
    },
    "p_context": {
      "sci": "Helen Nissenbaum (b. 1954)",
      "topic": "Privacy as contextual integrity",
      "lede": "Helen Nissenbaum reframed privacy as appropriate information flow: who sends what about whom, to which recipient, under what conditions.",
      "no": 3,
      "profile": "Helen Nissenbaum is a philosopher of technology whose theory of contextual integrity explains why privacy cannot be reduced to secrecy or individual control over isolated facts. Social life contains different contexts—health care, education, banking, friendship, employment—each with roles, purposes, and norms governing information flow. A fact may be appropriately shared in one setting and deeply intrusive when transferred to another recipient or used for another purpose.\n\nContextual integrity analyzes the actors, information type, transmission principle, and surrounding social purpose. A customer may provide location data to deliver a service, authorize a physician to share records for treatment, or give a bank information to assess a transaction. Those flows do not automatically authorize sale to advertisers, insurers, or data brokers. Consent language matters, but a broad legal clause can still conflict with reasonable contextual expectations if it silently changes recipient and purpose.\n\nThe theory also clarifies why “nothing secret was exposed” is a weak defense. Harm can arise from aggregation, persistence, and repurposing of information that was individually available. Likewise, security and privacy are distinct. A perfectly secured system can violate privacy through authorized flows that break contextual norms; a breach is not required.\n\nAt Beacon, customers supplied intimate records to operate a service. The commercial contract transferred named profiles to a broker for targeting and risk scoring. The consent version in force did not name that recipient or purpose. Access logs show no intrusion, and the processor followed the company’s instructions. Nissenbaum’s framework completes the chain: the technical re-identification made the transfer possible, but the privacy violation culminated when an executive authorized a new flow outside the context in which the data was collected.",
      "frame": "Places the customer consent beside the broker contract and draws arrows between sender, subject, recipient, and purpose. “The same data can be proper in one flow and wrongful in another.”",
      "q": [
        {
          "q": "What does contextual integrity evaluate?",
          "o": [
            {
              "t": "Whether a data flow fits its roles, recipient, purpose, and governing norms.",
              "v": "expert",
              "fb": "Privacy depends on the appropriateness of the flow, not simply whether the fact is secret."
            },
            {
              "t": "Whether data remains inside a technically secure network perimeter.",
              "v": "partial",
              "fb": "Security is relevant, but an authorized internal transfer can still violate contextual norms."
            },
            {
              "t": "Whether every person named in a dataset is already publicly known.",
              "v": "wrong",
              "fb": "Public availability of some facts does not authorize all aggregation and reuse."
            },
            {
              "t": "Whether a privacy policy contains broad language permitting future business use.",
              "v": "danger",
              "fb": "Formal breadth does not settle whether a new recipient and purpose preserve contextual integrity."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "Customers provided records for service delivery, while the broker received re-identified profiles for targeting—a changed recipient and purpose, not harmless anonymous analysis."
          }
        },
        {
          "q": "Why does the absence of a security breach not resolve this case?",
          "o": [
            {
              "t": "Authorized users can violate privacy by sending data through an inappropriate flow.",
              "v": "expert",
              "fb": "Privacy can fail through approved repurposing even when access controls function exactly as designed."
            },
            {
              "t": "Every privacy violation requires malware, stolen passwords, or an outside intruder.",
              "v": "wrong",
              "fb": "Misuse by authorized insiders is a central privacy risk."
            },
            {
              "t": "A secure transfer indicates that customers consented to the destination.",
              "v": "danger",
              "fb": "Transport security protects data in motion but says nothing about permission or purpose."
            },
            {
              "t": "Security logs belong to criminal investigations rather than privacy analysis.",
              "v": "partial",
              "fb": "Logs help distinguish intrusion from authorized misuse, even though they do not settle consent."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The decisive mismatch appears where the service consent and commercial broker contract are joined: the data-product chief’s office."
          }
        },
        {
          "q": "Which document best connects the changed data flow to the executive who approved it?",
          "o": [
            {
              "t": "The signed contract sending identified profiles to a recipient absent from consent.",
              "v": "expert",
              "fb": "The contract connects the changed information flow to the executive who authorized it."
            },
            {
              "t": "The warehouse log showing engineers maintained normal uptime and data availability.",
              "v": "wrong",
              "fb": "Uptime does not establish who approved re-identification or sale."
            },
            {
              "t": "The processor invoice documenting the transfer service and destination account.",
              "v": "partial",
              "fb": "The invoice shows implementation, while the company-side authorization identifies the governing decision."
            },
            {
              "t": "A criminal forum post offering unrelated records and claiming a wider Beacon breach.",
              "v": "danger",
              "fb": "External criminal activity elsewhere cannot outweigh Beacon’s own contract and access trail."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The executive who approved the linkage service, exact-output specification, and broker contract controlled the entire changed data flow."
          }
        }
      ]
    }
  },
  "story": [
    "<b>Beacon’s customer records were not merely exposed; they were organized into named products for sale.</b> The system logs show normal authorized access.",
    "The Data Engineer can reproduce the linkage from pseudonymous rows to accounts. The Analytics Lead can distinguish bounded statistics from exact dossiers. The Compliance Clerk holds the consent versions and broker contract.",
    "A criminal breach would leave unauthorized access. A harmless anonymous analysis would prevent individual reconstruction. The actual flow must be tested against both.",
    "Nine notebook clues can connect the technical linkage, the product design, and the changed recipient and purpose to the executive who approved them."
  ],
  "endings": {
    "overclaimWhat": "theft",
    "dismissalWhat": "anon",
    "win": {
      "expertTitle": "The Authorized Privacy Violation",
      "expert": [
        "You connect persistent internal linkage, exact person-level outputs, and a broker contract outside the service context to Reed Calloway and the Data-Product Chief’s Office.",
        "The logs do not show criminals defeating the warehouse. Nor did the records remain effectively anonymous. The system worked as internally authorized—and that authorization created the violation."
      ],
      "soundTitle": "The Changed Information Flow",
      "sound": [
        "Your accusation identifies the data-product chief, the office, and the internal re-identification and sale.",
        "Some details of the privacy math or access path remain incomplete, but the consent and product design reject both traps."
      ],
      "namedTitle": "Correct Flow, Thin Proof",
      "named": [
        "You choose the right person, place, and mechanism.",
        "The verdict holds, although missed clues leave parts of the linkage or consent comparison less fully established."
      ]
    },
    "overclaim": {
      "title": "No Intruder Was Needed",
      "body": [
        "Authorized product accounts used an internal lookup service and approved transfer path. The criminal-breach theory does not fit the access history.",
        "Focusing on imaginary thieves would leave the commercial design and executive authorization untouched."
      ]
    },
    "dismissal": {
      "title": "Anonymous Records Do Not Produce Named Dossiers",
      "body": [
        "Exact customer matches, persistent identifiers, and unrestricted row-level outputs contradict the claim of effective anonymity.",
        "Consent for service delivery also did not authorize the new broker recipient and targeting purpose."
      ]
    },
    "wrongNames": {
      "title": "The Privacy Failure, Assigned Elsewhere",
      "body": [
        "You recognize internal re-identification and sale but place responsibility or culmination away from the office that approved the product specification, linkage access, and contract."
      ]
    }
  }
}
};
