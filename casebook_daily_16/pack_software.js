module.exports = { PACK: {
  "id": "software",
  "title": "Fatal Exception",
  "discipline": "Software & Systems Safety",
  "teaser": "A radiation machine gave patients a hundredfold overdose. A hacker? Careless nurses? Or a bug built in — and hidden?",
  "overclaimTag": "a malicious hack",
  "truthTag": "a fatal software defect, concealed",
  "venue": "the Calder radiotherapy inquiry",
  "agent": {
    "name": "Auditor Lena Foss",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Engineering credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Computing Pioneers",
  "dossierName": "COMPUTING PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Calder radiotherapy inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The WHERE you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "And beware the answer the headlines want: the evidence points not to an outside attacker, but to something quieter that was built into the machine and left there.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "maker",
      "items": [
        {
          "id": "operator",
          "label": "The radiotherapy technicians"
        },
        {
          "id": "maker",
          "label": "Renwick — the manufacturer's software lead"
        },
        {
          "id": "hospital",
          "label": "The hospital physicist"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "vendor",
      "items": [
        {
          "id": "treatment",
          "label": "The Treatment Room & Console"
        },
        {
          "id": "biomed",
          "label": "The Hospital Biomedical Lab"
        },
        {
          "id": "vendor",
          "label": "The Manufacturer's Software Office"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "defect",
      "items": [
        {
          "id": "hack",
          "label": "A malicious hack or cyberattack"
        },
        {
          "id": "usererror",
          "label": "Simple operator error — nothing systemic"
        },
        {
          "id": "defect",
          "label": "A concealed software defect & a removed interlock"
        }
      ]
    }
  },
  "PLACES": {
    "treatment": {
      "name": "The Treatment Room & Console",
      "xy": [
        140,
        90
      ]
    },
    "biomed": {
      "name": "The Hospital Biomedical Lab",
      "xy": [
        330,
        240
      ]
    },
    "vendor": {
      "name": "The Manufacturer's Software Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "treatment",
      "biomed"
    ],
    [
      "biomed",
      "vendor"
    ]
  ],
  "CHARACTERS": {
    "tech": {
      "name": "Technician Ama",
      "role": "Radiotherapy technician",
      "face": "☢",
      "badge": "T",
      "legend": "the console",
      "hint": "Typed the fast edit that triggered the fault; blamed, but she saw 'MALFUNCTION 54.'"
    },
    "phys": {
      "name": "The Medical Physicist",
      "role": "Hospital medical physicist",
      "face": "📟",
      "badge": "P",
      "legend": "the biomed lab",
      "hint": "Reconstructed the doses; proved the machine, not the patient, was wrong."
    },
    "qa": {
      "name": "The QA Engineer",
      "role": "Manufacturer QA engineer",
      "face": "🐞",
      "badge": "Q",
      "legend": "the vendor office",
      "hint": "Knows the race condition was known, and the hardware interlock was removed to cut cost."
    }
  },
  "TOPICMAP": {
    "treatment": {
      "tech": [
        "algorithm"
      ],
      "phys": [
        "boolean"
      ],
      "qa": [
        "compiler"
      ]
    },
    "biomed": {
      "tech": [
        "concurrency"
      ],
      "phys": [
        "overflow"
      ],
      "qa": [
        "testing"
      ]
    },
    "vendor": {
      "tech": [
        "softwaresafety"
      ],
      "phys": [
        "robusterror"
      ],
      "qa": [
        "complexity"
      ]
    }
  },
  "TOPICS": {
    "algorithm": {
      "sci": "Ada Lovelace (1815-1852)",
      "topic": "The first algorithm",
      "lede": "The Countess who looked at a machine of brass and gears and saw that it would only ever do what someone told it to.",
      "no": 1,
      "profile": "Augusta Ada King, Countess of Lovelace, was an English mathematician and the daughter of the poet Lord Byron. In the 1840s she worked alongside Charles Babbage, designer of the Analytical Engine — a mechanical, general-purpose computer that was never fully built. In 1843 she translated an Italian account of the engine by Luigi Menabrea and appended her own Notes, together far longer than the paper itself.\n\nHer Note G set out, in careful detail, a step-by-step procedure for the engine to compute the Bernoulli numbers — a sequence of operations with loops and reused intermediate results that is widely regarded as the first published computer algorithm. More strikingly, Lovelace grasped what Babbage barely stated: that the engine manipulated symbols, not merely numbers, and might handle anything reducible to rules. She mused that it could one day compose elaborate music. This is the seed of general-purpose computing.\n\nYet she was equally clear about the machine's limits. In her famous remark, the engine 'has no pretensions whatever to originate anything'; it can only do 'whatever we know how to order it to perform.' The machine holds no will of its own; its behavior is simply the behavior of its program.\n\nFor this inquiry, Lovelace draws the first hard line. A radiotherapy machine that delivers a lethal dose did not decide to; it executed instructions. That cuts against the sensational story of a machine 'hacked' into malice, and against the lazy story of a careless hand at the keys. If the output was wrong, the ordered steps — the software — are where an investigator must look. What the engine did, someone told it to do.",
      "frame": "Ama folds her arms. \"They're pinning this on my keystrokes. A machine only runs what someone wrote into it — prove you know that much before I tell you what I typed.\"",
      "q": [
        {
          "q": "What did Lovelace's famous Note G contain?",
          "o": [
            {
              "t": "A step-by-step method for the engine to compute the Bernoulli numbers.",
              "v": "expert",
              "fb": "That sequence of operations is widely called the first published algorithm."
            },
            {
              "t": "A secret command set letting the machine rewrite its own instructions at will.",
              "v": "danger",
              "fb": "Lovelace held the opposite: the engine originates nothing on its own."
            },
            {
              "t": "A proof that Babbage's engine could rarely be built from brass and gears.",
              "v": "wrong",
              "fb": "She detailed how it would compute, not any impossibility of building it."
            },
            {
              "t": "A table of logarithms the engine would print faster than a human clerk.",
              "v": "partial",
              "fb": "Note G was a genuine programmed procedure, not merely a printed table."
            }
          ]
        },
        {
          "q": "What did Lovelace foresee about the engine's reach?",
          "o": [
            {
              "t": "That it could manipulate symbols of any kind, not only numbers.",
              "v": "expert",
              "fb": "She foresaw general symbol manipulation — even, she wrote, composing music."
            },
            {
              "t": "That it would think for itself once its gear-train grew large enough.",
              "v": "wrong",
              "fb": "She explicitly denied the machine could originate its own ideas."
            },
            {
              "t": "That it would speed arithmetic but do nothing a human clerk could not.",
              "v": "partial",
              "fb": "She went further: it could handle symbols well beyond mere arithmetic."
            },
            {
              "t": "That it might one day seize control of every task its owners assigned it.",
              "v": "danger",
              "fb": "That is the runaway-machine myth; Lovelace argued the exact reverse."
            }
          ]
        },
        {
          "q": "What did she mean that the engine cannot 'originate anything'?",
          "o": [
            {
              "t": "It only does what it is programmed to; its output traces to its code.",
              "v": "expert",
              "fb": "A lethal result comes from the instructions it was given, not a will of its own."
            },
            {
              "t": "It could act on its own, so a rogue machine can decide to harm a patient.",
              "v": "danger",
              "fb": "Lovelace denied this; the engine does not do what it was rarely told to do."
            },
            {
              "t": "It was too slow to matter, so its results should rarely be trusted at all.",
              "v": "wrong",
              "fb": "She praised its power; her point was about origination, not speed."
            },
            {
              "t": "It needed a human at each step and so could rarely run a task unattended.",
              "v": "partial",
              "fb": "It could run unattended; the point is it follows its program, not free will."
            }
          ]
        }
      ]
    },
    "boolean": {
      "sci": "George Boole (1815-1864)",
      "topic": "Boolean logic",
      "lede": "A self-taught schoolmaster who turned reasoning itself into algebra, and unknowingly wrote the grammar of every digital circuit.",
      "no": 2,
      "profile": "George Boole was an English mathematician and logician, largely self-taught, who rose from running a small school to a professorship at Queen's College, Cork. In 'The Mathematical Analysis of Logic' (1847) and his masterwork 'An Investigation of the Laws of Thought' (1854), he did something audacious: he treated logic as a branch of algebra. Where ordinary algebra manipulates numbers, Boole's algebra manipulates truth — variables that take only the values true or false, combined by the operations we now call AND, OR, and NOT.\n\nIn Boole's system, statements become equations. 'The beam is armed AND the shield is in place' is true only when both parts are true; an OR is true when either holds; a NOT flips a value. From a handful of such rules, whole chains of reasoning can be computed rather than argued. Boole died young, and his work was admired but little used until, in 1937, a young engineer named Claude Shannon showed that Boolean algebra describes exactly the behavior of electrical switching circuits. That insight is the foundation of all digital logic — every logic gate in every computer is Boole made physical.\n\nFor this inquiry, Boolean logic is the language of safety. A protective interlock is a logical condition: the beam may fire only if a set of guard conditions are all true — an AND of many terms. Remove one term, or let a stale value read true when it should be false, and the guard silently stops guarding. That is neither an attacker's cunning nor an operator's slip; it is a logic gate that was supposed to block a hazard and, by design or by defect, did not. Boole teaches the physicist to ask which condition was quietly dropped.",
      "frame": "The physicist sets down a dosimetry chart. \"Every safety of that machine reduces to a logical condition — all true, or the beam should not fire. Before I show you my reconstruction, prove you can read that logic.\"",
      "q": [
        {
          "q": "What is Boolean algebra?",
          "o": [
            {
              "t": "A logic of true and false values combined with the operations AND, OR, and NOT.",
              "v": "expert",
              "fb": "Boole made reasoning computable by treating truth as algebra."
            },
            {
              "t": "A method of rounding real numbers to whole values before performing any calculation.",
              "v": "wrong",
              "fb": "Boole's variables are truth values, not rounded numbers."
            },
            {
              "t": "A geometry of curves that Boole used to model the reasoning of the mind.",
              "v": "wrong",
              "fb": "His system is an algebra of logic, not a geometry of curves."
            },
            {
              "t": "A way of ranking arguments as strong or weak by counting their premises.",
              "v": "partial",
              "fb": "It evaluates statements as true or false, not by tallying premises."
            }
          ]
        },
        {
          "q": "How did Boole's logic reach modern computers?",
          "o": [
            {
              "t": "Shannon showed it describes switching circuits, the basis of digital design.",
              "v": "expert",
              "fb": "Boolean logic became the behavior of every logic gate in a computer."
            },
            {
              "t": "Boole himself wired the first electric adding machine from his own equations.",
              "v": "wrong",
              "fb": "Boole built no computer; Shannon linked his algebra to circuits decades later."
            },
            {
              "t": "Babbage engraved Boole's laws onto the gears of the Analytical Engine.",
              "v": "wrong",
              "fb": "Babbage's engine predates and did not use Boole's algebra of logic."
            },
            {
              "t": "It survives primarily in philosophy and rarely truly entered engineering practice.",
              "v": "partial",
              "fb": "On the contrary, it underpins all digital hardware design."
            }
          ]
        },
        {
          "q": "How does Boolean logic frame a safety interlock?",
          "o": [
            {
              "t": "As an AND of guard conditions that must all hold or the beam must not fire.",
              "v": "expert",
              "fb": "Drop or falsify one term and the guard silently stops protecting."
            },
            {
              "t": "As proof that any failed guard means an intruder flipped a value on purpose.",
              "v": "danger",
              "fb": "A dropped or stale term needs no attacker; a defect alone can do it."
            },
            {
              "t": "As a single yes-or-no switch that the operator throws by hand each time.",
              "v": "wrong",
              "fb": "An interlock is a combination of conditions, not one manual switch."
            },
            {
              "t": "As a suggestion the machine may weigh but is free to override on its own.",
              "v": "partial",
              "fb": "A true interlock is binding logic, not advice the machine may ignore."
            }
          ]
        }
      ]
    },
    "compiler": {
      "sci": "Grace Hopper (1906-1992)",
      "topic": "Compilers & the first 'bug'",
      "lede": "The Navy mathematician who taught computers to read something closer to English — and who taped a real moth into the logbook.",
      "no": 3,
      "profile": "Grace Hopper was an American mathematician and United States Navy officer who rose to rear admiral and became one of the most influential figures in early programming. During the Second World War she programmed the Harvard Mark I, one of the first large-scale computers. Afterward she pursued a radical idea: that people should not have to write in raw numeric machine code. Around 1952 she developed the A-0 system, generally credited as the first compiler — a program that translates more human-readable instructions into the machine's own code.\n\nHopper argued for years that programming could use words, not just numbers, against colleagues who thought it impossible. Her work led to FLOW-MATIC and fed directly into COBOL, a business language that ran the world's payrolls and ledgers for decades. She was famous for plain-spoken wisdom, for handing out 'nanoseconds' (lengths of wire), and for insisting it is easier to ask forgiveness than permission.\n\nShe is also tied to the word 'bug.' In 1947, operators of the Harvard Mark II found a moth caught in a relay; they taped it into the logbook as the 'first actual case of bug being found.' The term for a fault predated the moth, but Hopper's team popularized 'debugging' as the daily work of hunting such faults down.\n\nFor this inquiry, Hopper is the QA engineer's patron. A compiler is a layer of translation where meaning can be lost and errors introduced, and high-level languages make coding easier without making defects vanish. Her lesson is unglamorous and vital: a bug is a concrete, locatable thing in the code. It is not an intruder's magic and not an operator's imagination — it is found by someone willing to look.",
      "frame": "The QA engineer taps a logbook. \"A bug isn't a ghost and it isn't a headline. It's a real thing sitting in the code, waiting for someone to find it. Convince me you know how to look.\"",
      "q": [
        {
          "q": "What was Grace Hopper's landmark software contribution?",
          "o": [
            {
              "t": "The first compiler, translating readable instructions into machine code.",
              "v": "expert",
              "fb": "Her A-0 system let people program without writing raw numeric code."
            },
            {
              "t": "The first electronic computer, which she designed and built for the Navy.",
              "v": "wrong",
              "fb": "She programmed early machines; her breakthrough was the compiler."
            },
            {
              "t": "The first operating system that let many users share one computer at once.",
              "v": "wrong",
              "fb": "That came later from others; Hopper's advance was compilation."
            },
            {
              "t": "A faster wiring scheme that made the Harvard Mark I run several times quicker.",
              "v": "partial",
              "fb": "Her legacy is software translation, not a hardware speedup."
            }
          ]
        },
        {
          "q": "What was the famous Mark II 'bug'?",
          "o": [
            {
              "t": "A moth caught in a relay, taped into the logbook as an actual 'bug' found.",
              "v": "expert",
              "fb": "The team popularized 'debugging' as the routine work of hunting faults."
            },
            {
              "t": "A saboteur's device planted in the machine to corrupt all of the Navy's results.",
              "v": "danger",
              "fb": "It was an ordinary insect, not sabotage — and 'bug' meant a fault already."
            },
            {
              "t": "A programming error Hopper made that wiped out a week of computed tables.",
              "v": "wrong",
              "fb": "The story is a literal moth in a relay, not one of her coding mistakes."
            },
            {
              "t": "A design flaw in the relays that Hopper proved could rarely be repaired.",
              "v": "partial",
              "fb": "The moth was removed and logged; it was a stuck insect, not an unfixable flaw."
            }
          ]
        },
        {
          "q": "What does Hopper's view of bugs mean for this case?",
          "o": [
            {
              "t": "A defect is a concrete, locatable thing that someone can find by looking.",
              "v": "expert",
              "fb": "Neither an intruder's magic nor an operator's imagination — findable code."
            },
            {
              "t": "High-level languages remove bugs, so modern code needs no real testing.",
              "v": "danger",
              "fb": "Compilers ease coding but rarely make defects vanish; testing still matters."
            },
            {
              "t": "Bugs are unknowable events, so chasing one is a waste of an inquiry's time.",
              "v": "wrong",
              "fb": "Hopper's whole point was that bugs are concrete and can be hunted down."
            },
            {
              "t": "A fault primarily exists if the operator admits to having caused it directly.",
              "v": "partial",
              "fb": "A defect exists in the code regardless of who touched the console."
            }
          ]
        }
      ]
    },
    "concurrency": {
      "sci": "Leslie Lamport (b. 1941)",
      "topic": "Concurrency & race conditions",
      "lede": "The theorist who spent a career on the hardest question in computing: what does it mean for two things to happen at once?",
      "no": 4,
      "profile": "Leslie Lamport is an American computer scientist and a winner of the Turing Award in 2013, honored for foundational work on distributed and concurrent systems. When many processes run at the same time — separate threads in a program, or separate machines across a network — reasoning about them is treacherous, because they interleave in orders no single mind planned. Lamport built much of the theory that tames this.\n\nIn 1974 his Bakery algorithm solved mutual exclusion — letting concurrent processes take turns at a shared resource without ever colliding — using no special hardware. In his celebrated 1978 paper 'Time, Clocks, and the Ordering of Events in a Distributed System,' he introduced logical clocks and the 'happened-before' relation, a rigorous way to say which events could possibly have influenced which when there is no shared clock. He later framed the Byzantine Generals Problem for fault tolerance, and created both LaTeX and the TLA+ specification language for describing concurrent systems precisely.\n\nAt the center of his world is the race condition: a flaw where a program's correctness depends on the timing or ordering of events. Most of the time the pieces happen to line up and all is well; under a rare, unlucky interleaving, one process reads a value another has not yet finished setting, and the system enters a state no designer intended.\n\nFor this inquiry, this is the crux. If a fast, specific sequence at the console interleaves with the machine's own setup in just the wrong order, a stale value can slip through and the machine can do something lethal — but only under that rare timing. Such a fault is deterministic yet elusive, reproducible only when the race is re-run. It is not an intruder's cunning and not a careless slip; it is the machine losing a race no one knew it was running.",
      "frame": "Ama's jaw tightens. \"They say my fast edit did it. It only did it because two things inside that machine were racing each other. Show me you understand what a race condition is.\"",
      "q": [
        {
          "q": "What is a race condition?",
          "o": [
            {
              "t": "A flaw where correctness depends on the timing or order of concurrent events.",
              "v": "expert",
              "fb": "An unlucky interleaving lets one process read what another hasn't finished setting."
            },
            {
              "t": "A contest in which the faster of two computers wins and primarily its result is kept.",
              "v": "wrong",
              "fb": "It is not a speed contest; it is an ordering flaw between concurrent steps."
            },
            {
              "t": "An attacker racing the system to break in before defenses come online, in use.",
              "v": "danger",
              "fb": "A race condition is an internal timing bug, not an intruder's move."
            },
            {
              "t": "A program running slowly because too many users share it at one time, in use.",
              "v": "partial",
              "fb": "That is contention for resources, not the ordering flaw of a race."
            }
          ]
        },
        {
          "q": "What did Lamport's 'happened-before' relation give us?",
          "o": [
            {
              "t": "A way to order events across processes that share no common clock.",
              "v": "expert",
              "fb": "Logical clocks say which events could possibly have influenced which."
            },
            {
              "t": "A single master clock that forces every machine onto the same exact time.",
              "v": "wrong",
              "fb": "His insight was ordering events without any shared physical clock."
            },
            {
              "t": "A proof that concurrent programs can rarely be reasoned about at all.",
              "v": "wrong",
              "fb": "He made concurrency reasoned about rigorously, not declared hopeless."
            },
            {
              "t": "A method to make slow networks deliver every message instantly.",
              "v": "partial",
              "fb": "It orders events logically; it does not speed message delivery."
            }
          ]
        },
        {
          "q": "Why does a race condition fit this malfunction?",
          "o": [
            {
              "t": "A rare interleaving of console and setup can slip a stale value through.",
              "v": "expert",
              "fb": "Deterministic yet elusive, it strikes primarily when the same race re-runs."
            },
            {
              "t": "A timing-dependent fault is the clear signature of a hacker's precise strike.",
              "v": "danger",
              "fb": "A race is an internal ordering bug, not evidence of an intruder."
            },
            {
              "t": "Because a fast operator is generally the true root cause of any timing fault.",
              "v": "partial",
              "fb": "Fast input can trigger a race, but the flaw is the racing code, not the typist."
            },
            {
              "t": "Because the machine simply behaves at random and no cause can be traced.",
              "v": "wrong",
              "fb": "A race is deterministic under its timing, not truly random."
            }
          ]
        }
      ]
    },
    "overflow": {
      "sci": "Jacques-Louis Lions (1928-2001)",
      "topic": "Integer overflow & the Ariane 5 inquiry",
      "lede": "The mathematician handed the smoking wreck of Europe's new rocket, who traced a fireball back to a single line of reused code.",
      "no": 5,
      "profile": "Jacques-Louis Lions was an eminent French mathematician, renowned for work on partial differential equations, numerical analysis, and control theory, and a president of the French Academy of Sciences. In 1996 he was asked to chair the inquiry board into one of the most instructive software failures ever recorded: the maiden flight of the Ariane 5 rocket, Flight 501, which veered off course and self-destructed about 37 seconds after launch on 4 June 1996.\n\nLions's board did not speculate. Methodically, it traced the disaster to the inertial reference system's software. A piece of code carried over from the older, slower Ariane 4 converted a 64-bit floating-point number representing horizontal velocity into a 16-bit signed integer. Ariane 5 flew faster; the value was too large for the small integer to hold. The conversion overflowed and raised an unhandled exception; the reference system shut down, its identical backup failed the same way an instant later, and the guidance fed the rocket nonsense until it tore itself apart. The offending calculation was not even needed after liftoff.\n\nThe report became a landmark. It showed how reusing trusted code in a new context, without re-validating its assumptions, can plant a fatal defect that no one intended and no test on Ariane 5 had exercised.\n\nFor this inquiry, the parallel is exact. An integer overflow is a value too big for the container built to hold it — a small, quiet defect with a catastrophic result. Lions found it not by crying sabotage and not by blaming the launch crew, but by patient analysis of the software and its assumptions. His board is the model: the truth was a concealed defect, and only disciplined reconstruction, not a lurid guess, brought it into the light.",
      "frame": "The physicist spreads out a fault trace. \"Ariane 5 was one number too big for its box, and it cost a rocket. Small defects end lives. Show me you understand overflow before I share my reconstruction.\"",
      "q": [
        {
          "q": "What is integer overflow?",
          "o": [
            {
              "t": "A value too large for the fixed-size container meant to hold it.",
              "v": "expert",
              "fb": "When it will not fit, the number wraps or raises an error — often disastrously."
            },
            {
              "t": "A memory chip physically filling until no more data can be written.",
              "v": "wrong",
              "fb": "Overflow is one value exceeding its type's range, not a full memory chip."
            },
            {
              "t": "A flood of network traffic sent to overwhelm a machine from outside.",
              "v": "danger",
              "fb": "That is a denial-of-service attack; overflow here is an internal arithmetic fault."
            },
            {
              "t": "A program using more processor time than its schedule allotted to it.",
              "v": "partial",
              "fb": "That is a timing budget issue, not a value exceeding its container."
            }
          ]
        },
        {
          "q": "What did Lions's board find destroyed Ariane 5?",
          "o": [
            {
              "t": "Reused code converted a large velocity into a too-small integer and overflowed.",
              "v": "expert",
              "fb": "The unhandled overflow shut down guidance and the rocket self-destructed."
            },
            {
              "t": "A guidance beacon jammed by a rival to sabotage Europe's launch, in use.",
              "v": "danger",
              "fb": "There was no sabotage; the board traced it to an internal software defect."
            },
            {
              "t": "An engine that exploded on the pad from a flaw in its fuel pump, in use.",
              "v": "wrong",
              "fb": "The engines were sound; the failure was in the inertial reference software."
            },
            {
              "t": "A launch operator who entered the wrong coordinates before liftoff.",
              "v": "partial",
              "fb": "No operator error; the defect was reused code with an unchecked conversion."
            }
          ]
        },
        {
          "q": "What does the Ariane 5 report teach this board?",
          "o": [
            {
              "t": "Reused code in a new context can hide a fatal, unintended defect, under load.",
              "v": "expert",
              "fb": "Patient analysis, not a lurid guess, is what brings such a flaw to light."
            },
            {
              "t": "A new machine that fails so fast has almost certainly been attacked, on site.",
              "v": "danger",
              "fb": "Ariane 5 showed the opposite; the killer was an ordinary software defect."
            },
            {
              "t": "Blame the operators first, since crews cause most technical failures, in use.",
              "v": "danger",
              "fb": "Lions blamed neither crew nor saboteur; he found the defect by analysis."
            },
            {
              "t": "Trust the maker's testing, since a passing test is presented as showing the code is safe.",
              "v": "partial",
              "fb": "No Ariane 5 test exercised the flaw; passing tests did not establish it safe."
            }
          ]
        }
      ]
    },
    "testing": {
      "sci": "Glenford Myers (software-testing pioneer)",
      "topic": "Testing & its limits",
      "lede": "The engineer who insisted a good test is one that fails — because a test meant to confirm success will quietly let bugs live.",
      "no": 6,
      "profile": "Glenford Myers is an American computer scientist and author whose 1979 book 'The Art of Software Testing' became a foundational text of the discipline. He also wrote influential work on structured design, including the ideas of coupling and cohesion for judging how well a program is broken into modules, and worked in industry on major hardware and software systems.\n\nMyers's central and counterintuitive point concerns the psychology of testing. Most people, he observed, unconsciously test to show a program works — and so they run the gentle cases that pass, and feel reassured. That, he argued, is exactly backwards. Testing should be defined as the process of executing a program with the intent of finding errors, and a successful test case is one that exposes a previously undetected fault. A test run that finds nothing has, in this view, largely wasted its effort. He drove home how easily a single small program can hide errors, and how our desire to see success blinds us to failure.\n\nHe also stressed a hard limit: exhaustive testing — trying every possible input and path — is practically impossible for any real program. You can never test a program into being correct; you can only sample. Testing, at best, reveals some bugs; it can never prove there are none.\n\nFor this inquiry, Myers dismantles a comforting alibi. When a maker says the machine 'passed all its tests,' that clears nothing. A rare defect — a race that fires only under an unusual timing, a value checked in every case but the fatal one — can survive every trial the makers ever ran. 'It was tested' is not 'it was safe.' Myers arms the QA engineer to reject both the shrug of operator error and the certainty that a tested machine cannot be flawed.",
      "frame": "The QA engineer doesn't look up. \"They'll wave the test reports at you like a clean bill of health. A test that passes tells you almost nothing. Show me you know what testing can and can't prove.\"",
      "q": [
        {
          "q": "What did Myers say the goal of testing should be?",
          "o": [
            {
              "t": "To find errors — a good test is one that exposes a previously hidden bug.",
              "v": "expert",
              "fb": "Testing to confirm success quietly lets faults survive undetected."
            },
            {
              "t": "To confirm the program works, running the cases most likely to pass.",
              "v": "danger",
              "fb": "Myers called that mindset backwards; it hides bugs rather than finding them."
            },
            {
              "t": "To measure how fast the program runs under a heavy user workload.",
              "v": "wrong",
              "fb": "That is performance testing; Myers meant the hunt for correctness errors."
            },
            {
              "t": "To document the features so future programmers know how to use them.",
              "v": "partial",
              "fb": "Tests can inform, but their purpose per Myers is to reveal defects."
            }
          ]
        },
        {
          "q": "What is testing's fundamental limit?",
          "o": [
            {
              "t": "Exhaustive testing is impossible, so tests never prove a program correct.",
              "v": "expert",
              "fb": "Tests can reveal some bugs; they can rarely show that none remain."
            },
            {
              "t": "Testing catches every bug if you simply write enough test cases, in use.",
              "v": "danger",
              "fb": "No finite set of tests is exhaustive; some defects generally slip through."
            },
            {
              "t": "Testing works primarily on hardware, rarely on the software running on it.",
              "v": "wrong",
              "fb": "Myers's whole subject is testing software; the limit is exhaustiveness."
            },
            {
              "t": "Testing is likely to be done by the programmer who wrote the code being tested.",
              "v": "partial",
              "fb": "Independence helps, but the deeper limit is that testing does not be exhaustive."
            }
          ]
        },
        {
          "q": "What does 'it passed all its tests' prove here?",
          "o": [
            {
              "t": "Very little — a rare defect can survive every trial the makers ran, on site.",
              "v": "expert",
              "fb": "Passing tests is not safety; a timing bug can hide in the untested case."
            },
            {
              "t": "That the machine is fully safe, so the fault is likely to lie with the operator instead.",
              "v": "danger",
              "fb": "Passing tests does not clear a defect; it shifts nothing onto the operator."
            },
            {
              "t": "That any remaining fault was planted deliberately after testing ended, in use.",
              "v": "danger",
              "fb": "Untested paths can hide honest defects; no saboteur is implied."
            },
            {
              "t": "That the program is correct on every input it was actually given, on review.",
              "v": "partial",
              "fb": "primarily on the inputs tried; the fatal case may rarely have been run."
            }
          ]
        }
      ]
    },
    "softwaresafety": {
      "sci": "Nancy Leveson (b. 1948)",
      "topic": "Software safety engineering",
      "lede": "The engineer who dissected the era's most notorious medical software deaths and built a whole discipline so they need not repeat.",
      "no": 7,
      "profile": "Nancy Leveson is an American professor at MIT and the founder of modern software system safety. Her book 'Safeware' (1995) and later 'Engineering a Safer World' (2011) reshaped how engineers think about safety in computer-controlled systems. She is also known for the definitive technical analysis, with Clark Turner, of the Therac-25 — a radiation-therapy machine whose software gave several patients massive overdoses in the 1980s, killing some of them.\n\nLeveson's investigation of that machine is a founding case study of the field, and its findings are directly relevant here. The Therac-25 overdoses were not caused by a saboteur or by careless operators. They arose from software defects — race conditions that struck only when an experienced operator edited settings quickly — combined with a fateful design decision: earlier models had hardware interlocks that physically prevented an unsafe beam, but the Therac-25 removed them and trusted software alone. When the software failed, nothing else stood in the way.\n\nFrom such cases Leveson drew principles that overturn intuition. Software does not wear out or fail randomly like a gear; it fails from design and requirements errors built in from the start. Safety, she argues, is a property of the whole system, not something you get by making each component individually reliable — a perfectly reliable component doing the wrong thing is still deadly. Accidents in complex systems come from flawed interactions and missing constraints, not just isolated bugs.\n\nFor this inquiry, Leveson is the clearest lens on the truth. She teaches that a lethal radiation fault most often comes from a concealed software defect and a stripped-away safeguard — not from a hacker's cunning, not from a nurse's slip. Her work is the map for finding exactly that.",
      "frame": "Ama lowers her voice in the vendor's own office. \"There's a woman who took apart machines exactly like this one and found what really killed people. Show me you understand software safety before I tell you what I saw here.\"",
      "q": [
        {
          "q": "How does software fail, in Leveson's account?",
          "o": [
            {
              "t": "From design and requirements errors built in, not from wear or random faults.",
              "v": "expert",
              "fb": "Software has no gears to wear out; its faults are baked in from the start."
            },
            {
              "t": "By slowly degrading with use until, like a worn bearing, it breaks down.",
              "v": "wrong",
              "fb": "Software does not wear; that is a hardware failure model, not a software one."
            },
            {
              "t": "primarily when an outside attacker corrupts it, since clean code does not fail.",
              "v": "danger",
              "fb": "Software fails on its own from design errors, with no attacker involved."
            },
            {
              "t": "At random intervals that engineers can predict well with a failure-rate curve.",
              "v": "partial",
              "fb": "Random-failure curves fit hardware; software faults are systematic, not random."
            }
          ]
        },
        {
          "q": "What is Leveson's central principle of system safety?",
          "o": [
            {
              "t": "Safety is a property of the whole system, not of reliable parts alone.",
              "v": "expert",
              "fb": "A reliable component doing the wrong thing is still deadly."
            },
            {
              "t": "Making every single component reliable enough strongly supports a safe system.",
              "v": "danger",
              "fb": "Leveson rejects this; safety emerges from interactions, not part reliability."
            },
            {
              "t": "Safety comes from training operators to rarely make a mistake at all.",
              "v": "wrong",
              "fb": "She locates safety in system design, not in flawless operators."
            },
            {
              "t": "Safety is achieved once the software passes its full test suite cleanly.",
              "v": "partial",
              "fb": "Passing tests is not safety; safety is a designed system property."
            }
          ]
        },
        {
          "q": "What did the Therac-25 overdoses actually come from?",
          "o": [
            {
              "t": "Software race conditions plus hardware interlocks that had been removed.",
              "v": "expert",
              "fb": "A concealed defect with the physical safeguard stripped away — not sabotage."
            },
            {
              "t": "A malicious intrusion into the hospital's radiation-therapy machine.",
              "v": "danger",
              "fb": "Leveson found no attacker; the cause was defective software and lost interlocks."
            },
            {
              "t": "Operators who repeatedly ignored clear warnings the machine displayed.",
              "v": "danger",
              "fb": "The operators were not the cause; a hidden race and removed interlocks were."
            },
            {
              "t": "A single miscalibrated sensor that reported the wrong dose to the console.",
              "v": "partial",
              "fb": "It was software timing and removed interlocks, not one stray sensor."
            }
          ]
        }
      ]
    },
    "robusterror": {
      "sci": "Margaret Hamilton (b. 1936)",
      "topic": "Robust error handling & Apollo",
      "lede": "The programmer whose software refused to crash while a lunar lander screamed alarms three minutes from touchdown.",
      "no": 8,
      "profile": "Margaret Hamilton is an American computer scientist who led the team that wrote the onboard flight software for NASA's Apollo missions at the MIT Instrumentation Laboratory. She is often credited with popularizing the very term 'software engineering,' insisting that writing reliable code deserved the same rigor as any other engineering discipline. Her work faced the ultimate stakes: software that had to keep a spacecraft and its crew alive with no chance to patch it midflight.\n\nHamilton's guiding obsession was robust error handling — designing software that behaves sensibly when something unexpected happens, rather than simply failing. This was vindicated dramatically during the Apollo 11 landing in 1969. Minutes from the Moon, the guidance computer was overwhelmed by data from a radar switch left in the wrong position, and it began flashing 1201 and 1202 alarms. Because Hamilton's team had built in priority scheduling, the computer shed its lower-priority tasks and kept doing the essential job of landing, instead of freezing. The mission continued; the design absorbed the fault.\n\nHer principle is that a safe system anticipates errors and asynchronous events and has a planned, safe response to each — it degrades gracefully. The opposite is software that meets an unexpected condition and either halts or, far worse, proceeds blindly in an invalid state.\n\nFor this inquiry, Hamilton sets the standard the machine failed to meet. When a radiotherapy console meets a rare timing fault, robust software would detect the inconsistency and refuse to fire — fail safe. Instead, a poorly handled error can let the machine deliver a lethal beam while showing a cryptic code. That is a defect in the software's design, not a hacker's payload and not an operator's error. Hamilton teaches the investigator to ask what the software did when it hit the unexpected — and whether it was ever built to fail safe.",
      "frame": "The physicist studies an alarm printout. \"Good software catches the unexpected and refuses to do harm. This one flashed a code and fired anyway. Show me you understand error handling before I walk you through it.\"",
      "q": [
        {
          "q": "What is robust error handling, in Hamilton's sense?",
          "o": [
            {
              "t": "Software that meets the unexpected and responds safely instead of failing.",
              "v": "expert",
              "fb": "It anticipates errors and degrades gracefully rather than acting blindly."
            },
            {
              "t": "Software that runs faster by skipping checks it decides are unnecessary.",
              "v": "danger",
              "fb": "Skipping checks is the opposite; robustness means handling errors, not skipping them."
            },
            {
              "t": "Hardware built so sturdily that the software inside can rarely crash at all.",
              "v": "wrong",
              "fb": "It is a software design discipline, not a matter of rugged hardware."
            },
            {
              "t": "Code that stops the whole machine the instant any small anomaly appears.",
              "v": "partial",
              "fb": "Halting is one response; Hamilton aimed for a planned, safe continuation."
            }
          ]
        },
        {
          "q": "What happened during the Apollo 11 landing?",
          "o": [
            {
              "t": "Priority scheduling shed low-value tasks so the computer kept landing.",
              "v": "expert",
              "fb": "The design absorbed an overload and continued the essential job."
            },
            {
              "t": "The computer crashed and the crew landed the module largely by hand.",
              "v": "wrong",
              "fb": "It did not crash; it shed tasks and kept running the landing."
            },
            {
              "t": "A hacker's signal triggered the 1202 alarms during the final descent.",
              "v": "danger",
              "fb": "The alarms came from a misconfigured radar switch, not any intrusion."
            },
            {
              "t": "The alarms forced an abort and the landing was scrubbed until later.",
              "v": "partial",
              "fb": "There was no abort; the robust software let the landing proceed."
            }
          ]
        },
        {
          "q": "How does Hamilton's standard bear on this fault?",
          "o": [
            {
              "t": "Robust software would detect the inconsistency and refuse to fire the beam, in use.",
              "v": "expert",
              "fb": "Firing anyway on a rare fault is a design defect, not sabotage or a slip."
            },
            {
              "t": "A machine that fires on an error is likely to have been commanded by an intruder.",
              "v": "danger",
              "fb": "Poor error handling fires unsafely on its own; no intruder is needed."
            },
            {
              "t": "A cryptic error code is presented as showing the operator typed something they should not.",
              "v": "danger",
              "fb": "The code signals a software fault, not proof of an operator's mistake."
            },
            {
              "t": "If the machine kept running, the error was minor and can be set aside, in use.",
              "v": "partial",
              "fb": "Continuing through an unhandled error is precisely the dangerous failure."
            }
          ]
        }
      ]
    },
    "complexity": {
      "sci": "Donald Knuth (b. 1938)",
      "topic": "The analysis of algorithms",
      "lede": "The perfectionist who mails a small reward for every error found in his books, and built a science out of counting an algorithm's every step.",
      "no": 9,
      "profile": "Donald Knuth is an American computer scientist at Stanford, often called the father of the analysis of algorithms. His multi-volume work 'The Art of Computer Programming,' begun in the 1960s and still unfinished, sets a standard of rigor for the field, and he won the Turing Award in 1974. Frustrated by poor typesetting of his own mathematics, he also created the TeX system, and he championed 'literate programming,' the idea that programs should be written to be read by humans as much as executed by machines.\n\nKnuth's signature contribution is the rigorous analysis of algorithms: determining precisely how much time and memory a procedure needs, and how those costs grow as the problem gets larger. This is the world of Big-O notation, which describes the growth rate of an algorithm's cost while ignoring incidental constants, letting engineers compare methods and predict behavior at scale. Crucially, good analysis considers every case — not just the typical run, but the worst case and the rare one.\n\nHis perfectionism is legendary: he famously offers a small monetary reward for each genuine error found in his books, and once quipped, 'Beware of bugs in the above code; I have only proved it correct, not tried it.' Behind the joke is a serious point about the limits of confidence.\n\nFor this inquiry, Knuth stands for the discipline of accounting for every case, including the rare one. A defect that appears only under an unusual timing or an uncommon input is invisible to casual use and typical testing, yet it is exactly the case rigorous analysis is meant to catch. Complexity is where such faults hide. Knuth teaches the QA engineer that a machine is not understood until its rare and worst cases are understood — and that is where this truth was buried.",
      "frame": "The QA engineer taps a thick manual. \"There's a man who counts every step an algorithm can take, including the rare ones nobody runs. That rare case is where this hid. Show me you can think that way.\"",
      "q": [
        {
          "q": "What is the analysis of algorithms, Knuth's field?",
          "o": [
            {
              "t": "The rigorous study of the time and memory a procedure needs, in every case.",
              "v": "expert",
              "fb": "It predicts behavior at scale and across worst and rare cases alike."
            },
            {
              "t": "The art of writing code as quickly as possible to meet a deadline, in use.",
              "v": "wrong",
              "fb": "It is rigorous mathematical study, not a race to write code fast."
            },
            {
              "t": "The practice of guessing which program will feel fastest to a user, in use.",
              "v": "wrong",
              "fb": "It measures cost precisely rather than relying on subjective feel."
            },
            {
              "t": "The study of how to lay out one's code neatly so that others can easily read it.",
              "v": "partial",
              "fb": "Readability matters to Knuth, but analysis is about time and space costs."
            }
          ]
        },
        {
          "q": "What does Big-O notation describe?",
          "o": [
            {
              "t": "How an algorithm's cost grows with input size, ignoring constants.",
              "v": "expert",
              "fb": "It captures the growth rate so methods can be compared at scale."
            },
            {
              "t": "The exact number of seconds a program will take on a given machine.",
              "v": "wrong",
              "fb": "It gives growth rate, not an exact wall-clock time on one machine."
            },
            {
              "t": "The count of lines of code a programmer wrote to solve a problem.",
              "v": "wrong",
              "fb": "It measures resource growth, not the length of the source code."
            },
            {
              "t": "The largest input a computer can hold in its memory at any one time.",
              "v": "partial",
              "fb": "It concerns how cost scales with input, not a memory capacity limit."
            }
          ]
        },
        {
          "q": "How does Knuth's rigor bear on this hidden fault?",
          "o": [
            {
              "t": "A defect in a rare case is invisible to casual use but caught by analysis.",
              "v": "expert",
              "fb": "Rigorous accounting of every case is what rare-timing faults require."
            },
            {
              "t": "A fault seen primarily rarely is likely to have been slipped in by an attacker.",
              "v": "danger",
              "fb": "Rare defects hide in ordinary complexity; no intruder is implied."
            },
            {
              "t": "If the common case works, the rare case can safely be ignored largely, in use.",
              "v": "danger",
              "fb": "The rare case is exactly where this lethal fault lived; it does not be ignored."
            },
            {
              "t": "primarily very large programs can hide such faults, so small code is generally safe.",
              "v": "partial",
              "fb": "Even small code hides rare-case defects; size is no strongly support of safety."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "tech": {
      "treatment": "Ama stands at her own console, arms crossed, as if the room might accuse her. \"This is where I typed the edit they hung me with. I did my job the way I always do — and the machine did something I've never seen.\"",
      "biomed": "She looks lost among the physicist's meters and phantoms. \"I don't speak this language of dose curves, but I know what I saw on that screen. Tell me your numbers agree that it wasn't me.\"",
      "vendor": "In the maker's glass office Ama keeps her back straight and her voice low. \"They built this thing and now they watch me take the blame for it. Somebody in this building knows more than they're saying.\""
    },
    "phys": {
      "treatment": "The physicist runs a hand along the console housing, unimpressed. \"The operators keep telling me what they typed. I care what the machine delivered — and the beam that day was nothing like what the screen promised.\"",
      "biomed": "Surrounded by dosimeters and film, the physicist is finally at home. \"I reconstructed every dose. The patient was not the variable here. The machine handed out a fault, and I can show you the shape of it.\"",
      "vendor": "In the maker's office the physicist lays the reconstruction on the table like a verdict. \"Your machine, not my patient, was wrong. I have the numbers. Now I want to know what you knew when you shipped it.\""
    },
    "qa": {
      "treatment": "The QA engineer lingers at the console, uneasy at the scene of the harm. \"I tested machines like this for a living. Standing here, I keep thinking about the report nobody wanted filed.\"",
      "biomed": "Beside the physicist's reconstruction the QA engineer nods slowly. \"Your numbers match what I feared. This wasn't a wild dose — it was a specific fault, the kind that only shows up when the timing lines up wrong.\"",
      "vendor": "On home ground the QA engineer is quietest of all. \"The memo is in this building. I know because I helped write it. Follow the engineering and the schedule, and you'll find what they buried.\""
    }
  },
  "story": [
    "<b>Fatal Exception</b> begins inside the Calder radiotherapy inquiry, where the first explanation is already spreading faster than the evidence.",
    "<b>Technician Ama</b>, <b>The Medical Physicist</b>, and <b>The QA Engineer</b> each hold a different part of the record, and each conversation opens with one real pioneer whose work changes how the evidence should be read.",
    "The inquiry keeps circling <b>A malicious hack or cyberattack</b> and <b>Simple operator error — nothing systemic</b>. Both are tempting, and neither can be accepted just because it makes the cleanest headline.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and make the final WHAT judgment from what you learned."
  ],
  "endings": {
    "overclaimWhat": "hack",
    "dismissalWhat": "usererror",
    "win": {
      "expertTitle": "What the Code Proves, and No More",
      "expert": [
        "Foss names it exactly: Renwick, the manufacturer's software lead, who owned the code and buried the finding; the truth culminating in the Manufacturer's Software Office, where the flawed program and the shelved report live; and a concealed software defect — a race condition that fires under a rare timing — made lethal because a hardware interlock had been removed to save cost. Not a hack. Not a careless technician.",
        "Every card accounted for. Foss worked the console, the biomedical lab, and the vendor's office, turned a wary QA engineer into a witness, and claimed precisely what the logs and the memo could defend. The inquiry issues findings that recall the machine and restore the interlock — which is the entire point of doing it right."
      ],
      "soundTitle": "Right — but Lightly Proven",
      "sound": [
        "Foss names the right three — Renwick, the Software Office, and the concealed defect with its stripped-out interlock. The shape of the case is correct, and the refusal to cry sabotage or blame the technician is exactly right.",
        "But too many threads were left loose, and the maker's lawyers will pull at them. A few more days tracing the race condition and the shelved report would have made the finding unassailable. Close and honest, if not yet airtight."
      ],
      "namedTitle": "The Right Answer, Unearned",
      "named": [
        "Foss names the truth — Renwick, the Software Office, the concealed defect and removed interlock — but gathered too little to back it. It reads like a hunch that happened to land.",
        "The inquiry cannot recall a machine on an accusation this thin, however correct. Being right is not the same as being able to prove it to the people who will fight the finding in court."
      ]
    },
    "overclaim": {
      "title": "The Inquiry That Cried Hacker",
      "body": [
        "Foss reports a malicious hack — the machine seized by an outside attacker — the answer the headlines were already broadcasting. It is vivid, and it is not what the evidence shows.",
        "There was no intrusion, no attacker, no breach in the logs — only software delivering a lethal fault under a rare timing, with the one physical safeguard that would have stopped it deliberately removed. When the overclaim collapses, it takes credibility with it, and the real, provable defect is dismissed as just another conspiracy theory. The only intruder was a race condition the maker already knew about."
      ]
    },
    "dismissal": {
      "title": "Case Closed on the Technician",
      "body": [
        "Foss files it as simple operator error — a technician typed too fast, nothing systemic, close the file. It is half true and misses the graver half.",
        "The technician triggered a fault the software should never have allowed, on a machine whose hardware interlock had been quietly removed and whose defect the maker had already seen. Blaming the last hand on the keys leaves the flaw in every other machine still treating patients, waiting for the next fast edit. The inquiry saw the keystroke and never the corner cut into the design."
      ]
    },
    "wrongNames": {
      "title": "So Close",
      "body": [
        "Foss has the nature of it cold — a concealed software defect, a race condition made lethal by a removed interlock, neither a hack nor a careless technician. But the finger lands on the wrong name or the wrong room."
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A radiotherapy console with conflicting software states\"><rect x=\"56\" y=\"28\" width=\"244\" height=\"82\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M82 52 L274 52 M82 72 L216 72 M82 92 L244 92\" stroke=\"#e2e2d8\" stroke-width=\"1.2\"/><path d=\"M118 44 L168 96 M168 44 L118 96\" stroke=\"#B3261E\" stroke-width=\"2\"/><path d=\"M370 38 L508 38 L508 100 L370 100 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M508 68 L590 68\" stroke=\"#326891\" stroke-width=\"2.2\"/><circle cx=\"596\" cy=\"68\" r=\"7\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2\"/></svg>"
}};
