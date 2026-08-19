module.exports = { PACK: {
  "id": "f_firmware",
  "title": "The Halden Infusion Pump",
  "discipline": "Embedded & Firmware Engineering",
  "teaser": "A drug pump delivered a lethal dose to a sleeping patient. A tampered device? A one-in-a-million glitch? Or a defect hidden and a hardware check taken out?",
  "overclaimTag": "a tampered device",
  "truthTag": "a hidden firmware defect and a deleted hardware check",
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
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The WHERE you test determines the dossier, and the conversation costs one day.",
  "overclaimTease": "The tamper story is vivid; let the device’s complete record speak before assigning an intruder.",
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
          "label": "The device was tampered with"
        },
        {
          "id": "glitch",
          "label": "A one-in-a-million glitch — nothing preventable"
        },
        {
          "id": "defect",
          "label": "A concealed firmware defect and a hardware safety check removed"
        }
      ]
    }
  },
  "PLACES": {
    "bench": {
      "name": "The Device & Test Bench",
      "xy": [
        140,
        90
      ]
    },
    "firmlab": {
      "name": "The Firmware Verification Lab",
      "xy": [
        330,
        240
      ]
    },
    "office": {
      "name": "The Engineering Lead's Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "bench",
      "firmlab"
    ],
    [
      "firmlab",
      "office"
    ]
  ],
  "CHARACTERS": {
    "firmeng": {
      "name": "The Firmware Engineer",
      "role": "Embedded firmware engineer",
      "face": "💾",
      "badge": "F",
      "legend": "the firmware lab",
      "hint": "Wrote the tests; the failing case was known and quietly closed as 'won't fix'."
    },
    "hwtech": {
      "name": "The Hardware Test Engineer",
      "role": "Hardware test engineer",
      "face": "🔌",
      "badge": "H",
      "legend": "the test bench",
      "hint": "Checks the boards; the safety watchdog chip was deleted to cut cost."
    },
    "clerk": {
      "name": "The Clerk",
      "role": "Design records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Keeps the defect log — and the order to ship with the check removed."
    }
  },
  "TOPICMAP": {
    "bench": {
      "firmeng": [
        "m_hamming"
      ],
      "hwtech": [
        "m_fano"
      ],
      "clerk": [
        "m_solomon"
      ]
    },
    "firmlab": {
      "firmeng": [
        "m_ldpc"
      ],
      "hwtech": [
        "m_kilby"
      ],
      "clerk": [
        "m_micro"
      ]
    },
    "office": {
      "firmeng": [
        "m_vlsimethod"
      ],
      "hwtech": [
        "m_faulttol"
      ],
      "clerk": [
        "m_dependable"
      ]
    }
  },
  "TOPICS": {
    "m_hamming": {
      "sci": "Richard Hamming (1915-1998)",
      "topic": "Error-detecting & correcting codes",
      "lede": "Richard Hamming made error-detecting and correcting codes a tool for catching faults before corrupted state became physical action.",
      "no": 1,
      "profile": "Today’s embedded-systems dispatch follows Richard Hamming into error-detecting and correcting codes. At Bell Laboratories, Richard Hamming developed parity-based codes that could locate and correct errors rather than merely notice that a bit had changed. Firmware sits between physical components and user intent: it samples inputs, changes state, commands outputs, and decides what to do when evidence conflicts. Hamming’s work makes one part of that chain concrete rather than magical.\n\nThe central engineering procedure is to add redundant check bits in carefully chosen positions, compute a syndrome from the received word, and use that pattern to identify a damaged bit. Designers must state the assumed fault, the information available to detect it, the time allowed for response, and the safe condition reached afterward. Tests should include corrupt inputs, interrupted sequences, stale state, timing races, and failures of the monitor itself.\n\nEmbedded reliability is often described as a property of code, yet the real system includes sensors, clocks, buses, power, processors, actuators, and people maintaining them. A software check can catch a hardware fault; a hardware watchdog can contain frozen software. Removing either layer changes the safety argument even when ordinary operation looks identical.\n\nThe durable lesson is redundancy designed in advance can turn an unpredictable hardware error into a diagnosable and correctable event. Dependability comes from explicit fault assumptions, independent checks, and evidence that failure paths end safely. A safeguard that can be bypassed without a logged, reviewed exception is not an independent safeguard. Error handling belongs in the design specification because improvised recovery is itself a source of unsafe state.",
      "frame": "Steadies a logic probe above the board. \"At The Device & Test Bench, one unchecked state can command real hardware. Explain error-detecting and correcting codes.\"",
      "q": [
        {
          "q": "Which engineering account best captures Richard Hamming’s contribution to error-detecting and correcting codes?",
          "o": [
            {
              "t": "At Bell Laboratories, Richard Hamming developed parity-based codes that could locate and correct errors rather than merely notice that a bit had changed. The firmware chronology keeps assumptions explicit.",
              "v": "expert",
              "fb": "Correct: dependable embedded systems connect an explicit fault model to detection, containment, and recovery."
            },
            {
              "t": "Richard Hamming is linked to error-detecting and correcting codes, yet the account checks routine behavior without identifying the encoded fault or recovery mechanism. The monitor itself is untested in practice.",
              "v": "partial",
              "fb": "Nominal testing contributes evidence but does not exercise the failure path described by the design."
            },
            {
              "t": "Richard Hamming is said to prove error-detecting and correcting codes through one clean bench run, as though nominal output demonstrated every unsafe transition. The state evidence contradicts that in context.",
              "v": "wrong",
              "fb": "A passing normal run cannot demonstrate behavior during corrupt state, race conditions, or monitor failure."
            },
            {
              "t": "Richard Hamming is invoked to remove redundant protection because a severe fault has appeared too rarely to deserve independent containment. Under the firmware chronology, warning is postponed in context.",
              "v": "danger",
              "fb": "Low observed frequency does not make a safety barrier unnecessary when the consequence is severe."
            }
          ]
        },
        {
          "q": "Which verification step best follows this profile?",
          "o": [
            {
              "t": "On the bench, apply this procedure: add redundant check bits in carefully chosen positions, compute a syndrome from the received word, and use that pattern to identify a damaged bit.",
              "v": "expert",
              "fb": "Correct: dependable embedded systems connect an explicit fault model to detection, containment, and recovery."
            },
            {
              "t": "Exercise normal inputs and archive the outputs, but omit fault injection and rarely test whether the monitor reaches a safe state. The firmware chronology leaves one test open.",
              "v": "partial",
              "fb": "Nominal testing contributes evidence but does not exercise the failure path described by the design."
            },
            {
              "t": "Infer error handling from successful service behavior, leaving corrupt state, timing races, and failed supervision outside the evidence. The firmware chronology defeats that inference.",
              "v": "wrong",
              "fb": "A passing normal run cannot demonstrate behavior during corrupt state, race conditions, or monitor failure."
            },
            {
              "t": "Ship the preferred build, close the failing test as exceptional, and promise to revisit the protection after wider deployment. Under the firmware chronology, warning is postponed.",
              "v": "danger",
              "fb": "Low observed frequency does not make a safety barrier unnecessary when the consequence is severe."
            }
          ]
        },
        {
          "q": "Which design conclusion follows most responsibly?",
          "o": [
            {
              "t": "The engineering takeaway is that redundancy designed in advance can turn an unpredictable hardware error into a diagnosable and correctable event. The safe state is specified in the case file.",
              "v": "expert",
              "fb": "Correct: dependable embedded systems connect an explicit fault model to detection, containment, and recovery."
            },
            {
              "t": "The design can be improved later, while unclear fault assumptions and incomplete transition coverage remain acceptable for release. The firmware chronology leaves one test open in the case file.",
              "v": "partial",
              "fb": "Nominal testing contributes evidence but does not exercise the failure path described by the design."
            },
            {
              "t": "A functioning nominal path establishes dependable operation even when the specified error mechanism and safety response were rarely exercised. The state evidence contradicts that in the case file.",
              "v": "wrong",
              "fb": "A passing normal run cannot demonstrate behavior during corrupt state, race conditions, or monitor failure."
            },
            {
              "t": "The result is presumed to indicate sabotage or a meaningless random glitch, so a documented design weakness belongs to neither explanation. Under the firmware chronology, warning is postponed.",
              "v": "danger",
              "fb": "Low observed frequency does not make a safety barrier unnecessary when the consequence is severe."
            }
          ]
        }
      ]
    },
    "m_fano": {
      "sci": "Robert Fano (1917-2016)",
      "topic": "Information & coding theory",
      "lede": "Robert Fano gave embedded designers a concrete method for reasoning about information and coding theory.",
      "no": 2,
      "profile": "Today’s embedded-systems dispatch follows Robert Fano into information and coding theory. Robert Fano helped establish modern information and coding theory at MIT, including influential work on sequential decoding and the limits imposed by noisy channels. Firmware sits between physical components and user intent: it samples inputs, changes state, commands outputs, and decides what to do when evidence conflicts. Fano’s work makes one part of that chain concrete rather than magical.\n\nThe central engineering procedure is to compare probable message paths against channel evidence, discard implausible branches, and quantify how rate and noise affect reliable transmission. Designers must state the assumed fault, the information available to detect it, the time allowed for response, and the safe condition reached afterward. Tests should include corrupt inputs, interrupted sequences, stale state, timing races, and failures of the monitor itself.\n\nEmbedded reliability is often described as a property of code, yet the real system includes sensors, clocks, buses, power, processors, actuators, and people maintaining them. A software check can catch a hardware fault; a hardware watchdog can contain frozen software. Removing either layer changes the safety argument even when ordinary operation looks identical.\n\nThe durable lesson is a decoder must manage uncertainty explicitly because plausible data can still be wrong when the channel is noisy. Dependability comes from explicit fault assumptions, independent checks, and evidence that failure paths end safely. A passing demonstration covers one trajectory; a verification plan must cover the transitions that should never occur. A safeguard that can be bypassed without a logged, reviewed exception is not an independent safeguard.",
      "frame": "Closes the service panel. \"Before I release the defect record, tell me how information and coding theory should fail safely.\"",
      "q": [
        {
          "q": "Which engineering account best captures Robert Fano’s contribution to information and coding theory?",
          "o": [
            {
              "t": "Robert Fano helped establish modern information and coding theory at MIT, including influential work on sequential decoding and the limits imposed by noisy channels. The safe state is specified.",
              "v": "expert",
              "fb": "Correct: dependable embedded systems connect an explicit fault model to detection, containment, and recovery."
            },
            {
              "t": "Robert Fano is linked to information and coding theory, yet the account checks routine behavior without identifying the encoded fault or recovery mechanism. The monitor itself is untested.",
              "v": "partial",
              "fb": "Nominal testing contributes evidence but does not exercise the failure path described by the design."
            },
            {
              "t": "Robert Fano is said to prove information and coding theory through one clean bench run, as though nominal output demonstrated every unsafe transition. The state evidence contradicts that.",
              "v": "wrong",
              "fb": "A passing normal run cannot demonstrate behavior during corrupt state, race conditions, or monitor failure."
            },
            {
              "t": "Robert Fano is invoked to remove redundant protection because a severe fault has appeared too rarely to deserve independent containment. Under the firmware chronology, warning is postponed.",
              "v": "danger",
              "fb": "Low observed frequency does not make a safety barrier unnecessary when the consequence is severe."
            }
          ]
        },
        {
          "q": "Which verification step best follows this profile?",
          "o": [
            {
              "t": "On the bench, apply this procedure: compare probable message paths against channel evidence, discard implausible branches, and quantify how rate and noise affect reliable transmission.",
              "v": "expert",
              "fb": "Correct: dependable embedded systems connect an explicit fault model to detection, containment, and recovery."
            },
            {
              "t": "Exercise normal inputs and archive the outputs, but omit fault injection and rarely test whether the monitor reaches a safe state. Support across the firmware chronology stays partial.",
              "v": "partial",
              "fb": "Nominal testing contributes evidence but does not exercise the failure path described by the design."
            },
            {
              "t": "Infer error handling from successful service behavior, leaving corrupt state, timing races, and failed supervision outside the evidence. The firmware chronology points to another result.",
              "v": "wrong",
              "fb": "A passing normal run cannot demonstrate behavior during corrupt state, race conditions, or monitor failure."
            },
            {
              "t": "Ship the preferred build, close the failing test as exceptional, and promise to revisit the protection after wider deployment. Under the firmware chronology, warning is postponed.",
              "v": "danger",
              "fb": "Low observed frequency does not make a safety barrier unnecessary when the consequence is severe."
            }
          ]
        },
        {
          "q": "Which design conclusion follows most responsibly?",
          "o": [
            {
              "t": "The engineering takeaway is that a decoder must manage uncertainty explicitly because plausible data can still be wrong when the channel is noisy. The safe state is specified in the case file.",
              "v": "expert",
              "fb": "Correct: dependable embedded systems connect an explicit fault model to detection, containment, and recovery."
            },
            {
              "t": "The design can be improved later, while unclear fault assumptions and incomplete transition coverage remain acceptable for release. The firmware chronology leaves one test open in the case file.",
              "v": "partial",
              "fb": "Nominal testing contributes evidence but does not exercise the failure path described by the design."
            },
            {
              "t": "A functioning nominal path establishes dependable operation even when the specified error mechanism and safety response were rarely exercised. The state evidence contradicts that in the case file.",
              "v": "wrong",
              "fb": "A passing normal run cannot demonstrate behavior during corrupt state, race conditions, or monitor failure."
            },
            {
              "t": "The result is presumed to indicate sabotage or a meaningless random glitch, so a documented design weakness belongs to neither explanation. Under the firmware chronology, warning is postponed.",
              "v": "danger",
              "fb": "Low observed frequency does not make a safety barrier unnecessary when the consequence is severe."
            }
          ]
        }
      ]
    },
    "m_solomon": {
      "sci": "Gustave Solomon (1930-1996)",
      "topic": "Reed-Solomon codes",
      "lede": "Bits, gates, and recovery paths meet in Gustave Solomon’s work on Reed-Solomon codes.",
      "no": 3,
      "profile": "Today’s embedded-systems dispatch follows Gustave Solomon into Reed-Solomon codes. Gustave Solomon shared authorship of Reed–Solomon codes, whose algebraic structure later became central to spacecraft links, optical media, barcodes, and digital storage. Firmware sits between physical components and user intent: it samples inputs, changes state, commands outputs, and decides what to do when evidence conflicts. Solomon’s work makes one part of that chain concrete rather than magical.\n\nThe central engineering procedure is to use extra polynomial evaluations as check symbols and solve the resulting algebra to locate and repair bad symbols. Designers must state the assumed fault, the information available to detect it, the time allowed for response, and the safe condition reached afterward. Tests should include corrupt inputs, interrupted sequences, stale state, timing races, and failures of the monitor itself.\n\nEmbedded reliability is often described as a property of code, yet the real system includes sensors, clocks, buses, power, processors, actuators, and people maintaining them. A software check can catch a hardware fault; a hardware watchdog can contain frozen software. Removing either layer changes the safety argument even when ordinary operation looks identical.\n\nThe durable lesson is mathematical structure can make recovery possible even after several parts of a stored or transmitted block are lost. Dependability comes from explicit fault assumptions, independent checks, and evidence that failure paths end safely. Error handling belongs in the design specification because improvised recovery is itself a source of unsafe state. A passing demonstration covers one trajectory; a verification plan must cover the transitions that should never occur.",
      "frame": "Scrolls to a timestamped fault. \"The normal test passed; the transition did not. Show me what Reed-Solomon codes protects.\"",
      "q": [
        {
          "q": "Which engineering account best captures Gustave Solomon’s contribution to Reed-Solomon codes?",
          "o": [
            {
              "t": "Gustave Solomon shared authorship of Reed–Solomon codes, whose algebraic structure later became central to spacecraft links, optical media, barcodes, and digital storage. The safe state is specified.",
              "v": "expert",
              "fb": "Correct: dependable embedded systems connect an explicit fault model to detection, containment, and recovery."
            },
            {
              "t": "Gustave Solomon is linked to Reed-Solomon codes, yet the account checks routine behavior without identifying the encoded fault or recovery mechanism. The transition coverage remains thin.",
              "v": "partial",
              "fb": "Nominal testing contributes evidence but does not exercise the failure path described by the design."
            },
            {
              "t": "Gustave Solomon is said to prove Reed-Solomon codes through one clean bench run, as though nominal output demonstrated every unsafe transition. The firmware chronology defeats that inference.",
              "v": "wrong",
              "fb": "A passing normal run cannot demonstrate behavior during corrupt state, race conditions, or monitor failure."
            },
            {
              "t": "Gustave Solomon is invoked to remove redundant protection because a severe fault has appeared too rarely to deserve independent containment. Under the firmware chronology, warning is postponed.",
              "v": "danger",
              "fb": "Low observed frequency does not make a safety barrier unnecessary when the consequence is severe."
            }
          ]
        },
        {
          "q": "Which verification step best follows this profile?",
          "o": [
            {
              "t": "On the bench, apply this procedure: use extra polynomial evaluations as check symbols and solve the resulting algebra to locate and repair bad symbols.",
              "v": "expert",
              "fb": "Correct: dependable embedded systems connect an explicit fault model to detection, containment, and recovery."
            },
            {
              "t": "Exercise normal inputs and archive the outputs, but omit fault injection and rarely test whether the monitor reaches a safe state. The monitor itself is untested.",
              "v": "partial",
              "fb": "Nominal testing contributes evidence but does not exercise the failure path described by the design."
            },
            {
              "t": "Infer error handling from successful service behavior, leaving corrupt state, timing races, and failed supervision outside the evidence. The fault model is absent.",
              "v": "wrong",
              "fb": "A passing normal run cannot demonstrate behavior during corrupt state, race conditions, or monitor failure."
            },
            {
              "t": "Ship the preferred build, close the failing test as exceptional, and promise to revisit the protection after wider deployment. Production outranks containment.",
              "v": "danger",
              "fb": "Low observed frequency does not make a safety barrier unnecessary when the consequence is severe."
            }
          ]
        },
        {
          "q": "Which design conclusion follows most responsibly?",
          "o": [
            {
              "t": "The engineering takeaway is that mathematical structure can make recovery possible even after several parts of a stored or transmitted block are lost. The safe state is specified in the case file.",
              "v": "expert",
              "fb": "Correct: dependable embedded systems connect an explicit fault model to detection, containment, and recovery."
            },
            {
              "t": "The design can be improved later, while unclear fault assumptions and incomplete transition coverage remain acceptable for release. The firmware chronology leaves one test open in the case file.",
              "v": "partial",
              "fb": "Nominal testing contributes evidence but does not exercise the failure path described by the design."
            },
            {
              "t": "A functioning nominal path establishes dependable operation even when the specified error mechanism and safety response were rarely exercised. The state evidence contradicts that in the case file.",
              "v": "wrong",
              "fb": "A passing normal run cannot demonstrate behavior during corrupt state, race conditions, or monitor failure."
            },
            {
              "t": "The result is presumed to indicate sabotage or a meaningless random glitch, so a documented design weakness belongs to neither explanation. Under the firmware chronology, warning is postponed.",
              "v": "danger",
              "fb": "Low observed frequency does not make a safety barrier unnecessary when the consequence is severe."
            }
          ]
        }
      ]
    },
    "m_ldpc": {
      "sci": "Robert Gallager (b. 1931)",
      "topic": "Low-density parity-check codes",
      "lede": "Robert Gallager made low-density parity-check codes a tool for catching faults before corrupted state became physical action.",
      "no": 4,
      "profile": "Today’s embedded-systems dispatch follows Robert Gallager into low-density parity-check codes. Robert Gallager described low-density parity-check codes in his MIT doctoral work, using sparse parity relations that permit powerful iterative decoding. Firmware sits between physical components and user intent: it samples inputs, changes state, commands outputs, and decides what to do when evidence conflicts. Gallager’s work makes one part of that chain concrete rather than magical.\n\nThe central engineering procedure is to connect bits and parity checks in a sparse graph, pass probabilistic messages between them, and iterate until the constraints agree. Designers must state the assumed fault, the information available to detect it, the time allowed for response, and the safe condition reached afterward. Tests should include corrupt inputs, interrupted sequences, stale state, timing races, and failures of the monitor itself.\n\nEmbedded reliability is often described as a property of code, yet the real system includes sensors, clocks, buses, power, processors, actuators, and people maintaining them. A software check can catch a hardware fault; a hardware watchdog can contain frozen software. Removing either layer changes the safety argument even when ordinary operation looks identical.\n\nThe durable lesson is many simple local checks can collectively expose and correct complex error patterns without one giant centralized calculation. Dependability comes from explicit fault assumptions, independent checks, and evidence that failure paths end safely. A safeguard that can be bypassed without a logged, reviewed exception is not an independent safeguard. Error handling belongs in the design specification because improvised recovery is itself a source of unsafe state.",
      "frame": "Steadies a logic probe above the board. \"At The Firmware Verification Lab, one unchecked state can command real hardware. Explain low-density parity-check codes.\"",
      "q": [
        {
          "q": "Which engineering account best captures Robert Gallager’s contribution to low-density parity-check codes?",
          "o": [
            {
              "t": "Robert Gallager described low-density parity-check codes in his MIT doctoral work, using sparse parity relations that permit powerful iterative decoding. The firmware chronology keeps assumptions explicit.",
              "v": "expert",
              "fb": "Correct: dependable embedded systems connect an explicit fault model to detection, containment, and recovery."
            },
            {
              "t": "Robert Gallager is linked to low-density parity-check codes, yet the account checks routine behavior without identifying the encoded fault or recovery mechanism. The transition coverage remains thin.",
              "v": "partial",
              "fb": "Nominal testing contributes evidence but does not exercise the failure path described by the design."
            },
            {
              "t": "Robert Gallager is said to prove low-density parity-check codes through one clean bench run, as though nominal output demonstrated every unsafe transition. The firmware chronology defeats that inference.",
              "v": "wrong",
              "fb": "A passing normal run cannot demonstrate behavior during corrupt state, race conditions, or monitor failure."
            },
            {
              "t": "Robert Gallager is invoked to remove redundant protection because a severe fault has appeared too rarely to deserve independent containment. Inside the firmware chronology, the claim outruns checks.",
              "v": "danger",
              "fb": "Low observed frequency does not make a safety barrier unnecessary when the consequence is severe."
            }
          ]
        },
        {
          "q": "Which verification step best follows this profile?",
          "o": [
            {
              "t": "On the bench, apply this procedure: connect bits and parity checks in a sparse graph, pass probabilistic messages between them, and iterate until the constraints agree.",
              "v": "expert",
              "fb": "Correct: dependable embedded systems connect an explicit fault model to detection, containment, and recovery."
            },
            {
              "t": "Exercise normal inputs and archive the outputs, but omit fault injection and rarely test whether the monitor reaches a safe state. The monitor itself is untested.",
              "v": "partial",
              "fb": "Nominal testing contributes evidence but does not exercise the failure path described by the design."
            },
            {
              "t": "Infer error handling from successful service behavior, leaving corrupt state, timing races, and failed supervision outside the evidence. The state evidence contradicts that.",
              "v": "wrong",
              "fb": "A passing normal run cannot demonstrate behavior during corrupt state, race conditions, or monitor failure."
            },
            {
              "t": "Ship the preferred build, close the failing test as exceptional, and promise to revisit the protection after wider deployment. The barrier disappears on assumption.",
              "v": "danger",
              "fb": "Low observed frequency does not make a safety barrier unnecessary when the consequence is severe."
            }
          ]
        },
        {
          "q": "Which design conclusion follows most responsibly?",
          "o": [
            {
              "t": "The engineering takeaway is that many simple local checks can collectively expose and correct complex error patterns without one giant centralized calculation. The safe state is specified in the case file.",
              "v": "expert",
              "fb": "Correct: dependable embedded systems connect an explicit fault model to detection, containment, and recovery."
            },
            {
              "t": "The design can be improved later, while unclear fault assumptions and incomplete transition coverage remain acceptable for release. The firmware chronology leaves an assumption unresolved in the case file.",
              "v": "partial",
              "fb": "Nominal testing contributes evidence but does not exercise the failure path described by the design."
            },
            {
              "t": "A functioning nominal path establishes dependable operation even when the specified error mechanism and safety response were rarely exercised. The firmware chronology defeats that inference in the case file.",
              "v": "wrong",
              "fb": "A passing normal run cannot demonstrate behavior during corrupt state, race conditions, or monitor failure."
            },
            {
              "t": "The result is presumed to indicate sabotage or a meaningless random glitch, so a documented design weakness belongs to neither explanation. Within the firmware chronology, assumption replaces verification.",
              "v": "danger",
              "fb": "Low observed frequency does not make a safety barrier unnecessary when the consequence is severe."
            }
          ]
        }
      ]
    },
    "m_kilby": {
      "sci": "Jack Kilby (1923-2005)",
      "topic": "The integrated circuit",
      "lede": "Jack Kilby gave embedded designers a concrete method for reasoning about the integrated circuit.",
      "no": 5,
      "profile": "Today’s embedded-systems dispatch follows Jack Kilby into the integrated circuit. At Texas Instruments in 1958, Jack Kilby demonstrated a working integrated circuit by fabricating several electronic components on one piece of semiconductor material. Firmware sits between physical components and user intent: it samples inputs, changes state, commands outputs, and decides what to do when evidence conflicts. Kilby’s work makes one part of that chain concrete rather than magical.\n\nThe central engineering procedure is to place active and passive circuit elements on a common substrate so connections become shorter, more repeatable, and suitable for manufacturing. Designers must state the assumed fault, the information available to detect it, the time allowed for response, and the safe condition reached afterward. Tests should include corrupt inputs, interrupted sequences, stale state, timing races, and failures of the monitor itself.\n\nEmbedded reliability is often described as a property of code, yet the real system includes sensors, clocks, buses, power, processors, actuators, and people maintaining them. A software check can catch a hardware fault; a hardware watchdog can contain frozen software. Removing either layer changes the safety argument even when ordinary operation looks identical.\n\nThe durable lesson is integration improves capability but also concentrates failure, making design verification and thermal limits increasingly important. Dependability comes from explicit fault assumptions, independent checks, and evidence that failure paths end safely. A passing demonstration covers one trajectory; a verification plan must cover the transitions that should never occur. A safeguard that can be bypassed without a logged, reviewed exception is not an independent safeguard.",
      "frame": "Closes the service panel. \"Before I release the defect record, tell me how the integrated circuit should fail safely.\"",
      "q": [
        {
          "q": "Which engineering account best captures Jack Kilby’s contribution to the integrated circuit?",
          "o": [
            {
              "t": "At Texas Instruments in 1958, Jack Kilby demonstrated a working integrated circuit by fabricating several electronic components on one piece of semiconductor material. The safe state is specified.",
              "v": "expert",
              "fb": "Correct: dependable embedded systems connect an explicit fault model to detection, containment, and recovery."
            },
            {
              "t": "Jack Kilby is linked to the integrated circuit, yet the account checks routine behavior without identifying the encoded fault or recovery mechanism. The transition coverage remains thin.",
              "v": "partial",
              "fb": "Nominal testing contributes evidence but does not exercise the failure path described by the design."
            },
            {
              "t": "Jack Kilby is said to prove the integrated circuit through one clean bench run, as though nominal output demonstrated every unsafe transition. The firmware chronology defeats that inference.",
              "v": "wrong",
              "fb": "A passing normal run cannot demonstrate behavior during corrupt state, race conditions, or monitor failure."
            },
            {
              "t": "Jack Kilby is invoked to remove redundant protection because a severe fault has appeared too rarely to deserve independent containment. Under the firmware chronology, warning is postponed.",
              "v": "danger",
              "fb": "Low observed frequency does not make a safety barrier unnecessary when the consequence is severe."
            }
          ]
        },
        {
          "q": "Which verification step best follows this profile?",
          "o": [
            {
              "t": "On the bench, apply this procedure: place active and passive circuit elements on a common substrate so connections become shorter, more repeatable, and suitable for manufacturing.",
              "v": "expert",
              "fb": "Correct: dependable embedded systems connect an explicit fault model to detection, containment, and recovery."
            },
            {
              "t": "Exercise normal inputs and archive the outputs, but omit fault injection and rarely test whether the monitor reaches a safe state. The firmware chronology leaves one test open.",
              "v": "partial",
              "fb": "Nominal testing contributes evidence but does not exercise the failure path described by the design."
            },
            {
              "t": "Infer error handling from successful service behavior, leaving corrupt state, timing races, and failed supervision outside the evidence. The firmware chronology defeats that inference.",
              "v": "wrong",
              "fb": "A passing normal run cannot demonstrate behavior during corrupt state, race conditions, or monitor failure."
            },
            {
              "t": "Ship the preferred build, close the failing test as exceptional, and promise to revisit the protection after wider deployment. Under the firmware chronology, warning is postponed.",
              "v": "danger",
              "fb": "Low observed frequency does not make a safety barrier unnecessary when the consequence is severe."
            }
          ]
        },
        {
          "q": "Which design conclusion follows most responsibly?",
          "o": [
            {
              "t": "The engineering takeaway is that integration improves capability but also concentrates failure, making design verification and thermal limits increasingly important. The safe state is specified in the case file.",
              "v": "expert",
              "fb": "Correct: dependable embedded systems connect an explicit fault model to detection, containment, and recovery."
            },
            {
              "t": "The design can be improved later, while unclear fault assumptions and incomplete transition coverage remain acceptable for release. The firmware chronology leaves an assumption unresolved in the case file.",
              "v": "partial",
              "fb": "Nominal testing contributes evidence but does not exercise the failure path described by the design."
            },
            {
              "t": "A functioning nominal path establishes dependable operation even when the specified error mechanism and safety response were rarely exercised. The firmware chronology defeats that inference in the case file.",
              "v": "wrong",
              "fb": "A passing normal run cannot demonstrate behavior during corrupt state, race conditions, or monitor failure."
            },
            {
              "t": "The result is presumed to indicate sabotage or a meaningless random glitch, so a documented design weakness belongs to neither explanation. Within the firmware chronology, assumption replaces verification.",
              "v": "danger",
              "fb": "Low observed frequency does not make a safety barrier unnecessary when the consequence is severe."
            }
          ]
        }
      ]
    },
    "m_micro": {
      "sci": "Federico Faggin (b. 1941)",
      "topic": "The microprocessor",
      "lede": "Bits, gates, and recovery paths meet in Federico Faggin’s work on the microprocessor.",
      "no": 6,
      "profile": "Today’s embedded-systems dispatch follows Federico Faggin into the microprocessor. Federico Faggin developed silicon-gate technology at Fairchild and led the chip design that produced Intel's 4004, the first commercial single-chip microprocessor. Firmware sits between physical components and user intent: it samples inputs, changes state, commands outputs, and decides what to do when evidence conflicts. Faggin’s work makes one part of that chain concrete rather than magical.\n\nThe central engineering procedure is to combine logic, registers, and control on one programmable device while managing timing, instruction encoding, and manufacturing constraints. Designers must state the assumed fault, the information available to detect it, the time allowed for response, and the safe condition reached afterward. Tests should include corrupt inputs, interrupted sequences, stale state, timing races, and failures of the monitor itself.\n\nEmbedded reliability is often described as a property of code, yet the real system includes sensors, clocks, buses, power, processors, actuators, and people maintaining them. A software check can catch a hardware fault; a hardware watchdog can contain frozen software. Removing either layer changes the safety argument even when ordinary operation looks identical.\n\nThe durable lesson is programmability shifts many functions from fixed wiring into code, where faults can be changed but also concealed. Dependability comes from explicit fault assumptions, independent checks, and evidence that failure paths end safely. Error handling belongs in the design specification because improvised recovery is itself a source of unsafe state. A passing demonstration covers one trajectory; a verification plan must cover the transitions that should never occur.",
      "frame": "Scrolls to a timestamped fault. \"The normal test passed; the transition did not. Show me what the microprocessor protects.\"",
      "q": [
        {
          "q": "Which engineering account best captures Federico Faggin’s contribution to the microprocessor?",
          "o": [
            {
              "t": "Federico Faggin developed silicon-gate technology at Fairchild and led the chip design that produced Intel's 4004, the first commercial single-chip microprocessor. The fault path remains auditable.",
              "v": "expert",
              "fb": "Correct: dependable embedded systems connect an explicit fault model to detection, containment, and recovery."
            },
            {
              "t": "Federico Faggin is linked to the microprocessor, yet the account checks routine behavior without identifying the encoded fault or recovery mechanism. The transition coverage remains thin.",
              "v": "partial",
              "fb": "Nominal testing contributes evidence but does not exercise the failure path described by the design."
            },
            {
              "t": "Federico Faggin is said to prove the microprocessor through one clean bench run, as though nominal output demonstrated every unsafe transition. The firmware chronology defeats that inference.",
              "v": "wrong",
              "fb": "A passing normal run cannot demonstrate behavior during corrupt state, race conditions, or monitor failure."
            },
            {
              "t": "Federico Faggin is invoked to remove redundant protection because a severe fault has appeared too rarely to deserve independent containment. Under the firmware chronology, warning is postponed.",
              "v": "danger",
              "fb": "Low observed frequency does not make a safety barrier unnecessary when the consequence is severe."
            }
          ]
        },
        {
          "q": "Which verification step best follows this profile?",
          "o": [
            {
              "t": "On the bench, apply this procedure: combine logic, registers, and control on one programmable device while managing timing, instruction encoding, and manufacturing constraints.",
              "v": "expert",
              "fb": "Correct: dependable embedded systems connect an explicit fault model to detection, containment, and recovery."
            },
            {
              "t": "Exercise normal inputs and archive the outputs, but omit fault injection and rarely test whether the monitor reaches a safe state. The firmware chronology leaves one test open.",
              "v": "partial",
              "fb": "Nominal testing contributes evidence but does not exercise the failure path described by the design."
            },
            {
              "t": "Infer error handling from successful service behavior, leaving corrupt state, timing races, and failed supervision outside the evidence. The firmware chronology defeats that inference.",
              "v": "wrong",
              "fb": "A passing normal run cannot demonstrate behavior during corrupt state, race conditions, or monitor failure."
            },
            {
              "t": "Ship the preferred build, close the failing test as exceptional, and promise to revisit the protection after wider deployment. Under the firmware chronology, warning is postponed.",
              "v": "danger",
              "fb": "Low observed frequency does not make a safety barrier unnecessary when the consequence is severe."
            }
          ]
        },
        {
          "q": "Which design conclusion follows most responsibly?",
          "o": [
            {
              "t": "The engineering takeaway is that programmability shifts many functions from fixed wiring into code, where faults can be changed but also concealed. The safe state is specified in the case file.",
              "v": "expert",
              "fb": "Correct: dependable embedded systems connect an explicit fault model to detection, containment, and recovery."
            },
            {
              "t": "The design can be improved later, while unclear fault assumptions and incomplete transition coverage remain acceptable for release. The firmware chronology leaves one test open in the case file.",
              "v": "partial",
              "fb": "Nominal testing contributes evidence but does not exercise the failure path described by the design."
            },
            {
              "t": "A functioning nominal path establishes dependable operation even when the specified error mechanism and safety response were rarely exercised. The state evidence contradicts that in the case file.",
              "v": "wrong",
              "fb": "A passing normal run cannot demonstrate behavior during corrupt state, race conditions, or monitor failure."
            },
            {
              "t": "The result is presumed to indicate sabotage or a meaningless random glitch, so a documented design weakness belongs to neither explanation. Under the firmware chronology, warning is postponed.",
              "v": "danger",
              "fb": "Low observed frequency does not make a safety barrier unnecessary when the consequence is severe."
            }
          ]
        }
      ]
    },
    "m_vlsimethod": {
      "sci": "Lynn Conway (1938-2024)",
      "topic": "VLSI design methodology",
      "lede": "Lynn Conway made VLSI design methodology a tool for catching faults before corrupted state became physical action.",
      "no": 7,
      "profile": "Today’s embedded-systems dispatch follows Lynn Conway into VLSI design methodology. Lynn Conway co-created the Mead–Conway VLSI design methodology, introducing accessible design rules and multi-project fabrication that let students and researchers build real chips. Firmware sits between physical components and user intent: it samples inputs, changes state, commands outputs, and decides what to do when evidence conflicts. Conway’s work makes one part of that chain concrete rather than magical.\n\nThe central engineering procedure is to separate logical design from fabrication details through standard rules, simulate the design, and combine many projects on shared manufacturing runs. Designers must state the assumed fault, the information available to detect it, the time allowed for response, and the safe condition reached afterward. Tests should include corrupt inputs, interrupted sequences, stale state, timing races, and failures of the monitor itself.\n\nEmbedded reliability is often described as a property of code, yet the real system includes sensors, clocks, buses, power, processors, actuators, and people maintaining them. A software check can catch a hardware fault; a hardware watchdog can contain frozen software. Removing either layer changes the safety argument even when ordinary operation looks identical.\n\nThe durable lesson is clear interfaces and shared verification methods let more people design hardware without making fabrication assumptions invisible. Dependability comes from explicit fault assumptions, independent checks, and evidence that failure paths end safely. A safeguard that can be bypassed without a logged, reviewed exception is not an independent safeguard. Error handling belongs in the design specification because improvised recovery is itself a source of unsafe state.",
      "frame": "Steadies a logic probe above the board. \"At The Engineering Lead's Office, one unchecked state can command real hardware. Explain VLSI design methodology.\"",
      "q": [
        {
          "q": "Which engineering account best captures Lynn Conway’s contribution to VLSI design methodology?",
          "o": [
            {
              "t": "Lynn Conway co-created the Mead–Conway VLSI design methodology, introducing accessible design rules and multi-project fabrication that let students and researchers build real chips. The safe state is specified.",
              "v": "expert",
              "fb": "Correct: dependable embedded systems connect an explicit fault model to detection, containment, and recovery."
            },
            {
              "t": "Lynn Conway is linked to VLSI design methodology, yet the account checks routine behavior without identifying the encoded fault or recovery mechanism. Support across the firmware chronology stays partial.",
              "v": "partial",
              "fb": "Nominal testing contributes evidence but does not exercise the failure path described by the design."
            },
            {
              "t": "Lynn Conway is said to prove VLSI design methodology through one clean bench run, as though nominal output demonstrated every unsafe transition. Under the firmware chronology, direct comparison fails.",
              "v": "wrong",
              "fb": "A passing normal run cannot demonstrate behavior during corrupt state, race conditions, or monitor failure."
            },
            {
              "t": "Lynn Conway is invoked to remove redundant protection because a severe fault has appeared too rarely to deserve independent containment. Within the firmware chronology, assumption replaces verification.",
              "v": "danger",
              "fb": "Low observed frequency does not make a safety barrier unnecessary when the consequence is severe."
            }
          ]
        },
        {
          "q": "Which verification step best follows this profile?",
          "o": [
            {
              "t": "On the bench, apply this procedure: separate logical design from fabrication details through standard rules, simulate the design, and combine many projects on shared manufacturing runs.",
              "v": "expert",
              "fb": "Correct: dependable embedded systems connect an explicit fault model to detection, containment, and recovery."
            },
            {
              "t": "Exercise normal inputs and archive the outputs, but omit fault injection and rarely test whether the monitor reaches a safe state. Support across the firmware chronology stays partial.",
              "v": "partial",
              "fb": "Nominal testing contributes evidence but does not exercise the failure path described by the design."
            },
            {
              "t": "Infer error handling from successful service behavior, leaving corrupt state, timing races, and failed supervision outside the evidence. The firmware chronology points to another result.",
              "v": "wrong",
              "fb": "A passing normal run cannot demonstrate behavior during corrupt state, race conditions, or monitor failure."
            },
            {
              "t": "Ship the preferred build, close the failing test as exceptional, and promise to revisit the protection after wider deployment. Under the firmware chronology, warning is postponed.",
              "v": "danger",
              "fb": "Low observed frequency does not make a safety barrier unnecessary when the consequence is severe."
            }
          ]
        },
        {
          "q": "Which design conclusion follows most responsibly?",
          "o": [
            {
              "t": "The engineering takeaway is that clear interfaces and shared verification methods let more people design hardware without making fabrication assumptions invisible. The safe state is specified in the case file.",
              "v": "expert",
              "fb": "Correct: dependable embedded systems connect an explicit fault model to detection, containment, and recovery."
            },
            {
              "t": "The design can be improved later, while unclear fault assumptions and incomplete transition coverage remain acceptable for release. The firmware chronology leaves an assumption unresolved in the case file.",
              "v": "partial",
              "fb": "Nominal testing contributes evidence but does not exercise the failure path described by the design."
            },
            {
              "t": "A functioning nominal path establishes dependable operation even when the specified error mechanism and safety response were rarely exercised. The firmware chronology defeats that inference in the case file.",
              "v": "wrong",
              "fb": "A passing normal run cannot demonstrate behavior during corrupt state, race conditions, or monitor failure."
            },
            {
              "t": "The result is presumed to indicate sabotage or a meaningless random glitch, so a documented design weakness belongs to neither explanation. Within the firmware chronology, assumption replaces verification.",
              "v": "danger",
              "fb": "Low observed frequency does not make a safety barrier unnecessary when the consequence is severe."
            }
          ]
        }
      ]
    },
    "m_faulttol": {
      "sci": "Algirdas Avizienis (1932-2022)",
      "topic": "Fault-tolerant computing",
      "lede": "Algirdas Avizienis gave embedded designers a concrete method for reasoning about fault-tolerant computing.",
      "no": 8,
      "profile": "Today’s embedded-systems dispatch follows Algirdas Avizienis into fault-tolerant computing. Algirdas Avizienis advanced fault-tolerant computing and proposed N-version programming, in which independently developed implementations provide diversity against common design errors. Firmware sits between physical components and user intent: it samples inputs, changes state, commands outputs, and decides what to do when evidence conflicts. Avizienis’s work makes one part of that chain concrete rather than magical.\n\nThe central engineering procedure is to combine redundancy, independent implementations, error detection, and voting while analyzing which failures could defeat all channels together. Designers must state the assumed fault, the information available to detect it, the time allowed for response, and the safe condition reached afterward. Tests should include corrupt inputs, interrupted sequences, stale state, timing races, and failures of the monitor itself.\n\nEmbedded reliability is often described as a property of code, yet the real system includes sensors, clocks, buses, power, processors, actuators, and people maintaining them. A software check can catch a hardware fault; a hardware watchdog can contain frozen software. Removing either layer changes the safety argument even when ordinary operation looks identical.\n\nThe durable lesson is redundancy protects a system only when supposedly independent safeguards do not share the same hidden assumption or defect. Dependability comes from explicit fault assumptions, independent checks, and evidence that failure paths end safely. A passing demonstration covers one trajectory; a verification plan must cover the transitions that should never occur. A safeguard that can be bypassed without a logged, reviewed exception is not an independent safeguard.",
      "frame": "Closes the service panel. \"Before I release the defect record, tell me how fault-tolerant computing should fail safely.\"",
      "q": [
        {
          "q": "Which engineering account best captures Algirdas Avizienis’s contribution to fault-tolerant computing?",
          "o": [
            {
              "t": "Algirdas Avizienis advanced fault-tolerant computing and proposed N-version programming, in which independently developed implementations provide diversity against common design errors. The safe state is specified.",
              "v": "expert",
              "fb": "Correct: dependable embedded systems connect an explicit fault model to detection, containment, and recovery."
            },
            {
              "t": "Algirdas Avizienis is linked to fault-tolerant computing, yet the account checks routine behavior without identifying the encoded fault or recovery mechanism. The firmware chronology leaves one test open.",
              "v": "partial",
              "fb": "Nominal testing contributes evidence but does not exercise the failure path described by the design."
            },
            {
              "t": "Algirdas Avizienis is said to prove fault-tolerant computing through one clean bench run, as though nominal output demonstrated every unsafe transition. Within the firmware chronology, no support appears.",
              "v": "wrong",
              "fb": "A passing normal run cannot demonstrate behavior during corrupt state, race conditions, or monitor failure."
            },
            {
              "t": "Algirdas Avizienis is invoked to remove redundant protection because a severe fault has appeared too rarely to deserve independent containment. Within the firmware chronology, assumption replaces verification.",
              "v": "danger",
              "fb": "Low observed frequency does not make a safety barrier unnecessary when the consequence is severe."
            }
          ]
        },
        {
          "q": "Which verification step best follows this profile?",
          "o": [
            {
              "t": "On the bench, apply this procedure: combine redundancy, independent implementations, error detection, and voting while analyzing which failures could defeat all channels together.",
              "v": "expert",
              "fb": "Correct: dependable embedded systems connect an explicit fault model to detection, containment, and recovery."
            },
            {
              "t": "Exercise normal inputs and archive the outputs, but omit fault injection and rarely test whether the monitor reaches a safe state. The firmware chronology leaves one test open.",
              "v": "partial",
              "fb": "Nominal testing contributes evidence but does not exercise the failure path described by the design."
            },
            {
              "t": "Infer error handling from successful service behavior, leaving corrupt state, timing races, and failed supervision outside the evidence. The firmware chronology defeats that inference.",
              "v": "wrong",
              "fb": "A passing normal run cannot demonstrate behavior during corrupt state, race conditions, or monitor failure."
            },
            {
              "t": "Ship the preferred build, close the failing test as exceptional, and promise to revisit the protection after wider deployment. Under the firmware chronology, warning is postponed.",
              "v": "danger",
              "fb": "Low observed frequency does not make a safety barrier unnecessary when the consequence is severe."
            }
          ]
        },
        {
          "q": "Which design conclusion follows most responsibly?",
          "o": [
            {
              "t": "The engineering takeaway is that redundancy protects a system only when supposedly independent safeguards do not share the same hidden assumption or defect. The safe state is specified.",
              "v": "expert",
              "fb": "Correct: dependable embedded systems connect an explicit fault model to detection, containment, and recovery."
            },
            {
              "t": "The design can be improved later, while unclear fault assumptions and incomplete transition coverage remain acceptable for release. The firmware chronology leaves one test open in the case file.",
              "v": "partial",
              "fb": "Nominal testing contributes evidence but does not exercise the failure path described by the design."
            },
            {
              "t": "A functioning nominal path establishes dependable operation even when the specified error mechanism and safety response were rarely exercised. The state evidence contradicts that in the case file.",
              "v": "wrong",
              "fb": "A passing normal run cannot demonstrate behavior during corrupt state, race conditions, or monitor failure."
            },
            {
              "t": "The result is presumed to indicate sabotage or a meaningless random glitch, so a documented design weakness belongs to neither explanation. Inside the firmware chronology, drama displaces testing.",
              "v": "danger",
              "fb": "Low observed frequency does not make a safety barrier unnecessary when the consequence is severe."
            }
          ]
        }
      ]
    },
    "m_dependable": {
      "sci": "Brian Randell (b. 1936)",
      "topic": "Dependable & fault-tolerant systems",
      "lede": "Bits, gates, and recovery paths meet in Brian Randell’s work on dependable and fault-tolerant systems.",
      "no": 9,
      "profile": "Today’s embedded-systems dispatch follows Brian Randell into dependable and fault-tolerant systems. Brian Randell helped establish software fault tolerance, including recovery blocks that pair alternate implementations with an acceptance test and rollback mechanism. Firmware sits between physical components and user intent: it samples inputs, changes state, commands outputs, and decides what to do when evidence conflicts. Randell’s work makes one part of that chain concrete rather than magical.\n\nThe central engineering procedure is to checkpoint state, run a primary operation, test its result, and restore the checkpoint before trying an alternate when acceptance fails. Designers must state the assumed fault, the information available to detect it, the time allowed for response, and the safe condition reached afterward. Tests should include corrupt inputs, interrupted sequences, stale state, timing races, and failures of the monitor itself.\n\nEmbedded reliability is often described as a property of code, yet the real system includes sensors, clocks, buses, power, processors, actuators, and people maintaining them. A software check can catch a hardware fault; a hardware watchdog can contain frozen software. Removing either layer changes the safety argument even when ordinary operation looks identical.\n\nThe durable lesson is recovery requires both an alternative path and an independent test capable of recognizing that the first path produced an unsafe result. Dependability comes from explicit fault assumptions, independent checks, and evidence that failure paths end safely. Error handling belongs in the design specification because improvised recovery is itself a source of unsafe state. A passing demonstration covers one trajectory; a verification plan must cover the transitions that should never occur.",
      "frame": "Scrolls to a timestamped fault. \"The normal test passed; the transition did not. Show me what dependable and fault-tolerant systems protects.\"",
      "q": [
        {
          "q": "Which engineering account best captures Brian Randell’s contribution to dependable and fault-tolerant systems?",
          "o": [
            {
              "t": "Brian Randell helped establish software fault tolerance, including recovery blocks that pair alternate implementations with an acceptance test and rollback mechanism. The fault path remains auditable.",
              "v": "expert",
              "fb": "Correct: dependable embedded systems connect an explicit fault model to detection, containment, and recovery."
            },
            {
              "t": "Brian Randell is linked to dependable and fault-tolerant systems, yet the account checks routine behavior without identifying the encoded fault or recovery mechanism. The monitor itself is untested.",
              "v": "partial",
              "fb": "Nominal testing contributes evidence but does not exercise the failure path described by the design."
            },
            {
              "t": "Brian Randell is said to prove dependable and fault-tolerant systems through one clean bench run, as though nominal output demonstrated every unsafe transition. The state evidence contradicts that.",
              "v": "wrong",
              "fb": "A passing normal run cannot demonstrate behavior during corrupt state, race conditions, or monitor failure."
            },
            {
              "t": "Brian Randell is invoked to remove redundant protection because a severe fault has appeared too rarely to deserve independent containment. Under the firmware chronology, warning is postponed.",
              "v": "danger",
              "fb": "Low observed frequency does not make a safety barrier unnecessary when the consequence is severe."
            }
          ]
        },
        {
          "q": "Which verification step best follows this profile?",
          "o": [
            {
              "t": "On the bench, apply this procedure: checkpoint state, run a primary operation, test its result, and restore the checkpoint before trying an alternate when acceptance fails.",
              "v": "expert",
              "fb": "Correct: dependable embedded systems connect an explicit fault model to detection, containment, and recovery."
            },
            {
              "t": "Exercise normal inputs and archive the outputs, but omit fault injection and rarely test whether the monitor reaches a safe state. The transition coverage remains thin.",
              "v": "partial",
              "fb": "Nominal testing contributes evidence but does not exercise the failure path described by the design."
            },
            {
              "t": "Infer error handling from successful service behavior, leaving corrupt state, timing races, and failed supervision outside the evidence. The state evidence contradicts that.",
              "v": "wrong",
              "fb": "A passing normal run cannot demonstrate behavior during corrupt state, race conditions, or monitor failure."
            },
            {
              "t": "Ship the preferred build, close the failing test as exceptional, and promise to revisit the protection after wider deployment. The barrier disappears on assumption.",
              "v": "danger",
              "fb": "Low observed frequency does not make a safety barrier unnecessary when the consequence is severe."
            }
          ]
        },
        {
          "q": "Which design conclusion follows most responsibly?",
          "o": [
            {
              "t": "The engineering takeaway is that recovery requires both an alternative path and an independent test capable of recognizing that the first path produced an unsafe result. The safe state is specified in the case file.",
              "v": "expert",
              "fb": "Correct: dependable embedded systems connect an explicit fault model to detection, containment, and recovery."
            },
            {
              "t": "The design can be improved later, while unclear fault assumptions and incomplete transition coverage remain acceptable for release. Across the firmware chronology, comparison remains incomplete in the case file.",
              "v": "partial",
              "fb": "Nominal testing contributes evidence but does not exercise the failure path described by the design."
            },
            {
              "t": "A functioning nominal path establishes dependable operation even when the specified error mechanism and safety response were rarely exercised. Within the firmware chronology, no support appears in the case file.",
              "v": "wrong",
              "fb": "A passing normal run cannot demonstrate behavior during corrupt state, race conditions, or monitor failure."
            },
            {
              "t": "The result is presumed to indicate sabotage or a meaningless random glitch, so a documented design weakness belongs to neither explanation. Production outranks containment. The barrier disappears on assumption.",
              "v": "danger",
              "fb": "Low observed frequency does not make a safety barrier unnecessary when the consequence is severe."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "firmeng": {
      "bench": "The Firmware Engineer receives you beside a powered-down pump at the device & test bench and a sealed change record. \"Wrote the tests; the failing case was known and quietly closed as 'won't fix'. The dose was physical, but its instructions had a history.\"",
      "firmlab": "The Firmware Engineer receives you beside a powered-down pump at the firmware verification lab and a sealed change record. \"Wrote the tests; the failing case was known and quietly closed as 'won't fix'. The dose was physical, but its instructions had a history.\"",
      "office": "The Firmware Engineer receives you beside a powered-down pump at the engineering lead's office and a sealed change record. \"Wrote the tests; the failing case was known and quietly closed as 'won't fix'. The dose was physical, but its instructions had a history.\""
    },
    "hwtech": {
      "bench": "The Hardware Test Engineer receives you beside a powered-down pump at the device & test bench and a sealed change record. \"Checks the boards; the safety watchdog chip was deleted to cut cost. The dose was physical, but its instructions had a history.\"",
      "firmlab": "The Hardware Test Engineer receives you beside a powered-down pump at the firmware verification lab and a sealed change record. \"Checks the boards; the safety watchdog chip was deleted to cut cost. The dose was physical, but its instructions had a history.\"",
      "office": "The Hardware Test Engineer receives you beside a powered-down pump at the engineering lead's office and a sealed change record. \"Checks the boards; the safety watchdog chip was deleted to cut cost. The dose was physical, but its instructions had a history.\""
    },
    "clerk": {
      "bench": "The Clerk receives you beside a powered-down pump at the device & test bench and a sealed change record. \"Keeps the defect log — and the order to ship with the check removed. The dose was physical, but its instructions had a history.\"",
      "firmlab": "The Clerk receives you beside a powered-down pump at the firmware verification lab and a sealed change record. \"Keeps the defect log — and the order to ship with the check removed. The dose was physical, but its instructions had a history.\"",
      "office": "The Clerk receives you beside a powered-down pump at the engineering lead's office and a sealed change record. \"Keeps the defect log — and the order to ship with the check removed. The dose was physical, but its instructions had a history.\""
    }
  },
  "story": [
    "<b>The Halden Infusion Pump</b> opens inside the infusion-pump firmware inquiry, where the public explanation has hardened faster than the evidence.",
    "<b>The Firmware Engineer</b>, <b>The Hardware Test Engineer</b>, and <b>The Clerk</b> hold different parts of the record, and every conversation begins with one real figure whose work teaches you how to read it.",
    "The case keeps pulling investigators toward <b>The device was tampered with</b> or <b>A one-in-a-million glitch — nothing preventable</b>. Both are plausible enough to survive a headline; neither should survive the full dossier untested.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide the <b>WHAT</b> for yourself."
  ],
  "endings": {
    "overclaimWhat": "tamper",
    "dismissalWhat": "glitch",
    "win": {
      "expertTitle": "The Missing Check Is Restored",
      "expert": [
        "You name <b>Cal Devereux — the device firmware lead</b> and <b>A concealed firmware defect and a hardware safety check removed</b>, with the decisive records held in <b>The Engineering Lead's Office</b>. Not the device was tampered with. Not a one-in-a-million glitch — nothing preventable.",
        "The known failing state, the closed defect, and the deleted watchdog form one engineering history. The overdose was neither an outside rewrite nor an unknowable random event; the design shipped without the independent barrier its own testing had shown it needed."
      ],
      "soundTitle": "A Preventable Dose",
      "sound": [
        "Your accusation correctly joins <b>Cal Devereux — the device firmware lead</b>, <b>The Engineering Lead's Office</b>, and <b>A concealed firmware defect and a hardware safety check removed</b>. The test result and hardware change support the central finding.",
        "Some timing details still require reconstruction, but the safety case is already broken: a recognized fault remained and a separate check was removed before release."
      ],
      "namedTitle": "The Defect Named",
      "named": [
        "You select the correct combination: <b>Cal Devereux — the device firmware lead</b>, <b>The Engineering Lead's Office</b>, and <b>A concealed firmware defect and a hardware safety check removed</b>.",
        "The account is brief, yet it sends the review to the defect log, board revision, and authorization chain needed for a complete recall decision."
      ]
    },
    "overclaim": {
      "title": "The Intruder Who Wasn’t Needed",
      "body": [
        "You choose <b>The device was tampered with</b>, searching for altered code or a broken seal while the approved build and design records remain unexplained.",
        "When no tampering evidence appears, the broader inquiry is discredited. A documented defect and removed barrier are made to look like speculation attached to an imagined attacker."
      ]
    },
    "dismissal": {
      "title": "Probability Is Not a Safety Case",
      "body": [
        "You adopt <b>A one-in-a-million glitch — nothing preventable</b> and treat rarity as proof that nobody could have designed for the failure.",
        "That conclusion ignores the recorded reproduction and the discarded hardware check. It permits the same state machine to remain in service with the same route to harm."
      ]
    },
    "wrongNames": {
      "title": "Right Failure, Wrong Owner",
      "body": [
        "You recognize <b>A concealed firmware defect and a hardware safety check removed</b>, but assign the decision to the wrong actor or place the controlling evidence outside the engineering office. The approval trail points instead to"
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"An infusion pump circuit with a missing watchdog\"><rect x=\"52\" y=\"28\" width=\"160\" height=\"84\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><rect x=\"82\" y=\"48\" width=\"100\" height=\"30\" fill=\"none\" stroke=\"#326891\" stroke-width=\"1.8\"/><path d=\"M132 78 L132 104\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M212 70 L336 70\" stroke=\"#121212\" stroke-width=\"1.5\"/><rect x=\"336\" y=\"48\" width=\"74\" height=\"44\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M410 70 L528 70\" stroke=\"#121212\" stroke-width=\"1.5\"/><rect x=\"528\" y=\"48\" width=\"72\" height=\"44\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/><path d=\"M548 60 L580 80 M580 60 L548 80\" stroke=\"#B3261E\" stroke-width=\"2\"/></svg>"
}};
