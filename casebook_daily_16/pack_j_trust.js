module.exports = { PACK: {
  "id": "j_trust",
  "title": "The Cygnet Standard",
  "discipline": "Antitrust & Industrial Organization",
  "teaser": "A tech giant's rivals keep dying just as they start to win. A ruthless plot to control everything? Just a better competitor winning? Or prices set below cost, and a study buried to hide it?",
  "overclaimTag": "an all-controlling conspiracy",
  "truthTag": "concealed predatory pricing",
  "venue": "the Cygnet antitrust inquiry",
  "agent": {
    "name": "Investigator Cole Ashby",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Economists",
  "readingLabel": "Economists of Monopoly",
  "dossierName": "ECONOMISTS OF MONOPOLY",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Cygnet antitrust inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The WHERE you test determines the dossier, and the conversation costs one day.",
  "overclaimTease": "Market dominance may look like omnipotence; the decisive question is what the costs and records actually show.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "ceo",
      "items": [
        {
          "id": "ceo",
          "label": "Roland Vane — the founder & chief executive"
        },
        {
          "id": "strategist",
          "label": "The chief strategy officer"
        },
        {
          "id": "regulator",
          "label": "The antitrust regulator"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "strategyfiles",
      "items": [
        {
          "id": "market",
          "label": "The Marketplace & Rivals"
        },
        {
          "id": "boardroom",
          "label": "The Company Boardroom"
        },
        {
          "id": "strategyfiles",
          "label": "The Strategy Office's Files"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "predation",
      "items": [
        {
          "id": "empire",
          "label": "A sinister plot to control everything"
        },
        {
          "id": "merit",
          "label": "Nothing wrong — just a better competitor winning"
        },
        {
          "id": "predation",
          "label": "Below-cost pricing & a buried internal study"
        }
      ]
    }
  },
  "PLACES": {
    "market": {
      "name": "The Marketplace & Rivals",
      "xy": [
        140,
        90
      ]
    },
    "boardroom": {
      "name": "The Company Boardroom",
      "xy": [
        330,
        240
      ]
    },
    "strategyfiles": {
      "name": "The Strategy Office's Files",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "market",
      "boardroom"
    ],
    [
      "boardroom",
      "strategyfiles"
    ]
  ],
  "CHARACTERS": {
    "analyst": {
      "name": "Analyst Mira Kade",
      "role": "Strategy analyst",
      "face": "📊",
      "badge": "K",
      "legend": "the strategy office",
      "hint": "Ran the numbers showing the price war lost money on purpose — then watched them vanish."
    },
    "clerk": {
      "name": "The Records Clerk",
      "role": "Company records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the boardroom",
      "hint": "Keeps the board minutes and the study stamped 'do not distribute'."
    },
    "rival": {
      "name": "Rival Founder Estes",
      "role": "Rival startup founder",
      "face": "💻",
      "badge": "E",
      "legend": "the marketplace",
      "hint": "Watched Cygnet undercut him below cost until his funding dried up."
    }
  },
  "TOPICMAP": {
    "market": {
      "analyst": [
        "monopolytheory"
      ],
      "clerk": [
        "shermanact"
      ],
      "rival": [
        "trusts"
      ]
    },
    "boardroom": {
      "analyst": [
        "creativedest"
      ],
      "clerk": [
        "imperfect"
      ],
      "rival": [
        "control"
      ]
    },
    "strategyfiles": {
      "analyst": [
        "scp"
      ],
      "clerk": [
        "trustbust"
      ],
      "rival": [
        "paradox"
      ]
    }
  },
  "TOPICS": {
    "monopolytheory": {
      "sci": "Antoine Augustin Cournot (1801-1877)",
      "topic": "The theory of monopoly",
      "lede": "Antoine Augustin Cournot turned the theory of monopoly into a test of costs, incentives, entry, and competitive effects.",
      "no": 1,
      "profile": "Today’s competition brief uses Antoine Augustin Cournot to unpack the theory of monopoly. Antoine Augustin Cournot modeled a monopolist and later firms choosing quantities, showing how market output and price depend on strategic interaction. Industrial organization asks how firms behave when products, costs, timing, information, and entry conditions differ from the textbook ideal. Cournot supplied a framework for turning broad claims about power into propositions that can be tested.\n\nThe analytical move is to represent demand, cost, and rivals' choices explicitly so claims about market power follow from a defined model. Market definition, substitution, marginal cost, capacity, contracting, and the feasibility of entry must be specified rather than assumed. A low price may be aggressive competition, a temporary investment, or a sacrifice intended to remove rivals; the surrounding evidence separates them.\n\nThe distinction matters because antitrust can harm consumers if it punishes ordinary price cutting, yet it can fail if it waits until exclusion has already destroyed the competitive process. Models organize the inquiry, but internal plans, actual costs, financing constraints, and post-exit conduct determine whether the model fits.\n\nThe economic lesson is monopoly analysis begins with behavior, costs, and constraints rather than the moral force of a large market share. Market power should be demonstrated through incentives and effects, not inferred from size or rhetoric alone. A plausible theory of harm must also explain why a challenged strategy would pay after rivals disappear. Efficiency claims deserve the same documentary testing as allegations of exclusion. A plausible theory of harm must also explain why a challenged strategy would pay after rivals disappear.",
      "frame": "Rotates a cost chart across the desk. \"At The Marketplace & Rivals, accusation is cheap and entry is not. Walk me through the theory of monopoly.\"",
      "q": [
        {
          "q": "Which economic statement best captures Antoine Augustin Cournot’s work on the theory of monopoly?",
          "o": [
            {
              "t": "Antoine Augustin Cournot made the theory of monopoly depend on specified costs, strategic incentives, entry conditions, and effects. It remains checkable in the dated record in the case file.",
              "v": "expert",
              "fb": "Correct: industrial organization turns allegations into testable claims about conduct and market conditions."
            },
            {
              "t": "Antoine Augustin Cournot treated the theory of monopoly as a label for every large firm without testing substitutes or entry. The remaining uncertainty is assigned to ordinary variation in context.",
              "v": "partial",
              "fb": "Size can be relevant, but it does not establish the mechanism or competitive effect."
            },
            {
              "t": "Antoine Augustin Cournot let market share settle the theory of monopoly while ignoring prices, costs, capacity, and contracts. The explanation treats the conflicting record as secondary in context.",
              "v": "wrong",
              "fb": "Low prices normally benefit buyers and require additional evidence before becoming predation."
            },
            {
              "t": "Antoine Augustin Cournot used an executive's ambition as sufficient proof of unlawful control over competition. Size becomes a substitute for analysis in the dated record in the case file in practice.",
              "v": "danger",
              "fb": "Antitrust liability rests on conduct and effects, not a personality judgment."
            }
          ]
        },
        {
          "q": "Which market study would implement the method described in this briefing?",
          "o": [
            {
              "t": "Compare prices with defensible costs, entry barriers, financing constraints, and plausible later recoupment. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Yes: a predation theory requires an economic sacrifice, exclusionary path, and plausible payoff."
            },
            {
              "t": "Measure market share at one date, then infer every earlier and later competitive effect from it. The missing record is treated as a minor limitation.",
              "v": "partial",
              "fb": "A snapshot may miss entry, innovation, contracts, and changes in competitive constraint."
            },
            {
              "t": "Count the rivals that exited, but ignore differences in their products, costs, capacity, and funding. The account leans heavily on prior reputation.",
              "v": "wrong",
              "fb": "Exit is an outcome needing explanation, not self-proving evidence of unlawful conduct."
            },
            {
              "t": "Describe the firm as all-controlling, and treat every failed competitor as proof of the same plot. The dramatic explanation supplies the organizing theory.",
              "v": "danger",
              "fb": "A totalizing description prevents the inquiry from identifying a specific testable practice."
            }
          ]
        },
        {
          "q": "What antitrust lesson is best supported by the theory of monopoly?",
          "o": [
            {
              "t": "Antitrust should distinguish harm to the competitive process from harm suffered by one competitor. The method stays visible under the documented sequence in the case file.",
              "v": "expert",
              "fb": "Exactly: antitrust protects the competitive process rather than guaranteeing particular firms survival."
            },
            {
              "t": "Protecting every incumbent rival should be the safest way to preserve competition and consumer welfare. The remaining uncertainty is assigned to ordinary variation in context.",
              "v": "partial",
              "fb": "Shielding inefficient rivals can raise prices and suppress the competition antitrust seeks to preserve."
            },
            {
              "t": "Any efficiency claimed by a dominant firm should automatically defeat evidence of exclusion. The account leans heavily on prior reputation in the dated record in context.",
              "v": "wrong",
              "fb": "Efficiency is an evidentiary claim that must be tested against feasible alternatives and actual conduct."
            },
            {
              "t": "The mainly choices is treated as harmless superior competition or a conspiracy controlling the entire market. The preferred narrative receives priority over verification in practice.",
              "v": "danger",
              "fb": "Market analysis can identify narrower misconduct without adopting either extreme."
            }
          ]
        }
      ]
    },
    "shermanact": {
      "sci": "John Sherman (1823-1900)",
      "topic": "The Antitrust Act",
      "lede": "John Sherman asked the antitrust act to explain prices and strategy instead of merely naming a large firm.",
      "no": 2,
      "profile": "Today’s competition brief uses John Sherman to unpack the antitrust act. John Sherman sponsored the 1890 federal law that prohibited monopolization and agreements in restraint of trade, creating a foundation for American antitrust enforcement. Industrial organization asks how firms behave when products, costs, timing, information, and entry conditions differ from the textbook ideal. Sherman supplied a framework for turning broad claims about power into propositions that can be tested.\n\nThe analytical move is to translate broad statutory language into evidence about conduct, market power, agreement, exclusion, and competitive harm. Market definition, substitution, marginal cost, capacity, contracting, and the feasibility of entry must be specified rather than assumed. A low price may be aggressive competition, a temporary investment, or a sacrifice intended to remove rivals; the surrounding evidence separates them.\n\nThe distinction matters because antitrust can harm consumers if it punishes ordinary price cutting, yet it can fail if it waits until exclusion has already destroyed the competitive process. Models organize the inquiry, but internal plans, actual costs, financing constraints, and post-exit conduct determine whether the model fits.\n\nThe economic lesson is antitrust law addresses defined practices and effects, not size or unpopularity by themselves. Market power should be demonstrated through incentives and effects, not inferred from size or rhetoric alone. A plausible theory of harm must also explain why a challenged strategy would pay after rivals disappear. Efficiency claims deserve the same documentary testing as allegations of exclusion. A plausible theory of harm must also explain why a challenged strategy would pay after rivals disappear.",
      "frame": "Folds the strategy memo. \"Market share tells one line of the story. Prove you can read the antitrust act economically.\"",
      "q": [
        {
          "q": "Which economic statement best captures John Sherman’s work on the antitrust act?",
          "o": [
            {
              "t": "John Sherman made the antitrust act depend on specified costs, strategic incentives, entry conditions, and effects. It remains checkable in the dated record in the case file.",
              "v": "expert",
              "fb": "Correct: industrial organization turns allegations into testable claims about conduct and market conditions."
            },
            {
              "t": "John Sherman treated the antitrust act as a label for every large firm without testing substitutes or entry. The remaining uncertainty is assigned to ordinary variation in context.",
              "v": "partial",
              "fb": "Size can be relevant, but it does not establish the mechanism or competitive effect."
            },
            {
              "t": "John Sherman let market share settle the antitrust act while ignoring prices, costs, capacity, and contracts. The explanation treats the conflicting record as secondary in context.",
              "v": "wrong",
              "fb": "Low prices normally benefit buyers and require additional evidence before becoming predation."
            },
            {
              "t": "John Sherman used an executive's ambition as sufficient proof of unlawful control over competition. The dramatic explanation supplies the organizing theory in the case file in practice.",
              "v": "danger",
              "fb": "Antitrust liability rests on conduct and effects, not a personality judgment."
            }
          ]
        },
        {
          "q": "Which market study would implement the method described in this briefing?",
          "o": [
            {
              "t": "Compare prices with defensible costs, entry barriers, financing constraints, and plausible later recoupment. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Yes: a predation theory requires an economic sacrifice, exclusionary path, and plausible payoff."
            },
            {
              "t": "Measure market share at one date, then infer every earlier and later competitive effect from it. The missing record is treated as a minor limitation.",
              "v": "partial",
              "fb": "A snapshot may miss entry, innovation, contracts, and changes in competitive constraint."
            },
            {
              "t": "Count the rivals that exited, but ignore differences in their products, costs, capacity, and funding. The account leans heavily on prior reputation.",
              "v": "wrong",
              "fb": "Exit is an outcome needing explanation, not self-proving evidence of unlawful conduct."
            },
            {
              "t": "Describe the firm as all-controlling, and treat every failed competitor as proof of the same plot. The dramatic explanation supplies the organizing theory.",
              "v": "danger",
              "fb": "A totalizing description prevents the inquiry from identifying a specific testable practice."
            }
          ]
        },
        {
          "q": "What antitrust lesson is best supported by the antitrust act?",
          "o": [
            {
              "t": "Antitrust should distinguish harm to the competitive process from harm suffered by one competitor. The method stays visible under the documented sequence in the case file.",
              "v": "expert",
              "fb": "Exactly: antitrust protects the competitive process rather than guaranteeing particular firms survival."
            },
            {
              "t": "Protecting every incumbent rival should be the safest way to preserve competition and consumer welfare. The remaining uncertainty is assigned to ordinary variation in context.",
              "v": "partial",
              "fb": "Shielding inefficient rivals can raise prices and suppress the competition antitrust seeks to preserve."
            },
            {
              "t": "Any efficiency claimed by a dominant firm should automatically defeat evidence of exclusion. The account leans heavily on prior reputation in the dated record in context.",
              "v": "wrong",
              "fb": "Efficiency is an evidentiary claim that must be tested against feasible alternatives and actual conduct."
            },
            {
              "t": "The mainly choices is treated as harmless superior competition or a conspiracy controlling the entire market. The preferred narrative receives priority over verification in practice.",
              "v": "danger",
              "fb": "Market analysis can identify narrower misconduct without adopting either extreme."
            }
          ]
        }
      ]
    },
    "trusts": {
      "sci": "John Bates Clark (1847-1938)",
      "topic": "The control of the trusts",
      "lede": "Market power became measurable rather than theatrical in John Bates Clark's account of the control of the trusts.",
      "no": 3,
      "profile": "Today’s competition brief uses John Bates Clark to unpack the control of the trusts. John Bates Clark examined trusts and argued that potential competition could discipline some large firms while recognizing the need to address abusive power. Industrial organization asks how firms behave when products, costs, timing, information, and entry conditions differ from the textbook ideal. Clark supplied a framework for turning broad claims about power into propositions that can be tested.\n\nThe analytical move is to distinguish efficiencies from exclusion and ask whether entry is realistically available rather than merely imaginable. Market definition, substitution, marginal cost, capacity, contracting, and the feasibility of entry must be specified rather than assumed. A low price may be aggressive competition, a temporary investment, or a sacrifice intended to remove rivals; the surrounding evidence separates them.\n\nThe distinction matters because antitrust can harm consumers if it punishes ordinary price cutting, yet it can fail if it waits until exclusion has already destroyed the competitive process. Models organize the inquiry, but internal plans, actual costs, financing constraints, and post-exit conduct determine whether the model fits.\n\nThe economic lesson is the threat of entry constrains a dominant firm only when barriers do not make the threat empty. Market power should be demonstrated through incentives and effects, not inferred from size or rhetoric alone. A plausible theory of harm must also explain why a challenged strategy would pay after rivals disappear. Efficiency claims deserve the same documentary testing as allegations of exclusion. A plausible theory of harm must also explain why a challenged strategy would pay after rivals disappear.",
      "frame": "Circles a price below the benchmark. \"Do not call it predation until you understand the control of the trusts.\"",
      "q": [
        {
          "q": "Which economic statement best captures John Bates Clark’s work on the control of the trusts?",
          "o": [
            {
              "t": "John Bates Clark made the control of the trusts depend on specified costs, strategic incentives, entry conditions, and effects in the case file in the case file.",
              "v": "expert",
              "fb": "Correct: industrial organization turns allegations into testable claims about conduct and market conditions."
            },
            {
              "t": "John Bates Clark treated the control of the trusts as a label for every large firm without testing substitutes or entry in the dated record in the case file.",
              "v": "partial",
              "fb": "Size can be relevant, but it does not establish the mechanism or competitive effect."
            },
            {
              "t": "John Bates Clark let market share settle the control of the trusts while ignoring prices, costs, capacity, and contracts in the dated record in the case file.",
              "v": "wrong",
              "fb": "Low prices normally benefit buyers and require additional evidence before becoming predation."
            },
            {
              "t": "John Bates Clark used an executive's ambition as sufficient proof of unlawful control over competition. The preferred narrative sets the order of review.",
              "v": "danger",
              "fb": "Antitrust liability rests on conduct and effects, not a personality judgment."
            }
          ]
        },
        {
          "q": "Which market study would implement the method described in this briefing?",
          "o": [
            {
              "t": "Compare prices with defensible costs, entry barriers, financing constraints, and plausible later recoupment. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Yes: a predation theory requires an economic sacrifice, exclusionary path, and plausible payoff."
            },
            {
              "t": "Measure market share at one date, then infer every earlier and later competitive effect from it. The missing record is treated as a minor limitation.",
              "v": "partial",
              "fb": "A snapshot may miss entry, innovation, contracts, and changes in competitive constraint."
            },
            {
              "t": "Count the rivals that exited, but ignore differences in their products, costs, capacity, and funding. The account leans heavily on prior reputation.",
              "v": "wrong",
              "fb": "Exit is an outcome needing explanation, not self-proving evidence of unlawful conduct."
            },
            {
              "t": "Describe the firm as all-controlling, and treat every failed competitor as proof of the same plot. The dramatic explanation supplies the organizing theory.",
              "v": "danger",
              "fb": "A totalizing description prevents the inquiry from identifying a specific testable practice."
            }
          ]
        },
        {
          "q": "What antitrust lesson is best supported by the control of the trusts?",
          "o": [
            {
              "t": "Antitrust should distinguish harm to the competitive process from harm suffered by one competitor. The method stays visible under the documented sequence in the case file.",
              "v": "expert",
              "fb": "Exactly: antitrust protects the competitive process rather than guaranteeing particular firms survival."
            },
            {
              "t": "Protecting every incumbent rival should be the safest way to preserve competition and consumer welfare. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Shielding inefficient rivals can raise prices and suppress the competition antitrust seeks to preserve."
            },
            {
              "t": "Any efficiency claimed by a dominant firm should automatically defeat evidence of exclusion. The account leans heavily on prior reputation in the dated record.",
              "v": "wrong",
              "fb": "Efficiency is an evidentiary claim that must be tested against feasible alternatives and actual conduct."
            },
            {
              "t": "The mainly choices is treated as harmless superior competition or a conspiracy controlling the entire market. The preferred narrative receives priority over verification.",
              "v": "danger",
              "fb": "Market analysis can identify narrower misconduct without adopting either extreme."
            }
          ]
        }
      ]
    },
    "creativedest": {
      "sci": "Joseph A. Schumpeter (1883-1950)",
      "topic": "Creative destruction & monopoly",
      "lede": "Joseph A. Schumpeter turned creative destruction and monopoly into a test of costs, incentives, entry, and competitive effects.",
      "no": 4,
      "profile": "Today’s competition brief uses Joseph A. Schumpeter to unpack creative destruction and monopoly. Joseph Schumpeter argued that innovation repeatedly displaces established firms and that temporary market power can accompany entrepreneurial change. Industrial organization asks how firms behave when products, costs, timing, information, and entry conditions differ from the textbook ideal. Schumpeter supplied a framework for turning broad claims about power into propositions that can be tested.\n\nThe analytical move is to evaluate competition as a dynamic process involving innovation, entry, investment, and displacement rather than price alone. Market definition, substitution, marginal cost, capacity, contracting, and the feasibility of entry must be specified rather than assumed. A low price may be aggressive competition, a temporary investment, or a sacrifice intended to remove rivals; the surrounding evidence separates them.\n\nThe distinction matters because antitrust can harm consumers if it punishes ordinary price cutting, yet it can fail if it waits until exclusion has already destroyed the competitive process. Models organize the inquiry, but internal plans, actual costs, financing constraints, and post-exit conduct determine whether the model fits.\n\nThe economic lesson is innovation can justify some temporary power without excusing conduct designed to prevent the next challenger. Market power should be demonstrated through incentives and effects, not inferred from size or rhetoric alone. A plausible theory of harm must also explain why a challenged strategy would pay after rivals disappear. Efficiency claims deserve the same documentary testing as allegations of exclusion. A plausible theory of harm must also explain why a challenged strategy would pay after rivals disappear.",
      "frame": "Rotates a cost chart across the desk. \"At The Company Boardroom, accusation is cheap and entry is not. Walk me through creative destruction and monopoly.\"",
      "q": [
        {
          "q": "Which economic statement best captures Joseph A. Schumpeter’s work on creative destruction and monopoly?",
          "o": [
            {
              "t": "Joseph A. Schumpeter made creative destruction and monopoly depend on specified costs, strategic incentives, entry conditions, and effects in the case file in the case file.",
              "v": "expert",
              "fb": "Correct: industrial organization turns allegations into testable claims about conduct and market conditions."
            },
            {
              "t": "Joseph A. Schumpeter treated creative destruction and monopoly as a label for every large firm without testing substitutes or entry in the operational record in the case file.",
              "v": "partial",
              "fb": "Size can be relevant, but it does not establish the mechanism or competitive effect."
            },
            {
              "t": "Joseph A. Schumpeter let market share settle creative destruction and monopoly while ignoring prices, costs, capacity, and contracts in the dated record in the case file.",
              "v": "wrong",
              "fb": "Low prices normally benefit buyers and require additional evidence before becoming predation."
            },
            {
              "t": "Joseph A. Schumpeter used an executive's ambition as sufficient proof of unlawful control over competition. The preferred narrative receives priority over verification.",
              "v": "danger",
              "fb": "Antitrust liability rests on conduct and effects, not a personality judgment."
            }
          ]
        },
        {
          "q": "Which market study would implement the method described in this briefing?",
          "o": [
            {
              "t": "Compare prices with defensible costs, entry barriers, financing constraints, and plausible later recoupment. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Yes: a predation theory requires an economic sacrifice, exclusionary path, and plausible payoff."
            },
            {
              "t": "Measure market share at one date, then infer every earlier and later competitive effect from it. The missing record is treated as a minor limitation.",
              "v": "partial",
              "fb": "A snapshot may miss entry, innovation, contracts, and changes in competitive constraint."
            },
            {
              "t": "Count the rivals that exited, but ignore differences in their products, costs, capacity, and funding. The account leans heavily on prior reputation.",
              "v": "wrong",
              "fb": "Exit is an outcome needing explanation, not self-proving evidence of unlawful conduct."
            },
            {
              "t": "Describe the firm as all-controlling, and treat every failed competitor as proof of the same plot. The dramatic explanation supplies the organizing theory.",
              "v": "danger",
              "fb": "A totalizing description prevents the inquiry from identifying a specific testable practice."
            }
          ]
        },
        {
          "q": "What antitrust lesson is best supported by creative destruction and monopoly?",
          "o": [
            {
              "t": "Antitrust should distinguish harm to the competitive process from harm suffered by one competitor. The method stays visible under the documented sequence in the case file.",
              "v": "expert",
              "fb": "Exactly: antitrust protects the competitive process rather than guaranteeing particular firms survival."
            },
            {
              "t": "Protecting every incumbent rival should be the safest way to preserve competition and consumer welfare. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Shielding inefficient rivals can raise prices and suppress the competition antitrust seeks to preserve."
            },
            {
              "t": "Any efficiency claimed by a dominant firm should automatically defeat evidence of exclusion. The account leans heavily on prior reputation in the dated record.",
              "v": "wrong",
              "fb": "Efficiency is an evidentiary claim that must be tested against feasible alternatives and actual conduct."
            },
            {
              "t": "The mainly choices is treated as harmless superior competition or a conspiracy controlling the entire market. The preferred narrative receives priority over verification.",
              "v": "danger",
              "fb": "Market analysis can identify narrower misconduct without adopting either extreme."
            }
          ]
        }
      ]
    },
    "imperfect": {
      "sci": "Joan Robinson (1903-1983)",
      "topic": "Imperfect competition",
      "lede": "Joan Robinson asked imperfect competition to explain prices and strategy instead of merely naming a large firm.",
      "no": 5,
      "profile": "Today’s competition brief uses Joan Robinson to unpack imperfect competition. Joan Robinson's Economics of Imperfect Competition examined firms facing downward-sloping demand and developed analysis of monopsony as well as monopoly. Industrial organization asks how firms behave when products, costs, timing, information, and entry conditions differ from the textbook ideal. Robinson supplied a framework for turning broad claims about power into propositions that can be tested.\n\nThe analytical move is to compare price with marginal cost and examine bargaining power on both the selling and buying sides of a market. Market definition, substitution, marginal cost, capacity, contracting, and the feasibility of entry must be specified rather than assumed. A low price may be aggressive competition, a temporary investment, or a sacrifice intended to remove rivals; the surrounding evidence separates them.\n\nThe distinction matters because antitrust can harm consumers if it punishes ordinary price cutting, yet it can fail if it waits until exclusion has already destroyed the competitive process. Models organize the inquiry, but internal plans, actual costs, financing constraints, and post-exit conduct determine whether the model fits.\n\nThe economic lesson is market power can harm suppliers and workers as well as consumers. Market power should be demonstrated through incentives and effects, not inferred from size or rhetoric alone. A plausible theory of harm must also explain why a challenged strategy would pay after rivals disappear. Efficiency claims deserve the same documentary testing as allegations of exclusion. A plausible theory of harm must also explain why a challenged strategy would pay after rivals disappear.",
      "frame": "Folds the strategy memo. \"Market share tells one line of the story. Prove you can read imperfect competition economically.\"",
      "q": [
        {
          "q": "Which economic statement best captures Joan Robinson’s work on imperfect competition?",
          "o": [
            {
              "t": "Joan Robinson made imperfect competition depend on specified costs, strategic incentives, entry conditions, and effects. It remains checkable in the dated record in the case file.",
              "v": "expert",
              "fb": "Correct: industrial organization turns allegations into testable claims about conduct and market conditions."
            },
            {
              "t": "Joan Robinson treated imperfect competition as a label for every large firm without testing substitutes or entry. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Size can be relevant, but it does not establish the mechanism or competitive effect."
            },
            {
              "t": "Joan Robinson let market share settle imperfect competition while ignoring prices, costs, capacity, and contracts. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "Low prices normally benefit buyers and require additional evidence before becoming predation."
            },
            {
              "t": "Joan Robinson used an executive's ambition as sufficient proof of unlawful control over competition. Size becomes a substitute for analysis in the dated record in the case file.",
              "v": "danger",
              "fb": "Antitrust liability rests on conduct and effects, not a personality judgment."
            }
          ]
        },
        {
          "q": "Which market study would implement the method described in this briefing?",
          "o": [
            {
              "t": "Compare prices with defensible costs, entry barriers, financing constraints, and plausible later recoupment. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Yes: a predation theory requires an economic sacrifice, exclusionary path, and plausible payoff."
            },
            {
              "t": "Measure market share at one date, then infer every earlier and later competitive effect from it. The missing record is treated as a minor limitation.",
              "v": "partial",
              "fb": "A snapshot may miss entry, innovation, contracts, and changes in competitive constraint."
            },
            {
              "t": "Count the rivals that exited, but ignore differences in their products, costs, capacity, and funding. The account leans heavily on prior reputation.",
              "v": "wrong",
              "fb": "Exit is an outcome needing explanation, not self-proving evidence of unlawful conduct."
            },
            {
              "t": "Describe the firm as all-controlling, and treat every failed competitor as proof of the same plot. The dramatic explanation supplies the organizing theory.",
              "v": "danger",
              "fb": "A totalizing description prevents the inquiry from identifying a specific testable practice."
            }
          ]
        },
        {
          "q": "What antitrust lesson is best supported by imperfect competition?",
          "o": [
            {
              "t": "Antitrust should distinguish harm to the competitive process from harm suffered by one competitor. The method stays visible under the documented sequence in the case file.",
              "v": "expert",
              "fb": "Exactly: antitrust protects the competitive process rather than guaranteeing particular firms survival."
            },
            {
              "t": "Protecting every incumbent rival should be the safest way to preserve competition and consumer welfare. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Shielding inefficient rivals can raise prices and suppress the competition antitrust seeks to preserve."
            },
            {
              "t": "Any efficiency claimed by a dominant firm should automatically defeat evidence of exclusion. The account leans heavily on prior reputation in the dated record.",
              "v": "wrong",
              "fb": "Efficiency is an evidentiary claim that must be tested against feasible alternatives and actual conduct."
            },
            {
              "t": "The mainly choices is treated as harmless superior competition or a conspiracy controlling the entire market. The preferred narrative receives priority over verification.",
              "v": "danger",
              "fb": "Market analysis can identify narrower misconduct without adopting either extreme."
            }
          ]
        }
      ]
    },
    "control": {
      "sci": "Adolf A. Berle (1895-1971)",
      "topic": "The modern corporation & control",
      "lede": "Market power became measurable rather than theatrical in Adolf A. Berle's account of the modern corporation and control.",
      "no": 6,
      "profile": "Today’s competition brief uses Adolf A. Berle to unpack the modern corporation and control. Adolf Berle, with Gardiner Means, documented the separation of ownership from control in large modern corporations. Industrial organization asks how firms behave when products, costs, timing, information, and entry conditions differ from the textbook ideal. Berle supplied a framework for turning broad claims about power into propositions that can be tested.\n\nThe analytical move is to trace who actually exercises decision authority when shares are dispersed and managers control information and operations. Market definition, substitution, marginal cost, capacity, contracting, and the feasibility of entry must be specified rather than assumed. A low price may be aggressive competition, a temporary investment, or a sacrifice intended to remove rivals; the surrounding evidence separates them.\n\nThe distinction matters because antitrust can harm consumers if it punishes ordinary price cutting, yet it can fail if it waits until exclusion has already destroyed the competitive process. Models organize the inquiry, but internal plans, actual costs, financing constraints, and post-exit conduct determine whether the model fits.\n\nThe economic lesson is formal ownership does not reveal whose incentives govern the corporation's conduct. Market power should be demonstrated through incentives and effects, not inferred from size or rhetoric alone. A plausible theory of harm must also explain why a challenged strategy would pay after rivals disappear. Efficiency claims deserve the same documentary testing as allegations of exclusion. A plausible theory of harm must also explain why a challenged strategy would pay after rivals disappear.",
      "frame": "Circles a price below the benchmark. \"Do not call it predation until you understand the modern corporation and control.\"",
      "q": [
        {
          "q": "Which economic statement best captures Adolf A. Berle’s work on the modern corporation and control?",
          "o": [
            {
              "t": "Adolf A. Berle made the modern corporation and control depend on specified costs, strategic incentives, entry conditions, and effects in the case file in the case file.",
              "v": "expert",
              "fb": "Correct: industrial organization turns allegations into testable claims about conduct and market conditions."
            },
            {
              "t": "Adolf A. Berle treated the modern corporation and control as a label for every large firm without testing substitutes or entry in the dated record in the case file.",
              "v": "partial",
              "fb": "Size can be relevant, but it does not establish the mechanism or competitive effect."
            },
            {
              "t": "Adolf A. Berle let market share settle the modern corporation and control while ignoring prices, costs, capacity, and contracts in the dated record in the case file.",
              "v": "wrong",
              "fb": "Low prices normally benefit buyers and require additional evidence before becoming predation."
            },
            {
              "t": "Adolf A. Berle used an executive's ambition as sufficient proof of unlawful control over competition. The preferred narrative receives priority over verification.",
              "v": "danger",
              "fb": "Antitrust liability rests on conduct and effects, not a personality judgment."
            }
          ]
        },
        {
          "q": "Which market study would implement the method described in this briefing?",
          "o": [
            {
              "t": "Compare prices with defensible costs, entry barriers, financing constraints, and plausible later recoupment. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Yes: a predation theory requires an economic sacrifice, exclusionary path, and plausible payoff."
            },
            {
              "t": "Measure market share at one date, then infer every earlier and later competitive effect from it. The missing record is treated as a minor limitation.",
              "v": "partial",
              "fb": "A snapshot may miss entry, innovation, contracts, and changes in competitive constraint."
            },
            {
              "t": "Count the rivals that exited, but ignore differences in their products, costs, capacity, and funding. The account leans heavily on prior reputation.",
              "v": "wrong",
              "fb": "Exit is an outcome needing explanation, not self-proving evidence of unlawful conduct."
            },
            {
              "t": "Describe the firm as all-controlling, and treat every failed competitor as proof of the same plot. The dramatic explanation supplies the organizing theory.",
              "v": "danger",
              "fb": "A totalizing description prevents the inquiry from identifying a specific testable practice."
            }
          ]
        },
        {
          "q": "What antitrust lesson is best supported by the modern corporation and control?",
          "o": [
            {
              "t": "Antitrust should distinguish harm to the competitive process from harm suffered by one competitor. The method stays visible under the documented sequence in the case file.",
              "v": "expert",
              "fb": "Exactly: antitrust protects the competitive process rather than guaranteeing particular firms survival."
            },
            {
              "t": "Protecting every incumbent rival should be the safest way to preserve competition and consumer welfare. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Shielding inefficient rivals can raise prices and suppress the competition antitrust seeks to preserve."
            },
            {
              "t": "Any efficiency claimed by a dominant firm should automatically defeat evidence of exclusion. The account leans heavily on prior reputation in the dated record.",
              "v": "wrong",
              "fb": "Efficiency is an evidentiary claim that must be tested against feasible alternatives and actual conduct."
            },
            {
              "t": "The mainly choices is treated as harmless superior competition or a conspiracy controlling the entire market. The preferred narrative receives priority over verification.",
              "v": "danger",
              "fb": "Market analysis can identify narrower misconduct without adopting either extreme."
            }
          ]
        }
      ]
    },
    "scp": {
      "sci": "Edward S. Mason (1899-1992)",
      "topic": "Structure, conduct & performance",
      "lede": "Edward S. Mason turned structure, conduct and performance into a test of costs, incentives, entry, and competitive effects.",
      "no": 7,
      "profile": "Today’s competition brief uses Edward S. Mason to unpack structure, conduct and performance. Edward S. Mason helped establish the structure-conduct-performance approach, linking market concentration and entry conditions to firm behavior and outcomes. Industrial organization asks how firms behave when products, costs, timing, information, and entry conditions differ from the textbook ideal. Mason supplied a framework for turning broad claims about power into propositions that can be tested.\n\nThe analytical move is to examine market structure, observable conduct, and performance while allowing evidence to test the links among them. Market definition, substitution, marginal cost, capacity, contracting, and the feasibility of entry must be specified rather than assumed. A low price may be aggressive competition, a temporary investment, or a sacrifice intended to remove rivals; the surrounding evidence separates them.\n\nThe distinction matters because antitrust can harm consumers if it punishes ordinary price cutting, yet it can fail if it waits until exclusion has already destroyed the competitive process. Models organize the inquiry, but internal plans, actual costs, financing constraints, and post-exit conduct determine whether the model fits.\n\nThe economic lesson is structure can create incentives without mechanically determining every firm's conduct. Market power should be demonstrated through incentives and effects, not inferred from size or rhetoric alone. A plausible theory of harm must also explain why a challenged strategy would pay after rivals disappear. Efficiency claims deserve the same documentary testing as allegations of exclusion. A plausible theory of harm must also explain why a challenged strategy would pay after rivals disappear.",
      "frame": "Rotates a cost chart across the desk. \"At The Strategy Office's Files, accusation is cheap and entry is not. Walk me through structure, conduct and performance.\"",
      "q": [
        {
          "q": "Which economic statement best captures Edward S. Mason’s work on structure, conduct and performance?",
          "o": [
            {
              "t": "Edward S. Mason made structure, conduct and performance depend on specified costs, strategic incentives, entry conditions, and effects in the case file in the case file.",
              "v": "expert",
              "fb": "Correct: industrial organization turns allegations into testable claims about conduct and market conditions."
            },
            {
              "t": "Edward S. Mason treated structure, conduct and performance as a label for every large firm without testing substitutes or entry in the dated record in the case file.",
              "v": "partial",
              "fb": "Size can be relevant, but it does not establish the mechanism or competitive effect."
            },
            {
              "t": "Edward S. Mason let market share settle structure, conduct and performance while ignoring prices, costs, capacity, and contracts in the dated record in the case file.",
              "v": "wrong",
              "fb": "Low prices normally benefit buyers and require additional evidence before becoming predation."
            },
            {
              "t": "Edward S. Mason used an executive's ambition as sufficient proof of unlawful control over competition. The preferred narrative receives priority over verification.",
              "v": "danger",
              "fb": "Antitrust liability rests on conduct and effects, not a personality judgment."
            }
          ]
        },
        {
          "q": "Which market study would implement the method described in this briefing?",
          "o": [
            {
              "t": "Compare prices with defensible costs, entry barriers, financing constraints, and plausible later recoupment. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Yes: a predation theory requires an economic sacrifice, exclusionary path, and plausible payoff."
            },
            {
              "t": "Measure market share at one date, then infer every earlier and later competitive effect from it. The missing record is treated as a minor limitation.",
              "v": "partial",
              "fb": "A snapshot may miss entry, innovation, contracts, and changes in competitive constraint."
            },
            {
              "t": "Count the rivals that exited, but ignore differences in their products, costs, capacity, and funding. The account leans heavily on prior reputation.",
              "v": "wrong",
              "fb": "Exit is an outcome needing explanation, not self-proving evidence of unlawful conduct."
            },
            {
              "t": "Describe the firm as all-controlling, and treat every failed competitor as proof of the same plot. The dramatic explanation supplies the organizing theory.",
              "v": "danger",
              "fb": "A totalizing description prevents the inquiry from identifying a specific testable practice."
            }
          ]
        },
        {
          "q": "What antitrust lesson is best supported by structure, conduct and performance?",
          "o": [
            {
              "t": "Antitrust should distinguish harm to the competitive process from harm suffered by one competitor. The method stays visible under the documented sequence in the case file.",
              "v": "expert",
              "fb": "Exactly: antitrust protects the competitive process rather than guaranteeing particular firms survival."
            },
            {
              "t": "Protecting every incumbent rival should be the safest way to preserve competition and consumer welfare. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Shielding inefficient rivals can raise prices and suppress the competition antitrust seeks to preserve."
            },
            {
              "t": "Any efficiency claimed by a dominant firm should automatically defeat evidence of exclusion. The account leans heavily on prior reputation in the dated record.",
              "v": "wrong",
              "fb": "Efficiency is an evidentiary claim that must be tested against feasible alternatives and actual conduct."
            },
            {
              "t": "The mainly choices is treated as harmless superior competition or a conspiracy controlling the entire market. The preferred narrative receives priority over verification.",
              "v": "danger",
              "fb": "Market analysis can identify narrower misconduct without adopting either extreme."
            }
          ]
        }
      ]
    },
    "trustbust": {
      "sci": "Thurman Arnold (1891-1969)",
      "topic": "Trustbusting & enforcement",
      "lede": "Thurman Arnold asked trustbusting and enforcement to explain prices and strategy instead of merely naming a large firm.",
      "no": 8,
      "profile": "Today’s competition brief uses Thurman Arnold to unpack trustbusting and enforcement. Thurman Arnold led an energetic antitrust campaign in the late 1930s and early 1940s, using enforcement to challenge restrictive business practices across industries. Industrial organization asks how firms behave when products, costs, timing, information, and entry conditions differ from the textbook ideal. Arnold supplied a framework for turning broad claims about power into propositions that can be tested.\n\nThe analytical move is to build cases around documented restraints, coordinated conduct, and exclusion while using enforcement patterns to restore competitive openings. Market definition, substitution, marginal cost, capacity, contracting, and the feasibility of entry must be specified rather than assumed. A low price may be aggressive competition, a temporary investment, or a sacrifice intended to remove rivals; the surrounding evidence separates them.\n\nThe distinction matters because antitrust can harm consumers if it punishes ordinary price cutting, yet it can fail if it waits until exclusion has already destroyed the competitive process. Models organize the inquiry, but internal plans, actual costs, financing constraints, and post-exit conduct determine whether the model fits.\n\nThe economic lesson is antitrust gains credibility through concrete cases rather than general hostility toward business. Market power should be demonstrated through incentives and effects, not inferred from size or rhetoric alone. A plausible theory of harm must also explain why a challenged strategy would pay after rivals disappear. Efficiency claims deserve the same documentary testing as allegations of exclusion. A plausible theory of harm must also explain why a challenged strategy would pay after rivals disappear.",
      "frame": "Folds the strategy memo. \"Market share tells one line of the story. Prove you can read trustbusting and enforcement economically.\"",
      "q": [
        {
          "q": "Which economic statement best captures Thurman Arnold’s work on trustbusting and enforcement?",
          "o": [
            {
              "t": "Thurman Arnold made trustbusting and enforcement depend on specified costs, strategic incentives, entry conditions, and effects in the case file.",
              "v": "expert",
              "fb": "Correct: industrial organization turns allegations into testable claims about conduct and market conditions."
            },
            {
              "t": "Thurman Arnold treated trustbusting and enforcement as a label for every large firm without testing substitutes or entry in the case file in the case file.",
              "v": "partial",
              "fb": "Size can be relevant, but it does not establish the mechanism or competitive effect."
            },
            {
              "t": "Thurman Arnold let market share settle trustbusting and enforcement while ignoring prices, costs, capacity, and contracts in the case file in the case file.",
              "v": "wrong",
              "fb": "Low prices normally benefit buyers and require additional evidence before becoming predation."
            },
            {
              "t": "Thurman Arnold used an executive's ambition as sufficient proof of unlawful control over competition. The preferred narrative sets the order of review.",
              "v": "danger",
              "fb": "Antitrust liability rests on conduct and effects, not a personality judgment."
            }
          ]
        },
        {
          "q": "Which market study would implement the method described in this briefing?",
          "o": [
            {
              "t": "Compare prices with defensible costs, entry barriers, financing constraints, and plausible later recoupment. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Yes: a predation theory requires an economic sacrifice, exclusionary path, and plausible payoff."
            },
            {
              "t": "Measure market share at one date, then infer every earlier and later competitive effect from it. The missing record is treated as a minor limitation.",
              "v": "partial",
              "fb": "A snapshot may miss entry, innovation, contracts, and changes in competitive constraint."
            },
            {
              "t": "Count the rivals that exited, but ignore differences in their products, costs, capacity, and funding. The account leans heavily on prior reputation.",
              "v": "wrong",
              "fb": "Exit is an outcome needing explanation, not self-proving evidence of unlawful conduct."
            },
            {
              "t": "Describe the firm as all-controlling, and treat every failed competitor as proof of the same plot. The dramatic explanation supplies the organizing theory.",
              "v": "danger",
              "fb": "A totalizing description prevents the inquiry from identifying a specific testable practice."
            }
          ]
        },
        {
          "q": "What antitrust lesson is best supported by trustbusting and enforcement?",
          "o": [
            {
              "t": "Antitrust should distinguish harm to the competitive process from harm suffered by one competitor. The method stays visible under the documented sequence in the case file.",
              "v": "expert",
              "fb": "Exactly: antitrust protects the competitive process rather than guaranteeing particular firms survival."
            },
            {
              "t": "Protecting every incumbent rival should be the safest way to preserve competition and consumer welfare. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Shielding inefficient rivals can raise prices and suppress the competition antitrust seeks to preserve."
            },
            {
              "t": "Any efficiency claimed by a dominant firm should automatically defeat evidence of exclusion. The account leans heavily on prior reputation in the dated record.",
              "v": "wrong",
              "fb": "Efficiency is an evidentiary claim that must be tested against feasible alternatives and actual conduct."
            },
            {
              "t": "The mainly choices is treated as harmless superior competition or a conspiracy controlling the entire market. The preferred narrative receives priority over verification.",
              "v": "danger",
              "fb": "Market analysis can identify narrower misconduct without adopting either extreme."
            }
          ]
        }
      ]
    },
    "paradox": {
      "sci": "Robert H. Bork (1927-2012)",
      "topic": "The antitrust paradox",
      "lede": "Market power became measurable rather than theatrical in Robert H. Bork's account of the antitrust paradox.",
      "no": 9,
      "profile": "Today’s competition brief uses Robert H. Bork to unpack the antitrust paradox. Robert Bork argued that antitrust should center on consumer welfare and criticized doctrines he believed protected competitors rather than competition. Industrial organization asks how firms behave when products, costs, timing, information, and entry conditions differ from the textbook ideal. Bork supplied a framework for turning broad claims about power into propositions that can be tested.\n\nThe analytical move is to connect enforcement to output, price, efficiency, and consumer effects while stating the chosen welfare standard openly. Market definition, substitution, marginal cost, capacity, contracting, and the feasibility of entry must be specified rather than assumed. A low price may be aggressive competition, a temporary investment, or a sacrifice intended to remove rivals; the surrounding evidence separates them.\n\nThe distinction matters because antitrust can harm consumers if it punishes ordinary price cutting, yet it can fail if it waits until exclusion has already destroyed the competitive process. Models organize the inquiry, but internal plans, actual costs, financing constraints, and post-exit conduct determine whether the model fits.\n\nThe economic lesson is a narrow objective can improve consistency while also excluding harms the objective does not count. Market power should be demonstrated through incentives and effects, not inferred from size or rhetoric alone. A plausible theory of harm must also explain why a challenged strategy would pay after rivals disappear. Efficiency claims deserve the same documentary testing as allegations of exclusion. A plausible theory of harm must also explain why a challenged strategy would pay after rivals disappear.",
      "frame": "Circles a price below the benchmark. \"Do not call it predation until you understand the antitrust paradox.\"",
      "q": [
        {
          "q": "Which economic statement best captures Robert H. Bork’s work on the antitrust paradox?",
          "o": [
            {
              "t": "Robert H. Bork made the antitrust paradox depend on specified costs, strategic incentives, entry conditions, and effects. It remains checkable in the dated record in the case file.",
              "v": "expert",
              "fb": "Correct: industrial organization turns allegations into testable claims about conduct and market conditions."
            },
            {
              "t": "Robert H. Bork treated the antitrust paradox as a label for every large firm without testing substitutes or entry. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Size can be relevant, but it does not establish the mechanism or competitive effect."
            },
            {
              "t": "Robert H. Bork let market share settle the antitrust paradox while ignoring prices, costs, capacity, and contracts. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "Low prices normally benefit buyers and require additional evidence before becoming predation."
            },
            {
              "t": "Robert H. Bork used an executive's ambition as sufficient proof of unlawful control over competition. Size becomes a substitute for analysis in the dated record in the case file.",
              "v": "danger",
              "fb": "Antitrust liability rests on conduct and effects, not a personality judgment."
            }
          ]
        },
        {
          "q": "Which market study would implement the method described in this briefing?",
          "o": [
            {
              "t": "Compare prices with defensible costs, entry barriers, financing constraints, and plausible later recoupment. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Yes: a predation theory requires an economic sacrifice, exclusionary path, and plausible payoff."
            },
            {
              "t": "Measure market share at one date, then infer every earlier and later competitive effect from it. The missing record is treated as a minor limitation.",
              "v": "partial",
              "fb": "A snapshot may miss entry, innovation, contracts, and changes in competitive constraint."
            },
            {
              "t": "Count the rivals that exited, but ignore differences in their products, costs, capacity, and funding. The account leans heavily on prior reputation.",
              "v": "wrong",
              "fb": "Exit is an outcome needing explanation, not self-proving evidence of unlawful conduct."
            },
            {
              "t": "Describe the firm as all-controlling, and treat every failed competitor as proof of the same plot. The dramatic explanation supplies the organizing theory.",
              "v": "danger",
              "fb": "A totalizing description prevents the inquiry from identifying a specific testable practice."
            }
          ]
        },
        {
          "q": "What antitrust lesson is best supported by the antitrust paradox?",
          "o": [
            {
              "t": "Antitrust should distinguish harm to the competitive process from harm suffered by one competitor. The method stays visible under the documented sequence in the case file.",
              "v": "expert",
              "fb": "Exactly: antitrust protects the competitive process rather than guaranteeing particular firms survival."
            },
            {
              "t": "Protecting every incumbent rival should be the safest way to preserve competition and consumer welfare. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Shielding inefficient rivals can raise prices and suppress the competition antitrust seeks to preserve."
            },
            {
              "t": "Any efficiency claimed by a dominant firm should automatically defeat evidence of exclusion. The account leans heavily on prior reputation in the dated record.",
              "v": "wrong",
              "fb": "Efficiency is an evidentiary claim that must be tested against feasible alternatives and actual conduct."
            },
            {
              "t": "The mainly choices is treated as harmless superior competition or a conspiracy controlling the entire market. The preferred narrative receives priority over verification.",
              "v": "danger",
              "fb": "Market analysis can identify narrower misconduct without adopting either extreme."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "analyst": {
      "market": "Analyst Mira Kade joins you at the marketplace & rivals with a price chart folded inside a legal pad. \"Ran the numbers showing the price war lost money on purpose — then watched them vanish. The losses were strategic, not magical, and the memo gave them a horizon.\"",
      "boardroom": "Analyst Mira Kade joins you at the company boardroom with a price chart folded inside a legal pad. \"Ran the numbers showing the price war lost money on purpose — then watched them vanish. The losses were strategic, not magical, and the memo gave them a horizon.\"",
      "strategyfiles": "Analyst Mira Kade joins you at the strategy office's files with a price chart folded inside a legal pad. \"Ran the numbers showing the price war lost money on purpose — then watched them vanish. The losses were strategic, not magical, and the memo gave them a horizon.\""
    },
    "clerk": {
      "market": "The Records Clerk joins you at the marketplace & rivals with a price chart folded inside a legal pad. \"Keeps the board minutes and the study stamped 'do not distribute'. The losses were strategic, not magical, and the memo gave them a horizon.\"",
      "boardroom": "The Records Clerk joins you at the company boardroom with a price chart folded inside a legal pad. \"Keeps the board minutes and the study stamped 'do not distribute'. The losses were strategic, not magical, and the memo gave them a horizon.\"",
      "strategyfiles": "The Records Clerk joins you at the strategy office's files with a price chart folded inside a legal pad. \"Keeps the board minutes and the study stamped 'do not distribute'. The losses were strategic, not magical, and the memo gave them a horizon.\""
    },
    "rival": {
      "market": "Rival Founder Estes joins you at the marketplace & rivals with a price chart folded inside a legal pad. \"Watched Cygnet undercut him below cost until his funding dried up. The losses were strategic, not magical, and the memo gave them a horizon.\"",
      "boardroom": "Rival Founder Estes joins you at the company boardroom with a price chart folded inside a legal pad. \"Watched Cygnet undercut him below cost until his funding dried up. The losses were strategic, not magical, and the memo gave them a horizon.\"",
      "strategyfiles": "Rival Founder Estes joins you at the strategy office's files with a price chart folded inside a legal pad. \"Watched Cygnet undercut him below cost until his funding dried up. The losses were strategic, not magical, and the memo gave them a horizon.\""
    }
  },
  "story": [
    "<b>The Cygnet Standard</b> opens inside the Cygnet antitrust inquiry, where the public explanation has hardened faster than the evidence.",
    "<b>Analyst Mira Kade</b>, <b>The Records Clerk</b>, and <b>Rival Founder Estes</b> hold different parts of the record, and every conversation begins with one real figure whose work teaches you how to read it.",
    "The case keeps pulling investigators toward <b>A sinister plot to control everything</b> or <b>Nothing wrong — just a better competitor winning</b>. Both are plausible enough to survive a headline; neither should survive the full dossier untested.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide the <b>WHAT</b> for yourself."
  ],
  "endings": {
    "overclaimWhat": "empire",
    "dismissalWhat": "merit",
    "win": {
      "expertTitle": "The Price War Had a Recovery Plan",
      "expert": [
        "You accuse <b>Roland Vane — the founder & chief executive</b>, locate the concealed analysis in <b>The Strategy Office's Files</b>, and establish <b>Below-cost pricing & a buried internal study</b>. Not a sinister plot to control everything. Not nothing wrong — just a better competitor winning.",
        "The internal study records deliberate losses, financing pressure on rivals, and a path to recover them after exit. The finding concerns a specific predatory strategy, not the mere fact that Cygnet became large."
      ],
      "soundTitle": "Predation Economically Shown",
      "sound": [
        "You correctly connect <b>Roland Vane — the founder & chief executive</b>, <b>The Strategy Office's Files</b>, and <b>Below-cost pricing & a buried internal study</b>. Costs and internal planning support the theory of exclusion.",
        "The exact recoupment period could be developed further, but the buried analysis defeats the claim that below-cost pricing was ordinary superior competition."
      ],
      "namedTitle": "The Buried Strategy",
      "named": [
        "You identify the correct combination: <b>Roland Vane — the founder & chief executive</b>, <b>The Strategy Office's Files</b>, and <b>Below-cost pricing & a buried internal study</b>.",
        "Your explanation is concise, yet it directs enforcement toward the cost study, board authorization, and post-exit pricing plan."
      ]
    },
    "overclaim": {
      "title": "An Empire Without a Test",
      "body": [
        "You choose <b>A sinister plot to control everything</b>, accusing Cygnet of universal control instead of proving a particular exclusionary practice.",
        "The exaggeration lets the company answer rhetoric with rhetoric. A documented below-cost campaign and buried study are lost inside a claim too broad for economic proof."
      ]
    },
    "dismissal": {
      "title": "Low Prices, No Questions",
      "body": [
        "You accept <b>Nothing wrong — just a better competitor winning</b>, treating consumer discounts as the end of the analysis even when the company forecast losses and rival exit.",
        "That approach waits until recoupment before recognizing the sacrifice that enabled it. The competitive process is gone by the time the harm becomes obvious."
      ]
    },
    "wrongNames": {
      "title": "Right Theory, Wrong Decision Maker",
      "body": [
        "You prove <b>Below-cost pricing & a buried internal study</b>, but attach the authorization to the wrong executive or search outside the strategy files for the culminating evidence. The restricted study leads instead to"
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A market price line driven below cost\"><path d=\"M64 110 L64 24 M64 110 L330 110\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M84 44 C136 50,178 62,222 76 S292 98,320 102\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2.2\"/><line x1=\"80\" y1=\"82\" x2=\"324\" y2=\"82\" stroke=\"#326891\" stroke-width=\"1.8\" stroke-dasharray=\"5 4\"/><path d=\"M392 34 L554 34 L554 104 L392 104 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M410 54 L536 54 M410 70 L520 70 M410 86 L532 86\" stroke=\"#e2e2d8\" stroke-width=\"1.2\"/><circle cx=\"582\" cy=\"70\" r=\"18\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/></svg>"
}};
