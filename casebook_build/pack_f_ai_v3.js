// Casebook V3 — three informants, three readings, one clue per correct answer.
module.exports = { PACK: {
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "f_ai",
  "title": "The Aegis Model",
  "discipline": "Artificial Intelligence & Machine Learning",
  "venue": "the Aegis model inquiry",
  "agent": {
    "name": "Investigator Wen Astor",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Artificial-Intelligence Pioneers",
  "dossierName": "ARTIFICIAL-INTELLIGENCE PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Aegis model inquiry",
  "DAYS_TOTAL": 3,
  "teaser": "A hiring model rejected qualified applicants from one group at a striking rate. Did it develop an independent objective, did a sound system encounter a few edge cases, or did approved data create a disparity that was measured and then hidden before launch?",
  "overclaimTag": "a runaway discriminatory model",
  "truthTag": "a measured data bias concealed at release",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A hiring model pipeline with unequal group outcomes and a suppressed validation report\"><rect x=\"55\" y=\"35\" width=\"135\" height=\"70\" rx=\"6\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M75 55 h95 M75 72 h95 M75 89 h60\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><path d=\"M190 70 H300\" stroke=\"#326891\" stroke-width=\"3\"/><circle cx=\"345\" cy=\"70\" r=\"35\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M335 48 v44 M355 48 v44\" stroke=\"#e2e2d8\" stroke-width=\"3\"/><path d=\"M380 70 H480\" stroke=\"#326891\" stroke-width=\"3\"/><rect x=\"480\" y=\"30\" width=\"125\" height=\"80\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><path d=\"M500 52 h85 M500 70 h60 M500 88 h75\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><path d=\"M490 40 l105 60 M595 40 l-105 60\" stroke=\"#B3261E\" stroke-width=\"3\"/></svg>",
  "overclaimTease": "Do not infer motive from output alone. Trace the training population, disaggregate the validation, and compare the warning that existed with the document that was signed.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "lead",
      "items": [
        {
          "id": "outsider",
          "label": "An outside data-poisoning crew"
        },
        {
          "id": "lead",
          "label": "Dr. Priya Sandoval — the model lead scientist"
        },
        {
          "id": "auditor",
          "label": "The external model auditor"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "evalroom",
      "items": [
        {
          "id": "datalab",
          "label": "The Training-Data Laboratory"
        },
        {
          "id": "evalroom",
          "label": "The Model Evaluation & Release Room"
        },
        {
          "id": "office",
          "label": "The Project Administration Office"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "biasdata",
      "items": [
        {
          "id": "sentient",
          "label": "The model developed an independent discriminatory objective"
        },
        {
          "id": "edgecases",
          "label": "A sound system produced a few unavoidable applicant errors"
        },
        {
          "id": "biasdata",
          "label": "Biased data created a measured gap that was hidden before launch"
        }
      ]
    }
  },
  "READING_ORDER": [
    "dataeng",
    "validator",
    "clerk"
  ],
  "CHARACTERS": {
    "dataeng": {
      "name": "The Data Engineer",
      "role": "Training-data engineer",
      "face": "🗄",
      "badge": "D",
      "legend": "the data inventory",
      "hint": "The approved historical sample scarcely includes groups screened out before interview.",
      "reading": "a_imagenet"
    },
    "validator": {
      "name": "The Validation Scientist",
      "role": "Model-validation scientist",
      "face": "📊",
      "badge": "V",
      "legend": "the subgroup dashboard",
      "hint": "Independent holdouts reproduce a large false-rejection gap hidden by the overall score.",
      "reading": "a_bias"
    },
    "clerk": {
      "name": "The Model Records Clerk",
      "role": "Documentation and release clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the version archive",
      "hint": "The warning disappeared from the final model card under the lead scientist’s credential.",
      "reading": "a_datacard"
    }
  },
  "TOPICS": {
    "a_imagenet": {
      "sci": "Fei-Fei Li (b. 1976)",
      "topic": "ImageNet and the data behind machine learning",
      "lede": "Fei-Fei Li showed that a learning system’s capabilities are shaped as much by its examples and labels as by its algorithm.",
      "no": 1,
      "profile": "Fei-Fei Li is a computer scientist whose work helped drive the modern transformation of computer vision. In the mid-2000s, researchers had many clever recognition algorithms but comparatively small, inconsistent training sets. Li argued that progress required a large, organized representation of the visual world. Her team built ImageNet, a database arranged around WordNet concepts and populated with millions of labeled images, using large-scale human annotation to make the project feasible.\n\nImageNet enabled a standardized challenge in which researchers could compare systems on the same categories and examples. The 2012 success of a deep convolutional network trained on the dataset helped demonstrate the power of combining large labeled data, graphics processors, and neural networks. Yet ImageNet also exposed a lasting lesson: datasets are designed artifacts. Category choices, collection methods, labels, and geographic or cultural coverage influence what a model learns and where it fails.\n\nMore data do not automatically mean representative data. A dataset can be enormous while rare groups, occupations, lighting conditions, or social contexts remain thinly sampled. Labels may reproduce historical decisions rather than objective truth. For a hiring system, “successful employee” examples may encode who was previously hired, promoted, or retained under earlier organizational biases. A model can learn that pattern faithfully and still produce unfair decisions.\n\nThe Aegis investigation begins in that distinction. The training archive contains many years of approved applicants but far fewer qualified candidates from groups historically screened out before interview. The model did not become sentient and invent a new prejudice. It optimized the target it was given. Li’s lesson is to examine the construction of the dataset before treating the model’s outputs as either mysterious autonomy or harmless edge cases. The first question is not how intelligent Aegis became, but whose past decisions its examples made normal.",
      "frame": "Projects the training distribution beside the company’s applicant pool. “Millions of rows can still leave whole groups nearly absent. Tell me what scale does—and does not—guarantee.”",
      "q": [
        {
          "q": "What was ImageNet’s major contribution to computer vision research?",
          "o": [
            {
              "t": "It proved that collecting more examples automatically removes bias from labels.",
              "v": "wrong",
              "fb": "Scale can amplify collection and labeling bias instead of erasing it."
            },
            {
              "t": "It showed that a model trained on enough data no longer needs human evaluation.",
              "v": "danger",
              "fb": "Large training sets still require evaluation of coverage, labels, and deployment context."
            },
            {
              "t": "It supplied a large labeled benchmark that made data-intensive methods comparable.",
              "v": "expert",
              "fb": "ImageNet standardized a large-scale data resource and challenge rather than inventing neural networks."
            },
            {
              "t": "It introduced the first neural network capable of recognizing any visual object.",
              "v": "partial",
              "fb": "Neural networks predated ImageNet, though the dataset helped reveal their later power."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — lead",
            "text": "Aegis learned from historical selections that systematically omitted qualified candidates before the model ever saw them."
          }
        },
        {
          "q": "Why can a very large hiring dataset remain unrepresentative?",
          "o": [
            {
              "t": "Every employment label is random once several departments contribute records.",
              "v": "wrong",
              "fb": "Multiple sources do not make labels random and may reproduce the same institutional practice."
            },
            {
              "t": "Past hiring decisions should be treated as objective ground truth by definition.",
              "v": "danger",
              "fb": "Historical outcomes can encode exclusion and should not be accepted as neutral truth."
            },
            {
              "t": "Large files become statistically unreliable simply because they contain too many rows.",
              "v": "partial",
              "fb": "Scale usually improves precision; the issue is biased inclusion, not file size itself."
            },
            {
              "t": "Historical selection can exclude groups before their examples ever enter the archive.",
              "v": "expert",
              "fb": "Selection before collection can preserve a large but systematically incomplete sample."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — lead",
            "text": "The training-data inventory and subgroup counts first expose the gap, but the consequential failure becomes visible in the Model Evaluation Room."
          }
        },
        {
          "q": "Which fact first directs responsibility toward the model leadership rather than an outside poisoner?",
          "o": [
            {
              "t": "The approved dataset contains the imbalance before any external access occurs.",
              "v": "expert",
              "fb": "Internal provenance locates the source in approved data construction rather than intrusion."
            },
            {
              "t": "Any biased output establishes that a malicious outsider inserted poisoned examples.",
              "v": "danger",
              "fb": "Bias can arise from ordinary historical data without any malicious poisoning campaign."
            },
            {
              "t": "The model lead is the most senior scientist listed on the project chart.",
              "v": "partial",
              "fb": "Seniority matters only when tied to decisions and evidence about the dataset."
            },
            {
              "t": "Applicants complained online after the first rejection notices were sent.",
              "v": "wrong",
              "fb": "Complaints identify harm but not who created the underlying training pattern."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — lead",
            "text": "The disputed training extract was an internally approved historical snapshot with no unauthorized additions or altered labels."
          }
        }
      ]
    },
    "a_bias": {
      "sci": "Joy Buolamwini (b. 1989)",
      "topic": "Algorithmic bias and disaggregated evaluation",
      "lede": "Joy Buolamwini demonstrated that a system advertised as accurate can fail sharply when results are separated by gender and skin type.",
      "no": 2,
      "profile": "Joy Buolamwini is a computer scientist and founder of the Algorithmic Justice League. While studying at the MIT Media Lab, she found that commercial face-analysis systems had difficulty detecting her face unless she wore a white mask. That experience became a research question about whose faces were represented in training and evaluation.\n\nWith Timnit Gebru, Buolamwini conducted the Gender Shades study, published in 2018. The researchers built a more balanced evaluation set using parliamentarians from African and European countries and assessed commercial gender-classification systems across skin type and gender presentation. Overall accuracy numbers concealed large disparities. The systems performed best on lighter-skinned men and worst on darker-skinned women, with error-rate gaps far larger than a single aggregate score suggested.\n\nThe study did not claim that every error reflected intention or that one benchmark captured every identity. Its methodological force came from disaggregation. A model can meet an impressive average while imposing concentrated harm on a smaller group. Evaluation therefore needs relevant subgroups, uncertainty, task validity, and an understanding of how errors affect people in the deployment context.\n\nAegis passed its headline accuracy target. The hidden table tells a different story: false rejections for one applicant group were several times higher, especially for candidates with nonlinear employment histories. The validation scientist reproduced the gap on a holdout set and warned that the model’s confidence score did not measure fairness. Buolamwini’s lesson separates rare edge cases from patterned failure. If the same group is rejected repeatedly across independent evaluation slices, the result is not a handful of unlucky mistakes. It is a property of the system that leadership was obliged to confront before launch.",
      "frame": "Replaces the single accuracy number with a grid of subgroup false-rejection rates. “The average is clean because the harmed group is small. Read the cells, not the headline.”",
      "q": [
        {
          "q": "What did the Gender Shades study reveal about aggregate accuracy?",
          "o": [
            {
              "t": "Any difference between groups indicates that the developer intentionally discriminated.",
              "v": "partial",
              "fb": "A disparity requires investigation, while intent is a separate evidentiary question."
            },
            {
              "t": "A strong average can conceal much worse performance for particular groups.",
              "v": "expert",
              "fb": "Disaggregation exposed concentrated errors that a single overall percentage obscured."
            },
            {
              "t": "Commercial systems were equally inaccurate for every skin type and gender group.",
              "v": "wrong",
              "fb": "The important finding was unequal performance, not uniformly poor accuracy."
            },
            {
              "t": "A model is fair whenever its total number of correct predictions remains high.",
              "v": "danger",
              "fb": "High total accuracy can coexist with serious and systematic subgroup harm."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — corroboration",
            "text": "The model’s overall score concealed a repeated subgroup false-rejection gap across independent validation slices."
          }
        },
        {
          "q": "Which evaluation best separates patterned bias from a few rare edge cases?",
          "o": [
            {
              "t": "A collection of memorable complaints selected after the model becomes controversial.",
              "v": "partial",
              "fb": "Complaints can surface harm but need representative testing to estimate a pattern."
            },
            {
              "t": "One overall accuracy score calculated on the complete applicant population.",
              "v": "wrong",
              "fb": "Aggregation is the very step that can hide subgroup failure."
            },
            {
              "t": "Repeated subgroup error gaps across independent and relevant holdout samples.",
              "v": "expert",
              "fb": "Replication across relevant slices shows a stable performance pattern rather than anecdotes."
            },
            {
              "t": "The absence of a statistically perfect test, treated as permission to ignore the gap.",
              "v": "danger",
              "fb": "Uncertainty should shape decisions, not erase a reproduced and consequential disparity."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — corroboration",
            "text": "The decisive table is the disaggregated holdout analysis preserved in the Model Evaluation Room before launch."
          }
        },
        {
          "q": "Who had authority to convert the validation warning into a launch decision?",
          "o": [
            {
              "t": "The data engineer who prepared the historical records under the approved specification.",
              "v": "partial",
              "fb": "Data preparation contributed to risk, but the release authority acted after seeing validation results."
            },
            {
              "t": "The outside auditor scheduled to review the system after deployment began.",
              "v": "wrong",
              "fb": "A later auditor cannot be the actor who removed evidence before launch."
            },
            {
              "t": "Every applicant rejected by the model shares responsibility for not fitting its pattern.",
              "v": "danger",
              "fb": "People harmed by a model do not become responsible for its design or deployment."
            },
            {
              "t": "The project lead who controlled the evaluation packet and final scientific sign-off.",
              "v": "expert",
              "fb": "Responsibility follows control over the evidence and the decision to proceed despite it."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — corroboration",
            "text": "The lead scientist removed the subgroup appendix from the release packet and signed the model as ready for deployment."
          }
        }
      ]
    },
    "a_datacard": {
      "sci": "Timnit Gebru (b. 1983)",
      "topic": "Datasheets, documentation, and accountable model release",
      "lede": "Timnit Gebru argued that datasets need records of origin, composition, limits, and intended use just as engineered components need specifications.",
      "no": 3,
      "profile": "Timnit Gebru is a computer scientist whose work has connected machine learning with questions of documentation, labor, power, and social impact. After research on computer vision and the Gender Shades project, she coauthored “Datasheets for Datasets,” proposing a structured form of documentation for data used to train and evaluate machine-learning systems.\n\nThe analogy comes from engineering. Electronic components arrive with datasheets describing operating conditions, tolerances, and limitations. Datasets often circulate without comparable records. Gebru and her collaborators proposed documenting motivation, composition, collection process, preprocessing, recommended uses, prohibited or unsuitable uses, maintenance, and known distributional concerns. Documentation does not make data unbiased, but it makes assumptions visible and reviewable.\n\nThis approach changes release governance. A model card or dataset sheet can preserve intended populations, subgroup results, caveats, and monitoring plans. If a project removes the uncomfortable sections while retaining the headline metric, investigators can compare drafts, version history, and sign-off records. Silence then becomes an action rather than an accidental absence.\n\nAegis had such a trail. The validation draft listed underrepresentation, the subgroup false-rejection gap, and a recommendation to delay deployment until the target and sampling plan were revised. The final packet kept the overall accuracy chart but omitted that section. Version history attributes the deletion to Dr. Priya Sandoval, followed by her scientific release signature. Gebru’s documentation principle completes the causal chain: biased historical data created the exposure, disaggregated evaluation measured it, and controlled documentation shows who buried the result and where. The system did not run away, and the harmed applicants were not isolated edge cases. A known limitation was converted into a public decision by removing the record that would have forced reconsideration.",
      "frame": "Opens two versions of the model card and highlights the missing subgroup section. “Documentation is evidence of what the team knew. A deletion can be a decision.”",
      "q": [
        {
          "q": "What is the purpose of a datasheet for a machine-learning dataset?",
          "o": [
            {
              "t": "To document origin, composition, intended uses, limitations, and maintenance.",
              "v": "expert",
              "fb": "Structured documentation makes assumptions and limits visible without claiming perfection."
            },
            {
              "t": "To replace technical testing with a short public-relations description of the model.",
              "v": "wrong",
              "fb": "Documentation supplements empirical evaluation rather than replacing it."
            },
            {
              "t": "To keep collection choices confidential so external criticism remains limited.",
              "v": "danger",
              "fb": "Concealing collection decisions undermines accountability and informed use."
            },
            {
              "t": "To certify that every label is objectively correct for all future applications.",
              "v": "partial",
              "fb": "A datasheet records label methods and uncertainty but cannot guarantee universal truth."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — decisive",
            "text": "Versioned model cards and evaluation appendices preserve the removed warning in the Model Evaluation Room’s release record."
          }
        },
        {
          "q": "Why is deleting a limitation from a release document evidentially important?",
          "o": [
            {
              "t": "It makes the data engineer solely responsible because the warning concerned training data.",
              "v": "danger",
              "fb": "The warning’s subject does not transfer release responsibility away from the signer who removed it."
            },
            {
              "t": "It identifies who controlled known risk information at the moment of release.",
              "v": "expert",
              "fb": "Authorship and timing connect knowledge of the risk to the authority that suppressed it."
            },
            {
              "t": "It establishes that every earlier contributor considered the limitation unimportant.",
              "v": "partial",
              "fb": "A final deletion cannot establish agreement from contributors whose warning was removed."
            },
            {
              "t": "It shows an automated formatter removed text while reducing the release file size.",
              "v": "wrong",
              "fb": "Version history attributes a substantive edit, not an automatic formatting operation."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — decisive",
            "text": "Version history ties the deletion and final scientific sign-off to Dr. Priya Sandoval."
          }
        },
        {
          "q": "What complete sequence best explains the Aegis outcome?",
          "o": [
            {
              "t": "An external crew inserted poisoned records despite clean internal provenance logs.",
              "v": "danger",
              "fb": "Internal provenance and version history contradict an outside poisoning campaign."
            },
            {
              "t": "A technically strong model made several unavoidable mistakes among unusual applicants.",
              "v": "partial",
              "fb": "The failures were repeated by subgroup and cannot be reduced to a few unusual cases."
            },
            {
              "t": "Biased examples produced a measured disparity that leadership concealed before deployment.",
              "v": "expert",
              "fb": "The causal chain links data construction, evaluation, and a documented release decision."
            },
            {
              "t": "The system became self-aware and independently changed its hiring objective.",
              "v": "wrong",
              "fb": "The model optimized its assigned objective and showed no autonomous goal change."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — decisive",
            "text": "Historical selection shaped the data, subgroup testing exposed the resulting gap, and the warning was removed before launch."
          }
        }
      ]
    }
  },
  "story": [
    "<b>Aegis rejected thousands of qualified applicants while reporting an impressive overall accuracy score.</b>",
    "The Data Engineer can reconstruct who entered the training archive. The Validation Scientist holds subgroup results. The records clerk has the model-card versions and release signature.",
    "The system may have developed its own discriminatory objective, produced a few unavoidable edge cases, or learned a historical pattern that leadership measured and chose not to disclose.",
    "Nine clues follow the outcome from data selection through subgroup testing to the final act of release."
  ],
  "endings": {
    "overclaimWhat": "sentient",
    "dismissalWhat": "edgecases",
    "win": {
      "expertTitle": "The Warning Removed Before Launch",
      "expert": [
        "You connect Dr. Priya Sandoval, the Model Evaluation & Release Room, and biased training data whose measured subgroup disparity was hidden before launch. Dataset provenance, disaggregated testing, and version history form one chain.",
        "Aegis did not develop an independent goal, and the rejected applicants were not a handful of unavoidable edge cases. Leadership saw a reproducible gap, removed it from the release record, and deployed the model unchanged."
      ],
      "soundTitle": "The Measured Bias and Buried Result",
      "sound": [
        "Your accusation identifies the lead scientist, the evaluation record, and the concealed disparity.",
        "Some data or version details remain incomplete, but the validation pattern supports the finding."
      ],
      "namedTitle": "Correct Model Failure, Thin Record",
      "named": [
        "You select the correct WHO, WHERE, and WHAT.",
        "The conclusion is right, although missed clues leave parts of the data-selection or document-deletion sequence less firmly established."
      ]
    },
    "overclaim": {
      "title": "The Model Followed Its Assigned Target",
      "body": [
        "Training provenance and objective records show no autonomous goal change or self-directed rewrite.",
        "The discrimination arose from approved examples and a launch decision, not a runaway intelligence."
      ]
    },
    "dismissal": {
      "title": "The Errors Were Patterned, Not Rare",
      "body": [
        "Independent holdouts reproduce the same subgroup false-rejection gap, and the result was important enough to appear in the draft model card.",
        "Calling the cases isolated mistakes ignores a measured system property and the decision to hide it."
      ]
    },
    "wrongNames": {
      "title": "The Bias, Misassigned",
      "body": [
        "You recognize the concealed disparity but place responsibility or culmination away from the release authority and evaluation record that converted it into deployment."
      ]
    }
  }
}
};
