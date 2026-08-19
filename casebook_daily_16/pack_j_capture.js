module.exports = { PACK: {
  "id": "j_capture",
  "title": "The Halcyon Grid",
  "discipline": "Regulation & Public Choice",
  "teaser": "A power utility keeps winning every rate case while the lights keep failing. A shadowy cabal? Just how regulation works? Or a board quietly staffed by the firm it is meant to watch?",
  "overclaimTag": "a shadowy cabal",
  "truthTag": "a captured oversight board",
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
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The WHERE you test determines the dossier, and the conversation costs one day.",
  "overclaimTease": "A cabal explains everything too easily; appointments, incentives, and revisions leave a firmer trail.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "chair",
      "items": [
        {
          "id": "ceo",
          "label": "The utility's chief executive"
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
          "id": "ratehearing",
          "label": "The Rate-Hearing Chamber"
        },
        {
          "id": "utilityhq",
          "label": "The Utility's Head Office"
        },
        {
          "id": "boardfiles",
          "label": "The Oversight Board's Records"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "capture",
      "items": [
        {
          "id": "cabal",
          "label": "A shadowy cabal secretly runs the grid"
        },
        {
          "id": "normal",
          "label": "Nothing amiss — ordinary regulation at work"
        },
        {
          "id": "capture",
          "label": "The firm staffed & steered its own regulator"
        }
      ]
    }
  },
  "PLACES": {
    "ratehearing": {
      "name": "The Rate-Hearing Chamber",
      "xy": [
        140,
        90
      ]
    },
    "utilityhq": {
      "name": "The Utility's Head Office",
      "xy": [
        330,
        240
      ]
    },
    "boardfiles": {
      "name": "The Oversight Board's Records",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "ratehearing",
      "utilityhq"
    ],
    [
      "utilityhq",
      "boardfiles"
    ]
  ],
  "CHARACTERS": {
    "analyst": {
      "name": "Staff Analyst Devi Rao",
      "role": "Commission staff analyst",
      "face": "📊",
      "badge": "R",
      "legend": "the commission",
      "hint": "Runs the rate models; her adverse findings kept getting revised upward."
    },
    "clerk": {
      "name": "The Records Clerk",
      "role": "Board records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the board office",
      "hint": "Keeps the appointment files — and the résumés that all trace to one firm."
    },
    "lineworker": {
      "name": "Lineworker Hobbs",
      "role": "Utility lineworker",
      "face": "🔌",
      "badge": "H",
      "legend": "the utility",
      "hint": "Patches the failing grid the rate money never seems to reach."
    }
  },
  "TOPICMAP": {
    "ratehearing": {
      "analyst": [
        "bureaucracy"
      ],
      "clerk": [
        "sunshine"
      ],
      "lineworker": [
        "adminprocess"
      ]
    },
    "utilityhq": {
      "analyst": [
        "railhistory"
      ],
      "clerk": [
        "fcc"
      ],
      "lineworker": [
        "collective"
      ]
    },
    "boardfiles": {
      "analyst": [
        "rentseeking"
      ],
      "clerk": [
        "pricing"
      ],
      "lineworker": [
        "moderncapture"
      ]
    }
  },
  "TOPICS": {
    "bureaucracy": {
      "sci": "Max Weber (1864-1920)",
      "topic": "Bureaucracy & rational-legal authority",
      "lede": "Max Weber located bureaucracy and rational-legal authority in appointments, information dependence, and routine institutional incentives.",
      "no": 1,
      "profile": "The public-administration dispatch today considers Max Weber and the institutional dynamics of bureaucracy and rational-legal authority. Max Weber described bureaucracy as rule-bound administration based on offices, expertise, hierarchy, and rational-legal authority. Regulators require expertise from the industries they oversee, yet that dependence can reshape appointments, information, standards, and career paths. Weber’s contribution gives language to influence that may be lawful, gradual, and still damaging.\n\nThe practical investigation is to compare formal jurisdiction, written rules, career incentives, expertise, and actual chains of command. Appointment records, meeting access, draft revisions, revolving employment, information asymmetry, and the distribution of benefits should be traced across time. Capture is not proved by familiarity alone; it appears when the agency’s decisions repeatedly adopt the regulated interest’s priorities without a public justification that survives review.\n\nThis framework avoids two easy stories. Officials need not belong to a secret cabal for an institution to become dependent, and formal hearings do not establish independence simply because every box was checked. Incentives and organizational routines can redirect policy while leaving procedure outwardly intact.\n\nThe institutional lesson is bureaucratic procedure can support impartiality, yet formal rules do not guarantee independence from organized influence. Oversight works only when expertise is paired with independence, contestability, and records outsiders can inspect. Diffuse beneficiaries often need procedural safeguards because they cannot monitor every technical decision themselves. Rotation and disclosure help only when replacements and reviewers possess genuine authority. Diffuse beneficiaries often need procedural safeguards because they cannot monitor every technical decision themselves. Rotation and disclosure help only when replacements and reviewers possess genuine authority.",
      "frame": "Lays two nearly identical draft orders side by side. \"At The Rate-Hearing Chamber, influence edits in small increments. Explain bureaucracy and rational-legal authority.\"",
      "q": [
        {
          "q": "Which institutional account best reflects Max Weber’s work on bureaucracy and rational-legal authority?",
          "o": [
            {
              "t": "Max Weber made bureaucracy and rational-legal authority depend on appointments, information flows, incentives, and repeated policy outcomes.",
              "v": "expert",
              "fb": "Correct: capture theory investigates patterned dependence without requiring a cinematic conspiracy."
            },
            {
              "t": "Max Weber treated bureaucracy and rational-legal authority as proven by every meeting between a regulator and an industry representative.",
              "v": "partial",
              "fb": "Contact may be necessary for expertise and becomes probative only in a wider institutional pattern."
            },
            {
              "t": "Max Weber let a formal hearing settle bureaucracy and rational-legal authority without examining who supplied the decisive assumptions.",
              "v": "wrong",
              "fb": "Procedure can be followed while agendas, information, and revisions remain one-sided."
            },
            {
              "t": "Max Weber used bureaucracy and rational-legal authority to describe a secret cabal capable of controlling every agency decision.",
              "v": "danger",
              "fb": "A totalizing cabal claim is harder to test than a documented channel of influence."
            }
          ]
        },
        {
          "q": "Which records review would best implement the method in the profile?",
          "o": [
            {
              "t": "Trace appointments, meetings, draft changes, career movement, analytical inputs, and distributional benefits. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Yes: capture often becomes visible through linked records that show dependency developing over time."
            },
            {
              "t": "Count the public hearings, but ignore who supplied the technical assumptions used in the final order. The missing record is treated as a minor limitation.",
              "v": "partial",
              "fb": "A hearing record is incomplete if the decisive analytical inputs came from elsewhere."
            },
            {
              "t": "Accept the board's declaration of independence without examining staff movement or document history. The appointment record disagrees in the case file.",
              "v": "wrong",
              "fb": "Institutional independence is an empirical condition, not a self-certifying statement."
            },
            {
              "t": "Search for coded messages, while overlooking disclosed relationships and repeated favorable revisions. The dramatic explanation supplies the organizing theory.",
              "v": "danger",
              "fb": "Ordinary documented influence can matter more than speculative secret communication."
            }
          ]
        },
        {
          "q": "What regulatory lesson follows most soundly from bureaucracy and rational-legal authority?",
          "o": [
            {
              "t": "Regulatory independence should reduce informational dependence, concentrated access, and unreviewable discretion in the dated record in the case file.",
              "v": "expert",
              "fb": "Exactly: durable independence is designed into appointments, information, review, and transparency."
            },
            {
              "t": "Replacing one official should cure the problem even when staffing incentives and information channels persist in the operational record in the case file.",
              "v": "partial",
              "fb": "Personnel change helps only when the organizational conditions that shaped the old decisions also change."
            },
            {
              "t": "Technical expertise should guarantee public-minded decisions because knowledgeable boards does not be captured in the operational record in the case file.",
              "v": "wrong",
              "fb": "Expertise can improve judgment and simultaneously increase dependence on the regulated firm."
            },
            {
              "t": "The agency is treated as perfectly neutral or largely controlled by an invisible private network. The preferred narrative sets the order of review.",
              "v": "danger",
              "fb": "Institutions often occupy a documented and correctable middle ground between those absolutes."
            }
          ]
        }
      ]
    },
    "sunshine": {
      "sci": "Charles Francis Adams Jr. (1835-1915)",
      "topic": "The 'sunshine' railroad commission",
      "lede": "Charles Francis Adams Jr. made the ’sunshine’ railroad commission a question about who supplies expertise and who shapes the final rule.",
      "no": 2,
      "profile": "The public-administration dispatch today considers Charles Francis Adams Jr. and the institutional dynamics of the ’sunshine’ railroad commission. Charles Francis Adams Jr. served on the Massachusetts railroad commission and championed investigation and publicity as tools when direct coercive power was limited. Regulators require expertise from the industries they oversee, yet that dependence can reshape appointments, information, standards, and career paths. Jr’s contribution gives language to influence that may be lawful, gradual, and still damaging.\n\nThe practical investigation is to collect comparable operating information, hold public inquiries, and expose performance so reputation and political pressure can work. Appointment records, meeting access, draft revisions, revolving employment, information asymmetry, and the distribution of benefits should be traced across time. Capture is not proved by familiarity alone; it appears when the agency’s decisions repeatedly adopt the regulated interest’s priorities without a public justification that survives review.\n\nThis framework avoids two easy stories. Officials need not belong to a secret cabal for an institution to become dependent, and formal hearings do not establish independence simply because every box was checked. Incentives and organizational routines can redirect policy while leaving procedure outwardly intact.\n\nThe institutional lesson is sunshine can discipline a regulated firm only when disclosure is accurate, intelligible, and followed by consequences. Oversight works only when expertise is paired with independence, contestability, and records outsiders can inspect. Diffuse beneficiaries often need procedural safeguards because they cannot monitor every technical decision themselves. Rotation and disclosure help only when replacements and reviewers possess genuine authority. Diffuse beneficiaries often need procedural safeguards because they cannot monitor every technical decision themselves.",
      "frame": "Points to a revision in another hand. \"Procedure can remain intact while purpose bends. Start with the ’sunshine’ railroad commission.\"",
      "q": [
        {
          "q": "Which institutional account best reflects Charles Francis Adams Jr.’s work on the ’sunshine’ railroad commission?",
          "o": [
            {
              "t": "Charles Francis Adams Jr. made the ’sunshine’ railroad commission depend on appointments, information flows, incentives, and repeated policy outcomes.",
              "v": "expert",
              "fb": "Correct: capture theory investigates patterned dependence without requiring a cinematic conspiracy."
            },
            {
              "t": "Charles Francis Adams Jr. treated the ’sunshine’ railroad commission as proven by every meeting between a regulator and an industry representative.",
              "v": "partial",
              "fb": "Contact may be necessary for expertise and becomes probative only in a wider institutional pattern."
            },
            {
              "t": "Charles Francis Adams Jr. let a formal hearing settle the ’sunshine’ railroad commission without examining who supplied the decisive assumptions.",
              "v": "wrong",
              "fb": "Procedure can be followed while agendas, information, and revisions remain one-sided."
            },
            {
              "t": "Charles Francis Adams Jr. used the ’sunshine’ railroad commission to describe a secret cabal capable of controlling every agency decision.",
              "v": "danger",
              "fb": "A totalizing cabal claim is harder to test than a documented channel of influence."
            }
          ]
        },
        {
          "q": "Which records review would best implement the method in the profile?",
          "o": [
            {
              "t": "Trace appointments, meetings, draft changes, career movement, analytical inputs, and distributional benefits. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Yes: capture often becomes visible through linked records that show dependency developing over time."
            },
            {
              "t": "Count the public hearings, but ignore who supplied the technical assumptions used in the final order. The missing record is treated as a minor limitation.",
              "v": "partial",
              "fb": "A hearing record is incomplete if the decisive analytical inputs came from elsewhere."
            },
            {
              "t": "Accept the board's declaration of independence without examining staff movement or document history. The appointment record disagrees in the case file.",
              "v": "wrong",
              "fb": "Institutional independence is an empirical condition, not a self-certifying statement."
            },
            {
              "t": "Search for coded messages, while overlooking disclosed relationships and repeated favorable revisions. The dramatic explanation supplies the organizing theory.",
              "v": "danger",
              "fb": "Ordinary documented influence can matter more than speculative secret communication."
            }
          ]
        },
        {
          "q": "What regulatory lesson follows most soundly from the ’sunshine’ railroad commission?",
          "o": [
            {
              "t": "Regulatory independence should reduce informational dependence, concentrated access, and unreviewable discretion in the dated record in the case file.",
              "v": "expert",
              "fb": "Exactly: durable independence is designed into appointments, information, review, and transparency."
            },
            {
              "t": "Replacing one official should cure the problem even when staffing incentives and information channels persist in the operational record in the case file.",
              "v": "partial",
              "fb": "Personnel change helps only when the organizational conditions that shaped the old decisions also change."
            },
            {
              "t": "Technical expertise should guarantee public-minded decisions because knowledgeable boards does not be captured in the operational record in the case file.",
              "v": "wrong",
              "fb": "Expertise can improve judgment and simultaneously increase dependence on the regulated firm."
            },
            {
              "t": "The agency is treated as perfectly neutral or largely controlled by an invisible private network. The preferred narrative sets the order of review.",
              "v": "danger",
              "fb": "Institutions often occupy a documented and correctable middle ground between those absolutes."
            }
          ]
        }
      ]
    },
    "adminprocess": {
      "sci": "James M. Landis (1899-1964)",
      "topic": "The administrative process & its capture",
      "lede": "Influence left an administrative trail in James M. Landis's treatment of the administrative process and its capture.",
      "no": 3,
      "profile": "The public-administration dispatch today considers James M. Landis and the institutional dynamics of the administrative process and its capture. James M. Landis defended expert administrative agencies as necessary for complex economic governance while recognizing the dangers of stagnation and industry influence. Regulators require expertise from the industries they oversee, yet that dependence can reshape appointments, information, standards, and career paths. Landis’s contribution gives language to influence that may be lawful, gradual, and still damaging.\n\nThe practical investigation is to give agencies expertise and flexible authority while preserving review, professional independence, and public accountability. Appointment records, meeting access, draft revisions, revolving employment, information asymmetry, and the distribution of benefits should be traced across time. Capture is not proved by familiarity alone; it appears when the agency’s decisions repeatedly adopt the regulated interest’s priorities without a public justification that survives review.\n\nThis framework avoids two easy stories. Officials need not belong to a secret cabal for an institution to become dependent, and formal hearings do not establish independence simply because every box was checked. Incentives and organizational routines can redirect policy while leaving procedure outwardly intact.\n\nThe institutional lesson is specialization improves regulation only if the regulator remains institutionally separate from the interests it supervises. Oversight works only when expertise is paired with independence, contestability, and records outsiders can inspect. Diffuse beneficiaries often need procedural safeguards because they cannot monitor every technical decision themselves. Rotation and disclosure help only when replacements and reviewers possess genuine authority. Diffuse beneficiaries often need procedural safeguards because they cannot monitor every technical decision themselves.",
      "frame": "Opens the appointment ledger. \"No masks, no midnight oath—just names and incentives. Show me the administrative process and its capture.\"",
      "q": [
        {
          "q": "Which institutional account best reflects James M. Landis’s work on the administrative process and its capture?",
          "o": [
            {
              "t": "James M. Landis made the administrative process and its capture depend on appointments, information flows, incentives, and repeated policy outcomes.",
              "v": "expert",
              "fb": "Correct: capture theory investigates patterned dependence without requiring a cinematic conspiracy."
            },
            {
              "t": "James M. Landis treated the administrative process and its capture as proven by every meeting between a regulator and an industry representative.",
              "v": "partial",
              "fb": "Contact may be necessary for expertise and becomes probative only in a wider institutional pattern."
            },
            {
              "t": "James M. Landis let a formal hearing settle the administrative process and its capture without examining who supplied the decisive assumptions.",
              "v": "wrong",
              "fb": "Procedure can be followed while agendas, information, and revisions remain one-sided."
            },
            {
              "t": "James M. Landis used the administrative process and its capture to describe a secret cabal capable of controlling every agency decision.",
              "v": "danger",
              "fb": "A totalizing cabal claim is harder to test than a documented channel of influence."
            }
          ]
        },
        {
          "q": "Which records review would best implement the method in the profile?",
          "o": [
            {
              "t": "Trace appointments, meetings, draft changes, career movement, analytical inputs, and distributional benefits. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Yes: capture often becomes visible through linked records that show dependency developing over time."
            },
            {
              "t": "Count the public hearings, but ignore who supplied the technical assumptions used in the final order. The missing record is treated as a minor limitation.",
              "v": "partial",
              "fb": "A hearing record is incomplete if the decisive analytical inputs came from elsewhere."
            },
            {
              "t": "Accept the board's declaration of independence without examining staff movement or document history. The appointment record disagrees in the case file.",
              "v": "wrong",
              "fb": "Institutional independence is an empirical condition, not a self-certifying statement."
            },
            {
              "t": "Search for coded messages, while overlooking disclosed relationships and repeated favorable revisions. The dramatic explanation supplies the organizing theory.",
              "v": "danger",
              "fb": "Ordinary documented influence can matter more than speculative secret communication."
            }
          ]
        },
        {
          "q": "What regulatory lesson follows most soundly from the administrative process and its capture?",
          "o": [
            {
              "t": "Regulatory independence should reduce informational dependence, concentrated access, and unreviewable discretion in the dated record in the case file.",
              "v": "expert",
              "fb": "Exactly: durable independence is designed into appointments, information, review, and transparency."
            },
            {
              "t": "Replacing one official should cure the problem even when staffing incentives and information channels persist in the operational record in the case file.",
              "v": "partial",
              "fb": "Personnel change helps only when the organizational conditions that shaped the old decisions also change."
            },
            {
              "t": "Technical expertise should guarantee public-minded decisions because knowledgeable boards does not be captured in the operational record in the case file.",
              "v": "wrong",
              "fb": "Expertise can improve judgment and simultaneously increase dependence on the regulated firm."
            },
            {
              "t": "The agency is treated as perfectly neutral or largely controlled by an invisible private network. The preferred narrative sets the order of review.",
              "v": "danger",
              "fb": "Institutions often occupy a documented and correctable middle ground between those absolutes."
            }
          ]
        }
      ]
    },
    "railhistory": {
      "sci": "Gabriel Kolko (1932-2014)",
      "topic": "The political history of rail regulation",
      "lede": "Gabriel Kolko located the political history of rail regulation in appointments, information dependence, and routine institutional incentives.",
      "no": 4,
      "profile": "The public-administration dispatch today considers Gabriel Kolko and the institutional dynamics of the political history of rail regulation. Gabriel Kolko argued that major railroads and other businesses sometimes supported federal regulation to stabilize markets and restrain disruptive competition. Regulators require expertise from the industries they oversee, yet that dependence can reshape appointments, information, standards, and career paths. Kolko’s contribution gives language to influence that may be lawful, gradual, and still damaging.\n\nThe practical investigation is to investigate who demanded regulation, what market problems they sought to solve, and which rules advantaged established firms. Appointment records, meeting access, draft revisions, revolving employment, information asymmetry, and the distribution of benefits should be traced across time. Capture is not proved by familiarity alone; it appears when the agency’s decisions repeatedly adopt the regulated interest’s priorities without a public justification that survives review.\n\nThis framework avoids two easy stories. Officials need not belong to a secret cabal for an institution to become dependent, and formal hearings do not establish independence simply because every box was checked. Incentives and organizational routines can redirect policy while leaving procedure outwardly intact.\n\nThe institutional lesson is business support for regulation can reflect a desire for order as well as a willingness to accept public restraint. Oversight works only when expertise is paired with independence, contestability, and records outsiders can inspect. Diffuse beneficiaries often need procedural safeguards because they cannot monitor every technical decision themselves. Rotation and disclosure help only when replacements and reviewers possess genuine authority. Diffuse beneficiaries often need procedural safeguards because they cannot monitor every technical decision themselves.",
      "frame": "Lays two nearly identical draft orders side by side. \"At The Utility's Head Office, influence edits in small increments. Explain the political history of rail regulation.\"",
      "q": [
        {
          "q": "Which institutional account best reflects Gabriel Kolko’s work on the political history of rail regulation?",
          "o": [
            {
              "t": "Gabriel Kolko made the political history of rail regulation depend on appointments, information flows, incentives, and repeated policy outcomes.",
              "v": "expert",
              "fb": "Correct: capture theory investigates patterned dependence without requiring a cinematic conspiracy."
            },
            {
              "t": "Gabriel Kolko treated the political history of rail regulation as proven by every meeting between a regulator and an industry representative.",
              "v": "partial",
              "fb": "Contact may be necessary for expertise and becomes probative only in a wider institutional pattern."
            },
            {
              "t": "Gabriel Kolko let a formal hearing settle the political history of rail regulation without examining who supplied the decisive assumptions.",
              "v": "wrong",
              "fb": "Procedure can be followed while agendas, information, and revisions remain one-sided."
            },
            {
              "t": "Gabriel Kolko used the political history of rail regulation to describe a secret cabal capable of controlling every agency decision.",
              "v": "danger",
              "fb": "A totalizing cabal claim is harder to test than a documented channel of influence."
            }
          ]
        },
        {
          "q": "Which records review would best implement the method in the profile?",
          "o": [
            {
              "t": "Trace appointments, meetings, draft changes, career movement, analytical inputs, and distributional benefits. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Yes: capture often becomes visible through linked records that show dependency developing over time."
            },
            {
              "t": "Count the public hearings, but ignore who supplied the technical assumptions used in the final order. The missing record is treated as a minor limitation.",
              "v": "partial",
              "fb": "A hearing record is incomplete if the decisive analytical inputs came from elsewhere."
            },
            {
              "t": "Accept the board's declaration of independence without examining staff movement or document history. The appointment record disagrees in the case file.",
              "v": "wrong",
              "fb": "Institutional independence is an empirical condition, not a self-certifying statement."
            },
            {
              "t": "Search for coded messages, while overlooking disclosed relationships and repeated favorable revisions. The dramatic explanation supplies the organizing theory.",
              "v": "danger",
              "fb": "Ordinary documented influence can matter more than speculative secret communication."
            }
          ]
        },
        {
          "q": "What regulatory lesson follows most soundly from the political history of rail regulation?",
          "o": [
            {
              "t": "Regulatory independence should reduce informational dependence, concentrated access, and unreviewable discretion in the dated record in the case file.",
              "v": "expert",
              "fb": "Exactly: durable independence is designed into appointments, information, review, and transparency."
            },
            {
              "t": "Replacing one official should cure the problem even when staffing incentives and information channels persist in the operational record in the case file.",
              "v": "partial",
              "fb": "Personnel change helps only when the organizational conditions that shaped the old decisions also change."
            },
            {
              "t": "Technical expertise should guarantee public-minded decisions because knowledgeable boards does not be captured in the operational record in the case file.",
              "v": "wrong",
              "fb": "Expertise can improve judgment and simultaneously increase dependence on the regulated firm."
            },
            {
              "t": "The agency is treated as perfectly neutral or largely controlled by an invisible private network. The preferred narrative sets the order of review.",
              "v": "danger",
              "fb": "Institutions often occupy a documented and correctable middle ground between those absolutes."
            }
          ]
        }
      ]
    },
    "fcc": {
      "sci": "Ronald Coase (1910-2013)",
      "topic": "The FCC & the case for markets",
      "lede": "Ronald Coase made the fcc and the case for markets a question about who supplies expertise and who shapes the final rule.",
      "no": 5,
      "profile": "The public-administration dispatch today considers Ronald Coase and the institutional dynamics of the fcc and the case for markets. Ronald Coase criticized administrative allocation of radio spectrum and argued that clearly defined, transferable rights could use prices to coordinate competing uses. Regulators require expertise from the industries they oversee, yet that dependence can reshape appointments, information, standards, and career paths. Coase’s contribution gives language to influence that may be lawful, gradual, and still damaging.\n\nThe practical investigation is to compare administrative assignment with market and hybrid mechanisms while accounting for transaction costs and interference. Appointment records, meeting access, draft revisions, revolving employment, information asymmetry, and the distribution of benefits should be traced across time. Capture is not proved by familiarity alone; it appears when the agency’s decisions repeatedly adopt the regulated interest’s priorities without a public justification that survives review.\n\nThis framework avoids two easy stories. Officials need not belong to a secret cabal for an institution to become dependent, and formal hearings do not establish independence simply because every box was checked. Incentives and organizational routines can redirect policy while leaving procedure outwardly intact.\n\nThe institutional lesson is scarcity must be governed somehow, and the best institution depends on information and bargaining costs. Oversight works only when expertise is paired with independence, contestability, and records outsiders can inspect. Diffuse beneficiaries often need procedural safeguards because they cannot monitor every technical decision themselves. Rotation and disclosure help only when replacements and reviewers possess genuine authority. Diffuse beneficiaries often need procedural safeguards because they cannot monitor every technical decision themselves.",
      "frame": "Points to a revision in another hand. \"Procedure can remain intact while purpose bends. Start with the fcc and the case for markets.\"",
      "q": [
        {
          "q": "Which institutional account best reflects Ronald Coase’s work on the fcc and the case for markets?",
          "o": [
            {
              "t": "Ronald Coase made the fcc and the case for markets depend on appointments, information flows, incentives, and repeated policy outcomes.",
              "v": "expert",
              "fb": "Correct: capture theory investigates patterned dependence without requiring a cinematic conspiracy."
            },
            {
              "t": "Ronald Coase treated the fcc and the case for markets as proven by every meeting between a regulator and an industry representative.",
              "v": "partial",
              "fb": "Contact may be necessary for expertise and becomes probative only in a wider institutional pattern."
            },
            {
              "t": "Ronald Coase let a formal hearing settle the fcc and the case for markets without examining who supplied the decisive assumptions.",
              "v": "wrong",
              "fb": "Procedure can be followed while agendas, information, and revisions remain one-sided."
            },
            {
              "t": "Ronald Coase used the fcc and the case for markets to describe a secret cabal capable of controlling every agency decision.",
              "v": "danger",
              "fb": "A totalizing cabal claim is harder to test than a documented channel of influence."
            }
          ]
        },
        {
          "q": "Which records review would best implement the method in the profile?",
          "o": [
            {
              "t": "Trace appointments, meetings, draft changes, career movement, analytical inputs, and distributional benefits. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Yes: capture often becomes visible through linked records that show dependency developing over time."
            },
            {
              "t": "Count the public hearings, but ignore who supplied the technical assumptions used in the final order. The missing record is treated as a minor limitation.",
              "v": "partial",
              "fb": "A hearing record is incomplete if the decisive analytical inputs came from elsewhere."
            },
            {
              "t": "Accept the board's declaration of independence without examining staff movement or document history. The appointment record disagrees in the case file.",
              "v": "wrong",
              "fb": "Institutional independence is an empirical condition, not a self-certifying statement."
            },
            {
              "t": "Search for coded messages, while overlooking disclosed relationships and repeated favorable revisions. The dramatic explanation supplies the organizing theory.",
              "v": "danger",
              "fb": "Ordinary documented influence can matter more than speculative secret communication."
            }
          ]
        },
        {
          "q": "What regulatory lesson follows most soundly from the fcc and the case for markets?",
          "o": [
            {
              "t": "Regulatory independence should reduce informational dependence, concentrated access, and unreviewable discretion in the dated record in the case file.",
              "v": "expert",
              "fb": "Exactly: durable independence is designed into appointments, information, review, and transparency."
            },
            {
              "t": "Replacing one official should cure the problem even when staffing incentives and information channels persist in the operational record in the case file.",
              "v": "partial",
              "fb": "Personnel change helps only when the organizational conditions that shaped the old decisions also change."
            },
            {
              "t": "Technical expertise should guarantee public-minded decisions because knowledgeable boards does not be captured in the operational record in the case file.",
              "v": "wrong",
              "fb": "Expertise can improve judgment and simultaneously increase dependence on the regulated firm."
            },
            {
              "t": "The agency is treated as perfectly neutral or largely controlled by an invisible private network. The preferred narrative sets the order of review.",
              "v": "danger",
              "fb": "Institutions often occupy a documented and correctable middle ground between those absolutes."
            }
          ]
        }
      ]
    },
    "collective": {
      "sci": "Mancur Olson (1932-1998)",
      "topic": "The logic of concentrated interests",
      "lede": "Influence left an administrative trail in Mancur Olson's treatment of the logic of concentrated interests.",
      "no": 6,
      "profile": "The public-administration dispatch today considers Mancur Olson and the institutional dynamics of the logic of concentrated interests. Mancur Olson explained why small groups with concentrated benefits often organize more effectively than large publics with diffuse individual stakes. Regulators require expertise from the industries they oversee, yet that dependence can reshape appointments, information, standards, and career paths. Olson’s contribution gives language to influence that may be lawful, gradual, and still damaging.\n\nThe practical investigation is to compare group size, per-person benefit, monitoring, selective incentives, and the cost of collective action. Appointment records, meeting access, draft revisions, revolving employment, information asymmetry, and the distribution of benefits should be traced across time. Capture is not proved by familiarity alone; it appears when the agency’s decisions repeatedly adopt the regulated interest’s priorities without a public justification that survives review.\n\nThis framework avoids two easy stories. Officials need not belong to a secret cabal for an institution to become dependent, and formal hearings do not establish independence simply because every box was checked. Incentives and organizational routines can redirect policy while leaving procedure outwardly intact.\n\nThe institutional lesson is a broad public interest can lose politically even when its total stake exceeds the industry's. Oversight works only when expertise is paired with independence, contestability, and records outsiders can inspect. Diffuse beneficiaries often need procedural safeguards because they cannot monitor every technical decision themselves. Rotation and disclosure help only when replacements and reviewers possess genuine authority. Diffuse beneficiaries often need procedural safeguards because they cannot monitor every technical decision themselves.",
      "frame": "Opens the appointment ledger. \"No masks, no midnight oath—just names and incentives. Show me the logic of concentrated interests.\"",
      "q": [
        {
          "q": "Which institutional account best reflects Mancur Olson’s work on the logic of concentrated interests?",
          "o": [
            {
              "t": "Mancur Olson made the logic of concentrated interests depend on appointments, information flows, incentives, and repeated policy outcomes.",
              "v": "expert",
              "fb": "Correct: capture theory investigates patterned dependence without requiring a cinematic conspiracy."
            },
            {
              "t": "Mancur Olson treated the logic of concentrated interests as proven by every meeting between a regulator and an industry representative.",
              "v": "partial",
              "fb": "Contact may be necessary for expertise and becomes probative only in a wider institutional pattern."
            },
            {
              "t": "Mancur Olson let a formal hearing settle the logic of concentrated interests without examining who supplied the decisive assumptions.",
              "v": "wrong",
              "fb": "Procedure can be followed while agendas, information, and revisions remain one-sided."
            },
            {
              "t": "Mancur Olson used the logic of concentrated interests to describe a secret cabal capable of controlling every agency decision.",
              "v": "danger",
              "fb": "A totalizing cabal claim is harder to test than a documented channel of influence."
            }
          ]
        },
        {
          "q": "Which records review would best implement the method in the profile?",
          "o": [
            {
              "t": "Trace appointments, meetings, draft changes, career movement, analytical inputs, and distributional benefits. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Yes: capture often becomes visible through linked records that show dependency developing over time."
            },
            {
              "t": "Count the public hearings, but ignore who supplied the technical assumptions used in the final order. The missing record is treated as a minor limitation.",
              "v": "partial",
              "fb": "A hearing record is incomplete if the decisive analytical inputs came from elsewhere."
            },
            {
              "t": "Accept the board's declaration of independence without examining staff movement or document history. The appointment record disagrees in the case file.",
              "v": "wrong",
              "fb": "Institutional independence is an empirical condition, not a self-certifying statement."
            },
            {
              "t": "Search for coded messages, while overlooking disclosed relationships and repeated favorable revisions. The dramatic explanation supplies the organizing theory.",
              "v": "danger",
              "fb": "Ordinary documented influence can matter more than speculative secret communication."
            }
          ]
        },
        {
          "q": "What regulatory lesson follows most soundly from the logic of concentrated interests?",
          "o": [
            {
              "t": "Regulatory independence should reduce informational dependence, concentrated access, and unreviewable discretion in the dated record in the case file.",
              "v": "expert",
              "fb": "Exactly: durable independence is designed into appointments, information, review, and transparency."
            },
            {
              "t": "Replacing one official should cure the problem even when staffing incentives and information channels persist in the operational record in the case file.",
              "v": "partial",
              "fb": "Personnel change helps only when the organizational conditions that shaped the old decisions also change."
            },
            {
              "t": "Technical expertise should guarantee public-minded decisions because knowledgeable boards does not be captured in the operational record in the case file.",
              "v": "wrong",
              "fb": "Expertise can improve judgment and simultaneously increase dependence on the regulated firm."
            },
            {
              "t": "The agency is treated as perfectly neutral or largely controlled by an invisible private network. The preferred narrative sets the order of review.",
              "v": "danger",
              "fb": "Institutions often occupy a documented and correctable middle ground between those absolutes."
            }
          ]
        }
      ]
    },
    "rentseeking": {
      "sci": "Gordon Tullock (1922-2014)",
      "topic": "Rent-seeking",
      "lede": "Gordon Tullock located rent-seeking in appointments, information dependence, and routine institutional incentives.",
      "no": 7,
      "profile": "The public-administration dispatch today considers Gordon Tullock and the institutional dynamics of rent-seeking. Gordon Tullock analyzed resources spent to obtain transfers, privileges, or protection through political influence rather than productive activity. Regulators require expertise from the industries they oversee, yet that dependence can reshape appointments, information, standards, and career paths. Tullock’s contribution gives language to influence that may be lawful, gradual, and still damaging.\n\nThe practical investigation is to count lobbying, delay, strategic compliance, and defensive expenditure as social costs surrounding valuable privileges. Appointment records, meeting access, draft revisions, revolving employment, information asymmetry, and the distribution of benefits should be traced across time. Capture is not proved by familiarity alone; it appears when the agency’s decisions repeatedly adopt the regulated interest’s priorities without a public justification that survives review.\n\nThis framework avoids two easy stories. Officials need not belong to a secret cabal for an institution to become dependent, and formal hearings do not establish independence simply because every box was checked. Incentives and organizational routines can redirect policy while leaving procedure outwardly intact.\n\nThe institutional lesson is the cost of a favorable rule includes the contest to obtain and preserve it. Oversight works only when expertise is paired with independence, contestability, and records outsiders can inspect. Diffuse beneficiaries often need procedural safeguards because they cannot monitor every technical decision themselves. Rotation and disclosure help only when replacements and reviewers possess genuine authority. Diffuse beneficiaries often need procedural safeguards because they cannot monitor every technical decision themselves. Rotation and disclosure help only when replacements and reviewers possess genuine authority.",
      "frame": "Lays two nearly identical draft orders side by side. \"At The Oversight Board's Records, influence edits in small increments. Explain rent-seeking.\"",
      "q": [
        {
          "q": "Which institutional account best reflects Gordon Tullock’s work on rent-seeking?",
          "o": [
            {
              "t": "Gordon Tullock made rent-seeking depend on appointments, information flows, incentives, and repeated policy outcomes.",
              "v": "expert",
              "fb": "Correct: capture theory investigates patterned dependence without requiring a cinematic conspiracy."
            },
            {
              "t": "Gordon Tullock treated rent-seeking as proven by every meeting between a regulator and an industry representative.",
              "v": "partial",
              "fb": "Contact may be necessary for expertise and becomes probative only in a wider institutional pattern."
            },
            {
              "t": "Gordon Tullock let a formal hearing settle rent-seeking without examining who supplied the decisive assumptions.",
              "v": "wrong",
              "fb": "Procedure can be followed while agendas, information, and revisions remain one-sided."
            },
            {
              "t": "Gordon Tullock used rent-seeking to describe a secret cabal capable of controlling every agency decision.",
              "v": "danger",
              "fb": "A totalizing cabal claim is harder to test than a documented channel of influence."
            }
          ]
        },
        {
          "q": "Which records review would best implement the method in the profile?",
          "o": [
            {
              "t": "Trace appointments, meetings, draft changes, career movement, analytical inputs, and distributional benefits. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Yes: capture often becomes visible through linked records that show dependency developing over time."
            },
            {
              "t": "Count the public hearings, but ignore who supplied the technical assumptions used in the final order. The missing record is treated as a minor limitation.",
              "v": "partial",
              "fb": "A hearing record is incomplete if the decisive analytical inputs came from elsewhere."
            },
            {
              "t": "Accept the board's declaration of independence without examining staff movement or document history. The appointment record disagrees in the case file.",
              "v": "wrong",
              "fb": "Institutional independence is an empirical condition, not a self-certifying statement."
            },
            {
              "t": "Search for coded messages, while overlooking disclosed relationships and repeated favorable revisions. The dramatic explanation supplies the organizing theory.",
              "v": "danger",
              "fb": "Ordinary documented influence can matter more than speculative secret communication."
            }
          ]
        },
        {
          "q": "What regulatory lesson follows most soundly from rent-seeking?",
          "o": [
            {
              "t": "Regulatory independence should reduce informational dependence, concentrated access, and unreviewable discretion in the dated record in the case file.",
              "v": "expert",
              "fb": "Exactly: durable independence is designed into appointments, information, review, and transparency."
            },
            {
              "t": "Replacing one official should cure the problem even when staffing incentives and information channels persist in the operational record in the case file.",
              "v": "partial",
              "fb": "Personnel change helps only when the organizational conditions that shaped the old decisions also change."
            },
            {
              "t": "Technical expertise should guarantee public-minded decisions because knowledgeable boards does not be captured in the operational record in the case file.",
              "v": "wrong",
              "fb": "Expertise can improve judgment and simultaneously increase dependence on the regulated firm."
            },
            {
              "t": "The agency is treated as perfectly neutral or largely controlled by an invisible private network. The preferred narrative sets the order of review.",
              "v": "danger",
              "fb": "Institutions often occupy a documented and correctable middle ground between those absolutes."
            }
          ]
        }
      ]
    },
    "pricing": {
      "sci": "Richard Posner (b. 1939)",
      "topic": "The pricing of regulation",
      "lede": "Richard Posner made the pricing of regulation a question about who supplies expertise and who shapes the final rule.",
      "no": 8,
      "profile": "The public-administration dispatch today considers Richard Posner and the institutional dynamics of the pricing of regulation. Richard Posner analyzed regulation through economic incentives and explored how monopoly rents and political allocation can shape regulated industries. Regulators require expertise from the industries they oversee, yet that dependence can reshape appointments, information, standards, and career paths. Posner’s contribution gives language to influence that may be lawful, gradual, and still damaging.\n\nThe practical investigation is to identify who receives regulatory rents, how rules restrict entry or pricing, and what institutional costs accompany them. Appointment records, meeting access, draft revisions, revolving employment, information asymmetry, and the distribution of benefits should be traced across time. Capture is not proved by familiarity alone; it appears when the agency’s decisions repeatedly adopt the regulated interest’s priorities without a public justification that survives review.\n\nThis framework avoids two easy stories. Officials need not belong to a secret cabal for an institution to become dependent, and formal hearings do not establish independence simply because every box was checked. Incentives and organizational routines can redirect policy while leaving procedure outwardly intact.\n\nThe institutional lesson is a regulated price can embody political exchange as well as a technical cost calculation. Oversight works only when expertise is paired with independence, contestability, and records outsiders can inspect. Diffuse beneficiaries often need procedural safeguards because they cannot monitor every technical decision themselves. Rotation and disclosure help only when replacements and reviewers possess genuine authority. Diffuse beneficiaries often need procedural safeguards because they cannot monitor every technical decision themselves.",
      "frame": "Points to a revision in another hand. \"Procedure can remain intact while purpose bends. Start with the pricing of regulation.\"",
      "q": [
        {
          "q": "Which institutional account best reflects Richard Posner’s work on the pricing of regulation?",
          "o": [
            {
              "t": "Richard Posner made the pricing of regulation depend on appointments, information flows, incentives, and repeated policy outcomes.",
              "v": "expert",
              "fb": "Correct: capture theory investigates patterned dependence without requiring a cinematic conspiracy."
            },
            {
              "t": "Richard Posner treated the pricing of regulation as proven by every meeting between a regulator and an industry representative.",
              "v": "partial",
              "fb": "Contact may be necessary for expertise and becomes probative only in a wider institutional pattern."
            },
            {
              "t": "Richard Posner let a formal hearing settle the pricing of regulation without examining who supplied the decisive assumptions.",
              "v": "wrong",
              "fb": "Procedure can be followed while agendas, information, and revisions remain one-sided."
            },
            {
              "t": "Richard Posner used the pricing of regulation to describe a secret cabal capable of controlling every agency decision.",
              "v": "danger",
              "fb": "A totalizing cabal claim is harder to test than a documented channel of influence."
            }
          ]
        },
        {
          "q": "Which records review would best implement the method in the profile?",
          "o": [
            {
              "t": "Trace appointments, meetings, draft changes, career movement, analytical inputs, and distributional benefits. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Yes: capture often becomes visible through linked records that show dependency developing over time."
            },
            {
              "t": "Count the public hearings, but ignore who supplied the technical assumptions used in the final order. The missing record is treated as a minor limitation.",
              "v": "partial",
              "fb": "A hearing record is incomplete if the decisive analytical inputs came from elsewhere."
            },
            {
              "t": "Accept the board's declaration of independence without examining staff movement or document history. The appointment record disagrees in the case file.",
              "v": "wrong",
              "fb": "Institutional independence is an empirical condition, not a self-certifying statement."
            },
            {
              "t": "Search for coded messages, while overlooking disclosed relationships and repeated favorable revisions. The dramatic explanation supplies the organizing theory.",
              "v": "danger",
              "fb": "Ordinary documented influence can matter more than speculative secret communication."
            }
          ]
        },
        {
          "q": "What regulatory lesson follows most soundly from the pricing of regulation?",
          "o": [
            {
              "t": "Regulatory independence should reduce informational dependence, concentrated access, and unreviewable discretion in the dated record in the case file.",
              "v": "expert",
              "fb": "Exactly: durable independence is designed into appointments, information, review, and transparency."
            },
            {
              "t": "Replacing one official should cure the problem even when staffing incentives and information channels persist in the operational record in the case file.",
              "v": "partial",
              "fb": "Personnel change helps only when the organizational conditions that shaped the old decisions also change."
            },
            {
              "t": "Technical expertise should guarantee public-minded decisions because knowledgeable boards does not be captured in the operational record in the case file.",
              "v": "wrong",
              "fb": "Expertise can improve judgment and simultaneously increase dependence on the regulated firm."
            },
            {
              "t": "The agency is treated as perfectly neutral or largely controlled by an invisible private network. The preferred narrative sets the order of review.",
              "v": "danger",
              "fb": "Institutions often occupy a documented and correctable middle ground between those absolutes."
            }
          ]
        }
      ]
    },
    "moderncapture": {
      "sci": "Jean Tirole (b. 1953)",
      "topic": "The modern theory of regulatory capture",
      "lede": "Influence left an administrative trail in Jean Tirole's treatment of the modern theory of regulatory capture.",
      "no": 9,
      "profile": "The public-administration dispatch today considers Jean Tirole and the institutional dynamics of the modern theory of regulatory capture. Jean Tirole developed models of regulation under asymmetric information, including the risk that supervisors and firms collude or that incentives distort reporting. Regulators require expertise from the industries they oversee, yet that dependence can reshape appointments, information, standards, and career paths. Tirole’s contribution gives language to influence that may be lawful, gradual, and still damaging.\n\nThe practical investigation is to design contracts, audits, rotation, transparency, and review to limit informational dependence and side agreements. Appointment records, meeting access, draft revisions, revolving employment, information asymmetry, and the distribution of benefits should be traced across time. Capture is not proved by familiarity alone; it appears when the agency’s decisions repeatedly adopt the regulated interest’s priorities without a public justification that survives review.\n\nThis framework avoids two easy stories. Officials need not belong to a secret cabal for an institution to become dependent, and formal hearings do not establish independence simply because every box was checked. Incentives and organizational routines can redirect policy while leaving procedure outwardly intact.\n\nThe institutional lesson is capture prevention requires mechanisms that remain effective when the firm knows more than the regulator. Oversight works only when expertise is paired with independence, contestability, and records outsiders can inspect. Diffuse beneficiaries often need procedural safeguards because they cannot monitor every technical decision themselves. Rotation and disclosure help only when replacements and reviewers possess genuine authority. Diffuse beneficiaries often need procedural safeguards because they cannot monitor every technical decision themselves.",
      "frame": "Opens the appointment ledger. \"No masks, no midnight oath—just names and incentives. Show me the modern theory of regulatory capture.\"",
      "q": [
        {
          "q": "Which institutional account best reflects Jean Tirole’s work on the modern theory of regulatory capture?",
          "o": [
            {
              "t": "Jean Tirole made the modern theory of regulatory capture depend on appointments, information flows, incentives, and repeated policy outcomes.",
              "v": "expert",
              "fb": "Correct: capture theory investigates patterned dependence without requiring a cinematic conspiracy."
            },
            {
              "t": "Jean Tirole treated the modern theory of regulatory capture as proven by every meeting between a regulator and an industry representative.",
              "v": "partial",
              "fb": "Contact may be necessary for expertise and becomes probative only in a wider institutional pattern."
            },
            {
              "t": "Jean Tirole let a formal hearing settle the modern theory of regulatory capture without examining who supplied the decisive assumptions.",
              "v": "wrong",
              "fb": "Procedure can be followed while agendas, information, and revisions remain one-sided."
            },
            {
              "t": "Jean Tirole used the modern theory of regulatory capture to describe a secret cabal capable of controlling every agency decision.",
              "v": "danger",
              "fb": "A totalizing cabal claim is harder to test than a documented channel of influence."
            }
          ]
        },
        {
          "q": "Which records review would best implement the method in the profile?",
          "o": [
            {
              "t": "Trace appointments, meetings, draft changes, career movement, analytical inputs, and distributional benefits. It remains checkable in the case file.",
              "v": "expert",
              "fb": "Yes: capture often becomes visible through linked records that show dependency developing over time."
            },
            {
              "t": "Count the public hearings, but ignore who supplied the technical assumptions used in the final order. The missing record is treated as a minor limitation.",
              "v": "partial",
              "fb": "A hearing record is incomplete if the decisive analytical inputs came from elsewhere."
            },
            {
              "t": "Accept the board's declaration of independence without examining staff movement or document history. The appointment record disagrees in the case file.",
              "v": "wrong",
              "fb": "Institutional independence is an empirical condition, not a self-certifying statement."
            },
            {
              "t": "Search for coded messages, while overlooking disclosed relationships and repeated favorable revisions. The dramatic explanation supplies the organizing theory.",
              "v": "danger",
              "fb": "Ordinary documented influence can matter more than speculative secret communication."
            }
          ]
        },
        {
          "q": "What regulatory lesson follows most soundly from the modern theory of regulatory capture?",
          "o": [
            {
              "t": "Regulatory independence should reduce informational dependence, concentrated access, and unreviewable discretion in the dated record in the case file.",
              "v": "expert",
              "fb": "Exactly: durable independence is designed into appointments, information, review, and transparency."
            },
            {
              "t": "Replacing one official should cure the problem even when staffing incentives and information channels persist in the operational record in the case file.",
              "v": "partial",
              "fb": "Personnel change helps only when the organizational conditions that shaped the old decisions also change."
            },
            {
              "t": "Technical expertise should guarantee public-minded decisions because knowledgeable boards does not be captured in the operational record in the case file.",
              "v": "wrong",
              "fb": "Expertise can improve judgment and simultaneously increase dependence on the regulated firm."
            },
            {
              "t": "The agency is treated as perfectly neutral or largely controlled by an invisible private network. The preferred narrative sets the order of review.",
              "v": "danger",
              "fb": "Institutions often occupy a documented and correctable middle ground between those absolutes."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "analyst": {
      "ratehearing": "Staff Analyst Devi Rao receives you at the rate-hearing chamber with appointment forms stacked above failed-equipment reports. \"Runs the rate models; her adverse findings kept getting revised upward. The influence is visible in résumés, revisions, and money that never reached the lines.\"",
      "utilityhq": "Staff Analyst Devi Rao receives you at the utility's head office with appointment forms stacked above failed-equipment reports. \"Runs the rate models; her adverse findings kept getting revised upward. The influence is visible in résumés, revisions, and money that never reached the lines.\"",
      "boardfiles": "Staff Analyst Devi Rao receives you at the oversight board's records with appointment forms stacked above failed-equipment reports. \"Runs the rate models; her adverse findings kept getting revised upward. The influence is visible in résumés, revisions, and money that never reached the lines.\""
    },
    "clerk": {
      "ratehearing": "The Records Clerk receives you at the rate-hearing chamber with appointment forms stacked above failed-equipment reports. \"Keeps the appointment files — and the résumés that all trace to one firm. The influence is visible in résumés, revisions, and money that never reached the lines.\"",
      "utilityhq": "The Records Clerk receives you at the utility's head office with appointment forms stacked above failed-equipment reports. \"Keeps the appointment files — and the résumés that all trace to one firm. The influence is visible in résumés, revisions, and money that never reached the lines.\"",
      "boardfiles": "The Records Clerk receives you at the oversight board's records with appointment forms stacked above failed-equipment reports. \"Keeps the appointment files — and the résumés that all trace to one firm. The influence is visible in résumés, revisions, and money that never reached the lines.\""
    },
    "lineworker": {
      "ratehearing": "Lineworker Hobbs receives you at the rate-hearing chamber with appointment forms stacked above failed-equipment reports. \"Patches the failing grid the rate money never seems to reach. The influence is visible in résumés, revisions, and money that never reached the lines.\"",
      "utilityhq": "Lineworker Hobbs receives you at the utility's head office with appointment forms stacked above failed-equipment reports. \"Patches the failing grid the rate money never seems to reach. The influence is visible in résumés, revisions, and money that never reached the lines.\"",
      "boardfiles": "Lineworker Hobbs receives you at the oversight board's records with appointment forms stacked above failed-equipment reports. \"Patches the failing grid the rate money never seems to reach. The influence is visible in résumés, revisions, and money that never reached the lines.\""
    }
  },
  "story": [
    "<b>The Halcyon Grid</b> opens inside the Halcyon utility oversight inquiry, where the public explanation has hardened faster than the evidence.",
    "<b>Staff Analyst Devi Rao</b>, <b>The Records Clerk</b>, and <b>Lineworker Hobbs</b> hold different parts of the record, and every conversation begins with one real figure whose work teaches you how to read it.",
    "The case keeps pulling investigators toward <b>A shadowy cabal secretly runs the grid</b> or <b>Nothing amiss — ordinary regulation at work</b>. Both are plausible enough to survive a headline; neither should survive the full dossier untested.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide the <b>WHAT</b> for yourself."
  ],
  "endings": {
    "overclaimWhat": "cabal",
    "dismissalWhat": "normal",
    "win": {
      "expertTitle": "The Regulator Was Staffed From the Firm",
      "expert": [
        "You identify <b>Regina Poll — the oversight board chair</b>, locate the appointment and revision trail in <b>The Oversight Board's Records</b>, and establish <b>The firm staffed & steered its own regulator</b>. Not a shadowy cabal secretly runs the grid. Not nothing amiss — ordinary regulation at work.",
        "The pattern is institutional rather than mystical: personnel came from Halcyon, contrary analyses were rewritten, and rate decisions followed company priorities without a defensible public account."
      ],
      "soundTitle": "Capture Documented",
      "sound": [
        "Your conclusion correctly combines <b>Regina Poll — the oversight board chair</b>, <b>The Oversight Board's Records</b>, and <b>The firm staffed & steered its own regulator</b>. The résumés, meetings, and draft history demonstrate dependence.",
        "Some informal contacts remain outside the record, but the finding does not need them. The documented staffing and steering are sufficient for reform and recusal."
      ],
      "namedTitle": "The Oversight Loop",
      "named": [
        "You correctly name <b>Regina Poll — the oversight board chair</b>, <b>The Oversight Board's Records</b>, and <b>The firm staffed & steered its own regulator</b>.",
        "The explanation is brief, yet it fixes attention on the appointment power and document revisions that can support a complete institutional remedy."
      ]
    },
    "overclaim": {
      "title": "A Clandestine Cabal Hides the Visible Record",
      "body": [
        "You announce <b>A shadowy cabal secretly runs the grid</b>, replacing traceable employment and policy channels with an invisible organization that supposedly controls everything.",
        "The flourish makes ordinary documentary proof seem inadequate and invites ridicule. A captured board becomes harder to reform when described as supernatural power."
      ]
    },
    "dismissal": {
      "title": "Procedure Without Independence",
      "body": [
        "You choose <b>Nothing amiss — ordinary regulation at work</b>, treating hearings and signatures as proof that the commission reached its decisions autonomously.",
        "That formalism ignores who staffed the board, supplied assumptions, and revised conclusions. Ratepayers continue financing a grid whose overseer answers to the firm it reviews."
      ]
    },
    "wrongNames": {
      "title": "Capture Located, Chair Misidentified",
      "body": [
        "You establish <b>The firm staffed & steered its own regulator</b>, but assign the steering to the wrong official or search outside the board records for its culmination. The appointment authority leads instead to"
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A regulatory hearing desk and a revolving door\"><path d=\"M48 92 L260 92 L260 112 L48 112 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><circle cx=\"154\" cy=\"56\" r=\"20\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M154 76 L154 92\" stroke=\"#121212\" stroke-width=\"1.5\"/><circle cx=\"456\" cy=\"70\" r=\"42\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/><path d=\"M456 28 L456 112 M414 70 L498 70\" stroke=\"#326891\" stroke-width=\"1.8\"/><path d=\"M518 42 C562 48,584 68,600 96\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2.2\"/><path d=\"M590 88 L602 98 L586 102\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2\"/></svg>"
}};
