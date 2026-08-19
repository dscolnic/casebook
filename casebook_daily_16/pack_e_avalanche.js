module.exports = { PACK: {
  "id": "e_avalanche",
  "title": "The Whitewall Slide",
  "discipline": "Snow, Avalanche & Glacier Science",
  "teaser": "A wall of snow buried a packed resort run at noon. A charge set off on purpose? A slide no one could have called? Or a snowpack watched, warned about, and skied anyway?",
  "overclaimTag": "a deliberate blast",
  "truthTag": "ignored snowpack warnings",
  "venue": "the Whitewall avalanche inquiry",
  "agent": {
    "name": "Investigator Lena Harkness",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Snow & Avalanche Pioneers",
  "dossierName": "SNOW & AVALANCHE PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Whitewall avalanche inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The WHERE you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "A deliberate blast is memorable; the mountain deserves a full chronology before intent is assigned.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "manager",
      "items": [
        {
          "id": "manager",
          "label": "Kurt Halden — resort operations manager"
        },
        {
          "id": "forecaster",
          "label": "The avalanche forecaster"
        },
        {
          "id": "patrol",
          "label": "The ski-patrol director"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "office",
      "items": [
        {
          "id": "slope",
          "label": "The Slope & Start Zone"
        },
        {
          "id": "patrolhut",
          "label": "The Patrol & Forecast Hut"
        },
        {
          "id": "office",
          "label": "The Resort Management Office"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "kept",
      "items": [
        {
          "id": "blast",
          "label": "A charge set off deliberately"
        },
        {
          "id": "freak",
          "label": "A freak slide beyond any warning — an act of God"
        },
        {
          "id": "kept",
          "label": "Ignored snowpack monitoring & a slope kept open"
        }
      ]
    }
  },
  "PLACES": {
    "slope": {
      "name": "The Slope & Start Zone",
      "xy": [
        140,
        90
      ]
    },
    "patrolhut": {
      "name": "The Patrol & Forecast Hut",
      "xy": [
        330,
        240
      ]
    },
    "office": {
      "name": "The Resort Management Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "slope",
      "patrolhut"
    ],
    [
      "patrolhut",
      "office"
    ]
  ],
  "CHARACTERS": {
    "patroller": {
      "name": "Patroller Sten",
      "role": "Ski-patrol observer",
      "face": "⛷",
      "badge": "S",
      "legend": "the start zone",
      "hint": "Dug the snow pits; the weak layer was there and shouting for days."
    },
    "snowforecaster": {
      "name": "The Snow Forecaster",
      "role": "Avalanche forecaster",
      "face": "🏔",
      "badge": "F",
      "legend": "the forecast hut",
      "hint": "Wrote the hazard bulletins; the high rating was overruled to keep the run open."
    },
    "clerk": {
      "name": "The Clerk",
      "role": "Resort-office clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Keeps the closure logs — and the order that reopened the slope early."
    }
  },
  "TOPICMAP": {
    "slope": {
      "patroller": [
        "agassiz"
      ],
      "snowforecaster": [
        "tyndall"
      ],
      "clerk": [
        "paulcke"
      ]
    },
    "patrolhut": {
      "patroller": [
        "voellmy"
      ],
      "snowforecaster": [
        "roch"
      ],
      "clerk": [
        "dequervain"
      ]
    },
    "office": {
      "patroller": [
        "weertman"
      ],
      "snowforecaster": [
        "perla"
      ],
      "clerk": [
        "mcclung"
      ]
    }
  },
  "TOPICS": {
    "agassiz": {
      "sci": "Louis Agassiz (1807-1873)",
      "topic": "Glaciers & the ice age",
      "lede": "Louis Agassiz read glaciers and the ice age in layers, motion, terrain, and measurements repeated through changing weather.",
      "no": 1,
      "profile": "Today’s mountain-science letter introduces Louis Agassiz through glaciers and the ice age. Louis Agassiz argued that glaciers had once covered much larger regions and studied moving ice closely from a hut on the Aar Glacier. Snow records weather as structure: each storm, wind event, warm spell, and cold gradient changes grains and bonds before the layer is buried. Agassiz’s work provides a way to observe that history or model how it moves. The result is not perfect prediction but a better account of where uncertainty is concentrated.\n\nThe field method is to map moraines and striations, compare modern glacier processes with ancient landforms, and use multiple traces to reconstruct former ice extent. Observers should connect measurements to aspect, elevation, slope angle, recent loading, temperature, wind, and signs of natural activity. A pit describes one location; a forecast combines many locations with weather history and terrain consequences.\n\nAvalanche decisions are made before the slope supplies complete evidence. Weak layers may be patchy, tests may vary over meters, and a skier can trigger a crack from a thinner point. That is why hazard ratings, closures, route selection, and conservative margins exist: they convert incomplete but serious evidence into action.\n\nThe mountain lesson is large environmental conclusions become persuasive when present processes explain several independent marks left on the landscape. Snow safety depends on repeated observation and decisions that respect uncertainty before release begins. A terrain trap can make a modest slide unsurvivable by concentrating debris in a gully or against trees. Control work reduces specific hazards but cannot certify every pocket on a complex slope.",
      "frame": "Cuts a clean wall through the snow. \"At The Slope & Start Zone, every layer had weather before it had weight. Explain glaciers and the ice age.\"",
      "q": [
        {
          "q": "Which snow-science account best captures Louis Agassiz’s contribution to glaciers and the ice age?",
          "o": [
            {
              "t": "Louis Agassiz argued that glaciers had once covered much larger regions and studied moving ice closely from a hut on the Aar Glacier. Spatial uncertainty remains explicit. The hazard decision stays conservative.",
              "v": "expert",
              "fb": "Correct: avalanche science combines snow structure, weather history, terrain, and uncertainty across space."
            },
            {
              "t": "Louis Agassiz contributed to glaciers and the ice age, but the account generalizes one profile across aspects, elevations, loading patterns, and terrain. Support across the snowpack profile stays partial.",
              "v": "partial",
              "fb": "A snow pit is valuable local evidence, not a certificate for every part of a mountain."
            },
            {
              "t": "Louis Agassiz is portrayed as treating a quiet morning and one stable test as proof that a persistent weak layer does not release. The weak layer evidence persists. Quiet conditions do not establish stability.",
              "v": "wrong",
              "fb": "A lack of immediate natural activity does not establish a persistent weak layer does not be triggered."
            },
            {
              "t": "Louis Agassiz is invoked to keep terrain open because uncertainty prevents prediction of the exact trigger, location, and second of failure. Within the snowpack profile, assumption replaces verification.",
              "v": "danger",
              "fb": "Forecast uncertainty supports conservative decisions when consequences are high; it does not erase the warning."
            }
          ]
        },
        {
          "q": "Which field practice best applies the profile?",
          "o": [
            {
              "t": "On the mountain, use this field method: map moraines and striations, compare modern glacier processes with ancient landforms, and use multiple traces to reconstruct former ice extent.",
              "v": "expert",
              "fb": "Correct: avalanche science combines snow structure, weather history, terrain, and uncertainty across space."
            },
            {
              "t": "Dig a careful pit at one convenient site, but omit recent avalanche activity, wind loading, route consequences, and spatial variation. The snowpack profile leaves one test open.",
              "v": "partial",
              "fb": "A snow pit is valuable local evidence, not a certificate for every part of a mountain."
            },
            {
              "t": "Infer stability from the absence of natural releases while ignoring a buried weakness capable of propagating after a local trigger. Under the snowpack profile, direct comparison fails.",
              "v": "wrong",
              "fb": "A lack of immediate natural activity does not establish a persistent weak layer does not be triggered."
            },
            {
              "t": "Choose access first, downgrade the bulletin to preserve operations, and describe the unresolved warning as normal forecasting disagreement. Uncertainty is mistaken for safety.",
              "v": "danger",
              "fb": "Forecast uncertainty supports conservative decisions when consequences are high; it does not erase the warning."
            }
          ]
        },
        {
          "q": "Which avalanche conclusion is best supported?",
          "o": [
            {
              "t": "The snow-safety lesson is that large environmental conclusions become persuasive when present processes explain several independent marks left on the landscape. Spatial uncertainty remains explicit, in use.",
              "v": "expert",
              "fb": "Correct: avalanche science combines snow structure, weather history, terrain, and uncertainty across space."
            },
            {
              "t": "A local stability result can justify broad access while conflicting weather history and terrain evidence remain advisory details. Slope variation remains unmeasured. The weather history is incomplete, in use.",
              "v": "partial",
              "fb": "A snow pit is valuable local evidence, not a certificate for every part of a mountain."
            },
            {
              "t": "Uncertainty in release timing means the snowpack provides no actionable information until a slope actually avalanches. The weak layer evidence persists. Quiet conditions do not establish stability, in use.",
              "v": "wrong",
              "fb": "A lack of immediate natural activity does not establish a persistent weak layer does not be triggered."
            },
            {
              "t": "The slide is likely to reflect a deliberate blast or an unknowable act of God, excluding a monitored hazard and an operational choice. Access outranks the warning. Under the snowpack profile, warning is postponed.",
              "v": "danger",
              "fb": "Forecast uncertainty supports conservative decisions when consequences are high; it does not erase the warning."
            }
          ]
        }
      ]
    },
    "tyndall": {
      "sci": "John Tyndall (1820-1893)",
      "topic": "Glacier motion & regelation",
      "lede": "John Tyndall connected glacier motion and regelation to the physical history hidden inside ice and snow.",
      "no": 2,
      "profile": "Today’s mountain-science letter introduces John Tyndall through glacier motion and regelation. John Tyndall investigated glacier motion, pressure melting, and regelation, showing how ice can melt under pressure and refreeze when pressure is removed. Snow records weather as structure: each storm, wind event, warm spell, and cold gradient changes grains and bonds before the layer is buried. Tyndall’s work provides a way to observe that history or model how it moves. The result is not perfect prediction but a better account of where uncertainty is concentrated.\n\nThe field method is to combine field observations with controlled experiments on ice, distinguish fracture from flow, and test mechanisms against temperature and pressure. Observers should connect measurements to aspect, elevation, slope angle, recent loading, temperature, wind, and signs of natural activity. A pit describes one location; a forecast combines many locations with weather history and terrain consequences.\n\nAvalanche decisions are made before the slope supplies complete evidence. Weak layers may be patchy, tests may vary over meters, and a skier can trigger a crack from a thinner point. That is why hazard ratings, closures, route selection, and conservative margins exist: they convert incomplete but serious evidence into action.\n\nThe mountain lesson is a vivid laboratory mechanism should explain field-scale evidence before it is accepted as the whole account. Snow safety depends on repeated observation and decisions that respect uncertainty before release begins. Recent avalanches are direct evidence that the snowpack can fail under the current loading pattern. A terrain trap can make a modest slide unsurvivable by concentrating debris in a gully or against trees.",
      "frame": "Folds the hazard bulletin. \"The uncertainty was real; so was the warning. Start with glacier motion and regelation.\"",
      "q": [
        {
          "q": "Which snow-science account best captures John Tyndall’s contribution to glacier motion and regelation?",
          "o": [
            {
              "t": "John Tyndall investigated glacier motion, pressure melting, and regelation, showing how ice can melt under pressure and refreeze when pressure is removed. Spatial uncertainty remains explicit.",
              "v": "expert",
              "fb": "Correct: avalanche science combines snow structure, weather history, terrain, and uncertainty across space."
            },
            {
              "t": "John Tyndall contributed to glacier motion and regelation, but the account generalizes one profile across aspects, elevations, loading patterns, and terrain. The weather history is incomplete.",
              "v": "partial",
              "fb": "A snow pit is valuable local evidence, not a certificate for every part of a mountain."
            },
            {
              "t": "John Tyndall is portrayed as treating a quiet morning and one stable test as proof that a persistent weak layer does not release. Under the snowpack profile, direct comparison fails.",
              "v": "wrong",
              "fb": "A lack of immediate natural activity does not establish a persistent weak layer does not be triggered."
            },
            {
              "t": "John Tyndall is invoked to keep terrain open because uncertainty prevents prediction of the exact trigger, location, and second of failure. Under the snowpack profile, warning is postponed.",
              "v": "danger",
              "fb": "Forecast uncertainty supports conservative decisions when consequences are high; it does not erase the warning."
            }
          ]
        },
        {
          "q": "Which field practice best applies the profile?",
          "o": [
            {
              "t": "On the mountain, use this field method: combine field observations with controlled experiments on ice, distinguish fracture from flow, and test mechanisms against temperature and pressure. Spatial uncertainty remains explicit.",
              "v": "expert",
              "fb": "Correct: avalanche science combines snow structure, weather history, terrain, and uncertainty across space."
            },
            {
              "t": "Dig a careful pit at one convenient site, but omit recent avalanche activity, wind loading, route consequences, and spatial variation. Slope variation remains unmeasured. Support across the snowpack profile stays partial.",
              "v": "partial",
              "fb": "A snow pit is valuable local evidence, not a certificate for every part of a mountain."
            },
            {
              "t": "Infer stability from the absence of natural releases while ignoring a buried weakness capable of propagating after a local trigger. Within the snowpack profile, no support appears. The snowpack profile points to another result.",
              "v": "wrong",
              "fb": "A lack of immediate natural activity does not establish a persistent weak layer does not be triggered."
            },
            {
              "t": "Choose access first, downgrade the bulletin to preserve operations, and describe the unresolved warning as normal forecasting disagreement. Access outranks the warning. Inside the snowpack profile, drama displaces testing.",
              "v": "danger",
              "fb": "Forecast uncertainty supports conservative decisions when consequences are high; it does not erase the warning."
            }
          ]
        },
        {
          "q": "Which avalanche conclusion is best supported?",
          "o": [
            {
              "t": "The snow-safety lesson is that a vivid laboratory mechanism should explain field-scale evidence before it is accepted as the whole account. Spatial uncertainty remains explicit.",
              "v": "expert",
              "fb": "Correct: avalanche science combines snow structure, weather history, terrain, and uncertainty across space."
            },
            {
              "t": "A local stability result can justify broad access while conflicting weather history and terrain evidence remain advisory details. The snowpack profile leaves one test open, in use.",
              "v": "partial",
              "fb": "A snow pit is valuable local evidence, not a certificate for every part of a mountain."
            },
            {
              "t": "Uncertainty in release timing means the snowpack provides no actionable information until a slope actually avalanches. Under the snowpack profile, direct comparison fails, in use.",
              "v": "wrong",
              "fb": "A lack of immediate natural activity does not establish a persistent weak layer does not be triggered."
            },
            {
              "t": "The slide is likely to reflect a deliberate blast or an unknowable act of God, excluding a monitored hazard and an operational choice. Inside the snowpack profile, drama displaces testing.",
              "v": "danger",
              "fb": "Forecast uncertainty supports conservative decisions when consequences are high; it does not erase the warning."
            }
          ]
        }
      ]
    },
    "paulcke": {
      "sci": "Wilhelm Paulcke (1873-1949)",
      "topic": "The science of avalanches",
      "lede": "Mountain snow became measurable evidence in Wilhelm Paulcke’s work on the science of avalanches.",
      "no": 3,
      "profile": "Today’s mountain-science letter introduces Wilhelm Paulcke through the science of avalanches. Wilhelm Paulcke combined mountaineering experience with early systematic study of snow, avalanche formation, terrain, and safe travel. Snow records weather as structure: each storm, wind event, warm spell, and cold gradient changes grains and bonds before the layer is buried. Paulcke’s work provides a way to observe that history or model how it moves. The result is not perfect prediction but a better account of where uncertainty is concentrated.\n\nThe field method is to observe layering, weather history, slope angle, aspect, and recent loading while comparing incidents across similar terrain. Observers should connect measurements to aspect, elevation, slope angle, recent loading, temperature, wind, and signs of natural activity. A pit describes one location; a forecast combines many locations with weather history and terrain consequences.\n\nAvalanche decisions are made before the slope supplies complete evidence. Weak layers may be patchy, tests may vary over meters, and a skier can trigger a crack from a thinner point. That is why hazard ratings, closures, route selection, and conservative margins exist: they convert incomplete but serious evidence into action.\n\nThe mountain lesson is avalanches arise from interacting conditions, so one reassuring sign cannot cancel a dangerous combination. Snow safety depends on repeated observation and decisions that respect uncertainty before release begins. Control work reduces specific hazards but cannot certify every pocket on a complex slope. Recent avalanches are direct evidence that the snowpack can fail under the current loading pattern. A terrain trap can make a modest slide unsurvivable by concentrating debris in a gully or against trees.",
      "frame": "Marks a fracture line on the slope photograph. \"One pit is not a mountain. Show me how the science of avalanches travels across terrain.\"",
      "q": [
        {
          "q": "Which snow-science account best captures Wilhelm Paulcke’s contribution to the science of avalanches?",
          "o": [
            {
              "t": "Wilhelm Paulcke combined mountaineering experience with early systematic study of snow, avalanche formation, terrain, and safe travel. Spatial uncertainty remains explicit. The hazard decision stays conservative.",
              "v": "expert",
              "fb": "Correct: avalanche science combines snow structure, weather history, terrain, and uncertainty across space."
            },
            {
              "t": "Wilhelm Paulcke contributed to the science of avalanches, but the account generalizes one profile across aspects, elevations, loading patterns, and terrain. Support across the snowpack profile stays partial.",
              "v": "partial",
              "fb": "A snow pit is valuable local evidence, not a certificate for every part of a mountain."
            },
            {
              "t": "Wilhelm Paulcke is portrayed as treating a quiet morning and one stable test as proof that a persistent weak layer does not release. The weak layer evidence persists. Quiet conditions do not establish stability.",
              "v": "wrong",
              "fb": "A lack of immediate natural activity does not establish a persistent weak layer does not be triggered."
            },
            {
              "t": "Wilhelm Paulcke is invoked to keep terrain open because uncertainty prevents prediction of the exact trigger, location, and second of failure. Within the snowpack profile, assumption replaces verification.",
              "v": "danger",
              "fb": "Forecast uncertainty supports conservative decisions when consequences are high; it does not erase the warning."
            }
          ]
        },
        {
          "q": "Which field practice best applies the profile?",
          "o": [
            {
              "t": "On the mountain, use this field method: observe layering, weather history, slope angle, aspect, and recent loading while comparing incidents across similar terrain.",
              "v": "expert",
              "fb": "Correct: avalanche science combines snow structure, weather history, terrain, and uncertainty across space."
            },
            {
              "t": "Dig a careful pit at one convenient site, but omit recent avalanche activity, wind loading, route consequences, and spatial variation. The weather history is incomplete.",
              "v": "partial",
              "fb": "A snow pit is valuable local evidence, not a certificate for every part of a mountain."
            },
            {
              "t": "Infer stability from the absence of natural releases while ignoring a buried weakness capable of propagating after a local trigger. Quiet conditions do not establish stability.",
              "v": "wrong",
              "fb": "A lack of immediate natural activity does not establish a persistent weak layer does not be triggered."
            },
            {
              "t": "Choose access first, downgrade the bulletin to preserve operations, and describe the unresolved warning as normal forecasting disagreement. Access outranks the warning.",
              "v": "danger",
              "fb": "Forecast uncertainty supports conservative decisions when consequences are high; it does not erase the warning."
            }
          ]
        },
        {
          "q": "Which avalanche conclusion is best supported?",
          "o": [
            {
              "t": "The snow-safety lesson is that avalanches arise from interacting conditions, so one reassuring sign cannot cancel a dangerous combination. Spatial uncertainty remains explicit.",
              "v": "expert",
              "fb": "Correct: avalanche science combines snow structure, weather history, terrain, and uncertainty across space."
            },
            {
              "t": "A local stability result can justify broad access while conflicting weather history and terrain evidence remain advisory details. The snowpack profile leaves one test open, in use.",
              "v": "partial",
              "fb": "A snow pit is valuable local evidence, not a certificate for every part of a mountain."
            },
            {
              "t": "Uncertainty in release timing means the snowpack provides no actionable information until a slope actually avalanches. Under the snowpack profile, direct comparison fails, in use.",
              "v": "wrong",
              "fb": "A lack of immediate natural activity does not establish a persistent weak layer does not be triggered."
            },
            {
              "t": "The slide is likely to reflect a deliberate blast or an unknowable act of God, excluding a monitored hazard and an operational choice. Inside the snowpack profile, drama displaces testing.",
              "v": "danger",
              "fb": "Forecast uncertainty supports conservative decisions when consequences are high; it does not erase the warning."
            }
          ]
        }
      ]
    },
    "voellmy": {
      "sci": "Adolf Voellmy (1902-1977)",
      "topic": "Avalanche dynamics & runout",
      "lede": "Adolf Voellmy read avalanche dynamics and runout in layers, motion, terrain, and measurements repeated through changing weather.",
      "no": 4,
      "profile": "Today’s mountain-science letter introduces Adolf Voellmy through avalanche dynamics and runout. Adolf Voellmy developed an influential avalanche-runout model using resistance terms related to friction and turbulent flow. Snow records weather as structure: each storm, wind event, warm spell, and cold gradient changes grains and bonds before the layer is buried. Voellmy’s work provides a way to observe that history or model how it moves. The result is not perfect prediction but a better account of where uncertainty is concentrated.\n\nThe field method is to estimate release volume and path geometry, apply calibrated resistance parameters, and compare predicted speed and runout with documented events. Observers should connect measurements to aspect, elevation, slope angle, recent loading, temperature, wind, and signs of natural activity. A pit describes one location; a forecast combines many locations with weather history and terrain consequences.\n\nAvalanche decisions are made before the slope supplies complete evidence. Weak layers may be patchy, tests may vary over meters, and a skier can trigger a crack from a thinner point. That is why hazard ratings, closures, route selection, and conservative margins exist: they convert incomplete but serious evidence into action.\n\nThe mountain lesson is runout models support planning only when their parameters reflect the terrain and avalanche type rather than one universal setting. Snow safety depends on repeated observation and decisions that respect uncertainty before release begins. A terrain trap can make a modest slide unsurvivable by concentrating debris in a gully or against trees. Control work reduces specific hazards but cannot certify every pocket on a complex slope.",
      "frame": "Cuts a clean wall through the snow. \"At The Patrol & Forecast Hut, every layer had weather before it had weight. Explain avalanche dynamics and runout.\"",
      "q": [
        {
          "q": "Which snow-science account best captures Adolf Voellmy’s contribution to avalanche dynamics and runout?",
          "o": [
            {
              "t": "Adolf Voellmy developed an influential avalanche-runout model using resistance terms related to friction and turbulent flow. Spatial uncertainty remains explicit. The snowpack profile keeps assumptions explicit.",
              "v": "expert",
              "fb": "Correct: avalanche science combines snow structure, weather history, terrain, and uncertainty across space."
            },
            {
              "t": "Adolf Voellmy contributed to avalanche dynamics and runout, but the account generalizes one profile across aspects, elevations, loading patterns, and terrain. The snowpack profile leaves one test open.",
              "v": "partial",
              "fb": "A snow pit is valuable local evidence, not a certificate for every part of a mountain."
            },
            {
              "t": "Adolf Voellmy is portrayed as treating a quiet morning and one stable test as proof that a persistent weak layer does not release. The weak layer evidence persists. Quiet conditions do not establish stability.",
              "v": "wrong",
              "fb": "A lack of immediate natural activity does not establish a persistent weak layer does not be triggered."
            },
            {
              "t": "Adolf Voellmy is invoked to keep terrain open because uncertainty prevents prediction of the exact trigger, location, and second of failure. Within the snowpack profile, assumption replaces verification.",
              "v": "danger",
              "fb": "Forecast uncertainty supports conservative decisions when consequences are high; it does not erase the warning."
            }
          ]
        },
        {
          "q": "Which field practice best applies the profile?",
          "o": [
            {
              "t": "On the mountain, use this field method: estimate release volume and path geometry, apply calibrated resistance parameters, and compare predicted speed and runout with documented events. Spatial uncertainty remains explicit.",
              "v": "expert",
              "fb": "Correct: avalanche science combines snow structure, weather history, terrain, and uncertainty across space."
            },
            {
              "t": "Dig a careful pit at one convenient site, but omit recent avalanche activity, wind loading, route consequences, and spatial variation. The weather history is incomplete. Support across the snowpack profile stays partial.",
              "v": "partial",
              "fb": "A snow pit is valuable local evidence, not a certificate for every part of a mountain."
            },
            {
              "t": "Infer stability from the absence of natural releases while ignoring a buried weakness capable of propagating after a local trigger. Quiet conditions do not establish stability. Under the snowpack profile, direct comparison fails.",
              "v": "wrong",
              "fb": "A lack of immediate natural activity does not establish a persistent weak layer does not be triggered."
            },
            {
              "t": "Choose access first, downgrade the bulletin to preserve operations, and describe the unresolved warning as normal forecasting disagreement. Access outranks the warning. Under the snowpack profile, warning is postponed.",
              "v": "danger",
              "fb": "Forecast uncertainty supports conservative decisions when consequences are high; it does not erase the warning."
            }
          ]
        },
        {
          "q": "Which avalanche conclusion is best supported?",
          "o": [
            {
              "t": "The snow-safety lesson is that runout models support planning only when their parameters reflect the terrain and avalanche type rather than one universal setting. Spatial uncertainty remains explicit, in use.",
              "v": "expert",
              "fb": "Correct: avalanche science combines snow structure, weather history, terrain, and uncertainty across space."
            },
            {
              "t": "A local stability result can justify broad access while conflicting weather history and terrain evidence remain advisory details. Slope variation remains unmeasured. The weather history is incomplete, in use.",
              "v": "partial",
              "fb": "A snow pit is valuable local evidence, not a certificate for every part of a mountain."
            },
            {
              "t": "Uncertainty in release timing means the snowpack provides no actionable information until a slope actually avalanches. The weak layer evidence persists. Quiet conditions do not establish stability, in use.",
              "v": "wrong",
              "fb": "A lack of immediate natural activity does not establish a persistent weak layer does not be triggered."
            },
            {
              "t": "The slide is likely to reflect a deliberate blast or an unknowable act of God, excluding a monitored hazard and an operational choice. Access outranks the warning. Under the snowpack profile, warning is postponed.",
              "v": "danger",
              "fb": "Forecast uncertainty supports conservative decisions when consequences are high; it does not erase the warning."
            }
          ]
        }
      ]
    },
    "roch": {
      "sci": "André Roch (1906-2002)",
      "topic": "Snow, avalanches & the slope",
      "lede": "André Roch connected snow, avalanches and the slope to the physical history hidden inside ice and snow.",
      "no": 5,
      "profile": "Today’s mountain-science letter introduces André Roch through snow, avalanches and the slope. André Roch drew on extensive alpine experience to explain how terrain, weather, snow structure, and human decisions shape avalanche accidents. Snow records weather as structure: each storm, wind event, warm spell, and cold gradient changes grains and bonds before the layer is buried. Roch’s work provides a way to observe that history or model how it moves. The result is not perfect prediction but a better account of where uncertainty is concentrated.\n\nThe field method is to read slope shape and loading patterns, recognize terrain traps, and adjust route choices as conditions change. Observers should connect measurements to aspect, elevation, slope angle, recent loading, temperature, wind, and signs of natural activity. A pit describes one location; a forecast combines many locations with weather history and terrain consequences.\n\nAvalanche decisions are made before the slope supplies complete evidence. Weak layers may be patchy, tests may vary over meters, and a skier can trigger a crack from a thinner point. That is why hazard ratings, closures, route selection, and conservative margins exist: they convert incomplete but serious evidence into action.\n\nThe mountain lesson is technical knowledge protects people only when it changes where and when they travel. Snow safety depends on repeated observation and decisions that respect uncertainty before release begins. Recent avalanches are direct evidence that the snowpack can fail under the current loading pattern. A terrain trap can make a modest slide unsurvivable by concentrating debris in a gully or against trees.",
      "frame": "Folds the hazard bulletin. \"The uncertainty was real; so was the warning. Start with snow, avalanches and the slope.\"",
      "q": [
        {
          "q": "Which snow-science account best captures André Roch’s contribution to snow, avalanches and the slope?",
          "o": [
            {
              "t": "André Roch drew on extensive alpine experience to explain how terrain, weather, snow structure, and human decisions shape avalanche accidents. The snowpack profile lets later reviewers reconstruct events.",
              "v": "expert",
              "fb": "Correct: avalanche science combines snow structure, weather history, terrain, and uncertainty across space."
            },
            {
              "t": "André Roch contributed to snow, avalanches and the slope, but the account generalizes one profile across aspects, elevations, loading patterns, and terrain. Slope variation remains unmeasured, in use.",
              "v": "partial",
              "fb": "A snow pit is valuable local evidence, not a certificate for every part of a mountain."
            },
            {
              "t": "André Roch is portrayed as treating a quiet morning and one stable test as proof that a persistent weak layer does not release. The weak layer evidence persists. Quiet conditions do not establish stability.",
              "v": "wrong",
              "fb": "A lack of immediate natural activity does not establish a persistent weak layer does not be triggered."
            },
            {
              "t": "André Roch is invoked to keep terrain open because uncertainty prevents prediction of the exact trigger, location, and second of failure. Inside the snowpack profile, the claim outruns checks, in use.",
              "v": "danger",
              "fb": "Forecast uncertainty supports conservative decisions when consequences are high; it does not erase the warning."
            }
          ]
        },
        {
          "q": "Which field practice best applies the profile?",
          "o": [
            {
              "t": "On the mountain, use this field method: read slope shape and loading patterns, recognize terrain traps, and adjust route choices as conditions change. The snowpack profile keeps assumptions explicit.",
              "v": "expert",
              "fb": "Correct: avalanche science combines snow structure, weather history, terrain, and uncertainty across space."
            },
            {
              "t": "Dig a careful pit at one convenient site, but omit recent avalanche activity, wind loading, route consequences, and spatial variation. Across the snowpack profile, comparison remains incomplete, in use.",
              "v": "partial",
              "fb": "A snow pit is valuable local evidence, not a certificate for every part of a mountain."
            },
            {
              "t": "Infer stability from the absence of natural releases while ignoring a buried weakness capable of propagating after a local trigger. The weak layer evidence persists. Quiet conditions do not establish stability.",
              "v": "wrong",
              "fb": "A lack of immediate natural activity does not establish a persistent weak layer does not be triggered."
            },
            {
              "t": "Choose access first, downgrade the bulletin to preserve operations, and describe the unresolved warning as normal forecasting disagreement. Inside the snowpack profile, the claim outruns checks, in use.",
              "v": "danger",
              "fb": "Forecast uncertainty supports conservative decisions when consequences are high; it does not erase the warning."
            }
          ]
        },
        {
          "q": "Which avalanche conclusion is best supported?",
          "o": [
            {
              "t": "The snow-safety lesson is that technical knowledge protects people only when it changes where and when they travel. The snowpack profile keeps assumptions explicit, in use.",
              "v": "expert",
              "fb": "Correct: avalanche science combines snow structure, weather history, terrain, and uncertainty across space."
            },
            {
              "t": "A local stability result can justify broad access while conflicting weather history and terrain evidence remain advisory details. Slope variation remains unmeasured, in use.",
              "v": "partial",
              "fb": "A snow pit is valuable local evidence, not a certificate for every part of a mountain."
            },
            {
              "t": "Uncertainty in release timing means the snowpack provides no actionable information until a slope actually avalanches. The snowpack profile points to another result, in use.",
              "v": "wrong",
              "fb": "A lack of immediate natural activity does not establish a persistent weak layer does not be triggered."
            },
            {
              "t": "The slide is likely to reflect a deliberate blast or an unknowable act of God, excluding a monitored hazard and an operational choice. Under the snowpack profile, warning is postponed.",
              "v": "danger",
              "fb": "Forecast uncertainty supports conservative decisions when consequences are high; it does not erase the warning."
            }
          ]
        }
      ]
    },
    "dequervain": {
      "sci": "Marcel de Quervain (snow scientist)",
      "topic": "Snow classification & avalanche release",
      "lede": "Mountain snow became measurable evidence in Marcel de Quervain’s work on snow classification and avalanche release.",
      "no": 6,
      "profile": "Today’s mountain-science letter introduces Marcel de Quervain through snow classification and avalanche release. Marcel de Quervain contributed to international snow classification and research connecting snow structure with slab formation and avalanche release. Snow records weather as structure: each storm, wind event, warm spell, and cold gradient changes grains and bonds before the layer is buried. Quervain’s work provides a way to observe that history or model how it moves. The result is not perfect prediction but a better account of where uncertainty is concentrated.\n\nThe field method is to describe grains and layers consistently, map weak interfaces, and compare fracture behavior across standardized snow types. Observers should connect measurements to aspect, elevation, slope angle, recent loading, temperature, wind, and signs of natural activity. A pit describes one location; a forecast combines many locations with weather history and terrain consequences.\n\nAvalanche decisions are made before the slope supplies complete evidence. Weak layers may be patchy, tests may vary over meters, and a skier can trigger a crack from a thinner point. That is why hazard ratings, closures, route selection, and conservative margins exist: they convert incomplete but serious evidence into action.\n\nThe mountain lesson is shared classification improves forecasting because observers can compare the same physical features rather than personal labels. Snow safety depends on repeated observation and decisions that respect uncertainty before release begins. Control work reduces specific hazards but cannot certify every pocket on a complex slope. Recent avalanches are direct evidence that the snowpack can fail under the current loading pattern.",
      "frame": "Marks a fracture line on the slope photograph. \"One pit is not a mountain. Show me how snow classification and avalanche release travels across terrain.\"",
      "q": [
        {
          "q": "Which snow-science account best captures Marcel de Quervain’s contribution to snow classification and avalanche release?",
          "o": [
            {
              "t": "Marcel de Quervain contributed to international snow classification and research connecting snow structure with slab formation and avalanche release. Spatial uncertainty remains explicit.",
              "v": "expert",
              "fb": "Correct: avalanche science combines snow structure, weather history, terrain, and uncertainty across space."
            },
            {
              "t": "Marcel de Quervain contributed to snow classification and avalanche release, but the account generalizes one profile across aspects, elevations, loading patterns, and terrain.",
              "v": "partial",
              "fb": "A snow pit is valuable local evidence, not a certificate for every part of a mountain."
            },
            {
              "t": "Marcel de Quervain is portrayed as treating a quiet morning and one stable test as proof that a persistent weak layer does not release. The snowpack profile defeats that inference.",
              "v": "wrong",
              "fb": "A lack of immediate natural activity does not establish a persistent weak layer does not be triggered."
            },
            {
              "t": "Marcel de Quervain is invoked to keep terrain open because uncertainty prevents prediction of the exact trigger, location, and second of failure. Uncertainty is mistaken for safety.",
              "v": "danger",
              "fb": "Forecast uncertainty supports conservative decisions when consequences are high; it does not erase the warning."
            }
          ]
        },
        {
          "q": "Which field practice best applies the profile?",
          "o": [
            {
              "t": "On the mountain, use this field method: describe grains and layers consistently, map weak interfaces, and compare fracture behavior across standardized snow types, in use.",
              "v": "expert",
              "fb": "Correct: avalanche science combines snow structure, weather history, terrain, and uncertainty across space."
            },
            {
              "t": "Dig a careful pit at one convenient site, but omit recent avalanche activity, wind loading, route consequences, and spatial variation. The weather history is incomplete.",
              "v": "partial",
              "fb": "A snow pit is valuable local evidence, not a certificate for every part of a mountain."
            },
            {
              "t": "Infer stability from the absence of natural releases while ignoring a buried weakness capable of propagating after a local trigger. Quiet conditions do not establish stability.",
              "v": "wrong",
              "fb": "A lack of immediate natural activity does not establish a persistent weak layer does not be triggered."
            },
            {
              "t": "Choose access first, downgrade the bulletin to preserve operations, and describe the unresolved warning as normal forecasting disagreement. Access outranks the warning.",
              "v": "danger",
              "fb": "Forecast uncertainty supports conservative decisions when consequences are high; it does not erase the warning."
            }
          ]
        },
        {
          "q": "Which avalanche conclusion is best supported?",
          "o": [
            {
              "t": "The snow-safety lesson is that shared classification improves forecasting because observers can compare the same physical features rather than personal labels. Spatial uncertainty remains explicit, in use.",
              "v": "expert",
              "fb": "Correct: avalanche science combines snow structure, weather history, terrain, and uncertainty across space."
            },
            {
              "t": "A local stability result can justify broad access while conflicting weather history and terrain evidence remain advisory details. Slope variation remains unmeasured. The weather history is incomplete, in use.",
              "v": "partial",
              "fb": "A snow pit is valuable local evidence, not a certificate for every part of a mountain."
            },
            {
              "t": "Uncertainty in release timing means the snowpack provides no actionable information until a slope actually avalanches. The weak layer evidence persists. Quiet conditions do not establish stability, in use.",
              "v": "wrong",
              "fb": "A lack of immediate natural activity does not establish a persistent weak layer does not be triggered."
            },
            {
              "t": "The slide is likely to reflect a deliberate blast or an unknowable act of God, excluding a monitored hazard and an operational choice. Access outranks the warning. Under the snowpack profile, warning is postponed.",
              "v": "danger",
              "fb": "Forecast uncertainty supports conservative decisions when consequences are high; it does not erase the warning."
            }
          ]
        }
      ]
    },
    "weertman": {
      "sci": "Johannes Weertman (1925-2018)",
      "topic": "Glacier sliding & ice flow",
      "lede": "Johannes Weertman read glacier sliding and ice flow in layers, motion, terrain, and measurements repeated through changing weather.",
      "no": 7,
      "profile": "Today’s mountain-science letter introduces Johannes Weertman through glacier sliding and ice flow. Johannes Weertman developed theories of glacier sliding over bedrock, including the roles of pressure melting, regelation, and creep around obstacles. Snow records weather as structure: each storm, wind event, warm spell, and cold gradient changes grains and bonds before the layer is buried. Weertman’s work provides a way to observe that history or model how it moves. The result is not perfect prediction but a better account of where uncertainty is concentrated.\n\nThe field method is to model basal stress, obstacle size, water pressure, and ice deformation, then compare predicted sliding with measured motion. Observers should connect measurements to aspect, elevation, slope angle, recent loading, temperature, wind, and signs of natural activity. A pit describes one location; a forecast combines many locations with weather history and terrain consequences.\n\nAvalanche decisions are made before the slope supplies complete evidence. Weak layers may be patchy, tests may vary over meters, and a skier can trigger a crack from a thinner point. That is why hazard ratings, closures, route selection, and conservative margins exist: they convert incomplete but serious evidence into action.\n\nThe mountain lesson is movement at an interface can change sharply when water and contact conditions change even if the ice above appears similar. Snow safety depends on repeated observation and decisions that respect uncertainty before release begins. A terrain trap can make a modest slide unsurvivable by concentrating debris in a gully or against trees. Control work reduces specific hazards but cannot certify every pocket on a complex slope.",
      "frame": "Cuts a clean wall through the snow. \"At The Resort Management Office, every layer had weather before it had weight. Explain glacier sliding and ice flow.\"",
      "q": [
        {
          "q": "Which snow-science account best captures Johannes Weertman’s contribution to glacier sliding and ice flow?",
          "o": [
            {
              "t": "Johannes Weertman developed theories of glacier sliding over bedrock, including the roles of pressure melting, regelation, and creep around obstacles. The snowpack profile lets later reviewers reconstruct events.",
              "v": "expert",
              "fb": "Correct: avalanche science combines snow structure, weather history, terrain, and uncertainty across space."
            },
            {
              "t": "Johannes Weertman contributed to glacier sliding and ice flow, but the account generalizes one profile across aspects, elevations, loading patterns, and terrain. The snowpack profile leaves one test open.",
              "v": "partial",
              "fb": "A snow pit is valuable local evidence, not a certificate for every part of a mountain."
            },
            {
              "t": "Johannes Weertman is portrayed as treating a quiet morning and one stable test as proof that a persistent weak layer does not release. The weak layer evidence persists. Quiet conditions do not establish stability.",
              "v": "wrong",
              "fb": "A lack of immediate natural activity does not establish a persistent weak layer does not be triggered."
            },
            {
              "t": "Johannes Weertman is invoked to keep terrain open because uncertainty prevents prediction of the exact trigger, location, and second of failure. Within the snowpack profile, assumption replaces verification.",
              "v": "danger",
              "fb": "Forecast uncertainty supports conservative decisions when consequences are high; it does not erase the warning."
            }
          ]
        },
        {
          "q": "Which field practice best applies the profile?",
          "o": [
            {
              "t": "On the mountain, use this field method: model basal stress, obstacle size, water pressure, and ice deformation, then compare predicted sliding with measured motion.",
              "v": "expert",
              "fb": "Correct: avalanche science combines snow structure, weather history, terrain, and uncertainty across space."
            },
            {
              "t": "Dig a careful pit at one convenient site, but omit recent avalanche activity, wind loading, route consequences, and spatial variation. The weather history is incomplete.",
              "v": "partial",
              "fb": "A snow pit is valuable local evidence, not a certificate for every part of a mountain."
            },
            {
              "t": "Infer stability from the absence of natural releases while ignoring a buried weakness capable of propagating after a local trigger. Quiet conditions do not establish stability.",
              "v": "wrong",
              "fb": "A lack of immediate natural activity does not establish a persistent weak layer does not be triggered."
            },
            {
              "t": "Choose access first, downgrade the bulletin to preserve operations, and describe the unresolved warning as normal forecasting disagreement. Access outranks the warning.",
              "v": "danger",
              "fb": "Forecast uncertainty supports conservative decisions when consequences are high; it does not erase the warning."
            }
          ]
        },
        {
          "q": "Which avalanche conclusion is best supported?",
          "o": [
            {
              "t": "The snow-safety lesson is that movement at an interface can change sharply when water and contact conditions change even if the ice above appears similar. The hazard decision stays conservative, in use.",
              "v": "expert",
              "fb": "Correct: avalanche science combines snow structure, weather history, terrain, and uncertainty across space."
            },
            {
              "t": "A local stability result can justify broad access while conflicting weather history and terrain evidence remain advisory details. Slope variation remains unmeasured. The weather history is incomplete, in use.",
              "v": "partial",
              "fb": "A snow pit is valuable local evidence, not a certificate for every part of a mountain."
            },
            {
              "t": "Uncertainty in release timing means the snowpack provides no actionable information until a slope actually avalanches. The weak layer evidence persists. Quiet conditions do not establish stability, in use.",
              "v": "wrong",
              "fb": "A lack of immediate natural activity does not establish a persistent weak layer does not be triggered."
            },
            {
              "t": "The slide is likely to reflect a deliberate blast or an unknowable act of God, excluding a monitored hazard and an operational choice. Access outranks the warning. Under the snowpack profile, warning is postponed.",
              "v": "danger",
              "fb": "Forecast uncertainty supports conservative decisions when consequences are high; it does not erase the warning."
            }
          ]
        }
      ]
    },
    "perla": {
      "sci": "Ronald Perla (avalanche scientist)",
      "topic": "Snow mechanics & the avalanche handbook",
      "lede": "Ronald Perla connected snow mechanics and the avalanche handbook to the physical history hidden inside ice and snow.",
      "no": 8,
      "profile": "Today’s mountain-science letter introduces Ronald Perla through snow mechanics and the avalanche handbook. Ronald Perla advanced snow mechanics and coauthored the Avalanche Handbook, integrating slab behavior, forecasting, dynamics, and control. Snow records weather as structure: each storm, wind event, warm spell, and cold gradient changes grains and bonds before the layer is buried. Perla’s work provides a way to observe that history or model how it moves. The result is not perfect prediction but a better account of where uncertainty is concentrated.\n\nThe field method is to separate release, flow, and runout questions, use stability tests carefully, and state the uncertainty of each observation. Observers should connect measurements to aspect, elevation, slope angle, recent loading, temperature, wind, and signs of natural activity. A pit describes one location; a forecast combines many locations with weather history and terrain consequences.\n\nAvalanche decisions are made before the slope supplies complete evidence. Weak layers may be patchy, tests may vary over meters, and a skier can trigger a crack from a thinner point. That is why hazard ratings, closures, route selection, and conservative margins exist: they convert incomplete but serious evidence into action.\n\nThe mountain lesson is a stable test at one point cannot certify an entire slope because weak layers and loading vary across space. Snow safety depends on repeated observation and decisions that respect uncertainty before release begins. Recent avalanches are direct evidence that the snowpack can fail under the current loading pattern. A terrain trap can make a modest slide unsurvivable by concentrating debris in a gully or against trees.",
      "frame": "Folds the hazard bulletin. \"The uncertainty was real; so was the warning. Start with snow mechanics and the avalanche handbook.\"",
      "q": [
        {
          "q": "Which snow-science account best captures Ronald Perla’s contribution to snow mechanics and the avalanche handbook?",
          "o": [
            {
              "t": "Ronald Perla advanced snow mechanics and coauthored the Avalanche Handbook, integrating slab behavior, forecasting, dynamics, and control. Spatial uncertainty remains explicit.",
              "v": "expert",
              "fb": "Correct: avalanche science combines snow structure, weather history, terrain, and uncertainty across space."
            },
            {
              "t": "Ronald Perla contributed to snow mechanics and the avalanche handbook, but the account generalizes one profile across aspects, elevations, loading patterns, and terrain.",
              "v": "partial",
              "fb": "A snow pit is valuable local evidence, not a certificate for every part of a mountain."
            },
            {
              "t": "Ronald Perla is portrayed as treating a quiet morning and one stable test as proof that a persistent weak layer does not release. Quiet conditions do not establish stability.",
              "v": "wrong",
              "fb": "A lack of immediate natural activity does not establish a persistent weak layer does not be triggered."
            },
            {
              "t": "Ronald Perla is invoked to keep terrain open because uncertainty prevents prediction of the exact trigger, location, and second of failure. Access outranks the warning.",
              "v": "danger",
              "fb": "Forecast uncertainty supports conservative decisions when consequences are high; it does not erase the warning."
            }
          ]
        },
        {
          "q": "Which field practice best applies the profile?",
          "o": [
            {
              "t": "On the mountain, use this field method: separate release, flow, and runout questions, use stability tests carefully, and state the uncertainty of each observation, in use.",
              "v": "expert",
              "fb": "Correct: avalanche science combines snow structure, weather history, terrain, and uncertainty across space."
            },
            {
              "t": "Dig a careful pit at one convenient site, but omit recent avalanche activity, wind loading, route consequences, and spatial variation. The weather history is incomplete.",
              "v": "partial",
              "fb": "A snow pit is valuable local evidence, not a certificate for every part of a mountain."
            },
            {
              "t": "Infer stability from the absence of natural releases while ignoring a buried weakness capable of propagating after a local trigger. Quiet conditions do not establish stability.",
              "v": "wrong",
              "fb": "A lack of immediate natural activity does not establish a persistent weak layer does not be triggered."
            },
            {
              "t": "Choose access first, downgrade the bulletin to preserve operations, and describe the unresolved warning as normal forecasting disagreement. Access outranks the warning.",
              "v": "danger",
              "fb": "Forecast uncertainty supports conservative decisions when consequences are high; it does not erase the warning."
            }
          ]
        },
        {
          "q": "Which avalanche conclusion is best supported?",
          "o": [
            {
              "t": "The snow-safety lesson is that a stable test at one point cannot certify an entire slope because weak layers and loading vary across space. Spatial uncertainty remains explicit.",
              "v": "expert",
              "fb": "Correct: avalanche science combines snow structure, weather history, terrain, and uncertainty across space."
            },
            {
              "t": "A local stability result can justify broad access while conflicting weather history and terrain evidence remain advisory details. The snowpack profile leaves one test open, in use.",
              "v": "partial",
              "fb": "A snow pit is valuable local evidence, not a certificate for every part of a mountain."
            },
            {
              "t": "Uncertainty in release timing means the snowpack provides no actionable information until a slope actually avalanches. Under the snowpack profile, direct comparison fails, in use.",
              "v": "wrong",
              "fb": "A lack of immediate natural activity does not establish a persistent weak layer does not be triggered."
            },
            {
              "t": "The slide is likely to reflect a deliberate blast or an unknowable act of God, excluding a monitored hazard and an operational choice. Inside the snowpack profile, drama displaces testing.",
              "v": "danger",
              "fb": "Forecast uncertainty supports conservative decisions when consequences are high; it does not erase the warning."
            }
          ]
        }
      ]
    },
    "mcclung": {
      "sci": "David McClung (avalanche scientist)",
      "topic": "Snow-slab stability & forecasting",
      "lede": "Mountain snow became measurable evidence in David McClung’s work on snow-slab stability and forecasting.",
      "no": 9,
      "profile": "Today’s mountain-science letter introduces David McClung through snow-slab stability and forecasting. David McClung developed fracture-based explanations of dry-slab avalanche release and influential methods for stability evaluation and forecasting. Snow records weather as structure: each storm, wind event, warm spell, and cold gradient changes grains and bonds before the layer is buried. McClung’s work provides a way to observe that history or model how it moves. The result is not perfect prediction but a better account of where uncertainty is concentrated.\n\nThe field method is to identify the weak layer, assess whether a crack can start and propagate, and weigh spatial variability with loading and terrain. Observers should connect measurements to aspect, elevation, slope angle, recent loading, temperature, wind, and signs of natural activity. A pit describes one location; a forecast combines many locations with weather history and terrain consequences.\n\nAvalanche decisions are made before the slope supplies complete evidence. Weak layers may be patchy, tests may vary over meters, and a skier can trigger a crack from a thinner point. That is why hazard ratings, closures, route selection, and conservative margins exist: they convert incomplete but serious evidence into action.\n\nThe mountain lesson is slab release is a fracture process, so the ability of a crack to spread can matter more than average snow strength. Snow safety depends on repeated observation and decisions that respect uncertainty before release begins. Control work reduces specific hazards but cannot certify every pocket on a complex slope. Recent avalanches are direct evidence that the snowpack can fail under the current loading pattern.",
      "frame": "Marks a fracture line on the slope photograph. \"One pit is not a mountain. Show me how snow-slab stability and forecasting travels across terrain.\"",
      "q": [
        {
          "q": "Which snow-science account best captures David McClung’s contribution to snow-slab stability and forecasting?",
          "o": [
            {
              "t": "David McClung developed fracture-based explanations of dry-slab avalanche release and influential methods for stability evaluation and forecasting. The snowpack profile lets later reviewers reconstruct events.",
              "v": "expert",
              "fb": "Correct: avalanche science combines snow structure, weather history, terrain, and uncertainty across space."
            },
            {
              "t": "David McClung contributed to snow-slab stability and forecasting, but the account generalizes one profile across aspects, elevations, loading patterns, and terrain. Slope variation remains unmeasured.",
              "v": "partial",
              "fb": "A snow pit is valuable local evidence, not a certificate for every part of a mountain."
            },
            {
              "t": "David McClung is portrayed as treating a quiet morning and one stable test as proof that a persistent weak layer does not release. The weak layer evidence persists. Quiet conditions do not establish stability.",
              "v": "wrong",
              "fb": "A lack of immediate natural activity does not establish a persistent weak layer does not be triggered."
            },
            {
              "t": "David McClung is invoked to keep terrain open because uncertainty prevents prediction of the exact trigger, location, and second of failure. Within the snowpack profile, assumption replaces verification.",
              "v": "danger",
              "fb": "Forecast uncertainty supports conservative decisions when consequences are high; it does not erase the warning."
            }
          ]
        },
        {
          "q": "Which field practice best applies the profile?",
          "o": [
            {
              "t": "On the mountain, use this field method: identify the weak layer, assess whether a crack can start and propagate, and weigh spatial variability with loading and terrain.",
              "v": "expert",
              "fb": "Correct: avalanche science combines snow structure, weather history, terrain, and uncertainty across space."
            },
            {
              "t": "Dig a careful pit at one convenient site, but omit recent avalanche activity, wind loading, route consequences, and spatial variation. The weather history is incomplete.",
              "v": "partial",
              "fb": "A snow pit is valuable local evidence, not a certificate for every part of a mountain."
            },
            {
              "t": "Infer stability from the absence of natural releases while ignoring a buried weakness capable of propagating after a local trigger. Quiet conditions do not establish stability.",
              "v": "wrong",
              "fb": "A lack of immediate natural activity does not establish a persistent weak layer does not be triggered."
            },
            {
              "t": "Choose access first, downgrade the bulletin to preserve operations, and describe the unresolved warning as normal forecasting disagreement. Access outranks the warning.",
              "v": "danger",
              "fb": "Forecast uncertainty supports conservative decisions when consequences are high; it does not erase the warning."
            }
          ]
        },
        {
          "q": "Which avalanche conclusion is best supported?",
          "o": [
            {
              "t": "The snow-safety lesson is that slab release is a fracture process, so the ability of a crack to spread can matter more than average snow strength. The snowpack profile keeps assumptions explicit, in use.",
              "v": "expert",
              "fb": "Correct: avalanche science combines snow structure, weather history, terrain, and uncertainty across space."
            },
            {
              "t": "A local stability result can justify broad access while conflicting weather history and terrain evidence remain advisory details. Slope variation remains unmeasured. The weather history is incomplete, in use.",
              "v": "partial",
              "fb": "A snow pit is valuable local evidence, not a certificate for every part of a mountain."
            },
            {
              "t": "Uncertainty in release timing means the snowpack provides no actionable information until a slope actually avalanches. The weak layer evidence persists. Quiet conditions do not establish stability, in use.",
              "v": "wrong",
              "fb": "A lack of immediate natural activity does not establish a persistent weak layer does not be triggered."
            },
            {
              "t": "The slide is likely to reflect a deliberate blast or an unknowable act of God, excluding a monitored hazard and an operational choice. Access outranks the warning. Under the snowpack profile, warning is postponed.",
              "v": "danger",
              "fb": "Forecast uncertainty supports conservative decisions when consequences are high; it does not erase the warning."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "patroller": {
      "slope": "Patroller Sten finds you near the slope & start zone while wind loads the ridge above. \"Dug the snow pits; the weak layer was there and shouting for days. The slab released at noon, but its weak layer had been developing for days.\"",
      "patrolhut": "Patroller Sten finds you near the patrol & forecast hut while wind loads the ridge above. \"Dug the snow pits; the weak layer was there and shouting for days. The slab released at noon, but its weak layer had been developing for days.\"",
      "office": "Patroller Sten finds you near the resort management office while wind loads the ridge above. \"Dug the snow pits; the weak layer was there and shouting for days. The slab released at noon, but its weak layer had been developing for days.\""
    },
    "snowforecaster": {
      "slope": "The Snow Forecaster finds you near the slope & start zone while wind loads the ridge above. \"Wrote the hazard bulletins; the high rating was overruled to keep the run open. The slab released at noon, but its weak layer had been developing for days.\"",
      "patrolhut": "The Snow Forecaster finds you near the patrol & forecast hut while wind loads the ridge above. \"Wrote the hazard bulletins; the high rating was overruled to keep the run open. The slab released at noon, but its weak layer had been developing for days.\"",
      "office": "The Snow Forecaster finds you near the resort management office while wind loads the ridge above. \"Wrote the hazard bulletins; the high rating was overruled to keep the run open. The slab released at noon, but its weak layer had been developing for days.\""
    },
    "clerk": {
      "slope": "The Clerk finds you near the slope & start zone while wind loads the ridge above. \"Keeps the closure logs — and the order that reopened the slope early. The slab released at noon, but its weak layer had been developing for days.\"",
      "patrolhut": "The Clerk finds you near the patrol & forecast hut while wind loads the ridge above. \"Keeps the closure logs — and the order that reopened the slope early. The slab released at noon, but its weak layer had been developing for days.\"",
      "office": "The Clerk finds you near the resort management office while wind loads the ridge above. \"Keeps the closure logs — and the order that reopened the slope early. The slab released at noon, but its weak layer had been developing for days.\""
    }
  },
  "story": [
    "<b>The Whitewall Slide</b> begins inside the Whitewall avalanche inquiry, where the first explanation is already spreading faster than the evidence.",
    "<b>Patroller Sten</b>, <b>The Snow Forecaster</b>, and <b>The Clerk</b> each hold a different part of the record, and each conversation opens with one real pioneer whose work changes how the evidence should be read.",
    "The inquiry keeps circling <b>A charge set off deliberately</b> and <b>A freak slide beyond any warning — an act of God</b>. Both are tempting, and neither can be accepted just because it makes the cleanest headline.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and make the final WHAT judgment from what you learned."
  ],
  "endings": {
    "overclaimWhat": "blast",
    "dismissalWhat": "freak",
    "win": {
      "expertTitle": "The Weak Layer Was Documented",
      "expert": [
        "You identify <b>Kurt Halden — resort operations manager</b>, locate the decisive order in <b>The Resort Management Office</b>, and establish <b>Ignored snowpack monitoring & a slope kept open</b>. Not a charge set off deliberately. Not a freak slide beyond any warning — an act of god.",
        "Repeated pits, recent loading, and the high hazard bulletin described a persistent slab problem before the run opened. The release was not evidence of a deliberate attack or an unknowable act of nature; management overruled the warning and maintained public exposure."
      ],
      "soundTitle": "The Closure That Should Have Held",
      "sound": [
        "Your finding correctly joins <b>Kurt Halden — resort operations manager</b>, <b>The Resort Management Office</b>, and <b>Ignored snowpack monitoring & a slope kept open</b>. Snow observations and reopening records support the conclusion.",
        "The precise trigger may remain uncertain, but avalanche safety did not require predicting its exact second. The documented conditions already justified closure."
      ],
      "namedTitle": "The Open Slope",
      "named": [
        "Your accusation selects <b>Kurt Halden — resort operations manager</b>, <b>The Resort Management Office</b>, and <b>Ignored snowpack monitoring & a slope kept open</b> in the correct combination.",
        "The analysis is brief, yet it points directly to the snow profiles, hazard rating, and management instruction needed for a full operational review."
      ]
    },
    "overclaim": {
      "title": "A Blast Without a Bomb Trail",
      "body": [
        "You choose <b>A charge set off deliberately</b>, treating the sudden release as proof that someone intentionally triggered the slope.",
        "The explosive records do not support the claim, and the dramatic accusation lets the known snowpack and reopening decision fade into background controversy."
      ]
    },
    "dismissal": {
      "title": "An Act of God With Daily Bulletins",
      "body": [
        "You accept <b>A freak slide beyond any warning — an act of God</b>, as though uncertainty in release timing made the weak layer and loading impossible to act upon.",
        "That answer empties forecasting of purpose. The same operational pressure can overrule the next high hazard rating until another slope supplies certainty through casualties."
      ]
    },
    "wrongNames": {
      "title": "The Hazard Found, the Order Misassigned",
      "body": [
        "You recognize <b>Ignored snowpack monitoring & a slope kept open</b>, but blame the forecaster or patrol director rather than the official who kept the run open. The signed reopening record points instead to"
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A fractured snow slab descending a mountain\"><path d=\"M18 112 L192 22 L330 112 Z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.6\"/><path d=\"M88 74 L168 42 L248 80\" fill=\"none\" stroke=\"#e2e2d8\" stroke-width=\"1.2\"/><path d=\"M166 44 L204 66 L184 86 L222 108\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2.2\"/><path d=\"M338 106 C404 76,486 70,630 92\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/></svg>"
}};
