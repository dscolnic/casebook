module.exports = { PACK: {
  "id": "rocket",
  "icon": "▲",
  "discipline": "Aerospace engineering",
  "title": "Two Stages to Orbit",
  "headline": "Arrange the major events of a representative two-stage launch.",
  "kicker": "Launch control · A payload is bound for low Earth orbit",
  "story": [
    "A two-stage rocket must cross the atmosphere and accelerate a satellite sideways fast enough to remain in orbit.",
    "Reconstruct a representative ascent sequence. Exact timing varies, but the dependencies are broadly shared."
  ],
  "overview": "A two-stage launch vehicle changes mass, propulsion source, aerodynamic environment, and trajectory during ascent. Hold-down equipment, booster engines, separation hardware, an orbital engine, a payload fairing, and guidance software each have different operating limits. The useful clues are the interlocks that prevent unsafe commands and the measurements that define when hardware is no longer needed.",
  "terms": [
    [
      "Thrust",
      "The force produced by an engine that pushes the rocket."
    ],
    [
      "Dynamic pressure",
      "Aerodynamic pressure caused by the combination of air density and speed."
    ],
    [
      "Max Q",
      "The point of maximum dynamic pressure during ascent."
    ],
    [
      "MECO",
      "The commanded cutoff of the booster engines."
    ],
    [
      "Stage separation",
      "The physical release of a spent rocket stage."
    ],
    [
      "Payload fairing",
      "The protective shell around the payload during atmospheric flight."
    ],
    [
      "Orbit insertion",
      "Reaching the required position and sideways velocity for the target orbit."
    ]
  ],
  "note": "Some rockets separate boosters, jettison fairings, or ignite upper stages at different times. This is a simplified representative profile.",
  "sources": "Fact-checked against NASA launch-event timelines and explanations of max Q, MECO, staging, fairing jettison, and orbit insertion.",
  "chapters": [
    {
      "id": "atmosphere",
      "cards": [
        [
          "ignite",
          "The booster engines ignite while the rocket is held down"
        ],
        [
          "verify",
          "Controllers verify that the engines produce stable thrust"
        ],
        [
          "liftoff",
          "The rocket leaves the launch pad"
        ],
        [
          "maxq",
          "The rocket passes through maximum aerodynamic pressure"
        ]
      ]
    },
    {
      "id": "staging",
      "cards": [
        [
          "fairing",
          "The payload fairing separates in thin air"
        ],
        [
          "cutoff",
          "The booster engines shut down"
        ],
        [
          "separate",
          "The empty booster separates from the upper stage"
        ],
        [
          "upperignite",
          "The upper-stage engine ignites"
        ]
      ]
    },
    {
      "id": "orbit",
      "cards": [
        [
          "accelerate",
          "The upper stage builds sideways orbital speed"
        ],
        [
          "target",
          "Guidance reaches the target position and velocity"
        ],
        [
          "shutdown",
          "The upper-stage engine shuts down"
        ],
        [
          "deploy",
          "The payload separates from the upper stage"
        ]
      ]
    }
  ],
  "chapterOrder": [
    "atmosphere",
    "staging",
    "orbit"
  ],
  "segues": [
    "The vehicle has survived the strongest atmospheric loading and is climbing into thinner air. Protective hardware becomes unnecessary, while the booster approaches the end of its useful burn.",
    "The heavy booster and protective shell are gone. A lighter upper stage can now devote its propellant to the sideways speed and precise direction required for orbit."
  ],
  "principles": [
    [
      "Interlocks prevent unsafe transitions",
      "A major command often requires sensor confirmation that the vehicle is ready."
    ],
    [
      "The atmosphere changes the rules",
      "Hardware needed in dense air can become useless mass in thin air."
    ],
    [
      "Empty structure is a burden",
      "Staging improves performance by discarding tanks and engines that can no longer contribute thrust."
    ],
    [
      "Orbit is mainly about sideways velocity",
      "Altitude alone does not create orbit; guidance must reach the required position, speed, and direction."
    ]
  ],
  "hints": [
    "Controllers verify stable booster thrust before the rocket is released from the launch pad.",
    "The booster engines shut down before the empty booster separates from the upper stage."
  ],
  "intro": "The fully fueled rocket is attached to the launch pad with its payload enclosed and its engines inactive. Sequence A must produce controlled thrust, release the vehicle safely, and carry it through the most demanding part of atmospheric flight.",
  "collection": "Core collection"
} };
