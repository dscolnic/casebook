module.exports = { PACK: {
  "id": "infrared",
  "icon": "IR",
  "discipline": "Electro-optics & sensors",
  "title": "Seeing Heat",
  "headline": "Reconstruct how an infrared camera turns invisible thermal radiation into a calibrated image.",
  "kicker": "Night surveillance laboratory · A warm object is present beyond visible-light range",
  "story": [
    "A camera is pointed toward a dark coastal scene. Ordinary visible-light contrast is poor, but objects and the environment emit and reflect infrared radiation.",
    "Arrange the optical, electronic, and computational operations that turn that radiation into a useful image."
  ],
  "principles": [
    [
      "Radiation carries information",
      "Objects emit infrared radiation according to temperature, surface properties, and wavelength. The camera measures radiation, not temperature directly."
    ],
    [
      "Optics map direction to position",
      "A lens or mirror system sends radiation arriving from different directions to different detector pixels."
    ],
    [
      "Detectors need electronics",
      "Absorbed infrared energy creates a small electrical response that must be read, amplified, and digitized."
    ],
    [
      "Calibration is part of measurement",
      "Pixels respond differently and the camera itself emits heat. Useful imagery requires corrections before contrast or temperature is interpreted."
    ]
  ],
  "terms": [
    [
      "Infrared radiation",
      "Electromagnetic radiation with wavelengths longer than visible red light."
    ],
    [
      "Spectral band",
      "A selected range of wavelengths admitted by the optics and detector."
    ],
    [
      "Focal plane array",
      "A grid of detector pixels located where the optics form the image."
    ],
    [
      "Cryogenic cooling",
      "Cooling a detector to reduce thermal noise and unwanted self-emission."
    ],
    [
      "Readout integrated circuit",
      "Electronics connected to detector pixels that collect and transfer their signals."
    ],
    [
      "Analog-to-digital converter",
      "A circuit that converts a continuously varying electrical signal into numerical samples."
    ],
    [
      "Nonuniformity correction",
      "A calibration that compensates for unequal pixel offsets and sensitivities."
    ],
    [
      "Dynamic range",
      "The span between the weakest and strongest signals an instrument can usefully measure."
    ]
  ],
  "note": "Infrared cameras use several detector materials, wavelength bands, cooling approaches, and processing architectures. This game represents a cooled thermal-infrared imaging chain.",
  "sources": "Technical concepts checked against NASA descriptions of thermal-infrared focal-plane arrays and detector/readout systems; ONR alignment comes from electro-optics, infrared sensing, electronics, and C5ISRT research.",
  "chapters": [
    {
      "id": "collect",
      "cards": [
        [
          "emit",
          "A warm object emits infrared radiation"
        ],
        [
          "window",
          "The camera window admits the selected infrared band"
        ],
        [
          "focus",
          "The optics focus each viewing direction onto the focal plane"
        ],
        [
          "absorb",
          "Detector pixels absorb the focused infrared energy"
        ]
      ]
    },
    {
      "id": "convert",
      "cards": [
        [
          "response",
          "Absorbed energy changes each pixel’s electrical signal"
        ],
        [
          "readout",
          "The readout circuit measures the pixel signals"
        ],
        [
          "amplify",
          "Low-noise electronics amplify the analog data"
        ],
        [
          "digitize",
          "The converter turns the signals into numerical pixel values"
        ]
      ]
    },
    {
      "id": "image",
      "cards": [
        [
          "reference",
          "Calibration references estimate pixel offset and sensitivity"
        ],
        [
          "correct",
          "Processing corrects unequal and defective pixels"
        ],
        [
          "contrast",
          "Image mapping reveals meaningful thermal contrast"
        ],
        [
          "track",
          "Detection software identifies and tracks an object"
        ]
      ]
    }
  ],
  "chapterOrder": [
    "collect",
    "convert",
    "image"
  ],
  "intro": "The scene exists only as infrared radiation arriving from many directions. Sequence A must show how an optical instrument selects that radiation and maps the scene onto individual sensing elements.",
  "segues": [
    "The detector array now contains a spatial pattern of extremely small physical responses. Those responses are not yet a digital image; receiver electronics must preserve and measure them without allowing noise to dominate.",
    "The camera now has an array of numbers, but raw detector values include unequal pixel behavior and instrument effects. Calibration and image processing are required before an operator or algorithm can interpret the scene."
  ],
  "hints": [
    "The camera window admits the selected infrared wavelengths before the optics focus them onto the focal plane.",
    "The readout circuit measures the pixel signals before the analog-to-digital converter creates numerical values."
  ],
  "collection": "ONR collection"
} };
