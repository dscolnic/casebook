// Casebook V3 — three informants, three readings, one clue per correct answer.
module.exports = { PACK: {
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "j_capture",
  "title": "The Halcyon Grid",
  "discipline": "Regulation & Public Choice",
  "venue": "the Halcyon utility oversight inquiry",
  "agent": {
    "name": "Investigator Owen Marsh",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Commission credibility",
  "readingShort": "Theorists",
  "readingLabel": "Theorists of the State & the Firm",
  "dossierName": "THEORISTS OF REGULATION",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Halcyon utility oversight inquiry",
  "DAYS_TOTAL": 3,
  "teaser": "A monopoly utility wins every major rate case while the network keeps failing. Is a criminal cabal controlling the grid, are unpopular decisions simply normal regulation, or has the oversight board become responsive to the firm it is meant to constrain?",
  "overclaimTag": "a shadowy criminal cabal",
  "truthTag": "a captured oversight board",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A utility rate hearing with board seats linked to the regulated firm\"><rect x=\"60\" y=\"70\" width=\"240\" height=\"42\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><circle cx=\"105\" cy=\"52\" r=\"14\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><circle cx=\"180\" cy=\"52\" r=\"14\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><circle cx=\"255\" cy=\"52\" r=\"14\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/><rect x=\"430\" y=\"32\" width=\"150\" height=\"80\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/><path d=\"M300 91 C360 92 370 48 430 50 M300 96 C365 104 390 82 430 82\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"3\"/><path d=\"M455 52 h100 M455 70 h100 M455 88 h70\" stroke=\"#e2e2d8\" stroke-width=\"2\"/></svg>",
  "overclaimTease": "Look past the public hearing’s formal shape. The decisive evidence is who supplied the people, assumptions, and draft language that became official judgment.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "chair",
      "items": [
        {
          "id": "ceo",
          "label": "The utility chief executive"
        },
        {
          "id": "chair",
          "label": "Regina Poll — the oversight board chair"
        },
        {
          "id": "staff",
          "label": "The commission staff director"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "boardfiles",
      "items": [
        {
          "id": "boardfiles",
          "label": "The Oversight Board Appointment & Draft Files"
        },
        {
          "id": "ratehearing",
          "label": "The Public Rate-Hearing Chamber"
        },
        {
          "id": "utilityhq",
          "label": "The Utility Head Office"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "capture",
      "items": [
        {
          "id": "cabal",
          "label": "A covert criminal group secretly dictated grid decisions"
        },
        {
          "id": "normal",
          "label": "Ordinary regulation produced defensible but unpopular rates"
        },
        {
          "id": "capture",
          "label": "The regulated utility staffed and steered its own oversight"
        }
      ]
    }
  },
  "READING_ORDER": [
    "analyst",
    "clerk",
    "lineworker"
  ],
  "CHARACTERS": {
    "analyst": {
      "name": "Staff Analyst Devi Rao",
      "role": "Commission rate analyst",
      "face": "📊",
      "badge": "R",
      "legend": "the modeling desk",
      "hint": "Adverse reliability findings were repeatedly revised after private chair meetings.",
      "reading": "capturetheory"
    },
    "clerk": {
      "name": "The Board Records Clerk",
      "role": "Appointments and decision-records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the board archive",
      "hint": "Appointment résumés, calendars, and draft orders preserve the same utility network.",
      "reading": "collective"
    },
    "lineworker": {
      "name": "Lineworker Hobbs",
      "role": "Utility lineworker",
      "face": "🔌",
      "badge": "H",
      "legend": "the failing grid",
      "hint": "Rate-funded maintenance promised in hearings did not reach the circuits that continued failing.",
      "reading": "publicity"
    }
  },
  "TOPICS": {
    "capturetheory": {
      "sci": "George Stigler (1911-1991)",
      "topic": "The theory of regulatory capture",
      "lede": "George Stigler treated regulation as something industries compete to obtain, not merely a neutral restraint imposed upon them.",
      "no": 1,
      "profile": "George Stigler was an American economist associated with the University of Chicago and a leading figure in the study of industrial organization. In his 1971 article “The Theory of Economic Regulation,” he challenged the comforting assumption that regulation naturally serves the public interest. Industries have concentrated stakes in regulatory decisions, he argued, while individual consumers each have small stakes and high costs of organizing. The regulated firms therefore possess strong incentives to supply information, cultivate relationships, support appointments, and seek rules that protect their position.\n\nCapture does not require bribery or a secret conspiracy. It can emerge through ordinary institutional channels. Commissioners may depend on industry expertise, staff may expect future employment, hearings may be dominated by technical submissions from the firm, and rate models may frame the company’s preferred assumptions as the only practical ones. The resulting decisions can still follow formal procedure while systematically favoring the regulated enterprise.\n\nStigler’s framework also warns against treating every favorable decision as proof of capture. Utilities may legitimately need investment, and regulators must balance reliability, affordability, and financial viability. Evidence comes from patterns: who supplies the data, who receives access, how dissenting analyses change, whether promised investment occurs, and whether appointments repeatedly move between regulator and firm.\n\nAt Halcyon, the utility’s rate requests were not merely approved. Staff downside scenarios were rewritten after private chair meetings, former company officers filled key board seats, and maintenance commitments disappeared from final orders while returns remained protected. Those details do not describe a shadowy cabal controlling the grid from outside. They describe formal authority redirected from within. Stigler’s question is therefore institutional: who benefited from the regulatory product, and who had the organized power to shape it?",
      "frame": "Sets the public rate order beside a draft carrying redlined staff objections. “Capture hides in procedure that still looks lawful. Show me how to distinguish a hard judgment from a regulator serving its client.”",
      "q": [
        {
          "q": "What is the central claim of Stigler’s capture theory?",
          "o": [
            {
              "t": "Any regulation that raises prices indicates it was purchased through direct bribery.",
              "v": "wrong",
              "fb": "Bribery is one possible offense, not a necessary element of regulatory capture."
            },
            {
              "t": "A lawful hearing is sufficient evidence that the decision serves the public interest fairly.",
              "v": "danger",
              "fb": "Formal procedure can remain intact while participation and assumptions become one-sided."
            },
            {
              "t": "Regulators may make technical mistakes because utility finance is unusually complex.",
              "v": "partial",
              "fb": "Complexity can cause mistakes, but capture predicts a patterned tilt toward organized beneficiaries."
            },
            {
              "t": "Organized industries can obtain regulations that protect their concentrated interests.",
              "v": "expert",
              "fb": "Capture can arise through incentives, access, and information advantages without an illegal payment."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — lead",
            "text": "The rate process remained formally legal while its assumptions and appointments repeatedly favored the regulated utility."
          }
        },
        {
          "q": "Which pattern most strongly supports capture rather than one generous rate decision?",
          "o": [
            {
              "t": "Repeated favorable revisions follow access, appointments, and benefits tied to one firm.",
              "v": "expert",
              "fb": "A recurring connection among influence, decision changes, and benefits is stronger than one outcome."
            },
            {
              "t": "The utility wins one contested issue after presenting a technically detailed filing.",
              "v": "partial",
              "fb": "A single technical victory may be justified and needs a broader institutional pattern."
            },
            {
              "t": "Customers complain about outages during a summer of severe storms and equipment failures.",
              "v": "wrong",
              "fb": "Outage complaints can reveal poor performance but do not identify capture by themselves."
            },
            {
              "t": "The company is large, so every commissioner who meets it should be presumed corrupt on contact.",
              "v": "danger",
              "fb": "Size and contact create risk, not proof; the evidence must show how authority was steered."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — lead",
            "text": "The board chair controlled appointments, private meetings, and revisions that repeatedly removed adverse staff findings."
          }
        },
        {
          "q": "Where should investigators look for the mechanism of a formally lawful capture?",
          "o": [
            {
              "t": "On the damaged distribution lines where customers experienced the outages.",
              "v": "partial",
              "fb": "Field failures show consequences, but not how the regulatory decision was shaped."
            },
            {
              "t": "In appointment, access, draft-decision, and staff-revision records inside the regulator.",
              "v": "expert",
              "fb": "Institutional records reveal how people, assumptions, and decisions moved through the formal process."
            },
            {
              "t": "In the utility’s public advertising campaign defending its reliability record.",
              "v": "wrong",
              "fb": "Advertising may frame the dispute but does not preserve the decision pathway."
            },
            {
              "t": "Outside the institution, because capture rarely appears through official documents.",
              "v": "danger",
              "fb": "Capture often works through official channels, making internal records especially probative."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — lead",
            "text": "Appointment files, draft orders, meeting calendars, and redlined analyses converge in the oversight board’s records."
          }
        }
      ]
    },
    "collective": {
      "sci": "Mancur Olson (1932-1998)",
      "topic": "The logic of concentrated interests",
      "lede": "Mancur Olson explained why a small group with much to gain can defeat a vast public whose individual losses seem too small to organize around.",
      "no": 2,
      "profile": "Mancur Olson was an American economist and social scientist whose 1965 book The Logic of Collective Action reshaped thinking about groups and politics. A common assumption held that people sharing an interest would naturally organize to pursue it. Olson showed why that often fails. In a large group, each person may receive the benefit whether or not they contribute, while the cost of learning, attending, and organizing falls directly on the individual. The temptation to free-ride weakens collective action.\n\nSmall groups with concentrated benefits face the opposite incentives. A utility seeking hundreds of millions of dollars from a rate order can justify teams of lawyers, economists, and lobbyists. A household facing a few extra dollars each month may rationally spend no time mastering depreciation schedules or attending hearings. The result is an asymmetry of attention and expertise, not necessarily public indifference or stupidity.\n\nOlson also emphasized selective incentives and organization. Trade associations can monitor participation, reward members, and sustain effort over many years. Diffuse consumers often mobilize only after a crisis. Regulatory processes that rely on participation without correcting these disparities can therefore hear a technically sophisticated industry voice far more consistently than the public voice.\n\nHalcyon’s hearing record exhibits that imbalance. The utility supplied the primary model, paid the consultants used to validate it, met repeatedly with the chair, and placed former executives on advisory panels. Residents appeared during outage hearings, but their testimony entered after the investment assumptions were already fixed. Olson’s lesson explains how capture can look routine: the party with the largest concentrated gain invests continuously, while millions of customers each lack the incentive to contest every spreadsheet. The decisive question is who converted that structural advantage into official control over the board’s analysis and appointments.",
      "frame": "Stacks twelve utility submissions beside a thin folder of public comments. “The public filled the chamber once. The company worked the process every week. That difference leaves fingerprints.”",
      "q": [
        {
          "q": "Why do concentrated interests often organize more effectively than a broad public?",
          "o": [
            {
              "t": "Small groups generally possess more accurate information than large populations.",
              "v": "partial",
              "fb": "Small groups can be informed, but their advantage begins with incentives and organization."
            },
            {
              "t": "Public interests disappear whenever individuals disagree about one policy detail.",
              "v": "wrong",
              "fb": "Disagreement complicates action without erasing shared interests in price or reliability."
            },
            {
              "t": "Each member gains enough from success to justify sustained effort and monitoring.",
              "v": "expert",
              "fb": "Concentrated stakes make organization rational even when the affected public is much larger."
            },
            {
              "t": "Low public participation indicates customers approve the regulated firm’s proposal.",
              "v": "danger",
              "fb": "Silence may reflect high participation costs rather than informed consent."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — corroboration",
            "text": "The utility maintained continuous legal and technical influence while customers entered only after failures became visible."
          }
        },
        {
          "q": "What evidence shows that participation imbalance became control rather than mere access?",
          "o": [
            {
              "t": "The utility submits more pages and employs more lawyers than consumer groups.",
              "v": "partial",
              "fb": "Resource imbalance creates opportunity, but revisions show whether the opportunity changed decisions."
            },
            {
              "t": "Several customers leave the hearing before the final witness completes testimony.",
              "v": "wrong",
              "fb": "Attendance behavior does not reveal who controlled the regulatory product."
            },
            {
              "t": "Industry expertise should be accepted without challenge because regulators need it.",
              "v": "danger",
              "fb": "Needed expertise must still be tested against independent analysis and competing evidence."
            },
            {
              "t": "Private access is followed by traceable revisions in official models and orders.",
              "v": "expert",
              "fb": "The link between privileged access and official changes turns asymmetry into evidence of influence."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — corroboration",
            "text": "Board files show utility language copied into orders and staff assumptions changed after private meetings unavailable to other parties."
          }
        },
        {
          "q": "Who is best positioned to convert concentrated influence into a binding commission decision?",
          "o": [
            {
              "t": "The official controlling agendas, appointments, and final decision procedures.",
              "v": "expert",
              "fb": "Influence becomes governmental action through the official who controls the institution’s decision gates."
            },
            {
              "t": "Every analyst who uses company data becomes equally responsible for the outcome.",
              "v": "danger",
              "fb": "Using imperfect data can be a constraint; responsibility depends on authority and intervention."
            },
            {
              "t": "The utility executive who benefits from higher rates and presents the filing.",
              "v": "partial",
              "fb": "The executive supplies pressure and benefit, but does not alone issue the binding order."
            },
            {
              "t": "The lineworker who repairs failures after investment commitments are deferred.",
              "v": "wrong",
              "fb": "The lineworker experiences consequences without authority over rate decisions."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — corroboration",
            "text": "The chair set agendas, controlled appointments, authorized private access, and directed the revisions that became final orders."
          }
        }
      ]
    },
    "publicity": {
      "sci": "Louis Brandeis (1856-1941)",
      "topic": "Publicity, monopoly, and institutional sunlight",
      "lede": "Louis Brandeis argued that concentrated private power thrives when transactions and influence remain difficult for the public to inspect.",
      "no": 3,
      "profile": "Louis D. Brandeis was an American lawyer, reformer, and Supreme Court justice who challenged concentrated economic power during the Progressive Era. Before joining the Court in 1916, he represented consumers, workers, and public causes while developing what became known as the “Brandeis brief,” combining legal argument with social and economic evidence. He distrusted the ability of large institutions to police themselves when their incentives and operations were hidden from those bearing the costs.\n\nBrandeis is often associated with the phrase that sunlight is the best disinfectant. Publicity, in his view, could expose fees, conflicts, interlocking interests, and financial arrangements that flourished under obscurity. Disclosure was not magic: information must be timely, intelligible, and connected to enforceable duties. A thousand-page filing can conceal as effectively as a locked drawer if decisive assumptions and relationships remain buried.\n\nHis concern with bigness also matters for utilities. Natural-monopoly infrastructure may require regulation because duplicating wires, pipes, or tracks can be inefficient. That makes the regulator’s independence especially important. If the public cannot choose another network, it must be able to examine who sets rates, how promised investment is measured, and whether officials have financial or career ties to the company.\n\nIn the Halcyon case, the visible hearing is less important than the hidden sequence behind it. Calendars omit private preparation meetings; conflict disclosures are incomplete; draft orders circulate through utility counsel; and promised reliability spending is reclassified after approval. When those records are assembled, the pattern is neither mysterious cabal nor ordinary tough regulation. It is a board chair using formal authority to make one firm’s perspective the default. Brandeis supplies the final test: expose the relationships and compare the public justification with the private drafting trail.",
      "frame": "Turns the rate order toward a window, then overlays meeting calendars and employment histories. “Public procedure is not sunlight if the decisive work happens where nobody can see it.”",
      "q": [
        {
          "q": "What does Brandeis’s idea of publicity require beyond releasing documents?",
          "o": [
            {
              "t": "Confidential drafting whenever disclosure might embarrass regulated officials or firms.",
              "v": "danger",
              "fb": "Avoiding embarrassment is not a basis for concealing conflicts or substantive influence."
            },
            {
              "t": "Timely, understandable disclosure of the relationships and assumptions shaping decisions.",
              "v": "expert",
              "fb": "Effective sunlight lets outsiders see and challenge the actual decision pathway."
            },
            {
              "t": "Publication of the final order after every appeal deadline has already passed.",
              "v": "partial",
              "fb": "Late disclosure may document history while preventing meaningful participation."
            },
            {
              "t": "A large archive that contains every filing without indexes or explanatory context.",
              "v": "wrong",
              "fb": "Volume alone can bury decisive facts instead of making them visible."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — decisive",
            "text": "The oversight records reveal omitted meetings, revolving-door appointments, and utility edits hidden behind the public hearing."
          }
        },
        {
          "q": "Why is regulator independence especially important for a monopoly utility?",
          "o": [
            {
              "t": "The utility should choose its regulators because employees understand the system best.",
              "v": "danger",
              "fb": "Expertise can inform oversight without giving the regulated firm control over it."
            },
            {
              "t": "Monopolies tend to operate inefficiently regardless of investment or management quality.",
              "v": "partial",
              "fb": "Monopoly raises risks but does not prove every decision or operator is inefficient."
            },
            {
              "t": "Customers cannot readily exit, so oversight substitutes for competitive discipline.",
              "v": "expert",
              "fb": "When exit is unavailable, independent review becomes the main protection against abuse."
            },
            {
              "t": "A single network removes any need to compare costs, service, or promised upgrades.",
              "v": "wrong",
              "fb": "A monopoly still requires scrutiny of performance, costs, and commitments."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — decisive",
            "text": "Customers lacked an alternative network while the regulated firm shaped the board intended to protect them."
          }
        },
        {
          "q": "Which final fact most directly identifies the official responsible for the captured process?",
          "o": [
            {
              "t": "Every board member shares identical responsibility regardless of votes or authority.",
              "v": "danger",
              "fb": "Collective membership does not erase differences in authority, action, or recorded dissent."
            },
            {
              "t": "The chief executive sought favorable rates and met the board frequently.",
              "v": "partial",
              "fb": "The executive is the beneficiary and advocate, but the chair converted requests into official decisions."
            },
            {
              "t": "Commission analysts used a standard model originally supplied by the utility.",
              "v": "wrong",
              "fb": "Model use may show dependence without identifying who ordered the decisive changes."
            },
            {
              "t": "Her signed appointment and revision instructions connect influence to binding action.",
              "v": "expert",
              "fb": "The documentary chain ties institutional control and specific interventions to the chair."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — decisive",
            "text": "The chair approved conflicted appointments and personally directed the redlines that entered the final rate orders."
          }
        }
      ]
    }
  },
  "story": [
    "<b>Halcyon’s utility wins repeated rate increases while promised reliability work disappears and outages worsen.</b>",
    "Staff Analyst Devi Rao can reconstruct the changing models. The board clerk holds appointments and draft orders. Lineworker Hobbs knows what the approved money did not repair.",
    "The outcomes may reflect a hidden criminal cabal, ordinary difficult regulation, or a public board gradually made responsive to the company it oversees.",
    "Nine clues follow influence from concentrated participation through appointments and edits into the final regulatory product."
  ],
  "endings": {
    "overclaimWhat": "cabal",
    "dismissalWhat": "normal",
    "win": {
      "expertTitle": "The Regulator Became the Client",
      "expert": [
        "You connect Regina Poll, the Oversight Board Appointment & Draft Files, and a captured regulatory process. Appointments, private access, model revisions, and final orders form a continuous institutional chain.",
        "The evidence does not require a hidden criminal cabal, but it also exceeds ordinary disagreement over rates. Formal authority remained visible while the regulated firm supplied the people, assumptions, and language that authority adopted."
      ],
      "soundTitle": "The Captured Board",
      "sound": [
        "Your accusation identifies the chair, the board files, and the utility’s control of oversight.",
        "Some appointment or drafting links remain incomplete, but the repeated direction of influence supports the finding."
      ],
      "namedTitle": "Correct Institution, Limited Trail",
      "named": [
        "You select the correct WHO, WHERE, and WHAT.",
        "The verdict is right, although missed clues leave parts of the access and revision sequence less fully documented."
      ]
    },
    "overclaim": {
      "title": "Capture Did Not Require a Secret Cabal",
      "body": [
        "The decisive actions appear in appointments, calendars, draft orders, and signed commission instructions.",
        "A dramatic outside conspiracy distracts from the formal institution that was redirected from within."
      ]
    },
    "dismissal": {
      "title": "This Was Not Ordinary Regulatory Judgment",
      "body": [
        "Private access repeatedly preceded revisions favoring the utility, and conflicted appointments shaped who reviewed the evidence.",
        "The pattern is too structured and one-sided to explain as routine disagreement over rates."
      ]
    },
    "wrongNames": {
      "title": "The Capture, Mislocated",
      "body": [
        "You recognize regulatory capture but assign it away from the chair and board records that converted industry influence into binding decisions."
      ]
    }
  }
}
};
