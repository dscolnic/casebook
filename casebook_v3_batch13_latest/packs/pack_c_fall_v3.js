// Casebook V3 — three informants, three readings, one clue per correct answer.
module.exports = { PACK: {
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "c_fall",
  "title": "The Last Council of Vellano",
  "discipline": "History & Historical Method",
  "venue": "the Vellano fall inquiry",
  "agent": {
    "name": "Archivist-Investigator Lena Corvo",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Commission credibility",
  "readingShort": "Historians",
  "readingLabel": "Historians of Method",
  "dossierName": "HISTORIANS OF METHOD",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Vellano fall inquiry",
  "DAYS_TOTAL": 3,
  "teaser": "A proud republic fell after a sealed order opened its river gate. Did the council formally stand down the garrison, was the city already doomed by decline, or did an exiled commander manufacture authority and coordinate a betrayal?",
  "overclaimTag": "a legendary traitor at the gate",
  "truthTag": "a documented external betrayal",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A city gate opened at night with a forged order and troops approaching\"><path d=\"M45 112 H615\" stroke=\"#121212\" stroke-width=\"3\"/><path d=\"M90 112 V40 H250 V112 M160 112 V70 H210 V112\" fill=\"none\" stroke=\"#121212\" stroke-width=\"4\"/><path d=\"M160 70 h50\" stroke=\"#B3261E\" stroke-width=\"5\"/><rect x=\"300\" y=\"28\" width=\"125\" height=\"78\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/><path d=\"M320 48 h85 M320 66 h85 M320 84 h52\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><path d=\"M430 67 C485 70 520 88 570 105\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"3\"/></svg>",
  "overclaimTease": "Long decline can explain vulnerability without explaining one opened gate. Authenticate the order, align the night’s sequence, and follow the small records that survived the official story.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "fa_general",
      "items": [
        {
          "id": "fa_provv",
          "label": "Provveditore Bassi — the council war magistrate"
        },
        {
          "id": "fa_general",
          "label": "Ugo Sanvitale — the exiled condottiero"
        },
        {
          "id": "fa_doge",
          "label": "Doge Reniero — the last head of state"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "fa_walls",
      "items": [
        {
          "id": "fa_walls",
          "label": "The River Gate & Postern Packet"
        },
        {
          "id": "fa_chamber",
          "label": "The Last Council Chamber"
        },
        {
          "id": "fa_archive",
          "label": "The State Archive & Chancery"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "fa_betrayal",
      "items": [
        {
          "id": "fa_decision",
          "label": "A council faction formally voted to stand down the garrison"
        },
        {
          "id": "fa_inevit",
          "label": "Long decline made the republic’s fall effectively inevitable"
        },
        {
          "id": "fa_betrayal",
          "label": "An exile forged authority, bought the gate, and coordinated entry"
        }
      ]
    }
  },
  "READING_ORDER": [
    "fa_chancellor",
    "fa_warden",
    "fa_notary"
  ],
  "CHARACTERS": {
    "fa_chancellor": {
      "name": "Chancery Clerk Orso",
      "role": "Chancery records clerk",
      "face": "🗂",
      "badge": "O",
      "legend": "the council minute",
      "hint": "The authentic vote reinforced the watch; the gate instruction was produced elsewhere.",
      "reading": "fa_thucydides"
    },
    "fa_warden": {
      "name": "Gate Warden Pia",
      "role": "River-gate warden",
      "face": "🗝",
      "badge": "P",
      "legend": "the postern packet",
      "hint": "The order bore a copied seal and arrived while enemy scouts were already waiting.",
      "reading": "fa_valla"
    },
    "fa_notary": {
      "name": "Notary Ferro",
      "role": "City notary and chronicler",
      "face": "🪶",
      "badge": "F",
      "legend": "the peripheral ledgers",
      "hint": "Courier, wax, payment, and troop records converge on the exiled commander’s network.",
      "reading": "fa_ginzburg"
    }
  },
  "TOPICS": {
    "fa_thucydides": {
      "sci": "Thucydides (c. 460-c. 400 BC)",
      "topic": "Evidence, cause, and political history",
      "lede": "Thucydides separated immediate events, deeper causes, and the stories participants later told about both.",
      "no": 1,
      "profile": "Thucydides was an Athenian general and historian whose account of the Peloponnesian War became a model of critical political history. Exiled after failing to prevent the loss of Amphipolis, he used his distance and contacts on both sides to investigate a conflict still unfolding. He rejected divine explanations and tried to distinguish rumor from what witnesses could support.\n\nThucydides was frank about method. He could not reproduce every speech word for word, so he presented what he believed speakers were most likely to have said while preserving the general sense. For events, he compared accounts and acknowledged how difficult accuracy was when memory, loyalty, and self-interest shaped testimony. He also distinguished immediate pretexts from underlying causes, famously identifying fear of Athenian power as a deeper driver of war.\n\nThat distinction matters when a state collapses. Long-term weakness can make a city vulnerable without making its fall inevitable. A council vote can contribute to exposure without explaining how an enemy entered a specific gate at a specific hour. Investigators must align orders, watch logs, physical access, and the sequence of military movement.\n\nVellano’s republic was divided and short of money, but the garrison was not formally stood down on the night of the fall. The authentic council minutes order reinforced watches. A separate gate instruction, delivered after the session under a copied seal, reverses that command. Enemy troops move only after the postern opens. Thucydides therefore resists the lazy claim that a declining republic simply died of its own condition. Structural weakness created opportunity; a concrete act exploited it. The immediate cause has a messenger, a document, and a beneficiary outside the council chamber.",
      "frame": "Pins the council minute, gate log, and enemy movement times to the same hour. “Weak states invite danger. They do not open posterns by themselves.”",
      "q": [
        {
          "q": "How did Thucydides distinguish deeper causes from immediate events?",
          "o": [
            {
              "t": "He assumed that a weakened state’s defeat was inevitable regardless of decisions.",
              "v": "danger",
              "fb": "Vulnerability changes probability; it does not erase contingency or agency."
            },
            {
              "t": "He treated the most dramatic eyewitness account as the complete cause of an event.",
              "v": "partial",
              "fb": "Eyewitness testimony matters, but one vivid account can omit broader and immediate causes."
            },
            {
              "t": "He separated long-term pressures from the specific acts that triggered outcomes.",
              "v": "expert",
              "fb": "Thucydides examined both structural conditions and the proximate sequence of action."
            },
            {
              "t": "He explained wars chiefly through omens and divine punishment of declining cities.",
              "v": "wrong",
              "fb": "His history is notable for political and human causation rather than divine explanation."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — lead",
            "text": "The republic’s weakness created vulnerability, but a forged night order and opened postern supplied the immediate mechanism of conquest."
          }
        },
        {
          "q": "Which timeline best tests whether the council itself ordered the gate opened?",
          "o": [
            {
              "t": "Treat the last order bearing the state seal as the council’s true decision.",
              "v": "danger",
              "fb": "A seal can be copied; provenance and timing must authenticate the instruction."
            },
            {
              "t": "Read later chronicles describing the republic as corrupt and exhausted.",
              "v": "partial",
              "fb": "Later interpretation provides context but cannot establish the night’s order chain."
            },
            {
              "t": "Count how many councillors fled the city during the following week.",
              "v": "wrong",
              "fb": "Flight after defeat does not show what the council commanded beforehand."
            },
            {
              "t": "Compare the signed minute, messenger arrival, gate action, and enemy movement.",
              "v": "expert",
              "fb": "A synchronized documentary and physical sequence tests authorship and implementation."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — lead",
            "text": "The authentic chamber minute precedes a contradictory order delivered at the River Gate, where the opening and entry are recorded."
          }
        },
        {
          "q": "Who benefits most directly from the contradictory gate order?",
          "o": [
            {
              "t": "The exiled commander whose troops moved only after the forged order reached the gate.",
              "v": "expert",
              "fb": "Advance coordination between the false order and waiting troops identifies the operational beneficiary."
            },
            {
              "t": "The war magistrate who argued for reinforcing the walls throughout the council meeting.",
              "v": "partial",
              "fb": "Arguing for defense does not match the action that exposed the gate."
            },
            {
              "t": "The doge who remained in the palace until the attackers entered the city.",
              "v": "wrong",
              "fb": "Remaining in the palace provides no evidence of directing the external entry."
            },
            {
              "t": "Every faction opposing the government, regardless of access to the operation.",
              "v": "danger",
              "fb": "Political hostility creates motive broadly; operational timing narrows responsibility."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — lead",
            "text": "Enemy scouts linked to Ugo Sanvitale were waiting at the postern before the false instruction arrived."
          }
        }
      ]
    },
    "fa_valla": {
      "sci": "Lorenzo Valla (1407-1457)",
      "topic": "Philology and the exposure of forged authority",
      "lede": "Lorenzo Valla showed that a document can carry an impressive seal and still betray itself through language that belongs to another time or office.",
      "no": 2,
      "profile": "Lorenzo Valla was an Italian humanist, scholar, and priest whose close study of Latin became a tool for historical criticism. Around 1440 he analyzed the Donation of Constantine, a document long used to support papal territorial authority. Valla demonstrated that it could not have been written in the fourth century. Its vocabulary, institutions, titles, and style belonged to a later medieval world.\n\nHis argument was philological: language has a history. Words change meaning, administrative formulas evolve, and offices use conventional phrasing. A forger may imitate parchment, handwriting, or seals while unconsciously using expressions unavailable to the supposed author. Authenticity therefore rests on the agreement of material, language, institutional context, and provenance.\n\nValla’s method does not mean every irregular phrase proves fraud. A scribe can copy, translate, abbreviate, or modernize a text. Investigators compare multiple genuine documents from the same chancery, identify habitual formulas, and test whether the anomaly aligns with another writer’s practice.\n\nThe Vellano gate order survives in the warden’s packet. Its seal impression resembles the war magistrate’s, but the instruction uses a mercenary command phrase absent from council documents and common in Ugo Sanvitale’s surviving contracts. The wax contains a mineral filler used by his exile court, not the chancery stock logged that week. The clerk’s hand also differs from the registered council scribes. Valla’s lesson turns “treason” from legend into a testable claim: the authority was manufactured. The decisive WHERE is the River Gate because that is where the false document entered the chain of command and produced action. The archive authenticates the comparison; the gate packet preserves the operative forgery.",
      "frame": "Places the gate order among genuine council commands and circles one mercenary formula. “The seal imitates the state. The language belongs to another household.”",
      "q": [
        {
          "q": "How did Valla demonstrate that the Donation of Constantine was forged?",
          "o": [
            {
              "t": "He proved the parchment itself was modern by applying a chemical dating test.",
              "v": "partial",
              "fb": "Material analysis can help, but Valla’s famous argument was primarily philological."
            },
            {
              "t": "He found vocabulary and institutions inconsistent with the document’s claimed era.",
              "v": "expert",
              "fb": "Historical language and institutional anachronisms undermined the claimed origin."
            },
            {
              "t": "He discovered a written confession signed by the medieval scribe who created it.",
              "v": "wrong",
              "fb": "No such confession formed the basis of his demonstration."
            },
            {
              "t": "He rejected the text chiefly because it strengthened an institution he opposed politically.",
              "v": "danger",
              "fb": "Motive for criticism does not replace the specific linguistic evidence he presented."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — corroboration",
            "text": "The gate instruction imitates state authority while using language and materials tied to the exile commander’s household."
          }
        },
        {
          "q": "What comparison best tests the authenticity of the Vellano gate order?",
          "o": [
            {
              "t": "Accept the document because the gate warden obeyed it during an emergency.",
              "v": "wrong",
              "fb": "Obedience proves the order was persuasive, not that it was authentic."
            },
            {
              "t": "Reject every copied or abbreviated instruction as a deliberate political forgery.",
              "v": "danger",
              "fb": "Copying can be legitimate; the pattern of mismatched language and materials establishes fraud."
            },
            {
              "t": "Match its language, seal material, handwriting, and formula against genuine orders.",
              "v": "expert",
              "fb": "Authentication requires several independent features to agree with the claimed source."
            },
            {
              "t": "Compare its dramatic content with later patriotic paintings of the city’s fall.",
              "v": "partial",
              "fb": "Later art reflects memory and politics, not the document’s production."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — corroboration",
            "text": "The operative document preserved at the River Gate can be compared with genuine chancery formulas, wax stock, and registered hands."
          }
        },
        {
          "q": "Which linguistic fact most directly links the forgery to Ugo Sanvitale?",
          "o": [
            {
              "t": "The paper contains a common military word used by armies throughout the region.",
              "v": "wrong",
              "fb": "A widespread term cannot identify one writer or office."
            },
            {
              "t": "The document mentions an enemy threat, so the enemy commander probably wrote and delivered it.",
              "v": "danger",
              "fb": "Content alone may be imitated; the unusual linguistic fingerprint supplies the stronger link."
            },
            {
              "t": "The order uses formal Latin rather than the dialect spoken by ordinary gate guards.",
              "v": "partial",
              "fb": "Formal language fits chancery practice and is not specific to the exile household."
            },
            {
              "t": "A rare mercenary phrase appears in his authenticated letters but not in council files.",
              "v": "expert",
              "fb": "A distinctive repeated formula can connect authorship when common alternatives are excluded."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — corroboration",
            "text": "A command formula unique to Sanvitale’s contracts appears in the false order before his troops advance."
          }
        }
      ]
    },
    "fa_ginzburg": {
      "sci": "Carlo Ginzburg (b. 1939)",
      "topic": "Microhistory and the evidential paradigm",
      "lede": "Carlo Ginzburg built large historical conclusions from small traces that powerful institutions had not thought worth erasing.",
      "no": 3,
      "profile": "Carlo Ginzburg is an Italian historian associated with microhistory, an approach that studies a small event, person, or community in extraordinary detail to reveal larger structures. His book The Cheese and the Worms reconstructed the ideas of a sixteenth-century miller, Menocchio, from Inquisition records. Rather than treating the records only as the voice of authority, Ginzburg read their questions, hesitations, and repeated details for traces of the accused man’s world.\n\nGinzburg has also written about the “evidential paradigm,” comparing historical inference with medicine, tracking, and connoisseurship. A hunter identifies an unseen animal from prints; a physician infers disease from symptoms; a historian reconstructs an act from details not designed as a complete confession. The strength comes from convergence and from understanding how each trace was produced.\n\nSmall clues can mislead when isolated. A seal fragment, payment, or unusual phrase might have innocent explanations. Microhistory joins them in a dense local sequence and tests alternatives. The method is especially effective when official narratives are polished but peripheral records remain messy.\n\nThe Vellano trail is made of such remnants. A stable ledger records Sanvitale’s courier horse arriving before midnight. A wax seller notes the distinctive filler purchased by his factor. The postern key shows fresh filing, and the gate warden’s household receives payment through a merchant used by the exiled commander. None alone proves conquest by fraud. Together with the forged order and troops waiting in darkness, they form a connected operation. Ginzburg’s approach makes the “one traitor” explanation true in a more precise form than legend: not a mythical villain inside the council, but an outside commander who manufactured authority, bought access, and exploited one gate.",
      "frame": "Arranges a stable entry, wax purchase, key filing, and merchant payment around the false order. “Great betrayals survive in small accounts because nobody expects the scraps to meet again.”",
      "q": [
        {
          "q": "What is distinctive about microhistorical investigation?",
          "o": [
            {
              "t": "It reconstructs a small setting densely enough for minor traces to test larger claims.",
              "v": "expert",
              "fb": "Microhistory uses concentrated context and source criticism rather than mere small scale."
            },
            {
              "t": "It assumes every unexplained detail is intentional evidence left by a conspirator.",
              "v": "danger",
              "fb": "Traces gain force through convergence; ambiguity alone is not proof of design."
            },
            {
              "t": "It avoids archival detail and relies on broad theories of state decline.",
              "v": "partial",
              "fb": "The approach is grounded in close evidence, not avoidance of records."
            },
            {
              "t": "It treats one colorful anecdote as representative without checking its production.",
              "v": "wrong",
              "fb": "Anecdotes become useful only when their sources and alternatives are examined."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — decisive",
            "text": "Gate packet, key marks, courier ledger, and payment trail converge at the River Gate where the forged authority became physical access."
          }
        },
        {
          "q": "Why do several small traces matter more together than separately?",
          "o": [
            {
              "t": "Four suspicious details make coincidence too unlikely to remain a serious explanation.",
              "v": "danger",
              "fb": "Convergence changes probability but still requires plausible alternatives to be tested."
            },
            {
              "t": "Independent traces produced by different activities converge on one sequence.",
              "v": "expert",
              "fb": "Different production pathways reduce the chance that one error or copied story explains them all."
            },
            {
              "t": "Each trace is dramatic enough to establish the entire operation by itself alone.",
              "v": "partial",
              "fb": "No single clue here carries the whole inference; their relationship does."
            },
            {
              "t": "The number of documents matters even when all repeat the same original rumor.",
              "v": "wrong",
              "fb": "Repeated dependence on one source does not create independent corroboration."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — decisive",
            "text": "Forgery, courier timing, key alteration, payment, and waiting troops form a single coordinated betrayal rather than inevitable decline."
          }
        },
        {
          "q": "Which combined evidence most directly identifies Ugo Sanvitale as the organizer?",
          "o": [
            {
              "t": "He had publicly threatened Vellano after being exiled several years earlier.",
              "v": "partial",
              "fb": "A threat supplies motive but not the specific means and coordination of this operation."
            },
            {
              "t": "The doge lost office when the republic fell and therefore benefited least.",
              "v": "wrong",
              "fb": "Loss after the event does not locate the person who arranged the breach."
            },
            {
              "t": "His authenticated networks connect the forged order, access payment, and troop timing.",
              "v": "expert",
              "fb": "Operational links through separate records identify the organizer beyond general motive."
            },
            {
              "t": "The war magistrate’s genuine seal was copied, making him responsible for the forgery.",
              "v": "danger",
              "fb": "A copied credential victimizes its owner unless evidence shows participation in the copy."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — decisive",
            "text": "His courier, household wax, contract phrase, payment channel, and waiting troops join across independent records."
          }
        }
      ]
    }
  },
  "story": [
    "<b>Vellano fell after its river postern opened under an order bearing the war magistrate’s seal.</b>",
    "Chancery Clerk Orso holds the authentic council minute. Gate Warden Pia preserved the operative order. Notary Ferro can assemble the courier, material, payment, and troop traces.",
    "The city may have been exposed by a council vote, doomed by long decline, or deliberately entered through authority manufactured by an exiled commander.",
    "Nine clues separate structural weakness from the specific act that turned one vulnerable gate into conquest."
  ],
  "endings": {
    "overclaimWhat": "fa_decision",
    "dismissalWhat": "fa_inevit",
    "win": {
      "expertTitle": "The Forged Order at the River Gate",
      "expert": [
        "You connect Ugo Sanvitale, the River Gate & Postern Packet, and an operation that forged authority, bought access, and coordinated enemy entry. Authentic minutes, language, material, payment, and movement records converge.",
        "The council did not vote to stand down the garrison, and decline did not make the night inevitable. An outside commander exploited vulnerability through a specific, documented betrayal."
      ],
      "soundTitle": "The Exile’s Gate Operation",
      "sound": [
        "Your accusation identifies Sanvitale, the River Gate, and the forged-order betrayal.",
        "Some philological or payment details remain incomplete, but the operational timing supports the verdict."
      ],
      "namedTitle": "Right Betrayal, Limited Archive",
      "named": [
        "You select the correct WHO, WHERE, and WHAT.",
        "The conclusion is right, although missed clues leave parts of the forgery or access-payment chain less firmly established."
      ]
    },
    "overclaim": {
      "title": "The Council Minute Ordered Reinforcement",
      "body": [
        "The authentic chamber record strengthens the watch; only the later gate instruction reverses it.",
        "Blaming a formal council decision ignores the forged document and external coordination that produced the breach."
      ]
    },
    "dismissal": {
      "title": "Decline Did Not Open the Postern",
      "body": [
        "Vellano was vulnerable, but troops entered only after a copied order, paid access, and timed movement.",
        "Calling the fall inevitable erases the contingent operation that converted weakness into conquest."
      ]
    },
    "wrongNames": {
      "title": "The Betrayal, Misassigned",
      "body": [
        "You recognize a forged gate operation but place it away from Sanvitale and the River Gate records that join document, payment, and entry."
      ]
    }
  }
}
};
