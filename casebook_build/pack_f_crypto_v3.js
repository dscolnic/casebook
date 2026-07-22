// Casebook V3 — three informants, three readings, one clue per correct answer.
module.exports = { PACK: {
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "f_crypto",
  "title": "The Cipher at Meridian Bank",
  "discipline": "Cryptography & Information Security",
  "venue": "the Meridian Bank cipher inquiry",
  "agent": {
    "name": "Investigator Sol Marchetti",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Cryptography Pioneers",
  "dossierName": "CRYPTOGRAPHY PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Meridian Bank cipher inquiry",
  "DAYS_TOTAL": 3,
  "teaser": "Millions leave accounts protected by a proprietary cipher. Did outsiders discover new mathematics, did vast computing exhaust a sound key, or did ordinary cryptanalysis exploit a design and key practice the bank had already been told to retire?",
  "overclaimTag": "a genius attack on modern encryption",
  "truthTag": "a deprecated design retained through architecture exceptions",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A key vault connected to a proprietary cipher record with a visible attack path\"><rect x=\"78\" y=\"34\" width=\"210\" height=\"72\" rx=\"8\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><circle cx=\"183\" cy=\"70\" r=\"22\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/><path d=\"M183 48 v44 M161 70 h44\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><path d=\"M390 34 h150 v72 H390z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M410 55 h110 M410 72 h110 M410 89 h72\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><path d=\"M330 70 h60\" stroke=\"#B3261E\" stroke-width=\"3\"/><path d=\"M350 58 l12 12 -12 12\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"3\"/></svg>",
  "overclaimTease": "Treat every hypothesis as live until algorithm tests and key comparisons agree. Then ask where those demonstrated weaknesses became an authorized production decision.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "architect",
      "items": [
        {
          "id": "codebreaker",
          "label": "An elite external codebreaking group"
        },
        {
          "id": "architect",
          "label": "Lena Marsh — the bank’s crypto architect"
        },
        {
          "id": "auditor",
          "label": "The independent security auditor"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "office",
      "items": [
        {
          "id": "office",
          "label": "The Security Architect’s Office"
        },
        {
          "id": "cryptolab",
          "label": "The Cryptography Laboratory"
        },
        {
          "id": "vault",
          "label": "The Transaction & Key Vault"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "weakcipher",
      "items": [
        {
          "id": "genius",
          "label": "A new mathematical attack defeated a modern bank cipher"
        },
        {
          "id": "weakcipher",
          "label": "A retired cipher and repeated key material remained live"
        },
        {
          "id": "bruteforce",
          "label": "Massive computing exhausted a sound full-length secret key"
        }
      ]
    }
  },
  "READING_ORDER": [
    "cryptographer",
    "keykeeper",
    "clerk"
  ],
  "CHARACTERS": {
    "cryptographer": {
      "name": "The Cryptographer",
      "role": "Staff cryptographer",
      "face": "🔐",
      "badge": "Y",
      "legend": "the cryptography lab",
      "hint": "A reconstructed copy of the proprietary cipher failed established public attack tests in the laboratory.",
      "reading": "c_kerck"
    },
    "keykeeper": {
      "name": "The Key Custodian",
      "role": "Key-management officer",
      "face": "🗝️",
      "badge": "K",
      "legend": "the key vault",
      "hint": "Vault logs show repeated streams; paired ciphertexts made the reuse exploitable on the lab bench.",
      "reading": "c_otp"
    },
    "clerk": {
      "name": "The Security Records Clerk",
      "role": "Risk and architecture clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the architect’s office",
      "hint": "The architecture owner renewed production after both laboratory findings were documented.",
      "reading": "c_applied"
    }
  },
  "TOPICS": {
    "c_kerck": {
      "sci": "Auguste Kerckhoffs (1835-1903)",
      "topic": "Kerckhoffs’s principle of cipher design",
      "lede": "Auguste Kerckhoffs argued that a military cipher should remain secure even when the enemy knows how the system works.",
      "no": 1,
      "profile": "Auguste Kerckhoffs was a Dutch-born linguist and cryptographer who taught in France and published La Cryptographie Militaire in 1883. In that two-part essay he proposed several requirements for practical military cryptography. The best remembered is now called Kerckhoffs’s principle: a cryptosystem should remain secure even if everything about the system except the key is public knowledge.\n\nThe principle is partly an engineering observation. Algorithms are hard to keep secret. Devices are captured, employees change jobs, software is reverse engineered, documentation leaks, and many users must implement the same method. A small key can be replaced when compromised; an entire hidden design cannot be repaired so easily. Public algorithms also receive scrutiny from researchers who can identify weaknesses before adversaries exploit them. Secrecy of design may slow an attacker, but it should not be the foundation of security.\n\nKerckhoffs did not claim that every public cipher is safe. The method must be strong against known attacks, practical to use, and paired with sound key management. A proprietary cipher can fail quickly once reverse engineered if its designers relied on obscurity, small internal state, predictable transformations, or unreviewed assumptions. In that case, breaking it may require neither unprecedented mathematics nor exhaustive search of a large keyspace.\n\nAt Meridian, Kerckhoffs’s principle points investigators toward a reproducible test rather than the mystique of a secret design. Client software exposed enough structure for staff to rebuild the cipher, and the laboratory recovered transaction patterns with published techniques. That result rules out the flattering story that only unprecedented mathematics could have succeeded. The technical weakness was demonstrated in the lab, but it became an institutional failure in the Security Architect’s Office, where the production exception was renewed after the test.",
      "frame": "Places the proprietary specification beside a reverse-engineered version recovered from public client software. “Assume the enemy knows the machine. What is left that must still be hard?”",
      "q": [
        {
          "q": "What does Kerckhoffs’s principle require?",
          "o": [
            {
              "t": "The algorithm and key should remain secret from users and auditors alike.",
              "v": "wrong",
              "fb": "Widespread systems cannot safely rely on concealing every detail from legitimate scrutiny."
            },
            {
              "t": "Security should survive public knowledge of the system except for the key.",
              "v": "expert",
              "fb": "A robust design does not depend on hiding the algorithm from attackers."
            },
            {
              "t": "A cipher is strong if reverse engineering takes longer than one product cycle.",
              "v": "partial",
              "fb": "Delay can help operationally, but it is not a substitute for cryptographic security."
            },
            {
              "t": "Proprietary status suggests outsiders need a mathematical breakthrough to decrypt it.",
              "v": "danger",
              "fb": "Private design can contain ordinary weaknesses that appear immediately under analysis."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — lead",
            "text": "Published cryptanalysis worked once the hidden design was reconstructed; no new theorem was needed."
          }
        },
        {
          "q": "Why is a replaceable key a better secret than a hidden algorithm?",
          "o": [
            {
              "t": "Keys can be copied, but they remain compact enough to rotate after compromise.",
              "v": "wrong",
              "fb": "Keys can be copied or exposed, which is why rotation and management are essential."
            },
            {
              "t": "A secret algorithm can skip outside review when the original designer trusts it.",
              "v": "danger",
              "fb": "Lack of review allows design errors to survive until adversaries discover them."
            },
            {
              "t": "Algorithms matter mainly for performance because well-managed keys provide security.",
              "v": "partial",
              "fb": "Key quality matters, but algorithm structure determines which attacks are possible."
            },
            {
              "t": "Keys are compact and rotatable; algorithms spread across devices and implementations.",
              "v": "expert",
              "fb": "Operational systems can renew compromised keys but cannot easily recall a leaked design."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — lead",
            "text": "The first retirement request was returned by the role that owned production cipher architecture, not by key custody or external audit."
          }
        },
        {
          "q": "Where does a demonstrated cipher weakness become an accountable production decision?",
          "o": [
            {
              "v": "expert",
              "t": "In the architect’s office, where test results become a signed exception.",
              "fb": "The office converts technical evidence into continued production authority."
            },
            {
              "v": "partial",
              "t": "In the cryptography lab, where reconstructed code faces known attacks.",
              "fb": "The lab proves weakness but does not authorize continued production."
            },
            {
              "v": "wrong",
              "t": "In the key vault, where secret values are issued and rotated.",
              "fb": "Key custody records reuse without owning the architecture decision."
            },
            {
              "v": "danger",
              "t": "In public marketing, where secrecy is presented as proof of strength.",
              "fb": "Marketing claims cannot accept or retire a production cryptosystem."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — lead",
            "text": "The first production exception accepting the demonstrated weakness appears in the Security Architect’s Office."
          }
        }
      ]
    },
    "c_otp": {
      "sci": "Gilbert Vernam (1890-1960)",
      "topic": "The one-time pad & key reuse",
      "lede": "Gilbert Vernam invented a machine cipher whose strongest form is perfectly secret only when its key is random, as long as the message, and never reused.",
      "no": 2,
      "profile": "Gilbert Sandford Vernam was an American engineer at AT&T who, during the First World War era, designed a system for combining teleprinter text with a key stream using an electrical form of addition now represented as exclusive OR. Vernam originally considered repeating key material. The strongest version emerged when the key stream was truly random, at least as long as the message, kept secret, and used only once. That construction became the one-time pad.\n\nClaude Shannon later proved that a properly used one-time pad provides perfect secrecy: the ciphertext alone gives no information about the plaintext because every possible message of the same length is compatible with some key. The conditions are severe. Generating, distributing, storing, and synchronizing long random keys is difficult. Reusing a key destroys the guarantee. If two ciphertexts use the same pad, combining them cancels the key and reveals a relationship between the plaintexts. Predictable message formats, known fields, and repeated transaction structures can then help recover content and future key stream.\n\nThe lesson extends beyond literal one-time pads. Stream ciphers and modes using nonces or counters can also fail catastrophically when unique values are repeated. Large nominal key size does not rescue repeated keystream. The attacker may exploit algebra and message structure rather than test every possible key.\n\nMeridian reused a short daily stream across thousands of similarly formatted transaction messages. Comparing ciphertexts removed much of the repeated key material and exposed predictable fields; the full secret keyspace was never searched. Vernam’s lesson is not that every repeated key produces an instant breach, but that reuse creates algebraic relationships an attacker can test. Vault logs establish the repetition, laboratory work establishes exploitability, and the architect’s office is where both warnings were accepted as a continuing production risk.",
      "frame": "Overlays two ciphertexts produced with the same daily stream and cancels the repeated pattern. “The key disappears when you use it twice. Count the reuse before you count the computers.”",
      "q": [
        {
          "q": "What conditions give a one-time pad perfect secrecy?",
          "o": [
            {
              "t": "A short memorable key repeated until it covers the entire message.",
              "v": "wrong",
              "fb": "Repetition creates exploitable structure and does not produce a one-time pad."
            },
            {
              "t": "A long proprietary algorithm whose internal steps are hidden from attackers.",
              "v": "partial",
              "fb": "Algorithm secrecy is not the one-time pad’s basis; key randomness, length, and single use are."
            },
            {
              "t": "A truly random key as long as the message, kept secret and never reused.",
              "v": "expert",
              "fb": "All four conditions are necessary for the information-theoretic guarantee."
            },
            {
              "t": "Any large key stored by a trusted bank and changed once each year.",
              "v": "danger",
              "fb": "Large size and institutional trust do not prevent dangerous keystream reuse."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — corroboration",
            "text": "Repeated message streams let investigators cancel shared key material instead of searching a full modern keyspace."
          }
        },
        {
          "q": "What happens when two messages use the same one-time-pad key?",
          "o": [
            {
              "t": "The second ciphertext becomes stronger because the key has been tested once.",
              "v": "wrong",
              "fb": "Reuse weakens security rather than validating the key."
            },
            {
              "t": "Combining the ciphertexts cancels the key and exposes a relation between plaintexts.",
              "v": "expert",
              "fb": "Key reuse converts perfect secrecy into a structure attackers can analyze."
            },
            {
              "t": "The shorter message bears the main exposure, while the longer one stays perfectly secret.",
              "v": "partial",
              "fb": "The overlapping reused portion of both messages becomes vulnerable."
            },
            {
              "t": "Attackers still have to brute-force each possible key independently for each message.",
              "v": "danger",
              "fb": "The algebra of reuse can bypass exhaustive search entirely."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — corroboration",
            "text": "After both the algorithm test and reuse finding, the same architecture approver renewed the legacy exception for compatibility."
          }
        },
        {
          "q": "Where are key reuse and laboratory exploitability joined into one continuing policy?",
          "o": [
            {
              "v": "partial",
              "t": "In the key vault, where repeated daily streams appear in the logs.",
              "fb": "The vault establishes reuse but not acceptance of the combined risk."
            },
            {
              "v": "wrong",
              "t": "In the cryptography lab, where paired ciphertexts expose shared structure.",
              "fb": "The lab demonstrates exploitation but does not issue the production exception."
            },
            {
              "v": "danger",
              "t": "At the attacker’s workstation, where recovered transactions are finally read.",
              "fb": "The attacker’s result shows consequence, not the bank’s decision point."
            },
            {
              "v": "expert",
              "t": "In the architect’s office, where vault and lab findings share one waiver.",
              "fb": "The exception file joins the two technical failures to production authorization."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — corroboration",
            "text": "Vault reuse logs and laboratory recovery results are joined under one architecture waiver in the office risk file."
          }
        }
      ]
    },
    "c_applied": {
      "sci": "Bruce Schneier (b. 1963)",
      "topic": "Applied cryptography & security engineering",
      "lede": "Bruce Schneier helped popularize a hard lesson of security engineering: strong mathematics can fail inside a weak system, and weak mathematics cannot be repaired by policy language.",
      "no": 3,
      "profile": "Bruce Schneier is an American cryptographer, security technologist, and author whose books brought modern cryptography and security engineering to a broad technical audience. Applied Cryptography catalogued algorithms and protocols during the rapid expansion of networked computing. In later work, Schneier increasingly emphasized that security is not a product or a single cipher. It is a system of algorithms, keys, implementations, users, incentives, monitoring, and response.\n\nThis broader view explains why “unbreakable encryption” is a misleading phrase. A mathematically strong primitive may be undermined by key reuse, poor random-number generation, insecure modes, leaked secrets, protocol mistakes, or vulnerable endpoints. Conversely, an obsolete or home-grown cipher cannot be saved merely by placing it behind access controls and calling it proprietary. Threat models change as computing, public research, and attacker access change. Systems need planned migration, independent review, and retirement rules.\n\nRisk acceptance is also a technical act. An exception should name the known weakness, exposure, compensating controls, owner, and expiration. Renewing a waiver year after year without reducing the underlying risk converts temporary debt into architecture. Security teams may identify the flaw, auditors may document it, and operations may follow the approved design; responsibility for continued exposure rests with the authority that repeatedly chooses not to migrate.\n\nSchneier’s systems view joins the case’s separate records. One laboratory report showed a weak proprietary design; another experiment showed that key reuse turned the weakness into recoverable transactions. Migration warnings and renewed exceptions identify the architecture authority who kept the combination in production. The failure culminates in the Security Architect’s Office, where technical findings from the lab and vault were converted into repeated authorization rather than retirement.",
      "frame": "Builds a timeline from cryptographic review to migration plan to renewed waiver. “A temporary exception with no exit is not a control. It is the architecture.”",
      "q": [
        {
          "q": "Why is a strong cipher alone insufficient for system security?",
          "o": [
            {
              "t": "Keys, modes, implementations, endpoints, and operations can each defeat it.",
              "v": "expert",
              "fb": "Security depends on the full system and its use, not the primitive in isolation."
            },
            {
              "t": "Modern algorithms are all equivalent once they use keys of similar length.",
              "v": "wrong",
              "fb": "Design, mode, implementation, and threat assumptions differ substantially."
            },
            {
              "t": "A strong cipher prevents any insider from making an unsafe policy decision.",
              "v": "danger",
              "fb": "Cryptography cannot stop authorized leaders from choosing weak configurations or retaining obsolete systems."
            },
            {
              "t": "Cipher replacement can wait until nontechnical business risks have been eliminated.",
              "v": "partial",
              "fb": "Technical and organizational risks interact and must be managed together."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — decisive",
            "text": "The recovered transactions require both an already weak cipher and key material reused after its approved lifetime."
          }
        },
        {
          "q": "What should a meaningful security exception contain?",
          "o": [
            {
              "t": "A statement that the system is proprietary and therefore unlikely to be attacked.",
              "v": "danger",
              "fb": "Obscurity is not a compensating control for a known cryptographic weakness."
            },
            {
              "t": "A permanent approval because migration could interrupt business operations.",
              "v": "wrong",
              "fb": "Indefinite renewal turns accepted risk into the operating design."
            },
            {
              "t": "Known risk, compensating controls, accountable owner, and a time-bounded exit plan.",
              "v": "expert",
              "fb": "A useful exception manages temporary exposure and creates a path to removal."
            },
            {
              "t": "The auditor’s signature without technical detail, owner, or expiration.",
              "v": "partial",
              "fb": "Approval alone cannot guide control, monitoring, or retirement."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — decisive",
            "text": "Every retirement warning, completed migration plan, and final renewal converges in the Security Architect’s Office."
          }
        },
        {
          "q": "Which evidence most directly identifies responsibility for continued exposure?",
          "o": [
            {
              "t": "The external group’s ability to automate its attack across many accounts.",
              "v": "partial",
              "fb": "Automation describes attacker efficiency but not who accepted the vulnerable architecture."
            },
            {
              "t": "Architect-signed waivers postponing a ready migration after known failures.",
              "v": "expert",
              "fb": "The waivers show who owned the decision to retain the weak design and key practice."
            },
            {
              "t": "The auditor’s report that first documented the deprecated cipher and reuse risk.",
              "v": "wrong",
              "fb": "Finding and reporting the risk is distinct from authorizing its continued use."
            },
            {
              "t": "The key custodian who implemented the approved repeated-stream schedule in production.",
              "v": "danger",
              "fb": "Operational execution matters, but the architecture authority set and renewed the unsafe policy."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — decisive",
            "text": "One architecture owner signed the final production renewal after a completed replacement plan and two successful laboratory demonstrations."
          }
        }
      ]
    }
  },
  "story": [
    "<b>Meridian Bank’s proprietary cipher protected millions of transactions until the balances began moving.</b>",
    "The Cryptographer can test what secrecy concealed. The Key Custodian holds the reuse history. The Security Records Clerk has the retirement reviews and production renewals.",
    "A celebrated mathematical breakthrough, a brute-force miracle, and an obsolete system left live are all plausible until the same messages are tested against each explanation.",
    "Nine clues can connect the algorithm, the key practice, the technical demonstrations, and the office that repeatedly kept the architecture in service."
  ],
  "endings": {
    "overclaimWhat": "genius",
    "dismissalWhat": "bruteforce",
    "win": {
      "expertTitle": "The Weakness Reproduced",
      "expert": [
        "You connect Lena Marsh, the Security Architect’s Office, and the retired cipher with repeated key material. Laboratory tests reproduced the attack from ordinary techniques and paired messages.",
        "The evidence rejects both a new mathematical breakthrough and exhaustive search of a sound key. Architecture renewals show who retained the exploitable combination after its replacement path was ready."
      ],
      "soundTitle": "The Laboratory Explains the Loss",
      "sound": [
        "Your accusation identifies the architecture owner, the office, and the deprecated cipher plus repeated streams.",
        "Some implementation details remain incomplete, but the recovered message structure and renewal trail support the same conclusion."
      ],
      "namedTitle": "Correct Architecture, Limited Proof",
      "named": [
        "You name the right person, place, and mechanism.",
        "Missed clues leave parts of the cryptanalysis or key-reuse chain thin, but the verdict matches the reproduced failure."
      ]
    },
    "overclaim": {
      "title": "No New Mathematics Was Needed",
      "body": [
        "The reconstructed algorithm yielded to established analysis once its secret design became available.",
        "Calling the attackers singular geniuses protects the bank’s design myth and ignores the repeatable laboratory result."
      ]
    },
    "dismissal": {
      "title": "Not a Fair Search of a Sound Key",
      "body": [
        "Paired messages exposed shared stream material and predictable fields long before a full keyspace search would matter.",
        "The brute-force story turns an avoidable design shortcut into computational bad luck."
      ]
    },
    "wrongNames": {
      "title": "The Right Weakness, the Wrong Scene",
      "body": [
        "You recognize the cipher and key failure but misplace the authority or the office where the demonstrated weaknesses were repeatedly accepted."
      ]
    }
  }
}
};
