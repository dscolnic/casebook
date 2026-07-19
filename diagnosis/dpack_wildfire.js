// Diagnosis data pack — clean non-overlapping schematic edition.
module.exports = { PACK: {
  "id": "wildfire",
  "title": "Fireline Signal",
  "domain": "Wildfire behavior and mapping",
  "role": "You are the fire-intelligence analyst supporting incident command.",
  "intro": {
    "title": "How this system works",
    "lead": "A wildfire spreads when heat, oxygen, and burnable fuel line up. Wind can push a continuous flame front, burning embers can start spot fires ahead of it, and terrain can accelerate fire uphill. Maps combine satellites, aircraft, cameras, weather, and ground reports, so apparent growth is not always real fire.",
    "cards": [
      {
        "title": "How wildfire spreads",
        "body": "Flames preheat nearby fuel, wind bends heat forward, and embers can travel beyond control lines to create isolated new ignitions."
      },
      {
        "title": "How the atmosphere changes the picture",
        "body": "Stable air can trap smoke near the ground and make remote imagery look broader, while strong convection builds a tall plume over intense burning."
      },
      {
        "title": "What the instruments measure",
        "body": "Thermal detections locate hot ground, perimeter algorithms estimate shape, weather stations measure wind, and crews verify whether mapped pixels contain active flame."
      },
      {
        "title": "Why maps can be wrong",
        "body": "Cloud, smoke, navigation offsets, and geolocation errors can shift or smear thermal detections. Planned firing operations also create real heat along an authorized line."
      }
    ],
    "takeaway": "The loud reading gets your attention, but the right explanation is the one that fits the whole panel."
  },
  "system": {
    "parts": [
      [
        "Flame front",
        "The continuous edge where fuels are actively burning."
      ],
      [
        "Spotting",
        "Windborne embers can ignite isolated fuels ahead of the main front."
      ],
      [
        "Atmosphere",
        "Wind and stability control spread direction, smoke transport, and plume height."
      ],
      [
        "Remote sensing",
        "Aircraft and satellites detect thermal radiation and map the perimeter."
      ],
      [
        "Ground verification",
        "Crews, cameras, and firing logs determine whether mapped heat is real and authorized."
      ]
    ],
    "soWrong": "A new patch on a map may be wind-driven spread, spotting, smoke-related misclassification, geolocation error, or planned firing. The geometry and independent ground evidence must agree."
  },
  "salient": [
    "perimeter",
    "heat"
  ],
  "readings": {
    "perimeter": {
      "name": "Mapped perimeter topology",
      "purpose": "Describes whether growth is continuous downwind, isolated ahead of the front, or aligned with an operational line. Shape narrows the mechanism but can be distorted by mapping error.",
      "pin": {
        "x": 30,
        "y": 125
      },
      "zone": "perimeter"
    },
    "heat": {
      "name": "Ground-confirmed heat detections",
      "purpose": "Counts thermal pixels that are independently supported by aircraft or ground observations. Many true detections indicate burning rather than smoke alone.",
      "pin": {
        "x": 30,
        "y": 190
      },
      "zone": "remote"
    },
    "ahead": {
      "name": "Heat beyond the main front",
      "purpose": "Shows whether isolated hot locations exist ahead of the continuous perimeter, the key physical signature of spotting.",
      "pin": {
        "x": 490,
        "y": 115
      },
      "zone": "ahead"
    },
    "wind": {
      "name": "20-m wind",
      "purpose": "Wind direction and speed help predict front elongation and ember transport. Light winds make long-range spotting less likely.",
      "pin": {
        "x": 90,
        "y": 35
      },
      "zone": "weather"
    },
    "ground": {
      "name": "Crew / camera verification",
      "purpose": "Distinguishes active flame, smoke-obscured ground, and empty mapped locations.",
      "pin": {
        "x": 490,
        "y": 260
      },
      "zone": "ground"
    },
    "offset": {
      "name": "Navigation control-point error",
      "purpose": "Compares mapped landmarks with known coordinates. A consistent spatial offset identifies geolocation error.",
      "pin": {
        "x": 450,
        "y": 355
      },
      "zone": "mapping"
    },
    "plume": {
      "name": "Plume height",
      "purpose": "A tall convective plume supports intense burning; a low trapped smoke layer supports an inversion or weak fire behavior.",
      "pin": {
        "x": 290,
        "y": 35
      },
      "zone": "atmosphere"
    },
    "firing": {
      "name": "Firing-operation log",
      "purpose": "Records authorized ignition lines and timing. Matching heat can be operational rather than uncontrolled spread.",
      "pin": {
        "x": 120,
        "y": 355
      },
      "zone": "operations"
    },
    "spotdist": {
      "name": "Confirmed fire distance ahead",
      "purpose": "Measures how far independently confirmed fire exists beyond the connected front. Mapping error can create apparent distance, while planned firing is usually tied to a documented nearby line.",
      "pin": {
        "x": 490,
        "y": 180
      },
      "zone": "ahead"
    },
    "ember": {
      "name": "Lofted ember detections",
      "purpose": "Airborne infrared and radar detections estimate ember transport. Strong convection can loft embers without confirmed spot fires, so ember counts must be combined with fire locations.",
      "pin": {
        "x": 420,
        "y": 35
      },
      "zone": "plume"
    },
    "frontcam": {
      "name": "Connected-front camera confirmation",
      "purpose": "Confirms whether the mapped downwind edge contains continuous flame. Planned firing can also create a connected flame line, so camera confirmation must be combined with perimeter geometry and operation logs.",
      "pin": {
        "x": 30,
        "y": 265
      },
      "zone": "front"
    }
  },
  "hypotheses": {
    "inversion": {
      "label": "Smoke-inversion mapping artifact",
      "choice": "A low stable layer traps warm smoke and confuses perimeter classification, while few or no ground hot spots are present.",
      "call": {
        "title": "Hold the map update for verification.",
        "arg": "The apparent extension is atmospheric rather than active fire growth."
      },
      "sig": {
        "perimeter": "ahead",
        "heat": "few",
        "ahead": "absent",
        "wind": "light",
        "ground": "no-fire",
        "offset": "good",
        "plume": "low",
        "firing": "none",
        "spotdist": "none",
        "ember": "low",
        "frontcam": "none"
      }
    },
    "geo": {
      "label": "Thermal geolocation error",
      "choice": "A navigation or registration offset shifts real heat pixels away from their true locations, creating apparent new growth.",
      "call": {
        "title": "Correct the geolocation solution.",
        "arg": "The heat source is real but plotted in the wrong place."
      },
      "sig": {
        "perimeter": "ahead",
        "heat": "few",
        "ahead": "absent",
        "wind": "normal",
        "ground": "no-fire",
        "offset": "shifted",
        "plume": "low",
        "firing": "none",
        "spotdist": "far",
        "ember": "low",
        "frontcam": "none"
      }
    },
    "firingop": {
      "label": "Authorized firing operation",
      "choice": "Crews intentionally ignite fuel along a documented control line, producing real heat in the planned location.",
      "call": {
        "title": "Continue the protected operation.",
        "arg": "The thermal activity matches the approved firing plan and is not uncontrolled growth."
      },
      "sig": {
        "perimeter": "line",
        "heat": "many",
        "ahead": "present",
        "wind": "planned",
        "ground": "fire",
        "offset": "good",
        "plume": "moderate",
        "firing": "active",
        "spotdist": "near",
        "ember": "low",
        "frontcam": "continuous"
      }
    },
    "spotting": {
      "label": "Ember spotting",
      "choice": "Windborne embers ignite isolated fuels ahead of the main front, producing multiple real hot spots beyond the continuous perimeter.",
      "call": {
        "title": "Protect the area ahead of the front.",
        "arg": "Treat the isolated ignitions as new fire and adjust containment tactics."
      },
      "sig": {
        "perimeter": "ahead",
        "heat": "many",
        "ahead": "present",
        "wind": "strong",
        "ground": "fire",
        "offset": "good",
        "plume": "high",
        "firing": "none",
        "spotdist": "far",
        "ember": "high",
        "frontcam": "none"
      }
    },
    "smokecolumn": {
      "label": "Wind-advected smoke-column artifact",
      "choice": "A low smoke layer is carried beyond the mapped edge and produces a shape extension with few confirmed heat detections but no ground fire.",
      "call": {
        "title": "Smoke-column mapping artifact",
        "arg": "Use thermal and ground confirmation rather than the optical edge."
      },
      "sig": {
        "perimeter": "ahead",
        "heat": "few",
        "ahead": "absent",
        "wind": "light",
        "ground": "no-fire",
        "offset": "good",
        "plume": "high",
        "firing": "none",
        "spotdist": "none",
        "ember": "low",
        "frontcam": "none"
      }
    },
    "windfront": {
      "label": "Wind-driven continuous spread",
      "choice": "Strong wind stretches the active perimeter downwind as one connected front, without separate ahead-of-line ignitions.",
      "call": {
        "title": "Reposition for wind-driven spread.",
        "arg": "The main front is accelerating in the wind direction and requires an updated operational plan."
      },
      "sig": {
        "perimeter": "downwind",
        "heat": "many",
        "ahead": "absent",
        "wind": "strong",
        "ground": "fire",
        "offset": "good",
        "plume": "high",
        "firing": "none",
        "spotdist": "none",
        "ember": "high",
        "frontcam": "continuous"
      }
    },
    "windsmoke": {
      "label": "Wind-stretched smoke edge",
      "choice": "Strong wind carries a smoke edge downwind, creating a connected mapped extension without continuous ground flame or many confirmed heat detections.",
      "call": {
        "title": "Wind-stretched smoke artifact",
        "arg": "Use ground and thermal confirmation before treating the optical edge as fire."
      },
      "sig": {
        "perimeter": "downwind",
        "heat": "few",
        "ahead": "absent",
        "wind": "strong",
        "ground": "no-fire",
        "offset": "good",
        "plume": "high",
        "firing": "none",
        "spotdist": "none",
        "ember": "high",
        "frontcam": "none"
      }
    }
  },
  "dismissal": "firingop",
  "reassuring": {
    "lab": "Containment estimate",
    "val": "72% CONTAINED",
    "note": "Containment percentage describes completed control line; it does not guarantee that no new spot fire or mapping problem exists."
  },
  "rounds": [
    {
      "answer": "spotting",
      "alarm": "ahead",
      "poleA": {
        "lab": "Ahead-of-line detections",
        "val": "11 hot locations 0.4–1.8 km ahead",
        "note": "The mapped extension is broken into separate points rather than one continuous edge."
      },
      "hook": "An evening wind increase is followed by a scatter of new thermal detections beyond the northeast control line.",
      "riddle": "The map shows real heat ahead of the main fire. <span class=\"q\">Is the front simply advancing, or are embers creating separate ignitions?</span>",
      "vals": {
        "perimeter": {
          "observed": "11 isolated polygons ahead of edge",
          "reference": "Continuous front expected for direct spread"
        },
        "heat": {
          "observed": "11 of 13 confirmed by aircraft IR",
          "reference": "False-positive review threshold <30% confirmation"
        },
        "ahead": {
          "observed": "0.4–1.8 km beyond main front",
          "reference": "Typical direct-flame reach <0.1 km"
        },
        "wind": {
          "observed": "28–36 km/h toward NE; gusts 52",
          "reference": "Typical afternoon 10–22 km/h"
        },
        "ground": {
          "observed": "6 isolated flames; no connecting fire edge",
          "reference": "Continuous front expected for wind spread"
        },
        "offset": {
          "observed": "Control points within 22 m",
          "reference": "Acceptable <60 m"
        },
        "plume": {
          "observed": "4.1 km above ground",
          "reference": "Low smoke layer <0.8 km"
        },
        "firing": {
          "observed": "No ignition authorization in NE sector",
          "reference": "Expected log for planned fire"
        },
        "spotdist": {
          "observed": "0.8–2.3 km ahead",
          "reference": "Continuous front ends at mapped edge"
        },
        "ember": {
          "observed": "146 hot particles / 10 min",
          "reference": "Background <8"
        },
        "frontcam": {
          "observed": "No connected flame at main edge extension",
          "reference": "Spot fires are isolated"
        }
      },
      "reasons": {
        "windfront": "Wind-driven spread explains strong wind and many hot detections, but it should produce a connected downwind edge rather than isolated ignitions up to 1.8 km ahead.",
        "inversion": "An inversion could create apparent ahead-of-line shapes, but aircraft and crews confirm active flame at most locations and the plume is tall.",
        "geo": "Geolocation error can shift heat, but control points are within 22 m and ground crews find fire at the plotted locations.",
        "firingop": "No firing operation is authorized in the sector, and the points are scattered rather than aligned with a control line.",
        "smokecolumn": "Smoke can extend the mapped shape, but it does not create many independently confirmed heat sources, distant flames, and lofted hot particles.",
        "windsmoke": "It can stretch the mapped edge and carry embers, but it does not create many confirmed distant flames."
      },
      "resolve": {
        "title": "Ember spotting",
        "paras": [
          "Strong northeast winds carry burning embers beyond the continuous front. Aircraft and crews confirm isolated flames at the plotted locations, while map control points remain accurate.",
          "An ahead-of-front pattern is shared with atmospheric and mapping artifacts; many confirmed heat detections are shared with continuous spread and planned firing. Only their pair—isolated ahead geometry plus many real fires—identifies spotting."
        ],
        "why": {
          "loud": "<b>Why the two headline readings matter:</b> the geometry is separated from the main edge and the heat is physically real.",
          "quiet": "<b>Why the quiet readings confirm it:</b> strong wind supplies the transport mechanism, and accurate control points eliminate a map shift."
        },
        "chain": [
          "Embers loft into strong wind",
          "Hot material lands beyond the control line",
          "Multiple isolated spot fires ignite"
        ],
        "take": "Separate the shape of a fire’s growth from the question of whether the mapped heat is real."
      },
      "logic": [
        [
          "Perimeter ahead of main front",
          "Spotting, smoke/inversion, geolocation, or firing remain"
        ],
        [
          "Many confirmed heat detections",
          "Spotting or firing remain"
        ],
        [
          "Distant fires + no firing record",
          "Spotting remains"
        ],
        [
          "Strong ember detections",
          "Physical transport mechanism confirmed"
        ]
      ]
    },
    {
      "answer": "inversion",
      "alarm": "heat",
      "poleA": {
        "lab": "Thermal confirmation",
        "val": "2 of 41 mapped candidates confirmed hot",
        "note": "The optical perimeter expands much farther than independent heat evidence."
      },
      "hook": "Near dawn, automated mapping adds a broad extension through a valley filled with smoke. Ground crews report no corresponding flame front.",
      "riddle": "The optical perimeter expands far beyond the confirmed heat. <span class=\"q\">How do independent thermal confirmation and the timing of the smoke layer explain the mismatch?</span>",
      "vals": {
        "perimeter": {
          "observed": "Broad apparent extension 2.3 km NE",
          "reference": "No prior active edge in valley"
        },
        "heat": {
          "observed": "2 of 41 candidates confirmed",
          "reference": "Normal active perimeter >70% confirmation"
        },
        "ahead": {
          "observed": "No independent hot location beyond edge",
          "reference": "Expected present for spotting"
        },
        "wind": {
          "observed": "1–4 km/h; inversion depth 310 m",
          "reference": "Mixing usually >1,000 m by afternoon"
        },
        "ground": {
          "observed": "Dense warm smoke; no flame on 4 cameras",
          "reference": "Active growth should show flame or glowing fuels"
        },
        "offset": {
          "observed": "Control points within 18 m",
          "reference": "Acceptable <60 m"
        },
        "plume": {
          "observed": "Smoke top 0.35 km above ground",
          "reference": "Convective fire plume usually >1 km"
        },
        "firing": {
          "observed": "No firing operation active",
          "reference": "Expected log for planned fire"
        },
        "spotdist": {
          "observed": "No confirmed flame ahead",
          "reference": "Expected if extension is smoke"
        },
        "ember": {
          "observed": "4 hot particles / 10 min",
          "reference": "Background <8"
        },
        "frontcam": {
          "observed": "No continuous flame beyond true edge",
          "reference": "Smoke should show none"
        }
      },
      "reasons": {
        "spotting": "Spotting shares the ahead geometry, but independent heat, wind, plume, and ground-flame evidence are absent.",
        "windfront": "A continuous wind-driven front requires stronger wind and many confirmed hot pixels.",
        "geo": "Geolocation error shares the apparent-ahead, few-heat pattern, but landmark control points are accurate while smoke is trapped in a 310 m inversion.",
        "firingop": "No operation is logged, and crews find smoke rather than a planned ignition line.",
        "smokecolumn": "It shares light wind and a correctly registered smoke extension, but the plume is elevated rather than trapped low.",
        "windsmoke": "Its strong wind and high plume do not fit the light-wind, low trapped layer."
      },
      "resolve": {
        "title": "Smoke-inversion mapping artifact",
        "paras": [
          "A shallow nocturnal inversion traps warm smoke in the valley. The automated perimeter expands, but only two pixels contain real heat, cameras show no flame, and geolocation control points remain accurate.",
          "Light wind alone still fits a coherent smoke column, while a low plume alone still fits a mapping error occurring under weak fire behavior. Together they identify an inversion-trapped smoke artifact."
        ],
        "why": {
          "loud": "<b>Why the loud readings tie:</b> both smoke classification and map registration can place apparent fire where crews find none.",
          "quiet": "<b>Why the tie breaks:</b> accurate control points clear the mapping system, while atmospheric stability explains the warm smoke field."
        },
        "chain": [
          "Nighttime air becomes stable",
          "Warm smoke pools under a shallow inversion",
          "Automated imagery overmaps the perimeter"
        ],
        "take": "When remote sensing disagrees with the ground, test both the physical atmosphere and the coordinate system."
      },
      "logic": [
        [
          "Ahead extension + few heat detections",
          "Inversion, geolocation error, or smoke-column artifact remain"
        ],
        [
          "Light wind",
          "Inversion or smoke-column artifact remain"
        ],
        [
          "Low trapped plume",
          "Inversion or geolocation error remain"
        ],
        [
          "Light wind + low plume",
          "Smoke inversion remains"
        ]
      ]
    },
    {
      "answer": "windfront",
      "alarm": "wind",
      "experimental": false,
      "compound": [
        "windfront",
        "spotting"
      ],
      "observed": {
        "perimeter": "downwind",
        "heat": "many",
        "ahead": "present",
        "wind": "strong",
        "ground": "fire",
        "offset": "good",
        "plume": "high",
        "firing": "none",
        "spotdist": "far",
        "ember": "high",
        "frontcam": "continuous"
      },
      "poleA": {
        "lab": "Wind and ember transport",
        "val": "34–46 km/h east; 9 confirmed fires ahead",
        "note": "A fast connected run and detached ignitions develop in the same interval."
      },
      "hook": "A dry cold-front passage drives a connected fire run to the east while aircraft detect isolated heat beyond it.",
      "riddle": "One mechanism explains the continuous edge and another explains the detached ignitions. <span class=\"q\">Which two processes are active?</span>",
      "vals": {
        "perimeter": {
          "observed": "Connected 3.6 km eastward run / 55 min",
          "reference": "Typical overnight growth <0.5 km/h"
        },
        "heat": {
          "observed": "Main edge + 9 confirmed hot spots",
          "reference": "Expected one connected band for direct spread alone"
        },
        "ahead": {
          "observed": "9 fires 0.3–1.2 km beyond edge",
          "reference": "Direct-flame reach <0.1 km"
        },
        "wind": {
          "observed": "34–46 km/h east; gusts 61",
          "reference": "Red-flag threshold 32 km/h"
        },
        "ground": {
          "observed": "Continuous crown edge plus detached flames",
          "reference": "One spread mode normally dominates"
        },
        "offset": {
          "observed": "Control points within 26 m",
          "reference": "Acceptable <60 m"
        },
        "plume": {
          "observed": "5.2 km above ground",
          "reference": "Low smoke layer <0.8 km"
        },
        "firing": {
          "observed": "No ignition authorization east of line",
          "reference": "Expected log for planned fire"
        },
        "spotdist": {
          "observed": "0.6–1.9 km ahead",
          "reference": "Continuous front ends at mapped edge"
        },
        "ember": {
          "observed": "173 hot particles / 10 min",
          "reference": "Background <8"
        },
        "frontcam": {
          "observed": "Continuous flame along 3.6 km edge",
          "reference": "Expected for real front spread"
        }
      },
      "reasons": {
        "spotting": "Spotting explains the detached ahead fires, but not the 3.6 km connected crown-fire run along the main edge.",
        "windfront": "Wind-driven spread explains the continuous downwind run, but not nine independently confirmed ignitions beyond the edge.",
        "inversion": "A shallow smoke artifact cannot create a tall convective plume and ground-confirmed connected and detached flames.",
        "geo": "Accurate control points and ground confirmation rule out a spatial-registration explanation.",
        "firingop": "No operation is authorized, and the continuous run and scattered ahead fires do not follow a planned ignition line.",
        "smokecolumn": "It explains an apparent downwind extension but not continuous ground flame, many heat detections, distant spot fires, and hot-particle transport.",
        "windsmoke": "It explains a downwind optical edge but not continuous ground fire or confirmed distant spots."
      },
      "resolve": {
        "title": "Wind-driven continuous spread + ember spotting",
        "paras": [
          "The wind accelerates the connected crown-fire edge eastward while lofted embers start nine separate fires ahead. Aircraft and crews confirm both geometries.",
          "The final round requires four spatial and physical checks. Connected downwind flame plus perimeter geometry proves front spread; distant confirmed flame plus ember detections proves spotting. Each clue alone has a realistic smoke, mapping, or firing alternative."
        ],
        "why": {
          "loud": "<b>Why one cause fails:</b> connected-front movement and detached ignition are mechanically different spread modes.",
          "quiet": "<b>Why the pair is forced:</b> one evidence chain follows the main wind-aligned edge, and the other consists of isolated confirmed fires beyond it."
        },
        "chain": [
          "Strong wind accelerates the main front",
          "The same wind lofts and transports embers",
          "Continuous spread and separate spot fires occur together"
        ],
        "take": "A single incident can contain multiple spread mechanisms; map topology can reveal both."
      },
      "logic": [
        [
          "Downwind perimeter + continuous-front camera",
          "Requires wind-driven front spread; smoke edge or planned firing can imitate only one"
        ],
        [
          "Confirmed fire far ahead + high ember transport",
          "Requires spotting; geolocation or planned ignition can imitate only one"
        ],
        [
          "Navigation accurate + no firing log",
          "Rejects mapping and operational explanations"
        ],
        [
          "Four spatially independent checks",
          "Wind-driven spread and ember spotting are simultaneous"
        ]
      ]
    }
  ],
  "schematic": {
    "viewBox": "0 0 520 390",
    "svg": "<defs><linearGradient id=\"cleanBg\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#2a2018\"/><stop offset=\"1\" stop-color=\"#120d0a\"/></linearGradient><marker id=\"cleanArrow\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto\"><path d=\"M0 0 L10 5 L0 10 z\" fill=\"#69c9ef\"/></marker><style>.clean-border{fill:url(#cleanBg);stroke:#426273;stroke-width:2}.component{fill:#1b3a4d;stroke:#90b3c4;stroke-width:1.7}.component2{fill:#244c61;stroke:#90b3c4;stroke-width:1.7}.flow{fill:none;stroke:#69c9ef;stroke-width:3;marker-end:url(#cleanArrow)}.flow2{fill:none;stroke:#e0b85f;stroke-width:3;marker-end:url(#cleanArrow)}.leader{fill:none;stroke:#7f9bab;stroke-width:1.25;stroke-linecap:round;stroke-linejoin:round;opacity:.78}.anchor{fill:#9ab8c8}.slabel{fill:#eaf6fb;font:700 10.5px Inter,system-ui,sans-serif}.labelbg{fill:#081923;stroke:#355769;stroke-width:1;opacity:.94}</style></defs><rect x=\"12\" y=\"12\" width=\"496\" height=\"366\" rx=\"24\" class=\"clean-border\"/><path d=\"M 90 35 L 90 68 L 105 68 L 105 100\" class=\"leader\"/><circle cx=\"105\" cy=\"100\" r=\"2.4\" class=\"anchor\"/><path d=\"M 290 35 L 290 68 L 300 68 L 300 100\" class=\"leader\"/><circle cx=\"300\" cy=\"100\" r=\"2.4\" class=\"anchor\"/><path d=\"M 420 35 L 420 68 L 410 68 L 410 125\" class=\"leader\"/><circle cx=\"410\" cy=\"125\" r=\"2.4\" class=\"anchor\"/><path d=\"M 30 125 L 58 125 L 58 190 L 220 190\" class=\"leader\"/><circle cx=\"220\" cy=\"190\" r=\"2.4\" class=\"anchor\"/><path d=\"M 30 190 L 58 190 L 58 230 L 220 230\" class=\"leader\"/><circle cx=\"220\" cy=\"230\" r=\"2.4\" class=\"anchor\"/><path d=\"M 30 265 L 58 265 L 58 250 L 170 250\" class=\"leader\"/><circle cx=\"170\" cy=\"250\" r=\"2.4\" class=\"anchor\"/><path d=\"M 490 115 L 462 115 L 462 185 L 330 185\" class=\"leader\"/><circle cx=\"330\" cy=\"185\" r=\"2.4\" class=\"anchor\"/><path d=\"M 490 180 L 462 180 L 462 205 L 390 205\" class=\"leader\"/><circle cx=\"390\" cy=\"205\" r=\"2.4\" class=\"anchor\"/><path d=\"M 490 260 L 462 260 L 462 270 L 410 270\" class=\"leader\"/><circle cx=\"410\" cy=\"270\" r=\"2.4\" class=\"anchor\"/><path d=\"M 120 355 L 120 327 L 110 327 L 110 300\" class=\"leader\"/><circle cx=\"110\" cy=\"300\" r=\"2.4\" class=\"anchor\"/><path d=\"M 450 355 L 450 327 L 450 327 L 450 320\" class=\"leader\"/><circle cx=\"450\" cy=\"320\" r=\"2.4\" class=\"anchor\"/><path d=\"M48 302 C130 258 186 282 244 230 S350 178 465 138\" fill=\"none\" stroke=\"#6f5b40\" stroke-width=\"30\" opacity=\".38\"/><path d=\"M48 302 C130 258 186 282 244 230 S350 178 465 138\" fill=\"none\" stroke=\"#e87928\" stroke-width=\"10\"/><path d=\"M64 282 C135 250 188 265 238 217 S344 166 430 128\" fill=\"none\" stroke=\"#ffd065\" stroke-width=\"2\" stroke-dasharray=\"6 6\"/><g fill=\"#f2912e\"><circle cx=\"392\" cy=\"180\" r=\"7\"/><circle cx=\"420\" cy=\"198\" r=\"6\"/><circle cx=\"445\" cy=\"166\" r=\"5\"/></g><path d=\"M280 130 C290 110 300 96 310 82\" class=\"flow\"/><path d=\"M80 102 H145\" class=\"flow\"/><rect x=\"62\" y=\"276\" width=\"96\" height=\"46\" rx=\"10\" class=\"component\"/><rect x=\"366\" y=\"248\" width=\"94\" height=\"62\" rx=\"10\" class=\"component\"/><g><rect x=\"209.0\" y=\"236.5\" width=\"72\" height=\"23\" rx=\"11.5\" class=\"labelbg\"/><text x=\"245\" y=\"251.7\" text-anchor=\"middle\" class=\"slabel\">main front</text></g><g><rect x=\"383.0\" y=\"133.5\" width=\"70\" height=\"23\" rx=\"11.5\" class=\"labelbg\"/><text x=\"418\" y=\"148.7\" text-anchor=\"middle\" class=\"slabel\">spot fires</text></g><g><rect x=\"279.0\" y=\"54.5\" width=\"62\" height=\"23\" rx=\"11.5\" class=\"labelbg\"/><text x=\"310\" y=\"69.7\" text-anchor=\"middle\" class=\"slabel\">plume</text></g><g><rect x=\"66.0\" y=\"288.5\" width=\"88\" height=\"23\" rx=\"11.5\" class=\"labelbg\"/><text x=\"110\" y=\"303.7\" text-anchor=\"middle\" class=\"slabel\">operations</text></g><g><rect x=\"367.0\" y=\"315.5\" width=\"92\" height=\"23\" rx=\"11.5\" class=\"labelbg\"/><text x=\"413\" y=\"330.7\" text-anchor=\"middle\" class=\"slabel\">ground checks</text></g>"
  },
  "scopeNote": "Educational remote-sensing model only; real wildfire decisions belong to trained incident-management and fire-behavior personnel."
} };
