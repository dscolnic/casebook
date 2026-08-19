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
  "boardNarr": "You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  "placeNarr": "You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
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
        "dbernoulli",
        "mulvaney"
      ],
      "operator": [
        "kuichling",
        "newell"
      ],
      "clerk": [
        "sherman",
        "hurst"
      ]
    },
    "controlroom": {
      "gaugekeeper": [
        "bakhmeteff",
        "keulegan"
      ],
      "operator": [
        "snyder",
        "langbein"
      ],
      "clerk": [
        "white",
        "leopold"
      ]
    },
    "office": {
      "gaugekeeper": [
        "linsley",
        "nash"
      ],
      "operator": [
        "ippen",
        "maddock"
      ],
      "clerk": [
        "haeinstein",
        "vanoni"
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
      "frame": "Gauge Keeper Wynn unrolls a hydrograph at The Creek & Gauge Stations. \"The peak is one point; the river has a whole history. Walk me through hydrodynamics and bernoulli’s principle.\"",
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
    "mulvaney": {
      "sci": "Thomas Mulvaney (1822-1892)",
      "topic": "The rational method for peak flow",
      "lede": "From rain to river, Thomas Mulvaney used the rational method for peak flow to make flood response testable.",
      "no": 2,
      "profile": "This morning’s hydrology note uses Thomas Mulvaney to examine the rational method for peak flow. Thomas Mulvaney introduced the rational method for estimating peak runoff from a small drainage area. The method relates peak discharge to rainfall intensity, drainage area, and a runoff coefficient representing how much rain becomes rapid flow. Flood science joins rainfall, soils, drainage networks, channels, reservoirs, and development. Mulvaney supplied a way to turn one of those moving parts into a quantity that engineers can test and revise.\n\nThe working procedure is to match rainfall intensity to the catchment's time of concentration and choose the runoff coefficient transparently. Every estimate should identify the observation period, basin conditions, boundary assumptions, and uncertainty introduced by missing gauges or changing land use.\n\nA flood hydrograph is a history, not just a peak. Water arrives, is stored, is routed, and interacts with sediment and infrastructure. Operations based on stale ratings or silent stations can look orderly until the response time collapses.\n\nThe hydrologic rule: simple flood formulas are screening tools whose inputs encode land cover and timing. Reliable flood decisions depend on records that remain live, local, and connected to the watershed they describe. A return period expresses annual chance and never promises that events will be evenly spaced. Maps and models should be revised after channel change, new development, and every informative event. Operational thresholds should be written before a crisis so a late decision cannot be disguised as fresh analysis. Uncertainty bands belong on discharge forecasts when missing stations or unstable rating curves widen the possible peak.",
      "frame": "Gauge Keeper Wynn marks a missing gauge interval. \"Tell me what the rational method for peak flow can establish—and what this gap destroys.\"",
      "q": [
        {
          "q": "Which hydrologic statement best captures Thomas Mulvaney’s work on the rational method for peak flow?",
          "o": [
            {
              "t": "Thomas Mulvaney introduced the rational method for estimating peak runoff from a small drainage area. Basin change remains visible. Reservoir timing can be checked against rainfall. Fits.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Thomas Mulvaney's flood work relies on a regional formula and the surviving gauges. Regional practice can favor it. Flood records fit this flood account. Flood timing supports this flood claim.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "Thomas Mulvaney's flood work is read within flood practice as support for the return-period label as a practical waiting interval between major floods. Flood practice makes the flood view plausible.",
              "v": "wrong",
              "fb": "The proposed inference does not follow from the hydraulic or statistical relationship."
            },
            {
              "t": "Thomas Mulvaney's authority is invoked in flood practice to justify delaying a reservoir release until conflicting upstream readings have been reconciled. Gauge history supports that view.",
              "v": "danger",
              "fb": "That approach hides a preventable information failure behind the language of rarity."
            }
          ]
        },
        {
          "q": "Which method gives the strongest flood estimate or operational decision?",
          "o": [
            {
              "t": "Use this hydrologic procedure: match rainfall intensity to the catchment's time of concentration and choose the runoff coefficient transparently. Flood fits.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Estimate the peak from current rainfall and a regional runoff coefficient, then update the result after the event. Flood records fit this flood account.",
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
              "t": "The watershed lesson is that simple flood formulas are screening tools whose inputs encode land cover and timing. Reservoir timing can be checked against rainfall. Flood context matters.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Continue using the published flood map after development, provided the dam and main channel remain in the same locations. The surviving record looks compatible. The flood record fits.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "Treat compliance with the written reservoir rule curve as strong evidence that downstream flooding was not reasonably foreseeable. Flood records fit this flood account. The flood record fits.",
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
    "kuichling": {
      "sci": "Emil Kuichling (1848-1919)",
      "topic": "Urban storm drainage & runoff",
      "lede": "Emil Kuichling showed how urban storm drainage and runoff converts scattered water records into an operational forecast.",
      "no": 3,
      "profile": "This morning’s hydrology note uses Emil Kuichling to examine urban storm drainage and runoff. Emil Kuichling applied quantitative runoff analysis to urban sewer design and helped popularize the rational method in American engineering. His work addressed the new problem of rapid drainage from paved streets and dense development. Flood science joins rainfall, soils, drainage networks, channels, reservoirs, and development. Kuichling supplied a way to turn one of those moving parts into a quantity that engineers can test and revise.\n\nThe working procedure is to estimate how impervious area and drainage connectivity shorten runoff response. Every estimate should identify the observation period, basin conditions, boundary assumptions, and uncertainty introduced by missing gauges or changing land use.\n\nA flood hydrograph is a history, not just a peak. Water arrives, is stored, is routed, and interacts with sediment and infrastructure. Operations based on stale ratings or silent stations can look orderly until the response time collapses.\n\nThe hydrologic rule: urbanization changes not just how much water runs off but how quickly the peak arrives. Reliable flood decisions depend on records that remain live, local, and connected to the watershed they describe. A return period expresses annual chance and never promises that events will be evenly spaced. Maps and models should be revised after channel change, new development, and every informative event. Operational thresholds should be written before a crisis so a late decision cannot be disguised as fresh analysis. Uncertainty bands belong on discharge forecasts when missing stations or unstable rating curves widen the possible peak.",
      "frame": "The Gate Operator rests a hand on the flood map. \"Water follows terrain, not office boundaries. Begin with urban storm drainage and runoff.\"",
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
    "newell": {
      "sci": "Frederick H. Newell (1862-1932)",
      "topic": "Stream gauging & the hydrographic survey",
      "lede": "Frederick H. Newell gave stream gauging and the hydrographic survey a quantitative place in the changing life of a watershed.",
      "no": 4,
      "profile": "This morning’s hydrology note uses Frederick H. Newell to examine stream gauging and the hydrographic survey. Frederick Newell organized early federal stream-gauging work and the Hydrographic Survey that became part of the U.S. Geological Survey. Standardized measurements of river stage and discharge created the observational foundation for water planning. Flood science joins rainfall, soils, drainage networks, channels, reservoirs, and development. Newell supplied a way to turn one of those moving parts into a quantity that engineers can test and revise.\n\nThe working procedure is to build a stage-discharge rating curve from repeated current-meter measurements and maintain it as the channel changes. Every estimate should identify the observation period, basin conditions, boundary assumptions, and uncertainty introduced by missing gauges or changing land use.\n\nA flood hydrograph is a history, not just a peak. Water arrives, is stored, is routed, and interacts with sediment and infrastructure. Operations based on stale ratings or silent stations can look orderly until the response time collapses.\n\nThe hydrologic rule: flood forecasting depends on gauges that are calibrated, transmitted, and repaired. Reliable flood decisions depend on records that remain live, local, and connected to the watershed they describe. A return period expresses annual chance and never promises that events will be evenly spaced. Maps and models should be revised after channel change, new development, and every informative event. Operational thresholds should be written before a crisis so a late decision cannot be disguised as fresh analysis. Uncertainty bands belong on discharge forecasts when missing stations or unstable rating curves widen the possible peak.",
      "frame": "The Gate Operator unrolls a hydrograph at The Creek & Gauge Stations. \"The peak is one point; the river has a whole history. Walk me through stream gauging and the hydrographic survey.\"",
      "q": [
        {
          "q": "Which hydrologic statement best captures Frederick H. Newell’s work on stream gauging and the hydrographic survey?",
          "o": [
            {
              "t": "Frederick Newell organized early federal stream-gauging work and the Hydrographic Survey that became part of the U.S. Routing assumptions remain attached to the hydrograph. Reservoir timing can be checked against rainfall.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Frederick H. Newell's flood work emphasizes a regional formula and the surviving gauges. Gauge history supports that view. Regional practice can favor it. Flood records fit this flood account. Flood timing supports this flood claim.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "Frederick H. Newell's flood work is read within flood practice as support for the return-period label as a practical waiting interval between major floods. Gauge history supports that view. The surviving record looks compatible.",
              "v": "wrong",
              "fb": "The proposed inference does not follow from the hydraulic or statistical relationship."
            },
            {
              "t": "Frederick H. Newell's authority is invoked in flood practice to justify delaying a reservoir release until conflicting upstream readings have been reconciled. Regional practice can favor it. Flood records fit this flood account.",
              "v": "danger",
              "fb": "That approach hides a preventable information failure behind the language of rarity."
            }
          ]
        },
        {
          "q": "Which method gives the strongest flood estimate or operational decision?",
          "o": [
            {
              "t": "Use this hydrologic procedure: build a stage-discharge rating curve from repeated current-meter measurements and maintain it as the channel changes. Flood fits.",
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
              "t": "The watershed lesson is that flood forecasting depends on gauges that are calibrated, transmitted, and repaired. Reservoir timing can be checked against rainfall. Flood context matters.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Continue using the published flood map after development, provided the dam and main channel remain in the same locations. The surviving record looks compatible. The flood record fits.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "Treat compliance with the written reservoir rule curve as strong evidence that downstream flooding was not reasonably foreseeable. Flood records fit this flood account. The flood record fits.",
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
    "sherman": {
      "sci": "LeRoy K. Sherman (1869-1954)",
      "topic": "The unit hydrograph",
      "lede": "From rain to river, LeRoy K. Sherman used the unit hydrograph to make flood response testable.",
      "no": 5,
      "profile": "This morning’s hydrology note uses LeRoy K. Sherman to examine the unit hydrograph. LeRoy Sherman introduced the unit hydrograph, representing the runoff response of a watershed to a unit depth of effective rainfall over a specified duration. It allowed engineers to transform a rainfall pattern into an estimated discharge hydrograph. Flood science joins rainfall, soils, drainage networks, channels, reservoirs, and development. Sherman supplied a way to turn one of those moving parts into a quantity that engineers can test and revise.\n\nThe working procedure is to derive a watershed response from observed rainfall-runoff events and apply it only under stated linearity assumptions. Every estimate should identify the observation period, basin conditions, boundary assumptions, and uncertainty introduced by missing gauges or changing land use.\n\nA flood hydrograph is a history, not just a peak. Water arrives, is stored, is routed, and interacts with sediment and infrastructure. Operations based on stale ratings or silent stations can look orderly until the response time collapses.\n\nThe hydrologic rule: the timing and shape of runoff matter as much as the total volume. Reliable flood decisions depend on records that remain live, local, and connected to the watershed they describe. A return period expresses annual chance and never promises that events will be evenly spaced. Maps and models should be revised after channel change, new development, and every informative event. Operational thresholds should be written before a crisis so a late decision cannot be disguised as fresh analysis. Uncertainty bands belong on discharge forecasts when missing stations or unstable rating curves widen the possible peak.\n\nSherman's unit hydrograph makes the combined-peak mechanism calculable. Runoff from a storm has a time-distributed hydrograph; a reservoir release has another. When gate discharge is added near the natural crest, superposition creates a higher downstream peak than either source alone, with timing that can be traced from gauges and gate positions. An intact dam, measured release, and two converging hydrograph components distinguish operational amplification from breach or debris outburst.",
      "frame": "The Clerk marks a missing gauge interval. \"Tell me what the unit hydrograph can establish—and what this gap destroys.\"",
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
    "hurst": {
      "sci": "Harold Edwin Hurst (1880-1978)",
      "topic": "Long-term storage & flood records",
      "lede": "Harold Edwin Hurst showed how long-term storage and flood records converts scattered water records into an operational forecast.",
      "no": 6,
      "profile": "This morning’s hydrology note uses Harold Edwin Hurst to examine long-term storage and flood records. Working on Nile reservoirs, Harold Hurst found that long hydrologic records showed persistence beyond simple independent year-to-year variation. The Hurst exponent and rescaled-range analysis became important in studies of long-memory behavior. Flood science joins rainfall, soils, drainage networks, channels, reservoirs, and development. Hurst supplied a way to turn one of those moving parts into a quantity that engineers can test and revise.\n\nThe working procedure is to examine long records for persistence and test whether storage design assumes falsely independent years. Every estimate should identify the observation period, basin conditions, boundary assumptions, and uncertainty introduced by missing gauges or changing land use.\n\nA flood hydrograph is a history, not just a peak. Water arrives, is stored, is routed, and interacts with sediment and infrastructure. Operations based on stale ratings or silent stations can look orderly until the response time collapses.\n\nThe hydrologic rule: rare floods and droughts can cluster, making short records deceptively calm. Reliable flood decisions depend on records that remain live, local, and connected to the watershed they describe. A return period expresses annual chance and never promises that events will be evenly spaced. Maps and models should be revised after channel change, new development, and every informative event. Operational thresholds should be written before a crisis so a late decision cannot be disguised as fresh analysis. Uncertainty bands belong on discharge forecasts when missing stations or unstable rating curves widen the possible peak.",
      "frame": "The Clerk rests a hand on the flood map. \"Water follows terrain, not office boundaries. Begin with long-term storage and flood records.\"",
      "q": [
        {
          "q": "Which hydrologic statement best captures Harold Edwin Hurst’s work on long-term storage and flood records?",
          "o": [
            {
              "t": "Working on Nile reservoirs, Harold Hurst found that long hydrologic records showed persistence beyond simple independent year-to-year variation. Basin change remains visible. Routing assumptions remain attached to the hydrograph. Flood fits.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Harold Edwin Hurst's flood work emphasizes a regional formula and the surviving gauges. The surviving record looks compatible. Flood records fit this flood account. Flood practice makes the flood view plausible. Flood timing supports this flood claim.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "Harold Edwin Hurst's flood work supports the return-period label as a practical waiting interval between major floods. The surviving record looks compatible. Flood practice makes the flood view plausible. Flood timing supports this flood claim.",
              "v": "wrong",
              "fb": "The proposed inference does not follow from the hydraulic or statistical relationship."
            },
            {
              "t": "Harold Edwin Hurst's authority is invoked in flood practice to justify delaying a reservoir release until conflicting upstream readings have been reconciled. Flood practice makes the flood view plausible. Flood timing supports this flood claim.",
              "v": "danger",
              "fb": "That approach hides a preventable information failure behind the language of rarity."
            }
          ]
        },
        {
          "q": "Which method gives the strongest flood estimate or operational decision?",
          "o": [
            {
              "t": "Use this hydrologic procedure: examine long records for persistence and test whether storage design assumes falsely independent years. Routing assumptions remain attached to the hydrograph. Flood fits.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Estimate the peak from current rainfall and a regional runoff coefficient, then update the result after the event. Gauge history supports that view. The surviving record looks compatible. Flood fits.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "Use the highest basin rainfall total as the downstream flood peak, with storage and travel time folded into the safety margin. Regional practice can favor it. Flood practice makes the flood view plausible.",
              "v": "wrong",
              "fb": "The proposed inference does not follow from the hydraulic or statistical relationship."
            },
            {
              "t": "Hold the release while the remaining gauges are checked, accepting a larger later discharge to avoid a premature operation. Flood records fit this flood account. Flood timing supports this flood claim.",
              "v": "danger",
              "fb": "That approach hides a preventable information failure behind the language of rarity."
            }
          ]
        },
        {
          "q": "Which lesson should guide flood-risk practice?",
          "o": [
            {
              "t": "The watershed lesson is that rare floods and droughts can cluster, making short records deceptively calm. Reservoir timing can be checked against rainfall. Flood fits.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Continue using the published flood map after development, provided the dam and main channel remain in the same locations. Regional practice can favor it. Flood fits.",
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
      "no": 7,
      "profile": "This morning’s hydrology note uses Boris Bakhmeteff to examine open-channel hydraulics. Boris Bakhmeteff wrote a landmark treatment of gradually varied flow in open channels and helped formalize hydraulic engineering education. His methods related water depth, channel slope, energy, and discharge along rivers and canals. Flood science joins rainfall, soils, drainage networks, channels, reservoirs, and development. Bakhmeteff supplied a way to turn one of those moving parts into a quantity that engineers can test and revise.\n\nThe working procedure is to classify the flow regime and integrate the gradually varied flow equation with appropriate boundary conditions. Every estimate should identify the observation period, basin conditions, boundary assumptions, and uncertainty introduced by missing gauges or changing land use.\n\nA flood hydrograph is a history, not just a peak. Water arrives, is stored, is routed, and interacts with sediment and infrastructure. Operations based on stale ratings or silent stations can look orderly until the response time collapses.\n\nThe hydrologic rule: water depth changes through a reach according to controls upstream and downstream. Reliable flood decisions depend on records that remain live, local, and connected to the watershed they describe. A return period expresses annual chance and never promises that events will be evenly spaced. Maps and models should be revised after channel change, new development, and every informative event. Operational thresholds should be written before a crisis so a late decision cannot be disguised as fresh analysis. Uncertainty bands belong on discharge forecasts when missing stations or unstable rating curves widen the possible peak.",
      "frame": "Gauge Keeper Wynn unrolls a hydrograph at The Dam Control Room. \"The peak is one point; the river has a whole history. Walk me through open-channel hydraulics.\"",
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
    "keulegan": {
      "sci": "Garbis Keulegan (1890-1989)",
      "topic": "Hydraulics & channel flow",
      "lede": "From rain to river, Garbis Keulegan used hydraulics and channel flow to make flood response testable.",
      "no": 8,
      "profile": "This morning’s hydrology note uses Garbis Keulegan to examine hydraulics and channel flow. Garbis Keulegan investigated resistance, turbulence, density currents, and flow in open channels at the National Bureau of Standards. His experimental work supplied data for hydraulic relations used in channels and estuaries. Flood science joins rainfall, soils, drainage networks, channels, reservoirs, and development. Keulegan supplied a way to turn one of those moving parts into a quantity that engineers can test and revise.\n\nThe working procedure is to use dimensionless parameters and experiments to determine when friction or density differences control flow. Every estimate should identify the observation period, basin conditions, boundary assumptions, and uncertainty introduced by missing gauges or changing land use.\n\nA flood hydrograph is a history, not just a peak. Water arrives, is stored, is routed, and interacts with sediment and infrastructure. Operations based on stale ratings or silent stations can look orderly until the response time collapses.\n\nThe hydrologic rule: laboratory laws must be scaled carefully before they are applied to rivers. Reliable flood decisions depend on records that remain live, local, and connected to the watershed they describe. A return period expresses annual chance and never promises that events will be evenly spaced. Maps and models should be revised after channel change, new development, and every informative event. Operational thresholds should be written before a crisis so a late decision cannot be disguised as fresh analysis. Uncertainty bands belong on discharge forecasts when missing stations or unstable rating curves widen the possible peak.",
      "frame": "Gauge Keeper Wynn marks a missing gauge interval. \"Tell me what hydraulics and channel flow can establish—and what this gap destroys.\"",
      "q": [
        {
          "q": "Which hydrologic statement best captures Garbis Keulegan’s work on hydraulics and channel flow?",
          "o": [
            {
              "t": "Garbis Keulegan investigated resistance, turbulence, density currents, and flow in open channels at the National Bureau of Standards. Basin change remains visible. Routing assumptions remain attached to the hydrograph.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Garbis Keulegan's flood work emphasizes a regional formula and the surviving gauges. Gauge history supports that view. Regional practice can favor it. Flood records fit this flood account. Flood timing supports this flood claim.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "Garbis Keulegan's flood work is read within flood practice as support for the return-period label as a practical waiting interval between major floods. Gauge history supports that view. The surviving record looks compatible.",
              "v": "wrong",
              "fb": "The proposed inference does not follow from the hydraulic or statistical relationship."
            },
            {
              "t": "Garbis Keulegan's authority is invoked in flood practice to justify delaying a reservoir release until conflicting upstream readings have been reconciled. Regional practice can favor it. Flood records fit this flood account.",
              "v": "danger",
              "fb": "That approach hides a preventable information failure behind the language of rarity."
            }
          ]
        },
        {
          "q": "Which method gives the strongest flood estimate or operational decision?",
          "o": [
            {
              "t": "Use this hydrologic procedure: use dimensionless parameters and experiments to determine when friction or density differences control flow. The hydrograph stays auditable. Flood fits.",
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
              "t": "The watershed lesson is that laboratory laws must be scaled carefully before they are applied to rivers. Reservoir timing can be checked against rainfall. Flood fits.",
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
    "snyder": {
      "sci": "Franklin F. Snyder (hydrologist)",
      "topic": "The synthetic unit hydrograph",
      "lede": "Franklin F. Snyder showed how the synthetic unit hydrograph converts scattered water records into an operational forecast.",
      "no": 9,
      "profile": "This morning’s hydrology note uses Franklin F. Snyder to examine the synthetic unit hydrograph. Franklin Snyder developed a synthetic unit hydrograph method for estimating flood response in basins lacking adequate streamflow records. Regional parameters tied hydrograph lag and peak flow to drainage-basin characteristics. Flood science joins rainfall, soils, drainage networks, channels, reservoirs, and development. Snyder supplied a way to turn one of those moving parts into a quantity that engineers can test and revise.\n\nThe working procedure is to estimate an ungauged basin's hydrograph from regional calibration while carrying uncertainty forward. Every estimate should identify the observation period, basin conditions, boundary assumptions, and uncertainty introduced by missing gauges or changing land use.\n\nA flood hydrograph is a history, not just a peak. Water arrives, is stored, is routed, and interacts with sediment and infrastructure. Operations based on stale ratings or silent stations can look orderly until the response time collapses.\n\nThe hydrologic rule: borrowing a model from nearby basins is useful but never equivalent to local observations. Reliable flood decisions depend on records that remain live, local, and connected to the watershed they describe. A return period expresses annual chance and never promises that events will be evenly spaced. Maps and models should be revised after channel change, new development, and every informative event. Operational thresholds should be written before a crisis so a late decision cannot be disguised as fresh analysis. Uncertainty bands belong on discharge forecasts when missing stations or unstable rating curves widen the possible peak. Residents downstream need both expected water levels and the time available before roads or bridges are cut.",
      "frame": "The Gate Operator rests a hand on the flood map. \"Water follows terrain, not office boundaries. Begin with the synthetic unit hydrograph.\"",
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
    "langbein": {
      "sci": "Walter B. Langbein (1907-1982)",
      "topic": "Statistical hydrology & runoff",
      "lede": "Walter B. Langbein gave statistical hydrology and runoff a quantitative place in the changing life of a watershed.",
      "no": 10,
      "profile": "This morning’s hydrology note uses Walter B. Langbein to examine statistical hydrology and runoff. Walter Langbein advanced statistical hydrology, watershed analysis, and the study of runoff variability. He examined how climate and basin properties shape streamflow and helped strengthen quantitative flood-frequency practice. Flood science joins rainfall, soils, drainage networks, channels, reservoirs, and development. Langbein supplied a way to turn one of those moving parts into a quantity that engineers can test and revise.\n\nThe working procedure is to fit flood-frequency models to quality-controlled records and test sensitivity to outliers and record length. Every estimate should identify the observation period, basin conditions, boundary assumptions, and uncertainty introduced by missing gauges or changing land use.\n\nA flood hydrograph is a history, not just a peak. Water arrives, is stored, is routed, and interacts with sediment and infrastructure. Operations based on stale ratings or silent stations can look orderly until the response time collapses.\n\nThe hydrologic rule: a return period describes probability, not a calendar schedule or physical upper limit. Reliable flood decisions depend on records that remain live, local, and connected to the watershed they describe. A return period expresses annual chance and never promises that events will be evenly spaced. Maps and models should be revised after channel change, new development, and every informative event. Operational thresholds should be written before a crisis so a late decision cannot be disguised as fresh analysis. Uncertainty bands belong on discharge forecasts when missing stations or unstable rating curves widen the possible peak. Residents downstream need both expected water levels and the time available before roads or bridges are cut.",
      "frame": "The Gate Operator unrolls a hydrograph at The Dam Control Room. \"The peak is one point; the river has a whole history. Walk me through statistical hydrology and runoff.\"",
      "q": [
        {
          "q": "Which hydrologic statement best captures Walter B. Langbein’s work on statistical hydrology and runoff?",
          "o": [
            {
              "t": "Walter Langbein advanced statistical hydrology, watershed analysis, and the study of runoff variability. Basin change remains visible. Reservoir timing can be checked against rainfall. Fits.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Walter B. Langbein's flood work relies on a regional formula and the surviving gauges. Regional practice can favor it. Flood records fit this flood account. Flood timing supports this flood claim.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "Walter B. Langbein's flood work is read within flood practice as support for the return-period label as a practical waiting interval between major floods. Flood practice makes the flood view plausible.",
              "v": "wrong",
              "fb": "The proposed inference does not follow from the hydraulic or statistical relationship."
            },
            {
              "t": "Walter B. Langbein's authority is invoked in flood practice to justify delaying a reservoir release until conflicting upstream readings have been reconciled. Gauge history supports that view.",
              "v": "danger",
              "fb": "That approach hides a preventable information failure behind the language of rarity."
            }
          ]
        },
        {
          "q": "Which method gives the strongest flood estimate or operational decision?",
          "o": [
            {
              "t": "Use this hydrologic procedure: fit flood-frequency models to quality-controlled records and test sensitivity to outliers and record length. The hydrograph stays auditable. Flood fits.",
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
              "t": "The watershed lesson is that a return period describes probability, not a calendar schedule or physical upper limit. Basin change remains visible. Reservoir timing can be checked against rainfall. Flood context matters.",
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
    "white": {
      "sci": "Gilbert F. White (1911-2006)",
      "topic": "Floodplain management & flood risk",
      "lede": "From rain to river, Gilbert F. White used floodplain management and flood risk to make flood response testable.",
      "no": 11,
      "profile": "This morning’s hydrology note uses Gilbert F. White to examine floodplain management and flood risk. Gilbert F. White transformed flood policy by showing that levees and dams alone can encourage more development in hazardous places. He promoted floodplain mapping, land-use planning, warning, insurance, and other adjustments alongside structural works. Flood science joins rainfall, soils, drainage networks, channels, reservoirs, and development. White supplied a way to turn one of those moving parts into a quantity that engineers can test and revise.\n\nThe working procedure is to map exposure and compare structural protection with zoning, warning, relocation, and public information. Every estimate should identify the observation period, basin conditions, boundary assumptions, and uncertainty introduced by missing gauges or changing land use.\n\nA flood hydrograph is a history, not just a peak. Water arrives, is stored, is routed, and interacts with sediment and infrastructure. Operations based on stale ratings or silent stations can look orderly until the response time collapses.\n\nThe hydrologic rule: flood disasters arise from the meeting of water and vulnerable development. Reliable flood decisions depend on records that remain live, local, and connected to the watershed they describe. A return period expresses annual chance and never promises that events will be evenly spaced. Maps and models should be revised after channel change, new development, and every informative event. Operational thresholds should be written before a crisis so a late decision cannot be disguised as fresh analysis. Uncertainty bands belong on discharge forecasts when missing stations or unstable rating curves widen the possible peak.",
      "frame": "The Clerk marks a missing gauge interval. \"Tell me what floodplain management and flood risk can establish—and what this gap destroys.\"",
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
    "leopold": {
      "sci": "Luna Leopold (1915-2006)",
      "topic": "River channels & fluvial geomorphology",
      "lede": "Luna Leopold showed how river channels and fluvial geomorphology converts scattered water records into an operational forecast.",
      "no": 12,
      "profile": "This morning’s hydrology note uses Luna Leopold to examine river channels and fluvial geomorphology. Luna Leopold studied how river channels adjust their width, depth, velocity, and sediment transport to water discharge. His work in fluvial geomorphology treated rivers as dynamic systems rather than fixed conduits. Flood science joins rainfall, soils, drainage networks, channels, reservoirs, and development. Leopold supplied a way to turn one of those moving parts into a quantity that engineers can test and revise.\n\nThe working procedure is to measure channel form and discharge across time before assuming a river will remain in one geometry. Every estimate should identify the observation period, basin conditions, boundary assumptions, and uncertainty introduced by missing gauges or changing land use.\n\nA flood hydrograph is a history, not just a peak. Water arrives, is stored, is routed, and interacts with sediment and infrastructure. Operations based on stale ratings or silent stations can look orderly until the response time collapses.\n\nThe hydrologic rule: a floodplain is part of the river system even when it is dry. Reliable flood decisions depend on records that remain live, local, and connected to the watershed they describe. A return period expresses annual chance and never promises that events will be evenly spaced. Maps and models should be revised after channel change, new development, and every informative event. Operational thresholds should be written before a crisis so a late decision cannot be disguised as fresh analysis. Uncertainty bands belong on discharge forecasts when missing stations or unstable rating curves widen the possible peak.",
      "frame": "The Clerk rests a hand on the flood map. \"Water follows terrain, not office boundaries. Begin with river channels and fluvial geomorphology.\"",
      "q": [
        {
          "q": "Which hydrologic statement best captures Luna Leopold’s work on river channels and fluvial geomorphology?",
          "o": [
            {
              "t": "Luna Leopold studied how river channels adjust their width, depth, velocity, and sediment transport to water discharge. Gauge calibration stays visible in the discharge estimate. Fits.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Luna Leopold's flood work relies on a regional formula and the surviving gauges. Regional practice can favor it. Flood records fit this flood account. Flood timing supports this flood claim.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "Luna Leopold's flood work is read within flood practice as support for the return-period label as a practical waiting interval between major floods. Flood practice makes the flood view plausible.",
              "v": "wrong",
              "fb": "The proposed inference does not follow from the hydraulic or statistical relationship."
            },
            {
              "t": "Luna Leopold's authority is invoked in flood practice to justify delaying a reservoir release until conflicting upstream readings have been reconciled. Gauge history supports that view.",
              "v": "danger",
              "fb": "That approach hides a preventable information failure behind the language of rarity."
            }
          ]
        },
        {
          "q": "Which method gives the strongest flood estimate or operational decision?",
          "o": [
            {
              "t": "Use this hydrologic procedure: measure channel form and discharge across time before assuming a river will remain in one geometry. Reservoir timing can be checked against rainfall. Flood fits.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Estimate the peak from current rainfall and a regional runoff coefficient, then update the result after the event. Flood records fit this flood account. Flood timing supports this flood claim.",
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
              "t": "The watershed lesson is that a floodplain is part of the river system even when it is dry. The hydrograph stays auditable. Basin change remains visible. Flood fits.",
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
      "no": 13,
      "profile": "This morning’s hydrology note uses Ray K. Linsley to examine hydrologic forecasting. Ray Linsley helped modernize hydrologic forecasting and watershed modeling, linking rainfall observations with runoff calculations and reservoir operations. His textbooks trained generations of engineers in quantitative hydrology. Flood science joins rainfall, soils, drainage networks, channels, reservoirs, and development. Linsley supplied a way to turn one of those moving parts into a quantity that engineers can test and revise.\n\nThe working procedure is to update a forecast with current rainfall, soil moisture, reservoir state, and upstream discharge. Every estimate should identify the observation period, basin conditions, boundary assumptions, and uncertainty introduced by missing gauges or changing land use.\n\nA flood hydrograph is a history, not just a peak. Water arrives, is stored, is routed, and interacts with sediment and infrastructure. Operations based on stale ratings or silent stations can look orderly until the response time collapses.\n\nThe hydrologic rule: forecast errors grow when models are not refreshed by working observations. Reliable flood decisions depend on records that remain live, local, and connected to the watershed they describe. A return period expresses annual chance and never promises that events will be evenly spaced. Maps and models should be revised after channel change, new development, and every informative event. Operational thresholds should be written before a crisis so a late decision cannot be disguised as fresh analysis. Uncertainty bands belong on discharge forecasts when missing stations or unstable rating curves widen the possible peak. Residents downstream need both expected water levels and the time available before roads or bridges are cut.",
      "frame": "Gauge Keeper Wynn unrolls a hydrograph at The Water District Office. \"The peak is one point; the river has a whole history. Walk me through hydrologic forecasting.\"",
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
    "nash": {
      "sci": "James E. Nash (1927-1998)",
      "topic": "The instantaneous unit hydrograph",
      "lede": "From rain to river, James E. Nash used the instantaneous unit hydrograph to make flood response testable.",
      "no": 14,
      "profile": "This morning’s hydrology note uses James E. Nash to examine the instantaneous unit hydrograph. James E. Nash developed the instantaneous unit hydrograph as a cascade of conceptual linear reservoirs. The model represented how a watershed stores and releases runoff and provided a compact description of hydrograph shape. Flood science joins rainfall, soils, drainage networks, channels, reservoirs, and development. Nash supplied a way to turn one of those moving parts into a quantity that engineers can test and revise.\n\nThe working procedure is to calibrate storage and routing parameters against observed hydrographs rather than choosing them by appearance. Every estimate should identify the observation period, basin conditions, boundary assumptions, and uncertainty introduced by missing gauges or changing land use.\n\nA flood hydrograph is a history, not just a peak. Water arrives, is stored, is routed, and interacts with sediment and infrastructure. Operations based on stale ratings or silent stations can look orderly until the response time collapses.\n\nThe hydrologic rule: conceptual models are valuable when their parameters are tied to evidence. Reliable flood decisions depend on records that remain live, local, and connected to the watershed they describe. A return period expresses annual chance and never promises that events will be evenly spaced. Maps and models should be revised after channel change, new development, and every informative event. Operational thresholds should be written before a crisis so a late decision cannot be disguised as fresh analysis. Uncertainty bands belong on discharge forecasts when missing stations or unstable rating curves widen the possible peak.",
      "frame": "Gauge Keeper Wynn marks a missing gauge interval. \"Tell me what the instantaneous unit hydrograph can establish—and what this gap destroys.\"",
      "q": [
        {
          "q": "Which hydrologic statement best captures James E. Nash’s work on the instantaneous unit hydrograph?",
          "o": [
            {
              "t": "James E. Routing assumptions remain attached to the hydrograph. Gauge calibration stays visible in the discharge estimate. Reservoir timing can be checked against rainfall. Flood fits.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "James E. Nash's flood work relies on a regional formula and the surviving gauges. Regional practice can favor it. Flood records fit this flood account. Gauge history supports that view.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "James E. Nash's flood work is read within flood practice as support for the return-period label as a practical waiting interval between major floods. Flood records fit this flood account.",
              "v": "wrong",
              "fb": "The proposed inference does not follow from the hydraulic or statistical relationship."
            },
            {
              "t": "James E. Nash's flood authority supports delaying a reservoir release until conflicting upstream readings have been reconciled. The surviving record looks compatible. Flood fits.",
              "v": "danger",
              "fb": "That approach hides a preventable information failure behind the language of rarity."
            }
          ]
        },
        {
          "q": "Which method gives the strongest flood estimate or operational decision?",
          "o": [
            {
              "t": "Use this hydrologic procedure: calibrate storage and routing parameters against observed hydrographs rather than choosing them by appearance. The hydrograph stays auditable. Flood fits.",
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
              "t": "The watershed lesson is that conceptual models are valuable when their parameters are tied to evidence. Reservoir timing can be checked against rainfall. Flood fits.",
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
      "no": 15,
      "profile": "This morning’s hydrology note uses Arthur T. Ippen to examine hydraulics and flood routing. Arthur Ippen made major contributions to hydraulic engineering, including unsteady flow, waves, estuaries, and flood routing. At MIT he helped integrate laboratory hydraulics with mathematical analysis of rapidly changing water levels. Flood science joins rainfall, soils, drainage networks, channels, reservoirs, and development. Ippen supplied a way to turn one of those moving parts into a quantity that engineers can test and revise.\n\nThe working procedure is to route a flood wave with continuity and momentum while accounting for channel storage. Every estimate should identify the observation period, basin conditions, boundary assumptions, and uncertainty introduced by missing gauges or changing land use.\n\nA flood hydrograph is a history, not just a peak. Water arrives, is stored, is routed, and interacts with sediment and infrastructure. Operations based on stale ratings or silent stations can look orderly until the response time collapses.\n\nThe hydrologic rule: a downstream peak can be delayed, attenuated, or amplified by channel and reservoir operations. Reliable flood decisions depend on records that remain live, local, and connected to the watershed they describe. A return period expresses annual chance and never promises that events will be evenly spaced. Maps and models should be revised after channel change, new development, and every informative event. Operational thresholds should be written before a crisis so a late decision cannot be disguised as fresh analysis. Uncertainty bands belong on discharge forecasts when missing stations or unstable rating curves widen the possible peak.\n\nIppen's flood-routing work shows how a structural dam breach would announce itself. The opening geometry and reservoir head generate a steep release hydrograph, accompanied by rapid uncontrolled drawdown and physical damage at the dam. Routing then changes the wave downstream but cannot erase its source signature. If the structure remains intact and gate records account for the reservoir loss, “breach” is a compelling image unsupported by the hydraulic boundary conditions.",
      "frame": "The Gate Operator rests a hand on the flood map. \"Water follows terrain, not office boundaries. Begin with hydraulics and flood routing.\"",
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
    "maddock": {
      "sci": "Thomas Maddock Jr. (hydrologist)",
      "topic": "The hydraulic geometry of rivers",
      "lede": "Thomas Maddock Jr. gave the hydraulic geometry of rivers a quantitative place in the changing life of a watershed.",
      "no": 16,
      "profile": "This morning’s hydrology note uses Thomas Maddock Jr. to examine the hydraulic geometry of rivers. Thomas Maddock Jr., working with Luna Leopold, developed the concept of hydraulic geometry: systematic relations between discharge and channel width, depth, velocity, and sediment load. These empirical patterns connected river form to flow regime. Flood science joins rainfall, soils, drainage networks, channels, reservoirs, and development. Jr supplied a way to turn one of those moving parts into a quantity that engineers can test and revise.\n\nThe working procedure is to compare cross-section and downstream hydraulic-geometry relations using consistent discharge data. Every estimate should identify the observation period, basin conditions, boundary assumptions, and uncertainty introduced by missing gauges or changing land use.\n\nA flood hydrograph is a history, not just a peak. Water arrives, is stored, is routed, and interacts with sediment and infrastructure. Operations based on stale ratings or silent stations can look orderly until the response time collapses.\n\nThe hydrologic rule: river dimensions reflect repeated flows, not merely the largest event remembered. Reliable flood decisions depend on records that remain live, local, and connected to the watershed they describe. A return period expresses annual chance and never promises that events will be evenly spaced. Maps and models should be revised after channel change, new development, and every informative event. Operational thresholds should be written before a crisis so a late decision cannot be disguised as fresh analysis. Uncertainty bands belong on discharge forecasts when missing stations or unstable rating curves widen the possible peak.",
      "frame": "The Gate Operator unrolls a hydrograph at The Water District Office. \"The peak is one point; the river has a whole history. Walk me through the hydraulic geometry of rivers.\"",
      "q": [
        {
          "q": "Which hydrologic statement best captures Thomas Maddock Jr.’s work on the hydraulic geometry of rivers?",
          "o": [
            {
              "t": "Thomas Maddock Jr., working with Luna Leopold, developed the concept of hydraulic geometry: systematic relations between discharge and channel width, depth, velocity, and sediment load.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Thomas Maddock Jr.'s flood work relies on a regional formula and the surviving gauges. Regional practice can favor it. Flood records fit this flood account. Flood timing supports this flood claim.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "Thomas Maddock Jr.'s flood work supports the return-period label as a practical waiting interval between major floods. Regional practice can favor it. Flood records fit this flood account.",
              "v": "wrong",
              "fb": "The proposed inference does not follow from the hydraulic or statistical relationship."
            },
            {
              "t": "Thomas Maddock Jr.'s authority is invoked in flood practice to justify delaying a reservoir release until conflicting upstream readings have been reconciled. Gauge history supports that view.",
              "v": "danger",
              "fb": "That approach hides a preventable information failure behind the language of rarity."
            }
          ]
        },
        {
          "q": "Which method gives the strongest flood estimate or operational decision?",
          "o": [
            {
              "t": "Use this hydrologic procedure: compare cross-section and downstream hydraulic-geometry relations using consistent discharge data. Reservoir timing can be checked against rainfall. Flood fits.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Estimate the peak from current rainfall and a regional runoff coefficient, then update the result after the event. Regional practice can favor it. Flood records fit this flood account.",
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
              "t": "The watershed lesson is that river dimensions reflect repeated flows, not merely the largest event remembered. Reservoir timing can be checked against rainfall.",
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
    "haeinstein": {
      "sci": "Hans Albert Einstein (1904-1973)",
      "topic": "Sediment transport in rivers",
      "lede": "From rain to river, Hans Albert Einstein used sediment transport in rivers to make flood response testable.",
      "no": 17,
      "profile": "This morning’s hydrology note uses Hans Albert Einstein to examine sediment transport in rivers. Hans Albert Einstein developed probabilistic and mechanical approaches to sediment transport, treating grains as particles intermittently entrained and deposited by turbulent flow. His work improved estimates of bed-material movement in rivers. Flood science joins rainfall, soils, drainage networks, channels, reservoirs, and development. Einstein supplied a way to turn one of those moving parts into a quantity that engineers can test and revise.\n\nThe working procedure is to separate water discharge from sediment availability and calculate transport under the observed grain and bed conditions. Every estimate should identify the observation period, basin conditions, boundary assumptions, and uncertainty introduced by missing gauges or changing land use.\n\nA flood hydrograph is a history, not just a peak. Water arrives, is stored, is routed, and interacts with sediment and infrastructure. Operations based on stale ratings or silent stations can look orderly until the response time collapses.\n\nThe hydrologic rule: a flood's damage and channel change depend on sediment as well as water. Reliable flood decisions depend on records that remain live, local, and connected to the watershed they describe. A return period expresses annual chance and never promises that events will be evenly spaced. Maps and models should be revised after channel change, new development, and every informative event. Operational thresholds should be written before a crisis so a late decision cannot be disguised as fresh analysis. Uncertainty bands belong on discharge forecasts when missing stations or unstable rating curves widen the possible peak.\n\nEinstein's sediment-transport research supplies the debris-outburst discriminator. Failure of a landslide or debris dam releases water mixed with exceptional sediment, often carrying boulders, woody material, and a dense surge that scours and rebuilds the channel. Deposits record grain size and transport capacity. A water-dominated flood with ordinary suspended sediment and no upstream blockage scar does not match a debris-dam outburst, even if witnesses describe a wall of mud.",
      "frame": "The Clerk marks a missing gauge interval. \"Tell me what sediment transport in rivers can establish—and what this gap destroys.\"",
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
    },
    "vanoni": {
      "sci": "Vito Vanoni (1904-1999)",
      "topic": "River sedimentation",
      "lede": "Vito Vanoni showed how river sedimentation converts scattered water records into an operational forecast.",
      "no": 18,
      "profile": "This morning’s hydrology note uses Vito Vanoni to examine river sedimentation. Vito Vanoni advanced the study of sediment-laden flow, river mechanics, and reservoir sedimentation. His research and teaching connected turbulence, suspended sediment, bed load, and the long-term loss of reservoir capacity. Flood science joins rainfall, soils, drainage networks, channels, reservoirs, and development. Vanoni supplied a way to turn one of those moving parts into a quantity that engineers can test and revise.\n\nThe working procedure is to measure sediment concentration and grain size across the flow before estimating total load. Every estimate should identify the observation period, basin conditions, boundary assumptions, and uncertainty introduced by missing gauges or changing land use.\n\nA flood hydrograph is a history, not just a peak. Water arrives, is stored, is routed, and interacts with sediment and infrastructure. Operations based on stale ratings or silent stations can look orderly until the response time collapses.\n\nThe hydrologic rule: reservoir and channel performance can deteriorate gradually even when gates and dams remain intact. Reliable flood decisions depend on records that remain live, local, and connected to the watershed they describe. A return period expresses annual chance and never promises that events will be evenly spaced. Maps and models should be revised after channel change, new development, and every informative event. Operational thresholds should be written before a crisis so a late decision cannot be disguised as fresh analysis. Uncertainty bands belong on discharge forecasts when missing stations or unstable rating curves widen the possible peak. Residents downstream need both expected water levels and the time available before roads or bridges are cut.",
      "frame": "The Clerk rests a hand on the flood map. \"Water follows terrain, not office boundaries. Begin with river sedimentation.\"",
      "q": [
        {
          "q": "Which hydrologic statement best captures Vito Vanoni’s work on river sedimentation?",
          "o": [
            {
              "t": "Vito Vanoni advanced the study of sediment-laden flow, river mechanics, and reservoir sedimentation. Gauge calibration stays visible in the discharge estimate.",
              "v": "expert",
              "fb": "Correct: the response connects watershed process, calibrated records, and explicit uncertainty."
            },
            {
              "t": "Vito Vanoni's flood work emphasizes a regional formula and the surviving gauges. The surviving record looks compatible. Flood practice makes the flood view plausible.",
              "v": "partial",
              "fb": "This contributes evidence but leaves timing, local calibration, or changing basin conditions incomplete."
            },
            {
              "t": "Vito Vanoni's flood work supports the return-period label as a practical waiting interval between major floods. The surviving record looks compatible. Flood fits.",
              "v": "wrong",
              "fb": "The proposed inference does not follow from the hydraulic or statistical relationship."
            },
            {
              "t": "Vito Vanoni's flood authority supports delaying a reservoir release until conflicting upstream readings have been reconciled. Flood records fit this flood account.",
              "v": "danger",
              "fb": "That approach hides a preventable information failure behind the language of rarity."
            }
          ]
        },
        {
          "q": "Which method gives the strongest flood estimate or operational decision?",
          "o": [
            {
              "t": "Use this hydrologic procedure: measure sediment concentration and grain size across the flow before estimating total load. Basin change remains visible.",
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
              "t": "The watershed lesson is that reservoir and channel performance can deteriorate gradually even when gates and dams remain intact. Basin change remains visible.",
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
    "<b>Mud lines stripe the canyon walls while surveyors recover clocks and gauge housings from the debris.</b>",
    "<b>Gauge Keeper Wynn</b> reads the watershed; <b>The Gate Operator</b> reconstructs releases; <b>The Clerk</b> guards the district papers.",
    "Clues will narrow Elias Thorn — reservoir operations manager, The county hydrologist, and The floodplain planner; only the hydrograph timing lessons can separate <b>A structural dam breach released the reservoir in one sudden wave</b> from <b>A debris-dam outburst sent a sediment-heavy surge down the canyon</b>.",
    "<b>Reservoir operations resume in eight days, after which altered levels will complicate reconstruction of the original hydrograph.</b>"
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
  }
}
};
