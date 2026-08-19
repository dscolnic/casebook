module.exports = { PACK: {
  "id": "c_fraud",
  "title": "The Lindqvist Result",
  "discipline": "Research Integrity & Scientific Method",
  "teaser": "One lab announced the breakthrough of the decade — and no one else could reproduce it. A genius ahead of the field? A dead end best forgotten? Or a result that was manufactured?",
  "overclaimTag": "the breakthrough of the decade",
  "truthTag": "fabricated results",
  "venue": "the Lindqvist Result inquiry",
  "agent": {
    "name": "Investigator Nora Vance",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Panel credibility",
  "readingShort": "Skeptics",
  "readingLabel": "Method & Research Integrity",
  "dossierName": "METHOD & RESEARCH INTEGRITY",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Lindqvist Result inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The place you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "The grander the claim becomes, the more carefully you should inspect the ordinary records it asks you to overlook.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "fr_pi",
      "items": [
        {
          "id": "fr_pi",
          "label": "Prof. Cassian Lund — the principal investigator"
        },
        {
          "id": "fr_postdoc",
          "label": "Dr. Ames — a postdoc co-author"
        },
        {
          "id": "fr_director",
          "label": "The institute director"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "fr_forensics",
      "items": [
        {
          "id": "fr_lab",
          "label": "The Laboratory & Instrument Room"
        },
        {
          "id": "fr_press",
          "label": "The Journal & Press Office"
        },
        {
          "id": "fr_forensics",
          "label": "The Notebook & Image-Forensics Room"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "fr_fabrication",
      "items": [
        {
          "id": "fr_breakthrough",
          "label": "The breakthrough of the decade"
        },
        {
          "id": "fr_deadend",
          "label": "An honest dead end — just science that failed"
        },
        {
          "id": "fr_fabrication",
          "label": "Fabricated figures & suppressed failed replications"
        }
      ]
    }
  },
  "PLACES": {
    "fr_lab": {
      "name": "The Laboratory & Instrument Room",
      "xy": [
        140,
        90
      ]
    },
    "fr_press": {
      "name": "The Journal & Press Office",
      "xy": [
        330,
        240
      ]
    },
    "fr_forensics": {
      "name": "The Notebook & Image-Forensics Room",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "fr_lab",
      "fr_press"
    ],
    [
      "fr_press",
      "fr_forensics"
    ]
  ],
  "CHARACTERS": {
    "fr_whistle": {
      "name": "Postdoc Iida",
      "role": "Whistleblower postdoc",
      "face": "🧑‍🔬",
      "badge": "I",
      "legend": "the laboratory",
      "hint": "Tried for months to reproduce the result; the key runs never once worked."
    },
    "fr_imaging": {
      "name": "Analyst Brede",
      "role": "Image-forensics analyst",
      "face": "🖥",
      "badge": "B",
      "legend": "the forensics room",
      "hint": "Overlays the published figures; the same band appears in three 'different' experiments."
    },
    "fr_investigator": {
      "name": "Auditor Kase",
      "role": "Integrity investigator",
      "face": "🗂",
      "badge": "K",
      "legend": "the press office",
      "hint": "Holds the notebooks and reviewer files — including the replications quietly buried."
    }
  },
  "TOPICMAP": {
    "fr_lab": {
      "fr_whistle": [
        "fr_bacon"
      ],
      "fr_imaging": [
        "fr_whewell"
      ],
      "fr_investigator": [
        "fr_popper"
      ]
    },
    "fr_press": {
      "fr_whistle": [
        "fr_kuhn"
      ],
      "fr_imaging": [
        "fr_lakatos"
      ],
      "fr_investigator": [
        "fr_langmuir"
      ]
    },
    "fr_forensics": {
      "fr_whistle": [
        "fr_goodstein"
      ],
      "fr_imaging": [
        "fr_schon"
      ],
      "fr_investigator": [
        "fr_darsee"
      ]
    }
  },
  "TOPICS": {
    "fr_bacon": {
      "sci": "Francis Bacon (1561–1626)",
      "topic": "The inductive experimental method",
      "lede": "He tried to replace reverence for old authorities with a disciplined campaign of observation, comparison, and experiment.",
      "no": 1,
      "profile": "Francis Bacon was not a laboratory scientist in the modern sense. He was an English lawyer, politician, and philosopher who argued that natural knowledge needed a new method. In Novum Organum, published in 1620, Bacon attacked the habit of beginning with inherited principles and then forcing observations to fit them. He wanted investigators to build upward from carefully gathered particulars, using organized comparison rather than admiration for famous books.\n\nHis method was more demanding than merely collecting facts. Bacon proposed tables of presence, absence, and degree: list the circumstances in which a phenomenon appears, where it does not appear, and where it grows stronger or weaker. Such tables were meant to separate causes from coincidences. He also described recurring sources of error as idols—the distortions of human nature, personal habit, language, and accepted systems. A persuasive story could therefore be an obstacle to discovery if it made inconvenient cases disappear.\n\nBacon’s own natural history included many reports that would not satisfy modern standards, and his program did not supply today’s statistical tools. Its enduring force was procedural. Claims should face hostile comparisons. Negative instances matter. An explanation earns trust by surviving attempts to exclude it, not by gathering only examples that look favorable. That logic helped shape later experimental culture even when scientists rejected parts of Bacon’s philosophy.\n\nThe Lindqvist file demands exactly this discipline. A spectacular figure cannot be judged by how well it fits a desired conclusion; investigators must compare successful and failed runs, conditions where the effect should vanish, and records the publication omitted. Bacon’s tables would not declare a breakthrough or shrug at an honest failure. They would ask why the reported pattern appears only in the selected evidence.",
      "frame": "Iida sets a stained lab notebook beside the instrument log. “Lund’s paper gives you the glorious runs. Bacon would ask for the absences. Show me you know why those missing cases matter.”",
      "q": [
        {
          "q": "What did Bacon mean by building knowledge through induction?",
          "o": [
            {
              "t": "Move from organized observations toward cautious general claims.",
              "v": "expert",
              "fb": "Baconian induction begins with particulars and tests generalizations against contrasting cases."
            },
            {
              "t": "Begin with a grand theory, then collect examples that illustrate it.",
              "v": "danger",
              "fb": "That reverses Bacon’s program and invites confirmation bias."
            },
            {
              "t": "Repeat inherited authorities until their conclusions become settled.",
              "v": "wrong",
              "fb": "Bacon explicitly challenged reliance on authority as a path to natural knowledge."
            },
            {
              "t": "Treat every observation as equally decisive, without comparison.",
              "v": "partial",
              "fb": "Bacon valued observations, but his tables organized them to distinguish causes from accidents."
            }
          ]
        },
        {
          "q": "Why did Bacon value tables of presence, absence, and degree?",
          "o": [
            {
              "t": "They compared where an effect appears, disappears, and changes strength.",
              "v": "expert",
              "fb": "Contrasting cases were meant to expose which circumstances actually track the phenomenon."
            },
            {
              "t": "They ranked discoveries by prestige, novelty, and public attention.",
              "v": "wrong",
              "fb": "Bacon’s tables concerned conditions of phenomena, not social importance."
            },
            {
              "t": "They preserved mainly the clearest positive trials for later publication.",
              "v": "danger",
              "fb": "Discarding negative trials destroys the comparisons Bacon considered essential."
            },
            {
              "t": "They replaced experiments with a complete catalogue of reported facts.",
              "v": "partial",
              "fb": "Compilation helped, but the purpose was causal comparison rather than passive storage."
            }
          ]
        },
        {
          "q": "Which lesson from Bacon best applies to a failed replication?",
          "o": [
            {
              "t": "A negative instance can expose a claimed cause that was too broad.",
              "v": "expert",
              "fb": "For Bacon, contrary cases constrain explanations instead of being treated as nuisances."
            },
            {
              "t": "A failed run suggests the entire research field is intellectually bankrupt.",
              "v": "danger",
              "fb": "One failure can challenge a claim without justifying a sweeping attack on the field."
            },
            {
              "t": "A failed run should be ignored when the original result was dramatic.",
              "v": "wrong",
              "fb": "Prestige and drama do not erase evidence that conflicts with a claim."
            },
            {
              "t": "A failed run matters mainly after every instrument component is replaced.",
              "v": "partial",
              "fb": "Technical checks are sensible, but contrary evidence matters before exhaustive replacement."
            }
          ]
        }
      ]
    },
    "fr_whewell": {
      "sci": "William Whewell (1794–1866)",
      "topic": "Induction & the consilience of evidence",
      "lede": "He argued that a strong theory earns trust when independent roads of evidence unexpectedly meet at one point.",
      "no": 2,
      "profile": "William Whewell was a Cambridge polymath who wrote on mechanics, mineralogy, tides, education, architecture, and the philosophy of science. In 1833 he coined the English word scientist during a discussion of what to call people who cultivated knowledge of nature. More important for method, his History of the Inductive Sciences and Philosophy of the Inductive Sciences examined how discoveries emerge from an active fit between facts and ideas.\n\nWhewell rejected the picture of induction as a simple heap of observations. Investigators bring concepts—such as force, polarity, or chemical affinity—that allow scattered measurements to be understood together. He called the successful binding of facts a colligation. A good conception does not merely summarize the data used to build it; it also reaches beyond them. When the same theory explains different classes of facts that were not tailored to one another, Whewell called the convergence a consilience of inductions.\n\nHis favored examples came from astronomy and physics. Newtonian gravitation linked terrestrial falling bodies, planetary paths, tides, and cometary motion. The strength lay in distinct evidence streams agreeing under one mathematical framework. Whewell also valued successful prediction and the later simplification of a theory. None of these guarantees truth, but they make a claim harder to explain as coincidence or local adjustment. Evidence produced by one pipeline alone is correspondingly fragile.\n\nAnalyst Brede’s overlays offer a dark counterfeit of consilience. Three figures appear to confirm one another, yet if the same image fragment was reused, they are not independent roads at all. Nor does one failed replication erase every possibility. The inquiry must ask whether instruments, notebooks, raw files, and outside laboratories genuinely converge. Apparent agreement manufactured from a common source has the shape of strong evidence without its substance.",
      "frame": "Brede rotates three plots on the monitor until their peaks line up. “Independent confirmation is powerful. Copies wearing new labels are not. Tell me how Whewell would separate convergence from repetition.”",
      "q": [
        {
          "q": "What did Whewell mean by a consilience of inductions?",
          "o": [
            {
              "t": "Independent classes of evidence converge on the same explanatory theory.",
              "v": "expert",
              "fb": "Consilience is powerful because separate evidential routes meet without being built to do so."
            },
            {
              "t": "Repeated measurements from one instrument produce nearly identical values.",
              "v": "partial",
              "fb": "Precision within one stream is useful, but consilience requires different classes of evidence."
            },
            {
              "t": "Several authors cite the same paper as proof of a growing consensus.",
              "v": "danger",
              "fb": "Shared citation can repeat one source rather than provide independent confirmation."
            },
            {
              "t": "A theory is rewritten after each anomaly until no observation can oppose it.",
              "v": "wrong",
              "fb": "A theory protected from every possible conflict loses evidential force."
            }
          ]
        },
        {
          "q": "Why is duplicated imagery weaker than three independent experiments?",
          "o": [
            {
              "t": "The images share one source, so their apparent agreement is not independent.",
              "v": "expert",
              "fb": "Reused material multiplies appearances without multiplying evidence."
            },
            {
              "t": "Digital images are generally less reliable than handwritten laboratory notes.",
              "v": "wrong",
              "fb": "Either medium can be authentic or manipulated; provenance is the key issue."
            },
            {
              "t": "Any repeated visual pattern suggests deliberate fabrication by the lead author.",
              "v": "danger",
              "fb": "Duplication demands explanation, but intent and responsibility require additional evidence."
            },
            {
              "t": "Independent experiments should rarely resemble one another in their results.",
              "v": "wrong",
              "fb": "Real replications may resemble each other; independence concerns origin, not visual difference."
            }
          ]
        },
        {
          "q": "Which finding would add genuine consilience to the case?",
          "o": [
            {
              "t": "Raw images, instrument logs, and outside replications all match independently.",
              "v": "expert",
              "fb": "Agreement across separately produced records is stronger than repeated presentation of one file."
            },
            {
              "t": "Three journal articles reuse the same graph with slightly altered captions.",
              "v": "danger",
              "fb": "Multiple publications do not create independent evidence when they recycle one source."
            },
            {
              "t": "The principal investigator gives a consistent explanation in every interview.",
              "v": "partial",
              "fb": "Consistency of testimony helps assess credibility but is not independent experimental support."
            },
            {
              "t": "The press office repeats the claim across several institutional announcements.",
              "v": "wrong",
              "fb": "Public repetition changes visibility, not the evidential base."
            }
          ]
        }
      ]
    },
    "fr_popper": {
      "sci": "Karl Popper (1902–1994)",
      "topic": "Falsifiability & conjectures",
      "lede": "He made risk the price of scientific seriousness: a claim must expose itself to a possible refutation.",
      "no": 3,
      "profile": "Karl Popper developed his philosophy of science against the background of early twentieth-century debates over physics, Marxism, and psychoanalysis. In The Logic of Scientific Discovery, first published in German in 1934, he argued that universal theories cannot be proved by accumulating confirming instances. However many white swans one observes, the claim that all swans are white remains vulnerable to a black swan.\n\nPopper proposed falsifiability as a line separating scientific claims from systems that accommodate every outcome. A theory is scientific when it forbids something—when imaginable observations could conflict with it. Scientists advance bold conjectures and subject them to severe tests. Surviving a test corroborates a theory for the moment; it does not establish final truth. This view placed emphasis on prediction, risky exposure, and the refusal to rescue a favored idea with endless ad hoc adjustments.\n\nActual science is more complicated. Measurements can fail, auxiliary assumptions can be wrong, and one anomalous result rarely tells researchers exactly what to abandon. Philosophers after Popper stressed these complications. Even so, his central challenge remains useful: does the claim make contact with evidence in a way that could count against it? If every failed replication is blamed on unnamed subtleties while every positive image is accepted immediately, the testing is asymmetric.\n\nIn the Lindqvist inquiry, the sensational interpretation and the complacent one both evade risk. Calling the result a historic breakthrough despite contradictory runs protects it from refutation. Calling the affair merely an ordinary dead end can also ignore records showing that failures were concealed and figures altered. Popper directs attention to stated predictions, preregistered exclusion rules, and whether the investigators allowed unfavorable outcomes to remain capable of changing the conclusion.",
      "frame": "Kase places the protocol beside six amendments written after the results arrived. “A test that cannot lose is theater. Popper’s rule is blunt, but this inquiry needs blunt questions.”",
      "q": [
        {
          "q": "What makes a claim falsifiable in Popper’s sense?",
          "o": [
            {
              "t": "Some possible observation would count clearly against the claim.",
              "v": "expert",
              "fb": "Falsifiability requires a claim to exclude outcomes rather than absorb everything."
            },
            {
              "t": "Most specialists currently agree that the claim is probably correct.",
              "v": "partial",
              "fb": "Consensus may reflect evidence, but it is not the definition of falsifiability."
            },
            {
              "t": "The claim has accumulated many examples that appear to confirm it.",
              "v": "partial",
              "fb": "Confirmations do not show whether any conceivable result could refute the claim."
            },
            {
              "t": "Every failed test can be explained by an unspecified hidden condition.",
              "v": "danger",
              "fb": "Unlimited rescue clauses shield a claim from the risk Popper required."
            }
          ]
        },
        {
          "q": "What does a successful severe test provide, according to Popper?",
          "o": [
            {
              "t": "Temporary corroboration, not a final proof that the theory is true.",
              "v": "expert",
              "fb": "Survival strengthens a theory provisionally while leaving future refutation possible."
            },
            {
              "t": "Logical certainty that no later experiment can overturn the conclusion.",
              "v": "danger",
              "fb": "Popper rejected final verification of universal scientific theories."
            },
            {
              "t": "Permission to discard all contradictory measurements as instrument noise.",
              "v": "wrong",
              "fb": "Contradictory evidence must be investigated rather than excluded automatically."
            },
            {
              "t": "Evidence that the theory’s author used the most sophisticated apparatus.",
              "v": "wrong",
              "fb": "Technical prestige is not equivalent to surviving a risky prediction."
            }
          ]
        },
        {
          "q": "Which behavior most weakens a purported test of the Lindqvist effect?",
          "o": [
            {
              "t": "Changing exclusion rules after seeing which runs support the claim.",
              "v": "expert",
              "fb": "Post hoc rules can protect a conclusion from the very outcomes meant to test it."
            },
            {
              "t": "Calibrating the instrument with standards before collecting blinded samples.",
              "v": "wrong",
              "fb": "Calibration and blinding generally make a test more discriminating."
            },
            {
              "t": "Publishing a predicted null condition alongside the positive condition.",
              "v": "wrong",
              "fb": "A null condition gives the claim a meaningful opportunity to fail."
            },
            {
              "t": "Repeating a protocol at another laboratory with independent operators.",
              "v": "wrong",
              "fb": "Independent replication increases exposure to refutation rather than weakening it."
            }
          ]
        }
      ]
    },
    "fr_kuhn": {
      "sci": "Thomas Kuhn (1922–1996)",
      "topic": "Paradigms, anomalies & revolutions",
      "lede": "He showed why anomalies can linger for years—and why neither excitement nor failure alone settles a scientific revolution.",
      "no": 4,
      "profile": "Thomas Kuhn trained as a physicist before turning to the history and philosophy of science. His 1962 book The Structure of Scientific Revolutions challenged the picture of science as a steady pile of facts. Mature fields, he argued, usually work within a paradigm: a shared set of exemplary problems, methods, standards, and assumptions that tells a community what counts as a legitimate puzzle.\n\nDuring normal science, researchers do not abandon a paradigm at the first mismatch. They refine measurements, repair instruments, and solve puzzles expected to have answers within the framework. Anomalies can be known for long periods without producing crisis. A revolution becomes possible when important anomalies accumulate, confidence weakens, and an alternative framework can reorganize the field’s problems. Kuhn used episodes such as the Copernican and chemical revolutions to show how standards and concepts can shift together.\n\nThe word paradigm became so popular that Kuhn later clarified its meanings. His account was not a license to call every surprising paper revolutionary, nor did it say evidence is irrelevant. Scientific communities still argue over precision, scope, fruitfulness, and problem-solving power. A failed replication may identify an ordinary technical puzzle, a limitation of a claim, or a deeper crisis. Its significance emerges through sustained investigation, not press language.\n\nThat is the useful restraint for the Lindqvist Result. Lund’s supporters sell one dramatic experiment as a field-changing rupture; defenders of the institute describe repeated failures as routine noise. Kuhn would require a wider map: what established results are challenged, whether independent groups can reproduce the effect, and whether the new account solves problems better than the old one. Fabricated evidence cannot found a revolution, while genuine anomalies should not be buried merely because they are inconvenient.",
      "frame": "Iida folds the institute’s “PARADIGM SHIFT” brochure in half. “That phrase did a lot of fundraising. Kuhn’s actual argument was slower and harder. Let’s see whether you can tell crisis from advertising.”",
      "q": [
        {
          "q": "What is “normal science” in Kuhn’s account?",
          "o": [
            {
              "t": "Puzzle-solving conducted within a community’s established paradigm.",
              "v": "expert",
              "fb": "Normal science extends and refines a shared framework rather than replacing it daily."
            },
            {
              "t": "Research that produces mainly expected results and contains no anomalies.",
              "v": "partial",
              "fb": "Anomalies can occur during normal science without immediately ending it."
            },
            {
              "t": "Science performed without theories, values, or disciplinary assumptions.",
              "v": "wrong",
              "fb": "Kuhn emphasized the framework supplied by paradigms."
            },
            {
              "t": "Routine work that can be dismissed as intellectually unimportant.",
              "v": "danger",
              "fb": "Kuhn saw normal puzzle-solving as central to scientific development."
            }
          ]
        },
        {
          "q": "Does one failed replication create a Kuhnian revolution?",
          "o": [
            {
              "t": "No; its meaning depends on persistence, importance, and viable alternatives.",
              "v": "expert",
              "fb": "An anomaly becomes revolutionary only within a broader crisis and conceptual replacement."
            },
            {
              "t": "Yes; any contradiction instantly makes the current paradigm irrational.",
              "v": "danger",
              "fb": "Kuhn stressed that paradigms routinely survive anomalies during normal science."
            },
            {
              "t": "No; replications rarely matter once a prestigious journal publishes first.",
              "v": "wrong",
              "fb": "Persistent replication failure can become an important anomaly."
            },
            {
              "t": "Yes; a new press label is enough to establish a replacement paradigm.",
              "v": "wrong",
              "fb": "Public branding does not supply explanatory or problem-solving power."
            }
          ]
        },
        {
          "q": "Which evidence would support a genuine paradigm-changing claim?",
          "o": [
            {
              "t": "Independent results plus a framework that solves important existing problems.",
              "v": "expert",
              "fb": "Revolutions require sustained evidential and explanatory success, not novelty alone."
            },
            {
              "t": "A single striking image paired with unusually confident institutional publicity.",
              "v": "danger",
              "fb": "Drama and confidence cannot substitute for reproducible problem solving."
            },
            {
              "t": "Repeated failure explained mainly by saying outsiders lack the proper intuition.",
              "v": "wrong",
              "fb": "An explanation that excludes all external testing cannot establish a new paradigm."
            },
            {
              "t": "A result that preserves every old assumption while changing one graph label.",
              "v": "wrong",
              "fb": "A cosmetic relabeling is not the conceptual transformation Kuhn described."
            }
          ]
        }
      ]
    },
    "fr_lakatos": {
      "sci": "Imre Lakatos (1922–1974)",
      "topic": "Degenerating research programmes",
      "lede": "He judged research programs by whether adjustments predicted new facts or merely protected a failing core after the fact.",
      "no": 5,
      "profile": "Imre Lakatos was a Hungarian-born philosopher who worked at the London School of Economics after leaving Hungary in 1956. He sought a position between Popper’s emphasis on refutation and Kuhn’s account of resilient paradigms. Scientists do not test isolated hypotheses one at a time, Lakatos argued. They work in research programmes composed of a hard core of central commitments and a protective belt of auxiliary assumptions.\n\nWhen a prediction fails, researchers may reasonably alter the protective belt rather than abandon the entire programme. A detector may be miscalibrated; a background process may have been neglected. The key question is whether changes are progressive or degenerating. A progressive programme modifies theory in ways that predict novel facts and then gains empirical support. A degenerating programme introduces adjustments mainly after difficulties arise, explaining known failures without producing successful new predictions.\n\nLakatos’s approach made room for patience. Promising programmes sometimes endure setbacks, while accepted ones can enter decline. It also prevented patience from becoming immunity. An endless sequence of excuses—special sample purity, unrecorded timing, unique operator skill—may preserve the hard core syntactically while stripping the programme of discovery. Historical comparison over time matters more than one dramatic test.\n\nThe Lindqvist Result has accumulated a protective belt around its headline claim. Each failed replication brings a new condition, yet the original notebooks do not show those conditions were specified beforehand. That pattern may indicate poor methodology, and the forensic evidence raises a graver possibility. Lakatos cannot determine intent, but he helps distinguish a productive response to anomaly from a retreat. The panel should ask whether revisions generated independent, risky successes or only kept one celebrated conclusion beyond reach.",
      "frame": "Brede scrolls through six versions of the methods section. “Every failure produced a new requirement. Lakatos would ask whether those repairs discovered anything—or only moved the walls.”",
      "q": [
        {
          "q": "What is the protective belt in a Lakatosian research programme?",
          "o": [
            {
              "t": "Auxiliary assumptions that can be revised around central commitments.",
              "v": "expert",
              "fb": "The belt absorbs adjustments while the programme’s hard core remains provisionally fixed."
            },
            {
              "t": "A legal policy shielding senior scientists from misconduct investigations.",
              "v": "danger",
              "fb": "Lakatos described a structure of theories, not institutional immunity."
            },
            {
              "t": "The collection of successful papers selected for a laboratory website.",
              "v": "wrong",
              "fb": "A publication list is not the network of auxiliary hypotheses he meant."
            },
            {
              "t": "A set of facts that can rarely be questioned by later experiments.",
              "v": "wrong",
              "fb": "No empirical content becomes permanently untouchable in his methodology."
            }
          ]
        },
        {
          "q": "What makes a research programme progressive rather than degenerating?",
          "o": [
            {
              "t": "Its revisions predict novel findings that later receive empirical support.",
              "v": "expert",
              "fb": "Progressive changes lead evidence instead of merely chasing known difficulties."
            },
            {
              "t": "Its defenders can explain every failure after learning the final result.",
              "v": "danger",
              "fb": "Post hoc accommodation without new success is a mark of degeneration."
            },
            {
              "t": "It keeps the same central claim unchanged for the greatest number of years.",
              "v": "wrong",
              "fb": "Longevity alone says nothing about predictive progress."
            },
            {
              "t": "It attracts increasing publicity and funding despite uncertain measurements.",
              "v": "wrong",
              "fb": "Social expansion does not establish theoretical or empirical progress."
            }
          ]
        },
        {
          "q": "Which response to replication failure looks most degenerating?",
          "o": [
            {
              "t": "Adding an undocumented condition only after each outside test fails.",
              "v": "expert",
              "fb": "Repeated post hoc rescue without new predictions is the pattern Lakatos criticized."
            },
            {
              "t": "Finding a calibration error and predicting its effect before rerunning samples.",
              "v": "wrong",
              "fb": "A specified correction that yields a risky prediction may be progressive."
            },
            {
              "t": "Publishing both the failed trial and the revised protocol with raw data.",
              "v": "wrong",
              "fb": "Transparency permits the programme’s changes to be tested."
            },
            {
              "t": "Testing whether the effect appears in a newly predicted material class.",
              "v": "wrong",
              "fb": "Novel successful extension would count in favor of progress."
            }
          ]
        }
      ]
    },
    "fr_langmuir": {
      "sci": "Irving Langmuir (1881–1957)",
      "topic": "'Pathological science'",
      "lede": "A Nobel chemist catalogued the warning signs of researchers who fool themselves at the edge of detection.",
      "no": 6,
      "profile": "Irving Langmuir was a General Electric chemist whose studies of surfaces, adsorption, and molecular films earned the 1932 Nobel Prize in Chemistry. Late in his career he became interested in episodes where capable scientists pursued effects that did not exist. In a 1953 talk at General Electric, later circulated under the title “Pathological Science,” he described recurring symptoms of self-deception.\n\nLangmuir’s examples included N-rays, a supposed radiation announced by René Blondlot in 1903, and claims about unusually small biological or physical effects. He noted patterns: the maximum effect was barely detectable; measurements claimed fantastic accuracy despite weak signals; critics were answered with ad hoc excuses; supporters increased for a time and then faded; and the effect depended heavily on subjective judgments. In the N-ray episode, physicist Robert Wood secretly removed a crucial prism during a demonstration, yet the observers continued reporting changes.\n\nThe term is controversial. Langmuir grouped unlike cases and sometimes judged active research too quickly. Pathological science is not synonymous with fraud. Participants may be sincere, disciplined in many respects, and caught by expectation at the limit of perception. Modern safeguards such as blinding, automated measurement, preregistration, and independent replication address precisely these vulnerabilities.\n\nThe Lindqvist inquiry must not mistake self-deception for innocence or fabrication for mere enthusiasm. A band near the detection threshold could be overread honestly. But identical image features across purportedly separate runs, missing raw files, and suppressed replication records demand a different level of scrutiny. Langmuir’s warning signs identify where bias can enter; forensic provenance determines whether the data were simply misperceived, selectively handled, or deliberately manufactured.",
      "frame": "Kase dims the office lights until the faint band almost appears. “At the threshold, expectation can do half the experiment. Langmuir teaches caution—but not an excuse for copied pixels.”",
      "q": [
        {
          "q": "What did Langmuir mean by “pathological science”?",
          "o": [
            {
              "t": "Sincere researchers can sustain nonexistent effects through self-deception.",
              "v": "expert",
              "fb": "His cases emphasized expectation, weak signals, and resistance to disconfirmation."
            },
            {
              "t": "A secret criminal network fabricates data across every scientific institution.",
              "v": "danger",
              "fb": "Pathological science does not require conspiracy or deliberate fraud."
            },
            {
              "t": "Any study of disease using uncertain laboratory measurements at all.",
              "v": "wrong",
              "fb": "The phrase described a pattern of mistaken inquiry, not medical pathology."
            },
            {
              "t": "Research that later suggests wrong despite transparent methods and strong tests.",
              "v": "partial",
              "fb": "Ordinary error differs from the persistent warning signs Langmuir catalogued."
            }
          ]
        },
        {
          "q": "Which was one warning sign Langmuir emphasized?",
          "o": [
            {
              "t": "A tiny effect paired with claims of accuracy beyond the measurement limits.",
              "v": "expert",
              "fb": "Fantastic precision around a barely detectable effect was central to his diagnosis."
            },
            {
              "t": "A large signal reproduced by blinded observers using different instruments.",
              "v": "wrong",
              "fb": "Independent robust reproduction points away from pathological science."
            },
            {
              "t": "A theory that makes quantitative predictions before the experiment begins.",
              "v": "wrong",
              "fb": "Risky advance prediction is generally a safeguard, not a symptom."
            },
            {
              "t": "A result that critics can test using openly supplied materials and data.",
              "v": "wrong",
              "fb": "Open testing allows self-deception to be exposed rather than protected."
            }
          ]
        },
        {
          "q": "Why is Langmuir’s framework insufficient to prove fabrication?",
          "o": [
            {
              "t": "Its symptoms show possible self-deception, not who altered a record.",
              "v": "expert",
              "fb": "Intent and responsibility require provenance, testimony, and documentary evidence."
            },
            {
              "t": "It applies mainly to chemistry conducted before electronic instruments existed.",
              "v": "wrong",
              "fb": "Threshold effects and expectation remain relevant across modern fields."
            },
            {
              "t": "It assumes every weak effect is genuine until a court rejects it; in use.",
              "v": "wrong",
              "fb": "Langmuir was skeptical of weak effects, but his framework was not a legal test."
            },
            {
              "t": "It suggests that all copied images result from unconscious visual expectation.",
              "v": "danger",
              "fb": "Pixel duplication is a forensic fact needing explanation, not a perceptual illusion."
            }
          ]
        }
      ]
    },
    "fr_goodstein": {
      "sci": "David Goodstein (1939–2024)",
      "topic": "'On Fact and Fraud'",
      "lede": "From decades at Caltech, he argued that misconduct flourishes where intense competition meets evidence nobody else can inspect.",
      "no": 7,
      "profile": "David Goodstein was a physicist and longtime professor at the California Institute of Technology. He taught widely through The Mechanical Universe television course and served in senior academic roles, including vice provost. His experience handling research-integrity questions informed On Fact and Fraud: Cautionary Tales from the Front Lines of Science, published in 2010.\n\nGoodstein rejected both complacency and panic. Science is not self-correcting by magic, yet it possesses unusually strong error-detection practices: replication, criticism, quantitative prediction, and the demand that claims answer to nature. Those mechanisms can fail when experiments are expensive, results are difficult to reproduce, data remain under one person’s control, or competition rewards a spectacular answer before verification. Fraud may survive long enough to waste careers and distort priorities even if it is eventually exposed.\n\nHe emphasized a changing research environment. In a small idealized community, recognition might follow patient contribution. Modern careers can depend on grants, publication, and priority. Goodstein discussed how misconduct investigations must separate honest error from fabrication, falsification, and plagiarism without assuming that every anomaly proves guilt. Due process matters because accusations can destroy reputations; documentary evidence matters because prestige cannot settle facts.\n\nThe Lindqvist inquiry contains each tension. The result promised status and funding, only one laboratory controlled the crucial runs, and junior researchers report that failures vanished from the story. That does not make every positive result false. It makes independent custody, raw-file provenance, and fair interviews indispensable. Goodstein’s cautionary stance rejects the miracle headline and the shrug of “science corrects itself.” Correction requires people willing to preserve evidence, ask unwelcome questions, and act before a corrupted result becomes infrastructure for further work.",
      "frame": "Iida locks the raw-data cabinet and keeps the key visible. “Goodstein knew correction needs custody, not slogans. Tell me what makes a spectacular claim especially vulnerable.”",
      "q": [
        {
          "q": "Why did Goodstein reject the phrase “science is self-correcting” as reassurance?",
          "o": [
            {
              "t": "Correction depends on active replication, criticism, records, and institutions.",
              "v": "expert",
              "fb": "Errors do not repair themselves; people and procedures must expose and address them."
            },
            {
              "t": "He believed scientific knowledge rarely improves after an error is published.",
              "v": "wrong",
              "fb": "His point was that correction is possible but neither automatic nor costless."
            },
            {
              "t": "He argued that journals should accept every accusation without investigation.",
              "v": "danger",
              "fb": "Fair inquiry requires evidence and due process as well as skepticism."
            },
            {
              "t": "He thought mainly government inspectors could identify unreliable research.",
              "v": "wrong",
              "fb": "Scientific communities, institutions, and external investigators all may contribute."
            }
          ]
        },
        {
          "q": "Which condition can allow misconduct to persist?",
          "o": [
            {
              "t": "Crucial data remain controlled by one person and are hard to reproduce.",
              "v": "expert",
              "fb": "Concentrated custody and scarce replication weaken ordinary checks."
            },
            {
              "t": "Several independent teams receive materials and publish complete null results.",
              "v": "wrong",
              "fb": "Independent access makes concealed manipulation harder to sustain."
            },
            {
              "t": "The laboratory archives raw files with immutable dates and operator records.",
              "v": "wrong",
              "fb": "Strong provenance improves the chance that discrepancies can be resolved."
            },
            {
              "t": "Junior researchers can report concerns through protected outside channels.",
              "v": "wrong",
              "fb": "Protected reporting lowers a barrier to detection."
            }
          ]
        },
        {
          "q": "What does due process contribute to a misconduct inquiry?",
          "o": [
            {
              "t": "It tests allegations fairly while preserving and examining the evidence.",
              "v": "expert",
              "fb": "Reliable findings require both serious scrutiny and procedures that avoid prejudgment."
            },
            {
              "t": "It indicates that prestigious investigators keep control of disputed files.",
              "v": "danger",
              "fb": "Evidence custody should not be shaped by the accused person’s status."
            },
            {
              "t": "It converts every undocumented error into proof of deliberate fabrication.",
              "v": "wrong",
              "fb": "Intent must be established rather than inferred automatically from poor records."
            },
            {
              "t": "It postpones all corrective action until the literature has forgotten the claim.",
              "v": "wrong",
              "fb": "Fairness does not require indefinite delay or continued reliance on compromised work."
            }
          ]
        }
      ]
    },
    "fr_schon": {
      "sci": "Jan Hendrik Schön (physicist, fabricated-breakthrough case)",
      "topic": "How faked results collapse",
      "lede": "His cascade of molecular-electronics breakthroughs collapsed when identical noise appeared in experiments that should have differed.",
      "no": 8,
      "profile": "Jan Hendrik Schön was a young physicist at Bell Laboratories whose papers around the turn of the twenty-first century reported extraordinary advances in molecular-scale electronics. He and collaborators described transistors made from organic crystals and single molecules, with results appearing rapidly in leading journals. The work suggested that familiar semiconductor behavior could be reproduced in radically new materials and made Schön a scientific star.\n\nOutside laboratories struggled to reproduce the devices. Suspicion sharpened when researchers noticed that graphs from different papers contained the same patterns of random noise. Noise should reflect the particular fluctuations of a measurement; identical wiggles in experiments described as different materials or conditions indicated that the curves shared a source. Further comparisons found duplicated data presented with altered scales and labels.\n\nBell Labs appointed an independent committee led by Malcolm Beasley. Its 2002 report examined laboratory records, raw data, device samples, and authorship. The committee found evidence of fabrication or falsification in numerous allegations and concluded that Schön bore primary responsibility. Many papers were retracted. The case also exposed weak co-author oversight: senior collaborators had trusted figures they had not independently verified, even though the inquiry did not find them responsible for the fabrication.\n\nThe parallels to the Lindqvist Result are methodological, not proof by analogy. Replication failure alone could mark a difficult experiment. Identical noise or identical bands across purportedly independent measurements changes the problem because accidental experimental variation should not repeat pixel for pixel. Brede must establish the shared source, while Kase determines data custody and who made each figure. The Schön case shows how a breakthrough narrative collapses when the raw evidential chain never existed.",
      "frame": "Brede magnifies the background wiggles, not the headline peaks. “Schön was caught by the part nobody meant readers to admire. Random noise should have its own history.”",
      "q": [
        {
          "q": "What observation sharply intensified suspicion in the Schön case?",
          "o": [
            {
              "t": "Identical noise patterns appeared in supposedly different experiments.",
              "v": "expert",
              "fb": "Random-looking fluctuations should not repeat exactly across independent measurements."
            },
            {
              "t": "His papers used organic crystals instead of conventional silicon devices.",
              "v": "wrong",
              "fb": "Novel materials made the claims exciting, not inherently suspicious."
            },
            {
              "t": "Several experiments required specialized equipment unavailable to most readers.",
              "v": "partial",
              "fb": "Limited access hinders replication but does not establish fabrication."
            },
            {
              "t": "His publication rate exceeded the average for researchers in the field.",
              "v": "partial",
              "fb": "High output can prompt scrutiny, but the duplicated data were concrete evidence."
            }
          ]
        },
        {
          "q": "Why is identical noise especially revealing?",
          "o": [
            {
              "t": "Independent measurements should generate different accidental fluctuations.",
              "v": "expert",
              "fb": "Matching noise suggests reuse of a common data trace rather than separate acquisition."
            },
            {
              "t": "True discoveries generally produce closely smooth curves without any noise.",
              "v": "wrong",
              "fb": "Real measurements commonly contain noise even when the effect is genuine."
            },
            {
              "t": "A copied signal suggests every co-author helped manufacture the dataset.",
              "v": "danger",
              "fb": "Shared data implicate the record, but responsibility must be established separately."
            },
            {
              "t": "Noise has no scientific meaning and may be freely reused as decoration.",
              "v": "wrong",
              "fb": "Noise is part of the measurement and carries provenance information."
            }
          ]
        },
        {
          "q": "What institutional weakness did the Schön case expose?",
          "o": [
            {
              "t": "Co-authors trusted decisive figures without independently checking raw evidence.",
              "v": "expert",
              "fb": "Authorship carries responsibilities that reputation and division of labor do not erase."
            },
            {
              "t": "Outside laboratories reproduced the work too quickly for journals to respond.",
              "v": "wrong",
              "fb": "The major problem was persistent failure to reproduce the reported devices."
            },
            {
              "t": "Editors required authors to preserve every device in a public museum.",
              "v": "wrong",
              "fb": "No such requirement caused the misconduct or its discovery."
            },
            {
              "t": "Bell Labs prohibited an independent committee from examining the allegations.",
              "v": "wrong",
              "fb": "The laboratory commissioned an external investigative committee."
            }
          ]
        }
      ]
    },
    "fr_darsee": {
      "sci": "John Darsee (researcher, fabricated-data case)",
      "topic": "Detecting invented data",
      "lede": "A colleague noticed that weeks of cardiac observations were being written in minutes, opening one of medicine’s largest data audits.",
      "no": 9,
      "profile": "John Darsee was a physician-researcher whose rapid productivity impressed senior cardiologists at Emory University and later Harvard Medical School. He published extensively on heart disease and experimental models. In 1981, colleagues at Harvard observed him labeling records as though they represented weeks of animal experiments when the entries had been produced over a much shorter period. The incident triggered scrutiny of a much larger body of work.\n\nInvestigations by Harvard, the National Institutes of Health, and collaborating institutions uncovered fabricated and unreliable data across numerous studies. Problems included invented observations, impossible pedigrees and timelines, and internal inconsistencies that careful cross-checking exposed. Papers and abstracts were withdrawn or retracted, and the case prompted debate about the responsibilities of supervisors and co-authors who had accepted extraordinary productivity without examining source records closely.\n\nInvented data often carry a different statistical texture from real measurements. Human fabricators may make values too regular, forget biological constraints, or create dates that cannot coexist with staffing and equipment logs. No single tidy sequence proves invention, because real systems can be stable and clerical errors occur. Detection comes from joining internal anomalies with external facts: when animals existed, who performed procedures, how long measurements require, and whether raw records predate the summary.\n\nAuditor Kase has comparable tools. The Lindqvist notebooks claim dense series of runs during periods when access logs show the instrument idle, while summary tables lack corresponding source files. That could reflect delayed transcription, poor archiving, or something worse. Darsee’s case shows how to move beyond intuition: test chronology, sample identity, arithmetic, and physical feasibility together. A fabricated record eventually collides with constraints its inventor did not remember to simulate.",
      "frame": "Kase lays the instrument-access calendar over the notebook dates. “Darsee’s numbers failed when time itself was audited. These entries also claim more work than the room remembers.”",
      "q": [
        {
          "q": "How was Darsee first caught at Harvard?",
          "o": [
            {
              "t": "Colleagues saw long-duration records being created in implausibly little time.",
              "v": "expert",
              "fb": "The observed mismatch between claimed chronology and actual writing triggered the investigation."
            },
            {
              "t": "A journal discovered that every citation in one paper referred to a nonexistent book.",
              "v": "wrong",
              "fb": "The central concerns involved fabricated experimental and clinical data."
            },
            {
              "t": "An automated plagiarism system matched his prose to an older laboratory manual.",
              "v": "wrong",
              "fb": "The case became known for invented data rather than text copying."
            },
            {
              "t": "A rival failed once to reproduce a complicated cardiac procedure overseas.",
              "v": "partial",
              "fb": "Replication concerns matter, but direct observation of false chronology was decisive."
            }
          ]
        },
        {
          "q": "Why are timelines useful for detecting invented data?",
          "o": [
            {
              "t": "Claimed observations must fit equipment, staffing, and biological constraints.",
              "v": "expert",
              "fb": "External schedules can expose records that could not have been produced as stated."
            },
            {
              "t": "Every authentic experiment produces measurements at closely regular intervals.",
              "v": "wrong",
              "fb": "Real experiments often contain irregular timing, delays, and missing observations."
            },
            {
              "t": "A complete calendar suggests that all recorded values are scientifically correct.",
              "v": "partial",
              "fb": "Chronology supports provenance but does not validate measurement accuracy by itself."
            },
            {
              "t": "Any late notebook entry automatically counts as deliberate research fabrication.",
              "v": "danger",
              "fb": "Delayed transcription is poor practice but requires context before inferring intent."
            }
          ]
        },
        {
          "q": "What oversight lesson followed from the Darsee case?",
          "o": [
            {
              "t": "Supervisors and co-authors must inspect source data behind exceptional output.",
              "v": "expert",
              "fb": "Trust does not remove responsibility for the evidential basis of shared publications."
            },
            {
              "t": "Junior researchers should rarely be permitted to record data without a witness.",
              "v": "danger",
              "fb": "Constant witnessing is impractical; proportionate controls and review are needed."
            },
            {
              "t": "High publication productivity is itself sufficient evidence of misconduct.",
              "v": "wrong",
              "fb": "Productivity can prompt questions but cannot establish fabrication."
            },
            {
              "t": "Retraction alone makes review of laboratory supervision unnecessary.",
              "v": "wrong",
              "fb": "Removing papers does not address the oversight failures that allowed them."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "fr_whistle": {
      "fr_lab": "Iida waits beside the silent instrument, one hand on a stack of failed-run sheets. “I followed the published method until the reagents expired,” she says. “The effect never appeared—but those pages never reached the reviewers.”",
      "fr_press": "In the press office, Iida studies a wall-sized cover image from the famous paper. “They announced certainty while we were still troubleshooting,” she says. “After that, every null result became a threat to the institute.”",
      "fr_forensics": "Iida opens a notebook to dates marked in two different inks. “These entries arrived after I asked where the original runs were,” she says. “My own logs were contemporaneous, and they tell another story.”"
    },
    "fr_imaging": {
      "fr_lab": "Brede photographs the instrument display and the cable layout before touching anything. “A forensic comparison starts with an unchanged scene,” he says. “Otherwise your audit creates the discrepancy it hopes to explain.”",
      "fr_press": "Brede holds the glossy publication against a monitor showing the submitted figure file. “The caption says three experiments,” he says. “The layers say one image traveled through three costumes.”",
      "fr_forensics": "Brede drops the opacity of one band over another until every blemish aligns. “Similarity invites suspicion,” he says. “This overlay establishes common origin; now we trace who made the panel.”"
    },
    "fr_investigator": {
      "fr_lab": "Kase checks badge access against the notebook’s claimed overnight runs. “An entry can lie without a false number,” he says. “Sometimes the impossible part is simply that nobody entered the room.”",
      "fr_press": "Kase pulls the reviewer correspondence from a locked drawer. “One referee requested the failed replications,” he says. “The reply said none existed, six weeks after Iida filed them.”",
      "fr_forensics": "Kase arranges notebooks, raw files, and authorship emails into a single chronology. “A dramatic accusation is cheap,” he says. “A defensible finding names the act, the place, and the person who controlled it.”"
    }
  },
  "story": [
    "<b>The Lindqvist Result</b> promised a new class of measurement and arrived with images clean enough for magazine covers. Months later, the apparatus sits quiet while laboratories abroad report only blanks.",
    "Inside the inquiry you may meet <b>Postdoc Iida</b>, who performed the failed runs; <b>Analyst Brede</b>, who can trace a figure back through its pixels; and <b>Auditor Kase</b>, keeper of the notebooks, access logs, and reviewer correspondence.",
    "Prof. Cassian Lund, Dr. Ames, and the institute director each controlled a different part of the story. Two explanations tempt the panel: <b>the breakthrough of the decade</b>, or <b>an honest dead end—just science that failed</b>. Either could end the inquiry before the records are reconciled.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide the <b>WHAT</b> from the evidence."
  ],
  "endings": {
    "overclaimWhat": "fr_breakthrough",
    "dismissalWhat": "fr_deadend",
    "win": {
      "expertTitle": "The Record Reconstructed",
      "expert": [
        "You identify <b>Prof. Cassian Lund</b>, <b>the Notebook & Image-Forensics Room</b>, and <b>fabricated figures & suppressed failed replications</b>. The overlays show one band relabeled across experiments; access logs contradict claimed runs; reviewer correspondence proves that null results existed before Lund denied them. Not the breakthrough of the decade. Not an honest dead end.",
        "Your finding separates evidence from inference. Dr. Ames handled some files but the chronology places final figure control and the decision to bury replications with Lund. The panel orders retractions, preserves the full archive, and opens a separate review of supervisory failures without pretending that every related experiment is false."
      ],
      "soundTitle": "A Supported Finding",
      "sound": [
        "You correctly accuse Prof. Cassian Lund and locate the decisive proof in the Notebook & Image-Forensics Room. The repeated band, missing source runs, and concealed replication reports establish fabricated figures and suppressed failures rather than a genuine breakthrough or routine scientific disappointment.",
        "The panel accepts the finding. Your account leaves some questions about co-author oversight unresolved, but it rests on records strong enough for correction, retraction, and a formal institutional response."
      ],
      "namedTitle": "The Right Accusation",
      "named": [
        "You name Prof. Cassian Lund, the Notebook & Image-Forensics Room, and fabricated figures & suppressed failed replications. The accusation is correct, though your explanation does not fully connect the image provenance, access chronology, and reviewer files.",
        "The inquiry can proceed, but the written decision must reconstruct the proof sequence you only sketched. A correct name is the beginning of accountability, not its complete argument."
      ]
    },
    "overclaim": {
      "title": "A Headline Mistaken for Evidence",
      "body": [
        "You declare the Lindqvist Result the breakthrough of the decade. That conclusion treats selected figures as independent confirmation even though the bands share a digital source and the key runs have no matching raw files.",
        "By defending the spectacular claim, you hand its architects the language of scientific courage and make later correction look like hostility to innovation. The provable case—fabricated figures and buried replications—loses time and credibility while other groups continue chasing an experiment that was never recorded as published."
      ]
    },
    "dismissal": {
      "title": "The Failure You Were Asked to Ignore",
      "body": [
        "You call the affair an honest dead end. Failed replications can be ordinary science, but these failures were withheld, notebook dates conflict with room access, and published panels reuse the same band as separate evidence.",
        "Looking away converts misconduct into mere disappointment. The paper remains in the literature, Iida bears the cost of speaking, and the institute learns that destroyed provenance can be excused as experimental difficulty."
      ]
    },
    "wrongNames": {
      "title": "The Method, Misassigned",
      "body": [
        "You recognize fabricated figures and suppressed failed replications, but attach them to the wrong person or location. The panel cannot sustain responsibility without matching figure custody, notebook chronology, and the point where the concealed files were assembled—"
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"Repeated image bands and a laboratory notebook\"><rect x=\"54\" y=\"28\" width=\"250\" height=\"84\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M76 50 H280 M76 72 H280 M76 94 H280\" stroke=\"#e2e2d8\" stroke-width=\"5\"/><path d=\"M104 50 H142 M174 72 H212 M104 94 H142\" stroke=\"#B3261E\" stroke-width=\"7\"/><rect x=\"374\" y=\"24\" width=\"210\" height=\"92\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M394 46 H560 M394 64 H540 M394 82 H552 M394 100 H514\" stroke=\"#326891\" stroke-width=\"1.4\"/></svg>"
}};
