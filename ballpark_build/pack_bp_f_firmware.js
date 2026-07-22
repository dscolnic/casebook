module.exports = { PACK: {
  "id": "bp_f_firmware",
  "title": "Embedded Computers: Apollo to Arduino",
  "casebookTitle": "The Halden Infusion Pump",
  "tag": "firmware · memory · processors",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Firmware",
      "Software stored within a device."
    ],
    [
      "Word",
      "A processor’s native group of bits."
    ],
    [
      "Clock rate",
      "Processor cycles per second."
    ],
    [
      "Read-only memory",
      "Memory storing instructions that normally do not change."
    ]
  ],
  "eqs": [
    {
      "id": "arduino_bytes",
      "q": "Arduino flash memory: estimate the result in bytes using the real-world facts below.",
      "unit": "bytes",
      "factors": [
        {
          "label": "Arduino flash memory",
          "unit": "kilobytes",
          "value": 32,
          "display": "32",
          "desc": "Official Uno Rev3 specification.",
          "source": {
            "label": "Arduino — Uno Rev3 specifications",
            "url": "https://docs.arduino.cc/hardware/uno-rev3/",
            "accessed": "2026-07-18"
          },
          "id": "arduino_bytes_f0",
          "playDesc": "Official Uno Rev3 specification."
        },
        {
          "label": "Bytes per kibibyte",
          "unit": "bytes per kibibyte",
          "value": 1024,
          "display": "1,024",
          "desc": "Binary memory conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "arduino_bytes_f1",
          "playDesc": "The number of bytes corresponding to one kibibyte."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 32768,
      "answerDisplay": "32,768",
      "explain": "Convert kibibytes to bytes.",
      "revealQ": "How many bytes are in the Arduino Uno’s thirty-two kilobytes of flash memory?",
      "sources": [
        {
          "label": "Arduino — Uno Rev3 specifications",
          "url": "https://docs.arduino.cc/hardware/uno-rev3/",
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
      "id": "clock_ratio",
      "q": "Arduino clock: estimate the result in times using the real-world facts below.",
      "unit": "times",
      "factors": [
        {
          "label": "Arduino clock",
          "unit": "megahertz",
          "value": 16,
          "display": "16",
          "desc": "Official Uno clock rate.",
          "source": {
            "label": "Arduino — Uno Rev3 specifications",
            "url": "https://docs.arduino.cc/hardware/uno-rev3/",
            "accessed": "2026-07-18"
          },
          "id": "clock_ratio_f0",
          "playDesc": "Official Uno clock rate."
        },
        {
          "label": "Apollo computer clock",
          "unit": "megahertz",
          "value": 0.043,
          "display": "0.043",
          "desc": "Apollo Guidance Computer clock scale.",
          "source": {
            "label": "NASA — Apollo Guidance Computer",
            "url": "https://www.nasa.gov/history/alsj/a11/a11computers.html",
            "accessed": "2026-07-18"
          },
          "id": "clock_ratio_f1",
          "playDesc": "Apollo Guidance Computer clock scale."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 372.093023255814,
      "answerDisplay": "372.09",
      "explain": "Divide the modern microcontroller clock by the Apollo clock.",
      "revealQ": "How many times faster is a sixteen-megahertz Arduino clock than a 0.043-megahertz Apollo Guidance Computer clock?",
      "sources": [
        {
          "label": "Arduino — Uno Rev3 specifications",
          "url": "https://docs.arduino.cc/hardware/uno-rev3/",
          "accessed": "2026-07-18"
        },
        {
          "label": "NASA — Apollo Guidance Computer",
          "url": "https://www.nasa.gov/history/alsj/a11/a11computers.html",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "agc_ram",
      "q": "Apollo erasable-memory words: estimate the result in bytes using the real-world facts below.",
      "unit": "bytes",
      "factors": [
        {
          "label": "Apollo erasable-memory words",
          "unit": "words",
          "value": 2048,
          "display": "2,048",
          "desc": "Published AGC erasable-memory word count.",
          "source": {
            "label": "NASA — Apollo Guidance Computer",
            "url": "https://www.nasa.gov/history/alsj/a11/a11computers.html",
            "accessed": "2026-07-18"
          },
          "id": "agc_ram_f0",
          "playDesc": "Published AGC erasable-memory word count."
        },
        {
          "label": "Data bits per word",
          "unit": "bits per word",
          "value": 15,
          "display": "15",
          "desc": "AGC data-word size excluding parity.",
          "source": {
            "label": "NASA — Apollo Guidance Computer",
            "url": "https://www.nasa.gov/history/alsj/a11/a11computers.html",
            "accessed": "2026-07-18"
          },
          "id": "agc_ram_f1",
          "playDesc": "AGC data-word size excluding parity."
        },
        {
          "label": "Bits per byte",
          "unit": "bits per byte",
          "value": 8,
          "display": "8",
          "desc": "Defined digital conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "agc_ram_f2",
          "playDesc": "The number of bits corresponding to one byte."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "explain": "Multiply words by bits per word and divide by bits per byte.",
      "answer": 3840,
      "answerDisplay": "≈ 3,840",
      "sources": [
        {
          "label": "NASA — Apollo Guidance Computer",
          "url": "https://www.nasa.gov/history/alsj/a11/a11computers.html",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many bytes are represented by 2,048 words of fifteen bits each?"
    },
    {
      "id": "apollo_instructions",
      "q": "Instruction rate: estimate the result in instructions using the real-world facts below.",
      "unit": "instructions",
      "factors": [
        {
          "label": "Instruction rate",
          "unit": "instructions per second",
          "value": 85000,
          "display": "85,000",
          "desc": "Apollo computer performance scale.",
          "source": {
            "label": "NASA — Apollo Guidance Computer",
            "url": "https://www.nasa.gov/history/alsj/a11/a11computers.html",
            "accessed": "2026-07-18"
          },
          "id": "apollo_instructions_f0",
          "playDesc": "Apollo computer performance scale."
        },
        {
          "label": "Seconds per minute",
          "unit": "seconds per minute",
          "value": 60,
          "display": "60",
          "desc": "Defined time conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "apollo_instructions_f1",
          "playDesc": "The number of seconds corresponding to one minute."
        },
        {
          "label": "Run time",
          "unit": "minutes",
          "value": 10,
          "display": "10",
          "desc": "Comparison interval.",
          "source": {
            "label": "NASA — Apollo Guidance Computer",
            "url": "https://www.nasa.gov/history/alsj/a11/a11computers.html",
            "accessed": "2026-07-18"
          },
          "id": "apollo_instructions_f2",
          "playDesc": "Comparison interval."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "answer": 51000000,
      "answerDisplay": "51,000,000",
      "explain": "Instruction rate times seconds and minutes gives total instructions.",
      "revealQ": "How many instructions can an 85,000-instruction-per-second computer execute in ten minutes?",
      "sources": [
        {
          "label": "NASA — Apollo Guidance Computer",
          "url": "https://www.nasa.gov/history/alsj/a11/a11computers.html",
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
