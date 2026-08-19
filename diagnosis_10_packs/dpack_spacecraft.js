// Diagnosis data pack — generated for the Diagnosis engine.
module.exports = { PACK: {
  "id": "spacecraft",
  "title": "Pointing Anomaly",
  "domain": "Spacecraft attitude-control telemetry",
  "role": "You are the flight dynamics officer diagnosing a pointing alarm.",
  "system": {
    "parts": [
      [
        "Star tracker",
        "An optical camera identifies star patterns and reports spacecraft attitude. A bad solution can jump even when the spacecraft has not physically moved."
      ],
      [
        "Gyroscopes",
        "Rate gyros measure actual body rotation over short intervals. They provide an independent check on whether a star-tracker attitude change is real."
      ],
      [
        "Reaction wheels and thrusters",
        "Reaction wheels handle fine pointing; small thrusters unload momentum or make larger corrections. A leaking or stuck thruster produces real torque and measurable propellant-system evidence."
      ],
      [
        "Instrument bench",
        "The science instrument and star tracker sit on structures that can flex as temperatures change. Thermal distortion can move the line of sight without a large body rotation."
      ],
      [
        "Thermal control",
        "Heaters, radiators, sun angle, and temperature sensors show whether a pointing drift is an expected commanded cycle or an unplanned gradient."
      ]
    ],
    "soWrong": "So an attitude alarm can be a false optical solution, a real external torque, or a thermally moving line of sight. The spacecraft-wide sensors reveal whether the stars, the body, or only the instrument bench moved."
  },
  "salient": [
    "pointing",
    "gradient"
  ],
  "readings": {
    "pointing": {
      "name": "Science boresight error",
      "purpose": "Angular separation between the commanded target and the instrument line of sight. A sudden jump suggests a bad attitude solution; a steady drift can come from real torque or thermal flexure.",
      "pin": {
        "x": 255,
        "y": 95
      },
      "zone": "payload"
    },
    "gradient": {
      "name": "Bench temperature gradient",
      "purpose": "Temperature difference across the instrument support, normally below about 1.5°C in this mode. A large gradient can flex the bench and shift the boresight.",
      "pin": {
        "x": 255,
        "y": 260
      },
      "zone": "thermal"
    },
    "gyro": {
      "name": "Body gyro rate",
      "purpose": "Measured physical rotation of the spacecraft body. A real thruster torque raises rate; a star-tracker jump or pure structural flexure may leave body rate near zero.",
      "pin": {
        "x": 95,
        "y": 165
      },
      "zone": "attitude"
    },
    "tracker": {
      "name": "Star-tracker residual",
      "purpose": "Mismatch between observed star centroids and the fitted star catalog. High residuals or lost stars point to a bad optical attitude solution.",
      "pin": {
        "x": 92,
        "y": 75
      },
      "zone": "attitude"
    },
    "thruster": {
      "name": "Thruster valve/current telemetry",
      "purpose": "Command, coil current, and chamber-pressure evidence for a firing. Current or pressure without a command supports a stuck or leaking thruster.",
      "pin": {
        "x": 420,
        "y": 165
      },
      "zone": "propulsion"
    },
    "wheel": {
      "name": "Reaction-wheel torque",
      "purpose": "Wheel effort used to oppose disturbance torque. Sustained counter-torque supports a real external torque; little wheel effort fits an apparent or structural line-of-sight error.",
      "pin": {
        "x": 360,
        "y": 85
      },
      "zone": "attitude"
    },
    "heater": {
      "name": "Heater command state",
      "purpose": "Shows whether a planned heater cycle is active. A large gradient without the scheduled command indicates an unplanned thermal condition.",
      "pin": {
        "x": 405,
        "y": 275
      },
      "zone": "thermal"
    },
    "sun": {
      "name": "Sun-angle exposure",
      "purpose": "Geometry of the payload bench relative to the Sun. A new illumination angle can create unexpected thermal gradients even if heaters are off.",
      "pin": {
        "x": 145,
        "y": 300
      },
      "zone": "thermal"
    }
  },
  "hypotheses": {
    "badtracker": {
      "label": "Bad star-tracker solution",
      "call": {
        "title": "Star-tracker fault — reject the bad solution.",
        "arg": "The optical attitude solution jumped while gyros show no body motion. Isolate the tracker solution and propagate attitude from healthy sensors."
      },
      "sig": {
        "pointing": "jump",
        "gradient": "normal",
        "gyro": "normal",
        "tracker": "bad",
        "thruster": "off",
        "wheel": "normal",
        "heater": "off",
        "sun": "normal"
      }
    },
    "thrusterfault": {
      "label": "Uncommanded thruster torque",
      "call": {
        "title": "Thruster fault — isolate the leaking jet.",
        "arg": "The spacecraft is physically rotating and the propulsion telemetry identifies an uncommanded firing. Isolate the branch and recover attitude."
      },
      "sig": {
        "pointing": "drift",
        "gradient": "normal",
        "gyro": "high",
        "tracker": "good",
        "thruster": "on",
        "wheel": "high",
        "heater": "off",
        "sun": "normal"
      }
    },
    "thermal": {
      "label": "Unplanned thermal distortion",
      "call": {
        "title": "Thermal distortion — restore the expected thermal state.",
        "arg": "The body is stable, but an uncommanded temperature gradient is flexing the instrument bench. Correct the thermal configuration and reacquire the target."
      },
      "sig": {
        "pointing": "drift",
        "gradient": "high",
        "gyro": "normal",
        "tracker": "good",
        "thruster": "off",
        "wheel": "normal",
        "heater": "off",
        "sun": "changed"
      }
    },
    "heatercycle": {
      "label": "Scheduled heater-cycle settling",
      "call": {
        "title": "Expected heater settling — monitor.",
        "arg": "A commanded heater cycle is producing a known temporary boresight drift. Continue the approved settling timeline."
      },
      "sig": {
        "pointing": "drift",
        "gradient": "high",
        "gyro": "normal",
        "tracker": "good",
        "thruster": "off",
        "wheel": "normal",
        "heater": "on",
        "sun": "normal"
      }
    }
  },
  "dismissal": "heatercycle",
  "reassuring": {
    "lab": "Spacecraft mode",
    "val": "FINE POINTING — control loop closed",
    "note": "The controller is active, but it can follow a false attitude solution or remain closed while an external torque or structural shift moves the line of sight."
  },
  "rounds": [
    {
      "answer": "badtracker",
      "alarm": "pointing",
      "poleA": {
        "lab": "Pointing solution",
        "val": "0.82° instantaneous jump",
        "note": "The reported line of sight moved in one telemetry frame without a matching body-rate impulse."
      },
      "hook": "While tracking a calibration star, the attitude solution suddenly jumps almost a degree. Fine-pointing mode remains closed and the wheels sound quiet.",
      "riddle": "Did the spacecraft really move — <span class=\"q\">or did the star camera move only the reported sky?</span>",
      "vals": {
        "pointing": "0.82° jump in one frame",
        "gradient": "0.6°C, stable",
        "gyro": "0.003°/s, unchanged",
        "tracker": "centroid residual 42 arcsec; 7 stars rejected",
        "thruster": "no command, no coil current, no chamber pressure",
        "wheel": "0.02 N·m, nominal",
        "heater": "all bench heaters off",
        "sun": "Sun angle unchanged at 64°"
      },
      "reasons": {
        "thrusterfault": "A real thruster torque would produce body rotation, wheel counter-torque, and propulsion evidence. Gyros are unchanged and every valve/current channel is quiet.",
        "thermal": "Thermal flexure produces a gradual boresight drift with a growing temperature gradient, not an instantaneous 0.82° jump at a stable 0.6°C gradient.",
        "heatercycle": "A scheduled heater settling event would have an active heater command and a gradual, characterized drift. The heaters are off and the tracker fit itself is poor."
      },
      "resolve": {
        "title": "Bad star-tracker solution — the attitude estimate jumped, not the spacecraft.",
        "paras": [
          "The star tracker rejects seven stars and its centroid residual grows to 42 arcsec, yet the gyros, reaction wheels, thrusters, Sun angle, and temperature gradient remain unchanged. Reject the faulty optical solution and use the healthy attitude sources while the tracker reacquires.",
          "This is a naked single. Only the tracker fault produces an instantaneous pointing jump on the loud panel. Every physical torque or thermal mechanism produces a drift rather than a one-frame discontinuity."
        ],
        "why": {
          "loud": "<b>Why the loud reading was enough</b>: the instantaneous jump is unique to a failed attitude solution in this differential.",
          "quiet": "<b>Why closed-loop mode is not proof</b>: a controller can remain closed while being fed a bad measurement."
        },
        "chain": [
          "Star centroids are misidentified or corrupted",
          "The attitude filter accepts a false optical solution",
          "Reported pointing jumps without physical body motion"
        ],
        "take": "Before firing actuators at an attitude jump, ask whether an independent rate sensor saw the spacecraft move."
      }
    },
    {
      "answer": "thrusterfault",
      "alarm": "pointing",
      "poleA": {
        "lab": "Boresight error",
        "val": "Drifting 0.09°/min",
        "note": "The target walks steadily off the detector while a wheel fights a persistent torque."
      },
      "hook": "During a long inertial stare, the target begins sliding across the focal plane. The payload bench remains thermally uniform.",
      "riddle": "Is the line of sight flexing — <span class=\"q\">or is an uncommanded force rotating the entire spacecraft?</span>",
      "vals": {
        "pointing": "0.09°/min steady drift",
        "gradient": "0.7°C, stable",
        "gyro": "0.087°/min about yaw",
        "tracker": "8 arcsec residual; solution valid",
        "thruster": "yaw jet B: 38 mA coil current and chamber-pressure pulses with no command",
        "wheel": "0.31 N·m sustained counter-torque",
        "heater": "bench heaters off",
        "sun": "Sun angle unchanged at 51°"
      },
      "reasons": {
        "badtracker": "A bad tracker can create an apparent pointing error, but the tracker fit is healthy and the gyro measures the same yaw rate. The body is actually rotating.",
        "thermal": "Thermal distortion can drift the boresight, but it should require a temperature gradient and need little wheel counter-torque. The gradient is normal while the wheel fights a large sustained torque.",
        "heatercycle": "A planned heater cycle would have an active command and a high gradient. No heater is commanded, the bench is uniform, and propulsion telemetry identifies an uncommanded jet."
      },
      "resolve": {
        "title": "Uncommanded thruster torque — a yaw jet is physically rotating the spacecraft.",
        "paras": [
          "Gyro rate, star-tracker attitude, and the science boresight all drift together. Reaction-wheel counter-torque is high, and yaw jet B shows coil current and chamber-pressure pulses without a command. Isolate that propulsion branch and recover pointing.",
          "This is one clear line across the loud readings. A drift is shared with both thermal explanations, and a normal temperature gradient is shared with the tracker fault. Only drift plus a normal gradient isolates the real torque."
        ],
        "why": {
          "loud": "<b>Why both loud readings are needed</b>: drift alone could be thermal, while a normal gradient alone could accompany a tracker problem.",
          "quiet": "<b>Why propulsion telemetry clinches it</b>: uncommanded current and chamber pressure identify the source of the external torque."
        },
        "chain": [
          "A thruster valve or driver fires without command",
          "The jet applies continuous yaw torque",
          "Gyros and boresight drift while wheels oppose the motion"
        ],
        "take": "A real external torque appears in body-rate and actuator telemetry, not only in an optical line of sight."
      }
    },
    {
      "answer": "thermal",
      "alarm": "pointing",
      "poleA": {
        "lab": "Boresight error",
        "val": "Drifting with a hot-side gradient",
        "note": "The instrument line of sight walks off target while the spacecraft body remains inertially quiet."
      },
      "hook": "After a new Sun-angle geometry, the science boresight drifts steadily. The same loud pattern sometimes appears during an approved heater-settling period.",
      "riddle": "The bench is hot on one side — <span class=\"q\">is this the commanded thermal cycle, or an unplanned illumination-driven distortion?</span>",
      "vals": {
        "pointing": "0.045°/min steady drift",
        "gradient": "8.4°C across the optical bench",
        "gyro": "0.002°/min, near zero",
        "tracker": "7 arcsec residual; bus attitude stable",
        "thruster": "no command or pressure response",
        "wheel": "0.03 N·m, nominal",
        "heater": "no heater cycle commanded",
        "sun": "Sun angle changed from 68° to 29° after maneuver"
      },
      "reasons": {
        "heatercycle": "A scheduled heater cycle shares the loud pattern of pointing drift plus a large temperature gradient. Here no heater command exists and the drift begins after a major Sun-angle change, so the heating is unplanned.",
        "badtracker": "A tracker fault would degrade the star fit or jump the reported attitude. The tracker solution is good and the bus attitude remains stable while only the payload boresight drifts.",
        "thrusterfault": "A thruster torque would appear in gyro rate, wheel counter-torque, and propulsion telemetry. All three are quiet."
      },
      "resolve": {
        "title": "Unplanned thermal distortion — sunlight is flexing the instrument bench.",
        "paras": [
          "The bus attitude is stable, but the optical bench has developed an 8.4°C gradient after the Sun angle changed sharply. With heaters off, the line-of-sight drift is an unplanned thermoelastic shift rather than the expected response to a scheduled heater cycle.",
          "This is where the loud gauges tie. Both unplanned thermal distortion and approved heater settling show a drifting boresight with a high temperature gradient. The deeper question is which heat source is active: commanded heaters or changed external illumination."
        ],
        "why": {
          "loud": "<b>Why the loud gauges cannot decide</b>: either thermal scenario bends the bench and moves the boresight without rotating the spacecraft body.",
          "quiet": "<b>Why this is unplanned</b>: the heater command is absent and the timing follows a large Sun-angle change."
        },
        "chain": [
          "New illumination heats one side of the bench",
          "Differential expansion changes instrument alignment",
          "Science pointing drifts while bus attitude stays fixed"
        ],
        "take": "When two thermal signatures tie, identify the heat source: commanded power and external illumination leave different telemetry trails."
      }
    }
  ],
  "schematic": {
    "viewBox": "0 0 520 390",
    "svg": "\n<text x=\"260\" y=\"24\" class=\"eqlbl\" text-anchor=\"middle\" style=\"fill:#5a7f96\">SPACECRAFT ATTITUDE SYSTEM</text>\n<rect x=\"185\" y=\"120\" width=\"150\" height=\"110\" rx=\"18\" fill=\"#173e59\" stroke=\"#70c9f2\" stroke-width=\"2\"/>\n<rect x=\"215\" y=\"72\" width=\"90\" height=\"48\" rx=\"8\" fill=\"#173e59\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<text x=\"260\" y=\"101\" class=\"lbl\" text-anchor=\"middle\">science bench</text>\n<path d=\"M185,145 L95,105 L95,245 L185,205 M335,145 L425,105 L425,245 L335,205\" fill=\"#173e59\" stroke=\"#70c9f2\" stroke-width=\"2\"/>\n<text x=\"260\" y=\"252\" class=\"lbl\" text-anchor=\"middle\">spacecraft bus</text>\n<circle cx=\"135\" cy=\"165\" r=\"25\" fill=\"#173e59\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<text x=\"135\" y=\"170\" class=\"lbl\" text-anchor=\"middle\">tracker</text>\n<circle cx=\"385\" cy=\"165\" r=\"20\" fill=\"#173e59\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<text x=\"385\" y=\"170\" class=\"lbl\" text-anchor=\"middle\">jet</text>\n<circle cx=\"360\" cy=\"85\" r=\"22\" fill=\"#173e59\" stroke=\"#70c9f2\" stroke-width=\"2\"/>\n<text x=\"360\" y=\"90\" class=\"lbl\" text-anchor=\"middle\">wheel</text>\n<rect x=\"180\" y=\"285\" width=\"160\" height=\"55\" rx=\"10\" fill=\"rgba(112,201,242,.06)\" stroke=\"#385b70\"/>\n<text x=\"260\" y=\"309\" class=\"lbl\" text-anchor=\"middle\">heaters / thermal sensors</text>\n<text x=\"260\" y=\"327\" class=\"lbl\" text-anchor=\"middle\">Sun-angle geometry</text>\n<line x1=\"255\" y1=\"95\" x2=\"255\" y2=\"72\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"255\" y1=\"260\" x2=\"255\" y2=\"285\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"95\" y1=\"165\" x2=\"110\" y2=\"165\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"92\" y1=\"75\" x2=\"112\" y2=\"145\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"420\" y1=\"165\" x2=\"405\" y2=\"165\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"360\" y1=\"85\" x2=\"330\" y2=\"115\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"405\" y1=\"275\" x2=\"335\" y2=\"300\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"145\" y1=\"300\" x2=\"185\" y2=\"300\" stroke=\"#efca72\" stroke-width=\"2\"/>"
  }
} };
