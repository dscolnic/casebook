// Diagnosis data pack — generated for the Diagnosis engine.
module.exports = { PACK: {
  "id": "wellcontrol",
  "title": "Well-Control Watch",
  "domain": "Offshore drilling well control",
  "role": "You are the drilling supervisor interpreting a possible influx.",
  "system": {
    "parts": [
      [
        "Mud circulation",
        "Pumps send drilling fluid down the drillpipe and returns come up the annulus. With steady pumps, flow out should match flow in after normal lag."
      ],
      [
        "Active pits and trip tank",
        "Surface tanks measure drilling-fluid inventory. Unexplained pit gain means extra fluid may be entering the circulating system; transfers and bad level sensors can mimic it."
      ],
      [
        "Flow check",
        "When pumps stop, a static well should stop flowing after brief drainage. Continued return flow is a direct positive kick indicator unless a known surface bleed path is open."
      ],
      [
        "Formation and hydrostatic pressure",
        "A kick begins when formation pressure exceeds effective wellbore pressure and formation fluid enters the well."
      ],
      [
        "BOP and shut-in pressures",
        "The blowout preventer can close the well. Shut-in drillpipe and casing pressures help confirm an influx and plan circulation, but available equipment does not prove the well is static."
      ]
    ],
    "soWrong": "So one pit alarm is not enough. The crew must decide whether volume came from the formation, from another surface tank, from a planned bleed, or only from a bad gauge. The dangerous question is always: where did the extra fluid originate?"
  },
  "salient": [
    "pit",
    "flowoff"
  ],
  "readings": {
    "pit": {
      "name": "Active-pit volume",
      "purpose": "Total fluid in the active mud pits. An unexplained sustained gain can indicate formation influx; a step change may be a bad level channel, and a surface transfer can create a real gain without a kick.",
      "pin": {
        "x": 110,
        "y": 295
      },
      "zone": "surface"
    },
    "flowoff": {
      "name": "Return flow with pumps off",
      "purpose": "Flow from the well after circulation pumps stop. Continued flow is a positive kick sign unless a documented surface pressure or transfer path is producing it.",
      "pin": {
        "x": 270,
        "y": 170
      },
      "zone": "flowline"
    },
    "trip": {
      "name": "Independent trip-tank balance",
      "purpose": "Small calibrated tank used to measure displacement and returns. It cross-checks the larger pit system and helps expose a bad pit-level channel.",
      "pin": {
        "x": 65,
        "y": 205
      },
      "zone": "surface"
    },
    "gas": {
      "name": "Flowline gas units",
      "purpose": "Gas detected in returning mud. Rising gas supports formation fluid entering and expanding; ordinary surface transfer or a level-gauge fault does not create a gas increase.",
      "pin": {
        "x": 335,
        "y": 110
      },
      "zone": "flowline"
    },
    "sidpp": {
      "name": "Shut-in drillpipe pressure",
      "purpose": "Pressure measured after the well is shut in. Unexpected positive pressure during an underbalanced test supports formation pressure acting into the well.",
      "pin": {
        "x": 360,
        "y": 250
      },
      "zone": "wellhead"
    },
    "sicp": {
      "name": "Shut-in casing pressure",
      "purpose": "Annular shut-in pressure. Rising pressure with confirmed influx supports a real kick rather than a surface-volume accounting issue.",
      "pin": {
        "x": 410,
        "y": 280
      },
      "zone": "wellhead"
    },
    "pumps": {
      "name": "Pump strokes and flow-in",
      "purpose": "Actual pump rate. It distinguishes extra returns from a commanded increase in flow-in and verifies that a pumps-off flow check is truly pumps off.",
      "pin": {
        "x": 185,
        "y": 75
      },
      "zone": "pumps"
    },
    "valves": {
      "name": "Surface valve and transfer lineup",
      "purpose": "Valve positions and transfer-pump status. An open transfer or bleed path can explain real pit gain or flow without formation influx.",
      "pin": {
        "x": 115,
        "y": 110
      },
      "zone": "surface"
    },
    "mudwt": {
      "name": "Mud density at returns",
      "purpose": "Returning mud density. Gas-cut or lighter returns support formation influx; unchanged density supports a benign surface source.",
      "pin": {
        "x": 310,
        "y": 330
      },
      "zone": "mud"
    }
  },
  "hypotheses": {
    "gaugefault": {
      "label": "Pit-level gauge fault",
      "call": {
        "title": "Pit gauge fault — use the independent volume balance.",
        "arg": "The active-pit display jumped without physical return flow or trip-tank gain. Remove the bad level channel from the decision."
      },
      "sig": {
        "pit": "jump",
        "flowoff": "none",
        "trip": "steady",
        "gas": "normal",
        "sidpp": "zero",
        "sicp": "zero",
        "pumps": "off",
        "valves": "closed",
        "mudwt": "normal"
      }
    },
    "transfer": {
      "label": "Unrecorded surface transfer",
      "call": {
        "title": "Surface transfer — correct the valve lineup.",
        "arg": "Fluid is entering the active pits from another surface tank, not from the formation. Stop the transfer and repair the volume-accounting error."
      },
      "sig": {
        "pit": "gain",
        "flowoff": "none",
        "trip": "gain",
        "gas": "normal",
        "sidpp": "zero",
        "sicp": "zero",
        "pumps": "off",
        "valves": "transfer-open",
        "mudwt": "normal"
      }
    },
    "kick": {
      "label": "Formation-fluid kick",
      "call": {
        "title": "Kick — shut in the well and execute the well-control plan.",
        "arg": "Unexplained pit gain and pumps-off flow are supported by gas and positive shut-in pressures. Treat this as formation influx immediately."
      },
      "sig": {
        "pit": "gain",
        "flowoff": "flow",
        "trip": "gain",
        "gas": "high",
        "sidpp": "positive",
        "sicp": "positive",
        "pumps": "off",
        "valves": "closed",
        "mudwt": "light"
      }
    },
    "bleed": {
      "label": "Documented trapped-pressure bleed",
      "call": {
        "title": "Planned bleed-off — monitor the measured volume.",
        "arg": "A known trapped surface volume is being bled into the trip tank. The planned volume and valve path explain the temporary flow."
      },
      "sig": {
        "pit": "gain",
        "flowoff": "flow",
        "trip": "gain",
        "gas": "normal",
        "sidpp": "zero",
        "sicp": "zero",
        "pumps": "off",
        "valves": "bleed-open",
        "mudwt": "normal"
      }
    }
  },
  "dismissal": "bleed",
  "reassuring": {
    "lab": "BOP control status",
    "val": "BOTH PODS ONLINE — accumulator charged",
    "note": "Available blowout-preventer controls are essential, but they do not show whether formation fluid is already entering the well."
  },
  "rounds": [
    {
      "answer": "gaugefault",
      "alarm": "pit",
      "poleA": {
        "lab": "Pit-volume alarm",
        "val": "Instantaneous 42-bbl increase",
        "note": "The main pit display jumps in one scan, but no corresponding fluid movement is visible."
      },
      "hook": "During a static flow check, the active-pit total suddenly rises by forty-two barrels. The flowline remains dry and the independent trip tank does not move.",
      "riddle": "Did fluid enter the system — <span class=\"q\">or did only one level calculation change?</span>",
      "vals": {
        "pit": "42-bbl step increase in one 2-second scan",
        "flowoff": "0 bbl/min after drainage",
        "trip": "0.3-bbl variation, steady",
        "gas": "background 4 units",
        "sidpp": "0 psi",
        "sicp": "0 psi",
        "pumps": "0 strokes/min",
        "valves": "all transfer and bleed valves confirmed closed",
        "mudwt": "14.2 ppg, unchanged"
      },
      "reasons": {
        "transfer": "A surface transfer produces a real inventory gain and should appear in the independent trip-tank or transfer-meter balance. The trip tank is steady and every transfer valve is closed.",
        "kick": "A kick can increase pit volume, but real fluid entering the well system should produce return flow, and often gas or positive shut-in pressure. Flow is zero and both pressures are zero.",
        "bleed": "A planned bleed would have an open bleed path, actual flow, and a measured physical volume. The valve lineup is closed and no fluid moves."
      },
      "resolve": {
        "title": "Pit-level gauge fault — the indicated gain has no physical volume behind it.",
        "paras": [
          "The main pit total changes by 42 barrels in one scan while the calibrated trip tank, flowline, gas detector, mud density, and pressures remain unchanged. The level channel or volume calculation is faulty; continue monitoring from the independent balance.",
          "This is a naked single. Only the gauge fault produces an instantaneous pit-volume jump. The physical causes produce sustained gains as fluid actually moves."
        ],
        "why": {
          "loud": "<b>Why the loud reading was enough</b>: a one-scan step is unique to the instrument fault in this differential.",
          "quiet": "<b>Why BOP readiness does not settle it</b>: equipment status says nothing about whether the pit measurement is physically real."
        },
        "chain": [
          "Level channel or calculation fails",
          "Displayed pit total jumps without fluid motion",
          "Independent tank and flow measurements reject the alarm"
        ],
        "take": "Inventory changes must close across independent volume measurements; a number that moves alone is not fluid."
      }
    },
    {
      "answer": "transfer",
      "alarm": "pit",
      "poleA": {
        "lab": "Active pits",
        "val": "Gaining 3.1 bbl/min",
        "note": "The gain is real, but the well itself stops flowing when the pumps stop."
      },
      "hook": "Pit volume climbs steadily during a circulation pause. The crew initially calls a kick, yet the flowline falls dry within seconds.",
      "riddle": "If the pits are truly gaining — <span class=\"q\">is the extra mud coming up the well or sideways from another tank?</span>",
      "vals": {
        "pit": "18.6-bbl sustained gain over 6 minutes",
        "flowoff": "0 bbl/min 20 seconds after pumps stop",
        "trip": "18.1-bbl measured gain",
        "gas": "background 5 units",
        "sidpp": "0 psi",
        "sicp": "0 psi",
        "pumps": "0 strokes/min",
        "valves": "reserve-to-active transfer valve open; transfer pump running",
        "mudwt": "14.2 ppg, unchanged"
      },
      "reasons": {
        "gaugefault": "A bad level channel can create an apparent gain, but the independent trip-tank balance confirms about eighteen barrels of real fluid.",
        "kick": "A formation influx should continue producing flow from the well with pumps off or create positive shut-in pressure. The flowline is dry and both pressures are zero.",
        "bleed": "A trapped-pressure bleed would produce temporary flow through a documented bleed path. Here the reserve transfer pump is running and the well flowline itself is dry."
      },
      "resolve": {
        "title": "Unrecorded surface transfer — the pits are gaining from another tank.",
        "paras": [
          "The gain is physical because the trip tank confirms it, but it is not coming from the formation: the well stops flowing, shut-in pressures are zero, gas and mud density are normal, and the reserve-to-active transfer valve and pump are open. Stop the transfer and correct the lineup.",
          "This is one clear line across the loud readings. Sustained pit gain is shared with the kick and planned bleed, while no pumps-off flow is shared with the gauge fault. Only real gain plus no well flow identifies a surface transfer."
        ],
        "why": {
          "loud": "<b>Why both loud readings are needed</b>: pit gain proves volume appeared, while the dry flowline proves it did not come up the well.",
          "quiet": "<b>Why the valve lineup seals it</b>: an open transfer path identifies the surface source of the extra mud."
        },
        "chain": [
          "Reserve transfer valve is left open",
          "Mud moves into the active system",
          "Pit volume rises without formation flow"
        ],
        "take": "When volume rises, trace the plumbing: surface inventory can move even while the well is static."
      }
    },
    {
      "answer": "kick",
      "alarm": "flowoff",
      "poleA": {
        "lab": "Flow check",
        "val": "Well continues flowing with pumps off",
        "note": "Pit volume and return flow rise together during a test that should leave the well static."
      },
      "hook": "During a negative-pressure test, pumps are stopped and the crew expects the well to settle. Instead, returns continue and the active pits gain volume.",
      "riddle": "A benign trapped-pressure bleed can look the same at first — <span class=\"q\">so is the flow consuming a known surface volume, or is the formation feeding the well?</span>",
      "vals": {
        "pit": "26-bbl sustained gain and still increasing",
        "flowoff": "2.8 bbl/min for 11 minutes with pumps off",
        "trip": "25.4-bbl confirmed gain",
        "gas": "gas rises from 6 to 185 units",
        "sidpp": "1,380 psi and rebuilding after bleed attempt",
        "sicp": "620 psi, rising",
        "pumps": "0 strokes/min",
        "valves": "no authorized bleed or transfer path open",
        "mudwt": "returns fall from 14.2 to 12.9 ppg with gas cutting"
      },
      "reasons": {
        "bleed": "A documented trapped-pressure bleed shares the loud pattern of pit gain and pumps-off flow. But it should follow an open bleed path, stop after the calculated trapped volume, contain no new gas, and leave shut-in pressures near zero. None of those conditions holds.",
        "gaugefault": "A gauge fault cannot create independently confirmed trip-tank gain, sustained flow, gas-cut mud, or positive shut-in pressures.",
        "transfer": "A surface transfer can produce pit gain, but it does not make the well flow with pumps off or generate rising gas and shut-in pressures."
      },
      "resolve": {
        "title": "Formation-fluid kick — the well is feeding the surface system.",
        "paras": [
          "The well continues flowing for eleven minutes with pumps off, both pit systems confirm a growing gain, returning mud becomes gas-cut and lighter, and shut-in pressures are positive and rebuilding. With no authorized bleed path open, formation fluid is entering the well. Shut in and execute the well-control plan.",
          "This is where the loud gauges tie. A real kick and a benign trapped-pressure bleed can both create pit gain and pumps-off flow. The deeper question is where the fluid originated. Gas, lighter returns, persistent flow beyond any planned volume, and rebuilding shut-in pressure point below the wellhead."
        ],
        "why": {
          "loud": "<b>Why the loud gauges cannot decide</b>: both an influx and an intentional bleed can move fluid to the pits while pumps are stopped.",
          "quiet": "<b>Why this is a kick</b>: no surface path is open, gas and light returns appear, and formation pressure rebuilds after the attempted bleed."
        },
        "chain": [
          "Wellbore pressure falls below formation pressure",
          "Formation gas and fluid enter and expand upward",
          "Pits gain and the well flows with pumps off"
        ],
        "take": "Never explain away pumps-off flow until the source volume closes: formation influx and surface bleed have different pressure, gas, and valve evidence."
      }
    }
  ],
  "schematic": {
    "viewBox": "0 0 520 390",
    "svg": "\n<text x=\"260\" y=\"24\" class=\"eqlbl\" text-anchor=\"middle\" style=\"fill:#5a7f96\">OFFSHORE WELL-CONTROL SYSTEM</text>\n<rect x=\"40\" y=\"245\" width=\"150\" height=\"90\" rx=\"12\" fill=\"rgba(112,201,242,.06)\" stroke=\"#385b70\"/>\n<text x=\"115\" y=\"272\" class=\"lbl\" text-anchor=\"middle\">active pits / trip tank</text>\n<path d=\"M65,310 H165\" stroke=\"#70c9f2\" stroke-width=\"12\" opacity=\".5\"/>\n<rect x=\"230\" y=\"70\" width=\"80\" height=\"80\" rx=\"12\" fill=\"#173e59\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<text x=\"270\" y=\"115\" class=\"lbl\" text-anchor=\"middle\">pumps</text>\n<path d=\"M270,150 V335\" stroke=\"#70c9f2\" stroke-width=\"8\"/>\n<path d=\"M292,150 V335\" stroke=\"#efca72\" stroke-width=\"8\"/>\n<rect x=\"235\" y=\"155\" width=\"92\" height=\"45\" rx=\"8\" fill=\"#173e59\" stroke=\"#70c9f2\" stroke-width=\"2\"/>\n<text x=\"281\" y=\"184\" class=\"lbl\" text-anchor=\"middle\">BOP / wellhead</text>\n<path d=\"M292,170 H390 V275 H190\" fill=\"none\" stroke=\"#efca72\" stroke-width=\"5\"/>\n<text x=\"395\" y=\"245\" class=\"lbl\" text-anchor=\"middle\">flowline</text>\n<path d=\"M270,335 L245,375 H317 L292,335\" fill=\"#173e59\" stroke=\"#70c9f2\" stroke-width=\"2\"/>\n<text x=\"281\" y=\"385\" class=\"lbl\" text-anchor=\"middle\">formation</text>\n<rect x=\"375\" y=\"70\" width=\"105\" height=\"75\" rx=\"10\" fill=\"rgba(112,201,242,.06)\" stroke=\"#385b70\"/>\n<text x=\"427\" y=\"98\" class=\"lbl\" text-anchor=\"middle\">gas / mud</text><text x=\"427\" y=\"117\" class=\"lbl\" text-anchor=\"middle\">return sensors</text>\n<rect x=\"45\" y=\"70\" width=\"120\" height=\"75\" rx=\"10\" fill=\"rgba(112,201,242,.06)\" stroke=\"#385b70\"/>\n<text x=\"105\" y=\"98\" class=\"lbl\" text-anchor=\"middle\">surface valves</text><text x=\"105\" y=\"117\" class=\"lbl\" text-anchor=\"middle\">& transfers</text>\n<line x1=\"110\" y1=\"295\" x2=\"110\" y2=\"335\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"65\" y1=\"205\" x2=\"85\" y2=\"245\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"270\" y1=\"170\" x2=\"245\" y2=\"170\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"335\" y1=\"110\" x2=\"390\" y2=\"110\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"360\" y1=\"250\" x2=\"325\" y2=\"190\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"410\" y1=\"280\" x2=\"330\" y2=\"190\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"185\" y1=\"75\" x2=\"230\" y2=\"90\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"115\" y1=\"110\" x2=\"165\" y2=\"135\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"310\" y1=\"330\" x2=\"292\" y2=\"330\" stroke=\"#efca72\" stroke-width=\"2\"/>"
  }
} };
