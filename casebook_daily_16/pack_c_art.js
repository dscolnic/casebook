module.exports = { PACK: {
  "id": "c_art",
  "title": "The Halberstadt Panel",
  "discipline": "Art History & Authentication",
  "teaser": "A lost masterpiece surfaced from nowhere and sold for a fortune. A priceless discovery? An obvious daub? Or something with a hidden tell?",
  "overclaimTag": "a priceless lost masterpiece",
  "truthTag": "a forgery with a hidden tell",
  "venue": "the Halberstadt Panel inquiry",
  "agent": {
    "name": "Investigator Rhea Voss",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Commission credibility",
  "readingShort": "Connoisseurs",
  "readingLabel": "Connoisseurs & Conservators",
  "dossierName": "CONNOISSEURS & CONSERVATORS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Halberstadt Panel inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The place you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "A famous name can brighten a sale room; materials and provenance remain unimpressed by applause.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "ar_restorer",
      "items": [
        {
          "id": "ar_restorer",
          "label": "Anselm Roterman — the panel's restorer"
        },
        {
          "id": "ar_dealer",
          "label": "Emile Vasse — the gallery dealer"
        },
        {
          "id": "ar_curator",
          "label": "Dr. Halvard — the museum's connoisseur"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "ar_lab",
      "items": [
        {
          "id": "ar_gallery",
          "label": "The Auction House & Gallery"
        },
        {
          "id": "ar_provenance",
          "label": "The Provenance Archive"
        },
        {
          "id": "ar_lab",
          "label": "The Conservation Laboratory"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "ar_forgery",
      "items": [
        {
          "id": "ar_masterpiece",
          "label": "A priceless rediscovered Old Master"
        },
        {
          "id": "ar_obvious",
          "label": "An obvious, clumsy fake — beneath notice"
        },
        {
          "id": "ar_forgery",
          "label": "A forgery moved on faked provenance, betrayed by an anachronistic pigment"
        }
      ]
    }
  },
  "PLACES": {
    "ar_gallery": {
      "name": "The Auction House & Gallery",
      "xy": [
        140,
        90
      ]
    },
    "ar_provenance": {
      "name": "The Provenance Archive",
      "xy": [
        330,
        240
      ]
    },
    "ar_lab": {
      "name": "The Conservation Laboratory",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "ar_gallery",
      "ar_provenance"
    ],
    [
      "ar_provenance",
      "ar_lab"
    ]
  ],
  "CHARACTERS": {
    "ar_conservator": {
      "name": "Conservator Nel",
      "role": "Paintings conservator",
      "face": "🔬",
      "badge": "N",
      "legend": "the laboratory",
      "hint": "Takes the paint cross-sections; found a pigment that did not exist when the panel was supposedly made."
    },
    "ar_archivist": {
      "name": "Archivist Boll",
      "role": "Provenance archivist",
      "face": "🗂",
      "badge": "B",
      "legend": "the archive",
      "hint": "Traces old sale records; the panel's 'centuries-old' history dead-ends in a forged bill of sale."
    },
    "ar_framer": {
      "name": "Framer Ruys",
      "role": "Frame-maker & studio hand",
      "face": "🖼",
      "badge": "R",
      "legend": "the gallery",
      "hint": "Built frames for the restorer's studio; saw a 'new' old panel aged in the back room."
    }
  },
  "TOPICMAP": {
    "ar_gallery": {
      "ar_conservator": [
        "ar_morelli"
      ],
      "ar_archivist": [
        "ar_friedlander"
      ],
      "ar_framer": [
        "ar_bredius"
      ]
    },
    "ar_provenance": {
      "ar_conservator": [
        "ar_coremans"
      ],
      "ar_archivist": [
        "ar_zeri"
      ],
      "ar_framer": [
        "ar_gettens"
      ]
    },
    "ar_lab": {
      "ar_conservator": [
        "ar_forbes"
      ],
      "ar_archivist": [
        "ar_vandantzig"
      ],
      "ar_framer": [
        "ar_keating"
      ]
    }
  },
  "TOPICS": {
    "ar_morelli": {
      "sci": "Giovanni Morelli (1816–1891)",
      "topic": "The Morellian method: the telltale detail",
      "lede": "Giovanni Morelli brought the eye, the archive, and the laboratory together in the study of the morellian method: the telltale detail.",
      "no": 1,
      "profile": "The conservation briefing for today concerns Giovanni Morelli and the difficult craft of the morellian method: the telltale detail. Giovanni Morelli proposed attributing paintings through small, habitual details such as ears, hands, and fingernails that copyists often neglected. Paintings and drawings accumulate varnish, damage, restoration, ownership stories, and confident labels. Morelli’s career shows why authentication must move between visual judgment and the physical life of the object.\n\nThe relevant practice is compare repeated minor forms across securely attributed works instead of relying only on dramatic poses or general mood. Brushwork and recurring forms matter, but so do support, ground, pigment, binder, craquelure, alteration, and documentary history. Each observation has a date range and a degree of certainty; an attribution is strongest when several independent features point toward the same workshop and period.\n\nThe market rewards a single famous name, whereas conservation science often produces a more complicated answer. A panel can be old but repainted, a drawing can be skillful but misattributed, and a convincing provenance can rest on a modern document. Technical evidence does not replace connoisseurship; it disciplines what the eye proposes.\n\nThe sound principle is unconscious habits can be diagnostic, but they must be checked against materials, provenance, and workshop practice. An artwork earns its identity through converging evidence, not through the confidence of its label. Good documentation also lets a later specialist revisit an attribution after methods improve. Uncertainty belongs in the catalogue when the object itself does not justify a final name. Good documentation also lets a later specialist revisit an attribution after methods improve.",
      "frame": "Angles a lamp across the surface. \"The sale label is loud; the object is quieter. Read the morellian method: the telltale detail correctly before you see the sample report.\"",
      "q": [
        {
          "q": "Which attribution statement most faithfully reflects Giovanni Morelli’s approach to the morellian method: the telltale detail?",
          "o": [
            {
              "t": "Giovanni Morelli made the morellian method: the telltale detail rest on visual comparison, object history, and technical examination. The object can still answer back.",
              "v": "expert",
              "fb": "Correct: attribution is strongest when visual comparison and object-based evidence converge."
            },
            {
              "t": "Giovanni Morelli treated the morellian method: the telltale detail as an exercise in beauty while leaving material inconsistencies unresolved. The issue remains open.",
              "v": "partial",
              "fb": "Aesthetic response is valuable, but it cannot date pigment or establish authorship by itself."
            },
            {
              "t": "Giovanni Morelli let an impressive provenance settle the morellian method: the telltale detail without authenticating the supporting documents. The record disagrees.",
              "v": "wrong",
              "fb": "Provenance documents require authentication just as paintings do."
            },
            {
              "t": "Giovanni Morelli used the market excitement around the morellian method: the telltale detail as independent confirmation of authorship. The claim comes first.",
              "v": "danger",
              "fb": "Price records demand; they do not identify the hand or date of manufacture."
            }
          ]
        },
        {
          "q": "Which conservation-lab choice best applies the method in the profile?",
          "o": [
            {
              "t": "Apply the stated attribution method, inspect the physical object, and compare secure reference works. Others can retrace it.",
              "v": "expert",
              "fb": "Yes: a technical observation becomes useful through historical comparison with reliable reference material."
            },
            {
              "t": "Judge the composition from photographs, but postpone examination of support, pigments, and restoration. The issue remains open.",
              "v": "partial",
              "fb": "Treatment should not be used to manufacture stylistic consistency for an attribution."
            },
            {
              "t": "Accept the dealer's chronology first, then avoid tests that could complicate the proposed attribution. The evidence points elsewhere.",
              "v": "wrong",
              "fb": "Commercial inconvenience is not a scientific reason to avoid appropriate examination."
            },
            {
              "t": "Announce the rediscovery immediately, and treat later material contradictions as minor conservation issues. Checking comes later.",
              "v": "danger",
              "fb": "Photographs cannot reveal every layer, binder, support, or microscopic particle."
            }
          ]
        },
        {
          "q": "What is the most defensible lesson of the morellian method: the telltale detail?",
          "o": [
            {
              "t": "Authorship should follow converging stylistic, material, and documentary evidence from the object. It remains checkable.",
              "v": "expert",
              "fb": "Exactly: authentication is a converging argument, not a single certificate."
            },
            {
              "t": "The trained eye should decide first, with technical analysis used mainly to illustrate that judgment. The issue remains open.",
              "v": "partial",
              "fb": "Connoisseurship proposes and compares; it should not dictate what every later test must show."
            },
            {
              "t": "A complete ownership story should eliminate the need to test pigments or workshop habits. The evidence points elsewhere.",
              "v": "wrong",
              "fb": "Even a long ownership story can be mistaken, incomplete, or deliberately constructed."
            },
            {
              "t": "The panel would be either a priceless masterpiece or a worthless fake with no mixed history. Excitement replaces examination.",
              "v": "danger",
              "fb": "Objects may be altered, partly authentic, misattributed, or historically important without fitting either extreme."
            }
          ]
        }
      ]
    },
    "ar_friedlander": {
      "sci": "Max J. Friedländer (1867–1958)",
      "topic": "The trained connoisseur's eye",
      "lede": "Max J. Friedländer approached the trained connoisseur’s eye as an attribution problem written in paint, paper, and provenance.",
      "no": 2,
      "profile": "The conservation briefing for today concerns Max J. Friedländer and the difficult craft of the trained connoisseur’s eye. Max J. Friedländer catalogued Early Netherlandish painting and described connoisseurship as trained recognition grounded in long visual experience. Paintings and drawings accumulate varnish, damage, restoration, ownership stories, and confident labels. Friedländer’s career shows why authentication must move between visual judgment and the physical life of the object.\n\nThe relevant practice is move between first impressions and detailed comparison while remaining alert to workshop variation and later alteration. Brushwork and recurring forms matter, but so do support, ground, pigment, binder, craquelure, alteration, and documentary history. Each observation has a date range and a degree of certainty; an attribution is strongest when several independent features point toward the same workshop and period.\n\nThe market rewards a single famous name, whereas conservation science often produces a more complicated answer. A panel can be old but repainted, a drawing can be skillful but misattributed, and a convincing provenance can rest on a modern document. Technical evidence does not replace connoisseurship; it disciplines what the eye proposes.\n\nThe sound principle is the practiced eye is useful when its judgment can be articulated and tested rather than merely asserted. An artwork earns its identity through converging evidence, not through the confidence of its label. Good documentation also lets a later specialist revisit an attribution after methods improve. Uncertainty belongs in the catalogue when the object itself does not justify a final name. Good documentation also lets a later specialist revisit an attribution after methods improve.",
      "frame": "Sets down a loupe beside the file. \"Style proposes a name. Materials may refuse it. Start with the trained connoisseur’s eye.\"",
      "q": [
        {
          "q": "Which attribution statement most faithfully reflects Max J. Friedländer’s approach to the trained connoisseur’s eye?",
          "o": [
            {
              "t": "Max J. Friedländer made the trained connoisseur’s eye rest on visual comparison, object history, and technical examination. The object can still answer back.",
              "v": "expert",
              "fb": "Correct: attribution is strongest when visual comparison and object-based evidence converge."
            },
            {
              "t": "Max J. Friedländer treated the trained connoisseur’s eye as an exercise in beauty while leaving material inconsistencies unresolved. The issue remains open.",
              "v": "partial",
              "fb": "Aesthetic response is valuable, but it cannot date pigment or establish authorship by itself."
            },
            {
              "t": "Max J. Friedländer let an impressive provenance settle the trained connoisseur’s eye without authenticating the supporting documents. The record disagrees.",
              "v": "wrong",
              "fb": "Provenance documents require authentication just as paintings do."
            },
            {
              "t": "Max J. Friedländer used the market excitement around the trained connoisseur’s eye as independent confirmation of authorship. The claim comes first.",
              "v": "danger",
              "fb": "Price records demand; they do not identify the hand or date of manufacture."
            }
          ]
        },
        {
          "q": "Which conservation-lab choice best applies the method in the profile?",
          "o": [
            {
              "t": "Apply the stated attribution method, inspect the physical object, and compare secure reference works. Others can retrace it.",
              "v": "expert",
              "fb": "Yes: a technical observation becomes useful through historical comparison with reliable reference material."
            },
            {
              "t": "Judge the composition from photographs, but postpone examination of support, pigments, and restoration. The issue remains open.",
              "v": "partial",
              "fb": "Treatment should not be used to manufacture stylistic consistency for an attribution."
            },
            {
              "t": "Accept the dealer's chronology first, then avoid tests that could complicate the proposed attribution. The evidence points elsewhere.",
              "v": "wrong",
              "fb": "Commercial inconvenience is not a scientific reason to avoid appropriate examination."
            },
            {
              "t": "Announce the rediscovery immediately, and treat later material contradictions as minor conservation issues. Checking comes later.",
              "v": "danger",
              "fb": "Photographs cannot reveal every layer, binder, support, or microscopic particle."
            }
          ]
        },
        {
          "q": "What is the most defensible lesson of the trained connoisseur’s eye?",
          "o": [
            {
              "t": "Authorship should follow converging stylistic, material, and documentary evidence from the object. It remains checkable.",
              "v": "expert",
              "fb": "Exactly: authentication is a converging argument, not a single certificate."
            },
            {
              "t": "The trained eye should decide first, with technical analysis used mainly to illustrate that judgment. The issue remains open.",
              "v": "partial",
              "fb": "Connoisseurship proposes and compares; it should not dictate what every later test must show."
            },
            {
              "t": "A complete ownership story should eliminate the need to test pigments or workshop habits. The evidence points elsewhere.",
              "v": "wrong",
              "fb": "Even a long ownership story can be mistaken, incomplete, or deliberately constructed."
            },
            {
              "t": "The panel would be either a priceless masterpiece or a worthless fake with no mixed history. Excitement replaces examination.",
              "v": "danger",
              "fb": "Objects may be altered, partly authentic, misattributed, or historically important without fitting either extreme."
            }
          ]
        }
      ]
    },
    "ar_bredius": {
      "sci": "Abraham Bredius (1855–1946)",
      "topic": "The Vermeer authority who was deceived",
      "lede": "A famous signature cannot silence the object in Abraham Bredius's account of the vermeer authority who was deceived.",
      "no": 3,
      "profile": "The conservation briefing for today concerns Abraham Bredius and the difficult craft of the vermeer authority who was deceived. Abraham Bredius, a leading Vermeer scholar, accepted Han van Meegeren's Supper at Emmaus as a major rediscovery. Paintings and drawings accumulate varnish, damage, restoration, ownership stories, and confident labels. Bredius’s career shows why authentication must move between visual judgment and the physical life of the object.\n\nThe relevant practice is test an attribution against the artist's known technique, materials, chronology, and provenance even when the style seems persuasive. Brushwork and recurring forms matter, but so do support, ground, pigment, binder, craquelure, alteration, and documentary history. Each observation has a date range and a degree of certainty; an attribution is strongest when several independent features point toward the same workshop and period.\n\nThe market rewards a single famous name, whereas conservation science often produces a more complicated answer. A panel can be old but repainted, a drawing can be skillful but misattributed, and a convincing provenance can rest on a modern document. Technical evidence does not replace connoisseurship; it disciplines what the eye proposes.\n\nThe sound principle is expert expectation can become a weakness when a forgery supplies exactly the missing masterpiece an authority hopes to find. An artwork earns its identity through converging evidence, not through the confidence of its label. Good documentation also lets a later specialist revisit an attribution after methods improve. Uncertainty belongs in the catalogue when the object itself does not justify a final name. Good documentation also lets a later specialist revisit an attribution after methods improve.",
      "frame": "Closes the ultraviolet hood. \"At The Auction House & Gallery, confidence leaves residues. Tell me how the vermeer authority who was deceived separates an attribution from a wish.\"",
      "q": [
        {
          "q": "Which attribution statement most faithfully reflects Abraham Bredius’s approach to the vermeer authority who was deceived?",
          "o": [
            {
              "t": "Abraham Bredius made the vermeer authority who was deceived rest on visual comparison, object history, and technical examination. The object can still answer back.",
              "v": "expert",
              "fb": "Correct: attribution is strongest when visual comparison and object-based evidence converge."
            },
            {
              "t": "Abraham Bredius treated the vermeer authority who was deceived as an exercise in beauty while leaving material inconsistencies unresolved. The issue remains open.",
              "v": "partial",
              "fb": "Aesthetic response is valuable, but it cannot date pigment or establish authorship by itself."
            },
            {
              "t": "Abraham Bredius let an impressive provenance settle the vermeer authority who was deceived without authenticating the supporting documents. The record disagrees.",
              "v": "wrong",
              "fb": "Provenance documents require authentication just as paintings do."
            },
            {
              "t": "Abraham Bredius used the market excitement around the vermeer authority who was deceived as independent confirmation of authorship. The claim comes first.",
              "v": "danger",
              "fb": "Price records demand; they do not identify the hand or date of manufacture."
            }
          ]
        },
        {
          "q": "Which conservation-lab choice best applies the method in the profile?",
          "o": [
            {
              "t": "Apply the stated attribution method, inspect the physical object, and compare secure reference works. Others can retrace it.",
              "v": "expert",
              "fb": "Yes: a technical observation becomes useful through historical comparison with reliable reference material."
            },
            {
              "t": "Judge the composition from photographs, but postpone examination of support, pigments, and restoration. The issue remains open.",
              "v": "partial",
              "fb": "Treatment should not be used to manufacture stylistic consistency for an attribution."
            },
            {
              "t": "Accept the dealer's chronology first, then avoid tests that could complicate the proposed attribution. The evidence points elsewhere.",
              "v": "wrong",
              "fb": "Commercial inconvenience is not a scientific reason to avoid appropriate examination."
            },
            {
              "t": "Announce the rediscovery immediately, and treat later material contradictions as minor conservation issues. Checking comes later.",
              "v": "danger",
              "fb": "Photographs cannot reveal every layer, binder, support, or microscopic particle."
            }
          ]
        },
        {
          "q": "What is the most defensible lesson of the vermeer authority who was deceived?",
          "o": [
            {
              "t": "Authorship should follow converging stylistic, material, and documentary evidence from the object. It remains checkable.",
              "v": "expert",
              "fb": "Exactly: authentication is a converging argument, not a single certificate."
            },
            {
              "t": "The trained eye should decide first, with technical analysis used mainly to illustrate that judgment. The issue remains open.",
              "v": "partial",
              "fb": "Connoisseurship proposes and compares; it should not dictate what every later test must show."
            },
            {
              "t": "A complete ownership story should eliminate the need to test pigments or workshop habits. The evidence points elsewhere.",
              "v": "wrong",
              "fb": "Even a long ownership story can be mistaken, incomplete, or deliberately constructed."
            },
            {
              "t": "The panel would be either a priceless masterpiece or a worthless fake with no mixed history. Excitement replaces examination.",
              "v": "danger",
              "fb": "Objects may be altered, partly authentic, misattributed, or historically important without fitting either extreme."
            }
          ]
        }
      ]
    },
    "ar_coremans": {
      "sci": "Paul Coremans (1908–1965)",
      "topic": "The laboratory that unmasked the forgery",
      "lede": "Paul Coremans brought the eye, the archive, and the laboratory together in the study of the laboratory that unmasked the forgery.",
      "no": 4,
      "profile": "The conservation briefing for today concerns Paul Coremans and the difficult craft of the laboratory that unmasked the forgery. Paul Coremans led the Belgian laboratory investigation that tested the alleged Vermeers and helped demonstrate that Van Meegeren had painted them. Paintings and drawings accumulate varnish, damage, restoration, ownership stories, and confident labels. Coremans’s career shows why authentication must move between visual judgment and the physical life of the object.\n\nThe relevant practice is coordinate chemical analysis, microscopy, aging experiments, documentary evidence, and controlled comparison with authentic works. Brushwork and recurring forms matter, but so do support, ground, pigment, binder, craquelure, alteration, and documentary history. Each observation has a date range and a degree of certainty; an attribution is strongest when several independent features point toward the same workshop and period.\n\nThe market rewards a single famous name, whereas conservation science often produces a more complicated answer. A panel can be old but repainted, a drawing can be skillful but misattributed, and a convincing provenance can rest on a modern document. Technical evidence does not replace connoisseurship; it disciplines what the eye proposes.\n\nThe sound principle is authentication is strongest when laboratory findings and historical records independently point to the same conclusion. An artwork earns its identity through converging evidence, not through the confidence of its label. Good documentation also lets a later specialist revisit an attribution after methods improve. Uncertainty belongs in the catalogue when the object itself does not justify a final name. Good documentation also lets a later specialist revisit an attribution after methods improve.",
      "frame": "Angles a lamp across the surface. \"The sale label is loud; the object is quieter. Read the laboratory that unmasked the forgery correctly before you see the sample report.\"",
      "q": [
        {
          "q": "Which attribution statement most faithfully reflects Paul Coremans’s approach to the laboratory that unmasked the forgery?",
          "o": [
            {
              "t": "Paul Coremans made the laboratory that unmasked the forgery rest on visual comparison, object history, and technical examination. The object can still answer back.",
              "v": "expert",
              "fb": "Correct: attribution is strongest when visual comparison and object-based evidence converge."
            },
            {
              "t": "Paul Coremans treated the laboratory that unmasked the forgery as an exercise in beauty while leaving material inconsistencies unresolved. The issue remains open.",
              "v": "partial",
              "fb": "Aesthetic response is valuable, but it cannot date pigment or establish authorship by itself."
            },
            {
              "t": "Paul Coremans let an impressive provenance settle the laboratory that unmasked the forgery without authenticating the supporting documents. The record disagrees.",
              "v": "wrong",
              "fb": "Provenance documents require authentication just as paintings do."
            },
            {
              "t": "Paul Coremans used the market excitement around the laboratory that unmasked the forgery as independent confirmation of authorship. The claim comes first.",
              "v": "danger",
              "fb": "Price records demand; they do not identify the hand or date of manufacture."
            }
          ]
        },
        {
          "q": "Which conservation-lab choice best applies the method in the profile?",
          "o": [
            {
              "t": "Apply the stated attribution method, inspect the physical object, and compare secure reference works. Others can retrace it.",
              "v": "expert",
              "fb": "Yes: a technical observation becomes useful through historical comparison with reliable reference material."
            },
            {
              "t": "Judge the composition from photographs, but postpone examination of support, pigments, and restoration. The issue remains open.",
              "v": "partial",
              "fb": "Treatment should not be used to manufacture stylistic consistency for an attribution."
            },
            {
              "t": "Accept the dealer's chronology first, then avoid tests that could complicate the proposed attribution. The evidence points elsewhere.",
              "v": "wrong",
              "fb": "Commercial inconvenience is not a scientific reason to avoid appropriate examination."
            },
            {
              "t": "Announce the rediscovery immediately, and treat later material contradictions as minor conservation issues. Checking comes later.",
              "v": "danger",
              "fb": "Photographs cannot reveal every layer, binder, support, or microscopic particle."
            }
          ]
        },
        {
          "q": "What is the most defensible lesson of the laboratory that unmasked the forgery?",
          "o": [
            {
              "t": "Authorship should follow converging stylistic, material, and documentary evidence from the object. It remains checkable.",
              "v": "expert",
              "fb": "Exactly: authentication is a converging argument, not a single certificate."
            },
            {
              "t": "The trained eye should decide first, with technical analysis used mainly to illustrate that judgment. The issue remains open.",
              "v": "partial",
              "fb": "Connoisseurship proposes and compares; it should not dictate what every later test must show."
            },
            {
              "t": "A complete ownership story should eliminate the need to test pigments or workshop habits. The evidence points elsewhere.",
              "v": "wrong",
              "fb": "Even a long ownership story can be mistaken, incomplete, or deliberately constructed."
            },
            {
              "t": "The panel would be either a priceless masterpiece or a worthless fake with no mixed history. Excitement replaces examination.",
              "v": "danger",
              "fb": "Objects may be altered, partly authentic, misattributed, or historically important without fitting either extreme."
            }
          ]
        }
      ]
    },
    "ar_zeri": {
      "sci": "Federico Zeri (1921–1998)",
      "topic": "The connoisseur & the fake",
      "lede": "Federico Zeri approached the connoisseur and the fake as an attribution problem written in paint, paper, and provenance.",
      "no": 5,
      "profile": "The conservation briefing for today concerns Federico Zeri and the difficult craft of the connoisseur and the fake. Federico Zeri used close visual analysis and archival knowledge to identify artists, workshops, later alterations, and doubtful attributions. Paintings and drawings accumulate varnish, damage, restoration, ownership stories, and confident labels. Zeri’s career shows why authentication must move between visual judgment and the physical life of the object.\n\nThe relevant practice is read surface, composition, workshop habits, condition, and documentary history as parts of one attribution problem. Brushwork and recurring forms matter, but so do support, ground, pigment, binder, craquelure, alteration, and documentary history. Each observation has a date range and a degree of certainty; an attribution is strongest when several independent features point toward the same workshop and period.\n\nThe market rewards a single famous name, whereas conservation science often produces a more complicated answer. A panel can be old but repainted, a drawing can be skillful but misattributed, and a convincing provenance can rest on a modern document. Technical evidence does not replace connoisseurship; it disciplines what the eye proposes.\n\nThe sound principle is a sharp eye gains force from a broad comparative archive and a willingness to say that a label is uncertain. An artwork earns its identity through converging evidence, not through the confidence of its label. Good documentation also lets a later specialist revisit an attribution after methods improve. Uncertainty belongs in the catalogue when the object itself does not justify a final name. Good documentation also lets a later specialist revisit an attribution after methods improve.",
      "frame": "Sets down a loupe beside the file. \"Style proposes a name. Materials may refuse it. Start with the connoisseur and the fake.\"",
      "q": [
        {
          "q": "Which attribution statement most faithfully reflects Federico Zeri’s approach to the connoisseur and the fake?",
          "o": [
            {
              "t": "Federico Zeri made the connoisseur and the fake rest on visual comparison, object history, and technical examination. The object can still answer back.",
              "v": "expert",
              "fb": "Correct: attribution is strongest when visual comparison and object-based evidence converge."
            },
            {
              "t": "Federico Zeri treated the connoisseur and the fake as an exercise in beauty while leaving material inconsistencies unresolved. The issue remains open.",
              "v": "partial",
              "fb": "Aesthetic response is valuable, but it cannot date pigment or establish authorship by itself."
            },
            {
              "t": "Federico Zeri let an impressive provenance settle the connoisseur and the fake without authenticating the supporting documents. The record disagrees.",
              "v": "wrong",
              "fb": "Provenance documents require authentication just as paintings do."
            },
            {
              "t": "Federico Zeri used the market excitement around the connoisseur and the fake as independent confirmation of authorship. The claim comes first.",
              "v": "danger",
              "fb": "Price records demand; they do not identify the hand or date of manufacture."
            }
          ]
        },
        {
          "q": "Which conservation-lab choice best applies the method in the profile?",
          "o": [
            {
              "t": "Apply the stated attribution method, inspect the physical object, and compare secure reference works. Others can retrace it.",
              "v": "expert",
              "fb": "Yes: a technical observation becomes useful through historical comparison with reliable reference material."
            },
            {
              "t": "Judge the composition from photographs, but postpone examination of support, pigments, and restoration. The issue remains open.",
              "v": "partial",
              "fb": "Treatment should not be used to manufacture stylistic consistency for an attribution."
            },
            {
              "t": "Accept the dealer's chronology first, then avoid tests that could complicate the proposed attribution. The evidence points elsewhere.",
              "v": "wrong",
              "fb": "Commercial inconvenience is not a scientific reason to avoid appropriate examination."
            },
            {
              "t": "Announce the rediscovery immediately, and treat later material contradictions as minor conservation issues. Checking comes later.",
              "v": "danger",
              "fb": "Photographs cannot reveal every layer, binder, support, or microscopic particle."
            }
          ]
        },
        {
          "q": "What is the most defensible lesson of the connoisseur and the fake?",
          "o": [
            {
              "t": "Authorship should follow converging stylistic, material, and documentary evidence from the object. It remains checkable.",
              "v": "expert",
              "fb": "Exactly: authentication is a converging argument, not a single certificate."
            },
            {
              "t": "The trained eye should decide first, with technical analysis used mainly to illustrate that judgment. The issue remains open.",
              "v": "partial",
              "fb": "Connoisseurship proposes and compares; it should not dictate what every later test must show."
            },
            {
              "t": "A complete ownership story should eliminate the need to test pigments or workshop habits. The evidence points elsewhere.",
              "v": "wrong",
              "fb": "Even a long ownership story can be mistaken, incomplete, or deliberately constructed."
            },
            {
              "t": "The panel would be either a priceless masterpiece or a worthless fake with no mixed history. Excitement replaces examination.",
              "v": "danger",
              "fb": "Objects may be altered, partly authentic, misattributed, or historically important without fitting either extreme."
            }
          ]
        }
      ]
    },
    "ar_gettens": {
      "sci": "Rutherford J. Gettens (1900–1974)",
      "topic": "The technical analysis of pigments",
      "lede": "A famous signature cannot silence the object in Rutherford J. Gettens's account of the technical analysis of pigments.",
      "no": 6,
      "profile": "The conservation briefing for today concerns Rutherford J. Gettens and the difficult craft of the technical analysis of pigments. Rutherford J. Gettens helped establish technical studies of artists' materials and co-authored reference work on pigments used in paintings. Paintings and drawings accumulate varnish, damage, restoration, ownership stories, and confident labels. Gettens’s career shows why authentication must move between visual judgment and the physical life of the object.\n\nThe relevant practice is identify pigments through microscopy and chemistry while relating the result to historical manufacture and artistic practice. Brushwork and recurring forms matter, but so do support, ground, pigment, binder, craquelure, alteration, and documentary history. Each observation has a date range and a degree of certainty; an attribution is strongest when several independent features point toward the same workshop and period.\n\nThe market rewards a single famous name, whereas conservation science often produces a more complicated answer. A panel can be old but repainted, a drawing can be skillful but misattributed, and a convincing provenance can rest on a modern document. Technical evidence does not replace connoisseurship; it disciplines what the eye proposes.\n\nThe sound principle is material identification becomes historical evidence only when the pigment's date, use, and alteration are understood. An artwork earns its identity through converging evidence, not through the confidence of its label. Good documentation also lets a later specialist revisit an attribution after methods improve. Uncertainty belongs in the catalogue when the object itself does not justify a final name. Good documentation also lets a later specialist revisit an attribution after methods improve.",
      "frame": "Closes the ultraviolet hood. \"At The Provenance Archive, confidence leaves residues. Tell me how the technical analysis of pigments separates an attribution from a wish.\"",
      "q": [
        {
          "q": "Which attribution statement most faithfully reflects Rutherford J. Gettens’s approach to the technical analysis of pigments?",
          "o": [
            {
              "t": "Rutherford J. Gettens made the technical analysis of pigments rest on visual comparison, object history, and technical examination. The object can still answer back.",
              "v": "expert",
              "fb": "Correct: attribution is strongest when visual comparison and object-based evidence converge."
            },
            {
              "t": "Rutherford J. Gettens treated the technical analysis of pigments as an exercise in beauty while leaving material inconsistencies unresolved. The issue remains open.",
              "v": "partial",
              "fb": "Aesthetic response is valuable, but it cannot date pigment or establish authorship by itself."
            },
            {
              "t": "Rutherford J. Gettens let an impressive provenance settle the technical analysis of pigments without authenticating the supporting documents. The record disagrees.",
              "v": "wrong",
              "fb": "Provenance documents require authentication just as paintings do."
            },
            {
              "t": "Rutherford J. Gettens used the market excitement around the technical analysis of pigments as independent confirmation of authorship. The claim comes first.",
              "v": "danger",
              "fb": "Price records demand; they do not identify the hand or date of manufacture."
            }
          ]
        },
        {
          "q": "Which conservation-lab choice best applies the method in the profile?",
          "o": [
            {
              "t": "Apply the stated attribution method, inspect the physical object, and compare secure reference works. Others can retrace it.",
              "v": "expert",
              "fb": "Yes: a technical observation becomes useful through historical comparison with reliable reference material."
            },
            {
              "t": "Judge the composition from photographs, but postpone examination of support, pigments, and restoration. The issue remains open.",
              "v": "partial",
              "fb": "Treatment should not be used to manufacture stylistic consistency for an attribution."
            },
            {
              "t": "Accept the dealer's chronology first, then avoid tests that could complicate the proposed attribution. The evidence points elsewhere.",
              "v": "wrong",
              "fb": "Commercial inconvenience is not a scientific reason to avoid appropriate examination."
            },
            {
              "t": "Announce the rediscovery immediately, and treat later material contradictions as minor conservation issues. Checking comes later.",
              "v": "danger",
              "fb": "Photographs cannot reveal every layer, binder, support, or microscopic particle."
            }
          ]
        },
        {
          "q": "What is the most defensible lesson of the technical analysis of pigments?",
          "o": [
            {
              "t": "Authorship should follow converging stylistic, material, and documentary evidence from the object. It remains checkable.",
              "v": "expert",
              "fb": "Exactly: authentication is a converging argument, not a single certificate."
            },
            {
              "t": "The trained eye should decide first, with technical analysis used mainly to illustrate that judgment. The issue remains open.",
              "v": "partial",
              "fb": "Connoisseurship proposes and compares; it should not dictate what every later test must show."
            },
            {
              "t": "A complete ownership story should eliminate the need to test pigments or workshop habits. The evidence points elsewhere.",
              "v": "wrong",
              "fb": "Even a long ownership story can be mistaken, incomplete, or deliberately constructed."
            },
            {
              "t": "The panel would be either a priceless masterpiece or a worthless fake with no mixed history. Excitement replaces examination.",
              "v": "danger",
              "fb": "Objects may be altered, partly authentic, misattributed, or historically important without fitting either extreme."
            }
          ]
        }
      ]
    },
    "ar_forbes": {
      "sci": "Edward W. Forbes (1873–1969)",
      "topic": "The pigment archive & conservation",
      "lede": "Edward W. Forbes brought the eye, the archive, and the laboratory together in the study of the pigment archive and conservation.",
      "no": 7,
      "profile": "The conservation briefing for today concerns Edward W. Forbes and the difficult craft of the pigment archive and conservation. Edward W. Forbes built Harvard's pioneering conservation program and assembled the Forbes Pigment Collection as a reference for technical study. Paintings and drawings accumulate varnish, damage, restoration, ownership stories, and confident labels. Forbes’s career shows why authentication must move between visual judgment and the physical life of the object.\n\nThe relevant practice is compare unknown paint samples with historically documented pigments and preserve reference standards for future analysis. Brushwork and recurring forms matter, but so do support, ground, pigment, binder, craquelure, alteration, and documentary history. Each observation has a date range and a degree of certainty; an attribution is strongest when several independent features point toward the same workshop and period.\n\nThe market rewards a single famous name, whereas conservation science often produces a more complicated answer. A panel can be old but repainted, a drawing can be skillful but misattributed, and a convincing provenance can rest on a modern document. Technical evidence does not replace connoisseurship; it disciplines what the eye proposes.\n\nThe sound principle is a shared material archive turns isolated laboratory observations into reproducible historical comparisons. An artwork earns its identity through converging evidence, not through the confidence of its label. Good documentation also lets a later specialist revisit an attribution after methods improve. Uncertainty belongs in the catalogue when the object itself does not justify a final name. Good documentation also lets a later specialist revisit an attribution after methods improve.",
      "frame": "Angles a lamp across the surface. \"The sale label is loud; the object is quieter. Read the pigment archive and conservation correctly before you see the sample report.\"",
      "q": [
        {
          "q": "Which attribution statement most faithfully reflects Edward W. Forbes’s approach to the pigment archive and conservation?",
          "o": [
            {
              "t": "Edward W. Forbes made the pigment archive and conservation rest on visual comparison, object history, and technical examination. The object can still answer back.",
              "v": "expert",
              "fb": "Correct: attribution is strongest when visual comparison and object-based evidence converge."
            },
            {
              "t": "Edward W. Forbes treated the pigment archive and conservation as an exercise in beauty while leaving material inconsistencies unresolved. The issue remains open.",
              "v": "partial",
              "fb": "Aesthetic response is valuable, but it cannot date pigment or establish authorship by itself."
            },
            {
              "t": "Edward W. Forbes let an impressive provenance settle the pigment archive and conservation without authenticating the supporting documents. The record disagrees.",
              "v": "wrong",
              "fb": "Provenance documents require authentication just as paintings do."
            },
            {
              "t": "Edward W. Forbes used the market excitement around the pigment archive and conservation as independent confirmation of authorship. The claim comes first.",
              "v": "danger",
              "fb": "Price records demand; they do not identify the hand or date of manufacture."
            }
          ]
        },
        {
          "q": "Which conservation-lab choice best applies the method in the profile?",
          "o": [
            {
              "t": "Apply the stated attribution method, inspect the physical object, and compare secure reference works. Others can retrace it.",
              "v": "expert",
              "fb": "Yes: a technical observation becomes useful through historical comparison with reliable reference material."
            },
            {
              "t": "Judge the composition from photographs, but postpone examination of support, pigments, and restoration. The issue remains open.",
              "v": "partial",
              "fb": "Treatment should not be used to manufacture stylistic consistency for an attribution."
            },
            {
              "t": "Accept the dealer's chronology first, then avoid tests that could complicate the proposed attribution. The evidence points elsewhere.",
              "v": "wrong",
              "fb": "Commercial inconvenience is not a scientific reason to avoid appropriate examination."
            },
            {
              "t": "Announce the rediscovery immediately, and treat later material contradictions as minor conservation issues. Checking comes later.",
              "v": "danger",
              "fb": "Photographs cannot reveal every layer, binder, support, or microscopic particle."
            }
          ]
        },
        {
          "q": "What is the most defensible lesson of the pigment archive and conservation?",
          "o": [
            {
              "t": "Authorship should follow converging stylistic, material, and documentary evidence from the object. It remains checkable.",
              "v": "expert",
              "fb": "Exactly: authentication is a converging argument, not a single certificate."
            },
            {
              "t": "The trained eye should decide first, with technical analysis used mainly to illustrate that judgment. The issue remains open.",
              "v": "partial",
              "fb": "Connoisseurship proposes and compares; it should not dictate what every later test must show."
            },
            {
              "t": "A complete ownership story should eliminate the need to test pigments or workshop habits. The evidence points elsewhere.",
              "v": "wrong",
              "fb": "Even a long ownership story can be mistaken, incomplete, or deliberately constructed."
            },
            {
              "t": "The panel would be either a priceless masterpiece or a worthless fake with no mixed history. Excitement replaces examination.",
              "v": "danger",
              "fb": "Objects may be altered, partly authentic, misattributed, or historically important without fitting either extreme."
            }
          ]
        }
      ]
    },
    "ar_vandantzig": {
      "sci": "Maurits M. van Dantzig (1903–1960)",
      "topic": "'Pictology': the science of authenticity",
      "lede": "Maurits M. van Dantzig approached ’pictology’: the science of authenticity as an attribution problem written in paint, paper, and provenance.",
      "no": 8,
      "profile": "The conservation briefing for today concerns Maurits M. van Dantzig and the difficult craft of ’pictology’: the science of authenticity. Maurits van Dantzig promoted 'pictology,' an effort to make authenticity judgments more systematic through structured visual and technical indicators. Paintings and drawings accumulate varnish, damage, restoration, ownership stories, and confident labels. Dantzig’s career shows why authentication must move between visual judgment and the physical life of the object.\n\nThe relevant practice is state diagnostic features explicitly, score competing signs cautiously, and distinguish observation from attribution. Brushwork and recurring forms matter, but so do support, ground, pigment, binder, craquelure, alteration, and documentary history. Each observation has a date range and a degree of certainty; an attribution is strongest when several independent features point toward the same workshop and period.\n\nThe market rewards a single famous name, whereas conservation science often produces a more complicated answer. A panel can be old but repainted, a drawing can be skillful but misattributed, and a convincing provenance can rest on a modern document. Technical evidence does not replace connoisseurship; it disciplines what the eye proposes.\n\nThe sound principle is formal systems can discipline perception, but their categories must not create certainty beyond the evidence. An artwork earns its identity through converging evidence, not through the confidence of its label. Good documentation also lets a later specialist revisit an attribution after methods improve. Uncertainty belongs in the catalogue when the object itself does not justify a final name. Good documentation also lets a later specialist revisit an attribution after methods improve.",
      "frame": "Sets down a loupe beside the file. \"Style proposes a name. Materials may refuse it. Start with ’pictology’: the science of authenticity.\"",
      "q": [
        {
          "q": "Which attribution statement most faithfully reflects Maurits M. van Dantzig’s approach to ’pictology’: the science of authenticity?",
          "o": [
            {
              "t": "Maurits M. van Dantzig made ’pictology’: the science of authenticity rest on visual comparison, object history, and technical examination. The object can still answer back.",
              "v": "expert",
              "fb": "Correct: attribution is strongest when visual comparison and object-based evidence converge."
            },
            {
              "t": "Maurits M. van Dantzig treated ’pictology’: the science of authenticity as an exercise in beauty while leaving material inconsistencies unresolved. The issue remains open.",
              "v": "partial",
              "fb": "Aesthetic response is valuable, but it cannot date pigment or establish authorship by itself."
            },
            {
              "t": "Maurits M. van Dantzig let an impressive provenance settle ’pictology’: the science of authenticity without authenticating the supporting documents. The record disagrees.",
              "v": "wrong",
              "fb": "Provenance documents require authentication just as paintings do."
            },
            {
              "t": "Maurits M. van Dantzig used the market excitement around ’pictology’: the science of authenticity as independent confirmation of authorship. The claim comes first.",
              "v": "danger",
              "fb": "Price records demand; they do not identify the hand or date of manufacture."
            }
          ]
        },
        {
          "q": "Which conservation-lab choice best applies the method in the profile?",
          "o": [
            {
              "t": "Apply the stated attribution method, inspect the physical object, and compare secure reference works. Others can retrace it.",
              "v": "expert",
              "fb": "Yes: a technical observation becomes useful through historical comparison with reliable reference material."
            },
            {
              "t": "Judge the composition from photographs, but postpone examination of support, pigments, and restoration. The issue remains open.",
              "v": "partial",
              "fb": "Treatment should not be used to manufacture stylistic consistency for an attribution."
            },
            {
              "t": "Accept the dealer's chronology first, then avoid tests that could complicate the proposed attribution. The evidence points elsewhere.",
              "v": "wrong",
              "fb": "Commercial inconvenience is not a scientific reason to avoid appropriate examination."
            },
            {
              "t": "Announce the rediscovery immediately, and treat later material contradictions as minor conservation issues. Checking comes later.",
              "v": "danger",
              "fb": "Photographs cannot reveal every layer, binder, support, or microscopic particle."
            }
          ]
        },
        {
          "q": "What is the most defensible lesson of ’pictology’: the science of authenticity?",
          "o": [
            {
              "t": "Authorship should follow converging stylistic, material, and documentary evidence from the object. It remains checkable.",
              "v": "expert",
              "fb": "Exactly: authentication is a converging argument, not a single certificate."
            },
            {
              "t": "The trained eye should decide first, with technical analysis used mainly to illustrate that judgment. The issue remains open.",
              "v": "partial",
              "fb": "Connoisseurship proposes and compares; it should not dictate what every later test must show."
            },
            {
              "t": "A complete ownership story should eliminate the need to test pigments or workshop habits. The evidence points elsewhere.",
              "v": "wrong",
              "fb": "Even a long ownership story can be mistaken, incomplete, or deliberately constructed."
            },
            {
              "t": "The panel would be either a priceless masterpiece or a worthless fake with no mixed history. Excitement replaces examination.",
              "v": "danger",
              "fb": "Objects may be altered, partly authentic, misattributed, or historically important without fitting either extreme."
            }
          ]
        }
      ]
    },
    "ar_keating": {
      "sci": "Tom Keating (1917–1984)",
      "topic": "The forger & the deliberate 'time bomb'",
      "lede": "A famous signature cannot silence the object in Tom Keating's account of the forger and the deliberate ’time bomb’.",
      "no": 9,
      "profile": "The conservation briefing for today concerns Tom Keating and the difficult craft of the forger and the deliberate ’time bomb’. Tom Keating produced pastiches and forgeries and later claimed to hide deliberate 'time bombs,' including anachronisms or inscriptions, within some works. Paintings and drawings accumulate varnish, damage, restoration, ownership stories, and confident labels. Keating’s career shows why authentication must move between visual judgment and the physical life of the object.\n\nThe relevant practice is inspect supports and underlayers with imaging and material analysis instead of judging only the visible composition. Brushwork and recurring forms matter, but so do support, ground, pigment, binder, craquelure, alteration, and documentary history. Each observation has a date range and a degree of certainty; an attribution is strongest when several independent features point toward the same workshop and period.\n\nThe market rewards a single famous name, whereas conservation science often produces a more complicated answer. A panel can be old but repainted, a drawing can be skillful but misattributed, and a convincing provenance can rest on a modern document. Technical evidence does not replace connoisseurship; it disciplines what the eye proposes.\n\nThe sound principle is a hidden inconsistency may be intentional, accidental, or evidentiary, so it still requires documented interpretation. An artwork earns its identity through converging evidence, not through the confidence of its label. Good documentation also lets a later specialist revisit an attribution after methods improve. Uncertainty belongs in the catalogue when the object itself does not justify a final name. Good documentation also lets a later specialist revisit an attribution after methods improve.",
      "frame": "Closes the ultraviolet hood. \"At The Conservation Laboratory, confidence leaves residues. Tell me how the forger and the deliberate ’time bomb’ separates an attribution from a wish.\"",
      "q": [
        {
          "q": "Which attribution statement most faithfully reflects Tom Keating’s approach to the forger and the deliberate ’time bomb’?",
          "o": [
            {
              "t": "Tom Keating made the forger and the deliberate ’time bomb’ rest on visual comparison, object history, and technical examination. The object can still answer back.",
              "v": "expert",
              "fb": "Correct: attribution is strongest when visual comparison and object-based evidence converge."
            },
            {
              "t": "Tom Keating treated the forger and the deliberate ’time bomb’ as an exercise in beauty while leaving material inconsistencies unresolved. The issue remains open.",
              "v": "partial",
              "fb": "Aesthetic response is valuable, but it cannot date pigment or establish authorship by itself."
            },
            {
              "t": "Tom Keating let an impressive provenance settle the forger and the deliberate ’time bomb’ without authenticating the supporting documents. The record disagrees.",
              "v": "wrong",
              "fb": "Provenance documents require authentication just as paintings do."
            },
            {
              "t": "Tom Keating used the market excitement around the forger and the deliberate ’time bomb’ as independent confirmation of authorship. The claim comes first.",
              "v": "danger",
              "fb": "Price records demand; they do not identify the hand or date of manufacture."
            }
          ]
        },
        {
          "q": "Which conservation-lab choice best applies the method in the profile?",
          "o": [
            {
              "t": "Apply the stated attribution method, inspect the physical object, and compare secure reference works. Others can retrace it.",
              "v": "expert",
              "fb": "Yes: a technical observation becomes useful through historical comparison with reliable reference material."
            },
            {
              "t": "Judge the composition from photographs, but postpone examination of support, pigments, and restoration. The issue remains open.",
              "v": "partial",
              "fb": "Treatment should not be used to manufacture stylistic consistency for an attribution."
            },
            {
              "t": "Accept the dealer's chronology first, then avoid tests that could complicate the proposed attribution. The evidence points elsewhere.",
              "v": "wrong",
              "fb": "Commercial inconvenience is not a scientific reason to avoid appropriate examination."
            },
            {
              "t": "Announce the rediscovery immediately, and treat later material contradictions as minor conservation issues. Checking comes later.",
              "v": "danger",
              "fb": "Photographs cannot reveal every layer, binder, support, or microscopic particle."
            }
          ]
        },
        {
          "q": "What is the most defensible lesson of the forger and the deliberate ’time bomb’?",
          "o": [
            {
              "t": "Authorship should follow converging stylistic, material, and documentary evidence from the object. It remains checkable.",
              "v": "expert",
              "fb": "Exactly: authentication is a converging argument, not a single certificate."
            },
            {
              "t": "The trained eye should decide first, with technical analysis used mainly to illustrate that judgment. The issue remains open.",
              "v": "partial",
              "fb": "Connoisseurship proposes and compares; it should not dictate what every later test must show."
            },
            {
              "t": "A complete ownership story should eliminate the need to test pigments or workshop habits. The evidence points elsewhere.",
              "v": "wrong",
              "fb": "Even a long ownership story can be mistaken, incomplete, or deliberately constructed."
            },
            {
              "t": "The panel would be either a priceless masterpiece or a worthless fake with no mixed history. Excitement replaces examination.",
              "v": "danger",
              "fb": "Objects may be altered, partly authentic, misattributed, or historically important without fitting either extreme."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "ar_conservator": {
      "ar_gallery": "Conservator Nel waits beneath raking light at the auction house & gallery, where every old surface throws a new shadow. \"Takes the paint cross-sections; found a pigment that did not exist when the panel was supposedly made. Paint has dates, even when catalogues invent centuries.\"",
      "ar_provenance": "Conservator Nel waits beneath raking light at the provenance archive, where every old surface throws a new shadow. \"Takes the paint cross-sections; found a pigment that did not exist when the panel was supposedly made. Paint has dates, even when catalogues invent centuries.\"",
      "ar_lab": "Conservator Nel waits beneath raking light at the conservation laboratory, where every old surface throws a new shadow. \"Takes the paint cross-sections; found a pigment that did not exist when the panel was supposedly made. Paint has dates, even when catalogues invent centuries.\""
    },
    "ar_archivist": {
      "ar_gallery": "Archivist Boll waits beneath raking light at the auction house & gallery, where every old surface throws a new shadow. \"Traces old sale records; the panel's 'centuries-old' history dead-ends in a forged bill of sale. Paint has dates, even when catalogues invent centuries.\"",
      "ar_provenance": "Archivist Boll waits beneath raking light at the provenance archive, where every old surface throws a new shadow. \"Traces old sale records; the panel's 'centuries-old' history dead-ends in a forged bill of sale. Paint has dates, even when catalogues invent centuries.\"",
      "ar_lab": "Archivist Boll waits beneath raking light at the conservation laboratory, where every old surface throws a new shadow. \"Traces old sale records; the panel's 'centuries-old' history dead-ends in a forged bill of sale. Paint has dates, even when catalogues invent centuries.\""
    },
    "ar_framer": {
      "ar_gallery": "Framer Ruys waits beneath raking light at the auction house & gallery, where every old surface throws a new shadow. \"Built frames for the restorer's studio; saw a 'new' old panel aged in the back room. Paint has dates, even when catalogues invent centuries.\"",
      "ar_provenance": "Framer Ruys waits beneath raking light at the provenance archive, where every old surface throws a new shadow. \"Built frames for the restorer's studio; saw a 'new' old panel aged in the back room. Paint has dates, even when catalogues invent centuries.\"",
      "ar_lab": "Framer Ruys waits beneath raking light at the conservation laboratory, where every old surface throws a new shadow. \"Built frames for the restorer's studio; saw a 'new' old panel aged in the back room. Paint has dates, even when catalogues invent centuries.\""
    }
  },
  "story": [
    "<p>The Halberstadt Panel hangs beneath guarded lighting, newly famous and newly doubted. Its saintly face has survived centuries that its paperwork cannot describe.</p>",
    "<p><b>Conservator Nel</b> reads the paint layers, <b>Archivist Boll</b> follows sales and owners, and <b>Framer Ruys</b> knows what was built and aged behind the studio door.</p>",
    "<p><b>A priceless rediscovered Old Master</b> flatters every buyer; <b>An obvious, clumsy fake — beneath notice</b> flatters every skeptic. The object may carry a more exact identity than either camp wants.</p>",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide the <b>WHAT</b> from the evidence."
  ],
  "endings": {
    "overclaimWhat": "ar_masterpiece",
    "dismissalWhat": "ar_obvious",
    "win": {
      "expertTitle": "The Pigment Gives the Date",
      "expert": [
        "You accuse <b>Anselm Roterman — the panel's restorer</b>, locate the decisive result in <b>The Conservation Laboratory</b>, and establish <b>A forgery moved on faked provenance, betrayed by an anachronistic pigment</b>. Not a priceless rediscovered old master. Not an obvious, clumsy fake — beneath notice.",
        "The forged ownership trail brought the panel to market, but the anachronistic pigment fixes the material impossibility. Style supplied plausibility; conservation science supplies the boundary it cannot cross."
      ],
      "soundTitle": "An Attribution Withdrawn",
      "sound": [
        "You correctly connect <b>Anselm Roterman — the panel's restorer</b>, <b>The Conservation Laboratory</b>, and <b>A forgery moved on faked provenance, betrayed by an anachronistic pigment</b>. The panel’s surface and documents now tell the same modern story.",
        "Your account leaves some workshop steps unresolved, yet it is sufficient to remove the Old Master attribution and preserve samples, correspondence, and sale records for prosecution."
      ],
      "namedTitle": "The False Old Master",
      "named": [
        "You name the correct combination: <b>Anselm Roterman — the panel's restorer</b>, <b>The Conservation Laboratory</b>, and <b>A forgery moved on faked provenance, betrayed by an anachronistic pigment</b>.",
        "The conclusion is right though the technical explanation is abbreviated. The cross-section and provenance archive can now provide the missing detail."
      ]
    },
    "overclaim": {
      "title": "Sold on the Signature",
      "body": [
        "You proclaim <b>A priceless rediscovered Old Master</b>, allowing prestige and desire to outweigh the panel’s physical chronology. The market celebrates before the sample is understood.",
        "When the modern pigment becomes unavoidable, your commission looks captured by price and romance. The narrower, demonstrable forgery finding loses authority with it."
      ]
    },
    "dismissal": {
      "title": "The Daub That Fooled Experts",
      "body": [
        "You choose <b>An obvious, clumsy fake — beneath notice</b>, as though a clumsy picture could not require sophisticated restoration, documentation, and sale strategy.",
        "That contempt hides the mechanism that moved the work through respected hands. The false provenance and deliberate aging remain available for reuse on the next object."
      ]
    },
    "wrongNames": {
      "title": "Correct Fake, Wrong Hand",
      "body": [
        "You identify <b>A forgery moved on faked provenance, betrayed by an anachronistic pigment</b>, but accuse the wrong market participant or place the decisive discovery outside the laboratory. The object’s preparation and custody lead instead to"
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A painted panel examined under magnification for an anachronistic pigment\"><rect x=\"58\" y=\"24\" width=\"244\" height=\"92\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.6\"/><path d=\"M82 94 C118 48,160 38,202 54 C232 66,252 84,278 96\" fill=\"none\" stroke=\"#326891\" stroke-width=\"1.7\"/><circle cx=\"430\" cy=\"62\" r=\"36\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.7\"/><path d=\"M456 88 L516 118\" stroke=\"#121212\" stroke-width=\"5\" stroke-linecap=\"round\"/><circle cx=\"420\" cy=\"54\" r=\"5\" fill=\"#B3261E\"/><circle cx=\"440\" cy=\"70\" r=\"4\" fill=\"#B3261E\"/><path d=\"M394 62 H466\" stroke=\"#e2e2d8\" stroke-width=\"1\"/></svg>"
}};
