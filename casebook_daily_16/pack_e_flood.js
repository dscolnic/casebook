module.exports = { PACK: {
  "id": "e_flood",
  "title": "The Rossmere Flood",
  "discipline": "Hydrology & Flood Science",
  "teaser": "Rossmere was struck by a steep flood wave below the reservoir. Did the dam structurally breach, or did a debris blockage fail upstream? The hydrograph must explain the peak.",
  "overclaimTag": "a structural dam breach",
  "truthTag": "a reservoir release synchronized with the flood crest",
  "venue": "the Rossmere flood inquiry",
  "agent": {
    "name": "Inspector Tomasz Bey",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Hydrology Pioneers",
  "dossierName": "HYDROLOGY PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Rossmere flood inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before your inquiry ends. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The place you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "A breached dam and a debris outburst both produce sudden walls of water; hydrograph shape and sediment must separate them.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "manager",
      "items": [
        {
          "id": "manager",
          "label": "Elias Thorn — reservoir operations manager"
        },
        {
          "id": "hydrologist",
          "label": "The county hydrologist"
        },
        {
          "id": "planner",
          "label": "The floodplain planner"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "office",
      "items": [
        {
          "id": "gauges",
          "label": "The Creek & Gauge Stations"
        },
        {
          "id": "controlroom",
          "label": "The Dam Control Room"
        },
        {
          "id": "office",
          "label": "The Water District Office"
        }
      ]
    },
    "what": {
      "title": "What produced the destructive flood peak?",
      "truth": "ignored",
      "items": [
        {
          "id": "sabotage",
          "label": "A structural dam breach released the reservoir in one sudden wave."
        },
        {
          "id": "freak",
          "label": "A debris-dam outburst sent a sediment-heavy surge down the canyon."
        },
        {
          "id": "ignored",
          "label": "A late reservoir release coincided with the natural flood crest."
        }
      ]
    }
  },
  "PLACES": {
    "gauges": {
      "name": "The Creek & Gauge Stations",
      "xy": [
        140,
        90
      ]
    },
    "controlroom": {
      "name": "The Dam Control Room",
      "xy": [
        330,
        240
      ]
    },
    "office": {
      "name": "The Water District Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "gauges",
      "controlroom"
    ],
    [
      "controlroom",
      "office"
    ]
  ],
  "CHARACTERS": {
    "gaugekeeper": {
      "name": "Gauge Keeper Wynn",
      "role": "Stream-gauge keeper",
      "face": "💧",
      "badge": "W",
      "legend": "the gauge stations",
      "hint": "Knows station locations and can identify who maintained each part of the observing network."
    },
    "operator": {
      "name": "The Gate Operator",
      "role": "Dam gate operator",
      "face": "🎚",
      "badge": "G",
      "legend": "the control room",
      "hint": "Can reconstruct control-room staffing and where gate commands originated."
    },
    "clerk": {
      "name": "The Clerk",
      "role": "Water-district clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Holds planning records, duty assignments, and management correspondence for the district."
    }
  },
  "TOPICMAP": {
    "gauges": {
      "gaugekeeper": [
        "dbernoulli"
      ],
      "operator": [
        "kuichling"
      ],
      "clerk": [
        "sherman"
      ]
    },
    "controlroom": {
      "gaugekeeper": [
        "bakhmeteff"
      ],
      "operator": [
        "snyder"
      ],
      "clerk": [
        "white"
      ]
    },
    "office": {
      "gaugekeeper": [
        "linsley"
      ],
      "operator": [
        "ippen"
      ],
      "clerk": [
        "haeinstein"
      ]
    }
  },
  "TOPICS": {
    "dbernoulli": {
      "sci": "Daniel Bernoulli (1700-1782)",
      "topic": "Hydrodynamics & Bernoulli's principle",
      "lede": "Daniel Bernoulli gave hydrodynamics and bernoulli’s principle a quantitative place in the changing life of a watershed.",
      "no": 1,
      "profile": "This morning’s hydrology note uses Daniel Bernoulli to examine hydrodynamics and bernoulli’s principle. Bernoulli showed that pressure, speed, and height along a flowing stream can be joined through conservation of mechanical energy. The relation is foundational but must be applied with attention to losses, unsteady flow, and the chosen streamline. Flood science joins rainfall, soils, drainage networks, channels, reservoirs, and development. Bernoulli supplied a way to turn one of those moving parts into a quantity that engineers can test and revise.\n\nThe working procedure is to write an energy balance and state where friction, turbulence, and changing geometry enter. Every estimate should identify the observation period, basin conditions, boundary assumptions, and uncertainty introduced by missing gauges or changing land use.\n\nA flood hydrograph is a history, not just a peak. Water arrives, is stored, is routed, and interacts with sediment and infrastructure. Operations based on stale ratings or silent stations can look orderly until the response time collapses.\n\nThe hydrologic rule: a compact equation is useful only when its assumptions match the channel or pipe. Reliable flood decisions depend on records that remain live, local, and connected to the watershed they describe. A return period expresses annual chance and never promises that events will be evenly spaced. Maps and models should be revised after channel change, new development, and every informative event. Operational thresholds should be written before a crisis so a late decision cannot be disguised as fresh analysis. Uncertainty bands belong on discharge forecasts when missing stations or unstable rating curves widen the possible peak.",
      "frame": "Unrolls a hydrograph at The Creek & Gauge Stations. \"The peak is one point; the river has a whole history. Walk me through hydrodynamics and bernoulli’s principle.\"",
      "q": [
        {
          "q": "Which hydrologic statement best captures Daniel Bernoulli’s work on hydrodynamics and bernoulli’s principle?",
          "o": [
            {
              "t": "Bernoulli connected pressure, speed, and height through conservation of mechanical energy in flowing water. Flood routing still requires channel losses and geometry. Routing assumptions remain attached to the hydrograph. Flood fits.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Daniel Bernoulli's flood work emphasizes a regional formula and the surviving gauges. Regional practice can favor it. Flood records fit this flood account. Flood practice makes the flood view plausible. Flood timing supports this flood claim.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "Daniel Bernoulli's flood work is read within flood practice as support for the return-period label as a practical waiting interval between major floods. The surviving record looks compatible. Flood practice makes the flood view plausible.",
              "v": "wrong",
              "fb": "The proposed inference does not follow from the hydraulic or statistical relationship."
            },
            {
              "t": "Daniel Bernoulli's authority is invoked in flood practice to justify delaying a reservoir release until conflicting upstream readings have been reconciled. Regional practice can favor it. Flood records fit this flood account. Flood fits.",
              "v": "danger",
              "fb": "That approach hides a preventable information failure behind the language of rarity."
            }
          ]
        },
        {
          "q": "Which method gives the strongest flood estimate or operational decision?",
          "o": [
            {
              "t": "Use this hydrologic procedure: write an energy balance and state where friction, turbulence, and changing geometry enter. Basin change remains visible. Flood fits.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Estimate the peak from current rainfall and a regional runoff coefficient, then update the result after the event. Flood practice makes the flood view plausible.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "Use the highest basin rainfall total as the downstream flood peak, with storage and travel time folded into the safety margin. Flood records fit this flood account.",
              "v": "wrong",
              "fb": "The proposed inference does not follow from the hydraulic or statistical relationship."
            },
            {
              "t": "Hold the release while the remaining gauges are checked, accepting a larger later discharge to avoid a premature operation. Flood records fit this flood account.",
              "v": "danger",
              "fb": "That approach hides a preventable information failure behind the language of rarity."
            }
          ]
        },
        {
          "q": "Which lesson should guide flood-risk practice?",
          "o": [
            {
              "t": "The watershed lesson is that a compact equation is useful only when its assumptions match the channel or pipe. Reservoir timing can be checked against rainfall.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Continue using the published flood map after development, provided the dam and main channel remain in the same locations. Flood practice makes the flood view plausible.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "Treat compliance with the written reservoir rule curve as strong evidence that downstream flooding was not reasonably foreseeable. Flood records fit this flood account.",
              "v": "wrong",
              "fb": "The proposed inference does not follow from the hydraulic or statistical relationship."
            },
            {
              "t": "Attribute the loss mainly to an exceptional storm, making rainfall rarity the central basis for future planning. Regional practice can favor it. The flood practice fits.",
              "v": "danger",
              "fb": "That approach hides a preventable information failure behind the language of rarity."
            }
          ]
        }
      ]
    },
    "kuichling": {
      "sci": "Emil Kuichling (1848-1919)",
      "topic": "Urban storm drainage & runoff",
      "lede": "Emil Kuichling showed how urban storm drainage and runoff converts scattered water records into an operational forecast.",
      "no": 2,
      "profile": "This morning’s hydrology note uses Emil Kuichling to examine urban storm drainage and runoff. Emil Kuichling applied quantitative runoff analysis to urban sewer design and helped popularize the rational method in American engineering. His work addressed the new problem of rapid drainage from paved streets and dense development. Flood science joins rainfall, soils, drainage networks, channels, reservoirs, and development. Kuichling supplied a way to turn one of those moving parts into a quantity that engineers can test and revise.\n\nThe working procedure is to estimate how impervious area and drainage connectivity shorten runoff response. Every estimate should identify the observation period, basin conditions, boundary assumptions, and uncertainty introduced by missing gauges or changing land use.\n\nA flood hydrograph is a history, not just a peak. Water arrives, is stored, is routed, and interacts with sediment and infrastructure. Operations based on stale ratings or silent stations can look orderly until the response time collapses.\n\nThe hydrologic rule: urbanization changes not just how much water runs off but how quickly the peak arrives. Reliable flood decisions depend on records that remain live, local, and connected to the watershed they describe. A return period expresses annual chance and never promises that events will be evenly spaced. Maps and models should be revised after channel change, new development, and every informative event. Operational thresholds should be written before a crisis so a late decision cannot be disguised as fresh analysis. Uncertainty bands belong on discharge forecasts when missing stations or unstable rating curves widen the possible peak.",
      "frame": "Rests a hand on the flood map. \"Water follows terrain, not office boundaries. Begin with urban storm drainage and runoff.\"",
      "q": [
        {
          "q": "Which hydrologic statement best captures Emil Kuichling’s work on urban storm drainage and runoff?",
          "o": [
            {
              "t": "Emil Kuichling applied quantitative runoff analysis to urban sewer design and helped popularize the rational method in American engineering. Basin change remains visible. Flood fits. Fits.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Emil Kuichling's flood work emphasizes a regional formula and the surviving gauges. The surviving record looks compatible. Flood practice makes the flood view plausible. The flood record fits.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "Emil Kuichling's flood work is read within flood practice as support for the return-period label as a practical waiting interval between major floods. Gauge history supports that view. Flood fits.",
              "v": "wrong",
              "fb": "The proposed inference does not follow from the hydraulic or statistical relationship."
            },
            {
              "t": "Emil Kuichling's flood authority supports delaying a reservoir release until conflicting upstream readings have been reconciled. The surviving record looks compatible. Flood fits. Flood fits.",
              "v": "danger",
              "fb": "That approach hides a preventable information failure behind the language of rarity."
            }
          ]
        },
        {
          "q": "Which method gives the strongest flood estimate or operational decision?",
          "o": [
            {
              "t": "Use this hydrologic procedure: estimate how impervious area and drainage connectivity shorten runoff response. The hydrograph stays auditable. Basin change remains visible. Flood fits.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Estimate the peak from current rainfall and a regional runoff coefficient, then update the result after the event. Regional practice can favor it. Flood records fit this flood account.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "Use the highest basin rainfall total as the downstream flood peak, with storage and travel time folded into the safety margin. The surviving record looks compatible. The flood record fits.",
              "v": "wrong",
              "fb": "The proposed inference does not follow from the hydraulic or statistical relationship."
            },
            {
              "t": "Hold the release while the remaining gauges are checked, accepting a larger later discharge to avoid a premature operation. The surviving record looks compatible. The flood record fits.",
              "v": "danger",
              "fb": "That approach hides a preventable information failure behind the language of rarity."
            }
          ]
        },
        {
          "q": "Which lesson should guide flood-risk practice?",
          "o": [
            {
              "t": "The watershed lesson is that urbanization changes not just how much water runs off but how quickly the peak arrives. Basin change remains visible. Reservoir timing can be checked against rainfall. Flood context matters.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Continue using the published flood map after development, provided the dam and main channel remain in the same locations. Gauge history supports that view. The surviving record looks compatible. The flood record fits. Flood fits.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "Treat compliance with the written reservoir rule curve as strong evidence that downstream flooding was not reasonably foreseeable. Flood records fit this flood account. Flood timing supports this flood claim. The flood record fits.",
              "v": "wrong",
              "fb": "The proposed inference does not follow from the hydraulic or statistical relationship."
            },
            {
              "t": "Attribute the loss mainly to an exceptional storm, making rainfall rarity the central basis for future planning. Regional practice can favor it. Flood records fit this flood account. Flood timing supports this flood claim.",
              "v": "danger",
              "fb": "That approach hides a preventable information failure behind the language of rarity."
            }
          ]
        }
      ]
    },
    "sherman": {
      "sci": "LeRoy K. Sherman (1869-1954)",
      "topic": "The unit hydrograph",
      "lede": "From rain to river, LeRoy K. Sherman used the unit hydrograph to make flood response testable.",
      "no": 3,
      "profile": "This morning’s hydrology note uses LeRoy K. Sherman to examine the unit hydrograph. LeRoy Sherman introduced the unit hydrograph, representing the runoff response of a watershed to a unit depth of effective rainfall over a specified duration. It allowed engineers to transform a rainfall pattern into an estimated discharge hydrograph. Flood science joins rainfall, soils, drainage networks, channels, reservoirs, and development. Sherman supplied a way to turn one of those moving parts into a quantity that engineers can test and revise.\n\nThe working procedure is to derive a watershed response from observed rainfall-runoff events and apply it only under stated linearity assumptions. Every estimate should identify the observation period, basin conditions, boundary assumptions, and uncertainty introduced by missing gauges or changing land use.\n\nA flood hydrograph is a history, not just a peak. Water arrives, is stored, is routed, and interacts with sediment and infrastructure. Operations based on stale ratings or silent stations can look orderly until the response time collapses.\n\nThe hydrologic rule: the timing and shape of runoff matter as much as the total volume. Reliable flood decisions depend on records that remain live, local, and connected to the watershed they describe. A return period expresses annual chance and never promises that events will be evenly spaced. Maps and models should be revised after channel change, new development, and every informative event. Operational thresholds should be written before a crisis so a late decision cannot be disguised as fresh analysis. Uncertainty bands belong on discharge forecasts when missing stations or unstable rating curves widen the possible peak.\n\nSherman's unit hydrograph makes the combined-peak mechanism calculable. Runoff from a storm has a time-distributed hydrograph; a reservoir release has another. When gate discharge is added near the natural crest, superposition creates a higher downstream peak than either source alone, with timing that can be traced from gauges and gate positions. An intact dam, measured release, and two converging hydrograph components distinguish operational amplification from breach or debris outburst.",
      "frame": "Marks a missing gauge interval. \"Tell me what the unit hydrograph can establish—and what this gap destroys.\"",
      "q": [
        {
          "q": "Which hydrologic statement best captures LeRoy K. Sherman’s work on the unit hydrograph?",
          "o": [
            {
              "t": "LeRoy Sherman introduced the unit hydrograph, representing the runoff response of a watershed to a unit depth of effective rainfall over a specified duration. Reservoir timing can be checked against rainfall. Flood fits.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "LeRoy K. Sherman's flood work relies on a regional formula and the surviving gauges. Regional practice can favor it. Flood records fit this flood account. Flood context supports the view. Gauge history supports that view.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "LeRoy K. Sherman's flood work is read within flood practice as support for the return-period label as a practical waiting interval between major floods. Regional practice can favor it. Flood records fit this flood account.",
              "v": "wrong",
              "fb": "The proposed inference does not follow from the hydraulic or statistical relationship."
            },
            {
              "t": "LeRoy K. Sherman's flood authority supports delaying a reservoir release until conflicting upstream readings have been reconciled. The surviving record looks compatible. Flood practice makes the flood view plausible.",
              "v": "danger",
              "fb": "That approach hides a preventable information failure behind the language of rarity."
            }
          ]
        },
        {
          "q": "Which method gives the strongest flood estimate or operational decision?",
          "o": [
            {
              "t": "Use this hydrologic procedure: derive a watershed response from observed rainfall-runoff events and apply it only under stated linearity assumptions. Flood fits.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Estimate the peak from current rainfall and a regional runoff coefficient, then update the result after the event. Flood timing supports this flood claim.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "Use the highest basin rainfall total as the downstream flood peak, with storage and travel time folded into the safety margin. Flood records fit this flood account.",
              "v": "wrong",
              "fb": "The proposed inference does not follow from the hydraulic or statistical relationship."
            },
            {
              "t": "Hold the release while the remaining gauges are checked, accepting a larger later discharge to avoid a premature operation. Flood records fit this flood account.",
              "v": "danger",
              "fb": "That approach hides a preventable information failure behind the language of rarity."
            }
          ]
        },
        {
          "q": "Which lesson should guide flood-risk practice?",
          "o": [
            {
              "t": "The watershed lesson is that the timing and shape of runoff matter as much as the total volume. Gauge calibration stays visible in the discharge estimate. Flood fits.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Continue using the published flood map after development, provided the dam and main channel remain in the same locations. Flood records fit this flood account.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "Treat compliance with the written reservoir rule curve as strong evidence that downstream flooding was not reasonably foreseeable. Flood records fit this flood account.",
              "v": "wrong",
              "fb": "The proposed inference does not follow from the hydraulic or statistical relationship."
            },
            {
              "t": "Attribute the loss mainly to an exceptional storm, making rainfall rarity the central basis for future planning. The surviving record looks compatible. Flood fits.",
              "v": "danger",
              "fb": "That approach hides a preventable information failure behind the language of rarity."
            }
          ]
        }
      ]
    },
    "bakhmeteff": {
      "sci": "Boris Bakhmeteff (1880-1951)",
      "topic": "Open-channel hydraulics",
      "lede": "Boris Bakhmeteff gave open-channel hydraulics a quantitative place in the changing life of a watershed.",
      "no": 4,
      "profile": "This morning’s hydrology note uses Boris Bakhmeteff to examine open-channel hydraulics. Boris Bakhmeteff wrote a landmark treatment of gradually varied flow in open channels and helped formalize hydraulic engineering education. His methods related water depth, channel slope, energy, and discharge along rivers and canals. Flood science joins rainfall, soils, drainage networks, channels, reservoirs, and development. Bakhmeteff supplied a way to turn one of those moving parts into a quantity that engineers can test and revise.\n\nThe working procedure is to classify the flow regime and integrate the gradually varied flow equation with appropriate boundary conditions. Every estimate should identify the observation period, basin conditions, boundary assumptions, and uncertainty introduced by missing gauges or changing land use.\n\nA flood hydrograph is a history, not just a peak. Water arrives, is stored, is routed, and interacts with sediment and infrastructure. Operations based on stale ratings or silent stations can look orderly until the response time collapses.\n\nThe hydrologic rule: water depth changes through a reach according to controls upstream and downstream. Reliable flood decisions depend on records that remain live, local, and connected to the watershed they describe. A return period expresses annual chance and never promises that events will be evenly spaced. Maps and models should be revised after channel change, new development, and every informative event. Operational thresholds should be written before a crisis so a late decision cannot be disguised as fresh analysis. Uncertainty bands belong on discharge forecasts when missing stations or unstable rating curves widen the possible peak.",
      "frame": "Unrolls a hydrograph at The Dam Control Room. \"The peak is one point; the river has a whole history. Walk me through open-channel hydraulics.\"",
      "q": [
        {
          "q": "Which hydrologic statement best captures Boris Bakhmeteff’s work on open-channel hydraulics?",
          "o": [
            {
              "t": "Boris Bakhmeteff wrote a landmark treatment of gradually varied flow in open channels and helped formalize hydraulic engineering education. Basin change remains visible. Flood fits. Flood fits.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Boris Bakhmeteff's flood work emphasizes a regional formula and the surviving gauges. The surviving record looks compatible. Flood practice makes the flood view plausible. The flood record fits.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "Boris Bakhmeteff's flood work is read within flood practice as support for the return-period label as a practical waiting interval between major floods. Gauge history supports that view. Flood fits.",
              "v": "wrong",
              "fb": "The proposed inference does not follow from the hydraulic or statistical relationship."
            },
            {
              "t": "Boris Bakhmeteff's flood authority supports delaying a reservoir release until conflicting upstream readings have been reconciled. Flood practice makes the flood view plausible. Flood fits.",
              "v": "danger",
              "fb": "That approach hides a preventable information failure behind the language of rarity."
            }
          ]
        },
        {
          "q": "Which method gives the strongest flood estimate or operational decision?",
          "o": [
            {
              "t": "Use this hydrologic procedure: classify the flow regime and integrate the gradually varied flow equation with appropriate boundary conditions. Basin change remains visible. Flood fits.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Estimate the peak from current rainfall and a regional runoff coefficient, then update the result after the event. Regional practice can favor it. Flood records fit this flood account.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "Use the highest basin rainfall total as the downstream flood peak, with storage and travel time folded into the safety margin. The surviving record looks compatible. The flood record fits.",
              "v": "wrong",
              "fb": "The proposed inference does not follow from the hydraulic or statistical relationship."
            },
            {
              "t": "Hold the release while the remaining gauges are checked, accepting a larger later discharge to avoid a premature operation. The surviving record looks compatible. The flood record fits.",
              "v": "danger",
              "fb": "That approach hides a preventable information failure behind the language of rarity."
            }
          ]
        },
        {
          "q": "Which lesson should guide flood-risk practice?",
          "o": [
            {
              "t": "The watershed lesson is that water depth changes through a reach according to controls upstream and downstream. Reservoir timing can be checked against rainfall. Flood context matters.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Continue using the published flood map after development, provided the dam and main channel remain in the same locations. The surviving record looks compatible. Flood context matters.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "Treat compliance with the written reservoir rule curve as strong evidence that downstream flooding was not reasonably foreseeable. Flood records fit this flood account. Flood context matters.",
              "v": "wrong",
              "fb": "The proposed inference does not follow from the hydraulic or statistical relationship."
            },
            {
              "t": "Attribute the loss mainly to an exceptional storm, making rainfall rarity the central basis for future planning. Regional practice can favor it. Flood records fit this flood account.",
              "v": "danger",
              "fb": "That approach hides a preventable information failure behind the language of rarity."
            }
          ]
        }
      ]
    },
    "snyder": {
      "sci": "Franklin F. Snyder (hydrologist)",
      "topic": "The synthetic unit hydrograph",
      "lede": "Franklin F. Snyder showed how the synthetic unit hydrograph converts scattered water records into an operational forecast.",
      "no": 5,
      "profile": "This morning’s hydrology note uses Franklin F. Snyder to examine the synthetic unit hydrograph. Franklin Snyder developed a synthetic unit hydrograph method for estimating flood response in basins lacking adequate streamflow records. Regional parameters tied hydrograph lag and peak flow to drainage-basin characteristics. Flood science joins rainfall, soils, drainage networks, channels, reservoirs, and development. Snyder supplied a way to turn one of those moving parts into a quantity that engineers can test and revise.\n\nThe working procedure is to estimate an ungauged basin's hydrograph from regional calibration while carrying uncertainty forward. Every estimate should identify the observation period, basin conditions, boundary assumptions, and uncertainty introduced by missing gauges or changing land use.\n\nA flood hydrograph is a history, not just a peak. Water arrives, is stored, is routed, and interacts with sediment and infrastructure. Operations based on stale ratings or silent stations can look orderly until the response time collapses.\n\nThe hydrologic rule: borrowing a model from nearby basins is useful but never equivalent to local observations. Reliable flood decisions depend on records that remain live, local, and connected to the watershed they describe. A return period expresses annual chance and never promises that events will be evenly spaced. Maps and models should be revised after channel change, new development, and every informative event. Operational thresholds should be written before a crisis so a late decision cannot be disguised as fresh analysis. Uncertainty bands belong on discharge forecasts when missing stations or unstable rating curves widen the possible peak. Residents downstream need both expected water levels and the time available before roads or bridges are cut.",
      "frame": "Rests a hand on the flood map. \"Water follows terrain, not office boundaries. Begin with the synthetic unit hydrograph.\"",
      "q": [
        {
          "q": "Which hydrologic statement best captures Franklin F. Snyder’s work on the synthetic unit hydrograph?",
          "o": [
            {
              "t": "Franklin Snyder developed a synthetic unit hydrograph method for estimating flood response in basins lacking adequate streamflow records. Basin change remains visible. Routing assumptions remain attached to the hydrograph. Flood fits.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Franklin F. Snyder's flood work emphasizes a regional formula and the surviving gauges. Regional practice can favor it. Flood records fit this flood account. Flood practice makes the flood view plausible. Flood timing supports this flood claim.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "Franklin F. Snyder's flood work is read within flood practice as support for the return-period label as a practical waiting interval between major floods. The surviving record looks compatible. Flood practice makes the flood view plausible.",
              "v": "wrong",
              "fb": "The proposed inference does not follow from the hydraulic or statistical relationship."
            },
            {
              "t": "Franklin F. Snyder's authority is invoked in flood practice to justify delaying a reservoir release until conflicting upstream readings have been reconciled. Regional practice can favor it. Flood records fit this flood account. Flood fits.",
              "v": "danger",
              "fb": "That approach hides a preventable information failure behind the language of rarity."
            }
          ]
        },
        {
          "q": "Which method gives the strongest flood estimate or operational decision?",
          "o": [
            {
              "t": "Use this hydrologic procedure: estimate an ungauged basin's hydrograph from regional calibration while carrying uncertainty forward. Reservoir timing can be checked against rainfall. Flood fits.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Estimate the peak from current rainfall and a regional runoff coefficient, then update the result after the event. Flood context supports the view. Flood timing supports this flood claim.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "Use the highest basin rainfall total as the downstream flood peak, with storage and travel time folded into the safety margin. Regional practice can favor it. Flood records fit this flood account.",
              "v": "wrong",
              "fb": "The proposed inference does not follow from the hydraulic or statistical relationship."
            },
            {
              "t": "Hold the release while the remaining gauges are checked, accepting a larger later discharge to avoid a premature operation. Regional practice can favor it. Flood records fit this flood account.",
              "v": "danger",
              "fb": "That approach hides a preventable information failure behind the language of rarity."
            }
          ]
        },
        {
          "q": "Which lesson should guide flood-risk practice?",
          "o": [
            {
              "t": "The watershed lesson is that borrowing a model from nearby basins is useful but never equivalent to local observations. The hydrograph stays auditable. Flood fits.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Continue using the published flood map after development, provided the dam and main channel remain in the same locations. Flood records fit this flood account.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "Treat compliance with the written reservoir rule curve as strong evidence that downstream flooding was not reasonably foreseeable. Flood records fit this flood account.",
              "v": "wrong",
              "fb": "The proposed inference does not follow from the hydraulic or statistical relationship."
            },
            {
              "t": "Attribute the loss mainly to an exceptional storm, making rainfall rarity the central basis for future planning. The surviving record looks compatible. Flood fits.",
              "v": "danger",
              "fb": "That approach hides a preventable information failure behind the language of rarity."
            }
          ]
        }
      ]
    },
    "white": {
      "sci": "Gilbert F. White (1911-2006)",
      "topic": "Floodplain management & flood risk",
      "lede": "From rain to river, Gilbert F. White used floodplain management and flood risk to make flood response testable.",
      "no": 6,
      "profile": "This morning’s hydrology note uses Gilbert F. White to examine floodplain management and flood risk. Gilbert F. White transformed flood policy by showing that levees and dams alone can encourage more development in hazardous places. He promoted floodplain mapping, land-use planning, warning, insurance, and other adjustments alongside structural works. Flood science joins rainfall, soils, drainage networks, channels, reservoirs, and development. White supplied a way to turn one of those moving parts into a quantity that engineers can test and revise.\n\nThe working procedure is to map exposure and compare structural protection with zoning, warning, relocation, and public information. Every estimate should identify the observation period, basin conditions, boundary assumptions, and uncertainty introduced by missing gauges or changing land use.\n\nA flood hydrograph is a history, not just a peak. Water arrives, is stored, is routed, and interacts with sediment and infrastructure. Operations based on stale ratings or silent stations can look orderly until the response time collapses.\n\nThe hydrologic rule: flood disasters arise from the meeting of water and vulnerable development. Reliable flood decisions depend on records that remain live, local, and connected to the watershed they describe. A return period expresses annual chance and never promises that events will be evenly spaced. Maps and models should be revised after channel change, new development, and every informative event. Operational thresholds should be written before a crisis so a late decision cannot be disguised as fresh analysis. Uncertainty bands belong on discharge forecasts when missing stations or unstable rating curves widen the possible peak.",
      "frame": "Marks a missing gauge interval. \"Tell me what floodplain management and flood risk can establish—and what this gap destroys.\"",
      "q": [
        {
          "q": "Which hydrologic statement best captures Gilbert F. White’s work on floodplain management and flood risk?",
          "o": [
            {
              "t": "Gilbert F. The hydrograph stays auditable. Basin change remains visible. Routing assumptions remain attached to the hydrograph. Reservoir timing can be checked against rainfall. Fits.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Gilbert F. White's flood work relies on a regional formula and the surviving gauges. Regional practice can favor it. Flood records fit this flood account. Gauge history supports that view.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "Gilbert F. White's flood work is read within flood practice as support for the return-period label as a practical waiting interval between major floods. Flood records fit this flood account.",
              "v": "wrong",
              "fb": "The proposed inference does not follow from the hydraulic or statistical relationship."
            },
            {
              "t": "Gilbert F. White's flood authority supports delaying a reservoir release until conflicting upstream readings have been reconciled. The surviving record looks compatible. Flood fits.",
              "v": "danger",
              "fb": "That approach hides a preventable information failure behind the language of rarity."
            }
          ]
        },
        {
          "q": "Which method gives the strongest flood estimate or operational decision?",
          "o": [
            {
              "t": "Use this hydrologic procedure: map exposure and compare structural protection with zoning, warning, relocation, and public information. Routing assumptions remain attached to the hydrograph. Flood fits.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Estimate the peak from current rainfall and a regional runoff coefficient, then update the result after the event. The surviving record looks compatible. Flood practice makes the flood view plausible. Flood fits.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "Use the highest basin rainfall total as the downstream flood peak, with storage and travel time folded into the safety margin. Flood practice makes the flood view plausible. Flood timing supports this flood claim.",
              "v": "wrong",
              "fb": "The proposed inference does not follow from the hydraulic or statistical relationship."
            },
            {
              "t": "Hold the release while the remaining gauges are checked, accepting a larger later discharge to avoid a premature operation. Regional practice can favor it. Flood timing supports this flood claim. Flood fits.",
              "v": "danger",
              "fb": "That approach hides a preventable information failure behind the language of rarity."
            }
          ]
        },
        {
          "q": "Which lesson should guide flood-risk practice?",
          "o": [
            {
              "t": "The watershed lesson is that flood disasters arise from the meeting of water and vulnerable development. Reservoir timing can be checked against rainfall. Flood fits.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Continue using the published flood map after development, provided the dam and main channel remain in the same locations. Flood records fit this flood account.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "Treat compliance with the written reservoir rule curve as strong evidence that downstream flooding was not reasonably foreseeable. Flood records fit this flood account.",
              "v": "wrong",
              "fb": "The proposed inference does not follow from the hydraulic or statistical relationship."
            },
            {
              "t": "Attribute the loss mainly to an exceptional storm, making rainfall rarity the central basis for future planning. The surviving record looks compatible. Flood fits.",
              "v": "danger",
              "fb": "That approach hides a preventable information failure behind the language of rarity."
            }
          ]
        }
      ]
    },
    "linsley": {
      "sci": "Ray K. Linsley (1917-1990)",
      "topic": "Hydrologic forecasting",
      "lede": "Ray K. Linsley gave hydrologic forecasting a quantitative place in the changing life of a watershed.",
      "no": 7,
      "profile": "This morning’s hydrology note uses Ray K. Linsley to examine hydrologic forecasting. Ray Linsley helped modernize hydrologic forecasting and watershed modeling, linking rainfall observations with runoff calculations and reservoir operations. His textbooks trained generations of engineers in quantitative hydrology. Flood science joins rainfall, soils, drainage networks, channels, reservoirs, and development. Linsley supplied a way to turn one of those moving parts into a quantity that engineers can test and revise.\n\nThe working procedure is to update a forecast with current rainfall, soil moisture, reservoir state, and upstream discharge. Every estimate should identify the observation period, basin conditions, boundary assumptions, and uncertainty introduced by missing gauges or changing land use.\n\nA flood hydrograph is a history, not just a peak. Water arrives, is stored, is routed, and interacts with sediment and infrastructure. Operations based on stale ratings or silent stations can look orderly until the response time collapses.\n\nThe hydrologic rule: forecast errors grow when models are not refreshed by working observations. Reliable flood decisions depend on records that remain live, local, and connected to the watershed they describe. A return period expresses annual chance and never promises that events will be evenly spaced. Maps and models should be revised after channel change, new development, and every informative event. Operational thresholds should be written before a crisis so a late decision cannot be disguised as fresh analysis. Uncertainty bands belong on discharge forecasts when missing stations or unstable rating curves widen the possible peak. Residents downstream need both expected water levels and the time available before roads or bridges are cut.",
      "frame": "Unrolls a hydrograph at The Water District Office. \"The peak is one point; the river has a whole history. Walk me through hydrologic forecasting.\"",
      "q": [
        {
          "q": "Which hydrologic statement best captures Ray K. Linsley’s work on hydrologic forecasting?",
          "o": [
            {
              "t": "Ray Linsley helped modernize hydrologic forecasting and watershed modeling, linking rainfall observations with runoff calculations and reservoir operations. The hydrograph stays auditable. Basin change remains visible. Flood fits.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Ray K. Linsley's flood work emphasizes a regional formula and the surviving gauges. Regional practice can favor it. Flood records fit this flood account. Flood practice makes the flood view plausible. Flood timing supports this flood claim.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "Ray K. Linsley's flood work is read within flood practice as support for the return-period label as a practical waiting interval between major floods. The surviving record looks compatible. Flood practice makes the flood view plausible.",
              "v": "wrong",
              "fb": "The proposed inference does not follow from the hydraulic or statistical relationship."
            },
            {
              "t": "Ray K. Linsley's authority is invoked in flood practice to justify delaying a reservoir release until conflicting upstream readings have been reconciled. Regional practice can favor it. Flood records fit this flood account. Flood fits.",
              "v": "danger",
              "fb": "That approach hides a preventable information failure behind the language of rarity."
            }
          ]
        },
        {
          "q": "Which method gives the strongest flood estimate or operational decision?",
          "o": [
            {
              "t": "Use this hydrologic procedure: update a forecast with current rainfall, soil moisture, reservoir state, and upstream discharge. Basin change remains visible. Flood fits.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Estimate the peak from current rainfall and a regional runoff coefficient, then update the result after the event. The surviving record looks compatible. Flood fits.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "Use the highest basin rainfall total as the downstream flood peak, with storage and travel time folded into the safety margin. Flood practice makes the flood view plausible.",
              "v": "wrong",
              "fb": "The proposed inference does not follow from the hydraulic or statistical relationship."
            },
            {
              "t": "Hold the release while the remaining gauges are checked, accepting a larger later discharge to avoid a premature operation. Regional practice can favor it. Flood fits.",
              "v": "danger",
              "fb": "That approach hides a preventable information failure behind the language of rarity."
            }
          ]
        },
        {
          "q": "Which lesson should guide flood-risk practice?",
          "o": [
            {
              "t": "The watershed lesson is that forecast errors grow when models are not refreshed by working observations. Reservoir timing can be checked against rainfall. Flood fits.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Continue using the published flood map after development, provided the dam and main channel remain in the same locations. Flood records fit this flood account.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "Treat compliance with the written reservoir rule curve as strong evidence that downstream flooding was not reasonably foreseeable. Flood records fit this flood account.",
              "v": "wrong",
              "fb": "The proposed inference does not follow from the hydraulic or statistical relationship."
            },
            {
              "t": "Attribute the loss mainly to an exceptional storm, making rainfall rarity the central basis for future planning. The surviving record looks compatible. Flood fits.",
              "v": "danger",
              "fb": "That approach hides a preventable information failure behind the language of rarity."
            }
          ]
        }
      ]
    },
    "ippen": {
      "sci": "Arthur T. Ippen (1907-1974)",
      "topic": "Hydraulics & flood routing",
      "lede": "Arthur T. Ippen showed how hydraulics and flood routing converts scattered water records into an operational forecast.",
      "no": 8,
      "profile": "This morning’s hydrology note uses Arthur T. Ippen to examine hydraulics and flood routing. Arthur Ippen made major contributions to hydraulic engineering, including unsteady flow, waves, estuaries, and flood routing. At MIT he helped integrate laboratory hydraulics with mathematical analysis of rapidly changing water levels. Flood science joins rainfall, soils, drainage networks, channels, reservoirs, and development. Ippen supplied a way to turn one of those moving parts into a quantity that engineers can test and revise.\n\nThe working procedure is to route a flood wave with continuity and momentum while accounting for channel storage. Every estimate should identify the observation period, basin conditions, boundary assumptions, and uncertainty introduced by missing gauges or changing land use.\n\nA flood hydrograph is a history, not just a peak. Water arrives, is stored, is routed, and interacts with sediment and infrastructure. Operations based on stale ratings or silent stations can look orderly until the response time collapses.\n\nThe hydrologic rule: a downstream peak can be delayed, attenuated, or amplified by channel and reservoir operations. Reliable flood decisions depend on records that remain live, local, and connected to the watershed they describe. A return period expresses annual chance and never promises that events will be evenly spaced. Maps and models should be revised after channel change, new development, and every informative event. Operational thresholds should be written before a crisis so a late decision cannot be disguised as fresh analysis. Uncertainty bands belong on discharge forecasts when missing stations or unstable rating curves widen the possible peak.\n\nIppen's flood-routing work shows how a structural dam breach would announce itself. The opening geometry and reservoir head generate a steep release hydrograph, accompanied by rapid uncontrolled drawdown and physical damage at the dam. Routing then changes the wave downstream but cannot erase its source signature. If the structure remains intact and gate records account for the reservoir loss, “breach” is a compelling image unsupported by the hydraulic boundary conditions.",
      "frame": "Rests a hand on the flood map. \"Water follows terrain, not office boundaries. Begin with hydraulics and flood routing.\"",
      "q": [
        {
          "q": "Which hydrologic statement best captures Arthur T. Ippen’s work on hydraulics and flood routing?",
          "o": [
            {
              "t": "Arthur Ippen made major contributions to hydraulic engineering, including unsteady flow, waves, estuaries, and flood routing. Reservoir timing can be checked against rainfall. Fits.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Arthur T. Ippen's flood work relies on a regional formula and the surviving gauges. Regional practice can favor it. Flood records fit this flood account. Gauge history supports that view.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "Arthur T. Ippen's flood work is read within flood practice as support for the return-period label as a practical waiting interval between major floods. Flood records fit this flood account.",
              "v": "wrong",
              "fb": "The proposed inference does not follow from the hydraulic or statistical relationship."
            },
            {
              "t": "Arthur T. Ippen's flood authority supports delaying a reservoir release until conflicting upstream readings have been reconciled. The surviving record looks compatible. Flood fits.",
              "v": "danger",
              "fb": "That approach hides a preventable information failure behind the language of rarity."
            }
          ]
        },
        {
          "q": "Which method gives the strongest flood estimate or operational decision?",
          "o": [
            {
              "t": "Use this hydrologic procedure: route a flood wave with continuity and momentum while accounting for channel storage. The hydrograph stays auditable. Flood fits.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Estimate the peak from current rainfall and a regional runoff coefficient, then update the result after the event. Regional practice can favor it. Flood fits.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "Use the highest basin rainfall total as the downstream flood peak, with storage and travel time folded into the safety margin. Flood records fit this flood account.",
              "v": "wrong",
              "fb": "The proposed inference does not follow from the hydraulic or statistical relationship."
            },
            {
              "t": "Hold the release while the remaining gauges are checked, accepting a larger later discharge to avoid a premature operation. Flood records fit this flood account.",
              "v": "danger",
              "fb": "That approach hides a preventable information failure behind the language of rarity."
            }
          ]
        },
        {
          "q": "Which lesson should guide flood-risk practice?",
          "o": [
            {
              "t": "The watershed lesson is that a downstream peak can be delayed, attenuated, or amplified by channel and reservoir operations. Basin change remains visible. Flood fits.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Continue using the published flood map after development, provided the dam and main channel remain in the same locations. Flood records fit this flood account.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "Treat compliance with the written reservoir rule curve as strong evidence that downstream flooding was not reasonably foreseeable. Flood records fit this flood account.",
              "v": "wrong",
              "fb": "The proposed inference does not follow from the hydraulic or statistical relationship."
            },
            {
              "t": "Attribute the loss mainly to an exceptional storm, making rainfall rarity the central basis for future planning. The surviving record looks compatible. Flood fits.",
              "v": "danger",
              "fb": "That approach hides a preventable information failure behind the language of rarity."
            }
          ]
        }
      ]
    },
    "haeinstein": {
      "sci": "Hans Albert Einstein (1904-1973)",
      "topic": "Sediment transport in rivers",
      "lede": "From rain to river, Hans Albert Einstein used sediment transport in rivers to make flood response testable.",
      "no": 9,
      "profile": "This morning’s hydrology note uses Hans Albert Einstein to examine sediment transport in rivers. Hans Albert Einstein developed probabilistic and mechanical approaches to sediment transport, treating grains as particles intermittently entrained and deposited by turbulent flow. His work improved estimates of bed-material movement in rivers. Flood science joins rainfall, soils, drainage networks, channels, reservoirs, and development. Einstein supplied a way to turn one of those moving parts into a quantity that engineers can test and revise.\n\nThe working procedure is to separate water discharge from sediment availability and calculate transport under the observed grain and bed conditions. Every estimate should identify the observation period, basin conditions, boundary assumptions, and uncertainty introduced by missing gauges or changing land use.\n\nA flood hydrograph is a history, not just a peak. Water arrives, is stored, is routed, and interacts with sediment and infrastructure. Operations based on stale ratings or silent stations can look orderly until the response time collapses.\n\nThe hydrologic rule: a flood's damage and channel change depend on sediment as well as water. Reliable flood decisions depend on records that remain live, local, and connected to the watershed they describe. A return period expresses annual chance and never promises that events will be evenly spaced. Maps and models should be revised after channel change, new development, and every informative event. Operational thresholds should be written before a crisis so a late decision cannot be disguised as fresh analysis. Uncertainty bands belong on discharge forecasts when missing stations or unstable rating curves widen the possible peak.\n\nEinstein's sediment-transport research supplies the debris-outburst discriminator. Failure of a landslide or debris dam releases water mixed with exceptional sediment, often carrying boulders, woody material, and a dense surge that scours and rebuilds the channel. Deposits record grain size and transport capacity. A water-dominated flood with ordinary suspended sediment and no upstream blockage scar does not match a debris-dam outburst, even if witnesses describe a wall of mud.",
      "frame": "Marks a missing gauge interval. \"Tell me what sediment transport in rivers can establish—and what this gap destroys.\"",
      "q": [
        {
          "q": "Which hydrologic statement best captures Hans Albert Einstein’s work on sediment transport in rivers?",
          "o": [
            {
              "t": "Hans Albert Einstein developed probabilistic and mechanical approaches to sediment transport, treating grains as particles intermittently entrained and deposited by turbulent flow. Fits.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Hans Albert Einstein's flood work relies on a regional formula and the surviving gauges. Regional practice can favor it. Flood records fit this flood account. Gauge history supports that view.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "Hans Albert Einstein's flood work is read within flood practice as support for the return-period label as a practical waiting interval between major floods. Flood records fit this flood account.",
              "v": "wrong",
              "fb": "The proposed inference does not follow from the hydraulic or statistical relationship."
            },
            {
              "t": "Hans Albert Einstein's flood authority supports delaying a reservoir release until conflicting upstream readings have been reconciled. The surviving record looks compatible. Flood fits.",
              "v": "danger",
              "fb": "That approach hides a preventable information failure behind the language of rarity."
            }
          ]
        },
        {
          "q": "Which method gives the strongest flood estimate or operational decision?",
          "o": [
            {
              "t": "Use this hydrologic procedure: separate water discharge from sediment availability and calculate transport under the observed grain and bed conditions. Flood fits.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Estimate the peak from current rainfall and a regional runoff coefficient, then update the result after the event. Flood practice makes the flood view plausible.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "Use the highest basin rainfall total as the downstream flood peak, with storage and travel time folded into the safety margin. Flood records fit this flood account.",
              "v": "wrong",
              "fb": "The proposed inference does not follow from the hydraulic or statistical relationship."
            },
            {
              "t": "Hold the release while the remaining gauges are checked, accepting a larger later discharge to avoid a premature operation. Flood records fit this flood account.",
              "v": "danger",
              "fb": "That approach hides a preventable information failure behind the language of rarity."
            }
          ]
        },
        {
          "q": "Which lesson should guide flood-risk practice?",
          "o": [
            {
              "t": "The watershed lesson is that a flood's damage and channel change depend on sediment as well as water. Reservoir timing can be checked against rainfall. Flood fits.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Continue using the published flood map after development, provided the dam and main channel remain in the same locations. Flood records fit this flood account.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "Treat compliance with the written reservoir rule curve as strong evidence that downstream flooding was not reasonably foreseeable. Flood records fit this flood account.",
              "v": "wrong",
              "fb": "The proposed inference does not follow from the hydraulic or statistical relationship."
            },
            {
              "t": "Attribute the loss mainly to an exceptional storm, making rainfall rarity the central basis for future planning. The surviving record looks compatible. Flood fits.",
              "v": "danger",
              "fb": "That approach hides a preventable information failure behind the language of rarity."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "gaugekeeper": {
      "gauges": "The recovered stage recorders sits ready in The Creek & Gauge Stations; Gauge Keeper Wynn adds a reservoir notation. \"Hydrology starts with measured terms; prove the profile before I share station records.\"",
      "controlroom": "The gate-position timeline sits ready in The Dam Control Room; Gauge Keeper Wynn adds a reservoir notation. \"Hydrology starts with measured terms; prove the profile before I share station records.\"",
      "office": "The reservoir operating plan sits ready in The Water District Office; Gauge Keeper Wynn adds a reservoir notation. \"Hydrology starts with measured terms; prove the profile before I share station records.\""
    },
    "operator": {
      "gauges": "The recovered stage recorders sits ready in The Creek & Gauge Stations; The Gate Operator adds a reservoir notation. \"The gate timeline waits until you show that the day's method made sense.\"",
      "controlroom": "The gate-position timeline sits ready in The Dam Control Room; The Gate Operator adds a reservoir notation. \"The gate timeline waits until you show that the day's method made sense.\"",
      "office": "The reservoir operating plan sits ready in The Water District Office; The Gate Operator adds a reservoir notation. \"The gate timeline waits until you show that the day's method made sense.\""
    },
    "clerk": {
      "gauges": "The recovered stage recorders sits ready in The Creek & Gauge Stations; The Clerk adds a reservoir notation. \"Answer the pioneer carefully, and the district archive will open.\"",
      "controlroom": "The gate-position timeline sits ready in The Dam Control Room; The Clerk adds a reservoir notation. \"Answer the pioneer carefully, and the district archive will open.\"",
      "office": "The reservoir operating plan sits ready in The Water District Office; The Clerk adds a reservoir notation. \"Answer the pioneer carefully, and the district archive will open.\""
    }
  },
  "story": [
    "<b>The Rossmere Flood</b> opens inside the Rossmere flood inquiry, where the visible damage is easier to describe than the chain that produced it.",
    "<b>Gauge Keeper Wynn</b>, <b>The Gate Operator</b>, and <b>The Clerk</b> each control a different slice of the record, and each conversation turns one real pioneer into a way of reading the case.",
    "Some witnesses are drawn toward <b>A structural dam breach released the reservoir in one sudden wave.</b>; others settle too quickly on <b>A debris-dam outburst sent a sediment-heavy surge down the canyon.</b>. Your job is to separate those tempting stories from the harder explanation the evidence supports.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide what the case is really about."
  ],
  "endings": {
    "overclaimWhat": "sabotage",
    "dismissalWhat": "freak",
    "win": {
      "expertTitle": "Two Peaks Arrived as One",
      "expert": [
        "Inspector Tomasz Bey names Elias Thorn — reservoir operations manager, The Water District Office, and A late reservoir release coincided with the natural flood crest. Not A structural dam breach released the reservoir in one sudden wave. Not A debris-dam outburst sent a sediment-heavy surge down the canyon.",
        "The readings distinguish a structural breach, a sediment-rich debris outburst, and superposition of a controlled release with the natural runoff crest through hydrograph shape, reservoir drawdown, and deposited material."
      ],
      "soundTitle": "A Defensible Flood Reconstruction",
      "sound": [
        "Reservoir evidence fixes the trio: Elias Thorn — reservoir operations manager; The Water District Office; A late reservoir release coincided with the natural flood crest.",
        "Hydrograph evidence is sufficient for mechanism; the district decision trail needs additional confirmation."
      ],
      "namedTitle": "Correct Hydrograph, Limited Chain",
      "named": [
        "Reservoir evidence points to Elias Thorn — reservoir operations manager, The Water District Office, and A late reservoir release coincided with the natural flood crest; reservoir support remains incomplete.",
        "The hydrograph choice succeeds, while the operational evidence remains below a defensible threshold."
      ]
    },
    "overclaim": {
      "title": "The Dam-Breach Theory",
      "body": [
        "Inspector Tomasz Bey calls it A structural dam breach released the reservoir in one sudden wave. Reservoir behavior contradicts structural failure.",
        "A dam breach should leave structural failure, rapid uncontrolled reservoir drawdown, and a breach hydrograph tied to the opening geometry. The dam and pool history do not show that signature."
      ]
    },
    "dismissal": {
      "title": "The Debris-Outburst Theory",
      "body": [
        "Inspector Tomasz Bey instead calls it A debris-dam outburst sent a sediment-heavy surge down the canyon. Sediment and channel evidence do not support an outburst.",
        "A debris-dam outburst carries unusually dense sediment, boulders, and channel-changing deposits from the failed blockage. The flood deposits are compatible with ordinary transported sediment rather than a debris surge."
      ]
    },
    "wrongNames": {
      "title": "Right Flood Mechanism, Wrong Names",
      "body": [
        "The synchronized-peak judgment is sound; WHO or WHERE is not. Reconcile the hydrograph with the district clue record."
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A dam and river gauge overtopped by flood water\"><path d=\"M0 96 C80 82,160 104,240 92 S400 82,520 94 S610 106,660 90\" fill=\"none\" stroke=\"#e2e2d8\" stroke-width=\"1\"/><path d=\"M20 32 L160 32 L180 98 L0 98 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><line x1=\"95\" y1=\"20\" x2=\"95\" y2=\"98\" stroke=\"#121212\" stroke-width=\"1.5\"/><line x1=\"88\" y1=\"48\" x2=\"102\" y2=\"48\" stroke=\"#121212\" stroke-width=\"1.5\"/><line x1=\"88\" y1=\"66\" x2=\"102\" y2=\"66\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M170 70 C250 56,335 90,420 70 S565 56,650 74\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2.2\"/><path d=\"M172 82 C250 68,336 102,420 82 S565 68,648 86\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2.2\"/><path d=\"M470 24 L520 24 L520 98 L470 98 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M482 98 L482 58 L508 58 L508 98\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"1.8\"/></svg>"
}};
