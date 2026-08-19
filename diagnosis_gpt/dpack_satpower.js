// Diagnosis data pack — L2/L3/L4 with structural logic diversity.
module.exports = { PACK: {
  "id": "satpower",
  "title": "Power Margin",
  "domain": "Spacecraft electrical power",
  "role": "You are the spacecraft power-systems controller.",
  "intro": {
    "title": "How this system works",
    "lead": "A solar-powered spacecraft must continuously balance generation, storage, and load. Solar arrays power the bus in sunlight and charge the battery; the battery supports the bus during eclipse or when demand briefly exceeds array output. Voltage regulation keeps sensitive electronics inside a narrow operating band.",
    "cards": [
      {
        "title": "How power flows",
        "body": "Sunlight becomes array current, regulators hold the main bus voltage, loads draw power, and the battery absorbs or supplies the difference."
      },
      {
        "title": "How failures appear",
        "body": "Shadowing reduces array current, a load surge increases demand, and battery aging raises internal resistance so voltage sags even at ordinary current."
      },
      {
        "title": "What telemetry measures",
        "body": "Bus voltage, array current, battery current, load commands, temperature, and resistance estimates reveal whether the problem is generation, demand, storage, or instrumentation."
      },
      {
        "title": "Why context matters",
        "body": "Battery discharge during a planned eclipse is normal. A single biased current channel can also imitate a power imbalance, so controllers compare redundant measurements and Sun geometry."
      }
    ],
    "takeaway": "The loud reading gets your attention, but the right explanation is the one that fits the whole panel."
  },
  "system": {
    "parts": [
      [
        "Solar array",
        "Generates electrical power when illuminated and correctly pointed."
      ],
      [
        "Power regulator",
        "Conditions array output and holds the spacecraft bus near its design voltage."
      ],
      [
        "Battery",
        "Stores energy and supports the bus during eclipse or short demand peaks."
      ],
      [
        "Loads",
        "Payloads, heaters, communications, and actuators consume commanded power."
      ],
      [
        "Telemetry",
        "Redundant current, voltage, temperature, and attitude data close the power balance."
      ]
    ],
    "soWrong": "A low bus voltage can come from weak generation, excessive demand, a degraded battery, or a misleading sensor. The array, load, battery, and Sun geometry must tell one consistent story."
  },
  "salient": [
    "busv",
    "battcur"
  ],
  "readings": {
    "busv": {
      "name": "Main-bus voltage",
      "purpose": "Shows whether the power system is maintaining its regulated electrical pressure. A sag can follow excess load, weak generation, or battery resistance.",
      "pin": {
        "x": 260,
        "y": 158
      },
      "zone": "bus"
    },
    "battcur": {
      "name": "Battery current",
      "purpose": "Shows whether the battery is charging or discharging and by how much. The direction is meaningful only when compared with array and load telemetry.",
      "pin": {
        "x": 260,
        "y": 285
      },
      "zone": "storage"
    },
    "array": {
      "name": "Solar-array current",
      "purpose": "Measures generated current. A drop supports shadowing, poor Sun pointing, or array damage rather than a pure load event.",
      "pin": {
        "x": 110,
        "y": 150
      },
      "zone": "generation"
    },
    "load": {
      "name": "Commanded load power",
      "purpose": "Sums active payload and spacecraft loads. A command or fault that turns on extra equipment can exceed the available margin.",
      "pin": {
        "x": 430,
        "y": 160
      },
      "zone": "loads"
    },
    "battemp": {
      "name": "Battery temperature",
      "purpose": "Battery heating can accompany high internal resistance or sustained current. Temperature alone does not identify whether the current is expected.",
      "pin": {
        "x": 220,
        "y": 310
      },
      "zone": "storage"
    },
    "resist": {
      "name": "Battery resistance estimate",
      "purpose": "Pulse tests estimate internal resistance. Rising resistance causes larger voltage sag under the same current and is a direct sign of degradation.",
      "pin": {
        "x": 300,
        "y": 310
      },
      "zone": "storage"
    },
    "sun": {
      "name": "Sun angle / eclipse state",
      "purpose": "Confirms whether the array should be illuminated. Planned eclipse and unexpected shadowing both reduce generation but have different geometry and timelines.",
      "pin": {
        "x": 68,
        "y": 72
      },
      "zone": "attitude"
    },
    "cur2": {
      "name": "Redundant battery-current channel",
      "purpose": "An independent shunt or telemetry chain confirms whether the battery current is real or a biased sensor.",
      "pin": {
        "x": 330,
        "y": 245
      },
      "zone": "telemetry"
    },
    "command": {
      "name": "Load authorization state",
      "purpose": "Compares measured power draw with the command and mission schedule. A legitimate calibration and an uncommanded load can draw the same power until authorization is checked.",
      "pin": {
        "x": 405,
        "y": 75
      },
      "zone": "command"
    },
    "relax": {
      "name": "Battery pulse-relaxation time",
      "purpose": "Measures how quickly terminal voltage recovers after a diagnostic pulse. Slow recovery supports electrochemical degradation, while a resistance-estimation bias can report high resistance without changing relaxation.",
      "pin": {
        "x": 165,
        "y": 305
      },
      "zone": "battery"
    },
    "switch": {
      "name": "Payload switch state",
      "purpose": "Shows whether a physical power switch is unexpectedly closed. High computed load can come from a meter bias, but an unexpected switch state proves equipment is actually energized.",
      "pin": {
        "x": 430,
        "y": 260
      },
      "zone": "payload"
    },
    "eventflag": {
      "name": "Autonomy anomaly flag",
      "purpose": "Shows whether onboard software recognized an unexpected event. Both an uncommanded load and an attitude-driven shadow can raise an anomaly flag, while a scheduled calibration is marked planned.",
      "pin": {
        "x": 465,
        "y": 300
      },
      "zone": "command"
    }
  },
  "hypotheses": {
    "shadow": {
      "label": "Unexpected solar-array shadowing",
      "choice": "Array generation falls while the battery discharges heavily to hold the bus, despite ordinary load commands.",
      "call": {
        "title": "Restore illumination or protect the load.",
        "arg": "The spacecraft has lost solar input outside the planned eclipse timeline."
      },
      "sig": {
        "busv": "down",
        "battcur": "high",
        "array": "low",
        "load": "normal",
        "battemp": "normal",
        "resist": "normal",
        "sun": "off-sun",
        "cur2": "agree",
        "command": "none",
        "relax": "normal",
        "switch": "normal",
        "eventflag": "unexpected"
      }
    },
    "authorized": {
      "label": "Scheduled payload calibration",
      "choice": "A planned calibration intentionally raises load and battery discharge; the command record and expected switch state should document it.",
      "call": {
        "title": "Scheduled payload calibration",
        "arg": "The power draw is authorized and within the planned test."
      },
      "sig": {
        "busv": "down",
        "battcur": "high",
        "array": "normal",
        "load": "high",
        "battemp": "high",
        "resist": "normal",
        "sun": "sunlit",
        "cur2": "agree",
        "command": "scheduled",
        "relax": "normal",
        "switch": "closed",
        "eventflag": "planned"
      }
    },
    "sensor": {
      "label": "Battery-current sensor bias",
      "choice": "One current channel reports a false imbalance while bus voltage, array output, loads, and the redundant channel remain normal.",
      "call": {
        "title": "Use the healthy current channel.",
        "arg": "Service the biased telemetry chain rather than changing spacecraft power configuration."
      },
      "sig": {
        "busv": "normal",
        "battcur": "normal",
        "array": "normal",
        "load": "normal",
        "battemp": "normal",
        "resist": "high",
        "sun": "sunlit",
        "cur2": "disagree",
        "command": "none",
        "relax": "normal",
        "switch": "normal",
        "eventflag": "none"
      }
    },
    "battery": {
      "label": "Battery degradation",
      "choice": "Higher internal resistance makes the bus sag under ordinary current and heats the battery even though generation and loads are normal.",
      "call": {
        "title": "Reduce risk and assess the battery.",
        "arg": "The storage system is losing voltage margin; protect essential loads and evaluate the degraded battery."
      },
      "sig": {
        "busv": "down",
        "battcur": "normal",
        "array": "normal",
        "load": "normal",
        "battemp": "high",
        "resist": "high",
        "sun": "sunlit",
        "cur2": "agree",
        "command": "none",
        "relax": "slow",
        "switch": "normal",
        "eventflag": "none"
      }
    },
    "eclipse": {
      "label": "Unexpected orbital shadow",
      "choice": "An unpredicted occultation removes array power with eclipse geometry, rather than a commanded and expected mission eclipse.",
      "call": {
        "title": "Continue eclipse operations.",
        "arg": "The power system is following the approved eclipse timeline and retains expected margin."
      },
      "sig": {
        "busv": "normal",
        "battcur": "high",
        "array": "low",
        "load": "normal",
        "battemp": "normal",
        "resist": "normal",
        "sun": "eclipse",
        "cur2": "agree",
        "command": "none",
        "relax": "normal",
        "switch": "normal",
        "eventflag": "none"
      }
    },
    "loadsurge": {
      "label": "Uncommanded load surge",
      "choice": "An unexpected load draws heavy battery current and pulls the bus down while the solar array remains available.",
      "call": {
        "title": "Isolate the excess load.",
        "arg": "A spacecraft or payload load is above command; shed or isolate it according to the power plan."
      },
      "sig": {
        "busv": "down",
        "battcur": "high",
        "array": "normal",
        "load": "high",
        "battemp": "high",
        "resist": "normal",
        "sun": "sunlit",
        "cur2": "agree",
        "command": "none",
        "relax": "normal",
        "switch": "closed",
        "eventflag": "unexpected"
      }
    },
    "resistbias": {
      "label": "Battery-resistance estimator bias",
      "choice": "The resistance estimate is high, but pulse recovery, temperature, and redundant electrical channels do not show a degraded battery.",
      "call": {
        "title": "Resistance-estimator bias",
        "arg": "Recompute resistance from raw pulse telemetry."
      },
      "sig": {
        "busv": "normal",
        "battcur": "normal",
        "array": "normal",
        "load": "normal",
        "battemp": "normal",
        "resist": "high",
        "sun": "sunlit",
        "cur2": "agree",
        "command": "none",
        "relax": "normal",
        "switch": "normal",
        "eventflag": "none"
      }
    },
    "loadmeter": {
      "label": "Load-power meter bias",
      "choice": "Computed load is high without an unexpected closed switch or corresponding battery current.",
      "call": {
        "title": "Load-power meter bias",
        "arg": "Verify branch current before shedding equipment."
      },
      "sig": {
        "busv": "normal",
        "battcur": "normal",
        "array": "normal",
        "load": "high",
        "battemp": "normal",
        "resist": "normal",
        "sun": "sunlit",
        "cur2": "agree",
        "command": "none",
        "relax": "normal",
        "switch": "normal",
        "eventflag": "none"
      }
    },
    "relaxbias": {
      "label": "Pulse-relaxation timing bias",
      "choice": "The reported recovery is slow, but resistance, temperature, and voltage response remain healthy.",
      "call": {
        "title": "Pulse timing bias",
        "arg": "Verify the diagnostic timing channel."
      },
      "sig": {
        "busv": "normal",
        "battcur": "normal",
        "array": "normal",
        "load": "normal",
        "battemp": "normal",
        "resist": "normal",
        "sun": "sunlit",
        "cur2": "agree",
        "command": "none",
        "relax": "slow",
        "switch": "normal",
        "eventflag": "none"
      }
    },
    "switchbias": {
      "label": "Payload-switch telemetry bias",
      "choice": "The switch channel reports unexpected closure, but branch power and total load remain normal.",
      "call": {
        "title": "Payload-switch telemetry bias",
        "arg": "Verify the switch with branch current and command history."
      },
      "sig": {
        "busv": "normal",
        "battcur": "normal",
        "array": "normal",
        "load": "normal",
        "battemp": "normal",
        "resist": "normal",
        "sun": "sunlit",
        "cur2": "agree",
        "command": "none",
        "relax": "normal",
        "switch": "unexpected",
        "eventflag": "none"
      }
    }
  },
  "dismissal": "authorized",
  "reassuring": {
    "lab": "Power controller",
    "val": "REGULATION LOOP ACTIVE",
    "note": "The regulator can remain active while generation, demand, or battery margin is already deteriorating."
  },
  "rounds": [
    {
      "answer": "battery",
      "alarm": "busv",
      "poleA": {
        "lab": "Bus margin",
        "val": "28.0 → 25.6 V at ordinary current",
        "note": "Voltage falls without a matching generation or load change."
      },
      "hook": "During a routine communications pass, the bus sags more than expected even though the payload configuration and solar input are unchanged.",
      "riddle": "The same discharge current now causes a larger voltage sag. <span class=\"q\">Which measurements show the battery itself changed?</span>",
      "vals": {
        "busv": {
          "observed": "28.0 → 25.6 V / 90 s",
          "reference": "Normal regulated band 27.2–28.4 V"
        },
        "battcur": {
          "observed": "−8.4 A discharge",
          "reference": "Typical sunlit transient −6 to −10 A"
        },
        "array": {
          "observed": "31.2 A",
          "reference": "Expected 29–33 A"
        },
        "load": {
          "observed": "612 W",
          "reference": "Commanded 605–620 W"
        },
        "battemp": {
          "observed": "22.1 → 28.7°C / 14 min",
          "reference": "Typical 18–25°C"
        },
        "resist": {
          "observed": "118 mΩ",
          "reference": "Baseline 61–74 mΩ"
        },
        "sun": {
          "observed": "0.8° array-Sun error",
          "reference": "Normal <2.0°"
        },
        "cur2": {
          "observed": "−8.1 A",
          "reference": "Agreement target ±0.6 A"
        },
        "command": {
          "observed": "No extra-load command",
          "reference": "All loads require logged command"
        },
        "relax": {
          "observed": "19 s to recover 90%",
          "reference": "Healthy 5–8 s"
        },
        "switch": {
          "observed": "All payload switches nominal",
          "reference": "Only commanded loads closed"
        },
        "eventflag": {
          "observed": "No active anomaly",
          "reference": "Normal none"
        }
      },
      "reasons": {
        "loadsurge": "A load surge would produce high battery current and a higher commanded or measured load. Both remain ordinary.",
        "shadow": "Shadowing would lower array current or show poor Sun geometry; array output and pointing are normal.",
        "sensor": "The current channels agree and the bus voltage, battery temperature, and resistance estimate all show a real storage problem.",
        "eclipse": "The spacecraft is sunlit and array current is normal, so this is not the planned eclipse profile.",
        "authorized": "A scheduled calibration can warm the battery under load, but current is not high and no authorization exists.",
        "resistbias": "It explains high estimated resistance alone, not slow pulse recovery, battery heating, and bus sag.",
        "relaxbias": "It explains slow recovery alone, not high resistance and heating.",
        "loadmeter": "A load-meter error cannot produce battery heating and slow electrochemical recovery.",
        "switchbias": "A switch indication fault does not produce resistance growth and slow recovery."
      },
      "resolve": {
        "title": "Battery degradation",
        "paras": [
          "The resistance estimate has nearly doubled, and the battery warms while supplying an ordinary 8 A transient. The increased internal voltage drop pulls the bus below its regulated band.",
          "Low bus voltage is shared by load and generation problems; normal battery current is shared by a benign sensor scenario. Only their pair—voltage down at ordinary current—isolates lost battery margin."
        ],
        "why": {
          "loud": "<b>Why the headline pair works:</b> the bus sags without the heavy current expected from excess demand or missing generation.",
          "quiet": "<b>Why the quiet readings confirm it:</b> high resistance and temperature directly identify battery aging."
        },
        "chain": [
          "Internal resistance increases",
          "Ordinary discharge creates larger internal loss",
          "Bus voltage sags and battery heats"
        ],
        "take": "A voltage problem with ordinary current points to the source impedance, not necessarily the load."
      },
      "logic": [
        [
          "Bus voltage down",
          "Battery, load, or generation problem remain"
        ],
        [
          "Battery current ordinary",
          "Large load and shadowing weaken"
        ],
        [
          "Resistance high",
          "Battery degradation or resistance-estimator bias remain"
        ],
        [
          "Slow pulse recovery + battery heating",
          "Battery degradation remains"
        ]
      ]
    },
    {
      "answer": "loadsurge",
      "alarm": "busv",
      "poleA": {
        "lab": "Power balance",
        "val": "Bus 25.9 V; battery −24.8 A",
        "note": "The battery is supporting a large deficit while the array remains illuminated."
      },
      "hook": "The bus sags under high battery discharge while the spacecraft remains sunlit. Power telemetry shows a real added load, but the command chain must determine whether it belongs there.",
      "riddle": "The extra demand is physically present. <span class=\"q\">Was it authorized, environmental, or uncommanded?</span>",
      "vals": {
        "busv": {
          "observed": "28.1 → 25.9 V / 12 s",
          "reference": "Normal regulated band 27.2–28.4 V"
        },
        "battcur": {
          "observed": "−24.8 A discharge",
          "reference": "Typical sunlit transient −6 to −10 A"
        },
        "array": {
          "observed": "31.0 A",
          "reference": "Expected 29–33 A"
        },
        "load": {
          "observed": "1.18 kW; command 640 W",
          "reference": "Normal 590–680 W"
        },
        "battemp": {
          "observed": "23.0°C",
          "reference": "Typical 18–25°C"
        },
        "resist": {
          "observed": "69 mΩ",
          "reference": "Baseline 61–74 mΩ"
        },
        "sun": {
          "observed": "1.1° array-Sun error",
          "reference": "Normal <2.0°"
        },
        "cur2": {
          "observed": "−24.4 A",
          "reference": "Agreement target ±0.6 A"
        },
        "command": {
          "observed": "No command packet in spacecraft or ground logs",
          "reference": "Scheduled loads require matching command ID"
        },
        "relax": {
          "observed": "6 s to recover 90%",
          "reference": "Healthy 5–8 s"
        },
        "switch": {
          "observed": "Payload branch physically closed",
          "reference": "Normal open outside scheduled operation"
        },
        "eventflag": {
          "observed": "Branch closure not in activity timeline",
          "reference": "Planned events appear in timeline"
        }
      },
      "reasons": {
        "battery": "A degraded battery can sag at ordinary current, but current here is nearly three times the normal transient and resistance remains baseline.",
        "shadow": "Shadowing shares the low-voltage, high-discharge pair, but array current and Sun pointing remain normal.",
        "sensor": "Both current channels agree and the bus voltage changes physically, so the high discharge is real.",
        "eclipse": "The spacecraft is sunlit and the power demand is far above command.",
        "authorized": "It shares normal array power, high load, and strong battery discharge, but the command record shows no scheduled calibration.",
        "resistbias": "A resistance estimate problem does not close a payload switch or double actual load.",
        "relaxbias": "A pulse-timing problem does not double load.",
        "loadmeter": "It shares high computed load, but no branch switch would be closed and battery current would not corroborate it.",
        "switchbias": "It shares an unexpected switch indication, but actual load and battery current would remain normal."
      },
      "resolve": {
        "title": "Uncommanded load surge",
        "paras": [
          "The array continues generating normally, but measured load jumps to 1.18 kW against a 640 W command. The battery supplies the shortfall, pulling the bus down.",
          "This is a provenance check. The electrical state proves that a branch is drawing power; the authorization trail determines whether that state is expected. Normal solar input removes shadowing, while a closed branch with no command or scheduled event identifies an uncommanded load."
        ],
        "why": {
          "loud": "<b>Why the loud readings tie:</b> both lost generation and excess demand make the battery discharge heavily.",
          "quiet": "<b>Why the command chain matters:</b> the same current can be safe or faulty depending on whether the switch state was authorized."
        },
        "chain": [
          "Uncommanded equipment draws power",
          "Battery supplies the generation shortfall",
          "Heavy discharge pulls bus voltage down"
        ],
        "take": "When the physical state is real, trace the command provenance before deciding whether it is a fault."
      },
      "logic": [
        [
          "Low bus voltage + high battery current",
          "Shadow, authorized load, or uncommanded load remain"
        ],
        [
          "Array output and sun geometry normal",
          "Shadow falls away"
        ],
        [
          "Payload branch physically closed",
          "A real added demand is present"
        ],
        [
          "No command packet or scheduled event",
          "Uncommanded load surge remains"
        ]
      ],
      "challenge": {
        "level": "L3",
        "archetype": "provenance",
        "family": "electrical-demand-authorization",
        "deepQuestion": "who-commanded-the-load",
        "evidenceModes": [
          "power-balance",
          "command-chain"
        ],
        "provenance": {
          "stateReadings": [
            "array",
            "load",
            "switch",
            "battcur"
          ],
          "authorizationReadings": [
            "command",
            "eventflag"
          ],
          "closesFor": "loadsurge"
        }
      }
    },
    {
      "answer": "battery",
      "alarm": "busv",
      "experimental": false,
      "compound": [
        "battery",
        "loadsurge"
      ],
      "observed": {
        "busv": "down",
        "battcur": "high",
        "array": "normal",
        "load": "high",
        "battemp": "high",
        "resist": "high",
        "sun": "sunlit",
        "cur2": "agree",
        "command": "none",
        "relax": "slow",
        "switch": "closed",
        "eventflag": "unexpected"
      },
      "poleA": {
        "lab": "Storage under stress",
        "val": "Bus 24.9 V; battery −26.1 A; resistance 121 mΩ",
        "note": "An excessive load is acting on a battery that has already lost internal margin."
      },
      "hook": "A heater bank turns on unexpectedly during sunlight. The battery current rises, but the voltage collapse is much larger than the load alone should produce.",
      "riddle": "Demand is excessive and voltage response is worse than demand alone predicts. <span class=\"q\">Select the two electrical faults.</span>",
      "vals": {
        "busv": {
          "observed": "28.1→23.9 V during branch closure",
          "reference": "Either single-fault model ≥25.5 V"
        },
        "battcur": {
          "observed": "−26.1 A discharge",
          "reference": "Typical sunlit transient −6 to −10 A"
        },
        "array": {
          "observed": "30.8 A",
          "reference": "Expected 29–33 A"
        },
        "load": {
          "observed": "1.21 kW; command 645 W",
          "reference": "Normal 590–680 W"
        },
        "battemp": {
          "observed": "22.4 → 31.2°C / 12 min",
          "reference": "Typical 18–25°C"
        },
        "resist": {
          "observed": "121 mΩ",
          "reference": "Baseline 61–74 mΩ"
        },
        "sun": {
          "observed": "0.9° array-Sun error",
          "reference": "Normal <2.0°"
        },
        "cur2": {
          "observed": "−25.8 A",
          "reference": "Agreement target ±0.6 A"
        },
        "command": {
          "observed": "No payload activation command",
          "reference": "All loads require logged command"
        },
        "relax": {
          "observed": "23.9→25.1 V after 12 min",
          "reference": "Healthy battery recovers >27 V in 3 min"
        },
        "switch": {
          "observed": "Heater bank H3 closed unexpectedly",
          "reference": "Expected open"
        },
        "eventflag": {
          "observed": "Unexpected-power event active",
          "reference": "Scheduled tests marked planned"
        }
      },
      "reasons": {
        "battery": "Battery degradation explains the excessive sag, resistance, and heating, but not the measured 1.21 kW load against a 645 W command.",
        "loadsurge": "The load surge explains heavy discharge, but a healthy 69 mΩ battery would not produce this voltage collapse and heating.",
        "shadow": "Array current and Sun geometry are normal, and shadowing cannot explain the high battery resistance or excess commanded load.",
        "sensor": "Both current channels agree, and multiple physical variables change; this is not a telemetry-only inconsistency.",
        "eclipse": "The spacecraft is sunlit, the array is producing normally, and the load is not following the eclipse plan.",
        "authorized": "It explains high load but has a scheduled command and planned switch state, and it cannot explain degraded pulse recovery.",
        "resistbias": "It explains high resistance alone but not slow recovery, heating, real high load, or an unexpected switch.",
        "relaxbias": "It explains slow recovery alone but not high resistance and real load activation.",
        "loadmeter": "It explains high computed load alone but not the closed switch, battery current, resistance, or relaxation.",
        "switchbias": "It explains a switch indication alone but not the measured load and battery response."
      },
      "resolve": {
        "title": "Battery degradation + uncommanded load surge",
        "paras": [
          "The heater-bank load has nearly doubled total demand, while the battery’s high internal resistance converts that current into an abnormally large voltage drop and heat rise.",
          "The pair has an emergent electrical signature. The uncommanded load raises current, and the degraded battery’s internal resistance converts that current into a much larger voltage sag and slower recovery than either fault predicts alone."
        ],
        "why": {
          "loud": "<b>Why one cause fails:</b> demand and storage health are measured independently.",
          "quiet": "<b>Why the pair is forced:</b> only a load surge explains the extra watts, and only degradation explains the high resistance and disproportionate sag."
        },
        "chain": [
          "Uncommanded heater load increases demand",
          "Degraded battery supplies current inefficiently",
          "Combined faults collapse bus margin"
        ],
        "take": "For interacting faults, compare the observed response with quantitative single-fault envelopes."
      },
      "logic": [
        [
          "High resistance + slow pulse recovery",
          "Requires battery degradation"
        ],
        [
          "High load + unexpected anomaly flag",
          "Requires real uncommanded load; planned calibration or one telemetry bias explains only one"
        ],
        [
          "Closed branch switch + battery current",
          "Confirms equipment is actually energized"
        ],
        [
          "Four independent electrical checks",
          "Battery degradation and load surge are simultaneous"
        ]
      ],
      "challenge": {
        "level": "L4",
        "archetype": "interaction",
        "family": "weak-source-plus-excess-demand",
        "compoundRelation": "degraded-battery-plus-load-surge",
        "evidenceModes": [
          "source-impedance",
          "demand-spike"
        ],
        "compoundMode": "interaction",
        "interaction": {
          "readings": [
            "busv",
            "battcur",
            "resist",
            "relax"
          ],
          "singleA": "Degraded battery at normal load predicts bus ≥25.8 V",
          "singleB": "Load surge with healthy battery predicts bus ≥25.5 V",
          "combined": "Observed 23.9 V with slow recovery",
          "closesFor": [
            "battery",
            "loadsurge"
          ]
        }
      }
    }
  ],
  "schematic": {
    "viewBox": "0 0 520 390",
    "svg": "\n<defs>\n <linearGradient id=\"sp_bg\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#202b52\"/><stop offset=\"1\" stop-color=\"#081526\"/></linearGradient>\n <linearGradient id=\"sp_array\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#6d8cff\"/><stop offset=\"1\" stop-color=\"#263f91\"/></linearGradient>\n <marker id=\"sp_arrow\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto\"><path d=\"M0 0 L10 5 L0 10 z\" fill=\"#f0c56e\"/></marker>\n</defs>\n<rect x=\"18\" y=\"35\" width=\"484\" height=\"315\" rx=\"26\" fill=\"url(#sp_bg)\" stroke=\"#4a5681\" stroke-width=\"2\"/>\n<circle cx=\"68\" cy=\"73\" r=\"28\" fill=\"#f0c56e\"/><g stroke=\"#f0c56e\" opacity=\".6\"><path d=\"M68 35 v-14 M68 111 v14 M30 73 H16 M106 73 h14\"/></g>\n<g fill=\"url(#sp_array)\" stroke=\"#8da4ff\" stroke-width=\"2\"><rect x=\"56\" y=\"117\" width=\"106\" height=\"76\" rx=\"5\"/><rect x=\"358\" y=\"117\" width=\"106\" height=\"76\" rx=\"5\"/></g><g stroke=\"#a9b8ff\"><path d=\"M82 117 v76 M108 117 v76 M134 117 v76 M384 117 v76 M410 117 v76 M436 117 v76 M56 142 h106 M56 167 h106 M358 142 h106 M358 167 h106\"/></g>\n<text x=\"110\" y=\"211\" class=\"lbl\" text-anchor=\"middle\">solar array</text><text x=\"410\" y=\"211\" class=\"lbl\" text-anchor=\"middle\">solar array</text><rect x=\"183\" y=\"96\" width=\"154\" height=\"154\" rx=\"26\" fill=\"#172944\" stroke=\"#8da4ff\" stroke-width=\"3\"/><rect x=\"213\" y=\"129\" width=\"94\" height=\"58\" rx=\"9\" fill=\"#0e2037\" stroke=\"#f0c56e\"/><path d=\"M226 158 h68\" stroke=\"#f0c56e\" stroke-width=\"5\"/><text x=\"260\" y=\"119\" class=\"lbl\" text-anchor=\"middle\">main power bus</text>\n<rect x=\"210\" y=\"266\" width=\"100\" height=\"58\" rx=\"12\" fill=\"#183044\" stroke=\"#77dfc0\" stroke-width=\"2\"/><path d=\"M224 282 h72 M224 302 h52\" stroke=\"#77dfc0\" stroke-width=\"3\"/><text x=\"260\" y=\"341\" class=\"lbl\" text-anchor=\"middle\">battery</text>\n<rect x=\"392\" y=\"229\" width=\"76\" height=\"88\" rx=\"12\" fill=\"#182844\" stroke=\"#f0c56e\"/><circle cx=\"430\" cy=\"257\" r=\"15\" fill=\"none\" stroke=\"#f0c56e\" stroke-width=\"3\"/><path d=\"M420 285 h22\" stroke=\"#f0c56e\" stroke-width=\"3\"/><text x=\"430\" y=\"337\" class=\"lbl\" text-anchor=\"middle\">payload loads</text>\n<path d=\"M162 155 H183 M337 155 H358 M260 187 V266 M337 206 H392\" stroke=\"#f0c56e\" stroke-width=\"4\" marker-end=\"url(#sp_arrow)\"/>\n<path d=\"M260 95 V70 H415\" fill=\"none\" stroke=\"#8da4ff\" stroke-width=\"3\" stroke-dasharray=\"6 4\"/><path d=\"M415 70 q18 -20 36 0 M421 77 q12 -13 24 0\" fill=\"none\" stroke=\"#8da4ff\" stroke-width=\"3\"/><text x=\"430\" y=\"56\" class=\"lbl\" text-anchor=\"middle\">command + telemetry</text>\n"
  },
  "design": {
    "visual": {
      "layout": "radial-spacecraft-power-bus",
      "palette": "indigo-gold",
      "flow": "generation-storage-load"
    },
    "challenges": [
      {
        "level": "L2",
        "family": "parameter-under-load",
        "deepQuestion": "same-current-greater-voltage-drop",
        "evidenceModes": [
          "internal-resistance",
          "relaxation-response"
        ]
      },
      {
        "level": "L3",
        "family": "electrical-demand-authorization",
        "deepQuestion": "who-commanded-the-load",
        "evidenceModes": [
          "power-balance",
          "command-chain"
        ],
        "archetype": "provenance",
        "provenance": {
          "stateReadings": [
            "array",
            "load",
            "switch",
            "battcur"
          ],
          "authorizationReadings": [
            "command",
            "eventflag"
          ],
          "closesFor": "loadsurge"
        }
      },
      {
        "level": "L4",
        "family": "weak-source-plus-excess-demand",
        "compoundRelation": "degraded-battery-plus-load-surge",
        "evidenceModes": [
          "source-impedance",
          "demand-spike"
        ],
        "archetype": "interaction",
        "compoundMode": "interaction",
        "interaction": {
          "readings": [
            "busv",
            "battcur",
            "resist",
            "relax"
          ],
          "singleA": "Degraded battery at normal load predicts bus ≥25.8 V",
          "singleB": "Load surge with healthy battery predicts bus ≥25.5 V",
          "combined": "Observed 23.9 V with slow recovery",
          "closesFor": [
            "battery",
            "loadsurge"
          ]
        }
      }
    ]
  }
} };
