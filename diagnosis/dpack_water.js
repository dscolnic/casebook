// Diagnosis data pack — clean non-overlapping schematic edition.
module.exports = { PACK: {
  "id": "water",
  "title": "Clear Water",
  "domain": "Drinking-water treatment",
  "role": "You are the treatment-plant operator on duty.",
  "intro": {
    "title": "How this system works",
    "lead": "Drinking-water plants remove particles and microbes in stages. Chemicals first help tiny particles clump together, settling removes the largest floc, filters capture what remains, and disinfection protects the finished water. A problem in one stage changes the burden on every stage downstream.",
    "cards": [
      {
        "title": "How treatment works",
        "body": "Raw water enters rapid mix and flocculation, where coagulant neutralizes particle charge. Floc settles, then granular filters remove the remaining particles before disinfection."
      },
      {
        "title": "How problems propagate",
        "body": "A storm can increase raw-water turbidity, weak coagulation can send poor settled water to every filter, and one damaged filter can release particles even when upstream treatment is healthy."
      },
      {
        "title": "What the instruments measure",
        "body": "Turbidimeters estimate light scattering, particle counters track particle numbers, head-loss gauges show resistance through a filter, and grab samples provide an independent laboratory check."
      },
      {
        "title": "Why false alarms happen",
        "body": "A fouled optical window can report high turbidity without real particles. Backwashing also creates a short, expected disturbance, so operators compare parallel filters and independent samples."
      }
    ],
    "takeaway": "The loud reading gets your attention, but the right explanation is the one that fits the whole panel."
  },
  "system": {
    "parts": [
      [
        "Coagulation and flocculation",
        "Coagulant helps fine suspended particles join into larger floc."
      ],
      [
        "Sedimentation",
        "Settled floc is removed before the water reaches the filters."
      ],
      [
        "Granular filters",
        "Each filter removes the particles left after settling; head loss rises as solids accumulate."
      ],
      [
        "Online analyzers",
        "Continuous turbidity and particle instruments watch each treatment stage."
      ],
      [
        "Independent checks",
        "Grab samples and parallel filters show whether a signal is real and whether it is local or plant-wide."
      ]
    ],
    "soWrong": "A high filter-turbidity reading can come from poor coagulation, one failing filter, a raw-water pulse, or a dirty analyzer. The pattern across treatment stages shows where the particles entered."
  },
  "salient": [
    "settled",
    "filter"
  ],
  "readings": {
    "settled": {
      "name": "Settled-water turbidity",
      "purpose": "Measures particles leaving sedimentation. High values mean the filters are receiving an unusually heavy particle load, but do not identify whether raw water or coagulation caused it.",
      "pin": {
        "x": 225,
        "y": 35
      },
      "zone": "clarification"
    },
    "filter": {
      "name": "Filter-effluent turbidity",
      "purpose": "Measures particles after filtration. A rise can be plant-wide, limited to one filter, or only an optical-instrument problem.",
      "pin": {
        "x": 320,
        "y": 35
      },
      "zone": "filtration"
    },
    "raw": {
      "name": "Raw-water turbidity",
      "purpose": "Shows the particle load entering the plant. Storm runoff can raise it rapidly before downstream stages respond.",
      "pin": {
        "x": 30,
        "y": 150
      },
      "zone": "intake"
    },
    "particle": {
      "name": "Effluent particle count",
      "purpose": "Counts particles independently of the turbidity optics. A true breakthrough raises particle counts; a fouled turbidity window may not.",
      "pin": {
        "x": 490,
        "y": 125
      },
      "zone": "filtration"
    },
    "grab": {
      "name": "Laboratory grab sample",
      "purpose": "An independent bench measurement of filter effluent. Agreement confirms real particles rather than one bad online analyzer.",
      "pin": {
        "x": 490,
        "y": 250
      },
      "zone": "laboratory"
    },
    "coagulant": {
      "name": "Coagulant dose",
      "purpose": "Records the chemical feed relative to the current raw-water demand. Too little dose weakens floc formation across the plant.",
      "pin": {
        "x": 135,
        "y": 35
      },
      "zone": "chemical"
    },
    "headloss": {
      "name": "Filter head loss",
      "purpose": "Pressure drop through the filter bed. High head loss can precede breakthrough; low head loss follows backwash.",
      "pin": {
        "x": 330,
        "y": 355
      },
      "zone": "filtration"
    },
    "parallel": {
      "name": "Parallel-filter comparison",
      "purpose": "Compares all filters. Plant-wide changes point upstream; one-filter changes point to a local filter or analyzer.",
      "pin": {
        "x": 490,
        "y": 180
      },
      "zone": "filtration"
    }
  },
  "hypotheses": {
    "storm": {
      "label": "Raw-water storm pulse",
      "choice": "Runoff sharply increases incoming particles, but correctly adjusted clarification and filtration may still protect finished water.",
      "call": {
        "title": "Track the raw-water pulse.",
        "arg": "Increase monitoring and adjust treatment as the high-turbidity source water moves through the plant."
      },
      "sig": {
        "settled": "up",
        "filter": "normal",
        "raw": "high",
        "particle": "normal",
        "grab": "normal",
        "coagulant": "normal",
        "headloss": "normal",
        "parallel": "all-shift"
      }
    },
    "sensor": {
      "label": "Turbidity analyzer fouling",
      "choice": "A dirty optical window reports high turbidity even though particle counts, grab samples, and other filters remain normal.",
      "call": {
        "title": "Clean and verify the analyzer.",
        "arg": "The online signal is not supported by independent particle measurements; service the instrument before changing treatment."
      },
      "sig": {
        "settled": "normal",
        "filter": "up",
        "raw": "normal",
        "particle": "normal",
        "grab": "normal",
        "coagulant": "normal",
        "headloss": "high",
        "parallel": "normal"
      }
    },
    "breakthrough": {
      "label": "Single-filter breakthrough",
      "choice": "One loaded or damaged filter releases particles while settled water and the other filters remain acceptable.",
      "call": {
        "title": "Remove the failing filter from service.",
        "arg": "A local filter is passing particles; isolate it, inspect the bed, and restore it before return to service."
      },
      "sig": {
        "settled": "normal",
        "filter": "up",
        "raw": "normal",
        "particle": "high",
        "grab": "high",
        "coagulant": "normal",
        "headloss": "high",
        "parallel": "one-high"
      }
    },
    "backwash": {
      "label": "Routine post-backwash recovery",
      "choice": "A recently washed filter may show a short expected stabilization period while the plant remains protected.",
      "call": {
        "title": "Continue the recovery hold.",
        "arg": "The filter is following its approved post-backwash sequence; keep it out of service until release criteria are met."
      },
      "sig": {
        "settled": "normal",
        "filter": "up",
        "raw": "normal",
        "particle": "high",
        "grab": "high",
        "coagulant": "normal",
        "headloss": "low",
        "parallel": "one-high"
      }
    },
    "rawsensor": {
      "label": "Raw-turbidity analyzer spike",
      "choice": "The intake analyzer reports a storm-sized raw-water increase without corroborating settled-water loading or intake samples.",
      "call": {
        "title": "Raw-water analyzer spike",
        "arg": "Verify the source-water reading before changing treatment."
      },
      "sig": {
        "settled": "normal",
        "filter": "normal",
        "raw": "high",
        "particle": "normal",
        "grab": "normal",
        "coagulant": "normal",
        "headloss": "normal",
        "parallel": "normal"
      }
    },
    "underdose": {
      "label": "Coagulant underdose",
      "choice": "Too little coagulant leaves fine particles unflocculated, so settled water and multiple filter effluents deteriorate together.",
      "call": {
        "title": "Restore coagulation control.",
        "arg": "The upstream chemical dose is insufficient for the particle load; correct the dose and verify downstream recovery."
      },
      "sig": {
        "settled": "up",
        "filter": "up",
        "raw": "normal",
        "particle": "high",
        "grab": "high",
        "coagulant": "low",
        "headloss": "normal",
        "parallel": "all-shift"
      }
    },
    "dosemeter": {
      "label": "Coagulant-dose indication bias",
      "choice": "The displayed chemical dose is low, but raw-water demand, settled-water quality, and independent pump stroke measurements remain normal.",
      "call": {
        "title": "Dose indication bias",
        "arg": "Verify the feed pump before changing coagulant."
      },
      "sig": {
        "settled": "normal",
        "filter": "normal",
        "raw": "normal",
        "particle": "normal",
        "grab": "normal",
        "coagulant": "low",
        "headloss": "normal",
        "parallel": "normal"
      }
    }
  },
  "dismissal": "backwash",
  "reassuring": {
    "lab": "Disinfection status",
    "val": "CHLORINE RESIDUAL ON TARGET",
    "note": "Disinfection is functioning, but particles can shield microbes and still signal a filtration failure."
  },
  "rounds": [
    {
      "answer": "underdose",
      "alarm": "filter",
      "poleA": {
        "lab": "Filter effluent",
        "val": "0.34–0.41 NTU on all four filters",
        "note": "The downstream rise is plant-wide rather than limited to one unit."
      },
      "hook": "Within twenty minutes, every filter begins reporting higher effluent turbidity. The raw-water source has not changed.",
      "riddle": "Particles are reaching every filter. <span class=\"q\">Did the load arrive from outside, or did the plant stop forming removable floc?</span>",
      "vals": {
        "settled": {
          "observed": "3.1 → 8.6 NTU / 25 min",
          "reference": "Typical 0.8–2.5 NTU"
        },
        "filter": {
          "observed": "0.34–0.41 NTU / all 4 filters",
          "reference": "Typical <0.10 NTU"
        },
        "raw": {
          "observed": "18–20 NTU",
          "reference": "Typical today 15–24 NTU"
        },
        "particle": {
          "observed": "5,800–7,200 counts/mL / all filters",
          "reference": "Typical <1,500 counts/mL"
        },
        "grab": {
          "observed": "0.37 NTU composite",
          "reference": "Typical <0.10 NTU"
        },
        "coagulant": {
          "observed": "21 mg/L actual; 34 mg/L jar-test target",
          "reference": "Normal within ±3 mg/L of target"
        },
        "headloss": {
          "observed": "1.1–1.4 m",
          "reference": "Typical 0.6–1.8 m"
        },
        "parallel": {
          "observed": "4 of 4 filters elevated",
          "reference": "Typical 0 of 4"
        }
      },
      "reasons": {
        "storm": "A source-water pulse could raise settled turbidity, but raw water is steady at 18–20 NTU while the coagulant feed is 13 mg/L below the jar-test target.",
        "breakthrough": "One filter breakthrough cannot make all four filters and the composite grab sample rise together.",
        "sensor": "Four analyzers, particle counters, and the grab sample agree, so this is not one dirty optical window.",
        "backwash": "Post-backwash recovery affects one recently washed filter, not all four filters while head loss remains ordinary.",
        "dosemeter": "It explains a low displayed dose alone, not plant-wide settled and filter deterioration with independent particle and grab confirmation.",
        "rawsensor": "A raw analyzer spike does not produce actual particles throughout the plant."
      },
      "resolve": {
        "title": "Coagulant underdose",
        "paras": [
          "The chemical feed remained at 21 mg/L even though jar testing called for 34 mg/L. Weak floc formation raised settled-water turbidity and sent fine particles through every filter, confirmed by particle counts and the laboratory sample.",
          "Neither loud reading was decisive alone: high settled turbidity could follow a storm, and high filter turbidity could be local breakthrough or analyzer fouling. Their plant-wide combination, with a low dose and steady raw water, isolates coagulation failure."
        ],
        "why": {
          "loud": "<b>Why the two headline readings matter:</b> upstream and downstream deterioration together place the problem before the filters.",
          "quiet": "<b>Why the quiet readings matter:</b> unchanged raw water and a low chemical dose explain why every parallel filter changed at once."
        },
        "chain": [
          "Coagulant dose below demand",
          "Weak floc survives clarification",
          "Fine particles load every filter"
        ],
        "take": "Combine measurements from consecutive treatment stages to locate where control was lost."
      },
      "logic": [
        [
          "Settled water high",
          "Storm pulse or coagulation weakness remain"
        ],
        [
          "All filter effluents high",
          "Plant-wide upstream cause remains"
        ],
        [
          "Raw water stable",
          "Storm pulse falls away"
        ],
        [
          "Low dose + independent plant-wide particles",
          "Coagulant underdose remains"
        ]
      ]
    },
    {
      "answer": "breakthrough",
      "alarm": "particle",
      "poleA": {
        "lab": "Independent particle evidence",
        "val": "11,400 counts/mL from Filter 3",
        "note": "A non-optical instrument confirms that material is leaving one filter."
      },
      "hook": "Filter 3 begins drifting upward late in its run. The upstream clarifier and the other filters remain steady.",
      "riddle": "The online turbidity rise is local to one bed. <span class=\"q\">Are real particles leaving it, and what does the bed’s hydraulic state say about why?</span>",
      "vals": {
        "settled": {
          "observed": "1.7–1.9 NTU",
          "reference": "Typical 0.8–2.5 NTU"
        },
        "filter": {
          "observed": "0.48 NTU / Filter 3",
          "reference": "Typical <0.10 NTU"
        },
        "raw": {
          "observed": "19 NTU",
          "reference": "Typical today 15–24 NTU"
        },
        "particle": {
          "observed": "11,400 counts/mL / Filter 3",
          "reference": "Typical <1,500 counts/mL"
        },
        "grab": {
          "observed": "0.44 NTU / Filter 3",
          "reference": "Typical <0.10 NTU"
        },
        "coagulant": {
          "observed": "33 mg/L actual; 34 mg/L target",
          "reference": "Normal within ±3 mg/L"
        },
        "headloss": {
          "observed": "2.9 m / Filter 3",
          "reference": "Backwash trigger 2.6 m"
        },
        "parallel": {
          "observed": "Filter 3 high; Filters 1,2,4 <0.08 NTU",
          "reference": "Typical filters agree within 0.03 NTU"
        }
      },
      "reasons": {
        "underdose": "Poor coagulation would raise settled water and multiple filters; settled water is 1.7–1.9 NTU and only Filter 3 changes.",
        "storm": "Raw water is stable and the clarifier remains effective, so no incoming pulse explains the isolated filter signal.",
        "sensor": "Analyzer fouling shares the same loud pattern, but the particle counter and independent grab sample both confirm real particles.",
        "backwash": "A recent backwash can raise particles and grab turbidity on one filter, but head loss should be low rather than above the terminal threshold.",
        "dosemeter": "A dose-indication bias would affect upstream treatment, not one filter with normal settled water.",
        "rawsensor": "A raw analyzer spike would not remain confined to one filter."
      },
      "resolve": {
        "title": "Single-filter breakthrough",
        "paras": [
          "Filter 3 has exceeded its head-loss trigger and is releasing particles. The elevated particle count and grab sample confirm the online turbidity, while the other filters and settled water remain normal.",
          "The particle counter alone cannot distinguish breakthrough from a short post-backwash release. High head loss alone cannot distinguish breakthrough from a fouled analyzer on a loaded bed. Their combination forces true breakthrough."
        ],
        "why": {
          "loud": "<b>Why the loud panel ties:</b> a real local breakthrough and a dirty optical window both look like one high filter-turbidity channel.",
          "quiet": "<b>Why the tie breaks:</b> independent particle counting, a grab sample, and high head loss all support a physical filter failure."
        },
        "chain": [
          "Filter bed reaches excessive resistance",
          "Flow paths release retained particles",
          "Independent measurements confirm breakthrough"
        ],
        "take": "When an analyzer alarms, corroborate the measured substance with another method before changing the entire process."
      },
      "logic": [
        [
          "Normal settled + one high filter",
          "Breakthrough, analyzer fouling, or post-backwash release remain"
        ],
        [
          "Independent particles high",
          "Breakthrough or post-backwash release remain"
        ],
        [
          "Head loss high",
          "Breakthrough or analyzer fouling remain"
        ],
        [
          "Particles high + head loss high",
          "Filter breakthrough remains"
        ]
      ]
    },
    {
      "answer": "storm",
      "alarm": "raw",
      "experimental": false,
      "compound": [
        "storm",
        "breakthrough"
      ],
      "observed": {
        "settled": "up",
        "filter": "up",
        "raw": "high",
        "particle": "high",
        "grab": "high",
        "coagulant": "normal",
        "headloss": "high",
        "parallel": "one-high"
      },
      "poleA": {
        "lab": "Source and Filter 2",
        "val": "Raw water 210 NTU; Filter 2 at 0.39 NTU",
        "note": "A source-water surge and a local filter problem appear during the same hour."
      },
      "hook": "Heavy runoff reaches the intake while Filter 2 is already near the end of its run. The panel contains both plant-wide loading and a one-filter failure.",
      "riddle": "One explanation cannot cover the pattern. <span class=\"q\">Which two causes are simultaneously true?</span>",
      "vals": {
        "settled": {
          "observed": "2.0 → 6.8 NTU / 45 min",
          "reference": "Typical 0.8–2.5 NTU"
        },
        "filter": {
          "observed": "0.39 NTU / Filter 2; others 0.07–0.10",
          "reference": "Typical <0.10 NTU"
        },
        "raw": {
          "observed": "32 → 210 NTU / 50 min",
          "reference": "Typical today 15–40 NTU"
        },
        "particle": {
          "observed": "9,900 counts/mL / Filter 2",
          "reference": "Typical <1,500 counts/mL"
        },
        "grab": {
          "observed": "0.36 NTU / Filter 2",
          "reference": "Typical <0.10 NTU"
        },
        "coagulant": {
          "observed": "58 mg/L actual; 60 mg/L target",
          "reference": "Normal within ±3 mg/L"
        },
        "headloss": {
          "observed": "2.8 m / Filter 2",
          "reference": "Backwash trigger 2.6 m"
        },
        "parallel": {
          "observed": "Only Filter 2 elevated downstream",
          "reference": "Typical filters agree within 0.03 NTU"
        }
      },
      "reasons": {
        "underdose": "Coagulation is within 2 mg/L of the storm-response target. It cannot explain why only Filter 2 has high particles and excessive head loss.",
        "storm": "The storm explains the raw- and settled-water rise, but not why only Filter 2 fails the particle, grab-sample, and head-loss checks.",
        "breakthrough": "Filter breakthrough explains the isolated downstream failure, but not the 32-to-210 NTU intake surge and plant-wide settled-water rise.",
        "sensor": "A dirty analyzer cannot explain the raw-water pulse, laboratory grab sample, particle count, and excessive head loss.",
        "backwash": "The filter is not in recovery: its head loss is high rather than low, and the source-water surge is independently measured.",
        "dosemeter": "It explains a low dose indication, but the dose is normal and it cannot explain the storm pulse or local filter failure.",
        "rawsensor": "It explains high raw turbidity alone but not settled-water loading, grab particles, and filter head loss."
      },
      "resolve": {
        "title": "Raw-water storm pulse + single-filter breakthrough",
        "paras": [
          "The storm raises the incoming and settled-water particle load, while Filter 2 independently reaches excessive head loss and releases particles. The other filters continue protecting finished water, proving the source surge alone is not the full explanation.",
          "The final case uses four independent checks. Raw and settled measurements together prove a true storm load rather than a bad intake analyzer or dose problem. Particle count and head loss together prove local breakthrough rather than analyzer fouling or normal backwash release."
        ],
        "why": {
          "loud": "<b>Why one diagnosis fails:</b> the source-water surge is plant-wide, but the finished-water problem is confined to one filter.",
          "quiet": "<b>Why the pair is forced:</b> storm measurements explain the upstream load, and three independent Filter 2 measurements explain the local failure."
        },
        "chain": [
          "Runoff sharply increases raw-water solids",
          "Clarification carries a larger load",
          "A separately exhausted filter breaks through"
        ],
        "take": "When evidence separates into upstream and local chains, test whether two real events are occurring rather than stretching one explanation."
      },
      "logic": [
        [
          "Raw water high + settled water high",
          "Requires a source-water storm pulse; underdose or a raw analyzer spike imitates only one"
        ],
        [
          "Particle count high + filter head loss high",
          "Requires true local breakthrough; backwash or analyzer fouling imitates only one"
        ],
        [
          "Dose on target + one-filter comparison",
          "Rejects plant-wide chemical failure"
        ],
        [
          "Two independent spatial scales",
          "Storm pulse and local breakthrough are simultaneous"
        ]
      ]
    }
  ],
  "schematic": {
    "viewBox": "0 0 520 390",
    "svg": "<defs><linearGradient id=\"cleanBg\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#123447\"/><stop offset=\"1\" stop-color=\"#071721\"/></linearGradient><marker id=\"cleanArrow\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto\"><path d=\"M0 0 L10 5 L0 10 z\" fill=\"#69c9ef\"/></marker><style>.clean-border{fill:url(#cleanBg);stroke:#426273;stroke-width:2}.component{fill:#1b3a4d;stroke:#90b3c4;stroke-width:1.7}.component2{fill:#244c61;stroke:#90b3c4;stroke-width:1.7}.flow{fill:none;stroke:#69c9ef;stroke-width:3;marker-end:url(#cleanArrow)}.flow2{fill:none;stroke:#e0b85f;stroke-width:3;marker-end:url(#cleanArrow)}.leader{fill:none;stroke:#7f9bab;stroke-width:1.25;stroke-linecap:round;stroke-linejoin:round;opacity:.78}.anchor{fill:#9ab8c8}.slabel{fill:#eaf6fb;font:700 10.5px Inter,system-ui,sans-serif}.labelbg{fill:#081923;stroke:#355769;stroke-width:1;opacity:.94}</style></defs><rect x=\"12\" y=\"12\" width=\"496\" height=\"366\" rx=\"24\" class=\"clean-border\"/><path d=\"M 30 150 L 58 150 L 58 190 L 72 190\" class=\"leader\"/><circle cx=\"72\" cy=\"190\" r=\"2.4\" class=\"anchor\"/><path d=\"M 135 35 L 135 68 L 145 68 L 145 140\" class=\"leader\"/><circle cx=\"145\" cy=\"140\" r=\"2.4\" class=\"anchor\"/><path d=\"M 225 35 L 225 68 L 255 68 L 255 187\" class=\"leader\"/><circle cx=\"255\" cy=\"187\" r=\"2.4\" class=\"anchor\"/><path d=\"M 320 35 L 320 68 L 355 68 L 355 187\" class=\"leader\"/><circle cx=\"355\" cy=\"187\" r=\"2.4\" class=\"anchor\"/><path d=\"M 490 125 L 462 125 L 462 220 L 383 220\" class=\"leader\"/><circle cx=\"383\" cy=\"220\" r=\"2.4\" class=\"anchor\"/><path d=\"M 490 180 L 462 180 L 462 165 L 395 165\" class=\"leader\"/><circle cx=\"395\" cy=\"165\" r=\"2.4\" class=\"anchor\"/><path d=\"M 490 250 L 462 250 L 462 218 L 445 218\" class=\"leader\"/><circle cx=\"445\" cy=\"218\" r=\"2.4\" class=\"anchor\"/><path d=\"M 330 355 L 330 327 L 355 327 L 355 260\" class=\"leader\"/><circle cx=\"355\" cy=\"260\" r=\"2.4\" class=\"anchor\"/><path d=\"M48 190 H468\" class=\"flow\"/><rect x=\"48\" y=\"155\" width=\"58\" height=\"70\" rx=\"10\" class=\"component2\"/><path d=\"M56 204 q18-18 36 0 t36 0\" fill=\"none\" stroke=\"#75d2f5\" stroke-width=\"2\"/><rect x=\"124\" y=\"145\" width=\"82\" height=\"90\" rx=\"12\" class=\"component\"/><g fill=\"#88bfd5\"><circle cx=\"145\" cy=\"190\" r=\"9\"/><circle cx=\"165\" cy=\"190\" r=\"9\"/><circle cx=\"185\" cy=\"190\" r=\"9\"/></g><rect x=\"224\" y=\"140\" width=\"72\" height=\"100\" rx=\"12\" class=\"component2\"/><path d=\"M236 160 H284 M238 214 H282\" stroke=\"#8eb6c8\" stroke-width=\"2\"/><rect x=\"318\" y=\"140\" width=\"78\" height=\"100\" rx=\"12\" class=\"component\"/><g fill=\"#c8a85f\"><rect x=\"331\" y=\"154\" width=\"12\" height=\"70\"/><rect x=\"351\" y=\"154\" width=\"12\" height=\"70\"/><rect x=\"371\" y=\"154\" width=\"12\" height=\"70\"/></g><rect x=\"420\" y=\"160\" width=\"52\" height=\"60\" rx=\"10\" class=\"component2\"/><circle cx=\"145\" cy=\"112\" r=\"18\" class=\"component\"/><path d=\"M145 130 V154\" class=\"flow\"/><g><rect x=\"42.0\" y=\"230.5\" width=\"70\" height=\"23\" rx=\"11.5\" class=\"labelbg\"/><text x=\"77\" y=\"245.7\" text-anchor=\"middle\" class=\"slabel\">intake</text></g><g><rect x=\"119.0\" y=\"240.5\" width=\"92\" height=\"23\" rx=\"11.5\" class=\"labelbg\"/><text x=\"165\" y=\"255.7\" text-anchor=\"middle\" class=\"slabel\">mix + floc</text></g><g><rect x=\"217.0\" y=\"245.5\" width=\"86\" height=\"23\" rx=\"11.5\" class=\"labelbg\"/><text x=\"260\" y=\"260.7\" text-anchor=\"middle\" class=\"slabel\">clarifier</text></g><g><rect x=\"321.0\" y=\"245.5\" width=\"72\" height=\"23\" rx=\"11.5\" class=\"labelbg\"/><text x=\"357\" y=\"260.7\" text-anchor=\"middle\" class=\"slabel\">filters</text></g><g><rect x=\"416.0\" y=\"225.5\" width=\"60\" height=\"23\" rx=\"11.5\" class=\"labelbg\"/><text x=\"446\" y=\"240.7\" text-anchor=\"middle\" class=\"slabel\">lab</text></g>"
  }
} };
