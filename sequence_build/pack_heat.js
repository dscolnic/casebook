module.exports = { PACK: {
  "id": "heat",
  "icon": "°C",
  "discipline": "Human performance & physiology",
  "title": "Heat on the Flight Deck",
  "headline": "Reconstruct how environmental heat and exertion become physiological strain—and how the risk is reversed.",
  "kicker": "Human-performance laboratory · Hot weather, heavy work, and protective equipment",
  "story": [
    "A sailor performs demanding work in sun, heat, humidity, and protective clothing. The body must move internally generated and environmental heat to the surroundings.",
    "Arrange the thermoregulatory response, the development of dangerous strain, and the intervention that restores safety."
  ],
  "principles": [
    [
      "Heat balance controls core temperature",
      "The body stores heat when metabolic and environmental gains exceed losses through evaporation, radiation, convection, and conduction."
    ],
    [
      "Sweating only cools when it evaporates",
      "Sweat that drips away or remains trapped under clothing removes much less heat."
    ],
    [
      "Circulation serves competing needs",
      "More blood near the skin supports cooling, while working muscles and blood pressure also require circulation."
    ],
    [
      "Performance can decline before collapse",
      "Dehydration and rising core temperature can impair attention, judgment, coordination, and work capacity."
    ]
  ],
  "terms": [
    [
      "Metabolic heat",
      "Heat produced by muscles and other tissues during activity."
    ],
    [
      "Core temperature",
      "The temperature of deep body tissues and organs."
    ],
    [
      "Skin blood flow",
      "Circulation near the body surface that transfers internal heat outward."
    ],
    [
      "Evaporation",
      "The phase change of liquid sweat into vapor, which removes heat."
    ],
    [
      "Dehydration",
      "Loss of body water that is not adequately replaced."
    ],
    [
      "Cardiovascular strain",
      "Increased effort by the heart and circulation to support cooling and activity."
    ],
    [
      "Acclimatization",
      "Physiological adaptation produced by repeated controlled heat exposure."
    ],
    [
      "Heat stroke",
      "A medical emergency involving severe hyperthermia and central nervous system dysfunction."
    ]
  ],
  "note": "Individual risk depends on workload, clothing, humidity, radiant heat, acclimatization, hydration, health, medication, and recovery. Suspected heat stroke requires immediate emergency cooling and medical response.",
  "sources": "Technical concepts checked against CDC/NIOSH heat-stress guidance; ONR Warfighter Performance research covers physiology, cognition, resilience, monitoring, training, and human effectiveness.",
  "chapters": [
    {
      "id": "compensate",
      "cards": [
        [
          "gain",
          "Muscle work and the environment add heat to the body"
        ],
        [
          "skin",
          "Skin blood flow increases to move heat outward"
        ],
        [
          "sweat",
          "Sweat glands release fluid onto the skin"
        ],
        [
          "evaporate",
          "Evaporation carries heat into the surrounding air"
        ]
      ]
    },
    {
      "id": "strain",
      "cards": [
        [
          "lose",
          "Continued sweating reduces body water"
        ],
        [
          "volume",
          "Lower circulating volume makes cooling harder"
        ],
        [
          "heart",
          "Heart rate rises to maintain skin and muscle blood flow"
        ],
        [
          "impair",
          "Core temperature and performance begin to deteriorate"
        ]
      ]
    },
    {
      "id": "recover",
      "cards": [
        [
          "recognize",
          "Monitoring or symptoms trigger a heat-stress response"
        ],
        [
          "stop",
          "Work and environmental exposure are reduced"
        ],
        [
          "cool",
          "Active cooling removes stored body heat"
        ],
        [
          "replace",
          "Fluid replacement and recovery restore physiological stability"
        ]
      ]
    }
  ],
  "chapterOrder": [
    "compensate",
    "strain",
    "recover"
  ],
  "intro": "The sailor begins work with a normal core temperature while the environment, clothing, and muscles create a growing heat load. Sequence A must show the body’s main mechanisms for moving that heat toward the environment.",
  "segues": [
    "The cooling response is active, but it consumes water and demands substantial circulation. If heat exposure and work continue, the same protective mechanisms can contribute to dehydration and cardiovascular strain.",
    "The sailor now shows physiological or performance evidence that compensation is failing. The next sequence must reduce heat gain, remove stored heat, replace losses, and verify recovery rather than simply encouraging continued effort."
  ],
  "hints": [
    "Skin blood flow increases before sweating and evaporation can remove large amounts of internal heat at the surface.",
    "Continued sweating reduces body water before reduced circulating volume raises cardiovascular strain."
  ],
  "collection": "ONR collection"
} };
