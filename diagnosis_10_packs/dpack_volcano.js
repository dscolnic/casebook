// Diagnosis data pack — generated for the Diagnosis engine.
module.exports = { PACK: {
  "id": "volcano",
  "title": "Volcano Unrest",
  "domain": "Volcano observatory monitoring",
  "role": "You are the duty volcanologist assessing a sudden unrest alert.",
  "system": {
    "parts": [
      [
        "Seismic network",
        "Multiple stations locate earthquakes and track tremor. Upward migration can mark magma rising; a fixed cluster can mark an intrusion that has stalled."
      ],
      [
        "Ground deformation",
        "Continuous GNSS and satellite radar measure inflation or deflation as pressure changes underground. Coherent inflation supports real subsurface intrusion."
      ],
      [
        "Gas monitoring",
        "Sulfur dioxide and carbon dioxide can increase as magma rises and depressurizes, although gas signals vary by volcano and pathway."
      ],
      [
        "Weather and hydrology",
        "Heavy rain, lahars, streams, wind, and thunder can create seismic or infrasound signals unrelated to magma."
      ],
      [
        "Network health",
        "A signal seen coherently at several stations is more credible than one channel with timing, power, or calibration faults."
      ]
    ],
    "soWrong": "So a burst of seismic energy may mean rising magma, a stalled intrusion, weather-driven ground noise, or one sick station. The diagnosis depends on whether deformation, gas, depth migration, weather, and the rest of the network tell the same story."
  },
  "salient": [
    "seismic",
    "deform"
  ],
  "readings": {
    "seismic": {
      "name": "Seismic pattern",
      "purpose": "How earthquake locations and continuous vibration evolve. Upward migration supports ascent; a persistent cluster can reflect a stalled intrusion, rain noise, or a bad station until other data separate them.",
      "pin": {
        "x": 210,
        "y": 180
      },
      "zone": "seismic"
    },
    "deform": {
      "name": "Radial ground deformation",
      "purpose": "GNSS displacement around the edifice. Coherent outward and upward motion supports pressurization; steady positions argue against a sizable new intrusion.",
      "pin": {
        "x": 300,
        "y": 245
      },
      "zone": "deformation"
    },
    "gas": {
      "name": "Sulfur-dioxide flux",
      "purpose": "SO₂ output from summit or flank vents. A sustained increase can support shallow degassing magma; unchanged gas is more consistent with stalled deep activity or nonvolcanic noise.",
      "pin": {
        "x": 365,
        "y": 90
      },
      "zone": "gas"
    },
    "depth": {
      "name": "Located-event depth",
      "purpose": "Depth and migration of well-located earthquakes. A shallowing sequence supports upward movement; fixed depth supports a stationary source.",
      "pin": {
        "x": 165,
        "y": 275
      },
      "zone": "seismic"
    },
    "coherence": {
      "name": "Cross-station waveform coherence",
      "purpose": "Whether several stations record consistent arrival times and amplitudes. Weather can affect many exposed stations; a hardware fault is usually confined to one channel.",
      "pin": {
        "x": 85,
        "y": 190
      },
      "zone": "network"
    },
    "rain": {
      "name": "Rain gauge and stream stage",
      "purpose": "Local rainfall and drainage response. Intense rain and rising streams can generate shallow seismic noise and lahars without magma movement.",
      "pin": {
        "x": 75,
        "y": 300
      },
      "zone": "weather"
    },
    "insar": {
      "name": "Satellite deformation check",
      "purpose": "Independent radar view of broad ground motion. It confirms real inflation and rejects a single GNSS monument or telemetry problem.",
      "pin": {
        "x": 400,
        "y": 245
      },
      "zone": "deformation"
    },
    "health": {
      "name": "Station timing and power health",
      "purpose": "Clock drift, voltage, telemetry gaps, and calibration status. Abnormal health on one station supports an instrumental artifact.",
      "pin": {
        "x": 80,
        "y": 90
      },
      "zone": "network"
    }
  },
  "hypotheses": {
    "ascent": {
      "label": "Magma ascending toward the surface",
      "call": {
        "title": "Magma ascent — raise alert and intensify monitoring.",
        "arg": "Earthquakes are migrating upward while the edifice inflates and gas output rises. Treat this as escalating magmatic unrest."
      },
      "sig": {
        "seismic": "migrating",
        "deform": "inflating",
        "gas": "high",
        "depth": "shallowing",
        "coherence": "multi",
        "rain": "dry",
        "insar": "inflating",
        "health": "good"
      }
    },
    "stalled": {
      "label": "Stalled magma intrusion",
      "call": {
        "title": "Stalled intrusion — maintain enhanced watch.",
        "arg": "A coherent earthquake cluster and inflation show magma entered the edifice, but depth and gas remain stable rather than progressing upward."
      },
      "sig": {
        "seismic": "clustered",
        "deform": "inflating",
        "gas": "normal",
        "depth": "fixed",
        "coherence": "multi",
        "rain": "dry",
        "insar": "inflating",
        "health": "good"
      }
    },
    "rainnoise": {
      "label": "Rain-driven seismic noise",
      "call": {
        "title": "Weather noise — monitor hydrologic hazards, not magmatic escalation.",
        "arg": "The seismic burst is coherent with intense rainfall and stream response, while deformation and gas remain steady."
      },
      "sig": {
        "seismic": "clustered",
        "deform": "steady",
        "gas": "normal",
        "depth": "surface",
        "coherence": "multi",
        "rain": "heavy",
        "insar": "steady",
        "health": "good"
      }
    },
    "stationfault": {
      "label": "Single-station malfunction",
      "call": {
        "title": "Station fault — remove the bad channel.",
        "arg": "One station is generating false events because its timing or power is unstable. The rest of the volcano network is quiet."
      },
      "sig": {
        "seismic": "clustered",
        "deform": "steady",
        "gas": "normal",
        "depth": "surface",
        "coherence": "single",
        "rain": "dry",
        "insar": "steady",
        "health": "bad"
      }
    }
  },
  "dismissal": "stationfault",
  "reassuring": {
    "lab": "Visual camera",
    "val": "SUMMIT CLOUD-COVERED — no ash visible",
    "note": "A cloud-obscured camera cannot rule out unrest. Magma can move and pressure can build before any eruption or visible ash."
  },
  "rounds": [
    {
      "answer": "ascent",
      "alarm": "seismic",
      "poleA": {
        "lab": "Earthquake sequence",
        "val": "Migrating upward beneath the summit",
        "note": "Located events have moved from 8 km to 2 km depth while deformation accelerates."
      },
      "hook": "Over eighteen hours, an earthquake sequence climbs beneath the volcano and the GNSS ring expands. The summit camera shows only cloud.",
      "riddle": "No ash is visible — <span class=\"q\">so is magma nevertheless moving into shallower rock?</span>",
      "vals": {
        "seismic": "event centroid migrates toward summit over 18 hours",
        "deform": "28 mm radial expansion and 16 mm uplift, accelerating",
        "gas": "SO₂ rises from 420 to 1,750 t/day",
        "depth": "8 km to 2 km below summit",
        "coherence": "consistent arrivals on 9 stations",
        "rain": "0.4 mm in 24 hours; streams stable",
        "insar": "new inflation lobe centered beneath summit",
        "health": "all stations synchronized and nominal"
      },
      "reasons": {
        "stalled": "A stalled intrusion can produce clustered earthquakes and inflation, but its source depth remains fixed and gas need not rise. Here the sequence shallows from 8 km to 2 km and SO₂ quadruples.",
        "rainnoise": "Rain noise requires heavy precipitation and produces shallow hydrologic signals without coherent inflation. Conditions are dry and both GNSS and InSAR show accelerating uplift.",
        "stationfault": "A station fault would be confined to one unhealthy channel. Nine stations locate the same upward-moving sequence and all report normal timing."
      },
      "resolve": {
        "title": "Magma ascent — several independent systems show pressure moving upward.",
        "paras": [
          "Earthquakes migrate from 8 km to 2 km, the edifice expands and uplifts, satellite radar confirms the deformation, and SO₂ output rises sharply. Together these observations indicate magma moving into shallower storage or pathways. Raise the alert and intensify monitoring.",
          "This is a naked single. Only magma ascent produces the upward-migrating seismic signature. The other candidates remain clustered at one depth or are shallow nonvolcanic noise."
        ],
        "why": {
          "loud": "<b>Why the loud reading was enough</b>: upward migration is unique to an ascending source in this differential.",
          "quiet": "<b>Why the camera is not reassuring</b>: cloud cover hides the summit, and visible ash is a late outcome rather than an early prerequisite for unrest."
        },
        "chain": [
          "Magma rises through the crust",
          "Earthquakes migrate upward and pressure inflates the edifice",
          "Gas release and eruption likelihood increase"
        ],
        "take": "Track motion, not just activity count: a source that moves upward carries different meaning from one that stays put."
      }
    },
    {
      "answer": "stalled",
      "alarm": "deform",
      "poleA": {
        "lab": "Ground deformation",
        "val": "Edifice inflating around a fixed earthquake cluster",
        "note": "Pressure has increased, but the source has remained at the same depth for weeks."
      },
      "hook": "A swarm begins beneath the west flank and the surrounding GNSS stations move outward. The pattern then persists without climbing.",
      "riddle": "Is this noise with a bad deformation point — <span class=\"q\">or a real intrusion that entered the volcano and stopped?</span>",
      "vals": {
        "seismic": "persistent compact cluster beneath west flank",
        "deform": "19–24 mm outward motion at four GNSS sites",
        "gas": "SO₂ remains 390–460 t/day",
        "depth": "centroid fixed near 7.2 km for 17 days",
        "coherence": "well-located events on 7 stations",
        "rain": "2 mm in 24 hours",
        "insar": "broad 4-cm inflation pattern on west flank",
        "health": "all key stations nominal"
      },
      "reasons": {
        "ascent": "Ascending magma can inflate the volcano, but it should show upward migration and often changing shallow gas release. The earthquake centroid remains fixed near 7.2 km and SO₂ is unchanged.",
        "rainnoise": "Rain can create clustered shallow noise, but it cannot produce a four-centimeter InSAR inflation lobe and coherent outward motion at four GNSS sites during nearly dry weather.",
        "stationfault": "A single bad station cannot create consistent earthquake locations across seven stations or a matching satellite deformation pattern."
      },
      "resolve": {
        "title": "Stalled magma intrusion — pressure increased, but the source stopped at depth.",
        "paras": [
          "The swarm is real and the edifice is inflating, as confirmed by several GNSS sites and InSAR. Yet earthquake depth remains fixed near 7.2 km for seventeen days and gas output does not increase. Magma has intruded and pressurized the flank without evidence that it continues upward.",
          "This is one clear line across the loud readings. A clustered seismic pattern is shared with weather and station artifacts, while inflation is shared with magma ascent. Only clustered seismicity plus inflation identifies a stalled intrusion."
        ],
        "why": {
          "loud": "<b>Why both loud readings are needed</b>: clustering alone may be noise, and inflation alone does not reveal whether the source is progressing.",
          "quiet": "<b>Why the quiet depth trend matters</b>: the fixed centroid distinguishes stored pressure from continuing ascent."
        },
        "chain": [
          "Magma intrudes a deep flank reservoir",
          "Pressure inflates surrounding rock",
          "Earthquakes remain clustered because the intrusion stalls"
        ],
        "take": "Real unrest can stop without disappearing; combine deformation with source migration to judge whether it is progressing."
      }
    },
    {
      "answer": "rainnoise",
      "alarm": "seismic",
      "poleA": {
        "lab": "Seismic amplitude",
        "val": "Broad shallow bursts across exposed stations",
        "note": "The event rate rises during a cloudburst while deformation remains flat."
      },
      "hook": "A tropical downpour strikes the edifice and the automated detector declares hundreds of shallow events. A one-station malfunction could produce the same loud summary.",
      "riddle": "The volcano is not inflating — <span class=\"q\">did weather shake the network, or did one instrument invent the swarm?</span>",
      "vals": {
        "seismic": "repeating shallow, emergent bursts for 3 hours",
        "deform": "GNSS positions steady within 2 mm",
        "gas": "SO₂ 430 t/day, unchanged",
        "depth": "poorly located at or near surface",
        "coherence": "similar envelopes on 6 stream-facing stations",
        "rain": "112 mm in 3 hours; stream stage rises 1.8 m",
        "insar": "no new deformation",
        "health": "timing and power nominal at all stations"
      },
      "reasons": {
        "stationfault": "A station malfunction shares the loud pattern of clustered apparent events with no deformation. But six stations show coherent envelopes, every clock and power channel is healthy, and the timing follows extreme rainfall and stream rise.",
        "ascent": "Magma ascent should produce upward-migrating earthquakes, coherent deformation, and often a gas change. The signals are surface-like, the ground is steady, and SO₂ is unchanged.",
        "stalled": "A stalled intrusion requires real subsurface earthquake locations and inflation. These bursts are poorly located near the surface and both GNSS and InSAR are flat."
      },
      "resolve": {
        "title": "Rain-driven seismic noise — water and streams are shaking several stations.",
        "paras": [
          "The burst begins with 112 mm of rain, appears coherently on six stream-facing stations, and follows a 1.8 m stream rise. Ground deformation, gas, station health, and satellite observations remain normal. The signal is hydrologic noise; continue watching for rain-related lahars rather than escalating the magmatic alert.",
          "This is where the loud gauges tie. Rain noise and a single-station malfunction both yield clustered apparent seismicity with steady deformation. The deeper question is how far the signal travels through the network: weather reaches several exposed stations coherently, while hardware failure stays local."
        ],
        "why": {
          "loud": "<b>Why the loud gauges cannot decide</b>: neither weather noise nor one failed sensor requires volcanic inflation.",
          "quiet": "<b>Why rain wins</b>: healthy clocks and matching wave envelopes across six stations correlate precisely with extreme rainfall and stream response."
        },
        "chain": [
          "Intense rain and fast streams generate ground vibration",
          "Several exposed stations record similar shallow noise",
          "Automated event counts rise without magmatic deformation"
        ],
        "take": "When an automated swarm lacks deformation, inspect spatial coherence and weather before assigning a volcanic source."
      }
    }
  ],
  "schematic": {
    "viewBox": "0 0 520 390",
    "svg": "\n<text x=\"260\" y=\"24\" class=\"eqlbl\" text-anchor=\"middle\" style=\"fill:#5a7f96\">VOLCANO MONITORING NETWORK</text>\n<path d=\"M80,300 L185,225 L235,105 L275,175 L330,220 L450,300 Z\" fill=\"#173e59\" stroke=\"#70c9f2\" stroke-width=\"2\"/>\n<path d=\"M218,132 Q238,118 258,140\" fill=\"none\" stroke=\"#efca72\" stroke-width=\"3\"/>\n<path d=\"M235,300 C225,260 220,220 240,190 C260,220 275,255 285,300\" fill=\"rgba(239,202,114,.08)\" stroke=\"#efca72\" stroke-width=\"2\" stroke-dasharray=\"5 4\"/>\n<circle cx=\"125\" cy=\"245\" r=\"9\" fill=\"#173e59\" stroke=\"#70c9f2\" stroke-width=\"2\"/>\n<circle cx=\"195\" cy=\"285\" r=\"9\" fill=\"#173e59\" stroke=\"#70c9f2\" stroke-width=\"2\"/>\n<circle cx=\"340\" cy=\"260\" r=\"9\" fill=\"#173e59\" stroke=\"#70c9f2\" stroke-width=\"2\"/>\n<circle cx=\"405\" cy=\"285\" r=\"9\" fill=\"#173e59\" stroke=\"#70c9f2\" stroke-width=\"2\"/>\n<text x=\"100\" y=\"335\" class=\"lbl\" text-anchor=\"middle\">seismic stations</text>\n<path d=\"M305,90 Q350,50 395,85\" fill=\"none\" stroke=\"#efca72\" stroke-width=\"4\" stroke-dasharray=\"6 4\"/>\n<text x=\"395\" y=\"48\" class=\"lbl\" text-anchor=\"middle\">gas plume</text>\n<rect x=\"55\" y=\"55\" width=\"120\" height=\"70\" rx=\"10\" fill=\"rgba(112,201,242,.06)\" stroke=\"#385b70\"/>\n<text x=\"115\" y=\"83\" class=\"lbl\" text-anchor=\"middle\">network health</text><text x=\"115\" y=\"103\" class=\"lbl\" text-anchor=\"middle\">rain / streams</text>\n<rect x=\"350\" y=\"315\" width=\"120\" height=\"45\" rx=\"10\" fill=\"rgba(112,201,242,.06)\" stroke=\"#385b70\"/>\n<text x=\"410\" y=\"343\" class=\"lbl\" text-anchor=\"middle\">GNSS / InSAR</text>\n<line x1=\"210\" y1=\"180\" x2=\"190\" y2=\"215\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"300\" y1=\"245\" x2=\"330\" y2=\"260\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"365\" y1=\"90\" x2=\"320\" y2=\"115\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"165\" y1=\"275\" x2=\"195\" y2=\"285\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"85\" y1=\"190\" x2=\"120\" y2=\"235\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"75\" y1=\"300\" x2=\"105\" y2=\"285\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"400\" y1=\"245\" x2=\"410\" y2=\"315\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"80\" y1=\"90\" x2=\"110\" y2=\"125\" stroke=\"#efca72\" stroke-width=\"2\"/>"
  }
} };
