// Casebook V3 — three informants, three readings, one clue per correct answer.
module.exports = { PACK: {
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "f_firmware",
  "title": "The Halden Infusion Pump",
  "discipline": "Embedded & Firmware Engineering",
  "teaser": "A drug pump delivered a lethal dose to a sleeping patient. Was its command altered, did a rare bit error slip through, or did something already known survive into the shipped design?",
  "overclaimTag": "a remotely altered dose",
  "truthTag": "a known fault with its backstop removed",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"An infusion pump with a rising dose trace and a crossed-out watchdog circuit\"><g fill=\"none\" stroke=\"#e2e2d8\" stroke-width=\"1\"><path d=\"M20 112 H640\"/><path d=\"M80 20 V122 M160 20 V122 M240 20 V122 M320 20 V122 M400 20 V122 M480 20 V122 M560 20 V122\"/></g><g fill=\"none\" stroke=\"#121212\" stroke-width=\"1.7\"><rect x=\"70\" y=\"24\" width=\"178\" height=\"92\" rx=\"8\"/><rect x=\"92\" y=\"42\" width=\"90\" height=\"36\" rx=\"3\"/><circle cx=\"211\" cy=\"50\" r=\"8\"/><circle cx=\"211\" cy=\"75\" r=\"8\"/><path d=\"M248 66 H330 C345 66 351 79 351 91 V111\"/><path d=\"M351 111 C351 122 365 122 365 111\"/><rect x=\"430\" y=\"36\" width=\"118\" height=\"62\" rx=\"5\"/><path d=\"M446 67 H466 L478 53 L490 82 L504 60 L518 67 H535\"/></g><path d=\"M102 64 H120 L128 58 L137 70 L148 50 L158 64 H173\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/><g stroke=\"#B3261E\" stroke-width=\"2\" stroke-linecap=\"round\"><line x1=\"451\" y1=\"42\" x2=\"527\" y2=\"92\"/><line x1=\"527\" y1=\"42\" x2=\"451\" y2=\"92\"/></g><path d=\"M365 111 C382 99 392 96 402 84 C416 68 422 52 430 44\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2\"/></svg>",
  "venue": "the infusion-pump firmware inquiry",
  "agent": {
    "name": "Investigator Dana Voss",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Firmware & Coding Pioneers",
  "dossierName": "FIRMWARE, CODING & HARDWARE PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the infusion-pump firmware inquiry",
  "DAYS_TOTAL": 3,
  "overclaimTease": "An intrusion story is vivid; the harder question is whether the machine's own records describe a repeatable path to failure.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "firmlead",
      "items": [
        {
          "id": "tamperer",
          "label": "An outside tamperer"
        },
        {
          "id": "firmlead",
          "label": "Cal Devereux — the device firmware lead"
        },
        {
          "id": "regulator",
          "label": "The device regulator"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "office",
      "items": [
        {
          "id": "bench",
          "label": "The Device & Test Bench"
        },
        {
          "id": "firmlab",
          "label": "The Firmware Verification Lab"
        },
        {
          "id": "office",
          "label": "The Engineering Lead's Office"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "defect",
      "items": [
        {
          "id": "tamper",
          "label": "An intruder changed the dose command and erased the trace"
        },
        {
          "id": "glitch",
          "label": "A rare bit error corrupted one dose despite intact safeguards"
        },
        {
          "id": "defect",
          "label": "A known timing fault shipped after its watchdog was removed"
        }
      ]
    }
  },
  "READING_ORDER": [
    "firmeng",
    "hwtech",
    "clerk"
  ],
  "CHARACTERS": {
    "firmeng": {
      "name": "The Firmware Engineer",
      "role": "Embedded firmware engineer",
      "face": "💾",
      "badge": "F",
      "legend": "the release console",
      "hint": "Ran the failing schedule repeatedly and watched it produce the same valid-looking command.",
      "reading": "m_hamming"
    },
    "hwtech": {
      "name": "The Hardware Test Engineer",
      "role": "Hardware test engineer",
      "face": "🔌",
      "badge": "H",
      "legend": "the safety board",
      "hint": "Compared board revisions and found the independent watchdog missing from the production unit.",
      "reading": "m_faulttol"
    },
    "clerk": {
      "name": "The Clerk",
      "role": "Design records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the release archive",
      "hint": "Holds the defect disposition, the cost waiver, and the final authorization in one file.",
      "reading": "m_microprog"
    }
  },
  "TOPICS": {
    "m_hamming": {
      "sci": "Richard Hamming (1915-1998)",
      "topic": "Error-detecting & correcting codes",
      "lede": "A ruined weekend computation pushed Richard Hamming to make machines locate their own corrupted bits.",
      "no": 1,
      "profile": "Richard Hamming arrived at Bell Telephone Laboratories after wartime work on the Manhattan Project and became an energetic advocate for electronic computation. In 1947 he expected a relay computer to spend the weekend processing colleagues' calculations. Instead, a detected error stopped the machine early, leaving Monday morning with no useful results. Hamming's frustration became a precise question: if a computer could notice that something was wrong, why could it not determine which bit was wrong and repair it?\n\nOrdinary parity adds one check bit that reveals whether an odd number of bits has flipped, but it does not identify the damaged position. Hamming arranged several parity checks over overlapping groups of data bits. A single flipped bit then fails a distinctive combination of checks. Read together, those failures form a syndrome: a compact address of the bad position. With enough separation between valid codewords—what became known as Hamming distance—a receiver can distinguish a valid word from a nearby corrupted one and correct a single-bit error.\n\nThe method also teaches what error-correcting codes do not prove. They protect representations of data against certain changes in storage or transmission. They do not detect a program that follows its own instructions and computes the wrong but perfectly well-formed value. A dosage command can pass parity, checksum, and format tests while still being unsafe if a timing path or state transition produces it deterministically.\n\nThat distinction matters in this inquiry. A random memory upset should leave evidence in protection checks or vary unpredictably. A failure that returns under the same scheduling sequence, while its command word remains internally valid, points elsewhere. Hamming's lesson is to separate corrupted data from incorrect logic before blaming either a mysterious intruder or unpreventable chance.",
      "frame": "Slides three identical trace printouts beside a parity report. “One of these stories is random corruption. The other is a machine doing exactly what its code permits. Tell me which evidence separates them.”",
      "q": [
        {
          "q": "How can a Hamming code locate a single flipped bit rather than merely notice an error?",
          "o": [
            {
              "t": "Overlapping parity checks fail in a pattern that identifies the bit position.",
              "v": "expert",
              "fb": "The combined parity failures form a syndrome whose binary pattern points to the corrupted position."
            },
            {
              "t": "A repeated copy is compared byte by byte until the first mismatch appears.",
              "v": "partial",
              "fb": "Duplication can reveal disagreement, but it does not by itself tell which copy or bit is correct."
            },
            {
              "t": "A checksum is recomputed after every instruction and names the faulty address.",
              "v": "wrong",
              "fb": "A checksum can flag changed data, but standard checksums do not directly encode the bad bit's location."
            },
            {
              "t": "The processor reruns the calculation and assumes the second result is accurate.",
              "v": "danger",
              "fb": "Rerunning may reproduce a deterministic software fault and offers no correction rule for corrupted data."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The repeatable failures were closed under the credential of the person who owned the release gate—not by anyone outside the device team."
          }
        },
        {
          "q": "The pump issues the same excessive command whenever two tasks overlap, yet every parity check passes. What does Hamming's distinction suggest?",
          "o": [
            {
              "t": "The command is likely valid data produced by a repeatable logic or timing fault.",
              "v": "expert",
              "fb": "Protection bits can remain correct when software consistently computes an unsafe but well-formed value."
            },
            {
              "t": "The same memory cell is probably struck by radiation during each task overlap.",
              "v": "danger",
              "fb": "Radiation-induced bit flips are not expected to recur on command under one software scheduling pattern."
            },
            {
              "t": "The parity system is probably broken because unsafe values ought to fail its checks.",
              "v": "wrong",
              "fb": "Parity tests data integrity, not whether the program's intended computation is medically safe."
            },
            {
              "t": "The trace is inconclusive until an outside attacker is ruled out by network logs.",
              "v": "partial",
              "fb": "Network evidence matters, but deterministic reproduction already weighs strongly against a stray altered bit."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "The dangerous dose reappeared under one scheduling pattern while its parity remained clean; Hamming's test points away from a stray bit."
          }
        },
        {
          "q": "What evidence would most strongly support a genuine single-bit corruption in a protected dose word?",
          "o": [
            {
              "t": "A nonzero syndrome identifies one position, and correction restores a valid word.",
              "v": "expert",
              "fb": "That is the signature Hamming coding was designed to expose and repair."
            },
            {
              "t": "The same overdose appears whenever the logging task interrupts the dose task.",
              "v": "danger",
              "fb": "A trigger tied to task timing is evidence of program behavior rather than isolated data corruption."
            },
            {
              "t": "The command is clinically wrong but still matches every stored check bit exactly.",
              "v": "wrong",
              "fb": "A fully consistent codeword offers no Hamming-code evidence that a protected bit changed."
            },
            {
              "t": "A tester recalls one earlier anomaly without a reproducible trace or preserved data.",
              "v": "partial",
              "fb": "An anecdote may justify investigation, but it lacks the syndrome needed to diagnose a bit error."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The bench data passed its protection checks; the decisive artifact is the signed disposition attached later to the release file."
          }
        }
      ]
    },
    "m_faulttol": {
      "sci": "Algirdas Avizienis (b. 1932)",
      "topic": "Fault-tolerant computing",
      "lede": "Algirdas Avizienis treated failure as a chain that careful architecture could interrupt before harm reached the user.",
      "no": 2,
      "profile": "Algirdas Avizienis was born in Kaunas, Lithuania, and reached the United States in 1950 after years in displaced-person camps in Germany. He studied electrical engineering at the University of Illinois, contributed to the ILLIAC II computer, and developed signed-digit arithmetic for faster calculation. After joining UCLA in 1962, he became one of the defining researchers in fault-tolerant computer architecture.\n\nFault tolerance begins by separating three stages that everyday speech often blends together. A fault is the underlying cause: a defective component, an incorrect design decision, or a software bug. When activated, the fault creates an erroneous internal state. If that error reaches the system's external service, the user experiences a failure. Designers cannot promise that faults will never exist, so they build barriers that detect, contain, mask, or recover from errors before service becomes unsafe.\n\nAvizienis studied redundancy in both hardware and software. Independent checking, replicated computations, voting, recovery blocks, and later N-version programming all pursue the same broad aim: one fault should not be allowed to dictate the final output unchecked. Independence is the difficult part. Two channels that share the same mistaken requirement or the same power source may fail together. A watchdog—a separate circuit that expects periodic signs of healthy operation—can be valuable precisely because it stands outside the main software path and can force a safe state when timing goes wrong.\n\nFor an infusion pump, the central question is not whether the firmware contained a fault; complex systems often do. It is whether the design still had an independent barrier between that fault and a patient. Avizienis's fault-error-failure chain makes the missing link visible. If a known software condition became lethal only after an external checker was deleted, calling the event either pure sabotage or meaningless bad luck misses the architecture that converted an internal error into delivered harm.",
      "frame": "Sets the production board beside an earlier revision and taps the empty footprint near the timer line. “A fault is not yet a failure. Show me where the chain was supposed to break.”",
      "q": [
        {
          "q": "In Avizienis's framework, which sequence correctly describes how harm emerges from a latent defect?",
          "o": [
            {
              "t": "A fault activates, creates an internal error, and the error reaches service as failure.",
              "v": "expert",
              "fb": "The distinction matters because defenses can interrupt the chain between fault, error, and visible failure."
            },
            {
              "t": "A failure appears first, then engineers infer an error and finally document a fault.",
              "v": "partial",
              "fb": "That may describe an investigation's chronology, but not the causal sequence inside the system."
            },
            {
              "t": "An error and a fault are interchangeable terms until a user reports an injury.",
              "v": "wrong",
              "fb": "Dependability analysis separates the cause from the incorrect state it produces."
            },
            {
              "t": "A fault becomes a failure when an attacker deliberately activates the vulnerable feature.",
              "v": "danger",
              "fb": "Design faults can activate through ordinary operating conditions without malicious intervention."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "One internal timing error reached the patient only after the independent checker vanished; Avizienis would call that a broken containment chain."
          }
        },
        {
          "q": "Why is an independent hardware watchdog different from simply adding another software check?",
          "o": [
            {
              "t": "It can detect missed timing from outside the code path and force a safe state.",
              "v": "expert",
              "fb": "A checker outside the failing software can still act when that software stalls or runs out of sequence."
            },
            {
              "t": "It indicates the firmware is defect-free because hardware timing is deterministic.",
              "v": "wrong",
              "fb": "A watchdog limits consequences; it does not establish that the monitored software is defect-free."
            },
            {
              "t": "It duplicates the same program so both copies agree on the calculated dose.",
              "v": "danger",
              "fb": "Identical copies can repeat the same design mistake and therefore lack useful independence."
            },
            {
              "t": "It records each instruction for later review without changing pump operation.",
              "v": "partial",
              "fb": "Logging helps reconstruction, while a true watchdog can intervene before unsafe service is delivered."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The watchdog was not lost during bench repair; its deletion appears in a cost waiver approved where shipment and design authority met."
          }
        },
        {
          "q": "Which design change most clearly reduces fault tolerance even if the main firmware is unchanged?",
          "o": [
            {
              "t": "Removing the separate watchdog that resets the pump after a missed deadline.",
              "v": "expert",
              "fb": "The main fault remains, but deleting an independent recovery barrier makes its consequences far more severe."
            },
            {
              "t": "Replacing a status lamp with a lower-power lamp of the same specification.",
              "v": "wrong",
              "fb": "A like-for-like indicator change does not remove a barrier in the dose-control path."
            },
            {
              "t": "Increasing log storage so more diagnostic records survive after treatment.",
              "v": "partial",
              "fb": "Better evidence aids investigation, but it does not itself stop an unsafe command from reaching the patient."
            },
            {
              "t": "Encrypting service traffic while keeping the timing monitor fully independent.",
              "v": "danger",
              "fb": "Security can matter, yet this change leaves the relevant fault-containment mechanism intact."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The same release authority accepted the unresolved timing fault and signed the waiver removing its independent backstop."
          }
        }
      ]
    },
    "m_microprog": {
      "sci": "Maurice Wilkes (1913-2010)",
      "topic": "Microprogramming & stored control",
      "lede": "Maurice Wilkes showed that a computer's control logic could be written, revised, and therefore audited like a program.",
      "no": 3,
      "profile": "Maurice Wilkes returned to Cambridge after the Second World War determined to build a practical stored-program computer. After attending the Moore School lectures in Philadelphia in 1946, he led the construction of EDSAC at the University of Cambridge Mathematical Laboratory. The machine ran its first programs in May 1949 and soon became a working scientific service rather than a laboratory demonstration. Wilkes and colleagues also produced an early textbook on programming, complete with reusable subroutines and attention to the stubborn labor of debugging.\n\nEarly processors controlled their internal steps with complicated networks of gates and timing signals. Wilkes proposed microprogramming: represent those low-level control sequences as words in a control store. Each microinstruction activates selected operations—move a value, select an arithmetic function, advance a sequence—and a succession of microinstructions implements a machine instruction. The approach made control units more systematic. Behavior that would otherwise be buried in wiring could be specified as an ordered body of control information.\n\nThat change created a powerful investigative idea. When control is stored, versions matter. A machine can behave differently because its control sequence changed even though its visible hardware looks the same. Engineers can compare revisions, trace which branch executed, and ask who authorized a particular control image. Conversely, a perfectly authentic image may still contain a flawed sequence; authenticity and correctness are separate questions.\n\nModern infusion pumps do not use Wilkes's original diode-matrix control stores, but their firmware inherits the same principle: behavior is embodied in a specific, versioned set of instructions. The inquiry therefore turns on provenance. Which build was tested, which build shipped, what defect disposition accompanied it, and who approved the final combination? Wilkes's legacy directs attention away from dramatic speculation and toward the mundane but decisive chain linking source, compiled image, release record, and device behavior.",
      "frame": "Opens a release binder to three version hashes and a handwritten disposition code. “Hardware can look unchanged while stored control tells a different story. Reconstruct which version became the machine.”",
      "q": [
        {
          "q": "What was the central advantage of Wilkes's microprogramming idea for processor control?",
          "o": [
            {
              "t": "Control sequences could be written as microinstructions rather than fixed wiring alone.",
              "v": "expert",
              "fb": "Microprogramming made low-level processor behavior systematic and revisable through a control store."
            },
            {
              "t": "Programs no longer needed memory because every instruction was rebuilt from switches.",
              "v": "wrong",
              "fb": "Microprogramming still depends on stored control information and does not eliminate program memory."
            },
            {
              "t": "Each user program gained direct authority to rewire the processor during execution.",
              "v": "danger",
              "fb": "The control store structures internal operation; ordinary applications do not freely rewire the machine."
            },
            {
              "t": "The arithmetic unit could correct any wrong result by repeating the last instruction.",
              "v": "partial",
              "fb": "Repeatability may aid diagnosis, but microprogramming is a method of organizing control, not universal correction."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The shipped control image and the order closing its defect are bound together in the release archive kept beyond the lab."
          }
        },
        {
          "q": "Two pumps have identical circuit boards but different signed firmware hashes. What would Wilkes's insight make investigators compare first?",
          "o": [
            {
              "t": "The stored control versions and the exact branch sequence each version executes.",
              "v": "expert",
              "fb": "Identical hardware can deliver different behavior when its versioned control instructions differ."
            },
            {
              "t": "The paint, serial labels, and enclosure screws for evidence of physical entry.",
              "v": "partial",
              "fb": "Physical inspection can test tampering, but it does not explain version-dependent control behavior."
            },
            {
              "t": "The patient's chart first, because a signed build is assumed free of internal defects.",
              "v": "danger",
              "fb": "A valid signature proves provenance, not that the signed program is correct or safe."
            },
            {
              "t": "The battery voltage, since software hashes change whenever supply voltage drifts.",
              "v": "wrong",
              "fb": "A cryptographic hash changes with the software image, not with ordinary operating voltage."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "The production hash matches the authorized build exactly; the unsafe control path was inside the approved image rather than inserted afterward."
          }
        },
        {
          "q": "Which record best establishes who was responsible for the control image that reached production?",
          "o": [
            {
              "t": "The release manifest linking the signed build, defect disposition, and approver.",
              "v": "expert",
              "fb": "That chain connects the executable image to the decision that allowed it into production."
            },
            {
              "t": "A laboratory notebook showing who first observed the timing anomaly months earlier.",
              "v": "partial",
              "fb": "Discovery history matters, but it does not identify the authority who released the final image."
            },
            {
              "t": "A regulator's later inspection report describing the pump after the overdose occurred.",
              "v": "danger",
              "fb": "Post-event oversight does not establish who approved the pre-event production configuration."
            },
            {
              "t": "A network scan showing no unknown device connected during the patient's treatment.",
              "v": "wrong",
              "fb": "The scan can weaken an intrusion theory but cannot assign responsibility for the shipped build."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The decisive manifest belongs to the lead who controlled firmware releases, not to the later regulator or an unseen intruder."
          }
        }
      ]
    }
  },
  "story": [
    "<b>At 02:14, the Halden pump delivered a dose its patient never survived.</b> The device passed its start-up checks and preserved a clean command record.",
    "The Firmware Engineer has three matching execution traces. The Hardware Test Engineer has two board revisions. The Clerk has the release archive that joins them.",
    "A remotely altered command explains the drama. A rare bit error explains the apparent randomness. Both accounts have technical details that initially fit.",
    "You may accuse at any time. Each correct answer earns one notebook clue; after three readings, the nine notes can reconstruct the whole chain from design decision to bedside failure."
  ],
  "endings": {
    "overclaimWhat": "tamper",
    "dismissalWhat": "glitch",
    "win": {
      "expertTitle": "The Released Failure Chain",
      "expert": [
        "You name <b>Cal Devereux — the device firmware lead</b>, <b>The Engineering Lead's Office</b>, and <b>A known timing fault shipped after its watchdog was removed</b>. The traces repeat without a Hamming syndrome, the production image is authentic, and the board revision lacks the independent timing backstop.",
        "It was not an intruder rewriting a dose, and it was not a lone bit error defeating intact safeguards. The release record joins the unresolved timing defect, the watchdog waiver, and the authority that sent both into production."
      ],
      "soundTitle": "The Architecture Holds",
      "sound": [
        "Your accusation reaches the right person, place, and mechanism. The evidence shows a deterministic firmware path and a removed independent checker rather than altered data.",
        "The archive in the Engineering Lead's Office supplies the decision chain the technical traces alone could not name."
      ],
      "namedTitle": "Right Names, Thin Chain",
      "named": [
        "You identify Cal Devereux, the Engineering Lead's Office, and the known timing fault with its watchdog removed.",
        "The conclusion is correct, though unanswered questions leave parts of the release sequence less firmly established."
      ]
    },
    "overclaim": {
      "title": "A Vivid Intruder, an Authentic Build",
      "body": [
        "The tampering theory mistakes an unsafe command for an altered command. The signed production image matches the authorized release, and the failure reproduces under a specific internal schedule.",
        "By centering an unseen attacker, the accusation neglects the documented defect and the removed barrier that made it lethal."
      ]
    },
    "dismissal": {
      "title": "Chance Does Not Repeat on Cue",
      "body": [
        "A rare bit error would be a tempting explanation for one impossible-looking dose, but the event repeats under the same task overlap while parity remains clean.",
        "Calling it unpreventable erases the known software condition and the independent watchdog that had once kept that condition from reaching the patient."
      ]
    },
    "wrongNames": {
      "title": "The Mechanism, Misassigned",
      "body": [
        "You recognize the known timing fault and missing watchdog, but the release manifest and waiver place responsibility and culmination elsewhere than your accusation."
      ]
    }
  }
} };
