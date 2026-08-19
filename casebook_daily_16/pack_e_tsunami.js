module.exports = { PACK: {
  "id": "e_tsunami",
  "title": "The Sable Point Wave",
  "discipline": "Tsunami Science & Oceanography",
  "teaser": "The sea drew back, then took the shore. A weapon beneath the waves? A freak swell out of nowhere? Or a warning network left to rust and a hazard waved away?",
  "overclaimTag": "a blast beneath the sea",
  "truthTag": "a neglected warning-buoy network",
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
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before the inquiry closes. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The WHERE you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "The blast story arrives before the wave record; follow the instruments before choosing a cause.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "chief",
      "items": [
        {
          "id": "chief",
          "label": "Nadia Voss — tsunami warning-centre chief"
        },
        {
          "id": "oceanographer",
          "label": "The duty oceanographer"
        },
        {
          "id": "portauthority",
          "label": "The port authority director"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "office",
      "items": [
        {
          "id": "shore",
          "label": "The Shore & Tide Stations"
        },
        {
          "id": "watchfloor",
          "label": "The Tsunami Warning Centre"
        },
        {
          "id": "office",
          "label": "The Warning Programme Office"
        }
      ]
    },
    "what": {
      "title": "What is happening",
      "truth": "neglected",
      "items": [
        {
          "id": "blast",
          "label": "A blast or weapon beneath the sea"
        },
        {
          "id": "freak",
          "label": "A freak wave from nowhere — an act of God"
        },
        {
          "id": "neglected",
          "label": "A disabled buoy network & a downplayed hazard"
        }
      ]
    }
  },
  "PLACES": {
    "shore": {
      "name": "The Shore & Tide Stations",
      "xy": [
        140,
        90
      ]
    },
    "watchfloor": {
      "name": "The Tsunami Warning Centre",
      "xy": [
        330,
        240
      ]
    },
    "office": {
      "name": "The Warning Programme Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "shore",
      "watchfloor"
    ],
    [
      "watchfloor",
      "office"
    ]
  ],
  "CHARACTERS": {
    "buoytech": {
      "name": "Buoy Tech Sana",
      "role": "Ocean-buoy technician",
      "face": "🛟",
      "badge": "S",
      "legend": "the shore stations",
      "hint": "Services the sea buoys; half the network had flatlined and stayed down."
    },
    "watchstander": {
      "name": "The Watchstander",
      "role": "Warning-centre watchstander",
      "face": "🌊",
      "badge": "W",
      "legend": "the watch floor",
      "hint": "Held the desk when the quake hit; the bulletin sat unissued."
    },
    "clerk": {
      "name": "The Clerk",
      "role": "Programme-office clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Keeps the maintenance logs — and the hazard study that was toned down."
    }
  },
  "TOPICMAP": {
    "shore": {
      "buoytech": [
        "laplace"
      ],
      "watchstander": [
        "lamb"
      ],
      "clerk": [
        "love"
      ]
    },
    "watchfloor": {
      "buoytech": [
        "proudman"
      ],
      "watchstander": [
        "shepard"
      ],
      "clerk": [
        "cox"
      ]
    },
    "office": {
      "buoytech": [
        "vandorn"
      ],
      "watchstander": [
        "kajiura"
      ],
      "clerk": [
        "ebernard"
      ]
    }
  },
  "TOPICS": {
    "laplace": {
      "whatHint": "Laplace made the ocean's motion calculable. A wave that obeys tide-and-wave physics is no act of God; ask what the offshore instruments already implied.",
      "sci": "Pierre-Simon Laplace (1749-1827)",
      "topic": "The dynamical theory of tides",
      "lede": "Pierre-Simon Laplace turned the dynamical theory of tides into a measurable story of source, basin, and coast.",
      "no": 1,
      "profile": "Today’s ocean-science dispatch follows Pierre-Simon Laplace into the dynamical theory of tides. Laplace developed a dynamical theory of tides from gravity, rotation, basin geometry, and the equations of fluid motion. His tidal equations replaced the idea that the ocean simply follows the Moon with a system in which water oscillates across a rotating Earth. Long waves cross boundaries between seismology, fluid mechanics, bathymetry, and public warning. Laplace’s work shows how one part of that chain can be measured instead of guessed.\n\nThe practical method is to treat long ocean waves as solutions of shallow-water dynamics whose speed depends mainly on depth. Analysts must separate the source from the path and the coastline, state instrument limits, and update the interpretation when tide gauges or deep-ocean sensors disagree with the first model.\n\nTsunamis are often nearly invisible in deep water because their enormous wavelength spreads energy through the full water column. Near shore, slowing, shoaling, resonance, and topography can produce repeated destructive surges. That makes maintenance, transmission, modeling, and evacuation inseparable parts of one warning system.\n\nThe enduring lesson: a large wave must be traced through source, propagation, and coastal amplification rather than judged from appearance alone. Ocean hazards become manageable when observation and communication remain continuous from the source region to the last mile. A warning bulletin should record why it changed, which measurements drove the revision, and what uncertainty remained. Harbor behavior can differ sharply from an open coast even when both receive the same offshore wave. Natural warning signs such as strong shaking or sudden withdrawal remain valuable when communications fail.",
      "frame": "Checks a tide trace at The Shore & Tide Stations. \"Before I release the station log, explain the dynamical theory of tides without confusing the wave with the water carrying it.\"",
      "q": [
        {
          "q": "Which oceanographic account best captures Pierre-Simon Laplace’s work on the dynamical theory of tides?",
          "o": [
            {
              "t": "Laplace developed a dynamical theory of tides from gravity, rotation, basin geometry, and the equations of fluid motion. Coastal amplification stays explicit.",
              "v": "expert",
              "fb": "Correct: the answer links physical mechanism with direct observation and an updateable forecast."
            },
            {
              "t": "Pierre-Simon Laplace advanced the dynamical theory of tides, but the account uses one coastal gauge without resolving source geometry or basin propagation.",
              "v": "partial",
              "fb": "Partly useful, but it leaves a major source, propagation, or measurement assumption unresolved."
            },
            {
              "t": "Pierre-Simon Laplace is presented as showing that tsunami height stays constant from deep ocean to every shoreline. The tide trace points elsewhere.",
              "v": "wrong",
              "fb": "That interpretation conflicts with the wave physics or the observations described."
            },
            {
              "t": "Pierre-Simon Laplace is invoked to cancel a warning whenever the first model has wide uncertainty. Maintenance failure is disguised as ocean uncertainty.",
              "v": "danger",
              "fb": "That choice turns uncertainty into permission to ignore a potentially actionable hazard."
            }
          ]
        },
        {
          "q": "Which procedure best converts a possible tsunami into a defensible warning?",
          "o": [
            {
              "t": "Apply this ocean-warning method: treat long ocean waves as solutions of shallow-water dynamics whose speed depends mainly on depth. The buoy record remains available, in use.",
              "v": "expert",
              "fb": "Correct: the answer links physical mechanism with direct observation and an updateable forecast."
            },
            {
              "t": "Use the earthquake location and nearest tide gauge, but do not seek deep-ocean confirmation or revise the coastal forecast. primarily part of the propagation path has been tested.",
              "v": "partial",
              "fb": "Partly useful, but it leaves a major source, propagation, or measurement assumption unresolved."
            },
            {
              "t": "Estimate coastal impact from offshore visual wave height while ignoring wavelength, depth, and harbor geometry. Long-wave physics rejects that. The tide trace points elsewhere.",
              "v": "wrong",
              "fb": "That interpretation conflicts with the wave physics or the observations described."
            },
            {
              "t": "Withhold the bulletin until the exact runup is known, then describe the lost warning time as unavoidable uncertainty. A delayed bulletin becomes operational policy, in use.",
              "v": "danger",
              "fb": "That choice turns uncertainty into permission to ignore a potentially actionable hazard."
            }
          ]
        },
        {
          "q": "What general principle follows from this work?",
          "o": [
            {
              "t": "The scientific conclusion is that a large wave must be traced through source, propagation, and coastal amplification rather than judged from appearance alone, in use.",
              "v": "expert",
              "fb": "Correct: the answer links physical mechanism with direct observation and an updateable forecast."
            },
            {
              "t": "One functioning shoreline station can substitute for basin-wide instruments if the source earthquake is large. primarily part of the propagation path has been tested.",
              "v": "partial",
              "fb": "Partly useful, but it leaves a major source, propagation, or measurement assumption unresolved."
            },
            {
              "t": "A tsunami is simply a tall wind wave, so ordinary surf observations provide the necessary forecast. Long-wave physics rejects that. The tide trace points elsewhere, in use.",
              "v": "wrong",
              "fb": "That interpretation conflicts with the wave physics or the observations described."
            },
            {
              "t": "The event is likely to be a hidden blast or a largely unknowable freak, leaving no role for network maintenance. Delay consumes evacuation time. Silence is treated as certainty.",
              "v": "danger",
              "fb": "That choice turns uncertainty into permission to ignore a potentially actionable hazard."
            }
          ]
        }
      ]
    },
    "lamb": {
      "whatHint": "Lamb's wave equations tell a long, low tsunami from a sharp explosive pulse. Ask what the waveform's period and shape say about its source.",
      "sci": "Horace Lamb (1849-1934)",
      "topic": "Hydrodynamics & water waves",
      "lede": "Horace Lamb made hydrodynamics and water waves part of the observing chain behind modern tsunami warnings.",
      "no": 2,
      "profile": "Today’s ocean-science dispatch follows Horace Lamb into hydrodynamics and water waves. Horace Lamb's Hydrodynamics organized the mathematical treatment of water waves, currents, vortices, and oscillations. His work gave later oceanographers a rigorous language for separating wave motion from the movement of individual water particles. Long waves cross boundaries between seismology, fluid mechanics, bathymetry, and public warning. Lamb’s work shows how one part of that chain can be measured instead of guessed.\n\nThe practical method is to derive wave behavior from conservation of mass, momentum, and boundary conditions. Analysts must separate the source from the path and the coastline, state instrument limits, and update the interpretation when tide gauges or deep-ocean sensors disagree with the first model.\n\nTsunamis are often nearly invisible in deep water because their enormous wavelength spreads energy through the full water column. Near shore, slowing, shoaling, resonance, and topography can produce repeated destructive surges. That makes maintenance, transmission, modeling, and evacuation inseparable parts of one warning system.\n\nThe enduring lesson: water-wave intuition should be checked against equations and geometry. Ocean hazards become manageable when observation and communication remain continuous from the source region to the last mile. A warning bulletin should record why it changed, which measurements drove the revision, and what uncertainty remained. Harbor behavior can differ sharply from an open coast even when both receive the same offshore wave. Natural warning signs such as strong shaking or sudden withdrawal remain valuable when communications fail. Forecast maps should distinguish arrival, amplitude, current, and inundation because they answer different safety questions.",
      "frame": "Taps the silent telemetry panel. \"A model is only half a warning. Start with hydrodynamics and water waves.\"",
      "q": [
        {
          "q": "Which oceanographic account best captures Horace Lamb’s work on hydrodynamics and water waves?",
          "o": [
            {
              "t": "Horace Lamb's Hydrodynamics organized the mathematical treatment of water waves, currents, vortices, and oscillations. Coastal amplification stays explicit.",
              "v": "expert",
              "fb": "Correct: the answer links physical mechanism with direct observation and an updateable forecast."
            },
            {
              "t": "Horace Lamb advanced hydrodynamics and water waves, but the account uses one coastal gauge without resolving source geometry or basin propagation.",
              "v": "partial",
              "fb": "Partly useful, but it leaves a major source, propagation, or measurement assumption unresolved."
            },
            {
              "t": "Horace Lamb is presented as showing that tsunami height stays constant from deep ocean to every shoreline. The long-wave model gives the opposite result.",
              "v": "wrong",
              "fb": "That interpretation conflicts with the wave physics or the observations described."
            },
            {
              "t": "Horace Lamb is invoked to cancel a warning whenever the first model has wide uncertainty. Delay consumes evacuation time. Silence is treated as certainty.",
              "v": "danger",
              "fb": "That choice turns uncertainty into permission to ignore a potentially actionable hazard."
            }
          ]
        },
        {
          "q": "Which procedure best converts a possible tsunami into a defensible warning?",
          "o": [
            {
              "t": "Apply this ocean-warning method: derive wave behavior from conservation of mass, momentum, and boundary conditions. The buoy record remains available.",
              "v": "expert",
              "fb": "Correct: the answer links physical mechanism with direct observation and an updateable forecast."
            },
            {
              "t": "Use the earthquake location and nearest tide gauge, but do not seek deep-ocean confirmation or revise the coastal forecast. The source remains uncertain.",
              "v": "partial",
              "fb": "Partly useful, but it leaves a major source, propagation, or measurement assumption unresolved."
            },
            {
              "t": "Estimate coastal impact from offshore visual wave height while ignoring wavelength, depth, and harbor geometry. The long-wave model gives the opposite result.",
              "v": "wrong",
              "fb": "That interpretation conflicts with the wave physics or the observations described."
            },
            {
              "t": "Withhold the bulletin until the exact runup is known, then describe the lost warning time as unavoidable uncertainty. Delay consumes evacuation time.",
              "v": "danger",
              "fb": "That choice turns uncertainty into permission to ignore a potentially actionable hazard."
            }
          ]
        },
        {
          "q": "What general principle follows from this work?",
          "o": [
            {
              "t": "The scientific conclusion is that water-wave intuition should be checked against equations and geometry. The buoy record remains available, in use.",
              "v": "expert",
              "fb": "Correct: the answer links physical mechanism with direct observation and an updateable forecast."
            },
            {
              "t": "One functioning shoreline station can substitute for basin-wide instruments if the source earthquake is large. The source remains uncertain, in use.",
              "v": "partial",
              "fb": "Partly useful, but it leaves a major source, propagation, or measurement assumption unresolved."
            },
            {
              "t": "A tsunami is simply a tall wind wave, so ordinary surf observations provide the necessary forecast. The long-wave model gives the opposite result.",
              "v": "wrong",
              "fb": "That interpretation conflicts with the wave physics or the observations described."
            },
            {
              "t": "The event is likely to be a hidden blast or a largely unknowable freak, leaving no role for network maintenance. The public warning loses its usable interval.",
              "v": "danger",
              "fb": "That choice turns uncertainty into permission to ignore a potentially actionable hazard."
            }
          ]
        }
      ]
    },
    "love": {
      "whatHint": "Love separated the Earth's own elastic waves from other motions. Ask whether the record shows a fault's long rupture or the sharp signature a blast would leave.",
      "sci": "Augustus E. H. Love (1863-1940)",
      "topic": "Elastic waves & Earth tides",
      "lede": "Augustus E. H. Love connected elastic waves and earth tides with distant ocean motion and local water levels.",
      "no": 3,
      "profile": "Today’s ocean-science dispatch follows Augustus E. H. Love into elastic waves and earth tides. Love developed mathematical theory for elastic waves in solids, including the horizontally polarized surface waves now called Love waves. He also studied Earth tides, linking deformation of the solid planet to external gravitational forcing. Long waves cross boundaries between seismology, fluid mechanics, bathymetry, and public warning. Love’s work shows how one part of that chain can be measured instead of guessed.\n\nThe practical method is to identify wave type from polarization, travel path, and the material through which it moves. Analysts must separate the source from the path and the coastline, state instrument limits, and update the interpretation when tide gauges or deep-ocean sensors disagree with the first model.\n\nTsunamis are often nearly invisible in deep water because their enormous wavelength spreads energy through the full water column. Near shore, slowing, shoaling, resonance, and topography can produce repeated destructive surges. That makes maintenance, transmission, modeling, and evacuation inseparable parts of one warning system.\n\nThe enduring lesson: different wave modes reveal different properties of Earth and carry different hazards. Ocean hazards become manageable when observation and communication remain continuous from the source region to the last mile. A warning bulletin should record why it changed, which measurements drove the revision, and what uncertainty remained. Harbor behavior can differ sharply from an open coast even when both receive the same offshore wave. Natural warning signs such as strong shaking or sudden withdrawal remain valuable when communications fail. Forecast maps should distinguish arrival, amplitude, current, and inundation because they answer different safety questions.",
      "frame": "Steadies a salt-stained instrument case. \"The ocean leaves timing clues. Show me what elastic waves and earth tides lets us calculate.\"",
      "q": [
        {
          "q": "Which oceanographic account best captures Augustus E. H. Love’s work on elastic waves and earth tides?",
          "o": [
            {
              "t": "Love developed mathematical theory for elastic waves in solids, including the horizontally polarized surface waves now called Love waves. The basin record can be reconstructed afterward.",
              "v": "expert",
              "fb": "Correct: the answer links physical mechanism with direct observation and an updateable forecast."
            },
            {
              "t": "Augustus E. H. Love advanced elastic waves and earth tides, but the account uses one coastal gauge without resolving source geometry or basin propagation. The source remains uncertain.",
              "v": "partial",
              "fb": "Partly useful, but it leaves a major source, propagation, or measurement assumption unresolved."
            },
            {
              "t": "Augustus E. H. Love is presented as showing that tsunami height stays constant from deep ocean to every shoreline. Long-wave physics rejects that. The tide trace points elsewhere.",
              "v": "wrong",
              "fb": "That interpretation conflicts with the wave physics or the observations described."
            },
            {
              "t": "Augustus E. H. Love is invoked to cancel a warning whenever the first model has wide uncertainty. Delay consumes evacuation time. A delayed bulletin becomes operational policy.",
              "v": "danger",
              "fb": "That choice turns uncertainty into permission to ignore a potentially actionable hazard."
            }
          ]
        },
        {
          "q": "Which procedure best converts a possible tsunami into a defensible warning?",
          "o": [
            {
              "t": "Apply this ocean-warning method: identify wave type from polarization, travel path, and the material through which it moves. The buoy record remains available.",
              "v": "expert",
              "fb": "Correct: the answer links physical mechanism with direct observation and an updateable forecast."
            },
            {
              "t": "Use the earthquake location and nearest tide gauge, but do not seek deep-ocean confirmation or revise the coastal forecast. The source remains uncertain.",
              "v": "partial",
              "fb": "Partly useful, but it leaves a major source, propagation, or measurement assumption unresolved."
            },
            {
              "t": "Estimate coastal impact from offshore visual wave height while ignoring wavelength, depth, and harbor geometry. Observed arrival timing defeats this explanation.",
              "v": "wrong",
              "fb": "That interpretation conflicts with the wave physics or the observations described."
            },
            {
              "t": "Withhold the bulletin until the exact runup is known, then describe the lost warning time as unavoidable uncertainty. Silence is treated as certainty.",
              "v": "danger",
              "fb": "That choice turns uncertainty into permission to ignore a potentially actionable hazard."
            }
          ]
        },
        {
          "q": "What general principle follows from this work?",
          "o": [
            {
              "t": "The scientific conclusion is that different wave modes reveal different properties of Earth and carry different hazards. Coastal amplification stays explicit, in use.",
              "v": "expert",
              "fb": "Correct: the answer links physical mechanism with direct observation and an updateable forecast."
            },
            {
              "t": "One functioning shoreline station can substitute for basin-wide instruments if the source earthquake is large. primarily part of the propagation path has been tested.",
              "v": "partial",
              "fb": "Partly useful, but it leaves a major source, propagation, or measurement assumption unresolved."
            },
            {
              "t": "A tsunami is simply a tall wind wave, so ordinary surf observations provide the necessary forecast. Long-wave physics rejects that. The tide trace points elsewhere, in use.",
              "v": "wrong",
              "fb": "That interpretation conflicts with the wave physics or the observations described."
            },
            {
              "t": "The event is likely to be a hidden blast or a largely unknowable freak, leaving no role for network maintenance. Delay consumes evacuation time. Silence is treated as certainty.",
              "v": "danger",
              "fb": "That choice turns uncertainty into permission to ignore a potentially actionable hazard."
            }
          ]
        }
      ]
    },
    "proudman": {
      "whatHint": "Proudman showed how the open sea resonates a wave onto a shelf. The signal was there to read; ask whether the network was alive to read it.",
      "sci": "Joseph Proudman (1888-1975)",
      "topic": "Dynamical oceanography & tides",
      "lede": "Joseph Proudman turned dynamical oceanography and tides into a measurable story of source, basin, and coast.",
      "no": 4,
      "profile": "Today’s ocean-science dispatch follows Joseph Proudman into dynamical oceanography and tides. Proudman advanced the mathematical theory of tides and rotating fluids and helped build the Liverpool Tidal Institute into a center for dynamical oceanography. His work clarified resonant responses of seas and harbors to atmospheric and astronomical forcing. Long waves cross boundaries between seismology, fluid mechanics, bathymetry, and public warning. Proudman’s work shows how one part of that chain can be measured instead of guessed.\n\nThe practical method is to calculate how basin shape and forcing period can amplify a long wave. Analysts must separate the source from the path and the coastline, state instrument limits, and update the interpretation when tide gauges or deep-ocean sensors disagree with the first model.\n\nTsunamis are often nearly invisible in deep water because their enormous wavelength spreads energy through the full water column. Near shore, slowing, shoaling, resonance, and topography can produce repeated destructive surges. That makes maintenance, transmission, modeling, and evacuation inseparable parts of one warning system.\n\nThe enduring lesson: local geometry can turn a modest offshore disturbance into a large coastal response. Ocean hazards become manageable when observation and communication remain continuous from the source region to the last mile. A warning bulletin should record why it changed, which measurements drove the revision, and what uncertainty remained. Harbor behavior can differ sharply from an open coast even when both receive the same offshore wave. Natural warning signs such as strong shaking or sudden withdrawal remain valuable when communications fail. Forecast maps should distinguish arrival, amplitude, current, and inundation because they answer different safety questions.",
      "frame": "Checks a tide trace at The Tsunami Warning Centre. \"Before I release the station log, explain dynamical oceanography and tides without confusing the wave with the water carrying it.\"",
      "q": [
        {
          "q": "Which oceanographic account best captures Joseph Proudman’s work on dynamical oceanography and tides?",
          "o": [
            {
              "t": "Proudman advanced the mathematical theory of tides and rotating fluids and helped build the Liverpool Tidal Institute into a center for dynamical oceanography.",
              "v": "expert",
              "fb": "Correct: the answer links physical mechanism with direct observation and an updateable forecast."
            },
            {
              "t": "Joseph Proudman advanced dynamical oceanography and tides, but the account uses one coastal gauge without resolving source geometry or basin propagation.",
              "v": "partial",
              "fb": "Partly useful, but it leaves a major source, propagation, or measurement assumption unresolved."
            },
            {
              "t": "Joseph Proudman is presented as showing that tsunami height stays constant from deep ocean to every shoreline. The long-wave model gives the opposite result.",
              "v": "wrong",
              "fb": "That interpretation conflicts with the wave physics or the observations described."
            },
            {
              "t": "Joseph Proudman is invoked to cancel a warning whenever the first model has wide uncertainty. Delay consumes evacuation time. Silence is treated as certainty.",
              "v": "danger",
              "fb": "That choice turns uncertainty into permission to ignore a potentially actionable hazard."
            }
          ]
        },
        {
          "q": "Which procedure best converts a possible tsunami into a defensible warning?",
          "o": [
            {
              "t": "Apply this ocean-warning method: calculate how basin shape and forcing period can amplify a long wave. The basin record can be reconstructed afterward.",
              "v": "expert",
              "fb": "Correct: the answer links physical mechanism with direct observation and an updateable forecast."
            },
            {
              "t": "Use the earthquake location and nearest tide gauge, but do not seek deep-ocean confirmation or revise the coastal forecast. The source remains uncertain.",
              "v": "partial",
              "fb": "Partly useful, but it leaves a major source, propagation, or measurement assumption unresolved."
            },
            {
              "t": "Estimate coastal impact from offshore visual wave height while ignoring wavelength, depth, and harbor geometry. The long-wave model gives the opposite result.",
              "v": "wrong",
              "fb": "That interpretation conflicts with the wave physics or the observations described."
            },
            {
              "t": "Withhold the bulletin until the exact runup is known, then describe the lost warning time as unavoidable uncertainty. Delay consumes evacuation time.",
              "v": "danger",
              "fb": "That choice turns uncertainty into permission to ignore a potentially actionable hazard."
            }
          ]
        },
        {
          "q": "What general principle follows from this work?",
          "o": [
            {
              "t": "The scientific conclusion is that local geometry can turn a modest offshore disturbance into a large coastal response. Coastal amplification stays explicit, on site.",
              "v": "expert",
              "fb": "Correct: the answer links physical mechanism with direct observation and an updateable forecast."
            },
            {
              "t": "One functioning shoreline station can substitute for basin-wide instruments if the source earthquake is large. primarily part of the propagation path has been tested.",
              "v": "partial",
              "fb": "Partly useful, but it leaves a major source, propagation, or measurement assumption unresolved."
            },
            {
              "t": "A tsunami is simply a tall wind wave, so ordinary surf observations provide the necessary forecast. Long-wave physics rejects that. The tide trace points elsewhere, in use.",
              "v": "wrong",
              "fb": "That interpretation conflicts with the wave physics or the observations described."
            },
            {
              "t": "The event is likely to be a hidden blast or a largely unknowable freak, leaving no role for network maintenance. Delay consumes evacuation time. Silence is treated as certainty.",
              "v": "danger",
              "fb": "That choice turns uncertainty into permission to ignore a potentially actionable hazard."
            }
          ]
        }
      ]
    },
    "shepard": {
      "whatHint": "Shepard read tsunamis in the deposits they leave. Ask whether the sediments record an ordinary sea-source wave rather than a detonation.",
      "sci": "Francis Parker Shepard (1897-1985)",
      "topic": "Marine geology & tsunami deposits",
      "lede": "Francis Parker Shepard made marine geology and tsunami deposits part of the observing chain behind modern tsunami warnings.",
      "no": 5,
      "profile": "Today’s ocean-science dispatch follows Francis Parker Shepard into marine geology and tsunami deposits. Shepard helped found marine geology by mapping submarine canyons, continental margins, and sediments. His field studies also showed that coastal and seabed deposits can preserve evidence of unusual waves and past shoreline events. Long waves cross boundaries between seismology, fluid mechanics, bathymetry, and public warning. Shepard’s work shows how one part of that chain can be measured instead of guessed.\n\nThe practical method is to read sediment layers through grain size, inland extent, marine material, and stratigraphic context. Analysts must separate the source from the path and the coastline, state instrument limits, and update the interpretation when tide gauges or deep-ocean sensors disagree with the first model.\n\nTsunamis are often nearly invisible in deep water because their enormous wavelength spreads energy through the full water column. Near shore, slowing, shoaling, resonance, and topography can produce repeated destructive surges. That makes maintenance, transmission, modeling, and evacuation inseparable parts of one warning system.\n\nThe enduring lesson: past deposits can extend the hazard record beyond the brief span of instruments. Ocean hazards become manageable when observation and communication remain continuous from the source region to the last mile. A warning bulletin should record why it changed, which measurements drove the revision, and what uncertainty remained. Harbor behavior can differ sharply from an open coast even when both receive the same offshore wave. Natural warning signs such as strong shaking or sudden withdrawal remain valuable when communications fail. Forecast maps should distinguish arrival, amplitude, current, and inundation because they answer different safety questions.",
      "frame": "Taps the silent telemetry panel. \"A model is only half a warning. Start with marine geology and tsunami deposits.\"",
      "q": [
        {
          "q": "Which oceanographic account best captures Francis Parker Shepard’s work on marine geology and tsunami deposits?",
          "o": [
            {
              "t": "Shepard helped found marine geology by mapping submarine canyons, continental margins, and sediments. The buoy record remains available. Coastal amplification stays explicit.",
              "v": "expert",
              "fb": "Correct: the answer links physical mechanism with direct observation and an updateable forecast."
            },
            {
              "t": "Francis Parker Shepard advanced marine geology and tsunami deposits, but the account uses one coastal gauge without resolving source geometry or basin propagation.",
              "v": "partial",
              "fb": "Partly useful, but it leaves a major source, propagation, or measurement assumption unresolved."
            },
            {
              "t": "Francis Parker Shepard is presented as showing that tsunami height stays constant from deep ocean to every shoreline. The long-wave model gives the opposite result.",
              "v": "wrong",
              "fb": "That interpretation conflicts with the wave physics or the observations described."
            },
            {
              "t": "Francis Parker Shepard is invoked to cancel a warning whenever the first model has wide uncertainty. Delay consumes evacuation time. Silence is treated as certainty.",
              "v": "danger",
              "fb": "That choice turns uncertainty into permission to ignore a potentially actionable hazard."
            }
          ]
        },
        {
          "q": "Which procedure best converts a possible tsunami into a defensible warning?",
          "o": [
            {
              "t": "Apply this ocean-warning method: read sediment layers through grain size, inland extent, marine material, and stratigraphic context. The buoy record remains available.",
              "v": "expert",
              "fb": "Correct: the answer links physical mechanism with direct observation and an updateable forecast."
            },
            {
              "t": "Use the earthquake location and nearest tide gauge, but do not seek deep-ocean confirmation or revise the coastal forecast. primarily part of the propagation path has been tested.",
              "v": "partial",
              "fb": "Partly useful, but it leaves a major source, propagation, or measurement assumption unresolved."
            },
            {
              "t": "Estimate coastal impact from offshore visual wave height while ignoring wavelength, depth, and harbor geometry. Long-wave physics rejects that. The tide trace points elsewhere.",
              "v": "wrong",
              "fb": "That interpretation conflicts with the wave physics or the observations described."
            },
            {
              "t": "Withhold the bulletin until the exact runup is known, then describe the lost warning time as unavoidable uncertainty. A delayed bulletin becomes operational policy, in use.",
              "v": "danger",
              "fb": "That choice turns uncertainty into permission to ignore a potentially actionable hazard."
            }
          ]
        },
        {
          "q": "What general principle follows from this work?",
          "o": [
            {
              "t": "The scientific conclusion is that past deposits can extend the hazard record beyond the brief span of instruments. The buoy record remains available.",
              "v": "expert",
              "fb": "Correct: the answer links physical mechanism with direct observation and an updateable forecast."
            },
            {
              "t": "One functioning shoreline station can substitute for basin-wide instruments if the source earthquake is large. One harbor response is unresolved, in use.",
              "v": "partial",
              "fb": "Partly useful, but it leaves a major source, propagation, or measurement assumption unresolved."
            },
            {
              "t": "A tsunami is simply a tall wind wave, so ordinary surf observations provide the necessary forecast. The long-wave model gives the opposite result, in use.",
              "v": "wrong",
              "fb": "That interpretation conflicts with the wave physics or the observations described."
            },
            {
              "t": "The event is likely to be a hidden blast or a largely unknowable freak, leaving no role for network maintenance. A delayed bulletin becomes operational policy.",
              "v": "danger",
              "fb": "That choice turns uncertainty into permission to ignore a potentially actionable hazard."
            }
          ]
        }
      ]
    },
    "cox": {
      "whatHint": "Cox helped build the warning system precisely so no wave is a surprise. Ask whether the interval between detection and shore was used — or lost.",
      "sci": "Doak Cox (1917-2003)",
      "topic": "Tsunami research & the Pacific warning system",
      "lede": "Doak Cox connected tsunami research and the pacific warning system with distant ocean motion and local water levels.",
      "no": 6,
      "profile": "Today’s ocean-science dispatch follows Doak Cox into tsunami research and the pacific warning system. Doak Cox studied tsunami history in Hawaii and helped develop the Pacific-wide warning system created after destructive mid-century events. He emphasized cataloging earlier tsunamis, understanding local runup, and turning scientific knowledge into public warning practice. Long waves cross boundaries between seismology, fluid mechanics, bathymetry, and public warning. Cox’s work shows how one part of that chain can be measured instead of guessed.\n\nThe practical method is to join historical catalogs, seismic detection, tide observations, and local evacuation planning. Analysts must separate the source from the path and the coastline, state instrument limits, and update the interpretation when tide gauges or deep-ocean sensors disagree with the first model.\n\nTsunamis are often nearly invisible in deep water because their enormous wavelength spreads energy through the full water column. Near shore, slowing, shoaling, resonance, and topography can produce repeated destructive surges. That makes maintenance, transmission, modeling, and evacuation inseparable parts of one warning system.\n\nThe enduring lesson: warning succeeds only when technical detection reaches people in time to act. Ocean hazards become manageable when observation and communication remain continuous from the source region to the last mile. A warning bulletin should record why it changed, which measurements drove the revision, and what uncertainty remained. Harbor behavior can differ sharply from an open coast even when both receive the same offshore wave. Natural warning signs such as strong shaking or sudden withdrawal remain valuable when communications fail. Forecast maps should distinguish arrival, amplitude, current, and inundation because they answer different safety questions.",
      "frame": "Steadies a salt-stained instrument case. \"The ocean leaves timing clues. Show me what tsunami research and the pacific warning system lets us calculate.\"",
      "q": [
        {
          "q": "Which oceanographic account best captures Doak Cox’s work on tsunami research and the pacific warning system?",
          "o": [
            {
              "t": "Doak Cox studied tsunami history in Hawaii and helped develop the Pacific-wide warning system created after destructive mid-century events. Deep-water confirmation remains linked to the forecast.",
              "v": "expert",
              "fb": "Correct: the answer links physical mechanism with direct observation and an updateable forecast."
            },
            {
              "t": "Doak Cox advanced tsunami research and the pacific warning system, but the account uses one coastal gauge without resolving source geometry or basin propagation. The source remains uncertain.",
              "v": "partial",
              "fb": "Partly useful, but it leaves a major source, propagation, or measurement assumption unresolved."
            },
            {
              "t": "Doak Cox is presented as showing that tsunami height stays constant from deep ocean to every shoreline. The tide trace points elsewhere. Observed arrival timing defeats this explanation.",
              "v": "wrong",
              "fb": "That interpretation conflicts with the wave physics or the observations described."
            },
            {
              "t": "Doak Cox is invoked to cancel a warning whenever the first model has wide uncertainty. The public warning loses its usable interval. Maintenance failure is disguised as ocean uncertainty.",
              "v": "danger",
              "fb": "That choice turns uncertainty into permission to ignore a potentially actionable hazard."
            }
          ]
        },
        {
          "q": "Which procedure best converts a possible tsunami into a defensible warning?",
          "o": [
            {
              "t": "Apply this ocean-warning method: join historical catalogs, seismic detection, tide observations, and local evacuation planning. Coastal amplification stays explicit, in use.",
              "v": "expert",
              "fb": "Correct: the answer links physical mechanism with direct observation and an updateable forecast."
            },
            {
              "t": "Use the earthquake location and nearest tide gauge, but do not seek deep-ocean confirmation or revise the coastal forecast. primarily part of the propagation path has been tested.",
              "v": "partial",
              "fb": "Partly useful, but it leaves a major source, propagation, or measurement assumption unresolved."
            },
            {
              "t": "Estimate coastal impact from offshore visual wave height while ignoring wavelength, depth, and harbor geometry. Long-wave physics rejects that. The tide trace points elsewhere.",
              "v": "wrong",
              "fb": "That interpretation conflicts with the wave physics or the observations described."
            },
            {
              "t": "Withhold the bulletin until the exact runup is known, then describe the lost warning time as unavoidable uncertainty. A delayed bulletin becomes operational policy, in use.",
              "v": "danger",
              "fb": "That choice turns uncertainty into permission to ignore a potentially actionable hazard."
            }
          ]
        },
        {
          "q": "What general principle follows from this work?",
          "o": [
            {
              "t": "The scientific conclusion is that warning succeeds only when technical detection reaches people in time to act. The buoy record remains available.",
              "v": "expert",
              "fb": "Correct: the answer links physical mechanism with direct observation and an updateable forecast."
            },
            {
              "t": "One functioning shoreline station can substitute for basin-wide instruments if the source earthquake is large. The source remains uncertain, in use.",
              "v": "partial",
              "fb": "Partly useful, but it leaves a major source, propagation, or measurement assumption unresolved."
            },
            {
              "t": "A tsunami is simply a tall wind wave, so ordinary surf observations provide the necessary forecast. The long-wave model gives the opposite result.",
              "v": "wrong",
              "fb": "That interpretation conflicts with the wave physics or the observations described."
            },
            {
              "t": "The event is likely to be a hidden blast or a largely unknowable freak, leaving no role for network maintenance. The public warning loses its usable interval.",
              "v": "danger",
              "fb": "That choice turns uncertainty into permission to ignore a potentially actionable hazard."
            }
          ]
        }
      ]
    },
    "vandorn": {
      "whatHint": "Van Dorn tied shoreline runup to a measurable offshore wave. Ask whether deep-water gauges saw it coming while the shore was told nothing.",
      "sci": "William Van Dorn (1919-2018)",
      "topic": "Tsunami hydrodynamics & wave runup",
      "lede": "William Van Dorn turned tsunami hydrodynamics and wave runup into a measurable story of source, basin, and coast.",
      "no": 7,
      "profile": "Today’s ocean-science dispatch follows William Van Dorn into tsunami hydrodynamics and wave runup. William Van Dorn conducted influential laboratory and field work on tsunami generation, propagation, runup, and the violent motion of water in bays and harbors. His experiments helped connect idealized equations with the complex behavior seen at shorelines. Long waves cross boundaries between seismology, fluid mechanics, bathymetry, and public warning. Dorn’s work shows how one part of that chain can be measured instead of guessed.\n\nThe practical method is to test long-wave models against controlled runup experiments and real coastal geometry. Analysts must separate the source from the path and the coastline, state instrument limits, and update the interpretation when tide gauges or deep-ocean sensors disagree with the first model.\n\nTsunamis are often nearly invisible in deep water because their enormous wavelength spreads energy through the full water column. Near shore, slowing, shoaling, resonance, and topography can produce repeated destructive surges. That makes maintenance, transmission, modeling, and evacuation inseparable parts of one warning system.\n\nThe enduring lesson: coastal impact depends on topography, harbor resonance, and repeated surges, not only offshore height. Ocean hazards become manageable when observation and communication remain continuous from the source region to the last mile. A warning bulletin should record why it changed, which measurements drove the revision, and what uncertainty remained. Harbor behavior can differ sharply from an open coast even when both receive the same offshore wave. Natural warning signs such as strong shaking or sudden withdrawal remain valuable when communications fail.",
      "frame": "Checks a tide trace at The Warning Programme Office. \"Before I release the station log, explain tsunami hydrodynamics and wave runup without confusing the wave with the water carrying it.\"",
      "q": [
        {
          "q": "Which oceanographic account best captures William Van Dorn’s work on tsunami hydrodynamics and wave runup?",
          "o": [
            {
              "t": "William Van Dorn conducted influential laboratory and field work on tsunami generation, propagation, runup, and the violent motion of water in bays and harbors.",
              "v": "expert",
              "fb": "Correct: the answer links physical mechanism with direct observation and an updateable forecast."
            },
            {
              "t": "William Van Dorn advanced tsunami hydrodynamics and wave runup, but the account uses one coastal gauge without resolving source geometry or basin propagation.",
              "v": "partial",
              "fb": "Partly useful, but it leaves a major source, propagation, or measurement assumption unresolved."
            },
            {
              "t": "William Van Dorn is presented as showing that tsunami height stays constant from deep ocean to every shoreline. The long-wave model gives the opposite result.",
              "v": "wrong",
              "fb": "That interpretation conflicts with the wave physics or the observations described."
            },
            {
              "t": "William Van Dorn is invoked to cancel a warning whenever the first model has wide uncertainty. Delay consumes evacuation time. Silence is treated as certainty.",
              "v": "danger",
              "fb": "That choice turns uncertainty into permission to ignore a potentially actionable hazard."
            }
          ]
        },
        {
          "q": "Which procedure best converts a possible tsunami into a defensible warning?",
          "o": [
            {
              "t": "Apply this ocean-warning method: test long-wave models against controlled runup experiments and real coastal geometry. The buoy record remains available.",
              "v": "expert",
              "fb": "Correct: the answer links physical mechanism with direct observation and an updateable forecast."
            },
            {
              "t": "Use the earthquake location and nearest tide gauge, but do not seek deep-ocean confirmation or revise the coastal forecast. The source remains uncertain.",
              "v": "partial",
              "fb": "Partly useful, but it leaves a major source, propagation, or measurement assumption unresolved."
            },
            {
              "t": "Estimate coastal impact from offshore visual wave height while ignoring wavelength, depth, and harbor geometry. The long-wave model gives the opposite result.",
              "v": "wrong",
              "fb": "That interpretation conflicts with the wave physics or the observations described."
            },
            {
              "t": "Withhold the bulletin until the exact runup is known, then describe the lost warning time as unavoidable uncertainty. Delay consumes evacuation time.",
              "v": "danger",
              "fb": "That choice turns uncertainty into permission to ignore a potentially actionable hazard."
            }
          ]
        },
        {
          "q": "What general principle follows from this work?",
          "o": [
            {
              "t": "The scientific conclusion is that coastal impact depends on topography, harbor resonance, and repeated surges, not only offshore height. The buoy record remains available, in use.",
              "v": "expert",
              "fb": "Correct: the answer links physical mechanism with direct observation and an updateable forecast."
            },
            {
              "t": "One functioning shoreline station can substitute for basin-wide instruments if the source earthquake is large. The source remains uncertain. One harbor response is unresolved, in use.",
              "v": "partial",
              "fb": "Partly useful, but it leaves a major source, propagation, or measurement assumption unresolved."
            },
            {
              "t": "A tsunami is simply a tall wind wave, so ordinary surf observations provide the necessary forecast. Long-wave physics rejects that. The long-wave model gives the opposite result.",
              "v": "wrong",
              "fb": "That interpretation conflicts with the wave physics or the observations described."
            },
            {
              "t": "The event is likely to be a hidden blast or a largely unknowable freak, leaving no role for network maintenance. Delay consumes evacuation time. The public warning loses its usable interval.",
              "v": "danger",
              "fb": "That choice turns uncertainty into permission to ignore a potentially actionable hazard."
            }
          ]
        }
      ]
    },
    "kajiura": {
      "whatHint": "Kajiura modelled how a sea-floor source spreads into a tsunami. Ask whether the propagation fits a broad sea-bed source rather than a compact blast.",
      "sci": "Kinjiro Kajiura (tsunami hydrodynamicist)",
      "topic": "Tsunami source & propagation",
      "lede": "Kinjiro Kajiura made tsunami source and propagation part of the observing chain behind modern tsunami warnings.",
      "no": 8,
      "profile": "Today’s ocean-science dispatch follows Kinjiro Kajiura into tsunami source and propagation. Kinjiro Kajiura developed theory for tsunami generation and propagation, including how finite water depth and source dimensions shape the initial wave. His work linked seafloor deformation to the wave field that travels outward. Long waves cross boundaries between seismology, fluid mechanics, bathymetry, and public warning. Kajiura’s work shows how one part of that chain can be measured instead of guessed.\n\nThe practical method is to translate a physically plausible seafloor displacement into an initial ocean-surface disturbance. Analysts must separate the source from the path and the coastline, state instrument limits, and update the interpretation when tide gauges or deep-ocean sensors disagree with the first model.\n\nTsunamis are often nearly invisible in deep water because their enormous wavelength spreads energy through the full water column. Near shore, slowing, shoaling, resonance, and topography can produce repeated destructive surges. That makes maintenance, transmission, modeling, and evacuation inseparable parts of one warning system.\n\nThe enduring lesson: the source must be modeled before coastal forecasts can be trusted. Ocean hazards become manageable when observation and communication remain continuous from the source region to the last mile. A warning bulletin should record why it changed, which measurements drove the revision, and what uncertainty remained. Harbor behavior can differ sharply from an open coast even when both receive the same offshore wave. Natural warning signs such as strong shaking or sudden withdrawal remain valuable when communications fail. Forecast maps should distinguish arrival, amplitude, current, and inundation because they answer different safety questions.",
      "frame": "Taps the silent telemetry panel. \"A model is only half a warning. Start with tsunami source and propagation.\"",
      "q": [
        {
          "q": "Which oceanographic account best captures Kinjiro Kajiura’s work on tsunami source and propagation?",
          "o": [
            {
              "t": "Kinjiro Kajiura developed theory for tsunami generation and propagation, including how finite water depth and source dimensions shape the initial wave.",
              "v": "expert",
              "fb": "Correct: the answer links physical mechanism with direct observation and an updateable forecast."
            },
            {
              "t": "Kinjiro Kajiura advanced tsunami source and propagation, but the account uses one coastal gauge without resolving source geometry or basin propagation.",
              "v": "partial",
              "fb": "Partly useful, but it leaves a major source, propagation, or measurement assumption unresolved."
            },
            {
              "t": "Kinjiro Kajiura is presented as showing that tsunami height stays constant from deep ocean to every shoreline. The tide trace points elsewhere.",
              "v": "wrong",
              "fb": "That interpretation conflicts with the wave physics or the observations described."
            },
            {
              "t": "Kinjiro Kajiura is invoked to cancel a warning whenever the first model has wide uncertainty. Maintenance failure is disguised as ocean uncertainty.",
              "v": "danger",
              "fb": "That choice turns uncertainty into permission to ignore a potentially actionable hazard."
            }
          ]
        },
        {
          "q": "Which procedure best converts a possible tsunami into a defensible warning?",
          "o": [
            {
              "t": "Apply this ocean-warning method: translate a physically plausible seafloor displacement into an initial ocean-surface disturbance. Coastal amplification stays explicit.",
              "v": "expert",
              "fb": "Correct: the answer links physical mechanism with direct observation and an updateable forecast."
            },
            {
              "t": "Use the earthquake location and nearest tide gauge, but do not seek deep-ocean confirmation or revise the coastal forecast. primarily part of the propagation path has been tested.",
              "v": "partial",
              "fb": "Partly useful, but it leaves a major source, propagation, or measurement assumption unresolved."
            },
            {
              "t": "Estimate coastal impact from offshore visual wave height while ignoring wavelength, depth, and harbor geometry. Long-wave physics rejects that. The tide trace points elsewhere.",
              "v": "wrong",
              "fb": "That interpretation conflicts with the wave physics or the observations described."
            },
            {
              "t": "Withhold the bulletin until the exact runup is known, then describe the lost warning time as unavoidable uncertainty. A delayed bulletin becomes operational policy, in use.",
              "v": "danger",
              "fb": "That choice turns uncertainty into permission to ignore a potentially actionable hazard."
            }
          ]
        },
        {
          "q": "What general principle follows from this work?",
          "o": [
            {
              "t": "The scientific conclusion is that the source must be modeled before coastal forecasts can be trusted. Coastal amplification stays explicit, in use.",
              "v": "expert",
              "fb": "Correct: the answer links physical mechanism with direct observation and an updateable forecast."
            },
            {
              "t": "One functioning shoreline station can substitute for basin-wide instruments if the source earthquake is large. The source remains uncertain, in use.",
              "v": "partial",
              "fb": "Partly useful, but it leaves a major source, propagation, or measurement assumption unresolved."
            },
            {
              "t": "A tsunami is simply a tall wind wave, so ordinary surf observations provide the necessary forecast. The long-wave model gives the opposite result.",
              "v": "wrong",
              "fb": "That interpretation conflicts with the wave physics or the observations described."
            },
            {
              "t": "The event is likely to be a hidden blast or a largely unknowable freak, leaving no role for network maintenance. The public warning loses its usable interval.",
              "v": "danger",
              "fb": "That choice turns uncertainty into permission to ignore a potentially actionable hazard."
            }
          ]
        }
      ]
    },
    "ebernard": {
      "whatHint": "Bernard's DART buoys exist to catch a tsunami mid-ocean. Ask which of them were reporting that night — and which were dark.",
      "sci": "Eddie Bernard (tsunami-warning oceanographer)",
      "topic": "The DART deep-ocean buoy network",
      "lede": "Eddie Bernard connected the dart deep-ocean buoy network with distant ocean motion and local water levels.",
      "no": 9,
      "profile": "Today’s ocean-science dispatch follows Eddie Bernard into the dart deep-ocean buoy network. Eddie Bernard led NOAA tsunami research and helped advance the Deep-ocean Assessment and Reporting of Tsunamis system, known as DART. Bottom-pressure recorders detect the passage of a tsunami in deep water and relay measurements through surface buoys and satellites. Long waves cross boundaries between seismology, fluid mechanics, bathymetry, and public warning. Bernard’s work shows how one part of that chain can be measured instead of guessed.\n\nThe practical method is to confirm a modeled tsunami with deep-ocean pressure data before refining forecasts. Analysts must separate the source from the path and the coastline, state instrument limits, and update the interpretation when tide gauges or deep-ocean sensors disagree with the first model.\n\nTsunamis are often nearly invisible in deep water because their enormous wavelength spreads energy through the full water column. Near shore, slowing, shoaling, resonance, and topography can produce repeated destructive surges. That makes maintenance, transmission, modeling, and evacuation inseparable parts of one warning system.\n\nThe enduring lesson: direct offshore measurement can reduce both missed warnings and unnecessary evacuations. Ocean hazards become manageable when observation and communication remain continuous from the source region to the last mile. A warning bulletin should record why it changed, which measurements drove the revision, and what uncertainty remained. Harbor behavior can differ sharply from an open coast even when both receive the same offshore wave. Natural warning signs such as strong shaking or sudden withdrawal remain valuable when communications fail. Forecast maps should distinguish arrival, amplitude, current, and inundation because they answer different safety questions.",
      "frame": "Steadies a salt-stained instrument case. \"The ocean leaves timing clues. Show me what the dart deep-ocean buoy network lets us calculate.\"",
      "q": [
        {
          "q": "Which oceanographic account best captures Eddie Bernard’s work on the dart deep-ocean buoy network?",
          "o": [
            {
              "t": "Eddie Bernard led NOAA tsunami research and helped advance the Deep-ocean Assessment and Reporting of Tsunamis system, known as DART. The basin record can be reconstructed afterward.",
              "v": "expert",
              "fb": "Correct: the answer links physical mechanism with direct observation and an updateable forecast."
            },
            {
              "t": "Eddie Bernard advanced the dart deep-ocean buoy network, but the account uses one coastal gauge without resolving source geometry or basin propagation. The source remains uncertain.",
              "v": "partial",
              "fb": "Partly useful, but it leaves a major source, propagation, or measurement assumption unresolved."
            },
            {
              "t": "Eddie Bernard is presented as showing that tsunami height stays constant from deep ocean to every shoreline. Long-wave physics rejects that. The tide trace points elsewhere.",
              "v": "wrong",
              "fb": "That interpretation conflicts with the wave physics or the observations described."
            },
            {
              "t": "Eddie Bernard is invoked to cancel a warning whenever the first model has wide uncertainty. Silence is treated as certainty. A delayed bulletin becomes operational policy.",
              "v": "danger",
              "fb": "That choice turns uncertainty into permission to ignore a potentially actionable hazard."
            }
          ]
        },
        {
          "q": "Which procedure best converts a possible tsunami into a defensible warning?",
          "o": [
            {
              "t": "Apply this ocean-warning method: confirm a modeled tsunami with deep-ocean pressure data before refining forecasts. The buoy record remains available.",
              "v": "expert",
              "fb": "Correct: the answer links physical mechanism with direct observation and an updateable forecast."
            },
            {
              "t": "Use the earthquake location and nearest tide gauge, but do not seek deep-ocean confirmation or revise the coastal forecast. The source remains uncertain.",
              "v": "partial",
              "fb": "Partly useful, but it leaves a major source, propagation, or measurement assumption unresolved."
            },
            {
              "t": "Estimate coastal impact from offshore visual wave height while ignoring wavelength, depth, and harbor geometry. The long-wave model gives the opposite result.",
              "v": "wrong",
              "fb": "That interpretation conflicts with the wave physics or the observations described."
            },
            {
              "t": "Withhold the bulletin until the exact runup is known, then describe the lost warning time as unavoidable uncertainty. Delay consumes evacuation time.",
              "v": "danger",
              "fb": "That choice turns uncertainty into permission to ignore a potentially actionable hazard."
            }
          ]
        },
        {
          "q": "What general principle follows from this work?",
          "o": [
            {
              "t": "The scientific conclusion is that direct offshore measurement can reduce both missed warnings and unnecessary evacuations. Coastal amplification stays explicit, in use.",
              "v": "expert",
              "fb": "Correct: the answer links physical mechanism with direct observation and an updateable forecast."
            },
            {
              "t": "One functioning shoreline station can substitute for basin-wide instruments if the source earthquake is large. primarily part of the propagation path has been tested.",
              "v": "partial",
              "fb": "Partly useful, but it leaves a major source, propagation, or measurement assumption unresolved."
            },
            {
              "t": "A tsunami is simply a tall wind wave, so ordinary surf observations provide the necessary forecast. Long-wave physics rejects that. The tide trace points elsewhere, in use.",
              "v": "wrong",
              "fb": "That interpretation conflicts with the wave physics or the observations described."
            },
            {
              "t": "The event is likely to be a hidden blast or a largely unknowable freak, leaving no role for network maintenance. Delay consumes evacuation time. Silence is treated as certainty.",
              "v": "danger",
              "fb": "That choice turns uncertainty into permission to ignore a potentially actionable hazard."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "buoytech": {
      "shore": "At the shore & tide stations, Buoy Tech Sana waits beside a water-level trace and a dead telemetry channel. \"Services the sea buoys; half the network had flatlined and stayed down. The sea sent more than one signal.\"",
      "watchfloor": "At the tsunami warning centre, Buoy Tech Sana waits beside a water-level trace and a dead telemetry channel. \"Services the sea buoys; half the network had flatlined and stayed down. The sea sent more than one signal.\"",
      "office": "At the warning programme office, Buoy Tech Sana waits beside a water-level trace and a dead telemetry channel. \"Services the sea buoys; half the network had flatlined and stayed down. The sea sent more than one signal.\""
    },
    "watchstander": {
      "shore": "At the shore & tide stations, The Watchstander waits beside a water-level trace and a dead telemetry channel. \"Held the desk when the quake hit; the bulletin sat unissued. The sea sent more than one signal.\"",
      "watchfloor": "At the tsunami warning centre, The Watchstander waits beside a water-level trace and a dead telemetry channel. \"Held the desk when the quake hit; the bulletin sat unissued. The sea sent more than one signal.\"",
      "office": "At the warning programme office, The Watchstander waits beside a water-level trace and a dead telemetry channel. \"Held the desk when the quake hit; the bulletin sat unissued. The sea sent more than one signal.\""
    },
    "clerk": {
      "shore": "At the shore & tide stations, The Clerk waits beside a water-level trace and a dead telemetry channel. \"Keeps the maintenance logs — and the hazard study that was toned down. The sea sent more than one signal.\"",
      "watchfloor": "At the tsunami warning centre, The Clerk waits beside a water-level trace and a dead telemetry channel. \"Keeps the maintenance logs — and the hazard study that was toned down. The sea sent more than one signal.\"",
      "office": "At the warning programme office, The Clerk waits beside a water-level trace and a dead telemetry channel. \"Keeps the maintenance logs — and the hazard study that was toned down. The sea sent more than one signal.\""
    }
  },
  "story": [
    "<b>The Sable Point Wave</b> begins inside the Sable Point tsunami inquiry, where the first explanation is already spreading faster than the evidence.",
    "<b>Buoy Tech Sana</b>, <b>The Watchstander</b>, and <b>The Clerk</b> each hold a different part of the record, and each conversation opens with one real pioneer whose work changes how the evidence should be read.",
    "The inquiry keeps circling <b>A blast or weapon beneath the sea</b> and <b>A freak wave from nowhere — an act of God</b>. Both are tempting, and neither can be accepted just because it makes the cleanest headline.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and make the final WHAT judgment from what you learned."
  ],
  "endings": {
    "overclaimWhat": "blast",
    "dismissalWhat": "freak",
    "win": {
      "expertTitle": "The Wave Was Measured",
      "expert": [
        "You identify <b>Nadia Voss — tsunami warning-centre chief</b>, place the decisive maintenance and hazard records in <b>The Warning Programme Office</b>, and establish <b>A disabled buoy network & a downplayed hazard</b>. Not a blast or weapon beneath the sea. Not a freak wave from nowhere — an act of god.",
        "Dead deep-ocean stations, delayed issuance, and the toned-down study form one continuous warning failure. The sea supplied a detectable signal; institutional choices kept that signal from becoming timely action."
      ],
      "soundTitle": "A Warning Chain Rebuilt",
      "sound": [
        "The buoy outages and watch-floor chronology support your accusation against <b>Nadia Voss — tsunami warning-centre chief</b> for <b>A disabled buoy network & a downplayed hazard</b>, documented at <b>The Warning Programme Office</b>.",
        "Runup details still need refinement, but the essential ocean-warning sequence is secure enough to restore instruments, revise procedures, and assign responsibility."
      ],
      "namedTitle": "The Network Named",
      "named": [
        "Your selected answer names <b>Nadia Voss — tsunami warning-centre chief</b>, <b>The Warning Programme Office</b>, and <b>A disabled buoy network & a downplayed hazard</b> correctly.",
        "It lacks the full hydrodynamic chain, yet it sends reviewers to the buoy telemetry, bulletin clock, and programme correspondence."
      ]
    },
    "overclaim": {
      "title": "The Imagined Detonation",
      "body": [
        "You choose <b>A blast or weapon beneath the sea</b> and search for explosive signatures while the failed sensors and unsent bulletin remain in plain view.",
        "When no detonation evidence survives scrutiny, the theatrical claim lets the documented warning breakdown be dismissed with it."
      ]
    },
    "dismissal": {
      "title": "The Ocean Was Not Silent",
      "body": [
        "You accept <b>A freak wave from nowhere — an act of God</b>, treating the ocean as silent until the shoreline was struck.",
        "That verdict ignores offshore measurements, maintenance history, and the unused warning interval, preserving the same blind spots for the next event."
      ]
    },
    "wrongNames": {
      "title": "Right Hazard, Wrong Desk",
      "body": [
        "You recognize <b>A disabled buoy network & a downplayed hazard</b>, but assign the controlling choice to the wrong official or move its paper trail away from the programme office. The record points instead toward"
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A tsunami wave approaching a warning buoy and coast\"><path d=\"M0 98 C88 74,176 112,264 82 C352 52,440 86,528 64 C580 52,622 58,660 72\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2.4\"/><path d=\"M78 94 C122 54,166 52,206 78 C168 70,148 90,132 110\" fill=\"none\" stroke=\"#326891\" stroke-width=\"2.2\"/><line x1=\"430\" y1=\"34\" x2=\"430\" y2=\"104\" stroke=\"#121212\" stroke-width=\"1.6\"/><circle cx=\"430\" cy=\"44\" r=\"9\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M548 108 L548 54 L610 54 L610 108\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M422 42 L438 50\" stroke=\"#B3261E\" stroke-width=\"2\"/></svg>"
}};
