module.exports = { PACK: {
  "id": "bp_t_oncology",
  "title": "Radiation Therapy and Dose",
  "casebookTitle": "The Meredith Clinic Overdose",
  "tag": "radiotherapy · dose · treatment scale",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Gray",
      "One joule of absorbed radiation energy per kilogram."
    ],
    [
      "Fraction",
      "One treatment session in a radiation-therapy course."
    ],
    [
      "Dose rate",
      "Absorbed dose delivered per unit time."
    ],
    [
      "Linear accelerator",
      "A machine producing high-energy radiation for treatment."
    ]
  ],
  "eqs": [
    {
      "id": "gray_energy",
      "q": "Absorbed dose: estimate the result in joules using the real-world facts below.",
      "unit": "joules",
      "factors": [
        {
          "label": "Absorbed dose",
          "unit": "gray",
          "value": 0.75,
          "display": "0.75",
          "desc": "A defined absorbed-dose comparison.",
          "source": {
            "label": "IAEA — radiation dose units",
            "url": "https://www.iaea.org/resources/rpop/health-professionals/radiotherapy",
            "accessed": "2026-07-18"
          },
          "id": "gray_energy_f0",
          "playDesc": "The absorbed radiation dose used in this comparison, measured in gray."
        },
        {
          "label": "Irradiated tissue mass",
          "unit": "kilograms",
          "value": 1.5,
          "display": "1.5",
          "desc": "A defined tissue-mass comparison.",
          "source": {
            "label": "IAEA — radiation dose units",
            "url": "https://www.iaea.org/resources/rpop/health-professionals/radiotherapy",
            "accessed": "2026-07-18"
          },
          "id": "gray_energy_f1",
          "playDesc": "The mass of tissue receiving the absorbed dose in this comparison."
        }
      ],
      "ops": [
        "×"
      ],
      "explain": "Gray times kilograms gives joules.",
      "answer": 1.125,
      "answerDisplay": "≈ 1.12",
      "sources": [
        {
          "label": "IAEA — radiation dose units",
          "url": "https://www.iaea.org/resources/rpop/health-professionals/radiotherapy",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many joules are deposited when 0.75 gray is delivered to 1.5 kilograms of tissue?"
    },
    {
      "id": "course_dose",
      "q": "Dose per fraction: estimate the result in gray using the real-world facts below.",
      "unit": "gray",
      "factors": [
        {
          "label": "Dose per fraction",
          "unit": "gray per fraction",
          "value": 1.8,
          "display": "1.8",
          "desc": "Common conventional fraction size.",
          "source": {
            "label": "National Cancer Institute — radiation therapy",
            "url": "https://www.cancer.gov/about-cancer/treatment/types/radiation-therapy",
            "accessed": "2026-07-18"
          },
          "id": "course_dose_f0",
          "playDesc": "Common conventional fraction size."
        },
        {
          "label": "Number of fractions",
          "unit": "fractions",
          "value": 28,
          "display": "28",
          "desc": "A representative treatment-course length.",
          "source": {
            "label": "National Cancer Institute — radiation therapy",
            "url": "https://www.cancer.gov/about-cancer/treatment/types/radiation-therapy",
            "accessed": "2026-07-18"
          },
          "id": "course_dose_f1",
          "playDesc": "A representative treatment-course length."
        }
      ],
      "ops": [
        "×"
      ],
      "explain": "Multiply dose per fraction by fraction count.",
      "answer": 50.4,
      "answerDisplay": "≈ 50.4",
      "sources": [
        {
          "label": "National Cancer Institute — radiation therapy",
          "url": "https://www.cancer.gov/about-cancer/treatment/types/radiation-therapy",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "What total dose results from twenty-eight fractions of 1.8 gray?"
    },
    {
      "id": "beam_time",
      "q": "Prescribed dose: estimate the result in seconds using the real-world facts below.",
      "unit": "seconds",
      "factors": [
        {
          "label": "Prescribed dose",
          "unit": "gray",
          "value": 2,
          "display": "2",
          "desc": "A common single-fraction scale.",
          "source": {
            "label": "IAEA — radiation dose units",
            "url": "https://www.iaea.org/resources/rpop/health-professionals/radiotherapy",
            "accessed": "2026-07-18"
          },
          "id": "beam_time_f0",
          "playDesc": "A common single-fraction scale."
        },
        {
          "label": "Machine dose rate",
          "unit": "gray per minute",
          "value": 6,
          "display": "6",
          "desc": "Representative linear-accelerator output.",
          "source": {
            "label": "IAEA — radiation dose units",
            "url": "https://www.iaea.org/resources/rpop/health-professionals/radiotherapy",
            "accessed": "2026-07-18"
          },
          "id": "beam_time_f1",
          "playDesc": "Representative linear-accelerator output."
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
          "id": "beam_time_f2",
          "playDesc": "The number of seconds corresponding to one minute."
        }
      ],
      "ops": [
        "÷",
        "×"
      ],
      "explain": "Divide dose by dose rate, then convert minutes to seconds.",
      "answer": 20,
      "answerDisplay": "≈ 20",
      "sources": [
        {
          "label": "IAEA — radiation dose units",
          "url": "https://www.iaea.org/resources/rpop/health-professionals/radiotherapy",
          "accessed": "2026-07-18"
        },
        {
          "label": "NIST — SI units and conversions",
          "url": "https://www.nist.gov/pml/owm/si-units-information",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "How many seconds of beam time deliver two gray at six gray per minute?"
    },
    {
      "id": "annual_fractions",
      "q": "Annual cancer diagnoses: estimate the result in treatments using the real-world facts below.",
      "unit": "treatments",
      "factors": [
        {
          "label": "Annual cancer diagnoses",
          "unit": "people",
          "value": 2000000,
          "display": "2,000,000",
          "desc": "Approximate annual U.S. diagnosis scale.",
          "source": {
            "label": "National Cancer Institute — radiation therapy",
            "url": "https://www.cancer.gov/about-cancer/treatment/types/radiation-therapy",
            "accessed": "2026-07-18"
          },
          "id": "annual_fractions_f0",
          "playDesc": "Approximate annual U.S. diagnosis scale."
        },
        {
          "label": "Share receiving radiation",
          "unit": "fraction",
          "value": 0.5,
          "display": "0.5",
          "desc": "Commonly cited approximate share of cancer patients receiving radiotherapy.",
          "source": {
            "label": "National Cancer Institute — radiation therapy",
            "url": "https://www.cancer.gov/about-cancer/treatment/types/radiation-therapy",
            "accessed": "2026-07-18"
          },
          "id": "annual_fractions_f1",
          "playDesc": "Commonly cited approximate share of cancer patients receiving radiotherapy."
        },
        {
          "label": "Fractions per patient",
          "unit": "treatments per patient",
          "value": 30,
          "display": "30",
          "desc": "Representative multiweek course length.",
          "source": {
            "label": "National Cancer Institute — radiation therapy",
            "url": "https://www.cancer.gov/about-cancer/treatment/types/radiation-therapy",
            "accessed": "2026-07-18"
          },
          "id": "annual_fractions_f2",
          "playDesc": "Representative multiweek course length."
        }
      ],
      "ops": [
        "×",
        "×"
      ],
      "explain": "Multiply people by treatment share and fractions per treated patient.",
      "answer": 30000000,
      "answerDisplay": "≈ 30,000,000",
      "sources": [
        {
          "label": "National Cancer Institute — radiation therapy",
          "url": "https://www.cancer.gov/about-cancer/treatment/types/radiation-therapy",
          "accessed": "2026-07-18"
        }
      ],
      "revealQ": "If two million people are diagnosed with cancer, half receive radiation, and each receives thirty fractions, how many treatments is that?"
    }
  ],
  "sourceSummary": "Every playable value is linked to an official, institutional, scholarly, or defined-conversion source in the reveal."
} };
