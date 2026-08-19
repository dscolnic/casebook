// Diagnosis data pack — generated for the Diagnosis engine.
module.exports = { PACK: {
  "id": "epidemiology",
  "title": "Outbreak Signal",
  "domain": "Public-health outbreak surveillance",
  "role": "You are the epidemiologist reviewing a sudden rise in reported respiratory illness.",
  "system": {
    "parts": [
      [
        "Case reports",
        "Clinicians and laboratories report cases with specimen, result, residence, and symptom-onset dates. Report date can differ greatly from when illness actually occurred."
      ],
      [
        "Baseline model",
        "Historical data define the expected seasonal range by week, age, and geography. A rise can be normal for the time of year or exceed the expected envelope."
      ],
      [
        "Laboratory network",
        "Multiple laboratories and sequencing sites confirm whether positives are real and whether a new strain or subtype is circulating."
      ],
      [
        "Syndromic and severity data",
        "Emergency visits, hospital admissions, test positivity, and wastewater provide independent views less sensitive to one reporting backlog."
      ],
      [
        "Data pipeline",
        "Batch uploads, duplicate records, coding changes, and contamination can create apparent clusters without a true increase in community illness."
      ]
    ],
    "soWrong": "So a rising case count may be a real outbreak, a late reporting batch, laboratory contamination, or an expected seasonal wave. The diagnosis depends on onset dates, geography, positivity, severity, sequencing, and whether independent systems rise together."
  },
  "salient": [
    "curve",
    "spread"
  ],
  "readings": {
    "curve": {
      "name": "Reported case curve",
      "purpose": "Shape of newly reported cases. A one-day block can signal laboratory contamination; a sustained rise can reflect backlog, seasonal transmission, or a true outbreak.",
      "pin": {
        "x": 245,
        "y": 110
      },
      "zone": "reports"
    },
    "spread": {
      "name": "Geographic distribution",
      "purpose": "Where reported cases reside. A single-county concentration can come from one reporting system or laboratory; multi-county spread supports broader transmission but may still be seasonal.",
      "pin": {
        "x": 340,
        "y": 185
      },
      "zone": "geography"
    },
    "onset": {
      "name": "Symptom-onset curve",
      "purpose": "Cases reorganized by when illness began rather than when reports arrived. A real outbreak forms a recent rising onset curve; a backlog redistributes into older weeks.",
      "pin": {
        "x": 120,
        "y": 180
      },
      "zone": "reports"
    },
    "positivity": {
      "name": "Test positivity",
      "purpose": "Positive tests divided by all tests. Rising positivity supports increased transmission; more testing or a reporting batch can raise counts without raising positivity.",
      "pin": {
        "x": 250,
        "y": 250
      },
      "zone": "laboratory"
    },
    "severity": {
      "name": "Hospitalization rate",
      "purpose": "Severe cases per population or per infection. An excess beyond the seasonal envelope supports a consequential outbreak and is less sensitive to duplicate outpatient reports.",
      "pin": {
        "x": 410,
        "y": 285
      },
      "zone": "severity"
    },
    "sequence": {
      "name": "Genomic sequencing",
      "purpose": "Distribution of lineages or subtypes. A new clustered lineage supports a true outbreak; identical control contamination or no lineage change supports artifact or seasonal activity.",
      "pin": {
        "x": 405,
        "y": 90
      },
      "zone": "laboratory"
    },
    "wastewater": {
      "name": "Wastewater signal",
      "purpose": "Pathogen concentration in sewage. A community outbreak should raise wastewater across affected areas; reporting artifacts and lab contamination do not.",
      "pin": {
        "x": 130,
        "y": 285
      },
      "zone": "community"
    },
    "pipeline": {
      "name": "Reporting-pipeline status",
      "purpose": "Backlog size, upload timing, duplicate identifiers, and software changes. A delayed batch or mapping change can create an artificial report-date spike.",
      "pin": {
        "x": 90,
        "y": 90
      },
      "zone": "data"
    },
    "age": {
      "name": "Age distribution versus baseline",
      "purpose": "Which age groups are affected compared with prior seasons. A shifted age pattern can support a novel outbreak; expected seasonal activity often follows the historical distribution.",
      "pin": {
        "x": 330,
        "y": 340
      },
      "zone": "population"
    }
  },
  "hypotheses": {
    "labcontam": {
      "label": "Laboratory contamination cluster",
      "call": {
        "title": "Laboratory contamination — quarantine the affected run.",
        "arg": "A single testing run created a block of positives without matching illness, wastewater, or sequencing diversity. Correct the laboratory data."
      },
      "sig": {
        "curve": "one-day-block",
        "spread": "single-county",
        "onset": "flat",
        "positivity": "lab-only",
        "severity": "normal",
        "sequence": "identical",
        "wastewater": "steady",
        "pipeline": "normal",
        "age": "random"
      }
    },
    "backlog": {
      "label": "Reporting backlog release",
      "call": {
        "title": "Reporting artifact — reassign cases by onset date.",
        "arg": "One jurisdiction uploaded delayed records in a batch. Correct the report-date curve before interpreting transmission."
      },
      "sig": {
        "curve": "rising",
        "spread": "single-county",
        "onset": "old-cases",
        "positivity": "steady",
        "severity": "normal",
        "sequence": "mixed-old",
        "wastewater": "steady",
        "pipeline": "backlog",
        "age": "baseline"
      }
    },
    "outbreak": {
      "label": "True emerging outbreak",
      "call": {
        "title": "True outbreak — investigate and respond.",
        "arg": "Independent community, laboratory, and severity indicators show transmission beyond the seasonal envelope, with a new lineage and shifted population pattern."
      },
      "sig": {
        "curve": "rising",
        "spread": "multi-county",
        "onset": "recent-rise",
        "positivity": "high",
        "severity": "high",
        "sequence": "new-lineage",
        "wastewater": "rising",
        "pipeline": "normal",
        "age": "shifted"
      }
    },
    "seasonal": {
      "label": "Expected seasonal baseline",
      "call": {
        "title": "Seasonal rise — continue routine surveillance.",
        "arg": "Cases are rising across counties, but timing, positivity, severity, lineage mix, wastewater, and age distribution remain within the historical seasonal range."
      },
      "sig": {
        "curve": "rising",
        "spread": "multi-county",
        "onset": "seasonal-rise",
        "positivity": "seasonal",
        "severity": "normal",
        "sequence": "seasonal-mix",
        "wastewater": "seasonal",
        "pipeline": "normal",
        "age": "baseline"
      }
    }
  },
  "dismissal": "seasonal",
  "reassuring": {
    "lab": "National alert status",
    "val": "NO NATIONAL OUTBREAK DECLARATION",
    "note": "National declarations lag local evidence and apply broad thresholds. A regional outbreak can be real before any national alert changes."
  },
  "rounds": [
    {
      "answer": "labcontam",
      "alarm": "curve",
      "poleA": {
        "lab": "Case reports",
        "val": "186 positives posted in one block",
        "note": "Nearly every result comes from one laboratory plate and one county."
      },
      "hook": "At 06:00, a county dashboard gains 186 respiratory-virus cases at once. The national alert status remains unchanged.",
      "riddle": "Did a community become sick overnight — <span class=\"q\">or did one laboratory run manufacture a block of positives?</span>",
      "vals": {
        "curve": "186 positives with the same result timestamp",
        "spread": "181 of 186 from one county and laboratory",
        "onset": "no increase in recent symptom-onset dates",
        "positivity": "affected lab 41%; all other labs 6.2%",
        "severity": "hospital admissions unchanged",
        "sequence": "34 sequenced samples share an identical control-associated signature",
        "wastewater": "county signal flat for 3 weeks",
        "pipeline": "reporting system operating normally; no backlog upload",
        "age": "positives scattered without a respiratory-syndrome age pattern"
      },
      "reasons": {
        "backlog": "A backlog can post many reports at once, but the records should represent varied older specimen and onset dates. These positives share one result timestamp and one laboratory run, while recent onset remains flat.",
        "outbreak": "A true outbreak should raise recent symptom onset, positivity across several laboratories, wastewater, and often health-care use. Every independent community indicator is flat.",
        "seasonal": "A seasonal rise develops over days to weeks across laboratories and usually appears in onset and wastewater data. This is a one-block, one-lab event."
      },
      "resolve": {
        "title": "Laboratory contamination — the case block was created inside the testing process.",
        "paras": [
          "The positives are concentrated in one laboratory run, other laboratories remain near 6% positivity, symptom-onset dates and admissions do not rise, wastewater is flat, and sequenced samples carry the same control-associated signature. Quarantine the run, retest specimens, and correct surveillance records.",
          "This is a naked single. Only laboratory contamination produces the one-day-block curve. The other causes create a sustained reported rise."
        ],
        "why": {
          "loud": "<b>Why the loud reading was enough</b>: a block of identically timed results is unique to the laboratory-run artifact in this differential.",
          "quiet": "<b>Why no national declaration is irrelevant</b>: national status neither confirms nor rejects a local data-quality event."
        },
        "chain": [
          "Contamination affects one laboratory run",
          "Many specimens are called positive together",
          "The dashboard shows a false one-day case cluster"
        ],
        "take": "An epidemic curve can reveal the machinery that produced the data; identical timestamps may describe a batch, not transmission."
      }
    },
    {
      "answer": "backlog",
      "alarm": "curve",
      "poleA": {
        "lab": "Reported cases",
        "val": "County count rising for four days",
        "note": "The increase is confined to one jurisdiction even though its onset curve points backward in time."
      },
      "hook": "A county releases several thousand respiratory reports over four days and appears to lead the state in new disease. Neighboring counties remain stable.",
      "riddle": "Is transmission accelerating locally — <span class=\"q\">or is old illness arriving late through the reporting pipeline?</span>",
      "vals": {
        "curve": "daily reports rise from 90 to 860 over 4 days",
        "spread": "94% of excess reports from one county",
        "onset": "82% of added cases began 3–7 weeks earlier",
        "positivity": "7.1%, unchanged from prior month",
        "severity": "admissions remain within seasonal band",
        "sequence": "mixed lineages from prior weeks",
        "wastewater": "current county concentration flat",
        "pipeline": "3,420-record laboratory backlog released after interface repair",
        "age": "matches county historical seasonal distribution"
      },
      "reasons": {
        "labcontam": "Laboratory contamination usually creates a compact one-run block with abnormal laboratory-specific positivity or identical sequence evidence. These records span many old weeks and mixed lineages.",
        "outbreak": "A true outbreak should raise recent onset, current positivity, wastewater, or admissions. The apparent rise disappears when cases are assigned to their actual onset weeks.",
        "seasonal": "Expected seasonal activity may rise across multiple counties and current onset weeks. This excess is confined to one reporting pipeline and consists mostly of old records."
      },
      "resolve": {
        "title": "Reporting backlog release — the report-date curve is rising, not the epidemic.",
        "paras": [
          "The interface repair released 3,420 delayed records. Most illnesses began three to seven weeks ago, current positivity and wastewater are flat, and admissions remain within baseline. Rebuild the curve by symptom-onset date before making transmission decisions.",
          "This is one clear line across the loud readings. A sustained rise is shared with outbreak and seasonal activity, while single-county concentration is shared with laboratory contamination. Only rising reports plus one-county concentration identifies the backlog artifact."
        ],
        "why": {
          "loud": "<b>Why both loud readings are needed</b>: a rising curve may be real, and one-county concentration may be a lab event; together they point to a jurisdiction-specific reporting process.",
          "quiet": "<b>Why onset date settles it</b>: the added cases belong to old weeks, so current transmission did not suddenly accelerate."
        },
        "chain": [
          "A laboratory interface accumulates unreported records",
          "Repair releases old cases in several batches",
          "Report-date counts surge while current onset and community indicators remain flat"
        ],
        "take": "Always separate when disease happened from when the database learned about it."
      }
    },
    {
      "answer": "outbreak",
      "alarm": "curve",
      "poleA": {
        "lab": "Regional incidence",
        "val": "Rising across nine counties",
        "note": "The loud pattern resembles an ordinary seasonal wave, but several quiet indicators have broken outside historical bounds."
      },
      "hook": "Respiratory cases climb across a nine-county region at the usual time of year. At first glance, the curve could be dismissed as the annual seasonal rise.",
      "riddle": "Cases are rising where and when expected — <span class=\"q\">but are the underlying severity, lineage, and community signals still inside the seasonal envelope?</span>",
      "vals": {
        "curve": "cases double for 3 consecutive weeks",
        "spread": "coherent rise across 9 adjacent counties",
        "onset": "recent onset doubles with a 5.1-day serial pattern",
        "positivity": "18.6%; historical week range 5–10%",
        "severity": "admissions 2.4 times the upper seasonal prediction band",
        "sequence": "72% new lineage XQ.4 in affected counties",
        "wastewater": "4.8-fold rise across 7 sewersheds",
        "pipeline": "no backlog, definition, or duplicate-record change",
        "age": "largest excess in adults 20–39, unlike prior seasons"
      },
      "reasons": {
        "seasonal": "Seasonal baseline shares the loud pattern of rising cases across multiple counties. But positivity, admissions, wastewater, lineage composition, and age distribution all exceed or depart from the historical seasonal envelope.",
        "labcontam": "A laboratory artifact would concentrate in one run or facility and would not raise wastewater, admissions, recent onset, and several independent laboratories across nine counties.",
        "backlog": "A reporting backlog would load older onset dates and reveal a pipeline event. Here recent onsets rise with a coherent transmission interval and the pipeline is normal."
      },
      "resolve": {
        "title": "True emerging outbreak — independent systems show transmission beyond the seasonal baseline.",
        "paras": [
          "Recent symptom onset, test positivity, admissions, and wastewater all rise together across nine counties. Positivity and severity exceed historical bounds, sequencing shows a new lineage dominating, and the affected age distribution has shifted. Begin outbreak investigation and response.",
          "This is where the loud gauges tie. A true outbreak and expected seasonal activity both produce rising cases across multiple counties. The deeper question is excess relative to baseline: do independent indicators remain within their expected seasonal ranges, or do several break out together?"
        ],
        "why": {
          "loud": "<b>Why the loud gauges cannot decide</b>: seasonality itself creates broad, rising case curves.",
          "quiet": "<b>Why this is a true outbreak</b>: positivity, severity, wastewater, lineage, and age pattern all depart from the historical seasonal envelope in the same places and weeks."
        },
        "chain": [
          "A new lineage begins sustained community transmission",
          "Multiple independent surveillance systems rise together",
          "Incidence and severity exceed the expected seasonal range"
        ],
        "take": "A baseline is a distribution, not a slogan: broad seasonal-looking growth becomes an outbreak when independent measures exceed its expected envelope."
      }
    }
  ],
  "schematic": {
    "viewBox": "0 0 520 390",
    "svg": "\n<text x=\"260\" y=\"24\" class=\"eqlbl\" text-anchor=\"middle\" style=\"fill:#5a7f96\">OUTBREAK SURVEILLANCE SYSTEM</text>\n<rect x=\"40\" y=\"75\" width=\"125\" height=\"220\" rx=\"18\" fill=\"#173e59\" stroke=\"#70c9f2\" stroke-width=\"2\"/>\n<text x=\"102\" y=\"105\" class=\"lbl\" text-anchor=\"middle\">reports / pipeline</text>\n<path d=\"M70,145 L95,125 L120,160 L145,105\" fill=\"none\" stroke=\"#efca72\" stroke-width=\"3\"/>\n<rect x=\"200\" y=\"75\" width=\"125\" height=\"220\" rx=\"18\" fill=\"#173e59\" stroke=\"#70c9f2\" stroke-width=\"2\"/>\n<text x=\"262\" y=\"105\" class=\"lbl\" text-anchor=\"middle\">laboratory /</text><text x=\"262\" y=\"123\" class=\"lbl\" text-anchor=\"middle\">onset curve</text>\n<circle cx=\"240\" cy=\"180\" r=\"10\" fill=\"none\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<circle cx=\"275\" cy=\"180\" r=\"10\" fill=\"none\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<circle cx=\"292\" cy=\"215\" r=\"10\" fill=\"none\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<rect x=\"360\" y=\"75\" width=\"120\" height=\"220\" rx=\"18\" fill=\"#173e59\" stroke=\"#70c9f2\" stroke-width=\"2\"/>\n<text x=\"420\" y=\"105\" class=\"lbl\" text-anchor=\"middle\">community /</text><text x=\"420\" y=\"123\" class=\"lbl\" text-anchor=\"middle\">severity</text>\n<path d=\"M380,235 Q405,180 430,215 Q450,245 465,165\" fill=\"none\" stroke=\"#efca72\" stroke-width=\"3\"/>\n<path d=\"M165,185 H200 M325,185 H360\" stroke=\"#70c9f2\" stroke-width=\"6\"/>\n<rect x=\"155\" y=\"325\" width=\"210\" height=\"45\" rx=\"10\" fill=\"rgba(112,201,242,.06)\" stroke=\"#385b70\"/>\n<text x=\"260\" y=\"353\" class=\"lbl\" text-anchor=\"middle\">historical seasonal baseline</text>\n<line x1=\"245\" y1=\"110\" x2=\"245\" y2=\"75\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"340\" y1=\"185\" x2=\"325\" y2=\"185\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"120\" y1=\"180\" x2=\"165\" y2=\"180\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"250\" y1=\"250\" x2=\"250\" y2=\"295\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"410\" y1=\"285\" x2=\"410\" y2=\"295\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"405\" y1=\"90\" x2=\"360\" y2=\"90\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"130\" y1=\"285\" x2=\"155\" y2=\"325\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"90\" y1=\"90\" x2=\"40\" y2=\"90\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"330\" y1=\"340\" x2=\"365\" y2=\"325\" stroke=\"#efca72\" stroke-width=\"2\"/>"
  }
} };
