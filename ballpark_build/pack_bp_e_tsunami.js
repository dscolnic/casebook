module.exports = { PACK: {
  "id": "bp_e_tsunami",
  "title": "Tsunamis Across the Ocean",
  "casebookTitle": "The Sable Point Wave",
  "tag": "oceanography · wave speed · runup",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Runup",
      "The maximum vertical height reached by a tsunami above sea level."
    ],
    [
      "Inundation",
      "Flooding of normally dry land."
    ],
    [
      "Travel-time map",
      "A model of how long a tsunami takes to reach different coasts."
    ],
    [
      "Deep-water wave",
      "A tsunami traveling rapidly with small height in the open ocean."
    ]
  ],
  "eqs": [
    {
      "id": "five_hour_range",
      "q": "Deep-ocean tsunami speed: estimate the result in kilometres using the real-world facts below.",
      "unit": "kilometres",
      "factors": [
        {
          "label": "Deep-ocean tsunami speed",
          "unit": "kilometres per hour",
          "value": 800,
          "display": "800",
          "desc": "NOAA’s jet-airliner-scale open-ocean speed.",
          "source": {
            "label": "NOAA — tsunami propagation",
            "url": "https://www.ncei.noaa.gov/products/natural-hazards/tsunamis-earthquakes-volcanoes/tsunamis/travel-time-maps",
            "accessed": "2026-07-18"
          },
          "id": "five_hour_range_f0",
          "playDesc": "NOAA’s jet-airliner-scale open-ocean speed."
        },
        {
          "label": "Travel time",
          "unit": "hours",
          "value": 5,
          "display": "5",
          "desc": "NOAA notes that Aleutian tsunamis can reach Hawaii in about this time.",
          "source": {
            "label": "NOAA — tsunami propagation",
            "url": "https://www.ncei.noaa.gov/products/natural-hazards/tsunamis-earthquakes-volcanoes/tsunamis/travel-time-maps",
            "accessed": "2026-07-18"
          },
          "id": "five_hour_range_f1",
          "playDesc": "NOAA notes that Aleutian tsunamis can reach Hawaii in about this time."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 4000,
      "answerDisplay": "4,000",
      "explain": "Speed multiplied by time gives travel distance.",
      "revealQ": "How far can a tsunami moving at NOAA’s cited deep-ocean speed travel in five hours?",
      "sources": [
        {
          "label": "NOAA — tsunami propagation",
          "url": "https://www.ncei.noaa.gov/products/natural-hazards/tsunamis-earthquakes-volcanoes/tsunamis/travel-time-maps",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "japan_runup",
      "q": "Confirmed runup: estimate the result in metres using the real-world facts below.",
      "unit": "metres",
      "factors": [
        {
          "label": "Confirmed runup",
          "unit": "feet",
          "value": 130,
          "display": "130",
          "desc": "NOAA reports a confirmed runup of this scale.",
          "source": {
            "label": "NOAA — 2011 Japan tsunami",
            "url": "https://sos.noaa.gov/catalog/datasets/japan-tsunami-wave-propagation-march-11-2011/",
            "accessed": "2026-07-18"
          },
          "id": "japan_runup_f0",
          "playDesc": "NOAA reports a confirmed runup of this scale."
        },
        {
          "label": "Metres per foot",
          "unit": "metres per foot",
          "value": 0.3048,
          "display": "0.3048",
          "desc": "Defined length conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "japan_runup_f1",
          "playDesc": "The number of metres corresponding to one foot."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 39.624,
      "answerDisplay": "39.62",
      "explain": "Convert feet to metres.",
      "revealQ": "How many metres is the 2011 Japan tsunami’s confirmed 130-foot runup?",
      "sources": [
        {
          "label": "NOAA — 2011 Japan tsunami",
          "url": "https://sos.noaa.gov/catalog/datasets/japan-tsunami-wave-propagation-march-11-2011/",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "atlantic_crossing",
      "q": "Open-ocean tsunami speed: estimate the result in kilometres using the real-world facts below.",
      "unit": "kilometres",
      "factors": [
        {
          "label": "Open-ocean tsunami speed",
          "unit": "miles per hour",
          "value": 500,
          "display": "500",
          "desc": "NOAA’s approximate jet-speed comparison.",
          "source": {
            "label": "NOAA — tsunami propagation",
            "url": "https://www.ncei.noaa.gov/products/natural-hazards/tsunamis-earthquakes-volcanoes/tsunamis/travel-time-maps",
            "accessed": "2026-07-18"
          },
          "id": "atlantic_crossing_f0",
          "playDesc": "NOAA’s approximate jet-speed comparison."
        },
        {
          "label": "Example Atlantic travel time",
          "unit": "hours",
          "value": 8.5,
          "display": "8.5",
          "desc": "NOAA’s Portugal-to-North-Carolina example.",
          "source": {
            "label": "NOAA — tsunami propagation",
            "url": "https://www.ncei.noaa.gov/products/natural-hazards/tsunamis-earthquakes-volcanoes/tsunamis/travel-time-maps",
            "accessed": "2026-07-18"
          },
          "id": "atlantic_crossing_f1",
          "playDesc": "NOAA’s Portugal-to-North-Carolina example."
        },
        {
          "label": "Kilometres per mile",
          "unit": "kilometres per mile",
          "value": 1.60934,
          "display": "1.60934",
          "desc": "Defined length conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "atlantic_crossing_f2",
          "playDesc": "The conversion factor from one mile to kilometres."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "answer": 6839.695,
      "answerDisplay": "6,839.7",
      "explain": "Multiply speed by time and convert miles to kilometres.",
      "revealQ": "At five hundred miles per hour, how many kilometres does a tsunami travel during NOAA’s Portugal-to-North-Carolina example?",
      "sources": [
        {
          "label": "NOAA — tsunami propagation",
          "url": "https://www.ncei.noaa.gov/products/natural-hazards/tsunamis-earthquakes-volcanoes/tsunamis/travel-time-maps",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "wave_growth",
      "q": "Coastal runup height: estimate the result in times taller using the real-world facts below.",
      "unit": "times taller",
      "factors": [
        {
          "label": "Coastal runup height",
          "unit": "metres",
          "value": 20,
          "display": "20",
          "desc": "A NOAA global-historical-data example of large runup.",
          "source": {
            "label": "NOAA — tsunami propagation",
            "url": "https://www.ncei.noaa.gov/products/natural-hazards/tsunamis-earthquakes-volcanoes/tsunamis/travel-time-maps",
            "accessed": "2026-07-18"
          },
          "id": "wave_growth_f0",
          "playDesc": "A NOAA global-historical-data example of large runup."
        },
        {
          "label": "Open-ocean wave height",
          "unit": "centimetres",
          "value": 30,
          "display": "30",
          "desc": "A representative open-ocean height cited in NOAA material.",
          "source": {
            "label": "NOAA — tsunami propagation",
            "url": "https://www.ncei.noaa.gov/products/natural-hazards/tsunamis-earthquakes-volcanoes/tsunamis/travel-time-maps",
            "accessed": "2026-07-18"
          },
          "id": "wave_growth_f1",
          "playDesc": "A representative open-ocean height cited in NOAA material."
        },
        {
          "label": "Centimetres per metre",
          "unit": "centimetres per metre",
          "value": 100,
          "display": "100",
          "desc": "Defined metric conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "wave_growth_f2",
          "playDesc": "The conversion factor from one metre to centimetres."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "answer": 6,
      "answerDisplay": "6",
      "explain": "Convert the coastal height to centimetres, then divide by the open-ocean height.",
      "revealQ": "How many times taller is a twenty-metre coastal runup than a thirty-centimetre open-ocean wave?",
      "sources": [
        {
          "label": "NOAA — tsunami propagation",
          "url": "https://www.ncei.noaa.gov/products/natural-hazards/tsunamis-earthquakes-volcanoes/tsunamis/travel-time-maps",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ]
    }
  ],
  "sourceSummary": "Every playable value is linked to an official, institutional, scholarly, or defined-conversion source in the reveal."
} };
