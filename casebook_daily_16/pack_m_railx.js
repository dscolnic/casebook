module.exports = { PACK: {
  "id": "m_railx",
  "title": "The Marsh Lane Crossing",
  "discipline": "Railway Signalling & Interlocking",
  "teaser": "An express struck a stopped train although the route displayed clear. Investigators blame a blind track circuit or failed automatic train stop. Which protection layer actually authorized the unsafe movement?",
  "overclaimTag": "a failed track circuit",
  "truthTag": "an interlocking that permitted a false clear",
  "venue": "the Marsh Lane crossing inquiry",
  "agent": {
    "name": "Investigator Glen Ashby",
    "role": "Investigator's Notepad"
  },
  "standingLabel": "Inquiry credibility",
  "readingShort": "Pioneers",
  "readingLabel": "Railway-Signalling Pioneers",
  "dossierName": "RAILWAY-SIGNALLING PIONEERS",
  "enterLabel": "Open the inquiry",
  "subt": "A deduction game inside the Marsh Lane crossing inquiry",
  "DAYS_TOTAL": 5,
  "boardNarr": "You have ${days} before your inquiry ends. Each conversation costs one day. Choose a witness, then put one WHERE and one WHO to them.",
  "placeNarr": "Choose a witness to question. The place you test determines the dossier you receive, and the conversation costs one day.",
  "overclaimTease": "Track detection and automatic train stop are persuasive suspects, but only the signalling history can separate them.",
  "CATS": {
    "who": {
      "title": "Who is behind it",
      "truth": "rx_infra",
      "items": [
        {
          "id": "rx_infra",
          "label": "Perren Voss — signalling infrastructure manager"
        },
        {
          "id": "rx_driver",
          "label": "The express driver"
        },
        {
          "id": "rx_regulator",
          "label": "The rail-safety inspector"
        }
      ]
    },
    "where": {
      "title": "Where it culminates",
      "truth": "rx_office",
      "items": [
        {
          "id": "rx_crossing",
          "label": "The Crossing & Points"
        },
        {
          "id": "rx_signalbox",
          "label": "The Signalling Control Centre"
        },
        {
          "id": "rx_office",
          "label": "The Infrastructure Head Office"
        }
      ]
    },
    "what": {
      "title": "Which safeguard actually failed?",
      "truth": "rx_interlock",
      "items": [
        {
          "id": "rx_sabotage",
          "label": "Track circuits failed to detect the occupied crossing."
        },
        {
          "id": "rx_driver",
          "label": "Automatic train stop failed after a restrictive signal."
        },
        {
          "id": "rx_interlock",
          "label": "Interlocking cleared a route across occupied track."
        }
      ]
    }
  },
  "PLACES": {
    "rx_crossing": {
      "name": "The Crossing & Points",
      "xy": [
        140,
        90
      ]
    },
    "rx_signalbox": {
      "name": "The Signalling Control Centre",
      "xy": [
        330,
        240
      ]
    },
    "rx_office": {
      "name": "The Infrastructure Head Office",
      "xy": [
        520,
        90
      ]
    }
  },
  "EDGES": [
    [
      "rx_crossing",
      "rx_signalbox"
    ],
    [
      "rx_signalbox",
      "rx_office"
    ]
  ],
  "CHARACTERS": {
    "rx_technician": {
      "name": "S&T Tech Mara Doss",
      "role": "Signal & telegraph technician",
      "face": "🔧",
      "badge": "M",
      "legend": "the crossing",
      "hint": "Maintains the crossing equipment and knows who approved each temporary wiring change."
    },
    "rx_signaller": {
      "name": "The Signaller",
      "role": "Signalling-centre operator",
      "face": "🚦",
      "badge": "S",
      "legend": "the control centre",
      "hint": "Worked the control panel and can reconstruct the route indications shown before impact."
    },
    "rx_clerk": {
      "name": "The Clerk",
      "role": "Infrastructure records clerk",
      "face": "🗂",
      "badge": "C",
      "legend": "the office",
      "hint": "Holds the fault register, maintenance deferrals, and authorization trail for the crossing."
    }
  },
  "TOPICMAP": {
    "rx_crossing": {
      "rx_technician": [
        "rx_wheatstone"
      ],
      "rx_signaller": [
        "rx_gregory"
      ],
      "rx_clerk": [
        "rx_tyer"
      ]
    },
    "rx_signalbox": {
      "rx_technician": [
        "rx_robinson"
      ],
      "rx_signaller": [
        "rx_raven"
      ],
      "rx_clerk": [
        "rx_raynar"
      ]
    },
    "rx_office": {
      "rx_technician": [
        "rx_trevithick"
      ],
      "rx_signaller": [
        "rx_gooch"
      ],
      "rx_clerk": [
        "rx_bradshaw"
      ]
    }
  },
  "TOPICS": {
    "rx_wheatstone": {
      "sci": "Charles Wheatstone (1802-1875)",
      "topic": "The electric telegraph & railway signalling",
      "lede": "Charles Wheatstone made the electric telegraph & railway signalling part of the controlled logic separating trains.",
      "no": 1,
      "profile": "The railway-systems note for today traces Charles Wheatstone through the electric telegraph & railway signalling. Charles Wheatstone worked with William Fothergill Cooke on an early practical electric telegraph used by railways. Telegraphy allowed stations to communicate train movements faster than a messenger or timetable could. That development turned train position, route, braking, or communication into a controlled condition rather than an assumption made from the timetable.\n\nSafe separation begins with timely, unambiguous information about where trains are and whether the route ahead is clear. Railway signalling separates heavy vehicles that cannot steer and may need a long distance to stop. Safe movement depends on detection, route locking, movement authority, braking, communication, and a restrictive response to missing information. A signalling explanation should identify detection, movement authority, route locking, braking response, failure state, and the evidence presented to the driver or signaller.\n\nInterlocking prevents conflicting routes and incompatible commands. Track circuits, axle counters, point detection, crossing controls, block instruments, and train protection each convert physical state into permission or prohibition. A bypass may restore traffic while quietly removing the condition that made the route safe. Temporary arrangements therefore need explicit limits, independent protection, testing, logging, and a defined return to normal equipment. The railway chronology should join panel logs, track detection, point tests, crossing state, temporary straps, notices, maintenance deferrals, and train movements.\n\nThe fail-safe lesson is that loss of power, wire continuity, detection, or agreement should produce stop, occupied, or fault—not a permissive clear. Convenience must never reverse that logic. A useful infrastructure record links signal failures, point tests, crossing alarms, temporary straps, operating notices, maintenance deferrals, and train movements. The chronology often reveals normalization of a known defect. Cover knowledge means separating a driver's action from the authority and protection presented to the cab. Signal aspects, data logs, route state, braking, and interlock condition belong in one reconstruction.",
      "frame": "Tests a relay at The Crossing & Points. \"Use Charles Wheatstone to show how the railway proves a route before displaying clear.\"",
      "q": [
        {
          "q": "Which railway-signalling account best describes Charles Wheatstone's contribution to the electric telegraph & railway signalling?",
          "o": [
            {
              "t": "Charles Wheatstone worked with William Fothergill Cooke on an early practical electric telegraph used by railways. Signalling specialists compare the dated interlock-linked detection record with train movement. Rail fits.",
              "v": "expert",
              "fb": "Correct: this response links the signalling device with separation, interlocking, and fail-safe authority."
            },
            {
              "t": "Charles Wheatstone's treatment of the electric telegraph & railway signalling uses a rail simplification: the panel indication and printed timetable, with route proving and occupancy treated as separate checks. Rail fits.",
              "v": "partial",
              "fb": "This covers one signalling element but leaves route locking or train detection unresolved."
            },
            {
              "t": "Charles Wheatstone's rail work supports a timetable and signal aspect as sufficient authority without the complete interlocking chain. The timetable supports the account. Temporary working can seem routine. Rail fits.",
              "v": "wrong",
              "fb": "That explanation assigns the device a function it did not provide or confuses schedule with authority."
            },
            {
              "t": "Charles Wheatstone's authority is invoked in rail practice to justify keeping a temporary interlock bypass after several uneventful train movements. Rail records fit this rail account. The panel sequence appears consistent.",
              "v": "danger",
              "fb": "That shortcut restores movement by removing the barrier meant to prevent incompatible train paths."
            }
          ]
        },
        {
          "q": "Which fail-safe signalling rule does this contribution support?",
          "o": [
            {
              "t": "Safe separation begins with timely, unambiguous information about where trains are and whether the route ahead is clear. The railway dossier carries the signal trace. Rail fits. Rail fits.",
              "v": "expert",
              "fb": "Correct: this response links the signalling device with separation, interlocking, and fail-safe authority."
            },
            {
              "t": "Accept one clear panel indication while treating point position, occupancy, and brake protection as secondary confirmations. The panel sequence appears consistent. Rail context matters.",
              "v": "partial",
              "fb": "This covers one signalling element but leaves route locking or train detection unresolved."
            },
            {
              "t": "Assume signal and braking behavior remain safe when power, wire continuity, detection, or communication is degraded. Rail records fit this rail account. Rail timing supports this rail claim.",
              "v": "wrong",
              "fb": "That explanation assigns the device a function it did not provide or confuses schedule with authority."
            },
            {
              "t": "Clear the route under temporary working after removing the device that ordinarily prevents conflicting movement. Rail records fit this rail account. Rail timing supports this rail claim.",
              "v": "danger",
              "fb": "That shortcut restores movement by removing the barrier meant to prevent incompatible train paths."
            }
          ]
        },
        {
          "q": "What railway operating lesson should remain after this history?",
          "o": [
            {
              "t": "Cover knowledge means separating a driver's action from the authority and protection presented to the cab. Signal aspects, data logs, route state, braking, and interlock condition belong in one reconstruction. Rail fits. Rail fits.",
              "v": "expert",
              "fb": "Correct: this response links the signalling device with separation, interlocking, and fail-safe authority."
            },
            {
              "t": "Separate temporary-working records from the movement log once the line has returned to normal service. The panel sequence appears consistent. Rail practice makes the rail view plausible. Rail timing supports this rail claim.",
              "v": "partial",
              "fb": "This covers one signalling element but leaves route locking or train detection unresolved."
            },
            {
              "t": "Place primary weight on sabotage or driver error while giving less attention to permissive infrastructure behavior. Rail records fit this rail account. Rail context supports the view. Rail timing supports this rail claim. Rail fits.",
              "v": "wrong",
              "fb": "That explanation assigns the device a function it did not provide or confuses schedule with authority."
            },
            {
              "t": "Reopen the line with the temporary strap retained after one uneventful test movement. Rail records fit this rail account. Rail context supports the view. Rail practice makes the rail view plausible. Rail timing supports this rail claim.",
              "v": "danger",
              "fb": "That shortcut restores movement by removing the barrier meant to prevent incompatible train paths."
            }
          ]
        }
      ]
    },
    "rx_gregory": {
      "sci": "Charles Hutton Gregory (1817-1898)",
      "topic": "The semaphore railway signal",
      "lede": "Charles Hutton Gregory's work on the semaphore railway signal strengthened the fail-safe chain between track and driver.",
      "no": 2,
      "profile": "The railway-systems note for today traces Charles Hutton Gregory through the semaphore railway signal. Charles Hutton Gregory introduced an influential semaphore signal on the London and Croydon Railway. A movable arm gave drivers a distinct daytime indication that could be paired with lamps for darkness. That development turned train position, route, braking, or communication into a controlled condition rather than an assumption made from the timetable.\n\nA signal must be conspicuous, unambiguous, correctly positioned, and fail toward the restrictive state when its mechanism breaks. A bypass may restore traffic while quietly removing the condition that made the route safe. Temporary arrangements therefore need explicit limits, independent protection, testing, logging, and a defined return to normal equipment. A signalling explanation should identify detection, movement authority, route locking, braking response, failure state, and the evidence presented to the driver or signaller.\n\nRailway signalling separates heavy vehicles that cannot steer and may need a long distance to stop. Safe movement depends on detection, route locking, movement authority, braking, communication, and a restrictive response to missing information. Interlocking prevents conflicting routes and incompatible commands. Track circuits, axle counters, point detection, crossing controls, block instruments, and train protection each convert physical state into permission or prohibition. The railway chronology should join panel logs, track detection, point tests, crossing state, temporary straps, notices, maintenance deferrals, and train movements.\n\nCover knowledge means separating a driver's action from the authority and protection presented to the cab. Signal aspects, data logs, route state, braking, and interlock condition belong in one reconstruction. The fail-safe lesson is that loss of power, wire continuity, detection, or agreement should produce stop, occupied, or fault—not a permissive clear. Convenience must never reverse that logic. A useful infrastructure record links signal failures, point tests, crossing alarms, temporary straps, operating notices, maintenance deferrals, and train movements. The chronology often reveals normalization of a known defect.",
      "frame": "Sets a block instrument at danger in The Crossing & Points. \"Start with Charles Hutton Gregory; keep movement authority separate from schedule.\"",
      "q": [
        {
          "q": "Which railway-signalling account best describes Charles Hutton Gregory's contribution to the semaphore railway signal?",
          "o": [
            {
              "t": "Charles Hutton Gregory introduced an influential semaphore signal on the London and Croydon Railway. Fail-safe review keeps the interlock-linked maintenance history available for testing.",
              "v": "expert",
              "fb": "Correct: this response links the signalling device with separation, interlocking, and fail-safe authority."
            },
            {
              "t": "Charles Hutton Gregory's rail work emphasizes the panel indication and printed timetable. Rail records fit this rail account. Rail context supports the view. Rail timing supports this rail claim.",
              "v": "partial",
              "fb": "This covers one signalling element but leaves route locking or train detection unresolved."
            },
            {
              "t": "Charles Hutton Gregory's rail work supports a timetable and signal aspect as sufficient authority without the complete interlocking chain. The panel sequence appears consistent. Rail fits.",
              "v": "wrong",
              "fb": "That explanation assigns the device a function it did not provide or confuses schedule with authority."
            },
            {
              "t": "Charles Hutton Gregory's authority is invoked in rail practice to justify keeping a temporary interlock bypass after several uneventful train movements. Rail timing supports this rail claim.",
              "v": "danger",
              "fb": "That shortcut restores movement by removing the barrier meant to prevent incompatible train paths."
            }
          ]
        },
        {
          "q": "Which fail-safe signalling rule does this contribution support?",
          "o": [
            {
              "t": "A signal must be conspicuous, unambiguous, correctly positioned, and fail toward the restrictive state when its mechanism breaks. The railway dossier carries the route log. Rail fits.",
              "v": "expert",
              "fb": "Correct: this response links the signalling device with separation, interlocking, and fail-safe authority."
            },
            {
              "t": "Accept one clear panel indication while treating point position, occupancy, and brake protection as secondary confirmations. The panel sequence appears consistent. The rail record fits.",
              "v": "partial",
              "fb": "This covers one signalling element but leaves route locking or train detection unresolved."
            },
            {
              "t": "Assume signal and braking behavior remain safe when power, wire continuity, detection, or communication is degraded. Rail records fit this rail account. Rail timing supports this rail claim.",
              "v": "wrong",
              "fb": "That explanation assigns the device a function it did not provide or confuses schedule with authority."
            },
            {
              "t": "Clear the route under temporary working after removing the device that ordinarily prevents conflicting movement. Rail records fit this rail account. Rail timing supports this rail claim.",
              "v": "danger",
              "fb": "That shortcut restores movement by removing the barrier meant to prevent incompatible train paths."
            }
          ]
        },
        {
          "q": "What railway operating lesson should remain after this history?",
          "o": [
            {
              "t": "A useful infrastructure record links signal failures, point tests, crossing alarms, temporary straps, operating notices, maintenance deferrals, and train movements. The chronology often reveals normalization of a known defect. Rail fits.",
              "v": "expert",
              "fb": "Correct: this response links the signalling device with separation, interlocking, and fail-safe authority."
            },
            {
              "t": "Separate temporary-working records from the movement log once the line has returned to normal service. The visible driver action fits. Rail records fit this rail account. Rail context supports the view. Rail timing supports this rail claim.",
              "v": "partial",
              "fb": "This covers one signalling element but leaves route locking or train detection unresolved."
            },
            {
              "t": "Place primary weight on sabotage or driver error while giving less attention to permissive infrastructure behavior. The panel sequence appears consistent. Temporary working can seem routine. Rail practice makes the rail view plausible.",
              "v": "wrong",
              "fb": "That explanation assigns the device a function it did not provide or confuses schedule with authority."
            },
            {
              "t": "Reopen the line with the temporary strap retained after one uneventful test movement. The panel sequence appears consistent. The timetable supports the account. Temporary working can seem routine. Rail practice makes the rail view plausible.",
              "v": "danger",
              "fb": "That shortcut restores movement by removing the barrier meant to prevent incompatible train paths."
            }
          ]
        }
      ]
    },
    "rx_tyer": {
      "sci": "Edward Tyer (1830-1912)",
      "topic": "The single-line token & tablet",
      "lede": "Through the single-line token & tablet, Edward Tyer converted railway movement from assumption into proved authority.",
      "no": 3,
      "profile": "The railway-systems note for today traces Edward Tyer through the single-line token & tablet. Edward Tyer developed tablet and token instruments for single-line railways. The system ensured that only one authority token for a section could be released at a time. That development turned train position, route, braking, or communication into a controlled condition rather than an assumption made from the timetable.\n\nExclusive possession of a token converts an abstract movement authority into a controlled physical object that cannot be duplicated casually. Interlocking prevents conflicting routes and incompatible commands. Track circuits, axle counters, point detection, crossing controls, block instruments, and train protection each convert physical state into permission or prohibition. A signalling explanation should identify detection, movement authority, route locking, braking response, failure state, and the evidence presented to the driver or signaller.\n\nA bypass may restore traffic while quietly removing the condition that made the route safe. Temporary arrangements therefore need explicit limits, independent protection, testing, logging, and a defined return to normal equipment. Railway signalling separates heavy vehicles that cannot steer and may need a long distance to stop. Safe movement depends on detection, route locking, movement authority, braking, communication, and a restrictive response to missing information. The railway chronology should join panel logs, track detection, point tests, crossing state, temporary straps, notices, maintenance deferrals, and train movements.\n\nA useful infrastructure record links signal failures, point tests, crossing alarms, temporary straps, operating notices, maintenance deferrals, and train movements. The chronology often reveals normalization of a known defect. Cover knowledge means separating a driver's action from the authority and protection presented to the cab. Signal aspects, data logs, route state, braking, and interlock condition belong in one reconstruction. The fail-safe lesson is that loss of power, wire continuity, detection, or agreement should produce stop, occupied, or fault—not a permissive clear. Convenience must never reverse that logic.",
      "frame": "Points along the rails at The Crossing & Points. \"Explain the single-line token & tablet, including the state produced by a broken wire.\"",
      "q": [
        {
          "q": "Which railway-signalling account best describes Edward Tyer's contribution to the single-line token & tablet?",
          "o": [
            {
              "t": "Edward Tyer developed tablet and token instruments for single-line railways. Signalling specialists compare the raw train-specific fail-safe detection record with train movement. Rail fits.",
              "v": "expert",
              "fb": "Correct: this response links the signalling device with separation, interlocking, and fail-safe authority."
            },
            {
              "t": "Edward Tyer's rail work emphasizes the panel indication and printed timetable. Rail records fit this rail account. Rail practice makes the rail view plausible. Rail timing supports this rail claim.",
              "v": "partial",
              "fb": "This covers one signalling element but leaves route locking or train detection unresolved."
            },
            {
              "t": "Edward Tyer's rail work supports a timetable and signal aspect as sufficient authority without the complete interlocking chain. The panel sequence appears consistent. Rail fits. Rail fits.",
              "v": "wrong",
              "fb": "That explanation assigns the device a function it did not provide or confuses schedule with authority."
            },
            {
              "t": "Edward Tyer's authority is invoked in rail practice to justify keeping a temporary interlock bypass after several uneventful train movements. Rail timing supports this rail claim. Rail fits.",
              "v": "danger",
              "fb": "That shortcut restores movement by removing the barrier meant to prevent incompatible train paths."
            }
          ]
        },
        {
          "q": "Which fail-safe signalling rule does this contribution support?",
          "o": [
            {
              "t": "Exclusive possession of a token converts an abstract movement authority into a controlled physical object that cannot be duplicated casually. The railway dossier carries the route log. Rail fits.",
              "v": "expert",
              "fb": "Correct: this response links the signalling device with separation, interlocking, and fail-safe authority."
            },
            {
              "t": "Accept one clear panel indication while treating point position, occupancy, and brake protection as secondary confirmations. Rail records fit this rail account. Rail timing supports this rail claim.",
              "v": "partial",
              "fb": "This covers one signalling element but leaves route locking or train detection unresolved."
            },
            {
              "t": "Assume signal and braking behavior remain safe when power, wire continuity, detection, or communication is degraded. The timetable supports the account. Temporary working can seem routine.",
              "v": "wrong",
              "fb": "That explanation assigns the device a function it did not provide or confuses schedule with authority."
            },
            {
              "t": "Clear the route under temporary working after removing the device that ordinarily prevents conflicting movement. Temporary working can seem routine. Rail practice makes the rail view plausible.",
              "v": "danger",
              "fb": "That shortcut restores movement by removing the barrier meant to prevent incompatible train paths."
            }
          ]
        },
        {
          "q": "What railway operating lesson should remain after this history?",
          "o": [
            {
              "t": "The fail-safe lesson is that loss of power, wire continuity, detection, or agreement should produce stop, occupied, or fault—not a permissive clear. Convenience must never reverse that logic. Rail fits.",
              "v": "expert",
              "fb": "Correct: this response links the signalling device with separation, interlocking, and fail-safe authority."
            },
            {
              "t": "Separate temporary-working records from the movement log once the line has returned to normal service. Rail records fit this rail account. Rail context supports the view. Rail timing supports this rail claim.",
              "v": "partial",
              "fb": "This covers one signalling element but leaves route locking or train detection unresolved."
            },
            {
              "t": "Place primary weight on sabotage or driver error while giving less attention to permissive infrastructure behavior. The panel sequence appears consistent. Rail practice makes the rail view plausible.",
              "v": "wrong",
              "fb": "That explanation assigns the device a function it did not provide or confuses schedule with authority."
            },
            {
              "t": "Reopen the line with the temporary strap retained after one uneventful test movement. The panel sequence appears consistent. Temporary working can seem routine. Rail practice makes the rail view plausible.",
              "v": "danger",
              "fb": "That shortcut restores movement by removing the barrier meant to prevent incompatible train paths."
            }
          ]
        }
      ]
    },
    "rx_robinson": {
      "sci": "William Robinson (1840-1921)",
      "topic": "The closed track circuit",
      "lede": "William Robinson made the closed track circuit part of the controlled logic separating trains.",
      "no": 4,
      "profile": "The railway-systems note for today traces William Robinson through the closed track circuit. William Robinson invented the closed track circuit, using a train's wheels and axles to shunt current between the rails. The circuit could automatically detect occupancy and return signals to danger. That development turned train position, route, braking, or communication into a controlled condition rather than an assumption made from the timetable.\n\nTrack circuits are fail-safe when loss of current is interpreted as occupied or faulty rather than as permission to proceed. Railway signalling separates heavy vehicles that cannot steer and may need a long distance to stop. Safe movement depends on detection, route locking, movement authority, braking, communication, and a restrictive response to missing information. A signalling explanation should identify detection, movement authority, route locking, braking response, failure state, and the evidence presented to the driver or signaller.\n\nInterlocking prevents conflicting routes and incompatible commands. Track circuits, axle counters, point detection, crossing controls, block instruments, and train protection each convert physical state into permission or prohibition. A bypass may restore traffic while quietly removing the condition that made the route safe. Temporary arrangements therefore need explicit limits, independent protection, testing, logging, and a defined return to normal equipment. The railway chronology should join panel logs, track detection, point tests, crossing state, temporary straps, notices, maintenance deferrals, and train movements.\n\nRobinson's track circuit gives the first discriminator among three different safeguards. A train's axles shunt the rails, changing the circuit so the block reads occupied; broken wires or lost power should also drive the system toward danger. If the logs preserve an occupied indication while a signal still clears, detection was not the primary failure. If occupancy vanishes despite a train on the rails, the track-circuit hypothesis becomes much stronger.",
      "frame": "Tests a relay at The Signalling Control Centre. \"Use William Robinson to show how the railway proves a route before displaying clear.\"",
      "q": [
        {
          "q": "Which railway-signalling account best describes William Robinson's contribution to the closed track circuit?",
          "o": [
            {
              "t": "William Robinson invented the closed track circuit, using a train's wheels and axles to shunt current between the rails. The railway dossier carries the dated fail-safe maintenance history. Rail fits.",
              "v": "expert",
              "fb": "Correct: this response links the signalling device with separation, interlocking, and fail-safe authority."
            },
            {
              "t": "William Robinson's rail work emphasizes the panel indication and printed timetable. Temporary working can seem routine. Rail practice makes the rail view plausible. Rail timing supports this rail claim.",
              "v": "partial",
              "fb": "This covers one signalling element but leaves route locking or train detection unresolved."
            },
            {
              "t": "William Robinson's rail work is read within rail practice as support for a timetable and signal aspect as sufficient authority without the complete interlocking chain. Rail records fit this rail account.",
              "v": "wrong",
              "fb": "That explanation assigns the device a function it did not provide or confuses schedule with authority."
            },
            {
              "t": "William Robinson's authority is invoked in rail practice to justify keeping a temporary interlock bypass after several uneventful train movements. The panel sequence appears consistent. Rail fits.",
              "v": "danger",
              "fb": "That shortcut restores movement by removing the barrier meant to prevent incompatible train paths."
            }
          ]
        },
        {
          "q": "Which fail-safe signalling rule does this contribution support?",
          "o": [
            {
              "t": "Track circuits are fail-safe when loss of current is interpreted as occupied or faulty rather than as permission to proceed. The railway dossier carries the route log. Rail fits.",
              "v": "expert",
              "fb": "Correct: this response links the signalling device with separation, interlocking, and fail-safe authority."
            },
            {
              "t": "Accept one clear panel indication while treating point position, occupancy, and brake protection as secondary confirmations. The panel sequence appears consistent. Rail context matters.",
              "v": "partial",
              "fb": "This covers one signalling element but leaves route locking or train detection unresolved."
            },
            {
              "t": "Assume signal and braking behavior remain safe when power, wire continuity, detection, or communication is degraded. Rail records fit this rail account. Rail timing supports this rail claim.",
              "v": "wrong",
              "fb": "That explanation assigns the device a function it did not provide or confuses schedule with authority."
            },
            {
              "t": "Clear the route under temporary working after removing the device that ordinarily prevents conflicting movement. Rail records fit this rail account. Rail timing supports this rail claim.",
              "v": "danger",
              "fb": "That shortcut restores movement by removing the barrier meant to prevent incompatible train paths."
            }
          ]
        },
        {
          "q": "What railway operating lesson should remain after this history?",
          "o": [
            {
              "t": "Cover knowledge means separating a driver's action from the authority and protection presented to the cab. Signal aspects, data logs, route state, braking, and interlock condition belong in one reconstruction. Rail fits. Rail fits.",
              "v": "expert",
              "fb": "Correct: this response links the signalling device with separation, interlocking, and fail-safe authority."
            },
            {
              "t": "Separate temporary-working records from the movement log once the line has returned to normal service. The panel sequence appears consistent. Rail practice makes the rail view plausible. Rail timing supports this rail claim.",
              "v": "partial",
              "fb": "This covers one signalling element but leaves route locking or train detection unresolved."
            },
            {
              "t": "Place primary weight on sabotage or driver error while giving less attention to permissive infrastructure behavior. Rail records fit this rail account. Rail context supports the view. Rail timing supports this rail claim. Rail fits.",
              "v": "wrong",
              "fb": "That explanation assigns the device a function it did not provide or confuses schedule with authority."
            },
            {
              "t": "Reopen the line with the temporary strap retained after one uneventful test movement. Rail records fit this rail account. Rail context supports the view. Rail practice makes the rail view plausible. Rail timing supports this rail claim.",
              "v": "danger",
              "fb": "That shortcut restores movement by removing the barrier meant to prevent incompatible train paths."
            }
          ]
        }
      ]
    },
    "rx_raven": {
      "sci": "Vincent Raven (1859-1934)",
      "topic": "Early automatic train control",
      "lede": "Vincent Raven's work on early automatic train control strengthened the fail-safe chain between track and driver.",
      "no": 5,
      "profile": "The railway-systems note for today traces Vincent Raven through early automatic train control. Vincent Raven oversaw early automatic train-control trials on the North Eastern Railway. Track equipment communicated a signal condition to the locomotive, where warnings or brake application could intervene. That development turned train position, route, braking, or communication into a controlled condition rather than an assumption made from the timetable.\n\nCab warning adds a barrier between a missed lineside signal and collision, but it depends on maintained track and onboard equipment. A bypass may restore traffic while quietly removing the condition that made the route safe. Temporary arrangements therefore need explicit limits, independent protection, testing, logging, and a defined return to normal equipment. A signalling explanation should identify detection, movement authority, route locking, braking response, failure state, and the evidence presented to the driver or signaller.\n\nRailway signalling separates heavy vehicles that cannot steer and may need a long distance to stop. Safe movement depends on detection, route locking, movement authority, braking, communication, and a restrictive response to missing information. Interlocking prevents conflicting routes and incompatible commands. Track circuits, axle counters, point detection, crossing controls, block instruments, and train protection each convert physical state into permission or prohibition. The railway chronology should join panel logs, track detection, point tests, crossing state, temporary straps, notices, maintenance deferrals, and train movements.\n\nAutomatic train control belongs downstream of signalling. Its purpose is to warn or brake when a train passes, approaches, or exceeds the speed allowed by a restrictive indication. It cannot infer that a green signal should have been red when the route logic itself has authorized green. Event-recorder data showing a permissive aspect and normal response therefore weaken the train-stop hypothesis; a restrictive aspect followed by no enforcement would support it.",
      "frame": "Sets a block instrument at danger in The Signalling Control Centre. \"Start with Vincent Raven; keep movement authority separate from schedule.\"",
      "q": [
        {
          "q": "Which railway-signalling account best describes Vincent Raven's contribution to early automatic train control?",
          "o": [
            {
              "t": "Vincent Raven oversaw early automatic train-control trials on the North Eastern Railway. Interlock evidence ties the dated interlock-linked detection record to movement authority. Rail fits.",
              "v": "expert",
              "fb": "Correct: this response links the signalling device with separation, interlocking, and fail-safe authority."
            },
            {
              "t": "Vincent Raven's rail work relies on the panel indication and printed timetable. Rail records fit this rail account. Rail practice makes the rail view plausible. Rail timing supports this rail claim.",
              "v": "partial",
              "fb": "This covers one signalling element but leaves route locking or train detection unresolved."
            },
            {
              "t": "Vincent Raven's rail work supports a timetable and signal aspect as sufficient authority without the complete interlocking chain. The panel sequence appears consistent. Rail fits. Rail fits.",
              "v": "wrong",
              "fb": "That explanation assigns the device a function it did not provide or confuses schedule with authority."
            },
            {
              "t": "Vincent Raven's authority is invoked in rail practice to justify keeping a temporary interlock bypass after several uneventful train movements. Rail timing supports this rail claim. Rail fits.",
              "v": "danger",
              "fb": "That shortcut restores movement by removing the barrier meant to prevent incompatible train paths."
            }
          ]
        },
        {
          "q": "Which fail-safe signalling rule does this contribution support?",
          "o": [
            {
              "t": "Cab warning adds a barrier between a missed lineside signal and collision, but it depends on maintained track and onboard equipment. The railway dossier carries the route log.",
              "v": "expert",
              "fb": "Correct: this response links the signalling device with separation, interlocking, and fail-safe authority."
            },
            {
              "t": "Accept one clear panel indication while treating point position, occupancy, and brake protection as secondary confirmations. The panel sequence appears consistent. The rail record fits.",
              "v": "partial",
              "fb": "This covers one signalling element but leaves route locking or train detection unresolved."
            },
            {
              "t": "Assume signal and braking behavior remain safe when power, wire continuity, detection, or communication is degraded. Rail context supports the view. Rail timing supports this rail claim.",
              "v": "wrong",
              "fb": "That explanation assigns the device a function it did not provide or confuses schedule with authority."
            },
            {
              "t": "Clear the route under temporary working after removing the device that ordinarily prevents conflicting movement. Rail records fit this rail account. Rail timing supports this rail claim.",
              "v": "danger",
              "fb": "That shortcut restores movement by removing the barrier meant to prevent incompatible train paths."
            }
          ]
        },
        {
          "q": "What railway operating lesson should remain after this history?",
          "o": [
            {
              "t": "A useful infrastructure record links signal failures, point tests, crossing alarms, temporary straps, operating notices, maintenance deferrals, and train movements. The chronology often reveals normalization of a known defect. Rail fits.",
              "v": "expert",
              "fb": "Correct: this response links the signalling device with separation, interlocking, and fail-safe authority."
            },
            {
              "t": "Separate temporary-working records from the movement log once the line has returned to normal service. The visible driver action fits. Rail records fit this rail account. Rail context supports the view. Rail timing supports this rail claim.",
              "v": "partial",
              "fb": "This covers one signalling element but leaves route locking or train detection unresolved."
            },
            {
              "t": "Place primary weight on sabotage or driver error while giving less attention to permissive infrastructure behavior. The panel sequence appears consistent. Temporary working can seem routine. Rail practice makes the rail view plausible.",
              "v": "wrong",
              "fb": "That explanation assigns the device a function it did not provide or confuses schedule with authority."
            },
            {
              "t": "Reopen the line with the temporary strap retained after one uneventful test movement. The panel sequence appears consistent. The timetable supports the account. Temporary working can seem routine. Rail practice makes the rail view plausible.",
              "v": "danger",
              "fb": "That shortcut restores movement by removing the barrier meant to prevent incompatible train paths."
            }
          ]
        }
      ]
    },
    "rx_raynar": {
      "sci": "H. Raynar Wilson (railway-signalling historian)",
      "topic": "Signalling principles & accident lessons",
      "lede": "Through signalling principles & accident lessons, H. Raynar Wilson converted railway movement from assumption into proved authority.",
      "no": 6,
      "profile": "The railway-systems note for today traces H. Raynar Wilson through signalling principles & accident lessons. H. Raynar Wilson documented railway signalling principles, apparatus, and lessons drawn from accidents. His historical and technical writing showed how block systems, interlocking, detection, and operating discipline evolved together. That development turned train position, route, braking, or communication into a controlled condition rather than an assumption made from the timetable.\n\nAccident reports matter when their lessons are translated into design rules, maintenance standards, and operating practice. Interlocking prevents conflicting routes and incompatible commands. Track circuits, axle counters, point detection, crossing controls, block instruments, and train protection each convert physical state into permission or prohibition. A signalling explanation should identify detection, movement authority, route locking, braking response, failure state, and the evidence presented to the driver or signaller.\n\nA bypass may restore traffic while quietly removing the condition that made the route safe. Temporary arrangements therefore need explicit limits, independent protection, testing, logging, and a defined return to normal equipment. Railway signalling separates heavy vehicles that cannot steer and may need a long distance to stop. Safe movement depends on detection, route locking, movement authority, braking, communication, and a restrictive response to missing information. The railway chronology should join panel logs, track detection, point tests, crossing state, temporary straps, notices, maintenance deferrals, and train movements.\n\nA useful infrastructure record links signal failures, point tests, crossing alarms, temporary straps, operating notices, maintenance deferrals, and train movements. The chronology often reveals normalization of a known defect. Cover knowledge means separating a driver's action from the authority and protection presented to the cab. Signal aspects, data logs, route state, braking, and interlock condition belong in one reconstruction. The fail-safe lesson is that loss of power, wire continuity, detection, or agreement should produce stop, occupied, or fault—not a permissive clear. Convenience must never reverse that logic.",
      "frame": "Points along the rails at The Signalling Control Centre. \"Explain signalling principles & accident lessons, including the state produced by a broken wire.\"",
      "q": [
        {
          "q": "Which railway-signalling account best describes H. Raynar Wilson's contribution to signalling principles & accident lessons?",
          "o": [
            {
              "t": "H. The railway dossier carries the maintenance history. The route-control archive stores the maintenance history. Signalling specialists compare the raw maintenance history with train movement.",
              "v": "expert",
              "fb": "Correct: this response links the signalling device with separation, interlocking, and fail-safe authority."
            },
            {
              "t": "H. Raynar Wilson's rail work emphasizes the panel indication and printed timetable. The timetable supports the account. Temporary working can seem routine. Rail practice makes the rail view plausible.",
              "v": "partial",
              "fb": "This covers one signalling element but leaves route locking or train detection unresolved."
            },
            {
              "t": "H. Raynar Wilson's rail work is read within rail practice as support for a timetable and signal aspect as sufficient authority without the complete interlocking chain. Rail timing supports this rail claim.",
              "v": "wrong",
              "fb": "That explanation assigns the device a function it did not provide or confuses schedule with authority."
            },
            {
              "t": "H. Raynar Wilson's rail authority supports keeping a temporary interlock bypass after several uneventful train movements. Temporary working can seem routine. Rail timing supports this rail claim.",
              "v": "danger",
              "fb": "That shortcut restores movement by removing the barrier meant to prevent incompatible train paths."
            }
          ]
        },
        {
          "q": "Which fail-safe signalling rule does this contribution support?",
          "o": [
            {
              "t": "Accident reports matter when their lessons are translated into design rules, maintenance standards, and operating practice. The route-control archive stores the raw signal trace. Rail fits.",
              "v": "expert",
              "fb": "Correct: this response links the signalling device with separation, interlocking, and fail-safe authority."
            },
            {
              "t": "Accept one clear panel indication while treating point position, occupancy, and brake protection as secondary confirmations. Rail records fit this rail account. Rail timing supports this rail claim.",
              "v": "partial",
              "fb": "This covers one signalling element but leaves route locking or train detection unresolved."
            },
            {
              "t": "Assume signal and braking behavior remain safe when power, wire continuity, detection, or communication is degraded. Rail practice makes the rail view plausible. Rail timing supports this rail claim.",
              "v": "wrong",
              "fb": "That explanation assigns the device a function it did not provide or confuses schedule with authority."
            },
            {
              "t": "Clear the route under temporary working after removing the device that ordinarily prevents conflicting movement. Rail context supports the view. Rail timing supports this rail claim. Rail fits.",
              "v": "danger",
              "fb": "That shortcut restores movement by removing the barrier meant to prevent incompatible train paths."
            }
          ]
        },
        {
          "q": "What railway operating lesson should remain after this history?",
          "o": [
            {
              "t": "The fail-safe lesson is that loss of power, wire continuity, detection, or agreement should produce stop, occupied, or fault—not a permissive clear. Convenience must never reverse that logic. Rail fits.",
              "v": "expert",
              "fb": "Correct: this response links the signalling device with separation, interlocking, and fail-safe authority."
            },
            {
              "t": "Separate temporary-working records from the movement log once the line has returned to normal service. Rail records fit this rail account. Rail context supports the view. Rail timing supports this rail claim.",
              "v": "partial",
              "fb": "This covers one signalling element but leaves route locking or train detection unresolved."
            },
            {
              "t": "Place primary weight on sabotage or driver error while giving less attention to permissive infrastructure behavior. The panel sequence appears consistent. Rail practice makes the rail view plausible.",
              "v": "wrong",
              "fb": "That explanation assigns the device a function it did not provide or confuses schedule with authority."
            },
            {
              "t": "Reopen the line with the temporary strap retained after one uneventful test movement. The panel sequence appears consistent. Temporary working can seem routine. Rail practice makes the rail view plausible.",
              "v": "danger",
              "fb": "That shortcut restores movement by removing the barrier meant to prevent incompatible train paths."
            }
          ]
        }
      ]
    },
    "rx_trevithick": {
      "sci": "Richard Trevithick (1771-1833)",
      "topic": "The first steam locomotive",
      "lede": "Richard Trevithick made the first steam locomotive part of the controlled logic separating trains.",
      "no": 7,
      "profile": "The railway-systems note for today traces Richard Trevithick through the first steam locomotive. Richard Trevithick built high-pressure steam engines and demonstrated an early steam locomotive in 1804. His machines proved that adhesion between smooth wheels and rails could move useful loads. That development turned train position, route, braking, or communication into a controlled condition rather than an assumption made from the timetable.\n\nGreater speed and power increase the distance needed for detection, authority, braking, and protection ahead of a train. Railway signalling separates heavy vehicles that cannot steer and may need a long distance to stop. Safe movement depends on detection, route locking, movement authority, braking, communication, and a restrictive response to missing information. A signalling explanation should identify detection, movement authority, route locking, braking response, failure state, and the evidence presented to the driver or signaller.\n\nInterlocking prevents conflicting routes and incompatible commands. Track circuits, axle counters, point detection, crossing controls, block instruments, and train protection each convert physical state into permission or prohibition. A bypass may restore traffic while quietly removing the condition that made the route safe. Temporary arrangements therefore need explicit limits, independent protection, testing, logging, and a defined return to normal equipment. The railway chronology should join panel logs, track detection, point tests, crossing state, temporary straps, notices, maintenance deferrals, and train movements.\n\nThe fail-safe lesson is that loss of power, wire continuity, detection, or agreement should produce stop, occupied, or fault—not a permissive clear. Convenience must never reverse that logic. A useful infrastructure record links signal failures, point tests, crossing alarms, temporary straps, operating notices, maintenance deferrals, and train movements. The chronology often reveals normalization of a known defect. Cover knowledge means separating a driver's action from the authority and protection presented to the cab. Signal aspects, data logs, route state, braking, and interlock condition belong in one reconstruction.",
      "frame": "Tests a relay at The Infrastructure Head Office. \"Use Richard Trevithick to show how the railway proves a route before displaying clear.\"",
      "q": [
        {
          "q": "Which railway-signalling account best describes Richard Trevithick's contribution to the first steam locomotive?",
          "o": [
            {
              "t": "Richard Trevithick built high-pressure steam engines and demonstrated an early steam locomotive in 1804. Interlock evidence ties the signal-room verified detection record to movement authority. Rail fits.",
              "v": "expert",
              "fb": "Correct: this response links the signalling device with separation, interlocking, and fail-safe authority."
            },
            {
              "t": "Richard Trevithick's rail work emphasizes the panel indication and printed timetable. The timetable supports the account. Temporary working can seem routine. Rail timing supports this rail claim.",
              "v": "partial",
              "fb": "This covers one signalling element but leaves route locking or train detection unresolved."
            },
            {
              "t": "Richard Trevithick's rail work is read within rail practice as support for a timetable and signal aspect as sufficient authority without the complete interlocking chain. Rail records fit this rail account.",
              "v": "wrong",
              "fb": "That explanation assigns the device a function it did not provide or confuses schedule with authority."
            },
            {
              "t": "Richard Trevithick's rail authority supports keeping a temporary interlock bypass after several uneventful train movements. Rail practice makes the rail view plausible. Rail timing supports this rail claim.",
              "v": "danger",
              "fb": "That shortcut restores movement by removing the barrier meant to prevent incompatible train paths."
            }
          ]
        },
        {
          "q": "Which fail-safe signalling rule does this contribution support?",
          "o": [
            {
              "t": "Greater speed and power increase the distance needed for detection, authority, braking, and protection ahead of a train. The railway dossier carries the signal trace. Rail fits. Rail fits.",
              "v": "expert",
              "fb": "Correct: this response links the signalling device with separation, interlocking, and fail-safe authority."
            },
            {
              "t": "Accept one clear panel indication while treating point position, occupancy, and brake protection as secondary confirmations. The panel sequence appears consistent. Rail context matters.",
              "v": "partial",
              "fb": "This covers one signalling element but leaves route locking or train detection unresolved."
            },
            {
              "t": "Assume signal and braking behavior remain safe when power, wire continuity, detection, or communication is degraded. Rail records fit this rail account. Rail timing supports this rail claim.",
              "v": "wrong",
              "fb": "That explanation assigns the device a function it did not provide or confuses schedule with authority."
            },
            {
              "t": "Clear the route under temporary working after removing the device that ordinarily prevents conflicting movement. Rail records fit this rail account. Rail timing supports this rail claim.",
              "v": "danger",
              "fb": "That shortcut restores movement by removing the barrier meant to prevent incompatible train paths."
            }
          ]
        },
        {
          "q": "What railway operating lesson should remain after this history?",
          "o": [
            {
              "t": "Cover knowledge means separating a driver's action from the authority and protection presented to the cab. Signal aspects, data logs, route state, braking, and interlock condition belong in one reconstruction. Rail fits. Rail fits.",
              "v": "expert",
              "fb": "Correct: this response links the signalling device with separation, interlocking, and fail-safe authority."
            },
            {
              "t": "Separate temporary-working records from the movement log once the line has returned to normal service. The panel sequence appears consistent. Rail practice makes the rail view plausible. Rail timing supports this rail claim.",
              "v": "partial",
              "fb": "This covers one signalling element but leaves route locking or train detection unresolved."
            },
            {
              "t": "Place primary weight on sabotage or driver error while giving less attention to permissive infrastructure behavior. Rail records fit this rail account. Rail context supports the view. Rail timing supports this rail claim. Rail fits.",
              "v": "wrong",
              "fb": "That explanation assigns the device a function it did not provide or confuses schedule with authority."
            },
            {
              "t": "Reopen the line with the temporary strap retained after one uneventful test movement. Rail records fit this rail account. Rail context supports the view. Rail practice makes the rail view plausible. Rail timing supports this rail claim.",
              "v": "danger",
              "fb": "That shortcut restores movement by removing the barrier meant to prevent incompatible train paths."
            }
          ]
        }
      ]
    },
    "rx_gooch": {
      "sci": "Daniel Gooch (1816-1889)",
      "topic": "Locomotive engineering & the broad gauge",
      "lede": "Daniel Gooch's work on locomotive engineering & the broad gauge strengthened the fail-safe chain between track and driver.",
      "no": 8,
      "profile": "The railway-systems note for today traces Daniel Gooch through locomotive engineering & the broad gauge. Daniel Gooch designed locomotives for the Great Western Railway and managed broad-gauge operations. His engineering improved speed and reliability while highlighting the network consequences of a chosen gauge. That development turned train position, route, braking, or communication into a controlled condition rather than an assumption made from the timetable.\n\nVehicle design, track standard, braking, and signalling interfaces must remain compatible across the railway. A bypass may restore traffic while quietly removing the condition that made the route safe. Temporary arrangements therefore need explicit limits, independent protection, testing, logging, and a defined return to normal equipment. A signalling explanation should identify detection, movement authority, route locking, braking response, failure state, and the evidence presented to the driver or signaller.\n\nRailway signalling separates heavy vehicles that cannot steer and may need a long distance to stop. Safe movement depends on detection, route locking, movement authority, braking, communication, and a restrictive response to missing information. Interlocking prevents conflicting routes and incompatible commands. Track circuits, axle counters, point detection, crossing controls, block instruments, and train protection each convert physical state into permission or prohibition. The railway chronology should join panel logs, track detection, point tests, crossing state, temporary straps, notices, maintenance deferrals, and train movements.\n\nCover knowledge means separating a driver's action from the authority and protection presented to the cab. Signal aspects, data logs, route state, braking, and interlock condition belong in one reconstruction. The fail-safe lesson is that loss of power, wire continuity, detection, or agreement should produce stop, occupied, or fault—not a permissive clear. Convenience must never reverse that logic. A useful infrastructure record links signal failures, point tests, crossing alarms, temporary straps, operating notices, maintenance deferrals, and train movements. The chronology often reveals normalization of a known defect.",
      "frame": "Sets a block instrument at danger in The Infrastructure Head Office. \"Start with Daniel Gooch; keep movement authority separate from schedule.\"",
      "q": [
        {
          "q": "Which railway-signalling account best describes Daniel Gooch's contribution to locomotive engineering & the broad gauge?",
          "o": [
            {
              "t": "Daniel Gooch designed locomotives for the Great Western Railway and managed broad-gauge operations. Interlock evidence ties the raw train-specific maintenance history to movement authority.",
              "v": "expert",
              "fb": "Correct: this response links the signalling device with separation, interlocking, and fail-safe authority."
            },
            {
              "t": "Daniel Gooch's rail work emphasizes the panel indication and printed timetable. The timetable supports the account. Temporary working can seem routine. Rail practice makes the rail view plausible.",
              "v": "partial",
              "fb": "This covers one signalling element but leaves route locking or train detection unresolved."
            },
            {
              "t": "Daniel Gooch's rail work is read within rail practice as support for a timetable and signal aspect as sufficient authority without the complete interlocking chain. Rail timing supports this rail claim.",
              "v": "wrong",
              "fb": "That explanation assigns the device a function it did not provide or confuses schedule with authority."
            },
            {
              "t": "Daniel Gooch's rail authority supports keeping a temporary interlock bypass after several uneventful train movements. Temporary working can seem routine. Rail timing supports this rail claim.",
              "v": "danger",
              "fb": "That shortcut restores movement by removing the barrier meant to prevent incompatible train paths."
            }
          ]
        },
        {
          "q": "Which fail-safe signalling rule does this contribution support?",
          "o": [
            {
              "t": "Vehicle design, track standard, braking, and signalling interfaces must remain compatible across the railway. The route-control archive stores the dated signal trace. Rail fits. Rail fits.",
              "v": "expert",
              "fb": "Correct: this response links the signalling device with separation, interlocking, and fail-safe authority."
            },
            {
              "t": "Accept one clear panel indication while treating point position, occupancy, and brake protection as secondary confirmations. The panel sequence appears consistent. Rail context matters.",
              "v": "partial",
              "fb": "This covers one signalling element but leaves route locking or train detection unresolved."
            },
            {
              "t": "Assume signal and braking behavior remain safe when power, wire continuity, detection, or communication is degraded. Rail records fit this rail account. Rail timing supports this rail claim.",
              "v": "wrong",
              "fb": "That explanation assigns the device a function it did not provide or confuses schedule with authority."
            },
            {
              "t": "Clear the route under temporary working after removing the device that ordinarily prevents conflicting movement. Rail records fit this rail account. Rail timing supports this rail claim.",
              "v": "danger",
              "fb": "That shortcut restores movement by removing the barrier meant to prevent incompatible train paths."
            }
          ]
        },
        {
          "q": "What railway operating lesson should remain after this history?",
          "o": [
            {
              "t": "A useful infrastructure record links signal failures, point tests, crossing alarms, temporary straps, operating notices, maintenance deferrals, and train movements. The chronology often reveals normalization of a known defect. Rail fits.",
              "v": "expert",
              "fb": "Correct: this response links the signalling device with separation, interlocking, and fail-safe authority."
            },
            {
              "t": "Separate temporary-working records from the movement log once the line has returned to normal service. The visible driver action fits. Rail records fit this rail account. Rail context supports the view. Rail timing supports this rail claim.",
              "v": "partial",
              "fb": "This covers one signalling element but leaves route locking or train detection unresolved."
            },
            {
              "t": "Place primary weight on sabotage or driver error while giving less attention to permissive infrastructure behavior. The panel sequence appears consistent. Temporary working can seem routine. Rail practice makes the rail view plausible.",
              "v": "wrong",
              "fb": "That explanation assigns the device a function it did not provide or confuses schedule with authority."
            },
            {
              "t": "Reopen the line with the temporary strap retained after one uneventful test movement. The panel sequence appears consistent. The timetable supports the account. Temporary working can seem routine. Rail practice makes the rail view plausible.",
              "v": "danger",
              "fb": "That shortcut restores movement by removing the barrier meant to prevent incompatible train paths."
            }
          ]
        }
      ]
    },
    "rx_bradshaw": {
      "sci": "George Bradshaw (1801-1853)",
      "topic": "The railway timetable & scheduling",
      "lede": "Through the railway timetable & scheduling, George Bradshaw converted railway movement from assumption into proved authority.",
      "no": 9,
      "profile": "The railway-systems note for today traces George Bradshaw through the railway timetable & scheduling. George Bradshaw published railway timetables and guides that organized the rapidly expanding network for travelers and operators. A timetable coordinates movements, connections, and expectations across many lines. That development turned train position, route, braking, or communication into a controlled condition rather than an assumption made from the timetable.\n\nA schedule is a plan, not movement authority; safe signalling must remain able to stop a late or unexpected train. Interlocking prevents conflicting routes and incompatible commands. Track circuits, axle counters, point detection, crossing controls, block instruments, and train protection each convert physical state into permission or prohibition. A signalling explanation should identify detection, movement authority, route locking, braking response, failure state, and the evidence presented to the driver or signaller.\n\nA bypass may restore traffic while quietly removing the condition that made the route safe. Temporary arrangements therefore need explicit limits, independent protection, testing, logging, and a defined return to normal equipment. Railway signalling separates heavy vehicles that cannot steer and may need a long distance to stop. Safe movement depends on detection, route locking, movement authority, braking, communication, and a restrictive response to missing information. The railway chronology should join panel logs, track detection, point tests, crossing state, temporary straps, notices, maintenance deferrals, and train movements.\n\nA useful infrastructure record links signal failures, point tests, crossing alarms, temporary straps, operating notices, maintenance deferrals, and train movements. The chronology often reveals normalization of a known defect. Cover knowledge means separating a driver's action from the authority and protection presented to the cab. Signal aspects, data logs, route state, braking, and interlock condition belong in one reconstruction. The fail-safe lesson is that loss of power, wire continuity, detection, or agreement should produce stop, occupied, or fault—not a permissive clear. Convenience must never reverse that logic.",
      "frame": "Points along the rails at The Infrastructure Head Office. \"Explain the railway timetable & scheduling, including the state produced by a broken wire.\"",
      "q": [
        {
          "q": "Which railway-signalling account best describes George Bradshaw's contribution to the railway timetable & scheduling?",
          "o": [
            {
              "t": "George Bradshaw published railway timetables and guides that organized the rapidly expanding network for travelers and operators. The route-control archive stores the dated signal trace. Fits.",
              "v": "expert",
              "fb": "Correct: this response links the signalling device with separation, interlocking, and fail-safe authority."
            },
            {
              "t": "George Bradshaw's rail work emphasizes the panel indication and printed timetable. Temporary working can seem routine. Rail context supports the view. Rail timing supports this rail claim. Fits.",
              "v": "partial",
              "fb": "This covers one signalling element but leaves route locking or train detection unresolved."
            },
            {
              "t": "George Bradshaw's rail work is read within rail practice as support for a timetable and signal aspect as sufficient authority without the complete interlocking chain. The timetable supports the account.",
              "v": "wrong",
              "fb": "That explanation assigns the device a function it did not provide or confuses schedule with authority."
            },
            {
              "t": "George Bradshaw's rail authority supports keeping a temporary interlock bypass after several uneventful train movements. Rail records fit this rail account. Rail timing supports this rail claim.",
              "v": "danger",
              "fb": "That shortcut restores movement by removing the barrier meant to prevent incompatible train paths."
            }
          ]
        },
        {
          "q": "Which fail-safe signalling rule does this contribution support?",
          "o": [
            {
              "t": "A schedule is a plan, not movement authority; safe signalling must remain able to stop a late or unexpected train. Fail-safe review keeps the raw route log available for testing. Rail fits.",
              "v": "expert",
              "fb": "Correct: this response links the signalling device with separation, interlocking, and fail-safe authority."
            },
            {
              "t": "Accept one clear panel indication while treating point position, occupancy, and brake protection as secondary confirmations. Rail records fit this rail account. Rail timing supports this rail claim.",
              "v": "partial",
              "fb": "This covers one signalling element but leaves route locking or train detection unresolved."
            },
            {
              "t": "Assume signal and braking behavior remain safe when power, wire continuity, detection, or communication is degraded. Rail practice makes the rail view plausible. Rail timing supports this rail claim.",
              "v": "wrong",
              "fb": "That explanation assigns the device a function it did not provide or confuses schedule with authority."
            },
            {
              "t": "Clear the route under temporary working after removing the device that ordinarily prevents conflicting movement. Rail context supports the view. Rail timing supports this rail claim. Rail fits.",
              "v": "danger",
              "fb": "That shortcut restores movement by removing the barrier meant to prevent incompatible train paths."
            }
          ]
        },
        {
          "q": "What railway operating lesson should remain after this history?",
          "o": [
            {
              "t": "The fail-safe lesson is that loss of power, wire continuity, detection, or agreement should produce stop, occupied, or fault—not a permissive clear. Convenience must never reverse that logic. Rail fits.",
              "v": "expert",
              "fb": "Correct: this response links the signalling device with separation, interlocking, and fail-safe authority."
            },
            {
              "t": "Separate temporary-working records from the movement log once the line has returned to normal service. Rail records fit this rail account. Rail context supports the view. Rail timing supports this rail claim.",
              "v": "partial",
              "fb": "This covers one signalling element but leaves route locking or train detection unresolved."
            },
            {
              "t": "Place primary weight on sabotage or driver error while giving less attention to permissive infrastructure behavior. The panel sequence appears consistent. Rail practice makes the rail view plausible.",
              "v": "wrong",
              "fb": "That explanation assigns the device a function it did not provide or confuses schedule with authority."
            },
            {
              "t": "Reopen the line with the temporary strap retained after one uneventful test movement. The panel sequence appears consistent. Temporary working can seem routine. Rail practice makes the rail view plausible.",
              "v": "danger",
              "fb": "That shortcut restores movement by removing the barrier meant to prevent incompatible train paths."
            }
          ]
        }
      ]
    }
  },
  "STORIES": {
    "rx_technician": {
      "rx_crossing": "Beside a tagged relay rack at The Crossing & Points, S&T Tech Mara Doss turns over a relay-tagged card. \"Signal history is exacting; answer from the day's scholar before I unlock the maintenance ledger.\"",
      "rx_signalbox": "Beside the route panel printout at The Signalling Control Centre, S&T Tech Mara Doss turns over a relay-tagged card. \"Signal history is exacting; answer from the day's scholar before I unlock the maintenance ledger.\"",
      "rx_office": "Beside a stack of fault cards at The Infrastructure Head Office, S&T Tech Mara Doss turns over a relay-tagged card. \"Signal history is exacting; answer from the day's scholar before I unlock the maintenance ledger.\""
    },
    "rx_signaller": {
      "rx_crossing": "Beside a tagged relay rack at The Crossing & Points, The Signaller turns over a relay-tagged card. \"The panel record stays closed until you show that the reading made sense.\"",
      "rx_signalbox": "Beside the route panel printout at The Signalling Control Centre, The Signaller turns over a relay-tagged card. \"The panel record stays closed until you show that the reading made sense.\"",
      "rx_office": "Beside a stack of fault cards at The Infrastructure Head Office, The Signaller turns over a relay-tagged card. \"The panel record stays closed until you show that the reading made sense.\""
    },
    "rx_clerk": {
      "rx_crossing": "Beside a tagged relay rack at The Crossing & Points, The Clerk turns over a relay-tagged card. \"First prove you followed today's railway pioneer; then the authorization file is yours.\"",
      "rx_signalbox": "Beside the route panel printout at The Signalling Control Centre, The Clerk turns over a relay-tagged card. \"First prove you followed today's railway pioneer; then the authorization file is yours.\"",
      "rx_office": "Beside a stack of fault cards at The Infrastructure Head Office, The Clerk turns over a relay-tagged card. \"First prove you followed today's railway pioneer; then the authorization file is yours.\""
    }
  },
  "story": [
    "<b>The Marsh Lane Crossing</b> opens inside the Marsh Lane crossing inquiry, where the visible damage is easier to describe than the chain that produced it.",
    "<b>S&T Tech Mara Doss</b>, <b>The Signaller</b>, and <b>The Clerk</b> each control a different slice of the record, and each conversation turns one real pioneer into a way of reading the case.",
    "Some witnesses are drawn toward <b>Track circuits failed to detect the occupied crossing.</b>; others settle too quickly on <b>Automatic train stop failed after a restrictive signal.</b>. Your job is to separate those tempting stories from the harder explanation the evidence supports.",
    "<b>You have 5 days.</b> Each conversation costs one day: choose a witness, test one <b>WHERE</b> and one <b>WHO</b>, read the dossier, and decide what the case is really about."
  ],
  "endings": {
    "overclaimWhat": "rx_sabotage",
    "dismissalWhat": "rx_driver",
    "win": {
      "expertTitle": "The Route That Should Not Clear",
      "expert": [
        "Investigator Glen Ashby names Perren Voss — signalling infrastructure manager, The Infrastructure Head Office, and Interlocking cleared a route across occupied track. Not Track circuits failed to detect the occupied crossing. Not Automatic train stop failed after a restrictive signal.",
        "The readings distinguish detection, enforcement, and interlocking: occupancy can be known, and a driver can obey, yet a bypassed route lock can still issue a permissive aspect."
      ],
      "soundTitle": "A Correct Signalling Judgment",
      "sound": [
        "Relay evidence fixes the trio: Perren Voss — signalling infrastructure manager; The Infrastructure Head Office; Interlocking cleared a route across occupied track.",
        "The relay logic interpretation is defensible, although the unfinished authorization chain still needs relay-level corroboration."
      ],
      "namedTitle": "Right System, Thin Record",
      "named": [
        "Relay evidence points to Perren Voss — signalling infrastructure manager, The Infrastructure Head Office, and Interlocking cleared a route across occupied track; relay support remains incomplete.",
        "Without the missing relay records, this correct route judgment remains too lightly documented for final publication."
      ]
    },
    "overclaim": {
      "title": "Detection Was Not the Whole Failure",
      "body": [
        "Investigator Glen Ashby chooses Track circuits failed to detect the occupied crossing. The relay hypothesis is respectable, but Robinson's discriminator points elsewhere.",
        "A failed track circuit would remove reliable occupancy detection, but the decisive records show the track state reached the system; the permissive route arose later in the logic chain."
      ]
    },
    "dismissal": {
      "title": "Enforcement Was Not the Missing Layer",
      "body": [
        "Investigator Glen Ashby instead chooses Automatic train stop failed after a restrictive signal. Train enforcement cannot repair a route already displayed as clear.",
        "Automatic train stop acts on a restrictive command already presented to the train. It cannot rescue a route that the interlocking has incorrectly declared clear."
      ]
    },
    "wrongNames": {
      "title": "The Mechanism, Misassigned",
      "body": [
        "The interlocking judgment is right, but the wrong person or place is attached to it. Rebuild the relay clue chain before issuing the final accusation."
      ]
    }
  },
  "emblem": "<svg viewBox=\"0 0 660 140\" role=\"img\" aria-label=\"A rail crossing with a descending gate\"><path d=\"M0 102 L660 102\" stroke=\"#121212\" stroke-width=\"1.6\"/><path d=\"M40 112 L160 40\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M92 112 L212 40\" stroke=\"#121212\" stroke-width=\"1.5\"/><path d=\"M330 36 L330 102\" stroke=\"#121212\" stroke-width=\"1.8\"/><path d=\"M330 46 L410 86\" stroke=\"#B3261E\" stroke-width=\"5\" stroke-linecap=\"round\"/><path d=\"M340 78 L446 78 L472 62 L552 62 L576 78 L630 78\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.6\"/><circle cx=\"370\" cy=\"82\" r=\"9\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.6\"/><circle cx=\"430\" cy=\"82\" r=\"9\" fill=\"none\" stroke=\"#121212\" stroke-width=\"1.6\"/><path d=\"M232 24 L232 102\" stroke=\"#e2e2d8\" stroke-width=\"1\" stroke-dasharray=\"4 5\"/><path d=\"M266 24 L266 102\" stroke=\"#e2e2d8\" stroke-width=\"1\" stroke-dasharray=\"4 5\"/></svg>"
}};
