module.exports = { PACK: {
  "id": "ins",
  "icon": "INS",
  "discipline": "Precision navigation & estimation",
  "title": "Finding Position Without GPS",
  "headline": "Reconstruct how an inertial navigation system measures motion, computes a path, and controls accumulating drift.",
  "kicker": "Submerged-navigation laboratory · Satellite signals are unavailable",
  "story": [
    "A vehicle knows its starting position and orientation, then enters an environment where GPS cannot be used continuously.",
    "Arrange how accelerometers, gyroscopes, coordinate calculations, integration, and external corrections produce a usable navigation solution."
  ],
  "principles": [
    [
      "Motion sensors do not measure position directly",
      "Gyroscopes measure rotation rate and accelerometers measure specific force. Position must be calculated from these measurements."
    ],
    [
      "Orientation controls interpretation",
      "The same sensor reading means something different when the vehicle has rotated. Measurements must be transformed into a fixed navigation frame."
    ],
    [
      "Integration magnifies small errors",
      "A tiny bias in acceleration can create growing velocity and position errors when integrated over time."
    ],
    [
      "Corrections should include uncertainty",
      "A navigation filter weighs the inertial prediction and an external observation according to how uncertain each one is."
    ]
  ],
  "terms": [
    [
      "Inertial measurement unit",
      "A package containing accelerometers and gyroscopes along several axes."
    ],
    [
      "Accelerometer",
      "A sensor that measures specific force along an axis."
    ],
    [
      "Gyroscope",
      "A sensor that measures angular rotation rate."
    ],
    [
      "Attitude",
      "The vehicle’s orientation relative to a reference frame."
    ],
    [
      "Navigation frame",
      "A coordinate system tied to Earth or the local environment."
    ],
    [
      "Bias",
      "A persistent sensor offset that causes accumulating error."
    ],
    [
      "Integration",
      "A mathematical operation that accumulates a rate or acceleration over time."
    ],
    [
      "Kalman filter",
      "An estimation method that combines predictions and measurements while tracking uncertainty."
    ]
  ],
  "note": "Real systems include Earth rotation, curved-Earth coordinates, lever-arm effects, detailed calibration, several external aiding sources, and complex filter architectures.",
  "sources": "Technical concepts checked against NIST descriptions of accelerometers, gyroscopes, and precision navigation without GPS; ONR supports precision navigation, timing, mathematical estimation, and autonomous systems.",
  "chapters": [
    {
      "id": "measure",
      "cards": [
        [
          "align",
          "The system establishes its starting position and orientation"
        ],
        [
          "gyro",
          "Gyroscopes measure the vehicle’s rotation rates"
        ],
        [
          "accel",
          "Accelerometers measure specific force along three axes"
        ],
        [
          "sample",
          "Electronics time-stamp and calibrate the sensor samples"
        ]
      ]
    },
    {
      "id": "compute",
      "cards": [
        [
          "attitude",
          "Gyroscope data updates the estimated orientation"
        ],
        [
          "transform",
          "Orientation rotates acceleration into navigation coordinates"
        ],
        [
          "gravity",
          "The calculation removes the expected effect of gravity"
        ],
        [
          "integrate",
          "The system integrates acceleration into velocity and position"
        ]
      ]
    },
    {
      "id": "correct",
      "cards": [
        [
          "drift",
          "Sensor errors make the inertial position drift"
        ],
        [
          "observe",
          "An external aid supplies a position or velocity observation"
        ],
        [
          "compare",
          "The filter compares the observation with its prediction"
        ],
        [
          "update",
          "The corrected state and uncertainty replace the drifting estimate"
        ]
      ]
    }
  ],
  "chapterOrder": [
    "measure",
    "compute",
    "correct"
  ],
  "intro": "The vehicle begins with a known starting state but cannot obtain continuous satellite fixes. Sequence A must create synchronized measurements of translation and rotation that can support later navigation calculations.",
  "segues": [
    "The system now has calibrated motion measurements expressed in the sensor’s moving axes. The next sequence must determine orientation, transform the measurements into a stable coordinate system, and accumulate them into a path.",
    "The navigation computer now produces position and velocity continuously, but even excellent sensors contain tiny errors. The next sequence uses an independent observation to detect and reduce the resulting drift."
  ],
  "hints": [
    "Gyroscope data updates the estimated orientation before acceleration can be rotated into navigation coordinates.",
    "The external observation is compared with the inertial prediction before the filter updates the navigation state."
  ],
  "collection": "ONR collection"
} };
