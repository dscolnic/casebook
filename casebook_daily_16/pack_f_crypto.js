module.exports = { PACK: {
  "id": "f_crypto",
  "title": "The Cipher at Meridian Bank",
  "discipline": "Cryptography & Information Security",
  "teaser": "Millions drained from accounts thought mathematically safe. An unbreakable-code genius? Sheer computing brute force? Or a cipher they were warned to retire?",
  "overclaimTag": "an unbreakable-code genius",
  "truthTag": "a deprecated cipher kept in service",
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
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The WHERE you test determines the dossier, and the conversation costs one day.",
  "overclaimTease": "An unbeatable codebreaker is a useful myth; verify what the mathematics and records support.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "architect",
      "items": [
        {
          "id": "codebreaker",
          "label": "A world-class codebreaking crew"
        },
        {
          "id": "architect",
          "label": "Lena Marsh — the bank's crypto architect"
        },
        {
          "id": "auditor",
          "label": "The security auditor"
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
          "label": "The Cryptography Lab"
        },
        {
          "id": "office",
          "label": "The Security Architect's Office"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "weakcipher",
      "items": [
        {
          "id": "genius",
          "label": "A genius broke unbreakable encryption"
        },
        {
          "id": "bruteforce",
          "label": "Unstoppable brute-force computing — bad luck of the draw"
        },
        {
          "id": "weakcipher",
          "label": "A home-rolled, deprecated cipher kept in use against advice"
        }
      ]
    }
  },
  "PLACES": {
    "vault": {
      "name": "The Transaction & Key Vault",
      "xy": [
        140,
        90
      ]
    },
    "cryptolab": {
      "name": "The Cryptography Lab",
      "xy": [
        330,
        240
      ]
    },
    "office": {
      "name": "The Security Architect's Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "vault",
      "cryptolab"
    ],
    [
      "cryptolab",
      "office"
    ]
  ],
  "CHARACTERS": {
    "cryptographer": {
      "name": "The Cryptographer",
      "role": "Staff cryptographer",
      "face": "🔐",
      "badge": "Y",
      "legend": "the crypto lab",
      "hint": "Flagged the aging cipher years ago; the replace-it memo was shelved."
    },
    "keykeeper": {
      "name": "The Key Custodian",
      "role": "Key-management officer",
      "face": "🗝",
      "badge": "K",
      "legend": "the vault",
      "hint": "Handles the keys; the same short key had been reused far past its life."
    },
    "clerk": {
      "name": "The Clerk",
      "role": "Records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Keeps the audit trail — and the risk waiver that kept the old cipher running."
    }
  },
  "TOPICMAP": {
    "vault": {
      "cryptographer": [
        "c_kerck"
      ],
      "keykeeper": [
        "c_vigenere"
      ],
      "clerk": [
        "c_kasiski"
      ]
    },
    "cryptolab": {
      "cryptographer": [
        "c_cryptanalysis"
      ],
      "keykeeper": [
        "c_feistel"
      ],
      "clerk": [
        "c_keyexch"
      ]
    },
    "office": {
      "cryptographer": [
        "c_rsa"
      ],
      "keykeeper": [
        "c_rsaalg"
      ],
      "clerk": [
        "c_aes"
      ]
    }
  },
  "TOPICS": {
    "c_kerck": {
      "whatHint": "Kerckhoffs said a cipher must stay safe even if everything but the key is known. A home-rolled secret design breaks that rule; ask whether this one leaned on obscurity.",
      "sci": "Auguste Kerckhoffs (1835-1903)",
      "topic": "Kerckhoffs's principle of cipher design",
      "lede": "Auguste Kerckhoffs exposed the precise assumptions that make Kerckhoffs’s principle of cipher design secure—or make it fail.",
      "no": 1,
      "profile": "Today’s cryptographic memorandum profiles Auguste Kerckhoffs through Kerckhoffs’s principle of cipher design. Auguste Kerckhoffs argued that a military cipher system should remain secure even if everything about it except the key becomes public. Cryptography turns assumptions about keys, computation, randomness, and adversaries into concrete protections. Kerckhoffs’s work illuminates one link in that argument. The mathematics may be elegant, but deployment also depends on protocols, parameters, implementation, key custody, and a plan for retirement.\n\nThe disciplined approach is to publish or scrutinize the algorithm, keep keys manageable and replaceable, and judge security under the assumption that adversaries understand the design. A security review should identify the threat model, public algorithm, secret material, key lifetime, randomness source, authentication method, failure behavior, and known attacks. It should also ask whether standardized replacements exist and whether compatibility has become an excuse for keeping obsolete protection.\n\nCipher failures are frequently narrated as contests between a genius attacker and impossible mathematics. More often, an old key length, repeated nonce, unsafe mode, home-built primitive, or exposed endpoint removes the guarantee before any heroic codebreaking begins. Public scrutiny and migration schedules are therefore part of cryptographic design, not administrative details.\n\nThe governing rule is secrecy of implementation is a fragile supplement because one leaked design can defeat every deployment that shares it. Security follows the full construction and its operational assumptions, never the prestige of the word encryption. Key reuse converts separate messages into related evidence that an attacker may combine. A protocol should fail closed without destroying the audit trail needed to understand the attempted misuse.",
      "frame": "Places a retired key schedule under the lamp. \"At The Transaction & Key Vault, the algorithm is only one promise. Explain Kerckhoffs’s principle of cipher design.\"",
      "q": [
        {
          "q": "Which cryptographic account best captures Auguste Kerckhoffs’s contribution to Kerckhoffs’s principle of cipher design?",
          "o": [
            {
              "t": "Auguste Kerckhoffs argued that a military cipher system should remain secure even if everything about it except the key becomes public. The cipher audit lets later reviewers reconstruct events.",
              "v": "expert",
              "fb": "Correct: cryptographic strength follows the algorithm, parameters, keys, protocol, and implementation together."
            },
            {
              "t": "Auguste Kerckhoffs contributed to Kerckhoffs’s principle of cipher design, but the account names the algorithm while leaving parameters, keys, authentication, and retirement untested in context.",
              "v": "partial",
              "fb": "A standard primitive helps only when its mode, parameters, and key handling preserve the intended guarantee."
            },
            {
              "t": "Auguste Kerckhoffs is portrayed as making a cipher secure through secrecy of design rather than a construction that survives informed analysis. The cipher audit defeats that inference in context.",
              "v": "wrong",
              "fb": "Hidden design details are not a substitute for a construction that survives knowledgeable scrutiny."
            },
            {
              "t": "Auguste Kerckhoffs is used to preserve an obsolete scheme because no attacker has publicly displayed every step of a successful compromise. Under the cipher audit, warning is postponed in practice.",
              "v": "danger",
              "fb": "Absence of a public break is weak evidence when known weaknesses and supported replacements already exist."
            }
          ]
        },
        {
          "q": "Which cryptographic review best follows the profile?",
          "o": [
            {
              "t": "For the cryptographic system, conduct this analysis: publish or scrutinize the algorithm, keep keys manageable and replaceable, and judge security under the assumption that adversaries understand the design.",
              "v": "expert",
              "fb": "Correct: cryptographic strength follows the algorithm, parameters, keys, protocol, and implementation together."
            },
            {
              "t": "Verify the primitive against a reference vector, but leave key reuse, randomness, protocol binding, and migration outside the review. The key lifecycle remains weak. The cipher audit leaves one test open.",
              "v": "partial",
              "fb": "A standard primitive helps only when its mode, parameters, and key handling preserve the intended guarantee."
            },
            {
              "t": "Treat possession of ciphertext as evidence that confidentiality held, regardless of weak parameters, unsafe modes, or exposed endpoints. The guarantee does not follow. The cipher audit defeats that inference.",
              "v": "wrong",
              "fb": "Hidden design details are not a substitute for a construction that survives knowledgeable scrutiny."
            },
            {
              "t": "Renew the waiver for compatibility, rotate the same class of keys, and postpone replacement until a customer can prove exploitation. Inertia becomes a security argument. Known weakness is treated as luck.",
              "v": "danger",
              "fb": "Absence of a public break is weak evidence when known weaknesses and supported replacements already exist."
            }
          ]
        },
        {
          "q": "Which security conclusion is best supported?",
          "o": [
            {
              "t": "The security conclusion is that secrecy of implementation is a fragile supplement because one leaked design can defeat every deployment that shares it. The assumptions remain inspectable in the case file.",
              "v": "expert",
              "fb": "Correct: cryptographic strength follows the algorithm, parameters, keys, protocol, and implementation together."
            },
            {
              "t": "A recognized cipher name provides enough assurance that operational key handling and deprecation can remain secondary concerns. Across the cipher audit, comparison remains incomplete in the case file.",
              "v": "partial",
              "fb": "A standard primitive helps only when its mode, parameters, and key handling preserve the intended guarantee."
            },
            {
              "t": "A secret implementation can compensate for known mathematical and protocol weaknesses if access to its source code remains restricted. Within the cipher audit, no support appears in the case file.",
              "v": "wrong",
              "fb": "Hidden design details are not a substitute for a construction that survives knowledgeable scrutiny."
            },
            {
              "t": "The loss is presumed to reflect an unprecedented genius or unstoppable computation, leaving no room for a weak construction kept in service. Within the cipher audit, assumption replaces verification.",
              "v": "danger",
              "fb": "Absence of a public break is weak evidence when known weaknesses and supported replacements already exist."
            }
          ]
        }
      ]
    },
    "c_vigenere": {
      "whatHint": "The Vigenère cipher once looked unbreakable too — until its structure was understood. 'Unbreakable' is a marketing word; ask what the construction actually was.",
      "sci": "Blaise de Vigenère (1523-1596)",
      "topic": "The Vigenère cipher",
      "lede": "Blaise de Vigenère turned the Vigenère cipher into a construction that could be analyzed instead of merely trusted.",
      "no": 2,
      "profile": "Today’s cryptographic memorandum profiles Blaise de Vigenère through the Vigenère cipher. Blaise de Vigenère described strong polyalphabetic systems, including an autokey method; later tradition attached his name to the repeating-key tableau cipher. Cryptography turns assumptions about keys, computation, randomness, and adversaries into concrete protections. Vigenère’s work illuminates one link in that argument. The mathematics may be elegant, but deployment also depends on protocols, parameters, implementation, key custody, and a plan for retirement.\n\nThe disciplined approach is to combine plaintext with a changing sequence of alphabet shifts and avoid short, predictable key repetition. A security review should identify the threat model, public algorithm, secret material, key lifetime, randomness source, authentication method, failure behavior, and known attacks. It should also ask whether standardized replacements exist and whether compatibility has become an excuse for keeping obsolete protection.\n\nCipher failures are frequently narrated as contests between a genius attacker and impossible mathematics. More often, an old key length, repeated nonce, unsafe mode, home-built primitive, or exposed endpoint removes the guarantee before any heroic codebreaking begins. Public scrutiny and migration schedules are therefore part of cryptographic design, not administrative details.\n\nThe governing rule is a cipher's historical name can obscure its exact mechanism, and security depends on the mechanism rather than the label. Security follows the full construction and its operational assumptions, never the prestige of the word encryption. A waiver that extends an obsolete algorithm should name the exposure, compensating controls, owner, and retirement date. Key reuse converts separate messages into related evidence that an attacker may combine.",
      "frame": "Seals the key drawer. \"Before you call anyone a genius, tell me how the Vigenère cipher actually breaks.\"",
      "q": [
        {
          "q": "Which cryptographic account best captures Blaise de Vigenère’s contribution to the Vigenère cipher?",
          "o": [
            {
              "t": "Blaise de Vigenère described strong polyalphabetic systems, including an autokey method; later tradition attached his name to the repeating-key tableau cipher. The assumptions remain inspectable.",
              "v": "expert",
              "fb": "Correct: cryptographic strength follows the algorithm, parameters, keys, protocol, and implementation together."
            },
            {
              "t": "Blaise de Vigenère contributed to the Vigenère cipher, but the account names the algorithm while leaving parameters, keys, authentication, and retirement untested. The key lifecycle remains weak.",
              "v": "partial",
              "fb": "A standard primitive helps only when its mode, parameters, and key handling preserve the intended guarantee."
            },
            {
              "t": "Blaise de Vigenère is portrayed as making a cipher secure through secrecy of design rather than a construction that survives informed analysis. The cipher audit defeats that inference.",
              "v": "wrong",
              "fb": "Hidden design details are not a substitute for a construction that survives knowledgeable scrutiny."
            },
            {
              "t": "Blaise de Vigenère is used to preserve an obsolete scheme because no attacker has publicly displayed every step of a successful compromise. Under the cipher audit, warning is postponed.",
              "v": "danger",
              "fb": "Absence of a public break is weak evidence when known weaknesses and supported replacements already exist."
            }
          ]
        },
        {
          "q": "Which cryptographic review best follows the profile?",
          "o": [
            {
              "t": "For the cryptographic system, conduct this analysis: combine plaintext with a changing sequence of alphabet shifts and avoid short, predictable key repetition in the operational record.",
              "v": "expert",
              "fb": "Correct: cryptographic strength follows the algorithm, parameters, keys, protocol, and implementation together."
            },
            {
              "t": "Verify the primitive against a reference vector, but leave key reuse, randomness, protocol binding, and migration outside the review. The key lifecycle remains weak in the dated record.",
              "v": "partial",
              "fb": "A standard primitive helps only when its mode, parameters, and key handling preserve the intended guarantee."
            },
            {
              "t": "Treat possession of ciphertext as evidence that confidentiality held, regardless of weak parameters, unsafe modes, or exposed endpoints. The guarantee is inferred from a narrower technical result.",
              "v": "wrong",
              "fb": "Hidden design details are not a substitute for a construction that survives knowledgeable scrutiny."
            },
            {
              "t": "Renew the waiver for compatibility, rotate the same class of keys, and postpone replacement until a customer can prove exploitation. Known weakness is treated as luck in the case file.",
              "v": "danger",
              "fb": "Absence of a public break is weak evidence when known weaknesses and supported replacements already exist."
            }
          ]
        },
        {
          "q": "Which security conclusion is best supported?",
          "o": [
            {
              "t": "The security conclusion is that a cipher's historical name can obscure its exact mechanism, and security depends on the mechanism rather than the label. The assumptions remain inspectable.",
              "v": "expert",
              "fb": "Correct: cryptographic strength follows the algorithm, parameters, keys, protocol, and implementation together."
            },
            {
              "t": "A recognized cipher name provides enough assurance that operational key handling and deprecation can remain secondary concerns. Across the cipher audit, comparison remains incomplete in the case file.",
              "v": "partial",
              "fb": "A standard primitive helps only when its mode, parameters, and key handling preserve the intended guarantee."
            },
            {
              "t": "A secret implementation can compensate for known mathematical and protocol weaknesses if access to its source code remains restricted. Within the cipher audit, no support appears in the case file.",
              "v": "wrong",
              "fb": "Hidden design details are not a substitute for a construction that survives knowledgeable scrutiny."
            },
            {
              "t": "The loss is presumed to reflect an unprecedented genius or unstoppable computation, leaving no room for a weak construction kept in service. Within the cipher audit, assumption replaces verification.",
              "v": "danger",
              "fb": "Absence of a public break is weak evidence when known weaknesses and supported replacements already exist."
            }
          ]
        }
      ]
    },
    "c_kasiski": {
      "whatHint": "Kasiski broke a 'perfect' cipher with patience and pattern, no genius required. Ask whether ordinary weaknesses, like a reused key, opened this one.",
      "sci": "Friedrich Kasiski (1805-1881)",
      "topic": "Breaking the polyalphabetic cipher",
      "lede": "Keys, adversaries, and public scrutiny converge in Friedrich Kasiski’s work on breaking the polyalphabetic cipher.",
      "no": 3,
      "profile": "Today’s cryptographic memorandum profiles Friedrich Kasiski through breaking the polyalphabetic cipher. Friedrich Kasiski published a systematic method for attacking repeating-key polyalphabetic ciphers by examining repeated ciphertext sequences and their spacing. Cryptography turns assumptions about keys, computation, randomness, and adversaries into concrete protections. Kasiski’s work illuminates one link in that argument. The mathematics may be elegant, but deployment also depends on protocols, parameters, implementation, key custody, and a plan for retirement.\n\nThe disciplined approach is to factor distances between repeated groups to estimate key length, then analyze each key position as a separate substitution. A security review should identify the threat model, public algorithm, secret material, key lifetime, randomness source, authentication method, failure behavior, and known attacks. It should also ask whether standardized replacements exist and whether compatibility has become an excuse for keeping obsolete protection.\n\nCipher failures are frequently narrated as contests between a genius attacker and impossible mathematics. More often, an old key length, repeated nonce, unsafe mode, home-built primitive, or exposed endpoint removes the guarantee before any heroic codebreaking begins. Public scrutiny and migration schedules are therefore part of cryptographic design, not administrative details.\n\nThe governing rule is a complex-looking cipher can collapse when periodic key reuse divides it into several simpler problems. Security follows the full construction and its operational assumptions, never the prestige of the word encryption. A protocol should fail closed without destroying the audit trail needed to understand the attempted misuse. A waiver that extends an obsolete algorithm should name the exposure, compensating controls, owner, and retirement date.",
      "frame": "Taps the waiver date. \"Mathematics does not renew itself. Show me what breaking the polyalphabetic cipher requires in service.\"",
      "q": [
        {
          "q": "Which cryptographic account best captures Friedrich Kasiski’s contribution to breaking the polyalphabetic cipher?",
          "o": [
            {
              "t": "Friedrich Kasiski published a systematic method for attacking repeating-key polyalphabetic ciphers by examining repeated ciphertext sequences and their spacing. The cipher audit lets later reviewers reconstruct events in the case file.",
              "v": "expert",
              "fb": "Correct: cryptographic strength follows the algorithm, parameters, keys, protocol, and implementation together."
            },
            {
              "t": "Friedrich Kasiski contributed to breaking the polyalphabetic cipher, but the account names the algorithm while leaving parameters, keys, authentication, and retirement untested. The key lifecycle remains weak in the case file.",
              "v": "partial",
              "fb": "A standard primitive helps only when its mode, parameters, and key handling preserve the intended guarantee."
            },
            {
              "t": "Friedrich Kasiski is portrayed as making a cipher secure through secrecy of design rather than a construction that survives informed analysis. Public analysis rejects that basis. The guarantee is inferred from a narrower technical result.",
              "v": "wrong",
              "fb": "Hidden design details are not a substitute for a construction that survives knowledgeable scrutiny."
            },
            {
              "t": "Friedrich Kasiski is used to preserve an obsolete scheme because no attacker has publicly displayed every step of a successful compromise. Inertia becomes a security argument. Known weakness is treated as luck in the case file.",
              "v": "danger",
              "fb": "Absence of a public break is weak evidence when known weaknesses and supported replacements already exist."
            }
          ]
        },
        {
          "q": "Which cryptographic review best follows the profile?",
          "o": [
            {
              "t": "For the cryptographic system, conduct this analysis: factor distances between repeated groups to estimate key length, then analyze each key position as a separate substitution.",
              "v": "expert",
              "fb": "Correct: cryptographic strength follows the algorithm, parameters, keys, protocol, and implementation together."
            },
            {
              "t": "Verify the primitive against a reference vector, but leave key reuse, randomness, protocol binding, and migration outside the review. The cipher audit leaves one test open.",
              "v": "partial",
              "fb": "A standard primitive helps only when its mode, parameters, and key handling preserve the intended guarantee."
            },
            {
              "t": "Treat possession of ciphertext as evidence that confidentiality held, regardless of weak parameters, unsafe modes, or exposed endpoints. The cipher audit defeats that inference.",
              "v": "wrong",
              "fb": "Hidden design details are not a substitute for a construction that survives knowledgeable scrutiny."
            },
            {
              "t": "Renew the waiver for compatibility, rotate the same class of keys, and postpone replacement until a customer can prove exploitation. Inertia becomes a security argument.",
              "v": "danger",
              "fb": "Absence of a public break is weak evidence when known weaknesses and supported replacements already exist."
            }
          ]
        },
        {
          "q": "Which security conclusion is best supported?",
          "o": [
            {
              "t": "The security conclusion is that a complex-looking cipher can collapse when periodic key reuse divides it into several simpler problems. The assumptions remain inspectable in the case file.",
              "v": "expert",
              "fb": "Correct: cryptographic strength follows the algorithm, parameters, keys, protocol, and implementation together."
            },
            {
              "t": "A recognized cipher name provides enough assurance that operational key handling and deprecation can remain secondary concerns. The cipher audit leaves one test open in the case file.",
              "v": "partial",
              "fb": "A standard primitive helps only when its mode, parameters, and key handling preserve the intended guarantee."
            },
            {
              "t": "A secret implementation can compensate for known mathematical and protocol weaknesses if access to its source code remains restricted. The guarantee is inferred from a narrower technical result.",
              "v": "wrong",
              "fb": "Hidden design details are not a substitute for a construction that survives knowledgeable scrutiny."
            },
            {
              "t": "The loss is presumed to reflect an unprecedented genius or unstoppable computation, leaving no room for a weak construction kept in service. Under the cipher audit, warning is postponed.",
              "v": "danger",
              "fb": "Absence of a public break is weak evidence when known weaknesses and supported replacements already exist."
            }
          ]
        }
      ]
    },
    "c_cryptanalysis": {
      "whatHint": "Friedman broke ciphers with statistics, not miracles. Ask whether the break exploited a known weakness rather than unprecedented brilliance or infinite compute.",
      "sci": "William F. Friedman (1891-1969)",
      "topic": "Modern cryptanalysis",
      "lede": "William F. Friedman exposed the precise assumptions that make modern cryptanalysis secure—or make it fail.",
      "no": 4,
      "profile": "Today’s cryptographic memorandum profiles William F. Friedman through modern cryptanalysis. William F. Friedman professionalized American cryptanalysis, developed statistical techniques such as the index of coincidence, and led major codebreaking organizations. Cryptography turns assumptions about keys, computation, randomness, and adversaries into concrete protections. Friedman’s work illuminates one link in that argument. The mathematics may be elegant, but deployment also depends on protocols, parameters, implementation, key custody, and a plan for retirement.\n\nThe disciplined approach is to measure repeated patterns and symbol distributions, form competing key hypotheses, and test them against linguistic and operational evidence. A security review should identify the threat model, public algorithm, secret material, key lifetime, randomness source, authentication method, failure behavior, and known attacks. It should also ask whether standardized replacements exist and whether compatibility has become an excuse for keeping obsolete protection.\n\nCipher failures are frequently narrated as contests between a genius attacker and impossible mathematics. More often, an old key length, repeated nonce, unsafe mode, home-built primitive, or exposed endpoint removes the guarantee before any heroic codebreaking begins. Public scrutiny and migration schedules are therefore part of cryptographic design, not administrative details.\n\nThe governing rule is codebreaking advances when intuition is converted into reproducible statistics and disciplined hypothesis testing. Security follows the full construction and its operational assumptions, never the prestige of the word encryption. Key reuse converts separate messages into related evidence that an attacker may combine. A protocol should fail closed without destroying the audit trail needed to understand the attempted misuse. A waiver that extends an obsolete algorithm should name the exposure, compensating controls, owner, and retirement date.",
      "frame": "Places a retired key schedule under the lamp. \"At The Cryptography Lab, the algorithm is only one promise. Explain modern cryptanalysis.\"",
      "q": [
        {
          "q": "Which cryptographic account best captures William F. Friedman’s contribution to modern cryptanalysis?",
          "o": [
            {
              "t": "William F. Friedman professionalized American cryptanalysis, developed statistical techniques such as the index of coincidence, and led major codebreaking organizations. The assumptions remain inspectable.",
              "v": "expert",
              "fb": "Correct: cryptographic strength follows the algorithm, parameters, keys, protocol, and implementation together."
            },
            {
              "t": "William F. Friedman contributed to modern cryptanalysis, but the account names the algorithm while leaving parameters, keys, authentication, and retirement untested. The key lifecycle remains weak.",
              "v": "partial",
              "fb": "A standard primitive helps only when its mode, parameters, and key handling preserve the intended guarantee."
            },
            {
              "t": "William F. Friedman is portrayed as making a cipher secure through secrecy of design rather than a construction that survives informed analysis. Under the cipher audit, direct comparison fails.",
              "v": "wrong",
              "fb": "Hidden design details are not a substitute for a construction that survives knowledgeable scrutiny."
            },
            {
              "t": "William F. Friedman is used to preserve an obsolete scheme because no attacker has publicly displayed every step of a successful compromise. Within the cipher audit, assumption replaces verification.",
              "v": "danger",
              "fb": "Absence of a public break is weak evidence when known weaknesses and supported replacements already exist."
            }
          ]
        },
        {
          "q": "Which cryptographic review best follows the profile?",
          "o": [
            {
              "t": "For the cryptographic system, conduct this analysis: measure repeated patterns and symbol distributions, form competing key hypotheses, and test them against linguistic and operational evidence in the operational record in the case file.",
              "v": "expert",
              "fb": "Correct: cryptographic strength follows the algorithm, parameters, keys, protocol, and implementation together."
            },
            {
              "t": "Verify the primitive against a reference vector, but leave key reuse, randomness, protocol binding, and migration outside the review. The key lifecycle remains weak. Protocol context is unresolved in the dated record in the case file.",
              "v": "partial",
              "fb": "A standard primitive helps only when its mode, parameters, and key handling preserve the intended guarantee."
            },
            {
              "t": "Treat possession of ciphertext as evidence that confidentiality held, regardless of weak parameters, unsafe modes, or exposed endpoints. Public analysis rejects that basis. The guarantee is inferred from a narrower technical result.",
              "v": "wrong",
              "fb": "Hidden design details are not a substitute for a construction that survives knowledgeable scrutiny."
            },
            {
              "t": "Renew the waiver for compatibility, rotate the same class of keys, and postpone replacement until a customer can prove exploitation. Within the cipher audit, assumption replaces verification across the available record in the case file.",
              "v": "danger",
              "fb": "Absence of a public break is weak evidence when known weaknesses and supported replacements already exist."
            }
          ]
        },
        {
          "q": "Which security conclusion is best supported?",
          "o": [
            {
              "t": "The security conclusion is that codebreaking advances when intuition is converted into reproducible statistics and disciplined hypothesis testing. The assumptions remain inspectable in the case file.",
              "v": "expert",
              "fb": "Correct: cryptographic strength follows the algorithm, parameters, keys, protocol, and implementation together."
            },
            {
              "t": "A recognized cipher name provides enough assurance that operational key handling and deprecation can remain secondary concerns. Across the cipher audit, comparison remains incomplete in the case file.",
              "v": "partial",
              "fb": "A standard primitive helps only when its mode, parameters, and key handling preserve the intended guarantee."
            },
            {
              "t": "A secret implementation can compensate for known mathematical and protocol weaknesses if access to its source code remains restricted. Within the cipher audit, no support appears in the case file.",
              "v": "wrong",
              "fb": "Hidden design details are not a substitute for a construction that survives knowledgeable scrutiny."
            },
            {
              "t": "The loss is presumed to reflect an unprecedented genius or unstoppable computation, leaving no room for a weak construction kept in service. Within the cipher audit, assumption replaces verification.",
              "v": "danger",
              "fb": "Absence of a public break is weak evidence when known weaknesses and supported replacements already exist."
            }
          ]
        }
      ]
    },
    "c_feistel": {
      "whatHint": "Feistel's designs are judged by public scrutiny and key length. Ask whether this cipher met the modern standard, or was a private construction kept past its time.",
      "sci": "Horst Feistel (1915-1990)",
      "topic": "The Feistel cipher & DES",
      "lede": "Horst Feistel turned the Feistel cipher and DES into a construction that could be analyzed instead of merely trusted.",
      "no": 5,
      "profile": "Today’s cryptographic memorandum profiles Horst Feistel through the Feistel cipher and DES. Horst Feistel developed the structure used in Lucifer and later DES, splitting a block and repeatedly mixing one half with a keyed round function. Cryptography turns assumptions about keys, computation, randomness, and adversaries into concrete protections. Feistel’s work illuminates one link in that argument. The mathematics may be elegant, but deployment also depends on protocols, parameters, implementation, key custody, and a plan for retirement.\n\nThe disciplined approach is to alternate substitution and permutation through rounds while using a key schedule, then reverse the round keys to decrypt. A security review should identify the threat model, public algorithm, secret material, key lifetime, randomness source, authentication method, failure behavior, and known attacks. It should also ask whether standardized replacements exist and whether compatibility has become an excuse for keeping obsolete protection.\n\nCipher failures are frequently narrated as contests between a genius attacker and impossible mathematics. More often, an old key length, repeated nonce, unsafe mode, home-built primitive, or exposed endpoint removes the guarantee before any heroic codebreaking begins. Public scrutiny and migration schedules are therefore part of cryptographic design, not administrative details.\n\nThe governing rule is a reusable structure can support strong ciphers, but security still depends on block size, key length, round design, and public analysis. Security follows the full construction and its operational assumptions, never the prestige of the word encryption. A waiver that extends an obsolete algorithm should name the exposure, compensating controls, owner, and retirement date.",
      "frame": "Seals the key drawer. \"Before you call anyone a genius, tell me how the Feistel cipher and DES actually breaks.\"",
      "q": [
        {
          "q": "Which cryptographic account best captures Horst Feistel’s contribution to the Feistel cipher and DES?",
          "o": [
            {
              "t": "Horst Feistel developed the structure used in Lucifer and later DES, splitting a block and repeatedly mixing one half with a keyed round function. Through the cipher audit, independent review remains possible in the case file in the case file.",
              "v": "expert",
              "fb": "Correct: cryptographic strength follows the algorithm, parameters, keys, protocol, and implementation together."
            },
            {
              "t": "Horst Feistel contributed to the Feistel cipher and DES, but the account names the algorithm while leaving parameters, keys, authentication, and retirement untested. The cipher audit leaves one test open in the case file in the case file.",
              "v": "partial",
              "fb": "A standard primitive helps only when its mode, parameters, and key handling preserve the intended guarantee."
            },
            {
              "t": "Horst Feistel is portrayed as making a cipher secure through secrecy of design rather than a construction that survives informed analysis. Public analysis rejects that basis. The guarantee is inferred from a narrower technical result.",
              "v": "wrong",
              "fb": "Hidden design details are not a substitute for a construction that survives knowledgeable scrutiny."
            },
            {
              "t": "Horst Feistel is used to preserve an obsolete scheme because no attacker has publicly displayed every step of a successful compromise. Inertia becomes a security argument. Known weakness is treated as luck in the case file in the case file.",
              "v": "danger",
              "fb": "Absence of a public break is weak evidence when known weaknesses and supported replacements already exist."
            }
          ]
        },
        {
          "q": "Which cryptographic review best follows the profile?",
          "o": [
            {
              "t": "For the cryptographic system, conduct this analysis: alternate substitution and permutation through rounds while using a key schedule, then reverse the round keys to decrypt.",
              "v": "expert",
              "fb": "Correct: cryptographic strength follows the algorithm, parameters, keys, protocol, and implementation together."
            },
            {
              "t": "Verify the primitive against a reference vector, but leave key reuse, randomness, protocol binding, and migration outside the review. The cipher audit leaves one test open.",
              "v": "partial",
              "fb": "A standard primitive helps only when its mode, parameters, and key handling preserve the intended guarantee."
            },
            {
              "t": "Treat possession of ciphertext as evidence that confidentiality held, regardless of weak parameters, unsafe modes, or exposed endpoints. The cipher audit defeats that inference.",
              "v": "wrong",
              "fb": "Hidden design details are not a substitute for a construction that survives knowledgeable scrutiny."
            },
            {
              "t": "Renew the waiver for compatibility, rotate the same class of keys, and postpone replacement until a customer can prove exploitation. Inertia becomes a security argument.",
              "v": "danger",
              "fb": "Absence of a public break is weak evidence when known weaknesses and supported replacements already exist."
            }
          ]
        },
        {
          "q": "Which security conclusion is best supported?",
          "o": [
            {
              "t": "The security conclusion is that a reusable structure can support strong ciphers, but security still depends on block size, key length, round design, and public analysis in the case file.",
              "v": "expert",
              "fb": "Correct: cryptographic strength follows the algorithm, parameters, keys, protocol, and implementation together."
            },
            {
              "t": "A recognized cipher name provides enough assurance that operational key handling and deprecation can remain secondary concerns. The cipher audit leaves one test open in the case file.",
              "v": "partial",
              "fb": "A standard primitive helps only when its mode, parameters, and key handling preserve the intended guarantee."
            },
            {
              "t": "A secret implementation can compensate for known mathematical and protocol weaknesses if access to its source code remains restricted. The guarantee is inferred from a narrower technical result.",
              "v": "wrong",
              "fb": "Hidden design details are not a substitute for a construction that survives knowledgeable scrutiny."
            },
            {
              "t": "The loss is presumed to reflect an unprecedented genius or unstoppable computation, leaving no room for a weak construction kept in service. Under the cipher audit, warning is postponed.",
              "v": "danger",
              "fb": "Absence of a public break is weak evidence when known weaknesses and supported replacements already exist."
            }
          ]
        }
      ]
    },
    "c_keyexch": {
      "whatHint": "Hellman's key exchange only helps if keys aren't reused or leaked. Ask what the key-management records show about reuse and rotation.",
      "sci": "Martin Hellman (b. 1945)",
      "topic": "The Diffie-Hellman key exchange",
      "lede": "Keys, adversaries, and public scrutiny converge in Martin Hellman’s work on the Diffie-Hellman key exchange.",
      "no": 6,
      "profile": "Today’s cryptographic memorandum profiles Martin Hellman through the Diffie-Hellman key exchange. Martin Hellman co-created the Diffie–Hellman key exchange, allowing two parties to derive a shared secret over an observed channel. Cryptography turns assumptions about keys, computation, randomness, and adversaries into concrete protections. Hellman’s work illuminates one link in that argument. The mathematics may be elegant, but deployment also depends on protocols, parameters, implementation, key custody, and a plan for retirement.\n\nThe disciplined approach is to exchange public group values, combine them with private exponents, and authenticate the exchange to prevent an intermediary from substituting keys. A security review should identify the threat model, public algorithm, secret material, key lifetime, randomness source, authentication method, failure behavior, and known attacks. It should also ask whether standardized replacements exist and whether compatibility has become an excuse for keeping obsolete protection.\n\nCipher failures are frequently narrated as contests between a genius attacker and impossible mathematics. More often, an old key length, repeated nonce, unsafe mode, home-built primitive, or exposed endpoint removes the guarantee before any heroic codebreaking begins. Public scrutiny and migration schedules are therefore part of cryptographic design, not administrative details.\n\nThe governing rule is mathematics can hide the shared secret from eavesdroppers, but unauthenticated exchange remains vulnerable to active impersonation. Security follows the full construction and its operational assumptions, never the prestige of the word encryption. A protocol should fail closed without destroying the audit trail needed to understand the attempted misuse. A waiver that extends an obsolete algorithm should name the exposure, compensating controls, owner, and retirement date.",
      "frame": "Taps the waiver date. \"Mathematics does not renew itself. Show me what the Diffie-Hellman key exchange requires in service.\"",
      "q": [
        {
          "q": "Which cryptographic account best captures Martin Hellman’s contribution to the Diffie-Hellman key exchange?",
          "o": [
            {
              "t": "Martin Hellman co-created the Diffie–Hellman key exchange, allowing two parties to derive a shared secret over an observed channel. The cipher audit keeps assumptions explicit in the case file.",
              "v": "expert",
              "fb": "Correct: cryptographic strength follows the algorithm, parameters, keys, protocol, and implementation together."
            },
            {
              "t": "Martin Hellman contributed to the Diffie-Hellman key exchange, but the account names the algorithm while leaving parameters, keys, authentication, and retirement untested in the case file.",
              "v": "partial",
              "fb": "A standard primitive helps only when its mode, parameters, and key handling preserve the intended guarantee."
            },
            {
              "t": "Martin Hellman is portrayed as making a cipher secure through secrecy of design rather than a construction that survives informed analysis. The guarantee is inferred from a narrower technical result.",
              "v": "wrong",
              "fb": "Hidden design details are not a substitute for a construction that survives knowledgeable scrutiny."
            },
            {
              "t": "Martin Hellman is used to preserve an obsolete scheme because no attacker has publicly displayed every step of a successful compromise. Known weakness is treated as luck in the case file.",
              "v": "danger",
              "fb": "Absence of a public break is weak evidence when known weaknesses and supported replacements already exist."
            }
          ]
        },
        {
          "q": "Which cryptographic review best follows the profile?",
          "o": [
            {
              "t": "For the cryptographic system, conduct this analysis: exchange public group values, combine them with private exponents, and authenticate the exchange to prevent an intermediary from substituting keys in the dated record in the case file.",
              "v": "expert",
              "fb": "Correct: cryptographic strength follows the algorithm, parameters, keys, protocol, and implementation together."
            },
            {
              "t": "Verify the primitive against a reference vector, but leave key reuse, randomness, protocol binding, and migration outside the review. The key lifecycle remains weak. Protocol context is unresolved in the dated record in the case file.",
              "v": "partial",
              "fb": "A standard primitive helps only when its mode, parameters, and key handling preserve the intended guarantee."
            },
            {
              "t": "Treat possession of ciphertext as evidence that confidentiality held, regardless of weak parameters, unsafe modes, or exposed endpoints. Public analysis rejects that basis. The guarantee is inferred from a narrower technical result.",
              "v": "wrong",
              "fb": "Hidden design details are not a substitute for a construction that survives knowledgeable scrutiny."
            },
            {
              "t": "Renew the waiver for compatibility, rotate the same class of keys, and postpone replacement until a customer can prove exploitation. Within the cipher audit, assumption replaces verification across the available record in the case file.",
              "v": "danger",
              "fb": "Absence of a public break is weak evidence when known weaknesses and supported replacements already exist."
            }
          ]
        },
        {
          "q": "Which security conclusion is best supported?",
          "o": [
            {
              "t": "The security conclusion is that mathematics can hide the shared secret from eavesdroppers, but unauthenticated exchange remains vulnerable to active impersonation in the dated record in the case file.",
              "v": "expert",
              "fb": "Correct: cryptographic strength follows the algorithm, parameters, keys, protocol, and implementation together."
            },
            {
              "t": "A recognized cipher name provides enough assurance that operational key handling and deprecation can remain secondary concerns. The key lifecycle remains weak in the dated record in the case file.",
              "v": "partial",
              "fb": "A standard primitive helps only when its mode, parameters, and key handling preserve the intended guarantee."
            },
            {
              "t": "A secret implementation can compensate for known mathematical and protocol weaknesses if access to its source code remains restricted. The guarantee is inferred from a narrower technical result.",
              "v": "wrong",
              "fb": "Hidden design details are not a substitute for a construction that survives knowledgeable scrutiny."
            },
            {
              "t": "The loss is presumed to reflect an unprecedented genius or unstoppable computation, leaving no room for a weak construction kept in service. Inertia becomes a security argument in the case file.",
              "v": "danger",
              "fb": "Absence of a public break is weak evidence when known weaknesses and supported replacements already exist."
            }
          ]
        }
      ]
    },
    "c_rsa": {
      "whatHint": "RSA's strength is a parameter you choose — adequate key size defeats brute force by design. Ask whether the system's parameters were kept current, or left short.",
      "sci": "Ronald Rivest (b. 1947)",
      "topic": "The RSA cipher",
      "lede": "Ronald Rivest exposed the precise assumptions that make the RSA cipher secure—or make it fail.",
      "no": 7,
      "profile": "Today’s cryptographic memorandum profiles Ronald Rivest through the RSA cipher. Ronald Rivest co-created RSA, using modular exponentiation and the difficulty of factoring a large composite number for public-key encryption and signatures. Cryptography turns assumptions about keys, computation, randomness, and adversaries into concrete protections. Rivest’s work illuminates one link in that argument. The mathematics may be elegant, but deployment also depends on protocols, parameters, implementation, key custody, and a plan for retirement.\n\nThe disciplined approach is to generate strong primes, protect the private exponent, use standardized padding, and choose key sizes appropriate to current attacks. A security review should identify the threat model, public algorithm, secret material, key lifetime, randomness source, authentication method, failure behavior, and known attacks. It should also ask whether standardized replacements exist and whether compatibility has become an excuse for keeping obsolete protection.\n\nCipher failures are frequently narrated as contests between a genius attacker and impossible mathematics. More often, an old key length, repeated nonce, unsafe mode, home-built primitive, or exposed endpoint removes the guarantee before any heroic codebreaking begins. Public scrutiny and migration schedules are therefore part of cryptographic design, not administrative details.\n\nThe governing rule is a sound mathematical primitive can be undermined by weak randomness, unsafe padding, side channels, or obsolete parameters. Security follows the full construction and its operational assumptions, never the prestige of the word encryption. Key reuse converts separate messages into related evidence that an attacker may combine. A protocol should fail closed without destroying the audit trail needed to understand the attempted misuse.",
      "frame": "Places a retired key schedule under the lamp. \"At The Security Architect's Office, the algorithm is only one promise. Explain the RSA cipher.\"",
      "q": [
        {
          "q": "Which cryptographic account best captures Ronald Rivest’s contribution to the RSA cipher?",
          "o": [
            {
              "t": "Ronald Rivest co-created RSA, using modular exponentiation and the difficulty of factoring a large composite number for public-key encryption and signatures. The assumptions remain inspectable.",
              "v": "expert",
              "fb": "Correct: cryptographic strength follows the algorithm, parameters, keys, protocol, and implementation together."
            },
            {
              "t": "Ronald Rivest contributed to the RSA cipher, but the account names the algorithm while leaving parameters, keys, authentication, and retirement untested. The key lifecycle remains weak.",
              "v": "partial",
              "fb": "A standard primitive helps only when its mode, parameters, and key handling preserve the intended guarantee."
            },
            {
              "t": "Ronald Rivest is portrayed as making a cipher secure through secrecy of design rather than a construction that survives informed analysis. Within the cipher audit, no support appears.",
              "v": "wrong",
              "fb": "Hidden design details are not a substitute for a construction that survives knowledgeable scrutiny."
            },
            {
              "t": "Ronald Rivest is used to preserve an obsolete scheme because no attacker has publicly displayed every step of a successful compromise. Inside the cipher audit, drama displaces testing.",
              "v": "danger",
              "fb": "Absence of a public break is weak evidence when known weaknesses and supported replacements already exist."
            }
          ]
        },
        {
          "q": "Which cryptographic review best follows the profile?",
          "o": [
            {
              "t": "For the cryptographic system, conduct this analysis: generate strong primes, protect the private exponent, use standardized padding, and choose key sizes appropriate to current attacks. The assumptions remain inspectable.",
              "v": "expert",
              "fb": "Correct: cryptographic strength follows the algorithm, parameters, keys, protocol, and implementation together."
            },
            {
              "t": "Verify the primitive against a reference vector, but leave key reuse, randomness, protocol binding, and migration outside the review. The key lifecycle remains weak. The cipher audit leaves an assumption unresolved.",
              "v": "partial",
              "fb": "A standard primitive helps only when its mode, parameters, and key handling preserve the intended guarantee."
            },
            {
              "t": "Treat possession of ciphertext as evidence that confidentiality held, regardless of weak parameters, unsafe modes, or exposed endpoints. The cipher audit defeats that inference. Within the cipher audit, no support appears.",
              "v": "wrong",
              "fb": "Hidden design details are not a substitute for a construction that survives knowledgeable scrutiny."
            },
            {
              "t": "Renew the waiver for compatibility, rotate the same class of keys, and postpone replacement until a customer can prove exploitation. Known weakness is treated as luck. Inside the cipher audit, drama displaces testing.",
              "v": "danger",
              "fb": "Absence of a public break is weak evidence when known weaknesses and supported replacements already exist."
            }
          ]
        },
        {
          "q": "Which security conclusion is best supported?",
          "o": [
            {
              "t": "The security conclusion is that a sound mathematical primitive can be undermined by weak randomness, unsafe padding, side channels, or obsolete parameters across the available record in the case file.",
              "v": "expert",
              "fb": "Correct: cryptographic strength follows the algorithm, parameters, keys, protocol, and implementation together."
            },
            {
              "t": "A recognized cipher name provides enough assurance that operational key handling and deprecation can remain secondary concerns. The key lifecycle remains weak in the dated record in the case file.",
              "v": "partial",
              "fb": "A standard primitive helps only when its mode, parameters, and key handling preserve the intended guarantee."
            },
            {
              "t": "A secret implementation can compensate for known mathematical and protocol weaknesses if access to its source code remains restricted. The guarantee is inferred from a narrower technical result.",
              "v": "wrong",
              "fb": "Hidden design details are not a substitute for a construction that survives knowledgeable scrutiny."
            },
            {
              "t": "The loss is presumed to reflect an unprecedented genius or unstoppable computation, leaving no room for a weak construction kept in service. Inertia becomes a security argument in the case file.",
              "v": "danger",
              "fb": "Absence of a public break is weak evidence when known weaknesses and supported replacements already exist."
            }
          ]
        }
      ]
    },
    "c_rsaalg": {
      "whatHint": "Adleman's mathematics scales security with key length against faster machines. Ask whether 'unstoppable computing' simply met a cipher never upgraded to resist it.",
      "sci": "Leonard Adleman (b. 1945)",
      "topic": "The RSA algorithm",
      "lede": "Leonard Adleman turned the RSA algorithm into a construction that could be analyzed instead of merely trusted.",
      "no": 8,
      "profile": "Today’s cryptographic memorandum profiles Leonard Adleman through the RSA algorithm. Leonard Adleman supplied the key mathematical insight that completed RSA and helped show how the proposed public and private operations could work as an algorithm. Cryptography turns assumptions about keys, computation, randomness, and adversaries into concrete protections. Adleman’s work illuminates one link in that argument. The mathematics may be elegant, but deployment also depends on protocols, parameters, implementation, key custody, and a plan for retirement.\n\nThe disciplined approach is to select parameters satisfying the number-theoretic requirements, test implementation details, and separate proof assumptions from coding choices. A security review should identify the threat model, public algorithm, secret material, key lifetime, randomness source, authentication method, failure behavior, and known attacks. It should also ask whether standardized replacements exist and whether compatibility has become an excuse for keeping obsolete protection.\n\nCipher failures are frequently narrated as contests between a genius attacker and impossible mathematics. More often, an old key length, repeated nonce, unsafe mode, home-built primitive, or exposed endpoint removes the guarantee before any heroic codebreaking begins. Public scrutiny and migration schedules are therefore part of cryptographic design, not administrative details.\n\nThe governing rule is cryptographic invention requires both a hard problem and an exact construction whose edge cases do not leak the secret. Security follows the full construction and its operational assumptions, never the prestige of the word encryption. A waiver that extends an obsolete algorithm should name the exposure, compensating controls, owner, and retirement date. Key reuse converts separate messages into related evidence that an attacker may combine.",
      "frame": "Seals the key drawer. \"Before you call anyone a genius, tell me how the RSA algorithm actually breaks.\"",
      "q": [
        {
          "q": "Which cryptographic account best captures Leonard Adleman’s contribution to the RSA algorithm?",
          "o": [
            {
              "t": "Leonard Adleman supplied the key mathematical insight that completed RSA and helped show how the proposed public and private operations could work as an algorithm. The assumptions remain inspectable.",
              "v": "expert",
              "fb": "Correct: cryptographic strength follows the algorithm, parameters, keys, protocol, and implementation together."
            },
            {
              "t": "Leonard Adleman contributed to the RSA algorithm, but the account names the algorithm while leaving parameters, keys, authentication, and retirement untested. The key lifecycle remains weak.",
              "v": "partial",
              "fb": "A standard primitive helps only when its mode, parameters, and key handling preserve the intended guarantee."
            },
            {
              "t": "Leonard Adleman is portrayed as making a cipher secure through secrecy of design rather than a construction that survives informed analysis. Under the cipher audit, direct comparison fails.",
              "v": "wrong",
              "fb": "Hidden design details are not a substitute for a construction that survives knowledgeable scrutiny."
            },
            {
              "t": "Leonard Adleman is used to preserve an obsolete scheme because no attacker has publicly displayed every step of a successful compromise. Inside the cipher audit, the claim outruns checks.",
              "v": "danger",
              "fb": "Absence of a public break is weak evidence when known weaknesses and supported replacements already exist."
            }
          ]
        },
        {
          "q": "Which cryptographic review best follows the profile?",
          "o": [
            {
              "t": "For the cryptographic system, conduct this analysis: select parameters satisfying the number-theoretic requirements, test implementation details, and separate proof assumptions from coding choices in the dated record in the case file.",
              "v": "expert",
              "fb": "Correct: cryptographic strength follows the algorithm, parameters, keys, protocol, and implementation together."
            },
            {
              "t": "Verify the primitive against a reference vector, but leave key reuse, randomness, protocol binding, and migration outside the review. The key lifecycle remains weak. Protocol context is unresolved in the dated record in the case file.",
              "v": "partial",
              "fb": "A standard primitive helps only when its mode, parameters, and key handling preserve the intended guarantee."
            },
            {
              "t": "Treat possession of ciphertext as evidence that confidentiality held, regardless of weak parameters, unsafe modes, or exposed endpoints. Public analysis rejects that basis. The guarantee is inferred from a narrower technical result.",
              "v": "wrong",
              "fb": "Hidden design details are not a substitute for a construction that survives knowledgeable scrutiny."
            },
            {
              "t": "Renew the waiver for compatibility, rotate the same class of keys, and postpone replacement until a customer can prove exploitation. Within the cipher audit, assumption replaces verification across the available record in the case file.",
              "v": "danger",
              "fb": "Absence of a public break is weak evidence when known weaknesses and supported replacements already exist."
            }
          ]
        },
        {
          "q": "Which security conclusion is best supported?",
          "o": [
            {
              "t": "The security conclusion is that cryptographic invention requires both a hard problem and an exact construction whose edge cases do not leak the secret. The assumptions remain inspectable in the case file.",
              "v": "expert",
              "fb": "Correct: cryptographic strength follows the algorithm, parameters, keys, protocol, and implementation together."
            },
            {
              "t": "A recognized cipher name provides enough assurance that operational key handling and deprecation can remain secondary concerns. Across the cipher audit, comparison remains incomplete in the case file.",
              "v": "partial",
              "fb": "A standard primitive helps only when its mode, parameters, and key handling preserve the intended guarantee."
            },
            {
              "t": "A secret implementation can compensate for known mathematical and protocol weaknesses if access to its source code remains restricted. Within the cipher audit, no support appears in the case file.",
              "v": "wrong",
              "fb": "Hidden design details are not a substitute for a construction that survives knowledgeable scrutiny."
            },
            {
              "t": "The loss is presumed to reflect an unprecedented genius or unstoppable computation, leaving no room for a weak construction kept in service. Within the cipher audit, assumption replaces verification.",
              "v": "danger",
              "fb": "Absence of a public break is weak evidence when known weaknesses and supported replacements already exist."
            }
          ]
        }
      ]
    },
    "c_aes": {
      "whatHint": "Daemen's AES is public, vetted, and current — the standard a bank is advised to adopt. Ask whether that advice was taken, or the warning to migrate was shelved.",
      "sci": "Joan Daemen (b. 1965)",
      "topic": "The AES / Rijndael cipher",
      "lede": "Keys, adversaries, and public scrutiny converge in Joan Daemen’s work on the AES / Rijndael cipher.",
      "no": 9,
      "profile": "Today’s cryptographic memorandum profiles Joan Daemen through the AES / Rijndael cipher. Joan Daemen and Vincent Rijmen designed Rijndael, selected through an open international competition as the Advanced Encryption Standard. Cryptography turns assumptions about keys, computation, randomness, and adversaries into concrete protections. Daemen’s work illuminates one link in that argument. The mathematics may be elegant, but deployment also depends on protocols, parameters, implementation, key custody, and a plan for retirement.\n\nThe disciplined approach is to transform fixed-size state arrays through repeated substitution, permutation, mixing, and key addition with well-defined round keys. A security review should identify the threat model, public algorithm, secret material, key lifetime, randomness source, authentication method, failure behavior, and known attacks. It should also ask whether standardized replacements exist and whether compatibility has become an excuse for keeping obsolete protection.\n\nCipher failures are frequently narrated as contests between a genius attacker and impossible mathematics. More often, an old key length, repeated nonce, unsafe mode, home-built primitive, or exposed endpoint removes the guarantee before any heroic codebreaking begins. Public scrutiny and migration schedules are therefore part of cryptographic design, not administrative details.\n\nThe governing rule is open evaluation and generous security margins are stronger foundations than a proprietary cipher kept alive by institutional habit. Security follows the full construction and its operational assumptions, never the prestige of the word encryption. A protocol should fail closed without destroying the audit trail needed to understand the attempted misuse. A waiver that extends an obsolete algorithm should name the exposure, compensating controls, owner, and retirement date.",
      "frame": "Taps the waiver date. \"Mathematics does not renew itself. Show me what the AES / Rijndael cipher requires in service.\"",
      "q": [
        {
          "q": "Which cryptographic account best captures Joan Daemen’s contribution to the AES / Rijndael cipher?",
          "o": [
            {
              "t": "Joan Daemen and Vincent Rijmen designed Rijndael, selected through an open international competition as the Advanced Encryption Standard. The assumptions remain inspectable in the case file.",
              "v": "expert",
              "fb": "Correct: cryptographic strength follows the algorithm, parameters, keys, protocol, and implementation together."
            },
            {
              "t": "Joan Daemen contributed to the AES / Rijndael cipher, but the account names the algorithm while leaving parameters, keys, authentication, and retirement untested in the dated record in the case file.",
              "v": "partial",
              "fb": "A standard primitive helps only when its mode, parameters, and key handling preserve the intended guarantee."
            },
            {
              "t": "Joan Daemen is portrayed as making a cipher secure through secrecy of design rather than a construction that survives informed analysis. The guarantee is inferred from a narrower technical result.",
              "v": "wrong",
              "fb": "Hidden design details are not a substitute for a construction that survives knowledgeable scrutiny."
            },
            {
              "t": "Joan Daemen is used to preserve an obsolete scheme because no attacker has publicly displayed every step of a successful compromise. Known weakness is treated as luck in the case file in the case file.",
              "v": "danger",
              "fb": "Absence of a public break is weak evidence when known weaknesses and supported replacements already exist."
            }
          ]
        },
        {
          "q": "Which cryptographic review best follows the profile?",
          "o": [
            {
              "t": "For the cryptographic system, conduct this analysis: transform fixed-size state arrays through repeated substitution, permutation, mixing, and key addition with well-defined round keys. The assumptions remain inspectable.",
              "v": "expert",
              "fb": "Correct: cryptographic strength follows the algorithm, parameters, keys, protocol, and implementation together."
            },
            {
              "t": "Verify the primitive against a reference vector, but leave key reuse, randomness, protocol binding, and migration outside the review. The key lifecycle remains weak. The cipher audit leaves an assumption unresolved.",
              "v": "partial",
              "fb": "A standard primitive helps only when its mode, parameters, and key handling preserve the intended guarantee."
            },
            {
              "t": "Treat possession of ciphertext as evidence that confidentiality held, regardless of weak parameters, unsafe modes, or exposed endpoints. The cipher audit defeats that inference. Within the cipher audit, no support appears.",
              "v": "wrong",
              "fb": "Hidden design details are not a substitute for a construction that survives knowledgeable scrutiny."
            },
            {
              "t": "Renew the waiver for compatibility, rotate the same class of keys, and postpone replacement until a customer can prove exploitation. Known weakness is treated as luck. Inside the cipher audit, drama displaces testing.",
              "v": "danger",
              "fb": "Absence of a public break is weak evidence when known weaknesses and supported replacements already exist."
            }
          ]
        },
        {
          "q": "Which security conclusion is best supported?",
          "o": [
            {
              "t": "The security conclusion is that open evaluation and generous security margins are stronger foundations than a proprietary cipher kept alive by institutional habit in the dated record in the case file.",
              "v": "expert",
              "fb": "Correct: cryptographic strength follows the algorithm, parameters, keys, protocol, and implementation together."
            },
            {
              "t": "A recognized cipher name provides enough assurance that operational key handling and deprecation can remain secondary concerns. The key lifecycle remains weak in the dated record in the case file.",
              "v": "partial",
              "fb": "A standard primitive helps only when its mode, parameters, and key handling preserve the intended guarantee."
            },
            {
              "t": "A secret implementation can compensate for known mathematical and protocol weaknesses if access to its source code remains restricted. The guarantee is inferred from a narrower technical result.",
              "v": "wrong",
              "fb": "Hidden design details are not a substitute for a construction that survives knowledgeable scrutiny."
            },
            {
              "t": "The loss is presumed to reflect an unprecedented genius or unstoppable computation, leaving no room for a weak construction kept in service. Inertia becomes a security argument in the case file.",
              "v": "danger",
              "fb": "Absence of a public break is weak evidence when known weaknesses and supported replacements already exist."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "cryptographer": {
      "vault": "The Cryptographer waits at the transaction & key vault with a key ledger and a risk waiver sealed in separate envelopes. \"Flagged the aging cipher years ago; the replace-it memo was shelved. The mathematics did not age overnight; the decision not to replace it did.\"",
      "cryptolab": "The Cryptographer waits at the cryptography lab with a key ledger and a risk waiver sealed in separate envelopes. \"Flagged the aging cipher years ago; the replace-it memo was shelved. The mathematics did not age overnight; the decision not to replace it did.\"",
      "office": "The Cryptographer waits at the security architect's office with a key ledger and a risk waiver sealed in separate envelopes. \"Flagged the aging cipher years ago; the replace-it memo was shelved. The mathematics did not age overnight; the decision not to replace it did.\""
    },
    "keykeeper": {
      "vault": "The Key Custodian waits at the transaction & key vault with a key ledger and a risk waiver sealed in separate envelopes. \"Handles the keys; the same short key had been reused far past its life. The mathematics did not age overnight; the decision not to replace it did.\"",
      "cryptolab": "The Key Custodian waits at the cryptography lab with a key ledger and a risk waiver sealed in separate envelopes. \"Handles the keys; the same short key had been reused far past its life. The mathematics did not age overnight; the decision not to replace it did.\"",
      "office": "The Key Custodian waits at the security architect's office with a key ledger and a risk waiver sealed in separate envelopes. \"Handles the keys; the same short key had been reused far past its life. The mathematics did not age overnight; the decision not to replace it did.\""
    },
    "clerk": {
      "vault": "The Clerk waits at the transaction & key vault with a key ledger and a risk waiver sealed in separate envelopes. \"Keeps the audit trail — and the risk waiver that kept the old cipher running. The mathematics did not age overnight; the decision not to replace it did.\"",
      "cryptolab": "The Clerk waits at the cryptography lab with a key ledger and a risk waiver sealed in separate envelopes. \"Keeps the audit trail — and the risk waiver that kept the old cipher running. The mathematics did not age overnight; the decision not to replace it did.\"",
      "office": "The Clerk waits at the security architect's office with a key ledger and a risk waiver sealed in separate envelopes. \"Keeps the audit trail — and the risk waiver that kept the old cipher running. The mathematics did not age overnight; the decision not to replace it did.\""
    }
  },
  "story": [
    "<b>The Cipher at Meridian Bank</b> opens inside the Meridian Bank cipher inquiry, where the public explanation has hardened faster than the evidence.",
    "<b>The Cryptographer</b>, <b>The Key Custodian</b>, and <b>The Clerk</b> hold different parts of the record, and every conversation begins with one real figure whose work teaches you how to read it.",
    "The case keeps pulling investigators toward <b>A genius broke unbreakable encryption</b> or <b>Unstoppable brute-force computing — bad luck of the draw</b>. Both are plausible enough to survive a headline; neither should survive the full dossier untested.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide the <b>WHAT</b> for yourself."
  ],
  "endings": {
    "overclaimWhat": "genius",
    "dismissalWhat": "bruteforce",
    "win": {
      "expertTitle": "The Cipher Was Already Retired",
      "expert": [
        "You prove <b>A home-rolled, deprecated cipher kept in use against advice</b> by linking <b>Lena Marsh — the bank's crypto architect</b> to the decisive waiver stored in <b>The Security Architect's Office</b>. Not a genius broke unbreakable encryption. Not unstoppable brute-force computing — bad luck of the draw.",
        "The construction was home-rolled, the key was reused beyond policy, and the replacement warning was shelved. The compromise required neither impossible mathematics nor unlimited brute force; it used weaknesses the bank had formally chosen to keep."
      ],
      "soundTitle": "The Weak Construction Exposed",
      "sound": [
        "Your accusation correctly connects <b>Lena Marsh — the bank's crypto architect</b>, <b>The Security Architect's Office</b>, and <b>A home-rolled, deprecated cipher kept in use against advice</b>. The cryptographic review and key records support the result.",
        "The attacker’s full technique remains under analysis, but the bank cannot claim unforeseeability after accepting a documented weakness and declining a supported replacement."
      ],
      "namedTitle": "The Waiver Broken",
      "named": [
        "Your accusation selects <b>Lena Marsh — the bank's crypto architect</b>, <b>The Security Architect's Office</b>, and <b>A home-rolled, deprecated cipher kept in use against advice</b> in the correct combination.",
        "The explanation is brief, yet it identifies the architecture file, key lifecycle, and retirement advice needed to reconstruct the compromise."
      ]
    },
    "overclaim": {
      "title": "Genius as Institutional Cover",
      "body": [
        "You declare <b>A genius broke unbreakable encryption</b>, elevating the attacker until ordinary cryptographic weaknesses disappear beneath the legend.",
        "The claim cannot be demonstrated and makes later correction look like retreat. A specific, reviewable decision to preserve weak protection loses force inside a story about unprecedented brilliance."
      ]
    },
    "dismissal": {
      "title": "Brute Force as Bad Weather",
      "body": [
        "You accept <b>Unstoppable brute-force computing — bad luck of the draw</b>, treating computational growth as an unavoidable accident rather than a parameter the architecture was required to anticipate.",
        "That answer renews the weak system without examining its design, key reuse, or migration record. Customers remain protected by a cipher the bank already knew it should retire."
      ]
    },
    "wrongNames": {
      "title": "The Weak Cipher, Wrong Custodian",
      "body": [
        "You recognize <b>A home-rolled, deprecated cipher kept in use against advice</b>, but accuse the auditor or place the governing decision in the vault rather than the architect’s office. The waiver authority leads instead to"
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A cipher grid, key, and opened lock\"><path d=\"M48 30 L248 30 L248 110 L48 110 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M88 30 L88 110 M128 30 L128 110 M168 30 L168 110 M208 30 L208 110 M48 56 L248 56 M48 82 L248 82\" stroke=\"#e2e2d8\" stroke-width=\"1\"/><path d=\"M248 70 L350 70\" stroke=\"#326891\" stroke-width=\"2\"/><circle cx=\"398\" cy=\"70\" r=\"20\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M418 70 L468 70 L480 58 M454 70 L466 82\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.8\"/><rect x=\"520\" y=\"58\" width=\"70\" height=\"52\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2\"/><path d=\"M536 58 L536 44 Q555 22 574 44 L574 58\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2\"/></svg>"
}};
