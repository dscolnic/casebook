// Casebook V3 — three informants, three readings, one clue per correct answer.
module.exports = { PACK: {
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "e_flood",
  "title": "The Rossmere Flood",
  "discipline": "Hydrology & Flood Science",
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
  "teaser": "A canyon town is struck by a night flood after rainfall fills the entire upper basin. Did someone manipulate the dam, did officials ignore a forecastable rise, or did a rare storm exceed the network’s measured design envelope despite the planned response?",
  "overclaimTag": "deliberate manipulation of the reservoir",
  "truthTag": "a basin-wide hydrologic extreme beyond the mapped envelope",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"Tributary gauges rising together above a canyon town\"><path d=\"M20 28 C120 34,160 20,250 34 S430 24,640 36\" fill=\"none\" stroke=\"#e2e2d8\" stroke-width=\"2\"/><path d=\"M40 108 C150 70,210 116,320 72 S510 100,620 54\" fill=\"none\" stroke=\"#326891\" stroke-width=\"4\"/><path d=\"M105 44 v42 M240 40 v46 M382 42 v44\" stroke=\"#121212\" stroke-width=\"2\"/><circle cx=\"105\" cy=\"64\" r=\"5\" fill=\"#B3261E\"/><circle cx=\"240\" cy=\"60\" r=\"5\" fill=\"#B3261E\"/><circle cx=\"382\" cy=\"62\" r=\"5\" fill=\"#B3261E\"/><path d=\"M505 91 h74 v28 h-74z\" fill=\"none\" stroke=\"#121212\" stroke-width=\"2\"/></svg>",
  "overclaimTease": "The dam is the most visible machine in the valley, but a natural flood should announce itself first across separated tributaries and then arrive in the order a runoff model predicts.",
  "DAYS_TOTAL": 3,
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "storm",
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
          "id": "storm",
          "label": "An act of nature — the basin-wide storm, not a person"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "gauges",
      "items": [
        {
          "id": "gauges",
          "label": "The Upper Creek & Gauge Network"
        },
        {
          "id": "office",
          "label": "The Water District Planning Office"
        },
        {
          "id": "controlroom",
          "label": "The Dam Control Room"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "freak",
      "items": [
        {
          "id": "ignored",
          "label": "A forecastable rise was missed after gauges and maps were neglected"
        },
        {
          "id": "freak",
          "label": "An exceptional basin storm exceeded the measured design envelope"
        },
        {
          "id": "sabotage",
          "label": "A deliberate gate action released the destructive surge"
        }
      ]
    }
  },
  "READING_ORDER": [
    "gaugekeeper",
    "operator",
    "clerk"
  ],
  "CHARACTERS": {
    "gaugekeeper": {
      "name": "Gauge Keeper Wynn",
      "role": "Stream-gauge keeper",
      "face": "💧",
      "badge": "W",
      "legend": "the upper gauge line",
      "hint": "Separated tributaries rose before any reservoir release, and every working station recorded the same exceptional storm pulse.",
      "reading": "newell"
    },
    "operator": {
      "name": "The Gate Operator",
      "role": "Dam gate operator",
      "face": "🎚️",
      "badge": "G",
      "legend": "the control room",
      "hint": "Gate movement followed the emergency schedule after the natural inflow was already above the spillway forecast.",
      "reading": "sherman"
    },
    "clerk": {
      "name": "The Floodplain Clerk",
      "role": "Hazard-map and response clerk",
      "face": "🗺️",
      "badge": "C",
      "legend": "the planning archive",
      "hint": "The response plan was used as written; the observed crest lay outside the mapped confidence band.",
      "reading": "white"
    }
  },
  "TOPICS": {
    "newell": {
      "sci": "Frederick H. Newell (1862-1932)",
      "topic": "Stream gauging & the hydrographic survey",
      "lede": "Newell built the measurement network that turned a river’s rise from rumor into a timed, basin-wide record.",
      "no": 1,
      "profile": "Frederick Haynes Newell joined the young United States Geological Survey in the late nineteenth century, when rivers were usually described by anecdote rather than continuous measurement. He organized a national program of stream gauging and helped turn scattered observations into repeatable records. At a gauge, observers measure stage, the height of water, and periodically measure discharge. Those paired observations establish a rating curve that converts a continuous stage record into an estimate of flow.\n\nNewell understood that one station cannot describe a watershed. Rain falls unevenly, tributaries respond at different speeds, and reservoirs receive water assembled from many channels. A useful network therefore places instruments upstream, downstream, and on major branches. The order in which stations rise becomes evidence: a natural basin storm produces a travelling pattern, whereas a sudden gate release begins at the dam and propagates downstream.\n\nThe same records support engineering design. Long sequences reveal ordinary seasons, previous extremes, and the uncertainty around events rarer than the observation period. A new record can exceed every earlier point without implying that the instruments failed or that someone manufactured the water. It means the estimated tail of the distribution must be revised.\n\nRossmere’s surviving gauge traces can be read in Newell’s sequence. Remote tributaries rose first, then converged on the reservoir, while the downstream station responded later. That ordering tests sabotage more directly than the drama at the dam. It also tests neglect: the active stations transmitted throughout the storm, giving operators the same extraordinary but rapidly escalating inflow that the archive now shows.",
      "frame": "Wynn lays three synchronized gauge traces across the table. “Read the order, not the headline. A flood tells you where it began if the stations are far enough apart.”",
      "q": [
        {
          "q": "What does a stream-gauge rating curve allow hydrologists to estimate?",
          "o": [
            {
              "t": "Continuous river discharge from repeated relations between water level and measured flow.",
              "v": "expert",
              "fb": "Exactly: paired stage and discharge measurements turn a level record into a flow history."
            },
            {
              "t": "Rainfall depth near the station from the speed at which the channel surface rises.",
              "v": "partial",
              "fb": "Stage responds to rainfall, but a gauge cannot infer local rainfall depth from rise speed alone."
            },
            {
              "t": "Sediment grain size from the maximum stage reached during each flood season.",
              "v": "wrong",
              "fb": "Sediment affects channels, yet a rating curve is built to convert stage into discharge."
            },
            {
              "t": "Whether a dam operator opened a gate by reading one downstream water mark alone.",
              "v": "danger",
              "fb": "One mark lacks the network timing needed to distinguish a release from basin runoff."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "Newell’s network shows separated upstream stations rising before any control-room action, leaving no human command at the beginning of the flood sequence."
          }
        },
        {
          "q": "Which station pattern most strongly indicates basin runoff rather than a dam release?",
          "o": [
            {
              "t": "Mainly the gauge below the dam jumps while upstream tributaries remain near seasonal levels.",
              "v": "partial",
              "fb": "A downstream-only jump would point toward a release or local failure, not distributed runoff."
            },
            {
              "t": "Several tributaries crest in travel-time order before the reservoir and downstream gauge.",
              "v": "expert",
              "fb": "That staggered upstream-to-downstream progression is the signature of water assembled across a basin."
            },
            {
              "t": "nearly every station reports an identical value at the same minute despite different channel sizes.",
              "v": "wrong",
              "fb": "Identical simultaneous values suggest a data problem rather than a physical flood wave."
            },
            {
              "t": "The control-room display goes blank shortly before a single downstream station rises.",
              "v": "danger",
              "fb": "A blank display creates uncertainty but does not supply the positive upstream sequence seen here."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "The rise travelled from multiple tributaries into the reservoir in the order expected from a basin-wide storm, not outward from a breached or opened dam."
          }
        },
        {
          "q": "Why can a measured flood exceed every event in a short historical record?",
          "o": [
            {
              "t": "A functioning gauge gradually exaggerates large flows as its metal components become older.",
              "v": "partial",
              "fb": "Age can affect instruments, but calibration checks—not automatic exaggeration—address that concern."
            },
            {
              "t": "Rivers possess a fixed maximum discharge equal to the largest event previously recorded.",
              "v": "wrong",
              "fb": "A record maximum is not a physical ceiling on what the basin can produce."
            },
            {
              "t": "The observation period may not yet contain the rare tail of the watershed’s possible extremes.",
              "v": "expert",
              "fb": "Records sample probability; a rare but physical event can exceed all earlier observations."
            },
            {
              "t": "Any new record above the old maximum strongly suggests that an operator altered the hydrograph.",
              "v": "danger",
              "fb": "Exceeding a record is evidence of rarity, not by itself evidence of manipulation."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The first decisive evidence sits in the upper gauge archive, where independent stations recorded the storm before the reservoir became the focus."
          }
        }
      ]
    },
    "sherman": {
      "sci": "LeRoy K. Sherman (1869-1954)",
      "topic": "The unit hydrograph",
      "lede": "Sherman found a reusable fingerprint for how a watershed converts a pulse of rain into a river crest.",
      "no": 2,
      "profile": "LeRoy Sherman was an American hydrologist who gave engineers a practical way to connect a burst of rainfall with the river response that follows. In 1932 he introduced the unit hydrograph: the characteristic discharge curve produced by one unit of effective rainfall spread uniformly over a watershed for a specified duration. The method separates the catchment’s response from the particular size of a storm.\n\nOnce a unit hydrograph is derived from observed events, larger or more complex storms can be represented by scaling and adding shifted copies of that response. The approach assumes approximate linearity and a stable basin, conditions that are never perfect, but it supplies a disciplined timing test. Rainfall becomes runoff after infiltration and storage; tributaries deliver their portions; the combined hydrograph rises, peaks, and recedes. A dam release has a different origin and may impose a sharper downstream signal.\n\nSherman’s method also explains why peak flow is not determined by total rainfall alone. Duration, spatial distribution, antecedent wetness, and the timing of tributary contributions control whether runoff arrives together. When a large storm aligns those contributions, the peak can grow far beyond familiar floods even without a mechanical failure.\n\nAt Rossmere, the rainfall record and established basin response reproduce the observed inflow peak within the uncertainty expected for an extreme event. The gate log begins after that rise, and the downstream curve is the routed continuation of the same volume. Sherman’s hydrograph does not excuse careless operation; it asks whether the water balance requires it. Here the storm supplies the volume and timing before any disputed human action is introduced.",
      "frame": "The operator sketches rainfall bars over the inflow curve. “Before you accuse anyone at these gates, show me whether the storm can make the hydrograph by itself.”",
      "q": [
        {
          "q": "What is held constant in Sherman’s idea of a unit hydrograph?",
          "o": [
            {
              "t": "The exact river stage produced by nearly every storm regardless of soil wetness or duration.",
              "v": "partial",
              "fb": "Real hydrographs vary with storm structure and antecedent conditions; stage is not fixed."
            },
            {
              "t": "The dam-gate position needed to keep downstream discharge at a fixed safe value.",
              "v": "wrong",
              "fb": "Gate operation is not the defining quantity in Sherman’s runoff-response method."
            },
            {
              "t": "The annual probability that any rainfall event will become a destructive flood.",
              "v": "danger",
              "fb": "Frequency analysis is separate from the response curve represented by a unit hydrograph."
            },
            {
              "t": "The watershed response to one specified unit and duration of effective rainfall.",
              "v": "expert",
              "fb": "A unit hydrograph represents the basin response to a defined effective-rainfall input."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "Sherman’s reconstructed hydrograph reaches the observed peak using the measured rainfall alone; no hidden release is needed to supply the flood volume."
          }
        },
        {
          "q": "How can two storms with the same total rainfall produce different flood peaks?",
          "o": [
            {
              "t": "Their duration and tributary timing can either spread runoff out or make contributions coincide.",
              "v": "expert",
              "fb": "Runoff timing controls whether flows overlap at the outlet and amplify the crest."
            },
            {
              "t": "A watershed converts equal rainfall totals into identical peaks once its channel map is known.",
              "v": "partial",
              "fb": "Equal totals do not guarantee equal temporal or spatial distributions across a basin."
            },
            {
              "t": "Peak flow depends mainly on the reservoir operator’s final gate setting during the event.",
              "v": "wrong",
              "fb": "Gate settings may affect routing, but they do not erase the storm’s runoff timing."
            },
            {
              "t": "The larger peak would need to come from a failed gauge because rainfall volume was unchanged.",
              "v": "danger",
              "fb": "Different peaks can arise physically without any instrument failure."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The control-room log shows the emergency gate sequence beginning only after the natural inflow hydrograph was already climbing past the ordinary operating band."
          }
        },
        {
          "q": "Which comparison best tests whether the operator created the Rossmere surge?",
          "o": [
            {
              "t": "Inspect the operator’s demeanor and decide whether the late release appeared suspicious.",
              "v": "partial",
              "fb": "Behavior is not a substitute for hydrologic timing and volume."
            },
            {
              "t": "Route the measured inflow and gate history forward, then compare the predicted downstream curve.",
              "v": "expert",
              "fb": "A routed water balance tests whether the documented operations explain or merely follow the surge."
            },
            {
              "t": "Compare mainly the final flood depth with the maximum level printed on an old wall chart.",
              "v": "wrong",
              "fb": "One final depth discards the sequence needed to identify the source of the water."
            },
            {
              "t": "Assume any release during a disaster caused the disaster, regardless of its timing or volume.",
              "v": "danger",
              "fb": "Causation depends on the counterfactual hydrograph, not the mere presence of gate movement."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The routed record places the operator’s actions after the unavoidable inflow peak and shows those actions following the approved emergency rule rather than creating the event."
          }
        }
      ]
    },
    "white": {
      "sci": "Gilbert F. White (1911-2006)",
      "topic": "Floodplain management & flood risk",
      "lede": "White taught governments that a flood map is a decision under uncertainty, not a wall around possibility.",
      "no": 3,
      "profile": "Gilbert F. White changed flood policy by arguing that societies should not answer every river hazard with a larger wall. Trained as a geographer, he studied how people choose among structural defenses, warnings, insurance, zoning, evacuation, and adaptation. His doctoral work on human adjustment to floods became a foundation of modern floodplain management.\n\nWhite emphasized that maps and design standards are decision tools, not promises. A “hundred-year” flood is a probability statement—roughly a one-percent annual chance under assumed conditions—not an event scheduled once per century. Estimates shift as records lengthen, land use changes, and extreme storms reveal parts of the distribution that were previously unseen. A mapped boundary therefore carries uncertainty on both sides.\n\nHe also examined the paradox of protection. Levees and reservoirs can reduce frequent losses while encouraging more development behind them, increasing exposure when a larger event arrives. Good policy combines defenses with land-use choices, public communication, and plans for exceedance. Evaluating a disaster requires asking whether decision-makers ignored known risk, or whether a prepared system encountered an event outside the evidence available when its plan was set.\n\nRossmere’s archive contains an adopted flood map, an evacuation trigger, and the messages that activated it. The town still suffered because the storm crest rose beyond the upper uncertainty band used in those documents and cut the only evacuation road early. White’s framework does not call that outcome harmless. It distinguishes an imperfect but followed plan from a suppressed study, and a rare natural exceedance from a sabotage story that the basin record cannot support.",
      "frame": "The clerk opens the adopted map beside its uncertainty notes. “A line on paper can be crossed honestly or ignored dishonestly. Tell me which record distinguishes them.”",
      "q": [
        {
          "q": "What does a “hundred-year flood” mean in floodplain planning?",
          "o": [
            {
              "t": "The largest flood that can occur during each fixed one-hundred-year calendar interval.",
              "v": "partial",
              "fb": "Several such floods can occur close together, or none may occur for centuries."
            },
            {
              "t": "A flood that returns exactly one century after the previous event at the same location.",
              "v": "wrong",
              "fb": "Flood probabilities do not reset according to the date of the last event."
            },
            {
              "t": "An event with about a one-percent chance in any year under the model’s assumptions.",
              "v": "expert",
              "fb": "The term expresses annual probability, not a schedule or a physical maximum."
            },
            {
              "t": "A level that engineering works are guaranteed to contain whenever records are complete.",
              "v": "danger",
              "fb": "Design standards reduce risk but do not guarantee containment of every possible event."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "White’s planning file places the observed crest beyond the mapped uncertainty band, while the adopted response documents remain intact in the district archive."
          }
        },
        {
          "q": "Which finding would support neglect rather than an honest exceedance?",
          "o": [
            {
              "t": "The observed flood rose above all events in the limited gauge record after an extreme storm.",
              "v": "partial",
              "fb": "A record exceedance alone does not show that anyone possessed better information beforehand."
            },
            {
              "t": "The evacuation road flooded earlier than expected even though the published trigger was used.",
              "v": "wrong",
              "fb": "A plan can fail under an extreme event even when its stated trigger is followed."
            },
            {
              "t": "Uncertainty widened when the record was updated to include the new extreme observation.",
              "v": "danger",
              "fb": "Revised uncertainty is the expected scientific response to new evidence."
            },
            {
              "t": "A newer hazard study predicted the crest and was withheld from the people using the old map.",
              "v": "expert",
              "fb": "Suppressing a decision-relevant study would turn uncertainty into a preventable governance failure."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The complete planning correspondence contains no buried replacement map or cancelled alert; the named officials used the information available before the storm."
          }
        },
        {
          "q": "Why did White warn against relying on one structural defense alone?",
          "o": [
            {
              "t": "Protection can encourage exposure, so land use, warnings, and exceedance plans must share the job.",
              "v": "expert",
              "fb": "White treated flood safety as a portfolio of adjustments rather than a single barrier."
            },
            {
              "t": "Flood walls increase rainfall over the basin by trapping moist air near the river valley.",
              "v": "partial",
              "fb": "Flood defenses do not create basin rainfall through local atmospheric trapping."
            },
            {
              "t": "Reservoirs eliminate small floods but inevitably generate nearly every catastrophic flood downstream.",
              "v": "wrong",
              "fb": "Reservoirs alter routing, but they do not inevitably cause catastrophic floods."
            },
            {
              "t": "Nonstructural measures matter mainly after a levee or dam has already failed effectively.",
              "v": "danger",
              "fb": "Zoning, warning, and evacuation are preventive measures, not merely post-failure responses."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "White’s exceedance analysis supports a rare but physical flood beyond the mapped envelope, while rejecting both a concealed forecast and a deliberate gate attack."
          }
        }
      ]
    }
  },
  "story": [
    "<b>Rossmere wakes to mud, overturned houses, and a reservoir blamed before the water has finished receding.</b>",
    "Gauge Keeper Wynn holds the upstream chronology. The Gate Operator can reconstruct the routed release. The Floodplain Clerk has the map, its uncertainty, and the response record.",
    "A deliberate release, a neglected warning system, and a genuine hydrologic extreme each explain part of the scene until timing and volume are placed in one sequence.",
    "Nine clues can show whether the disaster began with a person, a failed institution, or a storm the measured plan did not contain."
  ],
  "endings": {
    "overclaimWhat": "ignored",
    "dismissalWhat": "sabotage",
    "win": {
      "expertTitle": "The Storm Beyond the Map",
      "expert": [
        "You connect no culpable individual, the Upper Creek & Gauge Network, and an exceptional basin storm exceeding the measured design envelope. The full clue chain links the initiating condition, the physical mechanism, and the decisive record without relying on candidate order.",
        "The two alternative explanations each fit part of the scene, but neither survives the combined timing, material, and documentary evidence."
      ],
      "soundTitle": "The Basin Record Holds",
      "sound": [
        "Your accusation identifies no culpable individual, the Upper Creek & Gauge Network, and an exceptional basin storm exceeding the measured design envelope.",
        "A few missed clues leave gaps in the reconstruction, yet the evidence you recovered is sufficient to distinguish the true sequence from both traps."
      ],
      "namedTitle": "Correct Event, Limited Proof",
      "named": [
        "You reach the correct three-part verdict with a thin evidentiary file.",
        "The result is right, although the unrecovered clues would be needed to defend the causal chain under sustained challenge."
      ]
    },
    "overclaim": {
      "title": "The Neglect Theory Overreaches",
      "body": [
        "A hidden forecast would require a newer map or alert record that the archive does not contain.",
        "The working gauges, published trigger, and routed response show an imperfect plan being followed rather than silenced."
      ]
    },
    "dismissal": {
      "title": "The Dam Did Not Create the Water",
      "body": [
        "A deliberate release would begin at the dam and propagate downstream.",
        "The observed tributary-first sequence and water balance leave no missing gate volume for sabotage."
      ]
    },
    "wrongNames": {
      "title": "Right Mechanism, Wrong Attribution",
      "body": [
        "You recognize the governing mechanism but assign it to the wrong actor or move its decisive evidence away from the location where the records and physical traces converge."
      ]
    }
  }
}
};
