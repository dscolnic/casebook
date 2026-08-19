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
  "teaser": "Detailed customer records appear for sale under real identities. Did criminals breach the warehouse, did approved analytics remain anonymous, or did someone inside the analytics workflow deliberately reconnect pseudonyms to people and export the result?",
  "overclaimTag": "a criminal breach of the data warehouse",
  "truthTag": "a re-identification analyst converted pseudonyms into a sale file",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A data table linked to a re-identified person and transferred to a commercial file\"><rect x=\"70\" y=\"28\" width=\"210\" height=\"84\" rx=\"6\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M92 50 h166 M92 68 h166 M92 86 h166\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><circle cx=\"400\" cy=\"70\" r=\"30\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/><path d=\"M400 40 v60 M370 70 h60\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><path d=\"M500 48 h80 v44 h-80z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M475 70 h25\" stroke=\"#B3261E\" stroke-width=\"3\"/><circle cx=\"475\" cy=\"70\" r=\"5\" fill=\"#B3261E\"/></svg>",
  "overclaimTease": "Follow the transformation row by row. A warehouse breach, a privacy-preserving analysis, and an internal identity join leave different credentials, outputs, and audit trails.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "dataexec",
      "items": [
        {
          "id": "dataexec",
          "label": "Mara Venn — the re-identification analyst"
        },
        {
          "id": "thieves",
          "label": "An outside criminal data-theft group"
        },
        {
          "id": "processor",
          "label": "The contracted third-party processor"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "analytics",
      "items": [
        {
          "id": "warehouse",
          "label": "The Customer Data Warehouse"
        },
        {
          "id": "office",
          "label": "The Data-Product Chief’s Office"
        },
        {
          "id": "analytics",
          "label": "The Analytics & Re-identification Laboratory"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "monetized",
      "items": [
        {
          "id": "monetized",
          "label": "An analyst restored identities and exported a commercial file"
        },
        {
          "id": "theft",
          "label": "Criminal access exported identified records outside the company"
        },
        {
          "id": "anon",
          "label": "Authorized analytics kept every released person effectively anonymous"
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
      "hint": "The warehouse remained sealed, but a lookup table made its pseudonymous rows linkable from the analytics environment.",
      "reading": "p_reident"
    },
    "analyst2": {
      "name": "The Analytics Lead",
      "role": "Re-identification analyst",
      "face": "📈",
      "badge": "A",
      "legend": "the analytics lab",
      "hint": "One analyst account ran the identity join, generated named profiles, and staged the commercial extract.",
      "reading": "p_diffpriv"
    },
    "clerk": {
      "name": "The Compliance Clerk",
      "role": "Consent and contract clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the data office",
      "hint": "The approved product called for anonymous aggregates; the named row-level file never received compliance approval.",
      "reading": "p_context"
    }
  },
  "TOPICS": {
    "p_reident": {
      "sci": "Latanya Sweeney (b. 1968)",
      "topic": "Re-identification & k-anonymity",
      "lede": "Latanya Sweeney showed that removing names does not make records anonymous when ordinary details can be linked to another dataset.",
      "no": 1,
      "profile": "Latanya Sweeney is a computer scientist whose work transformed public understanding of data anonymity. In the 1990s she demonstrated how records stripped of obvious identifiers could be re-identified by linking fields such as date of birth, sex, and ZIP code with publicly available voter information. Her best-known demonstration matched de-identified medical records to the voter roll and identified the record of the governor of Massachusetts. The lesson was not that every dataset is equally vulnerable, but that combinations of common attributes can be highly distinctive.\n\nSweeney developed the concept of k-anonymity, which requires each released record to be indistinguishable from at least k minus one others with respect to selected quasi-identifiers. Generalizing dates, suppressing rare categories, and broadening geography can reduce uniqueness. But k-anonymity has limits: it does not automatically prevent inference from sensitive values within a group, protect against outside knowledge, or cover new linkage sources that appear later.\n\nRe-identification is therefore a systems property. Investigators ask what fields were released, what auxiliary datasets were available, whether stable pseudonyms persisted across tables, and whether an internal mapping key remained accessible. A dataset can look anonymous on its face while preserving a direct route back to customer accounts.\n\nAt Beacon, the released rows could be reconnected to customer accounts through a persistent internal key. The warehouse logs show no external intrusion and no bulk export from its service account. Instead, the identity bridge was invoked from the analytics environment by a user who already possessed legitimate access. Sweeney’s work makes that distinction concrete: removing names is not anonymity when a second table restores them, and the person who performs the join leaves a different trail from a thief who breaks into storage.",
      "frame": "Joins three “anonymous” attributes to a customer table and highlights one exact match. “A missing name is not anonymity if the rest of the row points back to one person.”",
      "q": [
        {
          "q": "What is a quasi-identifier in re-identification research?",
          "o": [
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
              "t": "A non-name field that can identify someone when combined with outside data.",
              "v": "expert",
              "fb": "Birth date, geography, sex, and similar attributes can become identifying through linkage."
            },
            {
              "t": "Any field the company labels anonymous, regardless of its linkage potential.",
              "v": "danger",
              "fb": "A label does not determine whether outside data can make the field identifying."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — lead",
            "text": "Removing direct names did not prevent linkage because a persistent key connected the rows back to customer accounts."
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
            "label": "WHERE — lead",
            "text": "The warehouse retained pseudonymous service rows; the first named records appear only after queries run in the analytics environment."
          }
        },
        {
          "q": "Which record best distinguishes an internal identity join from a warehouse breach?",
          "o": [
            {
              "t": "A sales contract showing that another company wanted detailed records.",
              "v": "partial",
              "fb": "Commercial interest supplies motive but does not identify the technical route."
            },
            {
              "t": "A list of customer fields stored in the warehouse before the incident.",
              "v": "wrong",
              "fb": "Stored fields describe risk but not who performed the identity restoration."
            },
            {
              "t": "A claim that pseudonymous identifiers can never be tied back to people.",
              "v": "danger",
              "fb": "Pseudonyms can be linkable; treating them as permanent anonymity is the error."
            },
            {
              "t": "Analytics queries invoking the lookup key while warehouse access stays normal.",
              "v": "expert",
              "fb": "The split audit trail shows legitimate storage access followed by deliberate re-identification."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — lead",
            "text": "The identity lookup was invoked through one ordinary analyst account; warehouse and processor credentials show no corresponding breach."
          }
        }
      ]
    },
    "p_diffpriv": {
      "sci": "Cynthia Dwork (b. 1958)",
      "topic": "Differential privacy",
      "lede": "Cynthia Dwork helped define privacy as a measurable limit on what an analysis can reveal about any one person’s participation.",
      "no": 2,
      "profile": "Cynthia Dwork is a theoretical computer scientist whose research spans cryptography, distributed systems, fairness, and privacy. In the mid-2000s, with collaborators, she introduced differential privacy as a rigorous answer to a recurring database problem: even aggregate statistics can leak information when many queries are combined or compared with outside knowledge. Removing names is not enough if the outputs change noticeably when one person’s data is present.\n\nA randomized algorithm is differentially private when its output distribution is nearly the same whether any one individual’s record is included or removed. The parameter epsilon describes the privacy loss bound; smaller values generally provide stronger privacy, though accuracy and cumulative use must be managed. Noise can be calibrated to query sensitivity, and a privacy budget tracks the effect of repeated analyses. The guarantee concerns what an observer can infer from outputs, not merely how the source table is labeled.\n\nDifferential privacy is designed primarily for statistics and models, not for publishing detailed row-level histories that remain useful for individual targeting. Exact matches, persistent identifiers, and unrestricted repeated queries are warning signs. A system may use encryption and access controls yet still violate privacy if authorized analysts can reconstruct individuals from precise outputs.\n\nBeacon’s product requirement called for aggregate trends with privacy controls, yet the disputed output contained exact named rows, locations, and events. Differential privacy would have limited what any one person contributed; this file did the opposite by preserving individual detail. Query history shows that the analyst repeatedly reduced grouping thresholds, joined the customer lookup, and staged the export. Dwork’s framework therefore identifies both the mechanism and the scene: the privacy failure was created in the analytics laboratory, not discovered after data escaped the warehouse.",
      "frame": "Compares a noisy population chart with an exact customer dossier. “Privacy is not the word on the input table. It is the bound on what the output lets someone infer about one person.”",
      "q": [
        {
          "q": "What does differential privacy bound?",
          "o": [
            {
              "t": "How many employees may open an encrypted database during one workday.",
              "v": "partial",
              "fb": "Access control matters, but it is not the mathematical guarantee differential privacy provides."
            },
            {
              "t": "How much outputs change when one person’s record is added or removed.",
              "v": "expert",
              "fb": "The guarantee limits the influence of any individual’s participation on released results."
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
            "label": "WHAT — corroboration",
            "text": "The disputed output preserved exact individuals rather than noisy aggregates or privacy-bounded statistics."
          }
        },
        {
          "q": "Why is repeated querying important in privacy analysis?",
          "o": [
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
              "t": "Many outputs can accumulate privacy loss and expose new individual details.",
              "v": "expert",
              "fb": "Composition is central because individually modest disclosures can combine into strong inference."
            },
            {
              "t": "Analysts may repeat queries without limit once direct identifiers are removed.",
              "v": "danger",
              "fb": "Unlimited precise queries can defeat superficial de-identification."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — corroboration",
            "text": "The same user wrote the linkage script, lowered the grouping threshold, and staged the named export from a laboratory workstation."
          }
        },
        {
          "q": "Where did the privacy promise become a named commercial product?",
          "o": [
            {
              "t": "In the analytics lab, where exact rows were joined to the identity table.",
              "v": "expert",
              "fb": "The named output was created by the linkage and export steps in analytics."
            },
            {
              "t": "In the warehouse, where pseudonymous service records were originally stored.",
              "v": "partial",
              "fb": "Storage began the data lifecycle but did not create the identified sale file."
            },
            {
              "t": "In the processor’s office, where a standard data-handling contract was signed.",
              "v": "wrong",
              "fb": "The contract did not authorize the row-level identity restoration at issue."
            },
            {
              "t": "On the criminal market, because any sale proves an outside breach occurred.",
              "v": "danger",
              "fb": "A later market appearance does not establish how the file was produced."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — corroboration",
            "text": "Exact row-level matches, identity lookup calls, and export staging all occur on the re-identification laboratory’s systems."
          }
        }
      ]
    },
    "p_context": {
      "sci": "Helen Nissenbaum (b. 1954)",
      "topic": "Privacy as contextual integrity",
      "lede": "Helen Nissenbaum reframed privacy as appropriate information flow: who sends what about whom, to which recipient, under what conditions.",
      "no": 3,
      "profile": "Helen Nissenbaum is a philosopher of technology whose theory of contextual integrity explains why privacy cannot be reduced to secrecy or individual control over isolated facts. Social life contains different contexts—health care, education, banking, friendship, employment—each with roles, purposes, and norms governing information flow. A fact may be appropriately shared in one setting and deeply intrusive when transferred to another recipient or used for another purpose.\n\nContextual integrity analyzes the actors, information type, transmission principle, and surrounding social purpose. A customer may provide location data to deliver a service, authorize a physician to share records for treatment, or give a bank information to assess a transaction. Those flows do not automatically authorize sale to advertisers, insurers, or data brokers. Consent language matters, but a broad legal clause can still conflict with reasonable contextual expectations if it silently changes recipient and purpose.\n\nThe theory also clarifies why “nothing secret was exposed” is a weak defense. Harm can arise from aggregation, persistence, and repurposing of information that was individually available. Likewise, security and privacy are distinct. A perfectly secured system can violate privacy through authorized flows that break contextual norms; a breach is not required.\n\nNissenbaum’s contextual integrity separates permission to operate a service from permission to sell named profiles. Beacon’s chief had approved an aggregate product, and the processor contract did not authorize identity restoration. The decisive breach occurred when an analyst repurposed service data inside the analytics workflow and produced a recipient-ready file outside those constraints. That makes the commercial context violation real without turning every manager, processor, or warehouse engineer into the culprit.",
      "frame": "Places the customer consent beside the broker contract and draws arrows between sender, subject, recipient, and purpose. “The same data can be proper in one flow and wrongful in another.”",
      "q": [
        {
          "q": "What does contextual integrity evaluate?",
          "o": [
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
            },
            {
              "t": "Whether a data flow fits its roles, recipient, purpose, and governing norms.",
              "v": "expert",
              "fb": "Privacy depends on the appropriateness of the flow, not simply whether the fact is secret."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — decisive",
            "text": "A legitimate-access analyst restored identities and repurposed service records into a commercial sale file."
          }
        },
        {
          "q": "Why does the absence of a security breach not resolve this case?",
          "o": [
            {
              "t": "Every privacy violation requires malware, stolen passwords, or an outside intruder.",
              "v": "wrong",
              "fb": "Misuse by authorized insiders is a central privacy risk."
            },
            {
              "t": "Authorized users can violate privacy by sending data through an inappropriate flow.",
              "v": "expert",
              "fb": "Privacy can fail through approved repurposing even when access controls function exactly as designed."
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
            "label": "WHERE — decisive",
            "text": "The customer key, named profiles, and recipient-ready commercial file converge in the Analytics & Re-identification Laboratory."
          }
        },
        {
          "q": "Which document best connects the changed data flow to the executive who approved it?",
          "o": [
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
              "t": "The signed contract sending identified profiles to a recipient absent from consent.",
              "v": "expert",
              "fb": "The contract connects the changed information flow to the executive who authorized it."
            },
            {
              "t": "A criminal forum post offering unrelated records and claiming a wider Beacon breach.",
              "v": "danger",
              "fb": "External criminal activity elsewhere cannot outweigh Beacon’s own contract and access trail."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — decisive",
            "text": "One re-identification analyst created the identity bridge, named output, and transfer package despite an aggregate-only product specification."
          }
        }
      ]
    }
  },
  "story": [
    "<b>Beacon insists its intimate records were anonymous; buyers received names, locations, and histories.</b>",
    "The Data Engineer can trace the warehouse keys. The Analytics Lead can compare the product with privacy-bounded output. The Compliance Clerk holds the approved purpose and recipient rules.",
    "A criminal breach, a harmless anonymous analysis, and an internal re-identification each predict a different sequence of credentials and transformations.",
    "The notepad must reconstruct where pseudonyms became people and who performed that conversion."
  ],
  "endings": {
    "overclaimWhat": "theft",
    "dismissalWhat": "anon",
    "win": {
      "expertTitle": "The Identity Join",
      "expert": [
        "You connect Mara Venn, the Analytics & Re-identification Laboratory, and the internal restoration of identities for a commercial file.",
        "Normal warehouse access, exact row-level output, and a single analyst audit trail reject both an outside break-in and the claim that the data remained anonymous."
      ],
      "soundTitle": "The Named Output",
      "sound": [
        "Your accusation identifies the analyst, the analytics laboratory, and the unauthorized identity join.",
        "Some contract or query details remain missing, but the transformation and export trail support the result."
      ],
      "namedTitle": "Right Join, Thin Audit",
      "named": [
        "You select the correct person, location, and mechanism.",
        "The verdict holds, although missed clues leave parts of the credential or context chain less developed."
      ]
    },
    "overclaim": {
      "title": "The Warehouse Was Not Breached",
      "body": [
        "Storage logs show ordinary authenticated use rather than criminal entry or bulk extraction.",
        "The identified file was created later through internal linkage, so the break-in story misses the actual act."
      ]
    },
    "dismissal": {
      "title": "These Were Not Anonymous Aggregates",
      "body": [
        "The product preserved exact row-level identities, places, and events instead of limiting individual contribution.",
        "Calling it anonymous ignores the lookup key and the named file generated from it."
      ]
    },
    "wrongNames": {
      "title": "The Privacy Failure, Misassigned",
      "body": [
        "You recognize re-identification and sale but place the responsible analyst or decisive analytics environment elsewhere."
      ]
    }
  }
}
};
