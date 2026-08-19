module.exports = { PACK: {
  "id": "c_psych",
  "title": "The Mimicry Effect",
  "discipline": "Psychology & Research Method",
  "teaser": "A dazzling result took the field by storm — then no one could repeat it. A brilliant discovery? A fluke worth forgetting? Or numbers that never came from real people?",
  "overclaimTag": "a landmark discovery",
  "truthTag": "fabricated data",
  "venue": "the Mimicry Effect inquiry",
  "agent": {
    "name": "Investigator Dana Pell",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Panel credibility",
  "readingShort": "Psychologists",
  "readingLabel": "Psychology & Method",
  "dossierName": "PSYCHOLOGY & METHOD",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Mimicry Effect inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The place you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "The brighter the result shines in retrospect, the more closely its participant trail should survive ordinary inspection.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "ps_prof",
      "items": [
        {
          "id": "ps_prof",
          "label": "Prof. Adrian Voss — the celebrated lead author"
        },
        {
          "id": "ps_junior",
          "label": "Dr. Kline — a junior co-author"
        },
        {
          "id": "ps_editor",
          "label": "The journal editor"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "ps_dataroom",
      "items": [
        {
          "id": "ps_lab",
          "label": "The Psychology Laboratory"
        },
        {
          "id": "ps_journal",
          "label": "The Journal's Editorial Office"
        },
        {
          "id": "ps_dataroom",
          "label": "The Raw-Data Archive"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "ps_fabricated",
      "items": [
        {
          "id": "ps_landmark",
          "label": "A landmark, field-defining effect"
        },
        {
          "id": "ps_noise",
          "label": "A fragile fluke — just noise, best forgotten"
        },
        {
          "id": "ps_fabricated",
          "label": "Fabricated data behind the famous result"
        }
      ]
    }
  },
  "PLACES": {
    "ps_lab": {
      "name": "The Psychology Laboratory",
      "xy": [
        140,
        90
      ]
    },
    "ps_journal": {
      "name": "The Journal's Editorial Office",
      "xy": [
        330,
        240
      ]
    },
    "ps_dataroom": {
      "name": "The Raw-Data Archive",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "ps_lab",
      "ps_journal"
    ],
    [
      "ps_journal",
      "ps_dataroom"
    ]
  ],
  "CHARACTERS": {
    "ps_grad": {
      "name": "Grad Student Rhee",
      "role": "Doctoral student",
      "face": "🎓",
      "badge": "R",
      "legend": "the laboratory",
      "hint": "Ran the follow-up studies; the 'raw' data are too clean to have come from real subjects."
    },
    "ps_auditor": {
      "name": "Data Auditor Sol",
      "role": "Statistical auditor",
      "face": "📊",
      "badge": "S",
      "legend": "the data archive",
      "hint": "Re-checks the numbers; the summary statistics are impossible for the sample sizes claimed."
    },
    "ps_replicator": {
      "name": "Dr. Ives",
      "role": "Replication-team lead",
      "face": "🔁",
      "badge": "I",
      "legend": "the editorial office",
      "hint": "Led the multi-lab replication; the effect vanishes every time it is run honestly."
    }
  },
  "TOPICMAP": {
    "ps_lab": {
      "ps_grad": [
        "ps_wundt"
      ],
      "ps_auditor": [
        "ps_galton"
      ],
      "ps_replicator": [
        "ps_fisher"
      ]
    },
    "ps_journal": {
      "ps_grad": [
        "ps_meehl"
      ],
      "ps_auditor": [
        "ps_tversky"
      ],
      "ps_replicator": [
        "ps_ioannidis"
      ]
    },
    "ps_dataroom": {
      "ps_grad": [
        "ps_simonsohn"
      ],
      "ps_auditor": [
        "ps_greenwald"
      ],
      "ps_replicator": [
        "ps_stapel"
      ]
    }
  },
  "TOPICS": {
    "ps_wundt": {
      "sci": "Wilhelm Wundt (1832–1920)",
      "topic": "The first experimental psychology laboratory",
      "lede": "The physiologist who turned attention, reaction time, and sensation into events that could be timed and repeated.",
      "no": 1,
      "profile": "Wilhelm Wundt helped establish psychology as an experimental discipline rather than a branch of speculative philosophy. Trained in medicine and physiology, he worked with Hermann von Helmholtz before building his own program around the measurable relation between stimulation and conscious experience. In 1879 at the University of Leipzig, he established the laboratory conventionally recognized as the first formal institute devoted to experimental psychology.\n\nWundt’s laboratory did not study every part of mind. It concentrated on processes that could be presented under controlled conditions: reaction time, sensory discrimination, attention, and the timing of simple decisions. Participants were often highly practiced observers. They reported immediate experience under standardized procedures, a method quite different from casual introspection about one’s personality or memories. Instruments controlled sound, light, and intervals, while repeated trials exposed variation that a single striking response would conceal.\n\nThe Leipzig laboratory also trained researchers who carried experimental methods into other countries. Wundt distinguished this work from the study of language, culture, and social life, which he believed required historical and comparative approaches. That boundary matters: a laboratory can sharpen a narrow question without making every psychological claim experimentally tractable. His achievement was institutional as much as theoretical—a room, apparatus, procedures, records, and a community able to inspect how an observation was produced.\n\nIn the Mimicry Effect inquiry, Wundt’s lesson begins below the published average. Real participants hesitate, misunderstand, tire, and vary across trials. A claimed effect should therefore leave a plausible trail of stimulus timings, individual responses, exclusions, and mistakes. A celebrated graph is not enough, but failed replications alone do not prove fraud. The raw sequence must look like human behavior generated by the stated procedure.",
      "frame": "Rhee taps the old reaction timer beside a stack of participant sheets. “Wundt made psychology answer to apparatus and repeated trials. Show me what a real session should leave behind.”",
      "q": [
        {
          "q": "What made Wundt’s Leipzig laboratory historically distinctive?",
          "o": [
            {
              "t": "It organized psychology around controlled experiments and dedicated apparatus.",
              "v": "expert",
              "fb": "The institute gave experimental psychology a stable place, procedure, and training program."
            },
            {
              "t": "It proved that every mental process could be reduced to one reflex.",
              "v": "danger",
              "fb": "Wundt limited laboratory claims and treated culture and language differently."
            },
            {
              "t": "It replaced repeated trials with unrestricted personal autobiography.",
              "v": "wrong",
              "fb": "His trained observations occurred under controlled, repeatable conditions."
            },
            {
              "t": "It was the first hospital to treat psychiatric illness with medication.",
              "v": "wrong",
              "fb": "The Leipzig institute focused on experimental psychology, not clinical drug treatment."
            }
          ]
        },
        {
          "q": "Why were repeated trials central to early experimental psychology?",
          "o": [
            {
              "t": "They revealed response patterns and variability beyond a single observation.",
              "v": "expert",
              "fb": "Replication within a session separates stable tendencies from momentary fluctuation."
            },
            {
              "t": "They guaranteed that practiced observers would eventually give identical answers.",
              "v": "danger",
              "fb": "Practice can reduce some noise, but human responses never become perfectly identical."
            },
            {
              "t": "They allowed investigators to discard every response that challenged a theory.",
              "v": "wrong",
              "fb": "Exclusions require stated rules rather than selective removal of inconvenient trials."
            },
            {
              "t": "They made documentation unnecessary once the average reaction time was known.",
              "v": "wrong",
              "fb": "The trial record is needed to evaluate how the average was produced."
            }
          ]
        },
        {
          "q": "Which raw-data pattern would best fit genuine reaction-time sessions?",
          "o": [
            {
              "t": "Variable responses, occasional errors, and timestamps tied to actual trials.",
              "v": "expert",
              "fb": "Human performance produces structured variation rather than flawless repeated values."
            },
            {
              "t": "Every participant giving the same latency to the exact millisecond.",
              "v": "danger",
              "fb": "Such uniformity would be biologically implausible and demands forensic scrutiny."
            },
            {
              "t": "mainly group means, with all participant-level observations permanently absent.",
              "v": "partial",
              "fb": "Means can summarize data but cannot establish that the underlying sessions occurred."
            },
            {
              "t": "A smooth curve reconstructed later without stimulus or session identifiers.",
              "v": "wrong",
              "fb": "A retrospective curve lacks the provenance needed to verify the experiment."
            }
          ]
        }
      ]
    },
    "ps_galton": {
      "sci": "Francis Galton (1822–1911)",
      "topic": "Correlation & the measurement of mind",
      "lede": "He built instruments to measure human differences, then drew lessons both statistically fertile and morally disastrous.",
      "no": 2,
      "profile": "Francis Galton pursued the quantitative study of human variation across sensory, physical, and mental traits. A Victorian polymath and cousin of Charles Darwin, he established an anthropometric laboratory in London where thousands of visitors paid to have grip strength, reaction time, height, hearing, and other characteristics measured. The enterprise helped normalize large collections of person-level data and the search for relationships among variables.\n\nStudying heredity and family resemblance, Galton developed ideas that fed into regression and correlation. He noticed that exceptionally tall parents tended to have children closer to the population average, a pattern he described as regression toward mediocrity, now called regression to the mean. He also used graphical methods to examine how two measurements varied together. Later statisticians, especially Karl Pearson, formalized these ideas.\n\nGalton’s scientific legacy cannot be separated from eugenics, a term he coined and a movement he promoted. He sought to rank people and encourage reproduction by those he considered superior. Those assumptions were scientifically crude and ethically destructive, contributing to coercive policies and racial hierarchies. Measurement is not neutral when investigators choose biased categories, treat social outcomes as biological worth, or turn a population association into a judgment about individuals.\n\nThe Mimicry data require the useful part of Galton’s discipline without his determinism. A correlation summarizes how two variables co-vary; it does not prove that one causes the other or that every person follows the trend. Real participant clouds contain scatter, ties, and outliers. A dataset engineered so that every score falls neatly along the published line is not stronger evidence—it may be evidence that the messy people were replaced by arithmetic.",
      "frame": "Sol draws a scatterplot, then circles the points that line up too obediently. “Galton helped make variation visible. He also showed, by his gravest errors, how measurement can outrun judgment.”",
      "q": [
        {
          "q": "What is regression to the mean?",
          "o": [
            {
              "t": "Extreme observations tend to be followed by values nearer the average.",
              "v": "expert",
              "fb": "The pattern can arise from imperfect correlation without any corrective force."
            },
            {
              "t": "Every person inevitably becomes average after enough repeated testing. too",
              "v": "danger",
              "fb": "Regression is a statistical tendency, not a law erasing individual differences."
            },
            {
              "t": "Researchers should replace extreme scores with the sample mean.",
              "v": "wrong",
              "fb": "Altering observed values would destroy rather than explain the data."
            },
            {
              "t": "A strong correlation suggests two variables share one biological cause.",
              "v": "wrong",
              "fb": "Correlation alone cannot establish a common causal mechanism."
            }
          ]
        },
        {
          "q": "What does a correlation describe?",
          "o": [
            {
              "t": "The direction and strength of association between measured variables.",
              "v": "expert",
              "fb": "Correlation summarizes co-variation but does not by itself identify causation."
            },
            {
              "t": "The certainty that changing one variable will change the other.",
              "v": "danger",
              "fb": "Causal claims need design and assumptions beyond association."
            },
            {
              "t": "The percentage of participants whose scores are scientifically valid.",
              "v": "wrong",
              "fb": "Validity is not encoded by a correlation coefficient."
            },
            {
              "t": "The difference between two group means after all outliers are removed.",
              "v": "wrong",
              "fb": "That is a different calculation and removals require justification."
            }
          ]
        },
        {
          "q": "Why is an unnaturally perfect scatterplot suspicious?",
          "o": [
            {
              "t": "Human measurements normally contain error, heterogeneity, and imperfect association.",
              "v": "expert",
              "fb": "Exceptional regularity should be checked against instrument precision and raw records."
            },
            {
              "t": "Any correlation above zero suggests that an investigator fabricated observations.",
              "v": "danger",
              "fb": "Strong genuine associations exist, so perfection is a clue rather than a verdict."
            },
            {
              "t": "Psychological variables does not have any reproducible relation to one another.",
              "v": "wrong",
              "fb": "Many psychological associations are real even when they are not exact."
            },
            {
              "t": "Outliers are required in every sample at a fixed numerical percentage. too too",
              "v": "wrong",
              "fb": "Variation is expected, but no universal outlier quota exists."
            }
          ]
        }
      ]
    },
    "ps_fisher": {
      "sci": "Ronald A. Fisher (1890–1962)",
      "topic": "Significance testing & experimental design",
      "lede": "He joined randomization, experimental design, and significance tests into a system for learning from noisy variation.",
      "no": 3,
      "profile": "Ronald A. Fisher transformed experimental statistics while working at Rothamsted Experimental Station and later at University College London and Cambridge. Agricultural field trials confronted him with variation in soil, weather, and crop response that could not be wished away. He developed analysis of variance, likelihood methods, and principles of experimental design that influenced research far beyond agriculture.\n\nRandomization was crucial. Assigning treatments by chance protects comparisons from systematic differences that investigators know about and from some they do not. Replication estimates variability, while blocking groups similar experimental units so treatment contrasts are not drowned by known gradients. Together these design choices make uncertainty interpretable rather than merely decorative after the results appear.\n\nFisher also popularized significance testing through the p-value: under a specified null model, the probability of obtaining data at least as incompatible with that model as the observations. A small p-value is not the probability that the null hypothesis is true, not the probability that the findings will replicate, and not proof of a large or important effect. Fisher’s own framework was more flexible than the mechanical pass/fail ritual later built around 0.05.\n\nFor the Mimicry Effect, Ives asks whether assignment was genuinely randomized, whether exclusions were chosen before outcomes were seen, and whether the analysis matches the design. Flexible analysis can turn noisy real data into a fragile significant result. Yet fabricated data pose a different problem: their p-values may be internally perfect because the rows were constructed backward from a desired conclusion. Experimental design explains what evidence should exist before the calculation; an audit tests whether it does.",
      "frame": "Ives shuffles condition cards in front of the empty testing booths. “Randomization is a procedure, not a word in the methods section. Tell me what evidence it ought to leave.”",
      "q": [
        {
          "q": "What is the main purpose of random assignment?",
          "o": [
            {
              "t": "To make treatment groups comparable without choosing who receives each condition.",
              "v": "expert",
              "fb": "Chance assignment limits systematic allocation bias and supports causal comparison."
            },
            {
              "t": "To indicates equal outcomes and identical participant characteristics.",
              "v": "danger",
              "fb": "Randomization balances in expectation, not perfectly in every sample."
            },
            {
              "t": "To ensure the final p-value falls below the chosen threshold; in use.",
              "v": "wrong",
              "fb": "Assignment protects design; it does not guarantee statistical significance."
            },
            {
              "t": "To let researchers change conditions after observing early responses. too.",
              "v": "wrong",
              "fb": "Outcome-driven reassignment would defeat randomization."
            }
          ]
        },
        {
          "q": "What does a p-value represent in Fisherian testing?",
          "o": [
            {
              "t": "A tail probability for data under a specified null model. too",
              "v": "expert",
              "fb": "It measures incompatibility with the null assumptions, not the truth probability of a hypothesis."
            },
            {
              "t": "The probability that the null hypothesis is true after seeing the data.",
              "v": "danger",
              "fb": "That posterior probability requires additional assumptions and is not a p-value."
            },
            {
              "t": "The chance that an independent replication will produce the same result.",
              "v": "wrong",
              "fb": "Replication probability depends on effect size, design, and uncertainty."
            },
            {
              "t": "The percentage of observations collected without measurement error.",
              "v": "wrong",
              "fb": "Data quality is not summarized by the p-value."
            }
          ]
        },
        {
          "q": "Which record most directly supports genuine randomization?",
          "o": [
            {
              "t": "A time-stamped assignment sequence linked to enrolled participants.",
              "v": "expert",
              "fb": "The allocation trail can be checked against session order and condition counts."
            },
            {
              "t": "A methods sentence stating that participants were randomly assigned.",
              "v": "partial",
              "fb": "The statement matters, but the underlying sequence provides stronger verification."
            },
            {
              "t": "Final groups whose means differ in the theoretically predicted direction.",
              "v": "danger",
              "fb": "Desired outcomes do not demonstrate how assignments were made."
            },
            {
              "t": "A spreadsheet reordered after analysis so conditions alternate neatly.",
              "v": "wrong",
              "fb": "Post hoc ordering cannot establish the original allocation process."
            }
          ]
        }
      ]
    },
    "ps_meehl": {
      "sci": "Paul Meehl (1920–2003)",
      "topic": "Clinical versus statistical prediction",
      "lede": "He pitted expert intuition against simple prediction rules and repeatedly found that consistency could beat confidence.",
      "no": 4,
      "profile": "Paul Meehl changed psychology by asking a practical comparative question: when clinicians and statistical formulas make the same prediction, which performs better? In his 1954 book Clinical Versus Statistical Prediction, he reviewed studies in which professional judgment was compared with mechanical rules that combined measured variables in a fixed way.\n\nMeehl found that actuarial or statistical methods usually matched or outperformed unaided clinical judgment. A formula can be crude, but it applies the same weights every time. Human judges notice nuance, yet they also vary with mood, memorable cases, expectations, and inconsistent weighting. Meehl did not argue that clinicians were useless. Experts choose variables, gather information, identify exceptional circumstances, and decide what outcomes matter. His point was that discretionary combination often performs worse than a transparent rule.\n\nHe later became a fierce critic of weak theory and ritual significance testing in psychology. In fields with many correlated variables and large samples, almost any null hypothesis of exactly zero is likely to be false. Collecting a significant association without a risky numerical prediction therefore offers little theoretical progress. Strong science should expose a theory to outcomes it could genuinely fail.\n\nRhee sees the same problem in the journal’s response to the Mimicry Effect. Editors trusted Voss’s reputation and an elegant narrative over mundane predictive checks. A legitimate participant dataset should let a fixed analysis reproduce every reported summary and should perform sensibly on held-out cases. An explanation improvised after each discrepancy can protect either a brilliant discovery or an innocent fluke forever. Meehl’s discipline is to write the rule down, test it prospectively, and count when it loses.",
      "frame": "Rhee sets the editor’s enthusiastic notes beside a blind reanalysis. “Meehl distrusted judgment that changes its weights after every surprise. This inquiry needs a rule that can fail.”",
      "q": [
        {
          "q": "What did Meehl find about clinical versus statistical prediction?",
          "o": [
            {
              "t": "Fixed statistical rules often matched or beat unaided professional judgment.",
              "v": "expert",
              "fb": "Consistency can outperform flexible intuition even when experts select useful inputs."
            },
            {
              "t": "Clinicians generally predicted closely once given enough biographical detail.",
              "v": "danger",
              "fb": "More detail can increase confidence without improving predictive accuracy."
            },
            {
              "t": "Mechanical rules were valuable mainly when they used no human-chosen variables.",
              "v": "wrong",
              "fb": "Experts still help define variables, outcomes, and exceptional cases."
            },
            {
              "t": "Prediction accuracy does not be compared because every case is substantially unique.",
              "v": "wrong",
              "fb": "Meehl’s work depended on evaluating predictions against observed outcomes."
            }
          ]
        },
        {
          "q": "Why can a simple rule outperform an expert?",
          "o": [
            {
              "t": "It applies the same weights consistently and avoids case-by-case drift.",
              "v": "expert",
              "fb": "Stable combination limits noise from changing impressions and memorable examples."
            },
            {
              "t": "It automatically discovers the true causal theory behind every association.",
              "v": "wrong",
              "fb": "Prediction can improve without revealing a complete causal explanation."
            },
            {
              "t": "It removes all measurement error from the variables entered into it.",
              "v": "wrong",
              "fb": "A formula cannot improve the quality of faulty inputs by itself."
            },
            {
              "t": "It indicates fairness because numerical procedures contain no human choices.",
              "v": "danger",
              "fb": "Variables, samples, and objectives still reflect human decisions."
            }
          ]
        },
        {
          "q": "Which test best follows Meehl’s methodological advice?",
          "o": [
            {
              "t": "Specify the analysis first and assess it on data not used to tune it.",
              "v": "expert",
              "fb": "Prospective, out-of-sample tests expose a rule to genuine failure."
            },
            {
              "t": "Revise the prediction after each mismatch until every case is explained.",
              "v": "danger",
              "fb": "Unlimited adjustment turns failure into retrospective storytelling."
            },
            {
              "t": "Accept the lead author’s interpretation because expertise is hard to quantify.",
              "v": "wrong",
              "fb": "Authority should not substitute for comparative predictive performance."
            },
            {
              "t": "Declare the theory false whenever one participant behaves unexpectedly.",
              "v": "partial",
              "fb": "A risky theory must allow errors while making aggregate predictions."
            }
          ]
        }
      ]
    },
    "ps_tversky": {
      "sci": "Amos Tversky (1937–1996)",
      "topic": "Judgment under uncertainty",
      "lede": "He designed spare little problems that exposed how probability judgment bends under framing, resemblance, and memory.",
      "no": 5,
      "profile": "Amos Tversky used mathematically precise experiments to study how people make choices and judgments under uncertainty. With Daniel Kahneman, he showed that intuitive answers often depart from probability theory in regular, interpretable ways. The work did not portray people as simply irrational; it identified the shortcuts that make difficult judgments manageable and the conditions under which those shortcuts mislead.\n\nThe representativeness heuristic leads people to judge probability by resemblance to a stereotype, sometimes ignoring base rates or sample size. The availability heuristic makes events easier to recall feel more frequent or likely. Anchoring pulls estimates toward an initial number even when that starting point is arbitrary. Their famous conjunction experiments showed that a detailed combination can feel more plausible than one of its components, although the conjunction cannot be more probable under the laws of probability.\n\nTversky also studied framing and preference. Equivalent options described as gains or losses can elicit different choices. These results undermined the assumption that preferences are always stable and merely revealed by a question. Small changes in description can help construct the response itself.\n\nSol applies this work to evidence rather than consumer choice. The label ‘landmark effect’ makes the result representative of scientific brilliance; ‘replication crisis’ makes every anomaly available as evidence of fraud. The conjunction of an exciting theory, a famous author, and a clean graph may feel stronger than the graph alone, but detail is not probability. Tversky would demand explicit alternatives and numerical consistency. The impossible summaries in Voss’s archive matter because they violate arithmetic, not because they fit a familiar villain story.",
      "frame": "Sol removes the words “landmark” and “scandal” from two otherwise identical summaries. “Tversky taught that description alters judgment. The arithmetic must survive either label.”",
      "q": [
        {
          "q": "What is the representativeness heuristic?",
          "o": [
            {
              "t": "Judging likelihood by resemblance while sometimes neglecting base rates.",
              "v": "expert",
              "fb": "Similarity can dominate relevant statistical information."
            },
            {
              "t": "Choosing the option whose numerical probability is generally greatest.",
              "v": "wrong",
              "fb": "The heuristic can pull judgment away from probability rules."
            },
            {
              "t": "Remembering mainly observations that were entered most recently. too.",
              "v": "partial",
              "fb": "Recency can matter, but representativeness concerns resemblance to a model or stereotype."
            },
            {
              "t": "Fabricating a sample so its members resemble the predicted result.",
              "v": "danger",
              "fb": "That would be misconduct, not a cognitive heuristic."
            }
          ]
        },
        {
          "q": "What is the conjunction fallacy?",
          "o": [
            {
              "t": "Treating a combined event as more probable than one of its parts.",
              "v": "expert",
              "fb": "A conjunction cannot exceed the probability of either component."
            },
            {
              "t": "Assuming two independent studies would produce identical sample means.",
              "v": "wrong",
              "fb": "Independent estimates naturally vary across samples."
            },
            {
              "t": "Combining datasets before checking whether their measures are compatible.",
              "v": "partial",
              "fb": "That can be a methodological error, but it is not the classic fallacy."
            },
            {
              "t": "Concluding that any detailed scientific explanation is necessarily false.",
              "v": "danger",
              "fb": "Detail can be correct; the fallacy concerns probability ordering."
            }
          ]
        },
        {
          "q": "How can framing affect this inquiry?",
          "o": [
            {
              "t": "Calling the result a landmark or a scandal can shift judgment before analysis.",
              "v": "expert",
              "fb": "Evaluators should compare the same evidence under neutral descriptions."
            },
            {
              "t": "It changes the underlying participant records stored in the archive. too",
              "v": "wrong",
              "fb": "Words influence interpretation, not the historical data values themselves."
            },
            {
              "t": "It makes arithmetic impossibilities acceptable when the narrative is coherent. too",
              "v": "danger",
              "fb": "No framing can repair inconsistent summaries or nonexistent rows."
            },
            {
              "t": "It suggests that every reviewer who liked the paper acted dishonestly. too",
              "v": "wrong",
              "fb": "Bias can occur without intent or misconduct."
            }
          ]
        }
      ]
    },
    "ps_ioannidis": {
      "sci": "John Ioannidis (b. 1965)",
      "topic": "Why most published findings may be false",
      "lede": "He used probability and research incentives to explain why a published claim can be significant yet still be unlikely to hold.",
      "no": 6,
      "profile": "John Ioannidis brought wide attention to the reliability of published research with his 2005 essay ‘Why Most Published Research Findings Are False.’ The title was deliberately stark, but the argument was conditional rather than a count of all papers. Using a simple probabilistic framework, he showed how low prior plausibility, small studies, flexible analyses, bias, and many competing teams can make a statistically significant claim more likely to be false than researchers assume.\n\nThe positive predictive value of a finding depends not only on a p-value. It also depends on how many tested hypotheses are genuinely true, the power of the studies, and the extent of bias or selective reporting. In a field testing many speculative ideas with weak designs, even a conventional false-positive rate can produce a literature crowded with apparent discoveries. Larger, preregistered, well-powered, independently replicated studies improve the odds.\n\nIoannidis’s work has sometimes been flattened into ‘science is wrong.’ That is the opposite of its purpose. Reliability varies by design, field, question, and evidence chain. A false published conclusion can result from sampling variation, bias, poor methods, or misconduct; the framework does not identify which mechanism produced an individual paper.\n\nIves uses that distinction here. The Mimicry Effect emerged from a crowded search space, small samples, and a publication system hungry for surprising social effects, so an initial false positive was always plausible. But the archive introduces a case-specific claim: participant-level values do not generate the reported summaries. Ioannidis helps explain why reviewers should have demanded stronger evidence. He does not permit the panel to jump from a low predictive value to an accusation against Voss without reconstructing the data trail.",
      "frame": "Ives writes “false claim ≠ fabricated data” on the journal’s decision letter. “Ioannidis tells us why publication is weak proof. He does not tell us who made these rows.”",
      "q": [
        {
          "q": "What factors can lower a finding’s positive predictive value?",
          "o": [
            {
              "t": "Low prior odds, weak power, bias, and many tested hypotheses.",
              "v": "expert",
              "fb": "A small p-value is only one part of the reliability calculation."
            },
            {
              "t": "Large samples, preregistration, and successful independent replication.",
              "v": "wrong",
              "fb": "Those features generally strengthen rather than weaken reliability."
            },
            {
              "t": "Any use of numerical analysis in a field studying human behavior.",
              "v": "danger",
              "fb": "Quantitative methods vary in quality and are not inherently unreliable."
            },
            {
              "t": "Publishing a result in a journal with a selective review process.",
              "v": "partial",
              "fb": "Prestige does not guarantee truth, but selectivity alone is not the full framework."
            }
          ]
        },
        {
          "q": "Does a false published finding imply fabrication?",
          "o": [
            {
              "t": "No; chance, bias, design flaws, or misconduct can each produce false claims.",
              "v": "expert",
              "fb": "Determining fabrication requires evidence about how the data were generated."
            },
            {
              "t": "Yes; every incorrect conclusion originates in invented participant records.",
              "v": "danger",
              "fb": "Most scientific errors are not findings of deliberate fabrication."
            },
            {
              "t": "No; publication makes misconduct logically implausible even when data vanish.",
              "v": "wrong",
              "fb": "Published work can still contain honest error or misconduct."
            },
            {
              "t": "Yes, but mainly when later studies estimate a smaller effect size.",
              "v": "wrong",
              "fb": "Heterogeneity and sampling error can change estimates without fabrication."
            }
          ]
        },
        {
          "q": "Which reform most directly improves evidential reliability?",
          "o": [
            {
              "t": "Preregistered, adequately powered tests with independent replication.",
              "v": "expert",
              "fb": "These practices limit flexibility and provide stronger opportunities for correction."
            },
            {
              "t": "Treating the first significant result as the permanent benchmark.",
              "v": "wrong",
              "fb": "Early estimates are often unstable and should be updated."
            },
            {
              "t": "Publishing mainly surprising outcomes to conserve journal space.",
              "v": "danger",
              "fb": "Novelty filtering intensifies selection bias."
            },
            {
              "t": "Replacing raw-data review with the reputation of the research team.",
              "v": "wrong",
              "fb": "Authority cannot substitute for inspectable evidence."
            }
          ]
        }
      ]
    },
    "ps_simonsohn": {
      "sci": "Uri Simonsohn (behavioral scientist, p-curve method)",
      "topic": "Detecting p-hacking in results",
      "lede": "He learned to read a literature’s p-values as a distribution, looking for the fingerprints of selective analysis.",
      "no": 7,
      "profile": "Uri Simonsohn is a behavioral scientist whose meta-scientific work examines how flexible analysis and selective reporting can distort published evidence. With Leif Nelson and Joseph Simmons, he demonstrated ‘researcher degrees of freedom’: defensible-looking choices about sample size, outcomes, covariates, exclusions, and stopping can greatly increase the chance of finding a publishable result if those choices are made after seeing the data.\n\nSimonsohn and colleagues developed p-curve, a method that examines the distribution of statistically significant p-values from a set of studies. If studies investigate a real effect with reasonable power, significant p-values should generally be right-skewed, with more very small values than values just below .05. A concentration immediately below .05 may suggest selective reporting or analysis. A flat or oddly shaped curve can indicate little evidential value, depending on assumptions and study selection.\n\nP-curve is not a fraud detector for individual authors. Its conclusions depend on collecting comparable tests, avoiding dependent or cherry-picked results, and interpreting the distribution in light of power and publication processes. Selective analysis can occur through motivated reasoning without invented participants. Conversely, a fabricator could manufacture p-values that look convincingly distributed if the method were anticipated.\n\nRhee therefore uses p-curve to understand the Mimicry literature, not to convict Voss. The suspicious pileup of barely significant results suggests that analytic flexibility may have shaped what reached print. The raw-data anomaly is different: exact group summaries cannot be produced from the archived integer responses, and session files are absent. Simonsohn teaches the panel to separate a biased literature-level pattern from direct evidence that one dataset lacks a plausible origin.",
      "frame": "Rhee sorts published p-values into narrow bins. “This can show a literature leaning on the threshold. It cannot tell me who typed a participant row that never existed.”",
      "q": [
        {
          "q": "What pattern gives a p-curve evidential value?",
          "o": [
            {
              "t": "More very small significant p-values than values clustered just below.05.",
              "v": "expert",
              "fb": "Real effects with adequate power tend to produce a right-skewed significant distribution."
            },
            {
              "t": "Every included study reporting exactly the same p-value; in use.",
              "v": "danger",
              "fb": "Identical values would be unusual and are not the expected signature of evidence."
            },
            {
              "t": "An equal number of significant and nonsignificant studies in every journal.",
              "v": "wrong",
              "fb": "P-curve typically analyzes selected significant tests rather than all outcomes."
            },
            {
              "t": "A single p-value below.05 from the most prestigious laboratory.",
              "v": "wrong",
              "fb": "The method relies on a distribution of comparable tests, not authority."
            }
          ]
        },
        {
          "q": "What are researcher degrees of freedom?",
          "o": [
            {
              "t": "Flexible analytic choices that can be selected after viewing outcomes.",
              "v": "expert",
              "fb": "Outcome-dependent choices inflate false positives even when each choice seems defensible."
            },
            {
              "t": "Legal protections allowing investigators to withhold all research records.",
              "v": "wrong",
              "fb": "The term concerns analysis flexibility, not legal privilege."
            },
            {
              "t": "The number of participants free to leave an experiment at any time.",
              "v": "wrong",
              "fb": "Voluntary participation is ethical consent, not the statistical concept."
            },
            {
              "t": "Proof that every significant psychology result was deliberately manipulated.",
              "v": "danger",
              "fb": "Flexibility raises risk but does not establish intent or universal invalidity."
            }
          ]
        },
        {
          "q": "Can p-curve prove Voss fabricated participant data?",
          "o": [
            {
              "t": "No; it diagnoses result patterns, while fabrication needs case-specific provenance.",
              "v": "expert",
              "fb": "A literature-level distribution cannot identify who created an individual record."
            },
            {
              "t": "Yes; any pileup near.05 uniquely identifies invented observations. too.",
              "v": "danger",
              "fb": "Selective analysis, publication bias, and low power can create similar patterns."
            },
            {
              "t": "No; statistical tools can rarely contribute to a misconduct inquiry. too.",
              "v": "wrong",
              "fb": "Statistics can reveal anomalies when combined with documentary evidence."
            },
            {
              "t": "Yes, provided the published article has received enough citations. here.",
              "v": "wrong",
              "fb": "Citation count does not convert p-curve into an authorship test."
            }
          ]
        }
      ]
    },
    "ps_greenwald": {
      "sci": "Anthony Greenwald (b. 1939)",
      "topic": "Implicit measures & the replication debate",
      "lede": "He helped build a reaction-time measure of automatic association, then spent decades defining what that measure can and cannot claim.",
      "no": 8,
      "profile": "Anthony Greenwald is a social psychologist whose work has ranged from self and memory to implicit cognition. With Debbie McGhee and Jordan Schwartz, he introduced the Implicit Association Test, or IAT, in 1998. The task compares how quickly people categorize paired concepts—for example, flowers with pleasant words versus insects with pleasant words—under different key assignments.\n\nThe IAT measures relative association strength: performance depends on the contrast between categories and attributes in that particular task. It is not a direct meter of a hidden essence, and an individual score can be influenced by order, familiarity, context, and measurement error. Average differences across groups can be reliable even when person-level test–retest stability or prediction of a particular behavior is modest. Interpretation therefore requires matching the claim to the level and reliability of the measurement.\n\nThe IAT became enormously visible and controversial. Researchers have debated what constructs it captures, how strongly it predicts behavior, whether it should be used for individual diagnosis, and how interventions change scores. Greenwald and colleagues have continued to refine scoring and assess validity rather than treating the first version as beyond revision. That history shows how a real, replicable task can support narrower conclusions than popular summaries imply.\n\nSol applies that distinction to the Mimicry Effect. A weak relationship between an implicit measure and one behavior could reflect noisy measurement, context, or an overstated theory. It would not make the raw participants imaginary. Here, however, the supposedly millisecond-level response files contain repeated blocks with identical timing jitter and no device metadata. Greenwald’s work teaches restraint about psychological interpretation while leaving room for firm conclusions about whether a measurement stream is technically plausible.",
      "frame": "Sol magnifies two blocks of reaction times until their last digits align. “An implicit measure can be noisy and still real. These files are not noisy in a way any keyboard produces.”",
      "q": [
        {
          "q": "What does the IAT measure most directly?",
          "o": [
            {
              "t": "Relative association strength inferred from differences in categorization speed.",
              "v": "expert",
              "fb": "The score compares performance across paired category arrangements."
            },
            {
              "t": "A permanent unconscious trait independent of task and social context.",
              "v": "danger",
              "fb": "Scores are relative and influenced by measurement conditions."
            },
            {
              "t": "A person’s guaranteed behavior in every future real-world situation.",
              "v": "wrong",
              "fb": "Prediction is probabilistic and generally modest at the individual level."
            },
            {
              "t": "The moral worth of a participant based on one reaction-time session.",
              "v": "wrong",
              "fb": "A psychological measure cannot support that ethical judgment."
            }
          ]
        },
        {
          "q": "Why can group reliability and individual diagnosis differ?",
          "o": [
            {
              "t": "Stable average differences can coexist with noisy person-level scores.",
              "v": "expert",
              "fb": "Measurement error has larger consequences when classifying one individual."
            },
            {
              "t": "Groups have no variation, while every individual response is random.",
              "v": "wrong",
              "fb": "Groups contain variation and individual scores can carry some information."
            },
            {
              "t": "Any significant group mean suggests each member has the same association.",
              "v": "danger",
              "fb": "A group estimate does not determine every person’s score."
            },
            {
              "t": "Individual diagnosis becomes valid whenever a task is widely discussed.",
              "v": "wrong",
              "fb": "Visibility does not establish reliability or validity."
            }
          ]
        },
        {
          "q": "What makes the archived timing blocks technically suspicious?",
          "o": [
            {
              "t": "Identical jitter patterns recur without the device metadata expected from sessions.",
              "v": "expert",
              "fb": "Copied timing structure and missing acquisition traces challenge the files’ provenance."
            },
            {
              "t": "Reaction times vary across participants and include occasional slow trials.",
              "v": "wrong",
              "fb": "That is an ordinary feature of human performance."
            },
            {
              "t": "The mean effect is smaller than the estimate in the published article. too.",
              "v": "partial",
              "fb": "A discrepancy merits checking but may arise through analysis or sampling."
            },
            {
              "t": "Some individual scores change when task order is reversed. for this case.",
              "v": "wrong",
              "fb": "Order effects are known and do not imply invented data."
            }
          ]
        }
      ]
    },
    "ps_stapel": {
      "sci": "Diederik Stapel (social psychologist, fabricated-data case)",
      "topic": "How fabricated datasets were exposed",
      "lede": "His students kept receiving polished datasets without seeing participants—until the elegance of the numbers became evidence against them.",
      "no": 9,
      "profile": "Diederik Stapel was a prominent Dutch social psychologist whose career collapsed after junior researchers raised concerns about data he supplied. Stapel often claimed to collect data through schools or other outside settings, then gave collaborators completed spreadsheets for analysis. Students and co-authors did not necessarily see recruitment, consent, questionnaires, or data entry because the fieldwork was said to occur elsewhere.\n\nIn 2011, whistleblowers at Tilburg University brought suspicious patterns to department leaders. Investigations by multiple Dutch universities concluded that Stapel had fabricated data across many publications and projects. Reports described implausibly neat results, repeated patterns, and datasets created to fit hypotheses. Dozens of papers were eventually retracted. The scale was enabled by centralized control: collaborators could work honestly on analyses and manuscripts while the claimed observations remained inaccessible.\n\nThe case is not a simple story that statistics automatically catch fraud. Fabricated data can look noisy, and genuine data can contain duplicates or strange distributions. The strongest findings combined anomalies with missing source materials, impossible accounts of collection, testimony, and Stapel’s control over the data pipeline. It also exposed a supervisory culture in which elegant results and authority reduced ordinary questions about provenance.\n\nIves recognizes the architecture in Voss’s laboratory. Junior author Kline received a cleaned table but never handled recruitment; participant payments do not match the sample; and the acquisition server lacks the sessions Voss said were run off-site. The Stapel lesson is organizational: ask who could create a dataset without witnesses and who benefited from keeping collection separate from analysis. It also protects collaborators from guilt by association. Responsibility follows evidence of control and knowledge, not merely a name on the paper.",
      "frame": "Ives closes the analysis script and asks for the enrollment log instead. “Stapel’s collaborators could rerun every model and still never touch a participant. Follow control of collection.”",
      "q": [
        {
          "q": "What organizational feature enabled Stapel’s fabrication?",
          "o": [
            {
              "t": "He supplied finished datasets while keeping collaborators away from collection.",
              "v": "expert",
              "fb": "Centralized, unwitnessed control separated honest analysis from invented observations."
            },
            {
              "t": "Every co-author personally watched him alter each participant response.",
              "v": "wrong",
              "fb": "Many collaborators lacked direct access to the claimed data collection."
            },
            {
              "t": "Journals prohibited researchers from requesting raw data from senior authors.",
              "v": "wrong",
              "fb": "Cultural deference mattered, but no universal prohibition created the scheme."
            },
            {
              "t": "The studies used qualitative interviews that could not produce numerical files.",
              "v": "wrong",
              "fb": "The misconduct involved quantitative datasets presented as collected observations."
            }
          ]
        },
        {
          "q": "What evidence made the Stapel finding stronger than statistical suspicion?",
          "o": [
            {
              "t": "Anomalies converged with missing sources, false collection accounts, and control.",
              "v": "expert",
              "fb": "Documentary and organizational evidence connected patterns to fabrication."
            },
            {
              "t": "His results were unusually interesting and received extensive media coverage.",
              "v": "wrong",
              "fb": "Novelty and publicity do not establish misconduct."
            },
            {
              "t": "Some replications reported smaller effects than the original papers. too.",
              "v": "partial",
              "fb": "Replication failure can raise questions but does not identify invention."
            },
            {
              "t": "A single decimal digit appeared twice in one spreadsheet column. here.",
              "v": "danger",
              "fb": "Ordinary datasets contain repetitions; context and broader convergence are required."
            }
          ]
        },
        {
          "q": "How should co-author responsibility be assessed?",
          "o": [
            {
              "t": "By access, knowledge, decisions, and control rather than authorship alone.",
              "v": "expert",
              "fb": "A byline warrants scrutiny but does not prove participation in fabrication."
            },
            {
              "t": "Every listed author should receive the same finding regardless of evidence.",
              "v": "danger",
              "fb": "Collective punishment erases differences in conduct and knowledge."
            },
            {
              "t": "Junior researchers can rarely bear responsibility for checking supplied data.",
              "v": "wrong",
              "fb": "They have duties, though power and access affect what checks are possible."
            },
            {
              "t": "mainly the journal editor can be responsible once an article is published.",
              "v": "wrong",
              "fb": "Editorial review does not replace author and institutional responsibilities."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "ps_grad": {
      "ps_lab": "Rhee stands among unused response pads and numbered cubicles. “I ran the follow-ups exactly as written,” she says. “Real subjects missed keys, asked questions, and left uneven files. Voss’s originals never do.”",
      "ps_journal": "Rhee opens the revision history beside the editor’s praise. “Kline asked to describe the failures,” she says. “Voss removed the paragraph and called the new sample decisive.”",
      "ps_dataroom": "Rhee matches participant codes against payment receipts. “Half these people were supposedly tested on days the building was closed,” she says. “The spreadsheet is crowded; the corridor was empty.”"
    },
    "ps_auditor": {
      "ps_lab": "Sol checks the keyboard clock against a calibration log. “Human timing has structure and hardware leaves metadata,” he says. “These blocks repeat the same jitter as if someone copied the noise.”",
      "ps_journal": "Sol writes the published means on the office glass and recomputes them from the supplement. “Rounding cannot bridge this gap,” he says. “One of these tables did not come from the other.”",
      "ps_dataroom": "Sol loads the untouched archive in read-only mode. “For the stated sample size, this mean and standard deviation cannot coexist with integer responses,” he says. “That is arithmetic, not taste.”"
    },
    "ps_replicator": {
      "ps_lab": "Ives sets the preregistered protocol beside three laboratories’ session logs. “The procedure runs,” she says. “The famous effect does not, and our null is precise enough to matter.”",
      "ps_journal": "Ives slides a multi-lab report across the editorial desk. “A failed replication is not a misconduct verdict,” she says. “It is the reason the original evidence must become inspectable.”",
      "ps_dataroom": "Ives traces the acquisition directory to a blank week in the server backup. “Voss said the sessions happened here,” she says. “There are summaries, but no events from which to summarize.”"
    }
  },
  "story": [
    "<b>The Mimicry Effect</b> seemed almost theatrical: a brief cue, a measurable change in behavior, and a graph clean enough to redraw a field around it. Independent laboratories now run the same procedure and watch the celebrated line flatten.",
    "You may question <b>Grad Student Rhee</b>, who performed the follow-up sessions; <b>Data Auditor Sol</b>, who can test whether summaries are mathematically possible; and <b>Dr. Ives</b>, whose replication network recorded every plan, deviation, and result.",
    "Prof. Adrian Voss, Dr. Kline, and the journal editor each controlled a different gate between experiment and fame. The panel is tempted by <b>a landmark, field-defining effect</b> and by <b>a fragile fluke—just noise, best forgotten</b>. Either conclusion can be reached without opening the participant archive.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide the <b>WHAT</b> from the evidence."
  ],
  "endings": {
    "overclaimWhat": "ps_landmark",
    "dismissalWhat": "ps_noise",
    "win": {
      "expertTitle": "The Participants Who Never Arrived",
      "expert": [
        "You identify <b>Prof. Adrian Voss—the celebrated lead author</b>, <b>the Raw-Data Archive</b>, and <b>fabricated data behind the famous result</b>. The archived rows cannot generate the published means and deviations, copied timing jitter recurs across supposed sessions, payment and building logs contradict enrollment, and the acquisition server contains no source events. Not a landmark effect. Not a fragile fluke.",
        "Your finding also separates bad method from invented evidence. Flexible analyses and publication bias helped the claim flourish, while failed replications justified scrutiny but did not prove misconduct. Voss alone controlled the off-site collection story and supplied the finished table; Kline analyzed what was received, and the editor amplified it without seeing source files. The paper is retracted and the archive preserved for a broader review."
      ],
      "soundTitle": "An Archive That Cannot Balance",
      "sound": [
        "You correctly name Prof. Adrian Voss, the Raw-Data Archive, and fabricated data behind the famous result. Impossible summary statistics, repeated timing patterns, and absent session records establish more than an unstable effect or an ordinary analytical mistake.",
        "The panel accepts the accusation. Your account leaves some editorial and supervisory failures underdeveloped, but it connects the decisive records to Voss’s exclusive control strongly enough for retraction and formal investigation."
      ],
      "namedTitle": "The Right Finding",
      "named": [
        "You name Prof. Adrian Voss, the Raw-Data Archive, and fabricated data behind the famous result. The conclusion is correct, though you do not fully distinguish replication failure, analytic flexibility, and direct evidence that the participants were never recorded.",
        "The journal halts promotion of the paper. Its final decision will need the chain you only outlined, so that a misconduct finding is not mistaken for punishment of a controversial theory."
      ]
    },
    "overclaim": {
      "title": "The Landmark Built from a Summary Table",
      "body": [
        "You defend the Mimicry Effect as a field-defining discovery. That verdict treats one polished article as stronger than participant arithmetic, copied timing patterns, payment records, and an acquisition directory with no sessions behind the decisive sample.",
        "The journal turns scrutiny into a story about timid science attacking genius. Voss’s table remains the benchmark, honest replications are dismissed as incompetence, and the specific evidence of fabrication loses force beneath a public argument about whether the theory sounds exciting."
      ]
    },
    "dismissal": {
      "title": "Noise Does Not Invent Participants",
      "body": [
        "You dismiss the result as a fragile fluke best forgotten. Sampling error and flexible analysis can erase an effect, but they cannot create impossible standard deviations, duplicate device jitter, or sessions that leave no enrollment, payment, or acquisition trace.",
        "By calling the case ordinary noise, you spare the journal embarrassment and leave the raw archive unexamined. Junior researchers inherit suspicion, the fabricated article remains citable, and the laboratory learns that nonexistent participants can be excused as a replication problem."
      ]
    },
    "wrongNames": {
      "title": "The Data, Misassigned",
      "body": [
        "You recognize that the famous result rests on fabricated data, but accuse the wrong person or locate the act outside the Raw-Data Archive. The unresolved link is where nonexistent sessions became participant rows and those rows became the published statistics—"
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A psychology data plot with implausibly regular points\"><path d=\"M70 110 V26 M70 110 H586\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M92 92 C160 78,220 72,280 58 S416 40,544 32\" fill=\"none\" stroke=\"#326891\" stroke-width=\"1.7\"/><g fill=\"#121212\"><circle cx=\"104\" cy=\"90\" r=\"3\"/><circle cx=\"164\" cy=\"78\" r=\"3\"/><circle cx=\"224\" cy=\"70\" r=\"3\"/><circle cx=\"284\" cy=\"58\" r=\"3\"/><circle cx=\"344\" cy=\"50\" r=\"3\"/></g><g fill=\"#B3261E\"><circle cx=\"404\" cy=\"42\" r=\"4\"/><circle cx=\"464\" cy=\"42\" r=\"4\"/><circle cx=\"524\" cy=\"42\" r=\"4\"/></g><path d=\"M394 30 H536\" stroke=\"#B3261E\" stroke-width=\"1.5\" stroke-dasharray=\"4 4\"/></svg>"
}};
