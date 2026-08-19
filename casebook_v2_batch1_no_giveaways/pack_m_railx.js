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
  "boardNarr": "You have ${days} before your inquiry ends. A hop costs a day or two; each stop is one appointment. All three informants move throughout — travel to a location and choose whom to meet.",
  "placeNarr": "You have arrived. Choose one informant to keep an appointment with. A dossier from the Bureau will reach you on the way in.",
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
        "rx_wheatstone",
        "rx_cooke"
      ],
      "rx_signaller": [
        "rx_gregory",
        "rx_sykes"
      ],
      "rx_clerk": [
        "rx_tyer",
        "rx_hall"
      ]
    },
    "rx_signalbox": {
      "rx_technician": [
        "rx_robinson",
        "rx_welch"
      ],
      "rx_signaller": [
        "rx_raven",
        "rx_gresham"
      ],
      "rx_clerk": [
        "rx_raynar",
        "rx_fox"
      ]
    },
    "rx_office": {
      "rx_technician": [
        "rx_trevithick",
        "rx_locke"
      ],
      "rx_signaller": [
        "rx_gooch",
        "rx_stroudley"
      ],
      "rx_clerk": [
        "rx_bradshaw",
        "rx_ramsbottom"
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
      "frame": "S&T Tech Mara Doss tests a relay at The Crossing & Points. \"Use Charles Wheatstone to show how the railway proves a route before displaying clear.\"",
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
    "rx_cooke": {
      "sci": "William Fothergill Cooke (1806-1879)",
      "topic": "The block-telegraph system",
      "lede": "Through the block-telegraph system, William Fothergill Cooke converted railway movement from assumption into proved authority.",
      "no": 2,
      "profile": "The railway-systems note for today traces William Fothergill Cooke through the block-telegraph system. William Fothergill Cooke promoted and deployed electric telegraph systems on British railways, working with Charles Wheatstone on multi-needle instruments. Railway use proved that electrical communication could support block working. That development turned train position, route, braking, or communication into a controlled condition rather than an assumption made from the timetable.\n\nA block system is safe only when authority to admit a train is tied to confirmed clearance of the section. Interlocking prevents conflicting routes and incompatible commands. Track circuits, axle counters, point detection, crossing controls, block instruments, and train protection each convert physical state into permission or prohibition. A signalling explanation should identify detection, movement authority, route locking, braking response, failure state, and the evidence presented to the driver or signaller.\n\nA bypass may restore traffic while quietly removing the condition that made the route safe. Temporary arrangements therefore need explicit limits, independent protection, testing, logging, and a defined return to normal equipment. Railway signalling separates heavy vehicles that cannot steer and may need a long distance to stop. Safe movement depends on detection, route locking, movement authority, braking, communication, and a restrictive response to missing information. The railway chronology should join panel logs, track detection, point tests, crossing state, temporary straps, notices, maintenance deferrals, and train movements.\n\nA useful infrastructure record links signal failures, point tests, crossing alarms, temporary straps, operating notices, maintenance deferrals, and train movements. The chronology often reveals normalization of a known defect. Cover knowledge means separating a driver's action from the authority and protection presented to the cab. Signal aspects, data logs, route state, braking, and interlock condition belong in one reconstruction. The fail-safe lesson is that loss of power, wire continuity, detection, or agreement should produce stop, occupied, or fault—not a permissive clear. Convenience must never reverse that logic.",
      "frame": "S&T Tech Mara Doss points along the rails at The Crossing & Points. \"Explain the block-telegraph system, including the state produced by a broken wire.\"",
      "q": [
        {
          "q": "Which railway-signalling account best describes William Fothergill Cooke's contribution to the block-telegraph system?",
          "o": [
            {
              "t": "William Fothergill Cooke promoted and deployed electric telegraph systems on British railways, working with Charles Wheatstone on multi-needle instruments. The railway dossier carries the route log. Fits.",
              "v": "expert",
              "fb": "Correct: this response links the signalling device with separation, interlocking, and fail-safe authority."
            },
            {
              "t": "William Fothergill Cooke's rail work emphasizes the panel indication and printed timetable. The panel sequence appears consistent. Rail context supports the view. Rail timing supports this rail claim.",
              "v": "partial",
              "fb": "This covers one signalling element but leaves route locking or train detection unresolved."
            },
            {
              "t": "William Fothergill Cooke's rail work is read within rail practice as support for a timetable and signal aspect as sufficient authority without the complete interlocking chain. Rail records fit this rail account.",
              "v": "wrong",
              "fb": "That explanation assigns the device a function it did not provide or confuses schedule with authority."
            },
            {
              "t": "William Fothergill Cooke's authority is invoked in rail practice to justify keeping a temporary interlock bypass after several uneventful train movements. The panel sequence appears consistent. Rail fits.",
              "v": "danger",
              "fb": "That shortcut restores movement by removing the barrier meant to prevent incompatible train paths."
            }
          ]
        },
        {
          "q": "Which fail-safe signalling rule does this contribution support?",
          "o": [
            {
              "t": "A block system is safe only when authority to admit a train is tied to confirmed clearance of the section. Interlock evidence ties the raw detection record to movement authority. Rail fits.",
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
    "rx_gregory": {
      "sci": "Charles Hutton Gregory (1817-1898)",
      "topic": "The semaphore railway signal",
      "lede": "Charles Hutton Gregory's work on the semaphore railway signal strengthened the fail-safe chain between track and driver.",
      "no": 3,
      "profile": "The railway-systems note for today traces Charles Hutton Gregory through the semaphore railway signal. Charles Hutton Gregory introduced an influential semaphore signal on the London and Croydon Railway. A movable arm gave drivers a distinct daytime indication that could be paired with lamps for darkness. That development turned train position, route, braking, or communication into a controlled condition rather than an assumption made from the timetable.\n\nA signal must be conspicuous, unambiguous, correctly positioned, and fail toward the restrictive state when its mechanism breaks. A bypass may restore traffic while quietly removing the condition that made the route safe. Temporary arrangements therefore need explicit limits, independent protection, testing, logging, and a defined return to normal equipment. A signalling explanation should identify detection, movement authority, route locking, braking response, failure state, and the evidence presented to the driver or signaller.\n\nRailway signalling separates heavy vehicles that cannot steer and may need a long distance to stop. Safe movement depends on detection, route locking, movement authority, braking, communication, and a restrictive response to missing information. Interlocking prevents conflicting routes and incompatible commands. Track circuits, axle counters, point detection, crossing controls, block instruments, and train protection each convert physical state into permission or prohibition. The railway chronology should join panel logs, track detection, point tests, crossing state, temporary straps, notices, maintenance deferrals, and train movements.\n\nCover knowledge means separating a driver's action from the authority and protection presented to the cab. Signal aspects, data logs, route state, braking, and interlock condition belong in one reconstruction. The fail-safe lesson is that loss of power, wire continuity, detection, or agreement should produce stop, occupied, or fault—not a permissive clear. Convenience must never reverse that logic. A useful infrastructure record links signal failures, point tests, crossing alarms, temporary straps, operating notices, maintenance deferrals, and train movements. The chronology often reveals normalization of a known defect.",
      "frame": "The Signaller sets a block instrument at danger in The Crossing & Points. \"Start with Charles Hutton Gregory; keep movement authority separate from schedule.\"",
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
    "rx_sykes": {
      "sci": "William Robert Sykes (1840-1917)",
      "topic": "Lock-and-block interlocking",
      "lede": "William Robert Sykes made lock-and-block interlocking part of the controlled logic separating trains.",
      "no": 4,
      "profile": "The railway-systems note for today traces William Robert Sykes through lock-and-block interlocking. William Robert Sykes developed lock-and-block equipment that electrically linked block instruments with signals. The arrangement prevented a signal from being cleared unless the block conditions permitted it. That development turned train position, route, braking, or communication into a controlled condition rather than an assumption made from the timetable.\n\nInterlocking is valuable because it makes an unsafe sequence physically or electrically difficult, rather than merely forbidden by rule. Railway signalling separates heavy vehicles that cannot steer and may need a long distance to stop. Safe movement depends on detection, route locking, movement authority, braking, communication, and a restrictive response to missing information. A signalling explanation should identify detection, movement authority, route locking, braking response, failure state, and the evidence presented to the driver or signaller.\n\nInterlocking prevents conflicting routes and incompatible commands. Track circuits, axle counters, point detection, crossing controls, block instruments, and train protection each convert physical state into permission or prohibition. A bypass may restore traffic while quietly removing the condition that made the route safe. Temporary arrangements therefore need explicit limits, independent protection, testing, logging, and a defined return to normal equipment. The railway chronology should join panel logs, track detection, point tests, crossing state, temporary straps, notices, maintenance deferrals, and train movements.\n\nSykes's lock-and-block principle separates route authorization from mere detection. Interlocking should make conflicting states physically or electrically impossible: occupied track, unsafe points, or an open crossing must prevent a clear signal. A temporary strap that bypasses one proving contact can preserve apparently normal indications while defeating that prohibition. The decisive signature is not simply a missing train or a disobedient driver, but a clear route granted despite an incompatible state.",
      "frame": "The Signaller tests a relay at The Crossing & Points. \"Use William Robert Sykes to show how the railway proves a route before displaying clear.\"",
      "q": [
        {
          "q": "Which railway-signalling account best describes William Robert Sykes's contribution to lock-and-block interlocking?",
          "o": [
            {
              "t": "William Robert Sykes developed lock-and-block equipment that electrically linked block instruments with signals. Interlock evidence ties the dated interlock-linked route log to movement authority. Rail fits.",
              "v": "expert",
              "fb": "Correct: this response links the signalling device with separation, interlocking, and fail-safe authority."
            },
            {
              "t": "William Robert Sykes's rail work emphasizes the panel indication and printed timetable. The panel sequence appears consistent. Rail practice makes the rail view plausible. Rail timing supports this rail claim.",
              "v": "partial",
              "fb": "This covers one signalling element but leaves route locking or train detection unresolved."
            },
            {
              "t": "William Robert Sykes's rail work is read within rail practice as support for a timetable and signal aspect as sufficient authority without the complete interlocking chain. Rail records fit this rail account.",
              "v": "wrong",
              "fb": "That explanation assigns the device a function it did not provide or confuses schedule with authority."
            },
            {
              "t": "William Robert Sykes's rail authority supports keeping a temporary interlock bypass after several uneventful train movements. Rail practice makes the rail view plausible. Rail timing supports this rail claim.",
              "v": "danger",
              "fb": "That shortcut restores movement by removing the barrier meant to prevent incompatible train paths."
            }
          ]
        },
        {
          "q": "Which fail-safe signalling rule does this contribution support?",
          "o": [
            {
              "t": "Interlocking is valuable because it makes an unsafe sequence physically or electrically difficult, rather than merely forbidden by rule. The railway dossier carries the route log. Rail fits.",
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
              "t": "Clear the route under temporary working after removing the device that ordinarily prevents conflicting movement. Rail practice makes the rail view plausible. Rail timing supports this rail claim.",
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
    "rx_tyer": {
      "sci": "Edward Tyer (1830-1912)",
      "topic": "The single-line token & tablet",
      "lede": "Through the single-line token & tablet, Edward Tyer converted railway movement from assumption into proved authority.",
      "no": 5,
      "profile": "The railway-systems note for today traces Edward Tyer through the single-line token & tablet. Edward Tyer developed tablet and token instruments for single-line railways. The system ensured that only one authority token for a section could be released at a time. That development turned train position, route, braking, or communication into a controlled condition rather than an assumption made from the timetable.\n\nExclusive possession of a token converts an abstract movement authority into a controlled physical object that cannot be duplicated casually. Interlocking prevents conflicting routes and incompatible commands. Track circuits, axle counters, point detection, crossing controls, block instruments, and train protection each convert physical state into permission or prohibition. A signalling explanation should identify detection, movement authority, route locking, braking response, failure state, and the evidence presented to the driver or signaller.\n\nA bypass may restore traffic while quietly removing the condition that made the route safe. Temporary arrangements therefore need explicit limits, independent protection, testing, logging, and a defined return to normal equipment. Railway signalling separates heavy vehicles that cannot steer and may need a long distance to stop. Safe movement depends on detection, route locking, movement authority, braking, communication, and a restrictive response to missing information. The railway chronology should join panel logs, track detection, point tests, crossing state, temporary straps, notices, maintenance deferrals, and train movements.\n\nA useful infrastructure record links signal failures, point tests, crossing alarms, temporary straps, operating notices, maintenance deferrals, and train movements. The chronology often reveals normalization of a known defect. Cover knowledge means separating a driver's action from the authority and protection presented to the cab. Signal aspects, data logs, route state, braking, and interlock condition belong in one reconstruction. The fail-safe lesson is that loss of power, wire continuity, detection, or agreement should produce stop, occupied, or fault—not a permissive clear. Convenience must never reverse that logic.",
      "frame": "The Clerk points along the rails at The Crossing & Points. \"Explain the single-line token & tablet, including the state produced by a broken wire.\"",
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
    "rx_hall": {
      "sci": "Thomas S. Hall (1827-1880)",
      "topic": "Automatic signalling",
      "lede": "Thomas S. Hall's work on automatic signalling strengthened the fail-safe chain between track and driver.",
      "no": 6,
      "profile": "The railway-systems note for today traces Thomas S. Hall through automatic signalling. Thomas S. Hall developed early automatic railway signalling using track-based detection to control indications as trains occupied and cleared sections. His systems helped reduce reliance on continuous manual observation. That development turned train position, route, braking, or communication into a controlled condition rather than an assumption made from the timetable.\n\nAutomatic detection must be designed so a broken circuit or missing input produces danger, not a false clear. A bypass may restore traffic while quietly removing the condition that made the route safe. Temporary arrangements therefore need explicit limits, independent protection, testing, logging, and a defined return to normal equipment. A signalling explanation should identify detection, movement authority, route locking, braking response, failure state, and the evidence presented to the driver or signaller.\n\nRailway signalling separates heavy vehicles that cannot steer and may need a long distance to stop. Safe movement depends on detection, route locking, movement authority, braking, communication, and a restrictive response to missing information. Interlocking prevents conflicting routes and incompatible commands. Track circuits, axle counters, point detection, crossing controls, block instruments, and train protection each convert physical state into permission or prohibition. The railway chronology should join panel logs, track detection, point tests, crossing state, temporary straps, notices, maintenance deferrals, and train movements.\n\nCover knowledge means separating a driver's action from the authority and protection presented to the cab. Signal aspects, data logs, route state, braking, and interlock condition belong in one reconstruction. The fail-safe lesson is that loss of power, wire continuity, detection, or agreement should produce stop, occupied, or fault—not a permissive clear. Convenience must never reverse that logic. A useful infrastructure record links signal failures, point tests, crossing alarms, temporary straps, operating notices, maintenance deferrals, and train movements. The chronology often reveals normalization of a known defect.",
      "frame": "The Clerk sets a block instrument at danger in The Crossing & Points. \"Start with Thomas S. Hall; keep movement authority separate from schedule.\"",
      "q": [
        {
          "q": "Which railway-signalling account best describes Thomas S. Hall's contribution to automatic signalling?",
          "o": [
            {
              "t": "Thomas S. Interlock evidence ties the signal trace to movement authority. The railway dossier carries the signal trace. The railway dossier carries the dated signal trace. Rail fits.",
              "v": "expert",
              "fb": "Correct: this response links the signalling device with separation, interlocking, and fail-safe authority."
            },
            {
              "t": "Thomas S. Hall's rail work relies on the panel indication and printed timetable. Rail records fit this rail account. Rail context supports the view. The timetable supports the account.",
              "v": "partial",
              "fb": "This covers one signalling element but leaves route locking or train detection unresolved."
            },
            {
              "t": "Thomas S. Hall's rail work supports a timetable and signal aspect as sufficient authority without the complete interlocking chain. Temporary working can seem routine. The rail record fits.",
              "v": "wrong",
              "fb": "That explanation assigns the device a function it did not provide or confuses schedule with authority."
            },
            {
              "t": "Thomas S. Hall's authority is invoked in rail practice to justify keeping a temporary interlock bypass after several uneventful train movements. The panel sequence appears consistent.",
              "v": "danger",
              "fb": "That shortcut restores movement by removing the barrier meant to prevent incompatible train paths."
            }
          ]
        },
        {
          "q": "Which fail-safe signalling rule does this contribution support?",
          "o": [
            {
              "t": "Automatic detection must be designed so a broken circuit or missing input produces danger, not a false clear. The route-control archive stores the dated signal trace. Rail fits. Rail fits.",
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
    "rx_robinson": {
      "sci": "William Robinson (1840-1921)",
      "topic": "The closed track circuit",
      "lede": "William Robinson made the closed track circuit part of the controlled logic separating trains.",
      "no": 7,
      "profile": "The railway-systems note for today traces William Robinson through the closed track circuit. William Robinson invented the closed track circuit, using a train's wheels and axles to shunt current between the rails. The circuit could automatically detect occupancy and return signals to danger. That development turned train position, route, braking, or communication into a controlled condition rather than an assumption made from the timetable.\n\nTrack circuits are fail-safe when loss of current is interpreted as occupied or faulty rather than as permission to proceed. Railway signalling separates heavy vehicles that cannot steer and may need a long distance to stop. Safe movement depends on detection, route locking, movement authority, braking, communication, and a restrictive response to missing information. A signalling explanation should identify detection, movement authority, route locking, braking response, failure state, and the evidence presented to the driver or signaller.\n\nInterlocking prevents conflicting routes and incompatible commands. Track circuits, axle counters, point detection, crossing controls, block instruments, and train protection each convert physical state into permission or prohibition. A bypass may restore traffic while quietly removing the condition that made the route safe. Temporary arrangements therefore need explicit limits, independent protection, testing, logging, and a defined return to normal equipment. The railway chronology should join panel logs, track detection, point tests, crossing state, temporary straps, notices, maintenance deferrals, and train movements.\n\nRobinson's track circuit gives the first discriminator among three different safeguards. A train's axles shunt the rails, changing the circuit so the block reads occupied; broken wires or lost power should also drive the system toward danger. If the logs preserve an occupied indication while a signal still clears, detection was not the primary failure. If occupancy vanishes despite a train on the rails, the track-circuit hypothesis becomes much stronger.",
      "frame": "S&T Tech Mara Doss tests a relay at The Signalling Control Centre. \"Use William Robinson to show how the railway proves a route before displaying clear.\"",
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
    "rx_welch": {
      "sci": "Ashbel Welch (1809-1882)",
      "topic": "The manual block system",
      "lede": "Through the manual block system, Ashbel Welch converted railway movement from assumption into proved authority.",
      "no": 8,
      "profile": "The railway-systems note for today traces Ashbel Welch through the manual block system. Ashbel Welch advocated disciplined manual block working in the United States, separating trains by controlled sections and telegraphic communication. He emphasized operating rules alongside engineering improvements. That development turned train position, route, braking, or communication into a controlled condition rather than an assumption made from the timetable.\n\nProcedural separation works only when messages are standardized, recorded, acknowledged, and never overridden by schedule pressure. Interlocking prevents conflicting routes and incompatible commands. Track circuits, axle counters, point detection, crossing controls, block instruments, and train protection each convert physical state into permission or prohibition. A signalling explanation should identify detection, movement authority, route locking, braking response, failure state, and the evidence presented to the driver or signaller.\n\nA bypass may restore traffic while quietly removing the condition that made the route safe. Temporary arrangements therefore need explicit limits, independent protection, testing, logging, and a defined return to normal equipment. Railway signalling separates heavy vehicles that cannot steer and may need a long distance to stop. Safe movement depends on detection, route locking, movement authority, braking, communication, and a restrictive response to missing information. The railway chronology should join panel logs, track detection, point tests, crossing state, temporary straps, notices, maintenance deferrals, and train movements.\n\nA useful infrastructure record links signal failures, point tests, crossing alarms, temporary straps, operating notices, maintenance deferrals, and train movements. The chronology often reveals normalization of a known defect. Cover knowledge means separating a driver's action from the authority and protection presented to the cab. Signal aspects, data logs, route state, braking, and interlock condition belong in one reconstruction. The fail-safe lesson is that loss of power, wire continuity, detection, or agreement should produce stop, occupied, or fault—not a permissive clear. Convenience must never reverse that logic.",
      "frame": "S&T Tech Mara Doss points along the rails at The Signalling Control Centre. \"Explain the manual block system, including the state produced by a broken wire.\"",
      "q": [
        {
          "q": "Which railway-signalling account best describes Ashbel Welch's contribution to the manual block system?",
          "o": [
            {
              "t": "Ashbel Welch advocated disciplined manual block working in the United States, separating trains by controlled sections and telegraphic communication. The route-control archive stores the dated route log. Rail fits.",
              "v": "expert",
              "fb": "Correct: this response links the signalling device with separation, interlocking, and fail-safe authority."
            },
            {
              "t": "Ashbel Welch's rail work relies on the panel indication and printed timetable. The visible driver action fits. Rail records fit this rail account. Rail context supports the view. The panel sequence appears consistent.",
              "v": "partial",
              "fb": "This covers one signalling element but leaves route locking or train detection unresolved."
            },
            {
              "t": "Ashbel Welch's rail work supports a timetable and signal aspect as sufficient authority without the complete interlocking chain. The panel sequence appears consistent. Rail timing supports this rail claim.",
              "v": "wrong",
              "fb": "That explanation assigns the device a function it did not provide or confuses schedule with authority."
            },
            {
              "t": "Ashbel Welch's rail authority supports keeping a temporary interlock bypass after several uneventful train movements. The panel sequence appears consistent. Temporary working can seem routine. The rail record fits.",
              "v": "danger",
              "fb": "That shortcut restores movement by removing the barrier meant to prevent incompatible train paths."
            }
          ]
        },
        {
          "q": "Which fail-safe signalling rule does this contribution support?",
          "o": [
            {
              "t": "Procedural separation works only when messages are standardized, recorded, acknowledged, and never overridden by schedule pressure. The railway dossier carries the raw route log. Rail fits.",
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
    "rx_raven": {
      "sci": "Vincent Raven (1859-1934)",
      "topic": "Early automatic train control",
      "lede": "Vincent Raven's work on early automatic train control strengthened the fail-safe chain between track and driver.",
      "no": 9,
      "profile": "The railway-systems note for today traces Vincent Raven through early automatic train control. Vincent Raven oversaw early automatic train-control trials on the North Eastern Railway. Track equipment communicated a signal condition to the locomotive, where warnings or brake application could intervene. That development turned train position, route, braking, or communication into a controlled condition rather than an assumption made from the timetable.\n\nCab warning adds a barrier between a missed lineside signal and collision, but it depends on maintained track and onboard equipment. A bypass may restore traffic while quietly removing the condition that made the route safe. Temporary arrangements therefore need explicit limits, independent protection, testing, logging, and a defined return to normal equipment. A signalling explanation should identify detection, movement authority, route locking, braking response, failure state, and the evidence presented to the driver or signaller.\n\nRailway signalling separates heavy vehicles that cannot steer and may need a long distance to stop. Safe movement depends on detection, route locking, movement authority, braking, communication, and a restrictive response to missing information. Interlocking prevents conflicting routes and incompatible commands. Track circuits, axle counters, point detection, crossing controls, block instruments, and train protection each convert physical state into permission or prohibition. The railway chronology should join panel logs, track detection, point tests, crossing state, temporary straps, notices, maintenance deferrals, and train movements.\n\nAutomatic train control belongs downstream of signalling. Its purpose is to warn or brake when a train passes, approaches, or exceeds the speed allowed by a restrictive indication. It cannot infer that a green signal should have been red when the route logic itself has authorized green. Event-recorder data showing a permissive aspect and normal response therefore weaken the train-stop hypothesis; a restrictive aspect followed by no enforcement would support it.",
      "frame": "The Signaller sets a block instrument at danger in The Signalling Control Centre. \"Start with Vincent Raven; keep movement authority separate from schedule.\"",
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
    "rx_gresham": {
      "sci": "James Gresham (1836-1914)",
      "topic": "The automatic vacuum brake",
      "lede": "James Gresham made the automatic vacuum brake part of the controlled logic separating trains.",
      "no": 10,
      "profile": "The railway-systems note for today traces James Gresham through the automatic vacuum brake. James Gresham developed an automatic vacuum brake system for trains. A continuous pipe allowed braking to propagate through the consist, and loss of vacuum could apply the brakes. That development turned train position, route, braking, or communication into a controlled condition rather than an assumption made from the timetable.\n\nA continuous automatic brake is safer because separation or pipe failure tends to command braking rather than remove it. Railway signalling separates heavy vehicles that cannot steer and may need a long distance to stop. Safe movement depends on detection, route locking, movement authority, braking, communication, and a restrictive response to missing information. A signalling explanation should identify detection, movement authority, route locking, braking response, failure state, and the evidence presented to the driver or signaller.\n\nInterlocking prevents conflicting routes and incompatible commands. Track circuits, axle counters, point detection, crossing controls, block instruments, and train protection each convert physical state into permission or prohibition. A bypass may restore traffic while quietly removing the condition that made the route safe. Temporary arrangements therefore need explicit limits, independent protection, testing, logging, and a defined return to normal equipment. The railway chronology should join panel logs, track detection, point tests, crossing state, temporary straps, notices, maintenance deferrals, and train movements.\n\nThe fail-safe lesson is that loss of power, wire continuity, detection, or agreement should produce stop, occupied, or fault—not a permissive clear. Convenience must never reverse that logic. A useful infrastructure record links signal failures, point tests, crossing alarms, temporary straps, operating notices, maintenance deferrals, and train movements. The chronology often reveals normalization of a known defect. Cover knowledge means separating a driver's action from the authority and protection presented to the cab. Signal aspects, data logs, route state, braking, and interlock condition belong in one reconstruction.",
      "frame": "The Signaller tests a relay at The Signalling Control Centre. \"Use James Gresham to show how the railway proves a route before displaying clear.\"",
      "q": [
        {
          "q": "Which railway-signalling account best describes James Gresham's contribution to the automatic vacuum brake?",
          "o": [
            {
              "t": "James Gresham developed an automatic vacuum brake system for trains. The route-control archive stores the signal trace. Signalling specialists compare the signal trace with train movement. Rail fits.",
              "v": "expert",
              "fb": "Correct: this response links the signalling device with separation, interlocking, and fail-safe authority."
            },
            {
              "t": "James Gresham's rail work emphasizes the panel indication and printed timetable. The timetable supports the account. Temporary working can seem routine. Rail timing supports this rail claim.",
              "v": "partial",
              "fb": "This covers one signalling element but leaves route locking or train detection unresolved."
            },
            {
              "t": "James Gresham's rail work is read within rail practice as support for a timetable and signal aspect as sufficient authority without the complete interlocking chain. Rail records fit this rail account.",
              "v": "wrong",
              "fb": "That explanation assigns the device a function it did not provide or confuses schedule with authority."
            },
            {
              "t": "James Gresham's rail authority supports keeping a temporary interlock bypass after several uneventful train movements. Rail practice makes the rail view plausible. Rail timing supports this rail claim.",
              "v": "danger",
              "fb": "That shortcut restores movement by removing the barrier meant to prevent incompatible train paths."
            }
          ]
        },
        {
          "q": "Which fail-safe signalling rule does this contribution support?",
          "o": [
            {
              "t": "A continuous automatic brake is safer because separation or pipe failure tends to command braking rather than remove it. The railway dossier carries the signal trace. Rail fits. Rail fits.",
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
    "rx_raynar": {
      "sci": "H. Raynar Wilson (railway-signalling historian)",
      "topic": "Signalling principles & accident lessons",
      "lede": "Through signalling principles & accident lessons, H. Raynar Wilson converted railway movement from assumption into proved authority.",
      "no": 11,
      "profile": "The railway-systems note for today traces H. Raynar Wilson through signalling principles & accident lessons. H. Raynar Wilson documented railway signalling principles, apparatus, and lessons drawn from accidents. His historical and technical writing showed how block systems, interlocking, detection, and operating discipline evolved together. That development turned train position, route, braking, or communication into a controlled condition rather than an assumption made from the timetable.\n\nAccident reports matter when their lessons are translated into design rules, maintenance standards, and operating practice. Interlocking prevents conflicting routes and incompatible commands. Track circuits, axle counters, point detection, crossing controls, block instruments, and train protection each convert physical state into permission or prohibition. A signalling explanation should identify detection, movement authority, route locking, braking response, failure state, and the evidence presented to the driver or signaller.\n\nA bypass may restore traffic while quietly removing the condition that made the route safe. Temporary arrangements therefore need explicit limits, independent protection, testing, logging, and a defined return to normal equipment. Railway signalling separates heavy vehicles that cannot steer and may need a long distance to stop. Safe movement depends on detection, route locking, movement authority, braking, communication, and a restrictive response to missing information. The railway chronology should join panel logs, track detection, point tests, crossing state, temporary straps, notices, maintenance deferrals, and train movements.\n\nA useful infrastructure record links signal failures, point tests, crossing alarms, temporary straps, operating notices, maintenance deferrals, and train movements. The chronology often reveals normalization of a known defect. Cover knowledge means separating a driver's action from the authority and protection presented to the cab. Signal aspects, data logs, route state, braking, and interlock condition belong in one reconstruction. The fail-safe lesson is that loss of power, wire continuity, detection, or agreement should produce stop, occupied, or fault—not a permissive clear. Convenience must never reverse that logic.",
      "frame": "The Clerk points along the rails at The Signalling Control Centre. \"Explain signalling principles & accident lessons, including the state produced by a broken wire.\"",
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
    "rx_fox": {
      "sci": "Charles Fox (1810-1874)",
      "topic": "The railway switch & points",
      "lede": "Charles Fox's work on the railway switch & points strengthened the fail-safe chain between track and driver.",
      "no": 12,
      "profile": "The railway-systems note for today traces Charles Fox through the railway switch & points. Charles Fox contributed to early railway engineering and patented improvements involving switches and points. Properly aligned and locked points guide wheel flanges through a junction without splitting the route. That development turned train position, route, braking, or communication into a controlled condition rather than an assumption made from the timetable.\n\nA route is not safe until points are detected in the commanded position and locked against movement under a train. A bypass may restore traffic while quietly removing the condition that made the route safe. Temporary arrangements therefore need explicit limits, independent protection, testing, logging, and a defined return to normal equipment. A signalling explanation should identify detection, movement authority, route locking, braking response, failure state, and the evidence presented to the driver or signaller.\n\nRailway signalling separates heavy vehicles that cannot steer and may need a long distance to stop. Safe movement depends on detection, route locking, movement authority, braking, communication, and a restrictive response to missing information. Interlocking prevents conflicting routes and incompatible commands. Track circuits, axle counters, point detection, crossing controls, block instruments, and train protection each convert physical state into permission or prohibition. The railway chronology should join panel logs, track detection, point tests, crossing state, temporary straps, notices, maintenance deferrals, and train movements.\n\nCover knowledge means separating a driver's action from the authority and protection presented to the cab. Signal aspects, data logs, route state, braking, and interlock condition belong in one reconstruction. The fail-safe lesson is that loss of power, wire continuity, detection, or agreement should produce stop, occupied, or fault—not a permissive clear. Convenience must never reverse that logic. A useful infrastructure record links signal failures, point tests, crossing alarms, temporary straps, operating notices, maintenance deferrals, and train movements. The chronology often reveals normalization of a known defect.",
      "frame": "The Clerk sets a block instrument at danger in The Signalling Control Centre. \"Start with Charles Fox; keep movement authority separate from schedule.\"",
      "q": [
        {
          "q": "Which railway-signalling account best describes Charles Fox's contribution to the railway switch & points?",
          "o": [
            {
              "t": "Charles Fox contributed to early railway engineering and patented improvements involving switches and points. Signalling specialists compare the route log with train movement.",
              "v": "expert",
              "fb": "Correct: this response links the signalling device with separation, interlocking, and fail-safe authority."
            },
            {
              "t": "Charles Fox's rail work relies on the panel indication and printed timetable. Rail records fit this rail account. Rail context supports the view. Rail timing supports this rail claim.",
              "v": "partial",
              "fb": "This covers one signalling element but leaves route locking or train detection unresolved."
            },
            {
              "t": "Charles Fox's rail work supports a timetable and signal aspect as sufficient authority without the complete interlocking chain. The panel sequence appears consistent. Rail fits.",
              "v": "wrong",
              "fb": "That explanation assigns the device a function it did not provide or confuses schedule with authority."
            },
            {
              "t": "Charles Fox's authority is invoked in rail practice to justify keeping a temporary interlock bypass after several uneventful train movements. Rail records fit this rail account.",
              "v": "danger",
              "fb": "That shortcut restores movement by removing the barrier meant to prevent incompatible train paths."
            }
          ]
        },
        {
          "q": "Which fail-safe signalling rule does this contribution support?",
          "o": [
            {
              "t": "A route is not safe until points are detected in the commanded position and locked against movement under a train. The route-control archive stores the raw route log. Rail fits. Rail fits.",
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
    "rx_trevithick": {
      "sci": "Richard Trevithick (1771-1833)",
      "topic": "The first steam locomotive",
      "lede": "Richard Trevithick made the first steam locomotive part of the controlled logic separating trains.",
      "no": 13,
      "profile": "The railway-systems note for today traces Richard Trevithick through the first steam locomotive. Richard Trevithick built high-pressure steam engines and demonstrated an early steam locomotive in 1804. His machines proved that adhesion between smooth wheels and rails could move useful loads. That development turned train position, route, braking, or communication into a controlled condition rather than an assumption made from the timetable.\n\nGreater speed and power increase the distance needed for detection, authority, braking, and protection ahead of a train. Railway signalling separates heavy vehicles that cannot steer and may need a long distance to stop. Safe movement depends on detection, route locking, movement authority, braking, communication, and a restrictive response to missing information. A signalling explanation should identify detection, movement authority, route locking, braking response, failure state, and the evidence presented to the driver or signaller.\n\nInterlocking prevents conflicting routes and incompatible commands. Track circuits, axle counters, point detection, crossing controls, block instruments, and train protection each convert physical state into permission or prohibition. A bypass may restore traffic while quietly removing the condition that made the route safe. Temporary arrangements therefore need explicit limits, independent protection, testing, logging, and a defined return to normal equipment. The railway chronology should join panel logs, track detection, point tests, crossing state, temporary straps, notices, maintenance deferrals, and train movements.\n\nThe fail-safe lesson is that loss of power, wire continuity, detection, or agreement should produce stop, occupied, or fault—not a permissive clear. Convenience must never reverse that logic. A useful infrastructure record links signal failures, point tests, crossing alarms, temporary straps, operating notices, maintenance deferrals, and train movements. The chronology often reveals normalization of a known defect. Cover knowledge means separating a driver's action from the authority and protection presented to the cab. Signal aspects, data logs, route state, braking, and interlock condition belong in one reconstruction.",
      "frame": "S&T Tech Mara Doss tests a relay at The Infrastructure Head Office. \"Use Richard Trevithick to show how the railway proves a route before displaying clear.\"",
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
    "rx_locke": {
      "sci": "Joseph Locke (1805-1860)",
      "topic": "Railway civil engineering",
      "lede": "Through railway civil engineering, Joseph Locke converted railway movement from assumption into proved authority.",
      "no": 14,
      "profile": "The railway-systems note for today traces Joseph Locke through railway civil engineering. Joseph Locke designed and built major early railways with attention to gradients, earthworks, operating economy, and reliable construction. His approach favored routes and locomotives that could sustain practical service. That development turned train position, route, braking, or communication into a controlled condition rather than an assumption made from the timetable.\n\nInfrastructure geometry and operating rules must be designed as one system because gradient and speed directly shape braking risk. Interlocking prevents conflicting routes and incompatible commands. Track circuits, axle counters, point detection, crossing controls, block instruments, and train protection each convert physical state into permission or prohibition. A signalling explanation should identify detection, movement authority, route locking, braking response, failure state, and the evidence presented to the driver or signaller.\n\nA bypass may restore traffic while quietly removing the condition that made the route safe. Temporary arrangements therefore need explicit limits, independent protection, testing, logging, and a defined return to normal equipment. Railway signalling separates heavy vehicles that cannot steer and may need a long distance to stop. Safe movement depends on detection, route locking, movement authority, braking, communication, and a restrictive response to missing information. The railway chronology should join panel logs, track detection, point tests, crossing state, temporary straps, notices, maintenance deferrals, and train movements.\n\nA useful infrastructure record links signal failures, point tests, crossing alarms, temporary straps, operating notices, maintenance deferrals, and train movements. The chronology often reveals normalization of a known defect. Cover knowledge means separating a driver's action from the authority and protection presented to the cab. Signal aspects, data logs, route state, braking, and interlock condition belong in one reconstruction. The fail-safe lesson is that loss of power, wire continuity, detection, or agreement should produce stop, occupied, or fault—not a permissive clear. Convenience must never reverse that logic.",
      "frame": "S&T Tech Mara Doss points along the rails at The Infrastructure Head Office. \"Explain railway civil engineering, including the state produced by a broken wire.\"",
      "q": [
        {
          "q": "Which railway-signalling account best describes Joseph Locke's contribution to railway civil engineering?",
          "o": [
            {
              "t": "Joseph Locke designed and built major early railways with attention to gradients, earthworks, operating economy, and reliable construction. The railway dossier carries the route log. Fits.",
              "v": "expert",
              "fb": "Correct: this response links the signalling device with separation, interlocking, and fail-safe authority."
            },
            {
              "t": "Joseph Locke's rail work relies on the panel indication and printed timetable. Temporary working can seem routine. Rail context supports the view. Rail timing supports this rail claim. Fits.",
              "v": "partial",
              "fb": "This covers one signalling element but leaves route locking or train detection unresolved."
            },
            {
              "t": "Joseph Locke's rail work is read within rail practice as support for a timetable and signal aspect as sufficient authority without the complete interlocking chain. The timetable supports the account.",
              "v": "wrong",
              "fb": "That explanation assigns the device a function it did not provide or confuses schedule with authority."
            },
            {
              "t": "Joseph Locke's authority is invoked in rail practice to justify keeping a temporary interlock bypass after several uneventful train movements. Temporary working can seem routine. Rail fits.",
              "v": "danger",
              "fb": "That shortcut restores movement by removing the barrier meant to prevent incompatible train paths."
            }
          ]
        },
        {
          "q": "Which fail-safe signalling rule does this contribution support?",
          "o": [
            {
              "t": "Infrastructure geometry and operating rules must be designed as one system because gradient and speed directly shape braking risk. The route-control archive stores the route log. Rail fits.",
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
    "rx_gooch": {
      "sci": "Daniel Gooch (1816-1889)",
      "topic": "Locomotive engineering & the broad gauge",
      "lede": "Daniel Gooch's work on locomotive engineering & the broad gauge strengthened the fail-safe chain between track and driver.",
      "no": 15,
      "profile": "The railway-systems note for today traces Daniel Gooch through locomotive engineering & the broad gauge. Daniel Gooch designed locomotives for the Great Western Railway and managed broad-gauge operations. His engineering improved speed and reliability while highlighting the network consequences of a chosen gauge. That development turned train position, route, braking, or communication into a controlled condition rather than an assumption made from the timetable.\n\nVehicle design, track standard, braking, and signalling interfaces must remain compatible across the railway. A bypass may restore traffic while quietly removing the condition that made the route safe. Temporary arrangements therefore need explicit limits, independent protection, testing, logging, and a defined return to normal equipment. A signalling explanation should identify detection, movement authority, route locking, braking response, failure state, and the evidence presented to the driver or signaller.\n\nRailway signalling separates heavy vehicles that cannot steer and may need a long distance to stop. Safe movement depends on detection, route locking, movement authority, braking, communication, and a restrictive response to missing information. Interlocking prevents conflicting routes and incompatible commands. Track circuits, axle counters, point detection, crossing controls, block instruments, and train protection each convert physical state into permission or prohibition. The railway chronology should join panel logs, track detection, point tests, crossing state, temporary straps, notices, maintenance deferrals, and train movements.\n\nCover knowledge means separating a driver's action from the authority and protection presented to the cab. Signal aspects, data logs, route state, braking, and interlock condition belong in one reconstruction. The fail-safe lesson is that loss of power, wire continuity, detection, or agreement should produce stop, occupied, or fault—not a permissive clear. Convenience must never reverse that logic. A useful infrastructure record links signal failures, point tests, crossing alarms, temporary straps, operating notices, maintenance deferrals, and train movements. The chronology often reveals normalization of a known defect.",
      "frame": "The Signaller sets a block instrument at danger in The Infrastructure Head Office. \"Start with Daniel Gooch; keep movement authority separate from schedule.\"",
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
    "rx_stroudley": {
      "sci": "William Stroudley (1833-1889)",
      "topic": "Locomotive design & braking",
      "lede": "William Stroudley made locomotive design & braking part of the controlled logic separating trains.",
      "no": 16,
      "profile": "The railway-systems note for today traces William Stroudley through locomotive design & braking. William Stroudley designed standardized locomotives and rolling stock for the London, Brighton and South Coast Railway. His work included attention to braking and maintainable fleet practice. That development turned train position, route, braking, or communication into a controlled condition rather than an assumption made from the timetable.\n\nStandardization reduces hidden variation, but brakes still require inspection, continuity tests, and realistic stopping-distance assumptions. Railway signalling separates heavy vehicles that cannot steer and may need a long distance to stop. Safe movement depends on detection, route locking, movement authority, braking, communication, and a restrictive response to missing information. A signalling explanation should identify detection, movement authority, route locking, braking response, failure state, and the evidence presented to the driver or signaller.\n\nInterlocking prevents conflicting routes and incompatible commands. Track circuits, axle counters, point detection, crossing controls, block instruments, and train protection each convert physical state into permission or prohibition. A bypass may restore traffic while quietly removing the condition that made the route safe. Temporary arrangements therefore need explicit limits, independent protection, testing, logging, and a defined return to normal equipment. The railway chronology should join panel logs, track detection, point tests, crossing state, temporary straps, notices, maintenance deferrals, and train movements.\n\nThe fail-safe lesson is that loss of power, wire continuity, detection, or agreement should produce stop, occupied, or fault—not a permissive clear. Convenience must never reverse that logic. A useful infrastructure record links signal failures, point tests, crossing alarms, temporary straps, operating notices, maintenance deferrals, and train movements. The chronology often reveals normalization of a known defect. Cover knowledge means separating a driver's action from the authority and protection presented to the cab. Signal aspects, data logs, route state, braking, and interlock condition belong in one reconstruction.",
      "frame": "The Signaller tests a relay at The Infrastructure Head Office. \"Use William Stroudley to show how the railway proves a route before displaying clear.\"",
      "q": [
        {
          "q": "Which railway-signalling account best describes William Stroudley's contribution to locomotive design & braking?",
          "o": [
            {
              "t": "William Stroudley designed standardized locomotives and rolling stock for the London, Brighton and South Coast Railway. Fail-safe review keeps the raw fail-safe route log available for testing. Rail fits.",
              "v": "expert",
              "fb": "Correct: this response links the signalling device with separation, interlocking, and fail-safe authority."
            },
            {
              "t": "William Stroudley's rail work emphasizes the panel indication and printed timetable. The panel sequence appears consistent. Rail practice makes the rail view plausible. Rail timing supports this rail claim.",
              "v": "partial",
              "fb": "This covers one signalling element but leaves route locking or train detection unresolved."
            },
            {
              "t": "William Stroudley's rail work is read within rail practice as support for a timetable and signal aspect as sufficient authority without the complete interlocking chain. Rail records fit this rail account.",
              "v": "wrong",
              "fb": "That explanation assigns the device a function it did not provide or confuses schedule with authority."
            },
            {
              "t": "William Stroudley's rail authority supports keeping a temporary interlock bypass after several uneventful train movements. Rail practice makes the rail view plausible. Rail timing supports this rail claim.",
              "v": "danger",
              "fb": "That shortcut restores movement by removing the barrier meant to prevent incompatible train paths."
            }
          ]
        },
        {
          "q": "Which fail-safe signalling rule does this contribution support?",
          "o": [
            {
              "t": "Standardization reduces hidden variation, but brakes still require inspection, continuity tests, and realistic stopping-distance assumptions. The railway dossier carries the route log. Rail fits.",
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
    "rx_bradshaw": {
      "sci": "George Bradshaw (1801-1853)",
      "topic": "The railway timetable & scheduling",
      "lede": "Through the railway timetable & scheduling, George Bradshaw converted railway movement from assumption into proved authority.",
      "no": 17,
      "profile": "The railway-systems note for today traces George Bradshaw through the railway timetable & scheduling. George Bradshaw published railway timetables and guides that organized the rapidly expanding network for travelers and operators. A timetable coordinates movements, connections, and expectations across many lines. That development turned train position, route, braking, or communication into a controlled condition rather than an assumption made from the timetable.\n\nA schedule is a plan, not movement authority; safe signalling must remain able to stop a late or unexpected train. Interlocking prevents conflicting routes and incompatible commands. Track circuits, axle counters, point detection, crossing controls, block instruments, and train protection each convert physical state into permission or prohibition. A signalling explanation should identify detection, movement authority, route locking, braking response, failure state, and the evidence presented to the driver or signaller.\n\nA bypass may restore traffic while quietly removing the condition that made the route safe. Temporary arrangements therefore need explicit limits, independent protection, testing, logging, and a defined return to normal equipment. Railway signalling separates heavy vehicles that cannot steer and may need a long distance to stop. Safe movement depends on detection, route locking, movement authority, braking, communication, and a restrictive response to missing information. The railway chronology should join panel logs, track detection, point tests, crossing state, temporary straps, notices, maintenance deferrals, and train movements.\n\nA useful infrastructure record links signal failures, point tests, crossing alarms, temporary straps, operating notices, maintenance deferrals, and train movements. The chronology often reveals normalization of a known defect. Cover knowledge means separating a driver's action from the authority and protection presented to the cab. Signal aspects, data logs, route state, braking, and interlock condition belong in one reconstruction. The fail-safe lesson is that loss of power, wire continuity, detection, or agreement should produce stop, occupied, or fault—not a permissive clear. Convenience must never reverse that logic.",
      "frame": "The Clerk points along the rails at The Infrastructure Head Office. \"Explain the railway timetable & scheduling, including the state produced by a broken wire.\"",
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
    },
    "rx_ramsbottom": {
      "sci": "John Ramsbottom (1814-1897)",
      "topic": "The safety valve & water trough",
      "lede": "John Ramsbottom's work on the safety valve & water trough strengthened the fail-safe chain between track and driver.",
      "no": 18,
      "profile": "The railway-systems note for today traces John Ramsbottom through the safety valve & water trough. John Ramsbottom invented a tamper-resistant safety valve for locomotives and developed water troughs that allowed engines to take water while moving. Both innovations addressed continuous operation under pressure. That development turned train position, route, braking, or communication into a controlled condition rather than an assumption made from the timetable.\n\nProductivity devices must not defeat protective limits; pressure relief and route safety retain priority over keeping a train moving. A bypass may restore traffic while quietly removing the condition that made the route safe. Temporary arrangements therefore need explicit limits, independent protection, testing, logging, and a defined return to normal equipment. A signalling explanation should identify detection, movement authority, route locking, braking response, failure state, and the evidence presented to the driver or signaller.\n\nRailway signalling separates heavy vehicles that cannot steer and may need a long distance to stop. Safe movement depends on detection, route locking, movement authority, braking, communication, and a restrictive response to missing information. Interlocking prevents conflicting routes and incompatible commands. Track circuits, axle counters, point detection, crossing controls, block instruments, and train protection each convert physical state into permission or prohibition. The railway chronology should join panel logs, track detection, point tests, crossing state, temporary straps, notices, maintenance deferrals, and train movements.\n\nCover knowledge means separating a driver's action from the authority and protection presented to the cab. Signal aspects, data logs, route state, braking, and interlock condition belong in one reconstruction. The fail-safe lesson is that loss of power, wire continuity, detection, or agreement should produce stop, occupied, or fault—not a permissive clear. Convenience must never reverse that logic. A useful infrastructure record links signal failures, point tests, crossing alarms, temporary straps, operating notices, maintenance deferrals, and train movements. The chronology often reveals normalization of a known defect.",
      "frame": "The Clerk sets a block instrument at danger in The Infrastructure Head Office. \"Start with John Ramsbottom; keep movement authority separate from schedule.\"",
      "q": [
        {
          "q": "Which railway-signalling account best describes John Ramsbottom's contribution to the safety valve & water trough?",
          "o": [
            {
              "t": "John Ramsbottom invented a tamper-resistant safety valve for locomotives and developed water troughs that allowed engines to take water while moving. The railway dossier carries the route log.",
              "v": "expert",
              "fb": "Correct: this response links the signalling device with separation, interlocking, and fail-safe authority."
            },
            {
              "t": "John Ramsbottom's rail work emphasizes the panel indication and printed timetable. The timetable supports the account. Temporary working can seem routine. Rail practice makes the rail view plausible.",
              "v": "partial",
              "fb": "This covers one signalling element but leaves route locking or train detection unresolved."
            },
            {
              "t": "John Ramsbottom's rail work is read within rail practice as support for a timetable and signal aspect as sufficient authority without the complete interlocking chain. Rail timing supports this rail claim.",
              "v": "wrong",
              "fb": "That explanation assigns the device a function it did not provide or confuses schedule with authority."
            },
            {
              "t": "John Ramsbottom's rail authority supports keeping a temporary interlock bypass after several uneventful train movements. Temporary working can seem routine. Rail timing supports this rail claim.",
              "v": "danger",
              "fb": "That shortcut restores movement by removing the barrier meant to prevent incompatible train paths."
            }
          ]
        },
        {
          "q": "Which fail-safe signalling rule does this contribution support?",
          "o": [
            {
              "t": "Productivity devices must not defeat protective limits; pressure relief and route safety retain priority over keeping a train moving. The railway dossier carries the route log.",
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
    "<b>The crossing cabinet stands open beside a dark signal, its relays tagged for examination.</b>",
    "<b>S&T Tech Mara Doss</b> reads the relay logic hardware, <b>The Signaller</b> preserves its operating sequence, and <b>The Clerk</b> traces authority through the files.",
    "The suspects are Perren Voss — signalling infrastructure manager, The express driver, and The rail-safety inspector. The rival relay logic readings—<b>Track circuits failed to detect the occupied crossing</b> and <b>Automatic train stop failed after a restrictive signal</b>—remain credible until the profiles are compared.",
    "<b>Temporary working ends in eight days, after which repaired equipment will erase the original logic state.</b>"
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
  }
}
};
