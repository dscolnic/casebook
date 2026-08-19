// Diagnosis data pack — L2/L3/L4 with structural logic diversity.
module.exports = { PACK: {
  "id": "bioreactor",
  "title": "Living Process",
  "domain": "Industrial fermentation",
  "role": "You are the bioprocess engineer supervising a production fermenter.",
  "intro": {
    "title": "How this system works",
    "lead": "A fermentation vessel is a controlled ecosystem. Cells consume feed and oxygen, release carbon dioxide and heat, and change the broth’s chemistry. Agitation, aeration, feed rate, cooling, and pH control must keep cell metabolism inside a productive operating window.",
    "cards": [
      {
        "title": "How the culture grows",
        "body": "Cells convert substrate into biomass and product. Their oxygen demand and carbon-dioxide output rise as metabolism accelerates."
      },
      {
        "title": "How the process loses control",
        "body": "Excess feed can drive overflow metabolism, inadequate oxygen transfer can limit growth, and contamination can add a second organism with different chemistry."
      },
      {
        "title": "What the instruments measure",
        "body": "Dissolved-oxygen probes, exhaust-gas analyzers, feed meters, pH sensors, and agitation records reveal the balance between oxygen supply and biological demand."
      },
      {
        "title": "Why false alarms happen",
        "body": "A coated dissolved-oxygen probe can drift low even when exhaust oxygen and a redundant probe show normal transfer. Scheduled feed ramps also create expected metabolic transients."
      }
    ],
    "takeaway": "The loud reading gets your attention, but the right explanation is the one that fits the whole panel."
  },
  "system": {
    "parts": [
      [
        "Sterile vessel",
        "A stirred, aerated tank contains the production organism and nutrient broth."
      ],
      [
        "Feed system",
        "Carbon source and nutrients enter according to a recipe; excess substrate can change metabolism."
      ],
      [
        "Gas transfer",
        "Sparged air and agitation move oxygen into the broth while carbon dioxide exits."
      ],
      [
        "Process control",
        "Cooling, pH addition, agitation, and airflow hold the culture near its target."
      ],
      [
        "Biological checks",
        "Microscopy and rapid assays determine whether the intended organism remains dominant."
      ]
    ],
    "soWrong": "A low dissolved-oxygen display may mean true oxygen limitation, excess biological demand, contamination, or only a bad probe. Gas balance and independent biology show whether the culture itself changed."
  },
  "salient": [
    "do",
    "co2"
  ],
  "readings": {
    "do": {
      "name": "Dissolved oxygen",
      "purpose": "Measures oxygen remaining in the broth. A low value can reflect high cell demand, inadequate transfer, or a biased probe.",
      "pin": {
        "x": 222,
        "y": 160
      },
      "zone": "vessel"
    },
    "co2": {
      "name": "Exhaust CO₂",
      "purpose": "Measures carbon dioxide leaving the fermenter. Rising CO₂ usually indicates greater biological metabolism rather than an isolated oxygen-probe problem.",
      "pin": {
        "x": 402,
        "y": 92
      },
      "zone": "off-gas"
    },
    "ph": {
      "name": "Broth pH",
      "purpose": "Shows net acid and base production. Rapid acidification can accompany excess feed or an unwanted organism.",
      "pin": {
        "x": 260,
        "y": 215
      },
      "zone": "vessel"
    },
    "agit": {
      "name": "Agitator speed",
      "purpose": "Higher agitation increases oxygen-transfer capacity. A drive or control limit can leave oxygen demand above supply.",
      "pin": {
        "x": 215,
        "y": 275
      },
      "zone": "drive"
    },
    "feed": {
      "name": "Carbon-feed rate",
      "purpose": "Records substrate addition. Excess feed can increase respiration and overflow byproducts; a scheduled ramp is expected and documented.",
      "pin": {
        "x": 86,
        "y": 135
      },
      "zone": "feed"
    },
    "offo2": {
      "name": "Exhaust O₂",
      "purpose": "Oxygen remaining in the exhaust reflects how much the culture consumes. Low exhaust O₂ corroborates true high oxygen demand.",
      "pin": {
        "x": 445,
        "y": 108
      },
      "zone": "off-gas"
    },
    "micro": {
      "name": "Rapid microscopy / qPCR",
      "purpose": "Checks whether the intended organism remains dominant. A second morphology or organism-specific signal supports contamination.",
      "pin": {
        "x": 401,
        "y": 246
      },
      "zone": "laboratory"
    },
    "do2": {
      "name": "Redundant dissolved-O₂ probe",
      "purpose": "A separately calibrated probe cross-checks the primary channel. Disagreement points to fouling or calibration drift.",
      "pin": {
        "x": 290,
        "y": 160
      },
      "zone": "vessel"
    },
    "feeddev": {
      "name": "Feed actual-minus-command",
      "purpose": "Compares metered substrate flow with the controller command. A positive deviation means the hardware is delivering more substrate than the recipe requests; a scheduled ramp raises both together.",
      "pin": {
        "x": 145,
        "y": 150
      },
      "zone": "feed"
    },
    "qpcr": {
      "name": "Contaminant qPCR",
      "purpose": "Detects non-production-organism DNA. A positive molecular result supports contamination, but must be combined with microscopy because sample or assay contamination can create a false positive.",
      "pin": {
        "x": 443,
        "y": 320
      },
      "zone": "laboratory"
    },
    "transferresp": {
      "name": "Response to transfer-capacity step",
      "purpose": "Compares dissolved-oxygen recovery after a controlled increase in agitation and airflow. Recovery suggests demand-driven depletion; little recovery supports a true transfer ceiling. A fouled primary probe may also fail to respond, so the redundant channel still matters.",
      "pin": {
        "x": 330,
        "y": 112
      },
      "zone": "control-test"
    }
  },
  "hypotheses": {
    "probe": {
      "label": "Dissolved-oxygen probe fouling",
      "choice": "The primary probe reads low while exhaust gas and the redundant probe show that oxygen transfer remains normal.",
      "call": {
        "title": "Transfer control to the healthy probe.",
        "arg": "Service the fouled channel rather than changing the biological process."
      },
      "sig": {
        "do": "low",
        "co2": "normal",
        "ph": "normal",
        "agit": "normal",
        "feed": "normal",
        "offo2": "normal",
        "micro": "clean",
        "do2": "normal",
        "feeddev": "zero",
        "qpcr": "negative",
        "transferresp": "no-recovery"
      }
    },
    "contam": {
      "label": "Microbial contamination",
      "choice": "A second organism alters gas production and pH and appears in independent biological testing.",
      "call": {
        "title": "Contain the contaminated batch.",
        "arg": "The process chemistry is being driven by an unintended organism; isolate the vessel and follow contamination procedures."
      },
      "sig": {
        "do": "normal",
        "co2": "high",
        "ph": "down",
        "agit": "limited",
        "feed": "normal",
        "offo2": "normal",
        "micro": "positive",
        "do2": "normal",
        "feeddev": "zero",
        "qpcr": "positive",
        "transferresp": "normal-response"
      }
    },
    "ramp": {
      "label": "Scheduled feed-ramp response",
      "choice": "The recipe intentionally raises feed while agitation reaches its approved ceiling; actual flow should still match the command and both DO probes should agree.",
      "call": {
        "title": "Continue the documented ramp.",
        "arg": "The culture is following the recipe and remains inside its validated operating window."
      },
      "sig": {
        "do": "low",
        "co2": "normal",
        "ph": "normal",
        "agit": "limited",
        "feed": "high",
        "offo2": "low",
        "micro": "clean",
        "do2": "low",
        "feeddev": "zero",
        "qpcr": "negative",
        "transferresp": "recovers"
      }
    },
    "oxygen": {
      "label": "Oxygen-transfer limitation",
      "choice": "The culture’s demand exceeds the oxygen delivered by airflow and mixing, so both oxygen probes fall without a feed error.",
      "call": {
        "title": "Restore oxygen-transfer capacity.",
        "arg": "Increase available transfer within the approved process envelope and correct the limiting agitation or aeration condition."
      },
      "sig": {
        "do": "low",
        "co2": "normal",
        "ph": "normal",
        "agit": "limited",
        "feed": "normal",
        "offo2": "low",
        "micro": "clean",
        "do2": "low",
        "feeddev": "zero",
        "qpcr": "negative",
        "transferresp": "no-recovery"
      }
    },
    "assaycontam": {
      "label": "qPCR sample contamination",
      "choice": "The molecular assay is positive, but microscopy and process behavior remain clean because the laboratory sample—not the vessel—was contaminated.",
      "call": {
        "title": "Laboratory assay contamination",
        "arg": "Repeat the sample under clean handling; the process does not show biological contamination."
      },
      "sig": {
        "do": "normal",
        "co2": "normal",
        "ph": "normal",
        "agit": "normal",
        "feed": "normal",
        "offo2": "normal",
        "micro": "clean",
        "do2": "normal",
        "feeddev": "zero",
        "qpcr": "positive",
        "transferresp": "normal-response"
      }
    },
    "overfeed": {
      "label": "Substrate overfeed",
      "choice": "Too much carbon source raises oxygen demand, carbon-dioxide production, and acid byproducts while the culture remains otherwise clean.",
      "call": {
        "title": "Reduce and verify feed.",
        "arg": "The feed is above the recipe and driving excess metabolism; restore the commanded rate and watch the gas balance recover."
      },
      "sig": {
        "do": "low",
        "co2": "high",
        "ph": "down",
        "agit": "normal",
        "feed": "high",
        "offo2": "low",
        "micro": "clean",
        "do2": "low",
        "feeddev": "positive",
        "qpcr": "negative",
        "transferresp": "partial-recovery"
      }
    },
    "flowbias": {
      "label": "Feed-flow meter bias",
      "choice": "The feed meter reports excess delivery even though substrate concentration, exhaust gas, and the controller-valve balance do not show real overfeeding.",
      "call": {
        "title": "Feed-flow indication fault",
        "arg": "The apparent feed excess is limited to the metering chain; verify by mass balance before changing the recipe."
      },
      "sig": {
        "do": "normal",
        "co2": "normal",
        "ph": "normal",
        "agit": "normal",
        "feed": "normal",
        "offo2": "normal",
        "micro": "clean",
        "do2": "normal",
        "feeddev": "positive",
        "qpcr": "negative",
        "transferresp": "partial-recovery"
      }
    },
    "morphartifact": {
      "label": "Microscopy stain artifact",
      "choice": "Debris or staining resembles foreign cells, while organism-specific qPCR and the process gas balance remain negative.",
      "call": {
        "title": "Microscopy artifact",
        "arg": "The visual finding is not corroborated molecularly or metabolically."
      },
      "sig": {
        "do": "normal",
        "co2": "normal",
        "ph": "normal",
        "agit": "normal",
        "feed": "normal",
        "offo2": "normal",
        "micro": "positive",
        "do2": "normal",
        "feeddev": "zero",
        "qpcr": "negative",
        "transferresp": "normal-response"
      }
    }
  },
  "dismissal": "ramp",
  "reassuring": {
    "lab": "Sterility interlock",
    "val": "VESSEL SEALED — no breach alarm",
    "note": "A sealed vessel lowers contamination risk, but contamination can enter during inoculation, sampling, or through a small undetected pathway."
  },
  "rounds": [
    {
      "answer": "overfeed",
      "alarm": "do",
      "poleA": {
        "lab": "Primary metabolism",
        "val": "DO 42% → 9%; CO₂ 3.1% → 6.8%",
        "note": "Oxygen falls while carbon-dioxide production rises."
      },
      "hook": "Two hours after a recipe transition, the culture’s gas balance changes sharply. The vessel remains sealed and both oxygen probes agree.",
      "riddle": "Metabolism has accelerated. <span class=\"q\">Did oxygen supply shrink, or did actual substrate delivery exceed the recipe?</span>",
      "vals": {
        "do": {
          "observed": "42% → 9% air saturation / 18 min",
          "reference": "Target 25–45%"
        },
        "co2": {
          "observed": "3.1% → 6.8% dry exhaust",
          "reference": "Typical 2.5–4.0%"
        },
        "ph": {
          "observed": "6.90 → 6.63 / 25 min",
          "reference": "Control band 6.80–7.00"
        },
        "agit": {
          "observed": "780 rpm",
          "reference": "Validated range 720–850 rpm"
        },
        "feed": {
          "observed": "146 L/h actual; 92 L/h command",
          "reference": "Normal ±3 L/h"
        },
        "offo2": {
          "observed": "17.8% → 12.1%",
          "reference": "Typical 16–19%"
        },
        "micro": {
          "observed": "Production morphology only",
          "reference": "No secondary morphology expected"
        },
        "do2": {
          "observed": "10% air saturation",
          "reference": "Agreement target ±4 percentage points"
        },
        "feeddev": {
          "observed": "+46 L/h",
          "reference": "Expected difference ±3 L/h"
        },
        "qpcr": {
          "observed": "Not detected",
          "reference": "Expected not detected"
        },
        "transferresp": {
          "observed": "DO rises 5 points after +15% airflow",
          "reference": "Healthy base-recipe response 8–15 points"
        }
      },
      "reasons": {
        "oxygen": "Oxygen-transfer limitation can lower both DO probes, but it does not explain the 54 L/h feed excess, the strong CO₂ rise, and rapid acidification while agitation remains available.",
        "contam": "Contamination can raise CO₂ and lower pH, but the feed discrepancy directly supplies the extra substrate and microscopy remains clean.",
        "probe": "A fouled probe would disagree with the redundant probe and would not lower exhaust O₂ or raise CO₂.",
        "ramp": "A scheduled ramp would match the command record. Actual feed is 146 L/h against a 92 L/h command, and DO has left the validated range.",
        "flowbias": "The flow-deviation channel is high, but true overfeeding also changes DO, CO₂, pH, and both oxygen probes. Those independent process responses are present.",
        "assaycontam": "A laboratory qPCR problem cannot create low DO, high CO₂, excess metered substrate, and falling pH.",
        "morphartifact": "A staining artifact cannot explain the gas balance and verified feed excess."
      },
      "resolve": {
        "title": "Substrate overfeed",
        "paras": [
          "The feed valve is delivering 146 L/h despite a 92 L/h command. The culture consumes the excess substrate, drawing down oxygen, increasing CO₂, and acidifying the broth while both DO probes agree.",
          "Low DO alone is shared by oxygen limitation and probe fouling; high CO₂ alone is shared by contamination and a scheduled ramp. Only the pair—low DO and high CO₂—isolates excess metabolic demand from overfeed."
        ],
        "why": {
          "loud": "<b>Why the headline pair works:</b> oxygen is being consumed and carbon is being metabolized faster at the same time.",
          "quiet": "<b>Why the quiet readings confirm it:</b> the feed-meter mismatch supplies the cause, while clean microscopy and normal agitation eliminate two major rivals."
        },
        "chain": [
          "Feed exceeds command",
          "Cellular respiration and byproduct formation increase",
          "DO falls while CO₂ and acidity rise"
        ],
        "take": "Use the gas balance to distinguish inadequate supply from excessive biological demand."
      },
      "logic": [
        [
          "DO low",
          "Overfeed, oxygen-transfer loss, probe fault, or scheduled ramp remain"
        ],
        [
          "CO₂ high",
          "Overfeed or contamination remain"
        ],
        [
          "Feed high + positive actual-command deviation",
          "Real excess substrate, not a scheduled ramp or meter-only error"
        ],
        [
          "Microscopy and qPCR negative",
          "Overfeed remains"
        ]
      ]
    },
    {
      "answer": "oxygen",
      "alarm": "do",
      "poleA": {
        "lab": "Oxygen availability",
        "val": "DO 34% → 7%",
        "note": "Both broth probes fall, but carbon-dioxide production does not increase."
      },
      "hook": "Both dissolved-oxygen channels fall during a stable feed period. Operators deliberately raise agitation and airflow, then watch how the culture responds.",
      "riddle": "A controlled transfer-capacity test has been run. <span class=\"q\">Which explanation fits both the command and the response?</span>",
      "vals": {
        "do": {
          "observed": "34% → 8%; 10% after test",
          "reference": "Target 25–45% air saturation"
        },
        "co2": {
          "observed": "3.6–3.8% dry exhaust",
          "reference": "Typical 2.5–4.0%"
        },
        "ph": {
          "observed": "6.88–6.91",
          "reference": "Control band 6.80–7.00"
        },
        "agit": {
          "observed": "720→900 rpm command; actual 795 rpm ceiling",
          "reference": "Validated response reaches 880–900 rpm"
        },
        "feed": {
          "observed": "91–93 L/h throughout test",
          "reference": "Command 92 L/h"
        },
        "offo2": {
          "observed": "17.8%→12.6%; no recovery after airflow step",
          "reference": "Typical 16–19%"
        },
        "micro": {
          "observed": "Production morphology only",
          "reference": "No secondary morphology expected"
        },
        "do2": {
          "observed": "9%→11% after transfer-capacity step",
          "reference": "Healthy response usually +8–15 points"
        },
        "feeddev": {
          "observed": "+1 L/h",
          "reference": "Expected difference ±3 L/h"
        },
        "qpcr": {
          "observed": "Not detected",
          "reference": "Expected not detected"
        },
        "transferresp": {
          "observed": "Primary +2 points; redundant +2 points",
          "reference": "Healthy response 8–15 points"
        }
      },
      "reasons": {
        "overfeed": "Overfeed shares the low-DO alarm, but it should increase exhaust CO₂, acid production, and measured feed. All three remain near baseline.",
        "contam": "Contamination would change the biological test or chemistry; microscopy is clean and pH is stable.",
        "probe": "Probe fouling shares low DO with normal CO₂, but both DO probes agree and exhaust O₂ also falls, proving real oxygen consumption.",
        "ramp": "The scheduled ramp also gives low DO, normal CO₂, low off-gas oxygen, and an agitator at its limit. But its feed is intentionally high; here feed remains at the base recipe.",
        "flowbias": "A feed-meter bias does not make both DO probes fall or drive the agitator to its transfer ceiling.",
        "assaycontam": "A positive laboratory sample is absent and would not explain the paired oxygen measurements.",
        "morphartifact": "A stain artifact does not change off-gas oxygen or both DO channels."
      },
      "resolve": {
        "title": "Oxygen-transfer limitation",
        "paras": [
          "Both broth probes and the exhaust-oxygen balance show real oxygen depletion. The agitator is stuck at 520 rpm against a 720–850 rpm validated range, so the vessel cannot transfer oxygen fast enough even though feed and metabolism remain otherwise ordinary.",
          "This round is solved by an intervention, not by a static snapshot. A probe fault should disappear on the redundant channel, and a feed ramp should appear in the feed records. When a deliberate increase in mixing and airflow produces almost no dissolved-oxygen recovery while exhaust oxygen remains low, the transfer system—not the recipe or one probe—is limiting the culture."
        ],
        "why": {
          "loud": "<b>Why the loud readings tie:</b> both real transfer loss and a bad primary probe can show low DO without a CO₂ surge.",
          "quiet": "<b>Why the response matters:</b> the system was deliberately pushed. Failure to recover after added transfer capacity is evidence about mechanism, not merely another alarm."
        },
        "chain": [
          "Agitator reaches a mechanical limit",
          "Gas-to-liquid oxygen transfer falls below demand",
          "Both probes fall despite normal feed"
        ],
        "take": "When several causes fit a snapshot, change one controlled input and diagnose from the response."
      },
      "logic": [
        [
          "Low DO + normal CO₂",
          "Probe fault, scheduled demand ramp, or oxygen-transfer limitation remain"
        ],
        [
          "Both DO probes remain low after the test",
          "A single fouled probe falls away"
        ],
        [
          "Feed command and actual flow stay unchanged",
          "A scheduled feed ramp falls away"
        ],
        [
          "Controlled transfer step gives only +2 points on both probes",
          "A true oxygen-transfer ceiling remains"
        ]
      ],
      "challenge": {
        "level": "L3",
        "archetype": "intervention",
        "family": "controlled-response-test",
        "deepQuestion": "does-added-transfer-capacity-change-the-deficit",
        "evidenceModes": [
          "before-after-response",
          "independent-gas-balance"
        ],
        "intervention": {
          "command": "Agitation command 720→900 rpm and airflow +15%",
          "responseReadings": [
            "do2",
            "offo2",
            "transferresp"
          ],
          "controlReadings": [
            "feed",
            "feeddev"
          ],
          "closesFor": "oxygen"
        }
      }
    },
    {
      "answer": "contam",
      "alarm": "co2",
      "experimental": false,
      "compound": [
        "contam",
        "oxygen"
      ],
      "observed": {
        "do": "low",
        "co2": "high",
        "ph": "down",
        "agit": "limited",
        "feed": "normal",
        "offo2": "low",
        "micro": "positive",
        "do2": "low",
        "feeddev": "zero",
        "qpcr": "positive",
        "transferresp": "no-recovery"
      },
      "poleA": {
        "lab": "Culture trajectory",
        "val": "New organism detected; oxygen collapse 5 h later",
        "note": "Biological identity changes first, followed by a separate transfer-capacity failure."
      },
      "hook": "A contaminant signal appears early in the shift. Five hours later, both oxygen probes collapse even though feed remains on recipe and agitation reaches its mechanical ceiling.",
      "riddle": "The evidence has a clear order in time. <span class=\"q\">Which first process created the second operating limit?</span>",
      "vals": {
        "do": {
          "observed": "32%→9% between 07:10 and 08:00",
          "reference": "Target 25–45%"
        },
        "co2": {
          "observed": "3.4%→6.9% beginning 03:20",
          "reference": "Typical 2.5–4.0%"
        },
        "ph": {
          "observed": "6.91→6.54 before base correction",
          "reference": "Control band 6.80–7.00"
        },
        "agit": {
          "observed": "900 rpm command; 798 rpm torque ceiling",
          "reference": "Validated maximum 900 rpm"
        },
        "feed": {
          "observed": "92±2 L/h",
          "reference": "Command 92 L/h"
        },
        "offo2": {
          "observed": "17.2%→11.9% after 07:10",
          "reference": "Typical 16–19%"
        },
        "micro": {
          "observed": "Secondary rods visible at 02:40",
          "reference": "Expected production morphology only"
        },
        "do2": {
          "observed": "10% air saturation at 07:55",
          "reference": "Agreement target ±4 points"
        },
        "feeddev": {
          "observed": "+1 L/h",
          "reference": "Expected ±3 L/h"
        },
        "qpcr": {
          "observed": "Positive at 02:10; burden doubles by 05:00",
          "reference": "Expected not detected"
        },
        "transferresp": {
          "observed": "Both probes recover only 2 points after test",
          "reference": "Healthy response 8–15 points"
        }
      },
      "reasons": {
        "probe": "A probe problem cannot explain a positive contaminant assay, secondary morphology, acidification, rising CO₂, and low exhaust oxygen on two channels.",
        "contam": "Contamination explains the identity, pH, and CO₂ changes, but by itself does not explain why both oxygen channels later remain low while transfer hardware reaches its ceiling.",
        "ramp": "A scheduled ramp would appear in command and actual feed; both remain at 92 L/h, and it cannot explain contaminant DNA or morphology.",
        "oxygen": "Oxygen-transfer limitation explains the late DO and exhaust-O₂ collapse, but not the earlier qPCR, microscopy, acidification, and CO₂ rise.",
        "assaycontam": "A contaminated laboratory sample could create one positive assay, but not matching microscopy, broth chemistry, and a later process-wide oxygen deficit.",
        "overfeed": "Overfeeding would require a positive actual-minus-command deviation; the meter stays within +1 L/h and cannot explain contaminant identity.",
        "flowbias": "A feed-meter bias does not explain organism-specific qPCR, microscopy, or the delayed failure to recover oxygen after added mixing.",
        "morphartifact": "A microscopy artifact does not explain repeated qPCR positivity, acidification, increased CO₂, and the later transfer ceiling."
      },
      "resolve": {
        "title": "Microbial contamination followed by oxygen-transfer limitation",
        "paras": [
          "The contaminant is established first by qPCR, microscopy, acidification, and rising carbon dioxide. As the unintended biomass grows, oxygen demand rises until both DO channels remain low, exhaust oxygen falls, and agitation reaches its torque ceiling. The second problem is a downstream operating limit created by the first.",
          "This is a cascade rather than two unrelated alarms. Contamination alone leaves the late transfer-capacity evidence unexplained; oxygen limitation alone leaves the earlier organism-identity evidence unexplained. The timestamps force the order: the biological change precedes and drives the transfer failure."
        ],
        "why": {
          "loud": "<b>Why one diagnosis fails:</b> the early identity change and the later oxygen deficit occupy different stages of the same process history.",
          "quiet": "<b>Why the pair is forced:</b> independent organism tests establish the initiating event, while two oxygen channels and exhaust gas establish the downstream limit."
        },
        "chain": [
          "Contaminant population establishes",
          "Respiration and oxygen demand rise",
          "Gas transfer reaches its ceiling"
        ],
        "take": "In a cascade, diagnose both the initiating cause and the downstream limit—and use time order to connect them."
      },
      "logic": [
        [
          "qPCR positive before process drift",
          "An unintended organism is present"
        ],
        [
          "Microscopy + falling pH + rising CO₂",
          "The organism is metabolically active, not a laboratory artifact"
        ],
        [
          "Five hours later both DO probes and exhaust O₂ fall",
          "A real oxygen deficit develops"
        ],
        [
          "Agitation at torque ceiling + normal feed",
          "Transfer capacity, not extra commanded substrate, is now limiting"
        ],
        [
          "Transfer-capacity test produces almost no recovery",
          "The late deficit is a real transfer limit, not feed-driven demand"
        ],
        [
          "Identity change precedes transfer failure",
          "Contamination → oxygen-transfer limitation"
        ]
      ],
      "challenge": {
        "level": "L4",
        "archetype": "cascade",
        "family": "biological-demand-cascade",
        "compoundRelation": "contamination-drives-transfer-limit",
        "evidenceModes": [
          "identity-sequence",
          "gas-transfer-response"
        ],
        "compoundMode": "cascade",
        "sequence": {
          "causeOrder": [
            "contam",
            "oxygen"
          ],
          "readings": [
            "qpcr",
            "micro",
            "co2",
            "ph",
            "do2",
            "offo2",
            "transferresp"
          ],
          "closesFor": [
            "contam",
            "oxygen"
          ],
          "note": "Contaminant identity appears first; oxygen-transfer limitation develops later as the new biomass raises demand."
        }
      }
    }
  ],
  "schematic": {
    "viewBox": "0 0 520 390",
    "svg": "\n<defs>\n <linearGradient id=\"b_bg\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#102f34\"/><stop offset=\"1\" stop-color=\"#071a23\"/></linearGradient>\n <linearGradient id=\"b_broth\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#73e0bd\" stop-opacity=\".58\"/><stop offset=\"1\" stop-color=\"#1f8c78\" stop-opacity=\".32\"/></linearGradient>\n <marker id=\"b_arrow\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto\"><path d=\"M0 0 L10 5 L0 10 z\" fill=\"#73e0bd\"/></marker>\n</defs>\n<rect x=\"18\" y=\"35\" width=\"484\" height=\"315\" rx=\"26\" fill=\"url(#b_bg)\" stroke=\"#315d61\" stroke-width=\"2\"/>\n<text x=\"90\" y=\"58\" class=\"lbl\" text-anchor=\"middle\" style=\"fill:#86e5c8\">FEED</text><text x=\"255\" y=\"58\" class=\"lbl\" text-anchor=\"middle\" style=\"fill:#86e5c8\">BIOREACTOR</text><text x=\"425\" y=\"58\" class=\"lbl\" text-anchor=\"middle\" style=\"fill:#86e5c8\">OFF-GAS + LAB</text>\n<rect x=\"48\" y=\"92\" width=\"74\" height=\"112\" rx=\"18\" fill=\"#153b40\" stroke=\"#75ddc0\" stroke-width=\"2\"/><path d=\"M58 148 H112\" stroke=\"#75ddc0\" stroke-width=\"3\"/><path d=\"M64 112 H106\" stroke=\"#f0c56e\" stroke-width=\"3\"/><text x=\"85\" y=\"224\" class=\"lbl\" text-anchor=\"middle\">substrate tank</text>\n<path d=\"M122 150 H174\" stroke=\"#75ddc0\" stroke-width=\"4\" marker-end=\"url(#b_arrow)\"/><circle cx=\"145\" cy=\"150\" r=\"9\" fill=\"#102832\" stroke=\"#f0c56e\" stroke-width=\"2\"/><path d=\"M145 141 v18 M136 150 h18\" stroke=\"#f0c56e\" stroke-width=\"2\"/>\n<rect x=\"174\" y=\"78\" width=\"162\" height=\"226\" rx=\"54\" fill=\"#163a40\" stroke=\"#75ddc0\" stroke-width=\"3\"/><rect x=\"185\" y=\"102\" width=\"140\" height=\"184\" rx=\"42\" fill=\"url(#b_broth)\" stroke=\"#3e8f82\"/>\n<path d=\"M255 80 V260\" stroke=\"#f0c56e\" stroke-width=\"5\"/><path d=\"M216 205 H294 M224 224 H286\" stroke=\"#f0c56e\" stroke-width=\"5\"/><circle cx=\"255\" cy=\"66\" r=\"18\" fill=\"#142d36\" stroke=\"#f0c56e\" stroke-width=\"2\"/><path d=\"M247 66 h16 M255 58 v16\" stroke=\"#f0c56e\" stroke-width=\"2\"/>\n<g fill=\"#b6f4de\" opacity=\".75\"><circle cx=\"205\" cy=\"240\" r=\"4\"/><circle cx=\"222\" cy=\"258\" r=\"3\"/><circle cx=\"276\" cy=\"250\" r=\"4\"/><circle cx=\"302\" cy=\"230\" r=\"3\"/><circle cx=\"238\" cy=\"188\" r=\"3\"/><circle cx=\"292\" cy=\"170\" r=\"4\"/></g>\n<path d=\"M336 112 H392 V84\" fill=\"none\" stroke=\"#82d9c7\" stroke-width=\"4\" marker-end=\"url(#b_arrow)\"/><rect x=\"380\" y=\"72\" width=\"76\" height=\"54\" rx=\"12\" fill=\"#15343d\" stroke=\"#75ddc0\"/><path d=\"M390 91 h56 M390 105 h38\" stroke=\"#75ddc0\" stroke-width=\"2\"/><text x=\"418\" y=\"64\" class=\"lbl\" text-anchor=\"middle\">gas analyzer</text>\n<rect x=\"374\" y=\"214\" width=\"96\" height=\"96\" rx=\"14\" fill=\"#142f38\" stroke=\"#f0c56e\"/><circle cx=\"401\" cy=\"245\" r=\"14\" fill=\"none\" stroke=\"#f0c56e\" stroke-width=\"3\"/><path d=\"M392 245 h18 M401 236 v18\" stroke=\"#f0c56e\" stroke-width=\"2\"/><path d=\"M430 235 h26 M430 250 h26 M430 265 h18\" stroke=\"#f0c56e\" stroke-width=\"2\"/><text x=\"422\" y=\"330\" class=\"lbl\" text-anchor=\"middle\">microscopy + qPCR</text>\n<path d=\"M336 264 H372\" stroke=\"#75ddc0\" stroke-width=\"4\" marker-end=\"url(#b_arrow)\"/><path d=\"M173 118 H145 V92\" fill=\"none\" stroke=\"#75ddc0\" stroke-width=\"3\" stroke-dasharray=\"5 4\"/>\n"
  },
  "design": {
    "visual": {
      "layout": "central-vessel-with-feed-and-offgas",
      "palette": "teal-gold",
      "flow": "feed-to-culture-to-gas"
    },
    "challenges": [
      {
        "level": "L2",
        "family": "command-vs-actual",
        "deepQuestion": "source-of-metabolic-demand",
        "evidenceModes": [
          "command-response",
          "gas-balance"
        ]
      },
      {
        "level": "L3",
        "family": "controlled-response-test",
        "deepQuestion": "does-added-transfer-capacity-change-the-deficit",
        "evidenceModes": [
          "before-after-response",
          "independent-gas-balance"
        ],
        "archetype": "intervention",
        "intervention": {
          "command": "Agitation command 720→900 rpm and airflow +15%",
          "responseReadings": [
            "do2",
            "offo2"
          ],
          "controlReadings": [
            "feed",
            "feeddev"
          ],
          "closesFor": "oxygen"
        }
      },
      {
        "level": "L4",
        "family": "biological-demand-cascade",
        "compoundRelation": "contamination-drives-transfer-limit",
        "evidenceModes": [
          "identity-sequence",
          "gas-transfer-response"
        ],
        "archetype": "cascade",
        "compoundMode": "cascade",
        "sequence": {
          "causeOrder": [
            "contam",
            "oxygen"
          ],
          "readings": [
            "qpcr",
            "micro",
            "co2",
            "ph",
            "do2",
            "offo2"
          ],
          "closesFor": [
            "contam",
            "oxygen"
          ],
          "note": "Contaminant identity appears first; oxygen-transfer limitation develops later as the new biomass raises demand."
        }
      }
    ]
  }
} };
