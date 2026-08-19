// Casebook V3 — three informants, three readings, one clue per correct answer.
module.exports = { PACK: {
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "e_avalanche",
  "title": "The Whitewall Slide",
  "discipline": "Snow, Avalanche & Glacier Science",
  "teaser": "A wall of snow buried a crowded resort run at noon. Did patrol explosives release it, did an unforeseeable storm outrun every warning, or did the mountain's earlier signals matter more than the final trigger?",
  "overclaimTag": "a control blast gone wrong",
  "truthTag": "a documented weak layer left exposed",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A layered snow slope with a red fracture line above a resort run\"><g fill=\"none\" stroke=\"#e2e2d8\" stroke-width=\"1\"><path d=\"M20 118 C145 104 240 95 350 73 S540 39 640 25\"/><path d=\"M25 108 C150 95 250 84 360 64 S535 33 635 20\"/><path d=\"M30 96 C155 85 250 74 365 54 S535 27 630 15\"/></g><path d=\"M28 88 C150 80 250 68 360 49 S535 23 630 12\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.8\"/><path d=\"M40 100 C165 90 265 78 370 60 S535 36 622 26\" fill=\"none\" stroke=\"#326891\" stroke-width=\"1.7\" stroke-dasharray=\"5 4\"/><path d=\"M185 84 C242 75 285 68 340 58 C390 49 426 43 468 36\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2.3\"/><path d=\"M185 84 L198 74 M240 75 L251 64 M298 66 L308 55 M358 55 L367 45 M420 44 L429 34\" stroke=\"#B3261E\" stroke-width=\"1.4\"/><g fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"><path d=\"M485 104 L525 104 L518 118 L492 118 Z\"/><path d=\"M532 98 L574 98 L566 116 L540 116 Z\"/><line x1=\"505\" y1=\"104\" x2=\"505\" y2=\"88\"/><line x1=\"553\" y1=\"98\" x2=\"553\" y2=\"82\"/></g><circle cx=\"455\" cy=\"91\" r=\"3\" fill=\"#121212\"/><path d=\"M455 94 L455 107 M455 98 L447 104 M455 98 L464 103 M455 107 L448 116 M455 107 L462 116\" stroke=\"#121212\" stroke-width=\"1.4\"/></svg>",
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
  "DAYS_TOTAL": 3,
  "overclaimTease": "A blast leaves an easy story; the snowpack may preserve a longer record of how the slope became ready to fail.",
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
          "label": "A patrol control charge released an unstable slab"
        },
        {
          "id": "kept",
          "label": "A mapped weak layer remained exposed after reopening"
        },
        {
          "id": "freak",
          "label": "A sudden storm formed a danger no forecast could catch"
        }
      ]
    }
  },
  "READING_ORDER": [
    "patroller",
    "snowforecaster",
    "clerk"
  ],
  "CHARACTERS": {
    "patroller": {
      "name": "Patroller Sten",
      "role": "Ski-patrol observer",
      "face": "⛷",
      "badge": "S",
      "legend": "the crown line",
      "hint": "Dug the pits and traced the fracture onto the same buried layer noted all week.",
      "reading": "lachapelle"
    },
    "snowforecaster": {
      "name": "The Snow Forecaster",
      "role": "Avalanche forecaster",
      "face": "🏔",
      "badge": "F",
      "legend": "the hazard board",
      "hint": "Issued a high-hazard bulletin and can separate control work from the noon release.",
      "reading": "atwater"
    },
    "clerk": {
      "name": "The Clerk",
      "role": "Resort-office clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the closure ledger",
      "hint": "Keeps the measurement series, the closure entry, and the later reopening order.",
      "reading": "church"
    }
  },
  "TOPICS": {
    "lachapelle": {
      "sci": "Edward LaChapelle (1926-2007)",
      "topic": "Avalanche science & snow crystals",
      "lede": "Ed LaChapelle learned to read a mountain's history in the shapes, bonds, and layers of its snow.",
      "no": 1,
      "profile": "Edward “Ed” LaChapelle combined physics, glaciology, mountaineering, and a lifetime on skis. After studying physics and mathematics, he trained at the Swiss Federal Institute for Snow and Avalanche Research in Davos. In 1952 he joined the U.S. Forest Service as a snow ranger at Alta, Utah, where Montgomery Atwater had established an avalanche research program. LaChapelle later led the Alta center, taught at the University of Washington, worked on glaciers from Greenland to Washington's Blue Glacier, and wrote influential guides on avalanche safety and snow crystals.\n\nSnow is not a uniform white material. Fresh crystals break, round, grow facets, sinter together, or lose bonds as temperature and vapor gradients move water through the pack. A cohesive slab can form above a weak layer of poorly bonded grains such as facets or buried surface hoar. Failure begins locally, but if the weak layer is continuous and the slab can transmit stress, a crack may propagate far beyond the initial disturbance. The visible skier, cornice fall, or explosive can be only the trigger; the snowpack's layered structure determines whether that trigger can release a large slab.\n\nField work therefore depends on profiles, not surface impressions. Observers dig pits, identify grain forms, measure hardness and temperature, and perform stability tests. A test result is local, so forecasters combine many pits with weather history, recent avalanches, terrain, and signs such as collapsing or shooting cracks. Persistent weak layers are especially treacherous because quiet days or unsuccessful control shots do not necessarily mean the layer has healed.\n\nLaChapelle's approach sharpens this case. A blast crater near a slope would not by itself explain where the fracture traveled. Investigators should trace the bed surface, examine the crown, and compare it with earlier pit descriptions. If the slab ran on the same buried layer documented across several days, the decisive story began before noon and before the final person or device disturbed the snow.",
      "frame": "Brushes loose grains from a clear pit wall and follows one brittle band with a gloved finger. “The trigger gets the headline. The layer that carries the fracture tells you why the whole slope moved.”",
      "q": [
        {
          "q": "What allows a small disturbance to release a much wider dry-slab avalanche?",
          "o": [
            {
              "t": "A crack propagates through a continuous weak layer beneath a cohesive slab.",
              "v": "expert",
              "fb": "The slab transmits stress while the weak layer permits the fracture to spread beyond the trigger point."
            },
            {
              "t": "Loose surface snow rolls downhill and steadily gathers every deeper layer.",
              "v": "wrong",
              "fb": "That describes a loose-snow process, not the broad fracture of a cohesive slab over a weak layer."
            },
            {
              "t": "The trigger melts a channel that lubricates the entire slope within seconds.",
              "v": "danger",
              "fb": "Dry slabs commonly release through brittle weak-layer failure without rapid meltwater lubrication."
            },
            {
              "t": "Wind pushes the whole snow cover at once after the first patch begins sliding.",
              "v": "partial",
              "fb": "Wind can build slabs, but crack propagation through a weak layer explains the sudden connected release."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "The crown and bed surface follow the same buried faceted band described in earlier pits; the fracture did not originate at a fresh blast crater."
          }
        },
        {
          "q": "Why can an unsuccessful morning control shot fail to prove a persistent slab is safe at noon?",
          "o": [
            {
              "t": "Explosives permanently strengthen nearby snow by compressing every weak grain.",
              "v": "wrong",
              "fb": "A shot may release or test unstable snow, but it does not uniformly heal a buried weak layer."
            },
            {
              "t": "The weak layer may be spatially variable and trigger later from a thinner spot.",
              "v": "expert",
              "fb": "Persistent layers can remain active even when one test or explosive fails to connect with a sensitive area."
            },
            {
              "t": "A later avalanche probably came from a second hidden charge placed after patrol left.",
              "v": "danger",
              "fb": "A later human trigger can find a sensitive part of the same layer without any additional explosive."
            },
            {
              "t": "The first shot matters chiefly when observers record its sound level at the resort base.",
              "v": "partial",
              "fb": "Acoustic records do not replace examining where the charge acted and whether the weak layer was connected."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The pit observers reported the weak band upward, but they did not hold the authority that returned the run to public use."
          }
        },
        {
          "q": "Which field comparison best tests whether the noon slide used a previously identified weak layer?",
          "o": [
            {
              "t": "Measure the debris depth alone and infer the exact trigger from total volume.",
              "v": "wrong",
              "fb": "Debris volume describes avalanche size but rarely identifies the initiating layer or trigger by itself."
            },
            {
              "t": "Count every explosive used that week and assign the slide to the nearest detonation.",
              "v": "danger",
              "fb": "Timing alone can mislead unless the fracture and bed surface actually connect to the charge location."
            },
            {
              "t": "Match crown and bed-surface grains to the layer logged in earlier snow profiles.",
              "v": "expert",
              "fb": "Grain type, depth, and layer position can connect the released bed surface to prior observations."
            },
            {
              "t": "Compare skier traffic totals because crowded runs create deeper weak layers.",
              "v": "partial",
              "fb": "Traffic can supply triggers, but weak-layer formation depends on snow and weather processes, not crowd size."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The mountain records where the slab released; the consequential decision about exposure was made away from the crown line."
          }
        }
      ]
    },
    "atwater": {
      "sci": "Montgomery Atwater (1904-1976)",
      "topic": "Avalanche forecasting & control",
      "lede": "Montgomery Atwater turned Alta's deadly slopes into a field laboratory for forecasting, closure, and controlled release.",
      "no": 2,
      "profile": "Montgomery “Monty” Atwater came to avalanche work by an unusual route. Educated in literature, he had been a writer, rancher, and soldier before joining the U.S. Forest Service in 1945 as a snow ranger at Alta, Utah. The resort and road sat beneath active avalanche paths, and closures were then the main defense. Atwater established what the Forest Service describes as the first avalanche research center in the Western Hemisphere and helped build North American practice around systematic observation, forecasting, and control.\n\nForecasting does not mean predicting the exact minute and square meter of every release. It means assembling a structured judgment from snowfall, wind loading, temperature, snow structure, terrain, recent avalanche activity, and stability tests. Atwater kept detailed snow and water records at Alta. He also advanced active control: deliberately applying explosives or other triggers while terrain is closed, so unstable snow can be released under managed conditions rather than when the public is exposed. He later planned avalanche control for the 1960 Winter Olympics at Squaw Valley and wrote an early English-language avalanche handbook.\n\nControl work creates an easy misunderstanding. The presence of explosives is not evidence that an avalanche was accidental sabotage or that every later release was caused by the last charge. Investigators must compare exact times, locations, results, and closure status. A shot that produces no avalanche can be useful information, but it is not a guarantee; the charge may miss a sensitive spot, and a persistent weak layer may remain capable of propagating.\n\nAtwater's deeper lesson is operational. Hazard information matters only if it changes exposure. A forecaster can describe a dangerous slope, and patrol can test or close it, yet someone must decide whether the public stays out. In the Whitewall inquiry, separate the morning control log from the noon release, then follow the high-hazard bulletin to the person who had authority to keep the run closed or reopen it.",
      "frame": "Pins the morning control map beside the noon crown sketch, then circles two different coordinates. “Explosives are evidence only when time, place, and result line up. Do not let one loud fact swallow the forecast.”",
      "q": [
        {
          "q": "What is the purpose of explosive avalanche control on a managed slope?",
          "o": [
            {
              "t": "Compact the snowpack permanently to prevent weak layers forming later that season.",
              "v": "wrong",
              "fb": "Explosives may affect a local area, but they do not permanently eliminate future weak-layer formation."
            },
            {
              "t": "Create a visible blast record treated as evidence that a later slide was intentional.",
              "v": "danger",
              "fb": "A control record documents mitigation work; causation still requires matching the charge to the fracture."
            },
            {
              "t": "Measure snow depth through the size of the crater left by each detonation.",
              "v": "partial",
              "fb": "Crater size is not a reliable substitute for snow profiles, weather data, and stability observations."
            },
            {
              "t": "Trigger unstable snow while terrain is closed and exposure can be controlled.",
              "v": "expert",
              "fb": "Control work aims to release or test instability before the public is placed beneath it."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "The logged control shots were fired during closure and outside the noon fracture's start point; their failure to release the slab did not certify it safe."
          }
        },
        {
          "q": "Which evidence most directly separates a control charge from the trigger of a later avalanche?",
          "o": [
            {
              "t": "Compare the charge's time and coordinates with the crown and fracture origin.",
              "v": "expert",
              "fb": "Causation requires spatial and temporal agreement between the detonation and the release."
            },
            {
              "t": "Use the final debris location because all triggers leave a unique runout pattern.",
              "v": "wrong",
              "fb": "Runout depends on terrain and avalanche size and does not uniquely identify the initiating trigger."
            },
            {
              "t": "Ask whether patrol normally carries explosives during high-hazard mornings.",
              "v": "partial",
              "fb": "Routine practice gives context, but the specific map and timing are needed for this release."
            },
            {
              "t": "Assume the loudest event that day caused the largest movement of snow.",
              "v": "danger",
              "fb": "Salience is not mechanism; a later skier can trigger a primed layer far from an earlier blast."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The high-hazard bulletin left the forecast hut intact; the reopening decision appears later in the management chain."
          }
        },
        {
          "q": "A forecaster rates a run high hazard and recommends closure. Who controls the remaining operational risk?",
          "o": [
            {
              "t": "The forecaster alone, because issuing a high rating automatically closes every slope.",
              "v": "wrong",
              "fb": "Forecasts communicate hazard; operational closure authority can reside elsewhere in the organization."
            },
            {
              "t": "The operations authority deciding whether the public remains excluded from the run.",
              "v": "expert",
              "fb": "Forecasting informs the decision, but exposure depends on the official who opens or closes terrain."
            },
            {
              "t": "The patrol team alone, because explosives make every subsequent opening decision theirs.",
              "v": "partial",
              "fb": "Patrol supplies observations and control results, but management may retain final opening authority."
            },
            {
              "t": "The first skier entering the run, because personal choice transfers all responsibility.",
              "v": "danger",
              "fb": "A guest may trigger the slab, yet the resort still controls whether a known hazard is presented as open terrain."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The forecaster recommended continued closure; the person who overruled that recommendation held operations authority rather than forecast or patrol duty."
          }
        }
      ]
    },
    "church": {
      "sci": "James E. Church (1869-1959)",
      "topic": "Snow surveying & snowpack measurement",
      "lede": "James Church replaced impressions of deep snow with repeatable measurements of the water actually stored inside it.",
      "no": 3,
      "profile": "James Edward Church was a classics professor at the University of Nevada, Reno, not a formally trained hydrologist. His love of the Sierra drew him repeatedly to Mount Rose, where he helped establish a high-altitude observatory. Around Lake Tahoe, arguments over floods, reservoir releases, and summer water supply exposed a practical problem: people could see snow on the mountains, but they could not reliably say how much water it contained.\n\nSnow depth alone is deceptive. A meter of light powder may contain less water than a much shallower layer of dense spring snow. During the winter of 1908–09, Church developed the Mount Rose snow sampler, a hollow metal tube that cuts a vertical core. The tube is weighed with and without the core; the difference gives snow-water equivalent, the depth of liquid water the snow would produce if melted. Church repeated measurements at fixed points along snow courses and compared them with later runoff and lake levels.\n\nThe power of his method came from consistency across place and time. One observation can be noisy or unrepresentative. A documented series reveals whether the pack is gaining load, settling, melting, or departing from normal conditions. Church's approach spread through the American West and helped inspire the federal cooperative snow-survey program. Modern automated stations add continuous data, but the principle remains: decisions improve when observations are standardized, preserved, and compared.\n\nWater-supply sampling is not the same as an avalanche stability test, yet Church's evidentiary discipline transfers directly. In this case, do not treat the noon storm or a single pit as the entire history. Read the dated snow records together. A multi-day sequence showing continued loading above a known weak layer makes the danger foreseeable. Then examine who received that series, where the closure status was changed, and whether the written order matched the measurements already on file.",
      "frame": "Lays a week of snow-course sheets in chronological order and aligns the columns with a ruler. “One measurement is weather. A series becomes a record of what decision-makers had time to know.”",
      "q": [
        {
          "q": "Why did Church's snow sampler improve on measuring snow depth alone?",
          "o": [
            {
              "t": "It recorded surface temperature while avoiding any disturbance to the snowpack.",
              "v": "wrong",
              "fb": "The device extracts and weighs a core; temperature measurement is a separate observation."
            },
            {
              "t": "It found the deepest drift and treated that point as the basin-wide average.",
              "v": "partial",
              "fb": "Church used repeated fixed sampling points because one extreme drift would misrepresent the larger area."
            },
            {
              "t": "It measured snow-water equivalent, distinguishing light powder from dense snow.",
              "v": "expert",
              "fb": "Weighing a core reveals stored water, which depth alone cannot determine reliably."
            },
            {
              "t": "It identified every crystal shape and therefore predicted each avalanche trigger.",
              "v": "danger",
              "fb": "The sampler measures bulk water content, not a complete stability profile or exact trigger forecast."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "The dated series shows several days of added load above the same weak band; the dangerous structure predated the final storm pulse."
          }
        },
        {
          "q": "What makes a fixed snow course more informative than one convenient measurement near a lodge?",
          "o": [
            {
              "t": "A fixed route makes each sample representative of the same depth and water content.",
              "v": "wrong",
              "fb": "Variation remains; the value lies in measuring it consistently rather than assuming uniform snow."
            },
            {
              "t": "A nearby lodge supplies accurate wind data for every elevation on the course.",
              "v": "partial",
              "fb": "A lodge station can add context, but mountain wind and deposition vary sharply with terrain and elevation."
            },
            {
              "t": "The same observer can choose whichever point best matches the expected forecast.",
              "v": "danger",
              "fb": "Changing sites to fit expectations destroys comparability and invites confirmation bias."
            },
            {
              "t": "Repeated samples at designated points reveal spatial and temporal change.",
              "v": "expert",
              "fb": "A consistent network reduces the chance that one easy or unusual location controls the conclusion."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The measurement series and the later change from closed to open are filed together in the resort's management ledger."
          }
        },
        {
          "q": "Which document trail best shows whether the Whitewall danger was foreseeable before noon?",
          "o": [
            {
              "t": "Dated profiles, loading measurements, hazard bulletins, and closure entries.",
              "v": "expert",
              "fb": "Together those records show what conditions developed, what was communicated, and how exposure changed."
            },
            {
              "t": "A weather summary written after rescue from the noon snowfall total alone.",
              "v": "wrong",
              "fb": "A retrospective single-period summary omits the multi-day loading and weak-layer observations."
            },
            {
              "t": "A visitor's video of the final powder cloud and the size of the debris pile.",
              "v": "partial",
              "fb": "The video documents the event but says little about the warnings available beforehand."
            },
            {
              "t": "The explosive inventory alone, because unused charges prove patrol expected safety.",
              "v": "danger",
              "fb": "Inventory cannot replace the snow and hazard record or show why terrain was reopened."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The closure ledger and reopening order carry the same operations authorization, after forecast and patrol warnings were already attached."
          }
        }
      ]
    }
  },
  "story": [
    "<b>At noon, Whitewall fractured above a crowded resort run.</b> The slab crossed the piste before most skiers understood the sound behind them.",
    "Patroller Sten has the crown and pit observations. The Snow Forecaster has the control map and hazard bulletin. The Clerk has a week of measurements and the closure ledger.",
    "A patrol charge offers a concrete cause. An unforeseeable storm offers a clean excuse. Each theory can borrow one fact from the mountain.",
    "You may accuse before all three interviews, but every correct answer adds a WHO, WHAT, or WHERE note. Together the nine clues turn a sudden slide into a sequence of observations, warnings, and decisions."
  ],
  "endings": {
    "overclaimWhat": "blast",
    "dismissalWhat": "freak",
    "win": {
      "expertTitle": "The Slope Was Reopened",
      "expert": [
        "You name <b>Kurt Halden — resort operations manager</b>, <b>The Resort Management Office</b>, and <b>A mapped weak layer remained exposed after reopening</b>. The slab fractured on the previously logged faceted band, while the control shots were earlier and outside the noon start point.",
        "It was not a patrol charge releasing the crowd beneath it, and it was not a storm no forecast could catch. Forecast and patrol records reached management before the order that changed Whitewall from closed to open."
      ],
      "soundTitle": "The Record Reaches Management",
      "sound": [
        "Your accusation correctly joins the operations manager, the management office, and the documented weak layer left exposed after reopening.",
        "The snowpack evidence rejects both the blast-centered account and the claim that the danger appeared without warning."
      ],
      "namedTitle": "The Right Opening Decision",
      "named": [
        "You identify Kurt Halden, the Resort Management Office, and the mapped weak layer that remained exposed after reopening.",
        "The result is right, although missed clues leave the timing between warning, control work, and reopening less complete."
      ]
    },
    "overclaim": {
      "title": "The Loudest Fact Wins",
      "body": [
        "Patrol did use explosives, but the logged shots were earlier and outside the fracture origin. The crown and bed surface follow a buried weak layer documented before the control work.",
        "Blaming the blast confuses mitigation with cause and diverts attention from why the public was returned to a slope that still carried the unresolved hazard."
      ]
    },
    "dismissal": {
      "title": "A Storm Without a History",
      "body": [
        "The final snowfall added load, but it did not create the whole danger at noon. Profiles and measurements show the weak layer and accumulating slab over several days.",
        "Calling the release unforeseeable discards the hazard bulletin, the closure record, and the decision made after both were available."
      ]
    },
    "wrongNames": {
      "title": "The Snowpack, Wrongly Assigned",
      "body": [
        "You understand that the documented weak layer remained exposed after reopening, but the bulletin and ledger place final authority and culmination elsewhere than your accusation."
      ]
    }
  }
}
};
