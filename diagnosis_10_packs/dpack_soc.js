// Diagnosis data pack — generated for the Diagnosis engine.
module.exports = { PACK: {
  "id": "soc",
  "title": "Egress Alert",
  "domain": "Cybersecurity security-operations monitoring",
  "role": "You are the SOC analyst triaging a large outbound-data alert.",
  "system": {
    "parts": [
      [
        "Endpoints and servers",
        "Users and applications read files, create archives, and initiate network sessions. Endpoint process and file-access telemetry show what prepared the data."
      ],
      [
        "Identity plane",
        "Accounts, tokens, and workload identities authorize access. Attackers may use valid credentials, so successful authentication is not automatically benign."
      ],
      [
        "Egress controls",
        "Proxies, firewalls, and cloud gateways record bytes, destinations, protocols, and timing. Misconfiguration can duplicate or misclassify traffic."
      ],
      [
        "Business workflows",
        "Backups, analytics exports, and vendor transfers can legitimately move large datasets, but should match schedules, approved destinations, owners, and manifests."
      ],
      [
        "Detection pipeline",
        "Rules combine network, identity, DLP, and endpoint evidence. A loud byte-count alarm must be checked against independent logs before declaring theft."
      ]
    ],
    "soWrong": "So a large outbound transfer may be stolen data, abuse of a trusted automation token, a duplicated telemetry stream, or an approved batch export. The right answer fits the destination, identity, file preparation, change records, and byte counts across independent sensors."
  },
  "salient": [
    "egress",
    "dest"
  ],
  "readings": {
    "egress": {
      "name": "Outbound-transfer shape",
      "purpose": "Pattern of bytes leaving the environment. A duplicated burst points to telemetry or routing error; sustained high transfer can be malicious or a legitimate batch.",
      "pin": {
        "x": 255,
        "y": 185
      },
      "zone": "network"
    },
    "dest": {
      "name": "Destination class",
      "purpose": "Whether traffic goes to a well-known approved cloud service or a newly seen external endpoint. Destination rarity raises suspicion but does not prove malice.",
      "pin": {
        "x": 410,
        "y": 165
      },
      "zone": "external"
    },
    "proxy": {
      "name": "Proxy byte count",
      "purpose": "Application-aware egress total. Comparing it with firewall and cloud logs reveals duplicated accounting or a transfer seen by only one sensor.",
      "pin": {
        "x": 325,
        "y": 85
      },
      "zone": "network"
    },
    "firewall": {
      "name": "Firewall session bytes",
      "purpose": "Independent network-flow total. Agreement supports real traffic; a large mismatch can expose a logging or mirroring misconfiguration.",
      "pin": {
        "x": 185,
        "y": 85
      },
      "zone": "network"
    },
    "files": {
      "name": "Sensitive-file access",
      "purpose": "Files opened before the transfer. Broad reads of finance, source code, or customer records support collection; a known export table supports an approved job.",
      "pin": {
        "x": 95,
        "y": 240
      },
      "zone": "endpoint"
    },
    "process": {
      "name": "Process and archive activity",
      "purpose": "Process tree, compression, staging directories, and command-line context. Unscheduled archive creation is a common precursor to exfiltration.",
      "pin": {
        "x": 90,
        "y": 135
      },
      "zone": "endpoint"
    },
    "identity": {
      "name": "Account and token context",
      "purpose": "Account owner, host, MFA, token age, and normal workload. A valid token used from a new host or outside its usual job can still be compromised.",
      "pin": {
        "x": 215,
        "y": 300
      },
      "zone": "identity"
    },
    "change": {
      "name": "Change ticket and job manifest",
      "purpose": "Approved owner, schedule, destination, expected size, and file hashes. A complete matching record is strong evidence for legitimate transfer.",
      "pin": {
        "x": 390,
        "y": 285
      },
      "zone": "governance"
    },
    "dlp": {
      "name": "DLP content classification",
      "purpose": "Content types observed in the outbound stream. Sensitive data beyond the declared manifest strengthens an exfiltration diagnosis.",
      "pin": {
        "x": 315,
        "y": 345
      },
      "zone": "content"
    }
  },
  "hypotheses": {
    "misconfig": {
      "label": "Telemetry-routing misconfiguration",
      "call": {
        "title": "Detection-pipeline misconfiguration — fix the duplicate path.",
        "arg": "One approved cloud stream is being counted twice by a proxy or mirror. Correct the routing and detection configuration."
      },
      "sig": {
        "egress": "duplicate-burst",
        "dest": "known-cloud",
        "proxy": "double",
        "firewall": "single",
        "files": "normal",
        "process": "normal",
        "identity": "normal",
        "change": "config-change",
        "dlp": "expected"
      }
    },
    "tokenabuse": {
      "label": "Compromised automation token",
      "call": {
        "title": "Automation-token abuse — revoke and contain.",
        "arg": "A trusted workload identity is moving data to an approved cloud service from the wrong host and outside its job pattern. Revoke the token and investigate the source."
      },
      "sig": {
        "egress": "sustained-high",
        "dest": "known-cloud",
        "proxy": "agree",
        "firewall": "agree",
        "files": "broad",
        "process": "staging",
        "identity": "anomalous",
        "change": "none",
        "dlp": "sensitive"
      }
    },
    "exfil": {
      "label": "Real data exfiltration",
      "call": {
        "title": "Data exfiltration — contain the host and account.",
        "arg": "Sensitive files were staged and sent to a new external endpoint without authorization. Stop the transfer, preserve evidence, and begin incident response."
      },
      "sig": {
        "egress": "sustained-high",
        "dest": "new-external",
        "proxy": "agree",
        "firewall": "agree",
        "files": "broad",
        "process": "archive",
        "identity": "anomalous",
        "change": "none",
        "dlp": "sensitive"
      }
    },
    "legitbatch": {
      "label": "Approved external batch export",
      "call": {
        "title": "Approved batch job — document and close.",
        "arg": "The transfer matches an authorized job, owner, destination, schedule, and manifest. No containment action is needed."
      },
      "sig": {
        "egress": "sustained-high",
        "dest": "new-external",
        "proxy": "agree",
        "firewall": "agree",
        "files": "manifest",
        "process": "approved-job",
        "identity": "normal",
        "change": "valid",
        "dlp": "expected"
      }
    }
  },
  "dismissal": "legitbatch",
  "reassuring": {
    "lab": "Endpoint protection",
    "val": "EDR HEALTHY — no malware verdict",
    "note": "A clean endpoint verdict does not rule out theft performed with valid credentials, trusted tools, or a compromised service token."
  },
  "rounds": [
    {
      "answer": "misconfig",
      "alarm": "egress",
      "poleA": {
        "lab": "Outbound volume",
        "val": "Two identical 900-GB bursts",
        "note": "The detection system reports two transfers to the same approved cloud collector within seconds."
      },
      "hook": "Minutes after a logging-platform change, the SOC dashboard claims that a monitoring server exported 1.8 TB. Endpoint protection remains green.",
      "riddle": "Did the server send the dataset twice — <span class=\"q\">or did the monitoring path count one transfer twice?</span>",
      "vals": {
        "egress": "two identical 900-GB bursts, 4 seconds apart",
        "dest": "approved observability cloud tenant",
        "proxy": "1.80 TB recorded",
        "firewall": "0.90 TB on one session",
        "files": "only expected log segments read",
        "process": "signed telemetry agent; no archive or staging",
        "identity": "usual host and workload token",
        "change": "ticket CHG-8421 enabled a second proxy mirror 7 minutes earlier",
        "dlp": "expected operational logs only"
      },
      "reasons": {
        "tokenabuse": "Automation-token abuse can send real data to an approved cloud service, but independent network sensors should agree on the volume and the identity or host context should be abnormal. The firewall sees only one 900-GB session and the token is on its usual host.",
        "exfil": "Real exfiltration would require actual traffic to a new or unauthorized endpoint and usually sensitive file collection. The destination is approved, the firewall sees half the alert volume, and only expected logs were read.",
        "legitbatch": "An approved batch can legitimately move high volume, but it would be one real transfer matching a job manifest. Here the distinctive feature is duplicated accounting immediately after a proxy-mirroring change."
      },
      "resolve": {
        "title": "Telemetry-routing misconfiguration — one approved stream was counted twice.",
        "paras": [
          "The proxy reports two byte-identical bursts, but the independent firewall records one 900-GB session. File access, process activity, identity, destination, and DLP content are all expected, and the duplicate begins immediately after a second mirror was enabled. Fix the routing and suppress the duplicate path.",
          "This is a naked single. Only the misconfiguration produces the duplicate-burst shape on the loud panel. Every real transfer candidate produces one sustained stream."
        ],
        "why": {
          "loud": "<b>Why the loud reading was enough</b>: two byte-identical bursts separated by four seconds are unique to duplicated accounting in this differential.",
          "quiet": "<b>Why a healthy EDR is not decisive</b>: it is consistent with this benign configuration error, but it would also be consistent with credential-based theft."
        },
        "chain": [
          "A second telemetry mirror is enabled",
          "One network session is ingested by two paths",
          "The SOC doubles the outbound byte count and fires a false alert"
        ],
        "take": "Before treating volume as physical truth, reconcile byte counts across independent network sensors."
      }
    },
    {
      "answer": "tokenabuse",
      "alarm": "egress",
      "poleA": {
        "lab": "Cloud upload",
        "val": "Sustained 420 Mbps to an approved bucket",
        "note": "The destination is familiar, but the workload identity is operating from the wrong host."
      },
      "hook": "An automation token used by the finance pipeline begins uploading hundreds of gigabytes to the company’s normal cloud provider. No approved job is scheduled.",
      "riddle": "Does the familiar destination make this safe — <span class=\"q\">or has a trusted identity been turned into the exfiltration path?</span>",
      "vals": {
        "egress": "420 Mbps sustained for 36 minutes",
        "dest": "approved corporate object-storage service",
        "proxy": "113 GB, matches session total",
        "firewall": "112 GB, matches proxy",
        "files": "customer exports and source repositories read",
        "process": "temporary staging directory and multipart uploader",
        "identity": "finance-pipeline token used from a developer workstation for first time",
        "change": "no job, ticket, or owner approval",
        "dlp": "customer identifiers and source code"
      },
      "reasons": {
        "misconfig": "A duplicated-telemetry error would produce disagreeing byte counts between sensors and expected file access. Proxy and firewall agree, and the workstation is staging sensitive files.",
        "exfil": "Real exfiltration to a new external endpoint shares the malicious collection pattern, but this transfer uses a known approved cloud destination. The distinctive failure is abuse of a trusted automation token.",
        "legitbatch": "A legitimate batch would match a manifest, owner, schedule, and normal workload host. There is no approval, and the finance token is being used from a developer workstation to read unrelated repositories."
      },
      "resolve": {
        "title": "Compromised automation token — trusted cloud access is being abused.",
        "paras": [
          "The transfer is physically real because proxy and firewall byte counts agree. The destination is approved, but the token appears on a new workstation, no job is scheduled, and the process stages customer exports and source code. Revoke the token, contain the workstation, and investigate how the credential escaped.",
          "This is one clear line across the loud readings. Sustained high egress is shared with both the malicious external transfer and legitimate batch, while a known-cloud destination is shared with the misconfiguration. Only sustained high traffic to known cloud identifies token abuse."
        ],
        "why": {
          "loud": "<b>Why both loud readings are needed</b>: high volume alone can be a batch, and a known destination alone can appear in a logging error.",
          "quiet": "<b>Why identity context clinches it</b>: a workload token running from the wrong host and outside any approved job is not behaving as its owner intended."
        },
        "chain": [
          "Automation credential is stolen or exposed",
          "Attacker uses trusted cloud access from a new host",
          "Sensitive data leaves through an otherwise approved service"
        ],
        "take": "Trust belongs to a workload and context, not merely to a token string or destination hostname."
      }
    },
    {
      "answer": "exfil",
      "alarm": "egress",
      "poleA": {
        "lab": "Outbound transfer",
        "val": "310 GB to a newly seen external host",
        "note": "The transfer resembles a newly onboarded vendor export on the loud indicators."
      },
      "hook": "At 01:10, a database analyst’s workstation begins a long encrypted upload to an external SFTP host never before seen by the SOC. A legitimate first-time vendor job could look identical.",
      "riddle": "The transfer is real and the destination is new — <span class=\"q\">is it authorized business movement or stolen data?</span>",
      "vals": {
        "egress": "310 GB sustained over 74 minutes",
        "dest": "new external SFTP host in a VPS network",
        "proxy": "309 GB",
        "firewall": "311 GB",
        "files": "42,000 customer and pricing files read across unrelated shares",
        "process": "7z archive created in hidden temp directory, then deleted",
        "identity": "analyst account from usual device but impossible-travel web session preceded upload",
        "change": "no vendor record, ticket, owner, schedule, or hash manifest",
        "dlp": "customer identifiers, contracts, and pricing models"
      },
      "reasons": {
        "legitbatch": "A first-time approved vendor export shares the loud pattern of sustained high transfer to a new external endpoint. But it should have an owner, change record, expected files, and manifest. None exists, and the hidden archive spans unrelated sensitive shares.",
        "misconfig": "A logging misconfiguration would create inconsistent sensor totals or duplicated sessions without broad file staging. Proxy and firewall agree and an archive was physically created and deleted.",
        "tokenabuse": "Token abuse to a known cloud service uses an approved destination with anomalous workload identity. This case instead uses a new VPS-hosted SFTP endpoint and a human account collecting broad data."
      },
      "resolve": {
        "title": "Real data exfiltration — the transfer is unauthorized and prepared for theft.",
        "paras": [
          "Independent network sensors confirm roughly 310 GB left the environment. The workstation read unrelated sensitive shares, created a hidden archive, deleted its staging evidence, and sent the result to a new VPS endpoint with no vendor, ticket, owner, or manifest. Contain the host and account and preserve evidence.",
          "This is where the loud gauges tie. Real exfiltration and a legitimate first-time batch both produce sustained high egress to a new external destination. The deeper question is authorization and provenance: who approved it, which files were expected, and did the endpoint activity match the declared job?"
        ],
        "why": {
          "loud": "<b>Why the loud gauges cannot decide</b>: new external destinations and large transfers occur in both theft and legitimate onboarding.",
          "quiet": "<b>Why this is exfiltration</b>: the transfer lacks every governance artifact and is preceded by broad collection, hidden archiving, and suspicious account activity."
        },
        "chain": [
          "Sensitive files are collected and compressed",
          "An encrypted session sends the archive to an unauthorized host",
          "The actor deletes staging artifacts after transfer"
        ],
        "take": "A big transfer becomes malicious when its file lineage, identity context, and authorization cannot be reconciled."
      }
    }
  ],
  "schematic": {
    "viewBox": "0 0 520 390",
    "svg": "\n<text x=\"260\" y=\"24\" class=\"eqlbl\" text-anchor=\"middle\" style=\"fill:#5a7f96\">ENTERPRISE DATA PATH</text>\n<rect x=\"45\" y=\"105\" width=\"125\" height=\"155\" rx=\"18\" fill=\"#173e59\" stroke=\"#70c9f2\" stroke-width=\"2\"/>\n<text x=\"108\" y=\"135\" class=\"lbl\" text-anchor=\"middle\">endpoint / server</text>\n<path d=\"M75,165 H140 M75,190 H130 M75,215 H145\" stroke=\"#efca72\" stroke-width=\"4\"/>\n<rect x=\"210\" y=\"105\" width=\"105\" height=\"155\" rx=\"18\" fill=\"#173e59\" stroke=\"#70c9f2\" stroke-width=\"2\"/>\n<text x=\"262\" y=\"135\" class=\"lbl\" text-anchor=\"middle\">proxy /</text><text x=\"262\" y=\"153\" class=\"lbl\" text-anchor=\"middle\">firewall</text>\n<path d=\"M170,182 H210 M315,182 H365\" stroke=\"#70c9f2\" stroke-width=\"7\"/>\n<rect x=\"365\" y=\"105\" width=\"110\" height=\"155\" rx=\"18\" fill=\"#173e59\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<text x=\"420\" y=\"137\" class=\"lbl\" text-anchor=\"middle\">external</text><text x=\"420\" y=\"155\" class=\"lbl\" text-anchor=\"middle\">destination</text>\n<circle cx=\"420\" cy=\"205\" r=\"28\" fill=\"none\" stroke=\"#efca72\" stroke-width=\"3\"/>\n<rect x=\"75\" y=\"300\" width=\"125\" height=\"50\" rx=\"10\" fill=\"rgba(112,201,242,.06)\" stroke=\"#385b70\"/>\n<text x=\"137\" y=\"329\" class=\"lbl\" text-anchor=\"middle\">identity / file access</text>\n<rect x=\"320\" y=\"300\" width=\"155\" height=\"50\" rx=\"10\" fill=\"rgba(112,201,242,.06)\" stroke=\"#385b70\"/>\n<text x=\"397\" y=\"321\" class=\"lbl\" text-anchor=\"middle\">change ticket / manifest</text><text x=\"397\" y=\"339\" class=\"lbl\" text-anchor=\"middle\">DLP classification</text>\n<rect x=\"200\" y=\"45\" width=\"125\" height=\"40\" rx=\"10\" fill=\"rgba(112,201,242,.06)\" stroke=\"#385b70\"/>\n<text x=\"262\" y=\"70\" class=\"lbl\" text-anchor=\"middle\">SOC detection</text>\n<line x1=\"255\" y1=\"185\" x2=\"255\" y2=\"105\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"410\" y1=\"165\" x2=\"365\" y2=\"165\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"325\" y1=\"85\" x2=\"300\" y2=\"105\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"185\" y1=\"85\" x2=\"215\" y2=\"105\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"95\" y1=\"240\" x2=\"115\" y2=\"300\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"90\" y1=\"135\" x2=\"75\" y2=\"115\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"215\" y1=\"300\" x2=\"190\" y2=\"255\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"390\" y1=\"285\" x2=\"410\" y2=\"260\" stroke=\"#efca72\" stroke-width=\"2\"/>\n<line x1=\"315\" y1=\"345\" x2=\"290\" y2=\"260\" stroke=\"#efca72\" stroke-width=\"2\"/>"
  }
} };
