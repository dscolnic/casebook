// Casebook V3 — three informants, three readings, one clue per correct answer.
module.exports = { PACK: {
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "e_wildfire",
  "title": "The Pinehaven Fire",
  "discipline": "Wildfire & Combustion Science",
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
  "DAYS_TOTAL": 3,
  "teaser": "A lightning fire crossed a ridge and erased a mountain town in an afternoon. Was it coordinated arson, did deferred preparation and a held evacuation create the disaster, or did a verified wind-and-ember event exceed the planning envelope despite timely action?",
  "overclaimTag": "coordinated arson",
  "truthTag": "a natural fire beyond the adopted envelope",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A wind-driven wildfire crossing a ridge and sending embers toward a town\"><path d=\"M20 105 C140 58 230 95 345 48 S520 70 640 28\" fill=\"none\" stroke=\"#121212\" stroke-width=\"3\"/><path d=\"M75 93 l16-30 16 30 M155 77 l18-34 18 34 M265 70 l18-36 18 36\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2\"/><g fill=\"#B3261E\"><circle cx=\"330\" cy=\"42\" r=\"4\"/><circle cx=\"370\" cy=\"31\" r=\"3\"/><circle cx=\"410\" cy=\"22\" r=\"4\"/><circle cx=\"455\" cy=\"38\" r=\"3\"/></g><path d=\"M500 95 h80 v28 h-80z M590 88 h45 v35 h-45z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/></svg>",
  "overclaimTease": "A destructive outcome does not by itself identify negligence or arson. Test the origin, compare actual conditions with the plan, and measure whether protection standards were exceeded.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "natural",
      "items": [
        {
          "id": "chief",
          "label": "Garrett Pyle — the forest district fire chief"
        },
        {
          "id": "sheriff",
          "label": "The county sheriff directing evacuation"
        },
        {
          "id": "natural",
          "label": "An act of nature — a lightning and extreme-wind event, not a person"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "ridge",
      "items": [
        {
          "id": "ridge",
          "label": "Pinehaven Ridge & the Lightning Origin"
        },
        {
          "id": "firecamp",
          "label": "The Incident Command Post"
        },
        {
          "id": "office",
          "label": "The Forest District Planning Office"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "freak",
      "items": [
        {
          "id": "freak",
          "label": "A natural fire exceeded the verified planning and protection envelope"
        },
        {
          "id": "arson",
          "label": "Coordinated arson created several linked ignition points"
        },
        {
          "id": "deferred",
          "label": "Deferred fuel work and a delayed evacuation produced the losses"
        }
      ]
    }
  },
  "READING_ORDER": [
    "lookout",
    "dispatcher",
    "clerk"
  ],
  "CHARACTERS": {
    "lookout": {
      "name": "Lookout Wren",
      "role": "Fire lookout",
      "face": "🔭",
      "badge": "W",
      "legend": "the ridge origin",
      "hint": "Two lightning systems and the first camera frame fix one dry-strike ignition on the ridge.",
      "reading": "byram"
    },
    "dispatcher": {
      "name": "The Dispatcher",
      "role": "Incident dispatcher",
      "face": "📻",
      "badge": "D",
      "legend": "the command timeline",
      "hint": "Warnings and evacuation followed the written triggers before an unprecedented wind burst cut the road.",
      "reading": "rothermel"
    },
    "clerk": {
      "name": "The Mitigation Survey Clerk",
      "role": "Building and exposure-records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the loss survey",
      "hint": "Compliant homes faced ember densities beyond the tests underlying the adopted standard.",
      "reading": "cohen"
    }
  },
  "TOPICS": {
    "byram": {
      "sci": "George Byram (1909-1996)",
      "topic": "Fireline intensity and extreme fire behavior",
      "lede": "George Byram gave firefighters a way to express how much heat a moving fire releases along each metre of its front.",
      "no": 1,
      "profile": "George M. Byram was a U.S. Forest Service fire researcher whose work helped make wildfire behavior measurable. He studied combustion, wind, convection, and the energy released by forest fuels. His best-known quantity, Byram’s fireline intensity, combines the heat yield of the fuel, the mass consumed in the flaming front, and the rate at which that front advances. It expresses heat release per unit length of fireline and helps distinguish fires that hand crews can approach from fires that overwhelm direct attack.\n\nIntensity is not the same as burned area or flame appearance. A narrow front moving rapidly through dense dry fuel can release enormous energy. Byram also investigated blowup behavior, in which atmospheric instability, wind, terrain, and fire-generated convection interact to produce sudden acceleration. Under extreme conditions, spotting embers cross control lines and suppression tactics that work on ordinary days cease to be viable.\n\nA high-intensity fire can still have a preventable ignition or delayed response. Investigators therefore separate cause from behavior. Lightning networks, power-system logs, cameras, and burn patterns can locate ignition. Fuel measurements, wind observations, and spread rates then show whether a response plan was exceeded or merely ignored.\n\nPinehaven’s ignition was recorded by two lightning-detection systems within seconds of a dry strike on the ridge. No second origin, accelerant pattern, or human access trail appears. The exceptional feature is what followed: downslope winds doubled beyond the incident plan while very dry fuels produced fireline intensity above the threshold for direct attack. Byram’s measure does not excuse every loss, but it tests the central claim fairly. The initial crews and evacuation order matched the approved triggers; the fire’s energy and spotting distance then exceeded the planning envelope faster than alternate lines could be established.",
      "frame": "Writes the measured spread rate and fuel consumption across a map of the ridge. “A flame can look like arson and still be physics. First calculate what crews were actually facing.”",
      "q": [
        {
          "q": "What does Byram’s fireline intensity measure?",
          "o": [
            {
              "t": "The probability that investigators should classify a fast fire as arson.",
              "v": "danger",
              "fb": "Rapid, intense behavior can arise from natural ignition and extreme environmental conditions."
            },
            {
              "t": "The total number of hectares that will eventually burn in the incident.",
              "v": "partial",
              "fb": "Area describes extent, while intensity describes energy release at the active line."
            },
            {
              "t": "The temperature of the hottest flame measured at one observation point.",
              "v": "wrong",
              "fb": "A single temperature does not capture the moving front’s heat-release rate."
            },
            {
              "t": "Heat released each second along a unit length of the flaming front.",
              "v": "expert",
              "fb": "Fireline intensity combines energy, consumed fuel, and rate of spread along the front."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — lead",
            "text": "Measured fuel consumption and spread produced intensity beyond the direct-attack range assumed in the incident plan."
          }
        },
        {
          "q": "Which evidence best separates a natural lightning ignition from coordinated arson?",
          "o": [
            {
              "t": "Timed lightning data, one origin, and absence of separate human ignition trails.",
              "v": "expert",
              "fb": "Independent ignition timing and origin evidence identify cause without relying on the later severity."
            },
            {
              "t": "The fire spread rapidly enough that eyewitnesses could not approach the origin.",
              "v": "partial",
              "fb": "Limited access makes observation harder but does not positively identify lightning."
            },
            {
              "t": "The flames produced several spot fires beyond the first line through ember transport.",
              "v": "wrong",
              "fb": "Spot fires are expected ember ignitions from one intense wildfire, not separate arson origins."
            },
            {
              "t": "A destructive outcome should be attributed to a person so the inquiry has accountability.",
              "v": "danger",
              "fb": "Accountability must follow evidence; harm alone cannot create a human culprit."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — lead",
            "text": "Independent lightning detections coincide with the single origin before any human access appears on cameras or gate logs."
          }
        },
        {
          "q": "Where does the earliest causal evidence converge?",
          "o": [
            {
              "t": "Inside the forest district office where fuel budgets were approved years earlier.",
              "v": "wrong",
              "fb": "Budget history may matter in another case but does not locate this natural strike."
            },
            {
              "t": "At the ridge origin where strike timing and the first burn pattern coincide.",
              "v": "expert",
              "fb": "Ignition location is fixed by independent temporal and physical evidence at the origin."
            },
            {
              "t": "At whichever location suffered the greatest property loss after the fire expanded.",
              "v": "danger",
              "fb": "Damage severity identifies consequence rather than where the fire began."
            },
            {
              "t": "At the incident command post where the first resource order was recorded.",
              "v": "partial",
              "fb": "Command records begin the response timeline, not the ignition mechanism."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — lead",
            "text": "Lightning location, first smoke image, and initial burn scar converge on the exposed Pinehaven Ridge."
          }
        }
      ]
    },
    "rothermel": {
      "sci": "Richard Rothermel (1929-2023)",
      "topic": "The mathematical model of wildfire spread",
      "lede": "Richard Rothermel translated fuel, moisture, wind, and slope into a practical estimate of how quickly a surface fire will move.",
      "no": 2,
      "profile": "Richard Rothermel was an American aeronautical engineer who became a landmark wildfire scientist at the U.S. Forest Service’s Northern Forest Fire Laboratory in Missoula. Drawing on laboratory burns and combustion theory, he developed the 1972 surface-fire spread model that still underlies widely used fire-behavior tools.\n\nThe model balances heat produced by the flame with the energy required to ignite unburned fuel ahead. Fuel loading, particle size, moisture, mineral content, wind, and slope alter that balance. Wind bends flames toward fresh fuel and carries heat forward; slope brings uphill fuel closer to the flame. The output is an expected rate of spread for a specified fuel bed and environment.\n\nRothermel did not claim that a single calculation predicts every wildfire. Real landscapes are heterogeneous, winds change, crown fire and long-range spotting require additional treatment, and inputs may be uncertain. Models are decision aids whose domain and assumptions must be known. Comparing forecasts with observed weather can reveal whether a plan was ignored or whether the event moved outside its design basis.\n\nAt Pinehaven, the pre-incident plan used a severe but historically supported wind scenario. The observed downslope burst was substantially stronger and arrived earlier than any station record used in that plan. When investigators insert the measured gusts, fuel moisture, and slope into the spread calculation, the observed advance is no longer mysterious. It also leaves little time between first detection and road cutoff. Dispatch records show the warning and evacuation triggers were executed at their stated thresholds. Rothermel’s method therefore cuts against two attractive narratives: fast spread is not proof of multiple arsonists, and the mere existence of fuel does not prove that ordinary management failure caused this particular run. The model shows a rare combination exceeding a defensible forecast envelope.",
      "frame": "Updates the spread model with the actual gusts and watches the arrival line jump across the evacuation road. “A model can fail because people ignored it—or because the atmosphere supplied a case outside its inputs.”",
      "q": [
        {
          "q": "Which variables are central to the Rothermel surface-fire spread model?",
          "o": [
            {
              "t": "Flame temperature by itself, because spread is independent of fuel arrangement.",
              "v": "wrong",
              "fb": "Fuel geometry and moisture strongly affect whether heat ignites the next particles."
            },
            {
              "t": "An arson multiplier inserted whenever a fast fire outruns its first official forecast.",
              "v": "danger",
              "fb": "A model should explain behavior from measured conditions rather than insert motive as a parameter."
            },
            {
              "t": "Fuel properties, moisture, wind, and slope governing heat transfer to new fuel.",
              "v": "expert",
              "fb": "The model relates the fuel bed and environment to the rate of fire spread."
            },
            {
              "t": "Population density, road capacity, and the number of responding fire engines.",
              "v": "partial",
              "fb": "Those variables affect consequences and response, not the physical spread equation itself."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — corroboration",
            "text": "Actual wind and fuel-moisture inputs reproduce the extraordinary run only after exceeding the severe planning scenario."
          }
        },
        {
          "q": "How can a model help distinguish ignored planning from a genuine exceedance event?",
          "o": [
            {
              "t": "Treat any difference between forecast and outcome as evidence the model was useless.",
              "v": "wrong",
              "fb": "Model error requires diagnosis; it does not erase the information in assumptions and observations."
            },
            {
              "t": "Assume the plan was negligent whenever a rare event causes severe damage.",
              "v": "danger",
              "fb": "Severity alone does not establish that the original planning range was unreasonable."
            },
            {
              "t": "Select the model run that most closely matches the outcome after all choices are known.",
              "v": "partial",
              "fb": "After-the-fact matching can overfit unless the original assumptions and independent data remain visible."
            },
            {
              "t": "Compare the plan’s stated input range with verified conditions and observed spread.",
              "v": "expert",
              "fb": "The comparison tests whether decision-makers ignored expected conditions or faced verified inputs outside them."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — corroboration",
            "text": "Weather stations on and below the ridge record the unprecedented wind burst that shifts the modeled arrival line."
          }
        },
        {
          "q": "What record weighs most strongly against blaming the incident commander for holding evacuation?",
          "o": [
            {
              "t": "Timestamped warnings show the stated trigger produced an immediate evacuation order.",
              "v": "expert",
              "fb": "The trigger-to-order timeline tests the specific allegation that action was deliberately delayed."
            },
            {
              "t": "An emergency chief bears no responsibility when lightning supplies the ignition.",
              "v": "danger",
              "fb": "Natural ignition does not remove response responsibility; the documented timing does the exonerating here."
            },
            {
              "t": "The commander had led several previous fires without a fatal evacuation failure.",
              "v": "partial",
              "fb": "Past performance provides context but does not prove conduct in this incident."
            },
            {
              "t": "The command post remained operational until smoke entered the valley.",
              "v": "wrong",
              "fb": "Command-post endurance does not establish when public warning decisions were made."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — corroboration",
            "text": "The evacuation order was issued when the plan’s trigger was reached, before the extraordinary wind burst accelerated the fire."
          }
        }
      ]
    },
    "cohen": {
      "sci": "Jack Cohen (wildfire scientist)",
      "topic": "The home-ignition zone and ember exposure",
      "lede": "Jack Cohen showed that homes often ignite from local fuels and embers rather than from a continuous wall of forest flame.",
      "no": 3,
      "profile": "Jack Cohen is a U.S. Forest Service fire scientist known for research on how buildings ignite during wildland-urban interface fires. After destructive fires, public images often suggest that a giant flame front simply sweeps through a town. Cohen’s experiments and field studies emphasized the home-ignition zone: the building and its immediate surroundings, including roofs, vents, decks, vegetation, and nearby combustible material.\n\nWindborne embers can travel far ahead of the main fire. They collect in gutters, enter vents, lodge beneath decks, and ignite ornamental plants or stored materials. Whether a house survives depends strongly on construction and conditions within tens of metres, not only on the distant forest. This insight supports fire-resistant roofs, screened vents, clearance near structures, and attention to small receptive fuels.\n\nThe approach does not promise immunity. Exposure can exceed tested conditions. Extremely dense ember showers, structural damage from wind, and simultaneous ignitions can overwhelm otherwise compliant homes and municipal response. Investigators should compare construction, defensible space, ember density, and neighboring ignitions rather than assuming either perfect protection or inevitable destruction.\n\nPinehaven’s post-fire survey found that many buildings met the adopted roof, vent, and clearance requirements. Instrumented sites recorded an ember flux far above the design tests used when those requirements were established, driven by the same exceptional wind burst that crossed the ridge. Some vulnerable properties ignited first, but fire then spread among structures after roads were already cut off. Cohen’s lesson completes a difficult conclusion: mitigation remains valuable, yet this event cannot be reduced to a district chief’s skipped fuel project or a sheriff’s delayed order. The physical exposure exceeded the planning and building assumptions in force, after a natural ignition and timely response.",
      "frame": "Compares screened vents and cleared yards with melted ember collectors. “Prepared does not mean invulnerable. The question is whether the exposure remained inside the protection standard.”",
      "q": [
        {
          "q": "What is the home-ignition zone?",
          "o": [
            {
              "t": "The full forest watershed from which smoke can eventually reach a community.",
              "v": "partial",
              "fb": "The wider landscape shapes exposure, but the home-ignition zone is much more local."
            },
            {
              "t": "The building and nearby surroundings that determine whether embers and heat ignite it.",
              "v": "expert",
              "fb": "Cohen’s zone focuses on the structure and nearby fuels that control ignition susceptibility."
            },
            {
              "t": "The interior room where firefighters first discover open flame during overhaul.",
              "v": "wrong",
              "fb": "Interior discovery may occur after ignition and does not define the relevant exposure area."
            },
            {
              "t": "A legal boundary proving landowners outside it have no wildfire responsibility.",
              "v": "danger",
              "fb": "The concept guides mitigation and evidence; it is not a boundary eliminating responsibility."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE — decisive",
            "text": "The decisive physical chain begins on Pinehaven Ridge and continues through measured ember exposure into compliant neighborhoods."
          }
        },
        {
          "q": "When can compliant mitigation still be overwhelmed?",
          "o": [
            {
              "t": "Whenever one neighboring property has less defensible space than the others.",
              "v": "partial",
              "fb": "A vulnerable neighbor raises risk but does not automatically overwhelm compliant construction."
            },
            {
              "t": "Screened vents and a cleared yard make survival certain in every wildfire.",
              "v": "wrong",
              "fb": "No practical building measure guarantees survival under unlimited exposure."
            },
            {
              "t": "When ember density, wind damage, and simultaneous ignitions exceed design assumptions.",
              "v": "expert",
              "fb": "Mitigation lowers risk within a range; exceptional exposure can still exceed that range."
            },
            {
              "t": "When arsonists place ignition devices directly against several buildings.",
              "v": "danger",
              "fb": "Extreme natural ember storms can create widespread ignitions without placed devices."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT — decisive",
            "text": "Ember collectors and wind records document exposure beyond the tests underlying the adopted construction and clearance standard."
          }
        },
        {
          "q": "What final finding supports the conclusion that no candidate official caused the disaster?",
          "o": [
            {
              "t": "No official admits a mistake in interviews, despite the complete operational record.",
              "v": "partial",
              "fb": "Denials are weak evidence without records and independent measurements."
            },
            {
              "t": "The fire caused so much damage that scientific investigation has no path to responsibility.",
              "v": "wrong",
              "fb": "Severe damage increases the need for analysis rather than making causation unknowable."
            },
            {
              "t": "Natural hazards automatically excuse every preparation and response decision.",
              "v": "danger",
              "fb": "Natural origin does not excuse negligence; this case is exculpatory because the actions and limits were tested."
            },
            {
              "t": "Independent records show natural ignition, timely action, and conditions beyond the plan.",
              "v": "expert",
              "fb": "The conclusion rests on positive evidence across ignition, decisions, and physical exceedance."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO — decisive",
            "text": "Lightning, timely triggers, compliant mitigation, and a verified code-exceeding wind-and-ember event align without a culpable intervention."
          }
        }
      ]
    }
  },
  "story": [
    "<b>A lightning strike became a firestorm that crossed Pinehaven Ridge and reached the town before alternate lines could be built.</b>",
    "Lookout Wren holds the origin and intensity evidence. The Dispatcher can reconstruct warning and evacuation timing. The mitigation clerk has building compliance and ember-exposure measurements.",
    "The losses may reflect coordinated arson, deferred preparation and delayed evacuation, or a natural combination that exceeded the planning and protection envelope despite timely action.",
    "Nine clues test ignition, modeled spread, decision timing, and structure-level exposure before assigning a human culprit."
  ],
  "endings": {
    "overclaimWhat": "arson",
    "dismissalWhat": "deferred",
    "win": {
      "expertTitle": "The Event Outside the Envelope",
      "expert": [
        "You connect no culpable actor, Pinehaven Ridge, and a natural fire that exceeded the verified planning and protection envelope. Lightning, intensity, spread modeling, response timing, and ember exposure agree.",
        "There was no coordinated arson pattern, but the losses also cannot be assigned to deferred fuel work or a held evacuation order. The approved triggers were followed before a rare wind-and-ember event exceeded their defensible design basis."
      ],
      "soundTitle": "The Natural Exceedance",
      "sound": [
        "Your accusation identifies the ridge origin, the no-fault event, and the conditions beyond the planning envelope.",
        "Some intensity or mitigation details remain incomplete, but the independent timelines support the finding."
      ],
      "namedTitle": "Right Event, Limited Measurement",
      "named": [
        "You select the correct WHO, WHERE, and WHAT.",
        "The conclusion is right, although missed clues leave the exceedance of response or building assumptions less fully quantified."
      ]
    },
    "overclaim": {
      "title": "One Lightning Origin, Not Coordinated Arson",
      "body": [
        "Independent strike detections, imagery, and the burn scar converge on one natural ignition with no separate human access trail.",
        "Spot fires were created by extreme ember transport rather than multiple placed devices."
      ]
    },
    "dismissal": {
      "title": "The Documented Actions Met the Adopted Triggers",
      "body": [
        "Evacuation began at the written threshold, and mitigation surveys show broad compliance with the standard then in force.",
        "A familiar neglect narrative does not fit the verified timing and code-exceeding exposure in this event."
      ]
    },
    "wrongNames": {
      "title": "The Rare Event, Mislocated",
      "body": [
        "You recognize the exceedance but place it away from the lightning origin and physical measurements that establish the no-fault chain."
      ]
    }
  }
}
};
