module.exports = { PACK: {
  "id": "e_storm",
  "title": "The Halloway Landfall",
  "discipline": "Meteorology & Storm Forecasting",
  "teaser": "Halloway's hurricane killed along the coast and inland. Did category wind dominate the losses, or did extreme rainfall become the principal hazard? The fatality timeline must decide.",
  "overclaimTag": "category-wind destruction",
  "truthTag": "storm-surge mortality before peak winds",
  "venue": "the Halloway storm inquiry",
  "agent": {
    "name": "Investigator Cole Renard",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Meteorology Pioneers",
  "dossierName": "METEOROLOGY PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Halloway storm inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before your inquiry ends. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The place you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "Wind category and rainfall totals are powerful summaries; neither should be allowed to stand in for the actual fatality timeline.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "official",
      "items": [
        {
          "id": "official",
          "label": "Delia Marsh — regional emergency-management chief"
        },
        {
          "id": "forecaster",
          "label": "The lead hurricane forecaster"
        },
        {
          "id": "mayor",
          "label": "The resort-town mayor"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "office",
      "items": [
        {
          "id": "coast",
          "label": "The Coast & Tide Gauges"
        },
        {
          "id": "forecastfloor",
          "label": "The Hurricane Forecast Floor"
        },
        {
          "id": "office",
          "label": "The Emergency-Management Office"
        }
      ]
    },
    "what": {
      "title": "Which hazard caused most of the fatalities?",
      "truth": "downgraded",
      "items": [
        {
          "id": "weapon",
          "label": "Peak category wind caused the dominant structural destruction."
        },
        {
          "id": "freak",
          "label": "Extreme rainfall overwhelmed rivers after the center moved inland."
        },
        {
          "id": "downgraded",
          "label": "Storm surge raised coastal water before peak winds arrived."
        }
      ]
    }
  },
  "PLACES": {
    "coast": {
      "name": "The Coast & Tide Gauges",
      "xy": [
        140,
        90
      ]
    },
    "forecastfloor": {
      "name": "The Hurricane Forecast Floor",
      "xy": [
        330,
        240
      ]
    },
    "office": {
      "name": "The Emergency-Management Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "coast",
      "forecastfloor"
    ],
    [
      "forecastfloor",
      "office"
    ]
  ],
  "CHARACTERS": {
    "spotter": {
      "name": "Storm Spotter Vane",
      "role": "Volunteer storm spotter",
      "face": "🌀",
      "badge": "V",
      "legend": "the coast",
      "hint": "Knows coastal observation sites and can identify who received field reports from each location."
    },
    "radar": {
      "name": "The Radar Analyst",
      "role": "Radar analyst",
      "face": "📡",
      "badge": "R",
      "legend": "the forecast floor",
      "hint": "Preserves forecast-floor products and can place analysts and offices within the warning chronology."
    },
    "clerk": {
      "name": "The Clerk",
      "role": "Emergency-office clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Holds emergency assignments, public notices, and the administrative chain behind regional decisions."
    }
  },
  "TOPICMAP": {
    "coast": {
      "spotter": [
        "beaufort"
      ],
      "radar": [
        "ferrel"
      ],
      "clerk": [
        "shaw"
      ]
    },
    "forecastfloor": {
      "spotter": [
        "bergeron"
      ],
      "radar": [
        "rossby"
      ],
      "clerk": [
        "wexler"
      ]
    },
    "office": {
      "spotter": [
        "saffir"
      ],
      "radar": [
        "lorenz"
      ],
      "clerk": [
        "jsimpson"
      ]
    }
  },
  "TOPICS": {
    "beaufort": {
      "sci": "Francis Beaufort (1774-1857)",
      "topic": "The wind-force scale",
      "lede": "Francis Beaufort brought the wind-force scale into the maps, equations, and instruments of modern forecasting.",
      "no": 1,
      "profile": "Today’s forecast-room memorandum profiles Francis Beaufort through the wind-force scale. Francis Beaufort developed a practical scale that related observed effects at sea to wind force. Later standardized in terms of wind speed, the Beaufort scale let observers communicate conditions consistently before modern anemometers were widespread. Meteorology converts scattered observations into a changing three-dimensional atmosphere. Beaufort’s contribution explains one step between the instrument reading and the warning heard by the public.\n\nThe forecasting discipline is to translate qualitative observations into a shared operational scale while keeping the measurement limits visible. Surface reports, upper-air structure, radar, satellite data, model ensembles, and local exposure should be compared without allowing a preferred message to erase conflicting evidence.\n\nStorm uncertainty grows from incomplete initial conditions and nonlinear dynamics, yet uncertainty is not ignorance. Probabilities, scenarios, and thresholds can preserve action while the exact track and intensity remain unsettled. The warning process fails when scientific nuance is converted into unwarranted reassurance.\n\nThe operational conclusion: standard terms make warnings useful only when observers apply them consistently. A forecast earns trust when revisions follow evidence and communication preserves the hazard rather than the convenience of the moment. Wind category, rainfall, surge, storm size, and forward speed describe different pathways to damage. An ensemble spread should widen the decision discussion, not disappear from the public summary. Observation times and forecast issue times should be preserved because a correct warning delivered late is still an operational failure. Local officials need impact language tied to roads, buildings, and evacuation zones rather than abstract wind alone.",
      "frame": "Freezes the radar loop at The Coast & Tide Gauges. \"The eye moved after this frame. Explain the wind-force scale before you read the warning log.\"",
      "q": [
        {
          "q": "Which meteorological explanation best captures Francis Beaufort’s work on the wind-force scale?",
          "o": [
            {
              "t": "Francis Beaufort developed a practical scale that related observed effects at sea to wind force. The warning logic remains visible. Surge and wind risks stay separately documented.",
              "v": "expert",
              "fb": "Correct: it combines observations, dynamics, uncertainty, and public communication without softening the hazard."
            },
            {
              "t": "Francis Beaufort's storm work emphasizes one deterministic track and the headline category. The category offers a clear signal. The leading track looks authoritative. The storm record fits.",
              "v": "partial",
              "fb": "This is relevant but omits a major data source or impact pathway needed for the warning."
            },
            {
              "t": "Francis Beaufort's storm work supports the hurricane category as the primary basis for surge, rainfall, and evacuation decisions. The leading track looks authoritative. The storm record fits.",
              "v": "wrong",
              "fb": "That claim misstates the atmospheric mechanism or what the measurement can establish."
            },
            {
              "t": "Francis Beaufort's authority is invoked in storm practice to justify publishing the least disruptive credible track until the forecast models converge. The category offers a clear signal.",
              "v": "danger",
              "fb": "That response lets political or operational convenience replace the forecast evidence."
            }
          ]
        },
        {
          "q": "Which forecast practice best follows the pioneer’s work?",
          "o": [
            {
              "t": "Follow this forecasting practice: translate qualitative observations into a shared operational scale while keeping the measurement limits visible.",
              "v": "expert",
              "fb": "Correct: it combines observations, dynamics, uncertainty, and public communication without softening the hazard."
            },
            {
              "t": "Blend radar with the leading deterministic model, then treat ensemble spread and exposure as later refinements. Storm timing supports this storm claim.",
              "v": "partial",
              "fb": "This is relevant but omits a major data source or impact pathway needed for the warning."
            },
            {
              "t": "Infer that a weakening wind category substantially reduces evacuation urgency even as storm size and rainfall increase. Storm records fit this storm account.",
              "v": "wrong",
              "fb": "That claim misstates the atmospheric mechanism or what the measurement can establish."
            },
            {
              "t": "Rewrite the bulletin around the least disruptive track and wait for landfall to resolve the remaining disagreement. Storm records fit this storm account.",
              "v": "danger",
              "fb": "That response lets political or operational convenience replace the forecast evidence."
            }
          ]
        },
        {
          "q": "What is the sound forecasting conclusion?",
          "o": [
            {
              "t": "The forecast lesson is that standard terms make warnings useful only when observers apply them consistently. The warning logic remains visible. Storm fits.",
              "v": "expert",
              "fb": "Correct: it combines observations, dynamics, uncertainty, and public communication without softening the hazard."
            },
            {
              "t": "Base public action on the most likely track even when a lower-probability scenario carries much greater loss. Storm timing supports this storm claim.",
              "v": "partial",
              "fb": "This is relevant but omits a major data source or impact pathway needed for the warning."
            },
            {
              "t": "Treat model divergence as making the forecast too unstable to support strong protective action. The leading track looks authoritative. The storm record fits.",
              "v": "wrong",
              "fb": "That claim misstates the atmospheric mechanism or what the measurement can establish."
            },
            {
              "t": "Attribute the storm to deliberate modification or exceptional unpredictability before examining how the warning changed. Storm records fit this storm account.",
              "v": "danger",
              "fb": "That response lets political or operational convenience replace the forecast evidence."
            }
          ]
        }
      ]
    },
    "ferrel": {
      "sci": "William Ferrel (1817-1891)",
      "topic": "The circulation of the atmosphere",
      "lede": "William Ferrel used the circulation of the atmosphere to narrow uncertainty without pretending weather was certain.",
      "no": 2,
      "profile": "Today’s forecast-room memorandum profiles William Ferrel through the circulation of the atmosphere. William Ferrel developed theories of atmospheric circulation that incorporated Earth's rotation and explained midlatitude westerlies and the secondary circulation now called the Ferrel cell. His work helped move meteorology toward dynamics. Meteorology converts scattered observations into a changing three-dimensional atmosphere. Ferrel’s contribution explains one step between the instrument reading and the warning heard by the public.\n\nThe forecasting discipline is to balance pressure gradients, rotation, and friction at the appropriate spatial scale. Surface reports, upper-air structure, radar, satellite data, model ensembles, and local exposure should be compared without allowing a preferred message to erase conflicting evidence.\n\nStorm uncertainty grows from incomplete initial conditions and nonlinear dynamics, yet uncertainty is not ignorance. Probabilities, scenarios, and thresholds can preserve action while the exact track and intensity remain unsettled. The warning process fails when scientific nuance is converted into unwarranted reassurance.\n\nThe operational conclusion: storm motion emerges from large-scale flow as well as local weather. A forecast earns trust when revisions follow evidence and communication preserves the hazard rather than the convenience of the moment. Wind category, rainfall, surge, storm size, and forward speed describe different pathways to damage. An ensemble spread should widen the decision discussion, not disappear from the public summary. Observation times and forecast issue times should be preserved because a correct warning delivered late is still an operational failure. Local officials need impact language tied to roads, buildings, and evacuation zones rather than abstract wind alone. Post-storm verification should compare every major forecast change with the evidence available at that moment.",
      "frame": "Points from the tide gauge to the wind field. \"One category cannot carry all this. Start with the circulation of the atmosphere.\"",
      "q": [
        {
          "q": "Which meteorological explanation best captures William Ferrel’s work on the circulation of the atmosphere?",
          "o": [
            {
              "t": "William Ferrel developed theories of atmospheric circulation that incorporated Earth's rotation and explained midlatitude westerlies and the secondary circulation now called the Ferrel cell. The warning logic remains visible. Storm fits. Fits.",
              "v": "expert",
              "fb": "Correct: it combines observations, dynamics, uncertainty, and public communication without softening the hazard."
            },
            {
              "t": "William Ferrel's storm work emphasizes one deterministic track and the headline category. Storm records fit this storm account. Storm context supports the view. Storm practice makes the storm view plausible. Storm timing supports this storm claim.",
              "v": "partial",
              "fb": "This is relevant but omits a major data source or impact pathway needed for the warning."
            },
            {
              "t": "William Ferrel's storm work is read within storm practice as support for the hurricane category as the primary basis for surge, rainfall, and evacuation decisions. Storm practice makes the storm view plausible. Storm timing supports this storm claim.",
              "v": "wrong",
              "fb": "That claim misstates the atmospheric mechanism or what the measurement can establish."
            },
            {
              "t": "William Ferrel's authority is invoked in storm practice to justify publishing the least disruptive credible track until the forecast models converge. The leading track looks authoritative. Storm timing supports this storm claim. Storm fits.",
              "v": "danger",
              "fb": "That response lets political or operational convenience replace the forecast evidence."
            }
          ]
        },
        {
          "q": "Which forecast practice best follows the pioneer’s work?",
          "o": [
            {
              "t": "Follow this forecasting practice: balance pressure gradients, rotation, and friction at the appropriate spatial scale. Impact pathways stay separate.",
              "v": "expert",
              "fb": "Correct: it combines observations, dynamics, uncertainty, and public communication without softening the hazard."
            },
            {
              "t": "Blend radar with the leading deterministic model, then treat ensemble spread and exposure as later refinements. The category offers a clear signal.",
              "v": "partial",
              "fb": "This is relevant but omits a major data source or impact pathway needed for the warning."
            },
            {
              "t": "Infer that a weakening wind category substantially reduces evacuation urgency even as storm size and rainfall increase. Storm timing supports this storm claim.",
              "v": "wrong",
              "fb": "That claim misstates the atmospheric mechanism or what the measurement can establish."
            },
            {
              "t": "Rewrite the bulletin around the least disruptive track and wait for landfall to resolve the remaining disagreement. Storm timing supports this storm claim.",
              "v": "danger",
              "fb": "That response lets political or operational convenience replace the forecast evidence."
            }
          ]
        },
        {
          "q": "What is the sound forecasting conclusion?",
          "o": [
            {
              "t": "The forecast lesson is that storm motion emerges from large-scale flow as well as local weather. Surge and wind risks stay separately documented. Storm fits.",
              "v": "expert",
              "fb": "Correct: it combines observations, dynamics, uncertainty, and public communication without softening the hazard."
            },
            {
              "t": "Base public action on the most likely track even when a lower-probability scenario carries much greater loss. Storm timing supports this storm claim.",
              "v": "partial",
              "fb": "This is relevant but omits a major data source or impact pathway needed for the warning."
            },
            {
              "t": "Treat model divergence as making the forecast too unstable to support strong protective action. The leading track looks authoritative. The storm record fits.",
              "v": "wrong",
              "fb": "That claim misstates the atmospheric mechanism or what the measurement can establish."
            },
            {
              "t": "Attribute the storm to deliberate modification or exceptional unpredictability before examining how the warning changed. Storm records fit this storm account.",
              "v": "danger",
              "fb": "That response lets political or operational convenience replace the forecast evidence."
            }
          ]
        }
      ]
    },
    "shaw": {
      "sci": "Napier Shaw (1854-1945)",
      "topic": "Dynamic meteorology & the upper air",
      "lede": "A changing atmosphere became more legible through Napier Shaw’s work on dynamic meteorology and the upper air.",
      "no": 3,
      "profile": "Today’s forecast-room memorandum profiles Napier Shaw through dynamic meteorology and the upper air. Napier Shaw advanced dynamic meteorology, upper-air observation, and professional weather services in Britain. He promoted the tephigram, a thermodynamic chart that helps forecasters interpret temperature, moisture, and atmospheric stability. Meteorology converts scattered observations into a changing three-dimensional atmosphere. Shaw’s contribution explains one step between the instrument reading and the warning heard by the public.\n\nThe forecasting discipline is to analyze a vertical sounding for stability, moisture, and the energy available to rising air. Surface reports, upper-air structure, radar, satellite data, model ensembles, and local exposure should be compared without allowing a preferred message to erase conflicting evidence.\n\nStorm uncertainty grows from incomplete initial conditions and nonlinear dynamics, yet uncertainty is not ignorance. Probabilities, scenarios, and thresholds can preserve action while the exact track and intensity remain unsettled. The warning process fails when scientific nuance is converted into unwarranted reassurance.\n\nThe operational conclusion: surface conditions alone cannot reveal the full structure of a storm. A forecast earns trust when revisions follow evidence and communication preserves the hazard rather than the convenience of the moment. Wind category, rainfall, surge, storm size, and forward speed describe different pathways to damage. An ensemble spread should widen the decision discussion, not disappear from the public summary. Observation times and forecast issue times should be preserved because a correct warning delivered late is still an operational failure. Local officials need impact language tied to roads, buildings, and evacuation zones rather than abstract wind alone.",
      "frame": "Holds two forecast tracks together. \"Uncertainty is not permission to choose the convenient line. Show me dynamic meteorology and the upper air.\"",
      "q": [
        {
          "q": "Which meteorological explanation best captures Napier Shaw’s work on dynamic meteorology and the upper air?",
          "o": [
            {
              "t": "Napier Shaw advanced dynamic meteorology, upper-air observation, and professional weather services in Britain. Surge and wind risks stay separately documented.",
              "v": "expert",
              "fb": "Correct: it combines observations, dynamics, uncertainty, and public communication without softening the hazard."
            },
            {
              "t": "Napier Shaw's storm work emphasizes one deterministic track and the headline category. The category offers a clear signal. Storm timing supports this storm claim.",
              "v": "partial",
              "fb": "This is relevant but omits a major data source or impact pathway needed for the warning."
            },
            {
              "t": "Napier Shaw's storm work supports the hurricane category as the primary basis for surge, rainfall, and evacuation decisions. Storm records fit this storm account.",
              "v": "wrong",
              "fb": "That claim misstates the atmospheric mechanism or what the measurement can establish."
            },
            {
              "t": "Napier Shaw's storm authority supports publishing the least disruptive credible track until the forecast models converge. Storm timing supports this storm claim.",
              "v": "danger",
              "fb": "That response lets political or operational convenience replace the forecast evidence."
            }
          ]
        },
        {
          "q": "Which forecast practice best follows the pioneer’s work?",
          "o": [
            {
              "t": "Follow this forecasting practice: analyze a vertical sounding for stability, moisture, and the energy available to rising air. Impact pathways stay separate.",
              "v": "expert",
              "fb": "Correct: it combines observations, dynamics, uncertainty, and public communication without softening the hazard."
            },
            {
              "t": "Blend radar with the leading deterministic model, then treat ensemble spread and exposure as later refinements. The leading track looks authoritative.",
              "v": "partial",
              "fb": "This is relevant but omits a major data source or impact pathway needed for the warning."
            },
            {
              "t": "Infer that a weakening wind category substantially reduces evacuation urgency even as storm size and rainfall increase. The leading track looks authoritative.",
              "v": "wrong",
              "fb": "That claim misstates the atmospheric mechanism or what the measurement can establish."
            },
            {
              "t": "Rewrite the bulletin around the least disruptive track and wait for landfall to resolve the remaining disagreement. The leading track looks authoritative.",
              "v": "danger",
              "fb": "That response lets political or operational convenience replace the forecast evidence."
            }
          ]
        },
        {
          "q": "What is the sound forecasting conclusion?",
          "o": [
            {
              "t": "The forecast lesson is that surface conditions alone cannot reveal the full structure of a storm. Surge and wind risks stay separately documented.",
              "v": "expert",
              "fb": "Correct: it combines observations, dynamics, uncertainty, and public communication without softening the hazard."
            },
            {
              "t": "Base public action on the most likely track even when a lower-probability scenario carries much greater loss. Storm practice makes the storm view plausible.",
              "v": "partial",
              "fb": "This is relevant but omits a major data source or impact pathway needed for the warning."
            },
            {
              "t": "Treat model divergence as making the forecast too unstable to support strong protective action. The leading track looks authoritative. The storm record fits.",
              "v": "wrong",
              "fb": "That claim misstates the atmospheric mechanism or what the measurement can establish."
            },
            {
              "t": "Attribute the storm to deliberate modification or exceptional unpredictability before examining how the warning changed. Storm records fit this storm account.",
              "v": "danger",
              "fb": "That response lets political or operational convenience replace the forecast evidence."
            }
          ]
        }
      ]
    },
    "bergeron": {
      "sci": "Tor Bergeron (1891-1977)",
      "topic": "The Bergen school & precipitation",
      "lede": "Tor Bergeron brought the bergen school and precipitation into the maps, equations, and instruments of modern forecasting.",
      "no": 4,
      "profile": "Today’s forecast-room memorandum profiles Tor Bergeron through the bergen school and precipitation. Tor Bergeron helped develop the air-mass and frontal ideas of the Bergen school and explained important precipitation processes in mixed-phase clouds. The Bergeron process describes ice crystals growing at the expense of supercooled droplets. Meteorology converts scattered observations into a changing three-dimensional atmosphere. Bergeron’s contribution explains one step between the instrument reading and the warning heard by the public.\n\nThe forecasting discipline is to identify air masses, fronts, and cloud microphysics before interpreting precipitation intensity. Surface reports, upper-air structure, radar, satellite data, model ensembles, and local exposure should be compared without allowing a preferred message to erase conflicting evidence.\n\nStorm uncertainty grows from incomplete initial conditions and nonlinear dynamics, yet uncertainty is not ignorance. Probabilities, scenarios, and thresholds can preserve action while the exact track and intensity remain unsettled. The warning process fails when scientific nuance is converted into unwarranted reassurance.\n\nThe operational conclusion: storm structure is three-dimensional and changes as air masses interact. A forecast earns trust when revisions follow evidence and communication preserves the hazard rather than the convenience of the moment. Wind category, rainfall, surge, storm size, and forward speed describe different pathways to damage. An ensemble spread should widen the decision discussion, not disappear from the public summary. Observation times and forecast issue times should be preserved because a correct warning delivered late is still an operational failure. Local officials need impact language tied to roads, buildings, and evacuation zones rather than abstract wind alone.",
      "frame": "Freezes the radar loop at The Hurricane Forecast Floor. \"The eye moved after this frame. Explain the bergen school and precipitation before you read the warning log.\"",
      "q": [
        {
          "q": "Which meteorological explanation best captures Tor Bergeron’s work on the bergen school and precipitation?",
          "o": [
            {
              "t": "Tor Bergeron helped develop the air-mass and frontal ideas of the Bergen school and explained important precipitation processes in mixed-phase clouds. Surge and wind risks stay separately documented.",
              "v": "expert",
              "fb": "Correct: it combines observations, dynamics, uncertainty, and public communication without softening the hazard."
            },
            {
              "t": "Tor Bergeron's storm work emphasizes one deterministic track and the headline category. The category offers a clear signal. The leading track looks authoritative. Storm timing supports this storm claim.",
              "v": "partial",
              "fb": "This is relevant but omits a major data source or impact pathway needed for the warning."
            },
            {
              "t": "Tor Bergeron's storm work supports the hurricane category as the primary basis for surge, rainfall, and evacuation decisions. Officials may prefer that clarity. Storm practice makes the storm view plausible.",
              "v": "wrong",
              "fb": "That claim misstates the atmospheric mechanism or what the measurement can establish."
            },
            {
              "t": "Tor Bergeron's storm authority supports publishing the least disruptive credible track until the forecast models converge. The leading track looks authoritative. Storm timing supports this storm claim.",
              "v": "danger",
              "fb": "That response lets political or operational convenience replace the forecast evidence."
            }
          ]
        },
        {
          "q": "Which forecast practice best follows the pioneer’s work?",
          "o": [
            {
              "t": "Follow this forecasting practice: identify air masses, fronts, and cloud microphysics before interpreting precipitation intensity. Impact pathways stay separate.",
              "v": "expert",
              "fb": "Correct: it combines observations, dynamics, uncertainty, and public communication without softening the hazard."
            },
            {
              "t": "Blend radar with the leading deterministic model, then treat ensemble spread and exposure as later refinements. The leading track looks authoritative.",
              "v": "partial",
              "fb": "This is relevant but omits a major data source or impact pathway needed for the warning."
            },
            {
              "t": "Infer that a weakening wind category substantially reduces evacuation urgency even as storm size and rainfall increase. The leading track looks authoritative.",
              "v": "wrong",
              "fb": "That claim misstates the atmospheric mechanism or what the measurement can establish."
            },
            {
              "t": "Rewrite the bulletin around the least disruptive track and wait for landfall to resolve the remaining disagreement. The leading track looks authoritative.",
              "v": "danger",
              "fb": "That response lets political or operational convenience replace the forecast evidence."
            }
          ]
        },
        {
          "q": "What is the sound forecasting conclusion?",
          "o": [
            {
              "t": "The forecast lesson is that storm structure is three-dimensional and changes as air masses interact. Surge and wind risks stay separately documented. Storm fits.",
              "v": "expert",
              "fb": "Correct: it combines observations, dynamics, uncertainty, and public communication without softening the hazard."
            },
            {
              "t": "Base public action on the most likely track even when a lower-probability scenario carries much greater loss. The leading track looks authoritative. Storm fits. Storm fits.",
              "v": "partial",
              "fb": "This is relevant but omits a major data source or impact pathway needed for the warning."
            },
            {
              "t": "Treat model divergence as making the forecast too unstable to support strong protective action. Storm records fit this storm account. Storm timing supports this storm claim.",
              "v": "wrong",
              "fb": "That claim misstates the atmospheric mechanism or what the measurement can establish."
            },
            {
              "t": "Attribute the storm to deliberate modification or exceptional unpredictability before examining how the warning changed. Storm timing supports this storm claim. Storm fits.",
              "v": "danger",
              "fb": "That response lets political or operational convenience replace the forecast evidence."
            }
          ]
        }
      ]
    },
    "rossby": {
      "sci": "Carl-Gustaf Rossby (1898-1957)",
      "topic": "Rossby waves & the jet stream",
      "lede": "Carl-Gustaf Rossby used rossby waves and the jet stream to narrow uncertainty without pretending weather was certain.",
      "no": 5,
      "profile": "Today’s forecast-room memorandum profiles Carl-Gustaf Rossby through rossby waves and the jet stream. Carl-Gustaf Rossby identified large planetary waves in the atmosphere produced by the variation of the Coriolis effect with latitude. Rossby waves help steer weather systems and explain persistent large-scale patterns. Meteorology converts scattered observations into a changing three-dimensional atmosphere. Rossby’s contribution explains one step between the instrument reading and the warning heard by the public.\n\nThe forecasting discipline is to diagnose the planetary-scale flow that guides smaller storms. Surface reports, upper-air structure, radar, satellite data, model ensembles, and local exposure should be compared without allowing a preferred message to erase conflicting evidence.\n\nStorm uncertainty grows from incomplete initial conditions and nonlinear dynamics, yet uncertainty is not ignorance. Probabilities, scenarios, and thresholds can preserve action while the exact track and intensity remain unsettled. The warning process fails when scientific nuance is converted into unwarranted reassurance.\n\nThe operational conclusion: a local landfall forecast depends on distant changes in the jet stream. A forecast earns trust when revisions follow evidence and communication preserves the hazard rather than the convenience of the moment. Wind category, rainfall, surge, storm size, and forward speed describe different pathways to damage. An ensemble spread should widen the decision discussion, not disappear from the public summary. Observation times and forecast issue times should be preserved because a correct warning delivered late is still an operational failure. Local officials need impact language tied to roads, buildings, and evacuation zones rather than abstract wind alone. Post-storm verification should compare every major forecast change with the evidence available at that moment.",
      "frame": "Points from the tide gauge to the wind field. \"One category cannot carry all this. Start with rossby waves and the jet stream.\"",
      "q": [
        {
          "q": "Which meteorological explanation best captures Carl-Gustaf Rossby’s work on rossby waves and the jet stream?",
          "o": [
            {
              "t": "Carl-Gustaf Rossby identified large planetary waves in the atmosphere produced by the variation of the Coriolis effect with latitude. Impact pathways stay separate.",
              "v": "expert",
              "fb": "Correct: it combines observations, dynamics, uncertainty, and public communication without softening the hazard."
            },
            {
              "t": "Carl-Gustaf Rossby's storm work emphasizes one deterministic track and the headline category. The category offers a clear signal. Storm records fit this storm account.",
              "v": "partial",
              "fb": "This is relevant but omits a major data source or impact pathway needed for the warning."
            },
            {
              "t": "Carl-Gustaf Rossby's storm work supports the hurricane category as the primary basis for surge, rainfall, and evacuation decisions. Storm records fit this storm account.",
              "v": "wrong",
              "fb": "That claim misstates the atmospheric mechanism or what the measurement can establish."
            },
            {
              "t": "Carl-Gustaf Rossby's storm authority supports publishing the least disruptive credible track until the forecast models converge. Storm timing supports this storm claim.",
              "v": "danger",
              "fb": "That response lets political or operational convenience replace the forecast evidence."
            }
          ]
        },
        {
          "q": "Which forecast practice best follows the pioneer’s work?",
          "o": [
            {
              "t": "Follow this forecasting practice: diagnose the planetary-scale flow that guides smaller storms. Surge and wind risks stay separately documented. Storm fits.",
              "v": "expert",
              "fb": "Correct: it combines observations, dynamics, uncertainty, and public communication without softening the hazard."
            },
            {
              "t": "Blend radar with the leading deterministic model, then treat ensemble spread and exposure as later refinements. Storm records fit this storm account.",
              "v": "partial",
              "fb": "This is relevant but omits a major data source or impact pathway needed for the warning."
            },
            {
              "t": "Infer that a weakening wind category substantially reduces evacuation urgency even as storm size and rainfall increase. Storm records fit this storm account.",
              "v": "wrong",
              "fb": "That claim misstates the atmospheric mechanism or what the measurement can establish."
            },
            {
              "t": "Rewrite the bulletin around the least disruptive track and wait for landfall to resolve the remaining disagreement. Storm records fit this storm account.",
              "v": "danger",
              "fb": "That response lets political or operational convenience replace the forecast evidence."
            }
          ]
        },
        {
          "q": "What is the sound forecasting conclusion?",
          "o": [
            {
              "t": "The forecast lesson is that a local landfall forecast depends on distant changes in the jet stream. Surge and wind risks stay separately documented.",
              "v": "expert",
              "fb": "Correct: it combines observations, dynamics, uncertainty, and public communication without softening the hazard."
            },
            {
              "t": "Base public action on the most likely track even when a lower-probability scenario carries much greater loss. The category offers a clear signal. Storm fits.",
              "v": "partial",
              "fb": "This is relevant but omits a major data source or impact pathway needed for the warning."
            },
            {
              "t": "Treat model divergence as making the forecast too unstable to support strong protective action. The leading track looks authoritative. The storm record fits.",
              "v": "wrong",
              "fb": "That claim misstates the atmospheric mechanism or what the measurement can establish."
            },
            {
              "t": "Attribute the storm to deliberate modification or exceptional unpredictability before examining how the warning changed. Storm timing supports this storm claim.",
              "v": "danger",
              "fb": "That response lets political or operational convenience replace the forecast evidence."
            }
          ]
        }
      ]
    },
    "wexler": {
      "sci": "Harry Wexler (1911-1962)",
      "topic": "Hurricanes & weather satellites",
      "lede": "A changing atmosphere became more legible through Harry Wexler’s work on hurricanes and weather satellites.",
      "no": 6,
      "profile": "Today’s forecast-room memorandum profiles Harry Wexler through hurricanes and weather satellites. Harry Wexler led research on hurricanes, atmospheric circulation, and the emerging use of satellites in meteorology. He championed global observation from space as a way to see storms over oceans where conventional data were sparse. Meteorology converts scattered observations into a changing three-dimensional atmosphere. Wexler’s contribution explains one step between the instrument reading and the warning heard by the public.\n\nThe forecasting discipline is to use satellite observations to fill oceanic gaps while calibrating them against direct measurements. Surface reports, upper-air structure, radar, satellite data, model ensembles, and local exposure should be compared without allowing a preferred message to erase conflicting evidence.\n\nStorm uncertainty grows from incomplete initial conditions and nonlinear dynamics, yet uncertainty is not ignorance. Probabilities, scenarios, and thresholds can preserve action while the exact track and intensity remain unsettled. The warning process fails when scientific nuance is converted into unwarranted reassurance.\n\nThe operational conclusion: warning quality falls when the observing system leaves the storm unseen. A forecast earns trust when revisions follow evidence and communication preserves the hazard rather than the convenience of the moment. Wind category, rainfall, surge, storm size, and forward speed describe different pathways to damage. An ensemble spread should widen the decision discussion, not disappear from the public summary. Observation times and forecast issue times should be preserved because a correct warning delivered late is still an operational failure. Local officials need impact language tied to roads, buildings, and evacuation zones rather than abstract wind alone.",
      "frame": "Holds two forecast tracks together. \"Uncertainty is not permission to choose the convenient line. Show me hurricanes and weather satellites.\"",
      "q": [
        {
          "q": "Which meteorological explanation best captures Harry Wexler’s work on hurricanes and weather satellites?",
          "o": [
            {
              "t": "Harry Wexler led research on hurricanes, atmospheric circulation, and the emerging use of satellites in meteorology. Surge and wind risks stay separately documented.",
              "v": "expert",
              "fb": "Correct: it combines observations, dynamics, uncertainty, and public communication without softening the hazard."
            },
            {
              "t": "Harry Wexler's storm work emphasizes one deterministic track and the headline category. The leading track looks authoritative. Storm practice makes the storm view plausible.",
              "v": "partial",
              "fb": "This is relevant but omits a major data source or impact pathway needed for the warning."
            },
            {
              "t": "Harry Wexler's storm work supports the hurricane category as the primary basis for surge, rainfall, and evacuation decisions. The category offers a clear signal.",
              "v": "wrong",
              "fb": "That claim misstates the atmospheric mechanism or what the measurement can establish."
            },
            {
              "t": "Harry Wexler's storm authority supports publishing the least disruptive credible track until the forecast models converge. The leading track looks authoritative.",
              "v": "danger",
              "fb": "That response lets political or operational convenience replace the forecast evidence."
            }
          ]
        },
        {
          "q": "Which forecast practice best follows the pioneer’s work?",
          "o": [
            {
              "t": "Follow this forecasting practice: use satellite observations to fill oceanic gaps while calibrating them against direct measurements. Surge and wind risks stay separately documented.",
              "v": "expert",
              "fb": "Correct: it combines observations, dynamics, uncertainty, and public communication without softening the hazard."
            },
            {
              "t": "Blend radar with the leading deterministic model, then treat ensemble spread and exposure as later refinements. The category offers a clear signal. Storm timing supports this storm claim.",
              "v": "partial",
              "fb": "This is relevant but omits a major data source or impact pathway needed for the warning."
            },
            {
              "t": "Infer that a weakening wind category substantially reduces evacuation urgency even as storm size and rainfall increase. The category offers a clear signal. Storm records fit this storm account.",
              "v": "wrong",
              "fb": "That claim misstates the atmospheric mechanism or what the measurement can establish."
            },
            {
              "t": "Rewrite the bulletin around the least disruptive track and wait for landfall to resolve the remaining disagreement. Storm context supports the view. Storm timing supports this storm claim.",
              "v": "danger",
              "fb": "That response lets political or operational convenience replace the forecast evidence."
            }
          ]
        },
        {
          "q": "What is the sound forecasting conclusion?",
          "o": [
            {
              "t": "The forecast lesson is that warning quality falls when the observing system leaves the storm unseen. Surge and wind risks stay separately documented. Storm fits.",
              "v": "expert",
              "fb": "Correct: it combines observations, dynamics, uncertainty, and public communication without softening the hazard."
            },
            {
              "t": "Base public action on the most likely track even when a lower-probability scenario carries much greater loss. The leading track looks authoritative. Storm fits. Storm fits.",
              "v": "partial",
              "fb": "This is relevant but omits a major data source or impact pathway needed for the warning."
            },
            {
              "t": "Treat model divergence as making the forecast too unstable to support strong protective action. Storm records fit this storm account. Storm timing supports this storm claim.",
              "v": "wrong",
              "fb": "That claim misstates the atmospheric mechanism or what the measurement can establish."
            },
            {
              "t": "Attribute the storm to deliberate modification or exceptional unpredictability before examining how the warning changed. Storm timing supports this storm claim. Storm fits.",
              "v": "danger",
              "fb": "That response lets political or operational convenience replace the forecast evidence."
            }
          ]
        }
      ]
    },
    "saffir": {
      "sci": "Herbert Saffir (1917-2007)",
      "topic": "Hurricane wind & structural damage",
      "lede": "Herbert Saffir brought hurricane wind and structural damage into the maps, equations, and instruments of modern forecasting.",
      "no": 7,
      "profile": "Today’s forecast-room memorandum profiles Herbert Saffir through hurricane wind and structural damage. Herbert Saffir was a structural engineer who studied how hurricane winds damage buildings and proposed a five-category scale based on expected effects. Simpson adapted it for operational hurricane communication. Meteorology converts scattered observations into a changing three-dimensional atmosphere. Saffir’s contribution explains one step between the instrument reading and the warning heard by the public.\n\nThe forecasting discipline is to connect wind speed to structural vulnerability without treating the category as a complete loss forecast. Surface reports, upper-air structure, radar, satellite data, model ensembles, and local exposure should be compared without allowing a preferred message to erase conflicting evidence.\n\nStorm uncertainty grows from incomplete initial conditions and nonlinear dynamics, yet uncertainty is not ignorance. Probabilities, scenarios, and thresholds can preserve action while the exact track and intensity remain unsettled. The warning process fails when scientific nuance is converted into unwarranted reassurance.\n\nThe operational conclusion: hazard scales are communication tools, not substitutes for local impact analysis. A forecast earns trust when revisions follow evidence and communication preserves the hazard rather than the convenience of the moment. Wind category, rainfall, surge, storm size, and forward speed describe different pathways to damage. An ensemble spread should widen the decision discussion, not disappear from the public summary. Observation times and forecast issue times should be preserved because a correct warning delivered late is still an operational failure. Local officials need impact language tied to roads, buildings, and evacuation zones rather than abstract wind alone.",
      "frame": "Freezes the radar loop at The Emergency-Management Office. \"The eye moved after this frame. Explain hurricane wind and structural damage before you read the warning log.\"",
      "q": [
        {
          "q": "Which meteorological explanation best captures Herbert Saffir’s work on hurricane wind and structural damage?",
          "o": [
            {
              "t": "Herbert Saffir was a structural engineer who studied how hurricane winds damage buildings and proposed a five-category scale based on expected effects. Surge and wind risks stay separately documented. Storm fits.",
              "v": "expert",
              "fb": "Correct: it combines observations, dynamics, uncertainty, and public communication without softening the hazard."
            },
            {
              "t": "Herbert Saffir's storm work emphasizes one deterministic track and the headline category. The leading track looks authoritative. Storm practice makes the storm view plausible. Storm timing supports this storm claim.",
              "v": "partial",
              "fb": "This is relevant but omits a major data source or impact pathway needed for the warning."
            },
            {
              "t": "Herbert Saffir's storm work supports the hurricane category as the primary basis for surge, rainfall, and evacuation decisions. The category offers a clear signal. Storm timing supports this storm claim.",
              "v": "wrong",
              "fb": "That claim misstates the atmospheric mechanism or what the measurement can establish."
            },
            {
              "t": "Herbert Saffir's storm authority supports publishing the least disruptive credible track until the forecast models converge. The leading track looks authoritative. Storm timing supports this storm claim.",
              "v": "danger",
              "fb": "That response lets political or operational convenience replace the forecast evidence."
            }
          ]
        },
        {
          "q": "Which forecast practice best follows the pioneer’s work?",
          "o": [
            {
              "t": "Follow this forecasting practice: connect wind speed to structural vulnerability without treating the category as a complete loss forecast. Storm fits.",
              "v": "expert",
              "fb": "Correct: it combines observations, dynamics, uncertainty, and public communication without softening the hazard."
            },
            {
              "t": "Blend radar with the leading deterministic model, then treat ensemble spread and exposure as later refinements. Storm records fit this storm account.",
              "v": "partial",
              "fb": "This is relevant but omits a major data source or impact pathway needed for the warning."
            },
            {
              "t": "Infer that a weakening wind category substantially reduces evacuation urgency even as storm size and rainfall increase. Storm records fit this storm account.",
              "v": "wrong",
              "fb": "That claim misstates the atmospheric mechanism or what the measurement can establish."
            },
            {
              "t": "Rewrite the bulletin around the least disruptive track and wait for landfall to resolve the remaining disagreement. Storm records fit this storm account.",
              "v": "danger",
              "fb": "That response lets political or operational convenience replace the forecast evidence."
            }
          ]
        },
        {
          "q": "What is the sound forecasting conclusion?",
          "o": [
            {
              "t": "The forecast lesson is that hazard scales are communication tools, not substitutes for local impact analysis. The warning logic remains visible. Storm fits.",
              "v": "expert",
              "fb": "Correct: it combines observations, dynamics, uncertainty, and public communication without softening the hazard."
            },
            {
              "t": "Base public action on the most likely track even when a lower-probability scenario carries much greater loss. Storm timing supports this storm claim.",
              "v": "partial",
              "fb": "This is relevant but omits a major data source or impact pathway needed for the warning."
            },
            {
              "t": "Treat model divergence as making the forecast too unstable to support strong protective action. The leading track looks authoritative. The storm record fits.",
              "v": "wrong",
              "fb": "That claim misstates the atmospheric mechanism or what the measurement can establish."
            },
            {
              "t": "Attribute the storm to deliberate modification or exceptional unpredictability before examining how the warning changed. Storm records fit this storm account.",
              "v": "danger",
              "fb": "That response lets political or operational convenience replace the forecast evidence."
            }
          ]
        }
      ]
    },
    "lorenz": {
      "sci": "Edward Lorenz (1917-2008)",
      "topic": "Chaos & the limits of prediction",
      "lede": "Edward Lorenz used chaos and the limits of prediction to narrow uncertainty without pretending weather was certain.",
      "no": 8,
      "profile": "Today’s forecast-room memorandum profiles Edward Lorenz through chaos and the limits of prediction. Edward Lorenz discovered sensitive dependence on initial conditions while studying a simplified atmospheric model. Tiny differences in starting values could grow into very different outcomes, a foundation of chaos theory. Meteorology converts scattered observations into a changing three-dimensional atmosphere. Lorenz’s contribution explains one step between the instrument reading and the warning heard by the public.\n\nThe forecasting discipline is to use ensembles and probabilistic ranges to represent growth of initial-condition uncertainty. Surface reports, upper-air structure, radar, satellite data, model ensembles, and local exposure should be compared without allowing a preferred message to erase conflicting evidence.\n\nStorm uncertainty grows from incomplete initial conditions and nonlinear dynamics, yet uncertainty is not ignorance. Probabilities, scenarios, and thresholds can preserve action while the exact track and intensity remain unsettled. The warning process fails when scientific nuance is converted into unwarranted reassurance.\n\nThe operational conclusion: limited predictability does not mean no forecast is possible or no warning is justified. A forecast earns trust when revisions follow evidence and communication preserves the hazard rather than the convenience of the moment. Wind category, rainfall, surge, storm size, and forward speed describe different pathways to damage. An ensemble spread should widen the decision discussion, not disappear from the public summary. Observation times and forecast issue times should be preserved because a correct warning delivered late is still an operational failure. Local officials need impact language tied to roads, buildings, and evacuation zones rather than abstract wind alone.",
      "frame": "Points from the tide gauge to the wind field. \"One category cannot carry all this. Start with chaos and the limits of prediction.\"",
      "q": [
        {
          "q": "Which meteorological explanation best captures Edward Lorenz’s work on chaos and the limits of prediction?",
          "o": [
            {
              "t": "Edward Lorenz discovered sensitive dependence on initial conditions while studying a simplified atmospheric model. Surge and wind risks stay separately documented.",
              "v": "expert",
              "fb": "Correct: it combines observations, dynamics, uncertainty, and public communication without softening the hazard."
            },
            {
              "t": "Edward Lorenz's storm work emphasizes one deterministic track and the headline category. The category offers a clear signal. Storm practice makes the storm view plausible.",
              "v": "partial",
              "fb": "This is relevant but omits a major data source or impact pathway needed for the warning."
            },
            {
              "t": "Edward Lorenz's storm work supports the hurricane category as the primary basis for surge, rainfall, and evacuation decisions. Storm timing supports this storm claim.",
              "v": "wrong",
              "fb": "That claim misstates the atmospheric mechanism or what the measurement can establish."
            },
            {
              "t": "Edward Lorenz's storm authority supports publishing the least disruptive credible track until the forecast models converge. The category offers a clear signal.",
              "v": "danger",
              "fb": "That response lets political or operational convenience replace the forecast evidence."
            }
          ]
        },
        {
          "q": "Which forecast practice best follows the pioneer’s work?",
          "o": [
            {
              "t": "Follow this forecasting practice: use ensembles and probabilistic ranges to represent growth of initial-condition uncertainty. Impact pathways stay separate.",
              "v": "expert",
              "fb": "Correct: it combines observations, dynamics, uncertainty, and public communication without softening the hazard."
            },
            {
              "t": "Blend radar with the leading deterministic model, then treat ensemble spread and exposure as later refinements. The leading track looks authoritative.",
              "v": "partial",
              "fb": "This is relevant but omits a major data source or impact pathway needed for the warning."
            },
            {
              "t": "Infer that a weakening wind category substantially reduces evacuation urgency even as storm size and rainfall increase. The leading track looks authoritative.",
              "v": "wrong",
              "fb": "That claim misstates the atmospheric mechanism or what the measurement can establish."
            },
            {
              "t": "Rewrite the bulletin around the least disruptive track and wait for landfall to resolve the remaining disagreement. The leading track looks authoritative.",
              "v": "danger",
              "fb": "That response lets political or operational convenience replace the forecast evidence."
            }
          ]
        },
        {
          "q": "What is the sound forecasting conclusion?",
          "o": [
            {
              "t": "The forecast lesson is that limited predictability does not mean no forecast is possible or no warning is justified. Impact pathways stay separate.",
              "v": "expert",
              "fb": "Correct: it combines observations, dynamics, uncertainty, and public communication without softening the hazard."
            },
            {
              "t": "Base public action on the most likely track even when a lower-probability scenario carries much greater loss. The category offers a clear signal. Storm fits.",
              "v": "partial",
              "fb": "This is relevant but omits a major data source or impact pathway needed for the warning."
            },
            {
              "t": "Treat model divergence as making the forecast too unstable to support strong protective action. The leading track looks authoritative. The storm record fits.",
              "v": "wrong",
              "fb": "That claim misstates the atmospheric mechanism or what the measurement can establish."
            },
            {
              "t": "Attribute the storm to deliberate modification or exceptional unpredictability before examining how the warning changed. Storm records fit this storm account.",
              "v": "danger",
              "fb": "That response lets political or operational convenience replace the forecast evidence."
            }
          ]
        }
      ]
    },
    "jsimpson": {
      "sci": "Joanne Simpson (1923-2010)",
      "topic": "Hurricane structure & cloud towers",
      "lede": "A changing atmosphere became more legible through Joanne Simpson’s work on hurricane structure and cloud towers.",
      "no": 9,
      "profile": "Today’s forecast-room memorandum profiles Joanne Simpson through hurricane structure and cloud towers. Joanne Simpson pioneered research on tropical convection, hot towers, and hurricane structure using observations, theory, and cloud models. She showed how deep convective towers help transport heat and sustain tropical systems. Meteorology converts scattered observations into a changing three-dimensional atmosphere. Simpson’s contribution explains one step between the instrument reading and the warning heard by the public.\n\nThe forecasting discipline is to connect radar and satellite observations of convection to the larger storm circulation. Surface reports, upper-air structure, radar, satellite data, model ensembles, and local exposure should be compared without allowing a preferred message to erase conflicting evidence.\n\nStorm uncertainty grows from incomplete initial conditions and nonlinear dynamics, yet uncertainty is not ignorance. Probabilities, scenarios, and thresholds can preserve action while the exact track and intensity remain unsettled. The warning process fails when scientific nuance is converted into unwarranted reassurance.\n\nThe operational conclusion: changes inside cloud towers can alter storm intensity before surface reports catch up. A forecast earns trust when revisions follow evidence and communication preserves the hazard rather than the convenience of the moment. Wind category, rainfall, surge, storm size, and forward speed describe different pathways to damage. An ensemble spread should widen the decision discussion, not disappear from the public summary. Observation times and forecast issue times should be preserved because a correct warning delivered late is still an operational failure. Local officials need impact language tied to roads, buildings, and evacuation zones rather than abstract wind alone.\n\nJoanne Simpson's work on hurricane structure helps connect winds to storm surge. Persistent onshore wind stress and low pressure pile water toward the coast, while shelf shape and storm size control depth; the surge can arrive before the strongest eyewall winds. High-water marks, tide-gauge timing, and coastal fatality times can therefore identify surge independently of category. That sequence separates ocean water driven ashore from wind-only destruction or later rainfall flooding.",
      "frame": "Holds two forecast tracks together. \"Uncertainty is not permission to choose the convenient line. Show me hurricane structure and cloud towers.\"",
      "q": [
        {
          "q": "Which meteorological explanation best captures Joanne Simpson’s work on hurricane structure and cloud towers?",
          "o": [
            {
              "t": "Joanne Simpson pioneered research on tropical convection, hot towers, and hurricane structure using observations, theory, and cloud models. Impact pathways stay separate.",
              "v": "expert",
              "fb": "Correct: it combines observations, dynamics, uncertainty, and public communication without softening the hazard."
            },
            {
              "t": "Joanne Simpson's storm work emphasizes one deterministic track and the headline category. The category offers a clear signal. The leading track looks authoritative.",
              "v": "partial",
              "fb": "This is relevant but omits a major data source or impact pathway needed for the warning."
            },
            {
              "t": "Joanne Simpson's storm work supports the hurricane category as the primary basis for surge, rainfall, and evacuation decisions. The leading track looks authoritative.",
              "v": "wrong",
              "fb": "That claim misstates the atmospheric mechanism or what the measurement can establish."
            },
            {
              "t": "Joanne Simpson's storm authority supports publishing the least disruptive credible track until the forecast models converge. The leading track looks authoritative.",
              "v": "danger",
              "fb": "That response lets political or operational convenience replace the forecast evidence."
            }
          ]
        },
        {
          "q": "Which forecast practice best follows the pioneer’s work?",
          "o": [
            {
              "t": "Follow this forecasting practice: connect radar and satellite observations of convection to the larger storm circulation. Impact pathways stay separate.",
              "v": "expert",
              "fb": "Correct: it combines observations, dynamics, uncertainty, and public communication without softening the hazard."
            },
            {
              "t": "Blend radar with the leading deterministic model, then treat ensemble spread and exposure as later refinements. The leading track looks authoritative.",
              "v": "partial",
              "fb": "This is relevant but omits a major data source or impact pathway needed for the warning."
            },
            {
              "t": "Infer that a weakening wind category substantially reduces evacuation urgency even as storm size and rainfall increase. The category offers a clear signal.",
              "v": "wrong",
              "fb": "That claim misstates the atmospheric mechanism or what the measurement can establish."
            },
            {
              "t": "Rewrite the bulletin around the least disruptive track and wait for landfall to resolve the remaining disagreement. Storm practice makes the storm view plausible.",
              "v": "danger",
              "fb": "That response lets political or operational convenience replace the forecast evidence."
            }
          ]
        },
        {
          "q": "What is the sound forecasting conclusion?",
          "o": [
            {
              "t": "The forecast lesson is that changes inside cloud towers can alter storm intensity before surface reports catch up. Impact pathways stay separate. Storm fits.",
              "v": "expert",
              "fb": "Correct: it combines observations, dynamics, uncertainty, and public communication without softening the hazard."
            },
            {
              "t": "Base public action on the most likely track even when a lower-probability scenario carries much greater loss. Storm timing supports this storm claim.",
              "v": "partial",
              "fb": "This is relevant but omits a major data source or impact pathway needed for the warning."
            },
            {
              "t": "Treat model divergence as making the forecast too unstable to support strong protective action. The leading track looks authoritative. The storm record fits.",
              "v": "wrong",
              "fb": "That claim misstates the atmospheric mechanism or what the measurement can establish."
            },
            {
              "t": "Attribute the storm to deliberate modification or exceptional unpredictability before examining how the warning changed. Storm records fit this storm account.",
              "v": "danger",
              "fb": "That response lets political or operational convenience replace the forecast evidence."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "spotter": {
      "coast": "Storm Spotter Vane chooses The Coast & Tide Gauges for the tide inquiry and lays out the surveyed high-water marks. \"Weather evidence needs disciplined readers; earn the observation log through the profile.\"",
      "forecastfloor": "Storm Spotter Vane chooses The Hurricane Forecast Floor for the tide inquiry and lays out the archived radar loop. \"Weather evidence needs disciplined readers; earn the observation log through the profile.\"",
      "office": "Storm Spotter Vane chooses The Emergency-Management Office for the tide inquiry and lays out the warning and evacuation log. \"Weather evidence needs disciplined readers; earn the observation log through the profile.\""
    },
    "radar": {
      "coast": "The Radar Analyst chooses The Coast & Tide Gauges for the tide inquiry and lays out the surveyed high-water marks. \"The forecast products come after you demonstrate command of today's meteorologist.\"",
      "forecastfloor": "The Radar Analyst chooses The Hurricane Forecast Floor for the tide inquiry and lays out the archived radar loop. \"The forecast products come after you demonstrate command of today's meteorologist.\"",
      "office": "The Radar Analyst chooses The Emergency-Management Office for the tide inquiry and lays out the warning and evacuation log. \"The forecast products come after you demonstrate command of today's meteorologist.\""
    },
    "clerk": {
      "coast": "The Clerk chooses The Coast & Tide Gauges for the tide inquiry and lays out the surveyed high-water marks. \"Read the pioneer closely, and the warning correspondence is yours to inspect.\"",
      "forecastfloor": "The Clerk chooses The Hurricane Forecast Floor for the tide inquiry and lays out the archived radar loop. \"Read the pioneer closely, and the warning correspondence is yours to inspect.\"",
      "office": "The Clerk chooses The Emergency-Management Office for the tide inquiry and lays out the warning and evacuation log. \"Read the pioneer closely, and the warning correspondence is yours to inspect.\""
    }
  },
  "story": [
    "<b>The Halloway Landfall</b> opens inside the Halloway storm inquiry, where the visible damage is easier to describe than the chain that produced it.",
    "<b>Storm Spotter Vane</b>, <b>The Radar Analyst</b>, and <b>The Clerk</b> each control a different slice of the record, and each conversation turns one real pioneer into a way of reading the case.",
    "Some witnesses are drawn toward <b>Peak category wind caused the dominant structural destruction.</b>; others settle too quickly on <b>Extreme rainfall overwhelmed rivers after the center moved inland.</b>. Your job is to separate those tempting stories from the harder explanation the evidence supports.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide what the case is really about."
  ],
  "endings": {
    "overclaimWhat": "weapon",
    "dismissalWhat": "freak",
    "win": {
      "expertTitle": "The Water Arrived Before the Peak Wind",
      "expert": [
        "Investigator Cole Renard names Delia Marsh — regional emergency-management chief, The Emergency-Management Office, and Storm surge raised coastal water before peak winds arrived. Not Peak category wind caused the dominant structural destruction. Not Extreme rainfall overwhelmed rivers after the center moved inland.",
        "The readings show that peak wind, freshwater flooding, and storm surge have distinct measurements and timing; fatality locations and water arrival identify which hazard dominated."
      ],
      "soundTitle": "A Defensible Hazard Finding",
      "sound": [
        "Tide evidence fixes the trio: Delia Marsh — regional emergency-management chief; The Emergency-Management Office; Storm surge raised coastal water before peak winds arrived.",
        "The hazard timeline supports the answer; public-warning responsibility still lacks every requested record."
      ],
      "namedTitle": "Correct Hazard, Limited Attribution",
      "named": [
        "Tide evidence points to Delia Marsh — regional emergency-management chief, The Emergency-Management Office, and Storm surge raised coastal water before peak winds arrived; tide support remains incomplete.",
        "The dominant hazard is identified; the warning inquiry still rests on too few collected documents."
      ]
    },
    "overclaim": {
      "title": "The Category-Wind Explanation",
      "body": [
        "Investigator Cole Renard attributes deaths to Peak category wind caused the dominant structural destruction. Location and timing do not follow category wind.",
        "Saffir-Simpson categories describe maximum sustained wind, not surge depth or rainfall. Structural wind damage alone cannot explain early coastal drowning above the mapped wind-failure zone."
      ]
    },
    "dismissal": {
      "title": "The Inland-Rainfall Explanation",
      "body": [
        "Investigator Cole Renard instead selects Extreme rainfall overwhelmed rivers after the center moved inland. River peaks arrive after the coastal deaths.",
        "Radar and river gauges document severe inland rainfall, but most deaths occurred on the coast before the center moved inland and before river peaks developed."
      ]
    },
    "wrongNames": {
      "title": "Right Hazard, Wrong Names",
      "body": [
        "Storm surge is the correct hazard, while the accusation misplaces responsibility. Complete the warning clues before judgment."
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A hurricane spiral approaching a coastline\"><path d=\"M0 108 C90 90,176 110,244 98 C300 88,362 62,430 68 C500 74,580 102,660 92\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M120 54 C154 18,220 20,236 54 C248 80,224 112,188 112 C156 112,136 88,136 62 C136 38,156 28,174 30\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2.3\"/><circle cx=\"186\" cy=\"60\" r=\"9\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/><path d=\"M356 22 L400 68 L364 68 L416 118\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2\"/><path d=\"M470 54 L470 110\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M462 66 L478 66 M462 84 L478 84 M462 100 L478 100\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M500 70 C546 62,598 72,632 96\" fill=\"none\" stroke=\"#e2e2d8\" stroke-width=\"1.2\"/></svg>"
}};
