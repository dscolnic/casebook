module.exports = { PACK: {
  "id": "j_convict",
  "title": "The Vale Conviction",
  "discipline": "Law: Criminal Evidence & Due Process",
  "teaser": "A man is doing life for a killing he swears he never did. A vast plot to frame him? Just a guilty man's excuses? Or something the jury was never allowed to see?",
  "overclaimTag": "a vast frame-up conspiracy",
  "truthTag": "a buried exculpatory file",
  "venue": "the Vale conviction-review inquiry",
  "agent": {
    "name": "Investigator Ruth Calder",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Review-board credibility",
  "readingShort": "Jurists",
  "readingLabel": "Jurists of Evidence & Proof",
  "dossierName": "JURISTS OF EVIDENCE",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Vale conviction-review",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The WHERE you test determines the dossier, and the conversation costs one day.",
  "overclaimTease": "A universal frame-up is easier to proclaim than a specific failure is to prove from the record.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "prosecutor",
      "items": [
        {
          "id": "detective",
          "label": "The lead detective"
        },
        {
          "id": "prosecutor",
          "label": "District Attorney Miles Crade — the prosecutor"
        },
        {
          "id": "judge",
          "label": "The trial judge"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "dafiles",
      "items": [
        {
          "id": "precinct",
          "label": "The Police Precinct & Lineup Room"
        },
        {
          "id": "courthouse",
          "label": "The Courthouse & Trial Record"
        },
        {
          "id": "dafiles",
          "label": "The District Attorney's Case Files"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "brady",
      "items": [
        {
          "id": "frameup",
          "label": "A vast conspiracy framed an innocent man"
        },
        {
          "id": "guilty",
          "label": "Nothing amiss — the right man was convicted"
        },
        {
          "id": "brady",
          "label": "A buried exculpatory file & a rigged lineup"
        }
      ]
    }
  },
  "PLACES": {
    "precinct": {
      "name": "The Police Precinct & Lineup Room",
      "xy": [
        140,
        90
      ]
    },
    "courthouse": {
      "name": "The Courthouse & Trial Record",
      "xy": [
        330,
        240
      ]
    },
    "dafiles": {
      "name": "The District Attorney's Case Files",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "precinct",
      "courthouse"
    ],
    [
      "courthouse",
      "dafiles"
    ]
  ],
  "CHARACTERS": {
    "paralegal": {
      "name": "Paralegal Nora Wyss",
      "role": "Defense paralegal",
      "face": "📎",
      "badge": "N",
      "legend": "the defense office",
      "hint": "Boxed the old case file; found a lab report the defense was never handed."
    },
    "clerk": {
      "name": "The Court Clerk",
      "role": "Courthouse records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the courthouse",
      "hint": "Keeps the transcript and the exhibit log that never quite matched."
    },
    "sergeant": {
      "name": "Desk Sergeant Boone",
      "role": "Retired desk sergeant",
      "face": "🚔",
      "badge": "B",
      "legend": "the precinct",
      "hint": "Ran the room the night of the lineup; saw the witness steered to a face."
    }
  },
  "TOPICMAP": {
    "precinct": {
      "paralegal": [
        "dueprocess"
      ],
      "clerk": [
        "presumption"
      ],
      "sergeant": [
        "cautionrule"
      ]
    },
    "courthouse": {
      "paralegal": [
        "proof"
      ],
      "clerk": [
        "testimony"
      ],
      "sergeant": [
        "exclusion"
      ]
    },
    "dafiles": {
      "paralegal": [
        "disclosure"
      ],
      "clerk": [
        "memory"
      ],
      "sergeant": [
        "dnaexon"
      ]
    }
  },
  "TOPICS": {
    "dueprocess": {
      "sci": "Edward Coke (1552-1634)",
      "topic": "Due process & the law of the land",
      "lede": "Edward Coke placed due process and the law of the land inside the procedures that make criminal proof reliable or dangerously fragile.",
      "no": 1,
      "profile": "Today’s evidence briefing examines Edward Coke and the legal safeguards surrounding due process and the law of the land. Edward Coke invoked the 'law of the land' and resisted claims of unlimited royal authority, helping shape later ideas of due process and legal constraint. Criminal adjudication asks institutions to make irreversible judgments from memories, documents, physical traces, expert claims, and official choices. Coke’s contribution illuminates where error enters and which procedures permit it to be detected.\n\nThe evidentiary task is to require government to act through established law, lawful jurisdiction, and procedures that give affected people a meaningful chance to answer. Reliability requires attention to collection, custody, disclosure, suggestion, independence, and the opportunity for adversarial testing. Several witnesses do not provide independent support when they learned the same fact from one another or from an investigator.\n\nDue process does not presume that every official acts badly; it presumes that power and human judgment need structured checks. A lawful conviction may still rest on undisclosed evidence or a contaminated identification, while a procedural flaw does not automatically prove innocence. The remedy begins by identifying the exact failure and its effect on proof.\n\nThe legal lesson is procedure is a protection against arbitrary power, not a technical favor granted after the result is chosen. Confidence in a verdict must follow tested evidence rather than substitute for it. The earliest uncontaminated account often deserves special weight because later confidence can grow as accuracy declines. A prosecutor’s file and a police file cannot be treated as separate worlds when disclosure duties cover the prosecution team.",
      "frame": "Opens the exhibit log beside a sealed report. \"At The Police Precinct & Lineup Room, what the jury never saw matters. Explain due process and the law of the land.\"",
      "q": [
        {
          "q": "Which evidentiary statement best captures Edward Coke’s work on due process and the law of the land?",
          "o": [
            {
              "t": "Edward Coke made due process and the law of the land depend on disclosure, reliability, adversarial testing, and the burden of proof. The evidence remains open in the operational record in the case file.",
              "v": "expert",
              "fb": "Correct: procedural safeguards protect the reliability of proof as well as the rights of the accused."
            },
            {
              "t": "Edward Coke treated due process and the law of the land as reliable whenever a sincere witness expressed strong confidence. Reliability remains unresolved under the documented sequence in the case file.",
              "v": "partial",
              "fb": "Sincerity bears on honesty, while perception and memory require separate evaluation."
            },
            {
              "t": "Edward Coke let the guilty verdict settle due process and the law of the land without reviewing the investigation that shaped the record. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "A verdict evaluates the record presented; it cannot validate evidence the jury never received."
            },
            {
              "t": "Edward Coke used one official error in due process and the law of the land as proof of a system-wide conspiracy to frame the accused. The preferred narrative sets the order of review in the case file.",
              "v": "danger",
              "fb": "A specific documented violation can be grave without establishing universal coordination."
            }
          ]
        },
        {
          "q": "Which case review best follows the method described in this profile?",
          "o": [
            {
              "t": "Compare disclosure, custody, identification procedures, testimony, and independent physical evidence. It remains checkable in the dated record in the case file.",
              "v": "expert",
              "fb": "Yes: review must reconstruct both the evidence and the procedure that shaped what reached the jury."
            },
            {
              "t": "Read the trial transcript alone, and assume omitted reports could not have assisted the defense. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A transcript cannot reveal favorable material that was withheld before trial."
            },
            {
              "t": "Ask whether officers believed the suspect was guilty, and treat that belief as fair procedure. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Good faith does not make a suggestive identification or suppressed report reliable."
            },
            {
              "t": "Search for a vast conspiracy first, while leaving lineup instructions and missing files unread. The preferred narrative sets the order of review in the case file.",
              "v": "danger",
              "fb": "Concrete procedural records offer a stronger path than an accusation that explains everything."
            }
          ]
        },
        {
          "q": "Which due-process finding is most defensible after studying due process and the law of the land?",
          "o": [
            {
              "t": "A legal remedy should address the proven procedural failure and its demonstrated effect on the verdict. It remains checkable in the operational record.",
              "v": "expert",
              "fb": "Exactly: legal review identifies the violation, tests materiality, and preserves the distinction between error and innocence."
            },
            {
              "t": "Any procedural violation should prove factual innocence even when the missing evidence was immaterial. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A serious violation can require relief without logically deciding every factual question."
            },
            {
              "t": "A conviction should remain untouched whenever police and prosecutors deny intentional misconduct. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Due process protects against harmful suppression and suggestion, including conduct not admitted as intentional."
            },
            {
              "t": "The case is treated as flawless or a coordinated plot involving every investigator, lawyer, and judge. Conspiracy becomes the organizing theory before case review.",
              "v": "danger",
              "fb": "Specific evidence can support a consequential middle finding between those absolutes."
            }
          ]
        }
      ]
    },
    "presumption": {
      "sci": "Cesare Beccaria (1738-1794)",
      "topic": "The presumption of innocence",
      "lede": "Cesare Beccaria used the presumption of innocence to test disclosure, memory, identification, and the burden carried by the state.",
      "no": 2,
      "profile": "Today’s evidence briefing examines Cesare Beccaria and the legal safeguards surrounding the presumption of innocence. Cesare Beccaria condemned torture, secret accusation, and excessive punishment while treating an accused person as innocent until lawfully proved guilty. Criminal adjudication asks institutions to make irreversible judgments from memories, documents, physical traces, expert claims, and official choices. Beccaria’s contribution illuminates where error enters and which procedures permit it to be detected.\n\nThe evidentiary task is to limit punishment through public law, proportionality, prompt process, and proof rather than coerced confession. Reliability requires attention to collection, custody, disclosure, suggestion, independence, and the opportunity for adversarial testing. Several witnesses do not provide independent support when they learned the same fact from one another or from an investigator.\n\nDue process does not presume that every official acts badly; it presumes that power and human judgment need structured checks. A lawful conviction may still rest on undisclosed evidence or a contaminated identification, while a procedural flaw does not automatically prove innocence. The remedy begins by identifying the exact failure and its effect on proof.\n\nThe legal lesson is the presumption of innocence restrains officials before trial as well as jurors at the verdict. Confidence in a verdict must follow tested evidence rather than substitute for it. The earliest uncontaminated account often deserves special weight because later confidence can grow as accuracy declines. A prosecutor’s file and a police file cannot be treated as separate worlds when disclosure duties cover the prosecution team. The earliest uncontaminated account often deserves special weight because later confidence can grow as accuracy declines.",
      "frame": "Holds the transcript at a missing page. \"A verdict closes a trial, not every evidentiary question. Start with the presumption of innocence.\"",
      "q": [
        {
          "q": "Which evidentiary statement best captures Cesare Beccaria’s work on the presumption of innocence?",
          "o": [
            {
              "t": "Cesare Beccaria made the presumption of innocence depend on disclosure, reliability, adversarial testing, and the burden of proof. The evidence remains open in the operational record in the case file.",
              "v": "expert",
              "fb": "Correct: procedural safeguards protect the reliability of proof as well as the rights of the accused."
            },
            {
              "t": "Cesare Beccaria treated the presumption of innocence as reliable whenever a sincere witness expressed strong confidence. Reliability remains unresolved under the documented sequence in the case file.",
              "v": "partial",
              "fb": "Sincerity bears on honesty, while perception and memory require separate evaluation."
            },
            {
              "t": "Cesare Beccaria let the guilty verdict settle the presumption of innocence without reviewing the investigation that shaped the record. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "A verdict evaluates the record presented; it cannot validate evidence the jury never received."
            },
            {
              "t": "Cesare Beccaria used one official error in the presumption of innocence as proof of a system-wide conspiracy to frame the accused. The preferred narrative sets the order of review in the case file.",
              "v": "danger",
              "fb": "A specific documented violation can be grave without establishing universal coordination."
            }
          ]
        },
        {
          "q": "Which case review best follows the method described in this profile?",
          "o": [
            {
              "t": "Compare disclosure, custody, identification procedures, testimony, and independent physical evidence. It remains checkable in the dated record in the case file.",
              "v": "expert",
              "fb": "Yes: review must reconstruct both the evidence and the procedure that shaped what reached the jury."
            },
            {
              "t": "Read the trial transcript alone, and assume omitted reports could not have assisted the defense. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A transcript cannot reveal favorable material that was withheld before trial."
            },
            {
              "t": "Ask whether officers believed the suspect was guilty, and treat that belief as fair procedure. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Good faith does not make a suggestive identification or suppressed report reliable."
            },
            {
              "t": "Search for a vast conspiracy first, while leaving lineup instructions and missing files unread. The preferred narrative sets the order of review in the case file.",
              "v": "danger",
              "fb": "Concrete procedural records offer a stronger path than an accusation that explains everything."
            }
          ]
        },
        {
          "q": "Which due-process finding is most defensible after studying the presumption of innocence?",
          "o": [
            {
              "t": "A legal remedy should address the proven procedural failure and its demonstrated effect on the verdict. It remains checkable in the operational record.",
              "v": "expert",
              "fb": "Exactly: legal review identifies the violation, tests materiality, and preserves the distinction between error and innocence."
            },
            {
              "t": "Any procedural violation should prove factual innocence even when the missing evidence was immaterial. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A serious violation can require relief without logically deciding every factual question."
            },
            {
              "t": "A conviction should remain untouched whenever police and prosecutors deny intentional misconduct. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Due process protects against harmful suppression and suggestion, including conduct not admitted as intentional."
            },
            {
              "t": "The case is treated as flawless or a coordinated plot involving every investigator, lawyer, and judge. Conspiracy becomes the organizing theory before case review.",
              "v": "danger",
              "fb": "Specific evidence can support a consequential middle finding between those absolutes."
            }
          ]
        }
      ]
    },
    "cautionrule": {
      "sci": "Matthew Hale (1609-1676)",
      "topic": "The caution against easy accusation",
      "lede": "The verdict could not outrank the evidence trail in Matthew Hale's account of the caution against easy accusation.",
      "no": 3,
      "profile": "Today’s evidence briefing examines Matthew Hale and the legal safeguards surrounding the caution against easy accusation. Matthew Hale warned against convicting for rape solely on an accusation that was difficult to disprove, a caution later criticized because it fostered discriminatory distrust of complainants. Criminal adjudication asks institutions to make irreversible judgments from memories, documents, physical traces, expert claims, and official choices. Hale’s contribution illuminates where error enters and which procedures permit it to be detected.\n\nThe evidentiary task is to separate a legitimate concern about uncorroborated proof from categorical assumptions about a class of witnesses. Reliability requires attention to collection, custody, disclosure, suggestion, independence, and the opportunity for adversarial testing. Several witnesses do not provide independent support when they learned the same fact from one another or from an investigator.\n\nDue process does not presume that every official acts badly; it presumes that power and human judgment need structured checks. A lawful conviction may still rest on undisclosed evidence or a contaminated identification, while a procedural flaw does not automatically prove innocence. The remedy begins by identifying the exact failure and its effect on proof.\n\nThe legal lesson is historical safeguards can encode prejudice when caution is applied selectively rather than through neutral evidentiary standards. Confidence in a verdict must follow tested evidence rather than substitute for it. The earliest uncontaminated account often deserves special weight because later confidence can grow as accuracy declines. A prosecutor’s file and a police file cannot be treated as separate worlds when disclosure duties cover the prosecution team.",
      "frame": "Sets six lineup photographs in a row. \"Confidence came later. Show me what the caution against easy accusation requires first.\"",
      "q": [
        {
          "q": "Which evidentiary statement best captures Matthew Hale’s work on the caution against easy accusation?",
          "o": [
            {
              "t": "Matthew Hale made the caution against easy accusation depend on disclosure, reliability, adversarial testing, and the burden of proof. The evidence remains open in the operational record in the case file.",
              "v": "expert",
              "fb": "Correct: procedural safeguards protect the reliability of proof as well as the rights of the accused."
            },
            {
              "t": "Matthew Hale treated the caution against easy accusation as reliable whenever a sincere witness expressed strong confidence. Reliability remains unresolved under the documented sequence in the case file.",
              "v": "partial",
              "fb": "Sincerity bears on honesty, while perception and memory require separate evaluation."
            },
            {
              "t": "Matthew Hale let the guilty verdict settle the caution against easy accusation without reviewing the investigation that shaped the record. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "A verdict evaluates the record presented; it cannot validate evidence the jury never received."
            },
            {
              "t": "Matthew Hale used one official error in the caution against easy accusation as proof of a system-wide conspiracy to frame the accused. The preferred narrative sets the order of review in the case file.",
              "v": "danger",
              "fb": "A specific documented violation can be grave without establishing universal coordination."
            }
          ]
        },
        {
          "q": "Which case review best follows the method described in this profile?",
          "o": [
            {
              "t": "Compare disclosure, custody, identification procedures, testimony, and independent physical evidence. It remains checkable in the dated record in the case file.",
              "v": "expert",
              "fb": "Yes: review must reconstruct both the evidence and the procedure that shaped what reached the jury."
            },
            {
              "t": "Read the trial transcript alone, and assume omitted reports could not have assisted the defense. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A transcript cannot reveal favorable material that was withheld before trial."
            },
            {
              "t": "Ask whether officers believed the suspect was guilty, and treat that belief as fair procedure. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Good faith does not make a suggestive identification or suppressed report reliable."
            },
            {
              "t": "Search for a vast conspiracy first, while leaving lineup instructions and missing files unread. The preferred narrative sets the order of review in the case file.",
              "v": "danger",
              "fb": "Concrete procedural records offer a stronger path than an accusation that explains everything."
            }
          ]
        },
        {
          "q": "Which due-process finding is most defensible after studying the caution against easy accusation?",
          "o": [
            {
              "t": "A legal remedy should address the proven procedural failure and its demonstrated effect on the verdict. It remains checkable in the operational record.",
              "v": "expert",
              "fb": "Exactly: legal review identifies the violation, tests materiality, and preserves the distinction between error and innocence."
            },
            {
              "t": "Any procedural violation should prove factual innocence even when the missing evidence was immaterial. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A serious violation can require relief without logically deciding every factual question."
            },
            {
              "t": "A conviction should remain untouched whenever police and prosecutors deny intentional misconduct. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Due process protects against harmful suppression and suggestion, including conduct not admitted as intentional."
            },
            {
              "t": "The case is treated as flawless or a coordinated plot involving every investigator, lawyer, and judge. Conspiracy becomes the organizing theory before case review.",
              "v": "danger",
              "fb": "Specific evidence can support a consequential middle finding between those absolutes."
            }
          ]
        }
      ]
    },
    "proof": {
      "sci": "James Fitzjames Stephen (1829-1894)",
      "topic": "The criminal law & the burden of proof",
      "lede": "James Fitzjames Stephen placed the criminal law and the burden of proof inside the procedures that make criminal proof reliable or dangerously fragile.",
      "no": 4,
      "profile": "Today’s evidence briefing examines James Fitzjames Stephen and the legal safeguards surrounding the criminal law and the burden of proof. James Fitzjames Stephen codified and analyzed criminal law and evidence, emphasizing structured legal rules and the prosecution's burden. Criminal adjudication asks institutions to make irreversible judgments from memories, documents, physical traces, expert claims, and official choices. Stephen’s contribution illuminates where error enters and which procedures permit it to be detected.\n\nThe evidentiary task is to define elements of the offense and require the prosecution to establish each through admissible, persuasive proof. Reliability requires attention to collection, custody, disclosure, suggestion, independence, and the opportunity for adversarial testing. Several witnesses do not provide independent support when they learned the same fact from one another or from an investigator.\n\nDue process does not presume that every official acts badly; it presumes that power and human judgment need structured checks. A lawful conviction may still rest on undisclosed evidence or a contaminated identification, while a procedural flaw does not automatically prove innocence. The remedy begins by identifying the exact failure and its effect on proof.\n\nThe legal lesson is suspicion about a defendant cannot fill a missing element in the prosecution's case. Confidence in a verdict must follow tested evidence rather than substitute for it. The earliest uncontaminated account often deserves special weight because later confidence can grow as accuracy declines. A prosecutor’s file and a police file cannot be treated as separate worlds when disclosure duties cover the prosecution team. The earliest uncontaminated account often deserves special weight because later confidence can grow as accuracy declines.",
      "frame": "Opens the exhibit log beside a sealed report. \"At The Courthouse & Trial Record, what the jury never saw matters. Explain the criminal law and the burden of proof.\"",
      "q": [
        {
          "q": "Which evidentiary statement best captures James Fitzjames Stephen’s work on the criminal law and the burden of proof?",
          "o": [
            {
              "t": "James Fitzjames Stephen made the criminal law and the burden of proof depend on disclosure, reliability, adversarial testing, and the burden of proof. The evidence remains open in the operational record in the case file.",
              "v": "expert",
              "fb": "Correct: procedural safeguards protect the reliability of proof as well as the rights of the accused."
            },
            {
              "t": "James Fitzjames Stephen treated the criminal law and the burden of proof as reliable whenever a sincere witness expressed strong confidence. Reliability remains unresolved under the documented sequence in the case file.",
              "v": "partial",
              "fb": "Sincerity bears on honesty, while perception and memory require separate evaluation."
            },
            {
              "t": "James Fitzjames Stephen let the guilty verdict settle the criminal law and the burden of proof without reviewing the investigation that shaped the record. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "A verdict evaluates the record presented; it cannot validate evidence the jury never received."
            },
            {
              "t": "James Fitzjames Stephen used one official error in the criminal law and the burden of proof as proof of a system-wide conspiracy to frame the accused. The preferred narrative sets the order of review in the case file.",
              "v": "danger",
              "fb": "A specific documented violation can be grave without establishing universal coordination."
            }
          ]
        },
        {
          "q": "Which case review best follows the method described in this profile?",
          "o": [
            {
              "t": "Compare disclosure, custody, identification procedures, testimony, and independent physical evidence. It remains checkable in the dated record in the case file.",
              "v": "expert",
              "fb": "Yes: review must reconstruct both the evidence and the procedure that shaped what reached the jury."
            },
            {
              "t": "Read the trial transcript alone, and assume omitted reports could not have assisted the defense. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A transcript cannot reveal favorable material that was withheld before trial."
            },
            {
              "t": "Ask whether officers believed the suspect was guilty, and treat that belief as fair procedure. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Good faith does not make a suggestive identification or suppressed report reliable."
            },
            {
              "t": "Search for a vast conspiracy first, while leaving lineup instructions and missing files unread. The preferred narrative sets the order of review in the case file.",
              "v": "danger",
              "fb": "Concrete procedural records offer a stronger path than an accusation that explains everything."
            }
          ]
        },
        {
          "q": "Which due-process finding is most defensible after studying the criminal law and the burden of proof?",
          "o": [
            {
              "t": "A legal remedy should address the proven procedural failure and its demonstrated effect on the verdict. It remains checkable in the operational record.",
              "v": "expert",
              "fb": "Exactly: legal review identifies the violation, tests materiality, and preserves the distinction between error and innocence."
            },
            {
              "t": "Any procedural violation should prove factual innocence even when the missing evidence was immaterial. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A serious violation can require relief without logically deciding every factual question."
            },
            {
              "t": "A conviction should remain untouched whenever police and prosecutors deny intentional misconduct. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Due process protects against harmful suppression and suggestion, including conduct not admitted as intentional."
            },
            {
              "t": "The case is treated as flawless or a coordinated plot involving every investigator, lawyer, and judge. Conspiracy becomes the organizing theory before case review.",
              "v": "danger",
              "fb": "Specific evidence can support a consequential middle finding between those absolutes."
            }
          ]
        }
      ]
    },
    "testimony": {
      "sci": "Hugo Münsterberg (1863-1916)",
      "topic": "The psychology of the witness stand",
      "lede": "Hugo Münsterberg used the psychology of the witness stand to test disclosure, memory, identification, and the burden carried by the state.",
      "no": 5,
      "profile": "Today’s evidence briefing examines Hugo Münsterberg and the legal safeguards surrounding the psychology of the witness stand. Hugo Münsterberg argued that perception, memory, suggestion, and confidence can make sincere eyewitnesses mistaken, bringing experimental psychology into legal debate. Criminal adjudication asks institutions to make irreversible judgments from memories, documents, physical traces, expert claims, and official choices. Münsterberg’s contribution illuminates where error enters and which procedures permit it to be detected.\n\nThe evidentiary task is to test viewing conditions, delay, suggestion, confidence formation, and consistency without assuming sincerity guarantees accuracy. Reliability requires attention to collection, custody, disclosure, suggestion, independence, and the opportunity for adversarial testing. Several witnesses do not provide independent support when they learned the same fact from one another or from an investigator.\n\nDue process does not presume that every official acts badly; it presumes that power and human judgment need structured checks. A lawful conviction may still rest on undisclosed evidence or a contaminated identification, while a procedural flaw does not automatically prove innocence. The remedy begins by identifying the exact failure and its effect on proof.\n\nThe legal lesson is an honest witness can be wrong, and confident recollection can be shaped after the event. Confidence in a verdict must follow tested evidence rather than substitute for it. The earliest uncontaminated account often deserves special weight because later confidence can grow as accuracy declines. A prosecutor’s file and a police file cannot be treated as separate worlds when disclosure duties cover the prosecution team. The earliest uncontaminated account often deserves special weight because later confidence can grow as accuracy declines.",
      "frame": "Holds the transcript at a missing page. \"A verdict closes a trial, not every evidentiary question. Start with the psychology of the witness stand.\"",
      "q": [
        {
          "q": "Which evidentiary statement best captures Hugo Münsterberg’s work on the psychology of the witness stand?",
          "o": [
            {
              "t": "Hugo Münsterberg made the psychology of the witness stand depend on disclosure, reliability, adversarial testing, and the burden of proof. The evidence remains open in the operational record in the case file.",
              "v": "expert",
              "fb": "Correct: procedural safeguards protect the reliability of proof as well as the rights of the accused."
            },
            {
              "t": "Hugo Münsterberg treated the psychology of the witness stand as reliable whenever a sincere witness expressed strong confidence. Reliability remains unresolved under the documented sequence in the case file.",
              "v": "partial",
              "fb": "Sincerity bears on honesty, while perception and memory require separate evaluation."
            },
            {
              "t": "Hugo Münsterberg let the guilty verdict settle the psychology of the witness stand without reviewing the investigation that shaped the record. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "A verdict evaluates the record presented; it cannot validate evidence the jury never received."
            },
            {
              "t": "Hugo Münsterberg used one official error in the psychology of the witness stand as proof of a system-wide conspiracy to frame the accused. The preferred narrative sets the order of review in the case file.",
              "v": "danger",
              "fb": "A specific documented violation can be grave without establishing universal coordination."
            }
          ]
        },
        {
          "q": "Which case review best follows the method described in this profile?",
          "o": [
            {
              "t": "Compare disclosure, custody, identification procedures, testimony, and independent physical evidence. It remains checkable in the dated record in the case file.",
              "v": "expert",
              "fb": "Yes: review must reconstruct both the evidence and the procedure that shaped what reached the jury."
            },
            {
              "t": "Read the trial transcript alone, and assume omitted reports could not have assisted the defense. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A transcript cannot reveal favorable material that was withheld before trial."
            },
            {
              "t": "Ask whether officers believed the suspect was guilty, and treat that belief as fair procedure. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Good faith does not make a suggestive identification or suppressed report reliable."
            },
            {
              "t": "Search for a vast conspiracy first, while leaving lineup instructions and missing files unread. The preferred narrative sets the order of review in the case file.",
              "v": "danger",
              "fb": "Concrete procedural records offer a stronger path than an accusation that explains everything."
            }
          ]
        },
        {
          "q": "Which due-process finding is most defensible after studying the psychology of the witness stand?",
          "o": [
            {
              "t": "A legal remedy should address the proven procedural failure and its demonstrated effect on the verdict. It remains checkable in the operational record.",
              "v": "expert",
              "fb": "Exactly: legal review identifies the violation, tests materiality, and preserves the distinction between error and innocence."
            },
            {
              "t": "Any procedural violation should prove factual innocence even when the missing evidence was immaterial. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A serious violation can require relief without logically deciding every factual question."
            },
            {
              "t": "A conviction should remain untouched whenever police and prosecutors deny intentional misconduct. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Due process protects against harmful suppression and suggestion, including conduct not admitted as intentional."
            },
            {
              "t": "The case is treated as flawless or a coordinated plot involving every investigator, lawyer, and judge. Conspiracy becomes the organizing theory before case review.",
              "v": "danger",
              "fb": "Specific evidence can support a consequential middle finding between those absolutes."
            }
          ]
        }
      ]
    },
    "exclusion": {
      "sci": "Benjamin Cardozo (1870-1938)",
      "topic": "The exclusionary rule & the constable's blunder",
      "lede": "The verdict could not outrank the evidence trail in Benjamin Cardozo's account of the exclusionary rule and the constable’s blunder.",
      "no": 6,
      "profile": "Today’s evidence briefing examines Benjamin Cardozo and the legal safeguards surrounding the exclusionary rule and the constable’s blunder. Benjamin Cardozo criticized the exclusionary rule with the phrase that the criminal might go free because the constable blundered, framing a lasting debate about remedies for unlawful searches. Criminal adjudication asks institutions to make irreversible judgments from memories, documents, physical traces, expert claims, and official choices. Cardozo’s contribution illuminates where error enters and which procedures permit it to be detected.\n\nThe evidentiary task is to weigh deterrence, judicial integrity, reliability, and alternative remedies when government obtains evidence illegally. Reliability requires attention to collection, custody, disclosure, suggestion, independence, and the opportunity for adversarial testing. Several witnesses do not provide independent support when they learned the same fact from one another or from an investigator.\n\nDue process does not presume that every official acts badly; it presumes that power and human judgment need structured checks. A lawful conviction may still rest on undisclosed evidence or a contaminated identification, while a procedural flaw does not automatically prove innocence. The remedy begins by identifying the exact failure and its effect on proof.\n\nThe legal lesson is a remedy must address official misconduct without pretending that every evidentiary consequence is costless. Confidence in a verdict must follow tested evidence rather than substitute for it. The earliest uncontaminated account often deserves special weight because later confidence can grow as accuracy declines. A prosecutor’s file and a police file cannot be treated as separate worlds when disclosure duties cover the prosecution team.",
      "frame": "Sets six lineup photographs in a row. \"Confidence came later. Show me what the exclusionary rule and the constable’s blunder requires first.\"",
      "q": [
        {
          "q": "Which evidentiary statement best captures Benjamin Cardozo’s work on the exclusionary rule and the constable’s blunder?",
          "o": [
            {
              "t": "Benjamin Cardozo made the exclusionary rule and the constable’s blunder depend on disclosure, reliability, adversarial testing, and the burden of proof. The evidence remains open in the operational record in the case file.",
              "v": "expert",
              "fb": "Correct: procedural safeguards protect the reliability of proof as well as the rights of the accused."
            },
            {
              "t": "Benjamin Cardozo treated the exclusionary rule and the constable’s blunder as reliable whenever a sincere witness expressed strong confidence. Reliability remains unresolved under the documented sequence in the case file.",
              "v": "partial",
              "fb": "Sincerity bears on honesty, while perception and memory require separate evaluation."
            },
            {
              "t": "Benjamin Cardozo let the guilty verdict settle the exclusionary rule and the constable’s blunder without reviewing the investigation that shaped the record. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "A verdict evaluates the record presented; it cannot validate evidence the jury never received."
            },
            {
              "t": "Benjamin Cardozo used one official error in the exclusionary rule and the constable’s blunder as proof of a system-wide conspiracy to frame the accused. The preferred narrative sets the order of review in the case file.",
              "v": "danger",
              "fb": "A specific documented violation can be grave without establishing universal coordination."
            }
          ]
        },
        {
          "q": "Which case review best follows the method described in this profile?",
          "o": [
            {
              "t": "Compare disclosure, custody, identification procedures, testimony, and independent physical evidence. It remains checkable in the dated record in the case file.",
              "v": "expert",
              "fb": "Yes: review must reconstruct both the evidence and the procedure that shaped what reached the jury."
            },
            {
              "t": "Read the trial transcript alone, and assume omitted reports could not have assisted the defense. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A transcript cannot reveal favorable material that was withheld before trial."
            },
            {
              "t": "Ask whether officers believed the suspect was guilty, and treat that belief as fair procedure. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Good faith does not make a suggestive identification or suppressed report reliable."
            },
            {
              "t": "Search for a vast conspiracy first, while leaving lineup instructions and missing files unread. The preferred narrative sets the order of review in the case file.",
              "v": "danger",
              "fb": "Concrete procedural records offer a stronger path than an accusation that explains everything."
            }
          ]
        },
        {
          "q": "Which due-process finding is most defensible after studying the exclusionary rule and the constable’s blunder?",
          "o": [
            {
              "t": "A legal remedy should address the proven procedural failure and its demonstrated effect on the verdict. It remains checkable in the operational record.",
              "v": "expert",
              "fb": "Exactly: legal review identifies the violation, tests materiality, and preserves the distinction between error and innocence."
            },
            {
              "t": "Any procedural violation should prove factual innocence even when the missing evidence was immaterial. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A serious violation can require relief without logically deciding every factual question."
            },
            {
              "t": "A conviction should remain untouched whenever police and prosecutors deny intentional misconduct. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Due process protects against harmful suppression and suggestion, including conduct not admitted as intentional."
            },
            {
              "t": "The case is treated as flawless or a coordinated plot involving every investigator, lawyer, and judge. Conspiracy becomes the organizing theory before case review.",
              "v": "danger",
              "fb": "Specific evidence can support a consequential middle finding between those absolutes."
            }
          ]
        }
      ]
    },
    "disclosure": {
      "sci": "William O. Douglas (1898-1980)",
      "topic": "Brady v. Maryland & the duty to disclose",
      "lede": "William O. Douglas placed brady v. maryland and the duty to disclose inside the procedures that make criminal proof reliable or dangerously fragile.",
      "no": 7,
      "profile": "Today’s evidence briefing examines William O. Douglas and the legal safeguards surrounding brady v. maryland and the duty to disclose. Justice William O. Douglas wrote for the Court in Brady v. Maryland, holding that suppression of material favorable evidence violates due process. Criminal adjudication asks institutions to make irreversible judgments from memories, documents, physical traces, expert claims, and official choices. Douglas’s contribution illuminates where error enters and which procedures permit it to be detected.\n\nThe evidentiary task is to identify evidence favorable to guilt or punishment, disclose it in time for meaningful use, and assess materiality without hiding behind file ownership. Reliability requires attention to collection, custody, disclosure, suggestion, independence, and the opportunity for adversarial testing. Several witnesses do not provide independent support when they learned the same fact from one another or from an investigator.\n\nDue process does not presume that every official acts badly; it presumes that power and human judgment need structured checks. A lawful conviction may still rest on undisclosed evidence or a contaminated identification, while a procedural flaw does not automatically prove innocence. The remedy begins by identifying the exact failure and its effect on proof.\n\nThe legal lesson is the prosecution's duty is to seek justice, which includes revealing evidence that weakens its own case. Confidence in a verdict must follow tested evidence rather than substitute for it. The earliest uncontaminated account often deserves special weight because later confidence can grow as accuracy declines. A prosecutor’s file and a police file cannot be treated as separate worlds when disclosure duties cover the prosecution team.",
      "frame": "Opens the exhibit log beside a sealed report. \"At The District Attorney's Case Files, what the jury never saw matters. Explain brady v. maryland and the duty to disclose.\"",
      "q": [
        {
          "q": "Which evidentiary statement best captures William O. Douglas’s work on brady v. maryland and the duty to disclose?",
          "o": [
            {
              "t": "William O. Douglas made brady v. maryland and the duty to disclose depend on disclosure, reliability, adversarial testing, and the burden of proof. The evidence remains open in the operational record in the case file.",
              "v": "expert",
              "fb": "Correct: procedural safeguards protect the reliability of proof as well as the rights of the accused."
            },
            {
              "t": "William O. Douglas treated brady v. maryland and the duty to disclose as reliable whenever a sincere witness expressed strong confidence. Reliability remains unresolved under the documented sequence in the case file.",
              "v": "partial",
              "fb": "Sincerity bears on honesty, while perception and memory require separate evaluation."
            },
            {
              "t": "William O. Douglas let the guilty verdict settle brady v. maryland and the duty to disclose without reviewing the investigation that shaped the record. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "A verdict evaluates the record presented; it cannot validate evidence the jury never received."
            },
            {
              "t": "William O. Douglas used one official error in brady v. maryland and the duty to disclose as proof of a system-wide conspiracy to frame the accused. The preferred narrative sets the order of review in the case file.",
              "v": "danger",
              "fb": "A specific documented violation can be grave without establishing universal coordination."
            }
          ]
        },
        {
          "q": "Which case review best follows the method described in this profile?",
          "o": [
            {
              "t": "Compare disclosure, custody, identification procedures, testimony, and independent physical evidence. It remains checkable in the dated record in the case file.",
              "v": "expert",
              "fb": "Yes: review must reconstruct both the evidence and the procedure that shaped what reached the jury."
            },
            {
              "t": "Read the trial transcript alone, and assume omitted reports could not have assisted the defense. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A transcript cannot reveal favorable material that was withheld before trial."
            },
            {
              "t": "Ask whether officers believed the suspect was guilty, and treat that belief as fair procedure. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Good faith does not make a suggestive identification or suppressed report reliable."
            },
            {
              "t": "Search for a vast conspiracy first, while leaving lineup instructions and missing files unread. The preferred narrative sets the order of review in the case file.",
              "v": "danger",
              "fb": "Concrete procedural records offer a stronger path than an accusation that explains everything."
            }
          ]
        },
        {
          "q": "Which due-process finding is most defensible after studying brady v. maryland and the duty to disclose?",
          "o": [
            {
              "t": "A legal remedy should address the proven procedural failure and its demonstrated effect on the verdict. It remains checkable in the operational record.",
              "v": "expert",
              "fb": "Exactly: legal review identifies the violation, tests materiality, and preserves the distinction between error and innocence."
            },
            {
              "t": "Any procedural violation should prove factual innocence even when the missing evidence was immaterial. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A serious violation can require relief without logically deciding every factual question."
            },
            {
              "t": "A conviction should remain untouched whenever police and prosecutors deny intentional misconduct. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Due process protects against harmful suppression and suggestion, including conduct not admitted as intentional."
            },
            {
              "t": "The case is treated as flawless or a coordinated plot involving every investigator, lawyer, and judge. Conspiracy becomes the organizing theory before case review.",
              "v": "danger",
              "fb": "Specific evidence can support a consequential middle finding between those absolutes."
            }
          ]
        }
      ]
    },
    "memory": {
      "sci": "Elizabeth Loftus (b. 1944)",
      "topic": "The malleability of memory",
      "lede": "Elizabeth Loftus used the malleability of memory to test disclosure, memory, identification, and the burden carried by the state.",
      "no": 8,
      "profile": "Today’s evidence briefing examines Elizabeth Loftus and the legal safeguards surrounding the malleability of memory. Elizabeth Loftus demonstrated that later wording and suggestion can alter eyewitness reports and even create confident memories of events that did not occur. Criminal adjudication asks institutions to make irreversible judgments from memories, documents, physical traces, expert claims, and official choices. Loftus’s contribution illuminates where error enters and which procedures permit it to be detected.\n\nThe evidentiary task is to use neutral questioning, record initial descriptions, avoid repeated suggestive interviews, and separate confidence from accuracy. Reliability requires attention to collection, custody, disclosure, suggestion, independence, and the opportunity for adversarial testing. Several witnesses do not provide independent support when they learned the same fact from one another or from an investigator.\n\nDue process does not presume that every official acts badly; it presumes that power and human judgment need structured checks. A lawful conviction may still rest on undisclosed evidence or a contaminated identification, while a procedural flaw does not automatically prove innocence. The remedy begins by identifying the exact failure and its effect on proof.\n\nThe legal lesson is memory is reconstructive evidence that can be contaminated while the witness remains sincere. Confidence in a verdict must follow tested evidence rather than substitute for it. The earliest uncontaminated account often deserves special weight because later confidence can grow as accuracy declines. A prosecutor’s file and a police file cannot be treated as separate worlds when disclosure duties cover the prosecution team. The earliest uncontaminated account often deserves special weight because later confidence can grow as accuracy declines.",
      "frame": "Holds the transcript at a missing page. \"A verdict closes a trial, not every evidentiary question. Start with the malleability of memory.\"",
      "q": [
        {
          "q": "Which evidentiary statement best captures Elizabeth Loftus’s work on the malleability of memory?",
          "o": [
            {
              "t": "Elizabeth Loftus made the malleability of memory depend on disclosure, reliability, adversarial testing, and the burden of proof. The evidence remains open in the operational record in the case file.",
              "v": "expert",
              "fb": "Correct: procedural safeguards protect the reliability of proof as well as the rights of the accused."
            },
            {
              "t": "Elizabeth Loftus treated the malleability of memory as reliable whenever a sincere witness expressed strong confidence. Reliability remains unresolved under the documented sequence in the case file.",
              "v": "partial",
              "fb": "Sincerity bears on honesty, while perception and memory require separate evaluation."
            },
            {
              "t": "Elizabeth Loftus let the guilty verdict settle the malleability of memory without reviewing the investigation that shaped the record. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "A verdict evaluates the record presented; it cannot validate evidence the jury never received."
            },
            {
              "t": "Elizabeth Loftus used one official error in the malleability of memory as proof of a system-wide conspiracy to frame the accused. The preferred narrative sets the order of review in the case file.",
              "v": "danger",
              "fb": "A specific documented violation can be grave without establishing universal coordination."
            }
          ]
        },
        {
          "q": "Which case review best follows the method described in this profile?",
          "o": [
            {
              "t": "Compare disclosure, custody, identification procedures, testimony, and independent physical evidence. It remains checkable in the dated record in the case file.",
              "v": "expert",
              "fb": "Yes: review must reconstruct both the evidence and the procedure that shaped what reached the jury."
            },
            {
              "t": "Read the trial transcript alone, and assume omitted reports could not have assisted the defense. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A transcript cannot reveal favorable material that was withheld before trial."
            },
            {
              "t": "Ask whether officers believed the suspect was guilty, and treat that belief as fair procedure. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Good faith does not make a suggestive identification or suppressed report reliable."
            },
            {
              "t": "Search for a vast conspiracy first, while leaving lineup instructions and missing files unread. The preferred narrative sets the order of review in the case file.",
              "v": "danger",
              "fb": "Concrete procedural records offer a stronger path than an accusation that explains everything."
            }
          ]
        },
        {
          "q": "Which due-process finding is most defensible after studying the malleability of memory?",
          "o": [
            {
              "t": "A legal remedy should address the proven procedural failure and its demonstrated effect on the verdict. It remains checkable in the operational record.",
              "v": "expert",
              "fb": "Exactly: legal review identifies the violation, tests materiality, and preserves the distinction between error and innocence."
            },
            {
              "t": "Any procedural violation should prove factual innocence even when the missing evidence was immaterial. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A serious violation can require relief without logically deciding every factual question."
            },
            {
              "t": "A conviction should remain untouched whenever police and prosecutors deny intentional misconduct. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Due process protects against harmful suppression and suggestion, including conduct not admitted as intentional."
            },
            {
              "t": "The case is treated as flawless or a coordinated plot involving every investigator, lawyer, and judge. Conspiracy becomes the organizing theory before case review.",
              "v": "danger",
              "fb": "Specific evidence can support a consequential middle finding between those absolutes."
            }
          ]
        }
      ]
    },
    "dnaexon": {
      "sci": "Barry Scheck (b. 1949)",
      "topic": "DNA exoneration & the Innocence Project",
      "lede": "The verdict could not outrank the evidence trail in Barry Scheck's account of dna exoneration and the innocence project.",
      "no": 9,
      "profile": "Today’s evidence briefing examines Barry Scheck and the legal safeguards surrounding dna exoneration and the innocence project. Barry Scheck co-founded the Innocence Project, using post-conviction DNA testing to exonerate people and study causes of wrongful conviction. Criminal adjudication asks institutions to make irreversible judgments from memories, documents, physical traces, expert claims, and official choices. Scheck’s contribution illuminates where error enters and which procedures permit it to be detected.\n\nThe evidentiary task is to preserve biological evidence, obtain reliable testing, compare profiles, and reinvestigate the full case after exclusion. Reliability requires attention to collection, custody, disclosure, suggestion, independence, and the opportunity for adversarial testing. Several witnesses do not provide independent support when they learned the same fact from one another or from an investigator.\n\nDue process does not presume that every official acts badly; it presumes that power and human judgment need structured checks. A lawful conviction may still rest on undisclosed evidence or a contaminated identification, while a procedural flaw does not automatically prove innocence. The remedy begins by identifying the exact failure and its effect on proof.\n\nThe legal lesson is scientific exclusion can reveal broader failures in identification, confession, disclosure, and forensic testimony. Confidence in a verdict must follow tested evidence rather than substitute for it. The earliest uncontaminated account often deserves special weight because later confidence can grow as accuracy declines. A prosecutor’s file and a police file cannot be treated as separate worlds when disclosure duties cover the prosecution team. The earliest uncontaminated account often deserves special weight because later confidence can grow as accuracy declines.",
      "frame": "Sets six lineup photographs in a row. \"Confidence came later. Show me what dna exoneration and the innocence project requires first.\"",
      "q": [
        {
          "q": "Which evidentiary statement best captures Barry Scheck’s work on dna exoneration and the innocence project?",
          "o": [
            {
              "t": "Barry Scheck made dna exoneration and the innocence project depend on disclosure, reliability, adversarial testing, and the burden of proof. The evidence remains open in the operational record in the case file.",
              "v": "expert",
              "fb": "Correct: procedural safeguards protect the reliability of proof as well as the rights of the accused."
            },
            {
              "t": "Barry Scheck treated dna exoneration and the innocence project as reliable whenever a sincere witness expressed strong confidence. Reliability remains unresolved under the documented sequence in the case file.",
              "v": "partial",
              "fb": "Sincerity bears on honesty, while perception and memory require separate evaluation."
            },
            {
              "t": "Barry Scheck let the guilty verdict settle dna exoneration and the innocence project without reviewing the investigation that shaped the record. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "A verdict evaluates the record presented; it cannot validate evidence the jury never received."
            },
            {
              "t": "Barry Scheck used one official error in dna exoneration and the innocence project as proof of a system-wide conspiracy to frame the accused. The preferred narrative sets the order of review in the case file.",
              "v": "danger",
              "fb": "A specific documented violation can be grave without establishing universal coordination."
            }
          ]
        },
        {
          "q": "Which case review best follows the method described in this profile?",
          "o": [
            {
              "t": "Compare disclosure, custody, identification procedures, testimony, and independent physical evidence. It remains checkable in the dated record in the case file.",
              "v": "expert",
              "fb": "Yes: review must reconstruct both the evidence and the procedure that shaped what reached the jury."
            },
            {
              "t": "Read the trial transcript alone, and assume omitted reports could not have assisted the defense. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A transcript cannot reveal favorable material that was withheld before trial."
            },
            {
              "t": "Ask whether officers believed the suspect was guilty, and treat that belief as fair procedure. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Good faith does not make a suggestive identification or suppressed report reliable."
            },
            {
              "t": "Search for a vast conspiracy first, while leaving lineup instructions and missing files unread. The preferred narrative sets the order of review in the case file.",
              "v": "danger",
              "fb": "Concrete procedural records offer a stronger path than an accusation that explains everything."
            }
          ]
        },
        {
          "q": "Which due-process finding is most defensible after studying dna exoneration and the innocence project?",
          "o": [
            {
              "t": "A legal remedy should address the proven procedural failure and its demonstrated effect on the verdict. It remains checkable in the operational record.",
              "v": "expert",
              "fb": "Exactly: legal review identifies the violation, tests materiality, and preserves the distinction between error and innocence."
            },
            {
              "t": "Any procedural violation should prove factual innocence even when the missing evidence was immaterial. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A serious violation can require relief without logically deciding every factual question."
            },
            {
              "t": "A conviction should remain untouched whenever police and prosecutors deny intentional misconduct. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Due process protects against harmful suppression and suggestion, including conduct not admitted as intentional."
            },
            {
              "t": "The case is treated as flawless or a coordinated plot involving every investigator, lawyer, and judge. Conspiracy becomes the organizing theory before case review.",
              "v": "danger",
              "fb": "Specific evidence can support a consequential middle finding between those absolutes."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "paralegal": {
      "precinct": "Paralegal Nora Wyss waits at the police precinct & lineup room with a transcript, a lineup form, and a report bearing no defense stamp. \"Boxed the old case file; found a lab report the defense was never handed. The jury judged the file it received, not the file that existed.\"",
      "courthouse": "Paralegal Nora Wyss waits at the courthouse & trial record with a transcript, a lineup form, and a report bearing no defense stamp. \"Boxed the old case file; found a lab report the defense was never handed. The jury judged the file it received, not the file that existed.\"",
      "dafiles": "Paralegal Nora Wyss waits at the district attorney's case files with a transcript, a lineup form, and a report bearing no defense stamp. \"Boxed the old case file; found a lab report the defense was never handed. The jury judged the file it received, not the file that existed.\""
    },
    "clerk": {
      "precinct": "The Court Clerk waits at the police precinct & lineup room with a transcript, a lineup form, and a report bearing no defense stamp. \"Keeps the transcript and the exhibit log that never quite matched. The jury judged the file it received, not the file that existed.\"",
      "courthouse": "The Court Clerk waits at the courthouse & trial record with a transcript, a lineup form, and a report bearing no defense stamp. \"Keeps the transcript and the exhibit log that never quite matched. The jury judged the file it received, not the file that existed.\"",
      "dafiles": "The Court Clerk waits at the district attorney's case files with a transcript, a lineup form, and a report bearing no defense stamp. \"Keeps the transcript and the exhibit log that never quite matched. The jury judged the file it received, not the file that existed.\""
    },
    "sergeant": {
      "precinct": "Desk Sergeant Boone waits at the police precinct & lineup room with a transcript, a lineup form, and a report bearing no defense stamp. \"Ran the room the night of the lineup; saw the witness steered to a face. The jury judged the file it received, not the file that existed.\"",
      "courthouse": "Desk Sergeant Boone waits at the courthouse & trial record with a transcript, a lineup form, and a report bearing no defense stamp. \"Ran the room the night of the lineup; saw the witness steered to a face. The jury judged the file it received, not the file that existed.\"",
      "dafiles": "Desk Sergeant Boone waits at the district attorney's case files with a transcript, a lineup form, and a report bearing no defense stamp. \"Ran the room the night of the lineup; saw the witness steered to a face. The jury judged the file it received, not the file that existed.\""
    }
  },
  "story": [
    "<b>The Vale Conviction</b> opens inside the Vale conviction-review inquiry, where the public explanation has hardened faster than the evidence.",
    "<b>Paralegal Nora Wyss</b>, <b>The Court Clerk</b>, and <b>Desk Sergeant Boone</b> hold different parts of the record, and every conversation begins with one real figure whose work teaches you how to read it.",
    "The case keeps pulling investigators toward <b>A vast conspiracy framed an innocent man</b> or <b>Nothing amiss — the right man was convicted</b>. Both are plausible enough to survive a headline; neither should survive the full dossier untested.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide the <b>WHAT</b> for yourself."
  ],
  "endings": {
    "overclaimWhat": "frameup",
    "dismissalWhat": "guilty",
    "win": {
      "expertTitle": "The Jury Never Saw the Whole Case",
      "expert": [
        "You identify <b>District Attorney Miles Crade — the prosecutor</b>, locate the suppressed material in <b>The District Attorney's Case Files</b>, and establish <b>A buried exculpatory file & a rigged lineup</b>. Not a vast conspiracy framed an innocent man. Not nothing amiss — the right man was convicted.",
        "The favorable report was withheld and the identification procedure steered the witness toward Vale. Those specific acts corrupted the evidence presented at trial without requiring a universal plot among every official."
      ],
      "soundTitle": "A Conviction No Longer Reliable",
      "sound": [
        "Your finding correctly joins <b>District Attorney Miles Crade — the prosecutor</b>, <b>The District Attorney's Case Files</b>, and <b>A buried exculpatory file & a rigged lineup</b>. The undisclosed file and lineup record justify reopening the judgment.",
        "You do not decide every question of factual innocence, but due process does not permit this verdict to stand on a record materially shaped against the defense."
      ],
      "namedTitle": "The Buried File",
      "named": [
        "You correctly select <b>District Attorney Miles Crade — the prosecutor</b>, <b>The District Attorney's Case Files</b>, and <b>A buried exculpatory file & a rigged lineup</b>.",
        "The explanation needs fuller materiality analysis, yet it identifies the suppressed report and suggestive procedure that the court must examine."
      ]
    },
    "overclaim": {
      "title": "A Conspiracy Larger Than the Proof",
      "body": [
        "You allege <b>A vast conspiracy framed an innocent man</b>, extending two documented violations into a coordinated scheme involving every participant.",
        "The unsupported breadth lets defenders reject the entire review as fantasy. A provable disclosure breach and tainted lineup lose focus inside an accusation the files cannot sustain."
      ]
    },
    "dismissal": {
      "title": "The Verdict Treated as Its Own Evidence",
      "body": [
        "You accept <b>Nothing amiss — the right man was convicted</b>, assuming that conviction proves the investigation fair and the missing report immaterial.",
        "That circular reasoning denies the defense the test the jury never performed. The prisoner remains confined under procedures that withheld and shaped decisive evidence."
      ]
    },
    "wrongNames": {
      "title": "The Violation, Wrong Official",
      "body": [
        "You identify <b>A buried exculpatory file & a rigged lineup</b>, but assign responsibility to the wrong state actor or place the suppressed proof outside the district attorney’s files. The disclosure authority leads instead to"
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A lineup and a concealed evidence file\"><path d=\"M44 34 L286 34 L286 108 L44 108 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><circle cx=\"88\" cy=\"60\" r=\"10\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.3\"/><circle cx=\"146\" cy=\"60\" r=\"10\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.3\"/><circle cx=\"204\" cy=\"60\" r=\"10\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2\"/><circle cx=\"260\" cy=\"60\" r=\"10\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.3\"/><path d=\"M72 94 Q88 72 104 94 M130 94 Q146 72 162 94 M188 94 Q204 72 220 94 M244 94 Q260 72 276 94\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.2\"/><path d=\"M370 34 L578 34 L578 108 L370 108 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M390 54 L558 54 M390 72 L520 72 M390 90 L548 90\" stroke=\"#e2e2d8\" stroke-width=\"1.2\"/><path d=\"M548 26 L590 26 L590 66\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2\"/></svg>"
}};
