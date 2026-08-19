module.exports = { PACK: {
  "id": "j_bank",
  "title": "The Sterling Trust Collapse",
  "discipline": "Banking & Systemic Risk",
  "teaser": "A pillar bank that passed every stress test failed in a single weekend. A foreign raid on the currency? A once-a-century storm? Or leverage no model was allowed to see?",
  "overclaimTag": "an attack on the currency",
  "truthTag": "hidden leverage & gamed models",
  "venue": "the Sterling Trust failure inquiry",
  "agent": {
    "name": "Investigator Cara Finch",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Economists",
  "readingLabel": "Students of Panics & Risk",
  "dossierName": "STUDENTS OF PANICS & RISK",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Sterling Trust failure inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The WHERE you test determines the dossier, and the conversation costs one day.",
  "overclaimTease": "A currency attack is cinematic; the balance sheet may contain a more exact explanation.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "cro",
      "items": [
        {
          "id": "ceo",
          "label": "The bank's chief executive"
        },
        {
          "id": "cro",
          "label": "Adrian Sable — the chief risk officer"
        },
        {
          "id": "regulator",
          "label": "The bank supervisor"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "riskfiles",
      "items": [
        {
          "id": "dealing",
          "label": "The Dealing Room"
        },
        {
          "id": "supervisor",
          "label": "The Supervisor's Office"
        },
        {
          "id": "riskfiles",
          "label": "The Risk Department's Model Files"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "leverage",
      "items": [
        {
          "id": "attack",
          "label": "A foreign raid on the currency broke the bank"
        },
        {
          "id": "storm",
          "label": "A once-a-century storm no one could foresee"
        },
        {
          "id": "leverage",
          "label": "Hidden leverage & risk models quietly gamed"
        }
      ]
    }
  },
  "PLACES": {
    "dealing": {
      "name": "The Dealing Room",
      "xy": [
        140,
        90
      ]
    },
    "supervisor": {
      "name": "The Supervisor's Office",
      "xy": [
        330,
        240
      ]
    },
    "riskfiles": {
      "name": "The Risk Department's Model Files",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "dealing",
      "supervisor"
    ],
    [
      "supervisor",
      "riskfiles"
    ]
  ],
  "CHARACTERS": {
    "quant": {
      "name": "Quant Analyst Priya Sen",
      "role": "Risk quant",
      "face": "🧮",
      "badge": "P",
      "legend": "the risk desk",
      "hint": "Built the model; watched its worst-case number get dialed down by hand."
    },
    "clerk": {
      "name": "The Records Clerk",
      "role": "Risk-department clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the risk office",
      "hint": "Keeps the model sign-offs and the exposures kept off the main book."
    },
    "dealer": {
      "name": "Head Dealer Marlow",
      "role": "Head bond dealer",
      "face": "📉",
      "badge": "M",
      "legend": "the dealing room",
      "hint": "Ran the leverage everyone praised until the repo lenders vanished."
    }
  },
  "TOPICMAP": {
    "dealing": {
      "quant": [
        "crowds"
      ],
      "clerk": [
        "debtdeflation"
      ],
      "dealer": [
        "liquidity"
      ]
    },
    "supervisor": {
      "quant": [
        "instability"
      ],
      "clerk": [
        "fattails"
      ],
      "dealer": [
        "exuberance"
      ]
    },
    "riskfiles": {
      "quant": [
        "thistime"
      ],
      "clerk": [
        "warning"
      ],
      "dealer": [
        "blackswan"
      ]
    }
  },
  "TOPICS": {
    "crowds": {
      "sci": "Charles Mackay (1814-1889)",
      "topic": "Popular delusions & the madness of crowds",
      "lede": "Charles Mackay traced popular delusions and the madness of crowds through leverage, liquidity, incentives, and assumptions that fail under stress.",
      "no": 1,
      "profile": "Today’s risk memorandum centers on Charles Mackay and the financial mechanics of popular delusions and the madness of crowds. Charles Mackay collected episodes of bubbles, fashions, and collective credulity in Extraordinary Popular Delusions and the Madness of Crowds. Banks can appear profitable and liquid while relying on fragile funding, optimistic correlations, or assets that cannot be sold at quoted prices during stress. Mackay’s work helps distinguish a forecast from the balance-sheet mechanism beneath it.\n\nThe correct exercise is to study how imitation, social proof, leverage, and persuasive narratives amplify individual errors into market-wide behavior. Analysts should trace cash obligations by date, identify who may refuse rollover, apply losses before regulatory adjustments, and test assumptions outside the calm period used for calibration. Leverage, collateral, and network exposure can turn a modest shock into forced action.\n\nRisk metrics are useful summaries, not independent resources. A model cannot supply cash, stop a depositor, or guarantee that yesterday’s correlation survives a common sale. Equally, an extreme event is not automatically unforeseeable if the institution deliberately excluded the scenario from review.\n\nThe prudent conclusion is a crowd can coordinate on a mistaken price without any single hidden mastermind directing it. Resilience depends on visible loss absorption and funding capacity, not the elegance of a reported score. Stress testing should reveal which assumption drives survival rather than hide that dependence inside one result. A solvent institution can face a run, while a liquid appearance can temporarily disguise insolvency. Stress testing should reveal which assumption drives survival rather than hide that dependence inside one result.",
      "frame": "Freezes the dashboard on a passing score. \"At The Dealing Room, the ratio survived and the funding did not. Explain popular delusions and the madness of crowds.\"",
      "q": [
        {
          "q": "Which risk statement most closely matches Charles Mackay’s analysis of popular delusions and the madness of crowds?",
          "o": [
            {
              "t": "Charles Mackay made popular delusions and the madness of crowds depend on funding mechanics, leverage, behavioral response, and model limits. The method stays visible in the operational record.",
              "v": "expert",
              "fb": "Correct: the analytical focus is the mechanism linking funding, assets, leverage, and behavior."
            },
            {
              "t": "Charles Mackay treated popular delusions and the madness of crowds as controlled whenever a bank passed one approved regulatory stress test. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A test is conditional on its scenarios and does not itself supply liquidity."
            },
            {
              "t": "Charles Mackay let recent price stability settle popular delusions and the madness of crowds without testing liquidity or forced-sale feedback. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "Calm observations can coexist with a balance sheet that is highly sensitive to change."
            },
            {
              "t": "Charles Mackay used any sudden failure in popular delusions and the madness of crowds as proof of an unforeseeable outside attack. The preferred narrative receives priority over verification.",
              "v": "danger",
              "fb": "External shocks matter, but internal fragility determines how much damage they cause."
            }
          ]
        },
        {
          "q": "Which stress exercise applies the method described in today’s memorandum?",
          "o": [
            {
              "t": "Recalculate cash needs, leverage, collateral, and rollover exposure under several adverse funding scenarios. It remains checkable in the case file in the case file.",
              "v": "expert",
              "fb": "Yes: a stress test should expose dependence on assumptions before events force the calculation."
            },
            {
              "t": "Repeat the approved model with newer data, but leave its excluded failure scenarios unchanged. Tail exposure remains untested in the dated record in the case file.",
              "v": "partial",
              "fb": "Fresh data do not repair a scenario set designed to avoid the relevant failure mode."
            },
            {
              "t": "Reduce the reported exposure until the bank passes, then describe the target as a measurement. Funding data contradict that assurance in the case file in the case file.",
              "v": "wrong",
              "fb": "Changing the input to achieve a pass converts measurement into target management."
            },
            {
              "t": "Model a currency raid in detail, while omitting ordinary lender withdrawal and forced asset sales. The preferred narrative receives priority over verification.",
              "v": "danger",
              "fb": "A dramatic scenario can distract from a simpler and more probable funding mechanism."
            }
          ]
        },
        {
          "q": "What prudential lesson is most consistent with popular delusions and the madness of crowds?",
          "o": [
            {
              "t": "Risk conclusions should identify the assumptions, funding channels, and loss buffers on which survival depends. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Exactly: useful risk work makes vulnerabilities and conditional assumptions visible to decision makers."
            },
            {
              "t": "A larger model should be safer even when its inputs, dependencies, and tail behavior remain unexplained. The comparison is narrowed to the favored documents.",
              "v": "partial",
              "fb": "Complexity can hide sensitivity as easily as it can represent it."
            },
            {
              "t": "Regulatory compliance should prove resilience because every material exposure is already inside the ratio. The account leans heavily on prior reputation.",
              "v": "wrong",
              "fb": "Rules provide minimum tests, not proof that every institution has captured every exposure."
            },
            {
              "t": "A collapse is treated as malicious attack or a rare storm that no responsible institution could plan for. The attack story precedes stress testing.",
              "v": "danger",
              "fb": "Internal leverage and funding choices can produce a specific preventable failure between those extremes."
            }
          ]
        }
      ]
    },
    "debtdeflation": {
      "sci": "Irving Fisher (1867-1947)",
      "topic": "Debt-deflation",
      "lede": "Irving Fisher used debt-deflation to expose the funding mechanism beneath a calm reported number.",
      "no": 2,
      "profile": "Today’s risk memorandum centers on Irving Fisher and the financial mechanics of debt-deflation. Irving Fisher described debt-deflation after the Great Depression: falling prices raise real debt burdens, forcing sales that push prices and incomes lower. Banks can appear profitable and liquid while relying on fragile funding, optimistic correlations, or assets that cannot be sold at quoted prices during stress. Fisher’s work helps distinguish a forecast from the balance-sheet mechanism beneath it.\n\nThe correct exercise is to trace feedback among leverage, forced liquidation, asset prices, net worth, spending, and defaults. Analysts should trace cash obligations by date, identify who may refuse rollover, apply losses before regulatory adjustments, and test assumptions outside the calm period used for calibration. Leverage, collateral, and network exposure can turn a modest shock into forced action.\n\nRisk metrics are useful summaries, not independent resources. A model cannot supply cash, stop a depositor, or guarantee that yesterday’s correlation survives a common sale. Equally, an extreme event is not automatically unforeseeable if the institution deliberately excluded the scenario from review.\n\nThe prudent conclusion is a shock becomes systemic when balance-sheet responses reinforce the original decline. Resilience depends on visible loss absorption and funding capacity, not the elegance of a reported score. Stress testing should reveal which assumption drives survival rather than hide that dependence inside one result. A solvent institution can face a run, while a liquid appearance can temporarily disguise insolvency. Stress testing should reveal which assumption drives survival rather than hide that dependence inside one result. A solvent institution can face a run, while a liquid appearance can temporarily disguise insolvency.",
      "frame": "Closes the stress workbook. \"A number can be gamed or merely wrong. Begin with debt-deflation.\"",
      "q": [
        {
          "q": "Which risk statement most closely matches Irving Fisher’s analysis of debt-deflation?",
          "o": [
            {
              "t": "Irving Fisher made debt-deflation depend on funding mechanics, leverage, behavioral response, and model limits. The method stays visible in the operational record.",
              "v": "expert",
              "fb": "Correct: the analytical focus is the mechanism linking funding, assets, leverage, and behavior."
            },
            {
              "t": "Irving Fisher treated debt-deflation as controlled whenever a bank passed one approved regulatory stress test. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A test is conditional on its scenarios and does not itself supply liquidity."
            },
            {
              "t": "Irving Fisher let recent price stability settle debt-deflation without testing liquidity or forced-sale feedback. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "Calm observations can coexist with a balance sheet that is highly sensitive to change."
            },
            {
              "t": "Irving Fisher used any sudden failure in debt-deflation as proof of an unforeseeable outside attack. The preferred narrative receives priority over verification.",
              "v": "danger",
              "fb": "External shocks matter, but internal fragility determines how much damage they cause."
            }
          ]
        },
        {
          "q": "Which stress exercise applies the method described in today’s memorandum?",
          "o": [
            {
              "t": "Recalculate cash needs, leverage, collateral, and rollover exposure under several adverse funding scenarios. It remains checkable in the case file in the case file.",
              "v": "expert",
              "fb": "Yes: a stress test should expose dependence on assumptions before events force the calculation."
            },
            {
              "t": "Repeat the approved model with newer data, but leave its excluded failure scenarios unchanged. Tail exposure remains untested in the dated record in the case file.",
              "v": "partial",
              "fb": "Fresh data do not repair a scenario set designed to avoid the relevant failure mode."
            },
            {
              "t": "Reduce the reported exposure until the bank passes, then describe the target as a measurement. Funding data contradict that assurance in the case file in the case file.",
              "v": "wrong",
              "fb": "Changing the input to achieve a pass converts measurement into target management."
            },
            {
              "t": "Model a currency raid in detail, while omitting ordinary lender withdrawal and forced asset sales. The preferred narrative receives priority over verification.",
              "v": "danger",
              "fb": "A dramatic scenario can distract from a simpler and more probable funding mechanism."
            }
          ]
        },
        {
          "q": "What prudential lesson is most consistent with debt-deflation?",
          "o": [
            {
              "t": "Risk conclusions should identify the assumptions, funding channels, and loss buffers on which survival depends. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Exactly: useful risk work makes vulnerabilities and conditional assumptions visible to decision makers."
            },
            {
              "t": "A larger model should be safer even when its inputs, dependencies, and tail behavior remain unexplained. The comparison is narrowed to the favored documents.",
              "v": "partial",
              "fb": "Complexity can hide sensitivity as easily as it can represent it."
            },
            {
              "t": "Regulatory compliance should prove resilience because every material exposure is already inside the ratio. The account leans heavily on prior reputation.",
              "v": "wrong",
              "fb": "Rules provide minimum tests, not proof that every institution has captured every exposure."
            },
            {
              "t": "A collapse is treated as malicious attack or a rare storm that no responsible institution could plan for. The attack story precedes stress testing.",
              "v": "danger",
              "fb": "Internal leverage and funding choices can produce a specific preventable failure between those extremes."
            }
          ]
        }
      ]
    },
    "liquidity": {
      "sci": "John Maynard Keynes (1883-1946)",
      "topic": "Liquidity & animal spirits",
      "lede": "A risk score met the balance sheet in John Maynard Keynes's analysis of liquidity and animal spirits.",
      "no": 3,
      "profile": "Today’s risk memorandum centers on John Maynard Keynes and the financial mechanics of liquidity and animal spirits. John Maynard Keynes emphasized liquidity preference, expectations, and animal spirits in explaining investment and financial behavior. Banks can appear profitable and liquid while relying on fragile funding, optimistic correlations, or assets that cannot be sold at quoted prices during stress. Keynes’s work helps distinguish a forecast from the balance-sheet mechanism beneath it.\n\nThe correct exercise is to examine why holders value cash or safe assets when future prices and opportunities are uncertain. Analysts should trace cash obligations by date, identify who may refuse rollover, apply losses before regulatory adjustments, and test assumptions outside the calm period used for calibration. Leverage, collateral, and network exposure can turn a modest shock into forced action.\n\nRisk metrics are useful summaries, not independent resources. A model cannot supply cash, stop a depositor, or guarantee that yesterday’s correlation survives a common sale. Equally, an extreme event is not automatically unforeseeable if the institution deliberately excluded the scenario from review.\n\nThe prudent conclusion is liquidity demand can rise collectively and destabilize markets even when each individual choice appears prudent. Resilience depends on visible loss absorption and funding capacity, not the elegance of a reported score. Stress testing should reveal which assumption drives survival rather than hide that dependence inside one result. A solvent institution can face a run, while a liquid appearance can temporarily disguise insolvency. Stress testing should reveal which assumption drives survival rather than hide that dependence inside one result.",
      "frame": "Writes a haircut beside the model output. \"Cash has a clock. Show me what liquidity and animal spirits says about it.\"",
      "q": [
        {
          "q": "Which risk statement most closely matches John Maynard Keynes’s analysis of liquidity and animal spirits?",
          "o": [
            {
              "t": "John Maynard Keynes made liquidity and animal spirits depend on funding mechanics, leverage, behavioral response, and model limits. The method stays visible in the operational record.",
              "v": "expert",
              "fb": "Correct: the analytical focus is the mechanism linking funding, assets, leverage, and behavior."
            },
            {
              "t": "John Maynard Keynes treated liquidity and animal spirits as controlled whenever a bank passed one approved regulatory stress test. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A test is conditional on its scenarios and does not itself supply liquidity."
            },
            {
              "t": "John Maynard Keynes let recent price stability settle liquidity and animal spirits without testing liquidity or forced-sale feedback. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "Calm observations can coexist with a balance sheet that is highly sensitive to change."
            },
            {
              "t": "John Maynard Keynes used any sudden failure in liquidity and animal spirits as proof of an unforeseeable outside attack. The preferred narrative receives priority over verification.",
              "v": "danger",
              "fb": "External shocks matter, but internal fragility determines how much damage they cause."
            }
          ]
        },
        {
          "q": "Which stress exercise applies the method described in today’s memorandum?",
          "o": [
            {
              "t": "Recalculate cash needs, leverage, collateral, and rollover exposure under several adverse funding scenarios. It remains checkable in the case file in the case file.",
              "v": "expert",
              "fb": "Yes: a stress test should expose dependence on assumptions before events force the calculation."
            },
            {
              "t": "Repeat the approved model with newer data, but leave its excluded failure scenarios unchanged. Tail exposure remains untested in the dated record in the case file.",
              "v": "partial",
              "fb": "Fresh data do not repair a scenario set designed to avoid the relevant failure mode."
            },
            {
              "t": "Reduce the reported exposure until the bank passes, then describe the target as a measurement. Funding data contradict that assurance in the case file in the case file.",
              "v": "wrong",
              "fb": "Changing the input to achieve a pass converts measurement into target management."
            },
            {
              "t": "Model a currency raid in detail, while omitting ordinary lender withdrawal and forced asset sales. The preferred narrative receives priority over verification.",
              "v": "danger",
              "fb": "A dramatic scenario can distract from a simpler and more probable funding mechanism."
            }
          ]
        },
        {
          "q": "What prudential lesson is most consistent with liquidity and animal spirits?",
          "o": [
            {
              "t": "Risk conclusions should identify the assumptions, funding channels, and loss buffers on which survival depends. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Exactly: useful risk work makes vulnerabilities and conditional assumptions visible to decision makers."
            },
            {
              "t": "A larger model should be safer even when its inputs, dependencies, and tail behavior remain unexplained. The comparison is narrowed to the favored documents.",
              "v": "partial",
              "fb": "Complexity can hide sensitivity as easily as it can represent it."
            },
            {
              "t": "Regulatory compliance should prove resilience because every material exposure is already inside the ratio. The account leans heavily on prior reputation.",
              "v": "wrong",
              "fb": "Rules provide minimum tests, not proof that every institution has captured every exposure."
            },
            {
              "t": "A collapse is treated as malicious attack or a rare storm that no responsible institution could plan for. The attack story precedes stress testing.",
              "v": "danger",
              "fb": "Internal leverage and funding choices can produce a specific preventable failure between those extremes."
            }
          ]
        }
      ]
    },
    "instability": {
      "sci": "Hyman Minsky (1919-1996)",
      "topic": "The financial-instability hypothesis",
      "lede": "Hyman Minsky traced the financial-instability hypothesis through leverage, liquidity, incentives, and assumptions that fail under stress.",
      "no": 4,
      "profile": "Today’s risk memorandum centers on Hyman Minsky and the financial mechanics of the financial-instability hypothesis. Hyman Minsky argued that long periods of stability encourage borrowers and lenders to move from cautious finance toward speculative and Ponzi positions. Banks can appear profitable and liquid while relying on fragile funding, optimistic correlations, or assets that cannot be sold at quoted prices during stress. Minsky’s work helps distinguish a forecast from the balance-sheet mechanism beneath it.\n\nThe correct exercise is to classify financing by whether cash flows cover principal and interest, only interest, or neither without refinancing. Analysts should trace cash obligations by date, identify who may refuse rollover, apply losses before regulatory adjustments, and test assumptions outside the calm period used for calibration. Leverage, collateral, and network exposure can turn a modest shock into forced action.\n\nRisk metrics are useful summaries, not independent resources. A model cannot supply cash, stop a depositor, or guarantee that yesterday’s correlation survives a common sale. Equally, an extreme event is not automatically unforeseeable if the institution deliberately excluded the scenario from review.\n\nThe prudent conclusion is apparent stability can create the leverage and dependence that make the system fragile. Resilience depends on visible loss absorption and funding capacity, not the elegance of a reported score. Stress testing should reveal which assumption drives survival rather than hide that dependence inside one result. A solvent institution can face a run, while a liquid appearance can temporarily disguise insolvency. Stress testing should reveal which assumption drives survival rather than hide that dependence inside one result.",
      "frame": "Freezes the dashboard on a passing score. \"At The Supervisor's Office, the ratio survived and the funding did not. Explain the financial-instability hypothesis.\"",
      "q": [
        {
          "q": "Which risk statement most closely matches Hyman Minsky’s analysis of the financial-instability hypothesis?",
          "o": [
            {
              "t": "Hyman Minsky made the financial-instability hypothesis depend on funding mechanics, leverage, behavioral response, and model limits. The method stays visible in the operational record.",
              "v": "expert",
              "fb": "Correct: the analytical focus is the mechanism linking funding, assets, leverage, and behavior."
            },
            {
              "t": "Hyman Minsky treated the financial-instability hypothesis as controlled whenever a bank passed one approved regulatory stress test. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A test is conditional on its scenarios and does not itself supply liquidity."
            },
            {
              "t": "Hyman Minsky let recent price stability settle the financial-instability hypothesis without testing liquidity or forced-sale feedback. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "Calm observations can coexist with a balance sheet that is highly sensitive to change."
            },
            {
              "t": "Hyman Minsky used any sudden failure in the financial-instability hypothesis as proof of an unforeseeable outside attack. The preferred narrative receives priority over verification.",
              "v": "danger",
              "fb": "External shocks matter, but internal fragility determines how much damage they cause."
            }
          ]
        },
        {
          "q": "Which stress exercise applies the method described in today’s memorandum?",
          "o": [
            {
              "t": "Recalculate cash needs, leverage, collateral, and rollover exposure under several adverse funding scenarios. It remains checkable in the case file in the case file.",
              "v": "expert",
              "fb": "Yes: a stress test should expose dependence on assumptions before events force the calculation."
            },
            {
              "t": "Repeat the approved model with newer data, but leave its excluded failure scenarios unchanged. Tail exposure remains untested in the dated record in the case file.",
              "v": "partial",
              "fb": "Fresh data do not repair a scenario set designed to avoid the relevant failure mode."
            },
            {
              "t": "Reduce the reported exposure until the bank passes, then describe the target as a measurement. Funding data contradict that assurance in the case file in the case file.",
              "v": "wrong",
              "fb": "Changing the input to achieve a pass converts measurement into target management."
            },
            {
              "t": "Model a currency raid in detail, while omitting ordinary lender withdrawal and forced asset sales. The preferred narrative receives priority over verification.",
              "v": "danger",
              "fb": "A dramatic scenario can distract from a simpler and more probable funding mechanism."
            }
          ]
        },
        {
          "q": "What prudential lesson is most consistent with the financial-instability hypothesis?",
          "o": [
            {
              "t": "Risk conclusions should identify the assumptions, funding channels, and loss buffers on which survival depends. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Exactly: useful risk work makes vulnerabilities and conditional assumptions visible to decision makers."
            },
            {
              "t": "A larger model should be safer even when its inputs, dependencies, and tail behavior remain unexplained. The comparison is narrowed to the favored documents.",
              "v": "partial",
              "fb": "Complexity can hide sensitivity as easily as it can represent it."
            },
            {
              "t": "Regulatory compliance should prove resilience because every material exposure is already inside the ratio. The account leans heavily on prior reputation.",
              "v": "wrong",
              "fb": "Rules provide minimum tests, not proof that every institution has captured every exposure."
            },
            {
              "t": "A collapse is treated as malicious attack or a rare storm that no responsible institution could plan for. The attack story precedes stress testing.",
              "v": "danger",
              "fb": "Internal leverage and funding choices can produce a specific preventable failure between those extremes."
            }
          ]
        }
      ]
    },
    "fattails": {
      "sci": "Benoit Mandelbrot (1924-2010)",
      "topic": "Fat tails & the misbehavior of markets",
      "lede": "Benoit Mandelbrot used fat tails and the misbehavior of markets to expose the funding mechanism beneath a calm reported number.",
      "no": 5,
      "profile": "Today’s risk memorandum centers on Benoit Mandelbrot and the financial mechanics of fat tails and the misbehavior of markets. Benoit Mandelbrot showed that financial price changes display clustering and heavy tails inconsistent with simple normal-distribution assumptions. Banks can appear profitable and liquid while relying on fragile funding, optimistic correlations, or assets that cannot be sold at quoted prices during stress. Mandelbrot’s work helps distinguish a forecast from the balance-sheet mechanism beneath it.\n\nThe correct exercise is to inspect empirical return distributions, scaling, volatility clustering, and extreme observations rather than fitting convenience first. Analysts should trace cash obligations by date, identify who may refuse rollover, apply losses before regulatory adjustments, and test assumptions outside the calm period used for calibration. Leverage, collateral, and network exposure can turn a modest shock into forced action.\n\nRisk metrics are useful summaries, not independent resources. A model cannot supply cash, stop a depositor, or guarantee that yesterday’s correlation survives a common sale. Equally, an extreme event is not automatically unforeseeable if the institution deliberately excluded the scenario from review.\n\nThe prudent conclusion is rare market moves may be far more frequent than a thin-tailed model suggests. Resilience depends on visible loss absorption and funding capacity, not the elegance of a reported score. Stress testing should reveal which assumption drives survival rather than hide that dependence inside one result. A solvent institution can face a run, while a liquid appearance can temporarily disguise insolvency. Stress testing should reveal which assumption drives survival rather than hide that dependence inside one result.",
      "frame": "Closes the stress workbook. \"A number can be gamed or merely wrong. Begin with fat tails and the misbehavior of markets.\"",
      "q": [
        {
          "q": "Which risk statement most closely matches Benoit Mandelbrot’s analysis of fat tails and the misbehavior of markets?",
          "o": [
            {
              "t": "Benoit Mandelbrot made fat tails and the misbehavior of markets depend on funding mechanics, leverage, behavioral response, and model limits. The method stays visible in the operational record.",
              "v": "expert",
              "fb": "Correct: the analytical focus is the mechanism linking funding, assets, leverage, and behavior."
            },
            {
              "t": "Benoit Mandelbrot treated fat tails and the misbehavior of markets as controlled whenever a bank passed one approved regulatory stress test. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A test is conditional on its scenarios and does not itself supply liquidity."
            },
            {
              "t": "Benoit Mandelbrot let recent price stability settle fat tails and the misbehavior of markets without testing liquidity or forced-sale feedback. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "Calm observations can coexist with a balance sheet that is highly sensitive to change."
            },
            {
              "t": "Benoit Mandelbrot used any sudden failure in fat tails and the misbehavior of markets as proof of an unforeseeable outside attack. The preferred narrative receives priority over verification.",
              "v": "danger",
              "fb": "External shocks matter, but internal fragility determines how much damage they cause."
            }
          ]
        },
        {
          "q": "Which stress exercise applies the method described in today’s memorandum?",
          "o": [
            {
              "t": "Recalculate cash needs, leverage, collateral, and rollover exposure under several adverse funding scenarios. It remains checkable in the case file in the case file.",
              "v": "expert",
              "fb": "Yes: a stress test should expose dependence on assumptions before events force the calculation."
            },
            {
              "t": "Repeat the approved model with newer data, but leave its excluded failure scenarios unchanged. Tail exposure remains untested in the dated record in the case file.",
              "v": "partial",
              "fb": "Fresh data do not repair a scenario set designed to avoid the relevant failure mode."
            },
            {
              "t": "Reduce the reported exposure until the bank passes, then describe the target as a measurement. Funding data contradict that assurance in the case file in the case file.",
              "v": "wrong",
              "fb": "Changing the input to achieve a pass converts measurement into target management."
            },
            {
              "t": "Model a currency raid in detail, while omitting ordinary lender withdrawal and forced asset sales. The preferred narrative receives priority over verification.",
              "v": "danger",
              "fb": "A dramatic scenario can distract from a simpler and more probable funding mechanism."
            }
          ]
        },
        {
          "q": "What prudential lesson is most consistent with fat tails and the misbehavior of markets?",
          "o": [
            {
              "t": "Risk conclusions should identify the assumptions, funding channels, and loss buffers on which survival depends. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Exactly: useful risk work makes vulnerabilities and conditional assumptions visible to decision makers."
            },
            {
              "t": "A larger model should be safer even when its inputs, dependencies, and tail behavior remain unexplained. The comparison is narrowed to the favored documents.",
              "v": "partial",
              "fb": "Complexity can hide sensitivity as easily as it can represent it."
            },
            {
              "t": "Regulatory compliance should prove resilience because every material exposure is already inside the ratio. The account leans heavily on prior reputation.",
              "v": "wrong",
              "fb": "Rules provide minimum tests, not proof that every institution has captured every exposure."
            },
            {
              "t": "A collapse is treated as malicious attack or a rare storm that no responsible institution could plan for. The attack story precedes stress testing.",
              "v": "danger",
              "fb": "Internal leverage and funding choices can produce a specific preventable failure between those extremes."
            }
          ]
        }
      ]
    },
    "exuberance": {
      "sci": "Robert Shiller (b. 1946)",
      "topic": "Bubbles & irrational exuberance",
      "lede": "A risk score met the balance sheet in Robert Shiller's analysis of bubbles and irrational exuberance.",
      "no": 6,
      "profile": "Today’s risk memorandum centers on Robert Shiller and the financial mechanics of bubbles and irrational exuberance. Robert Shiller used long-run valuation evidence, surveys, and behavioral insights to study bubbles and popular narratives in asset markets. Banks can appear profitable and liquid while relying on fragile funding, optimistic correlations, or assets that cannot be sold at quoted prices during stress. Shiller’s work helps distinguish a forecast from the balance-sheet mechanism beneath it.\n\nThe correct exercise is to compare prices with fundamentals over long periods and examine how stories, expectations, and feedback affect demand. Analysts should trace cash obligations by date, identify who may refuse rollover, apply losses before regulatory adjustments, and test assumptions outside the calm period used for calibration. Leverage, collateral, and network exposure can turn a modest shock into forced action.\n\nRisk metrics are useful summaries, not independent resources. A model cannot supply cash, stop a depositor, or guarantee that yesterday’s correlation survives a common sale. Equally, an extreme event is not automatically unforeseeable if the institution deliberately excluded the scenario from review.\n\nThe prudent conclusion is market prices contain information without guaranteeing that collective expectations are well anchored. Resilience depends on visible loss absorption and funding capacity, not the elegance of a reported score. Stress testing should reveal which assumption drives survival rather than hide that dependence inside one result. A solvent institution can face a run, while a liquid appearance can temporarily disguise insolvency. Stress testing should reveal which assumption drives survival rather than hide that dependence inside one result.",
      "frame": "Writes a haircut beside the model output. \"Cash has a clock. Show me what bubbles and irrational exuberance says about it.\"",
      "q": [
        {
          "q": "Which risk statement most closely matches Robert Shiller’s analysis of bubbles and irrational exuberance?",
          "o": [
            {
              "t": "Robert Shiller made bubbles and irrational exuberance depend on funding mechanics, leverage, behavioral response, and model limits. The method stays visible in the operational record.",
              "v": "expert",
              "fb": "Correct: the analytical focus is the mechanism linking funding, assets, leverage, and behavior."
            },
            {
              "t": "Robert Shiller treated bubbles and irrational exuberance as controlled whenever a bank passed one approved regulatory stress test. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A test is conditional on its scenarios and does not itself supply liquidity."
            },
            {
              "t": "Robert Shiller let recent price stability settle bubbles and irrational exuberance without testing liquidity or forced-sale feedback. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "Calm observations can coexist with a balance sheet that is highly sensitive to change."
            },
            {
              "t": "Robert Shiller used any sudden failure in bubbles and irrational exuberance as proof of an unforeseeable outside attack. The preferred narrative receives priority over verification.",
              "v": "danger",
              "fb": "External shocks matter, but internal fragility determines how much damage they cause."
            }
          ]
        },
        {
          "q": "Which stress exercise applies the method described in today’s memorandum?",
          "o": [
            {
              "t": "Recalculate cash needs, leverage, collateral, and rollover exposure under several adverse funding scenarios. It remains checkable in the case file in the case file.",
              "v": "expert",
              "fb": "Yes: a stress test should expose dependence on assumptions before events force the calculation."
            },
            {
              "t": "Repeat the approved model with newer data, but leave its excluded failure scenarios unchanged. Tail exposure remains untested in the dated record in the case file.",
              "v": "partial",
              "fb": "Fresh data do not repair a scenario set designed to avoid the relevant failure mode."
            },
            {
              "t": "Reduce the reported exposure until the bank passes, then describe the target as a measurement. Funding data contradict that assurance in the case file in the case file.",
              "v": "wrong",
              "fb": "Changing the input to achieve a pass converts measurement into target management."
            },
            {
              "t": "Model a currency raid in detail, while omitting ordinary lender withdrawal and forced asset sales. The preferred narrative receives priority over verification.",
              "v": "danger",
              "fb": "A dramatic scenario can distract from a simpler and more probable funding mechanism."
            }
          ]
        },
        {
          "q": "What prudential lesson is most consistent with bubbles and irrational exuberance?",
          "o": [
            {
              "t": "Risk conclusions should identify the assumptions, funding channels, and loss buffers on which survival depends. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Exactly: useful risk work makes vulnerabilities and conditional assumptions visible to decision makers."
            },
            {
              "t": "A larger model should be safer even when its inputs, dependencies, and tail behavior remain unexplained. The comparison is narrowed to the favored documents.",
              "v": "partial",
              "fb": "Complexity can hide sensitivity as easily as it can represent it."
            },
            {
              "t": "Regulatory compliance should prove resilience because every material exposure is already inside the ratio. The account leans heavily on prior reputation.",
              "v": "wrong",
              "fb": "Rules provide minimum tests, not proof that every institution has captured every exposure."
            },
            {
              "t": "A collapse is treated as malicious attack or a rare storm that no responsible institution could plan for. The attack story precedes stress testing.",
              "v": "danger",
              "fb": "Internal leverage and funding choices can produce a specific preventable failure between those extremes."
            }
          ]
        }
      ]
    },
    "thistime": {
      "sci": "Carmen Reinhart (b. 1955)",
      "topic": "'This time is different'",
      "lede": "Carmen Reinhart traced ’this time is different’ through leverage, liquidity, incentives, and assumptions that fail under stress.",
      "no": 7,
      "profile": "Today’s risk memorandum centers on Carmen Reinhart and the financial mechanics of ’this time is different’. Carmen Reinhart, with Kenneth Rogoff, assembled long historical datasets showing that debt booms and crises recur despite claims that a new era has removed old constraints. Banks can appear profitable and liquid while relying on fragile funding, optimistic correlations, or assets that cannot be sold at quoted prices during stress. Reinhart’s work helps distinguish a forecast from the balance-sheet mechanism beneath it.\n\nThe correct exercise is to compare current conditions with broad historical episodes using consistent definitions and transparent treatment of missing data. Analysts should trace cash obligations by date, identify who may refuse rollover, apply losses before regulatory adjustments, and test assumptions outside the calm period used for calibration. Leverage, collateral, and network exposure can turn a modest shock into forced action.\n\nRisk metrics are useful summaries, not independent resources. A model cannot supply cash, stop a depositor, or guarantee that yesterday’s correlation survives a common sale. Equally, an extreme event is not automatically unforeseeable if the institution deliberately excluded the scenario from review.\n\nThe prudent conclusion is claims of exceptional safety deserve special scrutiny when they rest on short memories and rising leverage. Resilience depends on visible loss absorption and funding capacity, not the elegance of a reported score. Stress testing should reveal which assumption drives survival rather than hide that dependence inside one result. A solvent institution can face a run, while a liquid appearance can temporarily disguise insolvency. Stress testing should reveal which assumption drives survival rather than hide that dependence inside one result.",
      "frame": "Freezes the dashboard on a passing score. \"At The Risk Department's Model Files, the ratio survived and the funding did not. Explain ’this time is different’.\"",
      "q": [
        {
          "q": "Which risk statement most closely matches Carmen Reinhart’s analysis of ’this time is different’?",
          "o": [
            {
              "t": "Carmen Reinhart made ’this time is different’ depend on funding mechanics, leverage, behavioral response, and model limits. The method stays visible in the operational record.",
              "v": "expert",
              "fb": "Correct: the analytical focus is the mechanism linking funding, assets, leverage, and behavior."
            },
            {
              "t": "Carmen Reinhart treated ’this time is different’ as controlled whenever a bank passed one approved regulatory stress test. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A test is conditional on its scenarios and does not itself supply liquidity."
            },
            {
              "t": "Carmen Reinhart let recent price stability settle ’this time is different’ without testing liquidity or forced-sale feedback. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "Calm observations can coexist with a balance sheet that is highly sensitive to change."
            },
            {
              "t": "Carmen Reinhart used any sudden failure in ’this time is different’ as proof of an unforeseeable outside attack. The preferred narrative receives priority over verification.",
              "v": "danger",
              "fb": "External shocks matter, but internal fragility determines how much damage they cause."
            }
          ]
        },
        {
          "q": "Which stress exercise applies the method described in today’s memorandum?",
          "o": [
            {
              "t": "Recalculate cash needs, leverage, collateral, and rollover exposure under several adverse funding scenarios. It remains checkable in the case file in the case file.",
              "v": "expert",
              "fb": "Yes: a stress test should expose dependence on assumptions before events force the calculation."
            },
            {
              "t": "Repeat the approved model with newer data, but leave its excluded failure scenarios unchanged. Tail exposure remains untested in the dated record in the case file.",
              "v": "partial",
              "fb": "Fresh data do not repair a scenario set designed to avoid the relevant failure mode."
            },
            {
              "t": "Reduce the reported exposure until the bank passes, then describe the target as a measurement. Funding data contradict that assurance in the case file in the case file.",
              "v": "wrong",
              "fb": "Changing the input to achieve a pass converts measurement into target management."
            },
            {
              "t": "Model a currency raid in detail, while omitting ordinary lender withdrawal and forced asset sales. The preferred narrative receives priority over verification.",
              "v": "danger",
              "fb": "A dramatic scenario can distract from a simpler and more probable funding mechanism."
            }
          ]
        },
        {
          "q": "What prudential lesson is most consistent with ’this time is different’?",
          "o": [
            {
              "t": "Risk conclusions should identify the assumptions, funding channels, and loss buffers on which survival depends. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Exactly: useful risk work makes vulnerabilities and conditional assumptions visible to decision makers."
            },
            {
              "t": "A larger model should be safer even when its inputs, dependencies, and tail behavior remain unexplained. The comparison is narrowed to the favored documents.",
              "v": "partial",
              "fb": "Complexity can hide sensitivity as easily as it can represent it."
            },
            {
              "t": "Regulatory compliance should prove resilience because every material exposure is already inside the ratio. The account leans heavily on prior reputation.",
              "v": "wrong",
              "fb": "Rules provide minimum tests, not proof that every institution has captured every exposure."
            },
            {
              "t": "A collapse is treated as malicious attack or a rare storm that no responsible institution could plan for. The attack story precedes stress testing.",
              "v": "danger",
              "fb": "Internal leverage and funding choices can produce a specific preventable failure between those extremes."
            }
          ]
        }
      ]
    },
    "warning": {
      "sci": "Raghuram Rajan (b. 1963)",
      "topic": "The 2005 warning on hidden risk",
      "lede": "Raghuram Rajan used the 2005 warning on hidden risk to expose the funding mechanism beneath a calm reported number.",
      "no": 8,
      "profile": "Today’s risk memorandum centers on Raghuram Rajan and the financial mechanics of the 2005 warning on hidden risk. Raghuram Rajan warned in 2005 that incentives and financial innovation could encourage correlated risk-taking and create severe tail events. Banks can appear profitable and liquid while relying on fragile funding, optimistic correlations, or assets that cannot be sold at quoted prices during stress. Rajan’s work helps distinguish a forecast from the balance-sheet mechanism beneath it.\n\nThe correct exercise is to analyze compensation, delegated management, common strategies, and hidden exposures that may align institutions in stress. Analysts should trace cash obligations by date, identify who may refuse rollover, apply losses before regulatory adjustments, and test assumptions outside the calm period used for calibration. Leverage, collateral, and network exposure can turn a modest shock into forced action.\n\nRisk metrics are useful summaries, not independent resources. A model cannot supply cash, stop a depositor, or guarantee that yesterday’s correlation survives a common sale. Equally, an extreme event is not automatically unforeseeable if the institution deliberately excluded the scenario from review.\n\nThe prudent conclusion is diverse firms can behave like one crowded trade when incentives reward the same apparent success. Resilience depends on visible loss absorption and funding capacity, not the elegance of a reported score. Stress testing should reveal which assumption drives survival rather than hide that dependence inside one result. A solvent institution can face a run, while a liquid appearance can temporarily disguise insolvency. Stress testing should reveal which assumption drives survival rather than hide that dependence inside one result.",
      "frame": "Closes the stress workbook. \"A number can be gamed or merely wrong. Begin with the 2005 warning on hidden risk.\"",
      "q": [
        {
          "q": "Which risk statement most closely matches Raghuram Rajan’s analysis of the 2005 warning on hidden risk?",
          "o": [
            {
              "t": "Raghuram Rajan made the 2005 warning on hidden risk depend on funding mechanics, leverage, behavioral response, and model limits. The method stays visible in the operational record.",
              "v": "expert",
              "fb": "Correct: the analytical focus is the mechanism linking funding, assets, leverage, and behavior."
            },
            {
              "t": "Raghuram Rajan treated the 2005 warning on hidden risk as controlled whenever a bank passed one approved regulatory stress test. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A test is conditional on its scenarios and does not itself supply liquidity."
            },
            {
              "t": "Raghuram Rajan let recent price stability settle the 2005 warning on hidden risk without testing liquidity or forced-sale feedback. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "Calm observations can coexist with a balance sheet that is highly sensitive to change."
            },
            {
              "t": "Raghuram Rajan used any sudden failure in the 2005 warning on hidden risk as proof of an unforeseeable outside attack. The preferred narrative receives priority over verification.",
              "v": "danger",
              "fb": "External shocks matter, but internal fragility determines how much damage they cause."
            }
          ]
        },
        {
          "q": "Which stress exercise applies the method described in today’s memorandum?",
          "o": [
            {
              "t": "Recalculate cash needs, leverage, collateral, and rollover exposure under several adverse funding scenarios. It remains checkable in the case file in the case file.",
              "v": "expert",
              "fb": "Yes: a stress test should expose dependence on assumptions before events force the calculation."
            },
            {
              "t": "Repeat the approved model with newer data, but leave its excluded failure scenarios unchanged. Tail exposure remains untested in the dated record in the case file.",
              "v": "partial",
              "fb": "Fresh data do not repair a scenario set designed to avoid the relevant failure mode."
            },
            {
              "t": "Reduce the reported exposure until the bank passes, then describe the target as a measurement. Funding data contradict that assurance in the case file in the case file.",
              "v": "wrong",
              "fb": "Changing the input to achieve a pass converts measurement into target management."
            },
            {
              "t": "Model a currency raid in detail, while omitting ordinary lender withdrawal and forced asset sales. The preferred narrative receives priority over verification.",
              "v": "danger",
              "fb": "A dramatic scenario can distract from a simpler and more probable funding mechanism."
            }
          ]
        },
        {
          "q": "What prudential lesson is most consistent with the 2005 warning on hidden risk?",
          "o": [
            {
              "t": "Risk conclusions should identify the assumptions, funding channels, and loss buffers on which survival depends. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Exactly: useful risk work makes vulnerabilities and conditional assumptions visible to decision makers."
            },
            {
              "t": "A larger model should be safer even when its inputs, dependencies, and tail behavior remain unexplained. The comparison is narrowed to the favored documents.",
              "v": "partial",
              "fb": "Complexity can hide sensitivity as easily as it can represent it."
            },
            {
              "t": "Regulatory compliance should prove resilience because every material exposure is already inside the ratio. The account leans heavily on prior reputation.",
              "v": "wrong",
              "fb": "Rules provide minimum tests, not proof that every institution has captured every exposure."
            },
            {
              "t": "A collapse is treated as malicious attack or a rare storm that no responsible institution could plan for. The attack story precedes stress testing.",
              "v": "danger",
              "fb": "Internal leverage and funding choices can produce a specific preventable failure between those extremes."
            }
          ]
        }
      ]
    },
    "blackswan": {
      "sci": "Nassim Nicholas Taleb (b. 1960)",
      "topic": "The black swan & tail risk",
      "lede": "A risk score met the balance sheet in Nassim Nicholas Taleb's analysis of the black swan and tail risk.",
      "no": 9,
      "profile": "Today’s risk memorandum centers on Nassim Nicholas Taleb and the financial mechanics of the black swan and tail risk. Nassim Nicholas Taleb popularized the black swan as a rare, high-impact event that lies outside ordinary expectations and is explained confidently afterward. Banks can appear profitable and liquid while relying on fragile funding, optimistic correlations, or assets that cannot be sold at quoted prices during stress. Taleb’s work helps distinguish a forecast from the balance-sheet mechanism beneath it.\n\nThe correct exercise is to stress systems against model error and extreme outcomes instead of relying only on estimated likelihoods from calm data. Analysts should trace cash obligations by date, identify who may refuse rollover, apply losses before regulatory adjustments, and test assumptions outside the calm period used for calibration. Leverage, collateral, and network exposure can turn a modest shock into forced action.\n\nRisk metrics are useful summaries, not independent resources. A model cannot supply cash, stop a depositor, or guarantee that yesterday’s correlation survives a common sale. Equally, an extreme event is not automatically unforeseeable if the institution deliberately excluded the scenario from review.\n\nThe prudent conclusion is robustness matters because some consequential risks cannot be predicted precisely before they arrive. Resilience depends on visible loss absorption and funding capacity, not the elegance of a reported score. Stress testing should reveal which assumption drives survival rather than hide that dependence inside one result. A solvent institution can face a run, while a liquid appearance can temporarily disguise insolvency. Stress testing should reveal which assumption drives survival rather than hide that dependence inside one result.",
      "frame": "Writes a haircut beside the model output. \"Cash has a clock. Show me what the black swan and tail risk says about it.\"",
      "q": [
        {
          "q": "Which risk statement most closely matches Nassim Nicholas Taleb’s analysis of the black swan and tail risk?",
          "o": [
            {
              "t": "Nassim Nicholas Taleb made the black swan and tail risk depend on funding mechanics, leverage, behavioral response, and model limits. The method stays visible in the operational record.",
              "v": "expert",
              "fb": "Correct: the analytical focus is the mechanism linking funding, assets, leverage, and behavior."
            },
            {
              "t": "Nassim Nicholas Taleb treated the black swan and tail risk as controlled whenever a bank passed one approved regulatory stress test. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A test is conditional on its scenarios and does not itself supply liquidity."
            },
            {
              "t": "Nassim Nicholas Taleb let recent price stability settle the black swan and tail risk without testing liquidity or forced-sale feedback. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "Calm observations can coexist with a balance sheet that is highly sensitive to change."
            },
            {
              "t": "Nassim Nicholas Taleb used any sudden failure in the black swan and tail risk as proof of an unforeseeable outside attack. The preferred narrative receives priority over verification.",
              "v": "danger",
              "fb": "External shocks matter, but internal fragility determines how much damage they cause."
            }
          ]
        },
        {
          "q": "Which stress exercise applies the method described in today’s memorandum?",
          "o": [
            {
              "t": "Recalculate cash needs, leverage, collateral, and rollover exposure under several adverse funding scenarios. It remains checkable in the case file in the case file.",
              "v": "expert",
              "fb": "Yes: a stress test should expose dependence on assumptions before events force the calculation."
            },
            {
              "t": "Repeat the approved model with newer data, but leave its excluded failure scenarios unchanged. Tail exposure remains untested in the dated record in the case file.",
              "v": "partial",
              "fb": "Fresh data do not repair a scenario set designed to avoid the relevant failure mode."
            },
            {
              "t": "Reduce the reported exposure until the bank passes, then describe the target as a measurement. Funding data contradict that assurance in the case file in the case file.",
              "v": "wrong",
              "fb": "Changing the input to achieve a pass converts measurement into target management."
            },
            {
              "t": "Model a currency raid in detail, while omitting ordinary lender withdrawal and forced asset sales. The preferred narrative receives priority over verification.",
              "v": "danger",
              "fb": "A dramatic scenario can distract from a simpler and more probable funding mechanism."
            }
          ]
        },
        {
          "q": "What prudential lesson is most consistent with the black swan and tail risk?",
          "o": [
            {
              "t": "Risk conclusions should identify the assumptions, funding channels, and loss buffers on which survival depends. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Exactly: useful risk work makes vulnerabilities and conditional assumptions visible to decision makers."
            },
            {
              "t": "A larger model should be safer even when its inputs, dependencies, and tail behavior remain unexplained. The comparison is narrowed to the favored documents.",
              "v": "partial",
              "fb": "Complexity can hide sensitivity as easily as it can represent it."
            },
            {
              "t": "Regulatory compliance should prove resilience because every material exposure is already inside the ratio. The account leans heavily on prior reputation.",
              "v": "wrong",
              "fb": "Rules provide minimum tests, not proof that every institution has captured every exposure."
            },
            {
              "t": "A collapse is treated as malicious attack or a rare storm that no responsible institution could plan for. The attack story precedes stress testing.",
              "v": "danger",
              "fb": "Internal leverage and funding choices can produce a specific preventable failure between those extremes."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "quant": {
      "dealing": "Quant Analyst Priya Sen waits at the dealing room beside a screen whose green status light survived the bank. \"Built the model; watched its worst-case number get dialed down by hand. The model passed because the exposure it feared was moved beyond its view.\"",
      "supervisor": "Quant Analyst Priya Sen waits at the supervisor's office beside a screen whose green status light survived the bank. \"Built the model; watched its worst-case number get dialed down by hand. The model passed because the exposure it feared was moved beyond its view.\"",
      "riskfiles": "Quant Analyst Priya Sen waits at the risk department's model files beside a screen whose green status light survived the bank. \"Built the model; watched its worst-case number get dialed down by hand. The model passed because the exposure it feared was moved beyond its view.\""
    },
    "clerk": {
      "dealing": "The Records Clerk waits at the dealing room beside a screen whose green status light survived the bank. \"Keeps the model sign-offs and the exposures kept off the main book. The model passed because the exposure it feared was moved beyond its view.\"",
      "supervisor": "The Records Clerk waits at the supervisor's office beside a screen whose green status light survived the bank. \"Keeps the model sign-offs and the exposures kept off the main book. The model passed because the exposure it feared was moved beyond its view.\"",
      "riskfiles": "The Records Clerk waits at the risk department's model files beside a screen whose green status light survived the bank. \"Keeps the model sign-offs and the exposures kept off the main book. The model passed because the exposure it feared was moved beyond its view.\""
    },
    "dealer": {
      "dealing": "Head Dealer Marlow waits at the dealing room beside a screen whose green status light survived the bank. \"Ran the leverage everyone praised until the repo lenders vanished. The model passed because the exposure it feared was moved beyond its view.\"",
      "supervisor": "Head Dealer Marlow waits at the supervisor's office beside a screen whose green status light survived the bank. \"Ran the leverage everyone praised until the repo lenders vanished. The model passed because the exposure it feared was moved beyond its view.\"",
      "riskfiles": "Head Dealer Marlow waits at the risk department's model files beside a screen whose green status light survived the bank. \"Ran the leverage everyone praised until the repo lenders vanished. The model passed because the exposure it feared was moved beyond its view.\""
    }
  },
  "story": [
    "<b>The Sterling Trust Collapse</b> opens inside the Sterling Trust failure inquiry, where the public explanation has hardened faster than the evidence.",
    "<b>Quant Analyst Priya Sen</b>, <b>The Records Clerk</b>, and <b>Head Dealer Marlow</b> hold different parts of the record, and every conversation begins with one real figure whose work teaches you how to read it.",
    "The case keeps pulling investigators toward <b>A foreign raid on the currency broke the bank</b> or <b>A once-a-century storm no one could foresee</b>. Both are plausible enough to survive a headline; neither should survive the full dossier untested.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide the <b>WHAT</b> for yourself."
  ],
  "endings": {
    "overclaimWhat": "attack",
    "dismissalWhat": "storm",
    "win": {
      "expertTitle": "The Passing Model Hid a Failing Balance Sheet",
      "expert": [
        "You name <b>Adrian Sable — the chief risk officer</b>, locate the manipulation in <b>The Risk Department's Model Files</b>, and prove <b>Hidden leverage & risk models quietly gamed</b>. Not a foreign raid on the currency broke the bank. Not a once-a-century storm no one could foresee.",
        "Leverage was shifted beyond the main view and adverse assumptions were manually reduced until the test passed. Repo withdrawal exposed a vulnerability created inside risk governance, not an unknowable currency assault."
      ],
      "soundTitle": "The Stress Test Is Reconstructed",
      "sound": [
        "You correctly connect <b>Adrian Sable — the chief risk officer</b>, <b>The Risk Department's Model Files</b>, and <b>Hidden leverage & risk models quietly gamed</b>. Sign-offs and off-book exposure support the systemic-risk finding.",
        "The exact losses across every desk remain to be allocated, but the model was plainly managed toward approval rather than used to reveal the bank’s true funding sensitivity."
      ],
      "namedTitle": "The Hidden Leverage",
      "named": [
        "You reach the right result: <b>Adrian Sable — the chief risk officer</b>, <b>The Risk Department's Model Files</b>, and <b>Hidden leverage & risk models quietly gamed</b>.",
        "The explanation needs more balance-sheet detail, yet it identifies the files from which a complete loss and accountability analysis can proceed."
      ]
    },
    "overclaim": {
      "title": "A Currency War Without the Cash Trail",
      "body": [
        "You blame <b>A foreign raid on the currency broke the bank</b>, allowing a dramatic market narrative to replace examination of leverage and rollover dependence.",
        "Exchange pressure may have existed, but it cannot account for the altered model assumptions. Your overclaim gives risk management an external excuse for an internal decision."
      ]
    },
    "dismissal": {
      "title": "The Century Storm Built by Hand",
      "body": [
        "You accept <b>A once-a-century storm no one could foresee</b>, although the supposedly rare scenario became survivable only after analysts reduced its severity on paper.",
        "Calling the collapse unforeseeable rewards the removal of foresight from the model. The same governance practice can reappear wherever passing becomes the metric."
      ]
    },
    "wrongNames": {
      "title": "The Risk Found, the Authority Missed",
      "body": [
        "You identify <b>Hidden leverage & risk models quietly gamed</b>, but accuse the wrong senior officer or place the culmination outside the model files. The approval chain leads instead to"
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A bank facade and a leverage stack collapsing\"><path d=\"M48 48 L198 48 L174 28 L72 28 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M62 48 L62 108 M98 48 L98 108 M136 48 L136 108 M174 48 L174 108 M48 108 L198 108\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M300 104 L348 104 L348 84 L396 84 L396 64 L444 64 L444 44 L492 44\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/><path d=\"M492 44 L552 104\" stroke=\"#B3261E\" stroke-width=\"3\"/><path d=\"M530 34 L570 34 L570 106 L530 106 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.4\"/></svg>"
}};
