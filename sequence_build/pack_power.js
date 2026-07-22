module.exports = { PACK: {
  "id": "power",
  "icon": "MW",
  "discipline": "Naval power & controls",
  "title": "Holding the Electrical Bus",
  "headline": "Reconstruct how a ship responds when a major electrical load suddenly demands power.",
  "kicker": "Integrated power-system laboratory · A high-demand load is commanded on",
  "story": [
    "A ship’s generators already support propulsion, sensors, computing, cooling, and hotel loads. A large additional load is requested.",
    "Arrange how generation, energy storage, protection, and supervisory controls keep the electrical system stable."
  ],
  "principles": [
    [
      "Generation and consumption must balance",
      "A sudden mismatch changes voltage, frequency, or stored energy in the electrical bus."
    ],
    [
      "Fast and slow resources play different roles",
      "Storage and power electronics can react quickly while engines and generators take longer to increase output."
    ],
    [
      "Power quality protects every load",
      "Supplying one demanding system must not produce unacceptable voltage or frequency for the rest of the ship."
    ],
    [
      "Control includes priorities",
      "A resilient system can delay, reduce, or disconnect lower-priority loads when available power is limited."
    ]
  ],
  "terms": [
    [
      "Electrical bus",
      "The shared conductors and equipment through which power is distributed."
    ],
    [
      "Generator",
      "A machine converting mechanical rotation into electrical energy."
    ],
    [
      "Power converter",
      "Electronics that regulate or transform voltage, current, or frequency."
    ],
    [
      "Transient",
      "A short-lived change as a system moves from one operating state to another."
    ],
    [
      "Energy storage",
      "A battery, capacitor, flywheel, or other device that can absorb and release energy."
    ],
    [
      "Load shedding",
      "Disconnecting selected electrical demand to protect system stability."
    ],
    [
      "Power quality",
      "How closely voltage, frequency, and waveform remain within acceptable limits."
    ],
    [
      "Supervisory control",
      "Higher-level software coordinating generators, storage, converters, and loads."
    ]
  ],
  "note": "Naval architectures may use AC, DC, or hybrid distribution; several generators and storage devices; zonal protection; and specialized pulsed loads. This is a representative control sequence.",
  "sources": "Aligned with ONR Power and Energy programs covering integrated power systems, energy storage, power electronics, transient control, stability, reliability, and resilient distribution.",
  "chapters": [
    {
      "id": "supply",
      "cards": [
        [
          "fuel",
          "An engine converts fuel energy into shaft rotation"
        ],
        [
          "generator",
          "The generator converts shaft rotation into electrical power"
        ],
        [
          "converter",
          "Power electronics regulate the generated electricity"
        ],
        [
          "bus",
          "The distribution bus supplies the ship’s operating loads"
        ]
      ]
    },
    {
      "id": "transient",
      "cards": [
        [
          "request",
          "A major load requests a rapid increase in power"
        ],
        [
          "imbalance",
          "Demand briefly exceeds the power supplied by generators"
        ],
        [
          "storage",
          "Energy storage releases power into the bus"
        ],
        [
          "ramp",
          "Generator controls increase sustained power output"
        ]
      ]
    },
    {
      "id": "stabilize",
      "cards": [
        [
          "monitor",
          "Sensors verify voltage, current, and frequency throughout the system"
        ],
        [
          "prioritize",
          "Supervisory control adjusts lower-priority loads if necessary"
        ],
        [
          "reroute",
          "Distribution controls route power around unavailable equipment"
        ],
        [
          "balance",
          "Generation, storage, and demand settle into a stable balance"
        ]
      ]
    }
  ],
  "chapterOrder": [
    "supply",
    "transient",
    "stabilize"
  ],
  "intro": "The ship is operating normally with several loads sharing an energized distribution system. Sequence A must establish how stored chemical energy becomes controlled electrical power available on that shared bus.",
  "segues": [
    "The ship now has regulated power supporting its existing equipment. The next sequence begins when a major load changes demand more quickly than the rotating generators can immediately respond.",
    "The fast disturbance has been contained, but the system must verify that all zones remain within limits and establish a sustainable configuration rather than relying indefinitely on temporary energy storage."
  ],
  "hints": [
    "The generator converts shaft rotation into electrical power before power electronics regulate that electricity.",
    "Energy storage supports the bus during the transient before generator controls complete the slower increase in sustained output."
  ],
  "collection": "ONR collection"
} };
