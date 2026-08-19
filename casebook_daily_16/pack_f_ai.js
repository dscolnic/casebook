module.exports = { PACK: {
  "id": "f_ai",
  "title": "The Aegis Model",
  "discipline": "Artificial Intelligence & Machine Learning",
  "teaser": "A hiring model quietly rejected thousands who never had a chance. A runaway self-learning intelligence? A handful of rare mistakes? Or a result buried before launch?",
  "overclaimTag": "a runaway self-learning intelligence",
  "truthTag": "biased data and a buried warning",
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
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The WHERE you test determines the dossier, and the conversation costs one day.",
  "overclaimTease": "A runaway mind is dramatic; patterned outcomes still require ordinary evidence.",
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
          "label": "Dr. Priya Sandoval — the model's lead scientist"
        },
        {
          "id": "auditor",
          "label": "The external auditor"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "evalroom",
      "items": [
        {
          "id": "datalab",
          "label": "The Training-Data Lab"
        },
        {
          "id": "evalroom",
          "label": "The Model Evaluation Room"
        },
        {
          "id": "office",
          "label": "The Project Lead's Office"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "biasdata",
      "items": [
        {
          "id": "sentient",
          "label": "A runaway, self-teaching intelligence went rogue"
        },
        {
          "id": "edgecases",
          "label": "A few rare edge cases — the model works as designed"
        },
        {
          "id": "biasdata",
          "label": "Biased training data and a validation result buried before launch"
        }
      ]
    }
  },
  "PLACES": {
    "datalab": {
      "name": "The Training-Data Lab",
      "xy": [
        140,
        90
      ]
    },
    "evalroom": {
      "name": "The Model Evaluation Room",
      "xy": [
        330,
        240
      ]
    },
    "office": {
      "name": "The Project Lead's Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "datalab",
      "evalroom"
    ],
    [
      "evalroom",
      "office"
    ]
  ],
  "CHARACTERS": {
    "dataeng": {
      "name": "The Data Engineer",
      "role": "Training-data engineer",
      "face": "🗄",
      "badge": "D",
      "legend": "the data lab",
      "hint": "Assembled the training set; knows whole groups were barely in it."
    },
    "validator": {
      "name": "The Validation Scientist",
      "role": "Model-validation scientist",
      "face": "📊",
      "badge": "V",
      "legend": "the evaluation room",
      "hint": "Ran the fairness test; the failing result was pulled before release."
    },
    "clerk": {
      "name": "The Clerk",
      "role": "Project records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Keeps the sign-off file — and the ship order that overrode the warning."
    }
  },
  "TOPICMAP": {
    "datalab": {
      "dataeng": [
        "a_named"
      ],
      "validator": [
        "a_mlearn"
      ],
      "clerk": [
        "a_neuron"
      ]
    },
    "evalroom": {
      "dataeng": [
        "a_hebb"
      ],
      "validator": [
        "a_connect"
      ],
      "clerk": [
        "a_convnet"
      ]
    },
    "office": {
      "dataeng": [
        "a_causal"
      ],
      "validator": [
        "a_forests"
      ],
      "clerk": [
        "a_bias"
      ]
    }
  },
  "TOPICS": {
    "a_named": {
      "whatHint": "McCarthy founded AI as engineered search over rules and data — not a mind waking up. Ask what the training data and approvals contain, not what the software 'wanted.'",
      "sci": "John McCarthy (1927-2011)",
      "topic": "Artificial intelligence, named & founded",
      "lede": "John McCarthy made artificial intelligence, named and founded an explicit learning problem with capabilities and limits that could be tested.",
      "no": 1,
      "profile": "The machine-learning note for today considers John McCarthy and artificial intelligence, named and founded. John McCarthy helped organize the 1956 Dartmouth workshop that named artificial intelligence and later created Lisp, a language closely associated with early AI research. A model learns regularities from selected examples under a chosen objective. That makes data composition, labels, representation, optimization, and evaluation parts of the model itself. McCarthy’s contribution reveals one mechanism in that pipeline and the assumptions that mechanism cannot check on its own.\n\nThe usable practice is to represent knowledge symbolically, define operations over those representations, and separate general reasoning machinery from a particular problem. Teams should define the target, inspect population coverage, separate training from evaluation, report subgroup performance, test shifts in context, and preserve unsuccessful validation results. A high average score should not erase systematic error concentrated on people who were scarce in the data.\n\nMachine learning can produce behavior no programmer wrote as an explicit rule, but that does not make the system independent of human choices. Categories, proxies, historical outcomes, exclusions, and launch thresholds remain designed. Treating an adverse result as a rare edge case is especially dangerous when the deployment determines who receives employment, credit, care, or scrutiny.\n\nThe methodological lesson is a field advances by making its assumptions and representations explicit enough to test, revise, and share. A model earns trust through representative evidence, transparent limits, and evaluation tied to real consequences. Fairness metrics answer different questions, so the selected measure should match the harm and decision process under review.",
      "frame": "Separates the training and evaluation sheets. \"At The Training-Data Lab, an average can hide a population. Explain artificial intelligence, named and founded.\"",
      "q": [
        {
          "q": "Which machine-learning account best captures John McCarthy’s contribution to artificial intelligence, named and founded?",
          "o": [
            {
              "t": "John McCarthy helped organize the 1956 Dartmouth workshop that named artificial intelligence and later created Lisp, a language closely associated with early AI research. The fairness analysis keeps assumptions explicit.",
              "v": "expert",
              "fb": "Correct: model claims depend on data coverage, objective choice, subgroup evaluation, and deployment context."
            },
            {
              "t": "John McCarthy contributed to artificial intelligence, named and founded, yet the account reports average performance without examining coverage, subgroup error, or context shift. Deployment shift is still open in context.",
              "v": "partial",
              "fb": "Aggregate performance is informative but incomplete when errors are distributed unevenly across people."
            },
            {
              "t": "John McCarthy is portrayed as showing that optimization automatically removes biased history without changing the training data or objective. The objective does not guarantee that. The data history points elsewhere in practice.",
              "v": "wrong",
              "fb": "Learning reproduces signals available in data and objectives; it does not independently correct their history."
            },
            {
              "t": "John McCarthy is used to dismiss concentrated failures as rare edge cases because the headline benchmark remains impressive. Rarity becomes an excuse. Within the fairness analysis, assumption replaces verification in context.",
              "v": "danger",
              "fb": "A rare subgroup in the dataset can represent a large and predictable harmed population in deployment."
            }
          ]
        },
        {
          "q": "Which evaluation practice best applies the profile?",
          "o": [
            {
              "t": "For the model evaluation, apply this procedure: represent knowledge symbolically, define operations over those representations, and separate general reasoning machinery from a particular problem.",
              "v": "expert",
              "fb": "Correct: model claims depend on data coverage, objective choice, subgroup evaluation, and deployment context."
            },
            {
              "t": "Hold out more examples from the same pipeline, but rarely test underrepresented populations or the decisions made after deployment. Coverage remains uncertain. The fairness analysis leaves one test open.",
              "v": "partial",
              "fb": "Aggregate performance is informative but incomplete when errors are distributed unevenly across people."
            },
            {
              "t": "Infer fairness from training convergence and overall accuracy, without preserving the subgroup analysis or examining proxy variables. The objective does not guarantee that. The data history points elsewhere.",
              "v": "wrong",
              "fb": "Learning reproduces signals available in data and objectives; it does not independently correct their history."
            },
            {
              "t": "Release the model on schedule, remove the failing chart from the summary, and promise to collect harmed populations after launch. Average accuracy hides allocation harm. Rarity becomes an excuse.",
              "v": "danger",
              "fb": "A rare subgroup in the dataset can represent a large and predictable harmed population in deployment."
            }
          ]
        },
        {
          "q": "Which conclusion about model performance is most defensible?",
          "o": [
            {
              "t": "The model-governance lesson is that a field advances by making its assumptions and representations explicit enough to test, revise, and share. The evaluation can be reproduced.",
              "v": "expert",
              "fb": "Correct: model claims depend on data coverage, objective choice, subgroup evaluation, and deployment context."
            },
            {
              "t": "Strong aggregate prediction justifies deployment while documentation gaps and subgroup disparities are treated as research questions. The fairness analysis leaves one test open.",
              "v": "partial",
              "fb": "Aggregate performance is informative but incomplete when errors are distributed unevenly across people."
            },
            {
              "t": "A self-adjusting model is independent of human choices because no programmer explicitly wrote the final pattern of rejection. The fairness analysis defeats that inference in the case file.",
              "v": "wrong",
              "fb": "Learning reproduces signals available in data and objectives; it does not independently correct their history."
            },
            {
              "t": "The system is treated as a runaway intelligence or merely suffer harmless edge cases, excluding a documented data and approval failure. Under the fairness analysis, warning is postponed.",
              "v": "danger",
              "fb": "A rare subgroup in the dataset can represent a large and predictable harmed population in deployment."
            }
          ]
        }
      ]
    },
    "a_mlearn": {
      "whatHint": "Samuel's machines learn only what the data show them. A biased lesson comes from a biased corpus; ask what the set contained and what it left out.",
      "sci": "Arthur Samuel (1901-1990)",
      "topic": "Machine learning from data",
      "lede": "Arthur Samuel showed how machine learning from data can learn useful structure while preserving important blind spots.",
      "no": 2,
      "profile": "The machine-learning note for today considers Arthur Samuel and machine learning from data. Arthur Samuel built a checkers program that improved through experience and helped popularize the term machine learning. A model learns regularities from selected examples under a chosen objective. That makes data composition, labels, representation, optimization, and evaluation parts of the model itself. Samuel’s contribution reveals one mechanism in that pipeline and the assumptions that mechanism cannot check on its own.\n\nThe usable practice is to define a performance measure, extract features from positions, update evaluation weights from play, and compare the learned policy with prior versions. Teams should define the target, inspect population coverage, separate training from evaluation, report subgroup performance, test shifts in context, and preserve unsuccessful validation results. A high average score should not erase systematic error concentrated on people who were scarce in the data.\n\nMachine learning can produce behavior no programmer wrote as an explicit rule, but that does not make the system independent of human choices. Categories, proxies, historical outcomes, exclusions, and launch thresholds remain designed. Treating an adverse result as a rare edge case is especially dangerous when the deployment determines who receives employment, credit, care, or scrutiny.\n\nThe methodological lesson is learning requires a measurable objective and representative experience, not merely code that changes itself. A model earns trust through representative evidence, transparent limits, and evaluation tied to real consequences. A validation set drawn from the same narrow pipeline can repeat the training set’s blind spots with impressive consistency. Fairness metrics answer different questions, so the selected measure should match the harm and decision process under review.",
      "frame": "Points to a missing cohort. \"The model learned from what we gave it. Tell me what machine learning from data cannot repair alone.\"",
      "q": [
        {
          "q": "Which machine-learning account best captures Arthur Samuel’s contribution to machine learning from data?",
          "o": [
            {
              "t": "Arthur Samuel built a checkers program that improved through experience and helped popularize the term machine learning. The evaluation can be reproduced. The fairness analysis keeps assumptions explicit.",
              "v": "expert",
              "fb": "Correct: model claims depend on data coverage, objective choice, subgroup evaluation, and deployment context."
            },
            {
              "t": "Arthur Samuel contributed to machine learning from data, yet the account reports average performance without examining coverage, subgroup error, or context shift. Deployment shift is still open in context.",
              "v": "partial",
              "fb": "Aggregate performance is informative but incomplete when errors are distributed unevenly across people."
            },
            {
              "t": "Arthur Samuel is portrayed as showing that optimization automatically removes biased history without changing the training data or objective. Under the fairness analysis, direct comparison fails in context.",
              "v": "wrong",
              "fb": "Learning reproduces signals available in data and objectives; it does not independently correct their history."
            },
            {
              "t": "Arthur Samuel is used to dismiss concentrated failures as rare edge cases because the headline benchmark remains impressive. Rarity becomes an excuse. Under the fairness analysis, warning is postponed in practice.",
              "v": "danger",
              "fb": "A rare subgroup in the dataset can represent a large and predictable harmed population in deployment."
            }
          ]
        },
        {
          "q": "Which evaluation practice best applies the profile?",
          "o": [
            {
              "t": "For the model evaluation, apply this procedure: define a performance measure, extract features from positions, update evaluation weights from play, and compare the learned policy with prior versions.",
              "v": "expert",
              "fb": "Correct: model claims depend on data coverage, objective choice, subgroup evaluation, and deployment context."
            },
            {
              "t": "Hold out more examples from the same pipeline, but rarely test underrepresented populations or the decisions made after deployment. Coverage remains uncertain. The fairness analysis leaves one test open.",
              "v": "partial",
              "fb": "Aggregate performance is informative but incomplete when errors are distributed unevenly across people."
            },
            {
              "t": "Infer fairness from training convergence and overall accuracy, without preserving the subgroup analysis or examining proxy variables. The objective does not guarantee that. The data history points elsewhere.",
              "v": "wrong",
              "fb": "Learning reproduces signals available in data and objectives; it does not independently correct their history."
            },
            {
              "t": "Release the model on schedule, remove the failing chart from the summary, and promise to collect harmed populations after launch. Average accuracy hides allocation harm. Rarity becomes an excuse.",
              "v": "danger",
              "fb": "A rare subgroup in the dataset can represent a large and predictable harmed population in deployment."
            }
          ]
        },
        {
          "q": "Which conclusion about model performance is most defensible?",
          "o": [
            {
              "t": "The model-governance lesson is that learning requires a measurable objective and representative experience, not merely code that changes itself. The evaluation can be reproduced.",
              "v": "expert",
              "fb": "Correct: model claims depend on data coverage, objective choice, subgroup evaluation, and deployment context."
            },
            {
              "t": "Strong aggregate prediction justifies deployment while documentation gaps and subgroup disparities are treated as research questions. The fairness analysis leaves one test open.",
              "v": "partial",
              "fb": "Aggregate performance is informative but incomplete when errors are distributed unevenly across people."
            },
            {
              "t": "A self-adjusting model is independent of human choices because no programmer explicitly wrote the final pattern of rejection. The fairness analysis defeats that inference in the case file.",
              "v": "wrong",
              "fb": "Learning reproduces signals available in data and objectives; it does not independently correct their history."
            },
            {
              "t": "The system is treated as a runaway intelligence or merely suffer harmless edge cases, excluding a documented data and approval failure. Under the fairness analysis, warning is postponed.",
              "v": "danger",
              "fb": "A rare subgroup in the dataset can represent a large and predictable harmed population in deployment."
            }
          ]
        }
      ]
    },
    "a_neuron": {
      "whatHint": "McCulloch's neuron is arithmetic, not intent. Behaviour that looks willful is usually a pattern in the inputs; ask which inputs.",
      "sci": "Warren McCulloch (1898-1969)",
      "topic": "The artificial neuron",
      "lede": "Data and representation meet in Warren McCulloch’s approach to the artificial neuron.",
      "no": 3,
      "profile": "The machine-learning note for today considers Warren McCulloch and the artificial neuron. Warren McCulloch and Walter Pitts proposed a mathematical neuron in 1943 whose thresholded inputs could implement logical operations in networks. A model learns regularities from selected examples under a chosen objective. That makes data composition, labels, representation, optimization, and evaluation parts of the model itself. McCulloch’s contribution reveals one mechanism in that pipeline and the assumptions that mechanism cannot check on its own.\n\nThe usable practice is to model each unit as combining binary inputs, applying a threshold, and connecting units into circuits that compute propositions. Teams should define the target, inspect population coverage, separate training from evaluation, report subgroup performance, test shifts in context, and preserve unsuccessful validation results. A high average score should not erase systematic error concentrated on people who were scarce in the data.\n\nMachine learning can produce behavior no programmer wrote as an explicit rule, but that does not make the system independent of human choices. Categories, proxies, historical outcomes, exclusions, and launch thresholds remain designed. Treating an adverse result as a rare edge case is especially dangerous when the deployment determines who receives employment, credit, care, or scrutiny.\n\nThe methodological lesson is a simplified biological analogy can reveal computational principles without reproducing the full behavior of a living neuron. A model earns trust through representative evidence, transparent limits, and evaluation tied to real consequences. Documentation should preserve who made each data and threshold choice, not only the final model weights. A validation set drawn from the same narrow pipeline can repeat the training set’s blind spots with impressive consistency.",
      "frame": "Restores a deleted subgroup plot. \"The score passed until we asked who failed. Show me the artificial neuron.\"",
      "q": [
        {
          "q": "Which machine-learning account best captures Warren McCulloch’s contribution to the artificial neuron?",
          "o": [
            {
              "t": "Warren McCulloch and Walter Pitts proposed a mathematical neuron in 1943 whose thresholded inputs could implement logical operations in networks. The fairness analysis keeps assumptions explicit.",
              "v": "expert",
              "fb": "Correct: model claims depend on data coverage, objective choice, subgroup evaluation, and deployment context."
            },
            {
              "t": "Warren McCulloch contributed to the artificial neuron, yet the account reports average performance without examining coverage, subgroup error, or context shift. Coverage remains uncertain.",
              "v": "partial",
              "fb": "Aggregate performance is informative but incomplete when errors are distributed unevenly across people."
            },
            {
              "t": "Warren McCulloch is portrayed as showing that optimization automatically removes biased history without changing the training data or objective. The fairness analysis defeats that inference.",
              "v": "wrong",
              "fb": "Learning reproduces signals available in data and objectives; it does not independently correct their history."
            },
            {
              "t": "Warren McCulloch is used to dismiss concentrated failures as rare edge cases because the headline benchmark remains impressive. Inside the fairness analysis, the claim outruns checks.",
              "v": "danger",
              "fb": "A rare subgroup in the dataset can represent a large and predictable harmed population in deployment."
            }
          ]
        },
        {
          "q": "Which evaluation practice best applies the profile?",
          "o": [
            {
              "t": "For the model evaluation, apply this procedure: model each unit as combining binary inputs, applying a threshold, and connecting units into circuits that compute propositions.",
              "v": "expert",
              "fb": "Correct: model claims depend on data coverage, objective choice, subgroup evaluation, and deployment context."
            },
            {
              "t": "Hold out more examples from the same pipeline, but rarely test underrepresented populations or the decisions made after deployment. The fairness analysis leaves one test open.",
              "v": "partial",
              "fb": "Aggregate performance is informative but incomplete when errors are distributed unevenly across people."
            },
            {
              "t": "Infer fairness from training convergence and overall accuracy, without preserving the subgroup analysis or examining proxy variables. The fairness analysis defeats that inference.",
              "v": "wrong",
              "fb": "Learning reproduces signals available in data and objectives; it does not independently correct their history."
            },
            {
              "t": "Release the model on schedule, remove the failing chart from the summary, and promise to collect harmed populations after launch. Average accuracy hides allocation harm.",
              "v": "danger",
              "fb": "A rare subgroup in the dataset can represent a large and predictable harmed population in deployment."
            }
          ]
        },
        {
          "q": "Which conclusion about model performance is most defensible?",
          "o": [
            {
              "t": "The model-governance lesson is that a simplified biological analogy can reveal computational principles without reproducing the full behavior of a living neuron in the case file.",
              "v": "expert",
              "fb": "Correct: model claims depend on data coverage, objective choice, subgroup evaluation, and deployment context."
            },
            {
              "t": "Strong aggregate prediction justifies deployment while documentation gaps and subgroup disparities are treated as research questions. Coverage remains uncertain in the case file.",
              "v": "partial",
              "fb": "Aggregate performance is informative but incomplete when errors are distributed unevenly across people."
            },
            {
              "t": "A self-adjusting model is independent of human choices because no programmer explicitly wrote the final pattern of rejection. The data history points elsewhere in the case file.",
              "v": "wrong",
              "fb": "Learning reproduces signals available in data and objectives; it does not independently correct their history."
            },
            {
              "t": "The system is treated as a runaway intelligence or merely suffer harmless edge cases, excluding a documented data and approval failure. Average accuracy hides allocation harm.",
              "v": "danger",
              "fb": "A rare subgroup in the dataset can represent a large and predictable harmed population in deployment."
            }
          ]
        }
      ]
    },
    "a_hebb": {
      "whatHint": "Hebb showed learning strengthens whatever the data repeat. If whole groups were thin in the data, ask what the model failed to learn about them.",
      "sci": "Donald Hebb (1904-1985)",
      "topic": "Hebbian learning",
      "lede": "Donald Hebb made Hebbian learning an explicit learning problem with capabilities and limits that could be tested.",
      "no": 4,
      "profile": "The machine-learning note for today considers Donald Hebb and Hebbian learning. Donald Hebb's 1949 theory proposed that coordinated neural activity could strengthen connections and form cell assemblies supporting learning and memory. A model learns regularities from selected examples under a chosen objective. That makes data composition, labels, representation, optimization, and evaluation parts of the model itself. Hebb’s contribution reveals one mechanism in that pipeline and the assumptions that mechanism cannot check on its own.\n\nThe usable practice is to increase a connection when pre- and postsynaptic activity repeatedly coincide, while using additional mechanisms to keep learning stable. Teams should define the target, inspect population coverage, separate training from evaluation, report subgroup performance, test shifts in context, and preserve unsuccessful validation results. A high average score should not erase systematic error concentrated on people who were scarce in the data.\n\nMachine learning can produce behavior no programmer wrote as an explicit rule, but that does not make the system independent of human choices. Categories, proxies, historical outcomes, exclusions, and launch thresholds remain designed. Treating an adverse result as a rare edge case is especially dangerous when the deployment determines who receives employment, credit, care, or scrutiny.\n\nThe methodological lesson is local correlation can build representation, but correlation alone does not establish causation or prevent runaway reinforcement. A model earns trust through representative evidence, transparent limits, and evaluation tied to real consequences. Fairness metrics answer different questions, so the selected measure should match the harm and decision process under review. Documentation should preserve who made each data and threshold choice, not only the final model weights.",
      "frame": "Separates the training and evaluation sheets. \"At The Model Evaluation Room, an average can hide a population. Explain Hebbian learning.\"",
      "q": [
        {
          "q": "Which machine-learning account best captures Donald Hebb’s contribution to Hebbian learning?",
          "o": [
            {
              "t": "Donald Hebb's 1949 theory proposed that coordinated neural activity could strengthen connections and form cell assemblies supporting learning and memory. The evaluation can be reproduced.",
              "v": "expert",
              "fb": "Correct: model claims depend on data coverage, objective choice, subgroup evaluation, and deployment context."
            },
            {
              "t": "Donald Hebb contributed to Hebbian learning, yet the account reports average performance without examining coverage, subgroup error, or context shift. Coverage remains uncertain.",
              "v": "partial",
              "fb": "Aggregate performance is informative but incomplete when errors are distributed unevenly across people."
            },
            {
              "t": "Donald Hebb is portrayed as showing that optimization automatically removes biased history without changing the training data or objective. The objective does not guarantee that.",
              "v": "wrong",
              "fb": "Learning reproduces signals available in data and objectives; it does not independently correct their history."
            },
            {
              "t": "Donald Hebb is used to dismiss concentrated failures as rare edge cases because the headline benchmark remains impressive. Inside the fairness analysis, drama displaces testing.",
              "v": "danger",
              "fb": "A rare subgroup in the dataset can represent a large and predictable harmed population in deployment."
            }
          ]
        },
        {
          "q": "Which evaluation practice best applies the profile?",
          "o": [
            {
              "t": "For the model evaluation, apply this procedure: increase a connection when pre- and postsynaptic activity repeatedly coincide, while using additional mechanisms to keep learning stable.",
              "v": "expert",
              "fb": "Correct: model claims depend on data coverage, objective choice, subgroup evaluation, and deployment context."
            },
            {
              "t": "Hold out more examples from the same pipeline, but rarely test underrepresented populations or the decisions made after deployment. Support across the fairness analysis stays partial.",
              "v": "partial",
              "fb": "Aggregate performance is informative but incomplete when errors are distributed unevenly across people."
            },
            {
              "t": "Infer fairness from training convergence and overall accuracy, without preserving the subgroup analysis or examining proxy variables. Under the fairness analysis, direct comparison fails.",
              "v": "wrong",
              "fb": "Learning reproduces signals available in data and objectives; it does not independently correct their history."
            },
            {
              "t": "Release the model on schedule, remove the failing chart from the summary, and promise to collect harmed populations after launch. Under the fairness analysis, warning is postponed.",
              "v": "danger",
              "fb": "A rare subgroup in the dataset can represent a large and predictable harmed population in deployment."
            }
          ]
        },
        {
          "q": "Which conclusion about model performance is most defensible?",
          "o": [
            {
              "t": "The model-governance lesson is that local correlation can build representation, but correlation alone does not establish causation or prevent runaway reinforcement in the case file.",
              "v": "expert",
              "fb": "Correct: model claims depend on data coverage, objective choice, subgroup evaluation, and deployment context."
            },
            {
              "t": "Strong aggregate prediction justifies deployment while documentation gaps and subgroup disparities are treated as research questions. Coverage remains uncertain in the case file.",
              "v": "partial",
              "fb": "Aggregate performance is informative but incomplete when errors are distributed unevenly across people."
            },
            {
              "t": "A self-adjusting model is independent of human choices because no programmer explicitly wrote the final pattern of rejection. The data history points elsewhere in the case file.",
              "v": "wrong",
              "fb": "Learning reproduces signals available in data and objectives; it does not independently correct their history."
            },
            {
              "t": "The system is treated as a runaway intelligence or merely suffer harmless edge cases, excluding a documented data and approval failure. Average accuracy hides allocation harm.",
              "v": "danger",
              "fb": "A rare subgroup in the dataset can represent a large and predictable harmed population in deployment."
            }
          ]
        }
      ]
    },
    "a_connect": {
      "whatHint": "Rumelhart's training drives error down on average — which can hide a group where it stays high. Ask whether a withheld test showed concentrated, not scattered, failure.",
      "sci": "David Rumelhart (1942-2011)",
      "topic": "Backprop & connectionism",
      "lede": "David Rumelhart showed how backprop and connectionism can learn useful structure while preserving important blind spots.",
      "no": 5,
      "profile": "The machine-learning note for today considers David Rumelhart and backprop and connectionism. David Rumelhart, Geoffrey Hinton, and Ronald Williams demonstrated the power of backpropagation in 1986 and helped revive connectionist models of cognition. A model learns regularities from selected examples under a chosen objective. That makes data composition, labels, representation, optimization, and evaluation parts of the model itself. Rumelhart’s contribution reveals one mechanism in that pipeline and the assumptions that mechanism cannot check on its own.\n\nThe usable practice is to learn distributed internal representations by repeatedly comparing outputs with targets and propagating error through intermediate units. Teams should define the target, inspect population coverage, separate training from evaluation, report subgroup performance, test shifts in context, and preserve unsuccessful validation results. A high average score should not erase systematic error concentrated on people who were scarce in the data.\n\nMachine learning can produce behavior no programmer wrote as an explicit rule, but that does not make the system independent of human choices. Categories, proxies, historical outcomes, exclusions, and launch thresholds remain designed. Treating an adverse result as a rare edge case is especially dangerous when the deployment determines who receives employment, credit, care, or scrutiny.\n\nThe methodological lesson is hidden representations can discover useful structure, but their meaning and failure modes may not be obvious from final accuracy. A model earns trust through representative evidence, transparent limits, and evaluation tied to real consequences. A validation set drawn from the same narrow pipeline can repeat the training set’s blind spots with impressive consistency.",
      "frame": "Points to a missing cohort. \"The model learned from what we gave it. Tell me what backprop and connectionism cannot repair alone.\"",
      "q": [
        {
          "q": "Which machine-learning account best captures David Rumelhart’s contribution to backprop and connectionism?",
          "o": [
            {
              "t": "David Rumelhart, Geoffrey Hinton, and Ronald Williams demonstrated the power of backpropagation in 1986 and helped revive connectionist models of cognition. The fairness analysis keeps assumptions explicit.",
              "v": "expert",
              "fb": "Correct: model claims depend on data coverage, objective choice, subgroup evaluation, and deployment context."
            },
            {
              "t": "David Rumelhart contributed to backprop and connectionism, yet the account reports average performance without examining coverage, subgroup error, or context shift. Deployment shift is still open.",
              "v": "partial",
              "fb": "Aggregate performance is informative but incomplete when errors are distributed unevenly across people."
            },
            {
              "t": "David Rumelhart is portrayed as showing that optimization automatically removes biased history without changing the training data or objective. Under the fairness analysis, direct comparison fails.",
              "v": "wrong",
              "fb": "Learning reproduces signals available in data and objectives; it does not independently correct their history."
            },
            {
              "t": "David Rumelhart is used to dismiss concentrated failures as rare edge cases because the headline benchmark remains impressive. Rarity becomes an excuse. Under the fairness analysis, warning is postponed.",
              "v": "danger",
              "fb": "A rare subgroup in the dataset can represent a large and predictable harmed population in deployment."
            }
          ]
        },
        {
          "q": "Which evaluation practice best applies the profile?",
          "o": [
            {
              "t": "For the model evaluation, apply this procedure: learn distributed internal representations by repeatedly comparing outputs with targets and propagating error through intermediate units.",
              "v": "expert",
              "fb": "Correct: model claims depend on data coverage, objective choice, subgroup evaluation, and deployment context."
            },
            {
              "t": "Hold out more examples from the same pipeline, but rarely test underrepresented populations or the decisions made after deployment. Support across the fairness analysis stays partial.",
              "v": "partial",
              "fb": "Aggregate performance is informative but incomplete when errors are distributed unevenly across people."
            },
            {
              "t": "Infer fairness from training convergence and overall accuracy, without preserving the subgroup analysis or examining proxy variables. Under the fairness analysis, direct comparison fails.",
              "v": "wrong",
              "fb": "Learning reproduces signals available in data and objectives; it does not independently correct their history."
            },
            {
              "t": "Release the model on schedule, remove the failing chart from the summary, and promise to collect harmed populations after launch. Under the fairness analysis, warning is postponed.",
              "v": "danger",
              "fb": "A rare subgroup in the dataset can represent a large and predictable harmed population in deployment."
            }
          ]
        },
        {
          "q": "Which conclusion about model performance is most defensible?",
          "o": [
            {
              "t": "The model-governance lesson is that hidden representations can discover useful structure, but their meaning and failure modes may not be obvious from final accuracy in the case file.",
              "v": "expert",
              "fb": "Correct: model claims depend on data coverage, objective choice, subgroup evaluation, and deployment context."
            },
            {
              "t": "Strong aggregate prediction justifies deployment while documentation gaps and subgroup disparities are treated as research questions. Coverage remains uncertain in the case file.",
              "v": "partial",
              "fb": "Aggregate performance is informative but incomplete when errors are distributed unevenly across people."
            },
            {
              "t": "A self-adjusting model is independent of human choices because no programmer explicitly wrote the final pattern of rejection. The data history points elsewhere in the case file.",
              "v": "wrong",
              "fb": "Learning reproduces signals available in data and objectives; it does not independently correct their history."
            },
            {
              "t": "The system is treated as a runaway intelligence or merely suffer harmless edge cases, excluding a documented data and approval failure. Average accuracy hides allocation harm.",
              "v": "danger",
              "fb": "A rare subgroup in the dataset can represent a large and predictable harmed population in deployment."
            }
          ]
        }
      ]
    },
    "a_convnet": {
      "whatHint": "LeCun's networks are only as fair as their examples. Ask whether the failures cluster on the under-sampled groups rather than falling at random.",
      "sci": "Yann LeCun (b. 1960)",
      "topic": "Convolutional networks",
      "lede": "Yann LeCun made convolutional networks practical by exploiting the repeated spatial structure found in images.",
      "no": 6,
      "profile": "The machine-learning note for today considers Yann LeCun and convolutional networks. Yann LeCun developed convolutional neural networks and applied them successfully to handwritten-character recognition through systems such as LeNet. A model learns regularities from selected examples under a chosen objective. That makes data composition, labels, representation, optimization, and evaluation parts of the model itself. LeCun’s contribution reveals one mechanism in that pipeline and the assumptions that mechanism cannot check on its own.\n\nThe usable practice is to share small filters across an image, build spatial hierarchies, and train the feature extractors jointly with the classifier. Teams should define the target, inspect population coverage, separate training from evaluation, report subgroup performance, test shifts in context, and preserve unsuccessful validation results. A high average score should not erase systematic error concentrated on people who were scarce in the data.\n\nMachine learning can produce behavior no programmer wrote as an explicit rule, but that does not make the system independent of human choices. Categories, proxies, historical outcomes, exclusions, and launch thresholds remain designed. Treating an adverse result as a rare edge case is especially dangerous when the deployment determines who receives employment, credit, care, or scrutiny.\n\nThe methodological lesson is built-in assumptions about locality and translation improve learning when they match the data, but can mislead when the task violates them. A model earns trust through representative evidence, transparent limits, and evaluation tied to real consequences. Documentation should preserve who made each data and threshold choice, not only the final model weights. A validation set drawn from the same narrow pipeline can repeat the training set’s blind spots with impressive consistency.",
      "frame": "Restores a deleted subgroup plot. \"The score passed until we asked who failed. Show me convolutional networks.\"",
      "q": [
        {
          "q": "Which machine-learning account best captures Yann LeCun’s contribution to convolutional networks?",
          "o": [
            {
              "t": "Yann LeCun developed convolutional neural networks and applied them successfully to handwritten-character recognition through systems such as LeNet. Subgroup error remains measurable.",
              "v": "expert",
              "fb": "Correct: model claims depend on data coverage, objective choice, subgroup evaluation, and deployment context."
            },
            {
              "t": "Yann LeCun contributed to convolutional networks, yet the account reports average performance without examining coverage, subgroup error, or context shift. Coverage remains uncertain.",
              "v": "partial",
              "fb": "Aggregate performance is informative but incomplete when errors are distributed unevenly across people."
            },
            {
              "t": "Yann LeCun is portrayed as showing that optimization automatically removes biased history without changing the training data or objective. The objective does not guarantee that.",
              "v": "wrong",
              "fb": "Learning reproduces signals available in data and objectives; it does not independently correct their history."
            },
            {
              "t": "Yann LeCun is used to dismiss concentrated failures as rare edge cases because the headline benchmark remains impressive. Inside the fairness analysis, the claim outruns checks.",
              "v": "danger",
              "fb": "A rare subgroup in the dataset can represent a large and predictable harmed population in deployment."
            }
          ]
        },
        {
          "q": "Which evaluation practice best applies the profile?",
          "o": [
            {
              "t": "For the model evaluation, apply this procedure: share small filters across an image, build spatial hierarchies, and train the feature extractors jointly with the classifier.",
              "v": "expert",
              "fb": "Correct: model claims depend on data coverage, objective choice, subgroup evaluation, and deployment context."
            },
            {
              "t": "Hold out more examples from the same pipeline, but rarely test underrepresented populations or the decisions made after deployment. The fairness analysis leaves one test open.",
              "v": "partial",
              "fb": "Aggregate performance is informative but incomplete when errors are distributed unevenly across people."
            },
            {
              "t": "Infer fairness from training convergence and overall accuracy, without preserving the subgroup analysis or examining proxy variables. The fairness analysis defeats that inference.",
              "v": "wrong",
              "fb": "Learning reproduces signals available in data and objectives; it does not independently correct their history."
            },
            {
              "t": "Release the model on schedule, remove the failing chart from the summary, and promise to collect harmed populations after launch. Average accuracy hides allocation harm.",
              "v": "danger",
              "fb": "A rare subgroup in the dataset can represent a large and predictable harmed population in deployment."
            }
          ]
        },
        {
          "q": "Which conclusion about model performance is most defensible?",
          "o": [
            {
              "t": "The model-governance lesson is that built-in assumptions about locality and translation improve learning when they match the data, but can mislead when the task violates them in the case file.",
              "v": "expert",
              "fb": "Correct: model claims depend on data coverage, objective choice, subgroup evaluation, and deployment context."
            },
            {
              "t": "Strong aggregate prediction justifies deployment while documentation gaps and subgroup disparities are treated as research questions. The fairness analysis leaves one test open in the case file.",
              "v": "partial",
              "fb": "Aggregate performance is informative but incomplete when errors are distributed unevenly across people."
            },
            {
              "t": "A self-adjusting model is independent of human choices because no programmer explicitly wrote the final pattern of rejection. The fairness analysis defeats that inference in the case file.",
              "v": "wrong",
              "fb": "Learning reproduces signals available in data and objectives; it does not independently correct their history."
            },
            {
              "t": "The system is treated as a runaway intelligence or merely suffer harmless edge cases, excluding a documented data and approval failure. Under the fairness analysis, warning is postponed.",
              "v": "danger",
              "fb": "A rare subgroup in the dataset can represent a large and predictable harmed population in deployment."
            }
          ]
        }
      ]
    },
    "a_causal": {
      "whatHint": "Pearl separates a real cause from a coincidence. Ask whether the harm follows a documented data-and-approval chain, not a scatter of unlucky one-offs.",
      "sci": "Judea Pearl (b. 1936)",
      "topic": "Bayesian networks & causal inference",
      "lede": "Judea Pearl made bayesian networks and causal inference an explicit learning problem with capabilities and limits that could be tested.",
      "no": 7,
      "profile": "The machine-learning note for today considers Judea Pearl and bayesian networks and causal inference. Judea Pearl developed Bayesian networks and a formal framework for causal inference using graphical models, interventions, and do-calculus. A model learns regularities from selected examples under a chosen objective. That makes data composition, labels, representation, optimization, and evaluation parts of the model itself. Pearl’s contribution reveals one mechanism in that pipeline and the assumptions that mechanism cannot check on its own.\n\nThe usable practice is to separate observed association from a causal model, state assumptions in a graph, and ask how an intervention differs from passive observation. Teams should define the target, inspect population coverage, separate training from evaluation, report subgroup performance, test shifts in context, and preserve unsuccessful validation results. A high average score should not erase systematic error concentrated on people who were scarce in the data.\n\nMachine learning can produce behavior no programmer wrote as an explicit rule, but that does not make the system independent of human choices. Categories, proxies, historical outcomes, exclusions, and launch thresholds remain designed. Treating an adverse result as a rare edge case is especially dangerous when the deployment determines who receives employment, credit, care, or scrutiny.\n\nThe methodological lesson is predictive success does not show what will happen under a policy change unless the causal assumptions are justified. A model earns trust through representative evidence, transparent limits, and evaluation tied to real consequences. Fairness metrics answer different questions, so the selected measure should match the harm and decision process under review.",
      "frame": "Separates the training and evaluation sheets. \"At The Project Lead's Office, an average can hide a population. Explain bayesian networks and causal inference.\"",
      "q": [
        {
          "q": "Which machine-learning account best captures Judea Pearl’s contribution to bayesian networks and causal inference?",
          "o": [
            {
              "t": "Judea Pearl developed Bayesian networks and a formal framework for causal inference using graphical models, interventions, and do-calculus. Subgroup error remains measurable.",
              "v": "expert",
              "fb": "Correct: model claims depend on data coverage, objective choice, subgroup evaluation, and deployment context."
            },
            {
              "t": "Judea Pearl contributed to bayesian networks and causal inference, yet the account reports average performance without examining coverage, subgroup error, or context shift.",
              "v": "partial",
              "fb": "Aggregate performance is informative but incomplete when errors are distributed unevenly across people."
            },
            {
              "t": "Judea Pearl is portrayed as showing that optimization automatically removes biased history without changing the training data or objective. The data history points elsewhere.",
              "v": "wrong",
              "fb": "Learning reproduces signals available in data and objectives; it does not independently correct their history."
            },
            {
              "t": "Judea Pearl is used to dismiss concentrated failures as rare edge cases because the headline benchmark remains impressive. Under the fairness analysis, warning is postponed.",
              "v": "danger",
              "fb": "A rare subgroup in the dataset can represent a large and predictable harmed population in deployment."
            }
          ]
        },
        {
          "q": "Which evaluation practice best applies the profile?",
          "o": [
            {
              "t": "For the model evaluation, apply this procedure: separate observed association from a causal model, state assumptions in a graph, and ask how an intervention differs from passive observation. The evaluation can be reproduced.",
              "v": "expert",
              "fb": "Correct: model claims depend on data coverage, objective choice, subgroup evaluation, and deployment context."
            },
            {
              "t": "Hold out more examples from the same pipeline, but rarely test underrepresented populations or the decisions made after deployment. Coverage remains uncertain. Across the fairness analysis, comparison remains incomplete.",
              "v": "partial",
              "fb": "Aggregate performance is informative but incomplete when errors are distributed unevenly across people."
            },
            {
              "t": "Infer fairness from training convergence and overall accuracy, without preserving the subgroup analysis or examining proxy variables. The fairness analysis defeats that inference. The fairness analysis points to another result.",
              "v": "wrong",
              "fb": "Learning reproduces signals available in data and objectives; it does not independently correct their history."
            },
            {
              "t": "Release the model on schedule, remove the failing chart from the summary, and promise to collect harmed populations after launch. Average accuracy hides allocation harm. Under the fairness analysis, warning is postponed.",
              "v": "danger",
              "fb": "A rare subgroup in the dataset can represent a large and predictable harmed population in deployment."
            }
          ]
        },
        {
          "q": "Which conclusion about model performance is most defensible?",
          "o": [
            {
              "t": "The model-governance lesson is that predictive success does not show what will happen under a policy change unless the causal assumptions are justified. The fairness analysis keeps assumptions explicit in the case file.",
              "v": "expert",
              "fb": "Correct: model claims depend on data coverage, objective choice, subgroup evaluation, and deployment context."
            },
            {
              "t": "Strong aggregate prediction justifies deployment while documentation gaps and subgroup disparities are treated as research questions. Across the fairness analysis, comparison remains incomplete in the case file.",
              "v": "partial",
              "fb": "Aggregate performance is informative but incomplete when errors are distributed unevenly across people."
            },
            {
              "t": "A self-adjusting model is independent of human choices because no programmer explicitly wrote the final pattern of rejection. The objective does not guarantee that. The data history points elsewhere in the case file.",
              "v": "wrong",
              "fb": "Learning reproduces signals available in data and objectives; it does not independently correct their history."
            },
            {
              "t": "The system is treated as a runaway intelligence or merely suffer harmless edge cases, excluding a documented data and approval failure. Rarity becomes an excuse. Under the fairness analysis, warning is postponed.",
              "v": "danger",
              "fb": "A rare subgroup in the dataset can represent a large and predictable harmed population in deployment."
            }
          ]
        }
      ]
    },
    "a_forests": {
      "whatHint": "Breiman warned that aggregate accuracy can mask who a model fails. Ask whether a headline score buried a concentrated group error.",
      "sci": "Leo Breiman (1928-2005)",
      "topic": "Random forests & the two cultures of modelling",
      "lede": "Leo Breiman used random forests to learn complex patterns while exposing the limits of purely predictive modelling.",
      "no": 8,
      "profile": "The machine-learning note for today considers Leo Breiman and random forests and the two cultures of modelling. Leo Breiman created random forests and contrasted data-driven algorithmic modeling with traditional emphasis on interpretable stochastic models. A model learns regularities from selected examples under a chosen objective. That makes data composition, labels, representation, optimization, and evaluation parts of the model itself. Breiman’s contribution reveals one mechanism in that pipeline and the assumptions that mechanism cannot check on its own.\n\nThe usable practice is to train many decision trees on resampled data and randomized features, then aggregate their predictions while measuring out-of-sample error. Teams should define the target, inspect population coverage, separate training from evaluation, report subgroup performance, test shifts in context, and preserve unsuccessful validation results. A high average score should not erase systematic error concentrated on people who were scarce in the data.\n\nMachine learning can produce behavior no programmer wrote as an explicit rule, but that does not make the system independent of human choices. Categories, proxies, historical outcomes, exclusions, and launch thresholds remain designed. Treating an adverse result as a rare edge case is especially dangerous when the deployment determines who receives employment, credit, care, or scrutiny.\n\nThe methodological lesson is ensembles can improve accuracy and stability, but high performance does not remove the need to examine subgroup errors and data provenance. A model earns trust through representative evidence, transparent limits, and evaluation tied to real consequences. A validation set drawn from the same narrow pipeline can repeat the training set’s blind spots with impressive consistency.",
      "frame": "Points to a missing cohort. \"The model learned from what we gave it. Tell me what random forests and the two cultures of modelling cannot repair alone.\"",
      "q": [
        {
          "q": "Which machine-learning account best captures Leo Breiman’s contribution to random forests and the two cultures of modelling?",
          "o": [
            {
              "t": "Leo Breiman created random forests and contrasted data-driven algorithmic modeling with traditional emphasis on interpretable stochastic models. The fairness analysis keeps assumptions explicit.",
              "v": "expert",
              "fb": "Correct: model claims depend on data coverage, objective choice, subgroup evaluation, and deployment context."
            },
            {
              "t": "Leo Breiman contributed to random forests and the two cultures of modelling, yet the account reports average performance without examining coverage, subgroup error, or context shift.",
              "v": "partial",
              "fb": "Aggregate performance is informative but incomplete when errors are distributed unevenly across people."
            },
            {
              "t": "Leo Breiman is portrayed as showing that optimization automatically removes biased history without changing the training data or objective. The fairness analysis defeats that inference.",
              "v": "wrong",
              "fb": "Learning reproduces signals available in data and objectives; it does not independently correct their history."
            },
            {
              "t": "Leo Breiman is used to dismiss concentrated failures as rare edge cases because the headline benchmark remains impressive. Within the fairness analysis, assumption replaces verification.",
              "v": "danger",
              "fb": "A rare subgroup in the dataset can represent a large and predictable harmed population in deployment."
            }
          ]
        },
        {
          "q": "Which evaluation practice best applies the profile?",
          "o": [
            {
              "t": "For the model evaluation, apply this procedure: train many decision trees on resampled data and randomized features, then aggregate their predictions while measuring out-of-sample error.",
              "v": "expert",
              "fb": "Correct: model claims depend on data coverage, objective choice, subgroup evaluation, and deployment context."
            },
            {
              "t": "Hold out more examples from the same pipeline, but rarely test underrepresented populations or the decisions made after deployment. Support across the fairness analysis stays partial.",
              "v": "partial",
              "fb": "Aggregate performance is informative but incomplete when errors are distributed unevenly across people."
            },
            {
              "t": "Infer fairness from training convergence and overall accuracy, without preserving the subgroup analysis or examining proxy variables. Under the fairness analysis, direct comparison fails.",
              "v": "wrong",
              "fb": "Learning reproduces signals available in data and objectives; it does not independently correct their history."
            },
            {
              "t": "Release the model on schedule, remove the failing chart from the summary, and promise to collect harmed populations after launch. Under the fairness analysis, warning is postponed.",
              "v": "danger",
              "fb": "A rare subgroup in the dataset can represent a large and predictable harmed population in deployment."
            }
          ]
        },
        {
          "q": "Which conclusion about model performance is most defensible?",
          "o": [
            {
              "t": "The model-governance lesson is that ensembles can improve accuracy and stability, but high performance does not remove the need to examine subgroup errors and data provenance in the case file.",
              "v": "expert",
              "fb": "Correct: model claims depend on data coverage, objective choice, subgroup evaluation, and deployment context."
            },
            {
              "t": "Strong aggregate prediction justifies deployment while documentation gaps and subgroup disparities are treated as research questions. The fairness analysis leaves one test open in the case file.",
              "v": "partial",
              "fb": "Aggregate performance is informative but incomplete when errors are distributed unevenly across people."
            },
            {
              "t": "A self-adjusting model is independent of human choices because no programmer explicitly wrote the final pattern of rejection. The fairness analysis defeats that inference in the case file.",
              "v": "wrong",
              "fb": "Learning reproduces signals available in data and objectives; it does not independently correct their history."
            },
            {
              "t": "The system is treated as a runaway intelligence or merely suffer harmless edge cases, excluding a documented data and approval failure. Under the fairness analysis, warning is postponed.",
              "v": "danger",
              "fb": "A rare subgroup in the dataset can represent a large and predictable harmed population in deployment."
            }
          ]
        }
      ]
    },
    "a_bias": {
      "whatHint": "Buolamwini measured how unrepresentative data build biased systems. Ask what the evaluation on under-represented groups showed — and whether it was seen before launch.",
      "sci": "Joy Buolamwini (b. 1989)",
      "topic": "Algorithmic bias in face recognition",
      "lede": "Data and representation meet in Joy Buolamwini’s approach to algorithmic bias in face recognition.",
      "no": 9,
      "profile": "The machine-learning note for today considers Joy Buolamwini and algorithmic bias in face recognition. Joy Buolamwini's Gender Shades study, conducted with Timnit Gebru, documented large accuracy disparities in commercial gender-classification systems across skin tone and gender. A model learns regularities from selected examples under a chosen objective. That makes data composition, labels, representation, optimization, and evaluation parts of the model itself. Buolamwini’s contribution reveals one mechanism in that pipeline and the assumptions that mechanism cannot check on its own.\n\nThe usable practice is to construct an intentionally balanced evaluation set, report errors by subgroup, and compare vendors rather than relying on one overall accuracy number. Teams should define the target, inspect population coverage, separate training from evaluation, report subgroup performance, test shifts in context, and preserve unsuccessful validation results. A high average score should not erase systematic error concentrated on people who were scarce in the data.\n\nMachine learning can produce behavior no programmer wrote as an explicit rule, but that does not make the system independent of human choices. Categories, proxies, historical outcomes, exclusions, and launch thresholds remain designed. Treating an adverse result as a rare edge case is especially dangerous when the deployment determines who receives employment, credit, care, or scrutiny.\n\nThe methodological lesson is aggregate performance can conceal systematic exclusion when the people most affected are scarce in the test data. A model earns trust through representative evidence, transparent limits, and evaluation tied to real consequences. Documentation should preserve who made each data and threshold choice, not only the final model weights.",
      "frame": "Restores a deleted subgroup plot. \"The score passed until we asked who failed. Show me algorithmic bias in face recognition.\"",
      "q": [
        {
          "q": "Which machine-learning account best captures Joy Buolamwini’s contribution to algorithmic bias in face recognition?",
          "o": [
            {
              "t": "Joy Buolamwini's Gender Shades study, conducted with Timnit Gebru, documented large accuracy disparities in commercial gender-classification systems across skin tone and gender.",
              "v": "expert",
              "fb": "Correct: model claims depend on data coverage, objective choice, subgroup evaluation, and deployment context."
            },
            {
              "t": "Joy Buolamwini contributed to algorithmic bias in face recognition, yet the account reports average performance without examining coverage, subgroup error, or context shift.",
              "v": "partial",
              "fb": "Aggregate performance is informative but incomplete when errors are distributed unevenly across people."
            },
            {
              "t": "Joy Buolamwini is portrayed as showing that optimization automatically removes biased history without changing the training data or objective. The data history points elsewhere.",
              "v": "wrong",
              "fb": "Learning reproduces signals available in data and objectives; it does not independently correct their history."
            },
            {
              "t": "Joy Buolamwini is used to dismiss concentrated failures as rare edge cases because the headline benchmark remains impressive. Under the fairness analysis, warning is postponed.",
              "v": "danger",
              "fb": "A rare subgroup in the dataset can represent a large and predictable harmed population in deployment."
            }
          ]
        },
        {
          "q": "Which evaluation practice best applies the profile?",
          "o": [
            {
              "t": "For the model evaluation, apply this procedure: construct an intentionally balanced evaluation set, report errors by subgroup, and compare vendors rather than relying on one overall accuracy number.",
              "v": "expert",
              "fb": "Correct: model claims depend on data coverage, objective choice, subgroup evaluation, and deployment context."
            },
            {
              "t": "Hold out more examples from the same pipeline, but rarely test underrepresented populations or the decisions made after deployment. Coverage remains uncertain. The fairness analysis leaves one test open.",
              "v": "partial",
              "fb": "Aggregate performance is informative but incomplete when errors are distributed unevenly across people."
            },
            {
              "t": "Infer fairness from training convergence and overall accuracy, without preserving the subgroup analysis or examining proxy variables. The objective does not guarantee that. The data history points elsewhere.",
              "v": "wrong",
              "fb": "Learning reproduces signals available in data and objectives; it does not independently correct their history."
            },
            {
              "t": "Release the model on schedule, remove the failing chart from the summary, and promise to collect harmed populations after launch. Average accuracy hides allocation harm. Rarity becomes an excuse.",
              "v": "danger",
              "fb": "A rare subgroup in the dataset can represent a large and predictable harmed population in deployment."
            }
          ]
        },
        {
          "q": "Which conclusion about model performance is most defensible?",
          "o": [
            {
              "t": "The model-governance lesson is that aggregate performance can conceal systematic exclusion when the people most affected are scarce in the test data. The evaluation can be reproduced in the case file.",
              "v": "expert",
              "fb": "Correct: model claims depend on data coverage, objective choice, subgroup evaluation, and deployment context."
            },
            {
              "t": "Strong aggregate prediction justifies deployment while documentation gaps and subgroup disparities are treated as research questions. The fairness analysis leaves one test open in the case file.",
              "v": "partial",
              "fb": "Aggregate performance is informative but incomplete when errors are distributed unevenly across people."
            },
            {
              "t": "A self-adjusting model is independent of human choices because no programmer explicitly wrote the final pattern of rejection. Under the fairness analysis, direct comparison fails in the case file.",
              "v": "wrong",
              "fb": "Learning reproduces signals available in data and objectives; it does not independently correct their history."
            },
            {
              "t": "The system is treated as a runaway intelligence or merely suffer harmless edge cases, excluding a documented data and approval failure. Inside the fairness analysis, drama displaces testing.",
              "v": "danger",
              "fb": "A rare subgroup in the dataset can represent a large and predictable harmed population in deployment."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "dataeng": {
      "datalab": "The Data Engineer brings a model card with one table removed into the training-data lab. \"Assembled the training set; knows whole groups were barely in it. The system learned a pattern, but people chose the examples and the result they were willing to see.\"",
      "evalroom": "The Data Engineer brings a model card with one table removed into the model evaluation room. \"Assembled the training set; knows whole groups were barely in it. The system learned a pattern, but people chose the examples and the result they were willing to see.\"",
      "office": "The Data Engineer brings a model card with one table removed into the project lead's office. \"Assembled the training set; knows whole groups were barely in it. The system learned a pattern, but people chose the examples and the result they were willing to see.\""
    },
    "validator": {
      "datalab": "The Validation Scientist brings a model card with one table removed into the training-data lab. \"Ran the fairness test; the failing result was pulled before release. The system learned a pattern, but people chose the examples and the result they were willing to see.\"",
      "evalroom": "The Validation Scientist brings a model card with one table removed into the model evaluation room. \"Ran the fairness test; the failing result was pulled before release. The system learned a pattern, but people chose the examples and the result they were willing to see.\"",
      "office": "The Validation Scientist brings a model card with one table removed into the project lead's office. \"Ran the fairness test; the failing result was pulled before release. The system learned a pattern, but people chose the examples and the result they were willing to see.\""
    },
    "clerk": {
      "datalab": "The Clerk brings a model card with one table removed into the training-data lab. \"Keeps the sign-off file — and the ship order that overrode the warning. The system learned a pattern, but people chose the examples and the result they were willing to see.\"",
      "evalroom": "The Clerk brings a model card with one table removed into the model evaluation room. \"Keeps the sign-off file — and the ship order that overrode the warning. The system learned a pattern, but people chose the examples and the result they were willing to see.\"",
      "office": "The Clerk brings a model card with one table removed into the project lead's office. \"Keeps the sign-off file — and the ship order that overrode the warning. The system learned a pattern, but people chose the examples and the result they were willing to see.\""
    }
  },
  "story": [
    "<b>The Aegis Model</b> opens inside the Aegis model inquiry, where the public explanation has hardened faster than the evidence.",
    "<b>The Data Engineer</b>, <b>The Validation Scientist</b>, and <b>The Clerk</b> hold different parts of the record, and every conversation begins with one real figure whose work teaches you how to read it.",
    "The case keeps pulling investigators toward <b>A runaway, self-teaching intelligence went rogue</b> or <b>A few rare edge cases — the model works as designed</b>. Both are plausible enough to survive a headline; neither should survive the full dossier untested.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide the <b>WHAT</b> for yourself."
  ],
  "endings": {
    "overclaimWhat": "sentient",
    "dismissalWhat": "edgecases",
    "win": {
      "expertTitle": "The Missing Validation Returns",
      "expert": [
        "You identify <b>Dr. Priya Sandoval — the model's lead scientist</b>, place the decisive evidence in <b>The Model Evaluation Room</b>, and establish <b>Biased training data and a validation result buried before launch</b>. Not a runaway, self-teaching intelligence went rogue. Not a few rare edge cases — the model works as designed.",
        "The training set underrepresented whole groups, and the withheld evaluation showed concentrated failure before launch. The system did not become independently malicious, and the harm was not a scatter of rare mistakes; it followed a documented data and approval process."
      ],
      "soundTitle": "The Model Is Re-Evaluated",
      "sound": [
        "Your finding correctly combines <b>Dr. Priya Sandoval — the model's lead scientist</b>, <b>The Model Evaluation Room</b>, and <b>Biased training data and a validation result buried before launch</b>. The data composition and suppressed subgroup result support the conclusion.",
        "Further causal analysis of individual decisions is needed, but the current validation cannot justify deployment or continued automated rejection."
      ],
      "namedTitle": "The Buried Chart",
      "named": [
        "You select <b>Dr. Priya Sandoval — the model's lead scientist</b>, <b>The Model Evaluation Room</b>, and <b>Biased training data and a validation result buried before launch</b> correctly.",
        "The report is thin, yet its next steps are the missing cohorts, evaluation code, and release override needed for a complete remedy."
      ]
    },
    "overclaim": {
      "title": "The Model Given a Mind",
      "body": [
        "You choose <b>A runaway, self-teaching intelligence went rogue</b>, describing patterned outputs as a self-directed revolt by the software.",
        "That claim cannot be tested from the records and allows every human data and launch decision to disappear. A demonstrable validation failure becomes collateral damage in a debate about machine consciousness."
      ]
    },
    "dismissal": {
      "title": "Edge Cases With Thousands of Names",
      "body": [
        "You accept <b>A few rare edge cases — the model works as designed</b>, letting aggregate accuracy redefine a concentrated group failure as insignificant.",
        "The model remains deployed with the same representation gap and the same hidden evaluation. People continue to lose opportunities through an error pattern known before launch."
      ]
    },
    "wrongNames": {
      "title": "The Bias Found, the Decision Misplaced",
      "body": [
        "You recognize <b>Biased training data and a validation result buried before launch</b>, but blame the external auditor or place the decisive concealment outside the evaluation room. The release and deletion trail points instead to"
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A neural network splitting applicants unevenly\"><g fill=\"none\" stroke=\"#121212\" stroke-width=\"1.3\"><circle cx=\"80\" cy=\"42\" r=\"9\"/><circle cx=\"80\" cy=\"70\" r=\"9\"/><circle cx=\"80\" cy=\"98\" r=\"9\"/><circle cx=\"210\" cy=\"50\" r=\"9\"/><circle cx=\"210\" cy=\"90\" r=\"9\"/><circle cx=\"340\" cy=\"70\" r=\"9\"/></g><g stroke=\"#e2e2d8\" stroke-width=\"1\"><line x1=\"89\" y1=\"42\" x2=\"201\" y2=\"50\"/><line x1=\"89\" y1=\"42\" x2=\"201\" y2=\"90\"/><line x1=\"89\" y1=\"70\" x2=\"201\" y2=\"50\"/><line x1=\"89\" y1=\"70\" x2=\"201\" y2=\"90\"/><line x1=\"89\" y1=\"98\" x2=\"201\" y2=\"50\"/><line x1=\"89\" y1=\"98\" x2=\"201\" y2=\"90\"/><line x1=\"219\" y1=\"50\" x2=\"331\" y2=\"70\"/><line x1=\"219\" y1=\"90\" x2=\"331\" y2=\"70\"/></g><path d=\"M350 70 L448 42\" stroke=\"#326891\" stroke-width=\"2\"/><path d=\"M350 70 L448 98\" stroke=\"#B3261E\" stroke-width=\"2.5\"/><circle cx=\"500\" cy=\"42\" r=\"22\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><circle cx=\"500\" cy=\"98\" r=\"22\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2\"/></svg>"
}};
