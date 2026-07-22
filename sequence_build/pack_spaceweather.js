module.exports = { PACK: {
  "id": "spaceweather",
  "icon": "☉",
  "discipline": "Space weather & communications",
  "title": "When the Sun Disturbs the Link",
  "headline": "Reconstruct how a solar eruption changes near-Earth plasma and degrades radio navigation or communication.",
  "kicker": "Space-environment operations center · Solar magnetic activity is increasing",
  "story": [
    "Naval communication and navigation systems depend on radio waves passing through or near the ionosphere. Conditions there can change rapidly when the Sun releases energy and plasma.",
    "Arrange the solar event, the near-Earth response, and the resulting effects on radio systems."
  ],
  "principles": [
    [
      "Space weather begins with magnetic energy",
      "Solar eruptions are driven by changing magnetic fields, not by ordinary weather or combustion."
    ],
    [
      "Different disturbances travel differently",
      "Radiation can arrive in minutes, energetic particles later, and a coronal mass ejection over hours or days."
    ],
    [
      "The ionosphere is part of the radio path",
      "Changing electron density alters refraction, delay, phase, absorption, and signal fluctuations."
    ],
    [
      "Effects depend on frequency and geometry",
      "A disturbance can affect high-frequency communication, satellite links, and navigation signals in different ways."
    ]
  ],
  "terms": [
    [
      "Solar flare",
      "A rapid release of electromagnetic radiation from an active solar region."
    ],
    [
      "Coronal mass ejection",
      "A large expulsion of magnetized plasma from the Sun."
    ],
    [
      "Solar wind",
      "The continuous flow of plasma and magnetic field from the Sun."
    ],
    [
      "Magnetosphere",
      "The region where Earth’s magnetic field strongly controls charged-particle motion."
    ],
    [
      "Ionosphere",
      "An upper-atmospheric region containing free electrons and ions."
    ],
    [
      "Total electron content",
      "The number of free electrons along a signal path."
    ],
    [
      "Scintillation",
      "Rapid fluctuations in received signal amplitude or phase caused by irregular plasma."
    ],
    [
      "Space-weather forecast",
      "A prediction or warning describing solar and near-Earth conditions and possible technological effects."
    ]
  ],
  "note": "Solar flares, energetic particles, coronal mass ejections, geomagnetic storms, and ionospheric disturbances have different timing and consequences. This game presents a representative eruption-to-radio-impact pathway.",
  "sources": "Aligned with ONR marine meteorology and space-weather research in observations, coupled prediction, space effects, navigation, and communications; physical concepts are consistent with NOAA and NASA space-weather explanations.",
  "chapters": [
    {
      "id": "sun",
      "cards": [
        [
          "store",
          "Magnetic stress builds in an active region on the Sun"
        ],
        [
          "erupt",
          "A solar eruption releases radiation and magnetized plasma"
        ],
        [
          "travel",
          "The disturbance propagates through interplanetary space"
        ],
        [
          "detect",
          "Spacecraft and solar observatories detect the event"
        ]
      ]
    },
    {
      "id": "earth",
      "cards": [
        [
          "arrive",
          "The disturbance interacts with Earth’s magnetic environment"
        ],
        [
          "currents",
          "Magnetospheric and ionospheric currents intensify"
        ],
        [
          "heat",
          "Energy deposition heats and disturbs the upper atmosphere"
        ],
        [
          "electrons",
          "Ionospheric electron density becomes irregular"
        ]
      ]
    },
    {
      "id": "systems",
      "cards": [
        [
          "enter",
          "A radio signal enters the disturbed ionosphere"
        ],
        [
          "alter",
          "Its path, delay, phase, or strength changes unpredictably"
        ],
        [
          "degrade",
          "Communication or navigation performance degrades"
        ],
        [
          "adapt",
          "Forecasts and alternate links help operators manage the disruption"
        ]
      ]
    }
  ],
  "chapterOrder": [
    "sun",
    "earth",
    "systems"
  ],
  "intro": "The Sun contains an active region with increasingly stressed magnetic fields, while naval radio systems are still operating normally. Sequence A must produce and detect a disturbance capable of reaching the space environment around Earth.",
  "segues": [
    "The solar event has been observed and is moving through interplanetary space. The next sequence follows its interaction with Earth’s magnetic field, upper atmosphere, and electrically charged ionosphere.",
    "The near-Earth plasma environment now differs from the assumptions used by ordinary radio propagation and navigation models. The next sequence shows how those changes enter a signal path and become an operational problem."
  ],
  "hints": [
    "Magnetic stress builds in the active solar region before an eruption releases radiation and plasma.",
    "Ionospheric electron density becomes irregular before a radio signal experiences unpredictable phase or strength changes."
  ],
  "collection": "ONR collection"
} };
