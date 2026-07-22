module.exports = { PACK: {
  "id": "cyber",
  "icon": "CY",
  "discipline": "Cybersecurity & resilient computing",
  "title": "Detect, Isolate, Recover",
  "headline": "Reconstruct how a shipboard computing system responds to a suspected compromise without abandoning essential functions.",
  "kicker": "Resilient-systems exercise · Monitoring detects behavior outside the approved baseline",
  "story": [
    "A networked service begins making requests that are unusual for its role. An immediate shutdown could disrupt operations, but ignoring the behavior could allow the compromise to spread.",
    "Arrange the preparation, evidence-based containment, and trusted recovery process."
  ],
  "principles": [
    [
      "Detection needs a reference",
      "Abnormal behavior is easier to recognize when approved software, configurations, identities, and traffic patterns are known."
    ],
    [
      "One alert is not always proof",
      "Analysts and automated systems gain confidence by correlating evidence from several sources."
    ],
    [
      "Containment preserves options",
      "Isolation should limit spread while maintaining essential services through trusted alternatives when possible."
    ],
    [
      "Recovery must restore trust",
      "Restarting a compromised machine is not enough; vulnerable components, credentials, and persistence mechanisms must be addressed."
    ]
  ],
  "terms": [
    [
      "Asset inventory",
      "A record of approved devices, software, versions, and responsibilities."
    ],
    [
      "Telemetry",
      "Logs and measurements describing system behavior."
    ],
    [
      "Baseline",
      "A description of expected configuration or activity."
    ],
    [
      "Indicator of compromise",
      "Evidence suggesting unauthorized access or malicious activity."
    ],
    [
      "Segmentation",
      "Dividing a network so access between regions can be controlled."
    ],
    [
      "Credential",
      "Information or cryptographic material used to prove identity."
    ],
    [
      "Trusted image",
      "A verified software installation used to rebuild a system."
    ],
    [
      "Persistence",
      "A method allowing malicious access to survive restarts or routine changes."
    ]
  ],
  "note": "Incident response varies with mission, classification, architecture, authority, and evidence. This educational sequence emphasizes preparation, corroborated detection, containment, eradication, restoration, and monitoring.",
  "sources": "Aligned with ONR C5ISRT interests in cybersecurity, information assurance, resilient computing, communications, and decision-making under contested conditions; terminology is consistent with NIST incident-response concepts.",
  "chapters": [
    {
      "id": "prepare",
      "cards": [
        [
          "inventory",
          "Administrators record approved devices and software"
        ],
        [
          "identity",
          "Users and services authenticate with controlled credentials"
        ],
        [
          "telemetry",
          "Systems collect logs and network telemetry"
        ],
        [
          "baseline",
          "Monitoring establishes expected patterns of behavior"
        ]
      ]
    },
    {
      "id": "contain",
      "cards": [
        [
          "anomaly",
          "A process performs activity outside its normal role"
        ],
        [
          "correlate",
          "Multiple observations raise confidence in a compromise"
        ],
        [
          "isolate",
          "Defenders isolate the affected service or network segment"
        ],
        [
          "fallback",
          "Essential functions move to a trusted backup path"
        ]
      ]
    },
    {
      "id": "recover",
      "cards": [
        [
          "scope",
          "Investigators determine the affected accounts and systems"
        ],
        [
          "eradicate",
          "Vulnerable software, persistence, and credentials are replaced"
        ],
        [
          "restore",
          "Trusted components and verified data rebuild the service"
        ],
        [
          "monitor",
          "Heightened monitoring confirms safe reconnection"
        ]
      ]
    }
  ],
  "chapterOrder": [
    "prepare",
    "contain",
    "recover"
  ],
  "intro": "The system is still operating normally. Sequence A must create the identities, records, and behavioral evidence that will make a later compromise detectable and diagnosable.",
  "segues": [
    "The defenders now possess a reference for normal operation and a continuous stream of observations. The next sequence begins when behavior deviates from that reference and must be contained without unnecessary mission loss.",
    "The immediate spread has been limited and essential functions have an alternative path. The next sequence determines the true scope, removes the mechanism of compromise, and restores service from components that can be trusted."
  ],
  "hints": [
    "Systems collect logs and telemetry before monitoring can establish a meaningful behavioral baseline.",
    "Several observations raise confidence in a compromise before defenders isolate the affected service."
  ],
  "collection": "ONR collection"
} };
