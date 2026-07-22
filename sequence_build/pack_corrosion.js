module.exports = { PACK: {
  "id": "corrosion",
  "icon": "Fe",
  "discipline": "Materials science & sustainment",
  "title": "Stopping the Sea from Eating Steel",
  "headline": "Reconstruct how seawater corrosion begins, becomes structural damage, and is controlled.",
  "kicker": "Marine-structures laboratory · A protective coating has been damaged",
  "story": [
    "A steel structure spends years in conductive seawater while experiencing stress and repeated loading.",
    "Arrange the electrochemical reactions, growth of localized damage, and maintenance actions that preserve structural reliability."
  ],
  "principles": [
    [
      "Corrosion is an electrical-chemical circuit",
      "Oxidation and reduction occur at different locations while electrons travel through metal and ions travel through the electrolyte."
    ],
    [
      "Seawater closes the circuit",
      "Dissolved salts make seawater conductive enough to support electrochemical reactions."
    ],
    [
      "Localized damage is especially dangerous",
      "A small pit can concentrate stress and become a starting point for fatigue cracking."
    ],
    [
      "Protection interrupts one part of the system",
      "Coatings block contact, cathodic protection changes electrical potential, and inspection catches failure before it grows."
    ]
  ],
  "terms": [
    [
      "Oxidation",
      "A reaction in which an atom loses electrons."
    ],
    [
      "Reduction",
      "A reaction in which a chemical species gains or consumes electrons."
    ],
    [
      "Anode",
      "The region where metal oxidation occurs."
    ],
    [
      "Cathode",
      "The region where a reduction reaction consumes electrons."
    ],
    [
      "Electrolyte",
      "A conductive liquid containing mobile ions, such as seawater."
    ],
    [
      "Pitting corrosion",
      "Highly localized corrosion that creates deep cavities."
    ],
    [
      "Cathodic protection",
      "Supplying electrons or controlling potential so the protected metal is less likely to oxidize."
    ],
    [
      "Fatigue crack",
      "A crack that grows under repeated loading cycles."
    ]
  ],
  "note": "Marine corrosion involves many alloys, coatings, galvanic couples, microorganisms, oxygen gradients, flow conditions, and inspection methods. This game emphasizes pitting beneath coating damage.",
  "sources": "Aligned with ONR programs in corrosion science and control, coatings, structural reliability, non-destructive evaluation, prognostics, and materials for marine environments.",
  "chapters": [
    {
      "id": "cell",
      "cards": [
        [
          "damage",
          "A scratch exposes steel beneath the protective coating"
        ],
        [
          "wet",
          "Conductive seawater contacts the exposed metal"
        ],
        [
          "oxidize",
          "Iron atoms lose electrons at an anodic region"
        ],
        [
          "reduce",
          "A cathodic reaction consumes the electrons elsewhere"
        ]
      ]
    },
    {
      "id": "degrade",
      "cards": [
        [
          "products",
          "Dissolved iron forms corrosion products"
        ],
        [
          "pit",
          "Metal loss deepens into a localized pit"
        ],
        [
          "stress",
          "The pit concentrates mechanical stress"
        ],
        [
          "crack",
          "Repeated loading starts and grows a fatigue crack"
        ]
      ]
    },
    {
      "id": "protect",
      "cards": [
        [
          "inspect",
          "Inspection locates coating failure and material loss"
        ],
        [
          "prepare",
          "Damaged material is cleaned and the surface is prepared"
        ],
        [
          "coat",
          "A repaired barrier coating isolates the steel from seawater"
        ],
        [
          "cathodic",
          "Cathodic protection is checked to maintain protective potential"
        ]
      ]
    }
  ],
  "chapterOrder": [
    "cell",
    "degrade",
    "protect"
  ],
  "intro": "Most of the steel is covered, but a small defect has exposed bare metal to seawater. Sequence A must establish a complete electrochemical path rather than treating rust as a simple reaction between iron and water.",
  "segues": [
    "The coupled electrochemical reactions are now removing metal atoms from a localized region. The next sequence shows how microscopic material loss can become a mechanical threat under repeated loading.",
    "The structure now contains detectable damage with implications for strength and remaining life. The next sequence combines inspection, surface restoration, and electrical protection to interrupt further degradation."
  ],
  "hints": [
    "Seawater contacts the exposed steel before iron atoms can participate in the sustained corrosion cell.",
    "A localized pit concentrates stress before repeated loading grows a fatigue crack from that region."
  ],
  "collection": "ONR collection"
} };
