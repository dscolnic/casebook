module.exports = { PACK: {
  "id": "bp_f_ai",
  "title": "Large Language Models by the Numbers",
  "casebookTitle": "The Aegis Model",
  "tag": "artificial intelligence · training · model scale",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Parameter",
      "A learned numerical weight in a model."
    ],
    [
      "Training token",
      "A piece of text processed during training."
    ],
    [
      "FLOP",
      "One floating-point arithmetic operation."
    ],
    [
      "Context window",
      "Maximum sequence length processed together."
    ]
  ],
  "eqs": [
    {
      "id": "bert_per_layer",
      "q": "BERT Base parameters: estimate the result in parameters per layer using the real-world facts below.",
      "unit": "parameters per layer",
      "factors": [
        {
          "label": "BERT Base parameters",
          "unit": "parameters",
          "value": 110000000,
          "display": "110,000,000",
          "desc": "Published BERT Base parameter count.",
          "source": {
            "label": "Google Research — BERT paper",
            "url": "https://arxiv.org/abs/1810.04805",
            "accessed": "2026-07-18"
          },
          "id": "bert_per_layer_f0",
          "playDesc": "Published BERT Base parameter count."
        },
        {
          "label": "Transformer layers",
          "unit": "layers",
          "value": 12,
          "display": "12",
          "desc": "Published BERT Base layer count.",
          "source": {
            "label": "Google Research — BERT paper",
            "url": "https://arxiv.org/abs/1810.04805",
            "accessed": "2026-07-18"
          },
          "id": "bert_per_layer_f1",
          "playDesc": "Published BERT Base layer count."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 9166666.666666666,
      "answerDisplay": "9,166,667",
      "explain": "Divide model parameters by layers for a rough average.",
      "revealQ": "About how many parameters per transformer layer are in BERT Base?",
      "sources": [
        {
          "label": "Google Research — BERT paper",
          "url": "https://arxiv.org/abs/1810.04805",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "token_sequences",
      "q": "GPT-3 training tokens: estimate the result in sequences using the real-world facts below.",
      "unit": "sequences",
      "factors": [
        {
          "label": "GPT-3 training tokens",
          "unit": "tokens",
          "value": 300000000000,
          "display": "300,000,000,000",
          "desc": "Published training-token scale.",
          "source": {
            "label": "OpenAI — GPT-3 paper",
            "url": "https://arxiv.org/abs/2005.14165",
            "accessed": "2026-07-18"
          },
          "id": "token_sequences_f0",
          "playDesc": "Published training-token scale."
        },
        {
          "label": "Tokens per sequence",
          "unit": "tokens per sequence",
          "value": 2048,
          "display": "2,048",
          "desc": "Sequence-length comparison.",
          "source": {
            "label": "OpenAI — GPT-3 paper",
            "url": "https://arxiv.org/abs/2005.14165",
            "accessed": "2026-07-18"
          },
          "id": "token_sequences_f1",
          "playDesc": "Sequence-length comparison."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 146484375,
      "answerDisplay": "146,484,375",
      "explain": "Divide total tokens by tokens per sequence.",
      "revealQ": "How many 2,048-token sequences are represented by 300 billion training tokens?",
      "sources": [
        {
          "label": "OpenAI — GPT-3 paper",
          "url": "https://arxiv.org/abs/2005.14165",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "weight_storage",
      "q": "GPT-3 parameters: estimate the result in gigabytes using the real-world facts below.",
      "unit": "gigabytes",
      "factors": [
        {
          "label": "GPT-3 parameters",
          "unit": "parameters",
          "value": 175000000000,
          "display": "175,000,000,000",
          "desc": "Published GPT-3 parameter count.",
          "source": {
            "label": "OpenAI — GPT-3 paper",
            "url": "https://arxiv.org/abs/2005.14165",
            "accessed": "2026-07-18"
          },
          "id": "weight_storage_f0",
          "playDesc": "Published GPT-3 parameter count."
        },
        {
          "label": "Bytes per parameter",
          "unit": "bytes per parameter",
          "value": 2,
          "display": "2",
          "desc": "Half-precision storage.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "weight_storage_f1",
          "playDesc": "Half-precision storage."
        },
        {
          "label": "Bytes per decimal gigabyte",
          "unit": "bytes per gigabyte",
          "value": 1000000000,
          "display": "1,000,000,000",
          "desc": "Defined decimal storage conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "weight_storage_f2",
          "playDesc": "The number of bytes corresponding to one decimal gigabyte."
        }
      ],
      "ops": [
        "×",
        "÷"
      ],
      "answer": 350,
      "answerDisplay": "350",
      "explain": "Multiply parameters by bytes and convert to gigabytes.",
      "revealQ": "How many gigabytes are needed to store 175 billion parameters at two bytes each?",
      "sources": [
        {
          "label": "OpenAI — GPT-3 paper",
          "url": "https://arxiv.org/abs/2005.14165",
          "accessed": "2026-07-18"
        },
        {
          "label": "Defined mathematical relationship",
          "url": "https://www.nist.gov/pml/special-publication-811",
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
      "id": "compute_days",
      "q": "Training compute: estimate the result in exaflop-days using the real-world facts below.",
      "unit": "exaflop-days",
      "factors": [
        {
          "label": "Training compute",
          "unit": "floating-point operations",
          "value": 3.14e+23,
          "display": "3.14×10²³",
          "desc": "Published GPT-3 training-compute estimate.",
          "source": {
            "label": "OpenAI — GPT-3 paper",
            "url": "https://arxiv.org/abs/2005.14165",
            "accessed": "2026-07-18"
          },
          "id": "compute_days_f0",
          "playDesc": "Published GPT-3 training-compute estimate."
        },
        {
          "label": "FLOPs per exaflop-second",
          "unit": "FLOPs per second",
          "value": 1000000000000000000,
          "display": "10¹⁸",
          "desc": "Defined exa-prefix conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "compute_days_f1",
          "playDesc": "The conversion factor from one exaflop-second to flops."
        },
        {
          "label": "Seconds per day",
          "unit": "seconds per day",
          "value": 86400,
          "display": "86,400",
          "desc": "Defined time conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "compute_days_f2",
          "playDesc": "The number of seconds corresponding to one day."
        }
      ],
      "ops": [
        "÷",
        "÷"
      ],
      "answer": 3.634259259259259,
      "answerDisplay": "3.634",
      "explain": "Convert operations to exaflop-seconds and then exaflop-days.",
      "revealQ": "How many exaflop-days is 3.14 × 10²³ floating-point operations?",
      "sources": [
        {
          "label": "OpenAI — GPT-3 paper",
          "url": "https://arxiv.org/abs/2005.14165",
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
