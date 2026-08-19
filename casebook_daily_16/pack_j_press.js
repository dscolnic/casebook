module.exports = { PACK: {
  "id": "j_press",
  "title": "The Ashford Dispatch",
  "discipline": "Journalism Ethics & Verification",
  "teaser": "A prize-winning series turns out to rest on a source no one can find. A plot to smear the paper? Just an honest mistake? Or a reporter's inventions waved through every check?",
  "overclaimTag": "a plot against the paper",
  "truthTag": "fabricated sourcing",
  "venue": "the Ashford Dispatch review",
  "agent": {
    "name": "Investigator Nadia Kerr",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Newsroom credibility",
  "readingShort": "Editors",
  "readingLabel": "Figures of the Free Press",
  "dossierName": "FIGURES OF THE FREE PRESS",
  "enterLabel": "Open the review",
  "subt": "A deduction game inside the Ashford Dispatch review",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The WHERE you test determines the dossier, and the conversation costs one day.",
  "overclaimTease": "An enemy plot makes a thrilling correction, but the dull verification file deserves the first look.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "reporter",
      "items": [
        {
          "id": "reporter",
          "label": "Corin Faye — the star reporter"
        },
        {
          "id": "editor",
          "label": "The managing editor"
        },
        {
          "id": "publisher",
          "label": "The publisher"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "sourcefiles",
      "items": [
        {
          "id": "newsroom",
          "label": "The Newsroom Floor"
        },
        {
          "id": "editdesk",
          "label": "The Editor's Desk"
        },
        {
          "id": "sourcefiles",
          "label": "The Source & Fact-Check Files"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "fabrication",
      "items": [
        {
          "id": "smear",
          "label": "An outside plot planted lies to smear the paper"
        },
        {
          "id": "mistake",
          "label": "Nothing sinister — an honest reporting error"
        },
        {
          "id": "fabrication",
          "label": "Invented sources waved past every check"
        }
      ]
    }
  },
  "PLACES": {
    "newsroom": {
      "name": "The Newsroom Floor",
      "xy": [
        140,
        90
      ]
    },
    "editdesk": {
      "name": "The Editor's Desk",
      "xy": [
        330,
        240
      ]
    },
    "sourcefiles": {
      "name": "The Source & Fact-Check Files",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "newsroom",
      "editdesk"
    ],
    [
      "editdesk",
      "sourcefiles"
    ]
  ],
  "CHARACTERS": {
    "factchecker": {
      "name": "Fact-Checker Jonah Pell",
      "role": "Newsroom fact-checker",
      "face": "✅",
      "badge": "P",
      "legend": "the newsroom",
      "hint": "Flagged the quotes he couldn't verify — and was told to move on."
    },
    "clerk": {
      "name": "The Records Clerk",
      "role": "Editorial records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the source files",
      "hint": "Keeps the assignment logs and the source file that came back empty."
    },
    "stringer": {
      "name": "Local Stringer Ames",
      "role": "Local stringer",
      "face": "📰",
      "badge": "A",
      "legend": "the field",
      "hint": "Worked the same town; none of the named witnesses ever existed."
    }
  },
  "TOPICMAP": {
    "newsroom": {
      "factchecker": [
        "freepress"
      ],
      "clerk": [
        "record"
      ],
      "stringer": [
        "shame"
      ]
    },
    "editdesk": {
      "factchecker": [
        "presscrit"
      ],
      "clerk": [
        "broadcast"
      ],
      "stringer": [
        "fourtheories"
      ]
    },
    "sourcefiles": {
      "factchecker": [
        "editor"
      ],
      "clerk": [
        "objritual"
      ],
      "stringer": [
        "objorigins"
      ]
    }
  },
  "TOPICS": {
    "freepress": {
      "sci": "John Peter Zenger (1697-1746)",
      "topic": "Truth & the free press",
      "lede": "John Peter Zenger made truth and the free press answer to sources, documents, and the checking hidden behind publication.",
      "no": 1,
      "profile": "The newsroom note for this morning profiles John Peter Zenger and the working discipline behind truth and the free press. John Peter Zenger was tried for seditious libel after his newspaper criticized New York's colonial governor; the 1735 acquittal became a symbol of truth as a defense against official retaliation. Journalism operates under deadline, competition, unequal access, and the public’s need for a comprehensible account. Zenger’s example clarifies how professional routines can protect accuracy or merely create its appearance.\n\nThe usable standard is to test accusations against verifiable facts and recognize that legal permission to publish does not remove the duty to substantiate. Reporters should distinguish firsthand knowledge from repetition, show editors enough about confidential sourcing to permit internal checks, and preserve documents or notes that support contested details. Corrections are part of verification because publication does not freeze the evidence.\n\nA well-written article can fail at its foundation if quotations, people, or records cannot be independently located. Conversely, a real investigation may sound less dramatic because it states uncertainty, identifies limits, and refuses details that cannot be confirmed. Credibility is built in those unglamorous choices.\n\nThe professional lesson is press freedom is protected most credibly when criticism can survive factual examination. Journalism asks readers for trust only after the newsroom has made information answer to a visible method. Source protection should shield a vulnerable person, not shield the reporter’s claim from editorial scrutiny. A document that contradicts the preferred narrative belongs in the reporting process, not in a discarded folder.",
      "frame": "Turns the source sheet away. \"At The Newsroom Floor, a polished sentence can hide an empty file. Tell me what truth and the free press demands.\"",
      "q": [
        {
          "q": "Which newsroom description best states John Peter Zenger’s contribution to truth and the free press?",
          "o": [
            {
              "t": "John Peter Zenger made truth and the free press depend on traceable sources, corroboration, and editorial verification. The source trail remains reviewable in the dated record.",
              "v": "expert",
              "fb": "Correct: verification is a process that precedes trust in the writer or the finished story."
            },
            {
              "t": "John Peter Zenger treated truth and the free press as persuasive storytelling whenever the quotations fit the article's theme. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A quotation that fits the theme still needs a real speaker and reliable context."
            },
            {
              "t": "John Peter Zenger let confidentiality settle truth and the free press while withholding the central source trail from editors. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "Source protection does not prevent responsible internal verification."
            },
            {
              "t": "John Peter Zenger used the public impact of truth and the free press as proof that every reported detail was accurate. The preferred narrative receives priority over verification.",
              "v": "danger",
              "fb": "Influence measures circulation and consequence, not the truth of reported details."
            }
          ]
        },
        {
          "q": "What editorial action most closely follows the practice explained in the profile?",
          "o": [
            {
              "t": "Check the central people, records, and quotations before publication, and preserve the supporting trail. It remains checkable in the dated record in the case file.",
              "v": "expert",
              "fb": "Yes: the core claim deserves the strongest checking because the article depends on it."
            },
            {
              "t": "Verify peripheral dates carefully, but accept the anonymous source who supplies the main accusation. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Accurate background details cannot compensate for an unverified central source."
            },
            {
              "t": "Use the reporter's previous awards as evidence that the incomplete source file is treated as reliable. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Past performance may justify confidence, but not abandonment of ordinary editorial controls."
            },
            {
              "t": "Publish first to protect the scoop, and call every later contradiction an attack on the newspaper. The preferred narrative sets the order of review in the case file.",
              "v": "danger",
              "fb": "Competition cannot turn unresolved sourcing into verified reporting."
            }
          ]
        },
        {
          "q": "What professional rule follows most clearly from truth and the free press?",
          "o": [
            {
              "t": "A newsroom should preserve a checkable route from every important claim back to its source. The evidence remains open under the documented sequence in the case file.",
              "v": "expert",
              "fb": "Exactly: readers receive a conclusion, while editors must retain the route by which it was verified."
            },
            {
              "t": "More quotations should make reporting reliable even when all of them repeat one unverified account. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Repeated dependence on one source creates volume, not independent corroboration."
            },
            {
              "t": "Balanced accusations should count as objective regardless of the evidence supporting either side. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "Symmetrical presentation can disguise a large asymmetry in evidence."
            },
            {
              "t": "The article is treated as a historic exposé or a harmless mistake that needs no internal review. Publication prestige is treated as evidence of source reliability.",
              "v": "danger",
              "fb": "A qualified institutional failure can be serious without fitting either theatrical label."
            }
          ]
        }
      ]
    },
    "record": {
      "sci": "Adolph S. Ochs (1858-1935)",
      "topic": "The standard of the record",
      "lede": "Adolph S. Ochs treated the standard of the record as a newsroom obligation that survives deadline and prestige.",
      "no": 2,
      "profile": "The newsroom note for this morning profiles Adolph S. Ochs and the working discipline behind the standard of the record. Adolph S. Ochs purchased The New York Times and promoted a restrained newspaper of record identified with the motto 'All the News That's Fit to Print.' Journalism operates under deadline, competition, unequal access, and the public’s need for a comprehensible account. Ochs’s example clarifies how professional routines can protect accuracy or merely create its appearance.\n\nThe usable standard is to create consistent standards for sourcing, tone, correction, and coverage so readers know what the institution promises. Reporters should distinguish firsthand knowledge from repetition, show editors enough about confidential sourcing to permit internal checks, and preserve documents or notes that support contested details. Corrections are part of verification because publication does not freeze the evidence.\n\nA well-written article can fail at its foundation if quotations, people, or records cannot be independently located. Conversely, a real investigation may sound less dramatic because it states uncertainty, identifies limits, and refuses details that cannot be confirmed. Credibility is built in those unglamorous choices.\n\nThe professional lesson is a reputation for reliability is accumulated through routine verification and can be lost through exceptional shortcuts. Journalism asks readers for trust only after the newsroom has made information answer to a visible method. Source protection should shield a vulnerable person, not shield the reporter’s claim from editorial scrutiny. A document that contradicts the preferred narrative belongs in the reporting process, not in a discarded folder. Source protection should shield a vulnerable person, not shield the reporter’s claim from editorial scrutiny.",
      "frame": "Lowers the newsroom phone. \"The quote made print. Before I say how, explain the standard of the record as an editor would.\"",
      "q": [
        {
          "q": "Which newsroom description best states Adolph S. Ochs’s contribution to the standard of the record?",
          "o": [
            {
              "t": "Adolph S. Ochs made the standard of the record depend on traceable sources, corroboration, and editorial verification. The source trail remains reviewable in the dated record.",
              "v": "expert",
              "fb": "Correct: verification is a process that precedes trust in the writer or the finished story."
            },
            {
              "t": "Adolph S. Ochs treated the standard of the record as persuasive storytelling whenever the quotations fit the article's theme. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A quotation that fits the theme still needs a real speaker and reliable context."
            },
            {
              "t": "Adolph S. Ochs let confidentiality settle the standard of the record while withholding the central source trail from editors. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "Source protection does not prevent responsible internal verification."
            },
            {
              "t": "Adolph S. Ochs used the public impact of the standard of the record as proof that every reported detail was accurate. The preferred narrative receives priority over verification.",
              "v": "danger",
              "fb": "Influence measures circulation and consequence, not the truth of reported details."
            }
          ]
        },
        {
          "q": "What editorial action most closely follows the practice explained in the profile?",
          "o": [
            {
              "t": "Check the central people, records, and quotations before publication, and preserve the supporting trail. It remains checkable in the dated record in the case file.",
              "v": "expert",
              "fb": "Yes: the core claim deserves the strongest checking because the article depends on it."
            },
            {
              "t": "Verify peripheral dates carefully, but accept the anonymous source who supplies the main accusation. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Accurate background details cannot compensate for an unverified central source."
            },
            {
              "t": "Use the reporter's previous awards as evidence that the incomplete source file is treated as reliable. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Past performance may justify confidence, but not abandonment of ordinary editorial controls."
            },
            {
              "t": "Publish first to protect the scoop, and call every later contradiction an attack on the newspaper. The preferred narrative sets the order of review in the case file.",
              "v": "danger",
              "fb": "Competition cannot turn unresolved sourcing into verified reporting."
            }
          ]
        },
        {
          "q": "What professional rule follows most clearly from the standard of the record?",
          "o": [
            {
              "t": "A newsroom should preserve a checkable route from every important claim back to its source. The evidence remains open under the documented sequence in the case file.",
              "v": "expert",
              "fb": "Exactly: readers receive a conclusion, while editors must retain the route by which it was verified."
            },
            {
              "t": "More quotations should make reporting reliable even when all of them repeat one unverified account. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Repeated dependence on one source creates volume, not independent corroboration."
            },
            {
              "t": "Balanced accusations should count as objective regardless of the evidence supporting either side. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "Symmetrical presentation can disguise a large asymmetry in evidence."
            },
            {
              "t": "The article is treated as a historic exposé or a harmless mistake that needs no internal review. Publication prestige is treated as evidence of source reliability.",
              "v": "danger",
              "fb": "A qualified institutional failure can be serious without fitting either theatrical label."
            }
          ]
        }
      ]
    },
    "shame": {
      "sci": "Lincoln Steffens (1866-1936)",
      "topic": "Muckraking & the shame of the cities",
      "lede": "The byline mattered less than the verification file in Lincoln Steffens's work on muckraking and the shame of the cities.",
      "no": 3,
      "profile": "The newsroom note for this morning profiles Lincoln Steffens and the working discipline behind muckraking and the shame of the cities. Lincoln Steffens reported on municipal corruption in a series later collected as The Shame of the Cities, examining political machines and business complicity. Journalism operates under deadline, competition, unequal access, and the public’s need for a comprehensible account. Steffens’s example clarifies how professional routines can protect accuracy or merely create its appearance.\n\nThe usable standard is to follow systems of patronage and incentives across officials, contractors, businesses, and voters instead of reducing corruption to one colorful villain. Reporters should distinguish firsthand knowledge from repetition, show editors enough about confidential sourcing to permit internal checks, and preserve documents or notes that support contested details. Corrections are part of verification because publication does not freeze the evidence.\n\nA well-written article can fail at its foundation if quotations, people, or records cannot be independently located. Conversely, a real investigation may sound less dramatic because it states uncertainty, identifies limits, and refuses details that cannot be confirmed. Credibility is built in those unglamorous choices.\n\nThe professional lesson is exposure is more useful when it explains the machinery that repeatedly produces misconduct. Journalism asks readers for trust only after the newsroom has made information answer to a visible method. Source protection should shield a vulnerable person, not shield the reporter’s claim from editorial scrutiny. A document that contradicts the preferred narrative belongs in the reporting process, not in a discarded folder. Source protection should shield a vulnerable person, not shield the reporter’s claim from editorial scrutiny.",
      "frame": "Taps a red verification mark. \"A byline does not corroborate itself. Show me you understand muckraking and the shame of the cities.\"",
      "q": [
        {
          "q": "Which newsroom description best states Lincoln Steffens’s contribution to muckraking and the shame of the cities?",
          "o": [
            {
              "t": "Lincoln Steffens made muckraking and the shame of the cities depend on traceable sources, corroboration, and editorial verification. The source trail remains reviewable in the dated record.",
              "v": "expert",
              "fb": "Correct: verification is a process that precedes trust in the writer or the finished story."
            },
            {
              "t": "Lincoln Steffens treated muckraking and the shame of the cities as persuasive storytelling whenever the quotations fit the article's theme. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A quotation that fits the theme still needs a real speaker and reliable context."
            },
            {
              "t": "Lincoln Steffens let confidentiality settle muckraking and the shame of the cities while withholding the central source trail from editors. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "Source protection does not prevent responsible internal verification."
            },
            {
              "t": "Lincoln Steffens used the public impact of muckraking and the shame of the cities as proof that every reported detail was accurate. The preferred narrative receives priority over verification.",
              "v": "danger",
              "fb": "Influence measures circulation and consequence, not the truth of reported details."
            }
          ]
        },
        {
          "q": "What editorial action most closely follows the practice explained in the profile?",
          "o": [
            {
              "t": "Check the central people, records, and quotations before publication, and preserve the supporting trail. It remains checkable in the dated record in the case file.",
              "v": "expert",
              "fb": "Yes: the core claim deserves the strongest checking because the article depends on it."
            },
            {
              "t": "Verify peripheral dates carefully, but accept the anonymous source who supplies the main accusation. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Accurate background details cannot compensate for an unverified central source."
            },
            {
              "t": "Use the reporter's previous awards as evidence that the incomplete source file is treated as reliable. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Past performance may justify confidence, but not abandonment of ordinary editorial controls."
            },
            {
              "t": "Publish first to protect the scoop, and call every later contradiction an attack on the newspaper. The preferred narrative sets the order of review in the case file.",
              "v": "danger",
              "fb": "Competition cannot turn unresolved sourcing into verified reporting."
            }
          ]
        },
        {
          "q": "What professional rule follows most clearly from muckraking and the shame of the cities?",
          "o": [
            {
              "t": "A newsroom should preserve a checkable route from every important claim back to its source. The evidence remains open under the documented sequence in the case file.",
              "v": "expert",
              "fb": "Exactly: readers receive a conclusion, while editors must retain the route by which it was verified."
            },
            {
              "t": "More quotations should make reporting reliable even when all of them repeat one unverified account. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Repeated dependence on one source creates volume, not independent corroboration."
            },
            {
              "t": "Balanced accusations should count as objective regardless of the evidence supporting either side. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "Symmetrical presentation can disguise a large asymmetry in evidence."
            },
            {
              "t": "The article is treated as a historic exposé or a harmless mistake that needs no internal review. Publication prestige is treated as evidence of source reliability.",
              "v": "danger",
              "fb": "A qualified institutional failure can be serious without fitting either theatrical label."
            }
          ]
        }
      ]
    },
    "presscrit": {
      "sci": "George Seldes (1890-1995)",
      "topic": "Press criticism",
      "lede": "George Seldes made press criticism answer to sources, documents, and the checking hidden behind publication.",
      "no": 4,
      "profile": "The newsroom note for this morning profiles George Seldes and the working discipline behind press criticism. George Seldes spent decades criticizing press concentration, censorship, advertising influence, and failures to challenge powerful institutions. Journalism operates under deadline, competition, unequal access, and the public’s need for a comprehensible account. Seldes’s example clarifies how professional routines can protect accuracy or merely create its appearance.\n\nThe usable standard is to scrutinize the economic and institutional pressures acting on news organizations as carefully as the stories they publish. Reporters should distinguish firsthand knowledge from repetition, show editors enough about confidential sourcing to permit internal checks, and preserve documents or notes that support contested details. Corrections are part of verification because publication does not freeze the evidence.\n\nA well-written article can fail at its foundation if quotations, people, or records cannot be independently located. Conversely, a real investigation may sound less dramatic because it states uncertainty, identifies limits, and refuses details that cannot be confirmed. Credibility is built in those unglamorous choices.\n\nThe professional lesson is a free press can still reproduce silence when ownership, access, or habit discourages inconvenient reporting. Journalism asks readers for trust only after the newsroom has made information answer to a visible method. Source protection should shield a vulnerable person, not shield the reporter’s claim from editorial scrutiny. A document that contradicts the preferred narrative belongs in the reporting process, not in a discarded folder. Source protection should shield a vulnerable person, not shield the reporter’s claim from editorial scrutiny. A document that contradicts the preferred narrative belongs in the reporting process, not in a discarded folder.",
      "frame": "Turns the source sheet away. \"At The Editor's Desk, a polished sentence can hide an empty file. Tell me what press criticism demands.\"",
      "q": [
        {
          "q": "Which newsroom description best states George Seldes’s contribution to press criticism?",
          "o": [
            {
              "t": "George Seldes made press criticism depend on traceable sources, corroboration, and editorial verification. The source trail remains reviewable in the dated record.",
              "v": "expert",
              "fb": "Correct: verification is a process that precedes trust in the writer or the finished story."
            },
            {
              "t": "George Seldes treated press criticism as persuasive storytelling whenever the quotations fit the article's theme. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A quotation that fits the theme still needs a real speaker and reliable context."
            },
            {
              "t": "George Seldes let confidentiality settle press criticism while withholding the central source trail from editors. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "Source protection does not prevent responsible internal verification."
            },
            {
              "t": "George Seldes used the public impact of press criticism as proof that every reported detail was accurate. The preferred narrative receives priority over verification.",
              "v": "danger",
              "fb": "Influence measures circulation and consequence, not the truth of reported details."
            }
          ]
        },
        {
          "q": "What editorial action most closely follows the practice explained in the profile?",
          "o": [
            {
              "t": "Check the central people, records, and quotations before publication, and preserve the supporting trail. It remains checkable in the dated record in the case file.",
              "v": "expert",
              "fb": "Yes: the core claim deserves the strongest checking because the article depends on it."
            },
            {
              "t": "Verify peripheral dates carefully, but accept the anonymous source who supplies the main accusation. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Accurate background details cannot compensate for an unverified central source."
            },
            {
              "t": "Use the reporter's previous awards as evidence that the incomplete source file is treated as reliable. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Past performance may justify confidence, but not abandonment of ordinary editorial controls."
            },
            {
              "t": "Publish first to protect the scoop, and call every later contradiction an attack on the newspaper. The preferred narrative sets the order of review in the case file.",
              "v": "danger",
              "fb": "Competition cannot turn unresolved sourcing into verified reporting."
            }
          ]
        },
        {
          "q": "What professional rule follows most clearly from press criticism?",
          "o": [
            {
              "t": "A newsroom should preserve a checkable route from every important claim back to its source. The evidence remains open under the documented sequence in the case file.",
              "v": "expert",
              "fb": "Exactly: readers receive a conclusion, while editors must retain the route by which it was verified."
            },
            {
              "t": "More quotations should make reporting reliable even when all of them repeat one unverified account. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Repeated dependence on one source creates volume, not independent corroboration."
            },
            {
              "t": "Balanced accusations should count as objective regardless of the evidence supporting either side. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "Symmetrical presentation can disguise a large asymmetry in evidence."
            },
            {
              "t": "The article is treated as a historic exposé or a harmless mistake that needs no internal review. Publication prestige is treated as evidence of source reliability.",
              "v": "danger",
              "fb": "A qualified institutional failure can be serious without fitting either theatrical label."
            }
          ]
        }
      ]
    },
    "broadcast": {
      "sci": "Edward R. Murrow (1908-1965)",
      "topic": "Broadcast integrity",
      "lede": "Edward R. Murrow treated broadcast integrity as a newsroom obligation that survives deadline and prestige.",
      "no": 5,
      "profile": "The newsroom note for this morning profiles Edward R. Murrow and the working discipline behind broadcast integrity. Edward R. Murrow brought wartime reporting and later broadcast scrutiny of Senator Joseph McCarthy to a mass audience while insisting on editorial responsibility. Journalism operates under deadline, competition, unequal access, and the public’s need for a comprehensible account. Murrow’s example clarifies how professional routines can protect accuracy or merely create its appearance.\n\nThe usable standard is to pair vivid testimony with documented context, identify editorial judgment openly, and resist intimidation by powerful subjects. Reporters should distinguish firsthand knowledge from repetition, show editors enough about confidential sourcing to permit internal checks, and preserve documents or notes that support contested details. Corrections are part of verification because publication does not freeze the evidence.\n\nA well-written article can fail at its foundation if quotations, people, or records cannot be independently located. Conversely, a real investigation may sound less dramatic because it states uncertainty, identifies limits, and refuses details that cannot be confirmed. Credibility is built in those unglamorous choices.\n\nThe professional lesson is courage in broadcasting matters most when it is supported by evidence rather than performance alone. Journalism asks readers for trust only after the newsroom has made information answer to a visible method. Source protection should shield a vulnerable person, not shield the reporter’s claim from editorial scrutiny. A document that contradicts the preferred narrative belongs in the reporting process, not in a discarded folder. Source protection should shield a vulnerable person, not shield the reporter’s claim from editorial scrutiny.",
      "frame": "Lowers the newsroom phone. \"The quote made print. Before I say how, explain broadcast integrity as an editor would.\"",
      "q": [
        {
          "q": "Which newsroom description best states Edward R. Murrow’s contribution to broadcast integrity?",
          "o": [
            {
              "t": "Edward R. Murrow made broadcast integrity depend on traceable sources, corroboration, and editorial verification. The source trail remains reviewable in the dated record.",
              "v": "expert",
              "fb": "Correct: verification is a process that precedes trust in the writer or the finished story."
            },
            {
              "t": "Edward R. Murrow treated broadcast integrity as persuasive storytelling whenever the quotations fit the article's theme. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A quotation that fits the theme still needs a real speaker and reliable context."
            },
            {
              "t": "Edward R. Murrow let confidentiality settle broadcast integrity while withholding the central source trail from editors. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "Source protection does not prevent responsible internal verification."
            },
            {
              "t": "Edward R. Murrow used the public impact of broadcast integrity as proof that every reported detail was accurate. The preferred narrative receives priority over verification.",
              "v": "danger",
              "fb": "Influence measures circulation and consequence, not the truth of reported details."
            }
          ]
        },
        {
          "q": "What editorial action most closely follows the practice explained in the profile?",
          "o": [
            {
              "t": "Check the central people, records, and quotations before publication, and preserve the supporting trail. It remains checkable in the dated record in the case file.",
              "v": "expert",
              "fb": "Yes: the core claim deserves the strongest checking because the article depends on it."
            },
            {
              "t": "Verify peripheral dates carefully, but accept the anonymous source who supplies the main accusation. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Accurate background details cannot compensate for an unverified central source."
            },
            {
              "t": "Use the reporter's previous awards as evidence that the incomplete source file is treated as reliable. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Past performance may justify confidence, but not abandonment of ordinary editorial controls."
            },
            {
              "t": "Publish first to protect the scoop, and call every later contradiction an attack on the newspaper. The preferred narrative sets the order of review in the case file.",
              "v": "danger",
              "fb": "Competition cannot turn unresolved sourcing into verified reporting."
            }
          ]
        },
        {
          "q": "What professional rule follows most clearly from broadcast integrity?",
          "o": [
            {
              "t": "A newsroom should preserve a checkable route from every important claim back to its source. The evidence remains open under the documented sequence in the case file.",
              "v": "expert",
              "fb": "Exactly: readers receive a conclusion, while editors must retain the route by which it was verified."
            },
            {
              "t": "More quotations should make reporting reliable even when all of them repeat one unverified account. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Repeated dependence on one source creates volume, not independent corroboration."
            },
            {
              "t": "Balanced accusations should count as objective regardless of the evidence supporting either side. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "Symmetrical presentation can disguise a large asymmetry in evidence."
            },
            {
              "t": "The article is treated as a historic exposé or a harmless mistake that needs no internal review. Publication prestige is treated as evidence of source reliability.",
              "v": "danger",
              "fb": "A qualified institutional failure can be serious without fitting either theatrical label."
            }
          ]
        }
      ]
    },
    "fourtheories": {
      "sci": "Fred S. Siebert (1901-1982)",
      "topic": "Four theories of the press",
      "lede": "The byline mattered less than the verification file in Fred S. Siebert's work on four theories of the press.",
      "no": 6,
      "profile": "The newsroom note for this morning profiles Fred S. Siebert and the working discipline behind four theories of the press. Fred S. Siebert co-authored Four Theories of the Press, classifying press systems by their relation to political authority, liberty, and social responsibility. Journalism operates under deadline, competition, unequal access, and the public’s need for a comprehensible account. Siebert’s example clarifies how professional routines can protect accuracy or merely create its appearance.\n\nThe usable standard is to compare media institutions through explicit assumptions about state power, ownership, rights, and public obligations. Reporters should distinguish firsthand knowledge from repetition, show editors enough about confidential sourcing to permit internal checks, and preserve documents or notes that support contested details. Corrections are part of verification because publication does not freeze the evidence.\n\nA well-written article can fail at its foundation if quotations, people, or records cannot be independently located. Conversely, a real investigation may sound less dramatic because it states uncertainty, identifies limits, and refuses details that cannot be confirmed. Credibility is built in those unglamorous choices.\n\nThe professional lesson is typologies clarify differences when they are used as analytical tools rather than rigid descriptions of every newsroom. Journalism asks readers for trust only after the newsroom has made information answer to a visible method. Source protection should shield a vulnerable person, not shield the reporter’s claim from editorial scrutiny. A document that contradicts the preferred narrative belongs in the reporting process, not in a discarded folder. Source protection should shield a vulnerable person, not shield the reporter’s claim from editorial scrutiny.",
      "frame": "Taps a red verification mark. \"A byline does not corroborate itself. Show me you understand four theories of the press.\"",
      "q": [
        {
          "q": "Which newsroom description best states Fred S. Siebert’s contribution to four theories of the press?",
          "o": [
            {
              "t": "Fred S. Siebert made four theories of the press depend on traceable sources, corroboration, and editorial verification. The source trail remains reviewable in the dated record.",
              "v": "expert",
              "fb": "Correct: verification is a process that precedes trust in the writer or the finished story."
            },
            {
              "t": "Fred S. Siebert treated four theories of the press as persuasive storytelling whenever the quotations fit the article's theme. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A quotation that fits the theme still needs a real speaker and reliable context."
            },
            {
              "t": "Fred S. Siebert let confidentiality settle four theories of the press while withholding the central source trail from editors. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "Source protection does not prevent responsible internal verification."
            },
            {
              "t": "Fred S. Siebert used the public impact of four theories of the press as proof that every reported detail was accurate. The preferred narrative receives priority over verification.",
              "v": "danger",
              "fb": "Influence measures circulation and consequence, not the truth of reported details."
            }
          ]
        },
        {
          "q": "What editorial action most closely follows the practice explained in the profile?",
          "o": [
            {
              "t": "Check the central people, records, and quotations before publication, and preserve the supporting trail. It remains checkable in the dated record in the case file.",
              "v": "expert",
              "fb": "Yes: the core claim deserves the strongest checking because the article depends on it."
            },
            {
              "t": "Verify peripheral dates carefully, but accept the anonymous source who supplies the main accusation. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Accurate background details cannot compensate for an unverified central source."
            },
            {
              "t": "Use the reporter's previous awards as evidence that the incomplete source file is treated as reliable. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Past performance may justify confidence, but not abandonment of ordinary editorial controls."
            },
            {
              "t": "Publish first to protect the scoop, and call every later contradiction an attack on the newspaper. The preferred narrative sets the order of review in the case file.",
              "v": "danger",
              "fb": "Competition cannot turn unresolved sourcing into verified reporting."
            }
          ]
        },
        {
          "q": "What professional rule follows most clearly from four theories of the press?",
          "o": [
            {
              "t": "A newsroom should preserve a checkable route from every important claim back to its source. The evidence remains open under the documented sequence in the case file.",
              "v": "expert",
              "fb": "Exactly: readers receive a conclusion, while editors must retain the route by which it was verified."
            },
            {
              "t": "More quotations should make reporting reliable even when all of them repeat one unverified account. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Repeated dependence on one source creates volume, not independent corroboration."
            },
            {
              "t": "Balanced accusations should count as objective regardless of the evidence supporting either side. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "Symmetrical presentation can disguise a large asymmetry in evidence."
            },
            {
              "t": "The article is treated as a historic exposé or a harmless mistake that needs no internal review. Publication prestige is treated as evidence of source reliability.",
              "v": "danger",
              "fb": "A qualified institutional failure can be serious without fitting either theatrical label."
            }
          ]
        }
      ]
    },
    "editor": {
      "sci": "Ben Bradlee (1921-2014)",
      "topic": "The editor & the fabricated story",
      "lede": "Ben Bradlee made the editor and the fabricated story answer to sources, documents, and the checking hidden behind publication.",
      "no": 7,
      "profile": "The newsroom note for this morning profiles Ben Bradlee and the working discipline behind the editor and the fabricated story. Ben Bradlee led The Washington Post through Watergate and later confronted the Janet Cooke fabrication, in which a prize-winning story rested on a nonexistent child. Journalism operates under deadline, competition, unequal access, and the public’s need for a comprehensible account. Bradlee’s example clarifies how professional routines can protect accuracy or merely create its appearance.\n\nThe usable standard is to demand source accountability, protect legitimate confidentiality without abandoning internal verification, and investigate failures publicly. Reporters should distinguish firsthand knowledge from repetition, show editors enough about confidential sourcing to permit internal checks, and preserve documents or notes that support contested details. Corrections are part of verification because publication does not freeze the evidence.\n\nA well-written article can fail at its foundation if quotations, people, or records cannot be independently located. Conversely, a real investigation may sound less dramatic because it states uncertainty, identifies limits, and refuses details that cannot be confirmed. Credibility is built in those unglamorous choices.\n\nThe professional lesson is editorial bravery in one celebrated investigation does not immunize a newsroom against verification failures elsewhere. Journalism asks readers for trust only after the newsroom has made information answer to a visible method. Source protection should shield a vulnerable person, not shield the reporter’s claim from editorial scrutiny. A document that contradicts the preferred narrative belongs in the reporting process, not in a discarded folder. Source protection should shield a vulnerable person, not shield the reporter’s claim from editorial scrutiny.",
      "frame": "Turns the source sheet away. \"At The Source & Fact-Check Files, a polished sentence can hide an empty file. Tell me what the editor and the fabricated story demands.\"",
      "q": [
        {
          "q": "Which newsroom description best states Ben Bradlee’s contribution to the editor and the fabricated story?",
          "o": [
            {
              "t": "Ben Bradlee made the editor and the fabricated story depend on traceable sources, corroboration, and editorial verification. The source trail remains reviewable in the dated record.",
              "v": "expert",
              "fb": "Correct: verification is a process that precedes trust in the writer or the finished story."
            },
            {
              "t": "Ben Bradlee treated the editor and the fabricated story as persuasive storytelling whenever the quotations fit the article's theme. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A quotation that fits the theme still needs a real speaker and reliable context."
            },
            {
              "t": "Ben Bradlee let confidentiality settle the editor and the fabricated story while withholding the central source trail from editors. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "Source protection does not prevent responsible internal verification."
            },
            {
              "t": "Ben Bradlee used the public impact of the editor and the fabricated story as proof that every reported detail was accurate. The preferred narrative receives priority over verification.",
              "v": "danger",
              "fb": "Influence measures circulation and consequence, not the truth of reported details."
            }
          ]
        },
        {
          "q": "What editorial action most closely follows the practice explained in the profile?",
          "o": [
            {
              "t": "Check the central people, records, and quotations before publication, and preserve the supporting trail. It remains checkable in the dated record in the case file.",
              "v": "expert",
              "fb": "Yes: the core claim deserves the strongest checking because the article depends on it."
            },
            {
              "t": "Verify peripheral dates carefully, but accept the anonymous source who supplies the main accusation. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Accurate background details cannot compensate for an unverified central source."
            },
            {
              "t": "Use the reporter's previous awards as evidence that the incomplete source file is treated as reliable. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Past performance may justify confidence, but not abandonment of ordinary editorial controls."
            },
            {
              "t": "Publish first to protect the scoop, and call every later contradiction an attack on the newspaper. The preferred narrative sets the order of review in the case file.",
              "v": "danger",
              "fb": "Competition cannot turn unresolved sourcing into verified reporting."
            }
          ]
        },
        {
          "q": "What professional rule follows most clearly from the editor and the fabricated story?",
          "o": [
            {
              "t": "A newsroom should preserve a checkable route from every important claim back to its source. The evidence remains open under the documented sequence in the case file.",
              "v": "expert",
              "fb": "Exactly: readers receive a conclusion, while editors must retain the route by which it was verified."
            },
            {
              "t": "More quotations should make reporting reliable even when all of them repeat one unverified account. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Repeated dependence on one source creates volume, not independent corroboration."
            },
            {
              "t": "Balanced accusations should count as objective regardless of the evidence supporting either side. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "Symmetrical presentation can disguise a large asymmetry in evidence."
            },
            {
              "t": "The article is treated as a historic exposé or a harmless mistake that needs no internal review. Publication prestige is treated as evidence of source reliability.",
              "v": "danger",
              "fb": "A qualified institutional failure can be serious without fitting either theatrical label."
            }
          ]
        }
      ]
    },
    "objritual": {
      "sci": "Gaye Tuchman (b. 1943)",
      "topic": "Objectivity as strategic ritual",
      "lede": "Gaye Tuchman treated objectivity as strategic ritual as a newsroom obligation that survives deadline and prestige.",
      "no": 8,
      "profile": "The newsroom note for this morning profiles Gaye Tuchman and the working discipline behind objectivity as strategic ritual. Gaye Tuchman described objectivity as a 'strategic ritual' that journalists use to manage deadlines, criticism, and professional risk. Journalism operates under deadline, competition, unequal access, and the public’s need for a comprehensible account. Tuchman’s example clarifies how professional routines can protect accuracy or merely create its appearance.\n\nThe usable standard is to examine practices such as quotation balance, attribution, and presentation of conflicting claims for what they reveal and what they merely shield. Reporters should distinguish firsthand knowledge from repetition, show editors enough about confidential sourcing to permit internal checks, and preserve documents or notes that support contested details. Corrections are part of verification because publication does not freeze the evidence.\n\nA well-written article can fail at its foundation if quotations, people, or records cannot be independently located. Conversely, a real investigation may sound less dramatic because it states uncertainty, identifies limits, and refuses details that cannot be confirmed. Credibility is built in those unglamorous choices.\n\nThe professional lesson is procedural balance can protect reporters while still misleading readers if evidence is not weighed. Journalism asks readers for trust only after the newsroom has made information answer to a visible method. Source protection should shield a vulnerable person, not shield the reporter’s claim from editorial scrutiny. A document that contradicts the preferred narrative belongs in the reporting process, not in a discarded folder. Source protection should shield a vulnerable person, not shield the reporter’s claim from editorial scrutiny.",
      "frame": "Lowers the newsroom phone. \"The quote made print. Before I say how, explain objectivity as strategic ritual as an editor would.\"",
      "q": [
        {
          "q": "Which newsroom description best states Gaye Tuchman’s contribution to objectivity as strategic ritual?",
          "o": [
            {
              "t": "Gaye Tuchman made objectivity as strategic ritual depend on traceable sources, corroboration, and editorial verification. The source trail remains reviewable in the dated record.",
              "v": "expert",
              "fb": "Correct: verification is a process that precedes trust in the writer or the finished story."
            },
            {
              "t": "Gaye Tuchman treated objectivity as strategic ritual as persuasive storytelling whenever the quotations fit the article's theme. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A quotation that fits the theme still needs a real speaker and reliable context."
            },
            {
              "t": "Gaye Tuchman let confidentiality settle objectivity as strategic ritual while withholding the central source trail from editors. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "Source protection does not prevent responsible internal verification."
            },
            {
              "t": "Gaye Tuchman used the public impact of objectivity as strategic ritual as proof that every reported detail was accurate. The preferred narrative receives priority over verification.",
              "v": "danger",
              "fb": "Influence measures circulation and consequence, not the truth of reported details."
            }
          ]
        },
        {
          "q": "What editorial action most closely follows the practice explained in the profile?",
          "o": [
            {
              "t": "Check the central people, records, and quotations before publication, and preserve the supporting trail. It remains checkable in the dated record in the case file.",
              "v": "expert",
              "fb": "Yes: the core claim deserves the strongest checking because the article depends on it."
            },
            {
              "t": "Verify peripheral dates carefully, but accept the anonymous source who supplies the main accusation. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Accurate background details cannot compensate for an unverified central source."
            },
            {
              "t": "Use the reporter's previous awards as evidence that the incomplete source file is treated as reliable. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Past performance may justify confidence, but not abandonment of ordinary editorial controls."
            },
            {
              "t": "Publish first to protect the scoop, and call every later contradiction an attack on the newspaper. The preferred narrative sets the order of review in the case file.",
              "v": "danger",
              "fb": "Competition cannot turn unresolved sourcing into verified reporting."
            }
          ]
        },
        {
          "q": "What professional rule follows most clearly from objectivity as strategic ritual?",
          "o": [
            {
              "t": "A newsroom should preserve a checkable route from every important claim back to its source. The evidence remains open under the documented sequence in the case file.",
              "v": "expert",
              "fb": "Exactly: readers receive a conclusion, while editors must retain the route by which it was verified."
            },
            {
              "t": "More quotations should make reporting reliable even when all of them repeat one unverified account. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Repeated dependence on one source creates volume, not independent corroboration."
            },
            {
              "t": "Balanced accusations should count as objective regardless of the evidence supporting either side. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "Symmetrical presentation can disguise a large asymmetry in evidence."
            },
            {
              "t": "The article is treated as a historic exposé or a harmless mistake that needs no internal review. Publication prestige is treated as evidence of source reliability.",
              "v": "danger",
              "fb": "A qualified institutional failure can be serious without fitting either theatrical label."
            }
          ]
        }
      ]
    },
    "objorigins": {
      "sci": "Michael Schudson (b. 1946)",
      "topic": "The origins of objectivity",
      "lede": "The byline mattered less than the verification file in Michael Schudson's work on the origins of objectivity.",
      "no": 9,
      "profile": "The newsroom note for this morning profiles Michael Schudson and the working discipline behind the origins of objectivity. Michael Schudson traced the historical rise of objectivity in American journalism rather than treating it as an eternal or self-evident professional norm. Journalism operates under deadline, competition, unequal access, and the public’s need for a comprehensible account. Schudson’s example clarifies how professional routines can protect accuracy or merely create its appearance.\n\nThe usable standard is to place reporting conventions within changes in politics, markets, technology, and professional identity. Reporters should distinguish firsthand knowledge from repetition, show editors enough about confidential sourcing to permit internal checks, and preserve documents or notes that support contested details. Corrections are part of verification because publication does not freeze the evidence.\n\nA well-written article can fail at its foundation if quotations, people, or records cannot be independently located. Conversely, a real investigation may sound less dramatic because it states uncertainty, identifies limits, and refuses details that cannot be confirmed. Credibility is built in those unglamorous choices.\n\nThe professional lesson is a norm becomes easier to evaluate when its historical purposes and limits are visible. Journalism asks readers for trust only after the newsroom has made information answer to a visible method. Source protection should shield a vulnerable person, not shield the reporter’s claim from editorial scrutiny. A document that contradicts the preferred narrative belongs in the reporting process, not in a discarded folder. Source protection should shield a vulnerable person, not shield the reporter’s claim from editorial scrutiny.",
      "frame": "Taps a red verification mark. \"A byline does not corroborate itself. Show me you understand the origins of objectivity.\"",
      "q": [
        {
          "q": "Which newsroom description best states Michael Schudson’s contribution to the origins of objectivity?",
          "o": [
            {
              "t": "Michael Schudson made the origins of objectivity depend on traceable sources, corroboration, and editorial verification. The source trail remains reviewable in the dated record.",
              "v": "expert",
              "fb": "Correct: verification is a process that precedes trust in the writer or the finished story."
            },
            {
              "t": "Michael Schudson treated the origins of objectivity as persuasive storytelling whenever the quotations fit the article's theme. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A quotation that fits the theme still needs a real speaker and reliable context."
            },
            {
              "t": "Michael Schudson let confidentiality settle the origins of objectivity while withholding the central source trail from editors. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "Source protection does not prevent responsible internal verification."
            },
            {
              "t": "Michael Schudson used the public impact of the origins of objectivity as proof that every reported detail was accurate. The preferred narrative receives priority over verification.",
              "v": "danger",
              "fb": "Influence measures circulation and consequence, not the truth of reported details."
            }
          ]
        },
        {
          "q": "What editorial action most closely follows the practice explained in the profile?",
          "o": [
            {
              "t": "Check the central people, records, and quotations before publication, and preserve the supporting trail. It remains checkable in the dated record in the case file.",
              "v": "expert",
              "fb": "Yes: the core claim deserves the strongest checking because the article depends on it."
            },
            {
              "t": "Verify peripheral dates carefully, but accept the anonymous source who supplies the main accusation. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Accurate background details cannot compensate for an unverified central source."
            },
            {
              "t": "Use the reporter's previous awards as evidence that the incomplete source file is treated as reliable. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Past performance may justify confidence, but not abandonment of ordinary editorial controls."
            },
            {
              "t": "Publish first to protect the scoop, and call every later contradiction an attack on the newspaper. The preferred narrative sets the order of review in the case file.",
              "v": "danger",
              "fb": "Competition cannot turn unresolved sourcing into verified reporting."
            }
          ]
        },
        {
          "q": "What professional rule follows most clearly from the origins of objectivity?",
          "o": [
            {
              "t": "A newsroom should preserve a checkable route from every important claim back to its source. The evidence remains open under the documented sequence in the case file.",
              "v": "expert",
              "fb": "Exactly: readers receive a conclusion, while editors must retain the route by which it was verified."
            },
            {
              "t": "More quotations should make reporting reliable even when all of them repeat one unverified account. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Repeated dependence on one source creates volume, not independent corroboration."
            },
            {
              "t": "Balanced accusations should count as objective regardless of the evidence supporting either side. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "Symmetrical presentation can disguise a large asymmetry in evidence."
            },
            {
              "t": "The article is treated as a historic exposé or a harmless mistake that needs no internal review. Publication prestige is treated as evidence of source reliability.",
              "v": "danger",
              "fb": "A qualified institutional failure can be serious without fitting either theatrical label."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "factchecker": {
      "newsroom": "Fact-Checker Jonah Pell catches you at the newsroom floor between ringing phones and locked source drawers. \"Flagged the quotes he couldn't verify — and was told to move on. A sentence can survive print while the person inside it never existed.\"",
      "editdesk": "Fact-Checker Jonah Pell catches you at the editor's desk between ringing phones and locked source drawers. \"Flagged the quotes he couldn't verify — and was told to move on. A sentence can survive print while the person inside it never existed.\"",
      "sourcefiles": "Fact-Checker Jonah Pell catches you at the source & fact-check files between ringing phones and locked source drawers. \"Flagged the quotes he couldn't verify — and was told to move on. A sentence can survive print while the person inside it never existed.\""
    },
    "clerk": {
      "newsroom": "The Records Clerk catches you at the newsroom floor between ringing phones and locked source drawers. \"Keeps the assignment logs and the source file that came back empty. A sentence can survive print while the person inside it never existed.\"",
      "editdesk": "The Records Clerk catches you at the editor's desk between ringing phones and locked source drawers. \"Keeps the assignment logs and the source file that came back empty. A sentence can survive print while the person inside it never existed.\"",
      "sourcefiles": "The Records Clerk catches you at the source & fact-check files between ringing phones and locked source drawers. \"Keeps the assignment logs and the source file that came back empty. A sentence can survive print while the person inside it never existed.\""
    },
    "stringer": {
      "newsroom": "Local Stringer Ames catches you at the newsroom floor between ringing phones and locked source drawers. \"Worked the same town; none of the named witnesses ever existed. A sentence can survive print while the person inside it never existed.\"",
      "editdesk": "Local Stringer Ames catches you at the editor's desk between ringing phones and locked source drawers. \"Worked the same town; none of the named witnesses ever existed. A sentence can survive print while the person inside it never existed.\"",
      "sourcefiles": "Local Stringer Ames catches you at the source & fact-check files between ringing phones and locked source drawers. \"Worked the same town; none of the named witnesses ever existed. A sentence can survive print while the person inside it never existed.\""
    }
  },
  "story": [
    "<b>The Ashford Dispatch</b> opens inside the Ashford Dispatch review, where the public explanation has hardened faster than the evidence.",
    "<b>Fact-Checker Jonah Pell</b>, <b>The Records Clerk</b>, and <b>Local Stringer Ames</b> hold different parts of the record, and every conversation begins with one real figure whose work teaches you how to read it.",
    "The case keeps pulling investigators toward <b>An outside plot planted lies to smear the paper</b> or <b>Nothing sinister — an honest reporting error</b>. Both are plausible enough to survive a headline; neither should survive the full dossier untested.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide the <b>WHAT</b> for yourself."
  ],
  "endings": {
    "overclaimWhat": "smear",
    "dismissalWhat": "mistake",
    "win": {
      "expertTitle": "The Source File Is Empty",
      "expert": [
        "You identify <b>Corin Faye — the star reporter</b>, trace the failure to <b>The Source & Fact-Check Files</b>, and prove <b>Invented sources waved past every check</b>. Not an outside plot planted lies to smear the paper. Not nothing sinister — an honest reporting error.",
        "The witnesses cannot be found because they were authored with the articles. Editors ignored failed checks, allowing invented sourcing to acquire institutional prestige through publication and prizes."
      ],
      "soundTitle": "The Retraction Has a Basis",
      "sound": [
        "Your conclusion correctly joins <b>Corin Faye — the star reporter</b>, <b>The Source & Fact-Check Files</b>, and <b>Invented sources waved past every check</b>. The empty files and nonexistent local witnesses support the retraction.",
        "You do not reconstruct every invented interview, but the newsroom can no longer describe the series as a good-faith reporting mistake. The failure crossed repeated editorial checkpoints."
      ],
      "namedTitle": "The Fabricated Byline",
      "named": [
        "You select the right answer: <b>Corin Faye — the star reporter</b>, exposed through <b>The Source & Fact-Check Files</b>, responsible for <b>Invented sources waved past every check</b>.",
        "The proof is stated briefly, yet it directs the review toward the source records and the ignored fact-check warnings."
      ]
    },
    "overclaim": {
      "title": "The Paper Cast as Victim",
      "body": [
        "You announce <b>An outside plot planted lies to smear the paper</b>, turning missing sources into evidence of an enemy clever enough to infiltrate every article and file.",
        "That theory collapses under ordinary newsroom records and makes the paper look unwilling to investigate itself. The specific fabrication becomes easier for defenders to dismiss as partisan accusation."
      ]
    },
    "dismissal": {
      "title": "A Mistake Repeated for Awards",
      "body": [
        "You accept <b>Nothing sinister — an honest reporting error</b>, although the unverifiable quotations recur across a series and survived explicit internal warnings.",
        "Calling the pattern accidental leaves the reporter’s method and the editor’s override untouched. Future stories can pass through the same empty source check."
      ]
    },
    "wrongNames": {
      "title": "The Fabrication, Wrong Desk",
      "body": [
        "You establish <b>Invented sources waved past every check</b>, but blame the wrong newsroom authority or place the exposure somewhere other than the source files. The assignment trail leads instead to"
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A newspaper page and an empty source file\"><path d=\"M50 24 L286 24 L286 116 L50 116 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M68 44 L180 44 M68 60 L262 60 M68 76 L262 76 M68 92 L210 92\" stroke=\"#121212\" stroke-width=\"1.2\"/><path d=\"M346 36 L566 36 L566 106 L346 106 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M366 54 L548 54 M366 72 L472 72\" stroke=\"#e2e2d8\" stroke-width=\"1.2\"/><circle cx=\"514\" cy=\"84\" r=\"14\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2\"/><path d=\"M506 84 L522 84\" stroke=\"#B3261E\" stroke-width=\"2\"/><path d=\"M286 70 L346 70\" stroke=\"#326891\" stroke-width=\"2\" stroke-dasharray=\"5 5\"/></svg>"
}};
