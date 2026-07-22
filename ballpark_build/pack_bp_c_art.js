module.exports = { PACK: {
  "id": "bp_c_art",
  "title": "Artworks, Images, and Authentication",
  "casebookTitle": "The Halberstadt Panel",
  "tag": "art history · imaging · conservation",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Provenance",
      "Documented ownership history of an artwork."
    ],
    [
      "Pigment analysis",
      "Scientific identification of coloring materials."
    ],
    [
      "Gigapixel",
      "One billion image pixels."
    ],
    [
      "Panel painting",
      "Painting made on a rigid wooden support."
    ]
  ],
  "eqs": [
    {
      "id": "mona_area",
      "q": "Mona Lisa height: estimate the result in square metres using the real-world facts below.",
      "unit": "square metres",
      "factors": [
        {
          "label": "Mona Lisa height",
          "unit": "metres",
          "value": 0.77,
          "display": "0.77",
          "desc": "Louvre dimensions.",
          "source": {
            "label": "Louvre — Mona Lisa",
            "url": "https://collections.louvre.fr/en/ark:/53355/cl010062370",
            "accessed": "2026-07-18"
          },
          "id": "mona_area_f0",
          "playDesc": "Louvre dimensions."
        },
        {
          "label": "Mona Lisa width",
          "unit": "metres",
          "value": 0.53,
          "display": "0.53",
          "desc": "Louvre dimensions.",
          "source": {
            "label": "Louvre — Mona Lisa",
            "url": "https://collections.louvre.fr/en/ark:/53355/cl010062370",
            "accessed": "2026-07-18"
          },
          "id": "mona_area_f1",
          "playDesc": "Louvre dimensions."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 0.4081,
      "answerDisplay": "0.4081",
      "explain": "Height times width gives rectangular area.",
      "revealQ": "What is the painted area of the Mona Lisa using its 0.77-by-0.53-metre dimensions?",
      "sources": [
        {
          "label": "Louvre — Mona Lisa",
          "url": "https://collections.louvre.fr/en/ark:/53355/cl010062370",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "pearl_area",
      "q": "Painting height: estimate the result in square metres using the real-world facts below.",
      "unit": "square metres",
      "factors": [
        {
          "label": "Painting height",
          "unit": "metres",
          "value": 0.445,
          "display": "0.445",
          "desc": "Mauritshuis dimensions.",
          "source": {
            "label": "Mauritshuis — Girl with a Pearl Earring",
            "url": "https://www.mauritshuis.nl/en/our-collection/artworks/670-girl-with-a-pearl-earring/",
            "accessed": "2026-07-18"
          },
          "id": "pearl_area_f0",
          "playDesc": "Mauritshuis dimensions."
        },
        {
          "label": "Painting width",
          "unit": "metres",
          "value": 0.39,
          "display": "0.39",
          "desc": "Mauritshuis dimensions.",
          "source": {
            "label": "Mauritshuis — Girl with a Pearl Earring",
            "url": "https://www.mauritshuis.nl/en/our-collection/artworks/670-girl-with-a-pearl-earring/",
            "accessed": "2026-07-18"
          },
          "id": "pearl_area_f1",
          "playDesc": "Mauritshuis dimensions."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 0.17355,
      "answerDisplay": "0.1736",
      "explain": "Multiply height by width.",
      "revealQ": "What is the rectangular area of Girl with a Pearl Earring using 0.445 by 0.39 metres?",
      "sources": [
        {
          "label": "Mauritshuis — Girl with a Pearl Earring",
          "url": "https://www.mauritshuis.nl/en/our-collection/artworks/670-girl-with-a-pearl-earring/",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "nightwatch_area_cm2",
      "q": "Night Watch height: estimate the result in square centimetres using the real-world facts below.",
      "unit": "square centimetres",
      "factors": [
        {
          "label": "Night Watch height",
          "unit": "metres",
          "value": 3.79,
          "display": "3.79",
          "desc": "Rijksmuseum painting dimension.",
          "source": {
            "label": "Rijksmuseum — Operation Night Watch",
            "url": "https://www.rijksmuseum.nl/en/stories/operation-night-watch",
            "accessed": "2026-07-18"
          },
          "id": "nightwatch_area_cm2_f0",
          "playDesc": "Rijksmuseum painting dimension."
        },
        {
          "label": "Night Watch width",
          "unit": "metres",
          "value": 4.535,
          "display": "4.535",
          "desc": "Rijksmuseum painting dimension.",
          "source": {
            "label": "Rijksmuseum — Operation Night Watch",
            "url": "https://www.rijksmuseum.nl/en/stories/operation-night-watch",
            "accessed": "2026-07-18"
          },
          "id": "nightwatch_area_cm2_f1",
          "playDesc": "Rijksmuseum painting dimension."
        },
        {
          "label": "Square centimetres per square metre",
          "unit": "square centimetres per square metre",
          "value": 10000,
          "display": "10,000",
          "desc": "Defined area conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "nightwatch_area_cm2_f2",
          "playDesc": "The number of square centimetres corresponding to one square metre."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "explain": "Multiply dimensions and convert square metres to square centimetres.",
      "answer": 171876.5,
      "answerDisplay": "≈ 171,876.5",
      "sources": [
        {
          "label": "Rijksmuseum — Operation Night Watch",
          "url": "https://www.rijksmuseum.nl/en/stories/operation-night-watch",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "What is the area of The Night Watch in square centimetres from its 3.79-by-4.535-metre dimensions?"
    },
    {
      "id": "nightwatch_scan_bytes",
      "q": "Night Watch scan resolution: estimate the result in bytes using the real-world facts below.",
      "unit": "bytes",
      "factors": [
        {
          "label": "Night Watch scan resolution",
          "unit": "gigapixels",
          "value": 717,
          "display": "717",
          "desc": "Published Operation Night Watch image scale.",
          "source": {
            "label": "Rijksmuseum — Operation Night Watch",
            "url": "https://www.rijksmuseum.nl/en/stories/operation-night-watch",
            "accessed": "2026-07-18"
          },
          "id": "nightwatch_scan_bytes_f0",
          "playDesc": "Published Operation Night Watch image scale."
        },
        {
          "label": "Pixels per gigapixel",
          "unit": "pixels per gigapixel",
          "value": 1000000000,
          "display": "1,000,000,000",
          "desc": "Defined decimal prefix conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "nightwatch_scan_bytes_f1",
          "playDesc": "The number of pixels corresponding to one gigapixel."
        },
        {
          "label": "RGB bytes per pixel",
          "unit": "bytes per pixel",
          "value": 3,
          "display": "3",
          "desc": "Eight bits for each of three color channels.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "nightwatch_scan_bytes_f2",
          "playDesc": "Eight bits for each of three color channels."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "explain": "Convert gigapixels to pixels and multiply by bytes per pixel.",
      "answer": 2151000000000,
      "answerDisplay": "≈ 2,151,000,000,000",
      "sources": [
        {
          "label": "Rijksmuseum — Operation Night Watch",
          "url": "https://www.rijksmuseum.nl/en/stories/operation-night-watch",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        },
        {
          "label": "Defined mathematical relationship",
          "url": "https://www.nist.gov/pml/special-publication-811",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many bytes are in a 717-gigapixel RGB image at three bytes per pixel?"
    }
  ],
  "sourceSummary": "Every playable value is linked to an official, institutional, scholarly, or defined-conversion source in the reveal."
} };
