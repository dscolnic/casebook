module.exports = { PACK: {
  "id": "e_quake",
  "title": "Nine Seconds to Cordera",
  "discipline": "Seismology & Earthquake Science",
  "teaser": "Cordera's shaking began with an unusual compact source. Was it an underground explosion, or did fluid injection trigger fault slip? The wavefield must identify the source physics.",
  "overclaimTag": "an underground explosion",
  "truthTag": "tectonic double-couple fault rupture",
  "venue": "the Cordera earthquake inquiry",
  "agent": {
    "name": "Investigator Mara Solveig",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Seismology Pioneers",
  "dossierName": "SEISMOLOGY PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Cordera earthquake inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before your inquiry ends. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The place you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "Explosion and induced-seismicity hypotheses are both testable; wave radiation, depth, and timing must decide.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "director",
      "items": [
        {
          "id": "director",
          "label": "Roan Vesk — seismic-network director"
        },
        {
          "id": "seismologist",
          "label": "The state seismologist"
        },
        {
          "id": "engineer",
          "label": "The building-code engineer"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "office",
      "items": [
        {
          "id": "fault",
          "label": "The Fault Line & Sensor Sites"
        },
        {
          "id": "warncenter",
          "label": "The Alert Operations Centre"
        },
        {
          "id": "office",
          "label": "The Network's Budget Office"
        }
      ]
    },
    "what": {
      "title": "What source generated the seismic waves?",
      "truth": "silenced",
      "items": [
        {
          "id": "blast",
          "label": "An underground explosion produced a compact pressure-dominated source."
        },
        {
          "id": "freak",
          "label": "Fluid injection triggered slip on a previously stressed fault."
        },
        {
          "id": "silenced",
          "label": "Tectonic shear rupture produced a double-couple radiation pattern."
        }
      ]
    }
  },
  "PLACES": {
    "fault": {
      "name": "The Fault Line & Sensor Sites",
      "xy": [
        140,
        90
      ]
    },
    "warncenter": {
      "name": "The Alert Operations Centre",
      "xy": [
        330,
        240
      ]
    },
    "office": {
      "name": "The Network's Budget Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "fault",
      "warncenter"
    ],
    [
      "warncenter",
      "office"
    ]
  ],
  "CHARACTERS": {
    "fieldtech": {
      "name": "Field Tech Odile",
      "role": "Seismic field technician",
      "face": "📡",
      "badge": "O",
      "legend": "the fault sites",
      "hint": "Maintains station custody and can identify which offices controlled repairs and field access."
    },
    "dutyofficer": {
      "name": "The Duty Officer",
      "role": "Alert-centre duty officer",
      "face": "🚨",
      "badge": "D",
      "legend": "the alert centre",
      "hint": "Preserves alert-center staffing and the locations from which operational decisions were made."
    },
    "clerk": {
      "name": "The Clerk",
      "role": "Budget-office clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Holds network budgets, risk studies, and the authorization chain for monitoring work."
    }
  },
  "TOPICMAP": {
    "fault": {
      "fieldtech": [
        "mallet"
      ],
      "dutyofficer": [
        "wiechert"
      ],
      "clerk": [
        "reid"
      ]
    },
    "warncenter": {
      "fieldtech": [
        "gutenberg"
      ],
      "dutyofficer": [
        "bullen"
      ],
      "clerk": [
        "byerly"
      ]
    },
    "office": {
      "fieldtech": [
        "kanamori"
      ],
      "dutyofficer": [
        "hanks"
      ],
      "clerk": [
        "cornell"
      ]
    }
  },
  "TOPICS": {
    // cell: Field Tech Odile @ The Fault Line & Sensor Sites
    "mallet": {
      "sci": "Robert Mallet (1810-1881)",
      "topic": "The founding of seismology",
      "lede": "Robert Mallet turned shattered walls and stopped clocks into the first systematic map of an earthquake source.",
      "no": 1,
      "profile": "Robert Mallet began as an Irish engineer, not as a university geophysicist. He built bridges, foundries, and heavy machinery, but he became fascinated by the way shocks traveled through solids. In the 1840s he used controlled explosions to time elastic waves through rock, treating the ground as a medium whose behavior could be measured. He helped establish the vocabulary of seismology, including terms for an earthquake’s focus and the lines that connect places of equal shaking intensity.\n\nAfter the devastating 1857 Basilicata earthquake in southern Italy, Mallet crossed the damaged region with notebooks, compasses, and a camera. He recorded fallen walls, cracked masonry, displaced objects, and witness accounts. By comparing the directions in which structures failed, he tried to reconstruct where the shock originated. His method was imperfect by modern standards—buildings differ, soils amplify motion, and eyewitness descriptions are uneven—but it was a decisive move away from rumor toward mapped evidence.\n\nMallet’s work teaches three separations. Damage is not the same as source size. The strongest local destruction may reflect weak construction or soft ground. A source estimate improves when observations are distributed around the event rather than clustered on one side. Finally, a compact origin does not by itself identify a blast; earthquakes and explosions can both begin in a small region.\n\nFor Cordera, Mallet’s lesson is procedural. Plot arrival times, polarities, and damage without choosing the story first. A genuine explosion hypothesis must explain the network-wide wave pattern, not merely an abrupt first arrival. A tectonic or induced earthquake must also fit the mapped source, depth, and surrounding fault geometry.",
      "frame": "Field Tech Odile pins damage arrows around Cordera’s old quarter. “Mallet built a source map from broken masonry. Show me what those arrows can—and cannot—prove.”",
      "q": [
        {
          "q": "What made Mallet’s Basilicata survey a step toward modern seismology?",
          "o": [
            {
              "t": "He mapped damage directions across the region to estimate the earthquake source.",
              "v": "expert",
              "fb": "Mallet treated geographically distributed damage as data for locating the source."
            },
            {
              "t": "He ranked towns by destruction and used the worst damage as the exact epicenter.",
              "v": "partial",
              "fb": "Maximum damage can be shifted by building weakness and local ground conditions."
            },
            {
              "t": "He identified the source from one unusually loud report heard near the valley.",
              "v": "wrong",
              "fb": "A single report cannot separate source strength, distance, and local amplification."
            },
            {
              "t": "He treated the compact damage zone as sufficient evidence for an underground blast.",
              "v": "danger",
              "fb": "A compact source area does not distinguish an explosion from fault rupture."
            }
          ]
        },
        {
          "q": "Why can the most damaged neighborhood lie away from the earthquake source?",
          "o": [
            {
              "t": "Soft soil and vulnerable buildings can amplify shaking at a particular site.",
              "v": "expert",
              "fb": "Local geology and construction can intensify damage independently of source location."
            },
            {
              "t": "The source migrates toward the district that reports the greatest losses.",
              "v": "wrong",
              "fb": "The rupture does not relocate according to the later pattern of damage reports."
            },
            {
              "t": "Seismic waves travel fastest through loose sediment beneath weak buildings.",
              "v": "wrong",
              "fb": "Loose sediment commonly slows and amplifies waves rather than making them fastest."
            },
            {
              "t": "The largest visible losses are a useful clue, but they require wider mapping.",
              "v": "partial",
              "fb": "Damage maxima help only when compared with observations from many directions."
            }
          ]
        },
        {
          "q": "Which Cordera finding would most weaken the underground-explosion hypothesis?",
          "o": [
            {
              "t": "Mixed first-motion polarities form quadrants aligned with a mapped fault plane.",
              "v": "expert",
              "fb": "Compression and dilation quadrants are characteristic of double-couple shear rupture."
            },
            {
              "t": "The first station records a sharp onset from a compact source beneath the city.",
              "v": "partial",
              "fb": "Both explosions and earthquakes can begin abruptly from a compact source region."
            },
            {
              "t": "One damaged district lies closer to the epicenter than the other districts.",
              "v": "wrong",
              "fb": "Distance alone does not reveal whether the source was pressure or shear."
            },
            {
              "t": "Witnesses describe a boom before the strongest shaking reached their buildings.",
              "v": "danger",
              "fb": "Sound reports are affected by distance and perception and cannot replace waveform evidence."
            }
          ]
        }
      ],
      "whatHint": "Mallet’s damage maps ask whether one compact origin explains observations around the city. Map the pattern before turning an abrupt shock into evidence of a planted charge."
    },
    // cell: The Duty Officer @ The Fault Line & Sensor Sites
    "wiechert": {
      "sci": "Emil Wiechert (1861-1928)",
      "topic": "The seismograph & Earth's interior",
      "lede": "Emil Wiechert built instruments heavy enough to reveal both distant earthquakes and the hidden architecture of Earth.",
      "no": 2,
      "profile": "Emil Wiechert was trained in physics and became one of the first professors devoted specifically to geophysics. At Göttingen he designed massive mechanical seismographs whose heavy inertial masses moved differently from the ground beneath them. The relative motion was recorded on paper, turning a faint tremor from thousands of kilometers away into a trace that could be measured rather than merely felt.\n\nA seismogram is not a direct picture of the ground. Springs, damping, mass, leverage, and recording speed shape the line. Wiechert’s instruments therefore had to be calibrated: engineers needed to know how the apparatus transformed real motion into ink. That principle remains essential for electronic sensors. An unexplained spike may come from the Earth, the mounting, clipping, timing error, or the instrument response.\n\nWiechert also used seismic travel times to reason about Earth’s interior. He argued for a dense metallic core beneath a lighter mantle. Later observations refined the boundary and composition, but the method endured: waves that bend, reflect, slow, or disappear along certain paths reveal layers no drill can reach. Source interpretation and path interpretation must therefore be separated. A wave arriving weakly at one station may have crossed a different structure, not come from a weaker source.\n\nIn the Cordera inquiry, the instrument record must first survive an instrumental audit. If the unusual compact pulse appears after response correction at several well-timed stations, it is physical. If it appears only on one poorly damped sensor, it is not a source discriminator. Wiechert’s lesson prevents an apparent anomaly from becoming a dramatic explanation before calibration has earned it.",
      "frame": "The Duty Officer sets an old pendulum seismograph beside a modern accelerometer. “Both draw lines, but neither draws the ground directly. Tell me what must be removed from the trace.”",
      "q": [
        {
          "q": "What did Wiechert’s heavy seismographs measure?",
          "o": [
            {
              "t": "They recorded ground motion relative to a suspended inertial mass on paper.",
              "v": "expert",
              "fb": "The instrument converts relative motion between the frame and mass into a trace."
            },
            {
              "t": "They measured earthquake energy from the thickness of the inked line alone.",
              "v": "wrong",
              "fb": "Line thickness depends on the recorder and does not directly give earthquake energy."
            },
            {
              "t": "They located faults by pointing the instrument toward the loudest direction.",
              "v": "wrong",
              "fb": "Source location requires timing and geometry across stations, not instrument orientation."
            },
            {
              "t": "They provided useful traces whose mechanical response still required calibration.",
              "v": "partial",
              "fb": "The traces were valuable only after the instrument’s response was understood."
            }
          ]
        },
        {
          "q": "Why must seismologists correct for instrument response before comparing stations?",
          "o": [
            {
              "t": "Different sensors can record the same ground motion at different amplitudes.",
              "v": "expert",
              "fb": "Response correction places records from unlike instruments on a common physical scale."
            },
            {
              "t": "Correction forces every station to display the same peak acceleration.",
              "v": "wrong",
              "fb": "Real ground motion varies by path and site, so corrected records need not match."
            },
            {
              "t": "Correction removes differences caused by distance, geology, and source radiation.",
              "v": "partial",
              "fb": "It removes sensor effects, while path and site effects still require separate treatment."
            },
            {
              "t": "Uncorrected amplitude differences can be mistaken for an exotic source mechanism.",
              "v": "danger",
              "fb": "Instrument artifacts can look like source anomalies when calibration is ignored."
            }
          ]
        },
        {
          "q": "Which observation would make a claimed Cordera “pressure pulse” least trustworthy?",
          "o": [
            {
              "t": "The pulse appears on one poorly calibrated sensor but not on nearby stations.",
              "v": "expert",
              "fb": "A source signal should be coherent across the network after timing and response checks."
            },
            {
              "t": "The pulse arrives first at the station closest to the hypocenter.",
              "v": "partial",
              "fb": "Earlier arrival at the nearest station is expected for many source mechanisms."
            },
            {
              "t": "The pulse is followed by lower-frequency motion on several instruments.",
              "v": "wrong",
              "fb": "Frequency changes alone do not invalidate a physical first arrival."
            },
            {
              "t": "The pulse looks unusually sharp before the sensor response is deconvolved.",
              "v": "danger",
              "fb": "A sharp raw trace can be created or exaggerated by the recording system."
            }
          ]
        }
      ],
      "whatHint": "Wiechert would correct every trace for instrument response before trusting an unusual first pulse. A source signature should survive calibration at several stations, not live on one dramatic record."
    },
    // cell: The Clerk @ The Fault Line & Sensor Sites
    "reid": {
      "sci": "Harry Fielding Reid (1859-1944)",
      "topic": "Elastic rebound & fault rupture",
      "lede": "Harry Fielding Reid used survey lines bent by the 1906 earthquake to show how faults store and release strain.",
      "no": 3,
      "profile": "Harry Fielding Reid was a geophysicist at Johns Hopkins University when the 1906 San Francisco earthquake created an extraordinary natural experiment. Surveyors had measured positions across coastal California before the rupture. Afterward, the same benchmarks were measured again. Reid compared the two sets and found a broad pattern of deformation on both sides of the San Andreas Fault.\n\nFrom those measurements he developed elastic-rebound theory. Tectonic forces slowly deform the crust while parts of a fault remain locked. The surrounding rock stores elastic strain, much as a bent ruler stores energy. When frictional resistance is exceeded, the fault slips, the crust rebounds toward a less strained shape, and seismic waves carry away part of the released energy. The earthquake is therefore not a force that appears from nowhere; it is the rapid release of a longer mechanical history.\n\nElastic rebound does not predict the date of the next earthquake. Strain can be measured, but fault strength, geometry, fluid pressure, and interactions with neighboring faults remain uncertain. The theory instead gives investigators a testable source model. Surface offsets, geodetic deformation, aftershocks, and wave radiation should agree with slip on a fault.\n\nThis matters for Cordera’s competing explanations. Both naturally driven and injection-triggered earthquakes release shear stress on a fault and can display a double-couple pattern. Waveform shape alone cannot decide whether industry triggered the slip. To support induced seismicity, investigators also need a credible injection history, pressure pathway, and spatial-temporal relationship between wells and earthquakes. Reid confirms fault rupture; operational records determine what loaded or unclamped it.",
      "frame": "The Clerk unfolds two survey sheets, one dated before the quake and one after. “The benchmarks moved long before anyone argued about motive. Reconstruct what Reid saw.”",
      "q": [
        {
          "q": "What evidence led Reid to elastic-rebound theory after the 1906 earthquake?",
          "o": [
            {
              "t": "Repeated surveys showed broad strain and permanent displacement across the fault.",
              "v": "expert",
              "fb": "The before-and-after geodetic pattern revealed stored deformation released by slip."
            },
            {
              "t": "A single seismogram showed the fault had remained motionless before rupture.",
              "v": "wrong",
              "fb": "One waveform cannot recover the years of crustal deformation preceding an earthquake."
            },
            {
              "t": "Damage photographs proved that earthquakes begin where buildings are weakest.",
              "v": "wrong",
              "fb": "Building damage reflects exposure and site response as well as the source."
            },
            {
              "t": "The mapped offset supported fault slip, though it did not date the next rupture.",
              "v": "partial",
              "fb": "Elastic rebound explains the process without providing a precise earthquake clock."
            }
          ]
        },
        {
          "q": "What does elastic rebound say happens during a tectonic earthquake?",
          "o": [
            {
              "t": "A locked fault slips and releases elastic strain stored in surrounding rock.",
              "v": "expert",
              "fb": "The sudden slip converts accumulated strain energy into motion, heat, and fracture."
            },
            {
              "t": "A fault creates new tectonic stress after the first seismic wave arrives.",
              "v": "wrong",
              "fb": "Stress accumulates before rupture rather than being created by the recorded wave."
            },
            {
              "t": "The crust rebounds because the ground loses material during strong shaking.",
              "v": "wrong",
              "fb": "The rebound is mechanical deformation, not a change in crustal mass."
            },
            {
              "t": "Stored strain drives rupture; friction and fluids alter the failure threshold.",
              "v": "partial",
              "fb": "The core model is right, but fault strength and pore pressure shape when slip begins."
            }
          ]
        },
        {
          "q": "Why does a double-couple waveform not by itself rule out induced seismicity?",
          "o": [
            {
              "t": "Injection-triggered events can still slip in shear on an existing fault.",
              "v": "expert",
              "fb": "Induced earthquakes often share the same shear source physics as tectonic events."
            },
            {
              "t": "Injected fluid produces an isotropic blast pattern identical to an explosion.",
              "v": "wrong",
              "fb": "Fluid injection can alter fault stress without acting as a sudden explosive pressure source."
            },
            {
              "t": "Any earthquake near an industrial site is classified as induced by definition.",
              "v": "danger",
              "fb": "Proximity alone is weaker than a pressure pathway and a migrating event sequence."
            },
            {
              "t": "The waveform identifies fault slip, while operational timing tests the trigger.",
              "v": "partial",
              "fb": "Source mechanism and initiating cause are related but distinct questions."
            }
          ]
        }
      ],
      "whatHint": "Reid’s elastic rebound looks for strain stored along a fault and released in slip. Compare the deformation history with any recent pressure change or artificial trigger."
    },
    // cell: Field Tech Odile @ The Alert Operations Centre
    "gutenberg": {
      "sci": "Beno Gutenberg (1889-1960)",
      "topic": "Earth's core & the magnitude scale",
      "lede": "Beno Gutenberg used missing waves, travel times, and earthquake amplitudes to measure both Earth’s core and earthquake size.",
      "no": 4,
      "profile": "Beno Gutenberg grew up in Germany and became one of the central figures of twentieth-century seismology. At a time when global seismograph networks were still developing, he compared arrival times from earthquakes recorded across the world. Certain seismic phases weakened or disappeared over particular angular distances, while others bent sharply. From these patterns he estimated the depth of the core–mantle boundary at roughly 2,900 kilometers.\n\nThe insight rests on refraction. Wave speed changes with pressure, temperature, composition, and whether material behaves as a solid or liquid. P waves can pass through solids and liquids, although their paths bend; S waves require shear rigidity and do not travel through the liquid outer core. A station that lacks an expected phase is therefore not automatically broken. The missing arrival may carry information about the path through Earth.\n\nAt the California Institute of Technology, Gutenberg worked closely with Charles Richter on earthquake magnitude. Their relations converted instrument amplitudes, corrected for distance, into a common measure of source size. Gutenberg and Richter also described the statistical relation between magnitude and frequency: small earthquakes are common, while large ones are progressively rarer.\n\nCordera’s record requires both of Gutenberg’s habits. First, compare stations through a path model before treating an amplitude difference as source evidence. Second, distinguish magnitude from local intensity. A moderate event beneath soft sediment may damage one district severely, while a larger, deeper event causes broader but less concentrated losses. None of those facts alone distinguishes explosion, induced slip, and tectonic rupture; the judgment must use radiation pattern, depth, and context together.",
      "frame": "Field Tech Odile shades the P- and S-wave shadow zones on a globe. “A missing phase can be evidence instead of failure. Gutenberg made that distinction measurable.”",
      "q": [
        {
          "q": "How did Gutenberg use seismic waves to locate the core–mantle boundary?",
          "o": [
            {
              "t": "He matched travel-time bends and shadow zones produced by deep refraction.",
              "v": "expert",
              "fb": "Wave paths change sharply where seismic velocity and material state change."
            },
            {
              "t": "He drilled until rock density increased enough to stop the borehole.",
              "v": "wrong",
              "fb": "The boundary is far beyond drilling depth and was inferred remotely."
            },
            {
              "t": "He treated every absent phase as proof that its recording station had failed.",
              "v": "danger",
              "fb": "Systematic missing phases across distance ranges reveal Earth structure."
            },
            {
              "t": "He combined global arrivals with a model of changing wave speed inside Earth.",
              "v": "partial",
              "fb": "That describes the method, though the shadow-zone geometry provides the strongest constraint."
            }
          ]
        },
        {
          "q": "Why is local damage intensity not the same quantity as earthquake magnitude?",
          "o": [
            {
              "t": "Intensity varies with distance, soil, and buildings; magnitude describes source size.",
              "v": "expert",
              "fb": "One event has a magnitude but can produce many local intensity values."
            },
            {
              "t": "Magnitude changes from district to district as the shaking crosses the city.",
              "v": "wrong",
              "fb": "Magnitude is assigned to the source, not separately to each neighborhood."
            },
            {
              "t": "Intensity is calculated from fault area, while magnitude comes from eyewitness reports.",
              "v": "wrong",
              "fb": "Those roles are reversed: intensity uses local effects, while magnitude estimates source size."
            },
            {
              "t": "A severe district can reflect site amplification rather than a larger local source.",
              "v": "partial",
              "fb": "Local conditions can concentrate damage without changing the earthquake’s source magnitude."
            }
          ]
        },
        {
          "q": "Which comparison best tests whether Cordera’s compact source was unusual?",
          "o": [
            {
              "t": "Correct amplitudes for distance and path, then compare P and S radiation by azimuth.",
              "v": "expert",
              "fb": "Path correction and radiation geometry are needed before interpreting source physics."
            },
            {
              "t": "Compare the largest raw amplitude with the loudest explosion in the city archive.",
              "v": "danger",
              "fb": "Raw amplitude mixes instrument, path, site, and source effects."
            },
            {
              "t": "Use the highest reported intensity as a direct measure of compressional energy.",
              "v": "wrong",
              "fb": "Damage intensity does not isolate the P-wave energy emitted by the source."
            },
            {
              "t": "Estimate magnitude first, then add polarity and spectral evidence from the network.",
              "v": "partial",
              "fb": "Magnitude is useful context, but mechanism requires additional waveform evidence."
            }
          ]
        }
      ],
      "whatHint": "Gutenberg’s travel times constrain source depth. A focus seated in ordinary crust weighs differently from a shallow pressure source near the surface."
    },
    // cell: The Duty Officer @ The Alert Operations Centre
    "bullen": {
      "sci": "Keith Bullen (1906-1976)",
      "topic": "The layered model of the Earth",
      "lede": "Keith Bullen forced seismic travel times, gravity, density, and elasticity to agree in one layered model of Earth.",
      "no": 5,
      "profile": "Keith Bullen was a New Zealand–born mathematician who became a leading seismologist through careful work on Earth’s internal structure. Building on global travel-time observations, he developed reference models that divided the planet into regions with distinct density and elastic properties. His “Bullen regions” gave researchers a practical vocabulary for the crust, mantle, transition zones, outer core, and inner core.\n\nA travel-time curve is not merely a timetable. Its slope and curvature reflect how wave speed changes with depth. P and S waves turn gradually through the mantle, refract at boundaries, and generate multiple phases through reflection and conversion. Bullen combined these observations with gravity, Earth’s mass, and physical constraints on compression. A model that fits arrival times but implies an impossible density distribution is not adequate.\n\nThat discipline matters whenever investigators interpret a network. The source creates the wavefield, but the planet filters it. Two stations at similar epicentral distance can record different frequency content because their rays sample different structures or because local sediments modify the motion. Analysts therefore compare observed arrivals with predicted phases and retain residuals instead of forcing every trace to match one preferred model.\n\nFor Cordera, Bullen’s lesson guards against declaring an explosion from one odd phase. A pressure-dominated source should produce a coherent source signature after path effects are modeled. If the apparent anomaly disappears when phase identity, crustal structure, and station response are corrected, it was never evidence for a blast. Conversely, a stable pattern of compression and dilation across many paths survives reasonable Earth models and points back to shear faulting.",
      "frame": "The Duty Officer lays transparent ray paths over a cross-section of Earth. “Before you blame the source, account for what the planet did to the signal.”",
      "q": [
        {
          "q": "What made Bullen’s Earth models more than fitted travel-time tables?",
          "o": [
            {
              "t": "They also had to agree with density, gravity, and elastic constraints.",
              "v": "expert",
              "fb": "Bullen required seismic and physical properties to form a consistent interior model."
            },
            {
              "t": "They assumed each seismic phase traveled through a nearly uniform planet.",
              "v": "wrong",
              "fb": "Layering and changing velocity are central to the observed travel-time curves."
            },
            {
              "t": "They classified seismic stations by the amount of damage reported nearby.",
              "v": "wrong",
              "fb": "His models described Earth structure, not local damage intensity."
            },
            {
              "t": "They divided Earth into useful regions that later evidence could refine.",
              "v": "partial",
              "fb": "The regional framework was valuable, though consistency across datasets was the key strength."
            }
          ]
        },
        {
          "q": "Why can two equally distant stations record different waveforms from one earthquake?",
          "o": [
            {
              "t": "Their rays and local sites may filter amplitude and frequency differently.",
              "v": "expert",
              "fb": "Path and site effects can alter records even at similar epicentral distances."
            },
            {
              "t": "Each station receives a separate earthquake generated by the same fault.",
              "v": "wrong",
              "fb": "A single rupture radiates waves along many paths rather than creating new events at stations."
            },
            {
              "t": "Equal distance suggests equal amplitudes unless one instrument is defective.",
              "v": "danger",
              "fb": "Distance alone does not control radiation direction, structure, or local amplification."
            },
            {
              "t": "Station response is one possible cause, alongside path and near-surface geology.",
              "v": "partial",
              "fb": "Instrument response matters, but it is not the sole reason records differ."
            }
          ]
        },
        {
          "q": "What would make a Cordera source anomaly robust against path-model uncertainty?",
          "o": [
            {
              "t": "The same polarity pattern persists across many azimuths and reasonable Earth models.",
              "v": "expert",
              "fb": "A stable network pattern is harder to explain as a path artifact."
            },
            {
              "t": "One station records an unexplained phase absent from a simplified reference model.",
              "v": "danger",
              "fb": "Misidentified phases and local structure commonly create isolated discrepancies."
            },
            {
              "t": "The nearest station records the largest peak acceleration in the entire network.",
              "v": "wrong",
              "fb": "Peak acceleration near the source does not identify the source mechanism."
            },
            {
              "t": "Several stations show similar timing after phase labels and clocks are checked.",
              "v": "partial",
              "fb": "Coherent timing helps, though polarity and S-wave radiation add stronger mechanism tests."
            }
          ]
        }
      ],
      "whatHint": "Bullen’s layered Earth can bend and reshape arrivals without changing the source. Remove path effects before calling the remaining pattern exotic."
    },
    // cell: The Clerk @ The Alert Operations Centre
    "byerly": {
      "sci": "Perry Byerly (1897-1978)",
      "topic": "First motions & fault planes",
      "lede": "Perry Byerly learned to infer a hidden fault plane from the first upward or downward twitch at many stations.",
      "no": 6,
      "profile": "Perry Byerly spent much of his career at the University of California, Berkeley, where he helped build a regional seismic network and developed methods for reading the first motion of P waves. When a P wave reaches a station, the ground initially moves either away from the source as a compression or toward it as a dilation. One sign at one station says little. The pattern over many directions is powerful.\n\nA shear fault produces a double-couple radiation pattern. Around the source are alternating quadrants of compressional and dilatational first motions, separated by nodal planes. One plane represents the fault; the other is an auxiliary plane mathematically compatible with the same first-motion data. Geological mapping, aftershocks, or surface rupture is usually needed to choose between them.\n\nAn idealized explosion is different. A rapid increase of pressure radiates P waves outward in all directions, producing predominantly compressional first motions and relatively little shear-wave energy. Real sources and complex geology blur the textbook patterns, but the network distinction remains one of the strongest tests between a pressure source and fault slip.\n\nCordera’s first-motion plot is therefore central to the WHAT judgment. If compressions and dilations occupy stable quadrants and the S waves are strong, an underground explosion becomes difficult to defend. That finding establishes shear rupture, not its trigger. To distinguish naturally accumulated tectonic stress from injection-triggered slip, the board must then examine wells, pressure changes, event migration, and timing. Byerly’s method answers “how did the source move?” before the inquiry asks “why did it move then?”",
      "frame": "The Clerk turns a polar plot so its black and white quadrants face you. “One station gives a twitch. A network gives geometry. Read Byerly’s pattern.”",
      "q": [
        {
          "q": "What information does a P-wave first-motion polarity record?",
          "o": [
            {
              "t": "Whether the first ground motion at a station is compressional or dilatational.",
              "v": "expert",
              "fb": "The initial direction becomes useful when mapped across many station azimuths."
            },
            {
              "t": "Whether the station lies on the true fault plane rather than the auxiliary plane.",
              "v": "partial",
              "fb": "First motions define two nodal planes; other evidence selects the actual fault."
            },
            {
              "t": "Whether the earthquake will be followed by a larger event within one day.",
              "v": "wrong",
              "fb": "Polarity constrains source geometry, not the timing of future earthquakes."
            },
            {
              "t": "Whether the first arrival was produced by local soil rather than the source.",
              "v": "wrong",
              "fb": "Local conditions matter, but polarity analysis primarily targets source radiation."
            }
          ]
        },
        {
          "q": "What pattern is expected from a tectonic double-couple source?",
          "o": [
            {
              "t": "Alternating quadrants of compression and dilation separated by nodal planes.",
              "v": "expert",
              "fb": "Shear slip creates the characteristic four-lobed first-motion pattern."
            },
            {
              "t": "Outward compression at nearly every station and weak shear radiation.",
              "v": "danger",
              "fb": "That pattern is more consistent with an idealized explosion."
            },
            {
              "t": "Identical amplitudes and polarities at stations in every direction.",
              "v": "wrong",
              "fb": "Radiation from fault slip varies strongly with azimuth."
            },
            {
              "t": "Two possible nodal planes, with geology needed to identify the actual fault.",
              "v": "partial",
              "fb": "First motions leave a fault-plane ambiguity that other observations must resolve."
            }
          ]
        },
        {
          "q": "What can Byerly’s method establish about the Cordera event?",
          "o": [
            {
              "t": "It can reject a pressure source if the network shows double-couple radiation.",
              "v": "expert",
              "fb": "Mixed quadrants and strong shear energy undermine the explosion hypothesis."
            },
            {
              "t": "It can determine whether industrial injection or tectonic loading triggered the slip.",
              "v": "danger",
              "fb": "Both triggers can culminate in the same shear fault mechanism."
            },
            {
              "t": "It can locate the responsible office from the orientation of the nodal planes.",
              "v": "wrong",
              "fb": "Source geometry contains no information about administrative responsibility."
            },
            {
              "t": "It identifies the rupture style, while trigger attribution needs operational records.",
              "v": "partial",
              "fb": "Mechanism and cause must be tested with different evidence streams."
            }
          ]
        }
      ],
      "whatHint": "Byerly’s first motions separate pressure from shear: outward compression all around differs from alternating compression and dilation. Plot the polarities across azimuths."
    },
    // cell: Field Tech Odile @ The Network's Budget Office
    "kanamori": {
      "sci": "Hiroo Kanamori (b. 1936)",
      "topic": "The moment magnitude scale",
      "lede": "Hiroo Kanamori replaced saturating magnitude scales with a measure tied to fault area, slip, and rock rigidity.",
      "no": 7,
      "profile": "Hiroo Kanamori’s work reshaped how seismologists describe very large earthquakes. Traditional magnitude scales used selected wave amplitudes and worked well over limited ranges, but they could saturate: earthquakes of very different physical size received similar values because the measured waves no longer increased proportionally.\n\nKanamori emphasized seismic moment, a quantity tied to the rigidity of the rocks, the area of the fault that slipped, and the average amount of slip. With Thomas Hanks he introduced the moment-magnitude scale, which converts seismic moment into a familiar logarithmic magnitude while remaining physically meaningful for great earthquakes. Moment can be estimated from long-period waveforms and, in modern practice, from full moment-tensor solutions.\n\nThe moment tensor also describes source geometry. Its double-couple part represents shear slip on a fault; an isotropic component represents expansion or contraction. Real inversions include uncertainty and can be distorted by poor station coverage or an inadequate Earth model. A small apparent isotropic term is not automatically an explosion. Analysts test whether it is stable across data choices and whether strong shear radiation remains.\n\nFor Cordera, Kanamori’s framework strengthens two distinctions. A stable double-couple tensor supports fault rupture over a compact pressure source. Yet the tensor does not identify whether tectonic loading or fluid injection triggered that fault. An induced event can have an ordinary double-couple mechanism. Trigger attribution requires the seismic solution to be combined with depth, mapped faults, injection volumes, pressure diffusion, and the timing of nearby events. That sequence keeps mechanism, trigger, and institutional responsibility from collapsing into one claim.",
      "frame": "Field Tech Odile writes three terms beneath a focal mechanism: rigidity, area, slip. “Kanamori made magnitude answer to the fault itself. Build the quantity.”",
      "q": [
        {
          "q": "What physical factors determine seismic moment?",
          "o": [
            {
              "t": "Rock rigidity, fault area, and average slip across the rupture.",
              "v": "expert",
              "fb": "Their product links the earthquake size to the mechanics of the fault."
            },
            {
              "t": "Peak damage intensity, population exposure, and warning time.",
              "v": "wrong",
              "fb": "Those quantities describe consequences and operations, not seismic moment."
            },
            {
              "t": "The loudest P wave, the nearest station, and the event duration.",
              "v": "partial",
              "fb": "Waveforms help estimate moment, but those three observations do not define it."
            },
            {
              "t": "Explosive pressure, crater size, and outward compressional arrivals.",
              "v": "wrong",
              "fb": "That description applies to a pressure source rather than the general definition of moment."
            }
          ]
        },
        {
          "q": "Why was moment magnitude an improvement for the largest earthquakes?",
          "o": [
            {
              "t": "It stays tied to seismic moment when older amplitude scales begin to saturate.",
              "v": "expert",
              "fb": "Moment magnitude preserves physical scaling across very large ruptures."
            },
            {
              "t": "It assigns a separate magnitude to every neighborhood affected by shaking.",
              "v": "wrong",
              "fb": "Local variation is described by intensity and ground motion, not separate source magnitudes."
            },
            {
              "t": "It removes uncertainty by using fault dimensions measured before rupture.",
              "v": "wrong",
              "fb": "Fault dimensions and slip are estimated after or during the event and remain uncertain."
            },
            {
              "t": "It represents great events better, though local damage still depends on site effects.",
              "v": "partial",
              "fb": "Improved source scaling does not make magnitude a complete damage forecast."
            }
          ]
        },
        {
          "q": "What would a robust moment-tensor solution imply for Cordera?",
          "o": [
            {
              "t": "A dominant double-couple term would support shear faulting over an explosion.",
              "v": "expert",
              "fb": "Shear radiation is the expected signature of slip on a fault."
            },
            {
              "t": "A double-couple term would establish that fluid injection played no role.",
              "v": "danger",
              "fb": "Moment tensors identify source mechanics more directly than the initiating trigger."
            },
            {
              "t": "A small isotropic term identifies a concealed blast beneath the network.",
              "v": "wrong",
              "fb": "Model errors and complex rupture can create unstable minor isotropic components."
            },
            {
              "t": "The tensor should be tested across station subsets and plausible Earth models.",
              "v": "partial",
              "fb": "Stability checks are needed before interpreting small non-double-couple terms."
            }
          ]
        }
      ],
      "whatHint": "Kanamori’s moment tensor asks how much of the source is double-couple shear and how much is isotropic expansion. Strong, stable shear radiation points toward slip on a plane."
    },
    // cell: The Duty Officer @ The Network's Budget Office
    "hanks": {
      "sci": "Thomas C. Hanks (b. 1944)",
      "topic": "Strong ground motion & stress drop",
      "lede": "Thomas Hanks connected earthquake source physics to the frequency, duration, and damaging strength of recorded ground motion.",
      "no": 8,
      "profile": "Thomas C. Hanks worked at the intersection of source seismology and earthquake engineering. He studied how earthquakes radiate energy across frequency and how source dimensions, stress drop, propagation, and local geology shape strong-motion records. With Hiroo Kanamori he introduced moment magnitude, linking a practical magnitude scale to the physical seismic moment of the rupture.\n\nStress drop is the change in shear stress across the fault during an earthquake. It is inferred from source spectra and rupture dimensions rather than read directly from a single peak. Events with similar seismic moment can differ in corner frequency, duration, and high-frequency radiation. Those differences matter to structures: short, sharp motion may challenge stiff systems, while longer-period motion can strongly affect tall buildings and bridges.\n\nPeak ground acceleration is therefore not a universal measure of source size or damage. It is sensitive to frequency content, distance, radiation direction, near-surface geology, and the instrument. Engineers examine acceleration, velocity, displacement, response spectra, and duration together. A citywide hazard judgment built from one maximum value throws away the very distinctions that make the record useful.\n\nIn Cordera, Hanks’s work helps test both dramatic alternatives. A compact explosion may radiate unusually strong P energy and a different spectral balance from ordinary shear slip. An injection-triggered earthquake, however, can show stress drop and strong motion within the range of tectonic events. To argue for injection, the board needs an operational link, not merely an unusual acceleration trace. Strong-motion evidence describes how the rupture loaded the city; it does not by itself name the trigger.",
      "frame": "The Duty Officer overlays two response spectra from earthquakes of the same magnitude. “One damaged short buildings; the other moved towers. Hanks explains why the number alone is not enough.”",
      "q": [
        {
          "q": "What does earthquake stress drop describe?",
          "o": [
            {
              "t": "The reduction in shear stress on the fault as the rupture slips.",
              "v": "expert",
              "fb": "Stress drop connects the pre- and post-slip state of the fault."
            },
            {
              "t": "The decrease in atmospheric pressure after strong ground motion.",
              "v": "wrong",
              "fb": "Stress drop concerns fault shear stress, not weather pressure."
            },
            {
              "t": "The difference between reported magnitude and local damage intensity.",
              "v": "wrong",
              "fb": "Magnitude and intensity are distinct, but their difference is not stress drop."
            },
            {
              "t": "A source property estimated from spectra and rupture dimensions.",
              "v": "partial",
              "fb": "That is how stress drop is estimated, alongside the mechanical definition."
            }
          ]
        },
        {
          "q": "Why can equal-magnitude earthquakes produce different structural damage?",
          "o": [
            {
              "t": "Their frequency content, duration, direction, and site response can differ.",
              "v": "expert",
              "fb": "Magnitude alone does not specify the time and frequency structure of shaking."
            },
            {
              "t": "One magnitude value applies to buildings, while another applies to the ground.",
              "v": "wrong",
              "fb": "Magnitude describes the source; structures respond to the resulting ground motion."
            },
            {
              "t": "The larger damage total means the source magnitude was calculated incorrectly.",
              "v": "danger",
              "fb": "Exposure and vulnerability can change losses without invalidating the magnitude."
            },
            {
              "t": "Response spectra reveal differences that a single peak acceleration can conceal.",
              "v": "partial",
              "fb": "Spectral demand is a key part of explaining why structures respond differently."
            }
          ]
        },
        {
          "q": "Which Cordera claim is unsupported by strong-motion data alone?",
          "o": [
            {
              "t": "The event was injection-triggered because one station recorded a sharp acceleration.",
              "v": "expert",
              "fb": "A sharp local record does not establish an industrial pressure pathway or trigger."
            },
            {
              "t": "The city experienced damaging high-frequency motion close to the rupture.",
              "v": "partial",
              "fb": "Strong-motion records can support that statement when site response is considered."
            },
            {
              "t": "The source likely involved shear slip if S-wave energy is strong across the network.",
              "v": "partial",
              "fb": "Strong S radiation supports faulting, though mechanism analysis should use the full network."
            },
            {
              "t": "The event was an explosion because the nearest station had the largest peak.",
              "v": "danger",
              "fb": "Large near-source acceleration is expected for many earthquakes and is not diagnostic."
            }
          ]
        }
      ],
      "whatHint": "Hanks would compare stress drop, spectrum, and duration with ordinary fault earthquakes. An unusual acceleration peak alone cannot establish either a blast or an injection trigger."
    },
    // cell: The Clerk @ The Network's Budget Office
    "cornell": {
      "sci": "C. Allin Cornell (1938-2007)",
      "topic": "Probabilistic seismic hazard",
      "lede": "C. Allin Cornell turned uncertain faults, recurrence rates, and shaking models into a probability framework for engineering decisions.",
      "no": 9,
      "profile": "C. Allin Cornell was a Stanford engineer whose 1968 work established the modern framework of probabilistic seismic hazard analysis. Rather than selecting one “design earthquake,” he represented multiple possible sources, their rates of occurrence, the distribution of magnitudes, and the range of ground motions each event might produce at a site.\n\nThe calculation integrates uncertainty instead of erasing it. A nearby fault may generate frequent moderate events; a distant subduction zone may produce rare, enormous earthquakes. Ground-motion models add scatter because events of the same magnitude and distance do not shake a site identically. The result is commonly expressed as an annual probability that a level of acceleration or spectral demand will be exceeded.\n\nProbability is not a schedule. A one-percent chance in fifty years does not mean the event arrives once every five thousand years on a timetable. Nor does low probability mean negligible risk when the consequence is catastrophic. Engineers use hazard curves with structural vulnerability and acceptable-risk decisions to set codes, retrofit priorities, and emergency plans.\n\nCornell’s framework also disciplines the Cordera inquiry. Before the event, the network budget should have been based on plausible consequences, not the claim that an unusual source was too unlikely to matter. After the event, hazard probability cannot identify whether the rupture was explosive, induced, or tectonic. That judgment belongs to waveforms and operational evidence. Hazard analysis can show that damaging fault rupture was a known possibility and that maintaining stations and alert delivery had measurable value even without short-term prediction.",
      "frame": "The Clerk places a hazard curve beside a repair budget. “Cornell did not promise a date. He showed what a low annual probability can still demand from an institution.”",
      "q": [
        {
          "q": "What does probabilistic seismic hazard analysis combine?",
          "o": [
            {
              "t": "Source recurrence, magnitude ranges, ground-motion models, and uncertainty.",
              "v": "expert",
              "fb": "Cornell’s framework integrates many possible earthquakes and their shaking distributions."
            },
            {
              "t": "One worst-case earthquake selected as the event expected during next year.",
              "v": "wrong",
              "fb": "Probabilistic analysis does not choose a single scheduled future event."
            },
            {
              "t": "Historical damage totals used without models for source or ground motion.",
              "v": "wrong",
              "fb": "Loss history alone cannot represent unobserved but plausible future events."
            },
            {
              "t": "Multiple source scenarios, though vulnerability is added in a separate risk step.",
              "v": "partial",
              "fb": "Hazard estimates shaking likelihood; risk also includes exposure and vulnerability."
            }
          ]
        },
        {
          "q": "How should a “one percent chance in fifty years” statement be interpreted?",
          "o": [
            {
              "t": "It is an exceedance probability over that period, not a calendar prediction.",
              "v": "expert",
              "fb": "The statement summarizes likelihood without specifying when an event will occur."
            },
            {
              "t": "It means the earthquake is expected exactly once every five thousand years.",
              "v": "wrong",
              "fb": "Recurrence is probabilistic and does not operate as a fixed timetable."
            },
            {
              "t": "It means preparation can wait until the final year of the interval.",
              "v": "danger",
              "fb": "Probability does not concentrate the risk at the end of the stated period."
            },
            {
              "t": "It can still justify mitigation when the consequences of exceedance are severe.",
              "v": "partial",
              "fb": "Low probability and high consequence can rationally support substantial preparation."
            }
          ]
        },
        {
          "q": "What can Cornell’s method legitimately say about the Cordera network cuts?",
          "o": [
            {
              "t": "Known hazard and high consequences gave station maintenance measurable value.",
              "v": "expert",
              "fb": "Hazard analysis can support resilient monitoring even without predicting the event date."
            },
            {
              "t": "The hazard curve identifies Roan Vesk as the person responsible for the outage.",
              "v": "wrong",
              "fb": "A probabilistic model contains no administrative chain of responsibility."
            },
            {
              "t": "The probability calculation identifies the rupture as tectonic rather than induced.",
              "v": "wrong",
              "fb": "Source attribution requires waveform and operational evidence."
            },
            {
              "t": "Low annual probability made reducing sensors reasonable until a precursor appeared.",
              "v": "danger",
              "fb": "Monitoring and codes are valuable precisely because reliable short-term precursors are absent."
            }
          ]
        }
      ],
      "whatHint": "Cornell’s source maps ask whether the hypocenter follows a known fault or a pressure pathway from wells. Geography and timing must accompany the waveform mechanism."
    }
  },
  "STORIES": {
    "fieldtech": {
      "fault": "At the fault sites, Odile levels a temporary sensor and circles three stations on the map. “Tell me why Mallet trusted distributed damage before I release the field notebook.”",
      "warncenter": "Beside the telemetry wall, Odile marks a late packet and a clean neighboring feed. “Use Gutenberg’s travel-time discipline, and I’ll show you which depth estimate survived.”",
      "office": "Among maintenance invoices, Odile unfolds a moment-tensor printout stained with red dust. “Read Kanamori carefully; then we can discuss what the network actually measured.”"
    },
    "dutyofficer": {
      "fault": "The Duty Officer checks the timing beacon against a portable recorder at the ridge station. “Wiechert would audit the instrument first. Do that, and the alert log opens.”",
      "warncenter": "Inside the operations centre, the Duty Officer replays arrivals at quarter speed. “Bullen’s layered Earth separates path from source; earn the replay annotations.”",
      "office": "At a table of staffing rosters and strong-motion summaries, the Duty Officer taps the spectral plot. “Hanks gives you the right comparison before I explain the delayed bulletin.”"
    },
    "clerk": {
      "fault": "The Clerk matches survey benchmarks to a sealed waveform drive. “Reid starts with stored deformation, not headlines. Show me you can follow that history.”",
      "warncenter": "A first-motion sphere covers the Clerk’s desk, half black and half white. “Byerly’s quadrants decide what this page can rule out; read them before I stamp the copy.”",
      "office": "The Clerk lays fault maps beside well permits and a canceled station contract. “Cornell asks which sources were plausible and where they sit. Answer that, and you may read the budget chain.”"
    }
  },
  "story": [
    "<b>Nine Seconds to Cordera</b> opens inside the Cordera earthquake inquiry, where the visible damage is easier to describe than the chain that produced it.",
    "<b>Field Tech Odile</b>, <b>The Duty Officer</b>, and <b>The Clerk</b> each control a different slice of the record, and each conversation turns one real pioneer into a way of reading the case.",
    "Some witnesses are drawn toward <b>An underground explosion produced a compact pressure-dominated source.</b>; others settle too quickly on <b>Fluid injection triggered slip on a previously stressed fault.</b>. Your job is to separate those tempting stories from the harder explanation the evidence supports.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide what the case is really about."
  ],
  "endings": {
    "overclaimWhat": "blast",
    "dismissalWhat": "freak",
    "win": {
      "expertTitle": "A Shear Fault, Not a Pressure Source",
      "expert": [
        "Investigator Mara Solveig names Roan Vesk — seismic-network director, The Network's Budget Office, and Tectonic shear rupture produced a double-couple radiation pattern. Not An underground explosion produced a compact pressure-dominated source. Not Fluid injection triggered slip on a previously stressed fault.",
        "The readings distinguish an isotropic explosion, injection-triggered slip, and tectonic double-couple rupture using first-motion polarity, P-to-S energy, source depth, spatial association, and aftershock geometry."
      ],
      "soundTitle": "A Sound Source-Mechanism Finding",
      "sound": [
        "Moment evidence fixes the trio: Roan Vesk — seismic-network director; The Network's Budget Office; Tectonic shear rupture produced a double-couple radiation pattern.",
        "Waveform interpretation is sound, even though the budget chronology has not been completely assembled."
      ],
      "namedTitle": "Correct Physics, Sparse Chain",
      "named": [
        "Moment evidence points to Roan Vesk — seismic-network director, The Network's Budget Office, and Tectonic shear rupture produced a double-couple radiation pattern; moment support remains incomplete.",
        "The source mechanism is correct, but an accusation this lightly supported cannot anchor the bulletin."
      ]
    },
    "overclaim": {
      "title": "The Explosion Hypothesis",
      "body": [
        "Investigator Mara Solveig identifies An underground explosion produced a compact pressure-dominated source. First-motion polarity rejects an isotropic pressure source.",
        "An explosion radiates predominantly compressional energy from a compact pressure source and tends to show outward first motions. The observed mixed polarities and strong shear radiation fit fault slip instead."
      ]
    },
    "dismissal": {
      "title": "The Injection-Triggered Hypothesis",
      "body": [
        "Investigator Mara Solveig instead argues Fluid injection triggered slip on a previously stressed fault. No injection source or migrating sequence matches the hypocenter.",
        "Induced seismicity requires a plausible injection history and a spatial-temporal migration from wells or reservoirs. No such pressure source or migration aligns with the rupture."
      ]
    },
    "wrongNames": {
      "title": "Right Source, Wrong Names",
      "body": [
        "Tectonic rupture is identified correctly, but the responsible person or location is wrong. Reassemble the network clue chain."
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A fault scarp and seismic trace\"><path d=\"M0 86 L200 86 L258 48 L350 118 L470 76 L660 76\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.6\"/><path d=\"M258 48 L258 126\" fill=\"none\" stroke=\"#B3261E\" stroke-width=\"2.2\" stroke-dasharray=\"4 4\"/><path d=\"M24 30 L180 30\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.3\"/><path d=\"M24 30 C46 30,52 18,70 18 C88 18,96 42,120 42 C138 42,146 24,168 24 C186 24,194 34,212 34 C228 34,238 10,262 10 C282 10,292 48,320 48 C336 48,350 30,374 30 C394 30,404 22,424 22 C450 22,458 46,482 46 C504 46,512 18,534 18 C558 18,568 36,588 36 C610 36,616 26,636 26\" fill=\"none\" stroke=\"#326891\" stroke-width=\"1.8\"/><circle cx=\"258\" cy=\"48\" r=\"5\" fill=\"#B3261E\"/><path d=\"M370 92 C420 58,500 60,548 92\" fill=\"none\" stroke=\"#e2e2d8\" stroke-width=\"1\"/><path d=\"M390 102 C430 78,490 78,530 102\" fill=\"none\" stroke=\"#e2e2d8\" stroke-width=\"1\"/></svg>"
}
};
