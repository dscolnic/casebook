module.exports = { PACK: {
  "id": "bp_m_sub",
  "title": "The Real Scale of the Deep Ocean",
  "casebookTitle": "The Carrow Deep Implosion",
  "tag": "deep ocean · pressure · sonar",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Challenger Deep",
      "The deepest known part of the ocean."
    ],
    [
      "Echo sounding",
      "Measuring depth from sound’s round-trip travel time."
    ],
    [
      "Atmosphere",
      "A pressure unit based on average sea-level air pressure."
    ],
    [
      "CTD",
      "An instrument package measuring conductivity, temperature, and depth."
    ]
  ],
  "eqs": [
    {
      "id": "pressure_at_challenger",
      "q": "Depth of Challenger Deep: estimate the result in atmospheres using the real-world facts below.",
      "unit": "atmospheres",
      "factors": [
        {
          "label": "Depth of Challenger Deep",
          "unit": "metres",
          "value": 10935,
          "display": "10,935",
          "desc": "NOAA reported depth.",
          "source": {
            "label": "NOAA — ocean depth facts",
            "url": "https://oceanservice.noaa.gov/facts/oceandepth.html",
            "accessed": "2026-07-18"
          },
          "id": "pressure_at_challenger_f0",
          "playDesc": "NOAA reported depth."
        },
        {
          "label": "Metres of seawater per atmosphere",
          "unit": "metres per atmosphere",
          "value": 10.06,
          "display": "10.06",
          "desc": "Approximate seawater pressure-depth conversion.",
          "source": {
            "label": "NOAA — ocean depth facts",
            "url": "https://oceanservice.noaa.gov/facts/oceandepth.html",
            "accessed": "2026-07-18"
          },
          "id": "pressure_at_challenger_f1",
          "playDesc": "The conversion factor from one atmosphere to metres of seawater."
        }
      ],
      "ops": [
        "÷"
      ],
      "explain": "Divide depth by metres of seawater per atmosphere.",
      "answer": 1086.9781312127236,
      "answerDisplay": "≈ 1,087",
      "sources": [
        {
          "label": "NOAA — ocean depth facts",
          "url": "https://oceanservice.noaa.gov/facts/oceandepth.html",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "Approximately how many atmospheres of pressure correspond to Challenger Deep?"
    },
    {
      "id": "average_depth_miles",
      "q": "Average ocean depth: estimate the result in miles using the real-world facts below.",
      "unit": "miles",
      "factors": [
        {
          "label": "Average ocean depth",
          "unit": "metres",
          "value": 3682,
          "display": "3,682",
          "desc": "NOAA global mean depth.",
          "source": {
            "label": "NOAA — ocean depth facts",
            "url": "https://oceanservice.noaa.gov/facts/oceandepth.html",
            "accessed": "2026-07-18"
          },
          "id": "average_depth_miles_f0",
          "playDesc": "NOAA global mean depth."
        },
        {
          "label": "Miles per metre",
          "unit": "miles per metre",
          "value": 0.000621371,
          "display": "0.000621371",
          "desc": "Defined length conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "average_depth_miles_f1",
          "playDesc": "The number of miles corresponding to one metre."
        }
      ],
      "ops": [
        "×"
      ],
      "explain": "Convert metres to miles.",
      "answer": 2.287888022,
      "answerDisplay": "≈ 2.29",
      "sources": [
        {
          "label": "NOAA — ocean depth facts",
          "url": "https://oceanservice.noaa.gov/facts/oceandepth.html",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How deep is the global ocean on average in miles?"
    },
    {
      "id": "challenger_echo",
      "q": "Challenger Deep depth: estimate the result in seconds using the real-world facts below.",
      "unit": "seconds",
      "factors": [
        {
          "label": "Challenger Deep depth",
          "unit": "metres",
          "value": 11034,
          "display": "11,034",
          "desc": "A documented deep-ocean measurement scale used for comparison.",
          "source": {
            "label": "NOAA — ocean depth facts",
            "url": "https://oceanservice.noaa.gov/facts/oceandepth.html",
            "accessed": "2026-07-18"
          },
          "id": "challenger_echo_f0",
          "playDesc": "A documented deep-ocean measurement scale used for comparison."
        },
        {
          "label": "Round-trip multiplier",
          "unit": "dimensionless",
          "value": 2,
          "display": "2",
          "desc": "The sound travels down and back.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "challenger_echo_f1",
          "playDesc": "The sound travels down and back."
        },
        {
          "label": "Representative sound speed in seawater",
          "unit": "metres per second",
          "value": 1500,
          "display": "1,500",
          "desc": "Standard rounded ocean-acoustics value.",
          "source": {
            "label": "NOAA — sound in the ocean",
            "url": "https://oceanservice.noaa.gov/facts/sound.html",
            "accessed": "2026-07-18"
          },
          "id": "challenger_echo_f2",
          "playDesc": "Standard rounded ocean-acoustics value."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "explain": "Double the depth and divide by sound speed.",
      "answer": 14.712,
      "answerDisplay": "≈ 14.7",
      "sources": [
        {
          "label": "NOAA — ocean depth facts",
          "url": "https://oceanservice.noaa.gov/facts/oceandepth.html",
          "accessed": "2026-07-18"
        },
        {
          "label": "Defined mathematical relationship",
          "url": "https://www.nist.gov/pml/special-publication-811",
          "accessed": "2026-07-18"
        },
        {
          "label": "NOAA — sound in the ocean",
          "url": "https://oceanservice.noaa.gov/facts/sound.html",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "About how long is a sonar round trip to Challenger Deep?"
    },
    {
      "id": "trieste_descent_rate",
      "q": "Trieste descent depth: estimate the result in feet per minute using the real-world facts below.",
      "unit": "feet per minute",
      "factors": [
        {
          "label": "Trieste descent depth",
          "unit": "metres",
          "value": 10916,
          "display": "10,916",
          "desc": "Historic Challenger Deep dive depth.",
          "source": {
            "label": "NOAA — ocean depth facts",
            "url": "https://oceanservice.noaa.gov/facts/oceandepth.html",
            "accessed": "2026-07-18"
          },
          "id": "trieste_descent_rate_f0",
          "playDesc": "Historic Challenger Deep dive depth."
        },
        {
          "label": "Feet per metre",
          "unit": "feet per metre",
          "value": 3.28084,
          "display": "3.28084",
          "desc": "Defined length conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "trieste_descent_rate_f1",
          "playDesc": "The number of feet corresponding to one metre."
        },
        {
          "label": "Descent duration",
          "unit": "minutes",
          "value": 287,
          "display": "287",
          "desc": "Historic dive descent duration.",
          "source": {
            "label": "NOAA — ocean depth facts",
            "url": "https://oceanservice.noaa.gov/facts/oceandepth.html",
            "accessed": "2026-07-18"
          },
          "id": "trieste_descent_rate_f2",
          "playDesc": "Historic dive descent duration."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "explain": "Convert the depth to feet and divide by descent time.",
      "answer": 124.7862349825784,
      "answerDisplay": "≈ 124.8",
      "sources": [
        {
          "label": "NOAA — ocean depth facts",
          "url": "https://oceanservice.noaa.gov/facts/oceandepth.html",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "What was the average descent rate in feet per minute if Trieste descended 10,916 metres in 287 minutes?"
    }
  ],
  "sourceSummary": "Every playable value is linked to an official, institutional, scholarly, or defined-conversion source in the reveal."
} };
