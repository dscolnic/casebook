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
  "teaser": "Millions leave accounts protected by a proprietary cipher. Did a mathematical genius defeat modern encryption, did massive computing exhaust a sound key, or had the bank retained a design and key practice that public cryptanalysis already made unsafe?",
  "overclaimTag": "a genius attack on modern encryption",
  "truthTag": "a deprecated design kept alive with reused keys",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A key vault connected to a proprietary cipher record with a visible attack path\"><rect x=\"78\" y=\"34\" width=\"210\" height=\"72\" rx=\"8\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><circle cx=\"183\" cy=\"70\" r=\"22\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/><path d=\"M183 48 v44 M161 70 h44\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><path d=\"M390 34 h150 v72 H390z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M410 55 h110 M410 72 h110 M410 89 h72\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><path d=\"M330 70 h60\" stroke=\"#B3261E\" stroke-width=\"3\"/><path d=\"M350 58 l12 12 -12 12\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"3\"/></svg>",
  "overclaimTease": "Do not confuse secrecy about the algorithm with strength of the algorithm. Reconstruct what the attackers actually needed: novel mathematics, impossible computation, or an old weakness and repeated key material.",
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
          "id": "vault",
          "label": "The Transaction & Key Vault"
        },
        {
          "id": "cryptolab",
          "label": "The Cryptography Laboratory"
        },
        {
          "id": "office",
          "label": "The Security Architect’s Office"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "weakcipher",
      "items": [
        {
          "id": "genius",
          "label": "A novel mathematical attack defeated a modern bank encryption system"
        },
        {
          "id": "bruteforce",
          "label": "Massive computing exhausted a properly chosen full-length secret key"
        },
        {
          "id": "weakcipher",
          "label": "A retired cipher and repeated key material remained in production"
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
      "hint": "The proprietary algorithm failed known public tests once its design was reconstructed.",
      "reading": "c_kerck"
    },
    "keykeeper": {
      "name": "The Key Custodian",
      "role": "Key-management officer",
      "face": "🗝️",
      "badge": "K",
      "legend": "the key vault",
      "hint": "Short key streams were reused across transaction messages far beyond their approved lifetime.",
      "reading": "c_otp"
    },
    "clerk": {
      "name": "The Security Records Clerk",
      "role": "Risk and architecture clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the architect’s office",
      "hint": "Retirement warnings, exceptions, and production renewals all carry the architect’s approval.",
      "reading": "c_applied"
    }
  },
  "TOPICS": {
    "c_kerck": {
      "sci": "Auguste Kerckhoffs (1835-1903)",
      "topic": "Kerckhoffs’s principle of cipher design",
      "lede": "Auguste Kerckhoffs argued that a military cipher should remain secure even when the enemy knows how the system works.",
      "no": 1,
      "profile": "Auguste Kerckhoffs was a Dutch-born linguist and cryptographer who taught in France and published La Cryptographie Militaire in 1883. In that two-part essay he proposed several requirements for practical military cryptography. The best remembered is now called Kerckhoffs’s principle: a cryptosystem should remain secure even if everything about the system except the key is public knowledge.\n\nThe principle is partly an engineering observation. Algorithms are hard to keep secret. Devices are captured, employees change jobs, software is reverse engineered, documentation leaks, and many users must implement the same method. A small key can be replaced when compromised; an entire hidden design cannot be repaired so easily. Public algorithms also receive scrutiny from researchers who can identify weaknesses before adversaries exploit them. Secrecy of design may slow an attacker, but it should not be the foundation of security.\n\nKerckhoffs did not claim that every public cipher is safe. The method must be strong against known attacks, practical to use, and paired with sound key management. A proprietary cipher can fail quickly once reverse engineered if its designers relied on obscurity, small internal state, predictable transformations, or unreviewed assumptions. In that case, breaking it may require neither unprecedented mathematics nor exhaustive search of a large keyspace.\n\nAt Meridian Bank, the attackers recovered the algorithm from client software and used a known form of statistical analysis against transaction messages. The weakness appeared in an earlier internal review but was hidden behind the phrase proprietary design. Kerckhoffs’s lesson directs the inquiry away from mythical genius. The important question is why an architecture known to fail under public knowledge remained in production.",
      "frame": "Places the proprietary specification beside a reverse-engineered version recovered from public client software. “Assume the enemy knows the machine. What is left that must still be hard?”",
      "q": [
        {
          "q": "What does Kerckhoffs’s principle require?",
          "o": [
            {
              "t": "Security should survive public knowledge of the system except for the key.",
              "v": "expert",
              "fb": "A robust design does not depend on hiding the algorithm from attackers."
            },
            {
              "t": "The algorithm and key should remain secret from users and auditors alike.",
              "v": "wrong",
              "fb": "Widespread systems cannot safely rely on concealing every detail from legitimate scrutiny."
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
            "label": "WHAT clue",
            "text": "The attackers reconstructed the algorithm from distributed software and applied established cryptanalysis; no novel mathematical breakthrough was required."
          }
        },
        {
          "q": "Why is a replaceable key a better secret than a hidden algorithm?",
          "o": [
            {
              "t": "Keys are compact and rotatable; algorithms spread across devices and implementations.",
              "v": "expert",
              "fb": "Operational systems can renew compromised keys but cannot easily recall a leaked design."
            },
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
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The staff cryptographers documented the public-analysis weakness, but the architect who owned production design renewed the exception instead of replacing the cipher."
          }
        },
        {
          "q": "Where should the decision to retain a proprietary weak design appear?",
          "o": [
            {
              "t": "In the architecture file joining review findings, exceptions, and renewal approval.",
              "v": "expert",
              "fb": "The laboratory identifies weakness, while the office record shows who accepted it in production."
            },
            {
              "t": "In the transaction vault where ciphertext, keys, and operating logs were stored.",
              "v": "partial",
              "fb": "The vault preserves operational material but not necessarily the governing design decision."
            },
            {
              "t": "In the attackers’ computers because their exploit method was unavailable to bank reviewers.",
              "v": "wrong",
              "fb": "Internal reviews had already described the weakness before the theft."
            },
            {
              "t": "In a public rumor claiming the bank used an unbreakable proprietary secret formula.",
              "v": "danger",
              "fb": "Marketing folklore cannot replace the actual architecture and risk record."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The technical weakness was demonstrated in the lab; its continued acceptance culminated in the security architect’s office."
          }
        }
      ]
    },
    "c_otp": {
      "sci": "Gilbert Vernam (1890-1960)",
      "topic": "The one-time pad & key reuse",
      "lede": "Gilbert Vernam invented a machine cipher whose strongest form is perfectly secret only when its key is random, as long as the message, and never reused.",
      "no": 2,
      "profile": "Gilbert Sandford Vernam was an American engineer at AT&T who, during the First World War era, designed a system for combining teleprinter text with a key stream using an electrical form of addition now represented as exclusive OR. Vernam originally considered repeating key material. The strongest version emerged when the key stream was truly random, at least as long as the message, kept secret, and used only once. That construction became the one-time pad.\n\nClaude Shannon later proved that a properly used one-time pad provides perfect secrecy: the ciphertext alone gives no information about the plaintext because every possible message of the same length is compatible with some key. The conditions are severe. Generating, distributing, storing, and synchronizing long random keys is difficult. Reusing a key destroys the guarantee. If two ciphertexts use the same pad, combining them cancels the key and reveals a relationship between the plaintexts. Predictable message formats, known fields, and repeated transaction structures can then help recover content and future key stream.\n\nThe lesson extends beyond literal one-time pads. Stream ciphers and modes using nonces or counters can also fail catastrophically when unique values are repeated. Large nominal key size does not rescue repeated keystream. The attacker may exploit algebra and message structure rather than test every possible key.\n\nAt Meridian, the proprietary cipher reused a short daily key stream across thousands of similarly formatted transaction messages. The attackers compared ciphertexts and recovered predictable fields. That is not brute force against a properly chosen modern key. It is a key-management and design failure that made the cryptographic work much smaller than the bank claimed.",
      "frame": "Overlays two ciphertexts produced with the same daily stream and cancels the repeated pattern. “The key disappears when you use it twice. Count the reuse before you count the computers.”",
      "q": [
        {
          "q": "What conditions give a one-time pad perfect secrecy?",
          "o": [
            {
              "t": "A truly random key as long as the message, kept secret and never reused.",
              "v": "expert",
              "fb": "All four conditions are necessary for the information-theoretic guarantee."
            },
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
              "t": "Any large key stored by a trusted bank and changed once each year.",
              "v": "danger",
              "fb": "Large size and institutional trust do not prevent dangerous keystream reuse."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "Thousands of messages reused the same short daily stream, letting attackers cancel key material and exploit predictable transaction formats instead of searching the full keyspace."
          }
        },
        {
          "q": "What happens when two messages use the same one-time-pad key?",
          "o": [
            {
              "t": "Combining the ciphertexts cancels the key and exposes a relation between plaintexts.",
              "v": "expert",
              "fb": "Key reuse converts perfect secrecy into a structure attackers can analyze."
            },
            {
              "t": "The second ciphertext becomes stronger because the key has been tested once.",
              "v": "wrong",
              "fb": "Reuse weakens security rather than validating the key."
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
            "label": "WHO clue",
            "text": "The key custodian logged repeated-use violations, but the crypto architect approved the daily-stream policy to avoid replacing legacy transaction hardware."
          }
        },
        {
          "q": "Where is repeated key use most clearly established?",
          "o": [
            {
              "t": "In key-lifecycle records matched to message IDs and cipher configuration.",
              "v": "expert",
              "fb": "The joined record proves which stream protected which messages and whether uniqueness rules were broken."
            },
            {
              "t": "In the vault camera footage showing custodians entering the room each day.",
              "v": "partial",
              "fb": "Physical access logs do not reveal whether logical key material was repeated."
            },
            {
              "t": "In the total processor count and elapsed attack time reported by the intruders.",
              "v": "wrong",
              "fb": "Compute count cannot establish the bank’s internal key reuse."
            },
            {
              "t": "In a claim that no bank would knowingly violate a basic cryptographic rule.",
              "v": "danger",
              "fb": "Institutional confidence cannot outweigh lifecycle logs and configuration data."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The vault logs document reuse, while the policy that made reuse acceptable is preserved with architecture exceptions in the security office."
          }
        }
      ]
    },
    "c_applied": {
      "sci": "Bruce Schneier (b. 1963)",
      "topic": "Applied cryptography & security engineering",
      "lede": "Bruce Schneier helped popularize a hard lesson of security engineering: strong mathematics can fail inside a weak system, and weak mathematics cannot be repaired by policy language.",
      "no": 3,
      "profile": "Bruce Schneier is an American cryptographer, security technologist, and author whose books brought modern cryptography and security engineering to a broad technical audience. Applied Cryptography catalogued algorithms and protocols during the rapid expansion of networked computing. In later work, Schneier increasingly emphasized that security is not a product or a single cipher. It is a system of algorithms, keys, implementations, users, incentives, monitoring, and response.\n\nThis broader view explains why “unbreakable encryption” is a misleading phrase. A mathematically strong primitive may be undermined by key reuse, poor random-number generation, insecure modes, leaked secrets, protocol mistakes, or vulnerable endpoints. Conversely, an obsolete or home-grown cipher cannot be saved merely by placing it behind access controls and calling it proprietary. Threat models change as computing, public research, and attacker access change. Systems need planned migration, independent review, and retirement rules.\n\nRisk acceptance is also a technical act. An exception should name the known weakness, exposure, compensating controls, owner, and expiration. Renewing a waiver year after year without reducing the underlying risk converts temporary debt into architecture. Security teams may identify the flaw, auditors may document it, and operations may follow the approved design; responsibility for continued exposure rests with the authority that repeatedly chooses not to migrate.\n\nAt Meridian, the attack combined two old weaknesses: a publicly analyzable proprietary cipher and repeated key material. Internal reviews recommended replacement, and a migration design existed. The architect postponed it to avoid transaction-system downtime and renewed the risk waiver. Schneier’s systems view completes the case: the theft did not require impossible computation or a singular genius. It required the bank to keep an understood failure mode in production.",
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
            "label": "WHAT clue",
            "text": "The compromise combined known algorithmic weakness with repeated key material—the kind of system failure that avoids both novel mathematics and exhaustive brute force."
          }
        },
        {
          "q": "What should a meaningful security exception contain?",
          "o": [
            {
              "t": "Known risk, compensating controls, accountable owner, and a time-bounded exit plan.",
              "v": "expert",
              "fb": "A useful exception manages temporary exposure and creates a path to removal."
            },
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
              "t": "The auditor’s signature without technical detail, owner, or expiration.",
              "v": "partial",
              "fb": "Approval alone cannot guide control, monitoring, or retirement."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The lab and vault each documented one weakness; the office risk file joins both to the decision to keep the system live."
          }
        },
        {
          "q": "Which evidence most directly identifies responsibility for continued exposure?",
          "o": [
            {
              "t": "Architect-signed waivers postponing a ready migration after known failures.",
              "v": "expert",
              "fb": "The waivers show who owned the decision to retain the weak design and key practice."
            },
            {
              "t": "The external group’s ability to automate its attack across many accounts.",
              "v": "partial",
              "fb": "Automation describes attacker efficiency but not who accepted the vulnerable architecture."
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
            "label": "WHO clue",
            "text": "The official whose approval appears on every renewal after the cipher review, key-reuse finding, and completed migration plan owned the production architecture decision."
          }
        }
      ]
    }
  },
  "story": [
    "<b>Meridian Bank called its transaction cipher proprietary and mathematically safe.</b> The attackers needed neither a supercomputer nor a new theorem.",
    "The Cryptographer can show what happened when the hidden design became public. The Key Custodian has the reuse history. The Security Records Clerk holds the reviews, migration plan, and renewed exceptions.",
    "A genius attack flatters the system that failed. Brute force turns the loss into bad computational luck. The actual effort must be reconstructed from algorithm, keys, and architecture decisions.",
    "Nine clues can connect an old weakness and repeated key material to the office that kept both in production."
  ],
  "endings": {
    "overclaimWhat": "genius",
    "dismissalWhat": "bruteforce",
    "win": {
      "expertTitle": "The Retired Cipher That Never Retired",
      "expert": [
        "You join the publicly analyzable proprietary design, repeated key stream, and renewed migration waivers to Lena Marsh and the Security Architect’s Office.",
        "The attackers used established methods and algebraic reuse rather than a novel break or exhaustive search of a sound key. The failure was understood internally and retained by design."
      ],
      "soundTitle": "The Architecture Explains the Theft",
      "sound": [
        "Your accusation identifies the architect, the office, and the deprecated cipher plus reused key material.",
        "Some details of the cryptanalysis remain incomplete, but the reviews and lifecycle records reject both trap explanations."
      ],
      "namedTitle": "Correct Cipher, Thin Proof",
      "named": [
        "You select the right person, place, and mechanism.",
        "The verdict holds, although missed clues leave parts of the algorithm analysis, key reuse, or waiver sequence less fully established."
      ]
    },
    "overclaim": {
      "title": "No New Mathematics Was Required",
      "body": [
        "The attackers reconstructed the design from distributed software and applied known analysis to repeated key material.",
        "Calling them singular geniuses protects the myth of an otherwise unbreakable system and hides the bank’s documented weaknesses."
      ]
    },
    "dismissal": {
      "title": "This Was Not a Fair Brute-Force Contest",
      "body": [
        "Reused streams and structural weaknesses reduced the work far below searching a properly chosen modern keyspace.",
        "The “bad luck of computing” story erases design and lifecycle decisions that made the shortcut possible."
      ]
    },
    "wrongNames": {
      "title": "The Weakness, Assigned Elsewhere",
      "body": [
        "You identify the obsolete cipher and key reuse but place responsibility or culmination away from the office that repeatedly renewed the architecture exception."
      ]
    }
  }
}
};
