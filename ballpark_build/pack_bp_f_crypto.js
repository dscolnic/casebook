module.exports = { PACK: {
  "id": "bp_f_crypto",
  "title": "Cryptography: Keys, Blocks, and Brute Force",
  "casebookTitle": "The Cipher at Meridian Bank",
  "tag": "cryptography · keyspace · standards",
  "context": "These questions use real published values, documented typical ranges, and defined conversions. The fictional Casebook case supplies the subject area, not the numerical dataset.",
  "terms": [
    [
      "Keyspace",
      "All possible keys for a cipher."
    ],
    [
      "Block cipher",
      "A cipher processing fixed-size blocks."
    ],
    [
      "Bit",
      "A binary digit, zero or one."
    ],
    [
      "Brute force",
      "Trying possible keys until one works."
    ]
  ],
  "eqs": [
    {
      "id": "aes_bytes",
      "q": "AES key length: estimate the result in bytes using the real-world facts below.",
      "unit": "bytes",
      "factors": [
        {
          "label": "AES key length",
          "unit": "bits",
          "value": 128,
          "display": "128",
          "desc": "Standard AES key size.",
          "source": {
            "label": "NIST — AES standard",
            "url": "https://csrc.nist.gov/pubs/fips/197/final",
            "accessed": "2026-07-18"
          },
          "id": "aes_bytes_f0",
          "playDesc": "The aes key length documented or defined by NIST — AES standard."
        },
        {
          "label": "Bytes per bit",
          "unit": "bytes per bit",
          "value": 0.125,
          "display": "0.125",
          "desc": "One eighth byte per bit.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "aes_bytes_f1",
          "playDesc": "One eighth byte per bit."
        }
      ],
      "ops": [
        "×"
      ],
      "answer": 16,
      "answerDisplay": "16",
      "explain": "Convert bits to bytes.",
      "revealQ": "How many bytes are in a 128-bit AES key?",
      "sources": [
        {
          "label": "NIST — AES standard",
          "url": "https://csrc.nist.gov/pubs/fips/197/final",
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
      "id": "sha_hex",
      "q": "Hash length: estimate the result in hex characters using the real-world facts below.",
      "unit": "hex characters",
      "factors": [
        {
          "label": "Hash length",
          "unit": "bits",
          "value": 256,
          "display": "256",
          "desc": "SHA-256 output length.",
          "source": {
            "label": "NIST — AES standard",
            "url": "https://csrc.nist.gov/pubs/fips/197/final",
            "accessed": "2026-07-18"
          },
          "id": "sha_hex_f0",
          "playDesc": "SHA-256 output length."
        },
        {
          "label": "Bits per hexadecimal character",
          "unit": "bits per character",
          "value": 4,
          "display": "4",
          "desc": "Each hex digit represents four bits.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "sha_hex_f1",
          "playDesc": "Each hex digit represents four bits."
        }
      ],
      "ops": [
        "÷"
      ],
      "answer": 64,
      "answerDisplay": "64",
      "explain": "Divide bits by four.",
      "revealQ": "How many hexadecimal characters represent a 256-bit hash?",
      "sources": [
        {
          "label": "NIST — AES standard",
          "url": "https://csrc.nist.gov/pubs/fips/197/final",
          "accessed": "2026-07-18"
        },
        {
          "label": "Defined mathematical relationship",
          "url": "https://www.nist.gov/pml/special-publication-811",
          "accessed": "2026-07-18"
        }
      ]
    },
    {
      "id": "aes_years",
      "q": "AES-128 keyspace: estimate the result in years using the real-world facts below.",
      "unit": "years",
      "factors": [
        {
          "label": "AES-128 keyspace",
          "unit": "keys",
          "value": 3.4028237e+38,
          "display": "3.403×10³⁸",
          "desc": "Two to the 128th possible keys.",
          "source": {
            "label": "NIST — AES standard",
            "url": "https://csrc.nist.gov/pubs/fips/197/final",
            "accessed": "2026-07-18"
          },
          "id": "aes_years_f0",
          "playDesc": "Two to the 128th possible keys."
        },
        {
          "label": "Search rate",
          "unit": "keys per second",
          "value": 1000000000000000000,
          "display": "10¹⁸",
          "desc": "One quintillion trials each second.",
          "source": {
            "label": "Defined mathematical relationship",
            "url": "https://www.nist.gov/pml/special-publication-811",
            "accessed": "2026-07-18"
          },
          "id": "aes_years_f1",
          "playDesc": "One quintillion trials each second."
        },
        {
          "label": "Seconds per year",
          "unit": "seconds per year",
          "value": 31557600,
          "display": "31,557,600",
          "desc": "Average Gregorian-year conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "aes_years_f2",
          "playDesc": "The number of seconds corresponding to one year."
        }
      ],
      "ops": [
        "÷",
        "÷"
      ],
      "answer": 10782897622125.89,
      "answerDisplay": "10,782,897,622,126",
      "explain": "Divide keyspace by search rate and seconds per year.",
      "revealQ": "How many years would exhaustive AES-128 search take at one quintillion keys per second?",
      "sources": [
        {
          "label": "NIST — AES standard",
          "url": "https://csrc.nist.gov/pubs/fips/197/final",
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
      "id": "rsa_kib",
      "q": "RSA modulus: estimate the result in kibibytes using the real-world facts below.",
      "unit": "kibibytes",
      "factors": [
        {
          "label": "RSA modulus",
          "unit": "bits",
          "value": 2048,
          "display": "2,048",
          "desc": "Common RSA modulus size.",
          "source": {
            "label": "NIST — cryptographic standards and guidelines",
            "url": "https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines",
            "accessed": "2026-07-18"
          },
          "id": "rsa_kib_f0",
          "playDesc": "Common RSA modulus size."
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
          "id": "rsa_kib_f1",
          "playDesc": "The number of bits corresponding to one byte."
        },
        {
          "label": "Bytes per kibibyte",
          "unit": "bytes per kibibyte",
          "value": 1024,
          "display": "1,024",
          "desc": "Defined binary storage conversion.",
          "source": {
            "label": "NIST — SI units and conversions",
            "url": "https://www.nist.gov/pml/owm/si-units-information",
            "accessed": "2026-07-18"
          },
          "id": "rsa_kib_f2",
          "playDesc": "The number of bytes corresponding to one kibibyte."
        }
      ],
      "ops": [
        "÷",
        "÷"
      ],
      "answer": 0.25,
      "answerDisplay": "0.25",
      "explain": "Convert bits to bytes and bytes to kibibytes.",
      "revealQ": "How many kibibytes are in a 2,048-bit RSA modulus?",
      "sources": [
        {
          "label": "NIST — cryptographic standards and guidelines",
          "url": "https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines",
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
