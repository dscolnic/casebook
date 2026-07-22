module.exports = { PACK: {
  "id": "ctd",
  "icon": "CTD",
  "discipline": "Oceanography & instrumentation",
  "title": "Reading the Water Column",
  "headline": "Reconstruct how a CTD profiler measures seawater and turns sensor data into an environmental profile.",
  "kicker": "Research vessel · An instrument package is ready for an ocean cast",
  "story": [
    "Scientists need to know how temperature, salinity, density, and sound speed change from the surface to depth.",
    "Arrange the instrument sampling, physical-property calculations, and quality-control steps that create a useful water-column profile."
  ],
  "principles": [
    [
      "The instrument measures proxies",
      "A CTD measures electrical conductivity, temperature, and pressure; salinity and density are calculated from those observations."
    ],
    [
      "Measurements must describe the same water",
      "Sensor placement, water flow, and response time matter because the package moves through gradients."
    ],
    [
      "Pressure is used for depth",
      "Water pressure increases with depth, so a calibrated pressure sensor provides the vertical coordinate."
    ],
    [
      "Profiles support other models",
      "The final variables influence currents, water-mass identification, buoyancy, and the speed and path of underwater sound."
    ]
  ],
  "terms": [
    [
      "CTD",
      "An instrument package measuring conductivity, temperature, and depth derived from pressure."
    ],
    [
      "Conductivity cell",
      "A sensor that measures how readily seawater carries electrical current."
    ],
    [
      "Salinity",
      "The concentration of dissolved salts, calculated from conductivity, temperature, and pressure."
    ],
    [
      "Pressure sensor",
      "A device measuring the force per area exerted by the water column."
    ],
    [
      "Pump",
      "A component that moves a controlled flow of seawater through sensors."
    ],
    [
      "Sensor lag",
      "Delay between a change in the water and the full response of a sensor."
    ],
    [
      "Density",
      "Mass per unit volume, controlled strongly by temperature, salinity, and pressure."
    ],
    [
      "Sound-speed profile",
      "The change of acoustic wave speed with depth."
    ]
  ],
  "note": "Operational CTD packages may carry oxygen, fluorescence, optical, and chemical sensors and may collect water bottles. Detailed processing includes alignment, filtering, hysteresis, and ship-motion corrections.",
  "sources": "Technical concepts checked against NOAA Ocean Exploration descriptions of CTD instruments and profiles; ONR Code 32 supports ocean observation, environmental prediction, and ocean acoustics.",
  "chapters": [
    {
      "id": "sample",
      "cards": [
        [
          "lower",
          "The ship lowers the CTD package through the water column"
        ],
        [
          "pump",
          "A pump draws seawater through the sensor path"
        ],
        [
          "conduct",
          "The conductivity cell measures the water’s electrical response"
        ],
        [
          "tempdepth",
          "Temperature and pressure sensors measure the same sample"
        ]
      ]
    },
    {
      "id": "derive",
      "cards": [
        [
          "sync",
          "Electronics align the measurements by time and depth"
        ],
        [
          "calibrate",
          "Laboratory calibrations correct sensor response"
        ],
        [
          "salinity",
          "Conductivity, temperature, and pressure determine salinity"
        ],
        [
          "properties",
          "Salinity, temperature, and pressure determine density and sound speed"
        ]
      ]
    },
    {
      "id": "profile",
      "cards": [
        [
          "screen",
          "Quality checks remove unstable or contaminated samples"
        ],
        [
          "bin",
          "Measurements are averaged into depth intervals"
        ],
        [
          "interpret",
          "Scientists identify layers, fronts, and water masses"
        ],
        [
          "model",
          "The profile enters ocean and acoustic prediction models"
        ]
      ]
    }
  ],
  "chapterOrder": [
    "sample",
    "derive",
    "profile"
  ],
  "intro": "The instrument hangs above the sea with calibrated sensors but no observations from the water column. Sequence A must place the package in the ocean and ensure that several sensors characterize a common parcel of water.",
  "segues": [
    "The instrument now has synchronized electrical and pressure observations, not direct measurements of every desired ocean property. The next sequence applies calibration and seawater relationships to derive salinity, density, and sound speed.",
    "The derived values still contain samples affected by startup, flow disruption, or noise. The next sequence converts a raw cast into a depth-organized environmental product suitable for scientific and operational use."
  ],
  "hints": [
    "The pump draws seawater through the sensor path before the conductivity cell can characterize that flowing sample.",
    "Calibration corrections are applied before conductivity, temperature, and pressure are used to calculate salinity."
  ],
  "collection": "ONR collection"
} };
