// Casebook V3 — three informants, three readings, one clue per correct answer.
module.exports = { PACK: {
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "j_press",
  "title": "The Ashford Dispatch",
  "discipline": "Journalism Ethics & Verification",
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
  "DAYS_TOTAL": 3,
  "teaser": "A celebrated investigation collapses when its central witness proves synthetic. Did the reporter invent the entire source, did a real interview merely contain errors, or did an outside operator feed the newsroom a coordinated network of false identities and corroborators?",
  "overclaimTag": "a coordinated operation against the newspaper",
  "truthTag": "a coordinated external source operation that entered the paper",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A newspaper story beside a source file with a missing identity\"><rect x=\"70\" y=\"24\" width=\"250\" height=\"92\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M92 44 h112 M92 60 h200 M92 76 h200 M92 92 h142\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><rect x=\"400\" y=\"34\" width=\"150\" height=\"72\" rx=\"5\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><circle cx=\"432\" cy=\"66\" r=\"13\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/><path d=\"M458 56 h68 M458 72 h68 M416 92 h110\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><path d=\"M425 55 l15 22 M440 55 l-15 22\" stroke=\"#B3261E\" stroke-width=\"3\"/></svg>",
  "overclaimTease": "Do not decide from the source’s falsity alone. The origin lies in timestamps, incoming accounts, and whether the reporter created the trail or received it from outside.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "broker",
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
          "id": "broker",
          "label": "Lyle Ames — the outside source broker"
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
          "id": "sourcefiles",
          "label": "The Source & Fact-Check Files"
        },
        {
          "id": "editdesk",
          "label": "The Managing Editor’s Desk"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "smear",
      "items": [
        {
          "id": "smear",
          "label": "An outside broker planted a coordinated false source network"
        },
        {
          "id": "fabrication",
          "label": "The reporter invented sources and supporting interview records"
        },
        {
          "id": "mistake",
          "label": "A genuine source was reported with ordinary factual errors"
        }
      ]
    }
  },
  "READING_ORDER": [
    "factchecker",
    "clerk",
    "stringer"
  ],
  "CHARACTERS": {
    "factchecker": {
      "name": "Fact-Checker Jonah Pell",
      "role": "Newsroom fact-checker",
      "face": "✅",
      "badge": "P",
      "legend": "the verification desk",
      "hint": "The first source packets arrived from externally controlled accounts before the reporter drafted the disputed notes.",
      "reading": "verification"
    },
    "clerk": {
      "name": "The Records Clerk",
      "role": "Editorial records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the archive room",
      "hint": "Message headers, attachments, and contact records preserve a common outside origin across several supposed witnesses.",
      "reading": "fromrecord"
    },
    "stringer": {
      "name": "Local Stringer Ames",
      "role": "Local correspondent",
      "face": "📰",
      "badge": "A",
      "legend": "the reported town",
      "hint": "The local identities were synthetic, but payments and account recovery data lead to one source broker beyond the newsroom.",
      "reading": "sourcing"
    }
  },
  "TOPICS": {
    "verification": {
      "sci": "Bill Kovach (1932-2021)",
      "topic": "The discipline of verification",
      "lede": "Bill Kovach argued that journalism earns trust through a transparent method of checking, not through the confidence or fame of the reporter.",
      "no": 1,
      "profile": "Bill Kovach was an American journalist and editor whose career included reporting at The New York Times, leading the Washington bureau, editing the Atlanta Journal-Constitution, and directing the Nieman Foundation at Harvard. With Tom Rosenstiel, he helped articulate a modern statement of journalistic principles in The Elements of Journalism. At its center is the idea that journalism’s defining practice is a discipline of verification.\n\nVerification is more than avoiding obvious errors. Reporters test names, dates, locations, documents, quotations, and causal claims against independent evidence. They distinguish what they observed from what a source asserted, identify conflicts of interest, and seek corroboration especially when a source is confidential. Confidentiality can protect a real person from retaliation; it cannot exempt the reporter from proving to an editor that the person exists and is positioned to know what they claim. Notes, recordings, contact methods, documentary traces, and secondary witnesses create an audit trail without necessarily exposing the source publicly.\n\nKovach’s emphasis on method also separates journalism from rumor, propaganda, and fiction. A compelling narrative may be true, but its polish is not evidence. Likewise, one inaccurate detail can be an ordinary mistake, while a pattern of unverifiable names and quotations points to a more fundamental failure of method. Editors share responsibility for enforcing verification, yet the origin of invented material remains distinct from the failure to catch it.\n\nAt Ashford, verification initially failed because the witness biography and quotations could not be independently confirmed. The deeper audit, however, found that the reporter did not create the first contact trail. Signed attachments, incoming message headers, and archived call records predated the reporter’s notes and arrived from accounts controlled outside the paper. Kovach’s discipline therefore cuts in both directions: it exposes the newsroom’s poor checking while also preventing investigators from converting that failure into an unsupported accusation of internal fabrication.",
      "frame": "Places the first source packet beside the reporter’s draft and highlights the incoming timestamp. “A false witness can still arrive through a real external channel. Tell me how provenance changes the accusation.”",
      "q": [
        {
          "q": "What makes verification a discipline rather than a reporter’s personal confidence?",
          "o": [
            {
              "t": "The reporter has covered the subject long enough to recognize what sounds true.",
              "v": "partial",
              "fb": "Experience guides inquiry, but plausibility cannot replace corroboration."
            },
            {
              "t": "The story survives legal review because no named subject threatens to sue.",
              "v": "wrong",
              "fb": "Legal risk and factual verification overlap only partly; silence does not establish truth."
            },
            {
              "t": "The newsroom protects every source from any internal identity check.",
              "v": "danger",
              "fb": "Confidentiality protects public disclosure, not accountability to responsible editors."
            },
            {
              "t": "Claims are tested against independent evidence and a reviewable reporting trail.",
              "v": "expert",
              "fb": "A repeatable method lets others evaluate the work without relying on the reporter’s certainty."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — lead",
            "text": "The witness biography is synthetic, yet the first digital trail predates the reporter’s notes and enters from outside the paper."
          }
        },
        {
          "q": "How should a newsroom handle a confidential central source?",
          "o": [
            {
              "t": "Accept the source on the reporter’s assurance if the story wins early praise.",
              "v": "danger",
              "fb": "Prestige increases the need for scrutiny rather than replacing it."
            },
            {
              "t": "Confirm identity and access internally while limiting public disclosure.",
              "v": "expert",
              "fb": "Editors can protect confidentiality and still verify that the source exists and knows the subject."
            },
            {
              "t": "Publish the source’s full name so outside readers perform the fact-check.",
              "v": "wrong",
              "fb": "Public exposure may be unsafe and is not the only route to internal verification."
            },
            {
              "t": "Avoid using any documents because records could accidentally reveal identity.",
              "v": "partial",
              "fb": "Documents can be handled securely and often provide essential corroboration."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — lead",
            "text": "The disputed source packets arrived through external accounts before Corin Faye created interview notes or article drafts."
          }
        },
        {
          "q": "Which evidence would show that false sourcing entered from outside rather than beginning in a reporter’s notes?",
          "o": [
            {
              "t": "Archived incoming messages and signed attachments that predate the draft.",
              "v": "expert",
              "fb": "Contemporaneous inbound records establish an external origin for the false material."
            },
            {
              "t": "An editor’s failure to answer every verification warning before publication.",
              "v": "partial",
              "fb": "Editorial failure explains publication but not who created the source network."
            },
            {
              "t": "A polished narrative whose quotations sound unusually vivid and complete.",
              "v": "wrong",
              "fb": "Writing quality cannot identify the provenance of the underlying evidence."
            },
            {
              "t": "A reporter’s later inability to persuade the witness to appear publicly.",
              "v": "danger",
              "fb": "A missing witness is suspicious, but timing and metadata locate the origin."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — lead",
            "text": "The newsroom contains the published narrative, but the original incoming headers and attachments survive in the Source & Fact-Check Files."
          }
        }
      ]
    },
    "fromrecord": {
      "sci": "I. F. Stone (1907-1989)",
      "topic": "Verify it from the public record",
      "lede": "I. F. Stone built investigations from documents officials had already published, proving that records can contradict a polished official or journalistic account.",
      "no": 2,
      "profile": "Isidor Feinstein Stone, known as I. F. Stone, was an American journalist who became famous for the independent newsletter I. F. Stone’s Weekly. Working with a tiny staff and outside the daily press pack, he read government reports, hearing transcripts, budgets, footnotes, and statistics with unusual patience. His method was not simply collecting documents. It was comparing claims made in one place with facts buried in another, often using the government’s own record to expose contradiction.\n\nPublic records have limitations. They can be incomplete, delayed, mistaken, or shaped by institutions. But they provide fixed details that can be checked: whether a person held a job, whether an organization existed at an address, whether a meeting occurred, whether a court filing or license was issued, and whether dates align. A source who uses a pseudonym may still leave corroborating events and institutional traces. An invented biography often collapses across many small records at once.\n\nStone’s documentary approach also disciplines dramatic theories. If a hostile outsider planted a false source, investigators should be able to identify some external contact, communication path, or real-world event that entered the newsroom. If a genuine source merely made ordinary mistakes, much of the biography and surrounding record should remain intact. When employment, property, court, school, and telephone records all fail together, the problem is larger than a misspelled name.\n\nStone’s documentary instinct is decisive because the public biography is false while the digital provenance is real. Shell organizations, recycled addresses, and fabricated dockets connect the supposed witnesses to one outside network. The reporter’s file contains the incoming originals, including metadata that cannot be generated by later editing of newsroom notes. The records show an engineered source operation entering the paper, not a genuine witness with a few mistakes and not a source invented from scratch by the reporter.",
      "frame": "Compares account-recovery data, shell-company filings, and document templates. “The biography is false, but the records still show who built it. Follow the infrastructure.”",
      "q": [
        {
          "q": "What distinguished I. F. Stone’s documentary reporting method?",
          "o": [
            {
              "t": "He relied mainly on anonymous tips because official documents offered little value.",
              "v": "wrong",
              "fb": "Stone used sources, but his reputation rested heavily on intensive documentary reading."
            },
            {
              "t": "He treated every government error as proof of an organized conspiracy.",
              "v": "danger",
              "fb": "A discrepancy prompts investigation; it does not determine motive by itself."
            },
            {
              "t": "He compared official claims with details buried across public records.",
              "v": "expert",
              "fb": "Cross-reading records allowed contradictions to emerge from sources institutions had published themselves."
            },
            {
              "t": "He accepted public reports at face value if they carried an official seal.",
              "v": "partial",
              "fb": "His method was precisely to read beyond the headline and test internal consistency."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — corroboration",
            "text": "Multiple false corroborators resolve to shared external infrastructure rather than to independent people or one mistaken interview."
          }
        },
        {
          "q": "When does absence from public records become strong evidence?",
          "o": [
            {
              "t": "Whenever one database returns no result on the first spelling attempted.",
              "v": "partial",
              "fb": "One search may fail through spelling, coverage, or access limits and should not settle the issue."
            },
            {
              "t": "After a government spokesperson confirms that the person was invented.",
              "v": "wrong",
              "fb": "Independent documentary verification need not depend on an official admission."
            },
            {
              "t": "When the missing record makes an outside smear more exciting than a clerical error.",
              "v": "danger",
              "fb": "Narrative appeal does not determine evidentiary weight."
            },
            {
              "t": "When several independent systems should contain traces and all fail consistently.",
              "v": "expert",
              "fb": "Converging absences across unrelated records can undermine the existence of the claimed identity or event."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — corroboration",
            "text": "Public-record contradictions become meaningful when compared with the archived source packets and contact metadata in the same file set."
          }
        },
        {
          "q": "What most strongly separates an external plant from reporter-created records?",
          "o": [
            {
              "t": "The reporter’s notes repeating details that later appeared in the article.",
              "v": "partial",
              "fb": "Notes show use of the material, not necessarily creation of the source trail."
            },
            {
              "t": "Independent message headers and account data leading to one outside operator.",
              "v": "expert",
              "fb": "External provenance survives even though the personas and claims are false."
            },
            {
              "t": "The editor approving publication after several questions remained open.",
              "v": "wrong",
              "fb": "Approval is a newsroom failure but does not identify the fabricator."
            },
            {
              "t": "The witness biography containing an employer that public records cannot verify.",
              "v": "danger",
              "fb": "A false biography rules out a genuine witness but not an internal invention."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — corroboration",
            "text": "Supposedly independent personas share recovery numbers, payment routes, and document templates controlled outside the newspaper."
          }
        }
      ]
    },
    "sourcing": {
      "sci": "Carl Bernstein (b. 1944)",
      "topic": "The discipline of sourcing",
      "lede": "Carl Bernstein’s Watergate reporting showed how separate sources and documents can corroborate a hidden system without any one witness carrying the whole case.",
      "no": 3,
      "profile": "Carl Bernstein joined The Washington Post as a young reporter and, with Bob Woodward, investigated the 1972 break-in at the Democratic National Committee headquarters and the broader Watergate scandal. The reporting depended on persistence, documents, and many sources with partial knowledge. No single conversation supplied the complete story. Names, payments, campaign records, grand-jury developments, and accounts from officials were checked against one another before the newspaper advanced its claims.\n\nSourcing discipline means matching a source’s access to the fact asserted. A person may know that a meeting occurred but not what was said inside it. Another may confirm a payment but not its purpose. Independent corroboration is especially important for consequential allegations. Two reporters hearing the same rumor from people who copied one original claim do not have two sources; they have one information chain. Editors therefore ask how sources know, whether they are independent, what documents support them, and what details can be verified without exposing identities.\n\nThe method also clarifies the difference between editorial failure and fabrication. An editor can be overly trusting, rush publication, or waive a check. Those choices can permit falsehood to pass. But if a reporter creates nonexistent witnesses, manufactured notes, and false contact records, the originating act remains with the reporter even when supervision failed.\n\nBernstein’s source-mapping lesson asks whether apparent corroborators are genuinely independent. In Ashford they were not: several personas used different names but shared recovery numbers, document templates, payment routes, and a source broker. The reporter and editor failed to recognize the convergence, yet the information chain still has an external origin. Mapping that chain identifies both the mechanism and the person who assembled it, while the Source & Fact-Check Files preserve the complete path into the newsroom.",
      "frame": "Pins the supposed corroborators to a board and links their payment routes to one broker. “Different names do not make independent sources when one hand controls them all.”",
      "q": [
        {
          "q": "What makes two sources genuinely independent?",
          "o": [
            {
              "t": "They learned the fact through genuinely separate access or evidence chains.",
              "v": "expert",
              "fb": "Independence requires distinct origins, not merely two people repeating one account."
            },
            {
              "t": "They use different names while describing the same rumor in similar language.",
              "v": "wrong",
              "fb": "Different speakers can still share one unverified source."
            },
            {
              "t": "They agree with the reporter before either is asked how they know.",
              "v": "danger",
              "fb": "Agreement without provenance can manufacture confidence rather than corroboration."
            },
            {
              "t": "They work in different departments and report through separate managers.",
              "v": "partial",
              "fb": "Different departments may be independent, but investigators must verify how each learned the fact."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — decisive",
            "text": "A coordinated broker built a source network and planted it through authentic incoming channels that the newsroom failed to verify."
          }
        },
        {
          "q": "How should source access be matched to a claim?",
          "o": [
            {
              "t": "Assume senior titles provide knowledge of every event inside an institution.",
              "v": "danger",
              "fb": "Status does not guarantee direct access to a particular meeting, payment, or document."
            },
            {
              "t": "Treat detailed quotations as proof that the source personally witnessed events.",
              "v": "wrong",
              "fb": "Detail can be invented or secondhand and must be tied to provenance."
            },
            {
              "t": "Verify that the source’s role could realistically expose them to that specific fact.",
              "v": "expert",
              "fb": "A source’s position and firsthand access determine what parts of a story they can credibly confirm."
            },
            {
              "t": "Accept indirect knowledge whenever the source has been reliable on unrelated stories.",
              "v": "partial",
              "fb": "Past reliability matters, but each claim still needs appropriate access and corroboration."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — decisive",
            "text": "Every false persona, incoming document, verification warning, and provenance marker converges in the Source & Fact-Check Files."
          }
        },
        {
          "q": "Which link most directly identifies who built the coordinated source network?",
          "o": [
            {
              "t": "The reporter’s byline appearing on every installment of the investigation.",
              "v": "partial",
              "fb": "The byline identifies the publisher of claims, not the creator of the source accounts."
            },
            {
              "t": "The managing editor defending the series after publication complaints began.",
              "v": "wrong",
              "fb": "Defending the story may be negligent without proving authorship of the deception."
            },
            {
              "t": "Several local witnesses repeating similar phrases during follow-up interviews.",
              "v": "danger",
              "fb": "Similar wording matters only after its origin and independence are tested."
            },
            {
              "t": "Shared recovery numbers, payment routes, and templates tied to one broker.",
              "v": "expert",
              "fb": "Common control infrastructure joins the supposedly separate personas to one operator."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — decisive",
            "text": "One source broker registered the accounts, funded the contacts, and supplied the files that the newsroom mistook for corroboration."
          }
        }
      ]
    }
  },
  "story": [
    "<b>The Ashford Dispatch printed a witness who never existed under the name the paper used.</b>",
    "Fact-Checker Jonah Pell holds the unanswered challenges. The Records Clerk can read the incoming metadata. Local Stringer Ames tested the people, addresses, and institutions on the ground.",
    "The reporter may have invented everything, a genuine source may simply be wrong, or an outside operator may have built a false network convincing enough to enter normal reporting channels.",
    "Nine clues trace where the source trail began, where it was preserved, and who controlled the supposedly independent voices."
  ],
  "endings": {
    "overclaimWhat": "fabrication",
    "dismissalWhat": "mistake",
    "win": {
      "expertTitle": "The Network That Entered the Newsroom",
      "expert": [
        "You connect Lyle Ames, the Source & Fact-Check Files, and a coordinated external source operation. Incoming originals, shared account infrastructure, and payment routes establish an outside origin.",
        "Corin Faye and the editor failed badly at verification, but they did not create the personas. The evidence also exceeds an ordinary factual mistake: the witness network was deliberately manufactured."
      ],
      "soundTitle": "The External Source Chain",
      "sound": [
        "Your accusation identifies the broker, the source files, and the coordinated plant.",
        "Some provenance details remain incomplete, but the inbound records and shared control infrastructure support the verdict."
      ],
      "namedTitle": "Right Operation, Thin Provenance",
      "named": [
        "You choose the correct actor, location, and mechanism.",
        "The call is right, although missed clues leave portions of the metadata or account-control chain underdeveloped."
      ]
    },
    "overclaim": {
      "title": "The Reporter Did Not Create the First Trail",
      "body": [
        "The archived packets, signatures, and message headers predate the reporter’s notes and arrived through outside-controlled accounts.",
        "Blaming internal fabrication alone ignores the operator who constructed the source network and inserted it into the reporting process."
      ]
    },
    "dismissal": {
      "title": "This Was Not One Bad Interview",
      "body": [
        "Several supposed witnesses shared identities, infrastructure, templates, and payment routes.",
        "That coordinated design cannot be explained by ordinary errors from a genuine source."
      ]
    },
    "wrongNames": {
      "title": "The False Sources, Mislocated",
      "body": [
        "You recognize a coordinated plant but assign it away from the broker and source files that preserve its external origin."
      ]
    }
  }
}
};
