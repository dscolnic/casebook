module.exports = { PACK: {
  "id": "j_vote",
  "title": "The Kessler County Count",
  "discipline": "Elections & Democratic Theory",
  "teaser": "A knife-edge election, and half a county's votes seem to vanish into the margins. A foreign hand on the scales? Just politics as usual? Or a map and a purge doing quiet work?",
  "overclaimTag": "a foreign plot",
  "truthTag": "a documented gerrymander & purge",
  "venue": "the Kessler County election inquiry",
  "agent": {
    "name": "Investigator Lena Ward",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Thinkers",
  "readingLabel": "Theorists of the Vote",
  "dossierName": "THEORISTS OF THE VOTE",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Kessler County election inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The WHERE you test determines the dossier, and the conversation costs one day.",
  "overclaimTease": "Foreign intrigue commands attention, while ordinary administrative choices can alter representation without spectacle.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "registrar",
      "items": [
        {
          "id": "party",
          "label": "The county party boss"
        },
        {
          "id": "registrar",
          "label": "Supervisor Hollis Crane — the elections registrar"
        },
        {
          "id": "observer",
          "label": "The foreign-affairs observer"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "electionoffice",
      "items": [
        {
          "id": "pollingsite",
          "label": "The Polling Precincts"
        },
        {
          "id": "partyhq",
          "label": "The County Party Headquarters"
        },
        {
          "id": "electionoffice",
          "label": "The County Elections Office"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "gerrymander",
      "items": [
        {
          "id": "foreign",
          "label": "A foreign plot rigged the whole election"
        },
        {
          "id": "usual",
          "label": "Nothing unusual — politics as it always is"
        },
        {
          "id": "gerrymander",
          "label": "A drawn map & a quiet purge of the rolls"
        }
      ]
    }
  },
  "PLACES": {
    "pollingsite": {
      "name": "The Polling Precincts",
      "xy": [
        140,
        90
      ]
    },
    "partyhq": {
      "name": "The County Party Headquarters",
      "xy": [
        330,
        240
      ]
    },
    "electionoffice": {
      "name": "The County Elections Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "pollingsite",
      "partyhq"
    ],
    [
      "partyhq",
      "electionoffice"
    ]
  ],
  "CHARACTERS": {
    "pollworker": {
      "name": "Poll Captain Ada Reyes",
      "role": "Precinct poll captain",
      "face": "🗳",
      "badge": "R",
      "legend": "the precinct",
      "hint": "Worked the tables; watched voters turned away as 'inactive' by the hundred."
    },
    "clerk": {
      "name": "The Records Clerk",
      "role": "Elections records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the elections office",
      "hint": "Keeps the purge logs and the district map redrawn behind closed doors."
    },
    "canvasser": {
      "name": "Canvasser Dumont",
      "role": "Party canvasser",
      "face": "📋",
      "badge": "D",
      "legend": "the party office",
      "hint": "Knocks every door; knew which blocks were carved out of which district."
    }
  },
  "TOPICMAP": {
    "pollingsite": {
      "pollworker": [
        "forms"
      ],
      "clerk": [
        "paradox"
      ],
      "canvasser": [
        "origins"
      ]
    },
    "partyhq": {
      "pollworker": [
        "majority"
      ],
      "clerk": [
        "heresthetics"
      ],
      "canvasser": [
        "southern"
      ]
    },
    "electionoffice": {
      "pollworker": [
        "polyarchy"
      ],
      "clerk": [
        "impossible"
      ],
      "canvasser": [
        "partysystems"
      ]
    }
  },
  "TOPICS": {
    "forms": {
      "sci": "Aristotle (384-322 BC)",
      "topic": "The forms of government & citizenship",
      "lede": "Aristotle showed that the forms of government and citizenship begins before ballots are counted, inside rules and representation.",
      "no": 1,
      "profile": "The civic briefing today follows Aristotle into the problem of the forms of government and citizenship. Aristotle classified constitutions by who rules and whether rule serves a common or private interest, while treating citizenship as participation in judgment and office. Democratic rules do more than count preferences after citizens arrive at the polls. They define districts, alternatives, eligibility, agenda order, representation, and the incentives that shape participation before a ballot is cast.\n\nThe governing inquiry is to compare institutions by actual distributions of authority, civic participation, and public purpose rather than official labels. Analysts must separate a rule’s formal symmetry from its real distributional effects and compare outcomes under defensible alternatives. Maps, registration practices, party strategies, turnout, and institutional checks belong in one account, though they should not be collapsed into one statistic.\n\nMany electoral disputes become misleading when every disadvantage is called fraud or every legal procedure is presumed fair. A system can follow its written steps while systematically reducing competition or participation. It can also produce an unpopular result without any improper manipulation.\n\nThe democratic principle is a constitution's democratic character depends on practiced citizenship as well as formal design. Fairness becomes assessable when rules, access, and representation are examined together. Minority protection is not an exception to democracy but one test of whether political equality is durable. Agenda control often matters before the public reaches the visible stage of casting votes. Minority protection is not an exception to democracy but one test of whether political equality is durable.",
      "frame": "Spreads the precinct map flat. \"At The Polling Precincts, a boundary can move power without moving a ballot. Explain the forms of government and citizenship.\"",
      "q": [
        {
          "q": "Which democratic-theory statement most accurately represents Aristotle on the forms of government and citizenship?",
          "o": [
            {
              "t": "Aristotle made the forms of government and citizenship depend on explicit rules, participation, representation, and institutional effects. It remains checkable in the dated record in the case file.",
              "v": "expert",
              "fb": "Correct: election analysis begins by identifying how a rule converts participation and preference into power."
            },
            {
              "t": "Aristotle treated the forms of government and citizenship as fair whenever officials followed the written procedure without deviation. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Legality and equality are related questions, but they are not identical."
            },
            {
              "t": "Aristotle let the final vote total settle the forms of government and citizenship without examining maps or registration access. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "A final tally cannot by itself validate the rules that produced the electorate and districts."
            },
            {
              "t": "Aristotle used an unexpected result in the forms of government and citizenship as proof of foreign control over the election. The conclusion shapes which records receive attention in the case file.",
              "v": "danger",
              "fb": "Unexpected outcomes can arise from ordinary rules, strategy, or administration without foreign intervention."
            }
          ]
        },
        {
          "q": "Which empirical check best applies the method from this profile?",
          "o": [
            {
              "t": "Compare maps, voter rolls, turnout, and representation under relevant alternative rules and boundaries. It remains checkable in the operational record in the case file.",
              "v": "expert",
              "fb": "Yes: institutional effects become visible through comparison of rules, access, and outcomes."
            },
            {
              "t": "Check whether every form was completed correctly, but rarely measure who was excluded by the process. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Procedural regularity can coexist with a systematically unequal burden."
            },
            {
              "t": "Judge district fairness from compact shape alone, and ignore population balance or electoral effects. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Shape is one clue, while representation and partisan effect require additional measurement."
            },
            {
              "t": "Search for an outside culprit before reviewing the county's own records and administrative choices. The conclusion shapes which records receive attention in the case file.",
              "v": "danger",
              "fb": "Domestic records should be tested before a more dramatic external explanation is adopted."
            }
          ]
        },
        {
          "q": "Which conclusion follows most carefully from the forms of government and citizenship?",
          "o": [
            {
              "t": "Democratic fairness should be evaluated through several stated criteria, not one convenient statistic. The evidence remains open under the documented sequence.",
              "v": "expert",
              "fb": "Exactly: democratic design involves multiple values that should be named rather than hidden."
            },
            {
              "t": "One preferred measure should decide every dispute regardless of geography, participation, or minority rights. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A single metric can illuminate one distortion while overlooking another democratic interest."
            },
            {
              "t": "Accurate ballot counting should make an election fair regardless of how the eligible roll was created. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Accurate tabulation does not validate an improperly restricted electorate."
            },
            {
              "t": "Every close contest is treated as ordinary politics or proof that the whole election was secretly rigged. Foreign interference becomes the organizing theory before review.",
              "v": "danger",
              "fb": "Specific institutional findings are more useful than either complacency or universal suspicion."
            }
          ]
        }
      ]
    },
    "paradox": {
      "sci": "Nicolas de Condorcet (1743-1794)",
      "topic": "The voting paradox",
      "lede": "Nicolas de Condorcet treated the voting paradox as an institutional design problem with visible winners and exclusions.",
      "no": 2,
      "profile": "The civic briefing today follows Nicolas de Condorcet into the problem of the voting paradox. Nicolas de Condorcet showed that majority preferences can cycle: a group may prefer A to B, B to C, and C to A. Democratic rules do more than count preferences after citizens arrive at the polls. They define districts, alternatives, eligibility, agenda order, representation, and the incentives that shape participation before a ballot is cast.\n\nThe governing inquiry is to compare pairwise preferences and recognize that collective rankings can depend on agenda order. Analysts must separate a rule’s formal symmetry from its real distributional effects and compare outcomes under defensible alternatives. Maps, registration practices, party strategies, turnout, and institutional checks belong in one account, though they should not be collapsed into one statistic.\n\nMany electoral disputes become misleading when every disadvantage is called fraud or every legal procedure is presumed fair. A system can follow its written steps while systematically reducing competition or participation. It can also produce an unpopular result without any improper manipulation.\n\nThe democratic principle is a majority vote can be fair at each step yet fail to produce one stable social ordering. Fairness becomes assessable when rules, access, and representation are examined together. Minority protection is not an exception to democracy but one test of whether political equality is durable. Agenda control often matters before the public reaches the visible stage of casting votes. Minority protection is not an exception to democracy but one test of whether political equality is durable.",
      "frame": "Traces one block with a pencil. \"Count the rules before the votes. Start with the voting paradox.\"",
      "q": [
        {
          "q": "Which democratic-theory statement most accurately represents Nicolas de Condorcet on the voting paradox?",
          "o": [
            {
              "t": "Nicolas de Condorcet made the voting paradox depend on explicit rules, participation, representation, and institutional effects. It remains checkable in the dated record in the case file.",
              "v": "expert",
              "fb": "Correct: election analysis begins by identifying how a rule converts participation and preference into power."
            },
            {
              "t": "Nicolas de Condorcet treated the voting paradox as fair whenever officials followed the written procedure without deviation. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Legality and equality are related questions, but they are not identical."
            },
            {
              "t": "Nicolas de Condorcet let the final vote total settle the voting paradox without examining maps or registration access. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "A final tally cannot by itself validate the rules that produced the electorate and districts."
            },
            {
              "t": "Nicolas de Condorcet used an unexpected result in the voting paradox as proof of foreign control over the election. The conclusion shapes which records receive attention in the case file.",
              "v": "danger",
              "fb": "Unexpected outcomes can arise from ordinary rules, strategy, or administration without foreign intervention."
            }
          ]
        },
        {
          "q": "Which empirical check best applies the method from this profile?",
          "o": [
            {
              "t": "Compare maps, voter rolls, turnout, and representation under relevant alternative rules and boundaries. It remains checkable in the operational record in the case file.",
              "v": "expert",
              "fb": "Yes: institutional effects become visible through comparison of rules, access, and outcomes."
            },
            {
              "t": "Check whether every form was completed correctly, but rarely measure who was excluded by the process. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Procedural regularity can coexist with a systematically unequal burden."
            },
            {
              "t": "Judge district fairness from compact shape alone, and ignore population balance or electoral effects. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Shape is one clue, while representation and partisan effect require additional measurement."
            },
            {
              "t": "Search for an outside culprit before reviewing the county's own records and administrative choices. The conclusion shapes which records receive attention in the case file.",
              "v": "danger",
              "fb": "Domestic records should be tested before a more dramatic external explanation is adopted."
            }
          ]
        },
        {
          "q": "Which conclusion follows most carefully from the voting paradox?",
          "o": [
            {
              "t": "Democratic fairness should be evaluated through several stated criteria, not one convenient statistic. The evidence remains open under the documented sequence.",
              "v": "expert",
              "fb": "Exactly: democratic design involves multiple values that should be named rather than hidden."
            },
            {
              "t": "One preferred measure should decide every dispute regardless of geography, participation, or minority rights. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A single metric can illuminate one distortion while overlooking another democratic interest."
            },
            {
              "t": "Accurate ballot counting should make an election fair regardless of how the eligible roll was created. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Accurate tabulation does not validate an improperly restricted electorate."
            },
            {
              "t": "Every close contest is treated as ordinary politics or proof that the whole election was secretly rigged. Foreign interference becomes the organizing theory before review.",
              "v": "danger",
              "fb": "Specific institutional findings are more useful than either complacency or universal suspicion."
            }
          ]
        }
      ]
    },
    "origins": {
      "sci": "Elbridge Gerry (1744-1814)",
      "topic": "The original gerrymander",
      "lede": "The machinery translating citizens into power anchors Elbridge Gerry's analysis of the original gerrymander.",
      "no": 3,
      "profile": "The civic briefing today follows Elbridge Gerry into the problem of the original gerrymander. Elbridge Gerry signed a Massachusetts redistricting law whose oddly shaped district inspired the term 'gerrymander,' though the political plan involved a broader party effort. Democratic rules do more than count preferences after citizens arrive at the polls. They define districts, alternatives, eligibility, agenda order, representation, and the incentives that shape participation before a ballot is cast.\n\nThe governing inquiry is to compare district boundaries with population, communities, partisan data, and electoral effects rather than relying on shape alone. Analysts must separate a rule’s formal symmetry from its real distributional effects and compare outcomes under defensible alternatives. Maps, registration practices, party strategies, turnout, and institutional checks belong in one account, though they should not be collapsed into one statistic.\n\nMany electoral disputes become misleading when every disadvantage is called fraud or every legal procedure is presumed fair. A system can follow its written steps while systematically reducing competition or participation. It can also produce an unpopular result without any improper manipulation.\n\nThe democratic principle is a memorable outline can signal manipulation, but durable analysis measures how the map converts votes into power. Fairness becomes assessable when rules, access, and representation are examined together. Minority protection is not an exception to democracy but one test of whether political equality is durable. Agenda control often matters before the public reaches the visible stage of casting votes. Minority protection is not an exception to democracy but one test of whether political equality is durable.",
      "frame": "Places a purge notice beside the poll book. \"Procedure looks neutral from far away. Show me what the original gerrymander tests.\"",
      "q": [
        {
          "q": "Which democratic-theory statement most accurately represents Elbridge Gerry on the original gerrymander?",
          "o": [
            {
              "t": "Elbridge Gerry made the original gerrymander depend on explicit rules, participation, representation, and institutional effects. It remains checkable in the dated record in the case file.",
              "v": "expert",
              "fb": "Correct: election analysis begins by identifying how a rule converts participation and preference into power."
            },
            {
              "t": "Elbridge Gerry treated the original gerrymander as fair whenever officials followed the written procedure without deviation. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Legality and equality are related questions, but they are not identical."
            },
            {
              "t": "Elbridge Gerry let the final vote total settle the original gerrymander without examining maps or registration access. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "A final tally cannot by itself validate the rules that produced the electorate and districts."
            },
            {
              "t": "Elbridge Gerry used an unexpected result in the original gerrymander as proof of foreign control over the election. The conclusion shapes which records receive attention in the case file.",
              "v": "danger",
              "fb": "Unexpected outcomes can arise from ordinary rules, strategy, or administration without foreign intervention."
            }
          ]
        },
        {
          "q": "Which empirical check best applies the method from this profile?",
          "o": [
            {
              "t": "Compare maps, voter rolls, turnout, and representation under relevant alternative rules and boundaries. It remains checkable in the operational record in the case file.",
              "v": "expert",
              "fb": "Yes: institutional effects become visible through comparison of rules, access, and outcomes."
            },
            {
              "t": "Check whether every form was completed correctly, but rarely measure who was excluded by the process. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Procedural regularity can coexist with a systematically unequal burden."
            },
            {
              "t": "Judge district fairness from compact shape alone, and ignore population balance or electoral effects. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Shape is one clue, while representation and partisan effect require additional measurement."
            },
            {
              "t": "Search for an outside culprit before reviewing the county's own records and administrative choices. The conclusion shapes which records receive attention in the case file.",
              "v": "danger",
              "fb": "Domestic records should be tested before a more dramatic external explanation is adopted."
            }
          ]
        },
        {
          "q": "Which conclusion follows most carefully from the original gerrymander?",
          "o": [
            {
              "t": "Democratic fairness should be evaluated through several stated criteria, not one convenient statistic. The evidence remains open under the documented sequence.",
              "v": "expert",
              "fb": "Exactly: democratic design involves multiple values that should be named rather than hidden."
            },
            {
              "t": "One preferred measure should decide every dispute regardless of geography, participation, or minority rights. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A single metric can illuminate one distortion while overlooking another democratic interest."
            },
            {
              "t": "Accurate ballot counting should make an election fair regardless of how the eligible roll was created. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Accurate tabulation does not validate an improperly restricted electorate."
            },
            {
              "t": "Every close contest is treated as ordinary politics or proof that the whole election was secretly rigged. Foreign interference becomes the organizing theory before review.",
              "v": "danger",
              "fb": "Specific institutional findings are more useful than either complacency or universal suspicion."
            }
          ]
        }
      ]
    },
    "majority": {
      "sci": "Alexis de Tocqueville (1805-1859)",
      "topic": "The tyranny of the majority",
      "lede": "Alexis de Tocqueville showed that the tyranny of the majority begins before ballots are counted, inside rules and representation.",
      "no": 4,
      "profile": "The civic briefing today follows Alexis de Tocqueville into the problem of the tyranny of the majority. Alexis de Tocqueville praised American democratic participation while warning that majority opinion could suppress minorities and independent thought. Democratic rules do more than count preferences after citizens arrive at the polls. They define districts, alternatives, eligibility, agenda order, representation, and the incentives that shape participation before a ballot is cast.\n\nThe governing inquiry is to evaluate democracy through civil associations, local institutions, rights, and the social pressure surrounding formal votes. Analysts must separate a rule’s formal symmetry from its real distributional effects and compare outcomes under defensible alternatives. Maps, registration practices, party strategies, turnout, and institutional checks belong in one account, though they should not be collapsed into one statistic.\n\nMany electoral disputes become misleading when every disadvantage is called fraud or every legal procedure is presumed fair. A system can follow its written steps while systematically reducing competition or participation. It can also produce an unpopular result without any improper manipulation.\n\nThe democratic principle is majority rule needs protections that keep political equality from becoming enforced conformity. Fairness becomes assessable when rules, access, and representation are examined together. Minority protection is not an exception to democracy but one test of whether political equality is durable. Agenda control often matters before the public reaches the visible stage of casting votes. Minority protection is not an exception to democracy but one test of whether political equality is durable. Agenda control often matters before the public reaches the visible stage of casting votes.",
      "frame": "Spreads the precinct map flat. \"At The County Party Headquarters, a boundary can move power without moving a ballot. Explain the tyranny of the majority.\"",
      "q": [
        {
          "q": "Which democratic-theory statement most accurately represents Alexis de Tocqueville on the tyranny of the majority?",
          "o": [
            {
              "t": "Alexis de Tocqueville made the tyranny of the majority depend on explicit rules, participation, representation, and institutional effects. It remains checkable in the dated record in the case file.",
              "v": "expert",
              "fb": "Correct: election analysis begins by identifying how a rule converts participation and preference into power."
            },
            {
              "t": "Alexis de Tocqueville treated the tyranny of the majority as fair whenever officials followed the written procedure without deviation. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Legality and equality are related questions, but they are not identical."
            },
            {
              "t": "Alexis de Tocqueville let the final vote total settle the tyranny of the majority without examining maps or registration access. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "A final tally cannot by itself validate the rules that produced the electorate and districts."
            },
            {
              "t": "Alexis de Tocqueville used an unexpected result in the tyranny of the majority as proof of foreign control over the election. The conclusion shapes which records receive attention in the case file.",
              "v": "danger",
              "fb": "Unexpected outcomes can arise from ordinary rules, strategy, or administration without foreign intervention."
            }
          ]
        },
        {
          "q": "Which empirical check best applies the method from this profile?",
          "o": [
            {
              "t": "Compare maps, voter rolls, turnout, and representation under relevant alternative rules and boundaries. It remains checkable in the operational record in the case file.",
              "v": "expert",
              "fb": "Yes: institutional effects become visible through comparison of rules, access, and outcomes."
            },
            {
              "t": "Check whether every form was completed correctly, but rarely measure who was excluded by the process. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Procedural regularity can coexist with a systematically unequal burden."
            },
            {
              "t": "Judge district fairness from compact shape alone, and ignore population balance or electoral effects. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Shape is one clue, while representation and partisan effect require additional measurement."
            },
            {
              "t": "Search for an outside culprit before reviewing the county's own records and administrative choices. The conclusion shapes which records receive attention in the case file.",
              "v": "danger",
              "fb": "Domestic records should be tested before a more dramatic external explanation is adopted."
            }
          ]
        },
        {
          "q": "Which conclusion follows most carefully from the tyranny of the majority?",
          "o": [
            {
              "t": "Democratic fairness should be evaluated through several stated criteria, not one convenient statistic. The evidence remains open under the documented sequence.",
              "v": "expert",
              "fb": "Exactly: democratic design involves multiple values that should be named rather than hidden."
            },
            {
              "t": "One preferred measure should decide every dispute regardless of geography, participation, or minority rights. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A single metric can illuminate one distortion while overlooking another democratic interest."
            },
            {
              "t": "Accurate ballot counting should make an election fair regardless of how the eligible roll was created. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Accurate tabulation does not validate an improperly restricted electorate."
            },
            {
              "t": "Every close contest is treated as ordinary politics or proof that the whole election was secretly rigged. Foreign interference becomes the organizing theory before review.",
              "v": "danger",
              "fb": "Specific institutional findings are more useful than either complacency or universal suspicion."
            }
          ]
        }
      ]
    },
    "heresthetics": {
      "sci": "William H. Riker (1920-1993)",
      "topic": "Social choice & the manipulation of agendas",
      "lede": "William H. Riker treated social choice and the manipulation of agendas as an institutional design problem with visible winners and exclusions.",
      "no": 5,
      "profile": "The civic briefing today follows William H. Riker into the problem of social choice and the manipulation of agendas. William H. Riker used the term heresthetics for structuring political choices by changing agendas, dimensions, or voting sequences. Democratic rules do more than count preferences after citizens arrive at the polls. They define districts, alternatives, eligibility, agenda order, representation, and the incentives that shape participation before a ballot is cast.\n\nThe governing inquiry is to inspect who defines the alternatives and order of decision, not only how participants vote once choices are fixed. Analysts must separate a rule’s formal symmetry from its real distributional effects and compare outcomes under defensible alternatives. Maps, registration practices, party strategies, turnout, and institutional checks belong in one account, though they should not be collapsed into one statistic.\n\nMany electoral disputes become misleading when every disadvantage is called fraud or every legal procedure is presumed fair. A system can follow its written steps while systematically reducing competition or participation. It can also produce an unpopular result without any improper manipulation.\n\nThe democratic principle is political power often lies in arranging the choice set before the visible vote occurs. Fairness becomes assessable when rules, access, and representation are examined together. Minority protection is not an exception to democracy but one test of whether political equality is durable. Agenda control often matters before the public reaches the visible stage of casting votes. Minority protection is not an exception to democracy but one test of whether political equality is durable.",
      "frame": "Traces one block with a pencil. \"Count the rules before the votes. Start with social choice and the manipulation of agendas.\"",
      "q": [
        {
          "q": "Which democratic-theory statement most accurately represents William H. Riker on social choice and the manipulation of agendas?",
          "o": [
            {
              "t": "William H. Riker made social choice and the manipulation of agendas depend on explicit rules, participation, representation, and institutional effects. It remains checkable in the dated record in the case file.",
              "v": "expert",
              "fb": "Correct: election analysis begins by identifying how a rule converts participation and preference into power."
            },
            {
              "t": "William H. Riker treated social choice and the manipulation of agendas as fair whenever officials followed the written procedure without deviation. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Legality and equality are related questions, but they are not identical."
            },
            {
              "t": "William H. Riker let the final vote total settle social choice and the manipulation of agendas without examining maps or registration access. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "A final tally cannot by itself validate the rules that produced the electorate and districts."
            },
            {
              "t": "William H. Riker used an unexpected result in social choice and the manipulation of agendas as proof of foreign control over the election. The conclusion shapes which records receive attention in the case file.",
              "v": "danger",
              "fb": "Unexpected outcomes can arise from ordinary rules, strategy, or administration without foreign intervention."
            }
          ]
        },
        {
          "q": "Which empirical check best applies the method from this profile?",
          "o": [
            {
              "t": "Compare maps, voter rolls, turnout, and representation under relevant alternative rules and boundaries. It remains checkable in the operational record in the case file.",
              "v": "expert",
              "fb": "Yes: institutional effects become visible through comparison of rules, access, and outcomes."
            },
            {
              "t": "Check whether every form was completed correctly, but rarely measure who was excluded by the process. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Procedural regularity can coexist with a systematically unequal burden."
            },
            {
              "t": "Judge district fairness from compact shape alone, and ignore population balance or electoral effects. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Shape is one clue, while representation and partisan effect require additional measurement."
            },
            {
              "t": "Search for an outside culprit before reviewing the county's own records and administrative choices. The conclusion shapes which records receive attention in the case file.",
              "v": "danger",
              "fb": "Domestic records should be tested before a more dramatic external explanation is adopted."
            }
          ]
        },
        {
          "q": "Which conclusion follows most carefully from social choice and the manipulation of agendas?",
          "o": [
            {
              "t": "Democratic fairness should be evaluated through several stated criteria, not one convenient statistic. The evidence remains open under the documented sequence.",
              "v": "expert",
              "fb": "Exactly: democratic design involves multiple values that should be named rather than hidden."
            },
            {
              "t": "One preferred measure should decide every dispute regardless of geography, participation, or minority rights. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A single metric can illuminate one distortion while overlooking another democratic interest."
            },
            {
              "t": "Accurate ballot counting should make an election fair regardless of how the eligible roll was created. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Accurate tabulation does not validate an improperly restricted electorate."
            },
            {
              "t": "Every close contest is treated as ordinary politics or proof that the whole election was secretly rigged. Foreign interference becomes the organizing theory before review.",
              "v": "danger",
              "fb": "Specific institutional findings are more useful than either complacency or universal suspicion."
            }
          ]
        }
      ]
    },
    "southern": {
      "sci": "V. O. Key Jr. (1908-1963)",
      "topic": "Southern politics & disenfranchisement",
      "lede": "The machinery translating citizens into power anchors V. O. Key Jr.'s analysis of southern politics and disenfranchisement.",
      "no": 6,
      "profile": "The civic briefing today follows V. O. Key Jr. into the problem of southern politics and disenfranchisement. V. O. Key Jr. documented Southern politics under one-party dominance, including racial disenfranchisement, factional competition, and weak general-election accountability. Democratic rules do more than count preferences after citizens arrive at the polls. They define districts, alternatives, eligibility, agenda order, representation, and the incentives that shape participation before a ballot is cast.\n\nThe governing inquiry is to connect formal rules with registration barriers, local administration, party structure, and unequal participation. Analysts must separate a rule’s formal symmetry from its real distributional effects and compare outcomes under defensible alternatives. Maps, registration practices, party strategies, turnout, and institutional checks belong in one account, though they should not be collapsed into one statistic.\n\nMany electoral disputes become misleading when every disadvantage is called fraud or every legal procedure is presumed fair. A system can follow its written steps while systematically reducing competition or participation. It can also produce an unpopular result without any improper manipulation.\n\nThe democratic principle is an election can appear orderly while systematic exclusion determines who counts as an elector. Fairness becomes assessable when rules, access, and representation are examined together. Minority protection is not an exception to democracy but one test of whether political equality is durable. Agenda control often matters before the public reaches the visible stage of casting votes. Minority protection is not an exception to democracy but one test of whether political equality is durable. Agenda control often matters before the public reaches the visible stage of casting votes.",
      "frame": "Places a purge notice beside the poll book. \"Procedure looks neutral from far away. Show me what southern politics and disenfranchisement tests.\"",
      "q": [
        {
          "q": "Which democratic-theory statement most accurately represents V. O. Key Jr. on southern politics and disenfranchisement?",
          "o": [
            {
              "t": "V. O. Key Jr. made southern politics and disenfranchisement depend on explicit rules, participation, representation, and institutional effects. It remains checkable in the dated record in the case file.",
              "v": "expert",
              "fb": "Correct: election analysis begins by identifying how a rule converts participation and preference into power."
            },
            {
              "t": "V. O. Key Jr. treated southern politics and disenfranchisement as fair whenever officials followed the written procedure without deviation. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Legality and equality are related questions, but they are not identical."
            },
            {
              "t": "V. O. Key Jr. let the final vote total settle southern politics and disenfranchisement without examining maps or registration access. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "A final tally cannot by itself validate the rules that produced the electorate and districts."
            },
            {
              "t": "V. O. Key Jr. used an unexpected result in southern politics and disenfranchisement as proof of foreign control over the election. The conclusion shapes which records receive attention in the case file.",
              "v": "danger",
              "fb": "Unexpected outcomes can arise from ordinary rules, strategy, or administration without foreign intervention."
            }
          ]
        },
        {
          "q": "Which empirical check best applies the method from this profile?",
          "o": [
            {
              "t": "Compare maps, voter rolls, turnout, and representation under relevant alternative rules and boundaries. It remains checkable in the operational record in the case file.",
              "v": "expert",
              "fb": "Yes: institutional effects become visible through comparison of rules, access, and outcomes."
            },
            {
              "t": "Check whether every form was completed correctly, but rarely measure who was excluded by the process. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Procedural regularity can coexist with a systematically unequal burden."
            },
            {
              "t": "Judge district fairness from compact shape alone, and ignore population balance or electoral effects. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Shape is one clue, while representation and partisan effect require additional measurement."
            },
            {
              "t": "Search for an outside culprit before reviewing the county's own records and administrative choices. The conclusion shapes which records receive attention in the case file.",
              "v": "danger",
              "fb": "Domestic records should be tested before a more dramatic external explanation is adopted."
            }
          ]
        },
        {
          "q": "Which conclusion follows most carefully from southern politics and disenfranchisement?",
          "o": [
            {
              "t": "Democratic fairness should be evaluated through several stated criteria, not one convenient statistic. The evidence remains open under the documented sequence.",
              "v": "expert",
              "fb": "Exactly: democratic design involves multiple values that should be named rather than hidden."
            },
            {
              "t": "One preferred measure should decide every dispute regardless of geography, participation, or minority rights. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A single metric can illuminate one distortion while overlooking another democratic interest."
            },
            {
              "t": "Accurate ballot counting should make an election fair regardless of how the eligible roll was created. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Accurate tabulation does not validate an improperly restricted electorate."
            },
            {
              "t": "Every close contest is treated as ordinary politics or proof that the whole election was secretly rigged. Foreign interference becomes the organizing theory before review.",
              "v": "danger",
              "fb": "Specific institutional findings are more useful than either complacency or universal suspicion."
            }
          ]
        }
      ]
    },
    "polyarchy": {
      "sci": "Robert A. Dahl (1915-2014)",
      "topic": "Polyarchy & who governs",
      "lede": "Robert A. Dahl showed that polyarchy and who governs begins before ballots are counted, inside rules and representation.",
      "no": 7,
      "profile": "The civic briefing today follows Robert A. Dahl into the problem of polyarchy and who governs. Robert Dahl used polyarchy to describe real systems with broad participation, contestation, opposition, and access to alternative information. Democratic rules do more than count preferences after citizens arrive at the polls. They define districts, alternatives, eligibility, agenda order, representation, and the incentives that shape participation before a ballot is cast.\n\nThe governing inquiry is to assess democracy through multiple institutional guarantees rather than a single election-day event. Analysts must separate a rule’s formal symmetry from its real distributional effects and compare outcomes under defensible alternatives. Maps, registration practices, party strategies, turnout, and institutional checks belong in one account, though they should not be collapsed into one statistic.\n\nMany electoral disputes become misleading when every disadvantage is called fraud or every legal procedure is presumed fair. A system can follow its written steps while systematically reducing competition or participation. It can also produce an unpopular result without any improper manipulation.\n\nThe democratic principle is competitive elections matter most when citizens can organize, speak, learn, and participate between elections. Fairness becomes assessable when rules, access, and representation are examined together. Minority protection is not an exception to democracy but one test of whether political equality is durable. Agenda control often matters before the public reaches the visible stage of casting votes. Minority protection is not an exception to democracy but one test of whether political equality is durable. Agenda control often matters before the public reaches the visible stage of casting votes.",
      "frame": "Spreads the precinct map flat. \"At The County Elections Office, a boundary can move power without moving a ballot. Explain polyarchy and who governs.\"",
      "q": [
        {
          "q": "Which democratic-theory statement most accurately represents Robert A. Dahl on polyarchy and who governs?",
          "o": [
            {
              "t": "Robert A. Dahl made polyarchy and who governs depend on explicit rules, participation, representation, and institutional effects. It remains checkable in the dated record in the case file.",
              "v": "expert",
              "fb": "Correct: election analysis begins by identifying how a rule converts participation and preference into power."
            },
            {
              "t": "Robert A. Dahl treated polyarchy and who governs as fair whenever officials followed the written procedure without deviation. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Legality and equality are related questions, but they are not identical."
            },
            {
              "t": "Robert A. Dahl let the final vote total settle polyarchy and who governs without examining maps or registration access. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "A final tally cannot by itself validate the rules that produced the electorate and districts."
            },
            {
              "t": "Robert A. Dahl used an unexpected result in polyarchy and who governs as proof of foreign control over the election. The conclusion shapes which records receive attention in the case file.",
              "v": "danger",
              "fb": "Unexpected outcomes can arise from ordinary rules, strategy, or administration without foreign intervention."
            }
          ]
        },
        {
          "q": "Which empirical check best applies the method from this profile?",
          "o": [
            {
              "t": "Compare maps, voter rolls, turnout, and representation under relevant alternative rules and boundaries. It remains checkable in the operational record in the case file.",
              "v": "expert",
              "fb": "Yes: institutional effects become visible through comparison of rules, access, and outcomes."
            },
            {
              "t": "Check whether every form was completed correctly, but rarely measure who was excluded by the process. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Procedural regularity can coexist with a systematically unequal burden."
            },
            {
              "t": "Judge district fairness from compact shape alone, and ignore population balance or electoral effects. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Shape is one clue, while representation and partisan effect require additional measurement."
            },
            {
              "t": "Search for an outside culprit before reviewing the county's own records and administrative choices. The conclusion shapes which records receive attention in the case file.",
              "v": "danger",
              "fb": "Domestic records should be tested before a more dramatic external explanation is adopted."
            }
          ]
        },
        {
          "q": "Which conclusion follows most carefully from polyarchy and who governs?",
          "o": [
            {
              "t": "Democratic fairness should be evaluated through several stated criteria, not one convenient statistic. The evidence remains open under the documented sequence.",
              "v": "expert",
              "fb": "Exactly: democratic design involves multiple values that should be named rather than hidden."
            },
            {
              "t": "One preferred measure should decide every dispute regardless of geography, participation, or minority rights. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A single metric can illuminate one distortion while overlooking another democratic interest."
            },
            {
              "t": "Accurate ballot counting should make an election fair regardless of how the eligible roll was created. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Accurate tabulation does not validate an improperly restricted electorate."
            },
            {
              "t": "Every close contest is treated as ordinary politics or proof that the whole election was secretly rigged. Foreign interference becomes the organizing theory before review.",
              "v": "danger",
              "fb": "Specific institutional findings are more useful than either complacency or universal suspicion."
            }
          ]
        }
      ]
    },
    "impossible": {
      "sci": "Kenneth Arrow (1921-2017)",
      "topic": "The impossibility theorem",
      "lede": "Kenneth Arrow treated the impossibility theorem as an institutional design problem with visible winners and exclusions.",
      "no": 8,
      "profile": "The civic briefing today follows Kenneth Arrow into the problem of the impossibility theorem. Kenneth Arrow proved that no ranked-choice aggregation rule can satisfy a specified set of reasonable fairness conditions for three or more alternatives. Democratic rules do more than count preferences after citizens arrive at the polls. They define districts, alternatives, eligibility, agenda order, representation, and the incentives that shape participation before a ballot is cast.\n\nThe governing inquiry is to make fairness criteria explicit and test whether they can coexist rather than assuming one perfect voting rule exists. Analysts must separate a rule’s formal symmetry from its real distributional effects and compare outcomes under defensible alternatives. Maps, registration practices, party strategies, turnout, and institutional checks belong in one account, though they should not be collapsed into one statistic.\n\nMany electoral disputes become misleading when every disadvantage is called fraud or every legal procedure is presumed fair. A system can follow its written steps while systematically reducing competition or participation. It can also produce an unpopular result without any improper manipulation.\n\nThe democratic principle is institutional design involves tradeoffs because desirable democratic properties can conflict mathematically. Fairness becomes assessable when rules, access, and representation are examined together. Minority protection is not an exception to democracy but one test of whether political equality is durable. Agenda control often matters before the public reaches the visible stage of casting votes. Minority protection is not an exception to democracy but one test of whether political equality is durable. Agenda control often matters before the public reaches the visible stage of casting votes.",
      "frame": "Traces one block with a pencil. \"Count the rules before the votes. Start with the impossibility theorem.\"",
      "q": [
        {
          "q": "Which democratic-theory statement most accurately represents Kenneth Arrow on the impossibility theorem?",
          "o": [
            {
              "t": "Kenneth Arrow made the impossibility theorem depend on explicit rules, participation, representation, and institutional effects. It remains checkable in the dated record in the case file.",
              "v": "expert",
              "fb": "Correct: election analysis begins by identifying how a rule converts participation and preference into power."
            },
            {
              "t": "Kenneth Arrow treated the impossibility theorem as fair whenever officials followed the written procedure without deviation. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Legality and equality are related questions, but they are not identical."
            },
            {
              "t": "Kenneth Arrow let the final vote total settle the impossibility theorem without examining maps or registration access. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "A final tally cannot by itself validate the rules that produced the electorate and districts."
            },
            {
              "t": "Kenneth Arrow used an unexpected result in the impossibility theorem as proof of foreign control over the election. The conclusion shapes which records receive attention in the case file.",
              "v": "danger",
              "fb": "Unexpected outcomes can arise from ordinary rules, strategy, or administration without foreign intervention."
            }
          ]
        },
        {
          "q": "Which empirical check best applies the method from this profile?",
          "o": [
            {
              "t": "Compare maps, voter rolls, turnout, and representation under relevant alternative rules and boundaries. It remains checkable in the operational record in the case file.",
              "v": "expert",
              "fb": "Yes: institutional effects become visible through comparison of rules, access, and outcomes."
            },
            {
              "t": "Check whether every form was completed correctly, but rarely measure who was excluded by the process. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Procedural regularity can coexist with a systematically unequal burden."
            },
            {
              "t": "Judge district fairness from compact shape alone, and ignore population balance or electoral effects. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Shape is one clue, while representation and partisan effect require additional measurement."
            },
            {
              "t": "Search for an outside culprit before reviewing the county's own records and administrative choices. The conclusion shapes which records receive attention in the case file.",
              "v": "danger",
              "fb": "Domestic records should be tested before a more dramatic external explanation is adopted."
            }
          ]
        },
        {
          "q": "Which conclusion follows most carefully from the impossibility theorem?",
          "o": [
            {
              "t": "Democratic fairness should be evaluated through several stated criteria, not one convenient statistic. The evidence remains open under the documented sequence.",
              "v": "expert",
              "fb": "Exactly: democratic design involves multiple values that should be named rather than hidden."
            },
            {
              "t": "One preferred measure should decide every dispute regardless of geography, participation, or minority rights. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A single metric can illuminate one distortion while overlooking another democratic interest."
            },
            {
              "t": "Accurate ballot counting should make an election fair regardless of how the eligible roll was created. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Accurate tabulation does not validate an improperly restricted electorate."
            },
            {
              "t": "Every close contest is treated as ordinary politics or proof that the whole election was secretly rigged. Foreign interference becomes the organizing theory before review.",
              "v": "danger",
              "fb": "Specific institutional findings are more useful than either complacency or universal suspicion."
            }
          ]
        }
      ]
    },
    "partysystems": {
      "sci": "Giovanni Sartori (1924-2017)",
      "topic": "Parties & the counting of votes",
      "lede": "The machinery translating citizens into power anchors Giovanni Sartori's analysis of parties and the counting of votes.",
      "no": 9,
      "profile": "The civic briefing today follows Giovanni Sartori into the problem of parties and the counting of votes. Giovanni Sartori classified party systems by the number of relevant parties, ideological distance, and patterns of coalition and opposition. Democratic rules do more than count preferences after citizens arrive at the polls. They define districts, alternatives, eligibility, agenda order, representation, and the incentives that shape participation before a ballot is cast.\n\nThe governing inquiry is to count parties by their governing or blackmail potential rather than listing every organization on the ballot. Analysts must separate a rule’s formal symmetry from its real distributional effects and compare outcomes under defensible alternatives. Maps, registration practices, party strategies, turnout, and institutional checks belong in one account, though they should not be collapsed into one statistic.\n\nMany electoral disputes become misleading when every disadvantage is called fraud or every legal procedure is presumed fair. A system can follow its written steps while systematically reducing competition or participation. It can also produce an unpopular result without any improper manipulation.\n\nThe democratic principle is the effective structure of competition depends on which parties alter coalition possibilities and strategic behavior. Fairness becomes assessable when rules, access, and representation are examined together. Minority protection is not an exception to democracy but one test of whether political equality is durable. Agenda control often matters before the public reaches the visible stage of casting votes. Minority protection is not an exception to democracy but one test of whether political equality is durable. Agenda control often matters before the public reaches the visible stage of casting votes.",
      "frame": "Places a purge notice beside the poll book. \"Procedure looks neutral from far away. Show me what parties and the counting of votes tests.\"",
      "q": [
        {
          "q": "Which democratic-theory statement most accurately represents Giovanni Sartori on parties and the counting of votes?",
          "o": [
            {
              "t": "Giovanni Sartori made parties and the counting of votes depend on explicit rules, participation, representation, and institutional effects. It remains checkable in the dated record in the case file.",
              "v": "expert",
              "fb": "Correct: election analysis begins by identifying how a rule converts participation and preference into power."
            },
            {
              "t": "Giovanni Sartori treated parties and the counting of votes as fair whenever officials followed the written procedure without deviation. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Legality and equality are related questions, but they are not identical."
            },
            {
              "t": "Giovanni Sartori let the final vote total settle parties and the counting of votes without examining maps or registration access. The explanation treats the conflicting record as secondary.",
              "v": "wrong",
              "fb": "A final tally cannot by itself validate the rules that produced the electorate and districts."
            },
            {
              "t": "Giovanni Sartori used an unexpected result in parties and the counting of votes as proof of foreign control over the election. The conclusion shapes which records receive attention in the case file.",
              "v": "danger",
              "fb": "Unexpected outcomes can arise from ordinary rules, strategy, or administration without foreign intervention."
            }
          ]
        },
        {
          "q": "Which empirical check best applies the method from this profile?",
          "o": [
            {
              "t": "Compare maps, voter rolls, turnout, and representation under relevant alternative rules and boundaries. It remains checkable in the operational record in the case file.",
              "v": "expert",
              "fb": "Yes: institutional effects become visible through comparison of rules, access, and outcomes."
            },
            {
              "t": "Check whether every form was completed correctly, but rarely measure who was excluded by the process. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "Procedural regularity can coexist with a systematically unequal burden."
            },
            {
              "t": "Judge district fairness from compact shape alone, and ignore population balance or electoral effects. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Shape is one clue, while representation and partisan effect require additional measurement."
            },
            {
              "t": "Search for an outside culprit before reviewing the county's own records and administrative choices. The conclusion shapes which records receive attention in the case file.",
              "v": "danger",
              "fb": "Domestic records should be tested before a more dramatic external explanation is adopted."
            }
          ]
        },
        {
          "q": "Which conclusion follows most carefully from parties and the counting of votes?",
          "o": [
            {
              "t": "Democratic fairness should be evaluated through several stated criteria, not one convenient statistic. The evidence remains open under the documented sequence.",
              "v": "expert",
              "fb": "Exactly: democratic design involves multiple values that should be named rather than hidden."
            },
            {
              "t": "One preferred measure should decide every dispute regardless of geography, participation, or minority rights. The remaining uncertainty is assigned to ordinary variation.",
              "v": "partial",
              "fb": "A single metric can illuminate one distortion while overlooking another democratic interest."
            },
            {
              "t": "Accurate ballot counting should make an election fair regardless of how the eligible roll was created. The account leans heavily on prior reputation in the case file.",
              "v": "wrong",
              "fb": "Accurate tabulation does not validate an improperly restricted electorate."
            },
            {
              "t": "Every close contest is treated as ordinary politics or proof that the whole election was secretly rigged. Foreign interference becomes the organizing theory before review.",
              "v": "danger",
              "fb": "Specific institutional findings are more useful than either complacency or universal suspicion."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "pollworker": {
      "pollingsite": "Poll Captain Ada Reyes finds you at the polling precincts with a district map beneath the poll ledger. \"Worked the tables; watched voters turned away as 'inactive' by the hundred. The count was accurate after the electorate and boundaries had already been altered.\"",
      "partyhq": "Poll Captain Ada Reyes finds you at the county party headquarters with a district map beneath the poll ledger. \"Worked the tables; watched voters turned away as 'inactive' by the hundred. The count was accurate after the electorate and boundaries had already been altered.\"",
      "electionoffice": "Poll Captain Ada Reyes finds you at the county elections office with a district map beneath the poll ledger. \"Worked the tables; watched voters turned away as 'inactive' by the hundred. The count was accurate after the electorate and boundaries had already been altered.\""
    },
    "clerk": {
      "pollingsite": "The Records Clerk finds you at the polling precincts with a district map beneath the poll ledger. \"Keeps the purge logs and the district map redrawn behind closed doors. The count was accurate after the electorate and boundaries had already been altered.\"",
      "partyhq": "The Records Clerk finds you at the county party headquarters with a district map beneath the poll ledger. \"Keeps the purge logs and the district map redrawn behind closed doors. The count was accurate after the electorate and boundaries had already been altered.\"",
      "electionoffice": "The Records Clerk finds you at the county elections office with a district map beneath the poll ledger. \"Keeps the purge logs and the district map redrawn behind closed doors. The count was accurate after the electorate and boundaries had already been altered.\""
    },
    "canvasser": {
      "pollingsite": "Canvasser Dumont finds you at the polling precincts with a district map beneath the poll ledger. \"Knocks every door; knew which blocks were carved out of which district. The count was accurate after the electorate and boundaries had already been altered.\"",
      "partyhq": "Canvasser Dumont finds you at the county party headquarters with a district map beneath the poll ledger. \"Knocks every door; knew which blocks were carved out of which district. The count was accurate after the electorate and boundaries had already been altered.\"",
      "electionoffice": "Canvasser Dumont finds you at the county elections office with a district map beneath the poll ledger. \"Knocks every door; knew which blocks were carved out of which district. The count was accurate after the electorate and boundaries had already been altered.\""
    }
  },
  "story": [
    "<b>The Kessler County Count</b> opens inside the Kessler County election inquiry, where the public explanation has hardened faster than the evidence.",
    "<b>Poll Captain Ada Reyes</b>, <b>The Records Clerk</b>, and <b>Canvasser Dumont</b> hold different parts of the record, and every conversation begins with one real figure whose work teaches you how to read it.",
    "The case keeps pulling investigators toward <b>A foreign plot rigged the whole election</b> or <b>Nothing unusual — politics as it always is</b>. Both are plausible enough to survive a headline; neither should survive the full dossier untested.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide the <b>WHAT</b> for yourself."
  ],
  "endings": {
    "overclaimWhat": "foreign",
    "dismissalWhat": "usual",
    "win": {
      "expertTitle": "The Election Was Shaped Before the Count",
      "expert": [
        "You identify <b>Supervisor Hollis Crane — the elections registrar</b>, locate the administrative record in <b>The County Elections Office</b>, and establish <b>A drawn map & a quiet purge of the rolls</b>. Not a foreign plot rigged the whole election. Not nothing unusual — politics as it always is.",
        "The ballots were counted, but the closed-door map and targeted inactive-voter process changed whose votes could be cast and how they converted into seats. The distortion is documented locally, not imposed by a foreign hand."
      ],
      "soundTitle": "The Map and Roll Align",
      "sound": [
        "Your accusation correctly joins <b>Supervisor Hollis Crane — the elections registrar</b>, <b>The County Elections Office</b>, and <b>A drawn map & a quiet purge of the rolls</b>. Draft maps and purge records demonstrate the coordinated administrative effect.",
        "Your report could quantify the seat bias more fully, yet it already distinguishes accurate tabulation from fair access and representation."
      ],
      "namedTitle": "The Quiet Machinery",
      "named": [
        "You select <b>Supervisor Hollis Crane — the elections registrar</b>, <b>The County Elections Office</b>, and <b>A drawn map & a quiet purge of the rolls</b> correctly.",
        "The finding is stated narrowly, but it sends the court to the exact records needed for a fuller remedy."
      ]
    },
    "overclaim": {
      "title": "The Foreign Hand That Wasn’t Needed",
      "body": [
        "You declare <b>A foreign plot rigged the whole election</b>, giving distant intrigue credit for work visible in county map files and registration logs.",
        "The unsupported allegation polarizes the review and weakens the local evidence. Officials can reject the conspiracy while avoiding the rules they actually controlled."
      ]
    },
    "dismissal": {
      "title": "Politics as Usual, Exclusion as Policy",
      "body": [
        "You choose <b>Nothing unusual — politics as it always is</b>, treating boundary manipulation and selective inactivity designations as ordinary partisan roughness.",
        "That dismissal normalizes an administrative pattern that decides participation before citizens reach the table. The same exclusions remain embedded for the next contest."
      ]
    },
    "wrongNames": {
      "title": "The Mechanism, Wrong Office",
      "body": [
        "You recognize <b>A drawn map & a quiet purge of the rolls</b>, but place responsibility with the wrong political actor or outside the elections office. The map approvals and purge authority lead instead to"
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A ballot box beside a distorted district map\"><path d=\"M74 52 L244 52 L224 112 L94 112 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M110 36 L208 36 L208 52 L110 52 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M136 28 L184 28\" stroke=\"#326891\" stroke-width=\"3\"/><path d=\"M342 28 C390 18,442 42,474 28 C514 10,568 30,606 24 L602 108 C558 98,516 116,472 100 C426 84,386 108,342 94 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M370 36 C406 58,410 84,394 104 M446 30 C428 58,442 86,470 102 M520 24 C500 52,514 82,548 104\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"1.8\"/></svg>"
}};
