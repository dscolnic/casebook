# RECKON Game Templates — copy the matching one as your structural model

Each block below is a COMPLETE, real puzzle from that game. When authoring a new
course puzzle for a game, produce an object with the **exact same fields and shape**
as its template. Do not add or drop fields. Change only the content.


## Sequence
A game = chapters (each with 4 ordered `cards` = [id,text]), a `chapterOrder`, `segues` (bridges), `principles`, `hints`, and an `intro`. The player orders cards within chapters AND orders the chapters.
Top-level fields: `id`, `icon`, `discipline`, `title`, `headline`, `kicker`, `story`, `overview`, `terms`, `note`, `sources`, `chapters`, `chapterOrder`, `segues`, `principles`, `hints`, `intro`, `collection`

```json
{
  "id": "tsunami",
  "icon": "≋",
  "discipline": "Earth science",
  "title": "From Locked Fault to Coastal Flood",
  "headline": "Follow the physical formation of an earthquake-generated tsunami.",
  "kicker": "Subduction-zone observatory · A long offshore rupture begins",
  "story": [
    "Two tectonic plates have been locked offshore while stress accumulated. When the fault ruptures, it may disturb the ocean above it.",
    "Arrange the physical sequence from stored tectonic stress to coastal inundation."
  ],
  "overview": "A tsunami is not simply an earthquake wave in water. The relevant system includes a deforming plate boundary, the geometry of seafloor motion, the ocean surface, long-wave propagation, changing water depth, and the coastal landscape. The puzzle asks which physical state supplies the disturbance measured in a different part of the system.",
  "terms": [
    [
      "Subduction zone",
      "A boundary where one tectonic plate descends beneath a different plate."
    ],
    [
      "Locked fault",
      "A fault held by friction while surrounding rock continues to deform."
    ],
    [
      "Elastic strain",
      "Stored deformation that can be released when rock slips."
    ],
    [
      "Seafloor displacement",
      "A change in the elevation or position of the ocean bottom."
    ],
    [
      "Wavelength",
      "The distance between corresponding points on successive waves."
    ],
    [
      "Shoaling",
      "The transformation of a wave as it enters shallower water."
    ],
    [
      "Run-up",
      "The maximum inland or uphill reach of tsunami water."
    ]
  ],
  "note": "Not every undersea earthquake produces a tsunami. Broad vertical displacement of the seafloor is especially important.",
  "sources": "Fact-checked against NOAA explanations of earthquake-generated tsunamis, deep-ocean propagation, shoaling, and inundation.",
  "chapters": [
    {
      "id": "source",
      "cards": [
        [
          "strain",
          "A locked plate boundary stores elastic strain"
        ],
        [
          "rupture",
          "The fault ruptures in an undersea earthquake"
        ],
        [
          "bottom",
          "A broad area of seafloor rises and falls"
        ],
        [
          "water",
          "The seafloor movement displaces the water above it"
        ]
      ]
    },
    {
      "id": "travel",
      "cards": [
        [
          "spread",
          "Long wave fronts spread away from the source"
        ],
        [
          "cross",
          "The tsunami crosses deep ocean rapidly"
        ],
        [
          "low",
          "The offshore wave height remains modest"
        ],
        [
          "shelf",
          "The waves reach the shallower continental margin"
        ]
      ]
    },
    {
      "id": "coast",
      "cards": [
        [
          "slow",
          "The wave slows near the coast"
        ],
        [
          "grow",
          "The wavelength shortens and the water height grows"
        ],
        [
          "current",
          "Strong currents reach the shoreline"
        ],
        [
          "flood",
          "Tsunami run-up floods inland areas"
        ]
      ]
    }
  ],
  "chapterOrder": [
    "source",
    "travel",
    "coast"
  ],
  "segues": [
    "The sea surface is now broadly raised and lowered above the earthquake source. Gravity turns that displaced water into long waves that can carry energy across an ocean basin.",
    "The wave energy is now entering progressively shallower water. Less depth changes the wave’s speed and shape, concentrating its visible effects near the coast."
  ],
  "principles": [
    [
      "An earthquake is not enough by itself",
      "A large tsunami requires broad displacement of the water, often from vertical seafloor motion."
    ],
    [
      "Trace the transfer of energy",
      "Stored deformation moves the crust, the crust moves water, and gravity turns the displaced water into waves."
    ],
    [
      "Deep water hides the danger",
      "A tsunami can move rapidly offshore while its surface height remains modest."
    ],
    [
      "Water depth transforms the wave",
      "Approaching shallow water changes speed, wavelength, height, and current strength."
    ]
  ],
  "hints": [
    "The fault ruptures before a broad area of seafloor rises and falls.",
    "The waves reach the shallow continental margin before the wave slows near the coast."
  ],
  "intro": "A section of an offshore plate boundary is locked by friction while tectonic motion continues to deform the surrounding rock. Sequence A must convert stored deformation into a broad disturbance of the ocean.",
  "collection": "Core collection"
}
```

## Ballpark
A topic = `eqs` (each an equation with `factors`[{label,unit,value,display,desc,source{label,url,accessed}}], `ops`, `answer`, `answerDisplay`, `explain`, `revealQ`, `sources`). Every factor value needs a real source or a defined conversion. All factor values across the eqs form one shared bank; no two should share a display value.
Top-level fields: `id`, `title`, `casebookTitle`, `tag`, `context`, `terms`, `eqs`, `sourceSummary`, `mission`, `goals`

```json
{
  "id": "bp_j_fraud",
  "title": "Corporate Accounting Fraud by the Numbers",
  "casebookTitle": "The Amberline Collapse",
  "tag": "accounting · market value · fraud",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Market capitalization",
      "Share price multiplied by shares outstanding."
    ],
    [
      "Special-purpose entity",
      "Separate legal entity sometimes used to move risk or debt."
    ],
    [
      "Restatement",
      "Correction of previously reported financial statements."
    ],
    [
      "Going concern",
      "Assumption that a business will continue operating."
    ]
  ],
  "eqs": [
    {
      "id": "enron_employee",
      "q": "Peak market value: estimate the result in dollars per employee using the real-world facts below.",
      "unit": "dollars per employee",
      "factors": [
        {
          "label": "Peak market value",
          "unit": "dollars",
          "value": 70000000000,
          "display": "70,000,000,000",
          "desc": "Widely reported Enron market-cap scale.",
          "source": {
            "label": "SEC — Enron litigation release",
            "url": "https://www.sec.gov/news/press/2002-144.htm",
            "accessed": "2026-07-18"
          },
          "id": "enron_employee_f0",
          "playDesc": "Widely reported Enron market-cap scale."
        },
        {
          "label": "Employees",
          "unit": "employees",
          "value": 20000,
          "display": "20,000",
          "desc": "Workforce scale before collapse.",
          "source": {
            "label": "SEC — Enron litigation release",
            "url": "https://www.sec.gov/news/press/2002-144.htm",
            "accessed": "2026-07-18"
          },
          "id": "enron_employee_f1",
          "playDesc": "Workforce scale before collapse."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 3500000,
      "answerDisplay": "3,500,000",
      "explain": "Divide market value by employees.",
      "revealQ": "How many dollars of peak market value corresponded to each of Enron’s twenty thousand employees?",
      "sources": [
        {
          "label": "SEC — Enron litigation release",
          "url": "https://www.sec.gov/news/press/2002-144.htm",
          "accessed": "2026-07-18"
        }
      ],
      "purpose": "This converts a large total or system specification into an operating rate that can be compared with daily capacity.",
      "prompt": "What rate follows, measured in dollars per employee?"
    },
    {
      "id": "stock_ratio",
      "q": "Peak share price: estimate the result in times using the real-world facts below.",
      "unit": "times",
      "factors": [
        {
          "label": "Peak share price",
          "unit": "dollars",
          "value": 90.75,
          "display": "90.75",
          "desc": "Historical Enron peak.",
          "source": {
            "label": "SEC — Enron litigation release",
            "url": "https://www.sec.gov/news/press/2002-144.htm",
            "accessed": "2026-07-18"
          },
          "id": "stock_ratio_f0",
          "playDesc": "Historical Enron peak."
        },
        {
          "label": "Collapsed share price",
          "unit": "dollars",
          "value": 0.26,
          "display": "0.26",
          "desc": "Late-collapse price scale.",
          "source": {
            "label": "SEC — Enron litigation release",
            "url": "https://www.sec.gov/news/press/2002-144.htm",
            "accessed": "2026-07-18"
          },
          "id": "stock_ratio_f1",
          "playDesc": "Late-collapse price scale."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 349.03846153846155,
      "answerDisplay": "349.04",
      "explain": "Divide peak price by collapsed price.",
      "revealQ": "How many times higher was a 90.75-dollar share price than twenty-six cents?",
      "sources": [
        {
          "label": "SEC — Enron litigation release",
          "url": "https://www.sec.gov/news/press/2002-144.htm",
          "accessed": "2026-07-18"
        }
      ],
      "purpose": "This turns separate facts into an interpretable comparison or risk measure.",
      "prompt": "What result follows, measured in times?"
    },
    {
      "id": "shareholder_loss",
      "q": "Shares outstanding: estimate the result in dollars using the real-world facts below.",
      "unit": "dollars",
      "factors": [
        {
          "label": "Shares outstanding",
          "unit": "shares",
          "value": 752000000,
          "display": "752,000,000",
          "desc": "Historical share-count scale.",
          "source": {
            "label": "SEC — Enron litigation release",
            "url": "https://www.sec.gov/news/press/2002-144.htm",
            "accessed": "2026-07-18"
          },
          "id": "shareholder_loss_f0",
          "playDesc": "Historical share-count scale."
        },
        {
          "label": "Pre-collapse share value",
          "unit": "dollars per share",
          "value": 83.13,
          "display": "83.13",
          "desc": "Historical price scale.",
          "source": {
            "label": "SEC — Enron litigation release",
            "url": "https://www.sec.gov/news/press/2002-144.htm",
            "accessed": "2026-07-18"
          },
          "id": "shareholder_loss_f1",
          "playDesc": "Historical price scale."
        },
        {
          "label": "Fraction lost",
          "unit": "fraction",
          "value": 0.997,
          "display": "0.997",
          "desc": "Near-total loss fraction.",
          "source": {
            "label": "SEC — Enron litigation release",
            "url": "https://www.sec.gov/news/press/2002-144.htm",
            "accessed": "2026-07-18"
          },
          "id": "shareholder_loss_f2",
          "playDesc": "Near-total loss fraction."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "answer": 62326218720,
      "answerDisplay": "62,326,218,720",
      "explain": "Shares times price gives market value; multiply by fraction lost.",
      "revealQ": "What value is lost when 752 million shares at 83.13 dollars lose 99.7 percent?",
      "sources": [
        {
          "label": "SEC — Enron litigation release",
          "url": "https://www.sec.gov/news/press/2002-144.htm",
          "accessed": "2026-07-18"
        }
      ],
      "purpose": "This reveals the financial scale relevant to oversight, planning, or loss.",
      "prompt": "What result follows, measured in dollars?"
    },
    {
      "id": "worldcom_per_year",
      "q": "Fraud pace: How much accounting misstatement accumulated per year?",
      "unit": "dollars per year",
      "factors": [
        {
          "label": "WorldCom fraud",
          "unit": "dollars",
          "value": 11000000000,
          "display": "11,000,000,000",
          "desc": "Documented accounting-fraud scale.",
          "source": {
            "label": "SEC — Enron litigation release",
            "url": "https://www.sec.gov/news/press/2002-144.htm",
            "accessed": "2026-07-18"
          },
          "id": "worldcom_employee_year_f0",
          "playDesc": "Documented accounting-fraud scale."
        },
        {
          "label": "Fraud period",
          "unit": "years",
          "value": 5,
          "display": "5",
          "desc": "Approximate concealment period.",
          "source": {
            "label": "SEC — Enron litigation release",
            "url": "https://www.sec.gov/news/press/2002-144.htm",
            "accessed": "2026-07-18"
          },
          "id": "worldcom_employee_year_f2",
          "playDesc": "Approximate concealment period."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 2200000000,
      "answerDisplay": "2,200,000,000",
      "explain": "Divide the total misstatement by the duration to reveal the rate at which the concealed problem grew.",
      "revealQ": "What average annual fraud amount corresponds to eleven billion dollars accumulated over five years?",
      "sources": [
        {
          "label": "SEC — Enron litigation release",
          "url": "https://www.sec.gov/news/press/2002-144.htm",
          "accessed": "2026-07-18"
        },
        {
          "label": "SEC — Enron litigation release",
          "url": "https://www.sec.gov/news/press/2002-144.htm",
          "accessed": "2026-07-18"
        }
      ],
      "purpose": "Annual growth of the fraud is meaningful for audit detection; dollars per employee-year was not.",
      "prompt": "How much accounting misstatement accumulated per year?"
    }
  ],
  "sourceSummary": "Every playable value is linked to an official, institutional, scholarly, or defined-conversion source in the reveal.",
  "mission": "You are reconstructing a corporate fraud. Compare market value, share collapse, total losses, and fraud duration to understand how accounting manipulation harms workers and investors.",
  "goals": [
    "Operating rate: What rate follows, measured in dollars per employee?",
    "Risk or comparison: What result follows, measured in times?",
    "Shares outstanding: What result follows, measured in dollars?",
    "Fraud pace: How much accounting misstatement accumulated per year?"
  ]
}
```

## Diagnosis
ADVANCED. A whole instrument panel that must be internally consistent: every candidate fault's signature must match/mismatch each gauge so exactly one fault (or compound) fits ALL readings. Author only if you can guarantee that consistency; expect heavy verification.
Top-level fields: `id`, `title`, `domain`, `role`, `intro`, `system`, `salient`, `readings`, `hypotheses`, `dismissal`, `reassuring`, `rounds`, `schematic`, `scopeNote`

```json
{
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
        "x": 205,
        "y": 35
      },
      "zone": "vessel"
    },
    "co2": {
      "name": "Exhaust CO₂",
      "purpose": "Measures carbon dioxide leaving the fermenter. Rising CO₂ usually indicates greater biological metabolism rather than an isolated oxygen-probe problem.",
      "pin": {
        "x": 490,
        "y": 80
      },
      "zone": "off-gas"
    },
    "ph": {
      "name": "Broth pH",
      "purpose": "Shows net acid and base production. Rapid acidification can accompany excess feed or an unwanted organism.",
      "pin": {
        "x": 250,
        "y": 355
      },
      "zone": "vessel"
    },
    "agit": {
      "name": "Agitator speed",
      "purpose": "Higher agitation increases oxygen-transfer capacity. A drive or control limit can leave oxygen demand above supply.",
      "pin": {
        "x": 165,
        "y": 355
      },
      "zone": "drive"
    },
    "feed": {
      "name": "Carbon-feed rate",
      "purpose": "Records substrate addition. Excess feed can increase respiration and overflow byproducts; a scheduled ramp is expected and documented.",
      "pin": {
        "x": 30,
        "y": 100
      },
      "zone": "feed"
    },
    "offo2": {
      "name": "Exhaust O₂",
      "purpose": "Oxygen remaining in the exhaust reflects how much the culture consumes. Low exhaust O₂ corroborates true high oxygen demand.",
      "pin": {
        "x": 490,
        "y": 135
      },
      "zone": "off-gas"
    },
    "micro": {
      "name": "Rapid microscopy / qPCR",
      "purpose": "Checks whether the intended organism remains dominant. A second morphology or organism-specific signal supports contamination.",
      "pin": {
        "x": 490,
        "y": 245
      },
      "zone": "laboratory"
    },
    "do2": {
      "name": "Redundant dissolved-O₂ probe",
      "purpose": "A separately calibrated probe cross-checks the primary channel. Disagreement points to fouling or calibration drift.",
      "pin": {
        "x": 270,
        "y": 35
      },
      "zone": "vessel"
    },
    "feeddev": {
      "name": "Feed actual-minus-command",
      "purpose": "Compares metered substrate flow with the controller command. A positive deviation means the hardware is delivering more substrate than the recipe requests; a scheduled ramp raises both together.",
      "pin": {
        "x": 30,
        "y": 160
      },
      "zone": "feed"
    },
    "qpcr": {
      "name": "Contaminant qPCR",
      "purpose": "Detects non-production-organism DNA. A positive molecular result supports contamination, but must be combined with microscopy because sample or assay contamination can create a false positive.",
      "pin": {
        "x": 490,
        "y": 305
      },
      "zone": "laboratory"
    }
  },
  "hypotheses": {
    "contam": {
      "label": "Viscosity-producing microbial contamination",
      "choice": "A second organism changes gas production and pH while increasing broth viscosity enough to push mixing toward its torque limit.",
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
        "qpcr": "positive"
      }
    },
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
        "qpcr": "negative"
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
        "qpcr": "negative"
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
        "qpcr": "negative"
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
        "qpcr": "negative"
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
        "qpcr": "negative"
      }
    },
    "labartifact": {
      "label": "Laboratory sampling or assay artifact",
      "choice": "The process remains biologically coherent, but the sampled microscopy and molecular results are both misleading because the specimen or laboratory workflow was compromised.",
      "call": {
        "title": "Repeat independent biological sampling.",
        "arg": "Quarantine the interpretation, not the batch, until a fresh independently handled sample confirms the laboratory result."
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
        "qpcr": "positive"
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
      "riddle": "Biological demand has increased. <span class=\"q\">Is oxygen delivery failing, or is the culture receiving more substrate than intended?</span>",
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
        }
      },
      "reasons": {
        "oxygen": "Oxygen-transfer limitation can lower both DO probes, but it does not explain the 54 L/h feed excess, the strong CO₂ rise, and rapid acidification while agitation remains available.",
        "contam": "Contamination can raise CO₂ and lower pH, but the feed discrepancy directly supplies the extra substrate and microscopy remains clean.",
        "probe": "A fouled probe would disagree with the redundant probe and would not lower exhaust O₂ or raise CO₂.",
        "ramp": "A scheduled ramp would match the command record. Actual feed is 146 L/h against a 92 L/h command, and DO has left the validated range.",
        "flowbias": "The flow-deviation channel is high, but true overfeeding also changes DO, CO₂, pH, and both oxygen probes. Those independent process responses are present.",
        "labartifact": "A laboratory artifact can imitate the biological tests, but it cannot produce the vessel’s gas-balance, feed-response, and actuator pattern."
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
      "alarm": "agit",
      "poleA": {
        "lab": "Mixing authority",
        "val": "520 rpm with controller at torque limit",
        "note": "The controller is demanding more transfer capacity than the drive can deliver."
      },
      "hook": "The culture enters its highest-demand phase, and dissolved oxygen collapses. Feed and pH remain on recipe.",
      "riddle": "The controller is already asking for more mixing. <span class=\"q\">What do the gas balance and command-response records say about whether oxygen transfer has reached a real ceiling?</span>",
      "vals": {
        "do": {
          "observed": "34% → 7% air saturation / 12 min",
          "reference": "Target 25–45%"
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
          "observed": "520 rpm; controller at torque limit",
          "reference": "Validated range 720–850 rpm"
        },
        "feed": {
          "observed": "91–93 L/h",
          "reference": "Command 92 L/h"
        },
        "offo2": {
          "observed": "18.0% → 12.8%",
          "reference": "Typical 16–19%"
        },
        "micro": {
          "observed": "Production morphology only",
          "reference": "No secondary morphology expected"
        },
        "do2": {
          "observed": "8% air saturation",
          "reference": "Agreement target ±4 percentage points"
        },
        "feeddev": {
          "observed": "+1 L/h",
          "reference": "Expected difference ±3 L/h"
        },
        "qpcr": {
          "observed": "Not detected",
          "reference": "Expected not detected"
        }
      },
      "reasons": {
        "overfeed": "Overfeed shares the low-DO alarm, but it should increase exhaust CO₂, acid production, and measured feed. All three remain near baseline.",
        "contam": "Contamination would change the biological test or chemistry; microscopy is clean and pH is stable.",
        "probe": "Probe fouling shares low DO with normal CO₂, but both DO probes agree and exhaust O₂ also falls, proving real oxygen consumption.",
        "ramp": "The scheduled ramp also gives low DO, normal CO₂, low off-gas oxygen, and an agitator at its limit. But its feed is intentionally high; here feed remains at the base recipe.",
        "flowbias": "A feed-meter bias does not make both DO probes fall or drive the agitator to its transfer ceiling.",
        "labartifact": "A laboratory artifact can imitate the biological tests, but it cannot produce the vessel’s gas-balance, feed-response, and actuator pattern."
      },
      "resolve": {
        "title": "Oxygen-transfer limitation",
        "paras": [
          "Both broth probes and the exhaust-oxygen balance show real oxygen depletion. The agitator is stuck at 520 rpm against a 720–850 rpm validated range, so the vessel cannot transfer oxygen fast enough even though feed and metabolism remain otherwise ordinary.",
          "The loud readings leave three viable explanations. No quiet gauge solves it alone: the second DO probe proves the deficit is real but still fits a scheduled ramp, while the normal feed rate rejects the ramp but still fits a probe fault. Those two quiet clues together force oxygen-transfer limitation."
        ],
        "why": {
          "loud": "<b>Why the loud readings tie:</b> both real transfer loss and a bad primary probe can show low DO without a CO₂ surge.",
          "quiet": "<b>Why the tie breaks:</b> a second broth probe and exhaust-gas oxygen independently confirm the biological oxygen deficit."
        },
        "chain": [
          "Agitator reaches a mechanical limit",
          "Gas-to-liquid oxygen transfer falls below demand",
          "Both probes fall despite normal feed"
        ],
        "take": "When a concentration sensor alarms, verify the underlying material balance with an independent inlet or exhaust measurement."
      },
      "logic": [
        [
          "Low DO + normal CO₂",
          "Oxygen-transfer loss, DO-probe fault, or scheduled oxygen-demand ramp remain"
        ],
        [
          "Both DO probes low",
          "Probe fault falls away; real oxygen deficit remains"
        ],
        [
          "Feed at base recipe",
          "Scheduled ramp falls away"
        ],
        [
          "Agitator at approved ceiling + low exhaust O₂",
          "Oxygen-transfer limitation remains"
        ]
      ]
    },
    {
      "answer": "overfeed",
      "alarm": "co2",
      "experimental": false,
      "compound": [
        "overfeed",
        "contam"
      ],
      "observed": {
        "do": "low",
        "co2": "high",
        "ph": "down",
        "agit": "limited",
        "feed": "high",
        "offo2": "low",
        "micro": "positive",
        "do2": "low",
        "feeddev": "positive",
        "qpcr": "positive"
      },
      "poleA": {
        "lab": "Metabolic load",
        "val": "CO₂ 7.4%; DO 6%",
        "note": "Excess substrate demand and an independent biological anomaly appear together."
      },
      "hook": "The gas balance resembles an overfeed, but microscopy also detects a second organism. No single explanation covers both the control error and the biological evidence.",
      "riddle": "The gas balance shows excess substrate demand, while independent biology shows a second organism. <span class=\"q\">Which two causes are active together?</span>",
      "vals": {
        "do": {
          "observed": "39% → 6% air saturation / 20 min",
          "reference": "Target 25–45%"
        },
        "co2": {
          "observed": "3.2% → 7.4% dry exhaust",
          "reference": "Typical 2.5–4.0%"
        },
        "ph": {
          "observed": "6.91 → 6.51 / 35 min",
          "reference": "Control band 6.80–7.00"
        },
        "agit": {
          "observed": "520 rpm; controller at torque limit",
          "reference": "Validated range 720–850 rpm"
        },
        "feed": {
          "observed": "138 L/h actual; 92 L/h command",
          "reference": "Normal ±3 L/h"
        },
        "offo2": {
          "observed": "17.6% → 11.4%",
          "reference": "Typical 16–19%"
        },
        "micro": {
          "observed": "Secondary coccoid population; qPCR positive",
          "reference": "Expected production organism only"
        },
        "do2": {
          "observed": "7% air saturation",
          "reference": "Agreement target ±4 percentage points"
        },
        "feeddev": {
          "observed": "+44 L/h",
          "reference": "Expected difference ±3 L/h"
        },
        "qpcr": {
          "observed": "Ct 21, repeated positive",
          "reference": "Expected not detected"
        }
      },
      "reasons": {
        "overfeed": "The feed excess explains the oxygen draw, CO₂ rise, and acidification, but it cannot create a second organism or positive contaminant qPCR.",
        "oxygen": "Transfer limitation can lower DO, but agitation is normal and it cannot explain the excessive feed or positive biological assay.",
        "contam": "Contamination explains the independent organism and part of the chemistry, but it does not explain why feed is 46 L/h above command.",
        "probe": "A probe problem cannot change exhaust gases, pH, feed flow, microscopy, and the redundant probe together.",
        "ramp": "The feed is not following the scheduled command, and a validated ramp cannot produce a positive contaminant assay.",
        "flowbias": "It explains the positive feed deviation but not the truly high feed rate, foreign-cell morphology, qPCR result, or metabolic response.",
        "labartifact": "A laboratory artifact can imitate the biological tests, but it cannot produce the vessel’s gas-balance, feed-response, and actuator pattern."
      },
      "resolve": {
        "title": "Substrate overfeed + microbial contamination",
        "paras": [
          "Two process changes are present. The feed system is delivering 44 L/h above command, increasing substrate demand and carbon-dioxide production. Independent microscopy and qPCR identify a second organism, while rising broth resistance pushes the agitator to its torque limit and further restricts oxygen transfer.",
          "Neither cause closes the panel alone. Overfeed explains the positive feed deviation and gas demand but not the independent biological findings or torque-limited mixing. Contamination explains the organism-specific evidence and viscosity effect but not the excess substrate delivery. Four independent clues force the pair."
        ],
        "why": {
          "loud": "<b>Why one cause fails:</b> the gas response can be driven by extra substrate or a second organism, but the feed and laboratory evidence separate them.",
          "quiet": "<b>Why the pair is forced:</b> feed deviation + high feed prove overdelivery; microscopy/qPCR + torque-limited mixing prove contamination."
        },
        "chain": [
          "Feed hardware delivers excess substrate",
          "Contaminant increases biological demand and broth resistance",
          "Combined demand and transfer loss collapse dissolved oxygen"
        ],
        "take": "When control data and biological identity each provide independent evidence, do not force both into one process explanation."
      },
      "logic": [
        [
          "Feed 138 L/h vs 92 L/h command",
          "Overfeed or feed-meter bias remain"
        ],
        [
          "Actual-minus-command +44 L/h",
          "Real substrate overdelivery remains"
        ],
        [
          "Microscopy + qPCR positive",
          "Contamination or laboratory artifact remain"
        ],
        [
          "Torque-limited mixing",
          "Viscosity-producing contamination or transfer limitation remain"
        ],
        [
          "All four relationships together",
          "Only overfeed + contamination closes the vessel response"
        ]
      ]
    }
  ],
  "schematic": {
    "viewBox": "0 0 520 390",
    "svg": "<defs><linearGradient id=\"cleanBg\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#bbe0ef\"/><stop offset=\"1\" stop-color=\"#e1f0f8\"/></linearGradient><marker id=\"cleanArrow\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto\"><path d=\"M0 0 L10 5 L0 10 z\" fill=\"#107096\"/></marker><style>.clean-border{fill:url(#cleanBg);stroke:#8cacbd;stroke-width:2}.component{fill:#b2d1e4;stroke:#3b5e6f;stroke-width:1.7}.component2{fill:#9ec6db;stroke:#3b5e6f;stroke-width:1.7}.flow{fill:none;stroke:#107096;stroke-width:3;marker-end:url(#cleanArrow)}.flow2{fill:none;stroke:#a0781f;stroke-width:3;marker-end:url(#cleanArrow)}.leader{fill:none;stroke:#547080;stroke-width:1.25;stroke-linecap:round;stroke-linejoin:round;opacity:.78}.anchor{fill:#375565}.slabel{fill:#041015;font:700 10.5px Inter,system-ui,sans-serif}.labelbg{fill:#dcedf7;stroke:#96b8ca;stroke-width:1;opacity:.94}</style></defs><rect x=\"12\" y=\"12\" width=\"496\" height=\"366\" rx=\"24\" class=\"clean-border\"/><path d=\"M 30 100 L 58 100 L 58 145 L 132 145\" class=\"leader\"/><circle cx=\"132\" cy=\"145\" r=\"2.4\" class=\"anchor\"/><path d=\"M 30 160 L 58 160 L 58 168 L 148 168\" class=\"leader\"/><circle cx=\"148\" cy=\"168\" r=\"2.4\" class=\"anchor\"/><path d=\"M 205 35 L 205 68 L 220 68 L 220 175\" class=\"leader\"/><circle cx=\"220\" cy=\"175\" r=\"2.4\" class=\"anchor\"/><path d=\"M 270 35 L 270 68 L 270 68 L 270 175\" class=\"leader\"/><circle cx=\"270\" cy=\"175\" r=\"2.4\" class=\"anchor\"/><path d=\"M 250 355 L 250 327 L 250 327 L 250 238\" class=\"leader\"/><circle cx=\"250\" cy=\"238\" r=\"2.4\" class=\"anchor\"/><path d=\"M 165 355 L 165 327 L 205 327 L 205 286\" class=\"leader\"/><circle cx=\"205\" cy=\"286\" r=\"2.4\" class=\"anchor\"/><path d=\"M 490 80 L 462 80 L 462 92 L 370 92\" class=\"leader\"/><circle cx=\"370\" cy=\"92\" r=\"2.4\" class=\"anchor\"/><path d=\"M 490 135 L 462 135 L 462 135 L 405 135\" class=\"leader\"/><circle cx=\"405\" cy=\"135\" r=\"2.4\" class=\"anchor\"/><path d=\"M 490 245 L 462 245 L 462 260 L 398 260\" class=\"leader\"/><circle cx=\"398\" cy=\"260\" r=\"2.4\" class=\"anchor\"/><path d=\"M 490 305 L 462 305 L 462 300 L 425 300\" class=\"leader\"/><circle cx=\"425\" cy=\"300\" r=\"2.4\" class=\"anchor\"/><rect x=\"52\" y=\"116\" width=\"78\" height=\"52\" rx=\"10\" class=\"component\"/><path d=\"M130 142 H161\" class=\"flow\"/><ellipse cx=\"245\" cy=\"202\" rx=\"83\" ry=\"118\" class=\"component2\"/><path d=\"M245 105 V66\" class=\"flow\"/><rect x=\"222\" y=\"74\" width=\"46\" height=\"20\" rx=\"6\" class=\"component\"/><path d=\"M245 150 V276\" stroke=\"#a37b20\" stroke-width=\"7\"/><path d=\"M220 188 H270 M220 235 H270\" stroke=\"#a37b20\" stroke-width=\"5\"/><path d=\"M245 300 V322 H194\" class=\"flow\"/><circle cx=\"370\" cy=\"92\" r=\"18\" class=\"component\"/><circle cx=\"405\" cy=\"135\" r=\"18\" class=\"component\"/><rect x=\"354\" y=\"238\" width=\"105\" height=\"82\" rx=\"12\" class=\"component\"/><path d=\"M372 262 h28 M386 248 v28\" stroke=\"#2a7449\" stroke-width=\"3\"/><rect x=\"407\" y=\"253\" width=\"30\" height=\"48\" rx=\"5\" class=\"component2\"/><g><rect x=\"51.0\" y=\"172.5\" width=\"78\" height=\"23\" rx=\"11.5\" class=\"labelbg\"/><text x=\"90\" y=\"187.7\" text-anchor=\"middle\" class=\"slabel\">feed skid</text></g><g><rect x=\"201.0\" y=\"320.5\" width=\"88\" height=\"23\" rx=\"11.5\" class=\"labelbg\"/><text x=\"245\" y=\"335.7\" text-anchor=\"middle\" class=\"slabel\">agitator</text></g><g><rect x=\"209.0\" y=\"105.5\" width=\"72\" height=\"23\" rx=\"11.5\" class=\"labelbg\"/><text x=\"245\" y=\"120.7\" text-anchor=\"middle\" class=\"slabel\">vessel</text></g><g><rect x=\"341.0\" y=\"43.5\" width=\"92\" height=\"23\" rx=\"11.5\" class=\"labelbg\"/><text x=\"387\" y=\"58.7\" text-anchor=\"middle\" class=\"slabel\">off-gas</text></g><g><rect x=\"368.0\" y=\"323.5\" width=\"76\" height=\"23\" rx=\"11.5\" class=\"labelbg\"/><text x=\"406\" y=\"338.7\" text-anchor=\"middle\" class=\"slabel\">lab checks</text></g>"
  },
  "scopeNote": "Educational process-diagnosis model; real manufacturing decisions require the facility’s validated procedures and quality system."
}
```

## Casebook
ADVANCED. Three-informant deduction with a Who/Where/What solution and clue-tagged multiple-choice questions. Many interlocking fields; only the 'expert'-tagged option files a clue. Author only by mimicking this template field-for-field; expect heavy verification.
Top-level fields: `schemaVersion`, `mode`, `id`, `title`, `discipline`, `venue`, `agent`, `standingLabel`, `readingShort`, `readingLabel`, `dossierName`, `enterLabel`, `subt`, `DAYS_TOTAL`, `teaser`, `overclaimTag`, `truthTag`, `emblem`, `overclaimTease`, `CATS`, `READING_ORDER`, `CHARACTERS`, `TOPICS`, `story`, `endings`

```json
{
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "m_tunnel",
  "title": "The Kingsgate Bore",
  "discipline": "Tunnelling & Ground Engineering",
  "venue": "the Kingsgate tunnel inquiry",
  "agent": {
    "name": "Inspector Mabel Crane",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Tunnelling & Ground Pioneers",
  "dossierName": "TUNNELLING & GROUND-ENGINEERING PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Kingsgate tunnel inquiry",
  "DAYS_TOTAL": 3,
  "teaser": "A metro tunnel collapses and pulls the street into the excavation. Did gas burst through the crown, did a natural void fail on its own, or did construction-linked ground movement grow visibly while support and intervention lagged?",
  "overclaimTag": "a gas ignition inside the tunnel",
  "truthTag": "a construction-aligned settlement trough allowed to grow",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A soft-ground tunnel beneath a settling street with a void above the lining\"><path d=\"M20 46 H640\" stroke=\"#121212\" stroke-width=\"3\"/><path d=\"M60 46 q80 40 160 0 t160 0 t160 0\" fill=\"none\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><path d=\"M180 110 a70 70 0 0 1 140 0\" fill=\"none\" stroke=\"#121212\" stroke-width=\"5\"/><path d=\"M205 110 a45 45 0 0 1 90 0\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/><path d=\"M250 44 l-15 24 16 6 -10 30 34-40 -16-7 12-23z\" fill=\"#B3261E\"/></svg>",
  "overclaimTease": "Compare the shape and timing recorded at the face, the street, and the project files. An explosion, a natural void, and construction-linked ground loss do not move the same way.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "tn_contractor",
      "items": [
        {
          "id": "tn_engineer",
          "label": "The tunnel design engineer"
        },
        {
          "id": "tn_inspector",
          "label": "The transit-authority inspector"
        },
        {
          "id": "tn_contractor",
          "label": "Emil Radek — tunnelling contractor"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "tn_surface",
      "items": [
        {
          "id": "tn_surface",
          "label": "The Surface Settlement Network"
        },
        {
          "id": "tn_face",
          "label": "The Tunnel Face & Shield"
        },
        {
          "id": "tn_office",
          "label": "The Contractor’s Site Office"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "tn_settlement",
      "items": [
        {
          "id": "tn_explosion",
          "label": "A gas ignition and pressure burst shattered the tunnel crown"
        },
        {
          "id": "tn_settlement",
          "label": "Ground loss grew as grouting and monitoring fell behind"
        },
        {
          "id": "tn_sinkhole",
          "label": "A natural void collapsed independently of construction"
        }
      ]
    }
  },
  "READING_ORDER": [
    "tn_miner",
    "tn_surveyor",
    "tn_clerk"
  ],
  "CHARACTERS": {
    "tn_miner": {
      "name": "Miner Jud Kolb",
      "role": "Tunnel-face miner",
      "face": "⛏️",
      "badge": "J",
      "legend": "the shield",
      "hint": "Short grout runs left annular void behind the shield as production targets tightened.",
      "reading": "tn_marcbrunel"
    },
    "tn_surveyor": {
      "name": "The Monitoring Surveyor",
      "role": "Ground-settlement surveyor",
      "face": "📐",
      "badge": "S",
      "legend": "the street network",
      "hint": "Street markers formed a widening trough that tracked the tunnel advance for days.",
      "reading": "tn_greathead"
    },
    "tn_clerk": {
      "name": "The Site Records Clerk",
      "role": "Construction records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the contractor office",
      "hint": "One contractor directive cut grout, raised intervention limits, and ordered work to continue through the measured movement.",
      "reading": "tn_rabcewicz"
    }
  },
  "TOPICS": {
    "tn_marcbrunel": {
      "sci": "Marc Isambard Brunel (1769-1849)",
      "topic": "The tunnelling shield",
      "lede": "The émigré engineer who watched a shipworm chew through oak and copied its armored head to drive the first tunnel under a river.",
      "no": 1,
      "profile": "Marc Isambard Brunel was a French-born engineer who, after fleeing the Revolution and building a career in Britain, solved one of the oldest problems in civil engineering: how to dig through soft, waterlogged ground without the roof collapsing on the miners. His inspiration was biological. Watching the shipworm Teredo navalis bore through ship timber, its soft body shielded by hard plates at the head while it lined the hole behind it, he patented in 1818 a tunnelling shield that did the same for men.\n\nBrunel's shield was a great iron frame divided into cells, one miner to each, that held back the earth at the face while workers removed a board's width of soil at a time. As the shield inched forward on screws, bricklayers followed immediately behind, building the permanent lining before the ground could move. With it he drove the Thames Tunnel between Rotherhithe and Wapping from 1825 to 1843 — the first tunnel successfully built beneath a navigable river — through gravel, quicksand, and repeated floods that nearly killed his son Isambard Kingdom Brunel.\n\nAt Kingsgate, Brunel’s principle appears in the gap behind a modern shield. The machine advanced, but tail-void grouting repeatedly stopped short of the specified quantity. Soft ground then had space to migrate toward the lining and surface. The contractor’s production directive explains why support lagged, yet the event culminates in the settlement network: the surface profile records the consequence metre by metre and ties it to the shield’s passage. The geometry preserves that sequence clearly.",
      "frame": "Points from the shield tail to the fresh lining and the annular gap between them. “Soft ground takes every space you leave. Tell me why support must follow the excavation.”",
      "q": [
        {
          "q": "What problem did Brunel’s tunnelling shield solve?",
          "o": [
            {
              "t": "It detected explosive gas before workers entered a new section.",
              "v": "partial",
              "fb": "Gas safety matters, but the shield was invented to support unstable ground during excavation."
            },
            {
              "t": "It drilled hard rock faster by concentrating impact at one cutter.",
              "v": "wrong",
              "fb": "Brunel’s shield addressed soft, waterlogged ground rather than hard-rock boring."
            },
            {
              "t": "It supported soft wet ground at the face while permanent lining followed.",
              "v": "expert",
              "fb": "The shield protected miners and controlled the ground until masonry could hold the opening."
            },
            {
              "t": "It allowed the ground to collapse freely and then filled the crater afterward.",
              "v": "danger",
              "fb": "Controlled support prevents ground loss; accepting collapse would endanger the tunnel and surface."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — lead",
            "text": "Shortened tail-void grouting left room for soft ground to migrate toward the lining and surface."
          }
        },
        {
          "q": "What did Brunel borrow from the shipworm?",
          "o": [
            {
              "t": "A chemical secretion that dissolves soil ahead of the cutting face.",
              "v": "wrong",
              "fb": "The inspiration concerned physical shielding and lining, not chemical excavation."
            },
            {
              "t": "The ability to sense methane pockets before the cutting head reached them.",
              "v": "partial",
              "fb": "Shipworms did not provide the gas-detection principle."
            },
            {
              "t": "A method for moving fast enough that clay could not settle behind the shield.",
              "v": "danger",
              "fb": "Speed without support can increase ground loss rather than prevent it."
            },
            {
              "t": "An armored head that advances while the opening is lined immediately behind.",
              "v": "expert",
              "fb": "The biological model combined protected excavation with prompt support of the new hole."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — lead",
            "text": "Face crews recorded shortened grout runs, but the quantity reduction came from the contractor controlling production targets."
          }
        },
        {
          "q": "Where is the effect of support lag most clearly reconstructed over time?",
          "o": [
            {
              "t": "At the shield controls showing the machine’s daily production rate.",
              "v": "partial",
              "fb": "Production rate supplies context but does not measure surface movement."
            },
            {
              "t": "Across the surface markers that deepen behind the advancing shield.",
              "v": "expert",
              "fb": "The settlement network records the moving ground response before failure."
            },
            {
              "t": "Inside the site office where the reduced grout instruction was signed.",
              "v": "wrong",
              "fb": "The office identifies decisions rather than the physical culmination."
            },
            {
              "t": "In one photograph of the street after the final collapse occurred.",
              "v": "danger",
              "fb": "A final image cannot recover the earlier time-dependent trough."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — lead",
            "text": "The first coherent signal is a shallow settlement trough centered over the tunnel alignment behind the shield."
          }
        }
      ]
    },
    "tn_greathead": {
      "sci": "James Henry Greathead (1844-1896)",
      "topic": "The shield & compressed-air tunnelling",
      "lede": "The South-African-born engineer who fused shield, compressed air, and cement grout into the recipe that dug London's deep tube — and named the void that grout must fill.",
      "no": 2,
      "profile": "James Henry Greathead was a civil engineer, born in South Africa and trained in Britain, who took the tunnelling shield from a clever prototype to a mature system. Having worked with Peter Barlow on the Tower Subway in 1869, he went on to build the City & South London Railway, opened in 1890 — the world's first deep-level electric underground railway — using a refined circular shield that became the template for the whole London 'tube.'\n\nGreathead's genius was combination. He drove his shield through wet ground and used compressed air to hold back water where the ground was worst, balancing the air pressure against the water trying to seep in. Most important for this case, he perfected grouting: as the shield advanced, cement grout was pumped under pressure into the annular gap left between the excavated bore and the iron lining behind the shield's tail. This filled the void, locked the lining against the surrounding soil, and stopped the ground from relaxing inward. The tool he used, the grout injector, is still called a Greathead grout pan.\n\nGreathead’s immediate lining and grouting were designed to prevent exactly the volume loss measured at Kingsgate. Survey points formed a broad, construction-aligned trough behind the shield rather than ejecta from an explosion or a localized collapse over an unrelated cavity. Because the trough deepened before the final cave-in, the surface network is not merely aftermath. It is the primary time series showing that the ground-loss mechanism was active, detectable, and still accelerating. It is a moving construction signature.",
      "frame": "Overlays settlement contours on the tunnel alignment and circles the widening trough behind the shield. “Ground loss draws a shape at the surface. Read it before calling the hole natural.”",
      "q": [
        {
          "q": "What combination made Greathead’s shield tunnelling effective in soft ground?",
          "o": [
            {
              "t": "A cylindrical shield, compressed air, segmental lining, and grout behind it.",
              "v": "expert",
              "fb": "The system controlled the face, built support, and filled the gap around the completed lining."
            },
            {
              "t": "Open excavation from the surface followed by rebuilding the street.",
              "v": "wrong",
              "fb": "Greathead’s method enabled deep tunnelling without a continuous open trench."
            },
            {
              "t": "Explosive charges fired ahead of the shield to loosen wet clay.",
              "v": "danger",
              "fb": "Blasting is not the defining soft-ground method and would increase disturbance."
            },
            {
              "t": "A shield alone, with the surrounding ground left to close around the lining.",
              "v": "partial",
              "fb": "The annular void must be managed; grout is essential to limiting movement."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — corroboration",
            "text": "The movement geometry follows construction and lacks the radial damage expected from a pressure burst."
          }
        },
        {
          "q": "Why is grout injected behind segmental tunnel lining?",
          "o": [
            {
              "t": "To increase gas pressure so the face remains easier to excavate.",
              "v": "wrong",
              "fb": "Grout supports the ground; it is not a gas-pressure control medium."
            },
            {
              "t": "To conceal cracks in lining segments from later inspectors.",
              "v": "danger",
              "fb": "Proper grouting is a structural and ground-control operation, not a cosmetic cover."
            },
            {
              "t": "To fill the tail void and limit movement of surrounding ground.",
              "v": "expert",
              "fb": "Unfilled annular space permits soil to migrate and settlement to reach the surface."
            },
            {
              "t": "To lubricate the finished tunnel permanently for train operation.",
              "v": "partial",
              "fb": "Lubrication is not the purpose; filling and support are."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — corroboration",
            "text": "Successive surveys show the trough widening and deepening in step with construction rather than remaining a fixed natural depression."
          }
        },
        {
          "q": "Which surface pattern most strongly links the collapse to shield tunnelling?",
          "o": [
            {
              "t": "One circular depression fixed above an old natural cavity far from the face.",
              "v": "partial",
              "fb": "A fixed isolated depression would better support a natural cavity."
            },
            {
              "t": "Radial debris and pressure damage extending outward from the tunnel crown.",
              "v": "wrong",
              "fb": "Radial pressure damage would support an energetic burst instead of settlement."
            },
            {
              "t": "Random marker changes without spatial or temporal relation to construction.",
              "v": "danger",
              "fb": "Unstructured noise cannot establish a construction-linked mechanism."
            },
            {
              "t": "A widening trough centered on the alignment and following the shield advance.",
              "v": "expert",
              "fb": "A moving alignment-centered trough is the expected signature of construction volume loss."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — corroboration",
            "text": "Survey alerts reached the contractor while advance continued without restoring grout or pausing the shield."
          }
        }
      ]
    },
    "tn_rabcewicz": {
      "sci": "Ladislaus von Rabcewicz (1893-1975)",
      "topic": "The New Austrian Tunnelling Method",
      "lede": "The Austrian engineer who stopped fighting the ground and let it carry its own weight — but only if you measured its every move.",
      "no": 3,
      "profile": "Ladislaus von Rabcewicz was an Austrian civil engineer who, drawing on decades of Alpine tunnelling, formalised in the 1960s what he named the New Austrian Tunnelling Method, or NATM. His central idea overturned an old assumption. Earlier practice treated the ground as a dead load to be held up by a heavy, rigid lining. Rabcewicz argued that the surrounding rock or soil is itself a structural element: if you support it just enough, and let it deform a controlled amount, the ground arches around the opening and carries most of the load itself.\n\nThe method uses a thin, flexible initial support — sprayed concrete (shotcrete) and rock bolts — applied quickly, then permits measured deformation before a final lining goes in. What makes it work, and what makes it dangerous when abused, is monitoring. NATM demands continuous measurement of how the tunnel converges: extensometers, load cells, and survey targets track every millimetre of movement, and the support is adjusted in response. The ground is allowed to move, but only within limits the instruments confirm.\n\nRabcewicz’s observational method turns measurements into decisions. Kingsgate’s convergence and settlement crossed the original action levels, but the contractor raised those levels while cutting grout and maintaining advance. The directive identifies authority; the surface network establishes the failure’s culmination and timing. Together they show a monitored construction process drifting outside its control envelope, not a hidden gas burst or an independent geological surprise. The instruments therefore document both warning and consequence before the pavement finally gives way. Clearly.",
      "frame": "Lays convergence readings and surface alarms beside the directive that raised stop-work thresholds. “Observation only protects you if the measured movement is allowed to change the work.”",
      "q": [
        {
          "q": "What is central to the observational approach associated with Rabcewicz and modern tunnelling?",
          "o": [
            {
              "t": "Fix every support decision permanently before excavation begins and ignore later movement.",
              "v": "wrong",
              "fb": "Observational tunnelling depends on adapting to measured conditions."
            },
            {
              "t": "Install support, measure ground response, and adjust construction as behavior develops.",
              "v": "expert",
              "fb": "The method treats monitoring as feedback that informs support and sequence."
            },
            {
              "t": "Allow large deformation because ground movement tends to strengthen a tunnel.",
              "v": "danger",
              "fb": "Controlled deformation can mobilize strength, but excessive movement is a warning requiring action."
            },
            {
              "t": "Rely on experienced workers’ impressions instead of instruments and surveys.",
              "v": "partial",
              "fb": "Experience matters, yet quantified monitoring is essential to the feedback loop."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — decisive",
            "text": "Ground loss crossed the original intervention limits while work continued under raised thresholds, turning a detected trend into collapse."
          }
        },
        {
          "q": "Why is changing a settlement trigger after movement begins dangerous?",
          "o": [
            {
              "t": "It relabels an escalating response without reducing the underlying deformation.",
              "v": "expert",
              "fb": "A higher threshold changes the rule, not the ground or its trend."
            },
            {
              "t": "It improves safety because fewer alarms allow the team to focus on production.",
              "v": "partial",
              "fb": "Suppressing warnings cannot make the physical response safer."
            },
            {
              "t": "It proves the original trigger was scientifically incorrect from the start.",
              "v": "wrong",
              "fb": "A revision needs new evidence; timing alone does not invalidate the first limit."
            },
            {
              "t": "It prevents surface markers from recording further movement above the tunnel.",
              "v": "danger",
              "fb": "Instrumentation continues to measure movement regardless of the chosen trigger."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — decisive",
            "text": "The full movement history—from early drift to street collapse—is preserved in the Surface Settlement Network."
          }
        },
        {
          "q": "Which record most directly identifies the accountable authority?",
          "o": [
            {
              "t": "The design engineer’s original support plan and monitoring intervention limits.",
              "v": "partial",
              "fb": "The original plan defines the safe baseline but not who authorized departure."
            },
            {
              "t": "The transit inspector’s emergency report and closure order written after collapse.",
              "v": "wrong",
              "fb": "Later findings do not replace the contemporaneous change directive."
            },
            {
              "t": "The signed directive reducing grout and raising intervention limits for schedule.",
              "v": "expert",
              "fb": "One decision links the weakened support and muted monitoring response to the contractor in control."
            },
            {
              "t": "An unsupported theory that a gas pocket vanished after producing the collapse.",
              "v": "danger",
              "fb": "A disappearing-cause theory cannot outweigh progressive movement and construction records."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — decisive",
            "text": "One contractor signed the combined directive cutting support, raising action levels, and ordering uninterrupted advance."
          }
        }
      ]
    }
  },
  "story": [
    "<b>Kingsgate’s street did not disappear without warning; its survey points had been moving before the pavement opened.</b>",
    "Miner Jud Kolb knows what was left behind the shield. The Monitoring Surveyor holds the surface time series. The Site Records Clerk has the production and trigger changes.",
    "A gas burst, a natural void, and construction-linked ground loss produce different shapes in space and time.",
    "The case turns on who let support lag, where the movement became undeniable, and whether the warnings were changed instead of answered."
  ],
  "endings": {
    "overclaimWhat": "tn_explosion",
    "dismissalWhat": "tn_sinkhole",
    "win": {
      "expertTitle": "The Trough Behind the Shield",
      "expert": [
        "You connect Emil Radek, the Surface Settlement Network, and ground loss caused by shortened grouting and raised intervention thresholds.",
        "The alignment-centered moving trough rejects a gas burst and an independent sinkhole. The contractor’s combined directive explains why the detectable movement was allowed to deepen."
      ],
      "soundTitle": "The Settlement Record",
      "sound": [
        "Your accusation identifies the contractor, the surface network, and construction-linked ground loss.",
        "Some grout or threshold details remain incomplete, but the spatial and temporal pattern supports the conclusion."
      ],
      "namedTitle": "Right Mechanism, Thin Survey",
      "named": [
        "You select the correct person, place, and mechanism.",
        "The verdict holds, though missed clues leave parts of the settlement progression or directive chain less complete."
      ]
    },
    "overclaim": {
      "title": "No Pressure-Burst Pattern",
      "body": [
        "The ground moved as a widening trough behind the shield, without radial crown damage or ejecta.",
        "The dramatic final collapse should not be mistaken for evidence of an explosion."
      ]
    },
    "dismissal": {
      "title": "The Void Followed the Work",
      "body": [
        "A natural cavity would not normally track the shield alignment and advance over successive surveys.",
        "The monitored geometry ties the ground loss to construction rather than fate."
      ]
    },
    "wrongNames": {
      "title": "The Settlement, Misassigned",
      "body": [
        "You recognize construction-linked ground loss but place authority or culmination away from the contractor and surface network that establish the chain."
      ]
    }
  }
}
```

## Science Tank (one round package)
ADVANCED. A Science Tank *game* = 3 round packages grouped by a GAME_SETS entry. Each round has ~3 concealed 'ideas' with a reveal (returnMultiplier, impactTier). Economics must be historically defensible. Author only by mimicking this template; expect heavy verification.
Top-level fields: `id`, `sequence`, `category`, `title`, `discipline`, `era`, `connection`, `briefing`, `difficulty`, `judgmentCall`, `rankingCaveat`, `contentWarnings`, `ideas`, `debrief`, `sources`, `roundStructure`, `calibrationTarget`, `calibrationRationale`, `pitchYear`

```json
{
  "id": "william-perkin-s-dye-laboratory",
  "sequence": 11,
  "category": "Chemistry and Materials",
  "title": "William Perkin’s Dye Laboratory",
  "discipline": "organic chemistry",
  "era": "1850s–1870s",
  "connection": "Same chemist and the birth of industrial synthetic organic chemistry.",
  "briefing": "A young chemist can commercialize an accidental purple dye, a synthetic version of an important natural red dye, or a portfolio of additional fashion colors",
  "difficulty": "intermediate",
  "judgmentCall": false,
  "rankingCaveat": "",
  "contentWarnings": [],
  "ideas": [
    {
      "concealedTitle": "Unexpected Purple Coal-Tar Dye",
      "pitch": "An attempted medicinal synthesis leaves a vivid purple residue that binds strongly to silk. For “Unexpected Purple Coal-Tar Dye,” proponents could point to “Novel color” and “Strong fabric affinity”, while unproven scale-up and fickle market remained unsettled.",
      "knownAdvantages": [
        "Novel color",
        "Strong fabric affinity",
        "Fashion demand"
      ],
      "knownRisks": [
        "Unproven scale-up",
        "Fickle market",
        "Chemical consistency"
      ],
      "reveal": {
        "historicalName": "Mauveine",
        "impactTier": "transformative",
        "returnMultiplier": 2.96,
        "legacyBonusMultiplier": 0,
        "historicalOutcome": "Helped launch the synthetic-dye industry and modern industrial organic chemistry.",
        "rankingRationale": "Its greatest impact was proving a repeatable business model for synthetic chemicals.",
        "whyItLookedRight": "The compound can be extracted and used as a textile dye. During 1850s–1870s, the claims “Novel color” and “Strong fabric affinity” gave backers a concrete reason to finance “Unexpected Purple Coal-Tar Dye.”",
        "returnRationale": "The investment return reflects the breadth, durability, and capturability of the use that emerged, not scientific importance alone."
      },
      "innovationTree": {
        "nodes": [
          {
            "id": "william-perkin-s-dye-laboratory-idea-1-node-1",
            "label": "Mauveine",
            "kind": "root"
          },
          {
            "id": "william-perkin-s-dye-laboratory-idea-1-node-2",
            "label": "synthetic dye industry",
            "kind": "application"
          },
          {
            "id": "william-perkin-s-dye-laboratory-idea-1-node-3",
            "label": "industrial organic chemistry",
            "kind": "application"
          },
          {
            "id": "william-perkin-s-dye-laboratory-idea-1-node-4",
            "label": "pharmaceutical chemistry",
            "kind": "application"
          },
          {
            "id": "william-perkin-s-dye-laboratory-idea-1-node-5",
            "label": "photographic chemicals",
            "kind": "application"
          }
        ],
        "edges": [
          {
            "from": "william-perkin-s-dye-laboratory-idea-1-node-1",
            "to": "william-perkin-s-dye-laboratory-idea-1-node-2"
          },
          {
            "from": "william-perkin-s-dye-laboratory-idea-1-node-1",
            "to": "william-perkin-s-dye-laboratory-idea-1-node-3"
          },
          {
            "from": "william-perkin-s-dye-laboratory-idea-1-node-1",
            "to": "william-perkin-s-dye-laboratory-idea-1-node-4"
          },
          {
            "from": "william-perkin-s-dye-laboratory-idea-1-node-1",
            "to": "william-perkin-s-dye-laboratory-idea-1-node-5"
          }
        ]
      },
      "tags": [
        "accidental discovery",
        "platform"
      ],
      "id": "william-perkin-s-dye-laboratory-idea-1",
      "displayOrder": 1,
      "researchPackage": {
        "costMillions": 7,
        "technicalFinding": "The compound can be extracted and used as a textile dye.",
        "productionFinding": "Coal-tar feedstocks and new factory methods permit scale-up.",
        "adoptionFinding": "Purple is fashionable and natural alternatives require more capital than established alternatives.",
        "unresolvedRisks": [
          "Fickle market",
          "Unproven scale-up",
          "Chemical consistency"
        ],
        "marketContext": "The market case in 1850s–1870s centered on a specific use: purple is fashionable and natural alternatives require more capital than established alternatives. The idea could enter through specialized users who placed a high value on “Novel color”, then expand only if performance and operating routines proved repeatable. Coal-tar feedstocks and new factory methods permit scale-up. Demand could stall even with a working system if “Unproven scale-up”, integration costs, or institutional resistance made switching unattractive."
      }
    },
    {
      "concealedTitle": "Synthetic Red Plant Dye",
      "pitch": "A valuable red dye formerly extracted from plants is produced through chemical synthesis. The period case for “Synthetic Red Plant Dye” emphasized “Known large market”; investors still lacked firm answers on patent race and strong German competition.",
      "knownAdvantages": [
        "Known large market",
        "Replaces agriculture",
        "Consistent color"
      ],
      "knownRisks": [
        "Patent race",
        "Strong German competition",
        "Price compression"
      ],
      "reveal": {
        "historicalName": "Synthetic alizarin",
        "impactTier": "medium",
        "returnMultiplier": 1.31,
        "legacyBonusMultiplier": 0,
        "historicalOutcome": "Became commercially important while accelerating international chemical competition.",
        "rankingRationale": "It served a substantial existing market but was one product within a rapidly crowded industry.",
        "whyItLookedRight": "During 1850s–1870s, “Synthetic Red Plant Dye” had a credible period case because the target molecule can be synthesized from coal-tar intermediates; backers could also point to “Known large market” and “Replaces agriculture”.",
        "returnRationale": "The investment return reflects the breadth, durability, and capturability of the use that emerged, not scientific importance alone."
      },
      "innovationTree": {
        "nodes": [
          {
            "id": "william-perkin-s-dye-laboratory-idea-2-node-1",
            "label": "Synthetic alizarin",
            "kind": "root"
          },
          {
            "id": "william-perkin-s-dye-laboratory-idea-2-node-2",
            "label": "textile dyes",
            "kind": "application"
          },
          {
            "id": "william-perkin-s-dye-laboratory-idea-2-node-3",
            "label": "chemical patent competition",
            "kind": "application"
          }
        ],
        "edges": [
          {
            "from": "william-perkin-s-dye-laboratory-idea-2-node-1",
            "to": "william-perkin-s-dye-laboratory-idea-2-node-2"
          },
          {
            "from": "william-perkin-s-dye-laboratory-idea-2-node-1",
            "to": "william-perkin-s-dye-laboratory-idea-2-node-3"
          }
        ]
      },
      "tags": [
        "substitution"
      ],
      "id": "william-perkin-s-dye-laboratory-idea-2",
      "displayOrder": 2,
      "researchPackage": {
        "costMillions": 7,
        "technicalFinding": "The target molecule can be synthesized from coal-tar intermediates.",
        "productionFinding": "Industrial production is feasible but requires process optimization.",
        "adoptionFinding": "Textiles already consume large quantities of the natural dye.",
        "unresolvedRisks": [
          "Strong German competition",
          "Patent race",
          "Price compression"
        ],
        "marketContext": "Textiles already consume large quantities of the natural dye. The first plausible adopters were organizations that placed a high value on the documented factor “Known large market”. Other users could wait because existing methods already worked, even if they offered a different balance of speed, cost, or control. Industrial production is feasible but requires process optimization. The central market uncertainty was the pace of switching while “Patent race” and “Strong German competition” remained open."
      }
    },
    {
      "concealedTitle": "Additional Proprietary Fashion Dyes",
      "pitch": "New green and violet compounds broaden the manufacturer’s color catalog. Backers considering “Additional Proprietary Fashion Dyes” were asked to value “Product line extension”, “Existing factory fit”, and “Near-term sales”, with the main unknowns concentrated in easy imitation.",
      "knownAdvantages": [
        "Product line extension",
        "Existing factory fit",
        "Near-term sales"
      ],
      "knownRisks": [
        "Easy imitation",
        "Fashion cycles",
        "Many competitors"
      ],
      "reveal": {
        "historicalName": "Perkin’s later specialty dyes",
        "impactTier": "limited",
        "returnMultiplier": 0.36,
        "legacyBonusMultiplier": 0,
        "historicalOutcome": "Some sold, but none matched the foundational impact of mauveine or alizarin.",
        "rankingRationale": "Incremental colors faced competition and short product lives.",
        "whyItLookedRight": "They can use existing facilities; combined with the claims “Product line extension” and “Existing factory fit”, that evidence made “Additional Proprietary Fashion Dyes” a rational contemporary bet.",
        "returnRationale": "The investment lost capital because a constraint outside the initial demonstration—scale, safety, adoption, economics, or competing systems—restricted durable use."
      },
      "innovationTree": {
        "nodes": [
          {
            "id": "william-perkin-s-dye-laboratory-idea-3-node-1",
            "label": "Specialty dyes",
            "kind": "root"
          },
          {
            "id": "william-perkin-s-dye-laboratory-idea-3-node-2",
            "label": "fashion textiles",
            "kind": "application"
          },
          {
            "id": "william-perkin-s-dye-laboratory-idea-3-node-3",
            "label": "new industry creation",
            "kind": "blocked"
          }
        ],
        "edges": [
          {
            "from": "william-perkin-s-dye-laboratory-idea-3-node-1",
            "to": "william-perkin-s-dye-laboratory-idea-3-node-2"
          },
          {
            "from": "william-perkin-s-dye-laboratory-idea-3-node-1",
            "to": "william-perkin-s-dye-laboratory-idea-3-node-3",
            "status": "blocked"
          }
        ]
      },
      "tags": [
        "incremental innovation"
      ],
      "id": "william-perkin-s-dye-laboratory-idea-3",
      "displayOrder": 3,
      "researchPackage": {
        "costMillions": 8,
        "technicalFinding": "The dyes work, but do not establish a new chemical platform.",
        "productionFinding": "They can use existing facilities.",
        "adoptionFinding": "Demand depends on temporary fashions.",
        "unresolvedRisks": [
          "Fashion cycles",
          "Easy imitation",
          "Many competitors"
        ],
        "marketContext": "In the 1850s–1870s market, demand depends on temporary fashions. The proposal could create value through the reported capabilities “Product line extension” and “Existing factory fit”, but that value had to reach a buyer with authority and money to change current practice. They can use existing facilities. Commercial adoption would depend on procurement cycles, supporting infrastructure, and whether “Easy imitation” was manageable in ordinary use."
      }
    }
  ],
  "debrief": {
    "winnerIdeaId": "william-perkin-s-dye-laboratory-idea-1",
    "winnerReason": "Mauveine catalyzes an industry rather than merely selling one color.",
    "investorLesson": "A proof of concept can be historically decisive without becoming a product.",
    "bestReturnIdeaId": "william-perkin-s-dye-laboratory-idea-1",
    "roundStructureExplanation": "One option produced the clearest direct return, but the concealed evidence is intentionally balanced."
  },
  "sources": [
    "https://www.sciencehistory.org/education/scientific-biographies/william-henry-perkin/",
    "https://www.rsc.org/periodic-table/history/about"
  ],
  "roundStructure": "standard",
  "calibrationTarget": {
    "ideaWeights": {
      "william-perkin-s-dye-laboratory-idea-1": 86.3,
      "william-perkin-s-dye-laboratory-idea-2": 13.7,
      "william-perkin-s-dye-laboratory-idea-3": 0
    },
    "holdWeight": 0,
    "researchWeight": 0
  },
  "calibrationRationale": "Mauveine, Synthetic alizarin all beat cash; the benchmark divides post-research capital in proportion to their realized excess returns.",
  "pitchYear": 1869
}
```

## Protocol
A mission = ordered `events` (each with `answer` = a card id + `why`) and `cards` (= events + exactly 3 decoys). See PROTOCOL_SPEC.md for full rules.
Top-level fields: `id`, `title`, `domain`, `mission`, `briefing`, `takeaway`, `events`, `cards`

```json
{
  "id": "volcano",
  "title": "Unrest at Calder Peak",
  "domain": "Volcanology · Geodesy · Hazard monitoring",
  "mission": "A volcano that has been quiet for decades begins showing unrest. Match each monitoring stage to the instrument that provides the required physical signal and scale as the crisis evolves.",
  "briefing": [
    "Small earthquakes begin 5–10 km below the summit.",
    "Ground motion of a few centimeters must be distinguished from local sensor tilt.",
    "Sulfur dioxide output may rise before visible ash appears.",
    "Heavy rain after eruption could mobilize ash into fast-moving lahars."
  ],
  "takeaway": "Volcano monitoring combines independent signals of rock fracture, deformation, gas, heat, explosions, ash, and post-eruption flow hazards.",
  "events": [
    {
      "title": "Locate the earthquake swarm",
      "text": "Hundreds of small events occur beneath the volcano. Arrival times from multiple stations must be used to determine hypocenter depth and migration.",
      "answer": "seismic-network",
      "why": "A multi-station seismic network locates earthquake hypocenters from relative wave-arrival times."
    },
    {
      "title": "Measure broad deformation",
      "text": "Scientists need three-dimensional summit displacement of centimeters over days, referenced to stable points many kilometers away.",
      "answer": "gnss",
      "why": "Continuous GNSS measures three-dimensional ground displacement relative to distant reference stations."
    },
    {
      "title": "Detect rapid tilt",
      "text": "Near the crater, microradian changes over minutes may signal shallow pressurization even when total translation is small.",
      "answer": "tiltmeter",
      "why": "A borehole tiltmeter resolves rapid tiny changes in ground slope near the vent."
    },
    {
      "title": "Quantify sulfur dioxide",
      "text": "The team needs the amount of SO2 crossing a plume transect each second, using ultraviolet absorption together with wind speed.",
      "answer": "doas",
      "why": "Scanning DOAS measures ultraviolet SO2 absorption across the plume for emission-rate calculation."
    },
    {
      "title": "Map new heat",
      "text": "Cloud breaks reveal the summit briefly at night. Investigators need surface-temperature contrasts to locate a growing hot vent and lava beneath thin crust.",
      "answer": "thermal-camera",
      "why": "Thermal infrared imaging maps surface-temperature anomalies during brief visibility windows."
    },
    {
      "title": "Detect explosive pulses",
      "text": "Low-frequency pressure waves from the crater must be distinguished from local seismic shaking and detected even when the summit is obscured.",
      "answer": "infrasound",
      "why": "Infrasound sensors record atmospheric pressure waves from explosions independently of ground vibration."
    },
    {
      "title": "Warn of lahars",
      "text": "After the eruption, heavy rain may send dense debris flows down two river valleys. The warning system needs ground-vibration detection along each channel and rapid telemetry downstream.",
      "answer": "afm",
      "why": "Acoustic flow monitors detect the characteristic ground vibration of lahars in instrumented channels."
    }
  ],
  "cards": [
    {
      "id": "seismic-network",
      "name": "Broadband seismic network",
      "spec": "Records ground motion at multiple stations; relative P- and S-wave arrival times locate earthquake hypocenters and track migration."
    },
    {
      "id": "gnss",
      "name": "Continuous GNSS stations",
      "spec": "Measure three-dimensional position changes of centimeters or less relative to stable distant reference stations over hours to years."
    },
    {
      "id": "tiltmeter",
      "name": "Borehole tiltmeter",
      "spec": "Measures microradian changes in local ground slope at high time resolution near a deformation source."
    },
    {
      "id": "doas",
      "name": "Scanning ultraviolet DOAS spectrometer",
      "spec": "Measures sulfur-dioxide absorption across a volcanic plume and combines the column amount with plume speed to estimate emission rate."
    },
    {
      "id": "thermal-camera",
      "name": "Thermal infrared camera",
      "spec": "Maps emitted infrared radiation to reveal hot vents, lava, and temperature contrasts at the surface, including at night."
    },
    {
      "id": "infrasound",
      "name": "Infrasound array",
      "spec": "Measures low-frequency atmospheric pressure waves from explosions and jetting, separate from seismic ground motion."
    },
    {
      "id": "afm",
      "name": "Acoustic flow monitor network",
      "spec": "Detects strong ground vibration generated by debris flows moving through instrumented river channels and telemeters alarms."
    },
    {
      "id": "weather-radar",
      "name": "Weather radar",
      "spec": "Maps precipitation and some ash reflectivity over broad areas. It does not directly measure sulfur-dioxide flux or centimeter ground deformation."
    },
    {
      "id": "magnetometer",
      "name": "Three-axis magnetometer",
      "spec": "Measures changes in magnetic field that may accompany heating or rock alteration. It does not locate earthquake hypocenters from wave arrivals."
    },
    {
      "id": "radiation-counter",
      "name": "Gamma radiation counter",
      "spec": "Measures ionizing radiation dose or count rate. It is not a primary sensor for volcanic gas, deformation, or lahar vibration."
    }
  ]
}
```