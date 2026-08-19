// Casebook V3 — three informants, three readings, one clue per correct answer.
module.exports = { PACK: {
  "schemaVersion": 3,
  "mode": "three_informants_three_readings",
  "id": "e_tsunami",
  "title": "The Sable Point Wave",
  "discipline": "Tsunami Science & Oceanography",
  "venue": "the Sable Point tsunami inquiry",
  "agent": {
    "name": "Investigator Ravi Enns",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Tsunami-Science Pioneers",
  "dossierName": "TSUNAMI-SCIENCE PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Sable Point tsunami inquiry",
  "teaser": "The sea withdraws and returns before Sable Point receives a useful warning. Did an underwater blast make the wave, did officials neglect a working detection network, or did a nearby submarine landslide generate a wave that reached shore before deep-ocean confirmation could arrive?",
  "overclaimTag": "an explosive source beneath the sea",
  "truthTag": "a near-field landslide tsunami outrunning the warning cycle",
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A submarine slope failure sending a short-travel tsunami to shore\"><path d=\"M20 42 C150 36,280 48,420 40 S560 48,640 38\" fill=\"none\" stroke=\"#326891\" stroke-width=\"3\"/><path d=\"M30 116 C150 102,250 114,350 88 S520 70,640 90\" fill=\"none\" stroke=\"#121212\" stroke-width=\"3\"/><path d=\"M320 82 l52 12 -34 18z\" fill=\"#B3261E\"/><path d=\"M410 72 C450 50,490 52,525 42\" fill=\"none\" stroke=\"#e2e2d8\" stroke-width=\"3\"/><path d=\"M570 34 v78 h45\" stroke=\"#121212\" stroke-width=\"2\"/></svg>",
  "overclaimTease": "A local tsunami can be both rare and physically legible. Back-project the arrival, compare the source spectrum, and ask whether the warning system had enough travel time to act.",
  "DAYS_TOTAL": 3,
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "slope",
      "items": [
        {
          "id": "slope",
          "label": "An act of nature — a near-field slope failure, not a person"
        },
        {
          "id": "chief",
          "label": "Nadia Voss — tsunami-warning chief"
        },
        {
          "id": "oceanographer",
          "label": "The duty oceanographer"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "shore",
      "items": [
        {
          "id": "watchfloor",
          "label": "The Tsunami Warning Centre"
        },
        {
          "id": "shore",
          "label": "The Offshore Canyon & Shore Stations"
        },
        {
          "id": "office",
          "label": "The Warning Programme Office"
        }
      ]
    },
    "what": {
      "title": "What happened",
      "truth": "freak",
      "items": [
        {
          "id": "freak",
          "label": "A nearby submarine landslide outran the useful warning cycle"
        },
        {
          "id": "neglected",
          "label": "A distant tsunami went unconfirmed after network neglect"
        },
        {
          "id": "blast",
          "label": "An explosive source beneath the sea generated the destructive wave"
        }
      ]
    }
  },
  "READING_ORDER": [
    "buoytech",
    "watchstander",
    "clerk"
  ],
  "CHARACTERS": {
    "buoytech": {
      "name": "Buoy Tech Sana",
      "role": "Ocean-observing technician",
      "face": "🛟",
      "badge": "S",
      "legend": "the buoy network",
      "hint": "Every operating buoy passed its self-test; the first deep-ocean signal arrived after the nearest shore gauge was already climbing.",
      "reading": "bernard"
    },
    "watchstander": {
      "name": "The Watchstander",
      "role": "Tsunami warning-centre watchstander",
      "face": "🌊",
      "badge": "W",
      "legend": "the forecast console",
      "hint": "Back-projection points to the nearby canyon wall, leaving minutes rather than the long travel time of a basin-crossing wave.",
      "reading": "titov"
    },
    "clerk": {
      "name": "The Marine Records Clerk",
      "role": "Seismic and bathymetric records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the source archive",
      "hint": "The acoustic and seismic record shows a prolonged slope collapse without the compact pressure pulse of an explosion.",
      "reading": "kajiura"
    }
  },
  "TOPICS": {
    "bernard": {
      "sci": "Eddie Bernard (tsunami-warning oceanographer)",
      "topic": "The DART deep-ocean buoy network",
      "lede": "Bernard helped build the pressure-buoy system that can buy distant coasts hours, but cannot manufacture time for a local source.",
      "no": 1,
      "profile": "Eddie Bernard spent decades developing and operating systems intended to detect tsunamis before they reached distant coasts. Working with the United States tsunami research program and later directing NOAA’s Pacific Marine Environmental Laboratory, he helped advance the Deep-ocean Assessment and Reporting of Tsunamis system, known as DART.\n\nA DART station places a pressure recorder on the seafloor and a communication buoy at the surface. The recorder senses the tiny change in water-column pressure produced by a long tsunami wave in deep ocean. Data move acoustically to the buoy and then by satellite to warning centres. Because ordinary wind waves have short periods and small deep-water pressure signatures, the system can separate tsunami-scale changes when its algorithms and communications function properly.\n\nDART is powerful for ocean-wide events because a wave may need hours to cross a basin. It is less capable of protecting a coast very close to the source. Detection, confirmation, modelling, decision, communication, and public action all consume time. A local landslide tsunami can reach shore in minutes, sometimes before a deep-water station outside the source region records a clear signal. That limitation is not the same as equipment neglect.\n\nAt Sable Point, station health records show functioning instruments and continuous telemetry. The nearest deep-ocean anomaly begins after the first local tide gauge departs from normal. Bernard’s network therefore rules out a convenient maintenance scandal: the system heard the wave as soon as geometry allowed. The hard question is whether any warning chain could outrun a source so close to the beach.",
      "frame": "Sana opens the station-health plot beside the shore gauge. “The buoy did speak. The question is whether the beach had time to hear it.”",
      "q": [
        {
          "q": "What does a DART seafloor recorder measure?",
          "o": [
            {
              "t": "Mainly the height of short wind waves passing the surface buoy.",
              "v": "partial",
              "fb": "Surface wind waves are not the primary bottom-pressure measurement."
            },
            {
              "t": "The chemical composition of sediments moving down a submarine slope.",
              "v": "wrong",
              "fb": "Sediment chemistry requires sampling, not the DART pressure instrument."
            },
            {
              "t": "The exact magnitude of nearly every earthquake before seismic stations report it.",
              "v": "danger",
              "fb": "DART observes ocean response; it does not replace seismic magnitude determination."
            },
            {
              "t": "Small water-column pressure changes caused by long tsunami waves in deep ocean.",
              "v": "expert",
              "fb": "The bottom pressure sensor detects the long-period pressure signal of a tsunami."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "Bernard’s station-health data show the buoy system operating normally, leaving no maintenance decision or warning-chief order at the start of the event."
          }
        },
        {
          "q": "Why are DART buoys most valuable for distant tsunamis?",
          "o": [
            {
              "t": "Long ocean travel gives time for detection, modelling, warning, and evacuation.",
              "v": "expert",
              "fb": "Basin-crossing travel time creates the operational margin the warning chain needs."
            },
            {
              "t": "Deep-ocean waves move more slowly than people can walk along the shoreline.",
              "v": "partial",
              "fb": "Tsunamis move hundreds of kilometres per hour in deep water."
            },
            {
              "t": "A distant source generally produces a larger pressure signal than a local source.",
              "v": "wrong",
              "fb": "Signal size depends on source and geometry, not distance alone."
            },
            {
              "t": "Warning centres can stop the wave after a buoy confirms its arrival.",
              "v": "danger",
              "fb": "Detection supports protective action but cannot halt the physical wave."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "The shore gauge began rising before the first usable deep-ocean confirmation, which is the timing expected from a near-field source rather than a neglected distant wave."
          }
        },
        {
          "q": "Which evidence distinguishes a short warning window from a failed buoy?",
          "o": [
            {
              "t": "A buoy technician’s belief that local tsunamis are generally more dangerous at landfall in radar data.",
              "v": "partial",
              "fb": "General beliefs do not establish the performance of this station during this event."
            },
            {
              "t": "Continuous self-tests and telemetry paired with a shore arrival that precedes offshore confirmation.",
              "v": "expert",
              "fb": "Functioning telemetry plus arrival order directly tests whether the network had time to act."
            },
            {
              "t": "A single missing weather observation from the previous week before landfall at landfall in radar data.",
              "v": "wrong",
              "fb": "An unrelated weather gap does not explain the tsunami timing."
            },
            {
              "t": "An office budget document requesting replacement batteries next year at landfall in radar data before landfall.",
              "v": "danger",
              "fb": "Future maintenance planning is not evidence of failure during the event."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "The first hydrodynamic departure appears on the shore station beside the offshore canyon, placing the decisive timing evidence at the local source region."
          }
        }
      ]
    },
    "titov": {
      "sci": "Vasily Titov (tsunami modeler)",
      "topic": "Tsunami forecast modelling",
      "lede": "Titov’s models turn source, depth, and arrival times into a forecast—and expose when the source lies too close for the cycle.",
      "no": 2,
      "profile": "Vasily Titov is a tsunami modeller whose work helped make real-time forecast products possible. Tsunamis are shallow-water waves on the scale of the ocean depth: their speed depends mainly on gravity and water depth, so bathymetry guides their paths. A forecast model begins with a source estimate, propagates the wave across the ocean, and then resolves how coastal shape and depth transform it into runup and inundation.\n\nTitov helped develop modelling systems that combine precomputed scenarios with live observations. Deep-ocean measurements can adjust the estimated source, while numerical grids translate that source into forecasts for specific coasts. The method works best when the source is known soon enough and when there is sufficient travel time to assimilate data. Uncertainty comes from earthquake parameters, landslide geometry, bathymetry, and the fine details of harbours and shorelines.\n\nBack-projection reverses part of the problem. If several gauges record arrival times, possible source regions can be tested by calculating which one produces that sequence. A distant earthquake source should create a coherent basin-scale pattern. A local slope failure can produce a highly directional wave, striking one coast hard while leaving far stations relatively quiet.\n\nSable Point’s first three gauges fit a source on the adjacent submarine canyon wall. A distant earthquake scenario arrives too late, while a blast-sized point source predicts a different directional and spectral pattern. Titov’s model reconstructs a short path and a narrow warning window. The centre issued its first message within its procedure, but the water had already reached the nearest evacuation road. The model does not make the disaster trivial; it shows why response time, rather than institutional silence, controlled the outcome.",
      "frame": "The watchstander back-projects three arrivals onto the canyon. “Put the source far away and the times fail. Put it here and the warning clock nearly vanishes.”",
      "q": [
        {
          "q": "What chiefly controls tsunami speed in deep water?",
          "o": [
            {
              "t": "The wind speed at the sea surface during the preceding hour.",
              "v": "partial",
              "fb": "Wind drives ordinary surface waves but not the principal tsunami speed."
            },
            {
              "t": "The colour and salinity of the water above the source region in gauge data.",
              "v": "wrong",
              "fb": "Salinity has a minor effect compared with depth and gravity."
            },
            {
              "t": "Gravity and water depth, with bathymetry shaping the travel path.",
              "v": "expert",
              "fb": "For long shallow-water waves, depth sets propagation speed to first order."
            },
            {
              "t": "The number of warning buoys positioned along the coastline.",
              "v": "danger",
              "fb": "Buoys observe the wave; they do not determine its physical speed."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "Titov’s propagation times fit a very short path from the adjacent canyon, leaving too little interval for the full warning cycle even though the system functioned."
          }
        },
        {
          "q": "How can gauge arrival times help locate a tsunami source?",
          "o": [
            {
              "t": "The highest gauge reading is automatically assigned as the exact source point.",
              "v": "partial",
              "fb": "Local amplification can make the highest station far from the source."
            },
            {
              "t": "All stations are assumed to receive the wave simultaneously in a connected ocean in gauge data.",
              "v": "wrong",
              "fb": "Different paths and depths produce different arrival times."
            },
            {
              "t": "Arrival time reveals mainly wave height and does not constrain location in gauge data.",
              "v": "danger",
              "fb": "Arrival chronology is one of the strongest location constraints."
            },
            {
              "t": "Models test which source region reproduces the observed sequence and spacing of arrivals.",
              "v": "expert",
              "fb": "The travel-time pattern provides a geometric back-projection of possible sources."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "Back-projection converges on the submarine canyon beside Sable Point rather than the warning centre or a distant basin source."
          }
        },
        {
          "q": "Which outcome is typical of a directional landslide tsunami?",
          "o": [
            {
              "t": "Severe impact along one favoured coast with much weaker signals at other azimuths.",
              "v": "expert",
              "fb": "Landslide geometry can focus energy strongly in selected directions."
            },
            {
              "t": "The same wave height at nearly every station around the entire ocean basin.",
              "v": "partial",
              "fb": "Uniform global height is inconsistent with source and bathymetric directivity."
            },
            {
              "t": "No sea-level change near the source, followed by uniform distant flooding.",
              "v": "wrong",
              "fb": "Near-source gauges usually respond strongly to a nearby displacement."
            },
            {
              "t": "A pressure pulse that arrives before any mass moves downslope in wave data.",
              "v": "danger",
              "fb": "The moving mass creates the wave rather than following a prior ocean pulse."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "The model requires no altered operator input or delayed decision; the observed directivity follows the natural slope geometry before any person could intervene."
          }
        }
      ]
    },
    "kajiura": {
      "sci": "Kinjiro Kajiura (tsunami hydrodynamicist)",
      "topic": "Tsunami source & propagation",
      "lede": "Kajiura showed that earthquakes, blasts, and moving submarine slopes write different signatures into water and sound.",
      "no": 3,
      "profile": "Kinjiro Kajiura was a Japanese geophysicist who made major contributions to tsunami generation and propagation. His work examined how seafloor displacement creates long waves and how the shape and depth of the source affect what appears at the surface. For broad earthquake rupture, the water column is displaced over a large area. For submarine landslides, the moving mass couples to the water through a more complex, often shorter-duration geometry.\n\nSource mechanism leaves signatures. An explosion is a compact pressure release that radiates strong acoustic and seismic energy. An earthquake produces fault-wave patterns and a broad initial sea-surface displacement. A landslide can generate a prolonged acoustic rumble, evolving bathymetric change, and strongly directional waves. Distinguishing them requires combining seismograms, hydrophones, pressure records, and post-event seafloor surveys.\n\nKajiura also studied dispersion and coastal transformation. Very long earthquake tsunamis behave approximately as nondispersive shallow-water waves across much of the ocean. Shorter landslide components can disperse more noticeably, separating by frequency as they travel. Near the source, that spectral mix may reach shore before distant stations develop a clean textbook signal.\n\nThe Sable Point hydrophone record contains tens of seconds of low-frequency mass movement rather than one compact explosive pulse. A survey later maps fresh scar material and deposits at the canyon base. The local wave spectrum is broader than the distant earthquake templates. Kajiura’s source physics therefore supports an uncommon but natural landslide and rejects both a weapon and a disabled network. The event was difficult because its source sat almost inside the warning zone it threatened.",
      "frame": "The clerk plays a long underwater rumble beside a sharp calibration shot. “One is a pulse. One is a hillside moving. Tell me which reached Sable Point.”",
      "q": [
        {
          "q": "How would a submarine landslide source differ from a compact explosion?",
          "o": [
            {
              "t": "It produces no acoustic or seismic signal because sediment moves too slowly in gauge data.",
              "v": "partial",
              "fb": "Rapid slope failures are readily recorded by hydrophones and seismometers."
            },
            {
              "t": "It can produce prolonged mass-movement sound and directional waves rather than one sharp pulse.",
              "v": "expert",
              "fb": "A moving mass can radiate over time and focus water according to its path."
            },
            {
              "t": "It would need to generate a perfectly symmetric wave field around the source.",
              "v": "wrong",
              "fb": "Landslide geometry commonly makes the wave field asymmetric."
            },
            {
              "t": "It generally begins with a tectonic double-couple earthquake of large magnitude.",
              "v": "danger",
              "fb": "Some landslides are earthquake-triggered, but a large fault rupture is not required."
            }
          ],
          "clue": {
            "category": "what",
            "label": "WHAT clue",
            "text": "The prolonged acoustic source and broad local spectrum indicate moving sediment, not the sharp pressure pulse expected from an underwater weapon."
          }
        },
        {
          "q": "Why can landslide-tsunami waves be strongly directional?",
          "o": [
            {
              "t": "Ocean water permits waves to travel in mainly one compass direction at a time.",
              "v": "partial",
              "fb": "Waves can propagate in many directions; the source controls their distribution."
            },
            {
              "t": "Warning buoys absorb energy from all directions except the one facing shore.",
              "v": "wrong",
              "fb": "Buoys measure without materially steering the tsunami."
            },
            {
              "t": "The moving mass transfers momentum along a particular slope and source geometry.",
              "v": "expert",
              "fb": "Source motion and bathymetry focus energy unevenly around a landslide."
            },
            {
              "t": "Direction is chosen by the first coastal authority to issue an alert.",
              "v": "danger",
              "fb": "Human alerts do not determine physical wave direction."
            }
          ],
          "clue": {
            "category": "where",
            "label": "WHERE clue",
            "text": "Fresh scar and deposit mapping on the nearby canyon wall match the favoured direction of the destructive shore wave."
          }
        },
        {
          "q": "Which combined record most strongly rules out an underwater blast?",
          "o": [
            {
              "t": "One loud report from shore followed by uncertainty about the source time.",
              "v": "partial",
              "fb": "A subjective sound report cannot identify the source mechanism."
            },
            {
              "t": "A warning-centre message issued after the first local gauge alarm in wave data.",
              "v": "wrong",
              "fb": "Message timing addresses response, not whether the source was explosive."
            },
            {
              "t": "A working buoy whose battery was scheduled for replacement next season in wave data.",
              "v": "danger",
              "fb": "Maintenance scheduling does not distinguish a blast from a landslide."
            },
            {
              "t": "A long mass-movement hydrophone signal, fresh slope scar, and dispersive local wave train.",
              "v": "expert",
              "fb": "Those independent observations all describe a moving slope rather than a compact detonation."
            }
          ],
          "clue": {
            "category": "who",
            "label": "WHO clue",
            "text": "No explosive custodian, operator override, or suppressed alarm appears in the source record; the causal agent is the failed submarine slope itself."
          }
        }
      ]
    }
  },
  "story": [
    "<b>Sable Point receives the oldest natural warning—the sea drawing back—but almost no official lead time.</b>",
    "Buoy Tech Sana has the network-health chronology. The Watchstander can back-project the gauge arrivals. The Marine Records Clerk holds the hydrophone signal and the new seafloor survey.",
    "A weapon, a neglected distant warning, and a nearby natural source each explain the suddenness until travel time and source physics are combined.",
    "The verdict must decide whether anyone could have inserted more time into a wave generated almost at the shoreline."
  ],
  "endings": {
    "overclaimWhat": "blast",
    "dismissalWhat": "neglected",
    "win": {
      "expertTitle": "The Wave Inside the Warning Zone",
      "expert": [
        "You connect no culpable individual, the Offshore Canyon & Shore Stations, and a nearby submarine landslide producing a wave too fast for useful warning. The full clue chain links the initiating condition, the physical mechanism, and the decisive record without relying on candidate order.",
        "The two alternative explanations each fit part of the scene, but neither survives the combined timing, material, and documentary evidence."
      ],
      "soundTitle": "The Travel-Time Answer",
      "sound": [
        "Your accusation identifies no culpable individual, the Offshore Canyon & Shore Stations, and a nearby submarine landslide producing a wave too fast for useful warning.",
        "A few missed clues leave gaps in the reconstruction, yet the evidence you recovered is sufficient to distinguish the true sequence from both traps."
      ],
      "namedTitle": "Correct Source, Missing Detail",
      "named": [
        "You reach the correct three-part verdict with a thin evidentiary file.",
        "The result is right, although the unrecovered clues would be needed to defend the causal chain under sustained challenge."
      ]
    },
    "overclaim": {
      "title": "The Weapon Has No Pulse",
      "body": [
        "An underwater weapon should leave a compact pressure pulse and an explosive custody trail.",
        "The prolonged mass-movement signal, fresh scar, and directional spectrum instead describe a collapsing slope."
      ]
    },
    "dismissal": {
      "title": "A Working Network Cannot Create Distance",
      "body": [
        "The buoy network passed its health checks and transmitted continuously.",
        "Its first deep-ocean confirmation arrived after the local shore rise because the source was inside the usual warning geometry."
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
