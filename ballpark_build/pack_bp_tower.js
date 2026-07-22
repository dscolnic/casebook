module.exports = { PACK: {
  "id": "bp_tower",
  "title": "Burj Khalifa by the Numbers",
  "casebookTitle": "The Verrin Tower",
  "tag": "skyscrapers · elevators · concrete",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Architectural height",
      "Height to the building’s architectural top."
    ],
    [
      "Occupied floor",
      "A level designed for regular use."
    ],
    [
      "Cladding",
      "Exterior panels forming the building envelope."
    ],
    [
      "Concrete density",
      "Mass per unit volume of concrete."
    ]
  ],
  "eqs": [
    {
      "id": "height_feet",
      "q": "Burj Khalifa architectural height: estimate the result in feet using the real-world facts below.",
      "unit": "feet",
      "factors": [
        {
          "label": "Burj Khalifa architectural height",
          "unit": "metres",
          "value": 828,
          "display": "828",
          "desc": "CTBUH published height.",
          "source": {
            "label": "CTBUH — Burj Khalifa",
            "url": "https://www.skyscrapercenter.com/building/burj-khalifa/3",
            "accessed": "2026-07-18"
          },
          "id": "height_feet_f0",
          "playDesc": "CTBUH published height."
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
          "id": "height_feet_f1",
          "playDesc": "The number of feet corresponding to one metre."
        }
      ],
      "ops": [
        "×"
      ],
      "explain": "Convert metres to feet.",
      "answer": 2716.53552,
      "answerDisplay": "≈ 2,716.5",
      "sources": [
        {
          "label": "CTBUH — Burj Khalifa",
          "url": "https://www.skyscrapercenter.com/building/burj-khalifa/3",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How tall is the Burj Khalifa in feet?"
    },
    {
      "id": "elevator_time",
      "q": "Elevator travel height: estimate the result in seconds using the real-world facts below.",
      "unit": "seconds",
      "factors": [
        {
          "label": "Elevator travel height",
          "unit": "metres",
          "value": 504,
          "display": "504",
          "desc": "Published high-rise elevator travel scale.",
          "source": {
            "label": "CTBUH — Burj Khalifa",
            "url": "https://www.skyscrapercenter.com/building/burj-khalifa/3",
            "accessed": "2026-07-18"
          },
          "id": "elevator_time_f0",
          "playDesc": "Published high-rise elevator travel scale."
        },
        {
          "label": "Elevator speed",
          "unit": "metres per second",
          "value": 10,
          "display": "10",
          "desc": "Documented high-speed elevator scale.",
          "source": {
            "label": "CTBUH — Burj Khalifa",
            "url": "https://www.skyscrapercenter.com/building/burj-khalifa/3",
            "accessed": "2026-07-18"
          },
          "id": "elevator_time_f1",
          "playDesc": "Documented high-speed elevator scale."
        }
      ],
      "ops": [
        "÷"
      ],
      "explain": "Distance divided by speed gives travel time.",
      "answer": 50.4,
      "answerDisplay": "≈ 50.4",
      "sources": [
        {
          "label": "CTBUH — Burj Khalifa",
          "url": "https://www.skyscrapercenter.com/building/burj-khalifa/3",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How long would an elevator take to climb 504 metres at ten metres per second?"
    },
    {
      "id": "panels_per_ten_floors",
      "q": "Façade panels: estimate the result in panels per twenty floors using the real-world facts below.",
      "unit": "panels per twenty floors",
      "factors": [
        {
          "label": "Façade panels",
          "unit": "panels",
          "value": 26000,
          "display": "26,000",
          "desc": "Published façade-panel count.",
          "source": {
            "label": "CTBUH — Burj Khalifa",
            "url": "https://www.skyscrapercenter.com/building/burj-khalifa/3",
            "accessed": "2026-07-18"
          },
          "id": "panels_per_ten_floors_f0",
          "playDesc": "Published façade-panel count."
        },
        {
          "label": "Occupied floors",
          "unit": "floors",
          "value": 163,
          "display": "163",
          "desc": "Published floor count.",
          "source": {
            "label": "CTBUH — Burj Khalifa",
            "url": "https://www.skyscrapercenter.com/building/burj-khalifa/3",
            "accessed": "2026-07-18"
          },
          "id": "panels_per_ten_floors_f1",
          "playDesc": "Published floor count."
        },
        {
          "label": "Comparison floors",
          "unit": "floors",
          "value": 20,
          "display": "20",
          "desc": "A twenty-floor comparison block.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "panels_per_ten_floors_f2",
          "playDesc": "A ten-floor comparison block."
        }
      ],
      "ops": [
        "÷",
        "×"
      ],
      "explain": "Divide panels by floors and scale to ten floors.",
      "answer": 3190.184049079755,
      "answerDisplay": "≈ 3,190.2 panels per twenty floors",
      "sources": [
        {
          "label": "CTBUH — Burj Khalifa",
          "url": "https://www.skyscrapercenter.com/building/burj-khalifa/3",
          "accessed": "2026-07-18"
        },
        {
          "label": "Defined mathematical relationship",
          "url": "https://www.nist.gov/pml/special-publication-811",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many façade panels correspond to each ten floors of the Burj Khalifa?"
    },
    {
      "id": "concrete_mass",
      "q": "Concrete volume: estimate the result in tonnes using the real-world facts below.",
      "unit": "tonnes",
      "factors": [
        {
          "label": "Concrete volume",
          "unit": "cubic metres",
          "value": 330000,
          "display": "330,000",
          "desc": "Published construction concrete volume.",
          "source": {
            "label": "CTBUH — Burj Khalifa",
            "url": "https://www.skyscrapercenter.com/building/burj-khalifa/3",
            "accessed": "2026-07-18"
          },
          "id": "concrete_mass_f0",
          "playDesc": "Published construction concrete volume."
        },
        {
          "label": "Concrete density",
          "unit": "kilograms per cubic metre",
          "value": 2400,
          "display": "2,400",
          "desc": "Representative density of normal structural concrete.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "concrete_mass_f1",
          "playDesc": "Representative density of normal structural concrete."
        },
        {
          "label": "Kilograms per tonne",
          "unit": "kilograms per tonne",
          "value": 1000,
          "display": "1,000",
          "desc": "Defined mass conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "concrete_mass_f2",
          "playDesc": "The number of kilograms corresponding to one tonne."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "explain": "Multiply volume by density and convert kilograms to tonnes.",
      "answer": 792000,
      "answerDisplay": "≈ 792,000",
      "sources": [
        {
          "label": "CTBUH — Burj Khalifa",
          "url": "https://www.skyscrapercenter.com/building/burj-khalifa/3",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "What mass corresponds to 330,000 cubic metres of concrete at 2,400 kilograms per cubic metre?"
    }
  ],
  "sourceSummary": "Every playable value is linked to an official, institutional, scholarly, or defined-conversion source in the reveal."
} };
