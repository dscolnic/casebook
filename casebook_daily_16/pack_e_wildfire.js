module.exports = { PACK: {
  "id": "e_wildfire",
  "title": "The Pinehaven Fire",
  "discipline": "Wildfire & Combustion Science",
  "teaser": "A firestorm erased a mountain town in an afternoon. Arson on the wind? A blaze beyond anything nature had shown? Or fuel left to pile up and an evacuation held too long?",
  "overclaimTag": "coordinated arson",
  "truthTag": "deferred fuel management",
  "venue": "the Pinehaven wildfire inquiry",
  "agent": {
    "name": "Investigator June Alaric",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Wildfire-Science Pioneers",
  "dossierName": "WILDFIRE-SCIENCE PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Pinehaven wildfire inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The WHERE you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "Arson offers a single culprit; the fire’s history must be reconstructed before motive is declared.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "chief",
      "items": [
        {
          "id": "chief",
          "label": "Garrett Pyle — forest district fire chief"
        },
        {
          "id": "fbehavior",
          "label": "The fire-behavior analyst"
        },
        {
          "id": "sheriff",
          "label": "The county sheriff"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "office",
      "items": [
        {
          "id": "ridge",
          "label": "The Ridge & Fuel Breaks"
        },
        {
          "id": "firecamp",
          "label": "The Incident Command Post"
        },
        {
          "id": "office",
          "label": "The Forest District Office"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "deferred",
      "items": [
        {
          "id": "arson",
          "label": "A coordinated arson attack"
        },
        {
          "id": "freak",
          "label": "A freak firestorm nothing could stop — an act of God"
        },
        {
          "id": "deferred",
          "label": "Deferred fuel clearing & a delayed evacuation order"
        }
      ]
    }
  },
  "PLACES": {
    "ridge": {
      "name": "The Ridge & Fuel Breaks",
      "xy": [
        140,
        90
      ]
    },
    "firecamp": {
      "name": "The Incident Command Post",
      "xy": [
        330,
        240
      ]
    },
    "office": {
      "name": "The Forest District Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "ridge",
      "firecamp"
    ],
    [
      "firecamp",
      "office"
    ]
  ],
  "CHARACTERS": {
    "lookout": {
      "name": "Lookout Wren",
      "role": "Fire lookout",
      "face": "🔭",
      "badge": "W",
      "legend": "the ridge",
      "hint": "Spotted the first smoke; watched the brush no one had cleared catch and run."
    },
    "dispatcher": {
      "name": "The Dispatcher",
      "role": "Incident dispatcher",
      "face": "📻",
      "badge": "D",
      "legend": "the command post",
      "hint": "Ran the radios; the evacuation call was held while the fire jumped the line."
    },
    "clerk": {
      "name": "The Clerk",
      "role": "District-office clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Keeps the burn plans — and the fuel-reduction work that was cut from the budget."
    }
  },
  "TOPICMAP": {
    "ridge": {
      "lookout": [
        "zeldovich"
      ],
      "dispatcher": [
        "emmons"
      ],
      "clerk": [
        "fons"
      ]
    },
    "firecamp": {
      "lookout": [
        "countryman"
      ],
      "dispatcher": [
        "rothermel"
      ],
      "clerk": [
        "biswell"
      ]
    },
    "office": {
      "lookout": [
        "pyne"
      ],
      "dispatcher": [
        "fwilliams"
      ],
      "clerk": [
        "quintiere"
      ]
    }
  },
  "TOPICS": {
    "zeldovich": {
      "sci": "Yakov Zeldovich (1914-1987)",
      "topic": "Flame propagation & combustion theory",
      "lede": "Yakov Zeldovich turned flame propagation and combustion theory into measurable relationships among heat, fuel, air, and terrain.",
      "no": 1,
      "profile": "Today’s fire-science bulletin examines Yakov Zeldovich through flame propagation and combustion theory. Yakov Zeldovich developed fundamental theories of chemical kinetics, ignition, and flame propagation that connected reaction rates with heat and mass transfer. Wildfire behavior emerges from combustion, fuel arrangement, moisture, terrain, wind, and the fire’s own heat. Zeldovich’s contribution makes one of those mechanisms measurable. The same ignition can remain small, run through surface fuels, or transition into crown and structure fire as conditions cross thresholds.\n\nThe operational practice is to compare heat generation with heat loss, model reaction fronts, and identify thresholds separating extinction, steady burning, and runaway. Analysts should state fuel type and treatment history, measure current moisture and weather, examine slope and wind channeling, and compare predictions with observed spread. Evacuation and suppression decisions should be tied to trigger points that remain usable when communications and visibility degrade.\n\nExtreme weather matters, but landscapes also carry accumulated management choices. Dense surface and ladder fuels can connect a flame front to the canopy; vulnerable roofs and nearby vegetation can convert embers into structure loss. Preparedness therefore combines fuel work, building measures, detection, warning, and timely movement of people.\n\nThe fire lesson is combustion accelerates through feedback, so small changes near an ignition threshold can produce sharply different outcomes. Risk is reduced by acting on fuels and exposure before a fast-moving incident removes the available choices. Delayed evacuation competes with smoke, falling power lines, congestion, and rapidly narrowing road access. Prescribed fire should be evaluated against explicit ecological and hazard objectives rather than treated as burning for its own sake.",
      "frame": "Lays a fuel map over the wind trace. \"At The Ridge & Fuel Breaks, the flame followed both. Explain flame propagation and combustion theory.\"",
      "q": [
        {
          "q": "Which fire-science account best captures Yakov Zeldovich’s contribution to flame propagation and combustion theory?",
          "o": [
            {
              "t": "Yakov Zeldovich developed fundamental theories of chemical kinetics, ignition, and flame propagation that connected reaction rates with heat and mass transfer. The wildfire history lets later reviewers reconstruct events.",
              "v": "expert",
              "fb": "Correct: wildfire behavior joins combustion, fuel, terrain, weather, exposure, and operational timing."
            },
            {
              "t": "Yakov Zeldovich contributed to flame propagation and combustion theory, but the account measures current weather while leaving fuels, structures, and treatment history incomplete. Structure ignition is still untested.",
              "v": "partial",
              "fb": "Weather is essential, but the same weather produces different outcomes across different fuels and built environments."
            },
            {
              "t": "Yakov Zeldovich is portrayed as treating the ignition source as a complete explanation for later spread, spotting, and community loss. The spread mechanism contradicts that. The fire record points beyond ignition.",
              "v": "wrong",
              "fb": "Ignition starts the event; fuel continuity, wind, spotting, and vulnerability shape the disaster that follows."
            },
            {
              "t": "Yakov Zeldovich is invoked to delay evacuation and fuel action because no model can predict the fire’s exact future perimeter. Delay consumes the evacuation margin. Under the wildfire history, warning is postponed.",
              "v": "danger",
              "fb": "Decisions use thresholds and margins precisely because exact fire growth does not be forecast in real time."
            }
          ]
        },
        {
          "q": "What operational choice follows the fire-science method?",
          "o": [
            {
              "t": "For the fire environment, apply this procedure: compare heat generation with heat loss, model reaction fronts, and identify thresholds separating extinction, steady burning, and runaway. Fuel and exposure stay connected.",
              "v": "expert",
              "fb": "Correct: wildfire behavior joins combustion, fuel, terrain, weather, exposure, and operational timing."
            },
            {
              "t": "Update wind and humidity, but omit fuel continuity, topographic channeling, home ignition, spotting, and trigger-point timing. Structure ignition is still untested. Support across the wildfire history stays partial.",
              "v": "partial",
              "fb": "Weather is essential, but the same weather produces different outcomes across different fuels and built environments."
            },
            {
              "t": "Infer suppression success from the first line holding, without accounting for embers, crown transition, or deteriorating road access. The spread mechanism contradicts that. Within the wildfire history, no support appears.",
              "v": "wrong",
              "fb": "Ignition starts the event; fuel continuity, wind, spotting, and vulnerability shape the disaster that follows."
            },
            {
              "t": "Protect the preferred operating plan, postpone warning until spread is certain, and call every missed threshold extraordinary weather. Delay consumes the evacuation margin. Uncertainty postpones the primarily choices.",
              "v": "danger",
              "fb": "Decisions use thresholds and margins precisely because exact fire growth does not be forecast in real time."
            }
          ]
        },
        {
          "q": "Which wildfire conclusion is most responsible?",
          "o": [
            {
              "t": "The wildfire lesson is that combustion accelerates through feedback, so small changes near an ignition threshold can produce sharply different outcomes. The wildfire history keeps assumptions explicit, in tests.",
              "v": "expert",
              "fb": "Correct: wildfire behavior joins combustion, fuel, terrain, weather, exposure, and operational timing."
            },
            {
              "t": "Extreme weather dominates enough that deferred treatment and delayed movement can be treated as secondary administrative details. The landscape history remains incomplete. Structure ignition is still untested, in use.",
              "v": "partial",
              "fb": "Weather is essential, but the same weather produces different outcomes across different fuels and built environments."
            },
            {
              "t": "Finding an ignition source fully explains the disaster even when fuel arrangement and exposure determine how the event grows. The spread mechanism contradicts that. The fire record points beyond ignition, in use.",
              "v": "wrong",
              "fb": "Ignition starts the event; fuel continuity, wind, spotting, and vulnerability shape the disaster that follows."
            },
            {
              "t": "The loss is likely to be coordinated arson or an unstoppable firestorm, excluding accumulated fuels and a preventable delay. Uncertainty postpones the primarily choices. Inside the wildfire history, drama displaces testing.",
              "v": "danger",
              "fb": "Decisions use thresholds and margins precisely because exact fire growth does not be forecast in real time."
            }
          ]
        }
      ]
    },
    "emmons": {
      "sci": "Howard Emmons (1912-1998)",
      "topic": "The physics of fire",
      "lede": "Howard Emmons connected the physics of fire to decisions made before a fire crosses its next threshold.",
      "no": 2,
      "profile": "Today’s fire-science bulletin examines Howard Emmons through the physics of fire. Howard Emmons helped establish fire science as an engineering field by studying flame spread, buoyant plumes, compartment fires, and heat transfer. Wildfire behavior emerges from combustion, fuel arrangement, moisture, terrain, wind, and the fire’s own heat. Emmons’s contribution makes one of those mechanisms measurable. The same ignition can remain small, run through surface fuels, or transition into crown and structure fire as conditions cross thresholds.\n\nThe operational practice is to separate ignition, growth, ventilation, plume movement, and enclosure effects while measuring heat and smoke transport. Analysts should state fuel type and treatment history, measure current moisture and weather, examine slope and wind channeling, and compare predictions with observed spread. Evacuation and suppression decisions should be tied to trigger points that remain usable when communications and visibility degrade.\n\nExtreme weather matters, but landscapes also carry accumulated management choices. Dense surface and ladder fuels can connect a flame front to the canopy; vulnerable roofs and nearby vegetation can convert embers into structure loss. Preparedness therefore combines fuel work, building measures, detection, warning, and timely movement of people.\n\nThe fire lesson is fire behavior is a coupled system because geometry and airflow can change the same fuel from a small flame into rapid growth. Risk is reduced by acting on fuels and exposure before a fast-moving incident removes the available choices. A line on a map is not a barrier when wind-driven embers can establish new fires well beyond it. Delayed evacuation competes with smoke, falling power lines, congestion, and rapidly narrowing road access.",
      "frame": "Opens an unsigned treatment plan. \"Before smoke erased the choices, tell me how the physics of fire should guide them.\"",
      "q": [
        {
          "q": "Which fire-science account best captures Howard Emmons’s contribution to the physics of fire?",
          "o": [
            {
              "t": "Howard Emmons helped establish fire science as an engineering field by studying flame spread, buoyant plumes, compartment fires, and heat transfer. The wildfire history keeps assumptions explicit.",
              "v": "expert",
              "fb": "Correct: wildfire behavior joins combustion, fuel, terrain, weather, exposure, and operational timing."
            },
            {
              "t": "Howard Emmons contributed to the physics of fire, but the account measures current weather while leaving fuels, structures, and treatment history incomplete. Structure ignition is still untested.",
              "v": "partial",
              "fb": "Weather is essential, but the same weather produces different outcomes across different fuels and built environments."
            },
            {
              "t": "Howard Emmons is portrayed as treating the ignition source as a complete explanation for later spread, spotting, and community loss. Under the wildfire history, direct comparison fails.",
              "v": "wrong",
              "fb": "Ignition starts the event; fuel continuity, wind, spotting, and vulnerability shape the disaster that follows."
            },
            {
              "t": "Howard Emmons is invoked to delay evacuation and fuel action because no model can predict the fire’s exact future perimeter. Within the wildfire history, assumption replaces verification.",
              "v": "danger",
              "fb": "Decisions use thresholds and margins precisely because exact fire growth does not be forecast in real time."
            }
          ]
        },
        {
          "q": "What operational choice follows the fire-science method?",
          "o": [
            {
              "t": "For the fire environment, apply this procedure: separate ignition, growth, ventilation, plume movement, and enclosure effects while measuring heat and smoke transport.",
              "v": "expert",
              "fb": "Correct: wildfire behavior joins combustion, fuel, terrain, weather, exposure, and operational timing."
            },
            {
              "t": "Update wind and humidity, but omit fuel continuity, topographic channeling, home ignition, spotting, and trigger-point timing. The landscape history remains incomplete.",
              "v": "partial",
              "fb": "Weather is essential, but the same weather produces different outcomes across different fuels and built environments."
            },
            {
              "t": "Infer suppression success from the first line holding, without accounting for embers, crown transition, or deteriorating road access. The fire record points beyond ignition.",
              "v": "wrong",
              "fb": "Ignition starts the event; fuel continuity, wind, spotting, and vulnerability shape the disaster that follows."
            },
            {
              "t": "Protect the preferred operating plan, postpone warning until spread is certain, and call every missed threshold extraordinary weather. Delay consumes the evacuation margin.",
              "v": "danger",
              "fb": "Decisions use thresholds and margins precisely because exact fire growth does not be forecast in real time."
            }
          ]
        },
        {
          "q": "Which wildfire conclusion is most responsible?",
          "o": [
            {
              "t": "The wildfire lesson is that fire behavior is a coupled system because geometry and airflow can change the same fuel from a small flame into rapid growth. The wildfire history keeps assumptions explicit, on site.",
              "v": "expert",
              "fb": "Correct: wildfire behavior joins combustion, fuel, terrain, weather, exposure, and operational timing."
            },
            {
              "t": "Extreme weather dominates enough that deferred treatment and delayed movement can be treated as secondary administrative details. The landscape history remains incomplete. Structure ignition is still untested, in use.",
              "v": "partial",
              "fb": "Weather is essential, but the same weather produces different outcomes across different fuels and built environments."
            },
            {
              "t": "Finding an ignition source fully explains the disaster even when fuel arrangement and exposure determine how the event grows. The spread mechanism contradicts that. The fire record points beyond ignition, in use.",
              "v": "wrong",
              "fb": "Ignition starts the event; fuel continuity, wind, spotting, and vulnerability shape the disaster that follows."
            },
            {
              "t": "The loss is likely to be coordinated arson or an unstoppable firestorm, excluding accumulated fuels and a preventable delay. Uncertainty postpones the primarily choices. Inside the wildfire history, drama displaces testing.",
              "v": "danger",
              "fb": "Decisions use thresholds and margins precisely because exact fire growth does not be forecast in real time."
            }
          ]
        }
      ]
    },
    "fons": {
      "sci": "William Fons (fire scientist)",
      "topic": "Modeling the spread of fire",
      "lede": "Flame behavior became an engineering quantity in William Fons’s work on modeling the spread of fire.",
      "no": 3,
      "profile": "Today’s fire-science bulletin examines William Fons through modeling the spread of fire. William Fons developed early quantitative models and experiments on how forest fires spread through fuels under varying wind and slope. Wildfire behavior emerges from combustion, fuel arrangement, moisture, terrain, wind, and the fire’s own heat. Fons’s contribution makes one of those mechanisms measurable. The same ignition can remain small, run through surface fuels, or transition into crown and structure fire as conditions cross thresholds.\n\nThe operational practice is to measure fuel arrangement and moisture, apply controlled ignition, and relate spread rate to heat transfer, wind, and terrain. Analysts should state fuel type and treatment history, measure current moisture and weather, examine slope and wind channeling, and compare predictions with observed spread. Evacuation and suppression decisions should be tied to trigger points that remain usable when communications and visibility degrade.\n\nExtreme weather matters, but landscapes also carry accumulated management choices. Dense surface and ladder fuels can connect a flame front to the canopy; vulnerable roofs and nearby vegetation can convert embers into structure loss. Preparedness therefore combines fuel work, building measures, detection, warning, and timely movement of people.\n\nThe fire lesson is fire spread can be modeled only when the fuel bed and environmental conditions used by the model resemble the actual landscape. Risk is reduced by acting on fuels and exposure before a fast-moving incident removes the available choices. Prescribed fire should be evaluated against explicit ecological and hazard objectives rather than treated as burning for its own sake.",
      "frame": "Pauses the radio log at the first spot fire. \"The front was no longer the only fire. Show me what modeling the spread of fire predicts.\"",
      "q": [
        {
          "q": "Which fire-science account best captures William Fons’s contribution to modeling the spread of fire?",
          "o": [
            {
              "t": "William Fons developed early quantitative models and experiments on how forest fires spread through fuels under varying wind and slope. The trigger points remain actionable.",
              "v": "expert",
              "fb": "Correct: wildfire behavior joins combustion, fuel, terrain, weather, exposure, and operational timing."
            },
            {
              "t": "William Fons contributed to modeling the spread of fire, but the account measures current weather while leaving fuels, structures, and treatment history incomplete.",
              "v": "partial",
              "fb": "Weather is essential, but the same weather produces different outcomes across different fuels and built environments."
            },
            {
              "t": "William Fons is portrayed as treating the ignition source as a complete explanation for later spread, spotting, and community loss. The spread mechanism contradicts that.",
              "v": "wrong",
              "fb": "Ignition starts the event; fuel continuity, wind, spotting, and vulnerability shape the disaster that follows."
            },
            {
              "t": "William Fons is invoked to delay evacuation and fuel action because no model can predict the fire’s exact future perimeter. Uncertainty postpones the primarily choices.",
              "v": "danger",
              "fb": "Decisions use thresholds and margins precisely because exact fire growth does not be forecast in real time."
            }
          ]
        },
        {
          "q": "What operational choice follows the fire-science method?",
          "o": [
            {
              "t": "For the fire environment, apply this procedure: measure fuel arrangement and moisture, apply controlled ignition, and relate spread rate to heat transfer, wind, and terrain.",
              "v": "expert",
              "fb": "Correct: wildfire behavior joins combustion, fuel, terrain, weather, exposure, and operational timing."
            },
            {
              "t": "Update wind and humidity, but omit fuel continuity, topographic channeling, home ignition, spotting, and trigger-point timing. The wildfire history leaves one test open.",
              "v": "partial",
              "fb": "Weather is essential, but the same weather produces different outcomes across different fuels and built environments."
            },
            {
              "t": "Infer suppression success from the first line holding, without accounting for embers, crown transition, or deteriorating road access. The wildfire history defeats that inference.",
              "v": "wrong",
              "fb": "Ignition starts the event; fuel continuity, wind, spotting, and vulnerability shape the disaster that follows."
            },
            {
              "t": "Protect the preferred operating plan, postpone warning until spread is certain, and call every missed threshold extraordinary weather. Delay consumes the evacuation margin.",
              "v": "danger",
              "fb": "Decisions use thresholds and margins precisely because exact fire growth does not be forecast in real time."
            }
          ]
        },
        {
          "q": "Which wildfire conclusion is most responsible?",
          "o": [
            {
              "t": "The wildfire lesson is that fire spread can be modeled only when the fuel bed and environmental conditions used by the model resemble the actual landscape. The wildfire history keeps assumptions explicit, in use.",
              "v": "expert",
              "fb": "Correct: wildfire behavior joins combustion, fuel, terrain, weather, exposure, and operational timing."
            },
            {
              "t": "Extreme weather dominates enough that deferred treatment and delayed movement can be treated as secondary administrative details. The landscape history remains incomplete. Structure ignition is still untested, in use.",
              "v": "partial",
              "fb": "Weather is essential, but the same weather produces different outcomes across different fuels and built environments."
            },
            {
              "t": "Finding an ignition source fully explains the disaster even when fuel arrangement and exposure determine how the event grows. The spread mechanism contradicts that. The fire record points beyond ignition, in use.",
              "v": "wrong",
              "fb": "Ignition starts the event; fuel continuity, wind, spotting, and vulnerability shape the disaster that follows."
            },
            {
              "t": "The loss is likely to be coordinated arson or an unstoppable firestorm, excluding accumulated fuels and a preventable delay. Uncertainty postpones the primarily choices. Inside the wildfire history, drama displaces testing.",
              "v": "danger",
              "fb": "Decisions use thresholds and margins precisely because exact fire growth does not be forecast in real time."
            }
          ]
        }
      ]
    },
    "countryman": {
      "sci": "Clive Countryman (fire scientist)",
      "topic": "The fire environment & fire weather",
      "lede": "Clive Countryman turned the fire environment and fire weather into measurable relationships among heat, fuel, air, and terrain.",
      "no": 4,
      "profile": "Today’s fire-science bulletin examines Clive Countryman through the fire environment and fire weather. Clive Countryman studied the fire environment, emphasizing the interaction of fuels, weather, topography, and local energy exchange. Wildfire behavior emerges from combustion, fuel arrangement, moisture, terrain, wind, and the fire’s own heat. Countryman’s contribution makes one of those mechanisms measurable. The same ignition can remain small, run through surface fuels, or transition into crown and structure fire as conditions cross thresholds.\n\nThe operational practice is to observe slope winds, atmospheric stability, fuel condition, terrain channeling, and the fire's modification of its own surroundings. Analysts should state fuel type and treatment history, measure current moisture and weather, examine slope and wind channeling, and compare predictions with observed spread. Evacuation and suppression decisions should be tied to trigger points that remain usable when communications and visibility degrade.\n\nExtreme weather matters, but landscapes also carry accumulated management choices. Dense surface and ladder fuels can connect a flame front to the canopy; vulnerable roofs and nearby vegetation can convert embers into structure loss. Preparedness therefore combines fuel work, building measures, detection, warning, and timely movement of people.\n\nThe fire lesson is fire weather is local as well as regional because ridges, valleys, and the fire itself reshape airflow. Risk is reduced by acting on fuels and exposure before a fast-moving incident removes the available choices. Delayed evacuation competes with smoke, falling power lines, congestion, and rapidly narrowing road access. Prescribed fire should be evaluated against explicit ecological and hazard objectives rather than treated as burning for its own sake.",
      "frame": "Lays a fuel map over the wind trace. \"At The Incident Command Post, the flame followed both. Explain the fire environment and fire weather.\"",
      "q": [
        {
          "q": "Which fire-science account best captures Clive Countryman’s contribution to the fire environment and fire weather?",
          "o": [
            {
              "t": "Clive Countryman studied the fire environment, emphasizing the interaction of fuels, weather, topography, and local energy exchange. The wildfire history keeps assumptions explicit.",
              "v": "expert",
              "fb": "Correct: wildfire behavior joins combustion, fuel, terrain, weather, exposure, and operational timing."
            },
            {
              "t": "Clive Countryman contributed to the fire environment and fire weather, but the account measures current weather while leaving fuels, structures, and treatment history incomplete.",
              "v": "partial",
              "fb": "Weather is essential, but the same weather produces different outcomes across different fuels and built environments."
            },
            {
              "t": "Clive Countryman is portrayed as treating the ignition source as a complete explanation for later spread, spotting, and community loss. The spread mechanism contradicts that.",
              "v": "wrong",
              "fb": "Ignition starts the event; fuel continuity, wind, spotting, and vulnerability shape the disaster that follows."
            },
            {
              "t": "Clive Countryman is invoked to delay evacuation and fuel action because no model can predict the fire’s exact future perimeter. Under the wildfire history, warning is postponed.",
              "v": "danger",
              "fb": "Decisions use thresholds and margins precisely because exact fire growth does not be forecast in real time."
            }
          ]
        },
        {
          "q": "What operational choice follows the fire-science method?",
          "o": [
            {
              "t": "For the fire environment, apply this procedure: observe slope winds, atmospheric stability, fuel condition, terrain channeling, and the fire's modification of its own surroundings.",
              "v": "expert",
              "fb": "Correct: wildfire behavior joins combustion, fuel, terrain, weather, exposure, and operational timing."
            },
            {
              "t": "Update wind and humidity, but omit fuel continuity, topographic channeling, home ignition, spotting, and trigger-point timing. Support across the wildfire history stays partial.",
              "v": "partial",
              "fb": "Weather is essential, but the same weather produces different outcomes across different fuels and built environments."
            },
            {
              "t": "Infer suppression success from the first line holding, without accounting for embers, crown transition, or deteriorating road access. Within the wildfire history, no support appears.",
              "v": "wrong",
              "fb": "Ignition starts the event; fuel continuity, wind, spotting, and vulnerability shape the disaster that follows."
            },
            {
              "t": "Protect the preferred operating plan, postpone warning until spread is certain, and call every missed threshold extraordinary weather. Uncertainty postpones the primarily choices.",
              "v": "danger",
              "fb": "Decisions use thresholds and margins precisely because exact fire growth does not be forecast in real time."
            }
          ]
        },
        {
          "q": "Which wildfire conclusion is most responsible?",
          "o": [
            {
              "t": "The wildfire lesson is that fire weather is local as well as regional because ridges, valleys, and the fire itself reshape airflow. Fuel and exposure stay connected, in use.",
              "v": "expert",
              "fb": "Correct: wildfire behavior joins combustion, fuel, terrain, weather, exposure, and operational timing."
            },
            {
              "t": "Extreme weather dominates enough that deferred treatment and delayed movement can be treated as secondary administrative details. Structure ignition is still untested.",
              "v": "partial",
              "fb": "Weather is essential, but the same weather produces different outcomes across different fuels and built environments."
            },
            {
              "t": "Finding an ignition source fully explains the disaster even when fuel arrangement and exposure determine how the event grows. The spread mechanism contradicts that, in use.",
              "v": "wrong",
              "fb": "Ignition starts the event; fuel continuity, wind, spotting, and vulnerability shape the disaster that follows."
            },
            {
              "t": "The loss is likely to be coordinated arson or an unstoppable firestorm, excluding accumulated fuels and a preventable delay. Inside the wildfire history, drama displaces testing.",
              "v": "danger",
              "fb": "Decisions use thresholds and margins precisely because exact fire growth does not be forecast in real time."
            }
          ]
        }
      ]
    },
    "rothermel": {
      "sci": "Richard Rothermel (1929-2023)",
      "topic": "The fire-spread model",
      "lede": "Richard Rothermel connected the fire-spread model to decisions made before a fire crosses its next threshold.",
      "no": 5,
      "profile": "Today’s fire-science bulletin examines Richard Rothermel through the fire-spread model. Richard Rothermel developed the 1972 mathematical model that remains a foundation for predicting surface-fire spread in uniform fuel beds. Wildfire behavior emerges from combustion, fuel arrangement, moisture, terrain, wind, and the fire’s own heat. Rothermel’s contribution makes one of those mechanisms measurable. The same ignition can remain small, run through surface fuels, or transition into crown and structure fire as conditions cross thresholds.\n\nThe operational practice is to describe fuel load, particle size, moisture, packing, wind, and slope, then calculate the balance driving a propagating flame front. Analysts should state fuel type and treatment history, measure current moisture and weather, examine slope and wind channeling, and compare predictions with observed spread. Evacuation and suppression decisions should be tied to trigger points that remain usable when communications and visibility degrade.\n\nExtreme weather matters, but landscapes also carry accumulated management choices. Dense surface and ladder fuels can connect a flame front to the canopy; vulnerable roofs and nearby vegetation can convert embers into structure loss. Preparedness therefore combines fuel work, building measures, detection, warning, and timely movement of people.\n\nThe fire lesson is a widely used model remains conditional because heterogeneous fuels, spotting, and extreme winds can move behavior beyond its assumptions. Risk is reduced by acting on fuels and exposure before a fast-moving incident removes the available choices. A line on a map is not a barrier when wind-driven embers can establish new fires well beyond it. Delayed evacuation competes with smoke, falling power lines, congestion, and rapidly narrowing road access.",
      "frame": "Opens an unsigned treatment plan. \"Before smoke erased the choices, tell me how the fire-spread model should guide them.\"",
      "q": [
        {
          "q": "Which fire-science account best captures Richard Rothermel’s contribution to the fire-spread model?",
          "o": [
            {
              "t": "Richard Rothermel developed the 1972 mathematical model that remains a foundation for predicting surface-fire spread in uniform fuel beds. Fuel and exposure stay connected. The wildfire history keeps assumptions explicit.",
              "v": "expert",
              "fb": "Correct: wildfire behavior joins combustion, fuel, terrain, weather, exposure, and operational timing."
            },
            {
              "t": "Richard Rothermel contributed to the fire-spread model, but the account measures current weather while leaving fuels, structures, and treatment history incomplete. Support across the wildfire history stays partial.",
              "v": "partial",
              "fb": "Weather is essential, but the same weather produces different outcomes across different fuels and built environments."
            },
            {
              "t": "Richard Rothermel is portrayed as treating the ignition source as a complete explanation for later spread, spotting, and community loss. The spread mechanism contradicts that. The fire record points beyond ignition.",
              "v": "wrong",
              "fb": "Ignition starts the event; fuel continuity, wind, spotting, and vulnerability shape the disaster that follows."
            },
            {
              "t": "Richard Rothermel is invoked to delay evacuation and fuel action because no model can predict the fire’s exact future perimeter. Delay consumes the evacuation margin. Under the wildfire history, warning is postponed.",
              "v": "danger",
              "fb": "Decisions use thresholds and margins precisely because exact fire growth does not be forecast in real time."
            }
          ]
        },
        {
          "q": "What operational choice follows the fire-science method?",
          "o": [
            {
              "t": "For the fire environment, apply this procedure: describe fuel load, particle size, moisture, packing, wind, and slope, then calculate the balance driving a propagating flame front.",
              "v": "expert",
              "fb": "Correct: wildfire behavior joins combustion, fuel, terrain, weather, exposure, and operational timing."
            },
            {
              "t": "Update wind and humidity, but omit fuel continuity, topographic channeling, home ignition, spotting, and trigger-point timing. Support across the wildfire history stays partial.",
              "v": "partial",
              "fb": "Weather is essential, but the same weather produces different outcomes across different fuels and built environments."
            },
            {
              "t": "Infer suppression success from the first line holding, without accounting for embers, crown transition, or deteriorating road access. Within the wildfire history, no support appears.",
              "v": "wrong",
              "fb": "Ignition starts the event; fuel continuity, wind, spotting, and vulnerability shape the disaster that follows."
            },
            {
              "t": "Protect the preferred operating plan, postpone warning until spread is certain, and call every missed threshold extraordinary weather. Uncertainty postpones the primarily choices.",
              "v": "danger",
              "fb": "Decisions use thresholds and margins precisely because exact fire growth does not be forecast in real time."
            }
          ]
        },
        {
          "q": "Which wildfire conclusion is most responsible?",
          "o": [
            {
              "t": "The wildfire lesson is that a widely used model remains conditional because heterogeneous fuels, spotting, and extreme winds can move behavior beyond its assumptions.",
              "v": "expert",
              "fb": "Correct: wildfire behavior joins combustion, fuel, terrain, weather, exposure, and operational timing."
            },
            {
              "t": "Extreme weather dominates enough that deferred treatment and delayed movement can be treated as secondary administrative details. Structure ignition is still untested.",
              "v": "partial",
              "fb": "Weather is essential, but the same weather produces different outcomes across different fuels and built environments."
            },
            {
              "t": "Finding an ignition source fully explains the disaster even when fuel arrangement and exposure determine how the event grows. The spread mechanism contradicts that, in use.",
              "v": "wrong",
              "fb": "Ignition starts the event; fuel continuity, wind, spotting, and vulnerability shape the disaster that follows."
            },
            {
              "t": "The loss is likely to be coordinated arson or an unstoppable firestorm, excluding accumulated fuels and a preventable delay. Inside the wildfire history, drama displaces testing.",
              "v": "danger",
              "fb": "Decisions use thresholds and margins precisely because exact fire growth does not be forecast in real time."
            }
          ]
        }
      ]
    },
    "biswell": {
      "sci": "Harold Biswell (1905-1992)",
      "topic": "Prescribed burning & fuel management",
      "lede": "Flame behavior became an engineering quantity in Harold Biswell’s work on prescribed burning and fuel management.",
      "no": 6,
      "profile": "Today’s fire-science bulletin examines Harold Biswell through prescribed burning and fuel management. Harold Biswell demonstrated and taught prescribed burning as a tool for reducing hazardous fuels and restoring fire-adapted ecosystems in California. Wildfire behavior emerges from combustion, fuel arrangement, moisture, terrain, wind, and the fire’s own heat. Biswell’s contribution makes one of those mechanisms measurable. The same ignition can remain small, run through surface fuels, or transition into crown and structure fire as conditions cross thresholds.\n\nThe operational practice is to select a burn window, prepare boundaries, specify objectives, monitor weather and smoke, and evaluate fuel reduction after the burn. Analysts should state fuel type and treatment history, measure current moisture and weather, examine slope and wind channeling, and compare predictions with observed spread. Evacuation and suppression decisions should be tied to trigger points that remain usable when communications and visibility degrade.\n\nExtreme weather matters, but landscapes also carry accumulated management choices. Dense surface and ladder fuels can connect a flame front to the canopy; vulnerable roofs and nearby vegetation can convert embers into structure loss. Preparedness therefore combines fuel work, building measures, detection, warning, and timely movement of people.\n\nThe fire lesson is planned fire carries risk, but excluding every low-intensity fire can accumulate fuels that support far more destructive burning. Risk is reduced by acting on fuels and exposure before a fast-moving incident removes the available choices. Prescribed fire should be evaluated against explicit ecological and hazard objectives rather than treated as burning for its own sake. A line on a map is not a barrier when wind-driven embers can establish new fires well beyond it.",
      "frame": "Pauses the radio log at the first spot fire. \"The front was no longer the only fire. Show me what prescribed burning and fuel management predicts.\"",
      "q": [
        {
          "q": "Which fire-science account best captures Harold Biswell’s contribution to prescribed burning and fuel management?",
          "o": [
            {
              "t": "Harold Biswell demonstrated and taught prescribed burning as a tool for reducing hazardous fuels and restoring fire-adapted ecosystems in California. Fuel and exposure stay connected.",
              "v": "expert",
              "fb": "Correct: wildfire behavior joins combustion, fuel, terrain, weather, exposure, and operational timing."
            },
            {
              "t": "Harold Biswell contributed to prescribed burning and fuel management, but the account measures current weather while leaving fuels, structures, and treatment history incomplete.",
              "v": "partial",
              "fb": "Weather is essential, but the same weather produces different outcomes across different fuels and built environments."
            },
            {
              "t": "Harold Biswell is portrayed as treating the ignition source as a complete explanation for later spread, spotting, and community loss. The spread mechanism contradicts that.",
              "v": "wrong",
              "fb": "Ignition starts the event; fuel continuity, wind, spotting, and vulnerability shape the disaster that follows."
            },
            {
              "t": "Harold Biswell is invoked to delay evacuation and fuel action because no model can predict the fire’s exact future perimeter. Under the wildfire history, warning is postponed.",
              "v": "danger",
              "fb": "Decisions use thresholds and margins precisely because exact fire growth does not be forecast in real time."
            }
          ]
        },
        {
          "q": "What operational choice follows the fire-science method?",
          "o": [
            {
              "t": "For the fire environment, apply this procedure: select a burn window, prepare boundaries, specify objectives, monitor weather and smoke, and evaluate fuel reduction after the burn.",
              "v": "expert",
              "fb": "Correct: wildfire behavior joins combustion, fuel, terrain, weather, exposure, and operational timing."
            },
            {
              "t": "Update wind and humidity, but omit fuel continuity, topographic channeling, home ignition, spotting, and trigger-point timing. Support across the wildfire history stays partial.",
              "v": "partial",
              "fb": "Weather is essential, but the same weather produces different outcomes across different fuels and built environments."
            },
            {
              "t": "Infer suppression success from the first line holding, without accounting for embers, crown transition, or deteriorating road access. Within the wildfire history, no support appears.",
              "v": "wrong",
              "fb": "Ignition starts the event; fuel continuity, wind, spotting, and vulnerability shape the disaster that follows."
            },
            {
              "t": "Protect the preferred operating plan, postpone warning until spread is certain, and call every missed threshold extraordinary weather. Uncertainty postpones the primarily choices.",
              "v": "danger",
              "fb": "Decisions use thresholds and margins precisely because exact fire growth does not be forecast in real time."
            }
          ]
        },
        {
          "q": "Which wildfire conclusion is most responsible?",
          "o": [
            {
              "t": "The wildfire lesson is that planned fire carries risk, but excluding every low-intensity fire can accumulate fuels that support far more destructive burning. The wildfire history keeps assumptions explicit, in use.",
              "v": "expert",
              "fb": "Correct: wildfire behavior joins combustion, fuel, terrain, weather, exposure, and operational timing."
            },
            {
              "t": "Extreme weather dominates enough that deferred treatment and delayed movement can be treated as secondary administrative details. The landscape history remains incomplete. Structure ignition is still untested, in use.",
              "v": "partial",
              "fb": "Weather is essential, but the same weather produces different outcomes across different fuels and built environments."
            },
            {
              "t": "Finding an ignition source fully explains the disaster even when fuel arrangement and exposure determine how the event grows. The spread mechanism contradicts that. The fire record points beyond ignition, in use.",
              "v": "wrong",
              "fb": "Ignition starts the event; fuel continuity, wind, spotting, and vulnerability shape the disaster that follows."
            },
            {
              "t": "The loss is likely to be coordinated arson or an unstoppable firestorm, excluding accumulated fuels and a preventable delay. Uncertainty postpones the primarily choices. Inside the wildfire history, drama displaces testing.",
              "v": "danger",
              "fb": "Decisions use thresholds and margins precisely because exact fire growth does not be forecast in real time."
            }
          ]
        }
      ]
    },
    "pyne": {
      "sci": "Stephen Pyne (b. 1949)",
      "topic": "The history of wildfire",
      "lede": "Stephen Pyne turned the history of wildfire into measurable relationships among heat, fuel, air, and terrain.",
      "no": 7,
      "profile": "Today’s fire-science bulletin examines Stephen Pyne through the history of wildfire. Stephen Pyne has written a global history of humanity's use and suppression of fire, interpreting wildfire as both a natural process and a cultural choice. Wildfire behavior emerges from combustion, fuel arrangement, moisture, terrain, wind, and the fire’s own heat. Pyne’s contribution makes one of those mechanisms measurable. The same ignition can remain small, run through surface fuels, or transition into crown and structure fire as conditions cross thresholds.\n\nThe operational practice is to place fire regimes within land use, institutions, technology, settlement, and climate rather than treating each event as isolated weather. Analysts should state fuel type and treatment history, measure current moisture and weather, examine slope and wind channeling, and compare predictions with observed spread. Evacuation and suppression decisions should be tied to trigger points that remain usable when communications and visibility degrade.\n\nExtreme weather matters, but landscapes also carry accumulated management choices. Dense surface and ladder fuels can connect a flame front to the canopy; vulnerable roofs and nearby vegetation can convert embers into structure loss. Preparedness therefore combines fuel work, building measures, detection, warning, and timely movement of people.\n\nThe fire lesson is catastrophic fire reflects accumulated decisions about landscapes as well as the conditions on the day it burns. Risk is reduced by acting on fuels and exposure before a fast-moving incident removes the available choices. Delayed evacuation competes with smoke, falling power lines, congestion, and rapidly narrowing road access. Prescribed fire should be evaluated against explicit ecological and hazard objectives rather than treated as burning for its own sake.",
      "frame": "Lays a fuel map over the wind trace. \"At The Forest District Office, the flame followed both. Explain the history of wildfire.\"",
      "q": [
        {
          "q": "Which fire-science account best captures Stephen Pyne’s contribution to the history of wildfire?",
          "o": [
            {
              "t": "Stephen Pyne has written a global history of humanity's use and suppression of fire, interpreting wildfire as both a natural process and a cultural choice. The wildfire history lets later reviewers reconstruct events.",
              "v": "expert",
              "fb": "Correct: wildfire behavior joins combustion, fuel, terrain, weather, exposure, and operational timing."
            },
            {
              "t": "Stephen Pyne contributed to the history of wildfire, but the account measures current weather while leaving fuels, structures, and treatment history incomplete. Support across the wildfire history stays partial.",
              "v": "partial",
              "fb": "Weather is essential, but the same weather produces different outcomes across different fuels and built environments."
            },
            {
              "t": "Stephen Pyne is portrayed as treating the ignition source as a complete explanation for later spread, spotting, and community loss. The spread mechanism contradicts that. The fire record points beyond ignition.",
              "v": "wrong",
              "fb": "Ignition starts the event; fuel continuity, wind, spotting, and vulnerability shape the disaster that follows."
            },
            {
              "t": "Stephen Pyne is invoked to delay evacuation and fuel action because no model can predict the fire’s exact future perimeter. Delay consumes the evacuation margin. Under the wildfire history, warning is postponed.",
              "v": "danger",
              "fb": "Decisions use thresholds and margins precisely because exact fire growth does not be forecast in real time."
            }
          ]
        },
        {
          "q": "What operational choice follows the fire-science method?",
          "o": [
            {
              "t": "For the fire environment, apply this procedure: place fire regimes within land use, institutions, technology, settlement, and climate rather than treating each event as isolated weather. Fuel and exposure stay connected.",
              "v": "expert",
              "fb": "Correct: wildfire behavior joins combustion, fuel, terrain, weather, exposure, and operational timing."
            },
            {
              "t": "Update wind and humidity, but omit fuel continuity, topographic channeling, home ignition, spotting, and trigger-point timing. Structure ignition is still untested. Support across the wildfire history stays partial.",
              "v": "partial",
              "fb": "Weather is essential, but the same weather produces different outcomes across different fuels and built environments."
            },
            {
              "t": "Infer suppression success from the first line holding, without accounting for embers, crown transition, or deteriorating road access. The spread mechanism contradicts that. Within the wildfire history, no support appears.",
              "v": "wrong",
              "fb": "Ignition starts the event; fuel continuity, wind, spotting, and vulnerability shape the disaster that follows."
            },
            {
              "t": "Protect the preferred operating plan, postpone warning until spread is certain, and call every missed threshold extraordinary weather. Delay consumes the evacuation margin. Uncertainty postpones the primarily choices.",
              "v": "danger",
              "fb": "Decisions use thresholds and margins precisely because exact fire growth does not be forecast in real time."
            }
          ]
        },
        {
          "q": "Which wildfire conclusion is most responsible?",
          "o": [
            {
              "t": "The wildfire lesson is that catastrophic fire reflects accumulated decisions about landscapes as well as the conditions on the day it burns. Fuel and exposure stay connected, in use.",
              "v": "expert",
              "fb": "Correct: wildfire behavior joins combustion, fuel, terrain, weather, exposure, and operational timing."
            },
            {
              "t": "Extreme weather dominates enough that deferred treatment and delayed movement can be treated as secondary administrative details. The landscape history remains incomplete, in use.",
              "v": "partial",
              "fb": "Weather is essential, but the same weather produces different outcomes across different fuels and built environments."
            },
            {
              "t": "Finding an ignition source fully explains the disaster even when fuel arrangement and exposure determine how the event grows. The wildfire history defeats that inference, in use.",
              "v": "wrong",
              "fb": "Ignition starts the event; fuel continuity, wind, spotting, and vulnerability shape the disaster that follows."
            },
            {
              "t": "The loss is likely to be coordinated arson or an unstoppable firestorm, excluding accumulated fuels and a preventable delay. Within the wildfire history, assumption replaces verification.",
              "v": "danger",
              "fb": "Decisions use thresholds and margins precisely because exact fire growth does not be forecast in real time."
            }
          ]
        }
      ]
    },
    "fwilliams": {
      "sci": "Forman Williams (b. 1934)",
      "topic": "Combustion theory",
      "lede": "Forman Williams connected combustion theory to decisions made before a fire crosses its next threshold.",
      "no": 8,
      "profile": "Today’s fire-science bulletin examines Forman Williams through combustion theory. Forman Williams made broad contributions to combustion theory, including flame structure, ignition, extinction, and reacting-flow modeling. Wildfire behavior emerges from combustion, fuel arrangement, moisture, terrain, wind, and the fire’s own heat. Williams’s contribution makes one of those mechanisms measurable. The same ignition can remain small, run through surface fuels, or transition into crown and structure fire as conditions cross thresholds.\n\nThe operational practice is to couple chemical kinetics with fluid flow and heat transfer, simplify only after identifying the controlling scales, and compare theory with experiments. Analysts should state fuel type and treatment history, measure current moisture and weather, examine slope and wind channeling, and compare predictions with observed spread. Evacuation and suppression decisions should be tied to trigger points that remain usable when communications and visibility degrade.\n\nExtreme weather matters, but landscapes also carry accumulated management choices. Dense surface and ladder fuels can connect a flame front to the canopy; vulnerable roofs and nearby vegetation can convert embers into structure loss. Preparedness therefore combines fuel work, building measures, detection, warning, and timely movement of people.\n\nThe fire lesson is combustion models are most useful when simplifications preserve the mechanism governing the regime of interest. Risk is reduced by acting on fuels and exposure before a fast-moving incident removes the available choices. A line on a map is not a barrier when wind-driven embers can establish new fires well beyond it. Delayed evacuation competes with smoke, falling power lines, congestion, and rapidly narrowing road access.",
      "frame": "Opens an unsigned treatment plan. \"Before smoke erased the choices, tell me how combustion theory should guide them.\"",
      "q": [
        {
          "q": "Which fire-science account best captures Forman Williams’s contribution to combustion theory?",
          "o": [
            {
              "t": "Forman Williams made broad contributions to combustion theory, including flame structure, ignition, extinction, and reacting-flow modeling. Fuel and exposure stay connected. The wildfire history keeps assumptions explicit.",
              "v": "expert",
              "fb": "Correct: wildfire behavior joins combustion, fuel, terrain, weather, exposure, and operational timing."
            },
            {
              "t": "Forman Williams contributed to combustion theory, but the account measures current weather while leaving fuels, structures, and treatment history incomplete. The wildfire history leaves an assumption unresolved.",
              "v": "partial",
              "fb": "Weather is essential, but the same weather produces different outcomes across different fuels and built environments."
            },
            {
              "t": "Forman Williams is portrayed as treating the ignition source as a complete explanation for later spread, spotting, and community loss. The spread mechanism contradicts that. The fire record points beyond ignition.",
              "v": "wrong",
              "fb": "Ignition starts the event; fuel continuity, wind, spotting, and vulnerability shape the disaster that follows."
            },
            {
              "t": "Forman Williams is invoked to delay evacuation and fuel action because no model can predict the fire’s exact future perimeter. Delay consumes the evacuation margin. Under the wildfire history, warning is postponed.",
              "v": "danger",
              "fb": "Decisions use thresholds and margins precisely because exact fire growth does not be forecast in real time."
            }
          ]
        },
        {
          "q": "What operational choice follows the fire-science method?",
          "o": [
            {
              "t": "For the fire environment, apply this procedure: couple chemical kinetics with fluid flow and heat transfer, simplify only after identifying the controlling scales, and compare theory with experiments, in use.",
              "v": "expert",
              "fb": "Correct: wildfire behavior joins combustion, fuel, terrain, weather, exposure, and operational timing."
            },
            {
              "t": "Update wind and humidity, but omit fuel continuity, topographic channeling, home ignition, spotting, and trigger-point timing. The landscape history remains incomplete. Structure ignition is still untested.",
              "v": "partial",
              "fb": "Weather is essential, but the same weather produces different outcomes across different fuels and built environments."
            },
            {
              "t": "Infer suppression success from the first line holding, without accounting for embers, crown transition, or deteriorating road access. The spread mechanism contradicts that. The fire record points beyond ignition.",
              "v": "wrong",
              "fb": "Ignition starts the event; fuel continuity, wind, spotting, and vulnerability shape the disaster that follows."
            },
            {
              "t": "Protect the preferred operating plan, postpone warning until spread is certain, and call every missed threshold extraordinary weather. Delay consumes the evacuation margin. Uncertainty postpones the primarily choices.",
              "v": "danger",
              "fb": "Decisions use thresholds and margins precisely because exact fire growth does not be forecast in real time."
            }
          ]
        },
        {
          "q": "Which wildfire conclusion is most responsible?",
          "o": [
            {
              "t": "The wildfire lesson is that combustion models are most useful when simplifications preserve the mechanism governing the regime of interest. Fuel and exposure stay connected, in use.",
              "v": "expert",
              "fb": "Correct: wildfire behavior joins combustion, fuel, terrain, weather, exposure, and operational timing."
            },
            {
              "t": "Extreme weather dominates enough that deferred treatment and delayed movement can be treated as secondary administrative details. The landscape history remains incomplete, in use.",
              "v": "partial",
              "fb": "Weather is essential, but the same weather produces different outcomes across different fuels and built environments."
            },
            {
              "t": "Finding an ignition source fully explains the disaster even when fuel arrangement and exposure determine how the event grows. The wildfire history defeats that inference, in use.",
              "v": "wrong",
              "fb": "Ignition starts the event; fuel continuity, wind, spotting, and vulnerability shape the disaster that follows."
            },
            {
              "t": "The loss is likely to be coordinated arson or an unstoppable firestorm, excluding accumulated fuels and a preventable delay. Within the wildfire history, assumption replaces verification.",
              "v": "danger",
              "fb": "Decisions use thresholds and margins precisely because exact fire growth does not be forecast in real time."
            }
          ]
        }
      ]
    },
    "quintiere": {
      "sci": "James Quintiere (fire scientist)",
      "topic": "Flame spread & fire growth",
      "lede": "Flame behavior became an engineering quantity in James Quintiere’s work on flame spread and fire growth.",
      "no": 9,
      "profile": "Today’s fire-science bulletin examines James Quintiere through flame spread and fire growth. James Quintiere advanced quantitative study of flame spread, fire growth, heat flux, and the use of engineering models in fire safety. Wildfire behavior emerges from combustion, fuel arrangement, moisture, terrain, wind, and the fire’s own heat. Quintiere’s contribution makes one of those mechanisms measurable. The same ignition can remain small, run through surface fuels, or transition into crown and structure fire as conditions cross thresholds.\n\nThe operational practice is to measure ignition time and spread under known heat exposure, derive material response, and scale cautiously to compartments or structures. Analysts should state fuel type and treatment history, measure current moisture and weather, examine slope and wind channeling, and compare predictions with observed spread. Evacuation and suppression decisions should be tied to trigger points that remain usable when communications and visibility degrade.\n\nExtreme weather matters, but landscapes also carry accumulated management choices. Dense surface and ladder fuels can connect a flame front to the canopy; vulnerable roofs and nearby vegetation can convert embers into structure loss. Preparedness therefore combines fuel work, building measures, detection, warning, and timely movement of people.\n\nThe fire lesson is material tests become misleading when their heat exposure, orientation, or ventilation differs from the intended application. Risk is reduced by acting on fuels and exposure before a fast-moving incident removes the available choices. Prescribed fire should be evaluated against explicit ecological and hazard objectives rather than treated as burning for its own sake. A line on a map is not a barrier when wind-driven embers can establish new fires well beyond it.",
      "frame": "Pauses the radio log at the first spot fire. \"The front was no longer the only fire. Show me what flame spread and fire growth predicts.\"",
      "q": [
        {
          "q": "Which fire-science account best captures James Quintiere’s contribution to flame spread and fire growth?",
          "o": [
            {
              "t": "James Quintiere advanced quantitative study of flame spread, fire growth, heat flux, and the use of engineering models in fire safety. Fuel and exposure stay connected. The wildfire history keeps assumptions explicit.",
              "v": "expert",
              "fb": "Correct: wildfire behavior joins combustion, fuel, terrain, weather, exposure, and operational timing."
            },
            {
              "t": "James Quintiere contributed to flame spread and fire growth, but the account measures current weather while leaving fuels, structures, and treatment history incomplete. The landscape history remains incomplete.",
              "v": "partial",
              "fb": "Weather is essential, but the same weather produces different outcomes across different fuels and built environments."
            },
            {
              "t": "James Quintiere is portrayed as treating the ignition source as a complete explanation for later spread, spotting, and community loss. The spread mechanism contradicts that. The fire record points beyond ignition.",
              "v": "wrong",
              "fb": "Ignition starts the event; fuel continuity, wind, spotting, and vulnerability shape the disaster that follows."
            },
            {
              "t": "James Quintiere is invoked to delay evacuation and fuel action because no model can predict the fire’s exact future perimeter. Delay consumes the evacuation margin. Under the wildfire history, warning is postponed.",
              "v": "danger",
              "fb": "Decisions use thresholds and margins precisely because exact fire growth does not be forecast in real time."
            }
          ]
        },
        {
          "q": "What operational choice follows the fire-science method?",
          "o": [
            {
              "t": "For the fire environment, apply this procedure: measure ignition time and spread under known heat exposure, derive material response, and scale cautiously to compartments or structures.",
              "v": "expert",
              "fb": "Correct: wildfire behavior joins combustion, fuel, terrain, weather, exposure, and operational timing."
            },
            {
              "t": "Update wind and humidity, but omit fuel continuity, topographic channeling, home ignition, spotting, and trigger-point timing. The wildfire history leaves an assumption unresolved.",
              "v": "partial",
              "fb": "Weather is essential, but the same weather produces different outcomes across different fuels and built environments."
            },
            {
              "t": "Infer suppression success from the first line holding, without accounting for embers, crown transition, or deteriorating road access. Under the wildfire history, direct comparison fails.",
              "v": "wrong",
              "fb": "Ignition starts the event; fuel continuity, wind, spotting, and vulnerability shape the disaster that follows."
            },
            {
              "t": "Protect the preferred operating plan, postpone warning until spread is certain, and call every missed threshold extraordinary weather. Under the wildfire history, warning is postponed.",
              "v": "danger",
              "fb": "Decisions use thresholds and margins precisely because exact fire growth does not be forecast in real time."
            }
          ]
        },
        {
          "q": "Which wildfire conclusion is most responsible?",
          "o": [
            {
              "t": "The wildfire lesson is that material tests become misleading when their heat exposure, orientation, or ventilation differs from the intended application. The wildfire history keeps assumptions explicit, on site.",
              "v": "expert",
              "fb": "Correct: wildfire behavior joins combustion, fuel, terrain, weather, exposure, and operational timing."
            },
            {
              "t": "Extreme weather dominates enough that deferred treatment and delayed movement can be treated as secondary administrative details. The landscape history remains incomplete. Structure ignition is still untested, in use.",
              "v": "partial",
              "fb": "Weather is essential, but the same weather produces different outcomes across different fuels and built environments."
            },
            {
              "t": "Finding an ignition source fully explains the disaster even when fuel arrangement and exposure determine how the event grows. The spread mechanism contradicts that. The fire record points beyond ignition, in use.",
              "v": "wrong",
              "fb": "Ignition starts the event; fuel continuity, wind, spotting, and vulnerability shape the disaster that follows."
            },
            {
              "t": "The loss is likely to be coordinated arson or an unstoppable firestorm, excluding accumulated fuels and a preventable delay. Uncertainty postpones the primarily choices. Inside the wildfire history, drama displaces testing.",
              "v": "danger",
              "fb": "Decisions use thresholds and margins precisely because exact fire growth does not be forecast in real time."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "lookout": {
      "ridge": "Lookout Wren unfolds the darkened fuel map within the ridge & fuel breaks. \"Spotted the first smoke; watched the brush no one had cleared catch and run. The first flame mattered, but so did everything available to burn and every minute before the roads closed.\"",
      "firecamp": "Lookout Wren unfolds the darkened fuel map within the incident command post. \"Spotted the first smoke; watched the brush no one had cleared catch and run. The first flame mattered, but so did everything available to burn and every minute before the roads closed.\"",
      "office": "Lookout Wren unfolds the darkened fuel map within the forest district office. \"Spotted the first smoke; watched the brush no one had cleared catch and run. The first flame mattered, but so did everything available to burn and every minute before the roads closed.\""
    },
    "dispatcher": {
      "ridge": "The Dispatcher unfolds the darkened fuel map within the ridge & fuel breaks. \"Ran the radios; the evacuation call was held while the fire jumped the line. The first flame mattered, but so did everything available to burn and every minute before the roads closed.\"",
      "firecamp": "The Dispatcher unfolds the darkened fuel map within the incident command post. \"Ran the radios; the evacuation call was held while the fire jumped the line. The first flame mattered, but so did everything available to burn and every minute before the roads closed.\"",
      "office": "The Dispatcher unfolds the darkened fuel map within the forest district office. \"Ran the radios; the evacuation call was held while the fire jumped the line. The first flame mattered, but so did everything available to burn and every minute before the roads closed.\""
    },
    "clerk": {
      "ridge": "The Clerk unfolds the darkened fuel map within the ridge & fuel breaks. \"Keeps the burn plans — and the fuel-reduction work that was cut from the budget. The first flame mattered, but so did everything available to burn and every minute before the roads closed.\"",
      "firecamp": "The Clerk unfolds the darkened fuel map within the incident command post. \"Keeps the burn plans — and the fuel-reduction work that was cut from the budget. The first flame mattered, but so did everything available to burn and every minute before the roads closed.\"",
      "office": "The Clerk unfolds the darkened fuel map within the forest district office. \"Keeps the burn plans — and the fuel-reduction work that was cut from the budget. The first flame mattered, but so did everything available to burn and every minute before the roads closed.\""
    }
  },
  "story": [
    "<b>The Pinehaven Fire</b> begins inside the Pinehaven wildfire inquiry, where the first explanation is already spreading faster than the evidence.",
    "<b>Lookout Wren</b>, <b>The Dispatcher</b>, and <b>The Clerk</b> each hold a different part of the record, and each conversation opens with one real pioneer whose work changes how the evidence should be read.",
    "The inquiry keeps circling <b>A coordinated arson attack</b> and <b>A freak firestorm nothing could stop — an act of God</b>. Both are tempting, and neither can be accepted just because it makes the cleanest headline.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and make the final WHAT judgment from what you learned."
  ],
  "endings": {
    "overclaimWhat": "arson",
    "dismissalWhat": "freak",
    "win": {
      "expertTitle": "The Fire Had a Longer Fuse",
      "expert": [
        "You identify <b>Garrett Pyle — forest district fire chief</b>, locate the governing records in <b>The Forest District Office</b>, and establish <b>Deferred fuel clearing & a delayed evacuation order</b>. Not a coordinated arson attack. Not a freak firestorm nothing could stop — an act of god.",
        "Fuel-reduction work was repeatedly deferred, and the evacuation order was held as the fire crossed the available trigger points. The ignition source does not support coordinated attack, and extreme weather does not erase the choices that increased exposure and reduced escape time."
      ],
      "soundTitle": "Fuel and Warning Reconnected",
      "sound": [
        "Your accusation correctly joins <b>Garrett Pyle — forest district fire chief</b>, <b>The Forest District Office</b>, and <b>Deferred fuel clearing & a delayed evacuation order</b>. Treatment records and dispatch timing support the finding.",
        "Some fire-behavior details remain under reconstruction, but the district cannot describe the loss as wholly unavoidable after leaving the planned fuel work undone and delaying movement."
      ],
      "namedTitle": "The Deferred Plan",
      "named": [
        "You choose the correct answer: <b>Garrett Pyle — forest district fire chief</b>, <b>The Forest District Office</b>, and <b>Deferred fuel clearing & a delayed evacuation order</b>.",
        "The explanation needs fuller modeling, but the budget cuts, untreated corridor, and delayed order now define the inquiry’s next steps."
      ]
    },
    "overclaim": {
      "title": "Arson as the Whole Fire",
      "body": [
        "You choose <b>A coordinated arson attack</b>, making the point of ignition substitute for the fuel and evacuation history.",
        "The coordinated plot lacks evidence, and its failure discredits scrutiny of the conditions that made one flame catastrophic. A preventable exposure becomes entangled with an unsupported criminal theory."
      ]
    },
    "dismissal": {
      "title": "Weather Cannot Sign a Delay",
      "body": [
        "Under <b>A freak firestorm nothing could stop — an act of God</b>, your report treats extreme fire behavior as proof that fuel work and evacuation timing could not change consequences.",
        "That answer confuses inability to stop every flame with inability to reduce loss. It leaves the same treatment backlog and decision thresholds in place for the next wind event."
      ]
    },
    "wrongNames": {
      "title": "The Failure Found, the Chief Misplaced",
      "body": [
        "You recognize <b>Deferred fuel clearing & a delayed evacuation order</b>, but blame the analyst or sheriff rather than the official responsible for district treatment and evacuation policy. The office records lead instead to"
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A wildfire crossing a ridge toward a town\"><path d=\"M0 102 C100 64,190 82,286 58 S472 72,660 44\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.6\"/><path d=\"M196 86 C182 68,188 54,202 40 C204 54,222 62,214 84\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2\"/><path d=\"M238 78 C224 62,230 50,244 34 C246 50,264 58,256 80\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2\"/><path d=\"M490 82 L514 60 L538 82 Z M550 82 L574 58 L598 82 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.4\"/><path d=\"M72 28 C136 20,196 24,250 36\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/></svg>"
}};
