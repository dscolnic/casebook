module.exports = { PACK: {
  "id": "assimilation",
  "icon": "4D",
  "discipline": "Ocean prediction & applied mathematics",
  "title": "From Ocean Sensor to Better Forecast",
  "headline": "Reconstruct how observations and a numerical model are combined to estimate and predict the ocean.",
  "kicker": "Fleet oceanography center · A glider crosses an evolving front",
  "story": [
    "A numerical ocean model predicts temperature, salinity, currents, and sea level, but its state is imperfect. New observations arrive from the ocean with their own errors and limited coverage.",
    "Arrange how observations are checked, compared with a model, assimilated, and used to evaluate the resulting forecast."
  ],
  "principles": [
    [
      "Neither model nor observation is perfect",
      "A model is spatially complete but approximate; an observation is more direct but sparse and noisy."
    ],
    [
      "Location and time are essential",
      "A measurement can only be compared with the model state representing the same place, depth, and time."
    ],
    [
      "The difference is informative",
      "The observation-minus-forecast difference reveals how the predicted state disagrees with reality."
    ],
    [
      "Uncertainty controls the correction",
      "Data assimilation should make a large correction only when the observation is informative relative to model uncertainty."
    ]
  ],
  "terms": [
    [
      "Numerical model",
      "Equations solved on a computer grid to simulate the ocean."
    ],
    [
      "State estimate",
      "The best available representation of variables throughout the modeled ocean."
    ],
    [
      "Quality control",
      "Tests identifying implausible, duplicated, contaminated, or poorly located data."
    ],
    [
      "Observation operator",
      "A calculation translating the model state into the quantity an instrument would measure."
    ],
    [
      "Innovation",
      "The difference between an observation and the model prediction of that observation."
    ],
    [
      "Data assimilation",
      "Mathematical combination of observations, a model forecast, and their uncertainties."
    ],
    [
      "Initialization",
      "The state used to begin a forecast calculation."
    ],
    [
      "Forecast verification",
      "Comparison of predictions with observations not already used to create them."
    ]
  ],
  "note": "Operational systems assimilate many observation types with sophisticated covariance models, bias corrections, ensembles, and coupled ocean-atmosphere components. This game shows one simplified cycle.",
  "sources": "Aligned with ONR Ocean, Atmosphere and Space Sciences priorities in observations, environmental evolution, data assimilation, coupled prediction, and limits of predictability.",
  "chapters": [
    {
      "id": "observe",
      "cards": [
        [
          "sample",
          "A glider measures temperature and salinity"
        ],
        [
          "locate",
          "Navigation and clocks assign position, depth, and time"
        ],
        [
          "transmit",
          "The platform sends the observations ashore"
        ],
        [
          "quality",
          "Automated checks flag unreliable measurements"
        ]
      ]
    },
    {
      "id": "assimilate",
      "cards": [
        [
          "forecast",
          "The ocean model predicts the observed quantities"
        ],
        [
          "innovation",
          "The system calculates observation-minus-forecast differences"
        ],
        [
          "weight",
          "Uncertainties determine how strongly each difference is trusted"
        ],
        [
          "analysis",
          "Assimilation produces an updated ocean state estimate"
        ]
      ]
    },
    {
      "id": "verify",
      "cards": [
        [
          "initialize",
          "The updated state initializes a new forecast"
        ],
        [
          "predict",
          "The model predicts currents, fronts, and water properties"
        ],
        [
          "compare",
          "Later independent observations test the prediction"
        ],
        [
          "improve",
          "Forecast errors guide model and observing improvements"
        ]
      ]
    }
  ],
  "chapterOrder": [
    "observe",
    "assimilate",
    "verify"
  ],
  "intro": "A mobile ocean sensor has gathered information along a narrow path, while a model represents the entire region imperfectly. Sequence A must turn the raw sensor output into observations with trustworthy coordinates and quality information.",
  "segues": [
    "The observations are now usable, but they cover only selected locations. The next sequence compares them with the model’s corresponding predictions and uses uncertainty to construct a more complete state estimate.",
    "The assimilation has produced a physically organized estimate across the model domain. The next sequence tests whether using that estimate actually improves prediction rather than merely fitting the observations already seen."
  ],
  "hints": [
    "Position, depth, and time are assigned before the observation can be compared with a model value.",
    "The model predicts the observed quantity before the observation-minus-forecast difference can be calculated."
  ],
  "collection": "ONR collection"
} };
