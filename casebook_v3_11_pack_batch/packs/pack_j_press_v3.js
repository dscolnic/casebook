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
  "teaser": "A celebrated investigation collapses when its central witness cannot be found. Was the newspaper framed by an outside source, did a genuine interview contain ordinary mistakes, or was the source itself manufactured inside the reporting process?",
  "overclaimTag": "an outside source planted a false account",
  "truthTag": "a reporter manufactured sources and records",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A newspaper story beside a source file with a missing identity\"><rect x=\"70\" y=\"24\" width=\"250\" height=\"92\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M92 44 h112 M92 60 h200 M92 76 h200 M92 92 h142\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><rect x=\"400\" y=\"34\" width=\"150\" height=\"72\" rx=\"5\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><circle cx=\"432\" cy=\"66\" r=\"13\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/><path d=\"M458 56 h68 M458 72 h68 M416 92 h110\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><path d=\"M425 55 l15 22 M440 55 l-15 22\" stroke=\"#B3261E\" stroke-width=\"3\"/></svg>",
  "overclaimTease": "A planted lie requires a real planter. Begin with the discipline of verification: what independent trail should exist if the witness ever existed at all?",
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
          "label": "The newspaper publisher"
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
          "label": "The Managing Editor’s Desk"
        },
        {
          "id": "sourcefiles",
          "label": "The Source & Fact-Check Files"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "fabrication",
      "items": [
        {
          "id": "smear",
          "label": "An outside source planted a coordinated false account inside the paper"
        },
        {
          "id": "mistake",
          "label": "A genuine source was reported with ordinary factual errors"
        },
        {
          "id": "fabrication",
          "label": "The reporter invented sources and supporting interview records"
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
      "hint": "Names, quotations, and employment details failed independent checks before publication.",
      "reading": "verification"
    },
    "clerk": {
      "name": "The Records Clerk",
      "role": "Editorial records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the archive room",
      "hint": "Public records contradict the source biography, and the contact log was created from one reporter account.",
      "reading": "fromrecord"
    },
    "stringer": {
      "name": "Local Stringer Ames",
      "role": "Local correspondent",
      "face": "📰",
      "badge": "A",
      "legend": "the reported town",
      "hint": "The addresses, institutions, and witnesses in the series do not resolve to real people on the ground.",
      "reading": "sourcing"
    }
  },
  "TOPICS": {
    "verification": {
      "sci": "Bill Kovach (1932-2021)",
      "topic": "The discipline of verification",
      "lede": "Bill Kovach argued that journalism earns trust through a transparent method of checking, not through the confidence or fame of the reporter.",
      "no": 1,
      "profile": "Bill Kovach was an American journalist and editor whose career included reporting at The New York Times, leading the Washington bureau, editing the Atlanta Journal-Constitution, and directing the Nieman Foundation at Harvard. With Tom Rosenstiel, he helped articulate a modern statement of journalistic principles in The Elements of Journalism. At its center is the idea that journalism’s defining practice is a discipline of verification.\n\nVerification is more than avoiding obvious errors. Reporters test names, dates, locations, documents, quotations, and causal claims against independent evidence. They distinguish what they observed from what a source asserted, identify conflicts of interest, and seek corroboration especially when a source is confidential. Confidentiality can protect a real person from retaliation; it cannot exempt the reporter from proving to an editor that the person exists and is positioned to know what they claim. Notes, recordings, contact methods, documentary traces, and secondary witnesses create an audit trail without necessarily exposing the source publicly.\n\nKovach’s emphasis on method also separates journalism from rumor, propaganda, and fiction. A compelling narrative may be true, but its polish is not evidence. Likewise, one inaccurate detail can be an ordinary mistake, while a pattern of unverifiable names and quotations points to a more fundamental failure of method. Editors share responsibility for enforcing verification, yet the origin of invented material remains distinct from the failure to catch it.\n\nAt the Ashford Dispatch, the central witness has no independent employment record, address, colleague, or recoverable contact channel. Several quotations exist only in one reporter’s notes. Kovach’s test is straightforward: before blaming an outside plot or excusing routine error, ask whether the newsroom ever possessed an evidence trail that could verify the source independently of the story’s author.",
      "frame": "Stacks the published quotations beside blank verification fields. “Confidential does not mean imaginary, and trust is not a substitute for a method another journalist can audit.”",
      "q": [
        {
          "q": "What makes verification a discipline rather than a reporter’s personal confidence?",
          "o": [
            {
              "t": "Claims are tested against independent evidence and a reviewable reporting trail.",
              "v": "expert",
              "fb": "A repeatable method lets others evaluate the work without relying on the reporter’s certainty."
            },
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
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "The series lacks an independent verification trail for its central witness; the quotes survive only inside the reporter’s own notes."
          }
        },
        {
          "q": "How should a newsroom handle a confidential central source?",
          "o": [
            {
              "t": "Confirm identity and access internally while limiting public disclosure.",
              "v": "expert",
              "fb": "Editors can protect confidentiality and still verify that the source exists and knows the subject."
            },
            {
              "t": "Accept the source on the reporter’s assurance if the story wins early praise.",
              "v": "danger",
              "fb": "Prestige increases the need for scrutiny rather than replacing it."
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
            "label": "WHO clue",
            "text": "Only one journalist controlled every contact with the supposed witness and repeatedly blocked normal internal identity confirmation."
          }
        },
        {
          "q": "Where should the strongest evidence of verification failure be preserved?",
          "o": [
            {
              "t": "In the source file linking contacts, corroboration attempts, and editor review.",
              "v": "expert",
              "fb": "The joined file reveals what evidence existed and which checks were attempted or waived."
            },
            {
              "t": "On the newsroom floor where colleagues remember hearing the story discussed.",
              "v": "partial",
              "fb": "Recollections provide context but not the source-level audit trail."
            },
            {
              "t": "At the publisher’s office because the series improved circulation.",
              "v": "wrong",
              "fb": "Commercial benefit does not locate the missing verification evidence."
            },
            {
              "t": "In the public comments where readers argued that the story felt believable.",
              "v": "danger",
              "fb": "Audience reaction cannot substitute for source authentication."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The verification desk raised the alarms, but the decisive absence is inside the source and fact-check file where corroboration should have been recorded."
          }
        }
      ]
    },
    "fromrecord": {
      "sci": "I. F. Stone (1907-1989)",
      "topic": "Verify it from the public record",
      "lede": "I. F. Stone built investigations from documents officials had already published, proving that records can contradict a polished official or journalistic account.",
      "no": 2,
      "profile": "Isidor Feinstein Stone, known as I. F. Stone, was an American journalist who became famous for the independent newsletter I. F. Stone’s Weekly. Working with a tiny staff and outside the daily press pack, he read government reports, hearing transcripts, budgets, footnotes, and statistics with unusual patience. His method was not simply collecting documents. It was comparing claims made in one place with facts buried in another, often using the government’s own record to expose contradiction.\n\nPublic records have limitations. They can be incomplete, delayed, mistaken, or shaped by institutions. But they provide fixed details that can be checked: whether a person held a job, whether an organization existed at an address, whether a meeting occurred, whether a court filing or license was issued, and whether dates align. A source who uses a pseudonym may still leave corroborating events and institutional traces. An invented biography often collapses across many small records at once.\n\nStone’s documentary approach also disciplines dramatic theories. If a hostile outsider planted a false source, investigators should be able to identify some external contact, communication path, or real-world event that entered the newsroom. If a genuine source merely made ordinary mistakes, much of the biography and surrounding record should remain intact. When employment, property, court, school, and telephone records all fail together, the problem is larger than a misspelled name.\n\nIn Ashford, the reported witness’s employer never existed at the stated address, the quoted hearing had no corresponding docket, and the telephone numbers were generated only inside a reporter-maintained contact file. Stone’s lesson is cumulative: one missing record is ambiguity; a whole biography that leaves no independent footprint is evidence. The archive can show whether the newsroom followed that evidence or edited around it.",
      "frame": "Runs a finger down a municipal directory, court docket, and company register. “One record can be wrong. Five unrelated systems failing around the same person is a different kind of fact.”",
      "q": [
        {
          "q": "What distinguished I. F. Stone’s documentary reporting method?",
          "o": [
            {
              "t": "He compared official claims with details buried across public records.",
              "v": "expert",
              "fb": "Cross-reading records allowed contradictions to emerge from sources institutions had published themselves."
            },
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
              "t": "He accepted public reports at face value if they carried an official seal.",
              "v": "partial",
              "fb": "His method was precisely to read beyond the headline and test internal consistency."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "The source biography fails across employer, address, court, and telephone records—a pattern too broad for an ordinary reporting mistake."
          }
        },
        {
          "q": "When does absence from public records become strong evidence?",
          "o": [
            {
              "t": "When several independent systems should contain traces and all fail consistently.",
              "v": "expert",
              "fb": "Converging absences across unrelated records can undermine the existence of the claimed identity or event."
            },
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
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The contradictions are assembled in the editorial source archive, where the absent records can be compared with the reporter-created contact entries."
          }
        },
        {
          "q": "Which evidence best distinguishes an external plant from an internally invented source?",
          "o": [
            {
              "t": "Metadata showing the source contacts were created from the reporter’s account.",
              "v": "expert",
              "fb": "Internal creation history points toward fabrication within the reporting file rather than an outside person feeding falsehoods."
            },
            {
              "t": "A critical reader letter sent after the series received a major award.",
              "v": "partial",
              "fb": "Criticism may trigger review but does not locate the origin of the source."
            },
            {
              "t": "The publisher’s concern that a scandal could damage the paper’s reputation.",
              "v": "wrong",
              "fb": "Institutional fear is not evidence about how the records were made."
            },
            {
              "t": "The possibility that a sophisticated outsider erased every trace after publication.",
              "v": "danger",
              "fb": "An unfalsifiable erasure theory cannot outweigh preserved internal metadata."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The contact entries, interview timestamps, and revisions were all created from Corin Faye’s credentials, with no incoming external account behind them."
          }
        }
      ]
    },
    "sourcing": {
      "sci": "Carl Bernstein (b. 1944)",
      "topic": "The discipline of sourcing",
      "lede": "Carl Bernstein’s Watergate reporting showed how separate sources and documents can corroborate a hidden system without any one witness carrying the whole case.",
      "no": 3,
      "profile": "Carl Bernstein joined The Washington Post as a young reporter and, with Bob Woodward, investigated the 1972 break-in at the Democratic National Committee headquarters and the broader Watergate scandal. The reporting depended on persistence, documents, and many sources with partial knowledge. No single conversation supplied the complete story. Names, payments, campaign records, grand-jury developments, and accounts from officials were checked against one another before the newspaper advanced its claims.\n\nSourcing discipline means matching a source’s access to the fact asserted. A person may know that a meeting occurred but not what was said inside it. Another may confirm a payment but not its purpose. Independent corroboration is especially important for consequential allegations. Two reporters hearing the same rumor from people who copied one original claim do not have two sources; they have one information chain. Editors therefore ask how sources know, whether they are independent, what documents support them, and what details can be verified without exposing identities.\n\nThe method also clarifies the difference between editorial failure and fabrication. An editor can be overly trusting, rush publication, or waive a check. Those choices can permit falsehood to pass. But if a reporter creates nonexistent witnesses, manufactured notes, and false contact records, the originating act remains with the reporter even when supervision failed.\n\nAt Ashford, Local Stringer Ames visited the town, checked addresses, and interviewed people named around the supposed witness. The surrounding community had no memory or record of the person. Meanwhile, several “independent” confirmations traced back to language first supplied by Corin Faye. Bernstein’s lesson is to map information chains. Apparent corroboration that loops back to one reporter is not corroboration at all.",
      "frame": "Pins a source map to the wall and draws every confirming arrow back to the same notebook. “Count origins, not voices. Repeated language can make one invention sound like a crowd.”",
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
            "label": "WHAT clue",
            "text": "The supposed corroborators repeat distinctive wording that originated in the reporter’s notes, collapsing several voices into one manufactured information chain."
          }
        },
        {
          "q": "How should source access be matched to a claim?",
          "o": [
            {
              "t": "Verify that the source’s role could realistically expose them to that specific fact.",
              "v": "expert",
              "fb": "A source’s position and firsthand access determine what parts of a story they can credibly confirm."
            },
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
              "t": "Accept indirect knowledge whenever the source has been reliable on unrelated stories.",
              "v": "partial",
              "fb": "Past reliability matters, but each claim still needs appropriate access and corroboration."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The source map, notes, contact history, and fact-check objections meet in the source file, making that archive the case’s decisive location."
          }
        },
        {
          "q": "Which fact most directly identifies the originator of the fabrication?",
          "o": [
            {
              "t": "The false witnesses, notes, and contact records all start with one reporter.",
              "v": "expert",
              "fb": "The common point of creation identifies who manufactured the evidence, even though editors failed to stop publication."
            },
            {
              "t": "The managing editor approved publication after several verification warnings.",
              "v": "partial",
              "fb": "The editor bears supervisory responsibility but did not originate the invented people and records."
            },
            {
              "t": "The publisher promoted the series heavily after its first installment.",
              "v": "wrong",
              "fb": "Promotion amplified the story but does not show who created its source material."
            },
            {
              "t": "An outside critic accurately predicted that the newspaper would face embarrassment.",
              "v": "danger",
              "fb": "Prediction and hostility do not establish participation in fabrication."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The journalist whose credentials created every false witness and confirming pathway remains the only surviving origin once the information chains are separated."
          }
        }
      ]
    }
  },
  "story": [
    "<b>The Ashford Dispatch won praise for a witness no investigator can now locate.</b> The quotations are vivid; the independent trail is empty.",
    "Fact-Checker Jonah Pell holds the unanswered verification requests. The Records Clerk can compare the story with public records and file metadata. Local Stringer Ames tested the reported people and places on the ground.",
    "An outside plant would leave an external path into the newsroom. An honest mistake would leave a largely real source behind the errors. The file must distinguish both from invention.",
    "Up to nine clues reconstruct who created the source, where the evidence should have existed, and why apparent corroboration collapses when its origins are mapped."
  ],
  "endings": {
    "overclaimWhat": "smear",
    "dismissalWhat": "mistake",
    "win": {
      "expertTitle": "The Source That Began and Ended in One File",
      "expert": [
        "You connect the absent public footprint, circular corroboration, and internally created contact records to Corin Faye and the Source & Fact-Check Files.",
        "The managing editor failed to enforce warnings, but the evidence shows fabrication originated with the reporter. No outside planter appears, and the breadth of invention exceeds ordinary factual error."
      ],
      "soundTitle": "The Verification Trail",
      "sound": [
        "Your accusation identifies the reporter, the source archive, and the manufactured sourcing.",
        "Some details of editorial review remain incomplete, but the information chains and metadata support the verdict."
      ],
      "namedTitle": "Right Story, Thin Sourcing",
      "named": [
        "You choose the correct person, place, and mechanism.",
        "The verdict is right, though missed clues leave portions of the public-record and corroboration analysis less developed."
      ]
    },
    "overclaim": {
      "title": "No Outside Source Entered the Chain",
      "body": [
        "The planted-smear theory requires a real external contact or event feeding the newsroom. Instead, source records and confirmations originate inside one reporter account.",
        "The conspiracy story diverts attention from a fabrication whose creation history is preserved in the paper’s own files."
      ]
    },
    "dismissal": {
      "title": "An Error Leaves a Real Source Behind",
      "body": [
        "Ordinary mistakes do not explain a witness with no employment, address, docket, colleagues, or independent contact trail.",
        "The repeated inventions and circular corroboration show a method of fabrication rather than one mistaken detail."
      ]
    },
    "wrongNames": {
      "title": "The Fabrication, Assigned Elsewhere",
      "body": [
        "You recognize invented sourcing but place responsibility or culmination away from the reporter-created records and verification archive that establish its origin."
      ]
    }
  }
}
};
