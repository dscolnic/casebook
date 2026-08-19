// Diagnosis data pack — generated for the Diagnosis engine.
module.exports = { PACK: {
  "id": "grid",
  "title": "Grid Disturbance",
  "domain": "Electric power transmission operations",
  "role": "You are the transmission-system operator diagnosing a line alarm.",
  "system": {
    "parts": [
      [
        "Transmission line",
        "A high-voltage line carries real and reactive power between substations. Sustained current heats the conductor and can increase sag."
      ],
      [
        "Circuit breakers",
        "Breakers open to isolate equipment. An open breaker can be a correct protective trip, a relay misoperation, or an authorized switching action."
      ],
      [
        "Protective relays",
        "Relays compare currents, voltages, impedance, and other quantities to decide whether a fault lies inside their protected zone."
      ],
      [
        "SCADA and energy management",
        "Operator commands, breaker indications, line flows, and system frequency show what the grid was asked to do and what it actually did."
      ],
      [
        "Neighboring network",
        "When a line opens, its power shifts to parallel paths. A system-wide load increase also lowers frequency and raises flows on many lines."
      ]
    ],
    "soWrong": "So a hot line, a sudden current surge, and an open breaker are different clues. The diagnosis depends on whether the equipment was thermally overloaded, the whole system briefly needed more power, or protection opened a healthy line without an authorized command."
  },
  "salient": [
    "breaker",
    "temp"
  ],
  "readings": {
    "breaker": {
      "name": "Line-breaker state",
      "purpose": "Whether both terminal breakers are closed or open. An open line may be a protection action or planned switching; a closed line can still be overloaded or carrying a transient spike.",
      "pin": {
        "x": 255,
        "y": 150
      },
      "zone": "substation"
    },
    "temp": {
      "name": "Conductor temperature",
      "purpose": "Estimated or measured conductor temperature, normally below the applicable dynamic or seasonal rating. Sustained overload heats the conductor; a brief spike or an immediate trip may leave it near normal.",
      "pin": {
        "x": 250,
        "y": 75
      },
      "zone": "line"
    },
    "current": {
      "name": "Line current",
      "purpose": "Current relative to the operating rating. Sustained high current supports overload; a brief high pulse with system frequency sag supports a load pickup.",
      "pin": {
        "x": 255,
        "y": 225
      },
      "zone": "line"
    },
    "frequency": {
      "name": "System frequency",
      "purpose": "The balance between generation and load, normally near 60.00 Hz in this grid. A sudden load increase depresses frequency across the interconnection.",
      "pin": {
        "x": 80,
        "y": 250
      },
      "zone": "system"
    },
    "relay": {
      "name": "Relay target and element",
      "purpose": "Which protection element asserted and its measured fault quantities. A trip target without matching differential or distance evidence can indicate misoperation.",
      "pin": {
        "x": 390,
        "y": 120
      },
      "zone": "protection"
    },
    "command": {
      "name": "SCADA switching command",
      "purpose": "Authenticated operator command and switching order. A valid command explains an open breaker without a fault.",
      "pin": {
        "x": 420,
        "y": 230
      },
      "zone": "control"
    },
    "diff": {
      "name": "Line differential current",
      "purpose": "Difference between current entering and leaving the protected line. It should rise for an internal line fault but remain low for load, overload, or a false trip.",
      "pin": {
        "x": 405,
        "y": 55
      },
      "zone": "protection"
    },
    "parallel": {
      "name": "Parallel-path loading",
      "purpose": "Power transferred to neighboring lines. It rises after a line opens and rises broadly during a load surge.",
      "pin": {
        "x": 110,
        "y": 115
      },
      "zone": "network"
    }
  },
  "hypotheses": {
    "overload": {
      "label": "Sustained line overload",
      "call": {
        "title": "Line overload — reduce transfer or reconfigure.",
        "arg": "The line remains closed but has heated above its rating under sustained current. Redispatch or reconfigure before sag or protection operation."
      },
      "sig": {
        "breaker": "closed",
        "temp": "hot",
        "current": "sustained-high",
        "frequency": "normal",
        "relay": "quiet",
        "command": "none",
        "diff": "normal",
        "parallel": "normal"
      }
    },
    "loadspike": {
      "label": "System load spike",
      "call": {
        "title": "Load spike — balance generation and demand.",
        "arg": "The breaker remains closed and the conductor is not yet hot, while frequency and multiple flows show a sudden system-wide demand increase."
      },
      "sig": {
        "breaker": "closed",
        "temp": "normal",
        "current": "brief-high",
        "frequency": "down",
        "relay": "quiet",
        "command": "none",
        "diff": "normal",
        "parallel": "high"
      }
    },
    "relaymisop": {
      "label": "Protective-relay misoperation",
      "call": {
        "title": "Relay misoperation — secure the scheme and restore safely.",
        "arg": "A healthy line opened without an operator command or fault quantities. Block the suspect scheme, verify the line, and coordinate restoration."
      },
      "sig": {
        "breaker": "open",
        "temp": "normal",
        "current": "zero",
        "frequency": "normal",
        "relay": "spurious",
        "command": "none",
        "diff": "normal",
        "parallel": "high"
      }
    },
    "planned": {
      "label": "Authorized planned switching",
      "call": {
        "title": "Planned switching — no fault response.",
        "arg": "The line is open under a valid switching order, with normal pre-open temperature and no fault evidence. Continue the approved work plan."
      },
      "sig": {
        "breaker": "open",
        "temp": "normal",
        "current": "zero",
        "frequency": "normal",
        "relay": "quiet",
        "command": "valid",
        "diff": "normal",
        "parallel": "high"
      }
    }
  },
  "dismissal": "planned",
  "reassuring": {
    "lab": "System frequency",
    "val": "60.00 Hz at the control-center clock",
    "note": "Nominal frequency means generation and load are balanced overall. It does not prove that one line is cool, closed, or correctly protected."
  },
  "rounds": [
    {
      "answer": "overload",
      "alarm": "temp",
      "poleA": {
        "lab": "Line thermal state",
        "val": "Conductor at 118°C and rising",
        "note": "The line is still energized, but sustained current has pushed it above its operating limit."
      },
      "hook": "An evening transfer across Corridor 7 has crept upward for forty minutes. System frequency is perfectly normal, yet the conductor-temperature alarm turns red.",
      "riddle": "If the grid is balanced — <span class=\"q\">why is this one line still heating toward an unsafe sag condition?</span>",
      "vals": {
        "breaker": "both terminal breakers closed",
        "temp": "118°C, rising; current rating limit 100°C",
        "current": "1,420 A for 38 minutes; operating rating 1,100 A",
        "frequency": "60.00 Hz",
        "relay": "no trip element asserted",
        "command": "no switching command",
        "diff": "22 A, normal through-current mismatch",
        "parallel": "neighboring paths at 72–78% of rating"
      },
      "reasons": {
        "loadspike": "A load spike can briefly raise current, but it would depress frequency and raise flows across parallel paths. Here frequency is 60.00 Hz, neighboring paths are moderate, and this line has carried 1,420 A for 38 minutes.",
        "relaymisop": "A relay misoperation opens the breaker on a line without fault evidence. Both breakers remain closed and the problem is sustained thermal loading, not an unnecessary trip.",
        "planned": "Planned switching would show an open breaker and a valid work order. The line is closed, no command exists, and the conductor is already at 118°C."
      },
      "resolve": {
        "title": "Sustained line overload — one corridor is carrying too much power for too long.",
        "paras": [
          "The current has remained well above the line’s operating rating long enough to heat the conductor to 118°C. Frequency stays normal because generation still matches total load; the danger is local thermal loading and conductor sag. Reduce the transfer or move power to other paths.",
          "This is a naked single. A hot conductor is unique to the sustained-overload cause. The other candidates either happen too quickly to heat the line or open it before continued heating."
        ],
        "why": {
          "loud": "<b>Why the loud reading was enough</b>: only sustained overload produces the high conductor-temperature signature.",
          "quiet": "<b>Why normal frequency is not reassuring</b>: the grid can balance generation and load while routing too much of that power through one element."
        },
        "chain": [
          "Power transfer exceeds the line rating",
          "Resistive heating accumulates over many minutes",
          "Conductor temperature and sag risk rise"
        ],
        "take": "System balance does not guarantee equipment balance; local thermal limits still matter."
      }
    },
    {
      "answer": "loadspike",
      "alarm": "current",
      "poleA": {
        "lab": "Line current",
        "val": "Briefly 135% of rating",
        "note": "Several lines surge together, but the conductor has not had time to heat."
      },
      "hook": "A large industrial complex reconnects after an outage. Current jumps across the region and frequency dips, but the corridor breakers stay closed.",
      "riddle": "Is Corridor 7 developing a local overload — <span class=\"q\">or is it temporarily sharing a system-wide demand step?</span>",
      "vals": {
        "breaker": "both terminal breakers closed",
        "temp": "71°C, within rating and nearly unchanged",
        "current": "1,485 A for 22 seconds, now falling",
        "frequency": "59.72 Hz, recovering",
        "relay": "no line-protection target",
        "command": "no line switching command",
        "diff": "26 A, normal",
        "parallel": "four neighboring lines simultaneously at 125–138% of prior flow"
      },
      "reasons": {
        "overload": "A sustained overload also leaves the breaker closed, but it should heat the conductor. Temperature is still 71°C and the current surge has lasted only 22 seconds while frequency recovers.",
        "relaymisop": "A relay misoperation would leave the line open and current at zero. Both terminal breakers remain closed and protection is quiet.",
        "planned": "Authorized switching would produce an open breaker and a recorded command. Neither appears."
      },
      "resolve": {
        "title": "System load spike — the entire network is responding to a sudden demand increase.",
        "paras": [
          "The breaker remains closed and the conductor is still thermally normal, while frequency falls to 59.72 Hz and several neighboring lines surge at the same instant. This is a short system-wide load pickup, not a mature local thermal overload.",
          "This is one clear line across the loud readings. A closed breaker is shared with overload, while normal temperature is shared with both open-line explanations. Only closed plus thermally normal identifies the brief load spike."
        ],
        "why": {
          "loud": "<b>Why both loud readings are needed</b>: the breaker state alone cannot separate a load spike from overload, and normal temperature alone also fits a line that has already opened.",
          "quiet": "<b>Why the quiet grid readings help</b>: frequency and simultaneous parallel-path loading show that the disturbance is system-wide."
        },
        "chain": [
          "A large block of demand reconnects",
          "Generation momentarily lags load",
          "Frequency dips and many line currents rise together"
        ],
        "take": "Thermal state carries time information: high current without heating points to a recent transient, not a long overload."
      }
    },
    {
      "answer": "relaymisop",
      "alarm": "breaker",
      "poleA": {
        "lab": "Line status",
        "val": "Both breakers open",
        "note": "The corridor tripped even though pre-trip temperature and fault measurements were normal."
      },
      "hook": "At 03:14, Corridor 7 opens at both ends and power shifts to neighboring lines. A planned maintenance opening would look identical on the two loud indicators.",
      "riddle": "The line is open and cool — <span class=\"q\">was that opening authorized, or did protection remove healthy equipment?</span>",
      "vals": {
        "breaker": "both terminal breakers open",
        "temp": "68°C before trip, normal",
        "current": "0 A after trip; 620 A before trip",
        "frequency": "59.99 Hz",
        "relay": "zone-1 distance target asserted; recorded impedance remained outside zone",
        "command": "no authenticated SCADA command or switching order",
        "diff": "19 A before trip, normal",
        "parallel": "neighboring paths increased by 410 MW after opening"
      },
      "reasons": {
        "planned": "Planned switching shares the loud pattern of an open breaker and normal conductor temperature. But there is no authenticated command or switching order, and a protection target appears despite fault quantities outside its zone.",
        "overload": "An overload requires the line to remain energized under sustained high current and become hot. The pre-trip current was 620 A and temperature was 68°C.",
        "loadspike": "A load spike leaves the line closed and produces a frequency dip and broad current increase. The line opened from ordinary loading while system frequency remained normal."
      },
      "resolve": {
        "title": "Protective-relay misoperation — healthy equipment was tripped without authorization.",
        "paras": [
          "The line was cool and lightly loaded, differential current remained normal, and recorded impedance never entered the asserted zone-1 element. No operator command exists. The trip target therefore represents a protection-system misoperation rather than a fault or approved switching action.",
          "This is where the loud gauges tie. A relay misoperation and planned switching both show an open breaker with a normal conductor temperature. The deeper question is whether the opening had a valid cause: an operator command or matching electrical fault evidence. It had neither."
        ],
        "why": {
          "loud": "<b>Why the loud gauges cannot decide</b>: authorized switching and an unnecessary protection trip both leave a healthy, cool line open.",
          "quiet": "<b>Why misoperation wins</b>: the command log is empty and the asserted relay element is contradicted by the recorded impedance and differential current."
        },
        "chain": [
          "A relay element asserts incorrectly",
          "Breakers open a healthy transmission line",
          "Power transfers to neighbors without a real fault or authorized order"
        ],
        "take": "When equipment is open but electrically healthy, inspect both chains of authority: protection evidence and operator command."
      }
    }
  ],
  "schematic": {
    "viewBox": "0 0 520 390",
    "svg": "\n<text x=\"260\" y=\"24\" class=\"eqlbl\" text-anchor=\"middle\" style=\"fill:#5a7f96\">TRANSMISSION CORRIDOR</text>\n<rect x=\"45\" y=\"115\" width=\"105\" height=\"135\" rx=\"15\" fill=\"#173e59\" stroke=\"#70c9f2\" stroke-width=\"2\"/>\n<rect x=\"370\" y=\"115\" width=\"105\" height=\"135\" rx=\"15\" fill=\"#173e59\" stroke=\"#70c9f2\" stroke-width=\"2\"/>\n<text x=\"98\" y=\"145\" class=\"lbl\" text-anchor=\"middle\">SUBSTATION A</text>\n<text x=\"422\" y=\"145\" class=\"lbl\" text-anchor=\"middle\">SUBSTATION B</text>\n<line x1=\"150\" y1=\"180\" x2=\"370\" y2=\"180\" stroke=\"#efca72\" stroke-width=\"6\"/>\n<line x1=\"150\" y1=\"205\" x2=\"370\" y2=\"205\" stroke=\"#70c9f2\" stroke-width=\"3\"/>\n<rect x=\"164\" y=\"160\" width=\"30\" height=\"55\" fill=\"#173e59\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<rect x=\"326\" y=\"160\" width=\"30\" height=\"55\" fill=\"#173e59\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<text x=\"260\" y=\"155\" class=\"lbl\" text-anchor=\"middle\">transmission line</text>\n<path d=\"M90,270 C150,320 210,300 260,275 C310,250 370,270 430,315\" fill=\"none\" stroke=\"#70c9f2\" stroke-width=\"3\" stroke-dasharray=\"6 4\"/>\n<text x=\"260\" y=\"340\" class=\"lbl\" text-anchor=\"middle\">parallel network paths</text>\n<rect x=\"365\" y=\"45\" width=\"110\" height=\"45\" rx=\"10\" fill=\"rgba(112,201,242,.06)\" stroke=\"#385b70\"/>\n<text x=\"420\" y=\"73\" class=\"lbl\" text-anchor=\"middle\">relay records</text>\n<rect x=\"45\" y=\"45\" width=\"110\" height=\"45\" rx=\"10\" fill=\"rgba(112,201,242,.06)\" stroke=\"#385b70\"/>\n<text x=\"100\" y=\"73\" class=\"lbl\" text-anchor=\"middle\">SCADA / frequency</text>\n<line x1=\"250\" y1=\"75\" x2=\"250\" y2=\"155\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"255\" y1=\"225\" x2=\"255\" y2=\"205\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"390\" y1=\"120\" x2=\"365\" y2=\"90\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"420\" y1=\"230\" x2=\"475\" y2=\"210\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"405\" y1=\"55\" x2=\"385\" y2=\"95\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"110\" y1=\"115\" x2=\"100\" y2=\"90\" stroke=\"#efca72\" stroke-width=\"2\"/>"
  }
} };
