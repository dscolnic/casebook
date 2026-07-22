module.exports = { PACK: {
  "id": "bp_f_netout",
  "title": "Internet Scale, Addresses, and Latency",
  "casebookTitle": "The Great Grey-Out",
  "tag": "internet · fiber · addressing",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "IPv4 address",
      "A thirty-two-bit Internet Protocol address."
    ],
    [
      "Latency",
      "Delay between sending and receiving data."
    ],
    [
      "Fiber propagation",
      "Travel of light signals through optical cable."
    ],
    [
      "Bit rate",
      "Number of bits transmitted per second."
    ]
  ],
  "eqs": [
    {
      "id": "addresses_person",
      "q": "IPv4 address space: estimate the result in addresses per person using the real-world facts below.",
      "unit": "addresses per person",
      "factors": [
        {
          "label": "IPv4 address space",
          "unit": "addresses",
          "value": 4294967296,
          "display": "4,294,967,296",
          "desc": "Two to the 32nd addresses.",
          "source": {
            "label": "IANA — IPv4 address space",
            "url": "https://www.iana.org/assignments/ipv4-address-space/ipv4-address-space.xhtml",
            "accessed": "2026-07-18"
          },
          "id": "addresses_person_f0",
          "playDesc": "Two to the 32nd addresses."
        },
        {
          "label": "World population scale",
          "unit": "people",
          "value": 8200000000,
          "display": "8,200,000,000",
          "desc": "Current global population order of magnitude.",
          "source": {
            "label": "ITU — global connectivity facts",
            "url": "https://www.itu.int/itu-d/reports/statistics/facts-figures-2024/",
            "accessed": "2026-07-18"
          },
          "id": "addresses_person_f1",
          "playDesc": "Current global population order of magnitude."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 0.5237764995121951,
      "answerDisplay": "0.5238",
      "explain": "Divide address space by people.",
      "revealQ": "How many IPv4 addresses exist per person in a world of 8.2 billion people?",
      "sources": [
        {
          "label": "IANA — IPv4 address space",
          "url": "https://www.iana.org/assignments/ipv4-address-space/ipv4-address-space.xhtml",
          "accessed": "2026-07-18"
        },
        {
          "label": "ITU — global connectivity facts",
          "url": "https://www.itu.int/itu-d/reports/statistics/facts-figures-2024/",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "bytes_per_second",
      "q": "Network link rate: estimate the result in gigabytes per second using the real-world facts below.",
      "unit": "gigabytes per second",
      "factors": [
        {
          "label": "Network link rate",
          "unit": "gigabits per second",
          "value": 100,
          "display": "100",
          "desc": "A common backbone link speed.",
          "source": {
            "label": "ITU — global connectivity facts",
            "url": "https://www.itu.int/itu-d/reports/statistics/facts-figures-2024/",
            "accessed": "2026-07-18"
          },
          "id": "bytes_per_second_f0",
          "playDesc": "A common backbone link speed."
        },
        {
          "label": "Gigabytes per gigabit",
          "unit": "gigabytes per gigabit",
          "value": 0.125,
          "display": "0.125",
          "desc": "Eight bits per byte.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "bytes_per_second_f1",
          "playDesc": "Eight bits per byte."
        }
      ],
      "ops": [
        "×"
      ],
      "explain": "Convert bits to bytes.",
      "answer": 12.5,
      "answerDisplay": "≈ 12.5",
      "sources": [
        {
          "label": "ITU — global connectivity facts",
          "url": "https://www.itu.int/itu-d/reports/statistics/facts-figures-2024/",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many gigabytes per second correspond to a one-hundred-gigabit-per-second link?"
    },
    {
      "id": "atlantic_latency",
      "q": "Cable route length: estimate the result in milliseconds using the real-world facts below.",
      "unit": "milliseconds",
      "factors": [
        {
          "label": "Cable route length",
          "unit": "kilometres",
          "value": 6600,
          "display": "6,600",
          "desc": "Transatlantic cable route scale.",
          "source": {
            "label": "ITU — global connectivity facts",
            "url": "https://www.itu.int/itu-d/reports/statistics/facts-figures-2024/",
            "accessed": "2026-07-18"
          },
          "id": "atlantic_latency_f0",
          "playDesc": "Transatlantic cable route scale."
        },
        {
          "label": "Light speed in fiber",
          "unit": "kilometres per second",
          "value": 200000,
          "display": "200,000",
          "desc": "Representative propagation speed.",
          "source": {
            "label": "ITU — global connectivity facts",
            "url": "https://www.itu.int/itu-d/reports/statistics/facts-figures-2024/",
            "accessed": "2026-07-18"
          },
          "id": "atlantic_latency_f1",
          "playDesc": "Representative propagation speed."
        },
        {
          "label": "Milliseconds per second",
          "unit": "milliseconds per second",
          "value": 1000,
          "display": "1,000",
          "desc": "Defined time conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "atlantic_latency_f2",
          "playDesc": "The conversion factor from one second to milliseconds."
        }
      ],
      "ops": [
        "÷",
        "×"
      ],
      "answer": 33,
      "answerDisplay": "33",
      "explain": "Distance divided by speed gives seconds; convert to milliseconds.",
      "revealQ": "What is the one-way propagation time across 6,600 kilometres of fiber at 200,000 kilometres per second?",
      "sources": [
        {
          "label": "ITU — global connectivity facts",
          "url": "https://www.itu.int/itu-d/reports/statistics/facts-figures-2024/",
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
      "id": "transfer_time",
      "q": "Data volume: estimate the result in seconds using the real-world facts below.",
      "unit": "seconds",
      "factors": [
        {
          "label": "Data volume",
          "unit": "gigabytes",
          "value": 400,
          "display": "400",
          "desc": "Large data-transfer comparison.",
          "source": {
            "label": "ITU — global connectivity facts",
            "url": "https://www.itu.int/itu-d/reports/statistics/facts-figures-2024/",
            "accessed": "2026-07-18"
          },
          "id": "transfer_time_f0",
          "playDesc": "Large data-transfer comparison."
        },
        {
          "label": "Gigabits per gigabyte",
          "unit": "gigabits per gigabyte",
          "value": 8,
          "display": "8",
          "desc": "Eight bits per byte.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "transfer_time_f1",
          "playDesc": "Eight bits per byte."
        },
        {
          "label": "Link rate",
          "unit": "gigabits per second",
          "value": 200,
          "display": "200",
          "desc": "A modern high-capacity optical-link scale.",
          "source": {
            "label": "ITU — global connectivity facts",
            "url": "https://www.itu.int/itu-d/reports/statistics/facts-figures-2024/",
            "accessed": "2026-07-18"
          },
          "id": "transfer_time_f2",
          "playDesc": "A modern high-capacity optical-link scale."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "explain": "Convert gigabytes to gigabits and divide by link rate.",
      "answer": 16,
      "answerDisplay": "≈ 16",
      "sources": [
        {
          "label": "ITU — global connectivity facts",
          "url": "https://www.itu.int/itu-d/reports/statistics/facts-figures-2024/",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many seconds does it take to transfer four hundred gigabytes over a two-hundred-gigabit-per-second link?"
    }
  ],
  "sourceSummary": "Every playable value is linked to an official, institutional, scholarly, or defined-conversion source in the reveal."
} };
