module.exports = { PACK: {
  "id": "c_fall",
  "title": "The Last Council of Vellano",
  "discipline": "History & Historical Method",
  "teaser": "A proud republic fell in a single night. A traitor's bargain? A state already doomed? Or one decision buried in the council minutes?",
  "overclaimTag": "one great traitor",
  "truthTag": "a documented contingent decision",
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
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The WHERE you test determines the dossier, and the conversation costs one day.",
  "overclaimTease": "History rarely fits inside one villain’s silhouette, especially when the paper trail still survives.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "fa_provv",
      "items": [
        {
          "id": "fa_provv",
          "label": "Provveditore Bassi — the council's war magistrate"
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
      "truth": "fa_archive",
      "items": [
        {
          "id": "fa_walls",
          "label": "The City Walls & the River Gate"
        },
        {
          "id": "fa_chamber",
          "label": "The Council Chamber"
        },
        {
          "id": "fa_archive",
          "label": "The State Archive & Chancery"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "fa_decision",
      "items": [
        {
          "id": "fa_betrayal",
          "label": "A single traitor sold the city from within"
        },
        {
          "id": "fa_inevit",
          "label": "A dying republic — its fall was inevitable"
        },
        {
          "id": "fa_decision",
          "label": "A documented council vote that stood down the garrison and left the gate unbarred"
        }
      ]
    }
  },
  "PLACES": {
    "fa_walls": {
      "name": "The City Walls & the River Gate",
      "xy": [
        140,
        90
      ]
    },
    "fa_chamber": {
      "name": "The Council Chamber",
      "xy": [
        330,
        240
      ]
    },
    "fa_archive": {
      "name": "The State Archive & Chancery",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "fa_walls",
      "fa_chamber"
    ],
    [
      "fa_chamber",
      "fa_archive"
    ]
  ],
  "CHARACTERS": {
    "fa_chancellor": {
      "name": "Chancery Clerk Orso",
      "role": "Chancery records clerk",
      "face": "🗂",
      "badge": "O",
      "legend": "the archive",
      "hint": "Keeps the council minute-books; can find the vote that stood the mercenaries down."
    },
    "fa_warden": {
      "name": "Gate Warden Pia",
      "role": "River-gate warden",
      "face": "🗝",
      "badge": "P",
      "legend": "the walls",
      "hint": "Kept the gate watch; knows on whose written order the postern was left unbarred."
    },
    "fa_notary": {
      "name": "Notary Ferro",
      "role": "City notary & chronicler",
      "face": "🪶",
      "badge": "F",
      "legend": "the chamber",
      "hint": "Recorded the debates verbatim; heard which faction forced the fatal motion through."
    }
  },
  "TOPICMAP": {
    "fa_walls": {
      "fa_chancellor": [
        "fa_herodotus"
      ],
      "fa_warden": [
        "fa_polybius"
      ],
      "fa_notary": [
        "fa_tacitus"
      ]
    },
    "fa_chamber": {
      "fa_chancellor": [
        "fa_valla"
      ],
      "fa_warden": [
        "fa_michelet"
      ],
      "fa_notary": [
        "fa_bloch"
      ]
    },
    "fa_archive": {
      "fa_chancellor": [
        "fa_braudel"
      ],
      "fa_warden": [
        "fa_davis"
      ],
      "fa_notary": [
        "fa_collingwood"
      ]
    }
  },
  "TOPICS": {
    "fa_herodotus": {
      "sci": "Herodotus (c.484–425 BC)",
      "topic": "Inquiry & the first histories",
      "lede": "Herodotus used inquiry and the first histories to show how archives preserve choices that hindsight tries to erase.",
      "no": 1,
      "profile": "Today’s archival memorandum turns to Herodotus as a guide to inquiry and the first histories. Herodotus called his work an inquiry and gathered stories, observations, and competing explanations about the wars between Greeks and Persians. Histories of collapse are especially vulnerable to hindsight because the ending makes every earlier warning look inevitable. Herodotus’s work offers a way to restore contingency without pretending that choices occurred outside institutions and long pressures.\n\nThe historian’s task here is to report alternative accounts, identify their sources when possible, and compare custom, geography, memory, and political interest. Documents must be dated, authors situated, silences noticed, and retrospective explanations compared with what participants could have known. A source may report an action accurately while misrepresenting motive, or preserve motive while misunderstanding consequence.\n\nCausal history therefore works at several scales. Fiscal strain, geography, faction, military capacity, and political culture can narrow the field of action; a vote, order, refusal, or delay can still select among the paths that remained. Neither a heroic villain nor a faceless structure should be allowed to absorb every cause.\n\nThe methodological conclusion is preserving disagreement can be more honest than forcing uncertain evidence into a single seamless account. Historical explanation becomes persuasive when chronology preserves both constraint and choice. Counterfactual questions are useful when they identify a real alternative visible in the contemporary record. Later legend should be treated as evidence about memory before it is treated as evidence about the event. Counterfactual questions are useful when they identify a real alternative visible in the contemporary record.",
      "frame": "Rests a hand on the minute-book. \"The ending has made everyone wise. Use inquiry and the first histories to tell me what the council could actually know.\"",
      "q": [
        {
          "q": "Which historical interpretation best matches Herodotus’s treatment of inquiry and the first histories?",
          "o": [
            {
              "t": "Herodotus made inquiry and the first histories answer to chronology, source criticism, and historically available choices.",
              "v": "expert",
              "fb": "Correct: historical explanation must identify both the surviving evidence and the scale of each cause."
            },
            {
              "t": "Herodotus treated inquiry and the first histories as a collection of vivid anecdotes after the ending was already known in context.",
              "v": "partial",
              "fb": "Anecdotes become evidence only after their date, source, and relation to events are assessed."
            },
            {
              "t": "Herodotus let later legend settle inquiry and the first histories even when contemporary documents preserved alternatives in practice.",
              "v": "wrong",
              "fb": "The final outcome does not make every previous alternative impossible."
            },
            {
              "t": "Herodotus used inquiry and the first histories to make one villain's intention supply every missing political cause in context.",
              "v": "danger",
              "fb": "One actor may matter greatly without explaining institutions, constraints, and other decisions."
            }
          ]
        },
        {
          "q": "How would a historian apply the method described here to a disputed decision?",
          "o": [
            {
              "t": "Reconstruct the dated record, identify each source's position, and recover alternatives visible at the time. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Yes: contingency appears when the archive reveals choices that were genuinely available before the outcome."
            },
            {
              "t": "Begin with the later national memory, then retain mainly documents that support its preferred moral. The comparison is narrowed to the favored documents.",
              "v": "partial",
              "fb": "Later memory is evidence about commemoration, not an automatic guide to the original decision."
            },
            {
              "t": "Treat every official minute as transparent proof of motive because a clerk recorded it contemporaneously. The account leans heavily on prior reputation.",
              "v": "wrong",
              "fb": "Contemporary records can still omit, sanitize, or strategically frame motive."
            },
            {
              "t": "Choose the betrayal narrative first, and interpret every archival uncertainty as deliberate concealment. The conclusion shapes which records receive attention.",
              "v": "danger",
              "fb": "Uncertainty can arise from ordinary archival limits and does not establish a hidden betrayal."
            }
          ]
        },
        {
          "q": "Which causal claim is most consistent with inquiry and the first histories?",
          "o": [
            {
              "t": "Historical explanation should assign distinct roles to long pressures, institutions, and particular choices. It remains checkable across the available record in the case file.",
              "v": "expert",
              "fb": "Exactly: good causal history can combine durable constraints with a consequential decision."
            },
            {
              "t": "Structural weakness should explain the outcome even when officials documented another available course. The remaining uncertainty is assigned to ordinary variation in context.",
              "v": "partial",
              "fb": "Structures narrow options, but a documented alternative can preserve the importance of agency."
            },
            {
              "t": "One immediate order should explain the whole history and make earlier institutions irrelevant. The method does not support it under the documented sequence in the case file in practice.",
              "v": "wrong",
              "fb": "Immediate decisions do not erase the conditions that made them consequential."
            },
            {
              "t": "The state is assumed to have fallen inevitably or been destroyed largely by one solitary traitor. The claim comes first. The preferred narrative sets the order of review in context.",
              "v": "danger",
              "fb": "The two extremes remove the layered causal work that historical evidence permits."
            }
          ]
        }
      ]
    },
    "fa_polybius": {
      "sci": "Polybius (c.200–118 BC)",
      "topic": "Why states rise and fall",
      "lede": "Polybius read why states rise and fall against chronology, motive, structure, and the alternatives once still open.",
      "no": 2,
      "profile": "Today’s archival memorandum turns to Polybius as a guide to why states rise and fall. Polybius explained Rome's rise through institutions, military organization, fortune, and a mixed constitution, while insisting on practical and geographical inquiry. Histories of collapse are especially vulnerable to hindsight because the ending makes every earlier warning look inevitable. Polybius’s work offers a way to restore contingency without pretending that choices occurred outside institutions and long pressures.\n\nThe historian’s task here is to connect institutions and decisions across multiple theaters, visit relevant places, and test accounts against political experience. Documents must be dated, authors situated, silences noticed, and retrospective explanations compared with what participants could have known. A source may report an action accurately while misrepresenting motive, or preserve motive while misunderstanding consequence.\n\nCausal history therefore works at several scales. Fiscal strain, geography, faction, military capacity, and political culture can narrow the field of action; a vote, order, refusal, or delay can still select among the paths that remained. Neither a heroic villain nor a faceless structure should be allowed to absorb every cause.\n\nThe methodological conclusion is states rise and fall through interacting structures and choices rather than a single moral label. Historical explanation becomes persuasive when chronology preserves both constraint and choice. Counterfactual questions are useful when they identify a real alternative visible in the contemporary record. Later legend should be treated as evidence about memory before it is treated as evidence about the event. Counterfactual questions are useful when they identify a real alternative visible in the contemporary record.",
      "frame": "Ties the archive ribbon again. \"Legends have already chosen their villain. I need your account of why states rise and fall first.\"",
      "q": [
        {
          "q": "Which historical interpretation best matches Polybius’s treatment of why states rise and fall?",
          "o": [
            {
              "t": "Polybius made why states rise and fall answer to chronology, source criticism, and historically available choices.",
              "v": "expert",
              "fb": "Correct: historical explanation must identify both the surviving evidence and the scale of each cause."
            },
            {
              "t": "Polybius treated why states rise and fall as a collection of vivid anecdotes after the ending was already known in context.",
              "v": "partial",
              "fb": "Anecdotes become evidence only after their date, source, and relation to events are assessed."
            },
            {
              "t": "Polybius let later legend settle why states rise and fall even when contemporary documents preserved alternatives in practice.",
              "v": "wrong",
              "fb": "The final outcome does not make every previous alternative impossible."
            },
            {
              "t": "Polybius used why states rise and fall to make one villain's intention supply every missing political cause in context.",
              "v": "danger",
              "fb": "One actor may matter greatly without explaining institutions, constraints, and other decisions."
            }
          ]
        },
        {
          "q": "How would a historian apply the method described here to a disputed decision?",
          "o": [
            {
              "t": "Reconstruct the dated record, identify each source's position, and recover alternatives visible at the time. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Yes: contingency appears when the archive reveals choices that were genuinely available before the outcome."
            },
            {
              "t": "Begin with the later national memory, then retain mainly documents that support its preferred moral. The comparison is narrowed to the favored documents.",
              "v": "partial",
              "fb": "Later memory is evidence about commemoration, not an automatic guide to the original decision."
            },
            {
              "t": "Treat every official minute as transparent proof of motive because a clerk recorded it contemporaneously. The account leans heavily on prior reputation.",
              "v": "wrong",
              "fb": "Contemporary records can still omit, sanitize, or strategically frame motive."
            },
            {
              "t": "Choose the betrayal narrative first, and interpret every archival uncertainty as deliberate concealment. The conclusion shapes which records receive attention.",
              "v": "danger",
              "fb": "Uncertainty can arise from ordinary archival limits and does not establish a hidden betrayal."
            }
          ]
        },
        {
          "q": "Which causal claim is most consistent with why states rise and fall?",
          "o": [
            {
              "t": "Historical explanation should assign distinct roles to long pressures, institutions, and particular choices. It remains checkable across the available record in the case file.",
              "v": "expert",
              "fb": "Exactly: good causal history can combine durable constraints with a consequential decision."
            },
            {
              "t": "Structural weakness should explain the outcome even when officials documented another available course. The remaining uncertainty is assigned to ordinary variation in context.",
              "v": "partial",
              "fb": "Structures narrow options, but a documented alternative can preserve the importance of agency."
            },
            {
              "t": "One immediate order should explain the whole history and make earlier institutions irrelevant. The method does not support it under the documented sequence in the case file in practice.",
              "v": "wrong",
              "fb": "Immediate decisions do not erase the conditions that made them consequential."
            },
            {
              "t": "The state is assumed to have fallen inevitably or been destroyed largely by one solitary traitor. The claim comes first. The preferred narrative sets the order of review in context.",
              "v": "danger",
              "fb": "The two extremes remove the layered causal work that historical evidence permits."
            }
          ]
        }
      ]
    },
    "fa_tacitus": {
      "sci": "Tacitus (c.56–120 AD)",
      "topic": "The corruption of a republic",
      "lede": "Political endings became causal questions in Tacitus's treatment of the corruption of a republic.",
      "no": 3,
      "profile": "Today’s archival memorandum turns to Tacitus as a guide to the corruption of a republic. Tacitus examined imperial Rome through senatorial records, speeches, character sketches, and a severe concern with how power reshaped public conduct. Histories of collapse are especially vulnerable to hindsight because the ending makes every earlier warning look inevitable. Tacitus’s work offers a way to restore contingency without pretending that choices occurred outside institutions and long pressures.\n\nThe historian’s task here is to read official acts alongside fear, ambition, rumor, and the incentives created by concentrated authority. Documents must be dated, authors situated, silences noticed, and retrospective explanations compared with what participants could have known. A source may report an action accurately while misrepresenting motive, or preserve motive while misunderstanding consequence.\n\nCausal history therefore works at several scales. Fiscal strain, geography, faction, military capacity, and political culture can narrow the field of action; a vote, order, refusal, or delay can still select among the paths that remained. Neither a heroic villain nor a faceless structure should be allowed to absorb every cause.\n\nThe methodological conclusion is moral language can sharpen political analysis, but it must remain anchored to chronology and documented action. Historical explanation becomes persuasive when chronology preserves both constraint and choice. Counterfactual questions are useful when they identify a real alternative visible in the contemporary record. Later legend should be treated as evidence about memory before it is treated as evidence about the event. Counterfactual questions are useful when they identify a real alternative visible in the contemporary record.",
      "frame": "Marks a date in the margin. \"At The City Walls & the River Gate, one misplaced day changes the cause. Explain the corruption of a republic before reading the vote.\"",
      "q": [
        {
          "q": "Which historical interpretation best matches Tacitus’s treatment of the corruption of a republic?",
          "o": [
            {
              "t": "Tacitus made the corruption of a republic answer to chronology, source criticism, and historically available choices.",
              "v": "expert",
              "fb": "Correct: historical explanation must identify both the surviving evidence and the scale of each cause."
            },
            {
              "t": "Tacitus treated the corruption of a republic as a collection of vivid anecdotes after the ending was already known in context.",
              "v": "partial",
              "fb": "Anecdotes become evidence only after their date, source, and relation to events are assessed."
            },
            {
              "t": "Tacitus let later legend settle the corruption of a republic even when contemporary documents preserved alternatives in practice.",
              "v": "wrong",
              "fb": "The final outcome does not make every previous alternative impossible."
            },
            {
              "t": "Tacitus used the corruption of a republic to make one villain's intention supply every missing political cause in context.",
              "v": "danger",
              "fb": "One actor may matter greatly without explaining institutions, constraints, and other decisions."
            }
          ]
        },
        {
          "q": "How would a historian apply the method described here to a disputed decision?",
          "o": [
            {
              "t": "Reconstruct the dated record, identify each source's position, and recover alternatives visible at the time. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Yes: contingency appears when the archive reveals choices that were genuinely available before the outcome."
            },
            {
              "t": "Begin with the later national memory, then retain mainly documents that support its preferred moral. The comparison is narrowed to the favored documents.",
              "v": "partial",
              "fb": "Later memory is evidence about commemoration, not an automatic guide to the original decision."
            },
            {
              "t": "Treat every official minute as transparent proof of motive because a clerk recorded it contemporaneously. The account leans heavily on prior reputation.",
              "v": "wrong",
              "fb": "Contemporary records can still omit, sanitize, or strategically frame motive."
            },
            {
              "t": "Choose the betrayal narrative first, and interpret every archival uncertainty as deliberate concealment. The conclusion shapes which records receive attention.",
              "v": "danger",
              "fb": "Uncertainty can arise from ordinary archival limits and does not establish a hidden betrayal."
            }
          ]
        },
        {
          "q": "Which causal claim is most consistent with the corruption of a republic?",
          "o": [
            {
              "t": "Historical explanation should assign distinct roles to long pressures, institutions, and particular choices. It remains checkable across the available record in the case file.",
              "v": "expert",
              "fb": "Exactly: good causal history can combine durable constraints with a consequential decision."
            },
            {
              "t": "Structural weakness should explain the outcome even when officials documented another available course. The remaining uncertainty is assigned to ordinary variation in context.",
              "v": "partial",
              "fb": "Structures narrow options, but a documented alternative can preserve the importance of agency."
            },
            {
              "t": "One immediate order should explain the whole history and make earlier institutions irrelevant. The method does not support it under the documented sequence in the case file in practice.",
              "v": "wrong",
              "fb": "Immediate decisions do not erase the conditions that made them consequential."
            },
            {
              "t": "The state is assumed to have fallen inevitably or been destroyed largely by one solitary traitor. The claim comes first. The preferred narrative sets the order of review in context.",
              "v": "danger",
              "fb": "The two extremes remove the layered causal work that historical evidence permits."
            }
          ]
        }
      ]
    },
    "fa_valla": {
      "sci": "Lorenzo Valla (1407–1457)",
      "topic": "Philology & exposing the Donation of Constantine",
      "lede": "Lorenzo Valla used philology and exposing the donation of constantine to show how archives preserve choices that hindsight tries to erase.",
      "no": 4,
      "profile": "Today’s archival memorandum turns to Lorenzo Valla as a guide to philology and exposing the donation of constantine. Lorenzo Valla exposed the Donation of Constantine as a later forgery by analyzing vocabulary, historical setting, and institutional anachronisms. Histories of collapse are especially vulnerable to hindsight because the ending makes every earlier warning look inevitable. Valla’s work offers a way to restore contingency without pretending that choices occurred outside institutions and long pressures.\n\nThe historian’s task here is to compare a document's language and assumptions with securely dated usage and the world it claims to describe. Documents must be dated, authors situated, silences noticed, and retrospective explanations compared with what participants could have known. A source may report an action accurately while misrepresenting motive, or preserve motive while misunderstanding consequence.\n\nCausal history therefore works at several scales. Fiscal strain, geography, faction, military capacity, and political culture can narrow the field of action; a vote, order, refusal, or delay can still select among the paths that remained. Neither a heroic villain nor a faceless structure should be allowed to absorb every cause.\n\nThe methodological conclusion is words carry dates and institutions carry histories, allowing internal evidence to challenge inherited authority. Historical explanation becomes persuasive when chronology preserves both constraint and choice. Counterfactual questions are useful when they identify a real alternative visible in the contemporary record. Later legend should be treated as evidence about memory before it is treated as evidence about the event. Counterfactual questions are useful when they identify a real alternative visible in the contemporary record.",
      "frame": "Rests a hand on the minute-book. \"The ending has made everyone wise. Use philology and exposing the donation of constantine to tell me what the council could actually know.\"",
      "q": [
        {
          "q": "Which historical interpretation best matches Lorenzo Valla’s treatment of philology and exposing the donation of constantine?",
          "o": [
            {
              "t": "Lorenzo Valla made philology and exposing the donation of constantine answer to chronology, source criticism, and historically available choices.",
              "v": "expert",
              "fb": "Correct: historical explanation must identify both the surviving evidence and the scale of each cause."
            },
            {
              "t": "Lorenzo Valla treated philology and exposing the donation of constantine as a collection of vivid anecdotes after the ending was already known.",
              "v": "partial",
              "fb": "Anecdotes become evidence only after their date, source, and relation to events are assessed."
            },
            {
              "t": "Lorenzo Valla let later legend settle philology and exposing the donation of constantine even when contemporary documents preserved alternatives.",
              "v": "wrong",
              "fb": "The final outcome does not make every previous alternative impossible."
            },
            {
              "t": "Lorenzo Valla used philology and exposing the donation of constantine to make one villain's intention supply every missing political cause.",
              "v": "danger",
              "fb": "One actor may matter greatly without explaining institutions, constraints, and other decisions."
            }
          ]
        },
        {
          "q": "How would a historian apply the method described here to a disputed decision?",
          "o": [
            {
              "t": "Reconstruct the dated record, identify each source's position, and recover alternatives visible at the time. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Yes: contingency appears when the archive reveals choices that were genuinely available before the outcome."
            },
            {
              "t": "Begin with the later national memory, then retain mainly documents that support its preferred moral. The comparison is narrowed to the favored documents.",
              "v": "partial",
              "fb": "Later memory is evidence about commemoration, not an automatic guide to the original decision."
            },
            {
              "t": "Treat every official minute as transparent proof of motive because a clerk recorded it contemporaneously. The account leans heavily on prior reputation.",
              "v": "wrong",
              "fb": "Contemporary records can still omit, sanitize, or strategically frame motive."
            },
            {
              "t": "Choose the betrayal narrative first, and interpret every archival uncertainty as deliberate concealment. The conclusion shapes which records receive attention.",
              "v": "danger",
              "fb": "Uncertainty can arise from ordinary archival limits and does not establish a hidden betrayal."
            }
          ]
        },
        {
          "q": "Which causal claim is most consistent with philology and exposing the donation of constantine?",
          "o": [
            {
              "t": "Historical explanation should assign distinct roles to long pressures, institutions, and particular choices. It remains checkable across the available record in the case file.",
              "v": "expert",
              "fb": "Exactly: good causal history can combine durable constraints with a consequential decision."
            },
            {
              "t": "Structural weakness should explain the outcome even when officials documented another available course. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Structures narrow options, but a documented alternative can preserve the importance of agency."
            },
            {
              "t": "One immediate order should explain the whole history and make earlier institutions irrelevant. The method does not support it under the documented sequence in the case file.",
              "v": "wrong",
              "fb": "Immediate decisions do not erase the conditions that made them consequential."
            },
            {
              "t": "The state is assumed to have fallen inevitably or been destroyed largely by one solitary traitor. The claim comes first. The preferred narrative sets the order of review.",
              "v": "danger",
              "fb": "The two extremes remove the layered causal work that historical evidence permits."
            }
          ]
        }
      ]
    },
    "fa_michelet": {
      "sci": "Jules Michelet (1798–1874)",
      "topic": "The archive as living narrative",
      "lede": "Jules Michelet read the archive as living narrative against chronology, motive, structure, and the alternatives once still open.",
      "no": 5,
      "profile": "Today’s archival memorandum turns to Jules Michelet as a guide to the archive as living narrative. Jules Michelet immersed himself in French archives and wrote a vivid national history that sought to recover the lives and energies of the people. Histories of collapse are especially vulnerable to hindsight because the ending makes every earlier warning look inevitable. Michelet’s work offers a way to restore contingency without pretending that choices occurred outside institutions and long pressures.\n\nThe historian’s task here is to combine close archival reading with narrative imagination while marking where documents end and interpretation begins. Documents must be dated, authors situated, silences noticed, and retrospective explanations compared with what participants could have known. A source may report an action accurately while misrepresenting motive, or preserve motive while misunderstanding consequence.\n\nCausal history therefore works at several scales. Fiscal strain, geography, faction, military capacity, and political culture can narrow the field of action; a vote, order, refusal, or delay can still select among the paths that remained. Neither a heroic villain nor a faceless structure should be allowed to absorb every cause.\n\nThe methodological conclusion is historical writing can be alive and humane without disguising reconstruction as direct observation. Historical explanation becomes persuasive when chronology preserves both constraint and choice. Counterfactual questions are useful when they identify a real alternative visible in the contemporary record. Later legend should be treated as evidence about memory before it is treated as evidence about the event. Counterfactual questions are useful when they identify a real alternative visible in the contemporary record.",
      "frame": "Ties the archive ribbon again. \"Legends have already chosen their villain. I need your account of the archive as living narrative first.\"",
      "q": [
        {
          "q": "Which historical interpretation best matches Jules Michelet’s treatment of the archive as living narrative?",
          "o": [
            {
              "t": "Jules Michelet made the archive as living narrative answer to chronology, source criticism, and historically available choices.",
              "v": "expert",
              "fb": "Correct: historical explanation must identify both the surviving evidence and the scale of each cause."
            },
            {
              "t": "Jules Michelet treated the archive as living narrative as a collection of vivid anecdotes after the ending was already known.",
              "v": "partial",
              "fb": "Anecdotes become evidence only after their date, source, and relation to events are assessed."
            },
            {
              "t": "Jules Michelet let later legend settle the archive as living narrative even when contemporary documents preserved alternatives.",
              "v": "wrong",
              "fb": "The final outcome does not make every previous alternative impossible."
            },
            {
              "t": "Jules Michelet used the archive as living narrative to make one villain's intention supply every missing political cause.",
              "v": "danger",
              "fb": "One actor may matter greatly without explaining institutions, constraints, and other decisions."
            }
          ]
        },
        {
          "q": "How would a historian apply the method described here to a disputed decision?",
          "o": [
            {
              "t": "Reconstruct the dated record, identify each source's position, and recover alternatives visible at the time. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Yes: contingency appears when the archive reveals choices that were genuinely available before the outcome."
            },
            {
              "t": "Begin with the later national memory, then retain mainly documents that support its preferred moral. The comparison is narrowed to the favored documents.",
              "v": "partial",
              "fb": "Later memory is evidence about commemoration, not an automatic guide to the original decision."
            },
            {
              "t": "Treat every official minute as transparent proof of motive because a clerk recorded it contemporaneously. The account leans heavily on prior reputation.",
              "v": "wrong",
              "fb": "Contemporary records can still omit, sanitize, or strategically frame motive."
            },
            {
              "t": "Choose the betrayal narrative first, and interpret every archival uncertainty as deliberate concealment. The conclusion shapes which records receive attention.",
              "v": "danger",
              "fb": "Uncertainty can arise from ordinary archival limits and does not establish a hidden betrayal."
            }
          ]
        },
        {
          "q": "Which causal claim is most consistent with the archive as living narrative?",
          "o": [
            {
              "t": "Historical explanation should assign distinct roles to long pressures, institutions, and particular choices. It remains checkable across the available record in the case file.",
              "v": "expert",
              "fb": "Exactly: good causal history can combine durable constraints with a consequential decision."
            },
            {
              "t": "Structural weakness should explain the outcome even when officials documented another available course. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Structures narrow options, but a documented alternative can preserve the importance of agency."
            },
            {
              "t": "One immediate order should explain the whole history and make earlier institutions irrelevant. The method does not support it under the documented sequence in the case file.",
              "v": "wrong",
              "fb": "Immediate decisions do not erase the conditions that made them consequential."
            },
            {
              "t": "The state is assumed to have fallen inevitably or been destroyed largely by one solitary traitor. The claim comes first. The preferred narrative sets the order of review.",
              "v": "danger",
              "fb": "The two extremes remove the layered causal work that historical evidence permits."
            }
          ]
        }
      ]
    },
    "fa_bloch": {
      "sci": "Marc Bloch (1886–1944)",
      "topic": "The historian's craft & source criticism",
      "lede": "Political endings became causal questions in Marc Bloch's treatment of the historian’s craft and source criticism.",
      "no": 6,
      "profile": "Today’s archival memorandum turns to Marc Bloch as a guide to the historian’s craft and source criticism. Marc Bloch compared societies across time, studied belief and material life, and wrote The Historian's Craft while reflecting on evidence and explanation. Histories of collapse are especially vulnerable to hindsight because the ending makes every earlier warning look inevitable. Bloch’s work offers a way to restore contingency without pretending that choices occurred outside institutions and long pressures.\n\nThe historian’s task here is to interrogate sources as traces created by human activity, compare different kinds of evidence, and ask questions the source maker never intended. Documents must be dated, authors situated, silences noticed, and retrospective explanations compared with what participants could have known. A source may report an action accurately while misrepresenting motive, or preserve motive while misunderstanding consequence.\n\nCausal history therefore works at several scales. Fiscal strain, geography, faction, military capacity, and political culture can narrow the field of action; a vote, order, refusal, or delay can still select among the paths that remained. Neither a heroic villain nor a faceless structure should be allowed to absorb every cause.\n\nThe methodological conclusion is a source can reveal more than its author meant, provided the historian understands how and why it was produced. Historical explanation becomes persuasive when chronology preserves both constraint and choice. Counterfactual questions are useful when they identify a real alternative visible in the contemporary record. Later legend should be treated as evidence about memory before it is treated as evidence about the event.",
      "frame": "Marks a date in the margin. \"At The Council Chamber, one misplaced day changes the cause. Explain the historian’s craft and source criticism before reading the vote.\"",
      "q": [
        {
          "q": "Which historical interpretation best matches Marc Bloch’s treatment of the historian’s craft and source criticism?",
          "o": [
            {
              "t": "Marc Bloch made the historian’s craft and source criticism answer to chronology, source criticism, and historically available choices.",
              "v": "expert",
              "fb": "Correct: historical explanation must identify both the surviving evidence and the scale of each cause."
            },
            {
              "t": "Marc Bloch treated the historian’s craft and source criticism as a collection of vivid anecdotes after the ending was already known.",
              "v": "partial",
              "fb": "Anecdotes become evidence only after their date, source, and relation to events are assessed."
            },
            {
              "t": "Marc Bloch let later legend settle the historian’s craft and source criticism even when contemporary documents preserved alternatives.",
              "v": "wrong",
              "fb": "The final outcome does not make every previous alternative impossible."
            },
            {
              "t": "Marc Bloch used the historian’s craft and source criticism to make one villain's intention supply every missing political cause.",
              "v": "danger",
              "fb": "One actor may matter greatly without explaining institutions, constraints, and other decisions."
            }
          ]
        },
        {
          "q": "How would a historian apply the method described here to a disputed decision?",
          "o": [
            {
              "t": "Reconstruct the dated record, identify each source's position, and recover alternatives visible at the time. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Yes: contingency appears when the archive reveals choices that were genuinely available before the outcome."
            },
            {
              "t": "Begin with the later national memory, then retain mainly documents that support its preferred moral. The comparison is narrowed to the favored documents.",
              "v": "partial",
              "fb": "Later memory is evidence about commemoration, not an automatic guide to the original decision."
            },
            {
              "t": "Treat every official minute as transparent proof of motive because a clerk recorded it contemporaneously. The account leans heavily on prior reputation.",
              "v": "wrong",
              "fb": "Contemporary records can still omit, sanitize, or strategically frame motive."
            },
            {
              "t": "Choose the betrayal narrative first, and interpret every archival uncertainty as deliberate concealment. The conclusion shapes which records receive attention.",
              "v": "danger",
              "fb": "Uncertainty can arise from ordinary archival limits and does not establish a hidden betrayal."
            }
          ]
        },
        {
          "q": "Which causal claim is most consistent with the historian’s craft and source criticism?",
          "o": [
            {
              "t": "Historical explanation should assign distinct roles to long pressures, institutions, and particular choices. It remains checkable across the available record in the case file.",
              "v": "expert",
              "fb": "Exactly: good causal history can combine durable constraints with a consequential decision."
            },
            {
              "t": "Structural weakness should explain the outcome even when officials documented another available course. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Structures narrow options, but a documented alternative can preserve the importance of agency."
            },
            {
              "t": "One immediate order should explain the whole history and make earlier institutions irrelevant. The method does not support it under the documented sequence in the case file.",
              "v": "wrong",
              "fb": "Immediate decisions do not erase the conditions that made them consequential."
            },
            {
              "t": "The state is assumed to have fallen inevitably or been destroyed largely by one solitary traitor. The claim comes first. The preferred narrative sets the order of review.",
              "v": "danger",
              "fb": "The two extremes remove the layered causal work that historical evidence permits."
            }
          ]
        }
      ]
    },
    "fa_braudel": {
      "sci": "Fernand Braudel (1902–1985)",
      "topic": "Structures & the long duration",
      "lede": "Fernand Braudel used structures and the long duration to show how archives preserve choices that hindsight tries to erase.",
      "no": 7,
      "profile": "Today’s archival memorandum turns to Fernand Braudel as a guide to structures and the long duration. Fernand Braudel distinguished short events from slower social structures and the very long rhythms of geography and exchange. Histories of collapse are especially vulnerable to hindsight because the ending makes every earlier warning look inevitable. Braudel’s work offers a way to restore contingency without pretending that choices occurred outside institutions and long pressures.\n\nThe historian’s task here is to analyze several temporal scales at once so immediate decisions are neither isolated from structures nor dissolved into them. Documents must be dated, authors situated, silences noticed, and retrospective explanations compared with what participants could have known. A source may report an action accurately while misrepresenting motive, or preserve motive while misunderstanding consequence.\n\nCausal history therefore works at several scales. Fiscal strain, geography, faction, military capacity, and political culture can narrow the field of action; a vote, order, refusal, or delay can still select among the paths that remained. Neither a heroic villain nor a faceless structure should be allowed to absorb every cause.\n\nThe methodological conclusion is long-term constraints shape choices without making the choices automatic or their outcomes inevitable. Historical explanation becomes persuasive when chronology preserves both constraint and choice. Counterfactual questions are useful when they identify a real alternative visible in the contemporary record. Later legend should be treated as evidence about memory before it is treated as evidence about the event. Counterfactual questions are useful when they identify a real alternative visible in the contemporary record.",
      "frame": "Rests a hand on the minute-book. \"The ending has made everyone wise. Use structures and the long duration to tell me what the council could actually know.\"",
      "q": [
        {
          "q": "Which historical interpretation best matches Fernand Braudel’s treatment of structures and the long duration?",
          "o": [
            {
              "t": "Fernand Braudel made structures and the long duration answer to chronology, source criticism, and historically available choices.",
              "v": "expert",
              "fb": "Correct: historical explanation must identify both the surviving evidence and the scale of each cause."
            },
            {
              "t": "Fernand Braudel treated structures and the long duration as a collection of vivid anecdotes after the ending was already known.",
              "v": "partial",
              "fb": "Anecdotes become evidence only after their date, source, and relation to events are assessed."
            },
            {
              "t": "Fernand Braudel let later legend settle structures and the long duration even when contemporary documents preserved alternatives.",
              "v": "wrong",
              "fb": "The final outcome does not make every previous alternative impossible."
            },
            {
              "t": "Fernand Braudel used structures and the long duration to make one villain's intention supply every missing political cause.",
              "v": "danger",
              "fb": "One actor may matter greatly without explaining institutions, constraints, and other decisions."
            }
          ]
        },
        {
          "q": "How would a historian apply the method described here to a disputed decision?",
          "o": [
            {
              "t": "Reconstruct the dated record, identify each source's position, and recover alternatives visible at the time. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Yes: contingency appears when the archive reveals choices that were genuinely available before the outcome."
            },
            {
              "t": "Begin with the later national memory, then retain mainly documents that support its preferred moral. The comparison is narrowed to the favored documents.",
              "v": "partial",
              "fb": "Later memory is evidence about commemoration, not an automatic guide to the original decision."
            },
            {
              "t": "Treat every official minute as transparent proof of motive because a clerk recorded it contemporaneously. The account leans heavily on prior reputation.",
              "v": "wrong",
              "fb": "Contemporary records can still omit, sanitize, or strategically frame motive."
            },
            {
              "t": "Choose the betrayal narrative first, and interpret every archival uncertainty as deliberate concealment. The conclusion shapes which records receive attention.",
              "v": "danger",
              "fb": "Uncertainty can arise from ordinary archival limits and does not establish a hidden betrayal."
            }
          ]
        },
        {
          "q": "Which causal claim is most consistent with structures and the long duration?",
          "o": [
            {
              "t": "Historical explanation should assign distinct roles to long pressures, institutions, and particular choices. It remains checkable across the available record in the case file.",
              "v": "expert",
              "fb": "Exactly: good causal history can combine durable constraints with a consequential decision."
            },
            {
              "t": "Structural weakness should explain the outcome even when officials documented another available course. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Structures narrow options, but a documented alternative can preserve the importance of agency."
            },
            {
              "t": "One immediate order should explain the whole history and make earlier institutions irrelevant. The method does not support it under the documented sequence in the case file.",
              "v": "wrong",
              "fb": "Immediate decisions do not erase the conditions that made them consequential."
            },
            {
              "t": "The state is assumed to have fallen inevitably or been destroyed largely by one solitary traitor. The claim comes first. The preferred narrative sets the order of review.",
              "v": "danger",
              "fb": "The two extremes remove the layered causal work that historical evidence permits."
            }
          ]
        }
      ]
    },
    "fa_davis": {
      "sci": "Natalie Zemon Davis (1928–2023)",
      "topic": "Microhistory & archival reconstruction",
      "lede": "Natalie Zemon Davis read microhistory and archival reconstruction against chronology, motive, structure, and the alternatives once still open.",
      "no": 8,
      "profile": "Today’s archival memorandum turns to Natalie Zemon Davis as a guide to microhistory and archival reconstruction. Natalie Zemon Davis reconstructed lives such as Martin Guerre's through legal records, social context, and carefully signaled historical possibility. Histories of collapse are especially vulnerable to hindsight because the ending makes every earlier warning look inevitable. Davis’s work offers a way to restore contingency without pretending that choices occurred outside institutions and long pressures.\n\nThe historian’s task here is to combine fragmentary archives with contextual knowledge while distinguishing documented fact from plausible reconstruction. Documents must be dated, authors situated, silences noticed, and retrospective explanations compared with what participants could have known. A source may report an action accurately while misrepresenting motive, or preserve motive while misunderstanding consequence.\n\nCausal history therefore works at several scales. Fiscal strain, geography, faction, military capacity, and political culture can narrow the field of action; a vote, order, refusal, or delay can still select among the paths that remained. Neither a heroic villain nor a faceless structure should be allowed to absorb every cause.\n\nThe methodological conclusion is imagination aids historical understanding only when the reader can see where certainty stops. Historical explanation becomes persuasive when chronology preserves both constraint and choice. Counterfactual questions are useful when they identify a real alternative visible in the contemporary record. Later legend should be treated as evidence about memory before it is treated as evidence about the event. Counterfactual questions are useful when they identify a real alternative visible in the contemporary record.",
      "frame": "Ties the archive ribbon again. \"Legends have already chosen their villain. I need your account of microhistory and archival reconstruction first.\"",
      "q": [
        {
          "q": "Which historical interpretation best matches Natalie Zemon Davis’s treatment of microhistory and archival reconstruction?",
          "o": [
            {
              "t": "Natalie Zemon Davis made microhistory and archival reconstruction answer to chronology, source criticism, and historically available choices.",
              "v": "expert",
              "fb": "Correct: historical explanation must identify both the surviving evidence and the scale of each cause."
            },
            {
              "t": "Natalie Zemon Davis treated microhistory and archival reconstruction as a collection of vivid anecdotes after the ending was already known.",
              "v": "partial",
              "fb": "Anecdotes become evidence only after their date, source, and relation to events are assessed."
            },
            {
              "t": "Natalie Zemon Davis let later legend settle microhistory and archival reconstruction even when contemporary documents preserved alternatives.",
              "v": "wrong",
              "fb": "The final outcome does not make every previous alternative impossible."
            },
            {
              "t": "Natalie Zemon Davis used microhistory and archival reconstruction to make one villain's intention supply every missing political cause.",
              "v": "danger",
              "fb": "One actor may matter greatly without explaining institutions, constraints, and other decisions."
            }
          ]
        },
        {
          "q": "How would a historian apply the method described here to a disputed decision?",
          "o": [
            {
              "t": "Reconstruct the dated record, identify each source's position, and recover alternatives visible at the time. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Yes: contingency appears when the archive reveals choices that were genuinely available before the outcome."
            },
            {
              "t": "Begin with the later national memory, then retain mainly documents that support its preferred moral. The comparison is narrowed to the favored documents.",
              "v": "partial",
              "fb": "Later memory is evidence about commemoration, not an automatic guide to the original decision."
            },
            {
              "t": "Treat every official minute as transparent proof of motive because a clerk recorded it contemporaneously. The account leans heavily on prior reputation.",
              "v": "wrong",
              "fb": "Contemporary records can still omit, sanitize, or strategically frame motive."
            },
            {
              "t": "Choose the betrayal narrative first, and interpret every archival uncertainty as deliberate concealment. The conclusion shapes which records receive attention.",
              "v": "danger",
              "fb": "Uncertainty can arise from ordinary archival limits and does not establish a hidden betrayal."
            }
          ]
        },
        {
          "q": "Which causal claim is most consistent with microhistory and archival reconstruction?",
          "o": [
            {
              "t": "Historical explanation should assign distinct roles to long pressures, institutions, and particular choices. It remains checkable across the available record in the case file.",
              "v": "expert",
              "fb": "Exactly: good causal history can combine durable constraints with a consequential decision."
            },
            {
              "t": "Structural weakness should explain the outcome even when officials documented another available course. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Structures narrow options, but a documented alternative can preserve the importance of agency."
            },
            {
              "t": "One immediate order should explain the whole history and make earlier institutions irrelevant. The method does not support it under the documented sequence in the case file.",
              "v": "wrong",
              "fb": "Immediate decisions do not erase the conditions that made them consequential."
            },
            {
              "t": "The state is assumed to have fallen inevitably or been destroyed largely by one solitary traitor. The claim comes first. The preferred narrative sets the order of review.",
              "v": "danger",
              "fb": "The two extremes remove the layered causal work that historical evidence permits."
            }
          ]
        }
      ]
    },
    "fa_collingwood": {
      "sci": "R. G. Collingwood (1889–1943)",
      "topic": "Historical evidence & re-enactment",
      "lede": "Political endings became causal questions in R. G. Collingwood's treatment of historical evidence and re-enactment.",
      "no": 9,
      "profile": "Today’s archival memorandum turns to R. G. Collingwood as a guide to historical evidence and re-enactment. R. G. Collingwood described history as re-enacting past thought by asking what question an action or statement was meant to answer. Histories of collapse are especially vulnerable to hindsight because the ending makes every earlier warning look inevitable. Collingwood’s work offers a way to restore contingency without pretending that choices occurred outside institutions and long pressures.\n\nThe historian’s task here is to reconstruct an actor's problem from evidence and context rather than treating words as timeless propositions. Documents must be dated, authors situated, silences noticed, and retrospective explanations compared with what participants could have known. A source may report an action accurately while misrepresenting motive, or preserve motive while misunderstanding consequence.\n\nCausal history therefore works at several scales. Fiscal strain, geography, faction, military capacity, and political culture can narrow the field of action; a vote, order, refusal, or delay can still select among the paths that remained. Neither a heroic villain nor a faceless structure should be allowed to absorb every cause.\n\nThe methodological conclusion is understanding intention requires disciplined inference, not mind-reading or sympathy detached from documents. Historical explanation becomes persuasive when chronology preserves both constraint and choice. Counterfactual questions are useful when they identify a real alternative visible in the contemporary record. Later legend should be treated as evidence about memory before it is treated as evidence about the event. Counterfactual questions are useful when they identify a real alternative visible in the contemporary record.",
      "frame": "Marks a date in the margin. \"At The State Archive & Chancery, one misplaced day changes the cause. Explain historical evidence and re-enactment before reading the vote.\"",
      "q": [
        {
          "q": "Which historical interpretation best matches R. G. Collingwood’s treatment of historical evidence and re-enactment?",
          "o": [
            {
              "t": "R. G. Collingwood made historical evidence and re-enactment answer to chronology, source criticism, and historically available choices.",
              "v": "expert",
              "fb": "Correct: historical explanation must identify both the surviving evidence and the scale of each cause."
            },
            {
              "t": "R. G. Collingwood treated historical evidence and re-enactment as a collection of vivid anecdotes after the ending was already known.",
              "v": "partial",
              "fb": "Anecdotes become evidence only after their date, source, and relation to events are assessed."
            },
            {
              "t": "R. G. Collingwood let later legend settle historical evidence and re-enactment even when contemporary documents preserved alternatives.",
              "v": "wrong",
              "fb": "The final outcome does not make every previous alternative impossible."
            },
            {
              "t": "R. G. Collingwood used historical evidence and re-enactment to make one villain's intention supply every missing political cause.",
              "v": "danger",
              "fb": "One actor may matter greatly without explaining institutions, constraints, and other decisions."
            }
          ]
        },
        {
          "q": "How would a historian apply the method described here to a disputed decision?",
          "o": [
            {
              "t": "Reconstruct the dated record, identify each source's position, and recover alternatives visible at the time. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Yes: contingency appears when the archive reveals choices that were genuinely available before the outcome."
            },
            {
              "t": "Begin with the later national memory, then retain mainly documents that support its preferred moral. The comparison is narrowed to the favored documents.",
              "v": "partial",
              "fb": "Later memory is evidence about commemoration, not an automatic guide to the original decision."
            },
            {
              "t": "Treat every official minute as transparent proof of motive because a clerk recorded it contemporaneously. The account leans heavily on prior reputation.",
              "v": "wrong",
              "fb": "Contemporary records can still omit, sanitize, or strategically frame motive."
            },
            {
              "t": "Choose the betrayal narrative first, and interpret every archival uncertainty as deliberate concealment. The conclusion shapes which records receive attention.",
              "v": "danger",
              "fb": "Uncertainty can arise from ordinary archival limits and does not establish a hidden betrayal."
            }
          ]
        },
        {
          "q": "Which causal claim is most consistent with historical evidence and re-enactment?",
          "o": [
            {
              "t": "Historical explanation should assign distinct roles to long pressures, institutions, and particular choices. It remains checkable across the available record in the case file.",
              "v": "expert",
              "fb": "Exactly: good causal history can combine durable constraints with a consequential decision."
            },
            {
              "t": "Structural weakness should explain the outcome even when officials documented another available course. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Structures narrow options, but a documented alternative can preserve the importance of agency."
            },
            {
              "t": "One immediate order should explain the whole history and make earlier institutions irrelevant. The method does not support it under the documented sequence in the case file.",
              "v": "wrong",
              "fb": "Immediate decisions do not erase the conditions that made them consequential."
            },
            {
              "t": "The state is assumed to have fallen inevitably or been destroyed largely by one solitary traitor. The claim comes first. The preferred narrative sets the order of review.",
              "v": "danger",
              "fb": "The two extremes remove the layered causal work that historical evidence permits."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "fa_chancellor": {
      "fa_walls": "Chancery Clerk Orso meets you among stone, parchment, and extinguished civic emblems at the city walls & the river gate. \"Keeps the council minute-books; can find the vote that stood the mercenaries down. The republic left a record before later writers gave it a destiny.\"",
      "fa_chamber": "Chancery Clerk Orso meets you among stone, parchment, and extinguished civic emblems at the council chamber. \"Keeps the council minute-books; can find the vote that stood the mercenaries down. The republic left a record before later writers gave it a destiny.\"",
      "fa_archive": "Chancery Clerk Orso meets you among stone, parchment, and extinguished civic emblems at the state archive & chancery. \"Keeps the council minute-books; can find the vote that stood the mercenaries down. The republic left a record before later writers gave it a destiny.\""
    },
    "fa_warden": {
      "fa_walls": "Gate Warden Pia meets you among stone, parchment, and extinguished civic emblems at the city walls & the river gate. \"Kept the gate watch; knows on whose written order the postern was left unbarred. The republic left a record before later writers gave it a destiny.\"",
      "fa_chamber": "Gate Warden Pia meets you among stone, parchment, and extinguished civic emblems at the council chamber. \"Kept the gate watch; knows on whose written order the postern was left unbarred. The republic left a record before later writers gave it a destiny.\"",
      "fa_archive": "Gate Warden Pia meets you among stone, parchment, and extinguished civic emblems at the state archive & chancery. \"Kept the gate watch; knows on whose written order the postern was left unbarred. The republic left a record before later writers gave it a destiny.\""
    },
    "fa_notary": {
      "fa_walls": "Notary Ferro meets you among stone, parchment, and extinguished civic emblems at the city walls & the river gate. \"Recorded the debates verbatim; heard which faction forced the fatal motion through. The republic left a record before later writers gave it a destiny.\"",
      "fa_chamber": "Notary Ferro meets you among stone, parchment, and extinguished civic emblems at the council chamber. \"Recorded the debates verbatim; heard which faction forced the fatal motion through. The republic left a record before later writers gave it a destiny.\"",
      "fa_archive": "Notary Ferro meets you among stone, parchment, and extinguished civic emblems at the state archive & chancery. \"Recorded the debates verbatim; heard which faction forced the fatal motion through. The republic left a record before later writers gave it a destiny.\""
    }
  },
  "story": [
    "<b>The Last Council of Vellano</b> opens inside the Vellano fall inquiry, where the public explanation has hardened faster than the evidence.",
    "<b>Chancery Clerk Orso</b>, <b>Gate Warden Pia</b>, and <b>Notary Ferro</b> hold different parts of the record, and every conversation begins with one real figure whose work teaches you how to read it.",
    "The case keeps pulling investigators toward <b>A single traitor sold the city from within</b> or <b>A dying republic — its fall was inevitable</b>. Both are plausible enough to survive a headline; neither should survive the full dossier untested.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide the <b>WHAT</b> for yourself."
  ],
  "endings": {
    "overclaimWhat": "fa_betrayal",
    "dismissalWhat": "fa_inevit",
    "win": {
      "expertTitle": "The Vote Returns to the Record",
      "expert": [
        "You name <b>Provveditore Bassi — the council's war magistrate</b>, place the decisive documentary chain in <b>The State Archive & Chancery</b>, and establish <b>A documented council vote that stood down the garrison and left the gate unbarred</b>. Not a single traitor sold the city from within. Not a dying republic — its fall was inevitable.",
        "Long weakness made Vellano vulnerable, but the minute-book and written order preserve a contingent choice: the garrison was stood down and the postern left unsecured. Structure explains the danger; the recorded decision explains how it became defeat."
      ],
      "soundTitle": "Contingency Recovered",
      "sound": [
        "Your finding correctly combines <b>Provveditore Bassi — the council's war magistrate</b>, <b>The State Archive & Chancery</b>, and <b>A documented council vote that stood down the garrison and left the gate unbarred</b>. The sequence of motion, vote, and gate order is historically coherent.",
        "The factional pressure could be developed further, yet your account refuses both personal myth and fatalism. The republic’s fall is again an event with actors and alternatives."
      ],
      "namedTitle": "The Fatal Motion",
      "named": [
        "You reach the correct historical answer: <b>Provveditore Bassi — the council's war magistrate</b> at <b>The State Archive & Chancery</b>, responsible for <b>A documented council vote that stood down the garrison and left the gate unbarred</b>.",
        "The causal explanation remains spare, but it identifies the document around which a defensible reconstruction can be built."
      ]
    },
    "overclaim": {
      "title": "A Traitor Too Convenient",
      "body": [
        "You choose <b>A single traitor sold the city from within</b>, compressing institutions, votes, and military orders into a single melodramatic betrayal.",
        "The legend may satisfy the anniversary crowd, but it cannot explain the recorded motion or its supporters. By overstating personal treason, you obscure the decision the archive can prove."
      ]
    },
    "dismissal": {
      "title": "Inevitability Erases the Vote",
      "body": [
        "You accept <b>A dying republic — its fall was inevitable</b>, treating the council’s alternatives as theater because the republic was already under severe pressure.",
        "That reasoning turns hindsight into cause. It absolves the magistrate whose motion changed the gate’s condition and teaches future officials that documented choices disappear inside structural decline."
      ]
    },
    "wrongNames": {
      "title": "The Decision, Misassigned",
      "body": [
        "You recover <b>A documented council vote that stood down the garrison and left the gate unbarred</b>, but give the decisive agency to the wrong officeholder or place the proof outside the chancery sequence. The surviving order points instead to"
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A city gate, council seal, and unbarred postern\"><path d=\"M42 112 L42 42 L176 42 L176 112\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.6\"/><path d=\"M78 112 L78 72 Q109 42 140 72 L140 112\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.6\"/><line x1=\"140\" y1=\"72\" x2=\"166\" y2=\"72\" stroke=\"#B3261E\" stroke-width=\"2.4\"/><circle cx=\"396\" cy=\"68\" r=\"30\" fill=\"none\" stroke=\"#326891\" stroke-width=\"1.8\"/><path d=\"M378 68 L390 80 L416 52\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/><path d=\"M474 34 L598 34 L598 108 L474 108 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M490 52 L580 52 M490 70 L560 70 M490 88 L574 88\" stroke=\"#e2e2d8\" stroke-width=\"1.2\"/></svg>"
}};
