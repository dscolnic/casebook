module.exports = { PACK: {
  "id": "w_trial",
  "title": "The Trial Data",
  "discipline": "Clinical Trials & Biostatistics",
  "teaser": "A blockbuster drug sailed through its trials, then patients began dying of its side effects. A crank whistleblower? Random noise? Or adverse-event data that was fabricated and buried?",
  "overclaimTag": "a rogue trial investigator",
  "truthTag": "suppressed adverse-event data",
  "venue": "the Verazol drug-trial inquiry",
  "agent": {
    "name": "Investigator Sam Rourke",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Trial & Statistics Pioneers",
  "dossierName": "CLINICAL-TRIAL PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Verazol drug-trial inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The WHERE you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "One rogue investigator is a convenient container for blame; the complete safety file may be larger.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "sponsor",
      "items": [
        {
          "id": "investigator",
          "label": "The lead trial investigator"
        },
        {
          "id": "sponsor",
          "label": "Sable — the sponsor's clinical-trials director"
        },
        {
          "id": "monitor",
          "label": "The trial-monitoring auditor"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "headoffice",
      "items": [
        {
          "id": "site",
          "label": "The Trial Site & Clinic"
        },
        {
          "id": "datacenter",
          "label": "The Data-Management Center"
        },
        {
          "id": "headoffice",
          "label": "The Sponsor's Head Office"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "suppression",
      "items": [
        {
          "id": "fraudsite",
          "label": "A rogue investigator who faked the results"
        },
        {
          "id": "noise",
          "label": "The deaths are unrelated — statistical noise"
        },
        {
          "id": "suppression",
          "label": "Adverse-event data fabricated and suppressed behind the approval"
        }
      ]
    }
  },
  "PLACES": {
    "site": {
      "name": "The Trial Site & Clinic",
      "xy": [
        140,
        90
      ]
    },
    "datacenter": {
      "name": "The Data-Management Center",
      "xy": [
        330,
        240
      ]
    },
    "headoffice": {
      "name": "The Sponsor's Head Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "site",
      "datacenter"
    ],
    [
      "datacenter",
      "headoffice"
    ]
  ],
  "CHARACTERS": {
    "trialnurse": {
      "name": "Trial Nurse Devi",
      "role": "Research nurse",
      "face": "💊",
      "badge": "N",
      "legend": "the clinic",
      "hint": "Saw the patients; the serious side effects she reported never reached the file."
    },
    "stat": {
      "name": "The Statistician",
      "role": "Trial biostatistician",
      "face": "📊",
      "badge": "S",
      "legend": "the data center",
      "hint": "Runs the numbers; whole batches of adverse events were recoded as 'unrelated' before analysis."
    },
    "clerk": {
      "name": "The Clerk",
      "role": "Sponsor records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Keeps the case-report forms — and the safety signal the sponsor sat on."
    }
  },
  "TOPICMAP": {
    "site": {
      "trialnurse": [
        "scurvy"
      ],
      "stat": [
        "ttest"
      ],
      "clerk": [
        "confidence"
      ]
    },
    "datacenter": {
      "trialnurse": [
        "doe"
      ],
      "stat": [
        "cohort"
      ],
      "clerk": [
        "ebm"
      ]
    },
    "headoffice": {
      "trialnurse": [
        "consent"
      ],
      "stat": [
        "clinepi"
      ],
      "clerk": [
        "consort"
      ]
    }
  },
  "TOPICS": {
    "scurvy": {
      "sci": "James Lind (1716-1794)",
      "topic": "The first controlled trial",
      "lede": "James Lind made the first controlled trial a safeguard against persuasive but misleading medical results.",
      "no": 1,
      "profile": "The clinical-evidence email today focuses on James Lind and the first controlled trial. James Lind compared six treatments among sailors with scurvy aboard HMS Salisbury in 1747. The groups were small and the design was not a modern randomized trial, but the citrus-treated sailors improved strikingly. Trials create a comparison under rules chosen before outcomes are known. Lind’s contribution addresses one place where design, analysis, reporting, or ethics can protect that comparison from bias.\n\nThe disciplined approach is to compare treatments concurrently among patients with similar illness while keeping other conditions as comparable as possible. Protocols, allocation, exclusions, outcome definitions, adverse events, missing data, and analysis changes must remain traceable from the first participant to the final report.\n\nA statistically persuasive efficacy result can coexist with distorted safety data. Reclassification, selective follow-up, changed denominators, and unpublished outcomes alter the evidence without changing the trial’s polished headline. Independent monitoring and transparent reporting are therefore scientific controls.\n\nThe trial lesson: controlled comparison is stronger than reputation or anecdote. Medical evidence deserves confidence only when every patient and every prespecified outcome can be accounted for. Harms should be reported by event, severity, timing, and treatment group rather than hidden inside a broad category. A post hoc explanation should be labeled as such and never replace the original analysis silently. Data-monitoring decisions should be dated and justified without access being broader than the committee’s role requires. Participant flow diagrams make exclusions visible when a final treatment table would otherwise hide them. Protocols and statistical-analysis plans should remain accessible after publication so readers can distinguish planned work from revision.",
      "frame": "Opens a case-report form at The Trial Site & Clinic. \"A participant vanished between this page and the analysis. Use the first controlled trial to tell me what must remain.\"",
      "q": [
        {
          "q": "Which trial-method statement best captures James Lind’s work on the first controlled trial?",
          "o": [
            {
              "t": "James Lind compared six treatments among sailors with scurvy aboard HMS Salisbury in 1747. Every participant remains traceable. The harm analysis stays visible.",
              "v": "expert",
              "fb": "Correct: the choice keeps design, participants, outcomes, harms, and analysis traceable."
            },
            {
              "t": "James Lind advanced the first controlled trial, yet the account reports the treatment estimate without allocation, follow-up, exclusions, or harm coding, in use.",
              "v": "partial",
              "fb": "This improves the study but leaves a route for selection, missing data, or reporting bias."
            },
            {
              "t": "James Lind is portrayed as showing that statistical significance is presented as showing the trial was randomized and the data complete. The design does not support that.",
              "v": "wrong",
              "fb": "That inference confuses statistical form with honest design or complete clinical evidence."
            },
            {
              "t": "James Lind is invoked to recode adverse events after analysis because the efficacy result is commercially important. Approval outranks the safety signal, in use.",
              "v": "danger",
              "fb": "That approach treats the desired approval result as more important than the safety record."
            }
          ]
        },
        {
          "q": "Which practice most strongly protects the clinical comparison?",
          "o": [
            {
              "t": "Apply this trial procedure: compare treatments concurrently among patients with similar illness while keeping other conditions as comparable as possible. The harm analysis stays visible.",
              "v": "expert",
              "fb": "Correct: the choice keeps design, participants, outcomes, harms, and analysis traceable."
            },
            {
              "t": "Preserve randomization and the primary endpoint, but exclude incomplete participants and combine serious harms into a broad category. Missing follow-up still threatens the comparison, in use.",
              "v": "partial",
              "fb": "This improves the study but leaves a route for selection, missing data, or reporting bias."
            },
            {
              "t": "Choose the most favorable analysis after unblinding and treat the resulting confidence interval as prespecified evidence. The design does not support that. The statistic does not establish conduct.",
              "v": "wrong",
              "fb": "That inference confuses statistical form with honest design or complete clinical evidence."
            },
            {
              "t": "Remove the safety signal from the report, label the deaths unrelated, and promise postmarketing clarification after approval. Approval outranks the safety signal. Recoding replaces evidence.",
              "v": "danger",
              "fb": "That approach treats the desired approval result as more important than the safety record."
            }
          ]
        },
        {
          "q": "What conclusion should govern interpretation of the trial?",
          "o": [
            {
              "t": "The clinical-evidence lesson is that controlled comparison is stronger than reputation or anecdote. The prespecified analysis can be recovered exactly, in use.",
              "v": "expert",
              "fb": "Correct: the choice keeps design, participants, outcomes, harms, and analysis traceable."
            },
            {
              "t": "Strong efficacy can justify incomplete adverse-event reporting when the overall trial reaches its primary endpoint. Missing outcomes remain unresolved, in use.",
              "v": "partial",
              "fb": "This improves the study but leaves a route for selection, missing data, or reporting bias."
            },
            {
              "t": "A low p value establishes that every recorded patient, outcome, and analysis decision is authentic. The statistical result does not establish honest conduct.",
              "v": "wrong",
              "fb": "That inference confuses statistical form with honest design or complete clinical evidence."
            },
            {
              "t": "The result is likely to be a lone investigator’s fraud or random noise, excluding sponsor-level suppression across the dataset. Approval outranks the safety signal.",
              "v": "danger",
              "fb": "That approach treats the desired approval result as more important than the safety record."
            }
          ]
        }
      ]
    },
    "ttest": {
      "sci": "William Sealy Gosset — 'Student' (1876-1937)",
      "topic": "Small samples & the t-test",
      "lede": "William Sealy Gosset — 'Student' used small samples and the t-test to keep trial conclusions answerable to patients and data.",
      "no": 2,
      "profile": "The clinical-evidence email today focuses on William Sealy Gosset — 'Student' and small samples and the t-test. William Sealy Gosset, publishing as Student while employed by Guinness, developed the t distribution for inference from small samples with unknown variance. His work addressed practical experiments in brewing and agriculture. Trials create a comparison under rules chosen before outcomes are known. 'Student'’s contribution addresses one place where design, analysis, reporting, or ethics can protect that comparison from bias.\n\nThe disciplined approach is to use a small-sample distribution and state independence, normality, and variance assumptions. Protocols, allocation, exclusions, outcome definitions, adverse events, missing data, and analysis changes must remain traceable from the first participant to the final report.\n\nA statistically persuasive efficacy result can coexist with distorted safety data. Reclassification, selective follow-up, changed denominators, and unpublished outcomes alter the evidence without changing the trial’s polished headline. Independent monitoring and transparent reporting are therefore scientific controls.\n\nThe trial lesson: small datasets require more uncertainty, not more confident storytelling. Medical evidence deserves confidence only when every patient and every prespecified outcome can be accounted for. Harms should be reported by event, severity, timing, and treatment group rather than hidden inside a broad category. A post hoc explanation should be labeled as such and never replace the original analysis silently. Data-monitoring decisions should be dated and justified without access being broader than the committee’s role requires. Participant flow diagrams make exclusions visible when a final treatment table would otherwise hide them. Protocols and statistical-analysis plans should remain accessible after publication so readers can distinguish planned work from revision.",
      "frame": "Closes the glossy trial summary. \"The protocol came first. Start with small samples and the t-test.\"",
      "q": [
        {
          "q": "Which trial-method statement best captures William Sealy Gosset — 'Student'’s work on small samples and the t-test?",
          "o": [
            {
              "t": "William Sealy Gosset, publishing as Student while employed by Guinness, developed the t distribution for inference from small samples with unknown variance. The harm analysis stays visible.",
              "v": "expert",
              "fb": "Correct: the choice keeps design, participants, outcomes, harms, and analysis traceable."
            },
            {
              "t": "William Sealy Gosset — 'Student' advanced small samples and the t-test, yet the account reports the treatment estimate without allocation, follow-up, exclusions, or harm coding, on review.",
              "v": "partial",
              "fb": "This improves the study but leaves a route for selection, missing data, or reporting bias."
            },
            {
              "t": "William Sealy Gosset — 'Student' is portrayed as showing that statistical significance is presented as showing the trial was randomized and the data complete. The statistic does not establish conduct.",
              "v": "wrong",
              "fb": "That inference confuses statistical form with honest design or complete clinical evidence."
            },
            {
              "t": "William Sealy Gosset — 'Student' is invoked to recode adverse events after analysis because the efficacy result is commercially important. Safety evidence is rewritten after unblinding, in use.",
              "v": "danger",
              "fb": "That approach treats the desired approval result as more important than the safety record."
            }
          ]
        },
        {
          "q": "Which practice most strongly protects the clinical comparison?",
          "o": [
            {
              "t": "Apply this trial procedure: use a small-sample distribution and state independence, normality, and variance assumptions. The prespecified analysis can be recovered exactly.",
              "v": "expert",
              "fb": "Correct: the choice keeps design, participants, outcomes, harms, and analysis traceable."
            },
            {
              "t": "Preserve randomization and the primary endpoint, but exclude incomplete participants and combine serious harms into a broad category. Missing outcomes remain unresolved.",
              "v": "partial",
              "fb": "This improves the study but leaves a route for selection, missing data, or reporting bias."
            },
            {
              "t": "Choose the most favorable analysis after unblinding and treat the resulting confidence interval as prespecified evidence. The statistical result does not establish honest conduct.",
              "v": "wrong",
              "fb": "That inference confuses statistical form with honest design or complete clinical evidence."
            },
            {
              "t": "Remove the safety signal from the report, label the deaths unrelated, and promise postmarketing clarification after approval. Approval outranks the safety signal, in use.",
              "v": "danger",
              "fb": "That approach treats the desired approval result as more important than the safety record."
            }
          ]
        },
        {
          "q": "What conclusion should govern interpretation of the trial?",
          "o": [
            {
              "t": "The clinical-evidence lesson is that small datasets require more uncertainty, not more confident storytelling. Every participant remains traceable, in use.",
              "v": "expert",
              "fb": "Correct: the choice keeps design, participants, outcomes, harms, and analysis traceable."
            },
            {
              "t": "Strong efficacy can justify incomplete adverse-event reporting when the overall trial reaches its primary endpoint. Missing outcomes remain unresolved, in use.",
              "v": "partial",
              "fb": "This improves the study but leaves a route for selection, missing data, or reporting bias."
            },
            {
              "t": "A low p value establishes that every recorded patient, outcome, and analysis decision is authentic. The statistical result does not establish honest conduct.",
              "v": "wrong",
              "fb": "That inference confuses statistical form with honest design or complete clinical evidence."
            },
            {
              "t": "The result is likely to be a lone investigator’s fraud or random noise, excluding sponsor-level suppression across the dataset. Approval outranks the safety signal.",
              "v": "danger",
              "fb": "That approach treats the desired approval result as more important than the safety record."
            }
          ]
        }
      ]
    },
    "confidence": {
      "sci": "Jerzy Neyman (1894-1981)",
      "topic": "Confidence intervals & hypothesis testing",
      "lede": "Clinical comparison became more honest through Jerzy Neyman’s work on confidence intervals and hypothesis testing.",
      "no": 3,
      "profile": "The clinical-evidence email today focuses on Jerzy Neyman and confidence intervals and hypothesis testing. Jerzy Neyman developed confidence intervals as procedures that cover the true parameter at a stated long-run rate under repeated sampling. The interval is not a probability statement that this one fixed parameter lies inside after the data are observed. Trials create a comparison under rules chosen before outcomes are known. Neyman’s contribution addresses one place where design, analysis, reporting, or ethics can protect that comparison from bias.\n\nThe disciplined approach is to report an estimate with an interval tied to a prespecified sampling procedure. Protocols, allocation, exclusions, outcome definitions, adverse events, missing data, and analysis changes must remain traceable from the first participant to the final report.\n\nA statistically persuasive efficacy result can coexist with distorted safety data. Reclassification, selective follow-up, changed denominators, and unpublished outcomes alter the evidence without changing the trial’s polished headline. Independent monitoring and transparent reporting are therefore scientific controls.\n\nThe trial lesson: precision and clinical importance should be read together. Medical evidence deserves confidence only when every patient and every prespecified outcome can be accounted for. Harms should be reported by event, severity, timing, and treatment group rather than hidden inside a broad category. A post hoc explanation should be labeled as such and never replace the original analysis silently. Data-monitoring decisions should be dated and justified without access being broader than the committee’s role requires. Participant flow diagrams make exclusions visible when a final treatment table would otherwise hide them.",
      "frame": "Circles an outcome code. \"Statistics cannot correct a category changed after the event. Explain confidence intervals and hypothesis testing.\"",
      "q": [
        {
          "q": "Which trial-method statement best captures Jerzy Neyman’s work on confidence intervals and hypothesis testing?",
          "o": [
            {
              "t": "Jerzy Neyman developed confidence intervals as procedures that cover the true parameter at a stated long-run rate under repeated sampling. Every participant remains traceable, on site.",
              "v": "expert",
              "fb": "Correct: the choice keeps design, participants, outcomes, harms, and analysis traceable."
            },
            {
              "t": "Jerzy Neyman advanced confidence intervals and hypothesis testing, yet the account reports the treatment estimate without allocation, follow-up, exclusions, or harm coding, under load.",
              "v": "partial",
              "fb": "This improves the study but leaves a route for selection, missing data, or reporting bias."
            },
            {
              "t": "Jerzy Neyman is portrayed as showing that statistical significance is presented as showing the trial was randomized and the data complete. The statistical result does not establish honest conduct.",
              "v": "wrong",
              "fb": "That inference confuses statistical form with honest design or complete clinical evidence."
            },
            {
              "t": "Jerzy Neyman is invoked to recode adverse events after analysis because the efficacy result is commercially important. Commercial timing replaces prespecified analysis, in the record, in use.",
              "v": "danger",
              "fb": "That approach treats the desired approval result as more important than the safety record."
            }
          ]
        },
        {
          "q": "Which practice most strongly protects the clinical comparison?",
          "o": [
            {
              "t": "Apply this trial procedure: report an estimate with an interval tied to a prespecified sampling procedure. Every participant remains traceable. Safety recoding stays visible in the version history, in use.",
              "v": "expert",
              "fb": "Correct: the choice keeps design, participants, outcomes, harms, and analysis traceable."
            },
            {
              "t": "Preserve randomization and the primary endpoint, but exclude incomplete participants and combine serious harms into a broad category. Missing outcomes remain unresolved. The reporting path stays incomplete.",
              "v": "partial",
              "fb": "This improves the study but leaves a route for selection, missing data, or reporting bias."
            },
            {
              "t": "Choose the most favorable analysis after unblinding and treat the resulting confidence interval as prespecified evidence. The design does not support that. The statistical result does not establish honest conduct.",
              "v": "wrong",
              "fb": "That inference confuses statistical form with honest design or complete clinical evidence."
            },
            {
              "t": "Remove the safety signal from the report, label the deaths unrelated, and promise postmarketing clarification after approval. Recoding replaces evidence. Safety evidence is rewritten after unblinding, in use.",
              "v": "danger",
              "fb": "That approach treats the desired approval result as more important than the safety record."
            }
          ]
        },
        {
          "q": "What conclusion should govern interpretation of the trial?",
          "o": [
            {
              "t": "The clinical-evidence lesson is that precision and clinical importance should be read together. The prespecified analysis can be recovered exactly, in use.",
              "v": "expert",
              "fb": "Correct: the choice keeps design, participants, outcomes, harms, and analysis traceable."
            },
            {
              "t": "Strong efficacy can justify incomplete adverse-event reporting when the overall trial reaches its primary endpoint. Missing outcomes remain unresolved, in use.",
              "v": "partial",
              "fb": "This improves the study but leaves a route for selection, missing data, or reporting bias."
            },
            {
              "t": "A low p value establishes that every recorded patient, outcome, and analysis decision is authentic. The statistical result does not establish honest conduct.",
              "v": "wrong",
              "fb": "That inference confuses statistical form with honest design or complete clinical evidence."
            },
            {
              "t": "The result is likely to be a lone investigator’s fraud or random noise, excluding sponsor-level suppression across the dataset. Approval outranks the safety signal.",
              "v": "danger",
              "fb": "That approach treats the desired approval result as more important than the safety record."
            }
          ]
        }
      ]
    },
    "doe": {
      "sci": "Frank Yates (1902-1994)",
      "topic": "The design of experiments",
      "lede": "Frank Yates made the design of experiments a safeguard against persuasive but misleading medical results.",
      "no": 4,
      "profile": "The clinical-evidence email today focuses on Frank Yates and the design of experiments. Frank Yates advanced factorial experiments, incomplete blocks, and the analysis of complex agricultural designs. His methods showed how a well-planned experiment can estimate several effects efficiently. Trials create a comparison under rules chosen before outcomes are known. Yates’s contribution addresses one place where design, analysis, reporting, or ethics can protect that comparison from bias.\n\nThe disciplined approach is to design the allocation and analysis together so treatment effects are separated from blocks and interactions. Protocols, allocation, exclusions, outcome definitions, adverse events, missing data, and analysis changes must remain traceable from the first participant to the final report.\n\nA statistically persuasive efficacy result can coexist with distorted safety data. Reclassification, selective follow-up, changed denominators, and unpublished outcomes alter the evidence without changing the trial’s polished headline. Independent monitoring and transparent reporting are therefore scientific controls.\n\nThe trial lesson: statistical sophistication begins before the first participant is enrolled. Medical evidence deserves confidence only when every patient and every prespecified outcome can be accounted for. Harms should be reported by event, severity, timing, and treatment group rather than hidden inside a broad category. A post hoc explanation should be labeled as such and never replace the original analysis silently. Data-monitoring decisions should be dated and justified without access being broader than the committee’s role requires. Participant flow diagrams make exclusions visible when a final treatment table would otherwise hide them. Protocols and statistical-analysis plans should remain accessible after publication so readers can distinguish planned work from revision.",
      "frame": "Opens a case-report form at The Data-Management Center. \"A participant vanished between this page and the analysis. Use the design of experiments to tell me what must remain.\"",
      "q": [
        {
          "q": "Which trial-method statement best captures Frank Yates’s work on the design of experiments?",
          "o": [
            {
              "t": "Frank Yates advanced factorial experiments, incomplete blocks, and the analysis of complex agricultural designs. The prespecified analysis can be recovered exactly.",
              "v": "expert",
              "fb": "Correct: the choice keeps design, participants, outcomes, harms, and analysis traceable."
            },
            {
              "t": "Frank Yates advanced the design of experiments, yet the account reports the treatment estimate without allocation, follow-up, exclusions, or harm coding, in use.",
              "v": "partial",
              "fb": "This improves the study but leaves a route for selection, missing data, or reporting bias."
            },
            {
              "t": "Frank Yates is portrayed as showing that statistical significance is presented as showing the trial was randomized and the data complete. The design does not support that.",
              "v": "wrong",
              "fb": "That inference confuses statistical form with honest design or complete clinical evidence."
            },
            {
              "t": "Frank Yates is invoked to recode adverse events after analysis because the efficacy result is commercially important. Approval outranks the safety signal, in use.",
              "v": "danger",
              "fb": "That approach treats the desired approval result as more important than the safety record."
            }
          ]
        },
        {
          "q": "Which practice most strongly protects the clinical comparison?",
          "o": [
            {
              "t": "Apply this trial procedure: design the allocation and analysis together so treatment effects are separated from blocks and interactions. The harm analysis stays visible.",
              "v": "expert",
              "fb": "Correct: the choice keeps design, participants, outcomes, harms, and analysis traceable."
            },
            {
              "t": "Preserve randomization and the primary endpoint, but exclude incomplete participants and combine serious harms into a broad category. Missing outcomes remain unresolved.",
              "v": "partial",
              "fb": "This improves the study but leaves a route for selection, missing data, or reporting bias."
            },
            {
              "t": "Choose the most favorable analysis after unblinding and treat the resulting confidence interval as prespecified evidence. The statistical result does not establish honest conduct.",
              "v": "wrong",
              "fb": "That inference confuses statistical form with honest design or complete clinical evidence."
            },
            {
              "t": "Remove the safety signal from the report, label the deaths unrelated, and promise postmarketing clarification after approval. Approval outranks the safety signal, in use.",
              "v": "danger",
              "fb": "That approach treats the desired approval result as more important than the safety record."
            }
          ]
        },
        {
          "q": "What conclusion should govern interpretation of the trial?",
          "o": [
            {
              "t": "The clinical-evidence lesson is that statistical sophistication begins before the first participant is enrolled. The harm analysis stays visible, in use.",
              "v": "expert",
              "fb": "Correct: the choice keeps design, participants, outcomes, harms, and analysis traceable."
            },
            {
              "t": "Strong efficacy can justify incomplete adverse-event reporting when the overall trial reaches its primary endpoint. Missing outcomes remain unresolved, in use.",
              "v": "partial",
              "fb": "This improves the study but leaves a route for selection, missing data, or reporting bias."
            },
            {
              "t": "A low p value establishes that every recorded patient, outcome, and analysis decision is authentic. The statistical result does not establish honest conduct.",
              "v": "wrong",
              "fb": "That inference confuses statistical form with honest design or complete clinical evidence."
            },
            {
              "t": "The result is likely to be a lone investigator’s fraud or random noise, excluding sponsor-level suppression across the dataset. Approval outranks the safety signal.",
              "v": "danger",
              "fb": "That approach treats the desired approval result as more important than the safety record."
            }
          ]
        }
      ]
    },
    "cohort": {
      "sci": "Richard Doll (1912-2005)",
      "topic": "Cohort studies & causation",
      "lede": "Richard Doll used cohort studies and causation to keep trial conclusions answerable to patients and data.",
      "no": 5,
      "profile": "The clinical-evidence email today focuses on Richard Doll and cohort studies and causation. Richard Doll and Austin Bradford Hill followed British doctors to study smoking and mortality, demonstrating strong associations with lung cancer and other diseases. The prospective cohort repeatedly updated exposure and outcomes over years. Trials create a comparison under rules chosen before outcomes are known. Doll’s contribution addresses one place where design, analysis, reporting, or ethics can protect that comparison from bias.\n\nThe disciplined approach is to define exposure before outcome and maintain follow-up across comparison groups. Protocols, allocation, exclusions, outcome definitions, adverse events, missing data, and analysis changes must remain traceable from the first participant to the final report.\n\nA statistically persuasive efficacy result can coexist with distorted safety data. Reclassification, selective follow-up, changed denominators, and unpublished outcomes alter the evidence without changing the trial’s polished headline. Independent monitoring and transparent reporting are therefore scientific controls.\n\nThe trial lesson: causal evidence grows from dose, timing, consistency, and alternatives, not one statistic. Medical evidence deserves confidence only when every patient and every prespecified outcome can be accounted for. Harms should be reported by event, severity, timing, and treatment group rather than hidden inside a broad category. A post hoc explanation should be labeled as such and never replace the original analysis silently. Data-monitoring decisions should be dated and justified without access being broader than the committee’s role requires. Participant flow diagrams make exclusions visible when a final treatment table would otherwise hide them. Protocols and statistical-analysis plans should remain accessible after publication so readers can distinguish planned work from revision.",
      "frame": "Closes the glossy trial summary. \"The protocol came first. Start with cohort studies and causation.\"",
      "q": [
        {
          "q": "Which trial-method statement best captures Richard Doll’s work on cohort studies and causation?",
          "o": [
            {
              "t": "Richard Doll and Austin Bradford Hill followed British doctors to study smoking and mortality, demonstrating strong associations with lung cancer and other diseases, in use.",
              "v": "expert",
              "fb": "Correct: the choice keeps design, participants, outcomes, harms, and analysis traceable."
            },
            {
              "t": "Richard Doll advanced cohort studies and causation, yet the account reports the treatment estimate without allocation, follow-up, exclusions, or harm coding, on review.",
              "v": "partial",
              "fb": "This improves the study but leaves a route for selection, missing data, or reporting bias."
            },
            {
              "t": "Richard Doll is portrayed as showing that statistical significance is presented as showing the trial was randomized and the data complete. The statistic does not establish conduct.",
              "v": "wrong",
              "fb": "That inference confuses statistical form with honest design or complete clinical evidence."
            },
            {
              "t": "Richard Doll is invoked to recode adverse events after analysis because the efficacy result is commercially important. Approval outranks the safety signal, in practice.",
              "v": "danger",
              "fb": "That approach treats the desired approval result as more important than the safety record."
            }
          ]
        },
        {
          "q": "Which practice most strongly protects the clinical comparison?",
          "o": [
            {
              "t": "Apply this trial procedure: define exposure before outcome and maintain follow-up across comparison groups. Safety recoding stays visible in the version history, in use.",
              "v": "expert",
              "fb": "Correct: the choice keeps design, participants, outcomes, harms, and analysis traceable."
            },
            {
              "t": "Preserve randomization and the primary endpoint, but exclude incomplete participants and combine serious harms into a broad category. Missing outcomes remain unresolved.",
              "v": "partial",
              "fb": "This improves the study but leaves a route for selection, missing data, or reporting bias."
            },
            {
              "t": "Choose the most favorable analysis after unblinding and treat the resulting confidence interval as prespecified evidence. The statistical result does not establish honest conduct.",
              "v": "wrong",
              "fb": "That inference confuses statistical form with honest design or complete clinical evidence."
            },
            {
              "t": "Remove the safety signal from the report, label the deaths unrelated, and promise postmarketing clarification after approval. Approval outranks the safety signal, in use.",
              "v": "danger",
              "fb": "That approach treats the desired approval result as more important than the safety record."
            }
          ]
        },
        {
          "q": "What conclusion should govern interpretation of the trial?",
          "o": [
            {
              "t": "The clinical-evidence lesson is that causal evidence grows from dose, timing, consistency, and alternatives, not one statistic. Every participant remains traceable, in use.",
              "v": "expert",
              "fb": "Correct: the choice keeps design, participants, outcomes, harms, and analysis traceable."
            },
            {
              "t": "Strong efficacy can justify incomplete adverse-event reporting when the overall trial reaches its primary endpoint. Missing follow-up still threatens the comparison, in use.",
              "v": "partial",
              "fb": "This improves the study but leaves a route for selection, missing data, or reporting bias."
            },
            {
              "t": "A low p value establishes that every recorded patient, outcome, and analysis decision is authentic. The design does not support that. The statistic does not establish conduct.",
              "v": "wrong",
              "fb": "That inference confuses statistical form with honest design or complete clinical evidence."
            },
            {
              "t": "The result is likely to be a lone investigator’s fraud or random noise, excluding sponsor-level suppression across the dataset. Approval pressure outranks the adverse-event record.",
              "v": "danger",
              "fb": "That approach treats the desired approval result as more important than the safety record."
            }
          ]
        }
      ]
    },
    "ebm": {
      "sci": "Archie Cochrane (1909-1988)",
      "topic": "Evidence-based medicine",
      "lede": "Clinical comparison became more honest through Archie Cochrane’s work on evidence-based medicine.",
      "no": 6,
      "profile": "The clinical-evidence email today focuses on Archie Cochrane and evidence-based medicine. Archie Cochrane argued that health services should rely on randomized evidence and systematic summaries rather than custom alone. The Cochrane Collaboration later took his name as it organized rigorous reviews of interventions. Trials create a comparison under rules chosen before outcomes are known. Cochrane’s contribution addresses one place where design, analysis, reporting, or ethics can protect that comparison from bias.\n\nThe disciplined approach is to search for all relevant trials and assess their design before combining conclusions. Protocols, allocation, exclusions, outcome definitions, adverse events, missing data, and analysis changes must remain traceable from the first participant to the final report.\n\nA statistically persuasive efficacy result can coexist with distorted safety data. Reclassification, selective follow-up, changed denominators, and unpublished outcomes alter the evidence without changing the trial’s polished headline. Independent monitoring and transparent reporting are therefore scientific controls.\n\nThe trial lesson: missing negative studies can make an ineffective treatment look established. Medical evidence deserves confidence only when every patient and every prespecified outcome can be accounted for. Harms should be reported by event, severity, timing, and treatment group rather than hidden inside a broad category. A post hoc explanation should be labeled as such and never replace the original analysis silently. Data-monitoring decisions should be dated and justified without access being broader than the committee’s role requires. Participant flow diagrams make exclusions visible when a final treatment table would otherwise hide them. Protocols and statistical-analysis plans should remain accessible after publication so readers can distinguish planned work from revision.",
      "frame": "Circles an outcome code. \"Statistics cannot correct a category changed after the event. Explain evidence-based medicine.\"",
      "q": [
        {
          "q": "Which trial-method statement best captures Archie Cochrane’s work on evidence-based medicine?",
          "o": [
            {
              "t": "Archie Cochrane argued that health services should rely on randomized evidence and systematic summaries rather than custom alone. The harm analysis stays visible, in use.",
              "v": "expert",
              "fb": "Correct: the choice keeps design, participants, outcomes, harms, and analysis traceable."
            },
            {
              "t": "Archie Cochrane advanced evidence-based medicine, yet the account reports the treatment estimate without allocation, follow-up, exclusions, or harm coding, in use.",
              "v": "partial",
              "fb": "This improves the study but leaves a route for selection, missing data, or reporting bias."
            },
            {
              "t": "Archie Cochrane is portrayed as showing that statistical significance is presented as showing the trial was randomized and the data complete. The design does not support that.",
              "v": "wrong",
              "fb": "That inference confuses statistical form with honest design or complete clinical evidence."
            },
            {
              "t": "Archie Cochrane is invoked to recode adverse events after analysis because the efficacy result is commercially important. Approval outranks the safety signal, in use.",
              "v": "danger",
              "fb": "That approach treats the desired approval result as more important than the safety record."
            }
          ]
        },
        {
          "q": "Which practice most strongly protects the clinical comparison?",
          "o": [
            {
              "t": "Apply this trial procedure: search for all relevant trials and assess their design before combining conclusions. The prespecified analysis can be recovered exactly, in use.",
              "v": "expert",
              "fb": "Correct: the choice keeps design, participants, outcomes, harms, and analysis traceable."
            },
            {
              "t": "Preserve randomization and the primary endpoint, but exclude incomplete participants and combine serious harms into a broad category. Missing outcomes remain unresolved.",
              "v": "partial",
              "fb": "This improves the study but leaves a route for selection, missing data, or reporting bias."
            },
            {
              "t": "Choose the most favorable analysis after unblinding and treat the resulting confidence interval as prespecified evidence. The statistical result does not establish honest conduct.",
              "v": "wrong",
              "fb": "That inference confuses statistical form with honest design or complete clinical evidence."
            },
            {
              "t": "Remove the safety signal from the report, label the deaths unrelated, and promise postmarketing clarification after approval. Approval outranks the safety signal, in use.",
              "v": "danger",
              "fb": "That approach treats the desired approval result as more important than the safety record."
            }
          ]
        },
        {
          "q": "What conclusion should govern interpretation of the trial?",
          "o": [
            {
              "t": "The clinical-evidence lesson is that missing negative studies can make an ineffective treatment look established. The harm analysis stays visible, in use.",
              "v": "expert",
              "fb": "Correct: the choice keeps design, participants, outcomes, harms, and analysis traceable."
            },
            {
              "t": "Strong efficacy can justify incomplete adverse-event reporting when the overall trial reaches its primary endpoint. Missing outcomes remain unresolved, in use.",
              "v": "partial",
              "fb": "This improves the study but leaves a route for selection, missing data, or reporting bias."
            },
            {
              "t": "A low p value establishes that every recorded patient, outcome, and analysis decision is authentic. The statistical result does not establish honest conduct.",
              "v": "wrong",
              "fb": "That inference confuses statistical form with honest design or complete clinical evidence."
            },
            {
              "t": "The result is likely to be a lone investigator’s fraud or random noise, excluding sponsor-level suppression across the dataset. Approval outranks the safety signal.",
              "v": "danger",
              "fb": "That approach treats the desired approval result as more important than the safety record."
            }
          ]
        }
      ]
    },
    "consent": {
      "sci": "Louis Lasagna (1923-2003)",
      "topic": "Trial ethics & informed consent",
      "lede": "Louis Lasagna made trial ethics and informed consent a safeguard against persuasive but misleading medical results.",
      "no": 7,
      "profile": "The clinical-evidence email today focuses on Louis Lasagna and trial ethics and informed consent. Louis Lasagna helped modernize the physician's oath and contributed to clinical pharmacology and drug-regulation reform. His work emphasized ethical testing, meaningful consent, and realistic evaluation of medicines. Trials create a comparison under rules chosen before outcomes are known. Lasagna’s contribution addresses one place where design, analysis, reporting, or ethics can protect that comparison from bias.\n\nThe disciplined approach is to explain purpose, risks, alternatives, and voluntary choice in language participants can understand. Protocols, allocation, exclusions, outcome definitions, adverse events, missing data, and analysis changes must remain traceable from the first participant to the final report.\n\nA statistically persuasive efficacy result can coexist with distorted safety data. Reclassification, selective follow-up, changed denominators, and unpublished outcomes alter the evidence without changing the trial’s polished headline. Independent monitoring and transparent reporting are therefore scientific controls.\n\nThe trial lesson: a signed form is not evidence of informed consent when material information is withheld. Medical evidence deserves confidence only when every patient and every prespecified outcome can be accounted for. Harms should be reported by event, severity, timing, and treatment group rather than hidden inside a broad category. A post hoc explanation should be labeled as such and never replace the original analysis silently. Data-monitoring decisions should be dated and justified without access being broader than the committee’s role requires. Participant flow diagrams make exclusions visible when a final treatment table would otherwise hide them. Protocols and statistical-analysis plans should remain accessible after publication so readers can distinguish planned work from revision.",
      "frame": "Opens a case-report form at The Sponsor's Head Office. \"A participant vanished between this page and the analysis. Use trial ethics and informed consent to tell me what must remain.\"",
      "q": [
        {
          "q": "Which trial-method statement best captures Louis Lasagna’s work on trial ethics and informed consent?",
          "o": [
            {
              "t": "Louis Lasagna helped modernize the physician's oath and contributed to clinical pharmacology and drug-regulation reform. Safety recoding stays visible in the version history, on review.",
              "v": "expert",
              "fb": "Correct: the choice keeps design, participants, outcomes, harms, and analysis traceable."
            },
            {
              "t": "Louis Lasagna advanced trial ethics and informed consent, yet the account reports the treatment estimate without allocation, follow-up, exclusions, or harm coding, in the record, in use.",
              "v": "partial",
              "fb": "This improves the study but leaves a route for selection, missing data, or reporting bias."
            },
            {
              "t": "Louis Lasagna is portrayed as showing that statistical significance is presented as showing the trial was randomized and the data complete. The statistical result does not establish honest conduct.",
              "v": "wrong",
              "fb": "That inference confuses statistical form with honest design or complete clinical evidence."
            },
            {
              "t": "Louis Lasagna is invoked to recode adverse events after analysis because the efficacy result is commercially important. Commercial timing replaces prespecified analysis, in the record, in use.",
              "v": "danger",
              "fb": "That approach treats the desired approval result as more important than the safety record."
            }
          ]
        },
        {
          "q": "Which practice most strongly protects the clinical comparison?",
          "o": [
            {
              "t": "Apply this trial procedure: explain purpose, risks, alternatives, and voluntary choice in language participants can understand. Every participant remains traceable, in use.",
              "v": "expert",
              "fb": "Correct: the choice keeps design, participants, outcomes, harms, and analysis traceable."
            },
            {
              "t": "Preserve randomization and the primary endpoint, but exclude incomplete participants and combine serious harms into a broad category. Missing outcomes remain unresolved.",
              "v": "partial",
              "fb": "This improves the study but leaves a route for selection, missing data, or reporting bias."
            },
            {
              "t": "Choose the most favorable analysis after unblinding and treat the resulting confidence interval as prespecified evidence. The statistical result does not establish honest conduct.",
              "v": "wrong",
              "fb": "That inference confuses statistical form with honest design or complete clinical evidence."
            },
            {
              "t": "Remove the safety signal from the report, label the deaths unrelated, and promise postmarketing clarification after approval. Approval outranks the safety signal, in use.",
              "v": "danger",
              "fb": "That approach treats the desired approval result as more important than the safety record."
            }
          ]
        },
        {
          "q": "What conclusion should govern interpretation of the trial?",
          "o": [
            {
              "t": "The clinical-evidence lesson is that a signed form is not evidence of informed consent when material information is withheld. Every participant remains traceable, in use.",
              "v": "expert",
              "fb": "Correct: the choice keeps design, participants, outcomes, harms, and analysis traceable."
            },
            {
              "t": "Strong efficacy can justify incomplete adverse-event reporting when the overall trial reaches its primary endpoint. Missing follow-up still threatens the comparison, in use.",
              "v": "partial",
              "fb": "This improves the study but leaves a route for selection, missing data, or reporting bias."
            },
            {
              "t": "A low p value establishes that every recorded patient, outcome, and analysis decision is authentic. The design does not support that. The statistic does not establish conduct.",
              "v": "wrong",
              "fb": "That inference confuses statistical form with honest design or complete clinical evidence."
            },
            {
              "t": "The result is likely to be a lone investigator’s fraud or random noise, excluding sponsor-level suppression across the dataset. Approval pressure outranks the adverse-event record.",
              "v": "danger",
              "fb": "That approach treats the desired approval result as more important than the safety record."
            }
          ]
        }
      ]
    },
    "clinepi": {
      "sci": "Alvan Feinstein (1925-2001)",
      "topic": "Clinical epidemiology",
      "lede": "Alvan Feinstein used clinical epidemiology to keep trial conclusions answerable to patients and data.",
      "no": 8,
      "profile": "The clinical-evidence email today focuses on Alvan Feinstein and clinical epidemiology. Alvan Feinstein developed clinical epidemiology, stressing careful definitions, disease severity, comorbidity, and outcomes meaningful to patients. He criticized crude categories that hide important clinical differences. Trials create a comparison under rules chosen before outcomes are known. Feinstein’s contribution addresses one place where design, analysis, reporting, or ethics can protect that comparison from bias.\n\nThe disciplined approach is to define patient characteristics and outcomes with enough detail to make groups genuinely comparable. Protocols, allocation, exclusions, outcome definitions, adverse events, missing data, and analysis changes must remain traceable from the first participant to the final report.\n\nA statistically persuasive efficacy result can coexist with distorted safety data. Reclassification, selective follow-up, changed denominators, and unpublished outcomes alter the evidence without changing the trial’s polished headline. Independent monitoring and transparent reporting are therefore scientific controls.\n\nThe trial lesson: clean statistics cannot rescue vague or manipulated clinical data. Medical evidence deserves confidence only when every patient and every prespecified outcome can be accounted for. Harms should be reported by event, severity, timing, and treatment group rather than hidden inside a broad category. A post hoc explanation should be labeled as such and never replace the original analysis silently. Data-monitoring decisions should be dated and justified without access being broader than the committee’s role requires. Participant flow diagrams make exclusions visible when a final treatment table would otherwise hide them. Protocols and statistical-analysis plans should remain accessible after publication so readers can distinguish planned work from revision.",
      "frame": "Closes the glossy trial summary. \"The protocol came first. Start with clinical epidemiology.\"",
      "q": [
        {
          "q": "Which trial-method statement best captures Alvan Feinstein’s work on clinical epidemiology?",
          "o": [
            {
              "t": "Alvan Feinstein developed clinical epidemiology, stressing careful definitions, disease severity, comorbidity, and outcomes meaningful to patients. The prespecified analysis can be recovered exactly, in use.",
              "v": "expert",
              "fb": "Correct: the choice keeps design, participants, outcomes, harms, and analysis traceable."
            },
            {
              "t": "Alvan Feinstein advanced clinical epidemiology, yet the account reports the treatment estimate without allocation, follow-up, exclusions, or harm coding. The reporting path stays incomplete, in the record.",
              "v": "partial",
              "fb": "This improves the study but leaves a route for selection, missing data, or reporting bias."
            },
            {
              "t": "Alvan Feinstein is portrayed as showing that statistical significance is presented as showing the trial was randomized and the data complete. The design does not support that. The statistic does not establish conduct.",
              "v": "wrong",
              "fb": "That inference confuses statistical form with honest design or complete clinical evidence."
            },
            {
              "t": "Alvan Feinstein is invoked to recode adverse events after analysis because the efficacy result is commercially important. Recoding replaces evidence. Safety evidence is rewritten after unblinding, on site.",
              "v": "danger",
              "fb": "That approach treats the desired approval result as more important than the safety record."
            }
          ]
        },
        {
          "q": "Which practice most strongly protects the clinical comparison?",
          "o": [
            {
              "t": "Apply this trial procedure: define patient characteristics and outcomes with enough detail to make groups genuinely comparable. Every participant remains traceable, in use.",
              "v": "expert",
              "fb": "Correct: the choice keeps design, participants, outcomes, harms, and analysis traceable."
            },
            {
              "t": "Preserve randomization and the primary endpoint, but exclude incomplete participants and combine serious harms into a broad category. Missing outcomes remain unresolved.",
              "v": "partial",
              "fb": "This improves the study but leaves a route for selection, missing data, or reporting bias."
            },
            {
              "t": "Choose the most favorable analysis after unblinding and treat the resulting confidence interval as prespecified evidence. The statistical result does not establish honest conduct.",
              "v": "wrong",
              "fb": "That inference confuses statistical form with honest design or complete clinical evidence."
            },
            {
              "t": "Remove the safety signal from the report, label the deaths unrelated, and promise postmarketing clarification after approval. Approval outranks the safety signal, in use.",
              "v": "danger",
              "fb": "That approach treats the desired approval result as more important than the safety record."
            }
          ]
        },
        {
          "q": "What conclusion should govern interpretation of the trial?",
          "o": [
            {
              "t": "The clinical-evidence lesson is that clean statistics cannot rescue vague or manipulated clinical data. The prespecified analysis can be recovered exactly.",
              "v": "expert",
              "fb": "Correct: the choice keeps design, participants, outcomes, harms, and analysis traceable."
            },
            {
              "t": "Strong efficacy can justify incomplete adverse-event reporting when the overall trial reaches its primary endpoint. Missing outcomes remain unresolved, in use.",
              "v": "partial",
              "fb": "This improves the study but leaves a route for selection, missing data, or reporting bias."
            },
            {
              "t": "A low p value establishes that every recorded patient, outcome, and analysis decision is authentic. The statistical result does not establish honest conduct.",
              "v": "wrong",
              "fb": "That inference confuses statistical form with honest design or complete clinical evidence."
            },
            {
              "t": "The result is likely to be a lone investigator’s fraud or random noise, excluding sponsor-level suppression across the dataset. Approval outranks the safety signal.",
              "v": "danger",
              "fb": "That approach treats the desired approval result as more important than the safety record."
            }
          ]
        }
      ]
    },
    "consort": {
      "sci": "Doug Altman (1948-2018)",
      "topic": "Honest reporting of trials",
      "lede": "Clinical comparison became more honest through Doug Altman’s work on honest reporting of trials.",
      "no": 9,
      "profile": "The clinical-evidence email today focuses on Doug Altman and honest reporting of trials. Doug Altman was a leading medical statistician and a principal architect of the CONSORT reporting guidelines for randomized trials. He campaigned against poor methods, selective reporting, and the waste caused by inaccessible research. Trials create a comparison under rules chosen before outcomes are known. Altman’s contribution addresses one place where design, analysis, reporting, or ethics can protect that comparison from bias.\n\nThe disciplined approach is to report participant flow, prespecified outcomes, harms, protocol changes, and analysis transparently. Protocols, allocation, exclusions, outcome definitions, adverse events, missing data, and analysis changes must remain traceable from the first participant to the final report.\n\nA statistically persuasive efficacy result can coexist with distorted safety data. Reclassification, selective follow-up, changed denominators, and unpublished outcomes alter the evidence without changing the trial’s polished headline. Independent monitoring and transparent reporting are therefore scientific controls.\n\nThe trial lesson: unreported exclusions and outcomes can reverse the apparent balance of benefit and harm. Medical evidence deserves confidence only when every patient and every prespecified outcome can be accounted for. Harms should be reported by event, severity, timing, and treatment group rather than hidden inside a broad category. A post hoc explanation should be labeled as such and never replace the original analysis silently. Data-monitoring decisions should be dated and justified without access being broader than the committee’s role requires. Participant flow diagrams make exclusions visible when a final treatment table would otherwise hide them. Protocols and statistical-analysis plans should remain accessible after publication so readers can distinguish planned work from revision.",
      "frame": "Circles an outcome code. \"Statistics cannot correct a category changed after the event. Explain honest reporting of trials.\"",
      "q": [
        {
          "q": "Which trial-method statement best captures Doug Altman’s work on honest reporting of trials?",
          "o": [
            {
              "t": "Doug Altman was a leading medical statistician and a principal architect of the CONSORT reporting guidelines for randomized trials. The harm analysis stays visible.",
              "v": "expert",
              "fb": "Correct: the choice keeps design, participants, outcomes, harms, and analysis traceable."
            },
            {
              "t": "Doug Altman advanced honest reporting of trials, yet the account reports the treatment estimate without allocation, follow-up, exclusions, or harm coding, in use.",
              "v": "partial",
              "fb": "This improves the study but leaves a route for selection, missing data, or reporting bias."
            },
            {
              "t": "Doug Altman is portrayed as showing that statistical significance is presented as showing the trial was randomized and the data complete. The design does not support that.",
              "v": "wrong",
              "fb": "That inference confuses statistical form with honest design or complete clinical evidence."
            },
            {
              "t": "Doug Altman is invoked to recode adverse events after analysis because the efficacy result is commercially important. Approval outranks the safety signal, in use.",
              "v": "danger",
              "fb": "That approach treats the desired approval result as more important than the safety record."
            }
          ]
        },
        {
          "q": "Which practice most strongly protects the clinical comparison?",
          "o": [
            {
              "t": "Apply this trial procedure: report participant flow, prespecified outcomes, harms, protocol changes, and analysis transparently. The harm analysis stays visible, in use.",
              "v": "expert",
              "fb": "Correct: the choice keeps design, participants, outcomes, harms, and analysis traceable."
            },
            {
              "t": "Preserve randomization and the primary endpoint, but exclude incomplete participants and combine serious harms into a broad category. Missing outcomes remain unresolved.",
              "v": "partial",
              "fb": "This improves the study but leaves a route for selection, missing data, or reporting bias."
            },
            {
              "t": "Choose the most favorable analysis after unblinding and treat the resulting confidence interval as prespecified evidence. The statistical result does not establish honest conduct.",
              "v": "wrong",
              "fb": "That inference confuses statistical form with honest design or complete clinical evidence."
            },
            {
              "t": "Remove the safety signal from the report, label the deaths unrelated, and promise postmarketing clarification after approval. Approval outranks the safety signal, in use.",
              "v": "danger",
              "fb": "That approach treats the desired approval result as more important than the safety record."
            }
          ]
        },
        {
          "q": "What conclusion should govern interpretation of the trial?",
          "o": [
            {
              "t": "The clinical-evidence lesson is that unreported exclusions and outcomes can reverse the apparent balance of benefit and harm. Every participant remains traceable, in use.",
              "v": "expert",
              "fb": "Correct: the choice keeps design, participants, outcomes, harms, and analysis traceable."
            },
            {
              "t": "Strong efficacy can justify incomplete adverse-event reporting when the overall trial reaches its primary endpoint. Missing follow-up still threatens the comparison, in use.",
              "v": "partial",
              "fb": "This improves the study but leaves a route for selection, missing data, or reporting bias."
            },
            {
              "t": "A low p value establishes that every recorded patient, outcome, and analysis decision is authentic. The design does not support that. The statistic does not establish conduct.",
              "v": "wrong",
              "fb": "That inference confuses statistical form with honest design or complete clinical evidence."
            },
            {
              "t": "The result is likely to be a lone investigator’s fraud or random noise, excluding sponsor-level suppression across the dataset. Approval pressure outranks the adverse-event record.",
              "v": "danger",
              "fb": "That approach treats the desired approval result as more important than the safety record."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "trialnurse": {
      "site": "Trial Nurse Devi waits at the trial site & clinic with a patient form, an analysis table, and a version history. \"Saw the patients; the serious side effects she reported never reached the file. The event changed category without changing what happened to the patient.\"",
      "datacenter": "Trial Nurse Devi waits at the data-management center with a patient form, an analysis table, and a version history. \"Saw the patients; the serious side effects she reported never reached the file. The event changed category without changing what happened to the patient.\"",
      "headoffice": "Trial Nurse Devi waits at the sponsor's head office with a patient form, an analysis table, and a version history. \"Saw the patients; the serious side effects she reported never reached the file. The event changed category without changing what happened to the patient.\""
    },
    "stat": {
      "site": "The Statistician waits at the trial site & clinic with a patient form, an analysis table, and a version history. \"Runs the numbers; whole batches of adverse events were recoded as 'unrelated' before analysis. The event changed category without changing what happened to the patient.\"",
      "datacenter": "The Statistician waits at the data-management center with a patient form, an analysis table, and a version history. \"Runs the numbers; whole batches of adverse events were recoded as 'unrelated' before analysis. The event changed category without changing what happened to the patient.\"",
      "headoffice": "The Statistician waits at the sponsor's head office with a patient form, an analysis table, and a version history. \"Runs the numbers; whole batches of adverse events were recoded as 'unrelated' before analysis. The event changed category without changing what happened to the patient.\""
    },
    "clerk": {
      "site": "The Clerk waits at the trial site & clinic with a patient form, an analysis table, and a version history. \"Keeps the case-report forms — and the safety signal the sponsor sat on. The event changed category without changing what happened to the patient.\"",
      "datacenter": "The Clerk waits at the data-management center with a patient form, an analysis table, and a version history. \"Keeps the case-report forms — and the safety signal the sponsor sat on. The event changed category without changing what happened to the patient.\"",
      "headoffice": "The Clerk waits at the sponsor's head office with a patient form, an analysis table, and a version history. \"Keeps the case-report forms — and the safety signal the sponsor sat on. The event changed category without changing what happened to the patient.\""
    }
  },
  "story": [
    "<b>The Trial Data</b> begins inside the Verazol drug-trial inquiry, where the first explanation is already spreading faster than the evidence.",
    "<b>Trial Nurse Devi</b>, <b>The Statistician</b>, and <b>The Clerk</b> each hold a different part of the record, and each conversation opens with one real pioneer whose work changes how the evidence should be read.",
    "The inquiry keeps circling <b>A rogue investigator who faked the results</b> and <b>The deaths are unrelated — statistical noise</b>. Both are tempting, and neither can be accepted just because it makes the cleanest headline.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and make the final WHAT judgment from what you learned."
  ],
  "endings": {
    "overclaimWhat": "fraudsite",
    "dismissalWhat": "noise",
    "win": {
      "expertTitle": "Every Adverse Event Counted",
      "expert": [
        "You identify <b>Sable — the sponsor's clinical-trials director</b>, locate the complete safety and version records in <b>The Sponsor's Head Office</b>, and establish <b>Adverse-event data fabricated and suppressed behind the approval</b>. Not a rogue investigator who faked the results; not the deaths are unrelated — statistical noise.",
        "Case-report forms, recoding instructions, missing events, and the final analysis show coordinated sponsor-level distortion rather than one isolated site or random variation."
      ],
      "soundTitle": "The Safety Signal Restored",
      "sound": [
        "The reconstructed dataset supports your link between <b>Sable — the sponsor's clinical-trials director</b>, <b>Adverse-event data fabricated and suppressed behind the approval</b>, and <b>The Sponsor's Head Office</b>.",
        "Some event adjudications remain debatable, but systematic deletion and reclassification are already incompatible with an honest approval record."
      ],
      "namedTitle": "The Suppression Named",
      "named": [
        "Your accusation correctly selects <b>Sable — the sponsor's clinical-trials director</b>, <b>The Sponsor's Head Office</b>, and <b>Adverse-event data fabricated and suppressed behind the approval</b>.",
        "It needs more statistical detail, although it directs auditors to the participant flow, adverse-event coding, and sponsor correspondence."
      ]
    },
    "overclaim": {
      "title": "The Lone Fraudster Was Too Small",
      "body": [
        "You settle on <b>A rogue investigator who faked the results</b>, confining the misconduct to a single investigator before examining central data-management decisions.",
        "The narrow accusation misses repeated sponsor instructions and makes the broader, provable suppression look like overreach."
      ]
    },
    "dismissal": {
      "title": "Noise Did Not Recode Itself",
      "body": [
        "You accept <b>The deaths are unrelated — statistical noise</b>, allowing unexplained deaths to disappear inside a convenient null result.",
        "Noise cannot account for altered categories, omitted forms, and safety tables that changed after sponsor review."
      ]
    },
    "wrongNames": {
      "title": "Right Data Failure, Wrong Source",
      "body": [
        "You recognize <b>Adverse-event data fabricated and suppressed behind the approval</b>, yet assign it to the wrong trial actor or locate the decisive archive outside headquarters. The approval trail continues toward"
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A clinical-trial chart with missing adverse events\"><path d=\"M70 108 L70 30 L338 30 L338 108 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M92 88 L142 72 L194 76 L246 48 L310 54\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/><circle cx=\"194\" cy=\"76\" r=\"4\" fill=\"#B3261E\"/><path d=\"M390 34 L578 34 L578 106 L390 106 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.4\"/><path d=\"M410 54 L554 54 M410 72 L504 72 M410 90 L536 90\" stroke=\"#e2e2d8\" stroke-width=\"1.2\"/><path d=\"M500 64 L536 100\" stroke=\"#B3261E\" stroke-width=\"2\"/></svg>"
}};
